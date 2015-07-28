---
title: "npmパッケージをExampleテストしよう"
author: azu
layout: post
date : 2015-07-28T10:04
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

以下のスライドでも簡単に解説してますが、この記事はExampleテストのメリットやNodeモジュールでのやり方について書いていきます。

<!--<div class="kwout" style="text-align: center;"><a href="http://azu.github.io/slide/assistant-bucho/test-everything.html"><img src="http://kwout.com/cutout/c/eg/rb/qs2_bor.jpg" alt="http://azu.github.io/slide/assistant-bucho/test-everything.html" title="ロジック、E2E、描画、音、動画、Example、文章 - 色々なJSテスト" width="600" height="294" style="border: none;" /></a><p style="margin-top: 10px; text-align: center;"><a href="http://azu.github.io/slide/assistant-bucho/test-everything.html">ロジック、E2E、描画、音、動画、Example、文章 - 色々なJSテスト</a></p></div>
-->

## Exampleテストの終了条件

サンプルコードを実行した結果が正常終了であるという前提のため、異常系など全部をカバーするのは難しいと思います。
そういうのはロジックテストなど普通のテストコードでやるのがいいと思います。

## Exampleテストの利点

- 始めるのが簡単
- 実際に動くサンプルコードが作成できる
- ドキュメントの一部になる

### 始めるのが簡単

多くの人はライブラリを書いたらREADMEにサンプルコードを載せたりすると思います。
それを実際のファイルとして作れば大体Exampleテストのやることは完了です。

例) [azu/browser-runner](https://github.com/azu/browser-runner "azu/browser-runner")