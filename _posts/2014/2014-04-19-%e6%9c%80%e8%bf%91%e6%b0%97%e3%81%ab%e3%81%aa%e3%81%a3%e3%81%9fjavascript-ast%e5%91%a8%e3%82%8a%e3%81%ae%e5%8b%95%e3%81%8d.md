---
title: 最近気になったJavaScript AST周りの動き
author: azu
layout: post
permalink: /2014/0419/res3859/
dsq_thread_id:
  - 2623150528
hefo_after:
  - 0
hefo_before:
  - 0
categories:
  - javascript
tags:
  - AST
  - javascript
---
最近、気になったJavaScript AST関係のものについてのメモです。

JavaScript ASTについては以下などを見て下さい。

*   [カジュアルJavaScript AST][1]
*   [JavaScript AST Walker][2]

## esnext

元々[ES6 Module Transpiler][3]等やっていた[Square][4]社が[esnext][5]というプロジェクトを立ち上げました。

[esnext][5]は[Traceur][6]と同様にES6のコードを今日のJavaScriptに変換するツールです。

@[eventualbuddha][7]さんがメインでやっていて、それぞれのシンタックスの変換は[es6-spread][8]のように、ひとつのモジュールとして分けて作られています。

また変換の書き方も大体統一したやり方(まあ一人で大体書かれてるので)が取られていて、  
Facebookの@[benjamn][9]さんが作っている[ast-types][10]と[recast][11]を使ったものになっています。

テストは[example-runner][12]を使っています。  
`examples/*.js`にあるテストファイルを変換モジュールで変換した結果が`results`ディレクトリに出力されて、それの実行結果が期待通りになるかという感じで書かれています。

それぞれが小さくシンプルに書かれているので、JavaScript ASTを使った変換モジュールを書きたい人は参考になるかもしれません。

後、この辺のES6 -> なものは[addyosmani/es6-tools][13]を見ると大体まとまってると思います。

## CST

JavaScriptのAST(抽象構文木)に対してCST(解析木)の標準を決めようというプロジェクトが[getify/concrete-syntax-tree][14]で議論されています。

JavaScriptのASTは[Parser API][15]によるものが大体標準といえますが、  
このASTのNodeオブジェクトには、ホワイトスペースの位置やコメント、`(` `)`という文字そのもの等、含んでない情報があります。([Esprima][16]などパーサーによっては`tokens`等で取得できるようになっていますが)

そのような情報も含めたCSTの標準を決めようというものを@[getify][17]さんが中心になってやっています。

まだ始まったばかりで、ちゃんとConsensus取れるものになるか微妙なところです。

## [doctrine][18]

JavaScript ASTを触ると必ず触れることになる[コンストウェア][19]と呼ばれるものの一つに[doctrine][18]というJSDocパーサーがあります。

[doctrine][18]自体はJavaScript ASTに直接関係ありませんが、JSDocをパースした結果をTreeのオブジェクトとして取得することが出来ます。  
(そのオブジェクトの構造はASTに似ているところはある)

*   [Doctrine DEMO][20]

ここ1-2ヶ月で@[jonathanKingston][21]さん等が中心となって一気にJSDocのtagのサポートが増えました。

*   [Use JSDoc: Index][22]

[ESLint][23]の[valid-jsdoc][24]ルールでも使われていて、[closure-ts][25]などJSDocを扱ったツールが増えてくるかもしれません。

