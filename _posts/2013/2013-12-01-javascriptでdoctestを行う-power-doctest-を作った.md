---
title: JavaScriptでdoctestを行う power-doctest を作った
author: azu
layout: post
permalink: /2013/1201/res3494/
dsq_thread_id:
  - 2024028570
categories:
  - javascript
tags:
  - javascript
  - Node.js
  - test
---
[Node.js Advent Calendar 2013][1] 5日目 の記事です。

# [power-doctest][2]

[power-doctest][2] という doctest風 にコードと評価結果のコメントを並べるとテストとして実行出来るようなNode製のツールを作りました。

    評価したい式; // => 期待する評価結果
    

の形式のコードをそのままテストとして実行するようなツールです。

![ScreenShot][3]

## 使い方

    npm install -g power-doctest
    

npmでインストールできます。

以下のような感じでコードを書いて、これを `main.js` として保存しておきます。

<div class="highlight">
  <pre><span class="kd">function</span> <span class="nx">sum</span><span class="p">(</span><span class="nx">ary</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">ary</span><span class="p">.</span><span class="nx">reduce</span><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">current</span><span class="p">,</span> <span class="nx">next</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nx">current</span> <span class="o">+</span> <span class="nx">next</span>
    <span class="p">},</span> <span class="mi"></span><span class="p">);</span>
<span class="p">}</span>

