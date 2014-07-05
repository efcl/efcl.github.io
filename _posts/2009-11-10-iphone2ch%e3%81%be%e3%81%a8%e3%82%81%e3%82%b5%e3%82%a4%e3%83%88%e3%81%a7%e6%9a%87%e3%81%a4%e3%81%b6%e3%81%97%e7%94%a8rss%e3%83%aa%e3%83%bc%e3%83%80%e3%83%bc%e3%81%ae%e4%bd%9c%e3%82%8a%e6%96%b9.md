---
title: '[iPhone]2chまとめサイトで暇つぶし用RSSリーダーの作り方'
author: azu
layout: post
permalink: /2009/1110/res1429/
aktt_notify_twitter:
  - no
SBM_count:
  - '00020<>1355440655<>18<>0<>1<>1<>0'
dsq_thread_id:
  - 300828530
categories:
  - iPhone
tags:
  - 2ch
  - rss
  - はてブ
  - ブックマークレット
---
タイトルが変ですが、iPhoneで2chまとめサイトみる環境の作成方法をまとめたメモです。  
既に[ニコ２ちゃんねる][1]のようなそれ向けのアプリがあったりしますが、実際にサイトを表示する時はPCサイトをみるだけなのであんまりうれしくなかったりします。  
そこで、RSSリーダーと[まるごとRSS][2]を使って、2chまとめサイト専用のGoogle Readerを作成してみた。

[まるごとRSS][2]を使うことでフィードが全文受信(Wedataが対応してないところは無理)できるので、わざわざサイトにアクセスする必要がなくなるのと、Bylineのようにキャッシュ機能を持っているiPhoneアプリだとオフラインでも暇つぶしになるのがいいところ。

手順としては

1.  Google Reader用にGoogleアカウントを作成する(元々Google Readerを使ってなかったらそれでもいい)
2.  好きな2chまとめサイトを[まるごとRSS][2]を通してGoogle Readerに登録する  
    下に登録用のブックマークレットを置いてある
3.  好きなRSSリーダアプリで上のアカウントを閲覧する  
    [Byline][3]や[MobileRSS][4]など(これ専用と考えるともっと最適なものがあるかもしれない。オススメがあったらお願いします)

**はてブで調べた2chまとめサイトの一覧 &#8211; ナマアシタノム**
:   [http://d.hatena.ne.jp/ashitano244/20091004/1254643353][5]

を参考にして適当に登録したものを置いておく。

*   [google-reader-subscriptions.xml][6]

まるごとRSSを通す際にわざわざ入力するのは面倒なので、簡単に登録できるブックマークレットを作成した。

*   [まるごとRSS登録][7] (まるごとRSSのページへ)
*   [まるごとRSS登録][8] (Google Readerの登録ページへ直接飛ぶ)

まるごとRSSのページ掲載されてるブックマークレットは以前自分が書いたやつですが、RSSのページで実行しないといけなかったので、適当に書き加えて**TOPページなどから実行しても登録画面**にいけるようにしました。(複数のRSSフィードを持つページは苦手なので、そのときはRSSページから実行するといいです。)

<pre class="brush:javascript;">javascript:
(function(){
  var%20el=document.getElementsByTagName("link");
  var%20flag=false;
  for(i=0;i&#60;el.length;i++){
    if(!flag&&el&#91;i&#93;.getAttribute("rel")=="alternate"&&/(xml|rss)/.test(el&#91;i&#93;.getAttribute("type"))){
      window.open('http://www.google.com/reader/view/feed/http://mrss.dokoda.jp/analyze/?url='+encodeURIComponent(el&#91;i&#93;.href),'_blank');
      flag=true;
    }
  }
  if(!flag){
    window.open('http://www.google.com/reader/view/feed/http://mrss.dokoda.jp/analyze/?url='+encodeURIComponent(location.href),'_blank');
  }
}
)()
</pre>

中身は正直適当なので、ご自由にお使いください。

**RSSフィードを全文配信で読むなら まるごとRSS**
:   [http://mrss.dokoda.jp/][9]

**Google リーダー  
**
:   [http://www.google.co.jp/reader/][10]

 [1]: http://d.hatena.ne.jp/yositosi/20090604/p1
 [2]: http://mrss.dokoda.jp/
 [3]: http://appshopper.com/news/byline
 [4]: http://appshopper.com/news/mobilerss
 [5]: http://d.hatena.ne.jp/ashitano244/20091004/1254643353 "はてブで調べた2chまとめサイトの一覧 - ナマアシタノム"
 [6]: http://www.google.com/reader/public/subscriptions/user/flash-lite/
 [7]: javascript:(function(){var%20el=document.getElementsByTagName("link");var%20flag=false;for(i=0;i<el.length;i++){if(!flag&&el[i].getAttribute("rel")=="alternate"&&/(xml|rss)/.test(el[i].getAttribute("type"))){window.open('http://mrss.dokoda.jp/analyze/?url='+encodeURIComponent(el[i].href),'_blank');flag=true;}}if(!flag){window.open('http://mrss.dokoda.jp/analyze/?url='+encodeURIComponent(location.href),'_blank');}})()
 [8]: javascript:javascript:(function(){var%20el=document.getElementsByTagName("link");var%20flag=false;for(i=0;i<el.length;i++){if(!flag&&el[i].getAttribute("rel")=="alternate"&&/(xml|rss)/.test(el[i].getAttribute("type"))){var%20t=el[i].href.split("/");t.shift();window.open('http://www.google.com/reader/view/feed/http://mrss.dokoda.jp/a/http'+t.join("/"),'_blank');flag=true;}}if(!flag){var%20t=location.href.split("/");t.shift();window.open('http://www.google.com/reader/view/feed/http://mrss.dokoda.jp/a/http'+t.join("/"),'_blank');}})()
 [9]: http://mrss.dokoda.jp/ "RSSフィードを全文配信で読むなら まるごとRSS"
 [10]: http://www.google.co.jp/reader/ "Google リーダー "