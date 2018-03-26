---
title: "textlintのElectronアプリを作った"
author: azu
layout: post
date : 2017-05-12T19:36
category: JavaScript
tags:
    - Electron
    - textlint
    - JavaScript

---

# textlint-app

[textlint-app](https://github.com/textlint/textlint-app "textlint-app")という、インストールするだけで動くtextlintのElectronアプリを作成しました。

[![gif](https://media.giphy.com/media/3o7buj7KnuEurvGVm8/giphy.gif)](https://github.com/textlint/textlint-app)


## インストール方法

- <https://github.com/textlint/textlint-app/releases/latest> からバイナリをダウンロード

ダウンロードしたインストーラー（Windows）、`app`（Mac）を実行すれば動きます。（Node.jsの環境なども不要です）
実行する際に署名されてないバイナリなので警告がでるので、その辺は許可しないと動きません。

- Windows: インストーラーで許可を選択する必要がある
- Mac: `/Application/textlint.app` をコンテキストメニューから"開く"をして許可する必要がある

## 特徴

一番の特徴はNode.jsなどの環境を作る必要なくインストールするだけで動く点です。
[textlint](https://github.com/textlint/textlint "textlint")はNode.js（一応ブラウザも動く）で動くツールです。
しかし、Node.jsのセットアップに慣れてない人には大変そうなので作成しました。

内部的にはElectronアプリで、Node.jsとnpmを同梱しています。
また[textlint](https://github.com/textlint/textlint "textlint")のルールもアプリ上でインストールして動かします。

利用できるルールはNode.jsのCLI版と全く同じ、設定ファイルの`.textlintrc`も同じです。

- [Collection of textlint rule · textlint/textlint Wiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · textlint/textlint Wiki")

簡単にまとめると次のようなアプリです。

- Node.js環境がなくても動く[textlint](https://github.com/textlint/textlint "textlint")同梱のエディタ
- `.textlintrc`をそのままコピペすれば動く
- `textlint --fix`を使った自動修正に対応
- Markdownファイルを読み書きできる


## 使い方

アプリを開くとエディタ画面が出てきます。
最初はtextlintのルールが一切入っていない状態なので、ルールをインストールする必要があります。

- **1.** "Settings"のタブを開く:

![Step 1](https://efcl.info/wp-content/uploads/2017/05/12-1494586278.png)

- **2.** `.textlintrc`の設定を書く

![Step 2](https://efcl.info/wp-content/uploads/2017/05/12-1494586443.png)

次のような設定を`.textlintrc`へコピペします。

**例**: [textlint-ja/textlint-rule-preset-ja-technical-writing: 技術文書向けのtextlintルールプリセット](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing "textlint-ja/textlint-rule-preset-ja-technical-writing: 技術文書向けのtextlintルールプリセット")を使う設定

```json
{
  "rules": {
    "preset-ja-technical-writing": true
  }
}
```

- **3.**: "Install"ボタンを押して完了する待つ

"Install"ボタンを押すと内蔵しているnpm（パッケージマネージャ）を使ってルールをダウンロードしてきます。

（ダウンロードしたルールや`package.json`、`.textlintrc`は "Working directory" に自動的に配置されるので、CLI版でもそこを参照すれば共有できます）

- **4.** "Edit with textlint"でテキストを書く

現状はMarkdownしかサポートしてませんが、エディタ部分に書いていくとリアルタイムで先ほどインストールしたルールでチェックされます。

- [Support html/rst/re:view · Issue #8 · textlint/textlint-app](https://github.com/textlint/textlint-app/issues/8 "Support html/rst/re:view · Issue #8 · textlint/textlint-app")

![Screenshot](https://efcl.info/wp-content/uploads/2017/05/12-1494586618.png)

また"Fix all errors"ボタンを押すことで、修正可能なエラーは自動的に修正できます。

## おわりに

[textlint/textlint-app](https://github.com/textlint/textlint-app "textlint/textlint-app: textlint standalone application top on Electron.")はまだ開発段階の状態です。

目的としてNode.jsを普段使ってない人がてっとり早くtextlintを使えるようにすることです。
また、`.textlintrc`の設定ファイルはCLIやアプリで共有できるので、コピペして使い始めることができる所にフォーカスしています。
(この設定コピペすればとりあえずいい感じにチェックできるよみたいな）

<https://github.com/textlint/textlint-app#development>にローカルでの開発方法についてドキュメントが書いてあります。
デザインがまだまだだったり、目的に反してそこまで優しい感じではないのでその辺へのコントリビュートまってます。
（CodeMirrorのパフォーマンスとかガタガタする問題をどうにかしたいです…）

- [Issues · textlint/textlint-app](https://github.com/textlint/textlint-app/issues "Issues · textlint/textlint-app")

## おまけ

この記事を書いているときの`.textlintrc`の設定は次のようなものでした。

```json
{
  "filters": {
    "comments": true
  },
  "rules": {
    "ja-no-redundant-expression": true,
    "period-in-list-item": {
      "periodMark": ""
    },
    "preset-ja-technical-writing": {
      "no-exclamation-question-mark": {
        "allowFullWidthQuestion": true
      },
      "max-kanji-continuous-len": {
        "max": 6
      }
    }
  }
}
```
