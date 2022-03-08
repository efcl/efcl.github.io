---
title: npmとbrowserifyを使ったクライアントサイドのウェブアプリ開発
author: azu
layout: post
permalink: /2014/0120/res3605/
dsq_thread_id:
  - 2148798965
categories:
  - javascript
tags:
  - browserify
  - javascript
  - Node.js
  - npm

---
[YoutubeとVimeoの検索結果のRSSをまとめてOPMLで取得できるサイトを作った | Web scratch][1] で公開した  
[Tech Video RSS Searcher][2] はbrowserifyを使って作ったので、その辺の開発フローについての記事です。

## [browserify][3] って何?

[<img src="https://efcl.info/wp-content/uploads/2014/01/687474703a2f2f737562737461636b2e6e65742f696d616765732f62726f777365726966795f6c6f676f2e706e67.png" alt="687474703a2f2f737562737461636b2e6e65742f696d616765732f62726f777365726966795f6c6f676f2e706e67" title="687474703a2f2f737562737461636b2e6e65742f696d616765732f62726f777365726966795f6c6f676f2e706e67.png" border="0" width="499" height="222" />][4]

[browserify][3] はNode.jsスタイルで書かれたモジュール(CommonJS)を  
ブラウザで利用できるように変換するコマンドラインツール(Nodeモジュール)となっています。

又、node.jsの[Core Modules][5]のshimが用意されていて、  
npmで公開されているnode.js向けのモジュールも一緒に変換してブラウザで動かすことが出来るようになっています。(普通に `require` で読みこめば勝手に変換されます)

原理的に無理だったり全てのモジュールが動くわけじゃないですが、  
その辺の互換レイヤーについては以下を見るといいかと思います。

*   [compatibility][6]
*   [browserify v3.0 changelog][7]

[むしろ駄菓子屋さんで | browserify概説][8] で紹介されてるようなv1の頃のアーキテクチャとは[違う部分も多い][9]ので、昔見たことある人は別物だと思って見るといいかもしれません。

*   [announcing browserify v2][10] v2の時の変更

**追記**:

Browserify作者による[substack/browserify-handbook][11]というハンドブックが公開されています。

より体系的な内容がまとまっているため読むことをオススメします。

* * *

例えば、以下のようなシンプルなCommonJSで書かれたものを見てみます。

> [index.js][12] 

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">add</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"./add"</span><span class="p">);</span>
<span class="nx">add</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">);</span> <span class="c1">// =&gt; 3</span>
</pre>
</div>

> [add.js][13] 

<div class="highlight">
  <pre><span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="nx">y</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">y</span><span class="p">;</span>
<span class="p">};</span>
</pre>
</div>

これをbrowserifyでビルドしてみると以下のように変換されてます。

    browserify simple/index.js -o simple/bundle.js
    

> [bundle.js][14] 

