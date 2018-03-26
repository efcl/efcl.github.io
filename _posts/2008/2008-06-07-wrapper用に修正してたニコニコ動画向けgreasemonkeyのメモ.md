---
title: Wrapper用に修正してたニコニコ動画向けGreasemonkeyのメモ
author: azu
layout: post
permalink: /2008/0607/res206/
SBM_count:
  - '00001<>1355359895<>0<>1<>0<>0<>0'
dsq_thread_id:
  - 305941758
categories:
  - Greasemonkey
tags:
  - Firefox
  - Greasemonkey
  - ニコニコ動画
---
Wrapperのために修正をしたニコニコ動画用Greasemonkeyスクリプト。  
Firefox3も落ち着いてきたので、移行する時に忘れないうちにメモ。

<!--more-->

*   https://efcl.info/wp-content/uploads/nicovideoautoplay.user.js

[NicoVideo Auto Play: ニコニコ動画で次の動画を自動再生するGreasemonkeyスクリプト | endflow.net blog][1]

*   https://efcl.info/wp-content/uploads/komeshoku.user.js

[KomeShoku &#8211; ニコニコ動画コメント支援＆ﾋﾞｼﾞｭｱﾗｲｽﾞGreasemonkey &#8211; wktkラボ][2]

上の二つはnico.を付け加えただけ。  
今度からWrapperを見分ける関数作って場合分けする予定。

*   https://efcl.info/wp-content/uploads/nicovideologwithtwitter_.user.js

[ニコニコ動画の最近見た動画を超パワーアップさせるGreasemonkeyComments][3]

CGIは元々の配布者のものを使用してる。  
ブラウザのタイトルではなく、ニコニコ動画上に表示されているタイトルを利用する用に変更。  
(タイトルをいじってない人にはあんまり関係ないかと)

 [1]: http://blog.endflow.net/?p=62&lang=ja
 [2]: http://wktklabs.blog98.fc2.com/blog-entry-17.html
 [3]: http://cureblack.com/20070831.html#p02
