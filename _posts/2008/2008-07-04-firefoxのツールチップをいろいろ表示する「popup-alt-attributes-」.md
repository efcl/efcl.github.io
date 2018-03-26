---
title: Firefoxのツールチップをいろいろ表示する「Popup ALT Attributes 」
author: azu
layout: post
permalink: /2008/0704/res233/
SBM_count:
  - '00005<>1355432733<>5<>0<>0<>0<>0'
dsq_thread_id:
  - 300801754
categories:
  - アドオン
tags:
  - Firefox
  - アドオン
  - ステータスバー
  - ツールチップ
---
[XUL Apps > Popup ALT Attributes][1]自体は多分Firefoxでも有名なアドオンだと思いますが、これの機能はaltの内容をポップアップするだけではなく他の要素もポップアップすることができます。

about:configでbrowser.chrome.tooltips.attrlist.enabledという名前の真偽値を作るtrueにします。  
そしてbrowser.chrome.tooltips.attrlistという名前の文字列を作り、ポップしたい要素を入力します。  
要素は|で区切ることで複数の要素を使えます。  
alt|src|data|title|href|cite|action|onclick|onmouseover|onsubmit

普段機能しているのはaltという要素のみですが、alt|titleというように変えれば下の用に複数の要素がツールチップとして表示されます。

[<img src="https://efcl.info/wp-content/uploads/2008/07/cap003-212x300.png" alt="" title="cap003" width="212" height="300" class="alignnone size-medium wp-image-234" />][2]

何が便利なの？って言うのは人それぞれですが、自分は[autoHideStatusbar][3]を使っていて、リンク上に乗っている時にステータスバーを表示する必要がなくなりました。(リンク上でステータスバーを表示するという設定のこと)

piroさんが作るアドオンには隠し機能見たいのが結構あるので見直してみると意外な事があるかも知れません。

 [1]: http://piro.sakura.ne.jp/xul/_popupalt.html
 [2]: https://efcl.info/wp-content/uploads/2008/07/cap003.png
 [3]: http://caspar.regis.free.fr/ahs/
