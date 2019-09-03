---
title: "MarkdownやAsciidoc中に書いたJavaScriptのサンプルコードをdoctestするツールを作った"
author: azu
layout: post
date : 2019-09-02T10:50
category: JavaScript
tags:
    - JavaScript
    - Markdown
    - Asciidoctor
    - Doctest
    - Testing

---

技術書、ブログ、READMEを書いてていて、文章中に出てくるコードブロックのコードをテストしたいことがあると思います。
そのサンプルコードが本当に動いてるのか不安になることがあるからです。

[power-doctest](https://github.com/azu/power-doctest)は、そのコードブロック中のコードにコメントを入れるだけでテスト可能にするツール群です。

## [power-doctest](https://github.com/azu/power-doctest)の例

具体的な例から見ていきます。
次の例では、Markdownで説明とJavaScriptのコードブロックを書いています。

    デフォルト引数を使って書くことで、このような挙動は起きなくなるため安全です。 デフォルト引数では、引数が渡されなかった場合のみデフォルト値が入ります。

    ```js
    function addPrefix(text, prefix = "デフォルト:") {
        return prefix + text;
    }
    // falsyな値を渡してもデフォルト値は代入されない
    console.log(addPrefix("文字列")); // => "デフォルト:文字列"
    console.log(addPrefix("文字列", "")); // => "文字列"
    console.log(addPrefix("文字列", "カスタム:")); // => "カスタム:文字列"
    ```

> https://jsprimer.net/basic/function-declaration/ より引用

このコードブロックのコードでは、次のような形で評価したい式とその結果をコメントに書いています。

```
console.log(評価したい式); // => 期待する評価結果
```

[power-doctest](https://github.com/azu/power-doctest)を使うと、このMarkdownのコードブロックを実際に実行してテストできます。
次のように `// => 評価結果` が `assert` に変換され、テストとして実行できます。

    ```js
    function addPrefix(text, prefix = "デフォルト:") {
        return prefix + text;
    }
    // falsyな値を渡してもデフォルト値は代入されない
    assert.strictEqual(addPrefix("文字列"), "デフォルト:文字列");
    assert.strictEqual(addPrefix("文字列", ""), "文字列");
    assert.strictEqual(addPrefix("文字列", "カスタム:"), "カスタム:文字列");
    ```

このケースではエラーがないので特別な表示はありませんが、実行したテストが失敗した場合にはその結果が表示されます。

次のように実行した結果、`assert`が失敗するとわかりやすくどこで失敗したかが表示されます。
これは内部的に[power-assert](https://github.com/power-assert-js/power-assert)を使っています。

![Failure](https://efcl.info/wp-content/uploads/2019/09/02-1567391526.png)


    ```js
    function addPrefix(text, prefix = "デフォルト:") {
        return prefix + text;
    }
    // 間違った評価結果の例
    console.log(addPrefix("文字列")); // => "文字列"
    ```

基本的には `評価したい式; // => 期待する評価結果` または `console.log(評価したい式); // => 期待する評価結果` を書くだけです。
一部、ErrorやPromiseなどには少し書き方に意味をもたせています。

例えば、評価したい式がエラーを投げることをテストしたい場合は `// => Error: メッセージ` のように書きます。

```js
throw new Error("message"); // => Error: "message"
```

詳しくは次のページを参照してください。

- [Comment Assertion Syntax](https://github.com/azu/power-doctest#comment-assertion-syntax)

## [power-doctest](https://github.com/azu/power-doctest)のコンセプト

[power-doctest](https://github.com/azu/power-doctest)を作り直すのはこれで3回目です。

- [JavaScriptでdoctestを行う power-doctest を作った | Web Scratch](https://efcl.info/2013/1201/res3494/)
- [power-assertを使ったDoctestツール power-doctestを書き直した | Web Scratch](https://efcl.info/2015/08/10/power-doctest1.0/)

power-doctestのコンセプトは書いたコードを余計なコードなしにテストできるようにすることです。
コードにメモを書く感じでテストを自然に書けるようにすることが目的でした。

Pythonの[doctest](https://docs.python.org/ja/3/library/doctest.html)のようにいかにもテストしてますってよりは、
サンプルコードが動いてることを自然にコード中に確認(説明)できるようにしたいというのが目的です。

## [power-doctest](https://github.com/azu/power-doctest)の使い方

power-doctestは現在次の3つのファイルをサポートしています。

- JavaScriptファイル
- Markdownファイル
- Asciidoctorファイル

利用方法としては主に次の2つがあります。

- `power-doctest` コマンドをCLIとして使う
- JavaScriptのテストコード上でテストライブラリとして使う

### `power-doctest` コマンドをCLIとして使う

次のコマンドで`power-doctest`コマンドをインストールできます。

```
npm install power-doctest -g
```

インストールしたら、`power-doctest ./README.md`のようにテストしたいファイルを渡すだけです。

例えば、次のように内容が書かれた`README.md`があるとします。
この時、最初のJavaScriptコードブロックはdoctestされ、後ろのJavaScriptコードブロックはdoctestしません。

    1 + 1 は 2 になります。
    ```js
    console.log(1 + 1); // => 2
    ````

    <!-- doctest-disabled -->
    ```js
    // このコードは評価しない
    console.log(1 + 1); // => 2
    ````

次のように`power-doctest`コマンドでテストできます。

```sh
$ power-doctest README.md
# Test Results
Pass: 2
Fail: 0
Total: 2
```

[power-doctest](https://github.com/azu/power-doctest)では、doctestを制御する構文も持っています。
この構文を[Doctest Control Annotation](https://github.com/azu/power-doctest#doctest-control-annotation)と呼んでいますが、
基本的にはコードブロック前のコメントや属性を使って制御しています。

基本的にどのファイルも同等の意味の構文を持っています。
次のような意味の構文をそれぞれ持っています。

- doctestを無効化: `<!-- doctest:disable -->`
- doctestを有効化: `<!-- doctest:enable -->`
    - デフォルトでは全てのコードブロックを評価するが、デフォルト値自体を反転も可能であるため
- 実行結果が期待したエラーになるかをテスト: `<!-- doctest:*Error -->`
    - `<!-- doctest: SyntaxError -->` とかけば、そのdoctestが`SyntaxError`になった場合にパスします
- doctestのオプション定義: `<!-- doctest:options:{ ... } -->`
    - [@power-doctest/tester](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/tester)にわたすオプション値をコードブロックごとに設定できます
    - 具体的にはTimeoutや実行モードを指定できます
- doctestのエラーにメタデータを入れる: `<!-- doctest:meta:{ ... } -->`
    - これは主にライブラリとして使う場合の用途です
    - doctestがエラーだった場合の`Error`オブジェクトの`meta`プロパティに値をセットします

ファイルごとに若干書き方が異なるので、詳細は次の場所を参照してください。

- [power-doctest/packages/@power-doctest/javascript at master · azu/power-doctest](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/javascript)
- [power-doctest/packages/@power-doctest/markdown at master · azu/power-doctest](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/markdown)
- [power-doctest/packages/@power-doctest/asciidoctor at master · azu/power-doctest](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/asciidoctor)

また、power-doctestのCLIでは、現在の`package.json`の`main`フィールドを自動的に解決します。
例えば、[remove-use-strict](https://github.com/azu/remove-use-strict)のREADMEでは次のようなコードブロックが書かれています。

    ```js
    var removeUst = require("remove-use-strict");
    var code = 'var a = 1;\n' +
        '"use strict";\n"use strict";';// unnecessary use strict...
    removeUst(code); // => 'var a = 1;'
    ```

これをNode.jsのコードとして実行しても`remove-use-strict`のリポジトリには、`"remove-use-strict"`はインストールしてないため実行時エラーとなります。
そのため、power-doctestのCLIでは、`package.json`のmainフィールドを見て、`"remove-use-strict"`を`"lib/remove-use-strict.js"`を読み込むように変更します。

```
    "main": "lib/remove-use-strict.js",
```

これによりdoctestはユーザーと同じサンプルコードを動かせます。

CLIの方は主にREADMEのdoctestをする用途に合わせています。(イマイチアイデアが足りてないのでとりあえず動くレベルです)

### JavaScriptのテストコード上でテストライブラリとして使う

[power-doctest](https://github.com/azu/power-doctest)はどちらかというこちらの用途をメインに作られています。

具体的には、Promise本の一部とjs-primerの大部分のサンプルコードはpower-doctestでテストされています。
非同期処理も含めた1000件ぐらいのテストケースが実行されているので、基本的なコードのテストはpower-doctestでも書けると思います。

- [asciidwango/js-primer: JavaScriptの入門書 - JavaScript Primer](https://github.com/asciidwango/js-primer)
- [azu/promises-book: JavaScript Promiseの本](https://github.com/azu/promises-book)

ライブラリとして使う場合は、コードをテストできる[@power-doctest/tester](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/tester)と各ファイルの実装を組み合わせて利用します。

シンプルに`source/**/*.js`のファイルをdoctestしたい場合は次のように書けます。

```js
import { test } from "@power-doctest/tester";
import { parse } from "@power-doctest/javascript";
const globby = require("globby");
const fs = require("fs");
const path = require("path");
// doctest for source/**/*.js
describe("doctest:js", function() {
    const sourceDir = path.join(__dirname, "..", "source");
    const files = globby.sync([
        `${sourceDir}/**/*.js`,
        `!${sourceDir}/**/node_modules{,/**}`
    ]);
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        it(`doctest:js ${normalizeFilePath}`, function() {
            const content = fs.readFileSync(filePath, "utf-8");
            const parsedResults = parse({
                content,
                filePath
            });
            const parsedCode = parsedResults[0];
            return test(parsedCode).catch(error => {
                // Stack Trace like
                console.error(`StrictEvalError: strict eval is failed
    at strictEval (${filePath}:1:1)`);
                return Promise.reject(error);
            });
        });
    });
});
```

READMEの[Recipes](https://github.com/azu/power-doctest#recipes)に詳細を書いているので参考にしてみてください。

- [@power-doctest/tester](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/tester) + [@power-doctest/javascript](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/javascript) + [Mocha](https://mochajs.org/)
    - Example: <https://github.com/asciidwango/js-primer/blob/master/test/example-test.js>
- [@power-doctest/tester](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/tester) + [@power-doctest/markdown](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/markdown) + [Mocha](https://mochajs.org/)
    - Example: <https://github.com/asciidwango/js-primer/blob/master/test/markdown-doc-test.js>
- [@power-doctest/tester](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/tester) + [@power-doctest/asciidoctor](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/asciidoctor) + [Mocha](https://mochajs.org/)
    - Example: <https://github.com/azu/promises-book/blob/7db237e6274a3af8db3b5cb92a2dd8574d9890e5/test/doctest.js>

### 非同期処理のテストの注意点

power-doctestはデフォルトではコード上の全ての` // => ` ができるまで終了を待ちます。(`runMode: "all"`)
そのため次のような、条件分岐で片方しか実行されない場合はタイムアウトになります。

    ```js
    if (1 === 1) {
        console.log(1); // => 1
    } else{
        console.log(2); // => 2
    }
    ```

これを回避するオプションが、[@power-doctest/tester](https://github.com/azu/power-doctest/tree/master/packages/@power-doctest/tester)に定義されていて、
`runMode: "any"`を選択すると、1つでもassertが実行されたら終了できます。

[Doctest Control Annotation](https://github.com/azu/power-doctest#doctest-control-annotation)でコードブロックごとに設定を上書きできるので、
Markdownなら次のように書くだけです。

    <!-- doctest:options:{ "runMode": "any" } -->
    ```js
    if (1 === 1) {
        console.log(1); // => 1
    } else{
        console.log(2); // => 2
    }
    ```

## まとめ

[power-doctest](https://github.com/azu/power-doctest)は、コードに対して評価結果のコメントを書くだけでそのコードを実際に実行してテストできます。

- `評価したい式; // => 期待する評価結果` を書くだけ
- JavaScript、Markdown、Asciidoctorに対応
- [Doctest Control Annotation](https://github.com/azu/power-doctest#doctest-control-annotation)でdoctestするかをコードブロック単位で制御できる
- [Recipes](https://github.com/azu/power-doctest#recipes)にあるようにテストコードのライブラリとして利用できる

サンプルコードが本当に動いてるかどうかの不安を取り除く手段として[power-doctest](https://github.com/azu/power-doctest)を作りました。
