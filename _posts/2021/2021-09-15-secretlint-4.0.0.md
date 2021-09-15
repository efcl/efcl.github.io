---
title: "🛡🔑 Secretlint 4.0.0: ESMで書かれたルールのサポート、secretlint-disableコメントのサポート"
author: azu
layout: post
date : 2021-09-15T22:02
category: security
tags:
    - secretlint
    - JavaScript
    - Node.js

---

[secretlint](https://github.com/secretlint/secretlint) 4.0.0をリリースしました。
[secretlint](https://github.com/secretlint/secretlint)はSSH private key, GCP Access token, AWS Access Token, Slack Token, npm auth tokenなどの機密情報のコミットを防いだり、ブラウザ拡張として動かしてサイト上に意図せず露出してしまっている情報を見つけるツールです。

- [見ているサイト上に露出している機密情報(APIトークン、IPアドレスなど)を見つけるブラウザ拡張を作りました | Web Scratch](https://efcl.info/2021/08/19/secretlint-webextension/)

ESLintのようにプラグイン構造を持っていて、ルールなどを自由に追加、実装できます。
ルールを追加したい場合は、次のドキュメントと、TypeScriptの型定義が`@secretlint/types`で利用できるのでそれを参考にしてください。

- [secretlint/secretlint-rule.md at master · secretlint/secretlint](https://github.com/secretlint/secretlint/blob/master/docs/secretlint-rule.md)

今回のメジャーアップデートでは、このルールをNode.js 12+からネイティブでサポートされたECMAScript Modules(ESM)でかけるようになりました。
また、`// secrelint-disable`のようにコメントでLint結果を無視できるようになっています。

## 追加された機能

### ESM rule support [#187](https://github.com/secretlint/secretlint/pull/187)

SecretlintをESM(ECMAScript modules)として書いたものを読み込めるようになりました。
今までは、CommonJSに変換したものしか読み込めていませんでしたが、4.0.0からは`export`をそのまま使ったモジュールも読み込めます。

ルールの作り方については次のドキュメントを参照してください。

- https://github.com/secretlint/secretlint/blob/master/docs/secretlint-rule.md

今回の対応は、Secretlint本体をESMで書き直したのではなく、プラグインとなるルールを読み込むロジックを変更することで対応しています。

- [feat(config-loader): support a rule written by ESM by azu · Pull Request #187 · secretlint/secretlint](https://github.com/secretlint/secretlint/pull/187)

つまり、CommonJSからESMを読み込む方法を実装していて、具体的には`import()`を使うとCommonJSからESMを読み込めます。
しかし、現状のTypeScriptとNode.jsだと、このDynamic Importはいろいろな問題があります。

例えば、つぎのように`cjs`(CommonJS)と`mjs`(ESM)のファイルを用意します。
`export_transpiled.cjs`は、BabelやTypeScriptなどで`export default 1;`を変換したものです。

```
❯ cat export.cjs
module.exports = 1;

❯ cat export.mjs
export default 1;

❯ cat export_transpiled.cjs
Object.defineProperty(exports, '__esModule', { value: true })
module.exports.default = 1;
```

これを、`index.cjs`(CommonJS)からDynamic Importを使って読み込んでみると次のような結果になります。

```js
import("./export.cjs").then(cjs => {
    console.log("cjs", cjs);
});
import("./export_transpiled.cjs").then(cjs => {
    console.log("cjs_transpiled", cjs);
});
import("./export.mjs").then(mjs => {
    console.log("mjs", mjs);
});

/*
mjs [Module: null prototype] { default: 1 }
cjs [Module: null prototype] { default: 1 }
cjs_transpiled [Module: null prototype] { __esModule: true, default: { default: 1 } }
*/
```

BabelやTypeScriptなどが使う`__esModule`のinteropはNode.jsのネイティブESMでは機能していないことがわかります。
この`export default 1;`のようにdefault exportされた値を取り出すには、次のような気持ち悪いコードが必要になります。

```js
const mod = await import("./export_transpiled.cjs");
console.log(mod.default.default); // => export defaultされた値
```

Secretlintでは、読み込まれる側のモジュール = Secretlintルールをどう書くのかは、ユーザーによって異なるので制御できません。
このinteropの問題がずっと起きると大変なので、Secretlintルールでは`export default`ではなく、`export { creator }` のようなnamed exportを使うように変更しました。

named exportなら、`.default.default`のようなtranspileされたコード/素のCommonJS/Native ESMでの扱い方にそこまで差がでないためです。

具体的には次のIssueにまとめてあります。

- [use `export cosnt creator` instead of `export default` · Issue #190 · secretlint/secretlint](https://github.com/secretlint/secretlint/issues/190)

また、TypeScript 4.4では、`module: CommonJS`の場合に`import()`が勝手に`require()`へと変換されてしまう問題があります。
これを回避するためには、eval的なコードを使って`import()`を評価する必要があります。

```js
 const _importDynamic = new Function("modulePath", "return import(modulePath)"); 
```

これについては次期TypeScriptで改善される予定です。

- [Add flag to not transpile dynamic `import()` when module is `CommonJS` · Issue #43329 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/issues/43329)
- [Initial support for module: node12 by weswigham · Pull Request #44501 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/pull/44501)
- [Use native dynamic import() · Issue #197 · secretlint/secretlint](https://github.com/secretlint/secretlint/issues/197)

TypeScriptでNative ESM対応はハマりどころが大変多いので、安定するまでにはも少し掛かりそうです。

### Support `secretlint-disable` directive [#195](https://github.com/secretlint/secretlint/pull/195)

[@secretlint/secretlint-rule-filter-comments](https://www.npmjs.com/package/@secretlint/secretlint-rule-filter-comments)というルールを追加して `// secretlint-disable` のようなコメントでのSecretlintを無効化/有効化できるようになりました。

このルールは[@secretlint/secretlint-rule-preset-recommend](https://www.npmjs.com/package/@secretlint/secretlint-rule-preset-recommend)に含まれているので、あまり意識せずに次のようにコメントで特定の行だけ、エラーを無視できるようになっています。

```
// secretlint-disable -- disable all rules

THIS IS SECRET A
THIS IS SECRET B
THIS IS SECRET C

// secretlint-enable -- enable again

// secretlint-disable-next-line @secretlint/secretlint-rule-secret-alphabet -- disable specific rule in next line
THIS IS SECRET D
THIS IS SECRET E // secretlint-disable-line -- disable current line
```

Secretlintでは`//`のようなコメントの記号かどうかは特に見ていないので、bashなら`# secretlint-disable`のように書いても機能します。

```bash
# secretlint-disable-next-line
echo "THIS IS SECRET, BUT IT WILL BE IGNORED"
```

詳しくは<https://github.com/secretlint/secretlint/blob/master/docs/configuration.md>を参照してください。

📝　Secretlintではこのような無視コメントもルールとして実装しています。
具体的には`context.ignore()`というAPIが用意されていて、これを扱うルールを書く形で実装しています。
特定のルールが特定のパターンを無視したいというケースも、ルール内に実装できる柔軟性を作っています。

コードは次の箇所にあります。

- [@secretlint/secretlint-rule-filter-comments](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-filter-comments)

## Breaking Changes

### use `export const creator` instead of `export default` [#190](https://github.com/secretlint/secretlint/issues/190)

先ほども書いていた、Dynamic ImportでTranspileされてCommonJSを読み込む際に`export default`が大変扱いにくい問題です。
これをどうにかするために、Secretlintではルールでdefault exportを扱うのをやめて、named exportに変更しました。

幸いまだサードパーティルールはほぼないはずなので影響はないと思います。

もし、自分でSecretlintのルールを作っている場合は、exportする部分を次のように変更してください。

```diff
- export default creator;
+ export { creator }
```

### Require Node.js 12 and update `engines` [#193](https://github.com/secretlint/secretlint/pull/193)

Node.js 12が最小サポート環境となりました。
これは、Native ESMに対応するのがNode.js 12+からとなっているためです。

Secretlint自体はまだ[Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)ではないですが、そのうち変換する気はします。

[textlint](https://github.com/textlint/textlint)でも同様のESMで書かれたルールを読み込めるサポートをしていきたいので、興味がある人は<https://gitter.im/textlint-ja/textlint-ja>あたりで話してたりするので、聞いてみてください。
(textlintはSecretlintより変更する必要がある箇所が多い予感がするので、色々手伝ってくれる人がほしい。まずは把握してIssue作るところから)

## 雑感

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Dynamic Importを使えば、CommonJSで書かれたモジュールもESMなモジュールを読み込むことはできるけど、<br>ESLintとかtextlintとかみたいなプラガブルなツールはこれによって必ず非同期ロードを使わないといけないという制約ができちゃったなーって気がする<br>(require相当の同期+動的はESMでは存在しない)</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1438064207090442250?ref_src=twsrc%5Etfw">September 15, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

ESLintやtextlintなどプラグイン機構を持ったツールは多いと思いますが、こういった仕組みを持つツールは必ず非同期ロードをサポートしていないといけなくなっています。
現状では、CommonJS/ESMから動的にESMなプラグインをロードするにはDynamic Importを使うしかないため、非同期ロードを前提としたコードになってないと大変な感じがします。
プラグイン機構を作る予定がある人は、この辺を最初から考慮した設計にしておくとよさそうです。

Secretlintはtextlintの経験からモジュール化と非同期の対応が最初からほぼできていたので、[@secretlint/config-loader](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/config-loader)を変更するぐらいでできましたが、後からこれをやるのは結構大変そうです。

SecretlintでESMの対応が必要となったのは、[pkgdeps/unverified-checksum-checker](https://github.com/pkgdeps/unverified-checksum-checker)というチェックサムをチェックしているかをチェックするツールを書いていて、[Packemon](https://github.com/milesj/packemon)を使ってESMなSecretlintルールを書いてみたらなんか動かなかったためです。

TypeScript + ESM + Node.jsはまだハマりどころがたくさんありますが、その辺の話は[pkgdeps/unverified-checksum-checker](https://github.com/pkgdeps/unverified-checksum-checker)を公開するときにでも書きます。

- [Node.jsライブラリ/ツールをESMに移行する[Node.js 12+]](https://zenn.dev/azu/scraps/8251dab75562c8)
