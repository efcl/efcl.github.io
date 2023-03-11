---
title: "GitHubのリリースノートを自動化する仕組み"
author: azu
layout: post
date: 2023-03-11T14:05
category: GitHub
tags:
  - GitHub
  - npm
---

GitHub の[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)を使ってリリースノートの内容を PR に基づいて自動生成するフローを作りました。

今までは、コミットメッセージのルールである[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)と[conventional-github-releaser](https://github.com/conventional-changelog/releaser-tools/tree/master/packages/conventional-github-releaser)を使って、コミットからリリースノートを自動生成していました。
他の人の PR でも、squah merge でコミットメッセージを書き換えることで、リリースノートに反映されるようにしていました。

ただ GitHub に仕組みは違うけどほぼ似たことをする[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)という機能が実装されているので、これをベースに移行しようと思って、そのワークフローを作っていました。

- [リリースノート自動生成テクニック - mizdra's blog](https://www.mizdra.net/entry/2022/07/08/181825)
- [リリースノート管理術](https://r7kamura.com/articles/2022-07-18-release-notes-management)
- [GitHub Actions でいい感じのリリースノートを完全自動で作成する](https://zenn.dev/kshida/articles/auto-generate-release-note-with-calver)

## 目的

目的としては、次を目標にしていました。

- Convential commit でやっているものを[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)ベースに移行する

自分は[大量のリポジトリ](https://efcl.info/surl/github-activity)を持っているので、段階的に移行できるようにしました。
Convential commitと[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)は同時に使っても競合はしないので、実際には[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)でコミットしながら、リリースするときに Convential commit か[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)どちらを使うかを選択できるようにしています。
(たまに、PR を経由せずにコミットしちゃうことがあるので、それをリリースするときは[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)ベースに切り替える)

また、今回は CI からの自動リリースへと切り替えるのは、目的にしませんでした。
npm パッケージなどを CI からリリースするにはまだトークン管理が必要になってしまうので、npm <-> GitHub 間の OICD が実装されてから考えることにしました。

- [RFC for linking packages to their source and build by feelepxyz · Pull Request #626 · npm/rfcs](https://github.com/npm/rfcs/pull/626)
- [Automated publishing of npm packages from CI/CD · Issue #625 · npm/statusboard](https://github.com/npm/statusboard/issues/625)

ただし、[textlint](https://github.com/textlint/textlint)や[Secretlint](https://github.com/secretlint/secretlint)などの大きな monorepo では、今回作ったワークフローを CI から実行するフローにしています。これは、monorepo だとローカルからリリースするよりも、CI からリリースした方が楽だったりすることが多いためです(単純に時間がかかったり、クリーンな環境でリリースしたいため)。

## GitHubの[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)

GitHubには[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)と言う、Pull Requestから自動的にリリースノートを生成する機能があります。

この機能は、次のような手順で利用できます。

0. リポジトリに `.github/release.yml` というラベルをカテゴライズする設定ファイルを追加する
1. PR にラベルを貼る
2. GitHub Releaseで"Generate release notes"を実行 or `gh release create --generate-notes` コマンドを実行する
3. リリースノードにPRのラベルに基づいたカテゴライズされたリリースノートが生成される

実際に生成されるリリースノートは、次のような感じです。

- [Release v13.3.1 · textlint/textlint](https://github.com/textlint/textlint/releases/tag/v13.3.1)
- [Release v4.2.0 · textlint-rule/sentence-splitter](https://github.com/textlint-rule/sentence-splitter/releases/tag/v4.2.0)
- [Release v2.0.0 · textlint-ja/textlint-rule-no-hankaku-kana](https://github.com/textlint-ja/textlint-rule-no-hankaku-kana/releases/tag/v2.0.0)

基本的に事前に準備するのは`.github/release.yml`というファイルだけです。

## `.github/release.yml`の設定

元から`github-label-setup`というラベルをいい感じにセットアップするツールを作って使っていました。

- [azu/github-label-setup: 📦 Setup GitHub label without configuration.](https://github.com/azu/github-label-setup)
- [GitHubのラベルをいい感じにセットアップするツール | Web Scratch](https://efcl.info/2017/05/17/github-label/)

[github-label-setup v5.0.0](https://github.com/azu/github-label-setup/releases/tag/v5.0.0)で`.github/release.yml`の設定ファイルの生成もサポートしました。

そのため、次のコマンドでリポジトリにラベルのプリセットを追加して、そのラベルに対応した`.github/release.yml`を生成できます。

```bash
npx @azu/github-label-setup --token "${AZU_GITHUB_TOKEN}" --allow-added-labels
npx @azu/github-label-setup --addReleaseYml
```

あとは、このラベルをPull Reuqestにつけていくだけで、リリースノートの自動生成機能が利用できます。

📝 自分の場合は、このリポジトリのセットアップは次のようなスクリプトで行っています。
ラベルのセットアップ、`.github/release.yml`の生成、リポジトリのauto-merge/auto-branch-delete/discussionsの有効化を行っています。

```bash
local GITHUB_TOKEN="GITHUB TOKEN" # $(op read "op://Private/GITHUB_TOKEN/token")
npx @azu/github-label-setup --token "${AZU_GITHUB_TOKEN}" --allow-added-labels
echo "✓ Add .github/release.yml"
npx @azu/github-label-setup --addReleaseYml
if git ls-files --others --exclude-standard | grep --color=auto ".github/release.yml" -q
then
  git add .github/release.yml
  git commit -m "CI: add .github/release.yml"
fi
echo "✓ Enable auto-branch-delete/auto-merge/discussions"
gh repo edit --delete-branch-on-merge --enable-auto-merge --enable-discussions
```

`gh repo edit --enable-discussions`はなかったので実装して[v2.22.0](https://github.com/cli/cli/releases/tag/v2.22.0)で追加されています。

## ラベルのカテゴライズ

`.github/release.yml`の設定ファイルは、次のような感じです。
`Type: *` のラベルを基本的にPRの変更内容に合わせてつけていくことで、リリースノートのカテゴライズができます。

```yaml
changelog:
  exclude:
    labels:
      - 'Type: Meta'
      - 'Type: Question'
      - 'Type: Release'

  categories:
    - title: Security Fixes
      labels: ['Type: Security']
    - title: Breaking Changes
      labels: ['Type: Breaking Change']
    - title: Features
      labels: ['Type: Feature']
    - title: Bug Fixes
      labels: ['Type: Bug']
    - title: Documentation
      labels: ['Type: Documentation']
    - title: Refactoring
      labels: ['Type: Refactoring']
    - title: Testing
      labels: ['Type: Testing']
    - title: Maintenance
      labels: ['Type: Maintenance']
    - title: CI
      labels: ['Type: CI']
    - title: Dependency Updates
      labels: ['Type: Dependencies', "dependencies"]
    - title: Other Changes
      labels: ['*']
```

例:

- 機能追加: `Type: Feature`
- バグ修正: `Type: Bug`
- ドキュメントの変更: `Type: Documentation`
- リファクタリング: `Type: Refactoring`

## リポジトリの種類

基本的には、GitHubリリースノートの機能なのでリポジトリの種類は関係ないのです。
しかし、リリースと同時にnpmパッケージも公開するため、扱うパッケージによって微妙にリリースフローが変わってきます。

自分が扱うリポジトリは大きく分けて、2 種類のリポジトリがあります。
ここでは、どちらもnpmパッケージを公開するリポジトリとして扱います。

- 単体のパッケージを扱うリポジトリ
- monorepoなパッケージを扱うリポジトリ

どちらも同じ流れで、[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)ベースでリリースできるように移行しています。

## 単体のパッケージを扱うリポジトリ

単体のパッケージを扱うリポジトリは、次のような形でnpmへのpublishと同時にリリースノートを公開できます。

```bash
# patchアップデート
$ npm version patch && npm publish && gh release create --generate-notes "$(git describe --tags --abbrev=0)"
# minorアップデート
$ npm version minor && npm publish && gh release create --generate-notes "$(git describe --tags --abbrev=0)"
# majorアップデート
$ npm version major && npm publish && gh release create --generate-notes "$(git describe --tags --abbrev=0)"
```

[npm-version](https://docs.npmjs.com/cli/v9/commands/npm-version)コマンドを使うと、`package.json`のバージョン更新とGit Tagの作成が同時に行われます。
バージョンを更新したら、`npm publish`でnpmへの公開を行い、`gh release create --generate-notes`でGitHubリリースを行います。
[gh release create](https://cli.github.com/manual/gh_release_create)にはタグ名が必要なので、`git describe --tags --abbrev=0`でタグ名を取得しています。

## monorepoなパッケージを扱うリポジトリ

monorepoのパッケージも基本的な流れは同じです。
パッケージの公開に[Lerna](https://github.com/lerna/lerna)を使ってる例を紹介します。

```bash
$ npx lerna version && npx lerna publish from-package && gh release create --generate-notes "$(git describe --tags --abbrev=0)"
```

`lerna version`で対話的にバージョンが指定できます。
バージョンを決めたら、`lerna publish from-package`でnpmへの公開を行い、`gh release create --generate-notes`でGitHubリリースを行います。

## CIから公開するmonorepoなパッケージを扱うリポジトリ

先ほどの例はどちらも、ローカルからコマンドを叩いて公開する方法として、

CIから公開する場合には、どのバージョン(patch, minor, major)にアップデートするかをどう選ぶかが難しい問題になります。
[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)の場合は、コミットによって決まりますが、[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)ではその仕組みはありません。

そのため、リリース時に選ぶ形 or ラベルによって決めるかという選択肢があります。
今回は、リリース時にバージョンを選ぶ形で実装しています。

次のリポジトリに、CIから[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)を使ってパッケージの公開とリリースノートを作る実装があります。

- [azu/monorepo-github-releases: monorepo release flow: lerna + GitHub Release's Automatically generated release notes](https://github.com/azu/monorepo-github-releases)

リポジトリのREADMEにも書いてあるように、次のようなフローでリリースできるようになっています。

ステップ:

1. PRを作成するための[create-release-pr.yml](https://github.com/azu/monorepo-github-releases/actions/workflows/create-release-pr.yml)ワークフローをディスパッチする
    - バージョンを選択できる
    - ![Create Release Pull Request Image](https://raw.githubusercontent.com/azu/monorepo-github-releases/main/create-release-pr.png)
2. [CI] PRを作成する
    - `lerna.json`の`version`と`packages/*/package.json`の`version`が更新される
    - PRの本文に[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)が自動的に入る(APIを叩いて取得してる)
3. PRをレビューする
    - PRの本文を修正できて、その内容がリリースノートに反映される
4. PRをマージする
5. [CI] npmとGitHub Releaseに公開する
    - リリースノートの内容はPRの本文と同じになる
    - CIでPRの本文を取得して、リリースノートに反映する

5のpublishはnpm registryやパッケージのビルド時に失敗することがあります。
その場合は、[.github/workflows/release.yml](https://github.com/azu/monorepo-github-releases/actions/workflows/release.yml)ワークフローをDispatchすることで、5だけを再実行できます。
また、緊急時にはローカルからも次のコマンドで公開できます(これもリリースノートは自動生成されます)。

```
$ npm run versionup && npm run release && gh release create --generate-notes "$(git describe --tags --abbrev=0)"
```

実装は、先ほどのステップからもわかるように2つのワークフローになっています。

- バージョンを選んでリリース用のPRを作成するワークフロー: https://github.com/azu/monorepo-github-releases/blob/main/.github/workflows/create-release-pr.yml
- npm publishとGitHubリリースをするワークフロー: https://github.com/azu/monorepo-github-releases/blob/main/.github/workflows/release.yml

この実装を使ってる例としては、次のリポジトリがあります。

- [textlint](https://github.com/textlint/textlint)
- [Secretlint](https://github.com/secretlint/secretlint)

サンプルリポジトリはlernaを使ったmonorepoなパッケージですが、単独のパッケージでも`lerna.json` -> `package.json`への変更と`ci:release`のスクリプトの中身を変えるだけで対応できます

- 単体のパッケージをCIから公開してる例: [pkgdeps/update-github-actions-permissions: A CLI that update GitHub Actions's `permissions` automatically](https://github.com/pkgdeps/update-github-actions-permissions)

リリースする際に一度PRを経由することで、PRを送った人にどのバージョンに含まれるかを明示できます(PRに書かれたリリースノートの内容にmentionが入ってるため通知される)。

面倒な人用に、既存のリポジトリにこのCIからのリリースフローを導入するためのマイグレーションスクリプトを用意しています。

```bash
curl -fsSL https://raw.githubusercontent.com/azu/monorepo-github-releases/main/migrate.sh | bash
```

このマイグレーションスクリプトは、次のような処理をやってくれます。

- ワークフローの追加
- `npm run ci:*` スクリプトの追加(CIからpublishするときのコマンドを定義している)
- monorepoと単独のパッケージに対応
- npmとyarnに対応

## 実際に利用してるローカルからpublishするスクリプト

ここまでで、基本的な[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)ベースのリリースフローを紹介しました。

しかし、実際にはもっと色々なことをローカルでは実装しています。
最後に、実際に使ってるスクリプトを紹介します。

```bash
# conventional-github-releaserを使ってリリース
function releaseConventialGitHub(){
    local GITHUB_TOKEN=$(op read "op://Private/GITHUB_TOKEN/Section_xxx/token")
    CONVENTIONAL_GITHUB_RELEASER_TOKEN="${GITHUB_TOKEN}" conventional-github-releaser -p angular
}
# .github/release.ymlがあるかで分岐
function releaseGitHub(){
  # if FORCE_CONVENTIONAL is defined
  if [[ -n "${FORCE_CONVENTIONAL}" ]]; then
    echo "🤖 Use conventional-github-releaser"
    releaseConventialGitHub
    return 0
  fi
  # .github/release.ymlがあるかで分岐
  declare hasGitHubReleaseYaml
  hasGitHubReleaseYaml=$(([[ -f .github/release.yml ]] || [[ -f .github/release.yaml ]]) && echo "true" || echo "false")
  if [[ "${hasGitHubReleaseYaml}" == "true" ]]; then
    echo "🤖 Use gh release"
    gh release create --generate-notes "$(git describe --tags --abbrev=0)" --discussion-category "announcements"
  else
    echo "🤖 Use conventional-github-releaser"
    releaseConventialGitHub
  fi
}
# npm
function _confirm-npm(){
  # .github/release.ymlがあるかで分岐
  declare hasGitHubReleaseYaml
  hasGitHubReleaseYaml=$(([[ -f .github/release.yml ]] || [[ -f .github/release.yaml ]]) && echo "true" || echo "false")
  if [[ "${hasGitHubReleaseYaml}" == "true" ]]; then
    echo "🔎 前回のリリース以降にマージされて、ラベルがついてないPRを検索中…"
    echo "" # 空改行
    searchQuery="no:label merged:>$(gh release view --json createdAt --jq .createdAt)"
    noLabelPRs=$(gh pr list -s merged -S "${searchQuery}")
    if [[ -z "${noLabelPRs}" ]]; then
      echo "🎉 ラベルがついてないPRはありません"
      echo ""
    else
      echo "🚨 ラベルがついてないPRがあります"
      echo "🚨 ラベルをつけてください"
      gh pr list -s merged -S "${searchQuery}" -w
      echo "" # 空改行
      return 1
    fi
  else
    echo "🤖 Use conventional-github-releaser"
  fi
  # Enterを連打してても無視されるようにする
  while true; do
    echo -n "🤔 npm publish to \033[036m$1\033[0m(y/N/c)?"
    read yn
    case $yn in
        [Yy]* ) return 0;;
        [Nn]* ) return 1;;
        # c を入力すると conventional-github-releaser を使う
        [Cc]* ) export FORCE_CONVENTIONAL=1; echo "🤖 Use conventional-github-releaser"; return 0;;
         * ) echo " Please answer Y or N or C";;
    esac
  done
}

# Worflow
# 1. Check
# 2. Tagを貼る
# 3. Publishする
# 3. Release Noteを作成

# npmに公開しないリポジトリ用
alias release-node-patch='_confirm-npm "Public" && pre-version-no-npm && npm version patch && post-version && releaseGitHub'
alias release-node-minor='_confirm-npm "Public" && pre-version-no-npm && npm version minor && post-version && releaseGitHub'
alias release-node-major='_confirm-npm "Public" && pre-version-no-npm && npm version major && post-version && releaseGitHub'
# npmをpublicで公開する
alias npm-patch='_confirm-npm "Public" && pre-version && npm version patch && post-version && npm publish --access=public --otp=$(npm-get-otp) && releaseGitHub'
alias npm-minor='_confirm-npm "Public" && pre-version && npm version minor && post-version && npm publish --access=public --otp=$(npm-get-otp) && releaseGitHub'
alias npm-major='_confirm-npm "Public" && pre-version && npm version major && post-version && npm publish --access=public --otp=$(npm-get-otp) && releaseGitHub'
# npmをprivateで公開する - https://github.com/azu/scoped-modules-checker
alias private-npm-patch='_confirm-npm "Private" && scoped-modules-checker && pre-version && npm version patch && post-version && npm publish --access=restricted --otp=$(npm-get-otp) && releaseGitHub'
alias private-npm-minor='_confirm-npm "Private" && scoped-modules-checker && pre-version && npm version minor && post-version && npm publish --access=restricted --otp=$(npm-get-otp) && releaseGitHub'
alias private-npm-major='_confirm-npm "Private" && scoped-modules-checker && pre-version && npm version major && post-version && npm publish --access=restricted --otp=$(npm-get-otp) && releaseGitHub'
# npmをbetaで公開する
alias npm-beta-release='_confirm-npm "Public" && pre-version && npm version prerelease --preid=beta && post-version && npm publish --tag beta --access=public --otp=$(npm-get-otp) && releaseGitHub'
alias npm-beta-patch='_confirm-npm "Public" && pre-version && npm version prepatch --preid=beta && post-version && npm publish --tag beta --access=public --otp=$(npm-get-otp) && releaseGitHub'
alias npm-beta-minor='_confirm-npm "Public" && pre-version && npm version preminor --preid=beta && post-version && npm publish --tag beta --access=public --otp=$(npm-get-otp) && releaseGitHub'
alias npm-beta-major='_confirm-npm "Public" && pre-version && npm version premajor --preid=beta && post-version && npm publish --tag beta --access=public --otp=$(npm-get-otp) && releaseGitHub'
# monorepo用のコマンド
# require "versionup" && "release" command
alias npm-monorepo-release='_confirm-npm "Public" && opr npm run versionup && npm run release -- --yes --otp=$(npm-get-otp) && gh release create --generate-notes "$(git describe --tags --abbrev=0)" --discussion-category "announcements"'

# publish前に色々チェックする処理 - 自由に追加できる
alias pre-version='git diff --exit-code && npm run --if-present build && git diff --exit-code && npm test && git diff --exit-code'
alias post-version='git push && git push --tags'
alias pre-version-no-npm='git diff --exit-code && npm prune && npm install -q --no-shrinkwrap && npm test && git diff --exit-code'

# 1password経由でTOTPを取得
alias npm-get-otp='op item get --otp XXXX'
```

めちゃくちゃ色々定義していますが、`npm-{patch,minor,major}` が単独のリポジトリからパッケージを公開するときのコマンドです。

やっていることは、次のようなことをやっています

0. Publicに公開するかの確認
1. ラベルがついてないPRの確認 -> ある場合はラベルがないPRの一覧が開かれる
2. [Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes) or [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)のどっちでリリースするか選択
3. git diffがないか、ビルドやテストが通るかのチェック
4. バージョンアップとリリース
5. リリースノートの作成(Discussionにも投稿)

monorepo用の`npm-monorepo-release`やprivate package用の`private-npm-{patch,minor,major}`もやっていることは大体同じです。

細かい処理を自分で書きたかったので書いていますが、大体の人は次のコマンドとかでも問題ないかもしれません。
(これらのツールが出る前から、このコマンドを使っていて、中身を適宜書き換えている)

- [sindresorhus/np: A better `npm publish`](https://github.com/sindresorhus/np)
- [release-it/release-it: 🚀 Automate versioning and package publishing](https://github.com/release-it/release-it)

## まとめ

GitHubの[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)ベースのリリースフローについて紹介しました。

最初に書いていたように既存のリポジトリを全て移行する予定はないので、必要になったらその都度 **`.github/release.yml`の設定**で書いていたスクリプトで利用できるようにしています。
実際に使ってるスクリプトで実装していましたが[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)と[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)は共存できます。
そのため、実際にはリポジトリごとにどちらの方法を使うかを選択しています。

[Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)ベースはPRを経由しないとリリースノートに入らないという問題があるので、mainブランチにpushしまくっているようなリポジトリだと[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)の方が適切だったりします。

将来、npmのOICD連携などがきたらまた変わる気がします。
そのため変更に対応しやすように、基本的にはコマンドを`&&`で繋いで実装できるようなものを書いて使っています。