<span class="kd">var</span> <span class="nx">total</span> <span class="o">=</span> <span class="nx">sum</span><span class="p">([</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">5</span><span class="p">]);</span>
<span class="nx">total</span><span class="p">;</span> <span class="c1">// &gt; 5</span>
</pre>
</div>

そして、ファイル名を指定してテストを評価します。

    $ power-doctest main.js
    

上記の例では `total; // > 5` という部分が、 `total === 5` であるかをテストした結果が表示されます。この場合はテストが失敗するので以下のようなエラーが出力されます。

<div class="highlight">
  <pre><span class="nv">$ </span>power-doctest main.js
FAIL <span class="c"># at line: 13</span>

assert<span class="o">(</span><span class="nv">total</span> <span class="o">===</span> 5<span class="o">)</span>;
       |     |
       15    <span class="nb">false</span>
</pre>
</div>

また以下のように書いても問題ありません。

<div class="highlight">
  <pre><span class="nx">sum</span><span class="p">([</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">5</span><span class="p">]);</span><span class="c1">// &gt; 5</span>
</pre>
</div>

この場合は以下のようなエラー表示になります。

<div class="highlight">
  <pre>assert<span class="o">(</span>sum<span class="o">([</span>1,2,3,4,5<span class="o">])</span> <span class="o">===</span> 5<span class="o">)</span>;
       |                |
       15               <span class="nb">false</span>
</pre>
</div>

上記のエラー表示を見るとわかりますが、[power-assert][4] を使ったアサーションが行われるようになっています。

* * *

こっから先はどういう思想で作ったのかや仕組みなどの話になっています。

面倒な人は以下のスライドに簡略化された概要が載ってるので、そちらをみるといいかもしれません。

- <a href="http://azu.github.io/slide/okonomi.js/">power-doctest @ okonomi.js</a>

## 目的

このツールの目的として書籍のサンプルコードの写経などでの動作確認を楽にすることがあります。

多くの書籍では、紙面のスペースの都合等もありますが、以下のように実行結果を横にコメントで書くようなケースが多いと思います。

<img src="https://efcl.info/wp-content/uploads/2013/12/effective_javascript-2013-12-01-21-43-23.jpg" alt="Effective javascript 2013 12 01 21 43 23" title="effective_javascript 2013-12-01 21-43-23.jpg" border="0" width="600" height="217" />

これを写経して試す際には、ブラウザやNodeのREPLなどで試す必要があってエディタから離れないと行けないので不便な感じです。

また、書籍のサンプルコードはテストをちゃんと書いてないケースもあるので、動かないサンプルコードというのも結構ある感じがします。

[power-doctest][2] はそういうの補助するために作ったdoctestっぽいツールで、以下のように

    評価したい式; // => 期待する評価結果
    

というのが、そのままテストとして実行されるようになっています。

<img src="https://efcl.info/wp-content/uploads/2013/12/Effective_JavaScript-2013-12-01-21-49-24.jpg" alt="Effective JavaScript 2013 12 01 21 49 24" title="Effective_JavaScript] 2013-12-01 21-49-24.jpg" border="0" width="600" height="304" />

![ScreenShot][3]

デフォルトでは(今は切り替えとかないですが)、[power-assert][4]を使っているので、単純な式なら間違っていた時にかなり分かりやすい結果を表示できます。

かなり単純な仕組みなので、ライブラリ等のプロダクトコード的なテスト用途にはあんまり考えてないです。

他のJavaScriptのdoctestツールとしては以下のようなものがあります。

*   [dtao/autodoc][5] 
    *   JSDocの `@example` をテストする感じのドキュメントツール
*   [davidchambers/doctest][6] 
    *   ASTを書き換えてテストするツール. ちょっと欲しかったものとは趣旨が違う構造だったのでforkしなかった
*   [Doctest.js: the humane Javascript test framework][7] 
    *   書き方もよく似てて色々細かい処理もできるみたいだけど、動かしてないので分からない。
    *   CLIというよりはブラウザで動かす感じっぽい

### 仕組み

上記のスクリーンショットを見て気づく人もいると思いますが、JavaScript ASTを書き換えて行っています。

    評価したい式; // => 期待する評価結果
    

というものを見つけたら(=>以外も->や>でも大丈夫だけど)、

    assert(評価したい式 === 期待する評価結果);
    

という風に書き換えているだけなので、これをnodeの[vm][8]モジュールで実行しています。

NodeのvmモジュールではJavaScriptコード文字列をファイルから読み込んで実行したかのようにでき、また[context][9](アクティベーションオブジェクトとか[実行コンテキスト][10]言われてたようなやつ)を設定できるので、グローバルにいるようなものを書き換えたりした状態で、コードを動かすことが出来ます。

power-doctest は [グローバルにassert (power-assert)を追加する][11]という手法を取ってますが、この方法が最善なのかよくわかってないので、もっといい方法があったら知りたいです。  
(行番号がずれるとかある)

vmモジュールを利用すれば、以下のようにプライベートメソッドのテストもできたりするようです。

*   [Nodeでプライベートな(exportsされてない)メソッドのテスト &#8211; ぶれすとつーる][12]

JavaScript ASTについては以下の記事を見るといいかと思います。

*   [tkbjsでJavaScript ASTについて発表してきました | Web scratch][13]

power-doctestではコメントも扱えるtraversalライブラリの[millermedeiros/rocambole][14]を使ってます。  
(弊害なのかわからないですが、コメントを維持したままコードを生成できてない…)

仕組みとしては、assertへの書き換えとvmモジュールを使った実行 だけなので、大体1日ぐらいでできた感じです。

### Todo

突貫で作ったのでまだ良くない部分もあります。

*   deepEqualのサポート(オブジェクト同士の比較) 
    *   <del><a href="https://github.com/azu/power-doctest/issues/1" title="deepEqual support · Issue #1 · azu/power-doctest">deepEqual support · Issue #1 · azu/power-doctest</a></li> </ul> </li> 
  <li>
            Try-catch等の例外のサポート</del> <ul>
              <li>
                いい構文が思いつかない
              </li>
              <li>
                <del><a href="https://github.com/azu/power-doctest/issues/2" title="exception tests support · Issue #2 · azu/power-doctest">exception tests support · Issue #2 · azu/power-doctest</a></del>
              </li>
            </ul>
          </li>
</ul> 
        
        
  <p>
            サポートしました => <a href="https://efcl.info/2013/1208/res3526/" title="オブジェクト同士の比較と例外のテストをサポートしたpower-doctest 0.2.0リリース | Web scratch">オブジェクト同士の比較と例外のテストをサポートしたpower-doctest 0.2.0リリース | Web scratch</a>
          </p>

        
        
  <h3>
            蛇足 &#8211; 写経側
          </h3>

        
        
  <p>
            わざわざdoctest風にしないでも、mocha等を使ってインラインにテストを書けばもっと自由に細かくテストを出来ます。<br /> <a href="https://github.com/azu/FunctionalJavaScript" title="Functional JavaScript">Functional JavaScriptを写経した際</a> にはそのような方法をとって、気になったこともコメントとして埋め込んで<a href="https://github.com/nevir/groc" title="groc">groc</a>を使ってドキュメントページとして見られるような感じにしてました。
          </p>

        
        
  <ul>
            <li>
              => <a href="https://github.com/azu/FunctionalJavaScript" title="azu/FunctionalJavaScript">azu/FunctionalJavaScript</a>
            </li>
          </ul>

        
        
  <p>
            この方法は、<a href="https://github.com/azu/FunctionalJavaScript/blob/master/Chapter4/Ch.4.Higher-OrderFunctions.js" title="Ch.4.Higher-OrderFunctions.js">Ch.4.Higher-OrderFunctions.js</a>などを見るとわかりますが、コードが結構ごちゃごちゃするのであんまり見やすくないです…
          </p>

        
        
  <p>
            また、<a href="http://www.functionaljavascript.com/" title="Functional JavaScript">Functional JavaScript</a>は関数型スタイルの書籍だったので関数という単位がコードになってたのでテストも書きやすいですが、普通の書籍はもっとバラバラなのでいちいちassertionとかを書くと大変になると思います。
          </p>

        
        
  <h3>
            蛇足 &#8211; 書く側
          </h3>

        
        
  <p>
            自分で<a href="https://the-little-book-of-busterjs.readthedocs.org/en/latest/" title="The little book of Buster.JS">The little book of Buster.JS</a>のような電子書籍を書いてる時は、書籍内に出てくるサンプルコードが正しく動くことを保証するために以下のような事をしてました。
          </p>

        
        
  <p>
            書籍自体(<a href="https://github.com/azu/busterjs-ebook" title="azu/busterjs-ebook">azu/busterjs-ebook</a>)はSphinxを使って書いていた。
          </p>

        
        
  <p>
            普通にrstでインラインにコードを書くのも出来ましたがサンプルコードは別のリポジトリ(<a href="https://github.com/azu/busterjs-kumite" title="azu/busterjs-kumite">azu/busterjs-kumite</a>)に用意して、Sphinxの機能でコードを読み込んで表示するようにしていました。
          </p>

        
        
  <p>
            そして、サンプルコードはそれぞれテストを動かして意図した通りの動作になってるかを確認できるようにしてました(そもそもテストについて書いてたので、テストをするテストを書いてたりしましたが)
          </p>

        
        
  <ul>
            <li>
              <a href="https://github.com/azu/busterjs-ebook" title="azu/busterjs-ebook">azu/busterjs-ebook</a>
            </li>
            <li>
              <a href="https://github.com/azu/busterjs-kumite" title="azu/busterjs-kumite">azu/busterjs-kumite</a>
            </li>
          </ul>

        
        
  <p>
            なので、書籍とか書く人はちゃんとサンプルコードのテストもかいてあげるといいと思います。<br /> (サンプルコードを配布する事例は多いですが、テストが入ってるケースは意外と少ない)
          </p>

        
        
  <p>
            <a href="https://github.com/azu/power-doctest" title="azu/power-doctest">power-doctest</a> のような簡易なものでもある程度意味あるとは思うので、何か上手く行く仕組みがあればもっとテスト付きのサンプルコードが増えるかなと思ったのも作ったきっかけではあります。
          </p>

        
        
  <p>
            書籍じゃなくても readme とかでも同じことが言えて、<a href="https://github.com/vesln/jsmd" title="vesln/jsmd">vesln/jsmd</a>のようにreadmeに書かれているサンプルコードをテスト出来るようなツールも存在します。<br /> (readmeは更新されてなくて、古いコードが載ってて動かないケースが多い)
          </p>

        
        
  <p>
            このように、今なら大体の場所に書かれているコードを動かす方法があると思うので、動かないコードを減らせればいいなーと思います。
          </p>

        
        
  <p>
            <strong>JS testing everywhere!</strong>
          </p>

2015-08-15 追記: [power-assertを使ったDoctestツール power-doctestを書き直した | Web Scratch](https://efcl.info/2015/08/10/power-doctest1.0/ "power-assertを使ったDoctestツール power-doctestを書き直した | Web Scratch")

 [1]: http://www.adventar.org/calendars/56
 [2]: https://github.com/azu/power-doctest "azu/power-doctest"
 [3]: https://gyazo.com/56ea3848bb1a419d7d0ed47d111b39fc.gif
 [4]: https://github.com/twada/power-assert "power-assert"
 [5]: https://github.com/dtao/autodoc "dtao/autodoc"
 [6]: https://github.com/davidchambers/doctest "davidchambers/doctest"
 [7]: http://doctestjs.org/ "Doctest.js: the humane Javascript test framework"
 [8]: http://nodejs.jp/nodejs.org_ja/api/vm.html "vm"
 [9]: https://github.com/azu/power-doctest/blob/697b3eb1fb263dc44e32a5d573176251d72f99da/lib/power-doctest.js#L173 "context"
 [10]: http://d.hatena.ne.jp/vividcode/20110430/1304182281 "実行コンテキスト"
 [11]: https://github.com/azu/power-doctest/blob/697b3eb1fb263dc44e32a5d573176251d72f99da/lib/power-doctest.js#L158
 [12]: http://nazomikan.hateblo.jp/entry/2013/04/10/032410 "Nodeでプライベートな(exportsされてない)メソッドのテスト - ぶれすとつーる"
 [13]: https://efcl.info/2013/1117/res3481/ "tkbjsでJavaScript ASTについて発表してきました | Web scratch"
 [14]: https://github.com/millermedeiros/rocambole "millermedeiros/rocambole"
