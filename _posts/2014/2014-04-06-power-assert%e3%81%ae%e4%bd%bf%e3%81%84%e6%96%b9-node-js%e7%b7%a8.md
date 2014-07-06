---
title: power-assertの使い方 Node.js編
author: azu
layout: post
permalink: /2014/0406/res3809/
dsq_thread_id:
  - 2590871285
categories:
  - javascript
tags:
  - javascript
  - library
  - test
  - tools
  - 設定
---
# [power-assert][1]

Power Assertとは`assert(a === b);` のような単純なアサーションでも、  
Assert失敗時(テストが通らなかった時)に分かりやすい情報を表示できるようにする機能の事を言います。

<img src="http://efcl.infol/wp-content/uploads/2014/04/power-assert.png" alt="Power assert" title="power-assert.png" border="0" width="557" height="234" />

[Jasmine][2]や[Chai][3]が持つ`should`や`expect`等言った豊富なアサーションを覚える必要なく、  
シンプルに[assert()][4]を使うだけでも十分な失敗時の情報が得られるため、沢山のアサーションを使い分けしなくていいというメリットがあります。

この記事ではPower AssertのJavaScript実装である[twada/power-assert][5]の使い方について紹介します。

## 記事を読む前に

このNode.js編とブラウザ編で分けるぐらい長い記事となってるので、  
お忙しい方は[5分ぐらいで分かるpower-assert][6]というスライドもあるので、そちらを読んでざっくり把握してみるのもいいでしょう。

<div class="kwout" style="text-align: center;">
  <a href="http://azu.github.io/slide/sakurajs/power-assert.html#/"><img src="http://kwout.com/cutout/y/hb/tj/bqs.jpg" alt="http://azu.github.io/slide/sakurajs/power-assert.html#/" title="5minで分かるpower-assert" width="600" height="314" style="border: none;" /></a> <p style="margin-top: 10px; text-align: center;">
    <a href="http://azu.github.io/slide/sakurajs/power-assert.html#/">5minで分かるpower-assert</a>
  </p>
</div>

## <a name="before-how-touse">使い方の前に</a>

[power-assert][5] の役割について簡単に解説します。

[power-assert][5]はchai等のようなアサーションのライブラリというわけではなく、コードの変換や失敗時の出力等がまとまったツールに近い位置のものです。

簡単に流れを見ると以下のような事を行います。  
(この流れは自動化できるので単純に実行時に全部やってるわけじゃないということがわかればいいと思います)

1.  テストコードをpower-assert用に変換したコードを生成します
2.  power-assert化されたテストコードを実行します
3.  テストが失敗してる時は、ロードしてる`power-assert`モジュールが[整形して][7]エラー情報を出力します

**1** でテストコードを変換する事で、3でテストが失敗した時に詳細な情報が出力出来るように書き換えたテストコードを作成しています。

**2** で実行する際に使われる `assert()` といった[アサーション][8]は、Node.jsの[Assert][9]等をそのまま使うようになっています。

詳しくは下記を見るといいと思います

