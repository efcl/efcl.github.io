---
title: "ブラウザ、Node.js、インメモリで動くlocalStorageライブラリ"
author: azu
layout: post
date : 2018-12-29T10:02
category: JavaScript
tags:
    - JavaScript
    - library
    - polyfill
    - ponyfill

---

シンプルなストレージとしてlocalStorage的なものが欲しくなることはよくあるのですが、Node.jsで動かなかったり、インメモリ版が欲しくなったりと色々な状況があります。

毎回そういうときに考えるのが面倒だったので、`mode`で全部の状況を切り分けできるlocalStorageの[ponyfill](https://github.com/sindresorhus/ponyfill)的なライブラリを作りました。
[ponyfill](https://github.com/sindresorhus/ponyfill)とはmonkey patch的にグローバルを書き換えるのではなく、同じAPIを持ったオブジェクトを返すようなpolyfillライブラリです。

- [azu/localstorage-ponyfill: Universal LocalStorage for browser and Node.js.](https://github.com/azu/localstorage-ponyfill)

## インストール

Install with [npm](https://www.npmjs.com/):

    npm install localstorage-ponyfill

TypeScriptで書いてあるので、型定義ファイルは同梱されています。

## 使い方

### Auto(Browser or Node.js)

デフォルトでは`mode`が`auto`なので、実行環境によって自動的にstorageを切り分けします。

次のような条件式なので、ブラウザは`localStorage`、Node.jsはファイルを使った[node-localstorage](https://github.com/lmaccherone/node-localstorage "node-localstorage")になります。

- If the environment defined `window.localStorage` -> "browser"
- else -> "node"

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage();
localStorage.setItem("key", "value");
const value = localStorage.getItem("key");
assert.strictEqual(value, "value");        
```

### Browser

`mode`を`"browser"`に明示的に指定した場合は、ネイティブの`localStorage`になります。
Node.jsの場合でも指定できますが、`localStorage`が`window`にないとエラーです。

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "browser" });
```

### Node.js

`mode`を"`node"`にした場合は[node-localstorage](https://github.com/lmaccherone/node-localstorage "node-localstorage")を使います。

デフォルトは `<app-root>/.cache/localstorage-ponyfill/*` にファイルとして保存されます。
 
```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "node" });
```

`storeFilePath`オプションで保存先を指定できます。

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "node", storeFilePath: "./path/to/dir" });
```

Note: [ブラウザとNode.jsのentry pointは分けている](https://github.com/azu/localstorage-ponyfill/blob/5251a3a5a2c6d9d6ffb3da76072826e90794fba9/package.json#L23-L25)ので、ブラウザで`node`は指定できません。
ブラウザに余計な依存が入らないようにするためにこういう構造にしています。

### InMemory

インメモリ版はブラウザとNode.jsどちらでも動きます。
[localstorage-memory](https://github.com/gr2m/localstorage-memory "localstorage-memory")を使っています。

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "memory" });
```

## API

[Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)と同じです。

```ts
export interface LocalStoragePonyfill {
    readonly length: number;

    clear(): void;

    getItem(key: string): string | null;

    key(index: number): string | null;

    removeItem(key: string): void;

    setItem(key: string, data: string): void;

    [key: string]: any;

    [index: number]: string;
}
```

作った後は`localStorage`と同じAPIを使って読み書きします。

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage();
localStorage.setItem("key", "value");
const value = localStorage.getItem("key");
assert.strictEqual(value, "value");        
```

## リポジトリ

- [azu/localstorage-ponyfill: Universal LocalStorage for browser and Node.js.](https://github.com/azu/localstorage-ponyfill)