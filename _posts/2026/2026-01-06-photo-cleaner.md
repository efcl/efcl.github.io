---
title: "Photo Cleaner: iPhoneの古い写真をまとめて削除できるiOSアプリを作った"
author: azu
layout: post
date: 2026-01-06T12:00
category: iOS
tags:
    - iOS
    - Swift
    - iPhone
    - Photo

---

iPhoneから古い写真をまとめて削除するためのiOSアプリ [Photo Cleaner](https://github.com/azu/photo-cleaner) を作りました。

- GitHub: [azu/photo-cleaner](https://github.com/azu/photo-cleaner)

Amazon Photosなどにバックアップ済みの古い写真をiPhoneから削除して、ストレージを解放するためのアプリです。

## なぜ作ったか

iPhoneの写真が増えすぎてストレージが足りなくなったとき、古い写真をまとめて削除したいことがあります。
しかし、標準の写真アプリでは大量の写真を効率的に選択・削除する機能がなく、一枚ずつ選択するのは現実的ではありません。

既存のアプリを探しても、数万枚の写真を処理できるものが見つかりませんでした。
そこで、シンプルに古い写真をまとめて削除できるアプリを作ることにしました。

実際に数万枚の写真を削除してみましたが、問題なく動作しています。

## 主な機能

![Photo Cleanerのメイン画面](https://raw.githubusercontent.com/azu/photo-cleaner/main/docs/ss1.png)

Photo Cleanerには次の機能があります。

- 指定した期間より古い写真を自動で抽出して削除
- お気に入りに設定した写真は自動的に保護
- 特定のアルバムを保護対象として設定可能
- 削除前に月ごとのコンタクトシート（まとめ画像）を生成
- 動画は削除対象から除外

### コンタクトシート機能

![コンタクトシート](https://raw.githubusercontent.com/azu/photo-cleaner/main/docs/ss4.png)

Photo Cleanerは実際に写真を削除する前にコンタクトシートを生成する機能があります。

コンタクトシートは、月ごとの写真をグリッド状にまとめた一枚の画像です。
削除してしまう前に、その月にどんな写真があったかを一覧で残しておけます。
生成したコンタクトシートは指定したアルバムに保存されるため、後から振り返ることができます。

## 設定項目

![設定画面](https://raw.githubusercontent.com/azu/photo-cleaner/main/docs/ss2.png)

次の項目を設定できます。

| 項目 | デフォルト値 |
|------|-------------|
| バックアップ猶予期間 | 730日（2年） |
| 保護対象アルバム | Keep |
| コンタクトシート生成 | ON |
| コンタクトシート保存先 | Keep |

## インストールと使い方

Photo CleanerはApp Storeで配布していないため、Xcodeでビルドしてインストールする必要があります。

### なぜApp Storeで配布しないのか

[AltStore PAL](https://altstore.io/)やSideStoreなどのサードパーティストアでの配布も検討しましたが、現状では課題が多いです。

[AltStore PAL](https://faq.altstore.io/altstore-pal/what-is-altstore-pal)で配布するには[Appleの公証（Notarization）が必要](https://faq.altstore.io/developers/distribute-with-altstore-pal)です。
公証にはAppleの承認プロセスがあり、個人開発のアプリには負担が大きいです。

SideStoreはApple IDとパスワードを入力する必要があります。

今回はワンショットで使うアプリなので、サードパーティストアでの配布は一旦諦めました。

また、無料のApple Developerアカウントでは次の制限があります。

- アプリの署名が7日で期限切れになる
- 同時にインストールできるアプリは3つまで
- 週に10個までしかアプリをインストールできない

これらの制限を回避するにはApple Developer Program（年間$99）への加入が必要です。
自分用のツールであれば、Xcodeから直接インストールするのが最もシンプルな方法です。

### 必要な環境

- Xcode 15以上
- iOS 17以上
- Apple Developer Account（無料枠で可）

### セットアップ手順

1. リポジトリをクローンしてセットアップスクリプトを実行

```bash
git clone https://github.com/azu/photo-cleaner.git
cd photo-cleaner
./setup.sh
```

2. XcodeでConfigurationを設定

`PhotoCleaner.xcodeproj`を開き、Project Settings → Info → Configurationsで、DebugとReleaseの両方に`LocalConfig`を指定します。

3. ⌘Rでビルド・実行

## 削除の確認

![削除確認画面](https://raw.githubusercontent.com/azu/photo-cleaner/main/docs/ss3.png)

削除対象の写真を確認してから削除を実行できます。
削除された写真は「最近削除した項目」に移動するため、30日以内なら復元可能です。

## まとめ

Photo Cleanerは、iPhoneの古い写真をまとめて削除できるシンプルなアプリです。
削除前にコンタクトシートを生成することで、月ごとの写真を1枚の画像に圧縮して残せます。

---

- GitHub: [azu/photo-cleaner](https://github.com/azu/photo-cleaner)
