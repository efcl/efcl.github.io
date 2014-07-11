---
title: AppCode Night アウトラインメモ
author: azu
layout: post
permalink: /2013/1217/res3551/
dsq_thread_id:
  - 2056174524
categories:
  - iOS
  - iPhone
tags:
  - iOS
  - イベント
---
# AppCode Night

[12/17(火) AppCode Night &#8211; AppCodeの勉強会 #ACNight #jbugj on Zusaar][1] に参加してきたのでそれのメモ

## JetBrains製品群、ライセンス形態などの紹介 &#8211; @yusuke

* * *

## AppCodeの基本(インストール〜プロジェクト作成、実行までのウォークスルー) &#8211; @akr

*   AppCode高機能なIDE
*   最小限の機能セットについて
*   Xcodeに依存してるので使い分けが大事
*   AppCodeとXcodeのプロジェクトファイルは同期される 
    *   同時に編集しても問題ない
*   「まずはAllow placementのチェックを外して下さい」
*   IntelliJではデフォルトオフになったのでそのうちAppCodeもオフがデフォルトになるかも
*   AppCodeの補完の機能 
    *   Basic , Smart
    *   CamelHumpsによる補完. UIVCでUIViewControllerを補完できる

### Navigation機能

*   ヘッダーと実装ファイルの相互移動
*   クラスの検索

* * *

## LT

### CALFUL

*   LiveTemplateで顔文字入力

### さけのわ

*   日本酒体験共有アプリ
*   [iTunes の App Store で配信中の iPhone、iPod touch、iPad 用 さけのわ &#8211; 日本酒体験共有アプリ][2]

* * *

## ココがヘンだよXcode(AppCodeのかゆいところに手が届く部分をXcodeと比較しながら紹介) &#8211; @happy_ryo

*   コード補完
*   デバッガー 
    *   プリミティブじゃなくてもデバッガーで値を書き込める
*   Quick Definition Documentation 
    *   ヘッダーだけじゃなくて、コメントの情報とか見える
*   import 
    *   ヘッダーの自動インポート、Quickfixでインポートできる
*   Refactor
*   REST Client 
    *   APIを試せる機能

### Xcode

*   CoreData
*   IB
*   プロジェクト設定

などはXcodeを使う

*   コードを書くときはAppCode

* * *

## AppCodeにおけるiOSアプリのテスト &#8211; @sugimotoak

AppCodeで標準サポートされてるテストフレームワーク

*   SenTestingKit
*   XCTest
*   GoogleTet</p> 
*   XCode5でxcodebuildのCLIからテスト実行が楽になった

### テストの実行

*   Cmd+Alt+R でテストターゲットを選択しながら実行出来る
*   Cmd+Rで再度Runできる

* * *

## AppCodeでリファクタリング &#8211; @semnil

### 大切なこと

*   修正はひとづずつステップバイステップで
*   ステップごとに確認する
*   間違ったら1ステップ戻る
*   バグ修正や機能追加の誘惑に打ち勝つ
*   やりすぎない事が大事(終わりがないので)

### リファクタリングサイクル

*   不吉な臭い -> コード修正 -> コンパイル確認 -> テスト -> Gitへコミット
*   修正ごとにGitにコミットする(戻すのがやりやすくなる)

### XcodeとAppCode

*   Xcodeだとdefineやselectorのrenameをやってくれない
*   Xcodeはリファクタリングメニュー自体が少ない
*   Gitのdiffを見るまでが遠い

*DEMO*

* * *

## おわりに

スライド適当に書いてたけど、イマイチなネタだったので保留にしました。

*   [AppCode speeedy &#8211; OCNight][3]

 [1]: http://www.zusaar.com/event/1807003 "12/17(火) AppCode Night - AppCodeの勉強会 #ACNight #jbugj on Zusaar"
 [2]: https://itunes.apple.com/jp/app/sakenowa/id725541484?mt=8&ign-mpt=uo%3D4 "iTunes の App Store で配信中の iPhone、iPod touch、iPad 用 さけのわ - 日本酒体験共有アプリ"
 [3]: http://azu.github.io/slide/ACNight/acnight.html#1 "AppCode speeedy - OCNight"