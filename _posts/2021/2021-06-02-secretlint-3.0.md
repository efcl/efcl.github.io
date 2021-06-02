---
title: "secretlint 3.0リリース、GitHubの新しいトークンの検出に対応"
author: azu
layout: post
date : 2021-06-02T09:21
category: JavaScript
tags:
    - secretlint

---

コミットないようにトークンやSSHの秘密鍵など機密情報が入ってないかをチェックできる[Secretlint](https://github.com/secretlint/secretlint) 3.0をリリースしました。

- [Release v3.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v3.0.0)
- [secretlint v3.0 support GitHub’s new authentication token detection - DEV Community 👩‍💻👨‍💻](https://dev.to/azu/secretlint-v3-0-support-github-token-detection-57eg)

secretlint 3.0では、GitHubの新しくなったトークン形式の検出に対応する[@secretlint/secretlint-rule-github](https://github.com/secretlint/secretlint/tree/master/packages/@secretlint/secretlint-rule-github)のルールが追加されました。

- [Behind GitHub's new authentication token formats | The GitHub Blog](https://github.blog/2021-04-05-behind-githubs-new-authentication-token-formats/)
- [Authentication token format updates are generally available | GitHub Changelog](https://github.blog/changelog/2021-03-31-authentication-token-format-updates-are-generally-available/)

secretlintでは[@secretlint/secretlint-rule-preset-recommend](https://github.com/secretlint/secretlint/tree/master/packages/@secretlint/secretlint-rule-preset-recommend)という、ESLintのような推奨ルールプリセットも提供しています。
そのため、プリセットを使っている人や[Docker版](https://github.com/secretlint/secretlint/tree/master/publish/docker)を使ってる人は自動的にGitHubトークンも対応できます。

とりあえず、今あるディレクトリにsecretlintの推奨プリセットで検出できる機密情報がないかは次のコマンドを実行するだけでもチェックできます。

Dockerが入ってる人は`docekr run`を使えます。

    docker run -v `pwd`:`pwd` -w `pwd` --rm -it secretlint/secretlint secretlint "**/*"

Node.jsが入ってる人は、`@secretlint/quick-start`が簡易版のチェッカーとして使えます。

    npx @secretlint/quick-start "**/*"

secretlintは[ESLint](https://eslint.org/)や[textlint](https://textlint.github.io/)のようにJavaScriptでルールを書いて拡張できるようになっています。
この辺をもっとしりたい人は、[Configuration](https://github.com/secretlint/secretlint#configuration)を読んでください。

## GitHub Tokenの対応

2021年4月ごとから新しく発行されたGitHub Tokenは次のようなルールで、トークン自体にprefixが作るのでトークンをみてGitHub Tokenか分かるようになっています。

> The character set changed from [a-f0-9] to [A-Za-z0-9_]
> The format now includes a prefix for each token type:
> ghp_ for Personal Access Tokens
> gho_ for OAuth Access tokens
> ghu_ for GitHub App user-to-server tokens
> ghs_ for GitHub App server-to-server tokens
> ghr_ for GitHub App refresh tokens

- [Authentication token format updates are generally available | GitHub Changelog](https://github.blog/changelog/2021-03-31-authentication-token-format-updates-are-generally-available/)
- [Behind GitHub's new authentication token formats | The GitHub Blog](https://github.blog/2021-04-05-behind-githubs-new-authentication-token-formats/)

同じような仕組みはSlack([@secretlint/secretlint-rule-slack](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-slack))やSendGrid([@secretlint/secretlint-rule-sendgrid](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-sendgrid))などのトークンでも実装されています。

トークン自体にprefixがついていれば、トークンを実際にサーバに投げなくてもある程度判定できるので余計な負荷が減ります。

- [streaak/keyhacks: Keyhacks is a repository which shows quick ways in which API keys leaked by a bug bounty program can be checked to see if they're valid.](https://github.com/streaak/keyhacks)

エントロピーの問題は、GitHubでは`[a-f0-9]`から`[A-Za-z0-9_]`に増やすことと、トークンの長さを最大255文字まで増やすことで保証するようです。
また、GitHub TokenはCRC32の[Checksum](https://github.blog/2021-04-05-behind-githubs-new-authentication-token-formats/#checksum)を実装しているそうです（これ良くわかってなくて、[@secretlint/secretlint-rule-github](https://github.com/secretlint/secretlint/tree/master/packages/@secretlint/secretlint-rule-github)に実装してないので分かる人PRやIssueお願いします!）

## ドキュメントの更新

Secretlint 3.0にあわせてREADMEの[Husky + lint-staged](https://github.com/secretlint/secretlint#husky--lint-staged)を最新のバージョンに更新しました。

また、トークン検出についてはGitHub自体に[secret scanning](https://docs.github.com/en/code-security/secret-security/about-secret-scanning)という検出の仕組みが最近利用できるようになっています。
[secret scanning](https://docs.github.com/en/code-security/secret-security/about-secret-scanning)は、リポジトリにpushした後にトークンがあるかをスキャンして知らせてくれる機能です。対応しているトークンプロバイダも多く、実際にトークンがvalidかも検証するの正確です。
しかし、[Secretlint](https://github.com/secretlint/secretlint)と違ってpush後の判定なのでpublic repositoryだとrevokeが間に合わない場合があります。
Secretlintはローカルでのコミット時とCIでもチェックできることが目的なので、その辺の違いを[Motivation](https://github.com/secretlint/secretlint#motivation)に追加してあります。

Secretlintは、プロジェクトと個人どちらでも同じように使えるようにデザインしています。
詳しい設定方法やコミットフックについては[Integrations](https://github.com/secretlint/secretlint#integrations)を参照してください。

または、次の記事などがわかりやすいと思います。

- [secretlint を使って機密情報を git commit できない環境を作る | DevelopersIO](https://dev.classmethod.jp/articles/dont-allow-commiting-secrets-by-secretlint/)

個人的にはGit 2.9+から`git config --global core.hooksPath`でグローバルなコミットフックが書けるようになったで、
リポジトリ関係なく間違えて機密情報、`/Users/user-name`のような[ユーザーパスが入ったファイル](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-no-homedir)、[`.env`ファイル](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-no-dotenv)などコミットするべきじゃないものをチェックできて便利です。

自分の設定(Zsh連携もの含む)は次のリポジトリに公開してあります。

- [azu/git-hooks: @azu's global git hooks](https://github.com/azu/git-hooks)

その他の類似するツールとの比較は次の記事にまとまっている気がします。

- [【Git】TokenやSecret KeyのCommit/Pushを防止するツールの紹介と比較](https://zenn.dev/foolishell/articles/ffaaa171038960)