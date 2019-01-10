---
title: "Babelで書かれたJavaScriptライブラリをTypeScriptへ移行する方法"
author: azu
layout: post
date : 2019-01-09T14:32
category: JavaScript
tags:
    - Babel
    - TypeScript
    - library
    - npm

---


Babelを使ってJavaScriptで書いていたライブラリをTypeScriptへマイグレーションする方法についてのメモ書きです。
数十回はライブラリやアプリケーションのコードベースをJavaScriptからTypeScriptへ変換しているので、
ある程度やり方がパターン化されています。

この記事では、自分がよく利用している次の構成のライブラリを元にしています

- Babel 6 or 7
- Mocha + [@babel/register](https://babeljs.io/docs/en/babel-register)

この構成を、次のようなTypeScriptを使った構成へと変換していきます。

- Babel -> TypeScript
- Mocha + [ts-node](https://github.com/TypeStrong/ts-node) + [ts-node-test-register](https://github.com/azu/ts-node-test-register)

## Babelで書かれたライブラリをTypeScriptへ変換

今回は[textlint-rule-helper](https://github.com/textlint/textlint-rule-helper)というライブラリを例にしていきます。
このライブラリは次の記事で、Babelを使ってライブラリを書く構成として紹介しています。

- [ライブラリをES2015(ES6)で書いて公開する所から始めよう | Web Scratch](https://efcl.info/2015/01/09/write-es6/)

このBabelを使って書いたライブラリのソースコードをTypeScriptへ変換し、配布するところまでを見ていきます。

実際に変換したPull Requestは次のURLで見れます。

- [refactor(TypeScript): Convert to TypeScript by azu · Pull Request #11 · textlint/textlint-rule-helper](https://github.com/textlint/textlint-rule-helper/pull/11)

### Babelでの構成

ざっくりとBabel版での[textlint-rule-helper][]は次のような構成になっています。
（[v2.0.1](https://github.com/textlint/textlint-rule-helper/tree/2.0.1)がBabelでのソースコードになっています。）

![File Tree in Babel](https://efcl.info/wp-content/uploads/2015/01/textlint-rule-helper.png)

- `src/`
	- ES2015で書いたソースコード
- `lib/`
	- Babelで変換した結果(ES5)のソースコード
	- 実際のライブラリとして配布するのはこちら
	- 変換結果(自動生成)なのでGitの管理下には置かないように`.gitignore`で無視する
	- 一方で配布はするので`package.json`の`files`フィールドでnpmにはpublishする
- `test/`
	- ES2015で書かれたテストコード
	- [@babel/register](https://babeljs.io/docs/en/babel-register)を利用して、実行時に変換しながらテストする

詳しい構成については次の記事で解説しているので合わせてみてください。

- [ライブラリをES2015(ES6)で書いて公開する所から始めよう | Web Scratch](https://efcl.info/2015/01/09/write-es6/) を見る

### TypeScriptでの構成(予想図)

この記事の最終的な構造の予想図は次のようになっています。

![File tree in TypeScript](https://efcl.info/wp-content/uploads/2019/01/09-1547012454.png)

- `src/`
	- TypeScriptで書いたソースコード
- `lib/`
	- TypeScriptで変換した結果(ES5)のソースコード
	- 実際のライブラリとして配布するのはこちら
	- 変換結果(自動生成)なのでGitの管理下には置かないように`.gitignore`で無視する
	- 一方で配布はするので`package.json`の`files`フィールドでnpmにはpublishする
- `test/`
	- TypeScriptで書かれたテストコード
	- [ts-node](https://github.com/TypeStrong/ts-node)と[ts-node-test-register](https://github.com/azu/ts-node-test-register)を利用して、実行時に変換しながらテストする

変換するのがTypeScriptに変わった以外は、Babelの構造と何も変わっていないことがわかります。

## Babel to TypeScript

実際にBabel to TypeScirptへの変換をしていきます。

次の記事でもJavaScriptからTypeScriptへの移行方法について書いています。

- [JavaScriptのライブラリを徐々にTypeScriptに移行する | Web Scratch](https://efcl.info/2017/07/17/javascript-to-typescript/)

[textlint-rule-helper][]はソースコードとテストコードどちらもTypeScriptにへ変換する予定です。
大まかなやり方は上記の記事と同じで、次のような流れでTypeScriptへ変換していきます。

1. TypeScriptをインストールする
2. TypeScript(tsc)でJavaScriptをビルドできるようにする
3. TypeScript(tsc)でJavaScriptのテストを通るようにする
4. ソースコード(src/)をTypeScriptへ変換する
5. テストコードを(test/)をTypeScriptへ変換する

### 1. TypeScriptをインストールする

まずは、[TypeScript](https://www.typescriptlang.org/)などの必要な依存をまとめてインストールします。
ここでは、[ts-node](https://github.com/TypeStrong/ts-node)などあとで必要になるものをまとめています。

```
npm install --save-dev \
typescript \
ts-node \
ts-node-test-register \
mocha \
@types/node \
@types/mocha
```

### 2. TypeScript(tsc)でJavaScriptをビルドできるようにする

ここでは、ソースコードをJavaScriptのままTypeScriptでビルドできるようにします。
TypeScriptは`allowJs`というオプションによって、JavaScript(ES2015+)をJavaScript(ES5)へと変換するTranspilerとして利用できます。いままで、BabelでやっていたのはES2015 -> ES5の処理だったので、これをTypeScriptでやるように移行していきます

- [TypeScriptを徐々に導入する - Qiita](https://qiita.com/pirosikick/items/183987f8fb79f573ec8b "TypeScriptを徐々に導入する - Qiita")
- [Compiler Options · TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html "Compiler Options · TypeScript")

#### JavaScriptをビルドする`tsconfig.json`を作成

まずは、`tsc --init`コマンドで、[tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)ファイルを作成します。

既に`tsc`(TypeScriptコンパイラ)が`node_modules`以下にインストールされていると思うので、`tsc --init`コマンドを叩くことでデフォルト設定の`tsconfig.json`を作成します。

```
./node_modules/.bin/tsc --init
# or
npx tsc --init
# or
yarn tsc --init
```

デフォルトの`tsconfig.json`は`.ts`ファイルをビルドする設定になっているので、
JavaScriptファイルもビルドできるように`allowJs`オプションを有効化します。

- `allowJs`を`true`へ
- `declaration`を`false`へ
	- `allowJs`が有効時は`d.ts`ファイルを生成する`declaration`は`false`でないといけない
	- [Allow `--declaration` with `--allowJs` · Issue #7546 · Microsoft/TypeScript](https://github.com/Microsoft/TypeScript/issues/7546)

```json
{
  "compilerOptions": {
    /* Basic Options */
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "newLine": "LF",
    "outDir": "./lib/",
    "target": "es5",
    "sourceMap": true,
    // == 変更点 == 
    "declaration": false,
    "allowJs": true,
    // == 変更点 == 
    "jsx": "preserve",
    "lib": [
      "es2018",
      "dom"
    ],
    /* Strict Type-Checking Options */
    "strict": true,
    /* Additional Checks */
    /* Report errors on unused locals. */
    "noUnusedLocals": true,
    /* Report errors on unused parameters. */
    "noUnusedParameters": true,
    /* Report error when not all code paths in function return a value. */
    "noImplicitReturns": true,
    /* Report errors for fallthrough cases in switch statement. */
    "noFallthroughCasesInSwitch": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    ".git",
    "node_modules"
  ]
}
```

**Tips:** 最近の`--init`では`esModuleInterop`は`true`になっています。
このオプションは有効化した方がBabelの`import`と挙動が近くなるので`true`にしておいたほうがマイグレーションは簡単です。

- [TypeScriptの`--esModuleInterop`は一体何をやっているのか - stone's throw](http://osamtimizer.hatenablog.com/entry/2018/06/28/122502)

#### tscでJavaScriptをビルド

次に`npm run build`でビルドできるように、`package.json`の`scripts`を次のように変更します。

`npm run build`でビルド、`npm run watch`でファイル監視とビルド、`npm test`でテストという感じです。

```json
  "files": [
    "lib"
  ],
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "scripts": {
    "build": "tsc -p .",
    "prepublish": "npm run --if-present build",
    "test": "mocha \"test/**/*.{js,ts}\"",
    "watch": "tsc -p . --watch"
  },
```

これで、`npm run build`コマンドで`src/`以下にあるJavaScriptファイルをビルドして`lib/`へ出力できるようになります。

**Note:** `npm run build`が通らない場合

Babelで特殊な処理をしている場合は`tsc`ではビルドできない場合もあります。
(ソースコードにECMAScript外の記法が利用されていたり、`import a from "~/hoge"`のような拡張をしている場合)
[textlint-rule-helper][]では[@babel/preset-env](https://babeljs.io/docs/plugins/preset-env/)のみの利用となっています。

**Tips:** 手作業で`scripts`を書き換えるのが面倒な場合は[npe](https://www.npmjs.com/package/npe)コマンドを使うと、CLIで書き換えができるので簡単です。

```
npx npe scripts.build "tsc -p ."
npx npe scripts.watch "tsc -p . --watch"
npx npe scripts.prepublish "npm run --if-present build"
npx npe scripts.test "mocha \"test/**/*.{js,ts}\""
# types
declare currentDir=$(pwd)
declare currentDirName=$(basename "${currentDir}")
npx npe types "lib/${currentDirName}.d.ts"
```

これでソースコードをとりあえず`tsc`でビルドできるようになりました。
ただし、型チェックなどもなにもしてないので、ビルドしたものが実行できるかはわかりません。

次は、既存のテストを同じように`allowJs`で実行してテストを通るようにしていきます。

### 3. TypeScript(tsc)でJavaScriptのテストを通るようにする

元々をMocha + [@babel/register](https://babeljs.io/docs/en/babel-register)を利用していたのを、[ts-node](https://github.com/TypeStrong/ts-node)と[ts-node-test-register](https://github.com/azu/ts-node-test-register)へ移行します。

まずは、テストコード向けの`tsconfig.json`を作成します。
次のように`test/tsconfig.json`という場所に作成します。
わざわざ、テスト用の`tsconfig.json`を作成しているのは、設定を分けたほうが少しづつ移行しやすいのとテスト用に設定を分けたほうが柔軟性が高いためです。

```
test/
├── IgnoreNodeManager-test.js
├── mocha.opts
├── tsconfig.json
└── textlint-rule-helper-test.js
```

`test/tsconfig.json`には、先ほど作成したルートの`tsconfig.json`を継承して、次のような設定で上書きします。

- `declaration` と `allowJs` はJavaScriptファイルを扱うため
	- `extends`しているので特に書く必要はないが、あとでルートの`tsconfig.json`からは削除するため重複して書いている
- `noEmit`を`true`にしてビルドしてもファイルを出力しないようにする
- `include`に、テストファイル自身(`./**/*`)とソースコードのディレクトリを指定する

```
{
    "extends": "../tsconfig.json",
    "compilerOptions": {
        "declaration": false,
        "allowJs": true,
        "noEmit": true
    },
    "include": [
        "../src/**/*",
        "./**/*"
    ]
}
```

そして、`mocha.opts`で読み込むregsiterを[@babel/register](https://babeljs.io/docs/en/babel-register)から[ts-node-test-register](https://github.com/azu/ts-node-test-register)へ変更します。

```diff
- --require @babel/register
+ --require ts-node-test-register
```

[ts-node-test-register](https://github.com/azu/ts-node-test-register)は[ts-node](https://github.com/TypeStrong/ts-node)のラッパーで、`test/tsconfig.json`を自動的に読み込んで使ってくれるテスト用のregisterです。
(設定を探すこと以外の処理自体は[ts-node](https://github.com/TypeStrong/ts-node)に投げているので同じです)

そして、JavaScriptで書かれたテストを`npm test`コマンドで実行します。

```
npm test
```

これでテストが通ってるならOKです。
この時点でプロジェクトからBabelの依存はなくなりました。

**Notes:** テストが通らない

ここでテストが通らないのは、テストコードにBabelに依存した処理があるのかもしれません。
Fixturesを動的に読み込んでいる場合などの挙動で違いが出るケースもあります。

また、JSDocのようなエラーメッセージがでているなら、`checkJs: true`となってるのかもしれません。
(JSDocの型チェックが行われていて、型が間違っていると通りません)

このサンプルであとでTypeScriptに変換するので、`checkJs: false`でもいいかもしれません。

- [Type Checking JavaScript Files · Microsoft/TypeScript Wiki](https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files "Type Checking JavaScript Files · Microsoft/TypeScript Wiki")
- [JSDocで型チェックする - Qiita](https://qiita.com/shisama/items/016288d38165d542fffd "JSDocで型チェックする - Qiita")

### 4. ソースコード(src/)をTypeScriptへ変換する

次に、やっとコードをTypeScript(`.ts`)へと変換していきます。

ここでやることは`src/*.js`を一個ずつ`.ts`へと変換していくだけです。

基本的な考え方:

- `.ts`へ拡張子を変更
- `npm test`が通るまで型をつけていく
- `.js`と`.ts`は一応混在してても動くので、1つずつ`.ts`にしていく
	- 1ファイル変換できたらコミットする(巻き戻せるように)

変換していく順番の考え方:

- 依存の末端から`.ts`にしていく
	- そのファイルが何も`import`していないファイルが一番最初
	- 依存がないファイルは変換が簡単
- ライブラリは`@types/*`があるかを確認する
	- `@types/`をインストールするツールを使うのが簡単
	- [nfour/types-installer: Installs @types for your dependencies](https://github.com/nfour/types-installer "nfour/types-installer: Installs @types for your dependencies")
	- [xavdid/typed-install: Easily install new packages and their types, every time.](https://github.com/xavdid/typed-install "xavdid/typed-install: Easily install new packages and their types, every time.")
	- `@types`がない場合は`const a = require("a")`として`any`で扱うようにするのがシンプル
- JSDocが書かれているとWebStormやVScodeのQuickFixで推測してTypeScriptの型をつけてくれる
	- ついてなくても`Infer type`から結構推測してつけたりできる
	- とりあえずテストコードの変更は最小で型をつけていけばいいので、`any`とかでもいいはず
	- 実際にちゃんとした型をつけるには、使う側(テストコードなど)をTypeScriptにしないと難しいので
- テストはできるだけ変更しない
	- テストが既に動いてるはずなので、できるだけテストコード自体は変更しないようにしてテストを通す
	- テストのロジックをうっかり壊さないようにする

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Convert JavaScript to <a href="https://twitter.com/hashtag/TypeScript?src=hash&amp;ref_src=twsrc%5Etfw">#TypeScript</a> by <a href="https://twitter.com/hashtag/VSCode?src=hash&amp;ref_src=twsrc%5Etfw">#VSCode</a> .<br>Refactoring JSDoc to TypeScript annotations is useful. <a href="https://t.co/P8o1Tc2MUf">pic.twitter.com/P8o1Tc2MUf</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/934585280157249536?ref_src=twsrc%5Etfw">November 26, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

![infer type on VSCode](https://efcl.info/wp-content/uploads/2019/01/09-1547009820.png)

これで`src/*.js`は`src/*.ts`に変換されました。

#### ルートの`tsconfig.json`から`allowJs`を外す

ソースコードは`.ts`になったため、ルートの`tsconfig.json`から`allowJs`を外してビルドできるかを確認します。

- `allowJs`を消す
- `declaration`を`true`へ

```diff
{
  "compilerOptions": {
    /* Basic Options */
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "newLine": "LF",
    "outDir": "./lib/",
    "target": "es5",
    "sourceMap": true,
    // == 変更点 == 
-    "declaration": false,
+    "declaration": true,
-    "allowJs": true,
    // == 変更点 == 
    "jsx": "preserve",
    "lib": [
      "es2018",
      "dom"
    ],
    /* Strict Type-Checking Options */
    "strict": true,
    /* Additional Checks */
    /* Report errors on unused locals. */
    "noUnusedLocals": true,
    /* Report errors on unused parameters. */
    "noUnusedParameters": true,
    /* Report error when not all code paths in function return a value. */
    "noImplicitReturns": true,
    /* Report errors for fallthrough cases in switch statement. */
    "noFallthroughCasesInSwitch": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    ".git",
    "node_modules"
  ]
}
```

この状態で`npm run build`して`lib/`以下へ`.d.ts`と`.js`が生成されていれば成功です。

### 5. テストコードを(test/)をTypeScriptへ変換する

最後にテストコードもTypeScriptへ変換していきます。

これもソースコードと同じように`.js`を`.ts`にしていくだけです。
基本的な考え方はソースコードの場合と同じです。

次の記事でも書いていましたが、テストコードは普通はファイルごとに独立しているので、必要になったら変換していく形でも問題ありません。

- [JavaScriptのライブラリを徐々にTypeScriptに移行する | Web Scratch](https://efcl.info/2017/07/17/javascript-to-typescript/)

ソースコードの型定義をちゃんとしたい場合は、テストコードもTypeScriptで書いておくと自然とまともな型になっていきます。

テストコードも`.ts`に変更できたら`test/tsconfig.json`からも`allowJs`を外して完成です。

```diff
{
    "extends": "../tsconfig.json",
    "compilerOptions": {
        "declaration": false,
-        "allowJs": true,
        "noEmit": true
    },
    "include": [
        "../src/**/*",
        "./**/*"
    ]
}
```

**Notes:** `.ts`にするとテストコードが通らなくなる

忘れがちですが、`.js`という拡張子に依存している処理が存在しているケースもあります。
特に動的に`.js`を`fs`で読み込んでいる場合などは、ファイルが存在しなくなるため失敗することもあります。

## npm へ publishする

基本的にはBabelのときと同じように`lib`をnpmへpublishします。
型定義ファイルも生成されるようになったので、`types`フィールドを追加して型定義ファイルも配布するのを忘れないでください。

```json
{
    // typesにd.tsのパスを追加する
    "main": "./lib/main.js",
    "types": "./lib/main.d.ts"
}
```

- [Publishing · TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

これで使う側も、TypeScriptで型付きのライブラリとして利用できます。

**Notes:** Babelの不要なファイルを削除する。

TypeScriptへ移行できたら、Babelの依存は不要なので削除するのはわすれないでください。

- `.babelrc`
- `devDependencies`のbabel

また、`lib/`には古い変換が残っている場合があるので、一度`lib/`を消してしまうのが良いでしょう。

## おわりに

この記事ではBabelで書いていたライブラリをTypeScriptへ変換する方法を紹介しました。

[textlint-rule-helper][]は[ライブラリをES2015(ES6)で書いて公開する所から始めよう | Web Scratch](https://efcl.info/2015/01/09/write-es6/)でBabelでライブラリを書く例として紹介しています。
この記事では、そのライブラリをTypeScriptへ変換しました。

- [refactor(TypeScript): Convert to TypeScript by azu · Pull Request #11 · textlint/textlint-rule-helper](https://github.com/textlint/textlint-rule-helper/pull/11)

今のTypeScriptは、Babelからの変換はかなりスムーズに行えます。

実際にこの記事で書いた変換は、30分程度でできています。

記事では省略せずに書いていますが、次のスクリプトでステップ1-3まではほぼ自動化できます。
(スクリプトにはコピー元のファイルが入ってなかったり、そのままではビルドは通らないですが)

1. [自動] TypeScriptをインストールする
2. [自動] TypeScript(tsc)でJavaScriptをビルドできるようにする
3. [自動] TypeScript(tsc)でJavaScriptのテストを通るようにする
4. ソースコード(src/)をTypeScriptへ変換する
5. テストコードを(test/)をTypeScriptへ変換する

```sh
#!/bin/bash
# variable
declare scriptDir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
declare currentDir=$(pwd)
declare currentDirName=$(basename "${currentDir}")

# dependecy script
npm install npe sort-package-json --global

function echo_message(){
  echo "\033[31m=>\033[0m \033[036m$1\033[0m"
}
# Install
echo_message "npm install"
yarn add --dev --pure-lockfile \
typescript \
ts-node \
ts-node-test-register \
mocha \
@types/node \
@types/mocha \
cross-env
# Copy config
echo_message "Copy .tsconfig mocha.opts"
mkdir -p test
## !!!!ここはコピー元のファイルが必要なのでこのままでは動かない
cp ${scriptDir}/resources/tsconfig.json ./
cp ${scriptDir}/resources/test.tsconfig.json ./test/tsconfig.json
cp ${scriptDir}/resources/typescript.mocha.opts ./test/mocha.opts
# Edit package.json
## Add script
echo_message "Add npm run-script"
npe scripts.build "cross-env NODE_ENV=production tsc -p ."
npe scripts.watch "tsc -p . --watch"
npe scripts.prepublish "npm run --if-present build"
npe scripts.test "mocha \"test/**/*.{js,ts}\""
npe types "lib/${currentDirName}.d.ts"
sort-package-json
# git
git add .
```

BabelからTypeScriptへの移行は典型処理も多いので、慣れるとそこまで難しくはありません。
TypeScriptに変換することで型定義ファイルを配布できたり、型チェックが利用できるというメリットもあります。
また、外部に型定義ファイルを作成するよりも、ソースコード自体をTypeScriptに変換してしまったほうが型定義ファイルを作成するのが楽というケースも多いです。

一方、TypeScriptにはBabelのようなプラグインでのエコシステムはあまりないため、その辺の自由度は減ります。
しかし、ライブラリにおいては[@babel/preset-env](https://babeljs.io/docs/plugins/preset-env/)以外のBabelプラグインを導入するケースは、そこまで多くはないと思います。([babel-preset-power-assert](https://github.com/power-assert-js/babel-preset-power-assert)などテストコードへの補助的なものを入れることはあると思います)

ライブラリをTypeScriptにすることにメリットを見いだせる場合は、TypeScriptへ移行してみるのもよいのかもしれません。

## リポジトリ

- [textlint-rule-helper][]
- [refactor(TypeScript): Convert to TypeScript by azu · Pull Request #11 · textlint/textlint-rule-helper](https://github.com/textlint/textlint-rule-helper/pull/11)

## 参考

- [ライブラリをES2015(ES6)で書いて公開する所から始めよう | Web Scratch](https://efcl.info/2015/01/09/write-es6/)
- [JavaScriptのライブラリを徐々にTypeScriptに移行する | Web Scratch](https://efcl.info/2017/07/17/javascript-to-typescript/)

## FAQ

- Q. [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)ではだめ?
- A. [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)はTypeScriptから型情報を取り除くプリセットで、型定義ファイル(d.ts)を生成したり、型チェックはできません。そのため、ライブラリをTypeScriptに移行する際に、`tsc`を使うことに比べて特にメリットがありません。(どちらにしても`tsc`の併用が必要になるため、あまり意味がありません)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)はアプリケーション向けだと思います。Babelのエコシステムという柔軟性を取り入れつつ、TypeScriptで書けるメリットを享受できます。

[textlint-rule-helper]: https://github.com/textlint/textlint-rule-helper
