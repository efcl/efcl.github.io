---
title: "React/dekuコンポーネントとthisのパターン"
author: azu
layout: post
date : 2015-06-03T19:40
category: JavaScript
tags:
    - JavaScript
    - Deku
    - React

---

最近、ReactやdekuといったViewのコンポーネントの仕組みを持ったライブラリを使って、NW.jsやElectronで[動く](https://github.com/azu/pdf-markdown-annotator)[アプリ](https://github.com/azu/github-issue-teev)を[書いたり](https://github.com/azu/git-scriptable-search)しています。

## thisの問題

React ComponentをES6 Classesで書いている場合に`this`を`bind`する必要が多くなる気がします。

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

ReactはコンポーネントをES6 Classesまたは`React.createClass`を使って書くので、いわゆるクラスっぽいもので書く感じになっています。

Virtual DOMやReactのようなコンポーネントを扱う[deku](https://github.com/dekujs/deku "deku")といいうライブラリでは、このthisの問題はクラスではなく関数でコンポーネントを書くことで解決しようとしています。

- [Deku: How we built our functional alternative to React](https://segment.com/blog/deku-our-functional-alternative-to-react/ "Deku: How we built our functional alternative to React")

dekuではコンポーネントはあるメソッドを持つただのオブジェクトであって、そのメソッドに対して`proos`や`state`といったものが渡されるので、`this`を参照する必要がない仕組みになっています。

以下のようなオブジェクトが一つのコンポーネントで、Reactでは`this.props`という感じで参照する部分が引数として渡ってきていることがわかると思います。

```js
export default {
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
}
```

dekuを使って先ほどのカウントアップボタンを書いてみると以下のように書くことができます。

```js
import {element} from 'deku'

function onChange(component, el, setState) {
    let { props } = component;
    setState({
        count: props.context.counterStore.getCount()
    });
}
export default {
    initialState: function (props) {
        return {count: 0};
    },

    afterMount (component, el, setState) {
        let { props, state } = component;
        setState({
            count: props.context.counterStore.getCount()
        });

        props.context.counterStore.onChange(()=> {
            onChange(component, el, setState)
        });
    },

    beforeUnmount(component, el) {
        let {props} = component;
        props.context.counterStore.removeChangeListener(onChange);
    },

    render(component) {
        let {props, state} = component;

        function onClick() {
            props.context.counterActions.countUp();
        }

        return <div>
            <button onClick={onClick}>{state.count}</button>
        </div>
    }
}
```

dekuもBabelの設定を一行加えるとJSXで書くことができます。