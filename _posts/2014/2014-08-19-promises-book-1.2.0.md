---
title: "JavaScript Promiseの本Ver1.2とAsciidoctor"
author: azu
layout: post
date : 2014-08-19T08:23
categories:
    - 雑記
tags:
    - JavaScript
    - books
    - Asciidoctor
    - asciidoc

---

## Promise本

以前[JavaScript Promiseの本を書きました | Web Scratch](https://efcl.info/2014/0623/res3943/ "JavaScript Promiseの本を書きました | Web Scratch")でも書いていましたが、
電子版である意味は常に書籍が更新できるという点が大きいです。

そのため、[JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本") も
semverな感じでアップデートしていっています。

どのような変更があったかはGitHub Releaseにかかれているのでそちらを参考にして下さい。(RSSで購読も出来ます)

- [Releases · azu/promises-book](https://github.com/azu/promises-book/releases "Releases · azu/promises-book")

現在Promise本はver1.2ですが、[1.0.0...1.2.0](https://github.com/azu/promises-book/compare/1.0.0...1.2.0 "Comparing 1.0.0...1.2.0 · azu/promises-book")では以下のような変更が主なところです。

----

### 1.0.1 (2014-06-23)

* "[金を払えないという重大なバグ](https://twitter.com/yuya_takeyama/status/480969917496176641)"を修正 ([7909005](https://github.com/azu/promises-book/commit/790900504cdf4368e424e695c4cde39d7d015b94 "7909005"))

### 1.1.0 (2014-06-25)

[コラム: Promiseは常に非同期?](http://azu.github.io/promises-book/#promise-is-always-async "コラム: Promiseは常に非同期?") への加筆

* **column-promise-resolve:**
  * 同期と非同期の混在の問題についてを追加 ([de5f8208](https://github.com/azu/promises-book/commit/de5f82082909484155d8aa94005b676a9f65c2e2))
  * 非同期で実行されているコードの解説を追加 ([ea8ca5d6](https://github.com/azu/promises-book/commit/ea8ca5d6f38ae8fde5d9f1b4e4b7521c1b261e63))

### 1.1.3 (2014-07-31)

HTML5 Rocksの記事を日本語版へと変更 ([1a98dab](https://github.com/azu/promises-book/commit/1a98dabeb5f80ad7cea05a0e79da3e36c5cf8c3e "1a98dab") , closes #181)

- [JavaScript Promises: There and back again - HTML5 Rocks](http://www.html5rocks.com/ja/tutorials/es6/promises/ "JavaScript Promises: There and back again - HTML5 Rocks")

### 1.2.0 (2014-08-13)

[Asciidoctor 1.5.0](http://asciidoctor.org/news/2014/08/12/asciidoctor-1-5-0-released/ "Asciidoctor 1.5.0")に対応しました。テーマの表示の変更なども含まれています

- [Asciidoctor 1.5.0対応 · Issue #182 · azu/promises-book](https://github.com/azu/promises-book/issues/182 "Asciidoctor 1.5.0対応 · Issue #182 · azu/promises-book")

----

という感じですが、1.2.0ではPromise本の生成に使ってる[Asciidoctor](http://asciidoctor.org/ "Asciidoctor")の1.5がリリースされたため、そちらに対応しました。

## Asciidoctor 1.5

- [Asciidoctor 1.5.0 “Bleeding Heart” released! | Asciidoctor](http://asciidoctor.org/news/2014/08/12/asciidoctor-1-5-0-released/ "Asciidoctor 1.5.0 “Bleeding Heart” released! | Asciidoctor")

AsciidoctorはAsciidocのruby実装ですが、1.5ではかなり大幅な変更が含まれています。

主な所をみていくと以下のような感じです。

- Graphviz等のDiagramsの対応
- DocBook 5がデフォルトに(今までは4.5)
- デフォルトテーマの変更
- `\b` のユニコード対応
- JavaやLaTex等の依存がないRubyだけでPDFやePubの生成が可能に
    - PDF [asciidoctor/asciidoctor-pdf](https://github.com/asciidoctor/asciidoctor-pdf "asciidoctor/asciidoctor-pdf")
    - ePub [asciidoctor/asciidoctor-epub3](https://github.com/asciidoctor/asciidoctor-epub3 "asciidoctor/asciidoctor-epub3")
- Opalを使ったAsciidoctorのJavaScript版である[asciidoctor.js](https://github.com/asciidoctor/asciidoctor.js "asciidoctor.js")のリリース

破壊的な変更もいくつかあってCompat modeを使うと一応維持できますが、移行方法について詳しく書かれています。

- [Migrating to Asciidoctor 1.5.0](http://asciidoctor.org/docs/migration/ "Migrating to Asciidoctor 1.5.0")

Promise本も幾つか問題が起きていたので以下で対処しています

- [Asciidoctor 1.5.0対応 · Issue #182 · azu/promises-book](https://github.com/azu/promises-book/issues/182 "Asciidoctor 1.5.0対応 · Issue #182 · azu/promises-book")

DocBook 5がデフォルトになった影響で `[[id]]` が誤認されて[asciidoctor-fopub](https://github.com/asciidoctor/asciidoctor-fopub "asciidoctor-fopub")で[PDFがビルドできない問題](https://github.com/azu/promises-book/commit/3e57e37f89af50cd01dca4c4ada30afc05c3c5df "PDFがビルドできない問題")や、テーマのrevert的な対処をしています。

Asciidoctor 1.5のデフォルトテーマは[Use open source fonts in the default stylesheet · Issue #879 · asciidoctor/asciidoctor](https://github.com/asciidoctor/asciidoctor/issues/879 "Use open source fonts in the default stylesheet · Issue #879 · asciidoctor/asciidoctor")のIssueで上げられているようにオープンソースのCJKフォントをデフォルトに指定してきます。

Noto Sans や Droid Sans Monoとか指定されて嬉しい人がいるのかよくわかりませんが、font-weightが全体的に細くなって読みにくい感じだったので、[フォントだけを変更したcssを別途読み込むように修正](https://github.com/azu/promises-book/commit/3ca8267caa29e4937f84a4f2ec46bb62b980bbed "style(html): Asciidoctor 1.5.0のデフォルトテーマを変更 · 3ca8267 · azu/promises-book")してあります。

`font-family`を書き換えてるだけなので、別途CSSを[docinfo file](http://asciidoctor.org/docs/user-manual/#docinfo-attributes-and-file-names "docinfo file")から読み込んで`!important`するだけでもいいかもしれません。

最近GitHubのテーマも変わりましたが恐らくそれに合わせてる感じのテーマな感じがします。

また、今まではMarkdownと同じように、バッククオートの前後にスペースをいれなくても問題ありませんでしたが(アスキー文字の場合は元から開けないといけない)、これが厳密に CJKV に対応したため表示が崩れることがあります。

```
日本語では、このように`some_code()`と書くことがあります。
```

以下のように誤爆した感じになってしまう。

![img](https://cloud.githubusercontent.com/assets/2227862/3387643/17fd2ab8-fc80-11e3-93a8-126e660fce4d.png)

開発者さんに聞いた所意図した動作で、 CJKV への対応のためという感じでした。
これは単純にスペースを開ける方法や、別の書き方で回避できるとのことでした。

```
日本語では、このように `some_code()` と書くことがあります。
日本語では、このように##`some_code()`##と書くことがあります。
日本語では、このように++pass:[some_code()]++と書くことがあります。
日本語では、このように++some_code()++と書くことがあります。
```

Promise本ではスペースをあけて書くように書き換えてあります。

- [Asciidoctorのinline literal passthroughの仕様の変更について by vzvu3k6k · Pull Request #173 · azu/promises-book](https://github.com/azu/promises-book/pull/173 "Asciidoctorのinline literal passthroughの仕様の変更について by vzvu3k6k · Pull Request #173 · azu/promises-book")
- [Breaking changes in inline code literal? · Issue #984 · asciidoctor/asciidoctor](https://github.com/asciidoctor/asciidoctor/issues/984#issuecomment-47624565 "Breaking changes in inline code literal? · Issue #984 · asciidoctor/asciidoctor")

最近のPromise本の変更点はこんな感じでした。

- [azu/promises-book](https://github.com/azu/promises-book "azu/promises-book")
