---
title: "Secretlint v13.0.0リリース: .gitignoreをデフォルトで尊重、Tailscale/Stripe/Cloudflareの検出に対応"
author: azu
layout: post
date : 2026-05-05T10:00+09:00
category: secretlint
tags:
    - secretlint
    - security
    - nodejs

---

ソースコードや設定ファイルに含まれるAPIトークンやパスワードなどの機密情報を見つける[Secretlint](https://github.com/secretlint/secretlint)のv13.0.0をリリースしました。

- [Release v13.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v13.0.0)

このバージョンの主な変更点は次の3つです。

- ファイル探索時に`.gitignore`をデフォルトで尊重するように変更（Breaking Change）
- グロブメタ文字を含むパスが実在する場合はリテラルとして扱うように変更
- Tailscale/Stripeの検出ルールを新規追加、CloudflareをcanaryからrecommendへPromote

## Breaking Change: `.gitignore`をデフォルトで尊重

v13.0.0では、ファイル探索時に`.gitignore`の内容をデフォルトで尊重するようになりました。
ripgrepと同じ挙動で、ネストされた`.gitignore`ファイルもサブディレクトリへカスケードして適用されます。深い階層のネガティブルール（`!`）で上位の判定を上書きすることもできます。

- [feat!: respect .gitignore by default via @secretlint/walker by azu · Pull Request #1530](https://github.com/secretlint/secretlint/pull/1530)

`.gitignore`に一致したファイルはスキャン対象から除外されます。
そのため、これまで`dist/`や生成物などを意図的にスキャンしていたプロジェクトでは、出力されるファイル数が減ります。

`.secretlintignore`はこれまで通り併用できます。

v12までの挙動に戻したい場合は、`--no-gitignore`オプションを指定します。

```bash
secretlint --no-gitignore "**/*"
```

`.gitignore`に一致しているはずのファイルが結果に含まれている場合は、Issueで報告してください。

- [Issues · secretlint/secretlint](https://github.com/secretlint/secretlint/issues)

## グロブメタ文字を含むパスが実在する場合はリテラル扱いに

Secretlintはコマンドライン引数をデフォルトでグロブパターンとして解釈します。
v13.0.0では、グロブメタ文字（`()`、`[]`、`{}`、`?`）を含むパスが実際にファイル/ディレクトリとして存在する場合は、リテラルとして扱うように変更しました。

これは、SvelteKitやNext.jsのRoute Groupなど、ディレクトリ名に`()`や`[]`を含むプロジェクトで特に有効です。

| パターン | ディスク上 | v12のデフォルト | v13のデフォルト |
|---|---|---|---|
| `src/(group)/page.tsx` | 存在する | グロブとして解釈、マッチしない | リテラルとしてマッチ |
| `src/(missing)/page.tsx` | 存在しない | グロブとして解釈 | グロブとして解釈 |
| `src/[a-z]ormal.tsx` | `normal.tsx`が存在 | グロブ経由でマッチ | グロブ経由でマッチ |

入力ごとに1度だけ`stat`を実行し、存在すればリテラル、存在しなければ従来通りグロブとして扱います。
従来通り常にリテラルとして扱いたい場合は、`--no-glob`オプションを指定します。

## 新しく追加された検出ルール

`@secretlint/secretlint-rule-preset-recommend`に、次の3つのルールが追加されました。

- [Tailscale](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-tailscale) - Tailscale APIキー（新規追加）
- [Stripe](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-stripe) - Stripe APIキー（新規追加）
- [Cloudflare](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-cloudflare) - Cloudflare APIトークン（canaryから昇格）

関連PR:

- [Add Tailscale API key detection rule by azu · Pull Request #1536](https://github.com/secretlint/secretlint/pull/1536)
- [feat(secretlint-rule-stripe): add Stripe API key detection rule by azu · Pull Request #1537](https://github.com/secretlint/secretlint/pull/1537)
- [feat(secretlint-rule-preset-recommend): promote cloudflare, stripe, tailscale from canary by azu · Pull Request #1538](https://github.com/secretlint/secretlint/pull/1538)

`@secretlint/secretlint-rule-preset-recommend`を使っている場合は、v13.0.0にアップデートすると自動的にこれらのルールが有効になります。

## まとめ

Secretlint v13.0.0では、ファイル探索の挙動を`.gitignore`をデフォルトで尊重するように変更しました。
これに加えて、グロブメタ文字を含む実在パスをリテラルとして扱うよう調整し、Route Groupなどのディレクトリ構成でもオプションなしに動作します。
検出ルールにはTailscaleとStripeを新規追加し、CloudflareをrecommendへPromoteしています。

`.gitignore`の尊重はBreaking Changeのため、`dist/`などをスキャンしていたプロジェクトでは`--no-gitignore`への切り替えや`.secretlintignore`の見直しが必要です。

フィードバックがあればGitHubのIssueでお知らせください。

- [Release v13.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v13.0.0)
- [Issues · secretlint/secretlint](https://github.com/secretlint/secretlint/issues)
