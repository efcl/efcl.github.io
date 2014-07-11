---
title: WebStormからtestacularでテストとデバッグをする方法
author: azu
layout: post
permalink: /2012/1028/res3154/
SBM_count:
  - '00019<>1355445450<>19<>0<>0<>0<>0'
dsq_thread_id:
  - 903860933
categories:
  - javascript
tags:
  - javascript
  - test
  - WebStorm
---
[AngularJS][1]で使われてる[Testacular][2]では[WebStorm][3]からテストを実行してデバッグする事を想定した作りになっています。  
(AngularJS自体も[JetBrains Plugin Repository :: AngularJS][4]プラグインがあります)

*   [Testacular &#8211; Spectacular Test Runner for JavaScript][2]
*   [WebStorm][3] 
*   [Testacular Documentation — Testacular 0.2.1 documentation][5]

公式のデモ動画([Testacular &#8211; JavaScript Test Runner &#8211; YouTube][6])でもWebStorm Integrationが紹介されていますが、  
ちょっと古くて設定が変わってる(一応キャプションで補足入ってる)のと分かりにくいので、その部分だけ抜き出して紹介します。

この動画の大まかな流れ(文字潰れてるので画質HDにするといいです)

[azu/testacular-webstorm · GitHub][7]



1.  testacular.conf.jsの作成 
2.  testacular serverの起動(ブラウザ起動+キャプチャも自動で行われる)
3.  testicular runの実行
4.  テストケースの失敗とエラースタックトレース
5.  DOMを使ったテスト
6.  ブレークポイントを使ったデバッグ
7.  dump関数を使ったデバッグ

という感じの流れです。

サンプルのプロジェクトは以下に置いてあります。

*   [azu/testacular-webstorm · GitHub][7]

<img title="testacular-init.png" src="http://efcl.info/wp-content/uploads/2012/10/testacular-init.png" border="0" alt="Testacular init" width="548" height="344" />

まずはtestacular initで設定ファイルを作成します。  
対話式で作成できますが、直接testacular.conf.js等の設定ファイルを作っても問題ないです。

*   [testacular-webstorm/testacular.conf.js at master · azu/testacular-webstorm · GitHub][8]

今回はJasmineとChromeを使うようにしています。

<img title="testacular.conf.js.png" src="http://efcl.info/wp-content/uploads/2012/10/testacular.conf_.js.png" border="0" alt="Testacular conf js" width="600" height="266" />

 

[testacular.conf.js][8] を少し編集して、basePathを現在のディレクトリにして、

 

<pre>// web server port 
port = 8989;
// cli runner port 
runnerPort = 9898; </pre>

 

というように、被らなそうなポートに変更しています。(これは後でWebStormのConfigurationと合わせる必要があるので注意)

次に、WebStormでtestacular serverのConfigurationを作成します。

<img title="NewImage.png" src="http://efcl.info/wp-content/uploads/2012/10/NewImage1.png" border="0" alt="testacular server" width="600" height="363" />

<pre>Type: Node.js
Name: testacular server
Path to Node App JS file: /path/to/testacular testacularバイナリへのパス
Application parameters: start testacular.conf.js
testacular.conf.jsは設定ファイル名</pre>

これで作成した、testacular serverを実行すると http://localhost:8989 のローカルサーバが立ち上がって、Chromeがキャプチャされます。

次に、testicular runのConfigurationを作成します。

<img title="testacular-run.png" src="http://efcl.info/wp-content/uploads/2012/10/testacular-run.png" border="0" alt="Testacular run" width="600" height="476" />

<pre>Type: Node.js
Name: testacular run
Path to Node App JS file: /path/to/testacular testacularバイナリへのパス
Application parameters: run --runner-port 9898
--runner-port 9898は設定ファイルのrunnerPortに合わせる</pre>

で作成したら、testicular runでテストが実行できます。

後は、テストファイルを書く度にrunしていけば確認できます。  
<img title="error-test-1.png" src="http://efcl.info/wp-content/uploads/2012/10/error-test-1.png" border="0" alt="Error test 1" width="600" height="337" />

testacularでは、テストが失敗した時に出るスタックトレースがWebStormに最適化されていて、  
失敗したテストの行番号がリンクになるような形式で出力されます。



スタックトレースはブラウザ間で出力形式が違うので、その辺を整えてくれてる感じです。

*   [strawman:error_stack [ES Wiki]][9]

次に、ブレークポイントを貼ってテストケースをステップ実行してデバッグする方法についてです。

まずはWebStormからJavaScript Debug実行できるようにConfigurationを作成します。

<img title="Run_Debug chrome.png" src="http://efcl.info/wp-content/uploads/2012/10/Run_Debug-chrome.png" border="0" alt="Run Debug chrome" width="600" height="254" />

<pre>Type: JavaScript Debug
Name: Chrome
URL to open: http://localhost:8989/debug.html
// ポートは設定ファイルのportに合わせます(debug.htmlは固定っぽい?)
Remote URL : http://localhost:8989/base
// 設定のbasePathのディレクトリのRemote URLに指定
</pre>

という感じの設定ファイルを指定します。

このConfigurationを**Debug実行**するとBrowserが起動します。  
この時、testacular serverも**Debug実行**にしておいたほうが、Debugタブに統一できるので見やすくなる気がします。

<img title="chrome-debug-2.png" src="http://efcl.info/wp-content/uploads/2012/10/chrome-debug-2.png" border="0" alt="Chrome debug 2" width="589" height="600" />

WebStormで任意の位置にブレークポイントを貼って、&#8221;Chrome Configuration&#8221;を実行すれば、  
JavaScriptデバッガーでステップ実行や値のインスペクト等をWebStorm上で出来ます。

最後は[window.dump][10]でのコンソール出力について

<img title="dump-1.png" src="http://efcl.info/wp-content/uploads/2012/10/dump-1.png" border="0" alt="Dump 1" width="600" height="412" />

console.logを普通に書いても、ブラウザ側のコンソールに出力されて、testacular run側には表示されないようになっています。  
今のところ、[jasmine.wrapper][10]と[mocha.wrapper][11]がありますが、両方共window.dumpというのが生えていて、  
これを利用すると、 testacular run側のコンソールに出力されるみたいです。

これで、[Testacular][2]と[WebStorm][3]を使ったテスト実行については終わりです。  
WebStormのJavaScriptデバッガーを使ったテストのデバッグ実行自体は、URLをキャプチャするような仕組みを持ったものなら大抵出来るはずなので (Buster.JSとかYetiとか)、  
このような仕組みを使えば、テスト内にブレークポイントを貼って実行できると、特定のメソッドの動作確認もしやすいため便利です。

*   [azu/testacular-webstorm · GitHub][7]
*   [testacular with WebStorm Integration &#8211; YouTube][12]

余談

Nodeのバージョン管理に[nodebrew][13]を使えば、Nodeへのパスを指定する際に現在のバージョンを示す、currentというエイリアスを指定できるので、  
Nodeをアップデートしても同一のパスが使えるので便利だと思います。

 [1]: http://angularjs.org/
 [2]: http://vojtajina.github.com/testacular/
 [3]: http://www.jetbrains.com/webstorm/
 [4]: http://plugins.intellij.net/plugin/?webide&pluginId=6971
 [5]: http://testacular.readthedocs.org/en/latest/
 [6]: http://www.youtube.com/watch?v=MVw8N3hTfCI
 [7]: https://github.com/azu/testacular-webstorm
 [8]: https://github.com/azu/testacular-webstorm/blob/master/testacular.conf.js
 [9]: http://wiki.ecmascript.org/doku.php?id=strawman:error_stack
 [10]: https://github.com/vojtajina/testacular/blob/stable/adapter/jasmine.wrapper#L7
 [11]: https://github.com/vojtajina/testacular/blob/stable/adapter/mocha.wrapper
 [12]: http://www.youtube.com/watch?v=YsHR4XBcO-4&hd=1
 [13]: https://github.com/hokaccha/nodebrew