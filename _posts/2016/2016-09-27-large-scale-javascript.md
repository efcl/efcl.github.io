---
title: "複雑なJavaScriptアプリケーションを作るためにやったことをまとめた"
author: azu
layout: post
date : 2016-09-27T10:18
category: JavaScript
tags:
    - JavaScript
    - CQRS
    - Almin
    - React
    - CSS
    - PostCSS

---

タイトルどおりですが、次のリポジトリに複雑なクライアントJavaScriptアプリケーションをどう考えて作っていくかを実践した内容をまとめてあります。

- [azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること](https://github.com/azu/large-scale-javascript "azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること")

ここでいう複雑なアプリケーションとは、ライブラリ抜きで数万LOC以上ぐらいの規模になることが予測されているようなものを扱っています。(巨大というよりは複雑という印象)

## 140文字でOK

140文字向けのサマリだと次のような感じです。

> JavaScriptで複雑なアプリケーションを作る構成と実践ガイド。
> ドメインモデルをどのように考えて作っていくかについて。
> Babel、React、Almin、PostCSSがベース。

作成するアプリケーションによって必要な構造は異なるため、この構成がよいということを主張するものではありませんが、 何か参考になるものがあれば幸いです。

## 内容

[azu/large-scale-javascript](https://github.com/azu/large-scale-javascript "azu/large-scale-javascript")は、同じ趣旨の[複雑なJavaScriptアプリケーションを考えながら作る話](https://azu.github.io//slide/2016/react-meetup/large-scale-javascript.html "複雑なJavaScriptアプリケーションを考えながら作る話")というスライドと合わせて読む感じの内容になっています。

[コーディングガイド](./docs)的なドキュメントや[小さな実装例](https://github.com/azu/presentation-annotator "azu/presentation-annotator: viewing presentation and annotate.")などがおいてあります。
また[Almin](https://github.com/almin/almin "Almin")でCQRS的な実装するための[参考にした書籍/スライド/記事](https://github.com/azu/large-scale-javascript/blob/master/refs.md)や[ポエム](https://github.com/azu/large-scale-javascript)みたいなやつも書いてあります。

疑問や意見などは[New Issue](https://github.com/azu/large-scale-javascript/issues/new)を作って書くか、[Twitter](https://twitter.com/azu_re)とか適当に聞いてください。
