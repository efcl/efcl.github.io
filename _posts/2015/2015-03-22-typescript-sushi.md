---
title: "#typescript_sushi でDecoratorsについて話してきた"
author: azu
layout: post
date : 2015-03-22T21:24
category: イベント
tags:
    - JavaScript
    - ECMAScript
    - TypeScript
    - FlowType

---

[#typescript_sushi](https://twitter.com/search?f=realtime&q=%23typescript_sushi%20%20 "#typescript_sushi")に参加してきました。

ログ: [#typescript_sushi - Togetterまとめ](http://togetter.com/li/798364 "#typescript_sushi - Togetterまとめ") 

- [meta-sushi/guideline](https://github.com/meta-sushi/guideline "meta-sushi/guideline")に則ったイベントです。

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a> <a href="http://t.co/vDgCTuoQWZ">pic.twitter.com/vDgCTuoQWZ</a></p>&mdash; 過激派 (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/579562291722465280">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

---

## [Decorators進捗](http://azu.github.io/slide/typescript-sushi/decorators.html "Decorators進捗") - azu

<blockquote class="twitter-tweet" lang="en"><p>LTきた <a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a> <a href="http://t.co/GgwszUebUg">pic.twitter.com/GgwszUebUg</a></p>&mdash; armorik83 (@armorik83) <a href="https://twitter.com/armorik83/status/579567280423452673">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

TypeScript 1.5で実装予定、ECMAScript 7に提案される予定のそれぞれのDecoratorsについて発表してきました。

行きの電車で書いたの資料なので、大分適当ですが基本的にはどちらも共通するところはあって、一種の糖衣構文的な扱いというところがありそうという話をしました。

- スライド: [Decorators進捗](http://azu.github.io/slide/typescript-sushi/decorators.html "Decorators進捗")

また構文として`@`を使うのですが、それが[zenparsing/es-private-fields](https://github.com/zenparsing/es-private-fields "zenparsing/es-private-fields")とかぶってる問題があって、それは今度のTC30 ミーティングで話されるという話などをしました。

----

- TypeScriptの内部モジュールの問題
	- 出てきた当時は他がなかった
	- 現状、他のエコシステムと内部モジュールが相性よくない
	- TypeScriptで完結するなら内部モジュールが良い
	- 今はES6 modulesなどを実装が進んでいる
	- 上手く移る道筋が欲しい
	- このまま内部モジュールをずっと抱えるのはリスク


## TypeScript vs FlowType - teppeis

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a> tsとflowtypeの違い <a href="http://t.co/Yl94xKbdbI">pic.twitter.com/Yl94xKbdbI</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/579574073249787904">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- FlowTypeとTypeScriptの違い
- `this`への型付けがFlowTypeだとできる
- TypeScriptとFlowTypeは型キャストの仕方が違う。 
	- `<type>variable` と `(variable : type)`
- 互換性がある部分
	- d.ts、型の書き方、es6 modules
- d.tsは誰の資産なのかという話

<blockquote class="twitter-tweet" lang="en"><p>.d.tsは汎用的な規格になるのかTypeScript界のものなのか <a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a></p>&mdash; armorik83 (@armorik83) <a href="https://twitter.com/armorik83/status/579575850166685696">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- flowtypeはOcaml
- ビルドするのにも大変

----

- PhantomJSとE2Eテスト
- PhantomJSにハマりどころが多すぎるので安定するまで待つ派
- そもそもChrome+WebDriver APIで動かす派

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a> 「PhantomJS2がちゃんとできるまで、E2Eテストしない」</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/579591165739061248">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- モジュールサイズの話
	- [npmにライブラリをアップロードするときに.npmignoreで生成物を公開/制限するパターン - Qiita](http://qiita.com/mizchi/items/bf2da480b0a7f216ba78 "npmにライブラリをアップロードするときに.npmignoreで生成物を公開/制限するパターン - Qiita")
	- `files` フィールドを使おう
- Atom-Shellアプリを配布する話
	- アプリ内では全部devDependencies
	- 配布するビルドにbrowserifyしたものを同梱する

	
### async/await

- async/await使いたいからBabelを使いたいという話
	- [JavaScript - ES7 の Async/Await を使ってみた - Qiita](http://qiita.com/mohayonao/items/435665065d997a4cc50c "JavaScript - ES7 の Async/Await を使ってみた - Qiita")
	- まだ仕様は安定ではない
	- https://github.com/jhusain/asyncgenerator
	- [flux-comparison/flummox/](https://github.com/voronianski/flux-comparison/tree/master/flummox "flux-comparison/flummox/")はこれを上手く使ったサンプル
- TypeScriptでも1.6で予定されてる
	- Babelはexperimentalフラグが必要
	- TypeScriptは一度入れると仕様の追従が難しいからどうなのか?
	- 1.5でDecoratorsを入れるのはそういう意味で不安

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a> 1.6でasync/await  &quot;Roadmap · Microsoft/TypeScript Wiki&quot;  <a href="https://t.co/Zmc4iHQpDF">https://t.co/Zmc4iHQpDF</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/579594341280190464">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a> Babelは実験的フラグなのでasyncの構文が変わったら追従して変わるけどTypeScriptはメジャーバージョンじゃないと後方互換性を変えれないので、変更できない。&#10;なのでTypeScriptにasync/awaitを1.xで入れるのは微妙</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/579595070657077248">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- ES6とTypeScriptの仕様
- TypeScriptはECMAScriptのsupersetを目指しているので、二重に同じ事を定義してないという話

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a> TypeScriptの仕様はES6の仕様に定義されてることは二重に定義してない。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/579595267403464704">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- TypeScriptの平和を守ってるテスト
	- [@sheetalkamat](https://github.com/sheetalkamat "sheetalkamat")が大量に書いている

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a> 噂の彼女のコミット  &quot;Commits · Microsoft/TypeScript&quot;  <a href="https://t.co/J23bzpHCMa">https://t.co/J23bzpHCMa</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/579598114119503872">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


----


<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a> package.jsonとかgulpfileを公開する文化が欲しい。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/579607674116972545">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- 他の人のpackage.jsonとかをもっと見たい
- 社内プロジェクトのGemfileを公開するみたいな感じのをnpmでもやったらどうか
	- [Raw Gemfile on Idobata (master - 5adeddb)](https://gist.github.com/kakutani/43b9f42197ab002fcdf8 "Raw Gemfile on Idobata (master - 5adeddb)")
- package.jsonやgulpfileを公開して記事にする


---

- [The State of Grunt](http://cowboy.github.io/state-of-grunt-fe-summit-2014-talk/#1 "The State of Grunt")
	- GruntがgulpみたいなStreamサポートする話はどこいったのか
- GruntのAuthorのコミットが止まってる話
	- [Commits · gruntjs/grunt](https://github.com/gruntjs/grunt/commits/master "Commits · gruntjs/grunt")
- gulpはstreamだから早いのではなくて、中間ファイルを吐かない(I/Oが最小限)ので早い。
- [wearefractal/vinyl-fs](https://github.com/wearefractal/vinyl-fs "wearefractal/vinyl-fs") というファイルの抽象レイヤーによる効力

----

## その他

<blockquote class="twitter-tweet" lang="en"><p>「typescriptの利点は2年後でも同じ知識が流用できる点で、typescriptの欠点は2年後でも同じ知識で開発しなければならないこと」 <a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a></p>&mdash; 過激派 (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/579611182203457536">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- TypeScriptとエコシステム
	- AST、Node modules、内部モジュールの問題
- BabelとES6+
	- experimental、高速実装、sebmck氏
	- Babelはsebmck氏が単一障害点になるかもしれないけど、超高速実装
- FlowType
	- Facebookユースケース、期待半分不安半分、Reactとの相乗

のような話が中心でした。

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/typescript_sushi?src=hash">#typescript_sushi</a>  sebmckの正体 <a href="https://t.co/4XNPSICCEY">https://t.co/4XNPSICCEY</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/579571446483042304">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
