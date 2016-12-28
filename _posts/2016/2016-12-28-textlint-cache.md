---
title: "textlint --cacheオプションでチェックを高速化した"
author: azu
layout: post
date : 2016-12-28T09:33
category: textlint
tags:
    - textlint
    - JavaScript

---

[textlint](https://github.com/textlint/textlint "textlint") 7.2.0で `--cache` と `--cache-location` オプションをサポートしました。

- [Release 7.2.0 · textlint/textlint](https://github.com/textlint/textlint/releases/tag/7.2.0 "Release 7.2.0 · textlint/textlint")

基本的にはESLintのキャッシュオプションと同じです。
前回のLint結果のキャッシュから変化したファイルのみがチェックの対象になる仕組みです。

- [Command Line Interface - ESLint - Pluggable JavaScript linter](http://eslint.org/docs/user-guide/command-line-interface#caching "Command Line Interface - ESLint - Pluggable JavaScript linter")

## 使い方

`textlint`コマンドに `--cache` オプションを付けて実行するだけです。
後は、毎回このコマンドを付けて実行すれば変更したファイルのみがチェック対象になるので、実行時間が高速化されます。

```sh
textlint --cache docs/
```

`--cache`オプションを付けるとデフォルトでは、 `.textlintcache` という名前のファイルにキャッシュができます。

キャッシュファイルを任意の名前にしたい場合は `--cache-location` オプションで指定した場所にキャッシュファイルを作ることができます。

## 実行例

自分が知ってる中では一度にtextlintがやる処理が一番多い[asciidwango/js-primer: JavaScriptの入門書](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")で試してみます。

このプロジェクトではファイル数やルール数が多いのもそうですが、textlintの中でESLintを動かしてJavaScriptのコードもチェックしてたりキャッシュの有無がかなり速度に影響がありました。

- [MarkdownのコードブロックをESLintでチェックするtextlintルール | Web Scratch](http://efcl.info/2016/07/06/eslint-with-textlint/ "MarkdownのコードブロックをESLintでチェックするtextlintルール | Web Scratch")

### --cacheなし

15秒ぐらいかかって遅い。

```sh
$ time npm run textlint:no-cached

> js-primer@1.0.0 textlint:no-cached /Users/azu/.ghq/github.com/asciidwango/js-primer
> summary-to-path ./source/README.md | xargs textlint -f pretty-error

npm run textlint:no-cached  14.68s user 1.18s system 99% cpu 15.926 total
```

### --cacheあり

3秒程度になった。
(1つファイルを変更した状態で実行)

```sh
$ time npm run textlint

> js-primer@1.0.0 textlint /Users/azu/.ghq/github.com/asciidwango/js-primer
> summary-to-path ./source/README.md | xargs textlint -f pretty-error --cache

npm run textlint  2.17s user 0.41s system 85% cpu 3.022 total

```

## おわり

`--cache` をつけるだけで結構実行時間が変わるので、大量のファイルをtextlintで繰り返しチェックしている場合は試してみてください。

また、エディタ連携系なら元々1つのファイルのみを対象に実行しているはずなので、キャッシュなくても普通な速度で動くと思います。


- [VS Codeでtextlintを使って文章をチェックする - Qiita](http://qiita.com/azu/items/2c565a38df5ed4c9f4e1)
- [textlintで日本語の文章を校正する方法とAtomへの導入手順 | Simplie Post](http://post.simplie.jp/posts/51)
