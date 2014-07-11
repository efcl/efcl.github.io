---
title: Ustreamの録画済み動画をRSS購読する方法
author: azu
layout: post
permalink: /2010/1208/res2174/
SBM_count:
  - '00025<>1355447487<>22<>0<>3<>0<>0'
dsq_thread_id:
  - 301185218
categories:
  - webサービス
tags:
  - rss
  - ust
---
[USTREAM][1]であるユーザーの録画済み動画をRSS購読したいと思ってRSSのURLを探したら存在したのでメモ。

http://www.ustream.tv/user/USERNAME というUSRNAMEの人のRSSは  
http://www.ustream.tv/USERNAME-videos.rss というのがRSSになっているみたい。

たとえば、[W2C_LIVE][2]なら[W2C_LIVE の動画][3]というのがRSSになって購読できる。

しかし、なんでこんな隠し要素みたいになってるんだ。

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow: hidden;">
  -videos.rss
</div>

 [1]: http://www.ustream.tv/
 [2]: http://www.ustream.tv/user/W2C_LIVE
 [3]: http://www.ustream.tv/W2C_LIVE-videos.rss