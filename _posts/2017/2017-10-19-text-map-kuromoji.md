---
title: "kuromoji.jsで形態素解析した結果とテキストの関係をビジュアライズする"
author: azu
layout: post
date : 2017-10-19T09:45
category: JavaScript
tags:
    - JavaScript
    - 形態素解析

---

[くだけた表現を高精度に解析するための正規化ルール自動生成手法](https://ipsj.ixsq.nii.ac.jp/ej/?action=pages_view_main&active_action=repository_view_main_item_detail&item_id=70540&item_no=1&page_id=13&block_id=8 "くだけた表現を高精度に解析するための正規化ルール自動生成手法")という論文誌では、「ヵゎぃぃ」，「ゎた Uゎ」みたいな普通の形態素解析では未知語として検出されるものをどうやって正規化していくかという話が書かれていました。

これを読んでいて面白かったのは形態素解析をした結果の未知語となった部分と穴埋め的にパターンを作って、そのパターンにマッチする同じようなテキストを探すというアプローチでした。

プログラミング言語と違って、大抵の自然言語パーサはパース失敗ではなく、単なる未知な言葉として検出されます。
また、その未知な言葉は常に増えていて、さきほどの[くだけた表現を高精度に解析するための正規化ルール自動生成手法](https://ipsj.ixsq.nii.ac.jp/ej/?action=pages_view_main&active_action=repository_view_main_item_detail&item_id=70540&item_no=1&page_id=13&block_id=8 "くだけた表現を高精度に解析するための正規化ルール自動生成手法")によると手動では登録できない増加量らしいです。

> 著者らの経験では，1 人月あたり約 3 万種類の未知語登録が可 能であるのに対し，ブログ 600 万文を著名な形態素解析器 MeCab 3) を用いて解析したと ころ，約 65 万種類の未知語が検出されたことから，ブログ文書のくだけた表現を正しく解 析することは困難といえる.

この辺のスラング的な単語もクローリングしたデータから辞書を作ることで扱える量が多い辞書として[mecab-ipadic-NEologd](https://github.com/neologd/mecab-ipadic-neologd "mecab-ipadic-NEologd")が有名です。

で、話を戻して形態素解析をした結果の未知語となるパターンってどれぐらいあるのかなーと思いました。
普通に形態素解析した結果を見ればいいのですが、それは品詞付きの情報が並ぶだけだったり、JSONだったりして、テキストのこの部分が未知語というのがあまり分かりやすくなさそうでした。

```
今日もしないとね。
今日    名詞,副詞可能,*,*,*,*,今日,キョウ,キョー
も      助詞,係助詞,*,*,*,*,も,モ,モ
し      動詞,自立,*,*,サ変・スル,未然形,する,シ,シ
ない    助動詞,*,*,*,特殊・ナイ,基本形,ない,ナイ,ナイ
と      助詞,接続助詞,*,*,*,*,と,ト,ト
ね      助詞,終助詞,*,*,*,*,ね,ネ,ネ
。      記号,句点,*,*,*,*,。,。,。
EOS
今日    名詞,副詞可能,*,*,*,*,今日,キョウ,キョー
もし    副詞,一般,*,*,*,*,もし,モシ,モシ
ない    形容詞,自立,*,*,形容詞・アウオ段,基本形,ない,ナイ,ナイ
と      助詞,接続助詞,*,*,*,*,と,ト,ト
ね      助詞,終助詞,*,*,*,*,ね,ネ,ネ
。      記号,句点,*,*,*,*,。,。,。
```

入力されたテキストと特定の位置に関する情報をビジュアライズするパターンについてはSourceMapを調べていたときに[source-map-visualization](http://sokra.github.io/source-map-visualization/ "source-map-visualization")というサイトがあるのを思い出しました。

[![sourcemap](http://efcl.info/wp-content/uploads/2017/10/19-1508374636.png)](http://sokra.github.io/source-map-visualization/)

- [Source Mapを扱う関連ライブラリのまとめ | Web Scratch](http://efcl.info/2014/0622/res3933/ "Source Mapを扱う関連ライブラリのまとめ | Web Scratch")

これの形態素解析版があると良さそうと思いました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">これの形態素解析版ほしいな  &quot;source-map-visualization&quot;  <a href="https://t.co/PZuGwXdYIQ">https://t.co/PZuGwXdYIQ</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/920646507254050822?ref_src=twsrc%5Etfw">October 18, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

ここで、既にJavaScriptとそのパース結果からECMAScriptのバージョンをToken毎に割り出すツールを作ってたのを思い出しました。


[![image](http://efcl.info/wp-content/uploads/2016/08/04-1470309082.png)](https://azu.github.io/ecmascript-version-detector/)

- [そのコードが標準化されてるJavaScriptなのかを判定する方法 | Web Scratch](http://efcl.info/2016/08/04/ecmascript-version-detector/ "そのコードが標準化されてるJavaScriptなのかを判定する方法 | Web Scratch")

これをforkして[kuromoji.js](https://github.com/takuyaa/kuromoji.js#api "kuromoji.js")で形態素解析してその結果をビジュアライズするものを作りました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://t.co/zypZDjn20j">https://t.co/zypZDjn20j</a><a href="https://t.co/UOhjzSxMhI">https://t.co/UOhjzSxMhI</a><br><br>kuromojiで形態素解析した結果をビジュアライズするやつできた。<br>テキストをクリックすると対応した位置のトークン情報が表示される。 <a href="https://t.co/AqrbhMJFBm">pic.twitter.com/AqrbhMJFBm</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/920676180797173762?ref_src=twsrc%5Etfw">October 18, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


- サイト: [text-map-kuromoji](https://azu.github.io/text-map-kuromoji/)
- ソースコード:[azu/text-map-kuromoji: テキストを形態素解析した結果とテキストの関係をビジュアライズするエディタ](https://github.com/azu/text-map-kuromoji)

それで目的だった壊れた日本語は未知語として検出されるのかを確かめてみましたが、てにをはを間違えただけとかその程度だとやっぱり未知語として検出されないということがわかりました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">日本語の文章ってやっぱり普通に書くと未知語が結構出にくいっぽい気がする。<br><br>変換ミスだとアルファベットが混ざってくるので未知語 = 壊れた文章の検出ができる可能性はありそう。<br>壊れた日本語は検出するの難しいかもなー。パースが失敗しない問題 <a href="https://t.co/EhpmHv34LD">pic.twitter.com/EhpmHv34LD</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/920678011141201920?ref_src=twsrc%5Etfw">October 18, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

一方、ローマ字入力のIME特有のtypoはアルファベットが不自然に混ざるからか未知な言葉として検出されやすくかったです(論文誌の形状が似てる言葉もこういうタイプ)

- [textlint-ja/textlint-rule-ja-unnatural-alphabet: 不自然なアルファベットを検知するtextlintルール](https://github.com/textlint-ja/textlint-rule-ja-unnatural-alphabet "textlint-ja/textlint-rule-ja-unnatural-alphabet: 不自然なアルファベットを検知するtextlintルール")

やっぱり形態素解析に失敗するパーサの必要性を感じました。