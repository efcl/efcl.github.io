---
title: "#jxck_sushi でserverlessの話をしてきた"
author: azu
layout: post
date : 2016-10-18T23:08
category: イベント
tags:
    - JavaScript
    - sushi

---

[#jxck_sushi](http://togetter.com/li/1038372 "#jxck_sushi - Togetterまとめ")に参加してきた。

- [meta-sushi/guideline: Sushiイベントのガイドライン](https://github.com/meta-sushi/guideline "meta-sushi/guideline: Sushiイベントのガイドライン")
- [#jxck_sushi - Togetterまとめ](http://togetter.com/li/1038372 "#jxck_sushi - Togetterまとめ")

2回目の`#jxck_sushi`だった。

- [CROSS 2015 アウトラインメモ | Web Scratch](http://efcl.info/2015/01/30/cross-2015/ "CROSS 2015 アウトラインメモ | Web Scratch")

今回は[Serverlessを使った匿名でGitHub Issueを立てるAPIを作った](http://azu.github.io/slide/2016/jxck_sushi/serverless.html "Serverlessを使った匿名でGitHub Issueを立てるAPIを作った")という話をしてきた。

[jser/ping: ping! your issus](https://github.com/jser/ping "jser/ping: ping! your issus")を作ったときに必要だったのAPI Gatewayとlambdaを使ってAPIとして作った話。

------

## Walter

> TODO: スライドはここに

- FirebaseとIndexedDBの話


<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a> 🍣 <a href="https://t.co/YcLaJR6dK2">pic.twitter.com/YcLaJR6dK2</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/788335553611640832">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">CQRS寿司 <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a> <a href="https://t.co/K9tWo8xGl6">pic.twitter.com/K9tWo8xGl6</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/788335724680523777">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">これからの Web について真剣に議論している <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a> <a href="https://t.co/WQxTaieQng">pic.twitter.com/WQxTaieQng</a></p>&mdash; Jxck (@Jxck_) <a href="https://twitter.com/Jxck_/status/788336179221401600">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a> による🍣 <a href="https://t.co/PMNoJa8gRn">pic.twitter.com/PMNoJa8gRn</a></p>&mdash; Laco (@laco0416) <a href="https://twitter.com/laco0416/status/788336275472265216">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">次世代のアーキテクチャについて真剣に議論している <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a> <a href="https://t.co/GPuAQFX2u1">pic.twitter.com/GPuAQFX2u1</a></p>&mdash; 83 (@armorik83) <a href="https://twitter.com/armorik83/status/788336294304768000">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

内容は :sushi: 

## Serverless FrameworkでのAPI作成
> スライド: [Serverlessを使った匿名でGitHub Issueを立てるAPIを作った](http://azu.github.io/slide/2016/jxck_sushi/serverless.html "Serverlessを使った匿名でGitHub Issueを立てるAPIを作った")

- [jser/ping: ping! your issus](https://github.com/jser/ping "jser/ping: ping! your issus")
- API Gatewayとlambdaを使ってブラウザから叩けるAPIを作る話
- CORSの設定とかも[Serverless Framework](https://github.com/serverless/serverless "Serverless Framework")から設定ファイルだけで簡潔して便利だった
- lambdaのテストについて
- handlerのスクリプトをローカルで実行できるようにするしか…
- ApexやServerlessは実際にlambdaを叩くCLIがある
- `console.log`を細かく仕込んでCloudWatchで見るとか
- AWSのサービスと連携した場合が結構たいへん

## Web Component v1
> スライド: [webcomponents v1 libraries by laco](http://slides.com/laco/webcomponents-v1-libs#/ "webcomponents v1 libraries by laco")

- Custom Element v1などがでた
- ライブラリ
- [Polymer 2.0](https://www.polymer-project.org/2.0/docs/about_20 "Polymer 2.0")
- [SkateJS](http://skate.js.org/ "SkateJS")
- が対応してる
- Custom Element v1はクラス継承に対応してる
- Polymer 2.0は継承路線
- SkateJSはWebComponentとJSXとincrementJSに対応してたり、タグ定義は独自関数
	- 自前でpolyfillを持っている

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">らこ「Polymerはbower」<br>一同「bowerか〜〜」 <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a></p>&mdash; 83 (@armorik83) <a href="https://twitter.com/armorik83/status/788341086901022720">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- HTML Imports
- PolymerはHTML Import頑張りたい姿勢
- SkateJSはHTML Importを捨てている。モジュールの仕組み
- Firefox: [Mozilla and Web Components: Update ★ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2014/12/mozilla-and-web-components/ "Mozilla and Web Components: Update ★ Mozilla Hacks – the Web developer blog")
	- Loaderで似たようなことができるかもしれないのに、別途HTML Importやるのが微妙という姿勢

### AMP

- 社内フレームワークとしてのAMP
- 社内フレームワークとしてのWeb Components
- よくJavaScriptとかしらない人が `<TPLogin />` とかでログイン画面を作れるとか
- AMPのいいところは imageのwidthを指定しないとバリデーションで落ちる
- バリデーション通らないとSEO不利なのに皆対応するという強制力
- そういった強制力をWeb Componentsで出せる?
	- JSXのpropTypesみたいな?
	- 今のところ仕組みはなさそう

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「俺が書いたHTMLのほうがAMPより早い」 <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/788343509182918657">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Web Components 銀の弾丸

- CSSにとってはやっぱり銀の(ry
- CSSのスコープ
- けどCSSはレイアウトをするために外から差し込める口が必要
	- テーマ機能とか
	- CSSむずかしい
- v1ではopenとclose modeとなった
	- CSS Custom PropertyをI/F的に使えるのは同じ
	- [僕がネイティブな CSS 変数にわくわくする理由](http://terkel.github.io/why-im-excited-about-native-css-variables/ "僕がネイティブな CSS 変数にわくわくする理由")
	- closeは外からさせない
	- openは外からさせる
	- コンポーネントを作るときに確定する仕組みになった

## それCSSでできるよ

- 可変長のリストの話

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「Webの技術の中で一番難しいのがCSS」 <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a></p>&mdash; 83 (@armorik83) <a href="https://twitter.com/armorik83/status/788348248188555264">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## セマンティックス

- `<img src="jxck.png">` を見てどう思うか
	- `alt`
	- `title`
- `alt`を付けるのはスクリーンリーダのためだけではないという話

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「セマンティックスはPull型であるべきだ」 <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/788349959179427840">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- `title`属性の使い道は現在のUAだとツールチップぐらい
- セマンティックスが先にあって、それを消費する形が正しい姿
- 今title属性を消費するクライアントがないからという理由で、titleを省略していくという考えは変なの正しくはないのではという話

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">HTMLとして正しいじゃなくて、ウェブとして正しいかという話になってしまう。<br>なのでやや抽象的で、どこから見た視点なのかという話になる<br> <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/788351935640285184">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- HTMLの仕様ではMUSTが正しいとは言えるけど、それ以外はどう見たら正しいのかという指標が難しい
- 正しさを正しいと評価するツールが欲しいのは分かる

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">仕様上のMUSTだと結構範囲は狭い、ユースケースまで行くとある程度の正しい形は書かれてる <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/788353505144602624">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- HTTP
- getでdeleteするな話
- Google Botsがクロールして全部getして消える話
- Google Botsのために"getでdelete"を避けるじゃない


## Node Interactive Europe

- [Node Interactive Europe 2016 に参加しました。 - from scratch](http://yosuke-furukawa.hatenablog.com/entry/2016/09/30/123942 "Node Interactive Europe 2016 に参加しました。 - from scratch")
- Node.js 今互換性を気にしすぎで少し停滞してる
- またio.js?
- Node.jsの競合がでるのが正しい競争の形
- Web標準も色々やっていきたい in Node.js

## prh

- [prhのWEB+DB PRESS校正ルール最新版を作成した話 - Qiita](http://qiita.com/vvakame/private/5cbb2bf9b6de5899006b "prhのWEB+DB PRESS校正ルール最新版を作成した話 - Qiita")
- WEB+DBの`prh.yml`最新版情報
- 別でprh.ymlをまとめたリポジトリ
- [azu/prh.yml: A collection of prh.yml](https://github.com/azu/prh.yml "azu/prh.yml: A collection of prh.yml")

## preflight

- WHATWG module loaderでCORS強制する?
- TODO: この辺に議論されてるURLが入る

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「タイミングのpreflightが届いてなかった」 <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/788361447558426625">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Angular1と2

- Angular2は半年に1度メジャーを上げる予定?
- Angular1と2で落差がある
- 信頼を取り戻すのに Angular 4ぐらいまでかかりそう
- 1を管理画面などの業務系に使っていた人たちが多い
- Truly覚悟が必要

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">Angular 2は別のネームスペースの1.0にしなかったから今後一生「Angular 2」って呼ばれそう <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a></p>&mdash; 83 (@armorik83) <a href="https://twitter.com/armorik83/status/788367243264471042">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## おわり

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ありがとうございました！ <a href="https://twitter.com/hashtag/jxck_sushi?src=hash">#jxck_sushi</a> <a href="https://t.co/qf3Durm9wa">pic.twitter.com/qf3Durm9wa</a></p>&mdash; Jxck (@Jxck_) <a href="https://twitter.com/Jxck_/status/788372247043899392">October 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>