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

### 実装: `@secretlint/walker`

v13.0.0では、ファイル探索の実装を[`globby`](https://github.com/sindresorhus/globby)から、新しく追加した[`@secretlint/walker`](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/walker)へ置き換えました。

設計はplanドキュメントとしてリポジトリにコミットされています。

- [docs/superpowers/plans/2026-05-03-walker-gitignore-cascade-plan.md](https://github.com/secretlint/secretlint/blob/v13.0.0/docs/superpowers/plans/2026-05-03-walker-gitignore-cascade-plan.md)

Rustエコシステムには[ripgrep](https://github.com/BurntSushi/ripgrep)の[`ignore` crate](https://docs.rs/ignore/)があり、[oxc](https://github.com/oxc-project/oxc)などはこれを使うことで`.gitignore`のカスケードを安価に再利用できます。
JavaScriptエコシステムにも、ネストされた`.gitignore`に対応するウォーカーが全く無いわけではありません（[`tiny-readdir-glob-gitignore`](https://github.com/fabiospampinato/tiny-readdir-glob-gitignore)、[`ignore-walk`](https://github.com/npm/ignore-walk)など）。
ただし、ripgrepの`ignore` crateほど枯れた実績や仕様の網羅度を持つものは見当たりませんでした。
また、後述する「グロブメタ文字を含むパスが実在する場合はリテラル扱いにする」のように、走査・マッチ側に独自の制御を入れたい要件もあります。
依存ライブラリも`node-ignore`と`picomatch`まで分解すれば`fs.readdir`の上に薄く書ける範囲だったため、Secretlint側でウォーカーを実装することにしました。

`@secretlint/walker`は、ネストされた`.gitignore`のカスケードに対応するPromiseベースのファイルシステムウォーカーです。
依存ライブラリは`ignore`（node-ignore）と`picomatch`の2つだけで、インクルード側とイグノア側でセマンティクスを分離しています。

- インクルードパターン: [`picomatch`](https://github.com/micromatch/picomatch)を使ったグロブマッチ。`**/*.{ts,js}`のようなブレース展開やドットファイルのマッチに対応する
- イグノアパターン: [`node-ignore`](https://github.com/kaelzhang/node-ignore)を使った`.gitignore`セマンティクスのマッチ。`.gitignore`の挙動に合わせるため、ブレース展開は意図的に対応しない

Node.js本体にも[`fs.glob`](https://nodejs.org/api/fs.html#fsglobpattern-options-callback)や[`path.matchesGlob`](https://nodejs.org/api/path.html#pathmatchesglobpath-pattern)が用意されていますが、これらにはドットファイルをマッチに含める`dot`オプションが存在しません。
ドットファイル（`.env`など）のスキャンが要件として外せないため、インクルード側は`picomatch`にしています。

走査自体は`fs.readdir(dir, { withFileTypes: true })`をベースにしたシンプルな再帰で、各ディレクトリのエントリを`Promise.all`で並列処理します。
ディレクトリ単位でignoreを判定し、無視対象に該当したディレクトリはサブツリーごとプルーニングして`readdir`を呼ばないことで、大きな`node_modules`配下などをスキップしています。

`.gitignore`のカスケードは`IgnoreStack`という構造で扱います。
親ディレクトリの`ignore`インスタンスに対して、現在のディレクトリの`.gitignore`を読み込んで`extendIgnore()`で重ねるという形でレイヤーを積みます。
`.gitignore`がそのディレクトリに存在しない場合は親のインスタンスをそのまま返すため、不要なallocationが起きません。
深い階層のネガティブルール（`!pattern`）が浅い階層のルールを上書きする挙動も、このスタック上で自然に表現されます。
ネストされた`.gitignore`内のパターンはそのファイルの置かれたディレクトリにアンカーされ、`packages/foo/.gitignore`の`src/**/*.ts`はリポジトリルートではなく`packages/foo/src/`配下にだけ適用されます。

クロスプラットフォーム対応として、`node-ignore`へ渡すパスはWindowsでも`/`区切りに正規化（`toPosix()`）した上でマッチングします。
返すパスはOSネイティブの区切り文字に戻します。
また、`ENOENT`や`EACCES`は探索全体を止めずにスキップする方針で、ファイル削除・パーミッションエラーに対して頑健になっています。

入力パターンは静的なプレフィックス（walk root）と動的なサフィックス（マッチパターン）に分割し、同じrootを持つパターンはグループ化して1度のwalkで処理します。
グロブメタ文字を含む入力でも、それが実際のファイル/ディレクトリとして存在する場合は`noGlob`相当の扱いにフォールバックさせるロジックもwalker側に入っています。

主なAPIは`walk(options)`で、パッケージ単独でも利用できます。

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `cwd` | `string` | 必須 | 探索の起点ディレクトリ |
| `patterns` | `string[]` | `undefined` | インクルードのグロブパターン |
| `ignoreFiles` | `string[]` | `[]` | カスケード対象のignoreファイル名（`.gitignore`など） |
| `extraIgnorePatterns` | `string[]` | `[]` | コードから渡す追加のignoreパターン |
| `noGlob` | `boolean` | `false` | `patterns`をリテラルとして扱う |
| `followSymlinks` | `boolean` | `true` | シンボリックリンクを追従するか |

CLI側の`secretlint`では、`--no-gitignore`が指定された場合は`ignoreFiles`から`.gitignore`を外し、それ以外の場合はカスケード有効でwalkします。
`.secretlintignore`は別経路の`extraIgnorePatterns`相当で従来通り適用されるため、`.gitignore`との共存に影響はありません。

### パフォーマンス

walker単体の実行時間で見ると、globbyからの置き換えによるパフォーマンスの大きな劣化はありません。
一方で、`.gitignore`のカスケードは「親のルールに子のルールを正しく重ねる」ことを満たさないと挙動が壊れる部分なので、ここはripgrepの実装を参考にしながら書いています。

実際のSecretlintの実行時間で見ると、`.gitignore`を尊重することで`node_modules/`や`dist/`などをそもそもスキャンしなくなるため、Lint対象のファイル数が減ります。
スキャン+ルール評価のコストはファイル数に比例して効いてくるので、ウォーカー自体のコストよりもLint対象が減ることによる実行時間の削減のほうが支配的になり、結果としてv12より速く終わるケースが多くなる想定です。

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
