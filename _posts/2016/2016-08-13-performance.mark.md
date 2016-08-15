---
title: "performance.markでパフォーマンス計測する"
author: azu
layout: post
date : 2016-08-13T23:24
category: JavaScript
tags:
    - performance
    - JavaScript
    - logger

---

JavaScriptである区間にかかった時間を計測する時に、次のようなコードを書いたことがあると思います。

```js
const start = perforamnce.now();
// 処理
// 色々な処理がすべて終わった
doSome(() => {
	console.log(performance.now() - start);
})
```

[Performance Timeline](https://www.w3.org/TR/performance-timeline/ "Performance Timeline")の`performance.mark`と`performance.measure`などを使うと、ある区間の処理時間をもっと簡単に取ることができます。

APIについて詳しくは以下の記事を見るといいと思います。

- [User Timing API: あなたの Web アプリをもっと理解するために - HTML5 Rocks](http://www.html5rocks.com/ja/tutorials/webperformance/usertiming/)
- [Performance.mark() - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/Performance/mark)

簡単に解説すると `performance.mark(marker)` である地点に名前を付けて、`performance.measure(name, startMark, endMark);`でA地点とB地点の区間をマーキングすることができます。

そして、マーキングした後に[Performance.getEntries()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries "Performance.getEntries()")でその区間の開始時間やかかった時間などを得ることができます。

開発者ツールだとこのマーキングした区間を可視化してくれないので不便ですが、次の拡張 or ブックマークレットを使ううとNavigation Timing APIとともに可視化してくれるので便利です。

- [micmro/performance-bookmarklet](https://github.com/micmro/performance-bookmarklet "micmro/performance-bookmarklet: Performance-Bookmarklet helps to analyze the current page through the Resource Timing API, Navigation Timing API and User-Timing - requests by type, domain, load times, marks and more. Sort of a light live WebPageTest.")

polyfillとして以下のライブラリを使うと、このAPIをサポートしてない環境でもエラーが出なくなるので便利です。

- [nicjansma/usertiming.js: UserTiming polyfill](https://github.com/nicjansma/usertiming.js "nicjansma/usertiming.js: UserTiming polyfill")の

この仕組みの良いところは、計測時はマーキングするだけでログを出すなどの余計な処理をしないため、より正確な値を取ることができます。
また、マーキングをとりあえずしておけば、後から必要なものをコンソールから`window.performance.getEntries()`などで取り出せるため、マーキングと計測を分離できます。

## 実際の例

次の形態素解析をするサイトを例にしてみましょう。

- [azu.github.io/morpheme-match/](http://azu.github.io/morpheme-match/)

このサイトは、[kuromojin](https://github.com/azu/kuromojin)([kuromoji.js](https://github.com/takuyaa/kuromoji.js))を使うため、最初に形態素解析用の辞書をダウンロードして、ダウンロードが終わったら初回の画面が表示されます。

そのため、初期表示がものすごく遅いです。

まずは実際にどれくらいかかっているかを、`window.performance.mark`で計測してみましょう。

```js
// LICENSE : MIT
"use strict";
const React = require("react");
const parse = require("query-string").parse;
import App from "./App/App"
import AppLocator from "../../AppLocator";
import LoadingContainer from "../ui-kit/LoadingContainer/LoadingContainer";
import InitializeUseCase from "../../js/use-case/InitializeUseCase";
const AppLoading = LoadingContainer(App);
export default class AppBootStrap extends React.Component {
    render() {
        // 初期化開始ポイント
        window.performance.mark("AppBootStrap:start");
        const location = AppLocator.history.getCurrentLocation();
        const query = parse(location.search);
        const context = AppLocator.context;
        const promise = context.useCase(InitializeUseCase.create()).execute({text: query.text}).catch(error => {
            console.error(error);
        }).then(() => {
            // 初期化完了ポイント
            window.performance.mark("AppBootStrap:end");
            window.performance.measure("起動までの時間",
                "AppBootStrap:start",
                "AppBootStrap:end"
            );
        });
        return <AppLoading promise={promise}/>;
    }
}
```

初期化の開始と完了でそれぞれマーキングしました。

- `window.performance.mark("AppBootStrap:start")`
- `window.performance.mark("AppBootStrap:end")`

そして、開始から完了の区間を "起動までの時間" という名前でマーキングしています。

```js
window.performance.measure("起動までの時間",
    "AppBootStrap:start",
    "AppBootStrap:end"
);
```

Perfoamance APIでは、地点のマーキングと区間のマーキングとログ出力がそれぞれ分離できるのが便利なところです。

### Before:計測

ロガーを実装するのは面倒だったので、[micmro/performance-bookmarklet](https://github.com/micmro/performance-bookmarklet "micmro/performance-bookmarklet: Performance-Bookmarklet helps to analyze the current page through the Resource Timing API, Navigation Timing API and User-Timing - requests by type, domain, load times, marks and more. Sort of a light live WebPageTest.")を使って"起動までの時間"をコンソールに表示します。

![before](http://efcl.info/wp-content/uploads/2016/08/13-1471098414.png)

"AppBootStrap:end"が遠すぎて見えない…

数MBの辞書をダウンロードしているため、起動までに8913ms程度かかっています。

### 改善

数MBの辞書をダウンロードしているためしょうがないとはいえ毎回ダウンロードしてるのは非効率です。
辞書はそんなに変更するものでもないので、Service Workerでキャッシュしてみます。

ServiceWorkerの静的ファイルのキャッシュには以下のツールを使用すると簡単です。

- [GoogleChrome/sw-precache: A node module to generate service worker code that will precache specific resources.](https://github.com/GoogleChrome/sw-precache "GoogleChrome/sw-precache: A node module to generate service worker code that will precache specific resources.")

キャッシュしたいファイルパスを定義して、`$ sw-precache --config=sw-precache-config.json`という感じでコマンドラインを実行すると、ServiceWorkerで動くスクリプトを作成してくれます。

```
{
  "staticFileGlobs": [
    "./public/dict/*.gz"
  ],
  "stripPrefix": "./public/"
}
```

後は、作成したスクリプトを[ServiceWorkerに登録する処理](https://github.com/azu/morpheme-match/blob/master/website/src/service-worker-registration.js "service-worker-registration.js")を追加したら、キャッシュできるようになりました。

これで2回目からの起動時間が改善されるはずです。

### After:計測

辞書をキャッシュしたことで、起動までの時間が8913ms -> 2187msまで短縮できました。

![after](http://efcl.info/wp-content/uploads/2016/08/13-1471098703.png)

`console.log`と違って、このまま`window.performance.mark("AppBootStrap:end");`などを残してても特に害があるわけではありません。
コンソールへの出力を実装していないので、能動的に見ないかぎりは何も出力されてないように見えるためです。

最近のReactとかAngularなどを使ったサイトを作ると大体初期化ポイントがはっきりしていると思うので、とりあえずこのようなマーキングを仕込んでおくと、後から遅いポイントを探すのに便利かもしれないですね。

## パフォーマンスロガーを作る

実際には、クライアントサイドでログを出すだけではなく、いろんな環境で実行されたログを収集してボトルネックや処理がおかしい箇所などを見つけると思います。

そのためには、マーキングするだけではなくログ出力/送信も実装する必要がでてきます。
そうなった場合に、どのタイミングでログを取得するかというタイミングを図る必要がでてきます。

大体の場合は、計測したい地点がすべてマーキングできたら準備完了 -> ログ出力という形になると思います。

簡単に、performance-loggerという準備完了のタイミングを取るだけのライブラリを書いてみました。

- [azu/performance-logger: Simple Perf logger based on `performance.mark` API.](https://github.com/azu/performance-logger "azu/performance-logger: Simple Perf logger based on `performance.mark` API.")


```js
// LICENSE : MIT
"use strict";
const MapLike = require("map-like");// Mapと同じようなものです
const EventEmitter = require("events");
export default class PerfLogger extends EventEmitter {
    static get Events() {
        return {
            "mark": "mark",
            "complete": "complete"
        }
    }

    /**
     * @param {string[]} logItems logItems is list of event name
     */
    constructor(logItems = []) {
        super();
        this._isAlreadyOutput = false;
        this._completedEventMap = new MapLike();
        this._logItems = logItems;
    }

    /**
     * logged event names
     * @returns {string[]}
     */
    get markedNames() {
        return this._completedEventMap.keys();
    }

    get isAllMarked() {
        return this._logItems.every((eventName) => {
            return this._completedEventMap.has(eventName);
        });
    }

    /**
     * Mark log with `markerName`
     * @param {string} markerName
     */
    mark(markerName) {
        // output is only once
        if (this._isAlreadyOutput) {
            return;
        }
        this._addMarking(markerName);
        if (this.isAllMarked) {
            this.emit(PerfLogger.Events.complete);
            this._isAlreadyOutput = true;
        }
    }

    /**
     * `window.performance.mark` を使いマークを付けます
     * @param {string} markerName
     * @private
     */
    _addMarking(markerName) {
        if (this._completedEventMap.has(markerName)) {
            return;
        }
        this._completedEventMap.set(markerName, true);
        window.performance.mark(markerName);
        this.emit(PerfLogger.Events.mark, markerName);
    }
};
```

使うときは、以下のようにコンストラクタに準備完了に必要なマーキングの名前一覧を渡して、
そのマーキングが全部完了したら、`complete` イベントが呼ばれるという感じです。

```js
const PerfLogger = require("performance-logger");
// These events are completed and emit "end" event
const perfLogger = new PerfLogger([
    "a",
    "b"
]);
// All("a" and "b") complete!
perfLogger.on(PerfLogger.Events.complete, () => {
    window.performance.measure(
        "Taken a->b",
        "a",
        "b"
    );
    const entries = window.performance.getEntriesByType('measure');
    entries.forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}ms`);
    });
});
// mark "a"
perfLogger.mark("a");
// mark "b"
perfLogger.mark("b");
```

準備完了が完了してたら、既についてるマークから`window.performance.measure`で計測区間を作ります。
そして、`window.performance.getEntriesByType('measure');`で計測区間の一覧を取得して、区間の時間を出力しています。

```js
window.performance.measure(
    "Taken a->b",
    "a",
    "b"
);
const entries = window.performance.getEntriesByType('measure');
entries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
});
```

### おわり

`window.performance.mark`は扱いが簡単な割には結構面白いです。
`window`というグローバル空間にある利点として、後からつけたマークを取り出して見ることができます。

開発中は結構ラフにマークをつけていくと、面白いデータが見えるかもしれません。