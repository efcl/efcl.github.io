---
title: power-doctestが非同期テストに対応しました
author: azu
layout: post
permalink: /2014/0322/res3743/
dsq_thread_id:
  - 2484421879
categories:
  - javascript
tags:
  - javascript
  - test
  - tools
---
[power-doctest][1]という doctest風 にコードと評価結果のコメントを並べるとテストとして実行出来るようなNode製を以前作りました。

    評価したい式; // => 期待する評価結果
    

*   [JavaScriptでdoctestを行う power-doctest を作った | Web scratch][2]

内部的にnodeの[vm][3]モジュールを使って、ASTを変換したコードを実行させていて非同期なコードに未対応でした。  
(vmモジュールで非同期の対応とエラーハンドリングのやり方がわからなかった)

色々試してみたところ何とか動いたので、[0.3.0][4]から下記のような

![gif][5]

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">array</span> <span class="o">=</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">5</span><span class="p">];</span>
<span class="nx">setTimeout</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">array</span><span class="p">;</span><span class="c1">//=&gt; [0, 2, 3, 4, 5]</span>
<span class="p">},</span> <span class="mi">16</span><span class="p">);</span>
</pre>
</div>

上記のテスト結果は失敗するので、以下のようなエラーが表示されます。

<img src="https://efcl.info/wp-content/uploads/2014/03/power-doctest-promised-example-zsh-2014-03-22-23-34-12-2014-03-22-23-34-19.jpg" alt="Power doctest promised example  zsh 2014 03 22 23 34 12 2014 03 22 23 34 19" title="power-doctest-promised-example (zsh) 2014-03-22 23-34-12 2014-03-22 23-34-19.jpg" border="0" width="600" height="131" />

サンプルコードは以下においてあります。

*   [azu/power-doctest-promised-example][6]

実行はgulp plugin経由[azu/gulp-power-doctest][7]で行ってます。

## vmモジュールのエラーハンドリング

[vm][3]モジュールは色々制限できるevalみたいな感じで、context(グローバル空間)も設定できるような感じのものです。

vmモジュール自体はエラーが起きた時に捉えるイベントとかはなくて、同期的なコードを実行する場合はtry-catchで捉えればよかったのですが、非同期コードだとそうは出来ません。

色々試したところは、[Domain][8]を使うと、vm経由の実行のエラーもキャッチできるようなので(これ仕様なのかな?)、これを使って非同期コードの実行も対応してます。

*   [node vm + domain error handling][9]

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">d</span> <span class="o">=</span> <span class="nx">domain</span><span class="p">.</span><span class="nx">create</span><span class="p">();</span>
<span class="kd">var</span> <span class="nx">context</span> <span class="o">=</span> <span class="p">{};</span>
<span class="nx">d</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s1">&#39;error&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">error</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">"Error"</span><span class="p">,</span> <span class="nx">error</span><span class="p">.</span><span class="nx">message</span><span class="p">);</span>
<span class="p">});</span>
<span class="nx">d</span><span class="p">.</span><span class="nx">run</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">vm</span><span class="p">.</span><span class="nx">runInNewContext</span><span class="p">(</span><span class="nx">code</span><span class="p">,</span> <span class="nx">context</span><span class="p">);</span>
<span class="p">});</span>
</pre>
</div>

いっそ非同期前提にした方が楽な気がしたので、実行する部分も全体Promisesにしたりしています。

色々やったせいで大分黒魔術感が高まった感じがします(設計の失敗)

*   [power-doctest/lib/power-doctest.js at 5e1a935092ead1cfe0c4d9d12a67b0f6e8deb40c · azu/power-doctest][10]

 [1]: https://github.com/azu/power-doctest "azu/power-doctest"
 [2]: https://efcl.info/2013/1201/res3494/ "JavaScriptでdoctestを行う power-doctest を作った | Web scratch"
 [3]: http://nodejs.org/api/vm.html "vm"
 [4]: https://github.com/azu/power-doctest/releases/tag/0.3.0 "0.3.0"
 [5]: http://gyazo.com/0a18eab81490475b3e6c3b70e366ca36.gif
 [6]: https://github.com/azu/power-doctest-promised-example "azu/power-doctest-promised-example"
 [7]: https://github.com/azu/gulp-power-doctest "azu/gulp-power-doctest"
 [8]: http://nodejs.org/api/domain.html "Domain"
 [9]: https://gist.github.com/azu/9700273 "node vm + domain error handling"
 [10]: https://github.com/azu/power-doctest/blob/5e1a935092ead1cfe0c4d9d12a67b0f6e8deb40c/lib/power-doctest.js#L331 "power-doctest/lib/power-doctest.js at 5e1a935092ead1cfe0c4d9d12a67b0f6e8deb40c · azu/power-doctest"
