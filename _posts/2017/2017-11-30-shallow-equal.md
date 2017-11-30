---
title: "shallow-equal for Object/React props"
author: azu
layout: post
date : 2017-11-30T10:12
category: JavaScript
tags:
    - JavaScript
    - React

---

オブジェクトとReactのProps向けのShallow(浅い) equalライブラリを書きました。
Shallow Equalは対象のオブジェクトのプロパティをそれぞれ1段だけ比較することを言います。
ものすごく単純に書くならば次のようなことをするライブラリです。

```js
const object = {}, targetObject = {};
const isEqualed = Object.keys(object).some(key => {
	return object[key] !== targetObject[key];
});
```

- [shallow-equal-object](https://github.com/azu/shallow-equal-object "shallow-equal-object")
- [shallow-equal-props](https://github.com/azu/shallow-equal-props "shallow-equal-props")

どちらもTypeScriptに対応していて、シンプルにオブジェクト同士を比較してbooleanを返すだけのライブラリです。

```js
const { shallowEqual } = require("shallow-equal-object");
shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // => true
shallowEqual({ a: 1, b: 2 }, { a: 1, b: 42 }); // => false
shallowEqual({ a: 1, b: 2 }, { }); // => false
```

[shallow-equal-object](https://github.com/azu/shallow-equal-object "shallow-equal-object")は、値の比較関数をカスタマイズできます。
デフォルトの比較関数は`Object.is`メソッド相当の実装がつかわれています。
これは、Reactの`PureComponent`やECMAScriptのProposalとして提出されていた(現在は取り下げ)[ecmascript-shallow-equal](https://github.com/sebmarkbage/ecmascript-shallow-equal "ecmascript-shallow-equal")と同じ比較となります。

[shallow-equal-props](https://github.com/azu/shallow-equal-props "shallow-equal-props")は、この値の比較関数をReactのProps向けにしただけのバージョンです。
具体的には、`React.Element`同士の比較を考慮したバージョンなので、`props`(`children`も含む)に`React.Element`を使っていないなら大した違いはありません。

```js
shallowEqual({ a: "string" }, { a: "string" }, {
    customEqual: (a, b) => {
        return typeof a === "number" && typeof b === "number";
    }
}); // => false
```

どちらもデバッグモードに対応しています。
実際にshallowEqualしたことがある人はわかると思いますが、なぜそれが`false`になるのかは結構分かりにくいことが多いです。どのプロパティが異なるから`false`になったということをデバッグ時に知りたいがことが多々あります。

どちらのライブラリも `{ debug: true }` をオプションに渡すことでコンソールに、比較結果が`false`となった理由とオブジェクトを表示してくれます。

```js
shallowEqual(null, {}, {
    debug: true
});
// "objectA is not object."

shallowEqual({}, null, {
    debug: true
});
// "objectB is not object."

shallowEqual({}, { a: 1 }, {
    debug: true
});
// "object key length is not same"

shallowEqual({ a: 1 }, { a: 2 }, {
    debug: true
});
// "key:a is not equals between A and B."
```

このShallow Equalがどのようなときに役立つかというと大きなオブジェクトの塊を比較するときに、オブジェクトの作り方次第では比較コストが大きく変わります。

ReactやReduxなどでよく言われる状態のオブジェクトのをImmutableにするのはこれに関連しています。

- [「オブジェクトをイミュータブルにしろ」って言うけど、それってたとえば状態が変わったらオブジェクト作り直すってことでしょ、ちょう非効率じゃん。って思ってたんだけど、 - 猫型の蓄音機は 1 分間に 45 回にゃあと鳴く](http://nekogata.hatenablog.com/entry/2013/06/15/013752 "「オブジェクトをイミュータブルにしろ」って言うけど、それってたとえば状態が変わったらオブジェクト作り直すってことでしょ、ちょう非効率じゃん。って思ってたんだけど、 - 猫型の蓄音機は 1 分間に 45 回にゃあと鳴く")

実際にReactの例を見てみます。
次のサンプルは、恣意的な`JSON.stringify`でのDeepな比較の問題点を見るために作ったものです。
そのためDeepEqualが悪いという話ではありません。

## Deep Equal(`JSON.stringify`)とShallow Equal

サンプルコードは次のリポジトリにあります。

- [azu/avoid-json-stringify-on-react: Deep equal vs. Shallow equal on React's shouldComponentUpdate](https://github.com/azu/avoid-json-stringify-on-react "azu/avoid-json-stringify-on-react: Deep equal vs. Shallow equal on React&#39;s shouldComponentUpdate")

このサンプルではDeep Equalの実装例として`JSON.stringify`した結果同士を比較するものを利用しています。最近、Reactのドキュメントにおいて`shouldComponentUpdate`の実装で`JSON.stringify`を使うべきではないということが追加されています。
これを検証する目的で作ったサンプルコードです。

> We do not recommend doing deep equality checks or using JSON.stringify() in shouldComponentUpdate(). It is very inefficient and will harm performance.
> https://reactjs.org/docs/react-component.html#shouldcomponentupdate

**関連するIssue**

- [Performance issue (crash) in large apps when using Field with children in React v16 · Issue #3461 · erikras/redux-form](https://github.com/erikras/redux-form/issues/3461)
- [Document that deep equality checks and JSON.stringify() in shouldComponentUpdate() are a bad idea · Issue #7 · reactjs/reactjs.org](https://github.com/reactjs/reactjs.org/issues/7)

このサンプルでは、すべてのコンポーネントは`BaseComponent`を継承しています。
`BaseComponent`はDeep Equal(`JSON.stringify`)とShallow Equalが切り替えできるようになっています。

```js
import * as React from "react";
import { shallowEqual } from "shallow-equal-object";

export const isDeepEqual = (prevState: any, nextState: any) => {
    return JSON.stringify(prevState) === JSON.stringify(nextState);
};
export const isShallowEqual = (prevState: any, nextState: any) => {
    return shallowEqual(prevState, nextState);
};

export abstract class BaseComponent<P, S> extends React.Component<P, S> {
    shouldComponentUpdate(nextProps: P) {
        const shouldUpdate = !isShallowEqual(this.props, nextProps);
        return shouldUpdate;
    }
}
```

アプリの構造はシンプルで`<A/>`というネストが深い用途、でっかいリストを描画する`<List />`があります。`<button />`を押すたびに、`state.a`の中にある`count`が+1ずつ更新されるだけです。

ここで`<List />`に渡す`state.largeList`は初回時に固定の10000コの配列を作ったものが入ります。

```js
const frozenLargeList = new Array(10000).fill("x");
```

ボタン押しても`List`のpropsである`state.largeList`は変更されないので、`<List/>`は一度描画されたら更新する必要がありません。

```js
<div className="App">
    <A {...state.a}/>
    <button onClick={this.onClick}>+1</button>
    <hr/>
    <List items={state.largeList}/>
</div>
```

この渡されたpropsが同じ値であるなら、更新しないというのをReactでは`BaseComponent`ででてきた`shouldComponentUpdate`メソッドの実装で解決できます。


```js
export abstract class BaseComponent<P, S> extends React.Component<P, S> {
    shouldComponentUpdate(nextProps: P) {
        return true;
    }
}
```

デフォルトの`shouldComponentUpdate`は常に`true`を返すので、常に新しい値が来たら更新することになります。
これを防止する方法として`this.props`(今のprops)と次にくる`nextProps`を比較して、同じなら`false`を返せば更新されないという寸法です。

今回はこの実装をDeep Equal(`JSON.stringify`)とShallow Equal([shallow-equal-object](https://github.com/azu/shallow-equal-object "shallow-equal-object"))で比較しています。(`React.PureComponent`はShallow Equalと同じ実装になります)

`<A />`は毎回新しいPropsを受け取るので更新されますが、`<List items={state.largeList}/>`は同じpropsを毎回受け取るので更新する必要がありません。

どちらもDeepもShallow(`state.largeList`の参照先は毎回同じ)も比較結果は`true`となり、つまりそれを反転して返せば更新されません。

```js
export abstract class BaseComponent<P, S> extends React.Component<P, S> {
    shouldComponentUpdate(nextProps: P) {
        const shouldUpdate = !isShallowEqual(this.props, nextProps);
        return shouldUpdate;
    }
}
```

ここで本題のDeep Equal(`JSON.stringify`)とShallow Equalの比較のコストの差の話がでてきます。このコストの差は`shouldComponentUpdate`の処理自体にどれぐらいかかっているかを調べれば比較できます。

React 15まではreact-addon-perfsで比較できましたが、React 16では`?react_perf`の`performance.mark`の結果を使うのが簡単です。

実行前に`PerformanceObserver`でReactが`performance.measure`した結果をコンソールログに出すように仕込んでおきます。

```js
const observer = new (window as any).PerformanceObserver((list: any) => {
    let components: string[] = [];
    let totalDuration = 0;
    list.getEntries().forEach((entry: any) => {
        // Display each reported measurement on console
        if (entry.name.includes("shouldComponentUpdate")) {
            components.push(entry.name);
            totalDuration += entry.duration;
            console.log("Name: " + entry.name +
                ", Duration: " + (entry.duration) + "\n");
        }
    });
    if (components.length > 0) {
        console.log(`Total shouldComponentUpdate: ${totalDuration}`);
        console.log(`Updated components:`, components.join(", "));
    }

});
observer.observe({ entryTypes: ['measure'] });
```

このログには、それぞれのコンポーネントの`shouldComponentUpdate`の時間が出力されます。

次の環境で3回更新を更新を起こした時の`shouldComponentUpdate`の時間を計測しました。


- MacBookPro14,1
- CPU: Intel Core i7, 2.5 GHz
- Browser: Chrome – 6x CPU throttling


### Deep Equal(`JSON.stringify`)の結果


Deep Equal (`JSON.stringify(prevProps) === JSON.stringify(nextProps)`):


![image](https://user-images.githubusercontent.com/19714/33408570-7e4ff248-d5ba-11e7-8470-684413a8fb25.png)

```
Name: ⚛ A.shouldComponentUpdate, Duration: 0.9350000000004002

App.tsx:27 Name: ⚛ B.shouldComponentUpdate, Duration: 0.010000000000218279

App.tsx:27 Name: ⚛ C.shouldComponentUpdate, Duration: 1.1300000000001091

App.tsx:27 Name: ⚛ D.shouldComponentUpdate, Duration: 0.015000000000327418

App.tsx:27 Name: ⚛ E.shouldComponentUpdate, Duration: 0.009999999999308784

App.tsx:27 Name: ⚛ List.shouldComponentUpdate, Duration: 5.364999999999782

App.tsx:32 Total shouldComponentUpdate: 7.4650000000001455
App.tsx:33 Update components: ⚛ A.shouldComponentUpdate, ⚛ B.shouldComponentUpdate, ⚛ C.shouldComponentUpdate, ⚛ D.shouldComponentUpdate, ⚛ E.shouldComponentUpdate, ⚛ List.shouldComponentUpdate

App.tsx:27 Name: ⚛ A.shouldComponentUpdate, Duration: 0.014999999999417923

App.tsx:27 Name: ⚛ B.shouldComponentUpdate, Duration: 0.004999999999199645

App.tsx:27 Name: ⚛ C.shouldComponentUpdate, Duration: 0.019999999999527063

App.tsx:27 Name: ⚛ D.shouldComponentUpdate, Duration: 0.005000000000109139

App.tsx:27 Name: ⚛ E.shouldComponentUpdate, Duration: 0

App.tsx:27 Name: ⚛ List.shouldComponentUpdate, Duration: 5.770000000000437

App.tsx:32 Total shouldComponentUpdate: 5.81499999999869
App.tsx:33 Update components: ⚛ A.shouldComponentUpdate, ⚛ B.shouldComponentUpdate, ⚛ C.shouldComponentUpdate, ⚛ D.shouldComponentUpdate, ⚛ E.shouldComponentUpdate, ⚛ List.shouldComponentUpdate


App.tsx:27 Name: ⚛ A.shouldComponentUpdate, Duration: 0.015000000000327418

App.tsx:27 Name: ⚛ B.shouldComponentUpdate, Duration: 0.005000000000109139

App.tsx:27 Name: ⚛ C.shouldComponentUpdate, Duration: 0.005000000000109139

App.tsx:27 Name: ⚛ D.shouldComponentUpdate, Duration: 0.005000000000109139

App.tsx:27 Name: ⚛ E.shouldComponentUpdate, Duration: 0.005000000001018634

App.tsx:27 Name: ⚛ List.shouldComponentUpdate, Duration: 5.154999999999745

App.tsx:32 Total shouldComponentUpdate: 5.190000000001419
App.tsx:33 Update components: ⚛ A.shouldComponentUpdate, ⚛ B.shouldComponentUpdate, ⚛ C.shouldComponentUpdate, ⚛ D.shouldComponentUpdate, ⚛ E.shouldComponentUpdate, ⚛ List.shouldComponentUpdate
```

### Shallow Equal

Shallow Equal(Use [shallow-equal-object](https://github.com/azu/shallow-equal-object "shallow-equal-object"))

![image](https://user-images.githubusercontent.com/19714/33408628-d3677756-d5ba-11e7-83a3-5113a2e09739.png)

```
Name: ⚛ A.shouldComponentUpdate, Duration: 0.13999999999941792

App.tsx:27 Name: ⚛ B.shouldComponentUpdate, Duration: 0.010000000001127773

App.tsx:27 Name: ⚛ C.shouldComponentUpdate, Duration: 0.004999999999199645

App.tsx:27 Name: ⚛ D.shouldComponentUpdate, Duration: 0.010000000000218279

App.tsx:27 Name: ⚛ E.shouldComponentUpdate, Duration: 0.015000000000327418

App.tsx:27 Name: ⚛ List.shouldComponentUpdate, Duration: 1.125

App.tsx:32 Total shouldComponentUpdate: 1.305000000000291
App.tsx:33 Updated components: ⚛ A.shouldComponentUpdate, ⚛ B.shouldComponentUpdate, ⚛ C.shouldComponentUpdate, ⚛ D.shouldComponentUpdate, ⚛ E.shouldComponentUpdate, ⚛ List.shouldComponentUpdate

App.tsx:27 Name: ⚛ A.shouldComponentUpdate, Duration: 0.009999999999308784

App.tsx:27 Name: ⚛ B.shouldComponentUpdate, Duration: 0.005000000000109139

App.tsx:27 Name: ⚛ C.shouldComponentUpdate, Duration: 0.005000000000109139

App.tsx:27 Name: ⚛ D.shouldComponentUpdate, Duration: 0.004999999999199645

App.tsx:27 Name: ⚛ E.shouldComponentUpdate, Duration: 0.005000000000109139

App.tsx:27 Name: ⚛ List.shouldComponentUpdate, Duration: 0.009999999999308784

App.tsx:32 Total shouldComponentUpdate: 0.03999999999814463
App.tsx:33 Updated components: ⚛ A.shouldComponentUpdate, ⚛ B.shouldComponentUpdate, ⚛ C.shouldComponentUpdate, ⚛ D.shouldComponentUpdate, ⚛ E.shouldComponentUpdate, ⚛ List.shouldComponentUpdate

App.tsx:27 Name: ⚛ A.shouldComponentUpdate, Duration: 0.010000000000218279

App.tsx:27 Name: ⚛ B.shouldComponentUpdate, Duration: 0.004999999999199645

App.tsx:27 Name: ⚛ C.shouldComponentUpdate, Duration: 0

App.tsx:27 Name: ⚛ D.shouldComponentUpdate, Duration: 0.004999999999199645

App.tsx:27 Name: ⚛ E.shouldComponentUpdate, Duration: 0.005000000000109139

App.tsx:27 Name: ⚛ List.shouldComponentUpdate, Duration: 0.005000000000109139

App.tsx:32 Total shouldComponentUpdate: 0.029999999998835847
App.tsx:33 Updated components: ⚛ A.shouldComponentUpdate, ⚛ B.shouldComponentUpdate, ⚛ C.shouldComponentUpdate, ⚛ D.shouldComponentUpdate, ⚛ E.shouldComponentUpdate, ⚛ List.shouldComponentUpdate
```

## 結果

Deep Equalは合計で5ms程度かかるのに対して、Shallowは0.02ms程度で済んでいます。
200倍程度の違いがでていますが、これは複雑で巨大なpropsになるほどDeep Equalは不利になります。
(今回は10000コ程度の配列)

この例は恣意的な比較なので、十分に早いデバイスでそこまで大きくないオブジェクトなら目に見えるコストにはなりにくいです。

`shouldComponentUpdate`はかなり高頻度で呼ばれる処理であるため、この比較処理自体が重いとコンポーネントを更新しなかったとしても重たいことになります。

また、`JSON.stringify`はReact.Elementなど正しくstringifyできないものが来た場合にも問題がでてくるため実際にはその判定も必要です。(propsにはReactElementが渡されることがある。Childrenとか普通に属性として)
[shallow-equal-props](https://github.com/azu/shallow-equal-props "shallow-equal-props")はReact Elementの比較も考慮したshallow equalの実装です。

BaseComponentなどでDeep Equalなどを使った`shouldComponentUpdate`は簡単でpropsが小さい間は効果的です。しかし、propsに巨大な配列などや循環参照しているもの、複雑なオブジェクトが入ってくると破綻しやすくなります。

Shallow Equalの場合はそのようなことはありませんが、参照する値の比較になるため状態をImmutableに作ったり、そのImmutableなツリーとして意識する必要がでてきます。

- [「オブジェクトをイミュータブルにしろ」って言うけど、それってたとえば状態が変わったらオブジェクト作り直すってことでしょ、ちょう非効率じゃん。って思ってたんだけど、 - 猫型の蓄音機は 1 分間に 45 回にゃあと鳴く](http://nekogata.hatenablog.com/entry/2013/06/15/013752 "「オブジェクトをイミュータブルにしろ」って言うけど、それってたとえば状態が変わったらオブジェクト作り直すってことでしょ、ちょう非効率じゃん。って思ってたんだけど、 - 猫型の蓄音機は 1 分間に 45 回にゃあと鳴く")

Mutableな方法でStateの更新処理を行う場合は、Shallow Equalでは更新したつもりが更新されていないと判定されてしまう場合があります。
よくあるのは配列の値を追加するときに`Array#push`で行った場合などです。

- [配列 · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/array/#mutable-immutable "配列 · JavaScriptの入門書 #jsprimer")

```js
const state = {
	array: []
};
// arrayの中身は更新されているけど、`state.array`の参照する配列オブジェクトは同じ
// Deep Equalでは異なるものとして判定できるけど、Shallow Equalでは同じオブジェクトとなる
state.array.push(1);
```

これをImmutableな形で更新するには、`state.array`の参照する配列オブジェクトそのものを更新する必要があります。

```js
const state = {
	array: []
};
// arrayの中身は更新し、かつ`state.array`の参照する配列オブジェクトも更新
state.array = state.array.concat(1);
```

このように、Shallow Equalが効果的に動くようにするためには、状態の管理の仕方も大事になってきます。

例えば、ステート管理ライブラリと言われてるものを見てみると、色々なパターンでこのShallow EqualができるようなStateを作りやすくなっています。

[Redux](https://redux.js.org/)のReducerで`state`を受け取り、その`state`が更新する必要ないなら、そのまま`state`を返すというパターンはImmutableな状態の実装パターンの一つです。

[MobX](https://github.com/mobxjs/mobx)の[mobx-state-tree](https://github.com/mobxjs/mobx-state-tree "mobx-state-tree")は、mutableなmodelを持っておき、immutableなオブジェクトをスナップショットとして取得できます。

[Almin](https://almin.js.org/)のStoreでは、ReduxのようなパターンでImmutableなStateを更新したり、Repositoryに保存したドメインモデルから必要になったタイミングで新しいStateに変換して返すなどのパターンで実装します。

UIを持つ多くのアプリでは、状態を更新する回数よりも、状態を読み取りUIを作る回数の方が多くなりやすいです。そのため、更新のコストをちょっと払って(Immutableな更新)、状態からUIを更新するコストを小さくする(Shallow Equalにより判定処理自体を簡潔にする)ことがパフォーマンスにも効果がでます。また、更新範囲を抑えることが重要になるので、状態を作るときにある程度コントールしないと影響範囲を抑えるのは難しくなります。

## おわり

世の中には既にいろんなShallow Equalのライブラリがあります。(大体実装は同じです)
今回はTypeScript対応がなかったのと、デバッグの仕組みを持っているものが見つからなかったのでライブラリを作りました。

- [shallow-equal-object](https://github.com/azu/shallow-equal-object "shallow-equal-object")
- [shallow-equal-props](https://github.com/azu/shallow-equal-props "shallow-equal-props")