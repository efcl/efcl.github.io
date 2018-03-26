---
title: Greasemonkeyでページ内の画像をポップアップ表示させる(5種類)
author: azu
layout: post
permalink: /2008/0222/res77/
SBM_count:
  - '00010<>1355431343<>5<>2<>1<>2<>0'
dsq_thread_id:
  - 301021499
categories:
  - Firefox
  - Greasemonkey
tags:
  - Firefox
  - Greasemonkey
  - ポップアップ
---
Greased Lightbox &#8211; shifting pixel  
<http://shiftingpixel.com/lightbox>  
GreasedLightbox.user.js  
<http://shiftingpixel.com/downloads/greasedlightbox.user.js>  
画像をクリックすることで [Lightbox][1]のようにポップアップ表示します。

+ で拡大、- で縮小(Enterで元のサイズに戻る)  
← →で画像移動  
0(ゼロ)で最大化  
x、Escキーや他のところをクリックするとで中止

右上のボタンからスライドショーもできるという優れものw  
ソースのslideTime : 4,をいじることで時間も変えられます。(キャッシュを削除する？)  
多分この手の画像ポップアップでは一番の高機能だと思います。

テストするにはグーグルが一番→ [Google Image Search][2].

*   #### [Image Link Tooltip – Userscripts.org][3]

[Image Link Tooltip v0.5][4]

画像リンクの上にカーソルをのせると自動で読み込むタイプ。  
LightBoxのような表示をする。  
画像をクリックすることで元に戻る。

*   #### [Greasemonkey scripts][5]

[Image links inline viewer][5]

画像リンクの上にカーソルをのせると自動で読み込むタイプ。  
カーソルの下に左ぴったりに表示される。  
カーソルを画像からどかすと勝手に消えるので、流して見るのには向いてるかも。

<span class="keyword"><strong style="color: black; background-color: #a0ffff">画像のURLを展開するgreasemonkeyComments</strong></span>

作者さんがページを閉じてしまったのでそのまま転載。

> showimageurl.user.js画像のURLを展開するgreasemonkeyを書いてみたよ  
> 画像を見るのにいちいちリンクをクリックするのはメンドイという  
> メンドクさがりやな人は使うといいよ  
> 絵師さんのサイトを巡回するときに楽だよ  
> 初期設定ではtumblr.com上でしか実行しないので  
> @includeに実行したいサイトを追加して使ってね

ページ内にリンク先の画像を展開する greasemonkeyスクリプト。  
ページのデザインが崩れることがあるので場所を選んで使うべき。  
[showimageurl.user.js ][6]

*   #### [LinkThumb][7]

画像リンクの上にカーソルをのせると自動で読み込むタイプ。  
まだ調整中みたいな感じ。

参考サイト

[サムネイルをクリックするとlightbox効果で画像を表示してくれるGreased Lightbox][8]

 [1]: http://www.huddletogether.com/projects/lightbox/
 [2]: http://images.google.jp/images?q=firefox
 [3]: http://userscripts.org/scripts/show/1868
 [4]: http://labs.beffa.org/greasemonkey/ImageLinkTooltip.user.js
 [5]: http://www.grauw.nl/projects/pc/greasemonkey/
 [6]: https://efcl.info/wp-content/uploads/showimageurl.user.js
 [7]: http://userscripts.org/scripts/show/23031
 [8]: http://kengo.preston-net.com/archives/002867.shtml
