---
title: "自分のTweetsをインクリメンタル検索できるサービス作成キット と Tweetsをまとめて削除するツールを書いた"
author: azu
layout: post
date : 2021-06-18T19:16
category: JavaScript
tags:
    - Twitter
    - Next.js
    - S3

---

自分のTweetsをインクリメンタルに全文検索できる[mytweets](https://github.com/azu/mytweets)を作りました。
また、自分のTweetsを[textlint](https://github.com/textlint/textlint)や[単語感情極性対応表](http://www.lr.pi.titech.ac.jp/~takamura/pndic_ja.html)や辞書ベースでフィルタリングしてまとめて削除する[delete-tweets](https://github.com/azu/delete-tweets)を作りました。

どちらもTwitterのアーカイブを使って今までのすべてのTweetsを対象にしています。
そのため、どちらも最初に次のドキュメントに従って、Twitterのデータアーカイブをダウンロードしておく必要があります。(申請から1日ぐらいかかります)

- [全ツイート履歴とツイートをダウンロードする方法 | Twitterヘルプ](https://help.twitter.com/ja/managing-your-account/how-to-download-your-twitter-archive)

## [mytweets](https://github.com/azu/mytweets)

[mytweets](https://github.com/azu/mytweets)は、[Twilog](http://twilog.org/)や[ツイセーブ](https://twisave.com/)のように自分のTweetsの履歴を全文検索できるサイトを作るツールキットです。

[Twitterのデータアーカイブ](https://help.twitter.com/ja/managing-your-account/how-to-download-your-twitter-archive)をインポートするので過去全ての履歴に対応していて、
また新しいTweetsはTwitter V2 APIを使って取得する仕組みも持っています。(つまり全部のTweetsが検索できるということです)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">自分のTweetsだけをインクリメンタルに検索できるサイトを作るmytweetsというツールキットを公開しました。<a href="https://t.co/1vJy6KcCcL">https://t.co/1vJy6KcCcL</a><br><br>Twitterのアーカイブをインポートできるので全ての履歴を取り込めて、かつTwitter APIで差分も更新できます。<br>自分用Twilogを$0.Xで作るキットみたいなものです。 <a href="https://t.co/VQDVQHpJBV">pic.twitter.com/VQDVQHpJBV</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1405553626836135938?ref_src=twsrc%5Etfw">June 17, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

仕組みとしてはS3に全てのツイートをまとめた`tweet.json`を保存し、
そのJSONファイルを[S3 Select](https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html)を使って全文検索します。

検索するサイト自体は、[Next.js](https://nextjs.org/)を[serverless-next.js](https://github.com/serverless-nextjs/serverless-next.js)を使って動かします。
[serverless-next.js](https://github.com/serverless-nextjs/serverless-next.js)は、Cloudfront + S3 + Lambda@Edgeを使ってNext.jsを動かす[Serverless Framework](https://www.serverless.com/framework/docs/providers/aws/guide/installation/)のプラグインです。

![大まかなmytweetsのアーキテクチャ](https://efcl.info/wp-content/uploads/2021/06/18-1624021862.png)

そのため、[mytweets](https://github.com/azu/mytweets)を動かすには次のものが必要です。

- `tweet.json`を保存するS3のBucket
- S3のBucketを読み書きするAWSのトークン
- TwitterからTweetsを読み込むのTwitterクライアント情報

これらの情報を`.env`ファイルに渡すことで、`yarn fetch-tweets`や`yarn upload-tweets`などができるようになっています。

```
S3_AWS_ACCESS_KEY_ID="x"
S3_AWS_SECRET_ACCESS_KEY="x"
S3_BUCKET_NAME="x"
TWITTER_APP_KEY="x"
TWITTER_APP_SECRET="x"
TWITTER_ACCESS_TOKEN="x"
TWITTER_ACCESS_SECRET="x"
```

詳しい使い方はREADMEを読んでください。

- [azu/mytweets: Search your all tweets.](https://github.com/azu/mytweets)

サイト自体はCloudfrontで公開する形になっています。(Next.jsが動けば何でもいいのでVercelなどでも問題はないです。S3に近い場所が適切)
最近追加された[CloudFront Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html)を使えばベーシック認証などもかけられるので、プライベートな検索ページも作れます。

- <https://github.com/azu/mytweets#private-page>

コストの方は、S3 + S3 Selectが一番かかると思いますが、月$1以下になると思います。
`tweets.json` のサイズ次第ですが、自分の場合30万ツイートで20MB(gzip後)なので、そこまで大きくはならない感じもします。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">1週間ぐらい開発で結構S3上げ直したり、S3 Selectを叩きまくったり、Cloudfornt Functionsとかも使ったりしてるのだけど、コストはこんな感じなので、多分 $1/month いかないぐらいで動く気はします。 <a href="https://t.co/BZ2O18r0Yl">pic.twitter.com/BZ2O18r0Yl</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1405555408173895682?ref_src=twsrc%5Etfw">June 17, 2021</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Tweetsの差分取得は、`yarn fetch-tweets`を定期的に叩ける場所なら何でも良い感じになっています。
READMEではGitHub Actionsを使ったレシピを公開しています。

- [Schedule Updating](https://github.com/azu/mytweets#schedule-updating)

[mytweets](https://github.com/azu/mytweets)が検索する元ソースの`tweets.json`はただの行ごとのJSON(JSONLD)なので、[jq](https://stedolan.github.io/jq/)で扱えたりいらないものは検索対象から外したりとか色々工夫できる気がします。

詳細はREADMEを参照してください。

- [azu/mytweets: Search your all tweets.](https://github.com/azu/mytweets#schedule-updating)

## [delete-tweets](https://github.com/azu/delete-tweets)

[mytweets](https://github.com/azu/mytweets)を作っていたら同じような仕組みで、過去全てのTweetsを対象にしたTweetの削除ツールが書けることに気づいたので[delete-tweets](https://github.com/azu/delete-tweets)を作りました。

[mytweets](https://github.com/azu/mytweets)で検索するときに、べつに出てこなくてもいいTweetsも多いなと思いました。
ただ数が多いので、ある程度自動的に削除する候補を抽出できる仕組みを[textlint](https://github.com/textlint/textlint)や感情極性値や辞書ベースで実装したのが[delete-tweets](https://github.com/azu/delete-tweets)です。
（⚠ [mytweets](https://github.com/azu/mytweets)は、一度Twitterのデータアーカイブをインポートした部分は、その後元のTweetsを削除しても取り込んだ部分は消えないので、再インポートするなどが必要です。逆に消したTweetsも検索したいなら何もしなくても良いです)

[delete-tweets](https://github.com/azu/delete-tweets)も[Twitterのデータアーカイブ](https://help.twitter.com/ja/managing-your-account/how-to-download-your-twitter-archive)に対応しているため、全てのTweetsが対象となっています。

[delete-tweets](https://github.com/azu/delete-tweets)は次のステップで削除するTweetsを選択出来ます。

1. Import Archive - TwitterのアーカイブからTweetsデータの作成
2. Detect Tweets - Tweetsデータをフィルタリングして削除候補のTweetsデータを作成
3. Delete Tweets - 削除対象のTweetsを削除

[delete-tweets](https://github.com/azu/delete-tweets)で削除したTweetのIDは`data/deleted-twwets.txt`に記録されます。
次からすでに削除済みのTweetは無視されるので、2 ~ 3 を繰り返し実行できるようにデザインしています。

2のDetect Tweetsでは次の仕組みで削除候補を抽出できるようになっています。

- 抽出する範囲を `--fromDate` と `--toDate` で指定
- textlintでの[放送禁止用語](https://github.com/hata6502/textlint-rule-no-hoso-kinshi-yogo)、[不適切表現](https://github.com/textlint-ja/textlint-rule-ja-no-inappropriate-words)のチェック
- ポジティブ、ネガティブベースの推定
  - [単語感情極性対応表](http://www.lr.pi.titech.ac.jp/~takamura/pndic_ja.html)は各自でダウンロードする形式にしています
- ユーザー定義の許可リスト、不許可リスト

⚠ 基本的に過剰に抽出するようにデザインされているので、細かいところは辞書などで調整してください。たとえば "寝る" とか 超短文なTweetsもデフォルトでは結構かかるようになってるので、その辺は調整できる人が使って下さい。
また、Tweetsの削除をすると復元はできないので、自己責任で削除してください。

[delete-tweets](https://github.com/azu/delete-tweets)でも[mytweets](https://github.com/azu/mytweets)と同じく全てのTweetsを行ごとにJSONで区切ったものを扱います。
そのため、抽出後のJSONに対して[jq](https://stedolan.github.io/jq/)を使って何がかかったのか確認したり、favorites数でソートしてみたり色々できます。

- https://github.com/azu/delete-tweets#debug

[delete-tweets](https://github.com/azu/delete-tweets)はwrite権限を持ったTwitter V2 APIのクライアント情報が必要になるので、詳しい使い方はRAEDMEを参照してください。

- [azu/delete-tweets: Twitterのアーカイブから削除候補のTweetsを自動的に抽出する日本語の補助ツールと削除するツール。](https://github.com/azu/delete-tweets)

⚠ 削除の仕組み上、TwitterのAPIを大量に叩きます。0.5sごとにAPIを叩いたり、エラーがでたら自動で止まるようにしたり、エラーが起きた箇所から再開できるようにしてはいますが、削除は自己責任でお願いします。

## まとめ

Twitterの自分のログをPC、モバイルどっちでもインクリメンタルに検索できるものが欲しくなったので[mytweets](https://github.com/azu/mytweets)を作りました。
[S3 Select](https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html)は、上から順番にスキャンするという感じの予想通りな動きをしてくれて、30万ツイート(30万行)ぐらいなら1~2秒で完了するので、結構便利でした。

LambdaだとStreamでレスポンスを上手く返せなかったので、[Fetch with Streamで取得しつつ検索結果を表示](https://twitter.com/azu_re/status/1403380808845455362)というのは諦めましたが、コスパは良い感じのものができてよかった気がします。

[mytweets](https://github.com/azu/mytweets)の仕組みを応用して、Tweetsの削除をする[delete-tweets](https://github.com/azu/delete-tweets)も作りました。
ネガティブポジティブの判定には[単語感情極性対応表](http://www.lr.pi.titech.ac.jp/~takamura/pndic_ja.html)と[negaposi-analyzer-ja](https://github.com/azu/negaposi-analyzer-ja)でやっていますが、ネガティブな単語のほうが辞書として多いので、普通に書くと大体0未満のスコア(ネガティブより)になると思います。
「寝る」とか単語一つみたいなものとかもそういう事情でかかりやすいですが、こういうTweetsは検索結果にでてきてもあまり意味はないので、デフォルトでは検出されるようになっています。

[delete-tweets](https://github.com/azu/delete-tweets)は機械的にやるだけの仕組みなので、ちゃんとやりたい人は外部サービスを使うのがよさそうです。