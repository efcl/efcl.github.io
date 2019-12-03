---
title: "JavaScript ASTを使ったツール(自作、ESLint、Babel、jscodeshift)を実装する話をした"
author: azu
layout: post
date : 2019-12-03T19:40
category: JavaScript 
tags:
    - JavaScript
    - AST

---

[Dive into AST](https://dive-into-ast.netlify.com/)というJavaScriptのASTを使ったツールの作り方を見ていく話をしました。
自作の正規表現、ASTチェックツール、ESLint、Babel、jscodeshiftでそれぞれ動くツールを実装してるので、リポジトリにまとめてあります。

スライドでは[Code Surfer](https://github.com/pomber/code-surfer)を使ってASTや書き方をインタラクティブに解説しています。

- スライド: [Dive into AST](https://dive-into-ast.netlify.com/)
- リポジトリ: [azu/dive-into-ast:](https://github.com/azu/dive-into-ast)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">JavaScriptを中心にしたAST(Abstract Syntax Tree)を使ったツールの作り方についての資料です！<br><br>自作ASTツール、ESLint、Babel、jscodeshift それぞれでASTを使ったツールをどう実装していくのかを見ていけます。<br><br>スライド: <a href="https://t.co/yht9cGB0Hs">https://t.co/yht9cGB0Hs</a><br>リポジトリ: <a href="https://t.co/Kxk9bur7TF">https://t.co/Kxk9bur7TF</a> <a href="https://t.co/N2oEEYBUWq">pic.twitter.com/N2oEEYBUWq</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1201802003095011328?ref_src=twsrc%5Etfw">December 3, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 背景

以前にもASTについては記事やスライドを書いています。
ASTとは何?という話はこの辺と大きくは変わってないです。

- [JavaScript ASTを始める最初の一歩 | Web Scratch](https://efcl.info/2016/03/06/ast-first-step/)
- [カジュアルJavaScript AST](https://azu.github.io/slide/JSojisan/#8)

[JSConf.JP](https://jsconf.jp/2019/)で[ASTの野外ライブコーディングをしていたt_wadaさん](https://jsconf.jp/2019/talk/takuto-wada)とASTについて教えるときにどこにフォーカスして話すのがいいのかという話をしてました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">t_wadaさんとASTについて教えるときどこまで話すかが難しいという話したけど、<br>特定の領域(ESLint、Babel pluginみたいな感じ)に掘るか<br>広く浅くやるか<br>のどっちかという話になった。<br>広く浅くは前に書いてたので、特定の領域で掘るかー<a href="https://t.co/VcHt1Wtafj">https://t.co/VcHt1Wtafj</a><a href="https://t.co/jgs23lrx0e">https://t.co/jgs23lrx0e</a><a href="https://twitter.com/hashtag/jsconfjp?src=hash&amp;ref_src=twsrc%5Etfw">#jsconfjp</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1200698005478760448?ref_src=twsrc%5Etfw">November 30, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

ASTの触りの話は以前もやってたので、もっとツールとか狭い領域にフォーカスしたものをやってみるかということで作ってみました。

ASTを触るツールを書いてみると、普段のプログラミングであまりしないパターンも結構行うので色々学びがあると思います。
DOMもツリーなのでASTと似た構造ですが(実際に[TreeWalker](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker)とかTraverseするものもある)、ウェブサイトを作るのとツールを作るのはやっぱり違う感じはします。

スライドでも書いてましたが、ASTを扱うパーサなどのツールはかなり充実してきているので、最近ではかなり簡単にASTに触れます。
ASTを使ってちょっとした自動化をするようなツールを作ってみると面白いのかもしれません。

## その他

ASTを吐くパーサの作り方は誰かがやってください。