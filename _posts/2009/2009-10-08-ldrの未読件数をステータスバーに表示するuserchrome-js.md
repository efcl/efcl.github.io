---
title: LDRの未読件数をステータスバーに表示するuserChrome.js
author: azu
layout: post
permalink: /2009/1008/res1389/
SBM_count:
  - '00011<>1355433455<>8<>0<>2<>1<>0'
dsq_thread_id:
  - 302073198
categories:
  - Firefox
tags:
  - javascript
  - userChrome.js
  - ステータスバー
---
LDRの未読件数をステータスバーに表示して定期的に更新するuserChrome.jsスクリプトです。  
中身のユーザー名を自分のものに書き換えてから使用してください。

<pre>const userName = ""; // ユーザー名</pre>

デフォルトでは30分ごとに更新するようになっています。

<pre>const reMinute = 30; // 何分毎に更新する</pre><figure id="attachment_1391" style="width: 214px;" class="wp-caption alignnone">

[<img class="size-full wp-image-1391" title="ss-2009-10-08-17-10-55" src="https://efcl.info/wp-content/uploads/2009/10/ss-2009-10-08-17-10-55.png" alt="ss-2009-10-08-17-10-55" width="214" height="67" />][1]<figcaption class="wp-caption-text">数値だけでシンプルです</figcaption></figure> 
*   [LDRUnreadCounter.uc.js][2]

環境によって描画がおかしくなってるかもしれないので、下のあたりといじると解決するかも。

<pre class="brush:javascript;">clearRect(0, 0, 24, 16);//透明土台 x, y, w, h
    mozTextStyle = 24 + (unread.toString().length) * -3 + "px sans-serif";//サイズ
    textAlign = "center"; // 横位置
    textBaseline = "middle";// 縦位置
    translate(0, 14);// 移動位置x,y</pre>

<br class="spacer_" />

参考

**LDRの未読件数をステータスバーに表示するプラグイン &#8211; hogehoge**
:   [http://d.hatena.ne.jp/teramako/20080730/p1][3]

**LDRの未読数をfaviconに表示するGreasemonkeyスクリプト &#8211; 素人がプログラミングを勉強するブログ**
:   [http://d.hatena.ne.jp/javascripter/20080609/1212968037][4]

<div id="_mcePaste" style="overflow: hidden; position: absolute; left: -10000px; top: 40px; width: 1px; height: 1px;">
  <dl>
    <dt>
      <strong>LDRの未読数をfaviconに表示するGreasemonkeyスクリプト &#8211; 素人がプログラミングを勉強するブログ</strong>
    </dt>
    
    <dd>
      <a title="LDRの未読数をfaviconに表示するGreasemonkeyスクリプト - 素人がプログラミングを勉強するブログ" href="http://d.hatena.ne.jp/javascripter/20080609/1212968037">http://d.hatena.ne.jp/javascripter/20080609/1212968037</a>
    </dd>
  </dl>
</div>

 [1]: https://efcl.info/wp-content/uploads/2009/10/ss-2009-10-08-17-10-55.png
 [2]: https://efcl.info/wp-content/uploads/2009/10/LDRUnreadCounter.uc_.js
 [3]: http://d.hatena.ne.jp/teramako/20080730/p1 "LDRの未読件数をステータスバーに表示するプラグイン - hogehoge"
 [4]: http://d.hatena.ne.jp/javascripter/20080609/1212968037 "LDRの未読数をfaviconに表示するGreasemonkeyスクリプト - 素人がプログラミングを勉強するブログ"
