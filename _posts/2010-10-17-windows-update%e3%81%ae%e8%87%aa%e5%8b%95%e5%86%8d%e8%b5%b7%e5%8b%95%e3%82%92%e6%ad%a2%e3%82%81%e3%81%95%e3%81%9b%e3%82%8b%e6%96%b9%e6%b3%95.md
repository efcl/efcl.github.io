---
title: Windows Updateの自動再起動を止めさせる方法
author: azu
layout: post
permalink: /2010/1017/res2004/
SBM_count:
  - '00006<>1355420631<>6<>0<>0<>0<>0'
dsq_thread_id:
  - 301204002
categories:
  - software
tags:
  - vista
  - Windows
  - ソフトウェア
  - レジストリ
---
Windows Updateでいきなり再起動されてデータが消えたって話は未だによく聞くので自動的に再起動を防止する方法のメモ

Business以降のグレードならだったらグループポリシーを使えば設定できる  
Homeとかpremiumはないのでレジストリを直接変更する必要がある。

*   [Windows Update適用後の自動再起動を抑制する － ＠IT][1]
*   [Tipset » Windows Updateの強制再起動を無効にする][2]

レジストリを直接変更するのは面倒だと思うので、[Prevent Windows Update from Forcibly Rebooting Your Computer &#8211; How-To Geek][3]に置いてあるregまたはオンオフがGUIでできるソフトウェアを使うと楽です。

自動更新のダイアログが出ているときに、そのダイアログを黙らせるだけなら(防止はできない)  
[誠 Biz.ID：3分LifeHacking：「今すぐ再起動しますか？」のダイアログを“マホトーン”する][4]で紹介されている、  
[XP にマホトーンをとなえる][5]を使うといい。

もっと汎用的にWindows Update以外のソフトウェアによる再起動を防止したいのなら[ShutdownGuard][6]を利用するとその都度確認を取ってからシャットダウン・再起動・ログオフを行える。  
追記:同様の事が[「ちょっと待った」][7]でも行える[][8]

ソフトウェアのリンクまとめ

*   [Prevent Windows Update from Forcibly Rebooting Your Computer][3]
*   [XP にマホトーンをとなえる][5]
*   [ShutdownGuard][6]
*   [窓の杜 &#8211; 【今日のお気に入り】意図しないシャットダウンや再起動を抑止「ちょっと待った」][7]

&nbsp;

 [1]: http://www.atmarkit.co.jp/fwin2k/win2ktips/1288wunorestart/wunorestart.html
 [2]: http://hasumi.info/%7Eh2/2008/07/01/windows-update%E3%81%AE%E5%BC%B7%E5%88%B6%E5%86%8D%E8%B5%B7%E5%8B%95%E3%82%92%E7%84%A1%E5%8A%B9%E3%81%AB%E3%81%99%E3%82%8B/
 [3]: http://www.howtogeek.com/howto/windows-vista/prevent-windows-update-from-forcibly-rebooting-your-computer/
 [4]: http://bizmakoto.jp/bizid/articles/1003/19/news083.html
 [5]: http://hosiken.jp/dev/win/xpmahotone.html
 [6]: http://code.google.com/p/shutdownguard/
 [7]: http://www.forest.impress.co.jp/docs/serial/okiniiri/20101018_399837.html
 [8]: http://www.vector.co.jp/soft/winnt/util/se486587.html