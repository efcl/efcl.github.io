---
title: "automerge-gate: GitHubのAuto Mergeをひとつの必須チェックに集約するGitHub Action"
author: azu
layout: post
date: 2026-05-13T20:00+09:00
category: GitHub
tags:
    - GitHub
    - GitHub Actions
    - CI/CD

---

GitHubのAuto Mergeをひとつの必須チェックに集約するためのGitHub Action [automerge-gate](https://github.com/pkgdeps/automerge-gate) があったので紹介します。

- GitHub: [pkgdeps/automerge-gate](https://github.com/pkgdeps/automerge-gate)

## 背景: GitHubの必須チェックは"名前で列挙する"のがつらい

GitHubのBranch protection ruleやRulesetは、マージに必要なステータスチェックを名前で列挙する形式です。
この方式は次のような場面で壊れやすいという問題があります。

- RenovateやDependabotなど外部のGitHub Appが追加するチェックは、PRごとにあったりなかったりする
- monorepoでパスフィルタを使っていると、ワークフローがPRによってスキップされたりされなかったりする
- 新しいワークフローを追加する度に、Rulesetを書き換える必要がある

GitHubのRulesetは複数の必須チェックをANDでつなぐ(全部成功すること)しか表現できないため、「チェック群のうちどれかが走っていればよい」みたいな条件は書けません。
そのため、PRごとに発火するチェックが違うケースだと、片方のPRでは存在しないチェックを必須にしてしまい、いつまでもマージできないという状態が発生します。

この問題への対処として、必須チェックを1つのステータスに集約する[upsidr/merge-gatekeeper](https://github.com/upsidr/merge-gatekeeper)を使っているケースも多いです。
自分も[textlint](https://github.com/textlint/textlint)などのOSSや、プライベートリポジトリで使っていました。

- [CI: add Merge Gatekeeper workflow for pull requests by azu · Pull Request #1577 · textlint/textlint](https://github.com/textlint/textlint/pull/1577)

ただ、最近はmerge-gatekeeperから後述する[automerge-gate](https://github.com/pkgdeps/automerge-gate)に入れ替えて使っています。

[automerge-gate](https://github.com/pkgdeps/automerge-gate)は、同じ「集約された1つの必須チェック」というアプローチを採用しつつ、GitHubのAuto Mergeと組み合わせて使うことを前提に作られています。
必須チェックとして登録するのは`automerge-gate/all-passed`の1つだけで、ワークフローやGitHub App由来のチェックをこのアクションが集約してくれます。

## 仕組み

automerge-gateには2つのモードがあります。

- Private mode — フォークPRを受け取らないリポジトリ向けのコスト最適化モード。マージ意図のないPRではアクション自体が早期returnして、ランナー時間を消費しない
- Public mode — フォークPRを受け取るリポジトリ向け。フォークPRでは`GITHUB_TOKEN`が読み取り専用になるため、ジョブ自身の`check_run`の終了コードがゲート信号になる

メインのユースケースはPrivate modeです。Public modeはOSSのようにフォークPRを受け付けるリポジトリ向けに用意されています。

### Private mode (メインのユースケース)

Private modeでは、アクションがREST APIで集約結果をcommit statusとして書き込みます。
重要なのは、PRが開かれただけでマージ意図がない状態(Auto Merge未有効 & write権限のApproveなし)では、アクション側はポーリングをせずに何も書き込まずにすぐに終了する点です。

このとき、必須チェック`automerge-gate/all-passed`はGitHubのデフォルトの`Expected — Waiting for status to be reported`のままです。
そのため、マージはブロックされた状態が維持されます。
メンテナがAuto Mergeを有効化したタイミング、またはwrite権限を持つレビュアーがApproveしたタイミングで、初めてアクションがポーリングを開始してチェックを集約しにいきます。

![automerge-gate Private modeのシーケンス](https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBwYXJ0aWNpcGFudCBVIGFzIOODoeODs-ODhuODigogICAgcGFydGljaXBhbnQgQSBhcyBhdXRvbWVyZ2UtZ2F0ZSAoYWN0aW9uKQogICAgcGFydGljaXBhbnQgUFIgYXMgUHVsbCBSZXF1ZXN0CgogICAgVS0-PlBSOiBvcGVuIC8gcHVzaAogICAgTm90ZSBvdmVyIEE6IGFjdGlvbiDjga_jgrnjgq3jg4Pjg5cgKOODnuODvOOCuOaEj-Wbs-OBquOBlykKICAgIE5vdGUgb3ZlciBQUjog5b-F6aCI44OB44Kn44OD44Kv44GvICJFeHBlY3RlZCIg44Gu44G-44G-PGJyLz7jg57jg7zjgrjkuI3lj68KCiAgICBVLT4-UFI6IEVuYWJsZSBBdXRvIE1lcmdlIC8gQXBwcm92ZQogICAgQS0-PkE6IFBSIOS4iuOBruS7luOBruODgeOCp-ODg-OCr-OCkuODneODvOODquODs-OCsAoKICAgIGFsdCDjgZnjgbnjgabmiJDlip8KICAgICAgICBBLT4-UFI6IGNvbW1pdCBzdGF0dXMg44KSIHN1Y2Nlc3Mg44GnIFBPU1QKICAgICAgICBQUi0-PlBSOiBHaXRIdWIgYXV0by1tZXJnZSDihpIg44Oe44O844K4CiAgICBlbHNlIOOBhOOBmuOCjOOBi-WkseaVlwogICAgICAgIEEtPj5QUjogY29tbWl0IHN0YXR1cyDjgpIgZmFpbHVyZSDjgacgUE9TVAogICAgICAgIE5vdGUgb3ZlciBQUjog44Oe44O844K45LiN5Y-vCiAgICBlbmQK?type=png)

ジョブ自体は軽量で、PRの`check_run`を一定間隔(デフォルト30秒)でポーリングして集約結果を計算するだけです。
依存関係のビルドもなく、`runs-on: ubuntu-latest`の標準ランナーで十分動きます。
ポーリングしない場合のジョブは数秒で終わるので、Auto Mergeを使わないPRが大半を占めるリポジトリでは、ランナー時間をほぼ消費せずに済みます。

このスキップ動作は、プライベートリポジトリでの課金面で効いてきます。
GitHub Actionsの[runner料金](https://docs.github.com/en/billing/reference/actions-runner-pricing)は、ジョブ単位の1分未満切り上げです。
ランナーごとの料金は次のとおりです。

| SKU | runner | 料金 |
|------|--------|------|
| `actions_linux` | Linux 2-core (`ubuntu-latest`) | $0.006 / 分 |
| `actions_linux_arm` | Linux 2-core arm64 | $0.005 / 分 |
| `actions_linux_slim` | Linux 1-core slim | $0.002 / 分 |

毎PR・毎pushでポーリングジョブが走ると、ジョブが数秒で終わっても1分切り上げで課金されていきます。
[merge-gatekeeper](https://github.com/upsidr/merge-gatekeeper)は同等の集約処理をしてくれますが、Auto Mergeを使わないPRでも常にポーリングを始める設計です。
さらに安価な`actions_linux_slim` (1-core) では動かないため、$0.006/分の`ubuntu-latest`系ランナーで毎回1分課金されていました。
自分の用途ではプライベートリポジトリでも、Auto Mergeまで進むPRは一部です。
「マージ意図がないPRはスキップする」というautomerge-gateの設計のほうが、無駄なポーリング費用を抑えられて都合がよいです。

Commit statusは`(SHA, context)`の組をキーにしてGitHubが評価するので、新しいコミットがpushされても自動的に新しいSHAに対して再評価が走ります。Auto Mergeを一度有効にしたら、その後はpush毎に有効/無効を切り替える必要はありません。

## 設定方法

設定は次の5ステップです。

1. モードを選ぶ(Private / Public)
2. `.github/workflows/automerge-gate.yaml`を追加
3. Ruleset(またはBranch protection)で`automerge-gate/all-passed`を必須チェックに登録
4. リポジトリ設定で「Allow auto-merge」を有効化
5. PRで「Enable Auto Merge」をクリック

### ワークフローファイル (Private mode)

`.github/workflows/automerge-gate.yaml`は次のような内容になります。

```yaml
name: automerge-gate

on:
  pull_request:
    types: [opened, synchronize, reopened, auto_merge_enabled]
  pull_request_review:
    types: [submitted]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  gate:
    if: >-
      github.event_name != 'pull_request_review' ||
      github.event.review.state == 'approved'
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      statuses: write
      checks: read
      pull-requests: read
      actions: read
    steps:
      - uses: pkgdeps/automerge-gate@v4.0.0
        with:
          gate-mode: 'private'
          context: 'automerge-gate/all-passed'
```

ポイントは次のとおりです。

- `pull_request_review`の`if:`で`approved`のみを通している。GitHubの`on:`はレビューのstateで絞り込めないので、ジョブの`if:`で弾いて空振りでもrunnerが立ち上がらないようにしている
- `timeout-minutes: 10`がポーリングループの唯一のタイムアウト。アクション側に独立した`timeout-seconds`入力はあえて用意されておらず、設定箇所を二重化しない方針になっている
- 権限は`statuses: write`(commit status書き込み)と`checks: read`(チェックの集約読み取り)で十分

Approveをマージ意図として扱いたくないチームは、`on:`から`pull_request_review`を外せば、Auto Mergeを明示的に有効化したときだけポーリングが走るようになります。

### 必須チェックの登録

Settings → Rules → Rulesetsを開いて、`automerge-gate/all-passed`を必須チェックに追加します。

> [!WARNING]
> 必須チェックのドロップダウンは、過去にそのリポジトリで実行されたチェック名しかオートコンプリートしないので、初回設定時は候補に出てきません。手入力で`automerge-gate/all-passed`と入れる必要があります。

### Auto Mergeの有効化

Settings → General → Pull Requestsで「Allow auto-merge」をチェックします。これをしないとPRに「Enable Auto Merge」ボタンが出ないので、ステップ5が動きません。

## 除外パターンの指定

CodecovやNetlifyのプレビュー、Renovateなど特定のチェック/Appをゲートから外したい場合は、`ignore-apps`または`ignore-checks`で除外できます。

```yaml
- uses: pkgdeps/automerge-gate@v4.0.0
  with:
    gate-mode: 'private'
    ignore-apps: |
      dependabot
      renovate
```

`ignore-checks`はglob(`*` / `?`)が使えます。

```yaml
- uses: pkgdeps/automerge-gate@v4.0.0
  with:
    gate-mode: 'private'
    ignore-checks: |
      optional-*
      docs-only
```

`ignore-checks`が照合するのはGitHub APIの`check_run.name`(=`jobs.<key>.name`)です。
GitHubのUIで見える`<workflow> / <job>`形式ではない点に注意してください。
実際にどの名前で記録されているかは、次のコマンドで確認できます。

```bash
gh api "repos/{owner}/{repo}/commits/{sha}/check-runs" \
  --jq '.check_runs[] | {name, app: .app.slug, conclusion}'
```

## Public modeについて

OSSのようにフォークPRを受け付けるリポジトリでは、フォークPRに対して`GITHUB_TOKEN`が読み取り専用になります。
そのため、Private modeのようにcommit statusをPOSTする方法は使えません。
書き込みできないと「待機中(=ステータス未設定)」という状態も外に出せないので、Private modeでやっている「マージ意図がなければスキップ」もそのままでは表現できないことになります。

そこでPublic modeでは、ジョブ自身の`check_run`(GitHub Actionsが自動で作るもの)の終了コードをゲート信号として扱います。
ジョブの`name:`を必須チェックの名前(`automerge-gate/all-passed`)に揃えておくことで、ジョブの結果がそのまま必須チェックの結果になります。
代わりに「スキップで節約」はできなくなるため、全イベントで常にポーリングを回す形になります。
このトレードオフについては、[architecture.md](https://github.com/pkgdeps/automerge-gate/blob/main/docs/architecture.md)に背景がまとまっています。
他のアプローチもいくつか試したうえで、ややヒューリスティックなこの形に落ち着いた、という設計のようです。

![automerge-gate Public modeのシーケンス](https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBwYXJ0aWNpcGFudCBQUiBhcyBQdWxsIFJlcXVlc3QKICAgIHBhcnRpY2lwYW50IEogYXMgZ2F0ZSBqb2IKICAgIHBhcnRpY2lwYW50IEEgYXMgYXV0b21lcmdlLWdhdGUgKGFjdGlvbikKCiAgICBQUi0-Pko6IHdvcmtmbG93IHRyaWdnZXIgKOW4uOaZgikKICAgIE5vdGUgb3ZlciBKOiBqb2Ig44GuIGNoZWNrX3J1biA9IOW_hemgiOODgeOCp-ODg-OCrzxici8-KGpvYiDlkI3jgajkuIDoh7QpCiAgICBKLT4-QTogYWN0aW9uIOOBjOS7luOBruODgeOCp-ODg-OCr-OCkuODneODvOODquODs-OCsAoKICAgIGFsdCDjgZnjgbnjgabmiJDlip8KICAgICAgICBBLT4-SjogZXhpdCAwCiAgICAgICAgSi0-PlBSOiBqb2Ig44GuIGNoZWNrX3J1biDihpIgc3VjY2VzcwogICAgICAgIFBSLT4-UFI6IEdpdEh1YiBhdXRvLW1lcmdlIOKGkiDjg57jg7zjgrgKICAgIGVsc2Ug44GE44Ga44KM44GL5aSx5pWXCiAgICAgICAgQS0-Pko6IGV4aXQgbm9uLXplcm8KICAgICAgICBKLT4-UFI6IGpvYiDjga4gY2hlY2tfcnVuIOKGkiBmYWlsdXJlCiAgICAgICAgTm90ZSBvdmVyIFBSOiDjg57jg7zjgrjkuI3lj68KICAgIGVuZAo?type=png)

ワークフローは次のようになります。

```yaml
name: automerge-gate

on:
  pull_request:
    types: [opened, synchronize, reopened, auto_merge_enabled]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  gate:
    name: automerge-gate/all-passed # ruleset側の必須チェック名と一致させる
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      checks: read
      pull-requests: read
      actions: read
    steps:
      - uses: pkgdeps/automerge-gate@v4.0.0
        with:
          gate-mode: 'public'
```

Private modeとの違いはPublic modeの場合は次のような点です。

- 権限は`checks: read`のみでよい(commit statusを書き込まないため)
- 「マージ意図がないPRはスキップ」というコスト最適化は行わない。常にトリガーごとにポーリングする(`GITHUB_TOKEN`が読み取り専用だと"待機中"の信号を書き込めないため)
- ジョブの`name:`が必須チェック名そのものになる

実際のPublic modeでの実行例として、[secretlint/secretlint#1557](https://github.com/secretlint/secretlint/pull/1557)のログを見てみます。
`ubuntu-24.04`の標準ランナー上で、17個のチェックを集約している様子です。

```
##[group][00:05] Poll #1 — pending, 14/15 completed
  🟡 Agent (in_progress)
  ✅ Analyze (javascript-typescript) (success)
  ✅ Analyze (javascript) (success)
  ✅ binary-test (success)
  ✅ CodeQL (success)
  ...
##[group][00:38] Poll #2 — success, 17/17 completed
  ✅ Agent (success)
  ...
✅ Passed (17):
```

CodeQL、hadolint、secretlint、各OS/Node.jsのテストなど複数ワークフロー由来のチェックが、`automerge-gate/all-passed`の1つに集約されています。
ジョブ自体はチェック結果を読んで待つだけなので、約38秒で集約完了しています。

OSSのようにフォークPRを受け付ける環境でなければ、Private modeを使うのが基本になります。

## 制限事項

automerge-gateには次の制限があります。

- Merge Queue非対応 — GitHubの`merge_group`イベントには非対応
- ジョブのタイムアウト — `timeout-minutes`に達するとジョブが`failure` / `cancelled`で終わり、必須チェックは赤のまま残る。再試行するにはAuto Mergeを一度無効化して有効化し直す
- Legacy commit status APIのみのCI — AtlantisやJenkinsの一部のような、legacy commit status APIだけを使うCIは集約対象にならない
    - 該当するCIはRulesetに直接必須チェックとして追加し、`automerge-gate/all-passed`と並列に置く必要がある

## バージョニング

automerge-gateのリリースは、`v4.0.0`のような不変のSemVerタグで公開されます。
`v4`のように移動するメジャータグは意図的に作っていないので、ワークフロー側では固定バージョンを指定して、RenovateやDependabotで更新するスタイルが推奨されています。これは、移動するタグが書き換えられるサプライチェーンリスクを避けるための設計です。

## まとめ

[automerge-gate](https://github.com/pkgdeps/automerge-gate)は、GitHubのAuto Mergeとあわせて使う集約チェックのGitHub Actionです。

- Rulesetに登録する必須チェックは`automerge-gate/all-passed`の1つだけで済む
- Renovate/DependabotやmonorepoのパスフィルタによってPRごとにチェックが増減しても、自動的に集約される
- Private modeでは、マージ意図のないPRではポーリングをスキップするためrunner時間をほぼ消費しない
- フォークPRを受け取るOSSなどはPublic modeで対応できる

merge-gatekeeperと似たコンセプトですが、Auto Merge前提でコストを最適化している点が特徴です。
また、Public/Privateの2モードを明示的に分けて、`GITHUB_TOKEN`の権限差に対応している点もmerge-gatekeeperとは異なります。

## 参考

- [pkgdeps/automerge-gate](https://github.com/pkgdeps/automerge-gate)
- [upsidr/merge-gatekeeper](https://github.com/upsidr/merge-gatekeeper)
- [About protected branches - GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Automatically merging a pull request - GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)
