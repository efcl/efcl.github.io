---
title: "JSer.info 5周年記念イベント アウトラインメモ"
author: azu
layout: post
date : 2016-01-17T16:42
category: イベント
tags:
    - JavaScript
    - JSer
    - イベント

---

[JSer.info 5周年記念イベント](http://jser.connpass.com/event/24202/ "JSer.info 5周年記念イベント")を開催&参加してきたのでメモ。

スライドとかの概要は以下にも書いてあります。

- [JSer.info 5周年記念イベントを開催しました - JSer.info](http://jser.info/2016/01/16/jser-5years/)
- [JSer.info 5周年記念イベント - Togetterまとめ](http://togetter.com/li/926573)

以下メモ書きです。

## [JSer.info 5周年](http://azu.github.io/slide/2016/jser5years/jser.info.html "JSer.info 5周年") - @azu_re

5年間での総計は以下のような感じになりました。

- 投稿記事数: 261
- 毎週1回投稿: (261*7) / 365 ≒ 5(年)
- 合計紹介URL数: 6312


## [JavaScript情報って何だっけ?](http://azu.github.io/slide/2016/jser5years/javascript-information.html) - @azu_re

そもそもなんでJavaScriptについて知りたいのという話。
後で別記事書くかも

## [Angularの5年とこれから](https://speakerdeck.com/armorik83/angularfalse5nian-tokorekara "Angularの5年とこれから") - @armorik83

- Angularも変化が大きい
- フロントエンドの歴史とバインディングの歴史
- Ajax + jQueryを始めとすると技術
- Backbone.js MV*architectureの提案
- AngularJS双方向データバインディング
	- DI
	- 双方向データバインディング
- AngularJSの弱点の顕在化
	- 冗長なDirty Checkingが問題視される
	- React 仮想DOM
- Angular beta 0リリース
	- `@input`、`@output`というAPI
	- Component間のデータ、イベントバンディングを整合化
	- 下から来た情報をバブリングじゃなくて`output`という属性にいれて
- TypeScript前提、
	- 型情報、型アノテーション
- Change Detection
	- [Angular2のChange Detectionについて - Qiita](http://qiita.com/laco0416/items/78edd53f5da8ead02e75 "Angular2のChange Detectionについて - Qiita")
- `ngAnimate`
	- 引き続きサポート
	- スコープをコンポーネント内に限定出来る`Style`
- AngularJSの互換性
	- ngUpdate
		- プロセスの名前
		- Misko Hveryによるもの
	- 1.xのなかで2を使う方法
- Offline Compiled Template
	- 独特なHTMLで表記できるAngular
- Angular Universal
	- ブラウザとNode.jsの両方で動くJS
	- サーバサイドレンダリングをDOMRendererとServerDOMRendererの切り替えで出来る
	- SEO対応とかも
- Web Workers
	- Angular 2のほぼ全てのコードをWeb Workers上で実行する仕組み
- AngularDart
	- Dartの資産
	- Angular 2のマイクロタスクキュー Zone.js
	- TypeScriptで利用可能になった Decorators構文
- 情報源
	- [Angular2 Info](http://ng2-info.github.io/ "Angular2 Info")
- Angular 1のメンテンス期間
	- みんなが使わなくなるまでメンテする


## [WebIDLを見てみる](http://www.slideshare.net/takenspc/webidl "WebIDLを見てみる")  - @Takenspc

- ブラウザに実装されてるWeb IDLを見てみる
- ブラウザで使えるAPI: 沢山ある
	- 新たなAPIが生まれる
	- 途中でAPIが変わる
- 実際に使えるAPIは何なのか、知りたい

```js
const url = new URL("...");
for (const param of url.searchParams) {
	console.log(param[0], param[1])
}
```

- ブラウザの実装とドキュメントが分離されてる
	- 別々にメンテナンスされてる
- 自分が欲しいと思っている粒度なのか頻度は別になってる
- ブラウザの実装ってだけが書いているのか?
	- 誰かが何かを元に書いている
- 各種ブラウザはWebIDLからインタフェースを機械生成している
- WebIDLがブラウザと仕様を結ぶもの。
- ブラウザと仕様での共通言語の1つ
	- 共通言語なので比較が出来る
- WebIDLを比較して見てみるという話
- FirefoxでChromeでIDLの使い方が違う
- WebIDLを比較するには
	- 継承や`[`　Extended attributes `]` をなどがある
	- これらを正規化する必要がある
- まとめ
	- WebIDLはしようとブラウザーの共通言語の1つ

## [IE8枠] ぼくたちの愛したIE8 - @hasegawayosuke

- XSSでalert出すためにJavaScriptを覚えた
- IE8のすごい機能
- XSSフィルター
	- リクエストとレスポンスを比較 スクリプトがあったら実行を阻止
	- 保守的なのに大胆な機能
	- XSSフィルターを使ってXSS
- XDomainRequest
	- クロスオリジンで使えるXHRモドキ
- toStaticHTML
	- いい感じに安全なHTMLにしてくれる
	- HTMLメールとかMarkdownなどで使える
	- 細かい指定ができない
	- 他のブラウザでは簡単な代替方法がない
		- DOMPurifyなど
		- HTML5 iframe sandbox
	- 標準化もされていないのであんまり使われない
- X-Content-Type-Options
	- Content-Typeに従うようになる
	- 普通の挙動
- X-Frame-Options
	- クリックジャッキングへの対応


## [IE8枠] [Active scripting](http://www.slideshare.net/djraven/active-scripting "Active scripting") - @makoto_kato

- IE4-8のアーキテクチャ
	- COM API
	- Browser Helper Object(BHO) API for ブラウザ拡張
	- プラガブルなプロトコル
- Active Scription
	- COM I/Fバインディングエンジン
	- For Engine API
	- For Host API - サードパーティでも使える
	- IE3-8
	- WSH
	- IIS
	- Office
- バックエンドも色々
	- MS
		- JScript
		- VBScript
	- 3Party
		- Ruby
		- Python
		- Perl
		- PHP
		- etc..
	- サードパーティアプリでIEのセキュリティホールを作れる
- COM Interfaces
	- IE IDispatchEx

## 非同期イベントがんばるぞい - @saneyuki_s

- イベント
	- Data
	- Domain
	- File I/O
	- Net work I/O
	- 等色々イベントがある
- イベントの依存関係の管理が面倒問題
- FRP
- 何でイベントを待ち受けられないの?
- Duality
	- PullとPush型
- イベントは何で`Observable<T>`にするのか
	- 一回しか来ないイベント
	- 複数回来るイベント
- Promiseは基本的に1回のイベント(使い捨て)
- 複数回のイベントに対応するためにObservableという考え方の話
- FRPとは?
	- FRPとRxは別の動物であるという話
	- 似たような仕組みだけど違うもの
- Jafar Husain
	- .NetのものをJSにもってきた
- イベント文字列を機械的に考えられるようになった
	- パースしてASTで処理出来るようなイベントの流れ
	- イベントのgotoみたいなものじゃなくてもっと宣言的な流れ

----

- How abstract RPC call
	- イベントをRPCのようなものだと考える
- RPCのコンセプト
	- Address どこへ
	- Protocol どうやって
	- Data type どういう値を渡して、どういう値を返すか
- 根本的な哲学は再利用が可能である
	- ABC(Address & Protocol & Data typeと同じ)
- これはFlux
	- ActionとDispatcherと似た感じ
	- Actionはイベントをオブジェクトとして名前を付けた感じ

----

## React on 現場 - @mizchi

- あるいはModern JavaScript on Rails

モダンJSとは

1. npm/Browserify
2. Babel/ES2015
3. React/Fux
4. Testable
5. No more jQuery plugins

という構成

- 使われてないものを捨てるのは簡単
- でも使われてると書き換えないと行けないので辛い

何か良くしてくれ - 方針

- 再利用できるものと再利用出来るものを分ける
- エディタの書き換えへの挑戦
	- コード量が多い
	- Kobitoとかやってたのでノウハウ活かせるかも
- 破綻
	- 分量
	- ドメイン知識が色々必要
- 教訓
	- 仕様を理解してないものはコード書けない
	- モジュールの境界面が明示されてないものは分解できない
- ゴールの設定
	- 新規モジュールを負債を引き継ぐことなく受け入れられる環境
	- Turbolinksが導入可能な初期化フロー
		- Turbolinkは初期化フローの制御ができてないと行けない
- やったこと
	- npmに依存ライブラリを集約
		- ライブラリごとに異なるCDNを参照
		- オーバーヘッドが大きい
		- どのライブラリを使ってるか分からない
	- npmとbowerでライブラリの依存を解決
		- npmを優先的に使う
	- Browserify導入
		- Sprocketsを捨てる
		- Rails上のデファクトモジュールシステム
	- Sprocketsの問題
		- ファイルスコープで返り値を持てない
		- Nodeで動かない
		- RubyとJSの問題切り分けられない
		- JavaScriptのエコシステムに乗れない
		- Sprocketsで動くJS系のgemメンテされない
	- 書き換える
		- 分量が多い
		- 平行して開発している機能が沢山あってコンフリクトする
		- スクリプトを書いて一発
		- 全てのモジュールをCommonJS形式に書き換えた
	- Browserifyによって変わったこと
		- 依存がそれぞれのファイルで完結した状態になる
		- 単体テスト可能な閉じた参照の提供
		- 名前空間の初期化順に左右されない
	- gulp
		- browserify-rails
			- 中ではbrowserify-incrementalを使ってる
	- Babel
		- Babelのロード時間が長い
		- プロセスを毎回立てると、毎回読み込みが起きてしまう
	- テスト
		- `require.cache`
	- React化
		- Qiitaのヘッダー
		- Fluxの選定が面倒だったのでベタ書き
		- [redux への 不満を解消する為に, flumptというFlux実装を作った - Qiita](http://qiita.com/mizchi/items/79673c4d406cc85b44aa "redux への 不満を解消する為に, flumptというFlux実装を作った - Qiita")
		- FluxはアプリケーションRootを管理するものが多いので、小さくPub/Subしたい
	- react-unit
		- ReactのshaddlowRenderのラッパー
- まとめ
	- 必要なのは「仕様理解」と「勇気」

------

## JavaScript Discussion

[![discussion](https://monosnap.com/file/z2VC0MmCQKox5DjQXlvOpNaYQjVhum.png)](https://app.sli.do/event/0egbwyxz/ask)

- [[JSer.info] JavaScript Discussion(JavaScriptの良い所/悪い所/気になる事)](https://app.sli.do/event/0egbwyxz/ask "[JSer.info] JavaScript Discussion(JavaScriptの良い所/悪い所/気になる事)")

を元に議論

> JSはいつ無くなるのか。

ウェブが死ぬまで?

> モダンなJSの構成で開発したらこんなに良いことがありました！儲かりました！みたいな話が、もっと世の中に出回ると良いと思っています。

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">modern JavaScript に変えてサーバーの転送量が減った <a href="https://twitter.com/hashtag/jserinfo?src=hash">#jserinfo</a></p>&mdash; kiyoshi nomo (@kysnm) <a href="https://twitter.com/kysnm/status/688287820717281280">January 16, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

> WebGLって流行るの？

WebGLは使われるようになる。(WebGL自体というよりはそれを利用したものが使われてる)

WebGL流行る = SVG流行る

> IE6,7,8 のサポートはもう切ってもいいですか……?

-　プロダクトはプロダクト次第
-　ライブラリは切る+shim入れれば動くという形にする例
	-　サポート切るのはmajorアップデートなのか(コードは変化してないが)

> O.o とは何だったのか

顔文字

> jQueryって皆使ってるの？バージョンは？

jQuery自体を使ってる人が全体の半分以下ぐらい。

バージョン

- 9割が1.x系。
- 1割が2.x/3.x系

> JavaScriptがコンパイル言語っぽくなってるのはどうやったら解決するのかな?

ECMAScriptの新しい機能を試すのにビルドツールとかが必要みたいな話。
いろんなところでビルドツールが必要になる。

言語にマクロのような機能がないので、こういったTranspilerは仕様と実装の緩衝材となるため重要という話。

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">使用したフィードバックを渡せるので開発者と使用者の溝を埋めれる。だから現在のbabelによるトランスパイルが重要という考えすごい <a href="https://twitter.com/hashtag/jserinfo?src=hash">#jserinfo</a></p>&mdash; rChaser53 (@rChaser53) <a href="https://twitter.com/rChaser53/status/688299229157011457">January 16, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

> hasegawayusuke さんへ electron XSS の怖いところを伝えて下さい

ElectronでXSSが起きると、任意のコード実行ができてしまう問題について

> いつになったらFlashを超えられるのか。足りないものは何か？

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">JSがFlashを超えるのに足りないものはなにか？&#10;→GUIエディタがない&#10;それっぽいのはたまにぽつぽつでてくるけど大きくならない <a href="https://twitter.com/hashtag/jserinfo?src=hash">#jserinfo</a></p>&mdash; よしこ (@yoshiko_pg) <a href="https://twitter.com/yoshiko_pg/status/688299239495999488">January 16, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


## [Chrome API #jserinfo](http://0-9.sakura.ne.jp/pub/lt/JSerInfo20160116/start.html "Chrome API #jserinfo") - kyo_ago

- Chrome Extension/OSのAPIについて

## [RailsのRailから解放される始めの一歩](http://www.slideshare.net/masatonoguchi169/railsrails-57123076 "RailsのRailから解放される始めの一歩") - joe-re

- [Rails - フロントエンド開発における革命とビルドプロセスについて - Qiita](http://qiita.com/joe-re/items/1d5e1d0527cc439e03ef "Rails - フロントエンド開発における革命とビルドプロセスについて - Qiita")
- Sprockets捨てたい理由
- Railsのfingerprintの解決が難しい
- まだ app/asset に成果物を吐いてる
- Reduxはロックイン感があるので、[Flux Utils](https://facebook.github.io/flux/docs/flux-utils.html "Flux Utils")を使うという話

[JSer.info 5周年記念イベントに行ってきた(LTもした) #jserinfo - Please Drive Faster](http://joe-re.hatenablog.com/entry/2016/01/17/151923 "JSer.info 5周年記念イベントに行ってきた(LTもした) #jserinfo - Please Drive Faster")

----


## [node-eps](https://speakerdeck.com/yosuke_furukawa/nodeeps "nodeeps // Speaker Deck") - @yosuke_furukawa

- [Node.js Enhancement Proposals](https://github.com/nodejs/node-eps "Node.js Enhancement Proposals")について
- C++ Streams
- ES6 Modules interop
	- [ES6/WhatWG Loader & Node - Google スライド](https://docs.google.com/presentation/d/1tXziuBheum53jk-FgtFkEUGKNVTdHzbpzhJLk7FatGc/present#slide=id.p "ES6/WhatWG Loader &amp; Node - Google スライド")
	- Node/ES6 どっちからも読めるようにするという
	- JSのレイヤーじゃなくて、C++のレイヤーでfallbackさせてtryする

## [SC22 ECMAScript Ad hoc委員会](http://azu.github.io/slide/2016/jser5years/sc22-ecmascript-ahodc.html "SC22 ECMAScript Ad hoc委員会") - @azu_re

ISO/IEC 16262であるECMASCript仕様の策定プロセスやどういう活動をしてるかという話。

[Introduction | ECMAScriptとは何か？](http://azu.github.io/slide-what-is-ecmascript/ "Introduction | ECMAScriptとは何か？")とはまた違う話です。


## AVA - @t_wada

- [sindresorhus/ava: Futuristic test runner](https://github.com/sindresorhus/ava "sindresorhus/ava: Futuristic test runner")について
- sindresorhusのオピニオンが強い話
- 後発のTest Runnerは独自性を求められる
- テストケースのネストはnon support
- 代わりに並列性
- ネストではなくファイルを分けろという方針
- power-assertがビルトイン

## ORTCの話 - jxck

- [openpeer/ortc](https://github.com/openpeer/ortc "openpeer/ortc")のHTMLを修正してる話
- Bookflashの人がメイン
	- IETF系のプロトコルギークの人
	- JavaScriptよくわからない
- PRしまくる日々
	- PRしまくってたら「お前の方が上手く(Example)書けると思うけど?」
- Exampleをどう書いていくのか
	- 標準仕様なのでどう書けばいいのか
- 将来的にWebRTCにマージ WebRTC NVになるかも
- Promiseも部分的に入ってる
- そもそもExampleの目的
	- APIの呼び出し方を例示する
	- 呼び出し順序を例示する
- 参照される可能性が高い
	- 本質はわかりやすく
	- 新しい機能を使うと記述が少なくて見やすい
	- 逆に「俺の知っているJSと違う」問題
- どれくらいのレベルで書くのか?
	- 仕様をどれくらいのJavaScriptで書くのか
	- 仕様書を読む人のレベル想定
	- ExampleはMSEdgeで動くレベルのAPIで書くか
	- let、Arrow Function、module、async await

------

お疲れ様でした。
