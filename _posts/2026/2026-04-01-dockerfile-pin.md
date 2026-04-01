---
title: "dockerfile-pin: DockerfileやComposeのイメージをSHA256でピン留めするCLIツールを作った"
author: azu
layout: post
date: 2026-04-01T20:00+09:00
category: Security
tags:
    - Docker
    - Security
    - CLI

---

DockerfileやComposeファイルのイメージ参照に`@sha256:<digest>`を自動で追加するCLIツール [dockerfile-pin](https://github.com/azu/dockerfile-pin) を作りました。

- GitHub: [azu/dockerfile-pin](https://github.com/azu/dockerfile-pin)

## なぜ作ったか

[trivyへのサプライチェーン攻撃](https://www.aquasec.com/blog/trivy-supply-chain-attack-what-you-need-to-know/)などの事件を見ていると、次に狙われるのはDocker Hubかなと思ったのがきっかけです。
CIでDocker Hubへのpushをしているケースは多いので、そこに悪意あるコードが混入する事件は今後も起きるだろうと思っています。

Dockerイメージのタグ（例：`node:20`）はデフォルトで可変（mutable）です。同じタグ名で中身を上書きできるため、悪意ある第三者がレジストリへのアクセスを得た場合、既存タグに対して改竄されたイメージをpushできます。

- [Can a Docker Hub tag have its content changed? - Docker Community Forums](https://forums.docker.com/t/can-a-docker-hub-tag-have-its-content-changed/139358)

Docker Hubなどのレジストリは安全とは限りません。
npmのように[トークンの制限が厳しくなっていたり](https://github.blog/changelog/2025-11-05-npm-security-update-classic-token-creation-disabled-and-granular-token-changes/)、デフォルトでタグがimmutableな場所であっても、[axiosのように問題が起きる](https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan)ことはあります。
Docker Hubには[Immutable tags](https://docs.docker.com/docker-hub/repos/manage/hub-images/immutable-tags/)という機能がありますが、これはリポジトリオーナー側が設定するもので、イメージを利用する側がコントロールできるものではありません。

[`@sha256:<digest>`](https://docs.docker.com/reference/cli/docker/image/pull/#pull-an-image-by-digest-immutable-identifier)を付与することで、イメージの不変性を保証できます。digestはイメージのコンテンツハッシュなので、内容が異なればdigestも変わり、改竄を検知できます。npmのlockfileがパッケージのintegrityをハッシュで固定するのと同じ考え方です。

```dockerfile
# Before: タグのみ（可変）
FROM node:20.11.1

# After: タグ + digest（不変）
FROM node:20.11.1@sha256:e06aae17c40c7a6b5296ca6f942a02e6737ae61bbbf3e2158624bb0f887991b5
```

タグとdigestを両方残す形式にしておくと便利です。タグは人間が読むため、digestは不変性の保証のために残します。[Renovate](https://docs.renovatebot.com/docker/)はこの形式でタグとdigestの両方を更新できます。Dependabotもdigestが既に付いている場合は[タグとdigestを同時に更新](https://github.com/dependabot/dependabot-core/issues/14065)できます。

Dockerfileでは明示的にSHA256 digestを指定しないとハッシュ固定ができません。これはGitHub Actionsの`uses:`をコミットSHAでpin留めしていないのと同じ状態で、サプライチェーン攻撃のリスクがあります。

GitHub Actionsについては[pinact](https://github.com/suzuki-shunsuke/pinact)で自動化できますが、DockerfileのFROM行については同様のシンプルなツールがありませんでした。

### 既存ツールが不十分だった

DockerfileのSHA pinを補助する既存ツールとして[dockpin](https://github.com/Jille/dockpin)や[docker-lock](https://github.com/michaelperel/docker-lock)があります。しかし、dockpinは2023年以降メンテナンスが停滞しており、docker-lockはREADMEに「動作を期待すべきでない」と記載されています。

また、[hadolint](https://github.com/hadolint/hadolint)にはdigest pin強制ルールがなく（[hadolint#773](https://github.com/hadolint/hadolint/issues/773)、2022年2月〜OPEN）、プラグイン機構もありません（[hadolint#1001](https://github.com/hadolint/hadolint/issues/1001)）。CIでdigestのpin漏れをチェックできるシンプルなlintツールが見当たりませんでした。

そのため、[pinact](https://github.com/suzuki-shunsuke/pinact)のDockerfile版をイメージして、[craneライブラリ](https://github.com/google/go-containerregistry)（Googleが管理、メンテナンスが活発）をベースに`dockerfile-pin`として自作しました。

## 使い方

### インストール

```bash
# Homebrew/curl
curl -sL "https://github.com/azu/dockerfile-pin/releases/latest/download/dockerfile-pin_darwin_arm64.tar.gz" | tar xz
sudo mv dockerfile-pin /usr/local/bin/

# aqua
aqua generate -i azu/dockerfile-pin

# Go
go install github.com/azu/dockerfile-pin@latest
```

### `run` コマンド: digestの追加

`run`コマンドで、DockerfileやComposeファイルのイメージ参照にSHA256 digestを追加します。

```bash
# ドライラン（プレビュー）
dockerfile-pin run -f Dockerfile

# 実際にファイルを書き換える
dockerfile-pin run -f Dockerfile --write

# globパターンで複数ファイルを対象にする
dockerfile-pin run --glob '**/{Dockerfile,docker-compose.yml}' --write
```

たとえば、次のようにタグのみの指定にdigestが追加されます。

**変換前:**

```dockerfile
FROM node:20.11.1
FROM python:3.12 AS builder
```

**変換後:**

```dockerfile
FROM node:20.11.1@sha256:e06aae17c40c7a6b5296ca6f942a02e6737ae61bbbf3e2158624bb0f887991b5
FROM python:3.12@sha256:... AS builder
```

すでにdigestが付いているイメージはスキップされます。`--update`オプションをつけると既存のdigestも更新します。

### `check` コマンド: CIでのdigest検証

CIで使うことを想定した`check`コマンドもあります。チェックは2段階です。

1. **構文チェック**: FROM行に`@sha256:`が含まれているか
2. **存在チェック**: 記載されたdigestがレジストリに実際に存在するか（HEADリクエストで検証）

存在チェックがあることで、typoや削除済みdigestが`docker build`時まで発覚しないという問題を防げます。
HEADリクエストを使っているため、Docker Hubのpull rate limitを消費しません。

```bash
# すべてのDockerfileをチェック（git ls-filesから自動検出）
dockerfile-pin check

# 構文チェックのみ（レジストリへのアクセスなし）
dockerfile-pin check --syntax-only

# JSON形式で出力
dockerfile-pin check --format json

# 特定のイメージを無視
dockerfile-pin check --ignore-images scratch
```

出力例は次のとおりです。

```
FAIL  Dockerfile:1    FROM node:20.11.1                missing digest
OK    Dockerfile:3    FROM python:3.12@sha256:abc123...
SKIP  Dockerfile:5    FROM scratch                     scratch image
```

### 対応しているパターン

**Dockerfile:**

- `FROM image:tag` — digestを追加
- `FROM image:tag AS stagename` — `AS`付きも対応
- `FROM --platform=linux/amd64 image:tag` — `--platform`付きも対応
- `ARG VERSION=1.0` + `FROM image:${VERSION}` — ARGにデフォルト値がある場合は展開して解決
- `ARG BASE_IMAGE` + `FROM ${BASE_IMAGE}` — デフォルト値がない場合はwarningでスキップ
- `FROM scratch` — スキップ
- `FROM <stagename>` — マルチステージビルドの参照はスキップ
- プライベートレジストリ（ghcr.io, GCR, ECRなど）にも対応

**docker-compose.yml:**

- `image: node:20` — digestを追加
- `build:`ディレクティブがあるサービス — スキップ

### CI/CDでの利用

GitHub Actionsでの利用例です。curlでインストールする方法と、[aqua](https://aquaproj.github.io/)を使う方法があります。aquaを使うと、dockerfile-pin自体のチェックサムを検証してインストールできます。

なお、dockerfile-pinのリリースでは[GitHub Releases Immutability](https://github.blog/changelog/2025-08-26-releases-now-support-immutability-in-public-preview/)を有効にしています。

curlでインストールする場合:

```yaml
- run: |
    curl -sL "https://github.com/azu/dockerfile-pin/releases/latest/download/dockerfile-pin_linux_amd64.tar.gz" | tar xz
    sudo mv dockerfile-pin /usr/local/bin/
- run: dockerfile-pin check
```

aquaでインストールする場合:

```yaml
- uses: aquaproj/aqua-installer@v3
  with:
    aqua_version: v2.45.0
- run: dockerfile-pin check
```

CIで`dockerfile-pin check`を実行することで、digestが付いていないイメージをプルリクエスト時に検出できます。

### Renovateとの併用

初回のdigest付与は`dockerfile-pin run --write`で行い、その後の継続的な更新は[Renovate](https://docs.renovatebot.com/)に委譲します。

Renovateの`docker:pinDigests`プリセットを有効にすると、`image:tag@sha256:digest`形式のdigestを自動更新するPRを生成してくれます。

```json
{
  "extends": ["config:best-practices"]
}
```

`config:best-practices`に`docker:pinDigests`が含まれています。digest更新のみ自動マージしたい場合は`default:automergeDigest`も利用できます。

運用の流れとしては次のようになります。

1. `dockerfile-pin run --write`で既存ファイルにdigestを一括付与
2. CIに`dockerfile-pin check`を組み込み、digest未指定のFROM行がマージされないようにする
3. Renovateの`docker:pinDigests`で継続的にdigestを最新に保つ

## まとめ

Dockerイメージのタグはデフォルトでmutableなので、タグだけの指定ではサプライチェーン攻撃のリスクがあります。
npmのlockfileやGitHub ActionsのSHA pinと同様に、Dockerfileでも`@sha256:<digest>`でイメージを固定した方が良いでしょう。

既存ツール（dockpin、docker-lock）はメンテナンスが停滞しており、hadolintにもdigest pinのルールがありません。そのため、シンプルにpin付与とCIチェックを行う[dockerfile-pin](https://github.com/azu/dockerfile-pin)を作りました。

- `dockerfile-pin run --write` で既存ファイルにdigestを一括追加
- `dockerfile-pin check` でCIでdigestの付け忘れを検出
- Renovateと組み合わせて継続的にdigestを最新に保つ

## 参考

- [azu/dockerfile-pin](https://github.com/azu/dockerfile-pin)
- [suzuki-shunsuke/pinact](https://github.com/suzuki-shunsuke/pinact)
- [google/go-containerregistry](https://github.com/google/go-containerregistry)
