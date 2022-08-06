---
title: "Node.jsのツールで--cacheフラグを実装するためのライブラリを書いた"
author: azu
layout: post
date : 2022-08-04T21:38
category: JavaScript
tags:
    - Node.js
    - JavaScript

---

[ESLint](https://eslint.org/)、[Prettier](https://prettier.io/)などは`--cache`フラグという一度チェックしたファイルは、ファイルが変更されるまで再チェックしないキャッシュの仕組みを実装しています。

同様の仕組みを[textlint](https://textlint.github.io/)を実装したことはありますが、[file-entry-cache](https://github.com/royriojas/file-entry-cache)を使い結構煩雑な実装が必要になります。ファイル変更を元に処理結果をキャッシュする仕組みはある程度定型化されているのに、毎回同じような実装をツールごとに書くのは微妙だなと思ったので、ライブラリを書きました。

- [azu/file-cache: Node.js library that provide a cache for file metadata or file content.](https://github.com/azu/file-cache)

## `--cache`フラグの仕組み

`--cache`フラグの仕組みとしては、ファイルの内容のハッシュ値 or ファイルの更新時刻をキャッシュファイルとして保存して置きます。
次回に実行する際には、キャッシュファイルと実際のファイルの情報を比較して、変更がなければ処理をスキップするという仕組みで、処理時間の短縮を目的にしています。
(エラー結果をキャッシュするかはツールによります。しないツールの方が多い気はしています)

たとえば、`A.js`に対してLintする場合には、`A.js`にLintの処理をしてパスした場合はキャッシュに保存しておきます。
次回、Lintしたときに`A.js`の内容が変更されていない場合は、あらためてチェックはせずにそのままスキップします。

これに加えて、強制的にキャッシュをクリアしたいパターンもあります。
たとえば、ツール自体のバージョンを更新した場合は処理内容が変わる可能性があるので、キャッシュを利用せずに常に再チェックするのが正しいです。
また、ツールの設定内容が変更された場合も処理結果が変わる可能性があるので、キャッシュを利用せずに常に再チェックするのが正しいです。

## [@file-cache](https://github.com/azu/file-cache)での実装

[@file-cache](https://github.com/azu/file-cache)は、`@file-cache/core`パッケージとキャッシュのkeyを作るパッケージからなっています。
多くのツールでは、パッケージのバージョンでキャッシュをクリアしたいので`@file-cache/npm`というパッケージを合わせてインストールします。

    npm install @file-cache/core @file-cache/npm

[@file-cache](https://github.com/azu/file-cache)では、次のようなイメージでキャッシュの処理を実装できます。

```js
import { createCache } from "@file-cache/core";
import { createNpmPackageKey } from "@file-cache/npm"

const config = {/* ... */ };
const cache = await createCache({
    // Use hash value of the content for detecting changes 
    mode: "content", // or "metadata"
    // create key for cache
    keys: [
        // use dependency(version) as cache key
        () => createNpmPackageKey(["your-package-name"]),
        // use custom key
        () => {
            return JSON.stringify(config);
        }
    ],
    noCache: process.env.NO_CACHE === "true" // disable cache by the flag
});

const targetFiles = ["a.js", "b.js", "c.js"];
const doHeavyTask = (filePath) => {
    // do heavy task
}
for (const targetFile of targetFiles) {
    const result = await cache.getAndUpdateCache(targetFile);
    if (result.error) {
        throw result.error
    }
    if (!result.changed) {
        continue; // no need to update
    }
    doHeavyTask(targetFile);
}
// write cache state to file for persistence
await cache.reconcile();
```

このサンプルコードでは、次の場合に`doHeavyTask`の処理をファイルに対して行います。

- ファイルのコンテンツの中身が変更された場合
- `your-package-name`パッケージの`version`が変更されたとき
- `config`の中身が変更されたとき
- `NO_CACHE=true` で実行されたとき

オプションはそれぞれ次のような意味合いです。

- mode: "content" or "metadata"
  - "content" はファイルのハッシュ値を使う
  - "metadata" はファイルの変更時間を使う
    - "content"のようにファイルを読み込む必要がないため、早い
    - CIなどではgit cloneすると時間が更新されるため、キャッシュは利用できない
- keys:
  - キャッシュの複合キーを設定します
  - `@file-cache/npm`は指定したパッケージのバージョンをキーとして扱う関数を提供しています
- noCache:
  - trueの場合は、結果はキャッシュせずに、常に`changed: true`を返します
  - `--cache`フラグがあるときだけキャッシュするような実装に便利です

[file-entry-cache](https://github.com/royriojas/file-entry-cache)もそうですが、キャッシュファイルに実際に書き込みが行われるのは`reconcile()`を呼び出したタイミングです。
これは、書き込まれるまではメモリ上で管理していて、I/Oへのアクセスを減らしてパフォーマンスを安定させるためです。

デフォルトでは、キャッシュファイルは`node_modules/.cache/`の下に保存されます。
`cacheDirectory`オプションで保存先を変更できます。

```
|- node_modules
  |- .cache
    |- <pkg-name>
      |- <hash-of-cache-key>-<mode>
```

[create-validator-ts](https://github.com/azu/create-validator-ts)では[v4.0.0](https://github.com/azu/create-validator-ts/releases/tag/v4.0.0)で、この[@file-cache](https://github.com/azu/file-cache)を使った`--cache`フラグを実装しています。

- [feat: add --cache flag by azu · Pull Request #19 · azu/create-validator-ts](https://github.com/azu/create-validator-ts/pull/19)

[create-validator-ts](https://github.com/azu/create-validator-ts)ではデフォルトはキャッシュしないので`noCache`オプションを使い、`--cache`フラグがついた時だけキャッシュを使うようにしています。

## [@file-cache](https://github.com/azu/file-cache)のmonorepo

[@file-cache](https://github.com/azu/file-cache)はmonorepoになっていて、[moon](https://moonrepo.dev/)と[Packemon](https://packemon.dev/)を使ってパッケージを公開しています。
次のスライドで、[moon](https://moonrepo.dev/)と[Packemon](https://packemon.dev/)について紹介しています。

- [🌕 moonでのmonorepo管理とpackemonでのCJS/ESMのdual package](https://azu.github.io/slide/2022/moa/moon-packemon.html)

[@file-cache](https://github.com/azu/file-cache)自体は`type: module`のESMとして作っていますが、[Packemon](https://packemon.dev/)を使ってCJS/ESM両方に対応したdual packageとして公開しています。
そのため、CJSとESMどちらのツールからも利用できるようにしています。

また、CJSとESM両方に対応したパッケージとして公開していますが、内部的にはPure ESMの外部パッケージを読み込んでいます。
CJSからも`import()`を使うことでPure ESMのパッケージである[pkg-dir](https://github.com/sindresorhus/pkg-dir)を読み込むことができます。

- https://github.com/azu/file-cache/blob/90eaa4c16644f5fd7d11fdecf541fb5a390429c9/packages/core/src/index.ts#L79

CJS/ESMのdual packagesは色々な問題がありますが、なんとか動くものができた感じがします。

TypeScript単独だと`.cjs`と`.mjs`の出し分けは現実的に難しいです。
なぜなら、TypeScriptは`import a from "./a.js"`するときに`.js` suffixのパスを要求しますが、そのパスを書き換えずに出力するため、`.cjs`と`.mts`の出しわけが`tsc`のみだとできません。
(根本的にNode.jsの`type`/`exports`の仕組みと[TypeScript Design Goals](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)が噛み合ってない気がします)

- [Feature Request: allow change file extension of generated files from `.ts` · Issue #49462 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/issues/49462)

`.cjs`と`.mjs`を出しわけしない方法として、どちらかをメインにしてラッパーを作るアプローチもあります。

- [Vite 3 が採用した CJS Proxy による Dual Package 構成](https://zenn.dev/teppeis/articles/2022-07-npm-dual-pacakge-cjs-proxy)
- [Automatic .mjs wrappers for .cjs inputs](https://packemon.dev/docs/features/#automatic-mjs-wrappers-for-cjs-inputs)

どちらにしても何かしらのtranspilerやbundlerがないと、CJS/MJSに対応したdual packagesを作るのは難しいかなというのが感想です。
[Packemon](https://packemon.dev/)は、その中でもメンテコストが少ないかなーという印象です。
(というよりも[`exports`の仕様](https://nodejs.org/api/packages.html#package-entry-points)が複雑すぎて、[exportsを解釈するツールのバグ](https://github.com/milesj/packemon/pull/140)があったりと、本当に難しい)
