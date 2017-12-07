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

一回のタイマー発火ごとの処理は小さくても、CPUが弱いデバイスではネックとなることがあるのでそのような無駄な処理を発見する目的で作りました。
(Chromeの[CPU Throttling](https://umaar.com/dev-tips/88-cpu-throttling/ "CPU Throttling - Chrome DevTools - Dev Tips")などでシミュレートすると問題を見つけやすいです)

その他

- [requestAnimationFrame とタイマーの今更な比較とデモ ::ハブろぐ](https://havelog.ayumusato.com/develop/javascript/e725-timer_vs_raf.html "requestAnimationFrame とタイマーの今更な比較とデモ ::ハブろぐ")
