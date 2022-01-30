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

**ブックマークレット版**: <a href="javascript:(function()%7B(async%20function()%7B%0Aconst%20%7B%20parsePage%2C%20toMarkdown%20%7D%20%3D%20await%20import('https%3A%2F%2Fcdn.skypack.dev%2Fkindle-highlight-to-markdown')%3B%0Aconst%20result%20%3D%20parsePage(window)%3B%20%2F%2F%20JSON%20Object%0Aconst%20markdown%20%3D%20toMarkdown(result)%3B%20%2F%2F%20Markdown%0Aawait%20navigator.clipboard.writeText(markdown)%3B%0A%7D)()%3B%7D)()%3B">kindle-highlight-to-markdown</a>


ただのnpmに公開しているJavaScriptライブラリになっています。
DOMの中身を見てJSONにして、それをMarkdownに変換してるだけです。
仕様が変わると壊れると思うので、壊れてたらIssueかPRをください。

- [azu/kindle-highlight-to-markdown: Convert Your Kindle highlight & Note to Markdown/JSON](https://github.com/azu/kindle-highlight-to-markdown)

モバイル端末とかでKindle読んで、ハイライトを回収したいことがあったので書きました。
macOSとかのPCならスクリーンショットベースでメモを取ったりしてることが多いです。

- [スクリーンショットドリブンのメモアプリ mumemo を作った | Web Scratch](https://efcl.info/2021/05/06/mumemo/)

## メモ `kindle://` protocol

macOSでは`kindle://` というprotocolが予約されていて、次のパラメータで書籍の任意の場所を開けます。

```
kindle://book?action=open&asin=${asinValue}&location=${locationNumber}
```

この`kindle://`みたいな未知のProtocolはGitHub Markdownだとリンクになりません。(`javascript:`とかのXSSを防ぐための処置だと思います)

そのため、次のようなCloudflare WorkerでProxyを書いて、`https://xxx.workers.dev/book?action=open&asin=${asinValue}&location=${locationNumber}` を `kindle://` にリダイレクトしています。
これで、GitHub Markdownなど`kindle://`がサニタイズされる場所からも、Kindleのページをリンクできます。

```js
const statusCode = 301

async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname, search } = url;
  const destinationURL = "kindle://" + pathname + search;
  return Response.redirect(destinationURL, statusCode);
}

addEventListener("fetch", async event => {
  event.respondWith(handleRequest(event.request))
})
```
