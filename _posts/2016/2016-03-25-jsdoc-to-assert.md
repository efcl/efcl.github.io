---
title: "JSDocをランタイムassertに変換するBabelプラグインを書いた"
author: azu
layout: post
date : 2016-03-25T10:37
category: JavaScript
tags:
    - JavaScript
    - Type
    - Babel

---

JSDocをassertに変換するライブラリとそれを使ったBabelプラグインを書きました。

- [azu/babel-plugin-jsdoc-to-assert: Babel plugin for jsdoc-to-assert.](https://github.com/azu/babel-plugin-jsdoc-to-assert)
- [azu/jsdoc-to-assert: JSDoc to assert](https://github.com/azu/jsdoc-to-assert)

ライブラリの[jsdoc-to-assert](https://github.com/azu/jsdoc-to-assert "jsdoc-to-assert")の方は、JavaScript ASTのコメントから`assert`の文字列を作り出しくれるだけのシンプルなものです。

実際に使う場合は、Babelのプラグインとして[babel-plugin-jsdoc-to-assert](https://github.com/azu/babel-plugin-jsdoc-to-assert "babel-plugin-jsdoc-to-assert")を使い、コードを変換してランタイムassertを追加させます。

やっていることとしては、FlowTypeをランタイムチェックする[babel-plugin-typecheck](https://github.com/codemix/babel-plugin-typecheck "babel-plugin-typecheck")のJSDoc版とも言えます。

- [babel-plugin-typecheck を使って flowtype 文法で書かれたJSをランタイムチェックする - Qiita](http://qiita.com/mizchi/items/30a5f9560e86e0d5ab31)
- [codemix/babel-plugin-typecheck: Static and runtime type checking for JavaScript in the form of a Babel plugin.](https://github.com/codemix/babel-plugin-typecheck)

すごく難しい仕組みではないので、既にやって人がいるのではと思ったのですがいなかったので作りました。

- [JSDoc to assertに変換するツールが欲しい · Issue #73 · azu/azu](https://github.com/azu/azu/issues/73 "JSDoc to assertに変換するツールが欲しい · Issue #73 · azu/azu")


## 変換例

例えば次のような関数とJSDocがあったとします。

```js
/**
 * @param {number} a - this is a param.
 * @param {string} b - this is a param.
 * @param {string[]} c - this is a param.
 * @param {boolean} [d] - this is a optional.
 */
function myFunc(a, b, c, d) {
	//...
}
```

これを[babel-plugin-jsdoc-to-assert](https://github.com/azu/babel-plugin-jsdoc-to-assert "babel-plugin-jsdoc-to-assert")では次のように変換してassert処理を追加しています。

```js
/**
 * @param {number} a - this is a param.
 * @param {string} b - this is a param.
 * @param {string[]} c - this is a param.
 * @param {boolean} [d] - this is a optional.
 */
function myFunc(param, b, c) {
  console.assert(typeof a === 'number');
  console.assert(typeof b === 'string');
  console.assert(Array.isArray(c));
}
```

みて分かるようにかなりシンプルな変換がされます。(実際はもう少しメッセージを追加しますが、最小限です)

`assert`ライブラリの依存を解決するのが面倒だったので、`console.assert`を使っていますが一部ブラウザは例外を投げずにログを出すだけらしいです。(Nodeは例外を投げてくれる)

`d`はオプショナルな引数なので、今のところチェックしていません。
また、`string[]`のチェックが配列かどうかぐらいとなっていたり、まだまだ色々チェック不足な部分はあります。

Pull request 待ってます！

- [Optional arguments support · Issue #1 · azu/jsdoc-to-assert](https://github.com/azu/jsdoc-to-assert/issues/1 "Optional arguments support · Issue #1 · azu/jsdoc-to-assert")

## 使い方

### インストール

	npm install babel-plugin-jsdoc-to-assert

### 設定

Babelプラグインなので、Babelと共に利用するために`.babelrc`を設定します。

```
{
  "plugins": [
    "jsdoc-to-assert"
  ]
}
```

とシンプルに設定できますが、実際には開発中のみ変換して欲しいと思うので、`env`オプションを使うことで開発中のみ変換できます。

```
{
  "presets": [
    "es2015"
  ],
  "env": {
    "development": {
      "plugins": [
        "jsdoc-to-assert"
      ]
    }
  }
}
```

`jsdoc-to-assert`の変換は含めずにビルドする場合は`production`を設定してビルドすれば、適応されずにすみます。

	NODE_ENV=production babel src --out-dir lib --source-maps
	
## 仕組み

[jsdoc-to-assert](https://github.com/azu/jsdoc-to-assert "jsdoc-to-assert")はコメント(leadingComments Node)を`assert`などのコード片に変換するだけです。

`function a(){}` や `const a = function(){}`、 `class A{ method(){} }` などJSDocを書ける場所は沢山あります。

これらどの関数宣言に対してコード変換をするかは[babel-plugin-jsdoc-to-assert](https://github.com/azu/babel-plugin-jsdoc-to-assert "babel-plugin-jsdoc-to-assert")側に実装しています。

- [JavaScript ASTを始める最初の一歩 | Web Scratch](http://efcl.info/2016/03/06/ast-first-step/ "JavaScript ASTを始める最初の一歩 | Web Scratch")

で書いていますが、BabelのASTはあんまり互換性がないので、[babel-plugin-jsdoc-to-assert](https://github.com/azu/babel-plugin-jsdoc-to-assert "babel-plugin-jsdoc-to-assert")の部分は複数実装が存在してもおかしくない領域です。

以前、似たようなツールで`a; // => "string"` のようなコメントをassertに変換するライブラリも書いていましたが、この場合も[コメントをassertに変換する部分](https://github.com/azu/comment-to-assert)と[変換したassertをコードに追加する部分](https://github.com/azu/power-doctest)は分けて実装していました。

- [azu/comment-to-assert: convert single line comment to assert.](https://github.com/azu/comment-to-assert)
- [power-assertを使ったDoctestツール power-doctestを書き直した | Web Scratch](http://efcl.info/2015/08/10/power-doctest1.0/)

話を戻して、JSDoc自体の型定義が結構曖昧(nullableとか定義みたいな部分が曖昧)なので、[jsdoc-to-assert](https://github.com/azu/jsdoc-to-assert "jsdoc-to-assert")も実装見ると分かるようにかなり簡略化しています。

ESLintで静的にJSDocのコメントをチェックできる[valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc "valid-jsdoc")と[babel-plugin-jsdoc-to-assert](https://github.com/azu/babel-plugin-jsdoc-to-assert "babel-plugin-jsdoc-to-assert")を合わせて使うようなイメージで書いています。

JSDoc単体の型定義はValidだけど、実際の利用方法と合ってるかどうかを[babel-plugin-jsdoc-to-assert](https://github.com/azu/babel-plugin-jsdoc-to-assert "babel-plugin-jsdoc-to-assert")でチェックするイメージです。

- [Rule valid-jsdoc - ESLint - Pluggable JavaScript linter](http://eslint.org/docs/rules/valid-jsdoc "Rule valid-jsdoc - ESLint - Pluggable JavaScript linter")

また、[契約プログラミング](https://ja.wikipedia.org/wiki/%E5%A5%91%E7%B4%84%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0 "契約プログラミング")に言えば[jsdoc-to-assert](https://github.com/azu/jsdoc-to-assert "jsdoc-to-assert")は事前条件、つまり`@param`のみのチェックをしています。
`@returns`のチェックはユニットテストで保証するのがいいと思います。

正直まだエラーメッセージも全然わかりやすくないし、中途半端なチェックしかできません。
この辺を改善したい人のContributionsを待ってます！

- [azu/babel-plugin-jsdoc-to-assert: Babel plugin for jsdoc-to-assert.](https://github.com/azu/babel-plugin-jsdoc-to-assert)
- [azu/jsdoc-to-assert: JSDoc to assert](https://github.com/azu/jsdoc-to-assert)

結局はキレイなJSDocが残ればいいだけなので、
[babel-plugin-jsdoc-to-assert](https://github.com/azu/babel-plugin-jsdoc-to-assert "babel-plugin-jsdoc-to-assert")はいつでも外しても問題ない作りです。
なので、Babelを使ってるプロジェクトにひっそりいれて色々エラーを見つけると面白いのかもしれません。

類似

- FlowType: [codemix/babel-plugin-typecheck: Static and runtime type checking for JavaScript in the form of a Babel plugin.](https://github.com/codemix/babel-plugin-typecheck)
- TypeScript: [Proposal: Run-time Type Checks · Issue #7607 · Microsoft/TypeScript](https://github.com/Microsoft/TypeScript/issues/7607 "Proposal: Run-time Type Checks · Issue #7607 · Microsoft/TypeScript")
