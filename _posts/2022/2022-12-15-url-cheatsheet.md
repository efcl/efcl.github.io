---
title: "JavaScriptでURLを文字列結合で組み立てないために、url-cheatsheetを作った"
author: azu
layout: post
date : 2022-12-15T21:26
category: JavaScript
tags:
    - JavaScript
    - Security 

---

URLを文字列結合で組み立てると色々問題が起きやすいので、それを避けるために[URL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)や[URLSearchParams()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)でURLを組み立てるパターンをまとめたチートシートを作りました。

- [azu/url-cheatsheet: URL manipulation cheatsheet for JavaScript](https://github.com/azu/url-cheatsheet)

## URLにユーザーが入力した文字列を含めるときは[encodeURIComponent](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)でエスケープする

URLはプレーンな文字列ではなく構造化された文字列(文字の並びに意味がある文字列)として扱わないと、さまざまな問題を抱えやすいです。

たとえば、次のように文字列結合でURLを組み立てると[パストラバーサル](https://www.ipa.go.jp/security/vuln/websecurity-HTML-1_3.html)の問題があります。

```js
// DO NOT
const name = "<user input>"
const url = `https://example.com/user/${name}`;
```

`name` に `../../admin`のような文字列が入ると、`https://example.com/admin`というURLとして解釈されます。
URLの場合は、`../`や`/`などを文字列結合してもoriginは変更できないので、そこまで深刻にはなりにくいですが、サイト上にオープンリダイレクタがあると、別のドメインのURLとして解釈させられるようなケースもあります
URLは、攻撃者が被害者に特定のURLを踏ませることが簡単(DMなどで誘導すればいいだけであるため、短縮URLなどもあり偽装はしやすい)であるため、いろいろな攻撃の開始点となりやすい部分です。

そのため、ユーザー入力を使ってURLを組み立てる場合は、そのユーザー入力は[encodeURIComponent()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)でURLエスケープする必要があります。

```js
// DO
const name = "<user input>"
const url = `https://example.com/user/${encodeURIComponent(name)}`;
```

同じように、URLのパラメータも単純な文字列結合で組み立ててしまうと、任意のパラメータを追加できたり、パラメータの上書きができたりと問題が起きやすいです。
また普通に利用していて、`A&M`などのように特定の記号を正しく検索できないサイトにもなったりします。

```js
// DO NOT
const query = "<user input>"
const url = `https://example.com?q=${query}`;
console.log(url); // => "https://example.com?q=<user input>"
```

このパラメータの問題も同じく、ユーザー入力をパラメータに使う場合は[encodeURIComponent()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)する必要があります。

```js
// DO
const query = "<user input>"
const url = `https://example.com?q=${encodeURIComponent(query)}`;
console.log(url); // => "https://example.com?q=%3Cuser%20input%3E"
```

パラメータに関しては、[URLSearchParams()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)を使うと自動的に各パラメータをURLエスケープしてくれるので安全にパラメータを組み立てできます。

先ほどの例は、[URLSearchParams()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams) を使うと次のように書けます。

```js
const q = "<use input>";
const params = new URLSearchParams({
    q
});
console.log("https://example.com?" + params); // => "https://example.com/?q=%3Cuser%20input%3E
```

## URLを扱うときは[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)と[URLSearchParams()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)を使う

先ほども書いていたように、URLに対して何か処理するときは、URLを構造的なオブジェクトとして扱わないと問題が起きやすいです。
現在のウェブブラウザ/Node.js/Deno/Bun/Cloudflare Workersなどは、[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) APIと[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams) APIというウェブ標準を実装しています。

そのため、URLから特定の部分を取得したい、特定のパラメータを変更したいなどURL処理を行う際には、[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)と[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)を使います。

たとえば、`new URL("https://example.com/path/to/page?q=query&page=1#main")`をしてみると、URL文字列からURLオブジェクトを作成して構造的なURLが見れます。

```js
console.log(new URL("https://example.com/path/to/page?q=query&page=1#main"));
/* URL { 
    href: "https://example.com/path/to/page?q=query&page=1#main",
    origin: "https://example.com",
    protocol: "https:",
    username: "",
    password: "",
    host: "example.com",
    hostname: "example.com",
    port: "",
    pathname: "/path/to/page",
    search: "?q=query&page=1"
    hash: "#main"
    searchParams: URLSearchParams { q → "query", page → "1" }
} */
```

URLを正しくパースするのは至難の技で、URLパーサを脆弱性なしに実装できる人は限られています。
毎年、独自のURLパーサーの脆弱性、URLを単純にreplace/splitで処理したことによる問題がいろいろなところで見つかっています。

- [Incorrect returned href via an '@' sign but no user info and hostname · CVE-2022-0639 · GitHub Advisory Database](https://github.com/advisories/GHSA-8v38-pw62-9cw2)
- [What Bypassing Razer's DOM-based XSS Patch Can Teach Us - EdOverflow](https://edoverflow.com/2022/bypassing-razers-dom-based-xss-filter/)
- [A New Era of SSRF - Exploiting URL Parser in Trending Programming Languages! - us-17-Tsai-A-New-Era-Of-SSRF-Exploiting-URL-Parser-In-Trending-Programming-Languages.pdf](https://www.blackhat.com/docs/us-17/thursday/us-17-Tsai-A-New-Era-Of-SSRF-Exploiting-URL-Parser-In-Trending-Programming-Languages.pdf)

せっかく実行環境にビルトインされててよくテストされた[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)と[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)というAPIがあるので、ぜひこれを使いましょう。

というのが、[url-cheatsheet](https://github.com/azu/url-cheatsheet)を書いた理由です。

いろいろなレシピを書いているので、詳細はリポジトを参照してください。
また、こういうパターンがあるといいとかあったらPull Requestを送ってください。

- [azu/url-cheatsheet: URL manipulation cheatsheet for JavaScript](https://github.com/azu/url-cheatsheet)

一部を抜粋すると次のような逆引きリファレンス的なチートシートになってます。

## Base URL + Path 

[`new URL(pathname, base)`](https://developer.mozilla.org/docs/Web/API/URL/URL)が利用できます。

```js
const base = "https://example.com";
const pathname = "/path/to/page";
const result = new URL(pathname, base);
console.log(result.toString()); // => "https://example.com/path/to/page"
```

`URL`は自動的にパスをエスケープしてくれるわけではないので、ユーザー入力を含む場合は必ず`encodeURIComponent`でエスケープする必要があります。

```js
const base = "https://example.com/";
const name = "<user input>"
const result = new URL(`/user/${encodeURIComponent(name)}`, base);
console.log(result.toString()); // => "https://example.com/user/%3Cuser%20input%3E"
```

## Get parameter from URL

Use [`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL) and [URLSearchParams#get](https://developer.mozilla.org/docs/Web/API/URLSearchParams/get)

解説: `URL`でパースすると自動的に`searchParams`というプロパティにパラメーターをパースしたものが含まれます。

```js
const inputURL = "https://example.com/?q=query&page=1";
const url = new URL(inputURL);
const q = url.searchParams.get("q");
console.log(q); // => "query"
```

## Get multiple parameters as array from URL

Use [`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL) and [URLSearchParams#getAll](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll)

解説: 同じパラメータ名を複数指定した場合は、`get`ではなく`getAll`でまとめて取得できます。

```js
const inputURL = "https://example.com/?q=query&lang=en_US&lang=ja_JP";
const url = new URL(inputURL);
const langs = url.searchParams.getAll("lang");
console.log(langs); // ["en_US", "ja_JP"]
```

## Add parameters to URL

Use [URLSearchParams](https://developer.mozilla.org/docs/Web/API/URLSearchParams)

解説： URLSearchParamsのオブジェクトは`toString()`すると、自動的にパラメータの文字列となります。

```js
const q = "query";
const page = 1;
const base = "https://example.com";
const url = new URL(base);
const params = new URLSearchParams({
    q,
    page
});
console.log(url + "?" + params); // => "https://example.com/?q=query&page=1"
```

or 

```js
const q = "query";
const page = 1;
const base = "https://example.com";
const url = new URL(base);
url.search = new URLSearchParams({
    q,
    page
});
console.log(url.toString()); // => "https://example.com/?q=query&page=1"
```

:memo: `URLSearchParams` escape each parameter automtically.

```js
const q = "<user input>";
const page = 1;
const base = "https://example.com";
const url = new URL(base);
url.search = new URLSearchParams({
    q,
    page
});
console.log(url.toString()); // => "https://example.com/?q=%3Cuser+input%3E&page=1"
```

## Update parameter of URL

Use [`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL)'s [`searchParams`](https://developer.mozilla.org/docs/Web/API/URL/searchParams) property.

```js
const inputURL = "https://example.com/?q=query&page=1";
const url = new URL(inputURL);
url.searchParams.set("q", "update");
console.log(url.toString()); // => "https://example.com/?q=update&page=1"
```

## Remove parameter from URL

Use [`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL) and [URLSearchParams](https://developer.mozilla.org/docs/Web/API/URLSearchParams)

```js
const inputURL = "https://example.com/?q=query&page=1";
const url = new URL(inputURL);
url.searchParams.delete("q");
console.log(url.toString()); // => "https://example.com/?page=1"
```

## Filter parameters

Allow only `a` and `d` parameters.

解説: `searchParams`はIteratorなので、`Array.from(searchParams)`すると `[key, value]` の配列へと変換できます。あとはフィルター指定して結果から新しいsearchParamsを作成しています。

```js
const base = "https://example.com/?a=1&b=2&c=3&d=4";
const url = new URL(base);
const allowedParameterNames = ["a", "d"];
url.search = new URLSearchParams(Array.from(url.searchParams).filter(([key, value]) => {
  return allowedParameterNames.includes(key);
}));
console.log(url.toString()); // => "https://example.com/?a=1&d=4"
```

## Validate URL

[`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL) throw an error when parsing invalid url string.

解説: `new URL` はパースできないURL文字列が渡された場合は、例外を投げます。例外を投げるかでURLとしてvalidなのかが判定できます。

- Related: [Secure JavaScript URL validation | Snyk](https://snyk.io/blog/secure-javascript-url-validation/)

```js
const isValidURL = (urlString) => {
  try {
    new URL(urlString); // if `urlString` is invalid, throw an erorr
    return true;
  } catch {
    return false;
  }
};
console.log(isValidURL("https://example.com")); // => true
console.log(isValidURL("https/example.com")); // => false
```

---

## おわりに

[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)と[URLSearchParams()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)は便利です。
大部分のケースでは、URLを文字列結合や文字列置換で処理してる部分があったら置き換えると思います。

特にパラメータは[URLSearchParams()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)の方が、安全で分かりやすいコードになるはずなので、文字列処理でやる必要がほぼありません。
(同様のことをするものとしてNode.jsの`querystring`や[qs](https://www.npmjs.com/package/qs)がありますが、ほとんどの人は[URLSearchParams()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)で十分だと思います。)

[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)と[URLSearchParams()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)を使うとき使い方を参照できるものが欲しくて、URLチートシートを作りました。
もっといいレシピがあったら、是非Pull Requestを送ってください。

- [azu/url-cheatsheet: URL manipulation cheatsheet for JavaScript](https://github.com/azu/url-cheatsheet)

また、このリポジトリのサンプルコードはCIでテストしていて、そのテストには[power-doctest](https://github.com/azu/power-doctest)というツールを使っています。
[power-doctest](https://github.com/azu/power-doctest)は、MarkdownやAsciidocの中のコードブロックのコードを評価して、`console.log(a); // => 結果`がコメント通りになるかを自動テストできるツールです。

- [MarkdownやAsciidoc中に書いたJavaScriptのサンプルコードをdoctestするツールを作った | Web Scratch](https://efcl.info/2019/09/02/power-doctest-markdown-asciidoc/)
- [azu/power-doctest: JavaScript Doctest for JavaScript, Markdown and Asciidoc.](https://github.com/azu/power-doctest)

[JavaScript Primer - 迷わないための入門書 #jsprimer](https://jsprimer.net/)でもこの仕組みを使って、ほとんど全てのサンプルコードはテストされています。

- [js-primer/CONTRIBUTING.md at master · asciidwango/js-primer](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md#doctest)

この記事のようなURLやパスを文字列としてそのまま扱うと問題が起きるという話は、jsprimerでも書いていました。

- [文字列 · JavaScript Primer #jsprimer](https://jsprimer.net/basic/string/)
