---
title: "express + ts-nodev-dev利用時に、遅延ロードをして起動時間を早くするためのライブラリを書いた"
author: azu
layout: post
date : 2021-02-22T00:19
category: JavaScript
tags:
    - Node.js
    - JavaScript

---

[Express](https://expressjs.com/)を使ったアプリケーションの起動を早くするために、ルーターを遅延ロードできる[express-lazy-router](https://github.com/azu/express-lazy-router)というライブラリを書きました。

## モチベーション

[Express](https://expressjs.com/)を使ったウェブアプリを書くときに、TypeScriptをコンパイルするために[ts-node](https://github.com/TypeStrong/ts-node)([ts-node-dev](https://github.com/wclr/ts-node-dev)を使っています。
これは、起動時にすべてのTypeScriptファイルをコンパイルすることを意味しています。

大量のファイルのコンパイルはWebアプリケーションの起動を遅くします。
`ts-node`などは`import`したファイルをその場で同期的にコンパイルする仕組みであるため、読み込むファイルが多いほどコンパイル時間が長くなります。

起動時には必要ない後でコンパイルすることで、Node.jsアプリの起動時間を短縮できます。
[express-lazy-router](https://github.com/azu/express-lazy-router)は、この不要なモジュールを遅延ロードするための仕組みです。

- [Compilation is unbelievably slow · Issue #754 · TypeStrong/ts-node](https://github.com/TypeStrong/ts-node/issues/754)

フロントエンドでは、既にReact Router, Vue Routerなどのルータライブラリを使って遅延ロードするのが一般的です。

- [Route-based code splitting | React](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting)
- [Lazy Loading Routes | Vue Router](https://router.vuejs.org/guide/advanced/lazy-loading.html)

また、[webpack](https://github.com/webpack/webpack)では実験的な機能として[extrems.lazyCompilation](https://github.com/webpack/webpack/releases/tag/v5.17.0)をサポートしています。

これと同じことを[Express routing](https://expressjs.com/en/guide/routing.html)でもしたいというのがモチベーションです。

## 導入結果

最初にどのぐらい変わるのか、実際のアプリケーションで試した結果を載せておきます。

> ts-node-dev + express + Docker for mac

- Before
  - 起動時に 123 tsファイル をコンパイル
  - 起動までの時間: 34236ms
- After(express-lazy-routerを使用):
  - 起動時に 14 tsファイル をコンパイル
  - 起動までの時間: 14238ms

まとめとしては次の通りです。

- コンパイル時間は1tsファイルあたり200msかかっている
- コンパイルするファイル数が減ったので、34236ms → 14238msまで起動時間が短縮できた(約20秒早くなった

## Install

Install with [npm](https://www.npmjs.com/):

    npm install express-lazy-router

## 使い方

Expressの `app.use(path, handler)` のhandler部分に Dynamic ImportでRouterモジュールを読み込むようにします。

```ts
import express from 'express';
import { createLazyRouter } from 'express-lazy-router';
const lazyLoad = createLazyRouter({
    // In production, Load router asap
    preload: process.env.NODE_ENV === 'production',
});
const app = express();
// Load ./api.js when receive request to "/api"
app.use(
    '/api',
    lazyLoad(() => import('./api')),
);
app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:8000`)
});
```

この例では、実際に `/api` にアクセスがきたときに `./api.ts` 読み込まれてコンパイルされます。
[`React.lazy`](https://ja.reactjs.org/docs/code-splitting.html)を使った遅延ロードとほぼ同じ仕組みです。

本番では、遅延ロードする必要性はないので`preload`オプションでproductionならプリロードするように指定しています。

### 具体的な例

もう少し具体的なコードで、どのように遅延ロードするように変更するかを見ていきます。

**Before**: まだ遅延ロードしてないコードです。

`index.js`:

```js
import express from 'express';
import api from "./api";
const app = express();
app.use(
    '/api',
    api
);
app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:8000`)
});
```

`api.js`:

```js
import express from 'express';
const router = express.Router();
// GET api/status
router.get("/status", (_, res) => {
    res.json({ ok: true })
});
export default router;
```

このときには、次のような流れでファイルが読み込まるので、起動前にすべてのファイルを読み込んでいます。

- load `index.js`
- load `api.js`
- complete to launch the express app 
- `GET /api/status`
- > `{ ok: true }`

**After**: 遅延ロードを導入したバージョンです。

`index.js`:

```diff
import express from 'express';
- import api from "./api";
+ import { createLazyRouter } from 'express-lazy-router';
+ const lazyLoad = createLazyRouter({
+     preload: process.env.NODE_ENV === 'production',
+ });
const app = express();
app.use(
    '/api',
-    api
+    lazyLoad(() => import("./api"))
);
app.listen(8000, () => {
    console.log(`Example app listening at http://localhost:8000`)
});
```

`api.js`: 特に変更はいりません。

遅延ロードに変更した場合(productionではないとき)は次のような流れでファイルが読み込まれます。
`api.js` は実際にリクエストがきたタイミングで読み込まれます。(`ts-node-dev`を使っているならこのタイミングでコンパイルします)

- load `index.js`
- complete to launch the express app
- `GET /api/status`
- load `api.js`
- > `{ ok: true }`

## おわりに

[Express](https://expressjs.com/)アプリケーションをルータ単位で遅延ロードする[express-lazy-router](https://github.com/azu/express-lazy-router)を作りました。

モチベーション的には、`ts-node`([ts-node-dev](https://github.com/wclr/ts-node-dev))のコンパイルがボトルネックになりそうなぐらい遅いところから来ています。

- [Compilation is unbelievably slow · Issue #754 · TypeStrong/ts-node](https://github.com/TypeStrong/ts-node/issues/754)

ただ、TypeScriptを使っていない場合でも、`require`しているモジュールが巨大だとロード時間がかかり起動時間が遅くなることがあります。
どのモジュールのロード時間が長いかは次のツールを使うとデバックできます。

- [GoogleCloudPlatform/require-so-slow: `require`s taking too much time? Profile 'em.](https://github.com/GoogleCloudPlatform/require-so-slow)

そのため、TypeScriptやBabelなどのコンパイルをしていない場合でも遅延ロードは一定の効果があると思います。
アプリケーションが巨大になるほど遅くなるだけだと問題があります。
ルーター単位で切り出すのはクライアントサイドでもよく見る光景なので、サーバサイドでもやれるようにしたのが[express-lazy-router](https://github.com/azu/express-lazy-router)の発想です。