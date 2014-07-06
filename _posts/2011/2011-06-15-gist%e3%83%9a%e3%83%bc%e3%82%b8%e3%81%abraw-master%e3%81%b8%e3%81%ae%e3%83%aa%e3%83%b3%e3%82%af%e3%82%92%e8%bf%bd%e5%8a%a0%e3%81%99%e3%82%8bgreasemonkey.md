---
title: gistページにraw masterへのリンクを追加するGreasemonkey
author: azu
layout: post
permalink: /2011/0615/res2874/
dsq_thread_id:
  - 332068268
SBM_count:
  - '00003<>1355378508<>2<>0<>1<>0<>0'
categories:
  - Greasemonkey
tags:
  - gist
  - Git
  - Greasemonkey
  - URL
---
gistに置いたファイルの最新版を常に参照するraw masterなURLが最近変更されたり、昔使えた方法が使えなくなっています。

詳細は以下を参考に

*   [Gist の raw ファイルの URL が変わった: 「わ」の日記もどき][1] 
以前はURLに.txtとつければよかったので、特に何もしなくても不便はしなかったのですが、2011年6月15日現在はraw masterなURLへのURLにするにはちょっと書き換える量が多いのでGreasemonkeyを書きました。

gistのページのファイル名の横にraw master URLへのリンクを追加するGreasemonkeyです。   
Scriptishの場合は、リンクをクリックするだけでクリップボードにURLをコピーします。

`<a href="http://efcl.info/wp-content/uploads/2011/06/2011-06-14-ss1.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="2011-06-14-ss1" border="0" alt="2011-06-14-ss1" src="http://efcl.info/wp-content/uploads/2011/06/2011-06-14-ss1_thumb.png" width="240" height="209" /></a>`

*   [gist: raw master URL for Greasemonkey][2] 
この仕様変更により、Greasemonkeyで.txtでrequireしてたりするスクリプトは新しくインストールすると死んでいると思うので確認が必要になるかもしれません。

 [1]: http://wa.cocolog-enshu.com/pseudodiary/2011/06/gist-raw-url-72.html
 [2]: http://userscripts.org/scripts/show/104764