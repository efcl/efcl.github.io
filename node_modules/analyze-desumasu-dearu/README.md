# analyze-desumasu-dearu [![Build Status](https://travis-ci.org/azu/analyze-desumasu-dearu.svg?branch=master)](https://travis-ci.org/azu/analyze-desumasu-dearu)

文の敬体(ですます調)、常体(である調)を解析するライブラリ

形態素解析器として[kuromoji.js](https://github.com/takuyaa/kuromoji.js "kuromoji.js")を利用しています。

## Installation

    npm install analyze-desumasu-dearu

## Usage

```js
"use strict";
const isDearu = require("analyze-desumasu-dearu").isDearu;
const isDesumasu = require("analyze-desumasu-dearu").isDesumasu;
const analyze = require("analyze-desumasu-dearu").analyze;
const analyzeDearu = require("analyze-desumasu-dearu").analyzeDearu;
const analyzeDesumasu = require("analyze-desumasu-dearu").analyzeDesumasu;
const text = "昨日はいい天気であったのだが、今日は悪天候です。";
analyze(text).then(results => {
    console.log("==である==");
    console.log(results.filter(isDearu));
    console.log("==ですます==");
    console.log(results.filter(isDesumasu));
});
```

Result to

```
==である==
[ { type: '特殊・ダ',
    value: 'であった',
    surface: 'で',
    index: 7,
    token: 
     { word_id: 305030,
       word_type: 'KNOWN',
       word_position: 8,
       surface_form: 'で',
       pos: '助動詞',
       pos_detail_1: '*',
       pos_detail_2: '*',
       pos_detail_3: '*',
       conjugated_type: '特殊・ダ',
       conjugated_form: '連用形',
       basic_form: 'だ',
       reading: 'デ',
       pronunciation: 'デ' } },
  { type: '特殊・ダ',
    value: 'だが、',
    surface: 'だ',
    index: 12,
    token: 
     { word_id: 305000,
       word_type: 'KNOWN',
       word_position: 13,
       surface_form: 'だ',
       pos: '助動詞',
       pos_detail_1: '*',
       pos_detail_2: '*',
       pos_detail_3: '*',
       conjugated_type: '特殊・ダ',
       conjugated_form: '基本形',
       basic_form: 'だ',
       reading: 'ダ',
       pronunciation: 'ダ' } } ]
==ですます==
[ { type: '特殊・デス',
    value: 'です。',
    surface: 'です',
    index: 21,
    token: 
     { word_id: 305080,
       word_type: 'KNOWN',
       word_position: 22,
       surface_form: 'です',
       pos: '助動詞',
       pos_detail_1: '*',
       pos_detail_2: '*',
       pos_detail_3: '*',
       conjugated_type: '特殊・デス',
       conjugated_form: '基本形',
       basic_form: 'です',
       reading: 'デス',
       pronunciation: 'デス' } } ]
```

### `analyze(text, options): Promise.<AnalyzedResultObject[]>`

`text`から敬体(ですます調)と常体(である調)を取り出した結果を返します

`options`: 無視オプションを指定できます。

```js
/**
 * デフォルトのオプション値
 * @type {{ignoreConjunction: boolean}}
 */
const defaultOptions = {
    // 接続的な使い方を無視する
    // e.g.) 今日はいい天気であるが明日はどうなるかは分からない。
    ignoreConjunction: false
};
````

```js
// AnalyzedResultObjectの配列
[{
    // 文体を含んだ内容 - なんとなくいい感じの部分までを繋げた文字列
    // e.g.) "です。"
    value: string,
    // 該当するtoken文字
    // e.g.) "です"
    surface: string,
    // textの先頭からの位置(start with 0)
    index: number,
    // kuromoji.jsのtokenオブジェクトそのもの https://github.com/takuyaa/kuromoji.js#api
    // surfaceやindexはこのtokenから算出
    token: AnalyzedToken
}]
```

### `analyzeDesumasu(text, options): Promise.<AnalyzedResultObject[]>`
 
`text`に含まれる文の敬体(ですます調)を解析して、AnalyzedResultObjectの配列を返します。

内部的には`analyze()`を使っています。

```js
/**
 * `text` の敬体(ですます調)について解析し、敬体(ですます調)のトークン情報を返します。
 * @param {string} text
 * @param {Object} options
 * @return {Promise.<AnalyzedResultObject[]>}
 */
export function analyzeDesumasu(text, options = defaultOptions) {
    return analyze(text, options).then(results => results.filter(isDesumasu));
}
```
 
### `analyzeDearu(text, options): Promise.<AnalyzedResultObject[]>`

常体(である調)を解析してAnalyzedResultObjectの配列を返します

`options`: 無視オプションを指定できます。

```js
/**
 * デフォルトのオプション値
 * @type {{ignoreConjunction: boolean}}
 */
const defaultOptions = {
    // 接続的なであるの使い方を無視する
    // e.g.) 今日はいい天気であるが明日はどうなるかは分からない。
    ignoreConjunction: false
};
````

内部的には`analyze()`を使っています。

```js
/**
 * `text` の常体(である調)について解析し、常体(である調)のトークン情報を返します。
 * @param {string} text
 * @param {Object} options
 * @return {Promise.<AnalyzedResultObject[]>}
 */
export function analyzeDearu(text, options = defaultOptions) {
    return analyze(text, options).then(results => results.filter(isDearu))
}
```

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

## Acknowledge

Thank for [RedPen](http://redpen.cc/ "RedPen").