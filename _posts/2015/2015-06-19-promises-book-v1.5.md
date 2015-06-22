---
title: "ES6がリリースされたのでPromiseについて学びましょう"
author: azu
layout: post
date : 2015-06-23T09:01
category: JavaScript
tags:
    - JavaScript
    - Promise
    - book
    - 電子書籍

---

去年の6月23日に[JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本") Ver 1.0をリリースしてから今日でちょうど一年になります。

- [JavaScript Promiseの本を書きました | Web Scratch](http://efcl.info/2014/0623/res3943/ "JavaScript Promiseの本を書きました | Web Scratch")

そして、ECMAScript 2015(aka. ES6)も2015年6月18日正式版がリリースされました。

- [ECMAScript 2015 is now an Ecma Standard](https://esdiscuss.org/topic/ecmascript-2015-is-now-an-ecma-standard "ECMAScript 2015 is now an Ecma Standard")

これに合わせてES6の正式版に対応した[Promise本 Ver1.5](https://github.com/azu/promises-book/releases/tag/1.5.0)をリリースしました。
1.4までの変更点は以下を参照してください。

- [JavaScript Promiseの本Ver1.2とAsciidoctor | Web Scratch](http://efcl.info/2014/08/19/promises-book-1.2.0/ "JavaScript Promiseの本Ver1.2とAsciidoctor | Web Scratch")
- [Promise本 Ver1.4リリース | Web Scratch](http://efcl.info/2015/01/26/promises-book1.4/ "Promise本 Ver1.4リリース | Web Scratch")

またリリースノート自体は以下にまとまっています。

- [Releases · azu/promises-book](https://github.com/azu/promises-book/releases "Releases · azu/promises-book")

## Ver 1.4 - 1.5の変更点

環境的な変更が多いので、文章的には大きく変わってないです。

- [Promise本 ver 1.5のリリースノート](https://github.com/azu/promises-book/releases/tag/1.5.0)

### 中国語、韓国語版をリリース

詳細は以下に書いてありますが、[JavaScript Promise迷你书（中文版）](http://liubin.github.io/promises-book/ "JavaScript Promise迷你书（中文版）")と[[한빛미디어 eBook] JavaScript Promise](http://www.hanbit.co.kr/ebook/look.html?isbn=9788968487293 "[한빛미디어 eBook] JavaScript Promise - eBook &amp; DRM-free")がそれぞれリリースされました。

[![book cover](http://efcl.info/wp-content/uploads/2015/01/b_9788968487293-ko.png)](http://www.hanbit.co.kr/ebook/look.html?isbn=9788968487293)

猫

- [Promise本が中国語と韓国語に翻訳されました | Web Scratch](http://efcl.info/2015/01/31/promise-book-translation/ "Promise本が中国語と韓国語に翻訳されました | Web Scratch")

### iOSやAndroidでもエディタが一応操作可能になった

![codemirror2015-02-23 22_30_56](https://cloud.githubusercontent.com/assets/19714/6328605/79650e4c-bbac-11e4-87aa-3fcac71808b2.gif)

### PDFのフォントを変更

![pdf](http://monosnap.com/image/D9EfzSDI3GQkZw2GeoLOFxfi7pPhp8.png)

### ECMAScript 6正式版に対応

- ECMAScript 6の策定完了後の変更点 [#232](https://github.com/azu/promises-book/issues/232)

具体的な変更点は直接Diffを見たほうが把握しやすいと思いますが、仕様書へのリンクや策定中であった表記、対応ブラウザに関する記述などを変更しています。

- [refactor: es6-status by azu · Pull Request #234 · azu/promises-book](https://github.com/azu/promises-book/pull/234 "refactor: es6-status by azu · Pull Request #234 · azu/promises-book")

### Chapter 3

-  `assert.deepEqual` の使い方が間違っているのを修正 [#218](https://github.com/azu/promises-book/pull/218 "Ch3: assert.deepEqualの使い方が間違っている by azu · Pull Request #218 · azu/promises-book")

### Chapter 4

- Notification APIの判定方法を変更 [#236](https://github.com/azu/promises-book/issues/236)
	- サンプルコードをNotification APIが使えるかどうかの部分を変更してます。

-----

ver1.4-1.5までは翻訳版のリリースやECMAScript 6正式版への対応などが中心なので、文章の構成自体は変化ないと思います。

[ECMAScript 2015](http://www.ecma-international.org/publications/standards/Ecma-262.htm "ECMAScript 2015")も正式に出たことなので、Promiseについてまだ知らない人は[JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本")を読んでみるといいかもしれません。

また、Oreillyの方からPromiseについて扱う[JavaScript with Promises - O&#39;Reilly Media](http://shop.oreilly.com/product/0636920032151.do "JavaScript with Promises - O&#39;Reilly Media")という書籍が出るようです。(最初は2014年5月22日発売とかでこれに合わせてPromise出す目標にしていましたが、実際に出たのは一年後…)

＞ Chapter 6 Combining ECMAScript 6 Features with Promises

こちらの書籍はPromise本ではまだ使ってないES6の機能同士を使った(例えばGeneratorとPromise)話などがあるようです。

## 今後

> こういう形態で書籍を公開したのは、常に書籍が更新出来るようにしたいからでもあります。
-- [JavaScript Promiseの本を書きました | Web Scratch](http://efcl.info/2014/0623/res3943/ "JavaScript Promiseの本を書きました | Web Scratch")

とあるように、公開から1年ぐらい経ちますが今もちょこちょこ更新されています。(だいたい200コミットぐらい)

- [Comparing 1.0.0...1.5.0 · azu/promises-book](https://github.com/azu/promises-book/compare/1.0.0...1.5.0 "Comparing 1.0.0...1.5.0 · azu/promises-book")

Promise APIはウェブ標準の色々なAPIで使われていて、今後も増えていくと思います。

- [JavaScript Promiseを使うウェブの仕様を調べてみた | Web Scratch](http://efcl.info/2014/09/16/promises-spec-ref-list/ "JavaScript Promiseを使うウェブの仕様を調べてみた | Web Scratch")

Promise本はそのAPIの組み合わせ方というよりも、Promise自体はどういう特性のものだっけ?という話を中心に書いています。

今回、ES6がEcma標準(Ecmaという標準化団体による承認されたデファクト標準)となりましたが、
ECMAScriptは[ISO/IEC 16262](http://www.iso.org/iso/iso_catalogue/catalogue_tc/catalogue_detail.htm?csnumber=55755 "ISO/IEC 16262")としても標準化（デジュール標準)されています。

最近、ES6のISO/IEC JTC 1での審議を手伝ってるのもあって、ES6の仕様の方を読んでいます。

- [Devsumi2010 Ecmascript5 (ISO/IEC JTC1/SC22)](http://www.slideshare.net/takesako/devsumi2010-ecmascript5-isoiec-jtc1sc22 "Devsumi2010 Ecmascript5 (ISO/IEC JTC1/SC22)")
- [OSSコミュニティの“中の人”（4）：できないことは全部やる。できる依頼は断る――竹迫氏竹迫良範氏インタビュー【後編】 (1/2) - ＠IT](http://www.atmarkit.co.jp/ait/articles/1210/23/news153.html "OSSコミュニティの“中の人”（4）：できないことは全部やる。できる依頼は断る――竹迫氏竹迫良範氏インタビュー【後編】 (1/2) - ＠IT")

その過程で何か見つけたらPromise本の方へと反映や、まだ[Issues](https://github.com/azu/promises-book/issues "Issues · azu/promises-book")があるのでそれをやっていったり、[Cancelable Promise](https://github.com/whatwg/fetch/issues/27)の話が未だに終結してないのでその辺の見ていく感じだったり、[unhandled rejectionへの対応](http://azu.github.io/slide/error-handling/promise-error-handling.html "unhandled rejectionへの対応")への話を追加していくかもしれません。

という感じです。

とりあえず、ECMAScript 2015(aka. ES6)のEcma標準化おめでとうございます。


<script type="text/javascript" src="https://gumroad.com/js/gumroad-embed.js"></script>
<div class="gumroad-product-embed" data-gumroad-product-id="SHqg" data-outbound-embed="true"><a href="https://gumroad.com/l/SHqg">Promise本のおまけ付録</a></div>