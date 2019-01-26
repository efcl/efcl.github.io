---
title: "lernaでのmonorepoにおけるリリースフロー(Fixed/Independent)"
author: azu
layout: post
date : 2019-01-26T10:40
category: JavaScript
tags:
    - JavaScript
    - monorepo
    - lerna
---

一つのリポジトリで複数のパッケージを管理する際には[Lerna](https://github.com/lerna/lerna)と[Yarnのワークスペース](https://yarnpkg.com/lang/ja/docs/workspaces/)を組み合わせて運用するmonorepoにすることが多いです。

- [lerna/lerna: A tool for managing JavaScript projects with multiple packages.](https://github.com/lerna/lerna)

LernaにはFixed(すべてのパッケージが同じバージョン)とIndependent(パッケージごとに異なるバージョン)のモードがあります。

- <https://github.com/lerna/lerna#how-it-works>

基本的にはFixedの方が運用は簡単ですが、不自然なバージョンの上がり方を避けたい場合などはIndependentのmodeを使うことがあります。

この記事では、Fixed modeとIndependent modeでのパッケージのリリースフローについて見ていきます。

## modeの違い

### Fixed mode

Pros

- 簡単でわかりやすい
- リリースフローは通常のパッケージとほぼ同じ

Cons

- すべてのパッケージのバージョンを同時に上げないといけない
    - majorをあげる時にそのパッケージ自体はインターフェースが同じでも、内部的な依存があがるとmajorを上げる必要がある
- 一つのリポジトリに複数の役割のパッケージを混ぜるのは難しい

### Independent mode

Props

- 異なる役割のパッケージを1箇所で管理できる

Cons

- バージョン管理がやや複雑

----

FixedからIndenpendent への移行は簡単なので、Fixedで問題ない場合はFixedでスタートした方が楽だと思います。(`lerna.json`の`version`を`independent`に変更するだけです)

それぞれのパターンにおけるmonorepoのパッケージリリースフローや`CHANGELOG.md`などのリリースノートの扱い方について書いていきます。

lerna 3から[@lerna/version](https://github.com/lerna/lerna/tree/master/commands/version#readme)と[@lerna/publish](https://github.com/lerna/lerna/tree/master/commands/publish#readme)にコマンドが分離されたので、npmで通常のパッケージと同じようなフローが取れるようになってきました。

コマンドは次のような対応になっていると考えておけば大体OKです。

- `npm version` == `lerna version`
- `npm publish` ==`lerna publish from-package`
- `npm version` + `npm publish` == `lerna publish` (lerna 2の挙動と同じ)

## 共通のコミットメッセージ規約

`lerna version` は [--conventional-commits](https://github.com/lerna/lerna/tree/master/commands/version#--conventional-commits) オプションをサポートしているので、基本的にはこれをベースに考えています。これはFixedとIntependentどちらも同じです。

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)はコミットメッセージから自動的にバージョンを推論したり、CHANGELOG.mdを書き出す時に役立つコミットメッセージの規約です。

このコミットメッセージの規約でコミットしておくと、`lerna version --conventional-commits`で次のバージョンを自動的に推論してくれます。Fixedの場合は手動でも大丈夫ですが、Independent modeで全部手動は厳しいので、どちらの場合でも基本的にこのルールを使っています。

![--conventional-commits](https://efcl.info/wp-content/uploads/2019/01/26-1548468186.png)

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)は、AngularJSのコミットメッセージ規約をsemverに絞ってもっとシンプルにしたものです。

コミットメッセージを以下のような形で

- 1行目に概要
- 2行目は空改行
- 3行目から本文

最後に関連するIssue(任意)を書きます。

```
feat(ngInclude): add template url parameter to events

The `src` (i.e. the url of the template to load) is now provided to the
`$includeContentRequested`, `$includeContentLoaded` and `$includeContentError`
events.

Closes #8453
Closes #8454
```


```
                         scope        commit title

        commit type       /                /      
                \        |                |
                 feat(ngInclude): add template url parameter to events

        body ->  The 'src` (i.e. the url of the template to load) is now provided to the
                 `$includeContentRequested`, `$includeContentLoaded` and `$includeContentError`
                 events.

 referenced  ->  Closes #8453
 issues          Closes #8454
```

`commit type` としては次のようなものがあります。

- feat
    - 新しい機能、章、節の追加など
    - 更新履歴に載るような新しいページを追加
- fix
    - 意味が変わる修正
    - 更新履歴に載るような修正
- その他:
    - chore: , docs:, style:, perf: なども使いますが、semverの推論には関係ありません。

BREAKING CHANGEをしたい場合は、3行目を`BREAKING CHANGE:`から開始します。
BREAKING CHANGEは`commit type`と併用できます。

```
feat(api): change api interface

BREAKING CHANGE: rename `getLevel` to `get level`
破壊的な変更をしました。

Closes #234
```

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)ではバージョンに推論に関係ある部分しか決まっていません。
また、[--changelog-preset](https://github.com/lerna/lerna/tree/master/commands/version#--changelog-preset)でこのルールセットは変更できます。

## Fixed modeでのリリースフロー

[mdline](https://github.com/azu/mdline)はFixed modeでのリリースフローを採用しています。

- [azu/mdline: Markdown timeline format and toolkit.](https://github.com/azu/mdline)

Fixed modeは`npm`の代わりに`lerna`コマンドを使う程度で通常のパッケージとそれほど違いはありません。
[package.json](https://github.com/azu/mdline/blob/master/package.json)には次のようなスクリプトが定義されています。

```
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "build": "lerna run build",
    "test": "lerna run test",
    "updateSnapshot": "lerna run updateSnapshot",
    "versionup": "lerna version --conventional-commits",
    "versionup:patch": "lerna version patch --conventional-commits",
    "versionup:minor": "lerna version minor --conventional-commits",
    "versionup:major": "lerna version minor --conventional-commits",
    "release": "lerna publish from-package",
    "prettier": "prettier --write \"**/*.{js,jsx,ts,tsx,css}\"",
    "netlify": "node public/update-index.js"
   },
```

----

**Tips**:スクリプト名に `version`や`publish`は避ける

`yarn run version`のように実行するために`version`というnpmが本体使ってる名前を使うと、挙動がコンフリクトすることができます。

- [If "version" script is defined in package.json, should show meaningful error · Issue #1844 · lerna/lerna](https://github.com/lerna/lerna/issues/1844)

-----

基本的に次のような形でリリースを行います。(`yarn`は`npm`に置き換えても問題ないです。このプロジェクトでは`useWorkspace`を使っているので`yarn`で統一しています)

### 1. `yarn run versionup`でアップデートするバージョンを更新する

```
yarn run versionup
# pacakgeのversion更新とgit tagとCAHNGELOG.mdを更新
```

`yarn run versionup`を実行すると、コミット規約から自動的に次のバージョンを推論して決めてくれます。
コミットメッセージがちゃんと書かれている場合はそれで問題ないですが、手動で選ぶ場合は `yarn run versionup:{patch, minor, major}`を使います。

このコマンドは次の3つのことをしてくれます

1. 各パッケージの`version`を更新
2. **ルートディレクトリ**に`CHANGELOG.md`を出力(更新)
3. バージョンを`git tag`してくれる

### 2. `yarn run release`でパッケージを公開

```
yarn run release
# npm publishをする
```

`yarn run release`は`lerna publish from-package`をしています。

これは、現在のバージョンがnpm registryに公開されていなければ、`npm publish`するという形になります。
なので、`npm publish`を順番にやっていく形になります。
(適当な順番で`npm publish`をすると依存関係から数秒パッケージが取得できない問題が発生しますが、`lerna publish`は依存関係をみてpublish順を決めます)

----

**Notes:** scoped packageの場合は[publishConfig](https://docs.npmjs.com/files/package.json#publishconfig)を設定する

scoped packageをpublicに公開するときは`publishConfig`をそれぞれの`package.json`に設定しないとエラーとなります。(初回だけ)
これはnpmの制約なので、publishに失敗してるときは各パッケージの設定を確認してください

- https://github.com/azu/mdline/blob/master/packages/types/package.json
- [npmで名前空間を持ったモジュールを公開する方法(scoped modules) | Web Scratch](https://efcl.info/2015/04/30/npm-namespace/)

```
  "publishConfig": {
    "access": "public"
  },
```

---

### 3. GitHub Releaseにリリースノートを書く

1.の`yarn run versionup`で既に`CHANGELOG.md`が生成されているので、コピペでGitHub Releaseにリリースノートを更新もできます。

また、Fixed modeでは[conventional-github-releaser - npm](https://www.npmjs.com/package/conventional-github-releaser)が利用できます。

- [conventional-changelog/releaser-tools: Create a GitHub/GitLab/etc. release using a project's commit messages and metadata.](https://github.com/conventional-changelog/releaser-tools)

リリースごとに次のコマンドを実行すると、前回のバージョンからのCHANGELOGをGitHub Releaseのリリースノートとして更新してくれます。

これもコミットメッセージ規約として[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)を使っていれば、同じ仕組みでCHANGELOGを作ってくれます。

```
conventional-github-releaser -p angular
```

また、CHANGELOG.mdから指定したバージョンのCHANGELOGを取り出したい場合は[@monorepo-utils/collect-changelog](https://github.com/azu/monorepo-utils/tree/master/packages/%40monorepo-utils/collect-changelog)が利用できます。

次のように`CHANGELOG.md`から指定したバージョンの内容を取得して標準出力に流してくれます。

```
collect-changelog-from-tag --changelog ./CHANGELOG.md "version"
```

最新のコミットからgit tagを取り出すには、`git tag --points-at HEAD`が使えるので、次のようにすれば現在のバージョンのCHANGELOGを取得できます。

```
git tag --points-at HEAD | xargs -I{} monorepo-utils-collect-changelog {} | pbcopy
```

----

## Independent modeのリリースフロー

ここからはIndependent modeでのリリースフローです。

次のリポジトリはIndependent modeを採用しています。

- [textlint/textlint: The pluggable natural language linter for text and markdown.](https://github.com/textlint/textlint "textlint/textlint: The pluggable natural language linter for text and markdown.")
- [almin/almin: Client-side DDD/CQRS for JavaScript.](https://github.com/almin/almin "almin/almin: Client-side DDD/CQRS for JavaScript.")

たとえばalminでは次のようなスクリプトが定義されています(一部抜粋)

- https://github.com/almin/almin/blob/master/package.json

```
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "versionup": "lerna version --conventional-commits",
    "versionup:patch": "lerna version patch --conventional-commits",
    "versionup:minor": "lerna version minor --conventional-commits",
"versionup:major": "lerna version minor --conventional-commits",
    "release": "lerna publish from-package",
    "release:canary": "lerna publish --canary"
   },
```

基本的にFixed、Independentどちらも同じです。
また、あえて分けて書いてますが、基本的にはIndependentでも"3. GitHub Releaseにリリースノートを書く"以外は全く同じ方法を取れます。

### 1. `yarn run versionup`でアップデートするバージョンを更新する

```
yarn run versionup
# pacakgeのversion更新とgit tagとCAHNGELOG.mdを更新
```

`yarn run versionup`を実行すると、コミット規約から自動的に次のバージョンを推論して決めてくれます。
コミットメッセージがちゃんと書かれている場合はそれで問題ないですが、手動で選ぶ場合は `yarn run versionup:{patch, minor, major}`を使います。

また。`lerna version` とオプションなしなら、一つづつパッケージごとにバージョンを選択する対話的に決定できます。

このコマンドは次の3つのことをしてくれます

1. 各パッケージの`version`を更新
2. **各パッケージ**のディレクトリに`CHANGELOG.md`を出力(更新)
3. バージョンを`git tag`してくれる

CHANGELOG.mdが各パッケージ以下に生成される以外はFixed modeと同じです。

### 2. `yarn run release`でパッケージを公開

```
yarn run release
# npm publishをする
```

`yarn run release`は`lerna publish from-package`をしています。

これは、現在のバージョンがnpm registryに公開されていなければ、`npm publish`するという形になります。
なので、`npm publish`を順番にやっていく形になります。
これはFixedと同じです。

### 3. GitHub Releaseにリリースノートを書く

1.の`yarn run versionup`で既に`CHANGELOG.md`が生成されているので、コピペでGitHub Releaseにリリースノートを更新もできますが、各パッケージからかき集める必要があります。・

[@monorepo-utils/collect-changelog](https://github.com/azu/monorepo-utils/tree/master/packages/%40monorepo-utils/collect-changelog)はIndependent modeにも対応しています。

次のようにmonorepoで`tag@version`を指定すると、そのタグに関係するパッケージの`CHANGELOG.md`から指定したバージョンの内容を取得して標準出力に流してくれます。

```
collect-changelog-from-tag --directory ./monorepo-root/ "tag@version"
```

例えば、Independentでは`パッケージ名@バージョン`となるので`@textlint/types`の`1.1.2`は次のようなタグが付きます。

- [@textlint/types@1.1.2](https://github.com/textlint/textlint/releases/tag/%40textlint%2Ftypes%401.1.2)

このタグに関連するCHANGELOGを取り出すには、次のようにコマンドを実行するだけです。(directoryを省略した場合はcurrent = monorepot rootとなる)

```
collect-changelog-from-tag "@textlint/types@1.1.2"
```

最新のコミットからgit tagを取り出すには、`git tag --points-at HEAD`が使えるので、次のようにすれば現在の**各バージョン**のCHANGELOGを取得できます。

```
git tag --points-at HEAD | xargs -I{} monorepo-utils-collect-changelog {} | pbcopy
```

## 

これで、Independentでもバージョンの更新からパッケージの公開までできます。
しかし、Independentではパッケージごとにバージョンが異なるため、パッケージを公開する前にバージョンがあってるかを確認したいことが多いです。

そのため、自分のプロジェクトのIndependent modeではリリースレビューを行うフローを使っています。

----



**Notes**: 現時点では[conventional-github-releaser - npm](https://www.npmjs.com/package/conventional-github-releaser)はlernaをサポートしていない

- [lerna support · Issue #52 · conventional-changelog/releaser-tools](https://github.com/conventional-changelog/releaser-tools/issues/52)



----

## Independent modeでのリリースレビューフロー

https://github.com/almin/almin/blob/master/.github/CONTRIBUTING.md#release-workflow にもこのリリースフローが書かれています。

具体的なスクリプトは同じで、パッケージを公開する前にPull Requestを出してそれをチェックするという違いがあるだけです。

### 1. リリースブランチをcheckout

Pull Requestをするためのリリースブランチをチェックアウトして、それをpushします。(lernaはremote branchがないとエラーとなるため)

```
git checkout -b release-date
git push origin HEAD -u
```

### 2. `yarn run versionup`でバージョンを更新

ここは同じで`yarn run versionup`を使ってバージョン更新とCHANGELOGファイルの更新を行います。

```
# automatic versioning by commit message
$ yarn run versionup
# major update for all
$ yarn run versionup:major
# minor update for all
$ yarn run versionup:minor
# path update for all
$ yarn run versionup:patch
```

### 3. CHANGELOGから変更点をコピーする

先ほどの[@monorepo-utils/collect-changelog](https://github.com/azu/monorepo-utils/tree/master/packages/%40monorepo-utils/collect-changelog)を使ってCAHNGELOGから変更点をコピーします。

たとえば、Alminでは[copy-changelog](https://github.com/almin/almin/blob/177b48ea8145c4085d958f52cf60b3450d70ac7e/package.json#L42)というスクリプトを定義しています。(Windowsだと動かないけど…)

```
 "copy-changelog": "git tag --points-at HEAD | xargs -I{} monorepo-utils-collect-changelog {} | pbcopy",
```

`yarn run copy-changelog`と実行すれば主要な変更点をコピーできます

### 4. Pull Requestを出してレビューする

ここまでのコミットをpushしてPull Requestを出します。
先ほどコピーしておいた変更点をPull RequestのDescriptionに入れて、意図してないバージョンの更新がないかをチェックします。

また、GitHub Releaseに貼り付けるリリースノートのドラフトもこのPull Requestで作成します。
他にもリリースノートをブログとして書く場合には、このブランチでブログ記事を書いています。

Alminとtextlintでは[Docusaurus](https://docusaurus.io/)を使ったドキュメント + ブログがmonorepoに含まれているので、リリースするためのPull Request上でブログを書いたりします。

- [Blog · Almin](https://almin.js.org/blog/ "Blog · Almin")
- [Blog · textlint](https://textlint.github.io/blog/ "Blog · textlint")

Prettierとかも似たような仕組みをもっています。

- [docs(blog): 1.16 release by ikatyang · Pull Request #5752 · prettier/prettier](https://github.com/prettier/prettier/pull/5752)

textlintのリリースPull Requestの例

* [Release textlint@11.2.0 by azu · Pull Request #573 · textlint/textlint](https://github.com/textlint/textlint/pull/573 "Release textlint@11.2.0 by azu · Pull Request #573 · textlint/textlint")

レビューやリリースノートが完了したら、実際にパッケージを更新します。

### 5. `yarn run release`でパッケージを公開

実際にユーザー影響がでるのはここからなので、ここまでは間違っていてもrevertできるので、このリリースフローの利点です。

リリース準備が完了したら実際にpublishします。

```
yarn run release
```

後は、GitHub Releaseを更新したりすれば完了です。

## おわりに

[Lerna](https://github.com/lerna/lerna)でのFixed modeとIndependent modeでのリリースフローについて書きました。

lernaを使ったmonorepoでは[Yarnのワークスペース](https://yarnpkg.com/lang/ja/docs/workspaces/)と組み合わせた方がlockファイルの管理が楽です。
また[yarn upgrade-interactive](https://yarnpkg.com/lang/ja/docs/cli/upgrade-interactive/)がmonorepoに対応しているのでとても便利です。
そのため、基本的にはnpmではなくyarnを使っています。

![interactive](https://efcl.info/wp-content/uploads/2019/01/26-1548474924.png)

Lerna + YarnでWorkspaceを有効化する場合には、[lerna.json](https://github.com/lerna/lerna#lernajson)の設定で`useWorkspace`を有効化して、`pacakge.json`でYarnの設定をする必要があります。

```
{
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true,
  "packages": [
    "packages/*"
  ]
}
```

monorepoでパッケージを管理することで、関連するパッケージが一箇所に集まるのでバージョンアップが簡単になります。また、monorepo内でコア部分をパッケージとして切り出したり、[@mdline/types](https://github.com/azu/mdline/tree/master/packages/types)のように型定義だけを切り出して共有したり、[@proofdict/domain](https://github.com/proofdict/proofdict/tree/master/packages/%40proofdict/domain)のようにドメインだけを切り出すといった運用が現実的な範囲でできます。

一方でなんでもかんでも詰め込むと、CIが重くなったり更新に不安を持つような作りになったりします。
そのため、基本的にはライフサイクルが同じものをmonorepoでまとめるのがいいとは思います。

リリースフローが単独のリポジトリと若干異なることはありますが、Fixed modeだとそれが最小限なので最初はFixed modeのほうが楽です。Independent modeでもだいぶ似たようなフローを取れるようになってきています。

lernaでは[lerna import](https://github.com/lerna/lerna/tree/master/commands/import#readme)によって既存のリポジトリをmonorepoへ取り込めるので、monorepoへの移行自体はそれほど大変ではありません。(大体import時点ではバージョンがバラバラになるのでIndependent modeになりやすい)

TypeScriptもmonorepo向けのProject Referencesなどが入ってきています。

- [tsc --build / Project References Feedback & Discussion · Issue #25600 · Microsoft/TypeScript](https://github.com/Microsoft/TypeScript/issues/25600)

単独のリポジトリをmonorepoに集めたからといってなんでも解決するわけではないですが、楽になったりする部分はあるので、興味がある人は試してみるといいかもしれません。

逆に今回の記事で書いているように開発フローなどが少し異なったり、複数のパッケージを同時に開発するという事実は変わりませんが、[Lerna](https://github.com/lerna/lerna)や[Yarn](http://yarnpkg.com/)によってその部分はだいぶ楽になっていると思います。

## 参考

* [textlint/textlint: The pluggable natural language linter for text and markdown.](https://github.com/textlint/textlint "textlint/textlint: The pluggable natural language linter for text and markdown.")
  * Independent
* [azu/mdline: Markdown timeline format and toolkit.](https://github.com/azu/mdline "azu/mdline: Markdown timeline format and toolkit.")
  * Fixed
* [almin/almin: Client-side DDD/CQRS for JavaScript.](https://github.com/almin/almin "almin/almin: Client-side DDD/CQRS for JavaScript.")
  * Independent
* [azu/immutable-array-prototype: A collection of Immutable Array prototype methods(Per method packages).](https://github.com/azu/immutable-array-prototype "azu/immutable-array-prototype: A collection of Immutable Array prototype methods(Per method packages).")
  - Fixed