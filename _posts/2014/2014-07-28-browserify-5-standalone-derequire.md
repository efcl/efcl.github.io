---
author: azu
layout: post
title: "Browserify 5.0から--standaloneでdeqrequireはされなくなった"
categories: 
  - JavaScript
tags: 
  - JavaScript
  - Browserify
  - AMD
  - require
---

Browserify [5.0.0](https://github.com/substack/node-browserify/blob/master/changelog.markdown#500 "5.0.0")では、
基盤となる変換の部分で色々変更がありました。(特にtransform周りが大きく変わって変換にhookする処理が色々できるようになった)

* [node-browserify/doc/changelog/5_0.markdown at master · substack/node-browserify](https://github.com/substack/node-browserify/blob/master/doc/changelog/5_0.markdown "node-browserify/doc/changelog/5_0.markdown at master · substack/node-browserify")


ChangeLogの一番下にちょこっと書いてありますが、`--standalone`を付けて単体のライブラリとして配布向けにビルドするときに、
derequireがされなくなりました。

> derequire has been taken out of core, which should speed up --standalone.

そもそも[derequire](https://github.com/calvinmetcalf/derequire "derequire")とは何かというと、
requireという関数を使うライブラリ等との衝突を避けるためにリネーム処理をするモジュールのことです。

## v4とv5のstandaloneオプションの違い

例として[azu/get-html-title](https://github.com/azu/get-html-title "azu/get-html-title")を
standaloneなライブラリとしてビルドしたいと思います。

browserify v4以下の場合の場合は以下のように`getHTMLTitle`という関数を使える形にした
ライブラリとしてビルドすると以下のようになります。

```sh
# browserify v4以下の場合
browserify -s getHTMLTitle index.js
```

``` javascript
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.getHTMLTitle=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
module.exports = _dereq_("./lib/get-title-html");
},{"./lib/get-title-html":2}],2:[function(_dereq_,module,exports){
"use strict";
var titleRegExp = /<title[^>]*>([^<]+)<\/title>/i;
function getHTMLTitle(content) {
    if (content == null) {
        return undefined;
    }
    var match = content.match(titleRegExp);
    return match && match[1];
}
module.exports = getHTMLTitle;
},{}]},{},[1])
(1)
});
```

以下の部分を見ると、`require`ではなくderequireされて無害な文字列に置換されていることが分かります。
(require.jsなどは`require`を単純に見るのでそのままだと衝突してしまうのを回避するため?)

``` javascript
module.exports = _dereq_("./lib/get-title-html");
```

これが、browserify v5からは以下のような出力になります。

``` javascript
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.getHTMLTitle=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

"use strict";
module.exports = require("./lib/get-title-html");
},{"./lib/get-title-html":2}],2:[function(require,module,exports){

"use strict";
var titleRegExp = /<title[^>]*>([^<]+)<\/title>/i;
function getHTMLTitle(content) {
    if (content == null) {
        return undefined;
    }
    var match = content.match(titleRegExp);
    return match && match[1];
}
module.exports = getHTMLTitle;
},{}]},{},[1])(1)
});
```

`require`がそのまま残っていることがわかると思います。

### なぜderequireしていたのか

`require` という関数を持つライブラリなどと衝突するのを回避するため(require.jsとか?)

### なぜderequireしなくなったか

遅い。

ビルドしたものをASTにパースして置換するので、`-s`つけるだけで10倍ぐらい遅くなってた。

* [Standalone option makes browserify 10x slower · Issue #633 · substack/node-browserify](https://github.com/substack/node-browserify/issues/633 "Standalone option makes browserify 10x slower · Issue #633 · substack/node-browserify")

### これからもderequireしたい

* [substack/node-browserify](https://github.com/substack/node-browserify "substack/node-browserify")

に書いてあるように、別途[derequire](https://github.com/calvinmetcalf/derequire "derequire")をいれて、
ビルドしたものに対してderequireをかける

``` sh
$ npm install -g derequire
$ browserify main.js --standalone Foo | derequire > bundle.js
```

gulp等でやる場合は以下のようなpluginを使用すればいいと思います。

* [twada/gulp-derequire](https://github.com/twada/gulp-derequire "twada/gulp-derequire")