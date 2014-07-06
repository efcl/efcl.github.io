---
title: iOSアプリのテストをTravis CIで走らせて、コードカバレッジをCoverallsで取る方法
author: azu
layout: post
permalink: /2013/0613/res3301/
dsq_thread_id:
  - 1394566768
categories:
  - iOS
tags:
  - iOS
  - test
---
<p>この記事では以下のことについての手順を簡単に説明します。</p>
<ul>
<li>iOSアプリのテストを<a href="https://travis-ci.org/" title="desc">Travis CI</a>で動かす</li>
<li><a href="https://coveralls.io/" title="Your Repositories | Coveralls - Code Coverage History and Statistics">Coveralls</a>にコードカバレッジを渡す</li>
</ul>
<p><a href="http://efcl.info/2013/0607/res3295/" title="Objective-C勉強会＠東京 ６月 でNSDateについて発表してきた | Web scratch">Objective-C勉強会＠東京 ６月 でNSDateについて発表してきた | Web scratch</a> で書いていたように、<br />
NSDateについてのライブラリ <a href="https://github.com/azu/NSDate-Escort" title="azu/NSDate-Escort · GitHub">azu/NSDate-Escort · GitHub</a> を書いてて、このライブラリは、</p>
<p><a href="https://travis-ci.org/" title="desc">Travis CI</a>でテストを動かして<a href="https://travis-ci.org/azu/NSDate-Escort"><img src="https://travis-ci.org/azu/NSDate-Escort.png?branch=master" alt="Build Status" /></a><br />
<a href="https://coveralls.io/" title="Your Repositories | Coveralls - Code Coverage History and Statistics">Coveralls</a> でコードカバレッジ<a href="https://coveralls.io/r/azu/NSDate-Escort?branch=master"><img src="https://coveralls.io/repos/azu/NSDate-Escort/badge.png?branch=master" alt="Coverage Status" /></a> をとっています。</p>
<p><a href="https://github.com/azu/NSDate-Escort" title="azu/NSDate-Escort · GitHub">NSDate-Escort</a> を例にして設定を見ていきます。</p>
<h2>iOSアプリのテストをTravis CIで動かす</h2>
<p>CLIでテストを動かすには</p>
<p><code>xcodebuild</code> を直接使ってテストを走らせる方法と</p>
<ul>
<li><a href="http://blog.dealforest.net/2013/04/travisci_ios_library/" title="Travis CI で iOS のライブラリを動かしたメモ | Supernova">Travis CI で iOS のライブラリを動かしたメモ | Supernova</a></li>
<li><a href="http://blog.ishkawa.org/blog/2013/04/14/travis-ci-ios/" title="iOSのライブラリにTravis CIを導入する - blog.ishkawa.org">iOSのライブラリにTravis CIを導入する &#8211; blog.ishkawa.org</a></li>
</ul>
<p><a href="https://github.com/facebook/xctool" title="facebook/xctool · GitHub">xctool</a> を使ってテストを走らせる方法がよく取られてると思います。</p>
<ul>
<li><a href="http://blog.thepete.net/blog/2013/05/07/using-travis-ci-and-xctool-to-build-and-test-ios/" title="Using Travis CI and xctool to build and test iOS apps - Being Agile">Using Travis CI and xctool to build and test iOS apps &#8211; Being Agile</a></li>
</ul>
<p>NSDate-Escort では、xctoolの設定ファイルである<a href="https://github.com/azu/NSDate-Escort/blob/master/.xctool-args" title=".xctool-args">.xctool-args</a>にテストを動かす設定を書いておき、<br />
単純に <code>xctool test</code> を実行すればテストを走るようにしてあります。</p>
<p>また、この時にプロジェクトのschemeにxctool用のschemeを追加しておくといいです。</p>
<p><img src="http://efcl.info/wp-content/uploads/2013/06/Screenshot-2013-06-12-23-16-38.jpg" alt="Screenshot 2013 06 12 23 16 38" title="Screenshot 2013-06-12 23-16-38.jpg" border="0" width="600" height="407" /></p>
<p>xctoolは <em>Find Implicit Dependencies</em> をサポートしていないため、自動でPodsのlinkしてくれないので、<br />
xctool用のschemeにはTest Bundleより前に 依存関係となるPodsを追加しておきましょう。</p>
<ul>
<li><a href="https://github.com/facebook/xctool/issues/16#issuecomment-17444311" title="ld: library not found for -lPods · Issue #16 · facebook/xctool">ld: library not found for -lPods · Issue #16 · facebook/xctool</a></li>
</ul>
<p>後は、忘れずにxctool用のschemeにはSharedにチェックを入れておきます。<br />
Sharedにチェックを入れると <code>NSDate-Escort.xcodeproj/xcshareddata/xcschemes/xctool.xcscheme</code>  という感じの場所にスキームが移動されるので、一般的な<a href="https://github.com/github/gitignore/blob/master/Objective-C.gitignore" title="Objective-C.gitignore">Objective-C.gitignore</a>を設定してるならGitで管理できる位置になると思います。</p>
<p>Schemeをちゃんと含めないとTravis CIからスキームがないといわれて <code>xctool test</code> でエラーになったりします。</p>
<p><img src="http://efcl.info/wp-content/uploads/2013/06/Screenshot-2013-06-12-23-20-59.jpg" alt="Screenshot 2013 06 12 23 20 59" title="Screenshot 2013-06-12 23-20-59.jpg" border="0" width="600" height="474" /></p>
<h3>.travis.yml</h3>
<p>Travis CIの設定は.travis.ymlファイルに書きますが、NSDate-Escortでは以下のような感じです。</p>
<ul>
<li><a href="https://github.com/azu/NSDate-Escort/blob/master/.travis.yml" title="NSDate-Escort/.travis.yml at master · azu/NSDate-Escort · GitHub">NSDate-Escort/.travis.yml at master · azu/NSDate-Escort · GitHub</a></li>
</ul>
<div class="highlight">
<pre><span class="l-Scalar-Plain">language</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">objective-c</span>
<span class="l-Scalar-Plain">before_install</span><span class="p-Indicator">:</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">sudo easy_install cpp-coveralls</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">brew update</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">brew uninstall xctool</span> <span class="c1"># xctool 0.1.4 broken</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">brew install https://raw.github.com/mxcl/homebrew/308395c2fc03399acbc24d226b8558f18e509e5b/Library/Formula/xctool.rb</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">gem update cocoapods</span>
<span class="l-Scalar-Plain">script</span><span class="p-Indicator">:</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">xctool test GCC_INSTRUMENT_PROGRAM_FLOW_ARCS=YES GCC_GENERATE_TEST_COVERAGE_FILES=YES</span>
<span class="l-Scalar-Plain">after_success</span><span class="p-Indicator">:</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">./script/coveralls.sh -r ./ -e Pods -e Tests</span>
</pre>
</div>
<p>xctool 0.1.4が壊れてる対処はそのうち要らないはず 又 gem update cocoapodsは別にいらなかったりするので最小限の場合だと以下で足りると思います。</p>
<div class="highlight">
<pre><span class="l-Scalar-Plain">language</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">objective-c</span>
<span class="l-Scalar-Plain">before_install</span><span class="p-Indicator">:</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">sudo easy_install cpp-coveralls</span>
<span class="l-Scalar-Plain">script</span><span class="p-Indicator">:</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">xctool test GCC_INSTRUMENT_PROGRAM_FLOW_ARCS=YES GCC_GENERATE_TEST_COVERAGE_FILES=YES</span>
<span class="l-Scalar-Plain">after_success</span><span class="p-Indicator">:</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">./script/coveralls.sh -r ./ -e Pods -e Tests</span>
</pre>
</div>
<p>今のTravis CIは <code>brew install xctool --HEAD</code> されたものがデフォルトで入ってるようです。。(なんでHEAD…)</p>
<p><code>before_install: after_success:</code> はCoveraills用なので、今は無視して</p>
<p>scriptで <code>xctool test</code> を実行していることがわかれば十分です。</p>
<pre><code>script:
  - xctool test
