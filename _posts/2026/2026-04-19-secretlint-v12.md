---
title: "Secretlint v12.0.0リリース: Groq、Hugging Face、Notion、GitLab、Grafana、HashiCorp Vault、Vercel、Databricks、Docker、Figmaの検出に対応"
author: azu
layout: post
date : 2026-04-19T14:00+09:00
category: secretlint
tags:
    - secretlint
    - security
    - nodejs

---

機密情報を検出するSecretlintのv12.0.0をリリースしました。

- [Release v12.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v12.0.0)

Secretlintは、ソースコードや設定ファイルに含まれるAPIトークンやパスワードなどの機密情報を見つけて報告するLintツールです。

- [secretlint/secretlint: Pluggable linting tool to prevent committing credential.](https://github.com/secretlint/secretlint)

このバージョンでは、10個のサービスに対応する検出ルールを追加しました。
対応サービスは、Groq、Hugging Face、Notion、GitLab、Grafana、HashiCorp Vault、Vercel、Databricks、Docker、Figmaです。
あわせて、`@secretlint/secretlint-rule-preset-recommend`のパッケージサイズを約80%削減しています。

## 新しく追加された検出ルール

`@secretlint/secretlint-rule-preset-recommend`に、次の10個のサービスのAPIトークンなどを検出するルールが追加されました。

- [Groq](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-groq) - `gsk_`から始まるAPIキー
- [Hugging Face](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-huggingface) - `hf_`から始まるUser Access Token
- [Notion](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-notion) - `secret_`/`ntn_`から始まるIntegration Token
- [GitLab](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-gitlab) - Personal Access Token、Pipeline Trigger Token、Runner Registration Tokenなど
- [Grafana](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-grafana) - Service Account TokenやCloud Access Policy Token
- [HashiCorp Vault](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-hashicorp-vault) - `hvs.`/`hvb.`から始まるトークン
- [Vercel](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-vercel) - Access Token
- [Databricks](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-databricks) - `dapi`から始まるPersonal Access Token
- [Docker](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-docker) - `dckr_pat_`から始まるPersonal Access TokenとDocker Hub認証情報
- [Figma](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-figma) - `figd_`/`figu_`/`figoa_`などで始まるトークン

`@secretlint/secretlint-rule-preset-recommend`を使っている場合は、v12.0.0にアップデートすると自動的にこれらのルールも有効になります。

## Presetのパッケージサイズを約80%削減

`@secretlint/secretlint-rule-preset-recommend`のパッケージサイズを、v11と比べて約82%削減しました。

| Preset | v11 | v12 | 削減率 |
|---|---|---|---|
| `@secretlint/secretlint-rule-preset-recommend` | 1,036KB | 187KB | -82% |
| `@secretlint/secretlint-rule-canary` | 1,060KB | 211KB | -80% |

10個のルールが増えたにもかかわらず、全体としては約82%縮小しています。

主な要因は、GCPのService Account p12ファイル検出ルール(`@secretlint/secretlint-rule-gcp`)で使っていた`node-forge`依存の置き換えです。
Web CryptoベースのPKCS#12 MAC検証実装に差し替えました。
p12ファイルの判定に必要なのはMACの検証だけなので、パース・復号処理を含む`node-forge`全体を抱える必要がなくなりました。

- [Replace node-forge with native PKCS#12 MAC verification by azu · Pull Request #1497](https://github.com/secretlint/secretlint/pull/1497)

## Breaking Change: Node.js 22+のサポート

v12.0.0では、Node.js 20のサポートを終了し、Node.js 22以上が必要になりました。
Node.js 20は2026-04-30でActive LTSが終了するため、少し前倒しでサポートを切っています。

## Breaking Change: CommonJSビルドの削除

v12.0.0では、各パッケージのCommonJSビルドと、CJS/ESMのdual packageサポートを削除しました。
ESMのみの配布になります。

Secretlint自体は[v7.0.0でESMへ移行済み](https://efcl.info/2023/07/05/secretlint-v7/)でしたが、互換性のためCJS向けのビルドも残していました。
Node.js 22+でESMの利用が一般化したため、dual packageの保守コストを削減するためにCJSビルドを削除しています。

SecretlintをCLIとして利用している場合、特に影響はありません。
プログラムから`@secretlint/node`や`@secretlint/core`などを`require()`で読み込んでいる場合は、`import`に書き換える必要があります。

## 使っているプロジェクト: SecureClipboard

Secretlintを組み込んだプロジェクトの例として、先日公開した[SecureClipboard](https://github.com/secretlint/secure-clipboard)を紹介します。

- [SecureClipboard: クリップボードに入った機密情報を自動でマスクするmacOSアプリ | Web Scratch](https://efcl.info/2026/04/19/secure-clipboard/)

SecureClipboardはクリップボードを監視するmacOSアプリです。
コピーされたテキストや画像に機密情報が含まれていた場合、自動でマスクします。
内部では[secretlintの単一バイナリ版](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/binary)をsubprocessとして呼び出してスキャンしています。

v12.0.0で追加されたGroqやHugging Face、Notion、Vercel、Docker、Figmaなどのトークンも、SecureClipboard側で追加対応なしに検出できます。
このように、secretlintをライブラリ/バイナリとして組み込む使い方でも、presetをアップデートするだけで検出対象を拡張できます。

## まとめ

Secretlint v12.0.0では、10個のサービスに対応する新しい検出ルールを`@secretlint/secretlint-rule-preset-recommend`に追加しました。
同時にpresetのサイズを約80%削減しています。
CJSビルドの削除というBreaking Changeがあるので、ライブラリとして利用している場合はESMへの移行が必要です。

フィードバックがあればGitHubのIssueでお知らせください。

- [Release v12.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v12.0.0)
- [Issues · secretlint/secretlint](https://github.com/secretlint/secretlint/issues)
