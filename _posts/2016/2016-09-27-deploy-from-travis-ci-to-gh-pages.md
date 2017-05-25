---
title: "Travis CIからgh-pagesへデプロイする設定 via SSH/git push"
author: azu
layout: post
date : 2016-09-27T23:29
category: 雑記
tags:
    - TraivsCI
    - GitHub
    - gh-pages

---

最近はGitHubリポジトリのgh-pagesブランチでサイトを公開する機会が増えているのですが、
リポジトリが更新されたら自動でサイトも更新できるようにしたいです。

以前は、GitHub Access Tokenを発行して、Travis CIのconfig(secret)にそのTokenを埋め込んで、Tokenを使ってpushをしていました。

しかし、GitHub Access Tokenは簡単に発行できるとはいえリポジトリ単位で管理できる権限となっていないため、Tokenが漏れてしまうと管理ができないという問題があります。
(実際 `git push url-with-secret >/dev/null 2>&1`などしないと簡単に漏れてしまう)

- [Best Practices in Securing Your Data - Travis CI](https://docs.travis-ci.com/user/best-practices-security/ "Best Practices in Securing Your Data - Travis CI")

そのため、最近はSSH鍵を使ってリポジトリへpushする方針へと変更しました。

GitHubのリポジトリには、リポジトリごとにDeploy Keyという公開鍵を登録できる仕組みがあるため、リポジトリ毎の秘密鍵とと公開鍵の組み合わせで管理することができます。

基本的にはJavaScript関係のものが多いので、npm run-scriptで実行できるような仕組みでこの鍵を使ったdeployをやってくれるものがないかなーと思って探してみたらありました。

- [alrra/travis-scripts: Scripts to help automate things using Travis CI](https://github.com/alrra/travis-scripts "alrra/travis-scripts: Scripts to help automate things using Travis CI")

このスクリプトはTC39のECMAScriptの仕様書の自動デプロイとかにも使われています。

- [ecma262/auto-deploy.sh at master · tc39/ecma262](https://github.com/tc39/ecma262/blob/master/scripts/auto-deploy.sh "ecma262/auto-deploy.sh at master · tc39/ecma262")

仕組みとしては、次のようになっています。

[alrra/travis-scripts: Scripts to help automate things using Travis CI](https://github.com/alrra/travis-scripts "alrra/travis-scripts: Scripts to help automate things using Travis CI")のチュートリアルがちゃんと書かれているのでその通りにやっていればできるはずです。(環境変数の指定や`git config user.name`とかの設定が忘れやすいです)

1. 手元でssh-keygenして秘密鍵と公開鍵を作る
2. 公開鍵をGitHubのリポジトリにWriteのDeploy Keyとして登録する
3. `travis encrypt-file github_deploy_key`という感じで秘密鍵を暗号化する
	- このファイルはTravis CI上で復号化されたファイルとして手に入る
	- [alrra/travis-scripts](https://github.com/alrra/travis-scripts)はこれを`~/.ssh/`に移動してくれる
4. 後は、Traivs CIからgit push via sshができるので、普通に`git push`するだけ

この仕組みのいいところとしては、GitHub Access Tokenより権限の範囲が小さい、漏れてもリポジトリ単位でrevokeできるという点がいいところです。
また、普通に`git push`ができるのでGitHub Access TokenでBasic認証的にpush先を変更しなくても動くのがいいところです。

-----

しかし、この一連の設定はDeploy Keyを登録したり自動化できていなくて面倒くさいです。
そのため大部分を自動化できるスクリプトを書きました。

まずは、alrra/travis-scriptsをインストール。

```
npm i -D @alrra/travis-scripts
```

先に指定した、公開鍵をGitHubリポジトリに登録する[azu/add-deploy-key-to-github](https://github.com/azu/add-deploy-key-to-github "azu/add-deploy-key-to-github")というツールを書いたのでそれを入れておきます。

```
npm i -g add-deploy-key-to-github
```

次に、先ほどの手順の1-3をある程度自動的にやってくれるスクリプトを該当するプロジェクトのディレクトリで実行します。

```sh
#!/bin/bash
set -eu
# Usage:
# $ travis-ssh-keygen.sh "user/name"
declare repo="$1"

if !type add-deploy-key-to-github >/dev/null 2>&1; then
  npm install -g add-deploy-key-to-github
fi
# creat ssh key and add deploy key
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f github_deploy_key -N ''
## Add deploy to github
add-deploy-key-to-github --key github_deploy_key.pub --repo ${repo} --token "自分のGitHub Token"
## Remove pub key
cat github_deploy_key.pub | pbcopy
rm github_deploy_key.pub
# encrypt private key and move to .travis
travis encrypt-file github_deploy_key --add
rm github_deploy_key
mkdir -p .travis/
mv github_deploy_key.enc .travis/
# Setup Travis Git Config
travis env set GH_USER_EMAIL "$(git config user.email)"
travis env set GH_USER_NAME "$(git config user.name)"
```

たとえば、`azu/website`リポジトリなら、
そのディレクトリで実行すれば、SSHの鍵生成から登録、travis encrypt-file .travis/github_deploy_key.enc`の作成までをやってくれます。

```
travis-ssh-keygen.sh "azu/website"
```

後は、`.travis.yml`にデプロするブランチやディレクトリ、デプロイ前のコマンドを書けば自動デプロイの設定は完了です。

残念ながら`$encrypted_567c1b6fa013_key`の部分は毎回違うので、自動ができていません。
先ほどのスクリプトで`.travis.yml`に自動で値が書かれているので、それを手動でコピーする必要があります。。
(どうにかできないのかな…)

```yaml
sudo: false
language: node_js
node_js: stable
after_success:
  - |

        $(npm bin)/set-up-ssh --key "$encrypted_567c1b6fa013_key" \
                             --iv "$encrypted_567c1b6fa013_iv" \
                             --path-encrypted-key ".travis/github_deploy_key.enc"

        $(npm bin)/update-branch --commands "npm run build" \
                                 --commit-message "Update website [skip ci]" \
                                 --directory "./public" \
                                 --distribution-branch "gh-pages" \
                                 --source-branch "master"
```
 
参考リポジトリ

次のリポジトリは、このスクリプトの設定で、リポジトリにコミットする自動でgh-pagesへデプロイされています。

- [https://github.com/azu/presentation-annotator](https://github.com/azu/presentation-annotator)

Circle CIだと鍵を登録することができるので、もっと簡単にできた気がしますがTravis CIだとこんな感じで鍵を使ったgit pushの設定ができるという話でした。
