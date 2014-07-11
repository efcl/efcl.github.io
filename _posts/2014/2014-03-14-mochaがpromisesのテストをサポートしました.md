---
title: MochaがPromisesのテストをサポートしました
author: azu
layout: post
permalink: /2014/0314/res3708/
dsq_thread_id:
  - 2428911642
categories:
  - javascript
tags:
  - javascript
  - library
  - test
---
JavaScriptテストフレームワークの[Mocha][1] [1.18.0][2]がリリースされ、promiseのテストがサポートされました。

この記事では、次の事について書かれています。

*   Promisesのテストの書き方がどう変わるの?
*   なぜ、フレームワーク側がpromiseのサポートのする必要があるの?
*   他のPromisesテストのアプローチ

## Promisesのテストの書き方がどう変わるの?

例えば、以下のようなpromiseオブジェクトを返す関数をテストしたいと思います。

<div class="highlight">
  <pre><span class="kd">function</span> <span class="nx">getSuccessPromise</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">resolve</span><span class="p">(</span><span class="kc">true</span><span class="p">);</span>
<span class="p">}</span>
</pre>
</div>

このpromiseオブジェクトは、resolveするので、`.then` の第一引数で指定した`onFulfilled` コールバックに `true` という値を渡すようになってます。

### 今までのテストの書き方

この`getSuccessPromise`を 1.18.0より以前は以下のように書くことでテストをしていました。

<div class="highlight">
  <pre><span class="nx">it</span><span class="p">(</span><span class="s2">"should manually handling test..."</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">done</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">getSuccessPromise</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">value</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">assert</span><span class="p">(</span><span class="nx">value</span><span class="p">);</span>
        <span class="nx">done</span><span class="p">();</span>
    <span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="nx">done</span><span class="p">);</span> <span class="c1">// &lt;= このcatchが今回の変更での焦点</span>
<span class="p">});</span>
</pre>
</div>

`getSuccessPromise()`の返り値であるpromiseオブジェクトが**resolve**されると `value` に `true` が入って `assert(true)` なのでテストが通るという感じですね。

これの何が問題(面倒)なのかというと、意味がなさそうに見える `catch(done)` をわざわざ書いてるのから分かるかもしれませんが、**テストが失敗した時**に結果をdoneに渡す必要があります。

何故かというと、assertの結果がfailの場合は例外が投げられますが、promisesの`.then`の中で例外が投げられても自動的に例外がキャッチされてしまいます。

もし、`.catch(done);`を書かなかった場合、テストが失敗することもないですし、`done`も呼ばれないため終わらないテストが出来上がってしまいます。(タイムアウトになるテスト)

このことを忘れると簡単に無意味なテストが出来上がったりしてしまうため結構はまりやすいです。

例えば、次のようなテストはタイムアウトが来るまで終わらなくなります。

<div class="highlight">
  <pre><span class="nx">it</span><span class="p">(</span><span class="s2">"is 終わらないテスト"</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">done</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">Promise</span><span class="p">.</span><span class="nx">resolve</span><span class="p">(</span><span class="kc">false</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">value</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">assert</span><span class="p">(</span><span class="nx">value</span><span class="p">);</span>
        <span class="nx">done</span><span class="p">();</span>
    <span class="p">});</span>
<span class="p">});</span>
</pre>
</div>

## promisesのテストサポート

これがどのように書けるようになったかというと、公式のドキュメントにも載ってるのでそちらも参考にして欲しいのですが、以下のように書けるようになりました。

*   [simple async support, including promises][3]

<div class="highlight">
  <pre><span class="nx">it</span><span class="p">(</span><span class="s2">"should support by mocha"</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">getSuccessPromise</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">value</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">assert</span><span class="p">(</span><span class="nx">value</span><span class="p">);</span>
    <span class="p">});</span>
<span class="p">});</span>
</pre>
</div>

上記のように`done`がテストから消えてることがわかります。  
代わりに、promiseオブジェクトをテスト内でreturnして渡しています。

ちゃんとassertがfailの場合はテストもfailとなり、テストコードに無駄がなくなっています。

いわゆるthenableオブジェクト、`then`メソッドを持ったオブジェクトをreturnした場合、それはpromiseのテストだと判断してくれます。

以下にサンプルコードを置いてあります。(主に失敗した時の問題がわかるように失敗するテストが混じってます)

> [azu/mocha-support-promise][4] 

## その他

このテスト内で promiseオブジェクトをreturn してテストできるものとしては[Buster.JS][5]等があります。  
(他にpromisesをサポートしてるフレームワークとかあるかな?)

*   [Returning a promise][6]

mochaの該当pull request見ても分かるように結構歴史ある話ですが、最近になってECMAScriptとしてPromisesが仕様に入ってきたのもあって需要が出てきてサポートされた感じに見えます。

*   [Adding promise support to runnables (and thus tests). by domenic · Pull Request #329 · visionmedia/mocha][7]<blockquote cite="https://github.com/visionmedia/mocha/pull/329#issuecomment-37054832"

  
title="Adding promise support to runnables (and thus tests). by domenic · Pull Request #329 · visionmedia/mocha">
it is a community project so it's kinda up to you guys  
<cite><br /> <a href="https://github.com/visionmedia/mocha/pull/329#issuecomment-37054832">Adding promise support to runnables (and thus tests). by domenic · Pull Request #329 · visionmedia/mocha</a><br /> </cite> </blockquote> 

その他のpromisesサポートの方法としては、[domenic/mocha-as-promised][8]等のassertを拡張したライブラリ使うことなどでも、シンプルに書くことができるかもしれません。

[as-promised][9]で検索すると色々見つかると思います。

[Promises Book][10]のテストを書いてて、[同じ事][11]を思ってたのでmocha自体がサポートしてくれてちょうど良かったです。

Promisesの強力なエラーハンドリングが、反ってテスト時には邪魔になってしまう事があるという面白い感じの話だと思います。

 [1]: http://visionmedia.github.io/mocha/ "Mocha"
 [2]: https://github.com/visionmedia/mocha/blob/master/History.md#1180--2014-03-13 "1.18.0"
 [3]: http://visionmedia.github.io/mocha/ "simple async support, including promises"
 [4]: https://github.com/azu/mocha-support-promise "azu/mocha-support-promise"
 [5]: http://docs.busterjs.org/en/latest/ "Buster.JS"
 [6]: http://docs.busterjs.org/en/latest/modules/buster-test/test-case/?highlight=promise#returning-a-promise "Returning a promise"
 [7]: https://github.com/visionmedia/mocha/pull/329 "Adding promise support to runnables (and thus tests). by domenic · Pull Request #329 · visionmedia/mocha"
 [8]: https://github.com/domenic/mocha-as-promised "domenic/mocha-as-promised"
 [9]: https://www.npmjs.org/search?q=%22as-promised%22 "as-promised"
 [10]: https://github.com/azu/promises-book "Promises Book"
 [11]: https://github.com/azu/promises-book/pull/1#discussion_r10548786 "[WIP] この書籍で扱う内容について by azu · Pull Request #1 · azu/promises-book"