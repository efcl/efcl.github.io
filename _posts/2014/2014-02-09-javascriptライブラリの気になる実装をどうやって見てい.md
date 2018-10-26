---
title: JavaScriptライブラリの気になる実装をどうやって見ていくか
author: azu
layout: post
permalink: /2014/0209/res3658/
dsq_thread_id:
  - 2238308022
categories:
  - javascript
tags:
  - CodeReading
  - javascript
  - library
---
## はじめに

毎日新しいJavaScriptライブラリが登場していると思いますが、それらがどういう実装になっているかを知ることはライブラリを使う以上に大事かもしれません。

ソースを全部読めば分かるかもしれませんが、それをやるには時間が足りません。

JavaScriptに限った話では無いですが、今回はJavaScriptを例に&#8221;特定の機能はどうやってるんだろ?&#8221;という事を調べる方法についてです。

探す前にドキュメントに載ってないかを見るのが手間がなくて一番よいですが、書いてない場合は実装を見ます。

## [Vue.js][1]

今回は[Vue.js][1]というAngularJSやKnockoutのようなViewとModelのデータバインディグを行うライブラリを例に、データバインディグはどうやっているのかを2つの方法で調べてみたいと思います。

## コードをステップで見ていく

これはよく見る方法で皆さんもやったことがあると思います。

見たい挙動(今回はモデルへのバインディグ)のサンプルコードを書いて、  
そこに対してブレークポイントを貼り step in しながら目的の実装を探すという単純な方法です。

- <a href="http://vuejs.org/">vue.js</a>

トップページにあるサンプルコードを見ても分かるように、`new Vue({ /*モデル*/ })` となってるので、Vueコンストラクタの実装を見ていけばいいことがわかります。

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">demo</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Vue</span><span class="p">({// &lt; - breakpoint </span>
    <span class="nx">el</span><span class="o">:</span> <span class="s1">&#39;#demo&#39;</span><span class="p">,</span>
    <span class="nx">data</span><span class="o">:</span> <span class="p">{</span>
        <span class="nx">message</span><span class="o">:</span> <span class="s1">&#39;Hello Vue.js!&#39;</span>
    <span class="p">}</span>
<span class="p">})</span>
&lt;/span></pre>
</div>

<!--<br />
var demo = new Vue({<br />
    el: '#demo',<br />
    data: {<br />
        message: 'Hello Vue.js!'<br />
    }<br />
})<br />
-->

サンプルコードを書いて `new Vue`の部分にブレークポイントを貼るだけで準備完了です。

後は、デバッガーのステップ実行しながら、怪しい関数等を見ていくだけです(今回ならObserveとかbindingとかの用語を見ていけば多分見つかるはずです)

以下は実際に見ていった動画です





## 勘であてる

もう一つ短時間で探す方法として、その機能(今回はデータバインディグ)に使われそうなメソッドや名前で検索してしまう方法です。

今回はデータバインディグがキーワードです。

また、[Browser Support][2]を見るとES5サポートしている事が前提となってることがわかります。

> Vue.js supports most ECMAScript 5 compliant browsers, essentially IE9+. IE8 and below are not supported. 

ここで、ピンと来る人もいると思いますが他のところもチェックすると、サンプルコードを見ても[knockout.js][3]のように値の変更を監視するためにラッパーをかぶせたりはしていないように見えます。

knockoutの場合は監視したいプロパティに `ko.observable(value)` のようなラップが必要になります。

