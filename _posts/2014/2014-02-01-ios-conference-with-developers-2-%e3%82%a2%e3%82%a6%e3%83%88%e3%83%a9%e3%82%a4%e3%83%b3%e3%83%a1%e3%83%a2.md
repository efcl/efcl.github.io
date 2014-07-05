---
title: '[iOS] Conference With Developers 2 アウトラインメモ'
author: azu
layout: post
permalink: /2014/0201/res3651/
dsq_thread_id:
  - 2204071961
categories:
  - iOS
  - イベント
tags:
  - iOS
  - Objective-C
  - Ruby
  - イベント
---
# [Conference With Developers 2 | Peatix][1]

[Conference With Developers 2][1] に参加してきたのでメモ。

録画

*   [confwd 1][2]
*   [confwd 2][3]

* * *

## iOSエンジニアとGitHubとキャリア &#8211; ninjinkun

> [GitHub活動を通して個人のキャリアを積みつつ仕事の成果を出す方法][4] 

*   Github上で行うオープンソース活動

### NJKWebViewProgress

*   [ninjinkun/NJKWebViewProgress][5]
*   WebViewにロードバーを表示するライブラリ
*   proxyとして実装してるので既存のWebViewのdelegateに挟んで使える

### NJKScrollFullScreen

*   [ninjinkun/NJKScrollFullScreen][6]
*   スクロールするとフルスクリーンになるUI
*   UIScrolViewDelegateをフックしてバーを隠すタイミングを教えてくれる proxy
*   ViewControllerのナビゲーションやToolbarを隠す機能

### モジュールを作って貰う方法

*   デモアプリがあるとよい
*   (`pod-try` で試しやすい)
*   継承前提では作らない
*   テストを充実させる
*   CIを導入する

### README

*   readmeをがんばる 
    *   ストレートに伝わる
*   UI系ライブラリ 
    *   gyazo gifとか動作を貼る

### Cocoapodsにpullreq

*   CocoaPodsにpullrequestする
*   [@CocoaPodsFeed ][7] 等に通知される

### おわりに

*   OSSのロールモデル
*   CAPN &#8211; Perlのリポジトリ
*   企業の垣根を超えたコミットする分解
*   オープンソースモジュール

* * *

## 公開用のObjective-Cの書き方 &#8211; ishikawa

