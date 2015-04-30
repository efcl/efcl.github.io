---
title: "npmで名前空間を持ったモジュールを公開する方法(scoped modules)"
author: azu
layout: post
date : 2015-04-30T23:47
category: JavaScript
tags:
    - npm
    - JavaScript
    - library

---

npmにモジュールを公開することは多くなってると思いますが、今までのnpmだと名前は早い者勝ちでした。

最近[npm Private Modules](https://www.npmjs.com/private-modules "npm Private Modules")というprivateで扱えるモジュールを有料でサポートしましたが、これは[scoped modules](https://docs.npmjs.com/getting-started/scoped-packages "scoped modules")をprivateで扱う時だけ有料でpublicで公開する時は無料で行えます。

[scoped modules](https://docs.npmjs.com/getting-started/scoped-packages "scoped modules")というのは、`@username/project-name` という感じで、@ユーザー名がパッケージ名に入るので異なるユーザー間では重複しません。

- [The npm Blog — solving npm’s hard problem: naming packages](http://blog.npmjs.org/post/116936804365/solving-npms-hard-problem-naming-packages "The npm Blog — solving npm’s hard problem: naming packages")

## 公開手順

実際に[scoped modules](https://docs.npmjs.com/getting-started/scoped-packages "scoped modules")をpublicに公開する手順としては、


1. `npm init --scope=<npmユーザ名>`
	- パッケージの名前が`@<npmユーザ名>/パッケージ名`になる
	- 手動で書き換えても別に問題ない
2. 適当に開発
3. `npm publish --access=public`

するだけです。

簡単に書くと[scoped modules](https://docs.npmjs.com/getting-started/scoped-packages "scoped modules")として作って、公開する時は`npm publish --access=public`とするだけです。(デフォルトが`--access=restricted`であるため明示する必要がある)

こうして公開したモジュールは

```
npm install @<npmユーザ名>/パッケージ名
```

という感じで、普通のモジュールと同様にインストールできます。

以下の記事で書いてたpublishのパターンも少し更新しておきました。

- [npm publishのパターン | Web Scratch](http://efcl.info/2015/04/09/npm-publish-pattern/ "npm publishのパターン | Web Scratch")

## 公開例

実際に適当なものを作ってみました。

- [@azu/github](https://www.npmjs.com/package/@azu/github)
- [azu/npm-github](https://github.com/azu/npm-github)


```
$ npm install @azu/github -g 
```

という感じでインストールできることがわかると思います。
npm version 2.xが必要ですが、Node 0.12を使っていれば勝手に入ってるはず。

```
npm install -g npm
```

で、npmだけのアップデートも可能です。

## おわりに

[scoped modules](https://docs.npmjs.com/getting-started/scoped-packages "scoped modules")を使うことで、npmでも名前空間っぽいものが扱えるようになりました。

[scoped modules](https://docs.npmjs.com/getting-started/scoped-packages "scoped modules")であれば名前の重複などを気にしなくてよくなるのはいい気がします。

これの問題としては、周辺のツールがまだ未対応であったりすることがあります。
例えば、`@myorg/mypackage`という名前のモジュールをインストールすると以下のような配置でnode_modules以下にインストールされます。


```
node_modules
├── @myorg
│   └── mypackage
│       └── package.json
├── browserify
│   └──package.json
├── del
│   ├── index.js
│   └──package.json
....
```

そのため、ディレクトリが一つ深くなって再帰的に探索していないツールなどは[scoped modules](https://docs.npmjs.com/getting-started/scoped-packages "scoped modules")を無視してしまう事があります。

具体的には`tsd link`などはそういうバグがあったりしました。

- [Does `tsd link` not work? · Issue #130 · DefinitelyTyped/tsd](https://github.com/DefinitelyTyped/tsd/issues/130#issuecomment-91127150 "Does `tsd link` not work? · Issue #130 · DefinitelyTyped/tsd")
