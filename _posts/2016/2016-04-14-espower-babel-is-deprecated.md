---
title: "power-assert + babel as a tool"
author: azu
layout: post
date : 2016-04-14T19:55
category: JavaScript
tags:
    - power-assert
    - JavaScript
    - testing

---

## 3行まとめ

- [espower-babel](https://github.com/power-assert-js/espower-babel "espower-babel")は役目を終えたので、Deprecated
- Babel + power-assertは[babel-preset-power-assert](https://github.com/power-assert-js/babel-preset-power-assert "babel-preset-power-assert")を使う
- コード上は`require("power-assert")`でも、`require("assert")`でもpower-assert化できるようになった

## インストール

### 必要なモジュールをインストール

```sh
npm i -D mocha babel-register babel-preset-power-assert babel-preset-es2015
```

mochaからテストを実行する際に、Babelの変換を噛ませるようにするために、`babel-register`と以下の2つのpresetをインストールします。

- babel-preset-es2015
	- ES2015の変換を行うpreset
- babel-preset-power-assert
	- power-assert関連のpreset


### `.babelrc`を作成

Babelの設定をするために、`.babelrc`を次のように作成します。
power-assertは開発中(テスト中)にしか必要ないので、`env`で振り分けしておきます。
(`NODE_ENV`によって振り分けされるます。 `NODE_ENV=production <コマンド>`のような感じで指定して環境によって必要がプラグインなどを分けることができます)

```json
{
  "presets": [
    "es2015"
  ],
  "env": {
    "development": {
      "presets": [
        "power-assert"
      ]
    }
  }
}
```

### `mocha.opts`を作成

Mochaの設定をする`mocha.opts`を作成します。

`test/mocha.opts` に以下のように書くだけです。設定ファイルとして作らないで、引数に渡すだけでいいかもしれません。

```
--compilers js:babel-register
```

こうすることで、Mochaのテスト実行時はBabelによる変換がランタイムで行われます。

## テストを書く

次のような足し算をするコードを書いてみます。

`add.js`:

```js
"use strict";
const assert = require("assert");
export default function add(x, y) {
    assert(typeof x === "number");
    assert(typeof y === "number");
    return x + y;
}
```

これをテストするコードを`assert`モジュールを使って書いてみます。

`add-test.js`

```js
// require("power-assert") じゃなくて assert でもいい
const assert = require("assert");
import add from "../src/add";
describe("add", function () {
    it("should return x + y", function () {
        const result = add(1, 2);
        assert.equal(result, 5);// <= Wrong
    });
});
```

`$ mocha`という感じでテストを実行してみると、このテストは`3 == 5`となっているので失敗します。

![power-assert result](http://efcl.info/wp-content/uploads/2016/04/14-1460632719.png)

テストを失敗すると、power-assertにより構造的な結果が表示されています。
`.babelrc`の設定にもとづいて変換する際に`babel-preset-power-assert`が次の2つのことをやっています。

1. `require("assert")`を`require("power-assert")`に書き換える
2. `assert`関数などに仕込みをして、失敗した時に情報をいっぱい表示できるようにする
	- こちらは今までもやっていたこと

これにより、`require("power-assert")`ではなく、ただの`require("assert")`もpower-assert化された状態でassertionが行えるようになっています。

通常今までは、テストコードのみ`require("power-assert")`をして、アプリケーションコード側では`require("assert")`をしていたと思います。

例えば、この`add.js`の例では引数のチェックに`assert`を使っています。

```js
    it("arguments should be type of number", function () {
        add("string", "string");
    });
```

これもMocha経由で実行してみると、ただの`assert(typeof x === "number");`もpower-assert化されています。

![assert to be power-asssert](http://efcl.info/wp-content/uploads/2016/04/14-1460633294.png)

これは、どういうことになるかというと、コード上でライブラリとして`require("power-assert")`と読み込む必要がなくなり、ツールとしてpower-assertが動くようになった事を意味します。

なので、`power-assert`を使わなくなった時はツール(具体的には`babelrc`から)power-assertを外すだけで、コードは一切変更しなくても良くなったということです。

## おまけ

アプリケーションに`assert`を書くようになったと言っても、今回の`add(x ,y)`のように決まりきったような引数のチェックを毎回書くのは大変です。

先ほどの`add.js`は次のような感じでテストすることができます。

```js
const assert = require("assert");
import add from "../src/add";
describe("add", function () {
    it("should return x + y", function () {
        const result = add(1, 2);
        assert.equal(result, 3);
    });
    it("arguments should be type of number", function () {
        try {
            add("string", "string");

            throw new Error("unreachable line");
        } catch (error) {
            assert(error instanceof assert.AssertionError);
        }
    });
});
```

引数の型違反例外(`assert.AssertionError`)もテストされていることが分かります。