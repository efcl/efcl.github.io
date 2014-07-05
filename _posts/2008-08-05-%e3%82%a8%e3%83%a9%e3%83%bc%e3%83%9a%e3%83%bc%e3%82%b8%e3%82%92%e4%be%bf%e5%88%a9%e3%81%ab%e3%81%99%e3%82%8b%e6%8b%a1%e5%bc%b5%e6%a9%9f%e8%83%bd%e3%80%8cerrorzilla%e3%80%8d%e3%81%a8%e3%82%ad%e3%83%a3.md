---
title: エラーページを便利にする拡張機能「ErrorZilla」とキャッシュページを探す「Resurrect Pages」
author: azu
layout: post
permalink: /2008/0805/res299/
SBM_count:
  - '00002<>1355425028<>1<>0<>0<>1<>0'
dsq_thread_id:
  - 300801979
categories:
  - アドオン
tags:
  - アドオン
  - エラー
  - キャッシュ
  - 拡張機能
  - 検索
---
Webを巡っていると404などのエラーページに遭遇することがあります。  
そこで、利用者はどうするかというとあきらめてまた後でくるか、グーグルのキャッシュを覗くなどのWebサービスを利用した閲覧をためしてみたりする。

そういうWebサービスへのアクセスを助けてくれるアドオンとして「ErrorZilla」があります。  
このアドオンは何かと派生が多いので、自分に合ったものを使えばいいかと。  
本家[ErrorZilla][1]は更新していないので、

*   [ErrorZilla Mod][2]
*   [CrendKing][3]

辺りが候補になる。[CrendKing][3]は[ErrorZilla Mod][2]をベースにしていてプロクシを通してのアクセスが容易にできるように改良されています。

後はほぼ同一の機能で  
- Google Cache (view the page cached by Google)  
- Coralize (use Coral CDN proxy to connect again)  
- Wayback (view an earlier version of this page)  
- Ping (use a server to ping the target server)  
- Trace (trace the network route from you to the server)  
- Whois (look up who owns the website)

それぞれへのリンクがエラーページ上で表示されます。  
背景画像をlolifoxにした[lolifox-ErrorZilla][4]なんてのもあります。

また同様にキャッシュへのアクセスを助けてくれる[Resurrect Pages][5]というアドオンも紹介。  
[Resurrect Pages][5]は主に検索エンジンのキャッシュページへのアクセスをナビゲーションバー上のボタンもしくは右クリックから行うことができる。

o CoralCDN  
o Google Cache  
o Yahoo! Cache  
o The Internet Archive  
o MSN Cache  
o Gigablast  
o WebCite

主に海外の検索エンジンが使われています。

 [1]: http://roachfiend.com/archives/2006/08/28/errorzilla-useful-error-pages-for-firefox/
 [2]: https://addons.mozilla.org/ja/firefox/addon/3336
 [3]: https://addons.mozilla.org/ja/firefox/addon/5398
 [4]: https://addons.mozilla.org/ja/firefox/addon/4084
 [5]: https://addons.mozilla.org/en-US/firefox/addon/2570