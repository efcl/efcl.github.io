---
title: "segmentio/dekuのコードリーディング"
author: azu
layout: post
date : 2014-12-09T07:00
category: JavaScript
tags:
    - VirtualDOM
    - JavaScript
    - library
    - コードリーディング

---

[VirtualDOM Advent Calendar 2014](http://qiita.com/advent-calendar/2014/virtual-dom "VirtualDOM Advent Calendar 2014 - Qiita") 9日目の記事。

[segmentio/deku](https://github.com/segmentio/deku "segmentio/deku")  は最近出たばかりのVirtualDOMの実装ライブラリです。

小さくて読みやすく拡張性がある実装を目指していて、既にある[virtual-dom](https://github.com/Matt-Esch/virtual-dom "virtual-dom")とは別に作り始めたのも微妙にComponent周りの[考え方が違う](https://github.com/segmentio/deku/issues/10 "Use Matt-Esch/virtual-dom · Issue #10 · segmentio/deku")からのようです。


- 読んだもの: deku [0.0.2](https://github.com/segmentio/deku/releases/tag/0.0.2 "0.0.2")
- 読んだ日付: 2014年12月9日

絶賛実装中な感じなので、これを見たからといってもどうという感じではないと思います。

基本的なVirtual DOMの構造はあるので、そういう意味では読みやすいです。

## 基本的な使い方

```javascript
var component = require('segmentio/deku');

// Buttonのcomponentを作る
// <button>とonClickした時のイベントがある
var ButtonComponent = component({
  onClick() {
    this.setState({ clicked: true });
  }
  render(dom, state, props) {
    return dom('button', { onClick: this.onClick }, [props.text]);
  }
});

// mainとなるcomponent - componentはcomponentを含められる
// <div> <button /> </div>
var App = component({
  render(dom, state, props) {
    return dom('div', { class: 'App' }, [
      ButtonComponent({ text: props.buttonText })
    ]);
  }
});

// `use`で拡張を追加出来る
App.use(styleHelper());

// bodyに `App` componentを追加
var scene = App.mount(document.body, {
  buttonText: 'Click Me!'
});

// 更新処理 => 描画も更新される
scene.setProps({
  buttonText: 'Do it...'
});

// bodyから取り除く
scene.remove();
```


## lib/component

- ユーザが触る感じのAPI定義をしてる場所
- `use`でprototype拡張してpluginを定義できるように
- コンストラクタが受け取る`spec`オブジェクト

```javascript
var ButtonComponent = component({ // specオブジェクト
  onClick() {
    this.setState({ clicked: true });
  }
  render(dom, state, props) {
    return dom('button', { onClick: this.onClick }, [props.text]);
  }
});
```

`spec`はcomponentの定義を書く場所。

- `render`はデフォルトだと空なので、必ず上書きする
- APIは`setState`とか`renderString`とかReactの[Component API](http://facebook.github.io/react/docs/component-api.html "Component API")っぽいのが多い

この`spec`で面白いのは`displayName`というプロパティがあると、
作った `component.displayName` にそれを設定してくれる。(デバッグ用)

- [On the awesomeness of fn.displayName — Medium](https://medium.com/@cramforce/on-the-awesomeness-of-fn-displayname-9511933a714a "On the awesomeness of fn.displayName — Medium")

## lib/node

Virtual DOM trees(長いの次からvTreeと書きます)を作る場所

```javascript
component({
      render: function(dom, state, props){
        return dom('span', null, ['Hello World']);
      }
});
```

renderで渡ってくる`dom`という関数がvTreeを作る関数 = `render`メソッドの返り値はvTree。
(本物のDOM Nodeではない)

### lib/node/index.js

```javascript
/**
 * Create virtual DOM trees.
 *
 * This creates the nicer API for the user.
 * It translates that friendly API into an actual tree of nodes.
 *
 * @param {String|Function} type
 * @param {Object} props
 * @param {Array} children
 * @return {Node}
 * @api public
 */

function dom(type, props, children) {}
```

`dom`関数でNodeを作る際にNodeにつくidはi++していったものを使ってる。
(全体で共通でインクリメントしていくid)


`dom`関数では

```javascript
dom('span', null, ['Hello World']);
```

という感じで、DSLで`ElementNode`を作る事ができる。

`ElementNode` はタグの名前とかプロパティを持ったデータのオブジェクト
(操作するメソッドがないDOM Nodeみたいなものっぽい)

```javascript
/**
 * Initialize a new `ElementNode`.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {String} key Used for sorting/replacing during diffing.
 * @param {Array} children Child virtual dom nodes.
 * @api public
 */

function ElementNode(tagName, attributes, key, children) {
  this.type = 'element';
  this.tagName = tagName || 'div';
  this.attributes = parseAttributes(attributes);
  if (key) this.attributes['data-key'] = key;
  this.children = children || [];
  this.key = key;
}
```

もう一つのパターンが、`dom`がComponentを受け取った場合は`ComponentNode`を作る事が出来る。

```javascript
  it('should render an element with component root', function () {
    var Span = component({
      render: function(dom, state, props){
        return dom('span', null, 'foo');
      }
    });
    var Component = component({
      render: function(dom, state, props){
        return dom(Span);// Componentを渡してる
      }
    });
    var result = Component.renderString();
    assert(result === '<span>foo</span>');
  });
```

ComponentNodeとElementNodeの違い

- [Decouple ElementNode ? · Issue #5 · segmentio/deku](https://github.com/segmentio/deku/issues/5 "Decouple ElementNode ? · Issue #5 · segmentio/deku")

componentの`render`はこの`lib/node`を使って、
vTreeを返す関数を定義していく。

その`render`関数が返したvTreeを実際のHTMLにしていくのが
`lib/renderer`で、Virtual DOMの要であるdiff/patchもここにある。


## lib/renderer

レンダリングを担当する場所

`ComponentRenderer`や`Mount`で
componentを受け取ってそれをレンダリングする(HTMLへ)

## `lib/renderer/component.js`

レンダリングのmainとなる場所

それぞれのcomponentは`render`メソッドを実装しているので
`this.current = this.render()`でvTreeを取り出して使う。

実際にvTreeから`ElementNode`を取り出してDOMに変換していくのは、以下の`toElement`で行う。

### `ComponentRenderer.prototype.toElement`

`toElement` は以下の処理を行う

	ElementNode => DOM Node

`toElement`は`ElementNode`を受け取り、
`ElementNode`にはタグ名や属性の情報がプロパティとしてあるので、
これを使って`document.createElement(node.tagName)`という感じで
普通にDOM APIで組み立てていく。

`ElementNode`はchildrenを持っていることもあるので再帰的に行ってDOM Nodeを作る


## Component/vTreeの関係

```javascript
Component({
    	// @return vTree
	render() => {
		return vTree(ComponentNode | ElementNodes)
	}
})
```

## diff/patch

Virtual DOMの本領であるdiff/patchもRendererにある。

初期化する時に`toElement`でDOM Nodeを作るのと同時に、
インスタンスに変更が起きたら`ComponentRenderer.prototype.queue`を呼ぶようにイベントを設定する。

### `ComponentRenderer.prototype.queue`

dekuはVue.jsのようにキューにためて一定のタイミングでViewのアップデートの処理を行う。

`ComponentRenderer.prototype.queue`は他が処理中なら待ったり、
連続して呼ばれたりしたらキャンセルしてから実際の`update`処理を呼ぶようにしてる。

いわゆる[Batching](http://qiita.com/koba04/items/de79f158cd1f59ba5d20#batching "Batching")の処理です。

実際のdiff/patchでのDOM Nodeの更新をするのは`ComponentRenderer.prototype.update`で行われる

### `ComponentRenderer.prototype.update`

```javascript
  this.previous = this.current;
  this.current = this.render();
  // update the element to match.
  this.diff();
```

という感じで、現在のvTreeを`this.previous`にいれて、
`this.diff();`を呼び出してdiff/patchをする。

`diff`という名前だけど置換処理もそのまま行ってるので、patchの処理も含まれている。
(今のところdiffの中間表現とかなく直接書き換えしてる、ここは実装変えそうな気がする)

### lib/renderer/diff.js

`diff` はvTreeである`this.previous`と`this.current`の
プロパティ(属性とかtextContentとか)を比較して、
異なってるなら置換していくpatch処理を行う。

2014年12月4日: 絶賛実装中な感じ

diff/patchについて詳しくは [AdventCalendar - segmentio/dekuのコード読んで自分でも仮想DOMのdiffアルゴリズムを書いてみた - Qiita](http://qiita.com/mizchi/items/d21bb598156821131b8c "AdventCalendar - segmentio/dekuのコード読んで自分でも仮想DOMのdiffアルゴリズムを書いてみた - Qiita") を読みましょう。

## `lib/renderer/interactions.js`

dekuでは`toElement`で実際のDOM Nodeにしたものへイベントを設定出来る

```javascript
var ButtonComponent = component({
  onClick() {
    this.setState({ clicked: true });
  }
  render(dom, state, props) {
    return dom('button', { onClick: this.onClick }, [props.text]);
  }
});
```

これはシンプルな仕組みで、`toElement`で作ったDOM Nodeへのパス
(単純にプロパティにいれて保持してると考える)を保持しています。

Componentにはひとつの`render`しかないので、その結果できるDOM Nodeも一つ(Treeではあるかもしれないが)となり、そのDOM Nodeを取り出して普通に`spec`オブジェクトのイベント定義を要素につけているだけのようです。

---

## 感想

dekuのコードは読みやすいというよりは流れが見やすい感じがします。
`diff`以外のところは結構素直に実装されていて、普通にコードを追っていくだけでどういう処理がされているか分かる感じです(実際実行しないで読めたので)

## コードリーディングのツール

[WebStorm](http://www.jetbrains.com/webstorm/ "WebStorm")を使って読みました。
よくモジュール化されているので、定義元へのジャンプ等を使うとかなり読みやすいです。

メモは自分で作った[floating-memo.app](https://github.com/azu/floating-memo "floating-memo.app")というのを使いました。

- [node-webkitで最前面に置けるMarkdownメモアプリを作った](https://efcl.info/2014/08/27/floating-memo/ "node-webkitで最前面に置けるMarkdownメモアプリを作った")

### どこから読むか

Nodeモジュールを書き慣れている人は大体`index.js`を作ってるケースが多いです。
dekuの場合も[deku/index.js](https://github.com/segmentio/deku/blob/master/index.js "deku/index.js")というファイルがあり、以下のような1行があるだけです。

単なるエイリアスみたいな使い方ですが、package.jsonの`main`フィールドの指定のデフォルト値が`index.js`であったり、名前的にも分かりやすいのでよく見かける気がします。
(テストディレクトリ等から`require("../")`で読み込めると書いてましたが、[package.json のあるディレクトリのパスを対象に require すると、自動的に main ファイルを読み込むようになっている](https://github.com/efcl/efcl.github.io/commit/796c80b7b2f1ed2cb44f525d672f2001360d7947#commitcomment-8888418 "package.json のあるディレクトリのパスを対象に require すると、自動的に main ファイルを読み込むようになっている")とのことなのであくまで習慣的なものな気がします。)

```js
module.exports = require('./lib/component');
```

つまり、[lib/component/index.js](https://github.com/segmentio/deku/blob/master/lib/component/index.js "lib/component/index.js")から読み始めればいいと分かります。

dekuの場合は上から読んでいけるコードなので、結構コードリーディングするのが楽だと思います。(イベント等があるとコードから追うのが難しくなるので、実行して必要がある)

後は興味がある所から見ていくか、順番に見ていくかを決めるだけですね。

```
lib
├── component
│   ├── index.js
│   ├── protos.js
│   └── statics.js
├── node
│   ├── component.js
│   ├── element.js
│   ├── index.js
│   └── text.js
└── renderer
    ├── component.js
    ├── diff.js
    ├── interactions.js
    ├── mount.js
    ├── string.js
    └── tree.js
```

### よくわからない時はテストを見る

例えば、[lib/node/index.js](https://github.com/segmentio/deku/blob/8c11681775196ad337ddb3bb809882c815c1bfa1/lib/node/index.js#L49-53 "lib/node/index.js")を見ると、`dom(type, props, children)`関数で以下のようなif分岐があります。

```js
// if you pass in a function, it's a `Component` constructor.
// otherwise it's an element.
if ('function' == typeof type) {
	var node = new ComponentNode(type, props, key, children);
} else {
	var node = new ElementNode(type, props, key, children);
}
```

`type`に渡されるものが関数がそうでないかで分岐しています。

こういう時にまず見るのがテストだと思います(今どきのなら普通はある)。
[test/node/index.js](https://github.com/segmentio/deku/blob/8c11681775196ad337ddb3bb809882c815c1bfa1/test/node/index.js "test/node/index.js")があるので、このテストを見ると

```js
dom('div', { key: 'foo' })
```

という文字列を受け取るパターンと

```js
var Span = component({
 render: function(dom, state, props){
   return dom('span', null, 'foo');
 }
});
var Component = component({
 render: function(dom, state, props){
   return dom(Span);
 }
});
```

`dom(component)`というようにcomponentを受け取るパターン(=type function)があると分かると思います。

更によくわからない時はIssueを検索してみましょう。

- [Issues · segmentio/deku](https://github.com/segmentio/deku/issues "Issues · segmentio/deku")


## 他のVirtual DOM

dekuはまだ0.0.2というレベルで、`diff.js`もまだ実装が変わりそうな気配があります。

他にも[virtual-dom](https://github.com/Matt-Esch/virtual-dom "virtual-dom")や[React](https://github.com/facebook/react "React")等の情報の方が多いので、Virtual DOMの仕組み自体について知りたい場合は以下を見ましょう

- [Virtual DOMのアルゴリズムが知りたくてvirtual-domのコードを読んだ話 - snyk_s log](http://saneyukis.hatenablog.com/entry/2014/09/03/134858 "Virtual DOMのアルゴリズムが知りたくてvirtual-domのコードを読んだ話 - snyk_s log")
- [Performance Calendar » React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/ "Performance Calendar » React’s diff algorithm")
- [reactjs - React.jsのVirtualDOMについて - Qiita](http://qiita.com/koba04/items/de79f158cd1f59ba5d20 "reactjs - React.jsのVirtualDOMについて - Qiita")


