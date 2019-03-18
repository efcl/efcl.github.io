---
title: "文中に制御文字が混じっているのを見つけて自動修正するtextlintルール"
author: azu
layout: post
date : 2017-12-29T12:33
category: textlint
tags:
    - JavaScripts
    - textlint

---

[制御文字](https://ja.wikipedia.org/wiki/%E5%88%B6%E5%BE%A1%E6%96%87%E5%AD%97 "制御文字")は色々ありますが、通常の文中に出てくる制御文字は復帰(`\r`)、改行(`\n`)、タブ(`\t`)など限られたものだけだと思います。それ以外の制御文字は文中に入ると文字化けしたりします。

![cc](https://monosnap.com/file/UjfDjfC7pmKgAJtz52Eot0DQn3MSP1.png)

次の記事では文中に制御文字が入った場合の問題を紹介しています。

- [テキストエディタ内の「見えない何か」を見つける #atom #sublime ｜ Developers.IO](https://dev.classmethod.jp/non-programming/texteditor_garbled_letter/ "テキストエディタ内の「見えない何か」を見つける #atom #sublime ｜ Developers.IO")

最近、Slackアプリでバックスペースがおかしな文字が入っていたのも同じような原因です。

- [【10/2 追記 】MacのSlack.appで日本語入力すると変なスペースが入る問題への対応 - Today Fortkle Learned.](http://fortkle.hatenablog.com/entry/2017/05/24/104014 "【10/2 追記 】MacのSlack.appで日本語入力すると変なスペースが入る問題への対応 - Today Fortkle Learned.")

これらを見つける[textlint](https://github.com/textlint/textlint "textlint")ルールとして[@textlint-rule/textlint-rule-no-invalid-control-character](https://github.com/textlint-rule/textlint-rule-no-invalid-control-character "@textlint-rule/textlint-rule-no-invalid-control-character")を作りました。

すべての制御文字を禁止すると改行すら出来なくなってしまうので次の制御文字は許可されています。
また、チェックするのはただの文字列中に制御文字が混じってる場合のみで、CodeBlockの中などはチェックしないので問題ありません。

### 許可されている制御文字

- `\r`
- `\n`
- `\t`

### 許可されていない制御文字

その他の[Control character](https://en.wikipedia.org/wiki/Control_character "Control character")であるもの

- `\u0010` DATA LINK ESCAPE
- `\u0019` ND OF MEDIUM
- etc...


## インストール

[@textlint-rule/textlint-rule-no-invalid-control-character](https://github.com/textlint-rule/textlint-rule-no-invalid-control-character "@textlint-rule/textlint-rule-no-invalid-control-character")はnpmでインストールできます。

    npm install @textlint-rule/textlint-rule-no-invalid-control-character
        

## 使い方

`.textlintrc`に設定するだけです。

```json
{
    "rules": {
        "@textlint-rule/no-invalid-control-character": true
    }
}
```

## オプション

- `allow`: `string[]`
    - 例外として許可したい制御文字を指定

```json
{
    "rules": {
        "@textlint-rule/no-invalid-control-character": {
            "allow": [
                "\v"
            ]
        }
    }
}
```

## おわりに

`\u0019`などの制御文字が文中に入るのはIMのバグとか何らかの問題がある場合が殆どだと思うので、デフォルトで弾くのが良い気がします。

[@textlint-rule/textlint-rule-no-invalid-control-character](https://github.com/textlint-rule/textlint-rule-no-invalid-control-character "@textlint-rule/textlint-rule-no-invalid-control-character")に似たルールとして、Macでコピペすると濁点が分離する問題を見つける[textlint-rule-no-nfd](https://github.com/azu/textlint-rule-no-nfd "textlint-rule-no-nfd")などがあります。
