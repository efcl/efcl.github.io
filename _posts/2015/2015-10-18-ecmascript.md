---
title: "ECMAScriptカンニングペーパー"
author: azu
layout: post
date : 2015-09-26T00:20
category: JavaScript
tags:
    - ECMAScript
    - JavaScript
    - spec

---

# ECMAScriptのカンペ

ECMAScript関係についてざっとみるカンニングペーパー

## ECMAScriptとは?

[Ecma International](http://www.ecma-international.org/default.htm "Ecma International")によって標準化されてるJavaScriptの実装

- 仕様: ECMAScript
- 実装: JavaScript

2015年9月25日の最新版はECMAScript 2015(aka. ES6)

- [ECMAScript® 2015 Language Specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm "ECMAScript® 2015 Language Specification")

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

### ES6のエディタリーダ

ES6の仕様策定のリーダ(実際に仕様書に載せる文章を書く人)

[![icon](https://monosnap.com/file/YZf9xQvF692CCyPm6UZilXBrzJKUIS.png)](https://twitter.com/awbjs "Allen Wirfs-Brock (@awbjs) | Twitter")

- Allen Wirfs-Brock([@awbjs](https://twitter.com/awbjs "@awbjs")) @ Mozilla

## Ecma標準とISO標準の違い

ECMAScriptはデファクト標準([Ecma International](http://www.ecma-international.org/default.htm "Ecma International")により標準化)でもあり、[ISO/IEC 16262](http://www.iso.org/iso/iso_catalogue/catalogue_tc/catalogue_detail.htm?csnumber=55755 "ISO/IEC 16262")としてISO標準化(デジュール標準)もされている

- [OSSコミュニティの“中の人”（4）：できないことは全部やる。できる依頼は断る――竹迫良範氏インタビュー【後編】 (1/2) - ＠IT](http://www.atmarkit.co.jp/ait/articles/1210/23/news153.html "OSSコミュニティの“中の人”（4）：できないことは全部やる。できる依頼は断る――竹迫良範氏インタビュー【後編】 (1/2) - ＠IT")
- [Devsumi2010 Ecmascript5 (ISO/IEC JTC1/SC22)](http://www.slideshare.net/takesako/devsumi2010-ecmascript5-isoiec-jtc1sc22 "Devsumi2010 Ecmascript5 (ISO/IEC JTC1/SC22)")

日本ではISO/IEC JTC1/SC22のECMAScript adhoc委員会でFast Trackの手続きをやってる。(@azuもレビューアとして参加)

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

### ES.nextのエディタリーダ

[![Brian Terlson](https://monosnap.com/file/GxYyVcRB3ZDE4VcJ2nYBoLzfbrrzaz.png)](https://twitter.com/bterlson)

- Brian Terlson([@bterlson](https://twitter.com/bterlson "@bterlson")) @ Microsoft

> Thanks TC39 for the support :) I'm excited to take on the editorship of ECMA262!
> -- https://twitter.com/bterlson/status/626104816511512576

2015年7月29日のTC39ミーティングで承認され、ECMAScriptのエディタはAllen Wirfs-BrockからBrian Terlsonに交代。

- [Recapping the July 2015 TC39 Committee meeting in Redmond | Microsoft Edge Dev Blog](http://blogs.windows.com/msedgedev/2015/08/03/recapping-the-july-2015-tc39-committee-meeting-in-redmond/ "Recapping the July 2015 TC39 Committee meeting in Redmond | Microsoft Edge Dev Blog")

ES.nextの仕様策定はBrian Terlsonの元に行われる。

## ES.nextと策定プロセス

ES.nextは今までのECMAScriptとは策定プロセスが異なる。

ECMAScript 2016からは機能ごとに仕様のプロポーザル(提案)出し策定していく。
それぞれのプロポーザルにはStageと呼ばれる5段階のラベルが振られている。

Stage4となったプロポーザルは次期ECMAScriptに取り込まれ、正式にECMAScriptの仕様となる。

- 0. Stawman
- 1. Proposal
- 2. Draft
- 3. Candidate
- 4. Finished

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
	- レビューアはその仕様策定者以外ならだれでもなれるが専門的な知識を持っている必要がある
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

## ECMAScriptとGItHub

ECMAScript 2016のドラフトはGItHubで公開されている

- [tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")

## Ecmarkup

今までのECMAScriptはWordファイルだったが、ES.nextでは[Ecmarkup](http://bterlson.github.io/ecmarkup/ "Ecmarkup")を使ったHTMLベースで書くようになっている。

[Ecmarkup](http://bterlson.github.io/ecmarkup/ "Ecmarkup")は仕様書向けのタグを定義したHTML。

## ES.nextの進捗

[tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")にそれぞれのプロポーザルのstageが掲載されている。
またstageは2ヶ月に一度行われるTC39のミーティングにより変化するため、ミーティングの記録されている。

- [rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")

## ECMAScriptとModuleとWHAWG

Module loaderはES6から外されたけど、[whatwg/loader](https://github.com/whatwg/loader "whatwg/loader")で議論されてる。