> [Objective-C Programming Guide for Open Source Software // Speaker Deck][8] 

### アプリでの衝突

*   シンボルの衝突 
    *   クラスやカテゴリ、定数の衝突
*   リソースの衝突 
    *   画像などの衝突

#### シンボルの衝突で命名規則で防ぐ

*   3文字の大文字prefixを付ける 
    *   Appleののドキュメントにprefixの話がある
    *   2文字より3文字
*   カテゴリも同様に小文字の3文字prefixを付ける 
    *   被ると動作が不定になる

#### 定数の命名規則

*   関連するクラスをprefixにつける
*   外部から不要な定数は非公開にしておく

#### 外部のライブラリの依存管理

*   使用してるライブラリを明示する
*   CocoaPodsの依存管理を使う

#### リソースの衝突

*   main bundleに同じ名前の画像があると死ぬ
*   Library bundle &#8211; ライブラリはmain bundleと分けたbundleを使う
*   main, library それぞれがあるので衝突しなくて済む

### 良い `@interface`

*   実装を推測できる 
    *   interfaceをみて動作がわかる

#### 良い `@property` の話

*   変更の可否を明確にする
*   ライブラリの利用に必要な情報は与える
*   ライブラリの利用に不要な情報は与えない</p> 
*   `readwrite` がデフォルト

*   `readonly` は明示する

### `readwrite`

*   どんな時に変更しても問題ない事を示すプロパティに付ける
*   setterで変更を満たすように実装が必要

### `readonly`

*   変更する必要がないプロパティ
*   変更を禁止したいプロパティ
*   指定イニシャライザで指定出来るようにする

### 良い通知パターン

いろんなパターンがあるけど、それぞれ使うタイミングがある

#### blocks

*   通知が特定のメソッドに結びつく動作
*   通知の種類が少ない場合 
    *   handlerがいっぱいあると向いてない
*   openしたら通知が来るみたいな時
*   blockの引数は結果を渡す 
    *   エラーが起こる可能性があるなら `NSError` を渡す

#### delegate

*   通知が特定のオブジェクトに結びつく
*   通知の種類が多い場合
*   通知の受け手が1つしかない

#### NSNotification

*   通知の受け手が多い
*   通知の送信元と受け手が遠い時
*   ある種のグローバル変数

#### KVO

省略されました

### ユニットテスト

テストを書く理由

*   テストを書いた方が早い場所がある(遅い場所もある)
*   ロジックメイン + 条件が多いとユニットテストした方が楽

#### コードが壊れている事をすぐに発見できる

*   コードが壊れてるかどうかを簡単に検証できる

#### ライブラリのテストのメリットはコストに見合う事が多い

*   アプリのコードに比べるとライブラリは大きな変更が少ないのでテストしやすい

### CIを導入する

*   コミットごとにテストを実行したい
*   git pushをしたらテストを実行する仕組み

### ターミナルからテストを実行する

*   まずはターミナルから実行できるようにする所から
*   xcodebuild を使う(or xctest)

### Travis CI

*   [Travis CI &#8211; Free Hosted Continuous Integration Platform for the Open Source Community][9]
*   無料でiOSのテストができる

### [Coveralls][10]

*   コードカバレッジを図れるサービス
*   コードカバレッジの%を教えてくれるサービス

### まとめ

*   テストを書いたらCIで回す

* * *

## デザインのわかるエンジニアになる &#8211; fladdict

*   デザインはスタイリングではない
*   デザインのメイン業務は設計、整理すること
*   デザインはエンジニアリング
*   使うのが視覚言語というようなもの

&#8211;

*   目的 &#8211; 目的を提案・解決する
*   手段 &#8211; 満足感を与える、UXデザイン

みたいな複雑な問題を整理することがデザインの目的。

### グリッドを設計する

*   物事をおく配置を整理すること
*   ベースクラスを作って、継承してやっていくみたいな感じ

### フィードバック

*   関数の返り値、正否の判別をつけてあげる事
*   methodが成功したら真偽値を返すのと同じ

### iOS7のデザイン

#### フラットデザイン

*   フラットデザインなのにレイヤー構造を持ってる
*   レイヤーの構造を伝える 
    *   ジャイロを用いたパララックスエフェクト
    *   曇りガラス状のブラー 
        *   一時的なステートを表現してる
        *   後で戻れることを保証してる
        *   型宣言とかみたいな
    *   画面の遷移 
        *   ズームイン/ズームアウト

### 視覚的言語とは

*   非言語的な資格情報も、言語として伝える

#### アニメーション

*   一瞬の変化は近くできない
*   アニメーションを付けることで変化に気づかせる
*   よくない例としてのiOS7の電卓の話 `2500 / 50`
*   チャンネルが増えることで理解しやすくなる
*   メールのアニメーション中のキャンセル

### デザインとは

*   しっかりしたデザインは位置、色、動画、音に意味と目的がある
*   制約の上にデザイン(スタイリング)を載せる

* * *

## JavaScriptCore.frameworkでできること &#8211; kishikawa

> [kishikawakatsumi/downloadable-ios-apps][11] 

*   ドキュメントがない
*   headerを見るだけ

### JavaScriptCore.framework の概要と使い方

*   Objective-Cか < &#8211; > JavaScriptからObjective-C
*   ブリッジするフレームワーク
*   グローバルの空間で関数を定義したら`JSContext` から名前で引ける

#### 構成要素

*   `JSVirtualMachine` 
    *   シングルスレッドのJS仮想マシン
    *   自動で作れる
    *   複数作ればマルチスレッドみたいなことができるかも
*   `JSContext` 
    *   JSの実行コンテキスト(オブジェクトの管理)
    *   名前空間をわけるのにも使える
*   `JSValue` 
    *   JSオブジェクトのラッパー
    *   JavaScriptでの値をObjective-C的に持てるオブジェクト

#### Objective-C -> JavaScript

*   一部のロジックをJavaScriptで記述 
    *   ロジックを動的に変えられる
*   JavaScriptで書かれてたライブラリを使う 
    *   https://github.com/nitoyon/text-hatena.js
    *   はてな記法パーサとかJavaScriptライブラリとして使えるものをObjective-Cで使える
    *   JSONの圧縮 JSONHとかRJSONとか

#### JavaScript -> Objective-C

*   `JSExport` というプロトコルが大事
*   JavaScriptに公開するObjective-Cのインターフェースを定義する
*   `JSExport` が適応されてないメソッドはJavaScriptから呼べない

### Objective-C Runtime APIの活用方法

*   宣言しないと呼び出せないのをRuntime APIを使って動的にプロトコルを適応する
*   `class_addProtocol` で `JSExport` を適応する

### JavaScriptBridgeの紹介

*   [kishikawakatsumi/JavaScriptBridge][12]
*   UIKitとかの `JSExport`のプロトコルのブリッジを作った感じ
*   JavaScriptからUIKitのUIを作れる

### runtime

*   メソッドの転送
*   NSProxy

### クラスにメソッドを追加

*   クラスのメタクラスに対してメソッドを追加するとクラスメソッドを追加できる
*   クラスはそれぞれメタクラスを持ってる
*   `is_metaClass` を使ってid型のオブジェクトがクラスなのか判別できる
*   `_obj_msgForword` でbridgeしてメソッドを転送させる

### JSB.require

*   jsのファイルをインポートできるようになってる
*   ファイルをわけて書くこともできる

* * *

## LT

### iOS7のbackboarddバグ &#8211; akisute

<blockquote class="twitter-tweet" lang="en">
  <p>
    検証用死霊です <a href="https://t.co/XY3SXS3jcc">https://t.co/XY3SXS3jcc</a> <a href="https://twitter.com/search?q=%23confwd&src=hash">#confwd</a> プレゼンはどっかにアップしておこう＼(^o^)／
  </p>
  
  <p>
    &mdash; akisute (@akisutesama) <a href="https://twitter.com/akisutesama/statuses/429538944103878656">February 1, 2014</a>
  </p>
</blockquote>



*   iOS7 backboardd のバグ
*   Springboardのバックエンド
*   初期インストールして、URLスキーム経由で起動すると10秒固まる
*   回避方法はありません

### HBFavの実装とこだわり &#8211; naoya

*   HBFav &#8211; はてなブックマークビューアー
*   RubyMotionで作成
*   リソースの非同期ロード &#8211; AFNetworking
*   Direct Drawing 
    *   直接 drawRectで描画する
*   追加した時に上にセルを追加する 
    *   `contentOffSet` を保持して、再計算して移動させる
*   リアルタイムのように見せるため、Web Hookを使ってremote pushしてる 
    *   remote pushを受け取ったらRSSを見て更新する
*   RubyMotion でできることObjective-Cできることは大体似たような事

### IRKitについて -maash

*   オープンソースの赤外製学習リモコン
*   wifiを伝えるときはモール信号で伝える
*   iOS SDKがあるので、いろいろ出来る

### ロック画面をハックしてみる

*   mixi
*   ロックスクリーンハック &#8211; Androidでは色々
*   iOSでやるには
*   background modeを使う 
    *   MPMoviePlayerController
    *   AVAudioSessionでバックグラウンドで動くようにする
*   音楽イベント 
    *   ロックスクリーンから音楽ボタンを受け取る
    *   `RemoteControlEvents` で広会える
    *   コントローラーのイベントを入力にする
*   アートワーク 
    *   ボタンに反応してアートワークを変えられる

リジェクトされます

### Github活動初めて思ったこと

> [HBFav実装のこだわり #confwd // Speaker Deck][13] 

*   歩きスマホ防止ライブラリ
*   TweetBotみたいな画像を投げるライブラリ &#8211; YSViewer

### AV Foundation

*   心霊動画アプリを作った話
*   細かい制御するのにAV Foundationが必要
*   動画に対して、画像やナレーションを合成する
*   ワイプはアファイン変換で合成される
*   スローモーションは時間を2倍にして出力する

### WebViewを活用するアプリ

> [WebViewを活用するアプリの作り方 LT @ Conference With Developers 2 // Speaker Deck][14] 

*   `UIWebView`でHTMLアプリを作る
*   JavaScriptとネイティブをどうやってやりとりする
*   Apache Cordova 
    *   UIWebViewを隠蔽
    *   プラグインアーキテクチャ
*   WebViewJavaScriptBridge 
    *   WebViewを使ったJavaScriptとのやりとり
*   JavaScriptCore 
    *   `KVC` で WebViewから `JSContext` を取得できる
    *   非公開APIを使う

### iOS7のUITextViewのいいところ探そう

*   画像を簡単に入れられる
*   文字にエフェクトが書けられる
*   `NSHTMLTextDocumentType` HTMLをUITeextViewに表示できる
*   UITextKit

### iBeacon

*   BTLEを使った近接検知技術
*   Beacon受信機はiOS端末、送信は専門端末(or iOS端末)
*   近傍/近い/遠い の3段階
*   [iBeacon Advent Calendar 2013 &#8211; Qiita [キータ]][15]
*   [iBeacon bot (iBeacon_bot) on Twitter][16]

### RubyMotionの活用

*   Objective-CとRubyMotionの比較
*   Rubyなのでテキスト処理が簡単に書ける
*   RubyのコードをClangを使ってアセンブリとオブジェクトにする
*   デバッグモードだとLLDBが起動してrubyのコードに対してブレークポイントを貼れる
*   処理速度は2倍程度違うけど、テキスト処理が強い

### iOSでポエムつづろう

*   pplog.net のポエムの話
*   WebViewを使ったアプリ
*   RubyMotionを使ったアプリ

### CocoaPods のプラグインを作った話

> [CocoaPods の Plugin を作った話 // Speaker Deck][17] 

*   `pod-try` もCocoapodsのプラグインとして実装されてる
*   `pod browser` コマンドでpodを検索したり、直接Githubのページを開ける
*   [dealforest/cocoapods-browser][18]
*   `cocoapods-` となってるのは公式じゃないプラグイン

### メタプログラミングObjective-C

*   `@protpery(nonmatic ,weak) id hoge;` を動的に生やす
*   AssociatedObject を使って動的にプロパティを作る
*   WeakHashTableをStrongでつけて、そこにプロパティを突っ込んで行くとweakなものを扱える
*   プリミティプは同じようにNSValueを追加する

* * *

メモ : Markdown life

 [1]: http://confwd2.peatix.com/ "Conference With Developers 2 | Peatix"
 [2]: http://www.ustream.tv/recorded/43319245 "confwd"
 [3]: http://www.ustream.tv/recorded/43323576 "confwd"
 [4]: http://www.slideshare.net/ninjinkun/i-os-30692824 "GitHub活動を通して個人のキャリアを積みつつ仕事の成果を出す方法"
 [5]: https://github.com/ninjinkun/NJKWebViewProgress "ninjinkun/NJKWebViewProgress"
 [6]: https://github.com/ninjinkun/NJKScrollFullScreen "ninjinkun/NJKScrollFullScreen"
 [7]: https://twitter.com/CocoaPodsFeed "@CocoaPodsFeed "
 [8]: https://speakerdeck.com/ishkawa/objective-c-programming-guide-for-open-source-software "Objective-C Programming Guide for Open Source Software // Speaker Deck"
 [9]: https://travis-ci.org/ "Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community"
 [10]: https://coveralls.io/ "Coveralls"
 [11]: https://github.com/kishikawakatsumi/downloadable-ios-apps "kishikawakatsumi/downloadable-ios-apps"
 [12]: https://github.com/kishikawakatsumi/JavaScriptBridge "kishikawakatsumi/JavaScriptBridge"
 [13]: https://speakerdeck.com/naoya/hbfavshi-zhuang-falsekodawari-number-confwd "HBFav実装のこだわり #confwd // Speaker Deck"
 [14]: https://speakerdeck.com/cockscomb/webviewwohuo-yong-suruapurifalsezuo-rifang-lt-at-conference-with-developers-2 "WebViewを活用するアプリの作り方 LT @ Conference With Developers 2 // Speaker Deck"
 [15]: http://qiita.com/advent-calendar/2013/ibeacon "iBeacon Advent Calendar 2013 - Qiita [キータ]"
 [16]: https://twitter.com/iBeacon_bot "iBeacon bot (iBeacon_bot) on Twitter"
 [17]: https://speakerdeck.com/dealforest/cocoapods-false-plugin-wozuo-tutahua "CocoaPods の Plugin を作った話 // Speaker Deck"
 [18]: https://github.com/dealforest/cocoapods-browser "dealforest/cocoapods-browser"