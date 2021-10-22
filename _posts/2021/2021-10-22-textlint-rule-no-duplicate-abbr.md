---
title: "「TCPプロトコル」や「VRリアリティ」などの略語に続く単語の意味が重複してる文章を検知するtextlintルールを書いた"
author: azu
layout: post
date : 2021-10-22T19:57
category: textlint
tags:
    - textlint
    - JavaScript
    - japanese

---

「TCPプロトコル」、「DTOオブジェクト」、「VRリアリティ」などの単語の頭文字をとった略語とその後に続く単語の意味がかぶっている文章を検知する[textlint](https://github.com/textlint/textlint)のルールを書きました。
日本語だけではなく"This is TCP protocol."などの英単語のパターンも対応しています。

- [textlint-rule/textlint-rule-no-duplicate-abbr: textlint rule that avoid adding duplicated suffix word for Acronyms and Abbreviations.](https://github.com/textlint-rule/textlint-rule-no-duplicate-abbr)

元ネタは次のTweetです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">「BGPプロトコル」っていうワードを目にして微笑ましくなってる😊</p>&mdash; ゆやりん (@yuyarin) <a href="https://twitter.com/yuyarin/status/1449530853546094592?ref_src=twsrc%5Etfw">October 17, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## 仕組み

略語をまとめたマシーンリーダブルなデータは見つからなかったので、Wikipediaを元に略語と元の単語の対応をまとめた辞書を作りました。
次のSpreadSheetにデータを公開しています。

- [Acronyms and Abbreviations dataset - Google スプレッドシート](https://docs.google.com/spreadsheets/d/1mtrE2wxlasDVZXcpLcLE26EUaX12aAOkbKed9oTcVNk/edit#gid=877500418)

元となるWikipediaのページは、次のようなページです。

- [Lists of acronyms - Wikipedia](https://en.wikipedia.org/wiki/Lists_of_acronyms)
- [List of computing and IT abbreviations - Wikipedia](https://en.wikipedia.org/wiki/List_of_computing_and_IT_abbreviations)

この辞書にマッチする略語がでてきたら、その次の単語が略語の最後の単語と同じなら重複しているというエラーを報告します。

[![Screenshot](https://efcl.info/wp-content/uploads/2021/10/22-1634900616.png)](https://azu.github.io/textlintrc/)

「BGPプロトコル」の「BGP」は「Border Gateway Protocol」なので、「Protocol」と「プロトコル」は同じ意味だとしてエラーにしています。

>"BGPプロトコル" has duplicated suffix word. "BGP" stands for "Border Gateway Protocol".

日本語と英単語間で同じ意味合いかどうかの判定には、[Sudachi 同義語辞書](https://github.com/WorksApplications/SudachiDict/blob/develop/docs/synonyms.md)を利用しています。

- [azu/sudachi-synonyms-dictionary: Sudachi's synonyms dictionary](https://github.com/azu/sudachi-synonyms-dictionary)

## 使い方

[textlint](https://github.com/textlint/textlint)のルールなので、「textlint ルール 設定」で検索したり次のページを参照してください。

- [Configuring textlint · textlint](https://textlint.github.io/docs/configuring.html)

npmなどでルールをインストールします。

```
npm install --save-dev @textlint-rule/textlint-rule-no-duplicate-abbr textlint
```

`.textlintrc`設定ファイルで有効化します。

```json
{
  "rules": {
    "@textlint-rule/no-duplicate-abbr": true
  }
}
```

## おわりに

略語の辞書が結構手作業で直したりしているので、壊れてるデータがあるかもしれません。
SpreadSheetは誰でも編集できるようになっているので、おかしなところがあったら修正してみてください。
また、足りない略語は勝手に追加してみてください。（辞書もnpmパッケージとして配布したいのでどうにかしたいです）

- [textlint-rule/textlint-rule-no-duplicate-abbr: textlint rule that avoid adding duplicated suffix word for Acronyms and Abbreviations.](https://github.com/textlint-rule/textlint-rule-no-duplicate-abbr)
- [Acronyms and Abbreviations dataset - Google スプレッドシート](https://docs.google.com/spreadsheets/d/1mtrE2wxlasDVZXcpLcLE26EUaX12aAOkbKed9oTcVNk/edit#gid=877500418)
