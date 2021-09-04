---
title: "複数のGitHubリポジトリにまとめてGitHub Sponsorsボタン(FUNDING.yml)を設定する方法"
author: azu
layout: post
date : 2019-10-27T12:55
category: JavaScript
tags:
    - JavaScript
    - GitHub

---

追記(2021-09-04): `username/.github`リポジトリを作ることで一括でSponsorボタンが設定できるようになっています。
また、現在はデフォルトで`FUNDING.yml`が認識されてSponsorボタンがでるため、"Sponsorship"の✔を入れる作業は不要となりました。
詳細は[user/.githubリポジトリを使い一括でFUNDING.ymlやCODE_OF_CONDUCT.mdなどを設定する | Web Scratch](https://efcl.info/2021/09/04/github-meta-repository/)を参照

---

GitHubリポジトリにはスポンサーボタンを表示する機能がありますが、これをまとめて設定するツールを書きました。

[![GitHub Sponsorship button](https://efcl.info/wp-content/uploads/2019/10/27-1572152741.png)](https://github.com/azu/github-funding-yml-updater)

GitHubリポジトリに、スポンサーボタンを表示するには次のような条件が必要です。(2019-10-27現在)

1. GitHubリポジトリのSettingsで"Sponsorship"の✔をいれて有効化する
2. リポジトリの`.github/FUNDING.yml`にGitHub SponsorsやPatreonなどのfunding platformsの情報を入れる

具体的な手順は次のドキュメントに書かれています。

- [リポジトリにスポンサーボタンを表示する - GitHub ヘルプ](https://help.github.com/ja/github/building-a-strong-community/displaying-a-sponsor-button-in-your-repository)
- [Displaying a sponsor button in your repository - GitHub Help](https://help.github.com/en/github/building-a-strong-community/displaying-a-sponsor-button-in-your-repository)

つまり、それぞれのリポジトリに`.github/FUNDING.yml`をコミットする必要があります。
これだと更新が面倒そうなので、一括で複数のリポジトリの`.github/FUNDING.yml`のGitHub Sponsorsを更新するツールを書きました。

**Note:** Organizationの場合は、ツールを使わなくても`.github`リポジトリを使うことで一括設定が可能なので、その方法は後述します。

## [github-funding-yml-updater](https://github.com/azu/github-funding-yml-updater)

[github-funding-yml-updater](https://github.com/azu/github-funding-yml-updater)は複数のリポジトリの`.github/FUNDING.yml`をGitHub API経由で更新するツールです。
GitHub APIでリポジトリを更新するので、それぞれのリポジトリを手元にcloneする必要はありません。

### 使い方

#### リポジトリの準備 

まず、更新するリポジトリの定義などの準備をします。

次のような形式で更新したいリポジトリを改行区切りにした`list.txt`などのテキストファイルを用意します。

```
owner/repo
owner/repo@branch
https://github.com/owner/repo
```

たとえば、`curl`と[jq](https://stedolan.github.io/jq/)を使って、GitHubの検索APIで自分のリポジトリ一覧を取得して`list.txt`を作れます。

```
export GH_USER="azu"
curl -s "https://api.github.com/search/repositories?q=user:${GH_USER}&&per_page=100" | jq ".items[].full_name" > list.txt

# ....
$ cat list.txt
"azu/promises-book"
"azu/awesome-commit-english"
"azu/NSDate-Escort"
"azu/large-scale-javascript"
"azu/JavaScript-Plugin-Architecture"
"azu/github-reader"
"azu/browser-javascript-resource"
"azu/multi-stage-sourcemap"
"azu/irodr"
"azu/parcel-typescript-example"
...
```

次に、GitHubのアクセストークンを用意します。
Scopeは`repo`があればいいので、次のURLから必要に応じてpersonal access tokenを作成してコピーしておきます。

- https://github.com/settings/tokens/new?description=github-funding-yml-updater&scopes=repo

#### リポジトリを更新する

[github-funding-yml-updater](https://github.com/azu/github-funding-yml-updater)はNode.jsで書かれたツールなので[npm](https://docs.npmjs.com/)でコマンドラインツールとしてインストールします。

```
npm install github-funding-yml-updater -g
```

慣れてる人は`npx`コマンドでも利用できます。(複数のコマンドが入ってるので`-p`指定が必要)

```
npx -p github-funding-yml-updater github-funding-yml-updater [options]
```

`github-funding-yml-updater`コマンドがインストールされるので、次のように実行できます。
先ほど用意した`list.txt`を`--list-file`に指定して、`.github/FUNDING.yml`のGitHub Sponsorに`azu`を追加する例です。

デフォルトは**DryRun**モードなので、実際にリポジトリは更新せずに、更新するかどうかだけを表示します。

```
## --writeがない場合はDryRunで実行する
$ github-funding-yml-updater --mode add --user azu --list-file list.txt --token あなたのGITHUB_TOKEN

Mode: DryRun mode
User: azu
azu/promises-book: No Update
azu/awesome-commit-english: Try to Update
azu/NSDate-Escort: Try to Update
azu/large-scale-javascript: Try to Update
azu/JavaScript-Plugin-Architecture: Try to Update
azu/github-reader: Try to Update
...
```

実際にリポジトリの`.github/FUNDING.yml`を更新したい場合は、`--write`フラグを追加します。

```
## --writeで実際に書き込む
$ github-funding-yml-updater --mode add --user azu --list-file list.txt --token あなたのGITHUB_TOKEN --write

Mode: Write mode
User: azu
azu/promises-book: No Update
azu/awesome-commit-english: Try to Update
azu/NSDate-Escort: Try to Update
azu/large-scale-javascript: Try to Update
azu/JavaScript-Plugin-Architecture: Try to Update
azu/github-reader: Try to Update
...
```

これで`list.txt`にあるリポジトリの`.github/FUNDING.yml`をまとめて更新できます。

その他の`--mode`としてユーザーを削除する`delete`や既存のFUNDING.ymlを指定して上書きする`overwrite`などがあります。
詳しいコマンドの使い方はREADMEや`--help`で見てください。

- [azu/github-funding-yml-updater: Update multiple repositories's `.github/FUNDING.yml` via GitHub API](https://github.com/azu/github-funding-yml-updater)

### GitHubリポジトリのSettingsで"Sponsorship"の✔をいれて有効化する

最初に書いたように`.github/FUNDING.yml`を置いただけだと、GitHubのスポンサーボタンは表示されません。

ユーザーの場合は、各リポジトリSettingsで"Sponsorship"の✔をいれて有効化する必要があります。

![Sponsorships](https://efcl.info/wp-content/uploads/2019/10/27-1572151086.png)

この"Sponsorship"の✔は現在APIがないため手動で更新が必要です。

- https://github.com/github/github-sponsors-beta/issues/24#issuecomment-546614928

[github-funding-yml-updater](https://github.com/azu/github-funding-yml-updater)には、この設定を補助するツールもはいっています。

`github-funding-yml-updater`をインストールすると`github-funding-yml-settings`という別のコマンドもインストールされています。
`github-funding-yml-settings`に`--list-file`を渡す設定するためのURLを出力してくれます。

```
npm install github-funding-yml-updater -g
github-funding-yml-settings --list-file list.txt

# リポジトリごとの設定URLを出力する
https://github.com/azu/example1/settings#repository-funding-links-feature
https://github.com/azu/example2/settings#repository-funding-links-feature
```

あとはこの設定ページから1コづつ"Sponsorship"の✔をいれていくだけです。

## Organizationの一括設定

GitHub Organizationの場合は`.github`という名前のリポジトリを使うことで、Organization全体に一括設定が可能です。

- [Creating a default community health file for your organization - GitHub Help](https://help.github.com/en/github/building-a-strong-community/creating-a-default-community-health-file-for-your-organization)

たとえば、[efcl/.github](https://github.com/efcl/.github)というリポジトリに`FUNDING.yml`などをのGitHubメタファイルを配置すると、
そのOrganizationにあるリポジトリに反映されます。

- https://github.com/efcl/.github
    - GitHubメタファイル置き場
- https://github.com/efcl/efcl.github.io
    - FUNDING.ymlを置いてなくてもスポンサーボタンがでている

注意点として、`.github`リポジトリのSettingsで"Sponsorship"の✔を入れないとスポンサーボタンは有効化されません。

この機能は[Creating a default community health file for your organization - GitHub Help](https://help.github.com/en/github/building-a-strong-community/creating-a-default-community-health-file-for-your-organization)にも書かれているように`CONTRIBUTING.md`、`CODE_OF_CONDUCT.md`、`SECURITY.md`などのファイルも配置できます。

## その他: github:buttons

[github:buttons](https://buttons.github.io/)はGitHub Sponsorのボタンに対応しています。

次のような感じで、ウェブサイトにGitHubと似たようなスポンサーボタンを配置できます。

<a class="github-button" href="https://github.com/sponsors/azu" data-icon="octicon-heart" data-size="large" aria-label="Sponsor @azu on GitHub">Sponsor</a>
<script async defer src="https://buttons.github.io/buttons.js"></script>

## おわりに

[github-funding-yml-updater](https://github.com/azu/github-funding-yml-updater)を使ったリポジトリの`.github/FUNDING.yml`の一括アップデートについて書きました。

Organizationについては、`.github`リポジトリを使うことで一括で設定できます。

- [Creating a default community health file for your organization - GitHub Help](https://help.github.com/en/github/building-a-strong-community/creating-a-default-community-health-file-for-your-organization)

ユーザー単位のリポジトリについては現状では一括設定する`.github`リポジトリはありません。
ユーザースコープのメタリポジトリについては、次のIssueで話し合われています。

- https://github.com/github/github-sponsors-beta/issues/24
