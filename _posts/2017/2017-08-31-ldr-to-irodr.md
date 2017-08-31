---
title: "LDRがサービス終了のため、Inoreader/Feedlyをバックエンドに動くRSSリーダを書いている"
author: azu
layout: post
date : 2017-08-31T10:03
category: 雑記
tags:
    - LDR
    - JavaScript
    - API
    - RSS

---

2017年8月31日をもってLDRはサービス終了です。乗り換え先となるRSSリーダを探したりしましたが、求めるものを見つけることができなかったので作ることにしました。

- [【重要】Live Dwango Reader/LDR Pocketサービス終了のお知らせ｜LDR / LDRポケット 開発日誌](http://blog.livedoor.jp/staff_reader/archives/52278396.html "【重要】Live Dwango Reader/LDR Pocketサービス終了のお知らせ｜LDR / LDRポケット 開発日誌")

次の記事でも書いていましたが、RSSリーダのバックエンドを自前で管理するのはコスト的に難しそうでした。そのため、バックエンドとして[Inoreader](http://www.inoreader.com/developers/)や[Feedly](https://developer.feedly.com/v3/auth/)のAPI使ったRSSリーダのウェブクライアントを書くことにしました。

- [LDRのフィードをレート情報付きでエクスポートする | Web Scratch](http://efcl.info/2017/07/29/ldr-rate-export/ "LDRのフィードをレート情報付きでエクスポートする | Web Scratch")

## irodr

[Irodr](https://github.com/azu/irodr "Irodr")は[Inoreader](http://www.inoreader.com/developers/)や[Feedly](https://developer.feedly.com/v3/auth/)(こっちはまだ対応してない)のAPIを使ったRSSリーダです。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://t.co/xKJF7YUu5D">https://t.co/xKJF7YUu5D</a> の様子 <a href="https://t.co/ERUTFtaP0b">pic.twitter.com/ERUTFtaP0b</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/903085352448962560">August 31, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

どちらのRSSリーダサービスもフロントを持っていますが、LDRのような感覚で見ることが難しそうだったので、APIを使ったフロントだけを作っている感じです。

LDRのような感覚というのは個人的な感覚に過ぎなので普遍的なものではないですが、次のようなイメージです。

- UI: レート読みができる
	- ★の多い順にフィードを読んでいくスタイル
	- 多くのRSSリーダではカテゴリで代用できる
- UI: 左にフィード一覧、右にコンテンツ
- UI: コンテンツ送りの視線が固定できる
	- ショートカットで移動した時はタイトルが常に同じに位置に来る
- 速度: `j`をおした時にアニメーションなしで次の記事を見れる
	- Inoreaderは設定はアニメーションをoffできる
- 速度: `s`をおした時に300ms以内に次のフィードに切り替わる
	- LDRはこれを実現するためにprefetchをしている
- ショートカットを変更/カスタマイズできる
	- UserScriptでどうにかするやつ
	- Inoreaderは<https://greasyfork.org/ja/scripts/898-inoreader-key-customize>がよくできている

というのが自分的な感覚でのLDRらしい動きを実現するのに必要なものです。

[Inoreader](http://www.inoreader.com/ "Inoreader")は大体満たしているのですが、速度だけが問題になっていました。

- 未読数を表示すると、フィード数に応じて処理が重くなる
	- フィードを一度すべて表示してからフィルターしている
	- DOMの処理が重すぎてハングしてしまう(フィード数は3000弱)
	- 問い合わせたら、未読数の処理が一番のボトルネックらしく未読数をOFFにすると改善すると解答を貰った
	- また、マスターDBはブルガリアのDCにあるらしいとのこと
	- via <https://twitter.com/azu_re/status/902083679551348736>
- フィードから次のフィードに移動するときにリクエストのブロックが起きている
	- Inoreaderでは"Mark as Read"のAPIを叩いて完了したら、次のフィードのコンテンツを取得している
	- つまり次のフィードに移動するときにはAPIを2つ叩いて完了するまで待っている
		- 既読 -> 次のコンテンツ取得
	- 大体300~800msぐらい一度のリクエストにかかっているので、移動に1秒以上かかる

[Irodr](https://github.com/azu/irodr "Irodr")ではこの問題を次のようにして回避しています。	


- 未読数を表示すると、フィード数に応じて処理が重くなる
	- すべてのフィードは1画面に入ることはないので遅延表示のリストで表示する
	- [GroupList](https://dev.office.com/fabric#/components/groupedlist)を使ってる
- フィードから次のフィードに移動するときにリクエストのブロックが起きている
	- "Mark as Read"のAPIとコンテンツ取得のAPIを独立したタイミングで叩くようにする
		- 次のフィードのコンテンツ取得 -> さっきまでいたフィードを既読する イメージ
		- UI上はドメインモデルの未読カウントをすぐ0にするので、すぐ既読になっているように見えるので同じ
	- prefetch処理を追加
		- 今表示しているフィードから好きな数だけ先読みで取得できるようにしている
		- これにより次のフィードへの移動は300ms以内には完了する(リクエスト待たないので)

		
## 既知の問題

[Inoreader](http://www.inoreader.com/ "Inoreader")のAPIはCORSに対応していません！
つまりブラウザで直接APIを叩けないという問題があります。

これについても[問い合わせている](http://disq.us/p/1lpznh0)のですが、今のところサポートされていないだけなのか、今後もサポートする気はないのかについてはまだ返事を貰ってないですが。（誰かつついてくれると助かります）

- <http://disq.us/p/1lpznh0>	

今のところ、CORSを回避するProxyサーバを組み合わせるか、ブラウザ拡張で特定のAPIだけCORSを無視するワークアラウンドが必要です。

- [Docs: Add workaround for CORS · Issue #11 · azu/irodr](https://github.com/azu/irodr/issues/11 "Docs: Add workaround for CORS · Issue #11 · azu/irodr")

まだ開発中なので、`npm start`すると自動でCORSを無視できるProxyサーバが立つ仕組みしか用意していません。ブラウザ拡張でCORSを無視させる方法には[まだ問題があるので興味がある人はIssue](https://github.com/azu/irodr/issues/11)に日本語でもいいから書き込んでください。

**開発用のサーバ**: `npm start`するとwebpack-dev-serverが立ち上がります。
http://localhost:3000 は自動的にCORSを無視するProxyも兼ねているので、http://localhost:3000 にアクセスすれば利用できます。

	npm start

Electronアプリにすれば簡単に無視できますが、RSSリーダはブラウザで開けるウェブアプリのほうが都合がいいのでそこまでやる気はないです（タブを開きまくるのでアプリよりブラウザの方がいい。PRは歓迎しています）

後gh-pagesに公開したいのですが、 %PUBLIC_URL%が置換されないというcreate-react-app-typescriptの謎っぽい挙動を踏んでいるので、わかる方は次のIssueをみてください。

- [Not working on gh-pages · Issue #16 · azu/irodr](https://github.com/azu/irodr/issues/16 "Not working on gh-pages · Issue #16 · azu/irodr")

他の既知の問題は <https://github.com/azu/irodr/issues> にIssueを立てているので、気になる人は見てみてください。

### Feedly

DDD的な感じで作っていて、ドメインモデルはInoreaderというサービスには依存しないように書いています。そのため、ちょっとUseCaseの変更は必要ですが、[Feedly](https://developer.feedly.com/v3/auth/)など他のRSSリーダサービスにも対応できると思っています。

しかし、[Feedly](https://developer.feedly.com/v3/auth/)のAPIの使い方がさっぱり分からなくて手を付けられていません。

どなたか、FeedlyのOAuthクライアントIDを永続的に取得する方法が分かる人は教えてください。
（TwitterやInoreader、GitHubなどは普通のアプリ登録でClient IDを取得できるので、これのやり方Feedlyだとよくわからない。Sandbox以外の方法はどこにあるのかな?）


## 使い方

2017-08-31現在は開発サーバを建てないと使えないです。
次の手順で多分[Irodr](https://github.com/azu/irodr "Irodr")を手元で動かせるようになると思います。

	git clone https://github.com/azu/irodr
	cd irodr
	npm install
	# yarn installの方がlockを使うので推奨
	npm start
	open http://localhost:3000
	
使ってみておかしなところは[Issue](https://github.com/azu/irodr/issues)を立ててください。3日前に作り始めたばかりなので、まだちゃんと実装してない部分もありますがとりあえずIssueを立てておけば修正される気がします。


<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://t.co/xKJF7YUu5D">https://t.co/xKJF7YUu5D</a><br>面倒なのでInoreaderをバックエンドにLDRみたいなRSSリーダ書き始めた。<br>Inoreader CORS対応してないのがネック… FeedlyはOAuthのクライアントIDのとり方がよくわからない… <a href="https://t.co/cdbT55cC6x">pic.twitter.com/cdbT55cC6x</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/901991926676692992">August 28, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## おわりに

LDRは2017-08-31でサービス終了なので、次の記事で紹介してるフィード一覧の詳細データが入った `ldr.json` と呼んでいるものをまだ取得してない人は一応バックアップしておくといいと思います。
(opmlと違ってレートなど細かいデータも含まれている）

- [LDRのフィードをレート情報付きでエクスポートする | Web Scratch](http://efcl.info/2017/07/29/ldr-rate-export/ "LDRのフィードをレート情報付きでエクスポートする | Web Scratch")

LDRは長いこと使いましたが、livedoor Readerを作った[方](http://youkoseki.tumblr.com/post/22588852397/mala)々、LDRを[AWS](https://www.youtube.com/watch?v=596ymsCCxbw)に[移して](http://media.amazonwebservices.com/jp/summit2015/docs/ME-02-Tokyo-Summit-2015.pdf)運用されたLive Dwango Readerの方々ありがとうございました。
