---
title: '#うどんJS でnode-webkitと一人で使うGithub Issueについて発表してきた'
author: azu
layout: post
permalink: /2014/0528/res3914/
dsq_thread_id:
  - 2718870950
categories:
  - イベント
tags:
  - github
  - javascript
  - node-webkit
---
トレタの人たちとうどんを食べてきました。

参考情報です。

*   [就活日記 (11) トレタ訪問 &#8211; laiso][1]

Twitterのまとめはこちらです。(ハイライト的なトビトビ感…)

*   [#うどんJS &#8211; Togetterまとめ][2]

* * *

<blockquote class="twitter-tweet" lang="ja">
  <p>
    <a href="https://twitter.com/search?q=%23%E3%81%86%E3%81%A9%E3%82%93JS&src=hash">#うどんJS</a> 本日のメニューです <a href="http://t.co/MmgcIJ7gu8">pic.twitter.com/MmgcIJ7gu8</a>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/statuses/471599388108668928">2014, 5月 28</a>
  </p>
</blockquote>



自分は以下の2つについて発表してきました。

*   [node-webkitとは何か][3]
*   [一人で使えるGithub Issue][4]

### [node-webkitとは何か][3]

[node-webkitとは何か][3] では、最近node-webkitでアプリを書いたのでそこでハマるであろうContextの話を中心にnode-webkitの特徴について紹介した内容です。(その場でもnode-webkitにはまって挫折事例がありました)

*   [Githubのタイムラインや通知を見るアプリをnode-webkitで作った | Web scratch][5]

* * *

### [一人で使えるGithub Issue][4]

[一人で使えるGithub Issue][4]では、GithubのIssueとpull requestsを一人でどう使っているかについて話ました。

最近、[JavaScript Promiseの本][6]というのを書いている中で、後半はかなりこのフローを回していて、書く内容をIssueにして、自分自身にPull Requestsして処理していくというフローをとっています。

基本的には気になる事はどんどんIssueに書いていって、ある程度煮詰めたら自分に対してpull requestsを立てつつ作業するというサイクルの話です。

作業前にIssueを煮詰めるのは、移動中に作業(コードや文章書いたり)することが多いため、オフラインが多い移動中に効率よくするためにそういう事をしています。

また、Issueでカバーしきれない時は[Gitter][7]を使ったりして流れを書いています。

*   [azu/promises-book &#8211; Gitter][8]

*   [Githubのissueをオフライン環境で見る | Web scratch][9]

また、自分に[Pull Requests][10]しながら作業するようになったのは結構最近ですが、自分的にはひとつのPull Requests毎が質が安定しやすくなった気がします。

Travis CIが通る間にもう一度軽くチェックしたり、書いてて疑問に思ったことや提案はそのIssueに書き込んだりすることで考えが整理しやすくなった気がします。

* * *

### その他

*   @swdyh さんの生存を確認しました。
*   [GollumEvent][11] は明らかに設計が変という同意を得ました

 [1]: http://laiso.hatenablog.com/entry/2014/04/07/%E5%B0%B1%E6%B4%BB%E6%97%A5%E8%A8%98_(10)_%E3%83%88%E3%83%AC%E3%82%BF%E8%A8%AA%E5%95%8F "就活日記 (11) トレタ訪問 - laiso"
 [2]: http://togetter.com/li/673082 "#うどんJS - Togetterまとめ"
 [3]: https://azu.github.io//slide/udonjs/node-webkit.html "node-webkitとは何か"
 [4]: https://azu.github.io//slide/udonjs/github-issue.html "一人で使えるGithub Issue"
 [5]: https://efcl.info/2014/0430/res3872/ "Githubのタイムラインや通知を見るアプリをnode-webkitで作った | Web scratch"
 [6]: https://azu.github.io//promises-book/ "JavaScript Promiseの本"
 [7]: https://gitter.im/ "Gitter"
 [8]: https://gitter.im/azu/promises-book "azu/promises-book - Gitter"
 [9]: https://efcl.info/2014/0521/res3908/ "Githubのissueをオフライン環境で見る | Web scratch"
 [10]: https://github.com/azu/Promises-book/pulls?direction=desc&page=1&sort=created&state=closed "Pull Requests · azu/promises-book"
 [11]: https://developer.github.com/v3/activity/events/types/#gollumevent "GollumEvent"
