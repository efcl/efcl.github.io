---
title: "Markdownで書く電子書籍について話してきた #niku_sushi"
author: azu
layout: post
date : 2015-09-27T23:45
category: イベント 
tags:
    - JavaScript
    - sushi

---

[#niku_sushi](https://twitter.com/search?q=%23niku_sushi "#niku_sushi")で[Markdownで書く電子書籍開発環境](https://azu.github.io//slide/niku_sushi/ebook_development.html "Markdownで書く電子書籍開発環境")について発表してきました。

- [#niku_sushi - Togetterまとめ](http://togetter.com/li/879455 "#niku_sushi - Togetterまとめ")

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">今日のメニュー <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> <a href="http://t.co/S6rnCrunGB">pic.twitter.com/S6rnCrunGB</a></p>&mdash; Jxck (@Jxck_) <a href="https://twitter.com/Jxck_/status/648064989203312641">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

-----

## WebRTC - kyo_ago

- WebRTCでは大人数に同時に対応できているサービスは殆どない
- 大抵は8人-12人以下というところになっている
- 人数が多くなると安定したものが難しい

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">名もなき馬刺し <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> <a href="http://t.co/7Q6FiIeYMF">pic.twitter.com/7Q6FiIeYMF</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/648063083357671424">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- WebRTCはパテントの世界
- コーデックもパテントの問題

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">馬刺しユッケ <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> <a href="http://t.co/ZROlo8YVMB">pic.twitter.com/ZROlo8YVMB</a></p>&mdash; Jxck (@Jxck_) <a href="https://twitter.com/Jxck_/status/648065460781494272">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- MSEdgeがORTCの実装とかを最近頑張ってる
- [Microsoft Edge to natively support Skype voice and video calls by the end of this year - Microsoft News](http://microsoft-news.com/microsoft-edge-to-natively-support-skype-voice-and-video-calls-by-the-end-of-this-year/ "Microsoft Edge to natively support Skype voice and video calls by the end of this year - Microsoft News")
- MSEdgeのバージョンがわかりにくい
- Build 10547みたいのじゃなくて、メニューからちゃんとEdge 12という形式のバージョンが確認できる
- [Microsoft Edge のバージョンを確認する - Windows ヘルプ -](http://windows.microsoft.com/ja-jp/windows-10/find-out-which-version-of-microsoft-edge-you-have "Microsoft Edge のバージョンを確認する - Windows ヘルプ -")
- 最近のES6対応状況は MSEdge > Firefox > WebKit > Chrome という感じ
- [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/ "ECMAScript 6 compatibility table")
- だけど、MSEdgeはブラウザとしての使い勝手がまだ悪い


<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">名もなき高級生ハム <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> <a href="http://t.co/Meo3GmktgA">pic.twitter.com/Meo3GmktgA</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/648075403588820992">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## [Markdownで書く電子書籍開発環境](https://azu.github.io//slide/niku_sushi/ebook_development.html "Markdownで書く電子書籍開発環境") - azu

[Markdownで書く電子書籍開発環境](https://azu.github.io//slide/niku_sushi/ebook_development.html "Markdownで書く電子書籍開発環境")という話をした。

[GitBook](https://www.gitbook.com/)とMarkdownで電子書籍を書いて、[textlint](https://github.com/azu/textlint "textlint")や[ESLint](http://eslint.org/ "ESLint")などを使って文章やコードのチェックをしながら技術書を書く環境について。

文章は人により解釈が変わりやすいので、根拠を残しやすくするためのIssue/Pull Request駆動についてなどの話をしました。

追記: [今すぐ電子書籍(技術書)を書き始める方法と文章の自動チェック | Web Scratch](https://efcl.info/2015/09/28/easy-to-create-ebook/ "今すぐ電子書籍(技術書)を書き始める方法と文章の自動チェック | Web Scratch")にもう少し詳しい話を書きました。

<blockquote class="twitter-tweet" lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> <a href="http://t.co/d68CjaRdj1">pic.twitter.com/d68CjaRdj1</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/648076139743711232">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- 技術書を書く話
- 雑誌で連載する話

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">「みんなmd2inaoの各言語版作ろうとして我にかえる」 <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a></p>&mdash; 求道者 (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/648080305522257920">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- 編集者はもっと著者に口出しするべきかという話
- 編集者が直接修正をPull Requestを送る例
- 著者が自由なフォーマットで書いて、編集者が組版向けに直すのは二度手間
- 細かい表記の揺れなどを編集者に投げっぱなしにしてしまう問題
- もっとLintとかそういうので自動化できる部分があるのでは
- 出版社は秘伝の表記揺れ辞書とかもっと公開していくといいのでは
- https://gist.github.com/inao/7dd71a7063ea6b75da1b
- 技術書を書くことが慈善事業になってしまう懸念

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">すき焼き <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> <a href="http://t.co/SNBkdKZ5Wd">pic.twitter.com/SNBkdKZ5Wd</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/648086440782336000">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- 書籍を書きながらウェブで公開スタイルを日本では見かけないのはなぜ?
- 反応を見ながら書けたほうがいいのではないかという話

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">気持ち野菜 <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> <a href="http://t.co/PyY4DTWP4C">pic.twitter.com/PyY4DTWP4C</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/648089901334953984">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## [ORTC SVC SimulCast](http://www.slideshare.net/Jxck/ortc-svc-simulcast "ORTC SVC SimulCast") - jxck

- ORTCとサイマルキャスト
- ORTC ≒ WebRTC 1.0 + SimulCast + MultiStream interop 
- ORTCは低レベルなのでWebRTCはORTCで実装できる。
- サイマルキャストとは、それぞれの端末に向けて最適な解像度、ビットレートな動画をおくること
- サイマルキャストをするのにそれぞれ再エンコードするのは無駄
- SVC(scalable video coding)の登場

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">サイマルキャストは端末に最適な解像度で送りつけることができる仕様。&#10;WebRTCはビットレートを調整してから送るのが必要だったから再エンコードが必要になってた。&#10;SVCというスケーラブルな動画のエンコードの仕様があってこれでエンコードしたものをサイマルする <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/648092094775492608">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- SVC(scalable video coding)はbase layerとenhancement layerというレイヤー構造
- ベースレイヤーが届けばとりあえず見られる
- 端末ごとにenhancement layerを送ることで、ビットレートが高くなったりというような調整ができる
- 再エンコードするものがいらなくなる

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">低スペックにはベースのレイヤーだけを配信する。配信するときにルーティングがどれくらいのレイヤーを送るかを決める。&#10;基本的にはルーティングがいるのでP2Pじゃないケースが多い <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/648093013504212992">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- WebRTCにサイマルキャストを1.0に入れたいという話
- 実装が欲しいのでブラウザベンダー大忙し

### ORTCについて

- [ORTC が切り開く SVC サイマルキャストと WebRTC NV - Block Rockin’ Codes](http://jxck.hatenablog.com/entry/ortc-to-webrtcnv "ORTC が切り開く SVC サイマルキャストと WebRTC NV - Block Rockin’ Codes")
- ORTC の Low Level API セット
- WebRTCでは`RTCPeerConnection`が一つの塊だった
- ORTCではそれをスタック毎に分けたクラスにして組み合わせて使うようにするという形
- オプションパラメータで細かい調整ができるのでSVC Simulcastのようなことができる

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">焼き待ちみさとちゃん <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> <a href="http://t.co/Nhr2niIGkN">pic.twitter.com/Nhr2niIGkN</a></p>&mdash; Jxck (@Jxck_) <a href="https://twitter.com/Jxck_/status/648098102839148545">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- ORTCレベルになると迂闊に手をだすと死ぬ

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">みさとちゃん完成 <a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> <a href="http://t.co/xBAM0KUnhJ">pic.twitter.com/xBAM0KUnhJ</a></p>&mdash; Jxck (@Jxck_) <a href="https://twitter.com/Jxck_/status/648099830422634496">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## CSSだけでカヌーセルできるようになった話 - CTO

- [CSS Scroll snap points](http://caniuse.com/#feat=css-snappoints "CSS Scroll snap points")がiOS9、Safariで実装された
- CSSだけでカヌーセルスクロールができる
- 対応してない場合はただsのスクロールになる
- Firefoxは実装済みでMSが仕様書いているので、残りはChromeのみ

## Node Conf EUに行った話 - 会長

- Node Conf EUに行った話
- ドバイ
- [thlorenz/visulator](https://github.com/thlorenz/visulator "thlorenz/visulator")
- IoTについての話がやたら多かった
- エンタープライズでもNodeが増えた。
- IBM
- エンタープライズ分野でもJavaScriptがないと舞台に立てない感じなってきた。
- Mad Scienceの人がNode Conf EUには多かった。
- Node.jsで普通のウェブアプリを作ってる人が少ない印象

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> どの業界もIoTがバズってるので、NodeとかJavaScriptにそれがやってきた結果なのではという話</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/648110064973144065">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Safari 9のContent Blockerの仕組み について - 副本部長

- Content Blockerの仕組み
- 実装してみてものすごく簡単につくれることが分かった
- [[iOS9]広告ブロック(Content Blocking Safari Extensions)の作り方 - Qiita](http://qiita.com/noir/items/599b7b8032a18c1e00a7 "[iOS9]広告ブロック(Content Blocking Safari Extensions)の作り方 - Qiita")
- Content BlockerはiOSから呼ばれるあるメソッドでJSONファイルを返すだけしか指定できない。
- なのでロジック的なものはContent Blockerにはなくて静的に決定される
- Safariの動作に対して動的な処理はない
- JSONはDFAとなりバイトコードとして処理される
- 拡張アプリからユーザーの行動履歴は辿れないようになってる。
- 今どこにいて、そこから出るリクエストをブロックする という組み合わせは今のところ表現できない

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/niku_sushi?src=hash">#niku_sushi</a> 意外と影響は少ないとは思うが、それが可視化されない。&#10;広告論とかじゃなくてパフォーマンスの問題で導入されたんじゃないかという話。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/648118310886752257">September 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- プライバシーや広告倫理とかではなくて、単純に遅くなるのを解決するためにいれたのでは
- document.writeが廃止されていれば、広告が`document.write`を使わなくなって、このContent Blockerは違う形になったのでは?
- http://jser.info/2014/11/02/jser200/


## [npmで成果物をsemantic-release :rocket:](https://azu.github.io//slide/niku_sushi/npm-semantic-release.html "npmで成果物をsemantic-release :rocket:")  - azu

- 辞書などのリソースをnpmで配布する方法についての話

## おわり

ごちそうさまでした
