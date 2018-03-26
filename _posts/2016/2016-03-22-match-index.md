---
title: "正規表現でマッチしたキャプチャの内容と位置を取得するライブラリ"
author: azu
layout: post
date : 2016-03-22T20:05
category: JavaScript
tags:
    - JavaScript
    - RegExp
    - library

---

[match-index](https://github.com/azu/match-index "match-index")という正規表現の補助JavaScriptライブラリを書きました。

- [azu/match-index: Get index of each capture.](https://github.com/azu/match-index "azu/match-index: Get index of each capture.")

例えば、

	"ABC ABC"

という文字列から"ABC"という文字列とその位置(index)を取ろうとすると、非常に面倒な書き方をする必要があります。

`"ABC ABC".match(/(ABC)/g)` では文字列は取れますが、`index`を取ることができません。
これをやるには`match`ではなく、`g`フラグ付き正規表現と`exec`や`replace`を使ってやる必要があります。

これを直感的に行う`String.prototype.matchAll`というProposalも存在しています。

- [String.prototype.matchAll](https://github.com/tc39/String.prototype.matchAll#rationale "String.prototype.matchAll")

今回はこの`matchAll`的なものと、キャプチャした内容と位置を取得出来る`matchCaptureGroupAll`をもった[match-index](https://github.com/azu/match-index "match-index")というライブラリを書きました。

- [azu/match-index: Get index of each capture.](https://github.com/azu/match-index "azu/match-index: Get index of each capture.")

```js
const captureGroups = matchCaptureGroupAll("ABC ABC", /(ABC)/);
assert.equal(captureGroups.length, 2);
const [x, y] = captureGroups;
assert.equal(x.text, "ABC");
assert.equal(x.index, 0);
assert.equal(y.text, "ABC");
assert.equal(y.index, 4);
```

## Installation

    npm install match-index

でインストールできます。

## Usage

`match-index` は２つの関数を持ってます。

### `matchCaptureGroupAll(text, regExp): MatchCaptureGroup`

`(`と`)`で囲まれた内容を配列で返してくれます。

```js
[{
  text : "strgin",
  index: 5 // 開始位置
}]
```

配列の中身は`text`と`index`という感じになっています。

```js
// get "ABC" and "EFC that are captured by ( and )
const captureGroups = matchCaptureGroupAll("ABC EFG", /(ABC).*?(EFG)/);
// captureGroups is array of MatchAllGroup
/**
 * @typedef {Object} MatchAllGroup
 * @property {Array} all
 * @property {string} input
 * @property {number} index
 * @property {MatchCaptureGroup[]} captureGroups
 */
assert(captureGroups.length, 2);
const [x, y] = captureGroups;
assert.equal(x.text, "ABC");
assert.equal(x.index, 0);
assert.equal(y.text, "EFG");
assert.equal(y.index, 4);
```

`matchCaptureGroupAll` は内部的に次に紹介する `matchAll` を使っています。

### `matchAll(text, regExp): MatchAllGroup`

一方、`matchAll()`は[String.prototype.matchAll](https://github.com/tc39/String.prototype.matchAll#rationale "String.prototype.matchAll")と似たような感じですが、キャプチャに関する内容を`captureGroups`に保持する拡張をしています。

```js
const text = 'test1test2';
const regexp = /t(e)(st\d?)/g;
const captureGroups = matchAll(text, regexp);
/**
 * @typedef {Object} MatchAllGroup
 * @property {Array} all
 * @property {string} input
 * @property {number} index
 * @property {MatchCaptureGroup[]} captureGroups
 */
```

**問題点**

これは実装上の問題で、多分正規表現ではなく[パーサコンビネータ](http://blog.anatoo.jp/entry/2015/04/26/220026 "パーサコンビネータ")とかで実装すればどうにかできると思いますが、[match-index](https://github.com/azu/match-index "match-index")はネストしたキャプチャを正確に扱えないバグがあります。

例えば、次の例は`(st(\d?))`がネストしているため、`index`の値がおかしくなっています。


```js
const text = 'test1test2';
const regexp = /t(e)(st(\d?))/g;
const captureGroups = matchAll(text, regexp);
/**
 * @typedef {Object} MatchAllGroup
 * @property {Array} all
 * @property {string} input
 * @property {number} index
 * @property {MatchCaptureGroup[]} captureGroups
 */

assert.equal(captureGroups.length, 2);
const [test1, test2] = captureGroups;
assert.equal(test1.index, 0);
assert.equal(test1.input, text);
assert.deepEqual(test1.all, ['test1', 'e', 'st1', '1']);
assert.deepEqual(test1.captureGroups, [
    {
        index: 1,
        text: 'e'
    }, {
        index: 2,
        text: 'st1'
    }, {
        index: -1,// Limitation of capture nest
        text: '1'
    }
]);
```

制限として受け止めれば使えますが、いい案が思いつかないので修正するPull Requestを募集しています…

- [azu/match-index: Get index of each capture.](https://github.com/azu/match-index "azu/match-index: Get index of each capture.")

このライブラリは[textlint-rule-preset-JTF-style](https://github.com/azu/textlint-rule-preset-JTF-style "textlint-rule-preset-JTF-style")を[--fixでの自動修正に対応](https://efcl.info/2016/03/15/textlint--fix/ "--fixでの自動修正に対応")に対応するときに、もっと直感的にマッチしてその位置を取得する方法が欲しくて作りました。

これにより書く効率は上がって、つねに`g`フラグで扱われるので、一度マッチしても最後までちゃんと繰り返しマッチするようになって、全てのエラーを出せるようになったので書いてよかったと思います。([textlint](https://github.com/textlint/textlint "textlint")のようなLintの特性上、その行にある全部のエラーを出せた方がよいため)

- [azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.](https://github.com/azu/textlint-rule-preset-JTF-style "azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.")

小さなライブラリですが、先ほど書いたようなバグができたりするので正規表現は扱うのが結構難しいです…

- [JavaScriptでパーサコンビネータのコンセプトを理解する(「正規表現だけに頼ってはいけない」の続き) - id:anatooのブログ](http://blog.anatoo.jp/entry/2015/04/26/220026 "JavaScriptでパーサコンビネータのコンセプトを理解する(「正規表現だけに頼ってはいけない」の続き) - id:anatooのブログ")
