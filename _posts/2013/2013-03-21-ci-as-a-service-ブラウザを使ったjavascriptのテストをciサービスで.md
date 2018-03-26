---
title: CI as a Service ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ
author: azu
layout: post
permalink: /2013/0321/res3234/
dsq_thread_id:
  - 1154365226
hefo_after:
  - 0
hefo_before:
  - 0
categories:
  - javascript
  - webサービス
tags:
  - javascript
  - test
---
<h1>CI as a Service</h1>
<p><a href="https://travis-ci.org/" title="Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community">Travis CI</a>を始めとするウェブサービスとして使えるCIを使って、<br />
JavaScriptのブラウザテスト(ブラウザ上でJavaScriptを走らせて行うユニットテスト)をやる方法をサービスごとにまとめてみました。</p>
<p>テストフレームワークとして <a href="http://docs.busterjs.org/en/latest/" title="Welcome! Buster.JS is... — Buster.JS 0.7.0 documentation">Buster.JS</a> を使用して行います。</p>
<p><a href="http://karma-runner.github.com/0.8/index.html" title="Karma - Spectacular Test Runner for Javascript">Karma</a> (旧Testacular) では公式サイトにも <a href="http://karma-runner.github.com/plus/Travis-CI.html" title="Karma - Travis CI">Karma &#8211; Travis CI</a> でCI Serviceとの連携方法が記載されているのでそちらも参考にして下さい。</p>
<p>今回紹介するCI Servicesは以下のものです。</p>
<ul>
<li><a href="https://travis-ci.org/" title="Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community">Travis CI</a></li>
<li><a href="https://drone.io/" title="Hosted Continuous Integration and Deployment for your Github, Bitbucket and Google Code projects. Supports 12+ languages including Node, Scala, Dart, and Golang.">drone.io</a></li>
<li><a href="https://buildhive.cloudbees.com/" title="BuildHive: Cloud Continuous Integration">BuildHive</a></li>
<li><a href="https://jepso-ci.com/" title="JEPSO CI">Jepso CI</a></li>
</ul>
<hr />
<h2>テスト実行の流れ</h2>
<p><a href="https://jepso-ci.com/" title="JEPSO CI">Jepso CI</a> を除いては、テスト実行の流れ自体は同じなので先に解説します。</p>
<ol>
<li>Capture用のローカルサーバを立てる</li>
<li>テストしたいブラウザで <code>capture URL</code> へアクセスする</li>
<li>コマンドラインからテストを実行する</li>
<li>Captureされてるブラウザでテストを実行した結果が得られる</li>
</ol>
<p>これは<a href="http://code.google.com/p/js-test-driver/" title="JsTestDriver">JsTestDriver</a>の流れを組んでいるTest Runnerには大体共通してると思います。</p>
<p>この一連の流れをCIサービス上で実行して、Githubにpushするたびに自動でテストを行うようにするのが今回の目的です。</p>
<p>どのCIサービスも裏側ではUbuntu上で動いていて、apt-getやnpmを使ってテスト環境を事前に準備する必要があります。<br />
また、<a href="https://travis-ci.org/" title="Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community">Travis CI</a>や<a href="https://drone.io/" title="Hosted Continuous Integration and Deployment for your Github, Bitbucket and Google Code projects. Supports 12+ languages including Node, Scala, Dart, and Golang.">drone.io</a>には最初からNode.js環境なども用意されているので、<a href="https://buildhive.cloudbees.com/" title="BuildHive: Cloud Continuous Integration">BuildHive</a>に比べると事前の準備は簡潔に済みます。</p>
<h2><img src="http://www.google.com/s2/favicons?domain=travis-ci.org" alt="travis-ci.org" /> <a href="https://travis-ci.org/" title="Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community">Travis CI</a></h2>
<p>Travis CIでは<a href="http://about.travis-ci.org/docs/user/build-configuration/" title=".travis.yml">.travis.yml</a>という設定ファイルを書くことで、テスト環境を揃えることができます。</p>
<p>サンプルプロジェクトは以下においてあります。</p>
<ul>
<li><a href="https://github.com/azu/Browser_CI_as_a_Service" title="example of JavaScript Unit Test at CI Service. Contribute to Browser_CI_as_a_Service development by creating an account on GitHub.">azu/Browser_CI_as_a_Service · GitHub</a></li>
</ul>
<h3>テスト環境のセットアップ</h3>
<p>サンプルの <a href="https://github.com/azu/Browser_CI_as_a_Service/blob/master/.travis.yml" title="Browser_CI_as_a_Service / .travis.yml">Browser_CI_as_a_Service / .travis.yml</a> を見ていきます。</p>
<div class="highlight">
<pre><span class="l-Scalar-Plain">env</span><span class="p-Indicator">:</span>
<span class="p-Indicator">-</span> <span class="l-Scalar-Plain">DISPLAY=:99.0</span>
<span class="l-Scalar-Plain">before_script</span><span class="p-Indicator">:</span>
<span class="p-Indicator">-</span> <span class="l-Scalar-Plain">sh -e /etc/init.d/xvfb start</span>
<span class="p-Indicator">-</span> <span class="l-Scalar-Plain">sh .travis/scripts/setup_busterjs.sh</span>
<span class="l-Scalar-Plain">script</span><span class="p-Indicator">:</span>
<span class="p-Indicator">-</span> <span class="l-Scalar-Plain">npm test</span>
<span class="l-Scalar-Plain">language</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">node_js</span>
<span class="l-Scalar-Plain">node_js</span><span class="p-Indicator">:</span>
<span class="p-Indicator">-</span> <span class="l-Scalar-Plain">0.8</span>
</pre>
</div>
<p>Travis CIではデフォルトでNode.js(npm)、PhantomJS、Firefoxの環境が入っているため、before_scriptでインストールするものは、Buster.JSのみとなります。</p>
<p>Travis CIにデフォルトで入っているものは以下で見られます</p>
<ul>
<li><a href="https://github.com/travis-ci/travis-cookbooks" title="travis-ci/travis-cookbooks · GitHub">travis-ci/travis-cookbooks · GitHub</a></li>
</ul>
<p>.travis.yml内に <code>language: node_js</code> を記述しておくと、自動で <code>npm install</code> を実行してくれるので、<br />
レポジトリの <a href="https://github.com/azu/Browser_CI_as_a_Service/blob/master/package.json" title="Browser_CI_as_a_Service / package.json">Browser_CI_as_a_Service / package.json</a> の <code>devDependencies</code> に <a href="http://docs.busterjs.org/en/latest/" title="Welcome! Buster.JS is... — Buster.JS 0.7.0 documentation">Buster.JS</a> を追加しておきます。</p>
<div class="highlight">
<pre><span class="p">{</span>
    <span class="nt">&quot;author&quot;</span> <span class="p">:</span> <span class="s2">&quot;azu&quot;</span><span class="p">,</span>
    <span class="nt">&quot;name&quot;</span> <span class="p">:</span> <span class="s2">&quot;Browser_CI_as_a_Service&quot;</span><span class="p">,</span>
    <span class="nt">&quot;description&quot;</span> <span class="p">:</span> <span class="s2">&quot;Buster.JS with CI Service example&quot;</span><span class="p">,</span>
    <span class="nt">&quot;version&quot;</span> <span class="p">:</span> <span class="s2">&quot;0.0.1&quot;</span><span class="p">,</span>
    <span class="nt">&quot;scripts&quot;</span> <span class="p">:</span> <span class="p">{</span>
        <span class="nt">&quot;test&quot;</span> <span class="p">:</span> <span class="s2">&quot;node_modules/.bin/buster-test -r specification&quot;</span>
    <span class="p">},</span>
    <span class="nt">&quot;devDependencies&quot;</span> <span class="p">:</span> <span class="p">{</span>
        <span class="nt">&quot;buster&quot;</span> <span class="p">:</span> <span class="s2">&quot;~0.6&quot;</span>
    <span class="p">},</span>
    <span class="nt">&quot;engines&quot;</span> <span class="p">:</span> <span class="p">{</span>
        <span class="nt">&quot;node&quot;</span> <span class="p">:</span> <span class="s2">&quot;~0.8&quot;</span>
    <span class="p">}</span>
<span class="p">}</span>
</pre>
</div>
<p>これで、自動で <code>npm install</code> が実行されれば、テスト環境が揃います。</p>
<h4>テストの実行を設定</h4>
<p>.travis.yml の事前準備の部分を見ていきます</p>
<div class="highlight">
<pre><span class="l-Scalar-Plain">env</span><span class="p-Indicator">:</span>
<span class="p-Indicator">-</span> <span class="l-Scalar-Plain">DISPLAY=:99.0</span>
<span class="l-Scalar-Plain">before_script</span><span class="p-Indicator">:</span>
<span class="p-Indicator">-</span> <span class="l-Scalar-Plain">sh -e /etc/init.d/xvfb start</span>
<span class="p-Indicator">-</span> <span class="l-Scalar-Plain">sh -e .travis/scripts/setup_busterjs.sh</span>
</pre>
</div>
<p><code>before_script:</code> で実行している<a href="https://github.com/azu/Browser_CI_as_a_Service/blob/master/.travis/scripts/setup_busterjs.sh" title="setup_busterjs.sh">setup_busterjs.sh</a> は以下のような内容になってます。</p>
<div class="highlight">
<pre><span class="c">#!/bin/sh</span>

