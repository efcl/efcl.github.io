---
title: "ブックマークレットを作るコマンドラインツール"
author: azu
layout: post
date : 2014-09-08T07:41
category: JavaScript
tags:
    - JavaScript
    - Bookmarklets
    - CLI
    - node.js
issue: https://github.com/efcl/efcl.github.io/pull/30

---

## ブックマークレットを作るコマンドラインツール

[azu/bookmarkletter](https://github.com/azu/bookmarkletter "azu/bookmarkletter") という既存のJavaScriptからブックマークレットを作るコマンドラインツールを作りました。

## Installation

Node.jsで書かれているので、npmからインストールできます。

```
npm install bookmarkletter -g
```

## 使い方

使い方は簡単で、ファイル名を渡すかパイプでJavaScriptコードを渡せば、`javascript:` から始まるブックマークレットとして使える文字列を返してくれます。

```sh
$ bookmarkletter code.js
# or
$ cat code.js | bookmarkletter
# Broserifyと合わせるケース
$ browserify code.js | bookmarkletter
```


例えば、以下のような`index.js`というファイルをブックマークレットしてみます。

```js
var hello = function(){
  alert(document.title)
}
hello()
```

これを[bookmarkletter](https://github.com/azu/bookmarkletter "bookmarkletter")ってブックマークレット化してみます。

```
$ bookmarkletter index.js
javascript:(function(){var%20hello=function(){alert(document.title)};hello()}())
```

正しくブックマークレットで実行出来るコードが生成されました。

気づいた人もいるかも知れませんが、[bookmarkletter](https://github.com/azu/bookmarkletter "bookmarkletter")は単純に改行をなくしたりするのではなく、それが正しく動くような形で圧縮されています。

```js
var hello=function(){alert(document.title)}hello()
// SyntaxError: missing ; before statement
```

単純にスペースを失くすだけだと`;`がないためシンタックスエラーになってしまうからです。

## 仕組み

[bookmarkletter](https://github.com/azu/bookmarkletter "bookmarkletter") の仕組みについて簡単に解説します。
やってることとしてはシンプルで以下の3つのことだけです。 

- 全体を無名関数で囲んで即時実行
	- グローバルスコープにゴミを残さないようにするため
-  [esmangle](https://github.com/Constellation/esmangle "esmangle")による圧縮
- `javascript:` という文字列を先頭につける

### ASTを変換

ブックマークレットを実行した結果の変数がサイト上に残ったりすると良くないかもしれないので、まずはスクリプト全体を無名関数で囲んで即時実行させるように変換します。

単純に文字列で囲んでも問題がでるケースはほぼない気がしますが、今回は後述する [esmangle](https://github.com/Constellation/esmangle "esmangle") を使っていたので、ついでにこの変換もASTを変換する形で実装しました。

- [wrap-anonymous-ast.js](https://github.com/azu/bookmarkletter/blob/master/lib/wrap-anonymous-ast.js "wrap-anonymous-ast.js")

全体を無名関数で囲むだけなので、単純に元コードをパースした結果を無名関数を表現オブジェクトの中に突っ込むだけでも問題ないですが、せっかくなので[ast-types](https://github.com/benjamn/ast-types)を使って変換しました。

[ast-types](https://github.com/benjamn/ast-types)はFacebookの[regenerator](http://facebook.github.io/regenerator/ "regenerator")や[JSTransform](https://github.com/facebook/jstransform)での変換基盤に使わているライブラリで、ASTをJavaScriptのオブジェクトではなく関数を使ったDSLで表現出来るようになっています。

ast-typesは以下のような機能を持ったASTを扱う補助ライブラリです。

- `builders`のDSLによるASTの組み立て
- `traverse`や`eachField`などの走査関数
- DSLの定義とチェック関数
	-  デフォルトでES5などParser APIで定義されているものの型が入っています
	- 独自の型も定義できます
	- これによりJSXやfb-harmony、ES7等Parser APIで標準化されてない部分も定義されています。

このDSLを使うメリットとして、型のように定義を持っているためASTに間違ったものを入れると`check`関数によるassertionで例外が出るようになります。

JavaScript ASTの実体はただのオブジェクトで、普通にオブジェクトだけで組み立てると難しくなると思うので、こういうアプローチは面白いです。

ただ、現在普通のエディタは補完とか特にできないので、扱いにくいと思います。
[ast-types/core.js at master · benjamn/ast-types](https://github.com/benjamn/ast-types/blob/master/def/core.js "ast-types/core.js at master · benjamn/ast-types") の定義ファイルからTypeScriptのd.tsを吐き出せたら大分幸せになれそう。。


### ASTを圧縮

[esmangle](https://github.com/Constellation/esmangle "esmangle") は [UglifyJS](https://github.com/mishoo/UglifyJS2 "UglifyJS") と同じようにJavaScriptのコードを圧縮するライブラリです。

[esmangle](https://github.com/Constellation/esmangle "esmangle")は[Parser API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API "Parser API")のASTに対して処理をして、圧縮したASTを生成します。Nodeモジュールとして扱う場合は[esmangle](https://github.com/Constellation/esmangle "esmangle")の方がいわゆるJavaScript ASTを扱うものと共通のやり方なので扱いやすいと思います。

[esmangle](https://github.com/Constellation/esmangle "esmangle")は変数名を短くしたり、短絡評価に置き換えたり、使ってないラベルを削除したりと色々です。

### ASTからコードを出力

変換したASTからコードを生成するのは[Escodegen](https://github.com/Constellation/escodegen "Escodegen")を使えばいいだけです。

```js
escodegen.generate(result, {
    format: {
        renumber: true,
        hexadecimal: true,
        escapeless: true,
        compact: true,
        semicolons: false,
        parentheses: false
    }
});
```

最初に言っていたスペースを詰めたりやセミコロンの補完(詰めてしまうとエラーになる場合は入れる、イラない場合は入れない)というのは実は[Escodegen](https://github.com/Constellation/escodegen "Escodegen")の出力オプションで決めています。
(これはASTは抽象構文木であって、[Concrete Syntax Tree](https://github.com/getify/concrete-syntax-tree "Concrete Syntax Tree")ではないからだと思います)

## API

`bookmarkletter`はモジュールとして使うことも出来ます。

```
npm install bookmarkletter
```

### モジュールとして使う

モジュールとして使う場合は単純にコード文字列を渡せば、ブックマークレット化したコードを返してくれます。

```js
var bookmarkletter = require("bookmarkletter");
var code = "var a = 1;";
var result = bookmarkletter(code);
assert.equal(result, "javascript:(function(){var%20a=1}())");
```

### オプション

`bookmarkletter` 関数にはオプションオブジェクトを渡せます。

```js
var options = {
    // @type {string} 圧縮した文字列に付けるprefixです
    // Default : `javascript:`
    "prefix-string": "javascript:",
    // @type {boolean} 即時実行関数でラップするかをきめられます。
    // Default : `true`
    "wrap-anonymous-function": true
};
var code = "var a = 1;";
var result = bookmarkletter(code, options);
assert.equal(result, "javascript:(function(){var%20a=1}())");
```

## ライセンス

[azu/bookmarkletter](https://github.com/azu/bookmarkletter "azu/bookmarkletter") のライセンスはMITです

## 参考にしたもの

無名関数で囲んだり、URLエンコードする文字などは[chriszarate/bookmarkleter](https://github.com/chriszarate/bookmarkleter "chriszarate/bookmarkleter")を参考にしました。