---
title: "The Missing README: A Guide for the New Software Engineerを読んだ"
author: azu
layout: post
date : 2021-08-20T23:59
category: 雑記
tags:
    - book

---

The Missing READMEという新人ソフトウェアのためのエンジニアガイドの書籍を読んだ感想です。

- [The Missing README](https://learning.oreilly.com/library/view/the-missing-readme/9781098129064/)
  - learning.oreillyで読める
- [The Missing README: A Guide for the New Software Engineer](https://themissingreadme.com/)
  - 2021年8月10日 に出版された書籍

The Missing READMEはコード、設計、テスト、リファクタリング、例外処理やログ、依存管理、コードレビュー、CI/CD、インシデント対応、コミュニケーションやプロジェクト管理など幅広いことがすっきりとまとまってる感じの書籍です。

全体的に説明に出てくるコードは少なめです。逆を言えば特定のプログラミング言語に依存していないので読み物として読みやすかったです。
（類似することを体験した）後で書籍を見直すとこれのことだったのかーと思うような話が多い感じでした。（自分は[今日からはじめる情報設計](https://www.amazon.co.jp/dp/B07JPJWX45/)という書籍でこれをよく経験した）

全部で300ページもない書籍なのですが、ここまでいろいろなカテゴリの話をしていて、それでいて読みやすくまとまっているのは結構すごいなと思いました。
こういう書籍は、辞書的な見出し(`~~の法則`)みたいな感じになりやすい気はしますが、そういう感じでもなくちゃんと意味あるまとまりになっていたのが読みやすい理由なのかなと思いました。

日本語だと次の書籍が近いジャンルだと思います。

- [［増補改訂］良いコードを書く技術 ──読みやすく保守しやすいプログラミング作法：書籍案内｜技術評論社](https://gihyo.jp/book/2021/978-4-297-12048-1)
- [プリンシプル オブ プログラミング 3年目までに身につけたい 一生役立つ101の原理原則 | 上田勲 | 工学 | Kindleストア | Amazon](https://www.amazon.co.jp/dp/B071V7MY82/)
- [O'Reilly Japan - リーダブルコード](https://www.oreilly.co.jp/books/9784873115658/)

ただそこまでコードという印象はなくて、エンジニアリングという印象の書籍だったかなと思います。

全体的な雰囲気のメモとして、気になった章ごとの軽い感想をメモっておきます。

## The Missing READMEの主な章ごとの感想

### 4章: Writing Operable Code

[Chapter 4: Writing Operable Code](https://learning.oreilly.com/library/view/the-missing-readme/9781098129064/c04.xhtml)は結構良かったです。
特に"Throw Exceptions Early, Catch Exceptions Late"というセクションが良かったです。

Throw Exceptions Earlyは、例外は早い段階投げることで問題を特定しやする話です。例外を投げる場所を遅らせると別の例外が発生して問題がわかりにくくなる場合があります。
Catch Exceptions Lateは、例外は正しくハンドリングできる処理までそのエラーを伝搬する話です。途中で例外を握りつぶしてしまうのは問題をわかりにくくしてしまう問題があります。

コードを書いていると自然とそのような形になると思いますが、これを"Throw Exceptions Early, Catch Exceptions Late"という言葉でまとめているのが良かったです。

📝 JavaScriptにもようやく[Error Cause](https://github.com/tc39/proposal-error-cause)というエラーの情報を連鎖的させられるようになりました。これでエラーを上流に持っていくのが素直に書きやすくなります。

4章は他にもログの出し方の話でログレベル、機密情報をログしない、設定ファイルを賢くしすぎない、設定ファイルの完全な状態をログとして残す、設定ファイルはロードしたタイミングで検証するといった話が書かれています。それぞれはどこかで見たことがあるけど、こういう感じでまとまってると読みやすくていいなーと思いました。

あと、The Missing READMEは章ごとのまとめにDo and Do notの形でまとめがあるので、これもわかりやすかったと思います。
次の図は[Chapter 3: Working with Code | The Missing README](https://learning.oreilly.com/library/view/the-missing-readme/9781098129064/c03.xhtml)のまとめです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Missing README<br>まとめがDo and Do notになっててわかりやすいな <a href="https://t.co/fvi0GqFkYC">pic.twitter.com/fvi0GqFkYC</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1426762514369441793?ref_src=twsrc%5Etfw">August 15, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

### 5章: Managing Dependencies

[Chapter 5: Managing Dependencies](https://learning.oreilly.com/library/view/the-missing-readme/9781098129064/c05.xhtml)では、パッケージマネージャの話ですが、特定の言語に依存はしてないのが面白い切り口でした。
[セマンティック バージョニング](https://semver.org/lang/ja/)やバージョン番号としてGitハッシュ値は適していない話、依存関係地獄の話、依存関係のレポーティングの話など。

### 7章: Code Reviews

[Chapter 7: Code Reviews](https://learning.oreilly.com/library/view/the-missing-readme/9781098129064/c07.xhtml)のコードレビューの話も結構良かったです。
いわゆるコードレビューのする側、される側の作法的な話ですが、[Google Engineering Practices Documentation | eng-practices](https://google.github.io/eng-practices/)も例にだして、どこまでレビューするべきか(どこでApproveするべきか)話が書かれています。

これ自体は、[Google Engineering Practices Documentation](https://google.github.io/eng-practices/)の話ですが、そのPull Requestがシステム全体の健全度を向上させる状態に一度でも達したらならば、そのコード/PRが完全ではなくても、レビューアは承認(Approve)するべきという基準の話は良かったです。

> In general, reviewers should favor approving a CL once it is in a state where it definitely improves the overall code health of the system being worked on, even if the CL isn’t perfect.
> https://google.github.io/eng-practices/review/reviewer/standard.html

The Missing READMEは章末の"Level Up"というセクションで参考書籍や次に読むべきリソースへの誘導も入ってるのも結構いいところです。

### 8章と9章: デプロイとオンコール

[Chapter 8: Delivering Software](https://learning.oreilly.com/library/view/the-missing-readme/9781098129064/c08.xhtml)は"Delivery consists of steps such as release, deployment, and rollout."という話で、それぞれのステップを一個ずつ見ています。
[Chapter 9: Going On-Call](https://learning.oreilly.com/library/view/the-missing-readme/9781098129064/c09.xhtml)は、オンコールの仕組み、サポートチケットの切り方(P1からP4)、インシデントマネージメントにかかれています。
この２つの章を"A Guide for the New Software Engineer"に入れてるのは結構すごいなーと思いつつ、一番混乱しそうなところでもあるのでガイドがあるのは良い気がしました。

### 10章と11章: 設計

[Chapter 10: Technical Design Process](https://learning.oreilly.com/library/view/the-missing-readme/9781098129064/c10.xhtml)は、仕様やデザインドキュメントの話(実験的なコードに執着しすぎない、それは変わる)、[デザイン批評](https://www.amazon.co.jp/dp/B01J2OEYLU/)的なコミュニケーションの話。
[Chapter 11: Creating Evolvable Architectures | The Missing README](https://learning.oreilly.com/library/view/the-missing-readme/9781098129064/c11.xhtml)は、後方互換性と先方互換性の話です。

他にも、Agile、マネージメント、キャリア的な話もあったりします。

---

## その他

扱ってる内容はかなり幅広いですが、章ごとの依存関係はほとんどないように書かれている気がするので、どこから読んでも大丈夫な気がしました。
300ページぐらいでこれまとめたのは素直にすごいと思ったので、どこからか翻訳が出版されるといいなーと思いました。（ちゃんと外部リソースにリンクにして説明しすぎないことに気を配ってる気がしました）

自分は[ACM会員のO'Reilly Learning Platformを利用できる仕組み](https://learning.acm.org/e-learning/oreilly)を使って、[オライリー上のThe Missing README](https://learning.oreilly.com/library/view/the-missing-readme/9781098129064/)を読みました(Thanks to [📖 Book Supporter](https://github.com/sponsors/azu))
