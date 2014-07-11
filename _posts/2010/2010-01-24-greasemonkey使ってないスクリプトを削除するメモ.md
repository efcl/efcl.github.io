---
title: Greasemonkey使ってないスクリプトを削除するメモ
author: azu
layout: post
permalink: /2010/0124/res1543/
aktt_notify_twitter:
  - no
SBM_count:
  - '00000<>1355358489<>0<>0<>0<>0<>0'
dsq_thread_id:
  - 303485956
categories:
  - Firefox
tags:
  - Firefox
  - Greasemonkey
---
Greasemonkeyで使ってないスクリプトを削除したい。

gm_scriptsディレクトリにあるconfig.xmlを編集

<pre>^(?!.*enabled="true").*$</pre>

を空に置換して有効になっているものだけを取り出す

<pre>^n</pre>

も空に置換して空の改行をなくす

<pre>^.*?filename="(.*?)".*?basedir="(.*?)".*?$
を下のように置換して使っているファイルのパスを出す。
2/1</pre>

なんかゴミが残ったりするので上の正規表現が適当なせい。

ここまでの手順で、使っているスクリプトの.jsまでのファイルパスが抽出できる。  
で、こっからどうやってそれらのファイルだけを取り出せばいいのかがよくわからない。  
こんな感じででる。(なんかいろいろおかしい)

<pre>./googlenotebookcustomizer.user.js
pastedscripinstaller3.user.js.
simplestylegoogle_mania.user.js
hb_display_comment/hb_display_comment.user.js
.....
</pre>

リストに載っているものを移動するときに(その方法すら浮かんでない)Requireしたものが含まれないとそんな問題もある。