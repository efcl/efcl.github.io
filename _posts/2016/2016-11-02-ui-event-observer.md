---
title: "同じイベントのaddEventListenerを1つにまとめるライブラリを書いた"
author: azu
layout: post
date : 2016-11-02T09:48
category: JavaScript
tags:
    - JavaScript
    - library
    - performance

---

`UIEventObserver`という同じ要素への同じイベントを貼る `addEventListener` を1つにまとめるライブラリを書きました。

- [azu/ui-event-observer: Provide performant way to subscribe to browser UI Events.](https://github.com/azu/ui-event-observer "azu/ui-event-observer: Provide performant way to subscribe to browser UI Events.")

## インストール

npmで入ります。     

	npm install ui-event-observer


## 1つにまとめる?

Reactなどのコンポーネント志向のライブラリを使っていると、各コンポーネントで同じ要素へ同じイベントを貼っていることがあります。

```js
// Component A
const handlerA = (event) => {}; 
window.addEventListener('scroll', handlerA);
// Component B
const handlerB = (event) => {};
window.addEventListener('scroll', handlerB);
```

[UIEventObserver](https://github.com/azu/ui-event-observer "UIEventObserver")では同じ事が、内部的に一つの`window.addEventListener('scroll', ...)`にまとめてられます。
(Pub/SubはEventEmitterが代わりにやる感じです)

```js
// singleton
const eventObserver = require("ui-event-observer");
// シングルトンじゃない方法
// require("ui-event-observer").UIEventObserver
// Component A
const handlerA = (event) => {}; 
eventObserver.subscribe(window, "scroll", handlerA);
// Component B
const handlerB = (event) => {};
eventObserver.subscribe(window, "scroll", handlerB);
```

[Example project](https://github.com/azu/ui-event-observer/tree/master/example/)では100個の"scroll"イベントを`window`に貼っています。

![addEventListener vs, UIEventObserver](https://monosnap.com/file/0L7z5AvZcuLKbCHxqB4sTU8TjRK0pk.png)

- Left: 100x `addEventListener`
- Right: 1 `UIEventObserver`

とlistenしてるイベントの数が100個以上から10個程度に減っていることが分かります。

[EventTarget.addEventListener](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener "EventTarget.addEventListener")はbubblingやcapturing、それらを止められる`preventDefault()`や`stopPropagation()`などEventEmitterに比べると高機能です。
[Passive Event Listeners](https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html "Passive Event Listeners")とかもその辺を制限することでパフォーマンスを改善すために導入されています。

同じ目的のライブラリとして[yahoo/subscribe-ui-event](https://github.com/yahoo/subscribe-ui-event "yahoo/subscribe-ui-event")がありますが、スロットリングなどがデフォルトにあったり色々高機能でした。
なので、単純にイベントを1つにまとめるだけの[azu/ui-event-observer](https://github.com/azu/ui-event-observer "azu/ui-event-observer: Provide performant way to subscribe to browser UI Events.")を作ったという話でした。

他の機能的な要素はプラグインで書けるようにするのがいいんじゃないかなと思っています。

- [Proposal: plugin system · Issue #1 · azu/ui-event-observer](https://github.com/azu/ui-event-observer/issues/1 "Proposal: plugin system · Issue #1 · azu/ui-event-observer")