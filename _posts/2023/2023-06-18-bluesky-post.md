---
title: "投稿専用クライアントのpostemとpost-tweetをBlueskyに対応した"
author: azu
layout: post
date : 2023-06-18T14:40
category: 雑記
tags:
    - Bluesky
    - Twitter
    - Electron

---

自分用の投稿専用クライアントであるpostemとpost-tweetをそれぞれ[Bluesky](https://bsky.app/)に対応しました。

- [azu/postem: Cross posting client for twitter, hatebu, and own services.](https://github.com/azu/postem)
- [azu/post-tweet: Simple post client for twitter and bluesky.](https://github.com/azu/post-tweet)

![postem](https://user-images.githubusercontent.com/19714/246646384-deb060a9-57ad-4bdc-a012-40ab2bb27581.png)

それぞれ紹介記事を書いてありますが、多分自分しか使ってないとは思います。
ただ、投稿の8割ぐらいはこれ経由な気がするので、かなり使っているツールです。

- [URLスキームで起動できる投稿専用のTwitterクライアントを書いた | Web Scratch](https://efcl.info/2018/11/29/post-twee/)
- [Twitterやはてなブックマークにクロスポストできるクライアントアプリを書いた | Web Scratch](https://efcl.info/2019/05/01/postem/)

[JSer.info](https://jser.info/)の更新のためのデータを入れるのは、[postem](https://github.com/azu/postem)が99%ぐらいなので、ほぼ毎日使ってる感じです。

- [JSer.info 10周年: JavaScript情報の集め方、書き方、まとめ方 - JSer.info](https://jser.info/2021/01/16/jser-10th/)

## [Bluesky](https://bsky.app/)の対応

[Bluesky](https://bsky.app/)は、裏側の仕組みが違う見た目がTwitterみたいなサービスです。
また[Private Beta](https://blueskyweb.xyz/blog/3-2-2023-bluesky-beta-app)ですが、[@s7tya](https://twitter.com/s7tya)さんに招待コードをもらったので、アカウントを作っていじっています。

- [azu (@azu.bsky.social) - Bluesky](https://bsky.app/profile/azu.bsky.social)

Twitterみたいなものなので、Twitterに投稿するときのリンク投稿用クライアントであるそれぞれも[Bluesky](https://bsky.app/)に対応してみました。

- [azu/postem: Cross posting client for twitter, hatebu, and own services.](https://github.com/azu/postem)
- [azu/post-tweet: Simple post client for twitter and bluesky.](https://github.com/azu/post-tweet)

両方ともクロスポストに対応してるので、TwitterとBlueskyどちらにも投稿できるようになっています。
両方とも自分しか使ってないと思うので、バイナリ配布をしてないですが、READMEを見て各自でビルドしてみてください。

[Bluesky](https://bsky.app/)はAPIトークンがまだなく、App Passwordというアカウント削除とかができないようなパスワードを使ってAPIを叩くようになっています。将来的には、もっとちゃんとしたものを実装するそうです。

> Today we’re shipping app passwords, a short-term solution for authentication that will let users experiment with new clients without having to fully trust them with their passwords. In the long term, we plan to implement SSO (Single Sign-On) with scoped permissions.
> https://blueskyweb.xyz/blog/4-21-2023-atproto-developer-ecosystem

そのため、それぞれのアプリようにApp Passwordを作成して設定する必要があります。

1. Visit https://bsky.app/settings/app-passwords
2. Create new App Password
3. 次の設定を埋める

両方とも似たような設定になってるので、設定するjsファイルにuser idとappPasswordを入れてビルドすれば利用できます。

```js
{
  enabled: true,
  name: "bluesky",
  indexPath: path.join(__dirname, "services/bluesky/index.js"),
  options: {
    // 1. Visit https://bsky.app/settings/app-passwords
    // 2. Create new App Password
    // 3. Fill the following fields
    username: "username.bsky.social",
    appPassword: "password"
  }
}
```

設定がちゃんとできて、ビルドできれば、あとは普通に投稿できます。

## BlueskyのAPI

Bluesky APIで検索すると違うものがかかるので、AT Protocol APIで検索します。

JavaScriptの場合は、公式のAPIクライアントがあるので、これを利用するのが簡単です。

- [@atproto/api - npm](https://www.npmjs.com/package/@atproto/api)
- [bluesky-social/atproto: Social networking technology created by Bluesky](https://github.com/bluesky-social/atproto)

少しクセがあるポイントとして、単純にテキストを投稿しても自動的にURLがリンクになったり、OGPのカードが出てくれる分けじゃありません。
Rich textという仕組みがあり、リンクやmentionなどはこのRich textを使って表現されます。

テキストと位置情報をマッピングするJSONみたいな仕様になっていますが、`@atproto/api`を使えば勝手にやってくれるので、これを使うことが推奨されています。

```js
import { BskyAgent, RichText } from "@atproto/api";
const text = `投稿内容 https://example.com`;
const agent = new BskyAgent({
    service: "https://bsky.social"
});
await agent.login({
    identifier: this.serviceOptions.identifier,
    password: this.serviceOptions.appPassword
});
const rt = new RichText({ text });
await rt.detectFacets(agent); // automatically detects mentions and links
const postRecord = {
    $type: "app.bsky.feed.post",
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString()
};
return agent.post(postRecord);
```

Twitter Cardsみたいなことを投稿する側でやる必要があるそうです。

- [BlueskyのAT Protocolでリンクカード付きのpostを投稿する方法](https://zenn.dev/ryo_kawamata/articles/8d1966f6bb0a82)

この辺はフィッシング的な問題が色々あってなんか変わりそうな気がするので、あんまり深くはみていません。

## おわりに

Blueskyのアカウントを作ってみたので、とりあえず使ってるアプリを対応してみました。

- [azu (@azu.bsky.social) - Bluesky](https://bsky.app/profile/azu.bsky.social)

BlueskyのAPIは公式のクライアントがあって、JSの場合はTypeScriptでちゃんと型がついてるので、`facets`周りの癖を除けば素直です。
App Passwordsは単なるパスワード認証なので、使うときもシンプルで個人用に作る時は楽です。

Twitterを使うとき結構APIに依存してて、APIの挙動がおかしかったり、Usageが限界を突破してたりでよくわからない感じになっています。

![Twitter API Usage](https://efcl.info/wp-content/uploads/2023/06/18-1687068534.png)

- [Twitter API v2 Pulled comments Limit Exceeded - Twitter API / Twitter API v2 - Twitter Developers](https://twittercommunity.com/t/twitter-api-v2-pulled-comments-limit-exceeded/195765)
- [Deprecation of legacy access tiers in the Twitter API - Announcements - Twitter Developers](https://twittercommunity.com/t/deprecation-of-legacy-access-tiers-in-the-twitter-api/196162)
- [&quot;When authenticating requests to the Twitter API v2 endpoints, you must use keys and tokens from a Twitter developer App that is attached to a Project. You can create a project via the developer portal.&quot; - Twitter API / Twitter API v2 - Twitter Developers](https://twittercommunity.com/t/when-authenticating-requests-to-the-twitter-api-v2-endpoints-you-must-use-keys-and-tokens-from-a-twitter-developer-app-that-is-attached-to-a-project-you-can-create-a-project-via-the-developer-portal/189699/24)

Essentialが廃止になってプロジェクトに所属してないAPI Keyは動かなくなったり(これは仕様)、プロジェクトに所属してても動かないことがあったり色々よくわかない動きをしています。試すにも今はFreeだと一つのAppsしか登録できないので、試しにくかったりします。

バックアッププランとしてAPIが使いやすい[Bluesky](https://bsky.app/)を試してみたという感じでした。