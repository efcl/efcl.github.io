---
title: 'Google AJAX Language APIを試してみる[翻訳]'
author: azu
layout: post
permalink: /2008/0325/res115/
SBM_count:
  - '00002<>1355356074<>2<>0<>0<>0<>0'
dsq_thread_id:
  - 302690768
categories:
  - 雑記
tags:
  - google
  - javascript
  - 翻訳
---
<a href="http://code.google.com/apis/ajaxlanguage/" target="_blank">Google AJAX Language API</a>は、誰でも簡単に言語の翻訳を行えるようにするJavaScript APIで、JavaScript勉強中ということで試してみる。  
JavaScriptはほとんど書けないのでかなり地味。

<!--more-->

[【レビュー】Googleからの贈り物 &#8211; Google AJAX Language APIでカンタンに翻訳サイトを][1]

[Developer&#8217;s Guide &#8211; Google AJAX Language API &#8211; Google Code][2]

を参考に書いてみた。  
まあ、単なる勉強として書いたのでレベルの低さは気にしない。

[xml]

< !DOCTYPE HTML PUBLIC &#8220;-//W3C//DTD HTML 4.01//EN&#8221; &#8220;http://www.w3.org/TR/html4/strict.dtd&#8221;>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />


  


<input id="source" type="text" /> <button onclick="translate()">英訳</button>

<div id="translated">
</div>

[/xml]

テストページ[Google Translation API][3]

 [1]: http://journal.mycom.co.jp/articles/2008/03/21/ajaxlang/index.html
 [2]: http://code.google.com/apis/ajaxlanguage/documentation/
 [3]: https://efcl.info/test/Google_translation_api.htm
