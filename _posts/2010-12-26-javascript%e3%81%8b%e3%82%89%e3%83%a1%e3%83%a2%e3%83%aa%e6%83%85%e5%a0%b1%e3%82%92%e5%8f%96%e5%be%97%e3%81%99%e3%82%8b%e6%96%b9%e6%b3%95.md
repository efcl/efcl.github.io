---
title: JavaScriptからメモリ情報を取得する方法
author: azu
layout: post
permalink: /2010/1226/res2191/
SBM_count:
  - '00140<>1355445399<>134<>0<>0<>6<>0'
dsq_thread_id:
  - 300803034
categories:
  - javascript
  - userChome.js
tags:
  - chrome
  - Firefox
  - javascript
  - userChrome.js
---
JavaScriptにおいてメモリ管理は基本的にエンジン任せなのであまり意識することは無いかもしれませんが、メモリリークの調査やパフォーマンスの実験のためにメモリ情報をJavaScriptから扱いたいときがあると思います。

<!--more-->メモリリーク調査は専用のソフトウェアなどがあるので、

*   [JavaScript Memory Leak Detector (v2) &#8211; GPDE Team Blog &#8211; Site Home &#8211; MSDN Blogs][1] IE
*   [Overview &#8211; JavaScript Memory Validator][2] Firefox
*   [Debugging memory leaks &#8211; MDC Doc Center][3]

そちらを使うのでもいいかもしれませんが、new Dateを使った実行時間の記録みたいにJavaScript内からメモリ情報を取得して計測できるとおもしろいと思うので、ブラウザ毎にやる方法を調べてみました。

調べてみるとWebkit系ブラウザ(Chromeとsafari)はデバッグモード時にJavaScriptからメモリ情報を取得する方法がありました。

#### Webkit系

Chrome、safari両方ともデフォルトではメモリ情報を扱うことはできないので起動オプションを設定する必要があります。  
Chromeの場合は起動引数に&#8211;enable-memory-infoというオプションをつけることで有効になります。

<pre>* Linux: /opt/google/chrome/google-chrome --enable-memory-info
* Windows XP:  "C:Documents and Settings＜ユーザー名＞LocalSettingsApplicationDataGoogleChromeApplicationchrome.exe"  --enable-memory-info
* Windows Vista以降: "C:Users＜ユーザー名＞AppDataLocalGoogleChromeApplicationchrome.exe"  --enable-memory-info
* MacOS: /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --enable-memory-info
</pre>

safariの場合はplistの設定を変えることで同じく有効にできるそうですが、Windows版はよくわからないのとMac持ってないので確かめていません。

<div>
  <blockquote title="mrdoob/stats.js - GitHub" cite="https://github.com/mrdoob/stats.js">
    <p>
      MacOS: Open ~/Library/Preferences/com.apple.Safari.plist file for editing, and add & set enabled a boolean preference WebKitMemoryInfoEnabled (pic)
    </p>
    
    <p>
      <cite><a href="https://github.com/mrdoob/stats.js">mrdoob/stats.js &#8211; GitHub</a></cite>
    </p>
  </blockquote>
</div>

#### 使い方

上記のようにmemory-infoの機能を有効にした状態で、JavaScriptからwindow.webkitPerformance.memory.usedJSHeapSizeなどを取得するとヒープメモリの情報が返ってくるようになります。(無効の場合は常に0が返ってくるようです)  
コンソールからもwindow.webkitPerformance.memory.usedJSHeapSizeとかたたけば値が返ってくると思います。  
(console.memoryでも一応可能)

<pre>window.webkitPerformance.memory &#91;object MemoryInfo&#93;
window.webkitPerformance.memory.usedJSHeapSize
window.webkitPerformance.memory.totalJSHeapSize</pre>

使い方の例

<pre class="brush:javascript;">(function() {
    if (webkitPerformance && webkitPerformance.memory.usedJSHeapSize) {
        console.log("==Start==",
                "used : " + webkitPerformance.memory.usedJSHeapSize,
                "total : " + window.webkitPerformance.memory.totalJSHeapSize);
        var res1 = &#91;&#93;,res2 = &#91;&#93;;
        var start = webkitPerformance.memory.usedJSHeapSize;
        for (var i = 0; i &#60; 1000; i++) {
            res1&#91;i&#93; = new Date().getTime();
        }
        console.log("new Date : ", webkitPerformance.memory.usedJSHeapSize - start);
        var start2 = webkitPerformance.memory.usedJSHeapSize;
        for (var i = 0; i &#60; 1000; i++) {
            res2&#91;i&#93; = Date.now();
        }
        console.log("Date.now : ", webkitPerformance.memory.usedJSHeapSize - start2);
        console.log("==END==",
                "used : " + webkitPerformance.memory.usedJSHeapSize,
                "total : " + window.webkitPerformance.memory.totalJSHeapSize);
    }
})();</pre>

#### 歴史的背景 &#8211; 余談

上で見てるとわかりますが、memory InfoはwebkitPerformanceオブジェクト、つまりTiming APIなどが入ってるところに実装されています。しかし、[Web Performance Working Group][4]を見てもメモリ情報については書いてありません。(見つからなかった)

*   [Web Performance Working Group][4]
*   [Measuring Web Page Performance &#8211; IEBlog &#8211; Site Home &#8211; MSDN Blogs][5]
*   [IE9開発版、Web Timing APIを実装 | エンタープライズ | マイコミジャーナル][6]
*   [Chrome 6、Web Timingを実装 | エンタープライズ | マイコミジャーナル][7]

いつ実装されたのかを探すと、[[webkit-dev] On adding &#8216;console.memory&#8217; API (and about the whole &#8216;consol][8]というメーリングリストで追加されたのが告知されていました。  
このときはconsole.memoryとなっていて、webkitPerformance以下ではなくconsole以下に実装されていたようです。  
なので現在はconsole.memoryとwindow.webkitPerformance.memoryのどちらの方法でも参照できるようです。  
そして、わざわざwebkitPerformanceに移してるので、Web Timing APIの一部としてやってくのかもしれません。  
(memory Infoの話は[stats.js][9]の作者が詳しそう)

#### Firefox

Webkit系では実装として載っているのでいいのですが、Firefoxでも似たような事はできないかと探してみたところFirefoxプロセスのメモリ情報はXPCOMで取得できるようだったので、content(いわゆる普通のWebサイト内)でもその情報を扱えるようにするuserChrome.jsを書いてみました。([uc :: Add-ons for Firefox][10]などuserChromeを実行できるアドオンを入れてからインストール)  
コードは[584.js(ucjs_MemoryMonitor.uc.js) &#8211; Firefox用スクリプトアップローダー(新)][11]を参考にしました。

ただし、このスクリプトはセキュリティ的に問題ありまくりなので、通常のプロファイルで使うのはやめておいた方がいいですよ。



このuserChrome.jsをインストールした状態で、window.getMemoryInfo()とすると

<pre>{
    "mapped": mapped,
    "allocated": allocated,
    "committed": committed,
    "dirty": dirty
}</pre>

上のようなメモリ情報のオブジェクトが返ってくるようになります。おそらくこのメモリ情報はFirefoxのプロセス全体としてのものなので、**webkitPerformance.memoryとは意味が異なるため同一視してはいけない**と思います。  
恐らく**about:memory**に載っているメモリ情報と同じだと思うので、about:memoryが実装されたFirefox3.6から使えるものかもしれない。  
このスクリプトはcontent権限からChrome権限(何でもできる特権)のコードを呼んでいるので、逆を言えばこれを悪意ある方法でついてしまえばChrome権限で何でもされてしまうのでデバッグ専用のプロファイルなどで使用して、信頼できるサイト内だけで使ってください。(もっと詳しい方が安全な実装してくれればいいのですが…)

以上でJavaScriptからメモリ情報を扱う方法の紹介は終わります。  
他のブラウザor方法でもできるやり方があったら教えてください。<span style="text-decoration: line-through;"><a href="http://atnd.org/events/10497">JavaScript Advent Calendar</a> 26日目の記事でした。</span>

**gist: 754908 &#8211; メモリ情報をcontentスコープから取得できるように拡張- GitHub**
:   [https://gist.github.com/754908][12]

**mrdoob/stats.js &#8211; GitHub**
:   [https://github.com/mrdoob/stats.js][13]

 [1]: http://blogs.msdn.com/b/gpde/archive/2009/08/03/javascript-memory-leak-detector-v2.aspx
 [2]: http://www.softwareverify.com/javascript/memory/
 [3]: https://developer.mozilla.org/en/debugging_memory_leaks
 [4]: http://www.w3.org/2010/08/webperf.html
 [5]: http://blogs.msdn.com/b/ie/archive/2010/06/28/measuring-web-page-performance.aspx
 [6]: http://journal.mycom.co.jp/news/2010/07/02/034/index.html
 [7]: http://journal.mycom.co.jp/news/2010/07/30/013/index.html
 [8]: http://www.mail-archive.com/webkit-dev@lists.webkit.org/msg11479.html
 [9]: https://github.com/mrdoob/stats.js
 [10]: https://addons.mozilla.org/ja/firefox/addon/122179/
 [11]: http://loda.jp/script/?id=584
 [12]: https://gist.github.com/754908 "gist: 754908 - メモリ情報をcontentスコープから取得できるように拡張- GitHub"
 [13]: https://github.com/mrdoob/stats.js "mrdoob/stats.js - GitHub"