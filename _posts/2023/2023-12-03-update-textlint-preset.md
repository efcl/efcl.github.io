---
title: "textlintのプリセットルールをGitHubの新しい強調構文に対応させた"
author: azu
layout: post
date : 2023-12-03T15:59
category: textlint
tags:
    - textlint
    - Markdown

---

最近、GitHubに新しいタイプの強調構文が追加されました。

![GitHub Admonitions syntax](https://efcl.info/wp-content/uploads/2023/12/03-1701586826.png)

Markdownの引用ブロックの中に `![TYPE]` を入れることで、アイコン付きの強調構文を利用できます。

```markdown
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.
```

現在はベータ的なサポートになっていますが、GitHubのIssueやReleasesなど大体の場所で利用できます。

- [[Markdown] An option to highlight a &quot;Note&quot; and &quot;Warning&quot; using blockquote (Beta) · community · Discussion #16925](https://github.com/orgs/community/discussions/16925)

AsciiDocのAdmonitionsという機能とよく似た機能です。

- [Admonitions | Asciidoctor Docs](https://docs.asciidoctor.org/asciidoc/latest/blocks/admonitions/)

この構文なのですが、[CommonMark](https://commonmark.org/)や[GitHub Flavored Markdown Spec](https://github.github.com/gfm/)でも特に定義されたものではないため、パーサー的にはBlockquoteに`[!TYPE]`という文字列が入ってるという扱いになります。

## textlintのルールをGitHubの新しい強調構文に対応させた

textlintのルールには、`[`と`]`の対応があるかをチェックする[@textlint-rule/textlint-rule-no-unmatched-pair](https://github.com/textlint-rule/textlint-rule-no-unmatched-pair)というルールがありますが、このルールがこの新しい構文で壊れるケースがありました。

- [`Not found pair character for [.` when using new highlight blockquote syntax · Issue #16 · textlint-rule/textlint-rule-no-unmatched-pair](https://github.com/textlint-rule/textlint-rule-no-unmatched-pair/issues/16)
    - `!` をセンテンスの区切り文字として扱ってしまっていてため、`[!NOTE]` が `[` と `]` が別々のセンテンスに分割されてしまう問題があった

内部的には[sentence-splitter](https://github.com/textlint-rule/sentence-splitter)という文章をセンテンスに分割するライブラリを使っていて、このライブラリが古いと起きる問題でした。

そのため、[sentence-splitter](https://github.com/textlint-rule/sentence-splitter)を使ってるルールを更新して、GitHubの新しい強調構文でも問題が起きないように修正しました。

また、自分がメンテナンスしているtextlintのプリセットルールも更新しました。

- [Release v9.0.0 · textlint-ja/textlint-rule-preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing/releases/tag/v9.0.0)
- [Release v9.0.0 · textlint-ja/textlint-rule-preset-japanese](https://github.com/textlint-ja/textlint-rule-preset-japanese/releases/tag/v9.0.0)

今回のアップデートでNode.js 18以降のみのサポートとなっています。
また、エラー報告に[locator](https://textlint.github.io/docs/rule.html) APIを使うようにして、より正確な位置を報告できるようになっています。

## おわりに

```markdown
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.
```

GitHubの新しい強調構文を使って、textlintが余計なエラーが起きたらとりあえずルールをアップデートして見てください。
また、最新のバージョンでも問題が起きる場合は、Issueを立ててもらえると助かります。
