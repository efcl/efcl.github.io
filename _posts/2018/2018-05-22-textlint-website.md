---
title: "textlintのウェブサイトをリニューアルしました"
author: azu
layout: post
date : 2018-05-22T19:46
category: textlint
tags:
    - textlint
    - website

---

[textlint](https://github.com/textlint/textlint "textlint")のウェブサイトをリニューアルして、ドキュメントもウェブサイトで見られるようにしました。

- [textlint · The pluggable linting tool for text and markdown](https://textlint.github.io/)

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">textlintの新しいウェブサイトを公開しました！<a href="https://t.co/sdlESYG1IT">https://t.co/sdlESYG1IT</a><br><br>textlint使ってるプロジェクトとか企業リストの追加はこちらからPRできます。<a href="https://t.co/dK7n8lkLkQ">https://t.co/dK7n8lkLkQ</a> <a href="https://t.co/kc5tqkKjml">pic.twitter.com/kc5tqkKjml</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/997505897046855681?ref_src=twsrc%5Etfw">May 18, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

以前はデモ的なものが置いてあるだけでしたが、今回は[Docusaurus](https://docusaurus.io/en/)を使ってドキュメントもウェブサイト上で見たり、検索できるようになっています。

- [textlintの公式サイト(オンラインデモ)を作りました | Web Scratch](https://efcl.info/2016/02/24/textlint-online-demo/)

[DocSearch](https://community.algolia.com/docsearch/)を使った全文検索も入っているのでリポジトリを直接見るよりは探しやすいと思います。

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="ja" dir="ltr"><a href="https://t.co/sdlESYG1IT">https://t.co/sdlESYG1IT</a> でDocSeachを使った全文検索ができるようになりました！ <a href="https://t.co/1bIkAUKo52">pic.twitter.com/1bIkAUKo52</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/998913149125341184?ref_src=twsrc%5Etfw">May 22, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

また、textlintをプロジェクトや会社で使ってる人は[Usersページ](https://textlint.github.io/users.html)にアイコンを追加できます。

[![textlint users](https://efcl.info/wp-content/uploads/2018/05/textlint.github.io_users.png)](https://textlint.github.io/users.html)

<https://github.com/textlint/textlint/edit/master/website/siteConfig.js>の`users`という変数にロゴやURLを追加するPull Requestを出すだけです。

是非Pull Requestを出してみてください！

## textlintについて

ウェブサイトも新しくなったのでこれからもドキュメント面などを充実させていきたいです。
特にルールの作り方周りについては`npm init`/`yarn create`の対応などもっと分かりやすく作りやすくしたいです。

[textlint-filter-rule-whitelistとルール独自のallowオプションによる正規表現の違いに注意する - Qiita](https://qiita.com/khsk/items/ff9f7c015e69e2eb1017)でも話されていましたが、ルールによってオプションやドキュメントのバラ付きがあるのもどうにかしていきたいです。(リポジトリが分かれているのでどうしてもばらつきが出てくる。今回は[@textlint/regexp-string-matcher](https://github.com/textlint/regexp-string-matcher)というライブラリを作って動作を統一していく)

また、ルールのメッセージも完全に自由なので、i18n対応なども見据えてある種のパターンを作るなどして、利用者からみてより分かりやすくしていきたいです。

- [Custom messages support · Issue #252 · textlint/textlint](https://github.com/textlint/textlint/issues/252)

興味がある人は[Issues · textlint/textlint](https://github.com/textlint/textlint/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)などを見てください。
Pull RequestやIssueはいつでも歓迎しています。

### ルール関係

[ニューラルネットワークを用いた日本語学習者の文章における不自然箇所検知](http://db-event.jpn.org/deim2018/data/papers/298.pdf)(via [最終論文集](http://db-event.jpn.org/deim2018/post/proceedings/#session_G3))でもtextlintが引用されていましたが、そろそろクライアントサイドでも機械学習を使ったルールというものができてもおかしくはないんじゃないかなと思いました。

textlintが特徴的なのはソースが公開されていて、サーバにデータを送ることなくクライアント側で動作する点にあると思うので、その辺はもっと見ていきたいですね。

また、最近[Proofdict · A dictionary engine that based on one rule per one file.](https://proofdict.github.io/)という自分用辞書を作るというプロジェクトをやっていて、実際に自分で使っている分には問題なのでもうそろそろしたら何か書こうと思います。

簡単に書くと自分用の1ルール1ファイルの辞書をGitHubリポジトリをforkするだけでつくれて、ブラウザだけで更新できて、作った辞書は常に最新の辞書としてtextlintでチェックできるという感じのプロジェクトです。

イマイチ分かりやすさや目的が伝わらない感じがするので、[Usage · Proofdict](https://proofdict.github.io/docs/usage.html)から試して感想とかくれると嬉しいです。