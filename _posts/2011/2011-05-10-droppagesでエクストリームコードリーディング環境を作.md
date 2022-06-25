---
title: DropPagesでエクストリームコードリーディング環境を作る
author: azu
layout: post
permalink: /2011/0510/res2744/
SBM_count:
  - '00028<>1355444965<>28<>0<>0<>0<>0'
dsq_thread_id:
  - 300808953
categories:
  - javascript
  - 雑記
tags:
  - blog
  - code
  - WebStorm
  - wiki
---
[DropPages][1]というDropboxにテンプレートファイルとMarkdownで書いたコンテンツ(記事)を置いて公開できるサービスを利用してどこでもコードリーディングができる環境を作って使っています。

### [DropPages][1]について

[DropPages][1]の導入方法

詳細は[Getting started | DropPages.com][2]を見る。

1.  [DropPages][1]から好きなThemeファイルのzipをダウンロードする
2.  zipを展開すると<Theme名>.droppages.com というフォルダができるので、   
    このフォルダ毎、Dropboxフォルダの好きな所に置く
3.  <Theme名>..droppages.com の<Theme名>を自分の使いたいサブドメイン名にする。   
    たとえばうちは[http://sig.droppages.com/][3]なので、sig.droppages.comというフォルダ名にリネーム。
4.  Dropboxフォルダ内なら、**右クリック->Dropbox->このフォルダを共有**からDropboxのサイトが開いて、   
    コラボレータのメールアドレスを入力する画面になる。
5.  招待するコラボレーターに<server1@droppages.com>と入力すれば共有は完了。

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/05/image_thumb10.png" border="0" alt="image" width="240" height="162" />][4]

後は、その共有したフォルダ名のアドレス(sig.droppages.comなら[http://sig.droppages.com/][3])にアクセスできるようになるまで待つだけ(結構かかります。一日とか)

**Droppagesの構造**

[FolderLayout | DropPages.com][5]

<div>
  <pre id="codeSnippet" class="csharpcode">sig.droppages.com
├Content[DIR]
│  └記事となるmarkdownファイル
├Public[DIR]
│  └css, js ,画像などのテンプレートから呼び出すリソース
└Templates[DIR]
   └テンプレート.html</pre>
</div>

<div>
  どのテンプレートも3つのフォルダからできていて、それぞれの意味は上のような感じです。
</div>

<div>
  Publicは単純にリソースをおけて、テンプレートやコンテンツから/ ルートでアクセスできます。
</div>

<div>
  テンプレートは思ったより頑張れるので、<a href="http://droppages.com/Getting+started/Managing+pages">Managing pages | DropPages.com</a>や既存のテーマを参考にいじってみるのがいいと思います。
</div>

<div>
  簡単にまとめると
</div>

<table border="0" cellspacing="0" cellpadding="2" width="526">
  <tr>
    <td style="text-align: center;" width="200" valign="top">
      <p>
        <strong>構文</strong>
      </p>
    </td>
    
    <td width="324" valign="top">
      <p style="text-align: center;">
        <strong>意味</strong>
      </p>
    </td>
  </tr>
  
  <tr>
    <td width="200" valign="top">
      <p>
        :テンプレート名
      </p>
    </td>
    
    <td width="324" valign="top">
      テンプレート間でのテンプレート内容を継承
    </td>
  </tr>
  
  <tr>
    <td width="200" valign="top">
      @変数名 変数に入れたい文字列 <br />@変数名 <br />変数に入れたい文字列のブロック <br />複数行でもいい(Bodyとかに使われてる)
    </td>
    
    <td width="324" valign="top">
{% raw %}
      変数名の定義はコンテンツ、テンプレートどちらでもできる。 <br />変数名に入れたものはテンプレートから参照して使う。 <br />{{変数名|プレースホルダ}} で参照できて、プレースホルダ部分は変数が定義されてないときの初期値を決められる。
{% endraw %}
    </td>
  </tr>
  
  <tr>
    <td width="200" valign="top">

{% raw %}
      @Titleや@Bodyなど <br />{{PrimaryNavigation}} <br />{{SecondaryNavigation}} <br />{{Navigation}} <br />{{Breadcrumbs}}
{% endraw %}
    </td>
    
    <td width="324" valign="top">
{% raw %}

      最初から決められてる特殊な変数がある。 <br /><a href="http://droppages.com/Getting+started/Managing+templates">Managing templates | DropPages.com</a> <br />テンプレートを書くときに、子のコンテンツを列挙する{{SecondaryNavigation}}やサイトマップ的な{{Navigation}}やパンくずリスト的な{{Breadcrumbs}}などは結構工夫すればブログみたいになる
{% endraw %}
    </td>
  </tr>
  
  <tr>
    <td width="200" valign="top">
      _drafts フォルダ
    </td>
    
    <td width="324" valign="top">
{% raw %}

      _drafts という名前でコンテンツ内にフォルダを作れば、それはドラフト扱いになり公開されない。 <br />フォルダじゃなくても_と先頭につければ{{Navigation}} <br />などの列挙対象にはならない気がする。(直接URLたたくとアクセスできるけど)

{% endraw %}
    </td>
  </tr>
</table>

自分のサイトは[azu/4-Code-Reading &#8211; GitHub][6]でコンテンツ共々テンプレートも公開しているので、適当に見てください。(アクセス解析のコードとは固有になっちゃってるけど)

Droppagesのコンテンツ(記事)はtxtファイルに、以下のような感じで書いていって保存すると、Dropboxで同期されて自動でWebサイト側が更新される仕組みなってます。

<div id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode">@Title タイトル
@Body
記事内容書ける
Markdown記法を使える
これ以外にも変数は定義できるけど</pre>
</div>

<div>
  自分がDroppagesを気に入った理由にMarkdown記法で書けるという所が結構大きくて、これが結構便利です。 <br />デモなどではtxtファイルになっていますが拡張子がmdなmarkdownファイルでも問題なく扱えます!
</div>

<div>
  Markdownの書き方は
</div>

*   [Markdown &#8211; 閾ペディアことのは][7]
*   [Kawaz &#8211; Markdownの使用方法][8]

などを見るとよいと思います。

MarkdownならiPadの[Textastic][9]など対応してるアプリもいろいろある。

### コードリーディング

Droppagesを使えば、markdownファイルに書いて保存するだけど自動的にWebに公開するという手順が簡単に行えます。   
で、なんでコードリーディングサイトにしようと思ったのかは、元々Markdownなどでコードリーディング記録を書きたいなーと思っててGithub pages + Sphinxなどいろいろ試してたんですが面倒な手順が多くて、そこに自動的にMarkdownを変換して公開できるサービスとして[DropPages][1]がきたわけです。

コードリーディングの環境には[WebStorm][10]を使っています。   
WebStormなら[Markdown][11]プラグイン(EAPだと動かなかったりするのでWebstormは正式版を使う)があるのと、WebStormには構文解析をおこなってコードの構造がつかみやすいのでコードリーディング自体に最適だと思います。   
(ブックマークや変数、関数、参照先へのジャンプ、アウトラインなどなど)

WebStormはファイルの分割表示を持ってるので、左でコードを読んで、右でMarkdown形式でコードリーディングの記録を書いていくという事もできます(EmacsとかVimとかでも似たような環境作れると思う)

[<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/05/image_thumb11.png" border="0" alt="image" width="240" height="146" />][12][<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/05/image_thumb12.png" border="0" alt="image" width="240" height="146" />][13][<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/05/image_thumb13.png" border="0" alt="image" width="240" height="146" />][14]Markdownのプレビューもその場でできる。

少し戻って、テンプレートはいろいろいじって、記事毎にいろいろメタ情報の変数を定義させるようにすれば、普通のブログと遜色ないぐらいの記事が簡単に作れます。   
毎回その変数定義を手入力だと面倒なので、WebStormのテンプレートからファイルを作るFile Templeteの機能を使って以下のような感じにしています

*   [DroppagesのFile Templete — Gist][15]

実際に入力して出てくる感じは下のようなもの。後はBody以下を書いていくだけ。

<div id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode">@Title Underscore.js
@description 便利関数の詰め合わせライブラリUnderscore.jsのコードリーディング
@keywords Underscore.js
@Dates 2011年05月03日
@Body
[Underscore.js] 1.1.6のソースコードを見ていく

Table of Contentsによるとそれぞれジャンル分けされているので、それに沿って読む。</pre>
</div>

<div>
  実際に<a href="http://sig.droppages.com/Code+Reading/underscoreJS">Underscore.jsのコードリーディング</a>をしていて、Markdownはコードリーディングととても相性がよいと思いました。
</div>

<div>
  > が先頭にあれば引用になったり(一行preみたいな使い方できる) <br />タブがスペース4つで字下げすれば、<a href="http://www.kotono8.com/wiki/Markdown#.E3.82.B3.E3.83.BC.E3.83.89.E3.83.96.E3.83.AD.E3.83.83.E3.82.AF">コードブロック</a>になるので編集中もとても読みやすくコードを書ける。(他の記法のように何かで囲むなどをしなくていいので見通しがよい) <br />後はMarkdownの<a href="http://www.kotono8.com/wiki/Markdown#.E3.83.AA.E3.83.B3.E3.82.AF_2">リンク</a>管理ですが、これも一カ所にリンクをまめて書くことができるので、上手くやればいい感じにリンクを書ける。
</div>

<div>
  実際の自分のコードリーディング手順は以下のような感じで
</div>

1.  コードはブロックぐらいで適当に区切って読んでいく
2.  \## ブロックタイトル とMarkdownにブロックのタイトルをつける(テンプレートで自動的に目次生成をしているため)
3.  コードを読みながらコード本体にコメントとして、コードの解説やアノテーションなどを書いていく
4.  コードブロックを読みながら、気になったことや使い方や例などはMarkdownに書いていく
5.  コードブロックを読み終わったら、そのコードブロックをMarkdownにコピペする(先ほどのように字下げしてpreにする)
6.  1から繰り返し
7.  全部読み終わったら[Docco][16]でコンパイルして、コード全体とコメントを見比べしやすいHTMLを生成する。(コード本体にコメントを書いていくのはこれも目的にしているため)

\## でサブタイトルをつけて区切っていくのは[英語が読めない人向け、英語技術書の読み方 | Web scratch][17]でやっていたような章ごとに本を読んでいくのと同じ感覚でやっています。   
また[Functions of undersocore.js &#8211; 4 Code Reading][18]など適当なページを見てもらうと分かると思いますが、h2,h3などのタグには自動的に内部リンクを振って目次を作るためにもサブタイトルをつけています。

また、コンテンツは先ほどから言っているようにmarkdownで書けるので、githubとも相性がいいです。(githubはmdファイルを変換して表示してくれる)   
どこまで読んだかをgitで管理できたり、githubなどを使って複数人で共有したりもできるのでいろいろな使い道があると思います。また仮に[DropPages][1]が消滅しても手元にはコンテンツファイルが残るので、markdownならそこそこメジャーなので逃げ道もいろいろあると思います(htmlに変換もできるし)

[Dropbox][19]+[DropPages][1]+[Markdown][20]+[GitHub][21]+[WebStorm][10](任意のエディタ)

= 素敵なコードリーディング生活

ここから[Dropboxに登録][19]すれば250MBのボーナスがうんぬんです。

*   [azu/4-Code-Reading &#8211; GitHub][6] (自分のサイトのテンプレートなど)
*   [Home | DropPages.com][1]

 [1]: http://droppages.com/
 [2]: http://droppages.com/Getting+started
 [3]: http://sig.droppages.com/ "http://sig.droppages.com/"
 [4]: https://efcl.info/wp-content/uploads/2011/05/image10.png
 [5]: http://droppages.com/Getting+started/FolderLayout
 [6]: https://github.com/azu/4-Code-Reading
 [7]: http://www.kotono8.com/wiki/Markdown
 [8]: http://www.kawaz.org/projects/kawaz/wikis/Markdown%E3%81%AE%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95/
 [9]: http://ryosblog.net/6682
 [10]: http://www.jetbrains.com/webstorm/
 [11]: http://plugins.intellij.net/plugin/?webide&id=5970
 [12]: https://efcl.info/wp-content/uploads/2011/05/image11.png
 [13]: https://efcl.info/wp-content/uploads/2011/05/image12.png
 [14]: https://efcl.info/wp-content/uploads/2011/05/image13.png
 [15]: https://gist.github.com/951733
 [16]: http://jashkenas.github.com/docco/
 [17]: https://efcl.info/2010/1126/res2111/
 [18]: http://sig.droppages.com/Code+Reading/underscoreJS/Functions
 [19]: http://db.tt/GfwDjDR
 [20]: http://ja.wikipedia.org/wiki/Markdown
 [21]: https://github.com/
