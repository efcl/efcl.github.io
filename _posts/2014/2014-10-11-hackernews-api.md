---
title: "Hacker News APIがTodoMVC的な場所になってる"
author: azu
layout: post
date : 2014-10-11T17:06
category: JavaScript
tags:
    - JavaScript
    - API
    - MVC
    - library

---

[Hacker News](https://news.ycombinator.com/ "Hacker News")のREST APIとして[HackerNews/API](https://github.com/HackerNews/API "HackerNews/API")が公開されました。

このAPIはCORSも対応してるのもあって、[TodoMVC](http://todomvc.com/ "TodoMVC")のように色々なライブラリでこのAPIを使ったHacker Newsクローンが作られています。


> [dstaley/realtime-hacker-news](https://github.com/dstaley/realtime-hacker-news "dstaley/realtime-hacker-news")

Ember.jsとEmberDataを使ったクローン

> [ssorallen/hackernews-react](https://github.com/ssorallen/hackernews-react "ssorallen/hackernews-react")

Reactを使ったクローン

> [insin/react-hn](https://github.com/insin/react-hn "insin/react-hn")

Reactとreact-routerを使ったクローン

> [lekoaf/HackerNews](https://github.com/lekoaf/HackerNews "lekoaf/HackerNews")

AngularJSを使ったクローン

等現在進行形で増えていってる気がします。

[TodoMVC](http://todomvc.com/ "TodoMVC")はいわゆるTODOアプリをデモアプリとして色々なフレームワーク等を使って仕様を満たすものを作るというプロジェクトですが、ネットワークはあまり関係ない構造になっています。

そのため、認証とか余計なことが必要なく遊べる[Hacker News API](https://github.com/HackerNews/API "Hacker News API")を使ってクローンを作る遊びが流行ってる感じがします。

Hacker Newsクローンには画面の遷移が必要になるのでそういう部分を色々なライブラリではどうやって実現するかなどを見ていくと面白いのではないかなーと思います。

TODOMVCももっと複雑なケースを例としたものについての検討とかは結構前からしてた感じがします。

- [Define initial feature set · Issue #1 · tastejs/TasteApp](https://github.com/tastejs/TasteApp/issues/1 "Define initial feature set · Issue #1 · tastejs/TasteApp")



