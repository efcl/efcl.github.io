---
title: "CommonJSからES Modulesへの移行する方法。トップダウンかボトムアップか"
author: azu
layout: post
date : 2023-07-05T21:47
category: JavaScript
tags:
    - JavaScript
    - Node.js
    - ESM
    - CommonJS

---

[Secretlint](https://github.com/secretlint/secretlint) v7でCommonJS からES Modulesへの移行を行いました。

- [Secretlint v7.0.0をリリースしました。Pure ESMへの書き直し](/2023/07/05/secretlint-v7/)

この記事では、CommonJS(CJS)からES Modules(ESM)への移行を行った経緯と、移行する方法について紹介します。

CJSからESMへの移行は、率直に言えば単調な作業で、メリットが見えにくい作業です。
しかし、将来的にCJSよりもESMが主流になることは間違いないので、移行することは必要です。
移行の作業は、移行方法が決まれば大部分は機械的な書き換えが可能です。

では、実際にどうやって移行したのかを紹介します。

## ESMへの移行の影響は依存元へと連鎖する

[Secretlintのリポジトリ](https://github.com/secretlint/secretlint)はmonorepoになっていて、だいたい40コぐらいのパッケージが含まれています。
そしてパッケージ間で依存関係があります。

たとえば、次のような依存関係がmonorepo内にあります。

- `@secretlint/quick-start`は`secretlint`パッケージをラップしたものなので、`secretlint`に依存
- `secretlint`は、Node.js向けのAPIを持つ`@secretlint/node`に依存
- `@secretlint/node`は、SecretlintのコアAPIを持つ`@secretlint/core`に依存
- `@secretlint/core`は、パッケージ間で参照する型定義だけをまとめた`@secretlint/types`に依存

![Secretlint Dependencies Tree](/wp-content/uploads/2023/07/05-1688559947.png)

ESMへの移行は、必然的にこの依存関係全体的へ影響します。
なぜなら、ESMのモジュールは基本的にESMのコードからしかインポートできないためです。
そのため、CommonJS(CJS)からESMのモジュールを`require`で読み込むことはできません。

CJSからESMを読む方法としてDynamic Import(`import()`)がありますが、
Dynamic Importは非同期ロードであるため、`require`(同期処理)で読んでいた場合はコードの書き換えは必要になります。

ESMへの移行は、影響が依存元へと連鎖します。
そのため依存の一番末端(他への依存がない)である`@secretlint/types`をESMへと移行すると、`types`に依存してる`core`をESMにする必要があります。
`core`がESMになると`node`をESMに必要があり といった形で影響が依存元(依存のルート)へと連鎖していきます。

この影響の連鎖を止める方法としては、[Dual packages](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)(ESMとCJSどちらの形式も出力する)か先ほど紹介していたDynamic Importで依存を読み込む方法です。

このようにESMへの移行は、依存の末端からやると自動的に依存元(読み込む側)へと影響してしまいます。
一方で、Node.jsではESMからCJSを読み込みことはできます。
そのため、`@secretlint/quick-start`をESMにしても、CJSである`secretlint`は読みことが可能です。

これは、依存のルートと末端どちらから移行していくかを考えるのに重要です。

## ESMへの移行はボトムアップではなく、トップダウン

先ほども紹介したように、ESMへの依存を依存関係の末端からルートへとボトムアップで行うと、ESM化への影響が自動的に連鎖します。
そのため、`@secretlint/types`をESMにすると、`types`に依存した全てのパッケージを書き換えるなどしないとテストすら実行できません。
一方で、依存関係のルートから末端へとトップダウンで行うと、パッケージを1つずつESMへと移行していくことが可能です。

### ボトムアップの場合

`@secretlint/types`をESM化すると、一度に全てのパッケージをESMに変更するなどの対応が必要になる。

<video src="/wp-content/uploads/2023/07/bottom-up_optimized.mp4" controls  muted loop playsinline></video>

- WIP PR: [WIP: Convert to ESM - bottom up by azu · Pull Request #528 · secretlint/secretlint](https://github.com/secretlint/secretlint/pull/528)

### トップダウンの場合

どこからも依存されていない`@secretlint/quick-start`からESMへ移行することで、パッケージを徐々に移行できる。

<video src="/wp-content/uploads/2023/07/top-down_optimized.mp4" controls  muted loop playsinline></video>

一般的なリファクタリングでは、依存の末端から同じインターフェースを保って移行することが多いと思います。
しかし、ESMでは同じインターフェースを保つ = Dual Packageなので難易度がとても高くメンテナンスコストも高いです(少なくてもbundlerなどのビルドツールが必要です)。

[Secretlint](https://github.com/secretlint/secretlint)では、ESMへの移行が目標であったため、トップダウンアプローチを採用することしました。
こういった移行をトップダウンアプローチでやるのは珍しい気がしていて、Node.jsがESMからはCJSを読み込むできる互換レイヤーがあるため可能になっています。

実際にトップダウンでパッケージを1つずつESMへと移行しながら書き換えを進めました。

- PR: [refactor!(secretlint): convert to ESM - top down by azu · Pull Request #529 · secretlint/secretlint](https://github.com/secretlint/secretlint/pull/529)

## 依存ツリーの作成

ボトムアップ、トップダウンどちらの方法でやるにしても、依存ツリーの把握は必須です。
monorepoではnpmやyarnなどの`workspaces`機能を使っていることがほとんどだと思います。

Nxの[nx graph](https://nx.dev/packages/nx/documents/dep-graph)コマンドを使うことで、`workspaces`の依存関係から依存ツリーの図を作成できます。

![Secretlint Dependencies Tree](/wp-content/uploads/2023/07/05-1688559947.png)

この依存ツリーから、トップダウンアプローチではどういう順番で書き換えていけば、1つのパッケージを書き換えた時点で動作する状態になるのか作業順を作成します。

実際にやった作業順は次のようなツリーになっています。

1. @secretlint/quick-start
2. secretlint
3. node/tester
4. formatter/node/config-creator/messages-to-markdown/config-loader/core (ここはどれからでもOK)
5. types/profile

それぞれのステップでのパッケージをESMにした状態で、それぞれ全体のテストが通る(Secretlintとして配布できる)状態でマイグレーションしていきました。

## ESMの段階的な移行の境界線

トップダウンアプローチで、`secretlint`のコマンドを構成するパッケージは移行できそうでした。
しかし、[Secretlintのリポジトリ](https://github.com/secretlint/secretlint)はmonorepoにはルールも一緒に含まれています。

先ほどの依存関係には含めていませんでしたが、ルールを含めた依存ツリーは膨大です。

<video src="/wp-content/uploads/2023/07/rule-deps.mp4" controls muted loop playsinline></video>

SecretlintのルールはAWS/GCP/npmのクレデンシャルの検知などさまざまなものがあります。
ルールの数が多いため、コアであるパッケージとルールであるパッケージは、別々でESMへの移行を進めようと思いました。
(両方をまとめて移行し切るのは大変なので、区切りをつけたかった)


このコアパッケージとルールのパッケージの依存関係をよく観察してみると、ルールはコアパッケージの中でも`@secretlint/tester`と`@secretlint/types`だけに依存していることがわかりました。

<video src="/wp-content/uploads/2023/07/core-and-rule.mp4" controls muted loop playsinline></video>

つまり、ルールとコアの境界は`@secretlint/tester`と`@secretlint/types`にあります。
この境界線となるパッケージをどうにかすれば、コアの移行とルールの移行を分離できそうです。

基本的にはESMのパッケージはESMのコードからしか読み込ません。
例外として、[Dual packages](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)(ESMとCJSどちらの形式も出力する)かDynamic Importがあります。

ここでは、この境界線となるパッケージの読み込みに、[Dual packages](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)とDynamic Importを使うことで、コアとルールの移行を切り離しました。

具体的には、次のような対応をしています。

### [Dual packages](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)に対応する

`@secretlint/types`は、monorepo内で共有する型定義を配布するパッケージです。
中身は型定義だけです。

普通のパッケージを[Dual packages](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)にすることはビルドツールでTranspileしないと難しいですが、型定義だけならESMの出力とCJSの出力のtsconfig.jsonを用意するだけで可能です。

ESMとCJSの型定義をそれぞれ出力して、[tsconfig-to-dual-package](https://github.com/azu/tsconfig-to-dual-package)を使うことでDual Pacakgeとして配布できます。

Dual PackageはCJSとESMどちらのパッケージからも読み込めるため、Dual Package化した`@secretlint/types`はESMに移行する前のルールからも読み込めるようになりました。

### Dynamic ImportでESMを読み込む

`@secretlint/tester`はルールのテストを実行するためのライブラリです。
`@secretlint/tester`とMochaを使ってスナップショットテストをするためのUtility的なものになっています。

そのため`@secretlint/tester`をESMにすると、全てのルールをESMにしないとルールのテストが動かなくなります。
まとめてルールのテストを移行するのは大変そうであったため、まずはCJSのままESM化した`@secretlint/tester`を使うように移行しました。

ここで利用したのは、CJSからはESMのパッケージをDynamic Importで読むという方法です。

次のようにCJSから`require`でESMのパッケージは読み込めません。

```js
const pkg = require("esm-pkg");
```

一方で、Dynamic Importを使う場合は、CJSからESMのパッケージを読み込めます。
ただしDynamic Importは非同期処理であるため、CJSの処理も非同期にする必要があります。

```js
(async function (){
    const pkg = await import("esm-pkg");
})();
```

Dynamic Importを利用することで、ルールのテストコードはCJSのままでESMのパッケージに変更した`@secretlint/tester`を利用できるにしました。

具体的なDiffは次のようになります。

```diff
- const { snapshot } = require("@secretlint/tester");
const path = require("path");
const { creator: rule } = require("../src/index");
+ const test = require("node:test");
- describe("@secretlint/secretlint-rule-example", () => {
+ test("@secretlint/secretlint-rule-example", async (t) => {
+      const snapshot = (await import("@secretlint/tester")).snapshot;
-      snapshot({
+      await snapshot({
          defaultConfig: {
              rules: [
                  {
                      id: "@secretlint/secretlint-rule-preset-canary",
                      rule,
                      rules: [],
                      options: {},
                  },
              ],
          },
          updateSnapshot: !!process.env.UPDATE_SNAPSHOT,
          snapshotDirectory: path.join(__dirname, "snapshots"),
      }).forEach((name, test) => {
-          it(name, async function () {
+          return it(name, async (context) => {
              const status = await test();
              if (status === "skip") {
-                  this.skip();
+                  context.skip();
              }
          });
      });
  });
```

ここでは、Mochaから`node:test`([Node.js Test runner](https://nodejs.org/api/test.html))ベースのテストにしています。
APIはそこまで大きく変わらないので、文字列置換だけで変更できました。

Mochaではなく`node:test`に変更したのは、非同期で初期化処理を行う必要があったためです。
Mochaの`describe`はAsyncに対応していないため、非同期処理が必要な動的なテスト生成はできませんでした。

- [Describe block with async function behaving weirdly · Issue #2975 · mochajs/mocha](https://github.com/mochajs/mocha/issues/2975)

`node:test`ではAsyncに対応しているため、Sub Testsを動的に生成することができます。

ここまでの移行をコアパッケージの移行として行いました。

- [refactor!(secretlint): convert to ESM - top down by azu · Pull Request #529 · secretlint/secretlint](https://github.com/secretlint/secretlint/pull/529)

その後、ルールのパッケージを同じようにESMに移行しています。

- [refactor!: Convert all rules to ESM by azu · Pull Request #535 · secretlint/secretlint](https://github.com/secretlint/secretlint/pull/535)

## CJSからESMへコードを書き換える

ESMへの移行とは具体的にどういうことをやるのかを紹介します。

CJSでは使えて、ESMでは使えない機能がいくつかあります。
コード的にはそれを書き換えることと、`package.json`に`type=module`を設定するこでESMなパッケージとして配布できます。

- [Node.jsライブラリ/ツールをESMに移行する[Node.js 12+]](https://zenn.dev/azu/scraps/8251dab75562c8)

変更の9割ぐらいは、`import`するファイルパスに`.js`を追加するのと、`__dirname`を`import.meta.url`へ変更になると思います。

CJSでは、`require`するファイルの拡張子は省略可能でしたが、ESMは`import`するファイルの拡張子が必須になります。

```js
import assert from "assert"; // モジュール
import foo from "./foo.js"; // 相対パス
import type Foo from "./foo"; // import type - typeは省略可能
```

CJSでは、`__dirname`や`__filename`が利用可能でした。

```js
__dirname; // スクリプトのディレクトリパス
__filename; // スクリプトのファイルパス
```

ESMには、これらはないため`import.meta.url`から定義するか`new URL("./path", import.meta.url)`のようにURLオブジェクトを使うように変更が必要です。

```js
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

これらの書き換えは機械的に検知でき、書き換えも大部分は可能です。
実際に次のツールを使って検知と書き換えを行いました。

- [azu/eslint-cjs-to-esm: ESLint wrapper for migration from CJS to ESM.](https://github.com/azu/eslint-cjs-to-esm)
- [eslint-cjs-to-esm: CJSをESMへとマイグレーションするツールを書いた | Web Scratch](https://efcl.info/2023/01/18/eslint-cjs-to-esm/)

## CJSからESMのパッケージに変換する

CJSからESMのパッケージにするには、`package.json`の書き換えや`tsconfig.json`の出力の書き換えなども必要です。
[Secretlintのリポジトリ](https://github.com/secretlint/secretlint)では、それぞれのパッケージはほぼ同じ構成だったので、次のようなスクリプトを回して変換しました。

```bash
#!/bin/bash

#
# TypeScriptのESMのみのプロジェクトに変換する
# - TypeScript から TypeScript ESMへの変更
declare scriptDir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
declare currentDir=$(pwd)
declare currentDirName=$(basename "${currentDir}")
declare entryFileName=$(npe main | xargs -I{} basename {} .js)
# Install
echo_message "npm install"
function installDev() {
  local isNpm=$(test -e "${currentDir}/package-lock.json" && echo "true" || echo "false")
  if [[ "$isNpm" == "true" ]]; then
    npm install -D "$@"
  else
    yarn add --dev "$@"
  fi
}
function uninstall() {
  local isNpm=$(test -e "${currentDir}/package-lock.json" && echo "true" || echo "false")
  # iterate $@ and delete each package from dependencies/devDependencies/peerDependencies
  for depName in "$@"; do
    npm pkg delete "dependencies.$depName"
    npm pkg delete "devDependencies.$depName"
    npm pkg delete "peerDependencies.$depName"
  done
  if [[ "$isNpm" == "true" ]]; then
    npm install --ignore-scripts
  else
    yarn install --ignore-scripts
  fi
}
function echo_message(){
  echo "\033[31m=>\033[0m \033[036m$1\033[0m"
}
installDev typescript ts-node mocha @types/node @types/mocha || true
uninstall ts-node-test-register tsconfig-to-dual-package || true
# Copy config
cp "${scriptDir}/resources/dual-package/.mocharc.json" ./.mocharc.json
cp "${scriptDir}/resources/dual-package/tsconfig.json" ./tsconfig.json
rm -rf ./test/tsconfig.json # ts-node-test-registerの設定を削除
rm -rf tsconfig.module.json # module対応していた場合
rm -rf tsconfig.cjs.json    # cjs対応していた場合
# Edit package.json
## Add script
echo_message "Add npm run-script"
npe scripts.build "tsc --build"
npe scripts.clean "tsc --build --clean"
npe scripts.watch "tsc --build --watch"
npe scripts.prepublishOnly "npm run clean && npm run build"
npe scripts.test "mocha"
# update fields
npm pkg set "type"="module"
npm pkg set "main"="./module/${entryFileName}.js"
npm pkg set "types"="./module/${entryFileName}.d.ts"
npm pkg set "exports[.].import.types"="./module/${entryFileName}.d.ts"
npm pkg set "exports[.].import.default"="./module/${entryFileName}.js"
npm pkg set "exports[.].default"="./module/${entryFileName}.js"
npm pkg set "exports[./package.json]"="./package.json"
npe files "bin/, module/, src/"
npx @turbo/codemod add-package-manager --force
sort-package-json
# git
git add .
```

ツールやスクリプトを使うことで9割ぐらいは、機械的に変換できます。
とにかく数が多いので、機械的に変換できるものは機械的に変換していきました。

## Tips: monorepoを移行するときはturborepoとかでキャッシュを効かせて、常に全体をnpm testして進めるのが楽

1つのパッケージを書き換えたSecretlint全体のテストが通るかを確認しながら進めました。

この時に、[Nx](https://github.com/nrwl/nx)/[Turborepo](https://turbo.build/repo)/[moon](https://moonrepo.dev/moon)などのmonorepo向けのツールを使っておくと、パッケージ間のタスクの結果をキャッシュできます。
それによって、`npm test`で全体のテストを実行しても、変更したパッケージに関係あるテストのみが実行できます。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">monorepoで1ファイル変更するたびにmonorepo全体のテストを実行するのはこんな感じです。<br>これはsecretlintな のでturborepoのキャッシュが効いてて、全体のテストを実行してもそのファイルだけテストが実行される<a href="https://t.co/PPy73bz3ND">https://t.co/PPy73bz3ND</a> <a href="https://t.co/pCMNm3mn3X">pic.twitter.com/pCMNm3mn3X</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1675008702171213824?ref_src=twsrc%5Etfw">July 1, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

これによって、全体のテストを実行するという1つの方法で、パッケージを徐々に書き換えていくことが簡単になります。
ESMへのパッケージに影響が連鎖しやすいので、全体のテストを常に走らせるというのは、問題が起きた時にすぐ気付けるので重要です。

SecretlintではTurborepoを使っていたので、元からその仕組みがありましたが、今回の移行ではかなりこの仕組みがスピードに貢献したと思います。
実際に40コぐらいパッケージがありましたが、1日とちょっとで全て移行し終わっています。

## Tips: Rollup `commonjs`プラグインとNode.js ESMのCJSの挙動は異なる

RollupはモジュールをESMとして扱います。
そのためデフォルトではCJSを扱えません。
そのため、bundle依存のどこかにCJSがある場合は[@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs)を使う必要があります。

しかし、この[@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs)とNode.js ESMからCJSを読み込む挙動はデフォルトでは互換性がありません。
どういう違いがあるかというと[@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs)は、[`__esModule`フラグ](https://github.com/esnext/es6-module-transpiler/issues/86)という歴史的なフラグを考慮するのに対して、Node.js ESMは`__esModule`フラグを考慮しません。

この挙動の違いによって、Node.jsでESMとして実行できても、rollupでbundleするとNode.jsで実行するとエラーになるという現象が起きます。
(`.default.default`の問題といえばわかる人はわかると思います)

この挙動の違いをなくすには、[@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs)の`commonjs({ defaultIsModuleExports: true })`オプションを有効化する必要があります。

`defaultIsModuleExports`を`true`にするとNode.js ESMからCJSを読み込んだ時と同じ動作になります。

Secretlintでは[@secretlint/secretlint-rule-preset-recommend](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-preset-recommend)をRollupでbundleすることで、I/Oを減らすという最適化をしているので、この問題を踏みました。

## おわりに

ESMへの移行は、現時点だと面倒で直接的なメリットが少なく、そして面倒臭いです。

ただ工夫すれば段階的な移行はできるので、移行はしていく必要があります。
Secretlintのようにプラガブルな仕組みの場合は、まずはプラグインをESMで書けるようにするところからスタートして、本体をESMへ移行していくというのがよいとは思います。

- [🛡🔑 Secretlint 4.0.0: ESMで書かれたルールのサポート、secretlint-disableコメントのサポート | Web Scratch](https://efcl.info/2021/09/15/secretlint-4.0.0/)
- 本体のESMへの移行: <- この記事

今回のSecretlintの書き換えで、ESMへの移行の仕方がだいぶ身についた気はします。
実際にやっていることでほぼほぼ自動化できるとは思うので、徐々に移行ツールなども増えていくと思います。