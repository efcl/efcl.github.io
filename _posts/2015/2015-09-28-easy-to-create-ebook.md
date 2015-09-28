---
title: "今すぐ電子書籍(技術書)を書き始める方法と文章の自動チェック"
author: azu
layout: post
date : 2015-09-28T18:15
category: 書籍
tags:
    - JavaScript
    - GitBook
    - textlint
    - book

---

## 電子書籍開発環境

<div class="kwout" style="text-align: center;"><a href="http://azu.github.io/slide/niku_sushi/ebook_development.html"><img src="http://kwout.com/cutout/a/94/x9/4x5_bor.jpg" alt="http://azu.github.io/slide/niku_sushi/ebook_development.html" title="Markdownで書く電子書籍開発環境" width="600" height="225" style="border: none;" /></a><p style="margin-top: 10px; text-align: center;"><a href="http://azu.github.io/slide/niku_sushi/ebook_development.html">Markdownで書く電子書籍開発環境</a></p></div>

[Markdownで書く電子書籍開発環境](http://azu.github.io/slide/niku_sushi/ebook_development.html "Markdownで書く電子書籍開発環境")というスライドで、GitBookとMarkdownで技術書(電子書籍)を書く話を紹介しました。

文章は[textlint](https://github.com/azu/textlint "textlint")で、コードは[ESLint](http://eslint.org/ "ESLint")とテストでチェックして、サンプルコードに対してテストを書けるプロジェクト構造について書かれています。

どのように表記揺れなどやコードの間違いを防ぎながら、書籍を開発していくかについて書いているので詳しくは上記のスライドを見て下さい。(スライドの下へスクロールすると文章版が載ってます)

## スターターキット

上記の設定をすぐに使えるようにスターターキット的なものを作りました。

- [azu/gitbook-starter-kit](https://github.com/azu/gitbook-starter-kit "azu/gitbook-starter-kit")

実際にこのgitbook-starter-kitを電子書籍とした時の表示は以下で見ることができます。

- [GitBook Starter Kit - GitBook](https://www.gitbook.com/book/azu/gitbook-starter-kit/details "GitBook Starter Kit - GitBook")


### インストール

利用するときは以下のように3つのコマンドを叩くだけで準備が完了します。
(事前にNode.jsを入れておいて下さい)

```
# your-book-nameは好きなディレクトリ名
git clone https://github.com/azu/gitbook-starter-kit.git your-book-name
cd your-book-name
npm install
```

`.git`がそのまま引き継がれるのが気になる場合は以下のように`.git`を初期化するか、[zipでダウンロード](https://github.com/azu/gitbook-starter-kit/archive/master.zip)して使うなどすれば良い気がします。

```
rm .git
git init
```

### 使い方

[README.md](https://github.com/azu/gitbook-starter-kit)にも使い方などは書いてありますが、`npm start`をするだけでブラウザで書籍のプレビューが行えます。(今後変わるかもしれないのでREADME.mdの方を見て下さい)

```
npm start
# gitbookサーバが立つ
open http://localhost:4000/
```

[GitBook](https://github.com/GitbookIO/gitbook "GitBook")はHTMLだけPDFやEpub、MOBIでも出力できます。

[ebook-convert](http://manual.calibre-ebook.com/cli/ebook-convert.html "ebook-convert")が必要になるので、面倒な場合は[GitBook.com](https://www.gitbook.com/)で[GitHub Integration](https://help.gitbook.com/github/index.html "GitHub Integration | Documentation")をすれば、GitBook.comに自動的にPDFなどが生成されます。
(このIntegrationはFirefoxだと設定できないバグがある気がします)

### 文章を書く

gitbook-starter-kitでは以下のようなディレクトリ構造になっています。

```
.
├── README.md
├── SUMMARY.md <= 目次
├── ja/ <= .mdの文章を追加する
├── prh.yml
├── src/ <= サンプルコード
└── test/ <= サンプルコードのテスト
```

文章を追加する`ja/`というディレクトリ名には独別な意味はないため好きな名前に変更して問題ありません。

文章を追加する場合は以下の手順で行うことができます。

1. `ja/` 以下にMarkdownファイルで文章を追加する
2. `SUMMARY.md` に追加したMarkdownファイルへのリンクを書く

追加した後はデフォルトで自動的にリロードされるようになっています。
(`npm start`を叩きなおしても良い)


## テスト


    npm test


npm testで以下のテストが実行されます。

gitbook-starter-kitはJavaScript向けの設定にしているので、以下のようなテストが実行されます。

- [ESLint](http://eslint.org/ "ESLint")でのコードチェック
- [textlint](https://github.com/azu/textlint "textlint")での文章チェック
- [Mocha](http://mochajs.org/ "Mocha")でのテスト

並列でテストを実行できるように[npm-run-all](https://github.com/mysticatea/npm-run-all "npm-run-all")を利用しています。

テスト結果の表示が混ざるのが気になる場合は、`--parallel`オプションを外してみてください。

テストツールなどは普通のJavaScriptライブラリと変わらないので好きなものを使うといいかと思います。

このテストはTravis CIでも動くので、以下のように`.travis.yml`を作るだけで自動的にテストが動くようになります。

```
gem install travis
travis init node.js
```

## 表記揺れのテスト

[Markdownで書く電子書籍開発環境](http://azu.github.io/slide/niku_sushi/ebook_development.html "Markdownで書く電子書籍開発環境")でもプロジェクト固有のルールで表記揺れのチェックが必要になる話を書いています。

gitbook-starter-kitでは[prh.yml](https://github.com/azu/gitbook-starter-kit/blob/master/prh.yml)に辞書を追加することで表記揺れをチェックすることができます。
詳しい設定方法については以下を参照して下さい。

- [textlint + prhで表記ゆれを検出する | Web Scratch](http://efcl.info/2015/09/14/textlint-rule-prh/ "textlint + prhで表記ゆれを検出する | Web Scratch")
- [textlintで日本語の文章をチェックする | Web Scratch](http://efcl.info/2015/09/10/introduce-textlint/ "textlintで日本語の文章をチェックする | Web Scratch")

![gif](https://embed.gyazo.com/af14634690a0515c2c5ce56bd2fd6431.gif)

Atomと[1000ch/linter-textlint](https://github.com/1000ch/linter-textlint "1000ch/linter-textlint")を使うと保存する毎に表記揺れのチェックができるので、特に決まったエディタがないならAtomを使ってみるといいかもしれません(Markdownは書きやすいので)

## おわりに

今[JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "JavaScript-Plugin-Architecture")という電子書籍を書いてて作った文章を書く環境について紹介しました。

元々これは[[Markdown] 電子書籍開発環境 #42](https://github.com/azu/azu/issues/42 "[Markdown] 電子書籍開発環境 #42")で"もっと気軽に書ける電子書籍"をやりたい目的で作った感じです。

また、アドベントカレンダーの季節がやってきますが、一人アドベントカレンダーとして記事を沢山書くよりも小さな電子書籍として書いたほうが、メンテがしやすくなるのではと思ったのも一つのきっかけです。

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">一人でアドベントカレンダー大量に書くパターンに比べると、電子書籍(電子書籍と言うけど普通のHTMLページも含む)の方がPull Requestとか送りやすい環境に自然となりそう。&#10;アドベントカレンダーってどうも記事の延長にあるから、それっきりで情報の鮮度的に寿命が短い感じがする。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/538307698215751680">November 28, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

GitHubやGitBookなどのツールやプラットフォームがある今なら、電子書籍を書くのはものすごい高い壁ではないと思います(販売もGitBook.comとかLeanpubを使えばある程度簡単)。

最近では、ライブラリのリファレンスにGitBookを使ったりしてるケースも多くなってきたので、電子書籍というものがもっと気軽に書けるようになるといいじゃないかなと思います。
