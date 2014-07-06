---
title: Greasemonkeyでサイト既存の関数を上書きする
author: azu
layout: post
permalink: /2009/1122/res1483/
aktt_notify_twitter:
  - no
SBM_count:
  - '00028<>1355445168<>24<>0<>2<>2<>0'
dsq_thread_id:
  - 300802485
categories:
  - Greasemonkey
tags:
  - Greasemonkey
  - javascript
  - twitter
  - ブックマークレット
---
サイトに新たに機能を付け加えるのではなくて、元々サイトに存在してる関数を少しだけいじってやった方が簡単な場合があります。  
そういうときにGreasemonkeyからサイトに元々ある既存関数を上書きする方法です。

**SmartLDR更新 &#8211; 素人がプログラミングを勉強するブログ**
:   [http://d.hatena.ne.jp/javascripter/20090324/1237903880][1]

ここで紹介されているlocation.hrefとjavascript:プロトコルを使ったハックを使うと比較的簡単に関数の上書きができます。  
例えばmyFuncという関数を上書きしたい場合は以下のようにjavascript:プロトコルからmyFuncを再定義すると上書きができます。

<pre class="brush:javascript;">function evalInPage(fun) {
  location.href = "javascript:void (" + fun + ")()";
}
 
evalInPage(function () {
myFunc = function(){
	上書きする内容
}
});
</pre>

location.hrefとjavascript:プロトコルを使って実行するとXPCNativeWrapperの外側でスクリプトを評価できる(Greasemonkey内の評価ではなくなる)ので、unsafeWindowを使わなくても既存の関数に触ることができます。  
逆にGreasemonkey内の評価ではなくなるので、GM_関数は使えなくなります。(感覚的にはブックマークレットを実行するのと同じ)  
これを同期的に扱いたいなら<span>JSDeferredを使って下のように組み込むといいらしい。</span>

**unsafeExec on JSDeferred &#8211; 枕を欹てて聴く**
:   [http://d.hatena.ne.jp/Constellation/20090326/1238073714][2]

<span id="text5937761445">9washのRTフォーマットを一般的なものに変更するのにこの方法を使ってみた。<br /> </span>[9wash][3]はブラウザから利用できるWeb twitterクライアントです。  
軽くて使い易いので、いいクライアントだと思いますが、RTのフォーマットが[RT:数字id @ユーザー名]みたいになっていて、使いにくかったのでその部分の関数を上書きして、よく使われているようなRT @ユーザー名:の書式に変えるようにしてみました。

*   [9wash RT format.user.js][4]

**9wash twitter clientについて**
:   [http://tw.9wash.com/about][5]

<br class="spacer_" />

 [1]: http://d.hatena.ne.jp/javascripter/20090324/1237903880 "SmartLDR更新 - 素人がプログラミングを勉強するブログ"
 [2]: http://d.hatena.ne.jp/Constellation/20090326/1238073714 "unsafeExec on JSDeferred - 枕を欹てて聴く"
 [3]: http://tw.9wash.com/about
 [4]: https://gist.github.com/5433e8b8b294215c7335
 [5]: http://tw.9wash.com/about "9wash twitter clientについて"