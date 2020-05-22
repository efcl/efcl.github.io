---
title: "OneNoteのデータを画像付きのMarkdownにexportする"
author: azu
layout: post
date : 2020-05-23T07:22
category: 雑記
tags:
    - Greasemonkey
    - OneNote
    - Markdown

---

今まで技術書のメモをOneNoteに取っていました。
OneNoteを使う理由としては、自分はスクリーンショットをメモの代わりにしていて、OneNoteは画像が扱いやすくOCRも効くためでした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">技術書読むときメモ取る代わりにスクショとって貼って書くこと多いんだけど、これできるアプリ欲しい。<br>OneNoteでやってるんだけど、もっと気軽に読みながらスクショとメモを貯められる一時置き場みたいのがほしいな。<br>最終的な貼り付け先はOCRできるOneNoteがいい気がするけど。 <a href="https://t.co/TzyRdSgMFh">pic.twitter.com/TzyRdSgMFh</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1173109647026163714?ref_src=twsrc%5Etfw">September 15, 2019</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

ただし、OneNoteを使うとスクショを取って貼り付けるという作業が面倒でした。

そのため、[mumemo](https://github.com/azu/mumemo)というスクリーンショットベースのメモをとり、Markdownファイルとして書き出していくアプリを書きました。

- [azu/mumemo: Mumemo is screenshot-driven note application.](https://github.com/azu/mumemo)

[mumemo](https://github.com/azu/mumemo)は次のように、記録したい範囲を選択して(選択範囲もメモ内に埋め込まれる、OCRの代わり)、スクショ(OpenCV.jsでいい感じに加工する)を取って、必要ならメモ欄に書いていく追記型のメモアプリです。
mumemoで記録したメモ書きは、次のようなファイルベースのMarkdownと画像ファイルとして出力されます。

```
├── 2019
│   ├── DevOps
│   │    ├──README.md
│   │    └──img/
│   ├── JavaScript
│   │    ├──README.md
│   │    └──img/
├── 2020
│   ├── JavaScript-\ The\ First\ 20\ Years
│   │    ├──README.md
│   │    └──img/
└── └── kubernetes
         ├──README.md
         └──img/
```

[mumemo](https://github.com/azu/mumemo)で記録したMarkdownはただのファイルなので、普通にローカルで検索もできて、自分専用のPrivateリポジトリで管理もできます。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://t.co/fhVoRIJCZ9">https://t.co/fhVoRIJCZ9</a><br>numemo で技術書のメモ取れるようになってだいぶ理想形に近くなった気がする。以前より読むときのメモの量が増えた感じ。<br>これとおなじのiPadでやりたいんだけどなー <a href="https://t.co/TKFEplwGII">pic.twitter.com/TKFEplwGII</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1259500970066628608?ref_src=twsrc%5Etfw">May 10, 2020</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

numemoに移行したため、今までOneNoteで取っていたメモ書きも同じ形式に移行する必要がでてきました。

macOSのOneNoteにはPDF出力以外の手段が用意されていないため、ウェブ版の<https://www.onenote.com>からメモをダウンロードしてMarkdownに変換する仕組みを作りました。

- [azu/export-onenote-to-html: A Toolkit that convert OneNote pages into HTML and Markdown with images.](https://github.com/azu/export-onenote-to-html)

## [export-onenote-to-html](https://github.com/azu/export-onenote-to-html)

[export-onenote-to-html](https://github.com/azu/export-onenote-to-html)は２つのステップでOneNoteをMarkdownに変換します。

### OneNoteのHTMLファイルをダウンロードする

[Greasemonkey](https://addons.mozilla.org/ja/firefox/addon/greasemonkey/) or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)を使って、ウェブ版の<https://www.onenote.com>からページをHTMLとしてダウンロードします。

1. <https://github.com/azu/export-onenote-to-html/blob/master/onenote-downloader.user.js> をインストール
2. ウェブ版の<https://www.onenote.com>にアクセス
3. ダウンロードしたいページを開く
4. 画像のダウンロードを待つ
5. 右上の "Download" ボタンを押す

![image](https://raw.githubusercontent.com/azu/export-onenote-to-html/master/docs/resources/download.png)

ウェブ版のOneNoteはHTMLにBase64化した画像をインラインに埋め込んでいます。
そのため、ものすごいサイズのHTMLファイルがダウンロードできると思います。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">OneNoteのファイルをダウンロードするとこんな感じになる(スクショ大量 * base64だからサイズがすごい <a href="https://t.co/Z7zqIk6u4f">pic.twitter.com/Z7zqIk6u4f</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1257579386770841608?ref_src=twsrc%5Etfw">May 5, 2020</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

ダウンロードできたら、埋め込まれたHTMLをMarkdownと画像として変換します。

### ダウンロードしたHTMLをMarkdownと画像に変換

[export-onenote-to-html](https://www.npmjs.com/package/export-onenote-to-html)というnpmモジュールを使ってダウンロードしたHTMLをMarkdownと画像ファイルに変換できます。

利用するには[Node.js](https://nodejs.org/ja/)のインストールが必要です。(npxコマンドは[Node.js](https://nodejs.org/ja/)にもはいっています)

次のようにダウンロードしたファイル(`downloaded-page.html`)を変換して、その結果を `out/` ディレクトリに出力できます。

```
npx export-onenote-to-html downloaded-page.html --output out/ 
```

ダウンロードしたHTMLをまとめて変換したい場合は、`xargs`や[rargs](https://github.com/lotabout/rargs)などを使えばできます。

次のコマンドは、カレントディレクトリにあるHTMLをすべて変換する例です。

```
# macOS
$ brew install rargs
# Install CLI globally
$ npm install --global export-onenote-to-html
# convert 
$ ls *.html | rargs -p '(?P<file>.*)\.(?P<ext>html)' export-onenote-to-html {file}.{ext} --output {file}
```

年数別のディレクトリでワケたい場合は、`export-onenote-to-html`に`--yearDirectory`というフラグがあるので、これを試してみてください。
(ダウンロードしたHTMLに依存しているのでうまくいかないケースもありそうです)

## おわり

[export-onenote-to-html](https://www.npmjs.com/package/export-onenote-to-html)でOneNoteに書いてたメモを、GitHubに移行しました。
本を読んでいるときのスクショベースのメモは[mumemo](https://github.com/azu/mumemo)でやるようになって、だいぶ効率が良くなった気がします。
わざわざ別のメモアプリを開かないで、ポップアップウィンドウのメモ欄にその場で書けるようになったので、メモの量が増えた感じがします。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">mumemo - screenshot based note app.<a href="https://t.co/fhVoRIJCZ9">https://t.co/fhVoRIJCZ9</a> <a href="https://t.co/UHv6Wv4JPN">pic.twitter.com/UHv6Wv4JPN</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1263967124227153920?ref_src=twsrc%5Etfw">May 22, 2020</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

ファイルベースのメモがいいのかはまだわかってないですが、完全一致の検索はVSCodeでしたり、キーワードの組み合わせ検索(AとBのAND検索)はGitHubのPrivateリポジトリで行う形にもできたりはするはずので、まあまあいいのかなーって気がします。

- [azu/export-onenote-to-html: A Toolkit that convert OneNote pages into HTML and Markdown with images.](https://github.com/azu/export-onenote-to-html)