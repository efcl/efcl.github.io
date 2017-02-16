---
title: "JavaScriptの配列のパターン"
author: azu
layout: post
date : 2016-10-11T20:44
category: JavaScript
tags:
    - JavaScript
    - js-primer

---

JavaScriptの配列をどう解説するかを考えていて、配列って普段どういう風に使ってるけ?みたいなことを書き出してみました。

- [Arrayオブジェクト · Issue #49 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/49 "Arrayオブジェクト · Issue #49 · asciidwango/js-primer")

皆さんは配列をどう使いますか?

## 配列の作成

配列の作成には配列リテラル（`[]`）を使います。
配列リテラルには初期値も指定できます。

```js
var emptyArray = []; // 空の配列を作成
var array = [1, 2, 3]; // 値をもった配列を作成
```

Arrayオブジェクトを`new`演算子でインスタンス化する方法は基本的には使いません。
こちらは配列リテラルとは異なり、初期値ではなく配列の長さを指定し、**疎な配列**を作ります。

疎な配列とは、配列の要素が空となっているもので、隙間を持った配列のことを言います。

JavaScriptでは、配列は固定長ではなく可変長のみとなっていることや、
初期値を指定できないため、`new Array`で疎な配列を作る意味は少ないです。

```js
// 10個分のlengthを持った疎の配列
var array = new Array(10);
// 中身が空なので、値を持っていない
console.log(array.hasOwnProperty(0));// => false
```

バイナリデータを扱うようなパフォーマンスが求められるケースは、
`Array`（配列）ではなく`TypedArray`（型付き配列）を利用します。

`Array`（配列）と`TypedArray`（型付き配列）は似ていますが、
基本的に異なる目的を持ったものなので、ここでは`Array`（配列）についてを扱います。


## 配列の要素を削除する

delete演算子で配列の要素を削除することができますが、
注意点としては値を消すだけで、消した値を詰めるような処理は行いません。
つまり、`delete`した結果として疎な配列ができあがります。

次のように、`length`が`3`の配列の1番目の要素を消しても、
`length`は`3`のままとなります。
`delete`演算子では、自動的に削除された配列の要素を詰めません。

```js
var array = [1, 2, 3];
console.log(array.length); // => 3
delete array[1];
console.log(array); // => [1, , 3]
console.log(array.length); // => 3
```

一方、`Array#splice`メソッドを利用すると、削除した要素を自動で詰めることができます。
`Array#splice`メソッドは、`index`番目から`削除する数`だけ要素を取り除き、必要ならば要素を同時に追加できます。

    array.splice(index, 削除する数, [追加する要素][, ..., 追加する要素]);

つまり、配列の1番目の要素を削除するには、1番目から1つの要素を削除するという指定をする必要があります。
このとき、削除した要素は自動で詰められるため、疎な配列にはなりません。

```js
var array = [1, 2, 3];
console.log(array.length); // => 3
array.splice(1, 1);
console.log(array); // => [1, 3]
console.log(array.length); // => 2
```

この`Array#splice`メソッドをImmutableにする場合は結構小難しい書き方になります。

```js
function immutableSplice(arr, start, deleteCount, ...items) {
    return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)];
}
```

- [Pure javascript immutable arrays](http://vincent.billey.me/pure-javascript-immutable-array "Pure javascript immutable arrays")

## Arrayの要素を全削除

配列の要素をすべて削除するには `length` に `0`を設定する方法があります。

```js
var array = [1, 2, 3];
array.length = 0;
console.log(array[0] === undefined); // => true
```

仕様的には代入された`length`からはみ出ている要素をすべて `[[Delete]]` とするという処理になります。

- [ArraySetLength (A, Desc)](http://www.ecma-international.org/ecma-262/7.0/#sec-arraysetlength "ArraySetLength (A, Desc)")

`Array#splice`やそもそもその要素を削除するひつようがないなら、空の配列で変数を上書きするでもよいはずです。

```js
var array = [1, 2, 3];
array = [];
// or
array.length = 0;
```

次の２つは`array`という変数を参照の値を渡しているものがあるかで意味が異なります。
次のように`length`を変更した場合は、コールバック関数に渡した配列も影響を受けます。

```js
function doSomething(callbck) {
    var array = [];
    callback(array);
    // array = [];
    // or
    // array.length = 0;
}

doSomething((array) => {
    console.log(array);
});
```

## 配列は参照型

配列はプリミティブな値ではなくオブジェクトなので、変数に入れると参照型の値になります。
次にように、配列を参照する`a`という変数の値を`b`に代入しても、`b`には配列の参照が入るだけです。
そのため、`a`に変更を加えると、`b`も同じ配列を参照しているため影響を受けます。

```js
var a = [1, 2, 3];
var b = a;
a.push(4);
console.log(b); // => [1, 2, 3, 4]
```

一方、プリミティブな値である文字列では、`b`に`a`を代入する際に`a`の値がコピーされます。
つまり、変数`a`に変更を加えても、コピーされた値をもつ変数`b`は影響を受けません。

```js
var a = "string";
var b = a;
a = a + "!";
console.log(b); // => "string"
```

StringやNumberなどのプリミティブな値は、作成後に値そのものの状態は変更できません。
このような特性をもつものをImmutableと呼び、StringなどはImmutableです。

一方、ArrayやObjectなどのプリミティブな値でないものは、作った後も状態を変更できるためMutableと呼ばれます。

詳しくは[データ型とリテラル · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/data-type/ "データ型とリテラル · JavaScriptの入門書 #jsprimer")を参照してください。

## Arrayのコピー

配列をshallow copyする流派としてconcatとsliceがあります。

```js
var array = [1, 2, 3];
var copyC = array.concat();
var copyS = array.slice();
console.log(array !== copyC); // => true
console.log(array !== copyS); // => true
console.log(copyC !== copyS); // => true
```

- http://www.ecma-international.org/ecma-262/7.0/#sec-array.prototype.concat
- http://www.ecma-international.org/ecma-262/7.0/#sec-array.prototype.slice

`Array#concat`メソッドと`Array#slice`メソッドは意図して配列以外を`this`として指定できるようになっています。
そのため、Array-likeなオブジェクトを`this`にして、配列にする方法としても利用されています。

```js
Array.prototype.slice.call(document.querySelectorAll("div"));
```

しかし、ES2015からは`Array.from`メソッドという、Array-likeを配列にする適切なメソッドがあります。
あとで詳しく解説しますが、`Array.from`メソッドのほうが直感的なのでこちらを利用して変換した方がよいです。

```js
Array.from(document.querySelectorAll("div"));
```

- http://www.ecma-international.org/ecma-262/7.0/#sec-array.from

## 配列の末尾に要素を追加

末尾に要素を追加する場合は `Array#push` が利用できます。

```js
var array = [1, 2, 3];
array.push(4);
console.log(array); // => [1, 2, 3, 4]
```

`Array#push`はmutableな操作なので、immutableにやりたい場合もあります。
Immutableにやりたい場合は、配列のコピーの最後に要素を追加すればよいはずです。

```js
var array = [1, 2, 3];
var newArray = [...array, 4];
console.log(newArray); // => [1, 2, 3, 4]
```

もちろん`Array#slice`などでコピーした配列にpushするでも問題ありません。

```js
var array = [1, 2, 3];
var newArray = array.slice();
newArray.push(4);
console.log(newArray); // => [1, 2, 3, 4]
```

先頭に要素を追加する場合も、`Array#push`が`Array#unshift`に変わるだけで同じです。

## new Array + fill

`new Array(len)` で指定した`length`の**疎な配列**を作ることができます。
しかし、この配列の要素は`undefined`が値として入っているわけではありません。
単純に `array[0]` にはキーそのものがないため、 `undefined`が返ってきています。

```js
var array = new Array(10);
console.log(array.length === 10);// => true
console.log(array[0] === undefined); // => true
// hasOwnPropertyでプロパティを持っているかで確認できる
var a = [undefined];
var b = new Array(1);
console.log(a.hasOwnProperty(0)); // => true
console.log(b.hasOwnProperty(0)); // => false
```

配列もオブジェクトであるため、疎な配列は次のようなオブジェクトであるといえます。

```js
// new Array(10)
var array = {
    length: 10,
    __proto__: Array.prototype
};
array[0]; // => undefined
```

これにより`new Array`では配列中の値がないので`Array#map`などが意図した挙動にはなりません
`Array#map`などは配列中の値がない添字をスキップします。

```js
var array = new Array(10).map((item, index) => {
    return index;
});
console.log(array[0] === undefined);// => true
```

そのため、これを回避する場合は明示的に値を入れた配列を使うか、
`Array.from`を使うことで**疎な配列**も扱えます。

明示的に値を埋める、いわゆる0埋めのような操作は`Array#fill`を使うのが簡単です。

```js
var array = new Array(10).fill(0).map((item, index) => {
    return index;
});
console.log(array[9] === 9);// => true
```

`Array.from`メソッドはArray-likeやiterableなオブジェクトから新しく配列を作る静的メソッドです。

- [Array.from() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from "Array.from() - JavaScript | MDN")

先ほどの`new Array`で作った疎な配列もlengthは持っているので、for文などで走査することはできます。
`Array.from`は、`arguments`のようなArray-likeや疎な配列も列挙でき かつ `Array#map`のような仕組みを持っています。

```js
var array = Array.from(new Array(10), (item, index) => {
    return index;
});
console.log(array[9] === 9);// => true
```

他にも、Iterableを配列にできるので、Mapオブジェクトを配列へ変換するときにも利用できます。

```js
var map = new Map([[1, 2], [2, 4], [4, 8]]);
console.log(Array.from(map));// => [[1, 2], [2, 4], [4, 8]]
```

これは、Spread Operator（`...`）を使うことでも同様のことが行なえます。
`Array.from`は第二引数でマッピング方法を指定できるのでより柔軟な処理が書けるという違いがあります。

```js
var map = new Map([[1, 2], [2, 4], [4, 8]]);
console.log([...map]);// => [[1, 2], [2, 4], [4, 8]]
```

## flatten

配列の入れ子をflattenにしたいというケース。

`[[1], [2], [3]]` => `[1, 2, 3]`

concatを使った方法が有名です。

`Array#concat`を使った方法ではshallowなflattenを行えます。

```js
function flatten(array) {
    return Array.prototype.concat.apply([], array);
}
var array = [[1], [2], [3]];
flatten(array); // => [1, 2, 3]
```

再帰的にやることでdeepなflattenができます。
もう一つのflattenを行う方法として、`...` spread operatorで配列を展開してしまう方法です。

```js
function flatten(array) {
    return array.reduce((prev, curr) => {
        Array.isArray(curr) ? [...prev, ...flatten(curr)] : [...prev, curr];
    }, []);
}
var array = [[1], [2], [3]];
flatten(array); // => [1, 2, 3]
```

[Array.prototype.flatMap & Array.prototype.flatten](https://bterlson.github.io/proposal-flatMap/ "Array.prototype.flatMap &amp; Array.prototype.flatten") ProposalはStage 1なので、将来`Array#flatten`メソッドが利用できる可能性もあります。

## entriesで何か

オブジェクをループ時に key と value のどちらも必要な場合は、`Object.entries`メソッドを利用すると簡単です。

```js
var object = {
    key1: "value1",
    key2: "value2",
};
var keyValues = Object.entries(object).map(([key, value]) => {
    return `${key}: ${value}`;
});
console.log(keyValues); // => ["key1:value1", "key2:value2"];
```

keyだけなら`Object.keys`メソッド、valueだけなら`Object.values`メソッドが利用できます。

## indexOf => findIndex

配列から指定した要素を見つける場合に `indexOf` だと`===`での一致でしか見つけることができません。
そのため、オブジェクトのプロパティを見て探索する場合には利用できません。

```js
var array = [{ id: 1 }, { id: 2}];
var index = array.indexOf({ id: 1});
console.log(index); // => -1
```

代わりにES2015からは`Array#findIndex` が利用できます。

```js
var array = [{ id: 1 }, { id: 2}];
var index = array.findIndex(item => item.id === 1);
console.log(index); // => 0
```

## find => some

配列の中に、判定に一致するものを含んでいるかという真偽値が欲しいのなら、`Array#some`が利用できます。

```js
var array = [{ id: 1 }, { id: 2}];
var isContained = array.some(item => item.id === 1);
console.log(isContained); // => true
```

## indexOf => includes

配列が指定した要素を含んでいるかに `array.indexOf(value) !== -1` を使ったイディオムがあります。
先ほども書いたように`indexOf`は`===`による比較なので、`Array#some`で書くと次のような処理になります。

```js
var array = ["a", "b", "c"];
var target = "b";
var containB = array.some(item => {
    return target === item;
});
console.log(containB); // => true
```

これを`Array#indexOf`を使えば1行で書くことができます。

```js
var array = ["a", "b", "c"];
var target = "b";
var containB = array.indexOf(target) !== -1;
console.log(containB); // => true
```

しかし、ES2016からは`Array#includes`が利用できるので、このイディオムを使う必要はありません。

```js
var array = ["a", "b", "c"];
var containB = array.includes("b");
console.log(containB); // => true
```

## splice => ...

`Array#splice`はmutableな操作になっています。
そのため、配列から n 番目の要素を削除した配列をImmutableに作るのは結構面倒です。

mubtaleでよいなら、次のように書くことができます。

```js
function deleteItemAtIndex(array, index) {
    array.splice(index, 1);// spliceの返り値は削除した値
    return array;
}
var array = [1, 2, 3];
var result = deleteItemAtIndex(array, 1);
console.log(result); // => [1, 3]
```

これをImmutableする場合、Spread Operatorと`Array#slice`を使うことで次のように書くことができます。

```js
function deleteItemAtIndex(array, index) {
    // 常に新しい配列を返す
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ];
}
var array = [1, 2, 3];
var result = deleteItemAtIndex(array, 1);
console.log(result);// => [1, 3]
```


## 配列から値を取り出す

テストなどで、指定して位置の値を取り出したいときがあります。

```js
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if (x > y) {
            return 1;
        } else if (x < y) {
            return -1;
        } else {
            return 0;
        }
    });
}
```

これをテストした時には、返り値の0番目の値を取り出してみたいということが多いです。
この場合に、Destructuringを使い値を取り出すと変数にまとめて取り出せます。

```js
function sortByKey(array, key) {
    return array.slice().sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if (x > y) {
            return -1;
        } else if (x < y) {
            return 1;
        } else {
            return 0;
        }
    });
}
var array = [{ "key": 2 }, { "key": 1 }];
var sorted = sortByKey(array, "key");
var [first, second] = sorted;
console.log(first === array[0]); // => true
```

## join

配列を文字列にする方法はさまざまな方法があります。
単純な方法としては、`Array#join`メソッドを利用することです。

```js
array.join(区切り文字);
```

`Array#join`メソッドでは配列を指定した`区切り文字`で結合した文字列を作成してくれます。
`区切り文字`を指定しなかった場合は、デフォルト値として`,`が`区切り文字`として指定されます。

```js
var array = [1, 2, 3];
var string = array.join();
console.lg(string);// => "1,2,3"
```

## ループと反復処理

`Array#map`メソッドなどのループと反復処理については[ループと反復処理 · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/loop/ "ループと反復処理 · JavaScriptの入門書 #jsprimer")を参照してください。

## 空の配列を返す

配列を返すAPIは、返す値がないときも空の配列を返すようにします。

```js
function getSomeList(){
	if(返すものがないとき){
		return [];
	}
	// かえすものがあるとき
}
```

こうすることで、このAPIを利用する側はnullチェックをしなくても良くなります。
`null`や`undefined`を返してしまうと、このAPIを使うたびに`null`チェックが必要となります。
`null`チェックが不要ならば不要な形にした方が良いはずです。

## おまけ

Arrayのメソッドで破壊的なものとそうでないものをまとめたもの

<script src="https://gist.github.com/azu/30b1ff6831c3bbf7fbd5501d6a2bdfb0.js"></script>
