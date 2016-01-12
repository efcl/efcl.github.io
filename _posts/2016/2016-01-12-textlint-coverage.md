---
title: "textlintで文章カバレッジレポートを継続的に見ていく"
author: azu
layout: post
date : 2016-01-12T09:44
category: JavaScript
tags:
    - textlint
    - coverage
    - JavaScript

---

## 文章カバレッジ

以前、[技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/ "Introduction | 技術文書をソフトウェア開発する話")で[textlint](https://github.com/textlint/textlint "textlint")や[GitBook](https://www.gitbook.com/ "GitBook · Writing made easy")を使って文書を開発する方法についてお話しました。

その時に、自然言語のチェックの自動化などはまだ色々考えられることがあるという話をしました。

> 文書のテストはまだまだ色々できることがある  
> カバレッジを取るとかメトリクスを取るとか  
> -- [まとめ1 | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/slide/100.html "まとめ1 | 技術文書をソフトウェア開発する話")

そこで文章のカバレッジというものを考えて実装してみました。

[textlint](https://github.com/textlint/textlint "textlint")とコードカバレッジの仕組みを使ったものですが、こういうのをなんと呼べばいいのかよくわからなかったので、ここではとりあえず"文章カバレッジ"と読んでいます。

textlintは全ての文に対してLintを実行するので命令網羅と近い感じがします。

> 命令網羅（statement coverage：SC）  
> コード内のすべての命令が少なくとも1回は実行されるようにテストを設計する。欠陥検出力は弱い
> -- [情報システム用語事典：カバレッジ基準（かばれっじきじゅん） - ITmedia エンタープライズ](http://www.itmedia.co.jp/im/articles/1111/07/news142.html "情報システム用語事典：カバレッジ基準（かばれっじきじゅん） - ITmedia エンタープライズ")

よくよく考える仕組み的にカバレッジではないので、何か別の名前が必要な気がします。

### カバレッジ

具体例がないとイメージしにくいと思うので、[azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "azu/JavaScript-Plugin-Architecture")を例にしてみます。

[JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "azu/JavaScript-Plugin-Architecture")という文書では今回作ったtextlintの文章カバレッジを表示しています。

[![codecov.io](https://codecov.io/github/azu/JavaScript-Plugin-Architecture/coverage.svg?branch=master)](https://codecov.io/github/azu/JavaScript-Plugin-Architecture?branch=master)

![coverage graph](https://codecov.io/github/azu/JavaScript-Plugin-Architecture/branch.svg?branch=master)

textlintから既存のコードカバレッジのフォーマットである[lcov](http://ltp.sourceforge.net/coverage/lcov/geninfo.1.php)を出力出来るようにしているので、Coverallsなどコードカバレッジサービスとそのまま連携することができます。

- [Coveralls - Test Coverage History & Statistics](https://coveralls.io/)
- [Codecov - Code Coverage](https://codecov.io/)
 
コマンドラインからもこのカバレッジを表示することができます。
lcovファイルを渡すとそのカバレッジを表示してくれる[lcov-summary](https://github.com/azu/lcov-summary "lcov-summary")というCLIを書いたのでそれを利用しています。

```sh
npm run textlint:coverage

> javaScript-plugin-architecture@0.1.1 textlint:coverage /Users/azu/.ghq/github.com/azu/JavaScript-Plugin-Architecture
> summary-to-path | xargs textlint -c coverage.textlintrc -f lcov | lcov-summary


Code Coverage Results:

 96.83% (61/63) README.md
 92.59% (25/27) ORGANIZATION.md
 97.60% (122/125) ja/jQuery/README.md
 96.45% (299/310) ja/ESLint/README.md
 95.59% (195/204) ja/connect/README.md
 96.38% (293/304) ja/gulp/README.md

Total Coverage:  96.32%
```

## 仕組み

仕組みは意外と簡単で、既存のパーツを組み合わせて動くようにしました。

textlintのLintの結果は"compact", "checkstyle", "jslint-xml", "junit", "tap", "pretty-error", "json"などの形式で出力できます。
それらに加えて、コードカバレッジのフォーマットである`lcov`と`codecov`を作りました。

- [azu/textlint-formatter-codecov](https://github.com/azu/textlint-formatter-codecov)
- [azu/textlint-formatter-lcov](https://github.com/azu/textlint-formatter-lcov)

[Codecov JSON](https://gist.github.com/codecov-io/96e1addb96856a9034c2 "Codecov JSON")フォーマットは[Codecov](https://codecov.io/ "Codecov")用の形式ですが、他のコードカバレッジにはないメッセージ情報を含めることができます。

これを利用すれば、Codecov上にカバレッジとメッセージ(Lintのエラーメッセージ)を表示することができます。

[![architecuture](http://efcl.info/wp-content/uploads/2016/01/12-1452563559.png)](https://codecov.io/github/azu/JavaScript-Plugin-Architecture/ja/connect/README.md?ref=e2fabe23359c253760b48641ad464c79a4f483e9)

カバレッジの結果として

- textlintで問題がなかった行を1
- textlintで問題があった行を0

としています。(マイナスとか小数点をサポートしてない場合もあるので1と0という風にしてます)


## 文章カバレッジのモチベーション

今回実装した文章カバレッジの仕組みの話です。

その前に、この仕組みのモチベーションについて書いておきます。

[ESLint](http://eslint.org/ "ESLint")や[textlint](https://github.com/textlint/textlint "textlint")などのLint系に共通する話ですが、LintはCIに入れるとユニットテストに比べて、スタイルに近いチェックが多いためCIを落としやすいです。

厳しいスタイルのチェックをLintで行うと毎回のようにCIが落とすので、厳しめのルールは入れにくい気がしています。

Lintはエディタなどの書く環境に統合してリアルタイムでチェックするのが一般的だと思いますが、そうした場合でも厳しめのルールを一つ入れるだけで大量のエラーがでるため書くモチベーションを奪ってしまうことがあります。

この場合、FAIL/PASSという極端な結果ではなく、WARNINGやINFOというようなレベルを間に入れることで解決するように思えますが、そういった情報に慣れてしまうと無視してしまうのが人間です。

そのため、警告などの情報を上手く扱える必要があると思っていました。カバレッジは百分率で値がでるので、そういう中間的な状態を扱いやすいと思います。

これを利用すると普通に書いてて落としてしまうような厳しめのルールが導入しやすいと思いました。

例えば、[azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "azu/JavaScript-Plugin-Architecture")では通常全て通ってるべき[.textlintrc](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/.textlintrc ".textlintrc")と厳しめのルールを採用した[coverage.textlintrc](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/coverage.textlintrc "coverage.textlintrc")を使っています。

カバレッジには[coverage.textlintrc](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/coverage.textlintrc "coverage.textlintrc")を使ったtextlintの結果を[Codecov](https://codecov.io/ "Codecov")に送っています。

こうすることで、普通に書いてると入れるのが難しいルールも取り入れやすくなり、後で[Codecov](https://codecov.io/ "Codecov")上で特定のファイルだけ妙に数値が落ちてることなどが発見できます。

- [azu/JavaScript-Plugin-Architecture@master](https://codecov.io/github/azu/JavaScript-Plugin-Architecture?branch=master "azu/JavaScript-Plugin-Architecture@master")

チェック結果を継続的に数値化して見ることが出来ることを実現したくて、そういう仕組みを持っている既存のコードカバレッジの仕組みに乗ったという感じです。

なのでやっぱりカバレッジではない気はしています。

多分これはJenkinsで静的解析の警告数レポートを出すのと似たような話なのだと思います。

- [Jenkinsを使って継続的に静的コード解析をさせる - suzukijの日記](http://d.hatena.ne.jp/suzukij/20120611/1339368249)
- [Jenkinsでカバレッジレポートや静的解析レポートを出力してみよう！Part1 | Opentone Labs.](http://labs.opentone.co.jp/?p=735)


## 使い方

使い方は単純でtextlintのformatterとして実装してあるので

例えば、[textlint-formatter-lcov](https://github.com/azu/textlint-formatter-lcov "azu/textlint-formatter-lcov")ならインストールして`-f lcov`と指定すればいいだけです。

```
npm install -D textlint textlint-formatter-lcov
$(npm bin)/textlint -f lcov README.md
# lcov形式で結果が出力される
$(npm bin)/textlint -f lcov README.md -o lcov.info
# ファイルとして保存する
```

[Codecov](https://codecov.io/ "Codecov")へカバレッジを送りたい場合`textlint-formatter-codecov`を使って

```
npm install -D textlint textlint-formatter-codecov codecov.io
$(npm bin)/textlint -f codecov README.md | codecov
```

とするだけです。

CodecovはPull Request毎にカバレッジを書いてくれるBotとかもあるので面白いです。

![codecov bot](http://efcl.info/wp-content/uploads/2016/01/12-1452597521.png)

- [feat(coverage): add coverage for text by azu · Pull Request #91 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/pull/91 "feat(coverage): add coverage for text by azu · Pull Request #91 · azu/JavaScript-Plugin-Architecture")

## おわり

[textlint](https://github.com/textlint/textlint "textlint")を使って文章カバレッジ?を取る方法について書きました。

- [azu/textlint-formatter-codecov](https://github.com/azu/textlint-formatter-codecov)
- [azu/textlint-formatter-lcov](https://github.com/azu/textlint-formatter-lcov)
- [azu/lcov-summary](https://github.com/azu/lcov-summary "azu/lcov-summary")

最初は[textstat](https://github.com/azu/textstat "textstat")を使ってメトリクスを継続的に取る方法を探していましたが、途中でコードカバレッジの仕組みをLinterにも持ってくれば面白いのではないかと気づきました。

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p lang="ja" dir="ltr">コードカバレッジを常に100%としてるプロジェクトって普通はないから、理想的な状態を表現したルールを100%として、コードカバレッジの%が理想に対する現実の%として表現できそうな感じ。&#10;&#10;Lintのルールは厳しくすると書くのが辛いから、理想と現実のルールは上手く分離できそう</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/684300797102800896">January 5, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

この仕組みは[ESLint](http://eslint.org/ "ESLint")とか他のLintでもlcov形式で出力すればできるので、Lintカバレッジレポートみたいなものなのかもしれません。

Travis CIとかと連携してコミットに紐付いて特定の値を貯めることが出来るウェブサービスがあったらまた別の方法がとれるかもしれません。

Google Analyticsとかで実現できそうですがあんまり使いやすくないです。

- [コマンドラインからGoogle Analyticsにデータを記録するGAERをつくった - MOL](http://t32k.me/mol/log/gaer/ "コマンドラインからGoogle Analyticsにデータを記録するGAERをつくった - MOL")
- [mattdesl/npm-install-analytics](https://github.com/mattdesl/npm-install-analytics "mattdesl/npm-install-analytics")

[技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/ "Introduction | 技術文書をソフトウェア開発する話")でも話していましたが、文章に対するプログラミング言語のようなツールはまだまだ少ない印象です。
(研究から出てるツールはあるけど、特定のユースケースをはみ出ると使えなくなる印象)

文書もCIを回して開発するのがもっとあたりまえになってくると、もっと面白いことが色々起きるのではないかと思っています。