---
title: "refute <-> assertの逆をするライブラリ"
author: azu
layout: post
date : 2015-02-20T23:21
category: JavaScript
tags:
    - JavaScript
    - testing
    - Buster.js

---

# refute

[azu/refute](https://github.com/azu/refute "azu/refute") というAssertionライブラリを書きました。

`refute`というのは`assert`の逆、つまり`assert.not*`を行うAssertionのことです。
これは[Buster.JS](http://docs.busterjs.org/en/develop/ "Buster.JS")のAssertionライブラリである[busterjs/referee](https://github.com/busterjs/referee "busterjs/referee")が由来のものです。


## Installation

```
npm install --save-dev refute
```

## Usage

`refute` は既存の[assert](http://nodejs.org/api/assert.html "Assert")(Node's Assert)を受け取って動作するようになっています。

```
var assert = require("assert");
var refute = require("refute")(assert);
```

### API

以下のように`assert`と逆に`false`だったらパスするようなAPIが用意されてます
。

```js
refute(false);
refute.equal = assert.notEqual.bind(assert);
refute.strictEqual = assert.notStrictEqual.bind(assert);
refute.deepEqual = assert.notDeepEqual.bind(assert);
refute.throws = assert.doesNotThrow.bind(assert);
```

初期化の方法からもわかるように、内部的に`assert`を使っていて判定を逆転させているだけです。

### 実行例

```js
var assert = require("assert");
var refute = require("refute")(assert);
describe("refute-test", function () {
    it("refute", function () {
        refute(false);// not true is pass
    });
    it("refute.equal", function () {
        refute.equal("string", "non-string");// pass
    });
    it("refute.deepEqual", function () {
        var obj = {
            a: 1
        };
        var expected = {
            b: 1
        };
        refute.deepEqual(obj, expected);// pass
    });
    it("refute.throws", function () {
        refute.throws(function(){
            assert(true);
        });
    });
});
```


### [power-assert](https://github.com/twada/power-assert "power-assert")との連携

`refute`は[power-assert](https://github.com/twada/power-assert "power-assert")とも一緒に使うこともできます。

1: `require("assert")` へ ` require("power-assert")` Henkou 

```diff
- var assert = require("assert");
+ var assert = require("power-assert");
```

2: espowerの設定で[options.patterns](https://github.com/twada/espower#optionspatterns "options.patterns")に`refute.*`メソッドをそれぞれ追加します

```js
require('espower-loader')({

    // directory where match starts with
    cwd: process.cwd(),

    // glob pattern using minimatch module
    pattern: 'test/**/*.js',

    // options for espower module
    espowerOptions: {
        patterns: [
            "assert(value, [message])",
            "refute(value, [message])",
            "assert.ok(value, [message])",
            "assert.equal(actual, expected, [message])",
            "refute.equal(actual, expected, [message])",
            "assert.notEqual(actual, expected, [message])",
            "assert.strictEqual(actual, expected, [message])",
            "refute.strictEqual(actual, expected, [message])",
            "assert.notStrictEqual(actual, expected, [message])",
            "assert.deepEqual(actual, expected, [message])",
            "refute.deepEqual(actual, expected, [message])",
            "assert.notDeepEqual(actual, expected, [message])"
        ]
    }
});
```

詳しくは [espower.config.js](https://github.com/azu/refute/blob/master/test/espower.config.js) と [mocha.opts](https://github.com/azu/refute/blob/master/test/mocha.opts) を見るといいと思います。


-----

## おわりに


[azu/refute](https://github.com/azu/refute "azu/refute")はコンセプトの証明的な感じなので、あんまり実用的ではないかもしれませんが、
`assert.not`と違い`refute`という否定版があるとテスト書くときに迷いが減るので自分はこの考え方が結構好きです。

`assert.ok` があるのに対して `assert.ng` がないので、`assert(!bool)`と書くのが何かいやなので、`refute(bool)`とかけたらいいなーと思って書きました。
