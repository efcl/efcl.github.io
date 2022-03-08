---
title: MessageEventコンストラクタとpostMessageとWeb messagingについて
author: azu
layout: post
permalink: /2013/1215/res3535/
dsq_thread_id:
  - 2050482141
categories:
  - javascript
tags:
  - javascript
  - messaging
---
## MessageEventって何?

`MessageEvent` というのは、server-sent events, Web sockets, cross-document messaging, channel messaging, broadcast channels などで使われてる、データをやり取りとりするときに使われてるEventの一種です。

よく見かけるのだと、 [window.postMessage][1] で渡されるeventは `MessageEvent` という型になってます。(WebWorkerとかとやりとりするときもこれですね)

`MessageEvent`型のオブジェクトは以下のようなプロパティを持ってます。

<pre>data
        データ本体(仕様ではanyとなってるので配列とかも渡せます)
    origin
        データ送信元のオリジン(targetOriginで指定されたやつ)
    lastEventId
        このメッセージイベントの ID
    source
        データ送信元の window オブジェクト
    ports
        MessagePortオブジェクトの配列
</pre>

DOMを介したりしないのでバブリングはしないですし、キャンセルはできない、又デフォルトアクションがない事が特徴です。

> また MessageEvent は DOM の Event interface を継承しているが、バブリングしない、キャンセルできない、デフォルトのアクションを持たないという特徴がある 

