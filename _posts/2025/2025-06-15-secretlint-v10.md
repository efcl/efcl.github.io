---
title: "Secretlint v10.0.0リリース: デフォルトでシークレットをマスク表示するように変更、Node.js 20+のサポート"
author: azu
layout: post
date : 2025-06-15T09:00
category: secretlint
tags:
    - secretlint
    - security
    - nodejs

---

機密情報を検出するCLIであるSecretlintのv10.0.0をリリースしました！

- [Release v10.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v10.0.0)

このバージョンでは、デフォルトでLintの結果のシークレットをマスクして表示するように変更されました。

## Secretlint v10.0.0の変更点

主要な変更点は次の通りです。詳細はリリースノートを参照してください。

- [Release v10.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v10.0.0)

### 🛡️ シークレットのマスク表示がデフォルトに

最も大きな変更は、見つけたシークレットをデフォルトでマスクして表示するようになったことです。

**変更前:**

<!-- secretlint-disable -->
```
✖ found credential: github_token
  GITHUB_TOKEN=ghp_1234567890abcdef1234567890abcdef12345678
```

**変更後（v10.0.0）:**
```
✖ found credential: github_token
  GITHUB_TOKEN=*******************************************
```

#### 実際のシークレット値を確認したい場合

デバッグなどで実際のシークレット値を確認したい場合は、`--no-maskSecrets` オプションを使用できます。

```bash
# デフォルト（マスク表示）
$ secretlint "**/*"

~/secretlint/secretlint/examples/cli/credential
  1:0  error  [AWSSecretAccessKey] found AWS Secret Access Key: ****************************************  @secretlint/secretlint-rule-preset-recommend > @secretlint/secretlint-rule-aws

✖ 1 problems (1 errors, 0 warnings)

# 実際のシークレット値を表示
$ secretlint --no-maskSecrets "**/*"

~/secretlint/secretlint/examples/cli/credential
  1:0  error  [AWSSecretAccessKey] found AWS Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYSECRETSKEY  @secretlint/secretlint-rule-preset-recommend > @secretlint/secretlint-rule-aws

✖ 1 problems (1 errors, 0 warnings)
```

<!-- secretlint-enable -->

### 🚨 Node.js 20+サポートへの変更

Node.js 18のサポートを終了し、Node.js 20以上が必要になりました。

## 移行ガイド

### Node.jsバージョンの更新

Secretlint v10.0.0を使用するには、Node.js 20.0.0以上が必要です。

```bash
# Node.jsバージョンの確認
node --version  # v20.0.0以上である必要があります

# 必要に応じてNode.jsをアップデート
```

### CI/CDでの設定更新

GitHub ActionsなどのCI/CDでSecretlintを使用している場合は、Node.jsバージョンを更新してください。

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22
```

### マスク表示への対応

新しいデフォルトのマスク表示では、次の情報は引き続き表示されます。

- ファイルパスと行番号
- ルール名
- エラーメッセージ

実際のシークレット値のみがマスクされるため、デバッグに必要な情報は保持されています。

実際の値を確認する必要がある場合は、`--no-maskSecrets`オプションを使用してください。

## なぜデフォルトでマスクするように変更したかについて

最近の開発環境では、次のような状況が増えています。

- AIツール: GitHub Copilot、Cursor、Claude CodeなどのAIツールがターミナル出力を解析する
    - シークレットの場所は出るので本質的には変わらないが、標準出力を読み取るツールが増えている
- クラウドCI/CD: CI/CDに外部サービスを利用するのが一般的なので、意図せずに長期間シークレットがログに残る
- 画面共有: デモや会議でターミナルを共有する機会が増え、意図せずシークレットが表示される

見つかったシークレットはローテーションする必要があるので、本質的な問題は特に変わりません。
しかし、シークレットが外部に渡るケースが増えているので、デフォルトの動作を変更しました。

Secretlint v10.0.0では、この問題を解決するためにデフォルトでマスク表示を行うようにして、デフォルトを安全に倒しました。

## まとめ

Secretlint v10.0.0は、デフォルトで結果をマスク表示するように変更しました。
ツールの使われ方の変化しているので、デフォルトを安全に倒すようにしました。

フィードバックがありましたら、GitHubのIssueでお知らせください。

- [Issues · secretlint/secretlint](https://github.com/secretlint/secretlint/issues)
