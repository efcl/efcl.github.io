---
title: "Bluesky/GitHub/Calendar/RSSをNotionに同期するbluenotiondbを作った"
author: azu
layout: post
date : 2023-09-09T12:11
category: JavaScript
tags:
    - Blusky
    - GitHub
    - RSS
    - Notion
    - Bun

---

Notionには[同期データベース](https://www.notion.so/ja-jp/help/link-previews-and-synced-databases#%E5%90%8C%E6%9C%9F%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9)としてGitHubやJiraなどを同期できるDBがありますが、任意のサービスには対応していません。
もっと色々なサービスと同期するNotionのデータベースが欲しかったので、[bluenotiondb](https://github.com/azu/bluenotiondb)というツールを作りました。

- [azu/bluenotiondb: Sync Bluesky/GitHub/Calendar/RSS to Notion.](https://github.com/azu/bluenotiondb)

## [bluenotiondb](https://github.com/azu/bluenotiondb)

bluenotiondbは、色々なサービスからデータを取得してそのデータをNotionのデータベースに追加するツールです。

現状では次のサービスに対応しています。

- [Bluesky](https://bsky.app/)
    - Pull Posts from Bluesky and push to Notion
- [GitHub Activity](https://github.com/)
    - Pull events of GitHub user and push to Notion 
    - Open/Close/Comment of Issues/PRs etc...
- [GitHub Search](https://github.com/search)
    - Pull Issues/PRs or Repositories from GitHub Search and push to Notion
- iCal calendar like [Google Calendar](https://calendar.google.com/)
    - Pull events from iCal and push to Notion
    - **Required**: need to setup `actions/cache` action to prevent duplicated items
- RSS Feeds
    - Pull posts from RSS Feeds and push to Notion
    - **Required**: need to setup `actions/cache` action to prevent duplicated items

Blueskyの投稿やGitHubアクティビティや検索結果、またiCalに対応しているのGoogleカレンダーの予定、RSSフィードを自動的にNotionデータベースに同期できます。

bluenotiondbは、[Bun](https://bun.sh/)で書かれたただのCLIツールになっていて、
どのサービスを取得するか、同期先のデータベースは`BLUENOTION_ENVS`という環境変数で指定する形になっています。

## bluenotiondbの使い方

## Setup Notion

1. [Notion Template](https://efcl.notion.site/Demo-Bluenotion-0f9885a393874c2aa7a4765ff5ddf0be)を複製
2. Notion Integrationを作成してAPIキーをコピー
    - <https://www.notion.so/my-integrations>
    - Copy the API key
3. 作成したIntegrationを複製したデータベースに"コネクトを追加"します
4. `BLUENOTION_ENVS`の環境変数を[bluenotiondb env generator](https://azu.github.io/bluenotiondb/)で作成します

[bluenotiondb env generator](https://azu.github.io/bluenotiondb/)は、`BLUENOTION_ENVS`の環境変数を生成するためのツールです。

必要な設定は同期したいものを選んで入力すれば、`BLUENOTION_ENVS`の環境変数を生成できます。

たとえば、次の設定は、Blueskyの投稿を同期、GitHubのアクティビティをNotionデータベースに同期するための設定です。
見るとわかりますが、`BLUENOTION_ENVS`には配列で複数のサービスの設定を書くことができます。

```
BLUENOTION_ENVS='[{"notion_database_id":"xxxx_xxxx_xxx","notion_api_key":"secret_xxx","bluesky_identifier":"test.bsky.app","bluesky_app_password":"xxx-xxx-xxx"},{"notion_database_id":"xxxx_xxxx_xxx","notion_api_key":"secret_xxx","github_token":"ghp-xxxx-xxx","github_user_name":"test"}]'
```

## CLIで実行する

Linuxのバイナリしか[配布](https://github.com/azu/bluenotiondb/releases)はしてないですが、CLIで実行できます。
ローカルで作る場合は、リポジトリをクローンして`bun install && bun run dist`で作成できます。

```
$ BLUENOTION_ENVS='[...]' ./bluenotiondb
```

## GitHub Actionsで定期的に実行する

GitHub Actionsでは定期的な実行をサポートしてるので、GitHub Actionsで定期的に同期することができます。

1. 適当なPrivateリポジトリを作成します
2. `.github/workflows/update.yml` というファイルを作成します
3. <https://github.com/azu/bluenotiondb/releases/latest>に書かれているWorkflowを`.github/workflows/update.yml`にコピーします
4. `BLUENOTION_ENVS`をGitHub Actionsのsecretsに設定します

バージョンやタスクによって設定は異なりますが、次のようなWorkflowを書くことで定期的に同期できます。

```yml
name: Update
on:
  push:
    branches:
      - main
  schedule:
    # every 30 minutes
    - cron: "*/30 * * * *"
  workflow_dispatch:

env:
  BLUENOTION_VERSION: v1.0.0

permissions:
  contents: none
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Download
        run: |
          curl -L https://github.com/azu/bluenotiondb/releases/download/${{env.BLUENOTION_VERSION}}/bluenotiondb -o bluenotiondb
          chmod +x bluenotiondb
      - name: Update
        run: ./bluenotiondb > /dev/null 2>&1
        env:
          BLUENOTION_ENVS: ${{ secrets.BLUENOTION_ENVS }}
```

## 細かい設定

`BLUENOTION_ENVS`に設定をすべて入れるようにしているので、かなり柔軟に色々な設定ができます。
たとえば、Notionのテンプレートでは`Title`や`URL`といったカラム名が決まっていますが、これは`notion_property_names`で変更できます。
また、`notion_extra`で特定の値を上書きしたり、追加したりもできます。

そのため、Bluenotion専用のデータベースじゃないところに定期的に同期するという使い方もできます。
詳しくは次のドキュメントを参照してください。

- [Advanced Usage](https://github.com/azu/bluenotiondb#advanced-usage)

## 作った理由

Notionに発生したイベントや予定などをまとめようとして使えるものが見つからなかったので作りました。
Blueskyの投稿やGitHubのアクティビティなどを記録しておくと、その日に何をしたかを振り返るのに役立ちます。

![timeline](https://efcl.info/wp-content/uploads/2023/09/09-1694230548.png)

また、自分の場合は作成したリポジトリを記録するようにして、ブログを書くときに参考にしています。

```
BLUENOTION_ENVS='[{"notion_database_id":"xxxxxx","notion_api_key":"secret_xxxx", "github_token":"ghp_xxxx","github_search_query":"user:@me created:>={{-1day}}","github_search_type":"REPOSITORY","notion_extra":{"Type":{"select":{"name":"My GitHub Repository"}}}}]'
```

![作成したリポジトリ](https://efcl.info/wp-content/uploads/2023/09/09-1694230642.png)

他にも色々な情報がNotionへと自動的に集まるようにしています。

- Gitコミット
    - GitコミットHooksでのコミットメッセージを記録してる
    - [GitコミットをNotionに記録してみてる | Web Scratch](https://efcl.info/2023/01/25/gil-notion-git-log/)
- 📝 Notes
    - VSCodeで書いた一時的なメモを保存する際に、自動的にNotionへ同期
- [Bluesky](https://bsky.app/)
    - [bluenotiondb](https://github.com/azu/bluenotiondb)で同期
- [GitHub](https://github.com)
    - [bluenotiondb](https://github.com/azu/bluenotiondb)で同期
    - アクティビティ(作成したリポジトリ、Issue、PR、push、Release)などが記録される
- Gmail
    - https://github.com/azu/gmail-to-notion で、`GmailのGTD/*` 系を取り込んでいる
    - メールで特定のラベルをつけたものをNotionに同期
- メモリーノート: 突発的なメモ
    - https://github.com/azu/memory-note で作成
    - [記憶に残らないものをメモするためにMemory Noteという仕組みを書いた | Web Scratch](https://efcl.info/2021/09/26/memory-note/)
    - 音声でメモできるので、忘れないうちに追加できる
- 買い物
    - https://github.com/azu/memory-note の worker
    - [記憶に残らないものをメモするためにMemory Noteという仕組みを書いた | Web Scratch](https://efcl.info/2021/09/26/memory-note/)
    - 音声でメモできるので、忘れないうちに追加できる
    - iOSのダッシュボードでwidgetとしても見れる
- カレンダー
    - [bluenotiondb](https://github.com/azu/bluenotiondb)でGoogleカレンダーの予定を同期
- ブログ候補
    - 新しく作ったものをブログとして書くので、[bluenotiondb](https://github.com/azu/bluenotiondb)でGitHubの検索結果を同期してる

自分の場合はタスク管理とデータベース、あとはストック的なドキュメント置き場としてNotionを使っています。
毎日見るデイリーページが日付毎にあるので、[bluenotiondb](https://github.com/azu/bluenotiondb)で作成したアイテムは、そのデイリーページにRelationで紐づけています。

最近でた[データベースオートメーション](https://www.notion.so/ja-jp/help/database-automations)で、データベース間のRelationもNotion側で自動化できるようになりました。
これによって、デイリーページを見るだけで、やること(タスク/カレンダー)とやったこと(Bluesky/GitHub)などが一覧できるようになったのが便利です。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">NotionのDatabase Automationを使えば、<br>DB同士のRelationも自動化できることがわかった(ページを追加した時に、Relation先のDBをフィルターで特定のページだけになるようにして追加する)ので、<br><br>日付ごとに作ってるダッシュボード的なページに、今日作成したものを紐付けるようにしたらだいぶ便利。 <a href="https://t.co/b4QWnHkmnI">pic.twitter.com/b4QWnHkmnI</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1700108926325600420?ref_src=twsrc%5Etfw">September 8, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

[bluenotiondb](https://github.com/azu/bluenotiondb)で色々な情報を取り込もうと思った理由として、NotionのMentionで参照できるようにするためです。
たとえば、Blueskyに投稿して、それをタスクとしてやろうと思ったときに同じことタスクに書くのは面倒ですが、自動的に同期されているならmentionするだけで参照できます。

![mention](https://efcl.info/wp-content/uploads/2023/09/09-1694231484.png)

### bunでのバイナリ配布

[bluenotiondb](https://github.com/azu/bluenotiondb)は[Bun](https://bun.sh/)を使って書かれていますが、
[Bun](https://bun.sh/)を使って良かったのは、[`bun build`](https://bun.sh/docs/bundler)で単一実行バイナリを作成できる点です。

GitHub Actionsで実行する場合は、Linux向けのバイナリを[リリースページ](https://github.com/azu/bluenotiondb/releases)にアップロードしておけば、それをcurlで取得して実行するだけの簡単な設定で済みます。
また、これによって余計なものをダウンロードしなくてよくなるので、実行時間も短くなります。

ちょうどBun 1.0もリリースされたので、こういうバイナリだけのツール用途はNode.jsやDenoよりもBunの方が楽だった感じはします。

- [Bun 1.0 | Bun Blog](https://bun.sh/blog/bun-v1.0)
