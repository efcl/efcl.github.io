---
title: "material-fluxというFluxライブラリをREADME駆動で開発した"
author: azu
layout: post
date : 2015-03-17T09:44
category: JavaScript
tags:
    - JavaScript
    - Flux
    - library
    - ES6

---

# Flux

[material-flux](https://github.com/azu/material-flux "azu/material-flux")というFluxアーキテクチャの実装ライブラリを書きました。

[Flux](http://facebook.github.io/flux/ "Flux")って何?と思う人は以下などを見ると良さそうな気がします。

- [React: Flux Architecture - Video Tutorial Series @eggheadio](https://egghead.io/series/react-flux-architecture "React: Flux Architecture - Video Tutorial Series @eggheadio")
- [Fluxとはなんだったのか + misc at 2014 - snyk_s log](http://saneyukis.hatenablog.com/entry/2014/12/24/014421)
- [Fluxアーキテクチャの覚え書きを書いた - snyk_s log](http://saneyukis.hatenablog.com/entry/2014/09/26/174750)
- [The Flux Quick Start Guide](http://www.jackcallister.com/2015/02/26/the-flux-quick-start-guide.html)
- [Getting To Know Flux, the React.js Architecture ♥ Scotch](https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture)
- [What the Flux? (On Flux, DDD, and CQRS) — Jack Hsu](http://jaysoo.ca/2015/02/06/what-the-flux/ "What the Flux? (On Flux, DDD, and CQRS) — Jack Hsu")

## なぜ作ったか

IDE readable(machine readable)なライブラリが欲しかったのがひとつの理由です。(d.tsなどを書けばだいたい問題ないですが、特殊なハックはしないという制限が欲しかった)

Fluxライブラリの実装比較をしてる[voronianski/flux-comparison](https://github.com/voronianski/flux-comparison "voronianski/flux-comparison")や[The State of Flux](https://reactjsnews.com/the-state-of-flux/ "The State of Flux")などを出てくるライブラリなどを試しましたが、殆どのライブラリは

- オブジェクトを渡したら、それに合わせたメソッドの生成
	- `createActions`や`createStore`のような仕組みでStoreなどを作る
	- d.tsでカバーできるけど。。。
	- => ユーザが触るのは普通に定義した関数に直接呼ぶ形にしたかった
- 動的なメソッドの上書き
	- Proxy的なことをやってる
	- => ES6 Proxyがあればありかもしれないけど、現状だとただのメソッドの上書き
	- Shapeが壊れる可能性がありそう
- Dispatcherがシングルトンになってる
	- たいていはシングルトンで問題なさそう
	- 実装もシングルトンだと簡単になる
	- けど何か気持ち悪さがある

のようなちょっとしたハックをした実装があったので、勉強も兼ねて[material-flux](https://github.com/azu/material-flux "azu/material-flux")を書きました。

## [material-flux](https://github.com/azu/material-flux "azu/material-flux")の使い方

material-fluxはES6 classを前提としたAPIを組み立てていたので、[Babel][] などと共に使うような想定になっています。
[Flummox](https://github.com/acdlite/flummox "Flummox")などとかなり近い(実際に参考にした)形になっています。


### Action

```js
import {Action} from "material-flux"
export var keys = {
    "doSomething": "doSomething"
};
export default class UserAction extends Action {
    // or `[keys.doSomething](data){}`と書くこともできるけど補完できなさそう
    doSomething(data){
        // pass the `data` to Store's `onHandler`
        // call `onHandler(data);`
        this.dispatch(keys.doSomething, data);
    }
}
```

### Store

```js
import {keys} from "./UserAction.js"
import {Store} from "material-flux"
export default class UserStore extends Store {
   constructor(context) {
       super(context);
       this.state = {
           userData: null
       };
       // keys文字列を使ってActionとHandlerを結ぶ
       this.register(keys.doSomething, this.onHandler);
   }

   // data is come from Action
   onHandler(data) {
       this.setState({
           userData: data
       });
   }

   // ただのgetする関数
   getUserData() {
       return this.state.userData;
   }
}
```

### Context

ActionとStoreを結ぶための中間者。
Dispatcherはここでインスタンス化されて、一つのContextが一つのDispatcherを持っている。

Actionに対しては`dipatch`というDispatcherを呼ぶ関数を与えて、Storeに対しては`dispatch`された時にどのHandlerがよばれるかを登録する`register`という関数を渡す。


```js
import UserAction from "./UserAction.js"
import UserStore from "./UserStore.js"
import {Context} from 'material-flux';
export default class UserContext extends Context {
    constructor() {
        this.userAction = new UserAction(this);
        this.userStore = new UserStore(this);
    }
}
```

使うときは単純なES6 classなので、

```js
var userContext = new UserContext();
userContext.userAction.doSomething("data");
```

という形でActionを呼ぶことができるようになる。

### View(Component)

実際に使うときは、ReactなどのViewを担当するものへ`Context`のインスタンスを渡して使ってもらう。
ReactもES6 classで書けるので例では`React.Component`を継承しているけど、`this`のバインドの問題などあるので、`createClass`の方が使いやすいかもしれない。

ReactのAPIは`componentDidMount`というメソッドを定義したらあるタイミングでよばれるというような一種の宣言的なAPIで、外から呼ばれるという訳でもないのでES6 classである`createClass`を使うデメリットは少ない。

```js
import React from 'react';
import UserContext from './UserContext.js';
import App from './AppComponent.jsx';
var context = new UserContext();
React.render(
    React.createElement(App, { context }),
    document.getElementById('main')
);
```

AppComponent:

```js
import React from 'react';
export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.userStore = this.props.context.userStore;
        this.state = {
            userData: this.userStore.getUserData()
        };
    }

    _onChange() {
        this.setState({
            userData: this.userStore.getUserData()
        });
    }

    componentDidMount() {
        this.userStore.onChange(this._onChange.bind(this));
    }

    componentWillUnmount() {
        this.userStore.removeAllChangeListeners();
    }

    onClick(event) {
        var { context } = this.props;
        context.userAction.doSomething("clicked");
    }

    render() {
        return (
            <div onClick={this.onClick.bind(this)}>
                userData: {this.state.userData}
            </div>
        );
    }
}
```

[examples](https://github.com/azu/material-flux/tree/master/examples "examples")やflux-comparisonの[material-flux実装バージョン](https://github.com/azu/flux-comparison/tree/material-flux "azu/flux-comparison at material-flux")があるのでそちらも見てもらえるといいかもしれません。

- [azu/flux-comparison at material-flux](https://github.com/azu/flux-comparison/tree/material-flux "azu/flux-comparison at material-flux")

## README駆動開発

[material-flux](https://github.com/azu/material-flux "azu/material-flux")は最初に上げた他のFluxライブラリの懸念点を回避するために、READMEを最初に書いてから実装を始めるREADME駆動開発をしました。

- ---- APIの定義 - ドキュメントのみ ---- 
- [Imagine Store by azu · Pull Request #1 · azu/material-flux](https://github.com/azu/material-flux/pull/1)
- [Imagine Action by azu · Pull Request #2 · azu/material-flux](https://github.com/azu/material-flux/pull/2)
- [add Flux section by azu · Pull Request #3 · azu/material-flux](https://github.com/azu/material-flux/pull/3)
- --- 動かないサンプルコード ----
- [add examples by azu · Pull Request #5 · azu/material-flux](https://github.com/azu/material-flux/pull/5)
- --- ここから実装 ----
- [implementation material-flux by azu · Pull Request #7 · azu/material-flux](https://github.com/azu/material-flux/pull/7 "implementation material-flux by azu · Pull Request #7 · azu/material-flux")

で、実際にやってみてなかなか難しかった感じはしました。

README的にはAPIのことだけを考えて書いていたので、それが本当に実現できるか細かいところまで検証してなかったので、最初に考えていた案はボツになったりしています。

README駆動をするときは表面的なAPIだけじゃなくて、擬似コードか、テストファーストな感じなど内部的な動作の定義も何かしらのアプローチが必要な感じがしました。

よかった点としては、ハックをなくすという最初に考えていた目標はちゃんと維持して実現できたのは良かったと思います。

- [実践的なREADME駆動について | GH Issue Note](https://efcl.wordpress.com/2014/12/31/%E5%AE%9F%E8%B7%B5%E7%9A%84%E3%81%AAreadme%E9%A7%86%E5%8B%95%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/)
- [README Driven Development](https://oncletom.io/talks/2014/okfestival/#/)


## 学び

学習目的で作り始めましたが、基本的にはFacebookのFluxと殆ど同じような感じで素に近い感覚の書き方ができるようなものができたと思います。

今までDispatcherが隠されてるライブラリだと、どこでそれを渡してたりするのかが実装して明確に分かったのが良かった気がします。

また[material-flux](https://github.com/azu/material-flux "azu/material-flux")はES6 Classを使いまくるという趣旨だったので、使っていますが良いところと悪いところがあります。

いいところは`constructor()`というイニシャライズする場所が決まってるので覚えやすい事、悪い所は`super()`周りに気を配る必要がある継承的な問題など。

- [`super()`の呼び忘れ](http://www.2ality.com/2015/02/es6-classes-final.html#super-constructor_calls "Classes in ECMAScript 6 (final semantics)")はネイティブだと`ReferenceError`になるが、Babel等のTranspilerでは[カバーできない](https://babeljs.io/repl/#?experimental=true&playground=true&evaluate=true&loose=false&spec=false&code=class%20Point%20{%0A%20%20constructor%28x,%20y%29%20{%0A%20%20%20%20this.x%20=%20x;%0A%20%20%20%20this.y%20=%20y;%0A%20%20}%0A%20%20toString%28%29%20{%0A%20%20%20%20return%20%27%28%27%20%2B%20this.x%20%2B%20%27,%20%27%20%2B%20this.y%20%2B%20%27%29%27;%0A%20%20}%0A}%0A%0Aclass%20ColorPoint%20extends%20Point%20{%0A%20%20constructor%28x,%20y,%20color%29%20{%0A%20%20%20%20this.color%20=%20color;%0A%20%20}%0A%20%20toString%28%29%20{%0A%20%20%20%20return%20super.toString%28%29%20%2B%20%27%20in%20%27%20%2B%20this.color;%0A%20%20}%0A}%0A%0Alet%20cp%20=%20new%20ColorPoint%2825,%208,%20%27green%27%29;%0Aconsole.log%28cp.toString%28%29%29;%0A)事
	- ライブラリ側(親クラス側)で`assert`等を使って条件を制限する実装が必要そう
- `super(args)` のように引数を渡すパターンだとユーザーは何を渡すか意識する必要があること
- `super(args)` と `callWithArgs(args)` のような関数呼び出しでは、情報量がやっぱり違うこと

など書いていて思った感想です。

しかし、下手な独自のインスタンス化する手法よりも、やり方がある程度一定になるので覚えることが少なくていいのはメリットだと思います。

他には`React.Component`ではES6 classを使って書くと`this`が自動的にバインドされないため書きにくくなる感じはしました。

これは以下のIssueでも議論されています。

- [Use ES6 Classes to create React components. · Issue #613 · facebook/react](https://github.com/facebook/react/issues/613#issuecomment-76588054)
- [Components as ES6 classes · Issue #3400 · facebook/react](https://github.com/facebook/react/issues/3400)

クラスの継承の問題は古来より伝わるものらしいので詳しい人に任せますが、JavaScriptにもいわゆる`class`っぽいものがきたので、これからのライブラリAPIをどうするかはちょっと考えていかないといけなさそうな感じはしました。

- [Joost&#39;s Dev Blog: Why composition is often better than inheritance](http://joostdevblog.blogspot.jp/2014/07/why-composition-is-often-better-than.html "Joost&#39;s Dev Blog: Why composition is often better than inheritance")
- [【翻訳】クラスの「継承」より「合成」がよい理由とは？ゲーム開発におけるコードのフレキシビリティと可読性の向上 | POSTD](http://postd.cc/why-composition-is-often-better-than-inheritance/ "【翻訳】クラスの「継承」より「合成」がよい理由とは？ゲーム開発におけるコードのフレキシビリティと可読性の向上 | POSTD")

ECMAScript 6の`class`は単なるシンタックスシュガーではなく、`Error`や`Array`、`Promise`といったネイティブオブジェクトを正しく継承するためにも必要です。

ただし`class`構文じゃないとできないという訳ではなくて`Reflect.construct`などを使えば、同じようなことが書ける気がします?

- [Classes in ECMAScript 6 (final semantics)](http://www.2ality.com/2015/02/es6-classes-final.html "Classes in ECMAScript 6 (final semantics)")

ぐだぐだ書いてしまったので結論はありませんが、合成や継承にどんな手法を使うにしても、ヒューマンリーダブルかつマシンリーダブルな書き方というのは[考えていく](https://github.com/azu/material-flux/pull/8 "Thought on functional by azu · Pull Request #8 · azu/material-flux")必要がありそうです。

[Babel]: https://babeljs.io/  "Babel · The transpiler for writing next generation JavaScript"
