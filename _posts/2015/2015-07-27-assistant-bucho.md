---
title: "#副本部長_sushi で描画、音、文章など色々なテストの話をした"
author: azu
layout: post
date : 2015-07-27T23:05
category: イベント
tags:
    - イベント
    - testing
    - JavaScript

---


`#副本部長_sushi` という:sushi:イベントをしたのでそれのログです。

- [#副本部長_sushi - Togetterまとめ](http://togetter.com/li/853203 "#副本部長_sushi - Togetterまとめ")

-----


<div class="kwout" style="text-align: center;"><a href="http://azu.github.io/slide/assistant-bucho/test-everything.html"><img src="http://kwout.com/cutout/c/eg/rb/qs2_bor.jpg" alt="http://azu.github.io/slide/assistant-bucho/test-everything.html" title="ロジック、E2E、描画、音、動画、Example、文章 - 色々なJSテスト" width="600" height="294" style="border: none;" /></a><p style="margin-top: 10px; text-align: center;"><a href="http://azu.github.io/slide/assistant-bucho/test-everything.html">ロジック、E2E、描画、音、動画、Example、文章 - 色々なJSテスト</a></p></div>

[ロジック、E2E、描画、音、動画、Example、文章 - 色々なJSテスト](http://azu.github.io/slide/assistant-bucho/test-everything.html "ロジック、E2E、描画、音、動画、Example、文章 - 色々なJSテスト")というタイトルで発表してきました。
タイトル通り、最近やったようなテスト事例をひたすら書いてる感じです。

自分の中で結構気に入ってるのがNodeライブラリなどをexampleテスト(勝手に付けた)をするというパターン。

- exampleというディレクトリを作って
- ライブラリを`npm i -S ../`でローカルモジュールとしてインストール
- example.jsなどとしてサンプルコードを書く
- 実際に動かして正常終了する

というのをテストするパターンです。

スモークテストかとかそういうたぐいのもので、テストが書きにくいものでも不安感を解消できたり、package.jsonの間違いなどに気づいたり、実際に動くサンプルコードが出来上がるという副産物もあります。

実際にブラウザを動かして確認するテストは今なら結構[selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver "selenium-webdriver")などを使って書けるようになってきてるので、その辺は工夫でどうにかなるパターンも多いのではないかと思います。

とりあえずCIで動かすようにしてみようというのがはじめの第一歩としていいような気がしています。


-----


<div class="kwout" style="text-align: center;"><a href="http://azu.github.io/slide/assistant-bucho/visual-tc39-process.html"><img src="http://kwout.com/cutout/u/vi/pa/z8p_bor.jpg" alt="http://azu.github.io/slide/assistant-bucho/visual-tc39-process.html" title="Visualize TC39 Process" width="600" height="320" style="border: none;" /></a><p style="margin-top: 10px; text-align: center;"><a href="http://azu.github.io/slide/assistant-bucho/visual-tc39-process.html">Visualize TC39 Process</a></p></div>

もう一つ、[Visualize TC39 Process](http://azu.github.io/slide/assistant-bucho/visual-tc39-process.html "Visualize TC39 Process")というのも発表しました。

これは[ES nextの策定プロセスを分かりやすくまとめた記事 · Issue #57 · azu/azu](https://github.com/azu/azu/issues/57 "ES nextの策定プロセスを分かりやすくまとめた記事 · Issue #57 · azu/azu")の調査中に出来た副産物のようなものでおまけ的な感じです。


-----

## Node.js forkについて

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%89%AF%E6%9C%AC%E9%83%A8%E9%95%B7_sushi?src=hash">#副本部長_sushi</a> Node.js forkたち - io.js会長</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/625625514888171520">July 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [zpao/spidernode](https://github.com/zpao/spidernode "zpao/spidernode")
- [JXcore · a Node.JS distribution with additional features](http://jxcore.com/home/ "JXcore · a Node.JS distribution with additional features")
- [Microsoft/node](https://github.com/Microsoft/node "Microsoft/node")
- [JerryScript](http://samsung.github.io/jerryscript/ "JerryScript") + [IoT.js](http://samsung.github.io/iotjs/ "IoT.js")

JerryScript : JavaScriptエンジン
IoT.js : Node.jsみたなフレームワーク

----

## Railsで学ぶウェブセキュリティ

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%89%AF%E6%9C%AC%E9%83%A8%E9%95%B7_sushi?src=hash">#副本部長_sushi</a> Railsで見ていくウェブセキュリティ</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/625628445834260480">July 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>