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

---

# Flux

[material-flux](https://github.com/azu/material-flux "azu/material-flux")というFluxアーキテクチャの実装ライブラリを書きました。

## なぜ作ったか

IDE readable(machine readable)なライブラリが欲しかったのがひとつの理由です。
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

examplesや[voronianski/flux-comparison](https://github.com/voronianski/flux-comparison "voronianski/flux-comparison")にも例があるのでそちらも見てもらえるといいかもしれません。

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


[Babel]: https://babeljs.io/  "Babel · The transpiler for writing next generation JavaScript"