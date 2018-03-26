---
title: "#忘年_sushi でJavaScriptの素振りする技術について話してきた"
author: azu
layout: post
date : 2015-12-09T23:19
category: イベント
tags:
    - JavaScript
    - HTTP2
    - ServiceWorker
    - SSL
    - ES6

---

[#忘年_sushi](https://twitter.com/search?q=%23%E5%BF%98%E5%B9%B4_sushi "#忘年_sushi")で[JavaScriptの素振りする技術](http://azu.github.io/slide/2015/year-end/javascript-swing.html "JavaScriptの素振りする技術")について話してきました。

- [#忘年_sushi - Togetterまとめ](http://togetter.com/li/910679 "#忘年_sushi - Togetterまとめ")

<blockquote class="twitter-tweet" lang="en"><p lang="und" dir="ltr">🍣 <a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a> <a href="https://t.co/NAnBXXucnl">pic.twitter.com/NAnBXXucnl</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/674538717093085184">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

## Angular2

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a> こう感じ(AngularJS) <a href="https://t.co/rvr8jAsl4S">pic.twitter.com/rvr8jAsl4S</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/674535461642104832">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- Angualr 2を想定して書くAngular 1はAngularらしくない感じ
- Angular 1での縛りプレイ
- Angualr 2はαがアップデートされまくってる
	- [Releases · angular/angular](https://github.com/angular/angular/releases "Releases · angular/angular")
	- [RxJS](https://github.com/ReactiveX/RxJS/releases "RxJS")もαがアップデートされまくってる


## コーチング

- コーチングとは
	- DDDみたいなもの

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">DDDを多人数との現実的なコミュニケーションパターンとして捉えるなら、コーチングで学んでることも同じようなパターンランゲージ&#10; <a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/674537699605262336">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


- コーチングの分類
- 広義なコーチング = 人との関わり全般
- 狭義のコーチング = コーチング資格の持ってるひとのやること
- マネージメントとコーチング
	- コーチングから見るとマネージメントは別
	- マネージメントから見るとコーチングは別、またマネージメントの一種の手法

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">マネージメントの問題を解決するときのツールが欲しいという話 <a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/674541071724994560">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## pdf.js-controller

<blockquote class="twitter-tweet" lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a> <a href="https://t.co/X3FRXzSkzA">pic.twitter.com/X3FRXzSkzA</a></p>&mdash; サスケ (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/674541370808270848">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


- [[pdf.js] テキスト選択出来るスライド表示ライブラリを書いた | Web Scratch](https://efcl.info/2015/12/07/pdf.js-controller/ "[pdf.js] テキスト選択出来るスライド表示ライブラリを書いた | Web Scratch")
- pdf.jsは扱いにくいけど普通に動いても面白い
- 楽に扱えるライブラリを書いたよという話

## ServiceWorkerとHTTP/2 push

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">これからの AppCache (？)の話をしている。 <a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a> <a href="https://t.co/NVr9AntFk6">pic.twitter.com/NVr9AntFk6</a></p>&mdash; Jxck (@Jxck_) <a href="https://twitter.com/Jxck_/status/674553985764737024">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[HTTP/2 Push を Service Worker + Cache Aware Server Push で効率化したい話 - Block Rockin’ Codes](http://jxck.hatenablog.com/entry/service-worker-casper "HTTP/2 Push を Service Worker + Cache Aware Server Push で効率化したい話 - Block Rockin’ Codes")

- localhostのHTTPS化問題
	- HTTP2がHTTPSじゃないと使えないのでhttps://localhost/とする必要がある
	- でもlocalhostの証明書がinvalidだとSWが登録できない
	- これを回避する安全な方法がChromeではバグッてる
	- 危険なフラグで無理矢理開発してる。怖い。
- SWを使ったキャッシュレイヤーがあり、Server pushでそれに必要なものを送り込む
	- 次回のリクエストをhookしてSWがレスポンスを返せれば、実際のリクエストをしなくてよくなるという話
- cache aware server pushの理論
	- クライアントが持ってるSWのキャッシュをサーバに教える
	- クッキーかヘッダーか
- Hookポイントが色々足りない

## 社内Let's Encrypt

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">Let&#39;s Encryptが社内ネットワークにあるドメインには使えないという話。&#10;社外から認証のリクエストを制限してるから <a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/674554358290255872">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- 社内ネットワークにあるドメインにはLet's Encryptが使えない
	- 社内ネットワーク内のみからアクセス出来るドメイン
	- ACMEプロトコルでのやり取りは外と繋ぐ必要がある
	- 更新時に開けるか社内CA&社内Let's Encrypt
- 社内に置くとhttpにしてしまう文化ができがち
	- AppCache Poistioning + HTTP のリスク
	- 社内ネットワークからのアクセスのみで中間者攻撃が残る
	- 社内ネットワークからのアクセスもSSL化すると安全
	- 社内ツールもちゃんとSSL化する
- 社内ツールを置くドメイン + ワイルドカードでSSL
- 社内CAを作って各端末にRoot証明書?
	- やっぱりリスクがあるのでは
- 社内やデータセンター内などのSSL化でACMEプロトコルを使ったものは増えるかも
- [Let's Encrypt を支える ACME プロトコル - Block Rockin’ Codes](http://jxck.hatenablog.com/entry/letsencrypt-acme "Let&#39;s Encrypt を支える ACME プロトコル - Block Rockin’ Codes")


<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">唐突に🍣 <a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a> <a href="https://t.co/iwIpydUM7j">pic.twitter.com/iwIpydUM7j</a></p>&mdash; teppeis (@teppeis) <a href="https://twitter.com/teppeis/status/674571307334275076">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## let vs const 


[const vs let // Speaker Deck](https://speakerdeck.com/yosuke_furukawa/const-vs-let "const vs let // Speaker Deck")

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">そろそろ決着を付けたい let vs const <a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/674437783772004352">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">御社はこんな会議やってるんですか？ <a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a> <a href="https://t.co/SIHnmY8hcq">pic.twitter.com/SIHnmY8hcq</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/674559952023719936">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- `const`のPros
	- 脳内メモリの節約に役立つ
	- 変わる場所だけが`let`で宣言される
	- if分岐で代入みたいなパターンが減る
- `const`のCons
	- オブジェクトのプロパティなどは書き換え可能
	- `const`という文字数が長い、威圧感がある
	- `const`を使ったからといってすべてがimmutableにはならない
	- モジュールからexportされたconstはconstではなくなる
	- 現状では`const`できない場所が色々ある
		- [strawman:defensible_classes [ES Wiki]](http://wiki.ecmascript.org/doku.php?id=strawman:defensible_classes "strawman:defensible_classes [ES Wiki]")


<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a> 「今のconstは精神的なconst」</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/674565236536422400">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
	
		
- 精神的なconst
	- const使う事自体は正しい
	- 一種のコーディングスタイルに近い効力
	- 引数のconst問題
	- constを利用することは問題ないが、既存の全てをconstにしろと言える程の効力がない
	- constで解決出来ることは別のスタイルでも解決できる可能性もある
- [【Effective Java】項目１５：可変性を最小限にする - モノクローム](http://hjm333.hatenablog.com/entry/2015/09/15/000644)
- [【Effective Java】項目15 可変性を最小限にする - tatsuyamukuの日記](http://tatsuyamuku.hatenablog.com/entry/2015/06/20/223021)
	- Javaのfinalはフィールドなどに対してという話。
	- ローカル変数を全てconstしろという話ではない。
	- 現状のES6 constはローカル変数に対してのconstしかない
	- JavaScriptにはスレッドセーフという概念はない

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E5%BF%98%E5%B9%B4_sushi?src=hash">#忘年_sushi</a> 「結論はケースバイケース」 <a href="https://t.co/Qc2vIdnlhP">https://t.co/Qc2vIdnlhP</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/674568622187020288">December 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## [JavaScriptの素振りする技術](http://azu.github.io/slide/2015/year-end/javascript-swing.html "JavaScriptの素振りする技術")

JavaScriptのトレンドというのは半分ぐらい主張なので、それを確認する術を身につけようと言う話でした。

需要があったら別の記事で書くかもしれません。

## おわり

今年もお疲れ様でした！
