---
title: "mu-pdf-viewerに検索一覧をつけた"
author: azu
layout: post
date : 2016-11-07T10:02
category: JavaScript
tags:
    - Electron
    - PDF

---

[mu-pdf-viewer](https://github.com/azu/mu-pdf-viewer "mu-pdf-viewer")は上から下へ読むように作ったので、検索など移動して読むパターンはイマイチでした。

- [pdf.jsなPDFビューアアプリをElectronで作った | Web Scratch](http://efcl.info/2016/10/12/mu-pdf-viewer/ "pdf.jsなPDFビューアアプリをElectronで作った | Web Scratch")

タイトルのように、Cmd+Fで検索したら同時に検索結果の一覧を表示できるようにしました。
クリックすると移動もできるので、これでリファレンス的に探すのも少しは便利になりそうです。

<iframe src="//giphy.com/embed/l0HlNxuHU8SmqmYus" width="480" height="242" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="http://giphy.com/gifs/l0HlNxuHU8SmqmYus">via GIPHY</a></p>

自動でGitHub Releaseにアップロードしてるバイナリバグってる気がするので、動かない場合はローカルでビルドした方が良さそうです。(イマイチ原因分かってない…)

	npm run electron:build:osx

ECMAScriptの仕様書をオフラインで検索し易い形で読む方法を探してたらこうなりました。
([Chemrtron](https://github.com/cho45/Chemrtron)が求めてるようなものな気がするので、あとでもう一度挑戦したい。検索結果はでるけど、クリックも何もできなくてよくわからなかった。)