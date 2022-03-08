---
title: Estraverseの動きを可視化する
author: azu
layout: post
permalink: /2014/0404/res3802/
dsq_thread_id:
  - 2585989146
categories:
  - javascript
tags:
  - AST
  - javascript
  - library
  - tools
---
## [Estraverse][1]

[Estraverse][1]というJavaScript ASTのtraverseを行うライブラリがあります。

JavaScript ASTについては以下を参照して下さい。

*   [JavaScript AST Walker][2]
*   [カジュアルJavaScript AST][3]

このtraverse関数にはそれぞれのnodeの通り方として`enter`と`leave`というものが用意されています。

<div class="highlight">
  <pre><span class="nx">estraverse</span><span class="p">.</span><span class="nx">traverse</span><span class="p">(</span><span class="nx">ast</span><span class="p">,</span> <span class="p">{</span>
    <span class="nx">enter</span><span class="o">:</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">node</span><span class="p">,</span> <span class="nx">parent</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">if</span> <span class="p">(</span><span class="nx">node</span><span class="p">.</span><span class="nx">type</span> <span class="o">==</span> <span class="s1">&#39;FunctionExpression&#39;</span> <span class="o">||</span> <span class="nx">node</span><span class="p">.</span><span class="nx">type</span> <span class="o">==</span> <span class="s1">&#39;FunctionDeclaration&#39;</span><span class="p">)</span>
            <span class="k">return</span> <span class="nx">estraverse</span><span class="p">.</span><span class="nx">VisitorOption</span><span class="p">.</span><span class="nx">Skip</span><span class="p">;</span>
    <span class="p">},</span>
    <span class="nx">leave</span><span class="o">:</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">node</span><span class="p">,</span> <span class="nx">parent</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">if</span> <span class="p">(</span><span class="nx">node</span><span class="p">.</span><span class="nx">type</span> <span class="o">==</span> <span class="s1">&#39;VariableDeclarator&#39;</span><span class="p">)</span>
          <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">node</span><span class="p">.</span><span class="nx">id</span><span class="p">.</span><span class="nx">name</span><span class="p">);</span>
    <span class="p">}</span>
<span class="p">});</span>
</pre>
</div>

という感じで書くと`ast`を`enter`では上から下へ、`leave`では下から上というイメージで探索することが出来ます。

[木構造][4]なので、`enter`ではroot nodeからleaf nodeへ、`leave`ではleaf nodeからroot node(parent node)へという感じの流れになっていると思います。

*   [estraverseの仕様意訳 &#8211; 若き JavaScripter の悩み][5]

自分は探索とかアルゴリズムが苦手なので、こういう動きが直感的にわからなかったため、どういう動きをするのか可視化するツールを書きました。

## [azu/visualize_estraverse][6]

[azu/visualize_estraverse][6]にソースコードが置いてあります。

*   [https://azu.github.io//visualize_estraverse/][7]



上記のように、適当にコードを入れてそれぞれのボタンを押せば、`enter`, `leave`又は`enter`と`leave`両方がどのような流れtraverseされるかが見られます。

ASTそのもの(JSON)も同じように可視化できると良さそうな気がしたのですが、イマイチいいUIとかが思いつかなかったのでコード上で色付けしています。

[CodeMirror][8]の選択色を変えてやるという荒業でやってるので、かなり大雑把な実装です。

*   [azu/visualize_estraverse][6]

 [1]: https://github.com/Constellation/estraverse "Estraverse"
 [2]: https://azu.github.io//slide/tkbjs/js-ast-walker.html "JavaScript AST Walker"
 [3]: https://azu.github.io//slide/JSojisan/ "カジュアルJavaScript AST"
 [4]: http://ja.wikipedia.org/wiki/%E6%9C%A8%E6%A7%8B%E9%80%A0_(%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0) "木構造"
 [5]: http://orgachem.hatenablog.com/entry/2013/06/19/013527 "estraverseの仕様意訳 - 若き JavaScripter の悩み"
 [6]: https://github.com/azu/visualize_estraverse/ "azu/visualize_estraverse"
 [7]: https://azu.github.io//visualize_estraverse/ "visualize estraverse step"
 [8]: http://codemirror.net/ "CodeMirror"