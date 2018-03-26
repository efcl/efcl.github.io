---
title: '[Firefox3]Tab Mix Plusを代替えアドオンで補う'
author: azu
layout: post
permalink: /2008/0802/res288/
SBM_count:
  - '00006<>1355286281<>4<>0<>1<>1<>0'
dsq_thread_id:
  - 301726934
categories:
  - vista
  - アドオン
tags:
  - Firefox
  - アドオン
  - タブ
  - 設定
---
[Tab Mix Plus][1]はFirefoxのタブ関係を総合的に設定できる人気のあるアドオンですが、その他のアドオンやテーマと競合を  
起こしやすいものでもあります。  
自分の環境では他のアドオンと競合しているので、落ち着くまで他のアドオンで補っていきます。  
うちでは[Tab Mix Lite CE][2]が問題なかったので[Tab Mix Lite CE][2]をベースに細かいアドオンを追加していきます。

*   [Tab Mix Lite CE][2][Tab Mix Lite CE 3.0 の日本語化][3]

Tab Mix系の派生はいくつかありますが、機能の多さ順だと  
[Tab Mix Plus][1] > [Tab Mix Lite CE][3] > [Tab Mix Lite][4]  
となっています。

Tab Mix Lite CEに含まれていない細かい機能は

*   [Tab Mix Plusと同等の機能を持つ拡張機能][5]

を参考に追加していきます。

追加した機能として

1.  タブまたはタブバー上でのクリック(ミドルクリックなど)の挙動  
    →[Tab Clicking Options][6]
2.  リンクをミドルクリックで開いた時にバックグラウンドで開く(フォーカスの反転)  
    →[MClickFocusTab][7]
3.  最後のタブを閉じた時にウィンドウを閉じない。  
    →[keyconfig][8]

ctrl+wを連打しているとウィンドウが閉じてしまう事があるので、[keyconfig][8]でCtrl+Wのタブを閉じるのスクリプトを

<pre class="brush:javascript;">if (gBrowser.mTabs.length != 1) {
BrowserCloseTabOrWindow();
}
</pre>

とすれば大丈夫そう。  
逆にウィンドウも閉じるようにしたいのなら(多分初期設定はそうなってると思うけど)

<pre class="brush:javascript;">BrowserCloseTabOrWindow();
if (gBrowser.mTabs.length == 1 &#038;&#038; gBrowser.currentURI.spec == "about:blank") {
    if ("BrowserCloseWindow" in window)
        BrowserCloseWindow();
    else
        closeWindow(true);
}
</pre>

みたいな感じでOKかと。

他のタブを強化するアドオンは結構前に書いた[Firefoxでタブの使い勝手を大きく変える5つのアドオン | Web scratch][9]をほとんどそのまま使っています。(今のところ競合してないと思う。)

Tab Mix Plusが問題なく動く人は特に関係ないエントリーですが、Tab Mix Plusじゃ機能が多すぎるのでスリムアップするのもいいかもしれません。  
なんだかんだいってもTab Mix Plusは他のアドオンの作者も意識して対応してくれることが多いので、使い勝手のいいアドオンだと思います。

 [1]: http://mozilla-ext-ja.way-nifty.com/blog/tab_mix_plus/
 [2]: http://addons.sociz.com/firefox/54/
 [3]: http://islandz.cocolog-nifty.com/blog/2008/06/tab_mix_lite_ce.html
 [4]: http://hemiolapei.free.fr/extensions/index.php/tab-mix-lite
 [5]: http://fxwiki.blog63.fc2.com/blog-entry-150.html "Tab Mix Plusと同等の機能を持つ拡張機能"
 [6]: http://twanno.mozdev.org/
 [7]: https://addons.mozilla.org/ja/firefox/addon/7446
 [8]: http://www.pqrs.org/tekezo/firefox/extensions/functions_for_keyconfig/index.html.ja
 [9]: https://efcl.info/2008/0514/res182/
