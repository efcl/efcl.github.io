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
2013年後半ぐらいからほぼ毎日GitHubへコミットをpushしています。

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
ここ数年はJavaScript関係が多かったため、[npm](https://www.npmjs.com/)へ[公開しているパッケージ](https://npms.io/search?q=maintainer%3Aazu)は600コほどありました。

また、[JSer.info](https://jser.info/)というJavaScriptの情報サイトを10年以上やっていて、このサイトもMITライセンスとCC-BYで記事やデータを公開しているのでオープンソースです(継続して集めたデータを[jser/dataset](https://github.com/jser/dataset)として公開もしています)。

- [JSer.info 10周年: JavaScript情報の集め方、書き方、まとめ方 - JSer.info](https://jser.info/2021/01/16/jser-10th/)

この記事では、[Maintainer Month](https://maintainermonth.github.com/)に乗っかる形で、普段オープンソースのメンテナンスをするときに考えていることなどを書いてみたいと思います。

## [Maintainer Month](https://maintainermonth.github.com/)

6月は[Maintainer Month](https://maintainermonth.github.com/)というイベントをGitHubが主催しています。

> Maintainer Month is a reminder for the ecosystem to support, celebrate, and compensate open source maintainers.  
> -- [Maintainer Month](https://maintainermonth.github.com/)

[Maintainer Month](https://maintainermonth.github.com/)は、オープンソースのメンテナーが集まって情報共有したり、メンテナーを祝ったり、支援したりするイベントです。

- [Welcome to Maintainer Month! 🎉 | The GitHub Blog](https://github.blog/2022-06-01-welcome-to-maintainer-month/)

GitHubが[GitHub社が依存してるオープンソースのメンテナー900名以上](https://github.com/orgs/github/sponsoring)に、500,000ドルを分配したという話もこの[Maintainer Month](https://maintainermonth.github.com/)の一環のようです。
自分もこれの対象になっていて、これで初めて[Maintainer Month](https://maintainermonth.github.com/)自体を知りました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">自分もMaintainer MonthでGitHub Sponsorsの対象だった。<a href="https://t.co/gOU8eE79ta">https://t.co/gOU8eE79ta</a><br><br>Thanks to <a href="https://twitter.com/github?ref_src=twsrc%5Etfw">@github</a>, Sponsors, and Maintainers 🎉 <a href="https://t.co/EDqEbB2Hkq">pic.twitter.com/EDqEbB2Hkq</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1540496237647917057?ref_src=twsrc%5Etfw">June 25, 2022</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

- [Thank you to our maintainers | The GitHub Blog](https://github.blog/2022-06-24-thank-you-to-our-maintainers/)

後、1週間もないですが、[Maintainer Month](https://maintainermonth.github.com/)に乗っかる形で、オープンソースのメンテナンスについて書きます。

## オープンソースをメンテナンスするコツ

オープンソースについてのガイド的な網羅性が高いものは既に色々あります。

- [オープンソースソフトウェアの育て方](https://producingoss.com/ja/)
- [オープンソースガイドライン | Open Source Guides](https://opensource.guide/ja/)

そのため、この記事では自分が普段オープンソースソフトウェアなどに取り組むときに考えていることを書いていきます。
これが正解とはなくて、自分が継続的にオープンソースをするためにやっていることを書いています。

走りながら考えていたら、次の6つのトピックが思い浮かんだので、これに沿って書いていきます。

- 小さなリズムを持つ
- 主語を持つ
- PRのレビューを丁寧にやる
- First Responseを早く
- ドキュメントを書く
- やる事で場所を変える

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
そのため、一回あたりのタスクはかなり細分化されていて(紹介するサイト単位のタスクとなる)、週に一度の記事を公開するという作業自体のタスクを小さくして、タスクを細分化しています。

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

週に一度まとめて更新のようなパターンだと、体調が悪いときなどにその週はスキップされ、また次の週も更新しようとして偶然タイミングが合わなかった場合などに、1ヶ月更新が止まるみたいな状態は起きやすいです。
1ヶ月更新を止めてしまうと、そこで更新する習慣が失われて、この書籍でいう逆戻りが起きるのかなと思っています。

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
    - Travis CIをやめてGitHub Actionsへ移行したときに使うツール
    - ref: [Travis CIのGitHub連携を停止する方法](https://zenn.dev/azu/articles/110528f8963686)
    - [@azu/migrate-travis-ci-to-github-actions](https://github.com/azu/migrate-travis-ci-to-github-actions)
    - これもコマンド叩くだけで移行できるようにしている(特定の環境向けになるので、ほぼ自分用)
- 複数リポジトリに対して一括で変更を加える
    - リポジトリ自体が分かれてるときに、変更をまとめてやりたいときはそういうツールを使う
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

主にマイグレーションが多いですが、手作業でやった方が早い作業も、リポジトリ数が膨大になると時間がかかります。
そのため、マイグレーション処理などはツール化して、コマンドを一つ叩くだけでできるようにしています。

ツール化していると、頭をあまり使わずに、コマンドを叩いていくだけで作業が進むのでリズムが良くなります。

たとえば、5年ぐらい前の自分がよく使っていてスタックだと、Yarn + Babel + Travis CI + mochaを使って書いていたものが多いです。
このスタックで書かれていたリポジトリを久々に触ろうと思ったら、大体次のようなコマンドを叩いて、開発環境がとりあえず最新となるようにしてから作業しています。
大体やりたいことはコマンド化されているので、リズムよく開発環境がアップデートされます。

```
yarn upgrade-interactive --latest # babelやmochaなどを上げる
npx babel-upgrade --write
npx @azu/mocha-migrate migrate-opts -file ./test/mocha.opts -type json -rm
npx migrate-travis-ci-to-github-actions
```

それぞれは大したことがない作業も積もると大変になって、本来したかったことができなくなります。
リズムを保って開発するために、こういった反復的にやることは大体ツール化を意識しています。

## 主語を持つ

次のトピックは、「主語を持つ」ということですが、これはオープンソースをやるときにそのプロダクト/ライブラリは誰のために作ってるかを意識するという話です。
このトピックは、主に他の人からIssueやPull Requestなどで機能追加などの要望を受けたときにどうするという話に関係しています。

主語が"I"だったら無理して機能を受け入れる必要がないし、主語が"We"だったら他の人の意見を聞いて判断するのが良いと思います。

自分用に作ったものに対して(主語が"I"の場合)、別の人から要望とかPRがきても、それが大変だったりメンテナンスを大変にするものであるなら断っていいはずです。
オープンソースなので、そのリポジトリをForkして機能を追加できるので、モチベーションが湧かない要望などをはForkを推奨したり、実装を考えてもらったりします。

たとえば、vscode-read-aloud-textというVSCode拡張を作ったりしていたのですが、結構Proof of Concept的な拡張だったのであんまり開発を続ける気はありませんでした。
ですが、いくつかIssueなどで要望が来たので、実装できそうなやり方などを教えてForkを推奨していました。

- [VSCodeで音声読み上げでの文章デバッグする拡張 - vscode-read-aloud-text | Web Scratch](https://efcl.info/2019/01/05/vscode-read-aloud-text/)
- [Extenstion support for source code files · Issue #6 · azu/vscode-read-aloud-text](https://github.com/azu/vscode-read-aloud-text/issues/6)

自分用のものでありながら、他の人が欲しいと言ってる機能を実装できるようにする方法もあります。
典型的な方法は、そのツールをプラグインなどで拡張できる仕組みを実装することです。
プラグインで拡張できるようにしておけば、他の人の要望はプラグインとして実装できるよと返せば良くなります。

また、実際に全部入りのようなプロダクトを目指すとメンテナンスの負荷が指数関数的に上がってしまうので、そのような負荷を分散させる意味でもプラグイン機能は価値があります。
プラグイン機構によって、要望自体を実装できるようになるので、開発者コミュニティへと発展する場合があります。

- [OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ](https://t-wada.hatenablog.jp/entry/active-oss-development-vs-simplicity)

たとえば、自然言語をLintする[textlint](https://textlint.github.io/)の出発点は自分用のツールではあったのですが、textlintの内部にはルールを一個も持っていません。
ルールは全て外部のプラグインにすることで、あらゆる言語や構文にも対応できるような仕組みにしています。
これは、textlint自体が全ての言語(英語、日本語、中国語、絵文字語?)などに対応するのは不可能だから、プラガブルな構成をとったという現実的な話でもあります。

プラグインの仕組みを明確に用意しなくても、内部的にパッケージが分かれているだけでも、拡張性が上がります。
JavaScriptのような実行環境ごとに利用できるAPIが異なるような環境でも役立つ方法で、コア部分をパッケージとして分けていくと、別の環境(ブラウザ、Cloudflare Workers、Denoなど)にも対応しやすいです。
今は[monorepo向けのツール](https://monorepo.tools/)がたくさんあるので、パッケージを分けてもmonorepoにしておけば開発の負荷はそこまで変わりません。

プラグインの仕組みを明示的には持ってないけど、パッケージを分けてmonorepoにしているケース:

- [azu/power-doctest: JavaScript Doctest for JavaScript, Markdown and Asciidoc.](https://github.com/azu/power-doctest)
- [Markdownで年表的なタイムラインを管理するツール | Web Scratch](https://efcl.info/2019/01/23/mdline/)

自分は主語が"I"のプロダクトを作ることが多いですが、"We"なプロダクトの方が継続性はあると思っています。
そのため、複数人で開発できるように1人で作ってる段階でもドキュメントだったりワークフローを少しずつ足していくことが多いです。

## PRのレビューを丁寧にやる

Pull Requestのレビューは丁寧にやることを心がけています。
利用者やContributorとの接点はIssueやPRが大部分を占めているため、PRのレビューを丁寧にやることは重要です。

PRのレビューを丁寧にやるというのはレビュー自体のことだけではなく、レビューする前 → レビュー → マージ後を丁寧にやるという話です。
「ここ直せばいい」とわかっていても、その修正のPRまで出してくれる人は、意外と多くはありません。
そのため、PRを受け付けているよという意思表示から始まります。

### PR歓迎の意思表示をする

たとえば、Issueでバグを報告してもらったらときに、その問題の原因が明確なら、感謝と共にPRも歓迎してるよって返すのもいいと思います。

> Thanks for finding this error, a PR is welcome!  
> ... (Bugの原因、修正方法を書く) ...

自分は[Saved replies](https://github.com/settings/replies)に、このパターンが入ったりしていました。

また、GitHubには"good first issue"や"help wanted"などの少し特別な意味を持ったラベルもあります。
こういったラベルを付けることで意思表示することも大事だと思います。実際にこのラベルを見てPRをしてくれる人もいます。

- [Good First Issue: Issues for your first open-source contribution](https://goodfirstissue.dev/)
- [OSS 貢献における GitHub の Issue 探しについて手始めに調べてみた - Qiita](https://qiita.com/gotchane/items/69c332b2e67b9e20c378)

自分の場合は、いつも使ってるラベルセットを持っていて、この中の一つに`Status: PR Welcome`というそのままのラベルがあるので、これもよく使っています。

- [GitHubのラベルをいい感じにセットアップするツール | Web Scratch](https://efcl.info/2017/05/17/github-label/)
- [azu/github-label-setup: 📦 Setup GitHub label without configuration.](https://github.com/azu/github-label-setup)

### PRの方法を教える

プロジェクトによっては、PRをあまりしたことのない人がユーザーとして多い場合もあります。
たとえば、[jsprimer](https://jsprimer.net/)は、GitHubを始めて触るような人も多く見るようなプロジェクトです。

- [JavaScript Primer - 迷わないための入門書 #jsprimer](https://jsprimer.net/)
- [asciidwango/js-primer: JavaScript Primer - 迷わないための入門書](https://github.com/asciidwango/js-primer)

この場合、PRを出したことない人も読者だったりするので、どうやってPRを出せるかを説明して、PRを出してもらったりしていることが多いです。
いまのGitHubはウェブ上で文章を変更やtypoを直す程度ならウェブのエディタでも十分できるので、やり方さえわかればほとんどの人ができます。

- [入力内容をコンソールに表示する：　助詞の使われ方 · Issue #983 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/983#issuecomment-545273628)

初めて触るUIは、ボタンを押したら何が起きるかが分かりにくいので、スクリーンショットやGitHubのドキュメントのリンクなどを貼って説明したりしています。
多少コストがあっても、自分はIssueを作ってくれた人にPRまで出してもらうように誘導しています。
一度体験すれば、次から一人でできるようになる人も多いので、同じ人が他にも修正をしてくれることが期待できます。

実際にjsprimerのリポジトリは、同じ人が複数回コミットしてくれることが多いと思います。。
今までjsprimerにContributeした人は99人いて、その内2回以上コミットしている人は45人います。

- [Contributors to asciidwango/js-primer](https://github.com/asciidwango/js-primer/graphs/contributors)

原体験としては、ESLintのPRを投げたときに、当時はGitのコミットメッセージだけを修正する方法がよくわかっていませんでしたが、
ESLintの作者の[@nzakas](https://github.com/nzakas)さんにやり方をPR上で教えてもらったというのがあります。

- [Fix Markdown link by azu · Pull Request #1389 · eslint/eslint](https://github.com/eslint/eslint/pull/1389)

ContributorのContributeするのをメンテナーが手伝ってあげると、そのプロジェクトのメンテナンス性に繋がると思います。
(ContributeしやすいようにCONTRIBUTING.mdのようなガイドラインを用意するのもこれと同じです)

### PRのレビューをする

Pull Requestを出す人が、必ずしもその技術を得意としていないことはよくあるので、コードレビューで補助します。
また、TypeScriptのような型チェックやESLintなどのLintツールで、ある程度良いコードとするために機械的なチェックを入れることでレビューする側/される側の負荷が減ります。

しかし、どうしても人間がレビューしないといけない部分はあるので、そこは丁寧にレビューします。
PRのコードの質がどの程度になったらマージするかは人次第な気はします。
自分の場合はそのPRのアプローチに大きな問題がなくて、そのPRがプロジェクトの問題や健全性を改善する状態になったら完璧じゃなくてもマージします。

- [The Missing README: A Guide for the New Software Engineerを読んだ | Web Scratch](https://efcl.info/2021/08/20/the-missing-readme/)
- [The Standard of Code Review | eng-practices](https://google.github.io/eng-practices/review/reviewer/standard.html)

完璧を求めるとどうしてもPRが長期化して、互いに疲れます。
ある程度目処がついたらマージして、続きのIssueを作るなどして、次へ進むようにしています。
これの目的は、小さなリズムを作るのと同じ話で、1週間、1ヶ月と長引くと大体停滞するためです。

### PRをマージしてリリースして伝える

PRをマージするときにやっていることは大体次の通りです。

- main/masterブランチが壊れた状態でPRはマージしない
- PRをマージしたら、すぐにリリースする
- リリースしたら、PR出してくれた人へリリースと感謝を伝える

前提としては、メインブランチが壊れるものはマージしないですが、
大体のケースではPRをマージしたら、すぐにリリースしています。(リリースがないものは、感謝を伝えるだけで終わり)

特にライブラリのようなものはマージしてすぐリリースして、そのPRを出してくれた人に動作などを確認してもらうのがスムーズです。
PRを出してくれた人のモチベーションが減らないうちに、次のアクションへ繋げるのがいいと思います。
ライブラリなどは新しいバージョン出しても、既存のユーザーはアップデートしなければ問題ないので、ある程度早く回す方を優先しています。
(ものによってはテストで確認するのが難しい。PR出した人も、すぐリリースして欲しいと思ってるのが大半だと思うため)

マージしたら、大体次のようなコメントをしている気がします。

```
@{user} Thanks!

I've released https://github.com/{owner}/{name}/releases/tag/{version} 🎉
```

続きのIssueがあるなら、続きのIssueを知らせたりします。
確認してほしいことがあるなら、コメントで依頼したりします。

このように、レビューする前 → レビュー → マージ後を丁寧にやること意識しています。
結局、それがContributorを増やすことにも繋がると考えているし、確認の手間を分散できてメンテナンスコストが下がることにつながると考えています。

自分は、コードを書くときは気分でのムラは出ますが、レビューするときはあんまり気分のムラが出にくい気はします。
それはそういう訓練をしたからなのかもしれないので、人によってやりやすいやり方は違うのかもしれません。
ただ、Contributorに対して丁寧に接するのは、必要なことだと思います。

PRを積極的に募集するのではなく、Issueだけ立ててもらって修正は自分で全部やるみたいなスタイルもあるとは思います。
確かに、自分で全部やった方がクオリティはコントロールしやすいとは思います。
ただ、「自分で全部やる」はどうしても負荷が集中して[燃え尽き症候群](https://ja.wikipedia.org/wiki/%E7%87%83%E3%81%88%E5%B0%BD%E3%81%8D%E7%97%87%E5%80%99%E7%BE%A4)になりやすいと思うので、いろんな人が参加しやすい形にした方がメンテナーとしては気が楽かなと思いました。

自分はそこまでコミュニケーションが得意とかではないですが、IssueやPRの作法などはプロジェクトなどでそこまで大きくは変わりません。
そのため、結構形が決まったようなやりとりをしているだけで、色々なプロジェクトを同時にメンテナンスできたりもします。
どうしても、オープンソースを長くやってると作ってるものも多くなって、同時に色々なプロジェクトが存在する状態になってきます。
そうした中で、Contributorになってもらい、他の人に手伝ってもらうような動き方が増えてきたのかと考えています。

## First Responseを早く

これはマージしてからリリースを一連の流れで素早くやるのと同じような話ですが、IssueやPRが作られた時に最初のレスポンスはできるだけ早くすることを意識しています。
これは、こちらのレスポンスが早いほど、相手のレスポンスも早くなる余地があるためです。

また、本当の意味での最初のレスポンス(プロジェクトに初めてIssueやPRを作るときのレスポンス)は、特に早く返したいと考えています。
慣れないプロジェクトにIssueやPRを出すには想像以上に壁があるので、そこを乗り越えたときにすぐにレスポンスが早く返ってきた方が体験はいいためです。
せっかく、テンプレートやプロジェクトの作法などを見て、IssueやPRを作ったのにそこで放置されると、そのプロジェクトにContributeする気力を削いでしまいます。

とはいってもメンテナーの時間は有限であるし、タイムゾーンが異なると時間的に間が空いてしまうので努力目標みたいなイメージです。
気力がないときはラベルだけつけて、トリアージだけで済ませるとかもあります。

バグなら"Bug"ラベルをつけたり、機能要望だったら"Proposal"ラベルをつけたりして、
"Thanks for report!" とか "I'm not familiar with this feature, but we need to improve this." とかコメントを返すだけでも、だいぶ進み方は変わるんじゃないかなとは思います。
(ラベルだけだと通知が飛ばないので、コメントを通知にするイメージです)

結局レスポンスを早く返したいのは、リズムを小さく保ちたいからです。
レスポンスまでの間が長いほど、そのやりとりは中断しやすいです。一度、中断すると再開がとても大変になります。
再開が大変になると、大体再開できないのでそこで終了してしまいます。

## ドキュメントを書く

ドキュメントは書きましょう。

ここでのドキュメントは色々なものがあると思います。
利用者のためのドキュメント(README)、Contributorのためのドキュメント(CONTRIBUTING.md)、自分のためのドキュメントなど用途に合わせたものを書いておくと良いことは多いです。
自分のためのドキュメント書いておけば、将来忘れても思い出せる可能性が高まりますし、それを少し丁寧に書けば他の人も読めるドキュメントになります。

また、そのプロジェクトの原則をドキュメントとして書いておくと、何か要望がきたり実装するべきかを迷った時の判断の助けになります。
複数のプロジェクトをやっていると、感覚が混ざってしまってどうしてもブレしまうことがあります。

たとえば、TypeScriptは[TypeScript Design Goals](https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Goals)というドキュメントがあって、このデザインゴールに合わない機能を入れないようにしています。
自分が作った[Secretlint](https://github.com/secretlint/secretlint)は、最初に[Philosophy](https://github.com/secretlint/secretlint#philosophy)というセクションにこのツールの目的を書いていました。

こういった原理原則は、最初は分からないことがあります。
そのため、プロジェクトを継続していうちに、考えるをまとめる意味で改めてドキュメント化することもあります。
[JSer.info](https://jser.info/)のポリシーを定義した[JSer.info Policy](https://jser.info/policy/)は、JSer.infoを初めてから10年近く経ってから書いたドキュメントです。

- [policy noteを作成する · Issue #113 · jser/jser.info](https://github.com/jser/jser.info/issues/113)

ドキュメントは大体の場合は有用だとは思います。
ただし、ドキュメントがバグを修正するわけではないので、バグの修正としてドキュメントを書くのは避けましょう。
それは、Issueなどで管理した方が良いと思います。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">例外はあるが、トラブルシューティングはShameful Documentationの一種とも言える。<br>そこに書かれているものは、つまり解決されていない問題で修正されていないことを意味してる。<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash&amp;ref_src=twsrc%5Etfw">#LivingDocumentation</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/843834095599673344?ref_src=twsrc%5Etfw">March 20, 2017</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## やる事で場所を変える

これはオープンソースのメンテナンスとは何も関係ないトピックな気はしますが、なぜかトピックになっていたので「やる事で場所を変える」について書きます。

自分は同じものをずっと開発していると飽きるので、新しく何を作れるかを年中考えている気がします。
やることを考えるメモを書いて考えたり、今やっていることを100倍早くできれば価値が生まれるので、そういう余地があるツールを書けないかは考えたりしています。

![やることを考えるメモ](https://efcl.info/wp-content/uploads/2022/06/27-1656322191.png)

新しいものを思いついた場合は、モチベーションが高いのでそのまま実装しています。

一方で、今まで作ったものもバグを修正したり、機能を追加したり、変更に対応するなどのいわゆる「メンテナンス」もしていく必要があります。
しかし、長いプロジェクトほど最初の一歩が遠くなる瞬間はあるので、そういう時は場所を変えると進むことが多いという個人の感想です。

場所を変えるというのは、物理的な場所のことです。
これこそ人によって全然違う気がするので、個人的な感想です。

場所を変えてやる方法として、別の場所に移動してそこで作業したり、電車などで移動ながら作業したり、山を登りながら考えたり、歩きながら考えたり、走りながら考えたりなど色々です。

コードを書く場合は、移動先や電車で移動しながら書くことが多いです。
たとえば、[jsprimer](https://jsprimer.net/)はもう[7年以上](https://github.com/asciidwango/js-primer/tree/master/meetings)やってるプロジェクトですが、毎年のECMAScriptの更新に合わせてアップデートしています。

- [JavaScript Primer 4.0.0: ECMAScript 2022に対応したJS本 | Web Scratch](https://efcl.info/2022/06/19/jsprimer-4/)
    - 今年もES2022への対応するためにアップデートしていました

[jsprimer](https://jsprimer.net/)は、1年間隔という間隔の大きさもあって、最初の一歩が重たくなりやすいプロジェクトです。
そのため、[ES2021](https://efcl.info/2021/06/28/jsprimer-3.0/)の対応は湯河原でやっていた部分もありますし、[ES2022](https://efcl.info/2022/06/19/jsprimer-4/)の対応は一ノ関や宮古島でやっていた部分があります。[fz-browse](https://github.com/azu/fz-browse)は松江で書いていました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">fz-browseはここで仕上げました。<br>無料で借りれて便利でした。 <a href="https://t.co/HnNNd68VDe">https://t.co/HnNNd68VDe</a> <a href="https://t.co/6rmY7fBrts">pic.twitter.com/6rmY7fBrts</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1515889157582692356?ref_src=twsrc%5Etfw">April 18, 2022</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 


移動する前にやることを決めておくと、移動中も移動先でも最初の一歩が踏み出しやすいです。
また、こういう開発合宿みたいなことをする場合は、一日の最初に軽いタスクを作って済ませておくと、少し大きめなタスクも手が出しやすいです(一日何もできなかったみたいなことを避けるため)。

文章や方針を考える場合は、外に出て考えたり、歩きながら考えたりしていることが多いです。
この行も部屋から外に出て書いています。

思い付いたことを音声認識でメモったり、箇条書きでメモったりして、それを後から清書する形で文章にしています。
この記事の元になった[6つのトピック](https://twitter.com/azu_re/status/1540987676379140096)も、[Maintainer Month](https://maintainermonth.github.com/)のことを考えながら走っていたら思いついて、書き始めました(だからメンテナンスと関係ないこのトピックが混ざってる…)。

実際に歩きながらとかで考えるのは難しいですが、何かのきっかけになることもあるので、結構使う手法です。

やっぱりオープンソースとは関係ないトピックな気もしますが、続けようという気持ちだけでは続けるのが難しいこともあるので、そういう場合は気分を変えてやる方法を考えるという感じなのかもしれません(内発的動機と外発的動機みたいな関係なのかもしれません)。

## まとめ

この記事では、オープンソースをメンテナンスするコツというタイトルで6つのトピックについて書きました。

- 小さなリズムを持つ
- 主語を持つ
- PRのレビューを丁寧にやる
- First Responseを早く
- ドキュメントを書く
- やる事で場所を変える

オープンソースとは特に関係ないことも入ってますが、自分が主に気にしているトピックについて書いたつもりです。
[Maintainer Month](https://maintainermonth.github.com/)がきっかけで書いているので、メンテナンスよりの話が多かったかもしれません。
実際には、メンテナンス性を気にせず適当に書くことも多いですし、そういうこともやってるのでリポジトリが1000以上あるんだとは思います。

また、近年はソフトウェアサプライチェーンの話題などもあって、オープンソースソフトウェアのメンテナーが気にしないといけないことが増えている感じはします。
次のようなSurveyレポートがあるのも、このような話題が増えているからな気がします。

- [The 2022 open source software supply chain survey report](https://tidelift.com/2022-open-source-software-supply-chain-survey)

オープンソースのメンテナーの負担が増えている部分はあると思いますが、オープンソース/開発者なら無料でサービスを利用できたり、[GitHub Sponsors](https://github.com/sponsors)のような金銭的な支援などでバランスをとっていくのだと思います。

- [Free for developers](https://free-for.dev/)

実際にオープンソースのメンテナーがどのような支援を求めてるかは、次のSuveryレポートを見ると面白いと思います。

- [The 2021 Tidelift open source maintainer survey](https://tidelift.com/subscription/the-tidelift-maintainer-survey)

メンテナーがどういう支援を求めてるかは人によって考え方が異なります。
また、Contributorがどのような支援をできるのかは、技術的なスキルだったり、ドキュメントだったり、デザインだったり、金銭的な支援だったりと人それぞれです。

メンテナーがどういうサポートを求めているかを知る、負荷が特定の箇所に集中するエコシステムはバランスが悪いのでそれを支援する方法を知るといったことを思い出すのがMaintainer Monthの目的です。

> Maintainer Month is a reminder for the ecosystem to support, celebrate, and compensate open source maintainers.  
> -- [Maintainer Month](https://maintainermonth.github.com/)

この記事では、メンテナー視点で色々と書きました。
何か参考になることがあったら嬉しいです。

また、メンテナーを支援する人はContributeすることで自分自身がメンテナーになったり、[GitHub Sponsors](https://github.com/sponsors)のような支援方法を考えるなどしてみてください。
支援のやり方や受け取り方も人それぞれですが、自分の[GitHub Sponsors](https://github.com/sponsors)への考え方は次の記事で書いています。

- [GitHub Sponsorsの募集を始めてから2年が経ったので振り返る | Web Scratch](https://efcl.info/2021/10/01/github-sponsors/)

[GitHub Sponsors](https://github.com/sponsors)で支援してくれる人は、[Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)から行えます。

<iframe src="https://github.com/sponsors/azu/card" title="Sponsor azu" height="225" width="600" style="border: 0;"></iframe>
