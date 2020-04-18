---
title: "ルールに沿っていないGitHubのブランチを削除するツール/GitHub Actions"
author: azu
layout: post
date : 2020-04-18T00:47
category: JavaScript
tags:
    - GitHub
    - CLI
    - GitHub Actions

---

[delete-github-branches](https://github.com/azu/delete-github-branches)というブランチの命名ルールを定義して、そのルールにあっていないブランチを削除するCLIツールを書きました。

[delete-github-branches](https://github.com/azu/delete-github-branches)はCLIですが、[GitHub Actionsのcron処理](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#onschedule)と合わせれば、ルールにあってないブランチをGitHubから自動的に削除できます。

不要なブランチを削除することで、リポジトリからノイズとなるブランチを減らすのが目的です。
Pull Requestなしで放置されてるブランチが単なる消し忘れ以外であることは少ないので、そのようなブランチを減らすことでpullした時のノイズやサイズを減らすの目的です。
(活発なリポジトリだと放置ブランチがconflictだらけになるのでマージが難しいです。またGitHubにはDraft PRもあります)

## CLIの使い方

[delete-github-branches](https://github.com/azu/delete-github-branches)は主に次の3つの条件をすべて満たす場合にのみブランチを削除します。

- `includesBranchPatterns`(許可するブランチ名ルール)にマッチしてない
- `excludesBranchPatterns`(許可しないブランチ名ルール)にマッチしている
- そのブランチに紐づくOpenなPull Requestが存在しない
- そのブランチへの最後のPushから`stalledDays`(デフォルトは30)日以上経過している

基本的には、許可していないブランチ名にマッチして、そのブランチに紐づく開いているPull Reuqestがなければ削除します。
そのため、基本的にずっと放置されていてPull Requestも出していないブランチを削除することが目的です。

この設定はコマンドライン引数でも指定できますが、別途設定ファイルでも指定できます。

次のような設定ファイルを作成します。
この設定では基本的には`feature/<name>`というブランチを切ってからPull Requestを出すというルールになります。

`delete-github-branches.json`:

```json
{
    "includesBranchPatterns":  ["/^.*$/"],
    "excludesBranchPatterns": ["master", "develop", "gh-pages", "/^feature\/.*$/"],
    "stalledDays": 30
}
```

そして次のように`delete-github-branches`で削除したいGItHubの`<owner>/<repo>`を指定して実行します。
(例として ttps://github.com/azu/delete-github-branches-test/ に対してブランチの削除を実行しています。`GITHUB_TOKEN`には各自のGitHubトークンを渡してください)

```
$ GITHUB_TOKEN=$GH_TOKEN npx delete-github-branches --owner azu --repo delete-github-branches-test --config ./delete-github-branches.json
```

どのように削除されるかを実際に削除はせずに確認だけしたい場合は`--dryRun`が利用できます。
dryRunモードの場合はGETの処理しかしないので、実際にはブランチを削除をせずにログだけ出力します。

```
$ GITHUB_TOKEN=$GH_TOKEN npx delete-github-branches --owner azu --repo delete-github-branches-test --dryRun --config ./delete-github-branches.json


# Deleted Branches

- [will-be-deleted](https://github.com/azu/delete-github-branches-test/tree/will-be-deleted)

# Active Branches

- [develop](https://github.com/azu/delete-github-branches-test/tree/develop)
> This branch is ignored by includes/excludes patterns
- [feature/a](https://github.com/azu/delete-github-branches-test/tree/feature/a)
> This branch is ignored by includes/excludes patterns
- [feature/b](https://github.com/azu/delete-github-branches-test/tree/feature/b)
> This branch is ignored by includes/excludes patterns
- [master](https://github.com/azu/delete-github-branches-test/tree/master)
> This branch is ignored by includes/excludes patterns
```

せっかくブランチ名のルールを決めているので、GitHub Actionsを使ってブランチ名の検証とブランチの自動削除もできます。

## GitHub Actionとの連携

次のリポジトリにサンプルがあります

- [azu/delete-github-branches-actions-demo: Demo: GitHub Actions + delete-github-branches](https://github.com/azu/delete-github-branches-actions-demo) 

ちょっと長いですが、次のようなGitHub Actionsの設定ファイルを追加します。

`.github/workflows/delete-github-branches.yml`:

```yml
name: delete-github-branches

on:
  pull_request:
    types: [opened]
  # At 00:00 everyday
  schedule:
    - cron: '0 0 * * *'

jobs:
  delete-branch:
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule'
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: Setup Node ${{ matrix.node_version }}
        uses: actions/setup-node@v1
        with:
          node_version: 12.x
      - name: Run delete-github-branches
        run: |
          npm install -g delete-github-branches@1
          delete-github-branches --config ./.github/delete-github-branches.json
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  check-pull-request-branch:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: Setup Node ${{ matrix.node_version }}
        uses: actions/setup-node@v1
        with:
          node_version: 12.x
      - name: Check branch name
        id: check_branch_name
        shell: bash -x {0}
        run: |
          echo "GITHUB_BRANCH: ${BRANCH_NAME}"
          npm install -g delete-github-branches@1
          RESULT_DELETE_GITHUB_BRANCH=$(delete-github-branches-check-branch-name --config ./.github/delete-github-branches.json "${BRANCH_NAME}")
          RET=$?
          if [ "$RET" = "1" ]; then
              # multi-line issue https://github.community/t5/GitHub-Actions/set-output-Truncates-Multiline-Strings/td-p/37870
              RESULT_DELETE_GITHUB_BRANCH="${RESULT_DELETE_GITHUB_BRANCH//'%'/'%25'}"
              RESULT_DELETE_GITHUB_BRANCH="${RESULT_DELETE_GITHUB_BRANCH//$'\n'/'%0A'}"
              RESULT_DELETE_GITHUB_BRANCH="${RESULT_DELETE_GITHUB_BRANCH//$'\r'/'%0D'}"
              echo "::set-output name=message::${RESULT_DELETE_GITHUB_BRANCH}"
              echo "::set-output name=invalid_branch_name::true"
              echo "this branch name is invalid"
              exit 0
          fi
          echo "Good branch name"
          echo "${RESULT_DELETE_GITHUB_BRANCH}"
        env:
          BRANCH_NAME: ${{ github.event.pull_request.head.ref }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - uses: actions/github-script@0.8.0
        if: steps.check_branch_name.outputs.invalid_branch_name == 'true'
        with:
          github-token: ${{secrets.GITHUB_TOKEN}}
          script: |
            github.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `@${{ github.actor }} This branch name is mismatch branch naming rule.<br/><pre>${{steps.check_branch_name.outputs.message}}</pre>`
            })
```

合わせて先ほどと同じ`delete-github-branches.json`というファイルを`.github`以下に移動しておきます。

`.github/delete-github-branches.json`:

```json
{
    "includesBranchPatterns":  ["/^.*$/"],
    "excludesBranchPatterns": ["master", "develop", "gh-pages", "/^feature\/.*$/"],
    "stalledDays": 30
}
```

このGitHub Actionsは次の2つのことを行います。

- Pull Requestが出たブランチ名がルールにマッチしているかのチェック
- Cronで削除条件を満たすブランチを毎日削除

Pull Requestのブランチ名がルールとあっていない場合は、次のようにコメントで注意が出るようになっています。

![mismatch branch](https://efcl.info/wp-content/uploads/2020/04/18-1587139685.png)

Cronで毎日削除(実際には最後にPushしてから30日経過しないと削除されない)するので、リポジトリに不要なブランチが減らせるはずです。
リポジトリにゴミっぽいブランチが残ったりする場合は、delete-github-branchesを使うことで整理できるかもしれません。

- [azu/delete-github-branches: CLI: Delete GitHub Branches by pattern matching.](https://github.com/azu/delete-github-branches)

**別の使い方**

例えば、`master`以外のブランチ以外を削除するルールにしておき`stalledDays`を180日とかにすれば、
更新されずに放置された古いブランチを自動的に削除するルールとして実装できます。

```json
{
    "includesBranchPatterns":  ["/^.*$/"],
    "excludesBranchPatterns": ["master"],
    "stalledDays": 180
}
```
