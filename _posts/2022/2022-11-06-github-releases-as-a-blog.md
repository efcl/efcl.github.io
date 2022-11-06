---
title: "1クリックで始めるGitHubリリース as a ブログ"
author: azu
layout: post
date : 2022-11-06T20:31
category: 雑記
tags:
    - Blog
    - GitHub

---

[GitHubリリース](https://docs.github.com/ja/repositories/releasing-projects-on-github/managing-releases-in-a-repository)という、GitHubでタグに対してリリースノートを書ける機能があります。

このリリースノート機能は、パーマネントリンクもあるし、Markdownも書けるし、画像もアップロードできるし、絵文字でリアクションもできるし、RSSもあるし、通知機能もあるし、GitHub Discussion連携すればコメントも書けるし、全文検索もついてくるしこれブログとして使えるんじゃないかと思いました。

そういう発想から、GitHubリリースノートをブログとして運用するためのちょっとしたブログシステムを作って使っています。

次のリポジトリが実際に動いてるものです。

- [azu/book-review: 本を読んだ感想を書くブログです。](https://github.com/azu/book-review)

リリースの一覧を見ると本の感想の記事が並んでいます。

- [Releases · azu/book-review](https://github.com/azu/book-review/releases)
  - [Release 伴走型支援: 新しい支援と社会のカタチ を読んだ。 · azu/book-review](https://github.com/azu/book-review/releases/tag/12)

単純にリリースノート機能を使うのとは若干フローを変えていて、GitHub Issueにドラフトを管理できるようにしていて、
複数のIssueで書いたドラフトをまとめて一つの記事としてリリースノートに公開できるワークフローを実装しています。
(Zennのスクラップ機能や1日に複数の記事を書けるはてなダイアリーとかに近いようなイメージです)

このリポジトリはテンプレートリポジトリになっていて、ワンクリックで同じ仕組みを持ったリポジトリブログを作成できます。

# GitHub Releasesブログのセットアップ方法

このブログシステムを使いたい人向けのガイドです。

1. 次のリンクからリポジトリをテンプレートにして新しいリポジトリを作成: <https://github.com/azu/book-review/generate>
2. 作成したリポジトリの `https://github.com/{owner}/{repo}/actions/workflows/setup.yml` にアクセスし"Run Workflow"を実行する
   - 必要なラベルなどがセットアップされます
3. [必要なら] リポジトリのSettingsからDiscussionsを有効にする
   - Discussionsをブログへのコメントする場所として利用できます

## 使い方

[azu/book-review: 本を読んだ感想を書くブログです。](https://github.com/azu/book-review)のような読書ブログを書きたい場合は、次のような使い方ができます。

1. Issueを作り、タイトルに書籍のタイトルを入れて、本文に感想を入れる
2. Issueに"Status: Draft"のラベルを付ける
3. GitHub Actionsが"Status: Draft"のIssueをまとめたDraft Releaseを自動的作成する
4. 公開したくなったらDraft Releaseを編集して、Publishすると公開され、"Status: Draft"のIssueは閉じられる

複数の書籍を若干並行して読むことがあったり、テーマで読書するときは同時に読むことがあります。
そういう時にそれぞれの本に対応するIssueと作って、そこに感想を書いておけば、まとめて一つの記事として公開できます。
もちろん、一冊ずつ書いても問題ないです("Status: Draft"がついてるものだけが自動的にまとめられるので、一冊ずつリリースしていけばいけます)

もっと別の使い方として、[JSer.info](https://jser.info/)のような1週間の間にあったニュースをまとめるようなブログサイトも作れます。

- サンプルリポジトリ: [jser/blog-example: GitHub Releases as a Blog like JSer.info](https://github.com/jser/blog-example)

次のように、Issueごとに紹介したい記事を書いていきます。
この時にラベルをその記事のタグとして使うこともできます。(テンプレート側を少し変更して対応しています)

![Issue](https://efcl.info/wp-content/uploads/2022/11/06-1667735417.png)

Issueを編集したり、ラベルをつけたりするとGitHub Actionsで自動的にドラフトリリースノートを作成してくれます。

![Draft Release Note](https://efcl.info/wp-content/uploads/2022/11/06-1667735444.png)

あとは、リリースノートにタイトルをつけて公開すればOKです。

- [Release 2022-11-06のJavaScript · jser/blog-example](https://github.com/jser/blog-example/releases/tag/1)

Tipsとして、GitHub issueのタイトルとBodyは `https://github.com/jser/blog-example/issues/new?title=test&body=body` のようにURLから指定もできます。また、Issueテンプレートを使うとフォームなども利用できます。

- [Issue フォームの構文 - GitHub Docs](https://docs.github.com/ja/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)

## 機能の一覧

このGitHub Releases as a blogの機能を書き出してみると、GitHubリリースノート自体の機能が色々あるのでかなり高機能です。

- スクラップ機能
  - Issueごとにスクラップを書いて、Releasesでまとめて1つの記事として公開できます
- ドラフト と 公開済みのライフサイクル
  - Issueが個別のドラフトになります
  - `Status: Draft` ラベルをつけたIssueをドフラトとして扱います
    - ラベルがついてないIssueは対象外となるので、ドラフトではないIssueも混在できます
  - Issueが編集されるたびにGitHub Actionsで、GitHub Releasesにドラフトリリースノートを作成します
    - このドラフトリリースノートには、その時点で`Status: Draft` ラベルがついたIssueが全てまとめられています
  - ドラフトリリースノートをPublishすると、`Status: Draft` ラベルがついたIssueが全て自動でクローズされ、`Status: Released`ラベルを付与します
  - このライフサイクルは[.github/workflows/create-draft.yml](.github/workflows/create-draft.yml)が処理しています
- プロジェクト管理
  - [GitHub Projects](https://docs.github.com/ja/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)を使うことで、ドラフトや公開済みのIssueを管理できます
  - `Status: Draft`ラベル: ドラフト
  - `Status: Released`ラベル: 公開済み
  - ラベルは setup.yml のworkflowを実行すると追加できます
- テンプレート
  - [actions/create-draft/src/template.ts](actions/create-draft/src/template.ts) を編集する
- タグ = ラベル
  - テンプレートを編集して、ラベルをタグとして扱うこともできます
  - https://github.com/jser/blog-example
- 画像/動画サポート
  - Issueにそれぞれアップロードできます
- RSS
  - GitHub ReleasesのリリースノートはRSSで購読できる
- GitHubと連携したWatchの仕組み
  - GitHubアカウントを持っているならWatchで購読できる
- コメントシステム = Discussion
  - リリース時に"Create a discussion for this release"を選択することでコメント欄として使えるDiscussion連携ができる
  - また、リリースごとにリアクションボタンが表示される
- 共同編集
  - リポジトリに書き込めるユーザーを制限することで、執筆者を管理できます
  - Issueを編集すれば、共同編集ができます
  - Issueを立てた人が、そのIssueの執筆者となります
- 著者表記
  - 記事中で `@azu` のようにMentionを入れると、自動的にContributorsとして記事の下部に表示されます。
- 検索
  - <https://github.com/azu/book-review/releases>には全文検索がついています
- Markdown
  - GitHub Issuesに書けるMarkdownは全て対応しています
  - [Basic writing and formatting syntax - GitHub Docs](https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
  - [Working with advanced formatting - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting)
- アクセス解析
  - Insight > TrafficからPV数を確認できます
- OGPイメージ
  - GitHubが自動的に生成してくれます
- ワークフロー
  - GitHub Actionsで `on: release` のWorkflowで公開時にWorkflowを実行できます
  - リポジトリのWebhook設定で Releases のWebhookを設定できます
  - e.g. 記事を公開するときにSNSにポストするなど

URLはドメインを使えないことやUIが変更できないとかの問題はありますが、GitHubアカウントだけで簡単に始められます。

読者側が開発者ならGitHubアカウントを持ってるので、通知方法もあり結構スマートです。
GitHubアカウントを持ってなくてもRSSやWebhookなどの連携を使えば、色々できると思います。

- リポジトリの Watch →　Custom →　Releases を購読するとリリースだけを購読できます
  - GitHubアカウントが必要です
  - [GitHub Notification](https://github.com/settings/notifications)に基づいた通知方法で更新を通知します
  - デフォルトでは[Notifications](https://github.com/notifications?query=is%3Arelease)とGitHubに登録してるメールに通知が来ます
- RSSで読みたい場合は <https://github.com/azu/book-review/releases.atom> を購読できます
  - こちらはGitHubアカウントは不要です
  - 任意のRSSリーダやSlack(`/feed subscribe https://github.com/azu/book-review/releases.atom`)などで購読できます

また、GitHubリリースノートにはリアクションボタンやDiscussions連携もできるので、ホスティングのブログサービスとそこまで機能差はないのかなという感じもします。
著者のGitHubアカウントをフォローできたり、[GitHub Sponsors](https://github.com/sponsors)の機能で著者を支援することもできます。

## おわりに

GitHubリリースをブログとして使う方法について紹介しました。
結構冗談みたいな使い方ですが、意外と実用的でGitHub Actionsと組み合わせると色々な遊び方ができる気がします。

- [azu/book-review: 本を読んだ感想を書くブログです。](https://github.com/azu/book-review)

元々はJSer.infoみたいなサイトをどうやったら簡単に作れるだろうかという思考からスタートしていて、去年[HubMemo](https://github.com/azu/hubmemo)を作ったのは同じ理由です。

- [azu/hubmemo: Private/Public Memo system based on GitHub.](https://github.com/azu/hubmemo)
- [JSer.info 10周年: JavaScript情報の集め方、書き方、まとめ方 - JSer.info](https://jser.info/2021/01/16/jser-10th/)

この仕組みは、去年あたりからこの辺の情報サイトをどうやったら簡単に作れるかを考えていましたが、
この方法ならGitHubだけで完結するので、結構手軽だと思います。

- [今年のオープンソース活動振り返り @ 2021 | Web Scratch](https://efcl.info/2021/12/31/open-source-in-2021/)

ニュースサイトみたいなやつはワンクリックで使えるようなフレームワークがあった方がやる人がもっと増えるし、続けやすいと思います。
JSer.infoを10年以上やっていて、大きな記事を一発で書くのは失敗した時に停滞のリスクが高いので、
小さな記事を小さなイテレーションで回すことが大切だと思っています。

一度停止すると1週間、2週間、1ヶ月と長くなって、最終的には完全に止まります。
そのため、小さく進めて仮に止まっても小さく止まるようにするのが、続けるコツな気がします。

この辺の話は次の記事でも書いています。

- [Maintainer Month: オープンソースをメンテナンスするコツ | Web Scratch](https://efcl.info/2022/06/27/maintenance-open-source/)
- [JSer.infoの作り方](https://azu.github.io/slide/2017/jser_info/how_to_make_jser_info.html)
- [JSer.infoを開始してから7年が経ちました - JSer.info](https://jser.info/2018/01/15/jser-info-7years/)

このブログシステムは、1 issue単位で小さく進めて、それが溜まったら記事(リリースノート)としてまとめて公開するという、JSer.infoでやってる仕組みが実現できてるんじゃないかなという感じがします。
あと、Issueで進めることで複数人が同時に参加しやすくオープンな感じなのが、結構面白い特徴になる気がしています。
(普通のホスティング系のブログとかはこういうがかなり難しい気がします)

この仕組みはけっこう気に入ってますが、あとは実際どうやったらもっとやる人が増えるのかなーというアイデアを募集しています。