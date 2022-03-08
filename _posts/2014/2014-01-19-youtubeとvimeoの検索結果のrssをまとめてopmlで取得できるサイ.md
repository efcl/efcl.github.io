---
title: YoutubeとVimeoの検索結果のRSSをまとめてOPMLで取得できるサイトを作った
author: azu
layout: post
permalink: /2014/0119/res3594/
dsq_thread_id:
  - 2142146824
categories:
  - javascript
  - webサービス
tags:
  - javascript
  - rss
  - Video
  - 検索
---
YoutubeやVimeoは(タグ)検索結果をRSSで取得出来るようになっていますが、  
興味があるワードごとにいちいちRSSリーダに登録するのは面倒だったので、  
[Tech Video RSS Searcher][1] というサイトを作りました。

[<img src="https://efcl.info/wp-content/uploads/2014/01/Tech-Video-RSS-Searcher-2014-01-19-11-49-06.jpg" alt="Tech Video RSS Searcher 2014 01 19 11 49 06" title="Tech Video RSS Searcher 2014-01-19 11-49-06.jpg" border="0" width="600" height="220" />][2]<span style='text-decoration:underline;'></span>

## 使い方

何ができるかというと、単なる[静的なサイト][3]なので大した事はできなくて、

1.  キーワードを入力
2.  サイトの検索結果を見て購読したい感じだったら、&#8221;Add to list&#8221;する
3.  1,2を繰り返す
4.  最後に &#8220;Download opml&#8221; からキーワードの検索結果のRSSをまとめたopmlファイルをダウンロードする
5.  LDRとかFeedlyにopmlファイルを読み込ませて購読する

という感じで使います。

<img src="https://efcl.info/wp-content/uploads/2014/01/Tech-Video-RSS-Searcher-2014-01-19-11-48-46.jpg" alt="Tech Video RSS Searcher 2014 01 19 11 48 46" title="Tech Video RSS Searcher 2014-01-19 11-48-46.jpg" border="0" width="600" height="299" />

### ブラウザ

DataURI(Blob使ったほうがよいのかな?)と[download属性][4]使ってるので、FirefoxとChromeあたりでしか動かない気がします。

## 仕組み

ソースコードは [azu/tech-video-rss-searcher][5] に公開してあります。

今回は、[browserify][6] + [debowerify][7] + [Bower][8] + ([beefy][9] or [gulp][10])  
を使った仕組みを回して作りました。

使ったJavaScriptライブラリとしては[Ractive.js][11]がメインですが、  
それらnpmで提供されてないもの と npmでしか提供されてないもの 両方をどう扱うかがテーマでした。

そこで、[browserify][6]を使って両方共nodeのモジュールの仕組み(CommonJS)で回せるようにすれば、  
モジュールの問題がCommonJSに集約できて中々面白い感じにできたので、それは別の記事で書きます。

## 作るに至った道のり

JavaScript情報の探し方とか 何か面白い方法思いついたりしたら以下に書き込んでいるのですが、

[最近のJavaScript情報の探し方 · Issue #2 · azu/jser.info][12]

YoutubeやVimeoやUstに大体のイベントの動画があがる傾向があるので、その辺から見れば以下で書いていたJavaScriptイベントを探すにつながるかなと思ったのが始まり。

*   [JavaScriptのイベント/カンファレンスを見ていくにはどうすればいいか | Web scratch][13]

RSSを購読しようとしたのですが、キーワードごとにやるのが面倒だったのと[browserify][6]を使ってみたかったのでサイトを作ってみました。

想像以上に[browserify][6]で回せる事がわかったのが良かったです。

追記: browserifyでの開発についての詳細を書きました

=> [npmとbrowserifyを使ったクライアントサイドのウェブアプリ開発 | Web scratch][14]

 [1]: https://azu.github.io//tech-video-rss-searcher/ "Tech Video RSS Searcher"
 [2]: https://azu.github.io//tech-video-rss-searcher/
 [3]: https://github.com/azu/tech-video-rss-searcher/
 [4]: http://caniuse.com/#feat=download
 [5]: https://github.com/azu/tech-video-rss-searcher/tree/gh-pages "azu/tech-video-rss-searcher"
 [6]: http://browserify.org/ "browserify"
 [7]: https://github.com/eugeneware/debowerify "debowerify"
 [8]: http://bower.io/ "Bower"
 [9]: https://github.com/chrisdickinson/beefy "beefy"
 [10]: https://github.com/gulpjs/gulp "gulp"
 [11]: http://www.ractivejs.org/ "Ractive.js"
 [12]: https://github.com/azu/jser.info/issues/2 "最近のJavaScript情報の探し方 · Issue #2 · azu/jser.info"
 [13]: https://efcl.info/2013/1008/res3450/ "JavaScriptのイベント/カンファレンスを見ていくにはどうすればいいか | Web scratch"
 [14]: https://efcl.info/2014/0120/res3605/ "npmとbrowserifyを使ったクライアントサイドのウェブアプリ開発 | Web scratch"
