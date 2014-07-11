---
title: Frontrend Vol.4 アウトラインメモ
author: azu
layout: post
permalink: /2013/0209/res3182/
dsq_thread_id:
  - 1073512654
categories:
  - javascript
  - イベント
tags:
  - javascript
  - イベント
---
Frontrend Vol.4 に参加してきたのでその時のメモです。

# CA Frontrend v04

*   [Frontrend Vol.4 powered by CyberAgent, Inc. : ATND][1]
*   場所: サイバーエージェント本社 13F セミナールーム （東京都渋谷区道玄坂一丁目12番1号渋谷マークシティ ウエスト13階）
*   <del>Frontrend Vol.4 powered by CyberAgent, Inc. に回答するとスライドがある</del>

## JavaScript Development Tools – JavaScript開発の効率アップ &#8211; Layzie

*   JavaScript開発に役立つGUI
*   JavaScript開発に役立つCUI

### Chrome Developer Tools

*   ショートカット
*   ブレークポイント 
    *   DOMの属性が変更
    *   Throw Error
    *   XHRでURLに通信した時にbreak
    *   etc…
*   Timeline
*   Profile

### chorme://net-internals

*   SPDYなどの通信を見られる

### Charles

*   デバッグ用Proxy
*   Fiddler
*   MapLocal 
    *   URL先のファイルとローカルファイルをすり替えられる
    *   AutoResponder的な機能
*   Throttle 
    *   回線のエミューレート
    *   3G相当の通信の遅さをサイト

### Dochub

http://dochub.io/#css/

*   JS/CSS APIの検索サイト
*   MDNのコンテンツの検索

### jsFiddle

*   jsbin/jsdot.it 系のサイト
*   Debug on Mobile 
    *   モバイル用のデバッグURLがある

### jsPref

*   JavaScriptのベンチマークを見るサイト

### browsering

*   substack
*   ブラウザのテスト
*   $20/month
*   ci.testing.com

### JSHint

*   JavaScriptのLintをかけるツール

### jq

*   jsonのsed
*   jsonをqueryでいじれる
*   jsonを整形表示される

### Doctor JS

*   ctag的なJavaScriptのタグファイルを作成するツール
*   静的解析したファイルを作ってエディタ

### Yeoman

*   パッケージ管理
*   土台作るCLI
*   scaffold
*   grunt server

Nodefront という類似なCLIもある

## jQuery Performance Tips – jQueryにおける高速化 &#8211; @pocotan001

マシンの仕事を少なくすることが、高速なプログラムになる

### jQueryライクを保ってパフォーマンスチューニング

*   ファイルサイズ
*   セレクタ
*   リフロー影響

### ファイルサイズ

*   jQuery 1.9と 2.0をIEの条件コメントで読み込むものを分ける
*   スタート時には最小構成で始めるほうがいい

### jquery migrate plugin

*   jQuery 1.9で削除されたAPIを補完するプラグイン
*   非推奨のことについても警告してくれる
*   警告の詳しい内容はGithubに

### jQuery セレクタ

    $("#target p");
    

