---
title: "Maintainer Month: オープンソースのメンテナーがやっている仕事"
author: azu
layout: post
date : 2022-07-01T20:48
category: 雑記
tags:
    - OpenSource
    - MaintainerMonth

---

2022年の6月は、GitHub主催で[Maintainer Month](https://maintainermonth.github.com/)は、オープンソースのメンテナーが集まって情報共有したり、メンテナーを祝ったり、支援したりするイベントが行われていました。

- [Welcome to Maintainer Month! 🎉 | The GitHub Blog](https://github.blog/2022-06-01-welcome-to-maintainer-month/)

Maintainer Monthに気づいたのは[Thank you to our maintainers | The GitHub Blog](https://github.blog/2022-06-24-thank-you-to-our-maintainers/)のとき(6/24)なのだったので、残り一週間でしたがオープンソースのメンテナンスとメンテナーについて色々書いていました。

- [Maintainer Month: epubリーダーアプリ bi-epub-readerを作った | Web Scratch](https://efcl.info/2022/06/25/bi-epub-reader/)
- [Maintainer Month: オープンソースをメンテナンスするコツ | Web Scratch](https://efcl.info/2022/06/27/maintenance-open-source/)
- [Maintainer Month: なぜtextlintを作ったか | Web Scratch](https://efcl.info/2022/06/29/why-create-textlint/)
- [初めてでもわかる、GitHub Sponsorsでオープンソースを支援する方法](https://zenn.dev/azu/articles/c48ad63e20ad75)

オープンソースのメンテナーそのものに関する話って意外と書く機会がないので、ちょうどいい機会だと思って書いてみました。
[Maintainer Month](https://maintainermonth.github.com/)のイベントの目的もそうですが、メンテナーとしての自分の話を色々書いてみたので興味があったら読んでみてください。

## オープンソースのメンテナーがやっている仕事(タスク)

[Maintainer Month](https://maintainermonth.github.com/)は6月で終わったので、6月にやっていたオープンソースのメンテナンス関係のタスクを振り返ってみます。
実際オープンソースのメンテナンスでどういうことやってるのかを参考になるかなーと思います。

自分は色々なオープンソースをやるタイプなので、それぞれライブラリ/ツール/プロダクトなどで書いていきます。

### [JavaScript Primer](https://jsprimer.net/)

これは、今年の1月ぐらいから徐々にやっていましたが[jsprimer](https://jsprimer.net/)をES2022に対応しました。
ES2022の仕様に合わせてリリースする予定だったので、事前にリリースノートまでは用意しておいて、リリースされた記事などを書いてリリースしました。

- [JavaScript Primer 4.0.0: ECMAScript 2022に対応したJS本 | Web Scratch](https://efcl.info/2022/06/19/jsprimer-4/)

ES2022は結構変更が多かったので大変だった。

### [textlint](https://textlint.github.io/)

[RFC: Improve error location · Issue #835 · textlint/textlint](https://github.com/textlint/textlint/issues/835)というエラー位置の詳細情報を含めるというRFCを実装を完了して、リリースまで持っていくのをやっていました。

- [Release v12.2.0 · textlint/textlint](https://github.com/textlint/textlint/releases/tag/v12.2.0)- 

実装自体は、結構前に大体できていたんですが、結構大きな範囲の変更(ファイルを100コ近くいじってる)が必要になってしまって、その確認が重たくて放置していました。
これが、[Maintainer Month: オープンソースをメンテナンスするコツ](https://efcl.info/2022/06/27/maintenance-open-source/)でも言ってた、「小さなリズム」でやるべき理由でもありますね。

- [feat(textlint): add `padding` property and `locator` by azu · Pull Request #836 · textlint/textlint](https://github.com/textlint/textlint/pull/836)

この過程でバリデーションを色々強化していたのですが、[GitHub Copilot](https://github.com/features/copilot)の補完が便利でした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">こういうバリデーション書くのが楽 <a href="https://t.co/saKxJwgPE3">pic.twitter.com/saKxJwgPE3</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1540556133634494465?ref_src=twsrc%5Etfw">June 25, 2022</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

そのほかには、Twitterで[textlint関係のエラーの話](https://twitter.com/gen_sobunya/status/1542434566660845568)をみて、詳細を[Issueとして作って](https://github.com/textlint/textlint/issues/878)もらって、調べてみたらtextlintのコアではなく[ルール側のバグだった](https://github.com/textlint-ja/textlint-rule-preset-JTF-style/issues/101)のでこれを修正していました。textlintのコア自体は大きくならないようにしてますが、調べてみないとどっちのバグか分かりにくいという状況はたまにあります。

- [Release v2.3.13 · textlint-ja/textlint-rule-preset-JTF-style](https://github.com/textlint-ja/textlint-rule-preset-JTF-style/releases/tag/v2.3.13)

この辺ももっと切り分けがしやすくできるといいなーと思いながら、修正していました。

### [github-advisory-database-rss](https://github.com/azu/github-advisory-database-rss)

[github-advisory-database-rss](https://github.com/azu/github-advisory-database-rss)という[GitHub Advisory Database](https://github.com/advisories)の脆弱性情報をRSSとして取得できるサイトを作ってます。

[GitHub Advisory Database](https://github.com/advisories)がErlangとElixirに対応したので、[RSS Feeds for GitHub Advisory Database](https://azu.github.io/github-advisory-database-rss/)も同じく対応していました。

- [GitHub Advisory Database now includes Erlang and Elixir advisories | GitHub Changelog](https://github.blog/changelog/2022-06-27-github-advisory-database-now-includes-erlang-and-elixir-advisories/)

ついでなので、依存関係も一緒にアップデートしていました(自分はこういうときに依存も上げてしまうこと多い)。

- https://github.com/azu/github-advisory-database-rss/commit/0359a05303691783a6e9b0372b1b79bd8fbd9cec

### TypeScriptを使ったNode.js ESMの対応(失敗)

[check-ends-with-period](https://github.com/azu/check-ends-with-period)というライブラリはTypeScriptで書かれています。
[TypeScript 4.7+](https://devblogs.micrtyosoft.com/typescript/announcing-typescript-4-7/)でNode.js ESMサポートしたというのでこのライブラリで実験してみようと思って対応していました。

実際にやってみたらできないという現実にぶつかって失敗しました。

理想的には、同じ`src/*.tx`からCJS向けのファイルとESM向けのファイルをそれぞれ出力したいという構成でやりたい感じでした。

- [`tsconfig.json`](https://github.com/azu/check-ends-with-period/blob/v2.0.0/tsconfig.json) : generates esm to `module/*.js` from `src/*.ts`
- [`tsconfig.cjs.json`](https://github.com/azu/check-ends-with-period/blob/v2.0.0/tsconfig.cjs.json): generates cjs to `lib/*.js` from `src/*.ts`

TypeScriptでは、ESMをimportするには`.ts`のファイルで`import foo from "./foo.js"` のように`.js`拡張子をつけてimportする必要があります
しかし、[TypeScript Design Goals](https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Goals)では、import pathを書き換えないなどの原則があります。
また、Node.jsのESMサポートは`type: module`と`package.json`に書くと、`.js`ファイルはESMとして扱われます。これは同じ`.js`拡張子でESMとCJSを出し分けるのが無理という話になっています。
(ものすごい[非合法的なハック](https://github.com/nodejs/node/issues/34515#issuecomment-664209714)はあります。)

TypeScriptのデザインとNode.jsのESMサポートの仕組みが噛み合ってなくて、`tsconfig`ファイルでCJSとESMをだし分けたいみたいなやり方ができないことに気がつきました。
詳細は同じような話をしていたIssueに書いています。

- [Feature Request: allow change file extension of generated files from `.ts` · Issue #49462 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/issues/49462)

なのでやってみたけど、失敗して保留しています。(もちろんbundlerとか別のツールを使えばできるけど、`tsc`のみでやりたい)

### [safe-marked](https://github.com/azu/safe-marked)

[safe-marked](https://github.com/azu/safe-marked)は[marked](https://marked.js.org)と[DOMPurify](https://github.com/cure53/DOMPurify)を組み合わせて、デフォルトで安全なHTMLを出力するMarkdown変換器です。

内部的に使ってるJSDOMがメジャーアップデートしてたので、更新してました。
このリポジトリはrenovatebotでmajorのPRが出るので、それに反応して作業してます。

- [Release v11.0.0 · azu/safe-marked](https://github.com/azu/safe-marked/releases/tag/v11.0.0)

### [Secretlint](https://github.com/secretlint/secretlint)

[Secretlint](https://github.com/secretlint/secretlint)は、パスワードとかAPIトークンとかの機密情報をチェックするLintツールです。

- [SecretlintでAPIトークンや秘密鍵などのコミットを防止する | Web Scratch](https://efcl.info/2020/03/24/secretlint/)

こっちも[TypeScript 4.7](https://devblogs.micrtyosoft.com/typescript/announcing-typescript-4-7/)で、CJSでのDynamic Importが正式にサポートされたので、TSをアップデートしたのでそこに対応していました。CJSでのDynamic Importは、ESMでルールとかプラグインを書くために必要になってます。

- [🛡🔑 Secretlint 4.0.0: ESMで書かれたルールのサポート、secretlint-disableコメントのサポート | Web Scratch](https://efcl.info/2021/09/15/secretlint-4.0.0/)
  - 以前対応したときDynamic Importの問題について書いている
- [fix(config-loader): use native import() by azu · Pull Request #275 · secretlint/secretlint](https://github.com/secretlint/secretlint/pull/275)

また、`secretlintignore`で`-`が使えないバグが報告されたので、これを修正していました。

- [Invalid escape error when using `-` in secretlintignore · Issue #285 · secretlint/secretlint](https://github.com/secretlint/secretlint/issues/285)

あとは、SecretlintのDocker ImageにSARIFフォーマットの対応が入ってた方がいいんじゃない?というIssueがきたので、そうだよねって話をしてPR出してもらって入れていました。

- [Install a package that handles sarif with Docker images · Issue #278 · secretlint/secretlint](https://github.com/secretlint/secretlint/issues/278)

### [HonKit](https://github.com/honkit/honkit)

[HonKit](https://github.com/honkit/honkit)はGitBookのForkですが、GitBook時代からある気がするバグが報告されたのでそれを修正していました。

- [honkit parse on a multilingual book failes · Issue #270 · honkit/honkit](https://github.com/honkit/honkit/issues/270)

### [@security-alert](https://github.com/security-alert/security-alert)

SARIFファイルをGitHubのコメントとして書いたり、整形できる[@security-alert](https://github.com/security-alert/security-alert)をツールをやっていて、
最近これのCo-Authorが増えたのでレビューとかしていました。
あとはOrganizationに移したり、allstar設定したりとかしていました。

- [Fix: --failon process exit code by Gby56 · Pull Request #44 · security-alert/security-alert](https://github.com/security-alert/security-alert/pull/44)
- [FEAT: add --fail-on for commenting by Gby56 · Pull Request #41 · security-alert/security-alert](https://github.com/security-alert/security-alert/pull/41)

### [JSer.info](https://jser.info/)

毎週記事を書いた。

- [2022-06-01のJS: Lerna 5.0.0、TypeScript 4.7、wireit - JSer.info](https://jser.info/2022/06/01/lerna-5.0.0-typescript-4.7-wireit/)
- [2022-06-06のJS: Angular 14、Cypress 10、Vue 2.7 α - JSer.info](https://jser.info/2022/06/06/angular-14-cypress-10-vue-2.7-a/)
- [2022-06-15のJS: Safari 16 Beta、Fastify v4、Node.js 16のEOLの予定日の変更 - JSer.info](https://jser.info/2022/06/15/safari-16-beta-fastify-v4-node.js-16eol/)
- [2022-06-21のJS: Internet Explorer 11のサポート終了、Vue 2.7 Beta、社内のReactコンポーネントのメンテナンス - JSer.info](https://jser.info/2022/06/21/internet-explorer-11-vue-2.7-beta-react/)
- [2022-06-28のJS: ECMAScript 2022、TypeScript 4.8 Beta、CodeMirror 6 - JSer.info](https://jser.info/2022/06/28/ecmascript-2022-typescript-4.8-beta-codemirror-6/)

## まとめ

6月にやっていたオープンソース活動はこんな感じでした。

基本的に重要な通知はいまだにメールで受け取っていますが、メール開く気分じゃないときって結構あるので、Issueのトリアージとかだけでもやってくれる人いると結構助かるなーって印象です。
でも、Issueのトリアージやってくれる人って意外と多くないから、結構難しいだよなーって感じもしました。(いい感じにHelp Wantedを明示できるといいのだけど)