---
title: "Maintainer Month: epubリーダーアプリ bi-epub-readerを作った"
author: azu
layout: post
date : 2022-06-25T21:40
category: JavaScript
tags:
    - Electron
    - JavaScript
    - epub

---

[Bibi](https://bibi.epub.link/)を単独のアプリとして使える[bi-epub-reader](https://github.com/azu/bi-epub-reader)を作りました。

- [azu/bi-epub-reader: Standalone Epub reader using Bibi.](https://github.com/azu/bi-epub-reader)

Bibiはepub形式の電子書籍に対応したepubリーダで、[bi-epub-reader](https://github.com/azu/bi-epub-reader)はElectronでBibiをラップしたスタンドアローンなアプリケーションです。

[mu-epub-reader](https://github.com/azu/mu-epub-reader)なども作っていましたが、縦書きのepubファイルは対応していませんでした。
縦書きの表示を色々調べてみると[Bibi](https://bibi.epub.link/)が綺麗な表示だったので、単独で動くアプリケーションが欲しくなって[bi-epub-reader](https://github.com/azu/bi-epub-reader)を作成しました。

## インストール

1. [The latest binary](https://github.com/azu/bi-epub-reader/releases/latest)をダウンロード
2. アプリを開く

⚠️ このアプリは署名してないので、開くときに警告が出ると思います。

たとえば、macOSの場合は、次のような手順で開かないと署名がないのでひらけないと思います。

1. `bi-epub-reader.app`を選択
2. 右クリックから"開く"を選択して開く

## 使い方

書籍の開き方は2つあります。

1. bi-epub-readerを開いてから、epubをD&Dで開く
2. epubファイルに関連付けて、bi-epub-readerを開く

前者の方法は、Bibi自体が持ってる機能です。

![epub-reader](https://efcl.info/wp-content/uploads/2022/06/25-1656162042.png)

後者の機能は、[bi-epub-reader](https://github.com/azu/bi-epub-reader)が実装している機能です。

### epubの関連付けて開く仕組み

[bi-epub-reader](https://github.com/azu/bi-epub-reader)ではBibiをそのままiframeで表示しているだけです。
Bibiはソースコードも公開されているオープンソースですが、npmパッケージとして公開されているわけではありません。
そのため、Bibiを使うにはHTMLやJSを含んだソースコードをアプリにコピーして利用する必要があります。

- [satorumurmur/bibi: Bibi | EPUB Reader on your website.](https://github.com/satorumurmur/bibi)

このときに、Bibiのソース自体は変更せずにBibiをラップしたアプリケーションとして作成することを目標にしました。
これはBibi自体のアップデートを取り込みやすくすることで、メンテナンス性を上げるためです。
ソースコードを変更してしまうと、新しいバージョンを取り込みが大変になってしまいます。

一方で、Bibiにはローカルファイルを開く仕組みはないため、ソースコードを変更せずにローカルのepubファイルを開くには少し特殊なことをしています。

[bi-epub-reader](https://github.com/azu/bi-epub-reader)のElectronアプリが起動すると、ローカルサーバが起動し、開いたファイルを返すAPIサーバが立ち上がります。

- <https://github.com/azu/bi-epub-reader/blob/d5fbe98fd69e166b48b6adb3ec3f71553f5676a1/src/index.ts#L22-L41>

Bibiには`?book=url`で指定したリモートURLのepubファイルを開く仕組みがあったので、このURLにローカルのAPI URLを指定することで、
ローカルのファイルを開いています。

- <https://github.com/azu/bi-epub-reader/blob/d5fbe98fd69e166b48b6adb3ec3f71553f5676a1/src/renderer.ts#L10>

このように、epubを返すだけのローカルサーバを立てることで、Bibiのソースコードは変更せずにローカルファイルを開く仕組みを実装しています。
また、URLには毎回推測できないIDを含めるようにしています。

## [Maintainer Month](https://maintainermonth.github.com/)

6月は[Maintainer Month](https://maintainermonth.github.com/)ということで、[bi-epub-reader](https://github.com/azu/bi-epub-reader)のメンテナンス性を高める工夫について書いてみました。
メンテナンスが複雑なオープンソースは持つには色々覚悟がいるため、ラッパーアプリに徹することでメンテナンス性を保つ方向にしました。

> Maintainer Month is a reminder for the ecosystem to support, celebrate, and compensate open source maintainers.  
> -- [Maintainer Month](https://maintainermonth.github.com/)

[Maintainer Month](https://maintainermonth.github.com/)はGitHubが主催していて、オープンソースのメンテナーが集まって情報共有したり、祝ったりするイベントらしいです。

- [Welcome to Maintainer Month! 🎉 | The GitHub Blog](https://github.blog/2022-06-01-welcome-to-maintainer-month/)

GitHubが[GitHub社が依存してるオープンソースのメンテナー900名以上](https://github.com/orgs/github/sponsoring)に、500,000ドルを分配したという話もこの[Maintainer Month](https://maintainermonth.github.com/)の一環のようです。
自分もこれの対象になっていて、これで初めて[Maintainer Month](https://maintainermonth.github.com/)自体を知りました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">自分もMaintainer MonthでGitHub Sponsorsの対象だった。<a href="https://t.co/gOU8eE79ta">https://t.co/gOU8eE79ta</a><br><br>Thanks to <a href="https://twitter.com/github?ref_src=twsrc%5Etfw">@github</a>, Sponsors, and Maintainers 🎉 <a href="https://t.co/EDqEbB2Hkq">pic.twitter.com/EDqEbB2Hkq</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1540496237647917057?ref_src=twsrc%5Etfw">June 25, 2022</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

- [Thank you to our maintainers | The GitHub Blog](https://github.blog/2022-06-24-thank-you-to-our-maintainers/)

後、一週間しかないですが、[Maintainer Month](https://maintainermonth.github.com/)に乗っかる形でオープンソースのメンテナンスとかGitHub Sponsorsとかについて書けるといいなーと思います。せっかくのイベントだし、色々な人が色々書くと良さそうと思いました。