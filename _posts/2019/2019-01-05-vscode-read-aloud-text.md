---
title: "VSCodeで音声読み上げでの文章デバッグする拡張 - vscode-read-aloud-text"
author: azu
layout: post
date : 2019-01-05T11:27
category: JavaScript
tags:
    - VSCode
    - JavaScript
    - extension
    - audio

---

[vscode-read-aloud-text][]という文章を読み上げる[Visual Studio Code](https://code.visualstudio.com/)の拡張機能を作りました。

- [azu/vscode-read-aloud-text: VSCode extension that read aloud text like Markdown and text etc...](https://github.com/azu/vscode-read-aloud-text)
- [Read Aloud text - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=azu.read-aloud-text)

[vscode-speech](https://github.com/mattbierner/vscode-speech)を元にしていますが、[vscode-read-aloud-text][]は文章の構造をパースしてから読み上げたり、読み上げている部分をハイライト表示する機能が追加されています。

- Markdownなどをパースして、コードブロックなどは読み上げない
	- [textlint](https://textlint.github.io/)のプラグインを再利用してるので、現在対応しているのはMarkdown、Txt、Re:Viewのみ
	- 読み上げるのはHeader、Paragarah、Tableなどテキスト的なもの
- 読み上げている部分をハイライトする
- 編集すると読み上げを停止する
- ショートカットで読み上げ、開始、停止などができる
- OSネイティブの音声読み上げを使うので、OSが対応している言語に対応する
- ローカルの読み上げなので、ネットワーク接続は不要

読み上げで修正している様子(音は録音の問題で割れてるけど、手元では`say`コマンドとかと同じ音質です)

<iframe width="560" height="315" src="https://www.youtube.com/embed/rhsOyVXCz2g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## インストール

Visual Studio Marketplaceにアップロードしてあるのでインストールするだけです。

- [Read Aloud text - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=azu.read-aloud-text)

細かい設定は説明文を読んで下さい。

ショートカットはVSCodeの機能で`read-aloud-text.*`のコマンドをショートカットにバインドすれば大丈夫です。

![image](https://efcl.info/wp-content/uploads/2019/01/05-1546656571.png)

## おわりに

この拡張は今リファクタリング中の[js-primer](https://github.com/asciidwango/js-primer)で細かいtypoとかを見つけるために作りました。

- [refactor: 序盤の章の文章を修正 by azu · Pull Request #622 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/622)
  - 実際にやってみた例

実際にやってみると、読み上げることで助詞の間違いなど目では見つけにくい問題が見つかります。
読み上げのスムーズさはOSに依存するので、微妙に読み間違いなどはありますが、まあまあ許容できる範囲です。(ChromeのSpeech to Textのほうがキレイなので、そっちを使いたい。Puppetterなどで無理やりできそうではあるけど)


[vscode-read-aloud-text]: https://github.com/azu/vscode-read-aloud-text