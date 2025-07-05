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

macOS で Touch ID を使った「人間の確認」ができるシンプルな CLI ツール [confirm-pam](https://github.com/azu/confirm-pam) を作りました。

- [azu/confirm-pam: CLI tool for biometric authentication confirmation prompts](https://github.com/azu/confirm-pam)

このツールを使うことで、AI Agent が任意のコマンドやスクリプトの実行する前に、Touch ID による生体認証を要求できます。
コマンドラインから実行される処理に対して、人間による明示的な確認ステップを追加する仕組みを提供します。

## confirm-pam とは

confirm-pam は、macOS の Touch ID を使った生体認証による確認プロンプトを提供する CLI ツールです。

### 主な特徴

- Touch ID 認証をサポート
- 認証ダイアログに任意のメッセージを表示
- 0（成功）、1（失敗）、2（エラー）の 3 つの終了コードで結果を判定
- Rust で書かれていて、現時点だと macOS のみ対応

基本的な使い方は次のようになります。

![image](/wp-content/uploads/2025/07/05-1751706673.png)

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

![image](/wp-content/uploads/2025/07/05-1751706845.png)

```bash
# 渡したメッセージが認証ダイアログに表示されます
confirm-pam "重要な変更をコミットしようとしています。続行しますか？"
```

終了コードによって認証結果を判定できます。例えば次のような値が返されます。

- `0`: 認証成功
- `1`: 認証失敗またはユーザーによるキャンセル
- `2`: システムエラー（Touch ID が無効化されている等）

## 実用例

confirm-pam は次のようなユースケースを想定して作成しています。

### `git commit --no-verify`の回避の確認

危険な git コマンドを実行する前に確認を挟む例です。`--no-verify` オプションのような、通常の安全チェックを回避するコマンドの実行前に認証を要求します。

```bash
# ~/.zshrc や ~/.bashrc に追加
git() {
  if [[ $@ == *'commit'* && $@ == *'--no-verify'* ]]; then
    if confirm-pam "git commit --no-verifyを実行します。続行しますか？"; then
      command git "$@"
    else
      echo "認証に失敗しました。操作をキャンセルします。人間による確認が必要です。"
      return 1
    fi
  else
    command git "$@"
  fi
}
```

![claude-code](/wp-content/uploads/2025/07/05-1751708268.png)

Claude Code のような AI Agent は`git commit --no-verify`で pre-commit Hooks を回避してきます。
Touch ID などの人間の認証を挟むことで、Hook を無視したコミットを防げます。

あと、人間がズルして `--no-verify` をつけてコミットするときに、確認の意味としてダイアログを出す方法としても使えます。

### スクリプト内での使用

本番環境へのデプロイなど、影響範囲が大きい操作の確認ダイアログを表示する例です。

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

`y`を入力しないと進めないようにする方法もありますが AI Agent は `echo "y" | コマンド` のような pipe で回避するので、人間の確認を挟みたい時に利用できます。

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

### macOS 実装

macOS では FFI（Foreign Function Interface）を使用して、Rust から Swift コードを呼び出しています。

実装の詳細は次の通りです。

- Swift 実装: `src/platform/macos/auth_helper.swift` で LocalAuthentication フレームワークを使用
- ビルドシステム: `build.rs` で `swiftc` を使って Swift コードをコンパイル
- 認証処理: Touch ID による生体認証を同期的に処理

#### LocalAuthentication フレームワーク

Swift 実装では、Apple の LocalAuthentication フレームワークを使用しています。

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
しかし、自分は macOS しか使ってないので、他のプラットフォームの実装を追加したい人は PR を待ってます。

- [Add Linux fingerprint authentication support using PAM + fprintd · Issue #1 · azu/confirm-pam](https://github.com/azu/confirm-pam/issues/1)
- [Add Windows biometric authentication support using Windows Hello · Issue #2 · azu/confirm-pam](https://github.com/azu/confirm-pam/issues/2)

## まとめ

confirm-pam は、macOS で Touch ID を使った生体認証確認を簡単に追加できる CLI ツールです。
AI が回避しにくい、人間による確認を挟むためのツールとして使ってみてください。

- リポジトリ: [azu/confirm-pam](https://github.com/azu/confirm-pam)
- crates.io: [confirm-pam](https://crates.io/crates/confirm-pam)

Note: 認証をたくさん出すと無意識的に OK してしまうので、この辺をもっと工夫する必要が出てくるかもしれません。
