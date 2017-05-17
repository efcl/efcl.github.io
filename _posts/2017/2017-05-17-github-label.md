---
title: "GitHubのラベルをいい感じにセットアップするツール"
author: azu
layout: post
date : 2017-05-17T10:23
category: JavaScript
tags:
    - GitHub
    - Node.js

---

[github-label-setup](https://github.com/azu/github-label-setup "github-label-setup")というGitHubリポジトリのラベルにいい感じのプリセットを追加する自分用のツールを書きました。

次のIssueに追加されるラベルが全部貼ってあります。

[![demo](./img/demo.png)](https://github.com/azu/github-label-setup/issues/1)


## Install

npmでインストールできます。

    npm install @azu/github-label-setup -g

## Usage

基本的にはデフォルトのプリセットがあるので、`--token`でGitHubのtokenを渡すだけで後は自動でやってくれます。

ラベルを設定したいプロジェクトのディレクトリに移動してコマンドを叩くだけです。
(git remoteのoriginを見ます)

    Usage
      $ github-label-setup --token xxx

    Options

      -h, --help                  output usage information
      -l, --labels <path>         the path or npm packages name to look for the label configuration in. Default: labels.json
      --token <token>  a GitHub access token (also settable with a GITHUB_ACCESS_TOKEN environment variable)
      -d, --dry-run               calculate the required label changes but do not apply them

アクセストークンは[https://github.com/settings/tokens](https://github.com/settings/tokens)から `"repo"` scope が有効になったものがあれば良いです。

`--dry-run`オプションを使えば、実際にどういう変更が行われるかを見れるのでまずはそちらで確認してください。

デフォルトのGitHubのラベルやよく使われる似た意味のラベルはマイグレーションしますが、リストにないラベルは単純に消えてしまうので注意が必要です。

- [github-label-setup/labels.json at master · azu/github-label-setup](https://github.com/azu/github-label-setup/blob/master/labels.json "github-label-setup/labels.json at master · azu/github-label-setup")

```
Fetching labels from GitHub
Changed: the "duplicate" label in the repo is out of date. It will be updated to "duplicate" with color "#ededed".
Changed: the "help wanted" label in the repo is out of date. It will be updated to "help wanted" with color "#e99695".
Missing: the "good for beginner" label is missing from the repo. It will be created.
Missing: the "Priority: Critical" label is missing from the repo. It will be created.
Missing: the "Priority: High" label is missing from the repo. It will be created.
Missing: the "Priority: Low" label is missing from the repo. It will be created.
Missing: the "Priority: Medium" label is missing from the repo. It will be created.
Changed: the "invalid" label in the repo is out of date. It will be updated to "Status: Abandoned" with color "#000000".
Missing: the "Status: Blocked" label is missing from the repo. It will be created.
Missing: the "Status: In Progress" label is missing from the repo. It will be created.
Changed: the "Idea" label in the repo is out of date. It will be updated to "Status: Proposal" with color "#d4c5f9".
Missing: the "Status: Ready for PR" label is missing from the repo. It will be created.
Missing: the "Status: Review Needed" label is missing from the repo. It will be created.
Changed: the "breaking" label in the repo is out of date. It will be updated to "Type: Breaking Change" with color "#b60205".
Changed: the "bug" label in the repo is out of date. It will be updated to "Type: Bug" with color "#ee0701".
Changed: the "documents" label in the repo is out of date. It will be updated to "Type: Documentation" with color "#5319e7".
Changed: the "enhancement" label in the repo is out of date. It will be updated to "Type: Feature" with color "#1d76db".
Missing: the "Type: Refactoring" label is missing from the repo. It will be created.
Changed: the "greenkeeper" label in the repo is out of date. It will be updated to "Type: Maintenance" with color "#0e8a16".
Changed: the "question" label in the repo is out of date. It will be updated to "Type: Question" with color "#cc317c".
Added: the "example" label in the repo is not expected. It will be deleted.
Added: the "implementing" label in the repo is not expected. It will be deleted.
Added: the "Patch Welcome" label in the repo is not expected. It will be deleted.
Added: the "proposal" label in the repo is not expected. It will be deleted.
Added: the "wontfix" label in the repo is not expected. It will be deleted.
This is a dry run. No changes have been made on GitHub
```

このツールは `github-label-sync` のラッパーなので、細かい部分はそちらをみてください。

- [Financial-Times/github-label-sync: Synchronise your GitHub labels with as few destructive operations as possible](https://github.com/Financial-Times/github-label-sync "Financial-Times/github-label-sync: Synchronise your GitHub labels with as few destructive operations as possible")

### Npm packages for labels

`-l`オプションでラベルファイルを指定できますが、`require`できればなんでも通るので、npmパッケージを作っても多分通ります。


    $ github-label-setup --token xxx --labels @owner/github-label-presets

ラベルのフォーマットは[Label JSON](https://github.com/Financial-Times/github-label-sync#label-json "Label JSON")をみてください。

## デフォルトのラベル

最初に書いたように自分用のツールなので、ラベルのデフォルトは自分がよく使う感じのものになってます。

[![demo](./img/demo.png)](https://github.com/azu/github-label-setup/issues/1)

- duplicate
- help wanted
- good for beginner
    - [MunGell/awesome-for-beginners: A list of awesome beginners-friendly projects.](https://github.com/MunGell/awesome-for-beginners "MunGell/awesome-for-beginners: A list of awesome beginners-friendly projects.")を参考に
- Priority: Critical
- Priority: High
- Priority: Low
- Priority: Medium
	- 優先度管理
- Status: Abandoned
- Status: Blocked
- Status: In Progress
- Status: Proposal
- Status: Ready for PR
- Status: Review Needed
	- ステータス管理
- Type: Breaking Change
- Type: Bug
- Type: Feature
- Type: Documentation
- Type: Refactoring
- Type: Maintenance
    - Related: [Conventional Commits](https://conventionalcommits.org/ "Conventional Commits")
    - これはコミットのスコープに大分近いです。
    - [lerna-changelog](https://github.com/lerna/lerna-changelog "lerna-changelog")などラベルをCHANGELOGのソースに使うツールなどもあるのを考えて、コミットのスコープに合わせたセットを作っています
- Type: Question"

Typeに関してはプロジェクト特有のTypeが増えていくと思います。
このスクリプトはリポジトリを作った直後に動かす目的が大きいです。

	hub create && github-label-setup --token XXXX

## 関連

似たようなものは色々あるのでお気に入りを探してみてください。
[github-label-sync](https://github.com/Financial-Times/github-label-sync "github-label-sync")をベースにしたのは既存のラベルをマイグレーションすることができるからです(紐付いていたIssueを保持できる)

- [yoshuawuyts/github-standard-labels: Create a standard set of issue labels for a GitHub project](https://github.com/yoshuawuyts/github-standard-labels "yoshuawuyts/github-standard-labels: Create a standard set of issue labels for a GitHub project")
- [Financial-Times/github-label-sync: Synchronise your GitHub labels with as few destructive operations as possible](https://github.com/Financial-Times/github-label-sync "Financial-Times/github-label-sync: Synchronise your GitHub labels with as few destructive operations as possible")
- [MunGell/awesome-for-beginners: A list of awesome beginners-friendly projects.](https://github.com/MunGell/awesome-for-beginners "MunGell/awesome-for-beginners: A list of awesome beginners-friendly projects.")
- [himynameisdave/git-labelmaker: Manage your GitHub labels from the command line!](https://github.com/himynameisdave/git-labelmaker "himynameisdave/git-labelmaker: Manage your GitHub labels from the command line!")
- [Sane GitHub Labels – Dave Lunny – Medium](https://medium.com/@dave_lunny/sane-github-labels-c5d2e6004b63 "Sane GitHub Labels – Dave Lunny – Medium")
