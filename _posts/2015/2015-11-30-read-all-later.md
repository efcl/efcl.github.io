---
title: "WeeklyメルマガのURLを貼ったら中のリンクを全部Pocketに突っ込むアプリ"
author: azu
layout: post
date : 2015-11-30T20:41
category: JavaScript
tags:
    - Electron
    - Pocket
    - JavaScript
    - OAuth

---

[azu/read-all-later](https://github.com/azu/read-all-later "azu/read-all-later")というElectronアプリを作りました。

ElectronアプリじゃなくてNode.jsのCLIでも良かったのですが面倒そうなことが分かったのでとりあえずアプリとして動きます。
(OAuthの認証情報を保存するのをどうやって共有させればいいんだろうというのが難しそうだった)

## 機能

機能はとても単純で複数のURLを同時に[Pocket](https://getpocket.com/)へ保存することができます。
加えて、**URL**にURLを貼るとそのサイト内で出てくるリンク一覧を抽出してPocketに送ることができます。

以下のような動作になります。

![gif read-all-later](https://efcl.info/wp-content/uploads/2015/11/read-all-later.gif)

## インストール

[latest release](https://github.com/azu/read-all-later/releases/latest)
からアプリをダウンロードして起動できます。

## 使い方

1. Login to "Pocket"
2. URLをペースト
3. (Optional)Tags や URL List を編集
4. Read All Later!

でURL ListにあるURLが全部Pocketに送信されます。

## 目的

[JavaScript Weekly](http://javascriptweekly.com/ "JavaScript Weekly")のようなWeekly系のメルマガを購読しててもやっぱり単位がでかいのでちょっと読みにくいなと思ったため作りました。
([Meta Weekly](http://azu.github.io/Meta-Weekly/ "Meta Weekly")というサイトにWeekly系のメルマガをまとめています)

最初はPocketのようなアプリを作ろうとしましたが、Pocketのアプリが悪くなかったのでもっと使うためにまとめて突っ込めるアプリを書きました。

以下のようなワークフローで上手く行くのかを今試している感じです。

とりあえずPocketに記事を個別に突っ込む -> チラ見していって気になったものをPocketでFavする -> FavしたものをIFTTT経由で[Diigo](https://www.diigo.com/ "Diigo")にブクマ -> [Diigo](https://www.diigo.com/ "Diigo")のRSSでもう一度見る

DiigoのRSSは記事の先頭をちょっとだけ出してくれるので良かった。[Inoreader](https://www.inoreader.com/ "Inoreader")がもっと良さそうでしたが、その機能は有料っぽかったので諦めました(RSSをフィルターしたRSSとかを作れて便利)
