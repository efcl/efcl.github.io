---
title: "TypeScriptライブラリのdual packageを作るために、tsconfig-to-dual-packageを作った"
author: azu
layout: post
date: 2023-01-19T20:57
category: JavaScript
tags:
    - Node.js
    - ESM
    - JavaScript
    - CommonJS

---

現在、npmで公開されているNode.jsのライブラリには、次のような種類があります。

- Pure ESM:
  `package.json`で`type: 'module'`が指定されていて、ESM形式のみを含むパッケージ
  - 基本的にはESMから`import`文で読み込んで利用します
  - CJSからは、Dynamic
    Import(`import()`)でないと読み込みません(つまり非同期ロードになります)
- Dual Package:
  `package.json`の`exports`フィールドを使い、CJSとESMどちらの形式にも対応しているパッケージ
  - ESMからは`import`文で読み込んで利用します
  - CJSからは`require`関数で読み込んで利用します
- Faux ESM
  - `package.json`で`module: "./index.js"`が指定されていて、`import`と`export`のESMのモジュール形式を含むパッケージ
  - 主にwebpackのbundlerがTree
    Shakingするために、ESMのモジュール形式だけを部分的に採用しているパッケージ
  - 基本的にはDualと似ていますが、`exports`フィールドができる前に使われていた形式
  - [Enabling Modern JavaScript on npm - JASON Format](https://jasonformat.com/enabling-modern-js-on-npm/)
  - 今はwebpackのbundlerなどはDual
    Packageで対応できるため、今後は使われなくなる形式
- CJS: CommonJS形式のみを含むパッケージ
  - `require`関数で読み込んで利用します

これらのパッケージ形式がnpmの**パッケージ数**でどのぐらいの比率になっているかは、次のようなデータがあります。
このデータは、[npm-high-impact](https://github.com/wooorm/npm-high-impact)(多く利用されているパッケージ)のパッケージ形式を調べたものになっています。

![npm-esm-vs-cjs](/wp-content/uploads/2023/01/npm-esm-vs-cjs.svg)

> 出典:
> [wooorm/npm-esm-vs-cjs: Data on the share of ESM vs CJS on the public npm registry](https://github.com/wooorm/npm-esm-vs-cjs)

2022年11月時点ではおおよそ、次のような比率になっています。

- Pure ESM — 9%
- Dual Package — 3.8%
- Faux ESM — 13.7%
- CJS — 73.6%

📝
[実際に確認](https://github.com/wooorm/npm-esm-vs-cjs/blob/main/data/2022-11-04.json)してみるとESMとなっているものが実際はDualのものがあったため、実際はESMが減りDualはもう増えると思います(axios、parse5、yarg-parser、codemirrorなどの判定がおかしかった)。

この比率は、あくまで配布されている最新のバージョンのパッケージ形式の比率です。
そのため、古いバージョンもインストールできるnpmでは、実際にダウンロードされている比率とは異なります。

有名なESMのみのパッケージのダウンロード数を、CJSで配布していた最後のバージョンでのダウンロード数と比較しています。

| package name                                                                | CJS                | ESM              |
| --------------------------------------------------------------------------- | ------------------ | ---------------- |
| [node-fetch](https://www.npmjs.com/package/node-fetch?activeTab=versions)   | 21,599,451(2.6.7)  | 1,032,847(3.3.0) |
| [chalk](https://www.npmjs.com/package/chalk?activeTab=versions)             | 120,459,394(4.1.2) | 1,929,524(5.2.0) |
| [log-symbols](https://www.npmjs.com/package/log-symbols?activeTab=versions) | 15,049,341(4.1.0)  | 769,470(5.1.0)   |
| [remark](https://www.npmjs.com/package/remark?activeTab=versions)           | 1,467,455(13.0.0)  | 148,451(14.0.2)  |
| [got](https://www.npmjs.com/package/got?activeTab=versions)                 | 2,295,080(11.8.6)  | 533,386(12.5.3)  |

基本的には新しいバージョンの方がダウンロードはされにくいですが、大体CJSとESMでは1桁ダウンロード数は異なるようです。

とはいえ、[wooorm/npm-esm-vs-cjs](https://github.com/wooorm/npm-esm-vs-cjs)をみるとわかるように、
CJSのパッケージ数は徐々に減り、代わりにPure ESMとDual Packageが徐々に増えてきています。
そのため、npmで公開されているパッケージは、CJSからPure ESM または Dual Packageに移行が進んでいます。

## ライブラリをDual Pacakgeにする手法

ライブラリをPure ESMにするのは、CJSで書いていたものをESMにするだけなので単純です。
一方で、Dual Packageにするのは、簡単ではない場合もあります。

Dual Packageには、大きく分けると次のような実現方法があります。

1. CJSとESMで動くコードをそれぞれ書く
    - 2つソースコードを書く
2. 1つのソースコードから、CJSのコードを生成し、ESMはCJSをimportして読むだけのラッパーにする
    - パッケージ内にあるのはCJS形式で、ESMはCJSをimportしているラッパーになる
3. 1つのソースコードから、CJSとESMのコードを生成しそれぞれを読み込めるようにする
    - 1つのパッケージ内にCJS形式とESM形式のコードがそれぞれある
4. 1つのソースコードから、ESMのコードを生成し、CJSはESMをDynamic ImportするProxyとする
    - パッケージ内にあるのはESM形式で、CJSはDynamic ImportしてESMを読み込んでいるラッパーになる
    - 2の逆のパターンです

1は2重メンテナンスになるので、ほとんど見たことがありません。
Dual Packageといった場合には2と3のことを大体言っています。
4は特殊で、2の逆バージョンです。Viteがやっていますが、難易度が高いです。

- [Vite 3 が採用した CJS Proxy による Dual Package 構成](https://zenn.dev/teppeis/articles/2022-07-npm-dual-pacakge-cjs-proxy)

そのため、主に2と3の方法を使ってDual Packageを作っていきます。

