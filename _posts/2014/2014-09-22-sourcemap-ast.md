---
title: "多段SourceMapとASTの現状について話してきた"
author: azu
layout: post
date : 2014-09-22T23:25
category: イベント
tags:
    - イベント
    - JavaScript
    - SourceMap
    - AST
    - testing

---


ConstさんがWebKitにコミットしてたCSS JIT入りのiOS8リリースがされたのを記念して@Constellationさんと@saneyuki_s さんと[#DOMQuery寿司](http://togetter.com/li/722602 "#DOMQuery寿司")をしてきました。

元ネタは以下の記事です。

- [Apple Shows Love for HTML5 with iOS 8 | Blog | Sencha](http://www.sencha.com/blog/apple-shows-love-for-html5-with-ios-8 "Apple Shows Love for HTML5 with iOS 8 | Blog | Sencha")
- [iOS 8 に Apple の HTML5 への愛を見た | 株式会社ゼノフィ](https://www.xenophy.com/sencha-blog/11578 "iOS 8 に Apple の HTML5 への愛を見た | 株式会社ゼノフィ")

## SourceMapとASTの問題点

<blockquote class="twitter-tweet" lang="en"><p>これが <a href="https://twitter.com/hashtag/DOMQuery%E5%AF%BF%E5%8F%B8?src=hash">#DOMQuery寿司</a> です <a href="http://t.co/o4qpKqrKYT">pic.twitter.com/o4qpKqrKYT</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/513999410615689216">September 22, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

一つ目の献立として発表したのは、SourceMapとASTでちょっと似てるなーと思った問題点の話について。
前半の多段SourceMapについては以下の記事で書いた話と大体同じです。

- [多段SourceMapの対応方法とライブラリ | Web Scratch](https://efcl.info/2014/09/03/multi-stage-sourcemap/ "多段SourceMapの対応方法とライブラリ | Web Scratch")

発表に使ったスライドは [https://azu.github.io/slide/DOMQuery/sourcemap.pdf](http://azu.github.io/slide/DOMQuery/sourcemap.pdf "sourcemap.pdf") です。


![basic-sourcemap.png](https://efcl.info/wp-content/uploads/2014/09/basic-sourcemap.png)

標準的なSourceMapの使い方なら何も問題はありません。

![multiple-sourcemap.png](https://efcl.info/wp-content/uploads/2014/09/multiple-sourcemap.png)

ただし、これが複数回の変換した結果できたファイルでは、最初(Original)と最後(Generated)を繋ぐSourceMapがありません。

![page-8](https://efcl.info/wp-content/uploads/2014/09/sourcemap-8.png)

そのため、AltJSなどを使った場合にこの問題が起きることがあります。

![multiple-stage-sourcemap.png](https://efcl.info/wp-content/uploads/2014/09/multiple-stage-sourcemap.png)

これを汎用的に解決するために [multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "multi-stage-sourcemap") というライブラリをつくりました。

![page-12](https://efcl.info/wp-content/uploads/2014/09/sourcemap-12.jpg)

 [multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "multi-stage-sourcemap") は中間にあるSourceMapを使って新しく最初と最後を結ぶSourceMapを作り直すためのライブラリです。
 
![page-19](https://efcl.info/wp-content/uploads/2014/09/sourcemap-19.png)
 
中間情報は失ってしまいますが、そもそもSourceMapに世代の情報があればこの問題は解決できたかもしれません。
現状ではGruntやGulpやBrowserify等それぞれの対応方法が必要となってしまっています。

![page-20](https://efcl.info/wp-content/uploads/2014/09/sourcemap-20.png)

SourceMapは**SourceMap**という単一のファイルは仕様として定められていますが、それが連続的に変換された時に関する扱いについては取り決めがないという問題があります。

![page-22-ast](https://efcl.info/wp-content/uploads/2014/09/sourcemap-22.png)

同じような問題?がJavaScript ASTにも存在します。

JavaScript ASTを扱うライブラリ同士(結合や圧縮等)を繋げて使おうとしてた時に、多くのライブラリはコードを受け取りコードを返すAPIを提供しています。

コードを受け取りコードを返す場合、変換する毎にcode parseとcode generateが必要になってしまうため非効率です。

![page-23](https://efcl.info/wp-content/uploads/2014/09/sourcemap-23.png)

現状のGruntやGulp、Browserifyではこの問題がまだ解決出来ていません。

![fit](http://monosnap.com/image/MQJmxXkCRlIvOzq5x0bzyoytP5zZOl.png)

Gruntではファイル読み込み->パース->変換->コード生成->ファイルに書き出しというサイクルが取られます。

![fit](http://monosnap.com/image/kQhPiCykxgEsNZnr4CAYhDUjpw60YO.png)

GulpやBroserifyでは、Gruntからファイルの読み込みと書き出しを最初と最後の一度だけにすることで効率化していますが、パースとコード生成は毎回それぞれのプラグイン間で行われています。

![fit](http://monosnap.com/image/9iwjh67u7SxayeMmmqTePdohvwGC0k.png)

それを解決しようとして作られているのが[aster - AST-based code builder](http://rreverser.com/aster-ast-based-code-builder/ "aster - AST-based code builder")です。

[aster](http://rreverser.com/aster-ast-based-code-builder/ "aster - AST-based code builder")ではそれぞれのプラグインはASTを受け取り、変換したASTを返すだけとなっています。

そのため、毎回パースやコード生成をする必要ななくなるというチェーンを提供するためのビルドツールです。

[Broccoli](https://github.com/broccolijs/broccoli "Broccoli")が効率的なビルドを目指すツールと同じように、[aster](http://rreverser.com/aster-ast-based-code-builder/ "aster - AST-based code builder")も効率的なASTの変換を目指すツールと言えるかもしれません。

![page-27](https://efcl.info/wp-content/uploads/2014/09/page-27.png)

しかし、現実的には"ASTを受け取り、ASTを返す"というAPIを公開していないモジュールも見られます。これは明確なメリットが見えていない現状だと仕方ないのかもしれません。

このようにASTを連続的に扱う場合にもそれを扱う定番的な方法が決まっていないため、あやふやな状態が出てくるのが多段SourceMapと似ているねという話をしてきました。
(AST自体も[Parser API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API "Parser API")がベースとなっているだけで、細かい所に扱いの違いがあります - 主にES6)

#### その他

- 最近(ES6)のASTってどうなの?
	- [Escodegen](https://github.com/Constellation/escodegen "Escodegen")最近色々対応作業してるよ
	- 要望色々くる
- [Parser API - Mozilla | MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API "Parser API - Mozilla | MDN")ってどうなの?
	- 結構ラフなドキュメント
	- `Reflect` ちゃんと実装されてないのでは…
	- ドキュメントがここにしかないのでここを参照してる
	- 他の所にドキュメントを写してやった方がいいのかも
- [ES6のスケジュールが遅れた](http://www.2ality.com/2014/06/es6-schedule.html "The ECMAScript 6 schedule changes")のって結局何が原因?
	- module! module!
	- Acornとかesprima-fbとかもASTがバラバラだし、どれも最終案とは違う…
	- これでfinal!? [ECMAScript 6 modules: the final syntax](http://www.2ality.com/2014/09/es6-modules-final.html "ECMAScript 6 modules: the final syntax")

## power-assertのデモサイトを作った話

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/DOMQuery%E5%AF%BF%E5%8F%B8?src=hash">#DOMQuery寿司</a> power-assert デモについて <a href="http://t.co/vep82qnyEJ">pic.twitter.com/vep82qnyEJ</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/514007886825938944">September 22, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

一昨日ぐらいに[power-assert playground](http://azu.github.io/power-assert-demo/ "power-assert playground")というクライアントサイドで、power-assertのテストを動かせるデモサイトを作った話を軽くしました。(立ち話レベル)

発表に使ったスライドは[https://azu.github.io/slide/DOMQuery/power-assert-in-browser.pdf](http://azu.github.io/slide/DOMQuery/power-assert-in-browser.pdf "power-assert-in-browser.pdf")です。


これは以下のような構成で作られているサイトです。

- Editor - [CodeMirror](http://codemirror.net/ "CodeMirror")
- Component - [Ractive.js](http://www.ractivejs.org/ "Ractive.js")
- Event manager - [Ractive.js](http://www.ractivejs.org/ "Ractive.js")
- power-assert化 - [espower-source](https://github.com/twada/espower-source "espower-source")
- Test Runner - [Mocha](http://visionmedia.github.io/mocha/ "Mocha")

このサイトは、すべてクライアントサイドで変換からテストの実行までをやっています。

[espower-source](https://github.com/twada/espower-source "espower-source")ではコードを受け取りpower-assert化したコードを返すので、これをiframeのsrcdocにmochaを使ったrunner htmlを埋め込んで実行させています。

srcdocにはiframeの中で表示するHTMLコードをそのまま入れて表示出来ます。

`srcdoc` つまりiframeで実行する事で実行時の変数の漏れなどを無くすようにしています。(そのため多分IEだと動かない)

また全体的なcomponentやイベントは[Ractive.js](http://www.ractivejs.org/ "Ractive.js")を使って書いていて、[Browserify](http://browserify.org/ "Browserify")を使ってビルドしています。

Ractive.jsはVue.jsを使った事がある人は大体似たような感覚があるかもしれませんが、[Components](http://docs.ractivejs.org/latest/components "Components")ではテンプレート([Mustache](http://docs.ractivejs.org/latest/mustaches "Mustache")ベース)とCSS文字列を指定できます。

例えば、Editorは[power-assert-demo/app/component/editor at master · azu/power-assert-demo](https://github.com/azu/power-assert-demo/tree/master/app/component/editor "power-assert-demo/app/component/editor at master · azu/power-assert-demo")のようにcomponentを作って利用しています。

- `js-editor-component.js`
- `js-editor-component.js.hbs`

という感じのファイルにしていて、これは以下のように書くことでcomponentのjsからテンプレートファイルを読み込んでインライン化できるためです。(ファイルのインライン化には[brfs](https://github.com/substack/brfs "brfs")を使います)

```javascript
template: require("fs").readFileSync(__filename + ".hbs", "utf-8"),
```

Node.jsスタイルでスッキリ書きやすいので最近色々試している感じです。
イベント周りも子のcomponentに対して貼ったりできるので、結構柔軟に行けそうな気がします。(まだcomponentのテストどうやるのかがよくわかってない)

後、さきほどの[Mustache](http://docs.ractivejs.org/latest/mustaches "Mustache")テンプレートをベースにした最近話題の[virtualdom](https://github.com/ractivejs/ractive/tree/dev/src/virtualdom "virtualdom")実装を持っていることも面白いかもしれません。

### その他

- Vue.js データバインディングのため大量のdataを入れるとそこで処理に時間がかかる
	- 別途管理するのが必要なのかも
	- Flux - [Fluxxor - Home](http://fluxxor.com/ "Fluxxor - Home"), [deloreanjs/delorean](https://github.com/deloreanjs/delorean "deloreanjs/delorean")
	- ractiveは選択式で、データバインディングに選択肢欲しい
- データバインディング系に[Infinite scroll | Examples | Ractive.js](http://examples.ractivejs.org/infinite-scroll "Infinite scroll | Examples | Ractive.js")のデモが欲しい
- Reactの話
	- 設計とかもコメントに大量に書いてある
	- テストのためのコードとかとても冗長
	- C++のコードをJavaScriptに移植したっぽいコード
	- 内部的にflow(FB社が今月末に発表する型チェックツール)のアノテーションついたバージョン持ってそう
- [virtual-dom](https://github.com/Matt-Esch/virtual-dom "virtual-dom")の話
	- コメント無くて分かりにくい、でも短い
	- [Performance Calendar » React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/ "Performance Calendar » React’s diff algorithm")とかみて趣味で実装したっぽい
	- 実用される事は最初頭になかったのでは

	
## その他のその他

- CSS `:visited`
	- [Preventing attacks on a user&#39;s history through CSS :visited selectors](http://dbaron.org/mozilla/visited-privacy "Preventing attacks on a user&#39;s history through CSS :visited selectors") に書かれてないケースを解読
	- `:visited + *` と `a:visited a:visited`のケース
	- `visited` が getComputedStyle から読めないのと2状態の関係
	- [Bug 135639 – CSS: Refactor :visited handling in SelectorChecker](https://bugs.webkit.org/show_bug.cgi?id=135639 "Bug 135639 – CSS: Refactor :visited handling in SelectorChecker")
- CSS `:has`の問題
	- `:has`がでてきたら下からたどってきたものを、もう一度下まで辿り直さないといかない(非効率…)
	- 上手い対処法について考える
	- :has :has がネストするケースの問題…
	- Specレベルの問題なのでは

<!--	- `visited` が getComputedStyle から読めないのは、それぞれのnodeごとにvisitedに該当する/しないのパターンで持っていて、getComputedStyleはしないパターンから引くので原理的にvisitedを得ることはない-->
