---
title: "textlintで日本語の文章をチェックする"
author: azu
layout: post
date : 2015-09-08T19:52
category: JavaScript
tags:
    - textlint
    - AST
    - Lint
    - tools

---

## textlint

[textlint](https://github.com/azu/textlint "textlint")はMarkdownやテキスト向けのLintツールで、テキスト版ESLintみたいな感じのツールです。

- [JavaScriptでルールを書けるテキスト/Markdownの校正ツール textlint を作った | Web Scratch](http://efcl.info/2014/12/30/textlint/ "JavaScriptでルールを書けるテキスト/Markdownの校正ツール textlint を作った | Web Scratch")

最近[azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "azu/JavaScript-Plugin-Architecture")という小さな書籍を書いていて、色々簡単に使えるような仕組みを追加しています。

この記事では簡単な[textlint](https://github.com/azu/textlint "textlint")の導入方法について紹介します。

扱う[textlint](https://github.com/azu/textlint "textlint")は[v3.3.0](https://github.com/azu/textlint/releases/tag/v3.3.0 "v3.3.0")以降とします。

### インストール

textlintはデフォルトでは一つもルールがありません。
これはpluggable linting toolのためでもありますが、現実的に全ての言語(日本語やロシア語といった言語)で上手く機能するようなルールは少ないと思ってるからでもあります。

ルールはJavaScriptで書くことができ、それらのルールはNode.jsのパッケージ管理ツールであるnpmで公開、利用することができます。
(textlintのルールは`textlint-rule-*`という名前で公開をオススメします)

なので、自分が作った幾つかのルールを入れて試してみたいと思います。

npmでグローバルにtextlintと3種類の日本語関係のルールを入れてみます。

```sh
npm i -g textlint
npm i -g textlint-rule-max-ten textlint-rule-spellcheck-tech-word textlint-rule-no-mix-dearu-desumasu
```

Node.jsの`package.json`があるプロジェクトなら`--save-dev`とかでインストールして使うと良いと思います。(できればこちらをオススメします)

インストールすると`$ textlint`というコマンドが使えるようになります。

入れた3つのルールはそれぞれ以下のようなことをチェックしてくれます。

- [textlint-rule-max-ten](https://github.com/azu/textlint-rule-max-ten)
	- 一文に利用できる`、`の数をチェックするルール
- [textlint-rule-spellcheck-tech-word](https://github.com/azu/textlint-rule-spellcheck-tech-word)
	- WEB+DB PRESS用語統一ルールをベースにした[azu/technical-word-rules](https://github.com/azu/technical-word-rules "azu/technical-word-rules")の辞書で単語チェック
- [textlint-rule-no-mix-dearu-desumasu](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu)
	- 「ですます」調と「である」調の混在をチェックするルール


### 文章をルールでLintする

先ほど入れたルールを使ってみましょう。

`--rule <ルール名>`でルールを指定でき、ルール名とはインストール時のパッケージの名前となっています。

`textlint-rule-*`で始まるパッケージ名は省略できるようにしてあるので、具体的には次のようになっています

- `textlint-rule-no-mix-dearu-desumasu` -> `no-mix-dearu-desumasu`
- `textlint-rule-max-ten` -> `max-ten`
- `textlint-rule-spellcheck-tech-word` -> `spellcheck-tech-word`

`README.md`というファイルをこれらのルールでチェックしたい場合は以下のように書くことができます。

```sh
$ textlint --rule no-mix-dearu-desumasu --rule max-ten --rule spellcheck-tech-word README.md
```

引数が多いですね… 

textlint [v3.3.0](https://github.com/azu/textlint/releases/tag/v3.3.0 "v3.3.0")で`.textlintrc`という設定ファイルをサポートていて、上記のコマンドは以下のような設定ファイルにすることができます。

設定ファイルはJSON、YAML、JSモジュール(`module.exports = {}`)で書くことができます。

> `.textlintrc`

```json
{
  "rules": {
    "max-ten": {
      "max": 3
    },
    "spellcheck-tech-word": true,
    "no-mix-dearu-desumasu": true
  }
}
```

`rules`にはルールの有効(true)/無効(true) または ルールの設定を書くことができます。

詳しくは[README.md](https://github.com/azu/textlint#textlintrc)を見てみて下さい

textlintを実行すると自動で`.textlintrc`ファイルを探索して読み込まれるので、設定ファイルがあるディレクトリなどで実行し場合はコマンドラインオプションに書かなくてもよくなります。

```sh
$ textlint --rule no-mix-dearu-desumasu --rule max-ten --rule spellcheck-tech-word README.md
# ==
$ textlint README.md
```

実例: [refactor: use `.textlintrc` for textlint by azu · Pull Request #43 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/pull/43 "refactor: use `.textlintrc` for textlint by azu · Pull Request #43 · azu/JavaScript-Plugin-Architecture")

textlintのルールは以下のWikiにまとめてありますが、作った場合は自由に追加してみてください。

- [Collection of textlint rule · azu/textlint Wiki](https://github.com/azu/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · azu/textlint Wiki")

## ルールを作る

textlint ruleの作り方は以下のドキュメントに書かれています。

- [textlint/create-rules.md at master · azu/textlint](https://github.com/azu/textlint/blob/master/docs/create-rules.md "textlint/create-rules.md at master · azu/textlint")

Lintの仕組みは[ESLint](http://eslint.org/ "ESLint")と同じく、Markdown(コード)をパースしてASTにしたものをtraverseしながらそれぞれのルールに渡してチェックする仕組みをtextlintは提供しています。

詳しくはESLintのプラグインアーキテクチャを解説を以下に書いたので読んでみるといいと思います。

- [ESLint | JavaScript Plugin Architecture](http://azu.gitbooks.io/javascript-plugin-architecture/content/ja/ESLint/index.html "ESLint | JavaScript Plugin Architecture")

以下の記事でも簡単に紹介しています。

- [JavaScriptでルールを書けるテキスト/Markdownの校正ツール textlint を作った | Web Scratch](http://efcl.info/2014/12/30/textlint/)
- [textlint 1.4 パーサの安定化、ルールの自由度の改善をして現実的に使えるLintツールへ | Web Scratch](http://efcl.info/2015/01/07/textlint1.4/)

例えば、パラグラフで同じ接頭辞が連続して使われてることをチェックするtextlint ruleを書いてみると以下のようになります。

- それぞれのパラグラフの接頭辞を取り出す
- 変数に接頭辞を保存しておく
- 次の接頭辞が前回の接頭辞と一致してないかを調べる
- 一致していたら`context.report`でエラー報告をする