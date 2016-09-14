---
title: "文章をTDDする"
author: azu
layout: post
date : 2016-09-14T20:22
category: JavaScript
tags:
    - 文章
    - JavaScript
    - testing

---

# 文章のテスト

技術書とかの文書を開発するにあたってテストを先に書きたくなったという話です。

- [東京Node学園祭2015で技術文書をソフトウェア開発する話をしてきた | Web Scratch](http://efcl.info/2015/11/07/nodefest-2015/)
- [Introduction | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/)

とかの続きみたいなものです。

ここで扱う文章は、Markdownですが、構造を持った文章なら多分適応できる気がします。
具体的には[textlint](https://github.com/textlint/textlint "textlint")で扱うパーサを再利用しているので、reStructuredTextとかRe:VIEWとかHTMLも多分頑張ればできる。

## 構造化された文章

構造を持った文章とはどういうものかというと、セクションやパラグラフなどがシンタックスとして大体分かる文章の事をここでは言っています。

しかし、Markdownにはセクション(HTMLでは `<section>` タグに該当するもの)がないので、HeaderとHeaderの間を一つのセクションとして認識しています。

- [text-testing/packages/select-section at master · azu/text-testing](https://github.com/azu/text-testing/tree/master/packages/select-section "text-testing/packages/select-section at master · azu/text-testing")

## 文章が特定のキーワードを含むかテストする

実際どうやって文章をテストするかというと次のようなBDDっぽいようなテストを書きます。

- [text-testing-mocha](https://github.com/azu/text-testing/tree/master/packages/text-testing-mocha "text-testing-mocha")

このテストでは`サンプル`というワードを含むセクションが、
`単語`というキーワードを含んでいるかをテストしています。

`**` で囲んだ範囲だけをキーワードの対象にできます。

```js
const tester = require("text-testing-mocha");
const fs = require("fs");
// テストする対象の文章を読み込む
const content = fs.readFileSync("README.md", "utf-8");
tester(content, (section) => {
    // 指定したセクションが
    section("この**サンプル**が", (test) => {
        test("この**単語**を含んでいるかをテストする");
    });
});
```

例えば次の文章だと、先ほどのテストはパスします。

```
# サンプルA

ある単語を含んでいる文章なのでOK
```

しかし、次の文章だと、先ほどのテストは失敗します。

```
# サンプルB

ある???を含んでいないのでダメ
```

デフォルトでは含んでいる事をテストしていますが、第二引数で任意の判定をかけるので、含まない事も書くことができます。

```js
tester(content, (section) => {
    section("ある**サンプル**は", (it, sections) => {
        it("**unknown**を含まない", (texts, section) => {
            return texts.every(text => !section.contains(text));
        });
    });
});
```

[text-testing-mocha](https://github.com/azu/text-testing/tree/master/packages/text-testing-mocha "text-testing-mocha")は名前の通り、Mochaを使って動くDSLみたいなものです。

正直すごい雑で大したことをやっていないです。

## モチベーション

[asciidwango/js-primer: JavaScriptの入門書](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")を書いていて、一つの章が長くなると目的を見失う事がままあります。

そのため、まずその章が何を説明したいのかという目標規定文を書き、書きながらそれを何度も見なおして脇道に逸れないように注意を払う必要がありました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">目標規定文<br>-- 理科系の作文技術 <a href="https://t.co/qpHTynwfBh">pic.twitter.com/qpHTynwfBh</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/776034638942707712">September 14, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

章やセクションと言った単位で書いてる途中で、その目標が変わることはあまりないはずなので、何かガイドとなるものが欲しかったのが一つのモチベーションです。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">文章に関係しそうな文をキーワードを書き<br>その文章が何を伝えたいのかをかく目標規定文を書き<br>文章のアウトラインを考え<br>アウトラインの詳細を決める実験やコードを集め<br>もう一度アウトラインを構成し<br>アウトラインからテストを書き<br>文章に落とす</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/767584331875311617">August 22, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


### テストファースト

新しい文章を書いてて一番気が重たいのは最初の一行を書くことだと思います。
しかし、アウトラインは本文に比べてラクな気持ちで書くことができていました。

なので、最初にアウトラインをテストとして書いてみることから始めました。
そうすることで、テストが落ちます。

テストが落ちてるので、次はテストが通るように文章を書き始めれば良くなります。
そうすることで、書き始めが楽になるのではないかなという実験も兼ねて作り始めました。

```js
it("2000年は閏年", () => {
	assert(isLeap(2000));
});
```

というテストを書いて、

```js
function isLeap(year) {
	return year % 4 === 0;
}
```

というコードから書き始めるのと同じような気分でスタートできます。

また、技術書のような文書はある程度文章の構造があると思うので、入力(文章)に対する出力(伝えたい結果)はテストできてもいいんじゃないかなという期待も持っています。

実際にこのテストを取り入れて書いてみたものは次のものになっています。

- [暗黙的な型変換 · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/implicit-coercion/ "暗黙的な型変換 · JavaScriptの入門書 #jsprimer")
- [feat(implicit-coercion): 暗黙的な型変換について by azu · Pull Request #129 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/129 "feat(implicit-coercion): 暗黙的な型変換について by azu · Pull Request #129 · asciidwango/js-primer")

後は、何かと文章は一度に多くを書きすぎてしまう問題を持っている気がします。
小さなPull Requestして開発を進めるのがいいように、文章にも同じアプローチが正しいのかは今後検証していきたい気がします。
この時に、より"構造"というものを意識した書き方が必要になるのかもしれません。

分かりやすいコードも分かりやすい文章もある程度のレベルまでは、センスとかではなく技術的なアプローチで解決できる問題なのではないかなと考えています。

- [azu/text-testing: Testing library for structured texts.](https://github.com/azu/text-testing "azu/text-testing: Testing library for structured texts.")
