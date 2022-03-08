---
title: "ある要素が表示されるまで待つJSライブラリを書いた(MutationObserver)"
author: azu
layout: post
date : 2015-04-06T09:34
category: JavaScript
tags:
    - JavaScript
    - library
    - MutationObserver

---

# [wait-for-element.js](https://github.com/azu/wait-for-element.js "wait-for-element.js")

[wait-for-element.js](https://github.com/azu/wait-for-element.js "wait-for-element.js") という関数一個だけのライブラリを書きました。

以下のような感じで、セレクタにマッチする要素が出現するまで待つというシンプルな関数です。

```js
var waitForElement = require("wait-for-element");
waitForElement("#js-element").then(function (element) {
    alert("Found #js-element");
}).catch(console.error.bind(console));
```

## インストール

npm からインストールできます。

    npm install wait-for-element.js

### 使い方

`waitForElement(selector, [timeout])` という感じで使います。
`waitForElement()`はPromiseを返すので、見つかった`then`で登録したコールバックが呼ばれて、見つからなかったら`catch`が呼ばれるという感じです。

Promiseについて詳しくは[JavaScript Promiseの本](https://azu.github.io//promises-book/ "JavaScript Promiseの本")を見てください

```js
/**
 * Wait until an element that is matched the selector is visible.
 * @param {string} selector the css selector
 * @param {number} timeout the timeout is millisecond. default:2000ms
 * @returns {Promise}
 */
var waitForElement = require("wait-for-element");
waitForElement("#js-element").then(function (element) {
    alert("Found #js-element");
}).catch(console.error.bind(console));
```

[Example of wait-for-element.js](https://github.com/azu/wait-for-element.js/tree/master/example "Example of wait-for-element.js") か以下にブラウザで動かせるサンプルがあるので試してみるとわかりやすいです。

[![view on requirebin](https://requirebin.com/badge.png)](http://requirebin.com/?gist=ed965c96630535f6ed96)

### 依存

- Promise API

Promiseがある前提のライブラリになってるので、Promiseない環境では先に[ES6-Promise](https://github.com/jakearchibald/es6-promise "ES6-Promise")などを入れるといいと思います。

実際に[テストコード](https://github.com/azu/wait-for-element.js/blob/36829cfdfdc7012884f7c12b754df5d51047f8e8/test/wait-by-observer-test.js#L4)ではPhantomJSなどでも動かしてるのでpolyfillを入れています。

- MutationObserver or SetTimeout polling 

[wait-for-element.js](https://github.com/azu/wait-for-element.js "wait-for-element.js")は[MutationObserver](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver "MutationObserver")とsetTimeoutによるポーリングの2つの実装を持っています。

feature detectionをして、MutationObserverが使えるならこっちを使うようになってます。

- Element.matches

ある要素があるセレクタにマッチするかは[Element.matches()](https://developer.mozilla.org/en/docs/Web/API/Element/matches "Element.matches()")を使っています。

古いブラウザだと名前が違ったりするのでaliasを貼るかpolyfillを使う必要があるかもしれません。

```js
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
    proto.mozMatchesSelector || proto.msMatchesSelector ||
    proto.oMatchesSelector || proto.webkitMatchesSelector;
}
```

何か色々新しめのAPIを使ってる感じがしますが、実際のwait-for-element.jsの使いドコロとしてはGreasemonkeyやブラウザ拡張などだと思うので、基本的にpolyfillなくても良い場合が多そうな気がします。

## テスト

テストは以下のように実行できますが、Test Runnerには[testem](https://github.com/airportyh/testem)を使っています。(最近メンテナが増えたのでリリースが増えた)

    npm test

[testem.json](https://github.com/azu/wait-for-element.js/blob/master/testem.json "testem.json")を見てみるとわかりますが、[power-assert](https://github.com/twada/power-assert)と[Browserify](https://github.com/substack/node-browserify)と[Mocha](http://mochajs.org/)を組み合わせて使っていますが、設定はそこまで複雑じゃないと思います。

以前紹介したgulp+testemの方法も、ちょっと変更があってBowerなしでも可能になったので以下の記事は更新してあります。

- [power-assertでJavaScriptのテストをする ブラウザ編 | Web Scratch](https://efcl.info/2014/0411/res3820/ "power-assertでJavaScriptのテストをする ブラウザ編 | Web Scratch")

今回やったのは上記の記事Karmaでやってた部分をTestemに変えただけで、Browserifyでテストコード(power-assertを使ってる)をビルドしたファイルを作って、それをTestemに読み込ませて、Mochaでブラウザ上でテストするという感じです。

Travis CIでは簡単に動かせるFirefoxとPhantomJSだけのテストになってます。 (Chromeはsandboxの都合で何か面倒)

```yaml
sudo: false
language: node_js
node_js:
- '0.12'
before_script:
  - export DISPLAY=:99.0
  - sh -e /etc/init.d/xvfb start
  - sleep 5
script: npm test -- -l phantomjs,firefox
```

[![Build Status](https://travis-ci.org/azu/wait-for-element.js.svg?branch=master)](https://travis-ci.org/azu/wait-for-element.js)

- [CI as a Service ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ | Web Scratch](https://efcl.info/2013/0321/res3234/ "CI as a Service ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ | Web Scratch")

[zuul](https://github.com/defunctzombie/zuul)を使おうとしたけど、MochaがPromiseテスト対応していないバージョンだったり面倒になったので諦めました。(SauceLabsでIEのテストしたかった…)

テストはNode.jsだけで動くようにするととてもシンプルになるのでできるだけそうした方が楽ですが、今回みたいに結構DOM API使ってるとブラウザで動かしたほうがいいかなーという感じがします。けど、もっと簡単に(設定ファイルなしで)ブラウザでもテストができるといいなーという感じがしました。

