---
title: JavaScriptご飯を食べてきました
author: azu
layout: post
permalink: /2013/1011/res3455/
dsq_thread_id:
  - 1846148129
categories:
  - javascript
  - イベント
tags:
  - javascript
  - イベント
---
<p>JavaScriptご飯を食べてきました。</p>
<blockquote class="twitter-tweet"><p>美味しいお米が食べたい</p>
<p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/statuses/388233056403738624">October 10, 2013</a></p></blockquote>
<p><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>
<h2>前菜</h2>
<p><a href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" title="Array.prototype.reduce">Array.prototype.reduce</a> について発表しました。</p>
<p><script src="http://glide.so/azu/6919649.js"></script></p>
<p><a href="http://glide.so/azu/6919649" title="azu / Array.prototype.reduce Dance - Glide">azu / Array.prototype.reduce Dance &#8211; Glide</a></p>
<p>サンプルコードとテストは<a href="https://github.com/azu/ReduceDance" title="azu/ReduceDance">azu/ReduceDance</a>にあります。</p>
<ul>
<li>reduce 単体だとイマイチ良さがわからない</li>
<li>他の関数と組み合わせるようになると生きてくる</li>
<li><a href="http://www.functionaljavascript.com/" title="Functional JavaScript">Functional JavaScript</a> のようなアプローチを見ていくと色々利用した例が見られる</li>
<li><a href="https://speakerdeck.com/1000ch/functional-javascript-with-lo-dash-dot-js" title="Functional JavaScript with Lo-Dash.js // Speaker Deck">Functional JavaScript with Lo-Dash.js // Speaker Deck</a></li>
<li><a href="http://cjohansen.no/talks/2012/sdc-functional/#1" title="Pure, functional JavaScript">Pure, functional JavaScript</a></li>
<li><a href="https://speakerdeck.com/yaakaito/typescript" title="Functional JavaScript/TypeScript // Speaker Deck">Functional JavaScript/TypeScript // Speaker Deck</a></li>
</ul>
<h2>メイン</h2>
<p><a href="http://www.dashichazuke-en.com/index.php"><img src="http://byo.co.jp/news/wp-content/uploads/2013/10/cha_131003.jpg" alt="梅だし茶漬け" /></a></p>
<ul>
<li>Backboneで値を更新するたび全体を描画しなおさないといけないのでパフォーマンスが良くない
<ul>
<li><a href="http://ianstormtaylor.com/break-apart-your-backbonejs-render-methods/" title="Break Apart Your Backbone.js Render Methods by Ian Storm Taylor">Break Apart Your Backbone.js Render Methods by Ian Storm Taylor</a></li>
<li><a href="https://github.com/Rich-Harris/Ractive/wiki/Array-modification#performance-and-ui-benefits" title="Array modification · Rich-Harris/Ractive Wiki">Array modification · Rich-Harris/Ractive Wiki</a></li>
<li>DOMの変更を最小限にするアプローチの話</li>
<li>AngularJSも似たような仕組みがあるがブラックボックスなので触りにくい</li>
<li><a href="http://jinjor-labo.hatenablog.com/entry/2013/06/19/062931" title="Angular.jsとBackbone.jsのDOM依存を図解する - ジンジャー研究室">Angular.jsとBackbone.jsのDOM依存を図解する &#8211; ジンジャー研究室</a></li>
</ul>
</li>
<li>DOM Lv0 と ECMAScriptについて</li>
<li>クライアントサイドで起きたエラーを収集するべきなのかについての話
<ul>
<li>window.onerror でキャッチできる</li>
<li>ほんとにすべてのエラーがonerrorまで来るのか疑問</li>
<li>onerrorを使ったtry…catchの代わりの実装について
<ul>
<li><a href="http://flippinawesome.org/2013/09/30/rethinking-javascripts-trycatch/" title="Rethinking JavaScript’s Try/Catch | Flippin&#39; Awesome">Rethinking JavaScript’s Try/Catch | Flippin&#39; Awesome</a></li>
<li>ホントに上手く回るのか検討の余地がある</li>
</ul>
</li>
<li>Google Analyticsに送る方法</li>
<li><a href="http://jsdo.it/kyo_ago/dQoR" title="JSのエラーをGoogle Analyticsへ送る例 - jsdo.it - Share JavaScript, HTML5 and CSS">JSのエラーをGoogle Analyticsへ送る例 &#8211; jsdo.it &#8211; Share JavaScript, HTML5 and CSS</a></li>
<li>UAがかなりごちゃまぜ、飛んでくるゴミも多いので役に立つかどうかは別</li>
<li>onerrorなどのイベントをトラッキングしてくれるサービス
<ul>
<li><a href="http://trackjs.com/" title="Javascript Event and Error Logging - {Track:js}">Javascript Event and Error Logging &#8211; {Track:js}</a></li>
<li><a href="http://errorception.com/" title="Errorception - Painless JavaScript Error Tracking">Errorception &#8211; Painless JavaScript Error Tracking</a></li>
<li><a href="http://www.exceptionhub.com/" title="ExceptionHub | JavaScript Error Tracking">ExceptionHub | JavaScript Error Tracking</a></li>
</ul>
</li>
</ul>
</li>
<li>XSSについて
<ul>
<li>mixiの<a href="https://developer.mixi.co.jp/inquiry/security/" title="脆弱性報告制度">脆弱性報告制度</a>について</li>
<li>swfを使ったXSSについて、アップローダー系</li>
<li>受け付けてくれるだけでも、送りつけて怒られないと分かる分安心</li>
</ul>
</li>
<li>テンプレートエンジン
<ul>
<li><a href="http://handlebarsjs.com/" title="Handlebars">Handlebars</a> の別実装について</li>
<li>コンパイルするとファイルサイズが大きいのが気になる</li>
<li>謎機能、<a href="https://github.com/wycats/handlebars.js/tree/master/spec">テスト</a>が大量にある</li>
</ul>
</li>
</ul>
<h2>おわり</h2>
<p>JavaScriptご飯美味しかった。</p>
<p>Air Mentionのみで集合から解散までできました。</p>
<h3>食べる人</h3>
<ul>
<li><a href="https://twitter.com/kyo_ago" title="@kyo_ago">@kyo_ago</a></li>
<li><a href="https://twitter.com/watilde" title="@watilde">@watilde</a></li>
<li><a href="https://twitter.com/azu_re" title="@azu_re">@azu_re</a></li>
</ul>
