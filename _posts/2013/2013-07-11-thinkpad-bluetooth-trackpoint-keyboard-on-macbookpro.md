---
title: ThinkPad Bluetooth TrackPoint Keyboard on MacBookPro
author: azu
layout: post
permalink: /2013/0711/res3327/
dsq_thread_id:
  - 1488709663
categories:
  - ハードウェア
tags:
  - Mac
  - キーボード
---
MacBookPro 15inchを使い始めてからずっと[レノボ・ジャパン ThinkPad USB トラックポイントキーボード(日本語)][1]<img src="http://ir-jp.amazon-adsystem.com/e/ir?t=amazon0abac-22&#038;l=as2&#038;o=9&#038;a=B002NSDWPC" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />  
を使っていました。

<img src="https://efcl.info/wp-content/uploads/2013/07/2013-07-02-21.03.05.jpg" alt="2013 07 02 21 03 05" title="2013-07-02 21.03.05.jpg" border="0" width="600" height="450" />

<img src="https://efcl.info/wp-content/uploads/2013/07/NewImage.png" alt="NewImage" title="NewImage.png" border="0" width="600" height="448" />

## ThinkPad Bluetooth TrackPoint Keyboard

*   [ThinkPad Bluetooth ワイヤレス・トラックポイント・キーボード &#8211; ThinkPadのキーボードをワイヤレスに。最高峰のキーボードをあなたに。| 特集 | Lenovo (JP)][2]
*   [ユ ー ザ ー ・ ガ イ ド][3]

最近になって、[レノボ・ジャパン ThinkPad Bluetooth ワイヤレス・トラックポイント・キーボード][4]<img src="http://ir-jp.amazon-adsystem.com/e/ir?t=amazon0abac-22&#038;l=as2&#038;o=9&#038;a=B00DLK4GQA" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />が発売されたので購入しました。

<img src="https://efcl.info/wp-content/uploads/2013/07/2013-07-02-20.14.16.jpg" alt="2013 07 02 20 14 16" title="2013-07-02 20.14.16.jpg" border="0" width="600" height="450" />

<img src="https://efcl.info/wp-content/uploads/2013/07/2013-07-12-09.06.16.jpg" alt="2013 07 12 09 06 16" title="2013-07-12 09.06.16.jpg" border="0" width="600" height="450" />

### on MacBoookPro

*   上の画像は**足**(チルトスタンド)を立ててある状態です
*   キーボードが薄くなった + 足の高さが小さくなったので、MacbookPro上で足を立てた状態で使えるようになった。
*   アームを置く場所がなくなったので、MacBookProのトラックパッドと同時に使えるようになった
*   普通に打ってる感じだとトラックパッドの誤爆はなかったので、併用できる。
*   代わりに後述するFnキーの動作がかなり微妙
*   [レノボ・ジャパン ThinkPad USB トラックポイントキーボード(日本語)][1]より音は少し出やすくなった気がするけど打鍵感は悪くない
*   420gほどで小さいのでひざ上に置いて使うのもあり

### Macでの動作について

このBTキーボードはWindows以外の動作が保証されていませんが、一応動作します。  
しかし、[ThinkPad トラックポイントキーボードをMacで使うための設定 | Dream Seed][5] で紹介されているように、Fnキーがちょっと残念仕様です。

<blockquote class="twitter-tweet">
  <p>
    ThinkPad Bluetooth ワイヤレス・トラックポイント・キーボードのFnロックが掛からない件、サポートに問い合わせてみたらFnロックはWindowsでしか使えないとのこと。他のOS(Linuxとか)では使えないとのこと。ショボイなぁ&#8230;。
  </p>
  
  <p>
    &mdash; Michi (@michi_tt) <a href="https://twitter.com/michi_tt/statuses/351232006912344064">June 30, 2013</a>
  </p>
</blockquote>



<blockquote class="twitter-tweet">
  <p>
    Thinkpad Bluetoothキーボードはマルチメディアキーがデフォルトで、F1-F12キーを押すにはFnキーと同時押しが必要だって!? BIOS切り替えのようなことも当然できないしDIPスイッチもない。ダメキーボードだな。
  </p>
  
  <p>
    &mdash; kuromabo_(:3｣∠)_ (@kuromabo) <a href="https://twitter.com/kuromabo/statuses/353386344162131968">July 6, 2013</a>
  </p>
</blockquote>



マルチメディアキーがデフォルトなので、F1,2,3等はボリューム関係の操作になります。F4,5,6は認識できなくて、F7は印刷機能になってしまいます。  
認識できるキーに関しては[KeyRemap4MacBook][6]などでリマップできますが…、F7,8,9などはKeyRemap4MacBookのEventViewerで何もキーが飛んでこないので認識すらできない感じです。  
（Bluetoothキーボードをハックするアプリとかあるのかな?)

Fnを押した状態だとF1..F12等が普通に使えますが、MacだとデフォルトをF1,2,3にするような設定ができない仕様になってます。  
(これに対して、[0b58442\_tp\_compact\_usb\_bt\_kb\_ja.pdf][7] にUSBキーボードはF1,2,3のキーの方が標準になっていると書いてあるので、普通に扱えるようです)

