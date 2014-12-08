---
title: "dekuのコードリーディング"
author: azu
layout: post
date : 2014-12-08T23:48
category: JavaScript
tags:
    - VirtualDOM
    - JavaScript
    - library
    - コードリーディング

---

# [segmentio/deku](https://github.com/segmentio/deku "segmentio/deku") コードリーディング

読んだもの: deku [0.0.2](https://github.com/segmentio/deku/releases/tag/0.0.2 "0.0.2")

絶賛実装中な感じなので、これをみたからといってもどうという感じではないと思います。

基本的なVirtual DOMの構造はあるので、そういう意味では読みやすいです。

## lib/component

- ユーザが触る感じのAPI定義をしてる場所
- `use`でprototype拡張してpluginを定義できるように
- コンストラクタが受け取る`spec`オブジェクト

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

`spec`はcomponentの定義を書く場所。

- `render`はデフォルトだと空なので、必ず上書きする
- APIは`setState`とか`renderString`とかReactっぽいやつが多い

この`spec`で面白いのは`displayName`というプロパティがあると、
作った `component.displayName` にそれを設定してくれる。(デバッグ用)

- [On the awesomeness of fn.displayName — Medium](https://medium.com/@cramforce/on-the-awesomeness-of-fn-displayname-9511933a714a "On the awesomeness of fn.displayName — Medium")

## lib/node

Virtul DOMのvTreeを作る場所

```javascript
component({
      render: function(dom, state, props){
        return dom('span', null, ['Hello World']);
      }
});
```

renderで渡ってくる`dom`という関数がvTreeを作る関数

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

もう一つ、`dom`がComponentを受け取った場合は`ComponentNode`を作る事が出来る。

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

レンダリングのmain

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


## Component/vTree/ElementNodeの関係

	Component{
    	// @return vTree
    	render()
        	return vTree
            		ElementNodes
    }


## diff/patch

Virtual DOMの本領であるdiff/patchもRendererにある。

初期化する時に`toElement`でDOM Nodeを作るのと同時に、
インスタンスに変更が起きたら`ComponentRenderer.prototype.queue`を呼ぶようにイベントを設定する。

### `ComponentRenderer.prototype.queue`

dukuはVue.jsのようにキューにためて一定のタイミングでViewのアップデートの処理を行う。

`ComponentRenderer.prototype.queue`は他が処理中ならまったり、
連続して呼ばれたりしたらキャンセルしてから実際の`upodate`処理を呼ぶようにしてる。

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

`diff`という名前だけどでは置換処理もそのまま行ってるので、patchの処理も含まれている。
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
(単純にプロパティにいれて保持してると考える)を保持していて、
Componentにはひとつの`render`しかないので、その結果できるDOM Nodeも一つとなる(Treeではあるかもしれないけど)

なので、そのDOM Nodeを取り出して普通にイベントを付けるだけ。

