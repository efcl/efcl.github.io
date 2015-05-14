---
title: "ブラウザでビジュアルテストをするreftest-runnerを作った"
author: azu
layout: post
date : 2015-05-14T09:02
category: JavaScript 
tags:
    - Testing
    - Browser
    - JavaScript
    - Node.js

---

## 概要

[reftest-runner][]というブラウザでちゃんと描画されているのかをテストするためのライブラリを作りました。

要素技術としてはWebDriver、レンダリングキャプチャ、画像Diffという感じです。

- [azu/reftest-runner](https://github.com/azu/reftest-runner "azu/reftest-runner")

## reftestとは

reftest(Referrence Test)とは、2つのHTMLの表示結果(スクリーンショット)を比較することで表示結果が意図したものかをテストする方法です。

用意するHTMLとして以下の2種類を1セットとして用意して利用します。

- テスト用HTML
	- テストしたい機能を使って実装したHTML
- リファレンス用HTML
	- テスト用HTMLとは別の機能で実装したHTML

この2つのHTMLをブラウザで表示し、スクリーンショットを取って画像として比較することで、2つのHTMLの表示が一致する OR 一致しないことを自動的にテストするためのツールが今回作った[reftest-runner][]です。

![ref-test](https://cdn.rawgit.com/azu/reftest-runner/master/docs/reftest-runner-overview-image.png)

詳しくは以下でも書かれていますが、FirefoxやWebkit、Chormeといったブラウザで使われていて、こういうのをもっと普通のウェブ開発レベルでも使いたくなったのでこれをインスパイアしています(完全に一致というわけでもないかも…)

- [リファレンステストの書き方 by nakajmg](http://slides.com/nakajmg/reftest#/ "リファレンステストの書き方 by nakajmg")
- [Writing Reftests | Test the Web Forward](http://testthewebforward.org/docs/reftests.html)
- [Creating reftest-based unit tests | MDN](https://developer.mozilla.org/en-US/docs/Creating_reftest-based_unit_tests)
- [w3c/csswg-test](https://github.com/w3c/csswg-test "w3c/csswg-test")

reftestは、画像のキャプチャを保存しておいて比較するのと違って、HTMLがテストファイルとなっています。
そのため、reftest向けに作ったHTMLは自動テストだけじゃなくて、普通にHTMLを開いて目視のテストや機能のデバッグなどにも使えるので多少面倒ですが意外と使い道があったりします。

また画像自体を保存して画像比較するテストは管理が大変なので、reftestのような形式のほうが柔軟性がある感じです。

> 画像比較ベースのテストは変化に弱く保守が大変なので、 一年ほど前に Reftests と呼ばれる新しいタイプのテストがサポートされた
> -- [炭坑の庭師 - steps to phantasien](http://steps.dodgson.org/b/2012/05/20/gardening-with-canaries/ "炭坑の庭師 - steps to phantasien")



[reftest-runner]: https://github.com/azu/reftest-runner  "azu/reftest-runner"

