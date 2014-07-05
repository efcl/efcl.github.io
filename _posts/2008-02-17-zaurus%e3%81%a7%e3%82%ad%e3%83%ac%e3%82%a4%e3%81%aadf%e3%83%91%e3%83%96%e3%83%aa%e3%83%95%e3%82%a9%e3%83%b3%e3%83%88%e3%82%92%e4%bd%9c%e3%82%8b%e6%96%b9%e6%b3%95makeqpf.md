---
title: zaurusでキレイなDFパブリフォントを作る方法(makeqpf)
author: azu
layout: post
permalink: /2008/0217/res71/
SBM_count:
  - '00001<>1355432949<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 302475002
categories:
  - zaurus
tags:
  - zaurus
  - ザウルス
  - ソフトウェア
---
文庫ビューアーなどで使える(というかそのためのフォント)DFパブリフォントを生成する方法。  
ビットマップ版はザウルス向けに配布されていますがアンチエイリアスがかかっていないので、アンチエイリアスがかかったフォントを  
作る方法です。

wibdows向けのDFパブリフォントを [電子文庫パブリ][1]からダウンロードしてくると、拡張子が.ttcなので  
makeqpfというコマンドだとttfしか扱えないので、[BREAKTTC.EXE][2]というソフトで分解します。  
font0～2までに分解されて、0を使うのがいいと思う。(１はよく分からない、2はプロポーショナルフォント)

[makeqpf-arm.zip][3]をダウンロードしてきて、使い方は [Zaurusの綺麗なフォント makeqpfのarm版][4]  
を読んでもらうとだいたい分かる。  
(exportのところをとばすとエラーしたりするかも。)

<span style="background: #c0c0f0 none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">myfont sourcefont.ttf FT n 50 200 su</span>

フォントの大きさは200（20px）にした方がいいかな。それ以上だとかすれたりする。

参考までにDFパブリフォント20pxを返還したものの大きさは3.288KBになった。(なんかいじったりすると容量がすくなって変になる。）

参考URL  
[Zaurusの綺麗なフォント makeqpfのarm版][4]  
[[Zaurus]フォントの覚え書き（１）][5]

 [1]: http://www.paburi.com/paburi/tools.asp
 [2]: http://www.xlsoft.com/jp/products/indigorose/autoplay_readme_02.html
 [3]: http://www.handhelds.org/%7Egints/?C=M;O=A
 [4]: http://touasa.cocolog-nifty.com/wannazau/2006/03/zaurus_makeqpfa_1601.html
 [5]: http://www.taiwanweb.net/blog/2008/01/12/zaurus%e3%83%95%e3%82%a9%e3%83%b3%e3%83%88%e3%81%ae%e8%a6%9a%e3%81%88%e6%9b%b8%e3%81%8d%ef%bc%88%ef%bc%91%ef%bc%89/