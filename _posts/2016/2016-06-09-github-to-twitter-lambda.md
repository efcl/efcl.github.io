---
title: "lambdaでGitHubのアクティビティをTwitterで読む用のBotを作った"
author: azu
layout: post
date : 2016-06-09T09:52
category: JavaScript
tags:
    - AWS
    - lambda
    - Twitter
    - GitHub
    - bot

---

タイトルどおりですが、[AWS Lambda](https://aws.amazon.com/jp/lambda/ "AWS Lambda")を使って、GitHubのWatchやアクティビティをTwitterに投げるBotを書きました。

- [azu/github-to-twitter-lambda: Lambda bot that fetch own GitHub notifications/events and post to Twitter.](https://github.com/azu/github-to-twitter-lambda "azu/github-to-twitter-lambda: Lambda bot that fetch own GitHub notifications/events and post to Twitter.")

こんな感じでTwitterにGitHubの[Notification](https://github.com/notifications)(Watch)、[アクティビティ](https://github.com/)が流れます。

![on Twitter](http://efcl.info/wp-content/uploads/2016/06/09-1465433692.png)

**注意**: メインで使ってるGitHubアカウントのPersonal Tokenを使うとそのアカウントのNotificationとタイムラインが流れるので、privateの情報とかもなげられてしまうので注意です。

ローカルだけで完結したい場合は以下のようなクライアントで動くタイプのものを利用したほうが良いです。

- [azu/github-reader: [node-webkit] GitHub client app - Viewer for Notifications and News Feed.](https://github.com/azu/github-reader "azu/github-reader: [node-webkit] GitHub client app - Viewer for Notifications and News Feed.")

GitHubのWatchやアクティビティは読むのが困難なデザインなので、基本読み飛ばしていいTwitterにまとめてしまうと楽な感じがしたので作りました。

自分が関係するような見逃したくない情報は、別の方法で見たほうがいいと思います。

- [Pull Requests](https://github.com/pulls)
- [Issues](https://github.com/issues)
- [Issues assigned](https://github.com/issues/assigned)
- [JasperというGitHub Issue Readerを作りました - maru source](http://blog.h13i32maru.jp/entry/2016/06/08/090000)
- [自分に関係するGitHub Issueを一覧できるアプリを書いた | Web Scratch](http://efcl.info/2015/07/30/github-issue-manager/)


導入はREADME通りにやっても動かない場合がありそうなので、そこは頑張って…(Pull Request下さい)


## 必要なもの

- [Apex](https://github.com/apex/apex "Apex")のインストール
- GitHub token(情報元)
- Twitter token(ポスト先)
- AWSのアカウント
- lambda
- dynamodb

## インストール

	 git clone https://github.com/azu/github-to-twitter-lambda.git
    cd github-to-twitter-lambda/functions/notifications
    npm install
    npm run init 
    # dynamodbのテーブルを作る

dynamodbをロックファイル代わりというか、前回実行した時間の記録だけに使っています。
lambdaとdynamodbは毎月無料枠があるので、基本的にこのBotでかかる費用は $0から$1以内になる感じです。

### Config

サンプルの設定があるのでコピーして編集します。

    cp project.example.json project.json
    

- `role` はApexのドキュメントに書かれてるようにlambdaの実行するRoleです
	- 後述するpolicyを指定しています。
- `environment`は環境変数的な感じですが、ここにToken類を入れています。
	- 実行時に環境変数でも行けるはず

```
    "role": "arn:aws:iam::xxxxxxxxxxxx",
    "defaultEnvironment": "dev",
    "environment": {
        "GITHUB_TOKEN": "GitHub Person token need repo/notification/user",
        "TWITTER_CONSUMER_KEY": "app key",
        "TWITTER_CONSUMER_SECRET": "app secret",
        "TWITTER_ACCESS_TOKEN_KEY": "token key",
        "TWITTER_ACCESS_TOKEN_SECRET": "token  secret"
    }
```

### Lambda role policy

Lambda(`role": "arn:aws:iam::xxxxxxxxxxxx"`)のroleに指定するpolicyは以下のような感じになってます。
`"lambda:*"`と`"cloudwatch:*"`があればとりあえず動く気がします。

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "dynamodb:*",
                "lambda:*",
                "logs:*",
                "cloudwatch:*",
                "autoscaling:Describe*"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

### Deploy

[Apex](https://github.com/apex/apex "Apex")を使ってデプロイします。
`aws configure` とかで awsのAPIキーとかを設定しておかないと当然デプロイできません。

    apex deploy notifications

詳細は[Apex](https://github.com/apex/apex "Apex")のドキュメントや以下を見て下さい。

- [ApexでAWS Lambdaファンクションを管理する ｜ Developers.IO](http://dev.classmethod.jp/cloud/aws/how-to-manage-aws-lambda-functions-with-apex/ "ApexでAWS Lambdaファンクションを管理する ｜ Developers.IO")

### Test

ローカルでdry-runしたい場合は test.js というのがあるのでそれを実行するといけます(実際にpostはしない)

	cd functions/notifications
	npm test

[Apex](https://github.com/apex/apex "Apex")を使って、手元からlambdaを叩いてテストもできます。

	apex invoke notifications

### Cron

lambdaはデフォルトだと１回実行して終わりなので繰り返し実行することでBotとして動かします
(lambdaの実行回数による料金は基本無料枠で納まります)

[スケジュールされたイベントでの AWS Lambda の使用 - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-scheduled-events.html "スケジュールされたイベントでの AWS Lambda の使用 - AWS Lambda")を使うことで、Cron的に繰り返し実行を設定できます。

自分は2分に一度とかに設定しています。

![image](https://monosnap.com/file/lhJghW8bwKJmTZ3iDugi4B7eklRn5Z.png)

## まとめ

- GitHubのWatchは破綻してる
- GitHub -> Twitter
- TwitterでGitHubを読めるようにした
- Slackは未読に厳しい
- 未読を読み飛ばしやすいのはやっぱりTwitterかRSSリーダ
- RSSリーダもコンテキストが異なる物量には弱い
	- RSSリーダはリリースノートだけに絞ってる
	- [GitHubでライブラリのリリースを見ていくためのツールや方法 | Web Scratch](http://efcl.info/2014/07/30/find-github-release/ "GitHubでライブラリのリリースを見ていくためのツールや方法 | Web Scratch")
- [TweetIrcGateway](http://www.misuzilla.org/Distribution/TweetIrcGateway/ "TweetIrcGateway")っぽい
- それぞれのコンテキストにあった読みやすさがあるので、読みやすい場所に読みたいものを置く
- そういう土管ツールが簡単につくれるともっと良さそう