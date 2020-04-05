---
title: "JavaScriptやCSSを読み込むローダーライブラリをES Modulesとして読み込む"
author: azu
layout: post
date : 2020-04-05T18:51
category: JavaScript
tags:
    - JavaScript
    - ESModules

---

今どきのnpmパッケージは[UNPKG](https://unpkg.com/)や[Pika CDN](https://www.pika.dev/cdn)を使えば、ES Modulesとして直接`import`文読み込めることがあります。

たとえば[Preact](https://preactjs.com/)なら、次のように[UNPKG](https://unpkg.com/)経由で直接モジュールをインポートできます。

```html
<script type="module">
  import { h, Component, render } from 'https://unpkg.com/preact?module';

  // Create your app
  const app = h('h1', null, 'Hello World!');

  render(app, document.body);
</script>
```


- [Getting Started | Preact: Fast 3kb React alternative with the same ES6 API. Components & Virtual DOM.](https://preactjs.com/guide/v10/getting-started/)

これは、ECMAScript Modulesに対応しているブラウザでしか動きませんが、モダンなブラウザのみ対象のサイトならbundlerなどのツールを使わずにライブラリを気軽に利用できます。([最適化する場合はbundlerを使った方](https://docs.google.com/document/d/1ds9EEkcDGnt-iR8SAN-_7nsOfw7gsMfhZjzZ_QAIyjM/edit)がよさそうですが)

ECMAScriptの`import`文自体については次を参照してください。

- [import - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import)
- [ECMAScriptモジュール · JavaScript Primer #jsprimer](https://jsprimer.net/basic/module/)
    - [Todoアプリ · JavaScript Primer #jsprimer](https://jsprimer.net/use-case/todoapp/)はBundlerやTranspilerを使わずにES Modulesでアプリを作る例です

しかし、この[UNPKG](https://unpkg.com/)や[Pika CDN](https://www.pika.dev/cdn)からすべてのライブラリが直接Importできるわけではありません。
これを行うにはライブラリ側が`package.json`の`module`フィールに対応している必要があります。

- [pkg.module · rollup/rollup Wiki](https://github.com/rollup/rollup/wiki/pkg.module)
- [Authoring Libraries | webpack](https://webpack.js.org/guides/author-libraries/#final-steps)

そのため、ES Modulesに対応してないライブラリ([UMD](https://github.com/umdjs/umd)形式のみ配布するライブラリなど)は、`<script>`タグで読み込んでグローバルに追加されたメソッドを使う必要があります。

また、UIライブラリに含まれるCSSファイルなども[UNPKG](https://unpkg.com/)などから取得はできますが、
ES ModulesではCSSファイルは読み込めないため`link`タグなどを使って読み込む必要があります。

このようにライブラリごとに読み込み方法が異なるため、ES Modulesに対応していないJSやCSSの読み込みをラップする[dynamic-import-assets](https://github.com/azu/dynamic-import-assets)というパッケージを書きました。

## [dynamic-import-assets](https://github.com/azu/dynamic-import-assets)

[dynamic-import-assets](https://github.com/azu/dynamic-import-assets)は、Modulesに対応していないJavaScriptやCSSを読み込むローダーライブラリです。

たとえば、[@evillt/toast](https://toast.evila.me/)というToast UIを提供するライブラリは、`<script>`タグでJavaScriptを読み込み、`<link rel=stylesheet>`でCSSを読み込んでから扱います。

```html
<link rel="stylesheet" href="https://unpkg.com/@evillt/toast/dist/toast.min.css" />
<script src="https://unpkg.com/@evillt/toast"></script>
<script>
  toast.createToast('Hello world')
</script>
```

これを[UNPKG](https://unpkg.com/)と[dynamic-import-assets](https://github.com/azu/dynamic-import-assets)を使えば次のように書けます。

```js
(async function main(){
    const { dynamicImportJS, dynamicImportCSS } = await import("https://unpkg.com/dynamic-import-assets?module");
    await Promise.all([
        // inject <link rel="stylesheet">
        dynamicImportCSS("https://unpkg.com/@evillt/toast/dist/toast.min.css"),
        // inject <script>
        dynamicImportJS("https://unpkg.com/@evillt/toast")
    ]);
    // use toast after loaded 
    toast.createToast("Hello world");
})();
```

既存方法で`<script>`タグや`<link>`タグをHTMLに書いてしまうと、ライブラリが必要ない場合も読み込んでしまします。

[dynamic-import-assets](https://github.com/azu/dynamic-import-assets)ではJavaScriptやCSSのロードをJavaScriptから行うため、
必要なタイミングで動的にライブラリを取得できます。

たとえば、次のように`?show_toast`というクエリがURLに付いてるときのみToast表示をしたい場合は次のように書けます。

```js
(async function main(){
    // ?show_toast
    const showToast = (new URL(location.href)).searchParams.has("show_toast")
    if (!showToast) {
        return;
    }
    const { dynamicImportJS, dynamicImportCSS } = await import("https://unpkg.com/dynamic-import-assets@^1.0.0?module");
    await Promise.all([
        dynamicImportCSS("https://unpkg.com/@evillt/toast@1.1.3/dist/toast.min.css"),
        dynamicImportJS("https://unpkg.com/@evillt/toast@1.1.3")
    ]);
    toast.createToast("Hello world");
})();
```

## おわりに

モダンなブラウザのみが対象なら、ES Modules(`import`文やDynamic Imports)を使って[UNPKG](https://unpkg.com/)や[Pika CDN](https://www.pika.dev/cdn)を使って、
npmに公開されているライブラリを直接読み込めることがあります。

- <https://caniuse.com/#feat=es6-module>
- <https://caniuse.com/#feat=es6-module-dynamic-import>

`<script>`タグで読み込む方法と違ってグローバルに読み込む必要もなくなるため、ちょっとしたサイトでちょっとしたライブラリを使う場合には便利です。

ただし、ES Modules形式で配布していないライブラリやCSSは`<script>`や`<link>`タグまたはDOM APIを使って読み込む必要があります。
これらのライブラリもDynamic Importsと同じように書き方で読み込めるものが欲しかったので[dynamic-import-assets](https://github.com/azu/dynamic-import-assets)を作りました。

- [azu/dynamic-import-assets: Dynamic Import Assets like JavaScript and CSS.](https://github.com/azu/dynamic-import-assets)

逆にライブラリ作者側でES Modules形式で配布したい場合は次のようなビルドツールを使うのが良いかもしれません。

- [developit/microbundle: 📦 Zero-configuration bundler for tiny modules.](https://github.com/developit/microbundle)
- [pikapkg/pack: 📦⚡️ Build your npm package using composable plugins. https://www.pika.dev/blog/introducing-pika-pack/](https://github.com/pikapkg/pack)

この辺がまだこなれたツールがないのも、ES Modules形式で配布しているライブラリが少ない原因かもしれません。