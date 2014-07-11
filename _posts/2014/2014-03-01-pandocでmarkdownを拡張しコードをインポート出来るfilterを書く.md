---
title: pandocでMarkdownを拡張しコードをインポート出来るfilterを書く
author: azu
layout: post
permalink: /2014/0301/res3692/
dsq_thread_id:
  - 2336151613
categories:
  - 雑記
tags:
  - console
  - Markdown
---
## はじめに

pandoc の `--filter` 機能を使ってMarkdown等にプリプロセスな処理を挟んで、  
Markdown上に特定の記法で書いたら自動でコードを埋め込むようにするという話です。

## pandocのfilter

pandocでは `--filter [filter script]` という感じで、フィルター処理をするスクリプトを変換時に入れることが出来ます。

詳しくは下記を参照して下さい

*   [Pandoc &#8211; Scripting with pandoc][1]

この`--filter` は以下のような処理のalias的な存在になってます。

> 変換前ファイル -> JSON -> フィルタースクリプト -> JSON -> 変換後ファイル 

フィルタースクリプトには変換前のファイルをJSONにしたものが渡されます。

つまり、フィルタースクリプトは文章をJSON(Pandoc AST)を処理するようなスクリプトを書いていけばいいことになります。

## インポートスクリプト

今回は次のようなものを変換するスクリプトを考えたいと思います。

Code Blockの中に `$import(src/example.js)` という書式で読み込みたいファイル名を指定する。

    ``` js
    $import(src/example.js)
    ```
    

これをフィルタースクリプトで変換すると、`src/example.js` のファイルの中身がそのまま展開されるようなものを作っていきます。

    ``` js
    example.jsの中身が入る
    ```
    

### 変換処理の流れ

先ほど大雑把にフィルターの流れを見ましたが、実際は下記のような事が行われています。

> pandoc -f SOURCEFORMAT -t json | filter-script | pandoc -f json -t TARGETFORMAT 

フィルタースクリプト(filter-script) にはパイプでpandoc ASTであるJSONが渡ってきて、変換した結果は標準出力に流すようなフィルタースクリプトを書く必要があります。

デバッグもこの流れで下記のようにパイプ渡しで実行しながら確認していけばいいことになります。

> pandoc -f SOURCEFORMAT -t json | filter-script 

### pandoc AST

[Pandocのドキュメント][1]にはどういうASTなのかかかれてないので実際にJSONに変換してみます。

    # header
    
    * list-1
    * list-2
    
    ``` js
    var a = 1;
    ```
    

上記のようなMarkdownを `pandoc -f markdown -t json readme.md | jq "."` という感じでJSONにしてみます。

<div class="highlight">
  <pre><span class="p">[</span>
  <span class="p">{</span>
    <span class="nt">"unMeta"</span><span class="p">:</span> <span class="p">{}</span>
  <span class="p">},</span>
  <span class="p">[</span>
    <span class="p">{</span>
      <span class="nt">"c"</span><span class="p">:</span> <span class="p">[</span>
        <span class="mi">1</span><span class="p">,</span>
        <span class="p">[</span>
          <span class="s2">"header"</span><span class="p">,</span>
          <span class="p">[],</span>
          <span class="p">[]</span>
        <span class="p">],</span>
        <span class="p">[</span>
          <span class="p">{</span>
            <span class="nt">"c"</span><span class="p">:</span> <span class="s2">"header"</span><span class="p">,</span>
            <span class="nt">"t"</span><span class="p">:</span> <span class="s2">"Str"</span>
          <span class="p">}</span>
        <span class="p">]</span>
      <span class="p">],</span>
      <span class="nt">"t"</span><span class="p">:</span> <span class="s2">"Header"</span>
    <span class="p">},</span>
    <span class="p">{</span>
      <span class="nt">"c"</span><span class="p">:</span> <span class="p">[</span>
        <span class="p">[</span>
          <span class="p">{</span>
            <span class="nt">"c"</span><span class="p">:</span> <span class="p">[</span>
              <span class="p">{</span>
                <span class="nt">"c"</span><span class="p">:</span> <span class="s2">"list-1"</span><span class="p">,</span>
                <span class="nt">"t"</span><span class="p">:</span> <span class="s2">"Str"</span>
              <span class="p">}</span>
            <span class="p">],</span>
            <span class="nt">"t"</span><span class="p">:</span> <span class="s2">"Plain"</span>
          <span class="p">}</span>
        <span class="p">],</span>
        <span class="p">[</span>
          <span class="p">{</span>
            <span class="nt">"c"</span><span class="p">:</span> <span class="p">[</span>
              <span class="p">{</span>
                <span class="nt">"c"</span><span class="p">:</span> <span class="s2">"list-2"</span><span class="p">,</span>
                <span class="nt">"t"</span><span class="p">:</span> <span class="s2">"Str"</span>
              <span class="p">}</span>
            <span class="p">],</span>
            <span class="nt">"t"</span><span class="p">:</span> <span class="s2">"Plain"</span>
          <span class="p">}</span>
        <span class="p">]</span>
      <span class="p">],</span>
      <span class="nt">"t"</span><span class="p">:</span> <span class="s2">"BulletList"</span>
    <span class="p">},</span>
    <span class="p">{</span>
      <span class="nt">"c"</span><span class="p">:</span> <span class="p">[</span>
        <span class="p">[</span>
          <span class="s2">""</span><span class="p">,</span>
          <span class="p">[</span>
            <span class="s2">"js"</span>
          <span class="p">],</span>
          <span class="p">[]</span>
        <span class="p">],</span>
        <span class="s2">"var a = 1;"</span>
      <span class="p">],</span>
      <span class="nt">"t"</span><span class="p">:</span> <span class="s2">"CodeBlock"</span>
    <span class="p">}</span>
  <span class="p">]</span>
<span class="p">]</span>
</pre>
</div>

全体を見てると、何となく、 `"t"` が HeaderやCodeBlockといったタイプを表していて、`"c"` がそのタイプのコンテンツが入ってることがわかります。

今回のフィルタースクリプトに必要なのは `CodeBlock` の所だけなのでそこに集中します。

### 書いてみる

今回Node.jsで書いたフィルタースクリプトは以下に置いてあります

*   [azu/pandoc\_import\_code_filter][2]

スクリプトはパイプでデータが受け取れて(nodeの場合はstreamで受け取る)、JSONが扱えれば何でもいいと思います。



[import.js][3] では `"t" == "CodeBlock"` なものをひたすら探索して、そのCodeBlockの中身である`"c"` をみて、先ほどの`$import(src/example.js)` というような書式で始まっていたら、そのファイルを読み込んで、`"c"` の中に展開するという事をしているだけです。

変換処理ができたら、`stringify` で文字列化してそれを標準出力に流すという感じです。

<div class="highlight">
  <pre><span class="nx">process</span><span class="p">.</span><span class="nx">stdin</span>
    <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">es</span><span class="p">.</span><span class="nx">parse</span><span class="p">())</span>
    <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">es</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">callback</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">callback</span><span class="p">(</span><span class="kc">null</span><span class="p">,</span> <span class="nx">main</span><span class="p">(</span><span class="nx">data</span><span class="p">));</span>
    <span class="p">}))</span>
    <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">es</span><span class="p">.</span><span class="nx">stringify</span><span class="p">())</span>
    <span class="p">.</span><span class="nx">pipe</span><span class="p">(</span><span class="nx">process</span><span class="p">.</span><span class="nx">stdout</span><span class="p">);</span>
