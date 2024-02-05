---
title: "Node.jsで機能やパッケージの非推奨メッセージを通知する方法"
author: azu
layout: post
date : 2024-02-04T12:10
category: JavaScript
tags:
    - Node.js
    - JavaScript

---

ライブラリやツールなどを作っているときに、特定の機能やパッケージを非推奨にする場合があります。
これらの非推奨はリポジトリ上のREADMEやIssueなどに書いても、利用者が気づかないことがあります。
そのため、利用者が気付けるように非推奨の機能やパッケージを使った場合に警告を出す方法を紹介します。

非推奨にはいくつかの段階があり、それに応じてやり方を変えられるので、それぞれの方法を紹介します。

- パッケージの非推奨化: `npm deprecate <package> <message>`
- コードレベルの非推奨化: JSDocタグの`@deprecated` 
- 実行時の非推奨化: `process.emitWarning()`

## パッケージの非推奨化: `npm deprecate <package> <message>`

npmのパッケージレベルで、そのパッケージが非推奨であることを通知するには[`npm deprecate`](https://docs.npmjs.com/cli/v8/commands/npm-deprecate)コマンドを使います。

- [npm-deprecate](https://docs.npmjs.com/cli/v8/commands/npm-deprecate)

```shell
npm deprecate <package> <message>
```

`<package>`には非推奨にするパッケージ名を指定します。
`<message>`には非推奨にする理由を書きます。

`@azu/test-package`パッケージを非推奨にする場合は次のようにします。

```shell
npm deprecate @azu/test-package "@azu/test-package is deprecated. use new-someting instead." 
```

非推奨とするパッケージのバージョンを指定することもできます。

```shell
npm deprecate @azu/test-package@1.x "@azu/test-package@1.x is deprecated. use new-someting instead." 
```

`npm deprecate`コマンドで非推奨にしたパッケージは、インストールしようとしたときに警告が表示されます。

```shell
$ npm install @azu/test-package
npm WARN deprecated @azu/test-package@1.0.0: @azu/test-package is deprecated. use new-someting instead.

added 1 package in 1s
```

また、npmのウェブサイト上で非推奨になっていることが表示されます。

![npm web](https://efcl.info/wp-content/uploads/2024/02/04-1707021499.png)

- [@azu/test-package - npm](https://www.npmjs.com/package/@azu/test-package)

## コードレベルの非推奨化: JSDocタグの`@deprecated`

JSDocの`@deprecated`タグを使うことで、コードレベルで非推奨な機能をエディタやIDEで警告することができます。

```js
/**
 * @deprecated use new-someting instead.
 */
function oldFunction() {
    // ...
}
```

たとえば、textlint v14では`TextLintCore`というAPIを非推奨にしています。
この`TextLintCore`には`@deprecated`タグが付与されています。
そのため、このAPIを使おうとすると、エディタやIDEで打ち消し線と共に警告が表示されます。

![@deprecated](https://efcl.info/wp-content/uploads/2024/02/04-1707021698.png)

TypeScriptでは、LSP(Language Server Protocol)側がこの`@deprecated`タグをサポートしています。
そのためVSCodeやWebStormなど色々なエディタが、この表示をサポートしているはずです。

- [Use JSDoc](https://jsdoc.app/tags-deprecated)
- [TypeScript Playground - JSDoc Deprecated](https://www.typescriptlang.org/play?#code/PTAEBYDoAZHMGR7BkIAMApAygEQPYGNB2DIfoZAGhlkCEGQaIYABAEwFMAHAJxuwEMAXGqwGQZBo9UHaGQJ0MgMYZABwyBrBgBQIUIF-4wAVKgVQZAMQyA-BkDqDIH0GQEAMgKblAf86AKdTRZsgJIZA-vKAKVzWAzBkAiDGUAWDIGUGQLEMpJYAcGKWECWDM9hAIIZqeiZWDioLS1hAWQYVQE0GLQkJAEsAOw4GADMWbBpQAEFsbEwAVwyASTSszFAAbwlQUDSWAFsaAC5QAGc2BnSAcwBuRtABmjTaBi7e-rTh5KbgACpl0BDGZnZOUEBjuUB4hkAohjFxyZoGQFWGQGKGQB+GQGuGQEmGKNtAeQZAAwYFO1Bl4FHumgAHl0AEStFgAGxowNAAB9QMCsjQwZDgSMAL7JWjYcEsJigEppXqgUr-BhVGpdIolcpscmYEYk850yD-AEjHygAAqAE86DRUNh+nQ2EhAHrpgArjQAWmrhAOsMgFuGQCLDEIrmJAEUMgHqGQDdDAJNI4YogOYAzxUAYC6mQBG1oBAhjIzkc8BIhxUgG0GQDJDFxEIAzaMAUiqmQBfimoEklpAA3bolWiAKwZfLhABUMgHGGK74DyedIccHglL-Qk0QAhDKrAGUMgAmGQCXDIAShkAzwwG6SAZoYbg9AKGKsEQtE24U4RFwgFGDQCMGqZABYRgC5Pf2JCRAA)

ただし、この表示はあくまでエディタ上での警告であり、実行時に警告を出すわけではありません。
そのため、普段編集しないコードだと気づかない場合があります。

実行時に警告を出すには、`process.emitWarning()`を使います。

## 実行時の非推奨化: `process.emitWarning()`

実行時に非推奨な機能を使った場合に警告を出すには、[process.emitWarning(warning[, options])](https://nodejs.org/api/process.html#processemitwarningwarning-options)が利用できます。
`console.warn`などのログ出力でもいいですが、Node.js向けのライブラリやツールならば`process.emitWarning()`を使うことで、警告を受け取る側も制御しやすくて便利です。

- Node.js: v6.0.0からサポート
- Deno: [emitWarning | /node/process.ts | std@0.158.0 | Deno](https://deno.land/std@0.158.0/node/process.ts?doc=&s=emitWarning)
- Bun: v0.5.0?からサポート
    - [Implement `process.emitWarning` · Issue #1821 · oven-sh/bun](https://github.com/oven-sh/bun/issues/1821)

`process.emitWarning()`で非推奨メッセージを出す場合は、次のようにします。

```js
process.emitWarning("This is deprecated", {
    type: "DeprecationWarning",
});
```

`type`を`DeprecationWarning`にすることで、Node.jsのフラグである`--throw-deprecation`/`--no-deprecation`/`--trace-deprecation`で利用者側が警告の動作を制御できます。
デフォルトは、警告メッセージがコンソールに出力されるだけですが、それぞれのフラグを`node`コマンドに渡すことで、警告の動作を制御できます。

- `--throw-deprecation` を使うと、非推奨の警告が例外としてスローされます。
- `--no-deprecation` を使うと、非推奨の警告が抑制されます。
- `--trace-deprecation` を使うと、非推奨の警告がstderrに出力され、スタックトレースが表示されます。

たとえば、デフォルトでは次のような非推奨の警告が実行時に表示されます。

- サンプル: [azu/textlint-deprecated-example](https://github.com/azu/textlint-deprecated-example)

```shell
$ node index.mjs
(node:85465) DeprecationWarning: textlint: TextLintCore is deprecated. Please use new APIs https://github.com/textlint/textlint/issues/1310

You can control this deprecation message by Node.js command-line flags.

If the NODE_OPTIONS=--throw-deprecation is used, the deprecation warning is thrown as an exception rather than being emitted as an event.
If the NODE_OPTIONS=--no-deprecation is used, the deprecation warning is suppressed.
If the NODE_OPTIONS=--trace-deprecation is used, the deprecation warning is printed to stderr along with the full stack trace.


(Use `node --trace-deprecation ...` to show where the warning was created)
```

一方で、`node`コマンドに`--throw-deprecation`を渡すことで、非推奨の警告が例外としてスローされます。
加えて、スタックトレースも表示されるため、どこで非推奨のAPIを使っているかがわかります。


```shell
$ NODE_OPTIONS=--throw-deprecation node index.mjs
node:internal/process/warning:162
        throw warning;
        ^

DeprecationWarning: textlint: TextLintCore is deprecated. Please use new APIs https://github.com/textlint/textlint/issues/1310

You can control this deprecation message by Node.js command-line flags.

If the NODE_OPTIONS=--throw-deprecation is used, the deprecation warning is thrown as an exception rather than being emitted as an event.
If the NODE_OPTIONS=--no-deprecation is used, the deprecation warning is suppressed.
If the NODE_OPTIONS=--trace-deprecation is used, the deprecation warning is printed to stderr along with the full stack trace.


    at Logger.deprecate (/~/textlint-deprecated-example/node_modules/textlint/lib/src/util/logger.js:28:17)
    at TextLintCore.setupRules (/~/textlint-deprecated-example/node_modules/textlint/lib/src/DEPRECATED/textlint-core.js:98:25)
    at file:///~/textlint-deprecated-example/index.mjs:4:10
    at ModuleJob.run (node:internal/modules/esm/module_job:217:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:316:24)
    at async loadESM (node:internal/process/esm_loader:34:7)
    at async handleMainPromise (node:internal/modules/run_main:66:12)

Node.js v20.8.1
```

`node --throw-deprecation index.mjs`と書いても同じです。
コマンドラインツールは`node`にフラグを渡せないことの方が多いので、`NODE_OPTIONS=--throw-deprecation`の環境変数を使うのが便利です。

![process.emitWarningに挙動を制御](https://efcl.info/wp-content/uploads/2024/02/04-1707022460.png)

`console.warn`との違いは、非推奨のAPIを利用する側に、その警告の動作を制御できる標準的な方法が提供されていることです。
そのほかにも`process.on("warning", (warning) => {})`を使うことで、非推奨の警告を受け取ることができます。

詳細はドキュメントを参照してください。

- [Process | Node.js v21.6.1 Documentation](https://nodejs.org/api/process.html#processemitwarningwarning-options)

textlint v14では、古いAPIの実行時警告にこの`process.emitWarning()`を使っています。

- [textlint v14.0.0 · textlint](https://textlint.github.io/blog/2024/02/03/textlint-14#add-deprecation-warning-to-old-apis)
- [textlint v14をリリースしました | Web Scratch](https://efcl.info/2024/02/04/textlint-v14/)

## まとめ

ライブラリやツールで機能やパッケージを非推奨にする場合は、利用者が気づけるように警告を出すことが重要です。
この記事では、パッケージの非推奨化、コードレベルの非推奨化、実行時の非推奨化の3つの方法を紹介しました。

- パッケージの非推奨化: [`npm deprecate <package> <message>`](https://docs.npmjs.com/cli/v8/commands/npm-deprecate)
- コードレベルの非推奨化: [JSDocタグの`@deprecated`](https://jsdoc.app/tags-deprecated)
- 実行時の非推奨化: [`process.emitWarning()`](https://nodejs.org/api/process.html#processemitwarningwarning-options)
