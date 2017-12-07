---
title: "ページ上でずっと動いているsetTimeout、setInterval、requestAnimationFrameを見つけてパフォーマンス改善する"
author: azu
layout: post
date : 2017-12-07T10:25
category: JavaScript
tags:
    - JavaScript
    - performance

---

複雑なウェブアプリケーションになってくると、1つのページで複数のTimerなどを回すことがあります。

例えば、Twitterのようなアプリならば、ポーリングで更新するために`setInverval`のようなタイマーを回します。
また、ゲームなどCanvasで描画を行うアプリケーションならば、メインループを`requestAnimationFrame`で回します。

このように色々なタイマー系が一つのアプリで動くことが多いですが、特に問題がなりやすいのが表示中だけタイマーを回すようなコンポーネントがあるケースです。

よくあるのが次のようなmount時にtimerを開始して、unmount時にtimerを停止するコンポーネントです。この実装はunmount時に止めているので問題ありませんが、`componentWillUnmount`の実装を忘れるとそのタイマーはコンポーネントが消えた後も周り続けます。

```js
export class TimerComponent extends React.Component {

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        this.stopTimer();
    }
}

```

このような意図しないで動いてるタイマーなどを見つけるspyスクリプトを書きました

- [Logging Timer and requestAnimationFrame](https://gist.github.com/azu/d7942102dc5282b0eca859149791c3f0 "Logging Timer and requestAnimationFrame")

## 使い方

1. 次のスクリプトをページに読み込ませる	
	- コンソールにコピペして実行しても大丈夫
	- Non strict modeじゃないと動かないことやってるで混ぜる場合は注意
2. 結果を取りたくなったら `window.getContexualLogResult()`を叩く

"setTimeout", "setInterval", "requestAnimationFrame"の実行元の関数毎に呼ばれた回数をまとめて表示してくれます。
またスタックトレースも無理やり入れているので、意図しない呼び出しが頻発しているならその部分のコードを直す目安となります。

<script src="https://gist.github.com/azu/d7942102dc5282b0eca859149791c3f0.js"></script>

例えば、twtter.comでこれを実行してみると`setInterval`と`requestAnimationFrame`が回っていることが分かります。

![image](http://efcl.info/wp-content/uploads/2017/12/07-1512611803.png)

これは定期的な更新をするために呼び出していることがわかります。

タイムラインツールでも記録はできるのですが、呼び出し元毎のグルーピングやフィルタリングが難しいです。(良い方法があるなら知りたい)
"setTimeout", "setInterval", "requestAnimationFrame"を乗っ取ってログを取ることで実装しています。

一回のタイマー発火ごとの処理は小さくても、スペック弱いデバイスではネックとなることがあるのでそのような無駄な処理を発見する目的で作りました。
(Chromeの[CPU Throttling](https://umaar.com/dev-tips/88-cpu-throttling/ "CPU Throttling - Chrome DevTools - Dev Tips")などでシミュレートすると問題を見つけやすいです)

最近は、分かりやすい指標が既にある起動時間のパフォーマンスではなく、アプリを起動後のパフォーマンスを改善しています。

次の記事で作ってたものはそういうところを改善する目安を探すためのツールです。

- [performance.markにメタデータを紐付けできるライブラリを書いた | Web Scratch](http://efcl.info/2017/11/15/performance.mark-metadata/ "performance.markにメタデータを紐付けできるライブラリを書いた | Web Scratch")
- [`performance.mark` with metadata is useful for Real user monitoring](https://dev.to/azu/performancemark-with-medata-is-useful-for-real-user-monitoring-54p "`performance.mark` with metadata is useful for Real user monitoring")

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">これのFB Flux版を実装してたけど、やっぱりこういうの必要だと思う。ボトルネックが可視化されるので特殊な技能がなくてもパフォーマンス悪いところが発見できる。 &quot;Almin + React/Vue.jsのパフォーマンスプロフ…&quot; <a href="https://t.co/9alBY5tnca">https://t.co/9alBY5tnca</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/933888717101588480?ref_src=twsrc%5Etfw">November 24, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

アプリの起動後の指標として、何かした時に反応が100ms以内、アニメーションが10ms以内、アイドル時の処理は50ms以上以内のブロックにする(long task)、Loadは1000ms以内などを指標を定めた[RAIL](https://developers.google.com/web/fundamentals/performance/rail?hl=ja "RAIL")モデルなどがあります。

これらはマイクロなベンチマークを取ってからそれを改善していくという積み重ねをしています。
この記事で書いたspyスクリプトも、無駄に動くタイマーが減ればその分処理が減ったということが明確であるため、それを検出するために作りました。

また、アプリ起動後は何もしてないときも体感が良いということも必要になります。
例えばユーザー操作がないけど、タイムラインがスムーズに更新される、映像がスムーズに流れる、放置ゲームを眺めててつっかかりがないとか、リアルタイムにデータを受信してて止まらないなどがこれにあたります。

これらの放置時の更新は大体裏では"setTimeout", "setInterval", "requestAnimationFrame"などを使っていることが多いです。
(WebRTCやWebSocketなどもありますが、それらが止まってないかを定期的にチェックする仕組みなどにも関係します)

タイマー系は意図しないタイミングで他の処理と重なるとUIを固めたりするので、[requestIdleCallback](https://developer.mozilla.org/ja/docs/Web/API/Window/requestIdleCallback "requestIdleCallback")と組み合わせるなどの工夫がひつようになるかもしれません。

- <https://github.com/azu/faao/blob/f52920656db792a0e24fc8bcbbc555c33b02b623/src/infra/time-sheduler/TimeScheduler.ts>

その他

- [requestAnimationFrame とタイマーの今更な比較とデモ ::ハブろぐ](https://havelog.ayumusato.com/develop/javascript/e725-timer_vs_raf.html "requestAnimationFrame とタイマーの今更な比較とデモ ::ハブろぐ")