</code></pre>
<p>これで、Travis CIでテストを動かす設定ができてるので後はTravis CIにログインしてGithubのレポジトリを選ぶだけです。</p>
<p>今回は Test Targetがひとつなので、&#8221;.xctool-args&#8221;に依存したものになっていますが、複数のTarget(iOS/Macとか)をやる場合はMakefileなどを書いて xctoolに引数を渡して実行されば問題ないと思います。</p>
<p><a href="https://github.com/AFNetworking/AFNetworking/blob/master/Rakefile" title="AFNetworking/Rakefile at master · AFNetworking/AFNetworking · GitHub">AFNetworking/Rakefile at master · AFNetworking/AFNetworking · GitHub</a> ではRakefileを書いて、複数のTargetのテストを動かしています。</p>
<h2>Coverallsにコードカバレッジを渡す</h2>
<p>次に本題の <a href="https://coveralls.io/" title="Your Repositories | Coveralls - Code Coverage History and Statistics">Coveralls</a> でコードカバレッジを取る方法。</p>
<p>若干語弊があって、コードカバレッジ自体はXcodeでビルドするときに、Build Settingの <strong>Generate Test Coverage Files</strong> と <strong>Instrument Program Flow</strong> をYESにしておくと、 gcno, gcda というファイルを吐き出してくれるので、このファイルをCoverallsに渡すことでCoverallsでコードカバレッジを閲覧できるようになります。<br />
コマンドラインからこの設定を渡すには <code>xctoo test GCC_INSTRUMENT_PROGRAM_FLOW_ARCS=YES GCC_GENERATE_TEST_COVERAGE_FILES=YES</code> という感じで渡せば、プロジェクト側に設定しなくて有効に出来ます。</p>
<p>gcno, gcda から、 <code>gcov</code> コマンドで <code>.gcov</code> ファイルとして取得できるのでこれを使って、<a href="https://coveralls.io/" title="Your Repositories | Coveralls - Code Coverage History and Statistics">Coveralls</a>にコードカバレッジの結果を送るようなスクリプトを作ります。</p>
<p>まとめると</p>
<pre><code>xctool test(オプション付き) -&gt; gcno, gcdaを生成 -&gt; gcovコマンドで .gcov を生成
</code></pre>
<ul>
<li><a href="http://tech.naver.jp/blog/?p=706" title="SenTestingkitとgcovでテストカバレッジを測定してみる « NAVER Engineers' Blog">SenTestingkitとgcovでテストカバレッジを測定してみる « NAVER Engineers&#8217; Blog</a></li>
</ul>
<p>幸いにもgcovに対応したCoverallsのCLIである<a href="https://github.com/eddyxu/cpp-coveralls" title="cpp-coveralls">cpp-coveralls</a> があるので、これを利用します。(シェルスクリプトで無理やりやる方法もあるそうです <a href="http://dev.ninja.co.jp/php/pecl-coveralls" title="PHP 拡張 (PECL) の開発で Coveralls を利用してみる｜PHP｜忍者ツールズ開発ブログ">PHP 拡張 (PECL) の開発で Coveralls を利用してみる｜PHP｜忍者ツールズ開発ブログ</a>)</p>
<ul>
<li><a href="https://github.com/eddyxu/cpp-coveralls" title="eddyxu/cpp-coveralls · GitHub">eddyxu/cpp-coveralls · GitHub</a></li>
</ul>
<p>ここで先程の最小の.travis.ymlを振り返って見ると</p>
<div class="highlight">
<pre><span class="l-Scalar-Plain">language</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">objective-c</span>
<span class="l-Scalar-Plain">before_install</span><span class="p-Indicator">:</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">sudo easy_install cpp-coveralls</span>
<span class="l-Scalar-Plain">script</span><span class="p-Indicator">:</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">xctool test GCC_INSTRUMENT_PROGRAM_FLOW_ARCS=YES GCC_GENERATE_TEST_COVERAGE_FILES=YES</span>
<span class="l-Scalar-Plain">after_success</span><span class="p-Indicator">:</span>
  <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">./script/coveralls.sh -r ./ -e Pods -e Tests</span>
