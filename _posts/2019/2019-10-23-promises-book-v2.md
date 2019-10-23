---
title: "JavaScript Promiseの本 v2リリース、ES2015+に対応、Async Functionの章を追加"
author: azu
layout: post
date : 2019-10-23T19:59
category: JavaScript
tags:
    - JavaScript
    - book
    - Promise

---

JavaScriptのPromiseについて学ぶ書籍である[JavaScript Promiseの本](https://azu.github.io/promises-book/) v2をリリースしました。

Promise本 1.0.0をリリースしたのは2014年6月ですが、そこから少しづつアップデートしていました。

- [JavaScript Promiseの本を書きました | Web Scratch](https://efcl.info/2014/0623/res3943/)
- [ES6がリリースされたのでPromiseについて学びましょう | Web Scratch](https://efcl.info/2015/06/23/promises-book-v1.5/)

今回のメジャーアップデートとなる2.0.0では、サンプルコードのコードベースをES2015前提のものへと変更しています。
1.x系からの主な変更点としては次のものがあります。

- `ES6`を`ES2015`に表記を変更
- コードベースをES5からES2015+に変更
- Async Functionの章を追加
- Promise#finallyの対応

## v2の変更点

[Promise本](https://azu.github.io/promises-book/) v2の主な変更点は次の通りです。

### コードベースをES5からES2015+に変更 [#249](https://github.com/azu/promises-book/issues/249) [#323](https://github.com/azu/promises-book/issues/323)

(Promise以外は)ES5ベースだったサンプルコードをES2015ベースにすべて書き換えました。
そのため、サンプルコードにもES2015の構文を使っています。

- Arrow Function
- Async Function(章として追加)
- `const`
- `class`

変更理由としては、ES2015のほうが簡潔に書ける部分([`class`を使った`Deferred`](https://azu.github.io/promises-book/#deferred-and-promise)など)があることや、
`var`よりも`const`や`let`の利用を促す傾向が全体的にあるためです。

ES2015の基本的な文法に不安がある方は、ES2015ベースのJavaScript入門書である[JavaScript Primer](https://jsprimer.net/)も作成しているので、併せて読んでみてください。

- [JavaScript Primer](https://jsprimer.net/)
    - [付録: JavaScriptチートシート](https://jsprimer.net/cheetsheet/)で構文から逆引きできます

また、サンプルコードがES5のものを読みたい場合は[Promise本 v1のアーカイブ](https://azu.github.io/promises-book/archives/v1/)も作成してあるので、こちらを参照してください。

### Async Functionの章を追加 [#246](https://github.com/azu/promises-book/issues/246) [#317](https://github.com/azu/promises-book/issues/317)

新しい章として[5. Chapter.5 - Async Function](https://azu.github.io/promises-book/#chapter5-async-function)を追加しました。

Async Function(`async`と`await`)はES2017で追加された新しい非同期処理に関する構文です。
ただし、Async Functionの内部的な処理にはPromiseが大きく関係しています。
そのため、Async FunctionとPromiseのどちらかを使えば良いという話ではなく、Async FunctionとPromiseは共存する関係にあります。

この章では、Async Functionの基本的な使い方から典型的なユースケースなどを見ていきます。

Async Generatorについては触れていないため、この辺は今後の課題です。
(そもそもGeneratorについて触れてない)

### Promise#finallyの対応 [#284](https://github.com/azu/promises-book/issues/284) [#294](https://github.com/azu/promises-book/issues/294)

ES2018からPromiseチェーンの最後の処理を簡潔に書ける`Promise#finally`メソッドが追加されました。
その解説を[2.6. Promise#finally](https://azu.github.io/promises-book/#ch2-promise-finally)に追加しています。

## その他

### 寄付手段としてGitHub Sponsorsを追加

寄付の手段として[JavaScript Promiseの本 付録](https://gumroad.com/l/javascript-promise)を好きな値段をつけて購入する以外にも、[GitHub Sponsors](https://github.com/sponsors/azu)での寄付を追加しました。

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)

Promise本専用のプランは特に用意してませんが、何か希望があったら言ってください。

### HTTPS

ウェブサイトが <https://azu.github.io/promises-book/> のように https になっています。

### Fetch APIとAbortController

PromiseベースのAPIである[Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)やキャンセル処理である[AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)についても簡単に触れています。

本文はXHRをラップした`fetchURL`ベースで話を進めていますが、この処理も少しだけFetch APIに寄せています。(もともとは`getURL`という名前だった。fetch get + res.ok + res.text()のイメージ)

### DocTest

内部的に[power-doctest](https://github.com/azu/power-doctest)を使ったテストを一部に取り入れました。

- [azu/power-doctest: JavaScript Doctest for JavaScript, Markdown and Asciidoc.](https://github.com/azu/power-doctest)
- [MarkdownやAsciidoc中に書いたJavaScriptのサンプルコードをdoctestするツールを作った | Web Scratch](https://efcl.info/2019/09/02/power-doctest-markdown-asciidoc/)

[CONTRIBUTING.md](https://github.com/azu/promises-book/blob/master/CONTRIBUTING.md#doctest)にもDocTestについてを追加しました。
コントリビューション待ってます！

## 今後の予定

[JavaScript Promiseの本](https://azu.github.io/promises-book/)は、次のような目的で書かれています。

> この書籍を読むことで学べる事として、次の3つを目標にして書きました。
>
>     Promiseについて学び、パターンやテストを扱えるようになる事
>     Promiseの向き不向きについて学び、何でもPromiseで解決するべきではないと知る事
>     ECMAScript6 Promiseの基本をよく学び、発展した形を自分で形成できるようになる事
>
> -- [JavaScript Promiseの本を書きました | Web Scratch](https://efcl.info/2014/0623/res3943/)

基本的には今もこれは変わってなくて、Promiseで迷ったときにここ見ればとりあえずわかるようなものを目指しています。
また、ECMAScriptの仕様が今も更新され続けているようにPromiseやAsync Function周りもまだ仕様が変更され続けています。

書籍を見ればわかるものを作るためには、書籍もそれに追従できるような仕組みになっていないとできません。

> こういう形態で書籍を公開したのは、常に書籍が更新出来るようにしたいからでもあります。  
> -- [JavaScript Promiseの本を書きました | Web Scratch](https://efcl.info/2014/0623/res3943/)

JavaScriptにおけるPromiseは、まだAPIが不十分がところがあるため、APIが拡張されています。
直近のものとしては`Promise.allSettled`はES2020で入ることが確定(Stage 4)であるため、対応が必要になりそうです。

- [Promise.allSettled (ES2020) · Issue #330 · azu/promises-book](https://github.com/azu/promises-book/issues/330)
- [Promise.any · Issue #335 · azu/promises-book](https://github.com/azu/promises-book/issues/335)
- [Promise.try · Issue #283 · azu/promises-book](https://github.com/azu/promises-book/issues/283)

またAsync Functionに関しては他の構文に対しても組み込まれているため、変更の幅が広いです。
例えば、Dynamic Importにも非同期が関係しているため、その辺と関連した内容が必要になるかもしれません。

このような変更に対応していくためにも、Promise本ではコミッターを募集しています。
[Promise.allSettled (ES2020) · Issue #330 · azu/promises-book](https://github.com/azu/promises-book/issues/330)は、やることが大体決まっているので手が出しやすいかもしれません。興味ある人は一緒に進めましょう。

書籍もライブラリのように途中でメインのメンテナーが変わってもいいはずなので、そのような形にできたほうが更新が続けられるんじゃないかなと思います。

- [azu/promises-book: JavaScript Promiseの本](https://github.com/azu/promises-book)
    - リポジトリはこちら

Promise本の細かい書き方とかはCONTRIBUTING.mdにあるので、興味がある人は見てみてください。
([js-primer](https://github.com/asciidwango/js-primer)に比べれば、結構勢いで書いてる部分も多いのでざっくりしたガイドラインです)

- [promises-book/CONTRIBUTING.md at master · azu/promises-book](https://github.com/azu/promises-book/blob/master/CONTRIBUTING.md)

他にもサンプルコードが古いままだったり、間違いもあるかもしれないので、そういうのを見つけたらIssueを立てたり、Pull Requestをだしてみてください！

## おわりに

[JavaScript Promiseの本](https://azu.github.io/promises-book/) v2の詳細な変更についてはリリースノートを参照してください。

- [Release JavaScript Promiseの本 v2 · azu/promises-book](https://github.com/azu/promises-book/releases/tag/2.0.0)
    - <https://github.com/azu/promises-book/compare/1.6.5...2.0.0>

また[@laco2net](https://twitter.com/laco2net)と一緒に書いてる[JavaScript Primer #jsprimer](https://jsprimer.net/)の方も現在書籍化に向けて最終的な調整をしている段階です。
書籍として出版されたときに通知を受け取りたい人は、Topページにある[メールフォーム](https://github.us13.list-manage.com/subscribe/post?u=fc41e11a2b9dc6f05350e0de0&id=7ab1594ae8)からメールアドレスを登録しておけばリリース時に通知されます。

- [js-primer/meetings at master · asciidwango/js-primer](https://github.com/asciidwango/js-primer/tree/master/meetings)
    - JavaScript Primerのミーティングログ
- [asciidwango/js-primer: JavaScriptの入門書 - JavaScript Primer](https://github.com/asciidwango/js-primer)
    - JavaScript Primerのリポジトリ

[JavaScript Promiseの本](https://azu.github.io/promises-book/) v2のリリースにあわせてGitHub Sponsorsの募集ページも公開してみたので、興味がある人は見てみてください。

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)
