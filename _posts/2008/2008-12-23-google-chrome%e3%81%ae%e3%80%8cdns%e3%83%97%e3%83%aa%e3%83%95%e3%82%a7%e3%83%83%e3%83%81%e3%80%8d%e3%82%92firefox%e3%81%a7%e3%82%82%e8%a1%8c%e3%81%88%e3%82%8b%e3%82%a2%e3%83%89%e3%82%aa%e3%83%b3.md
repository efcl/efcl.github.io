---
title: Google Chromeの「DNSプリフェッチ」をFirefoxでも行えるアドオン「DNS Prefetch」
author: azu
layout: post
permalink: /2008/1223/res405/
SBM_count:
  - '00003<>1355429260<>3<>0<>0<>0<>0'
dsq_thread_id:
  - 301552390
categories:
  - Firefox
tags:
  - Firefox
  - アドオン
---
[「DNSプリフェッチ」][1]はリンクをクリックする前に外部リンク先のDNSに問い合わせを行って、ドメインネームを解決するので、  
リンクをクリックしたときに待たされないという機能のことです。

Google Chromeはいろんな場面でこれを行い反応の早さを上げているようです。

<div class="quote">
  <blockquote title="Chromeはなぜ速いのか － ＠IT" cite="http://www.atmarkit.co.jp/news/analysis/200812/22/chrome.html">
    <p>
      DNSプリフェッチは、表示されているページ中のリンクだけでなく、起動時のスタートページに関しても行うほか、ユーザーがURLや検索文字列をタイプしている最中でも行っているという。サジェスト機能でどこかのWebページを提示した場合にもプリフェッチをしているという。ユーザーがリターンキーを押すよりも先に、すでにWebブラウザはユーザーが次に訪れそうなドメインのIPアドレスを取得済みというわけだ。
    </p>
  </blockquote>
</div>

[Chromeはなぜ速いのか － ＠IT][1]  
Firefoxでも[DNS Prefetch][2]というアドオンで似たような事が行えます。  
先読みを行うのはDNSのみで、リンク先サーバーへはアクセスしないので、  
どっかのアドオンと違って、リンク先ページの内容は一切先読みしません。  
アドオンは[Bug 453403 &#8211; add DNS pre-fetching to Necko and Firefox][3]というバグがあるので、  
あくまでも実験的なアドオンで有ることを理解してから使いましょう。  
また特定の環境でも発生するバグがあるので、体験したい人だけ使うべき。  
[Firefox用Extension DNS PrefetchComments][4]

**DNS Prefetch**
<dd style="text-align: left;">
  <a href="https://addons.mozilla.org/ja/firefox/addon/8923">https://addons.mozilla.org/ja/firefox/addon/8923</a>
</dd>

 [1]: http://www.atmarkit.co.jp/news/analysis/200812/22/chrome.html
 [2]: https://addons.mozilla.org/ja/firefox/addon/8923
 [3]: https://bugzilla.mozilla.org/show_bug.cgi?id=453403
 [4]: http://sabakan.jpn.ph/adiary/01158