*   [▶ 新しいテストライブラリのご提案 #tng10 @t_wada &#8211; YouTube][10]
*   [power-assert in JavaScript][11]
*   [カジュアルJavaScript AST][12]

## 使い方

本題のpower-assertの使い方について実行環境別に紹介します。

![gif][13]

### 実行環境

*   **Node.js**　＜＝ 今回
*   ブラウザ ＝＞ [次の記事][14]
*   Browserify ＝＞ [次の記事][14]

それぞれ実行するまでの設定をしていくので、必要な部分だけ見ていくといいでしょう。

[twada/power-assert &#8211; HOW TO USE][15] にも使い方が書いてあるためそちらも参照して下さい。

この記事ではまず、**Node.js**での使い方について解説します。

また、power-assertは[Mocha][16]で実行するのが一番相性がよいため、基本的にTest Runnerは[Mocha][16]を使っていきます。

* * *

## Node.jsで簡単にpower-assertを使う

[power-assert][5]はNode.js環境で動かすのが一番簡単です。

[Mocha][16]には`--require`で指定したモジュールをテスト実行に読み込む仕組みがあります。

この読み込むモジュールに[espower-loader][17]を使うことで、[使い方の前に][18]で説明したような変換フェーズ等を意識しないで使う事が出来ます。

[espower-loader][17]の説明を読むと、`enable-power-assert.js` 等の設定ファイルが必要になりますが、毎回書くことは同じなので、[intelli-espower-loader][19]を使うと余計な設定ファイルなしに利用できます。

そもそも何を設定する必要があるかというと、テストファイルがどこにあるかという事を指定する必要があります。[intelli-espower-loader][19]ではこれをpackage.jsonに持たせることが出来ます。

### power-assertをプロジェクトに導入する

サンプルプロジェクトは以下に置いてあります

*   [azu/power-assert-node-seed][20]

<img src="http://efcl.infol/wp-content/uploads/2014/04/power-assert-node-seed-2014-04-06-22-50-36-2014-04-06-22-51-51.png" alt="Power assert node seed 2014 04 06 22 50 36 2014 04 06 22 51 51" title="power-assert-node-seed] 2014-04-06 22-50-36 2014-04-06 22-51-51.png" border="0" width="392" height="145" />

power-assertを使いたいプロジェクトに[power-assert][5]と[intelli-espower-loader][19]をインストールします。

    $ npm install power-assert intelli-espower-loader --save-dev
    

次に、package.jsonに`"directories"`という項目を追加して、`"test"` の値にテストディレクトリを指定します。(そのディレクトリ以下にあるファイルがpower assert化の対象になります)

    "directories": {
        "test": "test/"
    }
    

最後に、テストコードを書いて`test/`ディレクトリ以下に置きます。

[test.js][21]

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">assert</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;power-assert&#39;</span><span class="p">);</span>
<span class="nx">describe</span><span class="p">(</span><span class="s1">&#39;Array&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">beforeEach</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
        <span class="k">this</span><span class="p">.</span><span class="nx">ary</span> <span class="o">=</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">];</span>
    <span class="p">});</span>
    <span class="nx">describe</span><span class="p">(</span><span class="s1">&#39;#indexOf()&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
        <span class="nx">it</span><span class="p">(</span><span class="s1">&#39;should return index when the value is present&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
            <span class="kd">var</span> <span class="nx">zero</span> <span class="o">=</span> <span class="mi"></span><span class="p">,</span> <span class="nx">two</span> <span class="o">=</span> <span class="mi">2</span><span class="p">;</span>
            <span class="nx">assert</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">ary</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="nx">zero</span><span class="p">)</span> <span class="o">===</span> <span class="nx">two</span><span class="p">);</span>
        <span class="p">});</span>
    <span class="p">});</span>
<span class="p">});</span>
</pre>
</div>

後は、mochaでテストを実行するときに`--require`でintelli-espower-loaderを指定するだけです。

    $ mocha --require intelli-espower-loader
    

<img src="http://efcl.infol/wp-content/uploads/2014/04/power-assert-node-seed-zsh-2014-04-06-22-58-57-2014-04-06-22-59-07.png" alt="Power assert node seed  zsh 2014 04 06 22 58 57 2014 04 06 22 59 07" title="power-assert-node-seed (zsh) 2014-04-06 22-58-57 2014-04-06 22-59-07.png" border="0" width="600" height="233" />

毎回`--require`を指定するのが面倒な場合は[mocha.opts][22]ファイルを作って書いておくことでも同様の効果が得られます。

### テストコードについて

テストコードに書くアサーションはNode.jsの[Assert][9]を使った場合と全く同じです(裏側でAssertモジュールそのものが使われています)

そのため書くテストコードは`require("assert")`を`require('power-assert')`にした以外はMocha + Assertで書いた場合と全く同じで問題ありません。

