---
title: 定期更新されるJavaScript等の情報サイトをまとめたMeta-Weeklyというサイトを作りました
author: azu
layout: post
permalink: /2013/0825/res3409/
dsq_thread_id:
  - 1642099422
categories:
  - javascript
tags:
  - css
  - HTML
  - javascript
  - Mail
---
# はじめに

[JavaScript Weekly][1] や 私がやってる[JSer.info][2]など、  
週刊などでJavaScript等の情報について紹介するサイトがここ数年でかなり多くなりました。

詳しくは[オフライン勉強会でJSer.info一周年について発表してきた | JSer.info][3]でも[乱立するまとめサイト][4]として触れています。

それらのサイト、メールマガジン、ポッドキャスト等をまとめた[Meta Weekly][5]というサイトをつくったという話です。

## [Meta Weekly][5]って何?

[<img src="https://efcl.info/wp-content/uploads/2013/08/Meta-Weekly-2013-08-25-14-51-23.jpg" alt="Meta Weekly 2013 08 25 14 51 23" title="Meta Weekly 2013-08-25 14-51-23.jpg" border="0" width="600" height="321" />][6]

[Meta Weekly][5] は 単純にそれらのサイトをまとめたリンク集のようなものです。

基本的にまとめているサイトは、フロントエンド、JavaScriptに関連するような生きているサイトをリストアップしています。

機能らしい機能はDaily, Weeklyなどでフィルターするぐらいしかありませんが、RSSがあるサイトなどはそれも含めて記載しているので、気になるものは購読(メールマガジンも多いです)してみるといいです。

## 運用

[Meta Weekly][5] はGithub Pages上で動いてるいる単純な静的サイトです。

各サイトの情報は、[data.json][7]というファイルにまとめられていて、この[data.json][7]を更新するとサイトに反映されます。

具体的には、[Travis CI][8] で[data.json][7]をLintするテストが走って、その結果が正しければTravis CIから `gh-pages` に静的サイトをジェネレートした結果をpushして更新しています。

*   [using travis-ci to build using docpad, and publish to github pages][9]
*   [Middleman で作った web サイトを Travis + GitHub pages でお手軽に運用する &#8211; tricknotesのぼうけんのしょ][10]

## コントリビューション

Githubでやっているので、追加したいサイトや間違い、デザイン的な問題等があったら[azu/Meta-Weekly][11]にPull Requestを送ってもらえると助かります。

コントリビューションするときに参考になることは、[CONTRIBUTING.md][12]にも書きましたが、  
基本的にサイト情報を更新するだけなら、`master` の [data.json][7] だけの変更をコミットしてもらえれば問題ないです。

今のところサイトの情報に含めているのは以下のような項目です

*   **title** — サイト名
*   **url** — URL
*   **updated** — 更新頻度 
    *   &#8220;daily&#8221;
    *   &#8220;weekly&#8221;
    *   &#8220;fortnightly&#8221;
    *   &#8220;monthly&#8221;
    *   &#8220;other&#8221;
*   **keywords** — キーワードの配列
*   **rss** — RSS URL
*   **twitter** — Twitter の URL

Pull RequestなりIssueは日本語でOKなので適当にコミットしてくれると助かります。

仕組みとしては、jsonでデータ管理する仕組みとしては[Can I use&#8230;][13]を参考にしました。

*   [Fyrd/caniuse][14]
*   [Data contributions via GitHub][15]

## まとめ

*   [Meta Weekly][5] というサイトをGithub Pagesで公開した
*   フロントエンドやJavaScriptに関連するリンク集サイト
*   Githubで運用してるのできになったらPull Requestして下さい

 [1]: http://javascriptweekly.com/ "JavaScript Weekly"
 [2]: http://jser.info/ "JSer.info"
 [3]: http://jser.info/post/15883533195 "オフライン勉強会でJSer.info一周年について発表してきた | JSer.info"
 [4]: http://azu.github.io/slide/offline_study/javascript_world.html#slide25 "乱立するまとめサイト"
 [5]: http://azu.github.io/Meta-Weekly/ "Meta Weekly"
 [6]: http://azu.github.io/Meta-Weekly/
 [7]: https://github.com/azu/Meta-Weekly/blob/master/data.json "data.json"
 [8]: https://travis-ci.org/azu/Meta-Weekly "Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community"
 [9]: https://gist.github.com/bewest/6100033 "using travis-ci to build using docpad, and publish to github pages"
 [10]: http://tricknotes.hateblo.jp/entry/2013/06/17/020229 "Middleman で作った web サイトを Travis + GitHub pages でお手軽に運用する - tricknotesのぼうけんのしょ"
 [11]: https://github.com/azu/Meta-Weekly "azu/Meta-Weekly"
 [12]: https://github.com/azu/Meta-Weekly/blob/master/CONTRIBUTING.md "CONTRIBUTING.md"
 [13]: http://caniuse.com/ "Can I use…"
 [14]: https://github.com/Fyrd/caniuse "Fyrd/caniuse"
 [15]: http://caniuse.com/feed/136 "Data contributions via GitHub"
