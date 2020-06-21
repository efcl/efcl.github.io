---
title: "GitHub ActionsのbadgeをREADMEに簡単に入れるツールを書いた"
author: azu
layout: post
date : 2020-06-21T12:38
category: JavaScript
tags:
    - Github
    - CLI
    - Node.js

---

GitHub Actionsのbadge画像のMarkdownコードを生成する[github-actions-badge](https://github.com/azu/github-actions-badge)というコマンドラインツールを作りました。


- [azu/github-actions-badge: Generate GitHub Actions badge Markdown code.](https://github.com/azu/github-actions-badge)


こんな感じのGitHub ActionsのワークフローごとのBadgeを生成できます。

[![Actions Status: test](https://github.com/azu/github-actions-badge/workflows/test/badge.svg)](https://github.com/azu/github-actions-badge/actions?query=workflow%3A"test")

```
[![Actions Status: test](https://github.com/azu/github-actions-badge/workflows/test/badge.svg)](https://github.com/azu/github-actions-badge/actions?query=workflow%3A"test")
```

このBadgeの仕様は次のページにあります。

- https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-a-workflow#adding-a-workflow-status-badge-to-your-repository

## Install

Install with [npm](https://www.npmjs.com/):

    npm install github-actions-badge --global

## 使い方

    Usage
      $ github-actions-badge
 
    Options
      --format "markdown", "json"
 
    Examples
      # Copy GitHub Action as Markdown format
      $ github-actions-badge | pbcopy

GitHub Actionsの定義ファイル(`.github/workflows/*.yml`)が存在するリポジトリのトップディレクトリで実行するだけです。
ワークフローごとにMarkdownのコードを生成してくれます。

```
$ github-actions-badge
[![Actions Status: test](https://github.com/azu/github-actions-badge/workflows/ci/badge.svg)](https://github.com/azu/github-actions-badge/actions?query=workflow%3Aci)
```

WorkflowのページにもMarkdownのコピペコードがありますが、Workflowへのリンクが入ってなかったり、コマンドラインから取得したかったので、[github-actions-badge](https://github.com/azu/github-actions-badge) を作りました。

Travis CI版は次にリポジトリにあります。

- [azu/travis-badge: Output travis badge as markdown from git/config](https://github.com/azu/travis-badge)