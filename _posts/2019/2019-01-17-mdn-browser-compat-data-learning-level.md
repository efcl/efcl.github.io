---
title: "MDNに載っているAPIをどれだけ知っているかのクイズアプリを書いた"
author: azu
layout: post
date : 2019-01-17T11:11
category: JavaScript
tags:
    - JavaScript
    - MDN

---

[Do you know MDN APIs?](https://mdn-browser-compat-data-learning-level.netlify.com/)というクイズ?アプリを作りました。
次のURLから実際に試せます。

- https://mdn-browser-compat-data-learning-level.netlify.com/

[MDN Web Docs](https://developer.mozilla.org/ja/)(MDN)に掲載されているHTTP、HTML、CSS、JavaScript、MathML、SVG、WebDriver、WebExtensions、XPath、XSLTのAPIを知っているかをYES or NOでひらすら答えるだけのアプリです。

[![image](https://efcl.info/wp-content/uploads/2019/01/17-1547691324.png)](https://mdn-browser-compat-data-learning-level.netlify.com/)

知っている(YES)なら←キーを、知らない(NO)なら→キーを押していく耐久アプリです。

実際にやると数時間かかるので、真面目にやる必要がないジョークアプリみたいなものです。

## 作った経緯

このアプリは[JSer.info 400回記念イベント](http://azu.github.io/slide/2018/jserinfo/400th.html)で、ウェブやJavaScriptなどの範囲は膨大であるため「すべてのことを知っている人はいない」ということを表現するために書いたアプリです。

実際に自分でやってみても、MDN全体で知っているものは63%ぐらいで、40%弱は見たこともないようなAPIがありました。(なんども書きますが数時間かかるので、気軽にやらないほうがいいです。)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Do you know MDN APIs?<br>All:5347/8502(63%)<br>API:2876/5138(56%)<br>CSS:812/952(85%)<br>HTML:569/595(96%)<br>HTTP:175/178(98%)<br>JavaScript:804/807(100%)<br>MathML:34/176(19%)<br>SVG:33/595(6%)<br>WebDriver:38/54(70%)<br>WebExtensions:1/1(100%)<br>XPath:1/1(100%)XSLT:4/5(80%) <a href="https://t.co/Sy42ktLI1s">https://t.co/Sy42ktLI1s</a> <a href="https://t.co/w1bxmp4Nz8">pic.twitter.com/w1bxmp4Nz8</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1042050822425792513?ref_src=twsrc%5Etfw">September 18, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

このアプリは[nuxt.js](https://github.com/nuxt/nuxt.js)で書かれていて、MDNのデータは[mdn-browser-compat-data](https://github.com/mdn/browser-compat-data)という公式のnpmモジュールから取得しています。

[mdn-browser-compat-data](https://github.com/mdn/browser-compat-data)にはMDNに掲載されているブラウザの互換Tableのデータが入ってるので遊んでみると面白いかもしれません。

- [MDN browser compatibility data: Taking the guesswork out of web compatibility - Mozilla Hacks - the Web developer blog](https://hacks.mozilla.org/2018/02/mdn-browser-compatibility-data/)

Nuxt.jsでこのデータを含めたページとしてgenerateして作成しています。(静的サイトみたいな感じ)

- サイト: [Do you know MDN APIs?](https://mdn-browser-compat-data-learning-level.netlify.com/)
- リポジトリ: [azu/mdn-browser-compat-data-learning-level: Test your learning level by MDN APIs](https://github.com/azu/mdn-browser-compat-data-learning-level)