---
title: "npmパッケージをExampleテストしよう"
author: azu
layout: post
date : 2015-07-29T10:04
category: JavaScript
tags:
    - npm
    - testing
    - JavaScript
    - Node.js

---

## Exampleテスト

自分がそう呼んでいるだけなので、正式名称があるのかよくわかりませんが、

あるライブラリを公開する際に、exampleディレクトリにそのライブラリを使って実際に動くサンプルコードを作って、それを実行するテスト

というのを示しています。

Go言語のExampleと近いような気がします。

- [testing - The Go Programming Language](http://golang.org/pkg/testing/ "testing - The Go Programming Language")

以下のスライドでも簡単に解説してますが、この記事はExampleテストのメリットやNodeモジュールでのやり方について書いていきます。

<div class="kwout" style="text-align: center;"><a href="https://azu.github.io/slide/assistant-bucho/test-everything.html"><img src="http://kwout.com/cutout/c/eg/rb/qs2_bor.jpg" alt="http://azu.github.io/slide/assistant-bucho/test-everything.html" title="ロジック、E2E、描画、音、動画、Example、文章 - 色々なJSテスト" width="600" height="294" style="border: none;" /></a><p style="margin-top: 10px; text-align: center;"><a href="http://azu.github.io/slide/assistant-bucho/test-everything.html">ロジック、E2E、描画、音、動画、Example、文章 - 色々なJSテスト</a></p></div>


## Exampleテストの利点

以下は思いついたExampleテストの良いところですが、これについて簡単に解説します。

- 始めるのが簡単
- 実際に動くサンプルコードが作成できる
- ドキュメントの一部になる
- `package.json`の設定ミスとかをチェックできる


### 始めるのが簡単

多くの人はライブラリを書いたらREADMEにサンプルコードを載せたりすると思います。
それを実際のファイルとして作れば大体Exampleテストのやることは完了です。

典型的なExampleテストの作り方は以下のような感じです。

1. `example/`ディレクトリを作成
2. `npm install --save-dev ../` ローカルモジュールでテストしたいライブラリを読み込む
3. ライブラリを使ったサンプルコードを書く

コマンドで見ると以下のような感じですね。

```sh
mkdir example
cd example
npm install --save-dev ../
# example.jsを作成...
# => example.jsを実行
node example.js
```

こうして作った`example.js`を実行した結果が正常終了ならば、Exampleテストをパスしたという単純なものなので特別なテストフレームワークなども不要で導入は簡単だと思います。

こうして作った`example.js`を`npm test`などで実行するようにすればExampleテストができます。

```
  "scripts": {
    "test": "(cd example && npm install && node example.js)"
  },
```


また、ロジックテストを書くことが難しいライブラリでも、単純に実行するだけなら書くことは簡単で少なくても実行して例外がでないというチェックを簡単に取り入れることが利点の一つです。

### 実際に動くサンプルコードが作成できる

例えば、`require("some")`して使うsomeライブラリを公開するとした場合、
ローカルモジュールを使うことで、サンプルコードから`require("../lib/some")`のような相対パスが不要になります。
`node_modules`以下にインストールされるので、ユーザーがライブラリを使うのと同じように`require("some")`と書くことができます。

例えば、[azu/browser-runner](https://github.com/azu/browser-runner "azu/browser-runner")のExampleテストでは[ローカルモジュールとして](https://github.com/azu/browser-runner/blob/d4003d7dae6f3766c9447c7310092529d16956f5/example/package.json#L15)本体のライブラリを読み込んでいるため、[browser-runner/example.js](https://github.com/azu/browser-runner/blob/master/example/example.js "browser-runner/example.js at master · azu/browser-runner")には相対パスが出てこないようになっています。

```js
var BrowserRunner = require("browser-runner");
var runner = new BrowserRunner({
    "browser": "phantomjs"
});
runner.runBrowser("http://example.com").then(function () {
    console.log("FINISH EXAMPLE!");
}).catch(console.error.bind(console));
```

つまり、ユーザーがコピペで動かせるようなサンプルコードが作れる事につながります。

実際に動かせるサンプルコードはドキュメントとしても役立つのでExampleテストはドキュメント的な性質もあるかもしれません。

後は、この作ったexample.jsを`npm test`とかで実行するようにするだけで、CIとかでも自動的にExampleテストが走るので便利です。

```
  "scripts": {
    "prepublish": "npm run build",
    "test": "mocha && (cd example && npm run example)"
  },
```

### `package.json`の設定ミスとかをチェックできる

`package.json`の"main"や"files"、npmignoreなどが色々合わさってnpm publishされるため、publishしたものにファイルが入ってなかったりそういうミスは結構多いです。

[npm publishのパターン](https://efcl.info/2015/04/09/npm-publish-pattern/ "npm publishのパターン")的なものを使ったり[dependency-check](https://www.npmjs.com/package/dependency-check "dependency-check")などでチェックしたりすることである程度カバーできます。

Exampleテストをするときにローカルモジュールとしてインストールして試せば、実際にその時点のpackage.jsonが使われるのでpackage.jsonのミスに気付きやすくなります。

例えば、"bin"のパスが間違ってたりするとExampleテストからコマンドを叩こうとするテストを書いておけば例外が起きるのでパスの間違いに事前に気付くちゃんとが増えるといった感じです。

### おわりに

Exampleテストはサンプルコードを実行した結果が正常終了であるという前提のため、異常系など全部をカバーするのは難しいと思います。
そういうのはロジックテストなど普通のテストでやるほうが楽で、両方できるとカバー出来る範囲は広がります。

テストを書くのが難しそうなものであった場合にとりあえずexampleだけでも書いて実行できるようにしておけば、結構安心感がでるのでオススメです。
