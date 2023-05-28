---
title: "GitHub ActionsでRSSをTwitterに投稿するアクションを作った"
author: azu
layout: post
date : 2023-05-28T10:49
category: GitHub
tags:
    - GitHub
    - GitHub Actions
    - RSS

---

RSSの新しい投稿をTwitterに投稿するGitHub Actionsを作りました。

- [azu/rss-to-twitter: GitHub Actions: RSS to Twitter](https://github.com/azu/rss-to-twitter)

IFTTTでRSSをTwitterに投稿していたのですが、2023年に無料プランが終了するので代替手段を探していました。
色々探したけど欲しいものがなかったので作りました。

- [Updates to IFTTT free tier - IFTTT](https://ifttt.com/explore/updates-to-free-tier-2023)

RSSでTwitterに投稿してたのが、GitHub Pagesで管理してるブログだけだったのでGitHub ActionsでRSSをチェックしてTwitterに投稿するアクションを作りました。

## 準備

### Twitter API Keyの取得

投稿するアカウントでTwitter Appsを作り、API KeyやAccess Tokenを取得する必要があります。

0. 投稿したいアカウントでログインする
1. Twitter Appをつくります - <https://developer.twitter.com/en/portal/dashboard>
2. デフォルトのパーミッションが`Read`のみになってることがあるので`Read and Write`に変更します
  - *User authentication settings* という場所から設定できるので、パーミッションを`Read and Write`に変更します
  - ![ss 1](https://raw.githubusercontent.com/azu/rss-to-twitter/main/docs/img.png)
  - ![ss 2](https://raw.githubusercontent.com/azu/rss-to-twitter/main/docs/img_1.png)
3. API Key/API Key Secret と Access Token/Access Token Secretを取得します
  - それぞれAPI KeyといAccess Tokenをregenerateするなどでコピーしておきます 
  - ![Twitter APIKEY](https://raw.githubusercontent.com/azu/rss-to-twitter/main/docs/apikey.png)
  - `TWITTER_APIKEY` と `TWITTER_APIKEY_SECRET`
  - ![Twitter ACCESS TOKEN](https://raw.githubusercontent.com/azu/rss-to-twitter/main/docs/accesstoken.png)
  - `TWITTER_ACCESS_TOKEN` と `TWITTER_ACCESS_TOKEN_SECRET`
  - ⚠️ ちゃんと "**Read and Write** permissions" になってることを確認してからトークンを作ってください
  - Twitter v1 APIを作ってる場合はProjectがないこともあるので、そこからやってください
  - トークンがあってない時、V1のトークンの場合は403エラーになります

### Twitter API KeyをGitHub Actionsに設定する

GitHub ActionsのSecretsにTwitter API Keyを設定します。

- `https://github.com/{owner}/{repo}/settings/secrets/actions` から設定できます

次の4つのSecretsを設定します。

- `TWITTER_APIKEY`: API KeyとAPI Key Secretの対
- `TWITTER_APIKEY_SECRET`: API KeyとAPI Key Secretの対
- `TWITTER_ACCESS_TOKEN`： Access TokenとAccess Token Secretの対
- `TWITTER_ACCESS_TOKEN_SECRET`: Access TokenとAccess Token Secretの対

## 使い方

主に二つのユースケースを想定しています。

📝 `RSS_URL`でチェックするRSSのURLと`TWEET_TEMPLATE`の投稿内容は各自の環境に合わせて設定してくだあい。

## スケジュール投稿

定期的にRSSをチェックして、新しい投稿があればTwitterに投稿します。

GitHub ActionsではCronが指定できるので、`on.schedule.cron`で定期的に実行するように設定します。

次のサンプルだと、15分ごとにRSSをチェックして、新しい投稿があればTwitterに投稿します。

```yaml
{% raw %}
name: rss-to-twitter
on:
  schedule:
    # every 15 minutes
    - cron: "*/15 * * * *"
  workflow_dispatch:
jobs:
  twitter:
    runs-on: ubuntu-latest
    steps:
      - uses: azu/rss-to-twitter@v1
        with:
          # RSS feed URL
          RSS_URL: "https://hnrss.org/newest"
          TWEET_TEMPLATE: 'New Post: "%title%" %url%'
          TWITTER_APIKEY: ${{ secrets.TWITTER_APIKEY }}
          TWITTER_APIKEY_SECRET: ${{ secrets.TWITTER_APIKEY_SECRET }}
          TWITTER_ACCESS_TOKEN: ${{ secrets.TWITTER_ACCESS_TOKEN }}
          TWITTER_ACCESS_TOKEN_SECRET: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
{% endraw %}
```

仕組み的にはこのcron構文をパースしています。
Actionが起動した瞬間に、前回のJobの時間をCron構文から計算して、前回のJobの時間から現在の時間までの間にある投稿を取得してTwitterに投稿します。

- https://github.com/azu/rss-to-twitter/blob/691853f6b6c5532c5e6b423e78024f877e391141/src/process.ts#L22-L27

起動時間は微妙にズレることはあるので、5分ぐらいのズレを許容しています。

## GitHub Pagesの更新を検知して投稿

GitHub Pagesでブログなどを公開している場合は、ページのビルドが終わったタイミングで、RSSをチェックして投稿できます。

次のサンプルでは、ビルドが成功した付近の時間に公開された投稿をTwitterに投稿します。

- `page_build`: 2023年 5月28日 日曜日 11時00分00秒 JST
- 投稿される記事: 2023年 5月28日 日曜日 10時45分00秒 JST - 2023年 5月28日 日曜日 11時00分00秒 JST の記事

この投稿時間は、Jekyllだと`date`で指定されているような公開時間になります。
更新時間にしてないのは、更新すると再度Twitterに投稿されても微妙なので、公開時間にしています。

```yaml
{% raw %}
name: rss-to-twitter
on:
  page_build
jobs:
  twitter:
    # if github.event.build.error.message is not null, it means that the build failed. Skip it
    if: ${{ github.event.build.error.message == null }}
    runs-on: ubuntu-latest
    steps:
      - uses: azu/rss-to-twitter@v1
        with:
          RSS_URL: "https://you.github.io/feed.xml"
          TWEET_TEMPLATE: 'New Post: "%title%" %url%'
          UPDATE_WITHIN_MINUTES: 15 # post items that are published within 15 minutes
          TWITTER_APIKEY: ${{ secrets.TWITTER_APIKEY }}
          TWITTER_APIKEY_SECRET: ${{ secrets.TWITTER_APIKEY_SECRET }}
          TWITTER_ACCESS_TOKEN: ${{ secrets.TWITTER_ACCESS_TOKEN }}
          TWITTER_ACCESS_TOKEN_SECRET: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
{% endraw %}
```


注意事項として、GitHub Actionsで `{% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}` を使ってGitHub Pagesにデプロイしている場合 `page_build` イベントは発火しません。これは、GitHub Actionsで無限ループを防ぐための仕様になってます。

- [Automatic token authentication - GitHub Docs](https://docs.github.com/en/enterprise-server@2.22/actions/security-guides/automatic-token-authentication#using-the-github_token-in-a-workflow)
- [github actions - Push event doesn't trigger workflow on push paths - Stack Overflow](https://stackoverflow.com/questions/67550727/push-event-doesnt-trigger-workflow-on-push-paths)

`{% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}`の代わりにPersonal Access Tokenを使うと`page_build`イベントが発火されるので、PATを使ってください。

- Example:
  - Deploy Workflow: https://github.com/jser/jser.github.io/blob/a0fcfc6ef3829055ee10807009d04fb6431a4daf/.github/workflows/deploy.yml#L26-L35
  - RSS to Twitter Workflow:https://github.com/jser/jser.github.io/blob/a0fcfc6ef3829055ee10807009d04fb6431a4daf/.github/workflows/rss-to-twitter.yml
  - Twitter:https://twitter.com/jser_info

PATの代わりにGitHub Appsからトークンを作成しても良いです。

- [GitHub Appsトークン解体新書：GitHub ActionsからPATを駆逐する技術](https://zenn.dev/tmknom/articles/github-apps-token)

## TWEET_TEMPLATE

テンプレートとして使える構文です。

- `%title%`: Item title
- `%url`: Item URL
- `%desc%`: Item content snip(max 280 characters)

一応勝手に280文字(140文字)に切り詰めています。
テンプレートは既存の処理を使い回していて、あんまり必要なものを考えて作ってないので、必要ならPRください。

## おわりに

正直同じことをやってる人はいると思って、作るのは避けてたいました。
ただ、調べてみても見つからなかったので作りました。

- テンプレートリポジトリ自体をCloneしてやるパターンは避けたかった → ブログのリポジトリに設定を紐付けたい
- 欲しいのはGitHub Actionsでシンプルなものだった → CLIも探したけど、いまいち見つけられず
- ページがビルドできたら、すぐに投稿したい

ということで、このような形になりました。

- [azu/rss-to-twitter: GitHub Actions: RSS to Twitter](https://github.com/azu/rss-to-twitter)

GitHub Actionsのリリースが面倒だったり、Node.jsだとbundleの問題があるので、DenoかBunを使いたかったけどテンプレートがなくて諦めました。