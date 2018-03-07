---
title: "ECMAScriptの仕様/プロポーザルの調べ方を知る"
author: azu
layout: post
date : 2018-03-07T11:54
category: JavaScript
tags:
    - ECMAScript
    - JavaScript
    - Proposal

---

## はじめに

この文章は[asciidwango/js-primer: JavaScriptの入門書](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")で書いた[ECMAScript](https://asciidwango.github.io/js-primer/basic/ecmascript/ "ECMAScript · JavaScriptの入門書 #jsprimer")の章が元となっています。

また、[ECMAScriptの使い方](http://azu.github.io/slide/2018/node/ecmascript39.html "ECMAScriptの使い方")というスライドでどのようの話をしているのであわせて参照してみてください。

> スライド: [ECMAScriptの使い方](http://azu.github.io/slide/2018/node/ecmascript39.html "ECMAScriptの使い方")

## ECMAScript

ECMAScriptは[Ecma International][]という団体によって標準化されている仕様です。
Ecma InternationalはECMAScript以外にもC#やDartなどの標準化作業を行っています。
Ecma International中のTechnical Committee 39（TC39）という技術委員会が中心となって、ECMAScript仕様についてを議論しています。
この技術委員会はMicroSoft、Mozilla、Google、AppleといったブラウザベンダーやECMAScriptに関心のある企業などによって構成されます。

## ECMAScriptのバージョンの歴史

ここで、簡単にECMAScriptのバージョンの歴史を振り返ってみましょう。

<table>
<thead>
<tr>
<th>バージョン</th>
<th>リリース時期</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>1997年6月</td>
</tr>
<tr>
<td>2</td>
<td>1998年6月</td>
</tr>
<tr>
<td>3</td>
<td>1999年12月</td>
</tr>
<tr>
<td>4</td>
<td>破棄</td>
</tr>
<tr>
<td>5</td>
<td>2009年12月</td>
</tr>
<tr>
<td>5.1</td>
<td>2011年6月</td>
</tr>
<tr>
<td>2015</td>
<td>2015年6月</td>
</tr>
<tr>
<td>2016</td>
<td>2016年6月</td>
</tr>
<tr>
<td>2017</td>
<td>2017年6月</td>
</tr>
</tbody>
</table>

<!-- textlint-disable -->

ES5.1からES2015がでるまで4年もの歳月がかかっているの対して、ES2015以降は毎年リリースされています。
毎年安定したリリースを行えるようになったのは、ES2015以降は仕様策定プロセスの変更が行われたためです。

<!-- textlint-enable -->


## Living StandardとなるECMAScript

現在、ECMAScriptの仕様書のドラフトはGitHub上の[tc39/ecma262][]で管理されており日々更新されています。
そのため、本当の意味での最新のECMAScript仕様は<https://tc39.github.io/ecma262/>となります。
このように更新ごとにバージョン番号を付けずに、常に最新版を公開する仕様のことを**Living Standard**と呼びます。

ECMAScriptはLiving Stadardですが、これに加えてECMAScript 2017のようにバージョン番号をつけたものも公開されています。
このバージョン付きECMAScriptは、毎年決まった時期のドラフトを元にしたスナップショットのようなものです。

ブラウザなどに実際にJavaScriptとして実装される際には、Living StandardのECMAScriptを参照しています。
これは、ブラウザ自体も日々更新されるものであり、決まった時期にしかリリースされないバージョン付きよりもLiving Standardの方が適当であるためです。

## 仕様策定のプロセス

ES2015以前はすべての仕様の合意が取れるまで延々と議論を続けすべてが決まってからリリースされていました。
そのため、ES2015がリリースされるまでには4年もの歳月がかかり言語の進化が停滞していました。
この問題を解消するために、TC39は毎年リリースするためにECMAScriptの策定プロセスを変更しました。

この策定プロセスはES2015がリリース後に適応され、このプロセスで初めてリリースされたのがES2016となります。
ES2016以降では、次のような仕様策定のプロセスで議論を進めて仕様が決定されています。

仕様に追加する機能（API、構文など）をそれぞれ個別の**プロポーザル**（提案書）として進めていきます。
現在策定中のプロポーザルはGitHub上の[tc39/proposals][]に一覧が公開されています。
それぞれのプロポーザルは責任者である**チャンピオン**と**ステージ**（Stage）と呼ばれる`0`から`4`の5段階の状態を持ちます。

<table>
<thead>
<tr>
<th style="text-align:center">ステージ</th>
<th>ステージの概要</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td>アイデアの段階</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td>機能提案の段階</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td>機能の仕様書ドラフトを作成した段階</td>
</tr>
<tr>
<td style="text-align:center">3</td>
<td>仕様としては完成しており、ブラウザの実装やフィードバックを求める段階</td>
</tr>
<tr>
<td style="text-align:center">4</td>
<td>仕様策定が完了し、2つ以上の実装が存在している。<br />正式にECMAScriptにマージできる段階</td>
</tr>
</tbody>
</table>

このステージの詳細については[The TC39 Process](https://tc39.github.io/process-document/ "The TC39 Process")を参照してください。

2ヶ月に1度行われるTC39のミーティングにおいて、プロポーザルごとにステージを進めるかどうかを議論します。
このミーティングの議事録もGitHub上の[tc39/tc39-notes][]にて公開されています。
ステージ4となったプロポーザルはドラフト版である[tc39/ecma262][]へマージされます。
そして毎年の決まった時期にドラフト版を元にして`ECMAScript 20XX`としてリリースします。

この仕様策定プロセスの変更は、ECMAScriptに含まれる機能の形にも影響しています。

たとえば、`class`構文の策定は**最大限に最小のクラス**（maximally minimal classes）と呼ばれる形で提案されています。
これによりES2015で`class`構文が導入されましたが、クラスとして合意が取れる最低限の機能だけの状態で入りました。
その他のクラスの機能は別のプロポーザルとして提案され、ES2015以降に持ち越された形で議論が進められています。

このような合意が取れる最低限の形でプロポーザルを進めていくのには、ES4の苦い失敗が背景にあります。
ES4ではECMAScriptに多くの変更を入れることを試みましたが、TC39内でも意見が分かれ最終的に合意できませんでした。
これによりES4の策定に割いた数年分のリソースが無駄となってしまったという経緯があります。

詳しくはES2015のエディタであるAllenさんによる[プログラミング言語標準化](http://wirfs-brock.com/allen/files/papers/standpats-asianplop2016.pdf)というPaperにかかれています。

またES2016以降の策定プロセスでも、すべてのプロポーザルが仕様に入るわけではありません。
別の代替プロポーザルが出た場合や後方互換性と保てない場合などにプロポーザルの策定を中断する場合があります。
しかし、この場合でもプロポーザルという単位であるため策定作業の無駄は最小限で済みます。
このようにモジュール化されたプロポーザルは入れ替えがし易いという性質もあります。

## プロポーザルの機能を試す

ECMAScriptの策定プロセスのステージ4に「2つ以上の実装が存在している」という項目があります。
そのためブラウザのJavaScriptエンジンには、策定中のプロポーザルが実装されている場合があります。
多くの場合は試験的なフラグ付きで実装されておりフラグを有効化することで、試すことができるようになっています。

またTranspilerやPolyfillといった手段で、プロポーザルの機能をエミュレートできる場合があります。

Transpilerとは、新しい構文を既存の機能で再現できるようにソースコードを変換するツールのことです。
たとえば、ES2015で`class`構文が導入されましたが、ES5では`class`は予約語であるため構文エラーとなり実行することはできません。
Transpilerでは、`class`構文を含むソースコードを`function`キーワードを使い擬似的に再現するコードへ変換します。
Transpilerとしては[Babel][]や[TypeScript][]などが有名です。

Polyfillとは、新しい関数やメソッドなどの仕様を満たすような実装を提供するライブラリのことです。
たとえば、ES2016では`Array#inclues`というメソッドが追加されました。
構文とは異なり`Array#inclues`のようなメソッドはビルトインオブジェクトを書き換えることで実装できます。
Polyfillを提供するものとしては[core-js][]や[polyfill.io][]などが有名です。

注意点としてはTranspilerやPolyfillはあくまで既存の機能で新しい機能を再現を試みているだけに過ぎません。
そのため、既存の機能で再現ができないプロポーザル（機能）はTranspilerやPolyfillでは再現できません。
また、完全な再現はできていないことがあるためTranspilerやPolyfillを新しい機能を学ぶために使うべきではありません。

<!-- Notes: バージョンが西暦となった理由

実際に各ブラウザなどはECMAScriptを実装していますが、このときに参照するのは基本的にLiving StandardであるECMAScriptです。
また、PolyfillやTranspilerといった手段で、タグ付けされたECMAScript 20XXがリリースされる前にその機能が利用できることも多いです。
ECMAScriptのバージョンとしてES6ではなくES2015のように西暦をバージョンとして使うようになったのも、Living Standardを意識しての試みです。

-->

## 仕様や策定プロセスを知る意味

こうしたECMAScriptという仕様や策定プロセスを知る意味は何があるのでしょうか？
主に次のような理由で知る意味があると考えています。

- 言語を学ぶため
- 言語が進化しているため
- 情報の正しい状態を調べるため

### 言語を学ぶため

もっとも単純な理由はJavaScriptという言語そのものを学ぶためです。
言語の詳細を知りたい場合にはECMAScriptという仕様を参照できます。

しかしながら、JavaScriptにおいては言語機能に関しては[MDN Web Docs][]という優れたリファレンスサイトなどがあります。
そのため、使い方を覚えたいなどの範囲ではECMAScriptの仕様そのものを参照する機会は少ないでしょう。

### 言語が進化しているため

ECMAScriptはLiving Standardであり、日々更新されています。
これは、言語仕様に新しい機能や修正などが常に行われていることを表しています。

ECMAScriptは後方互換性を尊重するため、今学んでいることが無駄になるわけではありません。
しかしながら言語自体も進化していることは意識しておくとよいでしょう。

ECMAScriptのプロポーザル（機能）は問題を解決するために提案されます。
そのプロポーザルがECMAScriptにマージされ利用できる場合、その機能が何を解決するために導入されたのか知ることは大切です。
その際には、ECMAScriptの策定プロセスを知っておくことが調べることに役立ちます。

この仕様はなぜこうなったのかということを知りたいと思ったときに、その機能がどのような経緯で入ったのかを調べる手段をもつことは大切です。
特にES2015以降は策定プロセスもGitHubを利用したオープンなものとなり、過去の記録なども探しやすくなっています。

### 情報の正しい状態を調べるため

JavaScriptは幅広く使われている言語であるため、世の中には膨大な情報があります。
そして、検索して見つかる情報には正しいものや間違ったものが混在しています。

その中においてECMAScriptの仕様やその策定中のプロポーザルに関する情報は状態が明確です。
基本的にECMAScriptの仕様に入ったものは、後方互換性を維持するために破壊的変更は殆ど行なえません。
プロポーザルはステージという明示された状態があり、ステージ4未満の場合はまだ安定していないことが分かります。

そのため、問題を見つけた際に該当する仕様やプロポーザルを確認してみることは重要です。

これはECMAScriptにかぎらず、ウェブやブラウザに関する情報に関しては同じことがいえます。
ブラウザ関してはHTML、DOM API、CSSなどもオープンな仕様とそれぞれ策定プロセスが存在しています。

### ここまでのまとめ

JavaScriptと一言にいってもECMAScript、ブラウザ、Node.js、WebAssembly、WebGL、WebRTCなど幅広い分野があります。
そのためすべてのことを知っている必要はありませんし、知っている人もおそらくいないでしょう。
このような状況下においては知識そのものよりも、それについて知りたいと思ったときに調べる方法を持っていることが大切です。

なにごとも突然全く新しい概念が増えるわけではなく、ものごとには過程が存在します。
ECMAScriptにおいては策定プロセスという形でどのような段階であるかが公開されています。
つまり、仕様にいきなり新しい機能が増えるのではなくプロポーザルという段階を踏んでいます。

日々変化しているソフトウェアにおいては、自身に適切な調べ方をもつことが大切です。

## 具体例

話しだけ見てもよくわからないと思うので、ここからは具体的な使い方の話です。

どのような場合に仕様やプロポーザルを調べたりするのか、またどのように調べるかについてです。

## 実装が仕様に準拠しているかを調べたい

あるブラウザ/JavaScriptエンジンの挙動が仕様なのかを調べたいときがあります。

それぞれのメジャーブラウザはJavaScriptエンジンを各自実装しています。
そのため、どれかのブラウザが間違った実装だった場合に結果を比較することで分かる可能性があります。

[eshost-cli](https://github.com/bterlson/eshost-cli)というツールを使うことで、ローカルにインストール済みのJavaScriptエンジンでの実行結果をまとめて出力してくれます。
それぞれのJavaScriptエンジンをインストールするには[jsvu](https://github.com/GoogleChromeLabs/jsvu)を使うのが簡単です。

- [GoogleChromeLabs/jsvu: JavaScript (engine) Version Updater](https://github.com/GoogleChromeLabs/jsvu)
	- 主要なJavaScriptエンジンをまとめてインストール
	- macOSならChakraを含めてほぼ対応できる
- [bterlson/eshost-cli: Run ECMAScript code uniformly across any ECMAScript host](https://github.com/bterlson/eshost-cli)
	- 指定したJavaScriptエンジンでコードを実行できる

次のように各種JavaScriptエンジンをインストールできます。

```
# jsvuとeshostをインストール
npm install jsvu eshost-cli -g
# インストール先
export PATH="${HOME}/.jsvu:${PATH}"
# JavaScriptエンジンをまとめてインストールしてくれる
jsvu
# インストールしたJavaScriptエンジンをeshotに登録
eshost --add 'Chakra' ch ~/.jsvu/chakra
eshost --add 'JavaScriptCore' jsc ~/.jsvu/javascriptcore
eshost --add 'SpiderMonkey' jsshell ~/.jsvu/spidermonkey
eshost --add 'V8' d8 ~/.jsvu/v8
```

後は、eshostでコードを実行するだけです。
次のコードではV8だけ結果が異なることが分かります。

```
# eshotでコードを実行
eshost -e 'new RegExp("\n").toString()'
#### Chakra
/\n/

#### SpiderMonkey
/\n/

#### JavaScriptCore
/\n/

#### V8
/
/
```

このようにECMAScriptレベルのコードでJavaScriptエンジンの結果に差異がある場合は、大抵は実装依存の問題か実装の間違いといったケースになります。

## ECMAScriptの仕様を読む

あるコードの実行結果が正しいのかを検証するためにECMAScriptの仕様書を読むことが参考になる場合があります。ECMAScriptの仕様書は2箇所にありますが基本的にはLiving Standard版を参照するのがよいでしょう(特定のバージョンに関するときはスナップショット版を参照します)

- スナップショット版: <https://www.ecma-international.org/ecma-262/>
- Living Standard版: <https://tc39.github.io/ecma262/>

ECMAScriptの仕様を読む機会はそこまで多くないと思いますが、Transpilerのような変換したコードの結果が異なる場合は仕様そのものを見てみるとどこにバグを報告すれば良いのかが明確になります。例えば、次の例はクラスのメソッド定義の挙動がBabelとTypeScriptで異なるケースです。

### 例: BabelとTypeScriptのクラス

次のコードはBabelとTypeScriptでES5相当への変換と実行結果が異なります。

```js
class MyClass {
    method() { }
}
console.log(Object.keys(MyClass.prototype));
```

#### Babel(preset-envのデフォルト)

```js
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyClass = function () {
    function MyClass() {
        _classCallCheck(this, MyClass);
    }

    _createClass(MyClass, [{
        key: "method",
        value: function method() {}
    }]);

    return MyClass;
}();

console.log(Object.keys(MyClass.prototype)); // => []
```

#### TypeScript(target:es5)

```js
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.method = function () { };
    return MyClass;
}());
var instance = new MyClass();
console.log(Object.keys(MyClass.prototype)); // => ["method"]
```

変換結果も異なりますが、実行結果（コンソールへの出力)も異なります。

- Babelはメソッド（プロパティ）は列挙されないので `[]`
- TypeSdriptはメソッド（プロパティ）が列挙されるので `["method"]`

このようなときにどちらが仕様準拠の挙動なのかはを仕様を調べてみましょう。

### 仕様書の調べ方

先ほども書きましたが、ECMAScriptにはLiving Standardの<https://tc39.github.io/ecma262/>とスナップショット版の<https://www.ecma-international.org/publications/standards/Ecma-262.htm>があります。
このケースではどちらでも良いですが、<https://tc39.github.io/ecma262/>の方が使いやすいこともあるので、こちらで見ていきます。

今回の目的は「`class`構文のメソッド定義の仕方を調べたい」です。
このような構文自体の挙動を調べたい場合は、次のような流れで探していきます。

大きな流れ

1. `class` というSyntaxの定義を探す
2. `class`のRuntime Semantics(Syntaxにはそれぞれ実行時に何をするかという定義がある)
3. Runtime Semanticsでそれぞれの `method(){}` がどのように定義されているかを見ていく
4. 今回は列挙されているかなので `enumerable` を調べる

仕様書を上記の流れで調べている動画を撮ったので参考にしてみてください。

<iframe width="560" height="315" src="https://www.youtube.com/embed/xT8GupiJIio" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

仕様書を見た結果、クラスのメソッドは必ず`enumerable`を`false`で定義されています。
そのため、Babelは仕様に準拠するためにdefinePropertyで列挙しないように(`enumerable`を`false`)定義していますが、
TypeScriptは単純にプロトタイプオブジェクトのメソッドを追加してるだけなので列挙されています。

このIssueは既にありますが、パフォーマンスの問題などあるので一概にどちらが良いとも言えません。
(Babelもlooseで似たような変換にできます)

- [Method class enumerable · Issue #15038 · Microsoft/TypeScript](https://github.com/Microsoft/TypeScript/issues/15038 "Method class enumerable · Issue #15038 · Microsoft/TypeScript")

### ECMAScriptの読み方の補助資料

ECMAScriptの仕様書は巨大(800ページ以上)なので、基本的に上から下に読んでいくのは難しいです。
そのため、仕様書には目次検索、Pin（ブックマーク）、各リンクの逆引きなど便利な機能があるのでそれを活用して気になったものを読むのが良さそうです。

また、仕様書内で使われている記号や短縮記法などが[Notational Conventions](https://tc39.github.io/ecma262/#sec-notational-conventions "Notational Conventions")にかかれています。また、次のサイトも仕様書を読むのに役立ちます。

- [How to Read the ECMAScript Specification](https://timothygu.me/es-howto/ "How to Read the ECMAScript Specification")
	- ECMAScriptの読み方について解説してる
	- `[[内部プロパティ]]`やAbstract Operator、Runtime semanticsなど仕様書に出てくる記号や読み方を解説してる
- [anba/es6draft: ECMAScript 2015 (ECMA-262 6th Edition) compiler and runtime](https://github.com/anba/es6draft "anba/es6draft: ECMAScript 2015 (ECMA-262 6th Edition) compiler and runtime")
	- ECMAScriptのJava実装
	- リファレンス実装的に仕様書と対応したアルゴリズムステップで実装されているので読みやすい
	- [ClassDefinitionEvaluation](https://github.com/anba/es6draft/blob/7e196e8a1482384ca83946998f5fbd22068b47c6/src/main/java/com/github/anba/es6draft/compiler/DefaultCodeGenerator.java#L1609-L1825 "ClassDefinitionEvaluation")の実装もそのままある

今回は構文を見ていましたが、メソッドなど実際にJavaScriptのAPIに存在するものはもっと読みやすいです。
[String.prototype.includes ( searchString [ , position ] )](https://tc39.github.io/ecma262/#sec-string.prototype.includes "String.prototype.includes ( searchString [ , position ] )")のように仕様がほぼそのまま実行ステップになっているので比較的単純です。

## 例: [js-primer](https://github.com/asciidwango/js-primer "js-primer")の場合

- サイト: [この書籍について · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/ "この書籍について · JavaScriptの入門書 #jsprimer")
- リポジトリ: [github.com/asciidwango/js-primer](https://github.com/asciidwango/js-primer)

最近、[js-primer](https://github.com/asciidwango/js-primer "js-primer")というES21015以降を基本としたJavaScriptの入門書を書いています。
この書籍はLiving StandardであるECMAScriptに追従するように書いています。

----

[![inline, repo-actions-watch.png](http://azu.github.io/slide/2018/node/img/repo-actions-watch.png)](https://github.com/asciidwango/js-primer)

興味ある人はStarやWatchしてください。

----

この書籍では、どのように説明するべきか迷った場合はECMAScriptを参照しています。
例えば用語の問題や、説明するためにどのような表現を使うべきか、実際の仕様的な動作を元にしています。

単純に今存在するブラウザなどの挙動を元にすれば、ほとんどのケースでは問題はありません。
ブラウザはできる限り仕様に準拠した実装にするためです。

しかし、その機能の仕組みを理解するとなるともう少し深掘りしてから解説を書く必要がでてきます。
なぜなら同じ結果になるような方法が考えられるためです。

そのような際には仕様書ではどのように定義しているのかを参考にしています。


### 例1: [関数とthis](https://asciidwango.github.io/js-primer/basic/function-this/ "関数とthis · JavaScriptの入門書 #jsprimer")の表現 – Arrow Function

> `function`キーワードで定義した関数は呼び出し時に、ベースオブジェクトが暗黙的な引数のように`this`の値として渡されます。
> 一方、Arrow Functionの関数は呼び出し時に`this`を受け取らないため、定義時のArrow Functionにおける`this`の参照先が静的に決定されます。
> -- [関数とthis · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/function-this/ "関数とthis · JavaScriptの入門書 #jsprimer")

この部分だけ切り出してもちょっと分かりにくいですが、よくあるような「Arrow Functionは`this`をbindする」という説明にはしていません。
仕様ではArrowFunctionは`[[ThisValue]]`を持たないLexicalEnvironmentという定義になっていて、Arrow Functionが`this`を持つ(bind)わけではないからです。
そのため、「Arrow Functionは`this`をbindする」というよりは、「Arrow Functionは`this`を持たないので移譲する」と言ったほうが仕様に近いかもしれません。

この辺の説明はホントややこしいので、詳細は[ECMAScript 2015以降のJavaScriptの`this`を理解する | Web Scratch](http://efcl.info/2018/01/04/what-is-this/ "ECMAScript 2015以降のJavaScriptの`this`を理解する | Web Scratch")に譲ります。

実際に書いているときには以下のIssueのようにメモしながら、どのような表現が良いのかを考えながら書いています。

- [関数とthis · Issue #316 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/316 "関数とthis · Issue #316 · asciidwango/js-primer")

## 例2: [関数とthis](https://asciidwango.github.io/js-primer/basic/function-this/ "関数とthis · JavaScriptの入門書 #jsprimer")の表現 – `this`の値

また`this`の話ですが、`this`の解説をするためにあらゆる場所の`this`の挙動を調べていました。
`this`は普通はクラスぐらいにしか使いませんが、JavaScriptでは`this`はどこにでも書けます。
また、その時の`this`の値はコンテキスト変わります。

最初はブラウザやNode.jsで実行しながら調べていましたが、次の"Module"の挙動がブラウザによって違いました。
Chromeは`Window`、 その他のブラウザは`undefined`となりました。

```html
<script type="module">
const fn = () => this;
console.log(fn());
</script>
```

最初はChromeだけで試していたので、なぜ`Window`を返すのかが分かりませんでした。

Arrow Functionにおける`this`は外側のスコープの`this`を参照します。
そのため、次のようにトップレベルの`this`とトップレベルのArrow Functionにおける`this`は同じになるはずです。

```html
<script type="module">
	console.log(this);// => undefined
    const fn = () => this;
    console.log(fn() === this); // => true
</script>
```

"Module"コンテキストのトップレベル`this`は常に`undefined`ということは調べて知っていました。

- [ES6 moduleのtop levelにある`this`の値は何になるのか?](http://efcl.info/2015/05/06/this-is-es6-module/ "ES6 moduleのtop levelにある`this`の値は何になるのか? | Web Scratch")

なので、最初のコードは`undefined`になるはずで、何か自分の仕様の解釈が間違っているのかなと思いました。

他のブラウザでの挙動も調べてみようと思い、`this`の値の一覧を出すサイトを作りました。

- [What is `this` value in JavaScript?](https://azu.github.io/what-is-this/ "What is `this` value in JavaScript?")

ここでChromeが何かおかしいのではないかと思いバグ報告をしました。

- [791334 - `this` in top level Arrow Function in Module Context should be `undefined` - chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=791334 "791334 - `this` in top level Arrow Function in Module Context should be `undefined` - chromium - Monorail")

結果的にはChromeの問題だったため、Chrome 65で修正されています。

## プロポーザルのステータスを知りたい

プロポーザルの今のステータスを知りたい場合があります。
例えばあるライブラリがプロポーザル段階の書き方をREADMEに書いていたり、記事で「これが最新版」のような記述があった場合に、実際のステータスを知ることで異なる見かたができるようになります。

最初に紹介していたようにプロポーザルのステータスは0から4まであり、4以外は変更や廃止の可能性があるステータスとなります。

これはES2015以前ではなかった事例の１つです。なぜならES2015以前は策定プロセスが現在と異なるため、個別のプロポーザルのステータスを知る意味は殆どなかったためです。

これは[JavaScript情報ってなんだっけ?](http://azu.github.io/slide/2016/jser5years/javascript-information.html "JavaScript情報ってなんだっけ?")でも触れています、比較的新しい悩みの一種となります。

プロポーザルの置き場所は決まっているため、ステータスの数値やTranspilerの実装は次のページを見ると確認できます。

- [tc39/proposals: Tracking ECMAScript Proposals](https://github.com/tc39/proposals "tc39/proposals: Tracking ECMAScript Proposals")
	- ECMAScriptのプロポーザル一覧
- [babel/proposals: ✍️ Tracking the status of Babel's implementation of TC39 proposals](https://github.com/babel/proposals "babel/proposals: ✍️ Tracking the status of Babel&#39;s implementation of TC39 proposals")
	- Babelの実装との対応表


## このプロポーザルって進んでるの?

ステータスは現時点での値にすぎないため、どちらかというとそのステータスが変化しているかを知りたい場合があると思います。

プロポーザルのステータスの変化を知りたい場合は次のサイトなどを購読するのが簡単でしょう。
また、[tc39/proposals][]もただのGitHubリポジトリなのでそちらをWatchするのもいいでしょう。

- [ECMAScript Daily](https://ecmascript-daily.github.io/ "ECMAScript Daily")
	- ECMAScript関係のニュースブログ(@azu)
- [EcmaScript.in | Stay updated about EcmaScript proposal changes](http://ecmascript.in/ "EcmaScript.in | Stay updated about EcmaScript proposal changes")
	- プロポーザルのStage変化の通知メール
- [2ality – JavaScript and more](http://2ality.com/index.html "2ality – JavaScript and more")
	- プロポーザルの解説


## このプロポーザルはなぜ止まっているの?

興味があるプロポーザルがある場合になぜそのプロポーザルのステータスが進まないかということに興味を持つひともいるでしょう。

プロポーザルにはそれぞれチャンピオンとなる責任者いて、そのチャンピオンが策定作業を進めることで初めてステージが進みます。
[tc39/proposals][] にかかれている :rocket: はプロポーザルのステージをチャンピオンが進める意志がある状態かを表しています。(頻繁に更新されるためあくまで参考情報に過ぎません)

![inline, rockets.png](http://azu.github.io/slide/2018/node/img/rockets.png)

:rocket: マークがついていない場合やしばらくステージが更新されていないプロポーザルは何かしらの課題や問題を抱えています。
ここではそれのプロポーザルがどのような課題を持っていて、ステージが更新されないのかを見ていきます。

### 例: [tc39/proposal-global](https://github.com/tc39/proposal-global "tc39/proposal-global")

`global`はグローバルオブジェクトを取得するプロポーザルです。
現在(2018年2月の段階)はStage 3で止まっています。

なぜ止まっているかの理由はREADMEに書いています。

> however, due to [web compatibility concerns](https://github.com/tc39/proposal-global/issues/20), it is on hold pending a new global identifier name.


[global breaks flickr.com · Issue #20 · tc39/proposal-global](https://github.com/tc39/proposal-global/issues/20 "global breaks flickr.com · Issue #20 · tc39/proposal-global")のIssueで具体的に話し合われています。
このIssueやREADMEをみることで、`global`という名前によって壊れるサイトがいる問題がありこれが理由で止まっていることが割ります。

----

#### Tips

- プロポーザルはそれぞれGitHubリポジトリを持っている
- プロポーザルのIssueには課題が書かれている
- ウェブ互換性の問題については基本的にメトリクスデータを元に話を進める
	- 壊れるウェブサイトはn%あるか
	- [Chrome Platform Status](https://www.chromestatus.com/metrics/feature/popularity "Chrome Platform Status")、[Microsoft Edge Platform Data](https://developer.microsoft.com/en-us/microsoft-edge/platform/data/ "Microsoft Edge Platform Data - Microsoft Edge Development")、[Firefox Data](https://blog.mozilla.org/data/ "Firefox Data")


----


### 例: [tc39/proposal-decorators](https://github.com/tc39/proposal-decorators "tc39/proposal-decorators")

`proposal-decorators`はデコレーターを導入するプロポーザルです。
現時点(2018年3月)ではStage 2となっています。

[ECMAScript proposal updates @ 2016-07 | ECMAScript Daily](https://ecmascript-daily.github.io/2016/07/30/last-minutes-proposals-changes "ECMAScript proposal updates @ 2016-07 | ECMAScript Daily")というプロポーザルのステージ更新の記事を見ると、2016年7月からずっとステージ2となっていることが分かります。

ここではデコレーターにはどのような問題がありステージが更新されていないのかを調べてみましょう。
プロポーザルは2ヶ月に1度行われるTC39のミーティングでステージを更新をするかを判断します。

つまり、[tc39/tc39-notes][]に公開されているミーティングのログを見ることでわかりそうです。
それぞれのミーティングはアジェンダが事前に用意されており、事前に何を話し合うかが決められています(時間は有限であるため)

このアジェンダは[tc39/agendas](https://github.com/tc39/agendas "tc39/agendas")で公開されているので、まずはアジェンダからデコレーターについて議論した月のミーティングを探してみます。

- 何が原因で進んでないのかを調べる
- => TC39のミーティングでどのような議論が行われてるのかを調べる
- => 何が課題となっているかが話し合われているはず


[tc39/agendas](https://github.com/tc39/agendas "tc39/agendas")（議事録のアジェンダ）を"[Decorators](https://github.com/tc39/agendas/search?o=desc&q=Decorators&s=indexed&type=&utf8=%E2%9C%93 "Search · Decorators")"で検索すると、[agendas/2018/01.md](https://github.com/tc39/agendas/blob/385085dead6e4f08a2100eccc7b8738dec97f236/2018/01.md "agendas/2018/01.md")にも議題となったことが分かります。


![right, decorators-agenda.png](http://azu.github.io/slide/2018/node/img/decorators-agenda.png)


このアジェンダと同じ月のミーティングノートを[tc39/tc39-notes][]で探すと[2018-01/summary.md](https://github.com/rwaldron/tc39-notes/blob/master/es8/2018-01/summary.md "2018-01/summary.md")が見つかります。
ミーティングの議事録事態は長いですが、`summary.md`にはその内容がまとまっているのでまずはそちらを見てみます。

![inline, summary-decorator.png](http://azu.github.io/slide/2018/node/img/summary-decorator.png)

デコレーターでの議事録や関連するスライドを見てみると、幾つかの課題がその課題を解決するまでステージ3にはできないという話が書かれています。

- [13.v.c Decorators: towards Stage 3](https://github.com/rwaldron/tc39-notes/blob/master/es8/2018-01/jan-25.md#13vc-decorators-towards-stage-3 "13.v.c Decorators: towards Stage 3")という議論が2018年1月に行われている
- [Decorators: Towards Stage 3 - Google スライド](https://docs.google.com/presentation/d/1g6hrJp_nk_OeapuPXlkE4D_31OZbz4wQbXuIagsyoUI/edit#slide=id.p "Decorators: Towards Stage 3 - Google スライド")
	- Stage 3に向けて何をサポートし、何をサポートしないかをはっきりさせる
	- 他のクラスのプロポーザル(hard private)との協調性についての課題があり調整している
	- 実装者、テスト作成者、ライブラリ作者に対しても意見を求めてる
	- 次のミーティング(3月)までにステークホルダーにアプローチする

このような課題があるためデコレーターはまだステージ2となっています。
このようなことがミーティングログを見ることでわかります。

----

## Tips

- Stage 1までアイデアや実験なのでプロポーザル間でも重複する
- Stage 2+あたりからプロポーザル間での協調的な仕様を検討する
	- [Revisiting mixins-vs-protocols proposal](https://github.com/rwaldron/tc39-notes/blob/master/es8/2018-01/jan-24.md#revisiting-mixins-vs-protocols-proposal "Revisiting mixins-vs-protocols proposal")
- Decoratorはclass field、privateなど色々関係する
- 最近のDecoratorの変更は他のプロポーザルとの協調性やDecoratorが目指す範囲を確定する作業
	- 今まで雰囲気で動いてた部分を明示的に例外を投げるようにするなど

----

## おわりに

最初に述べたようにここに書いてあることをすべて知る必要性はありません。
具体的に気になることを見つけたときにそれを調べる手段にたどり着ければ問題ありません。

また、ECMAScriptがLiving Standardであるという話をしましたが、Living Standardである以上その策定プロセスなども細かく修正されていきます。
以前、[ECMAScriptの仕様策定に関するカンニングペーパー | Web Scratch](http://efcl.info/2015/10/18/ecmascript-paper/ "ECMAScriptの仕様策定に関するカンニングペーパー | Web Scratch")で書いたものはES2015時点のものでしたが、現在も細かくプロセスが変わったりより分かりやすくなっています。(ミーティングログにサマリが増えたり、[Contributing to ECMAScript](https://github.com/tc39/ecma262/blob/master/CONTRIBUTING.md "Contributing to ECMAScript")などのドキュメントが増えたりなど)

ECMAScriptはこのようなオープンな仕組みであり、同じくブラウザに乗る機能も現在はオープンな仕様や議論を元にしていることが多いです(例外はあります)。
そのため、仕様やその仕様がどのような経緯で実装されたかといった事実を調べることは特別に難しいことではありません。
このような状況においては、推測だけで行動したり推測だけの意見に影響を受けるよりも、事実を確認して見るほうが簡単な場合もあります。

知識そのものよりも調べ方を知ることが重要なのかもしれません。

## リンクまとめ

この記事で紹介した簡単なリンクのまとめです。

- [js-primer](https://github.com/asciidwango/js-primer)版: [ECMAScript · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/ecmascript/ "ECMAScript · JavaScriptの入門書 #jsprimer")
- ECMAScript関係の情報: [@EcmascriptDaily](https://twitter.com/ecmascriptdaily "@EcmascriptDaily")をフォローしておけばとりあえず流れてくる
- ECMAScriptのプロポーザル: [tc39/tc39-notes][]、[tc39/proposals][]に殆どの情報がある
- ECMAScriptの策定プロセス: [The TC39 Process](https://tc39.github.io/process-document/ "The TC39 Process")に書かれてる
- ECMAScriptの仕様: [tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")にLiving Standard

[Ecma International]: http://www.ecma-international.org/  "Ecma International"
[Standard ECMA-262]: https://www.ecma-international.org/publications/standards/Ecma-262.htm "Standard ECMA-262"
[tc39/proposals]: https://github.com/tc39/proposals  "tc39/proposals: Tracking ECMAScript Proposals"
[tc39/ecma262]: https://github.com/tc39/ecma262  "tc39/ecma262: Status, process, and documents for ECMA262"
[tc39/tc39-notes]: https://github.com/tc39/tc39-notes  "tc39/tc39-notes: TC39 Meeting Notes"
[Babel]: https://babeljs.io/  "Babel · The compiler for writing next generation JavaScript"
[TypeScript]: https://www.typescriptlang.org/  "TypeScript - JavaScript that scales."
[core-js]: https://github.com/zloirock/core-js  "zloirock/core-js: Standard Library"
[polyfill.io]: https://polyfill.io/v2/docs/  "Polyfill service"
[MDN Web Docs]: https://developer.mozilla.org/ja/  "MDN Web Docs"
