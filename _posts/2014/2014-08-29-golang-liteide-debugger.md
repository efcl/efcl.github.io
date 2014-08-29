---
title: "golang + LiteIDE on Mac OS X でGDBを実行するまで"
author: azu
layout: post
date : 2014-08-29T19:55
category: golang
tags: 
    - golang
    - 設定
    - インストール
    - Mac

---

Go言語はGDBを使ったデバッグが行えます。

以前、[MacとIntelliJでGo言語環境を作る | MemeTodo](http://meme.efcl.info/2013/04/macintellijgo.html "MacとIntelliJでGo言語環境を作る | MemeTodo")で書いた[go-lang-plugin-org/go-lang-idea-plugin](https://github.com/go-lang-plugin-org/go-lang-idea-plugin "go-lang-plugin-org/go-lang-idea-plugin")の方もgdbでのデバッグに対応してます。

もう一つのGo言語のIDEとして有名な[LiteIDE](https://github.com/visualfc/liteide "LiteIDE")もGDBでのデバッグに対応してるそうなので、それを設定するまでのメモです。

(結局Go言語のIDEライクなものって何が使われてるんだろ?)

### HomeBrew

```
brew install go
```

Homebrewからインストールできます。

### `GOROOT` は設定しない

`GOROOT`はGo言語をインストールした場所を示します。
(少なくてもHomeBrewでインストールした場合は)GOROOTは指定してはいけないらしいです。

[あなたがGOROOTを本当に設定しなくていい理由 | Androg](http://kwmt27.net/index.php/2013/06/14/you-dont-need-to-set-goroot-really/ "あなたがGOROOTを本当に設定しなくていい理由 | Androg")

### `GOPATH` は設定する

以下のようにした

``` sh
# golang
export GOPATH=$HOME/local/go
export PATH=$PATH:$GOPATH/bin
```

[これからGoを始める人のためのTips集 #golang - The Wacul Blog](http://blog.wacul.co.jp/blog/2014/08/22/go/ "これからGoを始める人のためのTips集 #golang - The Wacul Blog") で書かれているように、自分のワークスペースと`go get`するもので複数パスを登録することも出来ます。
一緒にしちゃったほうがGo言語らしいのかなと思ったのでひとつのパスにしてます。

(これ公式のドキュメントの推奨パスとかあるのかな?)

### liteideをインストールする

* [visualfc/liteide](https://github.com/visualfc/liteide "visualfc/liteide") 

からダウンロードしてインストールする。

### GDB

OS X Mavericks 10.9にはGDBが入ってない。

HomeBrewでインストールする場合は、以下から入れる。

```
brew install https://raw.github.com/Homebrew/homebrew-dupes/master/gdb.rb
```

そのままだとゲートキーパーに止められて動かせないので、
オレオレ証明書と権限を与えて動かせるようにする。

1. GDBインストール
2. gdb-certの証明書をキーチェンで発行
3. `/System/Library/LaunchDaemons/com.apple.taskgated.plist`を書き換える
4. `sudo codesign -s gdb-cert /usr/local/bin/gdb` で署名する

以下を参考にした。

- [golang - Mac OS X 10.9 MavericksでgdbでGoのコードをデバッグする - Qiita](http://qiita.com/ymotongpoo/items/81d3c945483cae734122 "golang - Mac OS X 10.9 MavericksでgdbでGoのコードをデバッグする - Qiita")
- [MacでGo言語(golang)のLiteIDE導入 - ねずみとりんご](http://msitter29.hatenablog.com/entry/2014/02/20/155212 "MacでGo言語(golang)のLiteIDE導入 - ねずみとりんご")
- [GDB on OS X Mavericks and Xcode 5 - Lazarus wiki](http://wiki.lazarus.freepascal.org/GDB_on_OS_X_Mavericks_and_Xcode_5 "GDB on OS X Mavericks and Xcode 5 - Lazarus wiki")

証明書の発行は[Safx: MacでGoのデバッグ環境を構築する](http://safx-dev.blogspot.jp/2014/04/macgo.html "Safx: MacでGoのデバッグ環境を構築する")の図が分かりやすい。

### liteide + GDB

ブレークポイントを打って止められるようになる。

![img](http://take.ms/ib04C)

Stringがstructのままだけどそんなもんなのかな?
(AppCodeとかXcodeもこの辺徐々に対応してたからそういう感じなのかな)

### トラブルシューティング

liteideでビルドしようとしてもエラーがでて動かない

> go: cannot find GOROOT directory: /usr/local/go

liteideの環境設定で **system** を選択する。
他の設定は`GOROOT`等が上書き設定されていて動かない感じだった。

![img](http://take.ms/J5f7v)

liteideの使い方は以下を参照した。

- [LiteIDEでのはじめてのGoプログラミング：01概要 - プログラミング言語入門Go言語編](http://devlang.blog.fc2.com/blog-entry-17.html "LiteIDEでのはじめてのGoプログラミング：01概要 - プログラミング言語入門Go言語編")

###感想

`GOROOT` と `GOPATH` などの設定についての記事があふれていて、ものすごく検索しても分かりにくいと思いました。
(この記事もそれになりそう)

The Right Way的な常に更新してて、検索からたどり着きやすいものが欲しい気がしました。

翻訳についても色々な所に同じものがあったりして(ついで更新止まってる)、どれ参照すればいいのかよく分からない感じがしました。

http://golang-jp.org/ という公式サイトの翻訳サイトもあり、こちらはGitHubからpull requestを受け付けているそうなので期待しています。

- [The Go Programming Language](http://golang-jp.org/ "The Go Programming Language")
- [gophersjp/go](https://github.com/gophersjp/go "gophersjp/go")
