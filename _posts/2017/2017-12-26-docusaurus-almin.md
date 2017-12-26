---
title: "AlminのサイトをOSSドキュメントツールのdocusaurusで作り直した"
author: azu
layout: post
date : 2017-12-26T09:48
category: JavaScript
tags:
    - docusaurus
    - Almin

---

[Almin](https://github.com/almin/almin "Almin")では元々GitBookを使ったドキュメントサイトを<https://almin.js.org/>で公開していました。
最近、OSS向けのドキュメントサイト作成ツールである[Docusaurus](https://docusaurus.io/ "Docusaurus")が公開されたのを受けて、[GitBook](https://www.gitbook.com/)から[Docusaurus](https://docusaurus.io/ "Docusaurus")に移行しました。

- Alminのサイト: [Almin · Flux/CQRS patterns for JavaScript application.](https://almin.js.org/ "Almin · Flux/CQRS patterns for JavaScript application.")
	- <https://github.com/almin/almin>

[Docusaurus](https://docusaurus.io/ "Docusaurus")は説明にあるようにOSSのライブラリやプロダクト向けのドキュメントサイトを作る一種の静的サイトジェネレーターです。

[![Docusaurus](http://efcl.info/wp-content/uploads/2017/12/26-1514286444.png)](https://docusaurus.io/)

> Easy to Maintain Open Source Documentation Websites


Facebookから公開されていることからも分かるように、[Jest](http://facebook.github.io/jest/ "Jest")や[Prettier](https://prettier.io/ "Prettier")(Facebookプロダクトではないけど中にFacebookの[vjeux](https://github.com/vjeux "vjeux")さんがいる)などが利用しています。

特徴としてはMarkdownでドキュメントと目次を書いてドキュメントサイトを作ることができます。
また、Reactを使ったカスタマイズ、バージョニングへの対応、[Crowdin](https://crowdin.com/ "Crowdin")を使った翻訳への対応、ブログ機能やalgoliaを使った検索などライブラリサイト向けの機能を持っています。

ライブラリなどはバージョンで大きく変わったときに旧バージョンのドキュメントを残す仕組みがあると便利です。またリリースノートを書く際に簡単なブログがあると置き場所に困らないので便利です。
(Organizationのコミュニティとして利用できる仕組みを持ったもとしては[dev.to](https://dev.to/)などがあります)

また、ReactやESLintのサイトなどでも見かける[Algolia DocSearch](https://community.algolia.com/docsearch/ "DocSearch")との検索連携もオプションも簡単にできます。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Get search feature🔎<a href="https://t.co/5ArxMldalw">https://t.co/5ArxMldalw</a><br><br>Thanks to <a href="https://twitter.com/algolia?ref_src=twsrc%5Etfw">@algolia</a> DocSearch <a href="https://t.co/0Ort7svZdf">pic.twitter.com/0Ort7svZdf</a></p>&mdash; alminjs (@alminjs) <a href="https://twitter.com/alminjs/status/943113112193941504?ref_src=twsrc%5Etfw">December 19, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


そのほかの概要については次の記事で紹介されていますが、Jekyllをドキュメントサイト向けに特化したというのが近い感触です。

- [Introducing Docusaurus · Docusaurus](https://docusaurus.io/blog/2017/12/14/introducing-docusaurus.html "Introducing Docusaurus · Docusaurus")

## GitBookからDocusaurusへの移行

<https://almin.js.org/>は元々GitBookで動いていましたが、[Docusaurus](https://docusaurus.io/ "Docusaurus")に移行しています。
GitBookは便利で[JavaScriptの入門書](https://github.com/asciidwango/js-primer)や[JavaScriptプラグインアーキテクチャの本](https://github.com/azu/JavaScript-Plugin-Architecture "JavaScriptプラグインアーキテクチャの本")でも使っていますが、ドキュメントサイト向けかというとそうでもない気がします。またファイル数が多くなると`gitbook serve`が異常なほど重くなる問題があります。
[Docusaurus](https://docusaurus.io/ "Docusaurus")のサイトを見ていて、移行できそうと思ったのとブログ機能なども欲しかったので試しに移行してみました。

詳細は次のPRでまるっと移行しました。
合わせて[Netlify](https://www.netlify.com/ "Netlify")のPRプレビュー機能を使って、PRを出したら<https://deploy-preview-304--almin.netlify.com/>という感じでプレビューできるようにして進めました。

- PR: [docs(website): use docusaurus instead of GitBook by azu · Pull Request #304 · almin/almin](https://github.com/almin/almin/pull/304 "docs(website): use docusaurus instead of GitBook by azu · Pull Request #304 · almin/almin")

GitBookからDocusaurusへの移行に関するマイグレーションツールは特にありませんが、どちらも次の点が共通しています。

- ページをMarkdownで書く
	- YAMLなヘッダ + Markdown本体でほぼおなじ
- 目次からページへのリンクを貼る
	- GitBookは`SUMMARY.md`からのリンク
	- Docusaurusはページに`id`を振って、[sidebars.json](https://github.com/almin/almin/blob/master/website/sidebars.json "sidebars.json")から`id`の一覧をまとめる


[Docusaurus](https://docusaurus.io/ "Docusaurus")は[Installation · Docusaurus](https://docusaurus.io/docs/en/installation.html "Installation · Docusaurus")にあるように、`docusaurus-init`をインストールして実行するとサイトのテンプレートを作ってくれます。

```
npm install --global docusaurus-init
docusaurus-init
```

テンプレを生成したら、後は地道にリネームして移行しました。

- `docs/` にMarkdownファイルをフラットに配置する
	- それぞれのMarkdownのYAMLヘッダに`id`と`title`を振る
- `sidebar.json` に `id` をグループごとにまとめる。
- [siteConfig.js](https://github.com/almin/almin/blob/master/website/siteConfig.js "siteConfig.js")にサイトタイトルとかを設定する
	- タイトルとかアイコンとかURLとかヘッダとか検索機能の有無、ブログの有無とか
- サイトデザインはGridコンポーネントなどよくあるパターンが用意されている
	- CSSは10行もかかないでいい感じになる
	
`docs/`(このディレクトリ自体は変更できる)以下のフラットにMarkdownファイルを置かないと行けないのは制約のようです。
	
> Note that all of your documentation .md files must still reside in a flat hierarchy. You cannot have your documents in nested directories.   
> [siteConfig.js · Docusaurus](https://docusaurus.io/docs/en/site-config.html#optional-fields "siteConfig.js · Docusaurus")


Alminではフラットにしてかつファイル名を大文字小文字にするようにしました。
URLは`id`によって決定されるため、ファイル名とは別で管理できます。

- [almin/docs/](https://github.com/almin/almin/tree/master/docs "almin/docs/")

![dicrectory](http://efcl.info/wp-content/uploads/2017/12/26-1514284267.png)

こうしたできたのが次のサイトです。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Almin get new website!<a href="https://t.co/5ArxMldalw">https://t.co/5ArxMldalw</a><br><br>Thanks to <a href="https://twitter.com/docusaurus?ref_src=twsrc%5Etfw">@docusaurus</a> <a href="https://t.co/OmrXn9SI8d">pic.twitter.com/OmrXn9SI8d</a></p>&mdash; alminjs (@alminjs) <a href="https://twitter.com/alminjs/status/942068484560715776?ref_src=twsrc%5Etfw">December 16, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### [Algolia DocSearch](https://community.algolia.com/docsearch/ "DocSearch")での全文検索

Docusaurusは[DocSearch](https://community.algolia.com/docsearch/ "DocSearch")での検索連携ができます。
[DocSearch](https://community.algolia.com/docsearch/ "DocSearch")はクロールしていい感じの検索結果とUIを提供してくれるサービです。(OSS向けで無料でやってくれる)

[ESLint](https://eslint.org/)や[Vue](vuejs.org/guide/)、[React](https://reactjs.org/)など最近の有名なツールでドキュメントがしっかりとあるものは、使ってることが多いので見たことがある人も多いかもしれません。

![eslint](http://efcl.info/wp-content/uploads/2017/12/26-1514284622.png)

とても便利なのですが、この申請フローがなぜかマニュアルだったので有効化の仕方をメモって置きます。

1. [DocSearch](https://community.algolia.com/docsearch/ "DocSearch")のサイトでURLとメールアドレスを入れて申請する
2. このサイトのOwnerですかって確認メールがくる
	- このOrganizationのOwner権限を持ってて、このリポジトリで管理してるサイトだよって伝えた
	- 後Docusaurusを使ってるサイトだよって書いた
3. 有効化したよってメール来る
	- [docsearch-configs/almin_js.json at master · algolia/docsearch-configs](https://github.com/algolia/docsearch-configs/blob/master/configs/almin_js.json "docsearch-configs/almin_js.json at master · algolia/docsearch-configs")が配置される

さすがにそのうち自動化される気がしますが、[docsearch-configs/almin_js.json at master · algolia/docsearch-configs](https://github.com/algolia/docsearch-configs/blob/master/configs/almin_js.json "docsearch-configs/almin_js.json at master · algolia/docsearch-configs")を見る感じだとクロールする設定を追加したら有効化されるようです(申請から2-3日かかります)

## おわりに

[Docusaurus](https://docusaurus.io/ "Docusaurus")はまだ公開されたばかりで、おかしなところはいくつかありますが、よくできていてドキュメントに必要な機能が大体あって便利です。
([gitbook-plugin-include-codeblock](https://github.com/azu/gitbook-plugin-include-codeblock "gitbook-plugin-include-codeblock")みたいなコードインポート機能は欲しいけど、プラグインの仕組みがあるので何とかできそう)

オープンソースで公開されているので、色々コントビュートしていきたいなという感じです。

- [facebook/Docusaurus: Easy to maintain open source documentation websites.](https://github.com/facebook/Docusaurus "facebook/Docusaurus: Easy to maintain open source documentation websites.")


<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ドキュメントツール なんか個性的なデザインをつくれる柔軟性よりも、簡単に作れるとかなんとなくいい感じになるが求められてる感じ</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/944196537126567937?ref_src=twsrc%5Etfw">December 22, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Docusaurusはこんなツールです。(GitBookもそうではあった)

<https://almin.js.org/> はDocusaurusが公開された翌日にDocusaurus化したので、Facebook関係以外で初めて[Docusaurus User](docusaurus.io/en/users.html)に載せてもらいました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://t.co/x6IYfCujya">https://t.co/x6IYfCujya</a><br><br>Almin is new user of docusaurus! <a href="https://t.co/r6XHhUvEHK">pic.twitter.com/r6XHhUvEHK</a></p>&mdash; alminjs (@alminjs) <a href="https://twitter.com/alminjs/status/942896757024866304?ref_src=twsrc%5Etfw">December 18, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
