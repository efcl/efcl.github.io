---
title: "npm publishできるかを判定するコマンドラインツール: can-npm-publish"
author: azu
layout: post
date : 2018-06-21T11:06
category: JavaScript
tags:
    - npm
    - node.js
    - CLI

---

[azu/can-npm-publish: A command line tool that check to see if `npm publish` is possible.](https://github.com/azu/can-npm-publish)というツールを書きました。

名前の通り指定したパッケージ(`pacakge.json`)を見て、そのパッケージのそのバージョンが`npm publish`可能かどうかを判定してくれます。

## `npm publish`可能かのチェックリスト

具体的には次のすべての条件を満たした時に`publish`が可能と判断します。

- [x] Check that the package's name is valid
    - [validate-npm-package-name](https://github.com/npm/validate-npm-package-name "validate-npm-package-name")
    - 最近変更されたパッケージ名の命名規則もチェックされます
    - [The npm Blog — New Package Moniker rules](https://blog.npmjs.org/post/168978377570/new-package-moniker-rules)
- [x] Check that the package is not `private:true`
- [x] Check that `package@version` is already published in npm registry

たとえば、すでに同じバージョンがpublish済みの場合はexit statusが`1`を返します。

```sh
# in almin/
$ can-npm-publish --verbose
almin@0.13.10 is already published
$ echo $?
1
```

また、チェックには`npm view`コマンドを使っていて、`pacakge.json`に`publishConfig`が設定されていればprivateのregistryでも動作します。

- [Add support for registry definition in package.json publishConfig by skoging · Pull Request #6 · azu/can-npm-publish](https://github.com/azu/can-npm-publish/pull/6)

## つかいみち

ものすごいシンプルな使い所だと`npm publish`と`can-npm-publish`を`&&`で実行するパターンです。

    can-npm-publish && npm publish

もっと具体的には[lerna](https://github.com/lerna/lerna "lerna")のようにまとめて、`pacakges/*`したのパッケージをpublishしたときに、`lerna`は一つでも`publish`に失敗すると途中で止まってしまうので、`can-npm-publish`と組み合わせることで、publish可能なものだけをpublishできます。

    lerna exec --bail=false -- "can-npm-publish && npm publish"

元々次のIssueのワークアラウンドとして作りました

- [lerna to publish packages with their current version · Issue #1056 · lerna/lerna](https://github.com/lerna/lerna/issues/1056)

## Install

[npm](https://www.npmjs.com/)でインストールできます。

    npm install can-npm-publish

## Usage

    Usage
      $ can-npm-publish [directory|pacakge.json path]

    Options
      --verbose  show detail of errors

    Examples
      $ can-npm-publish
      $ echo $? # 0 or 1

すべてのチェックが通った場合はexit statusが`0`になります。
何かがおかしい場合はexit statusが`1`となります。

何がおかしいのかの理由を知りたい場合`--verbose`オプションを利用できます。

    $ can-npm-publish --verbose
    almin@0.13.10 is already published
    $ echo $?
    1

リポジトリ

- [azu/can-npm-publish: A command line tool that check to see if `npm publish` is possible.](https://github.com/azu/can-npm-publish)と