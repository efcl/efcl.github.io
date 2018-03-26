---
title: gulp 3.5でgulp.runがdeprecatedになりました
author: azu
layout: post
permalink: /2014/0125/res3630/
dsq_thread_id:
  - 2172582371
categories:
  - javascript
tags:
  - gulp
  - javascript
---
<del>Task runner</del> Build systemツールである[gulp 3.5][1]がリリースされました。

### 変更点

[gulp/CHANGELOG.md at master · gulpjs/gulp][2] に変更点が幾つか載っていますが、  
以下の2点は今までにgulpfileを書いてきた人は影響があると思います。(公式のreadmeとかもそうだったので)

*   added `gulp.watch(globs, tasksArray)` sugar
*   deprecate `gulp.run`

`gulp.run` が 以下のような議論/問題点を経て非推奨になっています。

*   [Avoid promoting gulp.run by robrich · Pull Request #162 · gulpjs/gulp][3]
*   要はタスクの依存関係のために `gulp.run` を使うと問題がでるケースがある

そのため、以下のようなタスクを実装すると

<div class="highlight">
  <pre><span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;default&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">run</span><span class="p">(</span><span class="s1">&#39;build&#39;</span><span class="p">);</span>
<span class="p">});</span>
</pre>
</div>

<!--<br />
gulp.task('default', function () {<br />
    gulp.run('build');<br />
});<br />
-->

> gulp.run() has been deprecated. Use task dependencies or gulp.watch task triggering instead. 

という警告が出るようになったと思います(3.5から)

これをどう書き換えるかというと、`gulp.run` ではなくて、`gulp.task` や `gulp.watch` にはタスク同士の依存関係を定義する方法があるので、そちらに書き換えます。

### 書き換え

[npmとbrowserifyを使ったクライアントサイドのウェブアプリ開発 | Web scratch][4] で紹介した[azu/tech-video-rss-searcher][5]を例に書き換えてみます。

書き換え前の[gulpfile.js][6]は以下のような感じです。

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">gulp</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;gulp&#39;</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">gutil</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"gulp-util"</span><span class="p">)</span>
<span class="kd">var</span> <span class="nx">browserify</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;gulp-browserify&#39;</span><span class="p">);</span>
<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;build&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">gulp</span><span class="p">.</span><span class="nx">src</span><span class="p">(</span><span class="s1">&#39;./app/app.js&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">read</span><span class="o">:</span> <span class="kc">false</span> <span class="p">})</span>
        <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">browserify</span><span class="p">({</span>
            <span class="nx">transform</span><span class="o">:</span> <span class="p">[</span><span class="s2">"debowerify"</span><span class="p">],</span>
            <span class="nx">debug</span><span class="o">:</span> <span class="kc">true</span>
        <span class="p">}))</span>
        <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">gulp</span><span class="p">.</span><span class="nx">dest</span><span class="p">(</span><span class="s1">&#39;./public/&#39;</span><span class="p">));</span>
<span class="p">});</span>
<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;watch&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">run</span><span class="p">(</span><span class="s1">&#39;build&#39;</span><span class="p">);</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">watch</span><span class="p">(</span><span class="s1">&#39;./app/**/*.js&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">gulp</span><span class="p">.</span><span class="nx">run</span><span class="p">(</span><span class="s1">&#39;build&#39;</span><span class="p">);</span>
    <span class="p">});</span>
<span class="p">});</span>

<span class="c1">// alt : `beefy app/app.js:public/app.js 8989 -- -t debowerify`</span>
<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s2">"server"</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">connect</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"connect"</span><span class="p">);</span>
    <span class="nx">connect</span><span class="p">().</span><span class="nx">use</span><span class="p">(</span><span class="nx">connect</span><span class="p">.</span><span class="kr">static</span><span class="p">(</span><span class="nx">__dirname</span><span class="p">)).</span><span class="nx">listen</span><span class="p">(</span><span class="mi">8989</span><span class="p">);</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">run</span><span class="p">(</span><span class="s2">"watch"</span><span class="p">);</span>
<span class="p">});</span>
<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;default&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">run</span><span class="p">(</span><span class="s1">&#39;build&#39;</span><span class="p">);</span>
<span class="p">});</span>
</pre>
</div>

これを元に、3.5向け(書き換えなくても警告がでるだけなので4.0がくるまでは動くと思いますが)に書き換えてみます。

#### gulp.taskの依存

最初に紹介したような `gulp.task` を実行するtaskの場合

<div class="highlight">
  <pre><span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;default&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">run</span><span class="p">(</span><span class="s1">&#39;build&#39;</span><span class="p">);</span>
<span class="p">});</span>
</pre>
</div>

<!--<br />
gulp.task('default', function () {<br />
    gulp.run('build');<br />
});<br />
-->

