---
title: WebStorm 7EAPのkarma連携について
author: azu
layout: post
permalink: /2013/0601/res3292/
dsq_thread_id:
  - 1346156376
categories:
  - javascript
tags:
  - javascript
  - test
  - WebStorm
---
[WebStorm 7 EAP][1] がリリースされましたが、今までは[JsTestDriver][2]ぐらいしかテスト連携のサポートは入っていませんでしたが、[karma][3]のサポートが追加されました。

## KarmaとWebStormの設定

まだ、karma@canary(いわゆるdevloperバージョン)でしか動かないらしいので、

以下のように [karma][3] のcanaryをインストールします

    $ npm install -g karma@canary
    

次に、通常のようにkarmaのセットアップをするため、 `karma init` を実行してconfファイルを作ります。

    karma init
    

今回は、デフォルトのJasmineの構成にしました。

次にWebStormでプロジェクトを開いて、WebStormのkarmaの設定をします。

<img src="https://efcl.info/wp-content/uploads/2013/05/RunDebug-Configurations-2013-05-31-22-13-37.jpg" alt="RunDebug Configurations 2013 05 31 22 13 37" title="RunDebug Configurations 2013-05-31 22-13-37.jpg" border="0" width="600" />

RunDebug Configurationsにkarmaが増えているのでそれを追加して、 `karma.conf.js` のパスを設定してあげればWebStormの設定は完了です。

## Karmaのテストを実行

作成したConfigurationsをRunするとKarmaサーバが起動します。(karma start)

<img src="https://efcl.info/wp-content/uploads/2013/05/karma_webstorm_server.jpg" alt="HelloTest js  karma webstorm" title="karma_webstorm_server.jpg" border="0" width="600" height="268" />

Karmaサーバにテストしたいブラウザでアクセスしてキャプチャしておきます。  
(デフォルトでは http://localhost:9876/ にアクセス)

ブラウザがキャプチャした状態で、もう一度Runするとテストが実行されて結果が見られます。

<img src="https://efcl.info/wp-content/uploads/2013/05/helloTest.js.jpg" alt="HelloTest js  karma webstorm   ~DropboxworkspaceJavaScriptprojectkarma webstorm  WebStorm WS 130 753 2013 05 31 22 24 16" title="helloTest.js.jpg" border="0" width="600" height="181" />

BDD系のJasmineなので、構造的なテスト結果の表示になっています。

<img src="https://efcl.info/wp-content/uploads/2013/05/context-karma.png" alt="2013 05 31 at 22 26 50" title="context-karma.png" border="0" width="600" height="367" />

Jump to Source等のテスト結果からの移動やエラーログからのジャンプはできるようになっていて便利です。  
まだ、個別のテストを実行するRunやDebugなどは対応してないようです。

Debug実行に対応してないので、ブレークポイントを貼ってデバッガー連携はまだできない様子???

テストコンソールを見ると、Auto-Test というアイコンがあり、これを有効にすると一定時間ごとにテストを走らせて、  
結果をMacだとNotification Centerとアイコンに表示してくれるようです。

<img src="https://efcl.info/wp-content/uploads/2013/05/toogle-auto-test.png" alt="2013 05 31 at 22 25 52" title="toogle-auto-test.png" border="0" width="240" height="254" />

<img src="https://efcl.info/wp-content/uploads/2013/05/Icon-karma-webstorm.jpg" alt="失敗したテストの個数" title="Icon-karma-webstorm.jpg" border="0" width="34" height="40" /> 失敗したテストの個数を表示してくれてる。

## まとめ

*   [karma][3] のテスト結果がWebStormないから見やすくなった
*   karmaを使ったテストのデバッグがしやすくなった
*   JSTD以外のTest Runner連携がWebStormについた

今までは、古臭いJsTestDriverのサポートしかありませんでした([NetBeans 73][4]にも最近同様の機能が入りました)。

以下のようにJavaScript Test Runnerは色々出ていますが(個人的は[Yeti][5]も気になります)、

<img src="https://efcl.info/wp-content/uploads/2013/05/javascript-test-why-what-how-130426060325-phpapp01.jpg" alt="Javascript test why what how 130426060325 phpapp01" title="javascript-test-why-what-how-130426060325-phpapp01.jpg" border="0" width="600" height="450" />

via [JavaScript Unit Test Why? What? How?][6]

初期の頃からWebStormからデバッグしやすいようにしていたりした、[karma][3] が対応されるのは順当な感じがします。  
(AngularJSのpluginとかコミュニティ的にもWebStormと馴染みが大きそうだし)

まだ、EAPなので中途半端な部分もありますが、これからもテスト連携周りが色々良くなって行くといいなと思います。

## 余談

WebStormとブラウザを連携するような機能は、[LiveEdit][7]やJavaScriptデバッガー連携などがありますが、このような機能は他のエディタでも見かけるようになってきたと思います。

[Brackets][8]でも Live Preview や、NodeやChromeのデバッガーと連携して、エディタ上からブレークポイントを貼ったりできます。

*   [ライブプレビューで編集している部分がハイライトされるHTML・CSSエディタ『Brackets』 &#8211; Macの手書き説明書][9]

また、Bracketsだと[adobe-research/theseus · GitHub][10]というデバッガーのプラグインも先進的で面白いです。

*   [Brackets: Better JavaScript Debugging with Theseus &#8211; YouTube][11]

[Light Table 0.4][12]でもブラウザと繋いでリアルタイム編集(Live Edit的な)やJavaScriptをevalで評価してインラインにその結果をインスペクタ的に表示したりなどができます。

<img src="https://efcl.info/wp-content/uploads/2013/06/ligttable-html.png" alt="Skitched 20130601 110418" title="ligttable-html.png" border="0" width="600" height="422" />

こういう実行環境と連携する機能が色々出ていてワクワクしますが、こういう機能がどうしたら安定(動作自体や仕様的な面、色んなエディタに普及)するのかが最近の考えどころです。

 [1]: http://blog.jetbrains.com/webstorm/2013/05/webstorm-7-eap/ "WebStorm 7 EAP"
 [2]: https://blog.jetbrains.com/webide/2011/10/javascript-unit-testing-support/#comments "JsTestDriver"
 [3]: https://github.com/karma-runner/karma "karma-runner/karma · GitHub"
 [4]: http://wiki.netbeans.org/NewAndNoteworthyNB73#Unit_Testing "NetBeans 73"
 [5]: http://yeti.cx/ "Yeti"
 [6]: http://www.slideshare.net/teppeis/javascript-testwhywhathow "JavaScript Unit Test Why? What? How?"
 [7]: https://blog.jetbrains.com/webide/2012/08/liveedit-plugin-features-in-detail/ "LiveEdit"
 [8]: http://download.brackets.io/ "Brackets"
 [9]: http://veadardiary.blog29.fc2.com/blog-entry-4489.html "ライブプレビューで編集している部分がハイライトされるHTML・CSSエディタ『Brackets』 - Macの手書き説明書"
 [10]: https://github.com/adobe-research/theseus "adobe-research/theseus · GitHub"
 [11]: http://www.youtube.com/watch?v=-J5LG2bFPMg "Brackets: Better JavaScript Debugging with Theseus - YouTube"
 [12]: http://www.chris-granger.com/2013/04/28/light-table-040/ "Light Table 0.4"
