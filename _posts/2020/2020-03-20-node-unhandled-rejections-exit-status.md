---
title: "Node.jsでUnhandled RejectionsのときにExit Statusが0となる問題を回避する"
author: azu
layout: post
date : 2020-03-20T15:51
category: JavaScript
tags:
    - Node.js
    - JavaScript

---

Node.jsでUnhandled Rejectionsが発生してprocessが終了すると、Exit Statusが`0`となる問題とその対策についてのメモです。

事前知識: Async FunctionはPromiseを返す関数定義です。
その辺について詳しくは次のサイトを読んでください。

- [JavaScript Promiseの本](https://azu.github.io/promises-book/#chapter5-async-function)
- [非同期処理:コールバック/Promise/Async Function · JavaScript Primer #jsprimer](https://jsprimer.net/basic/async/)

今回のサンプルコードは次のリポジトリにあります。

- [azu/unhandled-rejections-example: Example wrong usage of Unhandled Rejections. Make exit status 1.](https://github.com/azu/unhandled-rejections-example)

## Unhandled RejectionsとNode.jsの終了ステータス

次の`main.js`はPromise内で例外が投げていますが、呼び出し元の`main()`は何もキャッチしていません。
そのため、Unhandled Rejectionsが発生しています。

`main.js`:

```js
function waitFor(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function main(shouldFailed) {
    await waitFor(1000);
    throw new Error("ERRRRRRR!"); // failed after 1sec
}

main();
```

ブラウザではUnhandled Rejectionsは自動的にコンソールエラーとして表示されるためあまり問題には感じないかもしれません。

![Unhandled Rejections on Browser](https://efcl.info/wp-content/uploads/2020/03/20-1584687893.png)

Node.jsではこのコードを実行するとUnhandled Rejectionsとなりエラー表示はでますが、その際のExit Statusは`0`であるため正常終了となります。

```bash
$ node main.js
(node:12236) UnhandledPromiseRejectionWarning: Error: ERRRRRRR!
    at main (/unhandled-reject-example/main.js:9:11)
(node:12236) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:12236) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
$ echo $?
0
```

[DEP0018: Unhandled promise rejections](https://nodejs.org/api/deprecations.html#deprecations_dep0018_unhandled_promise_rejections)の将来的にexit statusは`0`ではなくすというDeprecationは出ていますが、Node 12時点でもデフォルトのexit statusが`0`のままです。

- [Terminate process on unhandled promise rejection · Issue #20392 · nodejs/node](https://github.com/nodejs/node/issues/20392)

Unhandled Rejectionsでプロセスが終了すると正常終了とみなされて、Exit Statusを見るツールがうまく動かないことがあります。
そのため、必ずなにかしらの方法でPromise/Async Functionの例外はキャッチすることが重要です。

## `Promise#catch`で明示的にエラー終了する

先ほどのコードを簡単に修正するなら、`main()`の呼び出しに対してちゃんと`Promise#catch`でエラー時の処理を書くことです。

`fixed-main.js`:

```js
function waitFor(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function main(shouldFailed) {
    await waitFor(1000);
    throw new Error("ERRRRRRR!"); // failed after 1sec
}

// Random　Success or failure
main().then(() => {
    console.log("ok");
    // It is optional - if comment out is, node.js get same result
    process.exit(0); 
}).catch(error => {
    console.error(error);
    process.exit(1);
});
```

この場合は、`main()`関数でエラーが発生([Async Function内でエラーをthrowするとRejectedなPromiseを返す](https://jsprimer.net/basic/async/#async-function-return-promise))した場合に`catch`メソッドのコールバックが呼び出されます。
`catch`内で`process.exit(1)`を使い明示的にExit Statusを`1`にしてプロセスを終了させているため安全です。

```bash
$ node fixed-main.js
echo Error: ERRRRRRR!
    at main (/unhandled-reject-example/fixed-main.js:9:11)
$ echo $?
1
```

基本的にアプリケーションのエントリポイント呼び出しではエラーが起きた場合の処理は書いておくのが良いでしょう。

## [`unhandledRejection`](https://nodejs.org/api/process.html#process_event_unhandledrejection)イベントで明示的にエラー終了する

Node.jsでは`process.on("unhandledRejection", (reason, promise) => {})`というイベントをサポートしています。

- [Process | Node.js v13.11.0 Documentation](https://nodejs.org/api/process.html#process_event_unhandledrejection)

これは、Unhandled Rejectionsが発生した際に呼ばれるコールバック関数を登録できます。
この`unhandledRejection`イベントを使えば、Unhandled Rejectionsが発生した際にProcessをエラー終了させることもできます。

`fixed-unhandledRejection-event-main.js`:

```js
process.on('unhandledRejection', (reason, promise) => {
  console.error(reason);
  process.exit(1);
});

function waitFor(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function main(shouldFailed) {
  await waitFor(1000);
  throw new Error("ERRRRRRR!"); // failed after 1sec
}

main();
```

このコードを実行してみると exit status が `1` となることがわかります。

```bash
$ node fixed-unhandledRejection-event-main.js
Error: ERRRRRRR!
    at main (/fixed-unhandledRejection-event-main.js:14:9)
$ echo $?
1
```

これと同様のことをするモジュールはいくつか存在します。

- [sindresorhus/hard-rejection: Make unhandled promise rejections fail hard right away instead of the default silent fail](https://github.com/sindresorhus/hard-rejection)
- [sindresorhus/loud-rejection: Make unhandled promise rejections fail loudly instead of the default silent fail](https://github.com/sindresorhus/loud-rejection)
- [mcollina/make-promises-safe: A node.js module to make the use of promises safe](https://github.com/mcollina/make-promises-safe)

まずは`Promise#catch`で管理することが重要ですが、書き忘れた際にUnhandled Rejectionsが発生してしまうので、それを防止する役割として利用できます。

似た問題として、テストフレームワークの[Mocha](https://mochajs.org/)はデフォルトではUnhandled Rejectionsが発生してもテストを成功として扱ってしまいます。

そのため、次のようなテストケースはMochaではパスしてしまいます。

```js
async function fail() {
    throw new Error("FAIL!!");
}

it("unhandled rejection", () => {
    fail();
});
```

これも`unhandledRejection`を使って例外を投げるようにすることで、テストケースを失敗させられます。

```js
process.on("unhandledRejection", reason => {
    throw reason;
});

async function fail() {
    throw new Error("FAIL!!");
}

it("unhandled rejection, but throw it", () => {
    fail();
});
```

Mochaで実行すると、少なくてもテストは通らなくなって安全です。(ただし結果の表示はおかしいときがあります)

```
$ mocha *.js



  ✓ unhandled rejection
  1) unhandled rejection, but throw it

  1 passing (4ms)
  1 failing

  1) is unhandled rejection:
     Uncaught Error: FAIL!!
      at fail (fixed-test.js:6:11)
      at Context.<anonymous> (fixed-test.js:10:5)
      at processImmediate (internal/timers.js:439:21)
```

- Example: [azu/mocha-unhandled-rejections-example](https://github.com/azu/mocha-unhandled-rejections-example)
- Issue: [unhandled promise rejection in async tests · Issue #2797 · mochajs/mocha](https://github.com/martin-ayvazyan13)

## `--unhandled-rejections=strict`でエラー終了させる

Node.js 12から[`--unhandled-rejections=mode`](https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode)というコマンドライン引数が追加されています。

`--unhandled-rejections=strict`でNode.jsを実行すると先ほどのUnhandled Rejectionが自動的にuncaught exceptionとして例外を投げるようになります。そのため、Unhandled Rejectionsがエラー終了となります。

```bash
$  node --unhandled-rejections=strict main.js
/unhandled-reject-example/main.js:9
    throw new Error("ERRRRRRR!"); // failed after 1sec
          ^

Error: ERRRRRRR!
    at main (/unhandled-reject-example/main.js:9:11)

$ echo $?
1
```

## おわりに

基本的にはUnhandled Rejectionが発生しないように`Promise#catch`などをしてちゃんとエラーハンドリングしたコードを書くことが大切です。
それでも、意図しない例外などは発生するので、[unhandledRejection](https://nodejs.org/api/process.html#process_event_unhandledrejection)や[uncaughtException](https://nodejs.org/api/process.html#process_event_uncaughtexception)でのエラー時の処理を入れておくのが良い気がします。

Async Functionを使って簡単にPromiseを扱えるようになって、このUnhandled Rejectionsの問題をよく見るようになった気がするのでこの記事を書きました。

サンプルリポジトリ:

- [azu/unhandled-rejections-example: Example wrong usage of Unhandled Rejections. Make exit status 1.](https://github.com/azu/unhandled-rejections-example)

Node.jsでは[`EventEmitter.captureRejections`](https://nodejs.org/api/events.html#events_capture_rejections_of_promises)など新しいオプションが増えたりしているので、興味がある人はこの辺も見てみると良い気がします。