</pre>
</div>
<ol>
<li><strong>before_install:</strong> で <a href="https://github.com/eddyxu/cpp-coveralls" title="cpp-coveralls">cpp-coveralls</a> をインストールしています。</li>
<li><strong>script:</strong> で コードカバレッジファイルを作る設定をつけてテストを走らせます</li>
<li><strong>after_success:</strong> で コードカバレッジファイル を coveralls に送るシェルスクリプトを呼び出しています<br />
(ここでの引数は、そのまま<code>coveralls</code> コマンドに渡しています)</li>
</ol>
<p>次に、 <a href="https://github.com/azu/NSDate-Escort/blob/master/script/coveralls.sh" title="coveralls.sh">coveralls.sh</a> を見ていきます。</p>
<p>以下の事をしたかったのでシェルスクリプトじゃなくてBashスクリプトですが…</p>
<ul>
<li><a href="http://qiita.com/items/6fd4cd86ca98af644a05" title="パイプ出力を**現在のシェル**上のwhileに喰わせる上手いやり方 #Bash #ShellScript - Qiita [キータ]">パイプ出力を<strong>現在のシェル</strong>上のwhileに喰わせる上手いやり方 #Bash #ShellScript &#8211; Qiita [キータ]</a></li>
</ul>
<div class="highlight">
<pre><span class="c">#!/bin/bash</span>

