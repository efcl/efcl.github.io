---
title: "shepherdを使って複数のリポジトリに一括でPRを出してまとめてマイグレーションする"
author: azu
layout: post
date : 2021-05-13T08:58
category: 雑記
tags:
    - JavaScript
    - GitHub

---

複数のリポジトリに同じ変更をまとめて入れたい場合に手作業でやったり、手動でスクリプトを一から書くのは大変です。
[Shepherd](https://github.com/NerdWalletOSS/shepherd)というツールを使うことで、複数のリポジトリにまとめてPRをだして、そのPRをまとめてマージすることで複数のリポジトリに一括で変更を入れた話を書きます。

## [Shepherd](https://github.com/NerdWalletOSS/shepherd)

[Shepherd](https://github.com/NerdWalletOSS/shepherd)はマイグレーション用の設定ファイル(シェルスクリプトとIDを定義するイメージ)を書いてまとめてマイグレーションするツールです。
GitHubから対象のリポジトリをローカルに持ってくるところからPRを出すところまでがステップとしてコマンドになっているツールです。

- GitHubの検索クエリで対象のリポジトリを指定して、そのリポジトリをローカルに `checkout`
- ローカルのリポジトリに対して設定ファイルを元に変更を `apply`
- ローカルのリポジトリの変更を `commit`
- ローカルのリポジトリをGitHubへ `push`
- `push` したブランチから `pr` を出す
- `pr-status` で `pr` のステータス(CIが通ってるか)をまとめて確認

### 例: `.githook` → `.githooks` にリネーム

最近の自分のプロジェクトだと、Gitのhooksを `npm install` 時に設定する[husky](https://github.com/typicode/husky)は使わなくなっています。
代わりに、Git 2.9+の `git config --local core.hooksPath .githooks` を直接使う感じでプロジェクトの`.githooks` 以下にGit Hookのファイルを置けるようにしています。
詳しくは次の記事でも書いています。

- [Git Hooks without extra dependencies like Husky in Node.js project - DEV Community 👩‍💻👨‍💻](https://dev.to/azu/git-hooks-without-extra-dependencies-like-husky-in-node-js-project-jjp)

この`.githooks`というディレクトリを使っているのですが、試行錯誤してるときに `.githook` というディレクトリ(sがない)を使ってるリポジトリが混ざっている状態でした。
これを解決するために、[Shepherd](https://github.com/NerdWalletOSS/shepherd)を使って`.githook`ディレクトリがあったら `.githooks`ディレクトリにリネームするという処理を複数のリポジトリで実行しました。

具体的な設定ファイルは次のリポジトリにあります。

- [azu/shepherd-migration-example](https://github.com/azu/shepherd-migration-example)

[Shepherd](https://github.com/NerdWalletOSS/shepherd)はマイグレーションごとに、ディレクトリを切ってそこへ`shepherd.yml`ファイルを作ります。

```
├── 2021-04-25-githook
│   └── shepherd.yml
├── package.json
└── yarn.lock
```

`.githook`を`.githooks`へリネームするマイグレーションの定義は次のように書きました。

`2021-04-25-githook/shepherd.yml`:

```yaml
id: 2021.04.25-githook
title: Rename .githook to .githooks
adapter:
  type: github
  search_type: code
  search_query: org:azu path:/.githook
hooks:
  should_migrate:
    - ls .githook
  apply:
    - mv .githook .githooks
    - npe scripts.prepare "git config --local core.hooksPath .githooks"
  pr_message: echo "Rename .githook to .githooks"
```

この定義ファイルを使って[Shepherd](https://github.com/NerdWalletOSS/shepherd)でPRを出すまでのコマンドの流れを見ていきます。

GitHubのTokenと同じディレクトリを毎回指定するので、最初に`GITHUB_TOKEN`と`PROJECT`を定義した前提で書いていきます。

```shell
export GITHUB_TOKEN=$YOUR_GITHUB_TOKEN
export PROJECT="./2021-04-25-githook"
```

### shepherd checkout

`checkout`はマイグレーション対象のリポジトリをまとめてcloneするコマンドです。
先程の定義ファイルでチェックアウト対象を定義しています。

```yaml
adapter:
  type: github
  search_type: code
  search_query: org:azu path:/.githook
```

これはGitHubから`org:azu path:/.githook`でコード検索してヒットしたリポジトリを対象にするという意味です。

- [Search · org:azu path:/.githooks](https://github.com/search?q=org%3Aazu+path%3A%2F.githooks&type=code) (既に移行済みなので `.githooks` で検索した例)

次のコマンドで、実際に検索した結果ヒットしたリポジトリをまとめてローカルにcloneできます。

```
shepherd checkout "$PROJECT"
```

### shepherd apply

`apply`はマイグレーションの定義に基づいた変更をローカルのリポジトリにするコマンドです。
今回のマイグレーションでは次の部分で定義しています。

```yaml
hooks:
  should_migrate:
    - ls .githook
  apply:
    - mv .githook .githooks
    - npe scripts.prepare "git config --local core.hooksPath .githooks"
...
```

`should_migrate` で マイグレーションするべきかを決めます。
このコマンドの実行結果の終了ステータスが `0` ならマイグレーション対象なので `apply` のステップが実行されます。
ここでは、`.githook` というディレクトリがあるかを確認しています。

次の`apply`で実際の変更を書きます。
ここでは、`.githook`を`.githooks`にリネームしています。
[`npe`](https://www.npmjs.com/package/npe)で、`package.json`内の定義も同じようにリネームしています。

次のコマンドで、この定義に基づいた変更を適用します。(ここではコミットはまだされない)

```
shepherd apply "$PROJECT"
```


ここで変更を試して、上手く行ってない場合は`shepherd reset`でやり直せます。

```
shepherd reset "$PROJECT"
```

### shepherd commit

`apply`でローカルに変更が入っているので、これをコミットします。

次のコマンドで、まとめてコミットできます。

```
shepherd commit "$PROJECT"
```

ここでのブランチ名は定義ファイルの`id: 2021.04.25-githook`を使っています。
そのため、idはブランチ名として重複しないものを使うのが良いと思います。

### shepherd push

まだローカルでの変更なので、これをGitHubなどに対してまとめてpushします。

次のコマンドで、まとめてpushできます。

```
shepherd push "$PROJECT"
```

### shepherd pr

ここまででリモートリポジトリにブランチがある状態なので、`shepherd pr`コマンドでブランチをPRとして出せます。

```
shepherd pr "$PROJECT"
```

PRのタイトルは `title: Rename .githook to .githooks`、
PRのBodyは `pr_message: echo "Rename .githook to .githooks"`を元に決まっています。

`SHEPHERD_*`な環境変数でリポジトリ名なども使えるので、リポジトリごとに変えたい場合はこの辺の環境変数が利用できます。

### shepherd pr-status

PRを出すと、各リポジトリでCIなどが走ってステータスチェックが入ります。
次のコマンドでこのステータスチェックの状態もまとめて取得できます。

```
shepherd pr-status "$PROJECT"
```

実際に実行してみると、リポジトリごとのPRの状態とURLがまとめててにはいります。(既にマージ済み)

```
$ shepherd pr-status "./2021-04-25-githook"

[azu/New-Year-holidays-jser-releases] 1/32
PR #1 [https://github.com/azu/New-Year-holidays-jser-releases/pull/1]
PR was merged at 2021-04-25T14:06:23Z

[azu/book-rss] 2/32
PR #1 [https://github.com/azu/book-rss/pull/1]
PR was merged at 2021-04-25T14:06:24Z

[azu/break-sandbox-extension] 3/32
PR #1 [https://github.com/azu/break-sandbox-extension/pull/1]
PR was merged at 2021-04-25T14:06:26Z
...
```

### shepherdのPRをまとめてマージする

あとは、PRを一個ずつマージしていくだけです。

ただ、今回の`.githook`を`.githooks`にリネームみたいなものはCIを見る意味もほぼないので、まとめてマージしたいです。
shepherdには[まとめてPRをマージするコマンドがまだない](https://github.com/NerdWalletOSS/shepherd/issues/83)です。
そのため、[GitHub CLI](https://cli.github.com/)を使ってまとめてマージしました。

[GitHub CLI](https://cli.github.com/)には`gh pr merge -m {url}`でPRをマージできるコマンドがあります。
`shepherd pr-status` の結果からPRのURLを取得して、このURLに対してまとめてマージすれば一括マージができました。

```
shepherd pr-status "$PROJECT" | grep -o -e "https://github.com/[^/]*/[^/]*/pull/[0-9]*" > urls.txt
cat urls.txt | xargs -IXXX gh pr merge -m XXX
```

## おわりに

[Shepherd](https://github.com/NerdWalletOSS/shepherd)を使ってまとめて複数リポジトリに変更を入れる方法を書きました。
他にも類似するツールはありますが、ローカルで変更を書けるのが安全だしやっぱり楽な気はします。

[Octoherd CLI](https://github.com/octoherd/cli)のような、APIベースならローカルにcloneしなくていいのでもっと早いです。
しかし、APIベースで[リネーム](https://github.com/jser/jser.github.io/blob/develop/actions/update-draft-pr/src/rename.ts)や[ファイルの読み書き](https://github.com/azu/korefile)はものすごく面倒くさいので、普通のシェルコマンドでできるのがやっぱり楽かなという感じでした。

類似するツールは最近色々出てきているので、目的によって適切なツールを使ってやるのが良いと思いました。

## 類似するツール

- [octoherd/cli: CLI to run a octoherd scripts on one or multiple repositories](https://github.com/octoherd/cli)
- [FormidableLabs/multibot: A friendly multi-repository robot.](https://github.com/FormidableLabs/multibot)
- [任意のPull Requestの内容を複数のリポジトリに対して一括コピーするツールpr-bulletを作った - Copy/Cut/Paste/Hatena](https://k1low.hatenablog.com/entry/2021/05/11/083000)