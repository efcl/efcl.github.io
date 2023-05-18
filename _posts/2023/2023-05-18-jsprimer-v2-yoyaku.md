---
title: "JavaScript Primer 改訂2版の予約が開始されました"
author: azu
layout: post
date : 2023-05-18T09:16
category: JavaScript
tags:
    - JavaScript
    - Book

---

<https://jsprimer.net/> で公開している「[JavaScript Primer(jsprimer)](https://jsprimer.net/)」の改訂2版の予約が開始されました。
jsprimer 改訂2版の発売日は2023年6月9日の予定です。

- KADOKAWA: [「JavaScript Primer 改訂2版 迷わないための入門書」azu [ＰＣ・理工科学書] - KADOKAWA](https://www.kadokawa.co.jp/product/302303004295/)
- Amazon: [JavaScript Primer 改訂2版 迷わないための入門書 | azu, Suguru Inatomi |本 | 通販 | Amazon](https://www.amazon.co.jp/dp/4048931105/)
- 楽天: [楽天ブックス: JavaScript Primer 改訂2版 迷わないための入門書 - azu - 9784048931106 : 本](https://books.rakuten.co.jp/rb/17509001/?scid=af_pc_etc&sc2id=af_104_0_10001813)
- ヨドバシ: [ヨドバシ.com - JavaScript Primer 改訂2版 迷わないための入門書 [単行本] 通販【全品無料配達】](https://www.yodobashi.com/product/100000009003715263/)

jsprimerの初版は2020年4月に出版されたので、3年ぶりの改訂となります。

- [JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)

jsprimerは<https://jsprimer.net/>のウェブ上でも公開していて、ウェブ版は常に更新されているLiving Bookとして公開しています。
一方で、書籍版はその時点のウェブ版をベースにしたスナップショットになっていて、出版に合わせて校正、書籍に向けたレイアウト変更、索引の追加などを行なっています。

簡単にまとめると、ウェブ版は常に最新ですが読んでる途中でも内容が更新される可能性はあります。一方で、書籍はその時点のスナップショットとして色々チェックやレイアウト改善をして安定させたバージョンになります。まとめて読むなら書籍版の方がおすすめです！
詳しくは[ウェブ版と書籍版の違い](https://jsprimer.net/intro/#diff-with-print-version)を参照してください。

## 改訂2版の変更点

2020年4月から2023年5月ぐらいまでの変更内容が含まれています。
JavaScriptの仕様であるECMAScript([ECMA-262](https://github.com/tc39/ecma262))も常に更新されるLiving Standardですが、毎年6月ごろにスナップショットとして`ECMAScript 20XX`をリリースしています。
そのため、jsprimer 改訂2版では、初版からの変更としてECMAScript 2020、2021、2022の内容が含まれています。

リリースノートにECMAScriptのバージョンに合わせた変更点をまとめてあるので、これも参照してみてください

- [Release v2.0.0: ECMAScript 2020対応 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/releases/tag/v2.0.0)
- [Release v3.0.0: ECMAScript 2021対応 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/releases/tag/v3.0.0)
- [Release v4.0.0: ECMAScript 2022対応 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/releases/tag/v4.0.0)

ECMAScriptの変更への対応だけではなく、読みやすくするための変更や、JavaScriptの現状に合わせた変更も含まれています。
まとめると次のような変更がjsprimer 改訂2版に含まれています。

- ECMAScriptの新しいバージョンであるES2020、ES2021、ES2022に対応した
- 新しいECMAScriptの機能によって、使う必要がなくなった機能は非推奨へと変更した
- 文字では想像しにくいビット演算、非同期処理などに図を追加した
- PromiseとAsync Functionを非同期の処理の中心として書き直した
- 一方で、エラーファーストコールバックは非同期処理としてはメインではなくなった
- `Array#includes`という表記は、Private Classs Fields(`#field`)と記号が被るため廃止した
- Node.jsでもECMAScript Modulesを使うようになり、CommonJSはメインではなくなった
- Node.jsが12から18までアップデートし、npmは6から9までアップデート、各種ライブラリも最新にアップデート
- 読者からのフィードバックを受けて、全体をより分かりやすく読みやすくなるように書き直した

[jsprimerのウェブ版はオープンソース](https://github.com/asciidwango/js-primer)として公開してる書籍なので、実際のDiffはGitHubでも確認できます。

- Diff: [Comparing 1.0.0...v4.0.0-publish · asciidwango/js-primer](https://github.com/asciidwango/js-primer/compare/1.0.0...v4.0.0-publish)

コミット数的には468(squashしてるの実際は数倍な気がします)、ファイル数的には342、28 contributorsとなっています。

ほとんどの章に変更が入っているのですが、大きなところだと次のような変更があります。

- [非同期処理:Promise/Async Function · JavaScript Primer #jsprimer](https://jsprimer.net/basic/async/)
  - エラーファーストコールバックからPromiseとAsync Functionをメインに書き直した
- [Node.jsでCLIアプリ · JavaScript Primer #jsprimer](https://jsprimer.net/use-case/nodecli/)
  - CommonJSからECMAScript Moduleベースに書き直した
  - `node:fs/promises` などの`node:` prefixなコアモジュールを利用するように書き直した
- [Todoアプリ · JavaScript Primer #jsprimer](https://jsprimer.net/use-case/todoapp/)
  - [クラス](https://jsprimer.net/basic/class/)でパブリック/プライベートフィールドが増えたので、コードベースを変更

また改訂2版では、次の方々にレビューをしていただきました。ありがとうございました。

- haruguchi（池奥 悠馬）
- 2nofa11（ツノ）
- staticWagomU（林 永遠）
- kakts（阿久津 恵太）
- keisuke kudo（工藤佳祐）
- r-shirasu
- 藤野慎也（morinokami）
- kobakazu0429（小畠 一泰）
- 滝谷修


## jsprimer 改訂2版が予約できます

2020年から3年分の変更が含まれた「[JavaScript Primer(jsprimer)](https://jsprimer.net/)」の改訂2版の予約はもうできます！
jsprimer 改訂2版の発売日は2023年6月9日の予定です。

- KADOKAWA: [「JavaScript Primer 改訂2版 迷わないための入門書」azu [ＰＣ・理工科学書] - KADOKAWA](https://www.kadokawa.co.jp/product/302303004295/)
- Amazon: [JavaScript Primer 改訂2版 迷わないための入門書 | azu, Suguru Inatomi |本 | 通販 | Amazon](https://www.amazon.co.jp/dp/4048931105/)

jsprimerは更新をし続けて、そのスナップショットとして書籍を出すというスタイルを取っています。
そのため、書籍を購入してくれると、jsprimerの更新が継続しやすくなります！

> なぜOSSなのか？なぜ無料で読めるのか？  
> [JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)

予約できるのは物理的な書籍のみですが、Kindle(epub)やPDFも発売予定です。
電子版の公開や実際に発売が開始された時に通知を受け取りたい方は、次のフォームからメールアドレスを登録してください。

<!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/classic-071822.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; padding: 4px; max-width:600px;}
	/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
    <form action="https://jsprimer.us13.list-manage.com/subscribe/post?u=fc41e11a2b9dc6f05350e0de0&amp;id=7ab1594ae8&amp;f_id=00f796e2f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
        <h2>JavaScript Primerの更新情報を購読</h2>
        <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
<div class="mc-field-group">
	<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
</label>
	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
	<span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
</div>
	<div id="mce-responses" class="clear foot">
		<div class="response" id="mce-error-response" style="display:none"></div>
		<div class="response" id="mce-success-response" style="display:none"></div>
	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_fc41e11a2b9dc6f05350e0de0_7ab1594ae8" tabindex="-1" value=""></div>
        <div class="optionalParent">
            <div class="clear foot">
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                <p class="brandingLogo"><a href="http://eepurl.com/h44CST" title="Mailchimp - email marketing made easy and fun"><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"></a></p>
            </div>
        </div>
    </div>
</form>
</div>
<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
<!--End mc_embed_signup-->

フォームが表示されない人は <https://github.us13.list-manage.com/subscribe/post?u=fc41e11a2b9dc6f05350e0de0&id=7ab1594ae8> から登録できます。

また、法人などで大量(数十冊?)に注文したい場合は、割引などができる可能性があるので、<info@jsprimer.net> までご連絡ください。

## jsprimerの更新を支援する方法

文章の間違いや問題などがあったらIssueやPull Requestで直接修正できます。

- [文章の間違いに気づいたら · JavaScript Primer #jsprimer](https://jsprimer.net/intro/feedback/)

現在、ECMAScript 2023の仕様の対応を進めていて、いくつか対応しないといけないところがあります。
大体はProposalごと(仕様策定の流れは[ECMAScript · JavaScript Primer #jsprimer](https://jsprimer.net/basic/ecmascript/)を参照してください)に進めていくので、気になる方はIssueにコメントしてください。
ちょっとした変更するだけのIssueもあるので、やりたい人はコメントしてください。

- [ECMAScript 2023の対応 · Issue #1658 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1658)
  - [ES2023: proposal-array-find-from-last · Issue #1665 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1665)
  - [ES2023: Change Array by copy · Issue #1667 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1667)
  - [ES2023: Symbol as a Key · Issue #1666 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1666)

ES2023の変更のレビューをしたいという方は、コメントやReactionなどをしておいてもらえると、PR出す時にmentionとかできます。

金銭的に支援したい方は、書籍を買ったり、GitHub Sponsorsで著者を支援してもらえると嬉しいです。

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)
- [Sponsor @lacolaco on GitHub Sponsors](https://github.com/sponsors/lacolaco)

また、[今年のオープンソース活動振り返り @ 2022 | Web Scratch](https://efcl.info/2022/12/31/open-source-in-2022/)でちょこっと書いていましたが、[Open Collective](https://opencollective.com/)を使ってjsprimer自体を支援できる仕組みを考えています。

[Open Collective](https://opencollective.com/)ならプロジェクト(コレクティブ)単位で作れて、そのプロジェクトのContributorに対して分配ができます。
書籍は誰が書いてもいいので、jsprimerを書いてる人へ分配できる仕組みができて、jsprimerの更新を支援できるようになるといいなーと思ってます。
Open Collectiveのコレクティブを作ってる人があんまりいなくて、参考になるものがあまりなくちょっと時間がかかっていますが、この辺詳しい人とかいたら教えてください！

## まとめ

- JavaScript Primer 改訂2版が2023年6月9日に発売されるので、予約できます！
- ES2020,2021, 2022の3年分の変更が含まれた改訂になっています！
- 今後は6月後半にリリースされるES2023の対応などをやっていきます
- 更新を支援する方法は本を買う他、IssueやPR、Sponsorsなどがあります
