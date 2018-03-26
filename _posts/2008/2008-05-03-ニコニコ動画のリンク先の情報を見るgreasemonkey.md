---
title: ニコニコ動画のリンク先の情報を見るGreasemonkey
author: azu
layout: post
permalink: /2008/0503/res169/
SBM_count:
  - '00019<>1355356019<>15<>2<>1<>1<>0'
dsq_thread_id:
  - 300801644
categories:
  - Greasemonkey
tags:
  - Greasemonkey
  - ニコニコ動画
---
<p style="padding-left: 30px;">
  <em><span style="font-size: small;"><a href="http://userscripts.org/scripts/show/28910">nicovideo Thumbinfo popup – Userscripts.org</a>について追記しました。</span></em>
</p>

[Fast Look up nicoinfo 0.4 &#8211; あふひねこのにき][1]

[niconico\_thuminfo\_check.user.js ][2]- [Ulmhaft][3]

2種類があり、それぞれの長所があるので自分は二つを使い分けています。

*   [Fast Look up nicoinfo 0.4 &#8211; あふひねこのにき][1]

は選択した範囲にニコニコ動画のリンク(sm,fzなど)があった場合、画面下にそのリンク先の情報を表示するものです。**  
**自分用に少し**改造**して、投稿者の文章を自動で改行(かなり判定甘いです)と表示された情報内のURLにもリンクを張るようにしてあります。

[FastLookupNicoinfo.user.js][4]

[<img class="alignnone size-medium wp-image-170" title="fastlook" src="https://efcl.info/wp-content/uploads/2008/05/fastlook-300x187.png" alt="" width="300" height="187" />][5]

もう一方

*   [niconico\_thuminfo\_check.user.js ][2]

[Ulmhaft][3]さんの方のはURLにマウスを乗せるだけでリンク先の情報を表示します。  
[FastLookupNicoinfo.user.js][4]よりワンステップ少なくて便利ですが、他のGreasemonkeyなどとの相性なんかが出やすく  
ページ表示後の変化に少し弱い感じ。

自分の場合は基本的に両方ONの状態ですが、ランキングなんかの広い空間では（変な言い方だけど）[niconico\_thuminfo\_check.user.js][2]の方をよく使う気がします。（やっぱり少しでも手間がないと使いやすい）  
でも取得をミスる事があるのでその時は[FastLookupNicoinfo.user.js][4]の方で表示する感じ。

ニコニコ動画の投稿者コメントのURLをリンクする関数  
([Ulmhaft][3]さんの少し改造しただけ)

<pre class="brush:javascript;">function smilehyperLink(desc){
desc = desc.replace(
/https?://[-_.!~*'a-zA-Z0-9:/?@&amp;=+$,%#]+|(?:mylist|user)/d+|(?!mp3D)(sm|nm|fz|am|za)d+/g,
function(word){
if(word.indexOf("http") == 0){return word.link(word);}
var link = "&lt;a href='http://www.nicovideo.jp/";
link = /^(?:mylist|user)//.test(word) ? link + word : link + "watch/" + word;
return link + "' style='background-color:#55ffff;'&gt;" + word + "&lt;/a&gt;";
});
return desc;
}
</pre>

追記

[nicovideo Thumbinfo popup][6]という新しいぐりもんもあります。  
これは[niconico\_thuminfo\_check.user.js][2]と同じタイプでマウスオーバーで動画情報を表示します。  
[niconico\_thuminfo\_check.user.js ][2]よりも安定しているのでこちらの方がオススメです。  
オプションでポップアップしたところにはてブ数と投稿者名を表示する事もできます。

 [1]: http://d.hatena.ne.jp/AOI-CAT/20080427
 [2]: http://coderepos.org/share/browser/lang/javascript/userscripts/niconico_thuminfo_check.user.js?
 [3]: http://d.hatena.ne.jp/Sore_0/
 [4]: https://efcl.info/wp-content/uploads/FastLookupNicoinfo.user.js
 [5]: https://efcl.info/wp-content/uploads/2008/05/fastlook.png
 [6]: http://userscripts.org/scripts/show/28910
