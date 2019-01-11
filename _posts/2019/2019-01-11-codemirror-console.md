---
title: "JavaScriptのコード例をインタラクティブに実行できるようにするREPLライブラリ"
author: azu
layout: post
date : 2019-01-11T10:32
category: JavaScript
tags:
    - JavaScript
    - CodeMirror

---

[codemirror-console][]というJavaScriptのコード例をその場で編集したり、実行して評価結果をだせるようにするライブラリを作りました。
書籍などのサンプルコードをユーザーに実行してもらったり、編集して動作を確認してもらいながら理解する用途で作ったものです

[![codemirror-consoleの動作例](https://efcl.info/wp-content/uploads/2019/01/11-1547170602.png)](https://github.com/azu/codemirror-console)

- [azu/codemirror-console: Web Console UI for JavaScript.](https://github.com/azu/codemirror-console)

実際に動いてる例としては、[JavaScript Promiseの本](http://azu.github.io/promises-book/)や[JavaScriptの入門書 #jsprimer](https://jsprimer.net/)で見れます。
あと、GitBookで動いてるサンプルは次のページで見れます。

- <https://codemirror-console.netlify.com/>

[codemirror-console][]はmonorepoになっていてコアライブラリや[GitBook](https://www.gitbook.com/)向けのプラグインなどが入っています。
名前のとおり[CodeMirror](https://codemirror.net/)にJavaScriptの評価機能を追加したようなライブラリです。

## 使い方

[codemirror-console-ui](https://github.com/azu/codemirror-console/tree/master/packages/codemirror-console-ui)というDOM API版のライブラリもあるので基本的にJavaScriptが実行できるならどこでも使える感じです。

`<pre><code>コード</code></pre>` のコード部分をエディタに差し替える感じです。

```js
import { attachToElement } from "codemirror-console-ui" 
const codeBlock = document.querySelector("code");
attachToElement(codeBlock, "default text", {
   state: "open",
   scrollIntoView: true
});
```

[gitbook-plugin-js-console](https://github.com/azu/codemirror-console/tree/master/packages/gitbook-plugin-js-console)の場合はコードブロックに対してコメントを付けるだけで、指定したコードブロックだけ[codemirror-console][]に差し替えできます。

	<!-- js-console -->
	```js
	1 + 2;
	```
	
Docusaurusなど他の環境向けのプラグインも必要になったら追加していきたいです。
(必要になった人はPRを送ってください)	

## おわりに

このような書籍などのサンプルコードを実行する試みは結構色々なところでも見かけるようになったと思います。([codemirror-console][]は元々[JavaScript Promiseの本](http://azu.github.io/promises-book/)を書いてた時に、そういうものがなくて作りました)

たとえば、CodeMirrorの作者である[Marijn Haverbeke](https://github.com/marijnh)の[Eloquent JavaScript](https://eloquentjavascript.net/)という書籍でも同じような仕組みがあります。
またJavaScript以外でもRustの[The Rust Programming Language](https://doc.rust-lang.org/book/)なども同様の機能をもっています(こちらは実行サーバと通信します)

サービスも昔は[JSfiddle](https://jsfiddle.net/)のようなクライアントサイドで実行するシンプルなものでしたが、今は[CodeSandbox](https://codesandbox.io/)、[Repl.it](https://repl.it/)、[Glitch](https://glitch.com/)など仮想環境で環境構築できるような高機能なものが増えています。

[web.dev](https://web.dev/)は[Glitch](https://glitch.com/)は[Glitch](https://glitch.com/)を埋め込んでチュートリアルを書いたりしてますが、結構シームレスです。

- [Serve modern code to modern browsers for faster page loads  |  web.dev](https://web.dev/fast/serve-modern-code-to-modern-browsers/codelab-serve-modern-code)

このようなサンドボックスでサンプルが簡単に実行できるようにしているのは、実行しないとやっぱりわからないことは多いからだと思います。

[codemirror-console][]はブラウザでJavaScriptを実行するというは原始的な仕組みですが、JavaScriptを学ぶ際には役に立つはずです。

[JavaScriptの入門書 #jsprimer](https://jsprimer.net/)でも[ウェブ版の書籍でコードを実行する](https://jsprimer.net/basic/read-eval-print/#execute-on-web)というページでこの機能を紹介しています。読む人はブラウザ以外を用意しないで実行できるのが大きなメリットです。

また、[asciidwango/js-primer](https://github.com/asciidwango)ではこの機能を使って表示しているコードが本当に実行可能か(意図した結果になるか)を[自動テスト](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md#%E3%83%86%E3%82%B9%E3%83%88)する仕組みも取り入れています。

ドキュメント中のコードは不正確になりがちなので、次はその辺の仕組みを考えていきたいです。

[codemirror-console]: https://github.com/azu/codemirror-console
