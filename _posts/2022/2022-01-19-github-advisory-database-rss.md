---
title: "GitHub Advisory DatabaseのRSSフィードを作った"
author: azu
layout: post
date : 2022-01-19T11:26
category: 雑記
tags:
    - GitHub
    - Security

---

[GitHub Advisory Database](https://github.com/advisories)のRSSフィードがなかったの作りました

[JSON Feed](https://www.jsonfeed.org/)とAtomフィードを出力しています。
基本的にはJSON Feedをメインにしてますが、SlackがJSON FeedをサポートしてなかったのでAtomを追加しました。

- [RSS Feeds for GitHub Advisory Database](https://azu.github.io/github-advisory-database-rss/)

[GitHub Advisory Database](https://github.com/advisories)は、脆弱性のデータベースでRubyとかGoとかnpmとかRustとか言語ごとの脆弱性が集まっています。また、GitHub自体がセキュリティアドバイザリーの仕組みを持っているので、外部の脆弱性データベースにないものとかもあります。

- [About GitHub Security Advisories - GitHub Docs](https://docs.github.com/en/code-security/security-advisories/about-github-security-advisories)

JavaScriptだとnpm auditとかはこのデータベースを参照したりしています。

- [GitHub Advisory Database now powers npm audit | The GitHub Blog](https://github.blog/2021-10-07-github-advisory-database-now-powers-npm-audit/)

[RSS Feeds for GitHub Advisory Database](https://azu.github.io/github-advisory-database-rss/)では言語(エコシステム)ごとそれぞれフィードを作っています。
また、[OPMLフィード](https://azu.github.io/github-advisory-database-rss/index.opml)に対応してるRSSリーダならまとめて購読できます。(inoreaderなど)

## 余談

GraphQLで[GitHub Advisory Database](https://github.com/advisories)のデータを取得しているのですが、
アドバイザリーをpublishした人を取る方法がよくわからなくてauthorが現在固定値になっています。
この辺わかる人Pull Requestください！

- https://github.com/azu/github-advisory-database-rss/blob/030a7bf9ab3fcc864bd0705ad4afa1f0601d7cbd/src/generate-rss.ts#L57-L81

仕組み的にはGitHub Actionsで毎日RSSファイルを出力しているだけです。

- [azu/github-advisory-database-rss: GitHub Advisory Database RSS Feeds.](https://github.com/azu/github-advisory-database-rss)

現在[GitHub Advisory Database](https://github.com/advisories)にある言語は個別でフィードを出力していますが、言語が増えたらPull Requestください！