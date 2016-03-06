---
title: "JavaScript ASTを始める最初の一歩"
author: azu
layout: post
date : 2016-03-06T12:39
category: JavaScript
tags:
    - AST
    - JavaScript

---

何かJavaScriptのソースコードを機械的にチェックするためのツールを作りたいという場合に、JavaScriptのASTというものを触る必要が出てくると思います。

この記事では、その取っ掛かりとなる案内を簡単にまとめたものです。

## ASTとは

- [カジュアルJavaScript AST](http://azu.github.io/slide/JSojisan/)
- [JavaScript AST Walker](http://azu.github.io/slide/tkbjs/js-ast-walker.html)

## ASTのコミュニティ標準

ESTreeというデファクトスタンダードがあります(ES6までは定義されている)

- [estree/estree: The ESTree Spec](https://github.com/estree/estree "estree/estree: The ESTree Spec")

経緯: [[2015-02] 最近のJavaScript AST標準化の動き | Web Scratch](http://efcl.info/2015/02/26/recent-js-ast/ "[2015-02] 最近のJavaScript AST標準化の動き | Web Scratch")

- Babel、Esprima、Acorn などどれもES6のレベルまでなら同じASTを吐く
- `token`、`range`、コメントのいち情報周りの扱いがパーサによって異なる
- ASTの範囲内ならどのパーサでも同じ

## パーサ

- [Babylon](https://github.com/babel/babel/tree/master/packages/babylon "Babylon")
	- Babelで使われてるAcorn派生のパーサ
	- まだ[仕様として入るか分からないStage](http://azu.github.io/slide-what-is-ecmascript/slide/12.html "TC39 Process: Stage | ECMAScriptとは何か？")の構文も対応している
- [Esprima](http://esprima.org/ "Esprima")
	- [ast-types](https://github.com/benjamn/ast-types "ast-types")
- [Acorn](https://github.com/ternjs/acorn "Acorn")
- [espree](https://github.com/eslint/espree "espree")
	- [ESLint](http://eslint.org/ "ESLint")で使われてるパーサ
	- AcornベースでEsprimaのtokenとの互換性を持っているパーサ

どのパーサもいろんなツールで使われてる実績があります。
Esprimaで試して、何か足りないならAcorn -> Babylonという感じでやるのが良いと思います。

大きく分けると以下の2系統になっています。

- Esprima
- Acorn

BabylonはEStreeの仕様外について積極的にサポートしているため、
それらが必要な場合はBabylonを使うが、そうでないなら他のパーサの方が安定しています。

## 関連ツール

- [AST explorer](http://astexplorer.net/ "AST explorer")
  - AST見るのに便利

## よくある流れ

- パーサでコードをパースしてASTにする
	- [Babylon](https://github.com/babel/babel/tree/master/packages/babylon "Babylon")、[Esprima](http://esprima.org/ "Esprima")、[Acorn](https://github.com/ternjs/acorn "Acorn")、[espree](https://github.com/eslint/espree "espree")
- ASTをtraverseして処理(変換、チェック)する
	- [estraverse](https://github.com/estools/estraverse "estraverse")、[ast-types](https://github.com/benjamn/ast-types#ast-traversal "ast-types")、[babel-traverse](https://github.com/babel/babel/tree/master/packages/babel-traverse "babel-traverse")
	- [estree-walker](https://github.com/Rich-Harris/estree-walker "estree-walker")、[esrecurse](https://github.com/estools/esrecurse "esrecurse")
	- どのライブラリもほぼおなじものを持っている
- ASTからJSのコードを生成する(チェックのみの場合はここは不要)
	- [escodegen](https://github.com/estools/escodegen "escodegen")、[babel-generator](https://www.npmjs.com/package/babel-generator "babel-generator")を使う
	- ジェネレータはパーサと合わせたツールが必要
	- Esprimaならescodegen、babelならbabel-generator

Parser、Traverser、Generatorは基本的にセットで同じ系統のツールを使う形になります。

そういうのを考えるのが面倒なので、そこを抽象化するライブラリを作ったりしていました。
コンセプトの証明的なものなので、実用的に使う場合は未対応の部分があると思います。(維持コストが高い)
コントリビュートは歓迎です。

- [azu/ast-source: AST helper to transform source code.](https://github.com/azu/ast-source "azu/ast-source: AST helper to transform source code.")

## 例) evalの中身を解析したい

evalの中を取り出して安全に評価したいというケース

### evalの中身

```
eval("var a = 20")
```

- [JSのASTを扱うライブラリをつかって、不要なeval呼び出しを除くコードを書いてみた - kitak.blog](http://kitak.hatenablog.jp/entry/2014/11/15/233649 "JSのASTを扱うライブラリをつかって、不要なeval呼び出しを除くコードを書いてみた - kitak.blog")

のようにパースして、evalの中身を取り出すことが可能。

- 何かを防ぐという仕組みから連想できるものはホワイトリスト
- ホワイトリストでevalの中で使えるプロパティの名前などを制限する
- 未知のプロパティを見つけらたらその弾く?
- ブラックリストは何を防止すればいいのかが難しいので一番良く考える場所

### 解析のフェーズ

適当な考え方(正しいのかは自信ないけど)

1. evalのなかを取り出す
2. evalのなかのコードをパースする
3. **安全な部分**だけを取り出す
4. 安全な部分で評価する

**安全な部分** が何かを決める必要がありそう。
安全でないことが分かったら実行は諦める。

というような考え方でやるのがよくあるケースだと思います。