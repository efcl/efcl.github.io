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

### なぜ作ったか?

箇条書すると以下のような感じで作りました。

- ES5の仕様書を読みたくなった
- PDF or HTML どっちで読む?
- メモ付けないと一瞬で忘れる
- HTMLにメモを書く?
	- HTMLページにメモ付けるタイプはサービスに依存する(保存場所の問題
	- [Home - Annotator - Annotating the Web](http://annotatorjs.org/ "Home - Annotator - Annotating the Web")
- PDFにアノテーションを付ける?
	- PDFのアノテーションを使う習慣がない
- メモはMarkdownで書きたい
- [Highlights App for Mac](http://highlightsapp.net/ "Highlights App for Mac") というアプリを見つけた
	- 悪くない使い心地
	- 発想が面白い PDF + Markdownエディタ
- pdf.jsとCodeMirrorで普通に実現できそう
	- [azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator") 作った
- このアーキテクチャならブラウザ上でも動かせそう
	- https://github.com/azu/annotation-memo/ 動いた

という感じでできました。

最後に書いてありますが、[azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator")はブラウザ上でも動くように作ったので(read onlyですが)以下にES5仕様の読書メモを公開してあります。

- [ECMAScript 5 読書メモ](http://azu.github.io/annotation-memo/es5/ "ECMAScript 5 読書メモ")
	- アプリ版と全く同じソースコードで、`fs`とか一部動かないのはfallback書いた感じです
	- ブラウザはプレビューモードなので、リンクをクリックするとページにジャンプできるのは便利で気に入ってます

[azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator")はES6 + [React](http://facebook.github.io/react/ "React") + [material-flux](https://github.com/azu/material-flux "azu/material-flux") + [CodeMirror](http://codemirror.net/) + [pdf.js](https://github.com/mozilla/pdf.js)のweb viewerで動いています。

NW.jsはNode.jsが動くので、

```
require("babel/register")();
```

という一行が初期化時に走って、後はES6で書いたコードが読み込み時に自動でES5とかに変換されるのでES6のコードがビルド不要で動かせます。(多分大部分はFirefoxやChromeなら素で動く感じがしますが)