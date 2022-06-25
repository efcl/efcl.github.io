---
title: testemで任意のHTMLでテストを動かす方法とJavaScriptデバッガ連携
author: azu
layout: post
permalink: /2013/0405/res3256/
dsq_thread_id:
  - 1186512307
categories:
  - javascript
tags:
  - javascript
  - test
---
# testem

Test Runnerの[testem][1]を使ったテストについてメモ

testem自体については以下などを見るといい気がします。

*   [JavaScriptのテストツール「testem」が素晴らしいぞ | Mach3.laBlog][2]
*   [Testem 0.1.0 Released and Screencasts][3]

[testem][1] の仕組み的には、テストを実行するためのHTMLページを用意して、  
testem のローカルサーバ上でそれを表示してテストを実行しています。

testem自体は特にmatcher等は持ってなくて、[adapter][4] を書いて、jasmineやBuster.JS、QUnit等の構文を使ったテストを走らせた結果を得られるようにしてます。

[Example Projects][5] で紹介されてますが、この辺が充実してるのがtestemのいいところでもあります。

## カスタムHTML

[testem/views at master · airportyh/testem · GitHub][6] に内蔵されてるjasmineやBuster.JS等のテストを実行するページとなるHTMLがありますが、  
今回はこれを自作してみます。

サンプルプロジェクトは以下にあります。

正直デフォルトのBuster.JSと殆ど同じですが、ユーザーが用意したHTMLでも同様のことができることを示すだけのサンプルです。

*   [azu/testem-custom-test-page][7]

[testem.json][8] の設定ファイルでテストページの **ベース** となるHTMLとソースファイルを指定しています。

    {
        "src_files": [
            "*.js"
        ],
        "test_page": "tests.html"
    }
    

そしてベースとなるHTMLを見ていきます。

[testem-custom-test-page / tests.html][9]

