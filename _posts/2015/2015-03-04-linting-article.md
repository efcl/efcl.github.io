---
title: ""
author: azu
layout: post
date : 2015-03-04T21:04
category: 
tags:
    - 

---

このブログや[JSer.info](http://jser.info)はJekyllを使って動いているのですが、
どちらも記事を書くときはMarkdownを使って書かれています。

最近になって、Markdownで書いた技術用語の表記などをLintする仕組みを追加して、pull requestした際にLint結果がinvalidなら修正を促す(主に自分に対して)レビューコメントが書き込まれる[HoundCI](https://houndci.com/ "Hound")みたいな仕組みを追加しました。

## 記事のLint

MarkdownなのでLintingには[textlint](https://github.com/azu/textlint "textlint")を使いました。

また、[JSer.info](http://jser.info/ "JSer.info")は記事の書式が[特殊](https://github.com/jser/jser.info/issues/27 "ブログ記事のセマンティックを考える · Issue #27 · jser/jser.info")なので、それ用のtextlintルールを書いて使っています。

といっても基本的には[azu/spellcheck-tech-word-textlint-rule](https://github.com/azu/spellcheck-tech-word-textlint-rule "azu/spellcheck-tech-word-textlint-rule")をベースにして無視するルールを追加した[spellcheck-post.js](https://github.com/jser/jser.github.io/blob/master/test/rules/spellcheck-post.js "spellcheck-post.js")を作って使っています。

- [azu/technical-word-rules](https://github.com/azu/technical-word-rules "azu/technical-word-rules") 辞書本体
- [azu/spellcheck-technical-word](https://github.com/azu/spellcheck-technical-word/ "azu/spellcheck-technical-word") 上記の辞書を使ってチェックする関数

## Lint結果をコメント

これで記事のLint自体はでるようになりましたが、単純にTravis CIでテストしてパスするかだと何が間違ってるかをTravis CIに見に行く必要があります。

[jser/jser.info](https://github.com/jser/jser.info/ "jser/jser.info")の記事の元データの方はほぼ自分しか更新しないので、Travis CIで辞書Lintがパスするかどうかのテストしてますが、記事のMarkdownファイルがある[jser.github.io](https://github.com/jser/jser.github.io "jser.github.io")は自分以外もpull requestで更新がきたりするので、テストでパスするかどうかだとちょっと不親切です。

- [JSer.info 200 回目記念イベント](http://azu.github.io/slide/jser200/ "JSer.info 200 回目記念イベント") (記事の元データうんぬんはこちら参照)

というのも、使ってる辞書のLintはそこまで正確ではないので、Warning的な扱いがちょうどいいと思ってます(最悪無視してもいいし、辞書の方を直したほうがいい時も多い)

なので、[jser.github.io](https://github.com/jser/jser.github.io "jser.github.io")の方はLintした結果をレビューコメントとして書き込むようになってます。