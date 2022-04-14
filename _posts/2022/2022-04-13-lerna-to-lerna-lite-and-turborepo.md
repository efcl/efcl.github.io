---
title: "lernaからlerna-lite + turborepoに移行する"
author: azu
layout: post
date : 2022-04-13T14:25
category: JavaScript
tags:
    - monorepo
    - javascript

---

[Secretlint](https://github.com/secretlint/secretlint)はmonorepoとなっていて、パッケージを公開する際に[lerna](https://github.com/lerna/lerna)を利用していました。
しかし、lernaは現在メンテナンスされていないため、publish機能だけを取り出した[lerna-lite](https://github.com/ghiscoding/lerna-lite)と効率的なmonorepo向けのビルドツールである[Turborepo](https://turborepo.org/)へ移行しました。

- [Lerna is largely unmaintained · Issue #2703 · lerna/lerna](https://github.com/lerna/lerna/issues/2703)

次の記事で書いていますが、Lernaはもともとall-in-one的なツールでしたが、それぞれの分野でメジャーなものが各機能と同等のものを実装しています。
一番大きな所としては、Workspaces機能を各パッケージマネージャーが実装したため、Lerna独自でこの機能を持つ必要性がかなり薄くなりました。

> 元々はLernaがWorkspace管理(依存関係の管理)、タスク管理(パッケージの依存を見てタスクを実行)、Publish管理(バージョンの更新やCHANGELOGの作成、公開)などの機能を持ったツールとしてスタートしています。
> 
> - [babel/monorepo.md at master · babel/babel](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
> 
> Workspace管理は、npm 7+/Yarn/pnpmなどのパッケージマネージャーがworkspaces機能としてサポートし始めました。
> タスク管理は、TurborepoやNx(Nxは全部入り)などがより効率的に実行できるツールとして誕生しています。
> Publish管理は、まだ成熟したツールは少ないですが[changesets](https://github.com/changesets/changesets)/[Ship.js](https://github.com/algolia/shipjs)/[lerna-lite](https://github.com/ghiscoding/lerna-lite)、パッケージマネージャー自体が持っていることがあります。
> - [2022-02-22のJS: Deno 1.19、Next.js 12.1、Monorepo Toolsまとめ - JSer.info](https://jser.info/2022/02/22/deno-1.19-next.js-12.1-monorepo-tools/)

一方で、monorepoのバージョン管理ツールでlernaより使われているものはありません。

> https://www.npmtrends.com/changesets-vs-lerna-vs-shipjs-vs-@microsoft/rush

パッケージマネージャー自体は、publishはサポートしていますが、パッケージのバージョン更新については扱っていないことが多いです。

Lernaでは、[--canary](https://github.com/lerna/lerna/tree/main/commands/publish#--canary)でのCanaryバージョンの公開、[--conventional-commits](https://github.com/lerna/lerna/tree/main/commands/version#--conventional-commits)での[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)のサポート、[--create-release github](https://github.com/lerna/lerna/tree/main/commands/version#--create-release-type)でのGitHubリリースの連携などがありました。

この辺の機能を使ったリリースフローは自分の中である程度固まっていて、あまり代替となるツールはありませんでした(あっても別のリリースフローになってしまう)

- [lernaでのmonorepoにおけるリリースフロー(Fixed/Independent) | Web Scratch](https://efcl.info/2019/01/26/monorepo-release-flow/)

[lerna-lite](https://github.com/ghiscoding/lerna-lite)は、この部分(具体的には`lerna version`と`lerna publish`)の機能だけを取り出してメンテナンスされているForkです。
このリリースフロー以外の機能については、npmやYarn自体でもある程度なんとかなりますが、この部分だけはリリースフロー自体が大きく変えない限り変わるものがありませんでした。

今回は、[Lerna](https://github.com/lerna/lerna)から[lerna-lite](https://github.com/ghiscoding/lerna-lite)への移行と、
合わせて[Turborepo](https://turborepo.org/)でのビルドやテストの効率化を行いました。

## `lerna run`から[Turborepo](https://turborepo.org/)への移行

[Turborepo](https://turborepo.org/)はVercelに買収されて、Vercelで開発されているmonorepo向けのビルドシステムです。
リモートキャッシュや並列ビルドなども対応したビルドシステムです。

Bazelなどもこれらの機能を持っていますが、設定が複雑になることが知られています。
[Turborepo](https://turborepo.org/)は、設定はスクリプトにおける依存関係を`package.json`に追加するだけ(大部分は定型的)で、簡単に導入できるようになっています。

他のmonoreoツールについては、次のサイトでも解説されています。

- [Monorepo Explained](https://monorepo.tools/)

まずは、リリース周り以外のビルドやテストなどをLernaではなくTurborepoを使って実行するようにしました。
次のPRで実際の変更が見れます。

- [perf: introduce turborepo by azu · Pull Request #215 · secretlint/secretlint](https://github.com/secretlint/secretlint/pull/215)

Yarn v1 + Lernaから、Yarn v1 + Turborepoに移行していくつか異なる点はありました。(Turborepo v1.1)

- Turborepoの方が厳密なので、入れ忘れていたdevDependenciesがエラーになった
- `ENV_A=1 turbo run build` と実行して、各パッケージの`npm run build`には`ENV_A`が渡されなかった
- Turborepoは循環参照を見つけても、ハングするだけでエラーを報告してくれなかった(Lernaではエラーを報告してくれた)
  - 今後改善される可能性はありそう

速度については、ローカルキャッシュで導入したのでCI自体はそこまで多くは変わりませんでした。
キャッシュがあって、変更がないときの`turbo run`の結果はキャッシュが使われるので、何度も実行する場合には早くなったと思います。

これで、`lerna version`と`lerna publish`以外では、Lernaを使わないようにできました。

## LernaをLerna-Liteに移行

[lerna](https://github.com/lerna/lerna)から[lerna-lite](https://github.com/ghiscoding/lerna-lite)への移行は簡単です。

`lerna version`と`lerna publish`は互換性がある同じ名前のコマンドが用意されているので、次のようにインストールするだけです。

```
yarn remove lerna -W
yarn add @lerna-lite/cli --dev -W
```

`@lerna-lite/cli`を入れると`lerna`コマンドが利用できるので、他に変更する必要はありません。

実際のPRは次で見れます。

- [fix(monorepo): use lerna-lite instead of lerna by azu · Pull Request #250 · secretlint/secretlint](https://github.com/secretlint/secretlint/pull/250)

Secretlintでは、`lerna run`を先に外したので使っていませんでしたが、[@lerna-lite/run](https://github.com/ghiscoding/lerna-lite/tree/main/packages/run#readme)を使うと`lerna run`コマンドも利用できます。

npmを使っている場合は、lerna-liteはnpm 8が必要になっています。
Node.jsは14が必要で、最初は16が必要でしたが修正しています。

- [Does lerna-lite requires Node.js 16 actually? · Issue #77 · ghiscoding/lerna-lite](https://github.com/ghiscoding/lerna-lite/issues/77)

これで、lernaからlerna-lite + turborepoに移行できました。

## おわり

Secretlintでは、パッケージをCIからリリースするようにしています。

- [secretlint/create-release-pr.yml at master · secretlint/secretlint](https://github.com/secretlint/secretlint/blob/master/.github/workflows/create-release-pr.yml)
  - パッケージのバージョンを上げてリリース用のPRを作成
- [secretlint/publish.yml at master · secretlint/secretlint](https://github.com/secretlint/secretlint/blob/master/.github/workflows/publish.yml)
  - バージョンが上がったパッケージがあったらnpm registryへリリース
  - ついでにDockerへもpushする

npmのMFAがpublishに対して有効の場合は、OTP codeが必要ですが、OTP codeには有効期限があるため大量のパッケージをpublishすると期限が切れてしまう可能性があります。
そのため、有効期限がない[npm automation tokens](https://github.blog/changelog/2020-10-02-npm-automation-tokens/)を作成して、CI経由でpublishしています。

しかし、このnpmのtokenはリポジトリ/パッケージ単位ではなくユーザー単位になっています。
複数人で開発するリポジトリでは、リポジトリへ個人のnpm tokenは設定すると、別のメンテナーから利用できてしまう問題があります。
そのため、monorepoごとにnpmユーザーを作成して、そのnpmユーザーの[npm automation tokens](https://github.blog/changelog/2020-10-02-npm-automation-tokens/)を利用する必要があります。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">- npm publishのMFA有効化したい<br>- → monorepoのpublishでOTPがタイムアウトする<br>- → monorepoはtoken作らないといけない<br>- → リポジトリscopeのtokenは作れないので、botユーザーで代用<br>- → botユーザーのMFA管理が増える<br>- → MFA管理ツールがどれもロックイン感あって、増やしにく<br>- 最初に戻る</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1507567685588062209?ref_src=twsrc%5Etfw">March 26, 2022</a></blockquote> 
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

これがとても面倒で、GitHubの権限でGitHub Actionsからnpmへpublishする機能が入ってくれると、こんなややこしいことをしなくて済むのにと思いました。

リポジトリ単位のnpm tokenを扱うツールとしては、GCP周りのライブラリで使われているWombat Dressing Roomがあります。

- [GoogleCloudPlatform/wombat-dressing-room: proxy designed to reduce the attack surface of npm publish](https://github.com/GoogleCloudPlatform/wombat-dressing-room)

リリースノートについては、GitHubがPRから自動的に作成する機能を追加したりしています。
そのため、Lernaの[--create-release github](https://github.com/lerna/lerna/tree/main/commands/version#--create-release-type)などのリリースノート周りの機能もあまり使わなくなってきた気がします。

- [Automatically generated release notes - GitHub Docs](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)

ローカルからpublishするよりもCIからpublishする方がクリーンで安全なので、今後はそういう方向になっていく感じはします(lernaはローカル = 人間向けの機能がちょこちょこあるので、この辺もomit出来そう)。
ただし、先ほども書いたnpm publishに必要なトークンの管理が面倒という問題があるので、この部分が改善されてきたら、またリリースフローは変わりそうな気がしました。
