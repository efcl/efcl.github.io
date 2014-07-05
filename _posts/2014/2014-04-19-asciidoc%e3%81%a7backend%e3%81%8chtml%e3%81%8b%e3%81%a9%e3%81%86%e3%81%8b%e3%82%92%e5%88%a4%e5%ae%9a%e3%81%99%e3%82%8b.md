---
title: AsciiDocでbackendがHTMLかどうかを判定する
author: azu
layout: post
permalink: /2014/0419/res3864/
dsq_thread_id:
  - 2623353123
categories:
  - その他
tags:
  - asciidoc
  - HTML
---
[AsciiDoc][1]ではHTMLも直接埋め込む事が出来ます。

    ++++
    <iframe src="http://ghbtns.com/github-btn.html?user=azu&repo=promises-book&type=fork&count=true&size=large"
      allowtransparency="true" frameborder="0" scrolling="0" width="120" height="30"></iframe>
    <iframe src="http://ghbtns.com/github-btn.html?user=azu&repo=promises-book&type=watch&count=true&size=large"
      allowtransparency="true" frameborder="0" scrolling="0" width="170" height="30"></iframe>
    ++++
    

しかし、このHTMLの埋め込みはbackend(出力形式)がHTML以外の時にあると逆に困ってしまいます。  
(PDFとかの場合パースエラーの原因になったりする)

そのため、backendに何が指定されたかを判定して埋め込む必要があります。

Asciidocには[System Macros][2]というものでif分岐が出来ます。

定義されてるかどうかの判定をする`ifdef`と

    ifdef::<attribute>[]
    trueの時
    endif::</attribute><attribute>[]
    

変数の比較をして判定する`ifeval`があります。

`rs458`が2かどうか

    ifeval::[{rs458}==2]
    :
    endif::[]
    

* * *

本題に戻って`ifeval`を使って`--backend`で指定されたものを判定すれば、  
htmlに出力してるかがわかります。

    ifeval::["{backend}" == "html5"]
    ++++
    <a href="https://github.com/azu/promises-book/" style="position: fixed; top: 0; right: 0;border: 0;"><img style="border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" /></a>
    ++++
    endif::[]
    

という感じで書いておけば、`$ asciidoctor -b html5 index.adoc`でビルドした時だけ埋め込むことが出来ます。

*   [chore(index): html5のバックエンドの時のみHTMLを埋め込むように · aefe32e · azu/promises-book][3]

 [1]: http://www.methods.co.nz/asciidoc/ "AsciiDoc"
 [2]: http://www.methods.co.nz/asciidoc/chunked/ch21.html#_system_macros "System Macros"
 [3]: https://github.com/azu/promises-book/commit/aefe32ea259dcc86d1415f5dd2f7405f3c2ed362 "chore(index): html5のバックエンドの時のみHTMLを埋め込むように · aefe32e · azu/promises-book"