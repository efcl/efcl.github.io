---
title: JavaScriptのいろいろなコーディングルールをまとめてみた
author: azu
layout: post
permalink: /2011/0527/res2764/
dsq_thread_id:
  - 315276540
categories:
  - javascript
tags:
  - javascript
  - まとめ
---
JavaScriptの書き方はJavaScript自体がある程度自由なためいろいろな書き方ができますが、一貫性を持って書いた方がバグなども発生しにくくなるため、コーディングルールを定めておくのはよいことだと思います(特に複数人の開発の場合)

有名な企業やライブラリはコーディングルールも公開している事が多いので適当にまとめてみました

### [JavaScript style guide &#8211; MDC Docs][1]

Mozilla/Firefox向けのものなので、一部ECMAScriptの範囲を超えたものも含まれています。   
多くの人が見ていると思うので、見たことない人は一度読んでみるといいです。

[jscs][]にこのコーディングルールをチェックするプリセットが用意されています。

### [Google JavaScript Style Guide][2]

[Google JavaScript Style Guide 和訳 — Google JavaScript Style Guide 和訳][3](日本語版)   
Googleのコーディングルールですが、ルールを並べるだけではなくなぜ悪いのかについても触れているので、一読をお勧めします。   
[Closure Linter][4]というチェックツールもあるため、採用しやすいかもしれない。

[jscs][]にこのコーディングルールをチェックするプリセットが用意されています。

### [JQuery Core Style Guidelines &#8211; jQuery JavaScript Library][5]

jQuery Coreのコーディングルール。   
Typeチェックの仕方についても触れている。

[jscs][]にこのコーディングルールをチェックするプリセットが用意されています。

### [airbnb/javascript](https://github.com/airbnb/javascript "airbnb/javascript")

