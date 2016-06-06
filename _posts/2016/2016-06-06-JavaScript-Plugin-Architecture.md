---
title: "JavaScript Plugin Architectureというプラグイン設計について学ぶ無料の電子書籍を書いた"
author: azu
layout: post
date : 2016-06-06T09:36
category: JavaScript
tags:
    - JavaScript
    - plugin

---

[JavaScript Plugin Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "JavaScript Plugin Architecture")というJavaScriptにおけるプラグイン設計についての電子書籍を書きました。

この書籍はJavaScriptのライブラリやツールにおけるプラグインアーキテクチャについて見ていく事を目的としたものです。

以下の形式で読むことができます。

- [Web版](https://azu.gitbooks.io/javascript-plugin-architecture/content/)
- [PDF形式](https://www.gitbook.com/download/pdf/book/azu/javascript-plugin-architecture) - [レンダリングに難あり](https://github.com/azu/JavaScript-Plugin-Architecture/issues/106)
- [ePub形式](https://www.gitbook.com/download/epub/book/azu/javascript-plugin-architecture)
- [Mobi形式](https://www.gitbook.com/download/mobi/book/azu/javascript-plugin-architecture)

[GitHub](https://github.com/azu/JavaScript-Plugin-Architecture)上にソースコードも公開されているでので直接Markdownファイルを読むこともできます。
Markdownよりはは[Web版](https://azu.gitbooks.io/javascript-plugin-architecture/content/)の方がコードが見やすいと思うのでそちらをオススメします。

最初に[書くと決めたプラグインアーキテクチャ](https://github.com/azu/JavaScript-Plugin-Architecture/issues?q=label%3Aproposal+is%3Aclosed)が揃ったので[1.0.0](https://github.com/azu/JavaScript-Plugin-Architecture/releases/tag/1.0.0 "1.0.0")としてリリースしました。
[JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本")の時と同じく、継続的に更新できる仕組みを色々入れてあるので新しいプラグインアーキテクチャのProposalが出たら書いていく感じになると思います。

- [JavaScript Promiseの本を書きました | Web Scratch](http://efcl.info/2014/0623/res3943/ "JavaScript Promiseの本を書きました | Web Scratch")

このツール/ライブラリで使われてるプラグインの仕組みは面白いというようなものがあればProposalをIssueに書いてみてください。
[CONTRIBUTING.md](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md "CONTRIBUTING.md")にProposalの書き方が載せています。

## はじめに

JavaScriptの世界では1つの大きなライブラリよりも小さいなものを組み合わせていくようなスタイルが多く見られます。
小さなものを組み合わせて作るためには、プラグインと呼ばれるような拡張の仕組みが必要となります。
またそのようなプラグインがたくさんあるエコシステムの土台を作るには、プラグインアーキテクチャが重要になると言えます。

> ソフトウェアの構造に「プラグイン機構」を設け、ユーザコミュニティから開発者コミュニティへの質的な転換を図るのは、ソフトウェア設計からエコシステム設計へとつながる  
> -- [OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ](http://t-wada.hatenablog.jp/entry/active-oss-development-vs-simplicity "OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ")

この書籍では、JavaScriptにおけるプラグインアーキテクチャやそのエコシステムを形成してるライブラリやツールなどの実装を学ぶことが目的となっています。

## この書籍の内容について

現状の書籍の概要をまとめてると以下のようなライブラリやツールについて書かれています。
大体の章は[Proposal](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md#proposal%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9 "Proposal")に沿って書いてたいので、次のような項目を持っています。

- どう書ける?
- どういう仕組み?
- 実装してみよう
- どういう用途に向いている?
- どういう用途に向いていない?
- この仕組みを使っているもの
- エコシステム

### [jQuery](https://azu.gitbooks.io/javascript-plugin-architecture/content/ja/jQuery/README.md)

jQueryのプラグインについて解説しています。
`<script>`タグをベースとしたプラグインアーキテクチャについて解説しています。

### [ESLint](https://azu.gitbooks.io/javascript-plugin-architecture/content/ja/ESLint/README.md)

ESLintのルールを拡張する仕組みについて解説しています。
ESLintではJavaScriptのコードをパースして作成されたASTを元にコードのLintを行います。
実際にESLintのルールを解釈できる小さな実装を作りながらプラグインの仕組みについて学びます。

### [Connect](https://azu.gitbooks.io/javascript-plugin-architecture/content/ja/connect/README.md)

Connectの **middleware** と呼ばれるプラグインアーキテクチャについて解説しています。
Node.js以外においても_Rack_などHTTPサーバーでよく見られるプラグインを使った階層構造について学びます。

### [gulp](https://azu.gitbooks.io/javascript-plugin-architecture/content/ja/gulp/README.md)

**タスク自動化ツール**として知られるgulpのプラグインアーキテクチャについて解説しています。
gulpではデータの流れとして既存のNode.js Streamを使い、そこで流すデータとしてvinylオブジェクトを利用します。
実際にgulpプラグインを書きながら、gulpのプラグインの仕組みについて学びます。

### [Redux](https://azu.gitbooks.io/javascript-plugin-architecture/content/ja/Redux/README.md)

アプリケーションのStateを管理ライブラリのReduxのプラグインアーキテクチャについて解説しています。
Reduxでは **Middleware** と呼ばれる拡張の仕組みを持っていますが、Connectとの類似点や相違点があります。
小さなReduxの実装を作りながら **Middleware** の仕組みについて学びます。

## Contributing

この書籍は無料で読むことができ、同時に修正や新しいページを書く権利があります。

[CONTRIBUTING.md](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md)に、書籍で扱うべきプラグインアーキテクチャのProposalの書き方や
Pull Request、コミットのやりかたなどが書かれています。

間違いやライブラリのアップデートへの追従など何かあれば、IssueやPull Requestをよろしくお願いします。

ソースコードは全てGitHubに公開されています。

- [azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture)

## License

MIT/CC BY-NC © azu

- コードはMITライセンスで利用できます
- 文章は[CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/ "CC BY-NC 4.0")で利用できます
