---
title: Addon-SDKでFirefoxのアドオンを書くための開発環境を作る
author: azu
layout: post
permalink: /2013/0721/res3346/
dsq_thread_id:
  - 1516360414
categories:
  - Firefox
  - javascript
  - Jetpack
tags:
  - AddonSDK
  - Firefox
  - Jetpack
  - WebStorm
---
# はじめに

久しぶりに、[Add-on SDK][1]を触ってFirefoxのアドオンを作成したのでその時の環境作りについてメモです。

内容は以下のような感じ

*   Addon SDKの概要
*   Addon SDK APIのモジュールについて
*   WebStorm
*   Addon SDK APIの補完について
*   XPCOM APIのインターフェイスについて
*   アドオンのデバッグ(デバッガ)

# Addon SDK

Firefoxのアドオン開発をするには、[Add-on SDK][1]を使うのが比較的入りやすいです。

*   一応[ 日本語 のページ ][2] もありますが古いので、リファレンスは[本家][3]を見た方がいいです。もしくは `cfx docs` を叩く
*   [Add-on SDK (Jetpack SDK) &#8211; あすかぜ・ねっと][4]

Firefox 21からAddon SDKのAPIがFirefoxに取り込まれているので、Addon SDKでビルドしたアドオン以外でもAddon SDKのAPIが利用できるようになっています。

*   [Jetpack Stripping!][5]
*   [The Add-on SDK is now in Firefox | Oxymoronical][6]

[High-Level APIs][7]と書かれてるモジュール(モジュール自体もJavaScriptで書かれてるので中見ると便利です)で、基本的な事はできるようになってます。

タブの操作、クリップボード操作、コンテキストメニュー、[hotkeys][8]でのショートカット設定、[panel][9]というポップアップのUI作成、  
Greasemonkey的なURLのマッチングをしてスクリプトを動かす[page-mod][10]、特定のURLを読み込ませてその中で動くスクリプトを送り込んで値などを取ってくる[page-worker][11]、  
通知を行う[notifications][12]等があります。

データの保存は、jsonでシンプルにオブジェクトを保存する[simple-storage][13]やpackage.jsonに記録したい項目と入力の種類を書いておけば設定画面も一緒に作ってくれる[simple-prefs][14]、使いづらいことに定評のあるIndexedDB APIをラップした[indexed-db][15]  
等があります。

また、[Unit Testing][16]というモジュールが最初からあり、`cfx init`でデフォルトテンプレートした段階で `cfx test`でテストを書ける環境が揃ってます。  
[test/httpd][17] を使うとローカルサーバを立てられたりするので便利です。  
(もう少しテストの書式が一般的だといい気がするけど。。)

また、AddonSDKでの実行は[local.json][18]や[cfx test][19]の引数で指定したプロファイルをコピーして実行されるので、テストでプロファイルを壊しても、毎回キレイな状態から始まる(*要出典)のでテストしやすい環境があると思います。  
Travis CIとかと似たような感じ?

Firefoxの機能自体に関係ないものだと、[promise][20]や[uuid][21]、set的な使い方をする[collection][22]等もあったりします。

足りない機能は、通常のFirefoxアドオンと同じように[XPCOM][23]を叩けば使えるモジュールを使える)ので、Addon SDKだからできないという事は大分少ないと思います。

XPCOMを叩くときは[xpcom][24]モジュールや、通常のアドオンと同じように`Components.classes` などを使う、[Chrome Authority][25]が使えます。

以下みたいにAddonSDKのモジュールを公開してる人(中の人ですが)もいます。  
モジュールは[package.json][26]の `dependencies` に書くことでアドオンから利用できるようになっています。

(この辺のモジュールをnpmとかcocoapodsみたいに共有する仕組みが欲しい…)

*   [erikvold/addon-pathfinder][27]

補足:

