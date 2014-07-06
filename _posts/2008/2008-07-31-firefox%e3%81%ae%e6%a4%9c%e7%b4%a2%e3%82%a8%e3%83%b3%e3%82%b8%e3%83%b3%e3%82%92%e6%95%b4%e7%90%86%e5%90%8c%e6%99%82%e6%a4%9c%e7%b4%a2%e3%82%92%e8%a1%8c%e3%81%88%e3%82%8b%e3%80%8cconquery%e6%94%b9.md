---
title: 'Firefoxの検索エンジンを整理&#038;同時検索を行える「ConQuery改造版」'
author: azu
layout: post
permalink: /2008/0731/res284/
SBM_count:
  - '00001<>1355406565<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 300801929
categories:
  - アドオン
tags:
  - Firefox
  - アドオン
  - 検索
---
ConQueryは右クリックのコンテキストメニューから検索エンジンを選んで検索できるアドオンですが、[Shadow912][1]による[ConQuery][2]改造版が便利になっていたので紹介。

1.  検索エンジンをフォルダ単位でまとめられるようになっている。
2.  そのフォルダに入ってる検索エンジンを同時に検索できる。(自分はあくまで整理に使うので、これはあまり使わないかな)
3.  Ctrl キーを押しながら検索エンジンをクリックすることで、プロンプトが出て選択している文字以外にも検索文字追加修正できる。

[ArtSaltのサイドストーリー ConQuery使って複数エンジンで一発検索][3]でスクショで紹介されているのでイメージしづらい方は見とくべき。

自分にとってフォルダで整理できるのはかなり嬉しいもので、検索エンジンリストが肥大化してくると使いづらくなるので検索エンジンを追加するのを自重していた。  
検索エンジンを整理する[Organize Search Engines][4]という専門のアドオンもあるが、これは競合が起こりやすく自分の環境では上手く動かなかった。([Context Search][5]と[Organize Search Engines][4]で似たような環境をできるかも知れない)

整理の基準としてはGoogleなどの頻繁に使う検索エンジンはカレント(フォルダにいれないで)、あまり使わない検索エンジンをジャンル分けして入れている。  
フォルダに入れた検索エンジンは検索バーに表示されない事を考慮する必要がある。

[ConQueryもどき改][6]という[userChrome.js][7]も擬似的なフォルダ整理を行えるが、ダミー検索エンジンを追加して行うので簡単には整理しづらいのがちょっと残念(最近までこちら使用してきました)  
同時検索以外は同等の機能があるので、自分に合った方を選ぶといいですね。

[ConQuery][2]は[FIREGESTURES][8]での検索と並んで一番使う機能なので、まだβ版([ConQuery 1.7.3 改造版その４β１][9])ということで今後も期待。

**Shadow912&#8242;s Mozilla/Firefox 日本語版拡張置き場: ConQuery**
:   <http://mozilla-ext-ja.way-nifty.com/blog/conquery/index.html>

 [1]: http://mozilla-ext-ja.way-nifty.com/blog/
 [2]: http://mozilla-ext-ja.way-nifty.com/blog/conquery/
 [3]: http://art2006salt.blog60.fc2.com/blog-entry-787.html
 [4]: https://addons.mozilla.org/ja/firefox/addon/4565
 [5]: http://www.cusser.net/extensions/contextsearch/
 [6]: http://space.geocities.yahoo.co.jp/gl/alice0775/view/20070707/1183734955
 [7]: http://www.haslo.ch/zeniko/software/userchrome.js.2.xpi
 [8]: http://www.xuldev.org/firegestures/
 [9]: http://mozilla-ext-ja.way-nifty.com/blog/2008/07/conquery_173_b41c.html