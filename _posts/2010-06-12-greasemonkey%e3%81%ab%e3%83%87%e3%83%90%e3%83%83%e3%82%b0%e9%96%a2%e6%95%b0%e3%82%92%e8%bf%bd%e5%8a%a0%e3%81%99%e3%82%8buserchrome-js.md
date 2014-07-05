---
title: Greasemonkeyにデバッグ関数を追加するuserChrome.js
author: azu
layout: post
permalink: /2010/0612/res1754/
SBM_count:
  - '00007<>1355347239<>5<>0<>1<>1<>0'
dsq_thread_id:
  - 303420732
categories:
  - userChome.js
tags:
  - Firebug
  - Firefox
  - Greasemonkey
  - javascript
  - userChrome.js
---
以前、[GreasemonkeyにGrowlのような通知を呼ぶ機能を加える「Dbus Notify」 | Web scratch][1]でGreasemonkeyから使える機能を増やせたら楽しそうと書いたと書きましたが、[callout][2]のソースを参考にGreasemonkeyスクリプトから使える関数を追加するuseChrome.jsを書いてみました。



このuserChrome.jsを読み込むと、

<pre>fbug
Clipboard.get
Clipboard.set</pre>

などのメソッドがGreasemonkeyスクリプトから使えるようになります。  
fbugはconsole.logと同じ動作ですが、Firebugのウィンドウを開いていない状態(Firebugがオフ)でもFirebugのウィンドウを開いてからlogを出してくれる関数です。(元ネタは[xqjs][3])  
Clipboardの方はjetpack prototypeからのコピペなのであんまり確認してません。

当たり前ですがこのuseChrome.jsをインストールしてない人の環境ではfbugなどの関数は使えないため、デバッグ目的か自分用のGreasemonkeyに使用する感じになると思います。  
以下のようにデバッグ時のみ動く関数でラップしておけば、配布の際にDEBUG = false;とするだけでいいので楽かも知れません。

<pre class="brush:javascript;">var DEBUG = true;

    log("なんとか");
    // DEBUG - http://gist.github.com/428596
    function log() {
        if ( typeof DEBUG != 'undefined' && DEBUG ) {
            fbug.apply(this, arguments);
        }
    }</pre>

何かもっと便利なデバッグ関数とか作れそうな気がします。  
多分Greasemonkeyスクリプトからしか動かないようにできているので(あんまり自信ない)、そこまで危険な事は起こらないかと思いますが安全は保証できないので自己責任でというテンプレを入れておく。

**gist: 428596 &#8211; Greasemonkeyから使える関数を追加するuserChrome.js- GitHub**
:   [http://gist.github.com/428596][4]

 [1]: http://efcl.info/2010/0606/res1708/
 [2]: http://github.com/lackac/callout "lackac's callout at master - GitHub"
 [3]: https://addons.mozilla.org/ja/firefox/addon/159546/
 [4]: http://gist.github.com/428596 "gist: 428596 - Greasemonkeyから使える関数を追加するuserChrome.js- GitHub"