node_modules/.bin/buster-server &amp;
sleep 5
firefox http://localhost:1111/capture &amp;
sleep 5
phantomjs node_modules/buster/script/phantom.js http://localhost:1111/capture &amp;
sleep 5
<span class="k">if</span> <span class="o">[</span> -x <span class="s2">&quot;google-chrome&quot;</span> <span class="o">]</span>; <span class="k">then</span>
<span class="k">    </span>google-chrome --no-default-browser-check --no-first-run --disable-default-apps http://localhost:1111/capture &amp;
    sleep 5
<span class="k">fi</span>
</pre>
</div>
<p>ここでやっていることを簡単にまとめると、以下のとおりです。</p>
<ol>
<li>GUIテスト用にxvfbをstartする(before_script:)</li>
<li>Capture用のローカルサーバ(buster server)を立てる(setup_busterjs.sh)</li>
<li>Firefox/PhantomJSでCature URLにアクセスする(setup_busterjs.sh)</li>
</ol>
<p>詳しくは<a href="http://about.travis-ci.org/docs/user/gui-and-headless-browsers/" title="Travis CI: GUI &amp; Headless browser testing on travis-ci.org">Travis CI: GUI &amp; Headless browser testing on travis-ci.org</a>を参照してください。</p>
<p>後は、テストを実行するだけです。</p>
<p>.travis.ymlの <code>script:</code> で <code>npm test</code> を実行するようにしているので、<code>npm test</code>でBuster.JSのテストが実行されるように <code>package.json</code> に設定します。<br />
(language: node_jsが設定されるなら省略可能です)</p>
<div class="highlight">
<pre><span class="l-Scalar-Plain">script</span><span class="p-Indicator">:</span>
<span class="p-Indicator">-</span> <span class="l-Scalar-Plain">npm test</span>
</pre>
</div>
<p><code>package.json</code> に以下のように書いて、<code>npm test</code> でBuster.JSのテスト実行されるようにしました。</p>
<div class="highlight">
<pre><span class="s2">&quot;scripts&quot;</span> <span class="err">:</span> <span class="p">{</span>
        <span class="nt">&quot;test&quot;</span> <span class="p">:</span> <span class="s2">&quot;node_modules/.bin/buster-test -r specification&quot;</span>
    <span class="p">}</span>
