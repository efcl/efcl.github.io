---
title: "#jsprimer week: 2024-02-05 - 2024-02-11"
author: azu
layout: post
date : 2024-02-05T21:11
category: JavaScript
tags:
    - JavaScript

---

先週の[textlint week](https://efcl.info/2024/01/29/textlint-week/)に引き続き、今週はjsprimerの開発に集中する[jsprimer week](https://jsprimer.net/)です。

目標としては、次のECMAScript仕様であるES2024に入るProposalが今週の[TC39ミーティング](https://github.com/tc39/agendas/blob/main/2024/02.md)で確定するので、それに合わせてjsprimerをどう更新するかを決めることです。

- [ECMAScript 2024の対応 · Issue #1706 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1706)

ES2024の変更はそこまで大きなものはこなさそうなので大丈夫そうですが、Node.jsの変更が多くなってるので[Node.jsでCLIアプリ · JavaScript Primer #jsprimer](https://jsprimer.net/use-case/nodecli/)をどうするかをちょっと考えたいです。

- [markedjs v8へのアップデート · Issue #1694 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1694)
- [utils.parseArgsの利用法を追記 · Issue #1698 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1698)

また、企業でjsprimerの更新を支援できる仕組みとして[JavaScript Primer - Open Collective](https://opencollective.com/jsprimer)を作ってありますが、まだちゃんと運用できてないので、運用できるようにしたいです。

- [Open Source Collective · Issue #1674 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1674)

Open Collectiveの資金を使って、jsprimerの更新を手伝ってくれた方にもちゃんと労力にあった報酬を支払えるようにしたいです。

jsprimerの更新に興味があるって人は、それとなくコメントしてくれると嬉しいです。

- [ECMAScript 2024の対応 · Issue #1706 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1706)

ECMAScriptに合わせた更新は毎年やっているので、どういうことをやってるかは次のIssueを見るとイメージできると思います。
今年は、Array.groupByの更新ぐらいな気はしているので、そこまで大きな変更はないと思います。
どちらかというとNode.jsに関する更新は、どう変えると読みやすいかは考える必要がありそうです。

- [ECMAScript 2023の対応 · Issue #1658 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1658)
- [ECMAScript 2022の対応 · Issue #1337 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1337)
- [ECMAScript 2021の対応 · Issue #1220 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1220)
- [ECMAScript 2020の対応 · Issue #1145 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1145)

やる人が出てきたら、一回ミーティングをすると良いかもしれません。