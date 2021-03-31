---
title: "慈善活動や寄付やオープンソースについて発表した"
author: azu
layout: post
date : 2021-03-31T19:06
category: イベント
tags:
    - OpenSource
    - 雑記

---

[オープンソースと寄付と慈善活動と](https://azu.github.io/slide/2021/open-philanthropy/open-philanthropy.html)というタイトルで、寄付するために[philan.net](https://philan.net/)という予算をつけて寄付の記録するサービスを作った話をしました。

- スライド: [オープンソースと寄付と慈善活動と](https://azu.github.io/slide/2021/open-philanthropy/open-philanthropy.html)

寄付や慈善活動といった話と[philan.net](https://philan.net/)の仕組みなどの技術的な話が半々といった感じになっています。
細かいデータとか歴史の話も最初はスライドに書いていたのですが、スペースが足りなかったのでばっさりと削りました。（バランスを取るのが難しそうと思ったのもあります）

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">慈善活動におけるCharityとPhilanthropyのアプローチの話、オープンソースの問題との類似点、 <a href="https://t.co/fp8ZHwnvXw">https://t.co/fp8ZHwnvXw</a> の話とか、CDN Edge Workersの話とか結構色々と混ざった感じの話になってる <a href="https://t.co/3uEZlBJ5aO">pic.twitter.com/3uEZlBJ5aO</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1377081957121585152?ref_src=twsrc%5Etfw">March 31, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

既に関連する記事をいくつか書いていますが、現状の所感をまとめた感じのスライドです。

- [寄付研究や慈善活動について研究するために色々な書籍や論文を読んだメモ書き | Web Scratch](https://efcl.info/2021/02/19/donation-philanthropy-study/)
- [寄付をするために、寄付の予算と寄付の記録をSpreadSheetベースでつける philan.net というサービスを作った | Web Scratch](https://efcl.info/2021/03/10/philan.net/)
- [Next.js + Vercel + Cloudflare Workers KV + Googleスプレットシートで寄付管理サービスを作った | Web Scratch](https://efcl.info/2021/03/12/next.js-vercel-cloudflare-workers-kv/)

去年の[今年のオープンソース活動振り返り @ 2020 | Web Scratch](https://efcl.info/2020/12/31/open-source-in-2020/)でも書いていましたが、オープンソースはソフトウェアに限定されないものだと思います。
代表的なものがソフトウェアなので具体例を出すとソフトウェアの話になりやすいですが、オープンソースという概念自体は他の分野でも活かせるものだと思います。

慈善活動や寄付の勉強をしていて、同じように具体的/代表的なものは社会的な話になりやすいですが、
この中で出てくる概念は他の分野でも活用できそうだなと思って調べていました。

「[オープンソースと寄付と慈善活動と](https://azu.github.io/slide/2021/open-philanthropy/open-philanthropy.html)」のスライドでは、寄付する側での話が中心になっていますが、
自分は[寄付される側](https://github.com/sponsors/azu)でも[ある](https://blog.cybozu.io/entry/2021/03/19/110000)ため、この辺についてもどうあるのといいのかは考えていきたいなと思いました。

後、スライドでも書いていたCharityとPhilanthropyのアプローチの違いについて
普段からPhilanthropy的な方法を意識はしていました。(単純に情報を出すんじゃなくて、調べ方とかやり方みたいな問題の解決の仕方を書くみたいな意識)

![CharityとPhilanthropy](https://efcl.info/wp-content/uploads/2021/03/31-1617197611.png)

今まで、そういう記事とかどれぐらい書いていたのかをさかのぼってみている、そこまで書けてない気もします。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">今まで書いてきた探し方、見つけた方的な方法論的な記事がどれぐらいあるか発掘してみる。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1376097317124669441?ref_src=twsrc%5Etfw">March 28, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

[JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)でも「学び方」という話で書いていたけど、ここを具体的に書くと何かのツールやリソースの使い方になって、抽象的に書くとふんわりした方法論になってしまう感じがしました。
この辺の「学び方」的な話は複雑で、やっぱり単発でどうこうできる情報ではないのかなとも思いました。

📝 時系列がごっちゃになりそうなので自分用のメモ

- 読んだ書籍は[寄付研究や慈善活動について研究するために色々な書籍や論文を読んだメモ書き](https://efcl.info/2021/02/19/donation-philanthropy-study/)が時系列順
- いくつか書籍([多分この辺?](https://www.amazon.co.jp/dp/B07KZMKKHK/))読んでいて、される側はレポーティングが重要みたいな話があって、GitHub Sponsorsのレポーティングの仕組みをちょっと整備してた
- [寄付研究ブログー「寄付」を科学してみませんか？: 寄付を科学的に考えるための洋書リスト](https://watanabefumitaka.blogspot.com/p/blog-page_12.html)あたりを参考に色々な英語の書籍を読む
- [Pragmatic Philanthropy Asian Charity Explained](https://www.palgrave.com/gp/book/9789811071188)はリストに載ってなかったけど、無料で読めてとても参考になった。
- [The Science of Giving](https://www.amazon.com/dp/B004QM9VT4/)を読んでいて、予算を管理する寄付するときにPainが減るかも的な研究の話がでてきた
  - 読んでいて[BrooklynJS](https://github.com/brooklynjs/brooklynjs.github.io)の[budget.js](https://github.com/brooklynjs/brooklynjs.github.io/blob/master/budget.js)みたいな誰もが見える形で予算を管理するのが良さそうというアイデアが浮かんだ
  - これを[philan.net](https://philan.net/)として実装した