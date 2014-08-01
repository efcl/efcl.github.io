---
title: GitHubでライブラリのリリースを見ていくためのツールや方法
author: azu
layout: post
categories:
    - github
tags:
    - JavaScript
    - GitHub
    - Greasemonkey
    - Firefox
    - Browser
    - ReleaseNote

---

## GitHubでのリリース

前回、GitHubのRelease機能ついて書きましたが、これはリリースする側の自動化等についてでした。

* [git tagとGitHub ReleasesとCHANGELOG.mdの自動化について | Web Scratch](http://efcl.info/2014/07/20/git-tag-to-release-github/ "git tagとGitHub ReleasesとCHANGELOG.mdの自動化について | Web Scratch")

今度は、いわゆるライブラリユーザーだったりソフトウェアの利用者側から、
GitHubでリリースされるものをどう追っていくかについて書いていきたいと思います。

自分は、[JSer.info](http://jser.info/ "JSer.info")というJavaScriptの情報を見ていくサイトをやっているので、
JavaScriptのライブラリ等のリリース情報をどう追っていくかが中心になりますが、基本的にGitHubでリリースされてるならやり方は大きな違いはありません。

基本的には以下に色々書いていた内容のGitHubに関してをまとめた感じの記事となっています。

* [最近のJavaScript情報の探し方 · Issue #2 · jser/jser.info](https://github.com/jser/jser.info/issues/2 "最近のJavaScript情報の探し方 · Issue #2 · jser/jser.info")

自分用のツールが中心なので分かりやすさは二の次です。

そのため、流れだけを見たい人はさいごの**まとめ**を見るといいでしょう。

## リポジトリをWatchする

GitHubではリポジトリをStar/Watchすることが出来ます。

Starは単純なブックマークですが、Watchは登録したリポジトリに関係ある通知(イベントといわれる)が[Notifications](https://github.com/notifications "Notifications")画面に表示されます。

またデフォルトでは、登録したメールアドレスにWatchの通知メールが流れてきます。

メールを購読するのはどうやってもスケールするイメージが出てこなかったので、
自分の場合はNotificationを見るためのビューアアプリを通して通知を見ています。
(代わりにメールの通知はフィルタして無効化しています)

* [azu/github-reader](https://github.com/azu/github-reader "azu/github-reader")
* [Githubのタイムラインや通知を見るアプリをnode-webkitで作った | Web Scratch](http://efcl.info/2014/0430/res3872/ "Githubのタイムラインや通知を見るアプリをnode-webkitで作った | Web Scratch")

Watchしたリポジトリのイベントは大量に流れてくるので、基本的に殆ど中身までは見ていません。

[github-reader](https://github.com/azu/github-reader "azu/github-reader")ではGrowlで通知出来るようになってるので、
Growlにひたすら流して気になったものが見えたら見に行くという感じの使い方をしています。


## 人をFollowする

GitHubではTwitterのように人をフォローすることができるので、気になるリポジトリのOwnerをフォローするといいでしょう。

ただしGitHubの場合はタイムラインに流れてくるのは、コミットやStar、Watchなどに関するイベントです。

また、GitHubのタイムライン表示は量が増えるとまともに追うことが困難です。
そのため自分は[github-reader](https://github.com/azu/github-reader "azu/github-reader")を通して見ています。

[github-reader](https://github.com/azu/github-reader "azu/github-reader") はWatchしたリポジトリのイベントと
フォローした人のイベントを混ぜているので、基本的に一緒に眺めています。(主にGrowl通知なのは変わらない)

### 人のStarをフォローする

人のイベントは先ほども書いたようにコミット等の細かいものから、Starを付けたリポジトリなど多種多様です。

新しいものを見つけるという点では**Star**だけ見ていけば十分と言えるので、
Starに関しては[starseeker](http://starseeker.so/ "starseeker")を利用すると、フォローしてる人のStarを一覧できるので便利だと思います。

ここから先はGitHubのReleaseの追い方、つまりライブラリのリリースの追い方の話です。

## GitHub RelaseをRSSで見る

先ほどGitHubの**Watch**機能でリポジトリのイベント通知が来ることを紹介しました。
このイベントには[ReleaseEvent](https://developer.github.com/v3/activity/events/types/#releaseevent "ReleaseEvent")も含まれていますが、大量のイベントの一つなので埋もれてしまいます。

またtagをつけただけではReleaseEventはこなかったと思うので、リリースには気づきにくいと思います

そのため、気になるライブラリ等のリリースを追いたい場合はRSSを使うのが確実だと思います。

GitHub ReleaseのページにはtagとReleaseのRSSの2つが用意されています。

例えば以下のようなReleaseページを見てみると、それぞれのRSSが用意されていることが分かります。

- [Releases · azu/promises-book](https://github.com/azu/promises-book/releases "Releases · azu/promises-book")
    - ReleaseのRSS
    - https://github.com/azu/promises-book/releases.atom
    - TagのRSS
    - https://github.com/azu/promises-book/tags.atom

tagが付けられるとReleaseが自動的に作られるので、基本的にどちらも同じです。
しかし、Releaseの方はリリースノートを本文に含めてくれるので、基本的に`releases.atom`を購読するほうがいいでしょう。

### Releaseをワンクリックで購読

GitHubのWatchとStarはワンクリックで出来るので、Greasemonkeyを使ってRSSもワンクリックで購読出来るようにしています。

* [azu/github-releases-to-feedly](https://github.com/azu/github-releases-to-feedly "azu/github-releases-to-feedly")

![feedly-rss](/wp-content/uploads/2014/07/2014-07-31-reader.png)

[azu/github-releases-to-feedly](https://github.com/azu/github-releases-to-feedly "azu/github-releases-to-feedly")はFeedlyにReleaseのRSSを購読させるボタンを追加するGreasemonkeyです。

手動でOAuthトークンを取得して使うので手順がややこしいですが、[Usage](https://github.com/azu/github-releases-to-feedly#usage "Usage")を参照して下さい。

1. [Sign in | feedly cloud](https://cloud.feedly.com/v3/auth/auth?client_id=feedly&redirect_uri=http://localhost&scope=https://cloud.feedly.com/subscriptions&response_type=code&migrate=false "Sign in | feedly cloud") から好きなやつでログイン
2. URL の `?code=XXX&state=` から `XXX` をコピー
3. リポジトリにあるツールでトークンを取得
    ``` console
    git clone https://github.com/azu/github-releases-to-feedly.git
    cd github-releases-to-feedly
    node get_token.js XXX | pbcopy
    ```
4. [github-releases-to-feedly.user.js](https://raw.githubusercontent.com/azu/github-releases-to-feedly/master/github-releases-to-feedly.user.js) をインストール
5. UserScript Command -> github-releases-to-feedly からpbcopyしておいたJSONをペースト

というややこしい手順です…

#### GitHub専用Feedly

普段使ってるRSSリーダで購読していってもいいのですが、リリースノート書いてるリポジトリは少ないので、バージョン番号ばかりが流れてくるRSSが殆どです。

そのため、自分は直接RSSを見るのではなく、FeedlyをRSSの貯める場所として使っています。
GitHub Releaseを購読する専用のFeedlyアカウントを作ってそこにRSSを追加していっています。

そして、[IFTTT](https://ifttt.com/myrecipes/personal "My Recipes - IFTTT")を使って、TwitterやEmail Digest(1日や1週間でまとめたメールを送ってくれる)に流す感じで使っています。

GitHub -> RSS -> Feedly -> IFTTT -> Twitter / Email / Slack

という感じにしています。

これなら適当な流量で流れてくるので、リポジトリのイベントだけをみてた時に比べるとかなり見落としは減った気がします。

## ReleaseからCHANGELOGを見る

先ほども書いていたように、GitHub Releaseにリリースノートをちゃんと書いてくれるリポジトリはまだまだ少ないです。

リリースノートは書かないで、`CHANGELOG.md`といったファイルに更新内容を書いていくリポジトリもあります。

Releaseには書いてないけど、CHANGELOGは書いてるようなタイプを見るために以下のようなGreasemonkeyを使っています。

* [azu/check_changelog_from_release](https://github.com/azu/check_changelog_from_release "azu/check_changelog_from_release")

![check_changelog_from_release](/wp-content/uploads/2014/07/2014-07-31_34fd020.png)

CHANGELOGファイルがあるなら、Releaseページにリンクを表示するというシンプルなものです。

## Releaseから前回のバージョンとのDiffをみる

リリースノートもない、CHANGELOGファイルもないというパターンは、どういうコミットがあったのかを見るぐらいしかありません(Issue等に書いてあることもありますが)

そのようなときに、見ているバージョンと他のバージョンの`compare`画面へのリンクを表示するGreasemonkeyを使っています。

* [Comparing commits across time · GitHub Help](https://help.github.com/articles/comparing-commits-across-time "Comparing commits across time · GitHub Help")
* [azu/show-diff-from-release](https://github.com/azu/show-diff-from-release "azu/show-diff-from-release")

![show-diff-from-release](/wp-content/uploads/2014/07/2014-07-31_be9f906cb.png)

[azu/show-diff-from-release](https://github.com/azu/show-diff-from-release "azu/show-diff-from-release")
ではtag同士のcompare画面へのリンクをまとめて作ってくれます。

GitHubにちゃんとしたリポジトリのtag一覧(日付が入った)を取得するAPIが見つからなかったため、タグ名が不規則だとcompareのリンクが上手くいかない場合があります。

* [List Tags](https://developer.github.com/v3/repos/#list-tags "List Tags")

---

# まとめ

だらだら書いたので分かりにくいですが、まとめると以下のような感じです。

* リポジトリのWatch
    * [azu/github-reader](https://github.com/azu/github-reader "azu/github-reader")
* タイムライン
    * [azu/github-reader](https://github.com/azu/github-reader "azu/github-reader")
* Star
    * [starseeker](http://starseeker.so/ "starseeker")
* GitHub ReleaseのRSS購読
    * [azu/github-releases-to-feedly](https://github.com/azu/github-releases-to-feedly "azu/github-releases-to-feedly")
* Feedly -> any
    * [IFTTT](https://ifttt.com/myrecipes/personal "My Recipes - IFTTT")
* GitHub Release -> CHANGELOG
    * [azu/check_changelog_from_release](https://github.com/azu/check_changelog_from_release "azu/check_changelog_from_release")
* GitHub Release -> compare tags
    * [azu/show-diff-from-release](https://github.com/azu/show-diff-from-release "azu/show-diff-from-release")

この辺をうまくまとめたTwitterクライアントのようなGitHubクライアントがでてくるといいですね。
