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


