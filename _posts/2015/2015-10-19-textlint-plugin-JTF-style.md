---
title: "JTF日本語標準スタイルガイドのルールセットで文章をチェックできるtextlintプラグイン"
author: azu
layout: post
date : 2015-10-19T09:07
category: JavaScript
tags:
    - textlint
    - plugin
    - JavaScript

---


## textlint

昨日、[textlint 4.0をリリース](http://efcl.info/2015/10/18/textlint-4.0/ "校正ツール textlint 4.0リリース | Web Scratch")しましたが、textlintはMarkdownなどの文章に対してルールベースでチェックできるツールです。

詳しくは以下の記事を参照してください。

- [textlintで日本語の文章をチェックする | Web Scratch](http://efcl.info/2015/09/10/introduce-textlint/)
- [textlint + prhで表記ゆれを検出する | Web Scratch](http://efcl.info/2015/09/14/textlint-rule-prh/)
- [今すぐ電子書籍(技術書)を書き始める方法と文章の自動チェック | Web Scratch](http://efcl.info/2015/09/28/easy-to-create-ebook/)

## [textlint-plugin-JTF-style](https://github.com/azu/textlint-plugin-JTF-style "textlint-plugin-JTF-style")

textlintのプラグイン(ルールセット)として[textlint-plugin-JTF-style](https://github.com/azu/textlint-plugin-JTF-style "textlint-plugin-JTF-style")を作成しました。

これへ[日本翻訳連盟](http://www.jtf.jp/ "日本翻訳連盟")の[JTF日本語標準スタイルガイド（翻訳用）](https://www.jtf.jp/jp/style_guide/styleguide_top.html "JTF日本語標準スタイルガイド（翻訳用）")をtextlintのルールとして実装したものです。

> 『JTF日本語標準スタイルガイド（翻訳用）』は、実務翻訳において和訳時に使用できる日本語表記ガイドラインです。2012年1月30日に初版を公開しました。『JTF日本語標準スタイルガイド』はどなたでも無償で使用できます。日本語の表記のゆらぎを防いで、スムーズに表記を統一するためのガイドラインとして活用してください

[jtf_style_guide.pdf](https://www.jtf.jp/jp/style_guide/pdf/jtf_style_guide.pdf)からスタイルガイドの内容を読むことができます。

## インストール

現在のディレクトリに`textlint`と`textlint-plugin-jtf-style`をインストールして使うと、グローバルにインストールしなくても良くなります。

	npm init # package.jsonがないなら
	npm install -D textlint textlint-plugin-jtf-style

textlintの設定ファイルとなる`.textlintrc`に次のように`textlint-plugin-jtf-style`を設定します。

`textlint-plugin-`というprefixは省略して設定します。

```json
{
    "plugins": [
        "jtf-style"
    ]
}
```

後は、インストールした`textlint`でチェックしたいファイルを指定して実行します。

```
node_modules/.bin/textlint /path/to/target.md
```

もしくは`package.json`のrun-scriptにtextlintを定義して

```
  "scripts": {
    "textlint": "textlint -f pretty-error",
  },
```

`npm run`コマンド経由で実行すると良さそうです。

```
npm run textlint -- /path/to/target.md
```

![screenshot](https://monosnap.com/file/q6345QwaZACnrGN6MBrFqFvpRTOVZV.png)

## スタイルガイド

日本語に関するスタイルガイドをいくつか調べていたのですが、技術文章は元となる技術が英語圏のものであることが殆どなので、翻訳向けのスタイルガイドは違和感が少なく相性は悪く無いと思います。

- [日本語文章のスタイルガイドのまとめ - Qiita](http://qiita.com/azu/items/623e5f50ccac2d4a8ac8 "日本語文章のスタイルガイドのまとめ - Qiita")

ただし、カタカナ表記などはJTFスタイルガイドが参照する[外来語（カタカナ）表記ガイドライン](http://www.jtca.org/standardization/ "外来語（カタカナ）表記ガイドライン")が技術文章向けではないのでそこは違和感が出る場所もあるかもしれません。

- [JTF日本語標準スタイルガイドを読んでみる（HTML5仕様の翻訳方針について） - 血統の森+はてな](http://d.hatena.ne.jp/momdo/20131228/p1 "JTF日本語標準スタイルガイドを読んでみる（HTML5仕様の翻訳方針について） - 血統の森+はてな")

textlintでは違和感があるルールは個別に無効化することができます。
例えばカタカナに関しては以下のルールを無効化すると抑制することができるようになっています。

```json
{
  "plugins": [
    "jtf-style"
  ],
  "rules": {
    "jtf-style/2.1.5.カタカナ": false,
    "jtf-style/2.1.6.カタカナの長音": false,
  }
}
```

JTFスタイルガイドは簡単な小さなルールが60個ほどあって、大体の部分はあまり意識せずにやってる書き方になってると思います。

[JTF日本語標準スタイルガイド（翻訳用）](https://www.jtf.jp/jp/style_guide/styleguide_top.html "JTF日本語標準スタイルガイド（翻訳用）")は例文も載っているので、読み物として見てみると面白いかもしれません。

## ルール一覧

最新の実装状況は[azu/textlint-plugin-JTF-style](https://github.com/azu/textlint-plugin-JTF-style "azu/textlint-plugin-JTF-style")を見たほうがいいですが、以下に現在実装されてるルール一覧を載せておきます。

そもそも正否がチェックできないルールが一部存在しますが、だいたい40/60程度実装してあります。

今のところ全てがデフォルトで有効になっていますが、1.0までにデフォルトは警告だけとするものを追加するかもしれません。

<table>
<tbody><tr>
    <th>対応ルール</th>
    <th>ページ（v2.1）</th>
    <th>小項目</th>
    <th>JTF標準ルール</th>
    <th>中項目</th>
    <th>大項目</th>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/1.1.1.js">1.1.1.js</a></td>
    <td>10</td>
    <td>本文</td>
    <td>目的に応じて敬体、常体のどちらかに統一する。</td>
    <td>文体</td>
    <td>基本文型</td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/1.1.2.js">1.1.2.js</a></td>
    <td>10</td>
    <td>見出し</td>
    <td>常体または体言止め。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/1.1.3.js">1.1.3.js</a></td>
    <td>10</td>
    <td>箇条書き</td>
    <td>「本文」の文体に合わせる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>不可</td>
    <td>11</td>
    <td>図表内テキスト</td>
    <td>「本文」の文体に合わせる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/1.1.5.js">1.1.5.js</a></td>
    <td>11</td>
    <td>図表のキャプション</td>
    <td>「本文」の文体に合わせる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/1.2.1.js">1.2.1.js</a></td>
    <td>11</td>
    <td>句点（。）と読点（、）</td>
    <td>全角の「、」と「。」を使う。</td>
    <td>句読点の使用</td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/1.2.2.js">1.2.2.js</a></td>
    <td>11</td>
    <td>ピリオド（.）とカンマ（,）</td>
    <td>和文の句読点として使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>未実装</td>
    <td>11</td>
    <td>ひらがな</td>
    <td>全角。昭和61年7月1日内閣告示第1号の「現代仮名遣い」に準じる。</td>
    <td>用字、用語</td>
    <td>文字の表記</td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/2.1.2.js">2.1.2.js</a> (辞書ベース)</td>
    <td>11</td>
    <td>漢字</td>
    <td>常用漢字表にゆるやかに準じる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>未実装</td>
    <td>12</td>
    <td>漢字の送りがな</td>
    <td>昭和48年6月18日内閣告示第2号「送り仮名の付け方」に準じる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>未実装</td>
    <td>13</td>
    <td>複合語の送りがな</td>
    <td>昭和48年6月18日内閣告示第2号「送り仮名の付け方」に準じる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/2.1.5.js">2.1.5.js</a> (辞書ベース)</td>
    <td>14</td>
    <td>カタカナ</td>
    <td>全角。半角カタカナは特殊用途を除いて使わない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/2.1.6.js">2.1.6.js</a> (辞書ベース)</td>
    <td>14</td>
    <td>カタカナの長音</td>
    <td>原則として省略しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>不可</td>
    <td>15</td>
    <td>カタカナ複合語</td>
    <td>中黒または半角スペースで区切る。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/2.1.8.js">2.1.8.js</a></td>
    <td>16</td>
    <td>算用数字</td>
    <td>半角。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/2.1.9.js">2.1.9.js</a></td>
    <td>16</td>
    <td>アルファベット</td>
    <td>半角。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/2.1.10.js">2.1.10.js</a></td>
    <td>16</td>
    <td>算用数字（位取りの表記）</td>
    <td>桁区切りには「カンマ」、小数点には「ピリオド」を使う。ただし桁区切りの「カンマ」は省略する場合がある。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/2.2.1.js">2.2.1.js</a> (辞書ベース)</td>
    <td>17</td>
    <td>ひらがなと漢字の使い分け</td>
    <td>参考文献に従う。</td>
    <td>文字の表記と使い分け</td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/2.2.2.js">2.2.2.js</a></td>
    <td>19</td>
    <td>算用数字と漢数字の使い分け</td>
    <td>数えられるものは算用数字。慣用句は漢数字。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/2.2.3.js">2.2.3.js</a></td>
    <td>20</td>
    <td>一部の助数詞の表記</td>
    <td>「〜か月」、「〜か所」</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/3.1.1.js">3.1.1.js</a></td>
    <td>20</td>
    <td>全角と半角の間</td>
    <td>スペースなし</td>
    <td>単一文字間のスペースの有無</td>
    <td>文字間のスペース</td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/3.1.2.js">3.1.2.js</a></td>
    <td>20</td>
    <td>全角どうし</td>
    <td>スペースなし</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>不可</td>
    <td>20</td>
    <td>半角どうし</td>
    <td>和文中に欧文を引用するなど、和文に欧文が含まれる場合は欧文中の半角スペースを維持する。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/3.2.js">3.2.js</a></td>
    <td>20</td>
    <td>カタカナ語間のスペースの有無</td>
    <td>中黒または半角スペースを入れる。</td>
    <td>カタカナ語間のスペースの有無</td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/3.3.js">3.3.js</a></td>
    <td>20</td>
    <td>かっこ類と隣接する文字の間のスペース</td>
    <td>スペースなし</td>
    <td>かっこ類と隣接する文字の間のスペースの有無</td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.1.1.js">4.1.1.js</a></td>
    <td>21</td>
    <td>句点（。）</td>
    <td>全角</td>
    <td>句読点</td>
    <td>記号の表記と用途</td>
</tr>
<tr>
    <td>不可(1.2.2参照)</td>
    <td>21</td>
    <td>読点（、）</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.1.3.js">4.1.3.js</a> (1.2.2参照)</td>
    <td>21</td>
    <td>ピリオド（.）、カンマ（,）</td>
    <td>半角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.2.1.js">4.2.1.js</a></td>
    <td>21</td>
    <td>感嘆符（！）</td>
    <td>全角。和文では多用しない。</td>
    <td>記号</td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.2.2.js">4.2.2.js</a></td>
    <td>22</td>
    <td>疑問符（？）</td>
    <td>全角。和文では多用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>チェック項目なし</td>
    <td>22</td>
    <td>スラッシュ（/）</td>
    <td>全角または半角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.2.4.js">4.2.4.js</a></td>
    <td>22</td>
    <td>中黒（・）</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.2.5.js">4.2.5.js</a></td>
    <td>22</td>
    <td>波線（〜または～）</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.2.6.js">4.2.6.js</a></td>
    <td>22</td>
    <td>ハイフン（-）</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.2.7.js">4.2.7.js</a></td>
    <td>23</td>
    <td>コロン（：）</td>
    <td>全角。和文では多用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.2.8.js">4.2.8.js</a></td>
    <td>23</td>
    <td>セミコロン（；）</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.2.9.js">4.2.9.js</a></td>
    <td>23</td>
    <td>ダッシュ（－）</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.3.1.js">4.3.1.js</a></td>
    <td>23</td>
    <td>丸かっこ（）</td>
    <td>全角</td>
    <td>かっこ</td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.3.2.js">4.3.2.js</a></td>
    <td>23</td>
    <td>大かっこ［］</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.3.3.js">4.3.3.js</a></td>
    <td>23</td>
    <td>かぎかっこ「」</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.3.4.js">4.3.4.js</a></td>
    <td>23</td>
    <td>二重かぎかっこ『』</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.3.5.js">4.3.5.js</a> (対の有無)</td>
    <td>23</td>
    <td>二重引用符\" \"</td>
    <td>半角。和文では多用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.3.6.js">4.3.6.js</a> (対の有無)</td>
    <td>24</td>
    <td>中かっこ{}</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.3.7.js">4.3.7.js</a> (対の有無)</td>
    <td>24</td>
    <td>山かっこ＜＞</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="/azu/textlint-plugin-JTF-style/blob/master/src/4.3.8.js">4.3.8.js</a> (対の有無)</td>
    <td>24</td>
    <td>一重引用符' '</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>不可</td>
    <td>24</td>
    <td>JIS規格Z8202「量及び単位」、Z8203「国際単位系(SI)及びその使い方」に従う。</td>
    <td></td>
    <td>単位系</td>
    <td>単位の表記</td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>主に、英字による表記とカタカナによる表記がある。</td>
    <td></td>
    <td>単位記号の表記</td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>時間、時刻</td>
    <td>時間、時、分、秒、ミリ秒</td>
    <td>個別の単位</td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>長さ</td>
    <td>mm、km、ミリメートル、センチメートル</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>質量</td>
    <td>g、kg、t、グラム、キログラム、トン</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>面積、体積</td>
    <td>㎡、平方メートル、立法メートル</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>電気</td>
    <td>A、W、V、アンペア、ワット、ボルト</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>温度</td>
    <td>℃</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>周波数</td>
    <td>Hz、ヘルツ</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>速度</td>
    <td>m/s、キロメートル毎時、分速～km</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>伝送速度</td>
    <td>bps、Kbps、バイト/秒</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>割合</td>
    <td>％、パーセント</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>角度</td>
    <td>90°、90度</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>記憶容量</td>
    <td>ビット、バイト、Kb、KB、Mb、MB</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>通貨</td>
    <td>円、米ドル、ユーロ、＄、USD</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>その他</td>
    <td></td>
    <td></td>
    <td></td>
</tr>
</tbody></table>

個人的な感覚だと辞書ベースと鳴っている部分は人によって感覚のズレが起きやすい気がします。
そういう表記揺れを統一するためのスタイルガイドですが、煩わしい場合は個別に無効にして使うと良さそうです。
