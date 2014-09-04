---
title: "多段SourceMapの実現方法とライブラリ"
author: azu
layout: post
date : 2014-09-03T08:04
category: JavaScript
tags:
    - JavaScript
    - Browser
    - SourceMap
    - library

---

## Source Map

SourceMapとは何かについては以前、[Source Mapを扱う関連ライブラリのまとめ](http://efcl.info/2014/0622/res3933/ "Source Mapを扱う関連ライブラリのまとめ")にて紹介しました。

### Source Mapとは

*   [Source Map Revision 3 Proposal &#8211; Google ドキュメント][2] 
    *   SourceMap仕様
*   [#JSオジサンで Source Map について話してきました : document][3] 
    *   SourceMap概要
*   [JavaScriptのSource Mapの内部表現について][4] 
    *   Base64の`mappings`部分の仕組み
    *   [source-map-visualization][5] ビジュアライズツール
*   [mozilla/source-map](https://github.com/mozilla/source-map "mozilla/source-map")
    *   SourceMapのコアと言えるモジュール(色々なモジュールが使う)
    
SourceMapはAltJS等からJavaScriptへの変換など、Original Code -> Generated Codeへと変換する時に、
変換後のファイルから、変換前のファイルの該当する場所(Line numberとColumn)をたどるための情報が入った
マッピングファイルです。

![basic-sourcemap.png](http://efcl.info/wp-content/uploads/2014/09/basic-sourcemap.png)

変換後のコードと変換前のコードの位置関係を参照できるので、SassやCoffeeScriptやTypeScript等のデバッグに使われていますね。

### 多段SourceMap(Multi-level SourceMap)とは

仕様書のNOTE部分にも書いてありますが、現在の仕様では以下のような複数回の変換を経由した時の標準的な仕組みは存在していません。

![multiple-sourcemap.png](http://efcl.info/wp-content/uploads/2014/09/multiple-sourcemap.png)

例えば、CoffeeScriptで書いて(Original)、それをJavaScriptに変換して(Generated)、さらにそれを圧縮した(Minified)時などが該当します。

この場合、圧縮したコードから、元のCoffeeScriptのコードの対応関係をそのままだと見ることが出来ません。
(例としてMinifiedなどとしていますが、これはSourceMapを生成する変換なら何でもいいです。テンプレートの変換やConcatも同じです)

多段SourceMapについては仕様上のサポートがないので、現状をまとめると以下のような感じですね。

- 圧縮したコード(Minified)から、変換されたJS(Generated)のSourceMapはある
- 変換されたJS(Generated)からCoffeeScript(Original)のSourceMapはある
- 圧縮したコード(Minified)からCoffeeScript(Original)のSourceMapがない

### [multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "multi-stage-sourcemap")

> 圧縮したコード(Minified)からCoffeeScript(Original)のSourceMapがない

先ほどの図から想像できると思いますが、中間のそれぞれのSourceMapは存在しているため、Minified -> Original というSourceMapを作ることは容易だと分かりますね。

これを行うのモジュールとして [multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "multi-stage-sourcemap") というものを作りました。

中間の2つのSourceMapを使って、Minified -> OriginalというジャンプしたSourceMapを作ることが出来ます。

つまり、最初と最後だけを繋いだSourceMapを作り直すだけです。

![multiple-stage-sourcemap.png](http://efcl.info/wp-content/uploads/2014/09/multiple-stage-sourcemap.png)

これは、仕様書のNOTEで中間地点の情報は失うけど簡単な方法として書かれています。

> The easy but lossy way is to ignore the intermediate steps in the process for the purposes of debugging, the source location information from the translation is either ignored (the intermediate translation is considered the “Original Source”) or the source location information is carried through (the intermediate translation hidden).  - [Source Map Revision 3 Proposal ](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit# "Source Map Revision 3 Proposal - Google ドキュメント")

自分も仕様見る前に[多分出来るんだと思ってた](http://twitter.com/azu_re/status/453839139348041728)ので、それの[Proof of concept](http://ja.wikipedia.org/wiki/%E6%A6%82%E5%BF%B5%E5%AE%9F%E8%A8%BC "Proof of concept")として作りました。([探した](http://efcl.info/2014/0622/res3933/ "Source Mapを扱う関連ライブラリのまとめ")のですが何故か汎用的なものがなかった)

先ほどの例であげている圧縮に関しては[UglifyJS2](http://www.thecssninja.com/JavaScript/multi-level-sourcemaps ". UglifyJS2")が同様の実装をしています。

### ユースケース

汎用的なものがなかったのは、この多段SourceMapが必要な状況に遭遇するケースが少なかったからかもしれません。

幾つかユースケースをあげておきます。

- AltJS -> JavaScript -> 圧縮.js
	- 例に上げている一番遭遇するパターン
	- [UglifyJS2](http://www.thecssninja.com/JavaScript/multi-level-sourcemaps ". UglifyJS2")は対応済み、[esmangle](https://github.com/Constellation/esmangle "esmangle")等も [multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "multi-stage-sourcemap")のような仕組みを使えば対応できる
- AltJS + [power-assert](https://github.com/twada/power-assert "power-assert")
	- power-assert は用意されてテストコードを変換し、テストが失敗した時に分かりやすい情報が出せるようにしている。
	- そのため、AltJSで書いたものを利用する場合はAltJS -> JavaScript -> power-assert化されたコードとなる
	- [power-assert 0.9.0](https://github.com/twada/power-assert/releases/tag/v0.9.0 "power-assert 0.9.0") にて多段SourceMapに対応した
	- 実際にGrunt、Gulp、Browserify、モジュールで多段SourceMapの対応する方法については[power-assert 多段 SourceMap 対応の方針](https://gist.github.com/twada/103d34a3237cecd463a6 "power-assert 多段 SourceMap 対応の方針")を参照
- ES6 -> ES5 -> [Spy-js](http://qiita.com/laco0416/items/985044f0019ebef6cb2c "Spy-js")
	- ES6で書いたコードをES5で動くように変換したものをspy-jsでプロファイリングするときに有用です。
	- [Spy-js](http://qiita.com/laco0416/items/985044f0019ebef6cb2c "Spy-js")はJavaScriptのコードをプロファイリングするために、計測用の関数を仕込んだ形に変換してから実行しています。
	- AltJS -> JS -> instrument.js という感じです。
- AltJS -> JavaScript -> コードカバレッジ
	- 思いついただけ
- テンプレート + JS -> 圧縮
	- 一般的にはテンプレートとJSを一緒に変換する(BrowserifyやWebPack等)ので、問題ない
	- ただ、テンプレートをJSとして変換済みのものを用意して、concatして、それを圧縮したいとなった場合、元のテンプレートへの参照には多段SourceMapが必要かも

## おわりに

SourceMapにおける多段SourceMap(Multi-level SourceMap)が必要になる状況とその解決方法の一つを提供する[azu/multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "azu/multi-stage-sourcemap")について紹介しました。

[multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "azu/multi-stage-sourcemap") はAPIがイマイチ(パラメータの名前がどっちがわかりにくい)なので、BREAKING CHANGEレベルのContributingも募集しています。

実際に[multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "azu/multi-stage-sourcemap")を使った実装については以下を参照するといいと思います。

- [power-assert 多段 SourceMap 対応の方針](https://gist.github.com/twada/103d34a3237cecd463a6 "power-assert 多段 SourceMap 対応の方針")
- [twada/battlefield-sourcemaps](https://github.com/twada/battlefield-sourcemaps "twada/battlefield-sourcemaps")


 [2]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit "Source Map Revision 3 Proposal - Google ドキュメント"
 [3]: http://imaya.blog.jp/archives/7169783.html "#JSオジサンで Source Map について話してきました : document"
 [4]: http://safx-dev.blogspot.jp/2013/08/javascriptsource-map.html "JavaScriptのSource Mapの内部表現について"
 [5]: http://sokra.github.io/source-map-visualization/ "ビジュアライズ"
 
