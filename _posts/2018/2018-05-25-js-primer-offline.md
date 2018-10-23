---
title: "js-primer(JavaScript入門本)がオフラインで読めるようになりました"
author: azu
layout: post
date : 2018-05-25T12:35
category: 雑記
tags:
    - JavaScript
    - book

---

現在開発中の[js-primer(JavaScript入門本)](https://jsprimer.net/)がServiceWorkerを使ってオフラインでも読めるようになりました。
[Service Workers](https://caniuse.com/#feat=serviceworkers)に対応しているブラウザ(IE以外)なら一度開いた後はキャッシュを使ってオフラインでも読めるようになっています。

また、ただのウェブページでもあるので書籍の内容が更新されれば最新の内容に更新されます。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">js-primer workboxを使ってオフライン表示に対応しました。<br>モバイルでもオフラインで読めるようになってます。<br><br>“JavaScriptの入門書 <a href="https://twitter.com/hashtag/jsprimer?src=hash&amp;ref_src=twsrc%5Etfw">#jsprimer</a>” <a href="https://t.co/gyX5MqW4r8">https://t.co/gyX5MqW4r8</a> <a href="https://t.co/CVSAV325sV">pic.twitter.com/CVSAV325sV</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/997735416903057408?ref_src=twsrc%5Etfw">May 19, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

iPhoneやAndroidなどホームにアプリとして追加もできます。

- サイト: [ \[WIP\] JavaScriptの入門書 – ECMAScript 2017時代のJavaScript入門書](https://jsprimer.net/)
	- そろそろES2018がでるのでサブタイトルは出たら更新します
- リポジトリ: [asciidwango/js-primer: JavaScriptの入門書](https://github.com/asciidwango/js-primer)

このオフライン対応の実装は[@nd-02110114](https://github.com/nd-02110114)さんが大部分を実装してくれました。次のIssueでどのように実装したかがまとまっています。

- [PWA化について · Issue #431 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/431)

実装的には[Workbox](https://developers.google.com/web/tools/workbox/)を使ってGitBookが生成するHTMLなどのファイル(`_book/`以下)をキャッシュするService Workerの設定を作りました。

また、ホームに追加できるようにするために[manifest.json](https://developer.mozilla.org/ja/Add-ons/WebExtensions/manifest.json)を作り、適当なアイコンを作りました。

- [Manifest.jsonの作成 by nd-02110114 · Pull Request #460 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/460)
- [feat(website): add icon and favicon by azu · Pull Request #464 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/464)

これでLighthouse 3.0(beta)のPWAスコアも100になりました。

![PWA スコア](https://efcl.info/wp-content/uploads/2018/05/25-1527220707.png)

Thanks to [@nd-02110114](https://github.com/nd-02110114)!

書籍は<https://jsprimer.net/>から読めます。
(8割ぐらいは書き終わっていますが、まだ少し追加とリファクタリングが残っています)

### Todo

[Workbox](https://developers.google.com/web/tools/workbox/)を使って[Cache First (Cache Falling Back to Network)](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network)で表示しているので、更新があった時の初回アクセスが古いバージョンになっている。
自動的に新しいものを優先して表示するようにしたい。

- [Website: SWキャッシュが更新されているならリロードボタンを表示する · Issue #466 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/466)

## js-primerについて

[js-primer](https://github.com/asciidwango/js-primer "js-primer")はプログラミング初心者ではなくJavaScript初心者向けに書かれている入門書です。

必要なものを必要なだけ学びJavaScriptを読み書きできるようになることが目的です。
JavaScriptは今日[開催されているTC39のミーティング](https://github.com/tc39/agendas/blob/master/2018/05.md)で議論しているように変化を取り入れている言語であるため、JavaScriptの変化に対して対応できる基礎をつけていくのが主な目的です。

そのため、DOM APIの使い方やライブラリの使い方を学ぶ、何かを作る事といったことはこの書籍のスコープではありません。何かJavaScriptで問題があったときに、その解決方法を自分で調べることができるようにすること、その助けになることが目的の書籍です。
