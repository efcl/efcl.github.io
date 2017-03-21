---
title: "3行でECMAScript仕様書アプリを作る"
author: azu
layout: post
date : 2017-03-21T09:45
category: JavaScript
tags:
    - Electron
    - JavaScript
    - ECMAScript

---

[ECMAScript® 2017 Language Specification](https://tc39.github.io/ecma262/ "ECMAScript® 2017 Language Specification")をアプリとして開けるWebViewアプリです。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ECMAScript仕様書アプリ<a href="https://t.co/twhhFqPca8">https://t.co/twhhFqPca8</a> <a href="https://t.co/bs2onkxNDo">pic.twitter.com/bs2onkxNDo</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/834914935331155968">February 23, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Electron製なのでどのプラットフォームでも動くと思います。

## 作り方

- [nativefier](https://github.com/jiahaog/nativefier "nativefier")を入れます。
- サイト内検索をする[in-site-search-javascript](https://github.com/azu/in-site-search-javascript "in-site-search-javascript")を入れます。
- ビルドします。

```
npm i -g nativefier
curl https://azu.github.io/in-site-search-javascript/index.js > index.js
nativefier --name "ECMAScript" "https://tc39.github.io/ecma262/" --fast-quit --hide-window-frame --show-menu-bar --maximize --inject ./index.js
```
完成です。

## 使い方

アプリを開いたら仕様書が読めます。

Cmd+Fとかでサイト内検索ができます(重たいです)

以上。
