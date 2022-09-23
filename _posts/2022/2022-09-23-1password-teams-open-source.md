---
title: "1Password for Open Source Projectsの申請をした"
author: azu
layout: post
date : 2022-09-23T21:18
category: 雑記
tags:
    - OpenSource

---

[1Password](https://1password.com/)は、オープンソースプロジェクトの開発者が無料で1Passwordを利用できる[1Password for Open Source Projects](https://github.com/1Password/1password-teams-open-source)というものをやっています。

[1Password for Open Source Projects](https://github.com/1Password/1password-teams-open-source)で申請が通ると、Teamプラン相当が無料で利用できるようになります。
1PasswordのAccount(組織/チームのこと)に所属してるMemberは、それぞれ個人のパスワード管理機能とAccount(チーム)で共有するパスワード管理機能が利用できるようになります。

- [1Password/1password-teams-open-source: Get a free 1Password Teams membership for your open source project](https://github.com/1Password/1password-teams-open-source#membership-details)
- [チームのための手間いらずで安全なパスワード管理 | 1Password](https://1password.com/jp/teams/)

申請できるプロジェクトの要件は、オープンソースに関わるもので非営利なら、柔軟に対応してくれるそうです。
オープンソースソフトウェアのプロジェクトだったり、コミュニティやイベントの主催してる場合でも良いらしいです。

- [Requirements](https://github.com/1Password/1password-teams-open-source#requirements)

また、そのプロジェクトで実際に1Passwordを使って共有するものがなくても、プロジェクトを安全に保つのに役立つなら申請してもOKとのことです。

- [OSS maintainer that uses 1Password, but not needed for project.... · Issue #555 · 1Password/1password-teams-open-source](https://github.com/1Password/1password-teams-open-source/issues/555)

自分は[色々なオープンソースのメンテナンス](https://efcl.info/2022/06/27/maintenance-open-source/)をしていますが、[textlint](https://textlint.github.io/)が結構大きめなプロジェクトなので、[textlint](https://textlint.github.io/)で申請して承認されました。

- <https://github.com/1Password/1password-teams-open-source#textlint>

## 1Password for Open Source Projectsの申請方法

READMEの[How to apply](https://github.com/1Password/1password-teams-open-source#how-to-apply)の手順通りにやれば問題ないと思います。

1. <https://start.1password.com/sign-up/team?t=B> からTeamプランのアカウントを作成する
  - アカウントの設定をしてアプリをダウンロードしたり、2要素認証などをセットアップする
  - この段階では試用期間なので14日以内に、申請する
  - この段階で、他の人を招待しなくてもOKだった
2. <https://github.com/1Password/1password-teams-open-source> をForkして、申請するプロジェクトの情報をREADMEに足してPRを出す
  - <https://github.com/1Password/1password-teams-open-source/pulls?q=is%3Apr+is%3Aclosed> を参考にすれば良さそう
3. マージされるのを待つ

マージされると、申請した1Passwordのアカウント(チーム)がTeamプランに正式になります。
そうしたら、プロジェクトで関連する他の人を招待すればOKだと思います。

[textlint](https://github.com/textlint)のcollaboratorsの方は、次のDiscussionsに詳細を書いてあるので、1Passwordを利用したい場合はコメントしてください。

- <https://github.com/orgs/textlint/teams/collaborator/discussions/1>
  - textlintのcollaboratorsとなっている人なら見えるページ

## おわりに

[1Password for Open Source Projects](https://github.com/1Password/1password-teams-open-source)という1Passwordをオープンソース向けに無料できるプランについて紹介しました。
申請してから結構すぐ承認されたのでよかったです。

[textlint](https://github.com/textlint)では、npmにpublishする向けのマシンアカウントとかがあるので、その管理に利用しようかなと思っています。
