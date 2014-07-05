---
title: 'Testing Casual Talks #1 アウトラインメモ'
author: azu
layout: post
permalink: /2013/0724/res3351/
dsq_thread_id:
  - 1526324708
categories:
  - イベント
tags:
  - test
  - イベント
---
# Testing Casual Talks #1

[Testing Casual Talks #1 : ATND][1]

UST : [DeNA Technology Seminar DeNA Technology Seminar ][2]

## Software Engineer in Test at DeNA &#8211; @ikasam_a

> [Software Engineer in Test at DeNA][3] 

### SWET(Software Engineer in Test)

*   テストに関する開発者の役割
*   テストフレームワークを書く
*   テストをビルドするための環境づくり
*   テストを書く<blockquote cite="http://googletesting.blogspot.jp/2011/02/how-google-tests-software-part-two.html"

  
title="Google Testing Blog: How Google Tests Software - Part Two">
The SET or Software Engineer in Test is also a developer role except their focus is on testability. They review designs and look closely at code quality and risk. They refactor code to make it more testable. SETs write unit testing frameworks and automation. They are a partner in the SWE code base but are more concerned with increasing quality and test coverage than adding new features or increasing performance.  
<cite><br /> <a href="http://googletesting.blogspot.jp/2011/02/how-google-tests-software-part-two.html">Google Testing Blog: How Google Tests Software &#8211; Part Two</a><br /> </cite> </blockquote> 

で定義に触れられている

*   [Google Testing Blog: How Google Tests Software &#8211; Part Two][4]

### 開発者の生産性を向上

*   たんぽぽチーム みたいに、プロダクティビティを向上させる役割 

### なぜSWETになったか

*   普通のWeb/組み込み/アプリを書いてた
*   テストを書くのが当たり前の環境になってた
*   RSpec/Webrat/Selenium/Cucumber 
    *   この時にテストをサポートするものを書く必要性がでてくる
*   C++/VC++ でのテストフレームワークで満足できるものがなかった 
    *   monkeypatch とか色々
*   sexyhook 
    *   Windows32APIのモック

### Automation

*   テストだけじゃなくてモジュール管理とか色々

### QA Process

*   従来型のプロセス 
    *   QA部門と開発部門に差を感じた
    *   開発部門にQA部門があるといいのでは
*   QA Team at DeNA 
    *   やってることはSWET

### mobage プラットフォームのテスト

*   インターフェースは全てテスト
*   インテグレーションのテストが足りてない 
    *   end to endのテストから

#### 作ったもの

*   テスト用のブラウザゲームの作成
*   スマートフォンのブラウザエミュレータの作成

### グレイボックステスト

*   ブラックボックスとホワイトボックステストの混ぜ
*   それぞれのテスト方式ではできないところまでできる

### テストコード

*   テストコードはキレイに
*   読みやすい/書きやすい/メンテナンスしやすい

### まとめ

*   E2Eテストをベース
*   QAとDevの溝を小さくする
*   SWET

### Q.A 何の生産性?

Q. プロダクトコードのリファクタリングとテストコードのリファクタリングは違う、という感覚があるのか？

A.あると考えている. プロダクトコードは要件に左右される部分がある

* * *

## How to make easy and casual CI management &#8211; @mrkn

*   Cookpad

### おさらい

*   3ヶ月で1000個もテストが増えていた
*   台数を増やして、実行時間減らした

### 今回

*   13177 examplesあるけど10分以内に終わる
*   Ruby2.0を使ってるのでテストが早くなった
*   テストは増え続けてる…

### 開発プロセス

*   [cookpad/chanko][5] を使ってプレでためして、正式にマージする
*   一つの巨大なアプリケーションなので、テストも一緒に増えている

### 一つのアプリから、複数のアプリに分ける

*   一つの巨大なアプリではなく複数のアプリに分ける
*   アクセスはAPI経由で行う
*   SOA

### Jenkins

おむきんす

*   Nodeで分けて、日中しか起動しないNode、深夜だけ動くNode等分けてる
*   Node Label &#8211; サービス毎にlabelをつける
*   CookPadのCI管理は2人でやってる

### CI管理体制

*   管理する人以外もCIのJobsとかいじれるようにしたい
*   Travis CIみたいな、リポジトリのスイッチでJobsを追加できる
*   `.whitesnake.yml` でテストの設定

Githubで公開中

*   [mrkn/whitesnake][6]

* * *

## 私にとってのテスト &#8211; @t_wada

> [私にとってのテスト][7] 

### 品質とは何か?

*   &#8220;品質とは誰かにとっての価値である&#8221;
*   なんとか `bility` はたくさんある

### 質

*   「品質」っちゅうから難しく聞こえてしまうんや。「質」と言えば皆わかってくれる。」

### QWAN

*   名前は知らなくて質がわかる
*   2つのものを見比べた時に、どちらが質がいいのか

### TDDの「T」

*   TDDの目標は「動作すべききれいなコード」
*   < -> 「バグを見つけるつもりで実行するコード」(創造的破壊行為)

### Testing vs Checking

*   TDD は Checking
*   TDDの「T」はTestじゃない?
*   BDDという用語がでてきた歴史 
    *   RSpec的 BDD
    *   シナリオ BDD

### TDDでの良いテスト

*   Independent / 独立している事
*   Repeatable / 繰り返し可能である事

### 才能と技術

*   テストと品質
*   テストは技術

#### シンプルさ

*   全く同じ動きをするコードがあるとき、シンプルな方が優れてる
*   技術でシンプル差を求めていく

### 私にとってTDDとは

*   凡人が技術で頑張るための事
*   動くコードに触れる事に積極的になれる事
*   変化を妨げないテスト、変化を後押しするテスト
*   TDD とは&#8221;悪あがき&#8221;である

TDDはスキルである

* * *

## Casual CI Server &#8211; @r7kamura

> [Casual CI Server // Speaker Deck][8] 

### Jenkins Clones

*   カジュアルさに欠ける
*   Jenkins 
    *   Java
*   CI Joe 
    *   Ruby(sinatra)
*   Ukigumo 
    *   Perl
    *   クライアントとサーバに分けてる
    *   クライアントで実行して、サーバは保存に専念

### Altria

[r7kamura/altria][9]

*   Jenkinsほど高機能じゃなくていい
*   プラグインは欲しい
*   Rails4!
*   Server + Worker + Cron
*   Rails4,Redis,MySQL
*   プラグインはgem形式で書く

#### API

*   HTML
*   JSON
*   Streaming API

#### plugins

*   Railsのプラグインのシステムを利用

* * *

## DevQUT! &#8211; @snsk

> [2013-05-11 &#8211; tokyo Software Testing Day OUT,][10] 

*   品質保証という概念が重たい感じがするので、軽くしたい 
    *   無駄なことをしたくない
*   重たい品質保証は多くの壁を作りがち 
    *   開発を信頼しないという壁
    *   ユーザを信頼しないという壁
    *   ツールを信頼しないという壁

### 壁を壊そう

*   DevQUT=Dev+QA+User+Tools

* * *

## serverspecによるテスト駆動サーバ構築＋CI &#8211; @gosukenator

*   Puppetとかそういうツールがでてきたのでサーバをテストする自然な流れ

### サーバのテスト

*   SSHとLocalのひな形を生成してくれる
*   Puppetを書きながらテストを通していくデモ

### CI

*   Docker + Altriaで CIのデモ
*   Dcokerは環境のリセットがお手軽

テスト駆動なサーバ構築 + CI

## おわりに

*   メモ : Mou

 [1]: http://atnd.org/events/40914 "Testing Casual Talks #1 : ATND"
 [2]: http://www.ustream.tv/recorded/36287187 "DeNA Technology Seminar DeNA Technology Seminar "
 [3]: http://www.slideshare.net/masaki/software-engineer-in-test-at-dena "Software Engineer in Test at DeNA"
 [4]: http://googletesting.blogspot.jp/2011/02/how-google-tests-software-part-two.html "Google Testing Blog: How Google Tests Software - Part Two"
 [5]: https://github.com/cookpad/chanko "cookpad/chanko"
 [6]: https://github.com/mrkn/whitesnake "mrkn/whitesnake"
 [7]: http://www.slideshare.net/t_wada/testing-casual-twada "私にとってのテスト"
 [8]: https://speakerdeck.com/r7kamura/casual-ci-server "Casual CI Server // Speaker Deck"
 [9]: https://github.com/r7kamura/altria "r7kamura/altria"
 [10]: http://d.hatena.ne.jp/shinsuku/20130511 "2013-05-11 - tokyo Software Testing Day OUT,"