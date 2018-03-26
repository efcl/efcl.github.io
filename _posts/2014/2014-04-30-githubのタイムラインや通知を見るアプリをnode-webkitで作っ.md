---
title: Githubのタイムラインや通知を見るアプリをnode-webkitで作った
author: azu
layout: post
permalink: /2014/0430/res3872/
dsq_thread_id:
  - 2650394570
categories:
  - software
tags:
  - github
  - node-webkit
  - Node.js
---
[github-reader][1] というGithubの[Notifications][2] や [News Feed][3]を見るためのビューアーアプリを作ってみました。

大した機能はなくて、GithubでWatch等をして飛んでくる[Notifications][2]とホーム画面にタイムライン的に流れてくる[News Feed][3]を一緒に見られるだけです。

飛んできたイベントをWebViewで見られるRSS Feed Readerみたいな感じです。

<img src="http://cl.ly/image/2v053R0Y0s0a/2014-04-29%2022_38_04.gif" border="0" width="600" height="431" />

## インストール

1.  [node-webkit][4] をダウンロードしてインストールします
2.  [github-reader.nw][5] からアプリをダウンロードします
3.  node-webkitをインストール済みならgithub-reader.nwが関連付けから起動

## 使い方

自分しか使わないかなと思ったので認証周りがかなり手抜きしています。  
(以前も[似たものを作った][6]けど使ってる人はいない)

Githubでは自分用の認証のtokenを発行できるので、それを作ってもらってログインする感じで使います。

<img src="https://monosnap.com/image/xNMXVDIlfH6Lom2Q2DMDKxPbc3kLaJ.png" border="0" width="600" height="431" />

*   [New personal access token][7]から新しいtokenの作成
*   **scopes**の選択肢で `notifications` と `user`はチェックする

上記の手順でtokenを作ってもらったらアプリを起動して、最初にtokenとGithubアカウントの設定をします。(APIを使うためです)

<img src="https://monosnap.com/image/Dgh7zSUetiJTNuQQ55w76CYVur7G0h.png" border="0" width="600" height="431" />

`Config`を開くと設定画面が出てくるので、  
Githubの**username**と先ほど作成したPersonal access tokenをそれぞれ入力して保存&更新します。

これで左側に[Notifications][2] や [News Feed][3]が混ざったものがながれてくるようになると思います。

ショートカットとして以下のようなのがあります。(特に設定とか用意してないので、変更出来るようにしたい場合はPullRequestして下さい…)

*   J 次のイベントへ
*   K 前のイベントへ
*   O 開いてるイベントをブラウザで開き直す

後、Growlでイベント通知するようにしてます。(Mac以外で動くのかな?)

<img src="https://efcl.info/wp-content/uploads/2014/04/BmdVSTYCAAAXm7k_large.jpg" alt="BmdVSTYCAAAXm7k jpg large" title="BmdVSTYCAAAXm7k.jpg_large.jpg" border="0" width="600" height="431" />

## 仕組み

この[github-reader][1]は[node-webkit][8]で動いています。  
なので、アプリ内部は殆どシングルページアプリケーションと同じような感じです。(iframeでGithubは埋め込めませんが、[nwfaketop][9]という特殊な属性で出来るようにしてます)

ソースコードは[azu/github-reader][1]で公開しています。

`/Applications/node-webkit.app/Contents/MacOS/node-webkit path/to/github-reader/` という感じで起動できます。

公式の[Quick Start][10]はなぜかzipでパッケージングしてから実行してますが、デバッグ時にそんな事はやる必要ありません

* * *

追記: 今のnode-webkitのバージョンにはバグがあって、意図しないpackage.jsonを読み込んで起動出来ない問題があります。

