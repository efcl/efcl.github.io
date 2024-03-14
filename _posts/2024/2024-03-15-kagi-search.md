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
月に1-2万回ぐらいは検索することを考えると、 `(108 / (10000 * 12)) * 150` で大体1検索が0.1円ぐらいのイメージですが、LLMを使ったサマライズも含まれた料金なので、実質もう少しコスパは良いと思います。

検索ソースにはGoogle, Yandex, Mojeek, Braveなどのリソースを使っているので、検索結果自体はGoogleとそこまで変わらないと思います。

- [Search Sources | Kagi's Docs](https://help.kagi.com/kagi/search-details/search-sources.html)

基本的な使い方ではGoogleで見つかったものがKagiで見つからなかったという経験はありません。もちろん、検索の量でGoogleより優れたものはないと思うので、量にフォーカスしたいときはGoogleを使えば良いと思います(逆に今は飽和的になって検索が逆に難しかったり、検索されてないところにコンテンツがあったりして、量でのカバーは難しい感じはします)

自分がKagiを使う一番理由は検索体験にあると思っています。

## いいところ

- Googleより良いと感じる検索結果が出しやすい(人による)
    - 日本語の検索結果はそこまで変わらない感じもする(後述する漢字だけ検索した時の問題はまだある)
      - フィルター系がビルトインであるので、絞り込みはしやすく感じる
    - 英語で検索した時に英語のリソースの方が日本語より優先されるので良い結果と感じることが多い
        - たとえば、Googleだと英語で検索して英語の言語の検索結果を選択にしても、日本語のサイトが出てくる(おそらくRegionが日本だと、日本向けの翻訳があったらそっちを出すみたいな感じになっていて、これが嫌)
        - https://www.google.com/search?q=javascript&lr=lang_en
        - Kagiは、regionをinternationalにすれば基本的に素直に感じる結果が出てくる
        - https://kagi.com/search?q=javascript&r=no_region
        - GoogleではRegionの切り替えが設定画面になって遠い
    - [uBlacklist](https://github.com/iorate/ublacklist)を使ってなくても、いかがでしたか?状態にはならない
        - スパムっぽいサイトとかを表示する回数は減った感覚がある
        - 後述するBlockやQuickAnswerを活用しているのもある
    - また、ビルトインでBlockや検索結果の優先度を変更する機能が入ってる
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
- Lensで特定のサイトからの検索結果だけにフィルターできるのが便利
    - 日本の主要なブログだけを検索するLens
        - `*.hatenablog.com, *.hatenablog.jp, *.hateblo.jp, *.hatenadiary.com, *.hatenadiary.jp, note.com, ameblo.jp, sizu.me, zenn.com, qiita.com`
    - https://kagi.com/lenses/0Q9bHFmidnH3TfNAR3OYQKb0gyqDEzM7
    - レビューとか検索したいときに個人のブログを検索したい といった感じの用途でよく使う
- 検索結果のOrder ByとTimeが素直な感じ
    - [Filtering Results | Kagi's Docs](https://help.kagi.com/kagi/features/filtering-results.html)
    - Order By: recentで検索のソート順を新しいもの順にできる
    - Timeで24時間以内の結果にできる(ここはGoogleでもできる)
    - **Verbatim mode**を使うと、クエリの文字列が含まれているサイトだけが表示される(Googleでよく見る変な正規化を無効化できる)
    - 全体的に素直な検索結果を扱える

## だめなところ

- 漢字だけのクエリだと中国語の結果が混ざることがある
    - [Japanese / Chinese - Kagi Feedback](https://kagifeedback.org/d/2118-japanese-chinese/7) をVoteしてください
    - RegionとLanguageの区別がまだ実装されてないので、漢字だけだと両方出てくることがある
    - そこまで漢字の単語 一つだけ検索することは少ないので、数百回に1回ぐらいのイメージ
- 検索結果がGoogleより遅い
    - 大体1秒弱ぐらいかかるイメージ
    - データセンターがHong Kongになってるので、日本にサーバがあればもうちょっとマシになると思う
        - [Search Speed | Kagi's Docs](https://help.kagi.com/kagi/search-details/search-speed.html#data-center-locations)
    - [Kagi slow? Post here! - Kagi Feedback](https://kagifeedback.org/d/183-kagi-slow-post-here/91)
        - ここにポストすると対応してくれそう

## その他のTips

- [「Kagi for Safari」をApp Storeで](https://apps.apple.com/jp/app/kagi-for-safari/id1622835804)を入れるとiOSでもKagiを使える
    - Google検索とかの代わりにKagiを表示してくれるSafari拡張になってる
    - ブロックの共有とかもされてるので、uBlacklistみたいな拡張をわざわざ入れなくてもPCと同じ検索体験になる
- [Bangs | Kagi's Docs](https://help.kagi.com/kagi/features/bangs.html#bangs) という機能で `!g` でGoogleにジャンプしたりできる
    - 自分はショートカットでGoogleに行きたかったので別の方法使ってる
    - [Surfingkeys shortcut: kagi.com to google](https://gist.github.com/azu/2f0d47d4d800fb02fda0ba64c2f076dd)
    - 検索結果がダメだったら `g` をおして、Google検索をする
    

## 感想

[Kagi Search](https://kagi.com/)は有料の検索エンジンです。

万人におすすめできるというわけではないですが、プログラミングなどする人にとってはGoogleより扱いやすい検索エンジンだと感じる作りになってると思います。

Googleは賢いので、検索クエリに対してそれっぽい検索結果を出してしまうことがあります。1単語で検索した場合とかはこれが便利ですが、複数のクエリを組み合わせたような検索結果は求めてない結果が混ざることが多いです。

一方でKagiは素直な感じの検索エンジンなので、素直に書いたクエリの通りの検索結果になるというイメージです。

- [Search Quality | Kagi's Docs](https://help.kagi.com/kagi/search-details/search-quality.html)
- [Search Sources | Kagi's Docs](https://help.kagi.com/kagi/search-details/search-sources.html)

これに加えて、LensやSort、Verbatimなども素直に扱えるので扱いやすく感じます。
また、Kagiは https://kagi.com/settings?p=user_ranked どのドメインを出すか出さないかというパーソナライズも自分でちゃんと管理できます。

Googleは検索をちゃんとやろうとするほど余計な結果(もしかして)が混ざってくるのが不便でした。Kagiでは素直な検索が返ってくるので、ちゃんと検索したいことを検索しやすいです。
また、曖昧な検索結果が欲しい時(何を調べればいいのかもまだわかってないことを調べる時)は[Quick Answer](https://help.kagi.com/kagi/ai/quick-answer.html)を使うといった使い分けをしています。

最近では[Wolfram](https://www.wolframalpha.com/)のFounderの人がKagiに入ったり、検索のフロントエンドとしてのKagiは結構面白いと思うので、それに期待して使ってる部分もあります。

- [Kagi + Wolfram | Kagi Blog](https://blog.kagi.com/kagi-wolfram)

一応、月100回までは無料で検索できるので試してみると良いと思いますが、正直100回ぐらいでいいかどうかはわからない感じはします。

- [Update to Kagi Search pricing | Kagi Blog](https://blog.kagi.com/update-kagi-search-pricing)

機能というより体験的な部分に依存すると思うので、定常的に使わないと評価が難しいサービスだと思いました。