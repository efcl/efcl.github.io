---
title: 「RefControl」でリファラを偽装しておくべきサイト
author: azu
layout: post
permalink: /2009/0923/res1352/
SBM_count:
  - '00084<>1355427625<>74<>0<>6<>4<>0'
dsq_thread_id:
  - 300802281
categories:
  - アドオン
tags:
  - Amazon
  - blog
  - Firefox
  - google
  - アドオン
  - 検索
  - 画像
---
RefControlというアドオンを使う事でURL毎に、リファラを阻止や偽装することができます。  
偽装までしなくても阻止すれば問題ないサイトも多いです。

**RefControl**
:   [https://addons.mozilla.org/ja/firefox/addon/953][1]

このアドオンを使ってリファラを阻止、偽装しておくべきサイトのメモ

URLのリストはインポートできるので、インポートするのが一番楽です。  
[<img class="alignnone size-medium wp-image-1355" title="ss-2009-09-23-21-07-59" src="http://efcl.info/wp-content/uploads/2009/09/ss-2009-09-23-21-07-59-300x262.png" alt="ss-2009-09-23-21-07-59" width="300" height="262" />][2]

*   [refcontrol.txt][3] をインポート

RSSリーダから画像を表示するためにリファラを偽装、阻止するサイト

*   blogs.yahoo.co.jp
*   fc2.com
*   image.itmedia.co.jp
*   plusd.itmedia.co.jp

AmazonはGoogleからのリファラを見て、商品説明の上部に検索結果を表示するようになったためリファラを偽装しています。

*   www.amazon.co.jp

 [1]: https://addons.mozilla.org/ja/firefox/addon/953 "RefControl"
 [2]: http://efcl.info/wp-content/uploads/2009/09/ss-2009-09-23-21-07-59.png
 [3]: http://efcl.info/wp-content/uploads/2009/09/refcontrol.txt