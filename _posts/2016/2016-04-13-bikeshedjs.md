---
title: "Bikeshed.js アウトラインメモ"
author: azu
layout: post
date : 2016-04-13T23:11
category: イベント
tags:
    - JavaScript
    - イベント

---


[Bikeshed.js - connpass](http://connpass.com/event/29019/ "Bikeshed.js - connpass")に参加したメモ

-----

## 『let vs. const』 @yosuke_furukawa


- Effective Java
- 気持ちはImmutable
- スレッドがないJavaScriptだと微妙
- `const` だけで防げるのか
	- const + `Object.freeze`
	- Map+SetとかもImmutableではないのでimmutable.jsなどを使う必要がある
- やる意味
	- `prefer-const`
	- let使うときはforでぶん回す時ぐらい
	- 逆にletつかているところを見ると注意して見るようになった
	- やりたいことはconst 強制 => 初学者のミスを減らせる
- 基本的には `const` を使う

------

## セミコロン付けるつけない - @yoshiko_pg

- 付ける人が殆ど


------

[Bikeshed.js](https://app.sli.do/event/rewvfpmz/ask "Bikeshed.js")のボードを見ながら自転車置場の議論をした。

インデントとか改行位置とかスタイルの話が殆どだった。

自分は設計においてこういうどっちでもいいような議論が多くあると思ってるので、JavaScriptとCSSの設計についてのスライドを用意したけど使わなかったので忘れる。

- [Read/Write Stack | JavaScriptアーキテクチャ](https://azu.github.io//slide/2016/bikeshedjs/javascript-read-write-stack.html)
- [コンポーネントとCSSのアーキテクチャ](https://azu.github.io//slide/2016/bikeshedjs/component-css-architecture.html)

------


## power-assertがツールになった話 - twada

- [power-assert make `assert()` of assert module silent · Issue #43 · power-assert-js/power-assert](https://github.com/power-assert-js/power-assert/issues/43 "power-assert make `assert()` of assert module silent · Issue #43 · power-assert-js/power-assert")

のissueでは、

```js
const assert = require("assert");
export function hello(name) {
    assert(typeof name === "string");
    return "Hello " + name;
}
```

のようなコードをプロダクション側(テストではない)に書いてた時に、`assert()`の中身がpower-assert化(位置情報などを含んだオブジェクトを返す)されてしまい、常に`assert(object)`をパスしてしまうという問題。

これは、次のように`power-assert`が使われていれば解決すること。

```js
const assert = require("power-assert");
export function hello(name) {
    assert(typeof name === "string");
    return "Hello " + name;
}
```

そのため、`require("assert")`　を `require("power-assert")` するものが同時に行われればいいということで、[babel-plugin-empower-assert](https://www.npmjs.com/package/babel-plugin-empower-assert "babel-plugin-empower-assert")というプラグインができた。


しかし、このプラグインはあくまでオプトインなので、既存の`babel-plugin-espower`だけを使ってる人は自分で以下のように追加する必要がある。

```js
{
  "presets": [
  ],
  "env": {
    "development": {
      "plugins": [
        "babel-plugin-empower-assert",
        "babel-plugin-espower"
      ]
    }
  }
}
```

毎回2つのプラグインをいれるのは面倒だということで、[babel-preset-power-assert](https://github.com/twada/babel-preset-power-assert "babel-preset-power-assert")という2つのプラグインをまとめたpresetsが追加された。


これにより、`require("power-assert")`ではなく、ただの`require("assert")`もpower-assert化された状態でassertionが行えるようになった。

```js
{
  "env": {
    "development": {
      "presets": [
        "babel-preset-power-assert"
      ]
    }
  }
}
```


コード上からはNode.jsのassertモジュールに見えるけど、Babelによってpower-assertモジュールに差し替えられるため、power-assertはライブラリではなくツールになったという話。


-----

おわり