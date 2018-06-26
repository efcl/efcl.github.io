---
title: "js-primerの書き方"
author: azu
layout: post
date : 2018-06-26T18:28
category: 雑記
tags:
    - JavaScript

---

今書いてる[js-primer](https://github.com/asciidwango/js-primer "js-primer")をどのように書いてるかのメモ書きです。

- [asciidwango/js-primer: JavaScriptの入門書](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")
- [この書籍について · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/ "この書籍について · JavaScriptの入門書 #jsprimer")


今、基本文法の`Promise`についてを書いています。

- [Promise · Issue #94 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/94)

この章は[2017年9月28日のミーティング](https://github.com/asciidwango/js-primer/blob/3d9e4e84ab83d36c9f2dec4a169da07b8f07b82c/meetings/2017-09-28/README.md#%E3%82%A8%E3%83%A9%E3%83%BC)で事前に次のような流れになることを確認していました。

1. エラー/try...catch構文 @laco担当
2. Promise/Async Function @azu担当

すでにエラー/try...catch構文の章は@lacoによって書かれています。

- [Error/try...catch構文 · Issue #93 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/93)
- [例外処理の章 by lacolaco · Pull Request #320 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/320)

やっと[ユースケース: Todoアプリ](https://asciidwango.github.io/js-primer/use-case/todoapp/)も終わったので、自分の担当であるPromise/Async Functionについてを書き始めました。

## 書く流れ

ここ最近はまず`OUTLINE.md`というファイルを、各章と同じディレクトリに配置しています。

たとえば、[関数とthis · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/function-this/)では次のようにファイルを配置していました。

```
function-this/
├── OUTLINE.md
├── README.md
```

- 実際のアウトライン: <https://github.com/asciidwango/js-primer/blob/master/source/basic/function-this/OUTLINE.md>

この`OUTLINE.md`には、その章の目的やアウトライン、書くこと、書かないことをメモ書きをしているファイルです。
書いてる途中でなんでも編集するので、Alfredで`OUTLINE.md`を検索してすぐエディタで開けるようにしています。（また、OUTLINE.mdだけをmasterへ直接同期するスクリプトを定期的に叩いています)

```
targetDir="$HOME/.ghq/github.com/asciidwango/js-primer-outline"
cat << eob
<?xml version="1.0"?>
<items>
eob

for item in `find "${targetDir}" -name "OUTLINE.md"`
do
cat << EOB
<item uid="$item" arg="$item" valid="YES" autocomplete="$item" type="file">
<title>${item/${targetDir}\///}</title>
<subtitle>Open '${item}'</subtitle>
</item>
EOB
done
echo "</items>"
```

まずはこの`OUTLINE.md`に目的やどういう要素が必要かをざっとアウトラインで書き出していきます。
大体書いてるとよくわからない仕様が出てくるので、必要に応じて[ECMAScriptの仕様書](https://tc39.github.io/ecma262/)を読んでいます。

今回のPromiseでは、まず[紹介する項目](https://github.com/asciidwango/js-primer/blob/master/source/basic/async/OUTLINE.md#%E7%B4%B9%E4%BB%8B%E3%81%99%E3%82%8B%E9%A0%85%E7%9B%AE)というところで、PromiseのメソッドやAsync/Awaitについてを考えていたようです。

- <https://github.com/asciidwango/js-primer/blob/master/source/basic/async/OUTLINE.md>


書き出していると、Promiseの前に非同期処理とは何かという話が必要で有ることに気が付きました。
この章までに一切に非同期処理が出てきていないし、この書籍は初級者〜中級者ぐらいのレベルを対象にしているので、非同期処理を知らない人もいるからです。
（プログラミングをやったことはあるという前提ですが、言語や作るものによっては非同期処理が全くなくてもかけてしまうため）

- [JavaScriptのレベル別書籍のまとめ](https://gist.github.com/azu/027859e08e284cb8dfe7)

なので、まずは非同期処理、そしてエラーファーストコールバック、それから本来の目的だったPromise、最後にAsync Functionという流れになることが見えてきました。

ここで大まかな流れを[全体的な流れ](https://github.com/asciidwango/js-primer/blob/master/source/basic/async/OUTLINE.md#%E5%85%A8%E4%BD%93%E7%9A%84%E3%81%AA%E6%B5%81%E3%82%8C)として書いていたようです。

次に実際にどう書くかを考えて仮の[アウトライン](https://github.com/asciidwango/js-primer/blob/master/source/basic/async/OUTLINE.md#%E3%82%A2%E3%82%A6%E3%83%88%E3%83%A9%E3%82%A4%E3%83%B3)を書き出しています。ここで一緒にどういうサンプルコードが必要になるかも考えています。(今回はいまいち浮かばなかった)

ここでアウトラインは大体見えてきて、後は実際にどう書くかや仕様の細かいところがわからない感じになってきました。
なので、アウトラインをずっとやっていてもしょうがないので、まずは"非同期処理"についてを書き始めました。

- [feat(async): 同期処理と非同期処理 by azu · Pull Request #503 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/503)

書いているとよりはっきりとしたサンプルコードが必要になるので、サンプルコードも書きながら文章を書いています。
js-primerではMarkdown中に書いたJavaScriptのコードも[Doctest](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md#doctest)できるできるので、文法紹介レベルのコードではそのまま文章にテストを一緒に書いています。

`式 // => 値`と書くと`式`の評価結果が`値`になることをテストしている。

	```js
	const a = 42;
	console.log(42); // => 42
	```

詳しい仕組みは[Contribution Guide](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md)に書いています。

本文を書いてまた`OUTLINE.md`が流れに沿っているかを確認します。
このときにアウトラインに書いているけど本文では書かなかったものをどうするかを考えます。
実際に不要なら、アウトラインで"未使用"などのリストに移動させて、これは意図的に書かなかったということを残しておきます。
アウトラインのような一時的なデータは、アウトラインから消すよりも使わなかったと残しておくほうが後から見なおすときに便利です。

これは[アウトライナー実践入門](http://gihyo.jp/book/2016/978-4-7741-8285-8)あたりの影響を受けたアウトラインの使い方をしています。

また、アウトラインと本文の流れがあってないなら、どちらかがおかしいので揃えていきます。（厳密に揃えるというよりは、セクションごとの流れがあってればいいぐらいの感じ）

後は、このアウトラインを整えて、本文を書いてアウトラインを見直してを繰り返して章を作る感じです。

- [ ] まだ非同期の章は書き終わってない
- [非同期処理: Promise · Issue #94 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/94) に該当Issueがあるよ

----

また最近[文章の間違いに気づいたら · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/intro/feedback/)という章を作りました。
全くバグがないプログラムはないのと同様に、全く間違いのない技術書は存在しないため、[js-primer](https://github.com/asciidwango/js-primer "js-primer")でバグを見つけたときにどうすればいいかという話を書いたものです。

[Contribution Guide](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md)にもっと詳細に書いていますが、どのようなときにIssueやPRを立てればいいのかについてを書いています。

もし、[js-primer](https://asciidwango.github.io/js-primer/)を読んでいて、間違い（typoから技術的な間違い、読みにくさ）などを見つけたら、ぜひこの章を読んで行動してみてください！
