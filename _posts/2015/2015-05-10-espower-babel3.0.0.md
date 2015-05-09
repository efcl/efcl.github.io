---
title: "テストコードをES6+power-assertで書けるespower-babel 3.0.0リリース"
author: azu
layout: post
date : 2015-05-10T00:11
category: JavaScript
tags:
    - babel
    - JavaScript
    - ES6
    - tools
    - library
    - testing

---

[ライブラリをES6で書いて公開する所から始めよう | Web Scratch](http://efcl.info/2015/01/09/write-es6/ "ライブラリをES6で書いて公開する所から始めよう | Web Scratch")で紹介してた[azu/espower-babel](https://github.com/azu/espower-babel "azu/espower-babel")をアップデートして[3.0.0](https://github.com/azu/espower-babel/releases/tag/v3.0.0 "3.0.0")をリリースしました。

[espower-babel](https://github.com/azu/espower-babel "azu/espower-babel")は[Babel](http://babeljs.io/ "Babel")の変換 + [power-assert](https://github.com/twada/power-assert "power-assert")の変換を一緒にやってくれるライブラリです。

簡単に言うとES6でテストコードを書いてMochaで動かすのを設定ファイル等を作らないで出来るようにするためのライブラリです。

詳しくは以下の記事を見て下さい

- [ライブラリをES6で書いて公開する所から始めよう | Web Scratch](http://efcl.info/2015/01/09/write-es6/ "ライブラリをES6で書いて公開する所から始めよう | Web Scratch")

## 3.0.0

今まで[espower-babel](https://github.com/azu/espower-babel "azu/espower-babel")はテストファイルのみをBabel(当時は6to5ですが)で変換していて、テストから`import`したファイルについてはBabelの変換をしてませんでした。

そのため、2.x以下だとES6で書いたテストファイルから、既に変換済みのES5のコードを参照する必要があって直感的ではなかったと思います。

[![diff](http://monosnap.com/image/rVZFSUmfrBZzfCQhaxnNhFbrPOl2Iy.png)](https://github.com/efcl/efcl.github.io/commit/a029988b21f0ab6713c97a2123edde96d5bf8e85)

[3.0.0](https://github.com/azu/espower-babel/releases/tag/v3.0.0 "3.0.0")では、テストファイル以外も自動的に変換するようなBreaking Changeを入れています。

記事の方もこの変更に追従させてアップデートしているので、細かく変更点を知りたい人は以下のDiffを見てみるといいかと思います。

- [ライブラリをES6で書いて公開する所から始めよう | Web Scratch](http://efcl.info/2015/01/09/write-es6/ "ライブラリをES6で書いて公開する所から始めよう | Web Scratch")
- [Update espower-babel by azu · Pull Request #84 · efcl/efcl.github.io](https://github.com/efcl/efcl.github.io/pull/84/files "Update espower-babel by azu · Pull Request #84 · efcl/efcl.github.io")


ES6に変換したくないコードをテストファイルから読み込んでいる場合は、[espower-babel](https://github.com/azu/espower-babel "azu/espower-babel")は[Babel](http://babeljs.io/ "Babel")は[babelrc](http://babeljs.io/docs/usage/babelrc/ "babelrc")の設定ファイルを自動で使うようになってるので、以下のような設定を書くと変換しません。

```
{
  "ignore": [
    "foo.js",
    "bar/**/*.js"
  ]
}
```

- [babelrc · Babel](http://babeljs.io/docs/usage/babelrc/ "babelrc · Babel")


## まとめ

- [espower-babel](https://github.com/azu/espower-babel "azu/espower-babel") 3.0.0からはテストファイル以外も自動でBabelの変換を行うようになった
- これにより、変換済みの一時ファイル(ES5のコード)なしでES6のみでコードとテストを書けるようになった
- [espower-babel](https://github.com/azu/espower-babel "azu/espower-babel") 2.xのものを使っている場合は、テストから直接ES6のコードを参照するように書き換えると良い
	- Babelが二重に変換してしまって挙動が変わる可能性はあるのか未定義(二度変換してもASTレベルでは同じに見えるけど)
- 変換したくない場合は[babelrc](http://babeljs.io/docs/usage/babelrc/ "babelrc")でignoreやonlyの設定をする
