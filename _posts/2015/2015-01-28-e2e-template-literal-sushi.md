---
title: "e2e_sushiとtemplate_literal_sushiでPageObjectパターンの話をした"
author: azu
layout: post
date : 2015-01-28T03:21
category: イベント
tags:
    - イベント
    - JavaScript
    - E2E
    - Testing
    - ES6

---

vivaldi_sushiとe2e_sushiと隣でやってた`template_literal_sushi`に[参加した](https://twitter.com/search?f=realtime&q=%23template_literal_sushi%20OR%20%23e2e_sushi%20&src=typd "#template_literal_sushi OR #e2e_sushi - Twitter Search")

- [#template_literal_sushi と #e2e_sushi のログ - Togetterまとめ](http://togetter.com/li/775431 "#template_literal_sushi と #e2e_sushi のログ - Togetterまとめ")
- ログはいつもどおり記憶だよりで色々間違ってる気がするので気になるところは本人に聞こう

## [Vivaldi_sushi](https://vivaldi.com/ "Vivaldi - A new browser for our friends")

- [Vivaldi](https://vivaldi.com/ "Vivaldi - A new browser for our friends")の話 付く前に終わってた


## Testium - azu

自分は[TestiumとPageObjectパターンの話](http://azu.github.io/slide/e2e_sushi/testium.html "Testium")をしました。

- Testiumって何？
- 同期的なWebDriver API
- PageObjectパターン

という感じの内容です。

Testium関係で色々報告したりPR送ったりしたので、自分が気になるところは大体直った感じがします。
後は[groupon-testium/webdriver-http-sync](https://github.com/groupon-testium/webdriver-http-sync "groupon-testium/webdriver-http-sync")のAPIが順次実装されていけば、他のIntegrationテストフレームワークと同等の機能になる気がします。

- [Implement Element.prototype.getElement(s) by azu · Pull Request #22 · groupon-testium/webdriver-http-sync](https://github.com/groupon-testium/webdriver-http-sync/pull/22)
- [doesn't deal with multibyte unicode characters · Issue #124 · groupon-testium/testium](https://github.com/groupon-testium/testium/issues/124)
- [create example repo(s) · Issue #126 · groupon-testium/testium](https://github.com/groupon-testium/testium/issues/126)
- [Add Element.prototype.getElement(s) tests by azu · Pull Request #129 · groupon-testium/testium](https://github.com/groupon-testium/testium/pull/129)
- [Update Alerts in API.md by azu · Pull Request #125 · groupon-testium/testium](https://github.com/groupon-testium/testium/pull/125)
- [fix example of .testiumrc in README by azu · Pull Request #123 · groupon-testium/testium](https://github.com/groupon-testium/testium/pull/123)


-----

## [Selenium + Sinon.js // Speaker Deck](https://speakerdeck.com/hokaccha/selenium-plus-sinon-dot-js) - hokaccha

- E2Eテスト時にSinon.jsでstubしてしまう話


余談

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/e2e_sushi?src=hash">#e2e_sushi</a> <a href="https://twitter.com/teppeis">@teppeis</a> さんのテスト分類講座を聞いてる</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560044553177018368">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

そもそも **E2Eテスト** or **Integrationテスト** or **UIテスト** or **受け入れテスト** ??

- **UIテスト**という単語は使うべきではない
	- UX的なコンテキストのUIテスト(QA的な話)
	- Seleniumを使ったUIのテストが混じってしまう
	- 事例: [今夜、Webアプリの正しいUIテストの方法が決定されます : ATND](https://atnd.org/events/51156 "今夜、Webアプリの正しいUIテストの方法が決定されます : ATND")
- E2Eテスト
	- 本来はAPI先のサーバ等も含めてEnd to Endなテストをすること
	- Protractorあたりが使い始めてフロントエンドのコンテキストだと若干意味が曖昧
	- 例えば、HTMLをローカルサーバで表示してテストするのもE2Eなのか?(別にサーバのAPIを叩くわけじゃない)
	- UI Automation的なテストの事をいったりしてる
	- E2EがIntegrationを含むこともある
- Integrationテスト
	- システム同士が上手くつながってるのかをテストする
	- ある境界を含めたテスト
- 受け入れテスト
	- 要求条件を満たすかどうかのテスト
	- 他のやつとはレイヤーが違う感じだけど、
	- 要求条件がE2E的なことなら、他のテストを含んでいることがあってやっぱり曖昧
- 新しい用語が欲しい感じがする
	- 字面的に日本語だと受け入れてテストとか統合テストか何かアレな感じがする…
	- ツールが◯◯ test frameworkって名乗るのが難しい感じがする
	

本来は

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/e2e_sushi?src=hash">#e2e_sushi</a> 「サーバがあることをテストしたいからE2Eテスト」</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560043083169931266">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


## [E2Eテストの独立性 // Speaker Deck](https://speakerdeck.com/hokaccha/e2etesutofalsedu-li-xing)

- E2Eテストのテストケースの初期化コストは高い
- しかし、前後のテストに依存してると管理が大変
- それぞれのテストケース毎にデータベースとかも初期化する
- => Seleniumのテストとかに膨大な時間がかかる一因
- みなさんどうしてるか?
	- テストケースレベルで毎回初期化してる :+1: *2 
	- [ハイパフォーマンスSeleniumテスト＠サイボウズ](http://www.slideshare.net/miyajan/kintone-selenium "ハイパフォーマンスSeleniumテスト＠サイボウズ")

JavaScriptを実行した結果をE2Eテストする

- JavaScriptを実行した結果が上手く行ったのかをテスト
- 副作用を検証する使い方など


-----

## Node.jsとio.js - yosuke_furukawa

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/template_literal_sushi?src=hash">#template_literal_sushi</a> iojs会長の node.js + io.jsの話</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560047881466302465">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- io.jsのEventEmitterに`off`を加えるissueを立てた話
	- [events: Alias EventEmitter.protoype.removeListener as EventEmitter.prototype.off by yosuke-furukawa · Pull Request #540 · iojs/io.js](https://github.com/iojs/io.js/pull/540 "events: Alias EventEmitter.protoype.removeListener as EventEmitter.prototype.off by yosuke-furukawa · Pull Request #540 · iojs/io.js")

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/template_literal_sushi?src=hash">#template_literal_sushi</a> onの対義語がoffじゃないだろという-1意見</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560048431981268992">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## template literal と io.js

- `util.format` が遅いのでtemplate literalにしたい
	- [template literal vs string plus · jsPerf](http://jsperf.com/template-literal-vs-string-plus/2 "template literal vs string plus · jsPerf")
- io.js & Node.jsはClosure Linterを使ってる
- Closure Linterがtemplate literalをサポートしてないのでテストが落ちる話

-----


## ReactStyle - kyo_ago

- ReactStyleについて
- [js-next/react-style](https://github.com/js-next/react-style "js-next/react-style")

```js
var styles = ReactStyle`
  color: red;
  background-color: white;
`
```

という感じでTemplate literalとあわせて書ける

-----

## Closure Templateは何をやってるのか? セキュリティ編 - teppeis

> Need Slide


最近Mavenになった[google/closure-templates](https://github.com/google/closure-templates "google/closure-templates")。

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/template_literal_sushi?src=hash">#template_literal_sushi</a> 脱Ant!！祝Maven化！</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560055475094306816">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


- [Closure Templatesのオートエスケープが最強すぎる件 - teppeis blog](http://teppeis.hatenablog.com/entry/20120318/1332092081 "Closure Templatesのオートエスケープが最強すぎる件 - teppeis blog")の続き
- 今は[Strict Autoescaping](https://developers.google.com/closure/templates/docs/security "Strict Autoescaping")というものが作られてる
- Contextual Autoescapingの発展形

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/template_literal_sushi?src=hash">#template_literal_sushi</a> テンプレートをパース -&gt; コンテキスト別にエスケープする関数でラップしたものを組み立てる。&#10;(正しくないHTMLなどは投げ捨てられる)&#10;Contextual Autoscaping&#10;&#10;=&gt; Strict Autoescaping🆕</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560057238094508032">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/template_literal_sushi?src=hash">#template_literal_sushi</a> Strict AutoescapingはContextual Autoscapingの上に型付文字列を追加した機能</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560057507993759745">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----


## クライアントサイドでAPIモック - jxck

- [localStorageをmockにしてjsonengineのクライアントを開発する - Block Rockin’ Codes](http://jxck.hatenablog.com/entry/20100825/1282691415 "localStorageをmockにしてjsonengineのクライアントを開発する - Block Rockin’ Codes")
- -> [CouchDBをmockにしてAPI駆動開発(仮) - Block Rockin’ Codes](http://jxck.hatenablog.com/entry/20100615/1276605753 "CouchDBをmockにしてAPI駆動開発(仮) - Block Rockin’ Codes")
- -> [ServiceWorker を使った XHR のモックテスト - Block Rockin’ Codes](http://jxck.hatenablog.com/entry/response-injection "ServiceWorker を使った XHR のモックテスト - Block Rockin’ Codes") (イマココ)

### Fetch API polyfill - jxck

- [github/fetch](https://github.com/github/fetch "github/fetch") は Isomorphic じゃない
- Fetch APIはXHRのラッパではなくて、本来はXHRをFetch APIで実現できる機能(低レイヤー)
- HTML5 ConfでもExtensible Webの低レイヤーの話が話題になった
- 低レイヤーのAPIが来ることで本当は何が嬉しいのかという話
- [Fetch API 解説、または Web において &#34;Fetch する&#34; とは何か？ - Block Rockin’ Codes](http://jxck.hatenablog.com/entry/whatwg-fetch "Fetch API 解説、または Web において &#34;Fetch する&#34; とは何か？ - Block Rockin’ Codes")
- Fetch APIのアルゴリズムはPure JavaScriptで実装できるもの
- [Jxck/fetch](https://github.com/Jxck/fetch "Jxck/fetch")
- Fetch APIが実装できれば、Nodeにも本物のXHRが実装できるはず

Fetch API polyfillに必要なものの話

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/e2e_sushi?src=hash">#e2e_sushi</a> FetchAPIは`URL`に依存してるので、まずは`URL`のpolyfillを作るところから始まった</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560062865734782977">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL "URL")が必要
	- [Jxck/URL](https://github.com/Jxck/URL "Jxck/URL")
- [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams "URLSearchParams")が必要
	- [Jxck/URLSearchParams](https://github.com/Jxck/URLSearchParams "Jxck/URLSearchParams")
	- [FormData は multipart/form-data で application/x-www-form-urlencoded は URLSearchParams - Qiita](http://qiita.com/Jxck_/items/769766853a90b7b435b0 "FormData は multipart/form-data で application/x-www-form-urlencoded は URLSearchParams - Qiita")
- URLエンコードするのに、TextEncoder & TextDecoderが必要
	- TextDecoderは色々な文字コードがある(大変)
	- UTF-8以外はLegacy扱い -> UTF-8を前提にしておく
	- [Jxck/utf8-encoding](https://github.com/Jxck/utf8-encoding "Jxck/utf8-encoding")

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/template_literal_sushi?src=hash">#template_literal_sushi</a> 文字コードは闇ですね</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560067022587838464">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

## その他

- Open Socialの話
	- Social要素はいらないけどウィジェットは欲しかったり、逆もあった
	- 誰も触らなくなってしまった
	- iGoogleで使えたのは良かった

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/e2e_sushi?src=hash">#e2e_sushi</a> open socialはsocialとウィジェットが悪魔合体した仕様</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560069054103171073">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- phantomjsを直でつかってますか?
	- **スクレイピング用途**ならWebDriver API経由でやった方が、乗り換えが効いて安全

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/e2e_sushi?src=hash">#e2e_sushi</a> $ phantomjs script.jsみたいな使い方する人はもういない。&#10;(WebDriver API経由とかで使ったほうが他に乗り換えできるので安全)</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/560071344813899777">January 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

お疲れ様でした。次は [#crosushi](http://2015.cross-party.com/ "CROSS 2015 | エンジニアサポート CROSS 2015")とのこと
