---
title: "GitHubのIssue一覧をiframeで埋め込めるウィジェットを作った"
author: azu
layout: post
date : 2014-08-31T14:51
category: GitHub
tags:
    - GitHub
    - HTML
    - API
    - JSONP

---

## [github-issue-widget](https://github.com/azu/github-issue-widget "github-issue-widget")

GitHubの特定のリポジトリのIssue一覧をiframeで埋め込めるものを作りました。

以下のようにiframeの`src`にパラメータを指定して埋め込む事が出来ます。

```html
<iframe src="https://azu.github.io/github-issue-widget/?owner=efcl&repo=efcl.github.io&limit=3&random"
        allowtransparency="true" frameborder="0" scrolling="0" width="100%"></iframe>
```

結果は以下のような表示です。

<iframe src="https://azu.github.io/github-issue-widget/?owner=efcl&repo=efcl.github.io&limit=3&random" allowtransparency="true" frameborder="0" scrolling="0" width="100%"></iframe>

## 使い方

使い方は単純で、以下のようにiframeで `https://azu.github.io/github-issue-widget/` にパラーメータをつけて埋め込むだけです。

```html
<iframe src="https://azu.github.io/github-issue-widget/?owner=efcl&repo=efcl.github.io&random"
        allowtransparency="true" frameborder="0" scrolling="0" width="100%"></iframe>
```

### パラメータ

パラメータに必須なのは、`owner`と`repo`のみです。他はオプショナルなパラメータになります。

#### ownerとreop

`https://github.com/azu/github-issue-widget` を例にすると
`owner`は`azu`で、`repo`は`github-issue-widget` です。

#### limit

`limit`は表示する件数の指定です。(多分取得数に限界があるので、その場合は小さいほうが優先されます)

デフォルト値は1にしています

#### random

`random` は `&random` という感じでvalueなしで指定(keyがあればtrueになる)する感じで使います。

これを指定した場合は、表示する順番がランダムになります。

#### GitHub API

他にもGitHub APIを叩く際のオプションを指定することが出来ます。

以下のように`state`で閉じているissueを取得することもできます。

```html
<iframe src="https://azu.github.io/github-issue-widget/?owner=efcl&repo=efcl.github.io&limit=10&state=closed"
        allowtransparency="true" frameborder="0" scrolling="0" width="100%"></iframe>
```

基本的にGitHub APIとParametersの名前は同じになっています。

GitHub APIを[JSON-P Callbacks](https://developer.github.com/v3/#json-p-callbacks "JSON-P Callbacks")を使って叩いているので、パラメータの詳細は[Parameters](https://github.com/azu/github-issue-widget#parameters "Parameters")を見て下さい。

## その他

埋め込んでいるHTMLはGitHub Pagesで公開してるものを使っているだけな感じです。

- [azu/github-issue-widget](https://github.com/azu/github-issue-widget#parameters "azu/github-issue-widget")

これは、以下のButtonを参考に作りました。

- [The Unofficial GitHub Watch &amp; Fork Buttons](http://ghbtns.com/ "The Unofficial GitHub Watch &amp; Fork Buttons")

このブログでは次に書く候補の記事をGitHub Issueにメモしたりしてるので、記事の下にその候補を表示するようにしました。

[Issues · efcl/efcl.github.io](https://github.com/efcl/efcl.github.io/issues "Issues · efcl/efcl.github.io") にまとめてるので興味があったらコメントや`:+1`しておくと参考になります。

- [GitHubなどで使える:+1:するバッジサービスを作った | Web Scratch](http://efcl.info/2014/07/29/voting-badge/ "GitHubなどで使える:+1:するバッジサービスを作った | Web Scratch")