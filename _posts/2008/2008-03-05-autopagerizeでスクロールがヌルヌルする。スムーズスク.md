---
title: AutoPagerizeでスクロールがヌルヌルする。(スムーズスクロール)
author: azu
layout: post
permalink: /2008/0305/res91/
SBM_count:
  - '00002<>1355356055<>2<>0<>0<>0<>0'
dsq_thread_id:
  - 302003063
categories:
  - Firefox
  - Greasemonkey
tags:
  - Firefox
  - Greasemonkey
  - トラブル
---
[AutoPagerize – Userscripts.org][1]

いきなりprefs.jsが壊れてて、普段からバックアップをしっかり取っておけば良かったと思う今日この頃ですが、  
復旧もだいたい終わりついでだからFirefox3.0に乗り換える準備でもしようかなと、考えていてサイトを巡っていると、  
なんかスクロールがヌルヌルという感じでつっかかって使いづらくなっていた。

いろいろ拡張やGreasemonkeyを調べて見たらAutoPagerizeを外すといつも通りになっていたので、AutoPagerizeが原因っぽいのすぐに分かったけど、  
AutoPagerizeはなくてはならない Greasemonkeyスクリプトなのでw、他の原因を探してみた。

やはりというか破損した prefs.jsが原因っぽくて、一度AutoPagerizeをアンインストールしてから、  
prefs.jsの中のAutoPagerizeの項目を直接削除した。

user_pref(&#8220;greasemonkey.scriptvals.http://swdyh.yu.to//AutoPagerize.cacheInfo&#8221;,  
~~~~

これでいつも通りに戻ったので一安心。  
そろそろFirefox3.0に乗り換えたいな&#8230;

 [1]: http://userscripts.org/scripts/show/8551