---
title: "GitHub Security Alertを元にIssueを作成するCLIを書いた"
author: azu
layout: post
date : 2019-07-19T10:31
category: JavaScript
tags:
    - GitHub
    - Node.js
    - JavaScript
    - Security

---

[@security-alert](https://github.com/azu/security-alert)というGitHub Security Alertを扱うコマンドラインツール群を作りました。

GitHub Security Alertは、リポジトリに含まれるnpmやgemなどのパッケージの脆弱性情報を通知した一覧管理できる仕組みです。
詳しくは次のドキュメントで紹介されています。

- [About security alerts for vulnerable dependencies - GitHub Help](https://help.github.com/en/articles/about-security-alerts-for-vulnerable-dependencies)

このGitHub Security Alertから[Dependabot](https://dependabot.com/)を使った修正PatchのPull Requestを作成できるようになっています。
一方で、Pull Requestしか作れないため、そのAlertに対してメモや議論するためのIssueを作るのが面倒でした。

そのため、GitHubにGitHub Security Alertの内容を含んだIssueを作る機能のフィードバックも送ったりしていましたが、
面倒だったので自作することにしました。

## [@security-alert](https://github.com/azu/security-alert)

[@security-alert](https://github.com/azu/security-alert)はmonorepoになっていていくつかのGitHub Security Alert周りのツールが入っています。

### [@security-alert/list-alerts](https://github.com/azu/security-alert/tree/master/packages/list-alerts)

[@security-alert/list-alerts](https://github.com/azu/security-alert/tree/master/packages/list-alerts)は、GitHub Security Alertの内容を取得しパッケージの情報と合成したデータのリストを取得できます。
(npmならDependenciesTypeなども`pacakge-lock.json`などから取得しています。)

`--format json`でJSON形式でも取得できるようになっています。

```
$ GITHUB_TOKEN="GITHUB_TOKEN" npx @security-alert/list-alerts --repo azu/security-alert

# lodash.template

- PackageName: lodash.template
- PackageUrl: https://www.npmjs.com/package/lodash.template
- PackageVersion: 4.4.0
- DependenciesType: devDependencies
- PackageManifestUrl: https://github.com/azu/security-alert/blob/master/yarn.lock
- VulnerableVersionRange: < 4.5.0
- GitHubAlertUrl: https://github.com/azu/security-alert/network/alert/yarn.lock/lodash.template/open

# lodash

- PackageName: lodash
- PackageUrl: https://www.npmjs.com/package/lodash
- PackageVersion: 4.17.11
- DependenciesType: devDependencies
- PackageManifestUrl: https://github.com/azu/security-alert/blob/master/yarn.lock
- VulnerableVersionRange: < 4.17.13
- GitHubAlertUrl: https://github.com/azu/security-alert/network/alert/yarn.lock/lodash/open
```

### [@security-alert/create-issue](https://github.com/azu/security-alert/tree/master/packages/create-issue)

[@security-alert/create-issue](https://github.com/azu/security-alert/tree/master/packages/create-issue)はGitHub Security AlertのURLからそのリポジトリにIssueを作成できます。

```
$ GITHUB_TOKEN="$GITHUB_TOKEN" npx @security-alert/create-issue "https://github.com/azu/security-alert/network/alert/yarn.lock/lodash/open"
...
https://github.com/azu/security-alert/issues/1
```

実際に作成されたIssueは次のページから見れます。
大体GitHub Security Alertの画面で見られるものと同じです。

- <https://github.com/azu/security-alert/issues/1>

作成時に、ラベルやassignの指定もできます。

```
GITHUB_TOKEN=xxx npx @security-alert/create-issue "https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/axios/open" --labels "security,package"
```


後は、このIssueに対応するかを決めて、GitHub Security Alertの方をCloseしたり、[Pull Requestで修正](https://github.com/azu/security-alert/pull/2)すれば完了です。

GitHubにこの機能はフィードバックを送ってありますが、まだ(2019-07-19)Issueを作る機能はないようです。

## おわりに

GitHub Security Alertをコマンドラインから扱うための[@security-alert/list-alerts](https://github.com/azu/security-alert/tree/master/packages/list-alerts)や[@security-alert/create-issue](https://github.com/azu/security-alert/tree/master/packages/create-issue)を作りました。

GitHubにSecurity AlertがIntegrationされていることはすごい便利なのですが、このSecurity Alertを取得するためのAPIがGraphQLにしか無かったりします。

- [RepositoryVulnerabilityAlert | GitHub Developer Guide](https://developer.github.com/v4/object/repositoryvulnerabilityalert/)

また、 [GitHub Apps](https://developer.github.com/apps/)や[GitHub Actions](https://github.com/features/actions)はまだ(2019-07-19)このSecurity Alertのhookに対応していません。(WebHookでのみ対応している)
さらに、Pull Requestを送る[Dependabot](https://dependabot.com/)は[lerna](https://github.com/lerna/lerna)に完全に対応してるわけではなかったり(2019-07-19現在lerna + npmには対応してない)、あまり設定が柔軟では無かったりします。
この辺は[renovatebot](https://renovatebot.com/)の方が柔軟で対応できる範囲は広いです。

ただし、先ほども書いたようにGitHubに組み込まれていることがかなりメリットなので、この辺の機能やサポートが充実してくるといいなと思いました。

この辺のGitHub Alertを含めたGitHub周りのセキュリティの仕組みをいい感じにするいい方法をもっと知りたい。