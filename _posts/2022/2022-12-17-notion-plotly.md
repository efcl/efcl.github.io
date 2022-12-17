---
title: "Notionのデータベースのデータを可視化するグラフURLを作成する"
author: azu
layout: post
date : 2022-12-17T21:25
category: JavaScript
tags:
    - Notion
    - JavaScript

---

Notionにはデータベースのデータをグラフとして表示する機能がありません。
外部サービスなどを使えばグラフを埋め込むことは可能ですが、それだけのために外部にデータベースの値を渡すのは微妙です。

- [Notion2Charts - Create Embeddable Charts From Your Notion Tables](https://notion2charts.com/)
- [Create customizable notion charts | Nochart](https://nochart.co/)

そこまで高機能なものが欲しいわけでも無かったので、作ることにしました。

## [Notion Plotly](https://notion-plotly.netlify.app/)

[Notion Plotly](https://notion-plotly.netlify.app/)というサイトを作りました。
このサイトは、URLのパラメータに描画したいデータを渡すことで、[Plotly](https://plotly.com/javascript/)でグラフとして描画する単純なサイトです。
たとえば、次のように`x`軸と`y`軸の値をURLで渡して棒グラフで表示できます。

- <https://notion-plotly.netlify.app/bar.html?x=2000年1月1日,2001年2月1日,2003年3月1日&y=100,200,300,400>

<iframe src="https://notion-plotly.netlify.app/bar.html?x=2000%E5%B9%B41%E6%9C%881%E6%97%A5,2001%E5%B9%B42%E6%9C%881%E6%97%A5,2003%E5%B9%B43%E6%9C%881%E6%97%A5&y=100,200,300,400" width="800" height="600" loading="lazy"></iframe>

[Notion Plotly](https://notion-plotly.netlify.app/)自体は特にNotionのAPIを使ったサイトではないです。
NotionのデータベースからNotion Plotly]に渡すパラメータを作って、グラフを描画できるページを作るだけのサイトです。

そのため、外部からAPIでデータベースの値を読み取ることもないし、シンプルなHTMLとJSで動いてるのでForkして利用できます。

- [azu/notion-plotly: Create embed graph page from Notion Database.](https://github.com/azu/notion-plotly)

自分用にとりあえず書いただけなので、そこまで複雑なパラメータは今のところないです。
渡せる`x`や`y`などの値と`&sortBy=x` (どの値でソートする)ぐらいです。
グラフの描画には、Plotlyを使ってるので、次のページあるグラフは追加しようと思えばできるはずです(グラフの種類ごとにHTMLを分けています)。

- [Plotly javascript graphing library in JavaScript](https://plotly.com/javascript/)

欲しいグラフとかあったらPull Requestを送ってください。

## NotionのデータベースからグラフURLを作る

Notionの実際のデータベースなどは、次のテンプレートを参照してみてください。

- テンプレート: [Notion Plotly](https://efcl.notion.site/Notion-Plotly-f38a5b4fafb342b6b9b3dea6e7de102c)

Notionには特定のデータベースの値を全て検索して集めるような関数はありません。
集計用データベースを作り、その集計用データベースから集計したい対象のデータベースの全ての項目にRelationを作ります。

![Relation](https://efcl.info/wp-content/uploads/2022/12/notion-plotly.png)

そうすることで、集計用データベースからRelationで"集計したい対象のデータベース"のアイテムを参照できます。
その後、集計用データベースにRollupで項目を追加すると、項目には"集計したい対象のデータベース"のアイテムが`,`区切りで入ります。

![Rollup](https://efcl.info/wp-content/uploads/2022/12/17-1671281358.png)

あとは、関数を使ってグラフURLを組み立てるだけです。

サンプルのデータベースでは、次のようにRollupした"数値"と"支出項目"を使って、円グラフのURLを作成しています。
この`prop("数値")`には自動的に`,`で値が並ぶように入ります。`&`などは入るとダメなので、`replaceAll`などでエスケープする必要があります。

```
"https://notion-plotly.netlify.app/pie.html?values=" + prop("数値") + "&labels=" + prop("支出項目")
```

あとは、関数が組み上げたURLを開くだけです。

- <https://notion-plotly.netlify.app/pie.html?values=30000,100000,100000,10000,5000,5000,10000,50000&labels=%E9%A3%9F%E8%B2%BB,%E5%AE%B6%E8%B3%83,%E8%B2%AF%E8%93%84,%E3%82%B5%E3%83%96%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E8%B2%BB,%E5%85%89%E7%86%B1%E8%B2%BB,%E9%80%9A%E4%BF%A1%E8%B2%BB,%E6%97%A5%E7%94%A8%E5%93%81,%E3%81%9D%E3%81%AE%E4%BB%96>

Notionの、埋め込みでこのURLを埋め込めばグラフ自体をNotionに表示することもできます。

![Notion Example](https://efcl.info/wp-content/uploads/2022/12/17-1671281648.png)

ただし、他のグラフサービスと違って埋め込んだグラフが自動的には更新されません。
これは、Notion PlotlyがAPIを使ってNotionからデータを読み取ってるわけじゃないからです。

一方で、関数で組み上げたグラフURL自体(`グラフURL`のカラム)は、データベースの内容が変われば自動的に変更されて新しいURLになるので、クリックして見られるグラフは常に最新という形です。
個人的には、Notionでビジュアル化したダッシュボード的なのはあまり作ってないので、これぐらいで十分かなと思いました。
(今のところ、埋め込みの方はオマケ要素という感じです)

NotionからCSVにしてSpreadSheetにしてビジュアライズとかは流石に遠かったので、それを簡略化するイメージで[Notion Plotly](https://notion-plotly.netlify.app/)は作っています。
Google App Scriptsとかをデータベースごとに何か作るのも面倒だし、複雑なことしないしNotionからグラフを描画する側に値を投げ込めばいいやという感じの発想です(データが多いとURLが長すぎて動かなくなる可能性はあります)。

詳しい使い方はテンプレートページを参照してください。

- テンプレート: [Notion Plotly](https://efcl.notion.site/Notion-Plotly-f38a5b4fafb342b6b9b3dea6e7de102c)

ソースコードは次のリポジトリにあります。シンプルな静的なページなので、ForkしてGitHub Pagesでも動くと思います。

- [azu/notion-plotly: Create embed graph page from Notion Database.](https://github.com/azu/notion-plotly)