[mitsuruog/javacript-style-guide](https://github.com/mitsuruog/javacript-style-guide "mitsuruog/javacript-style-guide") (日本語訳)

[Airbnb](https://www.airbnb.jp/ "Airbnb")によるコーディングルール。
ブラウザのバグや誤解しにくい書き方、なぜそのような書き方するのかについて書かれています。
またパフォーマンスについての注記も多く含まれているため、一読をお勧めします。

[jscs][]にこのコーディングルールをチェックするプリセットが用意されています。

### [Felix&#8217;s Node.js Style Guide][7]

[Felix&#8217;s Node.js Style Guide(和訳)][8](日本語版)   
Node.jsにおけるコーディングルール。(公式なものではない。no official document)   
Node.jsに限らず、クライアントサイドJavaScriptに置いても参考になる部分は多い。

### [Code Conventions for the JavaScript Programming Language][9]

Douglas Crockfordによるもの。   
コーディングルールというよりは慣習的なもの。   
同作者による[JSLint][10]も併用しましょう。([JSLint][10] or [JSHint][11]は他のコーディングルールであっても採用してよいもの)

### [Code Guidelines for Rich Internet Application Development][12]

コーディングルールではなくてガイドライン的なものです、HTMLやCSS、JavaScriptについてのガイドラインを書かれている。

### [Introduction to Apple JavaScript Coding Guidelines][13]

[JavaScript Coding Guidelines for Mac OS X][14](日本語版)   
Appleによるコーディングのガイドライン。   
&#8220;JavaScriptのベストプラクティス&#8221;でコーディングで気をつける事について触れている。

### [The WebKit Open Source Project &#8211; WebKit Coding Style Guidelines][15]

JavaScriptではありませんが、Webkitにおけるコーディングルール。   
ホワイトスペースやLine breakingの所はJavaScriptの場合でも参考になる。   
uupaaさんがこれをベースに一部分を変更した感じで使ってるそうです。

*   [CodingStyle &#8211; uupaa-js &#8211; JavaScript Coding Style Guide &#8211; JavaScript Library for Casual Creator &#8211; Google Project Hosting][16]

### [サイボウズで学んだこと &#8211; IT戦記][17]

amachangによるもの。   
大規模 JavaScript 開発におけるルールや命名規則、デバッグ、パフォーマンスについて触れています。   
コーディングルールを整えてどのように実践したかについて参考になります。

### [JavaScriptパターン][18] (オライリー本)

<div class="azlink-box" style="margin-bottom: 0px;">
  <div class="azlink-image" style="float: left;">
    <a name="azlinklink" href="http://www.amazon.co.jp/exec/obidos/ASIN/4873114888/book042-22/ref=nosim/" target="_blank"></a><img style="border-style: none;" src="http://ecx.images-amazon.com/images/I/51ZoMJ%2BrLhL._SL160_.jpg" alt="JavaScriptパターン ―優れたアプリケーションのための作法" />
  </div>
  
  <div class="azlink-info" style="line-height: 120%; float: left; margin-left: 15px;">
    <div class="azlink-name" style="line-height: 120%; margin-bottom: 10px;">
      <a name="azlinklink" href="http://www.amazon.co.jp/exec/obidos/ASIN/4873114888/book042-22/ref=nosim/" target="_blank"></a>JavaScriptパターン ―優れたアプリケーションのための作法</p> <div class="azlink-powered-date" style="line-height: 120%; margin-top: 5px; font-family: verdana; font-size: 7pt;">
        posted with <a href="http://sakuratan.biz/azlink/dp/JavaScript%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%20%E2%80%95%E5%84%AA%E3%82%8C%E3%81%9F%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E4%BD%9C%E6%B3%95/4873114888/book042-22" target="_blank">AZlink</a> at 2011.5.27
      </div>
    </div>
    
    <div class="azlink-detail">
      Stoyan Stefanov,豊福 剛 <br />オライリージャパン <br />売り上げランキング: 8213
    </div>
    
    <div class="azlink-link" style="margin-top: 5px;">
      <a href="http://www.amazon.co.jp/exec/obidos/ASIN/4873114888/book042-22/ref=nosim/" target="_blank">Amazon.co.jp で詳細を見る</a>
    </div>
  </div>
</div>

この書籍の[Chapter 2. Essentials][19]において、JavaScriptのコーディングルールが紹介されています。   
また避けるべき事やどう書くべきなのかについてもかなり深く書かれています。

コーディングルールは&#8221;どう書けばいいのか分からない&#8221;という人向けのものではないと思います。どう書いたらいいのか分からない人は、まずなぜそのように書いたらダメなのかを知るのがよいと思います。   
そのため、書き方に不安を持ってる人はなぜダメなのかについても触れている[Google JavaScript Style Guide 和訳][3]を読むのがよいと思います。(読みやすい日本語版もあるしね)   
コーディングルールはコードに一貫性を持つためにあると思います。頻繁にルールを変える必要はないと思いますが、必ずしもそのルールが、その時の(実行環境|JavaScript)において最適な書き方ではない場合もあります。そういうときはルールの更新をしましょう。

### おまけ

自分の場合は[WebStorm][20]の[自動整形][21]に任せている(といっても膨大なルール設定があるため、上記で紹介したコーディングルールを自動化できる)ので、基本的にはIDE任せという書き方にしています。   
セミコロン忘れなどについてはcomplete current statement機能([ [WebStorm]Complete Current Statementがとても便利な件(・∀・)][22])を使ったり、[WebStorm][20]のシンタックスチェックはかなり優秀なのでエラーも書いてる途中で発見しやすいです。   
そのため、基本は道具任せといった感じではありますが、WebStormを使用していない場合も同じコードが書けるようにある程度のルールは持っています。   
[Google JavaScript Style Guide][2] + [WebKit Coding Style Guidelines][15] に近いですが、ホワイトスペースなど見た目的なちょっとした違いにはそこまで厳しくしない感じで書いています。   
if, for, while, doなどの{}は省略しない([WebStormの自動整形で中括弧を強制的につける][23])、誰が見てもある程度読める感じにする、ブレークポイントを打ちやすい空間を作るように配慮するなどなどで、他のコーディングルールに書いてある事と同じようなものだと思います。

 [1]: https://developer.mozilla.org/ja/JavaScript_style_guide
 [2]: http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 [3]: http://cou929.nu/data/google_javascript_style_guide/
 [4]: http://code.google.com/intl/ja/closure/utilities/docs/linter_howto.html
 [5]: http://docs.jquery.com/JQuery_Core_Style_Guidelines
 [6]: http://dojotoolkit.org/community/styleGuide
 [7]: http://nodeguide.com/style.html
 [8]: http://popkirby.github.com/contents/nodeguide/style.html
 [9]: http://javascript.crockford.com/code.html
 [10]: http://www.jslint.com/
 [11]: http://www.jshint.com/
 [12]: http://jibbering.com/faq/notes/code-guidelines/
 [13]: https://developer.apple.com/library/mac/#documentation/ScriptingAutomation/Conceptual/JSCodingGuide/Introduction/Introduction.html
 [14]: http://developer.apple.com/jp/documentation/ScriptingAutomation/Conceptual/JSCodingGuide/
 [15]: http://www.webkit.org/coding/coding-style.html
 [16]: http://code.google.com/p/uupaa-js/wiki/CodingStyle
 [17]: http://d.hatena.ne.jp/amachang/20100917/1284700700
 [18]: http://www.amazon.co.jp/exec/obidos/ASIN/4873114888/book042-22/ref=nosim/
 [19]: http://efcl.info/adiary/JavaScriptPatterns/Chapter2Essentials
 [20]: http://www.jetbrains.com/webstorm/
 [21]: http://efcl.info/2010/1027/res2023/
 [22]: http://blog.livedoor.jp/okashi1/archives/51751259.html
 [23]: http://www.memetodo.co.cc/2011/05/webstorm_29.html
 [jscs]: https://github.com/jscs-dev/node-jscs#preset  "jscs-dev/node-jscs"
