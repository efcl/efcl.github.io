---
title: "アーキテクチャをめぐるたび"
author: azu
layout: post
date : 2016-09-30T20:01
category: 雑記
tags:
    - book
    - DDD
    - JavaScript

---

タイトルに特に意味はありませんが、[Almin](https://github.com/almin/almin "Almin")を作る参考にしたものをまとめた感じの記事です。

- スライド: [複雑なJavaScriptアプリケーションを考えながら作る話](http://azu.github.io/slide/2016/react-meetup/large-scale-javascript.html "複雑なJavaScriptアプリケーションを考えながら作る話")
- リポジトリ: [azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること](https://github.com/azu/large-scale-javascript "azu/large-scale-javascript: 複雑なJavaScriptアプリケーションを作るために考えること")

主に書籍を並べていますがその他のスライドなどの参考資料は以下にまとめてあります。

- [large-scale-javascript/refs.md at master · azu/large-scale-javascript](https://github.com/azu/large-scale-javascript/blob/master/refs.md "large-scale-javascript/refs.md at master · azu/large-scale-javascript")

自分用のメモなので、読んだ順で並べておきます。
右側の年は書籍の出た年です。

## [実践ドメイン駆動設計](http://www.shoeisha.co.jp/book/detail/9784798131610 "実践ドメイン駆動設計") @ 2013

一番最初に読んだDDD系の本。

この辺ででてくるレイヤーとか用語を把握した感じ。
けど、そこまでよく分かってない感じはする。
カウボーイが出てくるの読みにくい。

この本をベースにしたスライドなどが多かったのでそっちも合わせて見ていた。
また、出てきた用語をぐぐったりしながら読んでた気がする。

- [「実践ドメイン駆動設計」社内読書会まとめ ～IDDD本難民に捧げる1章から7章～](http://www.slideshare.net/AtsuoAoki/iddd17 "「実践ドメイン駆動設計」社内読書会まとめ ～IDDD本難民に捧げる1章から7章～")
- [ドメイン駆動設計 の 実践 Part3 DDD](http://www.slideshare.net/masuda220/part3-ddd-in)
- [ドメイン駆動設計・アプリケーション構築編・エンティティ - Strategic Choice](http://d.hatena.ne.jp/asakichy/20110524/1306190461)
- [戦術的DDD基本原則まとめ - Qiita](http://qiita.com/haazime/items/6119097071149a362f7f)

基本的に読んだ内容は覚えていないので、この辺からメモを取りながら読むようにした。
Kindleで買ってたので、スクリーンショットをOneNoteに貼るという形でメモした(一応OCRがあるので検索できる)

![memo](http://efcl.info/wp-content/uploads/2016/09/30-1475238536.png)

## [今日からはじめる情報設計](http://www.bnn.co.jp/dl/mess/ "今日からはじめる情報設計") @ 2015

情報設計(IA)についてかなり分かりやすい本。
フワッとした表現が多いけど、色々考え方の参考になった。

構造化の考え方として分類法は次の2つになるという話。

- 並列的構造
- 階層的構造

この辺の構造はパターン・ランゲージとかいろんな文脈でてくるので、最初に知っといてよかった気がする。
アーキテクチャの話を見ていて、それは何を整理したいのかという視点から見ることが多くなった感じ。

[How to work as a Team](http://azu.github.io/slide/2016/reject-sushi/how-to-work-team.html "How to work as a Team")のスライド書いていたあたりで読んでいたはずなので、スライドにも影響がでてる。

## [情報アーキテクチャについて | IAAJ: Information Architecture Association Japan](http://iaaj.org/about_ia/ "情報アーキテクチャについて | IAAJ: Information Architecture Association Japan")

IAという言葉もやはり変化していると思って探して見つけた記憶。

## [エンジニアのための図解思考 再入門講座 情報の“本質”を理解するための実践テクニック（開米瑞浩） ｜ 翔泳社の本](http://www.shoeisha.co.jp/book/detail/9784798122755 "エンジニアのための図解思考 再入門講座 情報の“本質”を理解するための実践テクニック（開米瑞浩） ｜ 翔泳社の本") @ 2010

情報の整理の仕方を考えていた。
箇条書きよりテーブルのほうが情報量多いよという話

## [.NETのエンタープライズアプリケーションアーキテクチャ　第2版　～.NETを例にしたアプリケーション設計原則](http://ec.nikkeibp.co.jp/item/books/P98480.html ".NETのエンタープライズアプリケーションアーキテクチャ　第2版　～.NETを例にしたアプリケーション設計原則") @ 2015

DDD本の中では一番読みやすい日本語の書籍な気がする。
最初のアーキテクトの話なども面白かった。

またDDDの文脈で出てくるモデルやリポジトリなどは、人によって言ってることが違うという事実をちゃんと注記してくれている。CQRSについてはこの本を読むとよい。

確かこの本を読む[1週間ぐらい前](https://github.com/almin/almin/commit/2f8048f7f45497df809e646b6ceb4445c6bbdbe2)に[Almin](https://github.com/almin/almin "Almin")を作ったので、この本を読むときは考え方の答え合わせみたいな感じで読んでたと思う。
(コードベース自体はもうちょっと前にできてたのライブラリとして切り出したのがこの時)

DDDの文脈で出てくる用語は検索しても、とにかく曖昧な事が多いので、曖昧な用語であるということを明記されていたのが良かった。

> 単純さと複雑さは人によって異なる

とかそういう話はIAのやつでも出てきたので、その辺で話のつながりを感じた。

## [オブジェクト開発の神髄](http://bpstore.nikkeibp.co.jp/item/books/P82370.html "日経BP書店｜商品詳細　-　オブジェクト開発の神髄") @2005

[Almin](https://github.com/almin/almin "Almin")でUseCaseという用語を使っていたので、その用語が出てくるものとして見つけて読んだ。

ユースケースモデリングについてはこの本を結構参考にしていたと思う。

> ユースケースはアクターの視点から能動的に書く

PoEAAと出版時期が近かった気がするけど、こっちの方が興味深い感じだった。

## [エンタープライズアプリケーションアーキテクチャパターン](http://www.shoeisha.co.jp/book/detail/9784798105536 "エンタープライズアプリケーションアーキテクチャパターン（長瀬嘉秀 Martin Fowler 株式会社テクノロジックアート） ｜ 翔泳社の本") @ 2005

PoEAA。
読んでいてDDD本とかIDDD本とかでも似たような事を言ってたなー感じた記憶がある。

この辺でアーキテクチャ本みたいな事が言ってることは、本質的にはそんな変化ないのかなーという所に興味が出てきた。

## [パターン・ランゲージ: 創造的な未来をつくるための言語](https://www.amazon.co.jp/dp/4766419871/ "パターン・ランゲージ: 創造的な未来をつくるための言語") @ 2013

今ある色々なアーキテクチャの源流的なものを巡っていて、[パタン・ランゲージ―環境設計の手引](https://www.amazon.co.jp/dp/4306041719/ "パタン・ランゲージ―環境設計の手引") @ 1984を探しているときに見た。

DDDもパターン集であるため、この源流はやはりこの辺にあるのではと思って調べていた。
IAの話もそうだけど、構造化の考え方などは都市構造の考えの話とも一致している感じがする。

> 「何を」作るのかを支援するというもの、抽象的な形で提供される  
> パターンはデザインを支援する。良いデザインは問題を解決する  
> パターンランゲージは言葉で形を表すので、それは誰に取っても同じ形にならないとおかしい  
> 真偽値を科学的なものじゃない、コードとかにも「良い悪い」という適用したのがパターンの面白いところ  

via [http://twilog.org/azu_re/date-160519](http://twilog.org/azu_re/date-160519)

ソフトウェアのアーキテクチャやパターンはこの辺にやっぱり源流がありそうというのは分かってきた。

パターン・ランゲージとかアレグザンダーについては次の本が詳しそう。

- [パターン、Wiki、XP ―― 時を超えた創造の原則](http://gihyo.jp/magazine/wdpress/plus/978-4-7741-3897-8 "パターン、Wiki、XP ―― 時を超えた創造の原則")
- [情報学会誌](https://ipsj.ixsq.nii.ac.jp/ej/index.php?active_action=repository_view_main_item_detail&page_id=13&block_id=8&item_id=75806&item_no=1)も面白い話が載ってる

## [アルゴリズミック・デザインの現在](http://www.ieice.org/cs/csbn/program/papers/080516_waseda.pdf "untitled - 080516_waseda.pdf")

パターン・ランゲージのアレグザンダーは1970年代にはコンピュータによるデザイン設計を試みてたという話があった。
建築的にはアルゴリズミック・デザインの源流となる考え方で、それを調べてた。
また1970年代ではまだコンピュータの性能などの問題があるのでアレだけど。

> 著者はこの言葉のように、要求された機能を十分に満たすような優れた「デザイン ･ パターン」と「デザイン ･ アルゴリズム」からは、優れた「デザイン ･ パターン」が自動的に生成されると考えていた。  
> しかし、人の感性に良いと評価される「デザイン ･ パターン」と機能的に生成された「デザイン ･ パターン」は必ずしも重なるわけでないことが分かった。本事例では、「デザイン ･ パラメータ」に人が感性的に決定した要素を入れたり、ということを実験的に行ってみたが、その結果は感性的な要因を記述することの難しさを確認しただけとなった
> -- [アルゴリズミック・デザインの現在](http://www.ieice.org/cs/csbn/program/papers/080516_waseda.pdf "untitled - 080516_waseda.pdf")

[アルゴリズミック・デザイン―建築・都市の新しい設計手法 : 日本建築学会 : 本 : アマゾン](https://www.amazon.co.jp/dp/4306045234/ "アルゴリズミック・デザイン―建築・都市の新しい設計手法 : 日本建築学会 : 本 : アマゾン")

> コンピュータ・プログラムをつかって建築設計をするためのさまざまな技法や設計例について書いている．「アルゴリズミック」というと完全に自動的に設計するようにきこえるが，おおくの例では設計の候補を出力して，設計者がそのなかから選択する方法がとられている．その点ではアルゴリズミック・コンポジションつまりコンピュータをつかった作曲と同様であり，まさにクセナキスがとっていた「音楽デザイン」の方法とおなじである．それを「アルゴリズミック」とよぶのが適切であるかどうかはわからない．

ジェネラティブ・アート的な考え方なのかなとも思えてきた。

パターン・ランゲージでは、「パターン」とは誰にとっても(人種が異なっていても)同じ形になるという話がある。

> パターンランゲージは言葉で形を表すので、それは誰に取っても同じ形にならないとおかしい  

また、パターンは作り出すものではなく見つけるものと言う話があった気がするので、いったんアルゴリズミック・デザインの話は諦めた。

> デザインパターンとは懸命な人が発明するものではなく、既存のコードの中から発見されるものです。 
> -- [O'Reilly Japan - ThoughtWorksアンソロジー](http://www.oreilly.co.jp/books/9784873113890/ "O&#39;Reilly Japan - ThoughtWorksアンソロジー")

この辺で一端折り返した。

## [A Pattern Language for Information Architecture](http://www.ellisonconsulting.com/downloads/Pattern_Language_for_Information_Architecture.pdf "Pattern_Language_for_Information_Architecture.pdf")

パターン・ランゲージとIAについて書かれたスライド。

## [企業情報システムアーキテクチャ](https://www.amazon.co.jp/dp/B00N0SRXBI/ "企業情報システムアーキテクチャ")

企業システムのアーキテクチャの話として見た。

## [Patterns, Principles, and Practices of Domain-Driven Design - Wrox](http://www.wrox.com/WileyCDA/WroxTitle/Patterns-Principles-and-Practices-of-Domain-Driven-Design.productCd-1118714709.html "Patterns, Principles, and Practices of Domain-Driven Design - Wrox") @ 2015

DDDについて分かりやすく書かれてる書籍。
DDD本/IDDD本が分かりにくいところを分かりやすく書こうとした感じのする内容だった。

DDDに興味がある人は読むとよい感じな気がする。(かなり分厚いというか量が多い…)

## 読みたいけど読めてないもの

### [オブジェクトデザイン](https://www.amazon.co.jp/dp/4798109037/ "オブジェクトデザイン") @ 2007

ES6の仕様のEditorである[アレン・ワーフスブラック](https://codezine.jp/article/detail/9071 "アレン・ワーフスブラック")の奥さんでもある[レベッカ・ワーフスブラック](https://www.ogis-ri.co.jp/otc/hiroba/ogisbooks/ObjectDesign.html "レベッカ・ワーフスブラック")が書いた書籍。
責務駆動についてちょっと知りたい。


### [実践UML 第3版 オブジェクト指向分析設計と反復型開発入門](https://www.amazon.co.jp/dp/4894716828/ "実践UML 第3版 オブジェクト指向分析設計と反復型開発入門") @ 2007

オブジェクト指向について。
そもそも手に入らない。

### [ユースケース駆動開発実践ガイド](http://www.shoeisha.co.jp/book/detail/9784798114453 "ユースケース駆動開発実践ガイド") @ 2007

ユースケースについて。今読んでる。

## おわり

今もちょうどやっている翔泳社の電子書籍セールで買って読んだものが多い気がする。

- [半期に1度のエンジニア応援祭：電子書籍40％割引セール ｜ 翔泳社](http://www.shoeisha.co.jp/campaign/fes/20160926 "半期に1度のエンジニア応援祭：電子書籍40％割引セール ｜ 翔泳社")

他にも見たほうがいいやつがあったら知りたいなー

色々見てた感じアーキテクチャという分野を扱うものは、あんまりパーマネントリンクが貼れるようにできていない気がする。そういう意味でも[Martin Fowler](http://www.martinfowler.com/ "Martin Fowler")は正しくてすごい気がした。

最初に[Almin](https://github.com/almin/almin "Almin")という成果物を作り、それの中に入ってる考えの名前を求める旅をしていた。