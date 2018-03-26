---
title: "コード中にあるprototype.jsの拡張メソッドを使ってる部分を検索するツール"
author: azu
layout: post
date : 2017-04-26T10:18
category: JavaScript
tags:
    - JavaScript
    - prototype.js
    - tool
    - AST

---

[Prototype.js](http://prototypejs.org/ "Prototype")のコードを見つけるgrep的な検索ツールを書きました。

- [azu/search-prototype.js: Search usage of prototype.js in your codes.](https://github.com/azu/search-prototype.js "azu/search-prototype.js: Search usage of prototype.js in your codes.")

[![gif](https://media.giphy.com/media/l4FGDki3jhUbhGVSE/giphy.gif)](https://github.com/azu/search-prototype.js)

redmind 2.0のコードからprototype.jsを利用してる箇所を検索してる様子

## 使い方

使い方はものすごい単純で、インストールして、検索したいファイルパスを渡すだけです。

	npm install search-prototype.js -g
	search-prototype.js ./public/javascripts/application.js

標準出力に検索結果が流れてきます。

検出するAPIの定義はAPIリファレンスのサジェストファイルから取ってきています。

- <http://api.prototypejs.org/javascripts/pdoc/item_index.js>

## 制限

[Prototype.js](http://prototypejs.org/ "Prototype")は名前が表すようにprototypeを拡張するライブラリです。

そのため、`Array.prototype.every`がprototype.jsで拡張されたものか、ネイティブものかを見極める方法はありません。
この検索ツールでは、そういった曖昧なものもデフォルトではアグレッシブに検出します。

[grasp](http://www.graspjs.com/ "grasp")をベースにしたASTをベースにして検索を行うため、文字列検索よりは誤爆は少ないですがそれでも誤爆は避けられません。

```
"[].every()は文字列" // 文字列
// これは検出されないけど
[].every(function(element){})
// これは検出する
```

さらにいえば、JavaScriptの関数はファーストクラスなので、次のような書き方も正常系です。なので、このツールではこの書き方も検出します。

```js
var cc = Class.create
cc({});
```

![image](https://efcl.info/wp-content/uploads/2017/04/26-1493170126.png)

- <https://github.com/azu/search-prototype.js/blob/master/src/create-search-index.js>
- このファイルをみるとどのような検索パターンなのか分かります。

検索クエリは基本的にはequeryですが、utilだけsqueryで書いてます(graspには`$`をエスケープできないバグがある)

- [equery | Grasp - JavaScript structural search, replace, and refactor](http://www.graspjs.com/docs/equery/)
- [squery | Grasp - JavaScript structural search, replace, and refactor](http://www.graspjs.com/docs/squery/)


## おわり

[Prototype JavaScript Framework - Wikipedia](https://en.wikipedia.org/wiki/Prototype_JavaScript_Framework "Prototype JavaScript Framework - Wikipedia")によると[Prototype.js](http://prototypejs.org/ "Prototype")のは12年前にリリースされたライブラリです。

[MooTools](https://mootools.net/ "MooTools")もそうですが、まだECMAScriptにはArray#mapなどもなかった時代に色々拡張したprototypeメソッドを定義しています。
そのため、jQueryなどと比べてもコードとライブラリが融合しやすく後からリファクタリングするのはとても大変です。(どこでメソッドを参照されているのか分からない)

prototype.js自体を書き換えて実行時にprototype.jsの利用箇所を検出する方法もありますが、特定のタイミングでしか呼ばれない箇所にprototype.jsの依存がある場合は見つけることができません。
そういったものも静的に解析できるようにするため[search-prototype.js](https://github.com/azu/search-prototype.js "search-prototype.js")を作ってみました。

- [prototype/update_helper.js at master · sstephenson/prototype](https://github.com/sstephenson/prototype/blob/master/ext/update_helper/update_helper.js "prototype/update_helper.js at master · sstephenson/prototype")

検索だけでなく置換も含めたリファクタリングを行いたい場合は[jscodeshift](https://github.com/facebook/jscodeshift "jscodeshift")などもおすすめです。

- [jscodeshift](https://github.com/facebook/jscodeshift "jscodeshift")
- [Grasp - JavaScript structural search, replace, and refactor](http://www.graspjs.com/ "Grasp - JavaScript structural search, replace, and refactor")
	- [Replacement | Grasp - JavaScript structural search, replace, and refactor](http://www.graspjs.com/docs/replace/ "Replacement | Grasp - JavaScript structural search, replace, and refactor")


----

prototype.jsは今月になってなぜかコミットがあったのが面白かったです。

- [Commits · sstephenson/prototype](https://github.com/sstephenson/prototype/commits/master "Commits · sstephenson/prototype")
