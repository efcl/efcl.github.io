---
title: "textlintのパフォーマンス改善: 互換性を保ったまま、本体とルールの無駄を減らす"
author: azu
layout: post
date : 2026-11-23T16:20+09:00
category: textlint
tags:
    - textlint
    - JavaScript
    - performance

---

この2週間で、[textlint](https://github.com/textlint/textlint)と、よく使われているルールやライブラリのパフォーマンスを改善しました。
手元のベンチマークでは、75.5秒かかっていたlintが7.2秒で終わるようになり、メモリの使用量も半分以下になっています。

設定やルールを書き換える必要はありません。
textlintとルールをアップデートすると、そのまま速くなります。

| ルールと文書 | 2026-11-08 | 2026-11-23 | 時間 |
| --- | ---: | ---: | ---: |
| `preset-jtf-style`でMDN Web Docsの日本語版（10,452ファイル） | 75.5 s、1,022 MB | 7.17 s、475 MB | 10.5倍 |
| `preset-ja-technical-writing`でjs-primer（105ファイル） | 40.6 s、905 MB | 4.10 s、290 MB | 9.9倍 |
| `preset-ja-technical-writing`でMDN Web Docsの日本語版の`web/javascript`（1,043ファイル） | 149.9 s、2,555 MB | 15.3 s、313 MB | 9.8倍 |

それぞれの列は、その日に`npm install`した状態です。
2026-11-08はtextlint 15.8.0、2026-11-23はtextlint 16.1.3になります。
値は、textlintのCLIの実行時間と、プロセスが使ったメモリの最大値（peak RSS）です。

英語版の記事は、textlintのブログに書いています。

- [Performance improvements in textlint and its rules](https://textlint.org/blog/2026/11/23/textlint-performance/)

この記事では、次のことについて書きます。

- なぜ今textlintのパフォーマンスを改善したのか
- Secretlintの改善との違いと、互換性を保つための進め方
- 数値の推移と、本体とルールでやったこと
- 遅くならないための仕組みと、今考えていること

## なぜ今パフォーマンスなのか

textlintは、これまでパフォーマンスを目標に入れていませんでした。
これはある程度意図したものです。
textlintはルールをすべて外から追加するlinterで、ルールは辞書を読み込んだり、形態素解析をしたりと自由に書けます。
そのため、実行時間のほとんどはルールが使います。
速さよりも、ルールを自由に書けることを優先していました。

ただ、最近は状況が変わってきたと感じています。
AIエージェントが書くものは、コードだけではなくドキュメントも増えています。
これは特定のツールの話ではなく、開発のライフサイクルの中で書かれる文章が増えていく、という感覚です。

ドキュメントの数が増えると、その分だけlintは遅くなります。
一方で、lintは同じ文章には同じ結果を返す決定的な処理です。
AIに読みやすく書き直してもらうのとは別に、lintで機械的に確かめて直すことを積み重ねていけます。
この積み重ねは編集のたびに実行するので、自然言語のlintにもある程度の速さが必要になります。

そのため、パフォーマンスもtextlintの目標として扱うことにしました。

## Secretlintとの違い

textlintの前に、[Secretlint](https://github.com/secretlint/secretlint)のパフォーマンスを改善していました。
Secretlint v14.0.0は2026-11-15にリリースしていて、その内容は次の記事に書いています。

- [Secretlint v14.0.0リリース: 設定なしで動作するように変更、大規模リポジトリのチェックを高速化](https://efcl.info/2026/11/16/secretlint-v14/)

textlintも同じ流れで改善しましたが、できる最適化の深さが違います。

Secretlintは、ルールのパッケージは分かれていたものの、実質的には公式ルールがコアのルールでした。
そのため、公式ルールを本体に入れて、ルールを宣言的に書き直し、キーワードで絞り込むといった踏み込んだ最適化ができました。
約10万ファイルあるリポジトリのチェックは、42.1秒から1.74秒になっています。

textlintには、コアのルールがありません。
ルールはすべてユーザーランドにあり、自分がメンテナンスしていないルールもたくさんあります。
最適化に振り切ると、どうしても既存のルールとの互換性を犠牲にする部分が出てきます。

そのため、textlintでは次の条件を置きました。

- 既存のルールと設定がそのまま動き、同じ結果を返す
- ルールのAPIやTxtASTは、速くするためには変えない
- 同じ処理を何度もしている、使われないオブジェクトを作っている、といった無駄を減らす

つまり、今回やったのは「既存のルールをそのまま速くする」改善です。
Secretlintほどの最適化はしていませんが、それでも約10分の1になりました。

## 進め方

進め方は、Secretlintのときと大きくは変わりません。
計測して、時間がかかっている場所を見つけて、直します。

1. `textlint --profile`とCIでの比較を入れて、計測できる状態にする
2. textlint本体を改善する
3. 残った時間の多くがルールになるので、ルールが共有しているライブラリを改善する
4. 変更のたびに、実際の文書でlintの結果が変わっていないことを確かめる

### 計測できる状態にする

最初に、Secretlintと同じ`--profile`フラグを入れました（[#2206](https://github.com/textlint/textlint/pull/2206)）。
`textlint --profile`は、lintの結果の代わりに、どこに時間がかかったかを出力します。
次の出力は、`preset-ja-technical-writing`でjs-primerをlintしたときのものです。

```
$ npx textlint --profile source/
## textlint profile

Total: 5871.34 ms, 105 files

### Phases

| Phase | Time (ms) | % | Count |
| --- | ---: | ---: | ---: |
| startup | 80.71 | 1.4% | 1 |
| load-config | 71.12 | 1.2% | 1 |
| search-files | 23.09 | 0.4% | 1 |
| lint | 5638.96 | 96.0% | 1 |
| ↳ parse | 74.81 | 1.3% | 105 |
| ↳ traverse | 171.79 | 2.9% | 105 |
| ↳ rules | 4623.91 | 78.8% | 285266 |
| ↳ post-process | 3.78 | 0.1% | 105 |
| format | 53.49 | 0.9% | 1 |

### Rules

| Rule | Time (ms) | % | Calls |
| --- | ---: | ---: | ---: |
| ja-technical-writing/no-double-negative-ja | 852.67 | 14.5% | 15498 |
| ja-technical-writing/ja-no-abusage | 632.59 | 10.8% | 15498 |
| ja-technical-writing/max-ten | 498.09 | 8.5% | 7199 |
...
```

`--profile`を付けると、ルールの呼び出しを1つずつ計測するので、普段の実行よりは遅くなります。
読み方は、[CLIのドキュメント](https://textlint.org/docs/cli/#profile)に書いています。

あわせて、Pull Requestごとにbaseとheadを比べるCIも入れました。
`pnpm run compare`は、baseブランチと作業ツリーをビルドして、同じ文書を両方でlintし、差を出力します。

- 文書は、small、medium、large、hugeの4つ
    - small: 5ファイル
    - medium: js-primer
    - large: MDN Web Docsの日本語版の`web/javascript`
    - huge: MDN Web Docsの日本語版の全体
- 比べるのは、lintの結果、CLIの実行時間、`--fix`の実行時間、GCの停止時間、パーサー、ASTの走査
- lintの結果の差を最初に出すので、速くなったが結果が変わった、という変更に気づける

絶対的な時間ではなく、masterとの相対的な差を見るのがポイントです。
これで、改善と劣化がPull Requestの時点で見えるようになりました。

### 本体の改善には限界がある

計測してわかったのは、ファイル数とルールの種類によって、どこに時間がかかるかが大きく変わることです。

ファイル数が少ないときは、起動や設定の読み込みなど、本体の比率が高くなります。
ファイル数が多くなると、ルールがCPUを使う比率が高くなります。
ルールはすべてユーザーランドにあるので、本体だけを改善しても限界があります。

次の表は、本体だけ、またはルールだけをアップデートした場合の実行時間です。

| | `jtf-style`でMDN | `ja-technical-writing`でjs-primer |
| --- | ---: | ---: |
| textlint 15.8.0と、2026-11-08時点のルール | 75.5 s | 40.6 s |
| 本体だけ新しい（16.1.3） | 27.1 s | 35.4 s |
| ルールだけ新しい | 52.6 s | 6.13 s |
| どちらも新しい | 7.17 s | 4.10 s |

`preset-jtf-style`は、正規表現でチェックする軽いルールが33個入ったプリセットです。
1つ1つのルールが軽いので、本体の時間が大きな割合を占めていました。
`preset-ja-technical-writing`は、[kuromojin](https://github.com/textlint/kuromojin)で形態素解析をするルールが多く、ほとんどの時間がルールとそのライブラリでした。

そのため、最初に本体を改善して、次にルール側を改善するという順番で進めました。

## 数値の推移

次のグラフは、その日に`npm install`した状態での実行時間です。

![インストールした日付ごとのtextlintのCLIの実行時間](/wp-content/uploads/2026/textlint-performance.png)

| 日付 | textlint | 変わったルールのパッケージ | `jtf-style`でMDN | `ja-technical-writing`でjs-primer | `ja-technical-writing`でMDNの`web/javascript` |
| --- | --- | --- | ---: | ---: | ---: |
| 2026-11-08 | 15.8.0 | `preset-jtf-style` 3.0.3、`preset-ja-technical-writing` 12.0.2、`kuromojin` 3.0.1、`sentence-splitter` 5.0.1 | 75.5 s | 40.6 s | 149.9 s |
| 2026-11-15 | 16.0.0 | `sentence-splitter` 5.1.0 | 29.2 s | 19.3 s | 95.8 s |
| 2026-11-16 | 16.1.0 | `preset-jtf-style` 3.1.0、`match-index` 1.0.4、`textlint-rule-helper` 2.6.0 | 8.69 s | 18.9 s | 96.7 s |
| 2026-11-18 | 16.1.1 | `kuromojin` 3.0.2 | 8.49 s | 18.4 s | 93.5 s |
| 2026-11-21 | 16.1.2 | `kuromojin` 3.1.0 | 7.43 s | 4.25 s | 16.0 s |
| 2026-11-23 | 16.1.3 | `preset-ja-technical-writing` 12.1.0 | 7.17 s | 4.10 s | 15.3 s |

メモリの最大値は、次のように変わりました。

| 日付 | `jtf-style`でMDN | `ja-technical-writing`でjs-primer | `ja-technical-writing`でMDNの`web/javascript` |
| --- | ---: | ---: | ---: |
| 2026-11-08 | 1,022 MB | 905 MB | 2,555 MB |
| 2026-11-15 | 944 MB | 896 MB | 2,470 MB |
| 2026-11-16 | 1,008 MB | 893 MB | 2,473 MB |
| 2026-11-18 | 955 MB | 881 MB | 2,482 MB |
| 2026-11-21 | 475 MB | 309 MB | 324 MB |
| 2026-11-23 | 475 MB | 290 MB | 313 MB |

リリースの時系列は次のとおりです（日付は日本時間）。

| 日付 | リリース | 主な内容 |
| --- | --- | --- |
| 11-10 | sentence-splitter 5.0.3 | 段落ごとにファイル全体を持たないように変更 |
| 11-14 | sentence-splitter 5.1.0 | パーサーを書き直し |
| 11-15 | Secretlint 14.0.0 | 設定なしで動作、大規模リポジトリの高速化 |
| 11-15 | textlint 16.0.0 | 自前のMarkdownパーサー、ルール呼び出しの処理を削減 |
| 11-16 | textlint 16.1.0 | `--profile`と、CIでの比較 |
| 11-16 | preset-jtf-style 3.1.0、match-index 1.0.4、textlint-rule-helper 2.6.0、textlint-util-to-string 3.3.5 | ルールとヘルパーの無駄を削減 |
| 11-17 | textlint 16.1.1 | `stylish`フォーマッター、起動時間 |
| 11-18 | kuromojin 3.0.2 | 辞書のパスの解決を1回に |
| 11-21 | textlint 16.1.2 | ファイルを少しずつ処理、GCの時間を削減 |
| 11-21 | kuromojin 3.1.0 | 自前の解析器と辞書 |
| 11-22 | preset-japanese 10.1.0、preset-ja-technical-writing 12.1.0 | 依存しているルールを更新 |
| 11-23 | textlint 16.1.3 | `--fix`の高速化 |

## textlint本体でやったこと

| バージョン | 変更 | 効果 |
| --- | --- | --- |
| 16.0.0 | サードパーティの依存がない自前のMarkdownパーサー（[#2188](https://github.com/textlint/textlint/pull/2188)） | js-primerのパース: 1,070 ms → 18 ms |
| 16.0.0 | ルールを呼び出すときの、ノードごとの処理を削減（[#2202](https://github.com/textlint/textlint/pull/2202)） | 何もしないルールで2,691ファイルをlint: 696 ms → 約490 ms |
| 16.1.1 | `stylish`フォーマッターで、セルの幅を1回だけ計算（[#2214](https://github.com/textlint/textlint/pull/2214)） | 175,883件のメッセージの整形: 4.7 s → 0.66 s |
| 16.1.1 | MCPサーバーを`--mcp`のときだけ読み込む（[#2219](https://github.com/textlint/textlint/pull/2219)） | `textlint --version`: 300 ms → 約150 ms |
| 16.1.1 | `read-package-up`を小さなヘルパーに置き換え（[#2218](https://github.com/textlint/textlint/pull/2218)） | インストールされるパッケージが21個減少（約3.4 MB） |
| 16.1.2 | 同時に処理するファイルを8個までにして、順番が来たときにファイルを読む（[#2222](https://github.com/textlint/textlint/pull/2222)） | MDN: 7.78 s → 6.67 s、メモリの最大値 980 MB → 713 MB |
| 16.1.2 | ファイルのASTを、そのファイルのlintが終わったらすぐ解放できるようにする（[#2227](https://github.com/textlint/textlint/pull/2227)） | MDN: マイナーGCの停止時間 約470 ms → 約210 ms |
| 16.1.3 | `--fix`で、修正があったときだけパースし直す（[#2233](https://github.com/textlint/textlint/pull/2233)） | MDNでの`--fix --dry-run`: 33.2 s → 18.4 s |

効果は、それぞれのPull Requestで計測した値です。
ルールを使う計測では、`preset-jtf-style`を使っています。

Markdownパーサーは、remarkから自前のパーサーに書き直しました。
これも先に[仕様](https://github.com/textlint/textlint/blob/master/docs/products/textlint/features/markdown-parsing/requirements.md)を書いてから実装しています。
詳しくは、v16.0.0のリリース記事に書いています。

- [textlint v16.0.0](https://textlint.org/blog/2026/11/15/textlint-16/)

アルゴリズムではない原因もありました。
[#2227](https://github.com/textlint/textlint/pull/2227)は、V8が関数をどこに確保するかが原因でした。
コンストラクタの中でプロパティに代入した関数は、V8のold領域に確保されます。
ルールのコンテキストはルールとファイルごとに作るので、この関数が次のメジャーGCまで各ファイルのASTを生かし続けていました。
これは、コードを読んでもわからず、GCを計測してわかったものです。

## ルールとライブラリでやったこと

本体を改善すると、残りの時間の多くはルールになります。
そこで、ルールのプロファイルを取って、多くのルールが共有しているライブラリを改善しました。

### sentence-splitter 5.1.0

[sentence-splitter](https://github.com/textlint-rule/sentence-splitter)は、段落を文に分けるライブラリです。
`sentence-length`や`max-ten`など、多くのルールが使っています。

- 5.0.xのパッチリリースで、段落ごとにファイル全体を持たずに、ノードのテキストだけを持つように変更（[#61](https://github.com/textlint-rule/sentence-splitter/pull/61)）
- 5.1.0で、テキストをフラットなTypedArrayに読み取り、ノードを1回だけ作るパーサーに書き直し（[#70](https://github.com/textlint-rule/sentence-splitter/pull/70)）

5.1.0の`splitAST()`は、5.0.3と比べて約25〜29倍、5.0.0と比べて約1,300〜1,600倍速くなっています（[v5.1.0のリリースノート](https://github.com/textlint-rule/sentence-splitter/releases/tag/v5.1.0)）。

### kuromojin 3.1.0

[kuromojin](https://github.com/textlint/kuromojin)は、日本語の文章を形態素解析するライブラリです。
日本語のルールの多くが使っていて、`preset-ja-technical-writing`では実行時間の約70%を占めていました。

kuromojin 3.1.0では、kuromoji.jsを使うのをやめて、自前の解析器と辞書ファイルに変えました。
トークンはkuromoji.jsと互換性があります。

| | 3.0.2 | 3.1.0 | 削減 |
| --- | ---: | ---: | ---: |
| 辞書の読み込み | 440 ms | 51 ms | 88% |
| js-primerの各行の解析 | 2,206 ms | 167 ms | 92% |
| 読み込み後のメモリ | 182 MB | 27.2 MB | 85% |
| 依存を含めたインストールサイズ | 47.7 MB | 5.10 MB | 89% |

この表は、[v3.1.0のリリースノート](https://github.com/textlint/kuromojin/releases/tag/v3.1.0)のものです。

kuromojinは、いきなり実装を書き換えたわけではありません。

まず、プロファイルを取って、プロトタイプを何パターンか書きました。
どこまで削れるのかという幅を、先に見るためです。
最初のプロトタイプで60%ぐらいは削れたので、80%ぐらいはいけるのではと考えて、「今の時間を80%削る」を目標にしました。

次に、実装する前に仕様書を書きました。
仕様書は、textlintやSecretlintの開発でも使っている[sdev](https://github.com/azu/sdev)で書いています。
要件を定義して、デザインを起こして、それから実装するという流れです。
[解析器、辞書のフォーマット、辞書のバージョン](https://github.com/textlint/kuromojin/tree/master/docs/products/kuromojin)は、どれも仕様を先に書いています。

辞書のバージョンは、今後のための仕組みです。
辞書に単語を追加すると、形態素解析の結果が変わり、lintの結果も変わります。
そのため、メジャーバージョンの中では辞書を変えず、`dictionaryVersion`オプションで日付を指定したときだけ新しい辞書を使うようにしています。

### preset-jtf-style 3.1.0と共通のヘルパー

- [textlint-rule-preset-JTF-style 3.1.0](https://github.com/textlint-ja/textlint-rule-preset-JTF-style/releases/tag/v3.1.0): 正規表現を1回だけ作る、ルールが探す文字を含まない`Str`ノードを先に飛ばす、`textlint-rule-prh`への依存を削除
- [match-index 1.0.4](https://github.com/azu/match-index/pull/3): テキストにマッチがあるときだけ、マッチを集める
- [textlint-rule-helper 2.6.0](https://github.com/textlint/textlint-rule-helper/pull/33)と[textlint-util-to-string 3.3.5](https://github.com/textlint/textlint-util-to-string/pull/26): ASTを走査する回数と、オブジェクトの確保を削減
- [textlint-rule-preset-japanese 10.1.0](https://github.com/textlint-ja/textlint-rule-preset-japanese/releases/tag/v10.1.0)と[textlint-rule-preset-ja-technical-writing 12.1.0](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing/releases/tag/v12.1.0)
    - これらのバージョンを含むように更新

最初の4つのアップデートで、textlintのCIのMDNのベンチマークは36.0秒から10.1秒になりました。
メッセージは175,883件で変わっていません（[#2216](https://github.com/textlint/textlint/pull/2216)）。

## アップデート方法

1. Node.js 22.12.0以降を使う
2. textlintを16.1.3以降にアップデートする
3. ルールとプリセット、ロックファイルをアップデートする

```sh
npm install --save-dev textlint@latest
npm update
```

アップデートしたら、ライブラリのバージョンを確認します。

```sh
npm ls kuromojin sentence-splitter
```

- `kuromojin`は3.1.0以降、`sentence-splitter`は5.1.0以降になっていればOK
- `npm ls`に`kuromojin`のバージョンが2つ以上出る場合は、それぞれが辞書を読み込むので遅くなる。[READMEのトラブルシューティング](https://github.com/textlint/kuromojin#troubleshooting-use-one-copy-of-kuromojin)を参照

textlint v16はNode.js 22.12.0以降が必要です。
v15からの変更点は、[v16.0.0のリリース記事](https://textlint.org/blog/2026/11/15/textlint-16/)を参照してください。

## 計測方法

- それぞれのディレクトリで、`npm install --before=<その日の日本時間の終わり>`を付けて、textlintと2つのプリセットをインストール
    - textlint、プリセット、その依存のすべてが、その日のバージョンになる
- コマンドは`textlint --format json`。設定は、プリセットを1つ、デフォルトのオプションで有効にしたもの
- 文書は次の3つ
    - [mdn/translated-content](https://github.com/mdn/translated-content)（`8a8b2ad7`）の`files/ja`（10,452ファイル）
    - その`web/javascript`ディレクトリ（1,043ファイル）
    - [js-primer](https://github.com/js-primer/js-primer) v7.0.0の`source`（105ファイル）
- 4 CPUのLinux、Node.js 22.23.5。値は3回の中央値で、すべて2026-11-23に同じマシンで計測
- メモリは、プロセスのpeak RSS（`process.resourceUsage().maxRSS`）
- 「本体だけ新しい」は、2026-11-08時点のルールをインストールしてから`textlint@16.1.3`をインストール。「ルールだけ新しい」は、2026-11-08時点のtextlintをインストールしてから最新のプリセットをインストール

lintの結果は次のとおりです。

- `preset-jtf-style`でMDN: 177,741件のメッセージは、位置も含めてすべての日付で同じ
- `preset-ja-technical-writing`でMDNの`web/javascript`: 12,613件のメッセージは、ルールと文言がすべての日付で同じ。1,390件は列番号が違う。sentence-splitter 5.1.0で、報告する列番号のずれが直ったため
- `preset-ja-technical-writing`でjs-primer: textlint 15.8.0では847件、textlint 16では850件。この3件はv16.0.0のパーサーの変更によるもので、パフォーマンスの改善によるものではない

## 今考えていること

### もっとスケールさせるには

今のtextlintは、1つのスレッドでファイルを1つずつlintしています。
もっと多くのファイルを扱うには、並列処理のような、もう少し根本的な対応が必要になりそうです。

ただ、ルールを外から追加できるlinterでは、これが難しいです。
ファイルをまたいで状態を持つルールがあると、ファイルごとに分けて処理できません。
スレッドごとにルールと辞書を読み込み直すコストもあります。
Secretlintでは、ルールを読み込まない軽いワーカーでキーワードを探す処理だけを並列化できましたが、textlintにはそのような絞り込みがありません。

どうするのが最適なのかは、まだよくわかっていません。

### 禁止語のリストではなく、方向性を示すルール

もう1つ考えているのは、ルールの作り方と、textlintの位置づけです。

AIが書いた文章には、特有の言い回しがあります。
禁止語のリストとしてルールにはできますが、ブラックリストには限界があります。
抜け道がたくさんあるためです。

自分がこれまで書いてきたルールは、どちらかというと、構造としてはっきりした方向性に沿わせるものが多いです。
1文の長さ、読点の数、同じ助詞の連続といったルールは、特定の単語を禁止するのではなく、「こういう方向で書く」というガードレールに近いものです。
方向性を示すことで、文章の全体が良くなっていくという考え方です。
ただ、この考え方はまだうまく伝えられていないと思っています。

### アウトカム、アウトライン、本文

textlintが扱ってきたのは、単語、フレーズ、文といった本文の細かい部分です。
一方で、文章の良し悪しは、本文より手前で決まる部分が大きいです。

文章は、次の3つの段階で考えられます。

- アウトカム: 誰に何を伝えるのか。全体を捉える
- アウトライン: どの話題を選び、どの順番で書き、何を書かないのか。焦点を絞る
- 本文: 詳細を書く

一人で書いていたときは、なぜこの順番にしたのか、何をあえて書かなかったのかを、自分が覚えていれば続きを書けました。
AIが構成を提案したり、本文を書き直したりするようになると、著者が一人でも、原稿に手を入れる主体は複数になります。
このとき、著者の頭の中にある判断を、次に手を入れる相手にどう渡すかが問題になります。

これは、[sdev](https://github.com/azu/sdev)でやっていることに近いです。
sdevでは、目的を整理してから仕様やコードへ具体化していきます。
ドキュメンテーションと開発の進め方は近づいてきています。
目的を共有し、変更を提案して、結果を見て判断を見直す流れは、執筆でも同じです。

アウトラインと本文を見比べて、順番がおかしければアウトラインを直し、本文にも反映する。
textlintによる本文のチェックは、この往復の一部になります。
この仕組みがtextlint本体に入るものなのかは、まだわかりません。

### サポートの募集

textlintを使っていて、文書の数が多くて遅いという場合は、`textlint --profile`の出力を[GitHub Discussions](https://github.com/textlint/textlint/discussions)で教えてください。
どのようなルールと文書で遅いのかがわかると、次に何を改善するかを決めやすくなります。

また、textlintの開発を支援してくれる方やスポンサーを募集しています。

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)

## おわりに

textlintと、よく使われているルールやライブラリを改善して、lintの時間は約10分の1になりました。
既存のルールと設定はそのまま動き、lintの結果も変わっていません。
