---
title: "JavaScript Plugin Architectureというプラグイン設計について学ぶ無料の電子書籍を書いた"
author: azu
layout: post
date : 2016-06-06T09:36
category: JavaScript
tags:
    - JavaScript
    - plugin
    - book
    - 電子書籍

---

[JavaScript Plugin Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "JavaScript Plugin Architecture")というJavaScriptのプラグイン設計についての電子書籍を書きました。

この書籍はJavaScriptのライブラリやツールにおけるプラグインアーキテクチャについて見ていく事を目的としたものです。

以下の形式で読むことができます。

- [Web版](https://azu.gitbooks.io/javascript-plugin-architecture/content/)
- [PDF形式](https://www.gitbook.com/download/pdf/book/azu/javascript-plugin-architecture) - [レンダリングに難あり](https://github.com/azu/JavaScript-Plugin-Architecture/issues/106)
- [ePub形式](https://www.gitbook.com/download/epub/book/azu/javascript-plugin-architecture)
- [Mobi形式](https://www.gitbook.com/download/mobi/book/azu/javascript-plugin-architecture)

[GitHub](https://github.com/azu/JavaScript-Plugin-Architecture)上にソースコードも公開されているでので直接Markdownファイルを読むこともできます。
Markdownよりは[Web版](https://azu.gitbooks.io/javascript-plugin-architecture/content/)の方が見やすいのでそちらをオススメします。

Twitterのハッシュタグは[#js_plugin_book](https://twitter.com/search?f=tweets&q=%23js_plugin_book&src=typd "Twitter #js_plugin_book")

更新情報は[RSS](https://github.com/azu/JavaScript-Plugin-Architecture/releases.atom)や[リリースノート](https://github.com/azu/JavaScript-Plugin-Architecture/releases)から見ることができます。

## v1.0.0

最初に[書くと決めたプラグインアーキテクチャ](https://github.com/azu/JavaScript-Plugin-Architecture/issues?q=label%3Aproposal+is%3Aclosed)が揃ったので[1.0.0](https://github.com/azu/JavaScript-Plugin-Architecture/releases/tag/1.0.0 "1.0.0")としてリリースしました。
[JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本")の時と同じく、継続的に更新できる仕組みを色々入れてあるので新しいプラグインアーキテクチャのProposalが出たら書いていく感じになると思います。

- [JavaScript Promiseの本を書きました | Web Scratch](http://efcl.info/2014/0623/res3943/ "JavaScript Promiseの本を書きました | Web Scratch")

このツール/ライブラリで使われてるプラグインの仕組みは面白いというようなものがあれば、ProposalをIssueに書いてみてください。
[CONTRIBUTING.md](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md "CONTRIBUTING.md")にProposalの書き方を載せています。

## はじめに

JavaScriptの世界では1つの大きなライブラリよりも小さいなものを組み合わせていくようなスタイルが多く見られます。
小さなものを組み合わせて作るためには、プラグインと呼ばれるような拡張の仕組みが必要となります。
またそのようなプラグインがたくさんあるエコシステムの土台を作るには、プラグインアーキテクチャが重要になると言えます。

> ソフトウェアの構造に「プラグイン機構」を設け、ユーザコミュニティから開発者コミュニティへの質的な転換を図るのは、ソフトウェア設計からエコシステム設計へとつながる  
> -- [OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ](http://t-wada.hatenablog.jp/entry/active-oss-development-vs-simplicity "OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ")

この書籍では、JavaScriptにおけるプラグインアーキテクチャやそのエコシステムを形成してるライブラリやツールなどの実装を学ぶことが目的となっています。

何も断りなしにECMAScript 2015で書いてるので、JavaScriptの文法の説明は基本的にしてないのでご了承ください。

## この書籍の内容について

現状の書籍の概要をまとめてると以下のようなライブラリやツールについて書かれています。
大体の章は[Proposal](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md#proposal%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9 "Proposal")に沿って書いていたので、次のような項目になっています。

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

## もう一つの目的

この書籍のテーマ先ほど書いたようにプラグインの仕組みについて学ぶという目的を持っています。
しかし、この書籍を書くことにした目的はまた別にあります。

以下のIssueがこの書籍の起点となっています。

- [色々なプラグイン機構のパターン · Issue #60 · azu/azu](https://github.com/azu/azu/issues/60 "色々なプラグイン機構のパターン · Issue #60 · azu/azu")

このIssueよりさらに前に、電子書籍の開発環境について考えるというIssueが半分の目的です。

> 目的: もっと気軽に書ける電子書籍
> もっと簡単に色々自動化できる電子書籍の書き方についてを考える。

- [[Markdown] 電子書籍開発環境 · Issue #42 · azu/azu](https://github.com/azu/azu/issues/42)

この書籍を書きながら考えた電子書籍のセットアップや継続的な開発については以下などで発表しています。

- [今すぐ電子書籍(技術書)を書き始める方法と文章の自動チェック | Web Scratch](http://efcl.info/2015/09/28/easy-to-create-ebook/)
- [Introduction | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/)

いつもどおり[手段と目的が逆転](http://azu.github.io/promises-book/#about-author)しているので、
[textlint](https://github.com/textlint/textlint "textlint")の開発を進めるためにこの書籍を開発していた部分も大きいです。

textlintで日本語の文章をチェックするために論文やRedPenなど既存のLinterを参考に色々なルールを実装しましたが、ルールの実験場として[JavaScript Plugin Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "JavaScript Plugin Architecture")を使っていました。

- [Collection of textlint rule · textlint/textlint Wiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · textlint/textlint Wiki")

自分が実装するtextlintのルールはfalse positiveにならない事を目標にしています。
そのルールに問題ないかを測ることができ、ある程度量があり、自由にいじれる文章が欲しかったので[JavaScript Plugin Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "JavaScript Plugin Architecture")を書いていた部分もあります。

なので、JavaScript Plugin Architectureの[.textlintrc](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/.textlintrc ".textlintrc")はいろんなルールが詰め込まれています。
(後で整理してプリセットとか作るかもしれません。)

[技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/)でも書いてましたが、自然言語はプログラミング言語と違って正解がないので、汎用的なルールを作るのは結構難しいです。

> 自然言語処理のほとんどの技術は形態素解析が正しく行われていることを前提に設計されているので、
> (中略) 文字レベルで誤った日本語入力に対する校正の大部分は当面困難と予想する。
> 残念ながら誤った日本語入力に対する形態素解析の研究はきわめて少ないのが現状
> -- [https://ipsj.ixsq.nii.ac.jp/ej/index.php?action=pages_view_main&active_action=repository_view_main_item_snippet&index_id=8404&pn=1&count=20&order=7&lang=japanese&page_id=13&block_id=8](自然言語処理技術の現状と展望)

とか書かれてるぐらいなので、textlintではルールを簡単に作って公開できる所に注力しています。
オレオレ[ルール](http://efcl.info/2015/09/10/introduce-textlint/)、[設定](http://efcl.info/2016/04/08/textlint-sharable-config/)や[プリセット](http://efcl.info/2015/12/30/textlint-preset/)などをどんどん公開するといいです。

また、textlint自体もデフォルトでルールを持っていなかったり、プラガブルな実装になっています。

ルールを処理する仕組みはESLintと同じですが、[パーサ](https://github.com/textlint/textlint/blob/master/docs/plugin.md)、[ルール](https://github.com/textlint/textlint/blob/master/docs/rule.md)、ルールのエラーを無視する範囲を決める[フィルタールール](https://github.com/textlint/textlint/blob/master/docs/filter-rule.md)、[フィルター実現するロジック](https://github.com/textlint/textlint/blob/master/src/messages/MessageProcessManager.js)、[出力フォーマッター](https://github.com/textlint/textlint-formatter)など大部分がプラガブルな実装です。

- [ESLint · JavaScript Plugin Architecture](https://azu.gitbooks.io/javascript-plugin-architecture/content/ja/ESLint/ "ESLint · JavaScript Plugin Architecture")

そういうプラグインの実装方法についても[JavaScript Plugin Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "JavaScript Plugin Architecture")では書いているので、興味がある人は見てみてください。

### 継続的に書く

継続的に書くにはやっぱりCIを回してテストしないと辛いので、JavaScript Plugin Architectureでは次のようなテストが走っています。

- サンプルコードのテスト
  - Mochaで動かすユニットテスト
  - https://github.com/azu/JavaScript-Plugin-Architecture/blob/dee986289576598d7f9725d84ab3ba4dcb961d57/package.json#L28
- サンプルコードの実行テスト
  - `*-example.js`は単独で実行できるというルールにして実行させてエラーにならないかテスト
  - https://github.com/azu/JavaScript-Plugin-Architecture/blob/dee986289576598d7f9725d84ab3ba4dcb961d57/package.json#L27
- textlint
  - 文章のチェック
  - https://github.com/azu/JavaScript-Plugin-Architecture/blob/dee986289576598d7f9725d84ab3ba4dcb961d57/package.json#L26
- ESLint
  - サンプルコードのスタイルチェック
  - インラインコードブロックで埋め込んだサンプルコードのチェック
- 文章のカバレッジ
  - [textlintで文章カバレッジレポートを継続的に見ていく | Web Scratch](http://efcl.info/2016/01/12/textlint-coverage/ "textlintで文章カバレッジレポートを継続的に見ていく | Web Scratch")
  - https://github.com/azu/JavaScript-Plugin-Architecture/blob/dee986289576598d7f9725d84ab3ba4dcb961d57/package.json#L32

この辺をすぐ使えるGitBookのスターターキットも公開してるので興味がある人は触ってみると面白いかもしれません。

- [今すぐ電子書籍(技術書)を書き始める方法と文章の自動チェック | Web Scratch](http://efcl.info/2015/09/28/easy-to-create-ebook/ "今すぐ電子書籍(技術書)を書き始める方法と文章の自動チェック | Web Scratch")

## おわりに

[JavaScript Plugin Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "JavaScript Plugin Architecture")をひとまずリリースしました。
世の中にはまだまだおもしろいプラグインの仕組みがあるので、面白いものがあったら[Proposal](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md#proposal%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9 "Proposal")のIssueを書いていただけると更新される気がします。

JavaScriptのライブラリを書くときにいろんなプラグインの仕組みをぱっと読めるものがあると便利なので、
他にも面白い仕組みの話を追加してくれる人も募集中です。

最近、プラガブルな[ロガーライブラリ](https://github.com/azu/bellows-logger)を実装していて、[Connect · JavaScript Plugin Architecture](https://azu.gitbooks.io/javascript-plugin-architecture/content/ja/connect/index.html "Connect · JavaScript Plugin Architecture")や[Web Audio API](https://github.com/azu/JavaScript-Plugin-Architecture/issues/101)を参考にしたので、こういうのがあると便利です。

今現在、電子書籍を書く環境は簡単に揃います。
ブログでは収まらなそうなちょっとした内容を電子書籍という体裁でまとめてみたりすると面白いかもしれません。

> 技術書は一日で書き終わらない
> 途中で飽きてしまう問題
> -- [技術書を書く環境はできたが… | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/slide/25.html "技術書を書く環境はできたが… | 技術文書をソフトウェア開発する話")

今はまた別のJavaScript本を書いていますが、継続的に文書開発できる環境についてはまだまだ考える事が多そうです。
