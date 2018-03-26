---
title: "Almin + React/Vue.jsのパフォーマンスプロファイルをタイムライン表示できるように"
author: azu
layout: post
date : 2017-09-20T10:07
category: JavaScript
tags:
    - almin
    - react
    - vue
    - performance

---

[![Almin.js](https://almin.github.io/media/logo/logo.png)](https://github.com/almin/almin)

[Almin](https://github.com/almin/almin "Almin")はClient-side DDD/CQRSをしやすい構造を作ることを目的にした – いわゆるステート管理ライブラリです。

[Almin 0.14.0](https://github.com/almin/almin/releases/tag/almin%400.14.0 "almin@0.14.0")で`performance.mark`ベースのプロファイルを取れるようになりました。
これにより、AlminのUseCaseやStoreといったそれぞれの処理にどれぐらいかかっているかを開発者ツールのタイムラインで見ることができます。

[![DevTool timeline](https://efcl.info/wp-content/uploads/2017/09/20-1505888631.png)](https://github.com/almin/almin/releases/tag/almin%400.14.0)

`performance.mark`は[User Timing Level 2](https://w3c.github.io/user-timing/ "User Timing Level 2")で標準化されている方法なので、後述するようにReactやVueなどのライブラリと組み合わせた状態も見ることができます。
`performance.mark`については次の記事でも書いています。

- [performance.markでパフォーマンス計測する | Web Scratch](https://efcl.info/2016/08/15/performance.mark/ "performance.markでパフォーマンス計測する | Web Scratch")

## 使い方

Contextを作成する際に`performanceProfile`オプションを有効にするだけです。

```js
const appContext = new Context({
    dispatcher: new Dispatcher(),
    store: yourStoreGroup,
    options: {
        strict: true,
        performanceProfile: true
    }
});
```

このオプションを有効にした状態で実際のウェブサイトにアクセスして、次のステップでみることができます。

1. `performanceProfile`オプションを有効化
2. ウェブサイトを開く
3. 開発者ツールの"Performance"タブを開き**Record**を押す
    - [Chrome's Timeline Tool document](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool)や[MSEdge's F12 devtools guide](https://docs.microsoft.com/en-us/microsoft-edge/f12-devtools-guide/performance "F12 devtools guide - Performance - Microsoft Edge Development | Microsoft Docs")を参考に
4. **Record**を停止する
5. **User Timing**というラベルにAlminのイベントが表示される

実際にパフォーマンスプロファイルをタイムラインで見ている様子です。

<blockquote class="twitter-video" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/almin?src=hash">#almin</a> + <a href="https://twitter.com/hashtag/react?src=hash">#react</a> easy to profile web app with devTool&#39;s timeline.<a href="https://t.co/HLndVyS4hI">https://t.co/HLndVyS4hI</a> <a href="https://t.co/d7l2c2pP1K">pic.twitter.com/d7l2c2pP1K</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/909418278153478144">September 17, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

この動画ではReactの[?react_perf](https://facebook.github.io/react/docs/optimizing-performance.html "?react_perf")と組み合わせたものをタイムライン表示しています。

動かしているサンプルはショッピングカートのコードです。

- [almin/examples/shopping-cart at master · almin/almin](https://github.com/almin/almin/tree/master/examples/shopping-cart "almin/examples/shopping-cart at master · almin/almin")

## Vue + Almin

ReactだけではなくVueも`performance.mark`ベースの[パフォーマンスオプション](https://vuejs.org/v2/api/#performance)をサポートしています。

Vue + Alminで書いたサンプルを作ったので、次のリポジトリで試すことができます。

- [azu/vue-almin-counter-example: Vue + Almin counter example](https://github.com/azu/vue-almin-counter-example "azu/vue-almin-counter-example: Vue + Almin counter example")

![Vue + Almin](https://cdn.rawgit.com/azu/vue-almin-counter-example/master/img/performance-timeline.gif)

VueのパフォーマンスプロファイルはVueによるViewの更新(`render`や`patch`)に関する情報がタイムラインにでます。
Alminのパフォーマンスプロファイルは、UseCaseの実行、StoreGroup/Storeの更新、StoreからのState取得に関する情報がタイムラインにでます。

Alminが現在サポートしているメトリクスについては次のドキュメントで公開しています。

[![Metrics](https://efcl.info/wp-content/uploads/2017/09/20-1505887064.png)](https://almin.js.org/docs/tips/performance-profile.html)

- [Performance profile · Almin.js](https://almin.js.org/docs/tips/performance-profile.html "Performance profile · Almin.js")

このVue + Alminのサンプルプロジェクトは、Vue + Vuexで書いたものをAlminに変換して作ったので、そのときはDiffは次のPull Requestで見ることができます。

- [Almin + Vue performance profile by azu · Pull Request #1 · azu/vue-almin-counter-example](https://github.com/azu/vue-almin-counter-example/pull/1 "Almin + Vue performance profile by azu · Pull Request #1 · azu/vue-almin-counter-example")

## おわりに

Reactの[?react_perf](https://facebook.github.io/react/docs/optimizing-performance.html "?react_perf")のように、`?almin_perf`をクエリに付けた時だけプロファイルを取りたい場合は次のように設定すればできます。

またパフォーマンスプロファイルのコードは、オプション値関係なくproductionビルドすると消えるようになっています。

```js
// ?almin_perf をつけるとプロファイルが取れる
const context = new Context({
    dispatcher: new Dispatcher(),
    store: new StoreGroup({
        counter: new CounterStore()
    }),
    options: {
        strict: true,
        performanceProfile: /[?&]almin_perf\b/.test(location.href)
    }
});
```

Alminはロガーなどを外部実装するための[ライフサイクルイベント](https://almin.js.org/docs/tips/usecase-lifecycle.html "life-cycle events")のAPIも公開しています。
[almin-logger](https://www.npmjs.com/package/almin-logger "almin-logger")や[almin-devtools](https://github.com/almin/almin-devtools "almin-devtools")はこちらを使っていますが、それとは別にオプションを追加したのはパフォーマンスプロファイルはAlmin内部的な状態を出す可能性があるからです。
そのため、Publicなものはライフサイクルイベントとして、内部的な状態のダンプデータは`performanceProfile`のみで出すようにしています。

Alminのパフォーマンスプロファイルについて詳しくは次のドキュメントに書いています。

- [Performance profile · Almin.js](https://almin.js.org/docs/tips/performance-profile.html "Performance profile · Almin.js")
- [LifeCycle of UseCase · Almin.js](https://almin.js.org/docs/tips/usecase-lifecycle.html "LifeCycle of UseCase · Almin.js")
