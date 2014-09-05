---
title: "node-webkitアプリをTravis CI経由でGitHub Releaseにバイナリ登録する"
author: azu
layout: post
date : 2014-09-05T08:03
category: GitHub
tags:
    - node-webkit
    - GitHub
    - TravisCI
issue: https://github.com/efcl/efcl.github.io/issues/22

---

## Travis CIからデプロイ

Travis CIには[Deployment](http://docs.travis-ci.com/user/deployment/ "Deployment")という機能があり、Heroku等色々なサービスに対応しています。

その一つとして、GitHub Releasesに対してファイルをデプロイする事が出来ます。

- [Travis CI: GitHub Releases Uploading](http://docs.travis-ci.com/user/deployment/releases/ "Travis CI: GitHub Releases Uploading")
- [Git tagとGitHub ReleasesとCHANGELOG.mdの自動化について | Web Scratch](http://efcl.info/2014/07/20/git-tag-to-release-github/ "Git tagとGitHub ReleasesとCHANGELOG.mdの自動化について | Web Scratch")
	- GitHub Releasesの使い方に関して

zipファイルならなんでも登録でき、登録するファイルサイズはリポジトリにpushするより大きくても問題ないので、バイナリサイズがでかいnode-webkitアプリには向いていると言えます。

この記事は基本的には[Travis-CI で Go の Windows 用バイナリを Github release に登録する - Qiita](http://qiita.com/methane/items/f8c5a5f2209739daf44e "Travis-CI で Go の Windows 用バイナリを Github release に登録する - Qiita")と同じなので、先に読んでおくといいかと思います。

## node-webkitアプリの実行ファイルの作成

node-webkitアプリの実行ファイル(バイナリ)の作成方法といっても基本的にランタイムを丸ごと入れた実行ファイルを作るだけです。

これは[mllrsohn/node-webkit-builder](https://github.com/mllrsohn/node-webkit-builder "mllrsohn/node-webkit-builder")を使うと簡単に行うことができます。

以下のように対応したいプラットフォームと、node-webkitアプリのrootディレクトリを指定するだけでプラットフォームごとの実行ファイルを作ってくれます。(デフォルトでは`build/`ディレクトリに作られる)

```
nwbuild -p 'win,osx,linux32,linux64' ./"
```

Macなら`.app`、Windowsなら`.exe`のようなファイルがそれぞれ、`build/win/github-reader.exe`のような感じで作成されます。


### ビルドスクリプト

GitHub Releasesに登録するためにはzipファイルでないと行けないので、ビルドしたものをzip化する必要があります。

[azu/github-reader](https://github.com/azu/github-reader "azu/github-reader") でのビルドスクリプトは以下のような感じです。

```sh
#!/bin/bash

if [[ "$TRAVIS_TAG" ]]; then
    rm -rf build
    nwbuild -p 'win,osx,linux32,linux64' ./ -o ./build
    cd build
    # ziped in build/
    zip -q github-reader-osx.zip -r github-reader/osx
    zip -q github-reader-win.zip -r github-reader/win
    zip -q github-reader-linux32.zip -r github-reader/linux32
    zip -q github-reader-linux64.zip -r github-reader/linux64
    cd -
    echo "ziped!"
else
    echo "Not Release"
fi
```

このスクリプトを`travis.yml`でdeployする前に設定しておくと、ビルドした実行ファイルのzipファイルがプロジェクトのrootに並びます。

`$TRAVIS_TAG`はTravis CIがつけてくれる環境変数で、git tagのコミットの時に値が入る変数となっています。値があるときのみビルドスクリプトを走らせる感じです。

(このzipを展開すると`github-reader/osx/github-reader.app`のような無駄な階層が含まれるのを削るオプションはあるのかな?)

## Travis CIの設定

[Travis-CI で Go の Windows 用バイナリを Github release に登録する - Qiita](http://qiita.com/methane/items/f8c5a5f2209739daf44e "Travis-CI で Go の Windows 用バイナリを Github release に登録する - Qiita")と全く同じことなので、簡単に解説します。

`travis setup releases` を行うとGitHub Releasesへ登録するためのAPIキー等発行されて`.travis.yml`に登録されます。

```
gem install travis
travis setup releases
```

ただし、上記の記事で書かれているように`all_branches: true`がないと正しく動かないバグあることに注意して下さい。

``` yaml
  on:
    repo: azu/github-reader
    tags: true
    all_branches: true
```

最終的な`.travis.yml`は以下のようになりました。

```yaml
deploy:
  provider: releases
  api_key:
    secure: qS2igPviHIlN6zGVUPa9s5lh/TnYH/nELBxb9EfjXQzhaScV1/R3csjg0AI28Bh0ReSp1xhRWc7I5EiKLsS5wqYM821MfTiyrjoKneAjDYy5XeW4+kFKXaqvMgYK+v5f1CoiuJVKtJwVv5uEVb3NsXpX5qUGcLmIvmWmUoRrjik=
  file:
    - build/github-reader-osx.zip
    - build/github-reader-win.zip
    - build/github-reader-linux32.zip
    - build/github-reader-linux64.zip
  on:
    repo: azu/github-reader
    tags: true
    all_branches: true
  skip_cleanup: true
```

`tags: true` にしておくと、git tagをつけたコミットに対してのみ`deploy`が動作するようになります。(スクリプト側では`$TRAVIS_TAG`を見てビルド)

このように設定したら後は`git tag`をはってpushするだけで、自動的に[最新のタグ](https://github.com/azu/github-reader/releases/latest)にバイナリが登録されます。(Travis CIの回線結構早いのでローカルでやるより楽な気がします)

## おわりに

Travis CIの[Deployment](http://docs.travis-ci.com/user/deployment/ "Deployment")を使ってGitHub Releaseにnode-webkitアプリのバイナリを登録する方法について紹介しました。

node-webkitアプリはランタイムも含む都合上(含めない方法もありnwファイルがそれです)、ファイルサイズが数十MBとなったりします。

GitHubにはpush出来るファイルにサイズ制限があるため、node-webkitアプリのバイナリをリポジトリに置くのはむりだと思います。

- [What is my disk quota? · GitHub Help](https://help.github.com/articles/what-is-my-disk-quota "What is my disk quota? · GitHub Help")

そのため、大きなファイルを配布する場合は、別の所におくか、GitHub Releaseを使うのが一般的です。

- [Distributing large binaries · GitHub Help](https://help.github.com/articles/distributing-large-binaries "Distributing large binaries · GitHub Help")

Travis CIはただのテストだけではなく、こういったデプロイの用途にも使えて便利だと思います。

GitHub Releaseでのバイナリ配布は以下から実例を見られます。

- [azu/github-reader](https://github.com/azu/github-reader "azu/github-reader")
- [Releases · azu/github-reader](https://github.com/azu/github-reader/releases "Releases · azu/github-reader")