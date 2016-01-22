---
title: "未知の頭字語を見つけるtextlintルール"
author: azu
layout: post
date : 2016-01-22T20:10
category: JavaScript
tags:
    - textlint
    - english

---

[textlint-rule-unexpanded-acronym](https://github.com/azu/textlint-rule-unexpanded-acronym "textlint-rule-unexpanded-acronym")という[textlint](https://github.com/textlint/textlint "textlint")ルールを書きました。

textlint自体については以下を参照してください。

- [textlintで日本語の文章をチェックする | Web Scratch](http://efcl.info/2015/09/10/introduce-textlint/)
- [ルールプリセットを使ってお手軽にtextlint入門 | Web Scratch](http://efcl.info/2015/12/30/textlint-preset/)

## [textlint-rule-unexpanded-acronym](https://github.com/azu/textlint-rule-unexpanded-acronym "textlint-rule-unexpanded-acronym")

textlint-rule-unexpanded-acronymが見つけるのは未知の[頭字語](https://ja.wikipedia.org/wiki/%E9%A0%AD%E5%AD%97%E8%AA%9E "頭字語")です。

> 頭字語（とうじご）とは、主にヨーロッパ言語のアルファベットにおける略語の一種で、複数の単語から構成された合成語の頭文字を繋げて作られた語のこと。

- OSS: Open Source Software
- IEEE: Institute of Electrical and Electronics Engineers

みたいな短縮された単語です。

頭字語がいきなり説明なしに出てきた場合に、最後までそれがなんの略語なのかわからないと意味が分からない文章になってしまいます。

そのため、頭字語がでてきたらその元となった単語が文章中にでてきているかをチェックするルールです。

例えば、以下のような文章ではOSSがOpen Source Softwareの略であることを説明してないのでエラーとなります。

```
OSS開発を行う人には色々なタイプがいるはずだ。
```

まだアルファベットしか対応してないです(日本語対応できるのか謎)。

## インストール

    npm install textlint-rule-unexpanded-acronym

## 使い方

`.textlintrc`で設定する場合は以下のように設定できます。
(内容はデフォルト値になっています)

```json
{
    "rules": {
        "unexpanded-acronym" : {
            "min_acronym_len" : 3,
            "max_acronym_len" : 5,
            "ignore_acronyms" : []
        }
    }
}
```

### 設定

上記の設定で書いたように幾つかのオプションがあります。

- `min_acronym_len`(default:`3`): 指定した文字数以上の頭字語をチェック対象とします。
- `max_acronym_len`(default:`5`): 指定した文字数以下の頭字語をチェック対象とします。
- `ignore_acronyms`(default:`[]`): 無視する頭字語を指定できます。

`min_acronym_len` 以上 `max_acronym_len` 以下の文字数をチェックするので、デフォルトでは3-5文字の頭字語だけがチェックされます。

また、OSSというような説明しなくても分かるであろう頭字語を無視するオプションもあります。

```
{
    "rules": {
        "unexpanded-acronym" : {
            // AB is ignore, ABC is recognized.
            "min_acronym_len" : 3,
            // GREEEEEEN is ignore
            "max_acronym_len" : 5,
            // OSS is ignore
            "ignore_acronyms" : ["OSS"]
        }
    }
}
```

### TODO

日本語も対応できると良さそうだけど、普通に難しそうな気がする。

[実験: 文章に対して文章でテスト | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/slide/96.html "実験: 文章に対して文章でテスト | 技術文書をソフトウェア開発する話")で似たような話をしていました



## 参考

RedPenの同様の機能を参考に実装しました。

- [RedPen UnexpandedAcronym](http://redpen.cc/docs/latest/index.html#unexpandedacronym "UnexpandedAcronym")