<div class="highlight">
  <pre><span class="p">(</span><span class="kd">function</span> <span class="nx">e</span><span class="p">(</span><span class="nx">t</span><span class="p">,</span><span class="nx">n</span><span class="p">,</span><span class="nx">r</span><span class="p">){</span><span class="kd">function</span> <span class="nx">s</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span><span class="nx">u</span><span class="p">){</span><span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="nx">n</span><span class="p">[</span><span class="nx">o</span><span class="p">]){</span><span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="nx">t</span><span class="p">[</span><span class="nx">o</span><span class="p">]){</span><span class="kd">var</span> <span class="nx">a</span><span class="o">=</span><span class="k">typeof</span> <span class="nx">require</span><span class="o">==</span><span class="s2">"function"</span><span class="o">&&</span><span class="nx">require</span><span class="p">;</span><span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="nx">u</span><span class="o">&&</span><span class="nx">a</span><span class="p">)</span><span class="k">return</span> <span class="nx">a</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span><span class="o">!</span><span class="mi"></span><span class="p">);</span><span class="k">if</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span><span class="k">return</span> <span class="nx">i</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span><span class="o">!</span><span class="mi"></span><span class="p">);</span><span class="k">throw</span> <span class="k">new</span> <span class="nb">Error</span><span class="p">(</span><span class="s2">"Cannot find module &#39;"</span><span class="o">+</span><span class="nx">o</span><span class="o">+</span><span class="s2">"&#39;"</span><span class="p">)}</span><span class="kd">var</span> <span class="nx">f</span><span class="o">=</span><span class="nx">n</span><span class="p">[</span><span class="nx">o</span><span class="p">]</span><span class="o">=</span><span class="p">{</span><span class="nx">exports</span><span class="o">:</span><span class="p">{}};</span><span class="nx">t</span><span class="p">[</span><span class="nx">o</span><span class="p">][</span><span class="mi"></span><span class="p">].</span><span class="nx">call</span><span class="p">(</span><span class="nx">f</span><span class="p">.</span><span class="nx">exports</span><span class="p">,</span><span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">){</span><span class="kd">var</span> <span class="nx">n</span><span class="o">=</span><span class="nx">t</span><span class="p">[</span><span class="nx">o</span><span class="p">][</span><span class="mi">1</span><span class="p">][</span><span class="nx">e</span><span class="p">];</span><span class="k">return</span> <span class="nx">s</span><span class="p">(</span><span class="nx">n</span><span class="o">?</span><span class="nx">n</span><span class="o">:</span><span class="nx">e</span><span class="p">)},</span><span class="nx">f</span><span class="p">,</span><span class="nx">f</span><span class="p">.</span><span class="nx">exports</span><span class="p">,</span><span class="nx">e</span><span class="p">,</span><span class="nx">t</span><span class="p">,</span><span class="nx">n</span><span class="p">,</span><span class="nx">r</span><span class="p">)}</span><span class="k">return</span> <span class="nx">n</span><span class="p">[</span><span class="nx">o</span><span class="p">].</span><span class="nx">exports</span><span class="p">}</span><span class="kd">var</span> <span class="nx">i</span><span class="o">=</span><span class="k">typeof</span> <span class="nx">require</span><span class="o">==</span><span class="s2">"function"</span><span class="o">&&</span><span class="nx">require</span><span class="p">;</span><span class="k">for</span><span class="p">(</span><span class="kd">var</span> <span class="nx">o</span><span class="o">=</span><span class="mi"></span><span class="p">;</span><span class="nx">o</span><span class="o">&lt;</span><span class="nx">r</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span><span class="nx">o</span><span class="o">++</span><span class="p">)</span><span class="nx">s</span><span class="p">(</span><span class="nx">r</span><span class="p">[</span><span class="nx">o</span><span class="p">]);</span><span class="k">return</span> <span class="nx">s</span><span class="p">})({</span><span class="mi">1</span><span class="o">:</span><span class="p">[</span><span class="kd">function</span><span class="p">(</span><span class="nx">require</span><span class="p">,</span><span class="nx">module</span><span class="p">,</span><span class="nx">exports</span><span class="p">){</span>
<span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="nx">y</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">y</span><span class="p">;</span>
<span class="p">};</span>
<span class="p">},{}],</span><span class="mi">2</span><span class="o">:</span><span class="p">[</span><span class="kd">function</span><span class="p">(</span><span class="nx">require</span><span class="p">,</span><span class="nx">module</span><span class="p">,</span><span class="nx">exports</span><span class="p">){</span>
<span class="kd">var</span> <span class="nx">add</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"./add"</span><span class="p">);</span>
<span class="nx">add</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">);</span> <span class="c1">// =&gt; 3</span>
<span class="p">},{</span><span class="s2">"./add"</span><span class="o">:</span><span class="mi">1</span><span class="p">}]},{},[</span><span class="mi">2</span><span class="p">])</span>
</pre>
</div>

変換した[bundle.js][14]は、他にローダライブラリ等に依存はしてないのでそのまま読み込むだけで扱えます。

[browserify][3] について興味をもった人は以下の記事を読んでみるといいかもしれません。

*   [Introduction to Browserify • Blake Embrey][15] 
    *   browserifyの入門的な記事ですが、`-t` の変換レイヤーやオプションについても書かれていてまとまっています
*   [Client-Side JavaScript Management, Browserify vs Component][16] 
    *   ちょっと古めですが、同じCommonJSを扱う[component][17]との比較について書かれています。
*   [JavaScript Dependencies, Modules & Browserify][18] 
    *   JavaScriptの色々なモジュールの書き方とbrowserifyについて書かれています。
    *   他のモジュールから変換して扱う方法(P52)などよくまとまってます。
*   [RequireBin][19] 
    *   JSFiddleみたいにbrowserifyを使ったコードを試せるサービス

