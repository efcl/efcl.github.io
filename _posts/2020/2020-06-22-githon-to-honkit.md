---
title: "GitHon は HonKit に名前を変更しました(GitBookフォーク)"
author: azu
layout: post
date : 2020-06-22T15:13
category: 雑記
tags:
    - OSS
    - git
    - HonKit

---

先週リリースした[GitBook (Legacy)](https://github.com/GitbookIO/gitbook)のフォークであるGitHonですが、[HonKit](https://github.com/HonKit/HonKit)という名前にリネームしています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">GitBook(legacy)のメンテナンスが止まって困っていたので、ForkしてGitHonを作りました。<br>先週からやり始めたばかりですが、 <a href="https://t.co/jz2VoxJkk4">https://t.co/jz2VoxJkk4</a> は移行済みです。OSSなのでコントリビューターを募集しています！<br><br>&quot;GitBookをForkしてGitHonを作りました | Web Scratch&quot;<a href="https://t.co/VZApbXvsIU">https://t.co/VZApbXvsIU</a> <a href="https://t.co/E7boJHJDCx">pic.twitter.com/E7boJHJDCx</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1273875559689285633?ref_src=twsrc%5Etfw">June 19, 2020</a></blockquote>

[HonKit](https://github.com/HonKit/HonKit)(GitHon)自体の紹介については次の記事を参照してください。

- [GitBookをForkしてHonKitを作りました | Web Scratch](https://efcl.info/2020/06/19/githon/)

## GitHon → HonKit

[HonKit](https://github.com/HonKit/HonKit)という名前にリネームした理由ですが、次のIssueで`Git`に対する商標の問題があるかもというのを教えてもらったためです。

- [Uncertain use of Git name trademark · Issue #48 · honkit/honkit](https://github.com/honkit/honkit/issues/48)

`Git`を含む名称(for Gitとかではなく)は、Git SCMがもっている商標に触れる可能性があります。

- [About - Git](https://www.git-scm.com/about/trademark)
- [Git trademark status and policy - Jeff King](https://public-inbox.org/git/20170202022655.2jwvudhvo4hmueaw@sigill.intra.peff.net/)

元々、`GitBook`を名前を避けるために`GitHon`という名前にしていました(これも商標の問題がありそうだと思ったため)。
同じように`Git`自体にも商標の問題がありそうなので、どちらの単語も含まない名前として`HonKit`になりました。

HonKitという名前はこの辺のThreadで模索していますが、ランダム生成した単語から`Kit`という単語が良さそうだったのと、
元々つけていた`Hon`を足して[HonKit](https://github.com/HonKit/HonKit)になりました。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Array.from({ length: 26 }).forEach((_, i) =&gt; console.log(`${String.fromCharCode(65 + i)}itHon`) ) <a href="https://t.co/H08ocEUBNa">pic.twitter.com/H08ocEUBNa</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1274693495320539138?ref_src=twsrc%5Etfw">June 21, 2020</a></blockquote>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">うーん <a href="https://t.co/BAK8k6ZAS6">pic.twitter.com/BAK8k6ZAS6</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1274714760441823235?ref_src=twsrc%5Etfw">June 21, 2020</a></blockquote>

[HonKit](https://github.com/HonKit/HonKit)という名前は短めでよさそうだったので、商標のIssueが立ってから5時間ぐらいでプロジェクト全部書き換えています。

- [Rename GitHon to HonKit · Issue #52 · honkit/honkit](https://github.com/honkit/honkit/issues/52)

基本的にGitHubやNetlifyもリネームができるので特別な問題なく移行できています。
注意点としては、GitHubのorganizationはリネームするとそのorganizationそのものは404で再取得ができます。
`<owner>/<repo>`のリポジトリに関してはリダイレクトが効くようになるみたいです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">GitHub orgの再利用は結構気をつけないのかも<a href="https://t.co/5CviVOOAu4">https://t.co/5CviVOOAu4</a> は404になって<a href="https://t.co/IPcDa8nVpn">https://t.co/IPcDa8nVpn</a> はリダイレクトされる仕様</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1274755814587117574?ref_src=twsrc%5Etfw">June 21, 2020</a></blockquote>

また、npmにはリネーム機能自体がないので、単純に[`honkit`](https://www.npmjs.com/org/honkit)を作成しています。

GitHonはリリースしたばかりだったので、使っている人は少ないと思いますが、
GitHon → HonKitの移行については次を参照してください。

- [Migrate from GitHon to HonKit · Issue #54 · honkit/honkit](https://github.com/honkit/honkit/issues/54)
- [chore(deps): use HonKit instead of GitHon by azu · Pull Request #1189 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1189)

## HonKitの開発

今[@mizchi](https://github.com/mizchi)がコードベースをTypeScriptに書き換えてくれています。

- [TypeScript · Issue #24 · honkit/honkit](https://github.com/honkit/honkit/issues/24)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">今のHonKitのTS率。<br>数時間で20%ぐらいのコードが書き換わってる <a href="https://t.co/voHUY3RLsJ">pic.twitter.com/voHUY3RLsJ</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1274770182355836928?ref_src=twsrc%5Etfw">June 21, 2020</a></blockquote>

[Algolia DocSearch](https://github.com/honkit/honkit/issues/45)との連携や[Drop jQuery](https://github.com/honkit/honkit/issues/39)するには新しいデフォルトのテーマを作るのが正攻法な気がしてきたので次のIssueを作りました。

- [New default theme · Issue #57 · honkit/honkit](https://github.com/honkit/honkit/issues/57)

また移行中にロゴやアイコンについても考えていたので、次のIssueを作りました。
今は適当に作ったものがあるだけなので、興味がある人は意見ください。

- [Logo/Icon · Issue #55 · honkit/honkit](https://github.com/honkit/honkit/issues/55)

## まとめ

- [HonKit](https://github.com/HonKit/HonKit)は[GitBook (Legacy)](https://github.com/GitbookIO/gitbook)のFork
- GitHonは`Git`の商標の問題があるためHonKitにリネームした
- [HonKit](https://github.com/HonKit/HonKit)はいつでもContributingを待っています

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 