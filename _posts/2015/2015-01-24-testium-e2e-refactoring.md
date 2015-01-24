---
title: "テストできないコードをE2Eテストを使ってリファクタリングしよう"
author: azu
layout: post
date : 2015-01-24T18:03
category: JavaScript
tags:
    - E2Eテスト
    - JavaScript
    - Browser
    - jQuery
    - リファクタリング
issue: https://github.com/efcl/efcl.github.io/issues/59

---

ユニットテストがしにくい状態となってるコードを[Testium](https://github.com/groupon-testium/testium "Testium")を使ったE2Eテストを書いてリファクタリングしてみる話です。

例えば、以下のようなjQueryで書いたコードは外(テストコード)から取り出すポイントがないので、ユニットテストを書くのは難しいと思います。(そもそもViewのコードなので)

![img](http://gyazo.com/b7e1593ef11326f5d6bf788d25e1bd6d.gif)

> 特定のバージョンでの変更点を簡単に確認できるよう、 
「Aの列のラジオボタンを選ぶと同じ行より一つ下にあるBの列のラジオボタンを自動で選ぶ」 という補助機能

```javascript
$(document).ready(function () {
    // seq: シーケンス番号
    $.each(["new_version", "old_version"], function () {
        $("input[name='" + this + "']").each(function (idx, elem) {
            if (idx == 0) $(elem).attr('checked', 'checked');
            $(elem).attr('seq', idx);
        });
    });
    $("input[name='new_version']").change(function () {
        var seq = parseInt($(this).attr('seq'));
        $("input[name='old_version']").eq(seq).attr('checked', 'checked');
    });
});
```

- [美しいプログラムを書く(業務用Webアプリケーション保守編) - TIM Labs](http://labs.timedia.co.jp/2012/07/beautiful-code-vs-mr-oldtype.html "美しいプログラムを書く(業務用Webアプリケーション保守編) - TIM Labs") からの引用

上記の記事ではこのコードをリファクタリングしていますが、リファクタリングする際に動作が変わってないかの保証がないと不安です。

通常ではユニットテストがその役割に使われると思いますが、元々テストコードがなかったり、上記のような全体が関数で囲まれているとテストから触れないため難しいケースがあります。

このようなケースでもE2Eテストだと内部的なコードがどうなってるかはあまり気にしないで動作のテストが可能になります(Integration Tests、UI Tests 呼ばれ方が色々ある気がしますがE2Eとします)

この記事では、E2Eテストフレームワークである[Testium](https://github.com/groupon-testium/testium "Testium")の紹介とどうやってリファクタリングするかについて紹介します。

## [Testium](https://github.com/groupon-testium/testium "Testium")とは

[Testium](https://github.com/groupon-testium/testium "Testium")はWebDriver APIを使いブラウザを操作して出来るテストフレームワークです。同様のツールとして以下のようなものがあります。

- [Nightwatch](http://nightwatchjs.org/ "Nightwatch")
- [Intern](http://theintern.io/ "Intern")
- [Protractor](https://github.com/angular/protractor "Protractor")

WebDriver APIに対応してるブラウザを実行環境として使えるので、現在だとPhantomJS/Chrome/Firefox/IE等でE2Eテストを動かすことが出来ます。

Testiumは[同期的なWebDriver APIのラッパ](https://github.com/groupon-testium/webdriver-http-sync)を持っているため、`.click()`といったブラウザを操作する処理を同期的に書くことができるのが大きな特徴です。

```js
var inputNew = browser.getElement('input');
inputNew.click();// クリックの処理が同期的になってる
assert(inputNew.get("value"), "expected value");
```

他のE2Eテストフレームワークは非同期で呼び出すWebDriver APIのラッパーを使っています。
そのため[Nightwatch.js](http://nightwatchjs.org/ "Nightwatch.js")のようなDSL的なメソッドチェーンや[Protractor](https://github.com/angular/protractor "Protractor")のようなPromiseを吸収するような仕組みが必要になります。([Protractor](https://github.com/angular/protractor "Protractor")がJasmineと密接なのも`expect(promise)`という形のassetionレベルでの非同期対応が必要となるためです)

- [JavaScript - こわくない Protractor - Qiita](http://qiita.com/shuhei/items/6973fe694d29a193f224 "JavaScript - こわくない Protractor - Qiita")

また、TestiumはMocha上でテストを書くことができるので[power-assert](https://github.com/twada/power-assert "power-assert")など既存のものがそのまま使うことが出来ます。

Mocha連携の仕組みも、`before(injectBrowser)` という形で、mochaが用意してるテストのイベント(テスト開始時、終了時)に処理を登録したり、`this.browser`を追加するだけなので、Mochaに強く依存してるわけではないです。(今のところMochaしかないですが、自分で書くのもそんなに難しい感じではないと思います。

- [https://github.com/groupon-testium/testium/blob/master/src/mocha/index.coffee](https://github.com/groupon-testium/testium/blob/master/src/mocha/index.coffee)

実際に書いてみると普段書くユニットテストと似たような感覚で書くことができ、`this.browser`にブラウザを操作する[Testium](https://github.com/groupon-testium/testium "Testium")のAPIが用意されています。

```js
var injectBrowser = require('testium/mocha');
var assert = require("power-assert");
var browser;
describe("app-test", function () {
    var text = 'todo text';
    before(injectBrowser());
    beforeEach(function () {
        browser = this.browser;
        this.browser.navigateTo("/");
    });
    context("when テキストボックスに文字を入れて送信した時", function () {
        beforeEach(function () {
          // テキストを入力して送信ボタンをクリック
        	browser.setValue('.todoText', text);
    		browser.click('.todoBtn');
        });
        it("should li要素が作成されている", function () {
            var list = browser.getElements('.todoList li');
            assert(list.length > 0); // assertが普通に利用できる
        });
        it("should リストアイテムのテキストは送信したものと一致している", function () {
            // testiumが用意してるassertionも幾つかある
            browser.assert.elementHasText('.todoList li', text); 
        });
    });
});
```

面白いところとしては、デフォルトでテストが失敗した時にスクリーンショットが保存されてるようになっています。
また、スクリーンショット同士の比較してのテストするAPIも持っているため、画面が変化してないかのチェック等も可能です。

### Testiumを動かしてみよう

[Testium](https://github.com/groupon-testium/testium "Testium")を最小構成(といいつつpower-assert入ってる)で動かすサンプルを作ったので、それを見ながら解説します。

- [azu/testium-seed](https://github.com/azu/testium-seed/ "azu/testium-seed")
- READMEにも同じ解説が書いてあります。

[![site](http://gyazo.com/1b73573394ce9fa9e674c2f10d82943a.gif)](http://azu.github.io/testium-seed/)

![screenshot-error](http://monosnap.com/image/FA1NZW9vzQilkGMOLOBSrkp9ZdA56H.png)


1: インストール `devDependencies`

このプロジェクトは[testium](https://github.com/groupon-testium/testium "testium")、[Mocha](http://mochajs.org/ "Mocha")、[power-assert](https://github.com/twada/power-assert "power-assert")を使っているので以下のような感じで必要なものをインストールします。

また実行環境としてphantomjsを使いたいのでphantomjsもインストールします(グローバルにインストールしてる場合は別に必要ありません)

```
npm install --save-dev mocha power-assert intelli-espower-loader testium http-server phantomjs
```

2: .testiumrcの作成

Testiumの設定ファイルである`.testiumrc`ファイルを作成して、プロジェクトルートにおきます。

ini形式で書く設定ファイルで、`launch = true`と書くと`npm test`という感じでテストを実行した時に、自動的に`npm start`で指定したローカルサーバを立てて、設定したブラウザ(デフォルトではphantomjs)を起動して実行出来ます。

```
; defaults to false, `npm start`s the app
launch = true
```

別のローカルサーバを立てて繋ぎたい場合は設定でportを指定したりしてつなぎます。(参考: [coding-kata/monologue](https://github.com/coding-kata/monologue "coding-kata/monologue"))

```
[app]
port=8989

```

3: HTTPサーバを立てる

HTMLを表示してアクセスする場合にもローカルサーバを立ててそこに繋いだ方がいいので、[nodeapps/http-server](https://github.com/nodeapps/http-server "nodeapps/http-server")を使ってHTTPサーバを立てます。

```
npm install -D http-server
```

でインストールしていれば、以下のように書いておけばプロジェクトルートを元に http://localhost:port でアクセス出来ます。

```
  "scripts": {
    "start": "http-server",
    "test": "mocha test/*.js"
  },
```


4: E2Eのテストケースを書く

詳しくは[app-test.js](https://github.com/azu/testium-seed/blob/gh-pages/test/app-test.js "app-test.js")を見てみるといいですが、以下のような形でテストを書きます。

`this.browser.navigateTo("/")`でローカルサーバにアクセスして、ブラウザを操作してテストをします。

```javascript
"use strict";
var injectBrowser = require('testium/mocha');
var assert = require('power-assert');

describe("index.html", function () {
    before(injectBrowser());// <= integrate testium 
    beforeEach(function () {
        this.browser.navigateTo('/');// move to `"/"` which is served by http-server
    });
    it("then output filled with text of this option", function () {
        var firstInput = this.browser.getElement('input[name="framework_name"]');
        // click
        firstInput.click();
        // assert 
        var testFrameWorkName = firstInput.get("value");
        var output = this.browser.getElement("#js-output");
        var result = output.get("text");
        assert(result.indexOf(testFrameWorkName) >= 0);
    });
});
```

5: テストを実行する

後はMochaでテストを実行するのと同じです。

```
npm test
# alias to
mocha --require intelli-espower-loader test/
```

![Success tests](http://monosnap.com/image/hwVhdEMWlrgafoUNOq8hUKOePaFRNH.png)

### chromeでテストする

先ほどはデフォルトのphantomjsでテストを実行しましたが、chromeなどでもテストを動かせます。

1: `.testiumrc`に`browser = "chrome"`を追加する

```
; defaults to false, `npm start`s the app
launch = true
browser = "chrome"
```

2: Download chromium-driver

[Testium](https://github.com/groupon-testium/testium "Testium")にはchrome-driver等をダウンロードするコマンドがあるので、そのコマンドを使います。

```
$ ./node_modules/.bin/testium --download-selenium
```

**Tips:**

TestiumコマンドにはREPL機能があり、以下のようなコマンドを実行するREPLとして`browser`APIを叩いて試せます。

```
./node_modules/.bin/testium --browser firefox
```


3: テストを実行する

後は実行するだけです。

```
npm test
```

![chrome-e2e](http://gyazo.com/3ff16c0473b5eb3729d26c6401a2fe7b.gif)


細かい設定は[Configuration](https://github.com/groupon-testium/testium#configuration "Configuration")にかいてありますが、この設定書式をini形式(Key=value)に直す必要があることには注意して下さい。

例えば、

```
app:
  # A port of 0 means "auto-select available port"
  port: process.env.PORT || 0
```

は以下のような感じになると思います。

```
[app]
port=0
```

### 補足

またTestiumは全ての[WebDriver API](https://code.google.com/p/selenium/wiki/JsonWireProtocol "WebDriver")ラッパが実装されてないので、足りないものは[webdriver-http-sync](https://github.com/groupon-testium/webdriver-http-sync "webdriver-http-sync")に一覧があるので実装してみるといいかもしれません。

## E2Eテストとリファクタリング

[![coding-kata](https://avatars0.githubusercontent.com/u/10607142?v=3&s=200)](https://github.com/coding-kata)

最近[coding-kata](https://github.com/coding-kata/ "coding-kata")というプロジェクトで、JavaScriptのリファクタリングを写経をしていましたが、jQueryのベタ書きだとユニットテストを入れるのが結構難しいと思います。

E2Eテストの場合は現状を壊してないかのテストは比較的カンタンに書くことが出来ます(そこから継続して機能追加するとまた別のコストがありますが)

<blockquote class="twitter-tweet" lang="en"><p>ユニットテストは機能で取り出せないとテスト難しいけど、E2Eテストは面で切り取りできるので既存のものへテスト置きやすい。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/557904943957688320">January 21, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

最初にあげた[美しいプログラムを書く(業務用Webアプリケーション保守編) - TIM Labs](http://labs.timedia.co.jp/2012/07/beautiful-code-vs-mr-oldtype.html "美しいプログラムを書く(業務用Webアプリケーション保守編) - TIM Labs")を題材に、[Testium](https://github.com/groupon-testium/testium "Testium")を使ったE2Eテストを書いてリファクタリングしたものが以下にあります。

- [coding-kata/beautiful-code-vs-mr-oldtype](https://github.com/coding-kata/beautiful-code-vs-mr-oldtype "coding-kata/beautiful-code-vs-mr-oldtype")

実際に行ったリファクタリングはそれぞれPull Requestになってます。

- [Refactoring jQuery by azu · Pull Request #1 · coding-kata/beautiful-code-vs-mr-oldtype](https://github.com/coding-kata/beautiful-code-vs-mr-oldtype/pull/1 "Refactoring jQuery by azu · Pull Request #1 · coding-kata/beautiful-code-vs-mr-oldtype")
    - E2Eテストを書いて記事中にあったリファクタリングを適応した内容
- [Refactoring E2E tests to apply page-object pattern by azu · Pull Request #2 · coding-kata/beautiful-code-vs-mr-oldtype](https://github.com/coding-kata/beautiful-code-vs-mr-oldtype/pull/2 "Refactoring E2E tests to apply page-object pattern by azu · Pull Request #2 · coding-kata/beautiful-code-vs-mr-oldtype")
    - E2Eテストのリファクタリングをした内容
    - [Page Objects](https://github.com/angular/protractor/blob/master/docs/page-objects.md "Page Objects")パターンを使うことで、テスト内から`this.browser.getElements('input[name="new_version"]')`のようなセレクタを排除して、ページが変更されても更新しやすくなるようにしてます

他にも幾つか同じような構成で写経をしてました。

- [coding-kata/todo-app-jquery-to-backbone](https://github.com/coding-kata/todo-app-jquery-to-backbone "coding-kata/todo-app-jquery-to-backbone")
   - [リファクタリングのためのテスト](http://hokaccha.github.io/slides/refactoring/ "リファクタリングのためのテスト")のE2EテストをTestiumに移植した内容
   - jQueryで書かれたTodoアプリをBackbone.jsベースにリファクタリングしてます。
   - 実装はES6で書いてます => [ライブラリをES6で書いて公開する所から始めよう | Web Scratch](http://efcl.info/2015/01/09/write-es6/ "ライブラリをES6で書いて公開する所から始めよう | Web Scratch")
- [coding-kata/monologue](https://github.com/coding-kata/monologue "coding-kata/monologue")
	- 以下のを元にjQueryベースのものをBackbone.jsベースにリファクタリングする内容です
	- Browserifyでファイルとしてモジュールを分けたりなどもしています。
	- [The Plight of Pinocchio: JavaScript's quest to become a real language](http://opensoul.org/2012/05/16/the-plight-of-pinocchio/)
	- [writings/understanding-backbone.md at master · kjbekkelund/writings](https://github.com/kjbekkelund/writings/blob/master/published/understanding-backbone.md/)

またリポジトリを見てみると分かるように全部Travis CIでE2Eテストが動いています。

[![Build Status](https://travis-ci.org/coding-kata/beautiful-code-vs-mr-oldtype.svg)](https://travis-ci.org/coding-kata/beautiful-code-vs-mr-oldtype)

## おわりに

まだ、足りない機能や日本語をWebDriver API経由での入力が上手く行かないバグ等もありますが、Protractorに比べると設定ファイルや実行するために覚える必要があることが少なくて済むのでいいなーという感じがします。

- [doesn&#39;t deal with multibyte unicode characters · Issue #124 · groupon-testium/testium](https://github.com/groupon-testium/testium/issues/124 "doesn&#39;t deal with multibyte unicode characters · Issue #124 · groupon-testium/testium")

後、やはり同期的なAPIであることやMochaでユニットテストと同じように書けるのが書き心地に影響があって、E2Eテストとユニットテストで脳をスイッチするコストが小さく済むように思えます。

まだ[groupon-testium/testium](https://github.com/groupon-testium/testium "groupon-testium/testium")試したことがある人は少ないと思いますが、E2Eテストがユニットテストと同じぐらい手軽に書けるので試してみるといいかもしれません。
