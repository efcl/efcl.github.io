---
title: WindowsでPolipoを動かすメモ
author: azu
layout: post
permalink: /2008/0303/res90/
SBM_count:
  - '00003<>1355410405<>1<>0<>2<>0<>0'
dsq_thread_id:
  - 301890277
categories:
  - software
tags:
  - Firefox
  - ソフトウェア
  - プロクシ
---
Polipoってのはプロクシの一種でMACで三倍Web閲覧が高速になると話題になっている品物。  
Windows用のバイナリも存在するのでWinで動かし見るメモ。

今から導入しようとする人はもうちょっと待ってみた方がいいかもしれない。

PolipoはyoutubeやFlickerなどではかなり実感的に早くなるそうだ。

導入方法

*   [左式: Polipo for Windows インストールメモ][1]
*   [SimpleBoxes | Polipo &#8211; ローカルプロキシサーバ (dolipo / tolipo)][2]
*   [polipo 入れてみた on WindowsXP &#8211; 母方の祖母にフル・ネルソン日記][3](これは素の状態なので参考に)

GUI

GUIは起動、再起動、終了を管理する

*   [Ｍの生態: winpolipo ～polipoのWindows用GUIを作ってみた～][4]
*   [tolipo.exe &#8211; タスクトレイで polipo を動かす &#8211; \*scratch\*][5]

[proxy.pac ][6]はブラウザでどのサイトにPolipoを通してアクセスするかなどを制御するためのもの。

*   [polipo(dolipo)向けproxy.pac &#8211; otsune&#8217;s SnakeOil &#8211; subtech][6]

こちらのサイトの方が見やすくまとめてるので見といた方がいいかも。  
[話題のProxyソフト「polipo」ちょっとだけまとめ SmileStation][7]

Polipoはできるだけディレクトリ直下におくことを推奨。  
スペースや日本語がディレクトリにあるとアウト。  
dnsNameServerは直接決めうちした方がいいらしい。  
コマンドプロンプトから nslookup を実行すれば求められます。  
FirefoxなどはFirefoxのオプションからキャッシュを0MBにする。  
以下うちでのconfigの内容。 (よくわからないのは初期値で)

`<br />
diskCacheRoot = "/Polipo/cache/"<br />
localDocumentRoot = ""<br />
dnsUseGethostbyname = yes ;dnsNameServerを自動で<br />
``chunkHighMark = 50331648<br />
objectHighMark = 16384<br />
pmmFirstSize = 16384<br />
pmmSize = 8192<br />
`

 [1]: http://leftformula.blogspot.com/2008/03/polipo-for-windows.html
 [2]: http://serennz.sakura.ne.jp/sb/log/eid109.html
 [3]: http://d.hatena.ne.jp/tripleshot/20080228/p1
 [4]: http://mrm.seesaa.net/article/87824383.html
 [5]: http://d.hatena.ne.jp/lurdan/20080228/1204174788
 [6]: http://subtech.g.hatena.ne.jp/otsune/20080229/proxypac
 [7]: http://smilestation.blog52.fc2.com/blog-entry-165.html