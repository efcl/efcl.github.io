---
title: power-assertでJavaScriptのテストをする ブラウザ編
author: azu
layout: post
permalink: /2014/0411/res3820/
dsq_thread_id:
  - 2603022782
categories:
  - javascript
tags:
  - browser
  - javascript
  - library
  - test
---
# [power-assert][1]

[power-assert][1]という単純なアサーションでも、テストが失敗した時に分かりやすい情報を出せるテストライブラリ/ツールについての記事です。

前回、[power-assertの使い方 Node.js編 | Web scratch][2]ではpower-assertの動作やNode.jsプロジェクトでの簡単な導入方法について解説しました。

前回の[power-assert + gulp][3]で紹介したプロジェクトをそのまま使っていくので、見ていない場合はそちらから見ていたほうがいいかと思います。

今回は、**ブラウザ**でのpower-assertの動かし方とデバッグについて書いていきたいと思います。

今回扱う実行環境

*   [Node.js][2] ＜＝ 前回
*   **ブラウザ**
*   **Browserify**

## 前回やったこと

まずは前回紹介したgulp + power-assertのプロジェクトを元にやっていきます。

*   [azu/power-assert-testem-seed at 0.0.3][4]

どんな事をやったかを簡単にまとめてみます。

必要なモジュールのインストール

    $ npm install --save-dev power-assert gulp gulp-espower
    $ npm install -g gulp
    

テストコードをpower-assert化、mochaでテストを実行する[gulpfile.js][5]のタスクを書きました。

そして、`gulp test`とするとNode.jsでのテストが動くところまでやりました。

    $ gulp test
    

今回は、これに[testem][6]を使ってブラウザでも同じpower-assertを使ったテストが動くようにしたいと思います。

## <a name="testem">Testemを使ったブラウザ対応</a>

ブラウザでpower-assertを実行するには、次のようなものが必要です。

*   power-assert化したテストコード(これは既にありますね)
*   test runnerとなるHTMLページ
*   HTMLページで読み込むブラウザ向けの`power-assert`の関連ライブラリ 
    *   Node.jsの場合は`require("power-assert");`で済みますがブラウザは自分で依存関係を解決する必要があります。

素でHTMLページを作り、変換したコード等を読み込んで実行するのでもよいのですが、  
その辺は[Karma][7]や[testem][8]等を使って出来ると思うので、今回は[testem][8]を使ってやってみたいと思います。

そのため、方針としては次のようになります。

1.  ブラウザ向けの`power-assert`ライブラリを`bower install`
2.  `testem.json` でブラウザでmocha + power-assertで実行出来る環境を作る

**完成したサンプルプロジェクト**は以下に置いてあります。

*   [azu/power-assert-testem-seed][9]

ブラウザ向けに`power-assert`は[Bower][10]を使うことで簡単にインストールできます。

    bower init
    bower install power-assert --save
    

で**1**のインストールが完了です。

次にTestemをインストールしてない場合はインストールしておきましょう

    npm install testem -g
    

Test runnerとなるHTMLページは、[testem][8]が内蔵しているため気にする必要はありません。

しかし、`<script>`タグで必要なアサーションライブラリや`power-asssert`等を読み込む必要があります。(`require("power-assert");`の代わりですね)

その読み込みを、testemの設定ファイルである`testem.json`に定義します。

    {
        "framework": "mocha",
        "before_tests": "gulp power-assert",
        "on_exit": "rm -rf ./powered-test/",
        "src_files": [
            "./test/*.js"
        ],
        "serve_files": [
            "./bower_components/power-assert/build/power-assert.js",
            "./powered-test/*.js"
        ]
    }
    

設定ファイルの内容を簡単に紹介します。

*   `"src_files"`は監視対象のファイルです 
    *   ファイルが変更されたらテストが実行されます
*   `"before_tests"` はテスト実行前に行う処理です 
    *   `gulp power-assert`でpower-assert化しています
*   `"on_exit"` はtestemが終了した時のクリーンアップ処理です
*   `"serve_files"` はHTMLページで読み込むファイルです 
    *   ブラウザで読み込まれるファイルはここに記述します

ブラウザで読み込むべきpower-assertのライブラリ関係は[using grunt-espower][11]の部分にも書いてあります。

