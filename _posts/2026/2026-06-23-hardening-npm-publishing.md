---
title: "「OSS開発者は今何をするべきか？ソフトウェアサプライチェーン侵害対策を考える」で「Hardening npm Publishing」という発表をしました"
author: azu
layout: post
date: 2026-06-23T23:00+09:00
category: イベント
tags:
  - イベント
  - Security
  - npm
  - GitHub Actions
  - OIDC
render_with_liquid: false
---

2026年6月23日に、GMO Flatt Security主催の「[OSS開発者は今何をするべきか？ソフトウェアサプライチェーン侵害対策を考える](https://flatt.connpass.com/event/395359/)」で「[Hardening npm Publishing](https://azu.github.io/slide/2026/hardening-npm-publishing/slide.html)」というタイトルで、npmパッケージの公開フローをどう守るかについて話しました。

[![Hardening npm Publishingのスライド表紙](/wp-content/uploads/2026/06/hardening-npm-publishing-cover.png)](https://azu.github.io/slide/2026/hardening-npm-publishing/slide.html)

- スライド: [Hardening npm Publishing](https://azu.github.io/slide/2026/hardening-npm-publishing/slide.html)

ローカルのトークン管理やnpm Trusted Publishingについては、以前の記事で書きました。
この記事ではそれらを前提に、GitHub Environmentsとnpm staged publishingをどこに入れるかの話をスライドベースでかいています。

サプライチェーン攻撃をすべての侵害を防ぐのは難しいです。
それでも、ローカル、CI、GitHub Actions、npm registryのそれぞれに止める場所を作ると、攻撃者が1つの権限を取っただけでは公開まで進みにくくできます。

## 公開フローをどこで止めるか

npmパッケージの公開フローでは、開発者のローカル環境、GitHubリポジトリ、GitHub Actions、npm registry、利用者のインストール環境がつながっています。攻撃者の入口も1つではなく、ローカルのnpmトークン、GitHub Actionsのworkflow、CI上の認証情報、install時に実行される悪性コードなど、いくつかの場所に分かれます。

そのため、対策も1つでは足りません。自分は次のように、公開フローを段階ごとに分けて考えています。

1. ローカルに強いトークンを置かない
2. CIからnpmへ公開するときは長期npmトークンを使わない
3. GitHub Actionsからnpmへ権限が広がる手前にGitHub EnvironmentsのDeployment protection rulesを置く
4. npm staged publishingでregistry公開前にもう一度止める

重要なのは、それぞれの対策を単体で見るのではなく、公開までの経路として見ることです。ローカルのcredentialを減らしても、workflowを書き換えられるならCIからpublishできます。Trusted Publishingでnpmトークンを消しても、そのworkflowへ進む条件が緩いなら、別の形で公開権限に近づけます。

## ローカルに強いトークンを置かない

最初にやることは、ローカルにある生のパスワードやAPIトークンを減らすことです。これは「[1Passwordを使って、ローカルにファイル(~/.configや.env)として置かれてる生のパスワードなどを削除した](https://efcl.info/2023/01/31/remove-secret-from-local/)」で書いた内容です。

`.env`、`~/.npmrc`、`~/.aws/credentials`、`gh auth token`のようなcredentialは、開発環境に残りがちです。npmパッケージのマルウェアは、`postinstall`などのライフサイクルスクリプトや、インストール後に実行されるCLIを通じて、ローカルファイルや環境変数を読みにいくことがあります。

ローカルの生トークンを減らしておけば、仮にローカルで悪性コードが実行されても、盗まれる権限の範囲を小さくできます。自分の場合は、GitHubやAWSのようなCLI認証は1Password Shell Pluginsに寄せ、npm publishに使うような強い長期トークンは常用しないようにしています。

また、利用する側では、パッケージを入れる前の防御として[Socket Firewall](https://socket.dev/blog/introducing-socket-firewall)や[Takumi Guard](https://flatt.tech/takumi/features/guard)を使っています。

## npmトークンをCIに置かない

CIからnpmへ公開する場合、以前は`NPM_TOKEN`のような長期トークンをGitHub Actions Secretsに入れるのが普通でした。しかし、長期トークンは漏れると無効化するまで使われ続けます。また、monorepoではパッケージごとの細かい権限制御が難しく、広い権限を持つトークンになりがちです。

この問題に対して、npm Trusted Publishingを使うと、GitHub ActionsなどのCI/CD環境からOIDCでnpmに認証できます。Trusted Publishingは、長期npmトークンを使わず、workflowごとの短命credentialでパッケージを公開する仕組みです。

- [Trusted publishing for npm packages | npm Docs](https://docs.npmjs.com/trusted-publishers/)
- [npm Trusted PublishingでOIDCを使ってトークンレスでCIからnpmパッケージを公開する](https://efcl.info/2025/09/07/npm-oidc/)

GitHub Actions側では、workflowに`id-token: write`を付けます。GitHub OIDCは、長期secretをGitHubに複製せず、workflowごとに短命トークンを取得する仕組みです。

- [OpenID Connect - GitHub Docs](https://docs.github.com/en/actions/concepts/security/openid-connect)

ただし、npmトークンを消せば公開フロー全体が安全になるわけではありません。GitHub Actionsのworkflowを書き換えられる権限があると、OIDCを使ってnpm publish用の短命credentialを得られる可能性があります。そのため、GitHub Actionsからnpmへ権限が広がる手前にも、別の制御点が必要になります。

## Deployment protection rulesをpublishの手前に置く

GitHub EnvironmentsのDeployment protection rulesは、jobの実行前に承認やbranch/tag制限を要求する仕組みです。publish用jobの手前に置くと、GitHub Actionsからnpmへ権限が広がる境界に承認を入れられます。
environmentを参照するjobは、Deployment protection rulesを満たすまで実行されません。

- [Managing environments for deployment - GitHub Docs](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)
- [Deployments and environments - GitHub Docs](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments)

npm publish用のworkflowでは、次のように`environment: npm`を付けています。

```yaml
name: Release

on:
  pull_request:
    types: [closed]

jobs:
  publish:
    if: |
      github.event.pull_request.merged == true &&
      contains(github.event.pull_request.labels.*.name, 'Type: Release')
    runs-on: ubuntu-latest
    environment:
      name: npm
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: "24"
          registry-url: "https://registry.npmjs.org"
          package-manager-cache: false
      - run: npm ci
      - run: npm stage publish --access public
```

この`npm`というEnvironmentには、required reviewersを設定します。required reviewersでレビューアーが明示的にApproveしないとWorkflowが動作しないように設定できます。

![GitHub EnvironmentsのDeployment protection rules](/wp-content/uploads/2026/06/hardening-npm-publishing-deployment-protection-rules.png)

![npm Trusted PublisherとGitHub ActionsのEnvironment名を一致させる](/wp-content/uploads/2026/06/hardening-npm-publishing-environment-name-match.png)

npm Trusted Publisher側にも、同じEnvironment nameを登録します。

この設定で、npm側では`npm`というEnviromentがないGitHub ActionsからのPublishは受け付けなくなります。
一方で、GitHub Actionsでは`npm`というEnviromentを参照するには、レビューアーのApproveが必要になります。

そのため、Workflowファイルを書き換えるだけではOIDC tokenを利用した攻撃が難しくなります。

## npm staged publishingで公開前に止める

npm staged publishingは、`npm publish`で直接公開する代わりに、`npm stage publish`でパッケージをstaging areaへ提出する仕組みです。maintainerが中身を確認してapproveすると、registryに公開されます。

- [Staged publishing for npm packages | npm Docs](https://docs.npmjs.com/staged-publishing/)
- [npm-stage | npm Docs](https://docs.npmjs.com/cli/v11/commands/npm-stage/)

`npm stage publish`自体は2FAを要求しません。CIは公開物を提出するだけで、実際にregistryへ公開するところはnpmjs.comのStaged Packages画面で止まります。ここでApproveするときに2FAが必要になります。

![npm Staged PackagesのApprove画面](/wp-content/uploads/2026/06/hardening-npm-publishing-staged-packages-approve.png)

npm Trusted PublisherのAllowed actionsは`npm stage publish`だけにして、CIから直接`npm publish`する経路をなくせます。
GitHub側のEnvironment approvalを通過しても、npm側のApproveが残る形です。そのため、GitHubとnpmアカウントを両方の権限がないとpublishができなくなります。

一方でstaged publishingはまだ出たばかりなので問題もあって、パッケージ1つずつしかApproveができないので、monorepoだとちょっと大変になります。

- [Staged publishing is GA, plus new install-time security controls · community · Discussion #196675](https://github.com/orgs/community/discussions/196675)

## 実装例

最小構成のサンプルとして、次のrepositoryを作りました。

- [azu/simple-oidc-example-package](https://github.com/azu/simple-oidc-example-package)
    - こっちは通常のOIDCのリリース
- [azu/simple-npm-staged-publish-package-example](https://github.com/azu/simple-npm-staged-publish-package-example)
    - Staged Publishingを使ったリリース

staged publishingのサンプルでは、release PRの作成からnpmjs.com上のapproveまでを通しています。具体的には、PRレビュー、GitHub Environment `npm`のapprove、`npm stage publish`、staged package approveという流れです。

この流れは、公開フローを次の2つの境界で止めるためのものです。GitHubの境界では、release PRのレビューとEnvironment approveを要求します。npmの境界では、staged package approveを要求します。どちらか一方だけではなく、GitHubとnpmの両方に承認点を置くことで、1つの権限だけではregistry公開まで進みにくくしています。

## まとめ

npmパッケージの公開フローで重要なのは、どこから一箇所ではなくて、一連の流れとして対策を入れていく必要があります。

ローカルとCIには、npm publishに使える強い長期トークンを置かないようにする。
GitHub ActionsではProtection Ruleを使って、CIが動く条件を厳密にする。
npm側では、Staged Publishingを使ってMFAがないとpublishできなくする。

公開フローを段階ごとに分け、それぞれの段階で何かしらの対策が入れられると、新しい攻撃が出てきた時に防ぎやすくなるかなと考えています。

## 関連リンク

- 登壇資料: [Hardening npm Publishing](https://azu.github.io/slide/2026/hardening-npm-publishing/slide.html)
- イベント: [OSS開発者は今何をするべきか？ソフトウェアサプライチェーン侵害対策を考える - connpass](https://flatt.connpass.com/event/395359/)
- [npm Trusted PublishingでOIDCを使ってトークンレスでCIからnpmパッケージを公開する](https://efcl.info/2025/09/07/npm-oidc/)
- [1Passwordを使って、ローカルにファイル(~/.configや.env)として置かれてる生のパスワードなどを削除した](https://efcl.info/2023/01/31/remove-secret-from-local/)
