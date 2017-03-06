---
title: "GitHubのPull Requestのレビューコメントをコマンドラインから取得するツール"
author: azu
layout: post
date : 2017-03-06T09:20
category: GitHub
tags:
    - JavaScript
    - GitHub
    - PullRequest

---

[get-github-pr-review-comments](https://github.com/azu/get-github-pr-review-comments "get-github-pr-review-comments")というシンプルなCLIを作りました。

GitHubでPull Requestを出して、そこへレビューコメントを書いて、それを反映というのを繰り返すと思います。
そのときに、レビューコメントの位置をソースコードの位置で探すのが毎回大変でした。
（特に文章をPRしてるときは細かいtypoをレビューコメントで印を付けて直すみたいなことがよく起きるので、位置が見つけにくい)

[get-github-pr-review-comments](https://github.com/azu/get-github-pr-review-comments "get-github-pr-review-comments")は次の事を行うCLIです。

1. 指定したCommitShaを含むPull Requestを取得
	- ブランチのshaとかでいい
2. Pull Requestについているレビューコメントを取得
3. 実際のファイルパス:行数 + レビューコメントを出力

VSCodeやWebStormなど大体のエディタはファイルパスをクリックしてジャンプできるので、ツールが吐いた結果をクリックすればレビューコメントの位置に飛べます。

![VSCode](https://camo.githubusercontent.com/e72a21e8e26d09148a98fa1fec3fc600298931dd/68747470733a2f2f6d6f6e6f736e61702e636f6d2f66696c652f50496435716768484774756472387a486f42346f6c383762343747464c4a2e706e67)

![WebStorm](https://monosnap.com/file/D5dbRx42MbM0ynePcXb6rpztdkfw8d.png)

自分は、次のようなシェルスクリプトを使って、現在ブランチのレビューコメントを取得しています。

```sh
#!/usr/bin/env bash

declare repo=$(git config --local remote.origin.url | perl -pe's/(git@|https:\/\/)?github.com(:|\/)(\w+)\/(\w+)(.git)?/$3\/$4/' | sed 's/\.git//g')
GH_TOKEN="GitHubのtoken" get-github-pr-review-comments \
--repo "${repo}" \
--projectRoot `git rev-parse --show-toplevel` \
`git rev-parse HEAD`
```

GitHubトークンは以下から`repo`の権限を付けたものを作成します。

- [New personal access token](https://github.com/settings/tokens/new "New personal access token")

## 既知の問題

GitHubでは解決済みのコメント(コミットで変更された部分)は折りたたまれますが、それができていません。

APIの結果にそういう情報があるわけでもないのでどうやってやるのかがよく分かりませんでした。

- [How to know that comment is resolved? · Issue #1 · azu/get-github-pr-review-comments](https://github.com/azu/get-github-pr-review-comments/issues/1 "How to know that comment is resolved? · Issue #1 · azu/get-github-pr-review-comments")