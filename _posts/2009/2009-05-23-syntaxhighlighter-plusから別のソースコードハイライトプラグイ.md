---
title: SyntaxHighlighter Plusから別のソースコードハイライトプラグインへ乗り換える
author: azu
layout: post
permalink: /2009/0523/res834/
SBM_count:
  - '00003<>1355435522<>2<>0<>0<>1<>0'
dsq_thread_id:
  - 302161270
categories:
  - wordpress
tags:
  - javascript
  - wordpress
  - プラグイン
---
[SyntaxHighlighter Plus][1]は便利なのですが、ビジュアルエディタとの行き来で壊れるので、とても不便です。  
そこで別のソースコードハイライトプラグインを探したところいい感じのものがあったので、乗り換える事にしました。

**Google Syntax Highlighter for WordPress HF Edition**
:   <http://soft.fpso.jp/develop/wordpress/plugin/entry_1219.html>

HTMLモードとビジュアルモードを行き来しても大丈夫なように作成されているので、とても便利です。  
(エディタのHTMLモードでソースコードを記述したら一旦保存してください。保存する前にビジュアルモードにするとソースコードが崩れます。  
しかし両方のプラグインを入れておくのは無駄なので、SyntaxHighlighter Plusを外せるように過去記事の書き換えが必要です。

SyntaxHighlighter Plusは

<pre class="brush:html;">&#91;sourcecode language='javascript'&#93;
&#91;/sourcecode&#93;
または
&#91;javascript&#93;
&#91;/javascript&#93;</pre>

の形を直接埋め込んでいるので、[Search Regex Plugin][2]を使って手動で書き換えていきます。

[HF Edition][3]は以下のような書式なので、[sourcecode language='javascript'] → <pre class=&#8221;brush:javascript;&#8221;>のように置換していく。

<pre class="brush:html;">&#60;pre class="brush:html;"&#62;
言語名は小文字
ソースコード
&#60;/pre&#62;</pre>

これで乗り換えは完了します。

次に、[HF Edition][3]の書式は少し冗長なので、簡単に入力できるように定型文プラグインを導入します。  
[AddQuicktag][4]はHTMエディタのところに定型文を挿入できるボタンを簡単に追加できます。

**AddQuicktag**
:   <http://wordpress.org/extend/plugins/addquicktag/>

設定メニューから[HF Edition][3]の書式で書く言語別に作っておくと便利です。<figure id="attachment_843" style="width: 300px;" class="wp-caption alignnone">

[<img class="size-medium wp-image-843" title="2009-05-23-23-04-03" src="https://efcl.info/wp-content/uploads/2009/05/2009-05-23-23-04-03-300x116.png" alt="<pre>の後に改行しておくといい" width="300" height="116" />][5]<figcaption class="wp-caption-text">preの後に改行しておくといい</figcaption></figure> 
&nbsp;

**Google Syntax Highlighter for WordPress HF Edition**
:   <http://soft.fpso.jp/develop/wordpress/plugin/entry_1219.html>

**Search Regex Plugin**
:   <http://urbangiraffe.com/plugins/search-regex/>

**AddQuicktag**
:   <http://wordpress.org/extend/plugins/addquicktag/>

 [1]: http://wordpress.org/extend/plugins/syntaxhighlighter-plus/
 [2]: http://urbangiraffe.com/plugins/search-regex/
 [3]: http://soft.fpso.jp/develop/wordpress/plugin/entry_1219.html
 [4]: http://wordpress.org/extend/plugins/addquicktag/
 [5]: https://efcl.info/wp-content/uploads/2009/05/2009-05-23-23-04-03.png
