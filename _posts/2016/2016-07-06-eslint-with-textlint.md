---
title: "MarkdownのコードブロックをESLintでチェックするtextlintルール"
author: azu
layout: post
date : 2016-07-06T20:24
category: JavaScript
tags:
    - JavaScript
    - book
    - jsprimer
    - textlint
    - ESLint

---

今、[js-primer](https://github.com/asciidwango/js-primer "js-primer")を書いていて、この本ではいろんなものをテストできる常体にして開発しています。

詳しくは[CONTRIBUTING.md](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md "CONTRIBUTING.md")に書いていますが、今のところ次のようなテストが常に回っています。(CONTRIBUTINGもお待ちしています)

- GitBookのビルドテスト
- [textlint](https://textlint.github.io/)による文章のLint
- [ESLint](http://eslint.org/ "ESLint")によるコードのLint
- [textlint](https://textlint.github.io/) + [ESLint](http://eslint.org/ "ESLint")によるMarkdown中のインラインコードブロックのLint
- Markdown中のインラインコードブロックへのDocTest
- [Mocha](http://mochajs.org/ "Mocha")による`*-test.js`ファイルのユニットテスト
- `*-example.js`がJavaScriptとして実行できるかのテスト
- `*-invalid.js`がJavaScriptとして実行できないかのテスト

JavaScriptを学ぶ本なので、大量のサンプルコードがでてくるのですが、そのサンプルコードが常に正しくある必要があります。
そのため、いろんな方向からテストして間違っているサンプルコードを含めないようにしています(逆に間違っていることをテストする仕組みもあります)

サンプルコードは大きく分けると、文章中にコードブロックで直接書くインラインコードと外部ファイルとして作成して読み込むコードがあります。

- [サンプルコード | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/slide/61.html "サンプルコード | 技術文書をソフトウェア開発する話")

インラインコードは、ESLintでスタイルのチェックや[doctest](https://github.com/azu/power-doctest "doctest")を行い実行結果のテストをしています。

以前話した方法ではESLintの[eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown "eslint-plugin-markdown")を使い、インラインコードをESLintでチェックしていました。

- [インラインコードのLint | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/slide/67.html "インラインコードのLint | 技術文書をソフトウェア開発する話")

普通なら正しいコードしか出てこないので問題ないのですが、入門書という位置づけであるため次のような間違ったコードも解説として登場します。

    そして、一度`const`で宣言された変数には再代入できなくなります。
    そのため、次のコードでは`bookTitle`を上書きしようとして`TypeError`となります。
    
    ```js
    const bookTitle = "JavaScriptの本";
    bookTitle = "上書き"; // TypeError: invalid assignment to const `bookTitle'
    ```
    
    一般に変数への再代入は「変数の値は最初に定義した値と常に同じである」という参照透過性を壊すため、
    バグを発生させやすい要因として知られています。

via [変数と宣言 · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/variables/ "変数と宣言 · JavaScriptの入門書 #jsprimer")
    
[eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown "eslint-plugin-markdown")では`js`がついたコードブロックが自動でチェックされてしまうため、このコードブロック自体を無視して欲しいという書き方ができません。
(コードの中でESLintを `eslint-disable` はできるが表示されてしまう)

そのため、Markdownのレベルでコードブロックを無視できるような仕組みが必要になりました。

## [textlint-rule-eslint](https://github.com/azu/textlint-rule-eslint "textlint-rule-eslint")

[textlint](https://textlint.github.io/)は7.0からフィルタールールという機能を持っていて、このフィルタールールである[textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments "textlint-filter-rule-comments")を使えば次のような形で無視する領域を作ることができます。

    <!-- textlint-disable -->

    この部分はtextlintのチェックでエラーがあっても無視される

    <!-- textlint-enable -->

- [textlint 7.0リリース、フィルタールールの追加 | Web Scratch](http://efcl.info/2016/06/30/textlint7.0/ "textlint 7.0リリース、フィルタールールの追加 | Web Scratch")

つまり、textlintのルールとしてESLintを動かすことができれば、textlintとしてコードブロックを無視する = ESLintのチェックしないコードブロックを作れるので[textlint-rule-eslint](https://github.com/azu/textlint-rule-eslint "textlint-rule-eslint")を作りました。
(プラグインの[アーキテクチャとかも似てる](https://azu.gitbooks.io/javascript-plugin-architecture/content/ja/ESLint/)ので10分ぐらいでできた)

これでインラインコードと外部ファイルのJavaScriptにESLintを適応することができるので、インデントがずれてないかやSyntaxがおかしくないかなどのチェックをすることができるようになっています。
(逆にベストプラクティス的なルールは引っかかりまくるので外しています…)

### おまけ

後、最近入れた面白いテストとしてdoctestライクなものをテストとして入れています。

`*-example.js`のJavaScriptファイルとMarkdownのインラインコードブロックを対象にDocTestが実行されています。

次のように`// => 値`というコメントを書いた部分に対してDocTestが実行されます。

```js
let a = 42;
console.log(42); // => 42
```

これにより、サンプルコードのコメントに書いた評価結果と実際の出力が一致するかをテストしてる感じです。

色々テストを入れているのは、いい文章といいコードは同時に書くのが難しいというのもあります。
そのため、とにかく機械的に落とせる部分は落とせるようにしています。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">色々コードを考えて書いた結果、文章がダメだとCIが落ちる</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/749461790744977408">July 3, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">読みやすい文章と読みやすいコードは同時に書くのが難しい  &quot;[WIP] 条件分岐の実装 by azu · Pull Request #‌69 · asciidwango/js-primer&quot;  <a href="https://t.co/UJ41KV5Ttk">https://t.co/UJ41KV5Ttk</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/749462503889833984">July 3, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

後、機械的にチェックする利点の話は以下の文章を読むと面白いかもしれません。

> ツールによる検査の利点
> [文書執筆の指南書で解説されている問題点を RedPen で発見する - Qiita](http://qiita.com/takahi-i/items/a8b994ef17fd66fe6237 "文書執筆の指南書で解説されている問題点を RedPen で発見する - Qiita")

リポジトリをWatchしていると分かるかもしれませんが、書く前に[Issues · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues "Issues · asciidwango/js-primer")にどういう方針にするか、どういうサンプルコードがあると話がし易いかなどの設計をすることが多いです。
(なので適当にコメントしてくれると参考になります)

書きながら考えることも多いのですが、その場合はごちゃごちゃした文章ができて大体CIが落ち始めます。そこで機械的なチェックやPull Requestを出して自分でレビューする(PRも勝手にコメントくれると嬉しい)と少しはまともになります。

そういうことを繰り返しを行うことで文章やコードの質を上げる方法を取っています。([textlint](https://textlint.github.io/)を入れたところで文章の質が上がるわけではないです)

まあ、一発でテストが通った文章とか不安になるでしょ。