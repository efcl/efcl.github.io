---
title: ニコニコ動画の検索履歴を保存するGreasemonkey
author: azu
layout: post
permalink: /2011/0506/res2733/
SBM_count:
  - '00024<>1355446964<>21<>0<>2<>1<>0'
dsq_thread_id:
  - 301181540
categories:
  - Greasemonkey
  - ニコニコ動画
tags:
  - Greasemonkey
  - ニコニコ動画
  - 検索
---
今のニコニコだと好きな動画を探すときに、特定の検索をして探すって感じの場合が多くなってきた気がするので、検索履歴を保存して表示できるGreasemonkeyを書いてみました。

- [azu/nico-search-history](https://github.com/azu/nico-search-history "azu/nico-search-history")

検索画面の右上の方にボタンが出るようになるので、それをクリックすると検索した履歴が表示されます。   
検索履歴は検索キーだけではなくてsort方法によっても別々に保存されます。

[<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/05/image_thumb8.png" border="0" alt="image" width="145" height="186" />][2][<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/05/image_thumb9.png" border="0" alt="image" width="200" height="240" />][3]

また、検索キーの横にある☆マークをクリックすることで、その検索キーを常に上の方に表示して、自動的に削除されないようにします。(お気に入り機能)   
お気に入りではない検索キーは100個ぐらいで自動的に削除されます。

**コード内容**

これを書き始めたとき[Sandbox Pattern][4]を試してみたくて書いてたので、あんまり見ない書き方をしてると思う。   
それぞれ必要な部品をモジュールhistory,templeteとして定義して、必要な時に   
Sandbox(&#8220;history&#8221;, function(box) { … }) という感じで使うというような書き方になってる。

- [azu/nico-search-history](https://github.com/azu/nico-search-history "azu/nico-search-history")

 [1]: http://userscripts.org/scripts/show/102371
 [2]: https://efcl.info/wp-content/uploads/2011/05/image8.png
 [3]: https://efcl.info/wp-content/uploads/2011/05/image9.png
 [4]: https://efcl.info/adiary/JavaScriptPatterns/Chapter5ObjectCreationPatterns#k93p5
 [5]: https://github.com/azu/Greasemonkey/tree/master/nico_search_history