</pre>
</div>
<h4>Travis CIの有効化</h4>
<p>最後に、Travis CIとGithubのレポジトリを連携させます。</p>
<p><a href="https://travis-ci.org/profile" title="Repositories">Repositories</a> から テストを走らせたいレポジトリを選んでONにします。</p>
<p><img title="Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community 2013-03-20 17-31-36.jpg" src="https://efcl.info/wp-content/uploads/2013/03/repogitoriesTravis-CI-Free-Hosted-Continuous-Integration-Platform-for-the-Open-Source-Community-2013-03-20-17-31-36.jpg" alt="Travis CI  Free Hosted Continuous Integration Platform for the Open Source Community 2013 03 20 17 31 36" width="600" border="0" /></p>
<p>Travis CI側で有効にすると、Github側のService Hooksが自動で有効になるので、後はGithubへPushすれば自動でCIが走るようになります。</p>
<ul>
<li><a href="https://travis-ci.org/azu/Browser_CI_as_a_Service"><img src="https://travis-ci.org/azu/Browser_CI_as_a_Service.png?branch=master" alt="Build Status" /></a></li>
<li><a href="https://github.com/azu/Browser_CI_as_a_Service" title="example of JavaScript Unit Test at CI Service. Contribute to Browser_CI_as_a_Service development by creating an account on GitHub.">azu/Browser_CI_as_a_Service · GitHub</a> の実行結果</li>
</ul>
<p>Travis CIでは<a href="https://github.com/travis-ci/travis" title="Travis CI Client">Travis CI Client</a>というCLIクライアントがあり、CLIから特定のレポジトリのCIの実行状態や手動での再実行などTravis CIで行う操作をCLI上から行うことができます。</p>
<p><a href="https://github.com/travis-ci/travis" title="Travis CI Client">Travis CI Client</a>は実行結果の取得や過去の履歴などもちゃんと見られるので結構便利です。</p>
<p>より詳しい設定方法等は以下を参照して下さい</p>
<ul>
<li><a href="http://about.travis-ci.org/docs/" title="Travis CI: Documentation">Travis CI: Documentation</a></li>
<li><a href="http://the-little-book-of-busterjs.readthedocs.org/en/latest/doc/column/TravisCI/" title="Travis CIでブラウザテスト — The little book of Buster.JS 1.0 documentation">Travis CIでブラウザテスト — The little book of Buster.JS 1.0 documentation</a></li>
<li><a href="http://karma-runner.github.com/0.8/plus/Travis-CI.html" title="Karma - Travis CI">Karma &#8211; Travis CI</a></li>
</ul>
<h2><img src="http://www.google.com/s2/favicons?domain=drone.io" alt="drone.io" /> <a href="https://drone.io/" title="Hosted Continuous Integration and Deployment for your Github, Bitbucket and Google Code projects. Supports 12+ languages including Node, Scala, Dart, and Golang.">drone.io</a></h2>
<p>次は、 <a href="https://drone.io/" title="Hosted Continuous Integration and Deployment for your Github, Bitbucket and Google Code projects. Supports 12+ languages including Node, Scala, Dart, and Golang.">drone.io</a> でのテスト環境を揃える方法についてです。</p>
<p>drone.ioではGithub/Bitbucket/Google Codeと連携できますが、今回は先ほどと同様のレポジトリを使うのでGithubの場合です。</p>
<p>また、drone.ioもNode.js環境が用意されていますが、PhantomJSとGoogle Chromeを追加でインストールして、<br />
Firefox/PhantomJS/Google Chromeの3つでテストを動かしたいと思います。</p>
<p><a href="https://drone.io/admin/plan"><img src="https://efcl.info/wp-content/uploads/2013/03/repogitoriesAdmin-azu-2013-03-20-18-43-45.jpg" alt="Admin  azu 2013 03 20 18 43 45" title="Admin  azu 2013-03-20 18-43-45.jpg" border="0" width="600" /><br />
</a></p>
<p>drone.ioもTravis CIと同様にオープンなコードなら無料で殆ど利用できるようになっています。<br />
(前月ぐらいまでは <a href="https://twitter.com/bradrydzewski/status/308817005186781185">soft limits</a>な50回/monthの制限が書いてありましたがUnlimitedになってました)</p>
<h3>テスト環境のセットアップ</h3>
<p>drone.ioはTravis CIのように設定ファイル(.travis.yml)は用意する必要なく、直接ウェブでテスト環境を準備するスクリプトを書くようになっています。</p>
<p>なので、最初にGithubのレポジトリからdrone.ioにプロジェクトを作成します。</p>
<p>まず、 New Project から Githubを選択します。</p>
<p><img src="https://efcl.info/wp-content/uploads/2013/03/repogitoriesAdd-Repo-drone.io-2013-03-20-19-08-02.jpg" alt="Add Repo  drone io 2013 03 20 19 08 02" title="Add Repo  drone.io 2013-03-20 19-08-02.jpg" border="0" width="600"/></p>
<p>レポジトリの一覧から、CIをしたいレポジトリを選択して、言語の選択ではNode.jsを選択します。<br />
(言語とかは後から変更できるので適当でも大丈夫です)</p>
<p>そうするとビルドスクリプトを書く画面になるので、テスト環境を準備していきます。</p>
<p><img src="https://efcl.info/wp-content/uploads/2013/03/drone.io-setupBuild-Setup-Browser_CI_as_a_Service-2013-03-20-19-42-58.jpg" alt="Build Setup  Browser CI as a Service 2013 03 20 19 42 58" title="Build Setup  Browser_CI_as_a_Service 2013-03-20 19-42-58.jpg" border="0" width="600" /></p>
<p>Commandsの部分にビルドスクリプトを書いていきます。</p>
<div class="highlight">
<pre>sudo start xvfb
npm -d install
sh -e .travis/scripts/install_phantomjs.sh
sh -e .travis/scripts/install_chrome.sh
<span class="c"># start buster server</span>
node_modules/.bin/buster-server &amp;
sleep 5
<span class="c"># start browsers</span>
firefox http://localhost:1111/capture &amp;
sleep 5
phantomjs node_modules/buster/script/phantom.js http://localhost:1111/capture &amp;
sleep 5
google-chrome --no-default-browser-check --no-first-run --disable-default-apps http://localhost:1111/capture &amp;
npm <span class="nb">test</span>
</pre>
</div>
<p><code>npm install</code> でBuster.JSをインストールして、<br />
PhantomJS(バイナリでインストールしたかったのでnpm経由)とGoogle Chrome(apt-getで取得してインストール)しています。</p>
<p>scriptは<a href="https://github.com/azu/Browser_CI_as_a_Service/tree/master/.travis/scripts" title="Browser_CI_as_a_Service/.travis/scripts at master · azu/Browser_CI_as_a_Service · GitHub">azu/Browser_CI_as_a_Service · GitHub</a>にまとめてあります。<br />
(<a href="https://github.com/jubianchi/travisci-helper" title="jubianchi/travisci-helper · GitHub">jubianchi/travisci-helper · GitHub</a><br />
こちらのスクリプトも参考になります)</p>
<p>後は、Travis CIと同じで<code>buster server</code>を起動して、ブラウザでCapture URLにアクセスして、<br />
<code>npm test</code> でテストを動かすという感じです。</p>
<p>Travis CIの <a href="https://github.com/azu/Browser_CI_as_a_Service/blob/master/.travis/scripts/setup_busterjs.sh" title="setup_busterjs.sh">setup_busterjs.sh</a> を実行させようと思ったのですが、なぜかテストが成功しても終了しないという感じになったので直接書いています。</p>
<p>今回紹介したビルドスクリプトは <a href="https://drone.io/github.com/azu/Browser_CI_as_a_Service/admin" title="Build Setup | Browser_CI_as_a_Service">Build Setup | Browser_CI_as_a_Service</a> から参照できます。</p>
<ul>
<li><a href="https://drone.io/github.com/azu/Browser_CI_as_a_Service/latest"><img src="https://drone.io/github.com/azu/Browser_CI_as_a_Service/status.png" alt="drone.io Build Status" /></a></li>
<li><a href="https://github.com/azu/Browser_CI_as_a_Service" title="example of JavaScript Unit Test at CI Service. Contribute to Browser_CI_as_a_Service development by creating an account on GitHub.">azu/Browser_CI_as_a_Service · GitHub</a>の実行結果</li>
</ul>
<p>drone.io はTravisCIよりスマートな感じなので、初めてCIサービスを試す場合はこちらのほうが試行錯誤しやすいかもしれません。</p>
<h2><img src="http://www.google.com/s2/favicons?domain=buildhive.cloudbees.com" alt="buildhive.cloudbees.com" /> <a href="https://buildhive.cloudbees.com/" title="BuildHive: Cloud Continuous Integration">BuildHive</a></h2>
<p>基本的にJenkinsの画面なので、人によっては馴染みやすいかもしれません。<br />
BuildHiveもdrone.ioと同じく、ウェブ上でビルドスクリプトを書いてテスト環境を揃えます。</p>
<p>デフォルトでNode.js環境がないため、そこから環境を揃えていく必要があります。<br />
ただし、Travis CIやdrone.ioと違って、一回ごとに仮想環境がリセットされないで継続する感じなので、少しセットアップ方法が変わります。</p>
<p><strong>Add Git Repository</strong> からGithubのプロジェクトを選んで有効化します。</p>
<p><img src="https://efcl.info/wp-content/uploads/2013/03/drone.io-setupBuildHive-Cloud-Continuous-Integration-2013-03-20-20-32-57.jpg" alt="BuildHive Cloud Continuous Integration 2013 03 20 20 32 57" title="BuildHive: Cloud Continuous Integration 2013-03-20 20-32-57.jpg" border="0" width="600"/></p>
<p><strong>設定</strong> を 選ぶとシェルスクリプトを書く欄が出てくるので、この部分にビルドスクリプトを書いていきます。</p>
<div class="highlight">
<pre><span class="nb">export </span><span class="nv">PATH</span><span class="o">=</span><span class="nv">$HOME</span>/.nodebrew/current/bin:<span class="nv">$PATH</span>
<span class="k">if</span> <span class="o">[</span> ! -x <span class="s2">&quot;$HOME/.nodebrew/current/bin/nodebrew&quot;</span> <span class="o">]</span>; <span class="k">then</span>
<span class="k">    </span>curl https://raw.github.com/hokaccha/nodebrew/master/nodebrew | perl - setup
    nodebrew install-binary stable
    nodebrew use stable
