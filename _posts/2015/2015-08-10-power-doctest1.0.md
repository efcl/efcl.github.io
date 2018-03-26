---
title: "power-assertを使ったDoctestツール power-doctestを書き直した"
author: azu
layout: post
date : 2015-08-10T09:20
category: JavaScript
tags:
    - JavaScript
    - testing
    - power-assert
    - AST
    - doctest

---

## power-doctest

以前[JavaScriptでdoctestを行う power-doctest を作った | Web Scratch](https://efcl.info/2013/1201/res3494/ "JavaScriptでdoctestを行う power-doctest を作った | Web Scratch")という記事で紹介しましたが、

    評価したい式; // => 期待する評価結果
    
と書くことで、これを以下のようなassertへ変換するツールを作っていました。

```js	
assert.equal(評価したい式, 期待する評価結果);
```

今回[power-doctest](https://github.com/azu/power-doctest "power-doctest")をシンプルなものへと作りなおしました。

- [rewrite simply by azu · Pull Request #11 · azu/power-doctest](https://github.com/azu/power-doctest/pull/11 "rewrite simply by azu · Pull Request #11 · azu/power-doctest")

1.0未満のバージョンはツール自体に変換したコードの実行=>レポート表示の機能があったのですが、そこを削除して変換のみを行うように書き換えました。

実行機能はやっぱりとても複雑で、Nodeだけでも結構制御が大変なので、単純に`assert`に変換して後は他のツールと組み合わせて実行できるような形がいいかなと思いました。

## 使い方

[azu/power-doctest](https://github.com/azu/power-doctest "azu/power-doctest")

さきほども書いたように変換機能しかないのでライブラリとして使うのがいい気がしますが、単純なファイルを指定して変換するCLIの機能だけは入っています。

	npm install -g power-doctest

example.jsというファイルを用意して

```js
function sum(ary) {
    return ary.reduce(function (current, next) {
        return current + next
    }, 0);
}

var total = sum([1, 2, 3, 4, 5]);
total; // => 5
```

`power-doctest /path/to/file.js`という感じでファイルを指定すると変換したコードををSourceMap付きで返してくれます。

```sh
$ power-doctest example/example.js
var assert = require('power-assert');
function sum(ary) {
    return ary.reduce(function (current, next) {
        return current + next;
    }, 0);
}
var total = sum([
    1,
    2,
    3,
    4,
    5
]);
assert.equal(assert._expr(assert._capt(total, 'arguments/0'), {
    content: 'assert.equal(total, 5)',
    line: 14
}), 5);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbXX0
```

後は、これをただのJavaScriptとして実行すれば、[power-assert](https://github.com/power-assert-js/power-assert "power-assert")を使った場合と同じような結果が得られます。

```sh
$ power-doctest example/example.js | node -p
AssertionError:   # at line: 14

  assert.equal(total, 5)
               |
               15
```

ブラウザでも同じように変換すれば動かすことができます。(この辺のSourceMapとかをもっと上手くやるためには[espowerify](https://github.com/power-assert-js/espowerify "espowerify")のようなものが必要そう)

```sh
power-doctest example.js > powered-example.js
browserify -D -r power-assert powered-example.js > build.js
```

![browser](https://monosnap.com/file/LxGCmcgfnwekZ6UXJqbEuV24NNYGes.png)

ただの`assert`に変換するだけなので[非同期テスト](https://efcl.info/2014/0322/res3743/ "power-doctestが非同期テストに対応しました | Web Scratch")も何もせずに対応できています。

ただ、今の所実行面のサポートがなんにもないので、なんか上手い方法が欲しくなりそうな感じですね。

## 仕組み

仕組み的にはASTを変換するということには全く変わりがないですが、変換の役割をはっきりさせたり、ASTを変換する部分以外を抽象化することで変換に集中しやすくするためのライブラリを書きました。

具体的な話をすると長くなるので細かい話は次回にして、次のようなライブラリをつくました。

- [azu/ast-equal](https://github.com/azu/ast-equal)

ASTとコードを比較したり、ASTとASTを比較したりできるassertのようなライブラリです。
テストに使ってます。

```js
import { parse } from "esprima";
import astEqual from "ast-equal"
var sourceCode = 'var a = "string";';
var actualAST = parse(sourceCode);
var expectedCode = 'var a = "string";';
var expectedAST = parse(expectedCode);

// AST === Code
astEqual(actualAST, expectedCode);
// AST === AST
astEqual(actualAST, expectedAST);
```

- [azu/ast-source](https://github.com/azu/ast-source)

今回のAST変換でメインとなるライブラリですが、ASTは[ESTree](https://github.com/estree/estree "ESTree")というデファクトが存在するので、本来どのパーサで作られたASTであるのかは気にする必要がありません。

しかし今回のようにコメントを`assert`に変換するAST変換関数は`node.trailingComments`というようにESTreeでは標準化されたないコメントの位置に関する情報を使ったり、power-assertの変換をする[espower](https://github.com/power-assert-js/espower "espower")は`loc`といったこちらも標準化されてない情報を使います。
(実際にはどのパーサも同じ情報をもっているのですが)

また、最近はesprima、espree、acorn、[Babylon](https://github.com/babel/babel/tree/master/packages/babylon "Babylon")など色々なパーサが存在するため、
[ESTree](https://github.com/estree/estree "ESTree")レベル(現在だとES6レベル)だと互換性はあるが、ES.nextやJSXといた拡張に対する扱いがあったりなかったりがパーサによって違います。

そのため、AST変換関数がそのパーサだったりを気にするのは本質的ではないなと思ったので、パーサやジェネレータを抽象化した[azu/ast-source](https://github.com/azu/ast-source)というライブラリを作りました。

結局はそのAST変換関数が受け付けるのはユーザが書いたコードであるためそれがパースできれば問題ないという方針で、自動的にパーサを切り替えたりするような仕組みが入ってます。(上手く動いてるのかまだ良くわかってない)

追記: escodegenやrecastなどESTree -> Codeがまだ完全ではないことが発覚した…

後はSourceMapを生成するジェネレータ部分の仕組みはいってるので簡単に扱えるようにする目的もあります([escodegen](https://github.com/estools/escodegen "escodegen")の使い方いつも忘れる)

- [azu/comment-to-assert](https://github.com/azu/comment-to-assert)

[power-doctest](https://github.com/azu/power-doctest "power-doctest")の本体とも言える、`// =>` を `assert`に変換するAST変換関数です。

- [azu/tagged-template-to-ast](https://github.com/azu/tagged-template-to-ast)

tagged template stringを使ったコードとAST Nodeを合成するtag関数です。

```js
import {parse} from "esprima"
import toAST from "tagged-template-to-ast"
// AST
var nodeForInline = parse('"string"');
// コードでASTを合成する => 合成したASTを作れる
var astNode = toAST`var a = ${nodeForInline}`;
// astNode is the AST of `var a = "string";`
```

これを使うことで、AST変換する際にJSON的にNodeを色々書いたりしないで組み立てができるようになって意外と上手く動いてる感じです。

- [comment-to-assert/ast-utils.js at cff0a537e7e501feeb0fa84b72350084636e0d07 · azu/comment-to-assert](https://github.com/azu/comment-to-assert/blob/cff0a537e7e501feeb0fa84b72350084636e0d07/src/ast-utils.js#L24-L36 "comment-to-assert/ast-utils.js at cff0a537e7e501feeb0fa84b72350084636e0d07 · azu/comment-to-assert")

この辺の仕組みを使って書き換えた[power-doctest](https://github.com/azu/power-doctest "power-doctest")本体のコードは1/10ぐらいまで短くなりました。

- [rewrite simply by azu · Pull Request #11 · azu/power-doctest](https://github.com/azu/power-doctest/pull/11 "rewrite simply by azu · Pull Request #11 · azu/power-doctest")
