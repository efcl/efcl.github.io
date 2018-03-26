---
title: JavaScript対応のIDEをまとめてみた
author: azu
layout: post
permalink: /2010/0920/res1952/
SBM_count:
  - '00129<>1355443837<>122<>0<>2<>5<>0'
dsq_thread_id:
  - 300802702
categories:
  - javascript
  - software
tags:
  - Editor
  - Firefox
  - IDE
  - javascript
  - まとめ
  - ブラウザ
  - プラグイン
---
JavaScriptに対応してるIDEのメモまとめ。

*   [Aptana][1]  
    有名どころでEclipseのプラグインとしても使えます。  
    IDEらしくちょっと重たいけど、整形やデバッグやスニペットなど大抵の機能が入ってる。  
    IDE内でブラウザプレビューができて便利。  
    最近のバージョンだとFirefoxのプレビュー機能がデフォルトで入ってないので別途プラグインを入れる必要がある。  
    [Aptana Studio 2.0.3－Firefoxプレビュータブ &#8211; ゆちの備忘録][2]
*   [WebStorm][3]  
    [JavaScript Editor][4]にJavaScript関係の対応について書いてある。  
    HTMLとかまぜこぜでも補完ができてる。  
    追記:ちょっと触ってみたら実は凄かった  
    追記2:使い勝手などをまとめて見ました。  
    [最強のJavaScript IDE 「WebStorm」を使ってみた][5]
*   [Komodo IDE][6]  
    デバッグ系機能がないkomodo Editもある。  
    komodo Editはオープンソース版の[Open Komodo][7]もあるらしい。  
    XULと親和性が高そうで [Komodo Edit が面白い &#8211; hogehoge @teramako][8]
*   [Spket IDE][9]  
    以前何か書きました<a href="https://efcl.info/2009/1203/res1496/" target="_blank">JavaScript向けIDE「Spket IDE」の導入 | Web scratch</a>  
    IDEの中では軽くて、<span>Firefoxの拡張向けの機能もある。</span>
*   [Visual Studio 2010][10]  
    またまたーって感じがするけど意外と凄い子。  
    [neue cc &#8211; JavaScriptエディタとしてのVisual Studioの使い方入門][11]を読みましょう。  
    Visual Studio 2010はデフォルトでjQueryをサポートしています。
*   [NetBeans][12]  
    JavaのIDEとして有名。PHPのセット内にJavaScript対応が含まれている。  
    [Editing JavaScript &#8211; NetBeans IDE 6.x Tutorial][13]や[JavaScript &#8211; NetBeans Wiki][14]を参照。
*   [JSDT &#8211; Eclipsepedia][15]  
    結構昔からあるEclipseのプラグイン。
*   [KompoZer &#8211; Easy web authoring][16]  
    どっちかというとWebページ作成のHTMLエディタ。  
    <acronym title="What You See Is What You Get">WYSIWYG</acronym>なHTMLエディタ。
*   <a rel="nofollow" href="http://www.adobe.com/products/dreamweaver/">Adobe Dreamweaver</a>  
    AdobeのWebページ作成ツールなのであんまりJavaScript向けとは言えないけど、Webページエディタとしてはかなり優秀だと思います。  
    CS5ではJavaScriptのコード補完やその場でプレビューして実行もできます。(ちょっと補完は中途半端)  
    ちなみにDreamweaver CS5で使われてるレンダリングエンジンはWebkitです。  
    CSSのインスペクタなど表示確認としての機能はかなり優れているので、Webページの一部としてJavaScript書くならありな選択肢だと思います。  
    参考 [【レビュー】「Adobe Dreamweaver CS5」新機能徹底レビュー(中編) | クリエイティブ | マイコミジャーナル][17]  
    またDreamweaverはAdobe製品なのでJavaScriptを使って拡張することができます。(ちょっと語弊あるけど)  
    APIのリファレンスは[Adobe Dreamweaver * Adobe Dreamweaver CS4 API リファレンス][18]に書いてあります。また[Dreamweaver DOM][19]というものが存在し深いとこまでカスタマイズできそうな感じがします。  
    [Dreamweaverの拡張機能まとめ | Arch][20]を読むとどんな拡張があるかが分かると思います。
*   [Eclipse HTML Editor Plugin][21]  
    名前の通りEclipse系のプラグイン。  
    作者が日本人で、最近のバージョンではJavaScript機能の強化がいろいろ入ってきています。  
    [AmaterasIDE\_2\_0_7 &#8211; Amateras Wiki][22]や[作者のブログ][23]を読みましょう。  
    手軽に試すなら、[AmaterasIDEInstaller][24]をインストールして、Eclipse HTML Editorを最新のものに置き換えればいいと思います。
*   [CodeLobster][25]  
    エビ。PHPメインでプラグインでjQueryとかの対応があるのでオマケ程度

全部試したわけではないですが、個人的には[Aptana][1]や<a rel="nofollow" href="http://www.adobe.com/products/dreamweaver/">Dreamweaver</a>など有名な所のできは悪くないです。  
Aptanaは無料で使えて機能も充実してるので、重くなければもっと使われてる気がします。(JavaScriptだけなら通常のエディタでも十分通用するので好みによりますが)  
IDE全般としては、クロスプラットフォームに対応しているのが殆どだったりします。  
エディタとIDE、どちらが優れているとかではなくどっちも優れている部分を持っているので使い分けるのが良いと思います。

いろいろ巡った感想としてjQueryをサポートしてますって書いてるものが多いなーと思った。  
[IxEdit][26]とか見てると、JavaScript言語とは別にjQuery言語があるって思われる日がやってきそう。

元ネタ

**Good JavaScript IDE with jQuery support &#8211; Stack Overflow**
:   [http://stackoverflow.com/questions/209126/good-javascript-ide-with-jquery-support][27]

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 10px; width: 1px; height: 1px; overflow: hidden;">
  Open Komodo
</div>

 [1]: http://www.aptana.com/
 [2]: http://d.hatena.ne.jp/yuchi78/20100515/1273944479
 [3]: http://www.jetbrains.com/webstorm/index.html
 [4]: http://www.jetbrains.com/editors/javascript_editor.jsp?ide=idea
 [5]: https://efcl.info/2010/1027/res2023/
 [6]: http://www.activestate.com/komodo-ide "Komodo IDE"
 [7]: http://www.openkomodo.com/
 [8]: http://d.hatena.ne.jp/teramako/20090205/p1
 [9]: http://spket.com/
 [10]: http://www.microsoft.com/japan/msdn/vstudio/express/
 [11]: http://neue.cc/2010/05/24_260.html
 [12]: http://netbeans.org/index.html
 [13]: http://netbeans.org/kb/65/ide/javascript-editor.html
 [14]: http://wiki.netbeans.org/JavaScript
 [15]: http://wiki.eclipse.org/index.php/ATF/JSDT
 [16]: http://kompozer.net/
 [17]: http://journal.mycom.co.jp/articles/2010/08/05/dwcs5rchu/index.html
 [18]: http://help.adobe.com/ja_JP/Dreamweaver/10.0_API_Ref/index.html
 [19]: http://help.adobe.com/ja_JP/Dreamweaver/10.0_Extending/WS0B37FCCA-DE3C-4a52-86F6-DEF43170EBA3.html
 [20]: http://www.ar-ch.org/mt/archives/2010/06/dreamweaver-1.html
 [21]: http://amateras.sourceforge.jp/cgi-bin/fswiki/wiki.cgi?page=EclipseHTMLEditor
 [22]: http://sourceforge.jp/projects/amateras/wiki/AmaterasIDE_2_0_7
 [23]: http://d.hatena.ne.jp/takezoe/20100704#p1
 [24]: http://amateras.sourceforge.jp/cgi-bin/fswiki/wiki.cgi?page=AmaterasIDEInstaller
 [25]: http://www.codelobster.com/
 [26]: http://www.ixedit.com/
 [27]: http://stackoverflow.com/questions/209126/good-javascript-ide-with-jquery-support "Good JavaScript IDE with jQuery support - Stack Overflow"
