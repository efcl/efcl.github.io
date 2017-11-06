---
title: "textlintのコアをTypeScriptで書き直した、textlintの今後について"
author: azu
layout: post
date : 2017-11-06T10:43
category: JavaScript
tags:
    - textlint
    - JavaScript
    - TypeScript

---

[textlint 9.0.0](https://github.com/textlint/textlint/releases/tag/textlint%409.0.0 "textlint 9.0.0")をリリースしました。
textlint 9.0.0では[@textlint/kernel](https://github.com/textlint/textlint/tree/master/packages/textlint-kernel "@textlint/kernel")という内部的に使うコアモジュールをTypeScriptで書き直したバージョンが使われています。

元々textlintはNode.jsで動くように作られたため、`fs`モジュールなどNode.jsに依存しています。
そのため、ブラウザなどで動かす場合などはビルド時に色々工夫しないと動きません。

- [文書校正ツール textlint の Chrome 拡張を作った - もなでぃっく](http://io-monad.hatenablog.com/entry/2016/03/14/225800 "文書校正ツール textlint の Chrome 拡張を作った - もなでぃっく")
- [LocalStorageで誰でも安全にMarkdownでスライドやメモ作れるサービス作ったよ](https://muunyblue.github.io/823b2d10224a6a29f91fc7c0f46f1b8e.html "LocalStorageで誰でも安全にMarkdownでスライドやメモ作れるサービス作ったよ")

この問題をどうにかするためには、`textlint`というモジュールからロジックやLint処理部分だけをNode.jsなどに依存しない純粋なJavaScriptとして切り出す必要があります。

アドホックに対応するならブラウザ向けのbundleを[browser field](https://qiita.com/shinout/items/911e024368e2cb29fd3d "browser field")などで提供すれば終わりですが、長期的なことを考えるとモジュールを分けたほうが建設的です。

[textlint organization](https://github.com/textlint "textlint")を見ると分かるように[textlint][]はMarkdownパーサやトラバーサ、フォーマッターなどがモジュールとして各リポジトリに分けられていました。部品となるモジュールとリポジトリを1対1で分けると、Aをアップデートすると、Aに依存するBやCを更新するといったアップデートの連鎖反応が起きる問題があります。
また、新しいモジュールを切り出す心理的なコストがありました。

そのため、まずは`textlint`を構成するモジュールを1つのリポジトリにまとめたmonorepo化をすることにしました。

## monorepo

[textlint][]では[lerna](https://github.com/lerna/lerna "lerna")を使ってmonorepo化しています。これにより、モジュール間の依存のアップデートが1つのPRにまとめられるなどアップデートの連鎖反応がある程度自動化できるメリットがあります。
また、新しいモジュールを追加するのも単純にディレクトリを切るだけなので心理的なコストは軽減されます。

- [Setup monorepo · Issue #255 · textlint/textlint](https://github.com/textlint/textlint/issues/255)
- [Import * to monorepo · Issue #270 · textlint/textlint](https://github.com/textlint/textlint/issues/270)

一方、CIにかかる時間やpublishする際のコストは増加する傾向があります。
また、まだmonorepoにおけるリリースノートの戦略がイマイチ決まっていないという問題もあります。
これは[almin](https://github.com/almin/almin "almin")とか[textlint-rule-preset-google](https://github.com/textlint-rule/textlint-rule-preset-google "textlint-rule-preset-google")など、他にもmonorepoをやっているのでいい方法を見出したいです。

- [Lerna(monorepo)とCHANGELOG(リリースノート) - Qiita](https://qiita.com/azu/items/4b9fc8d4df78f2216901 "Lerna(monorepo)とCHANGELOG(リリースノート) - Qiita")

## [@textlint/kernel][]

monorepo化がひとまずできたので、[textlint 8.1.0](https://github.com/textlint/textlint/releases/tag/textlint%408.1.0 "textlint@8.1.0")で`textlint`モジュールから[@textlint/kernel][]というコアモジュールを切り出しました。(Coreという名前じゃないのは既にCoreという名前を使ったものがあったため)
[@textlint/kernel][]は`fs`などNode.js特有のものに依存してないような作りになっているので普通にwebpackやbrowserifyなどでビルドすれば動作します。

- [Carve out textlint core logic into @textlint/kernel by azu · Pull Request #292 · textlint/textlint](https://github.com/textlint/textlint/pull/292 "Carve out textlint core logic into @textlint/kernel by azu · Pull Request #292 · textlint/textlint")

今回の[textlint 9.0.0](https://github.com/textlint/textlint/releases/tag/textlint%409.0.0 "textlint 9.0.0")ではさらにこの[@textlint/kernel](https://github.com/textlint/textlint/tree/master/packages/textlint-kernel "@textlint/kernel")をTypeScriptに書き換えました。理由としては[@textlint/kernel][]はロジックの塊であることと今後のリファクタリングのしやすさを考えたためです。

- [refactor(textlint-kernel): Convert JavaScript to TypeScript by azu · Pull Request #301 · textlint/textlint](https://github.com/textlint/textlint/pull/301 "refactor(textlint-kernel): Convert JavaScript to TypeScript by azu · Pull Request #301 · textlint/textlint")

> TL;DR: both Flow and TypeScript are pretty good, and conservatively either of them can prevent about 15% of the bugs that end up in committed code.  
> <https://blog.acolyer.org/2017/09/19/to-type-or-not-to-type-quantifying-detectable-bugs-in-javascript/>

JavaScriptに型注釈を加えることで15%程度バグを減らすことができるという話もありますが、IDEなどでリファクタリングがしやすくなるメリットは大きいです。(名前に依存した壊れたリファクタリングが発生しにくい)

JavaScriptからTypeScriptへの移行方法は次の記事で書いてるような手法を取っています。

- [JavaScriptのライブラリを徐々にTypeScriptに移行する | Web Scratch](http://efcl.info/2017/07/17/JavaScript-to-TypeScript/ "JavaScriptのライブラリを徐々にTypeScriptに移行する | Web Scratch")

まだ単に型を付けただけであったり、テストはTypeScriptになってなかったりします。
本体の`textlint`の方もTypeScript化したいので興味がある人は次のIssueを参照してください。

- [Use with TypeScript · Issue #248 · textlint/textlint](https://github.com/textlint/textlint/issues/248 "Use with TypeScript · Issue #248 · textlint/textlint")

また、まだルール側をTypeScriptで書きやすくなってはいないのでその辺もどうにかしたいですね。

## 今後

textlintはルールを気軽に作れるようにする土台を作ることが目的です。

- [JavaScriptでルールを書けるテキスト/Markdownの校正ツール textlint を作った | Web Scratch](http://efcl.info/2014/12/30/textlint/ "JavaScriptでルールを書けるテキスト/Markdownの校正ツール textlint を作った | Web Scratch")

今回色々リファクタリングして、[@textlint/kernel][]の分離でLint以外への発展も少し見えてきています。Lintは入力に対して解答(正否)を出さないと行けないですが、[textstat](https://github.com/azu/textstat "textstat")のように統計データを出したり、[Glosser](http://www.academia.edu/154001/Glosser_Enhanced_Feedback_for_Student_Writing_Tasks "Glosser")のようなフィードバックエンジンを作ってみたいです。

また、現在textlintに関係する[リポジトリは200以上](https://github.com/search?utf8=%E2%9C%93&q=textlint)、textlint[ルールは100以上](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule)あります。
ただ、半分以上は自分が関連しているものなので、もっと属人性を解消して安定させたいです。

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr">textlint 200 repositories. <a href="https://t.co/ZpF7DeuSLr">pic.twitter.com/ZpF7DeuSLr</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/924671458898358272?ref_src=twsrc%5Etfw">October 29, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

もっと安定して良くしていくために、textlint organizationのコラボレーターを募集しています。最初からコラボレーター(リリース権限とかもてる人)というのも互いに変ではあるので、まずはコントビューションしてくれる人を募集しています。

textlintではどういうところが足りてない、直せるのかなどについて簡単にまとめてみます。

## [textlint](https://github.com/textlint/textlint "textlint")へのコントビューション

相談したいことがある場合はGitterに日本語のchatがあるのでそちらを使ってみてください。
(これどうやって直せばいいのとか？)

[![Gitter](https://badges.gitter.im/textlint-ja/textlint-ja.svg)](https://gitter.im/textlint-ja/textlint-ja?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## textlintを直す

[Contributing Guide](https://github.com/textlint/textlint/blob/master/.github/CONTRIBUTING.md "Contributing Guide")にコミット方法やテスト方法など一通りのやり方は書いてあります。

### ドキュメントを直す

- 適当な英語が多いので修正歓迎

### ドキュメントを追加する

- ルールの作り方とかもっと具体例のドキュメント増やしたい
- こういうのがわからないというIssueを立てるでもよさそう

### コアを直す

- textlintはmonorepoになっているので[textlint](https://github.com/textlint/textlint "textlint")に色々なパッケージが入っています。
    - monorepoへの移行が完璧ではないのでそれをなおすのも歓迎です
    - [Import * to monorepo #270](https://github.com/textlint/textlint/issues/270 "Import * to monorepo #270")

[`label:"good for beginner"`](https://github.com/textlint/textlint/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+for+beginner%22 "Issues · textlint/textlint")というラベルが付いてるものは、比較的やることがはっきりしています。
そのため最初のコントビューションとして手が出しやすいかもしれません。

また、textlintはあまりパフォーマンスの最適化がまだ行われていません。[markdown-parser](https://github.com/textlint/textlint/blob/master/packages/markdown-to-ast/src/markdown-parser.js "markdown-parser")など明らかに無駄な処理をしている部分があります。
一方、500以上のユニットテストや典型的なユースケースの[Exampleテスト](http://efcl.info/2015/07/29/example-test-on-npm/ "Exampleテスト")、実際の文章を使った[Integration test](https://github.com/textlint/textlint/tree/master/test/integration-test "Integration test")などが書かれています。
そのため、壊れるとテストが落ちるはずなのでパフォーマンスの改善やリファクタリングなどはある程度し易いかもしれません。

TypeScriptで書きたいという人は、textlint本体もTypeScript化したり、型定義を整理したりすると良いかもしれません。

- [Use with TypeScript #248](https://github.com/textlint/textlint/issues/248 "Use with TypeScript #248")

また、textlintをブラウザでもっと簡単に上手く動かしたいという人は次のIssueにどういうものがあると便利なのかやPOCを作ってみると良いかもしれません。

- [@textlint/browser · Issue #299 · textlint/textlint](https://github.com/textlint/textlint/issues/299 "@textlint/browser · Issue #299 · textlint/textlint")

## ルールを直す

- textlintはデフォルトでルールをもっていません
- そのためすべてのルールはプラグイン扱いです
- ルール一覧は[Collection of textlint rule · textlint/textlint Wiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · textlint/textlint Wiki")にあります
- 各ルールにPull RequestやIssueを立てるのがよさそうです
- [textlint-ja](https://github.com/textlint-ja "textlint-ja")で管理している日本語専用のルールは、日本語が分かる人じゃないと使わないので、Issueなどは日本語で問題ないです


## ルールを追加する

textlintのルールを置く場所には特に制限はありません。また自由にルールを書けます。

- ルールの作り方: [Creating Rules](https://github.com/textlint/textlint/blob/master/docs/rule.md "Creating Rules")

ただ一度作ったルールがメンテナンスされなくなってしまうのはもったないので、[textlint-rule](https://github.com/textlint-rule/ "textlint-rule")と[textlint-ja](https://github.com/textlint-ja "textlint-ja")は[Maintenance Guidelines for Organization](https://maintenance-guidelines-for-organization.github.io/ "Maintenance Guidelines for Organization")というガイドラインの元にしています。

人がボトルネックになることを避けるため、人が正しいことをできるように信用することという原則を元にしてリポジトリやnpmパッケージの権限を共有できるようにするという方針です。
そのため、textlintルールを作ったはいいけど置き場所や管理が不安というは、Organizationに参加してみるといいかもしれません。

それぞれoranizationも用意してあるので興味がある人は、[@azu_re](https://twitter.com/azu_re)か[Gitter](https://gitter.im/textlint-ja/textlint-ja)で言ってもらえれば inviteします。

- 日本語専用のルール: [textlint-ja](https://github.com/textlint-ja "textlint-ja")
- その他のルール: [textlint-rule](https://github.com/textlint-rule/ "textlint-rule")

[textlint@9.1.1](https://github.com/textlint/textlint/releases/tag/textlint%409.1.1 "textlint@9.1.1")でscoped moduleのサポートを拡張したのもこういったOrganizationでのルール管理のしやすさを改善するためでもあります。

```json
{
  "rules": {
    "@textlint-rule/preset-google": true
  }
}
```

## ルールを紹介する

自分が使っているルールや設定をブログなどで紹介するのも貢献です。

## ツールを良くする

textlintのElectronアプリがありますがそこまで作り込まれてません。

- [textlintのElectronアプリを作った | Web Scratch](http://efcl.info/2017/05/12/textlint-app/)
- [textlint/textlint-app: textlint standalone application top on Electron.](https://github.com/textlint/textlint-app)

textlintのルールをコマンド一発で作り始めることができるツールがあります。
コーパスを使ってルールをチェックしやすくするなどもっと色々な工夫をして、ルールづくりを簡単にできると嬉しいです。

- [textlintのルールを簡単に作り始めることができるツールを作りました | Web Scratch](http://efcl.info/2016/12/14/create-textlint-rule/)
- [textlint/create-textlint-rule: Create textlint rule project with no configuration.](https://github.com/textlint/create-textlint-rule)
- [textlint-ja/technological-book-corpus-ja: 日本語で書かれた技術書のコーパス](https://github.com/textlint-ja/technological-book-corpus-ja "textlint-ja/technological-book-corpus-ja: 日本語で書かれた技術書のコーパス")

## ウェブサイト

textlintのウェブサイト兼オンラインデモとして[textlint - pluggable linting tool for text and markdown](https://textlint.github.io/ "textlint - pluggable linting tool for text and markdown")があります。

こちらも[`label:"good for beginner"`](https://github.com/textlint/textlint.github.io/labels/good%20first%20issue "Issues · textlint/textlint.github.io")のラベルがついたIssueがあります。

## その他

[textlintの直し方](https://gist.github.com/azu/2b482e8e2aa636970f5f6110f6488719 "textlintの直し方")に簡単にコントビューション方法についてまとめています。


[textlint]: https://github.com/textlint "textlint"
[@textlint/kernel]: https://github.com/textlint/textlint/tree/master/packages/textlint-kernel