詳しくは [HTML5 Web Message のイントロダクション &#8211; Please Sleep][2] を見るといいです。([An Introduction to HTML5 web messaging &#8211; Dev.Opera][3])

また、今回やろうとしてる事と関係ありますが、このEventはスクリプトで作ることができるので[isTrusted][4]属性はfalseとなってます。

そのままだと信用出来ないので、利用するときは、どこからデータが来たのか*オリジン*示す `origin` (postMessageの第二引数で指定するtargetOrigin)やデータ送信元の window オブジェクトを示す `source` 等をチェックして利用します。

*   [DOM Event その10 &#8211; イベントがブラウザーによって作成されたイベントか、スクリプトによって作成されたイベントか調べる（isTrusted） &#8211; Web kledgeb][5]
*   [9 Communication — HTML Standard][6]

originとはなにかについては[Same-Origin Policy とは何なのか。 &#8211; 葉っぱ日記][7]が詳しいです。

postMessageに興味をもった場合は [第3回　localStorageとpostMessageの使いどころ（2）：フロントエンドWeb戦略室｜gihyo.jp … 技術評論社][8] 等を読むといいです。

*   [タグ一覧postMessage ｜gihyo.jp … 技術評論社][9]

逆に、DOMを関する `click` とかよく見るDOMのイベントを自分で作って発火させる場合は、[CustomEvent][10]というのが最近のブラウザではサポートされているのでこちらを利用できます。  
(FYI: [document.createEvent][11])

## MessageEventコンストラクタ

Firefox26では、 `MessageEvent` を直接作ろうとした時に

    void initMessageEvent(in DOMString aTypeArg, in boolean aCanBubbleArg, in boolean aCancelableArg, in DOMString aDataArg, in DOMString aOriginArg, in nsISupports aSourceArg);
    

という内部仕様がそのまま外に出てしまった感じのひどいAPIではなく、オブジェクトを使ったEventコンストラクタの形式で `MessageEvent` を作れるようになっています。  
(というかinitMessageEventは廃止されました)

*   [nsIWorkerMessageEvent &#8211; XPCOM インタフェースリファレンス | MDN][12]
*   [Firefox 26 for developers &#8211; Mozilla | MDN][13]

そのため、`MessageEvent` を作るときは、MessageEventコンストラクタから作ります。  
MessageEventコンストラクタとは名前の通りコンストラクタ関数なので以下のように`new`したものを、`dispatchEvent` で発火させて使います。

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">messageEvent</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">MessageEvent</span><span class="p">(</span><span class="s2">"event-name"</span><span class="p">,</span> <span class="p">{</span>
    <span class="nx">data</span><span class="o">:</span> <span class="s2">"data-data"</span><span class="p">,</span>
    <span class="nx">origin</span><span class="o">:</span> <span class="s2">"watashi-wo-trust-me"</span>
<span class="p">});</span>
<span class="nb">document</span><span class="p">.</span><span class="nx">dispatchEvent</span><span class="p">(</span><span class="nx">messageEvent</span><span class="p">);</span>
</pre>
</div>

普通のウェブサイトなら `postMessage` で大体必要な事は出来るはずなので、あえて `MessageEvent` コンストラクタで作って使うユースケースはイマイチ思いつかないですが、こういうことも出来る的な話として紹介です。

### MessageEventを作る

今回使ったテストは以下に置いてあります。  
(Firefox26以上、ChromeとWebkitも最近のはサポートされてるっぽいですがいつからかは調べてない)

[MessageEventテスト][14] にアクセスすれば実行出来ます。

*   [azu/MessageEvent-testing][15]

もう使えない `initMessageEvent` を使ってMessageEventイベントを作る場合は以下のようになりますが、これをMessageEventコンストラクタで書きなおしてみます。

<div class="highlight">
  <pre>
// これはもう使えないです！
<span class="kd">var</span> <span class="nx">messageEvent</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createEvent</span><span class="p">(</span><span class="s2">"MessageEvent"</span><span class="p">);</span>
<span class="nx">messageEvent</span><span class="p">.</span><span class="nx">initMessageEvent</span><span class="p">(</span><span class="s2">"event-name"</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span>
        <span class="s2">"data-data"</span><span class="p">,</span>
        <span class="nx">location</span><span class="p">.</span><span class="nx">protocol</span> <span class="o">+</span> <span class="s2">"//"</span> <span class="o">+</span> <span class="nx">location</span><span class="p">.</span><span class="nx">host</span><span class="p">,</span>
        <span class="s2">""</span><span class="p">,</span> <span class="nb">window</span><span class="p">);</span>
<span class="nb">document</span><span class="p">.</span><span class="nx">dispatchEvent</span><span class="p">(</span><span class="nx">messageEvent</span><span class="p">);</span>
</pre>
</div>

dipatchEventでの発火された結果を受ける側は普通に `addEventListener` で受け取る事ができます。

<div class="highlight">
  <pre><span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">"event-name"</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// event は MessageEvent型 </span>
<span class="p">});</span>
</pre>
</div>

#### MessageEventコンストラクタ版

Eventコンストラクタを使うと以下のように書けます。

<div class="highlight">
  <pre><span class="kd">var</span> <span class="nx">messageEvent</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">MessageEvent</span><span class="p">(</span><span class="s2">"event-name"</span><span class="p">,</span> <span class="p">{</span>
    <span class="nx">data</span><span class="o">:</span> <span class="s2">"data-data"</span><span class="p">,</span>
    <span class="nx">origin</span><span class="o">:</span> <span class="nx">location</span><span class="p">.</span><span class="nx">protocol</span> <span class="o">+</span> <span class="s2">"//"</span> <span class="o">+</span> <span class="nx">location</span><span class="p">.</span><span class="nx">host</span><span class="p">,</span>
    <span class="nx">source</span><span class="o">:</span> <span class="nb">window</span>
<span class="p">});</span>
<span class="nb">document</span><span class="p">.</span><span class="nx">dispatchEvent</span><span class="p">(</span><span class="nx">messageEvent</span><span class="p">);</span>
</pre>
</div>

#### postMessage版

postMessageを使った場合は以下が大体同様の内容になると思います。

<div class="highlight">
  <pre><span class="nb">window</span><span class="p">.</span><span class="nx">postMessage</span><span class="p">(</span><span class="s2">"data-data"</span><span class="p">,</span> <span class="nx">location</span><span class="p">.</span><span class="nx">protocol</span> <span class="o">+</span> <span class="s2">"//"</span> <span class="o">+</span> <span class="nx">location</span><span class="p">.</span><span class="nx">host</span><span class="p">);</span>
</pre>
</div>

自分でMessageEventを作った場合と違って、イベントの名前は決まってるので以下のように受け取ることが出来ます。

<div class="highlight">
  <pre><span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">"message"</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// event は MessageEvent型 </span>
<span class="p">},</span> <span class="kc">false</span><span class="p">);</span>
</pre>
</div>

