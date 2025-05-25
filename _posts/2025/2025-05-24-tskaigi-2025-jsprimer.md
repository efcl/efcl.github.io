---
title: "TSKaigi 2025で「技術書をソフトウェア開発する」という発表をしました"
author: azu
layout: post
date : 2025-05-24T21:33
category: イベント
tags:
    - TypeScript
    - 技術書
    - jsprimer

---

TSKaigi 2025で「技術書をソフトウェア開発する」というタイトルで発表をしました。
スライドは次のページで公開しています。

- 技術書をソフトウェア開発する - jsprimer の 10 年から学ぶ継続的メンテナンスの技術 -
- スライド: <https://azu.github.io/slide/2025/tskaigi/jsprimer.html>

基本的には[JavaScript Primer](https://jsprimer.net/)というJavaScriptの入門書の話になっています。
どうやって作っていて、どうやって10年近くも更新を続けているのか、オープンソースとしての継続性などについて話しています。

関連:

- [JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)
- [JavaScript Primer 改訂2版をリリースしました！/JavaScript Primerはなぜ更新され続けるのか？ | Web Scratch](https://efcl.info/2023/06/09/jsprimer-v2/)

JavaScript/TypeScript以外での通じる話が多いので、技術書や何かを伝える文章を書く人にとっても参考になるかなと思います。
今だと、LLMとかに投げる文章でも同様のことが言える場面も多いとは思います。

jsprimerの目的の一つに「変化に対応できるようにする」というものがあります。
これのためにjsprimerという書籍を更新しているので、jsprimerにContributeや金銭的に支援してくれる人や企業はいつでも募集しています。

- [JavaScript PrimerのES2025対応を手伝ってくれるContributorとSponsorを募集しています | Web Scratch](https://efcl.info/2025/04/25/jsprimer-es2025-proposal/)
- [JavaScript Primer - Open Collective](https://opencollective.com/jsprimer)

![p65: オープンソースに関わってもらうこと](https://efcl.info/wp-content/uploads/2025/05/24-1748090468.png)

スライド中にもありますが、現在のソフトウェア開発でオープンソースと関わらずに完結することはかなり難しいです。
そのため、入門書としての目的としてオープンソースに関わってもらうために、jsprimerに対してContributeしやすくするといった目的もオープンソースとして開発している目的の一つです。

オープンソースとの関わり方は色々な形があるので、jsprimerに限らずに何かしらの形で関わってみると面白いんじゃないかと思います。

GitHub Sponnsorなどでの支援も大歓迎です。

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)

今回の発表のベースやProposalを書くときは結構LLMを使っていて、インタビュー形式でLLMに質問を考えてもらったものに回答して、そこから主張を抽出して作ってます。

- インタビュー: https://github.com/azu/slide/blob/gh-pages/2025/tskaigi/2025-03-01--20-23-08.md#%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%93%E3%83%A5%E3%83%BC

スライドもLLMでアウトラインを見ながら、中身を書いていくということをやってた気がします。
昔から、アウトラインと中身を行き来して視点を変えながら書くというのをよくやっていた気がします。
[アウトライナー実践入門](https://gihyo.jp/book/2016/978-4-7741-8285-8)でいうところのシェイクというやり方。

- [js-primerの書き方 | Web Scratch](https://efcl.info/2018/06/26/js-primer-report/)

この辺は文章でもそうですが、プログラミングでも関数やモジュールという単位でアウトラインのように遠めに見ながら進めるタイミングと中身を見ながら進めるフェーズがあります。
そういった点では、文章とコードで大きな違いはないのかなと思う部分はありました。

文章やコードを読む上でも、既知から未知の方が読みやすいのは一緒で、コードの方がちょっと違うのは参照元へのジャンプ機能が充実しているという点かなと思います。
Ask the speackerでもあった気がしますが、文章を読んでる時の人間のコンテキストはかなり小さいので、jsprimerを書くときは一度に読むべきコンテキストを絞るイメージで書いています(文章ではジャンプが難しいという前提があります)。

簡単に言えば、別のページの参照を減らす(読んでるところを見てれば全部わかる)、サンプルコードを小さく保つ、パラグラフライティングで結論から書くといった話があります。
ユースケースのようなアプリケーションの章は、サンプルコードが断片的になりやすいので、それぞれのページの最後にコピペで動く完全な状態を提示することで、そこで戻って来れるような仕組みも入れています。
技術書はif文が書きにくいコード、みたいな感じで書いていくのが感覚と近いのかもしれないですね。

コードにおいては複雑度を測るのに[循環的複雑度](https://ja.wikipedia.org/wiki/%E5%BE%AA%E7%92%B0%E7%9A%84%E8%A4%87%E9%9B%91%E5%BA%A6)(Cyclomatic complexity)というメトリクスがありますが、
日本語だと建石評価式(自分がそう呼んでるだけ)みたいなものがあって[@textstat/textstat-rule-tateish-level](https://github.com/textlint/textstat/tree/master/packages/%40textstat/textstat-rule-tateishi-level)として実装したことがあります。

- [情報学広場：情報処理学会電子図書館](https://ipsj.ixsq.nii.ac.jp/records/37773)
- [読みやすさの評価指標（2） - 読書的な何か。](https://doksyo-tek.hatenablog.com/entry/2015/05/19/104050)

この辺の複雑度を低く保つことが読みやすい文章に繋がるのは同じかなと思いました。

TSKaigiお疲れ様でした！
