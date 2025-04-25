---
title: "JavaScript PrimerのES2025対応を手伝ってくれるContributorとSponsorを募集しています"
author: azu
layout: post
date : 2025-04-25T09:00+09:00
category: JavaScript
tags:
    - JavaScript
    - ECMAScript
    - proposal
    - jsprimer
    - OpenSource

---

JavaScript Primer ([https://jsprimer.net/](https://jsprimer.net/)) では、毎年ECMAScriptの新しい仕様への追従を行っています。

ES2025はもうすでにリリース候補が公開されていて、2025年6月に正式リリースされる予定です。
- [Release ES2025 Candidate April 23rd 2025 · tc39/ecma262](https://github.com/tc39/ecma262/releases/tag/es2025-candidate-2025-04-23)

今年もES2025で追加される機能についての対応Issueを作成しました。

これらのIssueを一緒に進めてくれるContributorと、JavaScript Primerの活動を支援してくれるSponsorを募集しています。

## ES2025対応のIssue

ES2025のMeta Issueとして次のIssueがあります

- [ES2025の対応 · Issue #1778 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1778)

具体的に対応するものとして次のIssueを作成しています。

- [ES2025: Set Methods for JavaScript · Issue #1784 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1784)
    - 見積もり: 3 or 5 point
- [ES2025: import attributes · Issue #1783 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1783)
    - 見積もり: 1 or 2 point
- [ES2025: Iterator Helpers · Issue #1782 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1782)
    - 見積もり: 8+ point の可能性あり
- [ES2025: `RegExp.escape` · Issue #1781 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1781)
    - 見積もり: 2 or 3 point

各Issueには、作業量の見積もりとして`point`を付与しています。(これは感覚値なのであんまり正確ではないです。実際にやってみたら変わる可能性もあります)
この`point`は、作業の難易度や必要な調査量などを考慮して設定していて、後述するOpen Collectiveでの報酬計算にも利用します。

`point`の目安は以下の通りです。これは作業時間ではなく、タスクの複雑さや規模を表す指標です。
例えば2 pointは「1日あれば終わるかな」という感覚値に近いものです。

| Point | Description                                  |
| ----- | -------------------------------------------- |
| 0     | 些細な変更 (typo修正など)                    |
| 1     | 2 よりは簡単                                 |
| 2     | 大体1日分の作業量で終わる想定                |
| 3     | 2 よりは難しい                               |
| 5     | かなり難しい、調査や広範な変更が必要         |
| 8     | 難易度がとても高く、できる人が限られるレベル |

ES2025に対応するマイルストーンは、次のページで公開しています。

- [v7(ES2025) Milestone](https://github.com/asciidwango/js-primer/milestone/6)

ES2025は毎年6月末ぐらいに公開される予定なので、7月ぐらいには完成させる予定です。

## Contributorを募集しています

JavaScript Primerの執筆、レビュー、サンプルコード作成、仕様調査などに興味がある方を募集しています。

今年のIssueは、1人 1Issueで綺麗に分けられると思うので、それぞれのIssueに興味がある人を募集しています。

- 募集しているDiscussion: [ES2025に対応するIssueへのContributorを募集しています · asciidwango/js-primer · Discussion #1789](https://github.com/asciidwango/js-primer/discussions/1789)

去年のES2024対応 ([JavaScript PrimerのES2024対応を手伝ってくれるContributorとSponsorを募集しています | Web Scratch](https://efcl.info/2024/03/21/jsprimer-es2024-proposal/)) の反省を踏まえ、今年はもう少しオンボーディングやコミュニケーションを丁寧に行いたいと考えています。
IssueにAssignはすると思うのですが、どういうイメージで書いていくかをやり取りしながら進めていければいいかなと思っています。
(幸いLLMが充実してきているので、下書きレベルならざっくりと出せると思うので、具体に近いものを見ながら進めていけるといいのではないかなと思ってます。)

特に、[Iterator Helpers](https://github.com/asciidwango/js-primer/issues/1782)のように難易度が高いものは、事前にオンラインミーティングなどで進め方や認識合わせをする機会を設けたいと思っています。
Iterator Helpersは正直かなり難易度が高いので、実際に手を動かせるレベルになるまではもうちょっとかかりそうな気がします。
(一応募集はしていますが、これは結構な気合いが必要なIssueだと思っています。)

Contributeしたい人は、次のDiscussionに参加してみてください。

- [ES2025に対応するIssueへのContributorを募集しています · asciidwango/js-primer · Discussion #1789](https://github.com/asciidwango/js-primer/discussions/1789)

### Open Collectiveによる報酬

JavaScript Primerは[Open Collective](https://opencollective.com/js-primer)を通じて、活動資金の支援を受け付けています。
Contributorとして参加していただいた方には、この予算から[Contributing Expenses Policy](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING_EXPENSE.md)に基づき、作業量に応じた報酬を請求できます。

報酬額は、Issueごとに設定された`point`に基づいて計算されます。
現時点での年間予算は約$421で、これを元に計算すると **1 pointあたり約$7** となります。

`point`の目安は以下の通りです。これは作業時間ではなく、タスクの複雑さや規模を表す指標です。

| Point | Description                                  |
| ----- | -------------------------------------------- |
| 0     | 些細な変更 (typo修正など)                    |
| 1     | 2 よりは簡単                                 |
| 2     | 大体1日分の作業量で終わる想定                |
| 3     | 2 よりは難しい                               |
| 5     | かなり難しい、調査や広範な変更が必要         |
| 8     | 難易度がとても高く、できる人が限られるレベル |

過去のIssueに対応するpointの参考値やOpen Collectiveの利用方法については次のページを参照してください。

- [Contributing Expenses Policy](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING_EXPENSE.md)

### 書き方について

JavaScript Primerは技術書であるため、次の点に気をつけて書いていきます。

- **正確性**: 仕様やMDN、信頼できる情報源を元に、矛盾のない正確な記述をします。
- **読みやすさ**: 読者が理解しやすいように、平易な言葉遣いや構成を意識しますが、[textlint](https://textlint.org/)のチェックがあるのである程度強制されます。
    - LLMの利用自体は問題ありませんが、最終的な品質は人間が読みやすかどうかで判断します
- **サンプルコード**: ユースケースに基づいた、実践的で理解しやすいサンプルコードを扱います。なぜそのコードが必要なのか、どのような場面で役立つのかが伝わるように意識します。
    - 実際に使われているパターンなどをもとにサンプルコードを書きます
- **目的意識**: jsprimerには[はじめに · JavaScript Primer #jsprimer](https://jsprimer.net/intro/)に書いているように、本書の目的と目的ではないことが書かれています
    - 毎年悩むのは「どこまで書くか」ということですが、悩んだ時は本書の目的に立ち返って判断します

これもLLMを使って一部書いていますが、やや小難しくなりがちです。

実際に書籍を書くときには、[textlint](https://textlint.org/)による文章のチェックやレビューやサンプルコードに対するテストの仕組みなどもあるので、文章ですがコードを書くような感覚で書いていくのが良いと思います。

詳しい書き方やルールについては、次のドキュメントを参照してください。

- [Contribution Guide](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md)

## 参加方法

Contributorとして参加してみたい方は、次のDiscussionにコメントしてみてください。

- [ES2025に対応するIssueへのContributorを募集しています · asciidwango/js-primer · Discussion #1789](https://github.com/asciidwango/js-primer/discussions/1789)

ご興味のある方、ぜひ参加してみてください！

## Sponsorを募集しています

JavaScript Primerの活動は、個人や企業のSponsorからの支援によって支えられています。
書籍の継続的なメンテナンスや改善活動を支援してくださるSponsorを随時募集しています！

今年の更新に関する費用は、次の方々の支援によって成り立っています。
ご支援ありがとうございます！

**Gold Sponsors**

<a href="https://kokuchou.net/" title="株式会社コクチョウ"><img src="https://images.opencollective.com/kokuchou/4241e96/logo/256.png?height=166" height="166" alt="" loading="lazy"></a>


- [株式会社コクチョウ](https://kokuchou.net/)

**Supporters**

[![jsprimer backers](https://opencollective.com/jsprimer/backers.svg?width=890&avatarHeight=40)](https://opencollective.com/jsprimer#backers)


jsprimerの更新を金銭的にサポートしたいという方は、是非検討してみてください！

詳細は[JavaScript Primerスポンサー · JavaScript Primer #jsprimer](https://jsprimer.net/intro/sponsors/)をご覧ください。

- [JavaScript Primer - Open Collective](https://opencollective.com/jsprimer)
- [JavaScript Primerスポンサー · JavaScript Primer #jsprimer](https://jsprimer.net/intro/sponsors/)

## オマケ: TSKaigi 2025での発表

[TSKaigi 2025](https://2025.tskaigi.org/)の2日目に、JavaScript Primerの取り組みについて発表する予定です。

> 技術書をソフトウェア開発する - jsprimerの10年から学ぶ継続的メンテナンスの技術
> https://2025.tskaigi.org/talks?day=2

JavaScript Primerという書籍が作られ、どのようにメンテナンスされているかといった内容について話す予定です。
発表は一ヶ月後なので、その頃にはES2025対応もある程度進んでいる（または始めている）状態になっていると思います。

興味がある人は、ぜひ見にきてください！

### 参考: 前回の募集

- [JavaScript PrimerのES2024対応を手伝ってくれるContributorとSponsorを募集しています | Web Scratch](https://efcl.info/2024/03/21/jsprimer-es2024-proposal/)
- [ES2024に対応するIssueへのContributorを募集しています · asciidwango/js-primer · Discussion #1727](https://github.com/asciidwango/js-primer/discussions/1727)