<span class="k">fi</span>

<span class="k">if</span> <span class="o">[</span> -e /tmp/.X1-lock  <span class="o">]</span>; <span class="k">then</span>
<span class="k">   </span>rm /tmp/.X1-lock <span class="c"># たまにロックがかかって死ぬので</span>
<span class="k">fi</span>
<span class="k">if</span> <span class="o">[</span> -z <span class="s2">&quot;$DISPLAY&quot;</span> <span class="o">]</span>; <span class="k">then</span>
<span class="k">    </span><span class="nb">export </span><span class="nv">DISPLAY</span><span class="o">=</span>:1
    Xvfb :1 &amp;
<span class="k">fi</span>
npm -d install
node_modules/.bin/buster-server &amp;
sleep 5
firefox http://localhost:1111/capture &amp;
sleep 5
node_modules/phantomjs/bin/phantomjs node_modules/buster/script/phantom.js http://localhost:1111/capture &amp;
sleep 5

npm <span class="nb">test</span>
</pre>
</div>
<p>Node.jsは<a href="https://github.com/hokaccha/nodebrew" title="nodebrew">nodebrew</a>を使ってバイナリからインストールしています。</p>
<p>後は、他のものと同じでXvfbをstartして、Capture用のローカルサーバを起動して、Capture URLにアクセスさせて、<br />
<code>npm test</code> するという感じです。</p>
<ul>
<li><a href="https://buildhive.cloudbees.com/job/azu/job/Browser_CI_as_a_Service/"><img src="https://buildhive.cloudbees.com/job/azu/job/Browser_CI_as_a_Service/badge/icon" alt="BuildHive Build Status" /></a></li>
<li><a href="https://github.com/azu/Browser_CI_as_a_Service" title="example of JavaScript Unit Test at CI Service. Contribute to Browser_CI_as_a_Service development by creating an account on GitHub.">azu/Browser_CI_as_a_Service · GitHub</a> の実行結果</li>
</ul>
<p>正直、ちゃんとした書き方がよくわからなかったので、適当な部分が多いです。<br />
(Node.jsのアップデートとかも対応したい… <a href="https://gist.github.com/azu/5204113" title="buildhive for node">buildhive for node</a>)</p>
<p>毎回リセットされない前提で書く必要があるので、どなたかがもう少し良いものを書いてくれるはず。</p>
<h2><img src="http://www.google.com/s2/favicons?domain=jepso-ci.com" alt="jepso-ci.com" /> <a href="https://jepso-ci.com/" title="JEPSO CI">Jepso CI</a></h2>
<p>最後は <a href="https://jepso-ci.com/" title="JEPSO CI">Jepso CI</a> についてです。<br />
他のCIサービスが特にJavaScriptに限定されないのに対して、Jepso CIはHTMLとJavaScriptというものに限定される作りになっているので全く別の仕組みです。</p>
<p><a href="https://saucelabs.com/docs/javascript-unit-tests-integration" title="Sauce">Sauce</a> や <a href="https://ci.testling.com/" title="testling-ci">testling-ci</a> の方に近いジャンルのCIサービスです。</p>
<p>また、まだ安定してるとは言えないので、実験的でテスト結果も安定しないのもあるため実用で使うのは諦めて下さい。<br />
(2013-03-20)</p>
<p>サンプルプロジェクトは<a href="https://github.com/azu/BusterJS_JepsoCI" title="azu/BusterJS_JepsoCI · GitHub">azu/BusterJS_JepsoCI · GitHub</a>に置いてあります。</p>
<h3>仕組み</h3>
<p>他のCIサービスとは異なる仕組みで、基本的にローカルサーバなどは使わないで、<br />
QUnitのようなテストを走らせるための静的なHTMLファイルと、そのファイルへのパスを書いた <code>.jepso-ci.json</code> という設定ファイルだけです。</p>
<p>今回のプロジェクト(<a href="https://github.com/azu/BusterJS_JepsoCI" title="azu/BusterJS_JepsoCI · GitHub">azu/BusterJS_JepsoCI · GitHub</a>)ではルートに、テストを走らせるための <code>test.html</code> をおいてるので、<br />
<code>.jepso-ci.json</code>は以下のような内容が入ります。</p>
<div class="highlight">
<pre><span class="p">{</span>
    <span class="nt">&quot;url&quot;</span><span class="p">:</span> <span class="s2">&quot;/test.html&quot;</span>
<span class="p">}</span>
</pre>
</div>
<p>次に、<a href="https://github.com/azu/BusterJS_JepsoCI/blob/master/test.html" title="BusterJS_JepsoCI / test.html">BusterJS_JepsoCI / test.html</a> を見ていきます。</p>
<p>Jepso CIのテストの成否判定は、test.html内の2つのプロパティによって判定されます。</p>
<div class="highlight">
<pre><span class="nb">window</span><span class="p">.</span><span class="nx">testsPassed</span><span class="p">;</span><span class="c1">// bool</span>
<span class="nb">window</span><span class="p">.</span><span class="nx">completedTests</span><span class="p">;</span><span class="c1">// number</span>
</pre>
</div>
<p>Buster.JSのtest runnerとなる <code>test.html</code> は以下のような感じです。</p>
<div class="highlight">
<pre><span class="cp">&lt;!DOCTYPE html PUBLIC &quot;-//W3C//DTD HTML 4.01//EN&quot;</span>
<span class="cp">        &quot;http://www.w3.org/TR/html4/strict.dtd&quot;&gt;</span>
<span class="nt">&lt;html&gt;</span>
<span class="nt">&lt;head&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">http-equiv=</span><span class="s">&quot;content-type&quot;</span> <span class="na">content=</span><span class="s">&quot;text/html; charset=utf-8&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;title&gt;</span>Buster.JS<span class="nt">&lt;/title&gt;</span>
    <span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">href=</span><span class="s">&quot;http://cdn.busterjs.org/releases/latest/buster-test.css&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;script </span><span class="na">type=</span><span class="s">&quot;text/javascript&quot;</span> <span class="na">src=</span><span class="s">&quot;http://cdn.busterjs.org/releases/latest/buster-test.js&quot;</span><span class="nt">&gt;&lt;/script&gt;</span>

    <span class="c">&lt;!-- jepso-ci --&gt;</span>
    <span class="nt">&lt;script </span><span class="na">type=</span><span class="s">&quot;text/javascript&quot;</span><span class="nt">&gt;</span>
        <span class="c1">// start test</span>
        <span class="nx">buster</span><span class="p">.</span><span class="nx">testRunner</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;suite:start&quot;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">results</span><span class="p">)</span> <span class="p">{</span>
            <span class="nb">window</span><span class="p">.</span><span class="nx">completedTests</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span>
            <span class="nb">window</span><span class="p">.</span><span class="nx">testsPassed</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span>
        <span class="p">});</span>
        <span class="c1">// each passed test</span>
        <span class="nx">buster</span><span class="p">.</span><span class="nx">assertions</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;pass&quot;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
            <span class="nb">window</span><span class="p">.</span><span class="nx">completedTests</span> <span class="o">+=</span> <span class="mi">1</span><span class="p">;</span>
        <span class="p">});</span>
        <span class="c1">// each failure test</span>
        <span class="nx">buster</span><span class="p">.</span><span class="nx">assertions</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;failure&quot;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
            <span class="nb">window</span><span class="p">.</span><span class="nx">testsPassed</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>
        <span class="p">});</span>
        <span class="c1">// finish all test</span>
        <span class="nx">buster</span><span class="p">.</span><span class="nx">testRunner</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;suite:end&quot;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">results</span><span class="p">)</span> <span class="p">{</span>
            <span class="nb">window</span><span class="p">.</span><span class="nx">testsPassed</span> <span class="o">=</span> <span class="nx">results</span><span class="p">.</span><span class="nx">ok</span><span class="p">;</span><span class="c1">// result boolean</span>
        <span class="p">});</span>
    <span class="nt">&lt;/script&gt;</span>
    <span class="c">&lt;!--test source--&gt;</span>
    <span class="nt">&lt;script </span><span class="na">src=</span><span class="s">&quot;./src/hello.js&quot;</span> <span class="na">type=</span><span class="s">&quot;text/javascript&quot;</span><span class="nt">&gt;&lt;/script&gt;</span>
    <span class="nt">&lt;script </span><span class="na">src=</span><span class="s">&quot;./tests/async-test.js&quot;</span> <span class="na">type=</span><span class="s">&quot;text/javascript&quot;</span><span class="nt">&gt;&lt;/script&gt;</span>
    <span class="nt">&lt;script </span><span class="na">src=</span><span class="s">&quot;./tests/hello-test.js&quot;</span> <span class="na">type=</span><span class="s">&quot;text/javascript&quot;</span><span class="nt">&gt;&lt;/script&gt;</span>

