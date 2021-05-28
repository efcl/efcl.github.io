---
title: "GitHub Actionsのnode-versionをまとめてアップデートするコマンドラインツールを書いた"
author: azu
layout: post
date : 2021-05-28T10:16
category: JavaScript
tags:
    - GitHub
    - CI
    - Node.js

---

GitHubでのCIは[Actions | GitHub](https://github.co.jp/features/actions)を使うようになりましたが、GitHub Actionの[setup-node](https://github.com/actions/setup-node)にはLTSのような相対的な値を指定する方法がありません。

- [Support aliases like LTS · Issue #26 · actions/setup-node](https://github.com/actions/setup-node/issues/26)
- [Support for LTS version · Issue #208 · actions/setup-node](https://github.com/actions/setup-node/issues/208)
- [Support `latest` as a version alias for the latest Node version · Issue #257 · actions/setup-node](https://github.com/actions/setup-node/issues/257)

そのため、GitHub ActionsでNode.jsのテストを書くには、次のように`node-version`にそれぞれのバージョンを指定する必要があります。

<script src="https://gist.github.com/azu/38fb9c00cf514ef453fef4bf9c2c35cb.js"></script>

Travis CIでは[nvm](https://github.com/nvm-sh/nvm)が使われていたので `lts/*` などをLTSを指定できたので、
`node_js: stable` とだけ書いていることが多かったです。

- [Building a JavaScript and Node.js project - Travis CI](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/#specifying-nodejs-versions)

バージョンを書くのは問題ないのですが、バージョンを更新するのが面倒です。
また、ローカルでは古いバージョンで実行しないので、リポジトリをメジャーアップデートするコミットをpushしてから、Node.js 10では動かないパッケージが入ってきてテストが落ちてから気づくみたいな現象が起きやすいです。

この更新を楽にするための[github-actions-node-versions](https://github.com/azu/github-actions-node-versions)というツールを書きました

## [github-actions-node-versions](https://github.com/azu/github-actions-node-versions)

[github-actions-node-versions](https://github.com/azu/github-actions-node-versions)は、`.github/workflow/*.{yml,yaml}` の `matrix` にかかれている `node-version` を自動的にLTSとActiveなバージョンに更新します。

Node.jsでは、LTSとしてMaintenanceとActive LTSの2種類があり、2021-05-28時点では、Node.js 12と14が該当します。
また、LTSではないがActiveに開発するCurrentバージョンがあり、2021-05-28時点では、Node.js 16が該当します。

- [nodejs/Release: Node.js Release Working Group](https://github.com/nodejs/Release)

次のコマンドを実行すると `node-version: [Maintenance LTS、Active LTS, Current]` に更新してくれるシンプルなツールです。
2021-05-28時点では `node-version: [12, 14, 16]` と更新してくれます。

```
$ npx github-actions-node-versions
```

実行結果の例

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">$ npx github-actions-node-versions<br><br>でGitHub Actionsのnode_versionsのmatrixを<br>`[Maintenance_LTS, Current_LTS, Active]` に更新するツール書きました<a href="https://t.co/2oVSq0KnR8">https://t.co/2oVSq0KnR8</a> <a href="https://t.co/RLUGGAPBkP">pic.twitter.com/RLUGGAPBkP</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1397564415105323009?ref_src=twsrc%5Etfw">May 26, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

[node-version-alias](https://github.com/ehmicky/node-version-alias)を使っているので、<https://nodejs.org/dist/>の状態によって自動的に結果が変わります。

Node.js 17が出たときは、まだUnstableなので入ってほしくなくて奇数バージョンは除外しています。
なので、`node-version: [14, 16]` となる気がします。(テストしてないので、テストと修正のPR待ってます！)

- <https://github.com/azu/github-actions-node-versions/blob/724c31a7f671e6d6dda0776d823003ff896a8f30/src/github-actions-node-versions.ts#L19-L29>

## 内部的な仕組み

コメントを維持しながらYAMLを変換したかったため[js-yaml](https://github.com/nodeca/js-yaml)が使えませんでした。
[eemeli/yaml: JavaScript parser and stringifier for YAML](https://github.com/eemeli/yaml)を使って、Yamlをパースしてtraverseしながら、位置情報を取得しています。

この位置情報を元に `node-version` だけを書き換えることで、コメントを維持しながらYAMLのマイグレーションをしています。

- [github-actions-node-versions/github-actions-node-versions.ts at main · azu/github-actions-node-versions](https://github.com/azu/github-actions-node-versions/blob/main/src/github-actions-node-versions.ts#L31-L53)

## おわりに

管理している[リポジトリが大量](https://efcl.info/surl/github-activity/)にあるので、こういうちょっとした変更も手作業じゃなくてツール化していることが多いです。

- [azu/migrate-travis-ci-to-github-actions: [Opinionated] Migrate Travis CI to GitHub Actions. Node.js CI settings](https://github.com/azu/migrate-travis-ci-to-github-actions)
- [azu/mocha-migrate: Mocha migration script for mocha v7](https://github.com/azu/mocha-migrate)
- [azu/set-env-to-github_env: A migration tools convert `::set-env` to $GITHUB_ENV on GitHub Actions.](https://github.com/azu/set-env-to-github_env)
- [shepherdを使って複数のリポジトリに一括でPRを出してまとめてマイグレーションする | Web Scratch](https://efcl.info/2021/05/13/shepherd-github-multi-repo-migration/)

何度実行しても同じ結果になるマイグレーションツールを作っておくと何も考えなくて良いので楽だと思います。
