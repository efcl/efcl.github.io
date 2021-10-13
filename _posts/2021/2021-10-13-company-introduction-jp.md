---
title: "日本の会社紹介スライド/採用スライドをまとめてみた"
author: azu
layout: post
date : 2021-10-13T10:10
category: 雑記
tags:
    - JavaScript
    - Slide
    - Company

---

日本の会社が会社紹介スライドをよく出しているのを見かけたので、そのスライドを会社ごとにまとめてみました。

- サイト: [日本の会社紹介スライドのまとめ](https://company-introduction-jp.vercel.app/)
- SpreadSheet: <https://docs.google.com/spreadsheets/d/1y1pqQhBIV_uGCp-AzxSQwLDOV4v_tIPobnQJmFMJVDc/edit>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">日本の会社紹介スライドをまとめたサイトを作りました。<br>← と → キーでスライドをまとめてスライドできます<a href="https://t.co/TpLeUaEWbn">https://t.co/TpLeUaEWbn</a><br><br>データはSpreadSheetで管理しています。自由に追記してください<a href="https://t.co/jRf9l4bxuG">https://t.co/jRf9l4bxuG</a><br><br>サイトのソースコードは <a href="https://t.co/ndSA1UGMyr">https://t.co/ndSA1UGMyr</a> にあります <a href="https://t.co/cGusZatVKF">pic.twitter.com/cGusZatVKF</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1447819750344589312?ref_src=twsrc%5Etfw">October 12, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## スライドをまとめた理由

いろいろな会社が会社紹介スライド/採用スライド/Culture Deckを公開しているなーと思って、それをまとめて読みたかったのですが、
スライドと会社のデータをまとめたオープンデータ（機械的に読める形式のデータ、CSVやJSONなど）を見つけられませんでした。そのため、まずスライドのURLを集めるところから始めました。

会社紹介スライドを探してみたところ、120社以上が紹介/面接用スライドを出していました。
次のSpreadSheetに誰でも追加できる形でまとめてあります。

- SpreadSheet: <https://docs.google.com/spreadsheets/d/1y1pqQhBIV_uGCp-AzxSQwLDOV4v_tIPobnQJmFMJVDc/edit>

SpredSheetはデータ管理には便利ですが、閲覧するには楽しくなかったので、一覧性のあるサイトを作ることにしました。
次のリンクから、SpreadSheetに記録されているスライドと会社を一覧できます。

- サイト: [日本の会社紹介スライドのまとめ](https://company-introduction-jp.vercel.app/)

サイトではList表示とGrid表示でスライドが一覧できます。
遊び的な機能として、 <kbd>←</kbd>と<kbd>→</kbd>キーで、スライドをまとめてページめくりできるようになっています。
気になったスライドを見つけたらクリックして元のスライドを読むのが良さそうです。

![List表示とGrid表示](https://efcl.info/wp-content/uploads/2021/10/12-1634043184.png)

## スライドについて

おそらく[SmartHR社の会社紹介資料](https://blog.shojimiyata.com/entry/2019/02/28/115119)が元ネタにあたると思いますが、120社以上が類似するスライドをだしていました。

これ系のスライドは結構作るのに大変だったり、メンテナンスコストがかかるので、想像より多くのスライドがあった感じはします。(多分見つけられてないスライドもあるので、その場合は[SpreadSheet](https://docs.google.com/spreadsheets/d/1y1pqQhBIV_uGCp-AzxSQwLDOV4v_tIPobnQJmFMJVDc/edit)に追加してください)

- [そんなに甘くない、面接用スライド公開の裏側 - 宮田昇始のブログ](https://blog.shojimiyata.com/entry/2019/03/11/163452)
- [「採用スライド」の作り方を、反省点とともにすべて公開します。｜やまもとはなか｜note](https://note.com/hanahanayaman/n/n9e4f690ca173)

## サイトについて

会社紹介スライドはたくさんあるので、スライドをスライドできると面白そうと思って作ろうとしました。

手元のメモにかかれていた最初のコンセプトは次のような感じらしいです。

```
## 目的

- 企業紹介スライドがたくさんあるので、たくさん見れると面白い

## Design

- 企業が縦に並ぶ
- Focusしたら企業スライドをスライドできる
- 前後のスライドは見えるけど、うっすら影になる
```

初期デザインのコンセプト図は、ゲームコンソールのUIとかTVアプリのUIとかをイメージしてた気がします。

![初期デザインのコンセプト](https://efcl.info/wp-content/uploads/2021/10/12-1634043564.png)

スライドを集めてサイトをプロトタイプしていて、iframeでスライドをタイル的に並べるだけ(ひたすらiframeを置いてるだけ)、結構楽しそうな感じでした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">並べるだけ。<br>意外とこれはこれで楽しい気がする。<br>iframeのloading=lazyって動作怪しい気がする <a href="https://t.co/3Ez59BQSmK">pic.twitter.com/3Ez59BQSmK</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1444590405677322242?ref_src=twsrc%5Etfw">October 3, 2021</a></blockquote> 

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

スライドの縦や横幅は結構バラバラだったので、キチンと並べないで[CSS グリッド](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout)などで敷き詰めていくだけでもいいかなーと思って、今の形になっています。
List表示も内部的には[CSS グリッド](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout)で、それぞれの行に2つずつアイテムを置くことで表現しています。

また、iframeを一つのページに100以上置くとおもすぎてダメだったので、スライドの表示は独自の実装に書き換えました。

細かいところだと[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)を使って見えてないスライドは読み込まないようにしたり(このためにHeightとWidthは事前に計算している)、<del>[next/image](https://nextjs.org/docs/api-reference/next/image)で画像の最適化などをしています</del><ins>Vercelの[Image Optimization Source Images](https://vercel.com/docs/concepts/limits/overview)のLimitが想像より低かったのでやめました</ins>。

その他だとVoiceOverの対応したりしていて、今回は特に意識してなかったですが、Lighthouseのスコアもちゃんとでてるみたいです。(フレームワークってよくできているんだなー)

![Lighthouse](https://efcl.info/wp-content/uploads/2021/10/12-1634045282.png)

## メンテナンスについて

[スプレッドシートの通知](https://support.google.com/docs/answer/91588)で一応変更は見ていますが、このスライドデータのメンテナンスしたいーとかこういう管理方法した方が良いとかのアドバイスあったら、[Twitter](https://twitter.com/azu_re/)かGitHubのIssueなどで連絡ください。

- [azu/company-introduction-jp: 日本の会社紹介スライドのまとめです。](https://github.com/azu/company-introduction-jp)

[SpreadSheet](https://docs.google.com/spreadsheets/d/1y1pqQhBIV_uGCp-AzxSQwLDOV4v_tIPobnQJmFMJVDc)は誰でも編集できる設定にしているのですが、メンテナーはたくさんいた方がいいなーと思いますが、どうするのがいいのかなーと思ってイマイチわかってないです。
採用スライド全部見てるみたいな人がメンテナンスすると、一番良さそうな気はします。

とりあえずSpreadSheetにメンテナー欄があります。

- メンテナー欄: <https://docs.google.com/spreadsheets/d/1y1pqQhBIV_uGCp-AzxSQwLDOV4v_tIPobnQJmFMJVDc/edit#gid=2115650125>

スライド自体は、誰でも追加して問題ないので、古かったり新しいスライド見つけたら追加してみてください(自社スライドとかも歓迎)
細かい編集方針についてはREADMEに書いています。

- [会社紹介スライドの追加方法](https://github.com/azu/company-introduction-jp#%E4%BC%9A%E7%A4%BE%E7%B4%B9%E4%BB%8B%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%89%E3%81%AE%E8%BF%BD%E5%8A%A0%E6%96%B9%E6%B3%95)

SpreadSheetのデータは、次の流れで毎日サイトへ反映する仕組みになっています。

1. SpreadSheetが更新される
2. [update-data.yml](https://github.com/azu/company-introduction-jp/blob/main/.github/workflows/update-data.yml)が1日1回起動する
3. [Sheetson](https://sheetson.com/)を使ってSpreadSheetの中身を取得して、[pages/company.json](https://github.com/azu/company-introduction-jp/blob/main/pages/company.json)を更新する
4. [pages/company.json](https://github.com/azu/company-introduction-jp/blob/main/pages/company.json)が更新されたらVercelにデプロイされる

そのため、不正なデータだったり、データ更新に失敗したときの処理などもこれから足す必要がありますが、これも興味がある人いたらIssueかPRに書いてください。

- [データが更新できなかった場合のフローを考える · Issue #1 · azu/company-introduction-jp](https://github.com/azu/company-introduction-jp/issues/1)
