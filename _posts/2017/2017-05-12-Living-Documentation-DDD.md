---
title: "Living Documentation by design, with Domain-Driven Designを読んだ"
author: azu
layout: post
date : 2017-05-12T09:55
category: 雑記
tags:
    - book
    - DDD

---

[Living Documentation by design, with Domain-Driven Design by Cyrille Martraire [PDF/iPad/Kindle]](https://leanpub.com/livingdocumentation "Living Documentation by… by Cyrille Martraire [PDF/iPad/Kindle]")という電子書籍を読んだ。

leanpubで$0から購入できて、任意の値段で購入できるドキュメンテーションとDDDについての書籍。

追記: 書籍版 [Amazon.co.jp: Living Documentation: Continuous Knowledge Sharing by Design (English Edition) 電子書籍: Martraire, Cyrille: 洋書](https://www.amazon.co.jp/dp/B07S7671FW/)

ドキュメンテーションもソフトウェア開発のように設計やテストといったパターンやアプローチがあります。
これは以前書いた技術文書をソフトウェア開発する話と似ているところがあります。

- [Introduction | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/ "Introduction | 技術文書をソフトウェア開発する話")

ドキュメントに書かれる知識としてGenericなものとSpecificなものがあります。
ドキュメントもソフトウェアと同じように更新され続けるべきですが、
会社やチーム、プロダクトにおけるSpecificな知識には次のような問題が生まれやすいです。

- アクセスできない
- 古すぎる
- フラグメント化してる
- 暗黙的になってる
- 理解できない
- 書かれてない

要はドキュメントはコストがかかるので、更新されなくなって管理されなくなる。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">知識は会話から生まれ、知識がstableとなるには時間がかかる。<br>これは、その知識を記述したドキュメントにはメンテナンスコストが掛かることを示唆してる。<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/840907540586102785">March 12, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

一番良いドキュメントはNo Documentationであることではあるが、これらのドキュメントをどうやって更新され続けるようにするかという戦略、パターン、仕組みなどについて書かれている書籍です。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a> 良いドキュメンテーションのアプローチは設計が関わる。<br>急速に変化するプロジェクトに対するドキュメンテーションには設計的なアプローチが必要になる <a href="https://t.co/EPBf6yldDs">pic.twitter.com/EPBf6yldDs</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/840915700575215616">March 12, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## LivingDocumentationのコア原則

- Reliable
	- 信頼性の高いドキュメントを作る2つの方法
	- single source of truth
		- ソースは一つにする
	- reconciliation mechanism
		- ソースが複数の場所にあることを認め、それをテストする
		- Specifiction by Example
- Low-Effort
- Collaborative
	- Conversations over Documentations
	- ペアプロは強い
	- アクセスできる場所に知識は置く
- Insightful
	- 意図を残す


## メモ

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">憶測をドキュメント化しない<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a> では逐次的にドキュメントを作っていく。<br>そのため実際のニーズに基づくドキュメンテーションを行う。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/840944746684067841">March 12, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">多すぎる情報は、情報が全くないのと同じぐらい役に立たない。<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/840946011761647616">March 12, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">実装のドキュメントはよく変わるため別のアプローチを用意すべき。<br>戦略のドキュメントは複数のプロジェクト間で共有できるStableなドキュメントすべき。<br>そのためにプロジェクト特有の細部、変更されやすい所は戦略のドキュメントからは省略する。<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/842031191368769537">March 15, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

この辺は読んでいて、[関数型プログラミングの基礎](https://www.amazon.co.jp/dp/B01MQG41Y0/ "関数型プログラミングの基礎")も最近読んだのもあって、ドキュメントとプログラミングの次のような対比が浮かんだ。

戦略というドキュメンテーションは、複数のプロジェクトで共有して参照できるStableなものであるべきで、逆にプロジェクト特有のものは変更の可能性が高いので、戦略からの参照はしない。

- OK: Unstable -> Stable
- NG: Stable -> Unstable

プログラミングにおいて、副作用を持つ部分と副作用を持たない部分をきちんと分離する。
副作用のあるものから純粋なものを参照するが、逆はしない(純粋なものが副作用を持って本末転倒)

- OK: 副作用を持つ関数 -> 純粋な関数
- NG: 純粋な関数 -> 副作用を持つ関数


<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">URLはKnowledge Networkの一部である。<br>URLでリンクすることは知識を伝達するの有用。<br>壊れたリンクを回避するためのメカニズムも必要。<br>参照をするときは、揮発性の高いもの -&gt; 安定したものとなるようにリンクをする。<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/842035348204994560">March 15, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

これ読んでいて一番面白かった話。
よくよく考えると当たり前だけど、文章からソースコードへリンクを貼るとすぐ壊れてしまうので、ソースコードから文章へリンクを貼ったほうが安定するという話。

ソースコードへリンクする際に間接的な方法があるという話も何か面白かった。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a> ファイルへ直接リンクするんじゃなくて、検索キーワードへ間接的にリンクするという話。 <a href="https://t.co/Vo4P3Q0xBi">pic.twitter.com/Vo4P3Q0xBi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/842036645029322753">March 15, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a> ドメイン学び方<br>- 調査結果を壁にはりつけるようにまとめる<br>- チームについてトレーニングを受ける<br>- 他の開発者がやってることを半日ぐらい観察する Live-my-Life Sessions<br>- そのプロダクトのユーザーの行動を見てみる</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/843813350660173824">March 20, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a><br>これのペアプロ、クロスプログラミング、モブプログラミングのような形は、継続的なドキュメンテーションに役立つ。<br>ならならFace to Faceでインタラクティブに進む得ることで、お互いの知識を共有でき、<br>疑問点をすぐに質問することができる</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/843818057076097024">March 20, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a> Working collectivelyはトラック係数(Truck Factor)の改善にも役立つ。<br><br>単一障害点を避け、情報の集中度を分散できる。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/843818978225012736">March 20, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">小さなTruck Factorはそのプロジェクトのヒーローであり、<br>他のチームメイトと共有されていない多くの知識があることを意味している。<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/843819605499895808">March 20, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

ドメイン知識の共有の仕方と単一障害点の話。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a><br>現実的な例の話として、<br>コードスタイルのLintツールとLint結果の参考文献としてのガイドラインのドキュメントがベストな関係。<br>ユーザーは必要となるまでそのドキュメントを読まずにすみ、必要なタイミングはLintツールが教えてくれる。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/843829013319639040">March 20, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

これは読んでいてESLintとかのドキュメントを思い浮かべた。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ガイドラインの&quot;強制&quot;と&quot;推奨&quot;どっちをとるか。<br>新しく追加されたコードに対しては強制的にエラーとし、<br>既存のコードベースは、そのガイドラインを違反していることが多いため、警告に留める。<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/843829944270516225">March 20, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a> ガイドラインを決めたとしても、そのルールは既存のLintツールではカバーできないことがある。<br>このときに、コード自体を文書化することでできるかもという話。 annotationある言語は便利だなー <a href="https://t.co/6DHksjYiGl">pic.twitter.com/6DHksjYiGl</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/843832241063047168">March 20, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

ガイドラインに向かって少しづつに移行する方法

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">例外はあるが、トラブルシューティングはShameful Documentationの一種とも言える。<br>そこに書かれているものは、つまり解決されていない問題で修正されていないことを意味してる。<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/843834095599673344">March 20, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">問題を解決するためにトラブルシューティングのようなドキュメントを追加するよりも、その問題を直すために時間を使うべきであるという話<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/843834201291931650">March 20, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

なんでもかんでもトラブルシューティングに逃げてはいけないという話。

**ADR(Architecture Decision Records)**

重要なアーキテクチャの意思決定のプロセスを記録するフォーマットであるADRというやつがあるのを読んでて初めて知った。

- [Blog | Documenting Architecture Decisions | Relevance](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions "Blog | Documenting Architecture Decisions | Relevance")
- [アーキテクチャの意思決定を記録する Lightweight Architecture Decision Records について - Tbpgr Blog](http://tbpgr.hatenablog.com/entry/2017/02/22/080000 "アーキテクチャの意思決定を記録する Lightweight Architecture Decision Records について - Tbpgr Blog")

[ECMA, TC39 Meeting Notes](https://github.com/rwaldron/tc39-notes "ECMA, TC39 Meeting Notes")とかもこれと似たようなフォーマットになっていて、自分がミーティングノートを書いたときも真似ていたので面白かった。

- [js-primer/meetings at master · asciidwango/js-primer](https://github.com/asciidwango/js-primer/tree/master/meetings "js-primer/meetings at master · asciidwango/js-primer")



<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">実際の問題の小さな模型でシミュレートする。<br>頭で理解できる(複雑さの)サイズにし、シミュレートすることで、<br>後の議論において具体的に参照できるコードが作れる。<br>これがコミュニケーションツールとして役に立つ<a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a> <a href="https://t.co/GvFG2hZGKy">pic.twitter.com/GvFG2hZGKy</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/861242247991271424">May 7, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/LivingDocumentation?src=hash">#LivingDocumentation</a> を取り入れるときは、セオリーの話をするんじゃなくて、シンプルな話として始める <a href="https://t.co/sG523au8O9">pic.twitter.com/sG523au8O9</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/861243980570177539">May 7, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

実践する時のやり方。

----

[Living Documentation by design, with Domain-Driven Design by Cyrille Martraire [PDF/iPad/Kindle]](https://leanpub.com/livingdocumentation "Living Documentation by… by Cyrille Martraire [PDF/iPad/Kindle]") 400-500ページぐらいあって長かったけど読んでいて面白い話が多かったので良かった。
感覚的なものが結構文章化されてので面白い。

一応DDDの本ではあるので、DDDについては簡単に知っておくと読みやすいかも(コード的な話はあんまりないので、概念だけでもよさそう)

- [わかる！ドメイン駆動設計 ～もちこちゃんの大冒険～【C91新刊】 - TechBooster - BOOTH](https://booth.pm/ja/items/392260 "わかる！ドメイン駆動設計 ～もちこちゃんの大冒険～【C91新刊】 - TechBooster - BOOTH")

あたりを見ておけば大体概念としての事前知識は大丈夫そうな気がする。
後は、IA(情報設計)的なことが好きな人は読むといいのかもしれない。

- [今日からはじめる情報設計 -センスメイキングするための7ステップ | アビー・コバート, 長谷川敦士, 安藤 幸央 |本 | 通販 | Amazon](https://www.amazon.co.jp/dp/4802510012/ "今日からはじめる情報設計 -センスメイキングするための7ステップ | アビー・コバート, 長谷川敦士, 安藤 幸央 |本 | 通販 | Amazon")
- [アーキテクチャをめぐるたび | Web Scratch](https://efcl.info/2016/09/30/architecture-refs/ "アーキテクチャをめぐるたび | Web Scratch")

実際のコードからドキュメントを同期するアプローチはアノテーション前提がちょっと強いので簡単には実践できない気はするけど、話として読むといいかなーと思った。
