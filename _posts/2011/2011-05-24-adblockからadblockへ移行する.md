---
title: 'adblock++からadblock#へ移行する'
author: azu
layout: post
permalink: /2011/0524/res2760/
SBM_count:
  - '00003<>1355430969<>3<>0<>0<>0<>0'
dsq_thread_id:
  - 311590760
categories:
  - Firefox
  - userChome.js
tags:
  - Firebug
  - javascript
  - 広告
---
危険な広告を除去するのに[Adblock++][1]を使用していましたが、Firefox5では動かないようなので(ネイティブなものはバージョン毎にコンパイルする必要があるとかないとか)代替として、[adblock#.uc.js][2]を使ってみることにしてみました。

[adblock#.uc.js][2]にはadblock系リスト変換君.htmlというadblock++形式などから変換できるものが入ってますが、さすがニッチなadblock++からadblock#への変換はないようなので書いてみました。   
(今思えばadblock系リスト変換君.htmlを拡張すればよかったかも…)

必要なもの

*   [Firebug][3]



以下のコードをFirebugのコンソール上で実行

adblockDataの部分は自分のabout:configからextensions.adblock++.filter_array の値に差し替えてください。   
最後のcopy関数以外は別にFirebugに依存しているわけじゃないので、他の環境でも少し書き換えれば動作すると思います(MITライセンスなのでご自由に)   
変換したものはクリップボードに入るので、後はadblock#.uc.js Filter Managerを開いて、入力欄にペーストして&#8221;追加&#8221;のボタンを押せばフィルターを移行できると思います。

Adblock++は[フィルタにコンテンツの種類を設定できる][4]のですが、[adblock#.uc.js][2]は対応していないのでそれ系のフィルターは自動で外されます。また既にdisableなフィルターも外されます。   
正規表現周りは元々使ってないので、ちゃんと動作するかは微妙です。   
一応、Readmeに従って下記の処理には対応させたつもりです。

> ただし,「/ads/」のように前後に「/」が付く物は正規表現フィルタと誤認識されるのを防ぐため,「\*/ads/\*」と表記する.

*   [adblock++ から adblock# 形式へ変換する(Firebug上で実行) — Gist][5]

 [1]: http://park2.wakwak.com/~benki/
 [2]: http://loda.jp/script/?andor=and&sword=adblock%23.uc.js&mode=ret
 [3]: https://addons.mozilla.org/ja/firefox/addon/firebug/
 [4]: http://sig.clipp.in/entry/172291
 [5]: https://gist.github.com/986965