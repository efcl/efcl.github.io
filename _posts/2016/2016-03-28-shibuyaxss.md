---
title: "Shibuya.XSS techtalk #7 アウトラインメモ"
author: azu
layout: post
date : 2016-03-28T21:41
category: イベント
tags:
    - Browser
    - XSS
    - security

---

[Shibuya.XSS techtalk #7](http://shibuyaxss.connpass.com/event/28232/ "Shibuya.XSS techtalk #7")に参加してきたのでメモ

----

## 超絶技巧 CSRF - mala

スライド: [超絶技巧CSRF / Shibuya.XSS techtalk #7 // Speaker Deck](https://speakerdeck.com/mala/shibuya-dot-xss-techtalk-number-7 "超絶技巧CSRF / Shibuya.XSS techtalk #7 // Speaker Deck")

- CSRFについて
- クロスサイトでリクエストを強制する脆弱性
	- 書き込み
	- パスワードの削除
- 未だによくある
	- XSSは正しく書いていれば防げる
	- CSRFは未だによくある
- CSRFは事後対処になりやすい
	- 投票とか掲示板とか事後対処になりやすい
	- リスクの高いCSRFの紹介
- アカウント乗っ取り
	- 危険なCSRF
	- パスワードの変更
	- メールアドレスの変更
- 連携アカウント追加
	- OAuth2.0 + stateパラメータで防げる
- いろんなものにCSRFする
	- JSONやXMLを送る
	- form enctype=text/plainを使う
	- CSRFでmemcached protocolとして解釈可能なものをCSRFで送れる
- HTML Form protocol attach
	- Cross-Protocl スクリプトアタック
	- よくあるportはブロックされる
	- NoSQLサーバとかはブロックされてないので、攻撃出来ることがある
- 昔との違い
	- バイナリをアップロード出来るようになってる
	- multipart/form-dataをCSRF => 可能
	- CORSのプリフライト対象外
- デモ
	- Memcachedにform経由で書き込むデモ
	- アプロケーションに任意のデータを書き込んだ任意のコード実行みたいなことができてしまう
- 認証を突破するCSRF
	- Redisだとパスワードをかけられる
	- Redisのパスワード認証
		- パスワードが既知だと同じ
- CSRFで突破できる認証
	- CSRFはレスポンスが取れない
	- チャレンジ&レスポンス系は突破できない
- ミドルウェアへのCSRF対策
	- 隔離するものはちゃんと隔離する
	- 退職者向けバックドアは残さない
- Well-known port
	- [3.5 Port blocking](https://fetch.spec.whatwg.org/#port-blocking "3.5 Port blocking")
	- Fetch APIで定義されてる
	- コレ以外はブロックされないので、CSRF経由での攻撃ができる
- プロセス間でやり取りする場合は相互認証をちゃんとやる
- Cross protocolなCSRF + xhr.send(blob)でバイナリを送れる :new:
	- 新しい脆弱性は生まれるかも

-----

## PATHでXSSする技術 - Masato Kinugawa

スライド: [明日から使える?! PATHでXSSする技術/ Shibuya.XSS techtalk #7 // Speaker Deck](https://speakerdeck.com/masatokinugawa/shibuya-dot-xss-techtalk-number-7 "明日から使える?! PATHでXSSする技術/ Shibuya.XSS techtalk #7 // Speaker Deck")

- `https://host/path?key=a#b`
- クエリとかハッシュ以外もXSSに使える
- `$_SERVER` 
	- PHP
	- `REQUEST_URI`
		- Firefox, Chrome
		- IEはリダイレクトするとなぜがPATHの部分がエスケープされない
- その他のパスでのXSS
	- RPO(Relative Path Overwrite)
		- 相対パスを上書きを引き起こすXSS
- `location.pathname`
	- パスを取得するためのプロパティ
		- `'=()`などはエスケープされない
- [Shibuya.XSS JIZEN-GAKUSHU Challenge](http://shibuya.vulnerabledoma.in/jizen "Shibuya.XSS JIZEN-GAKUSHU Challenge")
	- 解説

```js
$(document).ready(function() {
	$('body').append('<img class="log" src="/payloadLogger?url=' + location.protocol + "//" + location.host + location.pathname + escape(location.search) + escape(location.hash) + '">');
});
```

- `aaa/..%2F`
- IE
	- iframe経由でドキュメントモードを古い動作をあえて呼び出す
	- 親のドキュメントモードがiframeにも継承される
		- [Understanding the Compatibility view list (Windows)](https://msdn.microsoft.com/en-us/library/gg622935(v=vs.85).aspx "Understanding the Compatibility view list (Windows)")
		- 互換性
	- AllowEncodeedSlashedの動作を利用してパス先頭に`javascript:`を書く
	- [Shibuya.XSS JIZEN-GAKUSHU Challenge](http://shibuya.vulnerabledoma.in/jizen "Shibuya.XSS JIZEN-GAKUSHU Challenge")
- IE
	- `http`から`mshtml`へreplaceStateができる
	- SafariもBlob+replaceStateができる

事前課題

- [Masato Kinugawa on Twitter: "Dear XSSer, two XSS challenges are here. Can you solve it? :) https://t.co/xyi8qoyJBL https://t.co/jhiZMDZh1l"](https://twitter.com/kinugawamasato/status/713307732628021248 "Masato Kinugawa on Twitter: &#34;Dear XSSer, two XSS challenges are here. Can you solve it? :) https://t.co/xyi8qoyJBL https://t.co/jhiZMDZh1l&#34;")


-----

## Electronのセキュリティの話 - hasegawa

スライド: [Electronのはなし](http://utf-8.jp/public/2016/0328/shibuyaxss.pdf "shibuyaxss.pdf")

- Electron vs. CSP
	- レンダラにCSPを適用しても
	- `webview`タグ内で任意コード実行ができる
	- CSPでは(Electronの)XSSを防げない
- WebViewタグを使わないでXSSするパターン
	- レンダラ内は同一オリジン以外のリソースは禁止
	- 外部リソースを`innerHTML`で読ませれも発火しない
	- 表示されるページと同じオリジンなら可能
	- `innerHTML = <iframe src="<同じオリジン>">`はいける
	- `file://`で悪意があるものがあれば、任意コード実行できそう
- 同一オリジン
	- ディレクトリと関係なく全てが同一オリジン in `file://`
	- Chrome 45では修正が入ってる: [Issue 455882 - chromium - Treat file:// URLs as having unique origin - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=455882 "Issue 455882 - chromium - Treat file:// URLs as having unique origin - Monorail")
	- Electronもそのうち直る?
- 悪意のあるファイル in `file://`
	- 事前にダウンロード
	- ファイルサーバを立ち上げて、`file://`なものを用意しておくと同一オリジンとして認識される
- 実行できてもNodeの機能が実行できない
	- `window.open`でNodeを有効にしたウィンドウを開ける
	- XSSがあると何でも実行できる
- Electronのnodeモジュール探索パス
	- アプリ外のパスも探索パスとなる

----


## http://こいつの:話@shibuya.xss.moe/ - yagihashoo 

- パスワード認証の話
- URI
	- RFC2396で定義、RFC3986で改定される
	- RFC1738 URL
- 各ブラウザの対応状況
	- IE/Edge以外は大体何か動く
	- FirefoxとSafariとかは警告がでて確認される
	- Opera PWがマスクされるパターン
- Firefox
	- URLの履歴がそのまま表示される
- ベーシック認証をしてるサイトからログアウトできない
	- ブラウザを終了するしかない
	- もう一度同じURLでアクセスするとダイアログはでない
- 各種ルータの管理画面ハック
	- 管理画面はXSSとかCSRFがよくある
	- XSSの条件
		- ログイン済み
		- XSSが発言するURLが既知
		- ユーザがわなページを踏む

----

## Firefoxの話 - llamakko_cafe


- 脆弱性を探す前に
	- ブラウザの脆弱性探しはハードル高そう
	- どんなものが脆弱性
	- どんなところに脆弱性
- ブラウザの脆弱性?
	- パッと浮かぶものがあまりない
	- 引き出しが少ないと脆弱性結びつけるのが難しい
	- [JVNDB-2015-006323 - JVN iPedia - 脆弱性対策情報データベース](http://jvndb.jvn.jp/ja/contents/2015/JVNDB-2015-006323.html "JVNDB-2015-006323 - JVN iPedia - 脆弱性対策情報データベース")
- 脆弱性を探す前に
	- Firefoxセキュリティアドバイザリ
	- 脆弱性の一覧があって、ソースも見える
- [JVNDB-2015-006413 - JVN iPedia - 脆弱性対策情報データベース](http://jvndb.jvn.jp/ja/contents/2015/JVNDB-2015-006413.html "JVNDB-2015-006413 - JVN iPedia - 脆弱性対策情報データベース")
	- data および view-source URIを通じたクロスサイト読み取り攻撃
- Firefoxの脆弱性を見つけたきっかけ
	- 「戻るボタンを押すのがめんどうくさくてhistory.backしてた」
