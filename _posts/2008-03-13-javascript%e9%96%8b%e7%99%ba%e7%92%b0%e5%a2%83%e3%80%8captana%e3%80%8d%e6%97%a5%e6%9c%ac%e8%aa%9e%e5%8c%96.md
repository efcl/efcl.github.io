---
title: JavaScript開発環境「Aptana」日本語化
author: azu
layout: post
permalink: /2008/0313/res102/
SBM_count:
  - '00005<>1355388510<>1<>1<>1<>2<>0'
dsq_thread_id:
  - 300801492
categories:
  - software
tags:
  - javascript
  - ソフトウェア
  - 日本語化
  - 開発環境
---
タイトルがなんか堅くなってしまいましたが、JavaScript開発環境である「[Aptana][1]」を標準で日本語化されてなかった気がするので**日本語化**のメモ

Eclipseのプラグイン？っぽいですが、単体で導入できるので便利です。  
JavaScript以外に使えるので便利です。コード補完がかなりいい。  
起動が遅いのが欠点。

**日本語化の手順**

*   <span class="commentbody">Aptana Stadioをインストールする。</span>
*   <span class="commentbody"></span>[3.2.1 LanguagePackページへ][2]
*   一番上の左側の項目「NLpack1-eclipse-SDK-3.2.1-win32.zip」をダウンロードします。
*   解凍後、「features」と「plugins」のフォルダがでるので、それをProgram file内の「Aptana Stadio」のフォルダに上書きします。<span class="commentbody"></span>
*   <span class="commentbody">起動後、日本語化されてれば成功です。</span>

そのうち標準で日本語に対応してそうな気がするけど。

多分、デフォルトだと

<pre id="line1"><span class="attribute-value"></span><span class="attribute-name">content</span>=<span class="attribute-value">"text/html; charset=</span></pre>

がUTF-8になっていないので文字化けするかと思います。  
オプションのエディッター(もしくはエディターの右下のアイコンから)の各テンプレートを直しておくといいと思います。  
微妙に関係ないけどついでに

[こせきの技術日記][3]でJavaScriptのリファレンスが公開されていました。  
(この記事はこっちが主だったりするw)

 [1]: http://www.aptana.com/
 [2]: http://download.eclipse.org/eclipse/downloads/drops/L-3.2_Language_Packs-200607121700/index.php
 [3]: http://d.hatena.ne.jp/koseki2/