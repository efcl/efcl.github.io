---
title: "React Meetup #4 でJavaScriptでのCQRSの話をしてきた"
author: azu
layout: post
date : 2016-09-27T22:54
category: イベント
tags:
    - JavaScript
    - React
    - イベント

---

[React Meetup #4](http://reactjs-meetup.connpass.com/event/39793/)に参加してきました。

その中で、複雑なJavaScriptアプリケーションを考えながら作る話という話をしました。

- スライド: [複雑なJavaScriptアプリケーションを考えながら作る話](http://azu.github.io/slide/2016/react-meetup/large-scale-javascript.html "複雑なJavaScriptアプリケーションを考えながら作る話")
- 補足資料: [azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること](https://github.com/azu/large-scale-javascript "azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること")

クライアントサイドJavaScriptでも.NETとかサーバサイドでの知見とかを取り入れて考えてみましょう的な話です。

# GraphQL and Falcor

> [Graph API: GraphQL and Falcor](https://quramy.github.io/graph-api-note/#/ "Graph API: GraphQL and Falcor")

- APIを叩くものを効率的にやるためのパターン
- REST API
- 欲しいものをほしいだけ取るパターン
	- Demand Driven Architectureという
- ReactとGrapQL
	- Relay
	- GraphQL Relay Specificationの実装
- データのとり方とコンポーネントが横並び
	- Relay
- Viewへのマッピングは自分でやる
	- Falcor


-----

# 複雑なJavaScriptアプリケーションを作るには - @azu

複雑なJavaScriptアプリケーションを考えながら作る話という話をしました。

- スライド: [複雑なJavaScriptアプリケーションを考えながら作る話](http://azu.github.io/slide/2016/react-meetup/large-scale-javascript.html "複雑なJavaScriptアプリケーションを考えながら作る話")
- 補足資料: [azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること](https://github.com/azu/large-scale-javascript "azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること")
	- 実際に作ったガイドラインとか参考資料とかをまとめたリポジトリ

JavaScriptで複雑なアプリケーションを作るアーキテクチャをどう考えたかについての話。
Fluxで未定義感があるドメインモデルをどのように考えて作っていくかについてを中心にしてます。

後は、[Almin](https://github.com/almin/almin "Almin")ではドメインモデルを扱うために、どのような構造にしていったかについて。

-----

# redux-saga - @kuy

- redux-saga
	- 副作用を扱ってくれるライブラリ
- Saga
	- 実行したい処理をまとめたプロセス
- Effect
	- データとしての副作用
- Saga Runtime
	- 実行環境
- 実装
	- Effectをyeildを返すGenerator関数で書く
- Saga RuntimeでSagaを実行する
	- 内部的にはState Machineになっている
- Root Saga -> 色々なsagaをforkする
- Saga Runtime <-> Saga(プロセス)
	- これをやり取りする Effect が色々ある感じ
- ロジックをSagaに書いていく
- redux-sagaのコードが増えてきたら
	- ファイルを分割したくなる
	- 1個のことだけをするSagaを作っていく
	- sagaはあくまでロジックを書く場所
- solidな処理はmiddlewareで書く
- 問題点
	- 初見が難しい
	- generaotr/yeild
	- regeneratorを使う必要がある


----

# RealWorld React - @mizchi

- 最近はリファクタリングをしてる
- 普通のウェブサイトにReactをあてていく
- 設計レベルでSPAが難しいので徐々に書き換えていく話
	- ボトムアップで変えていく
- Reactの難しさ
	- Reactの使うためのエコシステムの難しさ
	- Flux的な設計の難しさ
	- React自体は難しいというわけではない
- 最近だと分割統治していくとモジュールを作っていく
	- 読み込むだけで副作用があるモジュールが古の時代には多いので難しい
- リファクタリングしていく
	- Backbone + jasmineテストちょろっと
	- jQuery pluginが大量にある状態のもの
- リファクタリングの方針
	- モダンな環境の導入
	- 今のコードを良くする => 諦めた
	- 再利用できるものとできないものを分けるところから始めた
- JavaScriptが複雑な画面
	- 投稿画面とフィード画面
	- 「やってみた」「無理だった」 
	- 分からない仕様が大量にでてくるので、まず仕様を理解するところから
- ゴールの設定
	- React/Babelで受け入れる環境
	- Turbolinkができるような初期化フローを作る
		- ある程度、Stateが整理されている目安としてTurbolinkが使える
- enzymeがテストに便利
- FlowTypeはJSXにも型が付けやすくて便利

-----

# ReactコンポーネントとCSSコンポーネントは1対1なのかについて - shibe97
> [ReactコンポーネントとCSSコンポーネントは1対1なのか問題について // Speaker Deck](https://speakerdeck.com/shibe97/reactkonponentotocsskonponentoha1dui-1nafalsekawen-ti-nituite "ReactコンポーネントとCSSコンポーネントは1対1なのか問題について // Speaker Deck")

- 1対1なのかどうか
- ReactコンポーネントはViewとロジックを分離する
- Presentational Component
	- 再利用可能なコンポーネント
- Container Component
	- Reduxのconnect関数を使ったコンポーネント
	- Presentationに値渡したり
- Atomic Design
	- [Atomic Designの考え方と利点・欠点 - I'm kubosho_](http://blog.kubosho.com/entry/using-atomic-design)
	- 最小の単位(atom)でコンポーネントを作ってそれを使っていく