これは、以下のように `gulp.task` の第二引数で依存するtaskに書き換えられます。

*   Doc : [gulp.task(name[, deps], fn)][7]

<div class="highlight">
  <pre><span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;default&#39;</span><span class="p">,</span> <span class="p">[</span><span class="s1">&#39;build&#39;</span><span class="p">]);</span>
</pre>
</div>

<!--<br />
gulp.task('default', ['build']);<br />
-->

#### 依存するtask + 処理の場合

<div class="highlight">
  <pre><span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s2">"server"</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">run</span><span class="p">(</span><span class="s2">"watch"</span><span class="p">);</span>
    <span class="kd">var</span> <span class="nx">connect</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"connect"</span><span class="p">);</span>
    <span class="nx">connect</span><span class="p">().</span><span class="nx">use</span><span class="p">(</span><span class="nx">connect</span><span class="p">.</span><span class="kr">static</span><span class="p">(</span><span class="nx">__dirname</span><span class="p">)).</span><span class="nx">listen</span><span class="p">(</span><span class="mi">8989</span><span class="p">);</span>
<span class="p">});</span>
</pre>
</div>

<!--<br />
gulp.task("server", function () {<br />
    gulp.run("watch");<br />
    var connect = require("connect");<br />
    connect().use(connect.static(__dirname)).listen(8989);<br />
});<br />
-->

これは以下のように書き換え出来ます。

<div class="highlight">
  <pre><span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s2">"server"</span><span class="p">,</span> <span class="p">[</span><span class="s2">"watch"</span><span class="p">],</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">connect</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"connect"</span><span class="p">);</span>
    <span class="nx">connect</span><span class="p">().</span><span class="nx">use</span><span class="p">(</span><span class="nx">connect</span><span class="p">.</span><span class="kr">static</span><span class="p">(</span><span class="nx">__dirname</span><span class="p">)).</span><span class="nx">listen</span><span class="p">(</span><span class="mi">8989</span><span class="p">);</span>
<span class="p">});</span>
</pre>
</div>

<!--<br />
gulp.task("server", ["watch"], function () {<br />
    var connect = require("connect");<br />
    connect().use(connect.static(__dirname)).listen(8989);<br />
});<br />
-->

#### gulp.watch の依存関係

以下のように `gulp.watch` が `gulp.run` を読んでいる場合も同じように書き換えることが出来ます。

<div class="highlight">
  <pre><span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;watch&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">run</span><span class="p">(</span><span class="s1">&#39;build&#39;</span><span class="p">);</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">watch</span><span class="p">(</span><span class="s1">&#39;./app/**/*.js&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">gulp</span><span class="p">.</span><span class="nx">run</span><span class="p">(</span><span class="s1">&#39;build&#39;</span><span class="p">);</span>
    <span class="p">});</span>
<span class="p">});</span>
</pre>
</div>

<!--<br />
gulp.task('watch', function () {<br />
    gulp.run('build');<br />
    gulp.watch('./app/**/*.js', function (event) {<br />
        gulp.run('build');<br />
    });<br />
});<br />
-->

gulp.watch も 第二引数に依存するtaskを渡すことで同様の処理を書けます。

<div class="highlight">
  <pre><span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;watch&#39;</span><span class="p">,</span> <span class="p">[</span><span class="s1">&#39;build&#39;</span><span class="p">],</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">watch</span><span class="p">(</span><span class="s1">&#39;./app/**/*.js&#39;</span><span class="p">,</span> <span class="p">[</span><span class="s1">&#39;build&#39;</span><span class="p">]);</span>
<span class="p">});</span>
</pre>
</div>

<!--<br />
gulp.task('watch', ['build'], function () {<br />
    gulp.watch('./app/**/*.js', ['build']);<br />
});<br />
-->

この時は `build` されてから、第三引数のfunctionが呼ばれます。

これで警告がでる部分がなくなりました

**書き換え後** は以下のようになりました

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">gulp</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;gulp&#39;</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">gutil</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"gulp-util"</span><span class="p">)</span>
<span class="kd">var</span> <span class="nx">browserify</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;gulp-browserify&#39;</span><span class="p">);</span>
<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;build&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">gulp</span><span class="p">.</span><span class="nx">src</span><span class="p">(</span><span class="s1">&#39;./app/app.js&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">read</span><span class="o">:</span> <span class="kc">false</span> <span class="p">})</span>
        <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">browserify</span><span class="p">({</span>
            <span class="nx">transform</span><span class="o">:</span> <span class="p">[</span><span class="s2">"debowerify"</span><span class="p">],</span>
            <span class="nx">debug</span><span class="o">:</span> <span class="kc">true</span>
        <span class="p">}))</span>
        <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">gulp</span><span class="p">.</span><span class="nx">dest</span><span class="p">(</span><span class="s1">&#39;./public/&#39;</span><span class="p">));</span>
