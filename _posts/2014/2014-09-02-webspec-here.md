---
title: "ウェブの仕様は今どこにあるのか？"
author: azu
layout: post
date : 2014-09-02T07:46
category: Web 
tags:
    - Web
    - Spec
    - JavaScript
    - ECMAScript
    - DOM
    - Community
    - Browser

---

## Webの仕様

ウェブの仕様といえば、[W3C](http://www.w3.org/Status "W3C Open Source Software")や[WHATWG](http://www.whatwg.org/specs/ "WHATWG")、[IETF](https://www.ietf.org/ "IETF")とかが思い浮かぶかもしれません。

これらの仕様が最近ではメーリングリストやIRCといった旧来のところだけではなく、GitHub上で議論されて策定が進められている事が増えています。(両方使ってるという話)

この記事はそのような方法で進められてる仕様等についての紹介です。

＊ 自分自身はそこまで仕様に対して強い興味があるわけではないので、もっと詳しい方が正しくまとめて頂きたいです。。

最初に[Move The Web Forward | Guide to getting involved with standards and browser development](http://movethewebforward.org/ "Move The Web Forward | Guide to getting involved with standards and browser development")を見ておくといいかもしれません。

### JavaScriptの仕様

この動きが多く見られるのがJavaScript(ECMAScriptやDOM APIを含む)周りの仕様についてです。

例えば、ES6 PromisesはGitHub上の[domenic/promises-unwrapping](https://github.com/domenic/promises-unwrapping "domenic/promises-unwrapping")が議論の中心となっていて、ECMAScript 6thに入った仕様もこのREADMEファイルに書かれたものがベースとなっています。

GitHubにおいてあるので、当たり前のように**仕様**に対してPull Requestして修正等も行われています。

また、最近のJavaScriptの仕様で特徴的なので、仕様とともPolyfillやリファンレス実装を一緒に作るケースが見られます。

domenicさんが担当する[ES6 promises](https://github.com/domenic/promises-unwrapping "ES6 promises")と[Streams API](https://github.com/whatwg/streams "Streams API")(https://github.com/whatwg/streams)は[Especially](https://github.com/domenic/especially "Especially")というモジュールを使ったリファレンス実装が公開されています。

[Especially](https://github.com/domenic/especially "Especially")はECMAScriptの仕様内部で表現操作をコードで表現するためのものなので、リファレンス実装も仕様書のStepに沿うようなコードになっています。

----
#### ECMAScriptはどこに?

ECMAScript自体の議論の場としてはMLがあり、[es-discuss](http://esdiscuss.org/ "es-discuss")という専用のサイトでアーカイブを見られます。
また、定期的に行われている[ECMAのTC39ミーティングのノート](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")がGitHubで公開されています。

- [ES Discuss](http://esdiscuss.org/ "ES Discuss")
- [es-discuss summaries (esdiscuss) on Twitter](https://twitter.com/esdiscuss "es-discuss summaries (esdiscuss) on Twitter")
- [rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")

現在策定中のECMAScript6については上記などで議論された内容を反映したものが、[Draft Specification for ES.next (Ecma-262 Edition 6)](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts "Draft Specification for ES.next (Ecma-262 Edition 6)")にてドラフト版として公開されています。
(HTML版も[ECMAScript Language Specification ECMA-262 6th Edition – DRAFT](http://people.mozilla.org/~jorendorff/es6-draft.html "ECMAScript Language Specification ECMA-262 6th Edition – DRAFT"))

----

### [The Extensible Web Manifesto](http://extensiblewebmanifesto.org/ "The Extensible Web Manifesto")

実際に使えるPolyfillを作りながら仕様も策定していってるスタイルだと[WebComponents](http://webcomponents.org/ "WebComponents")が有名どころです。

[WebComponents](http://webcomponents.org/ "WebComponents")や[Service Workers](http://www.w3.org/TR/service-workers/ "Service Workers")は[platform.js](http://www.polymer-project.org/docs/start/platform.html "platform.js")(polymerの内部で使われる)というpolyfillが既に公開されています。

この実際に動かせるpolyfillを用意するというスタイルは[The Extensible Web Manifesto](http://extensiblewebmanifesto.org/ "The Extensible Web Manifesto")というポリシーが掲げられていて、これに基づいた行動といえると思います。

これ以外にも最近の仕様は大体GitHubにリポジトリを持つのが一般的と言えるぐらい最近の仕様はGitHub上に置かれていることが多いです。

#### GitHub上の仕様とアカウント

W3C/WAHTWG 組織アカウント

- [World Wide Web Consortium](https://github.com/w3c "World Wide Web Consortium")
- [whatwg](https://github.com/whatwg "whatwg")

WG

- [W3C Technical Architecture Group](https://github.com/w3ctag/ "W3C Technical Architecture Group")
- [W3C System Applications Working Group](https://github.com/sysapps "W3C System Applications Working Group")
- [W3C Audio Working Group](https://github.com/WebAudio "W3C Audio Working Group")

その他

- [slightlyoff/ServiceWorker](https://github.com/slightlyoff/ServiceWorker "slightlyoff/ServiceWorker")
- [domenic/promises-unwrapping](https://github.com/domenic/promises-unwrapping "domenic/promises-unwrapping")
- [HTTP/2](https://github.com/http2 "HTTP/2")

GitHubにある仕様はJavaScript関係のものだけではなく、[HTTP/2](https://github.com/http2 "HTTP/2")も同様にGitHubにリポジトリを持って管理されていたりします。

(仕様関係のGitHubアカウント/リポジトリ どこかにまとめないのかな?)

### コミュニティ

上記で紹介してるようにウェブでの仕様はGitHubに移動(MLも併用する)したことで、MLだけの頃よりは遥かに変更を見たり、疑問や問題をIssueにしたり、Pull Requestによって変更を送ったりがしやすくなりました。

ただ、それでも仕様に対するContributingは難しいという印象があるかもしれません。どこに仕様があるのか分からなかったり、過去ログを見ないと言いたいことが既出なのか分からなかったり、意見するのに壁があるかもしれません。

そのようなどうすればいいのかわからない状態を補助するために作られたのが[Specifiction](http://discourse.specifiction.org/ "Specifiction")というサイトです。

[Specifiction](http://discourse.specifiction.org/ "Specifiction")は見た目通りの掲示板的な場所ですが、以下で案内されているように、そのウェブ標準への意見の内容が既出であろうがなかろうが言える場所となることを目的にしています。

> Basically, if you have anything to say about Web standards, be it a new feature or feedback on an existing one, just say it!
[Welcome to Specifiction - Specifiction](http://discourse.specifiction.org/t/welcome-to-specifiction/6 "Welcome to Specifiction - Specifiction")

HTMLやCSSといったかなり大雑把なカテゴリが用意されていることからも分かるように、どこに言えばいいのか分からないならここで言おうという感じです。

話題になった例だと、CSS Color Level 4に`rebeccapurple`を加えるという議論はここから始まっています。

- [Name #663399 "Becca Purple"in CSS4 Color? - Specifiction](http://discourse.specifiction.org/t/name-663399-becca-purple-in-css4-color/225 "Name #663399 &#34;Becca Purple&#34; in CSS4 Color? - Specifiction")
- [本の虫: rebeccapurpleがCSS 4 colorに提案された経緯](http://cpplover.blogspot.jp/2014/06/rebeccapurplecss-4-color.html "本の虫: rebeccapurpleがCSS 4 colorに提案された経緯")

このような "誰に or どこにいいのか分からない"という意見を言うと言うのは、何もウェブ標準についてだけではなく、ウェブサイトのブラウザ間での互換性についてもコニュニティが存在します。

[webcompat.com](http://webcompat.com/ "webcompat.com") はMozilla Web Compatibility teamが始めたサイト(GitHub Issue)で"Bug reporting for the internet."と書かれているように、通常のウェブサイトの問題やウェブブラウザの問題について報告できる場所です。

報告された問題に対して、ボランティアの人等が調べて、サイトの持ち主やブラウザベンダに報告してくれるという形です。

MSも[webcompat.com](http://webcompat.com/ "webcompat.com")からのバグ報告について言及しています。

- [The Mobile Web should just work for everyone - IEBlog - Site Home - MSDN Blogs](http://blogs.msdn.com/b/ie/archive/2014/07/31/the-mobile-web-should-just-work-for-everyone.aspx "The Mobile Web should just work for everyone - IEBlog - Site Home - MSDN Blogs")

### おわりに

最近よく見るウェブの仕様について簡単に紹介しました。

今までのメーリングリストというような見えにくい所だけではなく、GitHub上や[Specifiction](http://discourse.specifiction.org/ "Specifiction")
といったより見やすく、参加しやすい形へと変化していってると思います。

----


## 専門家の見解

＜ ここには、仕様策定に詳しい専門家からの見解が掲載されます ＞

＜ Pull Request は   [こちらからです！](https://github.com/efcl/efcl.github.io/edit/master/_posts/2014/2014-09-02-webspec-here.md "efcl/efcl.github.io")＞


----



