---
title: "オープンソースライブラリとパッケージ管理の権限移譲の問題(cocoapods)"
author: azu
layout: post
date : 2015-04-01T22:26
category: github
tags:
    - オープンソース
    - GitHub
    - Objective-C
    - cocoapods
    - npm
    - iOS

---

ライブラリを開発してオープンソースにして、npmやcocoapodsといった場所へパッケージとして公開することはよくあることだと思います。それを業務とかチームで使うこともよくあります。

そういった事をしてた時に、後から権限を付与しようとしたりリポジトリの管理についてで問題が出てくることがあったので、それについてのメモです。

この記事は、既に個人のアカウントで公開していたライブラリを後からどうやって権限の移譲や分配をしていくかという趣旨の内容です。

最初からチーム用のアカウントでやるのが正解な気がするので、そういうのとはちょっと違う方向かもしれません。

## 概要

3行で

- 個人でオープンソースのライブラリ公開してた
- 後になってチームで更新出来るようにしたくなった
- そもそもライブラリとリポジトリで権限が別で何か面倒だね

## Cocoapodsの例

SwiftとObjective-Cのパッケージ管理ツールである[CocoaPods](http://cocoapods.org/ "CocoaPods")を例にしてみます。
[CocoaPods](http://cocoapods.org/ "CocoaPods")はRubyGemsやnpmと同じように、パッケージをpublishして公開する形なので、CocoaPodsを公開するようのアカウントがリポジトリとは別に必要です。

なので、パッケージはパッケージで権限を付与する必要があります。

### 登録済みのpodspecの取得

その人が登録しているcocoapodsのパッケージを確認する

```
$ pod trunk me
  - Name:     azu
  - Email:    azuciao@gmail.com
  - Since:    May 20th, 06:52
  - Pods:
    - UITextSubClass
    - MochaAsyncTest
    - SimpleUserDefaults
    - AZEncodeURIComponent
    - NSDictionaryAsURLQuery
    - UIImage-Teeny
    - RoleTabBarController
    - SnoozeLocalNotification
    - UIAlertView-NSErrorAddition
    - EasyMailSender
    - OpenFileInWebView
    - isUnitTesting
    - UITextFieldWithLimit
    - iOSDetector
    - XCTestCase+RunAsync
    - NSDate-Escort
    - CrayWebViewController
    - XCTestCase-RunAsync
    - ErrorGen
    - RequestInMemory
    - AZNSDateKiwiMatcher
    - LupinusHTTP
    - BlockValueTransformer
    - ManagedMappingObject
    - TimeRange
    - OperationPromise
    - AppStoreOpener
    - BlobURLOfUIImage
    - DrowningGraphicer
    - AZDateBuilder
    - SimplePanel
    - StoryboardInitializer
    - XUIRoundedRectButton
    - ArsDashFunction
    - CounterAgent
    - AppVersioning
    - OPBitMaskNumber
    - ArsScale
```

もしくは [cocoapods.org](http://cocoapods.org/?q=author%3Aazu "author:azu") で検索するなど。

### 権限の付与

一覧が確認できたら、公開の権限を付与したい人のcocoapodsアカウントへ権限を与える。

取得したリストから余計なものを取り除いて

```
AppVersioning
OPBitMaskNumber
ArsScale
```

という感じの登録してるpod名のデータをクリップボードに入れておいて、`pod trunk add-owner `で権限を付与する。

```
pbpaste | xargs -I% pod trunk add-owner "%" "付与するメールアドレス"
```

という感じでまとめて付与できる。

コマンドの詳細は以下に書かれています。

- [CocoaPods Guides - Getting setup with Trunk](http://guides.cocoapods.org/making/getting-setup-with-trunk.html "CocoaPods Guides - Getting setup with Trunk")

npmとかでもパッケージ毎に管理出来るユーザ(npmアカウント)を追加できるので同じですね。

- [owner | npm Documentation](https://docs.npmjs.com/cli/owner "owner | npm Documentation")


## GitHubリポジトリの移譲

GitHubでリポジトリを公開してる場合に、そのリポジトリもチームで共有しやすい形にしたいと思います。

GitHubの場合は方法がいくつかあると思います。

- リポジトリの[collaborators](https://help.github.com/articles/adding-collaborators-to-a-personal-repository/ "collaborators")に加える
	- 現状維持的なアプローチ
	- Collaborators権限でコミットも可能
	- OrganizationをCollaboratorsに追加はできない(=>移譲するしかない)
	- Collaboratorsがたくさんいる場合は組織アカウントへ移譲した方がいい
- Organizationアカウントを作ってそこへ[リポジトリを移譲](https://help.github.com/articles/transferring-a-repository/ "Transferring a repository - User Documentation")する
	- GitHubがリダイレクトしてくれるので最低限はそのまま維持される
	- URLが変わるので関連サービスなどが追従できない可能性はあるけど、リダイレクトされるので大抵は動く
	- READMEやpackage.jsonやpodspecのような関連ファイルを順次書き換えていく必要がある
- 完全に触らなくなる場合: 引き継ぐ人がforkして管理する
	- 積極的なメリットはない
	- リポジトリが分散する問題

リポジトリを移譲していくのが今後としてはいい気がしますが色々書き換えが面倒だったり、APIがないので自動化しにくかったりするので、必要に応じてやっていくのがいい気がします。

- [Add API call for transferring repo ownership · Issue #117 · isaacs/github](https://github.com/isaacs/github/issues/117 "Add API call for transferring repo ownership · Issue #117 · isaacs/github")

----

## パッケージとリポジトリの権限が別である問題

今回は既に個人で公開していたものをチームで共有して更新しやすくするようにするという感じでしたが、やっぱりパッケージとリポジトリの権限が別だったり、リポジトリも移譲が面倒だったりします。

この辺は普通のオープンソースプロジェクトでも良く問題になる気がするので、リポジトリとパッケージ管理の権限が別れてる問題は何かいい方法があるといいなーという感じがします。

- [更新の滞ったプロジェクトを引き継ぐ - 渡邉 伸之介](https://shinnn.github.io/blog/2015/03/08/maintaining-outdated-oss/)
- [grunt-parallelize v1.1.0リリースおよび零細OSSの継続性について - teppeis blog](http://teppeis.hatenablog.com/entry/2015/03/grunt-parallelize-v1.1.0)

Golangなどリポジトリをそのまま指定するタイプはパッケージとリポジトリの権限がそのまま結びつくので、この問題はなさそうですがどうなんだろ?