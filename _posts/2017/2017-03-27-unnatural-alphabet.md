---
title: "不自然なアルファベットを見つｋるtextlintルール"
author: azu
layout: post
date : 2017-03-27T20:14
category: textlint
tags:
    - textlint
    - 日本語
    - textlintrule

---

不自然なアルファベットを検知する[textlint](https://github.com/textlint/textlint "textlint")のルールを書きました。

- [textlint-ja/textlint-rule-ja-unnatural-alphabet: 不自然なアルファベットを検知するtextlintルール](https://github.com/textlint-ja/textlint-rule-ja-unnatural-alphabet "textlint-ja/textlint-rule-ja-unnatural-alphabet: 不自然なアルファベットを検知するtextlintルール")

IMEの入力ミスによるtypoを見つける目的です

## Example

**OK**:

```
リリース
aiueo
This is pen.
```

**NG**:

```
リイr−ス
対応でｋない
こrはおかしい。
検索してくd際
```

上記のようなIME特有の日本語の間に不自然に挟まった1文字のアルファベットを見つけるルールです。


## Install

    npm install textlint-rule-ja-unnatural-alphabet

でインストールできます。
使い方はいろんな記事があるので、"textlint 導入"とかで検索してください。

- [textlintをTravis CIで動かして継続的に文章をチェックする - Qiita](http://qiita.com/azu/items/e36501d25593d008f6ac "textlintをTravis CIで動かして継続的に文章をチェックする - Qiita")
- [VS Codeでtextlintを使って文章をチェックする - Qiita](http://qiita.com/azu/items/2c565a38df5ed4c9f4e1 "VS Codeでtextlintを使って文章をチェックする - Qiita")


## オプション

`X`軸などアルファベット一文字を使うことはあるので、そういうものはオプションで回避できるようになっています。
C言語のようなよくあるアルファベット一文字 + 日本語からなる単語は`allowCommonCase`で無視されています。

- `allow`: `string[]`
    - 無視するアルファベットや単語の配列
    - デフォルト: `["a", "i", "u", "e", "o", "n", 典型例 ]`
    - デフォルトでは母音とnを除外している
    - `"/正規表現/"` のような文字列もサポート

```js
{
    // 無視するアルファベット
    // 例) ["X"]
    // デフォルトでは母音とnを除外
    "allow": [
        "a", "i", "u", "e", "o", "n"
    ],
    // ビルトインの典型例を除外するかどうか
    // 例) C言語
    "allowCommonCase": true
}
```

## 元ネタ

この[textlint](https://github.com/textlint/textlint "textlint")ルールは元ネタがあって、[CiNii 論文 -  日本語文章校正ツール"Chanterelle" : 入力ミス及び表記揺らぎについて](http://ci.nii.ac.jp/naid/110002893543)という論文が元ネタです。

不自然なアルファベットを見つけるルールが書かれていて、これを元に実装しました。

> (3) 不自然なアルファベット

- 1文字のみのアルファベットが日本語中に現れた場合に検出対象とする
- 大文字は、略記号などを意識して入れている可能性がある
- このミスでは母音(`aiueo`)は発生しないので除く
- `n`も多くの場合には、`ん`となるため除く

実装してみて[色々な再配布可能な技術書を集めた](https://github.com/textlint-ja/technological-book-corpus-ja)ものに実際に通してみて、典型的な例外を少し加えるなどしています。

- [textlint-ja/technological-book-corpus-ja: 日本語で書かれた技術書のコーパス](https://github.com/textlint-ja/technological-book-corpus-ja "textlint-ja/technological-book-corpus-ja: 日本語で書かれた技術書のコーパス")

```
npm i -g technological-book-corpus-ja textlint textlint-rule-ja-unnatural-alphabet
# 技術書のMarkdonファイルパスが出力される
# それをtextlintのルールに通してどんなところでおちるかをチェックする
technological-book-corpus-ja  | xargs textlint --rule textlint-rule-ja-unnatural-alphabet -f pretty-error
```
