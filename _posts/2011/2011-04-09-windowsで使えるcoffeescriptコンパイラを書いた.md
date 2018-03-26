---
title: Windowsで使えるCoffeeScriptコンパイラを書いた
author: azu
layout: post
permalink: /2011/0409/res2494/
SBM_count:
  - '00017<>1355400406<>17<>0<>0<>0<>0'
dsq_thread_id:
  - 300803271
categories:
  - NILScript
tags:
  - CoffeeScript
  - javascript
  - NILScript
  - Windows
---
[CoffeeScript][1]をJavaScriptのコードに変換するコンパイラ([coffee-script.js][2]をラップしただけ)を[NILScript][3]を使って書いてみました。NILScriptはSpiderMonkeyが実行環境に利用されているので、ブラウザで実行できるようために配布されてる[coffee-script.js][2]をそのまま利用しています。

*   [CoffeeScript Compiler at master from azu/NILScript &#8211; GitHub][4]

**使い方**

[NILScript][5]が必要なので、ダウンロードしておいてください。  
CS-Compiler.ng と [coffee-script.js][6](自分で最新のものを持ってきた方がいいです)を適当な同じディレクトリに置きます。

<pre>$ng.exe CS-Compiler.ngへパス "FilePath" or "DirectoryPath"</pre>

という感じでコマンドプロンプト(自分はConsole2+nyaos)から実行して使用します。(D&Dでも使えるかも)  
コンパイルはファイル、ディレクトリどちらに対しても利用できます。  
ng.exe CS-Compiler.ngへパスをまとめたリンクファイルを作っておくと楽かも知れません。

コマンドラインの例は[utilityTools/CoffeeScript at master from azu/NILScript &#8211; GitHub][4]にも書いてあるので参考にしてください。

ファイルの更新に反応して自動的にコンパイルし直すwatchオプションがあるので次のように

<pre>$ng CS-Compiler.ng code.coffee --watch</pre>

という感じで起動すれば、code.coffeeを書き換えるたびにコマンドプロンプトにコンパイル結果が表示されます。  
watchオプション(&#8211;watch or -w)はディレクトリにも使えるようになっていて、起動してからその監視対象のディレクトリに新しくファイルを入れた場合もそのファイルが監視対象に加わるようになっています。

&nbsp;<figure id="attachment_2495" style="width: 300px;" class="wp-caption alignnone">

[<img class="size-medium wp-image-2495" title="2011-04-09-ss2" src="https://efcl.info/wp-content/uploads/2011/04/2011-04-09-ss2-300x69.png" alt="" width="300" height="69" />][7]<figcaption class="wp-caption-text">watchオプションを入れた様子</figcaption></figure> 
&nbsp;

コンパイルの実行速度ですが20Kbほどあるunderscore.coffeeが1-2秒ぐらいでコンパイルできるので、まあまあ使ってられるものだと思います。WindowsでCoffeeScriptをコマンドラインでコンパイルできて、ファイルの変更監視ができるものが見つからなかったので[kennyjのブログ(仮): CoffeeScriptをWindowsで使う][8]を見て何となく書きました。  
(Rubyのやつの使い方分からなかった[CoffeeScript インストール &#8211; sappari wiki][9])

*   [utilityTools/CoffeeScript at master from azu/NILScript &#8211; GitHub][4]
*   [CoffeeScriptの勉強(写経)をした &#8211; prog*sig][10]

 [1]: http://jashkenas.github.com/coffee-script/
 [2]: http://jashkenas.github.com/coffee-script/#scripts
 [3]: https://efcl.info/2010/0816/res1888/ "NILScriptの使い方と書き方"
 [4]: https://github.com/azu/NILScript/tree/master/utilityTools/CoffeeScript
 [5]: http://lukewarm.s151.xrea.com/nilscript.html
 [6]: https://github.com/azu/NILScript/tree/master/utilityTools/%3Chttps://github.com/jashkenas/coffee-script/blob/master/extras/coffee-script.js%3E
 [7]: https://efcl.info/wp-content/uploads/2011/04/2011-04-09-ss2.png
 [8]: http://kennyj-jp.blogspot.com/2011/01/coffeescriptwindows.html
 [9]: http://sites.google.com/site/sappariwiki/coffeescript/coffeescript-install
 [10]: ../adiary/0112
