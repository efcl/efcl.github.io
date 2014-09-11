---
title: "SlideShareやSpeackerDeckで現在ページのパーマネントリンクを取得するブックマークレット"
author: azu
layout: post
date : 2014-09-12T08:00
category: JavaScript
tags:
    - JavaScript
    - ブックマークレット
    - GitHub

---
SlideShareやSpeackerDeck等で現在表示してるページのパーマネントにURLを書き換えるブックマークレットを書きました。

- [where-page-in-slide](http://azu.github.io/where-page-in-slide/ "where-page-in-slide")

においてあります。

使い方は、SlideShare、SpeakerDeckでスライド表示中にブックマークレットを実行すれば、そのページ数にアクセスできるパーマネントリンクにURLを書き換えてくれます。

[slideshare, SpeakerDeck の URL でページ番号を指定するには - わからん](http://d.hatena.ne.jp/kitokitoki/20130722/p2 "slideshare, SpeakerDeck の URL でページ番号を指定するには - わからん") を参考に作りました。

かなり雑に現在ページを取得してるのでサイトの構造が変化するとうごかなくなるかもしれません。
その場合は[azu/where-page-in-slide](https://github.com/azu/where-page-in-slide "azu/where-page-in-slide") にソース公開してあるので修正送って頂けると嬉しいです。

## ブックマークレットの仕組み

このブックマークレットはBrowserify + [bookmarkletter](https://github.com/azu/bookmarkletter "bookmarkletter")で作られています。

[bookmarkletter](https://github.com/azu/bookmarkletter "bookmarkletter")はこのために書いた、コマンドラインからブックマークレットを作成するツールです。

- [ブックマークレットを作るコマンドラインツール | Web Scratch](http://efcl.info/2014/09/08/bookmarklets-env/ "ブックマークレットを作るコマンドラインツール | Web Scratch")

また、bookmarkletterを作ってから気づいたのですが、GitHubのREADMEには`javascript:`なリンクは埋め込む事が出来ません(セキュリティの都合)

- https://github.com/github/markup/tree/master#html-sanitization

そのため、ブックマークレットは[azu.github.io/where-page-in-slide](http://azu.github.io/where-page-in-slide/ "where-page-in-slide") のようにGitHub Pagesに公開しています。

更新する度にGitHub Pagesを書き換えるのは面倒だったので、ブックマークレット自体をファイルとして置いて、それをXHRで読み込んでリンクに埋め込むライブラリを書きました。

- [azu/embed-bookmarklets](https://github.com/azu/embed-bookmarklets "azu/embed-bookmarklets")

[azu/embed-bookmarklets](https://github.com/azu/embed-bookmarklets "azu/embed-bookmarklets")は大したことはやっていなくて、以下のように読み込んで使います。

```html
<script src="http://azu.github.io/embed-bookmarklets/embed-bookmarklets.js"></script>
```

このスクリプトを読み込んだページに`<a href="ブックマークレットファイルのURL" rel="bookmarklets">`という属性を持つHTMLを書いておきます。

以下のような感じですね。

```html
<p>Drop & Drop <a href="./where-page-in-slide.js" rel="bookmarklets">where-page-in-slide</a> to bookmark toolbar.</p>
<script src="http://azu.github.io/embed-bookmarklets/embed-bookmarklets.js"></script>
```

そうすると、hrefで指定したファイルを読み込んで`href`の中に埋め込んでくれます。

```html
<p>Drop & Drop <a href="javascript:..." rel="bookmarklets">where-page-in-slide</a> to bookmark toolbar.</p>
```

これで、ブックマークレットファイルだけを更新すれば配布ページも自動的に更新されるという形にしてます。

ブックマークレットの配布は[let.hatelabo.jp](http://let.hatelabo.jp/ "let.hatelabo.jp")を使うのが楽なのですが、httpsに対応してないためこういう配布方法にしました。
他のメリットとしては一つのファイルにまとめて非同期ロードを無くす事でポップアップブロックの制限が外れることがあります。
Browserifyを使えば気軽にライブラリもインライン化して入れられるのでべんりです。