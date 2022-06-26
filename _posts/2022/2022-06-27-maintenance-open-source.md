---
title: "Maintainer Month: オープンソースをメンテナンスするコツ"
author: azu
layout: post
date : 2022-06-27T12:51
category: 雑記
tags:
    - OpenSource
    - MaintainerMonth

---

自分([@azu](https://github.com/azu))は、大体2010年ぐらいからオープソースソフトウェアなどにコミットし始めて、
2013年後半ぐらいからずっとほぼ毎日何かしらGitHubにコミットをpushしています。

毎年オープンソース活動の振り返り記事も書いています。

- [今年のオープンソース活動振り返り @ 2021 | Web Scratch](https://efcl.info/2021/12/31/open-source-in-2021/)
- [今年のオープンソース活動振り返り @ 2020 | Web Scratch](https://efcl.info/2020/12/31/open-source-in-2020/)
- [今年のOSS活動振り返り @ 2019 | Web Scratch](https://efcl.info/2019/12/31/oss-in-2019/)
- [今年のOSS活動振り返り @ 2018 | Web Scratch](https://efcl.info/2018/12/31/oss-in-2018/)
- [今年のOSS活動振り返り @ 2017 | Web Scratch](https://efcl.info/2017/12/30/oss-in-2017/)
- [今年のOSS活動振り返り @ 2016 | Web Scratch](https://efcl.info/2016/12/31/oss-in-2016/)
- [今年のOSS活動振り返り @ 2015 | Web Scratch](https://efcl.info/2015/12/31/oss-in-2015/)
- [今年のOSS活動振り返り @ 2014 | Web Scratch](https://efcl.info/2014/12/31/oss-in-2014/)

pushしたものの中にはただのサンプルコードなども多くありますが、作った[GitHubリポジトリ](https://github.com/search?q=user%3Aazu+user%3Aefcl+user%3Ajser+user%3Aalmin+user%3Atextlint+user%3Atextlint-ja+user%3Atextlint-rule+user%3AJXA-userland+user%3Ajs-primer+user%3Aecmascript-daily+user%3Aasciidwango+user%3Asecretlint+user%3Ahonkit+user%3Asecurity-alert&type=Repositories)は1000コ(forkを除く)ほどあり、
ここ数年はJavaScript関係が多かったため、[npm](https://www.npmjs.com/)へ公開しているパッケージは654コありました。

また、[JSer.info](https://jser.info/)というJavaScriptの情報サイトを10年以上やっていて、このサイトもMITライセンスとCC-BYで記事やデータを公開しているのでオープンソースです(継続して集めたデータを[jser/dataset](https://github.com/jser/dataset)として公開もしています)。

- [JSer.info 10周年: JavaScript情報の集め方、書き方、まとめ方 - JSer.info](https://jser.info/2021/01/16/jser-10th/)

この記事では、[Maintainer Month](https://maintainermonth.github.com/)に乗っかる形で、普段オープンソースのメンテナンスをするときに考えていることなどを書いてみたいと思います。

## [Maintainer Month](https://maintainermonth.github.com/)

6月は[Maintainer Month](https://maintainermonth.github.com/)というイベントをGitHubが主催しています。

> Maintainer Month is a reminder for the ecosystem to support, celebrate, and compensate open source maintainers.  
> -- [Maintainer Month](https://maintainermonth.github.com/)

[Maintainer Month](https://maintainermonth.github.com/)は、オープンソースのメンテナーが集まって情報共有したり、祝ったりするイベントらしいです。

- [Welcome to Maintainer Month! 🎉 | The GitHub Blog](https://github.blog/2022-06-01-welcome-to-maintainer-month/)

GitHubが[GitHub社が依存してるオープンソースのメンテナー900名以上](https://github.com/orgs/github/sponsoring)に、500,000ドルを分配したという話もこの[Maintainer Month](https://maintainermonth.github.com/)の一環のようです。
自分もこれの対象になっていて、これで初めて[Maintainer Month](https://maintainermonth.github.com/)自体を知りました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">自分もMaintainer MonthでGitHub Sponsorsの対象だった。<a href="https://t.co/gOU8eE79ta">https://t.co/gOU8eE79ta</a><br><br>Thanks to <a href="https://twitter.com/github?ref_src=twsrc%5Etfw">@github</a>, Sponsors, and Maintainers 🎉 <a href="https://t.co/EDqEbB2Hkq">pic.twitter.com/EDqEbB2Hkq</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1540496237647917057?ref_src=twsrc%5Etfw">June 25, 2022</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

- [Thank you to our maintainers | The GitHub Blog](https://github.blog/2022-06-24-thank-you-to-our-maintainers/)

後、1週間もないですが、[Maintainer Month](https://maintainermonth.github.com/)に乗っかる形でオープンソースのメンテナンスとかGitHub Sponsorsとかについて書けるといいなーと思います。せっかくのイベントだし、色々な人が色々書くと良さそうと思って、オープンソースをメンテナンスについて書いています。

## オープンソースをメンテナンスするコツ

オープンソースについてのガイド的な網羅性が高いものは既に色々あると思うので、この記事では自分が普段オープンソースソフウェアなどに取り組むときに考えていることを書いていきます。そのため、これが正解とはなくて、自分が継続的にオープンソースするためにやっていることを書いています。

- [オープンソースソフトウェアの育て方](https://producingoss.com/ja/)
- [オープンソースガイドライン | Open Source Guides](https://opensource.guide/ja/)

走りながら考えていたら、次の6つのトピックが思い浮かんだので、これに沿って書いていきます。

- 小さなリズムを持つ
- 主語を持つ
- やる事で場所を変える
- PRのレビューを丁寧にやる
- first responseを早く
- ドキュメントを書く

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/MaintainerMonth?src=hash&amp;ref_src=twsrc%5Etfw">#MaintainerMonth</a><br>メンテナンスを続けるコツ<br><br>- 小さなリズムを持つ<br>- 主語を持つ<br>- やる事で場所を変える<br>- PRのレビューを丁寧にやる<br>- first responseを早く<br>- ドキュメントを書く</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1540987676379140096?ref_src=twsrc%5Etfw">June 26, 2022</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## 小さなリズムを持つ

小さなリズム というのはいくつかのこと含んでいますが、基本的にはやることを小さく保って、それを繰り返す方がいいという考え方が自分の根底にあります。
これは、やることを小さくIssueに切って作業したり、パッケージのアップデートなどの典型的作業をリズムを持って作業できるようにツール化したりなどです。
逆を言えば、ビックバンリリースや長時間かかる作業は"中断"から"停止"につながるリスクがあるため、できるだけ避けたいと思っています。

具体的に小さなリズムを持ってやることを意識している例を紹介します。

### JSer.info の週一更新のリズム

[JSer.info](https://jser.info/)は週刊の更新を11年ほどやっています。
実は週に一度の更新を飛ばしたことはないですが、この週一の更新を続けるための工夫については次のスライドや記事でも紹介しています。

- [JSer.infoの作り方](https://azu.github.io/slide/2017/jser_info/how_to_make_jser_info.html)

> 個人で最新情報を継続的にまとめるには恐らくコストが高く、一度止まると復帰が難しい問題という問題があるのだと思います。  
> JSer.infoはその辺を徹底的に仕組化やイテレーションコストを小さくすることで対処しています。  
> また止まることは想定し、再開のしやすさに重きをおいています。  
> - [JSer.infoを開始してから7年が経ちました - JSer.info](https://jser.info/2018/01/15/jser-info-7years/)

JSer.infoでは、週に一度まとめて記事を書くのではなく、1週間かけて少しずつ書いた記事の内容をまとめたものとして週に一度記事を出しています。
そのため、一回あたりのタスクはかなり細分化されていて(紹介するサイト単位のタスクになる)、週に一度の記事を公開するという作業自体のタスクを小さくして、タスクを細分化しています。

また、書いている本人的には、「この日に更新する」みたいのはそこまで意識していなくて、一回あたりのタスクが積もって1週間分溜まったら、記事を公開するというワークフローになっています。更新するタイミングはbotに聞いています。

![Jser.info Slackでのbot](https://efcl.info/wp-content/uploads/2022/06/27-1656258146.png)

このアプローチのメリットは、別のことで忙しくても、少しずつのタスクなら積み重ねていけるため、リズムが崩れにくいことです。
また、リズムが崩れても、1週間分溜まったら公開するというワークフローなので、一度公開したら次のイテレーションでリズムを戻しやすいです。

一方で、週に一度まとめて更新のような1週間分のタスクを特定の日/曜日に持ってくると、その日が忙しかったらスキップしています。
1週間のスキップは、1ヶ月の停止になっていき、そのまま停止すると完全に更新が止まります。

最近読んだ[「アジャイル式」健康カイゼンガイド](https://www.shoeisha.co.jp/book/detail/9784798170701)でも習慣化について似たような話がありました。

> 習慣化した後は安定して維持できるのかというと、必ずしもそうではないのです。これを逆戻りと呼びます。  
> 運動週間の逆戻りのプロセスは、次のような過程をたどるとされています。

| プロセス | 内容 | 
| -----  | ---- |
| スリップ | 1、2回の停止 |
| ラプス | 1、2週間の停止 | 
| リラプス | 1、2ヶ月の停止 | 
| コラプス | 完全な停止 | 

週に一度まとめて更新のようなパターンだと、体調が悪いときなどにその週はスキップされ、また次の週も偶然更新しようとしてタイミングが合わなかった場合などに、1ヶ月更新が止まるみたいな状態が起きやすいです。1ヶ月更新を止めてしまうと、そこで更新する習慣が失われて、この書籍でいう逆戻りが起きるのかなと思っています。

そのため、JSer.infoではタスクを細分化して進められる時にやっていけるような形を作っています。

### ライブラリのメンテナンスのリズムをツール化する

JavaScript周りは顕著ですが、ライブラリが細かく分かれていることが多いため、リポジトリの数も多いです。
そのため、リポジトリのCI設定や依存ライブラリのアップデートなどをメンテナンスするだけで無限の時間がかかります。

このメンテナンス作業を手動で毎回やるととても疲れるので、自分の場合はツール化していることが多いです。
作ったり、使ってるツールを一度書いてみます。

- 依存ライブラリのアップデート: [Renovate](https://github.com/renovatebot/renovate)、[Dependabot](https://docs.github.com/ja/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates)
    - [@azu/renovate-config](https://github.com/azu/renovate-config)
    - majorアップデート以外はCI通ればautomergeにしている、majorアップデートは手動になるのでPRも作らない
- ライブラリのメジャーアップデート対応:
    - mochaの例: [azu/mocha-migrate: Mocha migration script for mocha v7](https://github.com/azu/mocha-migrate)
    - ツール側がマイグレーションツールを提供してくれなかった場合は、自分用にマイグレーションツールを書いてしまう
    - mochaをアップデートして、コマンド叩くだけで移行できる
- CIの移行:
    - Travis CIをやめてGitHub Actionsに移行したときに使うツール
    - ref: [Travis CIのGitHub連携を停止する方法](https://zenn.dev/azu/articles/110528f8963686)
    - [@azu/migrate-travis-ci-to-github-actions](https://github.com/azu/migrate-travis-ci-to-github-actions)
    - これもコマンド叩くだけで移行できるようにしている(特定の環境向けになるので、ほぼ自分用)
- 複数リポジトリに対して一括で変更を加える
    - リポジトリ自体が別れてるときに、変更をまとめてやりたいときはそういうツールを使う
    - [shepherdを使って複数のリポジトリに一括でPRを出してまとめてマイグレーションする | Web Scratch](https://efcl.info/2021/05/13/shepherd-github-multi-repo-migration/)
    - 最近は、ある程度意味あるまとまりでmonorepoを作ることが多い
- リポジトリをTransferする:
    - 個人のリポジトリとして作って、後からOrganizationを作ったときなど
    - grep, sedでもいいけど、毎回考えるのが大変なのでそういうツールを作っている
    - [transfer-github-owner](https://github.com/azu/transfer-github-owner)
    - [move-github-repository](https://github.com/azu/move-github-repository)
- CIのnodeバージョン更新:
    - [GitHub Actionsのnode-versionをまとめてアップデートするコマンドラインツールを書いた | Web Scratch](https://efcl.info/2021/05/28/github-actions-node-versions/)
    - 最近は `lts/*` 指定とかもできるようになったので不要になるかも
- GitHub Actionsのpermission指定:
    - [GitHub Actionsの`permissions`を自動で設定するツールを書いた | Web Scratch](https://efcl.info/2021/07/21/update-github-actions-permissions/)

主にマイグレーションなどが多いですが、手作業でやった方が早い作業も、リポジトリ数が膨大になると時間がかかります。
そのため、マイグレーション処理などはツール化して、コマンドを一つ叩くだけでできるようにしています。

ツール化していると、あまり頭を使わずに、コマンドを叩いていくだけで作業が進むのでリズムが良くなります。

たとえば、5年ぐらい前の自分がよく使っていてスタックだと、Yarn + Babel + Travis CI + mochaを使って書いていたものが多いです。
このスタックで書かれていたリポジトリをいじろうと思ったら、大体次のようなコマンドを叩いて、開発環境がとりあえず最新となるようにしてから作業しています。
大体やりたいことはコマンド化されているので、リズムよく開発環境がアップデートされます。

```
yarn upgrade-interactive --latest # babelやmochaなどを上げる
npx babel-upgrade --write
npx @azu/mocha-migrate migrate-opts -file ./test/mocha.opts -type json -rm
npx migrate-travis-ci-to-github-actions
```

こういうそれぞれは大したことがない作業も積もると大変になって、本来したかったことができなくなることがあります。
リズムを保って開発するために、こういった反復的にやることは大体ツール化を意識しています。

