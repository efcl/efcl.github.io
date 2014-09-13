---
title: "V8の最適化とIRHydraでの可視化とベンチマークについてのメモ"
author: azu
layout: post
date : 2014-09-13T22:05
category: JavaScript
tags:
    - JavaScript
    - V8
    - JIT
    - 最適化

---
V8 の最適化について 色々(主に[Vyacheslav Egorov](http://mrale.ph/ "Vyacheslav Egorov")さんの記事や[スライド](http://mrale.ph/talks/ "My Talks"))読んでてたのでそれのメモ。

この文章は2014年9月13日に書かれて最適化されていないため、この文章を元に最適化をすると失敗すると思います。

---

## 参考まとめ

V8に関するリソースまとめ

-  [V8 Resources](http://mrale.ph/v8/resources.html "V8 Resources") - [Vyacheslav Egorov](http://mrale.ph/ "Vyacheslav Egorov")さんによる
- [thlorenz/v8-perf](https://github.com/thlorenz/v8-perf "thlorenz/v8-perf") - [Thorsten Lorenz](https://github.com/thlorenz "Thorsten Lorenz")さんによる
- [Understanding V8 and JIT compilation basics - Google スライド](https://docs.google.com/presentation/d/19Euy3sy-jt36sbKww8HEZQHYD846h_N-YNCQiQ-PPsQ/pub#slide=id.p "Understanding V8 and JIT compilation basics - Google スライド") - 概要分かりやすい

## Hidden Class

V8がリリースされた時から特徴としてあげられている最適化

- [V8: an open source JavaScript engine - YouTube](https://www.youtube.com/watch?v=hWhMKalEicY "V8: an open source JavaScript engine - YouTube")
- [V8 祭り - Backnumbers: Steps to Phantasien](http://steps.dodgson.org/bn/2008/09/07/ "V8 祭り - Backnumbers: Steps to Phantasien") - 2008

Hidden Classについては公式サイトにも[Design Elements - Chrome V8 — Google Developers](https://developers.google.com/v8/design "Design Elements - Chrome V8 — Google Developers")というのがあるのでこれが分かりやすい。

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
```

のようなコンストラクタで、これを`new`したインスタンスの形(プロパティが名前、種類とか)が同じなら、プロパティのアクセスが高速になるやつ。

- [JIT compilation - TechTalksNSU - March 2014](http://mrale.ph/talks/techtalksnsu2014/#/31 "JIT compilation - TechTalksNSU - March 2014") 図だとこれ面白い

逆に以下みたいの`p2`みたいに形が崩れると最適化がされなくなる(de-opt)

```js
var p1 = new Point(10, 10);
var p2 = new Point(20, 20);
p2.name = "BREAK"; // <= これで最適化は壊れる
```

これは、Spidermonkeyでも同じようなものがあり[Shape based polymorphic caching](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Internals/Property_cache "Property cache - Mozilla | MDN")というのが多分それだと思います。

- [Supersonic JavaScript // Speaker Deck](https://speakerdeck.com/ariya/supersonic-javascript "Supersonic JavaScript // Speaker Deck")
- [b3-morita.pdf](http://www.mozilla.jp/static/docs/events/2008-fxdevcon/b3-morita.pdf "b3-morita.pdf") 2008

実装的な話だと[Polymorphic Inline Cache implementation of iv / lv5 - 枕を欹てて聴く](http://constellation.hatenablog.com/entry/2012/12/22/235914 "Polymorphic Inline Cache implementation of iv / lv5 - 枕を欹てて聴く")とか。

このHidden Classとかは皆知ってると思いますが、実際にどういうケースで最適化が**行われないか**は[IRHydra2 ](http://mrale.ph/irhydra/2/# "IRHydra2 ")で確認するのが簡単で面白いです。

### [IRHydra2 ](http://mrale.ph/irhydra/2/# "IRHydra2 ")

IRHydraは、Chrome/V8のデバッグオプションでIR(中間表現)やインライン化等のログを元に**最適化がされていない**(de-opt)な部分を可視化したり、ディスアセンブリ(コードと並べて表示も出来る)、コントールフローの表示等をしてくれるツールです。
(Dart VMにも対応してます)


- [Release the IRHydra!](http://mrale.ph/blog/2013/02/17/release-the-irhydra.html "Release the IRHydra!") v1 
-  [(Pre)release IRHydra 2.0](http://mrale.ph/blog/2014/01/28/prerelease-irhydra2.html "(Pre)release IRHydra 2.0") v2- この動画でdemoを扱ってるので見ておくといいです。

[IRHydra2 ](http://mrale.ph/irhydra/2/# "IRHydra2 ")の[demo-1](http://mrale.ph/irhydra/2/#demo-1 "")がまさにHidden Classの最適化されない事例についてのサンプルコードです。

 - [demo.js - irhydra - In browser viewer for V8 and Dart VM compilation artifacts - Google Project Hosting](https://code.google.com/p/irhydra/source/browse/web/demos/v8/deopt-eager/demo.js?name=polymerized "demo.js - irhydra - In browser viewer for V8 and Dart VM compilation artifacts - Google Project Hosting") demo1のコード

```js
var v2 = new Vec2(0.1, 0.2);
v2.name = "whatever";
loop(v2);
```

というようにv2で形が`.name`によって最適化が行われなくなっていることがIRHydra2 では可視化されます。

![Eager deoptimization](http://efcl.info/wp-content/uploads/2014/09/13-1410615756.png)

`CheckMaps`というところでpolymorphic(形が多様化)してることが検出されて最適化されてないというメッセージが見られます。

実際に途中で形が変わらないように最初からコンストラクタ関数に`name`というのを追加してあげるとこのdeoptのメッセージは出なくなります。

```js
function Vec2(x, y) {
  this._x = x;
  this._y = y;
  this.name = ""; // <= 追加
}

Vec2.prototype = {
  get x () { return this._x; },
  get y () { return this._y; },

  len2: function () {
    return this.x * this.x + this.y * this.y;
  },

  len: function () {
    return Math.sqrt(this.len2());
  }
}

function len(v) {
  // We are going to deoptimize here when we call
  // loop the second time because hidden class of
  // v2 does not match hidden class of v.
  // We changed by adding a new property "name" to
  // the object allocated with Vec2.
  return v.len();
}

function loop(v) {
  var sum = 0;
  for (var i = 0; i < 1e5; i++) sum += len(v);
  return sum;
}

var v = new Vec2(0.1, 0.2);
loop(v);

var v2 = new Vec2(0.1, 0.2);
v2.name = "whatever";
loop(v2);
```

実際に試すには、`v8_enable_disassembler=1`でビルドしたV8が必要です。(ディスアセンブリが必要ない場合は、実行時のオプションだけでいいのかな)

自分は面倒だったので`brew edit v8`で[v8_enable_disassembler=1](https://gist.github.com/azu/203ada47a6a271a91d70 "v8_enable_disassembler=1")したものを作ってインストールしました。

使い方は[IRHydra2 ](http://mrale.ph/irhydra/2/# "IRHydra2 ")に書いてありますが、v8で以下のようにオプションをつけて実行すると(Chromeもjs-flagで同じような感じ)、`hydrogen-34272-1.cfg` のようなのと、`code.asm`というファイルができます。

```sh
v8 example.js \
--trace-hydrogen \
--trace-phase=Z \
--trace-deopt \
--code-comments \
--hydrogen-track-positions \
--trace-inlining \
--redirect-code-traces \
--redirect-code-traces-to=code.asm
```

これをInlinedに読み込ませると表示してくれます。

![img](http://monosnap.com/image/MQL21HelEEUj6aXweyzK98mtQSjKwR.png)

v8(d8)の使い方やインストールは以下などを参考にした方がいいと思います。

- [V8 Installation and d8 shell usage](https://gist.github.com/kevincennis/0cd2138c78a07412ef21 "V8 Installation and d8 shell usage")

### 最適化とループ

上記のdemo-1であえてループを回してる箇所があったのが疑問に思うかもしれません。

```js
function loop(v) {
  var sum = 0;
  for (var i = 0; i < 1e5; i++) sum += len(v);
  return sum;
}
```


自分も最初ループなしで試したいコードを書いたりして以下のようなメッセージがでてcfgとasmファイルが生成されなかったりしてよくわかってなかったです。

```
Concurrent recompilation has been disabled for tracing.
```

これは、ループを回すことでV8側が最適化が必要なhot codeであると認識させるためにループを回してるんだと思います。

> JVM HotSpotでは、ループの実行中に、 このループを内包した関数はhot codeだなと判断した場合、 実行中の関数をJITコンパイルします。

[V8のJITコンパイラ、Crankshaftについて — V8 Crankshaft Overview 1.3 documentation](http://nothingcosmos.github.io/V8Crankshaft/src/blog.html "V8のJITコンパイラ、Crankshaftについて — V8 Crankshaft Overview 1.3 documentation") という文章が分かりやすいです。

[PyPy.js: Now faster than CPython](https://rfk.id.au/blog/entry/pypy-js-faster-than-cpython/ "PyPy.js: Now faster than CPython") ででてくるChromeはある程度実行回数が増えた時からパフォーマンスが安定して良くなるのはこれと同じ理由なのかな?

---
### hot codeと最適化

先ほどループを回す(ある程度同じ処理を実行する)と最適化がかかる(JITコンパイルでコードをコンパイルするなど)というのは理にかなっていると思いますが、
このようなテストのためにループをするコードはどこかで見覚えがあると思います。

[jsPerf](http://jsperf.com/ "jsPerf")を使ってマイクロベンチマークを取るときに、こういう無意味なループを含んだコードを書いたことがあるかもしれません。

何がいいたいかというと、こういうJavaScriptエンジン側の最適化によって取りたいベンチマークとは別の意味になってる可能性があるという話です。

まさにそういう話が以下の記事で書かれています。

- [microbenchmarks fairy tale](http://mrale.ph/blog/2012/12/15/microbenchmarks-fairy-tale.html "microbenchmarks fairy tale")
- [The Black Cat of Microbenchmarks](http://mrale.ph/blog/2014/02/23/the-black-cat-of-microbenchmarks.html "The Black Cat of Microbenchmarks")

[bit-multiply · jsPerf](http://jsperf.com/bit-multiply "bit-multiply · jsPerf") のようにコード的には無意味なループを回してベンチマークを取ることがあると思います。

```js
var a = Math.round(Math.random()*100),
    b = Math.round(Math.random()*100);

for(var i = 0; i < 10000; i++) {
   multiply(a,b);
}
```

[The Black Cat of Microbenchmarks](http://mrale.ph/blog/2014/02/23/the-black-cat-of-microbenchmarks.html "The Black Cat of Microbenchmarks") ではこのコードがV8でどのように最適化されていって、無意味なベンチになってるかを[IRHydra2](http://mrale.ph/irhydra/2/# "IRHydra2")やEsprimaを使って解析していってます。

`multiply()` という計算を沢山するのを計測したいわけですが、この結果は結局使われていないため、この`multiply(a,b);`という部分は無意味なコードとみなされてるかもしれません。

そのような無意味なコードは取り除かれる(Dead code elimination (DCE))可能性があります。(どれくらい行われるのか細かい話は分からない)

- LICM(loop-invariant code motion)
- Dead code elimination (DCE)
- [v8-perf/compiler.md at master · thlorenz/v8-perf](https://github.com/thlorenz/v8-perf/blob/master/compiler.md#optimizing-compiler "v8-perf/compiler.md at master · thlorenz/v8-perf")

[最適化を無効にする方法はありますが](http://kolodny.github.io/blog/blog/2014/05/19/unoptimize-devtools-for-easy-debugging/ "Unoptimize V8 for Easy Debugging - Moshe&#39;s Blog")、ベンチマークを取りたい時は最適化自体は有効あってもいいと思うので、それが意図したもの以外も最適化されてるケースがあるかもというのが正しいベンチマークを取る難しさかも知れません。

## 意識できるレベルの最適化

ECMAScriptレベルのコードの最適化は実際のコードだと殆ど誤差になりがちで、DOM APIとかの方が圧倒的なのであまりコードを書くときにこういう最適化は気にしてないです。
(Hidden Classのやつぐらいは知っておいたほうがいいとは思います)

意識してやれるレベルのJavaScriptの最適化については[Supersonic JavaScript // Speaker Deck](https://speakerdeck.com/ariya/supersonic-javascript "Supersonic JavaScript // Speaker Deck")、[JavaScript: Need for Speed // Speaker Deck](https://speakerdeck.com/ariya/javascript-need-for-speed "JavaScript: Need for Speed // Speaker Deck")あたりを見るのがいいと思います。

実際にこういうエンジンレベルの最適化を意識してるライブラリ例としては[Bluebird](https://github.com/petkaantonov/bluebird "Bluebird")、[Lo-Dash](http://lodash.com/ "Lo-Dash")、[React](https://github.com/facebook/react "React")などがありますが、普通の人はこういう事やらないほうがいいと思います。。

Bluebirdは特にこれを意識してて、fast  caseに載せるために色々変則的なコードを書いたりしてて、Wikiにもそれらの事についてまとめられています。([ネイティブのPromiseより早い](https://github.com/petkaantonov/bluebird/blob/master/benchmark/stats/latest.md "bluebird/latest.md at master · petkaantonov/bluebird")とかはこういうレベルの話があるからだと思います)

- [Optimization killers · petkaantonov/bluebird Wiki](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers "Optimization killers · petkaantonov/bluebird Wiki")

Lo-dashも[そういうことのための変更](https://github.com/lodash/lodash/commit/88ad7d5ce5224e75b6106284e668a98007ba0c2f "Ensure `EXPANDO` doesn&#39;t disable fast properties in v8. · 88ad7d5 · lodash/lodash")を入れたり、ReactはV8側に[最適化のためのコミット](http://facebook.github.io/react/blog/2014/09/12/community-round-up-22.html "Community Round-up #22 | React")をしたりしています。

- [r21834 – v8 – V8 JavaScript Engine のfast property名の制限 | GH Issue Note](http://efcl.wordpress.com/2014/09/13/r21834-v8-v8-javascript-engine-google-project-hosting/ "r21834 – v8 – V8 JavaScript Engine のfast property名の制限 | GH Issue Note")

Chromium(V8も含む)プロジェクトの最適化周りの変更については以下のページにまとめられているそうです。

- [Speed Hall of Fame - The Chromium Projects](http://www.chromium.org/developers/speed-hall-of-fame "Speed Hall of Fame - The Chromium Projects")

最初に書いたように自分で理解して、追えるレベルになってからこういう最適化を入れたほうがいいと思います。(自分は興味ないのでやらない)

> この文章を元に最適化をすると失敗すると思います

---

## その他

各JavaScriptエンジンのベンチを継続的に取ってるサイト

- [ARE WE FAST YET?](http://arewefastyet.com/ "ARE WE FAST YET?")

## おわりに

[Vyacheslav Egorov](http://mrale.ph/ "Vyacheslav Egorov")さんのブログ読んでてて面白かったのでメモっただけの記事です。
最近だと[thlorenz/v8-perf](https://github.com/thlorenz/v8-perf "thlorenz/v8-perf")が広くまとまってるんじゃないかと思います。