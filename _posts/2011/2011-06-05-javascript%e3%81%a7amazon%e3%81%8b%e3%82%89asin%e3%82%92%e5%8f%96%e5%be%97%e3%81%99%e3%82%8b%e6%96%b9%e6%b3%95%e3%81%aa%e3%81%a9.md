---
title: JavaScriptでAmazonからASINを取得する方法など
author: azu
layout: post
permalink: /2011/0605/res2817/
SBM_count:
  - '00017<>1355442375<>14<>0<>1<>2<>0'
dsq_thread_id:
  - 322455843
categories:
  - Greasemonkey
  - javascript
tags:
  - Amazon
  - ASIN
  - Greasemonkey
  - javascript
---
#### 一つの方法はinput要素から取得する方法

<div id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode">document.getElementById(<span class="str">"ASIN"</span>).value</pre>
</div>

Amazonはページ中のhiddenなinput要素にASINを持たせてるのでこういう手が取れる。

<div id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode">&lt;input id=<span class="str">"ASIN"</span> type=<span class="str">"hidden"</span> value=<span class="str">"4253196519"</span> name=<span class="str">"ASIN"</span>&gt;</pre>
</div>

ページの構造が変わったらダメだけど、結構昔からこの部分は変わってないので意外と安定しているかもしれない。   
amazon.comだと構造が違うものがあって、[Amazon.com: Buried Prey eBook: John Sandford: Kindle Store][1]のようにKindle Storeだとページ構造が違ってID=ASINがない代わりに次のようなものがある。

<div>
  <pre id="codeSnippet" class="csharpcode">&lt;input type=<span class="str">"hidden"</span> value=<span class="str">"B004LRPGPC"</span> name=<span class="str">"ASIN.0"</span>&gt;</pre>
</div>

<div>
  なので、inputを取得する場合は次のような形になる。
</div>

<div id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode"><span class="kwrd">var</span> ASIN = document.getElementById(<span class="str">"ASIN"</span>) || document.getElementsByName(<span class="str">"ASIN.0"</span>)[0];</pre>
</div>

#### もう一つの方法はwindowオブジェクトのプロパティから取得する方法

(2011年6月5日現在だと)

<div id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode">window.sitbAsin;</pre>
</div>

<div>
  にASINの数値が入っている。(ちょっとできるタイミングが特殊な気がするから扱いにくいかも) <br />これはAmazon側のJavaScriptが生やしているので、ページのちょっとした構造の変化では変わらないと思うけど使うライブラリを変えたりJavaScriptが大きく変わると変更されることがある。 <br />以前はwindow.productTagsに入っていた。
</div>

*   [Amazonの商品個別ページでASINを抜き出す &#8211; おれ ここ めも かきなぐる おまえ ここ よむ なぐる &#8211; subtech][2]

#### 最後はURLからASIN部分を切り出す方法

URLにはASINが入ってるはずなので、ページに構造の変化には強いけど、少しパースが面倒なところがある。   
どのようなURLがあるかを把握する必要があるので、条件分けなども必要になる。   
まあASINのフォーマットはw{10}と決まっているので、ある程度安定するのかもしれない。

ついでに、replaceStateを使ってリロードなしでAmazonのURLを/dp/ASINだけの短いURLにするGreasemonkey書いた。

*   [Amazon URL Cleaner for Greasemonkey][3]

 [1]: http://www.amazon.com/gp/product/B004LRPGPC/ref=s9_simh_gw_p351_d0_i2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-3&pf_rd_r=1GAMW69P6270WWBTEW98&pf_rd_t=101&pf_rd_p=470938811&pf_rd_i=507846
 [2]: http://subtech.g.hatena.ne.jp/h2u/20090529/1243587848
 [3]: http://userscripts.org/scripts/show/104173