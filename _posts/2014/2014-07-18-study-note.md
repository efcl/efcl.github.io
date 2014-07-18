---
title: 勉強会でのメモの取り方について
author: azu
layout: post
categories:
    - イベント
tags:
    - イベント
    - Markdown
    - アウトラインメモ

---

この記事では自分なりの勉強でのメモの取り方についてメモしたものです。

今までに参加してきた[イベント](http://efcl.info/categories/#%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88 "イベント")では、
大体メモを取っていて"〜アウトラインメモ"とかいうタイトルで公開してあります。

## 書くツール

メモを取るにはエディタとかツールが結構大事で、書くのに集中し過ぎると話をちゃんと聞けないし、
話に集中してるとメモを書かなくなったりします。

なので、画面を見なくても入力できるような手に馴染む感じのツールを見つけて使うのがいいと思います。

以下が使ってきたツールの変遷ですが、出力は常にMarkdownにしていたので、
基本的にはMarkdownエディタが中心となってます。

- [Qute for PC/Mac](http://www.inkcode.net/qute "Qute for PC/Mac")
- [Mou](http://mouapp.com/ "Mou") なんだかんだ一番使ってた
- [Markdown Life](https://itunes.apple.com/jp/app/markdown-life/id594391345?mt=12 "Markdown Life")
- [Haroo Pad](http://pad.haroopress.com/ " Haroo Pad ")
- [Texts](http://www.texts.io/ "Texts — Markdown Word Processor for Mac OS X and Windows")
- [OmniOutliner](http://www.omnigroup.com/omnioutliner "OmniOutliner")

アウトライン的に使う場合、Markdownエディタだと[Mou](http://mouapp.com/ "Mou")が安定して使いやすい方だと思います。

今だとMouの後継を目指して開発してる[MacDown](http://macdown.uranusjr.com/ "MacDown")とか面白いと思います。

基本的にリストで書いていくので、`-`が自動で入るとか、Tabを押した時にリストもインデントしてくれるかが、
入力のテンポの大きく関わってくるのでエディタは馴染むものを選ぶといいかと思います。

```
- リスト
    - 書いていく
    - と思うので
- リストマークの自動入力が大事
```

上に載せてないですが、[Day One](http://dayoneapp.com/ "Day One")とかがこのリスト周りの動きの出来がいいと思います。
(iOS版もアウトラインに絞ると中々いい感じ)

![dayone](http://i.gyazo.com/465772eac81687cb97b9882b95a5af58.gif)

後、最初の頃は[Qute for PC/Mac](http://www.inkcode.net/qute "Qute for PC/Mac")というのを使っていて、
このアプリは幻の[Chromeless Browser](https://mozillalabs.com/en-US/chromeless/ "Chromeless Browser")を使ったHTML/CSS/JSのアプリです。

普通のエディタとちょっと違って改行でそれぞれブロックが別れる感じになっていて、
カチッとハマると見た目もキレイで結構良かった記憶があります。(ものすごく癖があるので使いやすくはない)

![Qute](https://skitch-img.s3.amazonaws.com/20111227-cm4qpnpk4f9fcnh7j6ieh76csx.png)

この辺は慣れてる/好きなエディタを使えばいいと思います。(普通にAtomとかVimとかの方が何だかんだ自由度高い)

最近になって、そもそもアウトライン的に書いてるんだからアウトライナーを使って書けばいいじゃんという事に気づいて、
[OmniOutliner](http://www.omnigroup.com/omnioutliner "OmniOutliner") を使い始めました。

### OmniOutliner

![omnioutliner](http://efcl.info/wp-content/uploads/2014/07/2014-07-18_20-02-33.jpg)

OmniOutlinerはアウトライナーなので当たり前ですが、タブでインデントレベルの変更ができることや、
**CONTENTS**に表示する部分をフィルターしたり、入力は結構快適です。

![gif](http://gyazo.com/8b401092165dcb4dbb7681dcbcc56b02.gif)

#### 欠点

[OmniOutliner](http://www.omnigroup.com/omnioutliner "OmniOutliner")は、
Markdownに対応してない以外は使いやすいですが、そもそもMarkdownのエクスポートに対応していません。

[fletcher/Markdown.ooxsl](https://github.com/fletcher/Markdown.ooxsl "fletcher/Markdown.ooxsl")
というプラグインが一応あるのですが、ちゃんと動いてな気がします。

HTMLやtxtやwordなどエクスポートできるのですが、機械に優しいフォーマットがOPMLしかないため、
OPMLとしてエクスポートしてそれをMarkdownに変換して使っています。
(一応OmniOutlinerのファイル自体がXMLなのでそれを見るという手段もある)

OPMLをパースして(JSONにしてから)、Markdownに変換するNodeで書いたコマンドラインツールを使っています。

``` console
opml-to-markdown -e file.opml --require lib/build-markdown.js # markdownに変換される
```

* [azu/opml-to-markdown](https://github.com/azu/opml-to-markdown "azu/opml-to-markdown")

これを使って作ったMarkdownファイルで[Cleaver](https://github.com/jdan/cleaver "Cleaver")のスライドを作ったりもしれます。

生成したMarkdownを直接整えるため、OmniOutlinerのファイル自体は使い捨てです。

