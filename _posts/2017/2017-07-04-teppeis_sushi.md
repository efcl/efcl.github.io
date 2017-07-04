---
title: "#teppeis_sushi でクライアントサイドDDDについて発表した"
author: azu
layout: post
date : 2017-07-04T23:26
category: イベント
tags:
    - JavaScript
    - TypeScript
    - DDD

---

[#teppeis_sushi](https://twitter.com/search?f=realtime&q=%20%23teppeis_sushi "#teppeis_sushi")というイベントで、[Faao - ドメイン駆動設計で作るGitHub Issue Client -](http://azu.github.io/slide/2017/teppeis-sushi/client-side-ddd-on-github.html "Faao - ドメイン駆動設計で作るGitHub Issue Client -")という話をしました。

Electronやブラウザなどで動く[faao](https://github.com/azu/faao "faao")というGitHubクライアントを書いていてそれの技術的な話です。
クライアントサイドでDDDを取り入れた設計になっていて、その設計や規約の作り方やそれを守る方法についての話をしました。

- [azu/faao: Faao is a GitHub issue/pull-request client on Electron.](https://github.com/azu/faao "azu/faao: Faao is a GitHub issue/pull-request client on Electron.")

[Living Documentation by design, with Domain-Driven Design by Cyrille Martraire [PDF/iPad/Kindle]](https://leanpub.com/livingdocumentation "Living Documentation by… by Cyrille Martraire [PDF/iPad/Kindle]")という無料から買える書籍では、ドキュメントとコードを同じ速度で成長させていくためにはドキュメントに対しても自動化が必要であるなど(コミュニケーションの話なども)が書かれています。

それらを参考にして、レイヤーの違反を自動的に見つけたり、[Faao - UseCase architecture](https://azu.github.io/faao/meta/use-case.html "Faao - UseCase architecture")のようにコードからユースケースの図を自動生成したりなど、モデリングへのフィードバックループができるようにしているという話です。


----

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> 前回も台風でしたね</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882191585122820096">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [#teppeis_sushi に参加した | Web Scratch](http://efcl.info/2016/07/14/teppeis_sushi/ "#teppeis_sushi に参加した | Web Scratch")

----

## Vue.jsでSSR

<blockquote class="twitter-tweet" data-lang="en"><p lang="cs" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> vue.jsでSSR - k2wanko</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882192039919599616">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [Firebase](https://firebase.google.com/?hl=ja "Firebase")
- lambdaのようなものが増えた
- Node.jsが動くのでVue.jsのサーバサイドレンダリングができる
- [Server-Side Rendering — Vue.js](https://vuejs.org/v2/guide/ssr.html "Server-Side Rendering — Vue.js")
- [Firebase Realtime Database  |  Firebase](https://firebase.google.com/docs/database/?hl=ja "Firebase Realtime Database  |  Firebase")

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> Firebase裏がわにfastlyがいる</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882194840183689216">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

-----

##  最近Electronでローカルプロキシを作っていてこまったこと - kyo_ago

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> Reduxを使ってStateとドメインと二重管理してる感じ。DDDの恩恵をあんまり受けてない感じする</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882195657447972864">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- クライアントとサーバで両方データがある感じ
- クライアントのデータはサーバのキャッシュにすぎないので嘘のデータに見える
- サーバへ送信するまでの一時的なデータであるならばそれは無理してモデル化するべきなのか

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> クライアント側のデータだけで動くものなら意味があるのかもしれない。<br>クライアントサイドに嘘のデータを持っている感じる。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882195906057183232">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- クライアントのデータはキャッシュでしかないならば、サーバに比べてDDDの魅力がオチている

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> ちょうどいいところ落とし所を見つけるの重要なのでは by TDDのDDD談</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882196495218352128">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- ドメインの共有はIsomorphicで辞めたほうがいいかも
- ドメインはクライアントとサーバで異なる
- サーバから見たドメインは所有という概念がなかったりする
- クライアントとサーバのドメインはアクターが異なるのでドメインモデルも異なる。 なので、クライアントとサーバで同じドメインモデルを共有することはできないのでは
- サーバは「自分が持っている」という概念はないので

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> クラサバ時代のおじさんたち「ようやくその境地にやってきたな」</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882196920440987648">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> ユビキタス言語は共有していいけど、それ以外の共有は難しいのでは</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882197484763619329">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

## 大規模フロントエンドのDDD - 83

- 8人でやってるフロントエンドのチーム
- スキルレベルがバラバラ感
- Angular1だったものを2にする設計を始めた

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">「Just Angular！」 <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a></p>&mdash; Local Proxy (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/882198460228706304">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- 設計を担当して質問を受け付けるようになった
- 些細な質問なども殺到して個人が開発する時間がなくなった

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> レビューが一人に集中。<br>@ 83</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882198608082108416">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- 質問ルームをslackチャットに作ってそこでやってもらったら質問が分散した
- サーバのAPIを作ってる人とクライアントサイドを作って流人は別。
- コンテキストがそもそも違う。 そこで腐敗防止層としてのDDDを取り入れる
- サーバから渡ってきたものをリマップしてクライアント側に主導権を持てるように
- AngularはViewは決まってるけど、設計は別に決まってない。
- 無理難題が振ってくることがあるので、ngrxじゃなくて普通にrxをベースにして開発した
- モデリングをちゃんとやることでコピペコードは減る

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> 「DDDとCQRSやってるよーいうと引かれる」</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882200748087427072">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- 1画面を作るのに7 APIを叩く

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> 「BFFを作ればいいのでは」</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882201176560721921">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

## [Faao - ドメイン駆動設計で作るGitHub Issue Client -](http://azu.github.io/slide/2017/teppeis-sushi/client-side-ddd-on-github.html "Faao - ドメイン駆動設計で作るGitHub Issue Client -") - azu


- クライアントサイドでTypeScript + [Almin](https://github.com/almin/almin "Almin") + DDDでの開発
- Living Documentationについて

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">いいドキュメントは自動化されてなければならない <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a></p>&mdash; OKUNOKENTARO (@armorik83) <a href="https://twitter.com/armorik83/status/882205550963851270">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">最も良いドキュメントは必要になるまで読まなくて良いドキュメント <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/882206099222482944">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ESLintは良いドキュメント、エラーになるまで読まなくて良い <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/882206293204664320">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

## 本の読み方 - t_wada

- 本は未来方向には書けなくて、過去方向にしか書けない
- 技術書を読むときは発刊された年数をちゃんと見る
- 特に翻訳本はやたらと古い場合がある
- DDD本はRailsが出る前に書かれたけど、翻訳はRailsのずっと後
- 絶版ショック

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">(トッパン|ピアソン)ショック、単に絶版、様々な要因でOOA/OODの書籍がほぼ死滅し、訳書が出るタイミングが遅かったDDD本だけがオーパーツのような存在になった結果、日本ではDDD ≒ OOA/OODになってしまったという奇妙な状況の背景の話をした <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a></p>&mdash; Takuto Wada (@t_wada) <a href="https://twitter.com/t_wada/status/882241157639487488">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


-----

## Rx6の話 - laco

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> RxJS 6で何が変わるのかの話 <a href="https://t.co/XtDXct5F0m">https://t.co/XtDXct5F0m</a></p>&mdash; Laco (@laco0416) <a href="https://twitter.com/laco0416/status/882213465598771200">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> bufferの挙動がfindのバグ経由でBreaking Change  &quot;rxjs/CHANGELOG.md at 6.0.0-alpha.0 · ReactiveX/rxjs&quot;  <a href="https://t.co/BXIRrMQmE0">https://t.co/BXIRrMQmE0</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882212815339012096">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- バグ修正によるBreaking Change
- Rxを拡張してるユーザーには影響がある

## api.aiの話 - vvkame

聞けてなかった


----

## 2017年のフォームの話 - 会長

> 要スライド

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> 2017年のフォームの話 - 会長</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882214321186521088">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- Reactでのformの値の管理 unctrolledとcontrolled
- FBとしてはcontrolledで管理して
- ちょっと複雑なフォームをやるとバリデーションが複雑化する => controlled推奨


<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> jQueryなどの昔ながらのバリデーションライブラリはunctrolledで作られてる。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882214853485617152">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> ちょっとまって!<br>2017年 いろんな所にstateがある。<br>どこにstateを保存するのが正しいの?</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882215092464398336">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- React/Redux/永続化されたState
- どこで何を管理する?
- Twitterはハイブリット的な構造
	- 入力中はコンポーネント、適宜Reduxへ
- ユーザー入力中に外からpropsで値がすり替わるとIMEなどで問題が起きるため
- 処理速度的にコンポーネントに閉じたほうが良いこともある

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> 再生時間みたいなMediaを考えると処理速度的にはコンポーネントで描画は行って、ドメインに定期的に状態を反映する形</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882216123596390400">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

## ES class fieldの話 - teppeis

> スライド: [ES Class Fieldsのプライベートフィールドがハッシュな変態記法なのは何でなんだぜ？](https://gist.github.com/teppeis/06c2b7e97c7d67684c3d3c94159893f3 "ES Class Fieldsのプライベートフィールドがハッシュな変態記法なのは何でなんだぜ？")


- [tc39/proposal-private-fields: A Private Fields Proposal for ECMAScript](https://github.com/tc39/proposal-private-fields "tc39/proposal-private-fields: A Private Fields Proposal for ECMAScript")


<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> Symbolでやれることをsyntaxでやる意味がない。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882217632459444228">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- hard protectionは言語としてできることを目指すべき
- Reflectとかで闇雲見られるようにはしない

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> 見えちゃうとお前ら使うだろ。使えないようにするのが正義</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882219462954336257">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

-----


# flutterの話

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「Flutterを知らないおじさん達へ」 <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a></p>&mdash; Local Proxy (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/882221826402734082">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">いつのまにかDartの話にすり替えるあくろすあざとい。 <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a></p>&mdash; OKUNOKENTARO (@armorik83) <a href="https://twitter.com/armorik83/status/882221967205519361">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [HTML/CSS Analogs in Flutter - Flutter](https://flutter.io/web-analogs/ "HTML/CSS Analogs in Flutter - Flutter")

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">OS再実装したりブラウザ再実装したり…。 <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a></p>&mdash; OKUNOKENTARO (@armorik83) <a href="https://twitter.com/armorik83/status/882222891726544896">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

----

## Web Packaging - jxck


- ネットワークが遅いところで物理的p2pでサイトを見てるケース
- mhtmlみたいな
- データ・フォーマットなのでIETFへ
- ギリギリにGoogleから投げつけられてきた(いつもの)

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> ネットワークが悪い国ではmhtmlをsdカードでやり取りしてる。<br>もっとカジュアルに共有できるようにしたい</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882225567365386241">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- dispatchというWGで議論されて、どこで議論するべきなのかを決める
- WGができたら結構すごいことになるかも
- Service Workerの横つながりみたいな話がでてきるかも
- 次回のプラハ会議に注目


----

## その他

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> 未だに2年前と同じ話をしてる es module</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/882228287862210560">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- Nodeの進捗がよくわからない
- CSPとバグとお金


----

## おわり


<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Big boss is watching you <a href="https://twitter.com/hashtag/teppeis_sushi?src=hash">#teppeis_sushi</a> <a href="https://t.co/Yxz03NerJq">pic.twitter.com/Yxz03NerJq</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/882229938232754177">July 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

おめでとうございます