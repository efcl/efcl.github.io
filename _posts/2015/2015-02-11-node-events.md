---
title: "東京Node学園15時限目 アウトラインメモ"
author: azu
layout: post
date : 2015-02-11T00:02
category: イベント
tags:
    - Node.js
    - io.js
    - イベント
    - JavaScript

---

# 東京Node学園15時限目

[東京Node学園 15時限目 - connpass](http://nodejs.connpass.com/event/11436/ "東京Node学園 15時限目 - connpass")に参加してきたのでメモ

----

## 「io.jsについて」 by @yosuke_furukawa

> スライド : [io.js 東京Node学園 15時限目 // Speaker Deck](https://speakerdeck.com/yosuke_furukawa/io-dot-js-dong-jing-nodexue-yuan-15shi-xian-mu "io.js 東京Node学園 15時限目 // Speaker Deck")


- 最初はforkじゃなくてsporkと書いてあった
	- forkほど先割れじゃないよという
- io.jsはオープンガバナンスモデル
	- Node.jsは何に着手してるのかが不透明
	- どういうふうに取り組んでいるのかを公開する
	- Google Hangoutで議論したものの動画を公開
	- 基本的には合議制、Voteで :+1: :-1: を投票
	- コミットが活性化しだした
	- Comitterが追加された
- Node.jsとの機能面での違い
	- io.jsはV8のバージョンが新しい
	- V8が新しいのでES6の機能が入ってる
	- [koajs/koa](https://github.com/koajs/koa "koajs/koa")とかがそのまま使える
	- `const`や`let`が使える
	- `--es_staging` というオプションをつけると、V8でフラグが必要な機能も有効化できる
	- [io.js - JavaScript I/O](https://iojs.org/en/es6.html "io.js - JavaScript I/O")
	- `var v8 = require("v8");` を使って、GCのトレースを取ったりするオプションを有効化したりできる。
	- `assert` のdeepEqualStrictの追加
	- `util.debuglog` [visionmedia/debug](https://github.com/visionmedia/debug "visionmedia/debug")みたいなモジュール
- Node.jsとio.js
	- どっち使ったほうがいい?
	- 混乱を生まないようにしたい
	- [Join us on Slack!](http://iojs-jp-slack.herokuapp.com/ "Join us on Slack!") 日本語コミュニティ議論してるよ


----

## 「extensible web」 by @Jxck_

> スライド: [Extensible web](http://www.slideshare.net/Jxck/extensible-web "Extensible web")

- [The Extensible Web Manifesto](https://extensiblewebmanifesto.org/ja/ "The Extensible Web Manifesto")
- Shut the fuck up and write some code ということ
- なんで標準化をしてる人たちがこういうことを言ってるのか
	- 標準化はやっぱり時間がかかる
	- ベンダーが実装するまで開発者が使えない
	- 開発者のところに来るまでに時間がかかる
	- フィードバックまでのループが遠い
	- => 開発者がもっと主導できるようにしよう extensible web
- Extensible webの流れ
	- 開発者がPOCを作成
	- よい実装だったら仕様化しよう
	- ベンダーが実装する
- それをするには低レベルな機能が必要
	- 既存の機能を説明できる低レベルなAPIが必要
	- 開発者がその低レベルなAPIを使っていいものを作ろう
- e.g.) Fetch
	- XHRよりも低レベルな色々なところを定義
- e.g.) URL
	- URLを正しくパースできる
	- IPv6にちゃんと対応してる?
	- ライブラリを作るときはこの`URL`を使えばいい
- e.g.) Web Components(Custom Elements)
- これらの低レベルなAPIがあれば、開発者は欲しいものが作れる
- [Extensible Web を支える低レベル API 群 - Block Rockin’ Codes](http://jxck.hatenablog.com/entry/extensible-lowlevel-api "Extensible Web を支える低レベル API 群 - Block Rockin’ Codes")
	- Web Componentsを触って書くコードが多いのは、それが低レベルなAPIなので当たり前。
	- 低レベルなAPIをラップした便利なライブラリを書きましょう
- 問題
	- まず最初にLow Level APIがブラウザに実装される必要があるが、
	- Pure JavaScriptでも書ける低レベルなAPIは書けるケースが多い
	- アルゴリズムは実装できるはず
- Fetch
	- URL
		- gotoが書かれてる
	- URLSearchParams
	- Encoding
		- obtain-unicode
		- `String.fromCodePoint`

----

# WebSocketの圧縮機能とSocket.IO by @nkzawa

> スライド:  [WebSocketの圧縮機能とSocket.IO // Speaker Deck](https://speakerdeck.com/nkzawa/websocketfalseya-suo-ji-neng-tosocket-dot-io "WebSocketの圧縮機能とSocket.IO // Speaker Deck")

- wsモジュール
	- Nodeのデファクトモジュール
	- 昔からあった機能を追加
- メッセージデータのdeflate圧縮を実装
- 圧縮パラメータ
	- http: 圧縮データのheaderに含める
	- websocket: ハンドシェイク時に交換
- 2つの値
	- windowBits: glibの値
	- Context Takeover
		- 各メッセージを同一コンテキストで圧縮する
		- メッセージを渡していく時に後半のほうが圧縮率が良くなる(同じ文が前半で出ているなるほどそうなる)
- 残念
	- Chromeのみのサポート
	- Firefox 37から
	- ブラウザでは設定変更ができない
	- WebScoket APIから変更することができない
- この圧縮機能を使えるオプションが入った

-----

##「CodeOnMobile」 by @dai_shi

- 移動中にコーディングできるといいのでは
- iPhoneアプリとか探した
- [CodeOnMobile](http://codeonmobile.axlight.com/#/home "CodeOnMobile")というものを作った
- ACEを使ってる


-----

## 今できる通信高速化にトライしてみた by @shibu_jp 

> スライド: [東京Node学園 今できる通信高速化にトライしてみた](http://www.slideshare.net/shibukawa/node-44508626 "東京Node学園 今できる通信高速化にトライしてみた")

- JavaScriptでgoto
	- [goto for JS](https://gist.github.com/shibukawa/315765020c34f4543665 "goto for JS")
- 今できるとは
	- Service Workerはまだ実験的
- LZ4コマンド
	-  JSパーサで生成JSONを圧縮
	- gzip -> LZ4 するとファイルサイズが小さくなる
- 主に繰り返しの多いJSONやテキストで起きる
	- gzipはウェブのスタンダード
	- JavaScriptでLZ4を展開できるようにするといいのでは?
- LZ4をJavaScriptで展開
	- JSXで実行
	- WebWorker
		- 通信とLZ4の展開は別スレッド
		- ArrayBufferでは0コストでWorker間でやりとり
- ベンチマーク
	- Appleの開発ツールを使って通信制限をして検証
- 結果
	- ダウンロードの高速化できた
	- 展開のコストがあるので、ダウンロードコスト > 展開コストなら良い
- メリット
	- 通信量の削減
- デメリット
	- でかいファイルじゃないとあんまりファイル自体が小さくならない
- ネイティブアプリならもっと展開速度が稼げるので使い道があるかも?

----

## 「Socket.IOを使ってライフゲームで遊ぶ」 by @tako_black_

> スライド: [Socket.ioを使ってライフゲームで遊ぶ](http://www.slideshare.net/ssuser375b1b/socketio-44399338 "Socket.ioを使ってライフゲームで遊ぶ")

- ライフゲーム
	- マスに生死のルールが存在する
	- 図形みたいな事すると面白い
- Socket.IO
	- HTML5 Canvas
	- io.js
	- で作った
	
-----

## その他

shibukawaさん + いつもの

- JSXのネーミングの問題
- `X-Powered-By`ヘッダについて
- ExcelとXSLTとXML Schemaのリンク切れについて
  - DTDにあるURLがリンク切れになってる問題
  - ドメインリスク
  - GitHubのURLをid代わりに使ったりするのは永遠なのか
- コードホスティングの信頼性
  - 暗号やアルゴリズムなどはGoogle Codeに置かれたりすることが多い
  - アカウントの重み??
     - SourceForge > Google Code > GitHub
     - SourceForgeのアカウント持ってたら昔からやってたんだとわかる
  - Gitはなくなっても大丈夫だが、GitHubは現状だとなくなるのが困る
