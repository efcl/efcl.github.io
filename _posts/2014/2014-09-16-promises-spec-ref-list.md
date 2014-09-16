---
title: "JavaScript Promiseを使うウェブの仕様を調べてみた"
author: azu
layout: post
date : 2014-09-16T07:46
category: JavaScript
tags:
    - Promise
    - JavaScript
    - Spec

---

## Promiseの仕様?

JavaScriptにおけるPromiseの仕様といえば、次期ECMAScriptの[ECMAScript Language Specification ECMA-262 6th Edition – DRAFT](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects "ECMAScript Language Specification ECMA-262 6th Edition – DRAFT")で策定されています。

このES6 Promisesについて詳しくは[JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本")という無料の電子書籍で書いたのでこちらを参照して下さい。

以前、Promiseについて紹介した時に以下のように書いてました。

> また、今後ブラウザに実装されるAPIとしてService WorkersやStreams API等、Promiseをベースしたものも出てきています。 -- [JavaScript Promiseの本を書きました | Web Scratch](http://efcl.info/2014/0623/res3943/ "JavaScript Promiseの本を書きました | Web Scratch")

実際にどれくらいの仕様がPromiseを参照してるかを調べてみました。

## Promiseを参照する仕様

以下のリポジトリにまとめてあります。(今後更新するかもしれないので、最新はリポジトリの方を参照)

- [azu/reference-promises-spec](https://github.com/azu/reference-promises-spec "azu/reference-promises-spec")

実際に見ていくと以下のような仕様がPromiseを参照しています。

＊ 時期によってDOM PromiseとES6 Promiseが混ざっています(今回は両方の一覧を出しています)

---

### Fetch Standard
http://fetch.spec.whatwg.org/

### Navigator interface in HTML5
http://www.w3.org/html/wg/drafts/html/master/webappapis.html#navigator

### Web API Design Cookbook
http://www.w3.org/TR/api-design/

### Manifest for web apps and bookmarks
http://www.w3.org/TR/appmanifest/

### Battery Status API
http://www.w3.org/TR/battery-status/

### CSS Font Loading Module Level 3
http://www.w3.org/TR/css-font-loading-3/

### CSV on the Web: Use Cases and Requirements
http://www.w3.org/TR/csvw-ucr/

### Network Service Discovery
http://www.w3.org/TR/discovery-api/

### Encrypted Media Extensions
http://www.w3.org/TR/encrypted-media/

### JSON-LD 1.0 Processing Algorithms and API
http://www.w3.org/TR/json-ld-api/

### Web NFC API
http://www.w3.org/TR/nfc/

### Push API
http://www.w3.org/TR/push-api/

### Quota Management API
http://www.w3.org/TR/quota-api/

### Service Workers
http://www.w3.org/TR/service-workers/

### Streams API
http://www.w3.org/TR/streams-api/

### Web Telephony API
http://www.w3.org/TR/telephony/

### WebCrypto Key Discovery
http://www.w3.org/TR/webcrypto-key-discovery/

### Web Cryptography API
http://www.w3.org/TR/WebCryptoAPI/

### Web MIDI API
http://www.w3.org/TR/webmidi/

### HTML
http://www.whatwg.org/specs/web-apps/current-work/

----
上記の仕様で策定されてるAPIの多くは非同期処理でpromiseオブジェクトを返すようになっています。

例えば、[CSS Font Loading Module Level 3](http://www.w3.org/TR/css-font-loading-3/ "CSS Font Loading Module Level 3")では以下のようにフォントのロードが完了した時の処理をPromiseで書けるようになっています。

```js
var f = new FontFace(
  "Lobster",
  "url(http://fonts.gstatic.com/s/lobster/v9/NIaFDq6p6eLpSvtV2DTNDQLUuEpTyoUstqEm5AMlJo4.woff)",
  {}
 );

f.load().then(function (loadedFace) {
  document.fonts.add(loadedFace);
  document.querySelector(".lorem").style.fontFamily = "Lobster, serif";
});
```

via [CSS Font Loading Module Level 3を試してみた - console.blog(self);](http://sadah.hatenablog.com/entry/2014/06/30/211944 "CSS Font Loading Module Level 3を試してみた - console.blog(self);")

このように、現状でも結構の仕様がPromiseを使っています。
そのため、今後出てくるAPIを使う際には若干Promiseの基本的な知識は必要になってくると思います。

- [JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本")

## どうやって調べたか

[ウェブの仕様は今どこにあるのか？ | Web Scratch](http://efcl.info/2014/09/02/webspec-here/ "ウェブの仕様は今どこにあるのか？ | Web Scratch")という記事でも、色々書いたましたが、仕様のURLを調べるには[tobie/specref](https://github.com/tobie/specref "tobie/specref")を使うのが簡単です。

JSONで仕様の一覧(W3C,WHATWG,IETFは大体あるはず)を取得できるので、これを使って仕様をまとめてダウンロードする[azu/webspec-downloader](https://github.com/azu/webspec-downloader "azu/webspec-downloader")というものを書いてダウンロードしまして調べました。

ダウンロードしたhtml等をgrepして目視でまとめました。[azu/reference-promises-spec](https://github.com/azu/reference-promises-spec "azu/reference-promises-spec")にもう少し詳しく書いてあります)