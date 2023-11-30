---
title: "Secretlint 8リリース: OpenAIのAPIトークンの検出に対応"
author: azu
layout: post
date : 2023-11-30T18:11
category: secretlint
tags:
    - secretlint
    - openai

---

Secretlint 8をリリースしました。

- [Release v8.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v8.0.0)

Secretlintは、ソースコードや設定ファイルから機密情報を見つけて報告するLintツールです。

ブラウザでは、次のURLから試すことができます。

- [secretlint.github.io](https://secretlint.github.io/)

次のコマンドで、推奨ルールセットでの検証を実行できます。

Docker:

```bash
docker run -v `pwd`:`pwd` -w `pwd` --rm -it secretlint/secretlint secretlint "**/*"
```

Node.js:

```bash
npx @secretlint/quick-start "**/*"
```

## Secretlint 8で追加されたルール

[OpenAI](https://openai.com/)のAPIトークンを検出するルールが追加されました。

- [@secretlint/secretlint-rule-openai](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-openai)

推奨ルールセットである[@secretlint/secretlint-rule-preset-recommend](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-preset-recommend)にもOpenAIのルールが追加されています。

## OpenAIのAPIトークンのフォーマット

OpenAIのAPIトークンのフォーマットはドキュメントとしては公開されていないですが、次のような正規表現に一致するトークンが利用されています。

```
sk-[a-zA-Z0-9]{20}T3BlbkFJ[a-zA-Z0-9]{20}
```

`T3BlbkFJ` は `OpenAI` をBase64エンコードしたものです。

```js
btoa("OpenAI") // => "T3BlbkFJ"
```

参考:

- [What are the valid characters for the APIKey? - API - OpenAI Developer Forum](https://community.openai.com/t/what-are-the-valid-characters-for-the-apikey/288643)