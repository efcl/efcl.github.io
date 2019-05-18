---
title: "Inside Frontend 2019 アウトラインメモ"
author: azu
layout: post
date : 2019-05-18T19:10
category: イベント
tags:
    - Frontend
    - HTML
    - CSS
    - JavaScript
    - イベント

---


[Inside Frontend](https://inside-frontend.com/)に参加してきたのでアウトラインメモ。

---

## A1: [TypeScript: Why and how we adopted it at Slack](https://inside-frontend.com/speakers#A-1) - Felix

- TypeScript + React
- Battle Field 1のUIはReact
- [TIL Battlefield 1 user interface is powered by React+MobX : javascript](https://www.reddit.com/r/javascript/comments/86fv9y/til_battlefield_1_user_interface_is_powered_by/)
- Electronアプリで書かれてるSlackとかSkypeとかはJavaScriptで動いてる
- Slackでは、C++とかのネイティブコードも使ってる
- JSDocなどを使ったドキュメントや型も書いてたけど、スケールしなかった
- このような場面でTypeScriptを使うことにした
    - TypeScriptはRuntimeに関与しない
    - 多くのnpmモジュールは `@types` をサポートしてる
- デモ
    - JavaScriptからTypeScriptに変換していくデモ
    - TS → JSの変換結果を見るデモ
- SlackアプリをTypeScriptにポートする
    - 1つづつTypeScriptに移行していった
    - そうしていくとJavaScriptをみたら汚く感じした
    - VSCodeの補完とか強力だったので、TypeScriptにより魅力を感じた
    - 実際にkoaを使ってるときにドキュメントを開かずに開発できた
    - 1年かかると思ってたTSへの移行が数ヶ月で終わった
    - Slackの開発者はネイティブアプリ出身が多い
    - 大規模なアプリケーションを書くならTypeScriptオススメ

---

## A2: [Introduction to Lucet](https://inside-frontend.com/speakers#A-2)

- Lucet(ﾙｾｯﾄ)
- [https://github.com/fastly/lucet](https://github.com/fastly/lucet)
- WebAssembly
- wasm
- WebAssembly
    - セキュリティとサンドボックス
    - wasmはそれぞれIsolatedされた環境で動く
- wasm扱う言語
    - C, C++, Rustなど
    - `clang`などを使ってwasmにコンパイルできる
    - TypeScriptではAssemblyScriptなどがある
- WASI(ﾜｰｼﾞｨ)
    - ランタイムの情報を得るための共通インターフェース
- wasmがcontruct満せばサーバ、クライアントどちらでも動く
- WebAssembly → Lucet → x86-64
    - LucetはAOTコンパイラ
    - `lucetc` でwasmをparse → verifier → translator → codegen → artifact → runtime
- codegen
    - Mozillaの`cranelift`を使ってる
    - [https://github.com/CraneStation/cranelift](https://github.com/CraneStation/cranelift)
- cranelift
    - IR = [Intermediate Representation](https://ja.wikipedia.org/wiki/%E4%B8%AD%E9%96%93%E8%A1%A8%E7%8F%BE)
    - cranelift IR を verifiter → pre-optimize(分岐のシンプル化など) → legalizer(ネイティブコード生成) → post-optimize(特定のアーキテクチャ向けの最適化、複数のwasmロードなど) →  register allocator(registerに割当) → branch relaxer
- コンパイルの流れ
    - `lucetc` でwasmをparse → verifier → translator → codegen(cranelift) → artifact → runtime
- JIT or AOT
    - lucetはJITではなくAOTなので、コンパイル時に大体処理が決まってる
    - メモリレイアウトとか。
    - Runtimeはこのメモリレイアウトに沿って実行することに集中する
    - メモリレウレイアウト、分離、
    - [Lucet's performance and lifecycle](https://www.fastly.com/blog/lucet-performance-and-lifecycle)
- Runtime
    - LucetのランタイムはメモリAllocateをまだ実行してない分までまとめて行う
    - Rather than allocating and freeing memory from the operating system every time we create and destroy an instance, we allocate a memory region with reusable slots for backing instances.
- [https://wasm.fastlylabs.com/](https://wasm.fastlylabs.com/)
    - wasmでHTMLを返すデモ
- WebAssemblyはプログラムを分離した状態で提供できること
- 2年ぐらい前からTerrariumとかに取り組んでいてLucetとしてOSSにした
- 今の所x86のみサポートしてる

---

## B3: [Making less of the web with feature policy](https://inside-frontend.com/speakers#B-3)

- W3CTAG
    - [W3C Technical Architecture Group](https://github.com/w3ctag)
- 悪いアイデアもある
    - AppCache
    - ドメインシャーディング
- Web 30年
- 2000年
    - Nokia 3310
    - この時最も使われていたJavaScriptは `window.open` (推測)
    - しかし、今のウェブサイトはあんまり使わない
    - 制限したい
- Parties to the web platform
    - Developers
    - Browser vendors
    - Major Websites
- 2007年
    - iPhone
        - wifi
    - Flash
    - [Thoughts on Flash - Apple](https://www.apple.com/hotnews/thoughts-on-flash/)
- 2015年
    - Samsung Galaxy S7
    - 2011年から2017年でウェブサイトのサイズは250%🆙
- Platformer(not Publisher)
    - [AMP letter](http://ampletter.org/?lang=ja)
- 2019年
    - Samsung Fold
- 近年
    - Decentralisation
- Feature Policy
    - HTTP ヘッダ、iframe属性
    - 開発者がコントロールする
    - 例
    - `Feature-Policy: document-write 'none'; autoplay 'none'; speaker 'self'; unsized-media bad3rdparty.example.com`
- Feature Policyはまだブラウザのフラグが必要
    - `camera`
    - `font-display`
        - 英語圏でもやたらfontを使いたがる現象が見られる
    - `layout-animation`
    - `unsized-media`

- 今現在
    - Charlesとかを使ってFeature Policyを足せば試せるけど、サイトが壊れる
    - Fastly
    - Le Monde
    - 日経
    - rebuild.fm
    - [Jxck.IO](https://jxck.io/)
    - いろんなviolationがでる
- 大きなウェブサイトはエンジニアがいるけど、もっと小さいサイトだと対応できない
- Reporing API
- "Never slow" policy bundle
    - `Feature-Policy: allow-slow 'none'`
    - みたいのがあれば遅いサイトはなくなる?(joke)
- FAQ
    - Q. How to decide to default policies?
    - A. いろいろ意見を聞いている。最終的にはSpec Editorが決めてる(Ian Clelland (Google))
    - Q. Having feature-policy, how could we deal with unsolicited external third-party scripts such as adverts?
        - 広告などの3rdパーティに対する
    - A. 広告などの機能に対するFeature Policyはいろいろ
    - 例えば、FT、日経などでかいところが、音がでないようにするとか、document.writeを禁止するとか
    - これによってウェブ全体のヘルシーさを保てる
    - Q. I thought it might be a bit overkill to enforce the policies for all devices. Is it common to enforce some of feature policies just for mobile devices?
    - A. if you want.
    - まだ試験的な機能なのでまずは試してみる
    - Q. Feature-Policy は、Performance、Security、Privacy だとどれが優先されているのでしょうか? こういうポリシーは入らないだろうとかあれば教えて下さい。
    - A. Feature-Policyはパワフルで大きく分けて、2つ
        - Security - 特定の機能に問題があるときに無効化できる
        - Performance - document.writeなど
    - A. Opinonatedなものは入らないだろうと
        - 多くのユーザーが参加しないとフェアなポリシーが作れない
    - Q. How should we implement Feature Policy in our website?
    - A. HTTPヘッダ、
    - Q. Can I make it so it only reports violation like CSP?
    - A. Feature-Policy-Report-Only
    - [https://github.com/w3c/webappsec-feature-policy/blob/master/reporting.md#can-i-just-trigger-reports-without-actually-enforcing-the-policy](https://github.com/w3c/webappsec-feature-policy/blob/master/reporting.md#can-i-just-trigger-reports-without-actually-enforcing-the-policy)
    - Q. You mentioned about `layout-animations`, which situation is best case to apply this policy.

## C4: [いちからデザインシステムを作ってみて学んだこと](https://inside-frontend.com/speakers#C-4)

> [いちからデザインシステムを作ってみて学んだこと - Speaker Deck](https://speakerdeck.com/halken/itikaradezainsisutemuwozuo-tutemitexue-ndakoto)

- 開発者、ユーザーにとってデザインがバラバラだと困る
    - 制作側はUI設計のコスト増える
    - ユーザ側は学習コストが増える
- ⇒ デザインシステムを作ることにした
- デザインシステム
    - スタイルガイド
    - デザインキット
    - コンポーネントライブラリ
- 目標: 開発中サービスにデザインシステムを導入してもらう
- スケジュール
    - 2018/9: 開始
    - 2018/12: コンポーネントライブラリを作成完了
- デザインガイドラインの作成
    - デザイン原則を定義
    - 抽象スタイル義
        - 色、アイコンとか
    - 具体的なルールを定義
        - モーションとか
- UIインベントリの実施
    - コンポーネントとなるパーツを見つけていって、名前をつけていった
    - 議論が起きて時間がかかった
        - 抽象的なものの名前が決まらない
            - Card, Panel, Plate?
        - サービス特有のコンポーネントの名前が決まらない
    - 最終的にコンポーネントの役割や機能で決めた
        - 見た目にとらわれないようにした
- スタイルガイドの量産
    - Sketchでデザイン作成
    - デザインルールをドキュメント化
    - スタイルガイド作成にフロントエンド目線で参加する人がいると、要件の抜けが防げる
    - ⇒ 考えられるすべてのデザインパターンを用意する必要がある
- ライブラリ実装
    - どのような形でライブラリを提供するか?
        - 最初: HTML + CSS + JavaScriptのスニペット
        - BEM記法を使った形
        - [Fractal](https://fractal.build/)を使っていた
    - 事件 - デザインシステム開発の中止
        - Reactコンポーネントとして提供してほしいとなった
        - 大体Reactを使っていたので
        - 現場のエンジニアのニーズが考えられていなかった
        - ⇒ サービスへの導入が一旦見送りになった
    - コンポーネント実装 2
        - CSS Modules、CSS in JSかの選択
            - 将来的にCSSフレームワークとして影響できるようにするために、CSS Moduleを選択
        - TypeScriptの導入
            - 型定義によりデザインを厳格化できる
        - Storybook
            - コンポーネント単位での見た目の実装確認に利用した
    - 問題
        - Sassの型解決周りで問題がおきた
        - [Jimdo/typings-for-css-modules-loader: Drop-in replacement for css-loader to generate typings for your CSS-Modules on the fly in webpack](https://github.com/Jimdo/typings-for-css-modules-loader)
    - コンポーネントライブラリを使ったデザインシステムスタイルガイド(gasbyの静的サイト)で確認できるようにした
        - 相互に抜けが無いことを担保する仕組みが必要
- 振り返り
    - デザインから実装は大変
    - 使ってもらえないと意味がない
    - モチベーションを保つのが難しい
    - デザインシステムは巨大なプロダクト

---

## 5: 交流室

- 交流室にいた

---

## B6: [Loading Performanceとの向き合い方](https://inside-frontend.com/speakers#B-6)

> [Loading Performanceとの向き合い方 / InsideFrontend 2019 - Speaker Deck](https://speakerdeck.com/shqld/insidefrontend-2019)

- Critical CSSを動的に生成する取り組み
- ビジネスパフォーマンス
    - 1秒遅くなったら
    - 何%高速化ではなく、何%速度が低下したらという言い方をする
- LightHouse Score
    - 基本的には良い
    - ユーザーの状況によってはダメな場合がある
        - 低速状態、遅い端末では
        - CPUやNetworkスロットリングで確認すると点数が落ちる
        - ロードが終わっても操作を受け付けていないとか
    - TTI
        - Long Taskがなくなるまでの時間の指標
        - 遅くなる主な原因は外部広告スクリプト
        - 多段スクリプトになっていて、ネットワークリクエストが複数回走る
        - 確実に表示しないと、影響が大きい
    - 正確に計測する
        - 広告がユーザーに見えて初めてbeaconを送る
    - Build
        - 広告のスクリプトの中身を見て、scriptのリクエストを止める、代わりにfetchしてすべてをconcatした状態にしてminifyする。
        - ⇒ リクエストが一回になる
    - Override
        - コントローラ: SDKの動きを抑制
        - ビュー: 広告レスポンスを受け取り取得した
    - Off the main thread
        - UIの表示関するもの以外はWebWroerkで行う
        - 広告のリクエストやパースをWorkerのスレッドで行う
        - comlinkを使っている
        - ⇒ 結構効果ある、TTIが50%改善した
    - 非最適化
        - 最適化が失敗した時には、正規の処理に切り替えて実行する
        - 複数の最適化レベルを設定する
            - デフォルトは最も高いレベル
            - A/Bテスト的に分けて、成功率を出せる
    - ライブラリ
        - 文字列テンプレート、VanillaJS
        - フレームワークを使ってないので軽いけどバグが出やすい
        - 参入障壁が高い
    - 今まで(~2018)
        - バックエンドはHandlebars
        - フロントエンドはVanillaJS
    - リニューアル後(2019/7 ~)
        - バックエンドはJSX
            - 型の恩恵もある
        - フロントエンドはVanillaJS
    - 日経は基本的に静的なサイト
        - CSRしなくていい
        - Universalなコンポーネント実装は必要ない
    - 必要なかったもの
        - Components
        - React
        - State
            - ハイドレーションも必要ない
    - 使ったもの
        - WebComponents/CustomElements
        - DOM、状態、処理が一つのコンポーネントとして管理できる
        - SSRとの齟齬がない
        - WebComponents と JSXを使ったサーバサイドテンプレートの例
    - FAQ
        - Q. パフォーマンスに取り組む価値をどのように事業側に説明し，工数をどのように確保していますか？ パフォーマンスは，機能要件に比べて優先度が引くことになる場面が多いような気がしていますが，ここまでやり込める秘訣はなんでしょう
        - A. 日経でも優先度は低くはなりがち。秘訣はこだわり。事業側に説明
        - Q. 広告SDKの解析と独自実装って契約や規約的に問題ないんでしょうか？（法務的な確認している感じなのでしょうか）
        - A. ベンダーに確認済み
        - Q. CustomElementsのIE11のfallbackはどうしていますか？
        - A. polyfillを使ってる。[webcomponents/custom-elements: A polyfill for HTML Custom Elements v1](https://github.com/webcomponents/custom-elements) ?
        - Q. JSXでのサーバーサイドレンダリングをどのようにビルドしているかが全くわからないので教えて欲しいです！
        - A. Reactの[renderToString()](https://reactjs.org/docs/react-dom-server.html#rendertostring)を使ってHTML文字列を出力している。