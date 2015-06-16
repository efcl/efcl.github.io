---
title: "2015年前半のJavaScriptを振り返る"
author: azu
layout: post
date : 2015-06-15T23:59
category: JavaScript
tags:
    - JavaScript
    - まとめ

---

[JSer.info](http://jser.info/)というサイトをやってるのですが、2015年1月から半年ぐらい経ったので軽く振り返りをしてみました。

途中で出てくるグラフとか数値は[JSer.info](http://jser.info/)での言及数などを[jser/stat-js](https://github.com/jser/stat-js "jser/stat-js")を使って出したものです。
なので自分の主観的な数値に過ぎないので、一般的とは値とは異なる可能性があることは覚えておいてください。


- [2015-01-06のJS: ESLint 0.11.0、Browserifyとwebpack、TypeScriptの本 - JSer.info](http://jser.info/2015/01/06/eslint0.11-browserify-webpack-typescript/ "2015-01-06のJS: ESLint 0.11.0、Browserifyとwebpack、TypeScriptの本 - JSer.info")
    - browserify vs webpack
    - 新たなWeeklyサイトがでてきた
- [2015-01-13のJS: 6to5、ES6とjspm、リファクタリングJavaScript - JSer.info](http://jser.info/2015/01/13/6to5-jspm-refactoring-javascript/ "2015-01-13のJS: 6to5、ES6とjspm、リファクタリングJavaScript - JSer.info")
	- 6to5 2.0リリース 認知されてきた
- [JSer.info 4周年 - JSer.info](http://jser.info/2015/01/16/4-years/ "JSer.info 4周年 - JSer.info")
	- 4年経った
- [2015-01-20のJS: TypeScript 1.4、io.js 1.0、bluebird 2.7のglobal rejection events - JSer.info](http://jser.info/2015/01/20/typescript1.4-iojs-bluebird2.7/ "2015-01-20のJS: TypeScript 1.4、io.js 1.0、bluebird 2.7のglobal rejection events - JSer.info")
    - TypeScritp 1.4リリース
    - Angularチームと協力しているなど色々布石があった
    - Node.jsのforkである[io.js](https://iojs.org/en/index.html "io.js") 1.0.0がリリース
- [2015-01-28のJS: Vivaldi、lodash 3.0.0、JavaScriptテスト概要 - JSer.info](http://jser.info/2015/01/28/vivaldi-lodash3-js-tests/ "2015-01-28のJS: Vivaldi、lodash 3.0.0、JavaScriptテスト概要 - JSer.info")
    - [Vivaldi](https://vivaldi.com/ "A New Browser for Our Friends ◦ Vivaldi")リリース
    - [What the Virtual Viewport?](http://updates.html5rocks.com/2015/01/virtual-viewport "What the Virtual Viewport?")
        - Viewportの変更が結構印象的
- [2015-02-02のJS: 6to5 Ver3.0、CoffeeScript 1.9.0、PhantomJS 2.0 - JSer.info](http://jser.info/2015/02/02/6to5-coffeescript-phantomjs/ "2015-02-02のJS: 6to5 Ver3.0、CoffeeScript 1.9.0、PhantomJS 2.0 - JSer.info")
    - PhantomJS 2.0はリリースされたはずなのに、未だに安定してない
    - ASTの話がごちゃごちゃしてたのもこの頃
    - [最近のASTパーサの動き](http://azu.github.io/slide/crosushi/shift-ast.html "最近のASTパーサの動き")
- [2015-02-09のJS: Node v0.12.0、Esprima 2.0、CSS Reference - JSer.info](http://jser.info/2015/02/09/nodejs-0.12-esprima2.0-css-reference/ "2015-02-09のJS: Node v0.12.0、Esprima 2.0、CSS Reference - JSer.info")
	- ずっとでるでる言われていた[Node v0.12.0](http://blog.nodejs.org/2015/02/06/node-v0-12-0-stable/ "Node v0.12.0")がリリース
	- ASTパーサの代表格であるESprimaがjQuery Foundationに移管
- [2015-02-17のJS: Babel(6to5)、BrowserSync 2.0、Flux実装比較 - JSer.info](http://jser.info/2015/02/17/6to5-to-babel-browsersync-flux/ "2015-02-17のJS: Babel(6to5)、BrowserSync 2.0、Flux実装比較 - JSer.info")
	- ESTreeというAST策定のコミュニティ仕様ができてASTは一段落
	- [[2015-02] 最近のJavaScript AST標準化の動き | Web Scratch](http://efcl.info/2015/02/26/recent-js-ast/ "[2015-02] 最近のJavaScript AST標準化の動き | Web Scratch")
	- React CanvasがでてきてReactがいろんな層でみかけるようになってきた
	- Extensible Web!
- [2015-02-23のJS: Underscore.js 1.8.0、CodeMirror 5.0、Web Audio入門 - JSer.info](http://jser.info/2015/02/23/underscore1.8-codemirror5.0-web-audio-api/ "2015-02-23のJS: Underscore.js 1.8.0、CodeMirror 5.0、Web Audio入門 - JSer.info")
	- Underscore 1.8.0リリース騒動
	- underlodash立ち上げの起点となった
	- [The Big Kahuna: Underscore + Lodash Merge Thread · Issue #2182 · jashkenas/underscore](https://github.com/jashkenas/underscore/issues/2182 "The Big Kahuna: Underscore + Lodash Merge Thread · Issue #2182 · jashkenas/underscore")
	- 個人的にWeb Audioが流行ってた
	- イベントでReactについての発表が増えてた
- [2015-03-02のJS: Firefox 36.0、ASTのコミュニティ標準、Service Worker - JSer.info](http://jser.info/2015/03/02/firefox36-ast-serviceworker/ "2015-03-02のJS: Firefox 36.0、ASTのコミュニティ標準、Service Worker - JSer.info")
	- Service WorkerがChromeに実装された
	- 今までのAPIとは少しレイヤーが違うという感じで盛り上がってた
- [2015-03-09のJS: ESLint 0.16.0、AtScript is TypeScript - JSer.info](http://jser.info/2015/03/09/eslint0.16-atscript-is-typescript/ "2015-03-09のJS: ESLint 0.16.0、AtScript is TypeScript - JSer.info")
	- AtScriptはなかったことになった
	- Angular 2ではTypeScriptを使うことになって、MSと協力関係がアピールされた
	- Angular 2が多少方向転換した
	- [Angular2 周り](https://gist.github.com/azu/df63f08e2aa82cb81b5e "Angular2 周り")
- [2015-03-16のJS: React v0.13、Chrome 42β、モダンJavaScriptの歴史 - JSer.info](http://jser.info/2015/03/16/react0.13-chrome42beta-modern-js-hisotory/ "2015-03-16のJS: React v0.13、Chrome 42β、モダンJavaScriptの歴史 - JSer.info")
	- GoogleのStrong Mode(SaneScript)とSoundScript
	- React v0.13がリリースされた
- [2015-03-23のJS: IEのアップデート、RxJS入門、Chrome DevToolsの新機能と計測の仕方 - JSer.info](http://jser.info/2015/03/23/ie-rxjs-chrome-devtools/ "2015-03-23のJS: IEのアップデート、RxJS入門、Chrome DevToolsの新機能と計測の仕方 - JSer.info")
	- コアな層以外でRxについての話をポツポツみかけるようになってきた

![rx](http://efcl.info/wp-content/uploads/2015/06/16-1434380739.png)

RxJSそのものについての話もちょっと見かけるようになって来た感じですが、関連してECMAScriptにobservableを入れようというプロポーサル周りもこの関連して言及が増えた感じがします。
(まあ、大体Netflix)

- [Asynchronous JavaScript at Netflix by Matthew Podwysowski at JSConf Budapest 2015 - YouTube](https://www.youtube.com/watch?v=a8W5VVGO-jA)
- [Observable.pdf - Google ドライブ](https://docs.google.com/file/d/1uEVcOgJIMsHjN1vypKKyfmDRg_bz5cKXpo0v4Nc0q8NfqKolBeSDHIj8z9GS8A4EiMpZ8QQ3l87Q_wF3/edit)
- [zenparsing/es-observable](https://github.com/zenparsing/es-observable)
	
[Asynchronous Programming: The End of The Loop - Video Tutorial Series @eggheadio](https://egghead.io/series/mastering-asynchronous-programming-the-end-of-the-loop "Asynchronous Programming: The End of The Loop - Video Tutorial Series @eggheadio")というスクリーンキャストは分かりやすいのでオススメです。

- [2015-03-31のJS: Dart to JS、ES6 Generator、Reactでシングルページアプリケーション作成 - JSer.info](http://jser.info/2015/03/31/dart-generator-react-tutorial/ "2015-03-31のJS: Dart to JS、ES6 Generator、Reactでシングルページアプリケーション作成 - JSer.info")
	- DartVM終了のお知らせ 
- [2015-04-06のJS: Babel 5.0.0と次期ECMAScript、Bower 1.4.0、JSCSと自動整形 - JSer.info](http://jser.info/2015/04/06/babel5-bower-jscs/ "2015-04-06のJS: Babel 5.0.0と次期ECMAScript、Bower 1.4.0、JSCSと自動整形 - JSer.info")
	- BabelがTC39プロポーサルを意識したオプションを導入
	- 一般的な開発ユーザーと仕様との接点ができた
	- Bower v1.4.0でloginとかunregisterとかが入ったけど、いまさら感があって反応が薄い
- [2015-04-14のJS: 初代jQueryをコードリーディング、npmのエコシステムとプロトタイピング - JSer.info](http://jser.info/2015/04/14/jQuery-origin/ "2015-04-14のJS: 初代jQueryをコードリーディング、npmのエコシステムとプロトタイピング - JSer.info")
	- jQueryの歴史発掘
	- [npm private modules](http://blog.npmjs.org/post/116379479775/npm-private-modules-are-here "npm private modules")が公開
	- 実は[publicなら無料](http://efcl.info/2015/04/30/npm-namespace/)で公開できるので、scoped moduleで公開してる事例が増えてきた
- [2015-04-20のJS: ECMAScript6最終ドラフト、JavaScriptトレーニング - JSer.info](http://jser.info/2015/04/20/es6-final-draft-js-traning/ "2015-04-20のJS: ECMAScript6最終ドラフト、JavaScriptトレーニング - JSer.info")
	- ES6の最終ドラフトがリリースされた
	- Electronにリネーム
- [2015-04-29のJS: Globalize 1.0、Flux実装、Code Smellsの検出 - JSer.info](http://jser.info/2015/04/29/globalize-flux-code-smells/ "2015-04-29のJS: Globalize 1.0、Flux実装、Code Smellsの検出 - JSer.info")
	- React.js meetupとかでReeactの日本語記事が色々増えた。
	- 日本でもReactが普通の選択肢として使われてくるようになってきた
	- [Solar System of JS](http://shaunlebron.github.io/solar-system-of-js/#0 "Solar System of JS")がすごい
- [2015-05-06のJS: io.js 2.0.0、Microsoft Edge、Isomorphic - JSer.info](http://jser.info/2015/05/06/iojs2.0.0-msedge-isomorphic/ "2015-05-06のJS: io.js 2.0.0、Microsoft Edge、Isomorphic - JSer.info")
	- io.jsがメジャーアップデート...が殆ど破壊的な変更がなかった
	- MSの新しいブラウザ「Microsoft Edge」の開発者サイトが公開された
	- 近年のMSっぽく最初からとてもオープンな雰囲気で公開
- [2015-05-12のJS: ECMAScript 2015(ES6)入門、最近のnpmの変更点を見る - JSer.info](http://jser.info/2015/05/12/ecmascript2015-npm/ "2015-05-12のJS: ECMAScript 2015(ES6)入門、最近のnpmの変更点を見る - JSer.info")
	- Babelを使ったES6を学ぶ記事とかが増えてきた感じ
	- Traceurはほぼ聞かなくなり、ES6の変換はBabelを使うのがデファクトっぽくなった

![traceur-babel](http://efcl.info/wp-content/uploads/2015/06/16-1434418123.png)

ES6+をTranspileするツールである[Traceur](https://github.com/google/traceur-compiler "Traceur")についての言及が、[Babel](http://babeljs.io/ "Babel")が広まってからは殆どなくなった感じがします。
	
- [2015-05-19のJS: Firefox 38、Backbone.js 1.2.0、マイクロベンチマークの問題 - JSer.info](http://jser.info/2015/05/19/firefox38-babel-bench/ "2015-05-19のJS: Firefox 38、Backbone.js 1.2.0、マイクロベンチマークの問題 - JSer.info")
	- Polymer 0.9リリースされて、色々変更があったがそこまで触ってる人はいなかった(1.0待ち)
	- [Do not Measure the Weather](http://mrale.ph/talks/goto2015/#/ "Do not Measure the Weather")
	- JavaScriptエンジンの中身まで入った最適化の話は貴重
	- [Function Bind Syntax · Babel](http://babeljs.io/blog/2015/05/14/function-bind/ "Function Bind Syntax · Babel")
	- BabelのES.nextのプロポーサルサポートの一つとして`::`
	- このプロポーサルについての[記事](http://blog.jeremyfairbank.com/javascript/javascript-es7-function-bind-syntax/)や[前提としたライブラリ](https://github.com/jussi-kalliokoski/trine)なども登場している
	- Babel以前は一部の人しかこの段階では興味を持たなかったのが、結構前倒しで反応がでてきていい流れに見える
- [2015-05-27のJS: Promiseのありがちな間違い、AngularJS 2に向けて、Plain JS - JSer.info](http://jser.info/2015/05/27/promise-angular2/ "2015-05-27のJS: Promiseのありがちな間違い、AngularJS 2に向けて、Plain JS - JSer.info")
	- CoffeeScriptやES5と比較したES6の書き方という記事が多かった
	- 段階を経て移行していく雰囲気を感じた

![coffee-typscript](http://efcl.info/wp-content/uploads/2015/06/16-1434414830.png)

CoffeeScriptとTypeScriptの言及数の変化を見るとCoffeeScriptは言及は少なくて、あっても[Replace CoffeeScript with ES6](https://robots.thoughtbot.com/replace-coffeescript-with-es6 "Replace CoffeeScript with ES6")のような記事だったりしてCoffeeScript自体についての話は本体のアップデートと[The Pragmatic Bookshelf | CoffeeScript](https://pragprog.com/book/tbcoffee2/coffeescript "The Pragmatic Bookshelf | CoffeeScript")ぐらいな感じがします。

- [2015-06-02のJS: AngularJS 1.4.0、Polymer 1.0リリース、今後のJSの流れ - JSer.info](http://jser.info/2015/06/02/Angular1.4.0-Polymer1.0/ "2015-06-02のJS: AngularJS 1.4.0、Polymer 1.0リリース、今後のJSの流れ - JSer.info")
	- Polymer 1.0がリリースされた。
	- PolymerやWeb Componentsへの言及は一定で、ちょっと盛り上がりに欠けている
	- [Web ComponentsはES4のように感じる日がくるかもしれない](https://twitter.com/codylindley/status/609006418620862464)というのもその空気感

![polymer-angular-react](http://efcl.info/wp-content/uploads/2015/06/16-1434381470.png)

WebComponents(Polymer含む)とReactとAngularJSのJSer.info内での言及数を表したものです。

Reactは2014年末あたりから伸びて(Advent Calender系)、2-3月ぐらいにスライド(発表)が増えてるのは年末の記事読んでReact触った人が増えたからかなーとか見方もできます。
4-6月もまあ安定して言及されてた気がします。

AngularJSもライブラリとかのくくりだとよく言及されるタイプだと思うので並べて見ると、ちょっと下降傾向に見えます。
これはJSer.infoというサイトの特性がでてて、基本的に新しいものを取り上げる性質があるます。

なので、どこかで見たような...となる感じのだったり、ある機能のこの問題といったようなコンテキストが狭すぎるものはあんまり取り上げなかったりします。

2014年の10月でAngularが伸びてるのは、[Angular 2](https://angular.io/ "Angular is a development platform for building mobile and desktop web applications - Angular")が発表されたからですね。

- [2014-10-27のJS: WebStorm 9、ESLint 0.9.0、AngularJS 2.0とAtScript - JSer.info](http://jser.info/2014/10/27/webstorm9-eslint-atscript/ "2014-10-27のJS: WebStorm 9、ESLint 0.9.0、AngularJS 2.0とAtScript - JSer.info")

それ以降はポツポツという感じで、Angularにおける新しいもの(=Angular2とか1.xの更新)はポツポツとしたので下降気味になってるという解釈ができそうですね。
3月でちょっとだけ伸び出るのはAtScriptがどっかいくことになったからですね。

- [2015-03-09のJS: ESLint 0.16.0、AtScript is TypeScript - JSer.info](http://jser.info/2015/03/09/eslint0.16-atscript-is-typescript/ "2015-03-09のJS: ESLint 0.16.0、AtScript is TypeScript - JSer.info")

```
╒═════════╤═══════════════╤═══════╤═══════════╕
│         │ WebComponents │ React │ AngularJS │
╞═════════╪═══════════════╪═══════╪═══════════╡
│ 2014-1  │ 0             │ 1     │ 5         │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-2  │ 0             │ 4     │ 10        │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-3  │ 0             │ 2     │ 6         │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-4  │ 1             │ 1     │ 3         │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-5  │ 6             │ 2     │ 4         │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-6  │ 9             │ 2     │ 6         │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-7  │ 11            │ 3     │ 12        │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-8  │ 4             │ 1     │ 7         │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-9  │ 2             │ 10    │ 7         │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-10 │ 9             │ 27    │ 24        │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-11 │ 3             │ 19    │ 6         │
├─────────┼───────────────┼───────┼───────────┤
│ 2014-12 │ 4             │ 6     │ 2         │
├─────────┼───────────────┼───────┼───────────┤
│ 2015-1  │ 2             │ 7     │ 3         │
├─────────┼───────────────┼───────┼───────────┤
│ 2015-2  │ 0             │ 24    │ 7         │
├─────────┼───────────────┼───────┼───────────┤
│ 2015-3  │ 1             │ 25    │ 9         │
├─────────┼───────────────┼───────┼───────────┤
│ 2015-4  │ 0             │ 16    │ 2         │
├─────────┼───────────────┼───────┼───────────┤
│ 2015-5  │ 5             │ 8     │ 6         │
├─────────┼───────────────┼───────┼───────────┤
│ 2015-6  │ 2             │ 10    │ 0         │
╘═════════╧═══════════════╧═══════╧═══════════╛
```

一方、WebComponents(Polymer含む)は爆発的に言及数が増えたタイミングがない感じです。

Polymer 1.0がでたので、ちょうど今がタイミングなのでここ数ヶ月でどういう変化があるかが大事な気がします。

> 本当に Polymer のエコシステムが受け入れられるのか、そもそも Web Components 自体がどうなるのか予測できませんが、Polymer にとっても Web Components にとっても、いよいよ重要な時期に入ったのではないでしょうか。
> -- [Google I/O で v1.0 が発表された Polymer の Elements Catalog が面白い ::ハブろぐ](http://havelog.ayumusato.com/develop/webcomponents/e673-polymer_elements_catalog.html "Google I/O で v1.0 が発表された Polymer の Elements Catalog が面白い ::ハブろぐ")


- [2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル - JSer.info](http://jser.info/2015/06/10/es6-status-webaudio/ "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル - JSer.info")
	- JSer.infoがi18n対応した(韓国語訳)

## おわりに

2015年1月から2015年6月15日までに紹介した記事についてるタグ率

```
           Key|Ct  (Pct)    Histogram
    JavaScript|340 (23.40%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
       library|138  (9.50%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   ReleaseNote|117  (8.05%) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
         Tools| 69  (4.75%) ▬▬▬▬▬▬▬▬▬▬▬
    ECMAScript| 59  (4.06%) ▬▬▬▬▬▬▬▬▬
       node.js| 39  (2.68%) ▬▬▬▬▬▬
  presentation| 37  (2.55%) ▬▬▬▬▬▬
         React| 35  (2.41%) ▬▬▬▬▬▬
       testing| 33  (2.27%) ▬▬▬▬▬
           CSS| 30  (2.06%) ▬▬▬▬▬
       browser| 28  (1.93%) ▬▬▬▬▬
       Summary| 25  (1.72%) ▬▬▬▬
          book| 19  (1.31%) ▬▬▬
      tutorial| 18  (1.24%) ▬▬▬
         movie| 16  (1.10%) ▬▬▬
           DOM| 14  (0.96%) ▬▬▬
     AngularJS| 14  (0.96%) ▬▬▬
           npm| 14  (0.96%) ▬▬▬
   performance| 13  (0.89%) ▬▬
          Flux| 13  (0.89%) ▬▬
        Chrome| 12  (0.83%) ▬▬
    TypeScript| 11  (0.76%) ▬▬
           AST| 11  (0.76%) ▬▬
          spec| 11  (0.76%) ▬▬
         debug| 11  (0.76%) ▬▬
            IE| 10  (0.69%) ▬▬
          HTML|  9  (0.62%) ▬▬
      Promises|  8  (0.55%) ▬▬
        jQuery|  7  (0.48%) ▬▬
       firefox|  7  (0.48%) ▬▬
WebPlatformAPI|  7  (0.48%) ▬▬
      flowtype|  7  (0.48%) ▬▬
        Events|  7  (0.48%) ▬▬
  CoffeeScript|  7  (0.48%) ▬▬
   translation|  7  (0.48%) ▬▬
```

月ごとの紹介した記事数(2014年1月から2015年6月)を見ると全体的に2015年4月が少ない

![紹介記事数](http://efcl.info/wp-content/uploads/2015/06/16-1434412905.png)

## 調べ方

JSer.infoに投稿した記事(posts.json)、紹介したサイト(items.json)はJSONデータとして取得できるようにしてあります。

- [JSer.info is data · Issue #45 · jser/jser.info](https://github.com/jser/jser.info/issues/45 "JSer.info is data · Issue #45 · jser/jser.info")

そのままのJSONだと扱いにくいので、今回[jser/stat-js](https://github.com/jser/stat-js "jser/stat-js")というライブラリを作って調べました。

[jser/stat-js](https://github.com/jser/stat-js "jser/stat-js")はposts.jsonとitems.jsonをラップしたもので、JSer.infoの周期(`JSerWeek`)とJSer.infoに投稿した記事(`JSerPost`)とその記事で紹介したサイト(`JSerItem`)を関連付けて取れるようになってます。

例えば、2015年1月から6月までに紹介したサイトのタグ一覧出したい場合は、以下のようなスクリプトを書けば、1行1タグの出力ができます。

```js
var JSerStat = require("jser-stat").JSerStat;
var countByGroup = require("jser-stat").compute.countByGroup;
var stat = new JSerStat();
var beginDate = new Date(2015, 0, 1);
var endDate = new Date(2015, 5, 1);
var weeks = stat.getJSerWeeksBetWeen(beginDate, endDate);
weeks.forEach(function (week) {
    week.items.forEach(function (item) {
        item.tags.forEach(function (tag) {
            console.log(tag);
        })
    });
});
```

これと[philovivero/distribution](https://github.com/philovivero/distribution "philovivero/distribution")を合わせれば、以下のようなタグの割合などが簡単に出せました。

![keywords](http://efcl.info/wp-content/uploads/2015/06/16-1434415741.png)

今回調査に使ったスクリプトは[azu/jser-keyword-count](https://github.com/azu/jser-keyword-count "azu/jser-keyword-count")においてあります。
(これをNumberなどに食わせてグラフを作ってます)

今回スクリプトを書いて自分で貯めてたデータと自分の意見を照らしあわせてみると、「これはちょっと下火な感じ」という感覚的に思ってたことが数値としても現れてて面白かったです(あくまで主観なので、一般にそうではない可能性もある)

JSer.infoのデータは誰でも使えるので(あんまり正確性は保証しないですが)、[jser/stat-js](https://github.com/jser/stat-js "jser/stat-js")など使って遊んで見るといいかもしれません。

もう少し潜在的なデータの出し方が見えてくると面白そうなきがします。