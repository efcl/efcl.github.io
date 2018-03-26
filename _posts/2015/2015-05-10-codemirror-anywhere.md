---
title: "テキストエリアをMarkdownエディタに切り替えるGreasemonkeyを書いた"
author: azu
layout: post
date : 2015-05-10T16:46
category: Greasemonkey
tags:
    - JavaScript
    - Markdown
    - Greasemonkey
    - GitHub
    - Qiita

---

最近GitHubのコメントとかQiitaのコメントなど色々な部分でMarkdownで書くことが出来るようになっていると思います。
しかし、大体はただの`<textarea>`に絵文字やユーザ名の補完がついただけのものになっていて、
Markdown支援的な機能が入ってるものは意外と多くない印象です。

特に気になるのがタブインデントができなかったり、エディタ上のシンタックスハイライトが無かったりする所なので、
それを適当に解消するGreasemonkeyスクリプトを書きました。

## [azu/codemirror-anywhere](https://github.com/azu/codemirror-anywhere "azu/codemirror-anywhere")

[codemirror-anywhere](https://github.com/azu/codemirror-anywhere "azu/codemirror-anywhere") 名前の通り`<textarea>`を[CodeMirror](http://codemirror.net/ "CodeMirror")のエディタに切り替える事が出来るものです。

こんな感じで、Cmd+E or Ctrl+Eで`<textarea>`とCodeMirrorを切り替え出来ます。


![img1](https://i.gyazo.com/c29a9a3535c66083827cba81181bd5c1.gif)

![img2](https://i.gyazo.com/990c553552be3ca673e815c777c3f8b2.gif)

![img3](https://gyazo.com/003a690ade95e7a84b3f06de1c0ac508.gif)

## インストール

- [codemirror-anywhere.user.js](https://github.com/azu/codemirror-anywhere/raw/master/codemirror-anywhere.user.js) からインストール

## 使い方

1. `<textarea>` にフォーカス
2. Cmd+E or Ctrl+Eでトグル

## おわりに

ものすごく適当に書いたのですが、適当に動いてくれるので思ったより便利です。
