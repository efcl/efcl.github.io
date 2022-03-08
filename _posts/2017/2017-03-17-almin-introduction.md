---
title: "AlminでFluxアーキテクチャをやってみる"
author: azu
layout: post
date : 2017-03-17T19:33
category: JavaScript
tags:
    - JavaScript
    - Flux
    - Almin

---

[Almin](https://github.com/almin/almin "Almin")でFluxアーキテクチャについてを見ていく話です。

AlminはいわゆるFluxライブラリ的なものですが、ドメイン駆動設計（DDD）を行うにあたって既存の[Redux](https://github.com/reactjs/redux "Redux")や[Flux](https://github.com/facebook/flux "Flux")では上手くレイヤー分けをやりにくい部分がありました。

この辺の経緯については以前スライドやドキュメントにまとめてあるので、以下を参照してください。

- [azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること](https://github.com/azu/large-scale-javascript)
- [複雑なJavaScriptアプリケーションを考えながら作る話](https://azu.github.io//slide/2016/react-meetup/large-scale-javascript.html)


この記事では、実際のサンプルコードを見ていきながら、Flux的なデータフローについて見ていきます。

## Alminでカウンターアプリを作る

このサンプルでは[Almin](https://github.com/almin/almin "Almin")を使って次のようなカウンターアプリを作っていきます。

![counter](https://almin.js.org/docs/tutorial/counter/img/counter.png)

次に英語のチュートリアルもあるので参照してください。

- [Counter App · Almin.js](https://almin.js.org/docs/tutorial/counter/ "Counter App · Almin.js")

## Source Code

ソースコードは次の場所にあります。

- <https://github.com/almin/almin/tree/master/examples/counter>

```sh
git clone https://github.com/almin/almin.git

cd almin/example/counter
npm install
npm start
# manually open
open http://localhost:8080/
```

## ディレクトリ構造

最終的なディレクトリ構造を最初に見ておくとイメージがしやすいかもしれません。

データの流れとしては、Component -> UseCase -> Storeとなりますが、実装の順序はこの順序じゃなくても問題ありません。

```
src/
├── index.js
├── component
│   ├── App.js
│   └── Counter.js
├── usecase
│   └── IncrementalCounterUseCase.js
└── store
    ├── CounterState.js
    └── CounterStore.js
```

Alminの構成要素については[Component of Almin](https://almin.js.org/docs/abstract/)を参照してみてください。

このサンプルでは、最小限の要素のみが登場しています。

- View
    - ユーザーが自由に選ぶ
    - ここではReactを選択
- Store
    - アプリの状態（State）を保存する
    - Stateが変わったことを（Viewへ）通知する
- UseCase
    - ユーザーが行いたい処理の**流れ**を書く場所

他のライブラリと見比べてみると次のような形になります。

![比較table](https://efcl.info/wp-content/uploads/2017/03/17-1489747778.png)

このサンプルは状態が1つしかないため、複数のStoreをまとめるStoreGroupや、
ロジックが殆どないためDomainといった要素は登場していません。

## カウンターの機能

1. ユーザーがボタンを押したら+1する

以上。

つまり、このカウンターは「ユーザーがボタンを押したら+1する」というUseCaseがあります。

## UseCase

カウンターの機能をUseCaseという形で実装します。
UseCaseとは、ユーザーとシステムのやり取りを対話的に書いたものです。

簡単にいえば、ユースケースにはユーザーがシステムとやり取りする手順を書いていきます。
カウンターの例では複雑な手順が出てこないため、ユーザーがUIを操作した時に行うアクションを書く場所と考えれば問題ありません。

> 1. ボタンを押したら+1する

基本的にAlminでは1 UseCase 1ファイル（クラス）として実装します。

これを実現する`IncrementalCounterUseCase.js`を作成します。
Alminの`UseCase`クラスを継承し、`execute()`メソッドに行いたい処理実装します。

```js
"use strict";
import { UseCase } from "almin";
export default class IncrementalCounterUseCase extends UseCase {
    // UseCase should implement #execute method
    execute() {
        // Write the UseCase code
    }
}
```

ここで行いたい処理というのは、カウンターを+1することです。
つまり、`IncrementalCounterUseCase`が実行されたときに、**CounterアプリのState**を更新したいわけです。

そのためには、まず**CounterアプリのState**を保持する場所が必要です。
ここでは、**CounterアプリのState**を**Store**という入れ物の中に実装します。

## Store

まずは、`CounterStore`という`Store`クラスを継承したものを作成します。

```js
"use strict";
import { Store } from "almin";
export class CounterStore extends Store {
    constructor() {
        super();
        // receive event from UseCase, then update state
    }

    // return state object
    getState() {
        return {
            count: 0 
        };
    }
}
```

Alminの`Store`は`UseCase`から`dispatch`されたpayloadを受け取ることができます。

つまり次のような流れを実装します。

1. IncrementalCounterUseCaseが"increment" payloadをdispatchします
2. CounterStoreは"increment" payloadを受け取り、自分自身のstateを更新します

これはいわゆるFluxパターンです

![flux-diagram-white-background](https://almin.js.org/docs/tutorial/counter/img/flux-diagram-white-background.png)

Fluxでは次のような説明になります。

1. ActionCreatorで"increment" actionを作りdispatchします
2. CounterStoreは"increment" payloadを受け取り、自分自身のstateを更新します

## **UseCase** dispatch -> Store
 
`IncrementalCounterUseCase`に話を戻して、「"increment" payloadをdispatch」を実装します。

```js
"use strict";
import { UseCase } from "almin";
export default class IncrementalCounterUseCase extends UseCase {
    // IncrementalCounterUseCase dispatch "increment" ----> Store
    // UseCase should implement #execute method
    execute() {
        this.dispatch({
            type: "increment"
        });
    }
}
```

`UseCase`クラスを継承したクラスは`this.dispatch(payload)`メソッド利用できます。

`payload`オブジェクトは`type`プロパティを持ったオブジェクトです。
次の`payload`は最小のものといえます。

```js
{
    type: "type";
}
```

次のように`type`以外のプロパティも持たせることができます。

```js
{
    type : "show",
    value: "value"
}
```

つまり、先ほど実装した`IncrementalCounterUseCase`は、`"increment"`いう`type`のpayloadをdispatchしています。

## UseCase -> **Store** received

次は`CounterStore` が "increment" payloadを受け取れるようにします。

`Store`クラスを継承したクラスは、`this.onDispatch(function(payload){ })`メソッドが利用できます。

```js
import { Store } from "almin";
export class CounterStore extends Store {
    constructor() {
        super();
        // receive event from UseCase, then update state
        this.onDispatch(payload => {
            console.log(payload);
            /*
            {
                type: "increment"z
            }
            */
        });
    }
    
    getState() { /* stateを返す */ }
}
```

`Store#onDispatch`メソッドで、UseCaseがdispatchしたpayloadを受け取れます。
受け取ったら`CounterStore`のstateをアップデートします。

その前に、Alminでは多くの場合StoreがStateを別々のクラスとして実装しています。

つまり、`CouterStore`は`CounterState`のインスタンスをもつという形にしています。

**Store**

- dispatchや変更を監視、Stateを保持する層

**State**

- ステート！

## State

まずは`CounterState.js`を作成します。
State自体はただのJavaScriptで、Alminとして`State`のようなクラスは提供していません。

`CounterState`の目的は

- "payload"を受け取り、新しいStateを返す

```js
export default class CounterState {
    /**
     * @param {Number} count
     */
    constructor({ count }) {
        this.count = count;
    }

    reduce(payload) {
        switch (payload.type) {
            // Increment Counter
            case "increment":
                return new CounterState({
                    count: this.count + 1
                });
            default:
                return this;
        }
    }
}
```

このパターンはどこかで見たことがあるかもしれません。
Reduxの **reducer** と呼ばれるものによく似たものを実装しています。

- [Reducers | Redux](http://redux.js.org/docs/basics/Reducers.html "Reducers | Redux")
- [Flux | Application Architecture for Building User Interfaces](https://facebook.github.io/flux/docs/flux-utils.html "Flux | Application Architecture for Building User Interfaces")

## Store -> State: NewState

最後に、`CounterStore`へStateを更新するコードをを追加したら完成です。

1. dispatchされたpayloadを受け取り、`CounterState`を更新を試みます
2. もし`CounterState`が更新されたなら, `CounterStore#emitChange`を叩き変更を通知します
3. `getState(){}`ではStateのインスタンスを返します

`Store`を継承したクラスは`this.emitChange()`メソッドを持っています。
これは、Storeを監視しているもの（主にView）に対して、Store（State）が変わったことを通知しています。

```js
"use strict";
import { Store } from "almin";
import CounterState from "./CounterState";
export class CounterStore extends Store {
    constructor() {
        super();
        // initial state
        this.state = new CounterState({
            count: 0
        });
        // receive event from UseCase, then update state
        this.onDispatch(payload => {
            const newState = this.state.reduce(payload);
            if (newState !== this.state) {
                this.state = newState;
                this.emitChange();
            }
        });
    }

    getState() {
        return this.state;
    }
}
```

### Side note: Testing

UseCase、Store、Stateと分かれているのでテストも書くのは簡単です。
次の場所にテストコードもあります。

- [almin/example/counter/test at master · almin/almin](https://github.com/almin/almin/tree/master/example/counter/test "almin/example/counter/test at master · almin/almin")

## View Integration

ここでは、Viewの例として[React](https://facebook.github.io/react/ "React")を使っています。

### App

`App.js`というコンポーネント、いわゆるContainer Componentを作成します。

次に`Context`オブジェクトを作成します。 
`Context`オブジェクトとはStoreとUseCaseを繋ぐ役割をするものです。

次のように、StoreのインスタンスとDispatcherのインスタンスを渡して初期化しています。
ここではStoreが1つのみですが、Alminでは複数のStoreをまとめるStoreGroupというものも用意しています。
StoreGroupには `{ State名: Store }` というように対応関係のマッピングオブジェクトを渡します。
`StoreGroup#getState`で `{ State名: Store#getState()結果 }`が取得できます。

```js
import { Context, Dispatcher } from "almin";
import { CounterStore } from "../store/CounterStore";
// a single dispatcher
const dispatcher = new Dispatcher();
// a single store. if you want to use multiple, please use StoreGroup!
const store = new CounterStore();
// StoreGroupを
const storeGroup = new StoreGroup({
    // stateName : store
    counter: store
});
const appContext = new Context({
    dispatcher,
    store: storeGroup
});
```

```js
"use strict";
import React from "react";
import { Context, Dispatcher } from "almin";
import { CounterStore } from "../store/CounterStore";
// a single dispatcher
const dispatcher = new Dispatcher();
// a single store
const store = new CounterStore();
const appContext = new Context({
    dispatcher,
    store
});
import Counter from "./Counter";
export default class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = appContext.getState();
    }

    componentDidMount() {
        // when change store, update component
        const onChangeHandler = () => {
            return requestAnimationFrame(() => {
                this.setState(appContext.getState());
            });
        };
        appContext.onChange(onChangeHandler);
    }

    render() {
        /**
         * Where is "CounterState" come from?
         * It is a `key` of StoreGroup.
         *
         * ```
         * const storeGroup = new StoreGroup({
         *   "counter": counterStore
         * });
         * ```
         * @type {CounterState}
         */
        const counterState = this.state.counter;
        return <Counter counterState={counterState}
                        appContext={appContext}/>;
    }
}
```

App.jsを見てみると、

```js
appContext.onChange(onChangeHandler);
```

これは、`CounterStore` が変更される(`emitChange()`を叩く)と`onChangeHandler`が呼ばれることを意味しています。
そして、`onChangeHandler` は`App` componentのState（ReactのState）を更新します。

### Counter component

後は、`counterState`をCounterComponent（実際にcountを表示するView）が受け取り、カウントの値を表示すれば完成です。

カウントを更新したい場合は、作成したIncrementalCounterUseCaseを`context.useCase(new IncrementalCounterUseCase()).execute(渡したい値);`で呼び出すことができます。

```js
context.useCase(new IncrementalCounterUseCase()).execute();
```

```js
"use strict";
import React from "react";
import IncrementalCounterUseCase from "../usecase/IncrementalCounterUseCase";
import { Context } from "almin";
import CounterState from "../store/CounterState";
export default class CounterComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    incrementCounter() {
        // execute IncrementalCounterUseCase with new count value
        const context = this.props.appContext;
        context.useCase(new IncrementalCounterUseCase()).execute();
    }

    render() {
        // execute UseCase ----> Store
        const counterState = this.props.counterState;
        return (
            <div>
                <button onClick={this.incrementCounter.bind(this)}>Increment Counter</button>
                <p>
                    Count: {counterState.count}
                </p>
            </div>
        );
    }
}
CounterComponent.propTypes = {
    appContext: React.PropTypes.instanceOf(Context).isRequired,
    counterState: React.PropTypes.instanceOf(CounterState).isRequired
};
```

これにより、一般的なFluxの一方こうのデータフローが次のようにできていることが分かります。

- React -> UseCase -> Store（State） -> React


## Alminとロガー

Alminはアプリケーションのログをキチンと取れるようにするという設計の思想があります。
そのため、`Context`にはAlminがやっていることを通知するイベントがあり、これを利用して殆どのログがとれます。

[almin-logger](https://github.com/almin/almin-logger "almin-logger")という開発用のロガーライブラリが用意されているので、これを先ほどのサンプルに入れて動かしてみます。

- [almin-logger](https://github.com/almin/almin-logger "almin-logger")

3行追加するだけで次のような、UseCaseの実装やそのUseCaseによるStoreの変更などがコンソールログとして表示されます。

```js
import ContextLogger from "almin-logger";
const logger = new ContextLogger();
logger.startLogging(appContext);
```

<iframe src="//giphy.com/embed/3og0ICodJBeY3BQk1y" width="480" height="392" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="http://giphy.com/gifs/3og0ICodJBeY3BQk1y">via GIPHY</a></p>

また、Reduxを使ったことがある人は[Redux DevTools](https://github.com/gaearon/redux-devtools "Redux DevTools")というブラウザ拡張で動く開発者ツールを使ったことがあるかもしれません。

この拡張実は任意のFluxライブラリと連携するAPIも公開されています。

- [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension "Redux DevTools Extension")

Alminでは[almin-devtools](https://github.com/almin/almin-devtools "almin-devtools")を使うことで、
[Redux DevTools](https://github.com/gaearon/redux-devtools "Redux DevTools")と連携できます。

ブラウザに[Redux DevTools](https://github.com/gaearon/redux-devtools "Redux DevTools")をインストールします。

- Chrome: [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd);
- Firefox: [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/remotedev/);
- Electron: [`electron-devtools-installer`](https://github.com/GPMDP/electron-devtools-installer)

そして、3行加えるだけで、Alminのログを[Redux DevTools](https://github.com/gaearon/redux-devtools "Redux DevTools")で見ることができます。（タイムマシーンデバッグなどはアプリ側でちゃんと実装しないと動かないので制限があります）

```js
import AlminDevTools from "almin-devtools";
const logger = new AlminDevTools(appContext);
logger.connect();
```

<iframe src="//giphy.com/embed/3ohzdEYLL9sEapqPUA" width="480" height="482" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="http://giphy.com/gifs/3ohzdEYLL9sEapqPUA">via GIPHY</a></p>

この辺のログ取ることによる開発時のメリットなどについては次の文章でまとめてあります。

- [azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること](https://github.com/azu/large-scale-javascript "azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること")

## おわりに

Alminで簡単なカウンターアプリを作成しました。

この例では典型的なFluxのパターンをAlminで行えていることが分かります。

![almin-flux.png](https://almin.js.org/docs/tutorial/counter/img/almin-architecture-flux.png)

実際のアプリケーションでは、StoreやUseCaseが1つだけというものはあまりないと思います。
TodoMVCの例では、CQRSやドメインモデルなどの要素も登場し、複数のUseCaseを実装していきます。

- [Todo App · Almin.js](https://almin.js.org/docs/tutorial/todomvc/ "Todo App · Almin.js")

Alminは元々ある程度複雑になるであろうアプリケーションのために作成しています。
ただし、複雑なアプリケーションの開発を支えるのは設計や開発方法が主で、ライブラリはその一部分に過ぎません。

そのため、小さく使おうと思えば[facebook/flux](https://github.com/facebook/flux "facebook/flux")や[Redux](https://github.com/reactjs/redux "Redux")などと使い勝手はそこまでは代わりません。
設計思想としてアプリケーションが大きくなることを前提としているので、
大きくなってきた時のレイヤリングのしやすさやログなど開発の補助の充実に力を入れています。

どれだけ短く書けるかよりも、どれだけ読みやすく書けて管理できるかの方がメインといえるかもしれません。

この辺の話は、次のスライドやリポジトリを見てみるとよいかもしれません。

- スライド: [複雑なJavaScriptアプリケーションを考えながら作る話](https://azu.github.io//slide/2016/react-meetup/large-scale-javascript.html "複雑なJavaScriptアプリケーションを考えながら作る話")
- [azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること](https://github.com/azu/large-scale-javascript "azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること")
