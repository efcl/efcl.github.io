---
title: JavaScript関係のツールまとめてみた
author: azu
layout: post
permalink: /2010/0914/res1947/
SBM_count:
  - '00529<>1355445614<>486<>0<>34<>9<>0'
dsq_thread_id:
  - 301038163
categories:
  - javascript
tags:
  - Firefox
  - Greasemonkey
  - javascript
  - ブックマークレット
  - ブラウザ
---
最近使ってたりするJavaScript関係のツールまとめてみた。  
主にWebサービスです。

*   [Global is the new private][1]  
    JavaScriptライブラリの名前空間汚染をチェックするツール。  
    元々載ってるもの以外でも*Analyze your own scripts!*から調査したいライブラリを追加できる。
*   [jsFiddle][2]  
    ブラウザ上で HTML / CSS / JavaScript の実行結果を表示できる。  
    Embedコードもあるので、ブログにjsやCSSなどを載っけるのに便利。  
    エディタ機能も整形、シンタックスハイライトしてくれるので使いやすい。  
    HTML5のコードを使うにはInfoからDTDを変更してから使う。  
    類似:[MooShell][3]
*   [Gist &#8211; GitHub][4]  
    gistです。コードスニペット共有サービスです。  
    Greasemonkey貼るとき[gist fill in fileName automatically for Greasemonkey][5]を使うと楽です。
*   [jsPerf][6]  
    `benchmark.js`を使った比較ツール。JavaScriptのスニペットを登録して処理時間を比較できる。  
    実行結果がサイトに記録されるので、他人がやった結果がどんどん貯まるのも良い点。
*   [HiFi Regex Tester][7]  
    JavaScriptの正規表現を確認できるツール。  
    類似:[RegExpChecker.js][8]  
    正規表現関係で、正規表現をオートマトン的に図示してくれる[strfriend][9]も便利です。
*   [Pretty Diff][10]  
    JavaScript、CSS、CSV、HTMLのコードを整形、圧縮、Diffなどができる。  
    いろんなものを詰め込んだ感じのツール  
    JavaScriptの整形自体は[JS Beautifier][11]が好き(Pretty Diffでも使ってる)
*   [Experimentation Harness][12]  
    DOMイベントの調査ツール。  
    DOMイベントが網羅的に載ってるので確認に使ったりする。
*   [Keycode library test][13]  
    キーボードのキーコード調査ツール。  
    修飾キーとの組み合わせにも対応してます。([各ブラウザのキーコード表[JavaScript]][14])
*   [Online JSON Viewer][15]  
    JSONビューアー。ツリー表示や整形機能。  
    Firebugとかでみたりもするけど、UIが好き。
*   [エンコードマニアックス &#8211; 各種エンコードやハッシュを一発作成][16]  
    エンコード/デコード結果がまとめて見られるので結構使います。  
    汎用的に使えます。
*   [Unicode code converter [ishida >> utilities]][17]  
    同じくエンコード。数値文字参照とかJavaScriptのエスケープ。  
    少し特殊っぽいの多め
*   [XPath検索バー (for Mozilla/Firefox) | 東京嫉妬][18]  
    XPathのチェックブックマークレット  
    ちょっとだけいじった気がするバージョン : [XPath Tester  
    ][19]Firefoxの拡張だと[xpath finder][20]がシンプルで使いやすいチェックツール。
*   [XPathGenerator &#8211; Hatena::Let][21]  
    インスペクタからクリックで要素のXpathを生成するブックマークレット

 [1]: http://mankz.com/code/GlobalCheck.htm
 [2]: http://jsfiddle.net/
 [3]: http://mootools.net/shell/
 [4]: http://gist.github.com/
 [5]: http://userscripts.org/scripts/show/71914
 [6]: http://jsperf.com/
 [7]: http://www.gethifi.com/tools/regex
 [8]: http://mrgoofy.web.fc2.com/jsarcv/regexp/
 [9]: http://strfriend.com/
 [10]: http://prettydiff.com/
 [11]: http://github.com/einars/js-beautify
 [12]: http://www.danilatos.com/event-test/ExperimentTest.html
 [13]: http://jonathan.tang.name/files/js_keycode/test_keycode.html
 [14]: http://www.programming-magic.com/file/20080205232140/keycode_table.html
 [15]: http://jsonviewer.stack.hu/
 [16]: http://encodemaniax.com/
 [17]: http://rishida.net/tools/conversion/
 [18]: http://motormean.s58.xrea.com/b/javascript/xpath_finder.html
 [19]: http://let.hatelabo.jp/efcl/let/gYC-xsyExq3UTw
 [20]: https://addons.mozilla.org/en-US/firefox/addon/218308/
 [21]: http://let.hatelabo.jp/mattn/let/gYC-ypuaz4z1Lg