また、アサーションのメソッド名等の細かい設定は[espower-loader][17]で行う事が出来ます。  
[intelli-espower-loader][19]では細かい設定をしないことを前提にして簡略化してるので、細かい設定をしたい場合は[espower-loader][17]を直接利用しましょう。

## power-assert + gulp

[使い方の前に][18]で紹介したように、[power-assert][5]は変換と実行の2つフェーズがあることを紹介しました。

[espower-loader][17]を使うとその部分を意識しないでいいことが分かりましたが、今度はGruntや[gulp][23]を使って一個づつフェーズを得てテストを実行してみたいと思います。

変換のフェーズは[gulp-espower][24]、[grunt-espower][25]というタスクが用意されているので、これを使うのが簡単でしょう。

power-assertはアサーション周りについてのみ扱うので、`describe()` や Qunitの`test()` といった部分に何を使うかというのは特に制限はありません。

既に記事やデモでMocha + Gruntについて書かれているので、今回はMocha + Gulpでやってみたいと思います。

*   [【JavaScript】power-assert使ってみた &#8211; Qiita][26]
*   [twada/power-assert-demo][27] 
    *   本家のデモプロジェクトもGruntが使われています

### power-assert+gulpのサンプルプロジェクト

サンプルプロジェクトは以下に置いてあります。

*   [azu/power-assert-testem-seed at 0.0.3][28]

まずは、必要なモジュールをインストールします

    $ npm install --save-dev power-assert gulp gulp-espower
    $ npm install -g gulp
    

次に[gulp][29]の設定ファイルである[gulpfile.js][30]を書きます。

gulpのtaskでは次の2つを定義しています。

1.  power-assert化されたテストコードに変換する `"power-assert"` タスク
2.  変換されたテストコードをmochaで実行する `"test"` タスク

2の `"test"` タスクを行う前に、自動的に変換しておいて欲しいので`gulp.task`の依存関係も定義しておくと、  
[gulpfile.js][30]は以下のように書けると思います。

<div class="highlight">
  <pre><span class="s2">"use strict"</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">gulp</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"gulp"</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">espower</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"gulp-espower"</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">mocha</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"gulp-mocha"</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">paths</span> <span class="o">=</span> <span class="p">{</span>
    <span class="nx">test</span><span class="o">:</span> <span class="s2">"./test/*.js"</span><span class="p">,</span>
    <span class="nx">powered_test</span><span class="o">:</span> <span class="s2">"./powered-test/*.js"</span><span class="p">,</span>
    <span class="nx">powered_test_dist</span><span class="o">:</span> <span class="s2">"./powered-test/"</span>
<span class="p">};</span>
<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s2">"power-assert"</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">gulp</span><span class="p">.</span><span class="nx">src</span><span class="p">(</span><span class="nx">paths</span><span class="p">.</span><span class="nx">test</span><span class="p">)</span>
        <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">espower</span><span class="p">())</span>
        <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">gulp</span><span class="p">.</span><span class="nx">dest</span><span class="p">(</span><span class="nx">paths</span><span class="p">.</span><span class="nx">powered_test_dist</span><span class="p">));</span>
<span class="p">});</span>
<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s2">"test"</span><span class="p">,</span> <span class="p">[</span><span class="s2">"power-assert"</span><span class="p">],</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">src</span><span class="p">(</span><span class="nx">paths</span><span class="p">.</span><span class="nx">powered_test</span><span class="p">)</span>
        <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">mocha</span><span class="p">());</span>
<span class="p">});</span>
</pre>
</div>

これでnodeで実行出来る環境が出来ました。

`test/` 以下にテストを書いていって、テストを実行したい時は以下のようにコマンドを叩くと実行結果が出力されるようになります。

    $ gulp test
    

次の記事では、これをブラウザでも実行出来るようにしたいと思います。

* * *

## まとめ

