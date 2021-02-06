---
title: "JavaScript情報の情報源となっているサイトの一覧を作った"
author: azu
layout: post
date : 2021-02-06T22:02
category: JavaScript
tags:
    - JavaScript
    - JSer.info

---

JSer.infoで紹介したサイトのデータをドメイン別で一覧できるサイトを作りました。

- [JSer.info Watch List](https://jser.info/watch-list/)

[![JSer.info Watch List](https://jser.info/uploads/media/2021/01/15-1610718504.png)](https://jser.info/watch-list/)

[JSer.info Watch List](https://jser.info/watch-list/)は、次の条件でサイトをドメイン別(または作者別)で一覧できます。

- [JSer.info](https://jser.info/)で2年以内に紹介したことがあるサイトが対象
- 紹介した回数順

JSer.infoを更新するたびにこのリストも更新されます。
そのため、鮮度を保ちつつ、JavaScriptの情報源となるサイトが一覧できるようになっています。

また、タグでの絞り込みもできるようになっているので、興味があるトピックのサイトやブログなどを調べてみるといいかも知れません。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://t.co/CXy3hOXJ8q">https://t.co/CXy3hOXJ8q</a> のデータを使ったJavaScript情報源リスト<br>タグでの絞り込みができるようになった。<br>&quot;performance&quot;と&quot;React&quot;のタグを付けたことがあるサイトが分かる。<a href="https://t.co/Q30YLie7pd">https://t.co/Q30YLie7pd</a> <a href="https://t.co/AAGyfZmwdn">pic.twitter.com/AAGyfZmwdn</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1349717832330694664?ref_src=twsrc%5Etfw">January 14, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

[State of JS 2020](https://2020.stateofjs.com/en-US/)という毎年のアンケートでも[State of JS 2020: Resources](https://2020.stateofjs.com/en-US/resources/)という項目があります。
これも参考になりますが、一年に一度しか更新されないのと、Mediumなどのサイトが一つのまとまりとなってしまっています。

[JSer.info Watch List](https://jser.info/watch-list/)は、Medium、Zenn、Qiita、Dev.to、Speakerdeckなどのサイトは[それぞれのユーザー単位]で集計するようにしています。

その他のJavaScript情報の探し方については[JSer.info 10周年: JavaScript情報の集め方、書き方、まとめ方 - JSer.info](https://jser.info/2021/01/16/jser-10th/)を参照してみてください。

## おわりに

[JSer.info Watch List](https://jser.info/watch-list/)は、[JSer.infoのデータセット](https://github.com/jser/dataset)を使っています。

- [JSer.infoのデータセットと統計前処理ライブラリを公開しました | Web Scratch](https://efcl.info/2018/05/15/jser-dataset/)

他にも面白い使い方があったら試してみてください。

- [JSer.info Watch List](https://jser.info/watch-list/)
- [jser/watch-list: A collection of items that are explained in JSer.info.](https://github.com/jser/watch-list)