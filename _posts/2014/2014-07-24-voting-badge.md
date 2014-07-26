---
title: GitHubなどで使える:+1:するバッジサービスを作った
author: azu
layout: post
categories:
    - webサービス
tags:
    - GitHub
    - Issue
    - WebService
    - Node.js
    - Heroku

---

# [Voting Badge](http://azu.github.io/voting-badge/ "Voting Badge")

[![Vote++](https://voting-badge.herokuapp.com/img?url=https://github.com/azu/voting-badge)](https://voting-badge.herokuapp.com/vote?url=https://github.com/azu/voting-badge)
 
GitHub Issueで賛成などを :+1: と書いてコメントすることが良くありますが、
投票ボタン的なものとしてそういうのが欲しかったので、Travis CIのバッジのように表示+投票できるボタンを作りました。

- [:1: Voting Badge](http://azu.github.io/voting-badge/ ":1: Voting Badge")

上記にアクセスしてURL(実はキーなら何でもいい)を書くとバッジのURLを作ってくれます。

img + link というよく見るバッジの仕組みと同じです。

## なぜ作ったか

GitHubの要望として既に同様のものがあります。

- [Add explicit `+1` feature for issues that isn&#39;t a comment · Issue #9 · isaacs/github](https://github.com/isaacs/github/issues/9 "Add explicit `+1` feature for issues that isn&#39;t a comment · Issue #9 · isaacs/github").

がずっと実装されなさそうな気がしています。

[shields.io](http://shields.io/ "shields.io")はバッジを作ってくれるサービスですが、
これを見た時にURLと投票数の関係を管理するサーバだけを作って、画像の生成などは[shields.io](http://shields.io/ "shields.io")にまかせてしまえば、
意外と簡単に+1バッジが作れるかもしれないと思ったのが始まりです。

## LevelDB

