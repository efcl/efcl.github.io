---
title: Node.jsのrequireをインライン化、無駄なuse strictを取り除くモジュールを書いた
author: azu
layout: post
permalink: /2014/0316/res3719/
dsq_thread_id:
  - 2440269658
categories:
  - javascript
  - node.js
tags:
  - AST
  - gulp
  - javascript
  - library
  - Node.js
---
# はじめに

[Promises Book][1]という薄い本を書いているのですが、書籍中に出てくるサンプルコードはテストが必須であるという原則があります。

<blockquote title="promises-book/CONTRIBUTE.md at master · azu/promises-book" cite="https://github.com/azu/promises-book/blob/master/CONTRIBUTE.md">
  <p>
    サンプルコードは必ずテストコードが必要となる。(読者がコピペして実行するようなコードをテストを書くべきである)<br /> <cite> <a href="https://github.com/azu/promises-book/blob/master/CONTRIBUTE.md">promises-book/CONTRIBUTE.md at master · azu/promises-book</a> </cite>
  </p>
</blockquote>

サンプルコードとテストはNode(といってもほぼCommonJSというだけ)で書いています。

ECMAScript6 Promisesについての内容なので、ブラウザ/Node.js どちらの実行環境でもいいのですが、閲覧するのはブラウザが基本になると思うのでブラウザ向けのコードを表示したいという感じになると思います。

CommonJS -> ブラウザ用のJS といえば、[browserify][2]や[CommonJS Everywhere][3]等がありますが、  
これらは書き方次第で実行できないような状況ができてしまうと困るので、`module.export` や `require` 等をエミュレートするコードを入れることで解決しています。

そのため、元のコードが小さくても、元コード + エミュレートする関数等が入って表示用としてはあまりキレイではありません。

- <a href="https://efcl.info/2014/0120/res3605/">npmとbrowserifyを使ったクライアントサイドのウェブアプリ開発 | Web scratch</a>

複雑な`reuqire`による依存の解決等を捨てて、書き方にある程度制約を持てば単純に`require`をインライン化したり、不要な `export`を削除して結合しただけのコードでもそのまま動くように出来るはず という感じで表題にある事をするNodeモジュールを書きました

## inlining-node-require

[azu/inlining-node-require][4]は先ほども述べたように、 `require("./add");` というようにモジュールを読み込んでいた場合は、`add.js` をその場に展開して単一のファイルにするという感じのモジュールです。

下記のような、`var add` と `module.exports = add` といいうように、識別子が一致してる場合はその辺を丸ごと削ったりしてより短くなるようにしてます。

**add.js**

<div class="highlight">
  <pre><span class="kd">function</span> <span class="nx">add</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="nx">y</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">y</span><span class="p">;</span>
<span class="p">}</span>
<span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="nx">add</span><span class="p">;</span>
</pre>
</div>

**index.js**

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">add</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"./add"</span><span class="p">);</span>
<span class="nx">add</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">);</span>
</pre>
</div>

`index.js` をエントリーポイントに指定して、そこを中心にrequire先をインライン化していきます。

    $ inlining-node-require index.js
    

出力結果は以下のようになります。

<div class="highlight">
  <pre><span class="kd">function</span> <span class="nx">add</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="nx">y</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">y</span><span class="p">;</span>
<span class="p">}</span>
<span class="nx">add</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">);</span>
</pre>
</div>

## remove-use-strict

[azu/remove-use-strict][5] は不必要な `"use strict";`という宣言となるリテラルを取り除くNodeモジュールです。

上記の　[azu/inlining-node-require][4] は簡単にいればただのconcatです。  
一般的に `"use strict";` は各モジュールに宣言して使うと思うので、結合すると無意味な `"use strict";`が出来てしまうかもしれません。

無意味な `"use strict";`というのは、そもそも `"use strict";`というのはディレクティブプロローグという関数やプログラムbodyの先頭に書かないと行けないので、それ以外の位置に出てきてたらおかしいという感じで消すようにしてます。

ディレクティブプロローグやstrict modeについては下記を読むといいです。

