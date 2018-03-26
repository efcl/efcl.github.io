---
title: 寿司jsでPromisesの基礎について発表してきた
author: azu
layout: post
permalink: /2014/0401/res3779/
dsq_thread_id:
  - 2564146807
categories:
  - javascript
  - イベント
tags:
  - javascript
  - Promises
  - イベント
---
<p>寿司.js でPromisesのキホンについて発表してきました。</p>
<ul>
<li><a href="http://togetter.com/li/649498" title="#寿司js - Togetterまとめ">#寿司js &#8211; Togetterまとめ</a></li>
</ul>
<hr />
<div class="kwout" style="text-align: center;"><a href="http://azu.github.io/slide/sushijs/"><img src="http://kwout.com/cutout/a/pt/sa/z8p.jpg" alt="http://azu.github.io/slide/sushijs/" title="Promises Starter" width="600" height="317" style="border: none;" /></a>
<p style="margin-top: 10px; text-align: center;"><a href="http://azu.github.io/slide/sushijs/">Promises Starter</a></p>
</div>
<p><a href="http://azu.github.io/slide/sushijs/" title="Promises Starter">Promises Starter</a>ではPromiseの基本的な部分だけなので、<code>Pormise.all</code>等実際に使うと便利的な話は入れてないです。</p>
<p>PromiseのAPIの概要、Promiseの状態の種類、基本的なresolve/rejectの流れ、XHRの例、エラーハンドリングについてがメインな感じです。</p>
<p>続きはウェブで ということで、今<a href="https://github.com/azu/Promises-book" title="azu/promises-book">azu/promises-book</a>というものを書いているので、<br />
ここが分かりにくいとかここが間違ってるとか、こういうこと書いたほうがいいとかあったらフィードバックお願いします。</p>
<p>まだ全然書き途中なのですが、書いていく内容については<a href="https://github.com/azu/promises-book/pull/1" title="[WIP] この書籍で扱う内容について by azu · Pull Request #1 · azu/promises-book">[WIP] この書籍で扱う内容について by azu · Pull Request #1 · azu/promises-book</a>や<a href="https://gitter.im/azu/promises-book" title="azu/promises-book - Gitter">azu/promises-book &#8211; Gitter</a>等で議論できればなーと思います</p>
<p><a href="https://gitter.im/azu/promises-book"><img src="https://badges.gitter.im/azu/promises-book.png" alt="Gitter chat" /></a></p>
<p>Gitterにチャットルームもあるのでそちらに適当に書き殴っていってもいいと思います。</p>
<hr />
<p>戻って寿司.jsのアウトライン</p>
<blockquote class="twitter-tweet" lang="en"><p>この雰囲気でLTするのか。。<a href="https://twitter.com/search?q=%23%E5%AF%BF%E5%8F%B8JS&amp;src=hash">#寿司JS</a> <a href="http://t.co/90D5DAx8JD">pic.twitter.com/90D5DAx8JD</a></p>
<p>&mdash; Kazuhito Hokamura (@hokaccha) <a href="https://twitter.com/hokaccha/statuses/450573522016813056">March 31, 2014</a></p></blockquote>
<p><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>
<h2><a href="http://azu.github.io/slide/sushijs/" title="Promises Starter">Promises Starter</a> &#8211; azu</h2>
<blockquote>
<p><a href="http://azu.github.io/slide/sushijs/" title="Promises Starter">Promises Starter</a>
</p></blockquote>
<p>最初に自分がPromiseについて発表しました</p>
<blockquote class="twitter-tweet" lang="en"><p>これが寿司js <a href="https://twitter.com/search?q=%23%E5%AF%BF%E5%8F%B8js&amp;src=hash">#寿司js</a> <a href="http://t.co/9Go3dzMZvL">pic.twitter.com/9Go3dzMZvL</a></p>
<p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/statuses/450578369902436352">March 31, 2014</a></p></blockquote>
<p><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>
<blockquote class="twitter-tweet" lang="en"><p>これが <a href="https://twitter.com/search?q=%23%E5%AF%BF%E5%8F%B8JS&amp;src=hash">#寿司JS</a> <a href="http://t.co/ciQbyxikB7">pic.twitter.com/ciQbyxikB7</a></p>
<p>&mdash; Kazuhito Hokamura (@hokaccha) <a href="https://twitter.com/hokaccha/statuses/450578388973916161">March 31, 2014</a></p></blockquote>
<p><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>
<hr />
<h2>git pullした時にbowerとか変更があった時にどうする問題 &#8211; yosuke_furukawa</h2>
<ul>
<li><a href="http://yosuke-furukawa.hatenablog.com/entry/2014/03/31/125131" title="git pullでファイルに変更があったら特定のコマンドを実行する。 - from scratch">git pullでファイルに変更があったら特定のコマンドを実行する。 &#8211; from scratch</a>
<ul>
<li>特定のファイルに変更があったらinstallし直す</li>
</ul>
</li>
<li>Rakeとかで何かする時は、とりあえずinstallしてからやってしまう方法
<ul>
<li>既にモジュールがあるなら何も置きないので、そこまで問題にならない</li>
</ul>
</li>
</ul>
<hr />
<h2>名古屋のLT &#8211; kyo_ago</h2>
<ul>
<li>時間制限が緩い
<ul>
<li>ドラがない</li>
<li>続きは二次会でみたいな現象</li>
</ul>
</li>
<li>Hue
<ul>
<li>WifiベースでAPIから操作出来るLED 電球</li>
<li>サムスンが似たようなのだしてきた</li>
<li>将来心配</li>
</ul>
</li>
<li>Hadoop</li>
<li>フレームワークの地域性
<ul>
<li>Knockoutは関西人気?</li>
</ul>
</li>
</ul>
<hr />
<h2>寿司で学ぶWebComponents &#8211; hokaccha</h2>
<blockquote class="twitter-tweet" lang="en"><p>これが寿司js vol.2  <a href="https://twitter.com/search?q=%23%E5%AF%BF%E5%8F%B8js&amp;src=hash">#寿司js</a> <a href="http://t.co/DAJaJUS1wL">pic.twitter.com/DAJaJUS1wL</a></p>
<p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/statuses/450593104236519425">March 31, 2014</a></p></blockquote>
<p><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>
<ul>
<li>
<p>Web Compoenentsを構成する4つの要素</p>
<ul>
<li>CustomElement</li>
<li>Templete要素</li>
<li>HTML Imports</li>
<li>Shadow DOM</li>
</ul>
</li>
<li><code>document.registerElement</code> で独自の要素を登録できる</p>
</li>
<li>CustomElement
<ul>
<li><code>document.createElement</code> した時にも定義が継承されるようにできる</li>
</ul>
</li>
<li>Shadow DOMで要素が外からアクセスできないような子要素が作れる
<ul>
<li>外のCSSの影響を受けない要素を作れる　</li>
</ul>
</li>
<li><code>&lt;x -sushi&gt;</code> のデモ</li>
</ul>
<h2><img src="https://efcl.info/wp-content/uploads/2014/04/d28b12afb435bf4eb8cac6ba0d104db1.png" alt="名称未設定 2014 04 01 00 21 01 2014 04 01 00 21 15" title="名称未設定 2014-04-01 00-21-01 2014-04-01 00-21-15.png" border="0" width="450" height="600" /></h2>
<h2>Docker による Rails Application 開発環境の構築 &#8211; y_imaya</h2>
<blockquote>
<p><a href="http://www.hast.me/hast/nHHXeoKQsMQTBuQXB" title="Hast: live presentation">Docker による Rails Application 開発環境の構築</a></p>
<p>  <a href="http://imaya.blog.jp/archives/7173473.html" title="#寿司js で Docker について雑に話してきました : document">#寿司js で Docker について雑に話してきました : document</a>
</p></blockquote>
<ul>
<li>手元の環境を汚さずに開発環境を作りたい</li>
<li>IDEとか動かせる環境</li>
<li>データダウンロードの問題をデータコンテナを使って解決</li>
<li>CentOSまわりのハマりどころ色々</li>
</ul>
<hr />
<p>大体の流れは<a href="http://togetter.com/li/649498" title="#寿司js - Togetterまとめ">#寿司js &#8211; Togetterまとめ</a>に載っています。</x></p>
