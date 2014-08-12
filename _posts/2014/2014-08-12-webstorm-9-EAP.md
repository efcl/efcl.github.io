---
title: "WebStorm 9 EAPがリリースされています"
author: azu
layout: post
categories:
    - software
tags:
    - WebStorm
    - IDE
    - JavaScript
    - Node.js

---

## WebStorm 9 EAP

WebStorm 9のβ版とも言える[WebStorm 9 EAP](http://confluence.jetbrains.com/display/WI/WebStorm+9+EAP "WebStorm 9 EAP - WebStorm - Confluence")がリリースされています。

- [WebStorm 9 EAP - WebStorm - Confluence](http://confluence.jetbrains.com/display/WI/WebStorm+9+EAP "WebStorm 9 EAP - WebStorm - Confluence") ここからダウンロード
- [WebStorm 9 EAP is Open! | JetBrains WebStorm Blog](http://blog.jetbrains.com/webstorm/2014/08/webstorm-9-eap/ "WebStorm 9 EAP is Open! | JetBrains WebStorm Blog")

## 変更/改善点

[WebStorm 9 EAP is Open! | JetBrains WebStorm Blog](http://blog.jetbrains.com/webstorm/2014/08/webstorm-9-eap/ "WebStorm 9 EAP is Open! | JetBrains WebStorm Blog") に変更点などが書かれていますが、
Node.js向けの改善が結構あります。

### Live EditのNode.jsアプリ対応

以下で詳細が書かれていますが、Node.jsのアプリについてもファイルの変更も検知して、
Nodeアプリの再起動的な事をやってくれるみたいです。

[Live Edit Updates in WebStorm 9 — What’s New? \| JetBrains WebStorm Blog](http://blog.jetbrains.com/webstorm/2014/08/live-edit-updates-in-webstorm-9/ "Live Edit Updates in WebStorm 9 — What’s New? | JetBrains WebStorm Blog")

### spy-js for Node.js

個人的にはこれがかなり面白い感じで、ブラウザ向けのJavaScriptではすでにあった[spy-js](http://spy-js.com/ "spy-js: tracing, profiling, debugging javascript")ですが、今回Node.jsにも対応しました。(内部的にspy-js2.0になってました)

- [Spy-js: WebStorm secret service | JetBrains WebStorm Blog](http://blog.jetbrains.com/webstorm/2014/04/spy-js-webstorm-secret-service/ "Spy-js: WebStorm secret service | JetBrains WebStorm Blog")

そもそもspy-jsとは何かというと、実行したJavaScriptをトレースして、実行時の関数の引数の中身やその処理にかかった時間の計測などしてくれます。ブレークポイントで見るのと違って、実行し終わった部分に対して後から見ていくことが出来る機能です。

![img](http://efcl.info/wp-content/uploads/2014/08/12-1407819730.png)

見た目的にはAdobe Bracketsのtheseus等が似ています。

- [adobe-research/theseus](https://github.com/adobe-research/theseus "adobe-research/theseus")

イメージ的には[Chronon Time Travelling Debugger](http://chrononsystems.com/products/chronon-time-travelling-debugger "Chronon Time Travelling Debugger")とかに向かっている気がします。(まだトレースだけなので、戻るとかはないですが)

- [IntelliJ IDEA 13.1 EAPのChronon Debuggerをお試しください！ | JetBrains ブログ](http://blog.jetbrains.com/jp/2014/03/06/420 "IntelliJ IDEA 13.1 EAPのChronon Debuggerをお試しください！ | JetBrains ブログ")

今回このspy-jsがNode.jsのコードにも対応したので、Nodeで書いたコードのパフォーマンスみたり、デバッグ等にも役立てる事ができます。

実行がかなり手軽で、Run Configurationで実行したいNode.jsファイルを選ぶだけです。(ブラウザの時と違ってproxyを刺す必要もないです)

![configuration](http://efcl.info/wp-content/uploads/2014/08/12-1407819988.png)

Nodeで実行されるものなら何でもいいので、mochaで実行するテストに対しても同じようにspy-jsを仕込んで実行することもできます。

spy-js for node.jsについては以下の動画で詳しく解説されています。

<iframe width="560" height="315" src="//www.youtube.com/embed/kzw8GmakYGY" frameborder="0" allowfullscreen></iframe>


## Postfix completion


Java(IntelliJ)の方ではすでに入っていましたが、新しい補完方法として**Postfix completion**がサポートされました。
これは以下のように、式の末尾に`.return<TAB>`としてスニペット的な補完をする方式です。

![gif](http://gyazo.com/095afae3db42318dfb0a1ea3f00d47d1.gif)

- [Postfix Code Completion in IntelliJ IDEA 13.1 EAP \| JetBrains IntelliJ IDEA Blog](http://blog.jetbrains.com/idea/2014/03/postfix-completion/ "Postfix Code Completion in IntelliJ IDEA 13.1 EAP | JetBrains IntelliJ IDEA Blog")
- [おもしろプラグイン：Postfix Completionプラグイン - marsのメモ](http://d.hatena.ne.jp/masanobuimai/20131218/1387292674 "おもしろプラグイン：Postfix Completionプラグイン - marsのメモ")

まだ補完の定義は多くないですが、[Complete Current Statement](http://blog.livedoor.jp/okashi1/archives/51751259.html "Complete Current Statement")と合わせるとコードを書くテンポが結構変わりそうな気がします。

![list](http://efcl.info/wp-content/uploads/2014/08/12-1407820341.png)

## その他

他には、[EditorConfig](http://editorconfig.org/ "EditorConfig")、[Web Components](http://plugins.jetbrains.com/plugin/7312?pr=webStorm "Web Components")のプラグイン対応、PhoneGap/Cordovaの実行サポート等が含まれています。

[Roadmap for WebStorm 9 - WebStorm - Confluence](http://confluence.jetbrains.com/display/WI/Roadmap+for+WebStorm+9 "Roadmap for WebStorm 9 - WebStorm - Confluence") によると、[Gulp Support](http://youtrack.jetbrains.com/issue/WEB-11649?_ga=1.111451204.1798192124.1402466764 "Gulp Support ")やパフォーマンスの改善、[meteor support](http://youtrack.jetbrains.com/issue/WEB-6264 "meteor support ")、JSDoc3の対応改善等が予定されています。

## EAP

当たり前ですが、EAPなのでまだバグが多いです。

バグを見つけたら以下からIssueを立てたり、既存のIssueにStarをしたりすれば修正されると思います。

- [WebStorm _ IntelliJ Web (WEB) | YouTrack](http://youtrack.jetbrains.com/issues/WEB "WebStorm _ IntelliJ Web (WEB) | YouTrack")

これは全部のEAP対象ですが、[idea-markdown](https://github.com/nicoulaj/idea-markdown " idea-markdown")などの一部プラグインが動いてない等もあるのでまだEAPだということを忘れずに。

