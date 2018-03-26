---
title: WebStormのデバッガでBuster.JSのテストをデバッグをする方法
author: azu
layout: post
permalink: /2013/0220/res3198/
dsq_thread_id:
  - 1094739804
categories:
  - javascript
tags:
  - javascript
  - test
---
WebStormのデバッガをBuster.JSのテスト実行時に使う方法についてです。

最初に要約を書いておくと

1.  buster static で静的なURLのテストページを用意する
2.  WebStormのデバッガ(ブラウザ)でそのURLを開く

です。  
WebStormのデバッガは、デバッガ連携できるブラウザ(ChromeとFirefox)で指定したURLを開いてデバッガを使う感じ 

以前、[Testacular][1]を使った場合を紹介しましたが、[Testacular][1]はちょっとWebStorm向けに小細工が用意されてる感じなので、  
今回のほうがもう少し一般的な感じの内容になると思います。

やっていること自体は下記の記事で解説されているのと同じで、ちょっとパスが違ったり使うコマンドが違う感じなだけだと思います。 

*   [WebStormからtestacularでテストとデバッグをする方法 | Web scratch][2]
*   [WebStormでtestacularを動かしてデバッグもする #WebStorm #testacular #JavaScript &#8211; Qiita][3]

#### 下準備

先にデバッグに使うブラウザの下準備ですが、設定のBrowserからFirefoxとChromeにはSettingsがあり、  
ここから使うプロファイルなどを指定出来ます。 

<img title="Chrome Settings 2013-02-20 23-35-11.jpg" src="https://efcl.info/wp-content/uploads/2013/02/Buster-StaticChrome-Settings-2013-02-20-23-35-11.jpg" alt="Chrome Settings 2013 02 20 23 35 11" width="551" height="600" border="0" />

Chromeの場合は\`Use custom profile directory\`にチェックを入れるだけでも、普段と違うプロファイルになるので、  
デバッグに使うプロファイルは別のものにしておいたほうがいいと思います。  
(特にChromeの場合はデバッガに拡張のjsも含まれたりするのでうざったい)

また、デバッガを使うにはChrome web storeから[JetBrains IDE Support][4]をインストールする必要があります。

*   [How to install Chrome extension &#8211; Web IDE &#8211; Confluence][5]

Firefoxもアドオンをインストールしておく必要があります。 

#### 本編

今回使ったサンプルのプロジェクトです。

*   [azu/WebStormBusterJS · GitHub][6]

まずはWebStormのRun Configurationで* buster static *のコマンドを叩く設定を作成します。

<img title="RunDebug Configurations 2013-02-20 23-36-05.jpg" src="https://efcl.info/wp-content/uploads/2013/02/Buster-StaticRunDebug-Configurations-2013-02-20-23-36-05.jpg" alt="RunDebug Configurations 2013 02 20 23 36 05" width="600" height="375" border="0" />

<pre>Type: Node.js
Name: buster static
Path to Node App JS file: /path/to/buster-static buster-staticバイナリへのパス
Application parameters: -p ポート番号
# Application parameters でのポート番号指定は任意
</pre>

今回は、-p 引数を使ってポート番号を 8989 に指定しています。

このConfigurationを実行してみると、下記のようにbuster-staticのローカルサーバが起動していて、 http://localhost:8989/ にアクセスすると、QUnitなどのようなウェブページとしてテストを実行出来ます。

<pre>/Users/azu/.nodebrew/current/bin/node /Users/azu/.nodebrew/current/bin/buster-static -p 8989
Starting server on http://localhost:8989/
</pre>

次に、デバッガのRun Configurationを作成します。

<img title="RunDebug Configurations 2013-02-20 23-36-36.jpg" src="https://efcl.info/wp-content/uploads/2013/02/Buster-StaticRunDebug-Configurations-2013-02-20-23-36-36.jpg" alt="RunDebug Configurations 2013 02 20 23 36 36" width="600" height="375" border="0" />

<pre>Type: JavaScript Debug
Name: Chrome
URL to open: http://localhost:8989/
// ポートはbuster staticの-pで指定したポートに合わせます
Remote URL : http://localhost:8989/
// テストのルートディレクトリのRemote URLに指定</pre>

このようなデバッガの設定を作成します。 見てみるとわかりますが、 URL to open で指定しているのは、先ほどのテストページのURLです。  
[Remote URL][7] はプロジェクトのファイルならどれにでも設定出来ますが、これはURLとファイルパスのmapを指定する設定になっています。  
buster staticではローカルのディレクトリ構成がそのまま使われるため、  
http://localhost:8989/ に該当するディレクトリに対して http://localhost:8989/ を設定すれば良いことになります。(この場合はプロジェクトのルート)

[テストページ][8]のネットワークを見ると、テストファイルがプロジェクトの構造そのままに配置されてることがわかる。

 <img title="Buster.JS 2013-02-20 23-37-02.jpg" src="https://efcl.info/wp-content/uploads/2013/02/Buster-StaticBuster.JS-2013-02-20-23-37-02.jpg" alt="Buster JS 2013 02 20 23 37 02" width="600" height="452" border="0" />

#### 実行方法

実際にWebStormのデバッガを使ってみます。

buster static を実行(run)してローカルサーバを起動しておきます。  
そして、WebStormから適当なファイルにブレークポイントを貼っておいて、先ほど作成したChromeの設定をDebugで実行します。

 <img title="test-test.js - WebStormBusterJS - [~DropboxworkspaceJavaScriptprojectWebStormBusterJS] - JetBrains WebStorm (WebStorm) WS-126.309 2013-02-20 23-37-44.jpg" src="https://efcl.info/wp-content/uploads/2013/02/Buster-Statictest-test.js-WebStormBusterJS-DropboxworkspaceJavaScriptprojectWebStormBusterJS-JetBrains-WebStorm-WebStorm-WS-126.309-2013-02-20-23-37-44.jpg" alt="Test test js  WebStormBusterJS   ~DropboxworkspaceJavaScriptprojectWebStormBusterJS  JetBrains WebStorm  WebStorm WS 126 309 2013 02 20 23 37 44" width="594" height="389" border="0" />

すると、上記のようにブレークポイントで止まってステップ実行などができるようになります。(この辺は普通のデバッガと同じです)

ユースケースとして、テスト実行中にJavaScriptのどこかで例外が発生してしまっていてテストが失敗してしまうケースがあると思います。  
Chrome Dev ToolsなどにExceptionがあった時にbreakする設定がありますが、WebStormにも同様の機能があり、  
Ctrl + Shift + Aのコマンド検索で \`View Breakpoints\` を開くとブレークポイントの一覧が表示されます。

 <img title=" 2013-02-20 23-38-13.jpg" src="https://efcl.info/wp-content/uploads/2013/02/Buster-Static-2013-02-20-23-38-13.jpg" alt="2013 02 20 23 38 13" width="600" height="448" border="0" />

この中のAll exceptionsにチェックを入れておけば、例外が発生した場所でbreakされるので、原因となる場所が発見しやすいです。

エディタ上からテストケースにブレークポイントを貼って、ステップ実行して実装の内部を見ながらできるとブラウザとの切り替えが少なくなってデバッグがしやすくなると思います。  
まだ、デバッグ実行するとテストの成否のフィードバックが薄かったりする部分がちょっと中途半端ではあります。

以上で、[WebStormからtestacularでテストとデバッグをする方法][2]よりやや一般よりのWebStormのデバッガを使う方法についての紹介は終わりです。

サンプルのプロジェクトは以下に置いてあります。  
.ideaディレクトリも入ってるのでRun Configurationもそのまま入っています。(nodebrewじゃない場合はパスとか変更が必要ですが) 

*   [azu/WebStormBusterJS · GitHub][6]

<div>
   
</div>

<div>
  おまけで、<a href="http://docs.busterjs.org/en/latest/">Buster.JS</a>ではbuster serverではなくbuster staticを使いましたが、理由としては以下の通り
</div>

#### 調査メモ

`buster static` の場合はQUnitなどでおなじみの静的なテスト実行ページが用意されるため、  
remote URLでそのURLを指定すれば、問題なくWebStormからJavaScriptデバッガを使うことができた。  
(これはテストファイルなどのパスも静的であるため) 

`buster server` の場合は、テスト実行ページのURLにランダムなセッションIDが含まれるため、  
WebStormでremote URLを指定することが困難となる。

http://localhost:1111/slaves/b8b98e2a-d00d-4ba9-a1b6-0d7c2a9339ae/browser

そのため、このセッションIDが入ったURLを固定するオプションが必要になるが、  
それは buster test コマンドのオプションに存在する。

<tt class="descname">-p</tt><tt class="descclassname"></tt><tt class="descclassname">, </tt><tt class="descname">--static-paths</tt>

*   [Test options — Buster.JS 0.6.3 documentation][9]

buster test &#8211;static-paths のようにテストを実行すると、  
buster serverを使った場合でも静的なパスを吐くようになる。

http://localhost:1111/sessions/static/<テストディレクトリ>

これで、buster serverの場合でも静的なパスを吐くため、  
WebStormのデバッガが使えるような状態にはなるのだけど、 buster testを行った時点で既にテストを実行してるわけなので、  
(WebStormのデバッガはURLを開くことでしか開始できないため)デバッガを上手く混ぜることができなかった。

(何かいい方法があったら教えて下さい)

内部的な話としては、サーバモジュールのrampのcreateSession()のオプションにstaticResourcesPath : trueを渡すことで、  
静的なパスになるようになっている。 

*   [buster-capture-server — Buster.JS 0.6.3 documentation][10] (現在ramp)
*   [busterjs/ramp · GitHub][11]

このオプションが、buster.jsの設定ファイルやbuster serverのオプションで設定できると、buster serverでもデバッガが機能しそうな感じではあるのだけど…

 [1]: http://vojtajina.github.com/testacular/
 [2]: https://efcl.info/2012/1028/res3154/
 [3]: http://qiita.com/items/ab27eacce7524c1a9fe0
 [4]: https://chrome.google.com/webstore/detail/jetbrains-ide-support/hmhgeddbohgjknpmjagkdomcpobmllji
 [5]: http://confluence.jetbrains.com/display/WI/How+to+install+Chrome+extension
 [6]: https://github.com/azu/WebStormBusterJS
 [7]: http://www.jetbrains.com/webstorm/webhelp/run-debug-configuration-javascript-debug.html
 [8]: http://localhost:8989/
 [9]: http://docs.busterjs.org/en/latest/modules/buster-test/options/
 [10]: http://docs.busterjs.org/en/latest/modules/buster-capture-server/?highlight=staticresourcespath
 [11]: https://github.com/busterjs/ramp