### dispatchEventとpostMessageの違い

上記のMessageEventコンストラクタとpostMessageをみてもらうと殆ど違いがないように見えますが、テストコードである[messageevent.test.js][16]を見ると挙動が違う部分があることがわかります。

大きな違いとしてはpostMessageは非同期で発火されるのに対して、MessageEventコンストラクタ+dispatchEventは同期的に発火される点が違います。

`postMessage` は非同期で発生する中でもかなり早く発火するので、`setImmediate` 的なpolyfillに使われてたりすることがあります。

*   [非同期パフォーマンス &#8211; JavaScriptで遊ぶよ &#8211; g:javascript][17]
*   [MutationObserverを使った高速setImmediate/nextTick &#8211; 素人がプログラミングを勉強していたブログ][18]
*   [NobleJS/setImmediate][19]

それに対して、 `dispatchEvent` は同期的に行われるという感じです。

*   [[DOM4] EventTarget.dispatchEvent() is synchronous, right? from David Flanagan on 2011-09-19 (www-dom@w3.org from July to September 2011)][20]
*   [dispatchEvent(event)][21] ([dispatchEvent][22] 日本語)
*   [JavaScript Tips – dispatchEvent を使いこなそう!! | TM Life][23]
*   [EventTarget.dispatchEvent &#8211; Web API リファレンス | MDN][24]

## おわりに

最近ではFirefox26でフラグ付きですが、WebWorker同士のデータのやり取りに使えるMessageChannelが(やっと)実装されたりしたので、postMessage等を使ったWeb messagingは色々と面白い使い方ができると思います。

*   [MessageChannel &#8211; JavaScriptで遊ぶよ &#8211; g:javascript][25]
*   [JavaScript初級者から中級者になろう：十三章第四回　HTML5 Web Messaging 2][26]
*   [HTML5 / Producer-consumer-problem solved with WebWorkers | softwarechaos][27]
*   [677638 – (MessageChannel) Implement HTML5's channel messaging API][28]

こういうイベントを使ったメッセージのやり取りはブラウザの拡張を書くときによく出てくる概念(特権とコンテンツのやり取り等)だったり、ウェブアプリでも疎結合なものを考えるとこうした仕組みがどこかにでてくるような気がします。

こういうメッセージのやり取りは何かを監視して通知する用途も多そうですが、ES7で予定されてる `Object.observe()` とかと合わせると、今色んなライブラリで頑張ってやってるような事がもっとシンプルに出来るようになって面白い感じがします。

*   [Object.observe-sept2013 by Rafael Weinstein][29]
*   [Plight Of The Butterfly &#8211; Everything You Wanted To Know About Object.observe() – Addy Osmani [Video]][30]

以上、長いですが `MessageEvent` についてでした。

 [1]: https://developer.mozilla.org/ja/docs/DOM/window.postMessage "window.postMessage"
 [2]: http://please-sleep.cou929.nu/introduction-to-web-messaging.html "HTML5 Web Message のイントロダクション - Please Sleep"
 [3]: http://dev.opera.com/articles/view/window-postmessage-messagechannel/ "An Introduction to HTML5 web messaging - Dev.Opera"
 [4]: http://www.whatwg.org/specs/web-apps/current-work/multipage/infrastructure.html#dom-event-istrusted "isTrusted "
 [5]: http://webkledgeb.blogspot.jp/2013/09/dom-event-10-istrusted.html "DOM Event その10 - イベントがブラウザーによって作成されたイベントか、スクリプトによって作成されたイベントか調べる（isTrusted） - Web kledgeb"
 [6]: http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html "9 Communication — HTML Standard"
 [7]: http://d.hatena.ne.jp/hasegawayosuke/20130330/p1 "Same-Origin Policy とは何なのか。 - 葉っぱ日記"
 [8]: http://gihyo.jp/dev/serial/01/front-end_web/000302?page=1 "第3回　localStorageとpostMessageの使いどころ（2）：フロントエンドWeb戦略室｜gihyo.jp … 技術評論社"
 [9]: http://gihyo.jp/tagList/postMessage "タグ一覧postMessage ｜gihyo.jp … 技術評論社"
 [10]: https://developer.mozilla.org/ja/docs/Web/API/CustomEvent "CustomEvent"
 [11]: https://developer.mozilla.org/ja/docs/DOM/document.createEvent "document.createEvent"
 [12]: https://developer.mozilla.org/ja/docs/XPCOM_Interface_Reference/NsIWorkerMessageEvent#initMessageEvent() "nsIWorkerMessageEvent - XPCOM インタフェースリファレンス | MDN"
 [13]: https://developer.mozilla.org/ja/docs/Mozilla/Firefox/Releases/26 "Firefox 26 for developers - Mozilla | MDN"
 [14]: https://azu.github.io//MessageEvent-testing/test/ "Mocha Spec Runner"
 [15]: https://github.com/azu/MessageEvent-testing "azu/MessageEvent-testing"
 [16]: https://github.com/azu/MessageEvent-testing/blob/gh-pages/test/spec/messageevent.test.js "messageevent.test.js"
 [17]: http://javascript.g.hatena.ne.jp/edvakf/20100227/1267246371 "非同期パフォーマンス - JavaScriptで遊ぶよ - g:javascript"
 [18]: http://javascripter.hatenablog.com/entry/2013/10/24/MutationObserver%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F%E9%AB%98%E9%80%9FsetImmediate/nextTick "MutationObserverを使った高速setImmediate/nextTick - 素人がプログラミングを勉強していたブログ"
 [19]: https://github.com/NobleJS/setImmediate "NobleJS/setImmediate"
 [20]: http://lists.w3.org/Archives/Public/www-dom/2011JulSep/0230.html "[DOM4] EventTarget.dispatchEvent() is synchronous, right? from David Flanagan on 2011-09-19 (www-dom@w3.org from July to September 2011)"
 [21]: http://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent "dispatchEvent(event)"
 [22]: http://www.hcn.zaq.ne.jp/___/WEB/DOM4-ja.html#dom-EventTarget-dispatchEvent "dispatchEvent"
 [23]: http://tmlife.net/programming/javascript/javascript-tips-dispatchevent.html "JavaScript Tips – dispatchEvent を使いこなそう!! | TM Life"
 [24]: https://developer.mozilla.org/ja/docs/Web/API/EventTarget.dispatchEvent "EventTarget.dispatchEvent - Web API リファレンス | MDN"
 [25]: http://javascript.g.hatena.ne.jp/edvakf/20100109/1263070731 "MessageChannel - JavaScriptで遊ぶよ - g:javascript"
 [26]: http://uhyohyohyo.sakura.ne.jp/javascript/13_4.html "JavaScript初級者から中級者になろう：十三章第四回　HTML5 Web Messaging 2"
 [27]: http://softwarechaos.wordpress.com/2013/03/10/html5-producer-consumer-problem-solved-with-webworkers/ "HTML5 / Producer-consumer-problem solved with WebWorkers | softwarechaos"
 [28]: https://bugzilla.mozilla.org/show_bug.cgi?id=677638 "677638 – (MessageChannel) Implement HTML5's channel messaging API"
 [29]: http://slid.es/rafaelweinstein/object-observe-sept2013 "Object.observe-sept2013 by Rafael Weinstein"
 [30]: http://2013.jsconf.eu/speakers/addy-osmani-plight-of-the-butterfly-everything-you-wanted-to-know-about-objectobserve.html "Plight Of The Butterfly - Everything You Wanted To Know About Object.observe() – Addy Osmani [Video]"