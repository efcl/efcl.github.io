---
title: "jsprimerのES2022対応中、コントリビュート歓迎です"
author: azu
layout: post
date : 2022-02-06T14:47
category: JavaScript
tags:
    - JavaScript
    - Book

---

ECMAScriptは、毎年6月ごろに新しいバージョンがスナップショットとしてリリースされます。
次のバージョンであるECMAScript 2022は6月に公開される予定です。

ECMAScriptの策定プロセスについては、[JavaScript Primer - 迷わないための入門書](https://jsprimer.net/)(jsprimer)でも解説しています。

- [ECMAScript · JavaScript Primer #jsprimer](https://jsprimer.net/basic/ecmascript/)

毎年これに合わせる形で、jsprimerのECMAScript 2022の対応作業をやっています。

- リポジトリ: [asciidwango/js-primer: JavaScript Primer - 迷わないための入門書](https://github.com/asciidwango/js-primer)

jsprimerはJavaScriptの入門書ですが、毎年のECMAScriptのアップデートに合わせて更新しています。

- [JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)

この記事は、ES2022対応の作業メモとオープンソースな書籍に対するContributorの募集記事です。

## ES2022の対応予定

jsprimerでES2022の対応予定については、次のMeta Issueで管理しています。

- [ECMAScript 2022対応 · Issue #1337 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1337)

ES2022は、ES2017のAsync functions (async/await) 以来の大きな構文の変更が入った感じがします。

具体的には、次のProposalがES2022で入る予定です。

- Class
  - [tc39/proposal-private-methods: Private methods and getter/setters for ES6 classes](https://github.com/tc39/proposal-private-methods)
  -  [tc39/proposal-class-fields: Orthogonally-informed combination of public and private fields proposals](https://github.com/tc39/proposal-class-fields)
  -  [tc39/proposal-static-class-features: The static parts of new class features, in a separate proposal](https://github.com/tc39/proposal-static-class-features)
  - [Ergonomic brand checks for Private Fields](https://github.com/tc39/proposal-private-fields-in-in)
  - [class static initialization blocks](https://github.com/tc39/proposal-class-static-block)
- [Top-level `await` proposal](https://github.com/tc39/proposal-top-level-await)
- [Object.hasOwn](https://github.com/tc39/proposal-accessible-object-hasownproperty)
- [.at()](https://github.com/tc39/proposal-relative-indexing-method)
- [Error Cause](https://github.com/tc39/proposal-error-cause)
- [RegExp Match Indices](https://github.com/tc39/proposal-regexp-match-indices)

`class`にPrivate/Public Feildsが入ったり、Top-level `await`などが入ります。

jsprimerは[リファレンスを目指すことは目的ではないため](https://jsprimer.net/intro/#do-not)、全てのProposalに対応する訳ではないですが、ES2022に関連するIssueとして次の対応をする予定です。

- [ES2022: Class Fields · Issue #1364 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1364)
- [ES2022: Top-level await proposal · Issue #1365 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1365)
- [ES2022: Object.hasOwn · Issue #1366 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1366)
- [ES2022: StringとArrayの `.at()` · Issue #1367 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1367)

jsprimerは、主に文章のプロジェクトですが、[Contribution Guide](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md)やテストもちゃんと用意してあるので、比較的誰でもContributeしやすようにはなっていると思います。

- [js-primer/CONTRIBUTING.md at master · asciidwango/js-primer](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md)

基本的な[進め方](https://github.com/asciidwango/js-primer/issues/1337#issuecomment-1003675326)については、次のコメントでも書いています。
大体調査から始まるので、各Issueにこの書籍/文章の解説がわかりやすかったとかそういうコメントも歓迎しています。

[![基本的な進め方](https://efcl.info/wp-content/uploads/2022/02/06-1644128357.png)](https://github.com/asciidwango/js-primer/issues/1337#issuecomment-1003675326)

> <https://github.com/asciidwango/js-primer/issues/1337#issuecomment-1003675326>

もし、「このProposalの対応を書いてみたい」という人がいたら、上記のIssueにコメントください。(もちろんレビューします)
[ES2022: StringとArrayの `.at()`](https://github.com/asciidwango/js-primer/issues/1367)は追加するだけなので比較的書きやすい部類かなと思います。(セクションの追加になるので[CLA](https://github.com/asciidwango/js-primer/blob/master/CLA.md)への同意が必要になります)

また、ES2022の対応をリアルタイムにレビューしたいという人がいたら、[このコメント](https://github.com/asciidwango/js-primer/issues/1337#issuecomment-1003675326)にリアクションしてください。
Pull Requestを出すときに、mentionします。

また、直接ES2022の変更とは直接関係はないですが、次のようなIssueもあります。

- [Node.js ESMの対応 · Issue #1355 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1355)
- [ES2022: prototypeを表すのに # を使うべきかどうか · Issue #1368 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1368)

Node.jsのNative ESM対応はどうするか(まだデファクトがない)は結構迷いどころなので、意見がある人はIssueにコメントしてください。

後者のIssueは、`Array#includes`のように`#`をprototypeの短縮記号として使うと、ES2022で導入されるPrivate Fieldsを表す[#](https://github.com/tc39/proposal-class-fields/blob/main/PRIVATE_SYNTAX_FAQ.md)構文と衝突してしまう問題です。
既にjsprimerでは、[prototypeを表すのに # を使わないように](https://github.com/asciidwango/js-primer/pull/1382)したので、この漏れがないかのチェックなども募集しています。

以上、[JavaScript Primer](https://jsprimer.net/)(jsprimer)の進捗記事でした

- [asciidwango/js-primer: JavaScript Primer - 迷わないための入門書](https://github.com/asciidwango/js-primer)