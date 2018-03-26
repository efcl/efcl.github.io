---
title: "コマンドラインからブランチに該当するGitHubのPull Requestを開く"
author: azu
layout: post
date : 2015-02-01T21:47
category: shell
tags:
    - GitHub
    - シェルスクリプト

---

タイトル通りですが、Gitのブランチ名を元に該当するPull Requestのページを開く方法がGitHubにはあります。

```
https://github.com/<OWNER>/<REPO>/pull/<branch>
```

という感じのURLを開くと、以下のように状況によって移動先が変わります。

例) https://github.com/efcl/efcl.github.io/pull/open-github-pullrequest-url-from-branch

- 該当ブランチがPull Requestされていた場合
	- Pull Requestのページにリダイレクトされる
	- => https://github.com/efcl/efcl.github.io/pull/61
- 該当ブランチがpushしてあるだけ 又は ブランチがない場合
	- ベースブランチと該当ブランチのCompareへリダイレクトされる
	- => https://github.com/efcl/efcl.github.io/compare/open-github-pullrequest-url-from-branch?expand=1

というように、ブランチ名を元にPull Requestのページを開く事ができて便利です。

## コマンドラインからPull Requestを開く

[hub pull-request](https://github.com/github/hub#git-pull-request "pull-request")などで以下のようにWIPブランチのPull Requestを作ったりしていますが、このコマンドは作った時にしかPull RequestのURLを教えてくれません。

<script src="https://gist.github.com/azu/eed8324a3fb5b171b7c0.js"></script>

そこで、調べていたら以下のようなIssueがあって試してみたらできた感じです。

- [Open the GitHub web interface to create the new pull request · Issue #688 · github/hub](https://github.com/github/hub/issues/688 "Open the GitHub web interface to create the new pull request · Issue #688 · github/hub")

コマンドラインからGitHubを開くには[motemen/git-browse-remote](https://github.com/motemen/git-browse-remote "motemen/git-browse-remote")を使うのが便利です。

`.gitconfig`で開くパターンを設定できるので、`ref`のところを`/tree/` から `/pull/`にして見たところ、現在いるブランチからPull Requestのページを開けて便利になりました。(これであってるのかな?)

追記: 公式に同様の機能がオプションでついたのでこちらの方が安全な気がします。

- [git-browse-remote で現在のブランチに対応するプルリクエストを一発で開く - 詩と創作・思索のひろば](http://motemen.hatenablog.com/entry/2015/02/git-browse-remote-pr "git-browse-remote で現在のブランチに対応するプルリクエストを一発で開く - 詩と創作・思索のひろば")


```
[browse-remote "github.com"]
	top = https://{host}/{path}
	ref = https://{host}/{path}/pull/{short_ref}
	rev = https://{host}/{path}/commit/{commit}
	file = "https://{host}/{path}/blob/{short_rev}/{file}{line && \"#L%d\" % line}"
```

![gif](https://gyazo.com/6ad38092de4513b4196e699947d983ea.gif)
