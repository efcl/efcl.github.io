---
title: 第3回potatotipsでmogeneratorについて発表してきた
author: azu
layout: post
permalink: /2014/0115/res3586/
dsq_thread_id:
  - 2125214986
categories:
  - iOS
  - イベント
tags:
  - CoreData
  - iOS
  - イベント
  - スライド
---
# 【第3回】potatotips

[【第3回】potatotips (iOS/Android開発Tips共有会) &#8211; connpass][1] で発表/参加してきたメモ。

*   [Potatotips 3 · potatotips/potatotips Wiki][2]

## 自分が発表したスライド

- <a href="https://azu.github.io//slide/potatotips/mogenerator.html">mogenerator &#8211; potate tips</a>

CoreDataのモデルクラスを生成するmogeneratorについてのスライド

* * *

## 下位互換コード隠蔽のストイシズム

*   バージョン判定をしないとiOS6/7の対応しにくい
*   Controllerに書くとごちゃつく。
*   カテゴリで分岐処理をしたメソッドを定義する 
    *   `iOS6_` とかできるのが微妙
*   ControllerのサブクラスでiOS6/7を分ける 
    *   必ず分岐処理をしたControllerを継承しないといけない
*   アプリ本体からはそういう分岐が見えないようにする。 
    *   カテゴリ + 動的拡張
    *   method swizzle で互換の実装をiOS6でも動くように付ける
*   `class_addMethod()` は既存の実装がある場合は何もしない
*   `load()` でswizzleをかます

* * *

## アプリの評価を良くするための工夫

*   いいレビュー
*   評価ダイアログ 
    *   [arashpayan/appirater][3]
    *   表示条件を色々指定して出す
*   評価ダイアログが邪魔臭い
*   いいレビューとはなにか?
*   いいレビューは書かれないけど、悪いレビューは書きやすい 
    *   悪いレビューをへす。
    *   長中期に悪いレビューを減らすには、バグ報告はバグ報告で分けて報告できるように誘導する
*   小手先のテクニックよりアプリの品質をあげよう

* * *

## 便利なSyntax

*   CGRectの省略 
    *   構造体なので、構造体風に書ける
*   戻り値を返すを返すコードブロック 
    *   [cocoa-dom &#8211; New thing I do in code][4]
*   Unicodeを使ってアイコンを表示する 
    *   コードポイントで絵文字を表示する
    *   Macの文字ビューアから探す
*   三項演算子の2項目を省略する

* * *

## アプリでもオブジェクト指向エクササイズ

*   ThoughtWorksアンソロジー
*   かなりきびしいコーディング規約

* * *

## Provisioning Porfileファイルを活用してみる

*   アプリをビルド&リリースル時に必須
*   Apple Devloper Center上でCetrificationから生成されるバイナリファイル
*   CMDで暗号化されたプロパティリスト(plist)
*   復号化するとエディタでも開ける
*   `security cms -D -i file` で復号化できる</p> 
*   含まれてるデータを利用してビルドの自動化できる

* * *

## Fitting 解像度対応β

*   Androidは解像度多種多様
*   DP という解像度がある 
    *   電話系はこれで合うがタブレットではおかしい
*   それを上手くやる仕組み突いて 
    *   createScaleBitmap を用いるスケール
*   正方形を元に考えてやる。(4:3とかの端末もある)

* * *

## iOS 7 なMessage Appの作り方

*   iOS7のメッセージアプリ
*   もにょもにょ動く 
    *   UICollectionView + UIDymicsで作れる
    *   UICollectionViewFlowLayoutでやれる
*   吹き出しにグラデーションがついて 
    *   UICollectionViewLayoutAttributesのサブクラスを作る
    *   UICollectionViewCellのサブkルアスを作る
    *   UICollectionViewFlowLayoutのサブクラスで色をセットする 
        *   Cellのpositionに合わせた色を付ける
    *   => グラデーションっぽいの
*   キーボードが下スワイプで隠す 
    *   iOS7からそれ用のAPIがついた
    *   DAkeyboardControlを使うともっと柔軟性が効く
*   [akira108/AIiOS7MessageSample][5] にまとめたサンプル

* * *

## ちょっと優しい入力項目

* * *

## やはりお前らのiOS7対応は間違っている

*   UINavigationBarにself.viewが潜り込む
*   `edgesForExtededLayout=UIRectEdgeNon` にする対応はよくない

*   パターン別に対応方法のパターンがある
    
    *   iOS7向けに配置してdeltaでiOS6をあわせる
*   Interface Builderのオプション解説
*   すりガラス表現が失われるじゃなくて、真っ黒の背景が写ってるだけ
*   iOS7を対応してからiOS6に対応するような感じで考える

ーーー

## Reflectionを使おう、というお話

*   実行時にプログラム自身を読み取ったり書き換えたりする
*   JDK1.1 からある

Reflectionを使う慰留

*   Android 1.6救済のために

### デメリット

*   読みづらい
*   ビルド時に型チェックがはいらない
*   Android1.6をサポートあんまりもう意味ない

### セキュリティのために潰された機能を使う

開発時に通信先を変更する

*   hostsを設定する
*   DNSを設定する

Android 2.3までは普通にできたが、セキュリティ的な問題なのでAndroid3.0で潰れた

*   内部のstatic値を書き換えれば同じような事ができる
*   @hide で隠されててもつつける
*   セキュリティホールっぽい

ーーー

## [Secrets of launch arguments (iOS) // Speaker Deck][6]

*   コマンドライン引数について
*   mainのargvに入るものを見ていく
*   `NSProcessInfo` の `arguments` で撮れる

### 引数とNSUserDefaults

*   規則にしたがって書くとNSuserDefaultsにそれが入る
*   Booleanっぽいの値を渡したり、配列を渡せたりする
*   `-dictArg={}` plistの書き方をすれば何でも入る
*   XMLのplistを書けたりする
*   `-AppleLanguages (es)` はNSuserDefaultsにそれが書き込まれて言語が変わる

* * *

## TDDでアプリ開発。カバレッジ100%を目指せ！？

*   Androidアプリの開発のつらい
*   アーキテクチャの違い
*   テストを書こう!!
*   ローカルでテストしていいのは中学生まで
*   CloudBees を使ってやる(300ビルドまで無料で使える)

* * *

## xctestコマンドを飼いならしてやったよ

[tokorom/xctest-runner][7]

*   `xctest` コマンド
*   Xcode5からXcodebuildがよくなった
*   CLIから特定のテスト実行する方法がない
*   `-XCtest` でやれそう => かなりむずかしい 
    *   NSProcessInfo で起動引数をみて探すとできなくない

ーー

## KotlinでAndroidアプリ開発！(後編)

### Kotlin

*   JetBrainsが作ってるJVM言語 
    *   GroovyやScalaから影響をうけてる静的言語
*   IntelliJで自然に支える
*   軽量で手軽

### 機能紹介

*   拡張関数 
    *   カテゴリみたいな仕組み
*   RoboGuiceとかも普通にアノテーションを書いて使える
*   関数リテラル

* * *

## 死んだオブジェクトの生まれ故郷を探す

`EXC_BAT_ACCESS` について

*   クラッシュした時にどこでオブジェクトが解放されたかを調べる
*   MallocStackLogging のオプションでmalloc/freeのログが残る
*   Zombieを使うとInstrumentsでできる

* * *

## Gradleの共通ルーチンをテストする（後編）

* * *

## JavaのHTTPインターフェース

### Retrofit

*   APIがキチンとRestfulならキレイに名書ける
*   キューイング等は隠蔽
*   かっこいいインターフェイス

### Voley

*   Google製ネットワーク
*   リクエスト+キューの素朴な作り
*   画像のハンドリングも出来る 
    *   固定のタイムアウト… 
    *   1つのライブラリで画像ロードもできるので気持ちいい

### andoid-async-http

*   昔からあるシンプルなやつ
*   キューは隠蔽されると

* * *

### その他

[@hoshi_gaki][8]、[@k_katsumi][9]、[@anton0825][10]、[@ninjinkun][11] で食べてから帰った。

* * *

メモ

*   [ Haroo Pad ][12]

 [1]: http://connpass.com/event/4563/ "【第3回】potatotips (iOS/Android開発Tips共有会) - connpass"
 [2]: https://github.com/potatotips/potatotips/wiki/Potatotips-3#%E7%99%BA%E8%A1%A8%E8%80%85%E4%B8%80%E8%A6%A7 "Potatotips 3 · potatotips/potatotips Wiki"
 [3]: https://github.com/arashpayan/appirater "arashpayan/appirater"
 [4]: http://cocoa-dom.tumblr.com/post/56517731293/new-thing-i-do-in-code "cocoa-dom - New thing I do in code"
 [5]: https://github.com/akira108/AIiOS7MessageSample "akira108/AIiOS7MessageSample"
 [6]: https://speakerdeck.com/kishikawakatsumi/secrets-of-launch-arguments-ios "Secrets of launch arguments (iOS) // Speaker Deck"
 [7]: https://github.com/tokorom/xctest-runner "tokorom/xctest-runner"
 [8]: https://twitter.com/hoshi_gaki "@hoshi_gaki"
 [9]: https://twitter.com/k_katsumi "@k_katsumi"
 [10]: https://twitter.com/anton0825 "@anton0825"
 [11]: https://twitter.com/ninjinkun "@ninjinkun"
 [12]: http://pad.haroopress.com/ " Haroo Pad "
