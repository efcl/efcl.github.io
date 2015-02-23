---
title: "[2015-02] 最近のJavaScript AST"
author: azu
layout: post
date : 2015-02-21T11:54
category: JavaScript
tags:
    - AST
    - JavaScript

---

以前書いた記事からのどんな感じの動きがあったのかまとめたものです。


前回のに比べ、JavaScriptのエコシステムの根幹でもあるパーサやASTの仕様まわりについての動きが最近活発なので、その辺を中心にまとめています。


## [RReverser][]

[RReverser][]さんはここ最近のJavaScript ASTに関係するところならどこでもみかけると思うので紹介。
主にacornのコミッターでもありますが、後ほど出てくるESTreeやBabelなど色々なところで活動しています。

また[aster][]というASTの効率的に処理できるツールチェインを出したりしています。

AST周りでよく見る人やパーサをいかにまとめてあります。

- [JavaScript AST Links](https://gist.github.com/azu/a44cc817c233c53a496c)

## [estools](https://github.com/estools/)

estoolsはASTを使って作るツールを補助するライブラリなどをまとめたGitHub Organizationです。

元々はConstさんが色々作ってたツールのリポジトリをまとめたいという話になってできたものです。

<blockquote class="twitter-tweet" lang="en"><p>escodegen の module とか esutils とかどっか organization に移したいんですけど, なんかいい名前募集で</p>&mdash; utatane (@Constellation) <a href="https://twitter.com/Constellation/status/536158120393723905">November 22, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## [6to5][]

もう大分使われるようになってきて有名ですが、6to5(現Babel)が出てきたのが2014年10月8日ごろです。

<blockquote class="twitter-tweet" lang="en"><p>ES6のコードをランタイムなしのES5に変換するツール。&#10;SourceMap対応、BrowserifyからGrunt等のpluginが用意されてる。&#10;他のES6コード変換との比較表も載せている &quot;sebmck/6to5&quot; <a href="https://t.co/iATEMW1fHk">https://t.co/iATEMW1fHk</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/519852785982898176">October 8, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
	
大体初日に20コぐらいissueとか立てたり立ったりしましたが、その日のうちに全部closeされるようなスピードでした。
Babelとなった今でもそのペースが落ちずに進んでいるので、すごい勢いで開発されてることがわかると思います。

## [Espree][]

[Espree][]は[ESLint](http://eslint.org/ "ESLint")プロジェクトでES6対応やJSXのオプショナルサポートするためにEsprimaをフォークしたものです。

この頃(2014年12月) Esprimaは動きが遅かったのと、ES6の対応はHarmonyブランチで行われていましたが[Comment Attachのアルゴリズムの違い](https://github.com/jquery/esprima/issues/1024 "Revert comment attachment to 1.2 behavior? · Issue #1024 · jquery/esprima")もあって、masterブランチのforkとして作成が開始されました。(Esprima 2.0でHarmonyはmasterにマージされています)

ESLintはASTだけではなく少し細かい単位のtokenなどにも依存したLintを行っているため、acornなど別のパーサへの移行する子が難しいのでforkした感じでした。

なぜforkしたのかは[espreeのREADME](https://github.com/eslint/espree "eslint/espree")や[[2015-01] 最近のASTパーサの動き](http://azu.github.io/slide/crosushi/shift-ast.html "最近のASTパーサの動き")などを見てみるといいかと思います。

基本的にはEsprimaのASTを互換性を持ちながら、ES6のサポートなどを追加していっています。
(Esprimaが活性化しだしたので、相互的な影響があるissueが最近増えている感じです)

- [Add ECMAScript 6 features · Issue #10 · eslint/espree](https://github.com/eslint/espree/issues/10 "Add ECMAScript 6 features · Issue #10 · eslint/espree")

## [Shift AST Specification](https://github.com/shapesecurity/shift-spec "Shift AST Specification")

- [Announcing the Shift JavaScript AST Specification](http://engineering.shapesecurity.com/2014/12/announcing-shift-javascript-ast.html "Announcing the Shift JavaScript AST Specification")
- [A Technical Comparison of the Shift and SpiderMonkey AST Formats](http://engineering.shapesecurity.com/2015/01/a-technical-comparison-of-shift-and.html "A Technical Comparison of the Shift and SpiderMonkey AST Formats")

Esprimaの[@AriyaHidayat](https://twitter.com/AriyaHidayat "@AriyaHidayat")や[CoffeeScriptRedux](https://github.com/michaelficarra/CoffeeScriptRedux "CoffeeScriptRedux")の[@michaelficarra](https://github.com/michaelficarra "michaelficarra")がいる[Shape Security](https://github.com/shapesecurity "Shape Security")からShift ASTというASTの仕様策定と実装が公開されました。

基本的には、Esprimaなどで使われていてデファクトだった[SpiderMonkey AST](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API "Parser API - Mozilla | MDN")から変換できる程度にはベースは同じですが、ES6などの対応を含め進められています。(まだ進行中の仕様です)

Shift ASTの仕様策定、パーサ、ジェネレータ、バリデータ、SpiderMonkey ASTからの変換ツール、Javaの実装が公開されています。

- [ES6: Add support for ES6 · Issue #8 · shapesecurity/shift-parser-js](https://github.com/shapesecurity/shift-parser-js/issues/8 "ES6: Add support for ES6 · Issue #8 · shapesecurity/shift-parser-js")

SpiderMonkey ASTはもともとFirefoxのJavaScriptエンジンであるSpiderMonkeyの内部表現として始まったため、ツールとして扱うASTとしては微妙な部分などが存在しました。

詳しくは[This doesn&#39;t exist already?](http://engineering.shapesecurity.com/2014/12/announcing-shift-javascript-ast.html "This doesn&#39;t exist already?")にかかれていますが、その扱いにくくなっているASTの部分の整理などをする目的もあります。

「SpiderMonkey ASTからShift ASTに乗り換えるべきなの?」という疑問も生まれるかもしれませんが、現在ある意味安定してるSpiderMonkey ASTを扱った方がツール間の連携も上手くいくので、実験目的以外ならShift ASTをまだ使う理由はないと思います。

まだ進行中の仕様なので実験してIssueとかを立てたりするのは、歓迎されると思うので後述する[ESTree][]と共に見ていくのがいいと思います。

## [jQuery Foundation adopts Esprima | Official jQuery Blog](http://blog.jquery.com/2015/01/26/jquery-foundation-adopts-esprima/ "jQuery Foundation adopts Esprima | Official jQuery Blog")
## http://azu.github.io/slide/crosushi/shift-ast.html
- ----- ここまで復習 -----
## jQuery Foundationの手腕
## [ESTree][]

SpiderMonkey ASTと同じものだと思ってもらって問題ないですが、SpiderMonkey ASTはMDNのドキュメントはコラボレーションで更新しにくいので、GitHubで策定(整理)が進められているASTの仕様です。

SpiderMonkey ASTじゃなくてESTreeという名前になってるのには、あまり大きな意味はなくて単純にSpiderMonkeyの内部表現以外でも使われる仕様ということなので、ESTreeという名前に変わった感じだと思います。

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/rauschma">@rauschma</a> Note that this is not a &quot;new&quot; standard, but simply the original SpiderMonkey standard (<a href="https://t.co/LObMtM6xEq">https://t.co/LObMtM6xEq</a>) now on Github.</p>&mdash; Michael Ficarra (@jspedant) <a href="https://twitter.com/jspedant/status/567037276450848768">February 15, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


## ESTreeとShift ASTの目的の違い
## [Babel][] - [babel/acorn-babel](https://github.com/babel/acorn-babel "babel/acorn-babel")
## おまけ: [mdast][]

[RReverser]: https://github.com/RReverser  "RReverser (Ingvar Stepanyan)"
[aster]: https://github.com/asterjs  "aster"
[6to5]: http://6to5.org/ "6to5"
[Espree]: https://github.com/eslint/espree  "eslint/espree"
[ESTree]: https://github.com/estree/estree  "estree/estree"
[Babel]: https://babeljs.io/  "Babel · The transpiler for writing next generation JavaScript"
[mdast]: https://github.com/wooorm/mdast  "wooorm/mdast"