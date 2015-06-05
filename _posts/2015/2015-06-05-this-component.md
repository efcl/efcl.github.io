---
title: "React/dekuコンポーネントとthisのパターン"
author: azu
layout: post
date : 2015-06-05T17:00
category: JavaScript
tags:
    - JavaScript
    - Deku
    - React
    - WebCompoents

---

最近、ReactやdekuといったViewのコンポーネントの仕組みを持ったライブラリを使って、NW.jsやElectronで[動く](https://github.com/azu/pdf-markdown-annotator)ような[アプリ](https://github.com/azu/github-issue-teev)を[書いたり](https://github.com/azu/git-scriptable-search)しています。

## thisの問題

ReactのコンポーネントをES6 Classesで書いている場合に`this`を`bind`する必要が多くなる気がします。
(そういう意味では、無理してES6 Classesを使うよりは、`React.createClass`を使ったほうが楽になるようにも思えます)

特にFlux的なStoreの変更した時にハンドラを登録したいときに`this`で`bind`した関数を登録すると、ハンドラを解除するときに面倒なことが起こります。

```js
x.bind(this) !== x.bind(this)
```

となるため、

```
    componentWillMount() {
        store.on("change", this.onChange.bind(this));
    }

    componentWillUnmount() {
        store.off("change", this.onChange.bind(this));
    }
```

だとイベントが解除できないという問題が起こります。

そのため、事前に`bind`済みのハンドラを持っておく必要が出てきたりします。


### サンプル

<iframe src="http://azu.github.io/component-event-binding/" width="100%" height="400"></iframe>

この記事では上記のような、ボタンでカウントアップするだけのものを

- React - `this`を普通にbindする手法
- React - [azu/idempotent-bind](https://github.com/azu/idempotent-bind "azu/idempotent-bind")を使ってbindする手法
- deku を使って書く

の3つ書いてみます。

ソースコードはこちら

- [azu/component-event-binding](https://github.com/azu/component-event-binding "azu/component-event-binding")

### React - `this`を普通にbindする手法

これは単純で毎回bindすると===で異なる関数が帰ってしまうので、constructorなどで一度だけbindして、それを使いまわすという形で書くことができます。

```js
import React from "react"
export default class IBComponent extends React.Component {
    constructor(...args) {
        super(...args);
        this.counterStore = this.props.context.counterStore;
        this.couterActions = this.props.context.counterActions;
        this.state = {
            count: this.counterStore.getCount()
        };
        // bind
        this.onChange = this._onChange.bind(this);
    }

    _onChange() {
        this.setState({
            count: this.counterStore.getCount()
        });
    }

    componentWillMount() {
        this.counterStore.onChange(this.onChange);
    }

    componentWillUnmount() {
        this.counterStore.removeChangeListener(this.onChange);
    }

    onClick() {
        this.couterActions.countUp();
    }

    render() {
        return <div>
            <button onClick={this.onClick.bind(this)}>{this.state.count}</button>
        </div>
    }
}
```

### 何度でもbindできる関数

先ほどの`bind`した結果は新しい関数を毎回作るため、ハンドラの登録と解除がそのままできないという話だったので、[azu/idempotent-bind](https://github.com/azu/idempotent-bind "azu/idempotent-bind")というものを書いてみました。

[azu/idempotent-bind](https://github.com/azu/idempotent-bind "azu/idempotent-bind")は以下のように、同じ関数と`this`の組み合わせだと`unbind`するまで同じ結果を返すbind関数です。

```js
import { bind, unbind } from "idempotent-bind"
bind(bind(x, this), this) === bind(x, this);
```

これを使うと先ほどのコードは、以下のように書けるようになるのでちょっとだけ短くなります。

```js
import React from "react"
import { bind, unbind } from "idempotent-bind"
export default class IBComponent extends React.Component {
    constructor(...args) {
        super(...args);
        this.counterStore = this.props.context.counterStore;
        this.couterActions = this.props.context.counterActions;
        this.state = {
            count: this.counterStore.getCount()
        };
    }

    _onChange() {
        this.setState({
            count: this.counterStore.getCount()
        });
    }

    componentWillMount() {
        this.counterStore.onChange(bind(this._onChange, this));
    }

    componentWillUnmount() {
        // The unbind method takes two arguments, target, thisArg, and returns a bound function. 
        this.counterStore.removeChangeListener(unbind(this._onChange, this));
    }

    onClick() {
        this.couterActions.countUp();
    }

    render() {
        return <div>
            <button onClick={this.onClick.bind(this)}>{this.state.count}</button>
        </div>
    }
}
```

### dekuの場合

ReactはコンポーネントをES6 Classesまたは`React.createClass`を使って書くので、いわゆるクラスっぽいもので書く感じになっています。クラスで書くとクラス内のメソッドを参照するのに`this`使うため、必然的に`this`が多くなることがわかると思います。

Reactのようなコンポーネントを扱う[deku](https://github.com/dekujs/deku "deku")というライブラリでは、このthisの問題をクラスではなく関数でコンポーネントを書くことで解決しようとしています。

- [Deku: How we built our functional alternative to React](https://segment.com/blog/deku-our-functional-alternative-to-react/ "Deku: How we built our functional alternative to React")

dekuではコンポーネントはあるメソッドを持つただのオブジェクトであって、そのメソッドに対して`proos`や`state`といったものが渡されるので、`this`を参照する必要がない仕組みになっています。

以下のようなオブジェクトが一つのコンポーネントで、Reactでは`this.props`という感じで参照する部分が引数として渡ってきていることがわかると思います。

```js
var dekuComponent = {
    initialState: function (props) {
        return {count: 0};
    },

    afterMount (component, el, setState) {
        let { props, state } = component;
    },

    beforeUnmount(component, el) {
        let {props} = component;
    },

    render(component) {
        let {props, state} = component;
        return <div>
            <button>{state.count}</button>
        </div>
    }
};
```

dekuを使って先ほどのカウントアップボタンを書いてみると以下のように書くことができます。

```js
// Define a name for the component that can be used in debugging
import {element} from 'deku'

// default: noop
var onChange = ()=> {};

// propsはReactと同じ
function initialState(props) {
    return {count: props.context.counterStore.getCount()};
}

function afterMount(component, el, setState) {
    let { props, state } = component;
    // onChangeを定義して用意しておいた変数に入れてる(解除するため)
    // 何かもっと良い書き方できそうだけど
    onChange = ()=> {
        // setStateでstateを更新する
        setState({
            count: props.context.counterStore.getCount()
        });
    };
    props.context.counterStore.onChange(onChange);
}

function beforeUnmount(component, el) {
    let {props} = component;
    props.context.counterStore.removeChangeListener(onChange);
}
function render(component) {
    let {props, state} = component;

    function onClick() {
        props.context.counterActions.countUp();
    }

    return <div>
        <button onClick={onClick}>{state.count}</button>
    </div>
}
// コンポーネントを構成するオブジェクトを返してる
export default {
    initialState,
    afterMount,
    beforeUnmount,
    render
}
```

dekuもBabelの設定を一行加えるとJSXで書くことができます。
引数に`--jsxPragma element`を渡すか、[babelrc](http://babeljs.io/docs/usage/babelrc/ "babelrc · Babel")に以下のような設定を追加することでJSXがdekuの要素を作成する関数に変換されます。

```json
{
  "jsxPragma": "element"
}
```

- [deku/jsx.md at master · dekujs/deku](https://github.com/dekujs/deku/blob/master/docs/guides/jsx.md "deku/jsx.md at master · dekujs/deku")

話を戻して、dekuによるコンポーネントを見てみると、`this`が一切出てきてないことがわかると思います。dekuの[コンポーネントはライフサイクルメソッドを持ったオブジェクト](https://github.com/dekujs/deku/blob/master/docs/guides/components.md)であればいいので、普通に関数として定義してやって、最後にオブジェクトとしてまとめれば良いことになります。

コンポーネントを構成する関数に引数に必要なもの渡せばテストできるので、テストがしやすいというのがひとつの利点です。

dekuもReactのようにライフサイクルで間違った使い方などをすると[コンソールに警告と解決方法を書いたURL](https://github.com/dekujs/deku/tree/master/docs/hints)を出してくれたり、Reactとライフサイクルは殆ど同じだったり、JSXも使えるのでReactを書いたことある人はすぐに分かる感じのライブラリだと思います。

min.jsが10kb程度でReactに比べて大分小さいことなど特徴はいくつかありますが、詳しくは以下を見てみてください。

- [Deku: How we built our functional alternative to React](https://segment.com/blog/deku-our-functional-alternative-to-react/ "Deku: How we built our functional alternative to React")

### おわりに

[![example](http://gyazo.com/f46c61f95c54c61ebca063997d420329.gif)](http://azu.github.io/component-event-binding/)

今回作ったサンプルはReactとDekuのコンポーネントをそれぞれ作って、StoreとActionは同じものを共有して使っています。

- [azu/component-event-binding](https://github.com/azu/component-event-binding "azu/component-event-binding")

書いてて思ったのが、コンポーネントを使う側(`<DekuComponent context={context}></DekuComponent>`のような部分)では、そのコンポーネントがReactなのかdekuなのかは区別しなくても良くなるのが面白いなと思いました(実際にjsxPragmaの違いがあるけど)

その辺はCustom ElementでやろうとしていることがJSX+Any Componentでやってることが大分近い感じな気がします。

- [Custom Elementは実用的なのかどうかの検証 · Issue #32 · azu/azu](https://github.com/azu/azu/issues/32 "Custom Elementは実用的なのかどうかの検証 · Issue #32 · azu/azu")

React [0.14](https://github.com/facebook/react/issues/3220 "0.14")で[Stateless Components](https://github.com/facebook/react/pull/3995 "Stateless Components")を入れる予定もあるらしいので、この辺のコンポーネントの作りはまだまだ議論の余地がありそうですね。

Fluxアーキテクチャの方も[StoreやActionはPureなオブジェクトとしたい](https://medium.com/@dan_abramov/the-evolution-of-flux-frameworks-6c16ad26bb31)という意見にも同じ流れを感じるので、JavaScriptにおけるFunctional Programmingへの取り組みは模索中という感じです。
