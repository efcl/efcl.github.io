---
title: "textlint 12リリース、ブラウザで動くtextlint editorをベータリリース"
author: azu
layout: post
date : 2021-05-27T06:51
category: textlint
tags:
    - textlin
    - JavaScript

---

日本語などの文章を校正できるルールをもっているLintツールである[textlint](https://github.com/textlint/textlint) v12をリリースしました。
Markdownプラグインのアップデートと各パッケージのバージョン統一が主な変更となります。

リリースノートは次のページにも書いているので、興味がある人は見てください。

- [textlint v12.0.0 · textlint](https://textlint.github.io/blog/2021/05/24/textlint-12.html)

簡単に変更のサマリを書いておきます。

**textlint利用者向けの変更点**

次のコマンドでtextlint 12へアップデートできます。

    npm install textlint@12
    # or
    yarn install textlint@12

textlintは、文章の構文を認識してLintすることで誤検知を減らしています。
たとえば、MarkdownのCodeBlockの中のコードを単純にスペルチェックしてしまうと赤線だらけになってしまいます。
textlintの各ルールには、CodeBlockの中はチェックしないといったように、各ルールごとに文章のどの構文（リンクやテキスト、リスト、コードなど）を対象にチェックするかといった実装を含んでいます。

この構文を認識するために、textlintでは各ファイルフォーマットごとにプラグインが用意してあって、ビルトインではテキストとMarkdownが含まれています。
外部のプラグインとして[HTML](https://github.com/textlint/textlint-plugin-html)、[Re:VIEW](https://github.com/orangain/textlint-plugin-review)、[LaTeX2](https://github.com/textlint/textlint-plugin-latex2e)などがあります。

textlint 12ではこのビルトインで含まれていているMarkdownプラグインが大きく変更されています。
内部的に使っているMarkdownのパーサが大きく変わっています。

- [feat(markdown-to-ast): update to remark-parse@9 by azu · Pull Request #767 · textlint/textlint](https://github.com/textlint/textlint/pull/767)
- [Release 13.0.0 (micromark) · remarkjs/remark](https://github.com/remarkjs/remark/releases/tag/13.0.0)

このアップデートで、今まで上手く認識できていなかった箇所も認識されるようにある場合があります。
その場合は、文章を変更してなくても新しいエラーが見つかるようになるかもしれません。（メジャーアップデートの主な理由です）

また、textlint 12からNode.js 12以上が必須となっています。
Node.js 10以下はサポートが終了しているので、Node.js 12、14、16などへアップデートしてください。

- [Download | Node.js](https://nodejs.org/en/download/)

**textlintのルールを作っている人向けの変更点**

`textlint-tester`と`textlint-scripts`がアップデートされて、どちらも`12`となっています。

[create-textlint-rule](https://github.com/textlint/create-textlint-rule)のコマンド経由でルールを作ってる人は次のテンプレートが使われていると思います。

- [textlint/textlint-rule-template-ts: TEMPLATE repository for textlint rule that is written by TypeScript](https://github.com/textlint/textlint-rule-template-ts)
- [textlint/textlint-rule-template: This is TEMPLATE REPOSITORY for creating textlint rule.](https://github.com/textlint/textlint-rule-template)

この場合は、次のコマンドで`textlint-tester`と`textlint-scripts`をそれぞれアップデートしてください。

```
npm install textlint-scripts@12 textlint-tester@12 --save-dev
# or
yarn install textlint-scripts@12 textlint-tester@12 --dev
```

基本的に機能的な変更はありませんが、`textlint-tester@12`では、ES Modulesの `export default` でエクスポートするようになりました。
そのため、使う側も `import TextLintTester from "textlint-tester"` でインポートする必要があります。

次のように `require` で書いている場合は、`import`に変更してみてください。

```diff
- const TextLintTester = require("textlint-tester");
+ import TextLintTester from "textlint-tester";
```

実際の変更例は、次のPRが参考になると思います。

- [Update textlint-scripts and textlint-tester by massongit · Pull Request #8 · textlint-ja/textlint-rule-no-insert-dropping-sa](https://github.com/textlint-ja/textlint-rule-no-insert-dropping-sa/pull/8)
- [Update textlint-scripts and textlint-tester by massongit · Pull Request #5 · textlint-rule/textlint-rule-no-unmatched-pair](https://github.com/textlint-rule/textlint-rule-no-unmatched-pair/pull/5)

何かtextlintのルールを書いてみたい！という人がいたら、次のIssueにルールのアイデアが溜まっているので実装してみると良いかもしれません。
Issueや[textlint-ja/textlint-ja - Gitter](https://gitter.im/textlint-ja/textlint-ja)とかで相談してみてください。

- [Issues · textlint-ja/textlint-ja](https://github.com/textlint-ja/textlint-ja/issues?q=is%3Aissue+is%3Aopen+label%3A%22Status%3A+Proposal%22)

先ほども書いていたように、MarkdownのパーサがアップデートされたことでTxtASTの`value`が微妙に変わっていることがあります。

- [TxtAST Interface · textlint](https://textlint.github.io/docs/txtnode.html)

基本的にはあまり影響ないはずですが、[CommonMark](https://commonmark.org/)の仕様で、パラグラフの前後にスペースがある場合に、
`Str` の `value`にはそのスペースが含まれなくなっています。

なので、文章の先頭や末尾のスペースを `Str` nodeで扱う場合には工夫が必要になります。(親である`Paragraph` nodeの方を見るなどが必要)

[![Markdown AST](https://efcl.info/wp-content/uploads/2021/05/27-1622067768.png)](https://textlint.github.io/astexplorer/#/snippet/woXCqHBhcnNlcklEwrN0ZXh0bGludDp0xI0tdG8tYXN0wqjEhXR0xJBnc8KBxIrEjMSOxJDEksSUdMSWxJjEmnTDgMKodsSGc2lvbsSjxKXEjcSPxJHEk8SVxJfEmcSbwqYxMi4wxYXCqGZpbGVuYW1lwrBzb3VyY2UudW5kZcWJbmVkwqRjb8Wbw5kiICDDpcKJwo3DpcK-wozDo8KBwqvDo8KCwrnDo8KDwprFtcK8xbLFtMKBxa7CgcKCxbLCi8Wn})

また、このアップデートにあわせて AST explorer もアップデートしています。
URLで保存もできるようになってるので、プラグイン周りのバグレポートなどにも利用出来ます。

- [textlint AST explorer](https://textlint.github.io/astexplorer/)

textlint 12では、プラグインが生成するASTが[TxtAST Interface](https://textlint.github.io/docs/txtnode.html)としてvalidかを判定する`@textlint/ast-tester`もアップデートしています。
エラーメッセージがわかりやすくなっているので、新しいファイルフォーマットのプラグインを作る場合には利用してください。

- [feat(ast-tester): improve error message by azu · Pull Request #783 · textlint/textlint](https://github.com/textlint/textlint/pull/783)
- [Plugin · textlint](https://textlint.github.io/docs/plugin.html)

使われているプラグイン周りは、メンテナは複数人いた方がいいので関連するIssueをいくつか立てています。

- [Looking for new maintainer · Issue #21 · textlint/textlint-plugin-html](https://github.com/textlint/textlint-plugin-html/issues/21)
- [improve collaboration · Issue #20 · seikichi/textlint-plugin-asciidoctor](https://github.com/seikichi/textlint-plugin-asciidoctor/issues/20)

textlintの日本語のGitterでも話したりしているので、プラグインのメンテナンスに興味がある人は来てみてください。

- [textlint-ja/textlint-ja - Gitter](https://gitter.im/textlint-ja/textlint-ja)

基本的には textlint orgとかに移管して複数人でメンテナンスできる状態にするのが健全なのかなと思っています。

**内部的な変更点**

[textlint/textlint: The pluggable natural language linter for text and markdown.](https://github.com/textlint/textlint)はmonorepoですが、今まで各パッケージのバージョンはIndependent(それぞれバラバラ)にしていました。

- [lernaでのmonorepoにおけるリリースフロー(Fixed/Independent) | Web Scratch](https://efcl.info/2019/01/26/monorepo-release-flow/)

一つのプロダクトを扱うmonorepoでバージョンがバラバラだとやっぱりわかりにくくあつかいにくいので、textlint 12ですべてのパッケージのバージョンを`12.0.0`へと統一しました。

<table>
<thead>
<tr>
<th>Breaking Changes</th>
<th>Package</th>
<th>Previous version</th>
<th>Current version</th>
</tr>
</thead>
<tbody>
<tr>
<td>✔</td>
<td>textlint</td>
<td>11.9.1</td>
<td>12.0.0</td>
</tr>
<tr>
<td>✔</td>
<td>textlint-tester</td>
<td>5.3.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td>✔</td>
<td>textlint-scripts</td>
<td>3.0.0</td>
<td>12.0.0</td>
</tr>
<tr>
<td>　</td>
<td>@textlint/ast-node-types</td>
<td>4.4.3</td>
<td>12.0.0</td>
</tr>
<tr>
<td>　</td>
<td>@textlint/ast-traverse</td>
<td>2.3.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td>　</td>
<td>@textlint/ast-tester</td>
<td>2.3.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td>　</td>
<td>@textlint/feature-flag</td>
<td>3.3.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td>　</td>
<td>@textlint/fixer-formatter</td>
<td>3.3.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td></td>
<td>@textlint/kernel</td>
<td>3.4.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td>　</td>
<td>@textlint/linter-formatter</td>
<td>3.3.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td>　</td>
<td>@textlint/module-interop</td>
<td>1.2.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td>✔</td>
<td>@textlint/textlint-plugin-markdown</td>
<td>5.3.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td>　</td>
<td>@textlint/textlint-plugin-text</td>
<td>4.3.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td>✔</td>
<td>@textlint/types</td>
<td>1.5.5</td>
<td>12.0.0</td>
</tr>
<tr>
<td></td>
<td>@textlint/utils</td>
<td>1.2.5</td>
<td>12.0.0</td>
</tr>
</tbody>
</table>


この過程で`textlint-scripts`もmonorepoへ追加しました。

## textlint editorのベータリリース

ブラウザ拡張としてtextlintを任意のサイトで動かせる[@textlint/editor](https://github.com/textlint/editor)をベータリリースしています。

- [textlint editor - Firefox](https://addons.mozilla.org/firefox/addon/textlint-editor/)
- [textlint editor - Chrome](https://chrome.google.com/webstore/detail/textlint-editor/gfhlfpnpjokocfohicmfbgjneiipfeil)

textlint editorの目的は次の記事やスライドで話しています。

- [textlint editor - ブラウザでも動くPrivacy Firstの文章校正ツールを作る話](https://azu.github.io/slide/2020/textlint-editor/textlint-editor.html)
- [サーバにデータを送る必要がない文章の校正ツール、スペルチェッカーを作っている | Web Scratch](https://efcl.info/2020/07/31/textlint-editor-pre/)

textlint editorはテキストエリア上で赤線を出して修正したりするWordとかgrammarlyみたいな感じのものです。
自分のtextlintの設定を使えるようにしているので、カスタマイズ性は維持しています。

CIとかコマンドラインで継続的に回してチェックとして使う[textlint](https://github.com/textlint/textlint)と違って、
エディタなら必ずエラーを直さなくても良くて無視するという選択もある気がします。
そのため、日本語向けみたいな安易なプリセットを用意しておくのが良いのかなとか思ったりしています。

また、ベータなので[@textlint/editor](https://github.com/textlint/editor)にバグレポートやドキュメントのPRとか待っています。

あとブラウザ拡張として動くということは、普通に[textlint](https://github.com/textlint/textlint)がブラウザで動くということです。
[textchecker-element](https://github.com/textlint/editor/tree/master/packages/textchecker-element)という汎用的なtextareaにオーバーレイする仕組みと、[@textlint/script-compiler](https://github.com/textlint/editor/tree/master/packages/%40textlint/script-compiler)というtextlintと設定をWeb Workersとしてコンパイルするツールを作っています。

まだAPIとかは安定してないので変わると思いますが、普通にウェブサービスとかにもtextlintを簡単に組み込んだりできるようになる気がするので、
この辺どういうものがあるといいとかのアイデアをください。

📝

## Thanks to Support!

最近、[VELC（ヴェルク）](https://github.com/Velc)さんが[Open Source Sponsor](https://github.com/sponsors/azu)になってくれたりしました。

- [会社（ヴェルク）としてGithub Sponsorsになりました - ヴェルク - IT起業の記録](https://tamukai.blog.velc.jp/entry/2021/05/18/091040) (Japanese blog)

他にも70名以上の人が[GitHub Sponsors](https://github.com/sponsors/azu)になってくれています。
あらためてありがとうございます！

自分のGitHub Sponsorsのページは <https://github.com/sponsors/azu> です。
興味がある人は見てください。

<iframe src="https://github.com/sponsors/azu/card" title="Sponsor azu" height="225" width="600" style="border: 0;"></iframe>