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

理想的には、package.jsonを作るときに最初から[Scoped packages](https://docs.npmjs.com/misc/scope "Scoped packages")として作ると間違ってPublicに公開されることはなくなるので安全です。
package.jsonを作るときに

```
npm init mypackage —scope=myorg
# @myorg/mypackage ができる
```


ですが、どちらにしてもnpmの設定かpackage.jsonの変更が必要で、それを忘れてnpm publishしてしまうことがありえるのと、そもそもPublicとPrivateが設定情報というコンテキストで自動で切り替わるのが怖かったのでコマンドとして分けるようしました。

- npmjsにPublic公開したい時
	- `npm-<patch|minor|major>` を叩く
- Private regitoryに公開したい時
	- `private-npm-<patch|minor|major>` を叩く

というCLIの段階で分かれてると意識しやすくなるので、`npm publish`を内部で[release-it](https://github.com/webpro/release-it "release-it")のようなツールを使ってなければ大分事故が少なくなりそうです。

```sh
alias private-npm-patch='_confirm-npm "Private" && scoped-modules-checker && pre-version && npm version patch && post-version'
alias private-npm-minor='_confirm-npm "Private" && scoped-modules-checker && pre-version && npm version minor && post-version'
alias private-npm-major='_confirm-npm "Private" && scoped-modules-checker && pre-version && npm version major && post-version'
```

実際に見てみると最初に[scoped-modules-checker](https://github.com/azu/scoped-modules-checker "azu/scoped-modules-checker")でそれがscoped packagesであるかをチェックするのが入ってるだけで、あとは`npm-patch`などと同じですね。

今回はチェックするコマンドの組み合わせでやっていますが、scoped packagesじゃないとpublishできない[private-npm-publish](https://github.com/dwango-js/private-npm-publish "dwango-js/private-npm-publish")というnpm publishのラッパーコマンドもあります。

npm publishに対するグローバルなホックは書けないので、こういうアプローチになる感じです。

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/azu_re">@azu_re</a> 直接のフックはコマンドのwrapが必要になりそうですが、scoped packageで解決できたりしません…？ <a href="https://t.co/2a8MJFhQe6">https://t.co/2a8MJFhQe6</a></p>&mdash; Daijiro Wachi (@watilde) <a href="https://twitter.com/watilde/status/580982938700910592">March 26, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

そもそも「なぜそこまでPrivateのものを間違って公開した時のことを気にするの? `npm unpublish -f` すればいいのでは?」と思うかもしれませんが、以下のブログで書かれているように現在(2015-04-09)のnpmは一度上げるとそれを完全に消すことはできない仕組みなってると書いてあります。

- [The npm Blog — &#34;Oh no! I accidentally published private data to...](http://blog.npmjs.org/post/101934969510/oh-no-i-accidentally-published-private-data-to "The npm Blog — &#34;Oh no! I accidentally published private data to...")
- registryのmirrorがあり、それはnpm inc.の管理下ではないため


-----

あと細かな工夫として　`npm-patch` の方はPublicで公開される可能性があるので、最初に確認を出すようにしてます。(ただEnter押せばいいだけ)

![npm-patch](https://efcl.info/wp-content/uploads/2015/04/09-1428537317.png)

間違ってEnterおしても、installやtestなどが走るのでその間にCtrl+Cとかでキャンセルできるので数秒は猶予があります。

後はpackage.jsonの`files`とかをチェックしたい感じですが、基本的にコマンドの組み合わせなのでそういうコマンド作っていく感じになりそう。

## おわり


- [npm version publish alias](https://gist.github.com/azu/fb3ec88231235511858a "npm version publish alias") について紹介した
- PublicとPrivateでnpm publish叩くのは同じだけどコマンドを分けた 