trim<span class="o">()</span>
<span class="o">{</span>
    <span class="nv">trimmed</span><span class="o">=</span><span class="nv">$1</span>
    <span class="nv">trimmed</span><span class="o">=</span><span class="k">${</span><span class="nv">trimmed</span><span class="p">%% </span><span class="k">}</span>
    <span class="nv">trimmed</span><span class="o">=</span><span class="k">${</span><span class="nv">trimmed</span><span class="p">## </span><span class="k">}</span>

    <span class="nb">echo</span> <span class="nv">$trimmed</span>
<span class="o">}</span>

<span class="c"># declare BUILT_PRODUCTS_DIR CURRENT_ARCH OBJECT_FILE_DIR_normal SRCROOT OBJROOT </span>
<span class="nb">declare</span> -r <span class="nv">xctoolVars</span><span class="o">=</span><span class="k">$(</span>xctool -showBuildSettings | egrep <span class="s1">&#39;(BUILT_PRODUCTS_DIR)|(CURRENT_ARCH)|(OBJECT_FILE_DIR_normal)|(SRCROOT)|(OBJROOT)&#39;</span> |  egrep -v <span class="s1">&#39;Pods&#39;</span><span class="k">)</span>
<span class="k">while </span><span class="nb">read </span>line; <span class="k">do</span>
<span class="k">    </span><span class="nb">declare </span><span class="nv">key</span><span class="o">=</span><span class="k">$(</span><span class="nb">echo</span> <span class="s2">&quot;${line}&quot;</span> | cut -d <span class="s2">&quot;=&quot;</span> -f1<span class="k">)</span>
    <span class="nb">declare </span><span class="nv">value</span><span class="o">=</span><span class="k">$(</span><span class="nb">echo</span> <span class="s2">&quot;${line}&quot;</span> | cut -d <span class="s2">&quot;=&quot;</span> -f2<span class="k">)</span>
    <span class="nb">printf</span> -v <span class="s2">&quot;`trim ${key}`&quot;</span> <span class="s2">&quot;`trim ${value}`&quot;</span> <span class="c"># https://sites.google.com/a/tatsuo.jp/programming/Home/bash/hentai-bunpou-saisoku-masuta</span>
<span class="k">done</span> &lt; &lt;<span class="o">(</span> <span class="nb">echo</span> <span class="s2">&quot;${xctoolVars}&quot;</span> <span class="o">)</span>

<span class="nb">declare</span> -r <span class="nv">gcov_dir</span><span class="o">=</span><span class="s2">&quot;${OBJECT_FILE_DIR_normal}/${CURRENT_ARCH}/&quot;</span>

<span class="c">## ======</span>

generateGcov<span class="o">()</span>
<span class="o">{</span>
    <span class="c">#  doesn&#39;t set output dir to gcov...</span>
    <span class="nb">cd</span> <span class="s2">&quot;${gcov_dir}&quot;</span>
    <span class="k">for </span>file in <span class="k">${</span><span class="nv">gcov_dir</span><span class="k">}</span>/*.gcda
    <span class="k">do</span>
<span class="k">        </span>gcov-4.2 <span class="s2">&quot;${file}&quot;</span> -o <span class="s2">&quot;${gcov_dir}&quot;</span>
    <span class="k">done</span>
<span class="k">    </span><span class="nb">cd</span> -
<span class="o">}</span>

copyGcovToProjectDir<span class="o">()</span>
<span class="o">{</span>
    cp -r <span class="s2">&quot;${gcov_dir}&quot;</span> gcov
<span class="o">}</span>

removeGcov<span class="o">(){</span>
    rm -r gcov
<span class="o">}</span>

main<span class="o">()</span>
<span class="o">{</span>

<span class="c"># generate + copy</span>
    generateGcov
    copyGcovToProjectDir
<span class="c"># post</span>
    coveralls <span class="k">${</span><span class="p">@+</span><span class="s2">&quot;$@&quot;</span><span class="k">}</span>
<span class="c"># clean up</span>
    removeGcov  
<span class="o">}</span>

main <span class="k">${</span><span class="p">@+</span><span class="s2">&quot;$@&quot;</span><span class="k">}</span>
</pre>
</div>
<p>おおまかにやっていることは</p>
<ol>
<li>コードカバレッジファイル(gcno, gcda) がある場所を見つける</li>
<li><code>gcov-4.2</code> コマンドで .gcov ファイルを作成する</li>
<li>プロジェクトファイルの所に、 .gcov ファイル をコピーする(<a href="https://github.com/eddyxu/cpp-coveralls" title="cpp-coveralls">cpp-coveralls</a> の制約)</li>
<li><code>coveralls</code> コマンドで coveralls にコードカバレッジ情報を送信する</li>
</ol>
<p>最初に <strong>1.</strong> の コードカバレッジファイル(gcno, gcda) がある場所を見つけるために、<br />
<code>xctool -showBuildSettings</code> を利用しています。(xcodebuildにも同じようなのがあります)</p>
<p>これは、プロジェクトのBuild SettingをCLIから取得できるので、出された情報を元にコードカバレッジファイルの場所を取り出します。</p>
<p>そのまま値としては持ってなくて、恐らく <code>${OBJECT_FILE_DIR_normal}/${CURRENT_ARCH}/</code> のディレクトリに吐き出されているので、<br />
その辺を処理してるのが <code>while read line;</code> あたりでぐるぐるまわしながらとってきて <code>$gcov_dir</code> に入れています。(もっとスッキリ書きたい…)</p>
<p>gcovコマンドは <code>gcov</code> と <code>gcov-4.2</code> があると思いますが、gcov-4.2の方を使って、コードカバレッジファイルを全部 <code>.gcov</code>を作成しておきます。</p>
<ul>
<li><a href="http://d.hatena.ne.jp/ku-ma-me/20090721/p1" title="gcov の使い方 - まめめも">gcov の使い方 &#8211; まめめも</a></li>
</ul>
<p>そして、gcovファイルをコピーしてきて <strong>4.</strong> で <code>coveralls</code> コマンドを実行しています。</p>
<p>結果的には <code>coveralls -r ./ -e Pods -e Tests</code> という感じで実行されているはずです。<br />
これはrootを./にして再帰的に、コードカバレッジの対象ファイルを見つけるという感じで、<code>-e</code>で指定するのは除外ディレクトリです。</p>
<p><code>-t</code> で coveralls のトークンを指定すればローカルでも動かせます(もしくは.coveralls.ymlを置く)が、Travis CIとcoveralls連携をしておくとトークンの指定はしなくても、Travis CIで走らせれば自動的にcoverallsに送ってくれます。</p>
<p>後は、coverallsにログインして使いたいGithubのレポジトリをチェックしておけば、</p>
<pre><code>Travis CI -&gt; テスト成功 -&gt;  coveralls.sh -&gt; coverallsに送信
</code></pre>
<p>という事をやってくれて、以下のようにコードカバレッジをcoverallsで見ることができます。</p>
<ul>
<li><a href="https://coveralls.io/r/azu/NSDate-Escort?branch=master"><img src="https://coveralls.io/repos/azu/NSDate-Escort/badge.png?branch=master" alt="Coverage Status" /></a></li>
<li><a href="https://coveralls.io/r/azu/NSDate-Escort?branch=master" title="azu/NSDate-Escort | Coveralls - Code Coverage History and Statistics">azu/NSDate-Escort | Coveralls &#8211; Code Coverage History and Statistics</a></li>
</ul>
<h2>おわり</h2>
<p>これで、Travis CIでテストを走らせて、コードカバレッジをcoverallsで取る方法についての説明は終わりです。<br />
シェルスクリプトとか結構雑なので、もっと良い書き方があればPull Request送りつけるとか記事を書いてくれるといいかと思います。</p>
<p><a href="https://github.com/azu/NSDate-Escort" title="azu/NSDate-Escort · GitHub">NSDate-Escort</a> はコードカバレッジを100%にすることを目的に書き始めました。</p>
<ul>
<li><a href="https://travis-ci.org/" title="desc">Travis CI</a></li>
<li><a href="https://github.com/facebook/xctool" title="facebook/xctool · GitHub">xctool</a></li>
<li><a href="https://coveralls.io/" title="Your Repositories | Coveralls - Code Coverage History and Statistics">Coveralls</a></li>
<li><a href="https://github.com/eddyxu/cpp-coveralls" title="cpp-coveralls">cpp-coveralls</a></li>
</ul>
<h2>おまけ</h2>
<p>Travis CIやcoverallsのようにステータス画像を発行してくれるサービスが最近は多くなってます。</p>
<p><a href="https://travis-ci.org/azu/NSDate-Escort"><img src="https://travis-ci.org/azu/NSDate-Escort.png?branch=master" alt="Build Status" /></a> <a href="https://coveralls.io/r/azu/NSDate-Escort?branch=master"><img src="https://coveralls.io/repos/azu/NSDate-Escort/badge.png?branch=master" alt="Coverage Status" /></a></p>
<p>そういうサービスについて最近まとめたスライド書いてたので一緒に置いておきます。</p>
<div class="kwout" style="text-align: center;"><a href="http://azu.github.io/slide/inc/github_service/#slide1"><img src="http://kwout.com/cutout/n/ec/jm/v7g_bor_w480.jpg" alt="http://azu.github.io/slide/inc/github_service/#slide1" title="Githubでコードを公開する時に便利なサービス - いまならBadge付き -" width="480" height="379" style="border: none;" /></a>
<p style="margin-top: 10px; text-align: center;"><a href="http://azu.github.io/slide/inc/github_service/#slide1">Githubでコードを公開する時に便利なサービス &#8211; いまならBadge付き -</a></p>
</div>
<p>上記のスライドには入ってないですが、最近CocoaPodsのステータスバッジを取れる<a href="http://fjcaetano.github.io/cocoapod-badges/" title="Cocoapod Badges">Cocoapod Badges</a>というサービスもできてました。</p>
