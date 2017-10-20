---
title: "Alfred上で自分のはてなブックマークを検索できるWorkflow"
author: azu
layout: post
date : 2017-10-20T19:48
category: software 
tags:
    - node.js
    - alfred

---

Alfredで自分のはてブデータを取得して絞り込んで検索できるWorkflowを書きました。

- [azu/alfred-hantebookmark-mydata: Search My HatenaBookmark in Alfred](https://github.com/azu/alfred-hantebookmark-mydata "azu/alfred-hantebookmark-mydata: Search My HatenaBookmark in Alfred")

![screenshot](https://media.giphy.com/media/3ov9k8YySjxOsxvNHW/giphy.gif)


このWorkflowはNode.jsでAlfred Workflowを書ける[alfy](https://github.com/sindresorhus/alfy "alfy")というフレームワークを使っています。
そのため、npmでWorkflowをインストール、更新できます。
(必然的にNode.js環境が必要です)


## インストール

```
npm install --global alfred-hantebookmark-mydata
```

## 設定

どのはてなアカウントのブックマークを検索するかの設定が必要なので、Workflowの設定から`HATENA_ACCOUNT_NAME`という変数に自分のアカウント名を入れる必要があります。

1. Open workflow settings
2. Set Your hatena account name to `HATENA_ACCOUNT_NAME`

![setting](https://monosnap.com/file/cTzt4ieHD2wGDYb2ANoUh5IXeS6SQA.png)


## 制限

[alfy](https://github.com/sindresorhus/alfy "alfy")は基本的に一度きりの実行を想定した作りになっているようです。
なので、入力 -> Nodeでスクリプトを実行 -> 結果を表示の一回だけで終わってる感じです。

ほしかったのは、スクリプトを実行 -> 結果をAlfredで絞り込み という感じのものでした。

`Script Filter`の[Match Mode](https://www.alfredapp.com/help/workflows/inputs/script-filter/#alfred-filters-results "Match Mode")を使うとそれが実現できる(このWorkflowもこれ)のですが、このMatch Modeのフィルタリングは日本語に対応してない感じがします。

境界となる文字列が記号やスペースのみとなっていて、その結果に対して先頭からのマッチのみなので、必然的に日本語だと上手くマッチしない問題があります。形態素解析とかして分解すればいいのですが、処理時間的に現実的じゃない感じがしました。(差分更新、キャッシュを上手く使えばできそうな気がするけど、PR歓迎)

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">自分のはてなブックマークをAlfredから検索してして絞り込むやつ書いた。<br>もっと早く動くようにできないかな?(後マッチングが日本語不安定な気はする)<a href="https://t.co/8z3GzWGzwW">https://t.co/8z3GzWGzwW</a> <a href="https://t.co/DmhYJ8Dh6v">pic.twitter.com/DmhYJ8Dh6v</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/921017924898275328?ref_src=twsrc%5Etfw">October 19, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
