---
title: 'Firefox4でcan&#8217;t wrap XML objectsというエラーが出る件について'
author: azu
layout: post
permalink: /2011/0326/res2406/
SBM_count:
  - '00007<>1355447799<>7<>0<>0<>0<>0'
dsq_thread_id:
  - 301504807
categories:
  - Greasemonkey
tags:
  - css
  - Firefox
  - Firefox4
  - Greasemonkey
  - javascript
  - エラー
---
Firefox4にしてから主にGreasemonkeyのGM_addStyleメソッドで

*TypeError: can&#8217;t wrap XML objects***

というエラーが出たりすることがあります。  
これは[Bug 609143 – E4X XML objects cannot be passed to sandbox][1]のsandbox内でのE4X(XML)の挙動が変わった(意図的に)のが原因らしいです。(あまり詳しくないので&#8230;)

<pre class="brush:javascript;">GM_addStyle(&lt;&gt;&lt;![CDATA[ 
/* 適当なCSSのコード*/
    .clearfix:after {
        content: ".";  /* 新しい要素を作る */
        display: block;  /* ブロックレベル要素に */
        clear: both;
        height: 0;
        visibility: hidden;/*表示はしない*/
    }
 ]]&gt;&lt;/&gt;)</pre>

のような感じでE4X(XML)を直接GM_addStyleに渡しているときなどに起きています。  
これを回避するためには、E4X(XML)を明示的に文字列化して渡せばよい見たいです。

<pre class="brush:javascript;">GM_addStyle(String(&lt;&gt;&lt;![CDATA[
/* CSSコード */
]]&gt;&lt;/&gt;));</pre>

のようにString(E4X)するか、E4X全体をtoString()、&#8221;&#8221;+E4X のような感じで文字列化すればいい。  
もしくはGreasemonkeyにはメタ情報に// @resource CSS example.css という感じで、CSSファイルをロードできるので、そのファイルをGM\_addStyle(GM\_getResourceText(&#8216;CSS&#8217;));して使うなどでもいいと思います。

*   [@require, @resource of Greasemonkey &#8211; KBDAHOLIC &#8211; やぬすさんとこ][2]

もしくは下のようにGM_addStyleを書き換えてしまう事でも回避できそうです。(あんまり推奨しないけど)

<pre class="brush:javascript;">function GM_addStyle(css) {
    if (!GM_addStyle.style) {
        var head = document.getElementsByTagName("head")[0] ||
                document.documentElement;
        if (!head) {
            return;
        }
        GM_addStyle.style = document.createElement('style');
        GM_addStyle.style.type = 'text/css';
        head.insertBefore(GM_addStyle.style, head.firstChild);
    }
    GM_addStyle.style.appendChild(document.createTextNode(css) + 'n');
}</pre>

書き換えの参考

*   [GM_addStyleの実装と最適化 &#8211; 0xFF][3]
*   [Surefire DOM Element insertion « Paul Irish][4]

[Constellation&#8217;s gist: 803115 — Gist][5]のようにTomblooパッチでGM_addStyleの挙動を変えてしまおうと思ったけどよく分からなくなってあきらめました。

参考

*   [Firefox 4.0b8～b9 でLDRize (Minibufferの修正) &#8211; wltの日記][6]

 [1]: https://bugzilla.mozilla.org/show_bug.cgi?id=609143
 [2]: http://d.hatena.ne.jp/janus_wel/20090111/1231670076
 [3]: http://d.hatena.ne.jp/os0x/20090123/1232734667
 [4]: http://paulirish.com/2011/surefire-dom-element-insertion/
 [5]: https://gist.github.com/803115
 [6]: http://d.hatena.ne.jp/wlt/20110106/1294306315