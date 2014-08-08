---
title: "Shibuya.XSS テクニカルトーク #5 アウトラインメモ"
author: azu
layout: post
categories:
    - イベント
tags:
    - XSS
    - イベント
    - Browser
    - JavaScript

---

## [Shibuya.XSS テクニカルトーク #5 : ATND](https://atnd.org/events/54101 "Shibuya.XSS テクニカルトーク #5 : ATND")

Shibuya.XSSに参加してきたのでメモです。

体調がイマイチだったので朦朧としたメモです。
後、オフレコなものがあったので、その部分はオフレコとしてあります。

公開していけない箇所があったら[Issues](https://github.com/efcl/efcl.github.io/issues "Issues · efcl/efcl.github.io")など立ててください。

---

## 私の見つけたXSS - yousukezan

- JVNのXSS
    - FlashのXSS
- PaypalのXSS($100ぐらい)
    - paypalの中国のサイト
    - paypal-wujinggou.com
    - All in ONE SEOプラグインのXSS (Wordpress)
    - `s=\\x22\x3e` みたいな感じでXSS
    - Wordpressのプラグイン
         - XSSが日々大量に見つかるので要チェック
- Yahoo!のXSS
    - 去年バウンティプログラムが始まって大量の脆弱性が報告されている
    - Yahoo!mail の Self-XSS
         - `"><script>` をコピペするとできるXSS
    - FlickrのXSS
    - Yahoo!mailの電話帳のXSS
         - アドレス帳のWebURL欄にjavascript:alert(0)//
         - //がないとURLとして認識してくれなかった
         - クリックでXSS
    - Yahoo!7のXSS
         - 特定のメールタイトルがTOP画面にスクリプト実行される
         - ユーザー個人の新着メールのヘッドラインが変
    - Yahoo!台湾のXSS
    - Yahoo!動画検索のXSS
         - `<"><svg onload=....>` だとなぜか通る
         - サニタイズフィルターをスルーしてしまう
    - Yahoo!の広告表示のXSS($5000)
         - `window.name`を使ってiframeのクロスドメインの広告を吐き出すHTMLにXSSがあった
         - 元のドメインが yahoo.com というURLに一致ならまだ通ってた
         - xssyahoo.com というドメインを取ってXSSが再度通った

---

## Blob URI Scheme - やぎはしゅ

> [Blob URI Schemeの素敵なお話](http://www.slideshare.net/yagihashoo/blob-uri-scheme "Blob URI Schemeの素敵なお話")

- CTF、カメラ、XSS
- Blob URI について
- `blob:http://doma.in/xxxx`
- data:に似てるけどちょっと違うやつ
    - 一時的なデータにURLがつけるために使う
    - アップロードされたローカルコンテンツへの参照
- Blob URLの作り方
    - BlobオブジェクトにFileオブジェクトを渡して、`URL.createObjectURL()`でblob URLを生成
    - ブラウザから直接参照した場合は`text/plain`になる
    - 画像だとContent sniffing的な挙動
- ユースケース
    - ユーザアップロードのコンテンツに対して一時的にクライアントサイドで参照を持ちたい
- 前提
    - ユーザー指定のローカルコンテンツへの参照
         - `input[type=file]` で画像を選択して取る
    - 通常のユースケースではXSSになりにくい
- むりやりXSSと結びつける
    - 本来の用途とはかけ離れているページ
    - 通常の用途ではなく、無理やりXSSが起きそうなページを作る
    - location.searchからBlob URLを作ってiframeのsrcに埋め込むサイト
    - location.search -> Blob URL -> iframe.src
         - 実行されるblobのoriginはiframeの参照元のコンテキストで動く
         - `parent.document.cookie` の参照が可能
- まとめ
    - Blob URLをData URLとはやっぱり違う
    - Content-typeの扱いが面白い気がする

---

## Bug Bounty Program - nishimunea

> [Welcome to the Black Hole of Bug Bounty Program Rebooted](http://www.slideshare.net/muneakinishimura/welcome-to-the-black-hole-of-bug-bounty-program-rebooted "Welcome to the Black Hole of Bug Bounty Program Rebooted")

- [Mozilla Security Bug Bounty Program](https://www.mozilla.org/security/bug-bounty.html "Mozilla Security Bug Bounty Program") について
- 重要なセキュリティバグ発見した人にMozillaが報償金
    - 1件3000$
- どこを探したらバグの見つける戦略が必要
    - Web Workers弱そう
         - hasegawaさんが報告してた
    - 1件見つかった - CSPをバイパスするバグがあった
    - すでにkinugawaさんが発見、報告したバグだった
    - 既知のバグを見つけた場合 => 類似Bugへのアクセス権を付与してくれる
- 諦めかけていたそんな時
    - DeviceStorage APIのディレクトリトラバーサルの脆弱性が報告されていた
- Firefox OSは未開の地(フロンティア)
    - Browser API(WebView)を探索
    - CSPヘッダが完全に無視される
         - CSPの実装が古いだけ
         - CSPの実装がまだされてなかっただけ
         - 実装が間に合ってないだけだった
    - X-Frame-Optionsヘッダ無視される
         - フレームじゃなくてブラウザAPIなので仕様なんだ!
    - 未開の地ならではの苦労
         - 実装されてない機能がまだ多い
         - バグなのか仕様なのか手探り
- Mozilla Foundation Security アドバイザリー
    - 過去の脆弱性を発表してるページ
    - 過去の脆弱性から弱そうな機能を抽出
    - それらを組み合わせて生まれる脆弱性があるかもしれない
    - CSP x appcache x WebSocket でバグ
         - CSPの違法レポートが機能しないバグ
         - だれも困らないバグ => セキュリティbugzillaだけど公開された
- 機能が増えれば攻撃方法も増える(組み合わせが増える)
    - 無限にBug Bounty Programを楽しめる
    - Bug Bounty Programは中毒性が高い
    - 一日中バグを考えるようになる
    - FirefoxOSの本を出す
    - [【C86限定予約】Firefox OSウヱブアプリ開発読本 - TechBooster](https://techbooster.booth.pm/items/29835 "【C86限定予約】Firefox OSウヱブアプリ開発読本 - TechBooster")

---

## ブラウザとWebサーバの話 - はるぷ

> [ブラウザとWebサーバの話@Shibuya.xss](http://www.slideshare.net/harupu/shibuyaxss-37764307 "ブラウザとWebサーバの話@Shibuya.xss")

- XSSの仕方いろいろ
    - スクリプトタグ
    - イベントハンドラ
    - `href=javascript:` <= 今日の主役
- 302 Foundの画面
    - Locationヘッダの中身によって302画面が出るブラウザとでないブラウザがある
    - ChromeとFirefoxは`about:blank`へは飛ぶ
    - `javascript:`と入れた場合
         - Operaは動く!
         - Apacheに報告したけど脆弱性じゃないといわれた
         - ISP 「このオブジェクトはここ」
         - Opera独自エンジン presto
         - Firefox5.0も同じように意外と動く
- 正攻法でXSS
    - Chrome 普通にXSSいれても動かない
    - ヘッダでX-XSS-Protectionを無効にしてXSSを起こす
    - レスポンスヘッダを組み合わせると動くケースが出てくる
    - 今どきレスポンスヘッダインジェクションできないのでは?
- JSP の面白いレスポンスヘッダインジェクション
    - CentOS6 Apache 2.2.x とかちょっと古い組み合わせで
    - ヘッダで改行ができてインジェクションできてしまう
- Set-Cookie
    - 大量のクッキーを押し付けるとBad Requestになるケース
    - リロードしてもBad Requestが続く
    - クッキーをけすのも大変(位置が分からない)
    - 大量のクッキー押し付ける攻撃
- まとめ
    - 古くからある変な挙動も面白い
    - 新しいものを作るときに意外と再熱する

---

## karupanerura

- チート行為 - 2つの目的がある
    - 自分自身が有利になる
         - 偽の情報を送り付ける
    - ユーザーへ不利益を与えるもの
- サーバに送信するデータを偽装する
- 防ぎたいチート行為
    - ただでもできる
    - 簡単にできる
    - ほかのユーザーに影響を与えられる
- ヤバいやつ
    - ブックマークレットで出来るチート行為
         - XHRでAPIにデータ送信
         - フロントに処理を置くケースが増えてきている
    - 位置情報を使ったゲームの偽装
         - デバイスデータの偽装は対応しにくい
- 目指したいレベル
    - だれでもチートできる 状況を避ける
         - 少数なら手動でBANする
    - ブックマークレットなどでできないようにする
- Same Origin Policy
    - 同一Originに対してのみ権限を与える
    - [Same-Origin Policy とは何なのか。 - 葉っぱ日記](http://d.hatena.ne.jp/hasegawayosuke/20130330/p1 "Same-Origin Policy とは何なのか。 - 葉っぱ日記")
- オフレコーオフレコー
    - チート対策を完璧にやるのは難しいので、簡単には出来なくさせるにはどうするかという話

---

## 直ってないGoogleの脆弱性 - ma.la

- 複数バグ報告したけど、片方のみ修正されてない
- オフレコーオフレコーデモーデモー
- まとめられなかった

---

## うわさのあれをゆるくMITMしてみた- ockeghem

うわさのアレはオフレコ???

<!--
- LINEの通信をMITMする話(キャプチャ)
- LINE独自のデータ形式が気になる(独自形式?)
- MITMしたらどうなる
    - Burp Suiteでやりたい
    - [Burp Suite](http://portswigger.net/burp/ "Burp Suite")
- 検証環境
    - 偽AP環境を作っておく
    - 検証用の端末
    - Burp Suite は 8080ポートで透過プロキシでキャプチャしてみる
    - そのままだとログインできない
- プロキシ切ってログイン後 -> プロキシつないでメッセージを送信
    - 送信できた
    - 同じメッセージを送っても`X-LCS`ヘッダというBase64とBodyが毎回違う
    - `X-LCS`ヘッダの中身をデコードすると2048byteになる
    - RSA-2048?
    - Bodyも1-7byteは144、8byteごとに大きさが変わる(128ビット単位)
- 画像を送信
    - 画像はHTTPSで送信されていた
    - 端末の方を改造して、SSLも無視して行けるようにしてるのでキャプチャできてる
- その他
    - 2014年2月のキャプチャではX-LCSは128bitだった
    - RSA-1024 からRSA-2048になった?
-->

---

## 犯人を追いつめろ! - TAKESAKO

- SECCON 2014年の夏予選
- CTFオンライン予選
    - LINEの乗っ取りチャットっぽい問題
    - ソーシャルハックするCTF
    - 相手は人口無能
    - 画像をダウンロードさせる
    - UAとかIPとかからVPSにアクセスできるヒントをくれる
    - 細かいギミックがある人口無能

---

## 文字列からHTMLを組み立てる話 - hasegawa

> [shibuyaxss.pdf](http://utf-8.jp/public/20140807/shibuyaxss.pdf "shibuyaxss.pdf")

- DOM based XSS
- 文字列のサニタイズ
    - IEであれば、`toStaticHTML`が使える
    - JavaScriptなどを削除したものを返してくれる
    - IE以外はどうするのか
         - toStaticHTMLもどいきを作る?
         - 作るな!安全なものを探せ!
         - Google Caja
    - Google Caja
         - 文字列をパースして安全なHTML文字列を組み立て
         - 遅い
- ブラウザ互換のパーサ
    - ブラウザ内蔵のパーサAPIを使う
         - DOMParser
         - createHTMLDocument
    - `createHTMLDocument`によるパースとDOMノードの構築
    - 文字列をパースしてDOMノードを構築可能
    - DOMノートから必要な要素、属性だけをホワイトリストで取得する
    - DOMParserとcreateHTMLDocumentは現在表示してるdocumentに影響を与えない
- 許可する要素、属性を列挙する?
    - JSONで許可リストを指定して処理するサニタイズのデモ
    - 許可したノードだけで構成されたノードを取得できる
- パースしたものを文字列に変換してはいけない
    - 文字列 -> Element -> 文字列は 危険な可能性がある
    - HTMLElementから文字列の変換は**mXSS**を引き起こす可能性がある
    - `<listing>&lt;img....` というをDOMParserでパースして、それのinnerHTMLするとなぜか`<img`になってしまう
    - toStaticHTMLと分岐して文字列を返すような関数を作ったりするとやりがち
    - 返すときはElementのまま返して使おう
    - [fp170.pdf](https://cure53.de/fp170.pdf "fp170.pdf")
    - [mXSS - Mutation-based Cross-Site-Scripting のはなし - 葉っぱ日記](http://d.hatena.ne.jp/hasegawayosuke/20140508/p1 "mXSS - Mutation-based Cross-Site-Scripting のはなし - 葉っぱ日記")
- バグがあっても平気なようにする
    - HTML5 sandbox iframeを使う
    - sandbox属性によりJavaScriptを禁止する
    - seamless属性により親のCSSを継承
    - 見かけ上は普通のコンテンツだけど、実行されても安全な場所が作れる
- まとめ
    - toStaticHTML便利(IE)
    - DOMParser、createHTMLDocumentでHTML文字列をパースしてElement
    - 文字列 -> Element -> 文字列は 危険 mXSSの可能性
    - sandbox iframeを使おう


----

## その他

メモ: [OmniOutliner](http://www.omnigroup.com/omnioutliner "OmniOutliner")