</pre>
</div>

### 実行する

さきほど作成したimport.jsに実行属性をつければ、以下のようにフィルタースクリプトとして利用できます。

<div class="highlight">
  <pre>pandoc -f markdown -t markdown --filter ./import.js example.md
</pre>
</div>

実際にやってみるとmarkdownファイルにあるCodeBlockの中身が展開されてることがわかります。

<div class="highlight">
  <pre><span class="nv">$ </span>cat example.md
<span class="c"># Example</span>

Embed <span class="nb">source </span>code.

<span class="sb">```</span> js
<span class="nv">$import</span><span class="o">(</span>src/example.js<span class="o">)</span>
<span class="sb">```</span>

Ya!
<span class="nv">$ </span>pandoc -f markdown -t markdown --filter ./import.js example.md --atx-headers
<span class="c"># Example</span>

Embed <span class="nb">source </span>code.

<span class="sb">```</span> <span class="o">{</span>.js<span class="o">}</span>
module.exports <span class="o">=</span> <span class="k">function</span> <span class="o">()</span> <span class="o">{</span>
    <span class="k">return</span> <span class="s2">"Hello World"</span>;
<span class="o">}</span>;
<span class="sb">```</span>

Ya!
</pre>
</div>

今回は Markdown -> Markdown にfilterをしていますが、これはpandoc ASTを変換しているため、pandocがサポートしてる出力形式なら何でも適応出来ます。

例えば、 Markdown -> HTMLとした場合も同様にファイルが展開されていることがわかります。

<div class="highlight">
  <pre><span class="nv">$ </span>pandoc -f markdown -t html --filter ./import.js example.md --atx-headers
&lt;h1 <span class="nv">id</span><span class="o">=</span><span class="s2">"example"</span>&gt;Example&lt;/h1&gt;
&lt;p&gt;Embed <span class="nb">source </span>code.&lt;/p&gt;
&lt;pre <span class="nv">class</span><span class="o">=</span><span class="s2">"js"</span>&gt;&lt;code&gt;module.exports <span class="o">=</span> <span class="k">function</span> <span class="o">()</span> <span class="o">{</span>
    <span class="k">return</span> &quot;Hello World&quot;;
<span class="o">}</span>;&lt;/code&gt;&lt;/pre&gt;
</pre>
</div>

* * *

## おわりに

この記事ではpandocの`--filter`機能について説明しました。

filter機能を使うことで、Markdownに限らずpandocで変換出来るものに対して独自の処理を入れることができるので、Markdownの記法を拡張してみたり、独自のルールを追加できます。

pandoc ASTはただのJSONなので比較的扱いやすいので、簡単な処理を追加しやすいので使い道があるんじゃないかなと思います(拡張し過ぎは問題がありそうですが)

*   [Pandoc &#8211; Scripting with pandoc][1]
*   [azu/pandoc\_import\_code_filter][2]

 [1]: http://johnmacfarlane.net/pandoc/scripting.html "Pandoc - Scripting with pandoc"
 [2]: https://github.com/azu/pandoc_import_code_filter "azu/pandoc_import_code_filter"
 [3]: https://github.com/azu/pandoc_import_code_filter/blob/master/import.js "import.js"