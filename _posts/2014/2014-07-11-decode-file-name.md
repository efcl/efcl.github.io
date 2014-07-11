---
title: WordpressからJekyllに移行した時のファイル名がエンコードされてしまう件
author: azu
layout: post
categories:
    - 雑記
tags:
    - Jekyll
    - Wordpress

---

前回、[Jekyllベースのブログに移行しました。 | Web Scratch](http://efcl.info/2014/07/06/new-blog/ "Jekyllベースのブログに移行しました。 | Web Scratch")で
WordpressからJekyllへと移行しました。

その時に、[benbalter/wordpress-to-jekyll-exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter "benbalter/wordpress-to-jekyll-exporter")を使い
Wordpressの記事をJekyllのMarkdownファイルとしてエクスポートしたものを使いました。

このエクスポートしたファイルは何故か日本語などはURLエンコードされたものになっていて、
動作的には問題ないですが、表示的に気持ち悪いのでURLデコードしてファイル名にそのまま日本語を使うように変更しました。

* [refactor(post): URLエンコードされていたファイル名を戻した · 7c2b925 · efcl/efcl.github.io](https://github.com/efcl/efcl.github.io/commit/7c2b925409ab8420bcd878487fd9b5b317557088 "refactor(post): URLエンコードされていたファイル名を戻した · 7c2b925 · efcl/efcl.github.io")

以下のようなシェルスクリプトを書いて `*.md` のファイルを対象にファイル名をURLデコードして戻しました。

```sh
#!/bin/sh

find * -type f -name "*.md" -print0 | while read -r -d '' file;
do
   decorded=`echo "$file" | nkf --url-input`
   mv "$file" $decorded
done
```

* [shellscript decode filename](https://gist.github.com/azu/e70c713973168f0e6eef "shellscript decode filename")

これで、記事ファイルを一覧した時にパッと見て分かりやすくなった気がします。

![screenshot](http://monosnap.com/image/MxAx28cr32VyJnnf1FjBYD6awPAReE.png)

Jekyllのブログエディタみたいのでいい感じのものはないのかなー(今はWebStormを使って書いてる)