---
title: "#reject_sushi でReactとチーム開発について話してきた"
author: azu
layout: post
date : 2016-02-23T23:05
category: イベント
tags:
    - JavaScript
    - react
    - イベント

---


[React.js meetup #3](http://reactjs-meetup.connpass.com/event/26229/ "React.js meetup #3")に参加できなかったので[#reject_sushi](https://twitter.com/search?f=tweets&vertical=default&q=reject_sushi&src=typd "reject_sushi")に参加してきました。

- [#reject_sushi - Togetterまとめ](http://togetter.com/li/942101 "#reject_sushi - Togetterまとめ")

----

- [Draft.js | Rich Text Editor Framework for React](https://facebook.github.io/draft-js/ "Draft.js | Rich Text Editor Framework for React")
	- ©年号を見る感じ結構前から実装してそう

	
## [How to work as a Team](http://azu.github.io/slide/2016/reject-sushi/how-to-work-team.html "How to work as a Team") @ azu

自分はチーム開発でReact + 何かを採用するときにどういうフローで話を進めていってるかについてを話しました。
まだ結論はないですが、Flux的な何かを採用したからといって設計がすごく簡単になるという話ではないです。

またStoreはただの入れ物的な使い方をした場合に、ドメイン層はActionCreator的な部分が持つのか、それはどうやって扱うのかという部分がふわふわしているという話になりました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">StoreはただのViewのためのStateという感じ。<br>その場合にドメイン層をどこに書くかが皆迷うところ。 <a href="https://twitter.com/hashtag/reject_sushi?src=hash">#reject_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/702105875771555840">February 23, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

なんとなくのレイヤー分けは見えてきていますが、それを説明するのにはまだ何か(サンプル?実例?体系化?)が足りてないのかなーという印象です。

以下のスライドも見てみると面白いかもしれません。

- [My thought about beyond flux](http://www.slideshare.net/saneyuki/my-thoughy-about-beyond-flux "My thought about beyond flux")

また最近[今日からはじめる情報設計](http://www.amazon.co.jp/dp/4802510012/ "今日からはじめる情報設計")や[エンジニアのための図解思考](http://www.amazon.co.jp/dp/B00EESW7OG/ "エンジニアのための図解思考")的な本を読んでいたので、そういった情報の扱い方や表現という話も兼ねています。

## Rails と Node.js @ mizchi

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">browserify-railsとtsify問題 <a href="https://twitter.com/hashtag/reject_sushi?src=hash">#reject_sushi</a></p>&mdash; サスケ (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/702089989887172609">February 23, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- Node.jsのエコシステムにビルドを寄せる話
- browserify-railsに寄せると楽
- だけどtsifyが標準出力ではStreamを使うため browserify-railsと相性が悪い。
- browserify-railsを使いたい理由は、Nodeを普段使わない人が多い環境でNodeの流儀をやってもらうとよくわからないことが多くてコストがある

## HTTP2 を前提とした HTML+CSS コンポーネントのレンダリングパス最適化 @ jxck

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/reject_sushi?src=hash">#reject_sushi</a>   &quot;HTTP2 を前提とした HTML+CSS コンポーネントのレンダリングパス最適化について | <a href="https://t.co/Bb4j0utYux">https://t.co/Bb4j0utYux</a>&quot;  <a href="https://t.co/wQlZpQZBMj">https://t.co/wQlZpQZBMj</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/702092500157145089">February 23, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [HTTP2 を前提とした HTML+CSS コンポーネントのレンダリングパス最適化について | blog.jxck.io](https://blog.jxck.io/entries/2016-02-15/loading-css-over-http2.html "HTTP2 を前提とした HTML+CSS コンポーネントのレンダリングパス最適化について | blog.jxck.io")
- コンポーネント+CSSで送れると、サーバ側が全部のリソースが揃う前にレスポンスを返すことが出来る様になる
- lengthは決まってないと行けないけど、例外としてTransfer-Encoding: chunkedを使う
- = プログレッシブレスポンス?


<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">プログレッシブレスポンスができるようになるそれようの仕組みがサーバで流行るのでは。<br>それってJSPで見た話だ！！！ <a href="https://twitter.com/hashtag/reject_sushi?src=hash">#reject_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/702093276040433664">February 23, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

この時の問題点

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">HTTPはステータスコードを最初に返す必要があり、それを途中で変更できない。<br>ステータスコードは1行目問題はPushでも起きる<br>なのでプログレッシブレスポンスの場合は、CSSはpushしておいてchunkedで送ると <a href="https://twitter.com/hashtag/reject_sushi?src=hash">#reject_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/702094414600994816">February 23, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- ステータスコードコードが最初に決まってないと行けない
- プログレッシブレスポンスだとこれがやっかいなりそう
- 動画を全部読まないとシークできなかった話と似ている
- このステータスコードの位置/変更/指定の問題は今後の課題になりそう(プログレッシブレスポンスするなら)

## TypeScript 1.8のJavaScriptをbundleしてくれる機能 - kyo_ago

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">kyo_ago 「TypeScript 1.8のJavaScriptをbundleしてくれる機能」 <a href="https://twitter.com/hashtag/reject_sushi?src=hash">#reject_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/702099720164872192">February 23, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- [Concatenate AMD and System modules with --outFile](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#concatenate-amd-and-system-modules-with---outfile "Concatenate AMD and System modules with --outFile")
- [Announcing TypeScript 1.8 | TypeScript](https://blogs.msdn.microsoft.com/typescript/2016/02/22/announcing-typescript-1-8-2/ "Announcing TypeScript 1.8 | TypeScript")
- 循環参照を避けるためbundleするのはimport/exportのみ?
- `require`は動的ロードとして扱われてる
- ちょこっとsystemjs用のものを加えると動かせる


## JavaScriptの非同期処理/例外処理

- async/await
	- try/catchでハンドリングしないと行けないのは複雑になる可能性
	- GoLangのように多値を返すアプローチで解決できなかったのか
	- [Option/Maybeとかで解決していることを、さながらgolangのようにES6のdestructuring assignmentで解決する - snyk_s log](http://saneyukis.hatenablog.com/entry/2015/03/22/184823 "Option/Maybeとかで解決していることを、さながらgolangのようにES6のdestructuring assignmentで解決する - snyk_s log")
- WebComponents
	- 名前がでかすぎて何から手を出せばいいのかよくわからなくなる問題
	- Polymerは何か別のものになってしまった
	- 明らかに大事だけど流行るには何かが足りない
	- コンポーネント間の関係をどう管理するのか問題

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「Web Componentをどこから始めればいいのか分からない」<br>「Web Componentという名前が良くなかった。それぞれの仕様にフォーカスするべきだったのでは」 <a href="https://twitter.com/hashtag/reject_sushi?src=hash">#reject_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/702118804793356288">February 23, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>	

- ECMAScriptにEventEmitter的なのが欲しい
	- DOM Eventを通るのはなんか

## その他

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/reject_sushi?src=hash">#reject_sushi</a> で発表しなかった「3分でわかるtextlint」のスライドです。自然言語Lintツールの現状  &quot;3分でわかるtextlint&quot;  <a href="https://t.co/wtHBxxIOok">https://t.co/wtHBxxIOok</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/702133285934145536">February 23, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

発表しなかった[3分でわかるtextlint](http://azu.github.io/slide/2016/reject-sushi/textlint.html "3分でわかるtextlint")のスライド。

[textlint - pluggable linting tool for text and markdown](http://textlint.github.io/ "textlint - pluggable linting tool for text and markdown")のサイトがDeku v2 + Reduxで動いていて、Reduxを最初に試す場合はDekuと組み合わせたほうがわかりやすよという話をした。
