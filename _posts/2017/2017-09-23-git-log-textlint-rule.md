---
title: "Gitの修正コミットから同じ過ちを見つけるtextlintルールを書いたけど上手くできなかった"
author: azu
layout: post
date : 2017-09-23T22:01
category: textlint
tags:
    - JavaScript
    - git
    - textlint

---

1年ぐらい前に、一度間違えたことをまた書き間違えるという現象をどうにかしたいと思った。
これが発生する要因は簡単でIMEで入力してるので、IMEが同じ間違いを学習してしまうという問題があった。

普段文章書いてるのは、大体ブログや[JavaScriptの入門書](https://github.com/asciidwango/js-primer "JavaScriptの入門書")とかの技術書とかなので基本的にGitで管理されているという点を利用してどうにかできないかなと考えてた。

そこで作ったのは、Gitの修正履歴から校正辞書を作って[textlint](https://github.com/textlint/textlint "textlint")で自動校正するという仕組み。

以下に一応動く形でおいてある。

- [azu/git-log-to-errata: Git log to errata list.](https://github.com/azu/git-log-to-errata)
- [azu/textlint-rule-git-log-to-errata: git log to eratta rule](https://github.com/azu/textlint-rule-git-log-to-errata)

[git-log-to-errata](https://github.com/azu/git-log-to-errata "git-log-to-errata")を使うと特定のファイルに対する修正コミットっぽいものからErrataデータを作成できる。

このErrataデータは次のような、[kuromoji.js](https://github.com/takuyaa/kuromoji.js "kuromoji.js")で形態素解析したtokenのdiff表現を一つのまとまりとして辞書的なものにしてた。

```
[
    {
        "oldTokens": [
            {
                "word_id": 1299820,
                "word_type": "KNOWN",
                "surface_form": "、",
                "pos": "名詞",
                "pos_detail_1": "数",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "、",
                "reading": "、",
                "pronunciation": "、"
            },
            {
                "word_id": 230,
                "word_type": "UNKNOWN",
                "surface_form": "グロール",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "*"
            },
            {
                "word_id": 871050,
                "word_type": "KNOWN",
                "surface_form": "空間",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "空間",
                "reading": "クウカン",
                "pronunciation": "クーカン"
            }
        ],
        "newTokens": [
            {
                "word_id": 1299820,
                "word_type": "KNOWN",
                "surface_form": "、",
                "pos": "名詞",
                "pos_detail_1": "数",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "、",
                "reading": "、",
                "pronunciation": "、"
            },
            {
                "word_id": 534010,
                "word_type": "KNOWN",
                "surface_form": "グローバル",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "グローバル",
                "reading": "グローバル",
                "pronunciation": "グローバル"
            },
            {
                "word_id": 871050,
                "word_type": "KNOWN",
                "surface_form": "空間",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "空間",
                "reading": "クウカン",
                "pronunciation": "クーカン"
            }
        ],
        "start": 1,
        "end": 2,
        "oldText": "、グロール空間",
        "newText": "、グローバル空間"
    },
    {
        "oldTokens": [
            {
                "word_id": 662320,
                "word_type": "KNOWN",
                "surface_form": "項目",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "項目",
                "reading": "コウモク",
                "pronunciation": "コーモク"
            },
            {
                "word_id": 2594290,
                "word_type": "KNOWN",
                "surface_form": "に",
                "pos": "助詞",
                "pos_detail_1": "格助詞",
                "pos_detail_2": "一般",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "に",
                "reading": "ニ",
                "pronunciation": "ニ"
            },
            {
                "word_id": 729050,
                "word_type": "KNOWN",
                "surface_form": "かなり",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "かなり",
                "reading": "カナリ",
                "pronunciation": "カナリ"
            }
        ],
        "newTokens": [
            {
                "word_id": 662320,
                "word_type": "KNOWN",
                "surface_form": "項目",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "項目",
                "reading": "コウモク",
                "pronunciation": "コーモク"
            },
            {
                "word_id": 2595180,
                "word_type": "KNOWN",
                "surface_form": "が",
                "pos": "助詞",
                "pos_detail_1": "格助詞",
                "pos_detail_2": "一般",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "が",
                "reading": "ガ",
                "pronunciation": "ガ"
            },
            {
                "word_id": 729050,
                "word_type": "KNOWN",
                "surface_form": "かなり",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "かなり",
                "reading": "カナリ",
                "pronunciation": "カナリ"
            }
        ],
        "start": 1,
        "end": 2,
        "oldText": "項目にかなり",
        "newText": "項目がかなり"
    }
]
```

Errataデータも[kuromoji.js](https://github.com/takuyaa/kuromoji.js "kuromoji.js")作った形態素解析結果から、差分がいかにも[誤字の修正っぽい距離感](https://github.com/azu/git-log-to-errata/blob/61bfd7f35e97147fb5fea36e07f4e1e34758033c/src/MatcherTokenizer.js#L66)のデータを集めて色々フィルターしたものを吐いてた。

そうして作ったErrataデータを[textlint-rule-git-log-to-errata](https://github.com/azu/textlint-rule-git-log-to-errata "textlint-rule-git-log-to-errata")に食べさせると、同じ間違い(上のErrataデータの`oldTokens`にマッチするもの)を見つけて修正するというやつだった。

一応動いたのだけどfalse positiveな感じが強くてちゃんと使ってなかった。
そうなってしまった主な理由としては次のような感じ。

- 書いてる文書によってコンテキストが異なる
	- どちらも正しい修正はあるため、同じ修正でも文書が異なれば意味が違う
	- `,`ではなく`、`を使うといったスタイルの修正はこれに該当する
		- そういうのもあって記号は除外してたけど文法にもですますの違いとか色々あった
- コミットデータは具体的すぎてコンテキストの違いに対応するコストが大きかった
	- コミットには人の癖が多く含まれるので、そのデータを直接使うと癖が強すぎる感じがした
	- 自動校正はfalse positiveを嫌うので、結果が0,1じゃないと扱いにくい感じ
	- 校正じゃなくて〜とするのはどうですかという提案ベースのものになれば大分ましになりそう
	- こういうのはもっと大量のデータを集めて機械学習とかでやったほうが良いと思った

0 or 1 じゃない結果を出す場合、[textlint](https://github.com/textlint/textlint "textlint")はあんまりそれに適したUIではないので別のツールが必要かなと思って開発を止めた。
[textlintルールはエキスパートルールが多いので](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule)、機械学習とか使ったいい感じの方法は別の人がやってくれるかなと思った。

なんで今さらこれについて書いたかというと[朝日新聞社メディアラボ、AI活用の文章自動校正システムを開発 | マイナビニュース](http://news.mynavi.jp/news/2017/09/22/174/ "朝日新聞社メディアラボ、AI活用の文章自動校正システムを開発 | マイナビニュース")でそういうことをやってそうなので、ついでに書いた。
