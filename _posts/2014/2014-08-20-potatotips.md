---
title: "【第8回】potatotipsでPromiseについて発表してきた"
author: azu
layout: post
categories:
    - イベント
tags:
    - イベント
    - iOS
    - Android

---

# 【第8回】potatotips

[【第8回】potatotips (iOS/Android開発Tips共有会) - connpass](http://connpass.com/event/7729/ "【第8回】potatotips (iOS/Android開発Tips共有会) - connpass") に
参加してきました。

自分は[Objective-CでのPromiseと非同期処理](http://azu.github.io/slide/potatotips/promisekit.html "Objective-CでのPromiseと非同期処理")について発表しました。


## Xcode で gulp を使うお話 - saku2saku

- gulpを使った話
    - RettyはWebViewを使ったハイブリッドで利用
- ターミナルから毎回コマンド打つのが面倒
- Xcode で gulp を実行
    - ビルドフェーズに実行する
    - 入れてない人に向けにちゃんと分岐するべき
    - マルチバイトが上手くいかない
    - ちゃんと環境変数の内容がターミナルと違う

---

## Account Manager and Sync Adapter - Shungho Arai

- Account Managerとは
    - アプリのアカウントの総合窓口
    - 一度Googleアカウントでログインすると共通して使える
    - 他のアプリからトークンだけで利用できるようになる
- Sync Adapterが利用することができる
    - アプリとは別のプロセスで同期ができる
    - バックグランドで定期的にデータの同期
    - Sync AdapterでFull Syncとか差分同期とかは自分で書く感じ

---

## Swiftのライブラリの作成/利用しよう - tokorom

> [potatotips#8 Swiftのライブラリを作成/利用しよう // Speaker Deck](https://speakerdeck.com/tokorom/li-yong-siyou "potatotips#8 Swiftのライブラリを作成/利用しよう // Speaker Deck")
- Swiftで書かれたライブラリを使う方法
    - Quick - BDDテストフレームワーク

[Quick/Quick](https://github.com/Quick/Quick "Quick/Quick")
    - xcodeprojファイルを自分のプロジェクトに追加してLinkの設定
    - Link Binary With librariesに追加する
- CocoaPodsが使えない
    - 今のところgit submoduleでcloneして持ってくる
    - 更新可用性
- Swiftのライブラリを作ってみる
    - プロジェクトを作るときにCocoaTouchFrameworkを選ぶ
    - ライブラリ名.h ができるのでそこに入れる
    - ビルドに依存してるものをPublicにする必要がある

---

## †黒魔術† - kaiinui

> [Black Magic in Java // Speaker Deck](https://speakerdeck.com/kaiinui/black-magic-in-java "Black Magic in Java // Speaker Deck")
- Javaの黒魔術 : Annotation
    - 宣言的
    - コードと宣言を分離出来る
    - コードが短くなったり
- 色々なライブラリがAnnotationを使ってる
- 自作Annotation
    - AspectJ
    - java.lang.anottaion
- Hugo
    - Annotationをつけるだけでログを出すことができる

---

## モバイルアプリ開発者のためのmitmproxy入門- hydrakecat

> [モバイルアプリ開発者のための mitmproxy 入門 // Speaker Deck](https://speakerdeck.com/hkurokawa/mobairuapurikai-fa-zhe-falsetamefalse-mitmproxy-ru-men "モバイルアプリ開発者のための mitmproxy 入門 // Speaker Deck")
- mitmproxy
    - MITM型のプロキシ
    - SSHをサポートしてる
- セットアップは簡単
    - pip install mitmproxy
- mitmproxyでできること
    - 通信のキャプチャ
    - 端末で行ってる通信全部見られる
    - 通信の改ざん
    - クライアントサイドリプレイ
    - スクリプト
         - Pythonで書いたスクリプトが動く
         - 不安定なネットワークの再現

---

## Today Extension Tips - kishikawa katsumi

- 番組表を通知センターに出すExtension
- Extensionは単体だと配布できなくてコンテナアプリが必要
- Data Sharing
    - UIPasteBoard - 基本的に1つしか保存できない
    - NSuserDefaults
         - App groupをONするとApp Groupで共有できる
         - initWithSuiteName:で共有用のUserDefaultを保存出来る
    - KeyChain
         - トークンとかを保存するのに
- できない/できること
    - スクロールができない
    - Touch Eventは取れる
    - 幅は固定、高さは端末固有
    - カスタムフォント
    - WebViewもいける
    - MapViewは強制終了

---

## GooglePlay Developer APIを使ってみた - sakebook

- Publishing APIを試す
    - OAuth2.0認証
    - APKのアップロードができる
- Edits
    - APKのアップロードや説明文の変更等大体の事ができる
    - 動画とタイトルを含めた説明文の編集
    - スクリプトで公開まででできる

---

## YapDataBase - Keisuke Kimura

- SQLiteベースのデータベース
- [yaptv/YapDatabase · GitHub](https://github.com/yaptv/YapDatabase "yaptv/YapDatabase · GitHub")
- Concurrety
- KVS
- init
- connect
- read
- write

---

## アプリのリリースしてますか - __gfx__

> [Androidアプリのリリースしてますか #potatotips // Speaker Deck](https://speakerdeck.com/gfx/androidapurifalseririsusitemasuka-number-potatotips "Androidアプリのリリースしてますか #potatotips // Speaker Deck")


- リリースエンジニアリングのタスクは複雑
    - やることが多くて大変
    - 限定公開リリースをするともっと増える
- タスクを分解してみる
- 署名の問題
    - 署名の設定をbuild.gradleに書くのが面倒
    - プロジェクト毎に書かないといけない
- Google Playへのアップロード
    - Jenkinsのビルド結果からapkファイルを取得
    - 取得したapkをアップロード
- 自動化
    - バージョニングの問題
         - バージョニングはJenkinsにやらせる
    - 署名の問題
         - build.gradleいじりたくない
         - jarsignerで署名を付けられる
    - アップロードの問題
         - Google play Developer APIを使う
         - 公開設定とかもリポジトリに入れる
         - リポジトリにスクリーンショットや説明を管理できる
         - pull request出来る世界
         - gradle plugin等がある
- ちょっとずつ自動化できている

---

## SQLiteで高速全文検索 〜日本語編〜 - shoby

- iOSアプリで日本語を全文検索
- SQLiteの全文検索拡張
    - iOS6から普通に使える
    - FTS4テーブル
    - term
         - termに対してマッチするものを取得出来る
    - phrase match
         - 語句が連続でフレーズとなってるものにマッチ
    - 特殊なQuery
         - 特定のカラムに
    - 日本語はトークン分割ができなくて対応してない…
- 日本語のトークン分割
    - FTSのテーブルには半角スペースでトークンを区切る
    - その形式に沿って日本語のトークンデータを追加する
    - CFStringTokenizer(MeCab)でトークナイザーで分割する
- マッチ度が高い順に拾いたい
    - 独自のSQL関数を作れる
    - `match_info()` からマッチスコアを返す関数を作る
    - C言語で拡張を書く
- Likeは小さいものだといける

---

## Picassoを半年使ってみた - ninjinkun

- AndroidのWeb画像ローダー
    - Volley
         - 小さめで、独自の機能を追加するのが面倒
    - Universal Image Loader
         - 多機能
    - Picasso
         - 安心のSquare社
- Picasso
    - メソッドチェーンの流れるインターフェース
    - キャッシュデフォルト値
         - アプリの15%のメモリキャッシュ
    - Resize機能
         - 縮小して読み込みを自動でやってくれる
    - 素のImageViewが使える
         - ImageViewを継承してないので、後から突っ込める
    - 読み込み時のフェード
         - デフォルトでフェードが対応してる
    - ローカルの画像も取得できる
         - Androidはいろんなところから画像が来るのでPicassoに投げられる
- ハマりどころ
    - okhttpを入れないと微妙
    - ネットワーク回線によってスレッドプールのサイズを変更してる
- まとめ
    - picassoは手軽で使いやすい
    - okhttpは一緒に使いましょう

---

## Run Script Tips - hosokawa

- XcodeのRun Scriptをレビューしやすくする
    - そのまま入れるとpbxprojに一行で入る
    - 独立したスクリプトファイルを作って、intermmediatesフォルダにいれる
- Todoをビルド警告にする
    - RunScriptでWarningに書き換えればビルド警告に出来る
- Archieveビルドした時にできる。xcarchive等のパスを知る
    - どこから取ってくるのが面倒臭い
    - 環境変数に`ARCHIEVE_PATH`等が入ってる
    - post-actionでファイルに書き出して、別途スクリプトで読み込んで使うのが楽
- Icon Versioning
    - アイコンに任意の文字列を文字列を合成する
    - ImageMagicとか使って画像を合成

---

## 誰もしたがらない話をしたい 翻訳リソース編 - __chocomelon

- pixivは海外ユーザーが多い
- 半分ぐらいは海外ユーザー
- pixivの翻訳フローの改善
    - それぞれの言語のシートがきてた
- 解決方法
    - 翻訳者がコミット
    - 一元のスプレットシート管理
    - 外部に丸投げ

---

## Objective-CでのPromiseと非同期処理 - azu

> [Objective-CでのPromiseと非同期処理](http://azu.github.io/slide/potatotips/promisekit.html "Objective-CでのPromiseと非同期処理")
- PromiseKitとPromiseについて
- Boltsは中でロックをしていて、Promiseは基本的にロックしない
- PromiseKitはJavaScriptのPromises A/+を参照してる
- 何でもPromiseは難しいので適材適所でやろう

---

## Offlineのススメ - dagezi

- オフラインアプリ
- 素早い起動
- 低消費電力
- 電話がなくても使いたい
- 技術要素
    - データベースに貯めこむ
    - SyncAdpterは使ってない
    - ユーザーにSync動作させる
         - バックグランドで勝手に同期してると気づかないかも

---

## Introducing CloudKit - nakajijapan

- CloudKit
    - iCloud serverへのデータ転送を管理
    - iCloud アカウント
    - Mac OSとiOSのサポート
    - PublicとPrivat
- CloudKit objects
    - データベース、レコード、レコード同士の関連性、アセット
- Records
    - 作成
         - CKDatabaseで作成 + completeHandler
    - 削除
         - CKDatabaseで削除(delete) + completeHandler
    - 更新
         - Fetch + Update
    - 読み込み
         - NSPredicate、NSSortDescriptorsを指定
         - `performQuery`で指定する
- 問題
    - ページングの仕方
    - litmitやoffsetがない
    - CKQueryCursorで取得してきた位置を決める
    - CKQueryCursorでページングできそう
- まとめ
    - ソーシャル系サービスには向いてない?
    - バックアップ機能がない
    - 構築は簡単

---

## Handoff動かない - sonson

- yosemite beta6 にしたらhandoffが動かなくなった
- OS XとiOSで作業を引き継いだりできる機能
- バッドノウハウ
- 動かなくなったら
    - iCloudをすべてのデバイスをサインアウト
    - FaceTime, iMessageのサインアウト
- サイトイン
    - Macからサイトインする
    - iCloud -> FaceTime -> iMessageの順でサイトインする
    - iOSの方もiCloudにサイトインする
- 独自アプリ
    - 独自アプリ間はAppStore用の署名しないと動かない
    - ブラウザからのhandoffにはSSLの証明書が必要
    - フォアグランドのアプリじゃないと通信しない
    - iOS同士は比較的楽

---

## メモ

- OmniOutliner
