---
title: "JSer.infoのデータセットと統計前処理ライブラリを公開しました"
author: azu
layout: post
date : 2018-05-15T19:55
category: JavaScript
tags:
    - JSer.info

---

[JSer.info](https://jser.info/)というJavaScriptの情報サイトを7年半ほど続けています。
JSer.infoでは紹介する記事をすべてJSONのデータにして管理していて、次の記事でその記事データの処理フローについて書かれています。

- [JSer.infoを開始してから7年が経ちました - JSer.info](https://jser.info/2018/01/15/jser-info-7years/)

今回はこれらの今まで貯めたデータを簡単に扱うためのAPI?やライブラリをまとめました。

- [jser/dataset: JSer.infoのデータセットや処理ライブラリ](https://github.com/jser/dataset)

[jser/dataset](https://github.com/jser/dataset)には[JSer.info](https://github.com/jser)関係のデータやライブラリがまとめてあります。

## データの種類

JSer.infoではいくつかのデータがあり、次のような分類になっています。
歴史的に経緯で、徐々にアイテムに対する情報量が増えたり欠損している部分もあるので、後述するライブラリ経由で扱ったほうが楽です。

データのライセンスは[Creative Commons — Attribution 4.0 International — CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)で公開しています。

- Item: 紹介するサイトのこと
    - 1 Item = 1 サイト
    - すべてのデータのoriginとなるものです
    - サイトごとにタイトル、URL、登録した日付、タグなどが含まれています
    - API: <http://jser.info/source-data/items.json>
- Post: JSer.infoに投稿される記事のこと
    - 1 Post = 1 記事
    - それぞれの記事のタイトル、URL、タグ、日付などが含まれます
    - [@jser/stat][]を使うことでItemとPostを元に指定したサイトが紹介された記事を検索できます
    - API: <http://jser.info/posts.json>
- Post Item: Jser.infoに投稿された記事中のItem(サイト)のこと
    - 1 Post Item = 1 サイト
    - 基本的にはItemと同じだが、Post ItemはPost(記事)におけるカテゴリ（ヘッドラインなど）が含まれます
    - カテゴリの種類は [@jser/post-parser][] を参照してください
    - Itemを元に投稿時に編集している場合などもあるため、ItemとPost Itemは必ずしも一致するわけではありません
    - 制限: カテゴリ区別が付けられたのは[2014-08-03](https://jser.info/2014/08/03/renewal/)からであるため、それ以前のデータは含まれない
    - Postにはすべての記事は含まれるがPost Itemのデータは含まれていない
    - API: <https://jser.info/public/data/post-details.json>

[@jser/data-fetcher][]でデータとして取得し、[@jser/stat][]などの分析ライブラリに与えて利用するとある程度正規化されます。

統計データの閲覧やCSVデータの取得なら[JSer.info Data Dashboard](https://jser.info/data-dashboard/)も利用できます。

[![JSer.info Data Dashboard](https://efcl.info/wp-content/uploads/2018/05/15-1526382736.png)](https://jser.info/data-dashboard/)

JSer.infoで紹介されたキーワードの比較などがしたい場合は次のツールが利用できます。

- [JSer.info トレンド](https://jser.info/trends/)

これらのツールもここまでで紹介したデータを元にしています。

2018年5月15日時点で 8016コのItem（紹介サイト）と 383コのPost（投稿記事）のデータがあります。

それぞれのItemにはタイトル、URL、紹介文、更新日付、タグ、関連URL、発見元のURLなどが記録されています。タグや関連URLは後から付けたので初期のItemにはありませんが、紹介文などは最初のデータからすべて含まれています。

> JavaScriptやWeb開発といった点において興味深いと思った情報を一週間ほどを目処にして2-3行の説明文と共に紹介していきます。  
> -- https://jser.info/about/


```ts
export interface JserItem {
    title: string;
    url: string;
    content: string;
    date: string;
    tags?: string[];
    relatedLinks?: RelatedLinksItem[];
    viaURL?: string | null;
}

export interface RelatedLinksItem {
    title: string;
    url: string;
}
```

## Fetcher

紹介したデータは常に最新のものに更新されていて、[@jser/data-fetcher][] を使うことでデータを取得できます。（直接JSON APIを叩いても取得できます）

```ts
import { fetchItems, fetchPostDetails, fetchPosts } from "@jser/data-fetcher";
(async function(){
	// Item
	const items = await fetchItems();
	// Post
	const posts = await fetchPosts();
	// Post Details include Post Item
	const postDetails = await fetchPostDetails();
})();
```

例えば、`fetchItems()`なら次のようなデータが取得できます。

```js
[
    //...あまりにもでかいので省略
    {
        "date": "2018-05-14T11:10:39.907Z",
        "title": "What's new in Chrome DevTools (Google I/O '18) - YouTube",
        "url": "https://www.youtube.com/watch?v=mfuE53x4b3k&feature=youtu.be",
        "content": "Chromeの開発者ツールの新しい機能について。\n非同期処理やWorkerでのブレークポイントの改善、検索機能の改善、LightHouseのアップデートとView Traceのデモ、コンソールのEaget Evaluationのデモなど",
        "tags": ["Chrome", "debug", "video"],
        "relatedLinks": []
    }, {
    "date": "2018-05-14T11:40:40.805Z",
    "title": "Nest - A progressive Node.js web framework",
    "url": "https://nestjs.com/",
    "content": "Node.jsのウェブフレームワーク。\nTypeScriptで書かれていて、AngularのようにDecoratorを使った宣言的な記述を行う。",
    "tags": ["node.js", "library", "TypeScript"],
    "relatedLinks": []
}, {
    "date": "2018-05-15T00:05:36.647Z",
    "title": "実践PWA：光る電卓「Llumino PWA」の開発と技術解説 - ここぽんのーと",
    "url": "https://cocopon.me/blog/2018/05/pwa-llumino-dev/",
    "content": "ネイティブアプリだったものをPWAで再現する話。\nCSSアニメーション、Service Worker、Web App Manifest、インタラクションについて",
    "tags": ["PWA", "JavaScript", "article"],
    "relatedLinks": []
}, {
    "date": "2018-05-15T01:18:02.849Z",
    "title": "jorgebucaran/classcat: JavaScript function for conditionally concatenating CSS classes.",
    "url": "https://github.com/jorgebucaran/classcat",
    "content": "CSSのクラス名文字列を結合したり、条件付きで消したりするライブラリ。",
    "tags": ["JavaScript", "library"],
    "relatedLinks": []
}]
```

## 分析ライブラリ

これらのデータは実際に[JSer.info](https://jser.info/)自身が利用しています。
そのためいくつかデータを扱うためのライブラリがあります。

### [@jser/classifier-item-category][]

JSer.infoの学習データを使い、渡した文字列がJSer.infoではどのカテゴリに分類されるかを推論します。JSer.infoで記事を投稿する際のカテゴリ分類に利用しています。

例えば、次のようなテキストがJSer.infoではどのようなカテゴリに分類されるかを判定できます。

```js
const category = classifier.classifyText("これはGitHubで公開されている言語処理のライブラリです");
console.log(category); // => CategoryKey.SoftwareLibrary
```

ここ1年ぐらいのJSer.info上のヘッドラインやアーティクルなどの分類はこのライブラリによって自動的に行われています。

### [@jser/stat][]

JSer.infoのデータを使った統計の前処理ライブラリです。
statとついていますがそこまで統計っぽいことはできなくて、前処理ぐらいです。
ItemとPostのデータを正規化し、指定した日付のItemの取得、Postの取得、関連する記事の検索などが行えます。

JSer.infoでは次のような場所で利用しています。

* 記事の関連記事探索
* [jser/data-dashboard: JSer.info Data Dashboard.](https://github.com/jser/data-dashboard "jser/data-dashboard: JSer.info Data Dashboard.")
* [jser/trends: JSer.info トレンドビューア](https://github.com/jser/trends "jser/trends: JSer.info トレンドビューア")

JSer.infoの"関連記事を表示"の機能は、この機能を使ってクライアント側で関連記事の推定を行って表示しています。

![関連記事を表示](https://efcl.info/wp-content/uploads/2018/05/15-1526383634.png)

## まとめ

前回の記事で書いたようにnpmの`@jser`というscoped moduleが使えるようになったので、今まで既にあったライブラリなども`@jser`のscoped moduleとして公開し直しました。

- [npmで使われてないアカウントを解放してもらった | Web Scratch](https://efcl.info/2018/05/07/dispute-npm-account/)

次のリポジトリはmonorepoとなっているので、他にも便利なライブラリを作ってしまった人のPR待ってます！

- [jser/dataset: JSer.infoのデータセットや処理ライブラリ](https://github.com/jser/dataset)

[@jser/post-parser]: https://github.com/jser/dataset/tree/master/packages/%40jser/post-parser
[@jser/data-fetcher]: https://github.com/jser/dataset/tree/master/packages/%40jser/data-fetcher
[@jser/classifier-item-category]: https://github.com/jser/dataset/tree/master/packages/%40jser/classifier-item-category
[@jser/stat]: https://github.com/jser/dataset/tree/master/packages/%40jser/stat
