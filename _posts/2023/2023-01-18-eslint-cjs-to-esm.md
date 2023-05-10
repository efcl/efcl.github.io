---
title: "eslint-cjs-to-esm: CJSをESMへとマイグレーションするツールを書いた"
author: azu
layout: post
date : 2023-01-18T22:13
category: JavaScripts
tags:
    - ESLint
    - JavaScript

---

最近、色々なライブラリをCommonJS(CJS)からECMAScript Module(ESM)へとマイグレーションしています。
その際に、ESMでは`__dirname`や`require`などCommonJS特有の機能は使えなくなっています。
また、TypeScriptやBabelなど多くのツールはCJSでは`import`時に拡張子はなくても大丈夫ですが、ESMの場合は`import`時に拡張子が必要になります。


```diff
import url from "node:url";
- import { mdEscape } from "./mdEscape";
+ import { mdEscape } from "./mdEscape.js"; // ESMでは相対パスに拡張子は省略できない
+ const __filename = url.fileURLToPath(import.meta.url); // __filenameはESMにはないためimport.meta.urlから取得する
+ const __dirname = path.dirname(__filename);　// __dirnameはESMにはない

console.log(__filename, __dirname)
```
具体的にAPIや構文などでCJSからESMへと移行する際に気を付けるNode.jsのAPIは次にまとめてあります。

