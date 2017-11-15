---
title: "performance.markにメタデータを紐付けできるライブラリを書いた"
author: azu
layout: post
date : 2017-11-15T21:58
category: JavaScript
tags:
    - JavaScript
    - performance
    - library

---


`performance.mark`というパフォーマンス計測に役立つAPIがあります。
`performance.mark` APIを使うと、指定して処理をマーキングでき、その結果を開発者ツールでみれます。とても便利なのですが、そのマーキングとメタデータを紐付ける仕組みがありませんでした。

[![DevTool timeline](http://efcl.info/wp-content/uploads/2017/09/20-1505888631.png)](https://github.com/almin/almin/releases/tag/almin%400.14.0)

- [performance.markでパフォーマンス計測する | Web Scratch](http://efcl.info/2016/08/15/performance.mark/ "performance.markでパフォーマンス計測する | Web Scratch")
- [Almin + React/Vue.jsのパフォーマンスプロファイルをタイムライン表示できるように | Web Scratch](http://efcl.info/2017/09/20/almin-performance-profile-0.14.0/ "Almin + React/Vue.jsのパフォーマンスプロファイルをタイムライン表示できるように | Web Scratch")

TPAC 2017の[User Timing L3 - Google スライド](https://docs.google.com/presentation/d/1d64Y4rtLCxobGgljVySU2CJpMPK5ksaiZuv3ka1dCVA/edit#slide=id.p "User Timing L3 - Google スライド")では、`performance.mark` APIでメタデータ(`details`)を紐付けできる仕組みが提案されています。

```js
performance.mark(name, startTime, details)
```

これを使うと「Aという処理でデータを取得」を`performance.mark`でマーキングする際に、実際に取得したデータをとマーキングをメタデータ(`details`)によって紐付けられます。


これを速く使いたかったので`performance.mark`にメタデータを紐付けできる[performance-mark-metadata](https://github.com/azu/performance-mark-metadata "performance-mark-metadata")というライブラリを書きました。

- [azu/performance-mark-metadata: `performance.mark` with custom meta data.](https://github.com/azu/performance-mark-metadata "azu/performance-mark-metadata: `performance.mark` with custom meta data.")


## サポート環境

- モダンブラウザ と Node.js >= 8.5.0をサポートしています。
- [Performance.mark()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark "Performance.mark()") APIが使える環境ならOKです
- Node.jsも8.5.0で`perf_hooks`が追加されています。
- [Performance Timing API | Node.js v9.2.0 Documentation](https://nodejs.org/api/perf_hooks.html "Performance Timing API | Node.js v9.2.0 Documentation")

それ以外の環境では`Performance.mark()`のpolyfillが必要です。

- [nicjansma/usertiming.js: UserTiming polyfill](https://github.com/nicjansma/usertiming.js "nicjansma/usertiming.js: UserTiming polyfill")

## インストール

    npm install performance-mark-metadata

## 使い方

使い方は単純で`performance.mark`のProposalとよく似た形です。
`marker.mark(name, metadata)` を渡すようにしています。(全く同じにしなかったのは仕様変更の可能性もあるため)

メタデータを取り出すときは`marker.getEntryMetadata(entry)`で`entry`に紐づく`metadata`を取り出せます。

```js
import { PerformanceMetadataMarker } from "performance-mark-metadata";
const marker = new PerformanceMetadataMarker();
const metadata = {
    details: { key: "value" }
};
const markerName = "1";
// mark with metadata
marker.mark(markerName, metadata);
performance.getEntriesByName(markerName).forEach(entry => {
    const result = marker.getEntryMetadata(entry);
    /*
    {
        details: { key: "value" }
    };
    */
    assert.strictEqual(result, metadata, "should get same metadata");
});
```

`entry`オブジェクトは`performance.get*` APIで取得できます。

- [Performance.getEntries() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries)
- [Performance.getEntriesByName() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByName)
- [Performance.getEntriesByType() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)


## おわりに

`performance.mark`はシンプルながら結構便利なAPIです。
`performance.now`を使うため負荷的に優しく、とりあえず必要なマーキングをしておき、後から取り出して細かく計測(`measure`)できます。

単純なパフォーマンスのロギングと違ってブラウザやNode.jsで使える共通の仕様であるため、[Almin + React/Vue.jsのパフォーマンスプロファイルをタイムライン表示できるように | Web Scratch](http://efcl.info/2017/09/20/almin-performance-profile-0.14.0/ "Almin + React/Vue.jsのパフォーマンスプロファイルをタイムライン表示できるように | Web Scratch")のように他のライブラリと組み合わせ計測もできます。

今までは名前のみであったため処理時間しか取れるデータはありませんでしたが、[performance-mark-metadata](https://github.com/azu/performance-mark-metadata "performance-mark-metadata")を使うことで任意のメタデータを乗せられるので幅が広がるのかなと思います。
将来的にUser Timing APIの方にこの仕組みが入ったらそちらに移行していくのがいいかなと思います。