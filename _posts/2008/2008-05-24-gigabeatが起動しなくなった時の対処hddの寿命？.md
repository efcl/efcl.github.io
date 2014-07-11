---
title: 'Gigabeatが起動しなくなった時の対処[HDDの寿命？]'
author: azu
layout: post
permalink: /2008/0524/res195/
SBM_count:
  - '00000<>1355447234<>0<>0<>0<>0<>0'
dsq_thread_id:
  - 301015540
categories:
  - ハードウェア
tags:
  - DAP
  - HDD
  - トラブル
---
[<img class="alignnone size-medium wp-image-197" title="dsc00555" src="http://efcl.info/wp-content/uploads/2008/05/dsc00555-300x225.jpg" alt="" width="300" height="225" />][1]

3年ぐらい使ってきたDAP(Digital audio player)であるgigabeatF20がシステムエラー00000010というの吐き、起動中に落ちたりするようになったので、対処法を探してみた。  
[Rockbox][2]という代替えのファームウェアを使用していたので、それが原因かなと思い、とりあえず初期のファームウェアに戻そうとしてみたのですが、起動途中で落ちてしまうのでPCと繋げなかったけど、思考錯誤しているうちに繋げた。  
具体的には下の方法と全く同じでした。(先に見とけばよかった。)  
[ ][2]

<div class="quote">
  <blockquote title="gigabeat F/Xシリーズ part3">
    <p>
      本体からHDDを外して電源をオンにする。<br /> ↓<br /> NO SYSTEM ERRORって表示される<br /> ↓<br /> PCにUSBで繋ぐ<br /> ↓<br /> 画面がUSBモードに切り替わる
    </p>
  </blockquote>
  
  <p>
    <cite><a href="http://bubble6.2ch.net/test/read.cgi/wm/1199022693/">gigabeat F/Xシリーズ part3</a></cite>
  </p>
</div>

という感じでUSBを繋いで認識できたので何とか修復できるかなと思ったのですが、Gigabeat内のHDDにアクセスしてもI/Oエラーがでてアクセスできなかったので、GigabeatのHDDが死んだかHDDを繋ぐコネクタに何が異常があったのどちらかなので、分解してみる事にした。

<span style="color: #ff0000;">分解すると保証が受られなくなるので注意</span>

<span style="color: #000000;">分解と言っても、下底の蓋を外し、4つのねじを回すだけです。(メガネ用のドライバで外せた)<br /> 今回は<strong>HDDの方なので正面(液晶側)の蓋は外さないようにしときましょう。</strong><br /> </span>

[<img class="alignnone size-medium wp-image-196" title="dsc00557" src="http://efcl.info/wp-content/uploads/2008/05/dsc00557-300x225.jpg" alt="" width="300" height="225" />][3]

見事にHDDを繋ぐ端子の部分が見えちゃってますね。（白い透明のとこ）  
これはちゃんと押し込めるので、しっかりと押し込んで蓋を閉じます。

そしてバッテリをOFFして再起動してみたた見事復活しました。

そして再びRockboxを入れて完了。最近では[Rockbox Utility][4]という便利なソフトがあるのでそれを使うと簡単に導入できるみたいです。  
最近はKENWOODの [<span class="index_title">HD30GB9</span>][5]に浮気していましたが、gigabeatFシリーズはかなりいいDAPで上位機よりも柔軟に扱えるのでお気に入りの一つです。

*Rockboxは入れられる機種が限定されています。

 [1]: http://efcl.info/wp-content/uploads/2008/05/dsc00555.jpg
 [2]: http://www.rockbox.org/
 [3]: http://efcl.info/wp-content/uploads/2008/05/dsc00557.jpg
 [4]: http://www.rockbox.org/twiki/bin/view/Main/RockboxUtility
 [5]: http://www.kenwood.co.jp/j/products/home_audio/personal/hd30gb9/index.html