---
title: Adblock++がFirefox4で動かなかったのでランタイムを更新
author: azu
layout: post
permalink: /2011/0404/res2482/
SBM_count:
  - '00001<>1355406904<>0<>0<>1<>0<>0'
  - '00001<>1355406904<>0<>0<>1<>0<>0'
  - '00001<>1355406904<>0<>0<>1<>0<>0'
  - '00001<>1355406904<>0<>0<>1<>0<>0'
  - '00001<>1355406904<>0<>0<>1<>0<>0'
dsq_thread_id:
  - 302511081
categories:
  - アドオン
tags:
  - AD
  - Firefox
  - Firefox4
  - アドオン
---
C++で書かれた[Adblock++][1]アドオンを使用していましたが、Firefox4で上手く動いてなかった(リストに空になるとか)ので、原因は何だろと探してみたらビルド環境が<a href="http://park2.wakwak.com/~benki/201010.html" target="_blank">Visual C++ 2010 Express</a>に変わってたようです。

PCに入ってたランタイムは2008ぐらいのだったので、[Microsoft Visual C++ 2010 再頒布可能パッケージ][2]からランタイムをダウンロードし、インストールし直したら動作するようになりました。

ついでに広告配信先が変わって動かなくなってた[UstreamのFlash動画内広告を消す][3]方法もアップデートしました。

**BENKIi**
:   [http://park2.wakwak.com/~benki/index.html][4]

 [1]: http://park2.wakwak.com/%7Ebenki/index.html
 [2]: http://www.microsoft.com/downloads/details.aspx?FamilyID=a7b7a05e-6de6-4d3a-a423-37bf0912db84&displayLang=ja
 [3]: http://efcl.info/2010/0723/res1841/ "UstreamのFlash動画内広告を消す方法"
 [4]: http://park2.wakwak.com/%7Ebenki/index.html "BENKI"