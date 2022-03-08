---
title: "GitHubで管理する個人向けブックマークシステムを書いた"
author: azu
layout: post
date : 2019-06-06T11:11
category: JavaScript
tags:
    - はてなブックマーク
    - Electron
    - JavaScript

---

GitHubにブックマークをコミットして管理できるはてなブックマークみたいなブックマークシステムを書きました。
詳しいモチベーションなどについては次のスライドで発表しています。

- スライド: [ブックマーク管理システム: 動くアプリをとにかく早く安く作ろう](https://azu.github.io//slide/2019/tech-link/asocial-bookmark.html)

はてなブックマークのAPIが2019/5/31ぐらいエラーを返すようになって困ったので自分用のブックマークの仕組みを突貫で作りました。
（はてなブックマーク APIは2019/6/3には直ってました。）
逆にじっくり開発していくアプリについては次のスライドで話しています。

- スライド: [考えながらクライアントサイドのウェブアプリケーションを作る話](https://azu.github.io//slide/2019/tech-link/develop-app-with-thinking.html)

## [azu/asocial-bookmark: Personal Bookmark System.](https://github.com/azu/asocial-bookmark)

socialじゃないのでasocial bookmarkです。

特に運用の費用的なコストはゼロにしたかったのと、自分用なのでややこしいワークフローになっています。
簡単にまとめると、次のような動きでブックマークの登録と検索だけを行います。

- 0. GitHubにブックマークを置くリポジトリを作る
- 1. GitHubに[postem](https://github.com/azu/postem)経由でブックマークデータをコミットする
- 2. GitHubとNetlifyを連携してブックマークデータをJSONとして配信する(privateなブックマークは特に扱ってない)
- 3. JSONデータを [はてなブックマーク検索PWA](https://hatebupwa.netlify.com/)を使って検索する

具体的な動かし方はソースを読んだり[azu/asocial-bookmark](https://github.com/azu/asocial-bookmark)のREADMEに書いています。
GitHubをファイルシステムのように読み書きをすることになるので、`fs`モジュールのようにGitHubのRead/Write/Deleteを扱うライブラリも書きました。

- [azu/korefile: File System API for Local/GitHub.](https://github.com/azu/korefile)

## 自分のブックマークシステム

とりあえず今自分のブックマークシステムは次のような感じで作ってあります。
(NetlifyのところはGitHub Action + gh-pagesなどCI/CDがあれば何でもいいと思います。)

### 1. GitHubにリポジトリを作る

- Example: `https://github.com/{your}/mybookmarks`

### 2. リポジトリに"はてなブックマーク"のブックマークを"asocial-bookmark"形式にしてインポートする
    - 手元にリポジトリをcloneしてきて、そのディレクトリ内で次のコマンドを実行
    - `$ migrate-hatenabookmark-to-asocial-bookmark --hatena <user-name>`
    - 大量の`/:year/:month/index.json`が作成されるのでコミットしてpush
    - 詳しくは[migrate-hatenabookmark-to-asocial-bookmark.ts](https://github.com/azu/asocial-bookmark/blob/master/src/cli/migrate-hatenabookmark-to-asocial-bookmark.ts)を見て下さい。

### 3. Setup CI/CD - ここでは[Netlify](https://www.netlify.com/)を使ってます

- Netlifyの`build.command`で `asocial-bookmark-create-index` を実行するとすべてのブックマークをまとめた`index.json`を作ってデプロイできます。
  - あとはこのデータにCORSヘッダをつけておきます `https://<your-bookmark>/index.json`
  - APIとしては次のようなものができあがります
  - All bookmarks: `https://<your-bookmark>/index.json`
  - All tags: `https://<your-bookmark>/tags.json`
  - Block bookmarks by month: `https://<your-bookmark>/:year/:month/index.json` 

具体的には次のような`.netlify.toml`の設定をブックマークリポジトリにおいています。

`.netlify.toml`:

```toml
# example netlify.toml
[build]
  command = "asocial-bookmark-create-index"
  functions = "functions"
  publish = "."
[[headers]]
  for = "/index.json"
  [headers.values]
    Access-Control-Allow-Origin = "*"
```

この状態でブックマークリポジトリが更新されれば、 `https://<your-bookmark>/index.json` でブックマークデータを取得できます。
(publicです)

### 4. ブックマークを[postem](https://github.com/azu/postem)経由で登録する
    - See <https://github.com/azu/postem/blob/master/src/services/asocial-bookmark/README.md>

postemについては次の記事で紹介しています。

- [Twitterやはてなブックマークにクロスポストできるクライアントアプリを書いた | Web Scratch](https://efcl.info/2019/05/01/postem/)

[postem](https://github.com/azu/postem)の`src/services/asocial-bookmark/consumer.json`にファイルを作成し、
自分のasocial-bookmarkのリポジトリについての情報を書きます。

GitHubのリポジトリが`your/watashi-no-bookmark"`なら次のような形になります。

`src/services/asocial-bookmark/consumer.json`:

```json
{
  "github": {
    "owner": "your",
    "repo": "watashi-no-bookmark",
    "ref": "heads/master",
    "token": "Github TOKEN(repo)権限"
  }
}
```

また、[postem](https://github.com/azu/postem)では`src/service.js`でクロスポストするサービスを定義できます。

次のようにすれば

- Twitter
- asocial-bookmark(デフォルトチェック)
- はてなブックマーク(デフォルトチェック)

の両方に投稿できます。

```js
const path = require("path");
module.exports = [
    {
        enabled: true,
        name: "twitter",
        indexPath: path.join(__dirname, "services/twitter/index.js")
    },
    {
        enabled: true,
        isDefaultChecked: true,
        name: "AsocialBookmark",
        indexPath: path.join(__dirname, "services/asocial-bookmark/index.js")
    },
    {
        enabled: true,
        isDefaultChecked: true,
        name: "hatebu",
        indexPath: path.join(__dirname, "services/hatebu/index.js")
    },
];
```

![postem](https://efcl.info/wp-content/uploads/2019/06/06-1559788378.png)

[postem](https://github.com/azu/postem)は[JSer.info](https://jser.info/)の更新クライアントでもあるので、
はてなブックマークより登録できる項目が多いです。
どこから見つけたのかの`viaURL`、関連するURLやタイトルなどを登録できたり、文字数制限がないです。
そのため、今はasocial-bookmarkとはてなブックマークにクロスポストしています。

### 5. ブックマークを[はてなブックマーク検索PWA](https://hatebupwa.netlify.com/)で検索する

[はてなブックマーク検索PWA](https://hatebupwa.netlify.com/)については次の記事で紹介しています。

- [モバイル/オフラインでも動作するはてなブックマーク検索のPWAを作った | Web Scratch](https://efcl.info/2018/04/16/hatebupwa/)

はてなブックマークを検索するウェブアプリですが、asocial-bookmarkのデータ構造はかなり似ているのでasocial-bookmarkも検索できるように改造しました。

- "hatena user name" に対して、自分のブックマークデータのURL( `https://<your-bookmark>/index.json` )を入れると動きます。

後は検索するだけです。

## おわりに

[azu/asocial-bookmark: Personal Bookmark System.](https://github.com/azu/asocial-bookmark)はかなり突貫で自分の需要で作りました。
ホントはServerlessな感じにしたりとかしても良かった気がしますが、ブックマークデータを単なる静的なデータとして扱ったほうが簡単そうと思ってこんな仕組みになりました。
