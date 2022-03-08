---
title: Objective-C勉強会＠東京 で iOSのユニットテストについて話してきた
author: azu
layout: post
permalink: /2013/0510/res3267/
dsq_thread_id:
  - 1278219407
categories:
  - iOS
  - イベント
tags:
  - iOS
  - TDD
  - イベント
---
[Objective-C勉強会＠東京 &#8211; PARTAKE][1] に参加して、iOSのユニットテストについて話をして来ました。

- <a href="https://azu.github.io//slide/OCStudy/ios_unit_test.html#slide1">iOS Unit Test</a>

スライドは上記に置いてあります。

そこまで、それぞれに詳しく扱ってない感じで、ロジックテストとアプリケーションテストの違いや、  
どういうツールがあるのかやデータベースを使った時にテストの仕方等の紹介な感じです。

[xctool][2] はiOSのテストをCLIで実行するのにとても便利でよい感じなのでお勧めです。

スライド内にひっそり(note)とCocoaPodsと [xctool][2] の相性がまだ良くないことが書かれていますが、  
一度ビルドしないと、 [xctool][2] からテストを動かすとエラーになる現象があります。

    ld: library not found for -lPods
    

これは、&#8221;Find Implicit Dependencies&#8221;の挙動が上手く動いていないのが原因みたいで、手動でビルドの設定にCococPodsの静的ライブラリをビルドするTargetを追加すれば動作するようになります。

*   [ld: library not found for -lPods · Issue #16 · facebook/xctool][3]

BuildのTargetを CocoaPods -> Main -> Test に並べてあげると解決します。  
(そのうちxctool側で対応しそうな気がする)

一度でもビルドしてあれば、上記のエラーはでなくなるので気づきにくいですが、Travis CIのように毎回クリーンな環境で実行される場合はエラーが出ます。  
以下のプロジェクトではCocoaPods + xctool + Travis CIでテストを動かしています。

*   [azu/AZDateBuilder · GitHub][4]

* * *

以下メモ

# Objective-Cの概要 &#8211; @[akuraru][5]

## Objective-Cとは

*   Cの完全上位互換
*   動的型付きオブジェクト指向
*   メッセージ式

## 他の言語との関わり

*   C言語
*   Smalltack のようにかけるC言語

### 特徴

*   メッセージ式
*   ARC
*   C言語と同等の速度
*   カテゴリ 

## メッセージ式

*   <del>あるClassにxxというmethodがある</del>
*   xxというmethodがあるClass

同じメッセージ

## ARC

*   C言語と同様にメモリ管理は手動で行わないといけなくなった
*   コンパイラが自動でメモリ管理に関するコードを追加する
*   ガーベッジコレクションじゃない

## C言語と同等の速度

*   ClassはC言語の機能のラップ
*   メソッドは過疎数の名前空間が分かれている(名前空間を分けている)
*   本来に速度が必要ならばC言語で実装すると高速

## カテゴリ

*   実装を複数のファイルに分割する機能
*   NSObjectにも機能が追加できる
*   強力な分リスクがある機能

# GDBでObjective-Cの中身を見る

*   GDBでObjective-Cのアセンブラ
*   メッセージ式はobjc_msgを呼び出してる
*   Objective-C ではメソッドを呼ぶときに self, _cmd, パラメータ1,2…と渡される
*   NSStringはCFConstStringReference になってる

# LLVMでアセンブラ

*   clang -emit-llvm -S でllvmアセンブリな形式で見られる 
    *   直接アセンブラを見るより楽
*   どういう引数を渡しているかがわかりやすい

# おわり

*   来月ぐらいにもう一度やるそうです。

 [1]: http://partake.in/events/30064810-a41b-4de6-a49b-897b73a5890d "Objective-C勉強会＠東京 - PARTAKE"
 [2]: https://github.com/facebook/xctool "facebook/xctool · GitHub"
 [3]: https://github.com/facebook/xctool/issues/16#issuecomment-17444311 "ld: library not found for -lPods · Issue #16 · facebook/xctool"
 [4]: https://github.com/azu/AZDateBuilder "azu/AZDateBuilder · GitHub"
 [5]: https://twitter.com/akuraru "akuraru"
