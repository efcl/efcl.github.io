---
title: GoogleのJavaScriptコーディングスタイルチェッカー「Closure Linter」
author: azu
layout: post
permalink: /2010/0902/res1917/
SBM_count:
  - '00020<>1355423867<>20<>0<>0<>0<>0'
dsq_thread_id:
  - 300981394
categories:
  - software
tags:
  - google
  - javascript
  - python
  - test
---
GoogleではJavaScriptは特定のコーディングスタイルで統一されるように[Closure Linter][1]という専用のスクリプトを使用しているそうです。  
[Google JavaScript Style Guide][2]([Google JavaScript Style Guide 和訳][3])という規則に従ってjsのコードは書かれていて、その規則に沿っているかを確認する`gjslint`とその規則に合うように修正する`fixjsstyle`からなるスクリプトです。

### インストール方法

[How to Use Closure Linter &#8211; Closure Linter &#8211; Google Code][4]  
pythonで書かれているのでeasy_installを使ってインストールします。  
まずはPythonをインストールしてなかったらインストールして、次にeasy_installコマンドを使うために[setuptools][5]を自分のPythonにあったものをインストールします。  
WindowsならC:Python26Scriptsに環境パスを通せば、コマンドプロンプトからeasy_installが使えるようになるので、

<pre>&#62; easy_install http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz</pre>

と打ってたらインストールできます。(パス通してないならC:Python26Scriptseasy_install でも大丈夫)

*注意 (修正済み)  
<span style="text-decoration: line-through;">現在配布されるやつはfixjsstyleが<em>TypeError: &#8216;NoneType&#8217; object is unsubscriptable</em>のようになって動かないので、</span>

<pre>easy_install -Z http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz</pre>

<span style="text-decoration: line-through;">という感じでファイルを展開するオプションをつけてインストールしてから、/python2.6/site-packages/closure_linter-2.2.1-py2.6.egg/<br />closure_linter/fixjsstyle.py の36行目にargfとなってるtypoがあるのでそれをargvにすれば動きます。</span>

### 使い方

使い方は単純で[How to Use Closure Linter &#8211; Closure Linter &#8211; Google Code][4]を見ると分かりますが、

<pre>gjslint path/to/my/file.js
fixjsstyle path/to/file1.js path/to/file2.js</pre>

のようにファイルやディレクトリを指定して実行するだけです。  
&#8211;strictオプションやディレクトリに対してまとめてやる再帰オプションもあります。またGoogleのコーディングスタイルではJsDocを使う事になってるので、それを無視するオプションもあります。

fixjsstyleはE4Xとか特殊なものは認識してないっぽいので無理に書けると構文エラーを出すようになったりしますが、  
Googleのコーディングスタイルはそこまで特殊ではないので、ちょっとした確認に使えたりして便利です。  
JavaScriptの整形には[Online javascript beautifier][6](これ自体がJavaScriptで書かれているのでEmeditorや[NILScript][7]で動かせる[gist: 453042 &#8211; クリップボードのJavaScriptコードを整形してクリップボードに返すNILScript &#8211; GitHub][8])とかと併用すると面白いかも。

**Introducing Closure Linter &#8211; Closure Tools Blog**
:   [http://closuretools.blogspot.com/2010/08/introducing-closure-linter.html][9]

 [1]: http://code.google.com/intl/ja/closure/utilities/index.html
 [2]: http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 [3]: http://cou929.nu/data/google_javascript_style_guide/
 [4]: http://code.google.com/intl/ja/closure/utilities/docs/linter_howto.html
 [5]: http://pypi.python.org/pypi/setuptools
 [6]: http://jsbeautifier.org/
 [7]: http://efcl.info/2010/0816/res1888/
 [8]: http://gist.github.com/453042
 [9]: http://closuretools.blogspot.com/2010/08/introducing-closure-linter.html "Introducing Closure Linter - Closure Tools Blog"