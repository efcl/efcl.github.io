---
title: "ルールプリセットを使ってお手軽にtextlint入門"
author: azu
layout: post
date : 2015-12-30T16:01
category: JavaScript
tags:
    - textlint
    - ReleaseNote

---

[textlint](https://github.com/textlint/textlint "textlint")はルールで拡張出来る自然言語向けのLintツールです。

[textlint](https://github.com/textlint/textlint "textlint") [5.1.0](https://github.com/textlint/textlint/releases/tag/5.1.0 "5.1.0")でルールのプリセットをサポートしました。

ルール、プリセット、プラグインは以下のような関係です。

- [rule](https://github.com/textlint/textlint/tree/master/docs/docs/rule.md)
    - いわゆるルール
- [rule-preset](https://github.com/textlint/textlint/tree/master/docs/docs/rule-preset.md)
    - ルールをまとめたもの
- [plugin](https://github.com/textlint/textlint/tree/master/docs/docs/plugin.md)
    - ルールとプロセッサ(拡張機能)を持ってる

![rule-preset-plugin](https://raw.githubusercontent.com/textlint/textlint/master/docs/resources/rule-preset-plugin.png)

textlintはデフォルトでは一つもルールを持っていません。

そのため、どのルールを入れたらいいか迷った場合に、誰かがまとめてくれたプリセットをとりあえず入れれば、とりあえず文章のチェックが出来るようになります。

textlintの使い方は以下で解説しているのと基本的に同じですが、今回はプリセットの使い方を紹介します。

- [textlintで日本語の文章をチェックする | Web Scratch](https://efcl.info/2015/09/10/introduce-textlint/ "textlintで日本語の文章をチェックする | Web Scratch")

## インストール

textlint本体と2つのプリセットをインストールしてみます。

- [azu/textlint-rule-preset-japanese](https://github.com/azu/textlint-rule-preset-japanese)
	- 自分が作った日本語関係のルールセット
- [azu/textlint-rule-preset-JTF-style](https://github.com/azu/textlint-rule-preset-JTF-style)
	- [JTFスタイルガイド](https://www.jtf.jp/jp/style_guide/styleguide_top.html)のルールセット
	- [JTF日本語標準スタイルガイドのルールセットで文章をチェックできるtextlintプリセット | Web Scratch](https://efcl.info/2015/10/19/textlint-plugin-JTF-style/ "JTF日本語標準スタイルガイドのルールセットで文章をチェックできるtextlintプリセット | Web Scratch")


```sh
npm i -D textlint textlint-rule-preset-japanese textlint-rule-preset-jtf-style
```

## 使い方

プリセットをコマンドラインから指定することで設定ファイルなしに利用することもできます。

```sh
$(npm bin)/textlint --preset preset-japanese --preset preset-jtf-style README.md
```

逆にこの場合はルール毎の設定ができないので、設定ファイルである`.textlintrc`を使ってみます。

### 設定ファイル

サンプルリポジトリを以下に置いておきます。

- [azu/textlint-preset-example](https://github.com/azu/textlint-preset-example "azu/textlint-preset-example")

`.textlintrc`に以下のように書くとプリセットを有効化できます

```js
{
  "rules": {
    "preset-japanese": true,
    "preset-jtf-style": true
  }
}
```

プリセットはルールの集合なので、プリセットの中にある特定のルールを設定したい場合があります。

例えば、[textlint-rule-preset-JTF-style](https://github.com/azu/textlint-rule-preset-JTF-style "textlint-rule-preset-JTF-style")の`"1.2.2.ピリオド(.)とカンマ(,)"`だけを無効化したいなら次のように書くことができます。

```js
{
  "rules": {
    "preset-jtf-style": {
      "1.2.2.ピリオド(.)とカンマ(,)": false
    }
  }
}
```

同じディレクトリに`.textlinrc`があれば、実行は`textlint`コマンドを叩くだけです。

```
$(npm bin)/textlint README.md
```

![result](https://monosnap.com/file/tndweS7k0ZsrVz8yN3olPvD3l2rbTx.png)

### もっとルールを加える

プリセットとルールは併用可能なので、プリセットにないルールは自分で追加していくといいと思います。

[textlint-rule-prh](https://github.com/azu/textlint-rule-prh "textlint-rule-prh")を使った表記揺れの検出などは効果的なルールと言えます。

- [textlint + prhで表記ゆれを検出する | Web Scratch](https://efcl.info/2015/09/14/textlint-rule-prh/ "textlint + prhで表記ゆれを検出する | Web Scratch")

### もっと優しい使い方

Node.jsやGitなどに慣れてない人は以下を参考にしてください。
(プリセットではなくルールベースですが、プリセットとルールの使い方はだいたい同じです)

- [kubosho/textlint-starter-kit](https://github.com/kubosho/textlint-starter-kit)
- [KenshoFujisaki/TextlintAtom](https://github.com/KenshoFujisaki/TextlintAtom)


![preview](https://gyazo.com/430f92606e5f5bdb06e0583001a9a2b0.gif)

## プリセットの作り方

プリセットの作り方は以下のドキュメントを参考にしてください。

- [textlint/rule-preset.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/docs/rule-preset.md "textlint/rule-preset.md at master · textlint/textlint")

基本的にルール本体を`rules`に、ルールのデフォルト設定を`rulesConfig`に書いたオブジェクトを返すだけなので単純です。

```
module.exports = {
    "rules": {
        "no-todo": require("textlint-rule-no-todo")
    },
    "rulesConfig": {
        "no-todo": true
    }
};
```

作ったプリセットは`textlint-rule-preset-<好きな名前>`で公開してください。
(この命名規則だとtextlint-rule部分の指定を省略できます)

プリセットは元々別にあるルールを集めただけの場合が多くなると思うので、依存するルールが更新された時にプリセットも更新できると便利です。

[Greenkeeper](http://greenkeeper.io/ "Greenkeeper")と[semantic-release](https://github.com/semantic-release/semantic-release "semantic-release")を使うと依存するルールモジュールが更新されたら自動でPull Requestがきて、マージしたら自動的にnpm publishすることができて便利です。

- [JavaScript - 自動でnpmライブラリをアプデ&プルリクしてくれるサービスのgreenkeeperがすごく便利だった - Qiita](http://qiita.com/itkrt2y/items/c0e77a4e3cda173917bb "JavaScript - 自動でnpmライブラリをアプデ&amp;プルリクしてくれるサービスのgreenkeeperがすごく便利だった - Qiita")
- [npmで成果物をsemantic-release :rocket:](https://azu.github.io//slide/niku_sushi/npm-semantic-release.html "npmで成果物をsemantic-release :rocket:")