`$("#target").find("p")`

    $('#tareget).find('p:first');
    

*   QuerySelectorAll -> 失敗
*   getElementTagName
*   jQueryパース

次のように分けるか、`:first-child` を使う

    $('#tareget).find('p').first();
    

### リフロー

HTML &#8211; DOM &#8211; レンダーツリー &#8211; CSSOM &#8211; CSS

描画のフローは一度ではなく、段階的に描画していってる

*   CSS Reflow
*   Chrome Devloper Tools &#8211; Timelimeで可視化できる

DOMツリーとレンダーツリー

*   DOMツリーにはあって、レンダーツリーにはないものも 
    *   display : noneなどされてる要素はレンダーツリーには出てこない
    *   display : blockにして見えるようになった時、レンダーツリーに出現する
    *   これがリフローに関係する

同じリフローが起きる処理を2回呼んだ場合は、ブラウザがクッションを挟んで1度に済ませたりする

    $('p').css('margin' , '5px');
    

#### リフローのトリガー

*   ユーザー入力
*   positionの変更

### リフローを減らす

*   hideにしてから変更すればリペイントはまとまる
*   $.cssはオブジェクトで指定したほうがいい。
*   offset()等の計算は変数に入れて使いまわす

の中にscriptがある場合

表示 -> JS -> 変更

でdocument.readyで動かす

JS -> 表示 ->

### ボトルネックを解消をする

*   描画コストの高いCSS
*   アニメーション
*   ループ

#### Chrome Cannaryを使う

*   cannaryにしかない機能もある
*   Timelimeで表示する内容のしきい値を指定できる(ALl , 15ms)
*   10ms以内でするのがモバイルだとちょうどいい
*   Timelineの山がコストの大きさ
*   設定 -> Rendering 
    *   レンダリングの可視化
    *   FPSの表示
    *   連続的なレンダリングの可視化

### jQueryアニメーションとCSS3

*   CSSのほうがネイティブに近いので基本的には早い
*   requestAnimationFrame

### まびく

処理を間引いて行う

*   throttle
*   debounce

### その他

*   スタイルの変更を末端要素で影響範囲を抑える
*   アニメーションはfixedにしておく
*   Tableレイアウトをしない 
    *   テーブルは特別的な感じなので

## Javascript – テストしやすいJavaScriptとテストについて &#8211; CSSRADAR

*   テストしやすいJavaScriptとは
*   ユニットテストツールとは

### テストしやすいJavaScriptとは

#### ベストプラクティス

*   オブジェクト指向JavaScript
*   デザインパターン
*   MV*構造
*   ユニットテスト

### リファクタリングを前提に考える

*   リファクタリングをする前提で書く
*   テストはリファクタリングを補助する
*   ロジックにもデザインがある

### テストしずらいコードを見ていく

*   テストしにくいコードからテストしやすいコードを学ぶ
*   QOF

### untestable code

*   50行の中に5つの役割がある 
    *   jQueryのready
    *   clickイベント
    *   フォームのインプット内容を取得
    *   appendでDOM捜査
    *   appendするHTML生成
    *   // XHR
*   コードの役割分担が複雑だとテストしにくいコードなる
*   コード間で密接な関係を持つとテストしにくくなる
*   これをリファクタリングしていく

### テスト駆動リファクタリング

*   テストはデザイン
*   パターンはよくある問題の解決する

### リファクタリング

*   まずは、テストコードからアプリケーションコードへアクセスできるようにする
*   init にとりあえず、以前のreadyの中身を突っ込む

QUnitを使ってテストコードを書いていく

*   名前空間があるか
*   getDataでユーザーが入力したデータを取得できてかをテストを書く
*   単一責任の原則 -> それぞれのユニットが正しいかを確認していく
*   setupで、ユーザーの入力を入れて、teardownでユーザーの入力を消す

### テストツール

#### Jasmine

*   BDD
*   descript 何が it どうなる

#### Qunit

*   jQueryが元々
*   安定している
*   test 振る舞い

#### Mocha

*   Node.jsが元々
*   assertion libraryを持ってない 
    *   chai , expect.js

#### PahntomJS

*   ヘッドレスブラウザ &#8211; test runnerとして使う

#### Grunt.js

*   ビルドツールで自動化

### Koans

*   テストで学ぶJavaScript

## Q&A

*   チームの他の人がテストしたがらない場合に何から始めるか? 
    *   テストは何を行うものが体験してもらう
    *   Koansみたいな動かしてみるところからやってみる

## jQuery to Backbone – アーキテクチャを意識したJavaScript入門 &#8211; ahomu

*   jQueryについて
*   Backbone.jsについて
*   jQuery to Backbone.js

jQuery replace backboneではなく、フォーカスを移すイメージ

### Backbone.js

*   軽量で短く
*   jQuery/Unserscore.jsに依存してる

### jQuery

*   DOM APIを隠蔽して簡潔に記述する
*   クロスブラウザ対応の諸問題を対処
*   プラグインが豊富

### jQueryが解決しない問題

*   アプリケーションコードの肥大化
*   スパゲティコード
*   テストしにくいコード

これをBackboneを使いつつ上手く解決していく

### MV*

*   TodoMVC 
    *   JavaScriptのMV*ライブラリを作ってサンプルのTodoアプリを作ってサイト
    *   30個以上ある

### Backbone.js

*   やさしい構造をサポート
*   Model/View/Router

### デザインパターン

*   デザインパターンから一般的なパターンを学ぶ

#### facade

#### Singleton

*   オブジェクトが1個にあって欲しい

#### FlyWeight

*   動的にインスタンスを生成し、同一のものは使いまわすパターン

#### Observer

*   イベントをつけて監視して発火する
*   1 vs 1

#### Mediator

*   イベントの仲介をするパターン
*   Pub/Sub &#8211; 3者

### jQuery to Backbone.js

View

*   見た目入力
*   DOM要素の管理
*   イベント制御

`Backbone.View.extend`

Model

*   取り扱うデータの単位
*   ストレージとの通信・動機
*   APIや情報のレコードを表現

`Backbone.Model.extend`

Collection

*   Modelが集合したリスト
*   リスト操作など
*   Modelとの通信、同期

`Backbone.Collection.extend`

Router

*   URLによるルーティング
*   hisotyr.pushState

### DEMO

*   Backbone.Viewを作成
*   renderメソッドを中執
*   テンプレートの分離

### モジューラーJavaScript

*   依存性の低さによる変更のひしゃすさ
*   継続的なメンテナンス性がアップする

### ModelとCollection

*   CollectionはModelsを束ねるもの
*   new Model()

### Collectionのソート

*   collectionのcomparatorにソート条件を書く
*   `sort` にイベントをつけておいて、sortされたらrenderメソッドを呼ぶようにする

### アーキテクチャを考えるためのBackbone.js

*   アーキテクチャを実際の実装から学べる

### その他

*   Marionette 
    *   Backboneをラップしてlistなどを追加してるフレームワーク
*   Chaplin
*   Thorax

### Q&A

*   Backbone.js 使ってよかったどうか? 
    *   Viewが多いけどRequire.jsで分けて読んでる
*   Backbone.jsでjQuery/Zepto.jsの選択肢、スマートフォンだとどっちを使う? 
    *   プロジェクトでバラバラ
    *   Zepto.js のほうがファイルサイズは小さい
    *   jQueryはベンチマークテストだと有利
*   モバイルでCanvas使い物になる? 
    *   Androidとかに苦しめられる

 [1]: http://atnd.org/events/35720 "Frontrend Vol.4 powered by CyberAgent, Inc. : ATND"