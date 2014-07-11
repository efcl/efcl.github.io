---
title: gulpfileをCoffeeScript等で書く方法
author: azu
layout: post
permalink: /2014/0123/res3625/
dsq_thread_id:
  - 2163562402
categories:
  - javascript
tags:
  - CoffeeScript
  - gulp
  - javascript
---
Task Runnerツールの[gulp][1]で、  
タスクの設定は `gulpfile.js` という設定スクリプトを作って書くことになっています。

(任意のファイルを指定する場合は、コマンドライン引数の `--gulpfile` オプションで指定します)

*   [gulp/docs/getting-started.md at master · gulpjs/gulp][2]

Task Runnerツールとして有名な[Grunt][3]では、設定ファイルをjs以外にCoffeeScriptをデフォルトでサポートしているため、  
オブジェクトの入れ子がたくさんできる `gruntfile` をCoffeeScriptで書くという人も多いと思います。

[gulp][1]では、デフォルトでは `js` ですが、 `--require` オプションを使うことで任意の[altJS][4]を使って、  
`gulpfile` を書くことが出来るようになっています。

(この場合のデフォルトとは、gulp側に自動的にcoffeeという拡張子をみて何かする処理がないということ)

## CoffeeScriptでgulpfileを書く

サンプルは以下に置いてあります。

*   [azu/gulpfile-coffee-seed][5]

まずは、必要なnodeモジュールをインストールします(上記のプロジェクトなら既に定義してあるので `npm install` するだけ)

<div class="highlight">
  <pre>npm install --save-dev gulp gulp-coffee coffee-script
</pre>
</div>

次に、設定ファイルをCoffeeScriptで書きます。

> [gulpfile.coffee][6] 

