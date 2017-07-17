---
title: "JavaScriptのライブラリを徐々にTypeScriptに移行する"
author: azu
layout: post
date : 2017-07-17T22:27
category: JavaScript
tags:
    - JavaScript
    - Almin

---

[Almin](https://github.com/almin/almin "Almin")というライブラリは元々JavaScript(+Babel)で書かれていましたが、今年の2月に`src/`下のソースコードはTypeScriptに移行しました。

その時のコミットログは次のPRに残っているため、コミットログを1コづつ見ていけばどのように行われていったが分かると思います。

[![コミットログ](http://efcl.info/wp-content/uploads/2017/07/17-1500298209.png)](https://github.com/almin/almin/pull/68/commits)

- [Convert src/ to TypeScript by saneyuki · Pull Request #68 · almin/almin](https://github.com/almin/almin/pull/68 "Convert src/ to TypeScript by saneyuki · Pull Request #68 · almin/almin")

この時取った方法は大まかに次のような手順でした

## `src/` の TypeScript化

1. Babel -> JS(js -> js)だったものをTypeScript -> Babel -> JSに[ビルドスクリプトを変更](https://github.com/almin/almin/pull/68/commits/7afc5a9d5ed2aa2f45da497f07c881a8c13767f6)
	- TypeScriptは`target`を`esnext`にすることで単純に型をと除くだけの変換にする
	- ES2015 -> ES5を実際にやるのは既存のBabelのまま
	- 空のtsファイルを一つおいて実際にコンパイルが通るかを検証
2. [既存のテストを1で変換したソースで動くようにパスを変える](https://github.com/almin/almin/pull/68/commits/721d9fec6066fdc4b091b851f962c1d3ef60ace9)
3. [1つ](https://github.com/almin/almin/pull/68/commits/d83ccc11cf69f807e99b54add0de7ba469953cfb)づつ`.js`を`.ts`へ[変換](https://github.com/almin/almin/pull/68/commits/27520ff7eecb834870d2095d6050e33983cefd06)していく
	- 一時的に型が解決できないものは`any`にして後から型を直す
	- コンパイルが通ってテストが通るなら動作的に問題ない
	- 実際に変換後のリリースではこれに起因するバグはなかったと思います
	- [Inroducing Almin 0.10.0: TypeScript, FlowType, Logger | Web Scratch](http://efcl.info/2017/03/08/almim0.10/ "Inroducing Almin 0.10.0: TypeScript, FlowType, Logger | Web Scratch")
	
という手順でJavaScript to TypeScriptを行いました。
この時の変更では、`test/`下のテストファイルはJavaScriptのままでした。

テストの方も複雑なケースが色々増えてきたので、TypeScriptに移行したいなーと思って最近移行できる環境を作りました。

## `test/` のTypeScript化

`src/`下はまとめて移行するスタイルでしたが、`test/`下は徐々に必要なタイミングで移行できるような形にしています。

テストコードは`src/`下とは違い、テストコード同士が互いに依存することはないため、1つのテストファイルごとに移行していけるはずです。

そのため、`src/`のやり方とは異なりTypeScriptの`allowJs`機能を使って移行しています。
次のPRで移行した手順が見られます(試行錯誤したのでキレイなコミットではない)

- [test(almin): setup TypeScript testing env by azu · Pull Request #232 · almin/almin](https://github.com/almin/almin/pull/232 "test(almin): setup TypeScript testing env by azu · Pull Request #232 · almin/almin")

実際にまとめると次のような方法で移行しています。

1. `test/`以下にテスト用の[`tsconfig.json`](https://github.com/almin/almin/blob/8a52b440b68693151b589415825fd6a26ebb6ada/packages/almin/test/tsconfig.json)を追加する
	- `src/`用のコンパイル設定を継承し、`"allowJs": true`にしたものを利用
	- `"allowJs": true`にすることで`.js`も`tsc`がコンパイルできるようになる
	- `src/**/*`と`test/**/*`をincludesし、テスト向けにテストコードとソースコードをコンパイルする
	- コンパイル結果、 `src`は`lib/src`へ、 `test/`は`lib/test`へ出力する
1. テストファイルが`import {Store} from "../lib/"`のソースコードをみているのを、`import {Store} from "../src/"`のソースコードを見るようにする
	- コンパイル前は`src/*.ts`を見るが、コンパイル後は`lib/src/*.js`を見ることになる
	- 相対パスなので、`lib/{src,test}/`に吐いてることでこれができてる
1. テストの実行前に`test/tsconfig.json`を使ってコンパイルする
	- `"test": "npm run build:test && npm run test:js"`という感じ

`test/tsconfig.json`:
	
```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "declaration": false
  },
  "include": [
    "../src/**/*",
    "./**/*"
  ]
}
```	

`./tsconfig.json`に`"rootDir": "./",`を設定しておけば、テスト用と普段の設定で出力先が同じになる。

これで`.ts`と`.js`のテストファイルが混在している状態でもテストが実行できるので、必要なタイミングで`.js`を`.ts`に変更していけます。

- [test(almin): cleanup by azu · Pull Request #248 · almin/almin](https://github.com/almin/almin/pull/248 "test(almin): cleanup by azu · Pull Request #248 · almin/almin")

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="ja" dir="ltr">alminのテスト TypeScriptに移行できる環境作ってあったけど、TypeScriptって(というかWebStormって)こんな混在してる状態でもちゃんと動くんだ<br>(TypeScript的にはAllowJSしてる、WebStorm普通に補完効いてて面白い) <a href="https://t.co/OUBcmOYjZv">pic.twitter.com/OUBcmOYjZv</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/886935717393215489">July 17, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

またすべてのテストがTypeScriptにはなってないのでコントリビュート待ってます。
基本的には`.ts`にして型エラーを潰していくだけの作業だと思います。

- [Convert test/ to TypeScript · Issue #144 · almin/almin](https://github.com/almin/almin/issues/144 "Convert test/ to TypeScript · Issue #144 · almin/almin")


すべてのテストが`.ts`になった後は、[ts-node/register](https://github.com/TypeStrong/ts-node "ts-node/register")などを使ってruntime hookで変換できるので`npm run build:test`が必要なくなります。

## おわり

`src/`のように依存関係があるものは[一気に](https://github.com/almin/almin/pull/68)TypeScriptへ変換した方が良いです。

一方、`test/`のようにそれぞれのファイルが独立しているものは、`--allowJs`を使うことで既存のJavaScriptを混ぜた状態でTypeScriptへ移行できるようになりました。

- [Compiler Options · TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html "Compiler Options · TypeScript")

最近だと`--checkJs`と`--allowJs`を使うことでJavaScriptファイルに対してJSDocを使ったType Checkができるようになっています。
これを上手く使えば、もっと緩やかに移行することができるかもしれません(JSDoc全部のパターン対応してないので今の所限定的)

- [TypeScript 2.3: Type-Checking JavaScript Files with --checkJs | Marius Schulz](https://blog.mariusschulz.com/2017/06/16/typescript-2-3-type-checking-javascript-files-with-checkjs "TypeScript 2.3: Type-Checking JavaScript Files with --checkJs | Marius Schulz")
- [Type Checking JavaScript Files · Microsoft/TypeScript Wiki](https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files "Type Checking JavaScript Files · Microsoft/TypeScript Wiki")

今回はライブラリだったので、テストカバレッジがかなり高い状態でした。
なのでテストがある程度保証してくれるので、一気にやっても壊れにくい状態でした。

UIなどテストがしにくい部分を含む実際のアプリケーションに後から型付けしていく場合は、次の記事などが参考になるかもしれません。

- [Refactoring 30000 lines of JS with types - Reaktor.com](https://www.reaktor.com/blog/refactoring-30000-lines-js-types/ "Refactoring 30000 lines of JS with types - Reaktor.com")
- [TypeScript at Slack – Several People Are Coding](https://slack.engineering/typescript-at-slack-a81307fa288d "TypeScript at Slack – Several People Are Coding")