この記事はモジュール管理の比較記事ではないので、以下のような内容について書いていきます。

*   bowerでインストールしたものをbrowserifyで使う
*   npmで公開したものをbrowserifyで使う
*   browserifyでのビルドサイクル(beefy or gulp)
*   browserifyでビルドしたもののデバッグ

# browserifyでのクライアントサイド開発

実際に作ったものは [azu/tech-video-rss-searcher][20] に公開してあります。

## CommonJS以外のモジュールをbrowserifyで使う

今回、npm以外のモジュールとしてはbower経由で[Ractive.js][21]を使っただけでしたが、そのままでは`<script>`で読み込んで使うことを想定した作りになっているため、nodeスタイルで書いたコードから使いにくいです。(`require("ractive")`で使えない)

そこで、browserifyでは `-t` オプションでnodeスタイルで書かれたコードを変換する際に、別の変換を組み合わせられる[transforms][22]という仕組みが用意されています。

今回はbowerでインストールしたものを変換したかったので[debowerify][23]という変換モジュールを使います。

browserifyで変換するときに、`-t debowerify` と指定する事でnodeスタイルから扱えるように変換されてbundle.jsにまとめられます。

<div class="highlight">
  <pre>$ browserify -t debowerify app/app.js -o public/budle.js
</pre>
</div>

### 例

リポジトリの[bower.json][24]を見ると `ractive` をインストールしています。

これをモジュールとして扱う場合は、以下のようにbower.jsonのパッケージ名に合わせたものを `require` することで扱えます。

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">Ractive</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"ractive"</span><span class="p">);</span>
</pre>
</div>

[debowerify][23]によって、bowerでインストールしたものがCommonJSから扱えるように変換されbundleに含まれます。

bower以外にもAMDを変換する[deamdify][25]や、ES6モジュールを変換する[es6ify][26]、ブラウザ向けに書かれた `window.` に対して名前空間を持つようなライブラリを変換する[deglobalify][27] / [browserify-shim][28] 等があります。

[list of source transforms][29] に変換モジュールがまとめられています、意外と充実しているためブラウザ向けに公開されている大体のライブラリはbrowserifyに持ってきて使う仕組みがあると思います。

また、これらの[変換モジュール][30]は、基本的にJavaScript ASTを変更することで行われるため、  
後述するデバッグで使うSourcemapを破壊せずに変換出来ます。

簡単にいうと、browserifyで変換 + 変換モジュールでの変換 をしても元のライブラリソースとのマッピングは壊れないので、変換したものが普通にデバッグ出来るということです。

最近は[jQuery][31]等もnpmでインストールできますが、ブラウザ向けのライブラリがnpmでも公開されてるものはそこまで多くないので、ライブラリを使おうと思ったら恐らくこういう変換モジュールをかませる必要がでてくると思います。

## npmで公開してるものをbrowserifyで使う

次はbrowserifyの機能としてよく紹介されてると思いますが、  
npm経由でインストールしたnode向けに書かれたモジュールもbrowserifyでは変換することができます。

ブラウザに存在しない機能(OSのファイルシステムや外部プロセスを呼ぶ等)や[shim][32]がないモジュールは扱うことが出来ませんが、他は大体動作すると思います。

[NPM Everywhere by Azer Koçulu][33]等でも書かれていますが、npmという既にあるエコシステムに乗れる事がbrowserifyの利点の一つだと思います。

既に公開されてるnodeモジュールを使うこともそうですが、  
npmに関するツールは充実しているので、作ってるウェブアプリのロジックをライブラリとして切り出してnpmで公開して使うような事がやりやすいです。

### 例

今回のアプリでは、[OPML][34]形式で出力したかったので、  
そのOPML形式に変換する部分だけを[opml-generator.js][35]というnodeモジュールを作って使っています。

[opml-generator.js][35]はただのNode.jsで動く文字列処理をするようなライブラリなので、他のNodeプロジェクトでも使えますし、今回のアプリも[dependencies][36]として読み込みbrowserifyで変換して利用しています。

## browserifyでのビルドサイクル(beefy or gulp)

browserifyのデメリット?としてブラウザで実行するにはビルドが必要です。

`browserify` コマンドで変更する度に手動で変換するのは面倒なので、Gruntやgulp等のビルドツールを利用すると思います。  
(単純にファイル監視+ビルドだけなら[watchify][37]も利用できます)

