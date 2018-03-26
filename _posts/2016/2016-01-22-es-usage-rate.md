---
title: "JavaScriptのコードを分解してよく使われてる機能を分析する"
author: azu
layout: post
date : 2016-01-22T13:09
category: JavaScript
tags:
    - ECMAScript
    - Tool
    - ES6
    - JavaScript

---


[今年のOSS活動振り返り @ 2015 | Web Scratch](https://efcl.info/2015/12/31/oss-in-2015/ "今年のOSS活動振り返り @ 2015 | Web Scratch")で

> - JavaScript/ECMAScriptを改めてどう学べばいいのか考える
  - [azu/how-to-learn-es6](https://github.com/azu/how-to-learn-es6 "azu/how-to-learn-es6")とか[#thinking_in_es6](https://twitter.com/hashtag/thinking_in_es6?src=hash "#thinking_in_es6")で考えてるやつ

というのを今年考える事としてあげていました。
それを考えるために、既存のコードがどうなってるかを見てみるという話です。

具体的には既存のコードを見て、そこでどういう機能/構文が多く使われているのかが分かれば、どこを中心的に学ぶと結果が出やすくなるのではという感じです。

それを分析するために[azu/es-usage-rate](https://github.com/azu/es-usage-rate "azu/es-usage-rate")というツールを書いた。

### Installation

```
npm install -g es-usage-rate
```

### 使い方

例えば、`es-usage-rate`自体がどういう構文を使って書かれてるかを見てみてます。

`es-usage-rate`は他のCLIと組み合わせて使う事を前提としてるので、
デフォルトでは指定したコードをパースして、それらのAST Node typeを出力するだけです。

AST Node typeは以下を参照すると分かりますが、ECMAScriptの構文の名前が入ってる感じです。
(Generatorとかはtypeとしてはないので独自に出してます。

- [estree/estree: The ESTree Spec](https://github.com/estree/estree "estree/estree: The ESTree Spec")

```sh
$ es-usage-rate "es-usage-rate/src/**/*.js"
ImportDeclaration
AssignmentExpression
Identifier
CallExpression
Identifier
Identifier
CatchClause
....
```

注意点としては、AST Node typeというのは基本的には構文にしか`type`がついてません。
例えば、`Promise`とか構文としては新しいものではなくただのオブジェクトなので、`type`だけでは区別できないと思います。
(名前などを見れば判定はできますが面倒なのでやってないです)

`es-usage-rate`を使えば標準出力には`type`が出現した回数だけ出力されるので、これを[distribution](https://github.com/philovivero/distribution "philovivero/distribution")で集計して見たりするのが簡単な使い方です。

```sh
$ git clone https://github.com/azu/es-usage-rate.git
$ es-usage-rate "es-usage-rate/src/**/*.js" | distribution --char=ba --height=50
                      Key|Ct  (Pct)    Histogram
               Identifier|334 (37.70%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
            StringLiteral| 84  (9.48%) ▬▬▬▬▬▬▬▬▬▬▬
           CallExpression| 61  (6.88%) ▬▬▬▬▬▬▬▬
         MemberExpression| 55  (6.21%) ▬▬▬▬▬▬▬
           BlockStatement| 38  (4.29%) ▬▬▬▬▬
       VariableDeclarator| 34  (3.84%) ▬▬▬▬▬
          ReturnStatement| 26  (2.93%) ▬▬▬▬
VariableDeclaration:const| 25  (2.82%) ▬▬▬
      FunctionDeclaration| 18  (2.03%) ▬▬▬
        ImportDeclaration| 17  (1.92%) ▬▬▬
      ExpressionStatement| 15  (1.69%) ▬▬
           ObjectProperty| 15  (1.69%) ▬▬
                Directive| 14  (1.58%) ▬▬
                  Program| 14  (1.58%) ▬▬
         DirectiveLiteral| 14  (1.58%) ▬▬
  ArrowFunctionExpression| 12  (1.35%) ▬▬
         ObjectExpression| 12  (1.35%) ▬▬
     AssignmentExpression| 10  (1.13%) ▬▬
   ExportNamedDeclaration|  9  (1.02%) ▬▬
          ImportSpecifier|  9  (1.02%) ▬▬
   ImportDefaultSpecifier|  8  (0.90%) ▬
 ExportDefaultDeclaration|  7  (0.79%) ▬
         BinaryExpression|  7  (0.79%) ▬
              IfStatement|  6  (0.68%) ▬
  VariableDeclaration:let|  5  (0.56%) ▬
           NumericLiteral|  4  (0.45%) ▬
          ArrayExpression|  4  (0.45%) ▬
  VariableDeclaration:var|  4  (0.45%) ▬
          TemplateElement|  3  (0.34%) ▬
            ObjectPattern|  3  (0.34%) ▬
           BreakStatement|  2  (0.23%) ▬
        AssignmentPattern|  2  (0.23%) ▬
               SwitchCase|  2  (0.23%) ▬
         UpdateExpression|  1  (0.11%) ▬
          UnaryExpression|  1  (0.11%) ▬
             ObjectMethod|  1  (0.11%) ▬
            RegExpLiteral|  1  (0.11%) ▬
          SwitchStatement|  1  (0.11%) ▬
              CatchClause|  1  (0.11%) ▬
             ForStatement|  1  (0.11%) ▬
           BooleanLiteral|  1  (0.11%) ▬
             TryStatement|  1  (0.11%) ▬
           ThrowStatement|  1  (0.11%) ▬
            NewExpression|  1  (0.11%) ▬
 ImportNamespaceSpecifier|  1  (0.11%) ▬
          TemplateLiteral|  1  (0.11%) ▬
```

ターミナルでのグラフ表示に[philovivero/distribution](https://github.com/philovivero/distribution "philovivero/distribution")を使うと便利です。

全部を出すとちょっと多いので、ES6の構文だけに絞ってみます。
`es-usage-rate`は`--reducer`で任意のフィルターファイル処理を指定できるので、ビルトインしてある`es6`を指定します。

```sh
$ es-usage-rate --reducer es6  "es-usage-rate/src/**/*.js" | distribution --char=ba
                      Key|Ct (Pct)    Histogram
VariableDeclaration:const|25 (24.51%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ImportDeclaration|17 (16.67%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ArrowFunctionExpression|12 (11.76%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
          ImportSpecifier| 9  (8.82%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ExportNamedDeclaration| 9  (8.82%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ImportDefaultSpecifier| 8  (7.84%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ExportDefaultDeclaration| 7  (6.86%) ▬▬▬▬▬▬▬▬▬▬▬▬
  VariableDeclaration:let| 5  (4.90%) ▬▬▬▬▬▬▬▬▬
            ObjectPattern| 3  (2.94%) ▬▬▬▬▬
          TemplateElement| 3  (2.94%) ▬▬▬▬▬
        AssignmentPattern| 2  (1.96%) ▬▬▬▬
 ImportNamespaceSpecifier| 1  (0.98%) ▬▬
          TemplateLiteral| 1  (0.98%) ▬▬
```

ES6のうち、`import`と`export`のみを比較してみたいなら、`distribution`に渡す前にgrepすることでできます。

```sh
es-usage-rate --reducer es6  "es-usage-rate/src/**/*.js" | grep -e "Import" -e "Export" | distribution --char=ba
                     Key|Ct (Pct)    Histogram
       ImportDeclaration|17 (33.33%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
         ImportSpecifier| 9 (17.65%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ExportNamedDeclaration| 9 (17.65%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ImportDefaultSpecifier| 8 (15.69%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
ExportDefaultDeclaration| 7 (13.73%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
ImportNamespaceSpecifier| 1  (1.96%) ▬▬▬
```

当たり前な感じはしますが、`import`の方が`export`より使われているという結果が見えました。

`es-usage-rate`は大した処理をしてなくて、`--formatter`、`--reducer`、`--mapper`の引数で指定したスクリプトを組み合わせて欲しい形で、コードをパースした結果を吐くためのツールです。
(`reduce`のシグネチャがイマイチなので変えるかも)

1. parse(Code) => AST
2. map(AST) => Nodes
3. reduce(Nodes) => Nodes
4. format(Nodes) => result!


## 使われているES6の構文を見ていく

あるコードで、どれくらいES6の構文が使われているのか、またどういう構文の使用率が高いのか、
ということを調べたくて[es-usage-rate](https://github.com/azu/es-usage-rate "azu/es-usage-rate")を書きました。

なので、実際に調べて行ってみます。

ES6で書かれていて、いろんな人が同じものを書いてるサンプルとして以下のFlux実装比較を使ってみます。

- [flux-challenge](https://github.com/staltz/flux-challenge "flux-challenge")

```sh
git clone https://github.com/staltz/flux-challenge.git
cd flux-challeng/submissions
# 人別に見ていく
find . ! -path . -type d -maxdepth 1 | xargs -I {}  ksh -c 'echo {}; es-usage-rate "{}/**/*.js" --reducer es6 2> /dev/null  | distribution --char=ba'
./abaran
                     Key|Ct (Pct)    Histogram
         ImportSpecifier|15 (18.99%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ExportNamedDeclaration|12 (15.19%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
       ImportDeclaration|11 (13.92%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ArrowFunctionExpression|10 (12.66%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ClassDeclaration|10 (12.66%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
               ClassBody|10 (12.66%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
           ObjectPattern| 5  (6.33%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
       AssignmentPattern| 5  (6.33%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
ImportNamespaceSpecifier| 1  (1.27%) ▬▬▬
./arqex
                     Key|Ct (Pct)    Histogram
       ImportDeclaration|15 (33.33%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ImportDefaultSpecifier|14 (31.11%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
ExportDefaultDeclaration| 5 (11.11%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ClassDeclaration| 4  (8.89%) ▬▬▬▬▬▬▬▬▬▬▬▬
               ClassBody| 4  (8.89%) ▬▬▬▬▬▬▬▬▬▬▬▬
 ArrowFunctionExpression| 2  (4.44%) ▬▬▬▬▬▬
         ImportSpecifier| 1  (2.22%) ▬▬▬
./ds300
                      Key|Ct (Pct)    Histogram
VariableDeclaration:const|8 (57.14%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ArrowFunctionExpression|5 (35.71%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  VariableDeclaration:let|1  (7.14%) ▬▬▬▬▬▬
./fab1an
                      Key|Ct (Pct)    Histogram
  ArrowFunctionExpression|12 (66.67%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
VariableDeclaration:const| 2 (11.11%) ▬▬▬▬▬▬▬
  VariableDeclaration:let| 2 (11.11%) ▬▬▬▬▬▬▬
            ObjectPattern| 1  (5.56%) ▬▬▬▬
   ExportNamedDeclaration| 1  (5.56%) ▬▬▬▬
./garbles
                      Key|Ct (Pct)    Histogram
  ArrowFunctionExpression|34 (33.33%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
VariableDeclaration:const|28 (27.45%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
          TemplateElement|18 (17.65%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
          TemplateLiteral|18 (17.65%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
            ObjectPattern| 4  (3.92%) ▬▬▬▬▬
./hyperturtle
./jas-chen
                      Key|Ct (Pct)    Histogram
VariableDeclaration:const|75 (35.89%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ImportDeclaration|27 (12.92%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
          ImportSpecifier|27 (12.92%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ArrowFunctionExpression|26 (12.44%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ExportNamedDeclaration|13  (6.22%) ▬▬▬▬▬▬▬▬
            ObjectPattern|11  (5.26%) ▬▬▬▬▬▬▬
   ImportDefaultSpecifier|11  (5.26%) ▬▬▬▬▬▬▬
 ExportDefaultDeclaration| 6  (2.87%) ▬▬▬▬
  VariableDeclaration:let| 6  (2.87%) ▬▬▬▬
        AssignmentPattern| 2  (0.96%) ▬▬
         ClassDeclaration| 2  (0.96%) ▬▬
                ClassBody| 2  (0.96%) ▬▬
 ImportNamespaceSpecifier| 1  (0.48%) ▬
./jelz
./jollytoad
                      Key|Ct (Pct)    Histogram
  ArrowFunctionExpression|66 (37.29%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
VariableDeclaration:const|53 (29.94%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
            ObjectPattern|33 (18.64%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ImportDeclaration| 7  (3.95%) ▬▬▬▬▬
          ImportSpecifier| 6  (3.39%) ▬▬▬▬
              RestElement| 5  (2.82%) ▬▬▬▬
   ImportDefaultSpecifier| 2  (1.13%) ▬▬
   ExportNamedDeclaration| 2  (1.13%) ▬▬
          TemplateElement| 2  (1.13%) ▬▬
          TemplateLiteral| 1  (0.56%) ▬
./josepot
                      Key|Ct (Pct)    Histogram
VariableDeclaration:const|54 (21.09%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ImportDeclaration|40 (15.62%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
          ImportSpecifier|39 (15.23%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ArrowFunctionExpression|27 (10.55%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ImportDefaultSpecifier|23  (8.98%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ExportNamedDeclaration|18  (7.03%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬
          TemplateElement|14  (5.47%) ▬▬▬▬▬▬▬▬▬▬▬
 ExportDefaultDeclaration| 9  (3.52%) ▬▬▬▬▬▬▬
            ObjectPattern| 8  (3.12%) ▬▬▬▬▬▬▬
  VariableDeclaration:let| 7  (2.73%) ▬▬▬▬▬▬
          TemplateLiteral| 6  (2.34%) ▬▬▬▬▬
         ClassDeclaration| 4  (1.56%) ▬▬▬▬
                ClassBody| 4  (1.56%) ▬▬▬▬
        AssignmentPattern| 3  (1.17%) ▬▬▬
./kyldvs
                      Key|Ct (Pct)    Histogram
        ImportDeclaration|31 (23.31%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
VariableDeclaration:const|28 (21.05%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ImportDefaultSpecifier|24 (18.05%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ArrowFunctionExpression|18 (13.53%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ExportDefaultDeclaration| 8  (6.02%) ▬▬▬▬▬▬▬▬▬▬▬
          ImportSpecifier| 8  (6.02%) ▬▬▬▬▬▬▬▬▬▬▬
            ObjectPattern| 5  (3.76%) ▬▬▬▬▬▬▬
         ClassDeclaration| 4  (3.01%) ▬▬▬▬▬▬
                ClassBody| 4  (3.01%) ▬▬▬▬▬▬
  VariableDeclaration:let| 2  (1.50%) ▬▬▬
   ExportNamedDeclaration| 1  (0.75%) ▬▬
./leoasis
                      Key|Ct (Pct)    Histogram
VariableDeclaration:const|20 (19.80%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ImportDeclaration|18 (17.82%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ArrowFunctionExpression|17 (16.83%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ImportDefaultSpecifier|12 (11.88%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
          ImportSpecifier| 9  (8.91%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ExportDefaultDeclaration| 6  (5.94%) ▬▬▬▬▬▬▬▬▬▬▬▬▬
          TemplateElement| 4  (3.96%) ▬▬▬▬▬▬▬▬▬
   ExportNamedDeclaration| 3  (2.97%) ▬▬▬▬▬▬▬
         ClassDeclaration| 3  (2.97%) ▬▬▬▬▬▬▬
                ClassBody| 3  (2.97%) ▬▬▬▬▬▬▬
            ObjectPattern| 2  (1.98%) ▬▬▬▬▬
        AssignmentPattern| 2  (1.98%) ▬▬▬▬▬
          TemplateLiteral| 2  (1.98%) ▬▬▬▬▬
./masiulis
./mattjbray
./milankinen
                      Key|Ct (Pct)    Histogram
  ArrowFunctionExpression|23 (34.33%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
VariableDeclaration:const|17 (25.37%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
          ImportSpecifier|10 (14.93%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
            ObjectPattern| 8 (11.94%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ImportDeclaration| 6  (8.96%) ▬▬▬▬▬▬▬▬▬▬▬
   ImportDefaultSpecifier| 3  (4.48%) ▬▬▬▬▬▬
./mweststrate
./mynomoto
./pasieronen
                      Key|Ct (Pct)    Histogram
VariableDeclaration:const|20 (26.67%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  ArrowFunctionExpression|16 (21.33%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ImportDeclaration|13 (17.33%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ImportDefaultSpecifier| 8 (10.67%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ExportNamedDeclaration| 6  (8.00%) ▬▬▬▬▬▬▬▬▬▬▬▬▬
 ImportNamespaceSpecifier| 5  (6.67%) ▬▬▬▬▬▬▬▬▬▬▬
 ExportDefaultDeclaration| 2  (2.67%) ▬▬▬▬▬
  VariableDeclaration:let| 2  (2.67%) ▬▬▬▬▬
              RestElement| 1  (1.33%) ▬▬▬
             ArrayPattern| 1  (1.33%) ▬▬▬
          ExportSpecifier| 1  (1.33%) ▬▬▬
./pindia
./retozi
./salsita
                      Key|Ct (Pct)    Histogram
  ArrowFunctionExpression|99 (30.09%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
VariableDeclaration:const|83 (25.23%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ExportNamedDeclaration|54 (16.41%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ImportDeclaration|38 (11.55%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ImportNamespaceSpecifier|22  (6.69%) ▬▬▬▬▬▬▬▬▬▬
          ImportSpecifier|11  (3.34%) ▬▬▬▬▬
          TemplateElement| 7  (2.13%) ▬▬▬
   ImportDefaultSpecifier| 6  (1.82%) ▬▬▬
 ExportDefaultDeclaration| 4  (1.22%) ▬▬
          TemplateLiteral| 3  (0.91%) ▬▬
            ObjectPattern| 1  (0.30%) ▬
  VariableDeclaration:let| 1  (0.30%) ▬
./staltz
                      Key|Ct (Pct)    Histogram
  ArrowFunctionExpression|40 (29.85%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
VariableDeclaration:const|35 (26.12%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ImportDeclaration|19 (14.18%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
          ImportSpecifier|15 (11.19%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ImportDefaultSpecifier| 8  (5.97%) ▬▬▬▬▬▬▬▬▬
 ExportDefaultDeclaration| 6  (4.48%) ▬▬▬▬▬▬▬
          TemplateElement| 6  (4.48%) ▬▬▬▬▬▬▬
          TemplateLiteral| 3  (2.24%) ▬▬▬▬
            ObjectPattern| 2  (1.49%) ▬▬▬
./stinson7
./winstonewert
                      Key|Ct (Pct)    Histogram
  ArrowFunctionExpression|7 (24.14%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        ImportDeclaration|6 (20.69%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ImportDefaultSpecifier|4 (13.79%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ExportDefaultDeclaration|2  (6.90%) ▬▬▬▬▬▬▬▬▬▬▬▬▬
          ImportSpecifier|2  (6.90%) ▬▬▬▬▬▬▬▬▬▬▬▬▬
   ExportNamedDeclaration|2  (6.90%) ▬▬▬▬▬▬▬▬▬▬▬▬▬
        AssignmentPattern|2  (6.90%) ▬▬▬▬▬▬▬▬▬▬▬▬▬
           ForOfStatement|1  (3.45%) ▬▬▬▬▬▬▬
VariableDeclaration:const|1  (3.45%) ▬▬▬▬▬▬▬
         ClassDeclaration|1  (3.45%) ▬▬▬▬▬▬▬
                ClassBody|1  (3.45%) ▬▬▬▬▬▬▬
```

注意点としては、`if`とか`var`などの方が`class`などより出現率が高いのは当たり前なので、
単純にランキングとして見ると少し観点としてズレがある気がします。

人別の結果を重ねて見たいので、ちょっと縦長だと見えにくい気がします。

とりあえず[json-by-all](https://github.com/azu/es-usage-rate/blob/master/src/formatters/json-by-all.js "json-by-all")というformatterを書いたので、これを元にCSV化してみてNumbersでグラフにしてみます。
(Rとかそういうので処理したかったけど、簡単な方法が欲しい…)

標準入力の文字列を既存のJSON配列に追記していく[json-append](https://github.com/azu/json-append "json-append")というも書いたので、以下のようにすれば、それぞれの人(ディレクトリ)ごとの集計結果を得られます。

```sh
find . ! -path . -type d -maxdepth 1 | xargs -I {}  ksh -c 'echo {}; es-usage-rate "{}/**/*.js" --reducer es6 --formatter json-by-all  | json-append results.json'
```

これでJSONとして集計結果が手に入ったので、これをCSVにしてExcelとかで読み込ませてみます。

```json
[
  {
    "@file": "./abaran/src/",
    "ImportDeclaration": 11,
    "ImportSpecifier": 15,
    "ClassDeclaration": 10,
    "ClassBody": 10,
    "ObjectPattern": 5,
    "ArrowFunctionExpression": 10,
    "ExportNamedDeclaration": 12,
    "AssignmentPattern": 5,
    "ImportNamespaceSpecifier": 1
  },
  {
    "@file": "./arqex/",
    "ImportDeclaration": 15,
    "ImportDefaultSpecifier": 14,
    "ExportDefaultDeclaration": 5,
    "ClassDeclaration": 4,
    "ClassBody": 4,
    "ImportSpecifier": 1,
    "ArrowFunctionExpression": 2
  },
  {
    "@file": "./ds300/",
    "VariableDeclaration:const": 8,
    "VariableDeclaration:let": 1,
    "ArrowFunctionExpression": 5
  },
  {
    "@file": "./fab1an/",
    "ExportNamedDeclaration": 1,
    "VariableDeclaration:const": 2,
    "ArrowFunctionExpression": 12,
    "ObjectPattern": 1,
    "VariableDeclaration:let": 2
  },
  {
    "@file": "./garbles/",
    "VariableDeclaration:const": 28,
    "TemplateLiteral": 18,
    "TemplateElement": 18,
    "ArrowFunctionExpression": 34,
    "ObjectPattern": 4
  },
  {
    "@file": "./jas-chen/",
    "ExportNamedDeclaration": 13,
    "VariableDeclaration:const": 75,
    "ImportDeclaration": 27,
    "ImportDefaultSpecifier": 11,
    "ImportSpecifier": 27,
    "ObjectPattern": 11,
    "VariableDeclaration:let": 6,
    "ArrowFunctionExpression": 26,
    "ExportDefaultDeclaration": 6,
    "ClassDeclaration": 2,
    "ClassBody": 2,
    "ImportNamespaceSpecifier": 1,
    "AssignmentPattern": 2
  },
  {
    "@file": "./jelz/resources/public/js/app.js"
  },
  {
    "@file": "./jollytoad/",
    "ImportDeclaration": 7,
    "ImportDefaultSpecifier": 2,
    "ImportSpecifier": 6,
    "ExportNamedDeclaration": 2,
    "VariableDeclaration:const": 53,
    "ArrowFunctionExpression": 66,
    "ObjectPattern": 33,
    "RestElement": 5,
    "TemplateLiteral": 1,
    "TemplateElement": 2
  },
  {
    "@file": "./josepot/",
    "ImportDeclaration": 40,
    "ImportSpecifier": 39,
    "ImportDefaultSpecifier": 23,
    "ExportNamedDeclaration": 18,
    "VariableDeclaration:const": 54,
    "VariableDeclaration:let": 7,
    "ArrowFunctionExpression": 27,
    "TemplateLiteral": 6,
    "TemplateElement": 14,
    "ObjectPattern": 8,
    "ExportDefaultDeclaration": 9,
    "ClassDeclaration": 4,
    "ClassBody": 4,
    "AssignmentPattern": 3
  },
  {
    "@file": "./kyldvs/",
    "VariableDeclaration:const": 28,
    "ArrowFunctionExpression": 18,
    "ObjectPattern": 5,
    "ImportDeclaration": 31,
    "ImportDefaultSpecifier": 24,
    "ExportNamedDeclaration": 1,
    "ImportSpecifier": 8,
    "ClassDeclaration": 4,
    "ClassBody": 4,
    "ExportDefaultDeclaration": 8,
    "VariableDeclaration:let": 2
  },
  {
    "@file": "./leoasis/",
    "ImportDeclaration": 18,
    "ImportDefaultSpecifier": 12,
    "ImportSpecifier": 9,
    "ClassDeclaration": 3,
    "ClassBody": 3,
    "VariableDeclaration:const": 20,
    "ObjectPattern": 2,
    "TemplateLiteral": 2,
    "TemplateElement": 4,
    "ArrowFunctionExpression": 17,
    "ExportDefaultDeclaration": 6,
    "ExportNamedDeclaration": 3,
    "AssignmentPattern": 2
  },
  {
    "@file": "./mattjbray/dist/app.js"
  },
  {
    "@file": "./milankinen/",
    "ImportDeclaration": 6,
    "ImportDefaultSpecifier": 3,
    "ImportSpecifier": 10,
    "VariableDeclaration:const": 17,
    "ArrowFunctionExpression": 23,
    "ObjectPattern": 8
  },
  {
    "@file": "./mweststrate/dist/bundle.js"
  },
  {
    "@file": "./mynomoto/index.html.js"
  },
  {
    "@file": "./pasieronen/",
    "ImportDeclaration": 13,
    "ImportDefaultSpecifier": 8,
    "ImportNamespaceSpecifier": 5,
    "ArrowFunctionExpression": 16,
    "VariableDeclaration:const": 20,
    "RestElement": 1,
    "ExportDefaultDeclaration": 2,
    "ExportNamedDeclaration": 6,
    "ArrayPattern": 1,
    "ExportSpecifier": 1,
    "VariableDeclaration:let": 2
  },
  {
    "@file": "./pindia/reflux.min.js"
  },
  {
    "@file": "./retozi/"
  },
  {
    "@file": "./salsita/",
    "ImportDeclaration": 38,
    "ImportDefaultSpecifier": 6,
    "ImportNamespaceSpecifier": 22,
    "ExportNamedDeclaration": 54,
    "VariableDeclaration:const": 83,
    "ArrowFunctionExpression": 99,
    "ImportSpecifier": 11,
    "TemplateLiteral": 3,
    "TemplateElement": 7,
    "ExportDefaultDeclaration": 4,
    "ObjectPattern": 1,
    "VariableDeclaration:let": 1
  },
  {
    "@file": "./staltz/",
    "ImportDeclaration": 19,
    "ImportSpecifier": 15,
    "ArrowFunctionExpression": 40,
    "VariableDeclaration:const": 35,
    "ExportDefaultDeclaration": 6,
    "TemplateLiteral": 3,
    "TemplateElement": 6,
    "ImportDefaultSpecifier": 8,
    "ObjectPattern": 2
  },
  {
    "@file": "./winstonewert/",
    "ImportDeclaration": 6,
    "ImportDefaultSpecifier": 4,
    "ExportNamedDeclaration": 2,
    "ArrowFunctionExpression": 7,
    "ImportSpecifier": 2,
    "VariableDeclaration:const": 1,
    "AssignmentPattern": 2,
    "ExportDefaultDeclaration": 2,
    "ClassDeclaration": 1,
    "ClassBody": 1,
    "ForOfStatement": 1
  }
]
```


JSON to CSVをするには

- [json2csv](https://github.com/zemirco/json2csv#command-line-interface "json2csv")
- [JSON to CSV](http://konklone.io/json/ "JSON to CSV")

などが使えます。

```sh
json2csv -i results.json -o results.csv
# 何か要素が消える気がする… 
```

Numbersで読み込んで積み重ね棒グラフにしてみました。

[![graph](https://efcl.info/wp-content/uploads/2016/01/22-1453435236.png)](https://efcl.info/wp-content/uploads/2016/01/22-1453435236.png)

先ほども書いたように 数が多い ≠ 使われる頻度が高い なので、
大して意味のないグラフです。(どういうグラフ使うのがいいんだろ?)

カラフル具合から`ArrowFunctionExpression` (Arrow Function)や`const`はやっぱり使われてるなーとか、
`require`でもいいはずだけど`import`を使ってる人も多いなどがわかった気がします。

この辺は題材によるので、色々なものを見てみると面白い発見があるかもしれません。

## まとめ

- コードを分解して解析する[azu/es-usage-rate](https://github.com/azu/es-usage-rate "azu/es-usage-rate")を作った
- ES6のサンプルコードとして[staltz/flux-challenge: A frontend challenge to test UI architectures and solutions](https://github.com/staltz/flux-challenge "staltz/flux-challenge: A frontend challenge to test UI architectures and solutions")を見た
- 人/ライブラリによって使う機能が結構違うことがわかった
