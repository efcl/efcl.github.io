---
title: "textlint 11.9.0 .textlintignoreの無視ファイルをサポート"
author: azu
layout: post
date : 2021-03-21T21:45
category: JavaScript
tags:
    - textlint
    - JavaScript

---

[textlint@11.9.0](https://github.com/textlint/textlint/releases/tag/textlint%4011.9.0)で`.textlintignore`ファイルでの無視リストをサポートしています。

[@frozenbonito](https://github.com/frozenbonito)さんが実装してくれました。

- [Add .textlintignore support by frozenbonito · Pull Request #748 · textlint/textlint](https://github.com/textlint/textlint/pull/748)

`.textlintignore` に `.gitignore` と同じように無視するファイルの一覧を書きます。

```
# Ignore file:
ignored.md

# Ignore by glob pattern:
generated/**
```

デフォルトでは、`.textlintignore` ファイルを読み込み、その無視パターンにマッチするファイルはLintの対象にはなりません。

次のサンプルリポジトリでは、次のようなファイル構造になっています。

- [azu/textlint-ignore-example: .textlintignore example repository.](https://github.com/azu/textlint-ignore-example)


```
.
├── .gitignore
├── .textlintignore
├── .textlintrc
├── README.md
├── generated
│   └── test.md
├── ignored.md
├── package-lock.json
└── package.json
```

このサンプルリポジトリの`.textlintignore`には次のように書かれています。

```
# path to file
ignored.md
# glob pattern
generated/**
```

この無視の定義によって`ignored.md`と`generated/test.md`はLintの対象になりません。

基本的には`.gitignore`や`.eslintignore`と同じ定義形式となっているため、
`textlint --ignore-path .gitignore` のように別の定義ファイルを使い回すこともできると思います。

詳細は[Ignoring Text · textlint](https://textlint.github.io/docs/ignore.html)を参照してください。