今回は、[beefy][38]を使った方法とビルドツールの[gulp][39]を使った方法の両方を使えるようにしてみました(どっちがいいのかわからなかったので両方出来るようにしたという話)

### [beefy][40]

beefy は ファイルの変更監視 + browserifyのビルド + ローカルサーバ (+ LiveReload) を行うコマンドラインツールです。

例えば、browserifyコマンドで以下のようにビルドする時、

<div class="highlight">
  <pre>browserify -t debowerify app/app.js -o public/app.js
</pre>
</div>

これをbeefyで自動化するには、以下のようにコマンドを実行します。

<div class="highlight">
  <pre>beefy app/app.js:public/app.js 8989 -- -t debowerify
</pre>
</div>

ポート8989でローカルサーバが立つので、 `http://localhost:8989/` にアクセスする事で自動でビルドされるようになります。

ローカルサーバを立てると後述するデバッグにも役立つので、その点beefyはローカルサーバの部分も自動でできるのでお手軽です。(そもそもXHRとかはhttpじゃないと上手く動かない場合があるので、こうした方がいい)

### [gulp][39]

**追記**: gulpでBrowserifyを使う場合は次の記事を参照して下さい。

*   [Gulp + Browserify: The Everything Post | Viget][41]
*   [gulp/docs/recipes/fast-browserify-builds-with-watchify.md at master · gulpjs/gulp][42]

Browserifyは元々streamに対応しているため、gulp pluginを別途用意する必要がなく、`browserify`をモジュールとしてそのまま利用できます。

以下のやり方は非推奨です。

* * *


gulpからbrowserifyを使うpluginとして<a href="https://github.com/deepak1556/gulp-browserify" title=" gulp-browserify">gulp-browserify</a>があるので、これを利用します。

詳細は[gulpfile.js][43]をみてもらうとわかりますが、 `connect` を使ったローカルサーバとgulpを使ったファイル監視をして `gulp-browserify` でビルドという感じです。

気をつける点としてはgulp-browserifyで変換する際にストリームで変換されるので、そのままでsourcemapのファイル名がfake-hogeのようになってデバッグできなくなります。

<del><a href="https://github.com/azu/tech-video-rss-searcher/blob/db4b6f5a03186985d668ec8b150ff0ca00b6e786/gulpfile.js#L7" title="standalone: &#34;app.js&#34;">standalone: "app.js"</a> というオプションでbrowserifyのentry-point(mainとなるファイル)を渡すことで正しくマッピングされると思います。</del>

<blockquote class="twitter-tweet" lang="en">
  <p>
    <a href="https://twitter.com/7to3">@7to3</a> あ、ほんとですね。{ read: false } の場合standalone無くても大丈夫ですね。&#10;ありがとうございます。&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/statuses/425470718902407168">January 21, 2014</a>
  </p>
</blockquote>



追記: gulp.srcに `{ read: false }` を指定している場合は `standalone` オプション必要ありませんでした。

([hughsk/vinyl-source-stream][44]というpluginを組み合わせた方が<del><code>standalone</code> という謎オプションを使わなくていいので</del>スマートかもしれません)

これでbeefyと大体似たようなファイル監視+ローカルサーバ+ビルドができると思います。


* * *

## browserifyでビルドしたもののデバッグ

先ほどから何回か出てきていますが、browserifyでは `--debug -d` オプションを付けることでsource mapも一緒に吐き出してくれます。(beefy、gulp-browserifyにもそれぞれオプションで指定出来ます)

これを使えば、browserifyでビルドしたものもデバッグすることが出来ます。

<blockquote class="twitter-tweet" lang="en">
  <p>
    おー、beefyでローカルサーバ立ててWebStormでそのlocalhostに対してデバッグ実行させれば、&#10;browserify + debowerify に対してもWebStormからブレークポイント貼って見られる <a href="http://t.co/ZxdnAWuLHw">pic.twitter.com/ZxdnAWuLHw</a>
  </p>
</blockquote>

&mdash; azu (@azu_re) [January 17, 2014][45]



### source map

source mapに対応してるFirefoxやChromeのようなブラウザなら、browserifyでデバッグビルドしたものを表示した場合、  
以下のように元となるNode.jsのshimや変換元のモジュールのソース等が見られブレークポイント等も使えるので普通にデバッグが行えます。