*   [ko.observable][4]
*   [knockoutjs &#8211; 作って分かるJavaScriptでデータバインド &#8211; Qiita][5]

この情報から推測するとJavaScriptネイティブのgetter/setterを使ってるんじゃないかと気付きます。  
getter/setterを設定(他にも方法はありますが)する[Object.defineProperty][6]はES5からサポートされているので、ES5をサポートしてないブラウザはサポート外になってるんじゃないかという感じですね。

探すポイントは推測できたので実際に検索してみます。

* * *

(こっから先、普通に文字列検索してもいいと思うので若干蛇足気味です)

普通にgrep的な検索でもいいですが、JavaScriptを例にしたので[grasp][7]を使ってみます。(多分このケースだと普通に文字列検索した方が楽です…)

[grasp][7]は単純な文字列検索ではなくて、JavaScriptの構文を元に検索/置換が出来るコマンドラインツールです。

以下でも軽く紹介してるので見てみるといいかもしれません。

*   [Graspを使ったJavaScriptのリファクタリング | JSer.info][8]

<div class="highlight">
  <pre><span class="nv">$ </span>npm install -g grasp
</pre>
</div>

<!--<br />
$ npm install -g grasp<br />
-->

でインストールしておきます。

### Object.definePropertyを呼び出し箇所を検索

[Object.defineProperty][6] は

<div class="highlight">
  <pre><span class="nb">Object</span><span class="p">.</span><span class="nx">defineProperty</span><span class="p">(</span><span class="nx">obj</span><span class="p">,</span> <span class="nx">prop</span><span class="p">,</span> <span class="nx">descriptor</span><span class="p">)</span>
</pre>
</div>

<!--<br />
Object.defineProperty(obj, prop, descriptor)<br />
-->

のような構文なので、上記のように呼び出してる場所を検索したいと思います。

`Object.defineProperty(obj, prop, descriptor)`に該当するものを検索する場合、  
graspでは以下のように書くことが出来ます。

<div class="highlight">
  <pre>grasp -e <span class="s1">&#39;Object.defineProperty(__,__,__)&#39;</span> src/*
</pre>
</div>

<!--<br />
grasp -e 'Object.defineProperty(__,__,__)' src/*<br />
-->

一つづつ見ていくと、

*   graspコマンドで `src/*` 以下のファイルを検索しています
*   `-e` は [Example Query][9]を使うというオプションです。 
    *   graspは[Example Query][9]と[Selector Query][10]の2つの方法で検索が出来ます
    *   ワイルドカード的なものとCSSセレクタ的なもので検索する方法です
*   `'Object.defineProperty(__,__,__)'` は検索したいコードです 
    *   `__` というのが引数の数(3つ)あることがわかります。
    *   `__` はワイルドカードの事を示しています
    *   正規表現なら `'Object.defineProperty(.*?,.*?,.*?)'` みたいな感じ?
    *   正規表現と違って、ホワイトスペースや改行等余計な事を意識しなくても書くことが出来ます。

その結果を見ると幾つか使ってる箇所がわかります。

<img src="https://efcl.info/wp-content/uploads/2014/02/vue-zsh-2014-02-08-23-19-26.jpg" alt="Vue  zsh 2014 02 08 23 19 26" title="vue (zsh) 2014-02-08 23-19-26.jpg" border="0" width="600" height="495" />

後は、見つけた場所を実際に見ていくといった感じです。

### Object.definePropertyのaliasを検索する

今回は直接 `Object.defineProperty` を使っていたので問題無いですが、  
`Object.defineProperty` は長いのでライブラリの内部では以下のようなエイリアスを貼って使っているかもしれません。

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">def</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">defineProperty</span><span class="p">;</span>
</pre>
</div>

<!--<br />
var def = Object.defineProperty;<br />
-->

&#8220;Object.defineProperty&#8221; という文字列を検索すれば、見つけることも出来ますが、graspではもっと具体的に、&#8221;varである変数に`Object.defineProperty`を代入している所&#8221; というのも検索出来ます。

正規表現でも出来そうに見えますが、以下のようなコードだと結構難易度が上がります。

    var slice = Array.slice,
        def =　// for getter/setter
         Object.defineProperty;
    

graspだと、以下のようにして検索することが出来ます。

<div class="highlight">
  <pre>grasp -e <span class="s1">&#39;__[init=Object.defineProperty]&#39;</span> test.js
</pre>
</div>

<!--<br />
grasp -e '__[init=Object.defineProperty]' test.js<br />
-->

結果を見るとちゃんと該当する部分を検索出来てる事がわかります。

<img src="https://efcl.info/wp-content/uploads/2014/02/vue-zsh-2014-02-08-23-34-49.jpg" alt="Vue  zsh 2014 02 08 23 34 49" title="vue (zsh) 2014-02-08 23-34-49.jpg" border="0" width="600" height="60" />

検索できたので、どういう風に検索されているかを見ていきます(&#8211;debugオプションとかもあるのでそちらも見るといいかもしれないですね)

*   `-e` や `__` は先ほど同じ意味で、[Example Query][9]とワイルドカードです

`__[init=Object.defineProperty]` というのは、CSSセレクタをイメージすると分かりやすいです。

要素は`__`なので何でもよいですが、ここでいう要素は[JavaScript Syntax | Grasp &#8211; JavaScript structural search, replace, and refactor][11]で説明されているJavaScript ASTの要素の事を言っています。

`var a;` のような変数宣言は、 **VariableDeclarator** という要素(var-dec)に該当します。(上記の例はワイルドカードがこれに該当してる)

そして**VariableDeclarator**というのは `init` というプロパティ(属性)を持っていて、この `init`の値が `Object.defineProperty` にマッチするものを検索しています。

(`init` の値というは簡単に言えば、 var a = 1; の 1の部分)

この辺はコードをパースした結果を見比べて見るといいかもしれません。

*   [Esprima: Parser][12]

graspは[Selector Query][10]というCSSセレクタ的なものもあるので、こちらを使った場合は直感的では無いですが以下のように書くことが出来ます。

<div class="highlight">
  <pre>grasp -s <span class="s1">&#39;var-dec[init=member[obj=#Object][prop=(#defineProperty)]]&#39;</span> test.js
</pre>
</div>

<!--<br />
grasp -s 'var-dec[init=member[obj=#Object][prop=(#defineProperty)]]' test.js<br />
-->

* * *

今回はES5サポートというキーワードを元に安全で効率も良いgetter/setterを使ってると推測して検索しましたが、  
キーワードが絞れない場合は実際にステップ実行を見ていったほうが楽だと思います。  
古いIEをサポートしてるなら他の方法が幾つかありそうでキーワードから考えるのは中々難しい。

例えば、[Ractive.js][13]のように[Array modification · RactiveJS/Ractive Wiki][14]ハックを使ったり、AngularJSは[Dirty checking][15]というやり方をしている等やり方的に幾つかでてくると思うので、  
ステップ実行やドキュメントから探したりした方が効率が良さそうです。

### その他

今回紹介した方法以外にも、最近のライブラリならある程度モジュールでファイルが別れてるはずなので、ファイル名をヒントに探すとか、  
GithubやStackOverFlowで検索するとかやり口はいくらでもあります。

今回ターゲットにした[Vue.js][1]もCommonnJSで書かれていて、[component][16]を使ってファイルをビルド出来るようにしてました。  
(ビルド環境も面白くて、Gruntを使っている感じでしたが、内部でgulp pluginである[gulp-component][17]を使ったりしてた)

## おわりに

この記事では、JavaScriptのライブラリの実装を見ていく2つの方法について書きました。

*   デバッガーを使ってステップ実行をして中身を見ていく方法
*   [grasp][7]を使ってキーワードから探していく方法

JavaScriptでは公開されてるライブラリも含め、普通のウェブサイトでもソースコードが見られてので、実際に動いてるソースが探せば見つけやすい世界です。

Webkit/Chrome/Firefox([27〜][18])のDevToolsではJavaScriptの整形表示機能もあったりします。

ソースコードから学べることも多いので、興味があるものは色々読んでみるといいかもしれません。

 [1]: http://vuejs.org/ "Vue.js"
 [2]: https://github.com/yyx990803/vue#browser-support " Browser Support"
 [3]: http://knockoutjs.com/ "knockout.js"
 [4]: http://www.adobe.com/jp/devnet/html5/articles/getting-started-with-knockoutjs.html "ko.observable"
 [5]: http://qiita.com/tenntenn/items/55fd8fc98cf29b1e43e5 "knockoutjs - 作って分かるJavaScriptでデータバインド - Qiita"
 [6]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty "Object.defineProperty"
 [7]: http://graspjs.com/ "grasp"
 [8]: http://jser.info/post/73202282881/grasp-javascript "Graspを使ったJavaScriptのリファクタリング | JSer.info"
 [9]: http://graspjs.com/docs/equery/ "Example Query"
 [10]: http://graspjs.com/docs/squery/ "Selector Query"
 [11]: http://graspjs.com/docs/syntax-js/ "JavaScript Syntax | Grasp - JavaScript structural search, replace, and refactor"
 [12]: http://esprima.org/demo/parse.html?code=var%20slice%20%3D%20Array.slice%2C%0A%20%20%20%20def%20%3D%E3%80%80%2F%2F%20for%20getter%2Fsetter%0A%20%20%20%20%20Object.defineProperty%3B "Esprima: Parser"
 [13]: http://www.ractivejs.org/ "Ractive.js"
 [14]: https://github.com/RactiveJS/Ractive/wiki/Array-modification#performance-and-ui-benefits "Array modification · RactiveJS/Ractive Wiki"
 [15]: http://projects.mariusgundersen.net/JSconf2013/#/angular-dirty "Dirty checking"
 [16]: https://github.com/component/component "component"
 [17]: https://github.com/yyx990803/gulp-component "gulp-component"
 [18]: https://bugzilla.mozilla.org/show_bug.cgi?id=762761
