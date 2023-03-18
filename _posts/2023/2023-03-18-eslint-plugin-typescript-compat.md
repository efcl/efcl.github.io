---
title: "TypeScriptの型情報を使ったサポート対象のブラウザが実装してないメソッドの利用をエラーにするESLintルール"
author: azu
layout: post
date : 2023-03-18T10:18
category: JavaScript
tags:
    - ESLint
    - TypeScript
    - JavaScript

---

[eslint-plugin-typescript-compat](https://github.com/azu/eslint-plugin-typescript-compat)はTypeScriptプロジェクト向けのESLintルールです。
このESLintではサポートしているブラウザが、実装していないメソッドを検知してLintエラーにしてくれます。

JavaScriptではメソッドの静的解析は難しい(メソッド名が同じでも独自実装の可能性があるため)ですが、TypeScriptの型情報を使って静的解析をしています。

## サポートしている機能

- [ ] JavaScriptのビルトインオブジェクト
    - [x] プロトタイプメソッド `Array.prototype.find`
    - [x] 静的メソッド `Array.from`
    - [ ] オブジェクト `Promise`
- [ ] DOM API

基本的にメソッドのみを使っています。
他のオブジェクトなども原理的には実装できるはずですが、実装していません。

オブジェクトに関しては[amilajack/eslint-plugin-compat: Check the browser compatibility of your code](https://github.com/amilajack/eslint-plugin-compat)があるので、併用するのが良さそうです。ルール的にマージしてしまうのが良い気はしますが、特に動きはないです。

- [Merge to similar project? · Issue #1 · azu/eslint-plugin-typescript-compat](https://github.com/azu/eslint-plugin-typescript-compat/issues/1)

必要な人はこのIssueを進めていくと良いかもしれません。

## インストール

npmを使ってインストールします。

```
$ npm install eslint-plugin-typescript-compat typescript @typescript-eslint/parser --save-dev
```

TypeScriptの型情報を使うために`typescript`と`@typescript-eslint/parser`も必要です。

## 使い方

### 1. ESLintの設定を更新する

`.eslintrc.json`:

```diff
   {
+    "extends": ["plugin:typescript-compat/recommended"],
+    "env": {
+      "browser": true
+    },
+    "parserOptions": {
+      "project": "./tsconfig.json"
+    },
     // ...
   }
```

TypeScriptの型情報を使うために[parserOptions.project](https://typescript-eslint.io/architecture/parser/)を設定する必要があります。 
また、TypeScriptの`lib`を設定する必要があります。
TypeScriptの`lib`のデフォルトは`ES2015`(`ES6`)です。そのため、何も設定してないプロジェクトだとTypeScriptのチェッカーはES2016+の機能を認識しません。
そのため、ES2016+のメソッドを使うとエラーとなってしまいます。

> Note: If --lib is not specified a default list of libraries are injected. The default libraries injected are:
> ► For --target ES5: DOM,ES5,ScriptHost
> ► For --target ES6: DOM,ES6,DOM.Iterable,ScriptHost
> -- https://www.typescriptlang.org/docs/handbook/compiler-options.html

ES2016+の機能を検知したい場合は、`"lib": ["ESNext"]`など適切なlibを設定する必要があります。

```json5
{
    "compilerOptions": {
        // ...
        "lib": [
            "ESNext",
            "DOM"
        ]
    }
}

```

### 2. ブラウザのターゲットを設定する

ブラウザのターゲットは[browserslist](https://github.com/browserslist/browserslist)を使って設定します。

`package.json`に`browserslist`を使ったブラウザのターゲットを設定できます。

例えば、IE 11をサポートする場合は以下のように設定します。

```diff
{
     // ...
+    "browserslist": [
+      "ie 11"
+    ]
}
```

詳細は[browserslist](https://github.com/browserslist/browserslist)のドキュメントを参照してください。

## サンプル

ブラウザのターゲットがIE 11の場合は、次のように`browserslist`を設定します。

```json5
     "browserslist": [
       "ie 11"
    ]
```

次のコードはIE 11がサポートしていない`Array.prototype.includes`を含んでいるのでエラーとなります。

```
const items = [1,2,3];
items.includes(2); 
```

このルールでは、次のようなエラーを表示します。

> Array.included is not supported in ie 11. https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/find"

## オプション

### Polyfillsを追加する

Polyfillsを`eslint`の設定に追加します。
polyfillが定義されている場合は、ブラウザがそのメソッドを実装してなくてもエラーとして検出しません。

```json5
{
  // ...
  "settings": {
    "polyfills": [
      // Example of instance method, must add `.prototype.`
      "Array.prototype.find"
    ]
  }
}
```

## まとめ

[eslint-plugin-typescript-compat](https://github.com/azu/eslint-plugin-typescript-compat)は、サポートされていないメソッドを検出するためのESLintプラグインです。
メソッドのみしか対応してないので、[eslint-plugin-es-x](https://github.com/eslint-community/eslint-plugin-es-x)や[eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat)などと併用するのが良さそうです。

[eslint-plugin-typescript-compat](https://github.com/azu/eslint-plugin-typescript-compat)は結構前に作ったのですが、記事を書き忘れていました。
TypeScript 5のリリースに合わせてv1.0.0を公開したので、記事を書きました。

- [Release v1.0.0 · azu/eslint-plugin-typescript-compat](https://github.com/azu/eslint-plugin-typescript-compat/releases/tag/v1.0.0)

このルールの元は、次のツールになっています。

- [TypeScript Compiler APIとmdn-browser-compat-dataとbrowserslistを使ってサポートされていない呼び出しを見つける - hitode909の日記](https://blog.sushi.money/entry/2020/03/01/173306)
- [hitode909/eslint-plugin-typescript-compat-dom: Uses mdn-browser-compat-data, browserslist, TypeScript Compiler API and lints compatibilities between browsers DOM APIs.](https://github.com/hitode909/eslint-plugin-typescript-compat-dom)

