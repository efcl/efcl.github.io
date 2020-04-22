---
title: "NetlifyのOpen Source Planを申請する"
author: azu
layout: post
date : 2020-04-22T09:11
category: 雑記
tags:
    - Netlify

---

[Netlify](https://www.netlify.com/)は便利ですが、Freeプランだと月300分の制限があります。

> 300 build minutes/month
> 
> https://www.netlify.com/pricing/

色々なOSSで[Netlify](https://www.netlify.com/)を使っているとこの制限にすぐに到達してしまいます。
具体的には、次の点でNetlifyのBuilt Timeはすぐ消費されてしまいます。

- RenovatebotなどPRをたくさん出すやつとNetlifyのPreview Buildの相性が悪い
- NetlifyのBuild TimeはプロジェクトをTransferしても、一度消費した分は戻らない
- `https://app.netlify.com/teams/{team}/builds/insights` でBuild Timeを見られる


## Netlify Open Source Plan

Netlifyには[Open Source Plan](https://www.netlify.com/legal/open-source-policy/)があり、OSSで次の条件を満たす場合に利用できます。
OSS Planの利用条件は簡単に言えば、OSSなライセンスで、CoCがあり、Netlifyにリンクが貼ってあって、商用プロジェクトではないというものです。

```
- Includes a license listed on the Open Source Initiative approved license list or a Creative Commons license that includes “attribution” or places the work in the public domain.
- Features a Code of Conduct at the top level directory of the project repository or prominently in the documentation (with a link in the navigation, footer, or homepage).
- Must feature a link to our service on your main page, or all internal pages. You have two options:
    We have premade badges for your convenience, or
    You may create your own link, which should read “This site is powered by Netlify”, and include a link back to our home page.
- Must not be a commercial project, whether created by a company or an individual. This prohibition includes commercial support and hosting services.
```

- [Open Source | Netlify](https://www.netlify.com/open-source/)
- [Open Source Plan Policy | Netlify](https://www.netlify.com/legal/open-source-policy/)

Open Source Planは月に1000分のビルド時間が付与されています。
また、並列ビルド数も3で、メンバーも無制限なので、実質的に[Pro](https://www.netlify.com/pricing/)プランと同じような形になっています。

![OSS Plan 1000 built minutes/month](https://efcl.info/wp-content/uploads/2020/04/22-1587514855.png)

![Bandwidth](https://efcl.info/wp-content/uploads/2020/04/22-1587514947.png)

この[Open Source Plan](https://www.netlify.com/legal/open-source-policy/)を使うには次のフォームから申請する必要があります。

- [oss-account-application](https://opensource-form.netlify.com/)

## Netlify OSS Planの手続き

自分がやった時(2020年1月)には、
[Open Source Plan](https://www.netlify.com/legal/open-source-policy/)を利用するには次の手続きをしました。

1. [oss-account-application](https://opensource-form.netlify.com/)からフォームを埋めて問い合わせる
2. サポートからOSS Planの新しいTeamを作れる権限を一時的に付与してもらえる
3. https://app.netlify.com/teams/new/pricing からOSS Planを選んで新しいTeamを作成
4. サポートに報告する(OSS Planでチームを作る権限が取り除かされる)
5. 既存のサイトを新しいTeamにTransferする

新しくOSS PlanのTeamを作ってそこへOSSなものは移行する感じで、NetlifyのOSS Planを利用できます。
Transferしても既存のサイトには特に影響ないので(Collaboratorとかは影響がある)、気軽にTransferできます。

たとえば、[almin](https://github.com/almin/almin)はNetlifyのOSS Planの方を使っています。

OSSでNetlifyを使っていて、Build timeはメンバー数の制限で困ってる場合は[Open Source Plan](https://www.netlify.com/legal/open-source-policy/)を使うのがよいと思います。