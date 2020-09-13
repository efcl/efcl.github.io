---
title: "JSのプラグインシステムについて書くJavaScript Plugin Architecture 2.0をリリースしました"
author: azu
layout: post
date : 2020-09-13T23:07
category: JavaScript
tags:
    - JavaScript
    - book

---

JavaScriptのプラグインシステムについて書いた小さな電子書籍である[JavaScript Plugin Architecture](https://azu.github.io/JavaScript-Plugin-Architecture/) 2.0をリリースしました。

1.0(初版)公開時の記事は次のページから参照できます。

- [JavaScript Plugin Architectureというプラグイン設計について学ぶ無料の電子書籍を書いた | Web Scratch](https://efcl.info/2016/06/06/javascript-plugin-architecture/)

2.0の詳しい変更点についてはリリースノートを参照してください。

- [Release v2.0.0 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/releases/tag/v2.0.0)

2.0リリース時にGitBookから[HonKit](https://github.com/honkit/honkit)に移行しました。
そのため、公開するURLが次の場所に変更されています。

- <https://azu.github.io/JavaScript-Plugin-Architecture/>

（GitBookの古いやつを消したりする方法がわからなかった…）

2.0はURLの変更とリファクタリングがメインなので、項目としては大きくは変わっていません。

あらためて[JavaScript Plugin Architecture](https://azu.github.io/JavaScript-Plugin-Architecture/)で紹介しているプラグインアーキテクチャとしては次のようになっています。

---

### [jQuery](https://azu.github.io/JavaScript-Plugin-Architecture/ja/jQuery/)

jQueryのプラグインについて解説しています。
`<script>`タグをベースとしたプラグインアーキテクチャについて解説しています。

### [ESLint](https://azu.github.io/JavaScript-Plugin-Architecture/ja/ESLint/)

ESLintのルールを拡張する仕組みについて解説しています。
ESLintではJavaScriptのコードをパースして作成されたASTを元にコードのLintを行います。
実際にESLintのルールを解釈できる小さな実装を作りながらプラグインの仕組みについて学びます。

### [Connect](https://azu.github.io/JavaScript-Plugin-Architecture/ja/connect/)

Connectの **middleware** と呼ばれるプラグインアーキテクチャについて解説しています。
Node.js以外においても_Rack_などHTTPサーバーでよく見られるプラグインを使った階層構造について学びます。

### [gulp](https://azu.github.io/JavaScript-Plugin-Architecture/ja/gulp/)

**タスク自動化ツール**として知られるgulpのプラグインアーキテクチャについて解説しています。
gulpではデータの流れとして既存のNode.js Streamを使い、そこで流すデータとしてvinylオブジェクトを利用します。
実際にgulpプラグインを書きながら、gulpのプラグインの仕組みについて学びます。

### [Redux](https://azu.github.io/JavaScript-Plugin-Architecture/ja/Redux/)

アプリケーションのStateを管理ライブラリのReduxのプラグインアーキテクチャについて解説しています。
Reduxでは **middleware** と呼ばれる拡張の仕組みを持っていますが、Connectとの類似点や相違点があります。
小さなReduxの実装を作りながら **middleware** の仕組みについて学びます。

---

[JavaScript Plugin Architecture](https://azu.github.io/JavaScript-Plugin-Architecture/)はライブラリやツールごとに章が独立しています。そのため、新しいプラグインの仕組みについては誰でも追加しやすくなっています。

[CONTRIBUTING.md](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md)に[新しいプラグインの仕組みを書く](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md#%E6%96%B0%E3%81%97%E3%81%84%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%AE%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E6%9B%B8%E3%81%8F)場合の方法が記載されているので、[JavaScript Plugin Architecture](https://azu.github.io/JavaScript-Plugin-Architecture/)にこのライブラリやツールのプラグインの仕組みを書きたいという人はまず[Issueを作ってみてください！](https://github.com/azu/JavaScript-Plugin-Architecture/issues/new?assignees=&labels=Status%3A+Proposal&template=proposal.md&title=)

このプロジェクト自体が[textlint](https://github.com/textlint/textlint)の開発を進めるために作られた部分もあります。
そのためクオリティとかはそこまで気にしないで、こういうプラグインの仕組みがあるよというのをテンプレートに沿って書いてく感じで大丈夫だと思います。

IssueやPRを作ってもらえればレビューとか相談にのるので、JavaScriptのプラグインの仕組みを文章化したいときに使ってみてください。

プロジェクトの目的は、最初に紹介した記事でも書いています。

- [JavaScript Plugin Architectureというプラグイン設計について学ぶ無料の電子書籍を書いた | Web Scratch](https://efcl.info/2016/06/06/javascript-plugin-architecture/)

[JavaScript Primer](https://github.com/asciidwango/js-primer)でも基本的に同じ形ではありますが、
[JavaScript Plugin Architecture](https://azu.github.io/JavaScript-Plugin-Architecture/)はもっとラフな実験的なプロジェクトなので、
普通のライブラリやアプリと同じ感覚で文章をContributingしてください！

- [azu/JavaScript-Plugin-Architecture: JavaScriptプラグインアーキテクチャの本](https://github.com/azu/JavaScript-Plugin-Architecture)