{% raw %}

    < !doctype html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <title>Test'em</title>
        <link rel="stylesheet" href="/testem/buster-test.css"/>
        <script src="/testem/buster-test.js"></script>
        <script src="/testem.js"></script>
        {{#serve_files}}<script src="{{src}}" charset="UTF-8"></script>{{/serve_files}}
    </head>
    <body></body>
    </html>
    
{% endraw %}

直接HTMLにテストしたいファイルを並べても問題はありませんが、せっかくなので `testem.json` と連動した動きにしたいと思います  
HTMLを見ると気付きますが、 `testem.json` の `src_files` に対応する部分を展開するテンプレートが使えます。

`$ testem` を実行すると、テストページは以下のように展開されます。

    < !doctype html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <title>Test'em</title>
        <link rel="stylesheet" href="/testem/buster-test.css"/>
        <script src="/testem/buster-test.js"></script>
        <script src="/testem.js"></script>
        <script src="hello-test.js" charset="UTF-8"></script><script src="hello.js" charset="UTF-8"></script></head>
    <body></body>
    </html>
    

後は、普通に `http://localhost:7357` なCapture URLにアクセスしていけばテストが動作します。

<img src="https://efcl.info/wp-content/uploads/2013/04/BuildHive1.-testem-.jpg" alt="1 testem" title="1. testem .jpg" border="0" width="376" height="204" />

この辺、シンプルな仕組みながらもちゃんと拡張できるようになっていて、[testem][1]よく出来てるなーと思いました。

カスタムHTMLについて調べ始めた理由は何かテストページが文字化けしてたので試してみましたが、文字化けの原因はべつの所だった…

*   [fix garbled UTF-8 characters by azu · Pull Request #193 · airportyh/testem][10]

## WebStormのJavaScriptデバッガー連携

上記の仕組みを見てピンと来る人は来ると思いますが、  
WebStormのJavaScriptデバッガーとの連携がものすごく簡単にできます。

*   [WebStormからtestacularでテストとデバッグをする方法 | Web scratch][11]
*   [WebStormのデバッガでBuster.JSのテストをデバッグをする方法 | Web scratch][12]

設定はものすごく単純で、

    Type: JavaScript Debug
    Name: Chrome
    URL to open: http://localhost:7357/
    // ポートは設定ファイルのportに合わせます
    Remote URL : http://localhost:7357/
    // ルートとなる所
    

<img src="https://efcl.info/wp-content/uploads/2013/04/BuildHiveRunDebug-Configurations-2013-04-04-23-58-18.jpg" alt="RunDebug Configurations 2013 04 04 23 58 18" title="RunDebug Configurations 2013-04-04 23-58-18.jpg" border="0" width="600" />

たったこれだけで、 `$ testem` にてCapture待ちの状態にしておいて、  
WebStormからDebug実行で先程のJavaScript Debugを起動させるとJavaScriptデバッガー連携ができます。

<img src="https://efcl.info/wp-content/uploads/2013/04/BuildHivehello-test.js-testem-custom-test-page-DropboxworkspaceJavaScriptprojecttestem-custom-test-page-2013-04-04-23-57-21.jpg" alt="Hello test js  testem custom test page   ~DropboxworkspaceJavaScriptprojecttestem custom test page 2013 04 04 23 57 21" title="hello-test.js - testem-custom-test-page - [~DropboxworkspaceJavaScriptprojecttestem-custom-test-page] 2013-04-04 23-57-21.jpg" border="0" width="600" />

[testem][1]はTest Runnerに徹しているため、複雑な設定なしにすぐにテストを書き始められる所が魅力的で、またシンプルな仕組みなため意外と他との連携がやりやすい作りになっています。

`testem ci` のコマンドを使えば、  
[CI as a Service – ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ | Web scratch][13] で書いてた、Capture URLにアクセスしてテストを実行してという手順を、`testem ci`という一つのコマンドでできるのでお手軽です。

*   [testem + mocha on Travis-CI &#8211; ブラウザでのテストを自動化する &#8211; 四角革命前夜][14]

利用したサンプル

*   [azu/testem-custom-test-page][7]

 [1]: https://github.com/airportyh/testem "testem - Test'em 'Scripts! A test runner that makes Javascript unit testing fun."
 [2]: http://blog.mach3.jp/2012/10/js-testem-script.html "JavaScriptのテストツール「testem」が素晴らしいぞ | Mach3.laBlog"
 [3]: http://tobyho.com/2012/08/29/testem-intro-screencast/ "Testem 0.1.0 Released and Screencasts"
 [4]: https://github.com/airportyh/testem#diy-use-any-test-framework "customAdapter"
 [5]: https://github.com/airportyh/testem#example-projects "Example Projects"
 [6]: https://github.com/airportyh/testem/tree/master/views "testem/views at master · airportyh/testem · GitHub"
 [7]: https://github.com/azu/testem-custom-test-page "Contribute to testem-custom-test-page development by creating an account on GitHub."
 [8]: https://github.com/azu/testem-custom-test-page/blob/master/testem.json "testem.json"
 [9]: https://github.com/azu/testem-custom-test-page/blob/master/tests.html "testem-custom-test-page / tests.html"
 [10]: https://github.com/airportyh/testem/pull/193 "fix garbled UTF-8 characters by azu · Pull Request #193 · airportyh/testem"
 [11]: https://efcl.info/2012/1028/res3154/ "WebStormからtestacularでテストとデバッグをする方法 | Web scratch"
 [12]: https://efcl.info/2013/0220/res3198/ "WebStormのデバッガでBuster.JSのテストをデバッグをする方法 | Web scratch"
 [13]: https://efcl.info/2013/0321/res3234/ "CI as a Service – ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ | Web scratch"
 [14]: http://d.hatena.ne.jp/sasaplus1/20130301/1362145202 "testem + mocha on Travis-CI - ブラウザでのテストを自動化する - 四角革命前夜"
