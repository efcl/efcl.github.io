---
title: "npm 2.0.0でローカルモジュールを使ってrequire('../../../')を回避する"
author: azu
layout: post
date : 2014-10-04T15:27
category: JavaScript
tags:
    - Node.js
    - JavaScript
issue: https://github.com/efcl/efcl.github.io/issues/36

---

## 概要

npm 1.xの時はローカルにあるディレクトリへの相対パスを`dependency`フィールドで指定できなかった。

そのため、ローカルにあるモジュールをたどるには`require("../../../")`のような指定が必要になっていた(ライブラリに切り出せればいいけど、アプリケーション固有のUtilsなどがある場合これ面倒になる)

- [Better local require() paths for Node.js](https://gist.github.com/branneman/8048520 "Better local require() paths for Node.js")
- [ avoiding ../../../../../../..](https://github.com/substack/browserify-handbook#avoiding- " avoiding ../../../../../../..")
- [How I Work Around The require(“../../../../../../../”) Problem In NodeJS | ThoughtStream.new :derick_bailey](http://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/ "How I Work Around The require(“../../../../../../../”) Problem In NodeJS | ThoughtStream.new :derick_bailey")

そのため、`npm link`や`node_modules`にそのまま追加してやるなど、微妙なハックがひつようだった。

しかし、npm 2.0.0で`dependency`フィールドに[Local Paths](https://www.npmjs.org/doc/files/package.json.html#local-paths "Local Paths")の指定がサポートされた。
そのため、ローカルに置いたディレクトリをモジュールとして使うことができ、`require("local-library");`みたいな書き方が可能になる。

要はプロジェクトに依存したUtilsとかを定義するのに便利という話。

## ローカルモジュールの作成

今回のサンプルプロジェクトは以下においてあります。

- [azu/npm-localpaths-example](https://github.com/azu/npm-localpaths-example "azu/npm-localpaths-example")

ローカルモジュールの作り方は同じで、
普通にnpmで公開するモジュールの作り方と全く同じです。

今回は、[example-utils](https://github.com/azu/npm-localpaths-example/tree/master/local_modules/example-utils "example-utils")というローカルのモジュールを作成しました。


- example-utils.js
- package.json

があるだけのシンプルなディレクトリをローカルに作ります。
相対パスで参照するので、プロジェクト内に`local_modules`のような場所を作って置くのが、
シンプルな方法だと思います。

package.jsonの中身も普通のモジュールと同じですが、npm publishする予定は無いので、
`"repository"`フィールドを無くす代わりに、`"private": true`というフィールドをつけておくといいです。

```json
{
  "name": "example-utils",
  "version": "1.0.1",
  "description": "local module",
  "main": "example-utils.js",
  "private": true,
  "author": "azu",
  "license": "MIT"
}
```

こうすることでインストールする時以下のような警告がでなくなります。

	No repository field.


## ローカルモジュールの使い方

作ったローカルモジュールは普通にnpmでインストールすることが出来ます。

``` js
npm install --save local_modules/example-utils
```

でインストール出来ます。

mainのpackage.jsonに以下のように追加されていればOKですね。

```json
  "dependencies": {
    "example-utils": "file:local_modules/example-utils"
  }
```

後は、普通に`require("example-utils")`という感じで参照することが出来ます。

```js
"use strict";
var main = {};
main.help = function () {
    var message = require("example-utils").loadFile(__filename + ".txt");
    console.log(message);
};
module.exports = main;
```

### ローカルモジュールの注意点

ローカルモジュールは`npm install`をすると`node_modules`にコピーされます。
そのため、ローカルモジュールを更新した場合は自動では反映されません。
ローカルモジュールのバージョンを書き換えて、npm installし直す必要があります。

後、名前の衝突が起きるかもしれないので、分かりやすいprefixをつけるといいのかもしれません。

## ローカルモジュールの利点

ローカルモジュールを使うことで、
`require('../../../utils/log.js');` のような相対パスを辿る必要がなくなります。
特にUtils系のコードは色んな所で参照するため、ローカルモジュールを使うとかなり楽になります。

デメリットとしては更新したらもう一度installしないといけないので、忘れていてハマる可能性があること。

npm 2.0.0からこの[Local Paths](https://www.npmjs.org/doc/files/package.json.html#local-paths "Local Paths")が指定できるようになったので、
積極的に使っていきたい気がします。

- [azu/npm-localpaths-example](https://github.com/azu/npm-localpaths-example "azu/npm-localpaths-example")