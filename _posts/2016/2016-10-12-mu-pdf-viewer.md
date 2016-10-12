---
title: "pdf.jsなPDFビューアアプリをElectronで作った"
author: azu
layout: post
date : 2016-10-12T20:39
category: JavaScript
tags:
    - pdf.js
    - Electron

---

タイトルどおりですが、FirefoxのPDFビューアをスタンドアローン化したようなアプリを作りました。

- [azu/mu-pdf-viewer: PDF viewer on electron.](https://github.com/azu/mu-pdf-viewer "azu/mu-pdf-viewer: PDF viewer on electron.")

特徴は次の通りです。

- [PDF.js](https://github.com/mozilla/pdf.js "PDF.js")ベース
- J, Kでスクロールなどいじっています
- Drag and Dropをサポートしてます

![screenshot](https://monosnap.com/file/BfCnnmtQZhiRNDAfahDjTtzQpy4nss.png)

## Install

npm でインストールするか

    npm install mu-pdf-viewer -g


バイナリをダウンロードして使えます(OS Xのみ)

- [https://github.com/azu/mu-pdf-viewer/releases/latest](https://github.com/azu/mu-pdf-viewer/releases/latest)

Travis CIとかでelectronを自動ビルドするのがかなり難しくなったので、自分用にOS X版のみバイナリを作ってます。

READMEにその他の環境のバイナリの作り方を書いてあります。

## Usage

npmでインストールした場合はCLIから起動できます。

    $ mu-pdf-viewer <pdf-file-path>

アプリの場合は普通にPDFファイルを開いたり、D&Dすれば起動します。

## 目的

ショートカットが自分好みにカスタマイズできるPDFビューアが少なかったので作りました。
具体的には0.3画面分ぐらいスクロールするショートカットを持っているアプリが殆どなかったというのがメインです。

ショートカットが自由なPDFビューアは他にないのかな?

アプリ自体は、[Almin](https://github.com/almin/almin "Almin")と[React](https://facebook.github.io/react/ "React")を使ってDDD風味で書いています。

