---
title: "PDFを見ながらMarkdownでメモを取れるアプリを書いた"
author: azu
layout: post
date : 2015-05-04T15:39
category: JavaScript
tags:
    - nw.js
    - node-webkit
    - pdf
    - markdown
    - github
    - JavaScript
    - CustomElement
    - WebComponent

---

[NW.js](http://nwjs.io/ "NW.js")(node-webkit)で[azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator")というアプリを作りました。

![screenshot](http://efcl.info/wp-content/uploads/2015/05/04-1430721718.png)

## [pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator")

簡単に書くと

- PDFとMarkdownエディタを横に並べてメモを書けるアプリ
- PDFから選択範囲をエディタに引用
	- プレビューモードから該当ページにジャンプできる
- Markdownの読み書き
- Markdownのプレビュー

という感じのシンプルなアプリです。

### インストール

- [latest binary](https://github.com/azu/pdf-markdown-annotator/releases/latest)からダウンロード

OS X, Windows, Linuxで多分動くはずです

----

### なぜ作ったか?

箇条書すると以下のような感じで作りました。

- ES5の仕様書を読みたくなった
- PDF or HTML どっちで読む?
- メモ付けないと一瞬で忘れる
- HTMLにメモを書く?
	- HTMLページにメモ付けるタイプはサービスに依存する(保存場所の問題
	- [Home - Annotator - Annotating the Web](http://annotatorjs.org/ "Home - Annotator - Annotating the Web")
- PDFにアノテーションを付ける?
	- PDFのアノテーションを使う習慣がない
- メモはMarkdownで書きたい
- [Highlights App for Mac](http://highlightsapp.net/ "Highlights App for Mac") というアプリを見つけた
	- 悪くない使い心地
	- 発想が面白い PDF + Markdownエディタ
- pdf.jsとCodeMirrorで普通に実現できそう
	- [azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator") 作った
- このアーキテクチャならブラウザ上でも動かせそう
	- https://github.com/azu/annotation-memo/ 動いた

という感じでできました。

最後に書いてありますが、[azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator")はブラウザ上でも動くように作ったので(read onlyですが)以下にES5仕様の読書メモを公開してあります。

<div class="kwout" style="text-align: center;"><img src="http://kwout.com/cutout/a/it/g9/4x5_bor.jpg" alt="http://azu.github.io/annotation-memo/es5/" title="ECMAScript 5 読書メモ" width="600" height="341" style="border: none;" usemap="#map_aitg94x5" /><map id="map_aitg94x5" name="map_aitg94x5"><area coords="420,192,483,209" href="http://azu.github.io/annotation-memo/es5/Ecma-262_5.1.pdf#page=127&zoom=auto,-101,413" alt="" shape="rect" /></map><p style="margin-top: 10px; text-align: center;"><a href="http://azu.github.io/annotation-memo/es5/">ECMAScript 5 読書メモ</a> via <a href="http://kwout.com/quote/aitg94x5">kwout</a></p></div>

- [ECMAScript 5 読書メモ](http://azu.github.io/annotation-memo/es5/ "ECMAScript 5 読書メモ")
	- アプリ版と全く同じソースコードで、`fs`とか一部動かないのはfallback書いた感じです
	- ブラウザはプレビューモードなので、リンクをクリックするとページにジャンプできるのは便利で気に入ってます

[azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator")はES6 + [React](http://facebook.github.io/react/ "React") + [material-flux](https://github.com/azu/material-flux "azu/material-flux") + [CodeMirror](http://codemirror.net/) + [pdf.js](https://github.com/mozilla/pdf.js)のweb viewerで動いています。

NW.jsはNode.jsが動くので、

```
require("babel/register")();
```

という一行が初期化時に走らせて、後はES6で書いたコードが読み込み時に自動でES5に変換できます。
そのためES6のコードがビルド不要で動かせます。(多分大部分はFirefoxやChromeなら素で動く感じがしますが)

[CodeMirror](http://codemirror.net/) や [pdf.js](https://github.com/mozilla/pdf.js)はDOMをガンガンいじるライブラリなので、Reactで扱うときにどうするかはちょっとまだ迷っているので雑な作りになってます。

- [pdf-markdown-annotator/lib/components at master · azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator/tree/master/lib/components "pdf-markdown-annotator/lib/components at master · azu/pdf-markdown-annotator")
- Componentで包んであるけど、包みきれてない感じ

PDFの表示はiframe置いただけというシンプルなもので、こんなものでも結構使えるのでpdf.jsは触って楽しい感じがします。
もうちょっとしたらイベントの仕組みがViewerに入るので、これあるとよりコンポーネントとして扱いやすくなると思います。

- [Added documentloaded, metadataloaded, and pageremoved API events by mbbaig · Pull Request #5915 · mozilla/pdf.js](https://github.com/mozilla/pdf.js/pull/5915 "Added documentloaded, metadataloaded, and pageremoved API events by mbbaig · Pull Request #5915 · mozilla/pdf.js")

[Highlights App for Mac](http://highlightsapp.net/ "Highlights App for Mac")は結構良さそうでしたが、やっぱりエディタ部分が何か微妙でした(シンタックスハイライトが欲しい)。
なので、こういう感じで既存のものをちょこっと組み合わせてアプリが作れるようになってきたのは楽しいです。

CSSもReact Componentと同じ名前で名前空間を作ると命名に迷いが減るので書きやすくなった感じがします。
これは[SUIT CSS](http://suitcss.github.io/ "SUIT CSS")を参考にしていて、`MarkdownEditor`というコンポーネントなら、`.MarkdownEditor`というクラスをつけるというシンプルなルールですね。

- [pdf-markdown-annotator/css/components at master · azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator/tree/master/css/components "pdf-markdown-annotator/css/components at master · azu/pdf-markdown-annotator")
- [markdown-finder/docs at master · azu/markdown-finder](https://github.com/azu/markdown-finder/tree/master/docs "markdown-finder/docs at master · azu/markdown-finder")

コンポーネントはあると良いのですが、やはりと言うか[React Components](http://react-components.com/ "React Components")でも使い勝手の問題やメンテされてないものがあったりします。
Markdownのプレビューに[react-remarkable](https://github.com/acdlite/react-remarkable "react-remarkable")を使ったりしましたが、動いてなかったので[修正](https://github.com/acdlite/react-remarkable/pull/3 "Update package.json by azu · Pull Request #3 · acdlite/react-remarkable")を送ったりしてました。

特にReactはまだ0.xなので、semver的な問題でReactに依存するモジュールが"^0.12"だと"0.13"が出た時に修正が必要だったりします.

まあ、こういう問題はReact Componentに限らず起こりえるものなので、UIコンポーネント(DOMに追加するような何か)を提供する人はちゃんと設計する必要があると感じました。

例えば、React以外から使いたくなった時にちゃんと提供できるかとか、この辺はGruntやgulpのtaskでライブラリのコア部分がTask Runnerに依存しない作りにするとかそういうのと似たような話な気がします。

- [Designing Front-End Components](http://ponyfoo.com/articles/designing-front-end-components "Designing Front-End Components")

UIの場合はCSSとか色々あるのでより難しいですが、UIのライフサイクルはCustom Elementの4つのライフサイクルイベントをベースに考えた作りになっていると、React以外のコンポーネントとしても対応しやすくなるじゃないかと思います。

- [Custom Elements: HTML に新しい要素を定義する - HTML5 Rocks](http://www.html5rocks.com/ja/tutorials/webcomponents/customelements/ "Custom Elements: HTML に新しい要素を定義する - HTML5 Rocks")

後、DOMを`<div>`的な何かを追加するのだけがコンポーネントじゃなくて、今回使ったpdf.jsのwebviewerをiframeで埋め込むのも一種のコンポーネントかなと思いました。

複雑なUIならiframeで扱えると意外と楽だったり、iframeなのでカプセル化しやすいです。
また最近だとseamless属性やsandbox属性などもあるので、制御もしやすくなってたり下手にDOM追加で頑張るより安全で見えます。(same originならiframeの`contentWindow`とかも触りにいけるので)

Web Componentsさんは[来そうでまだ来てない](http://www.w3.org/2015/04/24-webapps-minutes.html)ので、その辺は色々想像しながら実装に落としていくのが現状なのかと思います。

- [Web Components における依存ライブラリの断片化とエコシステムのコロニー化 ::ハブろぐ](http://havelog.ayumusato.com/develop/webcomponents/e662-web_components_issues.html "Web Components における依存ライブラリの断片化とエコシステムのコロニー化 ::ハブろぐ")
