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
これはpluggable linting toolのためでもありますが、現実的に全ての言語(日本語、英語、中国語...)で上手く機能するようなルールは殆ど無いと思っているからでもあります。

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

### 文章をLintする

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

textlint [v3.3.0](https://github.com/azu/textlint/releases/tag/v3.3.0 "v3.3.0")で`.textlintrc`という設定ファイルをサポートしたので、上記のコマンドは以下のような設定ファイルにすることができます。

設定ファイルはJSON、YAML、JS(`module.exports = {}`)で書くことができます。

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

`rules`にはルールの有効(true)/無効(true) または ルールの設定があれば設定を書くことができます。