*   ["use strict" &#8211; blog.niw.at][6]

実際に以下のように、ディレクティブプロローグ以外の `"use strict";` を削除してくれます。(オプションで全ての `"use strict";` を削除するモードもあります)

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">removeUst</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"remove-use-strict"</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">code</span> <span class="o">=</span> <span class="s1">&#39;var a = 1;&#39;</span> <span class="o">+</span>
    <span class="s1">&#39;"use strict";&#39;</span><span class="p">;</span><span class="c1">// unnecessary use strict...</span>
<span class="nx">removeUst</span><span class="p">(</span><span class="nx">code</span><span class="p">);</span> <span class="c1">// =&gt; &#39;var a = 1;&#39;</span>
</pre>
</div>

[azu/inlining-node-require][4] にこの機能を含めてしまうのでも良かったのですが、それぞれ単体のモジュールで用意したほうが柔軟性があるので単機能モジュールとして分けてます。

## ユースケース

どちらも[Promises Book][7]という電子書籍的なものを書いてて欲しくなったので書きました。

先ほど書いたように [Promises Book][7] では基本的にコードはNodeで書かれていて(ただしブラウザで動くようにpolyfillを使う)、またサンプルコードはテストするべきであるという方針を持っています。

また、文章は[Asciidoctor][8]で書かれてるので、ソースコードはそのまま[Include Directive][9]を使って埋め込めます。

例えば、`Promise.all` とXHRを使ったサンプルコードのソースは以下のようになってます。

**[promise-all-xhr.js][10]**

<div class="highlight">
  <pre><span class="s2">"use strict"</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">getURL</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"../../Ch1_WhatsPromises/src/xhr-promise"</span><span class="p">).</span><span class="nx">getURL</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">request</span> <span class="o">=</span> <span class="p">{</span>
    <span class="nx">comment</span><span class="o">:</span> <span class="kd">function</span> <span class="nx">getComment</span><span class="p">()</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nx">getURL</span><span class="p">(</span><span class="s1">&#39;https://azu.github.io//promises-book/json/comment.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">);</span>
    <span class="p">},</span>
    <span class="nx">people</span><span class="o">:</span> <span class="kd">function</span> <span class="nx">getPeople</span><span class="p">()</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nx">getURL</span><span class="p">(</span><span class="s1">&#39;https://azu.github.io//promises-book/json/people.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">);</span>
    <span class="p">}</span>
<span class="p">};</span>
<span class="kd">function</span> <span class="nx">main</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">all</span><span class="p">([</span><span class="nx">request</span><span class="p">.</span><span class="nx">comment</span><span class="p">(),</span> <span class="nx">request</span><span class="p">.</span><span class="nx">people</span><span class="p">()]);</span>
<span class="p">}</span>

<span class="nx">module</span><span class="p">.</span><span class="nx">exports</span><span class="p">.</span><span class="nx">main</span> <span class="o">=</span> <span class="nx">main</span><span class="p">;</span>
<span class="nx">module</span><span class="p">.</span><span class="nx">exports</span><span class="p">.</span><span class="nx">request</span> <span class="o">=</span> <span class="nx">request</span><span class="p">;</span>
</pre>
</div>

[テストするpromise-all-xhr-test.js用][11]に関数等をexportsしてあったり、以前書いたコードを再利用したいので `require` などもしています。

上記のようなコードはサンプルコードとして表示するには、他のコードに依存してたり(`require`)、無意味な `exports` があったりするので向いてないです(またコピペで動かない…)

これをブラウザで見るように、[azu/inlining-node-require][4]と[azu/remove-use-strict][5]を使って変換すると以下のようになります。

**[embed-promise-all-xhr.js][12]**

<div class="highlight">
  <pre><span class="s1">&#39;use strict&#39;</span><span class="p">;</span>
<span class="kd">function</span> <span class="nx">getURL</span><span class="p">(</span><span class="nx">URL</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span> <span class="k">new</span> <span class="nx">Promise</span><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">resolve</span><span class="p">,</span> <span class="nx">reject</span><span class="p">)</span> <span class="p">{</span>
        <span class="kd">var</span> <span class="nx">req</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">XMLHttpRequest</span><span class="p">();</span>
        <span class="nx">req</span><span class="p">.</span><span class="nx">open</span><span class="p">(</span><span class="s1">&#39;GET&#39;</span><span class="p">,</span> <span class="nx">URL</span><span class="p">,</span> <span class="kc">false</span><span class="p">);</span>
        <span class="nx">req</span><span class="p">.</span><span class="nx">onload</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
            <span class="k">if</span> <span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">status</span> <span class="o">==</span> <span class="mi">200</span><span class="p">)</span> <span class="p">{</span>
                <span class="nx">resolve</span><span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">response</span><span class="p">);</span>
            <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
                <span class="nx">reject</span><span class="p">(</span><span class="k">new</span> <span class="nb">Error</span><span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">statusText</span><span class="p">));</span>
            <span class="p">}</span>
        <span class="p">};</span>
        <span class="nx">req</span><span class="p">.</span><span class="nx">onerror</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
            <span class="nx">reject</span><span class="p">(</span><span class="k">new</span> <span class="nb">Error</span><span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">statusText</span><span class="p">));</span>
        <span class="p">};</span>
        <span class="nx">req</span><span class="p">.</span><span class="nx">send</span><span class="p">();</span>
    <span class="p">});</span>
