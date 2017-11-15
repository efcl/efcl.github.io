---
title: "#html_modules_study アウトラインメモ"
author: azu
layout: post
date : 2017-11-15T20:56
category: イベント 
tags:
    - JavaScript
    - HTML
    - modules

---

# [html_modules_study - connpass](https://web-study.connpass.com/event/70731/ "html_modules_study - connpass")

[html_modules_study](https://web-study.connpass.com/event/70731/ "html_modules_study - connpass")に参加したのでメモ。

## WebComponents Updates - @1000ch

> スライド: [Web Components Updates](https://1000ch.github.io/slide/webcomponents-2017/# "Web Components Updates")

- Void or Self-closing Element
	- 今は `<x-button></x-button>` なので省略したい
	- `<x-button>`
- `assignedElements()`
	- `assignedNodes()`はTextも含まれる
	- 挿入された要素だけをShadom DOM内部で参照したい
- Custom Psuedo-elements
	- 疑似要素を独自に定義出来るようにしたいPropsal
	- `<input paseudo="start-data" type="data">`
	- `data-range-selector::start-data`
- CSS shadow Parts
	- Shadow Hostを`::part()`や`::theme()`で参照するCSSセレクタ
- HTML modules
	- `import`、`export`でHTMLをロードしていいか
	- ESのシンタックスも拡張する必要がある?
- (個人の意見) HTML Importsが宣言的に使えば何でもいい
- HTML Template Instantiation
	- [webcomponents/Template-Instantiation.md at gh-pages · w3c/webcomponents](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Template-Instantiation.md "webcomponents/Template-Instantiation.md at gh-pages · w3c/webcomponents")
	- `<template>`の中でMustace的なテンプレート
	- 記法とその振る舞いを定義
- `<link rel="modulepreload">`
	- [Add <link> rel="modulepreload" by domenic · Pull Request #2383 · whatwg/html](https://github.com/whatwg/html/pull/2383)
	- [Loading Performance with (Many) Modules: Summary as of Oct 7, 2017 - Google ドキュメント](https://docs.google.com/document/d/1ds9EEkcDGnt-iR8SAN-_7nsOfw7gsMfhZjzZ_QAIyjM/edit)
	- moduleの先までpreloadをしていくpreload
- rel=preloadとかas=moduleではだめ?
	- script要素のcredentialと一致する必要がある
	- パースする前にhtml moduleなのかスクリプトなのかわからないと問題に?
	- rel=preloadは専用のpreload cacheに保存してる V8
	- なので、module cache
	- なぜas=moduleではだめ?
	- [preload, destinations, and module scripts · Issue #486 · whatwg/fetch](https://github.com/whatwg/fetch/issues/486 "preload, destinations, and module scripts · Issue #486 · whatwg/fetch")


## Template-Instantiation.md: @koba04

- [HTML Template Instantiation](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Template-Instantiation.md "HTML Template Instantiation")
- テンプレートであってコンポーネントではない
	- mustache syntax
- バックグラウンド
	- いろんなフレームワークが独自のテンプレートを定義していた
	- それぞれのテンプレートを組み合わせるのは難しい
- mustache syntax
	- シンプル
	- 値を代入する所だけはmustache syntax
	- 他はConfigurableにして柔軟性を作る
- Use Cases 9コ
	- テンプレートからDOM Treeを作れる
	- テンプレートの変数へ代入できる
	- テンプレートの変数は更新できる
	- テンプレートの変数処理には関数を挟むことができる
	- テンプレート -> JavaScriptへ値を渡せる = 双方向なバンディング
ィング
	- 属性を更新できる
	- デフォルトの値を指定できる
	- DOMの出し分けに対応する
	- ループ処理
- Template Parts
	- `{{value}}` をPartsと呼ぶ
	- このpartsを更新することでCapitalizeとかの処理を実装できる
	- 前後のNodeや親子のNodeの参照などを持つ
- Template Partsの中にTemplate Parts
	- `InnterTemplatePart`
- Template Process Callback
	- createとupdate時に呼ばれるcallbackを指定できる
	- `createCallback`
	- `processCallback`
- Other libraries
	- [PolymerLabs/lit-html: HTML template literals in JavaScript](https://github.com/PolymerLabs/lit-html "PolymerLabs/lit-html: HTML template literals in JavaScript")
		- JavaScriptの中にテンプレートを書く
		- Tagged Template
	- [Glimmer](https://glimmerjs.com/ "Glimmer")
		- [Ember.js - Glimmer.js Progress Report](https://emberjs.com/blog/2017/10/10/glimmer-progress-report.html "Ember.js - Glimmer.js Progress Report")
- 出典
	- [Standardize template variables and event handlers · Issue #2254 · whatwg/html](https://github.com/whatwg/html/issues/2254 "Standardize &lt;template&gt; variables and event handlers · Issue #2254 · whatwg/html")
- FAQ
	- `{{` `}}` は変えられない?


## HTML Modules -  @tkochi

- Blink
- Layout Tests
- HTML5
	- progressとかいろんな要素が増えた
	- もっとプリミティブなAPIを定義したほうがいいのではというのがスタート
- HTML Imports
	- [Polymer 3.0 preview: npm and ES6 Modules - Polymer Project](https://www.polymer-project.org/blog/2017-08-22-npm-modules "Polymer 3.0 preview: npm and ES6 Modules - Polymer Project")
	- PolymerでもHTML ImportsからES moduleに移行することになった
- そもそもHTML Importとは
	- コンポーネントの定義を一つにまとめてロードする仕組み
	- `<link rel=import href=my-button.html>`
	- `HTMLLinkElement.import` (readonly)
	- 後は使うだけ
- 共通のImport
	- common.htmlを2回importした時
	- 1度目は実行される、2度目は実行されない
	- import
- HTML Importのメリット
	- `<script>`が実行できる
	- 依存関係を解決しながらロードしてくれる
		- ES moduleはすべての依存をリンクしてから実行するモデル
		- HTML Importsならパイプライン処理できる
	- テンプレート、スタイル、スクリプトを1つのファイルにかける
		- Vueの`.vue`とかと同じ
- 問題点
	- Chrome以外の実装がない
	- `Document`のツリーができてしまう
		- しかし、HTML Importの`Document`は表示されない
		- Fragmentではない
		- Documentを持つ問題を引きずる
			- `<base>`問題
		- import先でも`document`を呼ぶとメインのドキュメントが返ってくる
		- `document.currentScript.ownerDocument`
	- `<style>`がメインドキュメントに適応される
		- HTML module待ち
	- ESModulesと相互運用できない
		- ロードとか実行の順序を決めるとかをHTML ImportとES Module両方をそれぞれ書かないといけなくなる
- HTML Modules
	- <https://github.com/w3c/webcomponents/issues/645>
		- 長いスレッド
	- 実際にユーザーに出すときにはコンパイルした何かになってる
	- そういうときにHTML Modulesみたいなそのまま出すものを作る意味がどれぐらいあるのか
	- スレッドのまとめ
		- HTML in JS、JS in HTML
		- importでJavaScript以外も `as Foo` で読めるようにするとか
		- `Symbol.importer`みたいなhookを実装できるようにすればいいのではとか
		- 論点がまとまってない

```html
<script type=module>
import temp from "my-template.html";
document.querySelector("#id").appendChild(document.importNode(tmpl.content));
</script>
```


実現例(イメージ)

```html
<script type=module>
import * from "lgtm-button.html";
// registryはwindowにくっついている
</script>
<lgtm-button></lgtm-button>
```


実装例(import/export)

```html
<template>
  <button>LGTM</button>
</template>
<script>
import MyButton from "./my-button.html"
export class LGTMButton extends MyButton{}
</script>
```

- HTML moduileはHTMLとES両方の仕様を参照する
	- ES側にhookの仕組み
	- HTML側に解釈の仕組み


- 何がうれしいのか
	- `<template>`を読み込みたい
	- 文字列からDOM生成じゃないので効率的?
	- ネイティブHTMLパーザーを使うと性能が出る?
- TAPC 2017の議論
	- ES moduleベースのシステム
	- InertなHTMLがロードできる
		- [inertとは何だろう - Unreviewed](http://takenspc.hatenablog.com/entry/2013/09/26/232111 "inertとは何だろう - Unreviewed")
	- ここまでは共通認識
	- single file component
		- html,js,cssを含んだコンポーネント
	- `<script>`が実行できる
	- DOMの一部をexportできる
	- 他のモジュールをimportできる
	- Document or DocumentGragment
	- 独立した空間
		- サードパーティなHTMLを独立した空間で実行出来る
		- いいねボタンとかを別の空間にする
		- [tc39/proposal-realms: ECMAScript Proposal, specs, and reference implementation for Realms](https://github.com/tc39/proposal-realms "tc39/proposal-realms: ECMAScript Proposal, specs, and reference implementation for Realms")
	- 何も決まらなかった
	- 具体的なユースケースで話をしようぜ
- FAQ
	- Q. パッケージマネージャについて議論されてる?
	- A. 特になかった
		- Polymerの人もいるので一応考えているのでは
		- [javascript: npm for web packages · Issue #2 · package-community/discussions](https://github.com/package-community/discussions/issues/2 "javascript: npm for web packages · Issue #2 · package-community/discussions")
	- Q. 文章のフォーマットなのに文章として実行できないもを定義する意味は?
	- A. Declarative Custom HTMLとかの議論はあった
