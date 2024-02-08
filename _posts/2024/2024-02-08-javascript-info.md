---
title: "私のJavaScriptの情報収集法 2024年版"
author: azu
layout: post
date : 2024-02-08T13:52
category: JavaScript
tags:
    - JavaScript

---

個人的なJavaScriptの情報収集の方法についてまとめてみます。

[JSer.info](https://jser.info/)などをやっているので、JavaScriptの情報については色々な情報源を見るようにしています。
JSer.infoの範囲の中での情報源については、次の記事でまとめています。

- [JSer.info 13周年: JavaScriptの情報源を整理する - JSer.info](https://jser.info/2024/01/16/jser-13th/)

この記事では、少しスコープを広げてJavaScriptの情報収集についてまとめてみます。

![Scope](https://efcl.info/wp-content/uploads/2024/02/08-1707368548.png)

<!-- https://excalidraw.com/#json=pMVXv_WhoeCvEJMdVrdsx,4CPHbfiDCtMhQl4Zof2umA -->

かなりスコープが広がってしまうので、万人向けの方法ではなく、個人的な情報収集方法としてまとめています。

この記事では、膨大な情報の中から見つけるというアプローチをとっているので、人によって向き不向きがあると思います。

## 情報収集の方法

情報の元となる情報源はさまざまなサイトや人になると思います。
しかし、そのサイトや人ごとに見ていくというのはかなり大変で、それ自体が大変になると見なくなる可能性が高いと思います。
そのため、情報収集においては、情報を自分が見やすいと思える場所に集めることが重要だと考えています。

人によってこの集める場所は異なりため、Twitter(X)、RSSリーダー、Notion、SlackやDiscordなど色々な場所があると思います。
自分の場合はRSSリーダーに情報が集まるようにしています。

### RSSリーダー

技術的なサイトにはRSSフィードがついてることが多いので、自分はRSSリーダーにRSSフィードを集約しています。
また、後述しますがRSSフィードがないものも、欲しい情報源からRSSフィードを作るなどとしてRSSリーダーに集約しています。

RSSリーダーには[Inoreader](https://www.inoreader.com/)を利用しています。
[Inoreader](https://www.inoreader.com/ja/)のフロントエンドとして[Irodr](https://irodr.netlify.app/)を使っています。

- [LDRライクなRSSリーダのIrodr 1.0.0をリリースした | Web Scratch](https://efcl.info/2018/09/30/irodr-1.0.0/)
- [かつてのLDRと同じ操作方法を実現、新しい国産RSSリーダー「Irodr」が登場【やじうまWatch】 - INTERNET Watch](https://internet.watch.impress.co.jp/docs/yajiuma/1145750.html)

自分の[情報収集はメモまでがセット](https://jser.info/2021/01/16/jser-10th/)なので、RSSは基本的にPCでしか見ていません。
スマホで見つけたものに関しては、[Pocket](https://getpocket.com)にあとで読む登録して、PocketのRSSフィードを購読しているので、それをPCで見るようにしています。

RSSフィードをまとめるフォルダは、LDRのレート分類をそのまま使っていて、レートに加えて一部特殊なフォルダのみで管理しています。

- GitHubReleases: GitHubでWatchしてるリポジトリのリリース情報
- ★★★★★ 重要なフィード、Pocketなどもここに入る
- ★★★★☆ 興味がある情報が書かれているフィード
- ★★★☆☆ デフォルト
- ★★☆☆☆ あんまり興味はないけど、目に入れておきたいぐらいのフィード、一般的なニュースサイト
- ★☆☆☆☆ ほとんど使ってない
- ☆☆☆☆☆ 普段は全くみないけど、意識したタイミングで読みたいフィード
- NewsLetter: ニュースレター

![レート](https://efcl.info/wp-content/uploads/2024/02/08-1707370237.png)

基本的に、これを上から読んでいくだけです。後半になるほど、あんまり興味がない情報になっていくので、中身をちゃんと読む頻度が下がっていきます。
GitHubReleasesは特殊なフォルダで、後述する仕組みでGitHubのWatchしてるリポジトリごとのリリースやGitHubでの脆弱性情報などが集まっています。
NewsLetterも特殊なフォルダで、1週間ごとにまとめて更新されたりするので、みたい時にみるという感じの運用をしています。
NewsLetterをメールで見ていないのは、Inbox Zeroでメールを管理しているため溜まりがちなニュースレターは全部RSSフィードにしたためです。

- [メールの受信トレイを空にするInbox Zeroを始めた | Web Scratch](https://efcl.info/2022/12/23/inbox-zero/)

購読しているRSSフィードの数は大体2000から3000ぐらいになっています。

<iframe src="https://notion-plotly.netlify.app/line?Feed.x=2012,2017,2021,2023,2024&Feed.y=2000,3212,2604,3528,3626" width="800" height="600" loading="lazy"></iframe>

2023年から増えているのは、[GitHubリポジトリのリリースノートを自動的にRSSフィードとして購読する仕組み](https://github.com/azu/watch-rss)を作ったためです。
2024年2月時点での全てのRSSフィード数は3626に対して、GitHubリポジトリのRSSフィード数は1382なので、実際のブログとかのフィード数は2000前後という感じです。

RSSフィードは特に気にせずに購読することにしていて、手動で購読解除することはかなり少ないです(乗っ取りとか完全に興味がないものを外す程度)。
どちらかというとサイトが404になるなどして、自動的に購読解除されることが多いです。
この方針でRSSフィードを増やしていても、自動的に解除されるものも同じぐらいなので、実質的なRSSフィード数はそこまで変わってない印象です。
(GitHubは例外)

## 情報源となるリソース

ここからは、実際に購読してRSSフィードについてピックアップして紹介します。

### 色々なブログ

初っ端から曖昧ですが、色々なブログを購読しています。
一度見つけて気になったらとりあえず購読しています。

全てを列挙するのは難しいので、JavaScriptに関連するブログは次のサイトにまとめられています。

- [JSer.info Watch List](https://jser.info/watch-list/)

[JSer.info Watch List](https://jser.info/watch-list/)は、JSer.infoで2年以内に紹介したサイトを自動的にまとめているページです。
2024-02-08時点で、718紹介されていて、そのうちGitHubリポジトリが322なので、GitHubのリポジトリを除くと400ぐらいのサイトを紹介しています。
OPMLデータ(RSSフィードをまとめたリスト)も公開してるので、RSSリーダにインポートすれば一気に購読できます。

GitHubを除いたサイトを1つのRSSフィードとしてまとめたものも公開しています。

- [JSer.info Watch List RSS](https://jser.info/watch-list-rss/)

### GitHubリポジトリのリリースノート

先程も紹介しましたが、GitHubリポジトリのリリースノートを自動的にRSSフィードとして購読する仕組みを作っています。

- [azu/watch-rss: Subscribe your watched GitHub Repository's releases as RSS feeds on Inoreader](https://github.com/azu/watch-rss)

GitHubリポジトリには、次のURLでリリースノートをRSSフィードとして購読できます。

```
https://github.com/azu/watch-rss/releases.atom
```

- [GitHub releasesのフィードを購読する - その手の平は尻もつかめるさ](https://moznion.hatenadiary.com/entry/2018/01/25/154254)

[azu/watch-rss](https://github.com/azu/watch-rss)は、WatchしてるリポジトリのリリースノートをInoreaderで自動的に購読するための仕組みです。
そのため、リリースを追いたいなーと思ったリポジトリはWatchしておくと、自動的にリリースノートをRSSとして購読できるようになります。

欠点としては、GitHubのAPIでは全てを"Watch"してるリポジトリしか取得できないので、Customで"Releases"のみのWatchだと動きません。
WatchしまくるとNotificationは崩壊するので、Notificationを使ってる人は注意が必要です。

![Release](https://efcl.info/wp-content/uploads/2024/02/08-1707381006.png)

APIで、Customで"Releases"のみのリポジトリを取得する方法を知っている方がいたら教えてください。

### GitHubでStarしたリポジトリのリリースノート

[Bandito.re](https://bandito.re/)では、GitHub Starしたリポジトリのリリースノートをまとめて購読できます。
自分はとりあえずGitHub Starしてることが多いです。
ただ、Watchするかは意識しないと忘れるので、そういった見逃しがたまに回収できます。

### GitHub Issue/PRの検索結果

現在は多くのオープンソースやECMAScriptの仕様などもGitHubで管理されています。
そのため、GitHubのIssueやPull Requestで重要なやりとりが行われることが増えています。

そういったIssueやPull Requestのやりとりを購読するために、GitHubの検索結果をRSSフィードとして購読しています。

- [azu/github-search-rss: GitHub Search Results as RSS Feeds via GitHub Actions.](https://github.com/azu/github-search-rss)

[github-search-rss](https://github.com/azu/github-search-rss)は、検索クエリを書くことでその結果をRSSフィードとして作成するGitHub Actionsのリポジトリです。
特定のラベルがついたIssueやPull Request、特定のキーワードを含むリポジトリなどのRSSフィードを作成できます。

```js
export const SEARCH_ITEMS: RSSItem[] = [
    // Issue
    {
        title: "microsoft/TypeScript Iteration Plan",
        query: "repo:microsoft/TypeScript is:issue label:Planning",
        TYPE: "ISSUE",
        link: `${BASE_URL}/typescript-iterator-plan.json`,
        homepage: "https://github.com/search?q=repo%3Amicrosoft%2FTypeScript+is%3Aissue+label%3APlanning"
    },
        {
        title: "mdn/content update content",
        query: "repo:mdn/content is:pr is:open",
        TYPE: "ISSUE",
        link: `${BASE_URL}/mdn-content.json`
    },
    {
        title: "Node.js notable changes",
        query: "repo:nodejs/node label:notable-change is:pr is:closed -label:doc",
        TYPE: "ISSUE",
        link: `${BASE_URL}/nodejs-notable.json`
    },
    {
        title: "whatwg/html changes",
        query: 'repo:whatwg/html is:pr label:"impacts documentation"',
        TYPE: "ISSUE",
        link: `${BASE_URL}/whatwg-html.json`
    }
];
```

自分が利用しているRSSフィードは次のページにまとめてあります。

- [github-search-rss](https://azu.github.io/github-search-rss/)

具体的には、TypeScriptのロードマップや、Node.jsの重要な変更、ブラウザの仕様に対するポジション、MDNの更新、HTMLの仕様の更新などを購読しています。

- [🔎](https://github.com/search?q=repo%3Amicrosoft%2FTypeScript%20is%3Aissue%20label%3APlanning)`repo:microsoft/TypeScript is:issue label:Planning`: https://azu.github.io/github-search-rss/typescript-iterator-plan.json
- [🔎](https://github.com/search?q=repo%3Aw3ctag%2Fdesign-reviews%20is%3Aissue)`repo:w3ctag/design-reviews is:issue`: https://azu.github.io/github-search-rss/w3ctag-design-reviews.json
- [🔎](https://github.com/search?q=repo%3Anpm%2Frfcs%20is%3Aissue)`repo:npm/rfcs is:issue`: https://azu.github.io/github-search-rss/npm-rfcs.json
- [🔎](https://github.com/search?q=repo%3Anpm%2Fstatusboard%20is%3Aissue)`repo:npm/statusboard is:issue`: https://azu.github.io/github-search-rss/npm-statusboard.json
- [🔎](https://github.com/search?q=repo%3Agithub%2Froadmap%20is%3Aissue)`repo:github/roadmap is:issue`: https://azu.github.io/github-search-rss/github-roadmap.json
- [🔎](https://github.com/search?q=repo%3Amozilla%2Fstandards-positions%20is%3Aissue)`repo:mozilla/standards-positions is:issue`: https://azu.github.io/github-search-rss/mozilla-standards-positions.json
- [🔎](https://github.com/search?q=repo%3AWebKit%2Fstandards-positions%20is%3Aissue)`repo:WebKit/standards-positions is:issue`: https://azu.github.io/github-search-rss/WebKit-standards-positions.json
- [🔎](https://github.com/search?q=repo%3AFyrd%2Fcaniuse%20label%3A%22Support%20data%20suggestion%22)`repo:Fyrd/caniuse label:"Support data suggestion"`: https://azu.github.io/github-search-rss/caniuse.json
- [🔎](https://github.com/search?q=org%3Awintercg%20is%3Aopen%20is%3Aissue%20-repo%3Awintercg%2Fadmin)`org:wintercg is:open is:issue -repo:wintercg/admin`: https://azu.github.io/github-search-rss/wintercg.json
- [🔎](https://github.com/search?q=repo%3Ababel%2Fproposals%20is%3Aissue)`repo:babel/proposals is:issue`: https://azu.github.io/github-search-rss/babel-proposals.json
- [🔎](https://github.com/search?q=repo%3Aantifraudcg%2Fproposals%20is%3Aissue)`repo:antifraudcg/proposals is:issue`: https://azu.github.io/github-search-rss/antifraudcg-proposals.json
- [🔎](https://github.com/search?q=repo%3Amdn%2Fbrowser-compat-data%20is%3Apr%20is%3Aopen)`repo:mdn/browser-compat-data is:pr is:open`: https://azu.github.io/github-search-rss/mdn-browser-compat-data.json
- [🔎](https://github.com/search?q=repo%3Amdn%2Fcontent%20is%3Apr%20is%3Aopen)`repo:mdn/content is:pr is:open`: https://azu.github.io/github-search-rss/mdn-content.json
- [🔎](https://github.com/search?q=repo%3Anodejs%2Fnode%20label%3Anotable-change%20is%3Apr%20is%3Aclosed%20-label%3Adoc)`repo:nodejs/node label:notable-change is:pr is:closed -label:doc`: https://azu.github.io/github-search-rss/nodejs-notable.json
- [🔎](https://github.com/search?q=repo%3Awhatwg%2Fhtml%20is%3Apr%20label%3A%22impacts%20documentation%22)`repo:whatwg/html is:pr label:"impacts documentation"`: https://azu.github.io/github-search-rss/whatwg-html.json
- [🔎](https://github.com/search?q=lightweight%20language%3Ajavascript%20language%3Atypescript%20sort%3Aupdated-desc)`lightweight language:javascript language:typescript sort:updated-desc`: https://azu.github.io/github-search-rss/lightweight-javascript-repo.json

これらを見てると、ウェブの仕様の具体的な流れが見えたりします。

たとえば、ブラウザや仕様にちゃんとした変更を入れようと思うと、2つの実装者が必要です。
今はChromeの人がかなり仕様を追加してるので、新しい機能を作った時にMozilla/WebKitに対して仕様の意見を聞くIssueを作っています。
またW3C Tagのデザインレビューも行うので、新しい仕様を検討するときは次のリポジトリにIssueが作成されます。

- https://github.com/search?q=repo%3Amozilla%2Fstandards-positions+is%3Aissue&type=issues
- https://github.com/search?q=repo%3AWebKit%2Fstandards-positions+is%3Aissue&type=issues
- https://github.com/search?q=repo%3Aw3ctag%2Fdesign-reviews+is%3Aissue&type=issues

この仕様が進んで、実装されるとブラウザのリリースノートになって、互換テーブルとかにその情報が反映されます。

- https://github.com/search?q=repo%3Amdn%2Fbrowser-compat-data+is%3Apr+is%3Aopen&type=pullrequests
- https://github.com/search?q=repo%3Amdn%2Fcontent+is%3Apr+is%3Aopen&type=pullrequests
- https://github.com/search?q=repo%3AFyrd%2Fcaniuse+label%3A"Support+data+suggestion"&type=issues

この辺の流れが結構見えたりするので、実際にリリースされるまでにどういう議論点があったのかをちょっとわかってる状態になるのでおすすめです。

### GitHub Advisory Database

GitHub Advisory Databaseは、GitHubのセキュリティアドバイザリ情報を提供しています。
これらは言語ごとに提供されていて、JavaScriptの場合はnpmのパッケージの脆弱性情報が提供されています。
この更新もRSSフィードとして購読しています。

- [RSS Feeds for GitHub Advisory Database](https://azu.github.io/github-advisory-database-rss/)
    - `COMPOSER`: https://azu.github.io/github-advisory-database-rss/composer.json ([atom](https://azu.github.io/github-advisory-database-rss/composer.rss))
    - `GO`: https://azu.github.io/github-advisory-database-rss/go.json ([atom](https://azu.github.io/github-advisory-database-rss/go.rss))
    - `MAVEN`: https://azu.github.io/github-advisory-database-rss/maven.json ([atom](https://azu.github.io/github-advisory-database-rss/maven.rss))
    - `NPM`: https://azu.github.io/github-advisory-database-rss/npm.json ([atom](https://azu.github.io/github-advisory-database-rss/npm.rss))
    - `NUGET`: https://azu.github.io/github-advisory-database-rss/nuget.json ([atom](https://azu.github.io/github-advisory-database-rss/nuget.rss))
    - `PIP`: https://azu.github.io/github-advisory-database-rss/pip.json ([atom](https://azu.github.io/github-advisory-database-rss/pip.rss))
    - `PUB`: https://azu.github.io/github-advisory-database-rss/pub.json ([atom](https://azu.github.io/github-advisory-database-rss/pub.rss))
    - `RUBYGEMS`: https://azu.github.io/github-advisory-database-rss/rubygems.json ([atom](https://azu.github.io/github-advisory-database-rss/rubygems.rss))
    - `RUST`: https://azu.github.io/github-advisory-database-rss/rust.json ([atom](https://azu.github.io/github-advisory-database-rss/rust.rss))
    - `ERLANG`: https://azu.github.io/github-advisory-database-rss/erlang.json ([atom](https://azu.github.io/github-advisory-database-rss/erlang.rss))
    - `ACTIONS`: https://azu.github.io/github-advisory-database-rss/actions.json ([atom](https://azu.github.io/github-advisory-database-rss/actions.rss))
    - `SWIFT`: https://azu.github.io/github-advisory-database-rss/swift.json ([atom](https://azu.github.io/github-advisory-database-rss/swift.rss))

### フォローしてる人からの情報

#### はてなブックマークでフォローしてる人のブックマーク

はてなブックマークには、自分がフォローしてるアカウントのブックマークをRSSフィードとして購読できます。

```
https://b.hatena.ne.jp/{user}/favorite.rss
```

📝 `https://b.hatena.ne.jp/{user}/favorite` にアクセスすると、RSSフィードのリンクがページ内に書かれています。

これによって、自分が気になる情報をブクマしてる人をフォローしておけば、その人がブックマークした記事を購読できます。

#### GitHubでフォローしてる人がStarしたリポジトリ

[starseeker](https://starseeker.so/)は、GitHubのフォロワーがStarしたリポジトリを購読できるサービスです。

GitHubでフォローしてる人は興味が似ていると思うので、そういったリポジトリを発見できます。

### タグ検索

ブックマークサービスなどでは、タグ検索をしてその結果をRSSフィードとして購読できることがあります。

たとえば、はてなブックマークだと次のようなURLでタグ検索の結果をRSSフィードとして購読できます。

- [javascriptの最新人気記事 - はてなブックマーク](https://b.hatena.ne.jp/q/javascript?safe=on&target=tag&users=1&sort=recent)
    - <https://b.hatena.ne.jp/q/javascript?mode=rss&users=1&target=tag&sort=recent&date_range=5y&safe=on>

他にも、ブログサービスに似たような仕組みがあります。

- [Zenn](https://zenn.dev/)
    - [JavaScriptの記事一覧 | Zenn](https://zenn.dev/topics/javascript)
    - <https://zenn.dev/topics/javascript/feed>
- [Qiita](https://qiita.com/)
    - [JavaScriptとは？開発に役立つ使い方、トレンド記事やtips - Qiita](https://qiita.com/tags/javascript)
    - <https://qiita.com/tags/javascript/feed>
- [DEV.to](https://dev.to/)
    - [JavaScript - DEV Community](https://dev.to/t/javascript)
    - <https://dev.to/feed/tag/javascript>

### アグリゲーションサイト

[Menthas](https://menthas.com/)は、はてなブックマークを元にしたアグリゲーションサイトです。

- [約3年かけてプログラマ向けニュース推薦アプリを作り直した話 #アルゴリズム - Qiita](https://qiita.com/ytanaka/items/6cfad69a4c000c05be40)

[企業テックブログRSS](https://yamadashy.github.io/tech-blog-rss-feed/)は、企業のブログを手動で集めて1つのRSSフィードとして購読できるサイトです。

- [企業のテックブログの更新をまとめたRSSフィードを作りました！（GitHub Actions） #JavaScript - Qiita](https://qiita.com/yamadashy/items/0130e3e569b0832bc51f)

### ニュースレター

- [cooperpress](https://cooperpress.com/publications/)
    - [JavaScript Weekly](https://javascriptweekly.com/)
    - [Node Weekly](https://nodeweekly.com/)

PR: [JSer.info](https://jser.info/)も1週間に1度のページでJavaScriptの情報をまとめています。
JSer.infoスポンサーも募集しています。

- [Sponsor @azu on GitHub Sponsors](https://github.com/sponsors/azu)

## まとめ

自分の場合は、RSSリーダーに情報を集約しているので、RSSフィードがあるものは基本的に購読しています。
メタ的なサイトや検索を使いながら、新しく見つけたサイトをRSSとして購読していくというのを繰り返しています。
ずっと同じ頻度で同じ質で更新されるようなサイトはかなり少ないと思うので、購読して読むものもだんだんと変わっていきます。
これによって、情報の新陳代謝ができるので、新しい情報を見つけることできるのではないかなと思いました。

細かいテクニック的な話だと、[Inoreader](https://www.inoreader.com/ja/)はOPMLを購読できる仕組みがあります。
これは、OPMLのURLを指定することで、OPMLの中身が変わったら自動的に購読しているフィードが増減するという仕組みです。
これを使うことで、RSSを購読するという操作を意識しなくても、RSSを購読できるようにしています。

[github-search-rss](https://github.com/azu/github-search-rss)や[RSS Feeds for GitHub Advisory Database](https://azu.github.io/github-advisory-database-rss/)などはこの仕組み(OPMLを生成してる)を利用して購読しています。購読するかどうかを考えるのは結構大変なので、その辺を自動化/他の操作に置き換えることで、情報の鮮度が保ちやすいのかなと思いました。

フォローしたら自動的に購読できるというのは、SNSやYoutubeなどではあると思うので、それをRSSリーダに持ってきてるという感覚です。
今だと[Bluesky](https://bsky.app/)上のフィードで似たような仕組みを作れたりしそうなので、試して見ると面白いかもしれません。