<span class="p">}</span>
<span class="kd">var</span> <span class="nx">request</span> <span class="o">=</span> <span class="p">{</span>
        <span class="nx">comment</span><span class="o">:</span> <span class="kd">function</span> <span class="nx">getComment</span><span class="p">()</span> <span class="p">{</span>
            <span class="k">return</span> <span class="nx">getURL</span><span class="p">(</span><span class="s1">&#39;https://azu.github.io//promises-book/json/comment.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">);</span>
        <span class="p">},</span>
        <span class="nx">people</span><span class="o">:</span> <span class="kd">function</span> <span class="nx">getPeople</span><span class="p">()</span> <span class="p">{</span>
            <span class="k">return</span> <span class="nx">getURL</span><span class="p">(</span><span class="s1">&#39;https://azu.github.io//promises-book/json/people.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">);</span>
        <span class="p">}</span>
    <span class="p">};</span>
<span class="kd">function</span> <span class="nx">main</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">all</span><span class="p">([</span><span class="nx">request</span><span class="p">.</span><span class="nx">comment</span><span class="p">(),</span> <span class="nx">request</span><span class="p">.</span><span class="nx">people</span><span class="p">()]);</span>
<span class="p">}</span>
</pre>
</div>

こうすることで、書く時はテストしやすいようにして、表示するときは表示用に結合/無駄な部分を削ったものを使うようにして、サンプルコードもテストしやすい状況を作っています。  
(まだ、表示用のコードの動作をどう担保するかは考え中)

変換はどちらも[gulp][13]を書いたのでそれを使って変換してます。

*   [promises-book/gulpfile.js at master · azu/promises-book][14]
*   [azu/gulp-inlining-node-require][15]
*   [azu/gulp-remove-use-strict][16]

gulp pluginは[sindresorhus/generator-gulp-plugin-boilerplate][17]や[hparra/generator-gulp-plugin][18]なんかを使うと5分ぐらいで書けます。

物理本ではないので、紙面のサイズはそこまで気にしなくていいのでこういう方針にしてますが、  
世の中の書籍はどうやってサンプルコードを管理してるんだろ?

## 仕組み

ここまで読んだ人は気づいてるかもしれませんが、これらのモジュールはJavaScript ASTを変換する事で行っています。

例えば、[azu/remove-use-strict][5]では以下のような **ディレクティブプロローグの文字列** と **変数に代入してる文字列** の区別が付けられるようにしているため、誤爆して削除されません。(この場合は削除対象がないですね)

    "use strict";
    function a(){
        "use strict";
        var a = "use strict";
    }
    

ただ、JavaScript ASTはただの木構造のオブジェクトと言っても書き換えは色々手順が必要なので面倒な部分が多いです。

そこで、[azu/inlining-node-require][4]ではコード表現を直に使って書き換えを行えられる [falafel][19] というモジュールを使っています。  
falafelはtraverse関数も持ってるので、ASTのTreeを走査しながら、`require` 関数のノードを見つけたら、指定ファイルの中身を取ってきてfalafelを使って埋め込むように書き換えるということを繰り返しています。

これにより、ASTの書き換えに必要なコード量はかなり減ります。

[falafel][19] はASTをrangeを持つマッピングデータとしてだけ扱ってて、実際に書き換えるのは文字列(chunk)にしておいたソースコードなため、直感的に置換する文字列のソースをそのまま書き換えに指定出来ます。

一方、コードを書き換える という事をASTでやろうとすると、書き換え後のコードをASTとして作り、  
その作成したASTを書き換えたい所へ置換したり追加したりする必要があります。

[azu/remove-use-strict][5] の方では、特定のnodeを削除したいだけだったので、直接ASTからnodeを削除していく感じにしてます。

そのnode(StringのLiteral)がディレクティブプロローグであるかどうかを知る必要があるので、  
[関数のスコープごとにスタックを積んでいく感じのよくある実装][20]をしています。

走査に使ってる[Estraverse][21]では、rootノードから子ノードを見ていく `enter` と 逆に葉ノードから親ノードをたどっていく `leave` が一緒に書けるので、こういうスコープを分けて考える書き方がやりやすいです。

*   [木構造 (データ構造) &#8211; Wikipedia][22]

単純にスコープを知るだけなら、[escope][23]や[ast-scope][24] を使ったほうが楽かもしれません。

* * *

仕組みの話が何かごちゃつきましたが、JavaScript ASTについては [JSオジサン][25] というイベントで少し話すことになってるので、それまでに何かもう少し整理したいですね。

LTなのでそこまで色々話せるわけじゃないですが。

*   [JSオジサンのスライド作成 · Issue #1 · azu/slide][26]

browserifyみたいに大きなものとかじゃなくて、ちょっとしたものならJavaScript ASTを使って書くというのは、ものすごく難しいというレベルではないので(基本的に木構造のオブジェクトを見ていくという話なので)、何か作ってみるといいかもしれません。

初めてJavaScript ASTを触る時は[ESLint][27]のプラグインを書いてあたりからやってみるのをオススメします。

*   [ESLint 0.1.0がリリースされたので、JSHintとの違いやプラグインの書き方について | Web scratch][28]
*   [eslint-tester][29]というのがでてるのでテストの書き方が少し変わってます

 [1]: https://github.com/azu/promises-book "Promises Book"
 [2]: https://github.com/substack/node-browserify "browserify"
 [3]: https://github.com/michaelficarra/commonjs-everywhere " CommonJS Everywhere"
 [4]: https://github.com/azu/inlining-node-require "azu/inlining-node-require"
 [5]: https://github.com/azu/remove-use-strict "azu/remove-use-strict"
 [6]: http://blog.niw.at/post/26687866336 ""use strict" - blog.niw.at"
 [7]: https://github.com/azu/Promises-book "Promises Book"
 [8]: http://asciidoctor.org/ "Asciidoctor"
 [9]: http://asciidoctor.org/docs/user-manual/#include-directive "Include Directive"
 [10]: https://github.com/azu/promises-book/blob/master/Ch2_HowToWrite/src/promise-all-xhr.js "promise-all-xhr.js"
 [11]: https://github.com/azu/promises-book/blob/master/Ch2_HowToWrite/test/promise-all-xhr-test.js "promise-all-xhr-test.js"
 [12]: https://github.com/azu/promises-book/blob/gh-pages/Ch2_HowToWrite/embed/embed-promise-all-xhr.js "embed-promise-all-xhr.js"
 [13]: http://gulpjs.com/ "gulp"
 [14]: https://github.com/azu/promises-book/blob/master/gulpfile.js "promises-book/gulpfile.js at master · azu/promises-book"
 [15]: https://github.com/azu/gulp-inlining-node-require "azu/gulp-inlining-node-require"
 [16]: https://github.com/azu/gulp-remove-use-strict "azu/gulp-remove-use-strict"
 [17]: https://github.com/sindresorhus/generator-gulp-plugin-boilerplate "sindresorhus/generator-gulp-plugin-boilerplate"
 [18]: https://github.com/hparra/generator-gulp-plugin "hparra/generator-gulp-plugin"
 [19]: https://github.com/substack/node-falafel "falafel"
 [20]: https://github.com/azu/remove-use-strict/blob/35cb45cc3c9be3364c4f7d26c9edcc4b3214bcd2/lib/remove-use-strict.js#L124
 [21]: https://github.com/Constellation/estraverse "Estraverse"
 [22]: http://ja.wikipedia.org/wiki/%E6%9C%A8%E6%A7%8B%E9%80%A0_(%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0) "木構造 (データ構造) - Wikipedia"
 [23]: https://github.com/Constellation/escope "escope"
 [24]: https://github.com/nkzawa/ast-scope "ast-scope"
 [25]: http://atnd.org/events/48368 "JSオジサン"
 [26]: https://github.com/azu/slide/issues/1 "JSオジサンのスライド作成 · Issue #1 · azu/slide"
 [27]: http://eslint.org/ "ESLint"
 [28]: https://efcl.info/2013/1104/res3465/ "ESLint 0.1.0がリリースされたので、JSHintとの違いやプラグインの書き方について | Web scratch"
 [29]: https://github.com/eslint/eslint-tester "eslint-tester"