<img src="https://efcl.info/wp-content/uploads/2014/01/Tech-Video-RSS-Searcher-2014-01-20-21-20-18.jpg" alt="Tech Video RSS Searcher 2014 01 20 21 20 18" title="Tech Video RSS Searcher 2014-01-20 21-20-18.jpg" border="0" width="600" height="411" />

WebStormでも同じようにJavaScriptデバッガーを使ってデバッグする事が出来ます。

Run ConfigurationからJavaScript Debugで先ほど立てたローカルサーバへアクセスするようにするだけです。

<img src="https://efcl.info/wp-content/uploads/2014/01/Debug-Configurations-2014-01-20-21-25-12.jpg" alt="Debug Configurations 2014 01 20 21 25 12" title="Debug Configurations 2014-01-20 21-25-12.jpg" border="0" width="600" height="427" />

これにより、普通にJavaScriptを書く時と殆ど感じでデバッグが出来ます。

<img src="https://efcl.info/wp-content/uploads/2014/01/tech-video-rss-searcher-2014-01-20-21-24-05.jpg" alt="Tech video rss searcher 2014 01 20 21 24 05" title="tech-video-rss-searcher] 2014-01-20 21-24-05.jpg" border="0" width="600" height="409" />

[Tech Video RSS Searcher][2] ではbeefyを使って、上記のようにWebStormからデバッグしていましたが、特に問題なくブレークポイントを貼ってチェックしたりできて変換フェーズがあるといってもそこまで問題はない感じでした。

## おわりに

この記事では [browserify][3] をつかったウェブアプリの開発フローについて書きました。

browserifyのドキュメントはあんまり充実してない感じ(ドキュメントというよりはチュートリアル的な方向)がするので、少し手を出しにくいかもしれませんが、Nodeの資産やツールも適応しやすく意外と現実的に開発できるような環境だと思います。

ブラウザでのモジュールといえば[ECMAScript 6 modules][46]ですが、こちらも[ES6 Module Transpiler][47]などを使っていますぐ使うことも出来ます。

実際に[jQuery Evergreen][48]や[lodash-es6][49]、[backburner.js][50]などES6 modulesを実際に使って書かれてるライブラリ等もあります。(プロダクトはさすがに見たこと無い)

*   [Using ES6 Modules Today][51]
*   [ECMAScript 6 modules: the future is now][52]

ES6 modulesも現状ではビルドして使う感じになるという点では同じですが、browserifyの場合は既にNode.jsで使われてるCommonJSというスタイルを使うので、エディタやツールのサポートがあるという状態になってるのはいいことだと思います。

ES6 modulesで増える構文はcontextual keywordsだったと思いますが、その構文にちゃんと対応してるエディタはまだなかったと思います。([WebStorm 8][53]で入るかもしれないですが)

また今回は全然触れてませんがプロダクション的な用途を考えるならファイルサイズも気になる場合があるかもしれません。

shim は利用した機能の分だけが自動でビルド時に含まれてるようになってるので、素で書いた場合に比べて(デバッグビルドをしなければ)大幅に増えるという感じではないですが、npm経由で入れたモジュールの依存モジュールも引っ張って変換されるので、下手にnpmで入れるといきなりファイルサイズが増える場合があるかもしれません。

ビルドにかかる時間の省略やキャッシュ的にも、依存する外部ライブラリは開発するソースとは別々のbundle.jsとして生成するなどの方法(`--noparse` というオプションもある)を取れるかもしれません。(その辺についてはやった人が書くといいよ!)

## 今度こそおわりに

[browserify][3] はとっつきにくいイメージがありますが、触ると楽しいです。