<div class="highlight">
  <pre><span class="nv">gulp = </span><span class="nx">require</span><span class="p">(</span><span class="s">&#39;gulp&#39;</span><span class="p">)</span>
<span class="nv">coffee = </span><span class="nx">require</span><span class="p">(</span><span class="s">&#39;gulp-coffee&#39;</span><span class="p">)</span>

<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span> <span class="s">&#39;coffee&#39;</span><span class="p">,</span> <span class="nf">-&gt;</span>
  <span class="nx">gulp</span><span class="p">.</span><span class="nx">src</span><span class="p">(</span><span class="s">&#39;src/**/*.coffee&#39;</span><span class="p">)</span>
      <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">coffee</span><span class="p">({</span><span class="nx">bare</span><span class="o">:</span><span class="kc">true</span><span class="p">}))</span>
      <span class="p">.</span><span class="nx">pipe</span> <span class="nx">gulp</span><span class="p">.</span><span class="nx">dest</span><span class="p">(</span><span class="s">&#39;app&#39;</span><span class="p">)</span>

<span class="nx">gulp</span><span class="p">.</span><span class="nx">task</span> <span class="s">&#39;default&#39;</span><span class="p">,</span> <span class="nf">-&gt;</span>
  <span class="nx">gulp</span><span class="p">.</span><span class="nx">run</span> <span class="s">&#39;coffee&#39;</span>
</pre>
</div>

この設定ファイルをgulpの設定ファイルと認識させて、defaultタスクを実行したいと思います。

`gulpfile.js` の場合は `$ gulp` とするだけで実行出来ますが、  
`gulpfile.coffee` をCoffeeScriptでコンパイルしてから実行させる必要があります。

それを簡単に行うのが、 `--require` オプションで、コンパイラとなるNodeのモジュール名をしてします。(coffeescriptの場合は `coffee-script` がモジュール名です)

なので、以下のように実行すれば `gulpfile.coffee` を設定して読み込んでタスクを実行出来ます。

<div class="highlight">
  <pre><span class="nv">$ </span>gulp --require coffee-script
</pre>
</div>

毎回指定するのが面倒な場合は `alias gulp=gulp --require coffee-script` とか。

これで、coffeescriptで書いた設定ファイルを利用できるようになりますが、  
他の手法についてはドキュメントにも書いてあるのでそちらも参照するといいです。

*   [Using coffee-script for gulpfile][7]

こういうTips的な使い方は[recipes][8]にまとめていってるようなのでそちらも参照するといいです。

*   [gulp/docs at master · gulpjs/gulp][9]

## 仕組み

最初に `js` という拡張子についてしか、 gulp側には定義されてないと言いましたが、  
`gulpfile.coffee` の `coffee` という拡張子はどうやって認識してるのでしょうか?

gulp 3.4 では gilefile + 拡張子のリスト にマッチするものを設定ファイルとして認識するようになってます。

<div class="highlight">
  <pre><span class="kd">function</span> <span class="nx">getGulpFile</span><span class="p">()</span> <span class="p">{</span>
  <span class="kd">var</span> <span class="nx">extensions</span><span class="p">;</span>
  <span class="k">if</span> <span class="p">(</span><span class="nx">require</span><span class="p">.</span><span class="nx">extensions</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">extensions</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">keys</span><span class="p">(</span><span class="nx">require</span><span class="p">.</span><span class="nx">extensions</span><span class="p">).</span><span class="nx">join</span><span class="p">(</span><span class="s1">&#39;,&#39;</span><span class="p">);</span>
  <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
    <span class="nx">extensions</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;.js&#39;</span><span class="p">];</span>
  <span class="p">}</span>
  <span class="kd">var</span> <span class="nx">gulpFile</span> <span class="o">=</span> <span class="nx">findup</span><span class="p">(</span><span class="s1">&#39;gulpfile{&#39;</span><span class="o">+</span><span class="nx">extensions</span><span class="o">+</span><span class="s1">&#39;}&#39;</span><span class="p">,</span> <span class="p">{</span><span class="nx">cwd</span><span class="o">:</span> <span class="nx">cwd</span><span class="p">,</span> <span class="nx">nocase</span><span class="o">:</span> <span class="kc">true</span><span class="p">});</span>
  <span class="k">return</span> <span class="nx">gulpFile</span><span class="p">;</span>
<span class="p">}</span>
</pre>
</div>

*   [gulp/bin/gulp.js at 67bd056b593083c8c13ca09c1823847d5537df45 · gulpjs/gulp][10]

この拡張子のリストは `require.extensions` という配列から来てることがわかります。

この [require.extensions][11] はnodeにあるグローバルオブジェクト的なもので、ここに `.coffee` の文字列が存在すると、  
`gulpfile.coffee` というファイル名が設定ファイルとして検出出来るようになってます。

`.coffee` というのはどこからきてるのかというと、coffee-scriptのnodeモジュール側で定義されています。

*   [coffee-script/lib/coffee-script/coffee-script.js at master · jashkenas/coffee-script][12]

何か微妙な感じがしますがそういう仕組みのようです。

 [1]: http://gulpjs.com/ "gulp"
 [2]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md "gulp/docs/getting-started.md at master · gulpjs/gulp"
 [3]: http://gruntjs.com/ "Grunt"
 [4]: http://altjs.org
 [5]: https://github.com/azu/gulpfile-coffee-seed "azu/gulpfile-coffee-seed"
 [6]: https://github.com/azu/gulpfile-coffee-seed/blob/master/gulpfile.coffee "gulpfile.coffee"
 [7]: https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-coffee-script-for-gulpfile.md " Using coffee-script for gulpfile"
 [8]: https://github.com/gulpjs/gulp/tree/master/docs/recipes "recipes"
 [9]: https://github.com/gulpjs/gulp/tree/master/docs "gulp/docs at master · gulpjs/gulp"
 [10]: https://github.com/gulpjs/gulp/blob/67bd056b593083c8c13ca09c1823847d5537df45/bin/gulp.js#L160 "gulp/bin/gulp.js at 67bd056b593083c8c13ca09c1823847d5537df45 · gulpjs/gulp"
 [11]: http://nodejs.org/api/globals.html#globals_require_extensions "require.extensions#"
 [12]: https://github.com/jashkenas/coffee-script/blob/master/lib/coffee-script/coffee-script.js#L23 "coffee-script/lib/coffee-script/coffee-script.js at master · jashkenas/coffee-script"