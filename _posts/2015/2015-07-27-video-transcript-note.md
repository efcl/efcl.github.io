---
title: "動画とルビ翻訳された字幕をみながらMarkdownメモできるアプリを書いた"
author: azu
layout: post
date : 2015-07-27T09:05
category: JavaScript
tags:
    - Electron
    - JavaScript
    - Video
    - 字幕
    - markdown

---

[video-transcript-note](https://github.com/azu/video-transcript-note "video-transcript-note") というElectronアプリを書きました。

一言で説明するならば、[PDFを見ながらMarkdownでメモを取れるアプリを書いた](https://efcl.info/2015/05/04/pdf-annotation-markdown/ "PDFを見ながらMarkdownでメモを取れるアプリを書いた | Web Scratch")の動画版です。

## インストール

[latest binary](https://github.com/azu/video-transcript-note/releases/latest)から最新のバイナリを落として起動すればいけるはずです。

Linuxも多分動くんだと思いますが、何か妙にバイナリが大きいかったので[ビルド](https://github.com/azu/video-transcript-note/blob/6b803d7081b863570cd638e20fc1a67a397c4a61/package.json#L21)からは外してます。(適当に修正PRでも下さい)

## 機能

![screenshot](https://monosnap.com/image/0B7VE8sHjR7ZojNUWDs0u5z8ZZCwRl.png)

機能としては、HTML5 Video + `<track>`による字幕 + CodeMirrorでのMarkdownメモと言った感じのアプリです。

- HTML5 Video player
    - + [keyboard shortcut](https://github.com/azu/video-shortcut-controller)
- ルビ翻訳された字幕
    - English to 日本語
- Markdown Note
- Quote from Video and Transcript.
    - `Cmd+T`/`Ctrl+T`

ルビ翻訳は[英語の文章をルビ翻訳(ふりがな和訳)するGreasemonkeyを書いた](https://efcl.info/2014/11/30/ruby-translator-greasemonkey/ "英語の文章をルビ翻訳(ふりがな和訳)するGreasemonkeyを書いた | Web Scratch")と殆ど同じ仕組みで、辞書として[簡短英日辞典](https://github.com/gunyarakun/kantan-ej-dictionary "簡短英日辞典")を使っています。

- [gunyarakun/kantan-ej-dictionary](https://github.com/gunyarakun/kantan-ej-dictionary)
- [Netflixの英語字幕に日本語訳をつけるChrome拡張「Netflix Subtitles Extender for Japanese」をリリースしました](http://blog.wktk.co.jp/ja/entry/2015/07/07/netflix-subtitles-extender-for-japanese)
- [azu/kantan-ej-dict](https://github.com/azu/kantan-ej-dict "azu/kantan-ej-dict") (npmモジュール)

![quote](https://monosnap.com/image/FSFWLmC6vpn6UopBPYom8cSyiCDMtL.png)

また"Quote"の機能としては、現在表示中の動画のスクリーンショット+再生時間+表示されてる字幕を引用してエディタに追加する形となってます。

ローカルの動画ファイルパスを入力すれば再生が開始されます。(最初にpreloadするのでちょっと待つ必要があります)
字幕は動画ファイル名と同じ名前で、`.srt`か`.vtt`の字幕ファイルが動画ファイルと同じディレクトリに存在していれば読み込まれます。

[rg3/youtube-dl](https://github.com/rg3/youtube-dl "rg3/youtube-dl")で

```
youtube-dl --write-sub
```

などで字幕付きの動画を見てみるのが早いのかもしれないですね。
([video-transcript-note](https://github.com/azu/video-transcript-note "video-transcript-note")にダウンロード機能はないです)

## 仕組み

基本的にHTML5 Videoの機能にそのまま乗っかっています。

- [azu/video-prefetcher](https://github.com/azu/video-prefetcher)
	- 最初にXHRで動画を全部ロードしてblob urlをvideo.srcに設定する
- [azu/video-shortcut-controller](https://github.com/azu/video-shortcut-controller)
	- 矢印でシーンスキップなど基本的なショートカットをつける
- [azu/video-transcript-tracker](https://github.com/azu/video-transcript-tracker)
	- `<track>`要素の字幕が切り替わった時にその内容をテキストして取得する

上記のようなライブラリを作って使っています。

最後の`<track>`要素が結構面白くて、HTML5 Videoでは`.vtt`という拡張子の字幕ファイルを`<track>`要素で指定できます。

- [track 要素の基礎 - HTML5 Rocks](http://www.html5rocks.com/ja/tutorials/track/basics/)
- [track 要素のスクリプトによる操作 (Windows)](https://msdn.microsoft.com/ja-jp/library/jj152145(v=vs.85).aspx)

[youtube-dl](https://github.com/rg3/youtube-dl "youtube-dl")などでYoutubeの動画を確認してみると`.srt`の動画もあったりしますが、[video-transcript-note](https://github.com/azu/video-transcript-note "video-transcript-note")では[srt2vtt](https://github.com/deestan/srt2vtt "srt2vtt")で自動的に変換してどちらでも扱えるようにしてます。

この字幕は非表示(disableとは別)の場合でも、"cuechange"というのが発生して字幕の内容が変わったことができるようになっていて、その辺を楽に使えるようにしたのが[azu/video-transcript-tracker](https://github.com/azu/video-transcript-tracker)というライブラリです。

これを使うと字幕を再生してるタイミングのものをテキストとして取得できるので、それをルビ翻訳して表示しているという感じですね。

HTML5 Video(+fallbackにflash)というは大量にあるのですが、`<video>`や`<track>`を扱う細かいモジュールは意外とないです。

- [HTML5 Video Player Comparison](http://praegnanz.de/html5video/ "HTML5 Video Player Comparison")

ここに出てくるライブラリは商用っぽかったり、いわゆる動画プレイヤーでしかないようなものが多くて、今回みたいなことをするの向いてない感じがしたので素の`<video>`を扱ってます。
([videojs/video.js](https://github.com/videojs/video.js "videojs/video.js")とかは結構面白そうだった)

今回はメモ要素が必要だったのでElectronアプリにしてますが(NW.jsだと何かコーデックが面倒そうだった)、単純に`<video>`と`<track>`を扱う部分については普通にブラウザでも動作します。

実際にこのアプリを内部的なモードを切り替えればブラウザでも動きそうな気がする(途中まで完全にブラウザで開発してた)ので、`<video>`と`<track>`とかで遊んでみるのも良いかもしれません。
