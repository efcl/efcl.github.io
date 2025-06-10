---
title: "textlint v14.8.0をリリースしました - MCP(Model Context Protocol)をサポート"
author: azu
layout: post
date : 2025-06-10T09:00
category: textlint
tags:
    - textlint
    - MCP
    - AI

---

textlint v14.8.0をリリースしました！

- リリースノート: [Release v14.8.0 · textlint/textlint](https://github.com/textlint/textlint/releases/tag/v14.8.0)

今回のリリースでは、実験的な機能としてMCP（Model Context Protocol）サポートを追加しました。
MCPは、AI言語モデルが外部のツールやサービスと統一されたインターフェースを通じて連携できるプロトコルです。

## MCP（Model Context Protocol）サポート

textlint v14.8.0では、新しい`--mcp`フラグを追加しました。このフラグにより、textlintをMCPサーバーとして起動し、AI搭載のコードエディタ（VS Code with Copilot Chat、Cursor、Windsurf）から直接textlintを利用できるようになります。

### MCPとは

[Model Context Protocol（MCP）](https://modelcontextprotocol.io/)は、AI言語モデルが外部のツールやサービスと統一されたインターフェースを通じて連携するためのプロトコルです。これにより、AIアシスタントがtextlintの機能を直接利用して、文章のチェックや修正を行えるようになります。

### 前提条件

MCPサーバーを使用するには、次の条件を満たす必要があります。

- textlint v14.8.0以降
- MCPサポートを持つAI搭載のコードエディタ（VS Code with Copilot Chat、Cursor、Windsurf）
- **設定済みのtextlintプロジェクト** - textlintにはデフォルトルールがないため、MCPサーバーを使用する前に既存のtextlint設定が必要です

### 基本的な使い方

まず、プロジェクトでtextlintを設定する必要があります。
textlintにはデフォルトルールがないため、MCPサーバーを使用する前にプロジェクトで使うルールを設定する必要があります。

```bash
# textlintとルールをインストール
npm install --save-dev textlint textlint-rule-preset-ja-technical-writing
```

`npx textlint --init`を実行して、textlintの設定ファイルを作成します。これにより、基本的な設定が自動生成されます。

```bash
npx textlint --init
```

作成された`.textlintrc.json`ファイルに必要な設定などがあれば、手動で編集します。
次の設定は`textlint --init`で生成されたものです。

```json
{
    "rules": {
        "preset-ja-technical-writing": true
    }
}
```

設定が動くかは、`textlint`コマンドを実行して確認できます。

```bash
npx textlint README.md
```

これでtextlintの設定は確認できたので、あとはエディタにMCPサーバの設定を追加します。

## エディタ別の設定方法

### VS Code with GitHub Copilot

VS CodeでtextlintのMCPサーバーを設定するには、プロジェクトに`.vscode/mcp.json`ファイルを作成します：

```json
{
    "servers": {
        "textlint": {
            "type": "stdio",
            "command": "npx",
            "args": ["textlint", "--mcp"]
        }
    }
}
```

また、コマンドパレットを使用して設定することも可能です：

1. `Ctrl+Shift+P` (Windows/Linux) または `Cmd+Shift+P` (macOS) を押す
2. `MCP: Add Server` を選択
3. ドロップダウンから `Command (stdio)` を選択
4. コマンドとして `npx textlint --mcp` を入力
5. サーバーIDとして `textlint` を入力
6. `Workspace Settings` を選択して `.vscode/mcp.json` に設定を作成

### Cursor

プロジェクトディレクトリに `.cursor/mcp.json` ファイルを作成します：

```json
{
    "mcpServers": {
        "textlint": {
            "command": "npx",
            "args": ["textlint", "--mcp"],
            "env": {}
        }
    }
}
```

グローバル設定の場合は、ホームディレクトリに`~/.cursor/mcp.json`を作成し、同じ設定を記述します。

### Windsurf

1. Windsurf → Settings → Advanced Settings に移動
2. Cascadeセクションまでスクロールし、「Add Server」をクリック
3. 「Add custom server +」を選択
4. `~/.codeium/windsurf/mcp_config.json`に次の設定を追加：

```json
{
    "mcpServers": {
        "textlint": {
            "command": "npx",
            "args": ["textlint", "--mcp"],
            "env": {}
        }
    }
}
```

5. 更新ボタンを押してMCPサーバーリストを更新

## 利用可能なツール

textlint MCPサーバーでは、textlintを使った文章のチェックや修正するツールを提供しています。

## 使用例

AIアシスタントで使用できるプロンプトの例：

```
現在のファイルをtextlint MCPを使って、見つかったテキストの問題を説明してください

src/README.mdのすべてのtextlintの問題を修正してください

このMarkdownテキストの文章の問題をチェックして、改善案を提案してください

docs/ディレクトリのすべてのファイルにtextlintの自動修正を適用してください
```

次のような感じで、textlintのlint結果をみながら修正までやってくれます。

![利用例](https://efcl.info/wp-content/uploads/2025/06/10-1749514447.png)

## サンプルリポジトリ

次のリポジトリは、VSCodeでtextlint MCPサーバーを設定したサンプルです。

- [azu/textlint-mcp-example](https://github.com/azu/textlint-mcp-example)

```
git clone https://github.com/azu/textlint-mcp-example.git
cd textlint-mcp-example
npm ci
code .
```

## トラブルシューティング

textlint MCPサーバーで問題が発生した場合：

1. **MCPサーバーの状態を確認**: エディタのMCPサーバーリスト/ステータス機能を使用
2. **textlintのインストールを確認**: textlintとルールが正しくインストールされていることを確認
3. **設定を確認**: `.textlintrc`ファイルが有効であることを確認
4. **ログを確認**: MCPサーバーログでエラーメッセージを確認
5. **手動でテスト**: ターミナルから`npx textlint --mcp`を実行してサーバーが起動するかテスト

よくある問題：
- textlint設定ファイルが存在しない
- textlintルールやプラグインがインストールされていない
- MCP設定のファイルパスが間違っている
- バージョンの互換性（textlint v14.8.0以降が必要）

## まとめ

textlint v14.8.0では、実験的な機能としてMCP（Model Context Protocol）サポートを追加しました。
これにより、AI搭載のコードエディタから直接textlintの機能を利用できるようになり、エディタ上で文章チェックと修正を行えるようになります。

この機能は実験的なものですが、AI Agentとtextlintの連携が簡単になります。
ぜひお試しいただき、フィードバックをお寄せください。

`textlint --mcp`は、[＠chick-p](https://github.com/chick-p)さんが実装してくれました。

textlintでは、Contributionを歓迎しています。

- [Issues · textlint/textlint](https://github.com/textlint/textlint/issues)

また、GitHub Sponsorsでのサポートも歓迎しています。

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)

## 参考リンク

- [textlint MCP Server Setup | textlint](https://textlint.org/docs/mcp)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction)
- [VS Code MCP Servers Documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
- [GitHub Pull Request #1522](https://github.com/textlint/textlint/pull/1522) - MCP実装のPR
