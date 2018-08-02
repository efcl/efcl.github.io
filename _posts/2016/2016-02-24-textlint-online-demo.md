---
title: "textlintの公式サイト(オンラインデモ)を作りました"
author: azu
layout: post
date : 2016-02-24T19:49
category: JavaScript
tags:
    - textlint
    - JavaScript
    - Redux
    - React

---


[![textlint](https://azu.github.io/slide/2016/reject-sushi/img/textlint.png)](http://textlint.github.io/)

[textlint - pluggable linting tool for text and markdown](http://textlint.github.io/ "textlint - pluggable linting tool for text and markdown")

textlintの公式サイトというかオンラインデモページを作成しました。

- [textlint.github.io/#try](http://textlint.github.io/#try)

上記ページにアクセスするとブラウザ上でtextlintを動かして試すことができます。

デフォルトだと[textlint-rule-rousseau](https://github.com/azu/textlint-rule-rousseau "textlint-rule-rousseau")や[textlint-rule-alex](https://github.com/azu/textlint-rule-alex "textlint-rule-alex")といった英語向けのルールが設定されていますが、npmモジュール名を指定すれば任意のルールも読み込めます。

例えば、[textlint-rule-spellcheck-tech-word](https://github.com/azu/textlint-rule-spellcheck-tech-word "textlint-rule-spellcheck-tech-word")と入れて"Add rule"するとこのルールが動的に追加できて試せます。
[Browserify CDN](https://www.brcdn.org/ "Browserify CDN")で動的にビルドして読み込んでいるので、Browserifyでビルドできないルールは流石にブラウザ上では動かないです。
(後、形態素解析とかやってるルールはそもそものファイルサイズが大きいです)

このサイトは[Deku](https://github.com/dekujs/deku "Deku") v2互換の[decca](https://github.com/rstacruz/decca "decca")と[Redux](https://github.com/reactjs/redux "Redux")で作りました。

Deku v2は最小限のAPIでReduxと合わせて使いやすい作りなので、初めてReduxを触るときはReact([react-redux](https://github.com/reactjs/react-redux "react-redux"))と合わせて使うよりもシンプルで理解しやすいかもしれません。

最近のtextlintを3分で把握できるスライドも書いたので、どんな感じのものをかをぱっと知りたい方は見ると面白いかもしれません。

- [3分でわかるtextlint](http://azu.github.io/slide/2016/reject-sushi/textlint.html "3分でわかるtextlint")

## デザイン

![logo](https://textlint.github.io/media/logo/textlint-logo.png)

textlintのロゴやアイコンを[@uetchy](https://github.com/uetchy "uetchy")さんに作っていただきました。

ロゴやアイコンやバナーはCC0ライセンスで利用できるので自由にご利用ください。

- [textlint/media: Official logo and icon.](https://github.com/textlint/media "textlint/media: Official logo and icon.")

このロゴやアイコンは[Issueで話し合いながら作って頂いた](https://github.com/textlint/media/pull/1#issuecomment-174872043)のですが、その中の[デザイン見本にウェブサイト](https://github.com/textlint/textlint.github.io/issues/1#issuecomment-176210780)があったのでそれを元に実装した感じになっています。

サイトは説明文とオンラインデモしかないので、ドキュメントはあいかわらずリポジトリの中に入ったままです。

- [textlint/docs at master · textlint/textlint](https://github.com/textlint/textlint/tree/master/docs "textlint/docs at master · textlint/textlint")

最近、[Getting Started with textlint](https://github.com/textlint/textlint/blob/master/docs/getting-started.md "Getting Started with textlint")という最初にとりあえず動かすまでのチュートリアルを書いたので、textlintを使ってみたい人はこの辺から読むといいかもしれません。

またサクッとプロジェクトに導入したい場合はルールがある程度まとまったルールプリセットを使うと、手軽に日本語のLintを始めることができます。

- [ルールプリセットを使ってお手軽にtextlint入門 | Web Scratch](https://efcl.info/2015/12/30/textlint-preset/ "ルールプリセットを使ってお手軽にtextlint入門 | Web Scratch")

他のtextlint関連記事は以下から探すことができます。

- [textlint - タグ一覧 | Web Scratch](https://efcl.info/tags/?q=textlint "タグ一覧 | Web Scratch")
