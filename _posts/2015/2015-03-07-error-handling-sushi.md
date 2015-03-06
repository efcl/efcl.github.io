---
title: "#error_handling_sushi でPromiseのエラーハンドリングについて発表した"
author: azu
layout: post
date : 2015-03-07T00:30
category: イベント
tags:
    - JavaScript
    - Promise
    - イベント

---

`#error_handling_sushi` でJavaScriptのエラーハンドリングについて議論した。

自分はPromiseのエラーハンドリングの握りつぶしの問題を見つけやすくするイベントの実装について、[Promise Error Handling](http://azu.github.io/slide/error-handling/promise-error-handling.html "Promise Error Handling")という話をした。

- ログ: [#error_handling_sushi - Togetterまとめ](http://togetter.com/li/791762 "#error_handling_sushi - Togetterまとめ")

--

## 基調講演 - teppeis

- [`#error_handling_sushi` 基調講演](https://gist.github.com/teppeis/cc2b7adb501ace8ca7ab "#error_handling_sushi 基調講演")
- 一つの話としてカスタムエラー
- エラーの継承はしない派も多かった
    - ブラウザの互換性の問題
    - カスタムエラーはクロスブラウザが難しい
- ブラウザ or Node という実行環境の違い
- ブラウザJSでエラーってどういう時があるか
- Promiseのエラー処理がどうするのがいいか

などが今日の議論の主なテーマ

--

## JavaScript Error Handling - jxck

- JavaScriptだとエラーの設計についての話はあんまりされない
- Javaなどの話はそのまま適応できない
- エラーそのものをどう扱うかについて
- Joyentのエラーガイド
    - エラーのカテゴリ
         - プログラマエラー
         - オペレーショナルエラー
              - runtimeエラー
              - 404エラーなど
    - 契約
         - [Amazon.co.jp： オブジェクト指向入門 第2版 原則・コンセプト (IT Architect’Archive クラシックモダン・コンピューティング): バートランド・メイヤー, 酒匂 寛: 本](http://www.amazon.co.jp/dp/4798111112/ "Amazon.co.jp： オブジェクト指向入門 第2版 原則・コンセプト (IT Architect’Archive クラシックモダン・コンピューティング): バートランド・メイヤー, 酒匂 寛: 本")
    - Hoare Triple
         - { P } A { Q }
              - 事前条件{P}を満たした状態で処理が実行されたら{A}、事後条件{Q}を保証する
         - 契約 = 仕様
         - まずはドキュメントをかけ
         - 使う側はそのドキュメントを守らないと行けない
    - JavaScriptには契約を表現できない = 型がない
- プログラマエラーの話
    - バグを見つけるためのエラー
    - 契約を強制する方法
         - assert - 前提を表明する
              - プログラムレベルでも契約をはっきりさせる
              - assertion errorは回避するコードじゃなくて、修正コードを要求する
              - つまりassertでちゃんと落とす
              - D言語に `in` ブロックなどがある
              - 強い静的型付けならassertじゃなくてもいい
    - まずは契約が有効なのかを見分けられる手段を提供する必要がある
         - メールアドレスを満たせ? それって何?
    - 事前条件の利用可能性の規則
         - バリデーションを提供できない = 契約不成立
         - バリデーションを提供できるかを一つの目安にしよう
         - 契約 = 仕様 なのでまずはドキュメントをちゃんと書く
    - 実現方法
         - assertモジュールとバリデーション
    - プロセスを落とす例外が悪い?
         - プログラマーエラーに対する誤解
         - 開発時にどんどん落としてプログラマに気づかせるものであるはず
- オペレーショナルエラー
    - 本当の例外的なエラー
    - Pが正しいのにQが満たせない(Hoare Triple)
    - Aがおかしい => これが本当の例外
    - 例外を無くしても動くコードベキの意味?
    - 前提条件を厳しくして回避できる例外について
         - 回避できるならそれは仕様なので = 契約
         - if-elseで記述できるような話
         - それ以外なら**例外**
    - 都合の悪い例外処理を例外と思い込む
         - if-elseの代わりにtry-catchを使ってるのはだいたいこれ
- JavaScriptの場合の言語機能での例外
    - stackが標準じゃない
    - IE は 10から
    - + IE は throw しないと stack取れない
    - class使わないと完璧な継承はできない
- カスタムエラー
    - `Error.call(this)`がホストクラスにはできない
         - これを使った継承は実はちゃんと動いてない
    - `__proto__`を使った方法もある
         - IE11以降である必要、ファクトリ的な扱い
    - V8には`error.captureStackTrace`という拡張がある
    	- stackの引き継ぎができる
    - `class MyError extends Error{}` が真の継承
         - ES5のレベルだと今のところやり方がない
    - stack欲しい場合は一回throwして取る現状…(IEのため、V8はerror.captureStackTraceを使う)
- カスタムエラーは必要?
    - 本当にstacktraceは必要?
    - 大体の場合はインスタンスの型が欲しい
    - instanceofしたいだけなのでは?
    - それっぽいオブジェクトでいい?
         - 言語の例外機構を逸脱するのはよくないという面も出てくる
         - エコシステムを止めてしまう場合があるので、あくまでエラーに乗った方がよい。
    - カスタムエラーの粒度について
         - 例) HTTP 404
              - FetchError + statusCodeみたいなプロパティ
              - NotFoundErrorみたいなそれぞれ作るのはインスタンスレベルの型になってよくない
              - プロパティが標準のものでは足りない場合 => カスタムエラーの使いドコロ？
    - Java的な考えだと、エラークラスがツリー構造になってくる
         - Error -> 404Error
         - 例外の階層構造を作って、catchする側に処理の自由度を与えるためにカスタムエラーを作ることがある
    - 結局JSはカスタムエラーを作っても結局はif-elseになるだけ
- カスタムエラーの作りどころ
    - プロパティで情報を追加した場合に作る
    - stackはそこまでこだわらなくても良さそう
    - JavaScriptの場合プロパティの値で分岐するのと、型(instanceof)でやるのはそこまで変わらないのでは?
         - 一応カスタムエラーなら instanceof、プロパティで分岐できるようになる
    - でも多用はすべきではない
- 結論
    - エラーかどうか
         - 契約による判断
         - ドキュメントをちゃんとを書く
    - AssertionError
         - assertをそのものを使う
         - バリデーションエラーみたいなカスタムエラーはいらない
    - カスタムエラー
         - 使いドコロ難しい
         - stackは無理に作る必要がない
         - やり過ぎで危険なので、最小限を推奨
- ブラウザとNodeの違い
    - ブラウザは人間にするフィードバックを求められてしまう
    - ライブラリ内でのエラーの扱いが中立的な判断が必要になる局面?

--

## kintone と assert

- ある関数を呼び出すときにクラスの状態(普遍条件)をassertしてる
- Closure Compolerなので型チェックの`assert`はいらない
- type error以外のassertを使う
- ブラウザJSだとエラーの時点でエラーを表示して終わり
- window.onerrorで取りたい(トレースしたい)のでthrowする
- Closureは型付きのStringのものがある
    - サニタイズとかセキュリティ目的
- 強い型があると事前条件をそこで作れてしまう = assertが少なくなる傾向
- TypeScript @ kyo_ago
    - UserNameとPassword型を用意してバリデーションすることがある
- バリデーションエラーは情報をかき集めて、ユーザーに伝えるという扱い
    - 死なないエラーとして扱う
    - バリデーションエラーが0となる = OK
    - そもそも例外の話にバリデーションエラーは混ぜない方がいいのでは?

--

## Promiseのエラー

スライド : [Promise Error Handling](http://azu.github.io/slide/error-handling/promise-error-handling.html "Promise Error Handling")

<div class="kwout" style="text-align: center;"><a href="http://azu.github.io/slide/error-handling/promise-error-handling.html"><img src="http://kwout.com/cutout/6/wd/yv/7gy_bor.jpg" alt="http://azu.github.io/slide/error-handling/promise-error-handling.html" title="Promise Error Handling" width="600" height="225" style="border: none;" /></a><p style="margin-top: 10px; text-align: center;"><a href="http://azu.github.io/slide/error-handling/promise-error-handling.html">Promise Error Handling</a> via <a href="http://kwout.com/quote/6wdyv7gy">kwout</a></p></div>

最近、io.jsやbluebirdに実装された`unhandledRejection` と `rejectionHandled` について話しました。

主にPromiseのエラーを握りつぶしを発見するためやログを取る目的に使う感じだと思います。

--

## io.jsのドキュメントのerror.mdが追加された - 会長

- [Errors io.js v1.4.3 Manual &amp; Documentation](https://iojs.org/api/errors.html "Errors io.js v1.4.3 Manual &amp; Documentation")
- `Error.captureStackTrace`の追加
- `.stackTraceLimit`
    - stackに詰める上限値、デフォルト値は10
- doesNot is not defined みたいなエラーが起きた名前がちゃんと出るようになった(v8と同じ)
- io.jsは全てErrorやErrorを継承したもの
    - C++レイヤで起きてるものもあるのでそれは復帰不可
- エラーをキャッチしないと死ぬよ！と明記された
- SystemError
    - システム例外
    - ERRNO みたいな
    - LinuxのManに書いてある
    - でも不親切なのでio.jsにもドキュメントが載った

--

# Promiseのキャンセル - ama-ch

- bluebird
    - `Promise.CacellationError`というものを投げる
    - `throw new Promise.CancellationError()`でも同じようになる
- Closure
    - `thenCatch`で`goog.Promise.CancellationError`
- Promiseのキャンセルはどうあるべきか?
- => Fetch(FetchPromise)のはなしへ

--

## Fetch進捗状況について

- `fetch`は関数一つ
- どうやって`abort`するの?
    - abortとtimeOutは別?
- まずはtimeoutで話が上がった
    - [Add timeout option · Issue #20 · whatwg/fetch](https://github.com/whatwg/fetch/issues/20 "Add timeout option · Issue #20 · whatwg/fetch")
- Fetch -> ServiceWorkerが話が移行
    - [Returning a FetchPromise from fetch() · Issue #625 · slightlyoff/ServiceWorker](https://github.com/slightlyoff/ServiceWorker/issues/625 "Returning a FetchPromise from fetch() · Issue #625 · slightlyoff/ServiceWorker")
- Fetchをabortできるように
    - 現状の案
         - `fetch`はFetchPromise という独自のPromiseを返す
         - `fetchPromise.abort`をできるようにする
         - 公開する関数を一つにしたので、何でもfetchはオプションオブジェクトでやる
    - Fetchのいいところ
         - Requestクラス、Responseクラスができたところ
    - やろうとしたことに対してシンプル過ぎて、拡張性が欠けているのでは
         - fetchは高レベルっぽい
    - Promiseは値の抽象なので、操作APIを入れるのはおかしい
         - `Promise.race` とかがあるのに`cance`できないのは何か中途半端
         - promiseに`cancel`をつけるかの是非については考える必要がありそう

--

## power-assertで例外を投げた話 - t_wada

- power-assertの例外
    - 最近throwする機会がでてきた
    - watchifyのバグを踏んだ
         - 何回もASTの変換をかましてきておかしくなってきた
         - AST変換系は、他のツールの動作を妨げないほうがいいだろう?
         - でも、実際にpbwer-asssert + watchify*2の変換でバグってしまう
         - 対象の観測で対象の振る舞いを変えては行けない
         - もともと強い意志を持たせてなかったけど、これは良くないので例外を投げることをした
    - power-assertで変換した形跡があったらエラーを投げる
         - 2度変換したようとしたらエラーを投げる
         - new Error or カスタムエラー
         - 捕まえる側に判断できる情報を与えたい
              - => JSだと上手くできない(カスタムエラーはあんまり意味ないif文になる)
              - => ただのnew Errorを投げることができた
              - 使い手には情報を与える、放っておくと例外を投げる設計にした
         - strict、looseのオプションは必要?
              - エラーが起きたらそのまま返す
              - 抽象的なものほど厳しくしたほうがいいと思ったので、オプションはなしてstrictのみの動作にした
              - 捕まえる人は一回試してこのエラーが起きることを知ってる
         - esprimaもエラーを投げてる、empowerもエラーを投げると区別がつく?
              - espowerがカスタムエラーを投げた方がデメリットもないし、悪くないのでは?
         - 動くものが動かなくなったものではないのでsemverはどうするのか?
         - 事前条件 = ensure? 事後条件?
- カスタムエラーの話
    - カスタムエラー
    - Util.isError にカスタムエラーを渡すとfalseになってた
    - 去年ぐらいに直った
    - `catch`が結局貧弱なので、そこまでカスタムエラーは必要ないのでは?
    - 静的型的にはカスタムエラーを作ってプロパティを作るのがいいな
    - 判別可能な手段を提供したいというのが主な目的、それがカスタムエラーである絶対条件ではない
    - catchして何ができるかを考える必要がある
    - Nodeの場合はエラーを吐いて終わればいいので、エラーの情報を豊富にして投げて終わる
    - ブラウザの場合はwindow.onerrorしかなくて、何でもエラーとして来る
         - 拡張のエラーとかも来てしまう
         - ヒューリスティックに決めるしかない

  
-----
         
## Promise.thenの中で起きた例外のキャッチ - Hokamura

- thenの中でエラーが起きたの問題
	- typoによるプログラマエラーとオペレーションエラー的な区別ができない
	- どっちも`catch`にエラーとして来てしまうだけ
- http://jsbin.com/xixicexefu/1/
- AngularのQは例外投げる + catchを呼ぶ動作をしてくれる
- 案1
    - thenの中でthrowを使わない + debuggerでbreakを使う
    - プログラマエラーだけbreakできる
- 案2
    - Deferredを使う
    - Promiseのエラーハンドリングはしないで、自分でtry-catchによるハンドリング
- catchでプログラマエラーとreject的なエラーを判別をする方法が、現状のネイティブPromiseにはない
	- Errorの種類はあるかもしれないが、プログラムエラー(typo)とかかどうかという意味合いのエラーなのかはわからない
- Promiseがデフォルトで自動キャッチに倒されるところに起因する話

--

## エラーハンドリングとセキュリティ - kyo_ago

- window.onerrorが少なくてあればいい
- 問題になってくれるのはwindow.onerrorで取ったあと
    - New Relicでエラーを取れる
         - [JS errors dashboard: Examining errors over time | New Relic Documentation](https://docs.newrelic.com/docs/browser/new-relic-browser/browser-pro-features/js-errors-dashboard-examining-errors-over-time "JS errors dashboard: Examining errors over time | New Relic Documentation")
    - Googleアクセス解析
         - [例外 - ウェブ トラッキング（analytics.js） - Google アナリティクス — Google Developers](https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions "例外 - ウェブ トラッキング（analytics.js） - Google アナリティクス — Google Developers")
    - 大量のエラーが起きた時にエラーを間引くの?
- 攻撃の兆候をonerrorで取って見つける
    - CSPのバイオレーションレポートが正規の手段
    - report onlyでエラーにしないけど、エラー報告を取れる
    - nonceを使えば、いい感じに使えるのではという話
    - CSPは外部サイトに投げるのは怖い
- ログをブラウザで貯めて、後で送る機能を作りたい
	 - ログを貯める場所がない
	 - localStorageを専有しても大丈夫なの?
	 - localstorageの容量取れない問題

--

## Errorのre-throwについて

- re-throwした時の振る舞いがバラバラ
- Chromeはアクセスするまでstackの内容が決まらない事がる
	- re-throwすると変わってしまう?

----

# その他

- 3時間ぐらいだったけどかなり長時間やってた感覚になった
- プログラマエラーとオペレーショナルエラーはちゃんと分けて話す
- エラーハンドリングとバリデーションエラーは混ぜて語らない方がいい
- 型が強いJavaとかの言語でのエラーハンドリングをそのままJavaScriptに持ってきても微妙な事が多い
	- 特にカスタムエラーは言語の性質に関わる部分がある
- 特にJavaScriptはcatchの処理が弱い
- Promiseでのエラーハンドリングはやっぱり皆悩んでる
	- deferredを使うのはひとつの選択肢なのではと思う
	- [4.4. DeferredとPromise](http://azu.github.io/promises-book/#deferred-and-promise "4.4. DeferredとPromise")