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

Espreeがリリースされた頃(2014年12月6日) Esprimaは動きが遅かったのと、ES6の対応はHarmonyブランチで行われていましたが[Comment Attachのアルゴリズムの違い](https://github.com/jquery/esprima/issues/1024 "Revert comment attachment to 1.2 behavior? · Issue #1024 · jquery/esprima")もあって、masterブランチのforkとして作成が開始されました。(Esprima 2.0でHarmonyはmasterにマージされています)

ESLintはASTだけではなく少し細かい単位のtokenなどにも依存したLintを行っているため、acornなど別のパーサへの移行する子が難しいのでforkした感じでした。

なぜforkしたのかは[espreeのREADME](https://github.com/eslint/espree "eslint/espree")や[[2015-01] 最近のASTパーサの動き](http://azu.github.io/slide/crosushi/shift-ast.html "最近のASTパーサの動き")などを見てみるといいかと思います。

基本的にはEsprimaのASTを互換性を持ちながら、ES6のサポートなどを追加していっています。
(Esprimaが活性化しだしたので、相互的な影響があるissueが最近増えている感じです)

- [Add ECMAScript 6 features · Issue #10 · eslint/espree](https://github.com/eslint/espree/issues/10 "Add ECMAScript 6 features · Issue #10 · eslint/espree")

## [Shift AST Specification](https://github.com/shapesecurity/shift-spec "Shift AST Specification")

- [Announcing the Shift JavaScript AST Specification](http://engineering.shapesecurity.com/2014/12/announcing-shift-javascript-ast.html "Announcing the Shift JavaScript AST Specification")
- [A Technical Comparison of the Shift and SpiderMonkey AST Formats](http://engineering.shapesecurity.com/2015/01/a-technical-comparison-of-shift-and.html "A Technical Comparison of the Shift and SpiderMonkey AST Formats")

Esprimaの[@ariya](https://github.com/ariya "ariya")や[CoffeeScriptRedux](https://github.com/michaelficarra/CoffeeScriptRedux "CoffeeScriptRedux")の[@michaelficarra](https://github.com/michaelficarra "michaelficarra")がいる[Shape Security](https://github.com/shapesecurity "Shape Security")からShift ASTというASTの仕様策定と実装が2014年12月23日に公開されました。

基本的には、Esprimaなどで使われていてデファクトだった[SpiderMonkey AST](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API "Parser API - Mozilla | MDN")から変換できる程度にはベースは同じですが、ES6などの対応を含め進められています。(まだ進行中の仕様です)

Shift ASTの仕様策定、パーサ、ジェネレータ、バリデータ、SpiderMonkey ASTからの変換ツール、Javaの実装が公開されています。

- [ES6: Add support for ES6 · Issue #8 · shapesecurity/shift-parser-js](https://github.com/shapesecurity/shift-parser-js/issues/8 "ES6: Add support for ES6 · Issue #8 · shapesecurity/shift-parser-js")

SpiderMonkey ASTはもともとFirefoxのJavaScriptエンジンであるSpiderMonkeyの内部表現として始まったため、ツールとして扱うASTとしては微妙な部分などが存在しました。

また、SpiderMonkey ASTはES6への対応やドキュメントが更新が疎かになっていたため、各パーサがES6対応をする際に参照するものがなかったのもひとつの理由です。

詳しくは[This doesn&#39;t exist already?](http://engineering.shapesecurity.com/2014/12/announcing-shift-javascript-ast.html "This doesn&#39;t exist already?")にかかれていますが、その扱いにくくなっているASTの部分の整理などをする目的もあります。

「SpiderMonkey ASTからShift ASTに乗り換えるべきなの?」という疑問も生まれるかもしれませんが、現在ある意味安定してるSpiderMonkey ASTを扱った方がツール間の連携も上手くいくので、実験目的以外ならShift ASTをまだ使う理由はないと思います。

まだ進行中の仕様なので実験してIssueとかを立てたりするのは、歓迎されると思うので後述する[ESTree][]と共に見ていくのがいいと思います。

## [jQuery Foundation adopts Esprima | Official jQuery Blog](http://blog.jquery.com/2015/01/26/jquery-foundation-adopts-esprima/ "jQuery Foundation adopts Esprima | Official jQuery Blog")

2015年1月26日 上記の記事で書かれているように、[ariya/esprima](https://github.com/ariya/esprima)が[jquery/esprima](https://github.com/jquery/esprima)へとリポジトリが移管されました。


[@ariya](https://github.com/ariya "ariya")がEsprimaの開発を辞めたという感じではなく、よりパーサ周りの開発を活性化、集中化するためにjQuery Foundationに移管されて[jquery/esprima](https://github.com/jquery/esprima)となりました。

Esprimaのプロジェクトリーダは変わらず@Ariyaです。

## [[2014/01]最近のASTパーサの動き](http://azu.github.io/slide/crosushi/shift-ast.html)

ここまでのASTの話をパーサ中心にまとめたスライドです。

EsprimaがjQuery Foundationに移譲されたばかりの時でまだはっきりとした動きはわかってなかったので、2014年1月までの現状をまとめたという感じです。

-----

ここまでが[[2014/01]最近のASTパーサの動き](http://azu.github.io/slide/crosushi/shift-ast.html)のスライドの振り返りです。

-----

## jQuery Foundationの手腕

先ほども書いていましたが、JavaScriptのパーサで最も使われてるEsprimaがjQuery Foundationに移管されました。

移管後の2015年2月4日のミーティング [Esprima Meeting Agenda - Google ドキュメント](https://docs.google.com/document/d/1l02VT94tdphwUUZfPJorRYOY0Q_v41R_TyYhKayiP9M/edit# "Esprima Meeting Agenda - Google ドキュメント") で、移管の目的について以下のように書かれています。

- Why the jQuery Foundation adopted this project
	- Lots of fragmentation in this task space
	- Effort being spent in duplicated efforts
	- Not seeing progress on important common needs
- Philosophy - What the Foundation would like to encourage
	- Be the "main fork" for a JavaScript parser in JavaScript
	- Have a multi-person core team run by consensus
	- Be open to contributions from the community
	- Do work and make decisions in public

[[2014/01]最近のASTパーサの動き](http://azu.github.io/slide/crosushi/shift-ast.html)でも登場していたJavaScriptパーサが色々あることからわかるように、2015年1月をピークにパーサ周りでは労力が分散していました。(同じ機能についてを各パーサで考えて実装したり、[estools/escodegen](https://github.com/estools/escodegen "estools/escodegen")がその分散を吸収してたり)

実際にjQuery Foundationが間に入ったことで開発速度は大幅に改善されていて、後述しますがESTreeなどのAST標準化作業も動きが始まり、jQuery Foundationがやったことは大きかったと思います。

ここまででjQuery Foundationがやったこと

- Esprima 2.0のリリース
	- 主なコミットはAriya
- EsprimaをGoogle CodeからGitHub Issueを中心に回るように
	- [Maintainer&#39;s Guide · jquery/esprima Wiki](https://github.com/jquery/esprima/wiki/Maintainer%27s-guide "Maintainer&#39;s Guide · jquery/esprima Wiki")
- [@dherman](https://github.com/dherman "dherman")を召喚して[ESTree][]の作成
- Ariyaを含めEsprimaについての定期ミーティング
	- [Esprima Meeting Agenda - Google ドキュメント](https://docs.google.com/document/d/1l02VT94tdphwUUZfPJorRYOY0Q_v41R_TyYhKayiP9M/edit# "Esprima Meeting Agenda - Google ドキュメント") アジェンダ
	- [IRC logs](http://irc.jquery.org/%23esprima-meeting/ "IRC logs") にログ
	- [@ariya](https://github.com/ariya "ariya")(Esprima/Shift AST)、[@ikarienator](https://github.com/ikarienator "ikarienator") (Shift AST)、[@michaelficarra](https://github.com/michaelficarra "michaelficarra")(Shift AST)、[@mikesherov](https://github.com/mikesherov "mikesherov") (JSCS/jQuery Foundation)、[@jeffmo](https://github.com/jeffmo "jeffmo")(esprima-fb/facebook)、[@nzakas](https://github.com/nzakas/ "nzakas")(espree/ESLint) が主となって定期的にIRC/Skypeでミーティングをやっています

この中でもAST全体で見て大きいのは [ESTree][] というあやふやだったMozilla ASTのドキュメントを整備するプロジェクトを作ったことだと思います。

## [ESTree][]

基本はSpiderMonkey ASTと同じものだと思ってもらって問題ないですが、SpiderMonkey ASTをそのまま維持しつつ、ES6についてなどの未定義だった部分の仕様を策定(整理)が進められているプロジェクトです。

SpiderMonkey ASTじゃなくてESTreeという名前になってるのには、あまり大きな意味はなくて単純にSpiderMonkeyの内部表現以外でも使われる仕様ということなので、ESTreeという名前に変わった感じだと思います。

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/rauschma">@rauschma</a> Note that this is not a &quot;new&quot; standard, but simply the original SpiderMonkey standard (<a href="https://t.co/LObMtM6xEq">https://t.co/LObMtM6xEq</a>) now on Github.</p>&mdash; Michael Ficarra (@jspedant) <a href="https://twitter.com/jspedant/status/567037276450848768">February 15, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[Participating Members](https://github.com/estree/estree#participating-members "Participating Members")には以下のメンバーが主となって議論していることが書かれています。

* Dave Herman (Mozilla)
* Ingvar Stepanyan ([Acorn](https://github.com/marijnh/acorn))
* Mike Sherov ([Esprima](https://github.com/jquery/esprima))
* Michael Ficarra ([@michaelficarra](https://github.com/michaelficarra))
* Sebastian McKenzie ([Babel](https://github.com/babel/babel))

先ほどの[Esprima Meeting](https://docs.google.com/document/d/1l02VT94tdphwUUZfPJorRYOY0Q_v41R_TyYhKayiP9M/edit# "Esprima Meeting Agenda - Google ドキュメント")のメンバーを合わせると、JavaScriptパーサに関係する人はだいたい関わってることがわかると思います。

パーサの実装に関わる人が仕様を決めるオープンなコミュニティができたことで、今後パーサ間でどのようなASTを吐くかのズレなどが少なくなっていくと思います。(少なくてもECMAScriptの範囲では)

## ESTreeとShift ASTの目的の違い

[Shift AST Specification](https://github.com/shapesecurity/shift-spec "Shift AST Specification")と[ESTree][]はどちらもASTの仕様を決めているのでどちらも同じように見えます。この２つの違いは何でしょうか?

Shift ASTの[@michaelficarra](https://github.com/michaelficarra "michaelficarra")さんが次のように書いています。

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/py">@py</a> RE: ESTree, I think it&#39;s great that there&#39;s finally a canonical spec, but I look at it as legacy; I&#39;m confident Shift will be the future</p>&mdash; Michael Ficarra (@jspedant) <a href="https://twitter.com/jspedant/status/569238440044142592">February 21, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [Shift initiative · Issue #30 · estree/estree](https://github.com/estree/estree/issues/30 "Shift initiative · Issue #30 · estree/estree")

先ほども述べたように[ESTree][]は新しい仕様ではなくて、既存のSpiderMonkey ASTで未定義だったES6についてを後方互換性をできるだけ維持して決めていくプロジェクトです。

一方、[Shift AST Specification](https://github.com/shapesecurity/shift-spec "Shift AST Specification")が[現在のASTの扱いにくい部分がある問題](https://speakerdeck.com/michaelficarra/spidermonkey-parser-api-a-standard-for-structured-js-representations "SpiderMonkey Parser API: A Standard For Structured JS Representations // Speaker Deck")などを修正した未来の仕様を目指しています。
そのため、後方互換性よりもその修正を優先しています。
また、Spidermonkey AST(ESTree) から Shift ASTに変換するモジュールも公開しています。

- [shapesecurity/shift-spidermonkey-converter-js](https://github.com/shapesecurity/shift-spidermonkey-converter-js "shapesecurity/shift-spidermonkey-converter-js")

Shift ASTの人もESTreeの目的は分かって一緒にやってるので、今すぐ使える仕様が複数存在するという感じではないので、基本的にはESTreeを参照してツールが作られています。

## [Babel][]

2015年2月15日に6to5がBabelへとリネームされました。

- [Not Born to Die · Babel](http://babeljs.io/blog/2015/02/15/not-born-to-die/ "Not Born to Die · Babel")

Babelは[babel/acorn-babel](https://github.com/babel/acorn-babel "babel/acorn-babel")というacornをベースにJSXやES7+の対応をしているパーサを使っています。

そのため、先ほど紹介した[ESTree][]でのASTの標準化にも関わっていて、特に[ES6](https://github.com/estree/estree/blob/master/es6.md "estree/es6.md at master · estree/estree")や[ES7+](https://github.com/estree/estree/blob/master/experimental.md "estree/experimental.md at master · estree/estree")を中心にコミットされています。


## おまけ: [mdast][]

[RReverser]: https://github.com/RReverser  "RReverser (Ingvar Stepanyan)"
[aster]: https://github.com/asterjs  "aster"
[6to5]: http://6to5.org/ "6to5"
[Espree]: https://github.com/eslint/espree  "eslint/espree"
[ESTree]: https://github.com/estree/estree  "estree/estree"
[Babel]: https://babeljs.io/  "Babel · The transpiler for writing next generation JavaScript"
[mdast]: https://github.com/wooorm/mdast  "wooorm/mdast"