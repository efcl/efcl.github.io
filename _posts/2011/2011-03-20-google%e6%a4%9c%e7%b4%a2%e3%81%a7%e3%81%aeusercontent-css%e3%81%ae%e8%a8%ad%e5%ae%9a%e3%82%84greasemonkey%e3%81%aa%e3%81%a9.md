---
title: Google検索でのuserContent.cssの設定やGreasemonkeyなど
author: azu
layout: post
permalink: /2011/0320/res2380/
SBM_count:
  - '00008<>1355425570<>7<>0<>0<>1<>0'
dsq_thread_id:
  - 301617951
categories:
  - Firefox
  - Greasemonkey
tags:
  - AutoPagerize
  - css
  - Firefox
  - google
  - Greasemonkey
  - 検索
---
Google検索は最も使うサービスの一つだと思うので、できる限り快適にしたいです。いろいろいじってたのがやっと落ち着いたので設定のメモです。

まずはGreasemonkeyから

*   [Twitter search(ja) result on Google for Greasemonkey][1]  
    検索結果にTwitter検索の結果を表示する
*   [En Google modified by Gulfweed][2]  
    検索中に言語の切り替えを簡単に行える
*   [Remove Google Redirection for Greasemonkey][3]  
    各ページへのリンクにGoogleのリダイレクトを挟まないようする

と、このぐらいで思ったより、Greasemonkeyは入れてない感じします。  
Google検索自体が結構高機能なので、そこまで機能を付け加える必要が無いのかもしれないです。(期間指定をもっと簡単にやりたいけど)  
後はアドオンで[Google Date :: Add-ons for Firefox][4]を入れているぐらいです。  
入れている理由は[最終更新日を知るため][5]なのでちょっと関係ないかもしれないです。

次にuserContent.cssの設定。  
[Stylish][6]は入れてないので直接userContent.cssに書いています。(デバッグには[userMenu.uc.js][7]のCSSリロードが便利)

<pre class="brush:css;">/* Google検索ページ
+結果欄の幅拡張
+検索バーを固定
+サイトの背景色を奇数で色分
+広告は犠牲になった
*/
@-moz-document url-prefix("http://www.google.co.jp/search"),
                 url-prefix("http://www.google.com/search"){
    /* 「もっと見る」を押さなくても、最初から全部表示 */
    .nojsb {
        display: block !important;
    }
    #tads{
        display: none !important;
    }
    #showmodes {
        display: none !important;
    }
    #mbEnd{
        display:none !important;
    }
    /* fixedSearchbar */
    #nr_container {
        margin-top: 115px;
    }
    #sfcnt {
        -moz-box-shadow:0 1px 5px #000000;
        box-shadow:0 1px 5px #000000;
        left:0;
        padding:18px 0;
        top:25px;
        width:100%;
        z-index:10;
    }
    #gog {
        left:0;
        top: 0;
        width:100%;
        z-index:11;
    }
    #gog, #sfcnt, #subform_ctrl{
        background:none repeat scroll 0 0 rgba(255, 255, 255, 0.9)!important;
        position:fixed;
    }
    #sfcnt {
        height:70px !important;
        padding-top:0 !important;
    }
    #subform_ctrl {
      text-align:right;
      z-index: 10;
      right: 0;
      top: 88px;
      min-height: 0;
      background:none repeat scroll 0 0 transparent!important;
    }
    #guser, #gbar{
          padding: 1px 0;
    }
    #gbar nobr, #guser nobr {
        line-height: 22px;
    }
    /* oddには色をつける */
    li.g:nth-child(odd){
        background:#F7F7F7;
    }
    /* 説明文を横に延長 */
    .g{
        min-width:800px;
        padding:5px!important;
        -moz-border-radius : 5px;
        border-radius : 5px;
    }
    .s {
        min-width: 800px !important;
    }

    /* RealTimeの場合横幅に必要 */
    #center_col{
        min-width:820px!important;
    }
    /*右側のbox*/
    #rtro{
        width: 800px!important;
    }
    /* 普段は隠しておいて、マウスオーバーで表示させる */
    #rhs{
        -moz-box-shadow:-3px 3px 3px #000000;
        white-space: nowrap;
        background:#fff!important;
        right: 0!important;
        top: 0!important;
        width: 15px!important;
        overflow:hidden;
    }
    #rhs:hover{
        background:#fff!important;
        right: 0!important;
        top: 0!important;
        width: 800px!important;
    }
}</pre>

[Googleの設定 — Gist][8]

今はこんな感じで、結果欄の横幅拡張、検索バーを固定、サイトの背景色を奇数で色分けなどを行っています。  
スクリーンショットで見ると以下のような感じになります。

[<img class="alignnone size-medium wp-image-2384" title="ss-2011-03-19-2" src="http://efcl.infol/wp-content/uploads/2011/03/ss-2011-03-19-2-300x205.png" alt="" width="300" height="205" />][9]

[<img class="alignnone size-medium wp-image-2381" title="ss-2011-03-19-5" src="http://efcl.infol/wp-content/uploads/2011/03/ss-2011-03-19-5-300x207.png" alt="" width="300" height="207" />][10]

[<img class="alignnone size-medium wp-image-2383" title="ss-2011-03-19-3" src="http://efcl.infol/wp-content/uploads/2011/03/ss-2011-03-19-3-300x205.png" alt="" width="300" height="205" />][11]

[<img class="alignnone size-medium wp-image-2382" title="ss-2011-03-19-4" src="http://efcl.infol/wp-content/uploads/2011/03/ss-2011-03-19-4-300x206.png" alt="" width="300" height="206" />][12]

また、先ほどGoogleのTwitter検索である&#8221;Google Realtime Search&#8221;のSITEINFOをwedataに書いておいたのでかなり快適になりました。  
(各種AutopagerizeでSITEINFOの更新を行えば適応されると思います)

*   [アイテム: Google Realtime Search &#8211; データベース: AutoPagerize &#8211; wedata][13]

思ったより地味ですが、こんな感じで使っています。  
[Google++ for Greasemonkey][14]を結構参考にしました。

 [1]: http://userscripts.org/scripts/show/65540 "Twitter search(ja) result on Google for Greasemonkey"
 [2]: http://gulfweed.starlancer.org/?En%20Google "En Google modified by Gulfweed"
 [3]: http://userscripts.org/scripts/show/98394 "Remove Google Redirection for Greasemonkey"
 [4]: https://addons.mozilla.org/ja/firefox/addon/google-date/ "Google Date :: Add-ons for Firefox"
 [5]: http://efcl.info/2011/0218/res2272/ "サイトの最終更新日をステータスバーに表示するアドオン「Google Date」"
 [6]: https://addons.mozilla.org/ja/firefox/addon/stylish/ "Stylish"
 [7]: http://efcl.info/2010/0512/res1692/ "userChrome.jsでメニュー拡張を追加できる「userMenu.js」"
 [8]: https://gist.github.com/877459 "Googleの設定 — Gist"
 [9]: http://efcl.infol/wp-content/uploads/2011/03/ss-2011-03-19-2.png
 [10]: http://efcl.infol/wp-content/uploads/2011/03/ss-2011-03-19-5.png
 [11]: http://efcl.infol/wp-content/uploads/2011/03/ss-2011-03-19-3.png
 [12]: http://efcl.infol/wp-content/uploads/2011/03/ss-2011-03-19-4.png
 [13]: http://wedata.net/items/48597 "アイテム: Google Realtime Search - データベース: AutoPagerize - wedata"
 [14]: http://userscripts.org/scripts/show/59333 "Google++ for Greasemonkey"