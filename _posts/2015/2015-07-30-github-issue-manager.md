---
title: "自分に関係するGitHub Issueを一覧できるアプリを書いた"
author: azu
layout: post
date : 2015-07-30T09:42
category: GitHub
tags:
    - GitHub
    - issue
    - JavaScript
    - NW.js

---

[github-issue-teev](https://github.com/azu/github-issue-teev "github-issue-teev")という自分に関連するIssueを一覧するアプリをNW.jsで書きました。

![screenshot](http://monosnap.com/image/2JTJWEqoZAFuSqqT57edf7xSEtqpwi.png)

## 機能

- 自分がAssignedされてるIssue一覧を表示
- アプリ内でお気に入り登録したリポジトリのIssue一覧を表示
- サイドバーにそのIssue内にある`- [ ]`のタスク一覧を表示
- テキストエリアをCodeMirrorのエディタにすり替える機能
    - `Cmd+e` でトグルできます。
    - [テキストエリアをMarkdownエディタに切り替えるGreasemonkeyを書いた | Web Scratch](http://efcl.info/2015/05/10/codemirror-anywhere/ "テキストエリアをMarkdownエディタに切り替えるGreasemonkeyを書いた | Web Scratch")と同じものです

## インストール

[Latest Release](https://github.com/azu/github-issue-teev/releases/latest)からダウンロードできます。

NW.jsなのでWindows/OS X/Linuxで動くと思います。

## 使い方

1. アプリを開く
2. [Personal token](https://github.com/settings/tokens)を作ってサイドバーに入力する
    - [Creating an access token for command-line use - User Documentation](https://help.github.com/articles/creating-an-access-token-for-command-line-use/ "Creating an access token for command-line use - User Documentation")
    - これでIssue一覧が表示できます。
3. 普通にWebViewで表示されてるGitHubにログインする

APIと普通のログイン 両方やる必要があってちょっと面倒ですが、こんな感じで使えるようになります。

-----

最近[Producteev](https://producteev.com/ "Producteev")というプロジェクト/TODO管理アプリを使ったりしてるのですが、個人で使う場合でも結構入力しやすくて使いやすくて気に入ってます。

[github-issue-teev](https://github.com/azu/github-issue-teev "github-issue-teev")も若干これをインスパイアした感じで作りました。