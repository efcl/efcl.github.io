---
title: 拡張機能の有効状態を保存復元するuserChrome.js
author: azu
layout: post
permalink: /2010/0516/res1699/
SBM_count:
  - '00008<>1355429026<>6<>0<>1<>1<>0'
dsq_thread_id:
  - 301823563
categories:
  - userChome.js
tags:
  - Firefox
  - userChrome.js
  - アドオン
  - 拡張機能
---
Firefoxの拡張機能(アドオン)の有効になってるか無効になってるかを記録して保存できます。  
またその保存したものから各アドオンの有効の有無を復元することができます。

例えば、Firefoxの動作がおかしいなと感じて、どのアドオンが原因なのかを調べるときに、調べる前の有効状態を保存してから、一個一個アドオンを無効化して試し、原因となるアドオンが分かったら有効状態を復元して直ぐに元通りにできます。

似たような事を行えるVimperatorプラグインがあります。

**アドオンの有効無効状態を保存＆復帰できるプラギン &#8211; Death to false Web browser! &#8211; vimperatorグループ**
:   [http://vimperator.g.hatena.ne.jp/nokturnalmortum/20100203/1265202872][1]

このスクリプトはuserMenu.jsが必要となるので、[userChrome.jsでメニュー拡張を追加できる「userMenu.js」 | Web scratch][2]を読んでuserMenu.jsを導入してからChromeフォルダのtoolmenuフォルダに入れてください。

*   [0001.アドオン有効状態を保存.S.js][3]

<address>
  アドオンの状態はextensions.scriptprefs.GM_modoki.%u30A2%u30C9%u30AA%u30F3%u6709%u52B9%u72B6%u614B%u3092%u4FDD%u5B58.extsDisable
</address>

に保存されています。(JSON.parseして使う。)

userMenu.jsに付属していた0000.アドオンリストをタブに表示.L.jsを元にしました。

他の参考にしたもの

nsIExtensionManagerで使えるもの**[  
nsIExtensionManager.idl][4]**

ダイアログの使い方。  
**nsIPromptService &#8211; MDC**
:   [https://developer-stage.mozilla.org/en/nsIPromptService#confirmEx()][5]

ダイアログの使い方。日本語ですがいろいろ抜けてます。
**Dialogs and Prompts &#8211; MDC**
:   [https://developer-stage.mozilla.org/ja/Code\_snippets/Dialogs\_and_Prompts  
    ][6]

 [1]: http://vimperator.g.hatena.ne.jp/nokturnalmortum/20100203/1265202872 "アドオンの有効無効状態を保存＆復帰できるプラギン - Death to false Web browser! - vimperatorグループ"
 [2]: ../2010/0512/res1692/
 [3]: http://gist.github.com/raw/395918/ccd3c94c74fd552fa4f7069ef6a7f14c0a56bd7c/0001.%E3%82%A2%E3%83%89%E3%82%AA%E3%83%B3%E6%9C%89%E5%8A%B9%E7%8A%B6%E6%85%8B%E3%82%92%E4%BF%9D%E5%AD%98.S.js
 [4]: http://mxr.mozilla.org/mozilla/source/toolkit/mozapps/extensions/public/nsIExtensionManager.idl
 [5]: https://developer-stage.mozilla.org/en/nsIPromptService#confirmEx%28%29 "nsIPromptService - MDC"
 [6]: https://developer-stage.mozilla.org/ja/Code_snippets/Dialogs_and_Prompts "Dialogs and Prompts - MDC"