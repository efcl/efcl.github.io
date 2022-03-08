---
title: Objective-C勉強会@東京 8月でiOSライブラリの開発方法について発表してきた
author: azu
layout: post
permalink: /2013/0802/res3377/
dsq_thread_id:
  - 1560608367
categories:
  - iOS
  - イベント
tags:
  - iOS
  - library
  - test
  - イベント
  - スライド
---
# Objective-C勉強会@8月

[Objective-C勉強会@東京 ８月 &#8211; Objective-C勉強会＠東京 | Doorkeeper][1] に参加/発表してきたのでメモ

* * *

## 「メタプログラミングとCategory」 &#8211; @akuraru

> [Metaprogramming][2] 

### メタプログラミング

*   ロジックを生成する高位ロジックのこと
*   マクロ等
*   クラスやメソッドを生成するロジックの事
*   Objective-Cには実行時に行うことができる
*   => カテゴリ

### カテゴリ

*   コンパイル時に既存のクラスにメソッドを追加、上書きできる機能
*   ヘッダーファイルを読み込んで無くてもコンパイルできてしまう

### よいところ

*   手軽
*   ファイル分けができる 
    *   Viewの更新だけを、カテゴリに分けたりすることができる
*   テストするとき便利 
    *   カテゴリでテスト用にヘッダーを作れる
    *   [Objective-Cのテストクラスからプライベートメソッド/プロパティを参照したい &#8211; TOKOROM BLOG][3]
*   コンパイラディレクティブ 
    *   [@ : NSHipster][4]

### カテゴリの衝突

*   カテゴリ同士で上書きすると警告がでない
*   ネイティブオブジェクトのメソッドに対しては出る

### カテゴリを用いていい場合

*   複数クラスにメソッドを追加したい
*   自然と思える場合

### 解決方法

*   継承してカテゴリは使わない
*   Static Classを作ってカテゴリは使わない
*   prefixを付けたメソッドにする(ナイーブ…)

* * *

## 「CoreDataとMagicalRecord」 &#8211; @tikidunponpon

### CoreDataとは?

*   O/Rマッピングフレームワーク 
    *   オブジェクトとデータベースのテーブルを結びつける
*   データ永続化
*   オブジェクトグラフの管理を提供 
    *   テーブル同士の関係(リレーション)をオブジェクトで管理する仕組み

#### CoreDataの特徴

*   多機能
*   RDBMSとは異なる点

#### 多機能

*   クラス数が多い
*   機能が多い
*   最低限知っておくべきもの 
    *   CoreDataのStack
    *   CRUD操作

### CRUD操作

*   Create(生成) &#8211; insertNew
*   Read(読み込み) &#8211; execute
*   Update(更新) &#8211; プロパティ更新
*   Delete(削除) &#8211; deleteObject

### CoreData Stack

*   Managed Object Context 
    *   作業スペース
    *   マルチスレッドで扱うときは複数ある場合ある
    *   ManagedObejctを作ってContextに入れる
    *   Contextに入れただけでは保存はされてない
*   Persistent store coordinator 
    *   これは基本1つ
    *   複数のPersistent storeを扱う
*   Persistent store 
    *   実際のデータベースファイルを扱うオブジェクト
*   Managed Object Model 
    *   テーブル構造をオブジェクトとして表示(マッピングしたもの)
    *   Entity Descriptionの集合
*   Entity Description 
    *   実際のそれぞれのモデル

### MagicalRecord

*   ActiveRecord風に使えるLibrary
*   コード記述量が減る
*   ワンラインフェッチが楽
*   FetchRequestの拡張も可能
*   DEMO

Fetchだけなら、[peymano/DVCoreDataFinders][5] がMagicalRecordと似たメソッドを持ってる

#### 導入手順

*   CocoaPods , git clone 
    *   最新は2.2
*   AppDelegateでsetupを呼び出す
*   `MR_defaultContext` でContextを取ってくる
*   `MR_createEntity` は CurrentThread で作られる
*   Update は `MR_createEntity` で作ったオブジェクトに値を入れればいい
*   deleteはContextから消えてるだけなので、保存するまで永続化はされない

### 他

*   CoreDataファイルのビューアー [yepher/CoreDataUtility][6]
*   Entityのモデルクラスの生成 [mogenerator + Xmo’d][7]
*   デバッグオプション [CoreData の実行SQLを出力させる &#8211; 日々是笑心][8]

* * *

## Devlop iOS Library &#8211; @azu_re

自分が発表してきたのは、  
iOSのライブラリ開発、テスト、コードカバレッジ、ライセンス、CocoaPodsでの公開方法についての話です。

スライドは以下に置いてあります。

- <a href="https://azu.github.io//slide/OCStudy/2013_August/devlop_ios_library.html#/">Devlop iOS Library</a>

スライド中でも触れていますが、

[NSDateをもっと便利に使うためのライブラリ NSDate-Escortを書いた | Web scratch][9] で  
書いた内容を少し幅広く扱った感じになってるので、一緒に読むとより理解しやすいです。

iOSライブラリの公開する環境として、CocoaPods,Travis CI,Coveralls といったツールやサービス等が既に揃ってるので、  
もっと気軽にライブラリを公開していけるといいと思います。

 [1]: http://ocstudy.doorkeeper.jp/events/4896 "Objective-C勉強会@東京 ８月 - Objective-C勉強会＠東京 | Doorkeeper"
 [2]: http://www.slideshare.net/akuraru/metaprogramming-25125939 "Metaprogramming"
 [3]: http://www.tokoro.me/2012/09/12/objc-private-test/ "Objective-Cのテストクラスからプライベートメソッド/プロパティを参照したい - TOKOROM BLOG"
 [4]: http://nshipster.com/at-compiler-directives/ "@ : NSHipster"
 [5]: https://github.com/peymano/DVCoreDataFinders "peymano/DVCoreDataFinders"
 [6]: https://github.com/yepher/CoreDataUtility "yepher/CoreDataUtility"
 [7]: http://rentzsch.github.io/mogenerator/ "mogenerator + Xmo’d"
 [8]: http://d.hatena.ne.jp/watanata2000/20111115/1321356729 "CoreData の実行SQLを出力させる - 日々是笑心"
 [9]: https://efcl.info/2013/0801/res3366/ "NSDateをもっと便利に使うためのライブラリ NSDate-Escortを書いた | Web scratch"
