---
title: "Maintainer Month: なぜtextlintを作ったか"
author: azu
layout: post
date : 2022-06-29T00:00
category: textlint
tags:
    - MaintainerMonth
    - textlint
    - OpenSource

---

今では200以上のルールがある自然言語のLintツールである[textlint](https://textlint.github.io/)がどのように作られたかを振り返る記事です。

## [Maintainer Month](https://maintainermonth.github.com/)

6月は[Maintainer Month](https://maintainermonth.github.com/)というイベントをGitHubが主催しています。

> Maintainer Month is a reminder for the ecosystem to support, celebrate, and compensate open source maintainers.  
> -- [Maintainer Month](https://maintainermonth.github.com/)

[Maintainer Month](https://maintainermonth.github.com/)は、オープンソースのメンテナーが集まって情報共有したり、メンテナーを祝ったり、支援したりするイベントです。
メンテナーがどういうサポートを求めているかを知る、負荷が特定の箇所に集中するエコシステムはバランスが悪いのでそれを支援する方法を知るといったことを思い出すのがMaintainer Monthの目的です。

- [Welcome to Maintainer Month! 🎉 | The GitHub Blog](https://github.blog/2022-06-01-welcome-to-maintainer-month/)

Maintainer Month関係の記事

- [Maintainer Month: オープンソースをメンテナンスするコツ | Web Scratch](https://efcl.info/2022/06/27/maintenance-open-source/)
- [Maintainer Month: epubリーダーアプリ bi-epub-readerを作った | Web Scratch](https://efcl.info/2022/06/25/bi-epub-reader/)

## textlintの誕生…の前に

2014年2月ごろに、JSer.infoで[あなたが読むべきJavaScript Promises - JSer.info](https://jser.info/post/77696682011/es6-promises)という記事を書いて、Promisesについてもっと知らないといけなさそうだなと考えました。
調べてもPromiseについてまとまったものはなかったので、ないなら書くかーと思って[JavaScript Promiseの本](https://azu.github.io/promises-book/)を書き始めました。

Promise本の最初のコミットは、2014年3月だったのでこの頃に書き始めたのだと思います。

- https://github.com/azu/promises-book/commit/883538b2a5fab5846d415fe0ef1abc1f125217dc
- 細かい書籍開発の流れはPromise本のおまけにも書かれていました
    - [promises-book/beginning-story.adoc at master · azu/promises-book](https://github.com/azu/promises-book/blob/master/Appendix-Note/beginning-story.adoc)

Promise本は最終的に100ページを越える書籍になっているのですが、書いてる途中で表記揺れなどが気になってきました。

そこで、[技術評論社](https://gihyo.jp/book)で使われている[WEB+DB PRESS用語統一ルール](https://gist.github.com/inao/f55e8232e150aee918b9)という[WZ EDITOR](https://www.wzsoft.jp/)の表記揺れを統一ための辞書が公開されていることに注目しました。

とりあえず、この辞書を使えば表記揺れが少なくなるかもと思って、[WZ EDITOR](https://www.wzsoft.jp/)用の形式だったので、辞書をJSONに変換できるパーサを書きました。

- 2014年6月: [WEB+DB PRESS用語統一ルール(WZEditor)のパーサを書いた | Web Scratch](https://efcl.info/2014/0616/res3931/)

これを使えば、日本語Lintできるんじゃないかとか言ってたので、この頃から自然言語のLintが少し思い浮かんでいたようです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">WEB+DB PRESS用語統一ルール使った大雑把な日本語Lintみたいのできた。 <a href="http://t.co/qrvjXZ2ZOp">pic.twitter.com/qrvjXZ2ZOp</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/474188405216014336?ref_src=twsrc%5Etfw">June 4, 2014</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

結局この時は辞書をパースしただけで、Promise本での表記揺れには使っていませんでした。

- [Promise本で取り組んだ電子書籍の開発ツール、CI、継続的リリースについて | Web Scratch](https://efcl.info/2015/01/06/ebook-env/)
    - > 用語統一チェックの自動化 → 結局は目視チェックのみだった

少し日にちが経って、全く別のところで[JSer.info](https://jser.info/)の記事紹介文でtypoや表記揺れが多くあることに気づきました。
これを減らそうと思って、CodeMirrorの拡張として[codemirror-spellckecker](https://github.com/azu/codemirror-spellckecker/)というものを書きました。
このスペルチェックには、先ほど登場した[WEB+DB PRESS用語統一ルール ](https://gist.github.com/inao/f55e8232e150aee918b9)をベースにした[technical-word-rules](https://github.com/azu/technical-word-rules)という独自の辞書を使っています。

- 2014年10月: [WEB+DB PRESS用語統一ルール等を使った技術用語のLintをするCodeMirrorアドオンを書いた | Web Scratch](https://efcl.info/2014/10/20/lint-tech-word/)
- [JSer.info 200 回目記念イベント](https://azu.github.io/slide/jser200/)

この[codemirror-spellckecker](https://github.com/azu/codemirror-spellckecker/)は、[CodeMirror](https://codemirror.net/)なのでブラウザ上でしか動きません。しかし、Travis CIのようなCI上でも同じ辞書を使ってチェックしたいと考えるようになってきました。

なぜなら、この少し前にJSer.infoのデータ管理もGitHubに全て移したため、紹介記事のデータも[jser/jser.info: JSer.infoデータリポジトリ](https://github.com/jser/jser.info)とへコミットされるようになり、コミットしたら辞書で表記揺れを見つけたいと思ったためです。

- [JSer.infoをTumblrからGitHub Pagesに移行しました - JSer.info](https://jser.info/2014/08/03/renewal/)


[technical-word-rules](https://github.com/azu/technical-word-rules)はただの辞書のJSONファイルです。
この辞書を使ってブラウザでも、Node.jsでも、CIでも動く汎用的な自然言語のチェックツールが欲しい！となったのが[textlint](https://textlint.github.io/)を作ろうと思ったきっかけです。

> 現在はニンゲンが介在しないとちょっとチェックの精度が良くない感じで完全に補助するツールになってます。 
> (こういうの既にプロダクトとして、プログラマブルに使えるものって存在してるのかな?)  
> https://efcl.info/2014/10/20/lint-tech-word/

[codemirror-spellckecker](https://github.com/azu/codemirror-spellckecker/)は、ただの文字列一致であったため、Markdownで書いても構文を認識する訳ではありませんでした。これによる誤検知があったので、このようなことを書いているのだと思います。

そのため、textlintを作る時には文字列一致ではなくASTをベースにして扱うことを考えていました。

## textlintを作り始める

2014年12月24日に[nono/mddiff](https://github.com/nono/mddiff)というライブラリを見つけて、このライブラリが[CommonMark](https://github.com/commonmark/commonmark.js)というパッケージを使っていることに気づきました。
[CommonMark](https://github.com/commonmark/commonmark.js)はMarkdownをパースして、内部的にASTを持っていることを発見しました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">これcommonmarkのAST使ってるんだ。CommonMarkにASTのドキュメントあるのかな? &quot;nono/mddiff&quot; <a href="https://t.co/PVdKNuDjIK">https://t.co/PVdKNuDjIK</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/547741662588317696?ref_src=twsrc%5Etfw">December 24, 2014</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

その日のうちに、[CommonMark](https://github.com/commonmark/commonmark.js)を使って日本語Lintを作るアイデアを思いつきました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/todo?src=hash&amp;ref_src=twsrc%5Etfw">#todo</a> CommonMark AST + 日本語Lint</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/547751724417425408?ref_src=twsrc%5Etfw">December 24, 2014</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

- Issue: [CommonMark AST 日本語Lint · Issue #34 · azu/azu](https://github.com/azu/azu/issues/34)

この次の日にtextlintを作り始めました。
そのため、textlintのfirst commitは2014年12月25日でした。

- https://github.com/textlint/textlint/commit/12da88c8a9a08d7587d8547c189dc6e3fc045b46

最初は、[remark](https://github.com/remarkjs/remark)ではなく[CommonMark](https://github.com/commonmark/commonmark.js)をベースにして作っていました。(そもそもこの時は[remarkはまだノードの位置](https://github.com/syntax-tree/mdast/issues/2)をASTに持ってない状態でした。そのため、CommonMark以外にはノードの位置とASTを扱えるライブラリはなかった)

そのまま一気に開発して、2014年12月30日には最初のtextlintをリリースしています。

- [JavaScriptでルールを書けるテキスト/Markdownの校正ツール textlint を作った | Web Scratch](https://efcl.info/2014/12/30/textlint/)

この時のルールは、サンプルとして書いた`no-todo`と先ほども出ていた独自辞書の[textlint-rule-spellcheck-tech-word](https://github.com/azu/textlint-rule-spellcheck-tech-word)ぐらいだったと思います。
textlintのプラグインの仕組みは[ESLint](https://eslint.org/)を参考にして書いていて、初期リリースはESLintのコードを結構そのまま持ってきて書き直してたきがします。

この辺の学びについては次のスライドにまとめてありました。

- [textlintから学んだこと](https://azu.github.io//slide/reactsushi/textlint.html)

ESLintは結構モノリシックな作りであったため、textlintはそれをベースにモジュールを意識して書き直していた気がします。
これが、その後のTypeScript移行やブラウザで動かすためにKernel分離などに役立ったと思います。

- [textlintのコアをTypeScriptで書き直した、textlintの今後について | Web Scratch](https://efcl.info/2017/11/06/textlint-core-refactoring/)

2015年はひたすらtextlintの安定化と色々なルールを書いていました。

- [今年のOSS活動振り返り @ 2015 | Web Scratch](https://efcl.info/2015/12/31/oss-in-2015/)

2016年になるともっとtextlintを開発するために、新しく本を書くことにしました。
[JavaScript Plugin Architecture](https://azu.github.io/JavaScript-Plugin-Architecture/)という書籍はtextlintの開発を進めるために書いた書籍で、ESLintを含むJavaScriptのプラグインアーキテクチャについて書いています。

- [JavaScript Plugin Architectureというプラグイン設計について学ぶ無料の電子書籍を書いた | Web Scratch](https://efcl.info/2016/06/06/javascript-plugin-architecture/)

これと同じようなことを[jsprimer](https://jsprimer.net/)というJavaScript入門書を書くときにやっていた気がします。
やっぱり、実際に大きな文章があるとツールの開発が進みます。

- [JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)

また、この頃は思いついたアイデアをひたすらtextlintのルールに落としていた気がします。

- [今年のOSS活動振り返り @ 2016 | Web Scratch](https://efcl.info/2016/12/31/oss-in-2016/)

このような形でtextlintの開発は進み、2022年では[textlintのルールは200以上](https://www.npmjs.com/search?q=textlint-rule)あります。

## textlintの今後

今年は、去年末に書いていたRFCやNode.js ECMAScript Modules対応など結構大きな変更が必要になりそうです。

- [RFC: textlint new message format · Discussion #833 · textlint/textlint](https://github.com/textlint/textlint/discussions/833)
- [Supports rules that are ECMAScript Modules · Issue #868 · textlint/textlint](https://github.com/textlint/textlint/issues/868)

既にRFCの一つである[RFC: Improve error location #835 ](https://github.com/textlint/textlint/issues/835)は実装していてリリースされています。
この変更は、今までtextlintのエラー位置は"点"でしたが、エラーの"範囲"を報告できるようになるという変更です。(ルール側も`padding`の対応が必要です。)

- [Release v12.2.0 · textlint/textlint](https://github.com/textlint/textlint/releases/tag/v12.2.0)

この変更は[@textlint/editor](https://github.com/textlint/editor)を作っていて、エラー位置をエディタ上で正確に出すには、点だけでは不十分となっているためです。
[RFC: textlint new message format · Discussion #833 · textlint/textlint](https://github.com/textlint/textlint/discussions/833)には他にもProposalがあって、ローカライズするために使えそうなMessageIdの仕組み、エラーとドキュメントを紐づける仕組み、エラーではなくサジェストの仕組みなどがあります。

この辺はやっぱりユースケースがあることで進むので、ユースケースを持ってる人は意見をください。

また、[@textlint/editor](https://github.com/textlint/editor)で、`.textlintrc`のロード周りの処理を再実装したりしてるので、これをtextlint本体に持ってきて[今のよくないConfig.tsを全部書き直す](https://github.com/textlint/textlint/blob/17ab0d46b9f89499428dd49f631f222870022107/packages/textlint/src/config/config.ts)などやりたいことは色々あります。(手が足りないので、興味ある人は手をあげてください)

- <https://github.com/textlint/editor/tree/master/packages/%40textlint/config-loader>

また、ESM対応はとりあえずルールをESMで書いて読み込めるようにするため、ルールのロードを`import()`でやるような変更を入れるつもりです。
ただし、`default export`をBabelで変換したようなCJSを`import()`で読み込むとほんとひどいことになるので、どうにかしないといけません。(`.default.default`という危ないプロパティを参照しないといけない…)
全部named exportにするのが一番いいのですが、既存のルールとの互換性があって大変です。

- [🛡🔑 Secretlint 4.0.0: ESMで書かれたルールのサポート、secretlint-disableコメントのサポート | Web Scratch](https://efcl.info/2021/09/15/secretlint-4.0.0/)

また、ルールのオプションのスキーマを書けるようにするという長年のIssueもどうにかしたいです。
BabelでTSからスキーマを生成するか、ESLintの`meta`のように手書きでJSON Schemaを書くかという部分で止まっています。
これも、textlintのルールからオプションをGUIで設定するなどの利用方法がありますが、やっぱりユースケースがある人を中心に進めるのが良いです。

- [Rule's Options Schema · Issue #700 · textlint/textlint](https://github.com/textlint/textlint/issues/700)

[textlint](https://textlint.github.io/)は、日本語が多いですが、英語や中国語などでも使われています。

- Translation: [Angular](https://github.com/angular/angular-ja)、[React](https://github.com/reactjs/ja.reactjs.org)、[Vue](https://github.com/vuejs/jp.vuejs.org)、[Nuxt.js](https://github.com/vuejs-jp/ja.docs.nuxtjs), [Next.js](https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs)、[Gatsby](https://github.com/gatsbyjs/gatsby-ja)
- Book: [JavaScript Primer](https://github.com/asciidwango/js-primer)、[SurviveJS - Webpack](https://github.com/survivejs/webpack-book)
- Documentaion: [VuePress](https://github.com/vuejs/vuepress)、[Cypress](https://github.com/cypress-io/cypress-documentation)、[Microsoft Azure Identity(ja)](https://github.com/jpazureid/blog)、[OWASP Cheat Sheet Series](https://github.com/OWASP/CheatSheetSeries)
- 小説: [「Visual Studio Code」で執筆するSF作家　藤井太洋氏が作る物書きのための拡張機能](https://logmi.jp/tech/articles/325715)
- Company: [弁護士ドットコム](https://www.bengo4.com/)、[ソラコム](https://soracom.jp/)、[ヴェルク](https://www.velc.co.jp/)、[SmartHR](https://smarthr.jp/)、[Retty](https://retty.me/)
    - [textlintを使っている企業の事例・ルールをまとめてみた](https://zenn.dev/kgsi/articles/a88273d293abe07c5acb)

[textlint](https://textlint.github.io/)は文章向けに作り始めたものではありますが、最近はプロダクトの表記揺れとかに使っているケースも増えているようです。

- [textlintによる表記ゆれ撲滅 - Sansan Builders Blog](https://buildersbox.corp-sansan.com/entry/2022/04/18/110000)
- [textlintを導入してみて / Usage status and effects of the textlint - Speaker Deck](https://speakerdeck.com/kuny/usage-status-and-effects-of-the-textlint)
- [Angularを採用したプロダクトで表記ゆれを撲滅したはなし - Speaker Deck](https://speakerdeck.com/rettar5/angularwocai-yong-sitapurodakutodebiao-ji-yurewopu-mie-sitahanasi)
- [プロダクト周りの文章校正をSlack botで半自動化してみた話｜Shellme｜note](https://note.com/shellme/n/nbfef26660270)
- [boardのカスタマーサポート返信時にtextlintでチェックする - ヴェルク - IT起業の記録](https://tamukai.blog.velc.jp/entry/2021/07/27/114510)

いつの間にかGitHubの[github/super-linter](https://github.com/github/super-linter)にも含まれていました。
これが、[Thank you to our maintainers | The GitHub Blog](https://github.blog/2022-06-24-thank-you-to-our-maintainers/)に選ばれた理由なのかはよくわかっていません。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">自分もMaintainer MonthでGitHub Sponsorsの対象だった。<a href="https://t.co/gOU8eE79ta">https://t.co/gOU8eE79ta</a><br><br>Thanks to <a href="https://twitter.com/github?ref_src=twsrc%5Etfw">@github</a>, Sponsors, and Maintainers 🎉 <a href="https://t.co/EDqEbB2Hkq">pic.twitter.com/EDqEbB2Hkq</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1540496237647917057?ref_src=twsrc%5Etfw">June 25, 2022</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

まだやりたいことは色々ありますが、やっぱり物事を進めるのはユースケースなので、ユースケースを持ってる人は積極的に意見ください。
[Twitter](https://twitter.com/azu_re)や `#textlint` のようなハッシュタグでもいいし、Issueにコメントしたりでもいいし、[Gitter](https://gitter.im/textlint-ja/textlint-ja)は日本語でも話せます。

支援の方法は色々あるので、[textlint](https://textlint.github.io/)はいつでもContributionを募集しています。

> オープンソースにContributeする方法として、バグ報告/修正、機能追加、ドキュメントを書く、IssueやDiscussionのトリアージ、デザイン、マーケティングなど色々な関わり方があります。 その関わり方の一つとして、金銭的な支援をするという選択肢は、Contributorが選べるようになっているのが望ましいと思っています。  
> [GitHub Sponsorsの募集を始めてから2年が経ったので振り返る | Web Scratch](https://efcl.info/2021/10/01/github-sponsors/)

GitHub Sponsorsでの支援は次のページからできます。GitHub Sponsorsは個人だけではなく会社単位でもできるようになっています。

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)
