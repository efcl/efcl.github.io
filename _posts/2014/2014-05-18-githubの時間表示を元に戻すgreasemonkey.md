---
title: Githubの時間表示を元に戻すGreasemonkey
author: azu
layout: post
permalink: /2014/0518/res3905/
dsq_thread_id:
  - 2693794437
categories:
  - Firefox
  - Greasemonkey
tags:
  - Firefox
  - github
  - Greasemonkey
---
## Githubとweb components

皆さんご存知のように最近GithubではWebComponentsでの`time`要素が使われています。

<blockquote class="twitter-tweet" lang="en">
  <p>
    Yay! <a href="https://twitter.com/github">@github</a> is using web components. All of the timestamps are <local-time> custom elements. <a href="http://t.co/E10Ljl1elf">pic.twitter.com/E10Ljl1elf</a>&mdash; Eric Bidelman (@ebidel) <a href="https://twitter.com/ebidel/statuses/464102546114506752">May 7, 2014</a>
  </p>
</blockquote>



Web Componentsについては[WebComponents.org][1]等を見るといいです。

## 時間のフォーマットの変更

そのため、今までと時間表示のフォーマットが違うものになってるみたいです。

2014年5月18日現在は以下のような感じです。

<img src="https://efcl.info/wp-content/uploads/2014/05/promises-book-2014-05-18-13-28-15-2014-05-18-13-28-17.png" alt="Promises book 2014 05 18 13 28 15 2014 05 18 13 28 17" title="promises-book 2014-05-18 13-28-15 2014-05-18 13-28-17.png" border="0" width="600" height="578" />

英語が読めなくて辛かったので、(多分)今までと同じような相対表示にするGreasemonkeyスクリプトを書きました。

*   [Github-time-format-changer][2] からインストール

適応すると以下のような感じになると思います。

<img src="https://efcl.info/wp-content/uploads/2014/05/promises-book-2014-05-18-13-31-24-2014-05-18-13-31-26.png" alt="Promises book 2014 05 18 13 31 24 2014 05 18 13 31 26" title="promises-book 2014-05-18 13-31-24 2014-05-18 13-31-26.png" border="0" width="600" height="568" />

Githubのpjax、Autopagerizeにも対応したつもりですが、イマイチtime要素に値が入るタイミングが非同期でずれてる可能性があるので、より正確な方法が分かる人は  
[azu/Github-time-format-changer][3] とかにpull-request送って下さい。

## [Greasy Fork][4]

スクリプトは[Github-time-format-changer][2]にありますが、今までよく使われていた http://userscripts.org/ ではなく https://greasyfork.org/ というところを利用しています。

最近のuserscripts.orgはサイトが落ちまくってたり、スパムだらけになってメンテされてない感じがするので、  
それの代わりを作ろうと立ち上がったのが[Greasy Fork][4]というサイトで、[userstyles.org][5]の人がやっています。

サービス自体が[JasonBarnabe/greasyfork][6] Github上で活発に開発されてたり、[Import scripts][7]でuserscript.orgやGithubからコードをインポートしたり同期したりできるので、移行は気軽にできるんじゃないかなと思います。

後、GreaseForkは`@require`で外部スクリプトを読み込んでいる時に、セキュリティリスクを少しでも軽減するため、  
CDN等の動的に変更できないような場所かどうかのホワイリストによるチェックが入ってます。

*   [Code rules][8]

今後のGreasemonkeyの配布は、Githubにコードを置いて、greasyforkのSync機能を使って同期させるのがいいんじゃないかなーと思います。  
今はuserscripts.orgのみしか置いてないコードも結構あるので、ひとつのサービスが落ちてると使えなくなるようなスクリプトも結構多い感じがしました。

<img src="https://efcl.info/wp-content/uploads/2014/05/Greasy-Fork-2014-05-18-13-40-31-2014-05-18-13-40-52.png" alt="Greasy Fork 2014 05 18 13 40 31 2014 05 18 13 40 52" title="Greasy Fork 2014-05-18 13-40-31 2014-05-18 13-40-52.png" border="0" width="600" height="312" />

 [1]: http://webcomponents.org/ "WebComponents.org"
 [2]: https://greasyfork.org/scripts/1130-github-time-format-changer "Github-time-format-changer"
 [3]: https://github.com/azu/Github-time-format-changer "azu/Github-time-format-changer"
 [4]: https://greasyfork.org/ "Greasy Fork"
 [5]: http://userstyles.org/ "userstyles.org "
 [6]: https://github.com/JasonBarnabe/greasyfork "JasonBarnabe/greasyfork"
 [7]: https://greasyfork.org/import "Import scripts"
 [8]: https://greasyfork.org/help/code-rules#require "Code rules"
