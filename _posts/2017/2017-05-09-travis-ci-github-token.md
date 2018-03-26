---
title: "Travis CIでGitHub Personal access tokensが漏れないようにする"
author: azu
layout: post
date : 2017-05-09T09:20
category: GitHub
tags:
    - security
    - github
    - ssh
    - token

---

2017-05-09 漏れていた人はメールで通知が来ていると思いますが、Travis CIのログ上にGitHubのTokenが漏れていたケースがあるという話がありました。
(漏れていたTokenはGitHub側で既にrevokeされていると思います。またメールに漏れている一覧が載ってるはず)

- [The Travis CI Blog: Security Advisory: Secured Environment Variables](https://blog.travis-ci.com/2017-05-08-security-advisory "The Travis CI Blog: Security Advisory: Secured Environment Variables")

これ自体はTravis CIのバグではなくて、ユーザーが書いたデプロイスクリプトなどのツール側のバグによってGitHubのTokenなどsecretな環境変数がログ上に出ている話です。
Travis CIのログはPublicで誰でも見ることができるので、標準出力にTokenが露出していると問題があります。

どのようなケースでGitHubのTokenが標準出力に出てしまうかというと、`git push`のミスが一番多いと思います。

例えば次のようにGitHubのTokenを使って、Travis CIからGitHubへpushしているスクリプトは問題があります。

```sh
git push --force --quiet "https://${GH_TOKEN}@github.com/example/test.git" gh-pages
```

このスクリプトは、`--quiet`が付いてるので `GH_TOKEN` が漏れないように見えますが、
`git push`に失敗すると、エラー結果に含まれるpush先(`"https://${GH_TOKEN}@github.com/example/test.git"`)がログにでるため安全ではありません。

そのため、標準出力と標準エラー出力を両方共潰さないと、`GH_TOKEN`が漏れるケースがあります。

```sh
git push --force --quiet "https://${GH_TOKEN}@github.com/example/test.git" gh-pages >/dev/null 2>&1
```

- [Best Practices in Securing Your Data - Travis CI](https://docs.travis-ci.com/user/best-practices-security/ "Best Practices in Securing Your Data - Travis CI")

この手法は[Auto-deploying built products to gh-pages with Travis](https://gist.github.com/domenic/ec8b0fc8ab45f39403dd "Auto-deploying built products to gh-pages with Travis")の古いバージョンで紹介されていたので知ってる人も多いと思います。

このTravis CI上のGitHub Token(GitHubには限らないけど)漏れは結構前から見かけることがあって、いくつか報告した記憶もあります。

- [GH_TOKEN is leaked · Issue #8 · jirutka/rake-jekyll](https://github.com/jirutka/rake-jekyll/issues/8 "GH_TOKEN is leaked · Issue #8 · jirutka/rake-jekyll")
- [Security concern about merge-development-with-master.sh (T6661) · Issue #3727 · babel/babel](https://github.com/babel/babel/issues/3727 "Security concern about merge-development-with-master.sh (T6661) · Issue #3727 · babel/babel")

この辺の問題があるリポジトリについて、Travis側が過去のログを調査して今回の通知を出したようです。
また、今日から環境変数とマッチする文字列は、ログ上では`[secure]`に自動で置換されるようになっています。

> Both new builds and archived build logs with this issue will see the string [secure] instead of potentially exposed secure environment variables. Logs on both our open-source .org, and closed-source .com platforms have been updated.
> -- [The Travis CI Blog: Security Advisory: Secured Environment Variables](https://blog.travis-ci.com/2017-05-08-security-advisory "The Travis CI Blog: Security Advisory: Secured Environment Variables")

![image](https://efcl.info/wp-content/uploads/2017/05/09-1494289700.png)

## Travis CIからGitHubへpushする

Travis CIからGitHub(gh-pages)へpushしたい場合、自分の場合はGitHubのtokenではなくSSHのキーを使うようにしています。

GitHubにはリポジトリごとにreadまたはwriteの[Deploy Keys](https://developer.github.com/guides/managing-deploy-keys/ "Deploy Keys")としてSSHの公開鍵を登録することができます。

- [Deploy Keys](https://developer.github.com/guides/managing-deploy-keys/ "Deploy Keys")
- [Custom Deployment - Travis CI](https://docs.travis-ci.com/user/deployment/custom/ "Custom Deployment - Travis CI")
- [Adding read/write deployment key - CircleCI](https://circleci.com/docs/1.0/adding-read-write-deployment-key/ "Adding read/write deployment key - CircleCI")

GitHubのTokenは権限は設定できますがユーザー単位なので、一度漏れるとそのユーザーのすべてのリポジトリに影響があります。
GitHubの[Deploy Keys](https://developer.github.com/guides/managing-deploy-keys/ "Deploy Keys")はリポジトリごとなので、漏れてもそのリポジトリのみしか読み書きすることができません。

[add-deploy-key-to-github](https://github.com/azu/add-deploy-key-to-github "add-deploy-key-to-github")などを使うと、CLIから[Deploy Keys](https://developer.github.com/guides/managing-deploy-keys/ "Deploy Keys")を作ってリポジトリに登録できるので、それを使ってgit pushすると簡単です。
(Token方式みたいにgit push先を変更する必要もないけど、ssh経由にする必要があるので `git config --global url.ssh://git@github.com/.insteadOf https://github.com/` などしておくとデプロイスクリプトの変更がいらない)

[Deploy Keys](https://developer.github.com/guides/managing-deploy-keys/ "Deploy Keys")(SSHキー)を使った`gh-pages`へのpush方法は次の記事などで解説されています。

- [Auto-deploying built products to gh-pages with Travis](https://gist.github.com/domenic/ec8b0fc8ab45f39403dd "Auto-deploying built products to gh-pages with Travis")
- [Travis CIからgh-pagesへデプロイする設定 via SSH/git push | Web Scratch](https://efcl.info/2016/09/27/deploy-from-travis-ci-to-gh-pages/ "Travis CIからgh-pagesへデプロイする設定 via SSH/git push | Web Scratch")
- [Travis CI から GitHub へ git push を行う設定 ｜ Tips Note by TAM](https://www.tam-tam.co.jp/tipsnote/program/post11795.html "Travis CI から GitHub へ git push を行う設定 ｜ Tips Note by TAM")

## フローチャート

1. Travis CIからGitHubへpushしたい
	- => リポジトリ用のsshキーを作ってdeploy keyに登録して使う
2. Travis CIでGitHubのtokenが必要(APIを使う処理)
	- => Personal access tokensをリポジトリ用に新規作成して使う
	- Tokenが漏れると影響範囲が広いので、使い回しはしない

## その他

今回の話はまた違いますが、npmへpublishされたパッケージから秘密の情報が混じっていたり、awsのcredentialsがリポジトリに漏れているのは稀によく見るので、そういうのが起こりにくいような仕組みを保つ必要がありそうです。

- [notes/Do-not-underestimate-credentials-leaks.md at master · ChALkeR/notes](https://github.com/ChALkeR/notes/blob/master/Do-not-underestimate-credentials-leaks.md "notes/Do-not-underestimate-credentials-leaks.md at master · ChALkeR/notes")
- [Secrets in the code](https://github.com/blog/1390-secrets-in-the-code "Secrets in the code")

npmへpublishするのに[package.json の files フィールドでホワイトリスト](http://t-wada.hatenablog.jp/entry/nodejs-package-json-tips "package.json の files フィールドでホワイトリスト")を使うとか、[awslabs/git-secrets](https://github.com/awslabs/git-secrets "awslabs/git-secrets: Prevents you from committing secrets and credentials into git repositories")などでpush前にチェックするなど
