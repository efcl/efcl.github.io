---
title: "Tweetsの全部検索できるmytweetsをBlueskyに対応した。自分用Twilog見たいなもの"
author: azu
layout: post
date : 2023-07-03T13:49
category: 雑記
tags:
    - Twitter
    - Bluesky
    - Next.js

---

以前TwitterのTwilogの代替えとして、[mytweets](https://github.com/azu/mytweets)というツールキットを作りました。

- [自分のTweetsをインクリメンタル検索できるサービス作成キット と Tweetsをまとめて削除するツールを書いた | Web Scratch](https://efcl.info/2021/06/18/mytweets-delete-tweets/)
- [azu/mytweets: Search all your tweets.](https://github.com/azu/mytweets)

今回、[mytweets](https://github.com/azu/mytweets)を[Bluesky](https://bsky.app/)にも対応させました。

合わせて、Vercelで動くようにしたりとか色々変更したので紹介します。

<video src="https://efcl.info/wp-content/uploads/2023/07/mytweets.mp4" controls  muted loop playsinline></video>

## 特徴

- Twitterの[Twitter archive data](https://help.twitter.com/managing-your-account/accessing-your-twitter-data)をインポートできます
  - 全部の履歴を取り込めます。
- [Twitter](https://twitter.com)と[Bluesky](https://bsky.app/)をサポートしています。
- アーカイブからの差分をAPIを使って取得して、常に全部のTweetsをまとめて検索できます。
  - このデータの更新はGitHub Actionsで自動化できます
- 専用のウェブフロントエンドがあります。
  - データに対して全文検索して、結果を表示できます
  - 全文検索には[S3 Select](https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html)を使っています
  - Next.js and Vercelであなたしか検索できないようにできます

## 使い方

全部書くと長いので、詳細はREADMEを読んでください。
ローカルとCIどちらでも基本的に動くようになっています(設定方法が違うだけです)。

- [azu/mytweets: Search all your tweets.](https://github.com/azu/mytweets)

おそらく基本的には、一度ローカルでTwitterのアーカイブを一度インポートして、
その後はGitHub Actionde定期的に更新していくという流れになると思います。

ここでは、GitHub Actionsでのデータの更新とVercelにウェブフロントエンドをデプロイする方法を紹介します。

### データを保存するS3のBucketとIAMユーザーを作成する

1. S3でmytweetsのデータを保存するBucketを作成します
2. 次のPolicyを持つユーザーを作成します。
3. このユーザーのアクセスキー(AWS の外部で実行されるアプリケーション)を作成し、アクセスキーとアクセスキーシークレットを控えておきます

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "mytweets",
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::{your-mytweets-bucket-name}/*"
        }
    ]
}
```

### Twitterのアーカイブをインポートする

[mytweets](https://github.com/azu/mytweets)はテンプレートリポジトリになっているので、これをForkします。

- 詳しくは[mytweets#import-from-twitter-archive](https://github.com/azu/mytweets#import-from-twitter-archive)を参照

1. [Twitter archive](https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive)をリクエスト
2. `twitter-*.zip`というzipをダウンロード
3. 中身の`tweeet*.js` を `twitter-archives/` にコピーする

```
twitter-archives/
├── tweet.js
├── tweet-part1.js
└── tweet-part2.js
```

4. S3の設定を `.env` に追加する

リポジトリのルートに`.env`を作成して、次のように設定します。

```
S3_AWS_ACCESS_KEY_ID="アクセスキー"
S3_AWS_SECRET_ACCESS_KEY="アクセスキーシークレット"
S3_BUCKET_NAME="作成したバケット名"
```

5. データを変換してS3にアップロードする

```shell
yarn install
yarn import-twitter-archives # Concvert twitter-archives
yarn upload-s3 # upload to S3
```

これでアーカイブデータがインポートできます。

### GitHub Actionsでのデータの更新

デフォルトで、`.github/workflows/update.yml`に定期的にデータを更新するGitHub Actionsが用意されています。

1. https://github.com/you!!!/mytweets/settings/secrets/actions にアクセスして、Secretsに設定します。
  - `S3_AWS_ACCESS_KEY_ID`: 作成したアクセスキー
  - `S3_AWS_SECRET_ACCESS_KEY`: 作成したアクセスキーのシークっと
  - `S3_BUCKET_NAME`: 作成したS3のバケット名
  - Twitterからデータを取得する場合は、Twitter Appを作成して次の値を設定します
    - `TWITTER_APP_KEY`
    - `TWITTER_APP_SECRET`
    - `TWITTER_ACCESS_TOKEN`
    - `TWITTER_ACCESS_SECRET`
  - Blueskyからデータを取得する場合は、Bluesky のApp Passwordを作成して次の値を設定します
    - `BLUESKY_IDENTIFIER`: `azu.bsky.social` のような値です。
    - `BLUESKY_APPPASSWORD`: App Passwordの値です。
2. これで設定完了です

デフォルトでは`.github/workflows/update.yml`は毎日1度APIを叩いてデータを更新します。
TwitterかBlueskyどちらから取得するかは、定義されている環境変数で自動的に切り替わります。(試してないですが、両方も動くはず?)

これで、GitHub Actionsで定期的にデータが更新されるようになります。

📝 Forkした直後はGitHub Actionsが無効になってる場合もあるので、https://github.com/{your!}/mytweets/actions に行って有効化する必要があるかもしれません。

### ウェブフロントエンドをVercelにデプロイする

Next.jsが動くところならどこでも問題ないですが、ここでは[Vercel](https://vercel.com/)にデプロイする方法を紹介します。

1. Vercelのアカウントを作成する
2. 新しいプロジェクトを作成する
3. "Import Git Repository"を選択する
4. Forkしたリポジトリを選択する
5. "Root Directory"に`web/`を設定する
6. "Environment Variables"に次の値を設定する
    - `S3_AWS_ACCESS_KEY_ID`
    - `S3_AWS_SECRET_ACCESS_KEY`
    - `S3_BUCKET_NAME`
    - `NEXT_PUBLIC_AUTH_KEY=<secure random string>`
    - ⚠️ ウェブサイトへのアクセスを制限したい場合は、`NEXT_PUBLIC_AUTH_KEY`にランダムな文字列を設定してください
    - ℹ️ ウェブサイトへのアクセスを制限しない場合は、`NEXT_PUBLIC_AUTH_KEY=public`と設定してください
7. デプロイする
8. `https://<yourmytweets>.vercel.app/?k=<NEXT_PUBLIC_AUTH_KEY>`のようにアクセスできます

`NEXT_PUBLIC_AUTH_KEY`という環境変数で、とても簡易なパスワード認証が設定できます。
(この辺は将来変更する可能性があります。)

このフロントエンドは、S3からデータを取ってきているので、一度デプロイすれば、S3のデータが更新されると自動的に更新されます。
あとは、検索するだけです。

<video src="https://efcl.info/wp-content/uploads/2023/07/mytweets.mp4" controls  muted loop playsinline></video>

検索もすごくシンプルに文字列一致を行なっているだけです。

数十万件ぐらいなら1-2秒以内で返ってくるので、個人的には十分な速度です。
まだWebStreamの対応をやってないので、この辺は改善したいです。

- [Support Stream · Issue #3 · azu/mytweets](https://github.com/azu/mytweets/issues/3)

## まとめ

[mytweets](https://github.com/azu/mytweets)をBlueskyに対応しました。
[投稿専用クライアントのpostemとpost-tweetをBlueskyに対応した | Web Scratch](https://efcl.info/2023/06/18/bluesky-post/)でも書きましたが、BlueskyのAPIは比較的シンプルです。(did周りは癖がある)

[mytweets](https://github.com/azu/mytweets)はデータの取得と変換を追加すれば、任意のサービスに対応できると思うので、興味がある方はぜひPRを送ってください。
データ量が多いので、保存するデータはものすごくシンプルにしています。

```ts
export type LineTweet = {
    id: string;
    text: string;
    timestamp: number;
};
```

- https://github.com/azu/mytweets/blob/f1f267476964eead0dd14024587eb22aed420e3a/scripts/types/output.ts#L2-L6

AWS SDK v3への移行が中途半端なので、S3 Selectの移行ができてないですが、わかる人PRをお願いします。