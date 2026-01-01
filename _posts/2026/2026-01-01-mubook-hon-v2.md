---
title: "mubook-hon v2: EPUBビューアーをfoliate-jsに移行、Cloudflare Workersへ移行"
author: azu
layout: post
render_with_liquid: false
date : 2026-01-01T21:36
category: JavaScript
tags:
    - epub
    - pdf
    - JavaScript
    - Notion

---

[mubook-hon](https://github.com/azu/mubook-hon)は、Dropboxに保存したEPUB/PDFファイルをブラウザで読めるウェブアプリです。
Notionと連携して、読書メモや進捗をNotionに記録できます。

- mubook-hon: <https://mubook-hon.jser.workers.dev/>
- GitHub: <https://github.com/azu/mubook-hon>

URLが `https://mubook-hon.vercel.app/` から `https://mubook-hon.jser.workers.dev/` に変更されました。

前回の記事から約2年半が経ち、大きな変更をしたので紹介します。

- [mubook-hon: Dropboxに保存したepubやPDFを読むビューア、Notionにメモや読んでいる位置を記録できるMobile/PC対応のウェブアプリ | Web Scratch](https://efcl.info/2023/07/29/mubook-hon/)

## EPUBビューアーをBibiからfoliate-jsに移行

EPUBの表示エンジンを[Bibi](https://bibi.epub.link/)から[foliate-js](https://github.com/johnfactotum/foliate-js)に移行しました。

- [feat: replace Bibi with foliate-js for EPUB viewer by azu · Pull Request #28](https://github.com/azu/mubook-hon/pull/28)

foliate-jsは[Foliate](https://johnfactotum.github.io/foliate/)というLinux向けの電子書籍リーダーのJavaScript実装です。
Web Componentベースで実装されており、カスタマイズ性の高い点が特徴です。

Bibiと比較して、次の点が改善されました。

- 初期化の高速化 - インクリメンタルパースにより、EPUBファイルの読み込みが高速化
- メモリ消費の削減 - メモリ管理の改善により、メモリ使用量が減少
- 仕組みの簡素化 - Bibiの時は[MSWでService Workerプロキシを実装してBibiの求める形式/URLのパスで返す](https://github.com/azu/mubook-hon/blob/d68d690477cca9adaf07da8ca8127921da6308b8/app/viewer/bibi-epub/BibiReader.tsx#L118-L202)必要があり複雑だった。foliate-jsではこの回り道が不要になりシンプルに

![mubook-hon on PC](https://efcl.info/wp-content/uploads/2026/01/X.jpeg)

![mubook-hon on Mobile](https://efcl.info/wp-content/uploads/2026/01/mobile-mubookhon.jpeg)

### 9ゾーンタップ設定

画面を3x3の9ゾーンに分割し、各ゾーンにアクションを割り当てられるようになりました。

- [feat: add customizable 9-zone tap settings for EPUB viewer by azu · Pull Request #32](https://github.com/azu/mubook-hon/pull/32)

設定画面から、各ゾーンに「次ページ」「前ページ」「メニュー」「閉じる」「なし」を割り当てられます。
プリセットとして「Default」「Right Hand」「Left Hand」を用意しています。

![Tap Zones](https://efcl.info/wp-content/uploads/2026/01/tapzone.jpeg)

## VercelからCloudflare Workersへ移行

ホスティングをVercelからCloudflare Workersに移行しました。

- [refactor: migrate from Vercel to Cloudflare Workers by azu · Pull Request #31](https://github.com/azu/mubook-hon/pull/31)

Notion APIはCORSに対応していないため、ブラウザから直接APIを呼び出すことができず、プロキシが必要です。
VercelのServerless Functionsには[4.5MBのBodyサイズ制限](https://vercel.com/docs/errors/FUNCTION_PAYLOAD_TOO_LARGE)があり、今後の障壁になる可能性があるためCloudflare Workersへ移行しました。
Next.jsをstatic exportで公開し、Cloudflare Workersでプロキシを実装することで、同一ドメインでシンプルな構成になりました。

## O'Reillyハイライトインポート

Kindleに加えて、[Learning Platform - O'Reilly Japan](https://learning.oreilly.com/)のハイライトも半分自動でインポートできるようになりました。

インポートページでは、コピーボタンとブックマークレットを用意しています。
ブックマークレットをブックマークバーにドラッグしておけば、ワンクリックでハイライトを抽出して、それをmubook-hon形式でNotionにインポートできます。

最近のOreilly Learningでは、AI翻訳で日本語で書籍が読めることが多くなったので、Oreillyのアプリで読んでそのハイライトをNotionに取り込みたい時に使っています。

- [Search | O'Reilly](https://learning.oreilly.com/search/?q=*&rows=100&language=ja&order_by=created_at): 2026-01-01時点で928冊ある

ACM経由なら$174/yearで利用できるので、結構おすすめです。

- [ACM会員になるとO'Reilly本が読み放題](https://zenn.dev/s3works/articles/20231128_acm-oreilly)
- [ACMに入会してオライリー学習プラットフォームをちょっとお得に利用しよう！｜sekineko (papipupepujii)](https://note.com/papipupepujii/n/n2785fb3a56a5)

## IndexedDBのキャッシュ問題

Safari/iOSでは、IndexedDBにBlobを保存すると、ページ遷移時などにBlobの破損が発生しました。この問題はiOS 17.4.1から報告されており、iOS 18でも発生していました。
mubook-honでは、SWRのキャッシュ実装でこの問題が発生したため修正しました。

- [Blob URLs not Working on iOS 17.4.1 | Apple Developer Forums](https://developer.apple.com/forums/thread/751063)

Blobオブジェクトのsizeやtypeプロパティは存在するものの、実際にデータを読み取ろうとすると壊れている状態になります。

対策として、BlobではなくArrayBufferを保存するように変更しました。

```js
// Before: Blobを直接保存（Safariで破損する可能性あり）
await db.put('cache', blob, key);

// After: ArrayBufferとして保存
const arrayBuffer = await blob.arrayBuffer();
await db.put('cache', arrayBuffer, key);

// 読み出し時にBlobに変換
const arrayBuffer = await db.get('cache', key);
const blob = new Blob([arrayBuffer], { type: 'application/epub+zip' });
```

- [fix: store ArrayBuffer instead of Blob in IndexedDB cache · azu/mubook-hon@dc29ffe](https://github.com/azu/mubook-hon/commit/dc29ffe78f8cde8d6a07deb70532f7f10d83b0cb)

## まとめ

mubook-honは、Dropboxに保存したEPUB/PDFファイルをブラウザで読めるウェブアプリ かつ 読書メモの管理ツールです。
自分でもよく使っていて、EPUBをよく読むためインクリメンタルにレンダリングできる方式を求めてfoliate-jsへ移行しました。

飛行機などで完全オフライン対応が欲しくなるため、Service Workerでの対応を検討しています。

また、[Amazon、一部のKindle本がEPUBまたはPDF形式でのダウンロードに対応へ。2026年1月20日から](https://internet.watch.impress.co.jp/docs/yajiuma/2071209.html)というニュースもあり、EPUBリーダーの需要は増えそうです。

書籍リーダーは7回目(mubook-honを2回作り直してる)ぐらいですが、だいぶ満足度の上がるものを作れるようになった気がします。

- [azu/mu-epub-reader](https://github.com/azu/mu-epub-reader)
- azu/epub-to-text: EPUBをVoiceVoxで読み上げた動画にするツール。動画にすることでバックグラウンドでも音として聴ける（Kindleの読み上げはよく止まるので作った）。ページ捲り=シークバーになるというアイデア
- [azu/bi-epub-reader](https://github.com/azu/bi-epub-reader)
- [azu/mu-pdf-viewer](https://github.com/azu/mu-pdf-viewer)
- [azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator)

---

- mubook-hon: https://mubook-hon.jser.workers.dev/
- GitHub: https://github.com/azu/mubook-hon
- mubook-honのNotionテンプレート: https://efcl.notion.site/mubook-hon-addce6c324d44d749a73748f92e3a1a6
