---
title: "JavaScript PrimerのES2024対応を手伝ってくれるContributorとSponsorを募集しています"
author: azu
layout: post
date : 2024-03-21T10:00
category: JavaScript
tags:
    - jsprimer
    - ECMAScript
    - JavaScript
    - book

---

[JavaScript Primer](https://jsprimer.net/)のES2024の対応を進めていく予定なので、
対応を手伝ってくれるContributorとjsprimerというプロジェクトを支援してくれるSponsorを募集しています。

## 3行サマリー

- ES2024の対応を6月末までにやる[マイルストーン](https://github.com/asciidwango/js-primer/milestone/5)を切りました
- ES2024の対応を手伝ってくれるContributorを募集しています
- [Open Collective](https://opencollective.com/jsprimer)を始めたので、プロジェクトを支援してくれるSponsorを募集しています

## jsprimerのES2024対応

jsprimerは毎年のECMAScriptの仕様改定にあわせてメジャーアップデートを行なっています。
次の更新は、2024年6月末ごろにリリースされる予定のECMAScript 2024に対応する予定です。

そのため、ES2024の対応とユースケースであるNode.jsに関するアップデートをしていくマイルストーンを切りました。

- [v6(ES2024) Milestone](https://github.com/asciidwango/js-primer/milestone/5)

[ES2024に対応するマイルストーン](https://github.com/asciidwango/js-primer/milestone/5)をざっとみると、大体ざっくり12-20日分ぐらいのタスクがあります。

![v6(ES2024) Milestone](/wp-content/uploads/2024/03/20-1710920867.png)

大きく分けて次の3つのグループに分かれています。

- ES2024の対応
- Stage 2.7の追加
- Node.jsのユースケースの更新

### ES2024の対応

ES2024ではいくつか機能が増えているので、それに対応するアップデートを行います。
[ECMAScript 2024の対応 · Issue #1706](https://github.com/asciidwango/js-primer/issues/1706)というIssueに、ES2024の対応についてのタスクをまとめています。

具体的に対応したいIssueは次の3つになっています。

- [ES2024: array-grouping · Issue #1716](https://github.com/asciidwango/js-primer/issues/1716)
- [ES2024: Well-Formed Unicode Strings · Issue #1715](https://github.com/asciidwango/js-primer/issues/1715)
- [ES2022: Error Cause · Issue #1714](https://github.com/asciidwango/js-primer/issues/1714)

Array Groupingは恐らく対応が必須ですが、他の2つは必要なら対応する形になると思います。
実際に内容や入れる場所を考えてみて、それが読む人にとってほんとに必要な情報なのかどうかを考えて判断する形になると思います。

jsprimerでは、必ずしも新しい機能を網羅的に解説はしていません。
これはjsprimerでは、リファレンスを作ることは、[目的ではないこと](https://jsprimer.net/intro/#do-not)だからです。

### Stgae 2.7の追加

ECMAScriptの仕様策定プロセス自体が変更されているので、それを解説してる[ECMAScript · JavaScript Primer #jsprimer](https://jsprimer.net/basic/ecmascript/)を更新する予定です。

- [Stage 2.7を追加する · Issue #1713](https://github.com/asciidwango/js-primer/issues/1713)

多分これは自分がやるような気もしますが、やりたい人がいればコメントください。

### Node.jsのユースケースの更新

[Node.jsでCLIアプリ · JavaScript Primer #jsprimer](https://jsprimer.net/use-case/nodecli/)の章を全体的にアップデートする予定です。

[Meta: Node.jsのユースケースの更新 · Issue #1719](https://github.com/asciidwango/js-primer/issues/1719)というMeta Issueに依存関係をまとめています。
最近は、今まではnpmパッケージを使わないといけなかったものが、Node.jsの標準機能になったりしているので、それに対応する形のリファクタリングになります。

- [Node.js 20 LTSへアップデートする · Issue #1718](https://github.com/asciidwango/js-primer/issues/1718)
- [mochaを `node:test` に変更する · Issue #1717](https://github.com/asciidwango/js-primer/issues/1717)
- [utils.parseArgsの利用法を追記 · Issue #1698](https://github.com/asciidwango/js-primer/issues/1698)
- [markedjsのアップデート · Issue #1694](https://github.com/asciidwango/js-primer/issues/1694)

こちらは、サンプルコードのアップデートやそれにあわせた文章の変更が中心になります。
そのため、基本的に文章の意味合いを変えるような変更は少なくて、リファクタリング的な変更が中心になります。

## jsprimerのContributorを募集しています

今回のjsprimerのES2024の対応を手伝ってくれるContributorを募集しています！

先ほども書いていましたが、おおよそざっくり12-20日ぐらいのタスクがあります。
jsprimerは文章のプロジェクトですが、[textlint](https://textlint.github.io/)でのチェックやテストも多いので、必要以上に恐れずに手伝ってくれると嬉しいです。

Node.jsのユースケースの更新は、Node.jsの新しい機能を使うように変更するというのが主なので、そこに興味がある方は特に歓迎です。
こちらは、文章の意味合いはあまり変える必要はないので(コードが変わるのでそれに合わせた変更や流れの調整は必要です)、比較的やりやすいかと思います。

ただし、Node.jsはタスク間の依存関係がちょっとややこしいところが複数人だとちょっとやりにくいかもれないです。
(文章を自然に読めるようにするために未知のことに依存させないという方針なので、文章の並び替えが必要になります)

- [Meta: Node.jsのユースケースの更新 · Issue #1719 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1719)

もし、やってみたい方とかがいれば、一度認識合わせのためにMTGしたり、レビューとかは当然やるのでコメントなどでお知らせください。
募集スレッドとして次のDiscussionを立てていますので、そちらでコメントしてもらえると嬉しいです。

- [ES2024に対応するIssueへのContributorを募集しています · asciidwango/js-primer · Discussion #1727](https://github.com/asciidwango/js-primer/discussions/1727)

皮算用になるため、まだやり方は決めていませんが、後述するOpen Collectiveの機能を使ってContributeに対して返せる仕組みも作っていく予定です。

## jsprimerのSponsorを募集しています

jsprimerでは、jsprimer自体が変化をし続け、読んだ人が「変化に対応できる基礎を身につけること」を目的としています。
そのためjsprimerは、毎年のECMAScriptの更新に合わせてアップデートしています。 継続的にアップデートするには、継続的なサポートが重要だと考えています。

jsprimerでは、Open Collectiveを使ってSponsorを募集しています。
次のページから、毎年や毎月ごとに一定の金額を支援することができます。

- [JavaScript Primer - Open Collective](https://opencollective.com/jsprimer)

Open CollectiveはGitHub Sponsorsと似たサービスですが、特定の個人ではなくjsprimerというプロジェクトに対して支援できます。
そして、Open Collectiveは支援された金額を、Contributorに対して分配することができます。
このやりとりをオープンに透明性を持ってできるのが、Open Collectiveの特徴です。

また、企業向けのスポンサーの特典として、次の特典を用意しています。

- <https://jsprimer.net>のトップページへのロゴの掲載
- リリースノートでのロゴの掲載
- 好きなページへのアイコンの掲載/ページスポンサー（任意）

参考の情報として、<https://jsprimer.net>のアクセス数などの情報も公開しています。
毎月、ページビューは5-6万程度で、アクティブユーザーは2-3万程度いて、そのうち「読者」(3ページ以上読んだ人)は10%程度の2000人ぐらいになっています。
書籍なので、何度も見にくる人も多いという特性があります。

<iframe class="iframe-looker" width="840" height="472" src="https://lookerstudio.google.com/embed/reporting/5079dfdf-681c-4db7-a216-77c842fdae45/page/p_ajx9imd6zc" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>

<!-- モバイルではiframeを非表示 -->
<style>
@media (max-width: 840px) {
    .iframe-looker {
        display: none;
    }
}
</style>

- [JavaScript Primer Dashboard](https://lookerstudio.google.com/u/0/reporting/5079dfdf-681c-4db7-a216-77c842fdae45/page/p_ajx9imd6zc)

詳細は[JavaScript Primerスポンサー · JavaScript Primer #jsprimer](https://jsprimer.net/intro/sponsors/)も参照してください。

元々jsprimerは、新しく会社に入った人などに「これ読んでおいて!」と渡せる書籍を作るという目的で始まりました。
色々なところで、そのような目的でjsprimerを使ってるという話は聞くようになったので、是非会社としての支援なども検討してみてください！

- [JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)

jsprimerは、[2015年12月17日](https://github.com/asciidwango/js-primer/tree/master/meetings/2015-12-17)に開始したプロジェクトで、[@azu](https://github.com/azu)と[@lacolaco](https://github.com/lacolaco)でおおよそ8年ぐらいメンテナンスを続けています。

今回Open Collectiveで支援を募集するのは、次の2つの目的があります。

- jsprimerの継続的な更新にかかっているコストを見える化する
- 新しいContributorを増やしてプロジェクトを継続的に更新していく形を模索する

最適な方法はまだわかりませんが、継続的にアップデートする形を模索していくためにも、支援を募集しています！

## まとめ

- jsprimerをES2024対応する[マイルストーン](https://github.com/asciidwango/js-primer/milestone/5)を切りました
- ES2024の対応などを手伝ってくれる[Contributorを募集](https://github.com/asciidwango/js-primer/discussions/1727)しています！
- [Open Collective](https://opencollective.com/jsprimer)を始めたので、jsprimerを支援してくれる[Sponsor](https://jsprimer.net/intro/sponsors/)を募集しています！
