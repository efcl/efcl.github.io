---
title: "ECMAScript 2019の議事録を全部読む #TC39MTG 読書会をしました"
author: azu
layout: post
date : 2019-04-08T09:46
category: JavaScript
tags:
    - ECMAScript
    - JavaScript

---

ECMAScriptの仕様策定に関する行うTC39のミーティングログはすべて公開されています。

- [rwaldron/tc39-notes: TC39 Meeting Notes](https://github.com/rwaldron/tc39-notes)

ECMAScript は 毎年5-6月あたりに新しいバージョンが公開されます。
新しいバージョンに入る仕様は、毎年1月のミーティングで確定します。(なのでES2019はもう決まっています。)
そのため、ECMAScript 2019の仕様に関する議事録は2018-03 から 2019-01 の6回分になります。(2ヶ月に1度開催される)

- [https://github.com/rwaldron/tc39-notes/tree/master/es9](https://github.com/rwaldron/tc39-notes/tree/master/es9)

このログを読みながら、進んでいるプロポーザルや進まなかったプロポーザルについてを見ていく読書会をしました。
なぜそのStageになっているのかという、数値だけではわからない背景についてをログから読み取ることが目的です。

読書会のアジェンダ:

- [2019年4月6日(土): #TC39MTG ECMAScript議事録の読書会](https://gist.github.com/azu/a366e075cbafe24281197221e438d98d)

## ECMAScript 2019の間のProposalのStageの変更点

[ECMAScript Proposal Diff Tool](https://azu.github.io/ecmascript-proposals-json/)という特定の日付間で、ECMAScriptのProposalのStageの変化を見るツールを書いたので、その結果を次のgistにまとめてあります。
扱う範囲はES2019に関連する変更が入ってそうな2018-02-01 - 2019-02-01をまとめてあります。

- 新しくできたProposal
- Stageが更新されたProposal
- Stageが更新されなかったProposal

についてまとめてあります。

一年の間に提案から仕様策定まで完了したのは、`Object.fromEntries`とWell-formed `JSON.stringify`の2つだけです。
JSON supersetやOptional catch bindingなども仕様策定が完了しES2019に入りましたが提案からは2年ぐらいかかっています。
`BigInt`やDecoratorなど大きな仕様は1年の間にStageが変動していないこともわかります。
ZonesとかDecimalなどは最後にミーティングで話されたのも数年前なので放置されているようです。

<script src="https://gist.github.com/azu/da64a0a28ef958a4f7cea20d5237bb6f.js"></script>

これは2019年2月時点のStageなので、最新の状況は[tc39/proposals: Tracking ECMAScript Proposals](https://github.com/tc39/proposals)をみてください。

## 読書会のログ

10:00から18:00ぐらいまで読書会をやっていたのですが、読めたのは次の3つのミーティングまででした。

- [tc39-notes/es9/2018-03 at master · rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes/tree/master/es9/2018-03)
- [tc39-notes/es9/2018-05 at master · rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes/tree/master/es9/2018-05)
- [tc39-notes/es9/2018-07 at master · rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes/tree/master/es9/2018-07)

今回読めたのは、合計で700kbぐらいのログのようでした。

![File size of tc39](https://efcl.info/wp-content/uploads/2019/04/08-1554685321.png)

また、Twitterのログは[#TC39MTG](https://twitter.com/search?q=%23TC39MTG&src=typd)に投稿してあります。

[tc39-notes](https://github.com/rwaldron/tc39-notes)の読書会に興味がある人は[#TC39MTG](https://twitter.com/search?q=%23TC39MTG&src=typd)か[@azu_re](https://twitter.com/azu_re)までお知らせください。
結構モチベーションの維持が難しいやつ(1つのログに2-3時間かかるため)なので、イベント的にやったほうが良さそうな気がします。

まえはイベント化してましたが、Doorkeeper有料になってからやらなくなってしまってました。

- [TC39 MTG Notes MTG | Doorkeeper](https://tc39-mtg.doorkeeper.jp/)

以下は今回の読書会でのメモ書きです

----

## [tc39-notes/es9/2018-03 at master · rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes/tree/master/es9/2018-03)

###  標準ライブラリの話

- [9.i.v Open-ended discussion: How should we evolve the JavaScript standard library over time?](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-20.md#9iv-open-ended-discussion-how-should-we-evolve-the-javascript-standard-library-over-time)
- lodashとか細かいパッケージが膨大
- ユーザー空間で標準ライブラリはとても難しい
- Array#flatの失敗などもある
- std: に関連するモチベーションとしてNodeでは `http2` のような名前がすでに使われている
- なので `std:http2` のような特別な名前空間が欲しいというモチベーションがある

### [10.i.d Debugger operands for stage 1](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-20.md#10id-debugger-operands-for-stage-1)

- [bmeck/proposal-debugger-operands: Adding an optional operand to the DebuggerStatement production of JS](https://github.com/bmeck/proposal-debugger-operands)


```js
const log = (v) => {
  debugger { group: 'logging' };
  console.log(v);
};
```

> WH: The spec doesn't say what the dev tools should do. If an IDE wants to label a break point with its label, that's its prerogative to do so.

- 仕様は開発者ツールが何をするべきかを述べてはいけない
- Debuggerを強化することには賛成だけど、ユースケースが明確じゃない


### [10.i.e Logical Assignment Operators for Stage 1](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-20.md#10ie-logical-assignment-operators-for-stage-1)

- `||=` の構文
- JavaScriptでは falsy の範囲が他よりも広いのでちょっと難しい

> JRL: My main use case is to use it as the assignment operator, and for not repeating myself when doing deep assignments.

- ちょっと複雑になりすぎる。
- ショートサーキットを作るべきユースケースが少ない

### [10.i.i Update on improved TC39 documentation efforts](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-20.md#10ii-update-on-improved-tc39-documentation-efforts)

- https://docs.google.com/presentation/d/1C4mkRNI3WjcrASFD_MtGRQMLErN5tCW7rLlxyTmLHxc/edit#slide=id.g35a9754949_0_129
- どうやってECMAScriptの情報得てる?
- TC39/ECMAScriptについてユーザーインタビューと調査
- [TC39 "How We Work" Research Doc - Google ドキュメント](https://docs.google.com/document/d/1yHa2V0owollcA-JHgXbTfELKW7c9fL1QitXgrfyNLWE/edit)
- かなり面白い調査
- 反射的な反応がtwitterでは多いけど、それをどうガイドする?
- Babelの[babel/proposals: ✍️ Tracking the status of Babel's implementation of TC39 proposals (may be out of date)](https://github.com/babel/proposals)もこれの一つのアプローチ


### [10.ii.b Richer Keys for stage 1](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-21.md#10iib-richer-keys-for-stage-1)

- [Richer keys - Google スライド](https://docs.google.com/presentation/d/1q3CGeXqskL1gHTATH_VE9Dhj0VGTIAOzJ1cR0dYqDBk/edit#slide=id.p)
- 複数の値から複合キーを作る

> BFS: Correct. The order is important and duplicates are allowed

- orderが重要
- WeakMapのGCのやり方重要になる。
- 今はシンボルのtable一発なので、複合キーだと複数となる
- 今の仕様ではWeakにおけるComsite Keyは難しいので仕様に入れる意味はある

### [10.iv.b JavaScript Classes 1.1](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-21.md#10ivb-javascript-classes-11)

- classは1996年11月のTC39ミーティングで提案された
- [max-min classes 1.1.pdf](https://www.dropbox.com/s/6krev2pzr55h5i4/max-min%20classes%201.1.pdf?dl=0)
- クラス内にクラスを書いた場合はshallowing
- この提案にはpublicとprivateに一貫性のある構文を提供してる
- けどネストケースに懸念がある

```js
class {
  [this.foo]() {...}
  x = this.foo;
}
```

- `[exp]` という構文自体はOK

> Class syntax is describing a pretty compound construct with a pretty flat context structure.

- クラスはフラットなコンテキスト構造を持つかなり複合的な構成を記述する構文
- `#` は新しい `_` (private proposalの方)

### [BigInt status update](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-22.md#bigint-status-update)

- BigIntは仕様がでかいから実装者のレビューが進んでなくて、Stageが進んでいない感じっぽい
- 特にFirefoxはその辺のリソース不足
- JSCとV8はIgaliaがベースに
- 単独の実装者による懸念?

### [Weak References for stage 2](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-22.md#weak-references-for-stage-2)

### [Optional chaining for stage 2](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-22.md#optional-chaining-for-stage-2)

- CoffeeScript の 90%のユースケースは満たせる

### [12.iii.c function.sent needs a champion](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-22.md#12iiic-functionsent-needs-a-champion)

- `function.sent`はAllenが提案していたが、今championがいない
- 募集中

### [10.iv.e Pipeline operator](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-03/mar-22.md#10ive-pipeline-operator)

----

## [tc39-notes/es9/2018-05 at master · rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes/tree/master/es9/2018-05)

### [9.i.b. Normative: Add export * as ns from "mod" to Export production and Module Semantics](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-22.md#arrayprototypevalues-web-compat-update)

- test262待ち?
- テスト -> 実装者のフィードバック

### [11.i.d. Optional catch binding for stage 4](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-22.md#11id-optional-catch-binding-for-stage-4)

- Optinal catchは実装待ち
- => ES2019にはそのまま入った

### [11.i.e ECMAScript as a superset of JSON](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-22.md#11ie-ecmascript-as-a-superset-of-json)

- [tc39/proposal-json-superset: Proposal to make all JSON text valid ECMA-262](https://github.com/tc39/proposal-json-superset)
- JSONはStringにU+2028 LINE SEPARATOR and U+2029 PARAGRAPH SEPARATORを含められる
- けどJSではLineTerminatorなので文字列に含めることができない
- このProposalはECMAScriptの文字列リテラルはU+2028とU+2029を含めるようにする
- つまり、LineTerminatorからはU+2028とU+2029を取り除く


### [Function.prototype.toString revision updates (slides) and stage 4](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-22.md#functionprototypetostring-revision-updates-slides-and-stage-4)

- async functionもサポートした
- MM: "must return a consistent result" so everytime you ask a question it always gives the same answer?
- 必ず同じ値を返す一貫性がある
- これをちゃんとレビューしてから

### [Top Level Await](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-22.md#top-level-await)

- [tc39/proposal-top-level-await: top-level `await` proposal for ECMAScript (stage 2)](https://github.com/tc39/proposal-top-level-await "tc39/proposal-top-level-await: top-level `await` proposal for ECMAScript (stage 2)")
- [top-level-await part 2: still awaiting - Google スライド](https://docs.google.com/presentation/d/1lTTiNosXlqk78FO7Ze_CdMbF3PhO36kCk-mT783wpi8/edit#slide=id.p "top-level-await part 2: still awaiting - Google スライド")
- DD: To clarify, the top-level statements up until the first await will still run in the order that things are imported.

> YK: WASM already enabled this. In Chrome, for example, you cannot transpile to a synchronous module. Separately, a question: when you cycle-back, do you block?

- moduleのときに同期がどうこうなのが焦点

### [String.prototype.codePoints for Stage 2](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-22.md#stringprototypecodepoints-for-stage-2)

- [tc39/proposal-string-prototype-codepoints: String.prototype.codePoints proposal for ECMAScript (stage 1)](https://github.com/tc39/proposal-string-prototype-codepoints)
- Init.Segmenterとの協力を考える


### [Well-formed JSON.stringify](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-22.md#well-formed-jsonstringify)

- [tc39/proposal-well-formed-stringify: Proposal to prevent JSON.stringify from returning ill-formed strings](https://github.com/tc39/proposal-well-formed-stringify)
- `JSON.parse(JSON.stringify(string)) === string` が成り立たない場合がある


### [Revisiting String.prototype.matchAll](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-22.md#revisiting-stringprototypematchall)

- 実装待ち
- => ES2020で入る

### [Stopping exfiltration: Massive privacy violations vs boundaries](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-23.md)

- POLA === Principle of Least Authority

> MM: The advice of only "origin boundaries are security boundaries" is unworkable. Use only 3rd party libraries you've fully vetted—this is impractical advice.

- 気をつけてでは解決できない
- サードパーティスクリプトによって境界をまたいだ情報の取得が行われている
- Realmにはセキュリティ以外の用途もある

### [Module Keys Strawman for Stage 1](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-23.md#module-keys-strawman-for-stage-1)

- ライブラリとしてじっそうしないのはなぜ?

> In ISE we often have to migrate from a project where it has no privileged state mechanisms to an environment where it does.

- すべてのモジュールに公開鍵を入れる

### [Realms](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-23.md#realms)

- Realm == DOM free iframe

### [Class fields status update](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-23.md#class-fields-status-update)

- TDZの問題

### [Class Access Expressions](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-23.md#class-fields-status-update)

- [tc39/proposal-class-access-expressions: ECMAScript class access expressions](https://github.com/tc39/proposal-class-access-expressions)
- インスタンスからstaticを参照するやつ
- `this.constructor`ではダメな理由はなに?

> WH: If it requires an explanation this long, it's going to be an uphill battle to get anyone to understand what it's doing. We should keep it simple.

- superも同じように複雑な部分はあるがそこに価値がある
- けど、class.propも同じようだけど価値が少ない
- ただ、this.constructorでアクセスするというのはただのパターンで、そこに統一的なものを用意するのは合理的である

### [Numeric separators update](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-24.md#numeric-separators-update)

- [Numeric Separators Update - Google スライド](https://docs.google.com/presentation/d/1ivYa55mNEDPZ2z5K41fU5gwRxmlb4aUTrA0qEuBTfow/edit#slide=id.p)


### [Pattern Matching for Stage 1](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-24.md#pattern-matching-for-stage-1)

- パターンマッチ
- 多くの言語が持っていてよく使われている
- 高度なswitchと見える
- [Pattern Matching for JavaScript - Google スライド](https://docs.google.com/presentation/d/1WPyAO4pHRsfwGoiIZupz_-tzAdv8mirw-aZfbxbAVcQ/edit#slide=id.p)

> MSL: If the parser sees an match ( (match plus open parens), does the parser have to parse as a potential function?

`match(` だけでは関数かは区別できない

> DH: In a perfect world we would maintain that symmetry, but unfortunately JavaScript is not that perfect world, and we don't have symmetry already. I'd rather get the new, desirable conditional form without that perfect symmetry, then incrementally advanced to reach that symmetry eventually.

- 完璧な世界ではその対称性は維持されますが、残念ながらJavaScriptは完璧な世界ではなく、まだ対称性はありません。
- 私はむしろ、その完全な対称性なしに新しい望ましい形を得て、それから次第にその対称性に到達するように進歩させたいと思います。


### [Binary AST](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-05/may-24.md#binary-ast)

- ユースケースはパフォーマンス
- パースコストが減ればサイトは数%から数十%早くなる
- これは大きなサイトにとって見えているので大きなモチベーションになる
- FB、Googleなど
- ただｓ、ASTにおける互換性とは何かという問題はある
- でもECMAScriptの仕様自体も変化しているので、同じコードでも時代によって実行のされ方は変わるのは同じ
- このASTの仕様は中にあるべきか外にあるべきか
- ESの中にあって制御出来たほうが望ましい
- ただASTはかなり専門性が使う側にとっても必要になるのではという話
- 今はStage 2の議論に集中
- Stage 3になるにはどうすれば
- この仕様は圧縮形式のフォーマットを考えるならさまざまな委員会と関係する ? IETF?
- Binary ASTのフォーマットの仕様を作って承認されたら?

---

## [tc39-notes/es9/2018-07 at master · rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes/tree/master/es9/2018-07)

### [ArrayBuffer.prototype.transfer()](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-07/july-24.md#arraybufferprototypetransfer)

- Node.jsでは常にコピーしている
- [domenic/proposal-arraybuffer-transfer: ArrayBuffer.prototype.transfer() proposal for JavaScript](https://github.com/domenic/proposal-arraybuffer-transfer)

### [Explicit Resource Management](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-07/july-24.md#explicit-resource-management)

- [Explicit Resource Management - Google スライド](https://docs.google.com/presentation/d/1OmkXFMizf5iYME9ClERZ3C1dwUAhh7-r2YMD-rTzY-Y/edit#slide=id.p)
- 明示的に`close`を呼ぶ必要があるincosistなパターンに対応したい
- `using`でその範囲を抜けたらリソースを解放するような

```
using (expr) {
  // statements...
}
```

- Javaのtry-with-resources statement

> RBN: (Shows slide 18). When the end of the block hits, you effectively have two try/finally blocks. You have effectively a stack of resources allocated, then you need to clean up these resources in reverse order.

- 例外は普通にtry-catch併用

> WH: I'm OK with this feature. I'm not OK with the using syntax, because it creates cover grammars on top of cover grammars. The try syntax, on the other hand, is fine. It also matches with what Java's try-with-resources statement does.
> RBN: We should use the regular try block semantics to be consistent with try blocks if we use the try syntax.


- なぜJavaと同じtry-with-resources statementではないの?
- [Grammar: 'using () {}' vs 'try () {}' · Issue #20 · tc39/proposal-using-statement](https://github.com/tc39/proposal-using-statement/issues/20)

> WH: There are no existing expectations for this feature. On the other hand, using identical syntax to Java's but with reversed semantics would be very confusing to anyone who knows both languages, making it hard to remember which one is which.


### TC53

- [TC53 - Smart wearable systems and sensor-based devices](http://ecma-international.org/memento/tc53.htm)
- [TC53 introduction for TC39](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-07/july-24.md#tc53-introduction-for-tc39)
- TC39をベースにしているIoT委員会


### [New name for global](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-07/july-24.md#new-name-for-global)

- `global` の別名

### [Dynamic Modules](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-07/july-25.md#dynamic-modules)

- [Dynamic Module Records - Google スライド](https://docs.google.com/presentation/d/1sqlvsiIOO0MgU6bW4TjB4RXZkjMAlEzuING_qMF1fYo/view#slide=id.p)
- CommonJS 動的なモジュールのためにModule Recordを追加しようという話
- wasmですら追加してないのに必要なのかどうか
- どこでCommonJSとのInteropを仕様にするべきか
- Loaderと同じ問題


### [Updates on First-class Protocols](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-07/july-25.md#updates-on-first-class-protocols)

- protocolのproposal
- Symbolのsyntax suger
- [michaelficarra/proposal-first-class-protocols: a proposal to bring protocol-based interfaces to ECMAScript users](https://github.com/michaelficarra/proposal-first-class-protocols)
- mixinはこれを使って簡単に実装できる
- Haskellと違ってnewtypeにコスト(ラッパー)がある

> MF: It's like the bind operator. But I really do hope to avoid adding any new calling pattern. And I do hope that this is a feature not everyone has to learn.

- 3つの機能があるので分解するべきという話

> DD: One take on this proposal is that it is proposing three separate things:

1. It is a partial class feature.
2. Symbol based properties in a simple way.
3. It has a shallow type checking feature.


ただこれ3つで1つだから分解すると意味をなさないという話

- mixin vs. protocolではない

### [Reviewing the future JS syntax throughout the current proposals (overflow)](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-07/july-26.md#reviewing-the-future-js-syntax-throughout-the-current-proposals-overflow)

- 最近のECMAScriptの提案を俯瞰しての話。
- Catch Bindingは小さな変更だけどtest262にとってはとても難しい変更だった
- https://github.com/tc39/test262/pull/1483
- Proposalベースで話が進むので全体を俯瞰 = Proposal同士のconnectは結構複雑になっている
- 次のようなコードも将来的にあるかもしれない

```js
class C {
  #x = [0, 1];
  @restricted
  static async * #foo() {
    yield * do {
      await this.#x;
    }
  }
}
```

- ES6のときはAllenが全部の機能をホワイトボードに書いて3日ぐらいトリアージした
- 構文の重複に関してはProposal間でアドホックに調整している
- 一方でユースケースが重複するProposalもでてくる
- アドホックグループのような形で解決していく
- Babelのフィードバックが行われたケースとBabelでも本当に非推奨なProposalプラグインとなってしまったケースなど

> We kind of learned from the decorators issue, where people used these features way too early, and make it very clear to people that these are not real JavaScript features.

- ECMAScript ProposalのsandboxとしてのBabel
- BabelによってObject Spreadのようにいいフィードバックがくることもあれば
- Decorator plugin(legacy)のようにあまりに早く使われ過ぎで良くないケースもある

### [Package name maps](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-07/july-26.md#package-name-maps)

- 3つのProposal
- [WICG/import-maps: How to control the behavior of JavaScript imports](https://github.com/WICG/import-maps)
- [drufball/layered-apis: A new standards effort for collaborating on high-level features.](https://github.com/drufball/layered-apis)
	- High Level API
- [domenic/get-originals: A web platform API that allows access to the "original" versions of the global built-in objects' properties and methods](https://github.com/domenic/get-originals)
	- Polyfillされたときにネイティブのものを取る方法がなくなる問題
	- originalをstd:的にimportできるようにする

### [JavaScript Standard Library](https://github.com/rwaldron/tc39-notes/blob/master/es9/2018-07/july-26.md#javascript-standard-library)

- [proposal-javascript-standard-library/slides-JS-std-lib-July-2018.pdf at master · tc39/proposal-javascript-standard-library](https://github.com/tc39/proposal-javascript-standard-library/blob/master/slides-JS-std-lib-July-2018.pdf "proposal-javascript-standard-library/slides-JS-std-lib-July-2018.pdf at master · tc39/proposal-javascript-standard-library")
- [tc39/proposal-javascript-standard-library](https://github.com/tc39/proposal-javascript-standard-library)
- これはstdの実装ではなく仕組みを定義する
	- 名前空間的に標準のメカニズムをい入れる
- polyfillが前提となったときにオリジナルにはどうやって戻すかという￥議論
	- soft fallbackの問題
	- get-originalsがとても近い話
- 目的
	- JavaScriptにstdがない
	- より小さなコードをデプロイしたい
	- stdがまったくないため、新しく作るにはちょうどいい
- Layered APIはNodeの方とも関係するので一緒にやっていく


> SCR:In Android, for example the standard library will get implemented but then it will take years to make it into the actual platform and widespread enough to use. You end up with messy ways that you implement fallbacks and polyfills; for example, you need to pull in polyfill code for everyone, even browsers that support said feature, unless you have sophisticated fallback mechanisms. I think that a really important part of this discussion is how do we deal with this and make a transparent and standard way for dealing with these fallbacks/polyfills rather than dumping the fallback/polyfill problem into user land.

- 標準を作ってもすぐには浸透しないのでpolyfillが使われる
- そのためpolyfillの問題はでてくるので、洗礼されたfallbackの仕組みは必要
- => TAGの議論