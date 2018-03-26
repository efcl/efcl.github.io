---
title: "はてなブックマーク検索を作りながらFlux Utilsについて学ぶ"
author: azu
layout: post
date : 2015-08-24T09:23
category: JavaScript
tags:
    - Flux
    - JavaScript
    - library
    - React
    - はてなブックマーク

---

[facebook/flux](https://github.com/facebook/flux "facebook/flux") [2.1.0](https://github.com/facebook/flux/blob/master/CHANGELOG.md#210 "2.1.0")から[Flux Utils](http://facebook.github.io/flux/docs/flux-utils.html "Flux Utils")というStoreなどの実装が含まれるようになりました。

今回Flux Utilsを使って、指定したアカウントのはてなブックマークを検索するウェブアプリを書いてみました。

- [azu/hatebu-mydata-search](https://github.com/azu/hatebu-mydata-search "azu/hatebu-mydata-search")
- [azu.github.io/hatebu-mydata-search/](http://azu.github.io/hatebu-mydata-search/)
- mydataのAPIがCORS対応してないので[JSONProxy](https://jsonp.afeld.me/ "JSONProxy")を挟んでます。(なのでブックマークデータが多いアカウント名は避けたほうが…)

![はてなブックマーク検索](https://monosnap.com/file/KPhJNSpqHIVUsqFOd5cHzFw3yEyCeH.png)

これを作ってみてFlux Utilsについて思ったことを書いていきます。

## Flux Utils

[Flux Utils](http://facebook.github.io/flux/docs/flux-utils.html "Flux Utils")の紹介ページに、Flux Utilsの解説が書かれています。

簡単にまとめると以下の4つのクラスがFlux Utilsとして提供されています。

- Store
	- ベースとなるクラス
- ReduceStore
	- Storeを継承
	- `state`を保持していて、actionsに対して`reduce`することで`state`更新する
- MapStore
	- ReduceStoreを継承
	- [Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js")に依存している
- Container
	- mixinsの代わり
	- React ComponentラップするComponentを作るコンテナ
	- Storeを登録しておいて、Storeの変更を元にComponentに通知する

Storeはおそらく直接使わない、`MapStore`は[Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js")に依存しているので、使うとしたら`ReduceStore`と`Container`がメインとなると思います。

[azu/hatebu-mydata-search](https://github.com/azu/hatebu-mydata-search "azu/hatebu-mydata-search")でも`ReduceStore`と`Container`の2つを利用しました。

Flux Utilsは[Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js")を一部使っているのからも分かりますが(使わなくても問題ない)、Immutableなオブジェクトを`state`として使うのが前提となった作りになっています。

[Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js")はFlowやTypeScriptなどの型付き言語で使いやすくなってたり、[Immutableな実装でのパフォーマンス](https://www.youtube.com/watch?v=I7IdS-PbEgI)におけるメリットはありますが、癖があって普通に扱うのが難しいのです。

そのため、今回はImmutableなstateオブジェクトとして、もう少し扱いやすい[christianalfoni/immutable-store](https://github.com/christianalfoni/immutable-store "christianalfoni/immutable-store")を利用しました。

追記: immutable-storeはDEPRECATEDなので、[omniscientjs/immstruct](https://github.com/omniscientjs/immstruct "omniscientjs/immstruct")や[immutable-js](https://github.com/facebook/immutable-js "immutable-js")を使いましょう

Flux Utilsを利用する場合、以下のように`flux/utils`とパスを指定して読み込むことで利用できます。
(Facebookはこういうのが多いですが、browserifyした時とかに使ってないものが勝手に含まれないから?)

```js
import {ReduceStore} from 'flux/utils';
```

----

#### 余談:ファイルサイズ

Flux Utilsを含む前後の[facebook/flux](https://github.com/facebook/flux "facebook/flux")のファイルサイズは以下のような感じです。

Before:

![before](https://monosnap.com/file/LJ9RcmuK37jo9Uq9XvAKsnbwTn1Oay.png)

After:

![after](https://monosnap.com/file/aihEzm0aYcT9xKFegKM4zZefrAEQne.png)

![gif](https://i.gyazo.com/f1bff7884bb1d30416345cce9e58de71.gif)

[facebook/flux](https://github.com/facebook/flux "facebook/flux")の`dist`にはデフォルトでFlux Utilsが含まれていないため、Flux Utilsを明示的にimportしない限りファイルサイズは増えたりはしないと思います。

また、immutable.jsに直接依存してるのはMapStoreだけで、他のReduceStoreなどはimportしてもimmutable.js含まれないため、そこまでファイルサイズ気にしなくても良いと思います。

MapStoreを使う場合はImmutable.jsを使うことになるので、結構大きくなります。

```js
import {MapStore} from 'flux/utils';
```

-----

## Flux + Reactなアプリ作成の流れ

ここからは[azu/hatebu-mydata-search](https://github.com/azu/hatebu-mydata-search "azu/hatebu-mydata-search")がどういう順番で作成したかに沿った流れで書いていきます。

最初はビルド環境や`index.html`を置いて`build.js`を読み込めるようにします。

babel+babelify+browserifyな感じでJavaScriptを書けるようにしてます。
CSSは[cssnext](http://cssnext.io/ "cssnext")と[Pure](http://purecss.io/ "Pure")を使いました。

- [setup devlopment env · azu/hatebu-mydata-search@101d631](https://github.com/azu/hatebu-mydata-search/commit/101d6310659d4d8b701e9cfffa14fafde351a7b3 "setup devlopment env · azu/hatebu-mydata-search@101d631")

### ステートレスコンポーネント

コミットをそこまでキレイに分けてないので上記のコミットに含まれてますが、まずはステートレスなReact Componentを作成していくようにしています。
(React Componentで`this.state`を使わないと考えれば書きやすいと思います)

具体的には以下のユーザ名の入力するinput要素を`InputUserName.js`という名前で最初に作っています。

![input](https://monosnap.com/file/F7JnaZowpENswNEtLEcjpN1uGSiVKH.png)

```js
import React from "react"
export default class InputUserName extends React.Component {
    onSubmit(event) {
        event.preventDefault();
        var name = React.findDOMNode(this.refs.userName).value;
        this.props.onSubmit({
            name
        });
    }

    render() {
        return <div className="InputUserName">
            <form className="InputUserName-form pure-form" onSubmit={this.onSubmit.bind(this)}>
                <input type="text" ref="userName"></input>
                <input className="pure-button" type="submit" value="変更"></input>
            </form>
        </div>
    }
}
```

この作ったComponentを確認する意味も含めて、`App.js`というエントリポイントとなるファイルを作って、単純に読み込んで`document.body`へ表示しています。

```js
import React from "react"
import InputUserName from "./components/InputUserName"
function onSubmit({name}) {
    console.log(name);
}
React.render(<InputUserName onSubmit={onSubmit}/>, document.body);
```

こうすることで`submit`イベントがちゃんと動いてるのかをstateがなくても確認できたりするので、HTMLでまず構造を書いてみるのに近い作業で入り口とするのに向いています。

同じ要領でブックマークのデータを表示するList要素として`BookmarkList`を作って

```js
import React from "react"
export class BookmarkListItem extends React.Component {
    render() {
        var {title, url, comment} = this.props.bookmark;
        return <li className="BookmarkListItem">
            <a href={url}>{title}</a>

            <p>{comment}</p>
        </li>
    }
}
export default class BookmarkList extends React.Component {
    render() {
        var items = this.props.bookmarks.map(bookmark => {
            return <BookmarkListItem key={bookmark.url} bookmark={bookmark}/>;
        });
        return <ul className="BookmarkList">
            {items}
        </ul>
    }
}
```


`App.js`にダミーの配列データ(`bookmarks`)を置いて表示しています。

```diff

+import BookmarkList from "./components/BookmarkList"
 function onSubmit({name}) {
     console.log(name);
 }
-React.render(<InputUserName onSubmit={onSubmit}/>, document.body);
+var bookmarks = [
+    {
+        title: "タイトル",
+        url: "http://localhost:3000/",
+        comment: "[test] メッセージ"
+    },
+    {
+        title: "NW.jsでのバイナリリリース",
+        url: "https://efcl.info/2014/09/05/node-webkit-binary-release/",
+        comment: "[test] ビルドが楽になりたい"
+    }
+];
+React.render(<div>
+    <InputUserName onSubmit={onSubmit}/>
+    <BookmarkList bookmarks={bookmarks}/>
+</div>, document.body);
```

後は同じようにブックマークをフィルターするキーワードを入れる[`SearchBox`](https://github.com/azu/hatebu-mydata-search/commit/0a061deb51ef33b8a0a778809faa77b28923cdc7)を作ったりしています。

ここまでで、画面に必要な要素をステートレスコンポーネントとして用意してとりあえず表示できるようになりました。

もちろんまだCSSが存在してないので、デザインとか配置については何も設定されていないですが、上記のコンポーネントを見て分かるように`InputUserName`というコンポーネントには`.InputUserName`というCSSクラスが適応されています。

これはSUIT CSSという命名ルールと殆ど同じで、MyComponentというコンポーネントには.MyComponentというクラス名をつけるという命名ルールです。

MyComponent以下にある要素のクラスなら、`.MyComponent-part`という感じでReact Componentみたいなものとは相性がいいと思うのでよく使ってます。

- [SUIT CSS: style tools for UI components](http://suitcss.github.io/ "SUIT CSS: style tools for UI components")


### Flux Utilsの導入

コンポーネントが揃ったらボタンを押したらデータを読み込むみたいな動きをつけていくので、ここでやっとFluxを導入します。

- [feat(flux): use flux-utils · azu/hatebu-mydata-search@24ff494](https://github.com/azu/hatebu-mydata-search/commit/24ff494f227b2d0c0fc4b340b411a2b6e5eaf1d3 "feat(flux): use flux-utils · azu/hatebu-mydata-search@24ff494")

このコミットだと[Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js")を使ってますが、最終的には[immutable-store](https://github.com/christianalfoni/immutable-store "immutable-store")を使っています。(値を取得するときに`get("key")`みたいな事をしなくて良いので自然に使える)

Fluxをどこから実装するかですが、Flux Utilsを使った場合はStoreかActionCreatorあたりからが自然になると思います。
(ContainerはStoreがないとそもそも始まらない)


#### ActionCreator

自分はActionに`keys`を置きたいので、まずはActionCreatorから書きました。
(一般的にはconstantsみたいな別のファイルに`type`だけを定義したりする)

ただ、Flux Utilsのサンプルを見てみると分かるようにそもそもActionCreatorがなくなっていて、FlowTypeで書かれたActionの型だけが定義されています。

- [flux/examples/flux-utils-todomvc at master · facebook/flux](https://github.com/facebook/flux/tree/master/examples/flux-utils-todomvc "flux/examples/flux-utils-todomvc at master · facebook/flux")
- [flux/TodoActions.js at master · facebook/flux](https://github.com/facebook/flux/blob/master/examples/flux-utils-todomvc/js/flux-infra/TodoActions.js "flux/TodoActions.js at master · facebook/flux")

自分の中ではそれぞれ以下のような認識で単語を使っていますが、正直あんまり深く考えてないです。

- Action: ペイロードオブジェクト(typeとデータを持ってる)
- ActionCreator: ActionをDispatcherに渡してdispatchする関数をまとめたヘルパークラス

[Flux: Actions and the Dispatcher | React](https://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#actions-and-actioncreators "Flux: Actions and the Dispatcher | React")

`SearchAction`というクラスは上記の定義だと`ActionCreator`に当たるものですが長いので。。

簡単に書くと以下のように特定の`type`を持ったActionオブジェクトをdispatchするだけのメソッドを持ったクラスです。

```js
import {getMyData} from "./SearchUtils"
import Dispatcher from "../Dispatcher";
export var keys = {
    reset: Symbol("reset"),
    inputText: Symbol("inputText"),
    loadItems: Symbol("loadItems")

};
export default class SearchAction {
    static reset() {
        Dispatcher.dispatch({
            type: keys.reset
        });
    }

    static inputText(text) {
        Dispatcher.dispatch({
            type: keys.inputText,
            text
        });
    }

    static loadItems(userName, fromDate) {
        return getMyData(userName, fromDate).then(items => {
            Dispatcher.dispatch({
                type: keys.loadItems,
                items
            });
        });
    }
}
```

ここに出てくる[Dispatcher.js](https://github.com/azu/hatebu-mydata-search/blob/d51fb88290699f5325bb4ff0995b128a4a6446f7/src/Dispatcher.js "Dispatcher.js")はシングルトンなDispatcherで、Flux Utils的にもDispatcherはシングルトンを前提としたものとなっているようです。

#### Store

次に`ReduceStore`を使ってフィルターとなる単語と表示してるブックマークのstateを管理するStoreを作ります。

ReduceStoreは`setState`のようなメソッドは持っていません。
代わり`reduce(state, action)`というメソッドを実装して、ここでreturnした値が次のstateとなるような仕組みになっています。

Actionの`keys`を使って、`keys.loadItems`という`type`のActionが来たならば(ここでいうなら`SearchAction.loadItems()`が呼ばれたならば)、現在のstateのitemsを`action.items`に置き換えたものを新しいstateにするといった感じです。

```js
import { ReduceStore } from 'flux/utils';
import SearchDispatcher from "./SearchDispatcher";
import { keys } from "./SearchAction"
import Immutable from "immutable-store"

class SearchStore extends ReduceStore {
    getInitialState() {
        return Immutable({
            "text": "",
            "items": []
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case keys.inputText:
                return state.set("text", text);
            case keys.loadItems:
                return state.set("items", action.items);
            default:
                return state;
        }
    }
}
// ここもシングルトン
// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
// と書いてあるぐらいなので
const instance = new SearchStore(SearchDispatcher);
export default instance;
```

#### Container

Flux Utilsで書いてて結構気に入ってるのはContainerという仕組みです。

これは`static getStores()`で並べたStoreから"Change"イベントがemitされたら、`static calculateState(prevState)`でReact Componentのstateとなるものを返して、React Componentに`setState(calculateState()))`されるというイメージです。

Containerで包むべきReact ComponentはRootとなるComponentとするべきです。
これはReactを書くときのパターンとしてよくある、stateを中央の一箇所に集めるパターン(Centralize State)で書いているとわかりやすく適応できます。
(子となるReact Component内でstateを持つこともありますが、そのstateは外から不要なstateであるべきです)

最初にステートレスコンポーネントで書いていたのも、`App.js`から`state`を渡すことで、それぞれ子となるコンポーネントがstateを持たなくてもよくなるからです。

- [React Tips and Best Practices - ÆFLASH](http://aeflash.com/2015-02/react-tips-and-best-practices.html "React Tips and Best Practices - ÆFLASH")

```diff
 import InputUserName from "./components/InputUserName"
 import BookmarkList from "./components/BookmarkList"
 import SearchBox from "./components/SearchBox"
+import SearchStore from "./Search/SearchStore"
+import SearchAction from "./Search/SearchAction"
+import {Container} from 'flux/utils';
 function onSubmit({name}) {
     console.log(name);
 }
 function onChange(text) {
+    SearchAction.inputText(text);
 }
 var bookmarks = [
@@ -22,8 +26,27 @@ var bookmarks = [
         comment: "[test] ビルドが楽になりたい"
     }
 ];
-React.render(<div>
-    <InputUserName onSubmit={onSubmit}/>
-    <SearchBox onChange={onChange}/>
-    <BookmarkList bookmarks={bookmarks}/>
-</div>, document.body);
+export default class App extends React.Component {
+    static getStores() { // 変更を監視したいStore一覧
+        return [SearchStore];
+    }
+    // returnされたものが`setState`される
+    static calculateState(prevState) {
+        return {
+            search: SearchStore.getState()
+        }
+    }
+
+    render() {
+        return <div>
+            <InputUserName onSubmit={onSubmit}/>
+            <SearchBox onChange={onChange}/>
+            <BookmarkList bookmarks={this.state.search.get("items")}/>
+        </div>
+    }
+}
+
+SearchAction.loadItems();
// Container.createで`<App />`をラップしてる
+const AppContainer = Container.create(App);
+React.render(<AppContainer />, document.body);
```

これにより、ContainerがStoreの変更を監視してViewに変更を通知できるようになります。

![flux](https://monosnap.com/file/x2eJ7ciE8F4nOB62M3yrOXIesyZSTm.png)

ここで問題になるのが、**Storeの変更**とは何かです。

Flux Utilsでは他のFlux実装のように`setState`や`eventEmitter.emit("change")`のような部分は隠蔽されています。

Flux UtilsのReduceStoreにおける**Storeの変更**とは`reduce(state, action)`の結果が現在とは異なるstateオブジェクトである時をいいます。

現在とは異なるstateオブジェクトになった ==> stateが変更された ==> Storeの変更イベントが発火

ということになっています。

異なるstateオブジェクトかどうかという判定は[areEqual(one: TState, two: TState): boolean](https://github.com/facebook/flux/blob/2b59cf8f83333b02c663ba57445facfe52979ad7/src/stores/FluxReduceStore.js#L59-L61 "areEqual(one: TState, two: TState): boolean")というメソッドで行われていて、以下のような判定となっています。

```js
  areEqual(one: TState, two: TState): boolean {
    return one === two;
  }
```

#### StateがImmutable?

ここで最初の方にも書いてたFlux UtilsがなぜImmutable前提と言えるのかという話をしておきます。

先ほどの`areEqual`は`===`でstateを比較しているので、以下のようなstateオブジェクトのプロパティを変更した場合でも、同じstateとみなされます。

```js
var state = { key : "value" };
state.key = "!!!";
var newState = state;
areEqual(state, newState);// true
```

そのため、Storeのstateを変更したという状態にするには`reduce`で現在のstateオブジェクトをcloneしてから変更するなどが必要になります。

そのため、Flux Utilsでは[Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js")や[immutable-store](https://github.com/christianalfoni/immutable-store "immutable-store")といったものを使ってstateを扱わないとかなり面倒になると思います。

[immutable-store](https://github.com/christianalfoni/immutable-store "immutable-store")だと以下のように`===`で異なるオブジェクトが作れます。

```js
var state = Store{
  foo: 'bar'
};

var newState = state.set('foo', 'bar2');
areEqual(state, newState);// false
```



このstateはImmutableであるというのは、stateが汚れたりしないのでいいところもありますが、逆に`setState`のような無理やりstateを変えたいという時に結構面倒な事があります。

### ローカルストレージからの復元

[azu/hatebu-mydata-search](https://github.com/azu/hatebu-mydata-search "azu/hatebu-mydata-search")でも一つ遭遇して、このアプリでは取得済みのブックマークやユーザー名などはIndexedDBに保存しています。

画面を表示した後、非同期で取得したデータをstateを設定し直すのに`setState`みたいな単純な方法がないので以下のような作りにしました。

`restoreType`というtypeを追加して、ストレージから取得したオブジェクトをstateにするというものを`reduce`に追加しています。

要はActionCreatorから`restoreType`というActionとストレージにあるstateをdispatchするという、他のActionと全く同じ流れを踏むようになっています。

```js
import {ReduceStore} from 'flux/utils';
import Dispatcher from "../Dispatcher";
import { keys } from "./HatebuAction"
import Immutable from "immutable-store"
import {getStorage, setStorage} from "../LocalStorageContainer"
const restoreType = Symbol("restore");
class HatebuStore extends ReduceStore {
    constructor(...args) {
        super(...args);
        getStorage(this.constructor.name).then(state => {
            Dispatcher.dispatch({
                type: restoreType,
                state
            });
        });
        this.addListener(() => {
            var storeName = this.constructor.name;
            var state = this.getState();
            setStorage(storeName, state).catch(error => {
                console.warn(error, " on " + storeName);
            });
        });
    }

    getInitialState() {
        return Immutable({
            "userName": ""
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case keys.inputUser:
                return state.set("userName", action.userName);
            case restoreType:
                return state.import(action.state);
            default:
                return state;
        }
    }
}
```

最初はReduceStoreをハックしてどうにかしようとしていますが結構難しい事がわかったので、`restoreType`というActionでやる形にしています。

やってみるとFlux Utilsはこういった感じで結構ルール外なことはやりにくいようになっている気がするので、ギブス的にもなってるような気がします。

ストレージから復元もActionでやったほうが例外的なルールもなくなるので真っ当な設計だと思います。


## まとめ

[flux-utilsについて](https://gist.github.com/azu/e0274b703ef97226b0db "flux-utilsについて")でも書いていましたが、特に`MapStore`などは[Flow](http://flowtype.org/ "Flow")やTypeScriptといった型付き言語だと使いやすいような形となっています。
そういったものと一緒にFlux Utilsを使うといろんな人がいても書き方がかなり統一されるような感じがします。

また[Flux Utils](http://facebook.github.io/flux/docs/flux-utils.html "Flux Utils")のページの最初にも書いてあるように、別にFluxアーキテクチャをやる際にFlux Utilsを絶対使うべきというものでもないと思います。

> Flux Utils is a set of basic utility classes to help get you started with Flux. These base classes are a solid foundation for a simple Flux application, but they are not a feature-complete framework that will handle all use cases. There are many other great Flux frameworks out there if these utilities do not fulfill your needs.

[Flow](http://flowtype.org/ "Flow")で書きやすいようにするというモチベーションがありそうですが、immutable state、pure functionといったあたりは[rackt/redux](https://github.com/rackt/redux "rackt/redux")などにも近いような話も出てきますが、その前に一度Flux Utilsを触ってみると面白いかもしれません。

以前のDispatcherしかなかった`flux`モジュールに比べて、コード量も少なくなり、Storeなどの形も一定になって見通しが良くなったり、Containerが結構いい感じなので普通に使えるといった印象です。
