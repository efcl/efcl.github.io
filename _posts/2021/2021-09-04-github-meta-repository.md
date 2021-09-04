---
title: "user/.githubリポジトリを使い、FUNDING.ymlやCODE_OF_CONDUCT.mdなどを一括設定する"
author: azu
layout: post
date : 2021-09-04T14:03
category: 雑記
tags:
    - GitHub

---

GitHubには `username/.github` というように `.github` リポジトリというメタファイルを置くリポジトリが作れます。
たとえば、 `username/.github` リポジトリに `CODE_OF_CONDUCT.md` ファイルを置くと、`username`のすべてのリポジトリにそのファイルが反映されます。

`CODE_OF_CONDUCT.md`をおいた場合は、次のようにIssueを作る際になどに*Helpful resources*にリンクが表示されるようになります。

[![image](https://efcl.info/wp-content/uploads/2021/09/04-1630733751.png)](https://github.com/azu/browser-resources/issues/new)

もともとこの機能はOrganization(個人アカウントではない)のみで動いていたと思いますが、いつのまにか個人アカウントでも`.github`リポジトリが機能するようになっていました。

次のページはOrganizationの場合ですが`.github`リポジトリで特別な意味のあるファイルがまとめられています。

- [Creating a default community health file - GitHub Docs](https://docs.github.com/ja/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)

## .githubに設定できるファイル

2021-09-04時点では、次のようなファイルが認識されます。
最新のサポート対象は[Creating a default community health file - GitHub Docs](https://docs.github.com/ja/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)を参照してください。

- `CODE_OF_CONDUCT.md`: プロジェクトの行動規範について書かれたファイル
- `CONTRIBUTING.md`: プロジェクトのコントリビュートガイド
  - プロジェクトごとに普通は異なるので、個人アカウントの共通ファイルとしては使いにくいかもしれません
- `FUNDING.yml`: GitHub Sponsorsなどのスポンサー支援を促すボタンの定義ファイル
  - 以前[複数のGitHubリポジトリにまとめてGitHub Sponsorsボタン(FUNDING.yml)を設定する方法 | Web Scratch](https://efcl.info/2019/10/27/github-multiple-repository-funding.yml/)でまとめて設定するツールを書きましたが、`.github`リポジトリなら一括ですべてのリポジトリに対して設定できます
- Issue / Pull Template: IssueとPull Requestのテンプレートファイル
- `SECURITY.md`: セキュリティレポートはIssueにすると修正前にPublicになってしまうので、セキュリティ的な問題の報告先を書くファイルです
- `SUPPORT.md`: チャットなどのサポートを受けれる場所を案内するファイル

`.github` リポジトリを使うことで、自分が持っているリポジトリ全てに一括で設定できるので便利です。

たとえば、`.github`リポジトリに[FUNDING.yml](https://github.com/azu/.github/blob/main/FUNDING.yml)を置くと、
個別のリポジトリの`.github/FUNDING.yml`を作らなくてもスポンサーボタンが表示できます。

[![sponsor](https://efcl.info/wp-content/uploads/2021/09/04-1630732741.png)](https://github.com/azu/safe-marked)

自分の`.github`リポジトリは次のようになっています。

- [azu/.github: .github meta repo](https://github.com/azu/.github)

リポジトリごとに設定が異なる場合は、リポジトリの`.github/`ディレクトリに同名のファイルをコミットすれば`.github/`ディレクトリが優先されます。

- [リポジトリコントリビューターのためのガイドラインを定める - GitHub Docs](https://docs.github.com/ja/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors)
- [リポジトリにスポンサーボタンを表示する - GitHub Docs](https://docs.github.com/ja/github/administering-a-repository/managing-repository-settings/displaying-a-sponsor-button-in-your-repository)
- [Issueとプルリクエストのテンプレートについて - GitHub Docs](https://docs.github.com/ja/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)
- [リポジトリにセキュリティポリシーを追加する - GitHub Docs](https://docs.github.com/ja/code-security/getting-started/adding-a-security-policy-to-your-repository)
- [プロジェクトへのサポートリソースの追加 - GitHub Docs](https://docs.github.com/ja/communities/setting-up-your-project-for-healthy-contributions/adding-support-resources-to-your-project)