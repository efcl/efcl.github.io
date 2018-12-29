---
title: "どんなtextareaもエディタに差し替えて、Prettierで整形できるGreasemonkey"
author: azu
layout: post
date : 2018-12-29T09:27
category: JavaScript
tags:
    - Greasemonkey
    - JavaScript

---

GitHubやQiitaなどの入力欄はただの`<textarea>`で、シンタックスハイライトされていたりするわけではありません。
そのため、その場でコードを書いたりインデントが難しくく、壊れていたり読みにくいコードを書いてしまいやすいです。
(インデントがバラバラだったりすることが多いです)

そのため、`<textarea>`をショートカット一発で、[CodeMirror](https://codemirror.net/)を使ったエディタにその場で差し替えるGreasemonkeyスクリプトを書いていました。(Violentmonkey、Tampermonkeyなどでも動くので、Chromeなどでも動くと思います)

- [テキストエリアをMarkdownエディタに切り替えるGreasemonkeyを書いた | Web Scratch](https://efcl.info/2015/05/10/codemirror-anywhere/)

最近アップデートして、このスクリプトに[prettier](https://github.com/prettier/prettier)を組み込みました。

次のように<kbd>Cmd+Alt+F</kbd>を押すだけで、Markdownやその中のコードブロックを整形できます。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/codemirror?ref_src=twsrc%5Etfw">@codemirror</a> + <a href="https://twitter.com/PrettierCode?ref_src=twsrc%5Etfw">@PrettierCode</a> +  <a href="https://twitter.com/hashtag/Greasemonkey?src=hash&amp;ref_src=twsrc%5Etfw">#Greasemonkey</a><br><br>Write syntax highlighted Markdown in anywhere.<a href="https://t.co/gd0KBOcjST">https://t.co/gd0KBOcjST</a> <a href="https://t.co/3O5q1IlBJ4">pic.twitter.com/3O5q1IlBJ4</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1078205641519333376?ref_src=twsrc%5Etfw">December 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## インストール

次のURLをクリックすればインストールできます。

- [codemirror-anywhere.user.js](https://azu.github.io/codemirror-anywhere/codemirror-anywhere.user.js)

**Dependencies:**

先にGreamonkeyなどの拡張をブラウザにインストールしておく必要があります。

- [Greasemonkey – Firefox](https://addons.mozilla.org/ja/firefox/addon/greasemonkey/ "Greasemonkey – Get this Extension for 🦊 Firefox (ja)")
- [Tampermonkey - Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)


## 使い方

1. `<textarea>`にフォーカスする
2. <kbd>Cmd+E</kbd> or <kbd>Ctrl+E</kbd>を押す
    -textarea と CodeMirror をトグルできます。
3. <kbd>Cmd+E</kbd> or <kbd>Ctrl+E</kbd>を押すと戻せます

## ショートカット

- <kbd>Cmd+Alt+F</kbd>: [prettier](http://prettier.io/)での整形

## リポジトリ

- [azu/codemirror-anywhere: \[Greasemonkey\] Use CodeMirror editor instead of textarea in anywhere](https://github.com/azu/codemirror-anywhere/blob/master/README.md)

結構ざっくり作ったやつなので、IssueやPull Reuqestを待っています。

