---
title: "npmで使われてないアカウントを解放してもらった"
author: azu
layout: post
date : 2018-05-07T10:31
category: 雑記
tags:
    - npm
    - mail

---

JavaScriptのパッケージ管理ツール/サービスである[npm](https://www.npmjs.com/)で使われてないアカウントを解放してもらって、Scoped moduleとして使えるようにしてもらいました。

以前[GitHubで使われてないアカウントを解放してもらった | Web Scratch](https://efcl.info/2014/07/18/take-github-account/)という記事を書いていますが、これのnpm版です。

GitHubには[Name Squatting Policy](https://help.github.com/articles/name-squatting-policy/)という名前だけ取ったようなアカウントは依頼があれば解放するポリシーがあります。

npmには[Dispute Resolution](https://www.npmjs.com/policies/disputes)というルールがあり、その中で名前だけ取ったようなUser namesを解放するように申し立てする手順が書かれています。

- [Dormant Usernames · Issue #64 · npm/policies](https://github.com/npm/policies/issues/64)

----


### User names

To dispute a user name, follow these steps:

1. Visit the user page at <https://www.npmjs.com/~foo>. Their email address is listed on this page.
2. Send a message to that address and CC <support@npmjs.com>. Politely and respectfully explain your request and your desired outcome.
3. After 4 weeks, if the owner has not responded, support will address your request. The ultimate outcome is at their discretion and judgement.

----


## きっかけ

`jser` というnpmアカウント/Organizationを[JSer.info](https://github.com/jser)で使うモジュールのScoped moduleのために使いたかったのですが、既に`jser`というアカウントが存在していました。
しかし、そのアカウントは2011年ぐらいから使われてなさそうで、また[arpackage](https://www.npmjs.com/package/arpackage)という中身が空のパッケージを公開しているだけでした。
（恐らくアカウントを作ってそのまま放置されたSquattingなアカウントだったのだと思います）

以前もGitHubで`jser`というGitHubアカウントをName Squatting Policyに元に解放してもらったことがあったので、npmでも同じような手続きができるかを調べてみたら[Dispute Resolution](https://www.npmjs.com/policies/disputes)というルールがあるのを知り試してみることにしました。

- <https://github.com/jser>
 - 開放してもらったGitHubアカウント
 - 今は[JSer.info](https://github.com/jser)のサイトやパッケージのリポジトリに利用


## Dispute Resolutionの手続き

[Dispute Resolution](https://www.npmjs.com/policies/disputes)にかいてあるステップどおりに進めました。


`support@npmjs.com`へ次のような内容で `jser` という使われてないアカウントを解放してもらうことができるかというメールをだしました。

```
Hello, My name is azu.
My npm account is https://www.npmjs.com/~azu

I want to get "jser" for organizations account.
I'd like to use the account for https://github.com/jser/
Currently, I've used `jser-*` prefix for each packages.
I've tried to move these pacakges to @jser scoped name, but @jser user name[1] is already token.

https://www.npmjs.com/~jser publish a single package[2], but this pacakge is no content.
Also, https://www.npmjs.com/~jser is inactive account.

I want to request that remove the @jser account or transfer the ownership.

Note: I've seen "Dispute Resolution" guideline[3] and I sent this mail.

Thanks.

[1]: https://www.npmjs.com/~jser
[2]: https://www.npmjs.com/package/arpackage
[3]: https://www.npmjs.com/policies/disputes
```

サポートの方から返信があり、手続きに則り元々の`jser`アカウントの持ち主にCCでアカウントのOwnershipについての連絡が行われていました。


```
Hello Azu and @jser,

Azu: Thanks for starting this conversation and CC'ing npm support. I'll keep an eye on this discussion and if there isn't any progress in a few weeks, I'll respond directly.

@jser: We would really appreciate if you would be willing to discuss this with Azu regarding taking ownership of the jser user account name.

If either of you have questions about this process, please let me know, I'll be here to help! Thank you.
```

そしてしらばらく返事がなかったのでDispute Resolutionに則り、最初の連絡から4週間(April 30までに)返事がなければ、アカウントを開放するという通知がされていました。

```
Hello,

@jser: We're guessing you're busy, with hopefully all good things, to focus on such requests. Since we've not heard back from you, we'd like to proceed with Azu's request to use the jser scope name. Please let us know by April 30, 2018 if this is a concern.

Azu: Please let me know if you've heard back from @jser. If we've gotten no response by April 30, 2018, I'll transfer ownership of the @post scope to you. We appreciate your patience.

Thanks so much.
```

そのまま、元のjserアカウント持ち主からの返事はなかったため、npmのjserアカウントを開放してもらえることになりました。

## アカウントの解放からOrganizationの作成

### パスワードリセット

アカウントが解放手続きが取られると、
サポートの方が`jser`アカウントをメールアドレスを自分のメールアドレスに設定して、パスワードをリセットしてくれます。

そのため、次の手順でアカウントを取得できます。

1. パスワードリセットのメールが送られてくる
2. リセットして新しいパスワードを設定してログイン

![password reset](https://efcl.info/wp-content/uploads/2018/05/07-1525658015.png)

これを行うとアカウントのOwnershipが更新され、`jser`アカウントを取得完了です。

### UserアカウントをOrganizationへ変換

元々`@jser/stat`のようにScoped moduleとして利用するのが目的です。

- [dataset/packages/@jser/stat at master · jser/dataset](https://github.com/jser/dataset/tree/master/packages/%40jser/stat)

そのためnpmのアカウントをOrganizationに変換する必要があります。
変換の手順は[Migrating a User Account · npm Orgs Documentation](https://www.npmjs.com/docs/orgs/migrating-a-user-account.html)にかかれています。

1. Create a New Organizationを開く
  - https://www.npmjs.com/org/create
2. Convert @jser into an orgから変換する
  - 適当なユーザー名を作る必要があるので jser-userで作成
  
![create org](https://efcl.info/wp-content/uploads/2018/05/07-1525658182.png)

これで<https://www.npmjs.com/org/jser>の作成が完了です。

## まとめ

npmは[Dispute Resolution](https://www.npmjs.com/policies/disputes)というルールがあり、一定の条件を満たせば使われてないアカウントを解放してもらえる。
手続きには最低でも4週間の返事待ちの期間があるので1ヶ月ほどかかる。

今回取得した[@jser](https://www.npmjs.com/org/jser)というnpmアカウントは、[JSer.info](https://github.com/jser)のデータセットを取得するAPIクライアントや統計処理ライブラリなどパッケージに利用しています。

[@jser/data-fetcher](https://github.com/jser/dataset/tree/master/packages/@jser/data-fetcher)や[@jser/stat](https://github.com/jser/dataset/tree/master/packages/@jser/stat)、[@jser/post-parser](https://github.com/jser/dataset/tree/master/packages/%40jser/post-parser)などに利用しています。

- [jser/dataset: JSer.infoのデータセットや処理ライブラリ](https://github.com/jser/dataset)