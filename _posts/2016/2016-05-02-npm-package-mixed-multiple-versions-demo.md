---
title: "npmで同じライブラリの複数バージョンをインストールして使う方法"
author: azu
layout: post
date : 2016-05-02T14:12
category: JavaScript
tags:
    - npm
    - JavaScript
    - library

---

[Add support for ESLint v2 by Daniel15 · Pull Request #107 · fkling/astexplorer](https://github.com/fkling/astexplorer/pull/107/files#diff-b9cfc7f2cdf78a7f4b91a753d10865a2R52 "Add support for ESLint v2 by Daniel15 · Pull Request #107 · fkling/astexplorer")を見ていて、一つのプロジェクト内で複数のバージョンの同じライブラリを使う面白い方法が使われてたのでメモです。

前述した[AST explorer](https://astexplorer.net/ "AST explorer")の場合だと、ESLint@1とESLint@2の両方に対応したPlaygroundを作りたいため、一つのプロジェクトに両方のバージョンをインストールする必要があるという話です。

他にも、同じライブラリでもβ版は別の名前空間(`require("other-name-space")`)で使って試したいというケースもあると思います。

- [javascript - 同一npmパッケージ名の複数のバージョンをサブディレクトリにインストールすることはできますか? - スタック・オーバーフロー](http://ja.stackoverflow.com/questions/9191/%E5%90%8C%E4%B8%80npm%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E5%90%8D%E3%81%AE%E8%A4%87%E6%95%B0%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E3%82%92%E3%82%B5%E3%83%96%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%AB%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AF%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B "javascript - 同一npmパッケージ名の複数のバージョンをサブディレクトリにインストールすることはできますか? - スタック・オーバーフロー")

ブラウザだとちょっとファイルサイズ的に避けたい気がしますが、`jQuery@1`と`jquery@3`を混在させて使うプロジェクトとかにも応用できそうな気がします。

## やり方

サンプルプロジェクトは以下においてあります。

- [azu/npm-package-mixed-multiple-versions-demo: Demo project for mixing multiple version of the same npm package in a project.](https://github.com/azu/npm-package-mixed-multiple-versions-demo "azu/npm-package-mixed-multiple-versions-demo: Demo project for mixing multiple version of the same npm package in a project.")

このプロジェクトのゴールは`lodash@3`と`lodash@4`を同時にひとつのプロジェクトで使うことです(実用性は置いておきます)

## 1. それぞれのバージョンのローカルパッケージを作る

npm@2 からは[Local Paths](https://docs.npmjs.com/files/package.json#local-paths "Local Paths")を依存関係として定義することができます。

簡単にいうと、相対パスで指定したディレクトリをモジュールとして`dependencies`に追加できる機能です。

- [npm 2.0.0でローカルパッケージを使ってrequire('../../../')を回避する | Web Scratch](http://efcl.info/2014/10/04/npm2-local-module/ "npm 2.0.0でローカルパッケージを使ってrequire(&#39;../../../&#39;)を回避する | Web Scratch")
- [npmパッケージをExampleテストしよう | Web Scratch](http://efcl.info/2015/07/29/example-test-on-npm/ "npmパッケージをExampleテストしよう | Web Scratch")

これを使って、`lodash@3`と`lodash@4`のローカルパッケージを作ります。

[サンプルプロジェクト](https://github.com/azu/npm-package-mixed-multiple-versions-demo)を見るのが分かりやすいですが、`lodash3`と`lodash4`というディレクトリを手動で作って、それぞれ`npm init`して`main`に`index.js`を指定しただけのモジュールです。

```
packages
├── lodash3
│   ├── index.js
│   └── package.json
└── lodash4
    ├── index.js
    └── package.json
```

`index.js`には以下のようにlodashをexportしているだけです。

```
// lodash@3
module.exports = require("lodash");
```

- [packages/lodash3/index.js](https://github.com/azu/npm-package-mixed-multiple-versions-demo/blob/master/packages/lodash3/index.js "packages/lodash3/index.js")

lodash3のモジュールで`require("lodash")`したのは[packages/lodash3/package.json](https://github.com/azu/npm-package-mixed-multiple-versions-demo/blob/62745c4ee969da1672a6c4c84b929e6946da0e21/packages/lodash3/package.json#L9 "packages/lodash3/package.json")で依存関係に定義されている`lodash`なので、`lodash@3`がexportされているという事になります。

```json
{
  "name": "lodash3",
  "version": "1.0.0",
  "description": "lodash@3",
  "main": "index.js",
  "author": "azu",
  "license": "MIT",
  "dependencies": {
    "lodash": "^3.0.0"
  }
}
```

## 2. ローカルパッケージをインストールする

後は、プロジェクトにローカルパッケージとして作った`lodash3`と`lodash4`への依存を定義するだけです。

```sh
npm i -S packages/lodash3 packages/lodash4
```

でインストールできます。
npmのバージョンによって`npm i -S`でちゃんと相対パスにならないバグがありますが、直接以下のように書けば同じ結果が得られます。

```json
  "dependencies": {
    "lodash3": "file:packages/lodash3",
    "lodash4": "file:packages/lodash4"
  }
```  

## 3. それぞれのバージョンを使う

後は、プロジェクトから`require("lodash3")`のような感じで`require`して使うだけです。

```js
"use strict";
var assert = require("assert");
var lodash3 = require("lodash3");
var lodash4 = require("lodash4");

assert(lodash3.VERSION.includes("3"));
assert(lodash4.VERSION.includes("4"));
```

lodashには`.VERSION`にバージョン番号が入ってるので、それぞれ@3と@4のバージョンが読み込めてることが確認できます。

## おわり

ローカルパッケージを使って、一つのプロジェクト内で複数バージョンのnpmパッケージを使い分ける方法を紹介しました。

[astexplorer](https://github.com/fkling/astexplorer "astexplorer")みたいなツール系だと結構実用的な感じで、普通のウェブサイトとかプロダクトならまあ最新のバージョン使おうって感じです。
(ワークアラウンドとして覚えておくと便利なことがあるかもしれないという感じです)

- サンプル: [azu/npm-package-mixed-multiple-versions-demo: Demo project for mixing multiple version of the same npm package in a project.](https://github.com/azu/npm-package-mixed-multiple-versions-demo "azu/npm-package-mixed-multiple-versions-demo: Demo project for mixing multiple version of the same npm package in a project.")
