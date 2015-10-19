---
title: "次世代Webカンファレンスのstandardizationで話してきた"
author: azu
layout: post
date : 2015-10-18T20:35
category: イベント
tags:
    - イベント
    - ECMAScript

---

[次世代 Web カンファレンス](http://nextwebconf.connpass.com/event/19699/ "次世代 Web カンファレンス")のstandardizationセクションで話してきました。


## js_next

    te = @teppeis
    wada =  @t_wada
    con = @constellation
    vv = @vvakame


### 今JavaScript書く時に何で書いてます?

- vv = TypeScript + Babel?
- con = C++ばかり書いて
	- テストはJavaScriptで書いてるのでES6
- te = 趣味はES6、仕事はIE8で動くように書いてる
	- IE8は来年1月に終わる
- wada = 趣味はES6+Babel、仕事はIE8

### ES6の印象

- vv = hoistingとか面倒な問題が減った
- wada = Arrow Function、Template Stringなどが便利

### IE8対応

- IE8対応してるひと = 半分
- Babel、BrowserifyとかデフォルトのターゲットはES5以上
- 予約語の問題とかES3だと動かないことがある
- [stefanpenner/es3-safe-recast](https://github.com/stefanpenner/es3-safe-recast "stefanpenner/es3-safe-recast")

### ES6 modules

- どういうふうに読み込まれるかが明確に決まってない
- ES6の仕様では構文だけで、動作については決まってない
- [whatwg/loader](https://github.com/whatwg/loader "whatwg/loader")
- `<script>`タグで読み込まれる場合の挙動が色々属性による挙動が色々あるので大変
	- https://github.com/whatwg/loader/issues/83
- `import a from "URL"`はできるようになる

```
<script type="module" charset="utf-8" />
<script type="module" charset="euc-jp" />
```

とした時の問題。どうなるかは仕様で決まってない

### パス解決


- con = Node.jsと違うパス解決は異なるものにはならないだろう
- [Global Objects Node.js v4.2.1 Manual & Documentation](https://nodejs.org/api/globals.html "Global Objects Node.js v4.2.1 Manual & Documentation")
- Node.jsとES6で違うのはディレクティブな所
	- requireは関数なので動的にモジュール読めるけど(`require(name)`みたいな)
	- ES6 modulesは import name from "name" みたいな感じなので静的に決まる。

### Spec


- async/awaitのデザインはいい感じ
- [tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")
- Specに入るとDOMの方でも使える
	- ES6に入ってるとDOMの方でも気軽に使える
- TypeScriptの仕様は複雑化してるので、ECMAScriptにそのまま持っていくと難しい
	- ES5のために型定義の構文をいれてるので、[Intersection types](https://github.com/Microsoft/TypeScript/issues/1256 "Intersection types")とかES6前提だと要らない感じ
	- なのでそのままECMAScriptに持っていきにくいものも多い
- 使われない機能は仕様にあっても使わない
- TypeScriptに新しい機能が入るときに、特定の何かのユースケースのために入れた?
	- 頑張ればできたものを、簡単に型定義できる機能が追加されてる
	- なので型システム自体が複雑化している
- d.tsとライブラリの作者が別なのでAPIが2重にある

### 型があること

- IDEが賢くなる
- リファクタリングやりやすくなる
- Language Serviceみたいな言語側でIDE向けのサービスを提供してると、平均のレベルが上がる

### 型と速度

- 型と速度は今のところ
- ほんとにそれの宣言された型は正しいのかとか気にする必要がある
- 一回も実際に実行されない時に宣言された型を使える
- でも実際に実行された値の型の方が信用できる
- 宣言された型が実行時の値と一致するとは限らない

### WebAssembly


- バイナリフォーマットのASTみたいなもの + 型
	- 型は決まった状態でバイナリ化されてる
- [Bug 146064 – JSC should natively support WebAssembly](https://bugs.webkit.org/show_bug.cgi?id=146064 "Bug 146064 – JSC should natively support WebAssembly")
- entry pointがまだ決まってないので、まだ実行ができない
- 実装自体はBaseline Compilerはある。
- objectのlinkにES6 modulesを使ってる
	- バイナリのリンク = ES6 modules
- ゲームエンジンとかにいい感じの設計されてる
- ゲームに必要なことはCanvasとかWebGLにつなげること

### Babelをずっと続けるのか?

- 新しい機能を使うならずっと使う
- 仕様策定側もフィードバックが欲しいので先取りして使うために使い続けられる
- Babelはプラグイン単位の実装なので、個別にサポートを切ることができる
- Babelを入れたいのはSyntaxの拡張(追加するオブジェクトはshimで良い)
	- ES6以降のSyntaxの拡張はそこまでいるかどうか?
	- decorator?

### AST

- wada = ASTもProposalに含まれるのがいいのでは
- 現在のASTの定義 [estree/estree](https://github.com/estree/estree "estree/estree")
- 作る人と使う人が連続してないと言語が死んでしまう
- 作る人と使う人がある程度連続的になってきた
- ASTって仕様どうですか?
	- テキストで来るの?、ASTで来るの?


----

## standardization

ECMAScript/TC39の話をした。

ECMAScriptの仕様策定については以下にまとめておきました。

- [ECMAScriptの仕様策定に関するカンニングペーパー | Web Scratch](http://efcl.info/2015/10/18/ecmascript-paper/ "ECMAScriptの仕様策定に関するカンニングペーパー | Web Scratch")


----

## client_perf

- Navigation Timing
	- 今はデファクトになってる
- Performance Timeline
	- [Performance Timeline](http://www.w3.org/TR/performance-timeline/ "Performance Timeline")
	- パフォーマンスのボトルネックにアクセスできるようになった
- 間隔の数値はFrame Timingとかで取れるようになるの?
- [w3c/performance-timeline](https://github.com/w3c/performance-timeline "w3c/performance-timeline")
- ファーストペイント
	- `firstPaint`というものがある
	- でもfirstPaintってほんとに有用?
	- firstPaintはサービスの性質の影響をうけやすいので、firstPaintのみだと測れない
	- [w3c/frame-timing](https://github.com/w3c/frame-timing "w3c/frame-timing")
- SpeedIndexも組み合わせの問題だけど、納得感がある仕組み
- パフォーマンス改善をどうやるのか?
	- リリースが進んでからパフォーマンス改善をする
- RAIL
	- [RAIL という Web パフォーマンスモデルの概要 ::ハブろぐ](http://havelog.ayumusato.com/develop/performance/e664-rail_performance_model.html "RAIL という Web パフォーマンスモデルの概要 ::ハブろぐ")
	- 具体的な値が定められた指標
- Idleを上手く利用する
	- メインスレッドで処理するとフリーズする問題なので、Idleを挟む
	- => これはタスクのスケジューリングモデルの問題
	- => タスクの優先度をつければいいのでは
- Blink Scheduler
	- [BlinkOn Scheduler Presentation - Google スライド](https://docs.google.com/presentation/d/1V09Qq08_jOucvOFs-C7P4Hz2Vsswa6imqLxAf7ONomQ/present#slide=id.p "BlinkOn Scheduler Presentation - Google スライド")
- `setTimeout(fn, 0)`はレンダリングしたい用途 = `setImmediate`
	- これは[w3c/requestidlecallback](https://github.com/w3c/requestidlecallback/ "w3c/requestidlecallback")でアイドルになったらレンダリングするという考え方
	- アイドルにbeaconを送る使い方
- 日本でパフォーマンスが盛り上がらない
	- 日本が物理的に小さいのでネットが早い
- Service Workerってどう思ってますか?
	- モバイルのライフタイムをPCみたいなライフタイムに持っていく?
- [Resource Hints](http://www.w3.org/TR/resource-hints/ "Resource Hints")
	- 元はResource Priority
	- 遅延ロード
- ATF
	- ATF(Above the fold、ページを表示して最初に見える範囲)を高速に表示させる
- [Accelerated Mobile Pages Project](https://www.ampproject.org/ "Accelerated Mobile Pages Project")


----

## front_arch

- フロントエンドアプリケーションアーキテクチャ
- フレームワーク それぞれの専門
	- React
	- AngularJS
	- Polymer
		- Googleのプロダクト
- 共通項目
	- データバインディング
	- コンポーネント化
- 単方向、双方向のデータバインディング
	- 単方向だと入力に対して出力を返す
- Polymerも単方向、双方向を選択できる
- PolymerとWeb Components
	- Shadow DOM
	- Template String
- Web Componentsの未来
	- 最近MSがコントリビュートしだしたX-Tag
	- [X-Tag ★ Web Components](https://x-tag.readme.io/ "X-Tag ★ Web Components")
	- Shadow DOMはブラウザ間で合意取れたので実装中
	- https://twitter.com/polymer/status/644193936140042240
- CSS
	- ReactだとインラインにCSSに書くものや、CSSカプセル化をするやつがある
	- BEMなどの名前規則を使う方法
- シングルページアプリケーションとルーティング
	- [rackt/react-router](https://github.com/rackt/react-router "rackt/react-router")
		- 実装が辛い
		- Elementに宣言的に行う
	- ng-routerはダメで[angular-ui/ui-router](https://github.com/angular-ui/ui-router "angular-ui/ui-router")がよくなった
	- AngularJS 2ではcomponent routerというui-routerを参考にしたものが入ってる
- ルータに求める機能
	- AngularJSは標準でサポートしてる
	- AngularJSはフレームワークらしいフレームワーク
- History API
	- 普通に使うのが厳しいAPI
- それぞれのライブラリは何で書かれてるの
	- ReactはES6 + JSX
	- AngularJSは2009年とか古い時代から
	- AngularJS 2はTypeScriptで書く
		- ES5/ES6でも書くことはできる
	- Polymer
		- ES5で書かれてた
		- 最近ES6でも書けるようになった
- 速度
	- AngularJS 2では大分改善された
		- [Change Detection in Angular 2 | Victor Savkin](http://victorsavkin.com/post/110170125256/change-detection-in-angular-2 "Change Detection in Angular 2 | Victor Savkin")
	- Reactは遅くならないような作り
		- performanceの改善方法
		- [Performance Tools | React](https://facebook.github.io/react/docs/perf.html "Performance Tools | React")
	- Polymer
		- データバインディングはDirty Checkと言ってるがイベント
- DOMは遅い
	- [リアルな DOM はなぜ遅いのか - steps to phantasien](http://steps.dodgson.org/b/2014/12/11/why-is-real-dom-slow/)
	- [JavaScriptでのDOM操作は重いのかという話とForced Synchronous Layoutについて - id:anatooのブログ](http://blog.anatoo.jp/entry/2015/10/14/174403)
- アーキテクチャ
	- [flux](https://github.com/facebook/flux "flux")
		- Fluxはアーキテクチャ
		- [rackt/redux](https://github.com/rackt/redux "rackt/redux")を使ってる話
		- Fluxで通信はどこでするの?
		- Actionを作るやつがリクエスト
	- AngularJS
		- MV*
		- AngularJSで書くとAngularJSっぽくなる
		- AngularJS 2 Component Treeという考え方
		- Reactと似てるのでFluxみたいになるのか?
	- Redux
		- 一つの巨大なState
		- 一箇所にコードが全て集まるのではなくて、実装自体は小分けに行える
		- root 一箇所にstateが集まる
		- Component毎にstateを持っているとHistory APIとかで戻った時にstateを全て変え直す必要がある
	- Polymer
		- stateはコンポーネントが持ってもいいし、どこにあってもいい。
		- データバインディングでstateが伝播するのでスタートポイントの違いに過ぎない?
	- イベントの管理
		- イベントの管理はどうやっていくべきか?
		- RxとかWHATWG Stream
			- Promiseが浸透してからが本番
	- まとめ
		- コンポーネント、イベント、リクエストの3つに集約される?
		- 標準仕様はインターフェース
			- 仕様を読もう
