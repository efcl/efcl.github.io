---
title: Jetpack SDKで生成したアドオンの名前にスペースなど入れる方法
author: azu
layout: post
permalink: /2010/0905/res1923/
SBM_count:
  - '00002<>1355297093<>2<>0<>0<>0<>0'
dsq_thread_id:
  - 303485677
categories:
  - Jetpack
tags:
  - Jetpack
  - エラー
---
<div class="quote">
  <blockquote title="コード整形とシンタックスハイライトするjetpackを作った - Cherenkovの暗中模索にっき" cite="http://d.hatena.ne.jp/Cherenkov/20100904/p2">
    <p>
      xpiの名前変えたいのだけどよくわからん。パッケージフォルダ名とpackage.jsonを書き換えて同名にしてもcfx xpiでエラーでる。
    </p>
    
    <p>
      <cite><a href="http://d.hatena.ne.jp/Cherenkov/20100904/p2">コード整形とシンタックスハイライトするjetpackを作った &#8211; Cherenkovの暗中模索にっき</a></cite>
    </p>
  </blockquote>
</div>

Jetpack SDKでcfx xpiによってxpiファイルを生成して、そのアドオンをインストールするとpackage.jsonのnameに書かれていた名前がアドオンの名前になります。  
しかし、package.jsonのnameはパッケージの名前なので大文字やマルチバイト文字やスペースなどが使えず自由に名前をつけようとするとエラーになります。  
名前を自由につけるにはpackage.jsonに<tt>fullName</tt>というキーを追加して、そこにスペースや大文字(マルチバイトをつけるとエラーになった…)を使った名前をつけることで、cfx xpiによって生成されたアドオンの名前に反映されます。

<pre>{
 "id": "jid0-xxxxxxxxx",
 "version": "0.1",
 "description": "test",
 "name": "test-package",
 "fullName" : "THIS is TEST package",
 "author": "azu"
}</pre>

実際の生成の流れとしてはpackage.jsonにfullNameがなかったら、nameの中身がfullNameとして扱われるようになっているみたいです。  
fullNameに日本語入れる方法はよく分かりませんでした。ユニコードエスケープしてもエラーになる。  
生成されるxpiファイル自体のファイル名はnameの中身が使われるようです。

**Google Web Historyに見たページを自動記録するアドオン(Jetpack SDK) | Web scratch**
:   [http://efcl.info/2010/0809/res1872/][1]

**Labs/Jetpack/JEP/31 &#8211; MozillaWiki**
:   [https://wiki.mozilla.org/Labs/Jetpack/JEP/31#Packages][2]

 [1]: http://efcl.info/2010/0809/res1872/ "Google Web Historyに見たページを自動記録するアドオン(Jetpack SDK) | Web scratch"
 [2]: https://wiki.mozilla.org/Labs/Jetpack/JEP/31#Packages "Labs/Jetpack/JEP/31 - MozillaWiki"