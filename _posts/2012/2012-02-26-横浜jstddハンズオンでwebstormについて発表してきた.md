---
title: 横浜JSTDDハンズオンでWebStormについて発表してきた
author: azu
layout: post
permalink: /2012/0226/res3015/
dsq_thread_id:
  - 589847823
SBM_count:
  - '00041<>1355446982<>36<>0<>4<>1<>0'
categories:
  - javascript
  - イベント
tags:
  - javascript
  - TDD
  - WebStorm
  - アウトライン
---
[横浜JSTDDハンズオン][1]に参加してきて、WebStormというIDEはどういうものなのかについて発表してきました。

- <a href="http://azu.github.com/slide/webstorm/webstorm.html#slide1">WebStorm指南書</a>

発表してきた資料置いておきます。

後から資料として見やすいように画像をたくさん入れながらWebStormの機能紹介について書いたので、WebStormについて知りたい方は読むといいです。  
また、最近出たばかりの[WebStorm 4.0 Early Access Program][2]についても書いてあるので興味がある人はどうぞ。

 
- <a href="http://azu.github.com/slide/webstorm/webstorm.html#slide12">スライドの見方</a>

スライドは上記のように機能の紹介がベースで、それの利用方法やこういう機能があって便利という感じのスライドになってます。

- <a href="http://azu.github.com/slide/webstorm/webstorm.html#slide39">WebStormの楽しさ</a>

Web開発等JavaScript周りの環境も変化してきているので、それにあわせてエディタやIDEももっと変化するといいなーと思う部分にいろいろ挑戦してる感じがしてるのがWebStormが好きな所でもあります。  
とりあえず、[WebStorm][3]は[30-day trial][4]なので、試してみるといいかもしれません。他のエディタ等もいろいろ競争して質が上がっていくといいなー。

* * *

[横浜JSTDDハンズオン][1]の方ではJsTestDriverを使ったハンズオンをしたのでその時のアウトラインメモ。  
Twitterのまとめは [横浜JSTDDハンズオン #JSTDD つぶやきまとめ &#8211; Yukarin&#8217;Note][5] に

# TDDとは何か

*   プログラマが行うホワイトボックステスト
*   開発的なアプローチ(TDD)
*   ドキュメント的なアプローチ (サンプルコード

# TDD

*   開発を行うためにテストを行う
*   コードカバレッジは考慮しない
*   先に大きなインターフェイスを書いて設計を行う

## BDD

*   振る舞いを先に定義する
*   開発を始めるときは重要だけど、開発を進めるといらない

## ドキュメントアプローチ

*   ドキュメントの代わりにテストを書く
*   キッチンシンクと言われたりするような主要な機能についてテストを書く
*   開発当初は微妙だけど、公開するにつれて重要になる。

## 品質的なアプローチ

*   コードカバレッジは管理していく段階で重要になる
*   コードカバレッジを重視すると、ドキュメント的な役割がし難く。

## 結合テスト

Seleniumとかの話

# JsTestDriverのアーキテクチャ

# JsTestDriverの使い方

### setUp

各テスト実行前に実行される

### tearDown

各テストが終わる事に実行される

### AsyncTestCase

引数で同期か非同期化を分けられるので、SyncTestCaseにもできる。

各テストにはqueueという引数がわたってくる 非同期テストはとても面倒

## sinon.js

非同期テストを楽にするFakeテストができる

## JSTestDriverのエラーになりやすい所

*   serverオプションに/を付けるとエラー
*   複数人で同じサーバのJSTestDriverを使える(パブリックはやめとけ)
*   ブラウザでアクティブでないタブのsetTimeoutがゆっくりになるので、それぞれウィンドウで実行するのがよい

# Sinon.js

トロイの木馬の手引きをしたスパイの名前が由来

* * *

**ツール**

*   **[Qute for PC/Mac][6]**
*   [WebStorm][3]

書いたコードは [azu/YokohamaJSTDD &#8211; GitHub][7] に置いてあります。

 

 [1]: http://atnd.org/events/25519
 [2]: http://blog.jetbrains.com/webide/2012/02/phpstorm-webstorm-4-0-early-access-program-started/
 [3]: http://www.jetbrains.com/webstorm/index.html
 [4]: http://www.jetbrains.com/webstorm/download/index.html
 [5]: https://yukar.in/note/ckFoT5
 [6]: http://www.inkcode.net/qute
 [7]: https://github.com/azu/YokohamaJSTDD
