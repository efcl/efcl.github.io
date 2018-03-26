---
title: "CodeMirrorでカーソル位置が常に中央になるアドオンを書いた"
author: azu
layout: post
categories:
    - javascript
tags:
    - JavaScript
    - library
    - CodeMirror

---

## [azu/codemirror-typewriter-scrolling](https://github.com/azu/codemirror-typewriter-scrolling "azu/codemirror-typewriter-scrolling")

[azu/codemirror-typewriter-scrolling](https://github.com/azu/codemirror-typewriter-scrolling "azu/codemirror-typewriter-scrolling") という
[CodeMirror](http://codemirror.net/ "CodeMirror")のアドオンを書きました。

### typewriter-scrolling?

**Typewriter Scrolling** というのはタイトルのように入力行が中央になる機能の事らしいです。

![gif](https://gyazo.com/a529c6a25caf013775df4309310a2e7f.gif)

[FoldingText](http://www.foldingtext.com/ "FoldingText")に同じ名前の機能があります(これでこの名前を知った)

<blockquote class="twitter-tweet" lang="en"><p>FoldingText 入力位置が中央になる機能がちゃんとある。&#10;TypeWriter Scrollingというのか&#10;<a href="http://t.co/zAjrlVzrpc">http://t.co/zAjrlVzrpc</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/statuses/500469491638104064">August 16, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

また、JetBrains IDEには**Show virtual space at file bottom**という名前で同じような機能があります。

![Show virtual space at file bottom](https://monosnap.com/image/1SEJ8dEPBs3fKcC1O1v0n77K8Mz6OF.png)

要は、入力行がエディタの一番下になると見にくくて不便だねというのを解消する機能です。

## Installation

[floating-memo.app](https://github.com/azu/floating-memo "floating-memo.app")で使いたくて書いたのでnpmにおいてあります。

公式の[Addons](http://codemirror.net/doc/manual.html#addons "Addons")を真似てUMDっぽいパターンで書かれているので、CommonJSやAMD、普通にスクリプトロードしても使えると思います。

```
npm install codemirror-typewriter-scrolling
```

## Usage

### `typewriterScrolling` option

`typewriterScrolling` というオプションをつければ自動的に`changes`イベントを監視してやってくれます。

``` js
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    mode: "markdown",
    typewriterScrolling: true // setOption
});
// empty line
editor.setValue((new Array(100)).join("\n"));
```

現在、末尾に空でもいいので改行がないと正しく動かない感じです。
上手い解消方法あったら教えて下さい。

### `scrollSelectionToCenter` command

`scrollSelectionToCenter` というコマンドも生えてるので、
手動で実行したい場合はこのコマンドをCodeMirrorのインスタンスから実行する事で行えます。

``` js
editor.execCommand("scrollSelectionToCenter");
```

## Contributing

[azu/codemirror-typewriter-scrolling](https://github.com/azu/codemirror-typewriter-scrolling "azu/codemirror-typewriter-scrolling") からpull-request歓迎しています。

## License

ライセンスはMITライセンスです。
