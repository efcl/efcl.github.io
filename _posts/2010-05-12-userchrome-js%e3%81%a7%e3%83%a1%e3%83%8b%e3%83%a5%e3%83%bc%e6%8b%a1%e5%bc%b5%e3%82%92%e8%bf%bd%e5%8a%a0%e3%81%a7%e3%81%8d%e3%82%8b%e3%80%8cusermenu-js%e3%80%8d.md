---
title: userChrome.jsでメニュー拡張を追加できる「userMenu.js」
author: azu
layout: post
permalink: /2010/0512/res1692/
SBM_count:
  - '00014<>1355430711<>8<>0<>3<>3<>0'
dsq_thread_id:
  - 300802538
categories:
  - userChome.js
tags:
  - Firebug
  - Firefox
  - Greasemonkey
  - javascript
  - userChrome.js
  - アドオン
---
userChrome.jsで[JavaScript Actions][1]のようなスクリプトの実行コマンドをサブメニューのネスト, タブメニューやメインメニュー、コンテキストメニューなどのメニューに追加する形のスクリプトを扱いやすくしたり、GreasemonkeyのAPIと似たような機能を持つライブラリが使える要にするuserMenu.jsの紹介
ダウンロードは以下の場所から
**userChrome.js &#8211; Mozilla Firefox まとめサイト**
:   [http://firefox.geckodev.org/index.php?cmd=read&page=userChrome.js&word=user#g4f5f928][2]

いろいろバージョンが置かれてますが<a class="ext" rel="nofollow" href="http://loda.jp/script/?id=95"><strong class="word0">user</strong>Menu.js ver. 1.21mod 一式(Fx3以降)</a>と最新のものをダウンロードして、ver1.21はあらかじめtabmenuなどのフォルダがあって分かりやすいので、それらを最新版で上書きすると良いでしょう。

こんな感じのファイルが入ってるので、とりあえず動作させるために、FirefoxプロファイルのChromeフォルダにそのまま中身を突っ込みます。

<pre>Chrome
│  0.UCJSToolkit.uc.js
│  GM_modoki.jsl
│  jsa.jsl
│  JSA_modoki.jsl
│  preload.sample.txt
│  scripting.txt
│  userMenu.js.readme.txt
│  userMenu.pl.js
│  userMenu.uc.js
│  ここにはuserChrome.jsなども存在
│
├─contextmenu
│      Add Copy.se.js
│      Element Killer.js
│      Google cache.nl.js
│      Google Translate.se.js
│      Open IE.nl.js
│      Open Selection.se.js
│      Reload Image.im.js
│      Use JavaScript.auto.js
│      Wayback.nl.js
│
├─tabmenu
│  └─Order.ct
│          FrameOrder.ct.auto.js
│          ImageOrder.ct.auto.js
│          JSOrder.ct.auto.js
│          PluginOrder.ct.auto.js
│          RedirectOrder.ct.auto.js
│          userContentOrder.ct.auto.js
│
└─toolmenu
        0000.アドオンリストをタブに表示.L.js
        Inspection Here.js
        Rebuild User Menu.js
        Reload userContent.css.js
        Restart Firefox.r.js
        ~.---
</pre>

移動させて再起動すると、コンテキストメニューやツールメニューにいろいろな項目が増えていれば成功です。

一つ一つのスクリプトの機能は数が多いので適当に見れば分かるので、開発したスクリプトをメニューに表示させる方法へ。scripting.txtやuserMenu.js.readme.txtを見ると詳しく書いてありますが、contextmenuやtoolmenuといったフォルダがそのままの構成でメニューと対応してるので、それらのフォルダに作ったスクリプトをjs拡張子にして入れるだけで簡単に登録できます。(スクリプトのファイル名ルールでショートカットなども設定できる)  
例えば、右クリックに表示されるスクリプトで複数のものを一つのフォルダに入れれば、それが一つの階層になります。

<pre>contextmenu
└─JSAction
        Add Copy.se.js
        Element Killer.js
</pre>

また先ほど紹介したようにGreasemonkeyのAPIと同様の機能を持ったものが一部使えます。  
GM\_setValueやGM\_xmlhttpRequestなど。

デバッグ方法としてconsole.ほげ()というFirebugで使われるメソッドが使用できると書いてあるのですが、イマイチ動かなかったので、  
GM_modoki.jsl (GreasemonkeyのAPIを定義してるファイル)の先頭部分に

<pre class="brush:javascript;">// fbug(x)でFirebugのコンソールに出力
function main(){
  var windowManager = Components.classes&#91;'@mozilla.org/appshell/window-mediator;1'&#93;
                                .getService(Components.interfaces.nsIWindowMediator);
  return windowManager.getMostRecentWindow("navigator:browser");

}
function fbug(x){
   var {Firebug} = main();
   if(Firebug.Console.isEnabled() && Firebug.toggleBar(true, 'console'))
     Firebug.Console.logFormatted(Array.slice(arguments));
   return x;
}
</pre>

と書き足して、fbug(x)でFirebugのコンソールに出力するようにしました。  
Services.jsmが使えるなら以下のような感じで書けるようです。[xqjs &#8211; ’ellaneous][3] が元ネタです。

<pre class="brush:javascript;">Cu.import('Services.jsm');// 読み込み先にresource:// かfile://
function main() Services.wm.getMostRecentWindow('navigator:browser');
function fbug(x){
   var {Firebug} = main();
   if(Firebug.Console.isEnabled() && Firebug.toggleBar(true, 'console'))
     Firebug.Console.logFormatted(Array.slice(arguments));
   return x;
}
</pre>

上記のfirebugコンソールへの出力は[xqjs][4]のソースコードを見て知ったものです。  
**[xqjs][3]**は<a href="http://code.google.com/p/executejs/" target="_blank">Execute JS</a>のようなその場でChromeやcontentに対してJavaScript実行できるアドオンです。  
話題の[CoffeeScript][5]や**JavaScriptの単語補完**、マクロ機能、便利なユーティティ関数などが使える優れたFirefoxアドオンなので、[JavaScript Shell][6]やFirebugのコンソールで入力するのが微妙だなーと思う人は一度使って見るといいかと思います。  
`fbugでFirebugのコンソールにもlogを吐けるので連携させるとなお便利。<br />Firebugで定義されているXpathやCSSセレクタもマクロで定義されており、copy関数なども存在します。`

詳しくは作者さんのページとAMOとソースを読む。

**xqjs &#8211; ’ellaneous**
:   [http://d.hatena.ne.jp/murky-satyr/20100504/xqjs][7]

話が完全にすり替わりましたが、userMenu.jsはuserChrome.jsを書く上でかなり便利だと思うので、一度見てみることを進めます。

**userMenu.js**
:   [http://firefox.geckodev.org/index.php?cmd=read&page=userChrome.js&word=user#g4f5f928][8]

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow: hidden;">
  <dl>
    <dt>
      <strong>userChrome.js &#8211; Mozilla Firefox まとめサイト</strong>
    </dt>
    
    <dd>
      <a title="userChrome.js - Mozilla Firefox まとめサイト" href="http://firefox.geckodev.org/index.php?cmd=read&page=userChrome.js&word=user#g4f5f928">http://firefox.geckodev.org/index.php?cmd=read&page=userChrome.js&word=user#g4f5f928</a>
    </dd>
  </dl>
</div>

 [1]: http://firefox.geckodev.org/index.php?JavaScript%20Actions "JavaScript Actions"
 [2]: http://firefox.geckodev.org/index.php?cmd=read&page=userChrome.js&word=user#g4f5f928 "userChrome.js - Mozilla Firefox まとめサイト"
 [3]: http://d.hatena.ne.jp/murky-satyr/20100504/xqjs
 [4]: https://addons.mozilla.org/ja/firefox/addon/159546
 [5]: http://outgoing.mozilla.org/v1/70902f1cc617f6ab9569a48e3398cbef2a14c6ab/http%3A//jashkenas.github.com/coffee-script/
 [6]: http://www.squarefree.com/shell/
 [7]: http://d.hatena.ne.jp/murky-satyr/20100504/xqjs "xqjs - ’ellaneous"
 [8]: http://firefox.geckodev.org/index.php?cmd=read&page=userChrome.js&word=user#g4f5f928 "userMenu.js"