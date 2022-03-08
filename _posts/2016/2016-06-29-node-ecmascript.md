---
title: "Node学園 21時限目でECMAScript as a Living Standardという発表をした"
author: azu
layout: post
date : 2016-06-29T23:32
category: イベント
tags:
    - JavaScript
    - ECMAScript
    - book
    - Node.js

---

[Node学園 21時限目 -ES Modules Meetup-](http://nodejs.connpass.com/event/34104/ "Node学園 21時限目 -ES Modules Meetup-")で[ECMAScript as a Living Standard](https://azu.github.io//slide/2016/node-es/ecmascript.html "ECMAScript as a Living Standard")という発表をしてきました。

[![ECMAScript as a Living Standard](https://monosnap.com/file/sWmJQbTd7YAKkFvPog7xozpPtHMOKF.png)](https://azu.github.io//slide/2016/node-es/ecmascript.html)

- スライド: [ECMAScript as a Living Standard](https://azu.github.io//slide/2016/node-es/ecmascript.html "ECMAScript as a Living Standard")

ECMAScriptの仕様策定は大きなプロジェクトですが、
大部分の作業がGitHub上で見られる形でやり取りされています。

そのため、大きなGitHubプロジェクトとそこまで変わらない感覚で見ることができます。
また標準仕様を作るのでConsensusを取ったり、フォーマルなやり取りもあります。

- [tc39/proposals: Tracking ECMAScript Proposals](https://github.com/tc39/proposals)
- [tc39/ecma262: Status, process, and documents for ECMA262](https://github.com/tc39/ecma262)
- [tc39/tc39-notes: These are the notes I take at TC39 Meetings, with Markdown formatting](https://github.com/tc39/tc39-notes/)

GitHubで常に最新の仕様が公開されていて、ECMAScriptもHTMLなどと同じようなLiving Standardの形になっています。

- [tc39.github.io/ecma262/](https://tc39.github.io/ecma262/ "ECMAScript® 2017 Language Specification")

そのため、ES2015やES2016といったものは基本的にはスナップショット的な仕様となります。
仕様として参照する場合はLiving Standardの方を見るケースが増えてくると思います。
この策定プロセスの変化と早いリリースのベースとなる仕様はES2015で作成されました。

その中でJavaScriptを学ぶ書籍やコンテンツも常にアップデートできる形でないとズレがでてきてしまうことがあります。
それをどうにかしたいのもあり、ES2015以降をベースとしたJavaScriptの入門書を書き始めました。

プログラミングをやったことがあるが、JavaScriptはよくわからないという人が読むと良さそうな本を目指しています。

[![Image](https://azu.github.io/slide/2016/node-es/img/js-primer.png)](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")

- [asciidwango/js-primer: JavaScriptの入門書](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")

まだ書き始めたばかりであるため、中身が殆どありません。
しかし、書いてる段階から公開することにも意味があると思うので公開しています。

この辺は最初から知っておいた方がいい！というものなどがありましたら、Issueに書いてもらったり、ハッシュタグ[#jsprimer](https://twitter.com/intent/tweet?hashtags=jsprimer)をつけてつぶやいてもらうと嬉しいです。

全体としては、基本文法とユースケースの2種類に大きく分けていて、基本文法などを学んでユースケースで実際にJavaScriptで何か書いてみるという流れにしています。
(ECMAScript本というわけではないです)

- [[meta] 全体的な設計/ユースケース一覧 · Issue #6 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/6 "[meta] 全体的な設計/ユースケース一覧 · Issue #6 · asciidwango/js-primer")

話を戻して、ECMAScriptの仕様策定は[プロセス](https://tc39.github.io/process-document/ "The TC39 Process")や[ミーティングの議事録](https://github.com/tc39/tc39-notes/)などが公開されています。
これは、透明性を確保するためでもあり、開発者からのフィードバックを得やすい環境を作るためだとも考えられます(GitHubでやっているのもそういう理由があると思います)

そういった策定プロセスのパターンランゲージをAllen Wirfs-Brockさん(ES2015 Editor)が公開しているので読んでみると面白いかもしれません。

- [Microsoft Word - standpats-asianplop-final.docx - standpats-asianplop2016.pdf](http://wirfs-brock.com/allen/files/papers/standpats-asianplop2016.pdf)
- 自分のメモ: [プログラミング言語標準化のパターン](https://gist.github.com/azu/47082cbcaf7cc7b2b2f2075afad1b025)

現在のECMAScriptの情報は殆どGitHubで見ることができ、追うときには策定プロセスなどを知っておくと理解がしやすくなると思います。

ECMAScriptのニュースは以下のサイトでやっているので、Proposalの進捗や更新内容などを知りたい人は[ECMAScript Daily](https://ecmascript-daily.github.io/ "ECMAScript Daily")を見てみてください。

- [ECMAScript Daily](https://ecmascript-daily.github.io/ "ECMAScript Daily")

[ECMAScript as a Living Standard](https://azu.github.io//slide/2016/node-es/ecmascript.html "ECMAScript as a Living Standard")では、ECMAScriptを見ていくことは大きなGitHubプロジェクトを見るのとそこまで変わらないよという話をしました。
