---
title: "ECMAScriptカンニングペーパー"
author: azu
layout: post
date : 2015-10-18T00:00
category: JavaScript
tags:
    - ECMAScript
    - JavaScript
    - spec

---

# ECMAScriptのカンペ

ECMAScript関係についてざっとみるカンニングペーパー

2015年10月18日の[次世代 Web カンファレンス](http://nextwebconf.connpass.com/event/19699/ "次世代 Web カンファレンス")でstandardizationのセッションで議論に参加するらしいのでそれのカンペです。

ここに書かれている情報は2015年10月17日現在のものです。

## ECMAScriptとは?

[Ecma International](http://www.ecma-international.org/default.htm "Ecma International")によって標準化されてるJavaScriptの仕様の事

- 仕様: ECMAScript
- 実装: JavaScript

2015年9月25日の最新版はECMAScript 2015(aka. ES6)

- [ECMAScript® 2015 Language Specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm "ECMAScript® 2015 Language Specification")

## Ecma-262

ECMAScriptの事。_262_はEcma Internationalでの管理番号。

- [Ecma Standards - list](http://www.ecma-international.org/publications/standards/Standard.htm "Ecma Standards - list")

## TC39

Technical Committee = 専門委員会。

TC39: ECMAScriptを策定してる専門委員会
Ecmaは色々な仕様を策定しているので、その中でECMAScriptを策定してるグループの名前がTC39。

- [TC39 - ECMAScript](http://www.ecma-international.org/memento/TC39.htm "TC39 - ECMAScript")

ちなみに同じくEcma標準化されてるDartはTC52。

- [TC52 - Dart](http://www.ecma-international.org/memento/TC52.htm "TC52 - Dart")

## ECMAScript 6 / 2015の呼び方

一応の正式名称はECMAScript 2015。
通称(多くの人に馴染みがあるという意味)ではES6と呼ぶ人も多い。

> ES2015が正式名称であり、来年以降のECMAScriptの策定やリリースのスタイルに名称を合わせるというのが理由

- [ES6 or ES2015 ? 〜WEB+DB PRESS Vol.87 ES6特集に寄せて〜 - Cybozu Inside Out | サイボウズエンジニアのブログ](http://blog.cybozu.io/entry/9081 "ES6 or ES2015 ? 〜WEB+DB PRESS Vol.87 ES6特集に寄せて〜 - Cybozu Inside Out | サイボウズエンジニアのブログ")

ES6以降は1年毎にリリースしていく予定のため、2015, 2016...となるように変更された。

### ES6のエディタリーダー

ES6の仕様策定のリーダー(実際に仕様書に載せる文章を書く人)

[![icon](https://monosnap.com/file/YZf9xQvF692CCyPm6UZilXBrzJKUIS.png)](https://twitter.com/awbjs "Allen Wirfs-Brock (@awbjs) | Twitter")

- Allen Wirfs-Brock(アレン・ワーフスブラック) @ <del>Mozilla</del> [family business](https://twitter.com/awbjs/status/649995551467945984)
- [@awbjs](https://twitter.com/awbjs "@awbjs")

## Ecma標準とISO標準の違い

ECMAScriptはデファクト標準([Ecma International](http://www.ecma-international.org/default.htm "Ecma International")により標準化)でもあり、[ISO/IEC 16262](http://www.iso.org/iso/iso_catalogue/catalogue_tc/catalogue_detail.htm?csnumber=55755 "ISO/IEC 16262")としてISO標準化(デジュール標準)もされている

- [OSSコミュニティの“中の人”（4）：できないことは全部やる。できる依頼は断る――竹迫良範氏インタビュー【後編】 (1/2) - ＠IT](http://www.atmarkit.co.jp/ait/articles/1210/23/news153.html "OSSコミュニティの“中の人”（4）：できないことは全部やる。できる依頼は断る――竹迫良範氏インタビュー【後編】 (1/2) - ＠IT")
- [Devsumi2010 Ecmascript5 (ISO/IEC JTC1/SC22)](http://www.slideshare.net/takesako/devsumi2010-ecmascript5-isoiec-jtc1sc22 "Devsumi2010 Ecmascript5 (ISO/IEC JTC1/SC22)")

日本ではISO/IEC JTC1/SC22のECMAScript adhoc委員会でFast Trackの手続きをやってる。([@azu](https://github.com/azu)もレビュアとして参加)

### なぜISO標準が必要?

> AWB: The issue is ISO. There is concern about divergence between those two documents (ISO document with changes made by their reviewers, Ecma version)
>
> BT/IS clarifying why we need ISO version?

- [tc39-notes/july-28.md at master · rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes/blob/master/es7/2015-07/july-28.md#4i-status-of-isoiec-fast-track-of-ecma-262-ed6-ecma-402-ed2-and-ecma-404 "tc39-notes/july-28.md at master · rwaldron/tc39-notes")

## ECMAScript 7 ? 2016

ECMAScript 7 or 2016って何のこと??

大抵の場合は次(ES6の次)のECMASCriptの事を言ってる。

「ES7のDecoratorについて」といった言い方はまだ仕様に入ることすら決まっていないもののことを言っているので正しくはない。

「次期ECMAScriptに提案されているDecoratorについて」というのがより正確。

次期ECMAScriptの事をECMAScript nextとかES.nextと言ったりもする。

- [ES5, ES6, ES2016, ES.Next: What's going on with JavaScript versioning?](http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/ "ES5, ES6, ES2016, ES.Next: What&#39;s going on with JavaScript versioning?")

## ES.next

現在から見て次期ECMAScriptの事
(2015年9月25日から見ると、次期ECMAScriptは2016以降の事)

## ES.nextのエディタリーダー

[![Brian Terlson](https://monosnap.com/file/GxYyVcRB3ZDE4VcJ2nYBoLzfbrrzaz.png)](https://twitter.com/bterlson)

- Brian Terlson(ブライアン・テルソン) @ Microsoft
- [@bterlson](https://twitter.com/bterlson "@bterlson")

> Thanks TC39 for the support :) I'm excited to take on the editorship of ECMA262!
> -- https://twitter.com/bterlson/status/626104816511512576

2015年7月29日のTC39ミーティングで承認され、ECMAScriptのエディタはAllen Wirfs-BrockからBrian Terlsonに交代。

- [Recapping the July 2015 TC39 Committee meeting in Redmond | Microsoft Edge Dev Blog](http://blogs.windows.com/msedgedev/2015/08/03/recapping-the-july-2015-tc39-committee-meeting-in-redmond/ "Recapping the July 2015 TC39 Committee meeting in Redmond | Microsoft Edge Dev Blog")

ES.nextの仕様策定はBrian Terlsonの元に行われる。

## ES.nextと策定プロセス

ES.nextは今までのECMAScriptとは策定プロセスが異なる。

ECMAScript 2016からは機能ごとに仕様のプロポーザル(提案)を出し策定していく。
それぞれのプロポーザルには**Stage**と呼ばれる5段階のラベルが振られている。

Stage4となったプロポーザルは次期ECMAScriptに取り込まれ、正式にECMAScriptの仕様となる。

- 0. Stawman
- 1. Proposal
- 2. Draft
- 3. Candidate
- 4. Finished

言いかたを変えると、次期ECMAScriptは1年ごとに出るので、その時までにStage4となったものが次期ECMAScriptに入る。

<iframe src="http://azu.github.io/tc39-svg/" ></iframe>

- [TC39 Process](http://azu.github.io/tc39-svg/ "TC39 Process")

![ecmascript-timeline](https://monosnap.com/file/XqpEfoMeWxcLw92Jx1UOQ8EWe1e37m.png)

via [What’s New in JavaScript for Fast and Scalable Apps | Build 2015 | Channel 9](https://channel9.msdn.com/Events/Build/2015/2-763 "What’s New in JavaScript for Fast and Scalable Apps | Build 2015 | Channel 9")

## TC39 Process: Stage

それぞれのStageについて。
詳しくは[The TC39 Process](https://tc39.github.io/process-document/ "The TC39 Process")を読む 

- Stage 0: Stawman
	- アイデア
-  Stage 1: Proposal
	- プロポーサルの目的や解決方法を示す
	- Polyfillやデモ等を用いて解説する
- Stage 2: Draft
	- いわゆるドラフト
	- ECMAScript標準と同じルールでAPIや構文、セマンティックについて説明していなければならない
- Stage 3: Candidate
	- 仕様は完成した状態
	- 実装や外部のフィードバックを求める状態
	- レビュアはその仕様策定者以外ならだれでもなれるが専門的な知識を持っている必要がある
	- ECMAScriptのエディタがチェックする必要があり 
- Stage 4: Finished
	- 2つの実装(not polyfill)が必要
	- ECMAScriptへ取り込まれる準備が完了したことを示す状態
	- ECMAScriptのエディタがチェックする必要があり

それぞれのstageはTC39のミーティング等で話し合い、それぞれのstageの条件を満たしている場合に次のstageへあがる。

### 誰がプロポーザル書いてるの?

色々な人

- ブラウザベンダー
- ウェブ開発者

[tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")にプロポーザル一覧とStageが載っている。

## 新しいプロポーザルを提案するには

[tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")の`stage0.md`にプロポーザルを追加してPull Requestする。
Ecma Internationalの特許、著作権のポリシーに同意してる人ならば誰でも出来る。

- [Contributing New Proposals](https://github.com/tc39/ecma262#contributing-new-proposals "Contributing New Proposals")

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">ECMAScriptに仕様提案までのフロー(Ecma非会員の場合)&#10;1. 仕様策定のプロセスを理解しましょう&#10;2. フォームから必要な情報送ってルールに同意してね &#10;3. ProposalをPull Requestしましょう&#10;<a href="https://t.co/vTcqEPzzBg">https://t.co/vTcqEPzzBg</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/652419947059150848">October 9, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## ECMAScriptとGitHub

ECMAScript 2016のドラフトはGitHubで公開されている

- [tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")

## 仕様についてはどこで議論されてるの

- メーリングリスト
	- [ES Discuss](https://esdiscuss.org/ "ES Discuss")
- TC39のFace to Faceのミーティング
	- [rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")
- 各仕様のGitHub Issue
	- [tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")
- ECMAScriptのBugzilla
	- [bugs.ecmascript.org](https://bugs.ecmascript.org/)
- SNS
	- Twitter/GitHub/Google+


## 結局ECMAScript 2016って何が入るの?

[ES2016 Draft 1](https://github.com/tc39/ecma262/releases/tag/es2016-draft-1 "ES2016 Draft 1")がリリースされている。

Draft 1は基本的にはES2015と同じで、細かいバグ修正のみ。
その他の違いとしては、仕様書がWordではなく[Ecmarkup](http://bterlson.github.io/ecmarkup/ "Ecmarkup")で書きなおされたこと。

リリースする時期は決まっていて、[General Assembly](http://www.ecma-international.org/memento/GA.htm "General Assembly")の承認がされて初めてリリースされるので、次の総会が行われる2016年6月15-16日あたりにES2016がリリースされる。

仕様を提出するまでにStage 4となったものも一緒にES2016としてリリースされるが、ES2016はProposalが独立してるのでそれを仕様にマージしたり編集の作業が必要(Brianさんが頑張る)

そのため、提出の半年ぐらい前には入れる機能はフリーズされる(何を入れるかを決めて、残りはtypoや実装からのフィードバックなどの機能以外の修正)。

なので、ES2016は2016年1月ぐらいには細かいところを除きフリーズされる(この時期を"freezing" deadlineと呼んだりしてる)

**結論:** 2016年1月にStage 4となってる仕様がES2016には入る。

可能性としてありえるのは以下の仕様あたり

- [tc39/ecmascript-asyncawait](https://github.com/tc39/ecmascript-asyncawait)
- [tc39/Array.prototype.includes](https://github.com/tc39/Array.prototype.includes/)
- [rwaldron/exponentiation-operator](https://github.com/rwaldron/exponentiation-operator)

-----

例) ES6の場合

ES6は[2015年の6月17日にリリース](http://ecma-international.org/news/Publication%20of%20ECMA-262%206th%20edition.htm)された。

以下の図のように大体1月ぐらいには機能はフリーズされて、そこからは実装のフィードバックを受けての修正がメインとなっていた(実際には細かな機能が増えたりしたけど。。)

<p><a href="http://monosnap.com/image/VdNAJQPs9B0Jynw6bG3BoDxceqAEzl.png" title="ES6 timeline" target="_blank"><img width="100%" src="http://monosnap.com/image/VdNAJQPs9B0Jynw6bG3BoDxceqAEzl.png" alt="ES6 Release Schedule"/></a></p>

<p><a href="http://monosnap.com/image/VdNAJQPs9B0Jynw6bG3BoDxceqAEzl.png" title="ES6 timeline" target="_blank">＊画像横に長いのでクリック</a></p>

- [The ECMAScript 6 schedule changes](http://www.2ality.com/2014/06/es6-schedule.html "The ECMAScript 6 schedule changes")

-----

## Ecmarkup

今までのECMAScriptはWordファイルだったが、ES.nextでは[Ecmarkup](http://bterlson.github.io/ecmarkup/ "Ecmarkup")を使ったHTMLベースで書くようになっている。

```html
<emu-production name="SourceCharacter" type="lexical" id="prod-SourceCharacter">
<emu-nt><a href="#prod-SourceCharacter">SourceCharacter</a><emu-mods></emu-mods></emu-nt><emu-geq>::</emu-geq><emu-rhs><emu-gprose>any Unicode code point</emu-gprose></emu-rhs>
</emu-production>
```

[Ecmarkup](http://bterlson.github.io/ecmarkup/ "Ecmarkup")は仕様書向けのタグを定義したHTML。

## ES.nextの進捗

[tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")にそれぞれのプロポーザルのstageが掲載されている。
またstageは2ヶ月に一度行われるTC39のミーティングにより変化するため、ミーティングの記録されている。

- [rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")

## 次の仕様っていつリリースされるの?

ECMAScript 2016のリリース予定は2016年の6月15-16日

Ecmaの[General Assembly](http://www.ecma-international.org/memento/GA.htm "General Assembly")(GA)の総会で正式に承認された後にリリースされるので、次にGAの総会が行われるのは15-16 Juneなので。


## ECMAScriptとModuleとWHAWG

Module loaderはES6から外されたけど、[whatwg/loader](https://github.com/whatwg/loader "whatwg/loader")で議論されてる。

## ES6に入らなかったプロポーザルって?

仕様として提案されたが、ES6には入らなかったものも多い。

仕様そのものが良くない、仕様策定に時間がかかる(Module loaderはコレ)など理由は色々。

- [ECMAScript没proposal追悼式](http://www.slideshare.net/KMC_JP/ecmascriptproposal "ECMAScript没proposal追悼式")

## ECMAScriptの実装ってどれぐらいあるの?

ES.nextの仕様に入るには2つ以上の実装が必要。
ここに関わるのはブラウザベンダーによる実装。

- [Chakra](https://msdn.microsoft.com/en-us/library/dn249673(v=vs.94).aspx "Chakra") @ MicroSoft
- [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey "SpiderMonkey") @ Mozilla
- [V8](https://code.google.com/p/v8/ "V8") @ Google
- [JavaScriptCore](https://www.webkit.org/projects/javascript/ "JavaScriptCore") @ Apple

組み込みやJVM向けなどもあるけど多分カウントされない気がする。

- [Nashorn](http://openjdk.java.net/projects/nashorn/ "Nashorn")
- [Duktape](http://duktape.org/index.html "Duktape")
- [cesanta/v7](https://github.com/cesanta/v7/ "cesanta/v7")

## ECMAScriptの実装状況ってどうなの?

[ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/ "ECMAScript 6 compatibility table")で、ブラウザの実装状況が見ることが出来ます。

それぞれのブラウザの更新履歴などについては以下を参照。

- [azu/browser-javascript-resource](https://github.com/azu/browser-javascript-resource "azu/browser-javascript-resource")

## Transpilerって何?

Transpilerは[Source-to-source compiler](https://en.wikipedia.org/wiki/Source-to-source_compiler "Source-to-source compiler")の事。
コードからコードへ変換するツールの事で、JavaScriptやCSSなどの世界では色々なツールがある。

ECMAScriptではES6以降のコードをES5のコードに変換する[Babel](https://babeljs.io/ "Babel")(元々は6to5という名前)や、
CSSでは[PostCSS](https://github.com/postcss/postcss "PostCSS")などがある。

古い環境にそもそも同等の表現を出来る機能がない場合はTranspilerでも実装する事はできない。

例) ES6 Proxy、ES6 Classesのサブクラスなど

同様の事が原因で、全ての機能が仕様通りの動きをするわけではない。

Babelの作者である@[sebmck](https://github.com/sebmck "sebmck")もTranspilerだけで新しい言語機能を学ぶべきではないと言っている。

![slide](http://azu.github.io/slide/nodejs-es6/img/JavaScript_transformation.png)

- [JavaScript Transformation - JSConf 2015 // Speaker Deck](https://speakerdeck.com/sebmck/javascript-transformation-jsconf-2015)
- [どうやってECMAScript 6を学び始めるか](http://azu.github.io/slide/nodejs-es6/how-to-learn.html)


## Polyfillって何?

一種のライブラリ。

仕様で策定されている機能だが、古いブラウザなどではまだ実装されていない時に、APIが全く同じ互換実装を提供するライブラリの事。

`Promise`や`Array.from`などのオブジェクトやメソッドの追加が主な働き。
Transpilerと違って新しい構文を古いブラウザで動かせるようにするのではなく、既存の構文で新しい機能を追加する(つまりライブラリ)

ECMAScriptにはマクロのような仕組みはないのでコードで構文を拡張することが難しい。
そのため、TranspilerとPolyfillを使い分け、組み合わせて利用する。

[Babel](https://babeljs.io/ "Babel")はTranspiler、[core-js](https://github.com/zloirock/core-js "core-js")はPolyfill。

ECMAScriptよりもDOM APIはpolyfillとして実装しやすいため多くのPolyfillが実装されている。

- [Polyfill service](https://cdn.polyfill.io/v1/docs/ "Polyfill service")

## ずっとBabel使い続けるのか?

[Babel](https://babeljs.io/ "Babel")ではES6で追加された構文の大部分が変換でき、古いブラウザなどでもES6を利用できるようになっている。

そのため、とりあえずBabelを使っておけばいう人も多い。

- [Effective ES6 / Teppei Sato - YouTube](https://www.youtube.com/watch?v=oSPv5IPDSxE "Effective ES6 / Teppei Sato - YouTube")

ブラウザ側の実装も進んでいるため、IEのようなアップデートのライフサイクルが異なるブラウザを無視すれば、モダンなブラウザでもES6の機能を利用できるようになってきている。

Q. ブラウザでも実装された後もBabelの使い続けていくのか?それは健全なのか?という話について。

A. 個人的な考えではYES。

Babelを利用するのは利用者のブラウザで動かせるという実利的な理由もあるが、仕様策定側から見てもメリットがあると考えられている。

TC39のメンバーでもある[@jhusain](https://twitter.com/jhusain "@jhusain")が、「これからもTranspilerをずっと使い続けていくのか?」という疑問に対して次のように答えている。

> “I hope so. Transpilers have been an incredibly valuable thing for the committee.”

- [168JSJ The Future of JavaScript with Jafar Husain](https://devchat.tv/js-jabber/168-jsj-the-future-of-javascript-with-jafar-husain "168JSJ The Future of JavaScript with Jafar Husain")
- [JSJ The Future of JavaScript with Jafar Husainのメモ :memo:](https://gist.github.com/azu/ec6c5721393b8c3a6845 "JSJ The Future of JavaScript with Jafar Husainのメモ :memo:")

現実的な問題として仕様に関わる人があまり数が多くない。
しかし、仕様策定側は仕様に対するフィードバックを求めている。

Transpilerがあると、策定中の仕様をウェブ開発者が試すことができ仕様に対するフィードバックがより多く集まる事が挙げられている。

ウェブの変化が高速になっているのに伴い、ECMAScriptなどの仕様策定も高速になっていく傾向がある。

- ES.nextは1年ごとのリリース。機能ベースの仕様策定
- HTML5仕様のモジュール化
	- [【エキスパートガチトーク】Web技術の未来を「Extensible Web」から探る！（後編）─技術の進化は必要か？ | HTML5Experts.jp](https://html5experts.jp/shumpei-shiraishi/16641/ "【エキスパートガチトーク】Web技術の未来を「Extensible Web」から探る！（後編）─技術の進化は必要か？ | HTML5Experts.jp")

そのため、できるだけ短い期間で多くのフィードバックが必要になる傾向があり、フィードバックする機会を失う問題が起きやすいので、Transpilerはそこを補完する事ができるのではと期待されている。

> フィードバック側は最新の情報に気づかないとフィードバックする機会を失う

- [世界のJavaScriptを読もう @ 2014](http://azu.github.io/slide/jser200/javascript-2014.html "世界のJavaScriptを読もう @ 2014")

ES.nextでも _Stage 1: Proposal_ あたりで、TranspilerやPolyfillを仕様と共に提供して、より多くの人が試せるようにしているケースが多い。(TranspilerやPolyfillはStage 4となるのに必要な実装数にはカウントされない)

## どうやって仕様へContributingするの?

### ES6

やはり、仕様の問題は実装時に多く見つかるので、JavaScriptエンジンに仕様の実装をしてみる。
JavaScriptエンジンの多くはJavaScriptでJavaScriptを実装できるようになっているので、機能によっては外部の人でも手を出しやすいとの事。

- [#19 ES7 | mozaic.fm](http://mozaic.fm/post/125673651143/19-es7 "#19 ES7 | mozaic.fm")

仕様の問題を見つけたら[ES Discuss](https://esdiscuss.org/ "ES Discuss")等に投げて、[bugs.ecmascript.org](https://bugs.ecmascript.org/)にIssueを立てるなど。

ブラウザの実装を試して、挙動が異なってたりするならブラウザベンダーのBTSにIssueを立てるなど。

- [azu/browser-javascript-resource](https://github.com/azu/browser-javascript-resource "azu/browser-javascript-resource")

### ES.next

- ES.nextの仕様は殆どがGitHubのリポジトリを持ってるので、それぞれのリポジトリにIssueやPull Requestを送ってみる。
	- [tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")
- ECMAScriptの仕様本体も[tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")にある
	- [CONTRIBUTING.md](https://github.com/tc39/ecma262/blob/master/CONTRIBUTING.md "CONTRIBUTING.md")を見て分かるように普通にIssueやPull Requestで修正できる
	- 細かい変更ならCLAへのサインも必要ない
- 最新の議論は[TC39 Meeting Notes](https://github.com/rwaldron/tc39-notes "TC39 Meeting Notes")に記録されているがtypoなどの間違いが多いので修正してみる
- Transpilerなどのツールが新しい構文に対応するには、まずそのコードをパースできないといけない。
	- 各種パーサが対応出来るようにPull Requestを送ってみる
	- [[2015-02] 最近のJavaScript AST標準化の動き | Web Scratch](http://efcl.info/2015/02/26/recent-js-ast/ "[2015-02] 最近のJavaScript AST標準化の動き | Web Scratch")
- 仕様のTranspilerやPolyfillを実装してみる
- TranspilerやPolyfillを使ってみて使い勝手などのフィードバックを書いてみる


## こんな機能ってES.nextに入るの?

検索しましょう！

<form method="get" action="https://github.com/tc39/ecma262/searc">
  <input type="text" name="q">
  <input type="hidden" name="utf8" value="✓">
  <input type="submit" value="search">
</form>

