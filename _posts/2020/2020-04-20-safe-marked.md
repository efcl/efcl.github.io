---
title: "markedで安全にMarkdownからHTMLを生成するsafe-marked"
author: azu
layout: post
date : 2020-04-20T21:35
category: JavaScript
tags:
    - JavaScript
    - Markdown
    - HTML

---

MarkdownをHTMLにコンパイルする[marked](https://github.com/markedjs/marked)は[0.7.0](https://github.com/markedjs/marked/releases/tag/v0.7.0)で`sanitize`オプションを非推奨にしています。

これはサニタイズの処理を`marked`から外す目的です。

- [Sanitize and sanitizer · Issue #1232 · markedjs/marked](https://github.com/markedjs/marked/issues/1232)

この`sanitize`オプションの代わりに[DOMPurify](https://github.com/cure53/DOMPurify)を利用することを推奨していますが、
[DOMPurify](https://github.com/cure53/DOMPurify)はブラウザとNode.js両方で使うには癖があるためちょっとややこしいです。

なぜなら[DOMPurify](https://github.com/cure53/DOMPurify)はDOM APIに依存しているため、
Node.jsで動かす場合は[jsdom](https://github.com/jsdom/jsdom)使うためです。

単純に[jsdom](https://github.com/jsdom/jsdom)を使ってしまうとブラウザでも[jsdom](https://github.com/jsdom/jsdom)が含まれてしまい、ファイルサイズが巨大になってしまいます。

[![jsdom file size](https://efcl.info/wp-content/uploads/2020/04/20-1587387187.png)](https://bundlephobia.com/result?p=jsdom@16.2.2)

そのため、ブラウザ向けの場合では直接[DOMPurify](https://github.com/cure53/DOMPurify)を使い、
Node.jsの場合は[DOMPurify](https://github.com/cure53/DOMPurify)と[jsdom](https://github.com/jsdom/jsdom)を一緒に使う実装が必要になります。

この処理をちゃんとやるのは難しいため、[safe-marked](https://github.com/azu/safe-marked)というライブラリを作りました。

## [safe-marked](https://github.com/azu/safe-marked)

[safe-marked](https://github.com/azu/safe-marked)は[marked](https://github.com/markedjs/marked)で変換したHTMLを自動的に[DOMPurify](https://github.com/cure53/DOMPurify)でサニタイズするライブラリです。

この際にブラウザの場合は[DOMPurify](https://github.com/cure53/DOMPurify)を直接使い、
Node.jsの場合は[jsdom](https://github.com/jsdom/jsdom)を使うようにエントリーポイントを分けています。

> Does safe-marked always include jsdom?
> 
> No. safe-marked has two type of entry point.
> https://github.com/azu/safe-marked#does-safe-marked-always-include-jsdom

そのため、利用者は意識せずに必要最小限のライブラリを使えるようになっています。

技術的には`package.json`の`browser`フィールドに対応しているため、webpackなどの`browser`フィールドに対応しているライブラリはこちらのエントリーポイントを扱えるという形です。

- [Resolve | webpack](https://webpack.js.org/configuration/resolve/#resolvemainfields)
- [defunctzombie/package-browser-field-spec: Spec document for the 'browser' field in package.json](https://github.com/defunctzombie/package-browser-field-spec)

使い方は単純で、次のようにMarkdownからサニタイズ済みのHTMLを出力できます。

```js
import { createMarkdown } from "safe-marked";
const markdown = createMarkdown();
const html = markdown(`<script>alert(1)</script>
<iframe src="https://example.com"></iframe>

This is [XSS](javascript:alert(1))`);
// sanitized by default
assert.strictEqual(html, `

<p>This is <a>XSS</a></p>
`);
```

markedとDOMPurifyのオプションもそれぞれ渡せるようになっています。

- `marked`: [marked](https://marked.js.org/#/USING_ADVANCED.md)'s options
- `dompurify`: [DOMPurify](https://github.com/cure53/DOMPurify)'s options

次のように`createMarkdown`に対してそれぞれのオプションを渡せます。

```js
import { createMarkdown } from "safe-marked";
const markdown = createMarkdown({
    // same options for https://marked.js.org/#/USING_ADVANCED.md
    marked: {
        headerIds: false
    },
    // same options for https://github.com/cure53/DOMPurify
    dompurify: {
        ADD_TAGS: ["iframe"]
    }
});
const html = markdown(`# Header

<iframe src="https://example.com"></iframe>
This is [CommonMark](https://commonmark.org/) text.
`);
assert.strictEqual(html, `<h1>Header</h1>
<iframe src="https://example.com"></iframe>
This is [CommonMark](https://commonmark.org/) text.
`);
```

## おわりに

[4月27日に出版されるJavaScript Primer](https://efcl.info/2020/04/14/pre-jsprimer/)では、「[ユースケース: Ajax通信](https://jsprimer.net/use-case/ajaxapp/)」の章の「[HTML文字列をエスケープする](https://jsprimer.net/use-case/ajaxapp/display/#escape-html)」というセクションで次のように書いています。

> 多くのViewライブラリは内部にエスケープ機構を持っていて、動的にHTMLを組み立てるときにはデフォルトでエスケープをしてくれます。 または、エスケープ用のライブラリを利用するケースも多いでしょう。 今回のように独自実装するのは特別なケースで、一般的にはライブラリが提供する機能を使うのがほとんどです。  
> -- https://jsprimer.net/use-case/ajaxapp/display/#escape-html

個人的には、このようなHTML文字列を出力するライブラリはデフォルトがエスケープされている方がいいと思っています。
または、ライブラリ自体にエスケープするプラグインが用意されているなどされているのがいいと思います。

ユーザー入力としてMarkdownを受け付けるサイトの場合は必然的にエスケープやサニタイズの処理が必要になります。
そのため、エスケープの仕方が難しいと単純にエスケープをしないサイトが増えてしまう気がします。

実際に`marked`を使っていて`sanitize`オプションを利用してなかったり、Markdownの変換結果であるHTMLが単純にサニタイズされてないためにXSSが発生してるウェブサービスを何度か見つけて報告しています。

また、ブラウザでも現実的（ファイルサイズや利用数的）に利用できるHTMLのサニタイザーは実質[DOMPurify](https://github.com/cure53/DOMPurify)だけだと思います。

- [dompurify@2.0.8 | BundlePhobia](https://bundlephobia.com/result?p=dompurify@2.0.8)
- [sanitize-html@1.23.0 | BundlePhobia](https://bundlephobia.com/result?p=sanitize-html@1.23.0)
- [insane](https://github.com/bevacqua/insane)はメンテナンスされていない

先ほども書いたように[DOMPurify](https://github.com/cure53/DOMPurify)はブラウザとNode.jsどちらでも使えるようにするのは簡単とはいいにくいです。

[safe-marked](https://github.com/azu/safe-marked)を[作った](https://github.com/markedjs/marked/pull/1519#issuecomment-510062918)[理由](https://github.com/markedjs/marked/issues/1232#issuecomment-616527747)は、それを簡単にするためです。

[safe-marked](https://github.com/azu/safe-marked)は[marked](https://github.com/markedjs/marked)、[DOMPurify](https://github.com/cure53/DOMPurify)、[jsdom](https://github.com/jsdom/jsdom)のラッパーでしかないので、これらの依存を[Renovate](https://renovatebot.com/)で自動的に追従してアップデートできるようにしています。