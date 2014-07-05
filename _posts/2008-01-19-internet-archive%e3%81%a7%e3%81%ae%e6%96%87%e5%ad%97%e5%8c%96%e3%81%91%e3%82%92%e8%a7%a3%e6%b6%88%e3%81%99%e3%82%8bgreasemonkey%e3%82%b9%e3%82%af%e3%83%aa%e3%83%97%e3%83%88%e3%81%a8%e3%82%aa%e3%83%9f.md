---
title: Internet Archiveでの文字化けを解消するGreasemonkeyスクリプトとオミトロンの設定
author: azu
layout: post
permalink: /2008/0119/res19/
SBM_count:
  - '00003<>1355377979<>2<>1<>0<>0<>0'
dsq_thread_id:
  - 303421760
categories:
  - Greasemonkey
  - webサービス
tags:
  - Firefox
  - Greasemonkey
---
毎回Internet Archiveveのウェイバックマシン (Wayback Machine)を利用するときに  
text/html; charset=UTF-8  
と勝手に追加してしまうことで、日本のサイトの多くはSJISとかに設定しているので文字化けが発生します。

Greasemonkeyスクリプトの場合

[Internet Archive &#8211; Correct character set – Userscripts.org][1]

の右側にダウンロードするとこがあります。

もう一つの方法としてオミトロン<span class="postbody" style="line-height: 150%">(Proxomitron)</span>を利用してやる方法もあります。  
HTTP headersのほうに以下をコピーして追加すれば多分大丈夫。

[HTTP headers]  
In = TRUE  
Out = FALSE  
Key = &#8220;Internet Archive <span class="postbody" style="line-height: 150%">charset</span>&#8220;  
URL = &#8220;\*web.archive.org/\*&#8221;  
Match = &#8220;text/html;\*charset=\*&#8221;  
Replace = &#8220;text/html;&#8221;

検索してもなかなか出てこなくて、みんな不便に思ってないのかな？とおもったり。

**追記  
**

[Right Encoding 0.2.2][2]  
という拡張を使えば右クリックメニューに文字エンコードメニューが追加されるみたいです。

 [1]: http://userscripts.org/scripts/show/9171
 [2]: https://addons.mozilla.org/ja/firefox/addon/371?id=371