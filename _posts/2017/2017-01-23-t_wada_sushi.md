---
title: "#t_wada_sushi でOpen Collectiveの話をしてきた"
author: azu
layout: post
date : 2017-01-23T23:08
category: イベント
tags:
    - OSS
    - twada
    - testing
    - sushi

---

[#t_wada_sushi](https://twitter.com/search?q=%23t_wada_sushi&src=typd "#t_wada_sushi")で[Open Collective](https://opencollective.com/ "Open Source Collective is on Open Collective")の話をしてきました。

[![open](https://monosnap.com/file/JNTadjsjcWbTuHYcJY2Zdgd14R77Oe.png)](http://azu.github.io/slide/2017/t_wada_sushi/OpenCollective.html)

- スライド: [Open Collective](http://azu.github.io/slide/2017/t_wada_sushi/OpenCollective.html "Open Collective")

最近webpackなども利用し始めた[Open Collective](http://azu.github.io/slide/2017/t_wada_sushi/OpenCollective.html "Open Collective")というウェブサービスについての話をしてきました。
いわゆる寄付サービスや[Patreon](https://www.patreon.com/ "Patreon")に近いものです。
オープンソースプロジェクトなどの小さなコミュニティが法人格を持たないで、透明性を持ってお金をやり取り出来るような状況を作ることを目的にしたサービスです。

- [How Webpack raised $15,000 in 3 months, and the future of open source](https://hackernoon.com/how-webpack-raised-15-000-in-3-months-and-the-future-of-open-source-cb2c9f68fffa#.pp5mjn2jy "How Webpack raised $15,000 in 3 months, and the future of open source")

どういう目的をもって作られてたか、また最近利用するJavaScriptのOSSが増えてきたので簡単に調べた感じです。

- [Open Collective · Issue #4 · jser/report](https://github.com/jser/report/issues/4 "Open Collective · Issue #4 · jser/report")

-----

## webpack2 - 会長

- Tree shakingについて
- webpack2への移行でハマったのは
	- postcss
	- [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin "extract-text-webpack-plugin")
- webpack2のTree shakingのしくみについて
- webpackは`// unused` なコメントをつけていく
- これをuglifyJSが圧縮時に消し去る
- という仕組み
- Tree shakingした結果12kb減った
- モジュールを元からきちんと分けてるとそこまで効果がない感じ
- 圧縮を書けないとコメントが増える分余計に増える

----

## [whatwg/urlについての最近の動向](http://slides.com/laco/201701-twada-sushi#/ "whatwg/urlについての最近の動向") - laco

- [Contributors to whatwg/url](https://github.com/whatwg/url/graphs/contributors "Contributors to whatwg/url")
- コミットが最近活発化
- URLSearchParamsについての変更がある
- URLフラグメントのASCII文字列化 (373dbed)
- URL passwordの仕様変更 (5e0b05e)
- URLSearchParamsのコンストラクタ仕様変更 (31ddc5b)
	- mapを受け入れるようになった
	- tuple、map、文字列にURLSearchParamのコンストラクタに渡せるようになった
	- オーバーロード
	- [Simplify constructing URLSearchParams by annevk · Pull Request #175 · whatwg/url](https://github.com/whatwg/url/pull/175 "Simplify constructing URLSearchParams by annevk · Pull Request #175 · whatwg/url")
- URLSearchParams#sort() (960f607)
	- Arrayと同じく破壊的なsort
- CanIuseだとバージョン毎の変更の対応が分からない
- MDN
	- [URLSearchParams - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams "URLSearchParams - Web API インターフェイス | MDN")
	- 実装されたバージョンごとの違いもでる

	
----

## mixed content - jxck

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">Cookpad緑だよ <a href="https://twitter.com/hashtag/t_wada_sushi?src=hash">#t_wada_sushi</a> <a href="https://t.co/oeWnGMbQ7V">https://t.co/oeWnGMbQ7V</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/823499642016890880">January 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- CookpadもHTTPS化した
- 大きなサイトがhttps化するのは大変
- mixed contentの問題が大きい
	- 広告とか
- 一つでもmixed contentがあるとURLバーがグリーンにならない

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">mixed contentには二種類<br>active mixed content = DOMいじれる<br>passive mixed content = DOMいじれない <a href="https://twitter.com/hashtag/t_wada_sushi?src=hash">#t_wada_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/823499937564348416">January 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- 外れAdガジャ問題	
- 広告配信サービスはHTTPS対応していても、中身の雑な広告があるとmixed contentになってしまうことがある
- HTTP_UPGRADE_INSECURE_REQUESTSについて
- ブラウザに対するHTTPヘッダ
- [Chrome 43でUpgrade Insecure Requestsに対応してた - あすのかぜ](http://d.hatena.ne.jp/ASnoKaze/20150423/1429758051 "Chrome 43でUpgrade Insecure Requestsに対応してた - あすのかぜ")
- [Upgrade Insecure Requests](https://w3c.github.io/webappsec-upgrade-insecure-requests/ "Upgrade Insecure Requests")
- ヘッダを受けて、ブラウザはサブリソースのhttp://へのリクエストを自動でhttps://のものに変更する
	- httpで書いてあってもhttpsとしてリクエストする
	- リクエスト先がhttpsがじゃない場合は見つからないので400になる
	- mixed contentにはならない(httpは400になるので混ざらない)
- mixed contentの問題

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">mixed contetntの問題はmixed contentが起きてるか分からないこと。<br> <a href="https://twitter.com/hashtag/t_wada_sushi?src=hash">#t_wada_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/823502009298882560">January 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [CSP: block-all-mixed-content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/block-all-mixed-content "CSP: block-all-mixed-content") + report-onlyで発見できる
	- CSP: block-all-mixed-contentでmixed contentはblockされる
	- `Content-Security-Policy-Report-Only: policy`
	- [Content Security Policy (CSP) - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP "Content Security Policy (CSP) - HTTP | MDN")
	- `report-only` modeなら実際にはblockされないで、reportだけを遅れる
- [Welcome to report-uri.io](https://report-uri.io/ "Welcome to report-uri.io")
	- UIがダメ、すぐダウンする
	- CSP reportの管理ツールでいいものがまだない
- [Reporting API 1](https://www.w3.org/TR/2016/WD-reporting-1-20160407/ "Reporting API 1")
- クライアントのログ問題

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">XSSがなくてもCSPのinline scriptのreportが来る。<br>Chrome拡張、ブックマークレットとかクライアントはノイズデータが多い <a href="https://twitter.com/hashtag/t_wada_sushi?src=hash">#t_wada_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/823503391577866240">January 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- エラーログ、CSPログなどはノイズが多い


----

## FirefoxのTime-Travel Debugging - kyo_ago

- [Firefox DevTools](http://www.slideshare.net/dynamis/firefox-devtools/39 "Firefox DevTools")
- FirefoxのTime-Travelデバッグがくる?
- ブレークポイント貼って戻して、再現するデバッグ

## Electron - kyo_ago

- Electronのアプリに対してJavaScriptなどをinjectしたい
- ブラウザのウェブサイドはユーザ側からいじれる
- Electronアプリはいじれなくて不便
	
----	

## イベント用の名札シート印刷アプリのCSS - yoshiko

- [イベント用の名札シート印刷アプリ「参加者の名は。」を作った - エンジニアをリングする](http://yoshiko.hatenablog.jp/entry/your-name)
- [参加者の名は。- Name cards generator for events](https://yoshiko-pg.github.io/your-name/)
- CSSで微妙にはみ出る表現の話

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">A4サイズにしつつ、少し常にはみ出すようなCSSを書いた話 <a href="https://twitter.com/hashtag/t_wada_sushi?src=hash">#t_wada_sushi</a> <a href="https://t.co/zZocQrChZq">https://t.co/zZocQrChZq</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/823508811914756096">January 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">CSSで固定比率のスライド <a href="https://twitter.com/hashtag/t_wada_sushi?src=hash">#t_wada_sushi</a> <a href="https://t.co/R8jEe0PBh8">https://t.co/R8jEe0PBh8</a></p>&mdash; よしこ (@yoshiko_pg) <a href="https://twitter.com/yoshiko_pg/status/823516169143365633">January 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">::beforeはその要素の中の先頭、::afterはその要素の中の最後。<br>つまり疑似要素は中にくる <a href="https://twitter.com/hashtag/t_wada_sushi?src=hash">#t_wada_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/823510075260026882">January 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- 疑似要素とmarginが親の横幅を元にする仕様を使った固定比率の話


----

## [Modern JavaScript概観、そしてElectronへ](http://blog.satotaichi.info/modern-javascript_201701/ "Modern JavaScript概観、そしてElectronへ") - taichi

- 皆がよくハマるところを防ぐコードを書いていくとフレームワークは汚くなる
- Angular 2、Vue1, 2はコードがキレイ

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「食べられる泥」 <a href="https://twitter.com/hashtag/t_wada_sushi?src=hash">#t_wada_sushi</a></p>&mdash; Local Proxy (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/823518103015301121">January 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

## その他

- Dart
- rubyのsassは[dart-sass](https://github.com/sass/dart-sass "dart-sass")になった
	- [Announcing Dart Sass « Sass Blog](http://blog.sass-lang.com/posts/1022316-announcing-dart-sass "Announcing Dart Sass « Sass Blog")
- Google社内での再熱

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">Google内部でDartはかなり人気があるし、今でも2か月に一回はリリースされている。確かに公式サイトを見ると、次世代のAdWordsはDartで作られたとある。 <a href="https://t.co/2bKYmskevO">https://t.co/2bKYmskevO</a> <a href="https://twitter.com/hashtag/t_wada_sushi?src=hash">#t_wada_sushi</a></p>&mdash; 太一 (@ryushi) <a href="https://twitter.com/ryushi/status/823541009749422082">January 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">DartはHaxeの立ち位置を目指している? <a href="https://twitter.com/hashtag/t_wada_sushi?src=hash">#t_wada_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/823516011584331776">January 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


- DartのStrongModeは極限まで型推論を頑張るモード
	- V8の[Strong Mode](https://github.com/v8/v8/wiki/Experiments%20with%20Strengthening%20JavaScript#strong-mode "Strong Mode")とはまた異なるもの
- Dart Dev Compilerがでない
	- [Dart SDK Roadmapの進捗状況を確認する - Qiita](http://qiita.com/laco0416/items/04314d034d335bc620ff "Dart SDK Roadmapの進捗状況を確認する - Qiita")
	- [sdk/pkg/dev_compiler at master · dart-lang/sdk](https://github.com/dart-lang/sdk/tree/master/pkg/dev_compiler "sdk/pkg/dev_compiler at master · dart-lang/sdk")

	
----

## 最近やったこと - t_wada

- [unassert-js](https://github.com/unassert-js "unassert-js")
- organizationになった
- power-assertの :star: 200ぐらい増えた
	- 中国の人達が見つけたため
- alibabaとか最近OSSでも活発
	- [alibaba/rax: A universal React-compatible render engine.](https://github.com/alibaba/rax "alibaba/rax: A universal React-compatible render engine.")
- chai to assert
- [twada/chai-to-assert: A jscodeshift codemod that transforms from chai to assert](https://github.com/twada/chai-to-assert "twada/chai-to-assert: A jscodeshift codemod that transforms from chai to assert")
- 元は[any tool to migrate `should/expect` code to `power-assert`? · Issue #74 · power-assert-js/power-assert](https://github.com/power-assert-js/power-assert/issues/74 "any tool to migrate `should/expect` code to `power-assert`? · Issue #74 · power-assert-js/power-assert")のIssue
- chatの構文を調べてる
	- 結構凶悪
- ランタイムに型をチェックして分岐している部分がでてくる
- 静的にはわからないため変換が難しい

```js


// simple referencing
var obj = { foo: 'bar' };
expect(obj).to.have.property('foo');
expect(obj).to.have.property('foo', 'bar');

// deep referencing
var deepObj = {
    green: { tea: 'matcha' }
  , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]
};

expect(deepObj).to.have.deep.property('green.tea', 'matcha');
expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');
```

- http://chaijs.com/api/bdd/#method_property
- wow
- 変換には[facebook/jscodeshift: A JavaScript codemod toolkit.](https://github.com/facebook/jscodeshift "facebook/jscodeshift: A JavaScript codemod toolkit.")を使ってる
	- [substack/node-falafel: transform the ast on a recursive walk](https://github.com/substack/node-falafel "substack/node-falafel: transform the ast on a recursive walk")に近いところもある
- Reactのマイグレーションツールなどでも使われてる
	- フレームワーク側がマイグレーションをするツールとして提供するケース
- Assertionツール同士の変換ツールが色々有る
- 2週ぐらいすると必要なものが残る

----

お疲れ様でした。
