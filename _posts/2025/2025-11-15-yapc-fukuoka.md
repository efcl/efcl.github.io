---
title: "YAPC::Fukuoka 2025で「読む技術・書く技術・伝える技術 - 15年続けて分かった持続可能なオープンソース開発」という発表をしました"
author: azu
layout: post
render_with_liquid: false
date : 2025-11-15T15:15
category: イベント
tags:
    - YAPC
    - OpenSource
    - JSer.info
    - textlint
    - jsprimer

---

YAPC::Fukuoka 2025で「読む技術・書く技術・伝える技術 - 15年続けて分かった持続可能なオープンソース開発」というタイトルで発表をしました。

スライドは次のページで公開しています。

- スライド: [読む技術・書く技術・伝える技術 - 15年続けて分かった持続可能なオープンソース開発](https://azu.github.io/slide/2025/yapc/opensource-15years.html)
- Proposal: <https://fortee.jp/yapc-fukuoka-2025/proposal/64dbeabc-a630-4564-97ff-812106e7be81>

## 発表内容

この発表では、15年間のオープンソース活動から学んだ持続可能な開発のための3つのプロジェクトについて話しています。

### 読む技術 - JSer.info

[JSer.info](https://jser.info/)は2011年から続けている週刊のJavaScript情報ブログで、これまでに750記事以上を公開しています。
「整理されたデータである『情報』を伝えること」をテーマに、14年間続けてきた情報収集システムやワークフローについて紹介しています。

関連記事:

- [JSer.info 10周年: JavaScript情報の集め方、書き方、まとめ方 - JSer.info](https://jser.info/2021/01/16/jser-10th/)
- [JSer.info 6周年記念イベントを開催しました - JSer.info](https://jser.info/2017/01/15/jser-info-6years/)
- [JavaScript情報ってなんだっけ?](https://azu.github.io/slide/2016/jser5years/javascript-information.html)

### 書く技術 - textlint

[textlint](https://textlint.org/)は、自然言語のLintツールで、2014年から開発を続けています。
現在では200以上のルールを持つエコシステムになっており、AI時代における文章品質の自動化についても触れています。

関連記事:

- [Maintainer Month: なぜtextlintを作ったか | Web Scratch](https://efcl.info/2022/06/29/why-create-textlint/)
- [JavaScriptでルールを書けるテキスト/Markdownの校正ツール textlint を作った | Web Scratch](https://efcl.info/2014/12/30/textlint/)

### 伝える技術 - JavaScript Primer

[JavaScript Primer](https://jsprimer.net/)は、2016年から開発を続けているJavaScriptの入門書です。
「変化に対応できること」をテーマに、最初からLiving Standard戦略や長期的な運用を目的として設計されました。
100人以上のコントリビューターが参加しており、どのように継続的なメンテナンスとコミュニティの参加を実現しているかについて話しています。

関連記事:

- [JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)
- [TSKaigi 2025で「技術書をソフトウェア開発する」という発表をしました | Web Scratch](https://efcl.info/2025/05/24/tskaigi-2025-jsprimer/)

## 持続可能性のループ

発表のテーマは「心理的負荷を技術的依存に転換する」という考え方です。

バーンアウトは期待と現実のギャップから生じます。心理的負荷はコントロールが難しく、バーンアウトのリスクを高めます。
一方で、技術的依存は自動化が可能で、継続することで改善が加速し、コントロールがしやすいです。

![burnout](https://azu.github.io/slide/2025/yapc/img/burnout-spectrum.png)

> [The End of Burnout by Jonathan Malesic - Paper - University of California Press](https://www.ucpress.edu/books/the-end-of-burnout/paper)

そもそも持続可能性を気にしているのは、それぞれのプロジェクトがアウトプット（作ったもの）ではなくアウトカム（実際の影響・信頼・教育）を目指してやっているからです。長期的な視点でプロジェクトを継続するにコントロールが難しい心理的負荷を意識的に減らす工夫について話しました。

## スライド作成プロセス

今回のスライドは、Claude Desktopで「こんなテーマにしたい、過去の自分の公開したものとかを調べてまとめてみて」という形でDeep Researchした結果を元に構成しました。
その後、大まかなスライドで発表練習をして構造的な問題もしゃべりながら音声ファイルを文字起こしし、それを元にスライドを修正するというのを2回ぐらいやって構造を固めました。(若干テーマが持続的開発に変わったのはこの辺のイテレーションで変わった)

構造が固まったら、Claude Desktopのプロジェクトをファイルにdumpして、Claude Codeでスライドを書いていくというフローで作成しました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">今回のスライドはClaude Desktopで「こんなテーマにしたい、過去の自分の公開したものとかを調べてまとめてみて」って感じの雑なDeepResearchした結果を元に数コを合成したスライドにして、発表練習して、音声ファイルを文字起こしを元にスライドを直して、2週ぐらいしてからClaude Codeで細かく直した <a href="https://t.co/a3oVm6GSFD">pic.twitter.com/a3oVm6GSFD</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1989573502052266491?ref_src=twsrc%5Etfw">November 15, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

この辺は、過去にPublicに書いてきたことをAIが読んである程度書いたものを人間が整理して伝えるということができて結構面白かったです。

## おわりに

JSer.infoは趣味の延長として始まったプロジェクトですが、textlintやJavaScript Primerは最初から長期的な運用を見据えて設計しました。
それぞれのプロジェクトが9年や11年や14年と続けてこられたのは、持続可能性を意識した設計と、コミュニティの支援があったからです。

スライドのAppendixに大量の参考リンクとかがあるので、興味ある人はぜひ見てみてください。

- [読む技術・書く技術・伝える技術 - 15年続けて分かった持続可能なオープンソース開発](https://azu.github.io/slide/2025/yapc/opensource-15years.html)

オープンソースの活動は色々な形があるので、JSer.info、textlint、jsprimerに限らず、何かしらの形で関わってみると面白いかもしれません。

GitHub Sponsorsでの支援も大歓迎です！

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)

YAPC::Fukuoka 2025 お疲れ様でした！
