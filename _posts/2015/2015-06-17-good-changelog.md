---
title: "良いChangeLog、良くないChangeLog"
author: azu
layout: post
date : 2015-06-18T11:00
category: GitHub
tags:
    - プログラミング
    - JavaScript
    - Changelog
    - GitHub

---

以前、[われわれは、いかにして変更点を追うか](http://azu.github.io/slide/cto/changelog.html "われわれは、いかにして変更点を追うか")という内容で発表しましたが、
その時書き忘れてたことの補足的な記事です。

GitHubでのChangeLogの扱いについての話

<div class="kwout" style="text-align: center;"><a href="https://azu.github.io/slide/cto/changelog.html"><img src="http://kwout.com/cutout/c/v2/sz/8pm_bor.jpg" alt="http://azu.github.io/slide/cto/changelog.html" title="われわれは、いかにして変更点を追うか" width="600" height="328" style="border: none;" /></a><p style="margin-top: 10px; text-align: center;"><a href="http://azu.github.io/slide/cto/changelog.html">われわれは、いかにして変更点を追うか</a></p></div>

このスライドは、ChangeLogから詳細を追う方法を知ることで、転じて分かりやすいChangeLogを書くことができるようになるのではという話でした。

![changelog-image](https://azu.github.io/slide/cto/flow.png)

スライドでは、ChangeLogの追い方として[Babel 5.3.0](https://github.com/babel/babel/blob/master/CHANGELOG.md#530 "5.3.0")を例としてどうやって、このChangeLogから詳細を見ていくかについて話していました。

[![Babel](https://azu.github.io/slide/cto/img/babel5.3.0-full.jpg)](https://github.com/babel/babel/blob/master/CHANGELOG.md#530)

このBabelのChangeLogの問題点としては、変更点については書かれているのですが具体的にどういう変更だったのか、また関連するIssue/Pull Requestへのリンクがないため、ChangeLog単体では詳細がわからないという問題があったので例としていました。

Babelを例に見ると、変更した内容を1行のテキストで表現するのは難しく、Gitのコミットメッセージの1行目に要約を書くのと同じく、ChangeLogに列挙されている内容も要約が並んだ状態になりやすいと思います。

そこから更に詳細な情報を載せるにはコミットメッセージの本文にあたる部分を載せるか(さすがに冗長になるので避けるが)、詳細は別のところで見られるようにリンクを貼るのが良いと思います。

要約の列挙+詳細へのリンクを上手くやっている例としては[npm/npm](https://github.com/npm/npm "npm/npm")がよく出来てると思います。

- [Releases · npm/npm](https://github.com/npm/npm/releases "Releases · npm/npm")
- [Releases · sass/libsass](https://github.com/sass/libsass/releases "Releases · sass/libsass")


余計なものを取り除く + 詳細へのリンクの有無でどれくらい見やすさが変わるかは[mocha](https://github.com/mochajs/mocha/blob/master/HISTORY.md "mocha/HISTORY.md at master · mochajs/mocha")の改善例を見てみると実感できると思います。

![mocha](https://monosnap.com/image/zuE5fEpsDB2fzA8P1dsPQu4HZxfdtZ.png)

- [HISTORY: improve 2.2.5 changelog by rstacruz · Pull Request #1739 · mochajs/mocha](https://github.com/mochajs/mocha/pull/1739/files?short_path=88dc747 "HISTORY: improve 2.2.5 changelog by rstacruz · Pull Request #1739 · mochajs/mocha")

(これを更に種類でグルーピングすると見やすくなる)

### ChangeLogの自動生成

上記のChangeLogを見ているとコミットから自動生成できそうと考えるのが自然だと思います。

[angular.js 1.x](https://github.com/angular/angular.js/blob/master/CHANGELOG.md "angular.js/CHANGELOG.md at master · angular/angular.js")や[io.js](https://github.com/nodejs/io.js/blob/master/CHANGELOG.md "io.js")なんかはそういうことをしていて(微妙に手修正があるけど)、以下のようなツールがあると思います。

- [rvagg/changelog-maker](https://github.com/rvagg/changelog-maker)
- [ajoslin/conventional-changelog](https://github.com/ajoslin/conventional-changelog)
- [clog - A conventional changelog generator for the rest of us](http://blog.thoughtram.io/announcements/tools/2014/09/18/announcing-clog-a-conventional-changelog-generator-for-the-rest-of-us.html)
- [lalitkapoor/github-changes](https://github.com/lalitkapoor/github-changes)

これは以前[Git tagとGitHub ReleasesとCHANGELOG.mdの自動化について | Web Scratch](https://efcl.info/2014/07/20/git-tag-to-release-github/ "Git tagとGitHub ReleasesとCHANGELOG.mdの自動化について | Web Scratch")とかでも紹介してた気がします。

しかし、こういう自動生成ツールを使っても見やすいChangeLogになるかは別の問題で、コミット時に結構考えないと余計な情報が多くて見難いChangeLogが生成されると思います。

[Mochaの古いChangeLog](https://github.com/mochajs/mocha/blob/master/HISTORY.md#220--2015-03-06)をみてもらうとChangeLogがあっても、コミットメッセージが並んでるだけだと読むのが辛いと思います。

こういうChangeLogに出すべきではないコミットメッセージを意識することが結構大事で、それがconventional-changelogの[chore](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md "chore")のようなtypeをコミットメッセージに書くことで、どのコミットをChangeLogには含めないかを決めることだと思います。


自動生成する場合は、どれだけ余計な情報を削るかが見やすいChangeLogに繋がると思います。

### ChangeLogの手書き

ChangeLogを手書きするならGitHubの[Releases](https://help.github.com/articles/creating-releases/ "Releases")機能を使うのが楽だし、RSSなども自動でできるし良いと思います。

機械的に自動生成されたChangeLogと[Releases](https://help.github.com/articles/creating-releases/ "Releases")機能は齟齬がなければ併用しても別に問題なくて、ChangeLog以上ブログ未満みたいな感覚で使うのがいいのかなと思ってます。

正直まだベストな解は分かってないですが、コミット時にChangeLogを意識すると結構かわるんじゃないかと思っています。(semverにもかかわる感じがします)
