---
title: "そのコードが標準化されてるJavaScriptなのかを判定する方法"
author: azu
layout: post
date : 2016-08-04T20:10
category: JavaScript
tags:
    - ECMAScript
    - JavaScript
    - Babel

---

# [ECMAScript Version Detector](https://azu.github.io/ecmascript-version-detector/ "ECMAScript Version Detector")

[![image](https://efcl.info/wp-content/uploads/2016/08/04-1470309082.png)](https://azu.github.io/ecmascript-version-detector/)

[ECMAScript Version Detector](https://azu.github.io/ecmascript-version-detector/ "ECMAScript Version Detector")というツールとライブラリを書きました。

[azu.github.io/ecmascript-version-detector/](https://azu.github.io/ecmascript-version-detector/ "ECMAScript Version Detector")へアクセスして、好きなコードをペーストすると、そのコードの構文がECMAScriptのどのバージョンから使える機能なのかを表示してくれます。

たとえば、以下のコードはasyncとawaitの部分がまだProposalである[Async Functions](https://github.com/tc39/ecmascript-asyncawait "Async Functions")であることを検出してくれたりします。

```js
// Async/Await
async function countUp() {
  await delay(1000);
}
```

## 目的

Babelなどの変換ツールでECMAScriptのProposalな機能などが身近になりました。
しかし、それがまだ仕様に入ってないもの(Proposal段階であるもの)ということを意識しないで書いてる人もよく見かけるようになりました。

そのため、まだProposalの段階である標準化されてない機能/構文を標準化される[前提](https://medium.com/@jayphelps/please-stop-referring-to-proposed-javascript-features-as-es7-cad29f9dcc4b)[にして](http://www.2ality.com/2016/01/ecmascript-2016.html)[話すな](http://teppeis.hatenablog.com/entry/2016/01/es2016-feature-freeze)という[話](http://jser.info/2015/11/16/ecmascript-7-ms-node-js/)が[あった](http://azu.github.io/slide-what-is-ecmascript/)りします。

例えば、次のコードは既に仕様に入ってる(ES2015)構文で書かれたコードでしょうか?

```js
const initialState = {};
export function friends(state = initialState, action) {  
  switch (action.type) {
    case "FRIEND":
      return {
        friendsById: {
          ...state.friendsById,
          [newId]: {
            name: action.name
          }
        }
      }
    default:
      return state;
  }
}
```

[ECMAScript Version Detector](https://azu.github.io/ecmascript-version-detector/ "ECMAScript Version Detector")に入れてみると分かりますが、`{...property}`はまだ標準化されていない機能です。

![result](https://efcl.info/wp-content/uploads/2016/08/04-1470309795.png)

これは[Object Rest/Spread Properties](http://sebmarkbage.github.io/ecmascript-rest-spread/ "Object Rest/Spread Properties")で、Stage 2のProposalです。

こういう見た目から分かりにくいものも、構文を解析して一覧を出すのが目的です。

JavaScriptに詳しい人は問題ないですが、JavaScriptを今から始めるような人は、どの機能がいつから使える機能なのかが分からない場合があります。

また、最近のブラウザは先行して実装したりしています。
ブラウザに入ってる ＝ 標準化されたもの ではないので、そういうのをコードから検索できる必要が出てくる気がしています。

[asciidwango/js-primer: JavaScriptの入門書](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")を書いていて、[演算子](https://asciidwango.github.io/js-primer/basic/operator/ "演算子 · JavaScriptの入門書 #jsprimer")はGoogle検索が難しいので、１ページに殆どの演算子記号を並べて書いたりしています。

JavaScriptのコードにおいても、コードからこの構文って何なのかを知りたい事があると思うので作りました。

## おわり

[azu/ecmascript-version-detector: ECMAScript Version Detector](https://github.com/azu/ecmascript-version-detector "azu/ecmascript-version-detector: ECMAScript Version Detector")は結構ラフスケッチな感じなので、もっといい感じの表示したりするPull Request待っています。

一応、ライブラリとして使えます。
コードをパースしたら、バージョンとかASTが入ったものを返します。

```js
const parse = require("ecmascript-version-detector").parse;
parse(`const x = 1 ** 2;`);
/*
[
    {
        "selector": "//BinaryExpression[@operator=='**']",
        "version": "2016",
        "en": {
            "name": "BinaryExpression exponentiation operator"
        },
        "node": {
            "type": "BinaryExpression",
            "start": 0,
            "end": 6,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 6
                }
            },
            "left": {
                "type": "NumericLiteral",
                "start": 0,
                "end": 1,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 1
                    }
                },
                "extra": {
                    "rawValue": 1,
                    "raw": "1"
                },
                "value": 1
            },
            "operator": "**",
            "right": {
                "type": "NumericLiteral",
                "start": 5,
                "end": 6,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 5
                    },
                    "end": {
                        "line": 1,
                        "column": 6
                    }
                },
                "extra": {
                    "rawValue": 2,
                    "raw": "2"
                },
                "value": 2
            }
        }
    },
    ....
]
*/
```

[Contributing](https://github.com/azu/ecmascript-version-detector#contributing "Contributing")に書いていますが、コードからのバージョンの判定は[astq](https://github.com/rse/astq "astq")を使ってセレクタにマッチするかを見ています。

まだ足りてない判定などもあるので、気軽にPull Requestを投げてください。
