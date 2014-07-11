---
title: WebStorm+Chromeでウェブサイトコードリーディング
author: azu
layout: post
permalink: /2014/0214/res3668/
dsq_thread_id:
  - 2266020757
categories:
  - javascript
  - software
tags:
  - chrome
  - CodeReading
  - WebStorm
---
[IntelliJさんのChromeプラグインが進化してた &#8211; しおしおの雑記帳][1] を見て気づいた事。

今までは WebStorm -> JavaScriptデバッグ実行 -> Chrome起動 という方向でしか、WebStorm内のデバッガーは使うことが出来なかったのですが、

[WebStorm 8 EAP][2]からは、Chrome -> Inspect in WebStorm -> WebStorm という双方向でデバッガーを使えるようになったみたいです。

これを利用して、簡単にWebStormを使ってウェブサイトのコードを読むことができるのでその手順の説明です。

## サイトコードリーディング

手順は単純で

1.  WebStormで適当なプロジェクトを開く(プロジェクトを開いてないと&#8221;Inspect in WebStorm&#8221;ができない)
2.  Chromeで読みたいサイトを開く
3.  Chromeのコンテキストメニューから&#8221;Inspect in WebStorm&#8221;を選ぶ

実際にやってみると以下のような感じになります。





1と2のWebStormとChromeの起動は以下のようなスクリプトをAlfredから実行しているだけです。



<img src="http://efcl.info/wp-content/uploads/2014/02/2014-02-14-at-23.21.png" alt="2014 02 14 at 23 21" title="2014-02-14 at 23.21.png" border="0" width="600" height="508" />

`webstorm` コマンドは&#8221;Create Command-line Launcher..&#8221; からインストールしたコマンドで、`code-reading`という空ディレクトリを開いています。

まだElementsタブが出なかったり動作が不安定な気もしますが、  
動画のようにWebStorm上からブレークポイントを貼ったり、なによりWebStormで直接サイトのコードを読めるのは結構便利だと思います。

 [1]: http://siosio.hatenablog.com/entry/2014/02/14/132138 "IntelliJさんのChromeプラグインが進化してた - しおしおの雑記帳"
 [2]: http://blog.jetbrains.com/webstorm/2014/01/webstorm-8-eap/ "WebStorm 8 EAP"