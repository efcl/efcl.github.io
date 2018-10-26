---
title: "Cybozu Meetup フロントエンド #2 アウトラインメモ"
author: azu
layout: post
date : 2018-06-21T20:26
category: イベント
tags:
    - JavaScript

---



[Cybozu Meetup フロントエンド #2 ](https://cybozu.connpass.com/event/91036/) に参加してきたメモ。

## 100人100通りのフロントエンド -  [@koba04](https://twitter.com/koba04)

> スライド: [100人100通りのフロントエンド - Speaker Deck](https://speakerdeck.com/koba04/100ren-100tong-rifalsehurontoendo)

- サイボウズのフロントエンド
  - フロントエンドのイメージは人によってバラバラ
  - サイボウズでは、Developer Network、ウェブサイト、セキュリティ、プロダクト、カスタマイズ、デザイン、テスト
  - 大規模、ウェブが主戦場でプロダクトの寿命が長い
  - 使われてるライブラリはプロダクトごとに違う
    - Closure、Reactなど
  - デザインとの関わり方も様々
  - プラットフォームとしてのウェブサービス
    - プラットフォーム向けのコード、APIとかSDKを作る
- Frontend Expert Team
  - 2017/10~
  - フロントエンドに関連する問題の解決、整備、情報発信、勉強会
- プロダクトチームと一緒に活動
  - ClosureとJavaScriptのエコシステムの組み合わせの補助
  - js-codeshiftで変換スクリプト書いたり
  - Flux化のモブプログラミング
  - ライブラリのバージョンアップに対応とか
- kintoneプラットフォーム
  - kintoneはHTML/CSS/JavaScriptでプラグインを作ってカスタマイズできる
  - プラグインエコシステムがある
  - プラットフォームとしてのフロントエンドという領域がある
- プラグインの作成の苦行
  - manifest.jsonを人力で編集
  - shellを使ってzipしてアップロード
  - => Windowsとかの人は大変
- [kintone/plugin-packer](https://github.com/kintone)を作った
  - 
  - [plugin-packerを使ってプラグインファイルをパッケージングしよう！ – cybozu developer network](https://developer.cybozu.io/hc/ja/articles/360000910783-plugin-packer%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E3%83%B3%E3%82%B0%E3%81%97%E3%82%88%E3%81%86-)
- デモ
- [@cybozu/eslint-config](https://github.com/cybozu)
  - 新しいプロジェクトを始めるときに毎回決めるの大変なので共有ルールを作った
  - プロジェクトごとにどのルールを使ってるかを見られるようにした
    - ESLint設定差異を見られるESLint rules matrix
- 社内の情報共有
  - フロントエンドランチとか勉強会
- OSS
  - react, babel周りへのコミット
- FAQ
  - Q. フロントエンドってどこまで?
  - A. それぞれのチームはフロントエンドとかサーバをわかれてない(ウェブアプリケーションエンジニアという人が両方やる形態)



------


## フロントエンドのレガシーコードをFluxできれいに - 前田 浩邦



- レガシーコード = なんとなくいじりにくいコード
- Kintoneのフロントエンド
  - Google Closure Tools
  - Closure Compiler
  - Closure Library
  - 45万行ほどのコードがある
- 開発環境をモダンに
  - 新規に作る画面はReact + Fluxになった
  - 既存のコードには手を入れにくい
    - 見通しが悪い
    - 変更の影響範囲がわからなくて不具合がでる
    - メンテナブルではない
- 既存のコード: Closure Component
  - Closure Libraryが提供するUIコンポーネントを組み合わせてUIを作る
  - Component内にすべてのロジックを実装するスタイルをとってる
    - XHR，描画、イベントハンドリング、バリデーション
  - 1つのコンポーネントを変更する理由が複数ある
    - => Fluxで分ければいいのでは
- KintoneにはすでにReactで新規画面を使っていたのでClosure Library実装のFluxが入ってた
- Flux ≠ React
  - React以外でも使える
  - Componentからロジックとかを分離するのが大事
- チームの振り返りでClosure Component + Fluxはどうですかと相談した
  - とりあえず試してみる
- モブプログラミングでFlux化を試す
  - チーム全員で1つの画面を見てFlux化する
- Flux化
  - 既存のコードはhandle*がいっぱいあり、それぞれがrenderしていた
    - 更新を行う箇所がコードに点在化していた
  - Flux化したコードは、handleChangeでrenderする
- FAQ
  - Q. モブプログラミングどれぐらいしたの?
  - A. 週一でやっていた
  - Q.独自実装のClosureのFluxは独自性があるですか?
  - A. ないです。Closureの世界なので独自に作らかないといけない



------

## [Renovate](https://renovatebot.com/)でストレスフリーなnpmパッケージ自動更新 -  [@teppeis](https://twitter.com/teppeis)

>  スライド: [Automated Dependency Updates with Renovate](https://www.slideshare.net/teppeis/automated-dependency-updates-with-renovate-102769685)



- 社内のnpmの更新をどうやっているか
  - 気づいた人が更新
  - 当番制
  - Greenkeeperなどのツールを導入
- Greenkeeperをいれてもアップデートがたまる
  - 自動マージするgreenkeeper-keeperとか
- [Renovate](https://renovatebot.com/)
  - Greenkeeperの類似サービス
  - カスタマイズ性が高い、自動マージなどがある
  - GitHub Appをインストールすると設定を作るPRを送ってくれる
- Sharable Configにも対応してる
  - [teppeis/renovate-config: My shareable config for @renovateapp](https://github.com/teppeis/renovate-config)
- Renovate
  - Auto Mergeに対応してる
  - 直接ブランチをpushしてmergeとかできる
  - patch updateならAuto Mergeとか細かい設定ができる
  - TypeScriptのminorはmajor扱いとか
  - パッケージをグルーピング化
    - babelとかでまとめてくれる(monorepo系)
  - スケジューリングも柔軟
  - 公開直後は不安定な可能性があるので避けたい
- Dpcler/CircleCIに対応してる
  - Node公式のDockerイメージが更新されたら、アップデートなどもできる
- 本体はオープンソース
  - セルフホスト
  - エンタープライズ
  - [renovateapp/renovate: Automated dependency updates. Flexible, so you don't need to be.](https://github.com/renovateapp/renovate)
- Renovateの始め方
  - base設定にtimezoneとスケジュール
  - devDepsがpinされるので無効化
- Renovateの問題
  - まだまだ普及してない
  - 設定のデバッグが辛い
    - ダッシュボードが先行提供されたのでよくなりそう
  - 中の人が1人なのが不安
- FAQ
  - Q. 自動マージでトラブった経験は?
  - A. 今の所ない。前提としてテストを書いてること
  - Q. セキュリティのアップデートだけを入れるとかできる?
  - A. 今の所仕組みはない。`npm audit`とかで組み合わせればできる?
  - Q. RenovateによってCIが渋滞する
  - A. 設定でconcurrentとかブランチ数とか、時間をずらすとかで工夫するとか
    - 設定で日中はupdateしないとかも設定できるので、他の作業の邪魔にならないようにできる





