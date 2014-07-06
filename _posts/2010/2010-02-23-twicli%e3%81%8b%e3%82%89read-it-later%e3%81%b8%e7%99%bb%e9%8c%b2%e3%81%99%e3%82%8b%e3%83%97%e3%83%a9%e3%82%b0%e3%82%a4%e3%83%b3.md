---
title: twicliからRead It Laterへ登録するプラグイン
author: azu
layout: post
permalink: /2010/0223/res1577/
SBM_count:
  - '00002<>1355430971<>2<>0<>0<>0<>0'
dsq_thread_id:
  - 301988607
categories:
  - javascript
tags:
  - API
  - javascript
  - twitter
  - プラグイン
---
[twicli][1]はブラウザで動くTwitterWebクライアントで、JavaScriptでプラグインを書くことで拡張することができます。  
今回はtwicliから特定のポストに貼られているリンクを[Read It Later][2]へ登録するプラグインを書きました。

### 必要なもの

*   [Read It Later][2]のアカウントとパス

### 使用方法

[<img class="aligncenter size-medium wp-image-1579" title="sshot-2010-02-23-1" src="http://efcl.info/wp-content/uploads/2010/02/sshot-2010-02-23-1-259x300.png" alt="" width="259" height="300" />][3]

![][4]

<pre>http://efcl.info/lab/twicli/ReadItLator.js</pre>

をtwicliの+にあるPluginsに書き足す事で上のプラグインを読み込む。  
プラグインを読み込むために一度ページをリロードしてら、+のPluginの下に▼Read It Latorというのができるので、  
Read It Laterのユーザー名とパスワードを記入する。

[<img class="aligncenter size-medium wp-image-1580" title="sshot-2010-02-23-2" src="http://efcl.info/wp-content/uploads/2010/02/sshot-2010-02-23-2-300x257.png" alt="" width="300" height="257" />][5]そして各ポストの▼を押すとRead It Laterが追加されているので、登録したいリンクがあるポストで実行する。  
(リンクがないポストを選択した時はそのポストのURLが登録されます。)

雑記

API KEYが必要なので自分のをいれていますが、回数制限とかあるらしい。  
ソース自体もサーバが貧弱なので別のところに置きたい。  
([Read It Later API][6]は簡単に取得できます。)

**twicli &#8211; A Web Browser-Based Lightweight Twitter Client**
:   [http://www.geocities.jp/twicli/index.html][7]

 [1]: http://www.geocities.jp/twicli/index.html
 [2]: http://readitlaterlist.com/
 [3]: http://efcl.info/wp-content/uploads/2010/02/sshot-2010-02-23-1.png
 [4]: file:///C:/Users/azu/AppData/Local/Temp/moz-screenshot.png
 [5]: http://efcl.info/wp-content/uploads/2010/02/sshot-2010-02-23-2.png
 [6]: http://readitlaterlist.com/api/
 [7]: http://www.geocities.jp/twicli/index.html "twicli - A Web Browser-Based Lightweight Twitter Client"