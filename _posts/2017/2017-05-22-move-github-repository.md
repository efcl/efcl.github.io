---
title: "GitHubのリポジトリをDprecatedにするスクリプト"
author: azu
layout: post
date : 2017-05-22T10:02
category: JavaScript
tags:
    - GitHub
    - JavaScript
    - Tools

---

GitHubのリポジトリを別の場所に移す場合、リポジトリ毎移動できるなら[repository transfers](https://help.github.com/articles/about-repository-transfers/ "repository transfers")を利用するのが正解です。

しかし、既存のリポジトリをmonorepoの一部として取り込む場合はそのようなことができません。リポジトリの履歴は[Lerna](https://lernajs.io/ "Lerna")などでは`lerna import`で取り込むことができますが、既に作ったリポジトリからリダイレクトさせることができません。

既存のリポジトリを消してしまうと、既に貼ったリンクなどが404になるためあまり良くありませんし、そのままにしておくと紛らわしいです。

そのため、よく取られるのはリポジトリは空にしてDescriptionなどで移動したことを書いておく手法です。

![moved](http://efcl.info/wp-content/uploads/2017/05/22-1495415248.png)

これをやる[move-github-repository](https://github.com/azu/move-github-repository "azu/move-github-repository: Move GitHub repository(Update description &amp;&amp; URL &amp;&amp; default branch).")というツールを書きました。

## [move-github-repository](https://github.com/azu/move-github-repository "azu/move-github-repository: Move GitHub repository(Update description &amp;&amp; URL &amp;&amp; default branch).")

[move-github-repository](https://github.com/azu/move-github-repository "azu/move-github-repository: Move GitHub repository(Update description &amp;&amp; URL &amp;&amp; default branch).")は、コマンド一発で次のようなことをします。


- リポジトリのdescription && homepageを更新する
- "301_moved_permanently"ブランチを作る
	- このブランチは移転してことを書いたREADME.mdのみがある
- "301_moved_permanently"をデフォルトブランチにする

これによって既存のブランチは維持されるので、リンクなどは切れません。

## インストール

npmでインストールできます。

```
npm install -g move-github-repository
```

GitHubのTokenと更新後に付けたいdescriptionとhomepageを引数に渡して実行できます。

```
Usage
  $ GH_TOKEN=xxx move-github-repository --description "[[MOVED]]" --homepage http://example.com/new

Options
  --description -d Description repository
  --homepage -h    New URL
  
Env
  GH_TOKEN=xxx move-github-repository --description "[[MOVED]]" --homepage http://example.com/new

Examples
  $ GH_TOKEN=xxx move-github-repository --description "[[MOVED]]" --homepage http://example.com/new
```

## サンプル

[textlint](https://github.com/textlint/textlint "textlint")をmonorepoに移動させていたので、実際に移動させたリポジトリなどは次のような感じです。

- [textlint/txt-to-ast: [CAUTION] This repository is MOVED to monorepo.](https://github.com/textlint/txt-to-ast "textlint/txt-to-ast: [CAUTION] This repository is MOVED to monorepo.")
- [textlint/textlint-plugin-text: [CAUTION] This repository is MOVED to monorepo.](https://github.com/textlint/textlint-plugin-text "textlint/textlint-plugin-text: [CAUTION] This repository is MOVED to monorepo.")
- [textlint/textlint-plugin-markdown: [CAUTION] This repository is MOVED to monorepo.](https://github.com/textlint/textlint-plugin-markdown "textlint/textlint-plugin-markdown: [CAUTION] This repository is MOVED to monorepo.")

