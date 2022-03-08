---
title: "#child_process_sushi でJavaScriptアーキテクチャについて話してきた"
author: azu
layout: post
date : 2016-04-27T23:40
category: イベント
tags:
    - JavaScript
    - イベント
    - Angular
    - Almin

---

[#child_process_sushi](https://twitter.com/search?f=tweets&vertical=default&q=%20%23child_process_sushi "#child_process_sushi")で最近やってたJavaScriptの設計の話をしてきた。

- [Almin.js | JavaScriptアーキテクチャ](https://azu.github.io//slide/2016/child_process_sushi/almin-javascript-architecture.html "Almin.js | JavaScriptアーキテクチャ")

Fluxとかで上半分は皆やるようになったけど、ドメインモデルとかFluxの場合にビジネスロジックとかをどこに書くとかはまだ未成熟な気がしているので、そのパターンを考えてて[Almin.js](https://github.com/almin/almin "Almin.js")というのを書いたという話をした。

Almin自体は大した実装ではないので、サンプルとかドキュメントとしてパターンについて学べるものを書いていきたいイメージ。(このアーキテクチャ話自体は、色々な言語で繰り返しやっては言語が廃れて、パターンがちょっと違う形で残るというのを繰り返している by @t_wada)

![almin](https://azu.github.io/slide/2016/child_process_sushi/img/almin-architecture-flux.png)

JavaScriptでもウェブアプリやElectronでのアプリのような、APIを叩いて表示して終わりじゃなくて、ドメインモデルの生存期間が長いものが増えてきているのでその辺を考えていこうという話でした。

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr">🍣 <a href="https://twitter.com/hashtag/child_process_sushi?src=hash">#child_process_sushi</a> <a href="https://t.co/CSuqQoDrWj">pic.twitter.com/CSuqQoDrWj</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/725281910373511172">April 27, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

ログ

- [#child_process_sushi - Togetterまとめ](http://togetter.com/li/968216 "#child_process_sushi - Togetterまとめ")

## PathでのXSS - kyo_ago

> [明日から使える?! PATHでXSSする技術/ Shibuya.XSS techtalk #7 // Speaker Deck](https://speakerdeck.com/masatokinugawa/shibuya-dot-xss-techtalk-number-7 "明日から使える?! PATHでXSSする技術/ Shibuya.XSS techtalk #7 // Speaker Deck")

の話

- 外部からIEのドキュメントモードを落として表示できるという話
- iframe以外でIEのドキュメントモードをダウングレードする方法があったらすごい

## Angular2でニッチなやつ - 83

- Upgrading from 1.x
- 実際にこれをやってる話
- Angular 1から2に上げていくパターン
- 2にあげたものが1のコンポーネントを使うことができる
	- 実際にやると死ぬので大変
- npmとして名前が違うので2と1は両方パッケージとして入る
- upgrade adaptorというものがあり、これからBootStrapをよぶ必要がある
- Angular 1
	- Service
		- いろんな機能を持ってる
	- Directive
		- コンポーネント
- Angular 2
	- コンポーネントの方は移行完了した
- 進捗80%で止まりそうな要因はuirouterの移行。
- 1.xで動いてるrouterなので、2.xに移行するときのボトルネックになる
	- 1.x -> 2.x -- 2.xのルーターの世界になる

-----

# 広告の話 - Jxck

- HTTP2はRFCが出た
- 実装 から 使う話になってきた
- 現状の問題
	- AD問題
	- TLSの問題
	- ロードバランスの話
- ADの問題
	- [ディスプレイ広告の基礎とセキュリティ // Speaker Deck](https://speakerdeck.com/suzuken/deisupureiguang-gao-falseji-chu-tosekiyuritei "ディスプレイ広告の基礎とセキュリティ // Speaker Deck")
	- mixed contentの問題
	- たまに　HTTP で出してくる
	- コレがおきる業界図
	- 広告主 -> メディア
	- iframeの入れ子の問題
	- 一番外はHTTPSは保証
	- 中の広告がmixed contentになってることが多い
	- mixed contentをreportする方法がない
	- 中の広告まで全部制御できてないと全部HTTPSにならない
	- https://hacks.mozilla.org/2015/09/subresource-integrity-in-firefox-43/
	- CORSが必要
	- 入れ子になった中のドメインの内容も推測出来てしまうので、CORSが必要
		- 仕様的にはそっちは許可されてない
- 次回はCAの話

-----

# [Almin.js | JavaScriptアーキテクチャ](https://azu.github.io//slide/2016/child_process_sushi/almin-javascript-architecture.html "Almin.js | JavaScriptアーキテクチャ") - azu


- Fluxとかで上半分は皆できるようになったけどドメインモデルについてはまだ未成熟

![almin](https://azu.github.io/slide/2016/child_process_sushi/img/almin-architecture-flux.png)

- [Almin.js](https://github.com/almin/almin "Almin.js")はその辺を考える土台とパターンとサンプルを用意するプロジェクト
	- 実装自体はFluxと大体同じ
	- DDDとかその辺をちゃんと実装してオープンソースで読めるものがまだ少ない(JavaScriptだと特に)
- 考えて設計して、考えるコードを書く状況をクライアントサイドJavaScriptでも作っていきたい
- アーキテクチャは毒
	- この話も何週目 - 世界は繰り返す
- フロントエンド/クライアントサイドでは、バックエンド/サーバサイドよりもオブジェクトの生存期間が長い
	- Gmailのメモリリークの話
	- クライアントサイドではモデルの生存する時間が数日単位とかある
- この辺の知見はC#がやっぱり多い(クライアントサイドであるため)
- 言語は死んでもパターンは残るのがパターンは強い
- JavaScriptの影響を受けてiOS/Androidでも似たような話がでてたり面白い。
- Repositoryと言ってた部分はrelayとかが代わりになったり(サーバサイドとの透過的な扱い)しそう
- 初期化時にRepositoryとか全部のシングルトンを集めたものを作ってそれを扱うフレームワーク的にすれば、依存関係とかは常に逆になるので気にしなくてよくなりそう
	- Alminはフレームワークにはしたくなかったのでアプリ側でLocatorとかで似たような事を書いてたり


-----


# Node.js v6 - 会長

- [eater // Speaker Deck](https://speakerdeck.com/yosuke_furukawa/eater "eater // Speaker Deck")
- テスト = プロセス分離
- mockを始末しなくてもプロセスが死んだら死ぬ
- テストの時にmockの解放忘れでテストが落ちるのが死ぬ
- Async/Syncが混ざって
- node test.js で動く
- TJ氏
	- https://github.com/visionmedia/expresso
	- ファイルシステムとかテスト間で依存してるやつがいると死ぬ
	- RSpecとかみたいのは並列で実行するために、データベースとかも
- ブラウザ
- eater
	- モック前提
	- 基本は1ファイル1モック
	- サブテスト
- deprecatedメッセージでもテスト落ちる
- Node.jsにはログの共通インターフェースがない問題
- 「immutableとか言ってるそうやったらmockできなくなるんじゃないの」

## testのassertをASTで数えるのやつ - teppis

- [おまえは今まで実行したassertの回数を覚えているのか？あるいは新しいアサーションユーティリティのご提案 - teppeis blog](http://teppeis.hatenablog.com/entry/2014/12/esplan-new-testing-utility-counting-assertoins-statically "おまえは今まで実行したassertの回数を覚えているのか？あるいは新しいアサーションユーティリティのご提案 - teppeis blog")
	- 変換しないと意味が分からないコードを書くのはなんか違うのでは
- [JFrog - Artifactory NPM Support](https://www.jfrog.com/video/artifactory-npm-support/ "JFrog - Artifactory NPM Support")
	- 月 98$ で SaaS
	- Mavenとかのホスティングとかいろんなパッケージのホステイングできる
	- npmのregistryとして登録するProxyとして
- 社内のキャッシュになかったらpublicへ
	- npmの別registryの登録方法
	- scoped moduleでregistryの名前空間を分けるといい

## ビルド職人を減らしたいという話 -- vvakame

> スライド: [ビルド職人.md](https://gist.github.com/vvakame/45ca8f051e54702071eb88bb1dd8b46e "ビルド職人.md")

- 設定を共有したい
- [rocjs/roc: Modern Application Development Ecosystem](https://github.com/rocjs/roc "rocjs/roc: Modern Application Development Ecosystem")

-----


## InterSectionObserver -- koba04

- [WICG/IntersectionObserver: API Sketch for Intersection Observers](https://github.com/WICG/IntersectionObserver "WICG/IntersectionObserver: API Sketch for Intersection Observers")
- 画面から離れたら発火するイベント
- 下まで来たら再読み込みする
- 今のFirefoxは同期のスクロール処理は警告でるので、似たような事をする
- [Scroll-linked effects - Mozilla | MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects "Scroll-linked effects - Mozilla | MDN")

## 最近の辛いこと - t_wada

- `deepStrictEqual` がブラウザでは動かない
- commmonjs assertはdeepEqualまでしかない
- [sindresorhus/core-assert: Node.js `assert` as a standalone module](https://github.com/sindresorhus/core-assert "sindresorhus/core-assert: Node.js `assert` as a standalone module")
- 暗礁に乗り上げた `assert.deepStrictEqual`
- ES6時代に対応したdeepEqualが必要
- 無限Iteratorとかどうするの?
- ESLintでキャキャやってるのすごいね
- npm3+dedupe+依存モジュールのバージョン違い競合(estraverseとか?)+Browserifyの辛い話
	- ESLintとpower-assertでdudupeの問題が起こることもある
	- バージョン違いが存在するとネストしてインストールされる
	- ネストしてインストールされたモジュールをBrowserifyに食べさせるとなぜか絶対パスがビルドファイル内にでてくる、2つ分のファイルが読み込まれたり、dedupeできなかった問題がおきる
	- 後ろ向きな理由でJSHintを使ってる話


-----

## バッチ処理の依存関係定義が辛い - joker1007

- 簡単なものだったらRakeでもいいけど
- 複雑になるとRubyでジョブフローを上手くやるものがない
	- オープンソースのいいものがない(Ruby)
	- rukawa
	- [Ruby製のシンプルなワークフローエンジンRukawaの紹介 - Qiita](http://qiita.com/joker1007/items/02b334d1cca76fadaf2c "Ruby製のシンプルなワークフローエンジンRukawaの紹介 - Qiita")
- Ruby製のワークフローエンジンを作った


----

Child Processおめでとうございます。
