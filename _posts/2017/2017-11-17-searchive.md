---
title: "ローカルのPDFを全文検索するクライアント/サーバ/Electronアプリを書いた"
author: azu
layout: post
date : 2017-11-17T20:03
category: JavaScript
tags:
    - JavaScript
    - Electron

---

ローカルにあるPDFを全部検索して、その結果を一覧したいことがあります。
例えば、今[js-primer](https://github.com/asciidwango/js-primer "js-primer")という書籍を書いていて、他の書籍ではどんな扱い/用語になっているのかを調べいことがよくありました。

この手のアプリとしては論文管理の[Papers for Mac](https://www.readcube.com/papers/mac/ "Papers for Mac")などがありますが、検索したいだけなのに色々な機能がついていてまた、とりあえず作ってみることにしました。

[searchive](https://github.com/azu/searchive "searchive")というプロジェクト名にしてPDFからテキストを取り出す所やフロントエンドのElectronアプリ、PDFからテキストを取り出すのはブラウザでやるには遅いので、そこをサーバ側でやってくれる仕組みを作りました。

大体100冊ぐらいをインデックスに入れて検索していますが、数百ms以内に検索結果が出てるので意外と動くようです。

[![App](https://media.giphy.com/media/3o6fIYo3aDtasisB2M/giphy.gif)](http://www.giphy.com/gifs/3o6fIYo3aDtasisB2M)

## インストール

[Release page](https://github.com/azu/searchive/releases)からElectronアプリをダウンロードしてインストール出来ます。Electronアプリにはサーバの実装も入ってるので、アプリを入れるだけで動きます。

- [Latest Release](https://github.com/azu/searchive/releases/latest)からダウンロードしてインストール
  - 署名してないので、右クリックの"開く"からじゃないと怒られる

[AppVeyor](https://www.appveyor.com/ "AppVeyor")などのCIの設定が面倒だったので、Mac版のバイナリしか置いていませんが、[searchive-app](https://github.com/azu/searchive/tree/master/packages/searchive-app "searchive-app")をビルドすればどのOSでも動くと思います。またはPR歓迎です。

### 使い方

起動したら最初にPDFのインデックスを作る必要があります。

![image](http://efcl.info/wp-content/uploads/2017/11/17-1510917382.png)

メニューから設定を開くと、インデックスしたいファイルの場所を[glob](https://github.com/isaacs/node-glob "node-glob")で指定できます。
保存するとPDFからテキストを取り出した`index.json`を作り出してくれます。(とても重いので放置しておくといいです)

ローディングバーが消えて終わったら後は検索するだけです。
検索結果をフィルターすることができるので、大雑把な検索をしてからフィルターする使い方を想定しています。(検索の単位はPDFのページ)

[![App](https://media.giphy.com/media/3o6fIYo3aDtasisB2M/giphy.gif)](http://www.giphy.com/gifs/3o6fIYo3aDtasisB2M)

検索演算子はGitHubみたいなものが使えます。
ライブラリとしては[search-query-tester](https://github.com/azu/search-query-tester "search-query-tester")を使っています。

![keyword operator](http://efcl.info/wp-content/uploads/2017/11/17-1510924048.png)

## 作り方

[searchive](https://github.com/azu/searchive "searchive")はmonorepoのプロジェクトになっていて、細かい部品を独立したライブラリとして作っています。
それらを組み合わせて[searchive-app](https://github.com/azu/searchive/tree/master/packages/searchive-app "searchive-app")というアプリが動いています。

それぞれの部品を順番に紹介していきます。

### [`pdf-to-json`](https://github.com/azu/searchive/tree/master/packages/pdf-to-json) [![npm](https://img.shields.io/npm/v/pdf-to-json.svg?style=flat-square)](https://www.npmjs.com/package/pdf-to-json)

[pdf.js](https://github.com/mozilla/pdf.js "pdf.js")を使ってPDFからテキストを取り出してJSONにしてくれるライブラリです。ページごとのテキストをJSONにまとめてくれます。
実際にはpdf.jsのnpm版である[pdfjs-dist](https://github.com/mozilla/pdfjs-dist "pdfjs-dist")を使います。

pdf.jsは使いにくいライブラリ(というアプリに近い)なので、日本語などもちゃんと扱えるようにするのは工夫が必要です。

- [pdf.jsを使いブラウザで見られるPDFスライド表示ツールを作った | Web Scratch](http://efcl.info/2014/10/07/pdf-presentation/)
- [[pdf.js] テキスト選択出来るスライド表示ライブラリを書いた | Web Scratch](http://efcl.info/2015/12/07/pdf.js-controller/ "[pdf.js] テキスト選択出来るスライド表示ライブラリを書いた | Web Scratch")

cmapsというファイルをちゃんと読めないと日本語などが扱えません。
Node.jsで扱う公式のオプションはないので、テストコードを読んでURLをfsで代替するモック実装を使って読み込むことができました。

- <https://github.com/azu/searchive/blob/7ed276adfec3ec86ba421a9a2227e8333502e248/packages/pdf-to-json/src/pdf-to-json.ts#L15-L43>

### [`searchive-client`](https://github.com/azu/searchive/tree/master/packages/searchive-client)  [![npm](https://img.shields.io/npm/v/searchive-client.svg?style=flat-square)](https://www.npmjs.com/package/searchive-client)

[searchive](https://github.com/azu/searchive "searchive")の検索やインデックへの書き込みを扱う抽象レイヤーです。fsやブラウザAPIにも依存してないクリーンなJavaScriptとして動作する層です。

### [`searchive-create-index`](https://github.com/azu/searchive/tree/master/packages/searchive-create-index)  [![npm](https://img.shields.io/npm/v/searchive-create-index.svg?style=flat-square)](https://www.npmjs.com/package/searchive-create-index)

[`searchive-client`](https://github.com/azu/searchive/tree/master/packages/searchive-client)と[`pdf-to-json`](https://github.com/azu/searchive/tree/master/packages/pdf-to-json)を使って、実際にインデックファイルを作るライブラリでうｓ。
ファイルを読み込んだり、書き込んだりするのでNode.jsに依存しています。

### [`searchive-cli`](https://github.com/azu/searchive/tree/master/packages/searchive-cli) [![npm](https://img.shields.io/npm/v/searchive-cli.svg?style=flat-square)](https://www.npmjs.com/package/searchive-cli)

インデックを作ったり、実際に検索できるCLIです。
[`searchive-client`](https://github.com/azu/searchive/tree/master/packages/searchive-client)や[`searchive-create-index`](https://github.com/azu/searchive/tree/master/packages/searchive-create-index)が実装の殆どを持っているため数行ぐらいしかないCLIです。monorepoだとこういう切り離しがし易いのもメリットです。

テスト用に使ったりできます。

### [`searchive-server`](https://github.com/azu/searchive/tree/master/packages/searchive-server) [![npm](https://img.shields.io/npm/v/searchive-server.svg?style=flat-square)](https://www.npmjs.com/package/searchive-server)

Electronアプリはmain(Node.js)とrenderer(ブラウザ)のプロセスを両方持っていますが、こちらはNode.js側の実装です。
[`searchive-create-index`](https://github.com/azu/searchive/tree/master/packages/searchive-create-index)を使ってインデックス作るWeb APIや、インデックを検索して結果を返すWeb APIを実装しています。

REST APIの実装するサーバには[restify](https://github.com/restify/node-restify "restify")を使っています。
また、インデックスを作る処理は時間がかかるためREST APIでは不向きでした。
そこでWeb Socketを使ったAPIを実装して、クライアント側とはWebSocketで進捗をやり取りしています。
サーバ側のWebSocketsは[ws](https://github.com/websockets/ws "ws")を使い、クライアント側はブラウザネイティブの`WebSocket`を使っています。

### [`searchive-web-api-interface`](https://github.com/azu/searchive/tree/master/packages/searchive-web-api-interface) | [![npm](https://img.shields.io/npm/v/searchive-web-api-interface.svg?style=flat-square)](https://www.npmjs.com/package/searchive-web-api-interface)

主にWebSocketが原因でできたパッケージです。
WebSocketはReduxとかのActionみたいなコマンドをやり取りする必要があります。
それらの定義はサーバとクライアントどちらも共有したいので、インターフェイスだけを定義したパッケージを定義してサーバとクライアントではこれを使っています。

サーバ側に定義してしまうと、クライアントがサーバに依存するという問題が起きてしまうための回避策です。

### [`searchive-app`](https://github.com/azu/searchive/tree/master/packages/searchive-app "searchive-app")

最後にElectronで書かれたアプリです。
Electronはmain(Node.js)とrenderer(ブラウザ)の両方を持っているので、mainで[`searchive-server`](https://github.com/azu/searchive/tree/master/packages/searchive-server)のサーバを動かして、rendererからAPIを叩いて使っています。

Electronのセットアップは毎回苦戦するので、今回はElectron版`create-react-app`のような[electron-webpack](https://github.com/electron-userland/electron-webpack/ "electron-webpack")を使っています。
これで`yarn run dev`するだけで開発が始めらます。mainのソースが変わった場合はアプリが起動し直され、rendererの場合はHot Reloadingができる構成なので、面倒なwebpackを触れなくてよくて便利です。

[TypeScript](http://typescriptlang.org/)の対応も[Add-ons · electron-webpack](https://webpack.electron.build/add-ons "Add-ons · electron-webpack")を入れるだけで解決するので楽でした。

一方問題もあって、webpack-dev-serverを開発中は使って、buildした場合はhtmlになるので、`file:///`だと特権で動く処理がdevelopment中は動かないことがあります。(webviewの中でfileなコンテンツを表示するなどがhttpのページ上ではできない)

次の記事でも同様の構成について触れています。

- [React + TypeScript (+ Electron)でアプリを書き始めるときにやってること - Qiita](https://qiita.com/azu/items/a149501ca1b5864000a3 "React + TypeScript (+ Electron)でアプリを書き始めるときにやってること - Qiita")

Viewには[React](https://reactjs.org/)を使っていて、UIコンポーネントとしてMSの[Office UI Fabric](https://developer.microsoft.com/en-us/fabric "Office UI Fabric")を使っています。[Office UI Fabric](https://developer.microsoft.com/en-us/fabric "Office UI Fabric")はこういうアプリを作るときに便利なメニューやコンテキストメニュー、パネルなどがあるのでよく使ってます。

State管理には、[Almin](https://github.com/almin/almin "almin")を使っています。
基本的にやりたいことは次のようなことだけでした。

- (APIを叩いて)検索
- (WebSocketを繋いで)インデックスを更新
- フィルターを更新
- 設定パネルを開く/閉じる

Alminでは、やりたいこと(ユースケース)を1ファイル1ユースケースで書いていきます。

- [The Concept of Almin](http://azu.github.io/slide/2017/almin/concept-of-almin.html "The Concept of Almin")

なので、このアプリでは次のようなユースケースを書きました。

![usecase図](http://efcl.info/wp-content/uploads/2017/11/use-case.png)

> <https://github.com/almin/almin-usecase-map-generator>でユースケース図を生成

このアプリではドメインとかそこまでちゃんとやっても旨味がない気がしたので、UseCaseでイベントをdispatchして、Storeでイベントを受け取ってStateを更新する感じにしました。
Reduxでよく見るような形になってると思います。

[![Store](http://efcl.info/wp-content/uploads/2017/11/17-1510923816.png)](https://github.com/azu/searchive/blob/master/packages/searchive-app/src/renderer/store/SearchIndexStore/SearchIndexStore.ts)

後は、[almin-react-container](https://github.com/almin/almin/tree/master/packages/almin-react-container "almin-react-container")を使えば、AlminのStoreとReactのViewが自動で繋がるので、Stateが更新されたViewを更新するだけです。

#### TODO

- Electronのmainプロセスで重たい処理をすると、UIも固まるのでどうにかしたい
	- インデックスを作る処理が重たい
- この制限で検索結果に実際にpdfを表示するプレビューがでてきてないのでどうにかしたい
- PDF以外も原理的に対応できるのでテキストファイルも合わせて検索したい

## おわり

ローカルのPDFを全文検索する[searchive-app](https://github.com/azu/searchive/tree/master/packages/searchive-app "searchive-app")の紹介とそのプロジェクト構造の解説をしました。

最初は[elasticlunr.js](https://github.com/weixsong/elasticlunr.js "elasticlunr.js")とかを使った全文検索を実装していたのですが、単純にJSONを保存してその中身を単純にマッチしたほうが早かったので変更した経緯とかがあります。

勢いで自分用に書いたところが多いので、PRやIssueとかあったらよろしくお願いします。

- [azu/searchive: Search All My Documents{PDF}.](https://github.com/azu/searchive "azu/searchive: Search All My Documents{PDF}.")
