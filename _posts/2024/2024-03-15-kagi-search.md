---
title: "Kagi Searchをメインの検索エンジンとして使っている"
author: azu
layout: post
date : 2024-03-15T00:25
category: 雑記
tags:
    - Google
    - Kagi

---

最近はGoogleではなく[Kagi Search](https://kagi.com/)をメインの検索エンジンとして使っています。

[Kagi Search](https://kagi.com/)は$108/year($10/month)の有料の検索エンジンです。
広告モデルではない検索エンジンなので、有料のサブスクリプションモデルとなっています。

- [Plan Types | Kagi's Docs](https://help.kagi.com/kagi/plans/plan-types.html)
  - いくつかプランがあり、検索し放題のProfessionalプランが$10/monthです
  - [Ultimate Plan ](https://help.kagi.com/kagi/plans/ultimate-plan.html)($25/month)だと外部のOpenAIのGPT 4とかClaude 3との連携とかも入ってきます

月に1-2万回ぐらいは検索することを考えると、 `(108 / (10000 * 12)) * 150` で大体1検索が0.1円ぐらいのイメージですが、こちらもKagiのLLM機能は利用できるので、実質もう少しコスパは良いと思います。

検索ソースにはGoogle, Yandex, Mojeek, Braveなどのリソースを使っているので、検索結果自体はGoogleとそこまで変わらないと思います。

- [Search Sources | Kagi's Docs](https://help.kagi.com/kagi/search-details/search-sources.html)

基本的な使い方ではGoogleで見つかったものがKagiで見つからなかったという経験はありません。もちろん、検索の量でGoogleより優れたものはないと思うので、量にフォーカスしたいときはGoogleを使えば良いと思います(逆に今は飽和的になって検索が逆に難しかったり、検索されてないところにコンテンツがあったりして、量でのカバーは難しい感じはします)

自分がKagiを使う一番理由は検索体験にあると思っています。

## いいところ

- Googleより良いと感じる検索結果が出しやすい(人による)
    - 日本語の検索結果はそこまで変わらない感じもする(後述する漢字だけ検索した時の問題はまだある)
      - フィルター系がビルトインであるので、絞り込みはしやすく感じる
    - 英語で検索した時に英語のリソースにマッチさせやすいので良い結果と感じることが多い
        - たとえば、Googleだと英語で検索して"英語のページを検索"を選択にしても、日本語のサイトが出てくる(おそらくRegionが日本だと、日本語訳があったらそっちを出すみたいな感じになったりして、これが嫌なこと多い)
        - https://www.google.com/search?q=javascript&lr=lang_en
        - Kagiの場合、こういうケースでは検索結果の画面でregionを"International" や "US" に切り替えると基本的に素直に感じる結果が出てくる
        - <https://kagi.com/search?q=javascript&r=no_region> や <https://kagi.com/search?q=javascript&r=us>
        - GoogleではRegionの切り替えが設定画面になって遠い
    - [uBlacklist](https://github.com/iorate/ublacklist)を使ってなくても、いかがでしたか?状態にはならない
        - スパムっぽいサイトとかを表示する回数は減った感覚がある
        - 後述するBlockやQuickAnswerを活用しているのもある
    - また、ビルトインでBlockや検索結果の優先度を変更する機能が入ってる
        - [Website Info & Personalized Results | Kagi's Docs](https://help.kagi.com/kagi/features/website-info-personalized-results.html)
        - [Kagi Search Stats](https://kagi.com/stats?stat=leaderboard)で統計データも公開されている
        - pinterestのような表示したくないサイトをブロックしたり、逆にMDNのようなサイトを優先度を上げるといったことができる
    - [Redirects (URL Rewrites) | Kagi's Docs](https://help.kagi.com/kagi/features/redirects.html) という機能で、検索結果のURLを書き換える機能も持っている
- `?` を末尾につけると、LLMを使った検索結果のサマリを出してくれるQuick Answerが便利
    - ![Kagi Quick Answer](https://efcl.info/wp-content/uploads/2024/03/15-1710429999.png)
    - あまり詳しくないことや検索結果から欲しい部分を抽出してくれるので手間が省ける(検索結果を元にするので書かれてないことはでない)
    - 同じようにページのサマリ表示する機能がある
        - kagiのブラウザ拡張を使うと見ているページのサマリも表示できる(自分はそこまで使ってない)
        - https://addons.mozilla.org/en-US/firefox/addon/kagi-search-for-firefox/
        - https://chrome.google.com/webstore/detail/cdglnehniifkbagbbombnjghhcihifij
- [Lenses](https://help.kagi.com/kagi/features/lenses.html)で特定のサイトからの検索結果だけにフィルターできるのが便利
    - プログラミング関係(GitHubやStackoverflowなど)のサイトだけに絞ったりが、1 clickで切り替えできる
    - 日本の主要なブログだけを検索するLens
        - `*.hatenablog.com, *.hatenablog.jp, *.hateblo.jp, *.hatenadiary.com, *.hatenadiary.jp, note.com, ameblo.jp, sizu.me, zenn.com, qiita.com`
    - https://kagi.com/lenses/0Q9bHFmidnH3TfNAR3OYQKb0gyqDEzM7
    - レビューとか検索したいときに個人のブログを検索したい といった感じの用途でよく使う
- 検索結果のOrder ByとTimeが素直な感じ
    - [Filtering Results | Kagi's Docs](https://help.kagi.com/kagi/features/filtering-results.html)
    - Order By: recentで検索のソート順を新しいもの順にできる
    - Timeで24時間以内の結果にできる(ここはGoogleでもできる)
    - **Verbatim mode**を使うと、クエリの文字列が含まれているサイトだけが表示される
    - 全体的に素直な検索結果を扱える

## だめなところ

- 漢字だけのクエリだと中国語の結果が混ざることがある
    - [Japanese / Chinese - Kagi Feedback](https://kagifeedback.org/d/2118-japanese-chinese/7) をVoteしてください
    - RegionとLanguageの区別が部分的にしか実装されてないので、漢字だけだと両方出てくることがある
    - そこまで漢字の単語 一つだけ検索することは少ないので、数百回に1回ぐらいのイメージ
    - 漢字1つだけのケースは辞書的な検索な気はしてて、Wikipedia(`!w` bang)を指定したり、Googleに行ったり、もう少し明確なクエリにすることで回避してる
    - この問題をもう少し広く捉えると、ここを自動でやるのは検索的にかなり面倒そうな問題な気はしている。たとえば、ca-enとus-enでは求めてるものが違う、ca-frとca-enがあるとか
    - 自動でやり切るにはエッジケースが結構多そう(Googleはそれをやってるイメージだけど、丸まりすぎてしまう)
    - 人によって最適だと思う結果が結構違うので、クエリでその人の意図を表現できるような方向だと良い気はする
    - Ideaがある人はここに投稿すると良いと思う
    - [Ideas for improving local/international/english search modalities - Kagi Feedback](https://kagifeedback.org/d/3022-ideas-for-improving-localinternationalenglish-search-modalities)
- 検索結果がGoogleより遅い
    - 大体1秒弱ぐらいかかるイメージ
    - データセンターがHong Kongになってるので、日本にサーバがあればもうちょっとマシになると思う
        - [Search Speed | Kagi's Docs](https://help.kagi.com/kagi/search-details/search-speed.html#data-center-locations)
    - [Kagi slow? Post here! - Kagi Feedback](https://kagifeedback.org/d/183-kagi-slow-post-here/91)
        - ここにポストすると対応してくれそう

## その他のTips

- [「Kagi for Safari」](https://apps.apple.com/jp/app/kagi-for-safari/id1622835804)を入れるとiOSでもKagiを使える
    - Google検索とかの代わりにKagiを表示してくれるSafari拡張になってる
    - ブロックの共有とかもされてるので、uBlacklistみたいな拡張をわざわざ入れなくてもPCと同じ検索体験になる
- [Bangs | Kagi's Docs](https://help.kagi.com/kagi/features/bangs.html#bangs) という機能で `!g` でGoogleにジャンプしたりできる
    - 自分はショートカットでGoogleに行きたかったので別の方法使ってる
    - [Surfingkeys shortcut: kagi.com to google](https://gist.github.com/azu/2f0d47d4d800fb02fda0ba64c2f076dd)
    - 検索結果がダメだったら `g` をおして、Google検索をする

## ユースケース

Kagi Searchの機能を使ったユースケースの紹介をいくつか書いています。
ブラウザ拡張などを使えば実現はできると思いますが、検索エンジン側で実現できるので、PC/モバイル問わずどこからでも利用できるのが利点です。

### AmazonのURLをシンプルする

[Redirects (URL Rewrites) ](https://help.kagi.com/kagi/features/redirects.html)を使って、検索結果のAmazonのURLをシンプルにする。

```
^https://www.amazon.co.jp/([^/]+)/dp/(.*)|https://www.amazon.co.jp/dp/$2
```

### 日本の主要なブログだけを検索する

次の[Lenses](https://help.kagi.com/kagi/features/lenses.html)を使って、日本のブログだけに絞り込める

- <https://kagi.com/lenses/0Q9bHFmidnH3TfNAR3OYQKb0gyqDEzM7>

## 感想

[Kagi Search](https://kagi.com/)は有料の検索エンジンです。

万人におすすめできるというわけではないですが、プログラミングなどする人にとってはGoogleより扱いやすい検索エンジンだと感じる作りになってると思います。

Googleは賢いので、検索クエリに対してそれっぽい検索結果を出してしまうことがあります。1単語で検索した場合とかはこれが便利ですが、複数のクエリを組み合わせたような検索結果は求めてない結果が混ざることが多いです。

一方でKagiは素直な感じの検索エンジンなので、素直に書いたクエリの通りの検索結果になるというイメージです。
検索のデータとしてGoogleのものなども使っているので、Kagiでは見つからなかったけどGoogleでは見つかるというケースもあまりない印象です（特に思いつかなかった）。

- [Search Quality | Kagi's Docs](https://help.kagi.com/kagi/search-details/search-quality.html)
- [Search Sources | Kagi's Docs](https://help.kagi.com/kagi/search-details/search-sources.html)

これに加えて、LensやSort、Verbatimなども絞り込み系がアクセスしやすいので、扱いやすく感じます。
また、Kagiは https://kagi.com/settings?p=user_ranked どのドメインを出すか出さないかというパーソナライズも自分でちゃんと管理できます。

Googleは検索をちゃんとやろうとするほど余計な結果(もしかして)が混ざってくるのが不便でした。Kagiでは素直な検索が返ってくるので、検索したいことをちゃんと検索しやすいです。
また、曖昧な検索結果が欲しい時(何を調べればいいのかもまだわかってないことを調べる時)は[Quick Answer](https://help.kagi.com/kagi/ai/quick-answer.html)を使うといった使い分けをしています。

使っていると、曖昧な検索と正確な検索?(絞り込んでいくような検索)を意識的に使い分けやすい作りになってるのかなと思いました。
前者はGoogleの方が考えずに使えると思いますが、後者になるとKagiの方が扱いやすい部分が多いと感じました。

Kagi Searchを使おうと思った理由としては

- Google検索で絞り込んで行ったときに、意図してない結果が出てくるケースが最近多かったのでどうにかしたかった
- 使ってみて、よくある懸念の「Googleで見つかるけどKagiでは見つからない」というケースはほとんどないと思った
- [Kagi search features | Kagi Blog](https://blog.kagi.com/kagi-features)とか基礎機能が細かくできてて良いと思った(設定画面をみるとわかる)
  - 過去にGoogleにあった機能もあるけど、Googleは機能を消してしまうので
  - LensとかBlockとかこういう機能は検索エンジン側に実装された方が管理が楽なので
- [Kagi Blog](https://blog.kagi.com/blog)を読んでて方向性が結構面白いと思った
- 試用期間(100回/month)だと機能を使いきれてなかったけど、まあ悪くなさそうと思って課金した
  - 最悪Googleとかに戻ればいいだけだし

最近では[Wolfram](https://www.wolframalpha.com/)のFounderの人がKagiに入ったり、検索のフロントエンドとしてのKagiは結構面白いと思うので、それに期待して使ってる部分もあります。

- [Kagi + Wolfram | Kagi Blog](https://blog.kagi.com/kagi-wolfram)

一応、月100回までは無料で検索できるので試してみると良いと思いますが、正直100回ぐらいでいいかどうかはわからない感じはします。

- [Update to Kagi Search pricing | Kagi Blog](https://blog.kagi.com/update-kagi-search-pricing)

機能というより体験的な部分に依存すると思うので、定常的に使わないと評価が難しいサービスだと思いました。
