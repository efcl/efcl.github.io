---
title: jsFiddleを使ってJavaScriptのテストを簡単に動かせるテンプレートサイトを作りました
author: azu
layout: post
permalink: /2013/0303/res3214/
dsq_thread_id:
  - 1114222021
categories:
  - javascript
tags:
  - javascript
  - test
  - webservice
---
[<img title="JavaScript Test Fiddle Template.png" alt="JavaScript Test Fiddle Template" src="https://efcl.info/wp-content/uploads/2013/03/Buster-StaticJavaScript-Test-Fiddle-Template.png" width="301" height="320" border="0" />][1]

[JavaScript Test Fiddle Template][1] という[JSFiddle][2]で使える[QUnit][3]/[Jasmine][4]/[Mocha][5]/[Buster.JS][6]などを動かすテンプレートを作りました。

使い方は単純で、

1.  [JavaScript Test Fiddle][1]で好きなテスティングフレームワークを選ぶ(なかったら[Pull Requst][7])
2.  [JSFiddle][2]がテストのセットアップが入った状態で開かれるので、テストを書く  
    <img title="Edit this Fiddle - jsFiddle 2013-03-03 02-53-02.jpg" alt="Edit this Fiddle  jsFiddle 2013 03 03 02 53 02" src="https://efcl.info/wp-content/uploads/2013/03/Buster-StaticEdit-this-Fiddle-jsFiddle-2013-03-03-02-53-02.jpg" width="600" height="342" border="0" />
3.  &#8220;Save&#8221; ボタンを押して保存  
    <img title="Edit this Fiddle - jsFiddle 2013-03-03 02-53-56.jpg" alt="Edit this Fiddle  jsFiddle 2013 03 03 02 53 56" src="https://efcl.info/wp-content/uploads/2013/03/Buster-StaticEdit-this-Fiddle-jsFiddle-2013-03-03-02-53-56.jpg" width="345" height="43" border="0" />

後は、自由にShareするなどして使えます。

jsFiddleのショートカットや使い方については [jsFiddleをとことん楽しむために知っておくと良い15の事 | ゆっくりと…][8] が詳しいです。  
画面左隅にもショートカットのチートシートがあります。

*   [jsFiddleをとことん楽しむために知っておくと良い15の事 | ゆっくりと…][8]
*   [jsFiddle Documentation — jsFiddle 0.5a2 documentation][9]

jsFiddleの[POST API][10]を使った単純なHTMLだけのGithub pagesで動いてる静的なサイトです。  
[jsPerf][11]のテスト版みたいな他の人が実行した結果も残るようなサイトがあるともっとよさそうですね。

*   [azu/js-test-fiddle · GitHub][12] Githubにソース置いてあります。
*   [JavaScript Test Fiddle Template][1]

**Enjoy testing!**

追記: 他に書いてるところがなかったので、スマートフォンなど実行させてremote debuggingする方法について.

jsFiddleにログインしておくと、実験的な機能として[Debugging remote resources][13]というものが利用できます。  
<a class="reference external" href="http://pmuellr.github.com/weinre/">weinre</a>のサービスを使ったものなので、デバッガーを開く側はWebkit系のブラウザなどが必要です。

jsFiddleにログインする、Runの隣にdebug on mobileというボタンが表示されるので実行すると、  
短いURLが表示されるので、デバッグ対象(モバイル端末など)でそのURLにアクセスします。

<img title="Edit this Fiddle - jsFiddle 2013-03-03 13-48-06.jpg" alt="Edit this Fiddle  jsFiddle 2013 03 03 13 48 06" src="https://efcl.info/wp-content/uploads/2013/03/Buster-StaticEdit-this-Fiddle-jsFiddle-2013-03-03-13-48-06.jpg" width="700" height="305" />

Chrome等のブラウザ でdebuggerとなってるリンクを開くと、  
デバッグ対象が開いてるページをデバッグできるコンソールが開かれます。

<img title="Edit this Fiddle - jsFiddle 2013-03-03 13-53-15.jpg" alt="Edit this Fiddle  jsFiddle 2013 03 03 13 53 15" src="https://efcl.info/wp-content/uploads/2013/03/Buster-StaticEdit-this-Fiddle-jsFiddle-2013-03-03-13-53-15.jpg" width="585" height="565" border="0" />

Sourceパネルが無いのでJavaScriptのデバッグでできることは限られてますが、簡単にremote debugできるので便利です。

 [1]: http://azu.github.io/js-test-fiddle/
 [2]: http://jsfiddle.net/ "jsFiddle"
 [3]: http://qunitjs.com/
 [4]: http://pivotal.github.com/jasmine/
 [5]: http://visionmedia.github.com/mocha/
 [6]: http://busterjs.org/
 [7]: https://github.com/azu/js-test-fiddle/pulls
 [8]: http://tokkono.cute.coocan.jp/blog/slow/index.php/xhtmlcss/fun-with-jsfiddle/
 [9]: http://doc.jsfiddle.net/index.html
 [10]: http://doc.jsfiddle.net/api/post.html "POST"
 [11]: http://jsperf.com/
 [12]: https://github.com/azu/js-test-fiddle
 [13]: http://doc.jsfiddle.net/use/remote_debugging.html
