---
title: "Secretlint v7.0.0をリリースしました。Pure ESMへの書き直し"
author: azu
layout: post
date : 2023-07-05T21:42
category: secretlint
tags:
    - secretlint
    - JavaScript
    - Node.js

---

機密情報をLintできるSecretlintのv7.0.0をリリースしました！

- [Release v7.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v7.0.0)

このバージョンでは、[Secretlint](https://github.com/secretlint/secretlint)をESMモジュールとして書き直しました。

どのように移行したかは別の記事で紹介しているので、移行方法について記事を参照してください

- [CommonJSからES Modulesへの移行する方法。トップダウンかボトムアップか](/2023/07/05/convert-to-esm/)

## Secretlint v7.0.0の変更点

ルールと本体のコードを含めて、全部のパッケージをESMに書き直しました。
その中で、いろいろ整理したりもしたので、変更点はいろいろあります。

ただし、`secretlint`コマンドや`@secretlint/quick-start`、Docker Imageとして使う場合は、そこまで目にみえる変化は少ないと思います。

詳細はリリースノートも参照してください。

- [Release v7.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v7.0.0)

### Breaking Changes

- Node.js 18+を必要とするようになりました
    - これはパッケージのコードをES2022形式で出力するようにしたためです。
    - Node.js 14は2023年4月でEOL、Node.js 16は2023年9月でEOLなので、Node.js 18を使うことをおすすめします
    - [nodejs/Release: Node.js Release Working Group](https://github.com/nodejs/release#release-schedule)
- Docker ImageのBase ImageをNode.js 18に更新しました
- Exit Statusがあまり明確になっていなかったのを整理しました。
    - 基本的には次のようなExit Statusを返すようになりました
    - `0`: Lintに成功し、問題なし
    - `1`: Lintに失敗し、問題がある
    - `2`: クラッシュするなどのプログラム的な問題がある
- "json" formatterが[textlint](https://github.com/textlint/textlint)の流用だったのを、secretlintように変更しました
    - jsonの形式が変わっています
- パッケージをCommonJSから[Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)へ変更しました
    - PRs: 
        - [Core Packags: Convert to ESM · Issue #527 · secretlint/secretlint](https://github.com/secretlint/secretlint/issues/527)
        - [Rules: Convert to ESM · Issue #530 · secretlint/secretlint](https://github.com/secretlint/secretlint/issues/530)
    - コアとルールをそれぞれ分けて移行しました。
    - どうやって過程を段階的に移行したかについては[CommonJSからES Modulesへの移行する方法。トップダウンかボトムアップか](/2023/07/05/convert-to-esm/)で紹介します
- `@secretlint/types` をDual Packageにしました
    - `@secretlint/types`はルールを書くのに必要な型情報をまとめたパッケージです
    - [Dual CommonJS/ES module packages](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)はCJSとESMどちらからもimportできるパッケージです
    - そのため`@secretlint/types` だけは CJS and ESM どちらからでも利用できます。
- `@secretlint/tester` をESMに書き直して、`node:test`ベースにしました
    - 今まではMochaをベースにしていましたが、[Node.js Test runner](https://nodejs.org/api/test.html)を使うことで、Mochaに依存しないようにしました
    - `node:test`はMochaと違ってAsync Describeのようなこともできるため、テストフレームワークを作るテストフレームワークとして便利です。

`@secretlint/types` と `@secretlint/tester` の変更はちょっとわかりにくいですが、
簡単に言えば、SecretlintのルールをCJSとESMどちらでも書けるようにするための工夫です。

CJSからESMのパッケージを読み込むには、読み込むパッケージがDual Packageになっている必要があります。
一つだけ例外があり、Dynamic Importを使うとCJSからESMのパッケージを読み込むことができます。

ルールを書く際に、`types`と`tester`は基本的に必要になります。(それ以外は依存しなくても大丈夫です)

- `@secretlint/types` はDual Packageなので、CJSからESMのパッケージを読み込むことができます
- `@secretlint/tester` はPure ESM Packageなので、Dynamic Importを使うとCJSからも利用できます。

つまり、次のように書けば、ルール自体はCJSのままでも`@secretlint/tester`でテストが実行できます。

CommonJS Edition:

```diff
- const { snapshot } = require()"@secretlint/tester");
const path = require("path");
const { creator: rule } = require("../src/index");
+ const test = require("node:test");
- describe("@secretlint/secretlint-rule-example", () => {
+ test("@secretlint/secretlint-rule-example", async (t) => {
+      const snapshot = (await import("@secretlint/tester")).snapshot;
-      snapshot({
+      await snapshot({
          defaultConfig: {
              rules: [
                  {
                      id: "@secretlint/secretlint-rule-preset-canary",
                      rule,
                      rules: [],
                      options: {},
                  },
              ],
          },
          updateSnapshot: !!process.env.UPDATE_SNAPSHOT,
          snapshotDirectory: path.join(__dirname, "snapshots"),
      }).forEach((name, test) => {
-          it(name, async function () {
+          return it(name, async (context) => {
              const status = await test();
              if (status === "skip") {
-                  this.skip();
+                  context.skip();
              }
          });
      });
  });
```

もちろん、ルールはESMでも書けるので、次のようにESMでテストを書くこともできます。
(基本はESMが推奨です)

```ts
import test from "node:test";
import { snapshot } "@secretlint/teter";
import { creator as rule } from "../src/index.js";
test("@secretlint/secretlint-rule-example", async (t) => {
    return snapshot({
        defaultConfig: {
            rules: [
                {
                    id: "@secretlint/secretlint-rule-example",
                    rule,
                    options: {},
                },
            ],
        },
        updateSnapshot: !!process.env.UPDATE_SNAPSHOT,
        snapshotDirectory: new URL("snapshots", import.meta.url),
    }).forEach((name, test) => {
        return t.test(name, async (context) => {
            const status = await test();
            if (status === "skip") {
                context.skip();
            }
        });
    });
});
```

[Node.js Test runner](https://nodejs.org/api/test.html)の場合は、`node --test`を使ってテストを実行できます。
`--loader ts-node/esm`を使うことで、TypeScriptで書いたESMのテストを実行できます。

```
$ node --test test/index.test.js
# or
$ node --loader ts-node/esm --test test/index.test.ts
```

詳しくは <https://github.com/secretlint/secretlint/blob/master/docs/secretlint-rule.md> を参照してください。

なんでこんなわざわざ面倒なことしてるかというと、ルールを書くのはユーザーなので、最小限の変更で移行できるようにするためです。
SecretlintのルールはCJSとESMどちらで書いたものでも動作するので、実際に移行が必要なのはテストのエントリーポイントぐらいです。

- [🛡🔑 Secretlint 4.0.0: ESMで書かれたルールのサポート、secretlint-disableコメントのサポート | Web Scratch](https://efcl.info/2021/09/15/secretlint-4.0.0/)

[Secretlintのリポジトリ](https://github.com/secretlint/secretlint)はmonorepoになっていて、Secretlint自体とルールが両方含まれています。
ESMへの移行を段階的にやる方法を模索するときに、まずは本体を移行して、ルールはそのまま(CJS)で後から移行するという方法を試してみました。
その結果生まれたのが、今回の変更です。

この辺の過程については、次の記事にまとめています。

- [CommonJSからES Modulesへの移行する方法。トップダウンかボトムアップか](/2023/07/05/convert-to-esm/)

## ESMに移行した理由

特にないです。長期的には移行しないといけないので移行しました。

[Secretlint](https://github.com/secretlint/secretlint)は、ライブラリではなくツールなので、あまり深く考えずにESMへ移行しました。

Secretllintは元からブラウザで動いていたので、ESMにしたことでの短期的なメリットはあまりないと思います。
(Top-Level awaitで利用できるとかちょっとしたメリットはあります)

- <https://secretlint.github.io/>

ただ、[sindresorhus](https://github.com/sindresorhus)パッケージなどPure ESMなライブラリは、ESMに移行しないと使いにくいという問題があるので、それが解決できたのは良かったです。
また、移行する過程で`node:test`や`util.parseArgs`などのNode.jsの新しい機能を使いました。
これらを使うことで外部依存が減らせたのは結構良かったです。

実際の移行作業はスクリプトや[eslint-cjs-to-esm](https://github.com/azu/eslint-cjs-to-esm)を使って9割ぐらいは自動化できました。

- [eslint-cjs-to-esm: CJSをESMへとマイグレーションするツールを書いた | Web Scratch](https://efcl.info/2023/01/18/eslint-cjs-to-esm/)

[Secretlintのリポジトリ](https://github.com/secretlint/secretlint)のmonorepoは30-40ぐらいのパッケージがあるので、とにかく数の問題でした。
この数をどうやって切り分けるかについては、次の記事にまとめています。

- [CommonJSからES Modulesへの移行する方法。トップダウンかボトムアップか](/2023/07/05/convert-to-esm/)

CJSからESMへと移行しました、ベンチマーク的にはほとんど変わらなかったです。

- [Benchmarks](https://secretlint.github.io/secretlint/dev/bench/)