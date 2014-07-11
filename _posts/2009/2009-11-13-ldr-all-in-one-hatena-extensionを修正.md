---
title: LDR all-in-one Hatena extensionを修正
author: azu
layout: post
permalink: /2009/1113/res1459/
aktt_notify_twitter:
  - no
SBM_count:
  - '00003<>1355431921<>1<>0<>1<>1<>0'
dsq_thread_id:
  - 307748416
categories:
  - Greasemonkey
tags:
  - Firefox
  - Greasemonkey
  - LDR
  - はてな
---
**Fastladder まわり ( はてなまわり機能追加 ) &#8211; KBDAHOLIC &#8211; やぬすさんとこ**
:   [http://d.hatena.ne.jp/janus_wel/20090111/1231678843][1]

LDR all-in-one Hatena extension.user.jsが動かなくなっていたため、勝手に修正しました。

*   [LDR all-in-one Hatena extension.user.js][2]

はてなスター周りはばっさりカットしてしまった。  
なので、基本的な機能ははてなブックマーク数とコメント表示をするGreasemonkeyというもの。

修正点

**Greasemonkeyではwindow.evalが使えない、eval.call(window, src) &#8211; はてなダイアリー &#8211; 無料で簡単。広告のないシンプルなブログをはじめよう！**
:   [http://d.hatena.ne.jp/brazil/20060821/1156164845][3]

JSONをパースするために使われていた上のテクニック部分がエラーを吐いて動いてなかったので、ネイティブJSONを使ってみました。(Firefox3.5～だったかな。)  
[sabdbox周りの変更が原因][4]らしいです。

**gist: 233723 &#8211; GitHub**
:   [http://gist.github.com/233723][5]

 [1]: http://d.hatena.ne.jp/janus_wel/20090111/1231678843 "Fastladder まわり ( はてなまわり機能追加 ) - KBDAHOLIC - やぬすさんとこ"
 [2]: http://gist.github.com/raw/233723/c862aefd83bdf70702c21db45e998b6d94a5590f/LDR%20all-in-one%20Hatena%20extension.user.js
 [3]: http://d.hatena.ne.jp/brazil/20060821/1156164845 "Greasemonkeyではwindow.evalが使えない、eval.call(window, src) - はてなダイアリー - 無料で簡単。広告のないシンプルなブログをはじめよう！"
 [4]: http://twitter.com/os0x/statuses/5677129089
 [5]: http://gist.github.com/233723 "gist: 233723 - GitHub"