この記事では [power-assert][5] という単純なアサーションでも十分なエラー情報が出せるようにするテストツールについて、機能の概要とNode.jsでの導入方法について解説しました。

*   [azu/power-assert-node-seed][20] 
    *   [espower-loader][17]を使ったシンプルな方法
*   [azu/power-assert-testem-seed at 0.0.3][28] 
    *   gulp + power-asser

Node.jsのプロジェクトでは、ちょっとした設定をして、`require("assert")`を`require('power-assert')`に変更する程度で導入出来ます。

    var assert = require("assert");
    // => 
    var assert = require('power-assert');
    

アサーション自体はNode.jsの[Assert][9]と同じものが使うことができます。  
そのため、[power-assert][1]が仮に無くなった場合もNode.jsの[Assert][9]に戻ることが簡単です。

[Chai][3]のような多種多様のアサーションを使い分ける自信がない場合や、テストを書くことに集中したい人などは一度[power-assert][1]を試してみるといいでしょう。

今回はNode.jsをメインとしましたが、[power-assert][1]はブラウザ向けのテストでも動作させることができるため、次の記事ではブラウザ向けの設定について書いていきたいと思います。

**追記**

ブラウザでpower-assertを動かす方法について書きました。

*   [power-assertでJavaScriptのテストをする ブラウザ編 | Web scratch][14]

 [1]: https://github.com/twada/power-assert "power-assert"
 [2]: http://jasmine.github.io/ "Jasmine"
 [3]: http://chaijs.com/ "Chai"
 [4]: http://nodejs.org/api/assert.html "assert"
 [5]: https://github.com/twada/power-assert "twada/power-assert"
 [6]: http://azu.github.io/slide/sakurajs/power-assert.html#/
 [7]: https://github.com/twada/power-assert-formatter "twada/power-assert-formatter"
 [8]: https://github.com/twada/empower "twada/empower"
 [9]: http://nodejs.org/api/assert.html "Assert"
 [10]: https://www.youtube.com/watch?v=aDoQxqO_6rI "▶ 新しいテストライブラリのご提案 #tng10 @t_wada - YouTube"
 [11]: http://www.slideshare.net/t_wada/powerassert-in-javascript "power-assert in JavaScript"
 [12]: http://azu.github.io/slide/JSojisan/ "カジュアルJavaScript AST"
 [13]: http://azu.github.io/slide/JSojisan/resources/power-assert.gif
 [14]: http://efcl.info/2014/0411/res3820/ "power-assertでJavaScriptのテストをする ブラウザ編 | Web scratch"
 [15]: https://github.com/twada/power-assert#how-to-use " HOW TO USE"
 [16]: http://visionmedia.github.io/mocha/ "Mocha"
 [17]: https://github.com/twada/espower-loader "espower-loader"
 [18]: #before-how-touse
 [19]: https://github.com/azu/intelli-espower-loader "intelli-espower-loader"
 [20]: https://github.com/azu/power-assert-node-seed "azu/power-assert-node-seed"
 [21]: https://github.com/azu/power-assert-node-seed/blob/master/test/test.js "test.js"
 [22]: https://github.com/enja-oss/mocha/blob/master/docs/mocha.opt.md "mocha.opts"
 [23]: https://github.com/gulpjs/gulp "gulp"
 [24]: https://github.com/twada/gulp-espower "gulp-espower"
 [25]: https://github.com/twada/grunt-espower "grunt-espower"
 [26]: http://qiita.com/nabewata07/items/94fb2785ce22b5e8747b "【JavaScript】power-assert使ってみた - Qiita"
 [27]: https://github.com/twada/power-assert-demo "twada/power-assert-demo"
 [28]: https://github.com/azu/power-assert-testem-seed/tree/0.0.3 "azu/power-assert-testem-seed at 0.0.3"
 [29]: http://gulpjs.com/ "gulp"
 [30]: https://github.com/azu/power-assert-testem-seed/blob/0.0.3/gulpfile.js "gulpfile.js"