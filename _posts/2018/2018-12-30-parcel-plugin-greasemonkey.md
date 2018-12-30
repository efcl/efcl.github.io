---
title: "Parcelを使ってGreasemonkeyを開発するためのプラグインを書いた"
author: azu
layout: post
date : 2018-12-30T08:58
category: Greasemonkey
tags:
    - parcel
    - webpack

---

[Greasemonkey](https://ja.wikipedia.org/wiki/Greasemonkey)やブラウザの拡張を書く際にも、既存のnpmモジュールを使った方が簡単なことが多いです。
しかし、Greasemonkeyはデフォルトではnpmモジュールを読み込む方法が用意されていません。

そのため、[webpack](https://webpack.js.org/)や[Parcel](https://parceljs.org/)などのbundlerを使えば、Greasemonkeyスクリプトでもnpmモジュールが利用できます。
(bundleしたものがスクリプトの配布サイトのレビューを通らない場合もありますが、今回はGitHubで配布するのが気にしないです)

[codemirror-anywhere](https://github.com/azu/codemirror-anywhere)ではwebpackを使ったのですが、webpackは設定をしないといけないのがGreasemonkeyの手軽さを壊してしまうため、[Parcel](https://parceljs.org/)を使ってできないかと考えました。

[Parcel](https://parceljs.org/)は設定が不要ですが、Greasemonkey特有のヘッダーコメントを扱う方法がなかったため、[parcel-plugin-greasemonkey](https://github.com/azu/parcel-plugin-greasemonkey)という[Parcel plugin](https://parceljs.org/plugins.html)を書きました。

メモ: 一般的に次のようなコメントがファイルの先頭にあると、minifyによって消されたり、別の場所に移動されてしまったりする。(`/*!` ライセンスコメントだとヘッダとして認識されない可能性がある)

```
// ==UserScript==
// @name        codemirror-anywhere
// @namespace   http://efcl.info/
// @description codemirror-anywhere
// @include     http://*
// @include     https://*
// @version     ${version}
// @grant       none
// ==/UserScript==
```

## [parcel-plugin-greasemonkey](https://github.com/azu/parcel-plugin-greasemonkey)

[parcel-plugin-greasemonkey](https://github.com/azu/parcel-plugin-greasemonkey)はものすごく単純で、bundleしたファイルの先頭にGreasemonkeyのヘッダコメントを加えるプラグインです。

parcelとともにインストールして、ヘッダファイルの準備をするだけで後の設定は不要です。

## 使い方

次のようなファイル構造を例にします。

```
├── greasemonkey.header
├── yourscript.user.js
└── package.json
```

まず最初に`greasemonkey.header`という名前のファイルをプロジェクトルートに作成します。
`greasemonkey.header`にはGreasemonkeyの先頭に入れたいメタデータを書きます。
(今思いましたが、このファイルをjsとして読み込めるようにした方が柔軟性が高そうな気がしました)

```
// ==UserScript==
// @name user-script
// @namespace info.efcl
// @match https://*
// @grant none
// ==/UserScript==
```

次に、parcelとともに[parcel-plugin-greasemonkey](https://github.com/azu/parcel-plugin-greasemonkey)をインストールします。

```
npm install parcel-bundler parcel-plugin-greasemonkey --save-dev
```

後はparcelでビルドするだけです。
このときに、parcelのエントリポイントを `.user.js` のファイルにしてください。
`.user.js`のファイルのみにヘッダコメントを入れるプラグインなので、`.js`だと何も行いません。

また、Greasemonkeyだと`---no-source-maps --no-content-hash`をつけてビルドすれば、SourceMapなし かつ ファイル名のハッシュ値を除外できます。

```
parcel build ---no-source-maps --no-content-hash ./yourscript.user.js --out-dir ./dist
```

これで `./dist/yourscript.user.js`ファイルが生成されます。
後はインストールするだけです。

メモ: `parcel watch`を使えばファイル監視してビルドも可能です。

## おわりに

Parcelは設定なしで大体普通に動いてくれるので、プロトタイピング的な用途だったり、とにかくザクッと作りたいときに便利です。
[webpack](https://webpack.js.org/)だと、[Angular CLI](https://cli.angular.io/)や[Create React apps](https://github.com/facebook/create-react-app)や[Vue CLI 3](https://cli.vuejs.org/)などフレームワークなどに合わせた形になっていることが多いです。
わざわざこのようなものをwebpackで作るのはコスト的に大変なので、Parcelプラグインでザクッとできたのは良かったです。

また、Parcelの[Plugins API](https://parceljs.org/plugins.html)はほとんどイベントがないため、できることはあまり多くないです。

- [More events! · Issue #1660 · parcel-bundler/parcel](https://github.com/parcel-bundler/parcel/issues/1660)

このプラグインでも、ファイルを書き換えるという結構むりやりな実装をしているので、そのような細かい柔軟性が欲しい人は[Asset](https://parceljs.org/asset_types.html)として実装するか、[webpack](https://webpack.js.org/)を使うなどをした方がよさそうです。

- [azu/parcel-plugin-greasemonkey: Parcel plugin for Greasemonkey.](https://github.com/azu/parcel-plugin-greasemonkey)
