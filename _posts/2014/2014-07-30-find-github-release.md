---
title: GitHubでのリリースを見ていくためのツール集
author: azu
layout: post
categories:
    - github
tags:
    - JavaScript
    - GitHub
    - Greasemonkey
    - Firefox
    - Browser
    - ReleaseNote

---

## GitHubでのリリース

前回、GitHubのRelease機能ついて書きましたが、これはリリースする側の自動化などの仕組みについてでした。

* [git tagとGitHub ReleasesとCHANGELOG.mdの自動化について | Web Scratch](http://efcl.info/2014/07/20/git-tag-to-release-github/ "git tagとGitHub ReleasesとCHANGELOG.mdの自動化について | Web Scratch")

今度は、リリースを見る側 - いわゆるライブラリユーザーだったりソフトウェアの利用者側から、
GitHubでのReleaseをどう追っていくかについて書いていきたいと思います。

自分は、[JSer.info](http://jser.info/ "JSer.info")というJavaScriptの情報を見ていくサイトをやっているので、
JavaScriptのライブラリ等のリリース情報をどう追っていくかが中心になりますが、基本的にGitHubでリリースされてるならやり方は大きな違いはありません。

基本的には以下に色々書いていた内容のGitHubに関してをまとめた感じの記事となっています。

* [最近のJavaScript情報の探し方 · Issue #2 · jser/jser.info](https://github.com/jser/jser.info/issues/2 "最近のJavaScript情報の探し方 · Issue #2 · jser/jser.info")

## リポジトリをWatchする

GitHubではリポジトリをStar/Watchすることが出来ます。

Starは単純なブックマークですが、Watchは登録したリポジトリに関係ある通知(イベントといわれる)がNotification画面に表示されます。

またデフォルトでは、登録したメールアドレスにWatchの通知メールが流れてきます。

メールを購読するのはどうやってもスケールするイメージが出てこなかったので、
自分の場合はNotificationを見るためのビューアアプリを通して通知を見ています。
(代わりにメールの通知はフィルタして無効化しています)

* [azu/github-reader](https://github.com/azu/github-reader "azu/github-reader")
* [Githubのタイムラインや通知を見るアプリをnode-webkitで作った | Web Scratch](http://efcl.info/2014/0430/res3872/ "Githubのタイムラインや通知を見るアプリをnode-webkitで作った | Web Scratch")

Watchしたリポジトリのイベントは大量に流れてくるので、基本的に殆ど中身までは見ていません。

[github-reader](https://github.com/azu/github-reader "azu/github-reader")ではGrowlで通知出来るようになってるので、
Growlにひたすら流して気になったものが見えたら見に行くという感じの使い方をしています。


## 人をFollowする

GitHubではTwitterのように人をフォローすることができるので、気になるリポジトリのOwnerをフォローするといいでしょう。

ただしGitHubの場合はタイムラインに流れてくるのは、コミットやStar、Watchなど人に関するイベントです。

また、GitHubのタイムライン表示はまともに追うことが困難なUIとなっています。
そのため自分は[github-reader](https://github.com/azu/github-reader "azu/github-reader")を通して見ています。

[github-reader](https://github.com/azu/github-reader "azu/github-reader") はWatchしたリポジトリのイベントと
フォローした人のイベントを混ぜているので、基本的に一緒に眺めています。(主にGrowl通知なのは変わらない)

### 人のStarをフォローする

人のイベントは先ほども書いたようにコミット等の細かいものから、Starを付けたリポジトリなど多種多様です。

新しいものを見つけるという点では**star**だけ見ていけば十分と言えるので、
Starに関しては~~~~~を利用すると、フォローしてる人のStarを一覧できるので便利だと思います。
