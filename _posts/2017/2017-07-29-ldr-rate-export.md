---
title: "LDRのフィードをレート情報付きでエクスポートする"
author: azu
layout: post
date : 2017-07-29T23:58
category: 雑記
tags:
    - LDR
    - JavaScript

---

LDRのフィードデータから**レート**（★★★☆☆）をカテゴリとしたOPML(XML)ファイルを作成するコマンドラインツールを作りました。

- [azu/ldr-export-opml: Convert exported json from LDR to opml with Rate.](https://github.com/azu/ldr-export-opml "azu/ldr-export-opml: Convert exported json from LDR to opml with Rate.")

[Live Dwango Reader](http://reader.livedoor.com/reader/ "Live Dwango Reader")から他のRSSリーダへ移行する際に、レートデータを維持して移行する用途です。

fastladderへの移行の場合は別の方法もあります。

- [LDRのレートの保存と復元](http://blog.bulkneets.net/mt/archives/45 "LDRのレートの保存と復元")

## 必要なもの

- Node.js 6>=
- 後述する`ldr.json`

## ldr.json

LDRのopmlエクスポートにはカテゴリ（ディレクトリ）の情報しか含まれていません。
なので、編集画面に使われてるAPIのレスポンスデータ(`ldr.json`とここでは呼ぶ)を使います。

ldr.jsonは `http://reader.livedoor.com/api/subs?unread=0`のレスポンスです。

簡単な方法だと以下の手順で取得できます。
(ApiKeyがいるので、curlなどだと余計に面倒なので、ログインしてるブラウザでコピーするのが楽)

![image](https://monosnap.com/file/abUjuGNgDfX317alNW0j42p1gxM8SO.png)

0. ブラウザの開発者ツールでネットワークを開く
1. "編集"をクリック
2. `http://reader.livedoor.com/api/subs?unread=0`へのリクエストを探す
3. レスポンスをコピーして `ldr.json` として保存する

`ldr.json`にはカテゴリ、レートなどの情報が含まれています。
普通にexportできる`export.opml`の上位互換なデータなので、閉鎖する前に取得しておくと便利だと思います。

## Install

ldr-export-opmlは`npm`などでインストール出来ます。

    npm install ldr-export-opml -g

使い方は書いてないですが普通にモジュールとしても使えるので、適当に使ってください。

## 使い方

取得した `ldr.json` を引数に渡して実行するopml形式のXMLを出力してくれます。

    Usage
      $ ldr-export-opml ldr.json

    Options:
    
      --output path to output
      
    Examples
      $ ldr-export-opml path/to/ldr.json
      $ cat path/to/ldr.json | ldr-export-opml 

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">LDRのフィードデータからレート（★★★☆☆）をカテゴリとしたOPML(XML)ファイルを作成するツールです。<a href="https://t.co/Be9zyssQyN">https://t.co/Be9zyssQyN</a> <a href="https://t.co/0doJLj9Xb9">pic.twitter.com/0doJLj9Xb9</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/891216584865439744">July 29, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## おわり

LDRも[サービスを終了](http://blog.livedoor.jp/staff_reader/archives/52278396.html "サービスを終了")です。

乗り換え先をどうするのかがまだ決まってないけど多分必要になるので作りました。(バグってたらPull Requestください)

- [azu/ldr-export-opml: Convert exported json from LDR to opml with Rate.](https://github.com/azu/ldr-export-opml "azu/ldr-export-opml: Convert exported json from LDR to opml with Rate.")

一日数千エントリ見てるので、[j, k, n](https://gist.github.com/azu/491fa1c5050fc378c746)、s, aあたりがどれだけつまらずに動くかが大事になってくるので、乗り換え先の相性が大変。

なので、Feedlyとかのビジュアルよりなマガジン系はあんまり向いてない。
[Fastladder](https://github.com/fastladder/fastladder "Fastladder")を使えるといいけど、維持コスト(手間/値段)が高くなるので手を出しにくい。[Tiny Tiny RSS](https://tt-rss.org/ "Tiny Tiny RSS")も同じような理由。

[inoreader.com](https://www.inoreader.com/ "inoreader.com")は悪くは無さそうだけど、スムーズスクロールが遅かったり、プリロードがなかったりしてちょっとチューニングが必要そう。(コードを見てたけど結構レガシーな感じだったのでどこまでhookできるんだろ)

クライアント側はどうにでもなる気がするので、サーバ側をServerlessな感じにしたものがあればコスト少なくて済むのかなと思ったけど、LDRのようなサービスはクローラーとその結果の保存データで容量食うのであんまり向いて無さそう。[Firebase](https://firebase.google.com/pricing/?hl=ja)みたいなところでやったほうがコスト的には良さそう。

あとは[Cappuccino](http://cappuccinoapp.com/ "Cappuccino")とかみたいなクライアント側だけでどうにかするパターンかな。(未読管理的な問題はありそうだけど)