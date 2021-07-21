---
title: "GitHub Actionsの`permissions`を自動で設定するツールを書いた"
author: azu
layout: post
date : 2021-07-21T09:30
category: security
tags:
    - JavaScript
    - security

---

GitHub Actionsには`permissions`というフィールドがあり、それぞれのWorkflowでの`secrets.GITHUB_TOKEN`の権限を設定できるようになっています。
`secrets.GITHUB_TOKEN`はGitHub Actionsの実行ごとに発行されるGitHubのTokenで、多くのGitHub Actionsはこのトークンを使ってリポジトリをgit cloneしたり、Issueにコメントを書いたりしていｒます。

- [GitHub Actions: Control permissions for GITHUB_TOKEN | GitHub Changelog](https://github.blog/changelog/2021-04-20-github-actions-control-permissions-for-github_token/)
- [Workflow syntax for GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#permissions)

この`permissions`をちゃんと設定することでサプライチェーン攻撃などの影響を軽減することができます。
たとえば、次の`permissions`は、このWorkflowにおける `secrets.GITHUB_TOKEN` は リポジトリの読み取りを許可するという意味になります。

```yaml
name: test
on: [ push, pull_request ]
permissions:
  contents: read
jobs:
  test:
    name: "Test on Node.js"
    runs-on: ubuntu-18.04

    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 14
      - name: Install
        run: yarn install
      - name: Test
        run: yarn test
```

GitHub Actionsのデフォルトパーミッションは`write-all`です。
つまり、リポジトリの読み書き、IssueやPRの読み書きなど全部の権限がデフォルトでついています。
そのため、`uses: actions/checkout@v2` のようにread onlyでよいGitHub Actionsも、実際にはリポジトリやIssueへの書き込みできる権限も持ってしまっています。

このパーミッションのデフォルト値は、リポジトリごと または Organization単位で、"Read repository contents permission" へと変更もできます。
"Read repository contents permission" は次のパーミッションと同じ意味なので、リポジトリのコンテンツを読み取りのみできるというパーミッションです。

```
permissions:
  contents: read
```

`contents: read`があれば、リポジトリをcloneしてテストをするには十分です。
この場合は、それ以外の権限をyamlファイルに`permissions`として付け足していくという形になります。

- [Disabling or limiting GitHub Actions for a repository - GitHub Docs](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/disabling-or-limiting-github-actions-for-a-repository#setting-the-permissions-of-the-github_token-for-your-repository)
- [Security hardening for GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions)

つまり、GitHub ActionsのWorkflowのパーミッションを必要最小限にするには次のステップが必要です。

- Workflow(yamlファイル)ごとに`permissions`を設定する
- リポジトリ or Organizationのデフォルトパーミッションを "Read repository contents permission"　にする

しかし、必要な`permissions`をREADMEに書いてるActionはとても少ないので、Workflowファイルに`permissions`を定義するのはかなり面倒です。
そのため、`permissions`の設定を自動的に追加ツールを書きました。

## [@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions)

[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions)は、GitHub Actionsのyamlファイルに自動的に`permissions`を付け足してくれます。

yamlファイルで使っているActionから必要な`permissions`を推定して設定してくれます。

**Requirements**: Node.js 14+

次のように`npx`コマンドなどで、`permissions`を更新したいyamlファイルのパスを指定します。

```bash
npx @pkgdeps/update-github-actions-permissions ".github/workflows/*.{yaml,yml}"
```

実行すると自動的に`permissions`フィールドを追加します。

![update-github-actions-permissions result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x0b72ti0m9whu3lht5uv.png)

[40種類以上のactions](https://github.com/pkgdeps/update-github-actions-permissions/blob/main/actions.yml)の`permissions`の定義リストから、自動的に必要な`permissions`を合成して設定するという形になっています。

定義リストにないActionを見つけた場合は、`write-all`を設定します。
もし、未定義のActionを見つけた場合は、Pull Requestを送ってください。

- [pkgdeps/update-github-actions-permissions: A CLI that update GitHub Actions's `permissions` automatically](https://github.com/pkgdeps/update-github-actions-permissions)

全てのWorkflowファイルの`permissions`が設定できたら、リポジトリのデフォルトパーミッションを"Read repository contents permission"にできます。

- Workflow(yamlファイル)ごとに`permissions`を設定する → [@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions)
- リポジトリ or Organizationのデフォルトパーミッションを "Read repository contents permission"　にする → 手動で設定

将来的には、GitHub ActionsもGitHub Appのように、Actionを提供する側で必要な`permissions`のリストを定義するようになるんじゃないかなと思います。(今はソースコードを読んだりしないと必要な`permissions`がわからない状態になっている)

## Related

`contents: read`のパーミッションでも問題あるケースは、リポジトリに機密情報がコミットされている状態だと思います。
そのようなケースは[シークレットスキャンニング](https://docs.github.com/ja/code-security/secret-security/about-secret-scanning)や[secretlint](https://github.com/secretlint/secretlint)などを使って、そもそも機密情報をコミットしない状態を目指すのが良さそうです。

- [secretlint 3.0リリース、GitHubの新しいトークンの検出に対応 | Web Scratch](https://efcl.info/2021/06/02/secretlint-3.0/)
