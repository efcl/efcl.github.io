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

## shift-spec
## [jQuery Foundation adopts Esprima | Official jQuery Blog](http://blog.jquery.com/2015/01/26/jquery-foundation-adopts-esprima/ "jQuery Foundation adopts Esprima | Official jQuery Blog")
## http://azu.github.io/slide/crosushi/shift-ast.html
- ----- ここまで復習 -----
## jQuery Foundationの手腕
## [ESTree][]
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