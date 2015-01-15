---
title: "#reactsushiでESLintとtextlintの設計について話してきた"
author: azu
layout: post
date : 2015-01-15T02:03
category: イベント
tags:
    - JavaScript
    - イベント
    - React
    - iojs
    - Node
    - library

---

# [#reactsushi](https://twitter.com/search?q=%23reactsushi "#reactsushi")

[#reactsushi](https://twitter.com/search?q=%23reactsushi "#reactsushi")をしてきたのでそれのメモです。

- [#reactsushi - Togetterまとめ](http://togetter.com/li/770221 "#reactsushi - Togetterまとめ")


<blockquote class="twitter-tweet" lang="en"><p>これが <a href="https://twitter.com/hashtag/reactsushi?src=hash">#reactsushi</a> <a href="http://t.co/PFSYoyp2R5">pic.twitter.com/PFSYoyp2R5</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/555331986605084672">January 14, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

ハイライト

> Truly Isomorphic

-----

## io.js 1.0.0リリース

- io.jsのロゴは何時決まったの?
	- [logo ideas · Issue #37 · iojs/io.js](https://github.com/iojs/io.js/issues/37 "logo ideas · Issue #37 · iojs/io.js")
- `fs.exists()`と`fs.existsSync()`はなぜDeprecatedになったの?
	- [fs: deprecate exists() and existsSync() · 5678595 · iojs/io.js](https://github.com/iojs/io.js/commit/56785958565378c9ba43c5bdf5c631f7738f95ab "fs: deprecate exists() and existsSync() · 5678595 · iojs/io.js")
	- 解決してる問題が少ない
	- Expressが使いまくってる
	- 代わりに`fs.access()`や`fs.stat()`が使える
	- [fs: add access() and accessSync() by cjihrig · Pull Request #8714 · joyent/node](https://github.com/joyent/node/pull/8714 "fs: add access() and accessSync() by cjihrig · Pull Request #8714 · joyent/node")
	- が、Deprecatedから戻った(1.0以降で扱うことに)
	- [fs: undeprecate exists() and existsSync() · 3a85eac · iojs/io.js](https://github.com/iojs/io.js/commit/3a85eac4ec7ff8a1700ddec21e0177d2f60335ea "fs: undeprecate exists() and existsSync() · 3a85eac · iojs/io.js")
- Node.jsの初期のAPI設計の問題?

-----

## [textlintから学んだこと](http://azu.github.io/slide/reactsushi/textlint.html "textlintから学んだこと")

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/reactsushi?src=hash">#reactsushi</a> LT! <a href="http://t.co/2HRAShqJEp">pic.twitter.com/2HRAShqJEp</a></p>&mdash; Toru Kobayashi (@koba04) <a href="https://twitter.com/koba04/status/555328205922369536">January 14, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


- d.tsの管理をどうしているか?
	- モジュール分離しても、共通のインターフェースのオブジェクトを扱いたい
	- その部分を定義した不完全なd.tsを共有したい
	- dtsmを使う? npmを使う? 手動コピー?
	- [TypeScript - dtsmのご紹介 - Qiita](http://qiita.com/vvakame/items/38b953ab0f4de63cce8b "TypeScript - dtsmのご紹介 - Qiita")
- [azu/intelli-espower-loader](https://github.com/azu/intelli-espower-loader "azu/intelli-espower-loader")のdirectories.testについて
	- [Pull Requests · azu/intelli-espower-loader](https://github.com/azu/intelli-espower-loader/pulls "Pull Requests · azu/intelli-espower-loader")

-----

## [React / Flux を実案件で使ってみた](http://twada.herokuapp.com/presentations/reactsushi/reactsushi.html "React / Flux を実案件で使ってみた")

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/reactsushi?src=hash">#reactsushi</a> t-wadaさんの発表 <a href="http://t.co/ELcFiP2VyQ">pic.twitter.com/ELcFiP2VyQ</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/555334629767397376">January 14, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- デザイナーとの分業(JSX)
	- JSXにはHTMLが大体そのままあるのでちょっとクラスを足す程度ならできた
	- ただ微妙にHTMLと違うところもあるので特殊
- 開発者へのReact導入ガイド
	- nodebrew install -> npm install -> npm run
	- 3ステップで始められるようにした
- Virtual DOMの恩恵
	- React(Virtual DOM)が高速化のために使うというのは誤解
	- 構造的なデータをそのまま投げても速度的にもまあまあ大丈夫な大丈夫な設計が可能になった
	- 設計的なプラスのメリットが大きい
	- 速度的にDOM職人が丹精込めて作成したDOMよりもVirtual DOMが早いというのはない
	- DOM職人が必要なのはゲーム等の世界
	- 一般的な所では設計的なメリットが大きいのでは
- Virtual DOMのサーバサイドレンダリング
	- [Render](https://github.com/rendrjs/rendr "Render")は収縮気味
	- [reactjs/react-rails](https://github.com/reactjs/react-rails "reactjs/react-rails")		- Reactが一応公式で管理
		- つよそう
		- [ExecJS](https://github.com/sstephenson/execjs "ExecJS")を使ってReactからHTMLを作る
	- SEOを意識したサイトだとサーバサイドレンダリングが強そう
- sprockets
	- [ES6 by josh · Pull Request #682 · sstephenson/sprockets](https://github.com/sstephenson/sprockets/pull/682 "ES6 by josh · Pull Request #682 · sstephenson/sprockets")
	- 6to5がsprockets 4に入った(今3のβ…)
	- 6to5だとJSXも扱える
	- sprocketsはRailsのバージョンに沿ってる訳ではない
- バリデーションナイト
	- isomorphicの例でよく出てくる
	- サーバのコアに欲しいバリデーションとフロントのバリデーションは少し趣旨が違うのでは?
	- このケースの場合にバリデーションしているのはAPIのモデルという感じになってるいるのでは
	- Javaの実装からJSON Schemaを吐いてバリデーションする話
- Truly Isomorphic
	- View層のみを共有するのが真のisomorphicという訳ではない
	- Truly Isomorphicとは
- ドキュメントの話
	- JSDoc書いてる?
	- IDE使う人程恩恵があるのでJSDocとか書くようになる
	- PhpStormは特にそういう効果があって、プロジェクトの人が皆書くようになった話
- Example
	- ドキュメントのサンプルをどうするかの問題
	- JSDocに@exampleで書くのは冗長
	- golangのexampleテストがかっこいい
	- DocTestのような形式でサンプルもテストになればいいのでは
	- [AmpersandJS/amp](https://github.com/AmpersandJS/amp "AmpersandJS/amp")は`example.js`というものがドキュメントに埋め込まれるようになってる
	- RSpecとかもそういう感じ


<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/reactsushi?src=hash">#reactsushi</a> 会長「truly isomorphic は view だけではない」</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/555342041614258176">January 14, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>



-----

## [#reactsushi 2015 Jan](http://koba04.github.io/slides/reactsushi/#1 "#reactsushi 2015 Jan")

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/reactsushi?src=hash">#reactsushi</a> 基調講演だ <a href="http://t.co/0aAsdIWe5a">pic.twitter.com/0aAsdIWe5a</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/555348582002204672">January 14, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- React 0.13について
- Marionette
	- virtual-domを使う予定
	- [Investigate first class support for virtual DOM · Issue #2126 · marionettejs/backbone.marionette](https://github.com/marionettejs/backbone.marionette/issues/2126 "Investigate first class support for virtual DOM · Issue #2126 · marionettejs/backbone.marionette")
	- [samccone/Marionette.VDOMView](https://github.com/samccone/Marionette.VDOMView "samccone/Marionette.VDOMView")
	- [tiagorg/marionette-vdom](https://github.com/tiagorg/marionette-vdom "tiagorg/marionette-vdom")
- Vue.js
	- [作者さん](https://github.com/yyx990803)さんがMeteorの人になったしどうなるんだろ?
- EmberのFastBoot
	- vdomとは微妙に違うアプロード
	- htmlbars テンプレートをDOM APIで組み立てられるようにする
	- simple-dom
- クライアントサイドMV*ライブラリ
	- データバインディング的なライブラリが一斉にvDOM実装へ移動してる
	- 正しい気がする

-----

## [最近のFlowtype事情とReact+Flowtype連携](https://gist.github.com/teppeis/a48558a71a98d6bee6c9 "最近のFlowtype事情とReact+Flowtype連携")

- 最近は大きな変化はリリースされてない
- 現時点ではReact+Flowは制限が色々あり現実的ではない
- [Prop Validation](http://facebook.github.io/react/docs/reusable-components.html "Prop Validation")は便利
- propTypesのチェックツールとして使える

## [Break the Web: Object static methods no longer throw errors for primitives!](https://gist.github.com/teppeis/c50743a60832560aa1df "Break the Web: Object static methods no longer throw errors for primitives!")

- `Object.keys`等の仕様ES6では変更された
	- プリミティブ値ではエラーを投げなくなった
	- [4.1 Object.freeze](https://github.com/rwaldron/tc39-notes/blob/c61f48cea5f2339a1ec65ca89827c8cff170779b/es6/2013-05/may-21.md#41-objectfreeze "4.1 Object.freeze")
	- [4.8 Consider if Object.assign should silently ignore null/undefined sources](https://github.com/rwaldron/tc39-notes/blob/46d2396e02fd73121b5985d5a0fafbcdbf9c9072/es6/2014-07/jul-29.md#48-consider-if-objectassign-should-silently-ignore-nullundefined-sources "4.8 Consider if Object.assign should silently ignore null/undefined sources")
	- 何で仕様変わったんだろ
- polyfill
	- `Object.keys`のpolyfillとした場合ES5とES6で挙動違うはず
	- [Financial-Times/polyfill-service](https://github.com/Financial-Times/polyfill-service "Financial-Times/polyfill-service")もES5のpolyfillになってる
- compat tableおじさんのお仕事
	- `assert`ライブラリ郡がこの挙動に依存してたのを修正
- ^あわせて [Introducing Break the Web: Array extra methods case // Speaker Deck](https://speakerdeck.com/constellation/introducing-break-the-web-array-extra-methods-case "Introducing Break the Web: Array extra methods case // Speaker Deck")
- ES6 moduleをサポートしてるかを判定する方法はあるのか?

学び

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/reactsushi?src=hash">#reactsushi</a> 「ちゃんと書いても壊れる」</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/555357619682938880">January 14, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

-----

[一人React.js Advent Calendar 2014 - Qiita](http://qiita.com/advent-calendar/2014/reactjs "一人React.js Advent Calendar 2014 - Qiita")完走おめでとうございます。

お疲れ様でした。


