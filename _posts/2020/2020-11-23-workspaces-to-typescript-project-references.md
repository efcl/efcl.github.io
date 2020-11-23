---
title: "lerna/yarn/npm workspacesとTypeScript Project Referencesの設定を同期するツール"
author: azu
layout: post
date : 2020-11-23T21:53
category: JavaScript
tags:
    - lerna
    - monorepo
    - TypeScript

---

[TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)は、tsconfig.json同士の依存関係を定義することで、効率的なビルドが可能になる仕組みです。

monorepoなど一つのリポジトリ内で複数のTypeScriptで書かれたパッケージがある場合に効率的なインクリメンタルビルドなどができます。
また、VSCodeなどのコード補完に使われるTS-Serverなどのスキャンも効率的になります。

- [Migrating Large TypeScript Codebases To Project References — Developer Tooling](https://shopify.engineering/migrating-large-typescript-codebases-project-references)
- [Optimizing multi-package apps with TypeScript Project References | by Mirko Kruschke | eBay Tech Berlin](https://ebaytech.berlin/optimizing-multi-package-apps-with-typescript-project-references-d5c57a3b4440)

たとえば、次のような構造で packages/front は packages/common に依存しているとします。

```
.
└── packages/
    ├── front/
    ├── server/
    └── common/
```

この場合に[TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)で依存関係を表現するなら、packages/front の `references`にCommonへの相対パスを指定します。


```json
// packages/front/tsconfig.json
{
  "references": [
    {"path": "../common"}
  ]
}
```

ビルドする場合には、`tsc -p .` ではなく `tsc --build .` というように `--build` フラグを使ってビルドします。
また、各tsconfig.jsonには `composite` と `declaration` が必須となるなどの制限もあります。

詳しくはドキュメントを参照してください。

- [TypeScript: Documentation - Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)

このTypeScript Project Referencesは便利は便利なのですが、設定が手間であるという問題が知られています。

多くのmonorepoでは[Lerna](https://github.com/lerna/lerna)、[Yarn's workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)、[npm's workspaces](https://github.com/npm/rfcs/blob/26e8ac6ee176943d6522d5d057fab05e37655e1c/accepted/0000-workspaces.md)などを利用していると思います。
このworkspaceの設定と重複する`references`の設定を`tsconfig.json`に手書きするのはあまり現実的ではありません。

そのため、monorepoのworkspaceの設定から`tsconfig.json`の`references`の設定を更新/チェックする[@monorepo-utils/workspaces-to-typescript-project-references](https://github.com/azu/monorepo-utils/blob/master/packages/@monorepo-utils/workspaces-to-typescript-project-references/README.md)というツールを書きました。

## [@monorepo-utils/workspaces-to-typescript-project-references](https://github.com/azu/monorepo-utils/blob/master/packages/@monorepo-utils/workspaces-to-typescript-project-references/README.md)

似たようなツールはすでに何個もあるのですが、自分のニーズを見たせるものがなかったので作っています。

特徴としては次のようになっています。

- monorepoのworkspace設定と[TypeScript's Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)の同期とテスト
- `tsconfig.json`のコメントは保持する
- プラグインで任意のworkspaceツールに対応

## インストール

npmなどを使ってインストールしてください

    npm install @monorepo-utils/workspaces-to-typescript-project-references

## 使い方

CLIツールなのでHELPを見れば大体の使い方が分かります。

    Usage
      $ workspaces-to-typescript-project-references
 

    Options
      --root             [Path:string] Root directory of the monorepo. 
                         Default: current working directory

      --check            If set the flag, check only differences of tsconfig.json and does not update tsconfig.json.
                         If the check is failed, exit status 1. It is useful for testing.       
      --plugin           [Path:string] Path to plugin script.
                         Load the plugin script as module and use it. 
                           
      --tsconfigPath     [Path:string] Use alternative config path inside the package. e.g.: tsconfig.test.json
                         Default: tsconfig.json

    Examples
      # Update project references in tsconfig.json
      $ workspaces-to-typescript-project-references
      # Test on CI
      $ workspaces-to-typescript-project-references --check

## Examples

このツール自身が[monorepo-utils](https://github.com/azu/monorepo-utils)というmonorepoで管理されています。
[monorepo-utils](https://github.com/azu/monorepo-utils)はlerna + yarn workspacesを使っています。

次の箇所にworkspacesの設定が書かれていることが分かります。

- [workspaces definition](https://github.com/azu/monorepo-utils/blob/99fcc68078fae56a8c84f4a9bf4bdff7a3d4cc76/package.json#L26-L31)

```json
  "workspaces": {
    "packages": [
      "packages/*",
      "packages/@monorepo-utils/*"
    ]
  },
```

このmonorepo内で[`@monorepo-utils/workspaces-to-typescript-project-references`](https://github.com/azu/monorepo-utils/blob/39b7bacee6094096adca5ac5c9c2d2a759a38419/packages/@monorepo-utils/workspaces-to-typescript-project-references)パッケージの[依存関係](https://github.com/azu/monorepo-utils/blob/39b7bacee6094096adca5ac5c9c2d2a759a38419/packages/@monorepo-utils/workspaces-to-typescript-project-references/package.json#L71)を見てみると、[@monorepo-utils/package-utils](https://github.com/azu/monorepo-utils/blob/39b7bacee6094096adca5ac5c9c2d2a759a38419/packages/@monorepo-utils/package-utils)という別のパッケージに依存しています。

```json
  "dependencies": {
    "@monorepo-utils/package-utils": "^2.2.0",
    "comment-json": "^3.0.3",
    "meow": "^7.1.1"
  }
```

そのため、`workspaces-to-typescript-project-references` コマンドを実行すると、
[`@monorepo-utils/workspaces-to-typescript-project-references`](https://github.com/azu/monorepo-utils/blob/39b7bacee6094096adca5ac5c9c2d2a759a38419/packages/@monorepo-utils/workspaces-to-typescript-project-references)の[tsconfig.json](https://github.com/azu/monorepo-utils/blob/e83e457371bc30d3332da3082ecc5a4de848e128/packages/%40monorepo-utils/workspaces-to-typescript-project-references/tsconfig.json#L38-L42)に次のようにパスが追加されます。

```json
  "references": [
    {
      "path": "../package-utils"
    }
  ]
```

これで、package.jsonを変更した際に `workspaces-to-typescript-project-references` コマンドを実行するだけで、常に`tsconfig.json`の定義を維持できます。
また、CIで [`workspaces-to-typescript-project-references --check` を実行](https://github.com/azu/monorepo-utils/blob/14153e72726ef709dbb3dd762bddff791cf06f16/package.json#L15)すれば、package.jsonとtsconfig.jsonのズレが出た場合に来づけるようになっています。


## Plugin

[@monorepo-utils/workspaces-to-typescript-project-references](https://github.com/azu/monorepo-utils/tree/master/packages/@monorepo-utils/workspaces-to-typescript-project-references)の特徴として、プラグインで任意のworkspaceに対応できるようになっています。
この機能を持ってるツールがなかったので、このツールを書いたところはあります。

たとえば、[Bolt](https://github.com/boltpkg/bolt)というツールもworkspaceを持っていますが、`package.json`に[`bolt.workspaces`](https://github.com/boltpkg/bolt#configuration)というフィールドを定義する独自の仕様です(`yarn`や`npm`やルート直下の`workspace`になっている)

このBoltの対応は、次のような`bolt-plugin.js`を書くことで対応できます。
([get-monorepo-packages](https://github.com/azz/get-monorepo-packages)というライブラリはBoltをサポートしているので、これを使うだけです。)

`bolt-plugin.js`:
```js
const getPackages = require("get-monorepo-packages");
const plugin = (options) => {
    const monorepoPackages = getPackages(options.rootDir);
    return {
        supports() {
            return monorepoPackages.length > 0;
        },
        getAllPackages() {
            return monorepoPackages;
        },
        getDependencies(packageJSON) {
            const dependencies = Object.entries(packageJSON.dependencies ?? {});
            const devDependencies = Object.entries(packageJSON.devDependencies ?? {});
            return [...dependencies, ...devDependencies].map((dep) => {
                return {
                    name: dep[0]
                };
            });
        },
        resolve({ name }) {
            const matchPkg = monorepoPackages.find((info) => {
                return info.package.name === name;
            });
            if (!matchPkg) {
                return null;
            }
            return matchPkg.location;
        }
    };
};
module.exports.plugin = plugin;
```

プラグインを使うときは、`--plugin` に `plugin.js` のパスを渡すだけです。

```
$ npm install @monorepo-utils/workspaces-to-typescript-project-references -g
$ workspaces-to-typescript-project-references --plugin ./bolt-plugin.js
```
 
## おわりに

TypeScriptで書かれた大きなプロジェクトでは[TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)を使うことでコンパイル速度などが最適化できます。

- [Performance · microsoft/TypeScript Wiki](https://github.com/microsoft/TypeScript/wiki/Performance#using-project-references)

大きなTypeScriptのプロジェクトは増えていると思うので、Project Referencesも使われることが増えていると思います。
しかし、現状のProject Referencesは使い勝手があまりよい感じのものではありません。

[@monorepo-utils/workspaces-to-typescript-project-references](https://github.com/azu/monorepo-utils/blob/master/packages/@monorepo-utils/workspaces-to-typescript-project-references/README.md)はProject Referencesを補助するツールですが、将来的にTypeScript自体でもうちょっと良い感じに使えるようになるのがいい気がします。

- [Infer project references from common monorepo patterns / tools · Issue #25376 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/issues/25376)
- <https://twitter.com/azu_re/status/1310057006909149185>

Project Referencesを使わないで `paths` のaliasを使って[別パッケージのtsファイルを直接参照してビルドする](https://github.com/textlint/textlint/pull/414)という裏技もありますが、[かなり罠っぽい動作](https://github.com/textlint/textlint/issues/440)もあるので、素直にProject Referencesを使ったほうがまともだと思います。

[textlint](https://github.com/textlint/textlint)はTypeScriptで書かれているパッケージが多いので、Project Referencesと[@monorepo-utils/workspaces-to-typescript-project-references](https://github.com/azu/monorepo-utils/blob/master/packages/@monorepo-utils/workspaces-to-typescript-project-references/README.md)を使うようになっています。

- [refactor(typescript): Use TypeScript Project References by azu · Pull Request #668 · textlint/textlint](https://github.com/textlint/textlint/pull/668)

TypeScript Project Referencesを現状使うべきかは迷うような感じではありますが、Project Referencesを使うには`tsc --build`でビルドする必要があるという制約があります。
そのため、Project Referencesを入れると必然的にTypeScriptのビルドキャッシュの仕組みが導入されるという副作用があります。

`tsc --build`を使うと`.tsbuildinfo`を使ったビルドのファイルキャッシュが作られます。
これは、すでにビルドキャッシュがあると一から再ビルドしなくてすむので、monorepoのようなビルドステップが複雑になりがちな場所では結構有用です。

- <https://www.typescriptlang.org/docs/handbook/project-references.html#build-mode-for-typescript>

Project Referencesはまだ実例があんまり多くなかったりエコシステム側の対応がいまいちという部分はありますが、徐々に良くなっているので触れる機会は増えるのかもしれません。

- [ts-node with project references in a lerna monorepo · Issue #897 · TypeStrong/ts-node](https://github.com/TypeStrong/ts-node/issues/897)