*   [Add-on SDK update for Firefox 22 (and 23, and 24) | Mozilla Add-ons Blog][28]
*   [Firefox 23 にて、Add-on SDKでもChrome URLを登録できる(XULなWindowsが使える)ようになる &#8211; Enjoy*Study][29]

## 開発環境

公式ドキュメントはまあまあ充実していますが、他のブログ等のリソースが少ない問題があります。(これはJetpackがたどってきた歴史やMozillaにも問題がある気がしますが)

ドキュメントは前述したように `org` ドメインの方を見ましょう

*   [Add-on SDK Documentation][3]

以下は、[WebStorm][30]を少し前提に書きますが、扱う内容自体は一般的な内容なので他のエディタ次第でも似たような事ができるはずです。

### Webstorm

Addon SDKのモジュール郡では、分割代入やlet,constなどECMAScript 6の内容や、Mozilla JavaScript固有の書き方等が頻繁に使われています。

WebStormでは、利用するJavaScriptのバージョンを `Setting -> JavaScript` から選択できるので、[ECMAScript 6 (Harmony)][31] を選択しておくと大体問題ないです。  
(一部、for eachとかアレですが、基本的にビルドインモジュールは編集しないので問題ないです)

毎回CLIから `cfx run` と叩いて起動するのは面倒なので、以下の様なシェルスクリプトを作って、それをExternal Toolsに設定して呼び出して起動させています。

*   [azu/addonsdk\_cfx\_wrapper][32]

`Setting -> External Tools` に以下のように登録

    Program : /path/to/cfx-wrapper.sh
    Parameters : -a "path/to/addon-sdk/" -w "$ProjectFileDir$"
    

WebStormのコンソールに結果が表示される(Console APIの内容も)ので、CLIを叩かなくても、runを繰り返せます。

### Addon SDK APIの補完

AddonSDKのソースコードを見るとわかります、[addon-sdk / lib / sdk /][33] にSDKで使えるモジュールが定義されています。

*   [mozilla/addon-sdk][34]

見るとわかりますが、殆どJavaScriptで書かれているため、JavaScriptを静的解析できるエディタなら、モジュールの補完に利用できます。

WebStormの場合、 `Setting -> JavaScript -> Libraries` から `addon-sdk/lib/sdk/` のディレクトリを登録する事で先ほどのJavaScriptを解析した結果を補完に利用できます。

<img src="https://efcl.info/wp-content/uploads/2013/07/Edit-Library-2013-07-18-23-34-22.jpg" alt="Edit Library 2013 07 18 23 34 22" title="Edit Library 2013-07-18 23-34-22.jpg" border="0" width="600" height="212" />

*   [WebStorm:追加した独自のコード補完候補をプロジェクトで使用可能にする &#8211; 仙台 Ruby Vim JavaScript社長][35]

`Setting -> Direcotories` に 先ほどの `addon-sdk/lib/sdk/` のディレクトリを追加することでも同じようにAddonSDK APIの補完が効きます(Librariesに追加するほうが汎用性がありますが)

<img src="https://efcl.info/wp-content/uploads/2013/07/Preferences-2013-07-18-23-32-35.jpg" alt="Preferences 2013 07 18 23 32 35" title="Preferences 2013-07-18 23-32-35.jpg" border="0" width="600" height="100" />

JavaScriptで書かれているので、モジュールが実際にどういう処理をしているのかも簡単に確認できるのは利点です。

*   [WebStorm指南書][36]

### JSDoc

AddonSDK APIは比較的問題なく([Chrome Script < -> Content Script][37]は理解するまで分かりにくいですが…)、馴染めると思います。

しかし、ビルドインモジュールで足りない場合はXPCOMを叩く必要があります。  
例えば、ファイルのダウンロードをするモジュールは今のところないので、自分で `nsIWebBrowserPersist::saveURI` などを使ってやる必要があります。

*   [ダウンロードマネージャに進捗状況を表示させつつダウンロードする | Mozilla Developer Street (modest)][38] `dlMgr.addDownload`とかにprivacyの引数が増えてるのでそのままでは動かないです…

これらのAPIを叩く場合は、[XPCOM Interface][39]に載っているようなインタフェースを知る必要が出てきます。

当然、受け取る引数もAddonSDK APIとは違い、[nsIURL][40]や[nsIFile][41]など、[XPCOM Interface][39]のものを扱う必要がでてきて一気に難易度が上がります。

*   [XPCOMについてざっと調べたこと &#8211; フリーフォーム フリークアウト][42]

表題に戻って、これらのXPCOM InterfaceをJSDoc(ver3)に変換して少しでもエディタが解釈できる形に落としこみたいと思います。

XPCOMは[XPIDL][43]という言語で書かれたインターフェイスファイルが公開されていて、そこにAPIのインターフェイスがのっているのでそれを利用します。

公式に、[pyxpidl][44]というものが公開されていて、これはXPIDLの内容をC++とJavaのインターフェイスファイルを生成してくれます。(何でJSDocないの…)

これを改造してXPIDL -> JSDocに変換できるようにした[azu/XPIDL-JSDOC][45]というものを適当に作りました。  
(汚いというレベルじゃないので、誰かちゃんと作って欲しい…)

*   [Gecko/XULRunner SDK][46] をダウンロードしてxulrunner-sdk/sdk/binに上書きしたら適当に動きます。

こういう感じのJSDocを書き出します。  
(propertyの型もちゃんと設定したかったけど、Pythonわからなくて諦めた)

<div class="highlight">
  <pre><span class="cm">/** </span>
<span class="cm"> * nsIURL IDL</span>
<span class="cm"> * @typedef {Object} nsIURL</span>
<span class="cm"> * @property filePath attribute AUTF8String filePath;</span>
<span class="cm"> * @property query attribute AUTF8String query;</span>
<span class="cm"> * @property directory attribute AUTF8String directory;</span>
<span class="cm"> * @property fileName attribute AUTF8String fileName;</span>
<span class="cm"> * @property fileBaseName attribute AUTF8String fileBaseName;</span>
<span class="cm"> * @property fileExtension attribute AUTF8String fileExtension;</span>
<span class="cm"> * @property GetCommonBaseSpec AUTF8String getCommonBaseSpec (in nsIURI aURIToCompare);</span>
<span class="cm"> * @property GetRelativeSpec AUTF8String getRelativeSpec (in nsIURI aURIToCompare);</span>
<span class="cm">*/</span>
<span class="kd">var</span> <span class="nx">nsIURL</span> <span class="o">=</span> <span class="p">{};</span>
</pre>
</div>

WebStorm7EAP以降なら、[@typedef][47]に対応してるみたいですがこの書き方が正解なのかよく分からない…

例えば、先ほどのファイル保存する機能を持ったモジュールを作ろうとした時に、ファイル保存するXPCOMのAPIは `nsIURL` を引数に取るので以下のように、引数に `nsIURL` の型を取るといった定義を書けるようになります。  
(正直APIの補完にはあんまり使えないと思います。)

*   [io.js][48] 実際につくったやつ

<div class="highlight">
  <pre><span class="cm">/**</span>
<span class="cm"> * ``saveURL`` Util</span>
<span class="cm"> * @param {Window} window</span>
<span class="cm"> * @param {nsIURL} sourceURI</span>
<span class="cm"> * @param {nsIURL} fileURI</span>
<span class="cm"> * @param {string} filename</span>
<span class="cm"> * @return {promise} promise</span>
<span class="cm"> */</span>
<span class="kd">var</span> <span class="nx">saveFile</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">(</span><span class="nb">window</span><span class="p">,</span> <span class="nx">sourceURI</span><span class="p">,</span> <span class="nx">fileURI</span><span class="p">,</span> <span class="nx">filename</span><span class="p">){</span>
<span class="p">}</span>
</pre>
</div>

ちなみに、[io.js][48]の方を見るとわかりますが返り値はAddonSDKの[promise][20]を返してます。

少なくてもエディタが何らかの補助をしてくれるなら、事故率は減るのでやっぱりキチンとしたXPCOMのJSDocが欲しいです。。

## デバッグ

Addon SDKで作成したアドオンのデバッグは、Firefox buildinのデバッガを使って行う事ができます。  
また、 `console.log()`等のConsole APIを使ったprintデバッグもできます。

<img src="https://efcl.info/wp-content/uploads/2013/07/2013-07-21-at-14.35.png" alt="2013 07 21 at 14 35" title="2013-07-21 at 14.35.png" border="0" width="600" height="499" />

FirefoxにもChromeのようにネイティブのデバッグツールが色々増えていて、名前がややこしいですが以下の様な使い分けです。

1.  ウェブページのデバッグ(Content) -> Browser Console
2.  アドオンのデバッグ(Chrome) -> Browser Debugger

アドオンのデバッグにはChrome権限で動いてるスクリプトが見られる `Browser Debugger` の方を使います。

[デバッガ][49] の使い方は以下を見るといいかもしれません。

*   [開発ツール &#8211; Firefoxアドオンの開発手法][50]
*   [ブラウザデバッガ (Browser Debugger)][51]
*   [デバッガ &#8211; Tools | MDN][52] デバッガーツールの画面説明

## おわり

久々に、Addon SDKを触ってアドオンを作りましたが、デバッガやテスト環境、ある程度使い方がわかりやすいモジュールが揃っているので、アドオンを作る敷居は以前に比べれば低くなってきたかなと思います。  
(デバッガー周りはまだ挙動不審なことが事がありますが)

今回、Addon SDKを触りだした理由はGreasemonkey以上(具体的にはDownload APIが欲しかった)のことをやろうとして、  
最初はKeySnail上でささっと作りましたが、簡単なツールバーボタンのようなUIや *Content(ウェブページ) < -> Chrome(アドオン)* を行き来するようなものを必要になって、  
userChrome.jsのようなスクリプトだと逆に面倒になりそうだったので、[Add-on SDK][53]でアドオンとして作りました。

Greasemonkeyライクな事は[page-mod][10]や[page-worker][11]を使えばできますし、  
[panel][9]や[widget][54]を使えば簡単なUIは作れるので、Greasemonkey以上の事を簡単にやりたいときに触ってみるといいんじゃないかなーと思います。

 [1]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/ "Add-on SDK"
 [2]: https://dev.mozilla.jp/addon-sdk-docs/ "Add-on SDK"
 [3]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/ "Add-on SDK Documentation"
 [4]: http://www.asukaze.net/etc/jetpack/ "Add-on SDK (Jetpack SDK) - あすかぜ・ねっと"
 [5]: http://work.erikvold.com/jetpack/2013/07/12/jetpack-stripping.html "Jetpack Stripping!"
 [6]: http://www.oxymoronical.com/blog/2013/02/The-Add-on-SDK-is-now-in-Firefox "The Add-on SDK is now in Firefox | Oxymoronical"
 [7]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/high-level-apis.html "High-Level APIs"
 [8]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/hotkeys.html "hotkeys"
 [9]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/packages/addon-kit/panel.html "panel"
 [10]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/packages/addon-kit/page-mod.html "page-mod"
 [11]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/packages/addon-kit/page-worker.html "page-worker"
 [12]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/notifications.html "notifications"
 [13]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/simple-storage.html "simple-storage"
 [14]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/simple-prefs.html "simple-prefs"
 [15]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/indexed-db.html "indexed-db"
 [16]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/tutorials/unit-testing.html "Unit Testing"
 [17]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/test/httpd.html "test/httpd"
 [18]: https://dev.mozilla.jp/2011/08/add-on-sdk-panel-widget-knagato/ "local.json"
 [19]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/cfx-tool.html#cfx-test "cfx test"
 [20]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/packages/api-utils/promise.html "promise"
 [21]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/packages/api-utils/uuid.html "uuid"
 [22]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/packages/api-utils/collection.html "collection"
 [23]: https://developer.mozilla.org/ja/docs/XPCOM "XPCOM"
 [24]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/packages/api-utils/xpcom.html "xpcom"
 [25]: https://addons.mozilla.org/en-US/developers/docs/sdk/Firefox-22/dev-guide/tutorials/chrome.html "Chrome Authority"
 [26]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/package-spec.html "package.json"
 [27]: https://github.com/erikvold/addon-pathfinder "erikvold/addon-pathfinder"
 [28]: https://blog.mozilla.org/addons/2013/06/25/add-on-sdk-update-for-firefox-22-and-23-and-24/ "Add-on SDK update for Firefox 22 (and 23, and 24) | Mozilla Add-ons Blog"
 [29]: http://onozaty.hatenablog.com/entry/2013/07/14/025618 "Firefox 23 にて、Add-on SDKでもChrome URLを登録できる(XULなWindowsが使える)ようになる - Enjoy*Study"
 [30]: http://www.jetbrains.com/webstorm/ "WebStorm"
 [31]: https://azu.github.io//slide/webstorm/webstorm.html#slide36 "ECMAScript 6 (Harmony)"
 [32]: https://github.com/azu/addonsdk_cfx_wrapper "azu/addonsdk_cfx_wrapper"
 [33]: https://github.com/mozilla/addon-sdk/tree/master/lib/sdk "addon-sdk / lib / sdk /"
 [34]: https://github.com/mozilla/addon-sdk "mozilla/addon-sdk"
 [35]: http://d.hatena.ne.jp/yuichi_katahira/20120329/1333029233 "WebStorm:追加した独自のコード補完候補をプロジェクトで使用可能にする - 仙台 Ruby Vim JavaScript社長"
 [36]: https://azu.github.io//slide/webstorm/webstorm.html#slide16 "WebStorm指南書"
 [37]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/guides/two-types-of-scripts.html
 [38]: https://dev.mozilla.jp/2009/12/downloading-files-with-download-manager/ "ダウンロードマネージャに進捗状況を表示させつつダウンロードする | Mozilla Developer Street (modest)"
 [39]: https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference "XPCOM Interface"
 [40]: https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIURL "nsIURL"
 [41]: https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIFile "nsIFile"
 [42]: http://d.hatena.ne.jp/cou929_la/20100221/1266735791 "XPCOMについてざっと調べたこと - フリーフォーム フリークアウト"
 [43]: https://developer.mozilla.org/en-US/docs/XPIDL "XPIDL"
 [44]: https://developer.mozilla.org/en-US/docs/XPIDL/pyxpidl "pyxpidl"
 [45]: https://github.com/azu/XPIDL-JSDOC "azu/XPIDL-JSDOC"
 [46]: https://developer.mozilla.org/ja/docs/Gecko_SDK "Gecko/XULRunner SDK"
 [47]: http://usejsdoc.org/tags-typedef.html "@typedef"
 [48]: https://gist.github.com/azu/6030124 "io.js"
 [49]: https://developer.mozilla.org/ja/docs/Tools/Debugger "デバッガ"
 [50]: http://www.crystal-creation.com/web-appli/technical-information/browser/firefox/add-on/develop/introduction/tool/ "開発ツール - Firefoxアドオンの開発手法"
 [51]: http://www.crystal-creation.com/web-appli/technical-information/browser/firefox/add-on/develop/introduction/tool/#browser-debugger "ブラウザデバッガ (Browser Debugger)"
 [52]: https://developer.mozilla.org/ja/docs/Tools/Debugger "デバッガ - Tools | MDN"
 [53]: https://addons.mozilla.org/ja/developers/builder "Add-on SDK"
 [54]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/widget.html "widget"
