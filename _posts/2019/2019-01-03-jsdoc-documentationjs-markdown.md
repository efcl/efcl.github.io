---
title: "documentationjs + add-text-to-markdownでREADME.mdのAPIリファレンスを自動更新"
author: azu
layout: post
date : 2019-01-03T10:38
category: JavaScript
tags:
    - JavaScript
    - JSDoc
    - Markdown

---

[documentationjs](http://documentation.js.org/)はJSDocからドキュメントを生成できるツールで、ES2015以降のコードにも対応しています。
(TypeScriptは対応してないようです)

以前はMarkdownへの出力が難しかったのですが、いつのまにか`documentation build -f md`でMarkdownでのAPIドキュメントが生成できるようになっていました。

これを使うことで、ライブラリを書いてそのJSDocからドキュメントを生成して、READMEのUsageセキュクションを自動的に更新できるようになっています。

以前もできたのですが、かなりトリッキーなテーマを書いたりしないといけませんでした。(後stdoutへの出力がなかった気がします)

- [--theme for Markdown · Issue #550 · documentationjs/documentation](https://github.com/documentationjs/documentation/issues/550)

## やり方

必要なものは[documentationjs](http://documentation.js.org/)と[add-text-to-markdown](https://github.com/azu/add-text-to-markdown)です。
[add-text-to-markdown](https://github.com/azu/add-text-to-markdown)は標準入力の内容をMarkdownの特定のセクションに上書きするシンプルなCLIです。

サンプルリポジトリ

- [azu/documentationjs-markdown-api-example: An example for documentationjs + markdown reference.](https://github.com/azu/documentationjs-markdown-api-example)

### インストール

	npm install --save-dev documentation add-text-to-markdown
	
### JSDoc付きのコードを書く

[documentationjs](http://documentation.js.org/)はあくまでJSDocからドキュメントを作るツールなので、JSDoc	を書いたコードが必要です。

今回は[src/index.js](https://github.com/azu/documentationjs-markdown-api-example/blob/master/src/index.js)というコードを例にします。

```js
/**
 * Return Hello message
 * @param {string} name
 * @returns {string}
 * @example
 * hello("john"); // => "Hello, john"
 */
function hello(name) {
    return `Hello, ${name}`;
}

/**
 * update property with `propertyValue` if the `propertyName` does not exists
 * @param {*} object
 * @param {string} propertyName
 * @param {string} propertyValue
 * @param {{force: boolean}} options
 * @example
 * const object = {};
 * update(object, "key", "value", { force: true })
 * console.log(object); // { key: "value" }
 */
const updateProp = (object, propertyName, propertyValue, options = { force: false }) => {
    if (object[propertyName] && options.force) {
        object[propertyName] = propertyValue;
    } else if (object[propertyName]) {
        // no update
    } else {
        object[propertyName] = propertyValue;
    }
};

/**
 * @class
 */
class Myclass {
    /**
     * report message
     * @param {string} message
     */
    report(message) {

    }
}

export {
    hello,
    updateProp
}
```

### JSDoc を MarkdownにしてRAEDMEに追加する

このコードは次のようにしてJSDocからMarkdownへ変換できます。

```
documentation build -f md src/index.js
```

この出力内容を使ってREADMEの"Usage"セクション(HeaderがUsageのところ"を[add-text-to-markdown](https://github.com/azu/add-text-to-markdown)で更新します。

[add-text-to-markdown](https://github.com/azu/add-text-to-markdown)は標準入力を受け取るので、そのままパイプ処理で更新できます。

```js
documentation build -f md src/index.js | add-text-to-markdown README.md --section "Usage" --write
```  

### 結果

次のような感じでREADMEの"Usage"がJSDocのAPIドキュメントになりました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">documentationjs + add-text-to-markdown easy to update your library API Reference on <a href="https://t.co/UoGj4zIRHf">https://t.co/UoGj4zIRHf</a><br><br>Just do it:<br><br>$ documentation build -f md src/index.js | add-text-to-markdown <a href="https://t.co/UoGj4zIRHf">https://t.co/UoGj4zIRHf</a> --section \&quot;Usage\&quot; --write<a href="https://t.co/Svp9uOkxwD">https://t.co/Svp9uOkxwD</a> <a href="https://t.co/8p659JMNn8">pic.twitter.com/8p659JMNn8</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1080637888574808064?ref_src=twsrc%5Etfw">January 3, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## おわり

この方法はライブラリを書いてREADMEに使い方を書くようなスタイルだとかなり自動化ができて便利です。[documentationjs](http://documentation.js.org/)はJavaScript(JSDoc)しか対応してないので、使える範囲が限られますが、TypeScriptとかも同じようなことができるといいなーと思いました。

具体例

- [azu/morpheme-match-all: A wrapper of morpheme-match API. Match all kuromoji's tokens.](https://github.com/azu/morpheme-match-all "azu/morpheme-match-all: A wrapper of morpheme-match API. Match all kuromoji's tokens.")¡

