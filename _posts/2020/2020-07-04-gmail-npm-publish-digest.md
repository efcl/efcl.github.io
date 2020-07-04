---
title: "npmのSuccessfully publishedのメール通知をまとめるGoogle Apps Scriptを書いた"
author: azu
layout: post
date : 2020-07-04T23:43
category: JavaScript
tags:
    - GAS
    - npm

---

npmにパッケージをpublishすると、次のような"Successfully published"の通知メールが来ます。

```
Subject: Successfully published honkit@3.4.0

Hi azu!

A new version of the package honkit (3.4.0) was published at 2020-06-27T08:30:56.245Z from
xxx.xxx.xx.xxx. The shasum of this package was XXXXXXXXXX.

If you have questions or security concerns, you can reply to this message or
email support@npmjs.com.

npm loves you.
```

一つのパッケージなら問題ないのですが、パッケージをまとめてpublishするようなmonorepoを扱っているとかなり通知がうるさくなります。

![Mail Screenshot](https://efcl.info/wp-content/uploads/2020/07/04-1593873892.png)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">npmのメール通知 monorepo的な一括publishをまとめて欲しい <a href="https://t.co/hCHomAV0oV">pic.twitter.com/hCHomAV0oV</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1080684650039672832?ref_src=twsrc%5Etfw">January 3, 2019</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

そのため、この通知メールをまとめたメールを作る[gmail-npm-publish-digest](https://github.com/azu/gmail-npm-publish-digest)という[Google Apps Script](https://developers.google.com/gsuite/aspects/appsscript?hl=ja)(GAS)を書きました。

## [gmail-npm-publish-digest](https://github.com/azu/gmail-npm-publish-digest)

[gmail-npm-publish-digest](https://github.com/azu/gmail-npm-publish-digest)は、指定時間以内に自分のGmailにきた"Successfully published"メールをまとめたダイジェストメールを作成して、自分自身に送信します。

![gmail-npm-publish-digestのメール](https://efcl.info/wp-content/uploads/2020/07/04-1593874311.png)

npmからくる`from:notifications@npmjs.com Successfully published`なメールは自動で既読するフィルターを作成しておけば、
[gmail-npm-publish-digest](https://github.com/azu/gmail-npm-publish-digest)のダイジェストだけを受け取れます。

## 使い方

[gmail-npm-publish-digest](https://github.com/azu/gmail-npm-publish-digest)は[clasp](https://github.com/google/clasp)を使って書いています。

claspを使ったGASの配布方法がいまいちわかってないですが、次のように自分でGASをデプロイすれば使えると思います。

[clasp](https://github.com/google/clasp)をインストールして、ログイン。

```
npm install --global clasp
clasp login
```

Google App Scriptをデプロイして、エディタ画面を開く

```
git clone https://github.com/azu/gmail-npm-publish-digest
cd gmail-npm-publish-digest
# create .clasp.json
clasp create --type standalone --title "gmail-npm-publish-digest"
# Install Dependencies
yarn install
# Update script
clasp push
# Open script editor
clasp open
```

デプロイすると2つの関数が利用できます。(実際には3つありますが)

### Send Digest mail

実際にGmailから通知メールを検索して、ダイジェストメールを送信します。

1. open script editor: `clasp open`
2. Run `main` function on script editor

### Set Trigger

デフォルトでは、自動的にダイジェストメールは送ってくれないので、Triggerを設定します。
`createTimeTrigger` 関数を実行するとトリガーを設定できます。
デフォルトは6時間ごとになっています。

1. open script editor: `clasp open`
2. Run `createTimeTrigger` function on script editor

細かい設定とかはリポジトリ見てください。
設定の外部ファイル化とかはよく割ってないので、Pull Requestをまっています。

- [azu/gmail-npm-publish-digest: Google App Scripts create digest mail of npm's "Successfully published" notification from your Gmail read mails.](https://github.com/azu/gmail-npm-publish-digest)