また、ミドルクリックの反応が旧USB トラックポイントキーボードと少し違う感じがします。

ミドルクリック + トラックポイントでスクロールできるようにするには、[KeyRemap4MacBook][8] の `MiddleClick+CursorMove to ScrollWheel` を有効にすればできますが、  
この時、BTキーボードだと `ミドルクリック + トラックポイント => ミドルクリック+カーソル移動` みたいにミドルクリックが押されてしまって、リンク上から移動しようとするとミドルクリックでリンクを開いてしまったりすることがあります。

少しミドルクリックを押しこむ感じで `ミドルクリック + トラックポイント` するとホイールスクロールだけになるので、反応のレベルが違う問題なのかもしれないですが、これをどうにか設定で緩和する方法があるといいのですが…(誰か教えてくれると助かります…)

## 運用

上記のFnキーの問題があるので、少しUSBキーボードの時とは使い方を変えました

*   Fnキーを基本的に使わないようにした
*   元からShift+F6のリネームやF10のアプリケーションウィンドウ とか一部しか使ってなかった
*   IDEとかのショートカットの割り当て方の変更 + トラックパッドを使ったショートカットに変更
*   F10のアプリケーションウィンドウのMisson Controlは多用してたので、代わりに半角/前回に割り当てた
*   [KeyRemap4MacBook で アプリケーションウィンドウを半角/全角 に割り当てる][9]

Fnキーを使わない前提ならまあ何とかなる感じです  
(注記: Fn + F1 => F1 なので、Fn押しながらなら普通にFキー押せます)

## まとめ

*   キーボードの感触自体は悪く無いです(入力遅れとかは特に感じないです)
*   バッテリーは30日もって、2-3時間で充電が完了します(普通のMicro USBなのであんまり困る事はないです)
*   BluetoothキーボードなのでMacbookProの貴重なUSBポートに空きを作れます
*   MacだとFnキーの問題があるので、ファンクションキーを多用する人は避けてUSBの方を使ったほうが無難です
*   ミドルクリックだけUSB版とは挙動が若干違う気がします
*   使えるキーが減る問題は結構大きい気がするので物好きでない人はUSB版の方を薦めます

## 参考

Macでの利用

*   [ThinkPad トラックポイントキーボードをMacで使うための設定 | Dream Seed][5]
*   [奇人記？ Mac de トラックポイントキーボード！][10]

Windowsでの利用

*   [ThinkPad Bluetooth ワイヤレス・トラックポイント・キーボードを使ってみた～ThinkPad Twistとの違いも &#8211; 元「なんでもエンジニ屋」のダメ日記][11]

マニュアル

*   [0b58442\_tp\_compact\_usb\_bt\_kb\_ja.pdf][7]

 [1]: http://www.amazon.co.jp/gp/product/B002NSDWPC/ref=as_li_tf_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=B002NSDWPC&linkCode=as2&tag=amazon0abac-22
 [2]: http://shopap.lenovo.com/jp/landingpage/accessories/thinkpad-bwtk/ "ThinkPad Bluetooth ワイヤレス・トラックポイント・キーボード - ThinkPadのキーボードをワイヤレスに。最高峰のキーボードをあなたに。| 特集 | Lenovo (JP)"
 [3]: http://download.lenovo.com/ibmdl/pub/pc/pccbbs/options/0b58442_tp_compact_usb_bt_kb_ja.pdf "ユ ー ザ ー ・ ガ イ ド"
 [4]: http://www.amazon.co.jp/gp/product/B00DLK4GQA/ref=as_li_tf_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=B00DLK4GQA&linkCode=as2&tag=amazon0abac-22
 [5]: http://www.dream-seed.com/weblog/archives/2013/07/29124/ "ThinkPad トラックポイントキーボードをMacで使うための設定 | Dream Seed"
 [6]: https://pqrs.org/macosx/keyremap4macbook/index.html.ja "KeyRemap4MacBook"
 [7]: http://download.lenovo.com/ibmdl/pub/pc/pccbbs/options/0b58442_tp_compact_usb_bt_kb_ja.pdf "0b58442_tp_compact_usb_bt_kb_ja.pdf"
 [8]: https://pqrs.org/macosx/keyremap4macbook/index.html.ja "KeyRemap4MacBook - OS X用のソフトウェア"
 [9]: https://gist.github.com/azu/5971692 "KeyRemap4MacBook で アプリケーションウィンドウを半角/全角 に割り当てる"
 [10]: http://guerolian.blog96.fc2.com/blog-entry-608.html "奇人記？ Mac de トラックポイントキーボード！"
 [11]: http://nasunoblog.blogspot.jp/2013/07/thinkpad-bluetooth-thinkpad-twist.html "ThinkPad Bluetooth ワイヤレス・トラックポイント・キーボードを使ってみた～ThinkPad Twistとの違いも - 元「なんでもエンジニ屋」のダメ日記"
