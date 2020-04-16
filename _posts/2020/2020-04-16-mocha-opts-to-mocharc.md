---
title: "Mocha v7のmocha.optsから.mocharc.{json,js,yml,yaml}にマイグレーションするスクリプト"
author: azu
layout: post
date : 2020-04-16T23:03
category: JavaScript
tags:
    - JavaScript
    - Mocha

---


[Mocha](https://mochajs.org/)ではv7から`test/mocha.opts`の設定ファイルが非推奨となっています。

`mocha.opts`ファイルはCLIの引数をそのまま書ける設定ファイルです。

```
--require ts-node/register
```

`mocha.opts`ファイルを利用すると次のようなDeprecation Warningが表示されるはずです。

> (node:64389) DeprecationWarning: Configuration via mocha.opts is DEPRECATED and will be removed from a future version of Mocha. Use RC files or package.json instead.

Mocha v6から`mocha.opts`の代わりに`.mocharc.json`などの設定ファイルがサポートされました。

`.mocharc.{json,js,yml,yaml,cjs}`など色々な拡張子がありますが、`.mocharc.json`なら次のような設定ファイルとなります。

```json
{
  "require": [
    "ts-node/register"
  ]
}
```

この`mocha.opts`から`.mocharc.{json,js,yml,yaml}`へのマイグレーションを行うスクリプトを作りました

## mocha-migrate

以下にソースがあります。

- [azu/mocha-migrate: Mocha migration script for mocha v7](https://github.com/azu/mocha-migrate)

使い方は単純で、次のようにすれば、`mocha.opts`から`.mocharc.json`を作成します。

```
npx @azu/mocha-migrate migrate-opts -file ./test/mocha.opts -type json
```

それぞれの拡張子の対応は`-type`で指定できます。

```
# mocha.opts to .mocharc.json
npx @azu/mocha-migrate migrate-opts -file ./test/mocha.opts -type json
# mocha.opts to .mocharc.js
npx @azu/mocha-migrate migrate-opts -file ./test/mocha.opts -type js
# mocha.opts to .mocharc.yml
npx @azu/mocha-migrate migrate-opts -file ./test/mocha.opts -type yml
# mocha.opts to .mocharc.yaml
npx @azu/mocha-migrate migrate-opts -file ./test/mocha.opts -type yaml
```

デフォルトでは作成だけですが、`mocha.opts`ファイルを変換後に削除したい場合は`-rm`オプションをつけます。

```
npx @azu/mocha-migrate migrate-opts -file ./test/mocha.opts -type json -rm
```

monorepoのパッケージのまとめて変換したい場合は、[`lerna exec`](https://github.com/lerna/lerna/tree/master/commands/exec)などを使えばまとめて変換できます。

```
./node_modules/.bin/lerna exec --no-bail npx @azu/mocha-migrate migrate-opts -- -file test/mocha.opts -type json -rm
```

参考: [Migrate mocha.opts to .mocharc.(json|js|yml|yaml) · Issue #125 · secretlint/secretlint](https://github.com/secretlint/secretlint/issues/125)


このマイグレーションスクリプトは、`mocha migrate`とMochaにマイグレーションコマンドを追加するPRがベースです。

- [Create migrate script to change mocha.opts to \[json | js | yml | yaml\] by wnghdcjfe · Pull Request #4069 · mochajs/mocha](https://github.com/mochajs/mocha/pull/4069)

こういうユーザーにとって利益がない変更はできるだけツールが提供したほうがいいので、早くマージされてほしいですね。

同様の書式の変更(機能追加ではない)をやった[`husky`](https://github.com/typicode/husky)の場合は、`husky-upgrade`というマイグレーションスクリプトを同梱していました。
同梱してるならDeprecatedWarningにマイグレーション方法も出せるので、そうして欲しかったという話でした。
