---
title: JavaScript対応APIドキュメント生成ツールのまとめ
author: azu
layout: post
permalink: /2011/0226/res2291/
SBM_count:
  - '00062<>1355447486<>57<>0<>5<>0<>0'
dsq_thread_id:
  - 300969378
categories:
  - javascript
tags:
  - API
  - javascript
  - Node.js
  - まとめ
---
JavaScriptにもJavaDocのようなコメントからAPIドキュメントを生成するツールがいろいろとあるため、どのようなものがあるか少し調べて見ました。基本的なコメントの書き方は大体がJSDocと共通しているので、特に言及がなければそのような書き方が通るものが多いです。

*   [JsDoc Toolkit][1]

[JSDoc][2](開発停止)の後継であるため最も有名だと思います。  
現在はver2で機能追加のリクエストは停止されていますが、[JSDoc 3][3]が開発中となっているそうです。  
情報量もそこそこあると思うので、APIドキュメント生成ツール関係について調べる時に参考になる。  
[Closure Compiler][4]などいろいろなところで使われていたりします。  
-[JsDoc Toolkitを使う！ &#8211; トップページ][5]

*   [YUI Doc][6]

YahooのYUI Libraryで使用されているドキュメント生成ツールです。  
Pythonで書かれています。

*   [ext-doc][7]

<span class="keyword">Ext JS</span>/Sencha Touch風のドキュメント生成ツールです。  
ドキュメントの似た目もリッチ  
-[ext-docでSencha Touchのドキュメントを作ってみる &#8211; プログラマとSEのあいだ][8]

*   [DocumentJS][9]

[JavaScriptMVC][10]で使用されているドキュメント生成ツールです。  
ドキュメント自体の作りを意識した@pageや@tagなどの要素があるのが特徴的。  
rhino(Java)を使っているようです。

*   [Natural Docs][11]

多種多様な言語に対応しているドキュメント生成ツールです。  
他のものとは書き方が異なり、パラメーターなどを使わずに自然な形で書けるように設計されています。  
-[NaturalDocsの書き方と、出力結果 &#8211; 今日もコーディング日和 ][12]

*   [jGrouseDoc][13]

どこかで使われているのは見たことないです。  
ANTが使われているようです。

*   [ScriptDoc][14]

Aptanaで使われているドキュメント生成ツールです。  
Aptana内のコードアシストに反映したりします。  
-[Aptanaの使い方解説][15]

*   [visionmedia/dox &#8211; GitHub][16]

node.js製のドキュメント生成ツールです。  
[Dox][17]を見るとわかりますがコメントとソースコードを並べて表示します

*   [jashkenas/docco &#8211; GitHub][18]

<span class="comment"><span style="color: #000000;">CoffeeScript/JavaScriptに対応したnode.js製の</span></span>ドキュメント生成ツールです。  
APIドキュメントというよりはコメントとソースコードを並べて読ませる感じのHTMLを生成します。  
[backbone.js][19]などでも使われていたりして、ソースコードを読ませるのには向いているものだと思います  
兄妹ツールとしての派生が多いツールです

1.  Ruby &#8211; <http://rtomayko.github.com/rocco/>
2.  Sh &#8211; <http://rtomayko.github.com/shocco/>
3.  Python &#8211; <a rel="nofollow" href="http://fitzgen.github.com/pycco/">http://fitzgen.github.com/pycco/</a>

いろいろ紹介しましたが、基本的には書き方はJSDocなので似た目や機能などに違いが現れることが多いです。

**JavaScript Documentation &#8211; The JSMentors JavaScript Discussion Group | Google グループ**
:   [http://groups.google.com/group/jsmentors/browse_thread/thread/ab8884987bf4517c][20]

**JavaScriptのドキュメントフォーマットにはどんなものがあるの？ &#8211; Nobody is perfect.**
:   [http://d.hatena.ne.jp/takimo/20101105/1288933921][21]

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 14px; width: 1px; height: 1px; overflow: hidden;">
  <a title="ext-doc - Project Hosting on Google Code" href="http://code.google.com/p/ext-doc/">ext-doc &#8211; Project Hosting on Google Code</a>
</div>

 [1]: http://code.google.com/p/jsdoc-toolkit/ "JsDoc Toolkit"
 [2]: http://jsdoc.sourceforge.net/ "JSDoc"
 [3]: https://github.com/micmath/jsdoc "JSDoc 3"
 [4]: http://code.google.com/intl/ja/closure/compiler/docs/js-for-compiler.html "Closure Compiler"
 [5]: http://www12.atwiki.jp/aias-jsdoctoolkit/pages/1.html "JsDoc Toolkitを使う！ - トップページ"
 [6]: http://developer.yahoo.com/yui/yuidoc/ "YUI Doc"
 [7]: http://code.google.com/p/ext-doc/ "ext-doc"
 [8]: http://d.hatena.ne.jp/taka_2/20110202/p1 "ext-docでSencha Touchのドキュメントを作ってみる - プログラマとSEのあいだ"
 [9]: http://javascriptmvc.com/docs/DocumentJS.html#&who=DocumentJS "DocumentJS"
 [10]: http://javascriptmvc.com/ "JavaScriptMVC"
 [11]: http://www.naturaldocs.org/ "Natural Docs"
 [12]: http://d.hatena.ne.jp/gravit/20100801/1280755128 "NaturalDocsの書き方と、出力結果 - 今日もコーディング日和　"
 [13]: http://jgrouse.com/#main.html "jGrouseDoc"
 [14]: http://docs.aptana.com/docs/index.php/ScriptDoc_comprehensive_tag_reference "ScriptDoc"
 [15]: http://aptana.cssmaid.net/code_assist.html "Aptanaの使い方解説"
 [16]: https://github.com/visionmedia/dox "visionmedia/dox - GitHub"
 [17]: http://visionmedia.github.com/dox/ "Dox"
 [18]: https://github.com/jashkenas/docco "jashkenas/docco - GitHub"
 [19]: http://documentcloud.github.com/backbone/docs/backbone.html "backbone.js"
 [20]: http://groups.google.com/group/jsmentors/browse_thread/thread/ab8884987bf4517c "JavaScript Documentation - The JSMentors JavaScript Discussion Group | Google グループ"
 [21]: http://d.hatena.ne.jp/takimo/20101105/1288933921 "JavaScriptのドキュメントフォーマットにはどんなものがあるの？ - Nobody is perfect."