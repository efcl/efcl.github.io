---
title: "textlintのルールを簡単に作り始めることができるツールを作りました"
author: azu
layout: post
date : 2016-12-14T20:31
category: JavaScript
tags:
    - textlint
    - JavaScript
    - babel
    - tools

---

[textlint](https://textlint.github.io/ "textlint")はJavaScriptで自由にルールを追加することができる仕組みになっています。

- [textlintで日本語の文章をチェックする | Web Scratch](http://efcl.info/2015/09/10/introduce-textlint/ "textlintで日本語の文章をチェックする | Web Scratch")

しかし、普段JavaScriptをあんまり使ってない人には[Babel](https://babeljs.io/ "Babel")を使ったコード変換や[Mocha](http://mochajs.org/ "Mocha")を使ったテストの設定など、ルールを書き始めるまでの環境づくりの方が大変です。

そのような環境設定をコマンド一発で作れて、textlintルールを作り始めることができるツールを作りました。

- [create-textlint-rule](https://github.com/textlint/create-textlint-rule "create-textlint-rule")
	- Scaffolding Tool
- [textlint-scripts](https://github.com/textlint/textlint-scripts "textlint-scripts")
	- BabelやMochaなどのコマンドをラップしたもの

## 使い方

[create-textlint-rule](https://github.com/textlint/create-textlint-rule "create-textlint-rule")を [npm](https://www.npmjs.com/)(Node.jsのパッケージマネージャ)でインストールするだけです。
Node.js(推奨はver6以上)をインストールすれば `npm` コマンドが自動で入っています。

```sh
$ npm install -g create-textlint-rule
```

[create-textlint-rule](https://github.com/textlint/create-textlint-rule "create-textlint-rule")をインストールすると`create-textlint-rule`コマンドが利用できます。

```sh
$ create-textlint-rule --help

  Create textlint rule with no configuration

  Usage
    $ create-textlint-rule rule-name

  Options
    --help  Show help
    --yarn  Use yarn for installing
    --yes   Pass --yes all for install process

  Examples
    $ create-textlint-rule awesome-rule
```

### textlintのルールプロジェクトを作る

`found-bug`という"bug"をテキストから見つけるルールプロジェクトを作ってみます。

次のように、引数にルール名を渡すだけで、`textlint-rule-found-bug`というディレクトリにtextlintのルールが作成されます。

```sh
$ create-textlint-rule found-bug
```

実際のログは次のような感じで、一部対話的にルールの簡単な`description`などを入力しますが、基本的にはEnterでいいはずです。

```sh
$ create-textlint-rule found-bug
Cloning into 'textlint-rule-found-bug'...
remote: Counting objects: 9, done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 9 (delta 0), reused 4 (delta 0), pack-reused 0
Unpacking objects: 100% (9/9), done.
cd /Users/azu/.ghq/github.com/azu/own/textlint-rule-found-bug
Initialized empty Git repository in /Users/azu/.ghq/github.com/azu/own/textlint-rule-found-bug/.git/
Input information about your textlint rule
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (textlint-rule-found-bug)
version: (1.0.0)
description: This textlint rule found bugs.
git repository:
license: (MIT)
About to write to /Users/azu/.ghq/github.com/azu/own/textlint-rule-found-bug/package.json:

{
  "version": "1.0.0",
  "keywords": [
    "textlint",
    "rule"
  ],
  "main": "lib/index.js",
  "files": [
    "lib/",
    "src/"
  ],
  "scripts": {
    "test": "textlint-scripts test",
    "build": "textlint-scripts build",
    "prepublish": "npm run --if-present build"
  },
  "devDependencies": {
    "textlint-scripts": "^1.2.2"
  },
  "name": "textlint-rule-found-bug",
  "description": "This textlint rule found bugs.",
  "directories": {
    "test": "test"
  },
  "author": "azu",
  "license": "MIT"
}


Is this ok? (yes)
Wait... Installing npm packages for development
Setup your README!
Generated README.md
✔ Complete: Let's create textlint rule
```

作成した`textlint-rule-found-bug`ディレクトリには、次のようなファイルが作られています。

```
textlint-rule-found-bug/
├── README.md
├── lib
│   ├── index.js
│   └── index.js.map
├── node_modules
├── package.json
├── src
│   └── index.js
└── test
    └── index-test.js
```

基本的には`src/index.js`にルールのコードを書いていき、`test/index-test.js`にルールのテストを書きます。

`lib/`はnpmで公開するコードが置かれる場所なので、デフォルトでは`.gitignore`されているためいじる必要はありません。

### Build

次のコマンドを叩くことで、`src/`以下にあるES2015+で書かれたコードを[Babel](https://babeljs.io/ "Babel")を使って変換し`lib/`以下においてくれます。

	npm run build

### Test

次のコマンドを叩くことで、`test/`以下にある[textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester")と[Mocha](http://mochajs.org/ "Mocha")を使ったテストを動かします。

テストコードの書き方は[textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester")を参照してください。

	npm test

### ルールの開発

- [textlint/rule.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/docs/rule.md "textlint/rule.md at master · textlint/textlint")
- [textlint/rule-advanced.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/docs/rule-advanced.md "textlint/rule-advanced.md at master · textlint/textlint")

などのドキュメントがあります。

また、textlintはASTを元にルールを書くため、次のASTビューアを見ながら構造を知ると書きやすくなります。

- [AST explorer for textlint](https://textlint.github.io/astexplorer/ "AST explorer for textlint")

簡単な方法として既存のルールからやりたい事と近いものを見つけて、それをパクるのが近道だと思います。

100以上のルールがあり、自分が書いたものは[create-textlint-rule](https://github.com/textlint/create-textlint-rule "create-textlint-rule")で作った構造とほぼ同じなので、コード部分に集中すれば問題ないはずです。

- [Collection of textlint rule · textlint/textlint Wiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · textlint/textlint Wiki")

### publish

ルールの公開は基本的には[npm](https://www.npmjs.com/)に公開します。
`pacakge.json`の`version`を上げたり`git tag`を貼るなどは[npm-version](https://docs.npmjs.com/cli/version "npm-version")を使うと簡単です。
[semver](http://semver.org/lang/ja/)なバージョンを上げたら、[npm-publish](https://docs.npmjs.com/cli/publish "npm-publish")コマンドで公開すれば完了です。

	npm version patch	
	# npm version minor
	# npm version major
	npm publish

これで、npmに公開された`textlint-rule-found-bug`が、npmでインストールすることができます。

	npm install textlint-rule-found-bug

後は、`.textlintrc`に設定して使えばいいだけです。

作ったルールの使い方も実は[create-textlint-rule](https://github.com/textlint/create-textlint-rule "create-textlint-rule")が自動的にREADME.mdに書いてくれています。


	## Usage

	Via `.textlintrc`(Recommended)

	```json
	{
	    "rules": {
	        "found-bug": true
	    }
	}
	```

	Via CLI

	```
	textlint --rule found-bug README.md
	```

作ったルールはWikiに追加してみましょう。

- [Collection of textlint rule · textlint/textlint Wiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · textlint/textlint Wiki")

### Tips

[create-textlint-rule](https://github.com/textlint/create-textlint-rule "create-textlint-rule")を使い、作ったプロジェクト内で、`textlint`にルールを読み込ませて確認する方法。

	$ npm run build
	$ $(npm bin)/textlint --rulesdir ./lib/ README.md
	# $(npm bin) は ./node_modules/.bin と同じなので次も可
        $ ./node_modules/.bin/textlint --rulesdir ./lib/ README.md

## おわりに

[create-textlint-rule](https://github.com/textlint/create-textlint-rule "create-textlint-rule")と[textlint-scripts](https://github.com/textlint/textlint-scripts "textlint-scripts")を使うことで、面倒な環境はある程度簡単に作れるようになっています。

面白いtextlintのルールを自作して文章を改善の助けになればと思います。
