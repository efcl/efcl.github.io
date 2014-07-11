---
title: iPadのKindle.appで他のストアで買った洋書(技術書)を辞書を使って読む手順
author: azu
layout: post
permalink: /2013/0804/res3384/
dsq_thread_id:
  - 1567682786
categories:
  - 雑記
tags:
  - Books
  - English
  - iOS
---
## はじめに

iPadで洋書を読もうと思った時に、辞書が簡単に引けるといいのですが、  
選択しただけで辞書を引けるアプリが[Kindle for iPad/iPhone][1]以外に見つからなかったので、  
[Kindle for iPad/iPhone][1] で、自分の持ってるpdfやepubを読む方法についてのメモです。

他に、ワンタップで辞書が引ける(フルスクリーンじゃなくて、文章の補助的に使える)ようなアプリがあったら教えて下さい

## mobi

[Kindle for iPad/iPhone][1] で辞書を引くには、mobiファイルじゃないと使えません。  
そのため、[KindleGen][2]やcalibreなどを使って書籍をmobiファイルに変換する必要があります。

*   [「ブログ飯」のePubをKindle形式(mobi)にするメリット : 元うなぎ屋][3]
*   [EPUB→mobi変換はcalibreに限る (または「kindlegen使えねー」) &#8211; ただのにっき(2011-08-16)][4]
*   [Pdf to Kindle format (mobi and azw) &#8211; Free eBook Converter][5]
*   [EPUB to Kindle format &#8211; eBook Converter][6]

今回読みたかった本はO&#8217;Reilly本だったので、最初からmobi形式でダウンロードできるためそのままダウンロードしました。

<img src="http://efcl.info/wp-content/uploads/2013/08/Your-Products-OReilly-Media-2013-08-04-18-33-38.jpg" alt="Your Products  O Reilly Media 2013 08 04 18 33 38" title="Your Products - O'Reilly Media 2013-08-04 18-33-38.jpg" border="0" width="521" height="228" />

## 転送方法

Kindleには[Open in][7]を使ってもファイルを送る事ができますが、  
この場合、[ソーシャルネットワーク][8]機能のTwitterやFacebookにシェアが動作しないバグがあります。(恐らく書籍のメタデータがkindle.amazon.comと関連づいてないからかも)

<img src="http://efcl.info/wp-content/uploads/2013/08/IMG_1740.png" alt="IMG 1740" title="IMG_1740.PNG" border="0" width="450" height="600" />

以下のようなエラーメールが来ます

    Hello Amazon Customer,
    
    You tried to share a message from Kindle to Twitter and kindle.amazon.co.jp. The message was as follows:
     Note: メモ内容
    
    You recently tried to share a note or highlight from your Kindle. Unfortunately, we were unable to post your message. Please try again.
    
    Please note: This e-mail message was sent from a notification-only address that cannot accept incoming e-mail. Please do not reply to this message.
    

そのため、mobiファイルは[Kindleパーソナル・ドキュメントサービス][9]を使って転送します。

[Kindleパーソナル・ドキュメントサービス][9] で送ったmobiファイルなら、  
シェア機能が正常に動作します。(タイトルとかはつかないけど)

<blockquote class="twitter-tweet">
  <p>
    こういうのPredicateというのか <a href="http://t.co/BkYgsxtDpE">http://t.co/BkYgsxtDpE</a> Functions that always return a Boolean value (i.e., true or false only), are called predic&#8230;
  </p>
  
  <p>
    &mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/statuses/363705105734184960">August 3, 2013</a>
  </p>
</blockquote>



### [Functional JavaScript ][10]

今回、読んでる書籍は[Functional JavaScript ][10]ですが、  
この書籍用のkindle辞書を作った人がいます

*   [Releasing the Functional JavaScript Companion &#8211; Jake McCrary][11]

中身は、書籍に出てくる関数定義を辞書として引けるようになってる感じです。

<img src="http://efcl.info/wp-content/uploads/2013/08/IMG_1730.png" alt="IMG 1730" title="IMG_1730.PNG" border="0" width="450" height="600" />

[Kindle のおいしい使い方 @Wiki &#8211; アプリ版Kindleの辞書入替][12] を参考に、  
[Kindle for iPad/iPhone][1]にもこの辞書を導入することができます。

既存の辞書と入れ替えて置く必要があるので、例えばEnligsh(US)と入れ替えるなら、  
ダウンロードした `functional-javascript-dictionary.mobi` を `B003ODIZL6_EBOK.azw` とリネームして、  
`~/ユーザーApp/Kindoe.app/Library/eBooks/` に配置する事で、既存の辞書の代わりに使用出来ます。

## おわりに

[Kindle for iPad/iPhone][1] で 洋書を読む手順についてまとめました。

[Kindle for iPad/iPhone][1] を使う理由はタップするだけで辞書を引けるからですが、  
他に同じように辞書を引いたりできるアプリがあるならそっちを使いたい気がします。

Kindleはちょこちょこバグがあったり、コピペができなかったりするので、辞書周りに特化したPDFビューアーが欲しい。

 [1]: http://www.amazon.co.jp/gp/help/customer/display.html/ref=hp_left_ac?ie=UTF8&nodeId=200712670 "Amazon.co.jp ヘルプ: Kindle for iPad/iPhone"
 [2]: http://www.amazon.com/gp/feature.html?ie=UTF8&docId=1000234621 "KindleGen"
 [3]: http://snickerjp.blogspot.jp/2013/06/epub-to-mobi-merit.html "「ブログ飯」のePubをKindle形式(mobi)にするメリット : 元うなぎ屋"
 [4]: http://sho.tdiary.net/20110816.html "EPUB→mobi変換はcalibreに限る (または「kindlegen使えねー」) - ただのにっき(2011-08-16)"
 [5]: http://www.pdf4kindle.com/result/f715dc54-b53b-4e96-906f-67049de499a2 "Pdf to Kindle format (mobi and azw) - Free eBook Converter"
 [6]: http://www.epub4kindle.com/ "EPUB to Kindle format - eBook Converter"
 [7]: http://osxdaily.com/2012/03/25/transfer-mobi-epub-ebook-files-to-ipad/ "Open in"
 [8]: http://www.amazon.co.jp/gp/help/customer/display.html/ref=hp_left_sib?ie=UTF8&nodeId=200738300 "ソーシャルネットワーク"
 [9]: http://www.amazon.co.jp/gp/help/customer/display.html?nodeId=201017480 "Kindleパーソナル・ドキュメントサービス"
 [10]: http://shop.oreilly.com/product/0636920028857.do "Functional JavaScript "
 [11]: http://jakemccrary.com/blog/2013/07/09/releasing-the-functional-javascript-companion/ "Releasing the Functional JavaScript Companion - Jake McCrary"
 [12]: http://www22.atwiki.jp/how2kindle/pages/13.html "Kindle のおいしい使い方 @Wiki - アプリ版Kindleの辞書入替"