---
title: "Secretlint v14.0.0リリース: 公式ルールを本体に同梱、大規模リポジトリのチェックを高速化"
author: azu
layout: post
date : 2026-11-15T16:00+09:00
category: secretlint
tags:
    - secretlint
    - security
    - nodejs
    - performance

---

ソースコードや設定ファイルに含まれるAPIトークンやパスワードなどの機密情報を見つける[Secretlint](https://github.com/secretlint/secretlint)のv14.0.0をリリースしました。

- [Release v14.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v14.0.0)

このバージョンの主な変更点は次の3つです。

- 公式ルールとプリセットを`secretlint`本体に同梱
- 設定ファイルがないときは、recommendプリセットで実行
- ファイル数が多いリポジトリでのチェックを高速化

v13からv14へは、基本的に設定や使い方を変えなくてもアップデートできます。
公式ルールが本体に入ったので、不要になったルールのパッケージを取り除くことを推奨します。
詳しくは移行ガイドを参照してください。

- [v13からv14への移行ガイド](https://github.com/secretlint/secretlint/blob/HEAD/docs/migrations/v13-to-v14.md)

この記事では、次の3つを順番に書きます。

- v14の変更点と、公式ルールを本体に同梱した理由
- どういう考え方でパフォーマンスを改善したか
- 最終的な処理の流れと技術的な詳細

## v14の変更点

詳しい変更点は、リリースノートと移行ガイドを参照してください。
ここでは主な変更点を紹介します。

### 公式ルールを本体に同梱

公式ルールとプリセットを、`@secretlint/core`へ含めました（[#1798](https://github.com/secretlint/secretlint/pull/1798), [#1832](https://github.com/secretlint/secretlint/pull/1832)）。
インストールは`secretlint`だけで済みます。

```bash
# v13
npm install secretlint @secretlint/secretlint-rule-preset-recommend --save-dev
# v14
npm install secretlint --save-dev
```

ルールのidは変わらないため、今の`.secretlintrc.json`はそのまま動きます。
これまでインストールしていた公式ルールのパッケージ（例: `@secretlint/secretlint-rule-preset-recommend`）は、使われなくなります。
`package.json`から削除できます。

同梱した主な理由は、npmへのパッケージ公開がボトルネックになり、新しいルールを追加するコストが高くなっていたためです。
v13までは、公式ルールが1つずつ別のnpmパッケージでした。
新しいルールを追加するには、新しいnpmパッケージを作る必要があります。

近年のサプライチェーン攻撃への対策として、npmパッケージを公開するときの工程は増えています。
SecretlintはOIDCを使うTrusted Publishingでパッケージを公開していますが、新しいパッケージは`npm publish`だけでは作れません。
Trusted Publishingは、一度公開されたパッケージにしか設定できないためです。
そのため、まず設定用の空のパッケージを公開し、Trusted Publishingを設定してから、本来のパッケージを公開するという2段階の流れになります。
この流れについては、次の記事に書いています。

- [npm Trusted PublishingでOIDCを使ってトークンレスでCIからnpmパッケージを公開する](https://efcl.info/2025/09/07/npm-oidc/)

この手間があるため、新しいルールを気軽に追加できなくなっていました。
v14からは、新しいルールは`@secretlint/core`の中のファイルとして追加します。
新しいnpmパッケージを作る必要がなく、ルールのバージョンは常にSecretlint本体と同じです。

あわせて、`secretlint`のサードパーティの実行時依存は69パッケージから16パッケージに減りました。

### 設定ファイルなしで実行

設定ファイルがないときは、エラーで終わる代わりにrecommendプリセットで実行します（[#1835](https://github.com/secretlint/secretlint/pull/1835)）。
recommendプリセットが本体に同梱されたので、`.secretlintrc.json`の設定ファイルを必須にする理由がなくなりました。
次のコマンドだけで試せます。

```bash
npx secretlint "**/*"
```

### 宣言的なルール

ルールを、`create()`関数ではなく`keywords`付きの`patterns`というデータで書けるようになりました（[#1794](https://github.com/secretlint/secretlint/pull/1794)）。
`@secretlint/secretlint-rule-pattern`に書いた独自のパターンも、同じ仕組みで動きます（[#1826](https://github.com/secretlint/secretlint/pull/1826)）。
これは、次に書くパフォーマンス改善の土台になっています。

### 破壊的変更

多くの利用者は、何も変えずにアップデートできます。
主な破壊的変更は次のとおりです。

- 結果と`--format json`から`sourceContent`を削除し、フォーマッターには`getSource(filePath)`を渡す（[#1797](https://github.com/secretlint/secretlint/pull/1797)）
- `--secretlintignore`はカレントディレクトリからのパスとして読み、`.secretlintignore`に加えて使う（[#1834](https://github.com/secretlint/secretlint/pull/1834)）
- ファイルをlintする順序は保証せず、ファイルをまたいで状態を持つルールはサポートしない
- `--profile`は、lintの結果の代わりにサマリーを出力

v14がサポートするのは、Node.js 22+です。

## パフォーマンス改善の進め方

約10万ファイルある[linux](https://github.com/torvalds/linux)のリポジトリ全体のチェックは、v13.1.0では56.5秒かかっていました。
v14では2.31秒です。
RustなどのネイティブコードやWebAssemblyは使わず、Secretlintは今もJavaScriptだけで動いています。

![Secretlint v13.1.0とv14の実行時間の比較](/wp-content/uploads/2026/secretlint-v14-performance.png)

| `secretlint "**/*"` | ファイル数 | v13.1.0 | v14 | 速度比 |
| --- | ---: | ---: | ---: | ---: |
| 1ファイル（pre-commitフックのような使い方） | 1 | 246 ms | 153 ms | 1.6倍 |
| [react](https://github.com/facebook/react) | 7,275 | 2.82 s | 405 ms | 7.0倍 |
| [vscode](https://github.com/microsoft/vscode) | 21,442 | 13.9 s | 758 ms | 18.3倍 |
| [linux](https://github.com/torvalds/linux) | 97,265 | 56.5 s | 2.31 s | 24.5倍 |

recommendプリセット、実行時間の中央値、Node.js 24.22、4 vCPUのLinuxで計測した結果です。
CPUのコア数が多いマシンではもっと並列化されるので、ファイル数が多いリポジトリでの改善率はもう少し良くなるはずです。

まず1スレッドのネイティブ実装とJavaScriptの実装を比べて、その差を埋めました。
1スレッドでほぼ同じ速さになれば、残る差は並列化だけです。
その並列化は、ルールを読み込まない軽いワーカースレッドで、キーワードを探す処理だけに入れました。

進めた順番は次のとおりです。

1. `--profile`とCIで、どこに時間がかかるかを計測できる状態にする
2. 同じ処理をRustで書き、1スレッドのネイティブ実装とJavaScriptの実装を比較
3. 1スレッドでの差（ファイル探索、起動、文字列への変換）を解消
4. 残った差である並列化の方法を比較
5. ワーカースレッドで、ファイルの読み込みとキーワード検索だけを並列化
6. Worker数を、ファイル数ではなく処理時間から決定
7. 短いキーワードには後ろに続く文字の条件を付けて、ルールを実行する量を削減

### 計測できる状態にする

最初に、`secretlint --profile`でフェーズ、ルール、パターン、ファイルごとの時間を出せるようにしました（[#1820](https://github.com/secretlint/secretlint/pull/1820)）。
PRごとにbaseとheadのプロファイルとベンチマークを比べるCIも入れています（[#1828](https://github.com/secretlint/secretlint/pull/1828)）。
これで、改善と劣化がPRの時点で見えます。

たとえば、textlintのリポジトリで`secretlint --profile "**/*"`を実行すると、次のような出力になります。
パターンとファイルの一覧は省略しています。

```
secretlint profile: 290.82ms, 1472 files

Phase                                Time(ms)      %  Count
secretlint>cli                         290.82  100.0      1
  @node>load-config                      3.91    1.3      1
    @config-loader>load-config-file      2.64    0.9      1
    @config-loader>load-packages         1.16    0.4      1
  secretlint>search-files              121.23   41.7      1
  @node>execute                        165.22   56.8      1
    @node>read-file                    109.09   37.5   1024
    @core>lint                          31.88   11.0   1024
      @core>setup-rules                  2.24    0.8      1
      @core>keyword-scan                15.73    5.4   1003
      @core>line-check                   6.17    2.1    206
      @core>rule-handler                 0.03    0.0     21
    @node>format                         2.62    0.9      1

Time(ms)  Files  Thread (2)
  155.43   1024  main
   69.63    448  worker 1

Time(ms)  Files  Rule
    0.03     21  @secretlint/secretlint-rule-gcp
```

1,472ファイルのうち、ルールの実行（`@core>rule-handler`）まで進んだのは21ファイルだけです。

### 1スレッドのネイティブ実装とJSの実装を比較

次に、同じ処理をRustで書いて、1スレッドの時間を比べました。
比べたのは、ファイル探索、読み込み、キーワード検索の3つです。
ファイル探索にはripgrepが使っている[ignore crate](https://docs.rs/ignore/latest/ignore/)、キーワード検索には[aho-corasick crate](https://docs.rs/aho-corasick/latest/aho_corasick/)を使っています。

vscodeのリポジトリでは、ファイルの読み込みはRustが275〜290ms、Secretlintが約270msでほぼ同じでした。
同じ66個のキーワードを探す時間も、どちらも約660msでした。
差があったのはファイル探索で、ignore crateの50〜55msに対してSecretlintは約180msでした。
ほかの差は、起動やGCなどJavaScriptのランタイムにかかる時間です。

つまり、読み込みと検索そのものはJavaScriptでもネイティブとほぼ同じ速さでした。

正規表現については、特に差がありませんでした。
V8が十分に速い正規表現エンジンを持っているためです。
同じパターンをGoの正規表現で試すと、キーワードで絞り込んだあとの実行はV8の17msに対して988msでした。

### 1スレッドでの差を埋める

ファイル探索では、Gitと同じ挙動のignoreのマッチャーを自前で実装しました。
ignoreのルールは、エントリーの名前から引きます（[#1818](https://github.com/secretlint/secretlint/pull/1818), [#1822](https://github.com/secretlint/secretlint/pull/1822)）。
vscodeのファイル探索は158msから53msになり、ignore crateの1スレッド（32〜36ms）に近づいています。

検索は、データの形から考え直しました。
ルールを宣言的なデータにして、ファイルのバイト列を1回だけ走査し、すべてのルールのキーワードをまとめて探します（[#1794](https://github.com/secretlint/secretlint/pull/1794)）。
キーワードがないファイルは文字列に変換せず、ルールも動かしません。

ここでは、[Yuku](https://yuku.fyi/)などを参考にして、data-oriented design（データ指向設計）の考え方を使いました。
処理の都合ではなく、データの形とその変換のコストから設計を決める考え方です。

- [Engineering High Performance Parsers (with Zig) - Ziggit](https://ziggit.dev/t/engineering-high-performance-parsers-with-zig/16761)

この考え方で見ると、大きなコストはファイルの読み込みとデータの変換でした。
たとえば14,430ファイルを`utf8`の文字列として読むと614msかかります。
1つの`Buffer`を使い回して、`fs.readSync`でバイト列として読むと82msで済みました。
v14の実装も、`Buffer.allocUnsafe`で確保した1つの`Buffer`を使い回しています。
ワーカーからメインスレッドへは、`Uint8Array`にまとめたバイト列をコピーせずに移します。

起動も、依存を減らすことで短くしています（[#1813](https://github.com/secretlint/secretlint/pull/1813), [#1814](https://github.com/secretlint/secretlint/pull/1814), [#1816](https://github.com/secretlint/secretlint/pull/1816)）。

### 並列化の方法を選ぶ

Rustのignore crateでの探索やaho-corasick crateでの検索と、1スレッドではほぼ同じ速さになりました。
残るネイティブの実装との差は、スレッドの数の分だけです。
並列化の方法として、ネイティブのプログラム、WebAssembly、Node.jsのワーカースレッドを比べました。

キーワードの絞り込みをRustの子プロセスで並列に行うプロトタイプでは、4スレッドでの読み込みと検索は207msでした。
同じことをするJavaScriptのワーカースレッド4つは241msで、ほぼ同じです。
ネイティブにするとプラットフォームごとのビルドと配布が必要です。
それで得られるのがワーカースレッドと同じ並列化の分だけなので、ワーカースレッドを選びました。

並列化するのはNode.jsのエンジン（`@secretlint/node`）とCLIの層だけです。
coreはブラウザでも動かすので、どこでも使えるスレッドの始め方がありません。
そのため、coreはキーワード検索をlintから切り離すだけにして、ワーカーは呼び出し側が始めます。

### JavaScriptのままにした理由

JavaScriptのままにすること自体へのこだわりは、そこまでありませんでした。
測ってみるとJavaScriptのままでも十分速くなったので、書き直す理由がなくなったという形です。

一方で、ブラウザでもSecretlintを動かしたいという要件はあります。
`@secretlint/core`とrecommendプリセットはブラウザでそのまま動き、PlaywrightとChromiumでのテストを変更ごとに実行しています（[#1803](https://github.com/secretlint/secretlint/pull/1803)）。
ネイティブのバイナリにすると、ブラウザで動かすのが面倒です。

もう1つの理由は、ルールの性質です。
Secretlintのルールを整理すると、ほとんどは「キーワード」と「正規表現」で書ける宣言的なルールでした。
調べた時点では、recommendプリセットの28ルールのうち27ルールがこの形で書けました。

Parcel 3のように、coreをネイティブで書き直す構成も考えられます。
Parcel 3はRustで全体を書き直していて、プラグインもRustなどのネイティブの言語で書くようになっています。
（AIでコードを書くので、以前よりプラグインをJavaScriptにする理由は減ってきていそうです）

- [Announcing Parcel 3 alpha](https://v3.parceljs.org/blog/v3-alpha/)

ただ、ネイティブとJavaScriptを混ぜると、その間でデータを渡すシリアライズのコストがかかります。
Parcel 3の記事も、JavaScriptのcoreの限界として、ワーカーや言語の間で値をシリアライズするコストを挙げています。
Secretlintのルールはほとんどが宣言的なデータなので、あえてネイティブとJavaScriptを混ぜる必要性がありませんでした。
先に書いたように大きなコストは読み込みとデータの変換なので、混ぜると変換が増えて逆に遅くなりえます。
ルールが宣言的なデータであれば、JavaScriptのままでも実行の仕方をcoreの側で最適化できます。

### ルールをワーカーで動かさない理由

プロファイルを見ると、時間を使っていたのはキーワード検索とファイルの読み込みでした。
たとえば[linux](https://github.com/torvalds/linux)のリポジトリでは、全体の4,459msのうちキーワード検索が2,927ms、読み込みが838msです。
ルールの実行には、あまり時間がかかっていません。
ルールが動くのは、キーワードで絞り込んだファイルだけだからです。

そこで、ワーカースレッドではファイルを読んでキーワードを探すところだけを行い、ルールはメインスレッドで実行します（[#1824](https://github.com/secretlint/secretlint/pull/1824)）。

ルールまでワーカーで実行すると、各ワーカーが設定とすべてのルールを読み込みます。
カスタムルールの大きさは決まっていないので、ワーカーの起動時間が一定になりません。

![ルールもワーカーで実行する場合と、Secretlint v14の比較](https://mermaid.ink/svg/Zmxvd2NoYXJ0IExSCiAgICBzdWJncmFwaCBBWyLjg6vjg7zjg6vjgoLjg6_jg7zjgqvjg7zjgaflrp_ooYzjgZnjgovloLTlkIgiXQogICAgICAgIEExWyLjg6_jg7zjgqvjg7zotbfli5UiXSAtLT4gQTJbIuioreWumuOBqOOBmeOBueOBpuOBruODq-ODvOODq-OCkuiqreOBv-i-vOOCgCJdIC0tPiBBM1si6Kqt44G_6L6844G_ICsg44Kt44O844Ov44O844OJ5qSc57SiICsg44Or44O844Or5a6f6KGMIl0KICAgIGVuZAogICAgc3ViZ3JhcGggQlsiU2VjcmV0bGludCB2MTQiXQogICAgICAgIEIxWyLjg6_jg7zjgqvjg7zotbfli5UiXSAtLT4gQjJbIuOCreODvOODr-ODvOODieOBqOato-imj-ihqOePvuOCkjxici8-44OH44O844K_44Gn5Y-X44GR5Y-W44KLIl0gLS0-IEIzWyLoqq3jgb_ovrzjgb8gKyDjgq3jg7zjg6_jg7zjg4nmpJzntKIiXSAtLT4gQjRbIuODoeOCpOODs-OCueODrOODg-ODieOBp-ODq-ODvOODq-Wun-ihjDxici8-77yI5q6L44Gj44Gf44OV44Kh44Kk44Or44Gg44GR77yJIl0KICAgIGVuZAo?bgColor=FFFFFF)

ESLintはv9.34.0でマルチスレッドのlintを入れています。
その紹介記事には、スレッドを増やすとかえって遅くなる場合があると書かれています。
設定やプラグインの初期化が長い場合です。

- [New in ESLint v9.34.0: Multithread Linting](https://eslint.org/blog/2025/08/multithread-linting/)

textlintでも、v11.4.0で`--parallel`を実験的に入れたことがあります（[textlint#633](https://github.com/textlint/textlint/issues/633)）。
ファイル数がとても多いと効果が出ますが、ワーカーの起動が重く、そこまで効果は出ませんでした。
後のバージョンで、この`--parallel`はdeprecatedとなりました（[textlint#1383](https://github.com/textlint/textlint/pull/1383)）。

キーワードを探すだけなら、ワーカーに必要なのはキーワードの文字列と、行を確かめる正規表現のソースとフラグだけです。
Secretlintのワーカーは、coreのキーワードマッチャーと行の確認だけを読み込み、キーワードと正規表現はデータとして受け取ります。
このコードは、ルールが増えても大きくなりません。

### Worker数を処理時間で決める

ワーカーを始めるかどうかは、ファイル数ではなく時間で決めています。
メインスレッドが1つでlintを始めて、実際にlintできた速さから残りの時間を見積もります。
残りの時間が短ければ、ワーカーを1つも始めません。
そのため、小さなリポジトリやpre-commitでの実行が、ワーカーの起動コストを払うことはありません。

走査の時間はファイルの大きさやディスクの速さで変わります。
ファイル数を定数で割る方法だと、あるリポジトリに合う定数が別のリポジトリには合いません。

### ルールを実行する量を減らす

ルールを実行するメインスレッドは1つです。
そのため、ルールへ来る前の段階でファイルを減らす実装をしています。
ルールが動くのは、キーワードがあり、さらにその行がパターンの正規表現に一致したファイルだけです。

Secretlintは誤検知（false positive）を減らす方針なので、形式が決まっているcredentialだけを検出します。
一方で、接頭辞の形式は決まっていても、Oktaのトークンの`00`のように、短くてほかの場所にも登場する接頭辞を使うサービスがあります。
こういう接頭辞は多くのファイルに当たるので、キーワードとして役に立ちません。
その対策として、キーワードの後ろに続く文字の種類と数を、`after`という条件で書けるようにしました（[#1827](https://github.com/secretlint/secretlint/pull/1827)）。

```js
keywords: ["sk-ant-", { keyword: "00", after: "[A-Za-z0-9_-]{40,}" }]
```

この例では、`00`の後ろに指定した文字が40文字以上続く場所だけが、キーワードとして扱われます。
この条件はキーワード検索のループの中で確かめるので、条件を満たさない場所は記録もしません。
条件を正規表現ではなく文字の集合と数だけにしたのは、後戻りがなく、コストの上限が決まるためです。

### 試して採用しなかったこと

WebAssemblyのSIMD命令でふるいをかけてからキーワードを探す方法も実装しました（[#1823](https://github.com/secretlint/secretlint/pull/1823)）。
ふるいは、ファイルを16バイトずつまとめて見て、どのキーワードも含まれえないブロックを捨てる処理です。
残ったブロックだけを、これまでのキーワード検索で確かめます。

今の65個のキーワードでは、ふるいが残すブロックは5%で、キーワード検索は速くなりました。
しかし、ふるいは各キーワードの一部の3バイトを目印にしています。
キーワードが増えると目印も増えるので、捨てられるブロックが減ります。
キーワードを100個足すと、ふるいは66%のブロックを残しました。
残ったブロックはふるいとキーワード検索の両方を通るので、ふるいの分だけ仕事が増えます。
ルールの追加でキーワードは今後も増えるので、採用しませんでした。

ワーカーの最初の版は、先に全ファイルを走査して、キーワードのあるファイルをメインスレッドが読み直す作りでした。
この作りは、キーワードを持たないルールがある設定で、すべてのファイルを2回読んでしまいます。
macOSではファイルの読み込みが1ファイルあたり約96µsと重く、1スレッドより遅くなりました。
そのため、ファイルを読むのは1回だけにして、ワーカーが読んだバイト列をメインスレッドへ渡す設計に直しています。

## 最終的な処理の流れ

v14の`secretlint "**/*"`は、次のように動きます。

![Secretlint v14の処理の流れ](https://mermaid.ink/svg/Zmxvd2NoYXJ0IFRECiAgICBBWyLjg5XjgqHjgqTjg6vmjqLntKLvvIhHaXTkupLmj5vjga5pZ25vcmXvvIkiXSAtLT4gQlsi44OV44Kh44Kk44Or44Gu5LiA6Kan44KS5YWo44K544Os44OD44OJ44Gn5YWx5pyJIl0KICAgIEIgLS0-IENbIuODoeOCpOODs-OCueODrOODg-ODiTogMzLjg5XjgqHjgqTjg6vjgZrjgaTlj5bjgaPjgaZsaW50Il0KICAgIEMgLS0-IER7IuaFo-OCieOBlzIwbXMgKyDoqIjmuKwyMG1z44GnPGJyLz7mrovjgormmYLplpPjgpLopovnqY3jgoLjgosifQogICAgRCAtLSAi5q6L44KK44GM6ZW344GEIiAtLT4gRVsi44Ov44O844Kr44O844KS5aeL44KB44KLPGJyLz7mlbAgPSDmrovjgormmYLplpMgLyAxMDBtcyJdCiAgICBEIC0tICLmrovjgorjgYznn63jgYQiIC0tPiBMCiAgICBFIC0tPiBGWyLjg6_jg7zjgqvjg7w6IDMy44OV44Kh44Kk44Or44Ga44Gk5Y-W44KLIl0KICAgIEYgLS0-IEdbIuODkOOCpOODiOWIl-OBqOOBl-OBpuiqreOCgCJdCiAgICBHIC0tPiBIWyLjgq3jg7zjg6_jg7zjg4nmpJzntKLjgajooYzjga7norroqo08YnIvPu-8iOODq-ODvOODq-OBr-iqreOBv-i-vOOBvuOBquOBhO-8iSJdCiAgICBIIC0tPiBJeyLjg6vjg7zjg6vjgYzli5XjgY88YnIvPuWPr-iDveaAp-OBjOOBguOCiz8ifQogICAgSSAtLSAi44GE44GE44GIIiAtLT4gSlsi44Oh44OD44K744O844K444Gq44GX44Go6KiY6YyyIl0KICAgIEkgLS0gIuOBr-OBhCIgLS0-IEtbIuODkOOCpOODiOWIl-OBqOaknOe0oue1kOaenOOCkjxici8-44Oh44Kk44Oz44K544Os44OD44OJ44G456e744GZIl0KICAgIEsgLS0-IExbIuODoeOCpOODs-OCueODrOODg-ODiTog44Or44O844Or44KS5a6f6KGMIl0KICAgIEwgLS0-IE1bIue1kOaenOOCkuODleOCoeOCpOODq-OBrumghuOBq-WHuuWKmyJdCiAgICBKIC0tPiBNCg?bgColor=FFFFFF)

この流れのポイントは次のとおりです。

- ファイルを読むのは、そのファイルを取ったスレッドの1回だけ
- メッセージを作るのはメインスレッドのルールだけなので、結果は1スレッドのときと同じ
- ワーカーはルールを読み込まないので、起動は小さく一定
- coreはワーカーを始めず、並列化するのはNode.jsのエンジン、CLI、単一実行バイナリの層だけ

## 技術的な詳細

ワーカースレッドの設計は、リポジトリの設計ドキュメントにまとめています。

- [secret-scanningの設計ドキュメント（Looking for keywords on several threads）](https://github.com/secretlint/secretlint/blob/HEAD/docs/products/secretlint/features/secret-scanning/design.md)

coreには、`@secretlint/core/keyword-scan`という入口があります。
この入口が読み込むのはキーワードマッチャーだけで、ルール、設定、Node.jsのモジュールは読み込みません。
`getKeywordScanPlan({ config })`が、キーワードと行を確かめる正規表現をただのデータとして返し、ワーカーはそれだけを受け取ります。

メインスレッドとワーカーは、ファイルの一覧と`SharedArrayBuffer`を共有し、`Atomics.add`で次の32ファイルを取ります。
ファイルを前もってスレッドに割り当てないので、遅れて始まったスレッドは受け持つファイルが少なくなるだけです。

ワーカーは、キーワードのある行だけを文字列にして、パターンの正規表現でテストします。
キーワードのあるファイルは、パターンに一致するファイルよりずっと多くあります。
この確認をメインスレッドでやると、メインスレッドが限界になりました。

ワーカーの数は、次のように決めています。
メインスレッドは20msの慣らしのあと、次の20msでlintできたファイル数から残りの時間を見積もります。
始めるワーカーの数は`floor(残りの時間 / 100ms)`で、多くても`os.availableParallelism() - 1`です。
100msは、ワーカーの起動にかかるおおよその時間です。
慣らしを入れているのは、ランタイムが最適化するまでlintが数倍遅く、見積もりが大きくなりすぎるためです。

メモリには上限があります。
メインスレッドがまだlintしていないバイト列が256MBを超えている間、ワーカーは次のファイルを取らずに待ちます。

Bunの`bun build --compile`で作る単一実行バイナリには、ワーカーを2つ目のエントリーとして同梱しています。
そのため、バイナリでも同じ仕組みで動きます。

## 書いてみて思ったこと

自分で実装してみると、ほかのツールと大体同じことをやっていました。

[Hyperscan](https://www.usenix.org/conference/nsdi19/presentation/wang-xiang)は、正規表現から固定の文字列を取り出して先に探し、見つかった場所だけで正規表現を確かめます。
Secretlintの、キーワードで絞り込んでから正規表現を動かす流れと同じ考え方です。

[Betterleaks](https://github.com/betterleaks/betterleaks)は、Aho-Corasickによるキーワードの絞り込みと並列化を、速さの理由として挙げています。
キーワードの後ろの文字が満たすべき条件を確かめる仕組み（[assignment_guard.go](https://github.com/betterleaks/betterleaks/blob/main/scan/assignment_guard.go)）も持っています。
Betterleaksはこの条件を正規表現から推測します。
Secretlintは、ルールを書く人が条件を明示的に書き、書き間違いはテストで落とします。

ripgrepも、ignore crateで探索したファイルを複数のスレッドで検索します。

最初からこれらを真似したわけではありません。
計測してボトルネックを1つずつ潰していくと、結果として似た形になりました。
みんな大体同じようなことをやっているんだな、と書いていて思いました。

## まとめ

[Secretlint v14.0.0](https://github.com/secretlint/secretlint/releases/tag/v14.0.0)では、公式ルールを本体に同梱し、JavaScriptのままファイル数が多いリポジトリでのチェックを速くしました。

- [公式ルールを本体に同梱（#1798）](https://github.com/secretlint/secretlint/pull/1798)
- [宣言的なルールと、バイト列を1回だけ走査する検索（#1794）](https://github.com/secretlint/secretlint/pull/1794)
- [ワーカースレッドでのファイルの読み込みとキーワード検索（#1824）](https://github.com/secretlint/secretlint/pull/1824)
- [ブラウザでのテスト（#1803）](https://github.com/secretlint/secretlint/pull/1803)
- [v13からv14への移行ガイド](https://github.com/secretlint/secretlint/blob/HEAD/docs/migrations/v13-to-v14.md)

ぜひ`npx secretlint "**/*"`で試してみてください。
