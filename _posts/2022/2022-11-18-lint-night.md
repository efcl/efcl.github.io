---
title: "Lint NightでtextlintとLinterの作り方について発表した"
author: azu
layout: post
date : 2022-11-18T21:52
category: イベント
tags:
    - textlint
    - イベント

---

[Lint Night #1](https://lintnight.connpass.com/event/263931/)で[textlint](https://textlint.github.io/)について発表してきました。

- スライド: [textlint - Linterの作り方](https://azu.github.io/slide/2022/lint-night/textlint.html)

[textlint - Linterの作り方](https://azu.github.io/slide/2022/lint-night/textlint.html)では、textlintを作った背景や自然言語に大統一フォーマットは無理であるためプラガブルなアーキテクチャをとった理由などについて話しています。

また、プラガブルなアーキテクチャのメリットやデメリット、プラガブルにすることでコアの責務をはっきりさせることができます。
一方で、メンテナンスも分離されてしまうという問題に対応するコミュニティの話などを書いています。

textlintでは、パーサ、ルール、フォーマッターが全てプラグインとして実装できます。
パーサはコアに近いものにしてtextlint organizationにプラグインコミュニティを作り、ルールなどは別のOrganizationに分けている話なども紹介しています。

- [textlint plugin ownership · Discussion #1 · textlint](https://github.com/orgs/textlint/discussions/1)
- [1Password for Open Source Projectsの申請をした | Web Scratch](https://efcl.info/2022/09/23/1password-teams-open-source/)

最後にLinterなどを開発するために使わないと作れないという話をしています。
自分が作ってるもう一つのLinterdである[Secretlint](https://secretlint.github.io/)などの事例も一緒に紹介しています。

懇親会では、プラグインアーキテクチャの話が多い感じでした。
次の書籍で、JavaScriptでよくみるプラグインの仕組みを紹介しているので、参考にしてみてください。

- [JSのプラグインシステムについて書くJavaScript Plugin Architecture 2.0をリリースしました | Web Scratch](https://efcl.info/2020/09/13/javascript-plugin-architecture-2.0/)
- [この書籍について · JavaScript Plugin Architecture](https://azu.github.io/JavaScript-Plugin-Architecture/)

## おわりに

[Lint Night #1 - connpass](https://lintnight.connpass.com/event/263931/) 運営ありがとうございました。