*   [NodeWebkit起動時のエラー &#8211; Sync all][11]
*   [Invalid package.json &#8211; Field main is required · Issue #22 · shama/nodewebkit][12]
*   [node.js &#8211; Running NodeWebkit app fails with: Invalid package.json Field 'main' is required error &#8211; Stack Overflow][13]

一時しのぎとしては特定の`_package.json`にリネームするなどが必要です。  
(`$ /Applications/node-webkit.app/Contents/MacOS/node-webkit` で直接ディレクトリを指定した場合はこれをやる必要はないと思いますが、npmの[nodewebkit][14]を使う場合などはコレにハマります)

* * *

[node-webkit][8]の特殊な所としては、Node.jsとJavaScriptのcontextが存在していて、  
nodeで書いたものもそのまま動かせます。

2つのcontextの違いは[Differences of JavaScript contexts · rogerwang/node-webkit Wiki][15]に書かれています。

JavaScriptと言っても先ほどの[nwfaketop][9]のような特権的な機能やOSネイティブの[Native UI API][16]もこのJavaScript contextから触ることが出来ます。(拡張でいうChrome権限と似たような話です)

この2つのcontextの大きな違いとして、どちらもモジュールの読み込みに`require`を使うのですが、  
それの解決パスが違う所が結構はまるかもしれません。

*   [Resolving relative paths to other scripts][17]
*   [azu/node-webkit-index-pattern][18]

ものすごく大雑把にまとめると、

*   `<script>` タグで実行されるコードはJavaScript Context
*   JavaScript Context(A)から`require`して実行されるコードもJavaScript Context(B)
*   Bから`require`されて実行されるコードがNode Context

という感じですが、直感的ではないので[azu/node-webkit-index-pattern][18]等のコードを実行して試してみると感覚的にわかると思います。

[github-reader][1] ではGUI関係以外はNode Contextにして実行できるようにして作りました。

JavaScript Contextで実行したものはnode-webkitのDevToolsがそのまま使えるので、  
そっちにまとめてもよかったかなとか思いましたが、どうするのがいいのかまだ良く見えてないです。。

<img src="https://efcl.info/wp-content/uploads/2014/04/index.html-2014-04-30-23-38-40-2014-04-30-23-38-50.png" alt="Index html 2014 04 30 23 38 40 2014 04 30 23 38 50" title="index.html 2014-04-30 23-38-40 2014-04-30 23-38-50.png" border="0" width="600" height="485" />

node-webkitはその2つのcontextの溝が殆どないので、結構簡単に境界をまたいだり出来ます。

[github-reader][1] ではバインディグに[Vue.js][19]をつかって書いてるのですが、  
この[Vue.js][19]が動いてるところはNode Contextだったり、  
何か不思議な感じになっています。(いくつかグローバルメソッドが見えなくて動かないケースがあったので[workaround][20]を入れてます…)

ブラウザ拡張の世界だとこういうcontextの違いを跨ぐにはメッセージングの仕組みなどがあって面倒ですが、  
node-webkitはそのままつながってる感じで楽といえば楽ですがごちゃごちゃになりやすいなと思います。

node-webkitについては基本的にWikiを見ていくのがいいと思います。

*   [Home · rogerwang/node-webkit Wiki][21]

## デバッグ

基本的にはWebStormで書いて実行して確認してました。

node.jsがそのまま動くという特性があるので、ロジック面等はnode moduleとして[parse-github-event][22]用意すれば、普通にnode.js書くのと同じように実行とテストが出来ます。

[WebStorm 8.0.1][23] からnode-webkitのデバッグ実行もサポートしてるので、普通のウェブアプリ/Node.jsアプリをデバッグしてる感覚で行えます。

<img src="https://efcl.info/wp-content/uploads/2014/05/2014-05-01-at-12.51.png" alt="2014 05 01 at 12 51" title="2014-05-01 at 12.51.png" border="0" width="600" height="339" />

後、node-webkitならではの特徴(スクリプト言語ならでは)としては、  
普通にウェブアプリと同じようにリロードすることで、スクリプトが反映されるので、アプリを起動しなおさなくてもリロードだけで動作確認が繰り返せます。

<img src="https://efcl.info/wp-content/uploads/2014/05/Github-Reader-2014-05-01-12-53-26-2014-05-01-12-54-35.png" alt="Github Reader 2014 05 01 12 53 26 2014 05 01 12 54 35" title="Github Reader 2014-05-01 12-53-26 2014-05-01 12-54-35.png" border="0" width="600" height="441" />

Chromiumベースなので、Chrome DevToolsと同じような機能が普通に使えたり、デバッグはかなりやりやすい部類になるんじゃないかなと思いました。

* * *

## おわりに

[以前Objective-Cで同じもの][6]を書いた時に比べて、1日ちょっと大体形になったのでかなりテンポよくできたなーと思いました。

npmから[既存][24]の[モジュール][25]をそのまま使えたり、これ向けに作った[parse-github-event][26]等のモジュールもnpm経由で管理できたりするのがいい感じでした。

制限のないbrowserifyの世界みたいな感じなので、Node.jsでウェブアプリを書くという不思議な世界観になったり面白いなと思います。

<blockquote class="twitter-tweet" lang="en">
  <p>
    ブラウザ向けのJavaScript&#10;-> Node.jsスタイルでブラウザ向けのJavaScript(browserify) &#10;-> Node.jsがブラウザで動くJavaScript(node-webkit)&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/statuses/461518970349039617">April 30, 2014</a>
  </p>
</blockquote>



今回全然意識してないですが、[node-webkit][8]はクロスプラットフォーム向けにアプリを簡単に作れるので、  
ウェブアプリっぽくGUIアプリを作るのにはいい感じのものな気がします。

まだどうするのがベストなのかよくわかってないので、機能追加や修正等のPullRequestは[azu/github-reader][1]にまでよろしくお願いします。

 [1]: https://github.com/azu/github-reader "azu/github-reader"
 [2]: https://github.com/notifications "Notifications"
 [3]: https://github.com/ "GitHub"
 [4]: https://github.com/rogerwang/node-webkit#downloads "Downloads"
 [5]: https://github.com/azu/github-reader/blob/gh-pages/github-reader.nw?raw=true
 [6]: https://github.com/azu/GithubReader "azu/GithubReader"
 [7]: https://github.com/settings/tokens/new "New personal access token"
 [8]: https://github.com/rogerwang/node-webkit "rogerwang/node-webkit"
 [9]: https://github.com/rogerwang/node-webkit/wiki/Mini-browser-in-iframe "nwfaketop"
 [10]: https://github.com/rogerwang/node-webkit#quick-start "Quick Start"
 [11]: http://bulbulpaul.hatenablog.jp/entry/2014/04/26/101421 "NodeWebkit起動時のエラー - Sync all"
 [12]: https://github.com/shama/nodewebkit/issues/22 "Invalid package.json - Field main is required · Issue #22 · shama/nodewebkit"
 [13]: http://stackoverflow.com/questions/22787613/running-nodewebkit-app-fails-with-invalid-package-json-field-main-is-required/22937101?stw=2#22937101 "node.js - Running NodeWebkit app fails with: Invalid package.json Field 'main' is required error - Stack Overflow"
 [14]: https://github.com/shama/nodewebkit "nodewebkit"
 [15]: https://github.com/rogerwang/node-webkit/wiki/Differences-of-JavaScript-contexts "Differences of JavaScript contexts · rogerwang/node-webkit Wiki"
 [16]: https://github.com/rogerwang/node-webkit/wiki/Native-UI-API-Manual "Native UI API"
 [17]: https://github.com/rogerwang/node-webkit/wiki/Differences-of-JavaScript-contexts#resolving-relative-paths-to-other-scripts "Resolving relative paths to other scripts"
 [18]: https://github.com/azu/node-webkit-index-pattern "azu/node-webkit-index-pattern"
 [19]: http://vuejs.org/ "Vue.js"
 [20]: https://github.com/azu/github-reader/blob/master/app/node-webkit/workaround.js "workaround"
 [21]: https://github.com/rogerwang/node-webkit/wiki "Home · rogerwang/node-webkit Wiki"
 [22]: https://github.com/azu/parse-github-event "parse-github-event"
 [23]: http://blog.jetbrains.com/webstorm/2014/04/webstorm-8-0-1-bug-fix-update/ "WebStorm 8.0.1"
 [24]: https://www.npmjs.org/package/vue "vue"
 [25]: https://www.npmjs.org/package/bluebird "bluebird"
 [26]: https://www.npmjs.org/package/parse-github-event "parse-github-event"