<span class="p">});</span>

<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;watch&#39;</span><span class="p">,</span> <span class="p">[</span><span class="s1">&#39;build&#39;</span><span class="p">],</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="nx">gulp</span><span class="p">.</span><span class="nx">watch</span><span class="p">(</span><span class="s1">&#39;./app/**/*.js&#39;</span><span class="p">,</span> <span class="p">[</span><span class="s1">&#39;build&#39;</span><span class="p">]);</span>
<span class="p">});</span>

<span class="c1">// alt : `beefy app/app.js:public/app.js 8989 -- -t debowerify`</span>
<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s2">"server"</span><span class="p">,</span> <span class="p">[</span><span class="s2">"watch"</span><span class="p">],</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">connect</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">"connect"</span><span class="p">);</span>
    <span class="nx">connect</span><span class="p">().</span><span class="nx">use</span><span class="p">(</span><span class="nx">connect</span><span class="p">.</span><span class="kr">static</span><span class="p">(</span><span class="nx">__dirname</span><span class="p">)).</span><span class="nx">listen</span><span class="p">(</span><span class="mi">8989</span><span class="p">);</span>
<span class="p">});</span>
<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span><span class="p">(</span><span class="s1">&#39;default&#39;</span><span class="p">,</span> <span class="p">[</span><span class="s1">&#39;build&#39;</span><span class="p">]);</span>
</pre>
</div>

Diffは以下で見られます。

*   [https://github.com/azu/tech-video-rss-searcher/commit/4ac9dca709f8e90f7a228b39a45b96e47a0ad5a1][8]

今回の書き換えたtaskの依存関係の書き方については以下のドキュメントに書かれています。

*   [gulp/docs/API.md at master · gulpjs/gulp][9]
*   [gulp/docs/recipes/running-tasks-in-series.md at master · gulpjs/gulp][10]
*   内部的に使ってるモジュール [robrich/orchestrator][11]

### おわりに

[gulp][12] 3.5のdeprecate `gulp.run` は、  
gulp taskの依存関係のために `gulp.run` を使うのは辞めるべきという事で非推奨になったので、  
`gulp.run` のような事を必要とする場面はまだあるとは思います。

そういう時は、gulpfileはただのJavaScriptであるということを思い出して、普通に関数を作ってみるといいのかもしれません。

> If gulp was a task runner I would agree with you. gulp is a build system helper, the task system is out of necessity. We are trying to ween people off of this and onto vanilla JS stuff. JS has an awesome task running system called functions that works really well. 

*   [Deprecating gulp.run no longer allows defining logic before running tasks. · Issue #193 · gulpjs/gulp][13]

gulpはtask runnerではなく、build system helperであり、JavaScriptには関数と呼ばれるタスクを実行する仕組みが既にあるためdeprecateになった感じです。

gulpは[APIデザイン][14]的な話が結構でてくるので見ていて面白い感じがします。

 [1]: https://github.com/gulpjs/gulp/blob/master/CHANGELOG.md#35 "3.5"
 [2]: https://github.com/gulpjs/gulp/blob/master/CHANGELOG.md#35 "gulp/CHANGELOG.md at master · gulpjs/gulp"
 [3]: https://github.com/gulpjs/gulp/pull/162 "Avoid promoting gulp.run by robrich · Pull Request #162 · gulpjs/gulp"
 [4]: https://efcl.info/2014/0120/res3605/ "npmとbrowserifyを使ったクライアントサイドのウェブアプリ開発 | Web scratch"
 [5]: https://github.com/azu/tech-video-rss-searcher/ "azu/tech-video-rss-searcher"
 [6]: https://github.com/azu/tech-video-rss-searcher/blob/ef0853ed723cacb49ac121a9462193426665534b/gulpfile.js "gulpfile.js"
 [7]: https://github.com/gulpjs/gulp/blob/master/docs/API.md " gulp.task(name[, deps], fn)"
 [8]: https://github.com/azu/tech-video-rss-searcher/commit/4ac9dca709f8e90f7a228b39a45b96e47a0ad5a1?w=1
 [9]: https://github.com/gulpjs/gulp/blob/master/docs/API.md "gulp/docs/API.md at master · gulpjs/gulp"
 [10]: https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md "gulp/docs/recipes/running-tasks-in-series.md at master · gulpjs/gulp"
 [11]: https://github.com/robrich/orchestrator "robrich/orchestrator"
 [12]: http://gulpjs.com/ "gulp"
 [13]: https://github.com/gulpjs/gulp/issues/193 "Deprecating gulp.run no longer allows defining logic before running tasks. · Issue #193 · gulpjs/gulp"
 [14]: https://github.com/gulpjs/gulp/tree/master/docs/writing-a-plugin
