---
title: UstreamのFlash動画内広告を消す方法
author: azu
layout: post
permalink: /2010/0723/res1841/
SBM_count:
  - '00030<>1355444932<>26<>0<>2<>2<>0'
dsq_thread_id:
  - 300802635
categories:
  - アドオン
tags:
  - Firefox
  - flash
  - ust
  - 広告
---
[USTREAM][1]では動画内に広告があって一定のタイミングで表示されたりしてとても邪魔になったりします。  
その広告を[Adblock][2]でブロックして出現しないようにする方法。

方法は単純で動画内広告も外部から読み込んだFlashで動作しているのでそのswfを読み込まないようにするだけです。  
広告は以下のアドレスのブロックすると読み込まれなくなります。(正規表現でマッチするAdblockだとmedia.scanscout.comみたいにエスケープする。)

<pre>media.scanscout.com // &#60;=Youtubeなど
im.yahooapis.jp // &#60;= Ustreamは今こっち</pre>

ブロックされているswfはhttp://media.scanscout.com/ads/ss_ads3.swf Youtubeとか他のサイトでも使われてるとか聞きました。新しくなった広告は(おそらくソフトバンクに変わってから)[マーケティングAPI|ドキュメント|テクノロジーソリューションポータル][3]を使って配信されているのかと思われます。  
自分は[Adblock++][4]を使って正規表現を使わずに単純に広告をブロックしているので、/adsをというキーワードで広告がブロックされていたようです。  
<del>一応自分の<a href="http://gist.github.com/487255">adblock++.ini</a> (プロファイルの所にadblock++.iniがあるのでそこに上書き)</del>  
広告を全てなくしたい訳ではなくて、iframeを使って重かったり、大きな画像を使って見づらくしたり、幾度も注視点を奪うだけの広告が嫌いなだけです。

<pre></pre>

 [1]: http://www.ustream.tv/
 [2]: http://firefox.geckodev.org/?Adblock
 [3]: http://listing.yahoo.co.jp/developer/docs/int20/reference/index.html
 [4]: http://pc12.2ch.net/test/read.cgi/software/1247819523/737