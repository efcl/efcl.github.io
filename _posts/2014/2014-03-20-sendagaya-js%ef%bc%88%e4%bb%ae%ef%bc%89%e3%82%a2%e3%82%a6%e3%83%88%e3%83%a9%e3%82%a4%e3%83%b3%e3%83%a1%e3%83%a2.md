---
title: Sendagaya.js（仮）アウトラインメモ
author: azu
layout: post
permalink: /2014/0320/res3733/
dsq_thread_id:
  - 2462740529
categories:
  - javascript
  - イベント
tags:
  - javascript
  - イベント
---
# [Sendagaya.js（仮）][1]

[Sendagaya.js（仮）][1] に参加してきたのでメモ

*   [Sendagaya.js（仮） &#8211; Togetterまとめ][2]

## 超大量絵馬とはなんだったのか &#8211; @geta6

> [超大量絵馬とはなんだったのか &#8211; Glide][3] 

*   glide
*   超大量絵馬企画の経緯

http://10000000.pixiv.net/ の企画。

リアルタイムでお絵かきしたい要件

> node.js x socket.io 

*   express
*   backbone.marionette
*   almond &#8211; require.js
*   coffeescriptで書いた
*   1278コミット

### 構成

*   ストロークをサーバに送る
*   Redis -> node-canvas -> 画像化
*   他の閲覧者に画像として表示

### 設計-ビューアー

*   ビューアーは1枚のcanvas
*   位置に合わせて表示するものを取得してCanvasに描画しなおす
*   `url.createObject` で blobimageを生成して使った

### 設計 &#8211; 座標系

*   五角形の絵馬、四角形のサムネイル、閲覧用のキャンバスのそれぞれ違う形式
*   座標の変換の実装が必要
*   サーバ/クライアントがJavaScriptなので座標計算のロジックをそのま共有できた。

### 実行

*   JavaScript書いてたの3人、最初はrequire.js入れてなかった
*   require.js, i18n, almond, grunt productionの設定

### 担当と役割

*   機能毎にそれぞれのメンバーが独立開発
*   Model、ItemViewなど使用するコンポーネントをセットしたモジュールで実装単位を分けた
*   StateModelの変化をControllerが監視して、他のモジュールに通知
*   marionettoに乗れという方針でやった。

### Socket.io

*   Socket.io の問題が色々
*   タイムアウトを自分で実装して、残留コネクションを殺したりしてた。
*   絵馬ごとにroomを作って、イベントの配信先を絞った 
    *   絵馬が更新されたかどうかをroomごとに分ける
    *   引いた画面では更新回数を減らして、通知の大量発生を抑える

### Task

*   Gruntを採用
*   gulpを採用しなかった 
    *   周りがstreamベース慣れてた
    *   documentが少ない気がする

### 運用

*   CPU負荷が高くなって張り付き
*   `pm2` を使ってたが、コマンドを受け付けなくなる kill -> restart…
*   結局自分で書いた。

### その他

*   `EventEmitter2` EventEmitterに食わべて負荷が軽減した。 
    *   名前空間が使えるのが便利
*   node-canvas
*   imagemagick-native
*   redis 
    *   ドキュメントよりテストコードを読みましょう

* * *

## LT

## @harukasan 『node-canvas』

> [Node-canvas // Speaker Deck][4] 

*   絵馬の座標系の相互変換を計算を担当

Node-Canvas

*   クライアントからストローク情報を送る
*   サーバ側でストロークをレンダリング

クライアント側で生成

*   サーバ側で生成しなくてよい
*   描画の差が起きない
*   トラフィックが大きくなってしまう
*   クライアントの負荷がでかい

✔サーバ側で生成

*   サーバ側で生成する差がでるかもしれない
*   クライアントの負荷は少ない
*   トラフィックが少なくて済む 
    *   POSTは小さくて済む

node-canvas

*   context は 2dだけ
*   メソッドはブラウザのものと同じ

## 『atom.ioのpackageの作り方』 &#8211; @yosuke_furukawa

> [howto\_create\_atom // Speaker Deck][5] 

*   [Atom][6]
*   generator-packageでひな形が作れる
*   Chromiumなのでバッグも楽

## 『d3.js crossfilter.js dc.js』 &#8211; @edvakf

D3.js

*   DOMとデータを繋ぐライブラリ

[Crossfilter][7]

*   大量の多次元データを扱うライブラリ
*   多次元データのフィルタリング

D3.js+Crossfilter => [dc.js][8] すごい

## 『ClojureScript』 @halcat0x15a

*   ClojureをJavaScriptにコンパイルするaltjs
*   名前空間、Collection,record,protocol(interface),macro, java interop
*   Google Closure
*   Leiningenを使ってClojureのライブラリの依存関係を使う
*   スライドもClojureScript+markdownで書かれてる

## 『いかにして我々はフロントエンドに秩序をもたらそうとしてきたか』 &#8211; @mizchi

> [mizchi / いかにして我々はフロントエンドに秩序をもたらそうとしてきたか &#8211; Glide][9] 

*   prototype.js 
    *   `$("query")` だけが欲しかった
*   jQuery 
    *   スクレイパー
    *   メンテしにくい
    *   小さいうちはよかった
*   Backbone 
    *   1コのDOMと1コのViewと対応させようという発想
*   Knockout.js 
    *   データバインド
*   Angular.js 
    *   DOMにロジックを入れて、DIでかいけつ
    *   DOMと密結合にしたほうがやりやすい現実

気付き

*   テンプレートの再利用は難しい現実

Angular.js

*   学習コストが高い
*   DSLが複雑

Backbone.Modelの限界

*   ネストしたものに対応できない

Vue.js

*   余計な学習コストがない
*   データバインディング、リアクティブ

## 『Scala.js』 &#8211; @tototoshi

> [Scala.js][10] 

*   Scala.js 
    *   Scalaの言語機能が全て使える
*   JavaScriptは `global` を経由していく
*   sbtでコンパイル
*   どんどんサイズが小さくなって、コンパイル時間も短くなってる
*   jQueryの静的型つけ

## 『初心者向け、カウントアッププログラムで基礎勉強』- @AsbyuKobayashi

> [JavaScriptの基礎：カウントアッププログラムで学ぶ変数、イベント、DOM要素、即時関数、無名関数][11] 

*   Pure JavaScript
*   焼き鳥検索
*   普段使わないとDOM APIの名前とか忘れる

## 『googkitを始めよう』 &#8211; @orga_chem

> [googkitをはじめよう // Speaker Deck][12] 

*   jQueryは再利用できない
*   Closure Libraryセットアップがだるい
*   一度使うとすごくいい

googkit 簡単なコマンドでClosure Libraryが使える

    googkit init
    googkit setup
    

だけでセットアップが出来る。

* * *

メモ: Markdown Life

懇談会はJavaScript AST、CSS JIT、JITコンパイラ、LLVM、header、Cマクロの話等をしていました。

*   [CSS JIT &#8211; Google グループ][13]

<blockquote class="twitter-tweet" lang="en">
  <p>
    CSSJITの図解です <a href="http://t.co/AqkePrQpsJ">pic.twitter.com/AqkePrQpsJ</a>
  </p>
  
  <p>
    &mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/statuses/446284705525022720">March 19, 2014</a>
  </p>
</blockquote>

 [1]: http://www.zusaar.com/event/4207006 "Sendagaya.js（仮）"
 [2]: http://togetter.com/li/644395 "Sendagaya.js（仮） - Togetterまとめ"
 [3]: http://glide.so/geta6/9b10de0755161bf4ff02 "geta6 / <div align='center'>超大量絵馬とはなんだったのか</div> - Glide"
 [4]: https://speakerdeck.com/harukasan/node-canvas "Node-canvas // Speaker Deck"
 [5]: https://speakerdeck.com/yosuke_furukawa/howto-create-atom "howto_create_atom // Speaker Deck"
 [6]: https://atom.io/ "Atom"
 [7]: http://square.github.io/crossfilter/ "Crossfilter"
 [8]: http://nickqizhu.github.io/dc.js/ "dc.js - Dimensional Charting Javascript Library"
 [9]: http://glide.so/mizchi/9635965 "mizchi / いかにして我々はフロントエンドに秩序をもたらそうとしてきたか - Glide"
 [10]: http://tototoshi.github.io/slides/sendagaya-js-scala-js/#1 "Scala.js"
 [11]: http://ticklecode.com/present/140319_sendagayajs_jsBeginner/#/ "JavaScriptの基礎：カウントアッププログラムで学ぶ変数、イベント、DOM要素、即時関数、無名関数"
 [12]: https://speakerdeck.com/orgachem/googkitwohazimeyou "googkitをはじめよう // Speaker Deck"
 [13]: https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/tL4LjQq8lNI/discussion "CSS JIT - Google グループ"