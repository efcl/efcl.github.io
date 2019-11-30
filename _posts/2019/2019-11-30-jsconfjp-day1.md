---
title: "JSConf JP Day 1 アウトラインメモ"
author: azu
layout: post
date : 2019-11-30T22:37
category: 
tags:
    - JavaScript
    - イベント

---

[JSConf JP](https://jsconf.jp/2019/) 1日目に参加したのでメモ。
会場が厳しかったので半分ぐらい聞けなかった。

## [The State of JavaScript - Raphaël Benitte and Sacha Greif | JSConf JP](https://jsconf.jp/2019/talk/s-greif-r-benitte)

- Room A
- コンピュータの歴史
- Meteor
- JavaScript Fatigue
    - [https://medium.com/@ericclemmons/48d4011b6fc4](https://medium.com/@ericclemmons/48d4011b6fc4)
    - [https://web.archive.org/web/20180925235235/https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4](https://web.archive.org/web/20180925235235/https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4)
- Best Of JavaScript
- [https://stateofjs.com/](https://stateofjs.com/)
- [https://stateofcss.com/](https://stateofcss.com/)

---

## [JavaScript AST プログラミング: 入門とその1歩先へ - Takuto Wada | JSConf JP](https://jsconf.jp/2019/talk/takuto-wada)

- Room C
- ライブコーディング
- 正規表現で問題を解決すると問題が2つ増える
- grepはコードをテキストとしてとらえる
- 構造的に捉えるにはAST(抽象構文木)を使う
- JavaScriptだとASTはただのJSONオブジェクト
- 3つ
    - Parse: ASTを得るにはコードをパーサに食わせる
    - Modify: ASTを変更して
    - Generator: ASTからコードを生成
- 今日はデータとしてのAST
    - @babel/parse の場合は便利なメソッドがいっぱいある
- ライブコーディング
    - [Acorn](https://github.com/acornjs/acorn)を使ったデモ
    - acornで `process.arv[2]` で受け取ったコードをパースして `console.log`で出力
- [ESTree](https://github.com/estree/estree)
    - 実質的なASTの標準
- `1 + 2`のbodyの最初のexpression(`body[0].expression`)を取り出す
    - ASTから1と2のNodeが出てくる
- [javascript - Why is the result of ('b'+'a'+ + 'a' + 'a').toLowerCase() 'banana'? - Stack Overflow](https://stackoverflow.com/questions/57456188/why-is-the-result-of-ba-a-a-tolowercase-banana)
    - ASTでみると
    - `('b' + 'a' + + 'a' + 'a').toLowerCase()`
    - UnaryExpression `+` 単項演算子のプラスがでてきた
    - `'b' + 'a' +( + 'a' )+ 'a'`
        - NaNが途中でできたのがASTを見ると分かる
- UnParseを実装していく
    - AST → Codeのgenerateをしていく
- ここまでで何もいじってない Code → AST → Code ができた
- Code → AST → 処理 = Lintを行う
    - ESLint的なこと
- [Estraverse](https://github.com/estools/estraverse)
    - depthを定義してenterに入るたびにdepthを+1、leaveするたびにdepthを-1する
    - ASTを depth * indentして階層的にNodeを表示する
    - UnaryExpressionを判定するコードを書いて、'b' + 'a' +( + 'a' )+ 'a'からUnaryExpressionを検出する

---

## [「オープンソース」の定義 - Henry Zhu | JSConf JP](https://jsconf.jp/2019/talk/henry-zhu)

- Room A
- 途中から聞いた
- オープンソースを通して世界を見る

---

## [You might also like... - Maria Clara | JSConf JP](https://jsconf.jp/2019/talk/maria-clara)

- 会社: Co
- human decision process
- How to choose?
- Recommended System
    - Netflixの事例
    - 80%ぐらいの番組はレコメンド機能によって選ばれてる
- Medium
- Content Basedなレコメンド
    - tf-idfを使ったコンテントベースでレコメンとする仕組み
- レコメンデーションマトリックス
    - 作品とキャラクターのマトリックスに点数をつける
- レコメンデーションシステムを作る
- Graph Theory
    - `G = (V, E)`
        - vertex
        - edge
    - データをグラフで表現する
    - addVertex, addEdge
    - データをVertexとしてデータをつなぐ
    - それぞれに重みをつける
    - 最後にそれぞれをGraphのedgeにつなげる
    - shortest-path problem 最短経路問題
    - ダイクストラ法
    - 経路を通ったコストによってそれぞれの重みから点数をつけてレコメンド先を決定していく
- Scalable?
    - eBay、Pinterestとかで使われてる
- ethical concerns
    - addiction
    - privacy
        - レコメンドによるprivacyの漏れ

---