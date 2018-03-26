---
title: "textlintの設定をnpmにあげて使い回す"
author: azu
layout: post
date : 2016-04-08T21:51
category: JavaScript
tags:
    - npm
    - textlint
    - JavaScript

---

textlint [6.2.0](https://github.com/textlint/textlint/releases/tag/6.2.0 "6.2.0")でSharable Configの機能を追加しました。

これは`.textlintrc`の中身をnpmパッケージとして公開して、使うときは`textlint --config @azu/textlint-config` のようにパッケージを指定して使えるという機能です。

簡単にいうと設定を共有する機能です。

ESLintのやつと基本的に同じですが、ESLintと違って`"extend"`での設定ファイルの継承は対応してません。
多分JavaScriptとしてやった方が良さそうな気がしていて実装してないです。(いい案があればIssueに下さい)

`.textlintrc`はJavaScriptとして以下のような感じで書くことができます。

```js
module.exports = { 
	rules : {
	}
 };
```

- [ESLintの設定をscoped packageでnpmにあげて使い回す - Qiita](http://qiita.com/hokaccha/items/6a132af7a28ffd4e9690)
- [共有設定でらくらく ESLint - Qiita](http://qiita.com/mysticatea/items/dc35ced6bd5e782f50cd)

設定ファイルを公開する場合は`main`のスクリプトに`.textlintrc`の設定をJavaScriptで書いてexportするだけです。

例えば、[azu/textlint-config-readme: Sharable config for textlint](https://github.com/azu/textlint-config-readme)は以下のファイルをpackage.jsonの"main"に指定しているだけです。

```js
module.exports = {
    rules: {
        "no-todo": true,
        "no-dead-link": true,
        "alex": true,
        "write-good": true,
        "rousseau": true
    }
};
```

`pacakge.json`は次の通り

```json
{
  "name": "@azu/textlint-config-readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/azu/textlint-config-readme.git"
  },
  "author": "azu",
  "email": "azuciao@gmail.com",
  "homepage": "https://github.com/azu/textlint-config-readme",
  "license": "MIT",
  "files": [
    "src/",
    "lib/"
  ],
  "bugs": {
    "url": "https://github.com/azu/textlint-config-readme/issues"
  },
  "version": "1.0.2",
  "description": "textlint config module for writing readme",
  "main": "textlint-config.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "textlint -c ./textlint-config.js ./*.md"
  },
  "keywords": [
    "textlint",
    "config"
  ],
  "dependencies": {
    "textlint-rule-alex": "^1.0.1",
    "textlint-rule-common-misspellings": "^1.0.1",
    "textlint-rule-no-dead-link": "^0.2.0",
    "textlint-rule-no-todo": "^2.0.0",
    "textlint-rule-rousseau": "^1.4.1",
    "textlint-rule-write-good": "^0.1.4"
  },
  "devDependencies": {
    "textlint": "^6.2.0"
  }
}
```

使うときは

```
npm install -D @azu/textlint-config-readme textlint
```

でインストールして

```
$(npm bin)/textlint --config @azu/textlint-config-readme README.md
```

`--config`にパッケージ名を指定するだけです。


具体的には以下を見てみてください。

- [azu/textlint-config-readme: Sharable config for textlint](https://github.com/azu/textlint-config-readme)
	- README.mdのチェック用のルールを適当にまとめた
- [textlint/configuring.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/docs/configuring.md#sharable-configuration)


Scoped module(`@azu/abc`のような形式)も対応してるので、自分の名前空間なら気軽に公開できて便利です。

- [npmで名前空間を持ったモジュールを公開する方法(scoped modules) | Web Scratch](https://efcl.info/2015/04/30/npm-namespace/ "npmで名前空間を持ったモジュールを公開する方法(scoped modules) | Web Scratch")
