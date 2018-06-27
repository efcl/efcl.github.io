---
title: "laco_sushiでJXA(JavaScript for Automation)の話をした"
author: azu
layout: post
date : 2018-06-27T22:16
category: イベント
tags:
    - JavaScript
    - applescript
    - jxa

---

[#laco_sushi](https://twitter.com/hashtag/laco_sushi?f=tweets&vertical=default&src=hash)に参加してきました。

- [laco_sushi - Togetter](https://togetter.com/li/1241434)

[JXA for TypeScript/Node.js](http://azu.github.io/slide/2018/laco_sushi/jxa-for-typescript.html)というタイトルで、JXAというAppleScriptのJavaScript版についての話しをしました。

[JXA-userland/JXA: JavaScript for Automation(JXA) packages for TypeScript/Node.js.](https://github.com/JXA-userland/JXA)というリポジトリに作ったものをまとめています。

- JXAの[TypeScript](https://www.typescriptlang.org/index.html)統合環境
    - JXAをTypeScriptで書けるようにした
- [Node.js](https://nodejs.org/)からJXAの実行ライブラリ
    - [@jxa/run](https://github.com/JXA-userland/JXA/tree/master/packages/@jxa/run) and [@jxa/repl](https://github.com/JXA-userland/JXA/tree/master/packages/@jxa/repl)
- [TypeScript](https://www.typescriptlang.org/index.html) definition file(`.d.ts`)を使ってWebStormやVScodeでのJXAのコード補完の実装
    - [@jxa/types](https://github.com/JXA-userland/JXA/tree/master/packages/@jxa/types) and [@jxa/global-type](https://github.com/JXA-userland/JXA/tree/master/packages/@jxa/global-type)

などを作った話をしました。

----



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a> はい <a href="https://t.co/qB5THJ8hO3">pic.twitter.com/qB5THJ8hO3</a></p>&mdash; lacolaco (@laco2net) <a href="https://twitter.com/laco2net/status/1011926588085026816?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



## AKITA 

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">LTはメインから <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011923628147871745?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">AKITAは犬が可愛い <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011923962664660993?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- [🚀 Introducing Akita: A New State Management Pattern for Angular Applications](https://netbasal.com/introducing-akita-a-new-state-management-pattern-for-angular-applications-f2f0fab5a8)
- AKITAは`Query`というクラスを持っている
- Read OnlyなStateを作れる
- ngrxはAngularでReduxしたみたいな感じ



## Reactでよく聞かれること



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ReactとかでよくききれるのはReduxでファイルいっぱい作るのつらいと聞かれる <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011924950876225536?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- 「Reduxで書くとやたらファイル数が多いのはどうすればいいですか」と聞かれる
- Reduxを使わないとか?
- Reduxを使わないときのステート管理は?



## Vue + JXA



- Vueで大規模という話を昨日見た
- vuexは導入しないと爆発するという話だった
- [Vue.js プロジェクトの爆発させかた #ichigayageek / How to explosion Vue.js project - Speaker Deck](https://speakerdeck.com/potato4d/how-to-explosion-vue-dot-js-project)
- なにかしたらのステート管理する方法は必要



`.vue`の型について



- `.vue`の型とか補完とかについて
- VScode以外だと辛くない?（プラグインがある）
- JXAは?
- JXAはReact以外との組み合わせが悪い
- PreactとかもJSXは大丈夫だけど、TSXでの型が合わなくなるとか



## 大規模Angular

スライド: [大規模Angular in 現場 / Large scale Angular in real world - Speaker Deck](https://speakerdeck.com/okunokentaro/large-scale-angular-in-real-world)



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a> 大規模Angularの話</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011926453695361025?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- 16万行のAngularコードベース
- 結論として分けたほうがいいという話
- ビルドが数分とか遅い(差分ビルドも遅い)
- Reactで同じぐらい規模では数秒が差分ビルドができるけど?
- Angularのコンパイルパイプライン?
- ビルドが92%で止まる

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a> 92%で止まる = uglify</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011927126725951489?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a> uglify92%界隈</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011927285169917952?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- devはuglifyを通さなくてもいいのでは
- テンプレートの数が多い?
- テンプレートのビルドが重たい
- Ivyで改善しそう
- 分けた方とかの話
  - Viewで分けるとか
  - あんまり細かく分けるとそれはそれで問題になる
  - monorepoにする?
  - yarn workspaceを使えばmonorepo自体は結構気軽になった
- 最初から大規模になるとわかっていたので設計はちゃんとした
- けど、大規模から分割は難しい
- なので最初から分け方もちゃんと考えないといけない



## GAE/Go/Vue SSR



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a> GAE/goでSSRする</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011928635043794944?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



[Vue.jsのサーバーサイドレンダリングをGAE/Goでやる #vuejs #golang - Qiita](https://qiita.com/koki_cheese/items/13426921f0b5861725e5)



- gojaでGAE/GoでSSRする
- [goja](https://github.com/dop251/goja)はGoでのES5.1実装
- fsとかそのへんがない
- 自分でじっそうしないとSSRできない => つらい



[Vue.js サーバサイドレンダリング on Cloud Functions for Firebase - Qiita](https://qiita.com/koki_cheese/items/64f429ac764983525dcc)

- Cloud Functionsがでた
- Cloud FunctionsでSSRする



[Compute Engine での Node.js の実行  |  Node.js  |  Google Cloud](https://cloud.google.com/nodejs/getting-started/run-on-compute-engine?hl=ja)

- GAEでNode.jsが使えるようになった
- GAEでSSRする
- Memcached Cloud が使えなくてSSRのキャッシュが持てない問題(インメモリ)



## scala.js



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「うちのscala.jsの進捗」「株主総会みたい」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011932121399607296?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- scala.jsを使ってる会社あるの?
- 3社プロダクションで使ってるのは知ってる
  - [scala-js-ts-importerハッカソン - connpass](https://scala-tokai.connpass.com/event/72650/)
- 最近scala.jsで困ったこと
  - レビュー

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a> ガチのscala勢がscala書いてきてレビューできない(scala.jsになるけど)</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011932310483058690?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- VectorとList こっちのほうがパフォーマンスがいい
- ScalaだとそうかもしれないけどScala.jsだと… Scala.jsが独自に実装頑張っていてScala.jsでもパフォーマンスが違った



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「自分がコード書かなくてよくしたい」「自分がレビューできないものがくるようになった」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011932677795004416?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>





- Scala 名古屋多いのなんで?
- 名古屋方面は昔から関数型とかの地盤がある



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">scala.jsで質問として多いのはファイルサイズとか。<br>scala自体の質問とかあんまりなかった <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011933921083191299?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- ファイルサイズの問題

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">scala.jsはDynamic Loadingできない。 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011934986247725057?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- 分割はできないの?
- sbtレベルならできる
- JavaScript的な分割は難しい

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">sbtでパッケージを分けるとかはできる。<br>webpackとかnpmのエコシステムには乗れない <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011935141600477184?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- 2層式について

- [Fluxを使ったScalaJSの二層式フロントエンド #jsオジサン](http://0-9.sakura.ne.jp/pub/lt/JSOjisan20150625/two-part-frontend-using-scalajs-and-flux.html)

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">2層式になった <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011934056450220032?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>





- Goでもwasmの対応が入った
- LLVMじゃないので、自前でwasm吐いてる
- Go言語でもscala.jsみたいなことできる?
- C#の[Blazor](https://github.com/aspnet/Blazor)に期待してる
  - フレームワーク付きで珍しい
- クライアントサイドのやつはC#/.NETで見られるものが多い



## LightHouseについて



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">Lighthouse metircsを調べた <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011935878871068672?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">FMP芸人 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011935921522933762?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- FMP、FCP、FCI、TTIなどの指標がある
- First Meaningful Paingってどういう意味?
- 調べた

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">FMPの定義を調べた。<br>意味のあるPaint = Pageのレイヤーの数、DOMの長さ、WebFontsがロードされてるか<br>とかヒューリスティックな感じで見る <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011936485505810433?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

(おすすめ: [Using WebPageTest - O'Reilly Media](http://shop.oreilly.com/product/0636920033592.do))





- TTIは?



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">TTI、5秒間待つ。<br>long task(50ms)があるかないかでTTIを切る。<br>long taskがなくなったらTTI <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011937144187654145?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- 5秒ぐらい待ってからレンダリング開始すれば最速になるのでは?
- Isucon対策だ
- パフォーマンスおじさんに怒られる



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">isucon対策講座 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011937362736103425?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



## Realms API 



[tc39/proposal-realms: ECMAScript Proposal, specs, and reference implementation for Realms](https://t.co/WfIyylwLp0)



- Stage 2になった話題のRealms API
- Sandboxとかができる

### Use cases

- security isolation (with synchronous but coarse-grained communication channel)
- plugins (e.g., spreadsheet functions)
- in-browser code editors
- server-side rendering
- testing/mocking (e.g., jsdom)
- in-browser transpilation



クライアントサイドでSSRできるのでは

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">クライアントサイドだけでSSRする謎 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011939300437516289?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- 引数をhookして変換できるparameterized evaluator

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Realms Object、Parameterzed object <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011939438966919169?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- [shim](https://github.com/tc39/proposal-realms/tree/master/shim)
- parameterized evaluatorは動かない
- Zoneに欲しいこれ
- moduleのreflectとかもあった
  - domicがだめって言って落ちた
  - そのごStage 2になった



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">最初はmoduleのrefrectの仕組みとか <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011940415526715392?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- MicroFrontend

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「Micro FrontendがきたらRealmも必要だしZoneは必要」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011940901898182657?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>





## JXA



[JXA for TypeScript/Node.js](http://azu.github.io/slide/2018/laco_sushi/jxa-for-typescript.html)というタイトルで、JXAというAppleScriptのJavaScript版についての話しをしました。

[JXA-userland/JXA: JavaScript for Automation(JXA) packages for TypeScript/Node.js.](https://github.com/JXA-userland/JXA)というリポジトリに作ったものをまとめています。





<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「AppleScriptは英語」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; Local Proxy (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/1011943026279608320?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「英語かと思ったらAppleScriptだった」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; Local Proxy (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/1011943093560434688?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「実行するまでシンタックスハイライトされない」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; Local Proxy (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/1011943347659812864?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



この辺をどうにかするために、リファレンス(`.sdef`)からTypeScriptの型定義ファイルを作るパーサとかを作りました

- [TypeScript](https://www.typescriptlang.org/index.html) definition file(`.d.ts`)を使ってWebStormやVScodeでのJXAのコード補完の実装
  - [@jxa/types](https://github.com/JXA-userland/JXA/tree/master/packages/@jxa/types) and [@jxa/global-type

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「node.jsからjxaを呼び出せる」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; Local Proxy (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/1011945001578663936?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- [Node.js](https://nodejs.org/)からJXAの実行するライブラリ
  - [@jxa/run](https://github.com/JXA-userland/JXA/tree/master/packages/@jxa/run) and [@jxa/repl](https://github.com/JXA-userland/JXA/tree/master/packages/@jxa/repl)





----



## 今日直したバグの話



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「今日直したバグの話」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011946634236739586?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ヘッダーからバルーン開く、バルーンが下に入って欲しいけど、上に入ってしまう。<br>バルーンはbody直下にある。どうやって治す? <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011946943952519168?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



回答例



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">解「バルーンをCanvasで書き直す」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011947040333389825?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



正解



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">解「バルーンをdivに囲んでz-index:0にすれば治る」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011947291274428416?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



## 脆弱性情報の社内公開について

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">扱う人が限られているとスケールしなくなる。 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011948356682174464?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- 扱う人が限られているとリソースの問題がでる
- また脆弱性についての知識が共有されない
- 重要な問題に対応できない場合がでてくる



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「常にインシデントが発生し続けてる状態にしよう」 カオスエンジニアリング <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011948565793419269?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">脆弱性の情報も社内で共有しないと理解が進まない。 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011948963371421696?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- 第三者機関とバグバウンティプログラムの併用について
- バグバウンティは表からやっていることが見える



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">第三者期間とバグバウンティを併用するべきなのでは <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011953740130091010?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



- バグバウンティのユーザー(企業側)の意見をあまり見かけない問題
- バグバウンティをもっと気軽にできる環境が必要
- [BugBounty.jp - バグバウンティ・プラットフォーム](https://bugbounty.jp/)
- バグバウンティでくる脆弱性は勉強になる
- バグバウンティ勉強会





<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「というわけバクバウンティやりたい方募集ですー」 <a href="https://twitter.com/hashtag/laco_sushi?src=hash&amp;ref_src=twsrc%5Etfw">#laco_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1011955395345068035?ref_src=twsrc%5Etfw">June 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



----



お疲れ様でした。
