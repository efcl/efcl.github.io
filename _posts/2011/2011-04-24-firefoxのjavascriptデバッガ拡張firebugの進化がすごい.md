---
title: FirefoxのJavaScriptデバッガ拡張Firebugの進化がすごい
author: azu
layout: post
permalink: /2011/0424/res2647/
SBM_count:
  - '00554<>1355446292<>523<>0<>25<>6<>0'
dsq_thread_id:
  - 300809309
categories:
  - Firefox
  - javascript
tags:
  - API
  - Firebug
  - Firefox
  - javascript
  - まとめ
---
Firefoxのデバッグ拡張こと[Firebug][1]ですが、Firefox4よりFirebugとは別に[Web Console][2]という機能が入りました。   
しかし、Firebug自体もさらに便利になっているので、少し紹介します。(Firebug1.7 –1.8 の範囲で)

現在のFirefox4に正式対応しているのはFirebug1.7xで、Firebug1.8xは[Alpha][3]版として公開されているのでまだ不安定な部分もあることに注意して下さい。   
特に注意書きしてない部分はFirebug1.7の項目だと思って大丈夫だと思います

<!--more-->

### コマンドラインに履歴ボタン

[<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image_thumb2.png" border="0" alt="image" width="240" height="72" />][4]

コンソールパネルでのコマンドエディタ(でかい方のコマンドライン)にHistoryボタンが新たに追加されました。   
過去に実行したコマンドをポップアップから選択して挿入することができます。(以前はCtrl+ZでUndoし続ける必要があった)

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image3_thumb.png" border="0" alt="image" width="240" height="177" />][5]

コマンドライン(小さい方)も同様に履歴ボタンが存在します

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image_thumb4.png" border="0" alt="image" width="240" height="17" />][6]

### スタイルサイドパネルの表示が細かく制御できるように

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image12_thumb.png" border="0" alt="image" width="348" height="121" />][7]

CSSパネルにあるスタイとるサイドパネルの計算済みスタイルでアルファベット順のソートができるようになりました。   
そのため並び順でどのようなスタイルが適応されているのかが見やすくなりました。

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image15_thumb.png" border="0" alt="image" width="485" height="131" />][8]

同じくスタイルサブパネルにて、Only Show Applied Stylesフィルターが追加されました。   
これは重複して適応されているものなどを非表示にすることで、実際に適応されているスタイルが見やすくなります。

*   [Getfirebug Blog » Blog Archive » Firebug 1.7b1][9]

### コンソールの実行結果の表示形式が変更

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image21_thumb.png" border="0" alt="image" width="515" height="155" />][10]

コンソールの実行結果の表示にてglobalStorageオブジェクトにも対応しました。

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image24_thumb.png" border="0" alt="image" width="480" height="106" />][11]

それに伴ってDOMパネルにおいてDOM Storage(global, session, local)の表示に対応しています。

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image36_thumb.png" border="0" alt="image" width="394" height="134" />][12]

また、以前はDateオブジェクトをコンソールに表示すると、[DateをtoStringした値][13]が表示されていたのがちゃんとDateオブジェクトとして表示されるようになりました。

この辺のコンソール実行結果の表示形式の変更に伴ってか、<http://jsfiddle.net/efcl/zVFdd/3/> のようにconsole.log()の返り値が\_firebugIgnoreとなっています。これはconsole.log(&#8220;hoge&#8221;);でundefinedが返ってくるとログ画面にundefinedが表示されてしまうので、仮の値として\_firebugIgnoreを返してログ画面ではそれを無視しよう的な方法がとられているため、undefinedではない値を返すようになっているようです。(FIrefox4 +Firebug1.7以降)   
なので、console.logがundefinedを返す事を期待するのは少し危険です。

*   [Re: Test results for Firebug 1.7 + Firefox 4 combo][14]

### Break時のメッセージUIが変更

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image27_thumb.png" border="0" alt="image" width="520" height="151" />][15]

JavaScriptやHTMLの変更に対してブレークポイントを打った際にBreakした事を知らせるメッセージUIが変わりました。   
以前よりわかりやすい表示になりました。

### ファイルの指定行数目にジャンプ

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image30_thumb.png" border="0" alt="image" width="510" height="82" />][16]

エディタではよく見られる、JavaScriptやCSSなどの指定行数にジャンプする機能が検索バーに追加されています。

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image33_thumb.png" border="0" alt="image" width="510" height="184" />][17]

検索バーに #行数 と入力する事で指定行数にジャンプすることができます。

### メモリプロファイラー

Firebug1.8a2にてメモリ使用量の変化を見るメモリプロファイラーが実装されました。

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image39_thumb.png" border="0" alt="image" width="240" height="128" />][18]

これはabout:memoryと同じAPIを使っていて、Firefox4からJavaScriptのヒープメモリなども取得できるようになったのに基づいて作られています。以前書いた[JavaScriptからメモリ情報を取得する方法 | Web scratch][19]でのWebkitに実装されているconsole.memoryに近い感じの値がとれるようになったと思います。   
メモリプロファイラーはボタンを押してから次にボタンを押すまでのメモリについての変化を見る機能となっているようです。Firebug1.8aを入れた状態で[Test Case for Issue #4376][20]にて実験することができます。

このメモリ監視機能は元々[Memorybug][21]というFirebug拡張として開発されていて(Firebugの実験的機能は別アドオンとしてくられることが多い)、それがFirebug本体にポートされ始めたものだと思います。将来的にはコンソールAPIにconsole.memoryProfile()などのメモリプロファイル操作APIが追加されると思います。

*   [Firebug Memory Profiler &#8211; FirebugWiki][21]

### DOMパネルの表示が細かく制御できるように

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image42_thumb.png" border="0" alt="image" width="508" height="256" />][22]

同じくFirebug1.8a2にて、DOMパネルにshowOwnProperties と showEnumerablePropertiesのフィルタオプションが追加されました。   
showOwnPropertiesはprototypeチェーンの表示を決めるフィルタで、showEnumerablePropertiesはenumerableなプロパティの表示を決めるオプションとなっています。スタイルサイドパネルと同様にDOMパネルにおいてもフィルター機能が充実してきているようです。

ここで書かれている内容はほとんど

*   [Firebug 1.7 New Features ✩ Mozilla Hacks – the Web developer blog][23]
*   [Getfirebug Blog][24]
*   [Firebug Release Notes &#8211; FirebugWiki][25]

に載っている内容です。   
今回書いたもの以外にも変更点はあるので上記のサイトを読むといいです。   
動画で見るFirebug1.6の変化も [What&#8217;s new in Firebug 1.6 on Vimeo][26]

#### **蛇足**

[Google ChromeのJavaScriptデバッガの進化がすごい &#8211; 0xFF][27]が元ネタなので、それと似たようなアドオンの紹介。

### 圧縮されたコードの整形

IE9の開発者ツールに実装されていたJavaScriptコードの整形機能は[Javascript Deminifier][28]というアドオンによって行う事ができます。

たとえばGoogleのJavaScriptは圧縮されているため普通は読めませんが、

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image45_thumb.png" border="0" alt="image" width="640" height="229" />][29]

JSBボタン([Javascript Deminifier][28]をインストールするとステータスバーに表示)をONにする事で

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image48_thumb.png" border="0" alt="image" width="640" height="228" />][30]

このように整形してくれます。   
これはリロードした際にも維持されているので、整形した状態のJavaScriptにたいしてもブレークポイントを打つことができます。

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image51_thumb.png" border="0" alt="image" width="640" height="170" />][31]

これで圧縮されているライブラリの確認も楽にできます。

### Firebugをエディタにする拡張

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image_thumb18.png" border="0" alt="image" width="240" height="184" />][32]

[Firebug Autocompleter][33]はFirebugのコマンドラインに自動補完機能をつけてくれます。   
コマンドライン(小さい方)は公式にも一応ついていますが、コマンドエディタに対してもポップアップして表示される自動補完機能をつけてくれます。

[<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" src="https://efcl.info/wp-content/uploads/2011/04/image_thumb19.png" border="0" alt="image" width="240" height="180" />][34]

[Acebug][35]はFirebugのコマンドエディタを[Ajax.org][36] Cloud9 Editorのものに変えてくれます。   
Syntax Highlightingや自動補完やファイルからロード、セーブなどエディタさながらの機能をつけてくれます。   
少し重たいですが便利です。

そのほかにもjQueryに特化した[FireQuery][37]やリッチUI系のExtJSやSproutCoreなどのライブラリに特化している[Illuminations for Developers][38]やRuby on Railsに特化した[RailsBug][39]など様々なFirebugアドオンがあります。   
後、Firebugは[Index of /releases][40]あたりに新しい機能や実験的なものをFirebug拡張として分けて置いていることが多いです。その中には要素に適応されているイベントを表示する[Eventbug][41]やCSSパネルでCSSが適応されてる要素を表示する[selectbug][42]など結構便利なものがあります。(いずれFirebug本体に載るのかもしれない)

*   [Firebugを拡張するアドオンをまとめてみた | Web scratch][43]

表面的にはFirebugはそこまで大きく変わっていないように見えますが、少しづつ[内部の整理][44]も入ってきているため、Firebug拡張も作りやすくなるようです。

IE、Firefox、Chrome&Safari、Operaとブラウザ自体も大きく変化していきますが、その中のデバッガもいろいろな変化が起きています。それぞれのブラウザでいい機能はどんどん取り入れて(パクって)いってもらいたいですね。

*   [Downloads: All Versions of Firebug : Firebug][3]

#### **追記**

タイトルにJavaScriptデバッグとあるのは元ネタに合わせてみただけですが、Firebug1.7はCSS関係の機能が結構拡充されてる印象。

アイコンが…ってのは[FireBugのアイコンを置き換えようじゃなイカ : Firefoxをイカ娘が侵略プロジェクト][45]なんてのもあるんじゃなイカ  
userChrome.cssとか[Stylish][46]でアイコンぐらいなら簡単に差し替えできるよ(アップデートの度にやり直さなくてもいいという利点も)

 [1]: http://getfirebug.com/
 [2]: https://developer.mozilla.org/en/Using_the_Web_Console
 [3]: http://getfirebug.com/downloads
 [4]: https://efcl.info/wp-content/uploads/2011/04/image2.png
 [5]: https://efcl.info/wp-content/uploads/2011/04/image31.png
 [6]: https://efcl.info/wp-content/uploads/2011/04/image4.png
 [7]: https://efcl.info/wp-content/uploads/2011/04/image121.png
 [8]: https://efcl.info/wp-content/uploads/2011/04/image151.png
 [9]: http://blog.getfirebug.com/2011/03/04/firebug-1-7b1/
 [10]: https://efcl.info/wp-content/uploads/2011/04/image21.png
 [11]: https://efcl.info/wp-content/uploads/2011/04/image24.png
 [12]: https://efcl.info/wp-content/uploads/2011/04/image36.png
 [13]: http://d.hatena.ne.jp/os0x/20100916/1284650917
 [14]: http://www.mail-archive.com/firebug@googlegroups.com/msg11737.html
 [15]: https://efcl.info/wp-content/uploads/2011/04/image27.png
 [16]: https://efcl.info/wp-content/uploads/2011/04/image30.png
 [17]: https://efcl.info/wp-content/uploads/2011/04/image33.png
 [18]: https://efcl.info/wp-content/uploads/2011/04/image39.png
 [19]: https://efcl.info/2010/1226/res2191/
 [20]: http://getfirebug.com/tests/issues/memory/test.html
 [21]: http://getfirebug.com/wiki/index.php/Firebug_Memory_Profiler
 [22]: https://efcl.info/wp-content/uploads/2011/04/image42.png
 [23]: http://hacks.mozilla.org/2011/03/firebug-1-7-new-features/
 [24]: http://blog.getfirebug.com/
 [25]: http://getfirebug.com/wiki/index.php/Firebug_Release_Notes
 [26]: http://vimeo.com/18411877
 [27]: http://d.hatena.ne.jp/os0x/20110422/1303468821
 [28]: https://addons.mozilla.org/ja/firefox/addon/javascript-deminifier/
 [29]: https://efcl.info/wp-content/uploads/2011/04/image45.png
 [30]: https://efcl.info/wp-content/uploads/2011/04/image48.png
 [31]: https://efcl.info/wp-content/uploads/2011/04/image51.png
 [32]: https://efcl.info/wp-content/uploads/2011/04/image18.png
 [33]: https://addons.mozilla.org/ja/firefox/addon/firebug-autocompleter/
 [34]: https://efcl.info/wp-content/uploads/2011/04/image19.png
 [35]: https://addons.mozilla.org/ja/firefox/addon/acebug/
 [36]: http://Ajax.org
 [37]: http://firequery.binaryage.com/
 [38]: https://addons.mozilla.org/ja/firefox/addon/illuminations-for-developers/
 [39]: https://addons.mozilla.org/ja/firefox/addon/railsbug/
 [40]: http://getfirebug.com/releases/
 [41]: http://www.softwareishard.com/blog/category/eventbug/
 [42]: http://getfirebug.com/releases/selectbug/
 [43]: https://efcl.info/2010/1119/res2075/
 [44]: http://getfirebug.com/wiki/index.php/Firebug_1.8:_Architecture_Refactoring
 [45]: http://ai11.net/2010/fbicon/
 [46]: http://userstyles.org/styles/26321/firefox-firebug-status-icon
