---
title: "#teppeis_sushi に参加した"
author: azu
layout: post
date : 2016-07-14T23:07
category: イベント
tags:
    - JavaScript
    - sushi

---

[#teppeis_sushi](https://twitter.com/search?q=%23teppeis_sushi&src=typd "#teppeis_sushi")に参加した。

- [#teppeis_sushi - Togetterまとめ](http://togetter.com/li/1000035 "#teppeis_sushi - Togetterまとめ")

## Karma 1.0について @ kyo_ago

- Karma 1.0について
- [karma/CHANGELOG.md at v1.0.0 · karma-runner/karma](https://github.com/karma-runner/karma/blob/v1.0.0/CHANGELOG.md "karma/CHANGELOG.md at v1.0.0 · karma-runner/karma")
- [Buster.JS](http://docs.busterjs.org/en/latest/ "Buster.JS")の[testbed](http://azu.github.io/slide/Kamakura/busterJS.html#slide22 "testbed")みたいな機能
- 実際の環境を読み込ませたうえでテストファイルを読み込ませてテストできる
- E2Eテストみたいなものを簡単に書ける
- さらにmiddlewareで[proxy](https://github.com/karma-runner/karma/blob/master/lib/middleware/proxy.js "proxy")を扱える
- テストしてる内容はメソッド叩いたら要素がでるとか
- 技術的な側面でE2Eテストな感じ

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> E2Eテストは技術とユーザー的な側面とか色々ある</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/753542849296146432">July 14, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Proxy

- コミットごとのビルドをS3にアップロードし、本番環境で読み込むChrome拡張Proxy
- 拡張を入れれば開発中の内容が見られる

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> 本番環境の上でハックして開発するスタイル</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/753544008811421697">July 14, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> 謎のやつ <a href="https://t.co/PuKx1Qe9Dm">pic.twitter.com/PuKx1Qe9Dm</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/753546274012434433">July 14, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## PCブラウザから使われるウェブアプリケーションで独自ズームの実装 - yoshiko

スライド: [3分で独自ズーム](http://yoshiko-pg.github.io/slides/20160714-sushijs/)

- wheelイベントでやってるサービスがあった
- DOM3で標準化されてる
- [UI Events](https://w3c.github.io/uievents/#events-wheelevents "UI Events")
- `event.deltaY`でピンチインの量を取れる
- :sushi: デモ

### passive event

- Passive Eventはイベントハンドラ内で`preventDefault()`が呼ばれないという状態を前提にしたもの
- `preventDefault()`が呼ばれると描画がとまってしまうため
- 呼ばれないことを前提とすればパフォーマンス最適化できる
- 現在のデフォルトは呼ばれる事を前提とした形になって動く
- [Passive Event Listeners によるスクロールの改善 | blog.jxck.io](https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html "Passive Event Listeners によるスクロールの改善 | blog.jxck.io")
- ピンチインも`preventDefault()`を呼び出してる
- こういう特殊なユースケースにはまだ対応できていない


## Cancellableの現在 - jxck

- [Cancelable promises - Google スライド](https://docs.google.com/presentation/d/1V4vmC54gJkwAss1nfEt9ywc-QOVOfleRxD5qtpMpc8U/edit#slide=id.gc6f9e470d_0_0)
- [domenic/cancelable-promise: Cancelable promises proposal for JavaScript](https://github.com/domenic/cancelable-promise)
- [zenparsing/es-cancel-token: Cancel Tokens for ECMAScript](https://github.com/zenparsing/es-cancel-token)
- fetchとかはPromise使うけど未だにキャンセルできない
- progressはstreamでひとまずかいけつ
- Cancellableの提案は2つでている
- cancel用のresolvedでもrejectedでもない第三の状態を作る方向
	- `cancel()` 
	- [domenic/cancelable-promise: Cancelable promises proposal for JavaScript](https://github.com/domenic/cancelable-promise)
- C#系のToken方式
	- [zenparsing/es-cancel-token: Cancel Tokens for ECMAScript](https://github.com/zenparsing/es-cancel-token)
- 決着と議論はこれから
- まだfetchをXHRの代わりに使うのは早いのでは
- Promiseの話はasync/awaitを前提として話が多い
- finallyとかまだ決まってないものも議論に流れる
	- [ljharb/proposal-promise-finally: ECMAScript Proposal, specs, and reference implementation for Promise.prototype.finally](https://github.com/ljharb/proposal-promise-finally "ljharb/proposal-promise-finally: ECMAScript Proposal, specs, and reference implementation for Promise.prototype.finally")

## JavaScriptにpanicが欲しい - 会長

- [Node.js における Promise を使った例外処理 - from scratch](http://yosuke-furukawa.hatenablog.com/entry/2016/07/12/103734 "Node.js における Promise を使った例外処理 - from scratch")
- Promiseを使えばとりあえずキャッチする場所ができた
- でも必ずキャッチされるから落とすのが面倒
- キャッチしてそれの理由付きで落とすpanicが欲しいという話

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> 肉 <a href="https://t.co/22EM5D5H63">pic.twitter.com/22EM5D5H63</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/753553912519536640">July 14, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">これからの Web について真剣に議論している<a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> <a href="https://t.co/RsH7CW56M0">pic.twitter.com/RsH7CW56M0</a></p>&mdash; Jxck (@Jxck_) <a href="https://twitter.com/Jxck_/status/753556576070275072">July 14, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## 最近のtextlint - azu

スライド: [最近のtextlint !](http://azu.github.io/slide/2016/honbucho/textlint.html "最近のtextlint !")

最近のtextlintに入れた変更点の話

- filter rule
- [AST explorer for textlint](https://textlint.github.io/astexplorer/ "AST explorer for textlint")
- [textlint-ja/textlint-rule-preset-ja-technical-writing: 技術文書向けのtextlintルールプリセット](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing)
- [textlint-ja/textlint-rule-spacing: スペース周りのスタイルを扱うtextlintルール集](https://github.com/textlint-ja/textlint-rule-spacing)
- [textlint-ja/textlint-ja: textlintの日本語コミュニティ](https://github.com/textlint-ja/textlint-ja)


## move power-assert to tool - t_wada

- power-assert 2.0をだそうをだろうしてる。
- nodeのassert互換 - 透過的なassertにしようとしてる
- 一個だけnodeに追加してるassertがあるのでbreaking change
- [power-assert + babel as a development tool | Web Scratch](https://efcl.info/2016/04/14/espower-babel-is-deprecated/ "power-assert + babel as a development tool | Web Scratch")
- power-assertをツールにするということ
- 今はbabelのpresetのみになってる
- 他のASTツールでも動くようにする目標
- Babelは一度のtraverseで変換
- これを他のASTツールでもやる
- [merge-estraverse-visitors](https://www.npmjs.com/package/merge-estraverse-visitors "merge-estraverse-visitors")

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「ASTの世界が一歩先に： <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/753565073788907520">July 14, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## [axios](https://github.com/mzabriskie/axios "axios")の話 - axross

- エラーハンドリングの話

## ES modulesはHTTP/2で部分更新の夢を見るか? - 本部長

- 最終的にはconcatに勝つ夢
- [ES6 ModulesはHTTP/2によってconcat無しで使えるようになるのか - teppeis blog](http://teppeis.hatenablog.com/entry/2015/05/es6-modules-and-http2 "ES6 ModulesはHTTP/2によってconcat無しで使えるようになるのか - teppeis blog")
- の続き
- Cache Aware Server Push
- HTTP/2 Server Pushで個別に304できない話
- それは策定の段階で通り過ぎた話


## 流し

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「和田だけど質問ある？」 <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/753573209220407296">July 14, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## 研修

- 学習はトップダウンから or ボトムアップから どっちから
- あまりに広すぎるのでトップダウンから始めたほうがいいのでは
- ボトムアップからやるとRFCを読むところで終わってしまうことがあるかも


## [DefinitelyTyped](https://github.com/DefinitelyTyped/ "DefinitelyTyped")の話 - vvakame

- 最近MSの人が入ってガンガン開発してる
- [The Future of Declaration Files | TypeScript](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/ "The Future of Declaration Files | TypeScript")
- d.tsのバージョンニングの話


-----

[本部長](http://group.cybozu.jp/news/16063001.html)おめでとうございます。
