---
title: "Jestなどを使わずにスナップショットテストを書く"
author: azu
layout: post
date : 2018-02-02T19:28
category: JavaScript
tags:
    - JavaScript
    - testing

---

スナップショットテストといえば[Jest](https://github.com/facebook/jest "Jest")や[snap-shot-it](https://github.com/bahmutov/snap-shot-it "snap-shot-it")などが有名です。
しかし、どちらもそれ自体がAssertionを含むため、比較したいだけには大掛かりな仕組みです。

- [スナップショットテスト · Jest](https://facebook.github.io/jest/docs/ja/snapshot-testing.html "スナップショットテスト · Jest")

自分がスナップショットテストを書くときはいつもその場でパターン化したテストコードを書いています。

## スナップショットテスト

スナップショットテストは、何かの入力を受け取り、その出力とファイルに保存しておいた前回の出力結果を比較してテストする手法だと思います。
主な目的はコードの変更して既存の機能を壊してしまうようなリグレッションを防ぐことです。

Babelプラグインのようなコード変換、パーサ、ジェネレータなど何かの入力を受け取り出力できるものに利用できます。

入力と出力の組み合わせをどんどん作っていけばテストも増えるので、テストを簡単に増やせるのが特徴的です。

## スナップショットテストを書く

次のようなテストコードを書きます。(これはMochaを使っていますが大体どんなテストフレームワークでも同じことが出来ます。)

次のスナップショットでは、`transform`というJSONを入力に受け取り、JSONを出力する関数をテストしています。

`snapshot-test.js`:

```js
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const fixturesDir = path.join(__dirname, "snapshots");
// 変換する関数
const transform = require("../transform");

describe("Snapshot testing", () => {
  fs.readdirSync(fixturesDir)
    .map(caseName => {
      const normalizedTestName = caseName.replace(/-/g, " ");
      it(`Test ${normalizedTestName}`, function() {
        const fixtureDir = path.join(fixturesDir, caseName);
        const actualFilePath = path.join(fixtureDir, "input.json");
        const actualContent = fs.readFileSync(actualFilePath, "utf-8");
        const actual = transform(actualContent);
        const expectedFilePath = path.join(fixtureDir, "output.json");
        // UPDATE_SNAPSHOT=1 npm test で呼び出したときはスナップショットを更新
        if (process.env.UPDATE_SNAPSHOT) {
          fs.writeFileSync(expectedFilePath, JSON.stringify(normalizedActual, null, 4));
          this.skip(); // スキップ
          return;
        }
        // inputとoutputを比較する
        const expected = JSON.parse(fs.readFileSync(expectedFilePath, "utf-8"));
        assert.deepEqual(
          actual,
          expected,
          `
${fixtureDir}
${JSON.stringify(actual)}
`
        );
      });
    });
});
```

### スナップショットファイルの作成

先ほどのテストに書いた `fixturesDir` に対して、テストケース毎のディレクトリを作っていくだけです。
それぞれのディレクトリには、入力となる`input.json`、出力となる`output.json`を作って配置していくだけです。


```
├── snapshot-test.js
└── snapshots
    ├── テストケース名1
    │   ├── input.json
    │   └── output.json
    └── テストケース名1
        ├── input.json
        └── output.json
```

### スナップショットのテスト作成

スナップショットテストの良いところは、前回の結果とずれてないかを目視で確認するのが主な目的であるところです。つまり、テストケースの期待する結果をわざわざ自分で書く必要はありません。

先ほどのテストも`UPDATE_SNAPSHOT=1`という環境変数を付けて実行すると、`input.json`から`output.json`のファイルを自動的に作成してくれます。

    UPDATE_SNAPSHOT=1 npm test
    
この自動的に作られた`output.json`が期待している形ならコミットして終わりです。
次からは、環境変数をつけないで実行すれば単に比較されます。

    npm test 

また新しいスナップショットテストを追加したい場合は同じように`input.json`を作って、`output.json`が期待するものかを確認して追加を繰り返すだけです。

既存の挙動を変えたときも`UPDATE_SNAPSHOT=1 npm test`で既存のスナップショットがすべて更新できるので、テストの変更に必要な労力は殆どありません(その結果が期待するものかは確認が必要です)

このようにテストケースがコピペのような形で増やせて、かつ今まで追加したスナップショットテストがリグレッションを防いでくれます。

すべてのパターンに使えるテスト方法ではありませんが、変換ツールやCLIといったものをテストする際には費用対効果が良いのでおすすめです。

スナップショットテストを使ってる例:

- [sentence-splitter/fixtures-test.ts at master · azu/sentence-splitter](https://github.com/azu/sentence-splitter/blob/master/test/fixtures-test.ts)
- [ecmascript-proposals-json/snapshot-test.js at master · azu/ecmascript-proposals-json](https://github.com/azu/ecmascript-proposals-json/blob/master/test/snapshot-test.js)
