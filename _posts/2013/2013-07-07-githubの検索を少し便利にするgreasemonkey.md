---
title: Githubの検索を少し便利にするGreasemonkey
author: azu
layout: post
permalink: /2013/0707/res3320/
dsq_thread_id:
  - 1475024898
categories:
  - Greasemonkey
tags:
  - github
  - Greasemonkey
  - javascript
---
[Github-better-search][1] というGreasemonkeyを書いてみました。

今のところ機能的には対したものは入ってないです。

1.  リポジトリ内での検索のデフォルトを `This Repository` なのを `All repositories` に変更
2.  検索画面で特定の言語をチェックした状態で、検索しなおした時にその言語の選択を引き続くように

<img src="https://efcl.info/wp-content/uploads/2013/07/cb498ea76d7c8264f149a244cb6dc088.jpg" alt="Search  SEARCH 2013 07 07 23 00 50" title="Search · SEARCH 2013-07-07 23-00-50.jpg" border="0" width="600" height="353" />

通常だと検索し直すと言語のチェックが外れてしまうので、それを継続した状態にするような機能を入れてあります。

以下からインストール出来ます

*   [Github Better Search for Greasemonkey][2]

### 中身の話

GithubのDOMはよく変わる印象なので、壊れることを前提としたコードになってます。

[selector][3] というメソッドは `document.querySelector()`の単なるラッパーですが、結果が `null` だった時点で[例外][4]を吐いて、[GM_notification][5] (Scriptish)で通知をするようにしてます。(なので壊れるとかなりうざったい)

書いていて、GM_notification みたいなGreasemonkey APIの補完が効かないのは悲しいので、  
[azu/Greasemonkey-JSDoc][6] という、大体のAPIのJSDocで書いたものを作っておいてあります。

JSDocに対応してるWebStorm等のエディタなら、補完や引数のチェックなどが簡単にできると思います。

&#8220;検索しなおした時にその言語の選択を引き続くように&#8221; みたいな機能をやるのに、hiddenのinputをformに追加しているのですが、Githubの検索画面はpjaxでpushStateとAjaxで書き換えが起きてるので、動的な変更に対応しないと上手く動きません。

最初は、pushstate後にhiddenなinputを入れなおす感じにするのかなと思って[history.pushState][7]みたいなイベントをキャッチしてやってましたが、pushstate後にDOMが書き換えられてるので[DOMの変更を検知][8]してその後に追加するように変えました。

変更の検知は[MutationObserver][9]が使えるので、それを追加しましたがMutationObserverは `addEventListener` とかとは使い方大分違くて分かりにくい感じがするので、[Mutation events][10]の時のように近いインターフェイスで扱えるものがあるといいんじゃなかなとか思いました。(非同期なので揃えるべきなのか怪しいですが)

*   [Introduction to DOM4 &#8211; DOM ECMAScripting][11]
*   [DOM MutationObserver – reacting to DOM changes without killing browser performance. ✩ Mozilla Hacks – the Web developer blog][12]
*   [Mutation Event から Mutation Observers へ | Web標準Blog | ミツエーリンクス][13]

後、JSDocとかをちょこちょこ書きながらやってました。  
enumuみたいのとか定数とかはオブジェクトにまとめて、[@type][14]とか[@enum][15]とかのアノテーションを入れてあげると、エディタとかに優しいです。

TypeScriptの[型定義ファイル][16](.d.ts)とかもありますが、JSDoc -> .d.ts もできなくはないはずなので、邪魔にならないならJSDocを書いておいても損はない気がします。(移植性も[doctrine][17]等のパーサーがあるので色々できるはず)

JSDoc + Google Closure Compiler拡張の記法なら大体の事は書けるので、一度みてみるのも面白いかもしれないですね。  
ただ、メリットを享受できる環境じゃないとあんまり書く気がでないというのはある気がします。

*   [Use JSDoc: Index][18]
*   [An introduction to JSDoc][19]
*   [JsDoc3-manual-jp][20]
*   [今さらながら知ったWebStormとJSDocの深〜い関係 | 宇都宮ウエブ制作所][21]
*   [New in 5.0: Google Closure Compiler JSDoc annotations | WebStorm & PhpStorm Blog][22]
*   [Constellation/doctrine][23]
*   [JSDoc Toolkit→JSDoc 3移行ガイド &#8211; Technology of DeNA][24]

[Brackets][25]や[Scripted][26]など最近はJSDocを補完サポートに対応しているものも増えたと思います。

ソースコード

*   [azu/Github-better-search][27]

 [1]: https://github.com/azu/Github-better-search "Github-better-search"
 [2]: http://userscripts.org/scripts/show/172760 "Github Better Search for Greasemonkey"
 [3]: https://github.com/azu/Github-better-search/blob/a84bf9a798519d91bb809dc708e0670fd217202d/github-better-search.user.js#L136 "selector"
 [4]: https://github.com/azu/Github-better-search/blob/a84bf9a798519d91bb809dc708e0670fd217202d/github-better-search.user.js#L156
 [5]: https://github.com/scriptish/scriptish/wiki/GM_notification "GM_notification"
 [6]: https://github.com/azu/Greasemonkey-JSDoc "azu/Greasemonkey-JSDoc"
 [7]: http://stackoverflow.com/questions/4570093/how-to-get-notified-about-changes-of-the-history-via-history-pushstate "history.pushState"
 [8]: https://github.com/azu/Github-better-search/blob/a84bf9a798519d91bb809dc708e0670fd217202d/github-better-search.user.js#L19
 [9]: https://github.com/azu/Github-better-search/blob/a84bf9a798519d91bb809dc708e0670fd217202d/github-better-search.user.js#L180 "MutationObserver"
 [10]: https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Events/Mutation_events "Mutation events"
 [11]: http://domes.lingua.heliohost.org/webapi/intro-domcore1.html "Introduction to DOM4 - DOM ECMAScripting"
 [12]: https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/ "DOM MutationObserver – reacting to DOM changes without killing browser performance. ✩ Mozilla Hacks – the Web developer blog"
 [13]: http://standards.mitsue.co.jp/archives/001538.html "Mutation Event から Mutation Observers へ | Web標準Blog | ミツエーリンクス"
 [14]: http://usejsdoc.org/tags-type.html "@type"
 [15]: http://usejsdoc.org/tags-enum.html "@enum"
 [16]: https://github.com/borisyankov/DefinitelyTyped
 [17]: https://github.com/Constellation/doctrine "doctrine"
 [18]: http://usejsdoc.org/index.html "Use JSDoc: Index"
 [19]: http://www.2ality.com/2011/08/jsdoc-intro.html "An introduction to JSDoc"
 [20]: https://sites.google.com/site/jsdoc3manualjp/home "JsDoc3-manual-jp"
 [21]: http://utweb.jp/blog/archives/1501 "今さらながら知ったWebStormとJSDocの深〜い関係 | 宇都宮ウエブ制作所"
 [22]: http://blog.jetbrains.com/webide/2012/08/closure-syntax/ "New in 5.0: Google Closure Compiler JSDoc annotations | WebStorm & PhpStorm Blog"
 [23]: https://github.com/Constellation/doctrine "Constellation/doctrine"
 [24]: http://engineer.dena.jp/2013/05/migration-from-jsdoc2-to-jsdoc3.html "JSDoc Toolkit→JSDoc 3移行ガイド - Technology of DeNA"
 [25]: http://brackets.io/ "Brackets"
 [26]: https://github.com/scripted-editor/scripted "Scripted"
 [27]: https://github.com/azu/Github-better-search "azu/Github-better-search"
