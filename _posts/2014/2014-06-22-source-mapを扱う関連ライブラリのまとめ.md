---
title: Source Mapを扱う関連ライブラリのまとめ
author: azu
layout: post
permalink: /2014/0622/res3933/
dsq_thread_id:
  - 2785311395
categories:
  - javascript
tags:
  - Debug
  - javascript
  - library
  - Node.js
  - まとめ
---
この記事はSource Mapに対応した何かを作るためのライブラリとか仕様とかについて調べてメモった記事です。

利用する場合の話は[Source Maps 101 &#8211; Tuts+ Code Tutorial][1]等 検索すれば色々出てくると思います。

## Source Mapとは

*   [Source Map Revision 3 Proposal &#8211; Google ドキュメント][2] 
    *   仕様
*   [#JSオジサンで Source Map について話してきました : document][3] 
    *   source mapの概要
*   [JavaScriptのSource Mapの内部表現について][4] 
    *   Base64の`mappings`部分の仕組み
    *   [source-map-visualization][5] ビジュアライズツール
*   [mozilla/source-map][6] 
    *   source map のコア　と言えるモジュール(色々なモジュールが使う)
    *   source map の生成、source mapファイルからマッピング情報取得
    *   [Compiling to JavaScript, and Debugging with Source Maps ✩ Mozilla Hacks – the Web developer blog][7]
    *   [Const なんとかさん関連のツール群をつかうと、簡単に EcmaScript target の言語をつくれる! &#8211; blog.64p.org][8]
*   [Beyond Source Maps][9] 
    *   SourceMap.next

まずは[Source Map Revision 3 Proposal][10]を見て置きましょう。  
ConventionsやNotesに参考となる情報が多いはずです。

`//@”`から`//# sourceURL`という形式に変えた理由や、多段source mapについて書いてあります。

何かを実現したい時、[mozilla/source-map][6]を見てこのAPIで実現できないかを見てましょう。  
多くのライブラリは内部的にこのモジュールを使っていて、ちょっとしたラッパーであるケースも多いです。

**source mapオブジェクト** は色々なモジュールの中で出てきます。

<div class="highlight">
  <pre><span class="p">{</span>
  <span class="c1">// version</span>
  <span class="s2">"version"</span> <span class="o">:</span> <span class="mi">3</span><span class="p">,</span>
  <span class="c1">// Source Map の対象ファイル (*.min.js など)</span>
  <span class="s2">"file"</span><span class="o">:</span> <span class="s2">"out.js"</span><span class="p">,</span>
  <span class="c1">// sources の基準となるルートパス</span>
  <span class="s2">"sourceRoot"</span><span class="o">:</span> <span class="s2">""</span><span class="p">,</span>
  <span class="c1">// ソースファイルへの参照</span>
  <span class="s2">"sources"</span><span class="o">:</span> <span class="p">[</span><span class="s2">"foo.js"</span><span class="p">,</span> <span class="s2">"bar.js"</span><span class="p">],</span>
  <span class="c1">// ソースファイルを埋め込む場合に使う</span>
  <span class="s2">"sourcesContent"</span><span class="o">:</span> <span class="p">[</span><span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">],</span>
  <span class="c1">// mappings でシンボルリスト</span>
  <span class="s2">"names"</span><span class="o">:</span> <span class="p">[</span><span class="s2">"src"</span><span class="p">,</span> <span class="s2">"maps"</span><span class="p">,</span> <span class="s2">"are"</span><span class="p">,</span> <span class="s2">"fun"</span><span class="p">],</span>
  <span class="c1">//  エンコードされたマッピングデータ(対応表)</span>
  <span class="s2">"mappings"</span><span class="o">:</span> <span class="s2">"A,AAAB;;ABCDE;"</span>
<span class="p">}</span>
</pre>
</div>

via [#JSオジサンで Source Map について話してきました : document][3]

## Utility

*   [multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "multi-stage-sourcemap")

多段SourceMapの対応を行うモジュール。
詳しくは[多段SourceMapの対応方法とライブラリ | Web Scratch](http://efcl.info/2014/09/03/multi-stage-sourcemap/ "多段SourceMapの対応方法とライブラリ | Web Scratch")にて解説しています。


*   [lydell/source-map-resolve][11] 
    *   sourceMappingURL(コードに含まれているsource mapの定義ファイル/データURL)コメントから詳細な情報を取得するモジュール

コード -> source map オブジェクトの詳細情報

    function(){...}();
    /*# sourceMappingURL=foo.js.map */
    

のようなコード(とファイルパス)を受け取って、source mapオブジェクト等を取得する。

`sourceMapResolve.resolveSourceMap` はsource mapオブジェクトやそのmapファイルへの相対パスを`sourcesRelativeTo`で取得出来る。

`sourceMapResolve.resolve` は `resolveSourceMap`がパスだけなのに対して、ソースの中身(コード自体も)も一緒に取れる。

*   [lydell/source-map-dummy][12] 
    *   ダミーのsource mapオブジェクトを作成するモジュール
    *   `mappings`プロパティを生成する際に、jsとcssは自分自身をtokenに分解してマッピングを作る
*   [lydell/source-map-url][13] 
    *   sourceMappingURLコメントが入ったコードが対象
    *   mapファイルのURLを取得
    *   sourceMappingURLコメントの書き換え
    *   sourceMappingURLコメントの削除
    *   sourceMappingURLコメントの前にコードを挿入
    *   sourceMappingURLコメントにマッチする正規表現の取得
*   [thlorenz/convert-source-map][14] 
    *   source map の相互変換モジュール
    *   入力 : source mapオブジェクト、JSON、Base64、sourceMappingURLコメント、mapファイル
    *   変換 : プロパティの追加/削除、
    *   出力 : source mapオブジェクト、JSON、base64、sourceMappingURLコメント
    *   削除 : sourceMappingURLコメントの削除

## 結合

*   [edc/mapcat][15] 
    *   mapファイルを結合するツール/モジュール
    *   mapファイルを渡す

1.  mapファイルから変換後ソースしてそれぞれ結合
2.  source mapのlineを結合するときに、ソースの行数分offsetを足していく
3.  結合したソース + 結合したmapファイルを取得

*   [lydell/source-map-concat][16] 
    *   codeとsource mapを渡して結合するモジュール

1.  `code` と `map` を持ったオブジェクトの配列を作る
2.  `concat`に渡す
3.  => codeをまとめたjsファイルと、mapをまとめたmapファイルができる

codeとmapが1対1、mapがないjsは[lydell/source-map-dummy][12]でダミーを使ってやればいいという方針。

## デバッグ

*   [evanw/node-source-map-support][17] 
    *   V8 stack trace APIとsource mapを使って、スタックトレースの書き方をするnode module
    *   [Node.js＋CoffeeScript でソースマップを使ってデバッグを楽にする方法 &#8211; てっく煮ブログ][18]
*   [alinex/node-error][19] 
    *   V8 stack trace APIを使ったスタックトレースの書き換え
    *   スタックトレース中に該当するコードを入れ込んだり、色付け等を行う。
    *   source mapにも対応してスタックトレースを書き換える

## ツール

*   [nsams/sourcemap-aware-replace][20] 
    *   mapファイルを元にソースの文字列置換をするCLI
    *   mapの`file`のソースコードを置換
    *   mapファイル自体のmappingも更新する
*   [source-map-visualization][5] 
    *   `mappings`のビジュアライズツール

## AST

*   [tarruda/sourcemap-to-ast][21] 
    *   source mapオブジェクトを使ってJS ASTの`loc`情報をアップデートする

## バリデーション

*   [ben-ng/sourcemap-validator][22] 
    *   変換元、変換後、sourcemapファイルを使ってバリデーションする

## その他

*   [Dynamic Source Maps][23] 
    *   `eval` などで動的にコードを実行する際にsourceMappingURLコメントをいれて動かす話
    *   [qfox.nl &#8211; Dynamic source maps][24]
*   [mishoo/UglifyJS2][25] 
    *   `--in-source-map`でMulti-level Mappingをサポートしてる
    *   [Multi-level Source maps | The CSS Ninja &#8211; All things CSS, JavaScript & HTML][26]
    *   [Support multiple &#8211;in-source-map arguments · Issue #145 · mishoo/UglifyJS2][27]
    *   [UglifyJS2/lib/sourcemap.js at e3342a3cf63b84c93cb288ba568a3fe260d08247 · mishoo/UglifyJS2][28]
*   [mozilla/pretty-fast][29] 
    *   JavaScriptの整形 + sourcemap出力
*   [chrisdone/sourcemap][30] 
    *   Haskellのsource map実装
*   [MathieuTurcotte/sourcemap][31] 
    *   Go言語

## 人

*   [John Lenz &#8211; Google+][32] 
    *   Google/ source mapの仕様策定者
*   [fitzgen (Nick Fitzgerald)][33] 
    *   source mapの仕様策定者、[mozilla/source-map][34]のメンテナ
*   [lydell (Simon Lydell)][35] 
    *   source map関連モジュールを色々書いてる
*   [thlorenz (Thorsten Lorenz)][36] 
    *   source map関連モジュールを色々書いてる

 [1]: http://code.tutsplus.com/tutorials/source-maps-101--net-29173 "Source Maps 101 - Tuts+ Code Tutorial"
 [2]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit "Source Map Revision 3 Proposal - Google ドキュメント"
 [3]: http://imaya.blog.jp/archives/7169783.html "#JSオジサンで Source Map について話してきました : document"
 [4]: http://safx-dev.blogspot.jp/2013/08/javascriptsource-map.html "JavaScriptのSource Mapの内部表現について"
 [5]: http://sokra.github.io/source-map-visualization/ "ビジュアライズ"
 [6]: https://github.com/mozilla/source-map/ "mozilla/source-map"
 [7]: https://hacks.mozilla.org/2013/05/compiling-to-javascript-and-debugging-with-source-maps/ "Compiling to JavaScript, and Debugging with Source Maps ✩ Mozilla Hacks – the Web developer blog"
 [8]: http://blog.64p.org/entry/2012/09/08/090729 "Const なんとかさん関連のツール群をつかうと、簡単に EcmaScript target の言語をつくれる! - blog.64p.org"
 [9]: http://fitzgeraldnick.com/weblog/55/ "Beyond Source Maps"
 [10]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit# "Source Map Revision 3 Proposal - Google ドキュメント"
 [11]: https://github.com/lydell/source-map-resolve "lydell/source-map-resolve"
 [12]: https://github.com/lydell/source-map-dummy "lydell/source-map-dummy"
 [13]: https://github.com/lydell/source-map-url "lydell/source-map-url"
 [14]: https://github.com/thlorenz/convert-source-map "thlorenz/convert-source-map"
 [15]: https://github.com/edc/mapcat "edc/mapcat"
 [16]: https://github.com/lydell/source-map-concat "lydell/source-map-concat"
 [17]: https://github.com/evanw/node-source-map-support "evanw/node-source-map-support"
 [18]: http://tech.nitoyon.com/ja/blog/2013/02/19/node-source-map/ "Node.js＋CoffeeScript でソースマップを使ってデバッグを楽にする方法 - てっく煮ブログ"
 [19]: https://github.com/alinex/node-error "alinex/node-error"
 [20]: https://github.com/nsams/sourcemap-aware-replace "nsams/sourcemap-aware-replace"
 [21]: https://github.com/tarruda/sourcemap-to-ast "tarruda/sourcemap-to-ast"
 [22]: https://github.com/ben-ng/sourcemap-validator "ben-ng/sourcemap-validator"
 [23]: http://kybernetikos.github.io/jsSandbox/srcmaps/dynamic.html "Dynamic Source Maps"
 [24]: http://qfox.nl/weblog/280 "qfox.nl - Dynamic source maps"
 [25]: https://github.com/mishoo/UglifyJS2 "mishoo/UglifyJS2"
 [26]: http://www.thecssninja.com/JavaScript/multi-level-sourcemaps "Multi-level Source maps | The CSS Ninja - All things CSS, JavaScript & HTML"
 [27]: https://github.com/mishoo/UglifyJS2/issues/145 "Support multiple --in-source-map arguments · Issue #145 · mishoo/UglifyJS2"
 [28]: https://github.com/mishoo/UglifyJS2/blob/e3342a3cf63b84c93cb288ba568a3fe260d08247/lib/sourcemap.js#L60-L86 "UglifyJS2/lib/sourcemap.js at e3342a3cf63b84c93cb288ba568a3fe260d08247 · mishoo/UglifyJS2"
 [29]: https://github.com/mozilla/pretty-fast "mozilla/pretty-fast"
 [30]: https://github.com/chrisdone/sourcemap "chrisdone/sourcemap"
 [31]: https://github.com/MathieuTurcotte/sourcemap "MathieuTurcotte/sourcemap"
 [32]: https://plus.google.com/+JohnLenz/posts "John Lenz - Google+"
 [33]: https://github.com/fitzgen "fitzgen (Nick Fitzgerald)"
 [34]: https://github.com/mozilla/source-map "mozilla/source-map"
 [35]: https://github.com/lydell "lydell (Simon Lydell)"
 [36]: https://github.com/thlorenz "thlorenz (Thorsten Lorenz)"
