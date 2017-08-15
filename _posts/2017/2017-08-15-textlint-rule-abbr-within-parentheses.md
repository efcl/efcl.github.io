---
title: "略語は括弧の中 or 前? Open Source Software(OSS) or OSS(Open Source Software)"
author: azu
layout: post
date : 2017-08-15T19:25
category: JavaScript
tags:
    - textlint

---

タイトルにあるような正式名称に対する略語(主に頭文字を取るタイプ)を括弧の中に書いているかをチェックする[textlint](https://github.com/textlint/textlint "textlint")ルールを書きました。

- [textlint-rule-abbr-within-parentheses](https://github.com/azu/textlint-rule-abbr-within-parentheses "textlint-rule-abbr-within-parentheses")

## 例

例えば、Open Source Softwareの略語はOSSですということを表現したい場合に次のように書くというルールです。

**OK**:

```
This is Open Source Software(OSS)
これはOpen Source Software（OSS）なルールです
JavaScript(JS)
```

**NG**:

```
LTS（Long-Term Support）
JS(JavaScript)
This rule is OSS(Open Source Software)
これはOSS（Open Source Software）なルールです
```

## 使い方

npmでインストールして

    npm install textlint-rule-abbr-within-parentheses

`.textlintrc`(Recommended)を設定すれば動きます。

```json
{
    "rules": {
        "abbr-within-parentheses": true
    }
}
```

## 略語は括弧の中 or 前?

統一という観点から見ると次のような文章は略語の書き方が混ざっていてよくありません。

> 混ざっていて良くない例  
> Ths Object Management Group(OMG) maintains specifications for the UML(Unified Modeling Language).

そのため統一する書き方を探していたのですが、括弧の中に略語を書くというルールを採用してるケースが色々ありました。APA StyleやIBM Style Guideなどはそのような書き方を推奨しているようです。

逆(略語を先に書く)を推奨してるルールは見つけることができませんでしたが、括弧ではなく言葉で略語を解説するスタイルも見られました。しかしながら略語は括弧の中に書くという根拠については見つけられませんでした。

一つまだ疑問があって、括弧の中に書くとどうも補足的な印象が出てきてしまいます。
たとえば、URLのような略語自体が言葉として一般的に成立してるパターンは、Uniform Resource Locatorという正式名称はもはやURLの補足情報になっているように思えます。
先ほどもでてきたAP Styleの正式名称はAssociated Press Styleですが、AP(Associated Press) Styleのように紹介してる文章も見受けられます。(ここでの正式名称はわかりにくいしあまり重要ではないから括弧の中に書かれているのかも?)

### English

- [Which would you place in parentheses: the expansion or the abbreviation? - English Language & Usage Stack Exchange](https://english.stackexchange.com/questions/84958/which-would-you-place-in-parentheses-the-expansion-or-the-abbreviation "Which would you place in parentheses: the expansion or the abbreviation? - English Language &amp; Usage Stack Exchange")
- [APA Style Blog: An Abbreviations FAQ](http://blog.apastyle.org/apastyle/2015/10/an-abbreviations-faq.html)
- [Q&A: Why you shouldn't put acronyms in parentheses](http://www.kuediting.com/style/qa-why-you-shouldnt-put-acronyms-in-parentheses/ "Q&amp;A: Why you shouldn&#39;t put acronyms in parentheses")
- [The IBM Style Guide: Conventions for Writers and Editors - Francis DeRespinis, Peter Hayward, Jana Jenkins, Amy Laird, Leslie McDonald, Eric Radzinski - Google ブックス](https://books.google.co.jp/books?id=77WoO_P8yA4C&pg=PA57&lpg=PA57 "The IBM Style Guide: Conventions for Writers and Editors - Francis DeRespinis, Peter Hayward, Jana Jenkins, Amy Laird, Leslie McDonald, Eric Radzinski")

### Japanese

- [Microsoft Word - 執筆ガイドライン20151109訂正.docx - denshi-m2.pdf](http://www.jsphcs.jp/gakkaishi/denshi-m2.pdf "Microsoft Word - 執筆ガイドライン20151109訂正.docx - denshi-m2.pdf")
- [Logical Skill の深い話 略語の表記](http://logicalskill.blog.fc2.com/blog-entry-79.html)
- [略語 : abbreviation と acronym - 職業プログラマの休日出勤](http://tmotooka.hatenablog.jp/entry/2013/05/18/212538)


ウェブに文書を書くと基本的にはHTMLなので、HTMLではどうなっているかが気になりました。
HTMLの世界では[dfn](https://developer.mozilla.org/ja/docs/Web/HTML/Element/dfn "dfn")と[abbr](https://developer.mozilla.org/ja/docs/Web/HTML/Element/abbr "abbr")がそれぞれ関係します。

> <p>We use <dfn><abbr title="Hypertext Markup Language">HTML</abbr></dfn> to structure our web documents.</p>


```html
<p>We use <dfn><abbr title="Hypertext Markup Language">HTML</abbr></dfn> to structure our web documents.</p>
```

この場合も正式名称が属性値にあるので、正式名称の方が補足情報にも見えます。

これは感覚的なものですが、略語をそもそも使うのは正式名称が毎回書くには長いためです。
なので、最初にこの正式名称の略語はこう定義しますという意味で `正式名称(略語)`と書くスタイルがあるのだと思います。またこの時に2回目以降は正式名称は補足的な情報に逆転する感じがします。(`abbr`要素の例)
一方、そもそも一度しか出てこない単語はどちらでもいいという理由で表記が安定しないような気がします。(このルールで縛りたい部分)

この辺の書き方や読んだときにどのような印象を受けるかについて調査レポートや論文とか知ってる人いたら教えてください。

----

作ったtextlintルール

- [textlint-rule-abbr-within-parentheses](https://github.com/azu/textlint-rule-abbr-within-parentheses "textlint-rule-abbr-within-parentheses")