- [Node.jsライブラリ/ツールをESMに移行する[Node.js 12+]](https://zenn.dev/azu/scraps/8251dab75562c8)

ほとんど対応する構文や機能があるので機械的に置き換えたり、チェックできるものばかりです。
そのため、CJSとESMへと機械的に移行するのを補助するツールを書きました

## [eslint-cjs-to-esm](https://github.com/azu/eslint-cjs-to-esm)

[eslint-cjs-to-esm](https://github.com/azu/eslint-cjs-to-esm)は、名前の通りESLintを使ってCJSをESMへと移行するためのツールです。
ESLint自体を同梱しているため、別途ESLintの設定をせずにルール入りのESLintとして利用できます。

含まれているESLintのルールとしては次のgistのものをベースにしています。

- [ESLint rules for migrating projects from CommonJS to ESM](https://gist.github.com/Jaid/164668c0151ae09d2bc81be78a203dd5)

具体的には次のようなESLintのルールを同梱しています。

### eslint-plugin-file-extension-in-import-ts

- [eslint-plugin-file-extension-in-import-ts](https://github.com/AlexSergey/eslint-plugin-file-extension-in-import-ts)
  - [[import/no-unresolved] not working for index.js · Issue #1292 · import-js/eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/issues/1292)

### eslint-plugin-node

| ESLint Plugin                                            | Rule                                                                                                                            | Source                                                                                                       | Description                                                       | Fixable |
|----------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|---------|
| [node](https://github.com/mysticatea/eslint-plugin-node) | [no-extraneous-import](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-extraneous-import.md)         | [:link:](https://github.com/mysticatea/eslint-plugin-node/blob/master/lib/rules/no-extraneous-import.js)     | disallow import declarations which import extraneous modules      | -       |
| [node](https://github.com/mysticatea/eslint-plugin-node) | [no-sync](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-sync.md)                                   | [:link:](https://github.com/mysticatea/eslint-plugin-node/blob/master/lib/rules/no-sync.js)                  | disallow synchronous methods                                      | -       |
| [node](https://github.com/mysticatea/eslint-plugin-node) | [file-extension-in-import](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/file-extension-in-import.md) | [:link:](https://github.com/mysticatea/eslint-plugin-node/blob/master/lib/rules/file-extension-in-import.js) | enforce the style of file extensions in `import` declarations     | Yes     |

### eslint-plugin-import

| ESLint Plugin                                               | Rule                                                                                                                               | Source                                                                                                        | Description                                                          | Fixable |
|-------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|---------|
| [import](https://github.com/import-js/eslint-plugin-import) | [extensions](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md)                                 | [:link:](https://github.com/import-js/eslint-plugin-import/blob/main/src/rules/extensions.js)                 | Ensure consistent use of file extension within the import path.      | -       |
| [import](https://github.com/import-js/eslint-plugin-import) | [no-unresolved](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md)                           | [:link:](https://github.com/import-js/eslint-plugin-import/blob/main/src/rules/no-unresolved.js)              | Ensure imports point to a file/module that can be resolved.          | -       |
| [import](https://github.com/import-js/eslint-plugin-import) | [no-useless-path-segments](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md)     | [:link:](https://github.com/import-js/eslint-plugin-import/blob/main/src/rules/no-useless-path-segments.js)   | Prevent unnecessary path segments in import and require statements.  | Yes     |
| [import](https://github.com/import-js/eslint-plugin-import) | [no-extraneous-dependencies](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md) | [:link:](https://github.com/import-js/eslint-plugin-import/blob/main/src/rules/no-extraneous-dependencies.js) | Forbid the use of extraneous packages.                               | -       |
| [import](https://github.com/import-js/eslint-plugin-import) | [no-commonjs](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-commonjs.md)                               | [:link:](https://github.com/import-js/eslint-plugin-import/blob/main/src/rules/no-commonjs.js)                | Report CommonJS `require` calls and `module.exports` or `exports.*`. | -       |

### eslint-plugin-unicorn

| ESLint Plugin                                                    | Rule                                                                                                                           | Source                                                                                                    | Description                                                               | Fixable |
|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|---------|
| [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) | [prefer-module](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md)                   | [:link:](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/rules/prefer-module.js)          | Prefer JavaScript modules (ESM) over CommonJS.                            | Yes     |
| [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) | [prefer-node-protocol](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md)     | [:link:](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/rules/prefer-node-protocol.js)   | Prefer using the `node:` protocol when importing Node.js builtin modules. | Yes     |
| [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) | [prefer-top-level-await](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md) | [:link:](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/rules/prefer-top-level-await.js) | Prefer top-level await over top-level promises and async function calls.  | Suggest |


## 使い方

使い方は単純で、次のようにESLintと同じ引数を渡して対象のファイルをLintと修正できます。

    npx eslint-cjs-to-esm [ESLint Arguments!]

ESLintのオプションは次のページを参照してください。

- [Command Line Interface - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/command-line-interface)

具体的に`./src/*`以下のJSとTSがESMとして問題ないかは次のようにチェックできます。

    npx eslint-cjs-to-esm "./src/**/*.{js,ts}"

自動的に修正できるものは`--fix`オプションを渡すと修正できます。

    npx eslint-cjs-to-esm "./src/**/*.{js,ts}" --fix

**Note:** ちょっとした制限があって、ファイルパスは`.`から始める必要があります。

> NG: `npx eslint-cjs-to-esm "src/**/*.ts"`  
> OK: `npx eslint-cjs-to-esm "./src/**/*.ts"`  

具体的にこのツールのコマンド叩くだけでコードの9割ぐらいはESMへと移行できました。
面倒な`.js`を追加する作業もほとんどやってくれます。

- [refactor: migrate to dual package by azu · Pull Request #4 · azu/markdown-function](https://github.com/azu/markdown-function/pull/4)

さらにCJSとESMを一つのパッケージ内でサポートする[Dual packages](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)にする[tsconfig-to-dual-package](https://github.com/azu/tsconfig-to-dual-package)と次のようなスクリプトと使うとほぼ機械的にできます。

- [Migration Script: Convert TypeScript project to Node.js dual package](https://gist.github.com/azu/f383ba74c80d17806badd49745ce2129)

Dual Packageについては[tsconfig-to-dual-package](https://github.com/azu/tsconfig-to-dual-package)を紹介する記事を別途書きます。

## まとめ

ESLintとルールをラップしてCJSからESMへと移行する[eslint-cjs-to-esm](https://github.com/azu/eslint-cjs-to-esm)というツールを作りました。

- [azu/eslint-cjs-to-esm: ESLint wrapper for migration from CJS to ESM.](https://github.com/azu/eslint-cjs-to-esm)

実装も `eslint` コマンドをラップして叩いているだけではあるので単純です(ちょっと設定の渡し方やFORCE_COLORなどの色付けは工夫が必要)。

- [eslint-cjs-to-esm/eslint-cjs-to-esm.js at main · azu/eslint-cjs-to-esm](https://github.com/azu/eslint-cjs-to-esm/blob/main/eslint-cjs-to-esm.js)

CJSからESMへとマイグレーションするツールは色々あるのですが、[codemod](https://github.com/facebookarchive/codemod)的なツールではなくTranspilerだったり、なんかうまく動かなかったりして、求めてたものが見つかりませんでした。

- [Jack-Works/ts-esm-migrate: Migrate code to NodeNext module resolution by add .js extension](https://github.com/Jack-Works/ts-esm-migrate)
- [beenotung/fix-esm-import-path: Auto fix import path for esm compatibility](https://github.com/beenotung/fix-esm-import-path)
- [wessberg/cjstoesm: A tool that can transform CommonJS to ESM](https://github.com/wessberg/cjstoesm)

その中で、[ESLint rules for migrating projects from CommonJS to ESM](https://gist.github.com/Jaid/164668c0151ae09d2bc81be78a203dd5)を見て、ESLintとルールを使えば大体は実現できそうと思ってESLintのラッパーを実装しました。
ESLintをラップしたのは、自分のライブラリプロジェクトではESLintを使ってないことが多く、また単なるマイグレーションツールが欲しかったからです。
一度移行すれば、TypeScriptの`module: ESNext`の設定だとCJSのコードを使うとコンパイルエラーになるため、継続的にLintする必要性が薄いです。

そのため、codemod的なマイグレーションツールをイメージして[eslint-cjs-to-esm](https://github.com/azu/eslint-cjs-to-esm)を作りました。
