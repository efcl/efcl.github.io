---
title: "textlint 6.0リリース。--fixでの自動修正に対応"
author: azu
layout: post
date : 2016-03-15T20:33
category: JavaScript
tags:
    - textlint
    - JavaScript

---

textlint 6.0をリリースしました。

モジュールとして使っている場合において、細かな破壊的な変更がありますが、ツールとして使っている人は単純に`npm install textlint -D`などでアップデートすれば動くと思います。

## `--fix`による自動修正の対応

[5.5.3: --fix & --experimental support](https://github.com/textlint/textlint/releases/tag/5.5.3 "5.5.3: --fix &amp; --experimental support")で実験的にサポートしていた`--fix`による自動修正機能が6.0では`--experimental`フラグなしで利用できるようになりました。

自動修正はルール側で対応が必要 かつ 原理的に自動修正が難しいルールもあると思うので、あくまでサポート的な機能です。

現状では以下のようなルールが`--fix`に対応していて、[Wiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule)にまとめてあるルールのうち、✔ fixableマークが付いてるものが対応している形です。

対応しているルールをfixableルールと呼んでいて、以下のバッジをつけています。

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) 

- [azu/textlint-rule-prh: textlint rule for prh.](https://github.com/azu/textlint-rule-prh "azu/textlint-rule-prh: textlint rule for prh.")
- [azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.](https://github.com/azu/textlint-rule-preset-JTF-style "azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.")
- [textlint-rule-spellcheck-tech-word](https://github.com/azu/textlint-rule-spellcheck-tech-word "textlint-rule-spellcheck-tech-word")
- [io-monad/textlint-rule-common-misspellings: textlint rule to check common misspellings](https://github.com/io-monad/textlint-rule-common-misspellings)
- [io-monad/textlint-rule-general-novel-style-ja: textlint rule to follow general style of Japanese novels](https://github.com/io-monad/textlint-rule-general-novel-style-ja)

fixableルールは[prhと辞書を使った表記揺れの統一](http://efcl.info/2015/09/14/textlint-rule-prh/)や[JTF日本語標準スタイルガイドを使った表記の統一](http://efcl.info/2015/10/19/textlint-plugin-JTF-style/)など、辞書ベースやスタイルの統一を自動的に修正できます。

表現的なものの自動修正は難しく、頑張ってもサジェストのような推敲支援になると思います。

- [東京Node学園祭2015で技術文書をソフトウェア開発する話をしてきた | Web Scratch](http://efcl.info/2015/11/07/nodefest-2015/ "東京Node学園祭2015で技術文書をソフトウェア開発する話をしてきた | Web Scratch")
- [校正と推敲 | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/slide/90.html "校正と推敲 | 技術文書をソフトウェア開発する話")

[textlint](https://github.com/textlint/textlint "textlint")は校正支援として始めたツールなので、まだ推敲支援のような要素は入っていません。
以下のIssueでそのようなサジェストをどう扱うかについて話し合ってるので興味がある人は見てみてください。

- [Feature Request: Multiple fix results and interactive fix · Issue #158 · textlint/textlint](https://github.com/textlint/textlint/issues/158 "Feature Request: Multiple fix results and interactive fix · Issue #158 · textlint/textlint")

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
npm i -D textlint@beta textlint-rule-preset-jtf-style textlint-rule-spellcheck-tech-word textlint-rule-common-misspellings
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

自分の今まで書いてきた全記事のうちMarkdownを

```
$(npm bin)/textlint _posts/
```