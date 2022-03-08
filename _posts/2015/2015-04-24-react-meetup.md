---
title: "React.js meetupにて10分で実装するFluxについて発表してきた"
author: azu
layout: post
date : 2015-04-24T22:11
category: JavaScript
tags:
    - イベント
    - React
    - Flux

---

[React.js meetup #1 - connpass](http://reactjs-meetup.connpass.com/event/11232/ "React.js meetup #1 - connpass")に参加して、[Flux](http://facebook.github.io/flux/ "Flux")アーキテクチャについて話してきました。


# [10分で実装するFlux](https://azu.github.io//slide/react-meetup/flux.html "10分で実装するFlux") - @azu

[10分で実装するFlux](https://azu.github.io//slide/react-meetup/flux.html "10分で実装するFlux") というタイトルで発表してきました。

以前実装した[material-flux](https://github.com/voronianski/flux-comparison/tree/master/material-flux "material-flux")をより小さくただのEventEmitterだけで実装したような内容になっています。

Fluxは図が複雑だったり、複雑そうな文章が出てきたりしますが、ミニマムな実装をするとやってることはよく見るようなものをある程度形式化しただけのように見えてきます。(Dispatcherが色々複雑な制御していますが)

そういうのを理解するために実際に作って見るとわかりやすいかもなーと思って[10分で実装するFlux](https://azu.github.io//slide/react-meetup/flux.html "10分で実装するFlux")というスライドを書きました。

発表では触れなかったおまけでFluxライブラリの比較やよくある疑問とかもちょっと書いてました。

- [material-fluxというFluxライブラリをREADME駆動で開発した | Web Scratch](https://efcl.info/2015/03/17/material-flux/ "material-fluxというFluxライブラリをREADME駆動で開発した | Web Scratch") 以前実装したもの
- [azu/mini-flux](https://github.com/azu/mini-flux "azu/mini-flux") 発表で紹介してた実装

Fluxのメンテナである[Bill Fisher](https://github.com/fisherwebdev "Bill Fisher")の[react-flux-fluent-2015 // Speaker Deck](https://speakerdeck.com/fisherwebdev/react-flux-fluent-2015 "react-flux-fluent-2015 // Speaker Deck")という発表が最近あったのでこちらも見てみるいいかもしれません。

# mercury/mithril.js - @yosuke_furukawa

- Mithrilのアプローチ
- ローレベルのハックを持ってる
	- startComputation
	- // 複数の描画
	- endComputation
	- というような囲いを持ってるので、一回の描画で良くなる
- `vdom-thunk`のアプローチ
	- VDOMのtreeの探索範囲を限定することができる
	- 探索範囲を限定することで更新コストを減らせる
- まとめ
	- Reactがやってることは設計と性能の共存
	- さらに性能を上げることができる


-----

# React/SPAの設計と運用 - mizchi

- kobitoの作った
- テキストエディタ、プレビュー、記事一覧
- 問題
- Fluxで画面遷移を表現できない
	- Ardaを作った
	- Contextって単位を作って、画面遷移をpush/popする
- dangerouslySetInnerHtml
	- 重たい
	- iframeに突っ込む?
	- 結局: Markdown -> React Elementに変換するコンパイラを書いた
	- [mizchi/md2react](https://github.com/mizchi/md2react "mizchi/md2react")
	- [wooorm/mdast](https://github.com/wooorm/mdast "wooorm/mdast")を使ってる
- リストで移動中にプレビューを遅らせた
	- 16ms以上毎回プレビューにかかると死ぬ
- JSXの問題
	- リストを書くのに`.map`するのは難しい
	- ReactElementを吐く関数をテンプレート(AltJSっぽい)
	- インラインCSSが書きやすいようにした
- React周辺のエコシステムの問題
	- ポテンシャルがあるけどエコシステム的にまだ足りない
	- なので色々作る必要があった

---

# React.jsと、Railsとかアイドルとか -	@sugyan


- アイドルの現場の情報を追いかけるサイト
- Google Calendar API
- Railsでサーバサイドレンダリング
- React-RouterでSPA
- RailsのTurbo linksとReact-Routerが相性が悪い

----

# LT - Java+React.jsでSever Side Rendering - @making

- SPA+Ajaxでブログを作った
- ググれない+タイトルがloadingになる
- Javaでサーバサイドレンダリング
- Java SEにはJavaScriptエンジンが入ってる
	- Rhino
	- Nashorn
- サーバサイドのJavaからJavaScriptをevalして、Reactのサーバサイドレンダリングをする
- コメント部分にサーバサイド固有の情報を入れる
	- render(`/* {initial data} */)
	- クライアント側でコメントとして無視される
	- サーバサイドレンダリング時はデータが入る

---

# LT - React.js(React Native) + UI Design Prototyping 	@tsuyoshi higuchi


- React-wayに乗るのが重要なのでは
	- 既存のDOMを扱うライブラリ扱いにくい
- 既存のツールは画像ベースが多くて扱いにくい
	- Design in Browser
	- ブラウザでデザインしちゃう人もいる
	- => 最初からReact wayでComponentとして作ると良いのでは
- コンポーネント志向 = UIデザインドリブン
	- デザインを作るときにコンポーネントを考える
- プロトタイピングツールの問題
	- 実際の表示とは異なる…
- PhotoshopのレイヤーをComponentへ
	- Reactコンポーネント = レイヤー
	- PhotoshopのレイヤーからReact Componentに吐き出すツールを書いた
- まとめ
	- サービスデザインは小さいところへのフォーカスがより重要になる
	- Reactを使って小さいところ(Component)から作っていこう

----
