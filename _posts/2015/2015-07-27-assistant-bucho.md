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

## Node.js forkについて - 会長

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%89%AF%E6%9C%AC%E9%83%A8%E9%95%B7_sushi?src=hash">#副本部長_sushi</a> Node.js forkたち - io.js会長</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/625625514888171520">July 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [zpao/spidernode](https://github.com/zpao/spidernode "zpao/spidernode")
- [JXcore · a Node.JS distribution with additional features](http://jxcore.com/home/ "JXcore · a Node.JS distribution with additional features")
- [Microsoft/node](https://github.com/Microsoft/node "Microsoft/node")
- [JerryScript](http://samsung.github.io/jerryscript/ "JerryScript") + [IoT.js](http://samsung.github.io/iotjs/ "IoT.js")

JerryScript : JavaScriptエンジン
IoT.js : Node.jsみたなフレームワーク

----

## Railsで学ぶウェブセキュリティ - jxck

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%89%AF%E6%9C%AC%E9%83%A8%E9%95%B7_sushi?src=hash">#副本部長_sushi</a> Railsで見ていくウェブセキュリティ</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/625628445834260480">July 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- Railsのデフォルトの設定などから学ぶウェブセキュリティについて

`X-Xss-Protection: 1; mode=block`について

- IE だとデフォルトでXSSフィルタは有効
- だけど、デフォルトの設定ではフィルタした部分を`###`とする
	- これを悪用したようなXSSがある [IE8 XSS Filterの仕様が微妙に変更されていた。 - 葉っぱ日記](http://d.hatena.ne.jp/hasegawayosuke/20101004/p1 "IE8 XSS Filterの仕様が微妙に変更されていた。 - 葉っぱ日記")
- `mode=block`を付けることで、`###`ではなくページを真っ白にする
- 安全に倒すために `X-Xss-Protection: 1; mode=block` としてる


<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%89%AF%E6%9C%AC%E9%83%A8%E9%95%B7_sushi?src=hash">#副本部長_sushi</a> 副本部長によるsecure-handlebarsの話。&#10;yahooのやつ</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/625639009868365825">July 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [Safe JavaScript Templating](http://yahoo.github.io/secure-handlebars/ "Safe JavaScript Templating")
- secure-handlebarsは[Automatic Contextual Escaping](http://yahoo.github.io/secure-handlebars/safejstemplating.html "Automatic Contextual Escaping")を実装してる
- Automatic Contextual Escapingといえば[Closure Templates](https://developers.google.com/closure/templates/?hl=ja "Closure Templates")
- 今はAutomatic Contextual Escapingではなく型によるセキュリティを実現してる
	- [Security   |   Closure Templates   |   Google Developers](https://developers.google.com/closure/templates/docs/security?hl=ja "Security   |   Closure Templates   |   Google Developers")
	- 最近コミット活発化

## TypeScript + core.jsのcompat table

- [core-js and TypeScript - how do these fit together? · Issue #3956 · Microsoft/TypeScript](https://github.com/Microsoft/TypeScript/issues/3956)
- [TypeScript + core.js invalid? · Issue #581 · kangax/compat-table](https://github.com/kangax/compat-table/issues/581)

の問題

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%89%AF%E6%9C%AC%E9%83%A8%E9%95%B7_sushi?src=hash">#副本部長_sushi</a> MSの言い分 型付言語としては、コンパイルが通る + 変換の2段階がある。&#10;TypeScriptとしてはcore.jsのやつも型のコンパイルは通る-&gt; なのでcompat%あげてよ</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/625640863012511744">July 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

## Browserifyとes6 modules

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%89%AF%E6%9C%AC%E9%83%A8%E9%95%B7_sushi?src=hash">#副本部長_sushi</a> 「今後我々はBrowserifyを脱出していくのか」元CTO</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/625644039866454016">July 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

## scala.js - kyo_ago

[Fluxを使ったScalaJSの二層式フロントエンド #jsオジサン](http://0-9.sakura.ne.jp/pub/lt/JSOjisan20150625/two-part-frontend-using-scalajs-and-flux.html "Fluxを使ったScalaJSの二層式フロントエンド #jsオジサン")

- 「サーバサイドの実装が終わってもフロントエンドの実装待ちでリリースできない」を減らしたいのと、DDDでやりたい。
- クライアントサイドとサーバサイドのscalaのコードを共有するのが目的ではない
- フロントエンドとバックエンドの定義は https://speakerdeck.com/koichik/isomorphic-survival-guide この辺
- フロントエンドのフロントエンド と フロントエンドのバックエンド(こっちがscala.js)の二層式的なアーキテクチャ
	- これはReact(Flux)がある程度前提のアーキテクチャ
	- フロントエンドのバックエンドはscala.jsで書けるようなweb workerで動くようなpureなjsの世界
	- フロントエンドのフロントエンド <-> フロントエンドのバックエンド をpostMessageでメッセージでやり取り
	- メッセージパッシングで若干複雑なコードがでてくるかもだけど、実行コスト自体はそこまででもないはず
- こういうアーキテクチャでやることで、サーバを書いてる人がフロントエンドのバックエンドもscala.jsで透過的に書けるように
	- 人材リソースの共有が目的の一つ(not コードシェア)
- 別にscalaでなくてもよくてDDDの環境として、scalaが適当であったのでscala.js
	- (最初はTypeScript予定だったけど、TypeScriptでDDD環境が)


## その他

- 雑誌とかで技術的な記事はスピードが問題になってる。
- 文章に落とす部分がコスト高い -> podcastやインタビューがコンテンツになっていってる?
	- 口伝っぽい

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%89%AF%E6%9C%AC%E9%83%A8%E9%95%B7_sushi?src=hash">#副本部長_sushi</a> 書籍のモデル、サブスクリプションモデル、口伝としてのポッドキャスト</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/625661092061057024">July 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%89%AF%E6%9C%AC%E9%83%A8%E9%95%B7_sushi?src=hash">#副本部長_sushi</a> 技術書のゴーストライターモデル。&#10;原作とイラスト</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/625661755885158400">July 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


----

[副本部長](http://cybozu.co.jp/company/job/recruitment/staff/voice12.html "副本部長")おめでとうございます。