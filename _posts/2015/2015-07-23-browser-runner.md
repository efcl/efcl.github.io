---
title: "コマンドラインまたはNodeモジュールからブラウザでURLへ簡単にアクセスさせる"
author: azu
layout: post
date : 2015-07-23T09:06
category: JavaScript 
tags:
    - Browser
    - JavaScript
    - Node.js
    - WebDriver
    - Selenium

---

[browser-runner](https://github.com/azu/browser-runner "browser-runner")という指定したURLへIE、Firefox、Chrome、PhantomJSなどブラウザでアクセスさせられるシンプルなNodeモジュールを書きました。

コマンドライン または Nodeモジュールとして利用することができます。
ブラウザはWebDriverに対応していれば何でも動きます。


## 作った目的

この[browser-runner](https://github.com/azu/browser-runner "browser-runner")はローカルのHTMLにも対応しているのですが、
PhantomJSであるHTMLにアクセスしたログを見たいときにわざわざJSを書く必要があるのが面倒だったのでこれを作りました。

ローカルHTMLは自動的にローカルサーバを立てた上でアクセスするのでXHRなどもちゃんと動作するようになってます。


## インストール

コマンドラインツールとして使う場合は `-g` オプション付きでインストール

```
npm install -g browser-runner
```

`-b`オプションでブラウザ名、引数にHTMLのファイルパス or URLを指定すれば、そのブラウザでアクセスしてくれます。

```sh
$ browser-runner -b firefox path/to/index.html
```

アクセスすると`console.log`の内容はそのまま標準出力に出してくれたりします。
PhantomJSの場合は_phantomjs.log_あたりにも出力されます。


### Nodeモジュールとして使う

[browser-runner](https://github.com/azu/browser-runner "browser-runner")はNodeモジュールとしても使えます。

[example/example.js](https://github.com/azu/browser-runner/tree/master/example/example.js)にURLにアクセスするサンプルがありますが、以下のように書くだけです。

```js
var BrowserRunner = require("browser-runner");
var runner = new BrowserRunner({
    "browser": "phantomjs"
});
runner.runBrowser("http://example.com").then(function () {
    console.log("FINISH EXAMPLE!");
}).catch(console.error.bind(console));
```

ローカルファイルへのアクセスも同じで[example/local-example.js](https://github.com/azu/browser-runner/tree/master/example/local-example.js)にサンプルがありますが、自動的にURLかどうかをみて判別します。

```js
var BrowserRunner = require("browser-runner");
var path = require("path");
var runner = new BrowserRunner({
    "browser": "phantomjs"
});
runner.runBrowser(path.join(__dirname, "local.html")).then(function () {
    console.log("FINISH LOCAL EXAMPLE!");
}).catch(console.error.bind(console));
```

またローカルサーバを内蔵していますが、そこに任意のサーバスクリプトをかませたり、`runner.runBrowser`をするとselenium-webderiverオブジェクトが渡ってくるので、それを使ってwebdriver経由でブラウザの操作を追加することができます。

例えば、[URLにアクセスしてある要素をクリックして、class属性が変わったか](https://github.com/azu/browser-runner/blob/fa7fccdbc1d466e3a0ac41a1d70c4280b808543a/test/BrowserRunner-test.js#L38-L46)をテストするというようなものが書けたりします。(若干おまけ感がある)

[browser-runner](https://github.com/azu/browser-runner "browser-runner")の仕組みは[Reftest-runner](https://github.com/azu/reftest-runner "Reftest-runner")のものがベースでそれを別モジュールに取り出したという感じです。

- [ブラウザでビジュアルテストをするreftest-runnerを作った | Web Scratch](http://efcl.info/2015/05/14/reftest-runner/ "ブラウザでビジュアルテストをするreftest-runnerを作った | Web Scratch")

### 類似

- [juliangruber/browser-run](https://github.com/juliangruber/browser-run "juliangruber/browser-run")
	- [Tapeと合わせて使う](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4)と便利だそうです