---
title: "textlint + prhで表記ゆれを検出する"
author: azu
layout: post
date : 2015-09-14T18:00
category: JavaScript
tags:
    - textlint
    - tools

---

## [proofread-helper](https://github.com/vvakame/prh "proofread-helper")

[proofread-helper](https://github.com/vvakame/prh "proofread-helper")は@[vvakame](https://github.com/vvakame "vvakame")さんが作っている文章の校正補助ツールです。([Tech Booster](http://techbooster.org/ "Tech Booster")とかの執筆で使っている?らしいです)

機能としては表記揺れの辞書を指定して、そのルールに則って文章のチェック、また期待する単語への書き換えを行うことができます。

ものすごくざっくり書くと、期待する単語と表記揺れを補足する正規表現の組み合わせを持った辞書を作ってチェックするような形です。

仕組み的には[azu/technical-word-rules](https://github.com/azu/technical-word-rules "azu/technical-word-rules")と殆ど同じですが、辞書をyaml形式で書けたり、辞書内に期待通りに動いているのかの簡単なテストも書くことができます。
なので、辞書の追加や管理がしやすいと思います。

例えば、以下のように辞書を書くことができます。

```yaml
version: 1
rules:
# expectedのみだと 大文字小文字全角半角の統一 されてるかをチェックできる
  - expected: jQuery
    specs:
      - from: jquery
        to:   jQuery
      - from: ＪＱＵＥＲＹ
        to:   jQuery
# patternにマッチするものはexpecetedが本来の表現であるというルール
# ディフォルト => デフォルト
# 表現の統一を図る
  - expected: デフォルト
    pattern:  ディフォルト
```

今回この[proofread-helper](https://github.com/vvakame/prh "proofread-helper")を[textlint](https://github.com/azu/textlint "textlint")から扱える[azu/textlint-rule-prh](https://github.com/azu/textlint-rule-prh "azu/textlint-rule-prh")というルールを作ってみました。

## textlintとは

textlintについてはMarkdownなどをルールを元にチェックできるツールで、詳しくは以下の記事を見てみて下さい。

- [textlintで日本語の文章をチェックする | Web Scratch](http://efcl.info/2015/09/10/introduce-textlint/ "textlintで日本語の文章をチェックする | Web Scratch")

## インストール/使い方

実際にインストールとして文章をチェックしてみます。
次のリポジトリに同様の設定を行ったサンプルを用意してあります。

- [azu/prh-textlint-example](https://github.com/azu/prh-textlint-example "azu/prh-textlint-example")

(サンプルでは`-g`ではなく`-D`でインストールしています)


1: textlintと[textlint-rule-prh](https://github.com/azu/textlint-rule-prh)をインストール

```
npm install -g textlint textlint-rule-prh
```

2: [proofread-helper](https://github.com/vvakame/prh "proofread-helper")の辞書を追加する

[proofread-helper](https://github.com/vvakame/prh "proofread-helper")にはデフォルトでWEB+DBをベースとした辞書が入っています。
今回は最小限のルールにしたいので、`rule.yaml`という名前でproofread-helperの辞書を追加します。

```yaml
version: 1
rules:
  - expected: jQuery
    specs:
      - from: jquery
        to:   jQuery
      - from: ＪＱＵＥＲＹ
        to:   jQuery
```

3: `.textlintrc`を作成する

`.textlintrc` はtextlintの設定ファイルで、どのルールを使うかとルール別の設定を追加できます。

textlint-rule-prhは`rulePaths`にproofread-helperの辞書ファイルへのパスを設定する必要があります。

今回は先ほど作成した`rule.yaml`へのファイルパスを指定します。

```yaml
{
  "rules": {
    "prh": {
      "rulePaths": [
        "./rule.yaml"
      ]
    }
  }
}
```

### 文章をチェックする

textlintを使って文章をチェックしてみます。

```sh
$ textlint README.md
# サンプルプロジェクトでは
# npm run textlint
```

![result](https://monosnap.com/file/aBHagUloZiFYAshaagbYbIXVVonnAl.png)

実行すると

```
/Users/azu/.ghq/github.com/azu/prh-textlint-example/README.md
  10:1  error  JQuery => jQuery  prh
```

10行目の1列目に`JQuery`となっていますが、それは`jQuery`が正しいのではと提案してくれます。


## 辞書の追加

## エディタとの連携

