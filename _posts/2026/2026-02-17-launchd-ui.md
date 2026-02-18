---
title: "launchd-ui: macOSのlaunchdを使ったcron処理をGUIで管理するアプリを作った"
author: azu
layout: post
date: 2026-02-17T12:00
category: macOS
tags:
    - macOS
    - Rust
    - Tauri
    - launchd

---

macOSのlaunchdエージェント・デーモンをGUIで管理できるアプリ [launchd-ui](https://github.com/azu/launchd-ui) を作りました。

- GitHub: [azu/launchd-ui](https://github.com/azu/launchd-ui)

![launchd-uiのスクリーンショット](https://raw.githubusercontent.com/azu/launchd-ui/main/screenshot.jpg)

## なぜ作ったか

macOSでcron的な定期処理をやろうとすると、launchdを使うことになります。
自分の場合は、git pullを定期的に実行してリポジトリを同期する仕組みや、`claude --remote`でClaude Codeを起動してスクリプトを実行する処理をlaunchdで管理しています。

たとえば、[chronixd](https://github.com/azu/chronixd)で収集したアクティビティデータを元に、寝る前に`claude --remote`でその日の活動をまとめる処理を自動実行しています。
Claude Code on the webで実行することで、自動で処理が走りつつ、気になったことがあればスマホからでも対話的に追記できます。

こういった定期処理をlaunchdで管理しているのですが、launchdの操作は基本的にCLIです。
`launchctl load`や`launchctl unload`といったコマンドを毎回調べながら打つのは面倒で、今どのエージェントが動いているか、次回いつ実行されるかといった情報も確認しにくいです。

GUIツールは[LaunchControl](https://www.soma-zone.com/LaunchControl/)などの有料ツールが多く、探すのも面倒だったので自分で作ることにしました。

## 主な機能

launchd-uiには次の機能があります。

- ユーザーエージェント（`~/Library/LaunchAgents/`）、システムエージェント、システムデーモンの一覧と検索
- エージェントの開始・停止・再起動・即時実行（テストラン）
- スケジュール設定と次回実行日時のプレビュー
  - 毎日n時に実行とか、何時間ごとに実行とかができる
- stdout/stderrログの表示
- plistファイルの詳細表示
- ユーザーエージェントの作成・編集・削除
- Finderでファイルを表示

システムエージェントとデーモンは読み取り専用で、変更操作はユーザーエージェントのみに限定しています。

## 技術スタック

launchd-uiは[Tauri](https://tauri.app/)で作っています。
バックエンドがRust、フロントエンドがReact + TypeScript + Viteという構成です。
UIにはTailwind CSS v4とshadcn/uiを使っています。

Tauriを選んだ理由は主に2つあります。

1つ目は、launchdの操作には`launchctl`コマンドの実行が必要で、バックエンドのある構成の方が都合よかったことです。
2つ目は、起動速度の速さです。launchd-uiは常駐するアプリではなく、設定を確認・変更したら閉じるタイプのツールです。起動の速さを重視しました。

## Vibe Codingで開発

launchd-uiはClaude Codeを使って開発しました。
いわゆるVibe Codingで、コードの実装はほとんどClaude Codeに任せています。
2時間ぐらいで、まあ使えるかなぐらいのツールにはなりました。

ただし、コード品質のためのLintとかTestはセットアップしておくことを意識しました。
フロントエンドにはoxlintとvitest、Rustにはcargoのclippyとcargoのtestを設定しています。
リンターやテストをCI的に回せる状態にしておくことで、Vibe Codingでも一定の品質を保てます。

ただ、launchd自体の用語がだいぶ独特で、どのステータスがラベルとして正しいのかとかが結構難しかったです。

## インストール

自分用のツールなので、特に署名などはしていません。

Apple Siliconの場合は次のコマンドでインストールできます。
コード署名していないアプリなので、`xattr -cr`でquarantine属性を解除してください。

```bash
curl -L "https://github.com/azu/launchd-ui/releases/latest/download/launchd-ui_aarch64.app.tar.gz" | tar xz -C /Applications
xattr -cr /Applications/launchd-ui.app
```

Intel Macの場合は`aarch64`を`x64`に置き換えてください。
DMGインストーラーも [Releases](https://github.com/azu/launchd-ui/releases) ページからダウンロードできます。

## まとめ

launchd-uiは、macOSのlaunchdエージェントをGUIで管理できるシンプルなアプリです。
定期処理をlaunchdで管理していて、CLIでの操作が面倒な人に向いています。

---

- GitHub: [azu/launchd-ui](https://github.com/azu/launchd-ui)
