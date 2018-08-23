---
title: "Roppongi.js #5 で「Webpagetestから始める継続的パフォーマンス改善」について話してきた"
author: azu
layout: post
date : 2018-08-23T22:15
category: イベント
tags:
    - JavaScript
    - performance
    - イベント

---

[Roppongi.js #5](https://roppongi-js.connpass.com/event/95936/)で[Webpagetestから始める継続的パフォーマンス改善](http://azu.github.io/slide/2018/roppongijs/webpagetest-performance.html)について発表してきました。

[![Webpagetestから始める継続的パフォーマンス改善](https://efcl.info/wp-content/uploads/2018/08/23-1535030051.png)](http://azu.github.io/slide/2018/roppongijs/webpagetest-performance.html)

## スポンサーLT: Firebase + Nuxt.js

- FirebaseはNode.js 6だった
    - 今はNode.js 8で動く
- Firebase functionsは使われてないコンテナは停止する
- 無料枠はGoogleのサービス間だけの通信
- 有料枠に変えて解決

## stencilがよさそうな話 by adwd118

> スライド: [stencil is yosasou](https://slides.com/adwd/stencil_is_yosasou#/)

- [Stencil](https://stenciljs.com/)
    - WebComponentとかのフレームワーク
- Angularっぽいシンタックス
- `npm init` で初期設定をできる
    - [Release v6.1.0 · npm/npm](https://github.com/npm/npm/releases/tag/v6.1.0)
- Custom Elementsを使うフレームワーク
- 標準のCustom Elementsでできないこと
    - 属性に関数をわたせない
        - Stencilは属性に関数を渡せる
    - 属性にオブジェクトを渡せない
        - Stencilは属性にオブジェクトも渡せる
- Prerendering
    - ルーティングも持っている
    - ルーティングに対応するHTMLを生成できる
- Context
    - レンダリングのモードは`isServer`という値を見ればわかる
    - CSRとSSRでの分岐ができる

## Conditional Types I/O by takepepe

> スライド: [Conditional Types I/O - Speaker Deck](https://speakerdeck.com/takefumiyoshii/o-1)

- ReduxとTypeScriptについて
- ActionとRedux
- ReducerはすべてのActionを知っている必要はあるかどうか
- [takefumi-yoshii/redux-aggregate: The tiny ~550b DX helper for Redux with Inferred types](https://github.com/takefumi-yoshii/redux-aggregate)
    - Pure FunctionのマップからActionsを作成する
- `creatAggregate()`
    - pure functionをラップした関数の第一引数にpayloadを渡す
- このredux-aggregateの型定義をどうやってるかについて
- `<INPUT>` = mutation
- `ReturnType<T>` の定義
- 関数の引数(1,2)を取り出す型`A1<T>`の定義
- オブジェクトの`keys`のDiffを取って、オブジェクトのtypoがないかを型チェックする

## ServiceWorkerをproductionで使ってる話 by shokai

> スライド: [ServiceWorkerをproductionで使ってる話 - 橋本商会](https://t.co/nT9SvhXFB7)

- ScrapboxにServiceWorkerを入れた
- Google検索もService Workerを入れている
    - オフラインで検索ページが開ける
    - [The web: state of the union (Google I/O '18) - YouTube](https://www.youtube.com/watch?v=Ay-mdLMDtbs)
- プログラマブルなProxy
    - CacheがHItしたら、Requestする代わりにキャッシュを返す
    - Responseがどこから来たものか判別できない
- マウスオーバーしたときにprefetchしている
- ServiceWorkerのライフサイクル
    - クライアントで動いてるバージョンと異なる場合があるかもしれない問題
- Sentryでエラーを検知する
- マウスオーバーでprefetchしてるのでリクエストが増えた
    - 遅い回線の人にはやらないようにした
    - `fetch`の速度を計測してる(Network information APIはChromeにない)
- SPAの初期表示に必要な部分だけcacheしてみた
    - HTML/JS/CSS/font/画像だけ
- Service Workerを入れた問題
    - SWを使った時にpublic wifitでのログイン画面を検知できない問題
- まとめ
    - SWはプログラマブルなproxy
    - 間違えると24時間サービスが開かなくなる場合がある

## WebPagetestから始める継続的パフォーマンス改善 by azu

> スライド: [Webpagetestから始める継続的パフォーマンス改善](http://azu.github.io/slide/2018/roppongijs/webpagetest-performance.html)

- 継続的なパフォーマンス改善をするために継続的に計測する話
- パフォーマンス改善と計測の関係
- 合成モニタリングのサービスとしての[WebPagetest](https://www.webpagetest.org/)などについて
- 実際のパフォーマンス改善と計測結果の活用についてなど

## Local State Management with Apollo Client by Kodai Nakamura

> スライド: [Local State Management with Apollo - Speaker Deck](https://speakerdeck.com/kdnk/local-state-management-with-apollo)

- apollo-link-state
- Wantedlyの毎週木曜日のFrontend Night勉強会

## 続・貢献できるOSSの探し方 by ohbarye

> スライド: [続・貢献できるOSSの見つけ方 / How to find "Good First Issues" part 2 - Speaker Deck](https://speakerdeck.com/ohbarye/how-to-find-good-first-issues-part-2)

- コントリビュータと利用者
- 前回: "good first issues"ラベルを検索してリポジトリのIssueをまとめた
- 今回: UIから検索できるようにした
- monorepo構成
    - Frontendとサーバサイドを同じディレクトリにいれる
    - リポジトリが分散しないのでスターが分散しない
- パフォーマンスが悪い
    - 複雑なGraphQLを投げているので重い
