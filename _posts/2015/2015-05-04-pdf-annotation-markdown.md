---
title: "PDFを見ながらMarkdownでメモを取れるアプリを書いた"
author: azu
layout: post
date : 2015-05-04T15:39
category: JavaScript
tags:
    - nw.js
    - node-webkit
    - pdf
    - markdown
    - github
    - JavaScript

---

[NW.js](http://nwjs.io/ "NW.js")(node-webkit)で[azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator")というアプリを作りました。

![screenshot](http://efcl.info/wp-content/uploads/2015/05/04-1430721718.png)

## [pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator")

簡単に書くと

- PDFとMarkdownエディタを横に並べてメモを書けるアプリ
- PDFから選択範囲をエディタに引用
	- プレビューモードから該当ページにジャンプできる
- Markdownの読み書き
- Markdownのプレビュー

という感じのシンプルなアプリです。

### インストール

- [latest binary](https://github.com/azu/pdf-markdown-annotator/releases/latest)からダウンロード

OS X, Windows, Linuxで多分動くはずです

---- 


- ES5の仕様書を読みたくなった
- メモ付けないと一瞬で忘れる
- HTMLページにメモ付けるタイプはサービスに依存する
- PDFにアノテーションを付ける => PDFのアノテーションを使う習慣がない
- メモはMarkdownで書きたい
- [Highlights App for Mac](http://highlightsapp.net/ "Highlights App for Mac") というアプリを見つけた
- 悪くない使い心地
- 発想が面白い PDF + Markdownメモ
- pdf.jsとCodeMirrorで普通に実現できそう -> [azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator") 作った
- このアーキテクチャならブラウザ上でも動かせそう -> https://github.com/azu/annotation-memo/ できた