---
title: "ECMAScript, TC39 Meeting Notesの読み方と修正方法"
author: azu
layout: post
date : 2016-02-12T11:12
category: JavaScript
tags:
    - ECMAScript
    - JavaScript
    - GitHub

---

ECMAScriptは毎年リリースの方針となったため、最新の仕様を管理している[tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")には毎日のようにコミットされています。

ECMAScriptのリリース方針についてなどは以下を参照してください。

- [ECMAScriptの仕様策定に関するカンニングペーパー | Web Scratch](http://efcl.info/2015/10/18/ecmascript-paper/ "ECMAScriptの仕様策定に関するカンニングペーパー | Web Scratch")

これらの最新の変更が反映されたLiving Standardなものは以下のURLで公開されています。

- [tc39.github.io/ecma262/](https://tc39.github.io/ecma262/)

また、Proposalを元にECMAScript 2016に[入る機能は既に決まっています](http://jser.info/2016/02/01/es2016/)。
何か新しく入るのかは以下の記事を見てみてください。

- [ECMAScript 2016 features & changes - JSer.info](http://jser.info/2016/02/01/es2016/#%E5%A4%89%E6%9B%B4%E3%82%92%E7%9F%A5%E3%82%8B%E6%96%B9%E6%B3%95 "ECMAScript 2016 features &amp; changes - JSer.info")

"どこで"決まっているのかというと2ヶ月に1回行われているTC39のミーティングです。(物理的に集合してF2Fでやる)

- [ECMA-262/402 2016 End-Game](https://github.com/tc39/tc39-notes/blob/master/es7/2016-01/2016-01-27.md#ecma-262402-2016-end-game "ECMA-262/402 2016 End-Game")
	- 具体的にES2016は、ここで今回のミーティングでStage 4となったものがそうだと決まった

小さな修正などは直接GitHubで議論して終わることがありますが、TC39としての意志が求められる新しい機能の追加や互換性のない修正などはTC39のミーティングを通して判断されます。

- ProposalのStageをあげるあげない
- ProposalをStage 0として追加するかどうか
- 後方互換性のない変更を加えるか
- 現実との互換性のためにAnnex Bへ仕様を追加するか

などはここで議論された結果が仕様へ反映されます。
(大体はGitHub Issueで議論後、Pull Requestを出した状態で実際のミーティングに持ち込まれてる)

そのため、仕様/Proposalへどういう変更をどういう理由で加えるかというのはこのミーティングノートを見れば大体分かります。

- [tc39/tc39-notes](https://github.com/tc39/tc39-notes "tc39/tc39-notes: These are the notes I take at TC39 Meetings, with Markdown formatting")
	- [rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")が元リポジトリ
- [Pull Requests · tc39/ecma262](https://github.com/tc39/ecma262/pulls?q=is%3Apr+is%3Aclosed "Pull Requests · tc39/ecma262")
	- あわせてPull Requestを見るのが早い

ミーティングノートは3日分がワンセットなのでちょっと多いですが、数時間あれば読める感じです。
ちゃんとテーマごとに議論の区切りと結論が書いてあるので、気になるものだけみるならすぐ読めると思います。

例えば先ほどの[ECMA-262/402 2016 End-Game](https://github.com/tc39/tc39-notes/blob/master/es7/2016-01/2016-01-27.md#ecma-262402-2016-end-game "ECMA-262/402 2016 End-Game")なら、以下のように終わりに"Conclusion/Resolution"がわかりやすく書いてあります。

```
ECMA-262/402 2016 End-Game  
  
AWB: slide (Key dates)  
BT: the way I want to do this, at the march meeting I want us to approve what is in master, or a snapshot. I don't want to make minor tech or editorial changes. I will make fixes if major issues exist, but otherwise I wish we can leave it as is. Leaving it as a tag  
...  
Conclusion/Resolution
   30 days before the next meeting, the final draft will be provided
   next meeting we will vote to make it ES2016
   start the out-patent review process, you may need to alert your organizations
```

自分は[#TC39MTG](https://twitter.com/search?f=realtime&q=%20%23TC39MTG "#TC39MTG")というハッシュタグをつけて読んでいます。

- [TC39 MTG Notes MTG | Doorkeeper](https://tc39-mtg.doorkeeper.jp/ "TC39 MTG Notes MTG | Doorkeeper")

## TC39ミーティングノートの修正方法

ここでやっと本題ですが、ミーティングノートを読んでいると結構な頻度でtypoなどの間違いやリンク切れ、Markdownの構文ミスなどが見つかると思います。

間違いを見つけた時は[rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")に普通にPull Requestで修正を送りましょうという話です。

特に[今回はtypoの数が多かった](https://github.com/rwaldron/tc39-notes/pull/41)ので、積極的に修正を送ると他の読む人が幸せになれます。

![contributing](http://efcl.info/wp-content/uploads/2016/02/12-1455276798.png)

typoを直すためにかなりの数コミットしたので跳ねてる…(まだtypoは残ってるのがあると思います…)

### 具体的な修正の送り方

やり方も何もないですが、Markdownファイルを修正して以下のリポジトリにPull Requestを送るだけです。

- [rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")

注意点としてはこのミーティングノートを管理している[@rwaldron](https://github.com/rwaldron "rwaldron")さんは、結構Pull Requestを見逃すことがあるのでmentionを本文に入れておいたほうが確実です。

```
/cc @rwaldron
```

また、数日反応がなかったら`ping @rwaldron`などとするのがいい気がしています。

修正はまとめて一つのPull Requestで送ることが多いです。

### 修正箇所の見つけ方

結構、普通に見ていれば崩れている場所が見つかると思います。

- MarkdownのCodeBlockが壊れてる
- インデントが揃ってない
- `----` が余計にある
- `-` だけが残ってる
- リンク切れ
- typo

リアルタイムに文字起こしてるようなきがするので、スペルチェッカーを通すだけでも結構なtypoが見つかります。
(自分は英語に自信がないので、確実に間違ってるものだけ修正しています。もっと英語表現に詳しい方も修正送って欲しい…)

## おわりに

ECMAScriptの新しいProposalを知りたいという場合は、適当なブログを見るよりもProposalを書いてる人たちの意見が見られるミーティングノートを見るのが確実です。

ちょっと長いですが、一次情報を見ればモチベーションなどもわかるし、なんとなく見てても面白いのでおすすめです。(Conclusionだけ見ても色々分かります)

少なくてもBabelで`Stage X preset`を使ってる人は一度見るといいかと思います。(ミーティノートにも度々Babelの話はでてきます)

Angular 2を使ってる人も[Stage 1のDecorators](https://github.com/wycats/javascript-decorators)の上に[Stage 0のDecorators関連Proposal](http://ecmascript-daily.github.io/2016/01/28/stage0-descorator-related)があることなどを知るために見ておくべきです。

> 情報の伝達が早い順で並べるとTwitter > GitHub > その他という感じです。  
> -- [ECMAScript 2016 features & changes - JSer.info](http://jser.info/2016/02/01/es2016/#%E5%A4%89%E6%9B%B4%E3%82%92%E7%9F%A5%E3%82%8B%E6%96%B9%E6%B3%95 "ECMAScript 2016 features &amp; changes - JSer.info")

こうしてミーティングノートや[tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262: Status, process, and documents for ECMA262")を見て集めた"その他"の情報を、適当なブログである[ECMAScript Daily](http://ecmascript-daily.github.io/ "ECMAScript Daily")に更新しています。

<a href="https://twitter.com/ecmascriptdaily" class="twitter-follow-button" data-show-count="false" data-size="large">Follow @ecmascriptdaily</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

[ECMAScript Daily](http://ecmascript-daily.github.io/ "ECMAScript Daily")はPull Requestで誰でも記事を追加できるので興味がある人は[Contributing Guideline](https://github.com/ecmascript-daily/ecmascript-daily.github.com/blob/master/CONTRIBUTING.md "Contributing Guideline")を見てください！
