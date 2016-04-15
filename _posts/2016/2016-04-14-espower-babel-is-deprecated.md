---
title: "power-assert + babel as a development tool"
author: azu
layout: post
date : 2016-04-14T19:55
category: JavaScript
tags:
    - power-assert
    - JavaScript
    - testing
    - babel

---

## 3行まとめ

- [espower-babel](https://github.com/power-assert-js/espower-babel "espower-babel")は役目を終えたので、Deprecated
- Babel + power-assertは[babel-preset-power-assert](https://github.com/power-assert-js/babel-preset-power-assert "babel-preset-power-assert")を使う
- コード上は`require("power-assert")`でも、`require("assert")`でもpower-assert化できるようになった

## [espower-babel](https://github.com/power-assert-js/espower-babel "espower-babel")は非推奨へ

Babel + Mocha + power-assertの組み合わせを出来るだけ設定ファイルなどを作らずに使える[espower-babel](https://github.com/power-assert-js/espower-babel "espower-babel")というモジュールを書いていましたが、役目を終えたので非推奨(deprecated)にしました。

- [テストコードをES6+power-assertで書けるespower-babel 3.0.0リリース | Web Scratch](http://efcl.info/2015/05/10/espower-babel3.0.0/ "テストコードをES6+power-assertで書けるespower-babel 3.0.0リリース | Web Scratch")

理由としては、Babel@6からは設定(ファイル)を必ず必要とするので、[espower-babel](https://github.com/power-assert-js/espower-babel "espower-babel")をかませる分、柔軟性がなくなったり余計な処理が起きて遅くなるためです。

代わりに[babel-register](https://www.npmjs.com/package/babel-register "babel-register")と[babel-preset-power-assert](https://github.com/power-assert-js/babel-preset-power-assert "babel-preset-power-assert")を直接使って、開発時のBabelのビルド設定としてpower-assertを導入する方法を推奨しています。

以下は、power-assert + Mocha + Babel環境を新規インストールする場合の手順ですが、espower-babelからの移行は[migrate-espower-babel-to-babel-preset-power-assert](https://github.com/power-assert-js/migrate-espower-babel-to-babel-preset-power-assert "migrate-espower-babel-to-babel-preset-power-assert")を使うことで同様のことができるようにしてあります。

- [migrate-espower-babel-to-babel-preset-power-assert](https://github.com/power-assert-js/migrate-espower-babel-to-babel-preset-power-assert "migrate-espower-babel-to-babel-preset-power-assert")

```
$ npm i -g migrate-espower-babel-to-babel-preset-power-assert
$ cd <該当プロジェクトrootへ>
$ migrate-espower-babel-to-babel-preset-power-assert
```

でマイグレーションしてくれます。
(自分のプロジェクトでのespower-babelの設定を移行するのに書いたので、人によっては構成が違うため動かないかもしれません。その場合はPull Requestをいただけると助かります。

------

新規で、power-assert + Mocha + Babel環境(ランタイム変換)を導入する手順です。

サンプルプロジェクト

- [azu/power-assert-as-tool-demo](https://github.com/azu/power-assert-as-tool-demo "azu/power-assert-as-tool-demo")

## インストール

### 必要なモジュールをインストール

```sh
npm i -D power-assert mocha babel-register babel-preset-power-assert babel-preset-es2015
```

mochaからテストを実行する際にBabelの変換をするので、`babel-register`と以下の2つのpresetをインストールします。

- babel-preset-es2015
	- ES2015の変換を行うpreset
- babel-preset-power-assert
	- power-assert関連のpreset


### `.babelrc`を作成

Babelの設定をするために、`.babelrc`を次のように作成します。
power-assertは開発中(テスト中)にしか必要ないので、`env`で振り分けしておきます。
`env`は`NODE_ENV`によって振り分けされます。 `NODE_ENV=production <コマンド>`のような感じで指定して環境によって必要がプラグインなどを分けることができます。
何も指定していない場合は``NODE_ENV=development`

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

これはどういうことになるかというと、コード上でライブラリとして`require("power-assert")`と読み込む必要がなくなり、ツールとしてpower-assertが動くようになった事を意味します。

なので、`power-assert`を使わなくなった時はツール(具体的には`babelrc`から)power-assertを外すだけで、コードは一切変更しなくても良くなったということです。

そのため、power-assertは開発用のライブラリからツールという位置づけに変わったという話でした。

ここまでを適応したバージョン

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
            assert.equal(error.name, assert.AssertionError.name);
        }
    });
});
```

引数の型違反例外(`assert.AssertionError`)もテストされていることが分かります。

JSDocから自動でランタイムAssertionを追加してくれる[babel-plugin-jsdoc-to-assert](https://github.com/azu/babel-plugin-jsdoc-to-assert "babel-plugin-jsdoc-to-assert")を使うことで、`add.js`から型チェック的な`assert`は取り除けます。

- [JSDocをランタイムassertに変換するBabelプラグインを書いた | Web Scratch](http://efcl.info/2016/03/25/jsdoc-to-assert/ "JSDocをランタイムassertに変換するBabelプラグインを書いた | Web Scratch")

具体的には`presets`に[babel-preset-jsdoc-to-assert](https://github.com/azu/babel-preset-jsdoc-to-assert "azu/babel-preset-jsdoc-to-assert: Babel plugin for jsdoc-to-assert")を追加して、JSDocを書くだけです。

```diff
--- a/.babelrc
+++ b/.babelrc
@@ -5,6 +5,7 @@
   "env": {
     "development": {
       "presets": [
+        "jsdoc-to-assert",
         "power-assert"
       ]
     }

diff --git a/src/add.js b/src/add.js
index 4748ae3..5cc3b9c 100644
--- a/src/add.js
+++ b/src/add.js
@@ -1,7 +1,9 @@
 "use strict";
-const assert = require("assert");
+/**
+ * @param {number} x
+ * @param {number} y
+ * @returns {Number}
+ */
 export default function add(x, y) {
-    assert(typeof x === "number");
-    assert(typeof y === "number");
     return x + y;
-}
```

変更したコミット:

- [feat(babel): use jsdoc-to-assert by azu · Pull Request #1 · azu/power-assert-as-tool-demo](https://github.com/azu/power-assert-as-tool-demo/pull/1 "feat(babel): use jsdoc-to-assert by azu · Pull Request #1 · azu/power-assert-as-tool-demo")

[babel-preset-jsdoc-to-assert](https://github.com/azu/babel-preset-jsdoc-to-assert "azu/babel-preset-jsdoc-to-assert: Babel plugin for jsdoc-to-assert")もpower-assert化できるといいのですが、Babelの変換の仕組み上難しいのでまだできてません。

また、`assert`をアプリケーション側で使っていた際に、プロダクションビルドからは取り除きたいということがあります。その場合はunassertを使えば、取り除けるので便利です。

- [twada/unassert: Encourage reliable programming by writing assertions in production code, and compiling them away from release](https://github.com/twada/unassert)
- [twada/babel-plugin-unassert: Babel plugin to encourage reliable programming by writing assertions in production code, and compiling them away from release.](https://github.com/twada/babel-plugin-unassert)

変更したコミット:

- [feat(babel): add unassert in NODE_ENV=production building by azu · Pull Request #2 · azu/power-assert-as-tool-demo](https://github.com/azu/power-assert-as-tool-demo/pull/2 "feat(babel): add unassert in NODE_ENV=production building by azu · Pull Request #2 · azu/power-assert-as-tool-demo")

ここまでを全部適応した最終的な`.bebelrc`は次のような形になっています。

```js
{
  "presets": [
    "es2015"
  ],
  "env": {
    "development": {
      "presets": [
        "jsdoc-to-assert",
        "power-assert"
      ]
    },
    "production": {
      "plugins": [
        "babel-plugin-unassert"
      ]
    }
  }
}
```

- [azu/power-assert-as-tool-demo: babel + power-assert preset demo project.](https://github.com/azu/power-assert-as-tool-demo "azu/power-assert-as-tool-demo: babel + power-assert preset demo project.")

## おわり

- espower-babelはBebel5以下における解だったので、役目はひとまず終わり
- 普通にコンパイル言語と同じように、デバッグ時のみ情報量の多いassertの適応、プロダクションビルド時は取り除くということができるようになった
- [ホーア論理](https://ja.wikipedia.org/wiki/%E3%83%9B%E3%83%BC%E3%82%A2%E8%AB%96%E7%90%86 "ホーア論理")的な事前条件は`assert`やJSDocで、事後条件はテストで保証するみたいなことはやりやすくなった
