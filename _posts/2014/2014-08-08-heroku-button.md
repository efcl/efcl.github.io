---
title: "voting-badgeをHeroku Buttonに対応させました"
author: azu
layout: post
categories:
    - node.js
tags:
    - GitHub
    - Heroku
    - badge
    
---

## voting-badge

以前作ったTravis CIライクな投票ボタンのサービスで、以下で詳しく説明しています。

[![Vote++](https://voting-badge.herokuapp.com/img?url=https://github.com/azu/voting-badge)](https://voting-badge.herokuapp.com/vote?url=https://github.com/azu/voting-badge)

- [GitHubなどで使える:+1:するバッジサービスを作った | Web Scratch](http://efcl.info/2014/07/29/voting-badge/ "GitHubなどで使える:+1:するバッジサービスを作った | Web Scratch")

説明の中でも書いてありますがこのウェブアプリはHeroku(node.js)で動いています。

## Heroku Button

Heroku ButtonとはHerokuで公開されているウェブアプリをGitHubのforkボタンのように一発でforkして使えるようにする機能のことです。

- [Heroku | Introducing Heroku Button](https://blog.heroku.com/archives/2014/8/7/heroku-button "Heroku | Introducing Heroku Button")

### Heroku Buttonへの対応

Herokuですでに公開してて、GitHubにソースをおいてある場合はとても簡単にHeroku Buttonへ対応出来ます。

1. [app.json](https://devcenter.heroku.com/articles/app-json-schema "app.json Schema | Heroku Dev Center")を配置する
2. READMEにHeroku Buttonを置く

たったこれだけで、Herokuのforkボタンがつけられます。

### [azu/voting-badge](https://github.com/azu/voting-badge "azu/voting-badge") のケース

[azu/voting-badge](https://github.com/azu/voting-badge "azu/voting-badge") の場合は先ほど解説したように、
`app.json`を追加してHeroku Buttonを追加しただけです。

1. [ add app.json ](https://github.com/azu/voting-badge/commit/e8569c739eac47f5739417a4aaaa43fe49047e38 " add app.json ")
2. アドオンなどを使ってる場合はapp.jsonに [その情報を追加](https://github.com/azu/voting-badge/commit/d0cad65cfeb48d04859e5f25a3fae8cad7056a11 "update app.json · d0cad65 · azu/voting-badge")
3. [ add deploy button ](https://github.com/azu/voting-badge/commit/b766bd1555483ca025483ca477f8392da90e1736 " add deploy button ") 

最終的な `app.json` は以下のような感じで、アプリのメタ情報が入ったnpmのpackage.jsonみたいなものであることが分かります。

``` json
{
    "name": "voting-badge",
    "description": "Voting badge like Travis CI",
    "website": "https://github.com/azu/voting-badge",
    "repository": "https://github.com/azu/voting-badge",
    "keywords": ["node", "badge", "canvas", "node-canvas", "GitHub"],
    "env": {
        "BUILDPACK_URL": "https://github.com/mojodna/heroku-buildpack-multi.git#build-env"
    },
    "addons": ["redistogo:nano"]
}
```

これで以下のようにボタンが追加できて、ボタンを押すとHerokuにforkすることが出来ます。

![img](http://efcl.info/wp-content/uploads/2014/08/08-1407471632.png)

実際に動くボタンは以下のような感じです

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/azu/voting-badge)

### 細かいはまりどころ

`BUILDPACK_URL` やaddonなどを使ってる場合は`app.json`にもその情報を書く必要があることに注意してください。
詳しくは以下で解説されています。(書かないとforkしたときにエラーがでる)

- [app.json Schema | Heroku Dev Center](https://devcenter.heroku.com/articles/app-json-schema "app.json Schema | Heroku Dev Center")
 
また、`app.json`がjsonとして問題がある場合、 https://dashboard-next.heroku.com/new が何もいわなくなるという状態になったりしました。 

### 注意

Heroku Buttonはリファラーをみて、どのアプリかを判断してるのでGitHubのREADMEに貼ったときのみ、
以下のようにパラメータがないボタンを貼ることで動作します。

``` 
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
```

もちろん、パラメータをつけたボタンも作ることができるため、GitHub以外から動くボタンも作れます。

以下のように`template`のパラメータを付け加えるだけで問題ありません。


[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/azu/voting-badge)

``` html
<a href="https://heroku.com/deploy?template=https://github.com/azu/voting-badge">
  <img src="https://www.herokucdn.com/deploy/button.png" alt="Deploy">
</a>
```

- [Creating a &#39;Deploy to Heroku&#39; Button | Heroku Dev Center](https://devcenter.heroku.com/articles/heroku-button "Creating a &#39;Deploy to Heroku&#39; Button | Heroku Dev Center")

GitHubからでもリファラーを無効にしてるブラウザだと動かなくなるので、通常はパラメータを入れてたほうが安全そうな気がします。

## おわりに

Herokuに追加されたHeroku Buttonについて解説しました。

Herokuで公開してるアプリを簡単に試せるのでとても便利だと思います。


- [Heroku | Introducing Heroku Button](https://blog.heroku.com/archives/2014/8/7/heroku-button "Heroku | Introducing Heroku Button")