**追記** : [power-assert 0.7.2][12]から、依存するライブラリをまとめた`build/power-assert.js`を読み込むだけでよくなりました。

これに加えて、power-assert化したテストファイル(`"./powered-test/*.js"`)を読み込みます。

これでブラウザでのテスト準備は完了です。

### Testemの実行

設定が面倒くさい分実行は簡単で`testem`とすると、ブラウザを受付状態になるので、後はテストしたいブラウザでアクセスするだけです。

    $ testem
    

以下のような感じでテストが出来ます。

Testemの中ではmochaでテストが実行されてるので、基本はあまり変わらないと思います。





power-assert化したコードは[sourcemapに対応][13]しているため、  
デバッガー等を使ってデバッグも普通に行えます。

*   [azu/power-assert-testem-seed][9]
*   [testemで任意のHTMLでテストを動かす方法とJavaScriptデバッガ連携 | Web scratch][14] 
    *   Testem + WebStormのデバッグの参考

### ハイブリッドテスト

最初に書いたテストコードでは`require`を使ってpower-assertを読み込んでいたので、そのままでは実行時エラーになります。

Node.js環境なら読み込むようにして、ブラウザでは既にglobalで読み込まれているので読み込まないようにすることが出来ます。

    if (typeof require == "function" && typeof module == "object") {
        var assert = require(&#039;power-assert&#039;);
    }
    

これで、Node.js と ブラウザ どちらでも動くテストが書けるようになりました。

[先ほどのプロジェクト][9]もNode.jsとブラウザを同時にテスト出来るようにしています。

**注記**: ブラウザだけがテスト対象なら、上記の`require`そのものを削除しても問題ありません。(というか削除すべき)

また、`global.assert = require("power-assert");`と定義したものを別のhelperファイルで読み込む等もありでしょう。

* * *

Task Runner + Test Runner を使って何とかブラウザでも実行出来るようになりましたが、  
上のハイブリッドテストを見て「Nodeで書いたコードをBrowserifyで変換してブラウザで実行すればいいのでは?」と思った方もいると思います。

そういう需要にもpower-assertは対応していて、[espowerify][15]を使うことで出来ます。

[espowerify][15]はその名前の通り、[browserify][16]の変換時にpower-assert化を行えるbrowserifyの変換モジュールです。

[browserify][16]とはNode.jsのコードをブラウザで実行出来るように変換するツールで詳しくは下記を参照して下さい

*   [npmとbrowserifyを使ったクライアントサイドのウェブアプリ開発 | Web scratch][17]

## Browserify

[espowerify][15]はBroserifyの変換モジュールとして扱います。

使い方は単純で `browserify -t espowerify` のように変換モジュールとして指定するだけで、  
browserifyによるnode.jsのコードの変換 + power-assert化を行ってくれます。

この方法のメリットは

*   Node.jsとブラウザで同じテストコードが共有できる
*   一つのファイルにまとまるため、読み込むファイルの順番などを気にしなくてよい
*   power-asert化も行えるので、他のビルドツール(gulpとか)などは必要としない
*   ソースマップも対応してるのでデバッグできる

デメリットとして、browserifyの変換も入るため変換にかかる時間が増える事があげられます。

先ほどのプロジェクトでやったような依存するライブラリの読み込み等は、  
変換して1つになったJavaScriptをtest runnerとなるHTMLページで読み込むだけで良くなるので単純です。

今度は[Karma][7]を使ってブラウザテストしてみましょう。

### <a name="karma-browserify"></a>[Karma][7] + Browserify

> [azu/power-assert-karma-seed][18] 

Testemでも出来なくはないですが、karmaにはプリプロセッサという機能があります。  
この機能ではプラグインを追加することで、テストを行う前に処理をすることが出来ます。(testemの`"before_tests"`をより柔軟にできる感じですね)

[karma-coffee-preprocessor][19]でcoffeescriptをコンパイルする等色々とプラグインがあります。

そのプリプロセッサで先ほどのbrowserifyによる変換も行う事が出来ます。(これがKarmaを選んだ理由です)

Browserifyを扱う事が出来るプリプロセッサのプラグインとして[karma-browserifast][20]を使います。

*   [karma-browserifast][20]

#### Karmaを使ったプロジェクト設定

まずは必要なものをインストールします(数が多いので[package.json][21]を見るといいです)

    npm install -g karma-cli
    npm install --save-dev espowerify karma karma-browserifast browserify mocha
    

必要なモジュールをインストールしたら、Karmaのセットアップを行います。

詳しいKarmaの使い方は[Karma &#8211; Configuration][22]等を見ましょう。

    karma init # mochaを選択する、後は自由に
    

次に、browserifyの設定を行います。

詳しくは設定方法[karma-browserifast][20]の説明を見ると良いです。

実際のkarma.confの設定は[azu/power-assert-karma-seed][18]を参照して下さい

    frameworks: [&#039;mocha&#039;, "browserify"],
    files: [
    ],
    browserify: {
        debug: true,
        files: [
            "test/**/*.js"
        ],
        transform: [
            "espowerify"
        ]
    },
    preprocessors: {
        "/**/*.browserify": "browserify"
    },
    

本来は`files`でテスト時に読み込むファイルを指定しますが、今回テストしたいファイルはプリプロセッサでbrowserifyしたファイルになります。

そのため、`files` は空でよくて、代わりに`browserify`というプロパティの`files`にテストしたいファイルを指定しています。

*   `"frameworks"` に `"browserify"` を入れる
*   `browserify` の設定をする 
    *   `browserify` の `"transform"` に `"espowerify"` を指定する
*   `preprocessors` を設定する(これは常に同じ) 

という感じでKarmaの設定は終わりです。

この状態で、`karma start` + ブラウザでキャプチャ または `karma start --browsers Chrome --single-run"`という感じでテストを実行すると以下のような事をしてくれます。

*   `test/**/*.js` 以下のファイルをそれぞれ power-assert化 + browserify化
*   キャプチャしてるブラウザで変換されたテストファイルを読み込んでテストを実行

Karmaのテストサイクルの中で変換、テストの実行をしてくれるので、  
見た目的には一時ファイルが必要なくなったり、[karma.conf.js][23]という設定ファイル一つだけ良くなるのがメリットかもしれません。

![karma+browserify][24]

こちらもsourcemapに対応してるので、ブレークポイントを貼ったデバッグも可能です。

上記でやってるのは、`karma start`でサーバを立ち上げて、ブレークポイントを貼って、`http://localhost:9876/debug.html` に対してChromeでアクセスしてデバッグという感じです。(KarmaのConfigurationをDebug実行だと上手くできない?)

(WebStormでの)Karmaのデバッグ実行は少し特殊な感じなので下記を参照して下さい。

*   [WebStorm 7を使いJavaScript テストをKarmaで動かす | JetBrains ブログ][25]
*   [Karma ユニットテストをWebStormでデバッグする &#8211; Kazzzの日記][26]

* * *

## デバッグ

さきほどからsourcemapによるデバッグが可能 ということが書いてありますが、  
sourcemapとは何かが気になる人は下記などを見るといいでしょう。

*   [Source Mapについて | mixiページ][27]
*   [Debugging JavaScript &#8211; Chrome DevTools — Google Developers][28] 
    *   Chrome DevToolsでの利用法
*   [デバッガ &#8211; 開発ツール | MDN][29] 
    *   Firefox DevToolsでの利用法
*   [Introduction to JavaScript Source Maps &#8211; HTML5 Rocks][30] 
    *   開発者ツールでの利用法、内部構造
*   [#JSオジサンで Source Map について話してきました : document][31] 
    *   sourcemapファイルの構造について。
    *   どちらかというとツールを作る人向け

簡単に言うと変換したコード(power-assert化したテストコード)と元のコードの関係をマッピングしたファイルがあることにより、通常のJavaScriptのようにデバッグが可能になる感じです。

現在のブラウザに載ってる開発者ツールやWebStorm等のIDEやエディタでも対応してるものが多いため、デバッグ時にかなり有用になると思います。

こうしたsourcemapの対応が比較的に簡単にできるのもJavaScript ASTをベースとしたツールの特徴でもあるかもしれません。

* * *

## まとめ

この記事では、以下の事について解説しました。

*   power-assertをブラウザで動かすのに必要なもの
*   [Testem][32] + gulp でのブラウザテスト対応
*   [Karma][33] + [browserify][16]でのブラウザテスト

[power-assertの使い方 Node.js編][34]に比べると、Mocha以外にもtest runnerが必要だったり(両方共内部的にMochaを利用してます)、設定が必要だったりしますが、  
power-assert化したテストファイルも問題なくブラウザで動かすことができました。

また、sourcemapにも対応しているのでデバッグも問題なくできることがわかりました。

どんなテストライブラリ(アサーション)を使うか迷ってる人は、一度 [power-assert][35] を試してみるのも楽しいと思います。

より良きJavaScriptテストを!

 [1]: https://github.com/twada/power-assert "power-assert"
 [2]: http://efcl.info/2014/0406/res3809/ "power-assertの使い方 Node.js編 | Web scratch"
 [3]: http://efcl.info/2014/0406/res3809/ "power-assert + gulp"
 [4]: https://github.com/azu/power-assert-testem-seed/tree/0.0.3 "azu/power-assert-testem-seed at 0.0.3"
 [5]: https://github.com/azu/power-assert-testem-seed/blob/0.0.3/gulpfile.js "gulpfile.js"
 [6]: https://github.com/airportyh/testem "airportyh/testem"
 [7]: https://github.com/karma-runner/karma "Karma"
 [8]: https://github.com/airportyh/testem " testem"
 [9]: https://github.com/azu/power-assert-testem-seed "azu/power-assert-testem-seed"
 [10]: http://bower.io/ "Bower"
 [11]: https://github.com/twada/power-assert#using-grunt-espower "using grunt-espower"
 [12]: https://twitter.com/t_wada/status/466863515576180736
 [13]: https://github.com/twada/espower-source "espower-source"
 [14]: http://efcl.info/2013/0405/res3256/ "testemで任意のHTMLでテストを動かす方法とJavaScriptデバッガ連携 | Web scratch"
 [15]: https://github.com/twada/espowerify "espowerify"
 [16]: https://github.com/substack/node-browserify "browserify"
 [17]: http://efcl.info/2014/0120/res3605/ "npmとbrowserifyを使ったクライアントサイドのウェブアプリ開発 | Web scratch"
 [18]: https://github.com/azu/power-assert-karma-seed "azu/power-assert-karma-seed"
 [19]: https://github.com/karma-runner/karma-coffee-preprocessor "karma-coffee-preprocessor"
 [20]: https://github.com/cjohansen/karma-browserifast "karma-browserifast"
 [21]: https://github.com/azu/power-assert-karma-seed/blob/master/package.json "package.json"
 [22]: http://karma-runner.github.io/0.12/intro/configuration.html "Karma - Configuration"
 [23]: https://github.com/azu/power-assert-karma-seed/blob/master/karma.conf.js "karma.conf.js"
 [24]: http://gyazo.com/4daa1c15931e4de407a382c8fd895339.gif
 [25]: http://blog.jetbrains.com/jp/2013/10/04/223 "WebStorm 7を使いJavaScript テストをKarmaで動かす | JetBrains ブログ"
 [26]: http://d.hatena.ne.jp/Kazzz/20130524/p1 "Karma ユニットテストをWebStormでデバッグする - Kazzzの日記"
 [27]: http://page.mixi.jp/run_page_apps.pl?page_id=287564&module_id=1630003 "Source Mapについて | mixiページ"
 [28]: https://developers.google.com/chrome-developer-tools/docs/javascript-debugging?hl=ja "Debugging JavaScript - Chrome DevTools — Google Developers"
 [29]: https://developer.mozilla.org/ja/docs/Tools/Debugger "デバッガ - 開発ツール | MDN"
 [30]: http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/ "Introduction to JavaScript Source Maps - HTML5 Rocks"
 [31]: http://imaya.blog.jp/archives/7169783.html "#JSオジサンで Source Map について話してきました : document"
 [32]: #testem
 [33]: #karma-browserify
 [34]: http://efcl.info/2014/0406/res3809/ "power-assertの使い方 Node.js編"
 [35]: https://github.com/twada/power-assert "twada/power-assert"