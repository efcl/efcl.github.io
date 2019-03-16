---
title: "はてなブックマークのタグを一括置換するコマンドラインツールを書いた"
author: azu
layout: post
date : 2019-02-06T09:24
category: JavaScript
tags:
    - hatena
    - はてなブックマーク
    - JavaScript
    - nodejs

---

はてなブックマークで自分のブックマークの既存のタグ名を変更した時に一括置換したいことがあります。
以前は公式の[タグの一括置換/削除機能の追加](http://hatena.g.hatena.ne.jp/hatenabookmark/20050705/1120551799)がありましたが、ブックマーク一覧ページのリニューアル時に消えてしまったようです。

- [ユーザーのブックマーク一覧ページのシステムリニューアルを行いました - はてなブックマーク開発ブログ](http://bookmark.hatenastaff.com/entry/2017/11/21/191340)

[Firefoxのアドオン版](https://github.com/hatena/hatena-bookmark-xul)でも同様の機能がありましたが、もう動かなくなっているので、はてなブックマークのタグを一括置換するコマンドラインツールを書きました。

- [azu/hatenabookmark-rename-tags: A CLI that replace all hatena bookmark tags.](https://github.com/azu/hatenabookmark-rename-tags)

## [hatenabookmark-rename-tags](https://github.com/azu/hatenabookmark-rename-tags)

[hatenabookmark-rename-tags](https://github.com/azu/hatenabookmark-rename-tags)は[はてなブックマーク REST API](http://developer.hatena.ne.jp/ja/documents/bookmark/apis/rest)と[search.data](https://github.com/azu/hatebu-mydata-parser/blob/master/doc/search.data-format.md)を使ってタグの一括置換を行います。はてなブックマークには自分の(privateを含めた)ブックマーク一覧を取得する方法はないため、このコマンドラインツールは*public*なブックマークのみを扱います。

また、REST APIを叩くためにOAuth認証をしたアクセストークンが必要なので、リポジトリにはアクセストークンを取得するElectronアプリもおいています。

## 使い方

次のステップでタグのリネームを行います。

1. OAuth認証をしてアクセストークンを取得
2. `hatenabookmark-rename-tags`でリネーム

### 1.OAuth認証をしてアクセストークンを取得

リポジトリを`git clone`して中に含まれているElectronアプリを実行します。
ロックファイルをおいているので[yarn](http://yarnpkg.com/)推奨ですが、npmでも多分通ると思います。

```
git clone https://github.com/azu/hatenabookmark-rename-tags
cd hatenabookmark-rename-tags
yarn install
yarn run get-token
```

`yarn run get-token` を実行するとElectronアプリが起動するので、リネームしたいはてなアカウントでログインすると次のアクセストークンが取得できます。

この2つのアクセストークンがリネームスクリプトで必要なので、コピーしておいてください。

- `HATENA_ACCESS_TOKEN`
- `HATENA_ACCESS_SECRET`



### 2. `hatenabookmark-rename-tags`でリネーム

アクセストークンが取得できたら、 `hatenabookmark-rename-tags` をインストールします。
`hatenabookmark-rename-tags`は環境変数で先ほどのアクセストークンを渡して実行します。
(コマンドライン引数では渡せるようにまだしてないので、必要な人はPRお願いします。)

```
npm install -g hatenabookmark-rename-tags
HATENA_ACCESS_TOKEN="___" HATENA_ACCESS_SECRET="____" hatenabookmark-rename-tags [option]
```

`hatenabookmark-rename-tags -h` でヘルプがでると思いますが、使い方は次の通りです。

**CLI Usage**:

    Usage
      $ hatenabookmark-rename-tags --user <user> --before <tag> --after <tag>
     
    Options
      --user Hatena User Name
      --before a Tag name that is old name
      --after  a Tag name that is new name
      --reload prune cache data and fetch your bookmarks if this flag is specified
     
    Examples
      $ HATENA_ACCESS_TOKEN="___" HATENA_ACCESS_SECRET="____" hatenabookmark-rename-tags --user test --before "js" --after "JavaScript"
      # ignore cache data
      $ HATENA_ACCESS_TOKEN="___" HATENA_ACCESS_SECRET="____" hatenabookmark-rename-tags --reload --user test --before "before" --after "after"

たとえば、`js`タグを`JavaScript`に一括置換したい場合は、次のように実行します。
アクセストークンとユーザー名は自分のものにしてください。

```
HATENA_ACCESS_TOKEN="___" HATENA_ACCESS_SECRET="____" hatenabookmark-rename-tags --user test --before "js" --after "JavaScript"
```

`hatenabookmark-rename-tags`は[search.data](https://github.com/azu/hatebu-mydata-parser/blob/master/doc/search.data-format.md)の内容を`.cache/search.data`にキャッシュしています。
そのため、実行以降に登録した新しくブックマークなども置換したい場合は`--reload`オプションを使ってキャッシュを更新してください。([search.data](https://github.com/azu/hatebu-mydata-parser/blob/master/doc/search.data-format.md)の取得は重たいので負荷防止のためです。)

## :memo: Develop Notes 

ElectronアプリでOAuthの部分は以前書いた[electron-authentication-hatena](https://github.com/azu/electron-authentication-hatena)を使っています。(GitHubやTwitterみたいに自分向けのアクセストークンを簡単に発行する方法はないのかな?)

はてなブックマーク REST APIの実行には[bouzuya/node-hatena-bookmark-api](https://github.com/bouzuya/node-hatena-bookmark-api)を使っています。

<del>おそらくはてなブックマークのサーバ側の問題だと思っていますが、REST APIで`tags`に日本語のタグがあると`401 Unauthorized`で登録/更新に失敗する気がしています。</del>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">んーなんではてなブックマーク更新すると401が変えるんだろ?<br>なんか特定のものだけ失敗する感じだけど、いまいち共通点がわからない…<br><br>API叩くのはこれ使ってるけど、サーバのレスポンスがおかしいのかな。<a href="https://t.co/pwArvRy0Au">https://t.co/pwArvRy0Au</a><br><br>1/4 ぐらいが更新に失敗する。<br>寝る<a href="https://t.co/yXgYOOxYzm">https://t.co/yXgYOOxYzm</a> <a href="https://t.co/wVUxy1oIhB">pic.twitter.com/wVUxy1oIhB</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1092461422808715265?ref_src=twsrc%5Etfw">February 4, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<p><ins>2019-03-16追記: はてなブックマークAPI側で修正されました </ins></p>

- [【開発者向け情報】はてなブックマーク REST API で特定条件下においてブックマークの追加・更新に失敗する不具合を修正しました - はてなブックマーク開発ブログ](http://bookmark.hatenastaff.com/entry/2019/03/06/121008)


これを回避するために、`tags`クエリではなくコメントとしてタグを書くようにしています。

- https://github.com/azu/hatenabookmark-rename-tags/blob/0f4aae3ff7404a94a6b60c7a9ea260b384ecfece/src/hatebu-client.ts#L34-L37

```
[tag][タグ]comment
```

のようなコメント形式でタグを書けば、日本語のタグも登録できました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">できたー。<br>tagクエリじゃなくて<br><br>[tag]comment<br><br>形式のメッセージならタグに日本語が含まれてもOK<a href="https://t.co/wy9fM8ITJy">https://t.co/wy9fM8ITJy</a><br><br>はてなブックマークの更新API tagクエリバグってそう。<br>エンコード周り</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1092580264692183040?ref_src=twsrc%5Etfw">February 5, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
