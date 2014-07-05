---
title: ATOKの電子辞典(Office連携ツール)をFirefoxで使うuserChrome.js
author: azu
layout: post
permalink: /2009/0813/res1252/
SBM_count:
  - '00017<>1355445089<>14<>0<>1<>2<>0'
dsq_thread_id:
  - 301062523
categories:
  - Firefox
tags:
  - Firefox
  - userChrome.js
---
ATOKではOffice連携ツールを使うことで、IE上で選択範囲の漢字などの意味を電子辞典で調べる事ができます。  
しかし、officeソフトとIE以外には対応していないので、その機能の一部をFirefoxから使うuserChrome.jsスクリプトです。  
まず前提としてOffice連携ツールをインストールしていないといけません。通常は別途インストールになっていたと思います。  
ATOKアップデートか[［949-P ATOK 2009 for Windows］サポート・ダウンロード情報][1]あたりから各バージョンのOffice連携ツールをインストールしてください。

そして下の場所から各バージョンにあわせたGetTextOperaLClickを任意のフォルダに保存しておいてください。

**Opera, Firefox, 秀丸, Janeで電子辞典(for Windows)を使う (JustSystems まとめ)**
:   [http://sites.google.com/site/jsmatome/atok/option/tool][2]

そしてuserChrome.jsスクリプトをFirefoxのchromeフォルダに保存して、中身を編集します。

*   [Search Atok.uc.js][3]

中身のGetTextOperaLClickPath=のところを先ほど保存したGetTextOperaLClick.exeのパスに書き換えます。 ((はエスケープして\にするか、/にする))  
そしてFirefoxを再起動すれば、文字列を選択したときにコンテキストメニューに&#8221;ATOKで検索&#8221;とでるので、実行するとGetTextOperaLClick.exeによって  
電子辞典を引くことができます。<figure id="attachment_1254" style="width: 300px;" class="wp-caption alignnone">

[<img class="size-medium wp-image-1254" title="sshot-2009-08-13-[21-10-00]" src="http://wordpress.local/wp-content/uploads/2009/08/sshot-2009-08-13-21-10-00-300x181.png" alt="実行例" width="300" height="181" />][4]<figcaption class="wp-caption-text">実行例</figcaption></figure> 
GetTextOperaLClickは他のソフトでもつかえるので、詳しい使い方は[Opera, Firefox, 秀丸, Janeで電子辞典(for Windows)を使う][5]をみるのがいいと思います。

&nbsp;

 [1]: http://support.justsystems.com/jp/app/servlet/product?pid=949
 [2]: http://sites.google.com/site/jsmatome/atok/option/tool "Opera, Firefox, 秀丸, Janeで電子辞典(for Windows)を使う (JustSystems まとめ)"
 [3]: http://wordpress.local/wp-content/uploads/2009/08/Search-Atok.uc_.js
 [4]: http://wordpress.local/wp-content/uploads/2009/08/sshot-2009-08-13-21-10-00.png
 [5]: http://sites.google.com/site/jsmatome/atok/option/tool