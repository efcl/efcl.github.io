---
title: Node.jsで動作するHTML5+JavaScript製のIDE「Cloud9」
author: azu
layout: post
permalink: /2010/0926/res1960/
SBM_count:
  - '00016<>1355446191<>13<>0<>1<>2<>0'
dsq_thread_id:
  - 301203530
categories:
  - javascript
tags:
  - Git
  - IDE
  - javascript
  - Node.js
---
Node.jsで動作しブラウザから使用できるJavaScript IDEである「[Cloud9 IDE][1]」 alpha版が公開されました。  
ブラウザから使用できるので、クラウドとかありきたりな名前が付いてる気がします。(+Plan9?)  
Win/Linux/Macで動作するようです。

### インストール方法(Windows)

詳しい使い方は[ajaxorg&#8217;s cloud9 at master &#8211; GitHub][2]に書いてあるので読むといいです。  
まずはダウンロードですが、githubではzipでソースをダウンロードできますが、それではなくgit cloneしてダウンロードする必要があるみたいです。  
というわけで、gitをインストールした状態でコマンドプロンプトから

<pre>$ git clone git://github.com/ajaxorg/cloud9.git
</pre>

するとcloud9のディレクトリができるので、binフォルダに入っている**cloud9-win32.bat**を実行すると必要なファイルをどんどんダウンロードしてくれます。(インストーラーみたいで面白い)  
ダウンロードが終わってもう一度cloud9-win32.batを実行すると <http://localhost:3000> にアクセスするように促されるので、FirefoxやChromeなどでhttp://localhost:3000にアクセスすればCloud9 IDEが使用できます。(別途にNode.jsをインストールしてなくても動作した)

[][3][<img class="alignnone size-medium wp-image-1961" title="4131eae1696573feef9fe1e72bf86c80" src="http://wordpress.local/wp-content/uploads/2010/09/4131eae1696573feef9fe1e72bf86c80-300x221.png" alt="" width="300" height="221" />][3]

まだα版なので、ファイル管理とエディタとコンソールぐらいしかありませんが、ブラウザ上でこういうものが動いてるのは面白いです。エディタはBespinとかと同じく日本語入力が残念仕様です。  
最近Bespinは<span id="text25572274759" class="status">Skywriterというプロジェクトへと移行したので、そのうちエディタに変化が起きるかも知れませんね。<br />入力したコードはNode.js上で実行されてるような気がします。JavaScriptを書いてその場で実行やデバッグができるのは普通のIDEとしてはよくありますが、JavaScriptなIDEとしては面白いですね。</span>

<span class="status">通常のソフトウェアとしてのJavaScript IDEを使いたい人は</span>[JavaScript対応のIDEをまとめてみた | Web scratch][4]を参照するとよいと思います。(今[WebStorm][5]凄いよ状態でいろいろ試しています)

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow: hidden;">
  <a href="http://www.cloud9ide.com/">Cloud9 IDE &#8211; Ajax.org</a>
</div>

 [1]: http://www.cloud9ide.com/
 [2]: http://github.com/ajaxorg/cloud9
 [3]: http://wordpress.local/wp-content/uploads/2010/09/4131eae1696573feef9fe1e72bf86c80.png
 [4]: http://efcl.info/2010/0920/res1952/
 [5]: http://www.jetbrains.com/webstorm/index.html