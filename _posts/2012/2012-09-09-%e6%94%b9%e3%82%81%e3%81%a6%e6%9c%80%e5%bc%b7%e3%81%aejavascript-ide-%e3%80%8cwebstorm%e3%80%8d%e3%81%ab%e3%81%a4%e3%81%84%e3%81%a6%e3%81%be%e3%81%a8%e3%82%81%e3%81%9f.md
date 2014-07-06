---
title: 改めて最強のJavaScript IDE 「WebStorm」についてまとめてみた(改訂版)
author: azu
layout: post
permalink: /2012/0909/res3111/
SBM_count:
  - '00247<>1355446753<>241<>0<>3<>3<>0'
dsq_thread_id:
  - 836837081
categories:
  - javascript
  - software
tags:
  - javascript
  - software
  - WebStorm
---
[WebStorm][1]はHTML(5)+CSS+JavaScript等をメインに扱う、Windows, Mac OS X、Linuxのクロスプラットフォームに対応したIDEです。

これを読む前に以下の文章を見ておく必要があります

*   [最強のJavaScript IDE 「WebStorm」を使ってみた | Web scratch][2] 
    *   この記事はWebStorm1.0の頃にかかれたものです。
*   [横浜JSTDDハンズオンでWebStormについて発表してきた | Web scratch][3] 
    *   [WebStorm指南書][4]
    *   この記事はWebStorm 4.0 EAPの時に書かれたものです

この記事は、WebStorm 1.0 から [WebStorm 5.0][5]までの変更や追加機能等を[最強のJavaScript IDE 「WebStorm」を使ってみた][2]をベースにまとめたものです。

### 購入方法

既に購入済みな方などは飛ばして大丈夫です。

2012/09/14日までJetBrains製IDEの半額セール中なので、$29で購入できます。(本来は$49/year)

*   [Back To School sale: JetBrains tools for up to 50% OFF! | JetBrains Company Blog][6]

#### 簡単な購入手順

1.  カートに追加   
    <img src="https://img.skitch.com/20120909-8dacift3bxh5x9adbgqtwy7n3s.png" alt="cart" width="617" height="507" />
2.  個人情報を適当に入力
3.  クレジット情報を入力(<del>現在はクレジットカードのみです</del>PayPalも可能でした)
4.  ライセンス発行(結構時間掛かるので1日待ったりすることも多い)

####  PayPalを利用する場合

3.のクレジット情報を入力する際に、下部にある&#8221;Change Payment&#8221;をクリックします。

<img src="https://img.skitch.com/20120910-d5nb9asghta5kp1mpmsmbykhsu.png" alt="paypa;" width="590" height="639" />

Payment OptionでPayPalを選んでSaveすれば、クレジット情報の代わりにPayPalのサイトを利用してライセンスを購入できます。

<img src="https://img.skitch.com/20120910-kbx9bre6y9te1xnhs848wfagxu.png" alt="Payment Option" width="587" height="266" />

また、クレジットカードがない場合でも[Ｖプリカ][7]等のプリペイドなクレジットカードを利用して購入する事も可能です。(そもそも、PayPalでも[Ｖプリカ][7]は使えるので)

&nbsp;

### ここから本編の変更点などについて

最初に述べたように[最強のJavaScript IDE 「WebStorm」を使ってみた][2]との変更点等が主です。

#### コード補完機能

*   現在のスコープなども補完候補の出現順番に影響 
    *   補完候補に出て欲しい変数等が候補に出やすくなった
    *   [New in 4.0: Smarter ordering of JavaScript completion options | WebStorm & PhpStorm Blog][8]
*   jQueryやSencha等のセレクタ文字列の補完 
    *   [Tips on jQuery development in WebStorm | WebStorm & PhpStorm Blog][9]
