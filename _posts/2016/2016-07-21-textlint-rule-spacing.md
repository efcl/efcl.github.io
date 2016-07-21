---
title: "textlintでスペースを入れる入れないを統一するルール"
author: azu
layout: post
date : 2016-07-21T20:08
category: textlint
tags:
    - textlitn
    - JavaScript

---

文章を書いていると、日本語と english の間にスペースを入れるかどうかという表記揺れの問題がでてきます。

	日本語と english にはスペースを入れる
	日本語とenglishにはスペースを入れる
	`code` と日本語の間はスペースを空ける
	`code`と日本語の間はスペースを空けない
	OK: 「良いですね」
	NG: 「 ダメですね 」

このようなスペースのスタイルについての[textlint](https://textlint.github.io/)ルールを書きました。

- [textlint-ja/textlint-rule-spacing: スペース周りのスタイルを扱うtextlintルール集](https://github.com/textlint-ja/textlint-rule-spacing "textlint-ja/textlint-rule-spacing: スペース周りのスタイルを扱うtextlintルール集")

プリセットになっているため、次のようにまとめてインストールできます。

```
npm install textlint-rule-preset-ja-spacing
```

そして、次のように設定で有効化すれば利用できます。

```json
{
    "rules": {
        "preset-ja-spacing": true
    }
}
```


## ルール一覧

次のようなルールがプリセットには含まれています。
また、個別のルールとしてもnpmでインストールできるようになっています。

### [textlint-rule-ja-space-between-half-and-full-width](./https://github.com/textlint-ja/textlint-rule-spacing/tree/master/packages/textlint-rule-ja-space-between-half-and-full-width)

半角文字と全角文字の間にスペースを入れるかどうかのルール
デフォルトはスペースを入れない。

### [textlint-rule-ja-space-around-code](./https://github.com/textlint-ja/textlint-rule-spacing/tree/master/packages/textlint-rule-ja-space-around-code)

インラインコードの周りにスペースを入れるかを決めるルール

### [textlint-rule-ja-no-space-between-full-width](./https://github.com/textlint-ja/textlint-rule-spacing/tree/master/packages/textlint-rule-ja-no-space-between-full-width)

全角文字同士の間のスペースについてのtextlintルール。
全角文字どうしの間にスペースを入れません。

### [textlint-rule-ja-nakaguro-or-halfwidth-space-between-katakana](https://github.com/textlint-ja/textlint-rule-spacing/tree/master/packages/textlint-rule-ja-nakaguro-or-halfwidth-space-between-katakana)

カタカナ語間の区切り文字についてのtextlintルール。
カタカナ語間は中黒または半角スペースを用いてカタカナ語を区切ります。

### [textlint-rule-ja-no-space-around-parentheses](https://github.com/textlint-ja/textlint-rule-spacing/tree/master/packages/textlint-rule-ja-no-space-around-parentheses)

かっこの外側、内側ともにスペースを入れないようにするルール

### [textlint-rule-ja-space-after-exclamation](https://github.com/textlint-ja/textlint-rule-spacing/tree/master/packages/textlint-rule-ja-space-after-exclamation)

文末に感嘆符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。
文中に感嘆符を使用する場合はスペースを挿入しません

### [textlint-rule-ja-space-after-question](https://github.com/textlint-ja/textlint-rule-spacing/tree/master/packages/textlint-rule-ja-space-after-question)

文末に疑問符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。
文中に疑問符を使用する場合はスペースを挿入しません。

## デフォルト設定

デフォルトでは、次のような設定になっています。

```json
{
    "rules": {
        "preset-ja-spacing": {
             "ja-nakaguro-or-halfwidth-space-between-katakana": true,
             "ja-no-space-around-parentheses": true,
             "ja-no-space-between-full-width": true,
             "ja-space-between-half-and-full-width": {
                 "space": "never"
             },
             "ja-space-after-exclamation": true,
             "ja-space-after-question": true,
             "ja-space-around-code": false,
         }
    }
}
```

[textlint-rule-ja-space-around-code](https://github.com/textlint-ja/textlint-rule-spacing/tree/master/https://github.com/textlint-ja/textlint-rule-spacing/tree/master/packages/textlint-rule-ja-space-around-code)は、デフォルト無効になっています。(どちらが一般的か不明なため)

次のように設定することで、プリセットに含まれるすべてのルールを有効にできます。

```json
{
    "rules": {
        "preset-ja-spacing": {
            "ja-space-around-code": {
                "before": false,
                "after": false
            }
        }
    }
}
```

## Fixable

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

大体のルールは`textlint --fix`の自動修正に対応しています。

## 意見/要望

[Issue](https://github.com/textlint-ja/textlint-rule-spacing/issues)や[Gitterチャット](https://gitter.im/textlint-ja/textlint-ja)に書いてください。

[![Gitter](https://badges.gitter.im/textlint-ja/textlint-ja.svg)](https://gitter.im/textlint-ja/textlint-ja)

## 関連

JTFスタイルガイドに含まれているルールと大部分は共通しています。
以下のプリセットを利用している場合は重複するルールがありますが、スペース関連のルールを取り出した感じです。(JTFの方もこのモジュールをつかって実装したい)

- [JTF日本語標準スタイルガイド（翻訳用）](https://www.jtf.jp/jp/style_guide/styleguide_top.html "JTF日本語標準スタイルガイド（翻訳用）")
- [azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.](https://github.com/azu/textlint-rule-preset-JTF-style "azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.")


