---
title: "Clean ArchitectureとBuilding Evolutionary Architecturesを読んだ"
author: azu
layout: post
date : 2017-10-09T23:27
category: 雑記
tags:
    - Architecture
    - book

---

[Clean Architecture](http://www.informit.com/store/clean-architecture-a-craftsmans-guide-to-software-structure-9780134494319 "Clean Architecture: A Craftsman&#39;s Guide to Software Structure and Design | InformIT")という本と[Building Evolutionary Architectures](https://www.amazon.com/dp/1491986360/ "Building Evolutionary Architectures: Support Constant Change: Neal Ford, Rebecca Parsons, Patrick Kua: 9781491986363: Amazon.com: Books")という本を最近読んだのでざっくりとしたメモ。（両方共2-3時間ぐらいでざっくりとしか読んでないので、解釈間違いは普通にありそうです）

両方共アーキテクチャに対するメタ的な視点な部分があるので、合わせて読むと面白いかも。

## Clean Architecture

Clean Architecture(Clean Codeの人のシリーズ)という本を読んだ。

- [Clean Architecture: A Craftsman's Guide to Software Structure and Design | InformIT](http://www.informit.com/store/clean-architecture-a-craftsmans-guide-to-software-structure-9780134494319 "Clean Architecture: A Craftsman&#39;s Guide to Software Structure and Design | InformIT")
	- PDFとかEpubとかMobiが買える

[Robert C. Martin](https://www.amazon.com/Robert-C.-Martin/e/B000APG87E/ref=dp_byline_cont_book_1 "Robert C. Martin")の`Clean *`シリーズでいわゆる[クリーンアーキテクチャ](http://blog.tai2.net/the_clean_architecture.html "クリーンアーキテクチャ")そのものだけを扱ったという内容ではない。

でもクリーンアーキテクチャについて紹介してる章もある。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/CleanArchitecture?src=hash&amp;ref_src=twsrc%5Etfw">#CleanArchitecture</a> Clean ArchitectureがClean Architectureについて書いてる章があった… <a href="https://t.co/75EB3FW4U3">pic.twitter.com/75EB3FW4U3</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/912128410343768064?ref_src=twsrc%5Etfw">September 25, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


アーキテクチャのルール自体はシステム/アプリケーションのサイズにかかわらずいつも同じという話。
これはアーキテクチャのメタ的な感じっぽい。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/CleanArchitecture?src=hash&amp;ref_src=twsrc%5Etfw">#CleanArchitecture</a> シングルスレッドのアプリ、マルチスレッドのアプリ、重量プロセスのアプリ、軽量プロセスのアプリ色々作ってきたけどアーキテクチャのルールはいつも同じ<br><br>&gt; The architecture rules are the same!</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/912117809714307072?ref_src=twsrc%5Etfw">September 25, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

そもそもの話としてアーキテクチャを決めるのはプログラマ（アーキテクト）で、その人のスキルとかチームによって異なる選択をしてる。なので、暗黙的に、異なるチームでは異なるアーキテクチャの決定をする。

アーキテクチャの目的は開発、デプロイ、運用、メンテをやりやすくするため。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/CleanArchitecture?src=hash&amp;ref_src=twsrc%5Etfw">#CleanArchitecture</a>  良いアーキテクチャがサポートすべきもの <a href="https://t.co/xp1upNzbO5">pic.twitter.com/xp1upNzbO5</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/912124439344562176?ref_src=twsrc%5Etfw">September 25, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

アーキテクトは境界を見つけることが仕事で、そのboundariesの線を引くこと。
境界はDBとかテストとかアプリケーションとかcontextとか色々なところにある。
それを気をつけて認識しないといけない。また同時に認識した境界を無視しなければならない。なぜなら、すべてを実装するのはコストが高いため。

後は境界を引いた上でそれぞれのコンポーネントを結合するプラグインの仕組みなどについて。
フレームワークをコードに入れるのではなく、コードに対してフレームワークというコンポーネントをプラグインとして入れるようにするとか。

> Don’t marry the framework!

境界をちゃんとして、依存関係をちゃんとしよう的な話が多かった。

## Building Evolutionary Architectures

Building Evolutionary ArchitecturesというEvolutionary Architectures(進化的アーキテクチャ)についての本を読んだ。

- [Building Evolutionary Architectures | ThoughtWorks](https://www.thoughtworks.com/books/building-evolutionary-architectures "Building Evolutionary Architectures | ThoughtWorks")
- [Building Evolutionary Architectures: Support Constant Change: Neal Ford, Rebecca Parsons, Patrick Kua: 9781491986363: Amazon.com: Books](https://www.amazon.com/dp/1491986360/ "Building Evolutionary Architectures: Support Constant Change: Neal Ford, Rebecca Parsons, Patrick Kua: 9781491986363: Amazon.com: Books")

ThoughtWorksの人達が書いた本なので、アーキテクチャに対するメタ的な目線が多かった。

そもそも、Evolutionary Architectures(進化的アーキテクチャ)とは何かという話や進化的アーキテクチャというのは何を目的にしているか。(adaptable Architectureと言わなかったのはなぜかなど?)

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">Why Evolutionary? <a href="https://t.co/dhWQIhUg4k">pic.twitter.com/dhWQIhUg4k</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/917406155374157824?ref_src=twsrc%5Etfw">October 9, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

進化的アーキテクチャは次の3つのポイントが主になってる的な話。 - Incremental change- Guided change with fitness functions- Appropriate coupling

継続的に変更すること(Incremental change)ができ、その変更/進化が目的の方向なのかをチェックできる指標をちゃんと持つこと(Guided change with fitness functions)。
つまりアーキテクチャを選ぶことが目的でなく、Fitness functionとなる指標がありそれに対するアーキテクチャを選べているかを確認できるようにすることが目的。

ある変化に対してその変化が目的に沿ったものだったかを計測できる指標のことをfitness functionと言っているという理解。

> A fitness function is a particular type of objective function that is used to summarise, as a single figure of merit, how close a given design solution is to achieving the set aims.

元ネタは[Fitness function - Wikipedia](https://en.wikipedia.org/wiki/Fitness_function "Fitness function - Wikipedia")とのこと。


でてくる用語が抽象的なので次の動画も見たほうが分かりやすいかも。

<iframe width="560" height="315" src="https://www.youtube.com/embed/SzSZpZI02Jg" frameborder="0" allowfullscreen></iframe>

そのため、何がFitness functionなのかは、作るシステム/アプリケーションによって異なる。
あるシステムではパフォーマンスやセキュリティが大事だったり、作るものによって異なる = 進化の方向はアプリケーションで異なる。

テストとかパフォーマンスとかそれぞれコンポーネント毎にfitness functionがあり、システム全体でのバランスを検証する。スケーラビリティとか、パフォーマンス、セキュリティとかデータスキーマとかプロジェクトにおける指標となるものをちゃんと決めてないと、都度の変化はただの反応的な変化(reactionary architecture)となるので、最初にシステム全体として進化の指標を決めることは大事という話。つまり、正しい方向を向いてるかどうかという指標はちゃんと決めないと、正しさが分からずに問題となるよという話だと思う。

その指標が決まっているだけでは継続的な進化はできないので、Incremental changeをするためには継続的インテグレーション(CI)と継続的デリバリー(CD)といったリリースサイクルに関わるもの大事という話が結構でてきた。(また、このデプロイの頻度とかは物理的なものとデジタル的なもので異なるという話とか。)

リリースサイクルの例としてGitHubとかの例がでてきた。

- [Move Fast and Fix Things | GitHub Engineering](https://githubengineering.com/move-fast/ "Move Fast and Fix Things | GitHub Engineering")

なんでリリースサイクルが大事かというとリリース速度と進化的アーキテクチャに相関が存在する。つまりプロジェクトのサイクルタイムによってアーキテクチャの進化速度が決まり、より早いサイクルはより早い進化を促すことができるため。

継続的にデプロイするには、そのシステムがモジュール化されていることが大事。
そのモジュール化を行う方法?としていろんなアーキテクチャがあるよという、既存のいろんなアーキテクチャ紹介(モノリシック、レイヤードアーキテクチャ、[Event-driven architecture](https://en.wikipedia.org/wiki/Event-driven_architecture "Event-driven architecture")、serverlessとか)

けど

> Don’t build an architecture just because it will be fun meta-work.

だよという話。

----

アーキテクチャの対義語(アンチパターン)として泥団子([Big ball of mud](https://ja.wikipedia.org/wiki/%E5%A4%A7%E3%81%8D%E3%81%AA%E6%B3%A5%E3%81%A0%E3%82%93%E3%81%94 "Big ball of mud"))の話。
基本的に泥団子は進化することができないので、新しい変化を取り込むことができない。
いくかの柔軟性を取り込んでいくことでアーキテクチャ全体を変更せずに、取り入れることができる。柔軟性についてでどういうものがあるかという話。

- 必要ない変数を取り除く
    - Immutabilityを取り入れる
    - Immutable infrastructureは必要ない変数を取り除く
- 決定を可逆にする
    - Make Decisions Reversible
    - Revertable、 blue/green deployment
- Prefer Evolvable over Predictable
- Build Anticorruption Layers
    - 腐敗防止を設ける
- Mitigate External Change
    - 外部ライブラリの変更の影響を小さく保つ
    - left-padの教訓
- Updating Libraries Versus Frameworks
    - アーキテクトはライブラリとフレームワークを区別する
    - 開発者のコードがライブラリを呼び出す
    - フレームワークは開発者のコードを呼び出す
    - 多くの場合はライブラリを選ぶことで影響が軽減される
    - フレームワークは積極的に依存を更新する(セキュリティアップデート)
    - ライブラリは必要になったら更新する(update when neededモデル)
- Prefer Continuous Delivery to Snapshots
    - The conflict between Continuous Delivery and traditional Agile - kief.com
    - -LATESTみたいなスナップショットじゃなくてタグ切って管理
- これはMake Decisions Reversibleとも繋がる(revert可能にする)
    - Prefer Continuous Delivery over snapshots for (external) dependencies.
    - 継続的デプロイができる環境では外部依存についての考えかたも変える
    - 2つの指標を導入する
	- fluid
	     - 自動的に依存を更新する
	- guarded
	     - 固定 -> fluidに戻すように修正する
- Version Services Internally
    - 一度に管理するサービスのエンドポイントのバージョンは2つまで
    
<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">left-padだ <a href="https://t.co/JctKbVAVfH">pic.twitter.com/JctKbVAVfH</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/917040368339755008?ref_src=twsrc%5Etfw">October 8, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script

外部モジュールのバージョン管理の話が結構面白かった。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ライブラリとフレームワークの区別について<br>開発者のコードがライブラリを呼び出す。一方、フレームワークは開発者のコードを呼び出す。<br>多くの場合はライブラリを選ぶことで影響が軽減される。<br><br>フレームワークのアップデートは積極的に行い、ライブラリのアップデートは必要になったら行う。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/917041667881893889?ref_src=twsrc%5Etfw">October 8, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

つまり、フレームワークは自分が制御するわけではないので、アップデートは積極的に行わないと進化できなくなる可能性がある。一方ライブラリは必要になったタイミングで更新すればいいという話。


----

泥団子から進化することはできないのでどうやって分解するかという話。

泥団子を進化させることはできない。(本で ball of mud は結構出てくる)泥団子を再加工するコストが莫大なものとなる。これを変質させる方法の第一歩はモジュール化。最初に行うべき作業は現在のシステムからモジュールの発見すること。

ここでも境界を見つける話や泥団子からのマイグレーション方法についてなど。
モジュールへ分解していくのだけど、安易に分解するとパフォーマンスが問題になることがあるよとか、分解した結果複数のモジュールが共有してる共有モジュールはどうするの?とか。

どうにかして境界を見つけて分解することができたら、取捨選択のステップへ。ここでも指標となるFitness functionがでてくる。

> Next, developers choose and detach the chosen service from the monolith, fixingany calling points. Fitness functions play a critical role here — developersshould build fitness functions to make sure the newly introduced integrationpoints don’t change, and add consumer-driven contracts.

-----

またIncremental changeの話に戻って

サイクルタイムはビジネスメトリクスであるという話。ならなぜ、短い時間で繰り返せるということはコストが小さくなるということ。最小のコストで試すことができる。
このサイクルタイムを短くするにはいろいろ自動化が必要になるという話。

変化のリスクを小さくするのが進化的アーキテクチャの考え方。その変化において大きなBreaking Changeを減らす/なくしIncremental changeできるようにする。
それによって、新しいものを取り入れる余地を作る。

雑に進化的アーキテクチャとは何かというと
- 予測可能性より進化性- 進化のリスクを小さくする(痛みを伴うBreaking Changeなしに進化)
- 依存するライブラリとフレームワークの管理とリスクを考えて意思決定をする- 可逆性を持つ決定を取り入れる- 腐敗防止層を設ける
- 進化の速度とリリースサイクルには相関がある	- 短い時間で繰り返せるということは、試すコストが小さい
	- プロジェクトのサイクルタイムによってアーキテクチャの進化速度が決まる- 泥団子は進化することができないので、柔軟性のポイントを取り入れる- 目的に対する成長なのかを計測する(そのため実装の詳細を無視してはいけない)

アーキテクチャは方程式ではなく、進行中のプロセスのスナップショットにすぎないという話。

----

読み終わってそういえば[犠牲的アーキテクチャ](http://bliki-ja.github.io/SacrificialArchitecture/ "犠牲的アーキテクチャ")というものが同じくThoughtWorksのMartin Fowlerさんが言っていたのを思い出した。
進化的アーキテクチャはより緩やか/より前進的な犠牲的アーキテクチャと言えるのかもしれないなーとか思った。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">最近聞かなくなった気もするけど犠牲的アーキテクチャの話も少しでてきてた気がする。<br>進化的アーキテクチャは緩やかな犠牲的アーキテクチャと言えるのかもしれない<a href="https://t.co/FckZSanZai">https://t.co/FckZSanZai</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/917070245768028161?ref_src=twsrc%5Etfw">October 8, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


## おわり


[Clean Architecture](http://www.informit.com/store/clean-architecture-a-craftsmans-guide-to-software-structure-9780134494319 "Clean Architecture: A Craftsman&#39;s Guide to Software Structure and Design | InformIT")と[Building Evolutionary Architectures](https://www.amazon.com/dp/1491986360/ "Building Evolutionary Architectures: Support Constant Change: Neal Ford, Rebecca Parsons, Patrick Kua: 9781491986363: Amazon.com: Books")を読んでの雑なメモ書き。

両方共、アーキテクチャとは境界を見つけることという話や異なるチーム異なるシステムでは異なるアーキテクチャがあるよという話をしてたのが良かった。

あとはアーキテクチャ選び遊びは楽しいけど、目的にあってないアーキテクチャを選ぶアーキテクチャシンドロームにかかってはいけないという話も共通してた気がする。

> Don’t build an architecture just because it will be fun meta-work.


どちらの本も読んで何か実践的な何かを学べるタイプのものではないので、その辺を見たい場合は別の本を見たほうが良さそう。

- [Delft Students on Software Architecture: DESOSA 2017 · GitBook](https://www.gitbook.com/book/delftswa/desosa-2017/details "Delft Students on Software Architecture: DESOSA 2017 · GitBook")
- [.NETのエンタープライズアプリケーションアーキテクチャ](http://ec.nikkeibp.co.jp/item/books/P98480.html ".NETのエンタープライズアプリケーションアーキテクチャ")
- [Patterns, Principles, and Practices of Domain-Driven Design: Scott Millett, Nick Tune: 0787721845461: Amazon.com: Books](https://www.amazon.com/dp/1118714709/ "Patterns, Principles, and Practices of Domain-Driven Design: Scott Millett, Nick Tune: 0787721845461: Amazon.com: Books")
	- [アーキテクチャをめぐるたび | Web Scratch](http://efcl.info/2016/09/30/architecture-refs/ "アーキテクチャをめぐるたび | Web Scratch")

どちらかというと次のものに近い方向だけど、もう少し技術よりなので短い時間で読みやすい。

- [ソフトウェアシステムアーキテクチャ構築の原理](https://www.amazon.co.jp/dp/B00ZF44J0I/ "ソフトウェアシステムアーキテクチャ構築の原理")
- [Living Documentation by design, with Domain-Driven Design](https://leanpub.com/livingdocumentation "Living Documentation by design, with Domain-Driven Design")
   - [Living Documentation by design, with Domain-Driven Designを読んだ | Web Scratch](http://efcl.info/2017/05/12/Living-Documentation-DDD/ "Living Documentation by design, with Domain-Driven Designを読んだ | Web Scratch")

感想の量からもわかるように[Building Evolutionary Architectures](https://www.amazon.com/dp/1491986360/ "Building Evolutionary Architectures: Support Constant Change: Neal Ford, Rebecca Parsons, Patrick Kua: 9781491986363: Amazon.com: Books")は結構面白かった。
