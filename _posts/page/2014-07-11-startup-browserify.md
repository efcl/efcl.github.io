---
title: これからBrowserifyを始める人へ
author: azu
layout: post
categories:
    - javascript
tags:
    - JavaScript
    - Browserify
    - まとめ

---

## Browserifyとは

[Browserify](http://browserify.org/ "Browserify") とはNode.jsスタイルで書かれたモジュール(CommonJS)を
ブラウザで利用できるように変換するコマンドラインツール 兼 Nodeモジュールです。

### Browserifyの基本

Browserifyを一般的にコマンドラインツールとして使う事が殆どでしょう。
そのため、Browserifyはブラウザ向けのライブラリではなくて、ブラウザ向けに変換したコードを吐くための
変換ツールと言えるかもしれません。