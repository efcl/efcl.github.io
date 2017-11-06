---
title: "textlintのコアをTypeScriptで書き直した"
author: azu
layout: post
date : 2017-11-06T10:43
category: JavaScript
tags:
    - textlint
    - JavaScript
    - TypeScript

---

[textlint 9.0.0](https://github.com/textlint/textlint/releases/tag/textlint%409.0.0 "textlint 9.0.0")をリリースしました。
textlint 9.0.0では[@textlint/kernel](https://github.com/textlint/textlint/tree/master/packages/textlint-kernel "@textlint/kernel")という内部的に使うコアモジュールをTypeScriptで書き直したバージョンが使われています。

元々textlintはNode.jsで動くように作られたため、`fs`モジュールなどNode.jsに依存しています。
そのため、ブラウザなどで動かす場合などはビルド時に色々工夫しないと動きません。

- [文書校正ツール textlint の Chrome 拡張を作った - もなでぃっく](http://io-monad.hatenablog.com/entry/2016/03/14/225800 "文書校正ツール textlint の Chrome 拡張を作った - もなでぃっく")
- [LocalStorageで誰でも安全にMarkdownでスライドやメモ作れるサービス作ったよ](https://muunyblue.github.io/823b2d10224a6a29f91fc7c0f46f1b8e.html "LocalStorageで誰でも安全にMarkdownでスライドやメモ作れるサービス作ったよ")

この問題をどうにかするためには、`textlint`というモジュールからロジックやLint処理部分だけをNode.jsなどに依存しない純粋なJavaScriptとして切り出す必要があります。

アドホックに対応するならブラウザ向けのbundleを[browser field](https://qiita.com/shinout/items/911e024368e2cb29fd3d "browser field")などで提供すれば終わりですが、長期的なことを考えるとモジュールを分けたほうが建設的です。

[textlint organization](https://github.com/textlint "textlint")を見ると分かるように[textlint][]はMarkdownパーサやトラバーサ、フォーマッターなどがモジュールとして各リポジトリに分けられていました。部品となるモジュールとリポジトリを1対1で分けると、AをアップデートするAに依存BやCを更新するといったアップデートの連鎖反応が起きる問題があります。
また、新しいモジュールを切り出す心理的なコストがありました

そのため、まずは`textlint`を構成するモジュールを一つのリポジトリにまとめたmonorepo化をすることにしました。

## monorepo

[textlint][]では[lerna](https://github.com/lerna/lerna "lerna")を使ってmonorepo化しています。これにより、モジュール間の依存のアップデートが1つのPRにまとめられるなどアップデートの連鎖反応がある程度自動化できるメリットがあります。
また、新しいモジュールを追加するのも単純にディレクトリを切るだけなので心理的なコストは軽減されます。

- [Setup monorepo · Issue #255 · textlint/textlint](https://github.com/textlint/textlint/issues/255)
- [Import * to monorepo · Issue #270 · textlint/textlint](https://github.com/textlint/textlint/issues/270)

一方、CIにかかる時間やpublishする際のコストは増加する傾向はあります。
また、まだmonorepoにおけるリリースノートの戦略がイマイチ決まっていないという問題もあります。
これは[almin](https://github.com/almin/almin "almin")とか[textlint-rule-preset-google](https://github.com/textlint-rule/textlint-rule-preset-google "textlint-rule-preset-google")とか色々monorepoをやっているのでいい方法を見出したいです。

- [Lerna(monorepo)とCHANGELOG(リリースノート) - Qiita](https://qiita.com/azu/items/4b9fc8d4df78f2216901 "Lerna(monorepo)とCHANGELOG(リリースノート) - Qiita")

## [@textlint/kernel][]

monorepo化が済んだので、[textlint 8.1.0](https://github.com/textlint/textlint/releases/tag/textlint%408.1.0 "textlint@8.1.0")で`textlint`モジュールから[@textlint/kernel][]というコアモジュールを切り出しました。(Coreという名前じゃないのは既にCoreという名前を使ったものがあったため)
[@textlint/kernel][]は`fs`などNode.js特有のものに依存してないような作りになっているので普通にwebpackやbrowserifyなどでビルドすれば動作します。

- [Carve out textlint core logic into @textlint/kernel by azu · Pull Request #292 · textlint/textlint](https://github.com/textlint/textlint/pull/292 "Carve out textlint core logic into @textlint/kernel by azu · Pull Request #292 · textlint/textlint")

[textlint 9.0.0](https://github.com/textlint/textlint/releases/tag/textlint%409.0.0 "textlint 9.0.0")ではさらにこの[@textlint/kernel](https://github.com/textlint/textlint/tree/master/packages/textlint-kernel "@textlint/kernel")をTypeScriptに書き換えました。理由としては[@textlint/kernel][]はロジックの塊であることと今後のリファクタリングのしやすさを考えたためです。

- [refactor(textlint-kernel): Convert JavaScript to TypeScript by azu · Pull Request #301 · textlint/textlint](https://github.com/textlint/textlint/pull/301 "refactor(textlint-kernel): Convert JavaScript to TypeScript by azu · Pull Request #301 · textlint/textlint")

> TL;DR: both Flow and TypeScript are pretty good, and conservatively either of them can prevent about 15% of the bugs that end up in committed code.  
> <https://blog.acolyer.org/2017/09/19/to-type-or-not-to-type-quantifying-detectable-bugs-in-javascript/>

JavaScriptに型注釈を加えることで15%程度バグを減らすことができるという話もありますが、IDEなどでリファクタリングがしやすくなるメリットが大きいです。(名前に依存した壊れたリファクタリングが発生しにくい)

JavaScriptからTypeScriptへの移行方法は次の記事で書いてるような手法を取っています。

- [JavaScriptのライブラリを徐々にTypeScriptに移行する | Web Scratch](http://efcl.info/2017/07/17/JavaScript-to-TypeScript/ "JavaScriptのライブラリを徐々にTypeScriptに移行する | Web Scratch")

まだ、TypeScript


[textlint]: https://github.com/textlint "textlint"
[@textlint/kernel]: https://github.com/textlint/textlint/tree/master/packages/textlint-kernel