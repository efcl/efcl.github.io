---
title: "箇条書きにおける文末の句点（。）を統一するtextlintルール"
author: azu
layout: post
date : 2017-04-11T08:41
category: textlint
tags:
    - textlint
    - JavaScript
    - japanese

---

[textlint-rule-period-in-list-item](https://github.com/azu/textlint-rule-period-in-list-item "textlint-rule-period-in-list-item")という[textlint](https://github.com/textlint/textlint "textlint")のルールを書きました。

箇条書きの文末に。がついてたりついてなかったりするのを統一するためのルールです。
本文中の句点（。）の統一するルールは別途あります。

- [textlint-ja/textlint-rule-ja-no-mixed-period: 文末の句点(。)の統一 と 抜けをチェックするtextlintルール](https://github.com/textlint-ja/textlint-rule-ja-no-mixed-period/ "textlint-ja/textlint-rule-ja-no-mixed-period: 文末の句点(。)の統一 と 抜けをチェックするtextlintルール")

**デフォルトの挙動** 

デフォルトは句点を付けないように統一します。
以前アンケートを取ってみたところ、箇条書きの文末に句点はつけない人のほうが多そうではありました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">[Poll] 箇条書きの文末に。をつける付けない</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/844535223278694404">March 22, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

(もちろんオプションで変更できます)

**OK**:

```
- 項目1
- 項目2
- [textlint](https://github.com/textlint/textlint "textlint")
```

**NG**:

```
- 項目1。
- 項目2.
```

という感じになります。

## Install

[npm](https://www.npmjs.com/)を使ってインストールできます。

    npm install textlint-rule-period-in-list-item

## Usage

[textlint 使い方](https://www.google.com/search?q=textlint+%E4%BD%BF%E3%81%84%E6%96%B9)などで検索してください。


Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "period-in-list-item": true
    }
}
```


## オプション

オプションは色々ありますが、句点をつけないひとはあんまり変更する必要がないはずです。
句点を付ける人は、`periodMark`に利用する記号を指定してください。

例えば、`periodMark: "。"`とすれば、箇条書きの文末に`。`を付けることをチェックします。

文末に`。`を必須にした場合でも `- 「OK」` は許可したいという場合は、`allowPeriodMarks`で設定できます。(`!`や`?`といった文末に来る可能性が高いものはデフォルトで入っていますが)

```js
{
    // prefer to use period mark.
    // "" (default is no period)
    // You can select period mark like "." from "periodMarks".
    "periodMark": "",
    // Built-in recognized period mark list
    // if the period of the text is not `periodMark` and it is a string in the `periodMarks`,
    "periodMarks": [".", "。", "．"],
    // Ignore only link tag
    // - [text](link)
    // It is not needed period mark
    "ignoreLinkEnd": true,
    // allow exception period mark list at end of the list item
    // Ignore this period mark
    "allowPeriodMarks": [],
    // Allow emoji at end of the list item
    "allowEmoji": false,
    // If not exist `periodMark` at end of the list item
    // Automatically, append `periodMark` when does textlint --fix
    "forceAppendPeriod": false
}
```

## 句点をつけるように自動修正

このルールは`textlint --fix`の自動修正にも対応しています。
句点を取り除く方は常に`--fix`で修正されますが、句点を付ける方は`forceAppendPeriod:true`の時のみ有効です。
(エディタなどで保存ごとに`--fix`したいという場合に問題になるため)

次の設定では、`.`が`--fix`をした時に自動で追加されます。

```json
{
    "rules": {
        "period-in-list-item": {
           "periodMark": ".",
           "forceAppendPeriod": true
        }
    }
}
```

**Before**

```
- item
```

**After**

`textlint --fix`した結果

```
- item.
```

## おわりに

箇条書きにおける句点の表記を統一するtextlintルールでした。
何か問題を見つけた場合次のリポジトリのIssueへ報告してください。

- [textlint-rule-period-in-list-item](https://github.com/azu/textlint-rule-period-in-list-item "textlint-rule-period-in-list-item")

また[Gitterのtextlint-ja](https://gitter.im/textlint-ja/textlint-ja)のチャットでも問題ないです。

[![Gitter](https://badges.gitter.im/textlint-ja/textlint-ja.svg)](https://gitter.im/textlint-ja/textlint-ja?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

箇条書きに句点を付けるか付けないかの明確な根拠は探した感じよく分かりませんでした。
日本語だけじゃなくて英語でも人によっても違う感じだったので、何か興味深い資料があればおしらせください。
