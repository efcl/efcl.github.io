---
title: "npm publishのパターン"
author: azu
layout: post
date : 2015-04-08T09:35
category: JavaScript
tags:
    - npm
    - private
    - Node.js
    - console

---

この記事では最近自分が使ってるnpm publishでのモジュール公開のパターンについて紹介します。

npm publishで公開する先は2パターンあるので、以下の2パターンについて書きます。

- Public
- Private(scoped packages)

また使用するnpmは[v2.7.0](https://github.com/npm/npm/blob/master/CHANGELOG.md#v270-2015-02-26 "v2.7.0")以上が対象です。

----

## npm publish

先に結論的な今使ってるものを貼っておきます。
zshの関数とaliasですが、基本的にただのコマンドの組み合わせなので大体の環境で動かせる気がします。

(今後gistの方を更新するかもしれないので、記事中に書かれてるものよりgistの方が最新です)

<script src="https://gist.github.com/azu/7d997a658950559f7d5d.js"></script>

大まかな流れは

> 事前準備 -> semverでコミット -> push

という感じになります。

## 使い方

- npm-patch
- npm-minor
- npm-major
- private-npm-patch
- private-npm-minor
- private-npm-major

PublicとPrivateの2種類のコマンドを後ほど話す理由で分けてますが、基本的にはpatch, minor, majorの3つのコマンドです。

見てわかるように、[Semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning "Semantic versioning")のpatch, minor, majorに対応しています。

実行すると、依存のチェックやテスト、version変更のコミット、git tag、ビルドが必要なら`npm run build`、最後に`npm publish`します


```sh
function _confirm-npm(){
  echo -n "npm publish to \033[036m$1\033[0m. OK? "
  read INPUT
  echo "\033[31m=>\033[0m \033[036m$1\033[0m"
}
alias npm-patch='_confirm-npm "Public" && pre-version && npm version patch && post-version'
alias npm-minor='_confirm-npm "Public" && pre-version && npm version minor && post-version'
alias npm-major='_confirm-npm "Public" && pre-version && npm version major && post-version'
alias private-npm-patch='_confirm-npm "Private" && scoped-modules-checker && pre-version && npm version patch && post-version'
alias private-npm-minor='_confirm-npm "Private" && scoped-modules-checker && pre-version && npm version minor && post-version'
alias private-npm-major='_confirm-npm "Private" && scoped-modules-checker && pre-version && npm version major && post-version'
alias pre-version='git diff --exit-code && npm prune && npm install -q && npm test'
alias post-version='npm run --if-present build && git diff --exit-code && git push && git push --tags && npm publish'
```


実行されるコマンドの流れを見ていくといかのような感じになってます。

- diffがないか
	- `git diff --exit-code`
- pacakge.jsonに書いてない依存モジュールを使ってたりしないか
- テストがちゃんと通るか
	- `npm prune && npm install -q && npm test`
- semverでpackage.jsonの変更とgit tagを貼る
	- `npm version <patch|minor|major>`
- ビルドスクリプトが定義されてるならビルドする
	- `npm run --if-present build`
	- `--if-present` で "build" がないなら無視できる
	- npm [v2.7.0](https://github.com/npm/npm/blob/master/CHANGELOG.md#v270-2015-02-26 "v2.7.0")から入った機能なのでnpmが古いとだめ。
- ビルドファイルがgitで管理されないか
	- `npm run --if-present build && git diff --exit-code`
- git push
- npm publish
	- `git push && git push --tags && npm publish`

`npm-patch` を叩くと色々チェックして、patchバージョンを上げてコミットしたものをgit pushとnpm publishしてくれる感じですね。

## Privateへの公開

npm publishはパッケージが[Scoped packages](https://docs.npmjs.com/misc/scope "Scoped packages")であるならばPrivateへ、そうでないならPublic(npmjs.com)への公開がデフォルトの挙動になっています。

具体的には`npm publish`すると以下のようなもの**以外**の時はPublicへ公開する挙動になります。

1. `private : true` となってる
	2. package.jsonの[private](https://docs.npmjs.com/files/package.json#private "private")設定
2. [Scoped packages](https://docs.npmjs.com/misc/scope "Scoped packages") である
	3. [Scoped packages](https://docs.npmjs.com/misc/scope "Scoped packages")はpacakge nameが`@`から始まるもの
4. `publishConfig`でpublish先を設定されてる
	5. package.jsonの[publishConfig](https://docs.npmjs.com/files/package.json#publishconfig "publishConfig")設定

上記のどれかに該当する場合は、正しく設定されていればPrivateへ公開され、また設定が一部おかしかった場合もPrivateへリクエストを投げるので、Publicには漏れなくなります。

package.jsonを作るときに

