---
title: "時期を決めて定期的に更新するnpmパッケージをChangesetsで管理する"
author: azu
layout: post
date : 2023-07-17T21:09
category: JavaScript
tags:
    - JavaScript
    - npm
    - monorepo

---

毎月や半年に一回といったように、リリースする時期(間隔)を決めて更新するタイプのパッケージがあります。
具体的には、次の[textlint](https://github.com/textlint/textlint)のプリセットルールは1月と7月という形で半年に一回リリースしています。

- [textlint-ja/textlint-rule-preset-japanese: textlint rule preset for Japanese.](https://github.com/textlint-ja/textlint-rule-preset-japanese/tree/master)
- [textlint-ja/textlint-rule-preset-ja-technical-writing: 技術文書向けのtextlintルールプリセット](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing)

なぜ、このようにリリースする時期を決めているかというと、これらのパッケージは他のパッケージに依存していて、他のパッケージの更新がそのままメジャーアップデートになりやすい性質があるためです。
そのため、依存を更新してリリースすると、頻繁にメジャーアップデートしないといけなくなります。

具体的には、[Semantic Versioning](https://semver.org/)に則っているので次のルールでバージョンを更新しています。

- Patch リリース
    - 各ルールのバグ修正 (警告を減らす方向への修正)
    - ドキュメントの改善
    - 内部的な変更 (リファクタリングやテストの改善など)
    - リリース失敗時の再リリース
- Minor リリース
    - 各ルールのバグ修正 (警告を増やす方向への修正)
    - 新オプションの追加
    - 既存ルールの非推奨化
- Major リリース
    - プリセットへのルールの追加
    - プリセットからルールの削除
    - 既存のオプション値の変更

ルールの追加やルールのメジャーアップデートがあると、プリセットもメジャーアップデートが必要になります。
頻繁にメジャーアップデートすると、ユーザーがメジャーアップデートをするのが面倒になるので、ある程度の間隔にまとめてリリースするようにしています。

まとめてリリースすると、それまでの間に最新のルールを使えない問題があります。
その対応として`@next`のdist-tag付きでインストールすると最新のルールも含んだパッケージをインストールできるようにしています。

```
npm install textlint-rule-preset-ja-technical-writing@next
```

このような、定期的にリリース + 最新を常に`@next`のdist-tagでリリースといったパッケージを管理するために、[Changesets](https://github.com/changesets/changesets)を利用しています。

## [Changesets](https://github.com/changesets/changesets)の特徴

[Changesets](https://github.com/changesets/changesets)はmonorepoのパッケージのリリースツールとして知られていますが、個別のパッケージでも利用できます。
特徴として、PRごとの変更内容とその変更内容のsemverを記録して、それをまとまったものとしてリリースできるというものです。

マージのたびにリリースする場合は、変更内容は覚えているのでその場で書けます。
しかし、時間が空くと何を変更したのか忘れてしまうことがあります。
そのため、変更(PR)ごとの変更内容を記録しておくことで、リリース時はただリリースするだけで良くなります。

[Changesets](https://github.com/changesets/changesets)では、変更内容のリリースノートだけではなく、その変更が`patch`/`minor`/`major`のどれになるかを記録しています。
これによって、リリースするときは記録から自動的に次のバージョンを決めてくれます。

## [Changesets](https://github.com/changesets/changesets)の導入

ドキュメントや次の記事と基本的に同じになるので、そちらを参照してください。

- [changesets/docs/intro-to-using-changesets.md at main · changesets/changesets](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
- [Changesetsで頑張らないリリース（モノレポ対応）](https://zenn.dev/mouse_484/articles/easy-changesets)

基本的な導入の流れを書くと次のようになります。

1. [changesets](https://github.com/changesets/changesets)をインストールする
2. [changeset-bot](https://github.com/apps/changeset-bot)をリポジトリにインストールする
3. [Changesets Release Action](https://github.com/changesets/action)を設定する

[changesets](https://github.com/changesets/changesets)は最初に設定だけして、その後はあまり意識しないです。

[changeset-bot](https://github.com/apps/changeset-bot)をインストール後に、PRを出すとBotがChangesets(変更内容)を記録するかを尋ねてきます。
バージョンに影響があるものなら、Botの指示に従ってChangesetsを記録していくだけです。

このChangesetsは次のようなMarkdownになっていて、Frontmatterにsemverを記録して、あとは変更内容を書くだけです。
Botの指示に従ってやれば、ブラウザ上で編集できるのでわざわざエディタを開く必要もありません。

```markdown
---
"textlint-rule-preset-ja-technical-writing": major
---

:sparkles: [ルール名](https://example.com)をアップデート

変更点の解説
```

パッケージのリリースは、[Changesets Release Action](https://github.com/changesets/action)を使ってCIから行うように設定できます。
CIからnpmにリリースするにはNPMのtokenが必要ですが、次のような感じで設定ファイルを一つ書くだけです。

- https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing/blob/2c6c5b1164f0afc4149933954d888b3f7133aee8/.github/workflows/release.yml

```yaml
name: Release

on:
  push:
    branches:
      - master

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v3
        with:
          # This makes Actions fetch all Git history so that Changesets can generate changelogs with the correct commits
          fetch-depth: 0
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install Dependencies
        run: yarn install
      - name: Create Release Pull Request or Publish to npm
        id: changesets
        uses: changesets/action@v1
        with:
          publish: yarn run release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.SHARED_BOT_NPM_TOKEN }}
```

ここまで設定できると、PRをマージするたびにそこまでの変更履歴をまとめたVersion PackagesというPRを作ってくれます。
このPRには、次のバージョンに入る変更がまとまっているので、そのままマージするとリリースされます。

- [Version Packages by github-actions[bot] · Pull Request #111 · textlint-ja/textlint-rule-preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing/pull/111)

リリースもブラウザ上でできるので、PRを出した時にちゃんと変更内容を書いていれば、リリースは簡単です。

## Canary Release

先ほどまでの設定で、まとめてリリースはできるようになります。
半年に一度のリリースなので、リリースするまで最新のバージョンが利用できないのは不便です。

[changesets](https://github.com/changesets/changesets)には[Snapshot Releases](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md)という仕組みがあり、いわゆるCanary Releaseが可能です。

この設定も簡単で、次のような感じで設定ファイルを一つ書くだけです。

- https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing/blob/2c6c5b1164f0afc4149933954d888b3f7133aee8/.github/workflows/snapshot-release.yml

```yaml
name: "Snapshot Release@next"

on:
  push:
    branches:
      - master

permissions:
  contents: read

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          # This makes Actions fetch all Git history so that Changesets can generate changelogs with the correct commits
          fetch-depth: 0
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          registry-url: 'https://registry.npmjs.org' # to create .npmrc file with NODE_AUTH_TOKEN
          node-version: 18
      - name: Install Dependencies
        run: yarn install
      - name: "Release @next"
        run: |
          yarn changeset version --snapshot next
          yarn changeset publish --no-git-tag --snapshot --tag next
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.SHARED_BOT_NPM_TOKEN }}
```

これで、PRをマージするたびに`0.0.0-next-20230716010722`のようなバージョンでnpmへリリースできます。
npmの[dist-tag](https://docs.npmjs.com/cli/v9/commands/npm-dist-tag)という仕組みを使い、通常の`npm install`した時に参照される`@latest`ではなく、適当な`@next`のようなタグをつけてパッケージを公開できます。

```bash
# @latestのdist-tagがインストールされる
npm install textlint-rule-preset-ja-technical-writing
# 次と意味は同じ
npm install textlint-rule-preset-ja-technical-writing@latest
# @nextのdist-tagがインストールされる
npm install textlint-rule-preset-ja-technical-writing@next
```

これによって、通常のユーザーは`@latest`をインストールしますが、試したい人だけ`@next`で最新のバージョンをインストールできます。

## 定期的なリリースのタイミングをGitHub Actionsで通知する

半年に一回リリースしますが、リリース自体は手動でVersion PackagesのPRをマージする必要があります。
このタイミングを忘れてしまう問題もあるので、次のようなGitHub Actionsを半年に一回リリース用のIssueを作成して通知しています。

- https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing/blob/2c6c5b1164f0afc4149933954d888b3f7133aee8/.github/workflows/prepare-release.yml

```yaml
name: Create ReleaseIssue
on:
  schedule:
    # 1月/7月にリリース
    - cron:  "0 0 1 */6 *"

jobs:
  create_issue:
    name: Create ReleaseIssue
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - name: Create team sync issue
        uses: imjohnbo/issue-bot@v3.4
        with:
          assignees: "azu"
          labels: "Type: Release"
          title: "Next Release"
          body: |
            ### 次のリリースの準備ができました

            - [ ] マージ忘れのPRがないかを確認
            - [ ] Version PackagesのPRをマージ
            - [ ] 新しいバージョンがリリースされたことを確認

          pinned: false
          close-previous: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## おわりに

[Changesets](https://github.com/changesets/changesets)はリリースまで間隔が開くようなプロジェクトにはとても便利です。

これらの仕組みを使って、それぞれのパッケージのメジャーアップデートをリリースしています。

- [Release v8.0.0 · textlint-ja/textlint-rule-preset-japanese](https://github.com/textlint-ja/textlint-rule-preset-japanese/releases/tag/v8.0.0)
- [Release v8.0.0 · textlint-ja/textlint-rule-preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing/releases/tag/v8.0.0)

自分が管理する大部分のパッケージは、マージのたびにリリースしています。
それのパッケージのリリースには、GitHub Releasesを使った方法を利用しています。
詳細は次の記事を参照してください。

- [GitHubのリリースノートを自動化する仕組み | Web Scratch](https://efcl.info/2023/03/11/auto-release-note/)