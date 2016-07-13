---
title: "技術文書を書くためのtextlint校正ルールセット"
author: azu
layout: post
date : 2016-07-13T09:33
category: textlint
tags:
    - JavaScript
    - textlint
    - 技術文書
    - book

---


技術文書向けの[textlint](https://textlint.github.io/)ルールプリセットを作りました。

- [textlint-ja/textlint-rule-preset-ja-technical-writing: 技術文書向けのtextlintルールプリセット](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing "textlint-ja/textlint-rule-preset-ja-technical-writing: 技術文書向けのtextlintルールプリセット")

今、書いている[js-primer](https://github.com/asciidwango/js-primer "js-primer")で使用しています。

元々,
[JavaScript-Plugin-Architecture: JavaScriptプラグインアーキテクチャの本](https://github.com/azu/JavaScript-Plugin-Architecture "azu/JavaScript-Plugin-Architecture: JavaScriptプラグインアーキテクチャの本")で実験していたルールをまとめたプリセットになっています。

そのため、実際に適応した状態で書けることは確認した内容がベースです。一部オプションで設定をゆるくしたり、[textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments "textlint-filter-rule-comments")などで無視する必要がある部分もありますが、許容範囲な感じでした。

## インストール

通常の[ルールプリセット](http://efcl.info/2015/12/30/textlint-preset/ "ルールプリセット")と入れ方は同じです。

プリセットをインストールします

```
# package.jsonがないなら npm init
npm install textlint-rule-preset-ja-technical-writing -D
```

`.textlintrc`ファイルに以下の設定を追加します。
(`.textlinrc`ファイルがないなら `$(npm bin)/textlint --init`)

```
{
    "rules": {
        "preset-ja-technical-writing": true
    }
}
```

これで[textlint-rule-preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing "textlint-rule-preset-ja-technical-writing")を使ってLintができるようになります。

```
$(npm bin)/textlint README.md
```


- [textlint/getting-started.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/docs/getting-started.md)
- [テキストの校正用に textlint を導入してみた - blog.kymmt.com](http://blog.kymmt.com/entry/textlint)


## ルール一覧

現時点では以下のルールが含まれています。

最新のものとは異なる場合があるので、詳細は[textlint-rule-preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing "textlint-rule-preset-ja-technical-writing")を参照してください。

また、ルールの大部分は読みにくさを排除してシンプルな文章にするためのものが中心です。
技術文書には小説のような言い回しなどは不要であるため、できるだけわかりやすく簡潔な表現をするためのものです。

- [文書執筆の指南書で解説されている問題点を textlint で発見する - Qiita](http://qiita.com/azu/items/60764ed6f415d3c748bf "文書執筆の指南書で解説されている問題点を textlint で発見する - Qiita")
- [文書執筆の指南書で解説されている問題点を RedPen で発見する - Qiita](http://qiita.com/takahi-i/items/a8b994ef17fd66fe6237 "文書執筆の指南書で解説されている問題点を RedPen で発見する - Qiita")

上記の記事では技術文書の指南書で解説されている文書の問題点とそれに対するルールがまとめられています。
このプリセットも大部分は上記の記事で解説している内容が反映されています。

* 1文の長さは90文字以下とする
* カンマは1文中に3つまで
* 読点は1文中に3つまで
* 連続できる最大の漢字長は5文字まで
* 漢数字と算用数字を使い分けます
* 「ですます調」、「である調」を統一します
* 文末の句点記号として「。」を使います
* 二重否定は使用しない
* ら抜き言葉を使用しない
* 同じ表現から文を開始しすぎない
* 逆接の接続助詞「が」を連続して使用しない
* 同じ接続詞を連続して使用しない
* 同じ助詞を連続して使用しない
* UTF8-MAC 濁点を使用しない
* 感嘆符!！、感嘆符?？を使用しない
* 半角カナを使用しない
* 弱い日本語表現の利用を使用しない
* 同一の単語を間違えて連続しているのをチェックする
* よくある日本語の誤用をチェックする

<!-- tocstop -->

### 1文の長さは90文字以下とする
> [https://github.com/azu/textlint-rule-sentence-length](https://github.com/azu/textlint-rule-sentence-length)

長過ぎる文は読みにくさに繋がるため、適切な単位で文を区切ってください。
        
### カンマは1文中に3つまで
> [https://github.com/azu/textlint-rule-max-comma](https://github.com/azu/textlint-rule-max-comma)

カンマ（,）の多用は、文が長くなっている可能性があります。
        
### 読点は1文中に3つまで
> [https://github.com/azu/textlint-rule-max-ten](https://github.com/azu/textlint-rule-max-ten)

読点（、）の多用は、文が長くなっている可能性があります。
        
### 連続できる最大の漢字長は5文字まで
> [https://github.com/azu/textlint-rule-max-kanji-continuous-len](https://github.com/azu/textlint-rule-max-kanji-continuous-len)

漢字同士が連続していると読みにくさにつながります。
助詞を入れるなどして漢字だけで文章を書かないようにします。

長い漢字の固有名詞は `allow` オプションに記述して回避します。
        
### 漢数字と算用数字を使い分けます
> [https://github.com/azu/textlint-rule-preset-JTF-style](https://github.com/azu/textlint-rule-preset-JTF-style)

数量を表現し、数を数えられるものは算用数字を使用します。任意の数に置き換えても通用する語句がこれに該当します。

慣用的表現、熟語、概数、固有名詞、副詞など、漢数字を使用することが一般的な語句では漢数字を使います。

### 「ですます調」、「である調」を統一します
> [https://github.com/azu/textlint-rule-no-mix-dearu-desumasu](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu)

- 見出しは自動
- 本文はですます調
- 箇条書きはである調

文体は見出し、本文、箇条書きの中では統一した表記にします。

### 文末の句点記号として「。」を使います
> [https://github.com/textlint-ja/textlint-rule-ja-no-mixed-period](https://github.com/textlint-ja/textlint-rule-ja-no-mixed-period)

文末には「。」を使い文を区切ります。

「。」のつけ忘れのチェックや「:」で文を区切らないようにします。

        
### 二重否定は使用しない
> [https://github.com/azu/textlint-rule-no-double-negative-ja](https://github.com/azu/textlint-rule-no-double-negative-ja)

二重否定は使用しません。
        
### ら抜き言葉を使用しない
> [https://github.com/azu/textlint-rule-no-dropping-the-ra](https://github.com/azu/textlint-rule-no-dropping-the-ra)

ら抜き言葉は使用しません。

### 同じ表現から文を開始しすぎない
> [https://github.com/azu/textlint-rule-no-start-duplicated-conjunction](https://github.com/azu/textlint-rule-no-start-duplicated-conjunction)

同じ表現から文を開始している場合、同じことを繰り返し説明している場合があります。

箇条書きなどで同じ表現から開始したいは[textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments "textlint-filter-rule-comments")を使い回避してください。

### 逆接の接続助詞「が」を連続して使用しない
> [https://github.com/takahashim/textlint-rule-no-doubled-conjunctive-particle-ga](https://github.com/takahashim/textlint-rule-no-doubled-conjunctive-particle-ga)

逆接の接続助詞「が」は、特に否定の意味ではなくても安易に使われてしまいがちです。

同一文中に複数回出現していないかをチェックします。
       
### 同じ接続詞を連続して使用しない
> [https://github.com/takahashim/textlint-rule-no-doubled-conjunction](https://github.com/takahashim/textlint-rule-no-doubled-conjunction)


### 同じ助詞を連続して使用しない
> [https://github.com/azu/textlint-rule-no-doubled-joshi](https://github.com/azu/textlint-rule-no-doubled-joshi)

同じ助詞が連続して書かれているとどこに助詞がかかっているのかがわかりにくくなります。

> 材料不足で代替素材で製品を作った。


### UTF8-MAC 濁点を使用しない
> [https://github.com/azu/textlint-rule-no-nfd](https://github.com/azu/textlint-rule-no-nfd)

文章中にUTF8-MAC 濁点は不要です。
ファイルからコピー＆ペーストした文字である場合があります。

        
### 感嘆符!！、感嘆符?？を使用しない
> [https://github.com/azu/textlint-rule-no-exclamation-question-mark](https://github.com/azu/textlint-rule-no-exclamation-question-mark)

技術文書では感情的な表現はあまり使用するべきではありません。

特定の感嘆符または感嘆符を使用する場合は、オプションで許可して利用してください。
デフォルトでは全て禁止しています。
 
### 半角カナを使用しない
> [https://github.com/azu/textlint-rule-no-hankaku-kana](https://github.com/azu/textlint-rule-no-hankaku-kana)

全角カタカナを使用してください。
        
### 弱い日本語表現の利用を使用しない
> [https://github.com/textlint-ja/textlint-rule-ja-no-weak-phrase](https://github.com/textlint-ja/textlint-rule-ja-no-weak-phrase)

`〜かもしれない` 等の弱い表現を使用しない。

### 同一の単語を間違えて連続しているのをチェックする
> [https://github.com/textlint-ja/textlint-rule-ja-no-successive-word](https://github.com/textlint-ja/textlint-rule-ja-no-successive-word)

同一の単語(形態素解析したtoken)が連続している場合は誤字の可能性があります。

誤字でない場合は、[Issue報告](https://github.com/textlint-ja/textlint-rule-ja-no-successive-word/issues/new)してください。
        
### よくある日本語の誤用をチェックする
> [https://github.com/textlint-ja/textlint-rule-ja-no-abusage](https://github.com/textlint-ja/textlint-rule-ja-no-abusage)

日本語や技術表現における漢字の誤用などをチェックするルールです。


----

## 類似ルール

ルール的にもJTFスタイルガイドと似ている部分は多いです。

- [azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.](https://github.com/azu/textlint-rule-preset-JTF-style)
- [JTF日本語標準スタイルガイドのルールセットで文章をチェックできるtextlintプリセット | Web Scratch](http://efcl.info/2015/10/19/textlint-plugin-JTF-style/)

[textlint-rule-preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing "textlint-rule-preset-ja-technical-writing")では、単純な辞書での一致ではなく、形態素解析をしているルールが多いです。
(JTF-styleは正規表現で頑張った感じ)

JTFスタイルガイドは名前の通りスタイル周りも含めていますが、[textlint-rule-preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing "textlint-rule-preset-ja-technical-writing")では含まれていません。

スタイル周り(スペースの入れ方)については、別のプリセットを作っているのでそちらを参照してください。

- [textlint-ja/textlint-rule-spacing: スペース周りのスタイルを扱うtextlintルール集](https://github.com/textlint-ja/textlint-rule-spacing "textlint-ja/textlint-rule-spacing: スペース周りのスタイルを扱うtextlintルール集")

## 参考

- [writing-guideline/writing-standard.md at master · continuous-manual-writing/writing-guideline](https://github.com/continuous-manual-writing/writing-guideline/blob/master/writing-standard.md "writing-guideline/writing-standard.md at master · continuous-manual-writing/writing-guideline")

## コミュニティ

textlintの日本語周りについて話せるコミュニティが[![Gitter](https://badges.gitter.im/textlint-ja/textlint-ja.svg)](https://gitter.im/textlint-ja/textlint-ja)にあります。
Organizationなっているので、日本語関係のルールを置きたい場合も言ってもらえれば対応できます。

- [textlint-ja/textlint-ja: textlintの日本語コミュニティ](https://github.com/textlint-ja/textlint-ja)
- [textlint-ja/textlint-ja - Gitter](https://gitter.im/textlint-ja/textlint-ja)
