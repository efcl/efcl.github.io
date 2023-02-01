---
title: "update-github-actions-permissions v2をリリース: 500種類のGitHub Actionsのpermissionsに対応"
author: azu
layout: post
date : 2023-02-01T20:17
category: JavaScript
tags:
    - GitHub
    - Actions
    - Node.js
    - JavaScript
    - Security

---

GitHub Actionsのworkflowsファイルに自動的に`permissions`を追加する[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions) v2をリリースしました。

- [Release v2.0.0 · pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions/releases/tag/v2.0.0)

[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions)は `.github/workflow/*.yml`のWorkflowファイルに対して、利用してるActionから最小限の`permissions`を自動的に設定するツールです。
GitHub Actionsのデフォルトパーミッションは`write-all`です。 つまり、GitHub Actionsから対象のリポジトリの読み書き、IssueやPRの読み書きなど全部の権限がデフォルトでついています。そのため、`uses: actions/checkout@v3` のようにread onlyでよいGitHub Actionsも、実際にはリポジトリやIssueへの書き込みできる権限も持ってしまっています。

この問題に[最小権限の原則](https://ja.wikipedia.org/wiki/%E6%9C%80%E5%B0%8F%E6%A8%A9%E9%99%90%E3%81%AE%E5%8E%9F%E5%89%87)を使って修正するには、次の2つのステップが必要です。

- Workflow(yamlファイル)ごとに必要な`permissions`を設定する
- リポジトリ or Organizationのデフォルトパーミッションを “Read repository contents permission”　にする

詳しくは次の記事で解説しています。

- [GitHub Actionsの`permissions`を自動で設定するツールを書いた | Web Scratch](https://efcl.info/2021/07/21/update-github-actions-permissions/)

## 使い方

[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions)の使い方は単純です。
次のコマンドで、`.github/workflows/*.yml`のWorkflowファイルに対して、利用してるActionから最小限の`permissions`を自動的に設定します。

```
npx @pkgdeps/update-github-actions-permissions ".github/workflows/*.{yaml,yml}"
```
  
未知のワークフローがある場合は、`--defaultPermissions`で指定したデフォルト値が設定されます。

## [@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions) v2では500種類のActionの`permissions`をサポート

`actions/checkout`のようなActionsには明示的に必要な`permissions`が設定されていないことが多いです。
そのため、[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions)はActionごとに必要な[permissionsの定義リスト](https://github.com/pkgdeps/update-github-actions-permissions/blob/main/actions.yml)を持っています。

[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions) v1では50種類ほどのGitHub Actionsの`permissions`をサポートしていました。

[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions) v2では、500種類以上のGitHub Actionsの`permissions`をサポートしています。

どうやって増やしたかというと、[step-security/secure-workflows](https://github.com/step-security/secure-workflows)という類似するオープンソースの定義ファイルを利用しています。
[Secure Workflows](https://github.com/step-security/secure-workflows)は、継続的なCI/CDのセキュリティを向上させるためのサービスです。
`permissions`の自動設定や、GitHub Actionsのバージョン固定など色々な機能を持っています。

一方で、[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions)はシンプルに`permissions`を自動で設定するだけのツールです。
そのため、[Secure Workflows](https://github.com/step-security/secure-workflows)のように色々な機能は持っていません。
どちらかというと、"Read repository contents permission”をデフォルトにするために、移行するためのツールという位置付けです。


[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions) v2では[Secure Workflows](https://github.com/step-security/secure-workflows)の定義ファイルを取り込むことで、500種類以上のActionの`permissions`をサポートできるようになりました。
[Secure Workflows](https://github.com/step-security/secure-workflows)はAGPLなので、
[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions)もライセンスはAGPLに変更しています。

## おわりに

[@pkgdeps/update-github-actions-permissions](https://github.com/pkgdeps/update-github-actions-permissions) v2では[Secure Workflows](https://github.com/step-security/secure-workflows)の定義ファイルを取り込むことで、500種類以上のActionの`permissions`をサポートできるようになりました。

GitHub Actionsを狙ったサプライチェーン攻撃はまだ知らないですが、Codecovのような問題は今後も起こりうると思います。

- [Bash Uploader Security Update - Codecov](https://about.codecov.io/security-update/)

そういった問題が起きた時に影響範囲が小さくなるように`permissions`を設定することは重要だと思います。
まずは、RepositoryやOrganizationレベルで"Read repository contents permission"をデフォルトにすることから始めてみてください。

GitHub Actionsの継続的なチェックは、OSSFのScoorecardなど色々なツールが出てきています。

- [ossf/scorecard: OpenSSF Scorecard - Security health metrics for Open Source](https://github.com/ossf/scorecard)
- [Secure Workflows](https://github.com/step-security/secure-workflows)