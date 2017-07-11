---
title: "Array.prototypeのImmutable版メソッドを個別のパッケージで使えるものを作った"
author: azu
layout: post
date : 2017-07-11T20:03
category: JavaScript
tags:
    - JavaScript
    - Array

---

JavaScriptの配列には破壊的なものと非破壊的なものが混在しています。
例えば`Arrray.prototype.push`は破壊的ですが、`Array.prototype.concat`は結合した新しい配列を返すので非破壊的です。

破壊的か非破壊的かは、基本的には覚えることでしか区別できません。
それらの破壊的メソッドの非破壊的なバージョン - Immutableバージョンのライブラリを作成しました。

- [azu/immutable-array-prototype: A collection of Immutable Array prototype methods(Per method packages).](https://github.com/azu/immutable-array-prototype "azu/immutable-array-prototype: A collection of Immutable Array prototype methods(Per method packages).")


## インストール

すべてのImmutable版をまとめたものは次のパッケージでインストールできます。

```
npm install @immutable-array/prototype
```

また、`push`のImmutable版だけ欲しいなどもあると思うので、それぞれのメソッド毎に別々のパッケージとしてインストールすることができます。

```
npm install @immutable-array/pop
npm install @immutable-array/push
npm install @immutable-array/shift
npm install @immutable-array/unshift
npm install @immutable-array/sort
npm install @immutable-array/reverse
npm install @immutable-array/fill
npm install @immutable-array/splice
npm install @immutable-array/copy-within
```

対応してるメソッドは次の通りです。

| Native method: Return type               | `@immutable-array/*`                       |
| ---------------------------------------- | ---------------------------------------- |
| [`Array.prototype.pop()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/pop): `any`| [`pop()`](https://github.com/azu/immutable-array-prototype/tree/master/packages/pop): new  `Array` |
| [`Array.prototype.push()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push): `Number`| [`push()`](https://github.com/azu/immutable-array-prototype/tree/master/packages/push): new  `Array` |
| [`Array.prototype.shift()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/shift): `any`| [`shift()`](https://github.com/azu/immutable-array-prototype/tree/master/packages/shift): new  `Array` |
| [`Array.prototype.unshift()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift): `any`| [`unshift()`](https://github.com/azu/immutable-array-prototype/tree/master/packages/unshift): new  `Array` |
| [`Array.prototype.splice()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice): `Array`| [`splice()`](https://github.com/azu/immutable-array-prototype/tree/master/packages/splice): new  `Array` |
| [`Array.prototype.reverse()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse): `Array`| [`reverse()`](https://github.com/azu/immutable-array-prototype/tree/master/packages/sort): new `Array` |
| [`Array.prototype.sort()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort): `Array`| [`sort()`](https://github.com/azu/immutable-array-prototype/tree/master/packages/sort): new  `Array` |
| [`Array.prototype.fill()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/fill): `Array`| [`fill()`](https://github.com/azu/immutable-array-prototype/tree/master/packages/fill): new `Array` |
| [`Array.prototype.copyWithin()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin): `Array`| [`copyWithin()`](https://github.com/azu/immutable-array-prototype/tree/master/packages/copy-within): new `Array` |

それぞれのメソッドの使い方は第一引数が対象の配列となるだけで他の引数や挙動はECMAScriptに合わせています。

例えば`reverse`なら次のように書くことができます。

```js
import {
    reverse
} from "@immutable-array/prototype";

var array = ["a", "b", "c", "d", "e"];
var reversedArrray = reverse(array); // ["e", "d", "c", "b", "a"]
```

またよくある[Immutableライブラリのように](https://github.com/azu/immutable-array-prototype#related)独自のImmutableメソッドは追加していません。
あくまで、JavaScriptの配列における破壊的なメソッドの非破壊的なバージョンを提供するという立ち位置にしています。

## おわりに

[Benchmark](https://github.com/azu/immutable-array-prototype#benchmarks)(参考値)を見る限り、このImmutable版で配列を作り直してもそこまで急激な差はでませんでした。

原理的にネイティブのメソッドのステップ + コピーなので、ネイティブのものより早くなりません。(勝ってる部分があるように見えますが恐らくそれは誤差です。)
Lodashのように、エッジケースのステップを省略して早くすることは目的ではありません

```
Native `Array.prototype`          |    @immutable-array
> node src/array.js |                  > immutable-array.js
                                  |
# pop 200000 times               >>>   # pop 200000 times
ok ~330 ms (0 s + 330397151 ns)  >>>   ok ~267 ms (0 s + 267348617 ns)
                              |
# push 200000 times              >>>   # push 200000 times
ok ~169 ms (0 s + 168738061 ns)  >>>   ok ~141 ms (0 s + 140502324 ns)
                              |
# shift 200000 times             <<<   # shift 200000 times
ok ~296 ms (0 s + 295892983 ns)  <<<   ok ~419 ms (0 s + 418852725 ns)
                              |
# unshift 200000 times           <<<   # unshift 200000 times
ok ~51 ms (0 s + 50817590 ns)    <<<   ok ~191 ms (0 s + 191329502 ns)
                              |
# sort 2000 times                >>>   # sort 2000 times
ok ~933 ms (0 s + 932551400 ns)  >>>   ok ~611 ms (0 s + 610748601 ns)
                              |
# reverse 200000 times           >>>   # reverse 200000 times
ok ~555 ms (0 s + 554921645 ns)  >>>   ok ~455 ms (0 s + 455068191 ns)
                              |
# fill 200000 times              >>>   # fill 200000 times
ok ~782 ms (0 s + 782159758 ns)  >>>   ok ~699 ms (0 s + 698677543 ns)
                              |
# splice 200000 times            <<<   # splice 200000 times
ok ~287 ms (0 s + 286547242 ns)  <<<   ok ~391 ms (0 s + 391294720 ns)
                              |
# copyWithin 200000 times        <<<   # copyWithin 200000 times
ok ~237 ms (0 s + 236837575 ns)  <<<   ok ~275 ms (0 s + 275267401 ns)
                              |
all benchmarks completed         >>>   all benchmarks completed
ok ~3.64 s (3 s + 638863405 ns)  >>>   ok ~3.45 s (3 s + 449089624 ns)
```

今のReactやRedux、Alminなどを使ってアプリケーションを書くと、オブジェクトはImmutableでやることが多いです。

- [azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること](https://github.com/azu/large-scale-javascript "azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること")
- [Faao - ドメイン駆動設計で作るGitHub Issue Client -](http://azu.github.io/slide/2017/teppeis-sushi/client-side-ddd-on-github.html "Faao - ドメイン駆動設計で作るGitHub Issue Client -")

ある程度の規模のJavaScriptアプリケーションを作ったときに、ドメイン層やStateをImmutableにすることがボトルネックになることはそこまで多くありません(巨大なリストとは別ですが)
Reactなどで作るアプリケーションは、配列などを作るよりも、値を比較する回数の方が圧倒的に多くなるため、作るコストよりも比較するコストを気にすることが多いです。


Immutable.jsのような速度も兼ね備えたものを使うと便利ですが、通常の配列とは使い方やサイズも多いので使うのに躊躇します。
ある程度小さくて、配列と同じ使い方ができるものがほしかったので作りました。

