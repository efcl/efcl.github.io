---
title: "textlint-scripts 3リリース、TypeScriptでtextlintのルールを作成できるようになりました"
author: azu
layout: post
date : 2019-10-21T09:06
category: JavaScript
tags:
    - textlint
    - TypeScript

---

[textlint](https://github.com/textlint/textlint)はJavaScriptでルールやサポートする拡張子を追加できる自然言語向けのLintツールです。

以前から[textlint-scripts](https://github.com/textlint/textlint-scripts)という、textlintのルール作成を補助するツールを公開していました。
textlint-scriptsはES2015+のビルドやテスト周りのセットアップなど、
普段JavaScriptを書かない人でも1つコマンドを叩けばtextlintのルールを書き始められるようにするためのツールです。
(JavaScript慣れてる人には`create-react-app`みたいなものというのがわかりやすい)

- [textlintのルールを簡単に作り始めることができるツールを作りました | Web Scratch](https://efcl.info/2016/12/14/create-textlint-rule/)
- [textlint のルールを作ってみた話 | ごみばこいん Blog](https://gomiba.co.in/blog/archives/1886)

## 3.0.0の変更点

[textlint-scripts](https://github.com/textlint/textlint-scripts) 3.0.0では、主な変更点として3つあります。

- TypeScriptサポート
- サポートターゲットをES2015+に変更
- ブラウザ互換性の向上

詳細は次のリリースノートにも書かれています。

- [Release 3.0.0 · textlint/textlint-scripts](https://github.com/textlint/textlint-scripts/releases/tag/3.0.0)

## TypeScriptサポート

textlint-scripts 3.0.0では、JavaScriptだけではなくTypeScriptのサポートもしました。

textlintはJavaScriptで書かれていましたが、途中からTypeScriptに移行して、今のコードベースは8割ぐらいはTypeScriptになっています。
(テストとはそのままにしてる部分がある)

- [textlintのコアをTypeScriptで書き直した、textlintの今後について | Web Scratch](https://efcl.info/2017/11/06/textlint-core-refactoring/)

また、コアモジュールとしてもtextlintルールなどのTypeScript型だけを提供する[@textlint/types](https://github.com/textlint/textlint/tree/master/packages/%40textlint/types)というものを公開しています。(これは内部でも使っているし、ルールを書くのにも利用できる)
このように、textlintのルールをTypeScriptを書く準備は整ってきたので、textlint-scripts 3.0.0でTypeScriptのビルドとテストをサポートしました。

内部的には[Babel](https://babeljs.io/)でビルドしていて、テスト時には[ts-node](https://github.com/TypeStrong/ts-node)で型チェックをしながら回すというハイブリッド構成になっています。(Babelでビルドしているのは、後述する静的ファイルのインライン化をしてかったため)

- [@babel/preset-typescript · Babel](https://babeljs.io/docs/en/babel-preset-typescript)

### TypeScriptでtextlintルールを書く

TypeScriptでtextlintのルールを書き始めるには、[create-textlint-rule](https://github.com/textlint/create-textlint-rule)に`--typescript`フラグを渡してプロジェクトを作成するだけです。

```shell
$ npx create-textlint-rule example --typescript
# textlint-rule-exampleというTypeScriptプロジェクトを作成する
```

[TypeScriptのプロジェクトテンプレート](https://github.com/textlint/textlint-rule-template-ts)を元にしたディレクトリが作成されるので、
後は開発して、`npm test`でテストを通して、`npm run build`でビルドして、`npm publich`で公開するだけです。

具体的には次のようにTypeScriptと[@textlint/types](https://github.com/textlint/textlint/tree/master/packages/%40textlint/types)を使ったテンプレートが生成されます。
`TextlintRuleModule<オプションのInterface>`で大体ルールに必要な型が付くので、あとは普通に開発するだけです。

```ts
import { TextlintRuleModule } from "@textlint/types";

export interface Options {
    // if the Str includes `allows` word, does not report it
    allows?: string[];
}

const report: TextlintRuleModule<Options> = (context, options = {}) => {
    const {Syntax, RuleError, report, getSource} = context;
    const allows = options.allows || [];
    return {
        [Syntax.Str](node) { // "Str" node
            const text = getSource(node); // Get text
            const matches = /bugs/g.exec(text); // Found "bugs"
            if (!matches) {
                return;
            }
            const isIgnored = allows.some(allow => text.includes(allow));
            if (isIgnored) {
                return;
            }
            const indexOfBugs = matches.index;
            const ruleError = new RuleError("Found bugs.", {
                index: indexOfBugs // padding of index
            });
            report(node, ruleError);
        }
    }
};
export default report;
```

既存のtextlint-scriptsを使ったJavaScriptプロジェクトからTypeScriptに移行する方法も用意しています。

[@textlint/migrate-textlint-scripts-typescript](https://github.com/textlint/migrate-textlint-scripts-typescript)を使うと、TypeScript周りの設定ファイルを自動で用意してくれます。

```shell
# textlint-scriptをアップデートする
npm install textlint-script@3 -D
# マイグレーションする
# ts-nodeや@textlint/types、tsconfig.jsonの作成などを行う
npx @textlint/migrate-textlint-scripts-typescript
```

あとは手動でJavaScriptファイルをTypeScriptファイルに書き換えていくだけです。
JavaScript to TypeScriptの基本的なやり方は次の記事も参照してください。
([textlint-tester](https://github.com/textlint/textlint/tree/master/packages/textlint-tester)を使ったテストは拡張子を書き換えて、importを治すだけでほぼ動きます)

- [Babelで書かれたJavaScriptライブラリをTypeScriptへ移行する方法 | Web Scratch](https://efcl.info/2019/01/09/babel-to-typescript-library/)

## サポートターゲットをES2015+に変更

先ほども書いたように`textlint-script build`でのビルドにはBabelを利用しています。

3.0.0ではBabelのプリセットを[@babel/preset-es2015](https://babeljs.io/docs/en/babel-preset-es2015/)から[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)に変更しています。
また、[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)のオプションとして[targets.esmodules](https://babeljs.io/docs/en/babel-preset-env#targetsesmodules)を有効化しています。

これにより`textlint-script build`でのビルドはES2015に対応したJavaScriptエンジン向けのコードを出力します。

- ES2015の構文で書かれたコードは、ビルド後もそのままES2015のコードとなる
    - 例) `class A{}`はTranspileされずに`class A{}`として出力される
- ES ModuleはCommonJSに変換される

そのため、IEでは動作しないコードを出力するようになります。
(もともとブラウザで動かしてる人は少ないため、IEでの利用はほぼないと思いますが…)

ES2015のコードを出力することで、コードサイズを抑えたり、Async Functionなど変換結果が単純化されます。
(また[@babel/preset-es2015](https://babeljs.io/docs/en/babel-preset-es2015/)ではAsync Functionに対応してなかったので、今回のアップデートで対応しています)

## ブラウザ互換性の向上

[textlint](https://github.com/textlint/textlint)本体はコアロジックをPure JavaScriptな[@textlint/kernel](https://github.com/textlint/textlint/tree/master/packages/%40textlint/kernel)に切り出したり、ブラウザでも動作するようにしていました。

しかし、[textlintのルール自体](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule#global)はNode.jsに依存した機能を使っていたりと、ルール自体がブラウザでは動かないパターンもあります。

[textlint-scripts](https://github.com/textlint/textlint-scripts) 3.0.0ではこの互換性の問題を緩和するため、textlintルール内で`fs`モジュールを使って読み込むファイルをビルド時にインライン化する処理を追加しました。

たとえば、textlintルールで次のような静的ファイルを読み込む処理を書いたとします。

```js
const fs = require("fs");
const path = require("path");
const text = fs.readFileSync(path.join(__dirname, "readme.md"), "utf-8");
```

これが`textlint-script build`によって、`readme.md`ファイルがソースコードにインライン化されます。

```js
const text = "README CONTENT"
```

このインライン化の処理は[babel-plugin-static-fs](https://github.com/Jam3/babel-plugin-static-fs)によって行われています。
先ほど、TypeScriptのビルドもBabelでやっていたのは、このような処理はBabelの方が柔軟でやりやすいためです。

これによって、`fs`モジュールに依存していたtextlintルールも、`fs`依存が外れるのでブラウザで動かしやすくなります。

作成したtextlintルールがブラウザで動作するかは[@textlint/browser-run](https://github.com/textlint/browser-run)というツールを使うと簡易なテストができます。

- [@textlint/browser-run](https://github.com/textlint/browser-run)

作成したルールと[@textlint/kernel](https://github.com/textlint/textlint/tree/master/packages/%40textlint/kernel)を使って、ブラウザでtextlintを実行した結果を出力します。

```shell
# electronが入ってるので大きいです
npm install @textlint/browser-run --global
# テストしたいルールのjsとテスト対象を指定する
textlint-browser-run --rule ./lib/rule.js ./README.md
```

Lint結果が出力されるならおそらくそのルールはブラウザでも動作します。

## まとめ

[textlint-scripts](https://github.com/textlint/textlint-scripts) 3.0.0でTypeScript対応とブラウザの互換性向上の仕組みが入りました。
またビルド後の出力ターゲットがES2015+となりました。

- [Release 3.0.0 · textlint/textlint-scripts](https://github.com/textlint/textlint-scripts/releases/tag/3.0.0)

textlintでブラウザをどう扱うかはまだ未定ですが(基本的にはユースケース駆動なので、ユースケースを書いてください)、[textlint-scripts](https://github.com/textlint/textlint-scripts) 3.0.0でビルドすれば`fs`の依存によって動かなかったルールは動くようになるかもしれません。

- [@textlint/browser · Issue #299 · textlint/textlint](https://github.com/textlint/textlint/issues/299)

内部的に[prh](https://github.com/prh/prh)を使ってるルールなどはこのアップデートで動かせるようになってると思うので、
ブラウザで動かしたいはtextlint-scriptsをアップデートするPRを送るのがいいかもしれません。

- [refactor(rule): Convert to TypeScript by azu · Pull Request #11 · textlint-ja/textlint-rule-ja-no-abusage](https://github.com/textlint-ja/textlint-rule-ja-no-abusage/pull/11)

また、`textlint@11.4.0`でNode.jsの[Worker Threads](https://nodejs.org/api/worker_threads.html)で並列Lintを試験的にサポートしています。この辺もいい感じに分散させるいい感じのロジックを募集してるので、Issueとかに意見をください。

- [Release textlint@11.4.0 · textlint/textlint](https://github.com/textlint/textlint/releases/tag/textlint%4011.4.0)
- [Parallel linting · Issue #633 · textlint/textlint](https://github.com/textlint/textlint/issues/633)

textlintはいつでもContributingを募集してるので、`good first issue`などみるといいかもしれません。

- [Issues · textlint/textlint](https://github.com/textlint/textlint/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22good+first+issue%22)
