---
title: Twitterへ見ているサイトを投稿するGreasemonkey「Post Now browsing to Twitter」更新
author: azu
layout: post
permalink: /2010/0221/res1569/
SBM_count:
  - '00010<>1355395567<>9<>0<>0<>1<>0'
dsq_thread_id:
  - 303410257
categories:
  - Greasemonkey
tags:
  - Greasemonkey
  - twitter
  - UI
  - ショートカット
---
今見ているサイトのURLをコメントとともにTwitterに投稿するGreasemonkeyである[Post Now browsing to Twitter][1]を更新したので更新内容について。  
どんな感じのものかは以前の記事を見てください。

**今見ているサイトをTwitterに投稿する「Post Now browsing to Twitter」 | Web scratch**
:   [http://efcl.info/2009/0929/res1369/][2]

### 更新点

*   入力UIの変更

[<img class="size-medium wp-image-1570 alignnone" title="sshot-2010-02-21-1" src="http://efcl.infol/wp-content/uploads/2010/02/sshot-2010-02-21-1-300x58.png" alt="" width="300" height="58" />][3]

今まではコメントの入力を通常のプロンプトで行っていましたが、入力用のテキストエリアをショートカットを押した際に表示する用にしました。  
コメントするUIとポストした際の並びに統一感がでたのと、コメントの入力に対してリアルタイムで合計の文字数をカウントアップします。(140文字をオーバーしても自動でタイトルを切って140文字に納めるのでカウントアップにしてます。)  
**コメント入力後(未記入でもOK)Ctrl+Enterを押すとTwitterにポストします。**  
**コメント入力をキャンセルしたい場合はESCキーを押すことでキャンセルできます。**

また、promptの時とは違いテキストエリアで入力するので、[モーダルダイアログ][4]のように入力欄が表示されているとき、ページ上のテキストを選択できないということがなくなります。

後は細かい修正。  
インストールは[こちら][1]から

**Post Now browsing to Twitter**
:   [http://userscripts.org/scripts/show/46441][5]

 [1]: http://userscripts.org/scripts/show/46441
 [2]: http://efcl.info/2009/0929/res1369/ "今見ているサイトをTwitterに投稿する「Post Now browsing to Twitter」 | Web scratch"
 [3]: http://efcl.infol/wp-content/uploads/2010/02/sshot-2010-02-21-1.png
 [4]: http://e-words.jp/w/E383A2E383BCE38380E383ABE38380E382A4E382A2E383ADE382B0.html
 [5]: http://userscripts.org/scripts/show/46441 "Post Now browsing to Twitter"