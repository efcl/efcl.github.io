---
title: FirebugのDOMタブが壊れた(競合)
author: azu
layout: post
permalink: /2009/1104/res1421/
aktt_notify_twitter:
  - no
SBM_count:
  - '00001<>1355430369<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 302751512
categories:
  - Firefox
tags:
  - Firefox
  - javascript
  - アドオン
  - ニコニコ動画
  - 競合
---
最近になってFirebugのDOMタブで要素をクリックしてもその下の要素が展開されなくなったので、何かのアドオンと競合してるのかを調べてみたら、[FxIF][1]というEXIFを見るためのアドオンが原因だと分かった。  
FxIFを外すか、過去のバージョンにするかで回避できた。

もう一つ、こっちは競合というわけではないけど、**ニコニコ動画がリニューアルしてからマイリスト**にアクセスするとFirefoxが固まってフリーズするようになってしまった。  
こちらの**原因**は[It&#8217;s All Text!][2]というテキストエリアをエディタで編集するアドオンを外す事で解消された。  
多分JavaScriptで動的に表示させるようになったのが要因になって、変な動作をするようになったのかな。

 [1]: https://addons.mozilla.org/ja/firefox/addon/5673
 [2]: https://addons.mozilla.org/ja/firefox/addon/4125