以上です。

 [1]: https://efcl.info/2014/0119/res3594/ "YoutubeとVimeoの検索結果のRSSをまとめてOPMLで取得できるサイトを作った | Web scratch"
 [2]: https://azu.github.io//tech-video-rss-searcher/ "Tech Video RSS Searcher"
 [3]: https://github.com/substack/node-browserify "substack/node-browserify"
 [4]: http://browserify.org/
 [5]: http://nodejs.org/api/modules.html#modules_core_modules "Core Modules#"
 [6]: https://github.com/substack/node-browserify#compatibility "compatibility"
 [7]: http://substack.net/browserify_v3_0_changelog "browserify v3.0 changelog"
 [8]: http://sanami-mikio.tumblr.com/post/13668811926/browserify "むしろ駄菓子屋さんで | browserify概説"
 [9]: https://gist.github.com/substack/5012401#cut-features
 [10]: https://gist.github.com/substack/5012401 "announcing browserify v2"
 [11]: https://github.com/substack/browserify-handbook "substack/browserify-handbook"
 [12]: https://github.com/azu/browserify-example/blob/master/simple/index.js "index.js"
 [13]: https://github.com/azu/browserify-example/blob/master/simple/add.js "add.js"
 [14]: https://github.com/azu/browserify-example/blob/master/simple/bundle.js "bundle.js"
 [15]: http://blakeembrey.com/articles/introduction-to-browserify/ "Introduction to Browserify • Blake Embrey"
 [16]: http://procbits.com/2013/06/17/client-side-javascript-management-browserify-vs-component "Client-Side JavaScript Management, Browserify vs Component"
 [17]: https://github.com/component/component "component"
 [18]: http://www.slideshare.net/johannilsson/dependencies-modules-browserify "JavaScript Dependencies, Modules & Browserify"
 [19]: http://requirebin.com/ "RequireBin"
 [20]: https://github.com/azu/tech-video-rss-searcher/ "azu/tech-video-rss-searcher"
 [21]: http://www.ractivejs.org/ "Ractive.js"
 [22]: https://github.com/substack/node-browserify#list-of-source-transforms "transforms"
 [23]: https://github.com/eugeneware/debowerify "debowerify"
 [24]: https://github.com/azu/tech-video-rss-searcher/blob/gh-pages/bower.json#L16 "bower.json"
 [25]: https://github.com/jaredhanson/deamdify " deamdify"
 [26]: https://github.com/thlorenz/es6ify "es6ify"
 [27]: https://github.com/eugeneware/deglobalify "deglobalify"
 [28]: https://github.com/thlorenz/browserify-shim "browserify-shim"
 [29]: https://github.com/substack/node-browserify#list-of-source-transforms " list of source transforms"
 [30]: https://github.com/substack/module-deps#transforms "transforms"
 [31]: http://blog.jquery.com/2014/01/16/jquery-1-11-0-rc1-and-2-1-0-rc1-released/ "jQuery"
 [32]: https://github.com/substack/node-browserify#compatibility "shim"
 [33]: http://slid.es/azer/npm "NPM Everywhere by Azer Koçulu"
 [34]: http://ja.wikipedia.org/wiki/Outline_Processor_Markup_Language "OPML"
 [35]: https://github.com/azu/opml-generator " opml-generator.js"
 [36]: https://github.com/azu/tech-video-rss-searcher/blob/db4b6f5a03186985d668ec8b150ff0ca00b6e786/package.json#L7 "dependencies"
 [37]: https://github.com/substack/watchify "watchify"
 [38]: https://github.com/chrisdickinson/beefy "beefy"
 [39]: http://gulpjs.com/ "gulp"
 [40]: https://github.com/chrisdickinson/beefy " beefy"
 [41]: http://viget.com/extend/gulp-browserify-starter-faq "Gulp + Browserify: The Everything Post | Viget"
 [42]: https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md "gulp/docs/recipes/fast-browserify-builds-with-watchify.md at master · gulpjs/gulp"
 [43]: https://github.com/azu/tech-video-rss-searcher/blob/db4b6f5a03186985d668ec8b150ff0ca00b6e786/gulpfile.js "gulpfile.js"
 [44]: https://github.com/hughsk/vinyl-source-stream "hughsk/vinyl-source-stream"
 [45]: https://twitter.com/azu_re/statuses/424233337545166850
 [46]: http://www.2ality.com/2013/11/es6-modules-browsers.html "ECMAScript 6 modules"
 [47]: https://github.com/square/es6-module-transpiler "ES6 Module Transpiler"
 [48]: https://github.com/webpro/jquery-evergreen " jQuery Evergreen"
 [49]: https://github.com/lodash/lodash-es6 "lodash-es6"
 [50]: https://github.com/ebryn/backburner.js "backburner.js"
 [51]: http://guybedford.com/es6-modules-today "Using ES6 Modules Today"
 [52]: http://www.2ality.com/2013/07/es6-modules.html "ECMAScript 6 modules: the future is now"
 [53]: http://confluence.jetbrains.com/display/WI/Roadmap+for+WebStorm+8 "WebStorm 8"
