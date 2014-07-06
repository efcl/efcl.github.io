---
title: Firefoxのショートカットを便利にするLDRizeとアドオン
author: azu
layout: post
permalink: /2008/0130/res41/
SBM_count:
  - '00020<>1355415401<>14<>2<>2<>2<>0'
dsq_thread_id:
  - 300801358
categories:
  - Firefox
  - Greasemonkey
tags:
  - Firefox
  - Greasemonkey
  - アドオン
  - 拡張機能
---
Firefoxでは元から様々ショートカットがあります。  
それを有効に活用するのも重要ですが配置が悪かったり、もっと便利にキーボードを使うための記事です。

<!--more-->

デフォルトからのショートカットキーは下記に書いてあります。  
Ctrl +数字 のタブのショートカットキーは意外と知らなかったりしましたが、指がつりそうな配置です。

[<img src="http://favicon.aruko.net/s/f/http://lesliefranke.com/files/reference/firefoxcheatsheet.html" alt="" width="13" height="13" /> Mozilla Firefox Cheat Sheet][1]

LDRizeというアドオンはショートカットキーでページをスクロールしたり、フレームで開いて中身を確認できたり、  
ピンを立てて一気に開いたりできます。  
LivedoorReaderやFastLadderのようなショートカットキーを多くのページでできるようになるグリモンです。  
上から順番にGreasemonkeyスクリプトをインストール

Minibufferに依存しているので先にMinibufferをインストールしてください  
<a rel="nofollow" href="http://userscripts.org/scripts/show/11759">http://userscripts.org/scripts/show/11759</a>

AutoPagerizeと組み合わせると こうかはばつぐんだ  
<a rel="nofollow" href="http://userscripts.org/scripts/show/8551">http://userscripts.org/scripts/show/8551</a>

LivedoorReaderやFastLadderのようなショートカットキーを色々な場所で利用可能にするGreasemonkeyです  
<a rel="nofollow" href="http://userscripts.org/scripts/show/11562">http://userscripts.org/scripts/show/11562</a>

これは**順番が大事なので、もし順番を違った場合はスクリプトの管理画面で  
Alt+ドラッグで**

Minibuffer  
AutoPagerize  
LDRize

となるようにしてください。

<blockquote title="silog - script/LDRize">
  <p>
    とりあえずgoogleで F [ESC] J J O(オー) P P K K L L O(オー)の順にキーを押せば使い方が分かるかも 。
  </p>
</blockquote>

との事なので、[silog &#8211; script/LDRize][2]を参考にやってみてば慣れると思います。(Shift + ?でヘルプが出ます。)  
IMEを切ってないと無効になるので注意。  
使えないページもあります。

Ggreasemonkeyスクリプトなので、管理画面から編集すれば細かい設定を変えれるようになっています。  
自分はLDRize::toggle-smooth-scroll(ぬるぬるスクロール)をflaseにして  
DEFAULT_HEIGHTを100にしています。

まずショートカットキーを簡単に変更するためのアドオンを導入します。

[keyconfig 20060828 日本語版 ショートカットキーの設定を変更する拡張機能][3]

そして設定画面で、左のタブへ移動するコード

<pre>gBrowser.mTabContainer.advanceSelectedTab(-1,true);</pre>

右のタブへ移動するコード

<pre>gBrowser.mTabContainer.advanceSelectedTab(1,true);</pre>

を作成してそれぞれにショートカットキーとして自分の好みでキーを与える。  
自分は,と.を使用しています。  
他のタブ移動のショートカットなんかは[Firefox のタブ移動ショートカットキー][4]が参考になると思います。

これで左手はキーボードで右手でマウスを使うような感じの環境ができます。

 [1]: http://lesliefranke.com/files/reference/firefoxcheatsheet.html
 [2]: http://white.s151.xrea.com/wiki/index.php?script%2FLDRize
 [3]: http://mozilla.seesaa.net/article/2243568.html
 [4]: http://wildlifesanctuary.blog38.fc2.com/blog-entry-123.html