*   [TypeScript用フルスタック型付きライブラリのご提案 #葉桜JS][26]

## [AST Query][27]

大体の場合JS ASTを使ったものを作るときに[Estraverse][28]等の走査をする関数を使ったりすると思います。

*   [Estraverseの動きを可視化する | Web scratch][29]

DOMにも[TreeWalker][30]というTraverse関数はありますが、普段ウェブ開発とかで特定のElementを取得する場合はDOM API(getElement..やquerySelector)のようなものを使うと思います。

[AST Query][27]というライブラリは、DOM APIのような感じでASTから特定のnodeを取得したり、変更したりできるライブラリです。

DOM APIのように全てをカバーするわけではありませんが、最近[0.2.0][31]がリリースされて少しづつできることが増えてきました。

決まった名前の変数や関数を変更したい等の用途だとかなり直感的に書けるようになると思います。

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">tree</span> <span class="o">=</span> <span class="nx">program</span><span class="p">(</span><span class="s1">&#39;var a = 1&#39;</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">variable</span> <span class="o">=</span> <span class="nx">tree</span><span class="p">.</span><span class="kd">var</span><span class="p">(</span><span class="s2">"a"</span><span class="p">);</span>
<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">stringify</span><span class="p">(</span><span class="nx">variable</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="mi">4</span><span class="p">));</span>
<span class="cm">/*</span>
<span class="cm">{</span>
<span class="cm">    "nodes": [</span>
<span class="cm">        {</span>
<span class="cm">            "type": "VariableDeclarator",</span>
<span class="cm">            "id": {</span>
<span class="cm">                "type": "Identifier",</span>
<span class="cm">                "name": "a"</span>
<span class="cm">            },</span>
<span class="cm">            "init": {</span>
<span class="cm">                "type": "Literal",</span>
<span class="cm">                "value": 1,</span>
<span class="cm">                "raw": "1"</span>
<span class="cm">            }</span>
<span class="cm">        }</span>
<span class="cm">    ],</span>
<span class="cm">    "length": 1</span>
<span class="cm">}</span>
<span class="cm">*/</span>
<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">variable</span><span class="p">.</span><span class="nx">value</span><span class="p">());</span>
<span class="cm">/*</span>
<span class="cm">{</span>
<span class="cm">    node: { type: &#39;Literal&#39;, value: 1, raw: &#39;1&#39; },</span>
<span class="cm">    type: &#39;Literal&#39;</span>
<span class="cm">}</span>
<span class="cm">*/</span>

<span class="c1">// ==> rename + update</span>
<span class="nx">variable</span><span class="p">.</span><span class="nx">rename</span><span class="p">(</span><span class="s2">"b"</span><span class="p">);</span>
<span class="nx">variable</span><span class="p">.</span><span class="nx">value</span><span class="p">(</span><span class="s2">"2"</span><span class="p">);</span>

<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">stringify</span><span class="p">(</span><span class="nx">variable</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="mi">4</span><span class="p">));</span>
<span class="cm">/*</span>
<span class="cm">{</span>
<span class="cm">    "nodes": [</span>
<span class="cm">        {</span>
<span class="cm">            "type": "VariableDeclarator",</span>
<span class="cm">            "id": {</span>
<span class="cm">                "type": "Identifier",</span>
<span class="cm">                "name": "b"</span>
<span class="cm">            },</span>
<span class="cm">            "init": {</span>
<span class="cm">                "type": "Literal",</span>
<span class="cm">                "value": 2,</span>
<span class="cm">                "raw": "2"</span>
<span class="cm">            }</span>
<span class="cm">        }</span>
<span class="cm">    ],</span>
<span class="cm">    "length": 1</span>
<span class="cm">}</span>
<span class="cm"> */</span>
</pre>
</div>

 [1]: http://azu.github.io/slide/JSojisan/ "カジュアルJavaScript AST"
 [2]: http://azu.github.io/slide/tkbjs/js-ast-walker.html "JavaScript AST Walker"
 [3]: https://github.com/square/es6-module-transpiler "ES6 Module Transpiler"
 [4]: https://github.com/square "Square"
 [5]: https://github.com/square/esnext "esnext"
 [6]: https://github.com/google/traceur-compiler "Traceur"
 [7]: https://github.com/eventualbuddha "eventualbuddha"
 [8]: https://github.com/square/es6-spread "es6-spread"
 [9]: https://github.com/benjamn "benjamn"
 [10]: https://github.com/benjamn/ast-types "ast-types"
 [11]: https://github.com/benjamn/recast "recast"
 [12]: https://github.com/square/example-runner "example-runner"
 [13]: https://github.com/addyosmani/es6-tools "addyosmani/es6-tools"
 [14]: https://github.com/getify/concrete-syntax-tree "getify/concrete-syntax-tree"
 [15]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API "Parser API"
 [16]: http://esprima.org/ "Esprima"
 [17]: https://github.com/getify "getify"
 [18]: https://github.com/Constellation/doctrine "doctrine"
 [19]: https://github.com/Constellation "Constellation"
 [20]: http://constellation.github.io/doctrine/demo/index.html "Doctrine"
 [21]: https://github.com/jonathanKingston "jonathanKingston"
 [22]: http://usejsdoc.org/index.html "Use JSDoc: Index"
 [23]: http://eslint.org/ "ESLint"
 [24]: http://eslint.org/docs/rules/valid-jsdoc.html "valid-jsdoc"
 [25]: https://github.com/teppeis/closure-ts "closure-ts"
 [26]: https://gist.github.com/teppeis/10659631 "TypeScript用フルスタック型付きライブラリのご提案 #葉桜JS"
 [27]: https://github.com/SBoudrias/AST-query#object-literal-token "AST Query"
 [28]: https://github.com/Constellation/estraverse "Estraverse"
 [29]: http://efcl.info/2014/0404/res3802/ "Estraverseの動きを可視化する | Web scratch"
 [30]: http://uhyohyohyo.sakura.ne.jp/javascript/7_3.html "TreeWalker"
 [31]: https://github.com/SBoudrias/AST-query/releases/tag/0.2.0 "0.2.0"