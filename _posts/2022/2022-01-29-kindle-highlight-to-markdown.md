---
title: "KindleのメモとハイライトをMarkdownにするJavaScriptライブラリを書いた"
author: azu
layout: post
date : 2022-01-29T14:54
category: JavaScript
tags:
    - JavaScript
    - Kindle

---

Kindleでハイライトつけた内容は[Kindle: メモとハイライト](https://read.amazon.co.jp/notebook)で閲覧できます。
このページの内容をMarkdownに変換してコピーするためのライブラリを書きました。

- [azu/kindle-highlight-to-markdown: Convert Your Kindle highlight & Note to Markdown/JSON](https://github.com/azu/kindle-highlight-to-markdown)

## 使い方

1. コピーしたい本を[Kindle: メモとハイライト](https://read.amazon.co.jp/notebook)で開きます
2. ブラウザの開発者ツールの"コンソール"を開きます
  - Firefox: [ウェブコンソール - 開発ツール | MDN](https://developer.mozilla.org/ja/docs/Tools/Web_Console#opening_the_web_console)
  - Chrome: [Console overview - Chrome Developers](https://developer.chrome.com/docs/devtools/console/)
3. 次のコードを実行するとクリップボードにコピーできます


```js
const { parsePage, toMarkdown } = await import('https://cdn.skypack.dev/kindle-highlight-to-markdown');
const result = parsePage(window); // JSON Object
const markdown = toMarkdown(result); // Markdown
copy(markdown);
```

ただのnpmに公開しているJavaScriptライブラリになっています。
DOMの中身を見てJSONにして、それをMarkdownに変換してるだけです。
仕様が変わると壊れると思うので、壊れてたらIssueかPRをください。

- [azu/kindle-highlight-to-markdown: Convert Your Kindle highlight & Note to Markdown/JSON](https://github.com/azu/kindle-highlight-to-markdown)

