---
title: "Secretlint 6リリース: .bash_historyや.zsh_historyに残ったトークンをマスキングする"
author: azu
layout: post
date : 2023-01-03T19:18
category: secretlint
tags:
    - secretlint
    - security

---

ファイルに含まれるAPIトークンやパスワードなどの機密情報を見つける[Secretlint](https://github.com/secretlint/secretlint) v6をリリースしました。

- [Release v6.0.1 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v6.0.1)

Secretlintは `secretlint "**/*"`のようにglobやファイルを指定して実行すると、ファイルに含まれる機密情報を見つけて標準出力に表示します。
一方で、SecretlintはESLintやtextlintなどと違って、`--fix`といった自動修正はできません。
なぜなら、APIトークンなどを見つけて消しても、ただ単に壊れるだけだからです。

そのため、見つけた機密情報は報告して、ユーザーがそれを手動で修正する必要があります。
たとえば、ソースコードにハードコードするのではなく、環境変数などで受け取るように変更するといった修正をします。

- [secretlint/credentials-is-secret.md at master · secretlint/secretlint · GitHub](https://github.com/secretlint/secretlint/blob/master/docs/credentials-is-secret.md)

多くの場合、機密情報を見つけても自動修正はできないのですが、`.bash_history`や`.zsh_history`に残ってしまった機密情報は自動的に削除したりマスキングしても問題ないことに気づきました。
ヒストリーファイルに残ったAPIトークンを自動修正するために、[Secretlint](https://github.com/secretlint/secretlint) v6では `--format=mask-result` というフォーマッターが追加されています。

## 使い方: `.zsh_history`の機密情報をマスキングする

`secretlint`パッケージ自体にはルールは含まれていませんが、`@secretlint/quick-start`パッケージには推奨ルールが同梱されているので、`@secretlint/quick-start`を使ったやり方を紹介します。
推奨ルールには、GitHub、Stripe、Slack(webhookも含む)、AWS、GCP、npm、SendGrid、秘密鍵、Basic認証などの検出ルールが含まれています。

Dockerでも利用できますが、HOMEディレクトリのファイルはDockerでは扱いにくいので、Node.js版を利用します。

- 詳細: [SecretlintでAPIトークンや秘密鍵などのコミットを防止する | Web Scratch](https://efcl.info/2020/03/24/secretlint/)

次のコマンドで`.zsh_history`に機密情報が含まれているかをチェックできます。
(`.bash_history`もファイル名を変更するだけで、チェックできます)

<!-- secretlint-disable -->

```bash
$ npx @secretlint/quick-start ~/.zsh_history

~/.zsh_history
  9178:25  error  [GITHUB_TOKEN] found GitHub Token(GitHub personal access tokens): ghp_wWPw5k4aXcaT4fNP0UcnZwJUVFk6LO0pTEST  @secretlint/secretlint-rule-preset-recommend > @secretlint/secretlint-rule-github

✖ 1 problem (1 error, 0 warnings)
```

<!-- secretlint-enable -->

もし含まれていたら、エラーが報告されます。
この機密情報をマスキングする前に、念のために `.zsh_history` のバックアップを取ります。

```bash
$ cp ~/.zsh_history ~/.zsh_history.bak
```

`--format=mask-result`を使って、`~/.zsh_history`の機密情報をマスキングした結果を標準出力に出して確認できます。

```bash
$ npx @secretlint/quick-start ~/.zsh_history --format=mask-result

...
: 1672748457:0;GITHUB_TOKEN="****************************************" gh issue list
...

```

問題なかったら、`--output`オプションを使って、マスキングした結果で`~/.zsh_history`を上書きします。
(`<command> > ~/.zsh_history`での上書きはしないように)

```
$ npx @secretlint/quick-start ~/.zsh_history --format=mask-result --output ~/.zsh_history
```

最後に、バックアップしておいた`~/.zsh_history.bak`を削除します。

```bash
$ rm ~/.zsh_history.bak
```

## モチベーション

先月に、PyTorchのPyTorch-nightlyに対してDependency Confusionを使ったサプライチェーン攻撃がありました。

- [Compromised PyTorch-nightly dependency chain between December 25th and December 30th, 2022. | PyTorch](https://pytorch.org/blog/compromised-nightly-dependency/)

`pip`は社内リポジトリ(レジストリ)とPyPIに同じパッケージ名があった場合に、PyPIを優先してインストールします(厳密には`index-url`を`extra-index-url`よりも優先する)。
そのため、PyTorch-nightlyが依存していてPyPIにはまだなかったパッケージと同じ名前で、悪意あるコード仕込んでPyPIにアップロードしておくと、PyTorch-nightlyをインストール時にそのマルウェアを自動でインストールさせられる問題です。
この問題は、Dependency Confusionと呼ばれています。

npmなどでも同様の問題があります。

- [Dependency Confusion: How I Hacked Into Apple, Microsoft and Dozens of Other Companies | by Alex Birsan | Medium](https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610)

JFrog ArtifactoryなどのPrivateなレジストリとPublicなレジストリを併用すると、名前は同じだけどレジストリによって中身が異なるものが発生しやすいです。このDependency Confusionへの対応は次の記事にまとまっていますが、レジストリを混在させない、パッケージ名に名前空間を使う、ロックファイルを使うなどの対策を組み合わせる話があります。

- [3 Ways to Mitigate Risk When Using Private Package Feeds](https://azure.microsoft.com/ja-jp/resources/3-ways-to-mitigate-risk-using-private-package-feeds/)

今回のPyTorch-nightlyでのマルウェアには、環境変数やシステム情報、`/etc/hosts`や`/etc/passwd`や`.ssh/`などに加えて、`$HOME/*`にあるファイルをアップロードして盗み出すという処理が入っていたようです。

`.ssh/`ディレクトリは、1PasswordなどでSSHキーを管理することで、ファイルを読み取る権限だけでは盗めなくなります。

- [1Password for SSH & Git | 1Password Developer Documentation](https://developer.1password.com/docs/ssh/)

`.config/`や`~/.aws`などにcredentialが生のテキストとして保存されてることが多いです。
これらは[1Password Shell Plugins](https://github.com/1Password/shell-plugins)や[op run](https://developer.1password.com/docs/cli/reference/commands/run)、[zenv](https://github.com/m-mizutani/zenv)、[envchain](https://github.com/sorah/envchain)などを使って、ファイルに生のトークンなどを保存しないようにできます(これについてはまた今後書きます) 。

それ以外にも、HOMEディレクトリにcredentialが入りやすいものとして、`.zsh_history`や`.bash_history`などのシェルの履歴ファイルがあります。
履歴ファイルを全部消すのは抵抗があったり、一方で目視チェックするのも面倒なので、`secretlint`を使って自動でチェックするようにすれば良さそうと思ったのがきっかけです。

[Secretlint](https://github.com/secretlint/secretlint)には`--fix`のような自動修正の仕組みはありませんが、エラー結果を表示するフォーマッターの実装を工夫すれば、疑似的な自動修正が実装できるなと思って`--format=mask-result`というフォーマッターを実装しました。

実際にやってみたら何個か見つかったので、マスキングして履歴から消しました。
