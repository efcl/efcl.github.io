---
layout: post
title: git tagとGitHub ReleasesとCHANGELOG.mdの自動化について
author: azu
categories: 
    - github
tags:
    - github
    - git
    - tools
    - node.js
    - npm
---

# GitHub Releases

GitHubには **Releases** という機能があります。

* [Release Your Software](https://github.com/blog/1547-release-your-software "Release Your Software")
* [Creating Releases · GitHub Help](https://help.github.com/articles/creating-releases "Creating Releases · GitHub Help")
* [GitHubのリリース機能を使う - Qiita](http://qiita.com/todogzm/items/db9f5f2cedf976379f84 "GitHubのリリース機能を使う - Qiita")

簡単に言えば、gitのtagに文章や添付ファイルを追加して公開出来るページです。
基本的にはgit tagと連携してるので、tagを付けて`git push --tags`をしていれば、自動的に追加されます。

メリットとしては以下のような事が行えます。

* git tagにパーマネントリンクがつく(重要!)
* メッセージ(リリースノート等)が書ける
* 添付ファイル(zip)をアップロード出来る(配布するバイナリとか)
* RSS Feedsが自動的に生成される(TagとReleaseの2種類がある)
* ライブラリ等にtagがついてると利用しやすい。

## git tagとGitHub Rleases

git tagでつけたものが自動的にReleaseになるのは知ってる人が多いと思いますが、
この時にメッセージも自動的に入れることも出来ます。

以下にサンプルのリポジトリを用意してあります。

* [azu/github-release-annotation-example](https://github.com/azu/github-release-annotation-example "azu/github-release-annotation-example")

具体的にはgit tagを付けるときに`-a`と`-m`オプションでそれぞれタイトルとメッセージを指定出来ます。

``` console
git tag -a "annotation title" -m "release message body"
```

* `-a` リリースのタイトル
* `-m` リリースのメッセージボディ

![demo](http://take.ms/UBT0G)

GitHub Releasesのページは自動的にtagについてるメッセージを読み取って表示してくれます。

### NOTE

微妙にバグっぽい挙動があって、この`-m`でつけたメッセージはMarkdownも指定は出来るのですが、
なぜかh1タグ等が無視されている気がします。
ただし、RSSなどにはちゃんと`# title`などがレンダリングされて表示されます。

## リリースとリリースノートの自動化

汎用的なものはまだ無いですが、npm(node.js)向けには以下のようなツールを使うとgit tagとリリースノート(CHANGELOG)を自動的に生成出来ます。

* [azu/release-changelog](https://github.com/azu/release-changelog "azu/release-changelog")

``` sh
release-changelog <increment> [options]
```

![gif](http://gyazo.com/71c704db8a5811fb5faffc7858c89867.gif)

このツールは[webpro/release-it](https://github.com/webpro/release-it "webpro/release-it")と[ajoslin/conventional-changelog](https://github.com/ajoslin/conventional-changelog "ajoslin/conventional-changelog")をラップしたツールです。

[webpro/release-it](https://github.com/webpro/release-it "webpro/release-it") はpackage.json等のversion更新とgit tagとnpm publish等を一括で行ってくれます。

[ajoslin/conventional-changelog](https://github.com/ajoslin/conventional-changelog "ajoslin/conventional-changelog") はAngularJSの[ Git Commit Guidelines](https://github.com/ajoslin/conventional-changelog/blob/master/CONVENTIONS.md " Git Commit Guidelines")にしたがってコミットを書くと自動的に`CHANGELOG.md`ファイルを生成出来ます。

[azu/release-changelog](https://github.com/azu/release-changelog "azu/release-changelog")はこの2つをまとめたツールです

* CHANGELOG.mdを自動生成
* `git tag -m` にそのバージョンの変更内容を自動的に追加
* [release-it](https://github.com/webpro/release-it "release-it")でtag付け+release

`release-changelog`のオプションは[release-it](https://github.com/webpro/release-it "release-it")と全く同じです。

これでReleaseした内容は以下で見られます。

* [Releases · azu/release-changelog](https://github.com/azu/release-changelog/releases "Releases · azu/release-changelog")
* [Releases · azu/promises-book](https://github.com/azu/promises-book/releases "Releases · azu/promises-book")

先ほど書いたように自動的にレンダリング部分があったりするのは若干微妙ですが、RSSなどはちゃんとレンダリングされた状態で出てくるので何もしないよりはいい感じです。

npmのものしか対応してないので、もっといろんなものに柔軟に拡張して対応できるものが欲しい…

### その他

CHANGELOGを自動生成するツールは他にも幾つかあります

* [infews/anchorman](https://github.com/infews/anchorman "infews/anchorman")
    * jasmine [jasmine/release_notes at v2.0.0 · pivotal/jasmine](https://github.com/pivotal/jasmine/tree/v2.0.0/release_notes "jasmine/release_notes at v2.0.0 · pivotal/jasmine") で使われてる
* [lalitkapoor/github-changes](https://github.com/lalitkapoor/github-changes "lalitkapoor/github-changes")
    * コミットメッセージやマージメッセージから生成
* [olivierlacan/keep-a-changelog](https://github.com/olivierlacan/keep-a-changelog "olivierlacan/keep-a-changelog")
* [ChangelogHQ - Hosted Changelog for Your Company](https://changeloghq.com/ "ChangelogHQ - Hosted Changelog for Your Company")
    * changelogを作るサービス
* [defunctzombie/changelog](https://github.com/defunctzombie/changelog "defunctzombie/changelog")
    * リリースとChangelog生成

## おわりに

最近では多くのソフトウェアやライブラリがリリースしてもGitHubだけで完結しているものが増えました。
しかし、GitHubのReleaseをちゃんと使ってるものはそこまで多くはありません。(変更内容がコミットを見ないと分からない)

個人的にはもっとGitHubがリリースしやすい機能(リリースノートを書きやすい機能)を入れてくれるのがいいですが、現状でも`git tag -a "annotation title" -m "release message body"`を使うことで自動的にリリースメッセージを入れることができると思います。

GitHub Releaseは自動的にパーマネントリンクが作成されるという意味でも言及しやすくなるので有用です。何でも自動化するのは現実的じゃない面がでてきますが、もっと活用する方法がでてくるといいなーと思います。

結論: もっとリリースノート書いて下さい。