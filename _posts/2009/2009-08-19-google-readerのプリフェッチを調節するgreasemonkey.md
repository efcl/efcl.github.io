---
title: Google Readerのプリフェッチを調節するGreasemonkey
author: azu
layout: post
permalink: /2009/0819/res1262/
SBM_count:
  - '00007<>1355424779<>5<>0<>1<>1<>0'
dsq_thread_id:
  - 300916725
categories:
  - Greasemonkey
tags:
  - google
  - Greasemonkey
  - rss
---
今回はただの紹介です。  
Google Readerのプリフェッチ(先読み)の値を変更するGreasemonkeyスクリプトです。  
プリフェッチを変更すると何がうれしいのかというと、現在のデフォルトの値はあまり大きくないので、  
記事を飛ばしていくと詰まった感じになるため、先読みの値を増やすことでそれを軽減できます。  
同じようにスクロールでカクカクする現象も軽減できるそうです。

**Google Reader Prefetch More for Greasemonkey**
:   [http://userscripts.org/scripts/show/26383][1]

スクリプトのデフォルト値は少し読み込みすぎてる気がするので、自分のパソコンと相談して適当な値にするといいかも。

<pre class="brush:css;">var first = 25; // default is 5
var next =  15; // default is 1
var list =  60; // default is 20</pre>

 [1]: http://userscripts.org/scripts/show/26383 "Google Reader Prefetch More for Greasemonkey"