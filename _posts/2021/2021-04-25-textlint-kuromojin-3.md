---
title: "kuromojin@3のアップデートと同時に、textlintルールをまとめてアップデートしました"
author: azu
layout: post
date : 2021-04-25T23:24
category: textlint
tags:
    - JavaScript
    - textlint

---

[kuromojin](https://github.com/azu/kuromojin)は、形態素解析ライブラリの[kuromoji.js](https://github.com/takuyaa/kuromoji.js)をラップしたライブラリです。
kuromojin v2までは、kuromoji.js 0.1.1に固定していました。
kuromoji.jsの最新バージョンは[0.1.2](https://github.com/takuyaa/kuromoji.js/releases/tag/0.1.2)であるため、[v3.0.0](https://github.com/azu/kuromojin/releases/tag/v3.0.0)でこれを取り込んだものをリリースしています。

📝 patchバージョンですが0.xなのでBREAKING CHANGEが含まれていて、具体的には次のIssueの内容によって形態素解析結果のトークンが変わリます。
また、kuromojin側でkuromoji.jsのバージョンを固定しているのは、バージョンがずれると複数の辞書ファイルをロードしてしまうことがあるのと、
辞書の差分はBREAKING CHANGEになってしまうので固定しています。(辞書とsemverは相性が悪いです)

- [研究 is broken down into 研 and 究 · Issue #16 · takuyaa/kuromoji.js](https://github.com/takuyaa/kuromoji.js/issues/16)

[kuromojin](https://github.com/azu/kuromojin)は主にtextlintのルールを書くために使っていて、キャッシュの処理やPromise対応などを含んでいます。
形態素解析に使う辞書は1つに統一したいので、基本的にはtextlintルールで使う[kuromojin](https://github.com/azu/kuromojin)のバージョンは統一したい問題があります。

そのため、次のようなIssueを作って、[kuromojin](https://github.com/azu/kuromojin)を使ってるtextlintルールをまとめてアップデートしました。

- [Update to kuromoji.js 0.1.2: HELP WANTED 🙇 🆘 · Issue #8 · azu/kuromojin](https://github.com/azu/kuromojin/issues/8)

具体的には次のtextlintルールを更新しています。
いろいろな方に協力してもらってアップデートしています。

- [textlint-ja/textlint-rule-max-ten: textlint rule that limit maxinum ten(、) count of sentence.](https://github.com/textlint-ja/textlint-rule-max-ten) @azu 
  - https://github.com/textlint-ja/textlint-rule-max-ten/releases/tag/v4.0.0
- [textlint-ja/textlint-rule-no-double-negative-ja: 二重否定をチェックするtextlint rule](https://github.com/textlint-ja/textlint-rule-no-double-negative-ja) @azu
  - https://github.com/textlint-ja/textlint-rule-no-double-negative-ja/releases/tag/v2.0.0
- [textlint-ja/analyze-desumasu-dearu: 文の敬体(ですます調)、常体(である調)を解析するJavaScriptライブラリ](https://github.com/textlint-ja/analyze-desumasu-dearu) @azu
    - [textlint-ja/textlint-rule-no-mix-dearu-desumasu: textlint rule that check no mix である and ですます.](https://github.com/textlint-ja/textlint-rule-no-mix-dearu-desumasu) @azu
- [textlint-ja/textlint-rule-morpheme-match: 形態素解析結果のTokenベースの辞書でマッチするtextlintルール](https://github.com/textlint-ja/textlint-rule-morpheme-match) @azu
   - https://github.com/azu/morpheme-match is library
- [textlint-ja/textlint-rule-ja-no-abusage: よくある日本語の誤用をチェックするtextlintルール](https://github.com/textlint-ja/textlint-rule-ja-no-abusage) @azu 
- [textlint-ja/textlint-rule-no-insert-dropping-sa: サ抜き、サ入れ表現の誤用をチェックするtextlintルール](https://github.com/textlint-ja/textlint-rule-no-insert-dropping-sa) @azu
- [textlint-ja/textlint-rule-ja-no-successive-word: 同一の単語を間違えて連続しているのを見つけるtextlintルール](https://github.com/textlint-ja/textlint-rule-ja-no-successive-word) @bizen241
- [textlint-ja/textlint-rule-ja-no-redundant-expression: 冗長な表現をチェックするtextlintルール](https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression) @azu
- [textlint-ja/textlint-rule-no-dropping-i: い抜き言葉をチェックするtextlintルール](https://github.com/textlint-ja/textlint-rule-no-dropping-i) @azu
- [hata6502/textlint-rule-ja-no-orthographic-variants: 表記ゆれをチェックするtextlintルール](https://github.com/hata6502/textlint-rule-ja-no-orthographic-variants) @hata6502
- [hata6502/textlint-rule-ja-no-inappropriate-words: 不適切表現をチェックするtextlintルール](https://github.com/hata6502/textlint-rule-ja-no-inappropriate-words) @hata6502
- [hata6502/textlint-rule-no-hoso-kinshi-yogo: 放送禁止用語をチェックするtextlintルール](https://github.com/hata6502/textlint-rule-no-hoso-kinshi-yogo) @hata6502
- [textlint-ja/textlint-rule-no-dropping-the-ra: ら抜き言葉をチェックするtextlintルール](https://github.com/textlint-ja/textlint-rule-no-dropping-the-ra) @bizen241
- [textlint-ja/textlint-rule-no-doubled-joshi: 文中に同じ助詞が複数出てくるのをチェックするtextlintルール](https://github.com/textlint-ja/textlint-rule-no-doubled-joshi) @azu
- [textlint-ja/textlint-rule-no-doubled-conjunction: textlint plugin to check duplicated same conjunctions.](https://github.com/textlint-ja/textlint-rule-no-doubled-conjunction) @azu
- [textlint-ja/textlint-rule-ja-no-weak-phrase: 弱い表現の利用を禁止するtextlintルール](https://github.com/textlint-ja/textlint-rule-ja-no-weak-phrase) @azu
- [textlint-ja/textlint-rule-no-doubled-conjunctive-particle-ga: textlint rule plugin to check duplicated conjunctive particle `ga` in a sentence.](https://github.com/textlint-ja/textlint-rule-no-doubled-conjunctive-particle-ga) @azu

📝 この過程で[いくつかのtextlintルールが `textlint-ja` organizationに移管](https://github.com/azu/kuromojin/issues/8#issuecomment-826095828)されていたりもします。
[textlint-ja](https://github.com/textlint-ja)には日本語関係のルールを集めているので、興味がある人は[Gitter](https://gitter.im/textlint-ja/textlint-ja)あたりを見てください。

また、これらのルールを使うtextlintルールプリセットもアップデートしています。
それぞれのプリセットでアップデートしたルールの詳細は、リリースノートにかかれています。
基本的には[kuromojin@3](https://github.com/azu/kuromojin/releases/tag/v3.0.0)への更新とセンテンス分解をするライブラリである[sentence-splitter@3](https://github.com/azu/sentence-splitter/releases/tag/3.0.0)への更新を含んでいます。

- [textlint-ja/textlint-rule-preset-ja-technical-writing: 技術文書向けのtextlintルールプリセット](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing)
  - [Release v6.0.0 · textlint-ja/textlint-rule-preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing/releases/tag/v6.0.0)
- [textlint-ja/textlint-rule-preset-japanese: textlint rule preset for Japanese.](https://github.com/textlint-ja/textlint-rule-preset-japanese)
  - [Release v6.0.0 · textlint-ja/textlint-rule-preset-japanese](https://github.com/textlint-ja/textlint-rule-preset-japanese/releases/tag/v6.0.0)

このアップデートによって解析結果が改善されて、今まで見落としていた箇所も検知できるようになったりしています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">技術書向けのtextlintプリセットのtextlint-rule-preset-ja-technical-writing 6.0.0リリースしました。<a href="https://t.co/XuQD81hCWA">https://t.co/XuQD81hCWA</a><br><br>いろんなルールのアップデートを含んでいます。<br>アップデート後の修正例<a href="https://t.co/xg3q5UKeSN">https://t.co/xg3q5UKeSN</a> <a href="https://t.co/Psjy9JRsr1">pic.twitter.com/Psjy9JRsr1</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1386224040600244226?ref_src=twsrc%5Etfw">April 25, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

副産物として、全角ピリオド（`．`）をセンテンスの区切り文字を使うパターンにだいたいのルールが対応しています。

## ブラウザ対応

実はここまでで出てきたtextlintルールの大部分はブラウザでも動くように書かれています。
(ブラウザで動かす場合、辞書のようなサイズが大きなものは一つに統一しないといけないので、kuromojinのアップデートをしたというのもあります。)

具体的には、[textlint-ja/textlint-rule-preset-ja-technical-writing: 技術文書向けのtextlintルールプリセット](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing)と[textlint-ja/textlint-rule-preset-japanese: textlint rule preset for Japanese.](https://github.com/textlint-ja/textlint-rule-preset-japanese)はブラウザでも動作します。

実際の次のURLでブラウザでも文章をチェックできます。

- <https://textlint-ja.github.io/textlint-rule-preset-japanese/>
- <https://textlint-ja.github.io/textlint-rule-preset-ja-technical-writing/>

## [textlint editor](https://github.com/textlint/editor)

ブラウザで動くということは、textlintはブラウザ拡張としても動きます。
[textlint editor](https://github.com/textlint/editor)という、`<textarea>`で好きなtextlintの設定でLintをするブラウザ拡張をベータ公開しています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">オフラインでも文章のチェックができるtextlint editorのブラウザ拡張のβ版公開しています🎉<br><br>Chrome:<a href="https://t.co/oi01i4iY0P">https://t.co/oi01i4iY0P</a><br><br>Firefox:<a href="https://t.co/TL3iNutkHA">https://t.co/TL3iNutkHA</a><br><br>使い方: <a href="https://t.co/ynZI4ANQMg">https://t.co/ynZI4ANQMg</a><br><br>サンプルルール:<a href="https://t.co/rdJ8RyPHGe">https://t.co/rdJ8RyPHGe</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1385513982585294849?ref_src=twsrc%5Etfw">April 23, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

[textlint editor](https://github.com/textlint/editor)には、以前記事などでも紹介しています。

- [textlint editor - ブラウザでも動くPrivacy Firstの文章校正ツールを作る話](https://azu.github.io/slide/2020/textlint-editor/textlint-editor.html)
- [サーバにデータを送る必要がない文章の校正ツール、スペルチェッカーを作っている | Web Scratch](https://efcl.info/2020/07/31/textlint-editor-pre/)

textlint editorの特徴としては、入力しているテキストをサーバへ送信しないため、オフラインでも動作します。
また、textlint + 設定(`.textlinrc`)をtextlint worker scriptへとコンパイルして、それをインストールして使うというGreasemonkeyのような仕組みをとっています。
そのため、本当にtextlintをそのままブラウザで動かすような形をとっています。

自分でtextlint worker scriptを作る場合は次のテンプレートを利用できます。

- [textlint/editor-script-template: @textlint/editor script template](https://github.com/textlint/editor-script-template)

textlint worker scriptは、ただの[Web Worker](https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API/Using_web_workers)として動くScriptで、ブラウザ対応とブラウザ拡張はそれぞれ同じものが動いています。

textlint editorはまだベータ版でそこまで安定してなかったりバグもあるので、フィードバックを待っています！

- [textlint/editor: textlint editor project.](https://github.com/textlint/editor#usage)