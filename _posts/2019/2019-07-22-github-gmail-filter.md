---
title: "GitHubのメール通知とGmailのフィルター設定"
author: azu
layout: post
date : 2019-07-22T09:11
category: GitHub
tags:
    - GitHub
    - Gmail

---

この記事はGitHubからくる通知メールとそれをGmailでどう管理(フィルター)するかの設定例です。

GitHubの[Watching](https://github.com/watching)は2000を超えているので、GitHubの[Notifications](https://github.com/notifications)(Web)は機能していません。

![Notificationの様子](https://efcl.info/wp-content/uploads/2019/07/22-1563755984.png)

> [Notifications](https://github.com/notifications)(Web)はずっとこの状態

そのため、反応しないといけない通知はメールで受け取って、Gmailのフィルターで余計なものは自動的にアーカイブする運用で通知を管理していました。

## 実現したい通知管理

- 自分 と 自分のOrganization のメールについては 基本的に通知を受け取る
- 自分が Watch しているだけのリポジトリについては mention などアクションが求められる行動以外は通知を受け取らない
    - subscribed は受け取るとIssueが作成された(自分以外によって)場合も通知が来るので、受け取りたくない(あふれる)
    - [About email notifications - GitHub Help](https://help.github.com/en/articles/about-email-notifications)で通知の種類を分類できる
- 新しくGitHub Organizationを作る際にGmailのフィルターを変更したくない

## Before

以前は次のような運用をしていました

- GitHub: Default notification emailとOrganizationの通知先を全て同じ`自分のGmailアカウント@gmail.com`に設定
- Gmail: 次のようにフィルタ

```
条件: from:(notifications@github.com OR subscribed@noreply.github.com) -{cc:{assign,author,comment,mention,state_change,team_mention}@noreply.github.com azu efcl jser power-assert-js textlint almin ecmascript-daily proofdict js-primer JXA-userland}
処理: 既読にする, ラベル「Notification」を付ける
```

これは次のような挙動を意図していて、一応そのとおり動いていました。

- 自分のOrganizationについては `assign,author,comment,mention,state_change,team_mention` に関する通知を受け取る
    - <https://help.github.com/en/articles/about-email-notifications> を参照
- 自分がWatchしている他人のリポジトリ(指定したOrganization)は自動で既読
    - `azu efcl jser power-assert-js textlint almin ecmascript-daily proofdict js-primer JXA-userland` 以外 = 他人のリポジトリ

この運用の問題は、新しくGitHubでOrganizationを作成すると、Gmailのフィルターを更新する必要がある点です。
Gmailのフィルターはあんまり触りたくないのと、GitHub Organizationを作ってGmailで設定を更新だと遠すぎて設定を忘れることが多かったです。

GitHub OrganizationのOrganizationは結構気軽に作るので、この更新が数ヶ月に1度発生だけでも結構な手間でした。

## After

次のような運用に変更しました

- GitHub: 
    - Default notification emailには `自分のGmailアカウント@gmail.com` を設定する
    - 自分のOrganization(Custom routing)には `自分のGmailアカウント+github@gmail.com` を設定する
    - [Notification settings](https://github.com/settings/notifications)から設定できる。
- Gmail: 次のようなフィルターを設定する

```
条件: from:notifications@github.com -cc:{assign,author,comment,mention,state_change,team_mention,review_requested}@noreply.github.com -deliveredto:自分のGmailアカウント+github@gmail.com -list:(*.自分のGitHubアカウント名.github.com)
処理: 既読にする, ラベル「GitHub」を付ける
```

- 例: 
    - `自分のGitHubアカウント名.github.com`
        - `-list:(*.example.github.com)`
    - `-deliveredto:自分のGmailアカウント+github@gmail.com`
        - `-deliveredto:example+github@gmail.com`

これは次のような挙動を意図しています。

- GitHubの通知メール(`from:notifications@github.com`)から
    - mention などアクションが求められる行動を除外(`-cc:{assign,author,comment,mention,state_change,team_mention,review_requested}@noreply.github.com -deliveredto:自分のGmailアカウント+github@gmail.com`)
        - GitHubからのCCは`to:`じゃなくて `deliveredto:` じゃないと判定できなかった
    - 自分のアカウントに関する通知は除外(`-list:(*.自分のGitHubアカウント名.github.com)`)

これによって、`自分のGmailアカウント@gmail.com` に来るGitHubの通知メールは自分に関係するもの(assign,やauthorなど)以外は全てフィルターされます。
(つまりWatchしてるだけのものは全て無視される)

新しくOrganizationを作ったときは次のようにGitHubで通知するかを管理できるようになりました。

- [Notification settings](https://github.com/settings/notifications)のCustom routingで、通知を受け取りOrganizationの通知先メールアドレスを  `自分のGmailアカウント+github@gmail.com` を設定する

これでGitHub Organizationを増やす度にGmailフィルターを更新する必要がなくなりました。

## 参考

- [Gmail and GitHub - Filters](https://gist.github.com/ldez/bd6e6401ad0855e6c0de6da19a8c50b5)
- [About email notifications - GitHub Help](https://help.github.com/en/articles/about-email-notifications)
- [Gmail で使用できる検索演算子 - Gmail ヘルプ](https://support.google.com/mail/answer/7190)
	- `deliveredto:<mail>` で到達先アドレス(Custom routingで設定したアドレス)を指定できる
