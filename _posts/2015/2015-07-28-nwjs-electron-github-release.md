---
title: "NW.js/ElectronアプリをGitHub Releaseで公開する[自動デプロイ]"
author: azu
layout: post
date : 2015-07-28T09:26
category: software
tags:
    - NW.js
    - electron
    - node-webkit
    - github
    - release
    - アプリ

---


以前書いた[node-webkitアプリをTravis CI経由でGitHub Releaseにバイナリ登録する | Web Scratch](http://efcl.info/2014/09/05/node-webkit-binary-release/ "node-webkitアプリをTravis CI経由でGitHub Releaseにバイナリ登録する | Web Scratch")の更新版的な記事です。

この記事は[NW.js](http://nwjs.io/)と[Electron](http://electron.atom.io/)で書いたアプリをGitHub Releaseで公開するまでの流れやツールの紹介です。

この記事の目標としては"Travis CIからGitHub Releaseへ自動的にパッケージしたアプリをアップロードする"を目標にしてます。

つまり、git tagを付けてgit pushすれば、自動的にアプリのバイナリができあがるという感じです。

## GitHub Release向けのzip

GitHub Releaseにアップロードできるファイルの種類は決まっているので、
NW.js/Electronアプリのパッケージング(.exeや.appなど)をしたものをzipとしてまとめる必要があります。

NW.js/Electronアプリのパッケージングはそれぞれメジャーなツールがあります。

- [nwjs/nw-builder](https://github.com/nwjs/nw-builder)
- [maxogden/electron-packager](https://github.com/maxogden/electron-packager)

これらでパッケージングはできますがzipファイルにしてくれるオプションが今のところありません。

そのため、パッケージング->zipということをやってくれるラッパのツールをそれぞれ書きました。

- [azu/nw-zip-builder](https://github.com/azu/nw-zip-builder)
- [azu/electron-zip-packager](https://github.com/azu/electron-zip-packager)

例えばElectronなら

```
$ electron-packager ./sample sample --platform=darwin,win32 --arch=x64 --version=0.30.0
```

という感じで[maxogden/electron-packager](https://github.com/maxogden/electron-packager)を使ってパッケージングを行えます。

これのラッパーである[azu/electron-zip-packager](https://github.com/azu/electron-zip-packager)を使えば、同じオプションを渡せばzipとして出力してくれます。

```
$ electron-zip-packager ./sample sample --platform=darwin,win32 --arch=x64 --version=0.30.0
# それぞれzipファイルができあがる 
#  sample-darwin-x64.zip
#  sample-win32-x64.zip
```

内部的にそれぞれのパッケージングツールを使ってるので受け取れるオプションは全く同じで、パッケージング+zipを作ってくれるだけの機能です。


参考: [30分で出来る、JavaScript (Electron) でデスクトップアプリを作って配布するまで - Qiita](http://qiita.com/nyanchu/items/15d514d9b9f87e5c0a29 "30分で出来る、JavaScript (Electron) でデスクトップアプリを作って配布するまで - Qiita")

## GitHubへアップロード

ここまでで、パッケージングしたzipファイルが各OS毎にできあがりました。

これをTravis CIからGitHub Releaseへアップロードするのですが、これは以前書いた[node-webkitアプリをTravis CI経由でGitHub Releaseにバイナリ登録する | Web Scratch](http://efcl.info/2014/09/05/node-webkit-binary-release/ "node-webkitアプリをTravis CI経由でGitHub Releaseにバイナリ登録する | Web Scratch")と全く同じですが、合わせて紹介。

[travis-ci/travis.rb](https://github.com/travis-ci/travis.rb "travis-ci/travis.rb")を使うと、Travis CIからGitHub Releaseの連携がインタラクティブに行えます

```
gem install travis
travis setup releases
```

ユーザ名やパスワードを入れていくと、自動でGitHub Releaseできる設定の入った`.travis.yml`ができあがります。

具体的がないとちょっとわかりにくいので[azu/video-transcript-note](https://github.com/azu/video-transcript-note "azu/video-transcript-note")を例とします。

このアプリでは、`npm run dist`をすると先ほどのツールを使ってzipファイルをそれぞれ作成刷るように設定しています。

```
 "scripts": {
    "start": "electron .",
    "dist": "electron-zip-packager ./ video-transcript-note --platform=darwin,win32 --arch=x64 --version=0.30.0 --ignore videos"
  },
```

これに加えて`travis setup releases`をして作って少し手を加えた[video-transcript-note/.travis.yml](https://github.com/azu/video-transcript-note/blob/master/.travis.yml "video-transcript-note/.travis.yml")を見てみます。

```yaml

sudo: false
language: node_js
node_js:
- '0.12'
after_success:
- test ${TRAVIS_TAG} && npm run dist
cache:
  directories:
    - node_modules
deploy:
  provider: releases
  api_key:
    secure: spDpSqaquXX3wgxjnB8gySH1ydtHFcqxgyErDjYd1kCHZlsxiiihe9+SqTXocVrkSm0x4D6G5i3Ia2N8Pscrv+4heSVsZ1koXJIaN5tzWkn5py5iYy14DKLEf9N8LqQ3Yenr0gGnweymErmLsdIZVeFaXNmGCdl7oyyvQkFcAyaiQXVAtlMwhhAUkqcmzQ8pZOhCQtzPX1zAjzousPCnKJwSGbrP8iNHumhbu9RoxHTn+JbpW9IlCQnwMqeN/2qN51cGU3YT/G3qLhw3RiJMVGUtthPfym3OYGqCE5LPFjuan5z13ruD49K5LhKzFwRPojhZCtNymQ1KfezXk+Ynm2R0JYPCSBH2f1w9f9GvzJ3RYwinr19zTCzmsAIf5FP8qiayz875jIalo53/fWA05//le1NxrpR5la5OTnGpymQ9VOEo7C4qVKdDs9WYSIV4ywJFG8xYEHRqKfZ2lzH6MZZEob0h343rrBO7PKjiXVhUQESyJBTO27RWbcdpqBIYkNwc18aLU/48xgi8NKmHX9S3+bB2BelPI9K24FOSRRRBf942ZeLIOeIKFje6q0A9Cz0z9EkVE9osampJv2RRL14bAiDGrtIWx9tG/ET8hhr+xqSGEApHPJLah7q/jlFgKrq7Yg6bzz7e1mtIo0I09pVKieojMUPxkHARge8mrmw=
  file:
  - video-transcript-note-darwin-x64.zip
  - video-transcript-note-win32-x64.zip
  on:
    repo: azu/video-transcript-note
    tags: true
```    

設定を簡単に見てみます。

Travis CIでテストが通ったら、git tagがついてる時だけ`npm run dist`します。(GitHub Releaseはタグがいいので)

```
after_success:
- test ${TRAVIS_TAG} && npm run dist
```

合わせてアップロードするzipファイルのパスを指定しています。
(ワーキングディレクトリにzipを作るので、単純にファイル名だけで良い)

```
  file:
  - video-transcript-note-darwin-x64.zip
  - video-transcript-note-win32-x64.zip
```

最後にgit tagの時のみreleaseしたいので

```
tags: true
```

を加えています。(何故か自動では入ってなかった)

これだけで、git tagして、`git push --tags`をするとTravis CIから[GitHub Releaseへアプリをアップロード](https://github.com/azu/video-transcript-note/releases)してくれます。

NW.jsの場合は

- [azu/pdf-markdown-annotator](https://github.com/azu/pdf-markdown-annotator "azu/pdf-markdown-annotator")
- [azu/github-issue-teev](https://github.com/azu/github-issue-teev "azu/github-issue-teev")

などを見てみて下さい(基本的にパスが違うぐらいで同じです)

## おわりに

- [azu/nw-zip-builder](https://github.com/azu/nw-zip-builder)
- [azu/electron-zip-packager](https://github.com/azu/electron-zip-packager)

を使ったNW.js/ElectronアプリのGitHub Releaseでの公開方法について書きました。
余計な設定は大分削ってやビルドスクリプトなどなしにできるようになったので、結構気軽に使えるような気がします。

上記のパッケージングラッパーはいまいちアップデートへの追従的な問題はどうやって確保するのか、peerDependenciesとしたほうがいいのかいまいち分かってないのでIssueやPull Requestくれると嬉しいです。
