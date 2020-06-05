---
title: "JavaScriptの歴史については「JavaScript: The First 20 Years」を読む"
author: azu
layout: post
date : 2020-06-05T09:31
category: JavaScript
tags:
    - JavaScript
    - History

---

JavaScript/ECMAScriptというプログラミング言語の歴史について書いた文章は[Wikipedia](https://ja.wikipedia.org/wiki/JavaScript)などいろいろなものがあります。

その中でも、ECMAScript 2015のSpec EditorであるAllen Wirfs-Brockによって書かれた"JavaScript: The First 20 Years"が特におすすめです。

- [JavaScript: The First 20 Years](http://www.wirfs-brock.com/allen/posts/866)
- [JavaScript: The First 20 Years | Zenodo](https://zenodo.org/record/3710954)

"JavaScript: The First 20 Years"は[HOPL IV](https://hopl4.sigplan.org/) - History of Programming Languages向けに書かれたPaperです。
JavaScriptの誕生からECMAScriptの策定、ECMAScript/JavaScript各バージョンでの違い、ブラウザ戦争、Ajax、ブラウザ間の差異を吸収するライブラリ、策定が中止されたECMAScript 4のやり取り、ECMAScript 2015、CommonJSとNode.js、CoffeeScript、narcissus/Traceur/Babel/TypeScriptなどのTranspilerが果たした役割など、「JavaScriptの歴史」について書かれた文章です。

ブラウザのスクリプト言語を作る"Mocha"というコードネームで始まったJavaScriptについて。
10日でJavaScriptのプロトタイプ実装を作ったBrendan Eichの話や当時の動作、その背景などについてもいろいろな資料に基づいて書かれています。

![Mochaについて](https://efcl.info/wp-content/uploads/2020/06/05-1591318494.png)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">10日でプロトタイプ実装されて、<br>1年後に2週間で書き直されるJavaScript <a href="https://t.co/wWQgiqsXjW">pic.twitter.com/wWQgiqsXjW</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1258016898651811847?ref_src=twsrc%5Etfw">May 6, 2020</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

JavaScriptをIETFやW3Cなどではなく[Ecma International](https://www.ecma-international.org/)で標準化することなった経緯や
その際に"ECMAScript"という名前になる前に他の名前の候補があったと話などもあります。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ECMAScriptじゃない名前の候補色々。<br>Mochaを引きずったものが多い<a href="https://t.co/lAsTBPMX01">https://t.co/lAsTBPMX01</a> <a href="https://t.co/ChhPWUkx2E">pic.twitter.com/ChhPWUkx2E</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1258023056041111552?ref_src=twsrc%5Etfw">May 6, 2020</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

著者のAllenさんはMicrosoftでECMAScriptの仕様策定に関わり始めた話。
ECMAScript 4はいろいろな問題があったため、TC39のTG(Task Group)が別れて互換性のある仕様変更(ES 3.1、ES5)に取り組んだ話、そしてECMAScript 4の策定中止の流れなどについても詳細が書かれています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">60ページぐらい進んでやっと著者本人がでてきた。<a href="https://t.co/lAsTBPMX01">https://t.co/lAsTBPMX01</a> <a href="https://t.co/yqz1JWB2Ub">pic.twitter.com/yqz1JWB2Ub</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1258042140677959680?ref_src=twsrc%5Etfw">May 6, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 


そして、今のJavaScriptであるECMAScript 2015(ECMAScript 6)の策定プロセスの話。
また、ECMAScript以外にもJavaScriptのエコシステムに関わる幅広い話が出てきます。

CommonJSのスタートとなった記事の紹介。

- [What Server Side JavaScript needs ](https://www.blueskyonmars.com/2009/01/29/what-server-side-javascript-needs/)


<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Node.jsがでてきた。<br>ほんとにこれJavaScriptの歴史全部やる感じっぽい。<br>Dart、GWT、CoffeeScript <a href="https://t.co/11niP6dTEF">pic.twitter.com/11niP6dTEF</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1258053593103364097?ref_src=twsrc%5Etfw">May 6, 2020</a></blockquote>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ES6/ES2015ではオプトインな機能は入れないという話<a href="https://t.co/iVny5RvQxY">https://t.co/iVny5RvQxY</a> &quot;tc39-2012-005.pdf&quot; <a href="https://t.co/xTJYWNfzs3">https://t.co/xTJYWNfzs3</a> <a href="https://twitter.com/hashtag/ECMAScript?src=hash&amp;ref_src=twsrc%5Etfw">#ECMAScript</a> <a href="https://twitter.com/hashtag/history?src=hash&amp;ref_src=twsrc%5Etfw">#history</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1258068790752862208?ref_src=twsrc%5Etfw">May 6, 2020</a></blockquote>

扱っている範囲がほんとに「JavaScriptの歴史」なので、かなり幅広く書かれています。
そのJavaScriptの歴史で起きた出来事を参照できる資料とともに解説しています。
そして、なぜ今もJavaScriptが使われ続けているのかについても考察されています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">JavaScriptは低い期待値の言語として始まった。<br>最初の20年間ではJSを再設計/置き換る試みが失敗したにもかかわらず世界で広く使われる言語となった。<br>またブラウザ以外のJSである特別な理由がない所でも使われる。<br>多くのifがあるが、ウェブを壊す事なくJSを利用/拡張する方法を見つけた人たちがいた <a href="https://t.co/LIKoK7iCa0">pic.twitter.com/LIKoK7iCa0</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1258087549152530432?ref_src=twsrc%5Etfw">May 6, 2020</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

ECMAScriptの仕様やミーティングノートなどのアーカイブも残っています。

- [ECMAScript Archives](https://www.ecma-international.org/archive/ecmascript/)

"JavaScript: The First 20 Years"は「JavaScriptの歴史」について書かれた文章なので、JavaScriptの歴史に興味がある人にはおすすめです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ここまで細かいECMAScriptのタイムラインみたことない… <a href="https://t.co/3kpOGOMGxD">pic.twitter.com/3kpOGOMGxD</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1258091886159425536?ref_src=twsrc%5Etfw">May 6, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

"JavaScript: The First 20 Years"は次のページから読めます。

- [JavaScript: The First 20 Years](http://www.wirfs-brock.com/allen/posts/866)
- [JavaScript: The First 20 Years | Zenodo](https://zenodo.org/record/3710954)

また同じくAllen Wirfs-Brockによって書かれたプログラミング言語標準化におけるプラクティスについて書いている"Programming Language Standardization:Patterns for Participation"という文章もおすすめです。
プログラミング言語のように一定の合意が必要なものを策定する場合におけるパターンについて書かれています。

- [standpats-asianplop-final.docx - standpats-asianplop2016.pdf](http://wirfs-brock.com/allen/files/papers/standpats-asianplop2016.pdf)
- [プログラミング言語標準化のパターン](https://gist.github.com/azu/47082cbcaf7cc7b2b2f2075afad1b025)