*   JSDocを用いた補完の強化(JSDocの補完自体は以前からあったけどパラメータの解釈が向上) 
    *   [今さらながら知ったWebStormとJSDocの深〜い関係 | 宇都宮ウエブ制作所][10]
    *   [WebStorm:追加した独自のコード補完候補をプロジェクトで使用可能にする &#8211; 仙台 Ruby Vim JavaScript社長][11]
    *   [WebStormのコード補完に新しく候補を追加する方法 | Web scratch][12]
    *   プロジェクト|ファイルレベルでも補完候補に出るもの等を設定できる
    *   [Working with JavaScript Libraries in PhpStorm & WebStorm | WebStorm & PhpStorm Blog][13]
*   Google Closure Compiler JSDocに対応 
    *   インターフェース、継承やprivate等といった、より細かいなJSDoc
    *   補完候補にも出方にも影響を与える
    *   [New in 5.0: Google Closure Compiler JSDoc annotations | WebStorm & PhpStorm Blog][14]

#### コ－ド解析

*   宣言元へのジャンプがAMDモジュールに対応 
    *   [PhpStorm & WebStorm 4.0 EAP 117.65 | WebStorm & PhpStorm Blog][15]
*   Nodeのrequireも同様にモジュールへの移動が可能
*   デフォルトのLintに追加でJSHint/JSLintに対応 
    *   <img src="https://img.skitch.com/20120909-mekybn9buy3maspidy79y27kyh.png" alt="JSLint-JSHint" width="641" height="375" />
    *   [Code Inspections, JSLint, JSHint &#8211; WebStorm指南書][16]
*   File Structure view (Ctrl/Command+F12)が追加(IntelliJ共通) 
    *   ポップアップでStructureパネルを表示/絞り込みが直ぐできる(メソッドへの移動などに便利)
    *   ![File Structure view][17]

#### 言語やライブラリ

*   Sass/Less/CoffeeScript/reST/Markdown(plugin)/Jade/JsTestDriver/Jasmine/Ext.js/Node.js/Dart(現在はplugin)などのサポート
*   AngularJSはプラグインを出してる[JetBrains Plugin Repository :: AngularJS][18]
*   JavaScriptのバージョン別サポートの設定追加 
    *   JavaScriptのバージョンを選んで補完や構文のサポートを変更できる
    *   [ECMAScript 6 (Harmony)][19] にも一応対応
    *   <img src="https://img.skitch.com/20120225-8pf6cgn2d4pure2xrpwyjmsc5.png" alt="JavaScript version" width="703" height="161" />

#### 自動整形機能

*   幾つか整形のオプションが追加された
*   試したいコードを入力して、実際にどのように整形されるかが試せるようになった 
    *   <img src="https://img.skitch.com/20120909-rmbux6kwyhaa4ntdkbq3aec8ug.png" alt="style preview" width="518" height="230" />
*   上記の言語やライブラリで追加された言語なども一部整形に対応

#### E4X

*   WebStorm上ではまだ利用できますが、先にFirefox側のE4Xが無効になる予定
*   [E4X | MDN][20]
*   逆にletや分割代入等は [ECMAScript 6 (Harmony)][19] でサポートされています

#### バージョン管理

*   [バージョン管理連携 &#8211; WebStorm指南書][21]
*   SVN 1.7に対応
*   Github/Gist連携、WebStormから直接Github/GIstに公開できるように
*   Git 連携の強化(元からあったかもしれない) 
    *   <img src="https://img.skitch.com/20120225-erx8fcxkj4tad178bt82b3msjx.png" alt="git blame" width="523" height="216" />

#### テストフレームワーク

*   プラグインだったJSTestDriver(JSTD)が統合、強化 
    *   [JavaScript unit testing support | WebStorm & PhpStorm Blog][22]
    *   [PhpStormでjsTestDriverを使ったテストを実行する | バシャログ。][23]
*   JSTD特有の[Html Doc][24]もサポート
*   QUnit, Jasmineのadpterもサポート(JSTD関係なく補完とかに使える)
*   コードカバレッジもサポート 
    *   コードカバレッジの結果がエディタの横に色付けされる
    *    ![Code Coverag][25]
    *   [Code Coverage for JavaScript Unit Testing | WebStorm & PhpStorm Blog][26]
*   [JavaScript Testing FrameworkのBusterJSを使う][27]

#### JavaScriptデバッガー

*   JavaScriptデバッガーがFirefoxに加えて、Chromeに対応 
    *   [Debugging JavaScript in Google Chrome | WebStorm & PhpStorm Blog][28]
*   Nodeアプリもデバッガーに対応 
    *   [WebStorm your Node app! | WebStorm & PhpStorm Blog][29]
*   LiveEdit機能が追加(若干デバッガーとは違うけど) 
    *   [LiveEdit plugin features in detail | WebStorm & PhpStorm Blog][30]
    *   編集した内容がリアルタイムでブラウザの表示に反映
    *   スクリーンキャストを見るとわかるが、補完候補の選択中にも変更が見える
    *   [WebStorm 5.0 &#8211; Live Edit with Google Chrome &#8211; YouTube][31]

#### 体験版

*   <del>45日間</del> -> 30日間
*   [EAPビルド][32]のビルド毎の有効期間も30日なので、これに合わせたような気もする

#### 他のIDEとの比較

JetBrains製のIDEにはPhpStorm/PyCharm/RubyMine/IntelliJ等がありますが、どれを買うべきか迷う場合は以下を参考にするといいです。  
PhpStormはWebStormの上位製品で、IntelliJはPhpStormも含んでいるUltimateなので、ここであげられているWebStormの機能は他のIDEでも利用できます。

*   [IntelliJとAppCode(CIDR)、でもってその他(WebStorm/PhpStorm/PyCharm/RubyMine)の話][33]
*   [IDEAと他の製品のプラグインを比較してみた][34]

#### おわりに

<blockquote title="最強のJavaScript IDE 「WebStorm」を使ってみた | Web scratch" cite="http://efcl.info/2010/1027/res2023/">
  <p>
    珍しくタイトルが誇大っぽいけど、(現時点では)最強のJavaScript IDEは「WebStorm」だと言い切れるぐらい圧倒的できの良さ。 周りのJavaScript対応IDEと差がかなり大きいと思うので、後1-2年は追いつけるレベルのものが出てこない予感。<br /> <cite><a href="http://efcl.info/2010/1027/res2023/">最強のJavaScript IDE 「WebStorm」を使ってみた | Web scratch</a></cite>
  </p>
</blockquote>

と書いていましたが、そろそろ2年が経ちますが、WebStorm自体の進化も早いため([WebStormのアップデート頻度][35])、同程度といえる感じのIDEは少ないと思います。  
ただ、[Komodo IDE 7][36]でNodeやCoffeeScript, LESS, SCSS等のサポートが入ったり、  
[JavaScript対応のIDEをまとめてみた][37]でも言っていた意外とデキる子の[Visual Studio 2012][38]は自らJavaScriptエンジン(Chakra)を持ってるところを生かして、  
[JavaScript IntelliSense][39](コード補完)するときに実際にどのように実行されるのか解釈して表示したり、高度な補完を提供しています。

*   [ふだんのJavaScript開発環境 (Community Open Day 2012) // Speaker Deck][40]
*   [linq.js ver.3 and JavaScript in Visual Studio 2012][41]

他にも、[Light Table][42]という新しい形のIDEがでてきたりしています。(最初にサポートする言語にJavascript and Clojureがあげらている)

また、ブラウザ内で動くエディタとしてThree.jsの実行結果がその場に表示されてる[code editor][43]や[Cloud9 IDE][44]にはコード補完機能が入ったり、  
ブラウザ内エディタ等もより高度になったり、実用性が出てきたりしています。

*   [ブラウザ内のエディタ事情 &#8211; Slip Ahead Logging][45]
*   [Complete your code &#8211; Cloud9 IDE Blog][46]

このように、エディタというずっと昔からあるソフトウェアでも未だに色んな形に変化し続けているので、色々なエディタ/IDEを触ったりしてみるのも面白いことだと思います。  
最後が完全にWebStormから逸れましたが、WebStorm 5.0ベースの紹介はこれで終わり。

 [1]: http://www.jetbrains.com/webstorm/
 [2]: http://efcl.info/2010/1027/res2023/ "最強のJavaScript IDE 「WebStorm」を使ってみた | Web scratch"
 [3]: http://efcl.info/2012/0226/res3015/ "横浜JSTDDハンズオンでWebStormについて発表してきた | Web scratch"
 [4]: http://azu.github.com/slide/webstorm/webstorm.html#slide1 "WebStorm指南書"
 [5]: http://blog.jetbrains.com/webide/
 [6]: http://blog.jetbrains.com/blog/2012/09/03/back-to-school-sale-jetbrains-tools-for-up-to-50-off/ "Back To School sale: JetBrains tools for up to 50% OFF! | JetBrains Company Blog"
 [7]: http://vpc.lifecard.co.jp/
 [8]: http://blog.jetbrains.com/webide/2012/03/new-in-4-0-javascript-completion-variants-ordering/ "New in 4.0: Smarter ordering of JavaScript completion options | WebStorm & PhpStorm Blog"
 [9]: http://blog.jetbrains.com/webide/2012/08/tips-on-jquery-development-in-webstorm/ "Tips on jQuery development in WebStorm | WebStorm & PhpStorm Blog"
 [10]: http://utweb.jp/blog/archives/1501 "今さらながら知ったWebStormとJSDocの深〜い関係 | 宇都宮ウエブ制作所"
 [11]: http://d.hatena.ne.jp/yuichi_katahira/20120329/1333029233 "WebStorm:追加した独自のコード補完候補をプロジェクトで使用可能にする - 仙台 Ruby Vim JavaScript社長"
 [12]: http://efcl.info/2010/1203/res2152/ "WebStormのコード補完に新しく候補を追加する方法 | Web scratch"
 [13]: http://blog.jetbrains.com/webide/2010/11/working-with-javascript-libraries-in-phpstorm-webstorm/ "Working with JavaScript Libraries in PhpStorm & WebStorm | WebStorm & PhpStorm Blog"
 [14]: http://blog.jetbrains.com/webide/2012/08/closure-syntax/ "New in 5.0: Google Closure Compiler JSDoc annotations | WebStorm & PhpStorm Blog"
 [15]: http://blog.jetbrains.com/webide/2012/03/phpstorm-webstorm-4-0-eap-117-65/ "PhpStorm & WebStorm 4.0 EAP 117.65 | WebStorm & PhpStorm Blog"
 [16]: http://azu.github.com/slide/webstorm/webstorm.html#slide28 "Code Inspections, JSLint, JSHint"
 [17]: https://img.skitch.com/20120909-xcj2uwdkc25pxw4rg57ddd69y9.png
 [18]: http://plugins.intellij.net/plugin/?webide&pluginId=6971 "JetBrains Plugin Repository :: AngularJS"
 [19]: http://azu.github.com/slide/webstorm/webstorm.html#slide36 "ECMAScript 6 (Harmony)"
 [20]: https://developer.mozilla.org/en-US/docs/E4X "E4X | MDN"
 [21]: http://azu.github.com/slide/webstorm/webstorm.html#slide30 "バージョン管理連携"
 [22]: http://blog.jetbrains.com/webide/2011/10/javascript-unit-testing-support/ "JavaScript unit testing support | WebStorm & PhpStorm Blog"
 [23]: http://c-brains.jp/blog/wsg/12/01/11-220443.php "PhpStormでjsTestDriverを使ったテストを実行する | バシャログ。"
 [24]: http://code.google.com/p/js-test-driver/wiki/HtmlDoc "Html Doc"
 [25]: http://blog.jetbrains.com/webide/files/2012/04/editor-covered-lines-2.png
 [26]: http://blog.jetbrains.com/webide/2012/04/javascript-unit-testing-with-code-coverage/ "Code Coverage for JavaScript Unit Testing | WebStorm & PhpStorm Blog"
 [27]: http://azu.github.com/slide/Kamakura/busterJS.html#slide27 "JavaScript Testing FrameworkのBusterJSを使う"
 [28]: http://blog.jetbrains.com/webide/2011/04/debugging-javascript-in-google-chrome/ "Debugging JavaScript in Google Chrome | WebStorm & PhpStorm Blog"
 [29]: http://blog.jetbrains.com/webide/2011/11/webstorm-your-node-app/ "WebStorm your Node app! | WebStorm & PhpStorm Blog"
 [30]: http://blog.jetbrains.com/webide/2012/08/liveedit-plugin-features-in-detail/ "LiveEdit plugin features in detail | WebStorm & PhpStorm Blog"
 [31]: http://www.youtube.com/watch?v=wCVwdvufTds "WebStorm 5.0 - Live Edit with Google Chrome - YouTube"
 [32]: http://confluence.jetbrains.net/display/WI/Web+IDE+EAP
 [33]: http://d.hatena.ne.jp/masanobuimai/20110420#1303311446
 [34]: http://d.hatena.ne.jp/masanobuimai/20101227#1293454205
 [35]: http://azu.github.com/slide/webstorm/webstorm.html#slide38
 [36]: http://www.activestate.com/komodo-ide/features
 [37]: http://efcl.info/2010/0920/res1952/
 [38]: http://www.microsoft.com/visualstudio/11/ja-jp/downloads
 [39]: http://msdn.microsoft.com/ja-jp/library/vstudio/bb385682.aspx
 [40]: https://speakerdeck.com/u/mayuki/p/javascript-community-open-day-2012
 [41]: http://www.slideshare.net/neuecc/linqjs-ver3-and-visual-studio-2012-in-javascript
 [42]: http://www.kickstarter.com/projects/ibdknox/light-table
 [43]: http://mrdoob.com/projects/code-editor/
 [44]: http://cloud9ide.posterous.com/
 [45]: http://stillpedant.hatenablog.com/entry/2012/08/20/190742
 [46]: http://cloud9ide.posterous.com/complete-your-code