---
title: "ECMAScript 6ドラフトのDiff検索用リポジトリを作った"
author: azu
layout: post
date : 2015-05-07T08:35
category: JavaScript
tags:
    - ECMAScript
    - ES6
    - JavaScript
    - Git

---

タイトルから何を言ってるのか意味わからない気がするので順を追って解説。

2015-05-07現在、ES6の仕様は[April 14, 2015 Rev 38 Final Draft](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#april_14_2015_rev_38_final_draft "April 14, 2015 Rev 38 Final Draft")が公開されています。
Rev38とわかるようにドラフトは38回ぐらい更新されていて、ちょっとづつ追記されたり変更されたりして結構な変更履歴があります。

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Growing <a href="https://twitter.com/hashtag/ECMAScript?src=hash">#ECMAScript</a> 2015(ES6) Drafts :) <a href="http://t.co/tV60cjdmM8">pic.twitter.com/tV60cjdmM8</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/594876861697503233">May 3, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

これだけ長い間(4年ぐらい?)やってるとある時点では正しかったかもしれないけど、最終版では違うものになってるという挙動があったりします。

例えば、class構文で以下のようにして定義した`method()`が列挙可能な仕様になっていたのが、Rev 32で列挙されないように修正されました。


```js
class Yamada{
	method(){}
} 
```

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/mohayonao">@mohayonao</a> 最近のES6の仕様でclassのmethod定義はnon-emerableになりましたよ。(ちよっと前まで逆だった)&#10;<a href="https://t.co/LDGPcC5f3X">https://t.co/LDGPcC5f3X</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/579876495490854912">March 23, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

こういった変更履歴は[harmony:specification_drafts [ES Wiki]](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts "harmony:specification_drafts [ES Wiki]")にも一応かいてあるのですが、サマリー的な感じなのでもうちょっと具体的なRev同士の差分から追う方法が欲しくなりました。

また最近ずっと[ECMAScript仕様書を読んでいたり](https://github.com/azu/azu/issues/47 "ECMAScript仕様書を読む · Issue #47 · azu/azu")するので、この仕様はなんでこうなっているのだろうというのが変更履歴から分かったりするのでは?と思ったのでそれを補助するものを作ろうとしました。


----

## Revごとの差分管理

[harmony:specification_drafts [ES Wiki]](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts "harmony:specification_drafts [ES Wiki]")に全てのRevのファイル(doc or pdf)が公開されています。

差分管理といえばGit！ということで、以下の様な考えでドラフトのRevをそれぞれ一つのコミットして突っ込んだリポジトリを作成することで、Gitで管理できるES6ドラフトのリポジトリを作ることにしました。

1. ドラフトを全部ダウンロード
2. ドラフトをテキストに変換する
3. GitにRevごとにコミットとして突っ込む
4. `git log -S -i "search"`とかで検索できる!
5. 該当するRevと関連ありそうな[rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")を表示

これに関連して色々なツールを書いているのですが、それらは[Meta ECMAScript](https://github.com/meta-ecmascript "Meta ECMAScript")にまとめてあります。

## ドラフトのメタデータ

まずはドラフトのダウンロードですが、まずドラフトのURLとそれが"Rev何"なのかの情報が必要です。

ES Wikiにかいてあるので、それらを取り出してjsonとかにして使えるメタデータをのリポジトリを作りました。

- [meta-ecmascript/es6-spec-changelog](https://github.com/meta-ecmascript/es6-spec-changelog "meta-ecmascript/es6-spec-changelog")

GitHubだと`tsv`や`csv`はそのままインクリメンタルサーチできるので[es6-spec-changelog.tsv](https://github.com/meta-ecmascript/es6-spec-changelog/blob/master/es6-spec-changelog.tsv "es6-spec-changelog/es6-spec-changelog.tsv at master · meta-ecmascript/es6-spec-changelog")とかも置いてあります。

## ドラフトのダウンロード

上記のメタリポジトリからJSONでドラフト一覧のURLが取れるようになったので、

- rev1.doc
- rev2.doc

という感じでダウンロードするコマンドラインツールを書きました。

- [meta-ecmascript/download-es6-spec](https://github.com/meta-ecmascript/download-es6-spec "meta-ecmascript/download-es6-spec")

## doc to txt?

docファイルをテキストファイルにしたいのですが、docファイルはそのままだと上手く扱えないので、

doc -> docx -> txt

という手順を取ることにしました。

詳細は以下に書いてありますが、完全には自動化しきれてない微妙な感じです。

- doc to docxは Word.app + AppleScript
- docx to txt は pandoc

- [meta-ecmascript/es6-to-text-diff](https://github.com/meta-ecmascript/es6-to-text-diff "meta-ecmascript/es6-to-text-diff")

更に細かく言うとdocx to txtも一度にするとpandocがスタックオーバーフロー的になるので、[doc-to-txt.sh](https://github.com/meta-ecmascript/es6-to-text-diff/blob/master/doc-to-txt.sh "doc-to-txt.sh")では

```
pandoc -f docx "${file}" -t native | pandoc -f native -t plain -o "txts/${outputFile}.txt"
```

のように一度"native"を経由すると問題なく(時間がかかる)変換できることがわかったのでバッドノウハウが色々あります。

## txt to Git

後はrev1.txt...rev38.txtをそれぞれ順番に同じファイル名にしてコミットしていったリポジトリを作る[new-git-revision.sh](https://github.com/meta-ecmascript/es6-to-text-diff/blob/master/new-git-revision.sh)というの書いて、ドラフトの差分を持ったGitリポジトリを作って完成。

そして、最終的に完成したリポジトリが以下になります。

- [https://github.com/meta-ecmascript/es6-draft-revision](https://github.com/meta-ecmascript/es6-draft-revision)
- rev毎にtagも貼ってあります

## Diff検索用リポジトリ

[meta-ecmascript/es6-draft-revision](https://github.com/meta-ecmascript/es6-draft-revision)はテキストファイルの変更履歴としてES6ドラフトの変更履歴が取れるので、後は通常のGit検索と同じテクニックを使ってドラフトの差分が検索できるようになると思います。

変更されたRevが特定できたら、関連するChangelogをみたりその前後でやってるTC39のミーティングを読めば何かわかるかもしれません。

- [tc39/agendas](https://github.com/tc39/agendas "tc39/agendas")
- [rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes/ "rwaldron/tc39-notes")


`git log -S`でコミットの差分に含まれてる内容を検索したりできます。


### 疑問

`git log -G`で改行無視して複数行に跨いだ検索が上手くいかない…(pcre拡張はいれてあるのに…) リポジトリのデータがおかしい可能性はある。。

```
git log --perl-regexp -i -G "GetThisBinding(.|\n)*?Return UNDEFINED"
```