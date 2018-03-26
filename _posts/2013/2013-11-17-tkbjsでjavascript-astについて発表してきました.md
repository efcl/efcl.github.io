---
title: tkbjsでJavaScript ASTについて発表してきました
author: azu
layout: post
permalink: /2013/1117/res3481/
dsq_thread_id:
  - 1973298663
categories:
  - javascript
tags:
  - AST
  - javascript
---
[オフラインJavaScript勉強会 &#8211; Online Study TokyoBouldering.js | Doorkeeper][1]でJavaScript ASTについて発表してきました。

<div class="kwout" style="text-align: center;">
  <a href="https://azu.github.io/slide/tkbjs/js-ast-walker.html#0"><img src="http://kwout.com/cutout/u/ze/q3/6t9.jpg" alt="http://azu.github.io/slide/tkbjs/js-ast-walker.html#0" title="JavaScript AST Walker" width="600" height="391" style="border: none;" /></a> <p style="margin-top: 10px; text-align: center;">
    <a href="http://azu.github.io/slide/tkbjs/js-ast-walker.html">JavaScript AST Walker</a>
  </p>
</div>

JavaScript ASTがどんなものかや、どのようなツールで使われてるか、ASTを編集するのにどういうライブラリがあるかなどについて書いてあります。  
(中でかなり重たいものを読み込んでるのでロードが終わるまで適応に待ったほうがいいです)

JS ASTを触る練習のためにQUnitのテストをJasmineに変換する[reQUnit][2]というものを書いていたましたが、  
ASTをセレクタで選択したり、変更したりするのがもっと楽にできたりするともっとカジュアルにASTを触れるようになる気がします。

後、自己紹介もかねて[ここ最近のJSer.infoについて][3]も話しました。

 [1]: http://tkbjs.doorkeeper.jp/events/6786 "オフラインJavaScript勉強会 - Online Study TokyoBouldering.js | Doorkeeper"
 [2]: https://github.com/azu/reQUnit "reQUnit"
 [3]: http://azu.github.io/slide/tkbjs/jser_info_2013.html#2 "ここ最近のJSer.infoについて"
