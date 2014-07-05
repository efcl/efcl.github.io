---
title: WizzRSSやinfoRSSのアンインストールしても残るものを消す
author: azu
layout: post
permalink: /2008/0123/res30/
SBM_count:
  - '00000<>1355337887<>0<>0<>0<>0<>0'
dsq_thread_id:
  - 303559557
categories:
  - Firefox
tags:
  - Firefox
---
アンインストールにも関わらずWizzRSSとinfoRSSの値がabout:configに残っていたりしたので、  
直接消してみることにした。  
(about:configからは消せない。リセットできるだけ。)

<http://forum.mozilla.gr.jp/?mode=al2&namber=32992&rev=&&KLOG=208>  
[http://rocky1.blog53.fc2.com/blog-entry-851.html][1]

この辺を参考に、  
C:Usersユーザー名AppDataRoamingMozillaFirefoxProfilesランダム英数字.ユーザー名  
にあるprefs.jsを直接編集して、WizzRSSと名前が名前が付くものを消してみた。  
(先にWizzRSSはアンインストールされるのが前提)  
Firefox起動中などに編集しても、元の値が書き込まれる事があるので、起動していない時に編集する。

今のとこ変な動作はしていないが、こうなったのは多分同時期にRSSの拡張を試していたのが原因が高いです。

 [1]: http://rocky1.blog53.fc2.com/blog-entry-851.html#trackback_top