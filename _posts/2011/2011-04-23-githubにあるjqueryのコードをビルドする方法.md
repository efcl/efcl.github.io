---
title: GithubにあるjQueryのコードをビルドする方法
author: azu
layout: post
permalink: /2011/0423/res2558/
SBM_count:
  - '00000<>1355383628<>0<>0<>0<>0<>0'
  - '00000<>1355383628<>0<>0<>0<>0<>0'
  - '00000<>1355383628<>0<>0<>0<>0<>0'
  - '00000<>1355383628<>0<>0<>0<>0<>0'
dsq_thread_id:
  - 300971216
categories:
  - javascript
tags:
  - jQuery
  - Node.js
  - 開発環境
---
普段、jQuery(本体)のコードを見たりする時にウェブだと見づらいので、ローカルにダウンロードして見ているのですが、[jquery/jquery &#8211; GitHub][1]からpullしたものにはビルドしたjQuery.jsが含まれていないので、ビルドできる環境を整えてみました。

以前は[Downloading jQuery &#8211; jQuery JavaScript Library][2]に書いてあるようにAntを使ってどのOSでもビルドできたようですが、現在はuglifyやJSLintを使う都合上かも知れませんがNode.jsがビルド環境に必要となっています。  
[jQueryの開発コードをビルドして使う (Win & Mac) &#8211; Rewish][3] の後半がNode必須になった感じ。

環境はWindows7 6bitで、cygwinでもNode使う事ができるのでやればできるみたいですが、VM上のUbuntuをつかって作業しました。   
参考

*   [WindowsからVM上のLinuxをSSH経由で利用する開発環境の構築 | Web scratch][4]

**必要なもの**

*   git
*   node.js環境

jQueryのコードはgithubからcloneして持ってきます。   
*git clone &#8211;recursive *[*https://github.com/jquery/jquery.git*][5] するのが楽ですが、他の方法も[jquery/jquery &#8211; GitHub][1]に書いてあります。

<div id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode">$<span class="rem"># git clone --recursive https://github.com/jquery/jquery.git</span>
<span class="rem"># githubからサブモジュールも含めて再帰的にclone</span>
Initialized empty Git repository <span class="kwrd">in</span> /media/sf_D_DRIVE/MyDocuments/Dropbox/workspace/toybox/lib/jquery/.git/
remote: Counting objects: 18336, done.        
remote: Compressing objects: 100% (5977/5977), done.        
remote: Total 18336 (delta 13065), reused 17001 (delta 11817)        
Receiving objects: 100% (18336/18336), 12.53 MiB | 1.04 MiB/s, done.
Resolving deltas: 100% (13065/13065), done.
Submodule <span class="str">'src/sizzle'</span> (git://github.com/jquery/sizzle.git) registered <span class="kwrd">for</span> path <span class="str">'src/sizzle'</span>
Submodule <span class="str">'test/qunit'</span> (git://github.com/jquery/qunit.git) registered <span class="kwrd">for</span> path <span class="str">'test/qunit'</span>
Initialized empty Git repository <span class="kwrd">in</span> /media/sf_D_DRIVE/MyDocuments/Dropbox/workspace/toybox/lib/jquery/src/sizzle/.git/
remote: Counting objects: 1422, done.        
remote: Compressing objects: 100% (622/622), done.        
remote: Total 1422 (delta 903), reused 1169 (delta 734)        
Receiving objects: 100% (1422/1422), 526.34 KiB | 243 KiB/s, done.
Resolving deltas: 100% (903/903), done.
Submodule path <span class="str">'src/sizzle'</span>: checked out <span class="str">'4bcc09702d6dadfd0b90c7de3c8b206e97ff97f4'</span>
Initialized empty Git repository <span class="kwrd">in</span> /media/sf_D_DRIVE/MyDocuments/Dropbox/workspace/toybox/lib/jquery/test/qunit/.git/
remote: Counting objects: 995, done.        
remote: Compressing objects: 100% (751/751), done.        
remote: Total 995 (delta 415), reused 661 (delta 241)        
Receiving objects: 100% (995/995), 158.30 KiB | 98 KiB/s, done.
Resolving deltas: 100% (415/415), done.
Submodule path <span class="str">'test/qunit'</span>: checked out <span class="str">'9887663380693009874e8c76f0bf77a921931766'</span>
$<span class="rem"># cd jquery/</span>
$<span class="rem"># ls</span>
GPL-LICENSE.txt  MIT-LICENSE.txt  Makefile  README.md  build  speed  src  test  version.txt
$<span class="rem"># make</span>
<span class="rem"># makeコマンドでjQuery.jsとjQuery.min.jsを生成</span>
Building selector code from Sizzle
Building ./dist/jquery.js
Minifying jQuery ./dist/jquery.min.js
Checking jQuery against JSLint...
JSLint check passed.
jQuery build complete.
$<span class="rem"># ls dist/</span>
<span class="rem"># jquery/distディレクトリに生成される</span>
jquery.js  jquery.min.js</pre>
</div>

*make*コマンドでJSLintや圧縮がかかったものが生成されますが、*make jquery*とすることでそれらをかけないで生成することもできます。   
細かい事は[jquery/jquery &#8211; GitHub][1]に載っています。

 [1]: https://github.com/jquery/jquery
 [2]: http://docs.jquery.com/Downloading_jQuery#If_you.27re_using_ant:
 [3]: http://rewish.org/javascript/jquery_dev_build
 [4]: https://efcl.info/2011/0420/res2588/
 [5]: https://github.com/jquery/jquery.git
