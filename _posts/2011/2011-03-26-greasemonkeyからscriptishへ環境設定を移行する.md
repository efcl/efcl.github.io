---
title: GreasemonkeyからScriptishへ環境設定を移行する
author: azu
layout: post
permalink: /2011/0326/res2411/
SBM_count:
  - '00066<>1355439131<>59<>0<>5<>2<>0'
dsq_thread_id:
  - 300803136
categories:
  - Greasemonkey
tags:
  - Firefox
  - Greasemonkey
  - NILScript
  - Scriptish
  - 設定
---
Greasemonkeyから[Scriptish][1]への環境移行メモです。  
[Scriptish][1]については[Scriptish wiki!][2]や[Scriptish （Greasemonkey フォーク版） キタ━━━ヽ(ﾟ∀ﾟ)ﾉ━ &#8211; hogehoge @teramako][3]を見るとよいです。  
簡単にまとめると、使えるAPIが増えた(開発者的にうれしい)、管理画面の設定項目がGreasemonkeyより豊富(Greasemonkey0.9で削られたinclude,excludeの設定もGUIからできます)、UIが日本語化されてる(ちょっと分かりづらい訳だけど…)  
Greasemonkeyからフォークしてるので、Greasemonkey向けに書かれたスクリプト自体の互換性は問題ないです。  
逆にScriptishの新APIを使ったものはGreasemonkeyでは動かない事があるぐらいだと思います。

### 環境の移行方法

[How To: Manually transfer user scripts from Greasemonkey to Scriptish &#8211; GitHub][4]  
に手動での環境移行手順が書かれています。  
簡単に書き出してみると

1.  スクリプトフォルダ名はgm\_scriptsからscriptish\_scriptsになった  
    (フォルダの中のconfig.xmlや配置自体は同じなのでフォルダ名だけ変更すればOK)
2.  `prefs.jsへスクリプトの設定の保存書式が変更された<br />これが移行時にネックになってる大きな変更で、GM_setValueなどGreasemonkeyスクリプトから値を保存するとpref.jsに書き込まれますが、そのときの書式が変わっているためGreasemonkey時に保存した値が引き継がれません。<br />一応手動での書き換え手順も書かれています。<br />greasemonkey.scriptvals から extensions.scriptish.scriptvals へ置換する<br />スクリプト名とネームスペースの間の/を@に置き換える`

ネームスペースとスクリプト名の位置も逆転してまたスペースなど除去されてたりします。  
手動でやっても結構手間がかかるので、大事なものだけやって、後は普通に設定し直した方が楽だと思います。  
一応、自動的にできるように[NILScrip][5]tで[GreasemonkeyToScriptish.ng][6]というものを作ってみました。

<pre>pref.jsに保存された値をGreasemonkeyからScriptishの書式へ変更する
    pref.jsと同じディレクトリにこのngスクリプトを置いて実行するとnew_pref.jsが生成される。</pre>

実行する前にpref.jsのバックアップをとっておいてから、pref.jsと同じディレクトリにおいて実行すると、それぞれの値を書き換えたnew_pref.jsというのができるので、後はpref.jsのコピーし直すかpref.jsにリネームして使うなどしてください。  
不完全かもしれないので、保証はできません。

*   [utilityTools/Greasemonkey/GreasemonkeyToScriptish.ng at master from azu/NILScript &#8211; GitHub][7]

### Dropboxフォルダでスクリプト管理

これを期にGreasemonkeyスクリプトのファイル自体をDropboxで共有しようと思ったので、移行手順の1の時にDropboxにgm\_scriptsフォルダを移して、プロファイルフォルダにscriptish\_scriptsへのシンボリックリンクを作りました。  
Windowsだとmklinkとかコマンドラインがややこしいので、[Link Shell Extension][8]を使ってシンボリックリンクを張りました。

*   [隙間マニュアル: Dropboxで任意のフォルダやファイルを同期する方法][9]
*   [窓の杜 &#8211; 【REVIEW】エクスプローラ上で手軽にシンボリックリンクを作成「Link Shell Extension」][10]

このソフトを使えば普通のショートカットみたいにシンボリックリンクが貼れるので簡単。  
(シンボリックリンクのフォルダ名をちゃんとscriptish_scriptsにするのを忘れない)

追記:起動時に変更がたくさんある(Dropbox共有してると起きやすい)とnotificationが大量に通知されて使い物にならないので、  
[Manual: Preferences &#8211; GitHub][11]を参考にabout:configのextensions.scriptish.enableScriptRefreshing を false にして変更の監視をオフにしました。副作用として、スクリプトのメタブロックを書き換えても反映されなくなると思います。  
(Greasemonkey0.8あたりと同じ動作になると思う)

これでGreasemonkeyからScriptishへの移行手順は終わりです。  
Firefox4への移行と同時にGreasemonkeyもScriptishへ移行を行えば、無駄なスクリプトを削除できたり汚れたpref.jsも掃除できるので同時期にやると良いかと思います。([使ってないGreasemonkeyスクリプトを削除するngスクリプト][12]も以前書きました)  
まだどっちのアドオンが優れてるのかはよく分かってないので、使ってるうちに何らかの違いが分かるんではないかと。  
(Scriptish向けのスクリプトってなんて呼べば良いんだろ?)

 [1]: https://addons.mozilla.org/ja/firefox/addon/scriptish/
 [2]: https://github.com/erikvold/scriptish/wiki
 [3]: http://d.hatena.ne.jp/teramako/20100930/p1
 [4]: https://github.com/erikvold/scriptish/wiki/How-To%3A--Manually-transfer-user-scripts-from-Greasemonkey-to-Scriptish
 [5]: https://github.com/azu/NILScript/wiki
 [6]: https://github.com/azu/NILScript/tree/master/utilityTools/Greasemonkey
 [7]: https://github.com/azu/NILScript/blob/master/utilityTools/Greasemonkey/GreasemonkeyToScriptish.ng
 [8]: http://schinagl.priv.at/nt/hardlinkshellext/hardlinkshellext.html
 [9]: http://sukima-manual.seesaa.net/article/113336296.html
 [10]: http://www.forest.impress.co.jp/article/2008/12/11/linkshellext.html
 [11]: https://github.com/erikvold/scriptish/wiki/Manual%3A-Preferences
 [12]: https://efcl.info/2010/1021/res2008/ "使ってないGreasemonkeyスクリプトを削除・整理するNILScript"
