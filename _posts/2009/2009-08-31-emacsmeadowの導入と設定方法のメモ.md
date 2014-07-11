---
title: Emacs(Meadow)の導入と設定方法のメモ
author: azu
layout: post
permalink: /2009/0831/res1272/
SBM_count:
  - '00001<>1355406622<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 301596800
categories:
  - software
tags:
  - Emacs
  - まとめ
  - マウス
  - 設定
---
Emacs(使用しているのはMeadowだけど)の設定方法のメモ   
[Meadow 3.00][1]をダウンロードして使用。

<!--more-->



[.emacs を再読み込みする方法 &#8211; gan2 の Ruby 勉強日記][2]
:   設定を再読み込み。  
    頻繁に使うので覚える

<pre>eval-buffer で再読み込みができる。</pre>

[マウスのホイールスクロールを加速させたくない &#8211; Ni chicha, ni limona -平均から抜けられない僕-][3]
:   ホイールスクロールの挙動を設定

[meadow(emacs)で、マウスホイールで移動する時の動きが加速されてる(ような気がします)ので、使いづらいです。 具体的には標準の秀丸などのマウスホイールの動きと同じよう.. &#8211; 人力検索はてな][4]
:   加速度を無効にする  
    (setq mouse-wheel-progressive-speed nil) 

[ubulog: emacsで最近開いたファイルからファイルを開く][5]
:   最近開いたファイルをメニューから開けるようにする

[free will&#8230; : エディタ難民からEmacs統一へ][6]
:   windowsライクな動作を実現する設定をまとめてある。

[Emacs / Meadow の覚え書き &#8211; Meadow TIPS][7]
:   Q&A方式で解決

[wb-line-number][8]
:   左サイドに行番号の表示  
    [wb-line-numberの行番号とスクロールバーの色を変える: プログラマーになりたい！][9]を参考に色を変えた。

<pre>;; wb-line-numberでいらなくなったスクロールバーを消す
(setq truncate-partial-width-windows nil)
(set-scroll-bar-mode nil)
;; 左のサイドバーに行番号の表示
(require 'wb-line-number)
(wb-line-number-enable)
(setq wb-line-number-scroll-bar t)
(custom-set-faces
  ;; custom-set-faces was added by Custom.
  ;; If you edit it by hand, you could mess it up, so be careful.
  ;; Your init file should contain only one such instance.
  ;; If there is more than one, they won't work right.
 '(wb-line-number-face ((t (:foreground "black"))))
 '(wb-line-number-scroll-bar-face ((t (:foreground "white" :background "LightGray")))))</pre>

[linum.el &#8211; Ussy Diary(2008-05-19)][10]
:   同じく行番号の表示。 [Linum][11]の方が競合が起こりにくいのでこっちを使用

[JsDoc 形式のコメントを扱うパッケージ js-doc.el &#8211; リタマス][12]
:   js2-modeと併せて使う。 

[Emacs で JavaScript を書く][13]
:   js2-modeはjavascriptを書くのに導入  
    .emacsに直接書かなくてもメニューバーから設定できる。 

[<img class="alignnone size-medium wp-image-1291" title="sshot-2009-08-31-[21-52-59]" src="http://efcl.info/wp-content/uploads/2009/08/sshot-2009-08-31-21-52-59-300x89.png" alt="sshot-2009-08-31-[21-52-59]" width="300" height="89" />][14]

[selflearn @ ウィキ &#8211; 秀丸からEmacsへ移行する][15]
:   設定について細かく解説が書いてあるので、他のエディタから移行するのに役にたつ。 

### よく分からないところ

C-[とかキーバインドを割り当てる事ができない。(なぜかESC扱いされる)

最終的にこんな感じ

 [1]: http://www.meadowy.org/meadow/wiki/%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89
 [2]: http://d.hatena.ne.jp/gan2/20070704/1183522644 ".emacs を再読み込みする方法 - gan2 の Ruby 勉強日記"
 [3]: http://d.hatena.ne.jp/paella/20080930/1222761237 "マウスのホイールスクロールを加速させたくない - Ni chicha, ni limona -平均から抜けられない僕-"
 [4]: http://q.hatena.ne.jp/1216305093 "meadow(emacs)で、マウスホイールで移動する時の動きが加速されてる(ような気がします)ので、使いづらいです。 具体的には標準の秀丸などのマウスホイールの動きと同じよう.. - 人力検索はてな"
 [5]: http://ubulog.blogspot.com/2007/06/emacs.html "ubulog: emacsで最近開いたファイルからファイルを開く"
 [6]: http://cave.under.jp/_contents/emacs.html "free will... : エディタ難民からEmacs統一へ"
 [7]: http://www.fan.gr.jp/%7Ering/Meadow/meadow.html "Emacs / Meadow の覚え書き - Meadow TIPS"
 [8]: http://homepage1.nifty.com/blankspace/emacs/wb-line-number.html "wb-line-number"
 [9]: http://www-section.cocolog-nifty.com/blog/2008/10/wb-line-number-.html
 [10]: http://www.pshared.net/diary/20080519.html "linum.el - Ussy Diary(2008-05-19)"
 [11]: http://stud4.tuwien.ac.at/%7Ee0225855/linum/linum.html
 [12]: http://d.hatena.ne.jp/mooz/20090820/p1 "JsDoc 形式のコメントを扱うパッケージ js-doc.el - リタマス"
 [13]: http://8-p.info/emacs-javascript.html "Emacs で JavaScript を書く"
 [14]: http://efcl.info/wp-content/uploads/2009/08/sshot-2009-08-31-21-52-59.png
 [15]: http://www23.atwiki.jp/selflearn/pages/41.html "selflearn @ ウィキ - 秀丸からEmacsへ移行する"