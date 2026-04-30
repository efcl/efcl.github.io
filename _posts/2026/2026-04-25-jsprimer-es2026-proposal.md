---
title: "JavaScript PrimerのES2026対応を手伝ってくれるContributorとSponsorを募集しています"
author: azu
layout: post
date : 2026-04-25T12:00+09:00
category: JavaScript
tags:
    - JavaScript
    - ECMAScript
    - proposal
    - jsprimer
    - OpenSource

---

JavaScript Primer ([https://jsprimer.net/](https://jsprimer.net/)) では、毎年ECMAScriptの新しい仕様への追従を行っています。

ES2026は2026年6月に正式リリースされる予定です。
TC39ではすでにFeature Freezeが行われ、ES2026に入る予定の機能が確定しています。

- [TC39 Process](https://tc39.es/process-document/)

今年もES2026で追加される機能についての対応Issueを作成しました。

これらのIssueを一緒に進めてくれるContributorと、JavaScript Primerの活動を支援してくれるSponsorを募集しています。

## ES2026対応のIssue

ES2026のMeta Issueとして次のIssueがあります。

- [ES2026の対応 · Issue #1869 · js-primer/js-primer](https://github.com/js-primer/js-primer/issues/1869)

具体的に対応するものとして次のIssueを作成しています。

- [ES2026: Error.isError · Issue #1872 · js-primer/js-primer](https://github.com/js-primer/js-primer/issues/1872)
    - 見積もり: 2 point
- [ES2026: Map.prototype.getOrInsert / getOrInsertComputed (Upsert) · Issue #1873 · js-primer/js-primer](https://github.com/js-primer/js-primer/issues/1873)
    - 見積もり: 3 point
- [ES2026: JSON.rawJSON (JSON.parse source text access) · Issue #1874 · js-primer/js-primer](https://github.com/js-primer/js-primer/issues/1874)
    - 見積もり: 2 point
- [ES2026: Iterator.concat (Iterator Sequencing) · Issue #1875 · js-primer/js-primer](https://github.com/js-primer/js-primer/issues/1875)
    - 見積もり: 2 point

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

ES2026に対応するマイルストーンは、次のページで公開しています。

- [v8(ES2026) Milestone](https://github.com/js-primer/js-primer/milestone/7)

ES2026は2026年6月末ぐらいに公開される予定なので、7月ぐらいには完成させる予定です。

去年のES2025対応 ([JavaScript PrimerのES2025対応を手伝ってくれるContributorとSponsorを募集しています | Web Scratch](https://efcl.info/2025/04/25/jsprimer-es2025-proposal/)) と比べると、今年のES2026は粒度が比較的均一で、1人1Issueで分担しやすいラインナップになっています。

## Contributorを募集しています

JavaScript Primerの執筆、レビュー、サンプルコード作成、仕様調査などに興味がある方を募集しています。

今年のIssueは1人1Issueで分担しやすい粒度なので、それぞれのIssueに興味がある人を募集しています。

- 募集しているDiscussion: [ES2026に対応するIssueへのContributorを募集しています · js-primer/js-primer · Discussions](https://github.com/js-primer/js-primer/discussions)

去年のES2025対応の振り返りを踏まえ、今年もオンボーディングやコミュニケーションを丁寧に行いたいと考えています。
IssueにAssignしたあと、どういうイメージで書いていくかをやり取りしながら進めていく形をベースにします。
LLMが下書きレベルなら出してくれるので、具体に近いものを見ながら方向性を合わせていけると進めやすいと思います。

Contributeしたい人は、次のDiscussionに参加してみてください。

- [ES2026に対応するIssueへのContributorを募集しています · js-primer/js-primer · Discussions](https://github.com/js-primer/js-primer/discussions)

### Open Collectiveによる報酬

JavaScript Primerは[Open Collective](https://opencollective.com/jsprimer)を通じて、活動資金の支援を受け付けています。
Contributorとして参加していただいた方には、この予算から[Contributing Expenses Policy](https://github.com/js-primer/js-primer/blob/master/CONTRIBUTING_EXPENSE.md)に基づき、作業量に応じた報酬を請求できます。

報酬額は、Issueごとに設定された`point`に基づいて計算されます。
現時点での年間予算は約$1420で、これを元に計算すると **1 pointあたり約$23** となります。

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

- [Contributing Expenses Policy](https://github.com/js-primer/js-primer/blob/master/CONTRIBUTING_EXPENSE.md)

### 書き方について

JavaScript Primerは技術書であるため、次の点に気をつけて書いていきます。

- **正確性**: 仕様やMDN、信頼できる情報源を元に、矛盾のない正確な記述をします。
- **読みやすさ**: 読者が理解しやすいように、平易な言葉遣いや構成を意識しますが、[textlint](https://textlint.org/)のチェックがあるのである程度強制されます。
    - LLMの利用自体は問題ありませんが、最終的な品質は人間が読みやすかどうかで判断します
- **サンプルコード**: ユースケースに基づいた、実践的で理解しやすいサンプルコードを扱います。なぜそのコードが必要なのか、どのような場面で役立つのかが伝わるように意識します。
    - 実際に使われているパターンなどをもとにサンプルコードを書きます
- **目的意識**: jsprimerには[はじめに · JavaScript Primer #jsprimer](https://jsprimer.net/intro/)に書いているように、本書の目的と目的ではないことが書かれています
    - 毎年悩むのは「どこまで書くか」ということですが、悩んだ時は本書の目的に立ち返って判断します

実際に書籍を書くときには、[textlint](https://textlint.org/)による文章のチェックやレビューやサンプルコードに対するテストの仕組みなどもあるので、文章ですがコードを書くような感覚で書いていくのが良いと思います。

詳しい書き方やルールについては、次のドキュメントを参照してください。

- [Contribution Guide](https://github.com/js-primer/js-primer/blob/master/CONTRIBUTING.md)

## 参加方法

Contributorとして参加してみたい方は、次のDiscussionにコメントしてみてください。

- [ES2026に対応するIssueへのContributorを募集しています · js-primer/js-primer · Discussions](https://github.com/js-primer/js-primer/discussions)

ご興味のある方、ぜひ参加してみてください！

## Sponsorを募集しています

JavaScript Primerの活動は、個人や企業のSponsorからの支援によって支えられています。
書籍の継続的なメンテナンスや改善活動を支援してくださるSponsorを随時募集しています！

現在のGold Sponsorは次の通りです。ご支援ありがとうございます！

**Gold Sponsors**

<a href="https://being-i.sh/" title="being-ish Inc."><img src="https://images.opencollective.com/being-ish/66099a1/logo/256.png?height=166" height="166" alt="" loading="lazy"></a>


- [being-ish Inc.](https://being-i.sh/)

**Supporters**

[![jsprimer backers](https://opencollective.com/jsprimer/backers.svg?width=890&avatarHeight=40)](https://opencollective.com/jsprimer#backers)


jsprimerの更新を金銭的にサポートしたいという方は、是非検討してみてください！

詳細は[JavaScript Primerスポンサー · JavaScript Primer #jsprimer](https://jsprimer.net/intro/sponsors/)をご覧ください。

- [JavaScript Primer - Open Collective](https://opencollective.com/jsprimer)
- [JavaScript Primerスポンサー · JavaScript Primer #jsprimer](https://jsprimer.net/intro/sponsors/)

### 参考: 前回までの募集

- [JavaScript PrimerのES2025対応を手伝ってくれるContributorとSponsorを募集しています | Web Scratch](https://efcl.info/2025/04/25/jsprimer-es2025-proposal/)
- [JavaScript PrimerのES2024対応を手伝ってくれるContributorとSponsorを募集しています | Web Scratch](https://efcl.info/2024/03/21/jsprimer-es2024-proposal/)
- [ES2025に対応するIssueへのContributorを募集しています · asciidwango/js-primer · Discussion #1789](https://github.com/asciidwango/js-primer/discussions/1789)
- [ES2024に対応するIssueへのContributorを募集しています · asciidwango/js-primer · Discussion #1727](https://github.com/asciidwango/js-primer/discussions/1727)