<span class="nt">&lt;/head&gt;</span>
<span class="nt">&lt;body&gt;</span>
<span class="nt">&lt;/body&gt;</span>
<span class="nt">&lt;/html&gt;</span>
</pre>
</div>
<p>結論をいうと、test.htmlを実行した結果 <code>window.testsPassed</code> が <code>true</code> ならテストが通った事になります。<br />
<code>window.completedTests</code> は非同期のテストがある場合に、++していくとtimeoutを伸ばしてくれるためにあるようです。</p>
<p>実際の処理内容を見ていくと、Buster.JSは <code>.on</code> で<a href="http://docs.busterjs.org/en/latest/modules/buster-assertions/#events" title="buster-assertions — Buster.JS 0.7.0 documentation">テスト実行時のイベントを設定できる</a>ので、以下のような処理をイベントに仕込んでいます。</p>
<pre><code>buster.testRunner.on("suite:start", function… はテスト開始時に初期化
buster.assertions.on("pass", function... でテストが通るたびにインクリメント
buster.assertions.on("failure", function... で一つでも失敗したらテスト失敗
buster.testRunner.on("suite:end", function... でテスト終了時にテスト結果を代入
</code></pre>
<p>後は、テストファイルを読み込ん実行するだけです。<br />
(単純に*.jsファイルをscriptタグで読み込んでる)</p>
<h3>Jepso CIとGithub連携</h3>
<p>Githubとの連携は<a href="https://help.github.com/articles/post-receive-hooks" title="Post-Receive Hooks">Post-Receive Hooks</a>の&#8221;WebHook URLs&#8221;に <code>https://jepso-ci.com/api/hook</code> と設定するだけです。</p>
<p>後は、GithubにpushすればJepso CIが動作するようになります。<br />
Jepso CIのページは <code>https://jepso-ci.com/&lt;user&gt;/&lt;repogitory&gt;</code> にアクセスすると表示されます。</p>
<ul>
<li><a href="https://jepso-ci.com/azu/BusterJS_JepsoCI"><img src="https://jepso-ci.com/azu/BusterJS_JepsoCI.svg" alt="Build Status" /></a></li>
<li><a href="https://github.com/azu/BusterJS_JepsoCI" title="A example of Buster.JS integrate with jepso-ci . Contribute to BusterJS_JepsoCI development by creating an account on GitHub.">azu/BusterJS_JepsoCI · GitHub</a> の実行結果</li>
</ul>
<p>HTMLを使ったとてもシンプルな仕組みとなっていて、<a href="https://github.com/jepso-ci/browser-logos" title="jepso-ci/browser-logos · GitHub">ビルドステータスもSVGで書かれていたりして</a>面白いサービスだと思います。</p>
<p><a href="https://github.com/jepso-ci-examples/" title="jepso-ci-examples">公式にも幾つかサンプル</a>が用意されています。</p>
<p>Jepso CIは静的なHTMLでテストを動かしてるので、以下のテンプレートも参考になるかもしれません。</p>
<ul>
<li><a href="https://efcl.info/2013/0303/res3214/" title="jsFiddleを使ってJavaScriptのテストを簡単に動かせるテンプレートサイトを作りました | Web scratch">jsFiddleを使ってJavaScriptのテストを簡単に動かせるテンプレートサイトを作りました | Web scratch</a></li>
</ul>
<p>また、<a href="https://ci.testling.com/" title="testling-ci">testling-ci</a>もHTMLをベースとしたテストができるようになったようです。(2013-03-21)</p>
<ul>
<li><a href="https://github.com/substack/testling-html-example" title="substack/testling-html-example · GitHub">substack/testling-html-example · GitHub</a></li>
</ul>
<h2>FAQ</h2>
<h3>Travis CIやBuildHiveではChromeは使えないの?</h3>
<p><a href="https://travis-ci.org/" title="Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community">Travis CI</a> がUbuntu-64bitに移行した際にChromeが<del>動かなくなっています</del>。(インストールはできます)</p>
<p><a href="https://github.com/travis-ci/travis-ci/issues/938" title="Chromium/Chrome does not work in an OpenVZ container · Issue #938 · travis-ci/travis-ci">Chromium/Chrome does not work in an OpenVZ container · Issue #938 · travis-ci/travis-ci</a> のIssueが解決するまでは使えないです。</p>
<h4><strong>追記</strong> :　Travis CIとChromeについて</h4>
<p>記事ではChromeはインストールしていませんでしたが、以下のような変更を入れることで、<br />
Travis CI上でもChromeを動作させることができます。</p>
<ul>
<li><a href="https://github.com/azu/Browser_CI_as_a_Service/commit/d7362732c2d84d13ff9e904bd976e31258359b64#L1R5" title="fix Google-Chrome for Travis CI · d736273 · azu/Browser_CI_as_a_Service">fix Google-Chrome for Travis CI · d736273 · azu/Browser_CI_as_a_Service</a>
<ul>
<li>修正したコミット</li>
</ul>
</li>
<li><a href="https://travis-ci.org/azu/Browser_CI_as_a_Service#L844" title="Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community">Travis CI &#8211; Free Hosted Continuous Integration Platform for the Open Source Community</a>
<ul>
<li>実際に動いてる様子</li>
</ul>
</li>
<li><a href="https://github.com/travis-ci/travis-ci/issues/938#issuecomment-16336000" title="Chromium/Chrome does not work in an OpenVZ container · Issue #938 · travis-ci/travis-ci">Chromium/Chrome does not work in an OpenVZ container · Issue #938 · travis-ci/travis-ci</a></li>
</ul>
<p>具体的には以下のようなことが必要になります。</p>
<ol>
<li><code>/dev/shm</code> のパーミッションを<a href="https://github.com/azu/Browser_CI_as_a_Service/commit/d7362732c2d84d13ff9e904bd976e31258359b64#L0R5">修正</a>する</li>
</ol>
<div class="highlight">
<pre>sudo chmod 1777 /dev/shm 
</pre>
</div>
<ol>
<li>Chromeの起動引数に <code>--no-sandbox</code> を<a href="https://github.com/azu/Browser_CI_as_a_Service/commit/d7362732c2d84d13ff9e904bd976e31258359b64#L2R13">つける</a></li>
</ol>
<p>こうすることで、Travis CIの仮想マシン上でもGoogleChromeを動かすことができるようになるので、<br />
Chromeでテストを実行させることが可能です。(<code>--no-sandbox</code> の副作用が何かあるかもしれませんが)</p>
<hr />
<p><a href="https://buildhive.cloudbees.com/" title="BuildHive: Cloud Continuous Integration">BuildHive</a> では <code>sudo</code> が使えなかったので、上手くインストール出来ませんでしたが、上手くやればインストールできるかもしれません</p>
<h3>もっといろんなブラウザのバージョンで試したいんだけど?</h3>
<p>今回紹介した <a href="https://travis-ci.org/" title="Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community">Travis CI</a>、<a href="https://drone.io/" title="Hosted Continuous Integration and Deployment for your Github, Bitbucket and Google Code projects. Supports 12+ languages including Node, Scala, Dart, and Golang.">drone.io</a>、<a href="https://buildhive.cloudbees.com/" title="BuildHive: Cloud Continuous Integration">BuildHive</a> はブラウザに特化した作りでは無いので、自前でバージョンごとのブラウザを用意すればできますが、負荷が大きそうなのでそういう用途は避けましょう。(また全体として成功か失敗かなのであんまりそういう用途ではない気がする)</p>
<p><a href="http://www.browserstack.com/" title="BrowserStack">BrowserStack</a> や <a href="https://ci.testling.com/" title="testling-ci">testling-ci</a> 、<a href="https://saucelabs.com/" title="Sauce Labs">Sauce Labs</a> などブラウザに特化したサービスを利用するか自前のサーバ等でやりましょう。</p>
<h3>CI Servicesの環境に何が入ってるかもっとしりたい</h3>
<p>公式サイトにサーバのスペックは書いてあると思います。</p>
<p>デフォルトに入ってるものについてはTravis CIは<a href="https://github.com/travis-ci/travis-cookbooks" title="travis-ci/travis-cookbooks · GitHub">travis-ci/travis-cookbooks · GitHub</a>を見ると大体わかります。</p>
<p><a href="https://github.com/gildegoma/travis-ci-inspector" title="gildegoma/travis-ci-inspector · GitHub">gildegoma/travis-ci-inspector · GitHub</a>のように走査して何が入ってるか調べる地道な方法も利用できます。</p>
<p>(対話側のコンソールみたいなのが欲しいですね…)</p>
<h2>Example Project</h2>
<p>今回使用したサンプルプロジェクトは以下のURLで公開しています。</p>
<ul>
<li><a href="https://github.com/azu/Browser_CI_as_a_Service" title="example of JavaScript Unit Test at CI Service. Contribute to Browser_CI_as_a_Service development by creating an account on GitHub.">azu/Browser_CI_as_a_Service · GitHub</a></li>
<li><a href="https://github.com/azu/BusterJS_JepsoCI" title="A example of Buster.JS integrate with jepso-ci . Contribute to BusterJS_JepsoCI development by creating an account on GitHub.">azu/BusterJS_JepsoCI · GitHub</a></li>
</ul>
<h2>Test Tools</h2>
<p>今回は <a href="http://docs.busterjs.org/en/latest/" title="Welcome! Buster.JS is... — Buster.JS 0.7.0 documentation">Buster.JS</a> を使用しましたが、Test Toolとしては他に以下のようなものもあります。</p>
<ul>
<li><a href="http://karma-runner.github.com/0.8/index.html" title="Karma - Spectacular Test Runner for Javascript">Karma</a> (旧:testacular)</li>
<li><a href="https://github.com/airportyh/testem" title="airportyh/testem · GitHub">testem</a></li>
<li><a href="http://visionmedia.github.com/mocha/" title="Mocha - the fun, simple, flexible JavaScript test framework">Mocha</a></li>
</ul>
<h2>Special Thanks</h2>
<ul>
<li>ようせいさん(<a href="https://twitter.com/kyo_ago/">@kyo_ago</a>)</repogitory></user></li>
</ul>
