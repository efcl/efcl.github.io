---
title: "Promise本 Ver1.4リリース"
author: azu
layout: post
date : 2015-01-26T12:33
category: JavaScript
tags:
    - Book
    - Promise
    - JavaScript
    - GitHub

---

[JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本")の[1.4.0](https://github.com/azu/promises-book/releases/tag/1.4.0 "1.4.0")をリリースしたので、
前回書いたVer 1.2から変更点を簡単にまとめたものです。

- [JavaScript Promiseの本Ver1.2とAsciidoctor | Web Scratch](http://efcl.info/2014/08/19/promises-book-1.2.0/ "JavaScript Promiseの本Ver1.2とAsciidoctor | Web Scratch")
- [Comparing 1.2.0...1.4.0 · azu/promises-book](https://github.com/azu/promises-book/compare/1.2.0...1.4.0 "Comparing 1.2.0...1.4.0 · azu/promises-book")

各バージョン毎のリリースノートは[Releases · azu/promises-book](https://github.com/azu/promises-book/releases "Releases · azu/promises-book")に書いてるので詳しくはこちらを見て下さい。

- [RSS Release notes from promises-book](https://github.com/azu/promises-book/releases.atom "Release notes from promises-book") RSSで購読も出来ます。

## 変更履歴

一番変化が大きいのは[3.1. 基本的なテスト](http://azu.github.io/promises-book/#basic-tests "3.1. 基本的なテスト")だと思います。

細かい変更は以下の通りです。

**PDF**

- PDFで❶という感じの番号が一部ずれている問題を修正しました
	- [PDF出力結果が意図しない結果である可能性があります · Issue #190 · azu/promises-book](https://github.com/azu/promises-book/issues/190 "PDF出力結果が意図しない結果である可能性があります · Issue #190 · azu/promises-book")

**Chapter 0**

- Promiseをサポートしてるブラウザについての記述を簡略化しました
	- 現代的なブラウザはPromiseをサポートしてるので特定のバージョンを示す記述を削除しました
	- [Ch0: Promiseをサポートしてるブラウザのバージョン表記について · Issue #211 · azu/promises-book](https://github.com/azu/promises-book/issues/211 "Ch0: Promiseをサポートしてるブラウザのバージョン表記について · Issue #211 · azu/promises-book")

**Chapter 2**

- [2.5. Promise#catch](http://azu.github.io/promises-book/#ch2-promise-catch "2.5. Promise#catch")にて`.catch(fn)`がIE8以下で問題がある事について触れていますが、多くの圧縮ツール等を介した場合この問題は自動的に回避されるケースがあることについて追記しました
	- [Ch2: `catch` プロダクトではあまり気にする必要ない · Issue #201 · azu/promises-book](https://github.com/azu/promises-book/issues/201 "Ch2: `catch` プロダクトではあまり気にする必要ない · Issue #201 · azu/promises-book")

**Chapter 3**

- [Mocha](http://mochajs.org/ "Mocha")の公式サイトのURLが変更されたのを修正
	- [fix(asciidoc): 誤字とリンク先修正 by misahot · Pull Request #191 · azu/promises-book](https://github.com/azu/promises-book/pull/191 "fix(asciidoc): 誤字とリンク先修正 by misahot · Pull Request #191 · azu/promises-book")
- [3.1. 基本的なテスト](http://azu.github.io/promises-book/#basic-tests "3.1. 基本的なテスト")の全体的な流れを変更して、Mochaのインストール方法についての記述を追加しました
	- Mochaの導入方法、実行方法を追加
	- power-assertについての記述を削除し、代わりにassertをそのまま使うように変更
	- 3.1の全体的な流れを変更
	- [Release 1.4.0 : Promiseのテストの導入についての更新 · azu/promises-book](https://github.com/azu/promises-book/releases/tag/1.4.0 "Release 1.4.0 : Promiseのテストの導入についての更新 · azu/promises-book")

**サンプルコード**

- `req.response` ではなく `req.responseText` を使用するように変更しました
	- [getURLがresponseを使ってる · Issue #185 · azu/promises-book](https://github.com/azu/promises-book/issues/185 "getURLがresponseを使ってる · Issue #185 · azu/promises-book")
- `==` で比較していたコードを`===`を使うように変更しました
	- [Ch2: ===に合わせる · Issue #198 · azu/promises-book](https://github.com/azu/promises-book/issues/198 "Ch2: ===に合わせる · Issue #198 · azu/promises-book")
	- [Ch2: `==` -&gt; `===` · Issue #206 · azu/promises-book](https://github.com/azu/promises-book/issues/206 "Ch2: `==` -&gt; `===` · Issue #206 · azu/promises-book")

-----

## Contributing

Thanks [@misahot](https://github.com/misahot "misahot"), [@t-mochizuki](https://github.com/t-mochizuki "t-mochizuki"), [@alitaso345](https://twitter.com/alitaso345/status/502618230666846209 "@alitaso345") and [Online Study TokyoBouldering.js](http://lingr.com/room/tkbjs "Online Study TokyoBouldering.js").

## TODO

意見やPull Request募集しています。

- [epubのサポート · Issue #208 · azu/promises-book](https://github.com/azu/promises-book/issues/208)
- [Docker対応 · Issue #212 · azu/promises-book](https://github.com/azu/promises-book/issues/212)
