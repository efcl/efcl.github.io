---
title: "GitHub Sponsorsの募集を開始してから2年弱の振り返り"
author: azu
layout: post
date : 2021-06-26T20:53
category: 
tags:
    - 

---

この記事は、GitHub Sponsorsを募集開始してから、2年経ったのでそれを振り返った記事です。

## GitHub Sponsorsを始めた理由

2020年10月からGitHub Sponsorsのページを公開して、スポンサーを募集を開始しました。

- https://twitter.com/azu_re/status/1186972124180701184

GitHub Sponsorsを始めた理由はいくつかあります。

- GitHub Sponsorsを使ってみたかった
  - GitHubは多分一番使ってるウェブサービスなので、新しい機能は使いたい
- オープンソースに対して金銭的にContributeする方法を用意しておきたかった
  - [Promise本](https://azu.github.io/promises-book/)のときもそうでしたが、オープンソースに対する支払い方法がないのも問題であるため、この問題を解決する場所が欲しかった
  - Promise本の場合はGumroadで任意の値段で購入できる付録などで代用していました
- 手数料がないこと
  - 基本的に継続することを考えているので、継続することにコストがないのは重要です
  - [About GitHub Sponsors for open source contributors - GitHub Docs](https://docs.github.com/en/sponsors/receiving-sponsorships-through-github-sponsors/about-github-sponsors-for-open-source-contributors)
- 同じ年に書籍を書いていて、確定申告することが決まっていたので
  - [JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)

GitHubは一番使っているサービスなので、新しい機能(GitHub Sponsors)を試したかったというのはあります。

もう一つの大きな理由としては、オープンソースの利用者がオープンソースに対する支払い手段はあったほうが良いと思っているためです。。
自分は金銭を得ることでオープンソースに取り掛かるのに義務感を持ちたくないタイプではありますが、利用者がそのオープンソースへContributeする方法としてスポンサー(金銭的な支援)できる選択肢があることは重要です。

オープンソースにContributeする方法として、バグ報告/修正、機能追加、ドキュメントを書く、IssueやDiscussionのトリアージ、マーケティングなど色々な関わり方があります。その関わり方の一つとして、金銭的な支援をするという選択肢はContributorが選べるようになっているのが望ましいと思っています。

この考え自体は[JavaScript Promiseの本](https://azu.github.io/promises-book/)をオープンソースな書籍としてリリースした際に、読者が本に対する[支払い手段がないというバグ](https://github.com/azu/promises-book/releases/tag/1.0.1)を修正した際に思ったことです。

自分は自分向け(開発者向け)のプロダクトをオープンソースとして公開することが多いため、GitHub Sponsorsはその選択肢を作る方法としてちょうど良かったため利用しています。

## GitHub SponsorsのTierの設計

GitHub Sponsorsには、月額とワンタイムの支払い方法があります。
月額とワンタイムの支払い方法に対してそれぞれ最大10種類のTierが設定できます。
（開始当初は、月額のみで、[2021年の4月](https://github.blog/changelog/2021-04-06-custom-amounts-and-one-time-payments-rolling-out-to-github-sponsors/)からスポンサー側が任意の金額を指摘できるCustom Amountsとワンタイムの支払いが追加されています。）


[自分自身のTier設計](https://github.com/sponsors/azu)は、Issue(privateなので見れない)や他の人のTierを参考にしながら作った記憶があります。

- [Brainstorm ideas for tiers · Issue #12 · github/github-sponsors-beta](https://github.com/github/github-sponsors-beta/issues/12)
  - beta版の参加者が招待されてたprivate repositoryのissue

現在のSponsonsor DashboardにはこういったTierのアイデアなども表示されています。

![Tier Tips](https://efcl.info/wp-content/uploads/2021/06/27-1624721656.png)

最終的には[自分のSponsorsのTier](https://github.com/sponsors/azu)は次のように設定しています。
Tierの種類自体は、最初に作ったものから今も特に変わっていません。

- ✨ Supporter $1 a month
- ☕️ Coffee Supporter $5 a month
- 🌐 Domain Supporter $10 a month
- 📖 Book Supporter $30 a month
- 💚 JSer.info Sponsor $100 a month
- ❤️ Open Source Sponsor $300 a month

実際のページは次のリンクから見れます。

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)

[Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)のページでTierの説明文を読むとわかりますが、基本的に個人向けのTierに見返り的なものは設定していません。
なんとなくイメージしやすいものを設定している感じです。

継続的に支援し続けるのは勇気があることだし実際すごいことだと思います。
GitHub Sponsorをする/してくれる人は継続的に活動を続けてほしいから、継続的に支援しようと思えるのだと考えています。
そのため、自分のTier設計は目先のメリットを多く明示しないようにしています。

これは、主に2つ理由があります。

- 長期的な活動を目的としたため: 継続的に支援してうこと、継続的に活動することをイメージしていたため
- 特定のプロジェクトに紐付けるのを避けるため: 特定のメリットは特定のプロジェクトに直結しやすい性質があるため、それを避ける目的

目先のメリットは行動しやすいという利点がありますが、長期化が難しいという点があります。


---

JSer.info SponsorやOpen Source Sponsorについては金額的にSponsorが企業になると想定していました。
そのため、ロゴやThanks Tweetsをするという簡単な見返りは設定しています。

しかし、Issueを優先度上げて取り組んだり、月N時間の時間を確保するみたいな見返りは設定していません。
これは、最初に書いたように金銭を受け取ることで特定のプロジェクトに対する義務感を作ることを避けるためです。
自分の場合は、義務感が生まれるとプロジェクトが遠く感じで触りにくくなる(Bornoutにつながる)ので、それを避けるために意図的にそうしています。
もちろん、人によっては義務感があったほうがよりうまく動く場合もあるため、Tierの設定を含め人それぞれに適切なものがあると思います。

Tierに特定のプロダクトを示すことも義務感につながるので避けてはいたのですが、JSer.infoはやや特殊なので、枠として分けています。
JSer.infoは最初からコストを最小化することを目的にしていたこと、[10年以上続けられた実績があること](https://jser.info/2021/01/16/jser-10th/)、[JSer.info Policy](https://jser.info/policy/)などでやることが明確化されていることなどから、
GitHub Sponsponsorのあるなしで、自分の意識はあんまり変わらないなと思ったので別枠にしています。
(もちろん、コミュニティ的に盛り上がったほうがいいので、スポンサー自体はいつでも募集しています。)



----

## 信用と信頼

基本的にはTrustベースで考えている。
安全装置としてのSponsorsはあんまり求められない

----

## GitHub Sponsorの募集をしてみての結果

現時点(2021-09-05)では、約80人ほどの人がGitHub Sponsorsで支援してくれています。

具体的なスポンサーの数とMonthly Estimated Incomeは、次のような推移で変化してきました。

- [ ] Reportの画像

このレポートは、[github-sponsor-report](https://github.com/azu/github-sponsor-report)というツールを作って、おおよそのスポンサーの数とMonthly Estimated Incomeの推移のCSV/JSONデータとSVGでの図を生成しています。

---

### [github-sponsor-report](https://github.com/azu/github-sponsor-report)の使い方

[github-sponsor-report](https://github.com/azu/github-sponsor-report)は次の手順で利用できます。
テンプレートリポジトリをforkして自分用のリポジトリを作って、GitHub Actionsの設定をするだけです。
一度設定すれば、GitHub Actionsで自動的に更新する仕組みになっています。

1. [Create a report repository using this Template](https://github.com/azu/github-sponsor-report-template/generate)
    - GitHub Sponsorsの募集ページには公開されていないデータも含まれるので`private`リポジトリとして作ることを推奨します
    - もし、Publicなリポジトリとして作る場合は`GENERATE_ONLY_IMAGE=true`をenvに設定して、画像のみの更新にしてsnapshotsデータをコミットしないことを推奨します
2. GitHub Actionsのsecretsの`PERSONAL_GITHUB_TOKEN`にGitHub Tokenをする
    - [New personal access token](https://github.com/settings/tokens/new)から`read:org` and `user` を選択したトークンを作ってください
    - 作成したトークンは、<https://github.com/{yourname}/{repo}/settings/secrets/actions> から `PERSONAL_GITHUB_TOKEN` という名前で設定します
3. 初回は何もデータがないので、手動で更新してください
    1. <https://github.com/{yourname}/{repo}/actions/workflows/update-data.yml>へアクセス
    2. "Run workflow"を実行すると、画像とsnapshotsデータが更新されます

一度設定すれば、GitHub Actionsのcronの設定で自動的に更新されるようになります。

----

### Thanks

## GitHub Sponsorをやってみての変化

- 新しいサービスを作った
- 家計簿管理、ファイナンシャルプランナーについて学んだ
- 本を読む量が増えた
