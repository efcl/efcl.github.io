---
title: "textlintでAsciidoc/Asciidoctorをサポートするプラグイン"
author: azu
layout: post
date : 2016-05-08T20:24
category: textlint
tags:
    - textlint
    - asciidoc
    - JavaScript
    - plugin

---

[textlint](http://textlint.github.io/ "textlint")で[AsciiDoc](http://www.methods.co.nz/asciidoc/ "AsciiDoc")/[Asciidoctor](http://asciidoctor.org/ "Asciidoctor")を限定的にサポートするプラグインを書きました。

- [textlint-plugin-asciidoc-loose](https://github.com/azu/textlint-plugin-asciidoc-loose "textlint-plugin-asciidoc-loose")

## 制限

今のところ`Paragarph`と`Str`しかサポートしていません。
他のNodeは単純に無視されるので、`Header`や`List`、`Link`などはないものと同じ扱いになっています。

簡単にいうと本文の文章をチェックするルールしか上手く動かないという感じです。

textlintのルールの大体は本文を対象としているので、[Collection of textlint rule](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · textlint/textlint Wiki")に書かれてるルールの8割ぐらいは動くような気がします。

`Header`や`List`のサポートぐらいできたら結構良さそうな気がするので、Pull Request募集中です。

- [Issues · azu/textlint-plugin-asciidoc-loose](https://github.com/azu/textlint-plugin-asciidoc-loose/issues "Issues · azu/textlint-plugin-asciidoc-loose")


現状は[AsciiDoc（Asciidoctor）の文書をtextlintで校正する - 詩と創作・思索のひろば](http://motemen.hatenablog.com/entry/2016/04/textlint-asciidoc "AsciiDoc（Asciidoctor）の文書をtextlintで校正する - 詩と創作・思索のひろば") と似ているかもしれません。

## インストール

    npm install textlint-plugin-asciidoc-loose

## 使い方

`.textlintrc`の`"plugins"`に`"asciidoc-loose"`を追加すると有効になります。

```
{
    "plugins": [
        "asciidoc-loose"
    ]
}
```

以下の拡張子をAsciidocのファイルとして認識しています。

- ".asciidoc",
- ".adoc",
- ".asc"


## 例

[JavaScript Promiseの本](https://azu.github.io//promises-book/ "JavaScript Promiseの本")は[Asciidoctorで書かれてる](https://github.com/azu/promises-book/search?l=asciidoc&q=&type=Code&utf8=%E2%9C%93)で試しに[textlint](http://textlint.github.io/ "textlint")でLintしてみたら、エラー位置も正しく普通に動きました。

![textlint with asciidoc](https://efcl.info/wp-content/uploads/2016/05/08-1462706748.png)


## 注意

最初に書いた制限にあるように`Paragarph`と`Str`のみなので、`List`の中の`Str`は例外的に無視するみたいなルールが意図と異なる結果になったりする場合もあります。

- [textlint-plugin-asciidoc-loose](https://github.com/azu/textlint-plugin-asciidoc-loose "textlint-plugin-asciidoc-loose")
