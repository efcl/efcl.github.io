---
title: "1Passwordを使って、ローカルにファイル(~/.configや.env)として置かれてる生のパスワードなどを削除した"
author: azu
layout: post
date : 2023-01-31T17:31
category: Security
tags:
    - Security
    - 1Password

---

最近、コミットはされないがローカルのディレクトリに置かれている`.env`のようなファイルから生のパスワードやAPI Tokenを削除しました。
これは、ローカルでマルウェアを実行した場合に、ローカルに置かれている生のパスワードやAPI Tokenを盗まれる可能性があるためです。
最近は、`npm install`時の`postinstall`でのデータを盗むようなマルウェアを仕込んだりするソフトウェアサプライチェーン攻撃が多様化しています。

- [Compromised PyTorch-nightly dependency chain between December 25th and December 30th, 2022. | PyTorch](https://pytorch.org/blog/compromised-nightly-dependency/)
- [What's Really Going On Inside Your node_modules Folder? - Socket](https://socket.dev/blog/inside-node-modules)
- [Microsoft spots malicious npm package stealing data from UNIX systems | ZDNET](https://www.zdnet.com/article/microsoft-spots-malicious-npm-package-stealing-data-from-unix-systems/)
- [GitGot: GitHub leveraged by cybercriminals to store stolen data](https://www.reversinglabs.com/blog/gitgot-cybercriminals-using-github-to-store-stolen-data)

これは、次の記事とも関係しています。

- [パスワード管理/MFA管理の戦略 | Web Scratch](https://efcl.info/2022/11/27/password-mfa-strategy/)
- [Secretlint 6リリース: .bash_historyや.zsh_historyに残ったトークンをマスキングする | Web Scratch](https://efcl.info/2023/01/03/secretlint-6/)

自分は、[1Password](https://1password.com/jp/)を使っているので、`.env`に書くようなパスワードやAPI Tokenも1Passwordに集約することで、
ファイルとして置かれている生のパスワードやAPI Tokenの大部分を削除しました。

- [1Password for Open Source Projectsの申請をした | Web Scratch](https://efcl.info/2022/09/23/1password-teams-open-source/)

ローカルにファイルとして置かれる生のパスワードやAPI Tokenにはいくつか種類があるので、それぞれの対応を書いていきます。
実際には全てのものは対応できていませんが、できるだけファイルに生のパスワードやAPI Tokenを置かないようにしていきます。

## SSHの秘密鍵を1Passwordに移行する

1Passwordには、SSH Agentがあります。
これを使うとSSHの秘密鍵を1Passwordに保存できるため、`~/.ssh`から秘密鍵を削除できます。

- [1Password for SSH & Git | 1Password Developer](https://developer.1password.com/docs/ssh/)

ついでに、GitHubのSigning Keyも追加すると、Gitでのコミット時に自動的に署名してくれます。

- [Sign your Git commits with 1Password | 1Password](https://blog.1password.com/git-commit-signing/)

ブラウザに1Passwordの拡張が入ってるなら、<https://github.com/settings/keys>にアクセスして、ポチポチするだけで終わるので、`~/.ssh`に秘密鍵を置くのはやめましょう。


<iframe width="560" height="315" src="https://www.youtube.com/embed/hTwIsFKfjIs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Bitwardenでも似たようなことができます(仕組みは違います)。

- [Bitwarden SSH Agent](https://github.com/joaojacome/bitwarden-ssh-agent)

macOSだとsecretiveも同様のことができます。ただし、仕組み的にキーをバックアップはできないため、マシンを変更する場合はSSHキーの再発行が必要です。

- [maxgoedjen/secretive: Store SSH keys in the Secure Enclave](https://github.com/maxgoedjen/secretive)

## CLIが利用するCredentialを1Passwordに移行する

GitHub CLIは`~/.config/gh/`に、AWS CLIは `~/.aws/credentials` にCredentialをデフォルトで配置します。
色々なCLIがそれぞれのサービスのAPIトークンをホームディレクトリ以下に配置しています。

[1Password Shell Plugins](https://github.com/1Password/shell-plugins)を使うことで、`gh`や`aws`コマンドを実行するときに、
トークンを1Passwordがロードできるようにコマンドをラップしてくれます。

サービスごとにプラグインが実装されていて、Go言語でプラグインを書けるようになっています。

![op plugin](https://efcl.info/wp-content/uploads/2023/01/31-1675154638.png)

- [Use 1Password Shell Plugins to securely authenticate third-party CLIs | 1Password Developer](https://developer.1password.com/docs/cli/shell-plugins)

導入方法は簡単で1PasswordのCLIである`op`コマンドをインストールして、プラグインを追加するだけです。

```bash
# opコマンドをインストール
$ brew install --cask 1password/tap/1password-cli
# GitHubのプラグインを追加
$ op plugin init gh
```

- [Get started with 1Password CLI | 1Password Developer](https://developer.1password.com/docs/cli/get-started)
- [Use 1Password to securely authenticate GitHub | 1Password Developer](https://developer.1password.com/docs/cli/shell-plugins/github)

これで、`~/.aws/credentials`などに置かれているトークンは不要となるため、単純に削除できます。

## `.env`に入っているCredentialを1Passwordに移行する

`.env`には生のパスワードやトークンが入ってることが多いです。

`.env`は普通はコミットしませんが([Secretlint](https://github.com/secretlint/secretlint)にも検知ルールがあります)、`.env`からパスワードなどが消えれば、コミットしても大丈夫な状態まで持っていけます。(実際にはコミットはしてないですが)

[ghq](https://github.com/x-motemen/ghq)を使ってリポジトリはまとめられているので、次のコマンドで `.env` を検索して1コずつ移行していきました。

```
❯ find . -name ".env" -not -path "*/node_modules/*"
```

`.env`の中の特定のキーだけ保存するなら、エディタのプラグインを使うと便利です。

- [1Password for VS Code | 1Password Developer](https://developer.1password.com/docs/vscode/)
- [1Password - IntelliJ IDEs Plugin | Marketplace](https://plugins.jetbrains.com/plugin/19698-1password)

`.env`の中身を1つのアイテムにまとめるには`op item create`コマンドなどを使ってまとめる必要がありました。

例えば、次のような`.env`ファイルがあったとします。

```
APP_CF_NAMESPACE_USER="SECRET_XXXXXXXX"
APP_CF_AUTHKEY="SECRET_XXXXXXXX"
APP_CF_ACCOUNT_ID="SECRET_XXXXXXXX"
APP_CF_AUTH_EMAIL="SECRET_XXXXXXXX"
APP_LOGFLARE_API_KEY="SECRET_XXXXXXXX"
APP_SESSION_COOKIE_SECRET="SECRET_XXXXXXXX"
APP_STATS_AWS_ACCESS_KEY_ID="SECRET_XXXXXXXX"
APP_STATS_AWS_SECRET_ACCESS_KEY="SECRET_XXXXXXXX"
APP_GOOGLE_OAUTH_CLIENT_ID="SECRET_XXXXXXXX"
APP_GOOGLE_OAUTH_CLIENT_SECRET="SECRET_XXXXXXXX"
APP_OAUTH_REDIRECT_URL="SECRET_XXXXXXXX"
APP_PROD_CF_NAMESPACE_USER="SECRET_XXXXXXXX"
APP_PROD_GOOGLE_OAUTH_CLIENT_ID="SECRET_XXXXXXXX"
APP_PROD_GOOGLE_OAUTH_CLIENT_SECRET="SECRET_XXXXXXXX"
```

これを次のようなシェルスクリプトに変換して、それぞれの値をアイテムにまとめて1Passwordに保存します。

```bash
op item create --category=login --title='My Example'
op item edit 'My Example' APP_CF_NAMESPACE_USER="SECRET_XXXXXXXX"
op item edit 'My Example' APP_CF_AUTHKEY="SECRET_XXXXXXXX"
op item edit 'My Example' APP_CF_ACCOUNT_ID="SECRET_XXXXXXXX"
op item edit 'My Example' APP_CF_AUTH_EMAIL="SECRET_XXXXXXXX"
op item edit 'My Example' APP_LOGFLARE_API_KEY="SECRET_XXXXXXXX"
op item edit 'My Example' APP_SESSION_COOKIE_SECRET="SECRET_XXXXXXXX"
op item edit 'My Example' APP_STATS_AWS_ACCESS_KEY_ID="SECRET_XXXXXXXX"
op item edit 'My Example' APP_STATS_AWS_SECRET_ACCESS_KEY="SECRET_XXXXXXXX"
op item edit 'My Example' APP_GOOGLE_OAUTH_CLIENT_ID="SECRET_XXXXXXXX"
op item edit 'My Example' APP_GOOGLE_OAUTH_CLIENT_SECRET="SECRET_XXXXXXXX"
op item edit 'My Example' APP_OAUTH_REDIRECT_URL="SECRET_XXXXXXXX"
op item edit 'My Example' APP_PROD_CF_NAMESPACE_USER="SECRET_XXXXXXXX"
op item edit 'My Example' APP_PROD_GOOGLE_OAUTH_CLIENT_ID="SECRET_XXXXXXXX"
op item edit 'My Example' APP_PROD_GOOGLE_OAUTH_CLIENT_SECRET="SECRET_XXXXXXXX"
```

そして、`op://` URLの形式で`.env`に保存していた値を置き換えます。
次のようなコマンドを使うと、`op://` URLを取得しながら`.env`形式で取得できます。

```bash
$ op item get --format json 'My Example' | jq -r '.fields[] | select(.value) | (.label) + "=\"" + (.reference) + "\""'
APP_CF_NAMESPACE_USER="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_CF_NAMESPACE_USER"
APP_CF_AUTHKEY="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_CF_AUTHKEY"
APP_CF_ACCOUNT_ID="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_CF_ACCOUNT_ID"
APP_CF_AUTH_EMAIL="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_CF_AUTH_EMAIL"
APP_LOGFLARE_API_KEY="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_LOGFLARE_API_KEY"
APP_SESSION_COOKIE_SECRET="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_SESSION_COOKIE_SECRET"
APP_STATS_AWS_ACCESS_KEY_ID="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_STATS_AWS_ACCESS_KEY_ID"
APP_STATS_AWS_SECRET_ACCESS_KEY="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_STATS_AWS_SECRET_ACCESS_KEY"
APP_GOOGLE_OAUTH_CLIENT_ID="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_GOOGLE_OAUTH_CLIENT_ID"
APP_GOOGLE_OAUTH_CLIENT_SECRET="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_GOOGLE_OAUTH_CLIENT_SECRET"
APP_OAUTH_REDIRECT_URL="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_OAUTH_REDIRECT_URL"
APP_PROD_CF_NAMESPACE_USER="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_PROD_CF_NAMESPACE_USER"
APP_PROD_GOOGLE_OAUTH_CLIENT_ID="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_PROD_GOOGLE_OAUTH_CLIENT_ID"
APP_PROD_GOOGLE_OAUTH_CLIENT_SECRET="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_PROD_GOOGLE_OAUTH_CLIENT_SECRET"
```

これで、`.env`の中身は次のようになりました(SectionでProductionとDevelopを同じアイテム内で分けて保存とかもできます)。

```
APP_CF_NAMESPACE_USER="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_CF_NAMESPACE_USER"
APP_CF_AUTHKEY="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_CF_AUTHKEY"
APP_CF_ACCOUNT_ID="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_CF_ACCOUNT_ID"
APP_CF_AUTH_EMAIL="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_CF_AUTH_EMAIL"
APP_LOGFLARE_API_KEY="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_LOGFLARE_API_KEY"
APP_SESSION_COOKIE_SECRET="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_SESSION_COOKIE_SECRET"
APP_STATS_AWS_ACCESS_KEY_ID="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_STATS_AWS_ACCESS_KEY_ID"
APP_STATS_AWS_SECRET_ACCESS_KEY="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_STATS_AWS_SECRET_ACCESS_KEY"
APP_GOOGLE_OAUTH_CLIENT_ID="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_GOOGLE_OAUTH_CLIENT_ID"
APP_GOOGLE_OAUTH_CLIENT_SECRET="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_GOOGLE_OAUTH_CLIENT_SECRET"
APP_OAUTH_REDIRECT_URL="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_OAUTH_REDIRECT_URL"
APP_PROD_CF_NAMESPACE_USER="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_PROD_CF_NAMESPACE_USER"
APP_PROD_GOOGLE_OAUTH_CLIENT_ID="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_PROD_GOOGLE_OAUTH_CLIENT_ID"
APP_PROD_GOOGLE_OAUTH_CLIENT_SECRET="op://Private/My Example/Section_azkwev6t5djujcfqbb6hpmyk3m/APP_PROD_GOOGLE_OAUTH_CLIENT_SECRET"
```

このままではアプリケーションの環境変数には`op://`の値がそのまま入ります。
そのため、実際にアプリケーションを実行する際には、`op run`というコマンドを経由します。

次のように、`op run`コマンドを実行すると、`op://`の値が実際の値に置き換わった状態の環境変数がアプリケーションのプロセスに渡されます。

```
op run --env-file="./.env" -- npm start
```

- [run | 1Password CLI | 1Password Developer](https://developer.1password.com/docs/cli/reference/commands/run/)
- [Go Ahead, Delete Your .env.example File | 1Password](https://blog.1password.com/delete-your-example-env-file/)
- [1Password の CLI で環境変数を管理する](https://zenn.dev/lambdasawa/articles/op-cli-and-environment-variables)

これでファイルとして永続的に生のパスワードなどが`.env`に残らないようにできます。
この移行が一番大変だったので、`.env` to 1Passwordの移行スクリプトを誰か作ってほしいです。

毎回コマンドを覚えるのは大変なので、自分は`opr npm start`として実行できるようにしています。

```bash
opr () {
	who=$(op whoami)
	if [[ $? != 0 ]]
	then
		eval $(op signin)
	fi
	if [[ -f "$PWD/.env" ]]
	then
		op run --env-file=$PWD/.env -- $@
	else
		op run --env-file=${グローバルのenv置き場}/.env.1password -- $@
	fi
}
```

類似ツール:

- [zenv](https://github.com/m-mizutani/zenv)
- [envchain](https://github.com/sorah/envchain)

## dotfileにかかれたパスワードを1Passwordに移行する

ZshやBashなどのシェルに使ってるような、dotfileにパスワードが書かれているものがあったので、それも1Passwordに移行しました。

よく使う環境変数(`GITHUB_TOKEN`のような決まり文句があるもの)は、グローバル用の`.env`を用意し`opr`で実行しています。
そのほかのトークンは、1Passwordに保存して、`op item get`や`op item read`で取得して利用しています。

たとえば、npm publishに必要なTOTPは次のように取得できます(npmのセキュリテキーのフローがまだ使いにくいため。[パスワード管理/MFA管理の戦略 | Web Scratch](https://efcl.info/2022/11/27/password-mfa-strategy/))。

```
alias npm-get-otp='op item get --otp xxxxxxxxid'
npm publish --otp=$(npm-get-otp)
```

## まとめ

これで、大部分のパスワードやトークンが1Passwordに移行できました。
これによって、ローカルのディレクトリを読み取られても、パスワードが漏洩するケースがかなり少なくなりました。

まだ、一部のトークンが残ったりはしています。
主に認証の実行頻度の問題で、1Passwordに移行できていないものです。

`.env`に`op://`で書く場合、それを読み取るプロセスごとに1Passwordでの認証が必要になります。
そのため、頻繁にプロセスが変わって、頻繁に`.env`を読み取るものは、1Passwordに移行するとノイズになります。
具体的には、次の`postcommit` hookで使ってるようなトークンです。(コミットのたびに別のプロセスになってしまう)

- [GitコミットをNotionに記録してみてる | Web Scratch](https://efcl.info/2023/01/25/gil-notion-git-log/)

一応、`.env`は`op://`のテンプレートから作るようにしていますが、ローカルのディレクトリにトークンが残ってしまいます。

```
op inject --in-file .env.local.template --out-file .env.local
```

- [1Password CLIで.env.localを作る - cockscomblog?](https://cockscomb.hatenablog.com/entry/dotenv-managed-by-1password)

この辺の頻度が高くプロセスが変わるものをいい感じに扱える方法がほしいです。

また、このローカルディレクトリからデータを盗むのはどちらかという無差別なサプライチェーン攻撃に多いような気もします。
標的型攻撃になるとCricle CIのインシデントのように、ブラウザのセッションを盗むことでMFA自体を回避する攻撃が増えています。
これらにも何かしらの対策が必要になっている気がします。

- [CircleCI incident report for January 4, 2023 security incident](https://circleci.com/blog/jan-4-2023-incident-report/)
- [Cookie stealing: the new perimeter bypass – Sophos News](https://news.sophos.com/en-us/2022/08/18/cookie-stealing-the-new-perimeter-bypass/)
