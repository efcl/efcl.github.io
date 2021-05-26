---
title: "サーバにデータを送る必要がない文章の校正ツール、スペルチェッカーを作っている"
author: azu
layout: post
date : 2020-07-31T22:07
category: JavaScript
tags:
    - textlint

---

[textlint editor](https://github.com/textlint/editor)というブラウザ/ブラウザ拡張上で動く[textlint](https://github.com/textlint/textlint)を動かすプロジェクトを最近やっています。

追記: FirefoxとChrome拡張をそれぞれ公開しています。

- [textlint editor - Firefox](https://addons.mozilla.org/firefox/addon/textlint-editor/)
- [textlint editor - Chrome](https://chrome.google.com/webstore/detail/textlint-editor/gfhlfpnpjokocfohicmfbgjneiipfeil)


<blockquote class="twitter-tweet"><p lang="es" dir="ltr">textlint editor demo<a href="https://t.co/cOdR3MKWFn">https://t.co/cOdR3MKWFn</a> <a href="https://t.co/b2lqpqKUTl">pic.twitter.com/b2lqpqKUTl</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1288038759192174593?ref_src=twsrc%5Etfw">July 28, 2020</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

[Grammarly](https://grammarly.com/)や[Microsoft エディター](https://www.microsoft.com/ja-jp/microsoft-365/microsoft-editor)などブラウザ拡張としていろいろなサイトで使えるよくできたスペルチェッカーはあるのですが、どちらも入力したテキストをサーバに送ってそのチェック結果を返す方式になっています。
[textlint](https://github.com/textlint/textlint)ならJavaScriptで書かれているので、サーバにデータを送らずにブラウザ内で全ての処理ができるのではと思って[textlint editor](https://github.com/textlint/editor)を作り始めました。

詳しい経緯は次のスライドで話しています。

[![textlint editor - ブラウザでも動くPrivacy Firstの文章校正ツールを作る話](https://efcl.info/wp-content/uploads/2020/07/31-1596200847.png)](https://azu.github.io/slide/2020/textlint-editor/textlint-editor.html)

> [textlint editor - ブラウザでも動くPrivacy Firstの文章校正ツールを作る話](https://azu.github.io/slide/2020/textlint-editor/textlint-editor.html)

[textlint editor](https://github.com/textlint/editor)はまだブラウザやブラウザ拡張として動くようになったα段階です。
現時点のtextlint editorは次のURLから試せます。

- <https://textlint-editor.netlify.app/>

仕組み的には[@textlint/compiler](https://github.com/textlint/editor/tree/master/packages/%40textlint/compiler)でtextlintとtextlintのルールをまとめたbundleファイルを作成して、ウェブサイトや拡張からそれを利用する形です。
この仕組みが上手くいけば、ウェブサイトやアプリとかにtextlintを埋め込むのが結構楽にできたりするんじゃないかと思っています。

![textlint editor](https://raw.githubusercontent.com/textlint/editor/master/docs/resources/textlint_editor.png)

また実用するには解決しない問題があるのでコラボレータを募集しています。

- [Welcome to collaborator! · Issue #4 · textlint/editor](https://github.com/textlint/editor/issues/4)

[CodeSandbox](https://codesandbox.io/)で[コンパイラを動かした](https://github.com/textlint/editor/issues/9)かったり、[スクロールやリサイズでアノテーションの再描画](https://github.com/textlint/editor/issues/7)したり、[アノテーション表示のパフォーマンスを改善](https://github.com/textlint/editor/issues/2)したり、[テストを書いたり](https://github.com/textlint/editor/issues/11)しないといけません。

また、ブラウザ拡張で[コンパイル済みのtextlintを動的に切り替える仕組み](https://github.com/textlint/editor/issues/4#issuecomment-665423614)も考えないと行けないので、Chrome拡張とかに詳しい人も募集しています。

後は、[textlint-rule-prh](https://github.com/textlint-rule/textlint-rule-prh)みたいなのはそのままだと動かないので、[proofdict](https://github.com/proofdict)みたいな同等の機能をもつ何かが必要な気がしています。

まずはブラウザ拡張(Firefox, Chrome系)で動くようにして`<textarea>`に対してtextlintを動かすというところを目標にしています。
興味がある人はリポジトリを見てみてください。

- [Welcome to collaborator! · Issue #4 · textlint/editor](https://github.com/textlint/editor/issues/4#issuecomment-665423614)
