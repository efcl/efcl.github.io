---
title: "podspec(cocoapods)のリリースバージョンを更新するコマンドラインツールを書いた"
author: azu
layout: post
categories:
    - ios
tags:
    - ios
    - cocoa
    - cocoapods
    - console
    - tools
    - node.js

---

## [CocoaPods](http://cocoapods.org/ "CocoaPods")

[CocoaPods](http://cocoapods.org/ "CocoaPods")はObjective-Cにおけるパッケージ管理ツールです。
gemとかnpmとかCPANみたいな立ち位置のツールです。

基本的にはgemと似せていて、ライブラリをパッケージ登録する際には、
[podspec](http://guides.cocoapods.org/syntax/podspec.html "Podspec")というファイルを作って、
それを`pod trunk push`で公開用に登録する感じです。

- [CocoaPods Guides - Podspec Syntax Reference](http://guides.cocoapods.org/syntax/podspec.html "CocoaPods Guides - Podspec Syntax Reference")

## アップデートプロセス

podspecファイルに、一度書いたクラスのパスやメタ情報はあんまり更新しないのでいいですが、
`s.version      = '3.1.0'` というようなバージョン情報はアップデートの度に更新しないと行けません。

手動でやるのはない感じがしたので、色々探したのですが今のところそういうバージョン情報を自動的に更新してくれるツールがないようです。

## [podspec-bump](https://github.com/azu/podspec-bump "azu/podspec-bump")

そこで、[azu/podspec-bump](https://github.com/azu/podspec-bump "azu/podspec-bump")というコマンドラインツールを書きました。

機能としてシンプルでpodspecファイルのバージョン周りだけを扱います。
([release-it](https://github.com/webpro/release-it "release-it")のようにgit tagなどまではやらない)

- podspecバージョン情報の更新
    - `-w`を付けない場合はdry-runなので書き込まない
    - [Semantic Versioning](http://semver.org/ "Semantic Versioning")で更新できる
- podspecバージョンの表示

### インストール

cocoapodsがrubyなので、rubyで書くべきなんですが時間がなかったのでnodeで書きました。
(他の実装みても何か正規表現でバージョン取り出してたのでまあいいかなとか思ってしまった)

```
npm install -g podspec-bump
```

## 使い方

デフォルトでは、実行したディレクトリにある`*.podspec`ファイルを自動で選択してくれます。
特定のファイルを指定したい場合は`-p`で指定出来ます。

```
$ podspec-bump -h

Usage: podspec-bump <increment> [options]

  -h, --help              displays help
  -w, --write             write incremented version
  -i, --increment String  Incrementing "major", "minor", or "patch" version; or specify version [default: "patch"]
  -p, --path String       path to podspec
```

先ほども書いていたように、デフォルトではdry-runなのでバージョンの書き換えを反映したい場合は`-w`オプションを付けて下さい。

``` sh
$ podspec-bump -w
```

### Incrementing version

`<increment>` には "major", "minor", or "patch" , 特定の値が指定出来ます。
(デフォルトは"patch"です)

- [Semantic Versioning](http://semver.org/ "Semantic Versioning")!

例えば、現在が`1.0.0`の時にpatchアップデートしたら`1.0.1`になる感じですね。
(minorなら`1.1.0`、majorなら`2.0.0`という感じです)

``` sh
$ podspec-bump major -w
# or
$ podspec-bump -i 1.2.3 -w
```

### Specific podspec file

特定のファイルを指定した場合は`-p`でファイルパスを指定する事で出来ます。

``` sh
$ podspec-bump -p /path/to/example.podspec
```

### Dump version

その、podspecファイルに書かれているバージョンを取得したい場合は`--dump-version`オプションをつけると出来ます。
本来は、cocoapods自体が提供して欲しいのですがなかったのでつけました。

``` sh
$ podspec-bump --dump-version 
0.1.0
```

これを応用すれば、コマンドを組み合わせて、podspecの更新を公開するまでが自動化できると思います。

### pod trunkの自動化

先ほど書いていた自動化の例です。

1. podspecのバージョン更新
2. git tag
3. pod trunk push

という感じのは、以下みたいにかけますね。


``` shell
podspec-bump -w # update version
git commit -am "bump `podspec-bump --dump-version`" 
git tag "`podspec-bump --dump-version`"
git push --tags
pod trunk push 
```

### Contributing

[azu/podspec-bump](https://github.com/azu/podspec-bump "azu/podspec-bump") からContributing募集しています。

## おわりに

最近を小さいライブラリを書いては公開するのを繰り返してるので、
このpodspecのアップデートをする作業がとても面倒だったので作ってみました。

<div class="kwout" style="text-align: center;"><a href="http://cocoapods.org/?q=author%3Aazu*"><img src="http://kwout.com/cutout/x/e4/my/jbq_bor.jpg" alt="http://cocoapods.org/?q=author%3Aazu*" title="Untitled" width="600" height="150" style="border: none;" /></a><p style="margin-top: 10px; text-align: center;"><a href="http://cocoapods.org/?q=author%3Aazu*">azu</a></div>

公式にそれっぽい事をやれそうな[CocoaPods/VersionKit](https://github.com/CocoaPods/VersionKit "CocoaPods/VersionKit")というのがあるので、ruby版とか作ってくれると皆幸せになるんじゃないですかね。
