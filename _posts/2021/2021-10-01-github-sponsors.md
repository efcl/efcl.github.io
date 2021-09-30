---
title: "GitHub Sponsorsの募集を始めてから2年が経ったので振り返る"
author: azu
layout: post
date : 2021-10-01T12:00
category: 雑記
tags:
    - OSS
    - GitHub
    - Donation

---

この記事は、[GitHub Sponsors](https://github.com/sponsors)を募集開始してから、約2年経つのでGitHub Sponsorsについて振り返った記事です。

この記事では、GitHub Sponsorsを始めた理由、Tierの設計、やってみた結果と感謝、やったことによる変化、これからやる方へのアドバイスなどを書いています。

## GitHub Sponsorsを始めた理由

2019年10月から[GitHub Sponsors](https://github.com/sponsors)のページを公開して、スポンサーの募集を開始しました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">GitHub Sponsorの募集ページを公開しました。<a href="https://t.co/YpSPfMPxjU">https://t.co/YpSPfMPxjU</a><a href="https://twitter.com/hashtag/Promise%E6%9C%AC?src=hash&amp;ref_src=twsrc%5Etfw">#Promise本</a> や <a href="https://twitter.com/hashtag/jsprimer?src=hash&amp;ref_src=twsrc%5Etfw">#jsprimer</a> を書いたり、textlintを作ったり色々OSSを作ってます。<br>後は <a href="https://t.co/CXy3hOXJ8q">https://t.co/CXy3hOXJ8q</a> を8年ぐらい毎週更新してたりもします。<a href="https://twitter.com/jser_info?ref_src=twsrc%5Etfw">@jser_info</a> Sponsorとかもあるのでので、興味がある人は見てみてください</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1186972124180701184?ref_src=twsrc%5Etfw">October 23, 2019</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

GitHub Sponsorsを始めた理由はいくつかあります。

- GitHub Sponsorsを使ってみたかった
  - GitHubは一番使ってるウェブサービスなので、新しい機能は使いたい
- オープンソースに対して金銭的にContributeする方法を用意しておきたかった
  - [Promise本](https://azu.github.io/promises-book/)のときもそうでしたが、オープンソースに対する支払い方法がないのも問題であるため、この問題を解決する場所が欲しかった
  - Promise本の場合はGumroadで任意の値段で購入できる付録などで代用していました
- 手数料がないこと
  - 基本的に継続することを考えているので、継続することにコストがないのは重要です
  - [About GitHub Sponsors for open source contributors - GitHub Docs](https://docs.github.com/en/sponsors/receiving-sponsorships-through-github-sponsors/about-github-sponsors-for-open-source-contributors)
- 同じ年に書籍を書いていて、確定申告することが決まっていたため
  - [JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)
  - 確定申告の仕方については[azu/github-sponsors-tax: GitHub Sponsorsの確定申告手順](https://github.com/azu/github-sponsors-tax)に書いてあります

GitHubは一番使っているサービスなので、新しい機能(GitHub Sponsors)を試したかったというのはあります。

もう一つの大きな理由としては、オープンソースの利用者がオープンソースへ支払う手段はあったほうが良いと思っているためです。
自分は金銭を得ることでオープンソースに取り掛かるのに義務感を持ちたくないタイプではありますが、利用者がそのオープンソースへContributeする方法としてスポンサー(金銭的な支援)できる選択肢があることは重要です。

オープンソースにContributeする方法として、バグ報告/修正、機能追加、ドキュメントを書く、IssueやDiscussionのトリアージ、デザイン、マーケティングなど色々な関わり方があります。
その関わり方の一つとして、金銭的な支援をするという選択肢は、Contributorが選べるようになっているのが望ましいと思っています。

この考え自体は[JavaScript Promiseの本](https://azu.github.io/promises-book/)をオープンソースな書籍としてリリースした際に、読者が本に対する[支払い手段がないというバグ](https://github.com/azu/promises-book/releases/tag/1.0.1)を修正した際に思ったことです。

自分は自分向け(開発者向け)のプロダクトをオープンソースとして公開することが多いため、GitHub Sponsorsは支援の選択肢を作る方法としてちょうど良かったため利用しています。

## GitHub SponsorsのTierの設計

GitHub Sponsorsには、月額とワンタイムの支払い方法があります。
月額とワンタイムの支払い方法に対してそれぞれ最大10種類のTier（10種類の金額）が設定できます。
（開始当初は、月額のみで、[2021年の4月](https://github.blog/changelog/2021-04-06-custom-amounts-and-one-time-payments-rolling-out-to-github-sponsors/)からスポンサー側が任意の金額を指摘できるCustom Amountsとワンタイムの支払いが追加されています。）

[自分自身のTier設計](https://github.com/sponsors/azu)は、Issue(privateなので見れない)や他の人のTierを参考にしながら作った記憶があります。

- [Brainstorm ideas for tiers · Issue #12 · github/github-sponsors-beta](https://github.com/github/github-sponsors-beta/issues/12)
  - beta版の参加者が招待されてたprivate repositoryのissue

最終的に、[自分のSponsorsのTier](https://github.com/sponsors/azu)は次のように設定しています。
Tierの種類自体は、最初に作ったものから今も特に変わっていません。

- ✨ Supporter $1 a month
- ☕️ Coffee Supporter $5 a month
- 🌐 Domain Supporter $10 a month
- 📖 Book Supporter $30 a month
- 💚 JSer.info Sponsor $100 a month
- ❤️ Open Source Sponsor $300 a month

基本的にはMontlyの支援を優先しているため、One-timeのTierについては特に設定していません。

実際のページは次のリンクから見れます。

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)

JSer.info SponsorとOpen Source Sponsor以外はなんとなくイメージしやすいものを設定している感じです。
推奨Tierは、$5/monthの☕️ Coffee Supporterとしていますが、GitHub Sponsors上の並び順などは変更できないため、特に意味はありません。

GitHub Sponsorsをしてくれる人は継続的に活動を続けてほしいから、継続的に支援するのだと考えています。
継続的に支援し続けるのは勇気があることだし、実際すごいことだと思います。

この支援に対して継続的な活動をするために、自分のTier設計は目先のメリットはできるだけ少なく設定しています。

これは、主に2つ理由があります。

- 長期的な活動を目的としているため: 継続的に支援してもらうこと、継続的に活動することをイメージしているため
- 特定のプロジェクトに紐付けるのを避けるため: 特定のメリットは特定のプロジェクトに直結しやすい性質があるため、それを避ける目的

目先のメリット（Issueの優先サポートやチャット対応などの特典）は行動を促しやすいという利点がありますが、長期的にどうなるかを考えるのが難しいという点があります。
双方（スポンサーになる側、される側）のモチベーションが、そのメリットの影響をうけるため、長期的にどうなるかは直感的に把握できないと考えています。
一方で、目に見えたメリットがない状態なら、スポンサーされる側はなにかしらの活動（ここではオープンソース活動）を続けることが、スポンサーになった方への答えとなるので少し直感的になります。

オープンソース活動を継続できるかは、お金/時間/健康/モチベーションなど人次第ではあります。
しかしながら、[寄付は健康に対して正のフィードバックを与える](https://efcl.info/2021/02/19/donation-philanthropy-study/#1%E7%AB%A0-%E5%AF%84%E4%BB%98%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AF%E5%B9%B8%E3%81%9B%E3%81%AB%E3%81%AA%E3%82%8A%E3%80%81%E5%B9%B8%E3%81%9B%E3%81%AA%E4%BA%BA%E3%81%AF%E5%AF%84%E4%BB%98%E3%82%92%E3%81%99%E3%82%8B%E3%81%A8%E3%81%84%E3%81%86%E6%AD%A3%E3%81%AE%E3%83%95%E3%82%A3%E3%83%BC%E3%83%89%E3%83%90%E3%83%83%E3%82%AF%E3%83%AB%E3%83%BC%E3%83%97%E3%81%8C%E3%81%82%E3%82%8B%E3%81%8B%E3%81%A9%E3%81%86%E3%81%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)とする研究結果がいくつかあることや、支援してもらったお金を時間の節約に使えることなどもあるので、この辺については楽観的に考えています。

自分の場合は、もう一つの"特定のプロジェクトに紐付けるのを避けるため"という理由がモチベーションとも関係しています。
特定のプロジェクトに紐付いたメリット（〜を開発する、〜をメンテナンスする、〜にロゴを載せる）は、そのプロジェクトのメンテナンスに対する責任感を作りやすいと考えています。
そのようなメリットを作ると、自分にとって負荷になりやすい傾向がありそうだったので、特定のプロジェクトに紐づくようなメリットはTierとして取り入れないようにしていました。

💚 JSer.info Sponsor だけはやや特殊で、[JSer.infoは最初からコストを最小化することを目的にしていたこと](https://azu.github.io/slide/offline_study/jser_info.html#slide5)、[10年以上続けられた実績があること](https://jser.info/2021/01/16/jser-10th/)、[JSer.info Policy](https://jser.info/policy/)などでやることが明確化されているため、
GitHub Sponsorsのあるなしで、自分の意識はあんまり変わらないなと思ったので別枠にしています。
(もちろん、コミュニティ的に盛り上がったほうがいいので、スポンサー自体はいつでも募集しています！)

人によってどのようなTierにするかは自由で、考え方が異なる部分だと思います。
そのため、これが正解ではないですが、改めて自分のTier設計について書いてみました。

📝 もし今からTierを設計するなら、Custom Amount（ユーザーが自由に金額を決められる）があるため、Tierの数を減らしたほうがわかりやすくなる気はします。
ただし、Custom Amountは最初なかったのと、後からAmountを変更はできないので今のようなTier設計になっています。

また、現在のSponsonsor Dashboardには、次のようなTierのアイデアなども表示されています。
これからTierを設定する人は、これも参考にすると良いかもしれません。

![Tier Tips](/wp-content/uploads/2021/06/27-1624721656.png)

## GitHub Sponsorを募集してみての結果

現時点(2021-10-01)では、約80名以上の人がGitHub Sponsorsで支援してくれています。（ありがとうございます！）

具体的なスポンサー数とMonthly Estimated Income(単位は$)は、次のような推移で変化してきました。

[![GitHubスポンサー数の推移グラフ](/wp-content/uploads/2021/09/sponsors_count.svg)](/wp-content/uploads/2021/09/sponsors_count.svg)

> GitHub Sponsorsでの月ごとのスポンサー数の推移

[![Monthly Estimated Income](/wp-content/uploads/2021/09/estimated_income_dollar.svg)](/wp-content/uploads/2021/09/estimated_income_dollar.svg)

> GitHub Sponsorsでの月ごとの推定収入の推移（単位はアメリカドル）

約20名の方が、GitHub Sponsorsを開始当初から支援を継続してくれていて、その後は一定のペースで増えてきている形になっています。

基本的には一定のペースですが、2021年3月や2021年6月から7月あたりに普段より増えているのは、リリースなどでGitHub Sponsorsに触れてたりしていたからだと思います。

- [寄付をするために、寄付の予算と寄付の記録をSpreadSheetベースでつける philan.net というサービスを作った | Web Scratch](https://efcl.info/2021/03/10/philan.net/)
- [ES2021に対応したJavaScript Primer 3.0を公開しました - JavaScript入門 | Web Scratch](https://efcl.info/2021/06/28/jsprimer-3.0/)

また、2020年12月と2021年6月にMonthly Estimated Incomeが大きく変化しているのは、サイボウズさんとヴェルクさんにスポンサーしてもらったためです。
それぞれ企業としてGitHub Sponsorsしたことについての記事を書かれています。

- [GitHub Sponsorsを使って「企業」として寄付をした話 - Cybozu Inside Out | サイボウズエンジニアのブログ](https://blog.cybozu.io/entry/2021/03/19/110000)
- [会社（ヴェルク）としてGithub Sponsorsになりました - ヴェルク - IT起業の記録](https://tamukai.blog.velc.jp/entry/2021/05/18/091040)

📝 ここで利用したレポート画像は、[github-sponsor-report](https://github.com/azu/github-sponsor-report)というツールで作成しています。このレポートは途中でやめた人のデータは入らないため、実際はもっと上下してるはずです。そのため、雰囲気で見てください。
[github-sponsor-report](https://github.com/azu/github-sponsor-report)はオープンソースとして公開しているので、自分用のGitHub Sponsorsダッシュボードを作りたい方は使ってみてください。

<details>
    <summary>github-sponsor-reportの使い方</summary>

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
    
</details>

## GitHub Sponsorsをされることで負担が減ったこと

まず最初にGitHub Sponsorsしてくれている方に感謝します！

GitHub Sponsorsを開始してからの変化としては、継続的な維持コストへの金銭的/心理的負担が緩和されたと思います。

もともと、自分は維持コストが増えることに対してかなり慎重な考えもっています。
特にドメインやサブスクリプションといった金銭的なコストが増えること対しても慎重でしたが、ここへの負担はGitHub Sponsorsがかなり減らしてくれたと思っています。

具体的には、ドメインはよっぽどのことがない限り取らない方針でしたが、🌐 Domain Supporterの存在のおかげで、[philan.net](https://philan.net/)を作るときに迷わずドメインを取得できました。
（今、[philan.net](https://philan.net/)のバックエンドをVercelからAWSに移そうとしているので結果的にドメインを取ったことは正解でした）

また、Oreillyの書籍をサブスクリプションで読むために[ACM会員](https://dl.acm.org/)となっていますが、本体よりは安いとはいえ$99/yearが躊躇なく払えるのは、📖 Book Supporterの存在のおかげです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">今年もGitHub Sponsorsのおかげて、ACMアカウント更新できました。<br>ありがとうございます。<a href="https://t.co/YpSPfMPxjU">https://t.co/YpSPfMPxjU</a><br><br>ACMアカウントは <a href="https://t.co/bGbCwsLjJC">https://t.co/bGbCwsLjJC</a> 読むのに使ってて、今年はOreilly以外も含めると100冊以上は読んでるきがするので助かります。 <a href="https://t.co/SvMZ4N5WCa">pic.twitter.com/SvMZ4N5WCa</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1425750513094516742?ref_src=twsrc%5Etfw">August 12, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

- [ACM会員になってオライリーの本が読み放題 | たむたむの日記](https://blog.orz.at/2021/04/08/acm-student/)

その他にも、今年は寄付について調べていて海外の学術書も読んでいたのですが、
この辺の妙に高い($50とか超えてくる)本を読もうと思ったのは、GitHub Sponsorsの存在が大きいです。

- [寄付研究や慈善活動について研究するために色々な書籍や論文を読んだメモ書き | Web Scratch](https://efcl.info/2021/02/19/donation-philanthropy-study/)
- [慈善活動や寄付やオープンソースについて発表した | Web Scratch](https://efcl.info/2021/03/31/opensource-donation/)

金銭的な負担が相殺されることで、開発や学習における心理的な負担が減っていると感じました。

## GitHub Sponsors募集後に新しく始めたこと

GitHub Sponsorsのおかげで負担が減っただけではなく、新しいことに取り組む機会が増えたと思います。

[philan.net](https://philan.net/)は、まさにその典型例です。
GitHub Sponsorsそのものについて考えていて、寄付の歴史や仕組みについて調べていました。
その中で、寄付の仕組みをもっと知るためには、寄付をしてみるのが一番実践的なので、寄付をするために管理する仕組みを作って実践してみようと思って始めたプロジェクトです。

- [寄付をするために、寄付の予算と寄付の記録をSpreadSheetベースでつける philan.net というサービスを作った | Web Scratch](https://efcl.info/2021/03/10/philan.net/)
- [Next.js + Vercel + Cloudflare Workers KV + Googleスプレットシートで寄付管理サービスを作った | Web Scratch](https://efcl.info/2021/03/12/next.js-vercel-cloudflare-workers-kv/)

また、毎年オープンソース活動の振り返りを書いていますが、GitHub Spornsorsを2019年に開始してから、新しく作ったリポジトリの数は増えています。

> 作ったリポジトリ  
> 2020: 111  
> 2019: 81  
> [今年のオープンソース活動振り返り @ 2020 | Web Scratch](https://efcl.info/2020/12/31/open-source-in-2020/)

GitHub Sponsorsを始める前(2019年)に作成したリポジトリと始めた後(2020年)に作成したリポジトリへコミットした量の比率を調べてみました。
ここで扱っているリポジトリはPublicリポジトリのみであるため、Privateリポジトリは含みません。

次の図は、2019年と2020年のそれぞれの一年間で、コミットした数をリポジトリごとに出したものです。

[![2019年と2020年のコミット数をリポジトリごとにだしたもの](/wp-content/uploads/2021/09/20-1632125268.png)](https://docs.google.com/spreadsheets/d/e/2PACX-1vSdSg2t8ORPGhjjWttuk8MOtnUQQwK4nsmyut97ttfj0iwbew1bnXW1v_tFKKysnZMufbbszzY0NbuT/pubhtml?gid=153014883&single=true)

> クリックすると拡大したグラフが見れます  
> Spreadsheet: <https://docs.google.com/spreadsheets/d/1OZz4GvORzt2YORbiJPX_QzjggoviJAV2vNDJeubQfE4/edit?usp=sharing>  
> Source Code: <https://github.com/azu/github-commit-count-per-repository> 

それぞれの期間でコミットしたリポジトリの数を出してみると、次のようになっていました。(Publicリポジトリのみが対象)

- 2019年と2020年の2つの期間でコミットがあったリポジトリの総数は、322コ
- そのうち、2つの期間でどちらの期間でも継続的にコミットがあったリポジトリは、92コ
- どちらか片方の期間でしかコミットがなかったリポジトリは、230コ
  - 一時的なリポジトリ(テストなど)や新規リポジトリなどを含む
- 2019年の合計コミット数は8073
- 2020年の合計コミット数は10656

継続的にコミットしているリポジトリとしては、[JSer.info](https://github.com/jser)、[textlint](https://github.com/textlint/textlint)、[JavaScript Primer](https://jsprimer.net/)などがあります。
一方で、GitHub Sponsors開始後に新しく作られたものとしては、[philan.net](https://github.com/azu/philan.net)、[HonKit](https://github.com/honkit/honkit)、[Secretlint](https://github.com/secretlint/secretlint)などがあります。

dependabotなどのbotによるコミットも含まれているため、あまり正確ではありませんが、それでも新しいものへとコミットする量は増えていると思います。
その中から、何割かは継続してコミットしているという形になってるようです。

色々と書きましたが、まとめるとGitHub Sponsorsを開始した後もコミット数は増えていて、公開したリポジトリも増えています。
新しいものを色々と作ってみることに挑戦できていて、その中から何かしらの需要があったものはメンテナンスが続いてるという形になっています。

## これからGitHub Sponsorsについて考える人へ

### For Developer

これからGitHub Sponsorsに開発者登録しようと考えている人は、次を手順を参考してください。
税金のためのW8BENの記入など面倒な部分もありますが、ほぼフォームに手順どおり入れていくだけなので、そういう機会だと思えば悪くないものです。

- [GitHub Sponsors 登録手順](https://zenn.dev/kawarimidoll/articles/4fbfa878a0a004)
- [GitHub Sponsors の DocuSign で提出する W-8BEN の書き方 - 猫でもわかるWebプログラミングと副業](https://www.utakata.work/entry/2021/09/21/142248)
- [GitHub スポンサーを通じてスポンサーシップを獲得する - GitHub Docs](https://docs.github.com/ja/sponsors/receiving-sponsorships-through-github-sponsors)

オープンソース活動で金銭を受け取りたくないという人もいると思います。
お金を受け取ることで義務感や責任を持ちたくないなどの理由があると思いますが、
自分のようにTier設計を工夫してみることで、気持ちへの負担が減ることもあるので検討してみてください。
もちろん、すべての人がGitHub Sponsorsをやるべきという話ではないため、必要になったら再検討してみてください。

- [オープンソースで金銭を得る | Open Source Guides](https://opensource.guide/ja/getting-paid/)
  - なぜ金銭的サポートを探している人がいるのか？なぜオープンソース活動で金銭を受け取りたくないと思う人がいるのか？などオープンソースとお金について色々と書かれているGitHubによるドキュメント

また、人に「GitHub Sponsorsでサポートしてください！」というようにサポートを頼むことに対して、必要以上に罪悪感をもたないことをおすすめします。
実際にあなたが作ったライブラリを利用したり、あなたが書いたものを参照したりしている人は、そこに対して価値を感じているはずです。
価値を感じている人に対して支援を依頼することは、その活動を維持するための健全な行動です。（逆に価値を感じている人は、支援する方法を求めているかもしれません）

[Jeff Geerling](https://github.com/geerlingguy)さんも、次のようなアドバイスを書いています。

> For other maintainers: Don't feel guilty asking people to support you. Whether they'll admit it or not, if they're using your project, they are getting value out of it. And in the case of organizations building on top of your projects, usually a lot. Don't get all spammy (there's a reason we distrust salespeople...), but definitely ask people to assist you financially.
> [I'm thankful for GitHub, Patreon, and my sponsors this year | Jeff Geerling](https://www.jeffgeerling.com/blog/2020/im-thankful-github-patreon-and-my-sponsors-year)

最後に、オープンソースに対して簡単に金銭的な支援ができるようになったのはまだ最近の話なので、実際にやってみないとわからないことも多いはずです。

2021年に[Tideliftが取ったアンケート](https://tidelift.com/subscription/the-tidelift-maintainer-survey)(対象は378人)では、
オープンソースメンテナーの約半数が何かしらの金銭をもらっていて、その中で5万ドル以上もらっているのは5 + 1で6%程度です。
([Tidelift](https://tidelift.com)はオープンソース開発者によるサブスクリプションサポートを提供するプラットフォームで、回答者のうち[Tidelift](https://tidelift.com)を利用しているのは27%ほど。そのためデータはあくまで参考程度です)

![Tideliftのアンケート結果より抜粋](/wp-content/uploads/2021/09/20-1632117537.png)

> How much total income do you receive per year for your open source maintenance work from all sources?  
> [The 2021 Tidelift open source maintainer survey](https://tidelift.com/subscription/the-tidelift-maintainer-survey)

このデータからもわかるように、仕事の収入をGitHub Sponsorsのような支援で置き換えることは、簡単ではありません。
（置き換える簡単な方法は、仕事としてオープンソースに関わる事ですが、これは本題ではないため扱いません）

![IncomeをOpen Source Incomeで置き換えるのは難しい](/wp-content/uploads/2021/09/20-1632125123.png)

置き換えることを目標に置くことは悪くないと思います。
ただ、最初は既存の収入に対してGitHub Sponsorsの支援をプラスするイメージで、Tierを設計するのが良いかもしれません。
オープンソースで得た利益や活動などから学ぶことで、このバランスは変化してくるかもしれません。

![IncomeにOpen Source Incomeを足すイメージ](/wp-content/uploads/2021/09/20-1632125180.png)

Tierの設計が難しい場合は、GitHub SponsorsにはCustom Amount（支援する人が自由に金額を決める機能）があるため、
Custom Amountの推奨値だけを設定して、細かいTierは後回しにする方法などもあると思います。

最初からベストなバランスを見つけるのは難しいので、この辺はやりながら見つけるしかないと思います。

## For Sponsors

（自分以外を含む）誰かのSponsorsとなっている人はすごいことです。

その支援している金額の大小に関係なく、支援することには大きな意味があります。
特にMontlyなどの継続的な支援は、金額以上の意味があると感じました（少なくても自分にとってはそう感じました）。

この記事も、自分を支援してくれている人に対して、支援されることについてどう感じているかを説明するために書き始めました。
自分のTierは明確なリターンを設定していないため、このような記事や年末のレポートなどを書いていますが、支援してくれていることに感謝しています。

## For Company

[GitHub Sponsors](https://github.blog/jp/2020-05-19-github-sponsors-is-out-of-beta-for-sponsored-organizations/)や[Open Collective](https://opencollective.com/)では、企業が特定の人やオープンソースプロジェクトを支援できるようになっています。

日本でも、いろいろな企業がGitHub Sponsorsなどを使ってオープンソースを支援しています。
具体的な支援の仕方や何を理由にオープンソースを支援しているのかについても紹介されているので、参照してみてください。

- [GitHub Sponsorsを使って「企業」として寄付をした話 - Cybozu Inside Out | サイボウズエンジニアのブログ](https://blog.cybozu.io/entry/2021/03/19/110000)
- [企業として Github Sponsors になる](https://kazamori.jp/blogs/2021/01/09/github-sponsors/)
- [時雨堂として GitHub Sponser を利用して OSS 開発者のスポンサーになりました - shiguredo - Medium](https://medium.com/shiguredo/%E6%99%82%E9%9B%A8%E5%A0%82%E3%81%A8%E3%81%97%E3%81%A6-github-sponser-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6-oss-%E9%96%8B%E7%99%BA%E8%80%85%E3%81%AE%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B5%E3%83%BC%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%97%E3%81%9F-845396b93f7d)
  - [企業で OSS のスポンサーや災害支援の寄付をする意味 - V - Medium](https://voluntas.medium.com/%E4%BC%81%E6%A5%AD%E3%81%A7-oss-%E3%81%AE%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B5%E3%83%BC%E3%82%84%E7%81%BD%E5%AE%B3%E6%94%AF%E6%8F%B4%E3%81%AE%E5%AF%84%E4%BB%98%E3%82%92%E3%81%99%E3%82%8B%E6%84%8F%E5%91%B3-d41ec6a45774)
- [会社（ヴェルク）としてGithub Sponsorsになりました - ヴェルク - IT起業の記録](https://tamukai.blog.velc.jp/entry/2021/05/18/091040)
- [PLAIDはGitHub Sponsorsを利用してOSSのスポンサーになりました](https://tech.plaid.co.jp/github-sponsors/)
- [スタディプラスはRSpecに寄付しました - Studyplus Engineering Blog](https://tech.studyplus.co.jp/entry/2021/08/26/085121)
- [株式会社キューブ・ソフトは企業として GitHub Sponsors を開始しました - Life like a clown](https://clown.cube-soft.jp/entry/2021/09/08/github-sponsors)
- [スタートアップだからこそ OSS に寄付をする理由 | Yuku Kotani](https://yuku.dev/articles/2021-05-26/donate-to-oss)
- [ゼンアーキテクツは GitHub Sponsors を通じて OSS をサポートしています | ZEN ARCHITECTS](https://zenarchitects.co.jp/posts/zen-github-sponsors)

もしあなたが従業員で、会社に対してオープンソースのスポンサーになる理由を説明する必要があるなら、次の記事にいろいろな支援のアプローチが書かれているので参照してみてください。

- [How to talk to your company about sponsoring an open source project - Human Who Codes](https://humanwhocodes.com/blog/2021/05/talk-to-your-company-sponsoring-open-source/)
  - ESLintの著者によって書かれた、オープンソースのスポンサーについて会社に話す方法についての記事

90%以上の企業がなにかしらのオープンソースソフトウェア/ライブラリを利用しているという話があります。
何をサポートすればいいのか分からない場合は、ソフトウェアエンジニアといったオープンソースを利用している人と話しあってみてください。

- [2021年のOSSRAレポートから読み解く、商用ソフトウェアにおけるオープンソースの状況 - ソフトウェア・インテグリティ](https://www.synopsys.com/blogs/software-security/ja-jp/open-source-trends-ossra-report/)
- [The State of Enterprise Open Source: A Red Hat Report](https://www.redhat.com/en/enterprise-open-source-report/2021)

企業として何かしらのオープンソースを利用していて、ソフトウェアサプライチェーンの一部分としてのオープンソースに興味がある人は、次のレポートやドキュメントがおすすめです。
オープンソースのメンテナー不足の問題やリスクなどについて書かれています。逆を言えば、何を支援したら安全にオープンソースを利用できるかを見つけられる可能性があります。

- [Threats, Risks, and Mitigations in the Open Source Ecosystem · Open-Source-Security-Coalition/Open-Source-Security-Coalition](https://github.com/Open-Source-Security-Coalition/Open-Source-Security-Coalition/tree/master/publications/threats-risks-mitigations)
- [The rise of few-maintainer projects – Increment: Open Source](https://increment.com/open-source/the-rise-of-few-maintainer-projects/)

もっと規模の大きなオープンソースの経済効果について知りたい方は、EUのオープンソースに関するレポートが詳細でおすすめです。

- [Study about the impact of open source software and hardware on technological independence, competitiveness and innovation in the EU economy | Shaping Europe’s digital future](https://digital-strategy.ec.europa.eu/en/library/study-about-impact-open-source-software-and-hardware-technological-independence-competitiveness-and)

## まとめ

2019年10月からGitHub Sponsorsの募集をはじめてから約2年経ったので、改めてGitHub Sponsorsについてまとめてみました。
GitHub Sponsorsの募集をどういう理由で始めて、どういう考えでやっていて、その結果どうだったのかについて書きました。
また、自分を支援してくれてる人に対してその影響や価値について説明することも記事の目的の一つです。

この記事では、個人的なオープンソース活動の持続可能性について書きました。

オープンソースにおける持続可能性については、昔から話題となるテーマだと思います。
最近も、[Open-core model](https://en.wikipedia.org/wiki/Open-core_model)ではカバーできてなかった部分をカバーしようと[新しい種類のライセンス](https://blog.kengo-toda.jp/entry/2021/01/20/234622)が生まれたり、[Deno](https://deno.com/blog/the-deno-company)/[Excalidraw](https://blog.excalidraw.com/introducing-excalidraw-plus/)/[Rome](https://rome.tools/blog/announcing-rome-tools-inc/)などオープンソースから始まっている会社なども増えています。
このテーマについては、まだまだ議論は続くと思いますが、実際やってみないと分からない部分も多いです。
そのため、自分もGitHub Sponsorsをやってみての話を書くことにしました。

最近はGitHub SponsorsやOpen Collectiveなど、オープンソースに対して金銭的に支援する方法が増えてきていて、既に利用できる状態です。
[GitHub Sponsors](https://github.com/sponsors)/[Open Collective](https://opencollective.com/)/[Patreon](https://www.patreon.com/)などのサービスは、Montlyでの支援（継続的な支援）がデフォルトの選択肢としてあるのが、いわゆる[投銭](https://ja.wikipedia.org/wiki/%E6%8A%95%E3%81%92%E9%8A%AD#%E3%83%8D%E3%83%83%E3%83%88%E6%8A%95%E9%8A%AD)とは少し異なるような感じがしました。
そのため、オープンソースにおける活動でも、これらの支援形態によって今までは見なかった新しい動きが見られるようになるかもしれません。

---

自分のGitHub Sponsorsは、次のページから登録できます。
もしよろしければ、支援してくれると嬉しいです！

<iframe src="https://github.com/sponsors/azu/button" title="Sponsor azu" height="35" width="116" style="border: 0;"></iframe>

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)
