---
title: GitHubなどで使える:+1:するバッジサービスを作った
author: azu
layout: post
categories:
    - webサービス
tags:
    - GitHub
    - Issue
    - WebService
    - Node.js
    - Heroku

---

# [Voting Badge](http://azu.github.io/voting-badge/ "Voting Badge")

[![Vote++](https://voting-badge.herokuapp.com/img?url=https://github.com/azu/voting-badge)](https://voting-badge.herokuapp.com/vote?url=https://github.com/azu/voting-badge)
 
GitHub Issueで賛成などを :+1: と書いてコメントすることが良くありますが、
投票ボタン的なものとしてそういうのが欲しかったので、Travis CIのバッジのように表示+投票できるボタンを作りました。

- [:1: Voting Badge](http://azu.github.io/voting-badge/ ":1: Voting Badge")

上記にアクセスしてURL(実はキーなら何でもいい)を書くとバッジのURLを作ってくれます。

img + link というよく見るバッジの仕組みと同じです。

## なぜ作ったか

最近ブログをGitHub Pagesに移動したため、
これから書く予定の記事候補をGitHub Issueをつかって管理しはじめていました。

* [Issues · efcl/efcl.github.io](https://github.com/efcl/efcl.github.io/labels/%E8%A8%98%E4%BA%8B%E5%80%99%E8%A3%9C "Issues · efcl/efcl.github.io")

しかし、[記事候補](https://github.com/efcl/efcl.github.io/labels/%E8%A8%98%E4%BA%8B%E5%80%99%E8%A3%9C "Issues · efcl/efcl.github.io")に需要があるのか、
よくわからないので簡単な投票機能が欲しいなーと思ったのが始まりです(コメントは敷居高い)

また、[shields.io](http://shields.io/ "shields.io")はバッジを作ってくれるサービスですが、
これを見た時にURLと投票数の関係を管理するサーバだけを作って、画像の生成などは[shields.io](http://shields.io/ "shields.io")にまかせてしまえば、
意外と簡単に+1バッジが作れるかもしれないと思ったのも要因です。

GitHubの要望として既に同様のものがあります。

- [Add explicit `+1` feature for issues that isn&#39;t a comment · Issue #9 · isaacs/github](https://github.com/isaacs/github/issues/9 "Add explicit `+1` feature for issues that isn&#39;t a comment · Issue #9 · isaacs/github").

しかし実装されなさそうな気がしてるので、とりあえず作ってみるかという感じで作りました。

## LevelDB

http://shields.io/ がNodeなので、合わせてNodeで書くとして、
保存する値は URL と 投票数 というだけというシンプルな感じで良かったので、KVSで適当なの使おうとしました。

そこで何となく気になってた[LevelDB](https://code.google.com/p/leveldb/ "LevelDB")が使いたくなったので、
[rvagg/node-levelup](https://github.com/rvagg/node-levelup "rvagg/node-levelup")を使いました。

## 仕組み(初代)

仕組みは凄くシンプルで、以下の2つのAPIを実装するだけでした。

* `/vote?url=xxx` で+1投票
* `/img?url=xxx` でバッジ画像をURLを返す

imgでは、shields.ioのバッジ画像でリダイレクトを書けるというかなりずるい作りにしてました。

`"https://img.shields.io/badge/Vote:+1:-" + count + "-red.svg?style=flat"`

`/img` にアクセスすると、そのurlに対するcountを使ったバッジURLを返すという感じですね。

![](https://img.shields.io/badge/Vote:+1:-100-red.svg?style=flat)

## Heroku

どこに置くのかも考えずに完成して、そういえば[Heroku](https://dashboard.heroku.com/ "Heroku")は
Node.js対応してた事を思い出したのでHerokuにおくことにしました。

LevelDBはファイルベースのDBなので、特に設定などは必要ありませんでした。

後は[Procfile](https://github.com/azu/voting-badge/blob/master/Procfile "Procfile")を作ってpushするだけでローカルと同じように動きました。

と思ったら、Heroku起動する度にファイルシステムはまっさらになるので、
永続化するには別途アドオンや外部に保存しないと行けないことに気付きました。

そして、HerokuでLevelDBを単純に永続化する方法はなさそうだったので諦めました。

## Redis

HerokuではRedisなどはアドオンが無料で使えて、こちらは永続化が簡単にできそうだったので、
Redis版の実装を書きました。

せっかくなので、LevelDB,Redisの上にもう一層軽いラッパを作って
同じAPIで同じように扱えるようにして、LevelDB、Redisどちらでもうごかせるようにしてました。

![api-wrapper](http://efcl.info/uploads/2014/07/redis-leveldb-api.png)

* [voting-badge/lib/backend at master · azu/voting-badge](https://github.com/azu/voting-badge/tree/master/lib/backend "voting-badge/lib/backend at master · azu/voting-badge")

これでpushして永続化ができたので、完成！ 

ではなく、GitHub特有の問題に遭遇しました

## キャッシュ

* [Aggressive image caching breaks image badges · Issue #224 · github/markup](https://github.com/github/markup/issues/224 "Aggressive image caching breaks image badges · Issue #224 · github/markup")
* [Proxying User Images](https://github.com/blog/1766-proxying-user-images "Proxying User Images")

GitHubのREADMEやIssue等に貼った画像は基本的にキャッシュされた画像になります。

shields.ioのカスタムバッジだと、普通にキャッシュされてしまって全然更新されないバッジが出来上がります。
(1日ぐらいキャッシュされる?)

`Cache-Control: no-cache` と Expires, Last-Modified or Etag あたりをちゃんと設定すれば、
キャッシュされなくなるようでしたが、
shields.io の画像へリダイレクトしてるだけだったのでコントールすることが出来ませんでした。

## 自前でレンダリング

キャッシュコントールするためには自分でバッジ(svg)を作る必要がありました。

shields.ioのリポジトリを見ていたら、バッジを作成するモジュールが公開されてる事に気付きました。

* [badges/shields](https://github.com/badges/shields "badges/shields")

node-canvas (cairo)を使ったインストールが結構辛い感じでしたが、
Herokuで動かす設定も載っていたので、自分でバッジを作成するように切り替えました。

これで自分のところのコンテンツを返すので、レスポンスヘッダでキャッシュコントールもできるようになりました。


## 終わり

* Herokuの無料サーバで上手く動き続けるの分からない。
* 何かまだGitHubにキャッシュされてる気がする…