---
title: "ブラウザでビジュアルテストをするreftest-runnerを作った"
author: azu
layout: post
date : 2015-05-14T09:02
category: JavaScript 
tags:
    - Testing
    - Browser
    - JavaScript
    - Node.js

---

## 概要

[reftest-runner][]というブラウザで描画内容やレイアウトといった表示結果をテストするためのライブラリを作りました。

要素技術としてはブラウザ、WebDriver API、レンダリングキャプチャ、画像Diffという感じです。

- [azu/reftest-runner](https://github.com/azu/reftest-runner "azu/reftest-runner")

### 時間が無い人向け

以下のスライドに簡単に[reftest-runner][]やreftestとはなにか、どういうユースケースがあるのかが書いてあります。

- [reftest-runner-overview.pdf](https://github.com/azu/reftest-runner/tree/master/docs "reftest-runner-overview.pdf")

## reftestとは

reftest(Referrence Test)とは、2つのHTMLの表示結果(スクリーンショット)を比較することで表示結果が意図したものかをテストする方法です。

用意するHTMLとして以下の2種類を1セットとして用意して利用します。

- テスト用HTML
	- テストしたい機能を使って実装したHTML
- リファレンス用HTML
	- テスト用HTMLとは別の機能で実装したHTML

この2つのHTMLをブラウザで表示し、スクリーンショットを取って画像として比較することで、2つのHTMLの表示が一致する OR 一致しないことを自動的にテストするためのツールが今回作った[reftest-runner][]です。

![ref-test](https://cdn.rawgit.com/azu/reftest-runner/master/docs/reftest-runner-overview-image.png)

詳しくは以下でも書かれていますが、FirefoxやWebkit、Chormeといったブラウザで使われていて、こういうのをもっと普通のウェブ開発レベルでも使いたくなったのでこれをインスパイアしています(完全に一致というわけでもないかも…)

- [リファレンステストの書き方 by nakajmg](http://slides.com/nakajmg/reftest#/ "リファレンステストの書き方 by nakajmg")
- [Writing Reftests | Test the Web Forward](http://testthewebforward.org/docs/reftests.html)
- [Creating reftest-based unit tests | MDN](https://developer.mozilla.org/en-US/docs/Creating_reftest-based_unit_tests)
- [w3c/csswg-test](https://github.com/w3c/csswg-test "w3c/csswg-test")

reftestは、画像のキャプチャを保存しておいて比較するのと違って、HTMLがテストファイルとなっています。
そのため、reftest向けに作ったHTMLは自動テストだけじゃなくて、普通にHTMLを開いて目視のテストや機能のデバッグなどにも使えるので多少面倒ですが意外と使い道があったりします。

また画像自体を保存して画像比較するテストは管理が大変なので、reftestのような形式のほうが柔軟性がある感じです。

> 画像比較ベースのテストは変化に弱く保守が大変なので、 一年ほど前に Reftests と呼ばれる新しいタイプのテストがサポートされた
> -- [炭坑の庭師 - steps to phantasien](http://steps.dodgson.org/b/2012/05/20/gardening-with-canaries/ "炭坑の庭師 - steps to phantasien")

## reftest-runnerのできること

- HTMLの描画結果の比較テスト
	- いわゆるreftestができます
	- 非同期テストも対応しています
- クロスブラウザの描画比較テスト
	- 通常は同じブラウザ同士で別HTMLの表示比較をしますが、同じHTMLを別ブラウザで表示比較が可能
	- WebDriverサポートしてるブラウザ - IE、Firefox、Chrome、Safari、Opera、PhantomJSなどで動作します
- 比較結果のDiff画像を生成
- テスト結果をTAP形式で出力
- テスト用のローカルサーバを立てる
- `reftest.list` という形式でテスト対象を記述
[reftest-runner][]はrunnerという名前になってて一応コマンドラインツールとしても動かせますが、本質的にはNodeモジュールとして使えるような作りになっています

Diff画像とは以下の様なテスト対象とリファレンスのキャプチャ画像を比較して差分を出す画像で、[yahoo/blink-diff](https://github.com/yahoo/blink-diff "yahoo/blink-diff")を使っています。

![diff](http://efcl.info/wp-content/uploads/2015/05/2015_05_13__08-54-18-canvas-left.html-vs-canvas-right.html2.png)

この画像の差が一定のしきい値(delta、設定可能)を超えると一致してないと判定されます。

表示結果さえあれば何でもテストできるので、テストが難しいCanvas APIのテスト等もできます。

---

## インストール

```
npm install reftest-runner -g
```

でインストールできます。インストールすると`reftest-runner`というコマンドが追加されます。

## 動かし方

リポジトリにサンプルが入ってるので、このreftestを動かしてみたいと思います。

- [reftest-runner/example at master · azu/reftest-runner](https://github.com/azu/reftest-runner/tree/master/example "reftest-runner/example at master · azu/reftest-runner")

先ほどでてきて`reftest.list`というテキストファイルに、比較するHTMLと比較演算子(== or !=)を並べるのが簡単な使い方です。

サンプルの`reftest.list`では以下のようになっています。

```
# implementation is difference, but visual is the same
== ./equal/smile-canvas.html ./equal/smile-img.html
# ◀ != ▶
!= ./non-equal/canvas-left.html ./non-equal/canvas-right.html
# async test support
== ./async/reftest-async-xhr.html ./async/reftest-sync.html
```

例えば、

```
== ./equal/smile-canvas.html ./equal/smile-img.html
```

は`./equal/smile-canvas.html`と `./equal/smile-img.html`の描画結果が一致することを期待する ということを示しています。

この作成した`reftest.list`をCLIで以下のように指定すれば、reftestが実行できます。

```
$ reftest-runner --list path/to/reftest.list
```

もちろん、`reftest.list`なしでもできて、以下のようにテスト用ファイルとリファレンスファイルをそれぞれ指定することでも実行できます。

```
$ reftest-runner --browser "firefox" --targetA path/to/fileA.html --targetB path/to/fileB.html
```

`--browser`で実行ブラウザも指定できて、IE/Firefox/Chrome/phantomjs/iPhone/Andoirdのような[Selenium WebDriver](http://docs.seleniumhq.org/ "Selenium WebDriver")があるものをサポートしてます。
([SeleniumHQ/selenium](https://github.com/SeleniumHQ/selenium "SeleniumHQ/selenium") に依存してます)

実行すると、`logs`ディレクトリにスクリーンショットのdiff画像が生成されます。

### 実行してる動画

<iframe width="420" height="315" src="https://www.youtube.com/embed/9BFdxZI381A" frameborder="0" allowfullscreen></iframe>

### 非同期のテスト

何か非同期の処理が終わってからその描画テストしたい場合は非同期テストにする必要があります。

[reftest-runner/example/async at master · azu/reftest-runner](https://github.com/azu/reftest-runner/tree/master/example/async "reftest-runner/example/async at master · azu/reftest-runner")に非同期テストのサンプルがあります。

対象のHTMLで`html`のクラス属性に`reftest-wait`が含まれている場合、このHTMLは非同期テストの対象として認識します。

```
<html class="reftest-wait">
```

非同期処理が終わったらこのクラスを削除したら、reftest-runnerは描画完了したと判断してその時点の描画内容を比較に使用します。

```
// html classの中身を空にする = 非同期処理完了
document.documentElement.className = "";
```

これは既存のブラウザが使ってるreftestツールがこういう形式を取っていたのでそれに合わせた形です。

## reftestの使いドコロ

### リグレッションテスト

典型的な使いドコロとしてはリグレッションテストがあると思います。

あるUIライブラリの構造を多く変更しようとした時にAPIのインターフェースも変わる場合ユニットテストだと、やりにくいケースが出てきます。
そこで、以前のバージョンを使って書いたUIをリファレンスとして、作りなおしたライブラリで同じUIが再現できているかをチェックするという使い方ができます。

### Canvasのテスト

Canvasは描画されている内容がピクセルでしか取れないので、ある描画上手くできてるのかのテストが難しいです。

[Canvasの描画内容とimgタグでの画像の表示を比較したり](https://github.com/azu/reftest-runner/tree/master/example/equal)することでテストが出来ます。

Canvasのライブラリを書いている場合は、そのライブラリを使って書いたものをテスト対象として、素のCanvas APIで書いたリファレンス対象として用意して比較したりできます。

### クロスブラウザの表示一致テスト

[reftest-runner][]はモジュールとして使えば、FirefoxとChromeで同じHTMLの表示結果を比較できるので、ブラウザの差を吸収しているライブラリがほぼ同じ表示になるかのチェックできます。

- [reftest-runner/example.js at master · azu/reftest-runner](https://github.com/azu/reftest-runner/blob/master/example/example.js "reftest-runner/example.js at master · azu/reftest-runner")
	 - `reftestPhantomJSAndFirefox()`ではPhantomJSとFirefoxで比較しています
	 - 背景色が透明と白色などブラウザではデフォルトでの差異が多いのでどこまで使えるか微妙ですが

`blinkDiff`の`delta`オプションでどれくらいの差を許容するかを決定できます。

```js
var ReftestEngine = require("reftest-runner").Engine;
var testEngine = new ReftestEngine({
    server: {
        port: 8989
    },
    rootDir: __dirname,
    blinkDiff: {
        delta: 20 // どのくらいの差を許容するか
    }
});
```

## おわりに

[reftest-runner][] はこういうことができたらもっといろんな角度からテストできるのではと思って、既存のものを組み合わせて作った感じです。

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">DOMのテストだと、ある要素がDOMに追加されてるかとかを判定するテストがあるけど、Canvasの場合にある図形や画像がCanvasにレンダリングされてるかをテストすることって出来る? <a href="https://twitter.com/hashtag/CanvasTests?src=hash">#CanvasTests</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/586872208867246080">April 11, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">ReftestsみたいなのWebDriver APIで動かして画像diffを確認できるところまで作った。 <a href="http://t.co/ZpxKN311yH">pic.twitter.com/ZpxKN311yH</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/586916886195019776">April 11, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

実際にCanvasライブラリを書き直す時に、互換性を検証するための自動テストに組み込んで使ってみた感じ、テストファイルがただのHTMLであるというのがかなり有用だと思いました。

- [Self-Describing Tests](http://testthewebforward.org/docs/test-style-guidelines.html#self-describing-tests "Self-Describing Tests")
	- Test Runnerに依存しないで、ファイル単体で実行できるテスト

そのテスト用HTMLは別にテストのためだけではなく、ある機能を使って動かすサンプルコードともなるので、妙な動きをした場合はそのHTMLを開いてデバッガで確認するという単純なことができるのがいい気がします。
テストファイルのテストが簡単にできるというのはユニットテストとは少し違う所なのかもしれません。

[reftest-runner][] はrunnerとなっていますがNodeモジュールとして使った方ができることは多くて、実際APIの方を意識して実装しています。(CLIは単純なことしかできない)

そのため[mocha integrate](https://github.com/azu/reftest-runner/issues/7 "mocha integrate · Issue #7 · azu/reftest-runner")ができたりするともっと使いやすくなったりすんじゃないかと思うので、何かあったら[Issues · azu/reftest-runner](https://github.com/azu/reftest-runner/issues "Issues · azu/reftest-runner")へお願いします。

[reftest-runner]: https://github.com/azu/reftest-runner  "azu/reftest-runner"

