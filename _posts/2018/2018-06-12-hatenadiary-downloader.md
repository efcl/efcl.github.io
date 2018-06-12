---
title: "はてなダイアリーの記事をダウンロードして1枚のHTMLにまとめるツール"
author: azu
layout: post
date : 2018-06-12T19:15
category: JavaScript
tags:
    - はてな
    - JavaScript
    - はてなダイアリー

---

はてなダイアリー(not はてなブログ)の記事をダウンロードしてローカルで見られるツールを書きました。

- [azu/hatenadiary-downloader: はてなダイアリーの記事を一括ダウンロードするCLI](https://github.com/azu/hatenadiary-downloader/)

[t-wadaの日記](http://d.hatena.ne.jp/t-wada/)を古い記事からさかのぼるように読みたいと思った時、はてなダイアリーは記事を古い順に表示する方法がありませんでした。

- [はてなダイアリーで記事を古い日付から並べなおす事はできますか… - 人力検索はてな](http://q.hatena.ne.jp/1179013193)

そのため指定したはてなダイアリーの記事をすべてダウンロードしてローカルでソートしたHTMLを作って表示することにしました。

[neue cc - はてなダイアリー to HTML](http://neue.cc/2010/03/09_246.html)を参考に[hatenadiary-downloader](https://github.com/azu/hatenadiary-downloader)というCLIを書きました。


## 使い方

Node.js 10以上が必要です。

### インストール

`npx`を使えばインストールと同時に実行できます。

```
npm install hatenadiary-downloader -g
# or
npx hatenadiary-downloader [option]
```

次のように標準入力にはてなダイアリーのURLを、`--output`に出力するHTMLのパスを書きます。
デフォルトでは古い順にソートされます。

```
Usage
  $ hatenadiary-downloader <URL>

Options:
  --sortOrder "ascending" or "descending" (default: ascending)
  --output -o  output path

Examples
  $ hatenadiary-downloader "http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]" -o ./index.html
```

## 使い方の例


特定のダイアリーをすべてダウンロードしたい場合はTOPページのURLを指定すればOKです。

    hatenadiary-downloader "http://d.hatena.ne.jp/hatenadiary/" -o ./index.html

特定のダイアリーの特定のカテゴリ`[XP]`のみをダウンロードしたい場合は次のような検索ページのURLを指定すればOKです。

    hatenadiary-downloader "http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]" -o ./index.html

## ダウンロードしたHTML

例えば次のように[t-wadaの日記](http://d.hatena.ne.jp/t-wada/)をすべてダウンロードしてできた`t-wada.html`は4.5MBほどのHTMLになります。

    hatenadiary-downloader "http://d.hatena.ne.jp/t-wada/" -o ./t-wada.html

あとはダウンロードした`t-wada.html`を好きなブラウザで開けばオフラインでも読むことができます。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">t-wada.htmlを読んでいる <a href="https://t.co/L0YAF0ljbd">pic.twitter.com/L0YAF0ljbd</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1006483665336000512?ref_src=twsrc%5Etfw">June 12, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## 実装

[t-wadaの日記](http://d.hatena.ne.jp/t-wada/)を古い順に読みたくて作っただけなので、その場の直感で1時間ぐらいかけて作りました。

[はてなダイアリー ダウンロード - Google 検索](https://www.google.com/search?q=%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%80%E3%82%A4%E3%82%A2%E3%83%AA%E3%83%BC+%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89)でググったところ、[neue cc - はてなダイアリー to HTML](http://neue.cc/2010/03/09_246.html)が出てきて、そういえばこれなんか過去にやったことがあるのを思い出しました。

- [はてなダイアリーの記事をダウンロードしてローカルで読む | Web Scratch](https://efcl.info/2010/0502/res1664/)

Windowsじゃないから似たようなものを作るかと思って`hatenadiary-downloader`というプロジェクト名を[mkdev](https://gist.github.com/azu/09dd6f27f52e2e8d9978)しました。

- [JavaScriptの素振りする技術](http://azu.github.io/slide/2015/year-end/javascript-swing.html)

[neue cc - はてなダイアリー to HTML](http://neue.cc/2010/03/09_246.html)から`Program.cs`をダウンロードして、`hatenadiary-downloader`のなかにいれて、`Program.cs`をみながらどういうメソッドにするかを考えました。

最初は、まず記事をダウロードする`fetchArticle`が必要で、記事からコンテンツ領域をパースする`parseContent`が必要で、クロールするから前の記事を取る`fetchPrevioutArticle`が必要という感じで次のような空関数をexportする[src/hatenadiary-downloader.js](https://github.com/azu/hatenadiary-downloader/tree/master/src)というファイルを作りました。
(いわゆるライブラリのエントリポイント)

```js
// それぞれ空の関数をexportした
module.exports.parseContent = parseContent;
module.exports.fetchPrevioutArticle = fetchPrevioutArticle;
module.exports.fetchArticle = fetchArticle;
```

ここでまずは`fetchArticle`を実装しようとして記事をみたら、はてなダイアリーは1つの記事に複数のコンテンツがあるサイトであることを思い出しました。
(具体的には1日の中に複数の記事がある)

- <http://d.hatena.ne.jp/t-wada/20040823>

そして、`Program.cs`を見るとなにやらコンテンツをパースするにはDOMをパースしないといけなさそうだったので、`yarn add jsdom`してJSDOMをインストールしました。

- [jsdom/jsdom: A JavaScript implementation of the WHATWG DOM and HTML standards, for use with node.js](https://github.com/jsdom/jsdom)

JSDOMのREADMEでURLからdocumentどうやって得るんだろ?と検索してたら[fromURL()](https://github.com/jsdom/jsdom#fromurl)というそのままのメソッドがあったので、これを使うことにしました。([fromURL()](https://github.com/jsdom/jsdom#fromurl)を使うとURLのHTMLをパースして`window`などよく見るDOM APIを使えるオブジェクトを返してくれる)

ここで、先ほどexportしていた関数は若干ずれているのがわかったので次のような空関数のexportに変更しました。

```js
// URLからdocumentオブジェクトを取得する
const fetchDocument = (URL) => {};
// documentからcontents(それぞれの記事のHTML)を返す
const parseContents = (document) => {};
// documentから前の記事リスト(前の記事)のURLを取得する
const getPrevArticleListURL = (document) => { };
module.exports.fetchDocument = fetchDocument;
module.exports.parseContents = parseContents;
module.exports.getPrevArticleListURL = getPrevArticleListURL;
```

なんとなく形は見えてきたのであとは実装して、組み合わせばURLからdocument取得 -> コンテンツをパースしてどっかに貯める -> 次のURL -> 繰り返すでクロールできるでしょうと思って中身を実装し始めました。

通信があるCLIのデバッグは面倒なことが多く手動でいちいちテストするのも大変なので、大雑把なテストケースを書いてそこを見ながら開発することにしました。
(最終的なテストは<https://github.com/azu/hatenadiary-downloader/blob/master/test/hatenadiary-downloader-test.js>にある)

次のようにまずは`fetchDocument`でURLから`document`オブジェクトを取得する部分を書きました。
適当にコンソールログをテストに書いて`document`をとれるのが確認できました。

```js
// こんな感じでOKだった
const fetchDocument = (URL) => {
    return JSDOM.fromURL(URL, {
        userAgent: "hatenadiary-downloader+",
    }).then(dom => {
        return dom.window.document;
    });
};
```

同時に`fetchDocument `で取得した`documentPを使って、`getPrevArticleListURL`が前のページのURL(クロールはTOPページ = 先頭からおこなうため)が取れるかのテストを書きました。

実際にページへアクセスして`<link rel="prev" href="/t-wada/searchdiary?of=3&word=%2A%5BXP%5D" title="前の3日分">`の`rel=prev`を見ればいいことがわかったので、この値を直接比較しています。

```js
const assert = require("assert").strict;
const { fetchDocument, parseContents, getPrevArticleListURL } = require("../src/hatenadiary-downloader.js");

describe("hatenadiary-downloader", () => {
    it("should fetch article list and prev url", async () => {
        const document = await fetchDocument("http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]");
        const prevURL = getPrevArticleListURL(document);
        assert.equal(prevURL, "http://d.hatena.ne.jp/t-wada/searchdiary?of=3&word=%2A%5BXP%5D");
    });
});
```

`fetchDocument`で`document`オブジェクト(これはブラウザの`document`とほぼ同じ)が手に入ってるのであとは`querySelector`メソッドなどを使って適当に実装しています。

`parseContents`の実装も`<div class="day">`の中身がそれぞれのコンテンツということがわかった時点で、その要素を含む配列を返せば通るテストを書いて、実装しました。
(あとで邪魔なものを削ったり、リンクを絶対URLに修正する処理を追加した)

```js
    it("should fetch and parse contents", async () => {
        const document = await fetchDocument("http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]");
        const contents = parseContents(document);
        contents.forEach(content => {
            assert.ok(content.includes(`div class="day"`));
        });
    });
```

ここまで実装できたら、あとはURLからドキュメント取得*1 -> パース -> コンテンツを貯める -> 前のページのURLを取得 -> 1へループと書けばクロールできそうと思って、[src/cli.js](https://github.com/azu/hatenadiary-downloader/blob/master/src/cli.js)を書き始めました。

最終的にはCLIから指定してURLを渡したらコンテンツをまとめたものを作るだろうと思っていたので、`cli.js`はCLI用のエントリポイントみたいなものです。

`cli.js`を実装しながら、**URLからドキュメント取得**は非同期処理なので逐次的な非同期ループが必要だ！ということに気が付きました。

最初にダウンロードする全部のURLを知ることができないため、`Promise.all`で一発みたいなことはできずに、非同期 -> パース -> 非同期 -> パースを逐次的にやらないといけなくてとても面倒そうです。

ここで、そういえば[Async iterators](https://github.com/tc39/proposal-async-iteration)ってこういうときに使うものだったような気がすると思い出しました。
Generatorは普段全然使わなかったため書き方がピンと来ませんでしたが、適当にググって`Symbol.asyncIterator`を実装すればどうにかなるっぽいことがわかりました。

* [ES2018: asynchronous iteration](http://2ality.com/2016/10/asynchronous-iteration.html "ES2018: asynchronous iteration")
* [Async iterators and generators - JakeArchibald.com](https://jakearchibald.com/2017/async-iterators-and-generators/ "Async iterators and generators - JakeArchibald.com")

実際に動かしながらじゃないとわかりにくそうだったので、[Getting Started with Asynchronous Iterators and Generators ― Scotch](https://scotch.io/tutorials/getting-started-with-asynchronous-iterators-and-generators)から`Symbol.asyncIterator`を実装したコードをコピペしました。

[src/hatenadiary-downloader.js](https://github.com/azu/hatenadiary-downloader/tree/master/src)に、`Symbol.asyncIterator`を実装したasync iterableオブジェクトを返す関数が追加できれば、あとは`for await of`でイテレーションすればTOPページからどんどん過去のコンテンツをクロールすることができそうです。

イメージ:

```js
const allContents = [];
// いい感じのAsyncIteatorオブジェクト作って返す
// ReaderといってたのはFetch with Streamを思い浮かべたから
const fetchAsyncIterator = createFetchReader();
// このasync iteratorはnext()するたびに、次のページのdocumentを返す
for await (const document of fetchAsyncIterator)  {
	// documentからcontentsを取り出して貯める
   allContents.push(...parseContents(document));
}
// 最後にHTMLにまとめて出力
```


非同期でイテレーションする(複数回通信する)ということは正しく動いてるかを確認することが面倒だということです。
とりあえず数回ループが回ってることが確認できれば良いので、次のようなテストを書いて指定回数ループした結果、取得できた`document`が意図した感じなのをチェックしました。

```js
    it("should async iterator for createFetchReader", async () => {
        const iterator = createFetchReader("http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]");
        let count = 0;
        const URLs = [];
        for await (const document of iterator) {
            count++;
            URLs.push(document.location.href);
            if (count > 3) {
                break;
            }
        }
        assert.ok(count, 3);
        assert.deepEqual(URLs, [
            'http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]',
            'http://d.hatena.ne.jp/t-wada/searchdiary?of=3&word=%2A%5BXP%5D',
            'http://d.hatena.ne.jp/t-wada/searchdiary?of=6&word=%2A%5BXP%5D',
            'http://d.hatena.ne.jp/t-wada/searchdiary?of=9&word=%2A%5BXP%5D'
        ]);
    });
```

そしてAsyncIteatorオブジェクトを返す`createFetchReader`を実装しました。

```
const createFetchReader = (URL, { intervalTimeMs }) => {
    let prevURL = URL;
    return {
        [Symbol.asyncIterator]: () => {
            return {
                async next() {
                    const currentURL = prevURL;
                    if (!currentURL) {
                        return { done: true }
                    }
                    const document = await fetchDocument(currentURL);
                    prevURL = getPrevArticleListURL(document);
                    return {
                        done: false,
                        value: document
                    }
                }
            }
        }
    }
};
```

テストで動いてそうなのを確認しましたが、なんかたまにエラーがおきる現象に遭遇しました。
そういえば[neue cc - はてなダイアリー to HTML](http://neue.cc/2010/03/09_246.html)のコードにタイムアウトするから待つというような処理があったことを思い出して、それぞれのループにはインターバルをもたせたほうが良さそうと思って追加することにしました。

```
// neue cc - はてなダイアリー to HTMLから抜粋
            retry:
                try
                {
                    var url = HatenaUrl + prev.Attribute("href").Value;
                    Console.WriteLine(url); // こういうの挟むのビミョーではある
                    return XElement.Load(new SgmlReader { Href = url });
                }
                catch (WebException) // タイムアウトするので
                {
                    Console.WriteLine("Timeout at " + DateTime.Now.ToString() + " wait 15 seconds...");
                    Thread.Sleep(TimeSpan.FromSeconds(15)); // とりあえず15秒待つ
                    goto retry; // 何となくGOTO使いたい人
                }
```    

クローラーといえば[岡崎市立中央図書館事件](https://ja.wikipedia.org/wiki/%E5%B2%A1%E5%B4%8E%E5%B8%82%E7%AB%8B%E4%B8%AD%E5%A4%AE%E5%9B%B3%E6%9B%B8%E9%A4%A8%E4%BA%8B%E4%BB%B6)メソッドなので、1秒に1回程度のアクセスになるように1秒のwaitを入れることしました。

あとはcli.jsに、この`createFetchReader`を使ってページの`document`を取得して、コンテンツを取り出してを繰り返す`for await of`でループするだけです。

最終的に次のような感じでループをまわしています。

```js
// MIT © 2018 azu
"use strict";
const { createFetchReader, parseContents, joinArticleContents, getPrevArticleListURL } = require("./hatenadiary-downloader.js");
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const cli = {
    /**
     * @param {string} URL hatena diary URL
     * @param {string } outputPath output Ptah
     * @param {string } [sortOrder] ascending or descending
     */
    async run(URL, outputPath, sortOrder = "ascending") {
        assert.ok(URL !== undefined, "URL needed");
        assert.ok(outputPath !== undefined, "--output is needed");
        const allContents = [];
        let lastDocument = null;
        const fetchAsyncIterator = createFetchReader(URL, {
            intervalTimeMs: 1000
        });
        for await (const document of fetchAsyncIterator) {
            console.log("Process: " + document.location.href);
            lastDocument = document;
            if (sortOrder === "ascending") {
                allContents.push(...parseContents(document).reverse());
            } else {
                allContents.push(...parseContents(document));
            }

        }
        if (sortOrder === "ascending") {
            allContents.reverse();
        }
        const indexContent = joinArticleContents(lastDocument, allContents);
        fs.writeFileSync(path.resolve(process.cwd(), outputPath), indexContent, "utf-8");
    }
};
module.exports.cli = cli;
```

あとはこのcli.jsを実際のコマンドとして呼べるように、コマンドライン引数のパーサなどの処理を[meow](https://github.com/sindresorhus/meow)を使って書いて`cli.run()`すれば完成です。

ソースコードは以下に公開されています。

- [azu/hatenadiary-downloader: はてなダイアリーの記事を一括ダウンロードするCLI](https://github.com/azu/hatenadiary-downloader/blob/master/test/hatenadiary-downloader-test.js)

## 感想

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">十数年前のt-wadaさんの日記を読んでるけど、高頻度で酔いつぶれてる。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1006036325596721152?ref_src=twsrc%5Etfw">June 11, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- はてなダイアリーはTwitterみたいだなと読んでて思った
- `id:user`で文中にmentionを書いたり(CCするmention)、トラックバックで公式RTみたいな通知だったり、コメントでThreadなやりとりだったり
- 特に最初のころは1記事が140文字程度の内容が多かったのでTwitterっぽいと思った
- あと診断アプリみたいなのがたまにでてくるのも
- 途中でTwitter(2008?9?年)がでてきたぐらいから、書く内容も変化してきて報告形式(登壇、執筆)になってきた気がする(これはやること自体が変わったのもありそう)
- おそらくTwitterらしい内容はTwitterへ書くように変わっていったのだと推測
- 書き方の形式が変わっていたのもあり、少し先にピンをおいてそこまで書いて次のピンをおいてそこまで書いていくみたいな印象受けた
- 最初にアウトラインを書いて中を書いていくような印象
- 最初の頃は散文で前後に直接的なつながりはなかったり、あったり、酔いつぶれてたり。けど時系列というつながりがあって思考の流れのようなもの見えていた気がした

ということを思いながら"実装"の話を書いていた。

こういう思考の流れを書き出すことはたまにやってる。

- [power-assertの記事が出来るまで](http://azu.github.io/slide/hasakurajs/power-assert.html)
- [JavaScriptライブラリの気になる実装をどうやって見ていくか | Web Scratch](https://efcl.info/2014/0209/res3658/)
- [ECMAScriptの仕様/プロポーザルの調べ方を知る | Web Scratch](https://efcl.info/2018/03/07/ecmascript-usage/)

こういった思考の流れをブログに書くことって少なくなっていってるんだなという実感を得た気がする。
Twitterはストックではないので、その場その場で書いてもその流れをなにかの形でまとめないと流れとしてみるのは難しい。書いたことで満足してしまうので、なんでこういう結果になったんだろう過程はGitのコミットログにも残ってないから見つけるのが難しい。

最近は何かを調査して修正する時は、ある種のADR(Architecture Decision Records)のようなテンプレの項目(問題、目的、解決案、試したこと、結果など)を項目を書いて、項目の中身を埋めながら調査していることが多い。

- [Blog | Documenting Architecture Decisions | Relevance](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions "Blog | Documenting Architecture Decisions | Relevance")
- [アーキテクチャの意思決定を記録する Lightweight Architecture Decision Records について - Tbpgr Blog](http://tbpgr.hatenablog.com/entry/2017/02/22/080000 "アーキテクチャの意思決定を記録する Lightweight Architecture Decision Records について - Tbpgr Blog")
- ADRは[Living Documentation by design, with Domain-Driven Designを読んだ | Web Scratch](https://efcl.info/2017/05/12/living-documentation-ddd/)で知った

今どきの結果はGitやIssue、PRに残ってることが多いので、過程は意識して残さないとなくなってしまうのかなと思いました。
