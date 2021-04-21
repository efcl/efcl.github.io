---
title: "expressのルーティングを一覧する静的解析ツールを書いた"
author: azu
layout: post
date : 2021-04-21T12:49
category: JavaScript
tags:
    - JavaScript
    - express

---

[express-router-dependency-graph](https://github.com/azu/express-router-dependency-graph)という、ソースコードを静的解析してexpressのルーティングと使ってるmiddlewareの一覧を出してくれるツールを書きました。

- [azu/express-router-dependency-graph: A static code analysis tool that creates a dependency graph for express routing.](https://github.com/azu/express-router-dependency-graph)

次のように `--rootDir`に`package.json`があるディレクトリを指定することで、
そのディレクトリ以下にあるソースコードからexpressの`use`,`get`,`post`,`delete`,`put`などでのルーティングの一覧を作成します。

```
npx express-router-dependency-graph --rootDir=./
```

MarkdownのTableとJSONでそれぞれ出力できます。

`format:markdown`

![img](https://efcl.info/wp-content/uploads/2021/04/21-1618977924.png)

`format: json`:

```json5
[
  {
    filePath: "<root>/src/game.ts",
    routers: [
      {
        method: "get",
        path: "/getGameById",
        middlewares: ["requireRead"],
        range: [288, 338],
        loc: { start: { line: 11, column: 0 }, end: { line: 12, column: 2 } }
      },
      {
        method: "get",
        path: "/getGameList",
        middlewares: ["requireRead"],
        range: [340, 390],
        loc: { start: { line: 13, column: 0 }, end: { line: 14, column: 2 } }
      },
      {
        method: "post",
        path: "/updateGameById",
        middlewares: ["requireWrite"],
        range: [392, 447],
        loc: { start: { line: 15, column: 0 }, end: { line: 16, column: 2 } }
      },
      {
        method: "delete",
        path: "/deleteGameById",
        middlewares: ["requireWrite"],
        range: [449, 506],
        loc: { start: { line: 17, column: 0 }, end: { line: 18, column: 2 } }
      }
    ]
  },
  {
    filePath: "<root>/src/index.ts",
    routers: [
      {
        method: "use",
        path: "/user",
        middlewares: ["user"],
        range: [140, 162],
        loc: { start: { line: 8, column: 0 }, end: { line: 8, column: 22 } }
      },
      {
        method: "use",
        path: "/game",
        middlewares: ["game"],
        range: [164, 186],
        loc: { start: { line: 9, column: 0 }, end: { line: 9, column: 22 } }
      }
    ]
  },
  {
    filePath: "<root>/src/user.ts",
    routers: [
      {
        method: "get",
        path: "/getUserById",
        middlewares: ["requireRead"],
        range: [287, 337],
        loc: { start: { line: 10, column: 0 }, end: { line: 11, column: 2 } }
      },
      {
        method: "get",
        path: "/getUserList",
        middlewares: ["requireRead"],
        range: [339, 389],
        loc: { start: { line: 12, column: 0 }, end: { line: 13, column: 2 } }
      },
      {
        method: "post",
        path: "/updateUserById",
        middlewares: ["requireWrite"],
        range: [391, 446],
        loc: { start: { line: 14, column: 0 }, end: { line: 15, column: 2 } }
      },
      {
        method: "delete",
        path: "/deleteUserById",
        middlewares: ["requireWrite"],
        range: [448, 505],
        loc: { start: { line: 16, column: 0 }, end: { line: 17, column: 2 } }
      }
    ]
  }
]
```

## モチベーション

[express-router-dependency-graph](https://github.com/azu/express-router-dependency-graph)は静的な解析ツールです。

`express`には `app._router.stack` というプライベートAPIでルーティングの構造を持っています。
サーバを起動して、RuntimeでそのプライベートAPIを使うことで、似たような情報を取れます。(ソースコードの位置は難しいかもしれないです)
しかし、ソースコードを見ればほぼ同じことが分かるのでサーバをいちいち立ち上げて確認するよりも、静的な解析ツールで十分そうと思って作りました。
([express-lazy-router](https://github.com/azu/express-lazy-router)みたいな遅延ロードとも相性が悪そうと思ったという点もあります)

- [node.js - How to get all registered routes in Express? - Stack Overflow](https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express)

このルーティングの一覧がほしかった理由は、一覧を見て不要なルーティングがないかを見たり、権限チェックなどをmiddlewareでやることが多いと思うので、その抜けがないかを確認するためです。

ソースコードを解析するため、ソースコードの位置情報も分かるのでソースコードを見ながらチェックしたりがしやすい気がします。
[--rootBaseUrl](https://github.com/azu/express-router-dependency-graph)というオプションで、ファイル名をGitHubのURLにしたりなどもできます。

## 仕組み

[Dependency cruiser](https://github.com/sverweij/dependency-cruiser)を使ってモジュール間の依存関係を取得して、
expressをimportしているソースコードを[Babelでパース](https://babeljs.io/docs/en/babel-parser)して、ルーティングなどを取り出しています。

静的に解析する都合上、特殊な書き方をすると取れない場合があるので、そういうケースを見つけたらPull Requestお願いします。

- [azu/express-router-dependency-graph: A static code analysis tool that creates a dependency graph for express routing.](https://github.com/azu/express-router-dependency-graph)