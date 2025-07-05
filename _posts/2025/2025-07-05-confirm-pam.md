---
title: "AI Agentのコマンド実行にTouch IDを使った「人間の確認」を挟むCLIツール confirm-pam を作った"
author: azu
layout: post
date: 2025-07-05T15:30
category: Security
tags:
  - Security
  - macOS
  - CLI
  - Rust
---

macOS で Touch ID を使った生体認証を提供する CLI ツール [confirm-pam](https://github.com/azu/confirm-pam) を作りました。

- [azu/confirm-pam: CLI tool for biometric authentication confirmation prompts](https://github.com/azu/confirm-pam)

このツールを使うことで、任意のコマンドやスクリプトの実行前に、Touch IDによる生体認証を要求できます。
コマンドラインから実行される処理に対して、人間による明示的な確認ステップを追加する仕組みを提供します。

## confirm-pam とは

confirm-pam は、macOS の Touch ID を使った生体認証による確認プロンプトを提供する CLI ツールです。

### 主な特徴

- Touch ID 認証をサポート
- 認証ダイアログに任意のメッセージを表示
- 0（成功）、1（失敗）、2（エラー）の3つの終了コードで結果を判定
- 最小限の依存関係で高速起動
- Rust製で高速なネイティブ実行とメモリ安全性を実現

基本的な使い方は次のようになります。

```bash
# 基本的な認証プロンプト
confirm-pam "この操作を実行しますか？"

# 認証成功時の終了コードは0
echo $? # 0

# 認証失敗時やキャンセル時の終了コードは1
# Touch IDの認証を失敗またはキャンセルした場合
echo $? # 1
```

## インストール方法

confirm-pam は[crates.io](https://crates.io/crates/confirm-pam)で公開されているため、cargo でインストールできます。

```bash
cargo install confirm-pam
```

また、GitHub からソースコードをクローンしてビルドできます。

```bash
git clone https://github.com/azu/confirm-pam.git
cd confirm-pam
cargo build --release
```

### 必要な環境

- macOS 10.12.2 以降
- Touch ID 対応デバイス
- Touch ID がシステム環境設定で有効化されていること

## 基本的な使い方

confirm-pam は非常にシンプルな API を提供しています。

```bash
confirm-pam [メッセージ]
```

メッセージを指定すると、Touch ID の認証ダイアログにそのメッセージが表示されます。

```bash
# カスタムメッセージで認証
confirm-pam "重要な変更をコミットしようとしています。続行しますか？"
```

終了コードによって認証結果を判定できます。例えば次のような値が返されます。

- `0`: 認証成功
- `1`: 認証失敗またはユーザーによるキャンセル
- `2`: システムエラー（Touch ID が無効化されている等）

## 実用例

confirm-pam は様々な場面で活用できます。ここでは代表的な使用例を紹介します。

### Git hook での活用

危険な git コマンドを実行する前に確認を挟む例です。`--no-verify` オプションのような、通常の安全チェックを回避するコマンドの実行前に認証を要求します。

```bash
# ~/.zshrc や ~/.bashrc に追加
git() {
  if [[ $@ == *'commit'* && $@ == *'--no-verify'* ]]; then
    if confirm-pam "git commit --no-verifyを実行します。続行しますか？"; then
      command git "$@"
    else
      echo "認証に失敗しました。操作をキャンセルします。"
      return 1
    fi
  else
    command git "$@"
  fi
}
```

### 機密ファイルの操作前確認

機密情報を含むファイルの編集前に認証を要求することで、誤操作や不正アクセスを防ぐことができます。

```bash
# 機密ファイルを編集する前の確認
edit_secrets() {
  if confirm-pam "機密ファイルを編集しようとしています。続行しますか？"; then
    $EDITOR ~/.secrets
  else
    echo "アクセスが拒否されました"
  fi
}
```

### スクリプト内での使用

本番環境へのデプロイなど、影響範囲が大きい操作の前に人間による確認を挟むことで、自動化と安全性を両立できます。

```bash
#!/bin/bash

# 危険な操作の前に確認
if confirm-pam "本番環境へのデプロイを開始します。続行しますか？"; then
  echo "デプロイを開始します..."
  # デプロイ処理
else
  echo "デプロイがキャンセルされました"
  exit 1
fi
```

## 技術的な仕組み

confirm-pam は、将来的なクロスプラットフォーム対応を見据えたレイヤー化アーキテクチャを採用しています。

### アーキテクチャ設計

```
main.rs (CLI エントリポイント)
    ↓
auth/mod.rs (認証抽象化レイヤー)
    ↓
platform/mod.rs (プラットフォーム固有実装)
    ↓
各OS実装 (macos/linux/windows)
```

### macOS実装

macOS では FFI（Foreign Function Interface）を使用して、Rust から Swift コードを呼び出しています。

実装の詳細は次の通りです。
- Swift実装: `src/platform/macos/auth_helper.swift` で LocalAuthentication フレームワークを使用
- ビルドシステム: `build.rs` で Swift コードをコンパイル  
- 認証処理: Touch ID による生体認証を同期的に処理

#### LocalAuthenticationフレームワーク

Swift実装では、AppleのLocalAuthenticationフレームワークを使用しています。

**主要なコンポーネント**:

| コンポーネント | 役割 |
|:---|:---|
| `LAContext` | 認証コンテキストを管理するメインクラス |
| `LAPolicy` | 認証ポリシーを定義（`.deviceOwnerAuthenticationWithBiometrics` でTouch ID認証を指定） |
| `evaluatePolicy` | 実際の生体認証を行うメソッド |

```swift
// 概念的な実装例
import LocalAuthentication

let context = LAContext()
let policy = LAPolicy.deviceOwnerAuthenticationWithBiometrics
context.evaluatePolicy(policy, localizedReason: message) { success, error in
    // 認証結果の処理
}
```

これにより、システム標準の認証ダイアログが表示され、Touch ID で認証します。

### 抽象化レイヤー

`BiometricAuthenticator` トレイトによって各プラットフォームの実装を抽象化しています。

主要な API は次の通りです。

- `authenticate(message: &str) -> Result<bool>`: 認証し結果を返す
- `is_available() -> Result<bool>`: 認証機能の利用可能性を確認

コンパイル時の条件分岐で各 OS 実装を選択し、単一のバイナリとして動作します。

## 今後のロードマップ

現在は macOS の Touch ID のみサポートしていますが、他のプラットフォームへの対応も予定しています。

### 計画中の機能

- Linux 対応: PAM + fprintd を使った指紋認証
- Windows 対応: Windows Hello を使った生体認証
- 高度なオプション: タイムアウト設定、リトライ回数制限など

## まとめ

confirm-pam は、macOS で Touch ID を使った生体認証確認を簡単に追加できる CLI ツールです。

### 使用をおすすめする理由

1. **セキュリティの向上**: AI エージェントや自動化ツールが一般的になった現在、人間による明示的な確認ステップが重要
2. **誤操作防止**: 危険なコマンドの実行前に確認を挟むことで、不正な操作を防ぐ
3. **簡単な組み込み**: 既存のスクリプトやワークフローに簡単に組み込み可能

危険な操作や機密情報を扱う処理の前に、**人間による確認**を挟むためのツールとしてご活用ください。

- リポジトリ: [azu/confirm-pam](https://github.com/azu/confirm-pam)
- crates.io: [confirm-pam](https://crates.io/crates/confirm-pam)
