---
title: Gihubのcanonicalを除去するGreasemonkey
author: azu
layout: post
permalink: /2011/0601/res2788/
SBM_count:
  - '00003<>1355441902<>1<>0<>1<>1<>0'
dsq_thread_id:
  - 318605550
categories:
  - Greasemonkey
tags:
  - github
  - Greasemonkey
---
最近、Gihubのレポジトリでlink rel="canonical"が、treeのその時一番新しいものを示すようになっていて、そのためブックマークが分散したり、気持ち悪いURLを知らない間に登録していたりします。

なので、link rel="canonical"のタグを削除するGreasemonkeyを書いてみました。

*   [GitHub: remove canonical for Greasemonkey][1]

何でこんな仕様なのか意味不明なので、いずれは元に戻って欲しいです。(このGreasemonkeyは一応、仕様が変わったかどうかかもチェックしてます)

Githubはhisotyオブジェクトを使って[動的にURLを書き換えてる][2]のは知ってる人多いと思いますが、link rel="canonicalもそれにあわせて動的に書き換えています。   
$.attrで書き換えてるだけなので、link要素を削除してもエラーは特にでないようになっています。

link rel="canonicalはあった方がうれしいと思ってたけど、あると困るケースに遭遇したのは初めて。

 [1]: http://userscripts.org/scripts/show/103900
 [2]: http://d.hatena.ne.jp/zentoo/20101221/1292953257