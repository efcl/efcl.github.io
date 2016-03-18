---
title: "textlint 6.0リリース。--fixでの自動修正に対応"
author: azu
layout: post
date : 2016-03-15T20:33
category: JavaScript
tags:
    - textlint
    - JavaScript
    - ReleaseNode

---

[textlint](https://textlint.github.io/ "textlint") 6.0をリリースしました。

- [Release 6.0: --fix to be stable · textlint/textlint](https://github.com/textlint/textlint/releases/tag/6.0.1 "Release 6.0: --fix to be stable · textlint/textlint")

モジュールとして使っている場合に、細かな破壊的な変更があります。
ツールとして使っている人は単純に`npm install textlint@6 -D`などでアップデートすれば動くと思います。

textlint自体については以下を見てください。

- [textlintで日本語の文章をチェックする | Web Scratch](http://efcl.info/2015/09/10/introduce-textlint/)
- [ルールプリセットを使ってお手軽にtextlint入門 | Web Scratch](http://efcl.info/2015/12/30/textlint-preset/)

## `--fix`による自動修正の対応

[5.5.3: --fix & --experimental support](https://github.com/textlint/textlint/releases/tag/5.5.3 "5.5.3: --fix &amp; --experimental support")で`--fix`による自動修正機能を実験的にサポートしていました。

6.0では`--fix`を`--experimental`フラグなしで利用できるようになりました。

自動修正はルール側で対応が必要 かつ 原理的に自動修正が難しいルールもあると思うので、あくまでサポート的な機能です。

[Wiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule)にまとめてあるルールのうち、✔ fixableマークが付いてるものは対応しています。

対応しているルールをfixableルールと呼んでいて、以下のバッジをつけています。

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

現状では以下のようなルールが`--fix`に対応しています。

- [azu/textlint-rule-prh: textlint rule for prh.](https://github.com/azu/textlint-rule-prh "azu/textlint-rule-prh: textlint rule for prh.")
- [azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.](https://github.com/azu/textlint-rule-preset-JTF-style "azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.")
- [azu/textlint-rule-spellcheck-tech-word](https://github.com/azu/textlint-rule-spellcheck-tech-word "textlint-rule-spellcheck-tech-word")
- [io-monad/textlint-rule-common-misspellings: textlint rule to check common misspellings](https://github.com/io-monad/textlint-rule-common-misspellings)
- [io-monad/textlint-rule-general-novel-style-ja: textlint rule to follow general style of Japanese novels](https://github.com/io-monad/textlint-rule-general-novel-style-ja)
- [nodaguti/textlint-rule-spellchecker: textlint rule to check spellings with native spellchecker](https://github.com/nodaguti/textlint-rule-spellchecker)
- [nodaguti/textlint-rule-ginger: textlint rule to check your English grammar with Ginger Proofreading](https://github.com/nodaguti/textlint-rule-ginger)

fixableルールは[prhと辞書を使った表記揺れの統一](http://efcl.info/2015/09/14/textlint-rule-prh/)や[JTF日本語標準スタイルガイドを使った表記の統一](http://efcl.info/2015/10/19/textlint-plugin-JTF-style/)など、辞書ベースやスタイルの統一を簡単になるのが利点です。

逆に表現的なものをチェックするルールは自動修正が難しく、頑張ってもサジェストのような推敲支援になると思います。

- [東京Node学園祭2015で技術文書をソフトウェア開発する話をしてきた | Web Scratch](http://efcl.info/2015/11/07/nodefest-2015/ "東京Node学園祭2015で技術文書をソフトウェア開発する話をしてきた | Web Scratch")
- [校正と推敲 | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/slide/90.html "校正と推敲 | 技術文書をソフトウェア開発する話")
- [編集は「自動化」されていく仕事なのか　編集者のためのイベント「編む庭 」レポ【前編】 - はてな編集部ブログ「編む庭」](http://editor.hatenastaff.com/entry/2016/03/17/113000 "編集は「自動化」されていく仕事なのか　編集者のためのイベント「編む庭 」レポ【前編】 - はてな編集部ブログ「編む庭」")

[textlint](https://github.com/textlint/textlint "textlint")は校正支援として始めたツールなので、まだ推敲支援のような要素は入っていません。
以下のIssueでそのようなサジェストをどう扱うかについて話し合ってるので興味がある人は見てください。

- [Feature Request: Multiple fix results and interactive fix · Issue #158 · textlint/textlint](https://github.com/textlint/textlint/issues/158 "Feature Request: Multiple fix results and interactive fix · Issue #158 · textlint/textlint")

また`--fix`はread onlyなlintと違ってwrite処理であるため、バグを作りやすいです。
自分もリリースしてからあるルールでバグがあることに気づいたので、そういうのをテストする方法については以下で話し合っています。

- [Document: add "How to test your rule?" · Issue #136 · textlint/textlint](https://github.com/textlint/textlint/issues/136 "Document: add &#34;How to test your rule?&#34; · Issue #136 · textlint/textlint")

使用してバグを見つけたら、

- それが特定のルールのバグであるならルールのリポジトリへ
- そうでなくて`textlint`のバグであるなら[textlint](https://textlint.github.io/ "textlint")へ

報告してください。

バグ報告の仕方については以下を参考にしてください。

- [textlint Bug Reporting](https://gist.github.com/azu/913454a54ea8ef59ba30 "textlint Bug Reporting")
- [textlint/CONTRIBUTING.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/CONTRIBUTING.md#bug-reporting "textlint/CONTRIBUTING.md at master · textlint/textlint")

## Fixableルール

実際に`--fix`による自動修正の例を見てみます。

このブログのリポジトリ対象にしてみます。

```
git clone https://github.com/efcl/efcl.github.io
cd efcl.github.io
```

次に`textlint`とfixableに対応してる3つのルール/プリセットをインストールします。

- [azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.](https://github.com/azu/textlint-rule-preset-JTF-style "azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.")
- [textlint-rule-spellcheck-tech-word](https://github.com/azu/textlint-rule-spellcheck-tech-word "textlint-rule-spellcheck-tech-word")
- [io-monad/textlint-rule-common-misspellings: textlint rule to check common misspellings](https://github.com/io-monad/textlint-rule-common-misspellings)

```
npm i -D textlint textlint-rule-preset-jtf-style textlint-rule-spellcheck-tech-word textlint-rule-common-misspellings
```

インストールし終わったら、`.textlintrc`にインストールしたルールを使うように設定します。
(`--rule`や`--preset`オプションでも指定できますが毎回やるのは面倒なので)

```sh
$(npm bin)/textlnt --init
```

というコマンドを叩くと、空の`.textlintrc`設定ファイルが作成されるので、編集して次のような設定をします。

```json
{
  "rules": {
  	"preset-jtf-style": true,
  	"spellcheck-tech-word": true,
  	"common-misspellings": true
  }
}
```

この状態でチェックしたいファイルを指定すれば`textlint`でLintすることができます。

自分の今まで書いてきた全記事のうちMarkdownをこのルールでLintしてみます。

```
$(npm bin)/textlint _posts/

...
✖ 6091 problems (6091 errors, 0 warnings)
✓ 5639 fixable problems.
Try to run: $ textlint --fix [file]
```

![result of linting](http://efcl.info/wp-content/uploads/2016/03/16-1458133066.png)

絶望的な数のエラーが表示されました…

デフォルトのformatterである`-f stylish` または `-f pretty-error`では、
Lintの結果にそのうち自動修正できるエラーの数を表示してくれます。

この数値は実際に修正できる数とは必ずしも一致しません。ルール間は独立しているので、重複や衝突が存在しているためです。基本的には衝突しないように修正を逐次的に処理していく形になります。

このエラーを実際に`--fix`で修正してみたいと思います。

修正する前に、対象のファイルは必ず復元できるように、バックアップを取るかGitにコミットしておくなどしてください。
また、`--dry-run`オプションを使うことで、実際にファイルの上書きはしないでどのような変更が行われるかを見ることができます。

変更を比較する場合は `-f diff` でdiff表示をするformatterを利用すると分かりやすいです。
(`--fix`は本当に逐次的に処理するので、ルールやファイルが多いと掛け算的に処理時間が増えます)

```
$(npm bin)/textlint _posts --fix --dry-run -f diff
# 実際に変更は反映しないでdiffだけをみる

....
✔ Fixed 5713 problems
✖ Remaining 73 problems
```

![result of fixing](http://efcl.info/wp-content/uploads/2016/03/16-1458133752.png)

✖ 6091 problemsのうち✔ Fixed 5713 problemsが自動で修正することができます。
`--dry-run`で問題ないのが確認できたら、`--fix`のみにして上書き保存できます。

```
$(npm bin)/textlint _posts --fix
```

![fix error](http://efcl.info/wp-content/uploads/2016/03/16-1458134174.png)

## textlint v5からv6の変更点

[textlint 5.0.0までの変更点](http://efcl.info/2015/11/20/textlint5.0.0/ "textlint 5.0.0")については以前書いたので、5.0から6.0までにあった変更点を列挙してみます。

### [5.1.0](https://github.com/textlint/textlint/releases/tag/5.1.0 "5.1.0")

`textlint-rule-preset`をサポートしました。
ルールプリセットは個別のルールをまとめたモジュールという位置づけです。

もちろん内蔵しているルール個別に設定を`.textlintrc`に書くことができるので、
一つのルールに沢山のチェック機能を設けるよりも、個別のルールに分けてルールプリセットとして公開することを推奨しています。

- [ルールプリセットを使ってお手軽にtextlint入門 | Web Scratch](http://efcl.info/2015/12/30/textlint-preset/ "ルールプリセットを使ってお手軽にtextlint入門 | Web Scratch")

### [5.2.0](https://github.com/textlint/textlint/releases/tag/5.2.0 "5.2.0")

`textlint-formatter-<name>`のようなモジュールを`--formatter <name>`という形で指定できるようになりました。

これを利用したカバレッジを出力するformatterを公開しています。

- [azu/textlint-formatter-lcov: textlint formatter for lcov format](https://github.com/azu/textlint-formatter-lcov)
- [azu/textlint-formatter-codecov: textlint formatter for codecov json.](https://github.com/azu/textlint-formatter-codecov)
- [textlintで文章カバレッジレポートを継続的に見ていく | Web Scratch](http://efcl.info/2016/01/12/textlint-coverage/ "textlintで文章カバレッジレポートを継続的に見ていく | Web Scratch")

formatterの作り方はドキュメントを見てください。

- [textlint/formatter.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/docs/formatter.md "textlint/formatter.md at master · textlint/textlint")

### [5.3.0](https://github.com/textlint/textlint/releases/tag/5.3.0 "5.3.0")

`--stdin-filename` をサポートしました。

```
cat readme.md | textlint --format compact --stdin --stdin-filename readme.md
```

という感じで標準入力のテキストに対して擬似的な名前を付けることができます。
(拡張子に対応した種類のファイルとしてtextlintが処理するため)

この仕組はSublimeプラグインを作るのに使われています

- [SublimeLinter-textlint](https://github.com/joeybaker/sublimelinter-textlint "SublimeLinter-textlint")

### [5.4.0](https://github.com/textlint/textlint/releases/tag/5.4.0 "5.4.0")

`.textlintrc`ファイルを作成する`--init`オプションが追加されました。

```
textlint --init
```

で空の`.textlintrc`ファイルを作成してくれます。

まだ色々改良の余地があるので興味がある人は以下のIssueを見てください。

- [--init options: Create .textlintrc file · Issue #129 · textlint/textlint](https://github.com/textlint/textlint/issues/129 "--init options: Create .textlintrc file · Issue #129 · textlint/textlint")

### [5.5.3](https://github.com/textlint/textlint/releases/tag/5.5.3 "5.5.3")

`--fix`と`--experimental`を実験的にサポートしました。
ここで実験的に追加した`--fix`は6.0.0で正式サポートとなります。

### [5.6.0](https://github.com/textlint/textlint/releases/tag/5.6.0 "5.6.0")

ルール開発者向けに`RuleError`が`index`プロパティをサポートしました。

```js
var ruleError = new context.RuleError("Found rule error", { index: paddingIndex });
```

正確なエラーの位置を簡単に指定できます。
今まで通り、`column`と`line`の組み合わせでも問題ないですが、`column`単独の指定は`index`に書き換える事を推奨しています。

- [textlint/rule.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/docs/rule.md#ruleerror "textlint/rule.md at master · textlint/textlint")
- [textlint/failed-to-load-textlints-module.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/docs/faq/failed-to-load-textlints-module.md "textlint/failed-to-load-textlints-module.md at master · textlint/textlint")

[textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester")でテストしている場合は、`column`単独の場合には警告を出してくれます。

## [5.7.0](https://github.com/textlint/textlint/releases/tag/5.7.0 "5.7.0")

5.7.0では一部formatterがエラーとそのエラーが自動修正できるかを出すようになりました。

## 6.0.0

6.0.0では

- `--dry-run`のサポート(`--fix`と組み合わせて使います)
- `--fix`からexperimentalフラグが外れました
- `--fix`向けのformatterとして`-f diff`を追加しました

モジュールとして使う場合に関連するものとして

- `TextLintEngine#setRulesBaseDirectory` が削除されました
- `TextFixEngine`が追加されました
  - `--fix`における処理を扱うEngineです
- `TextLintCore#setupProcessors`が追加されました
  - [Processor](https://github.com/textlint/textlint/blob/master/docs/plugin.md "Processor")を設定するAPIです

また内部をかなりリファクタリングして、

- CLI
- Engine
- Core

の役割と関心を分離してディレクトリなどを切るようになりました。
詳しくは以下のドキュメントに書かれています。

- [textlint/README.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/src/README.md "textlint/README.md at master · textlint/textlint")

結構長くなりましたが、5.0.0〜6.0.0の変更点は以上です。
Breaking Changeはほとんどのユーザには関係ないものだと思います(実際使ってるコードはGitHub上にはなかった)

## その他

- [文書校正ツール textlint の Chrome 拡張を作った - もなでぃっく](http://io-monad.hatenablog.com/entry/2016/03/14/225800 "文書校正ツール textlint の Chrome 拡張を作った - もなでぃっく")
- [textlint: 文章チェッカー - Chrome ウェブストア](https://chrome.google.com/webstore/detail/textlint-proofreader/hdongmdneapmhfblomidbafplpanpdmm?hl=ja&gl=JP "textlint: 文章チェッカー - Chrome ウェブストア")

![textlint on chrome](https://monosnap.com/file/LTo4HPrWD0k8fzfC8J9PRf0dNSJerG.png)

Chrome拡張として動くので、Node.jsを入れなくてもブラウザにインストールしてGUIで設定できるので簡単に使うことができます。

- [Nkzn/textlint-prh-template: A writing environment watched by textlint & prh](https://github.com/Nkzn/textlint-prh-template "Nkzn/textlint-prh-template: A writing environment watched by textlint &amp; prh")

Atomプラグインとして[linter-textlint](https://github.com/1000ch/linter-textlint "linter-textlint")を使う場合は上記のリポジトリが参考になるかもしれません。

## 開発メモ

`--fix`は5.5から使えたのですが、色々APIデザインを変更する可能性があったのでexperimentalフラグを付けてリリースしました。

浅いイテレーションをするには

- 本体機能をテストしてもらいたいならbetaをとにかく出す
- プラグインに関係するエコシステム的な機能を試したいならexperimentalフラグ付きで出す
- プラグイン側は最新の本体でしか動かない変更を入れるならメジャーアップデート
  - 本体バージョンとプラグインの参照するバージョンがズレているとユーザーはハマります
  - なのでメジャーアップデートとするのが無難です
- プラグイン側が特定バージョン以降に依存するならpeerDependenciesを付ける
- npmのbetaとGitHubのprereleaseを使う
  - `npm publish --tag beta`するalisを使っています
  - [npm version publish alias - http://efcl.info/2015/04/08/npm-publish-pattern/](https://gist.github.com/azu/fb3ec88231235511858a)
  - [npm publishのパターン | Web Scratch](http://efcl.info/2015/04/08/npm-publish-pattern/)
- フラグつき機能は、次のメジャーアップデートで外す
- testライブラリを作りdeprecatedはプラグイン作者に通知
  - テスト中はガンガン例外を投げて伝える
  - textlintは[textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester")経由の実行時のみ例外を投げるUtilを持っています。
  - [throw-log.js](https://github.com/textlint/textlint/blob/master/src/util/throw-log.js "throw-log.js")
- 本体とプラグインが同時にnpmのbetaになると辛い
  - βはsemverで`>=`のような指定ができなくて、直書きする事になって辛いです
- experimentalフラグ付きで本体はstableリリースして、プラグインはstableな本体に依存させたbetaを出す
- プラグインがstableリリースする際はメジャーアップデート+peerDependenciesにする
  - この辺が`--experimental`フラグを作った理由です

課題としては

- 本体のBreaking Changeに依存したプラグインの変更をうまく扱う方法がない
- なので本体のBreaking Changeはなるべく小さく、単独でリリースする
  - プラグインがすぐに追従できるような変更の粒度を考える

という感じになっています。
