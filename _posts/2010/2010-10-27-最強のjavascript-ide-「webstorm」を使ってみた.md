---
title: 最強のJavaScript IDE 「WebStorm」を使ってみた
author: azu
layout: post
permalink: /2010/1027/res2023/
SBM_count:
  - '00211<>1355445316<>204<>0<>0<>7<>0'
dsq_thread_id:
  - 300802826
categories:
  - javascript
  - software
tags:
  - Editor
  - Firefox
  - IDE
  - javascript
  - WebStorm
  - バージョン管理
---
[JavaScript対応のIDEをまとめてみた][1]の続きのようなもので、その中で紹介していた[WebStorm][2]が素晴らしいので別途紹介。[  
WebStorm][2]はHTML(5)+CSS+JavaScriptに対応してるIDEで、Windows, Mac OS、Linux上で動作します。  
有料のソフトウェアですが、[オープンソースライセンス][3]があったり体験版は45日間使えるのでとりあえず試してみましょう。

*   **[この記事の続編(アップデート版)を書きました][4]**

### 特徴

とにかく膨大な機能が載ってるので全てを紹介するのは無理があるため、凄いと思ったところを掻い摘んで紹介。  
主にJavaScriptを書くエディタとして使っていますが、CSSやHTMLも普通のIDEより書きやすいです。  
基本的に[WebStorm][2]で日本語に関する問題は少なめです。一部IMEの変換候補が出てくる場所がずれたり、プラグインで日本語がダメだったりするものがありますが、殆ど問題ではない程度です。文字コードはShift_JIS(windowsだとwindows-31j)も対応しているので問題にはならないと思います。

#### 優秀なコード補完機能

WebStormはソースコードを自動的にコ－ド解析(静的解析?)してるようで、JavaScriptの構造を認識してコード補完を行えます。  
例えば@teramakoさんが[Komodo Edit が面白い][5]で言っていたような

<pre class="brush:javascript;">var container = {
  init: function() {},
};
container.obj = (function(){
  var privateProp = null;
  var namager = {
    publicMethod: function(){ },
  };
  return namager;
})();</pre>

というコードの場合`container.obj.pu と書くと``ちゃんとpublicMethodも補完候補に表示されます。<br /> さらに``publicMethodはメソッドなので``container.obj.``publicMethod()`という形で補完されて、今は仮引数がないのでカーソルの位置は)の→になります。仮引数があると()の中にカーソルが置かれます。  
`<a href="https://efcl.info/wp-content/uploads/2010/10/ss-2010-10-27-4.png"><img class="alignnone size-medium wp-image-2025" title="ss-2010-10-27-4" src="https://efcl.info/wp-content/uploads/2010/10/ss-2010-10-27-4-300x193.png" alt="" width="300" height="193" /></a>`

ネイティブの補完候補もHTML5,ECMA,DOMCoreや結構細かいものも対応していて補完でアレが出てこないって事はかなり少ないです(ブラウザ拡張開発用とかは除いて)  
補完候補は開いているディレクトリ以下のファイルを全部解析して表示してくれるので、ファイルをまたいだメソッドなども候補に表示されます。  
今まで触ったJavaScriptエディタ、IDEで補完は最も素晴らしいと感じました。

JavaScript以外のHTMLタグやCSSも補完を行え、1つのファイルにHTML、JavaScriptなどが混在していた場合も正しく認識して補完が行える。[HTML, CSS, JavaScript editing in an intelligent environment :: WebStorm Features][6]で特徴がいろいろ紹介されています。

#### コ－ド解析による良さ

&nbsp;<figure id="attachment_2028" style="width: 300px;" class="wp-caption alignnone">

[<img class="size-medium wp-image-2028" title="ss-2010-10-27-7" src="https://efcl.info/wp-content/uploads/2010/10/ss-2010-10-27-7-300x146.png" alt="右サイドに警告レベル毎の表示" width="300" height="146" />][7]<figcaption class="wp-caption-text">右サイドに警告レベル毎の表示</figcaption></figure> 
&nbsp;

上でコ－ド解析してるのでインテリセンスみたいな事が凄くできるよと書きましたが、  
他にもCtrl+クリックで関数宣言にジャンプ(Tipsで設定の変更方法が記載してあります)する機能や、リファクタリングで特定の変数名や関数名をリネームする機能(その名前を使ってるもの全部を変えてくれる)、Structureパネルでコードのアウトラインを表示できたりします。  
[<img class="alignnone size-medium wp-image-2027" title="ss-2010-10-27-6" src="https://efcl.info/wp-content/uploads/2010/10/ss-2010-10-27-6-204x300.png" alt="" width="204" height="300" />][8]  
後、文法が間違ってる場合などは警告なども表示できその設定も警告レベルから決められてかなり細かな指定が行えます。(JSLintみたいなもの?)

#### 自動整形機能

個人的にIDEと言ったらコードの自動整形機能です。CodeメニューのReformat codeから実行できます。(ショートカットからもできる)  
自動整形のルールはOptionのCode Styleからかなり細かく設定できるので、自分ルールに合わせて整形させる事ができます。

&nbsp;<figure id="attachment_2026" style="width: 300px;" class="wp-caption alignnone">

[<img class="size-medium wp-image-2026" title="ss-2010-10-27-5" src="https://efcl.info/wp-content/uploads/2010/10/ss-2010-10-27-5-300x160.png" alt="他にもページがあるぐらい多い" width="300" height="160" />][9]<figcaption class="wp-caption-text">他にもページがあるぐらい多い</figcaption></figure> 
&nbsp;

ショートカットキーはkeymap>Reformat codeで変更できます

&nbsp;

#### E4X対応

Firefoxユーザー向けですが、構文解析がE4Xの記法に対応しています。  
普通なら上記の自動整形でE4Xが混じってると崩れてしまって残念になりますが、E4Xもちゃんと扱えるので崩れません。  
Firefox向けのコード、Greasemonkeyなどを書く人に使ってもらいたいところ。  
(分割代入の記法にはまだ対応してなかったのはちょっぴり残念)

#### 標準でバージョン管理機能がある

&nbsp;

&nbsp;<figure id="attachment_2045" style="width: 248px;" class="wp-caption alignnone">

[<img class="size-medium wp-image-2045" title="ss-2010-10-28-1" src="https://efcl.info/wp-content/uploads/2010/10/ss-2010-10-28-1-248x300.png" alt="Gitのメニュー" width="248" height="300" />][10]<figcaption class="wp-caption-text">Gitのメニュー</figcaption></figure> 
&nbsp;

&nbsp;

Vision Contorolメニューを有効にすると標準でローカルなバージョン管理が行えます。  
デフォルトだと差分やrevertがができるLocal Historyが機能しますが、外部のバージョン管理ソフトと連携してSVN、Gitが使用できます。(Mercurialは標準ではなく[hg4idea-luciad][11]プラグインによって使用できます)  
コミットやpushなどはIDE上からその場でできて、マージや差分表示などもできるので結構便利です。

#### JavaScriptデバッガー

[Local JavaScript debugging][12]で紹介されてるようにFirefoxアドオンと連携したIDE上で動くデバッガが付いています。  
他にもFirebugと連携して機能するプラグインなどもあったりしてFirefoxとの親和性は少し高め。

### 使い勝手

他の機能紹介は[WebStorm Features][6]やヘルプなどを見てもらうとして、使った感覚としてはそこまで重くは無いです。  
起動はIDEらしくちょっとかかりますが(コード解析もあったりするので)、太ったEmacsの起動を我慢できるなら問題ない。  
Aptanaみたいに長いコードだと極端に重くなるとかはないので、大規模なものでも扱えると思います(構造もみやすいし)  
ショートカットはEclipse、NetBeans、Emacs、Visual Studio、Mac、GNOME、KDEなどの設定が最初から用意されていて、殆どの操作をカスタマイズできるので、自分好みにする事もできると思います。  
Vimのキーバインドは標準ではなくプラグインの[IdeaVIM][13]によって使えます。([JetBrains][14]のIDEなら大体対応してる)  
メモリは数十MB～多くても200MBいかないぐらいなので(ステータスバーにメモリ量が表示される)、少し古いPCでも動かせるぐらいです。自分のノートであるCore Duo T2300（1.66GHz）、512MBのPCでも使えるぐらいなので、最近のPCなら問題ないと思います。

UIが完全に英語ですが、設定は検索機能が優秀なので適当な単語からたどり着けることが多いし、表示している項目には全部ヘルプや説明が付いてるぐらいなので、オプションが豊富すぎるぐらいでそこまでつっかかりはないと思います。  
(何ができないのかというのが少し分かりにくい感じではある)

<h3 lang="en-US">
  Tips
</h3>

メモみたいな

*   [Productivity Tips][15] 動画  
    他のソフトだけど大体一緒なので参考になる。主にコード補完系
*   ショートカットキーはkeymapで変更できて、キーだけではなくてマウスクリックなどのショートカットもあります。
*   Ctrl+クリックで関数宣言にジャンプするのは keymap > Go to > declaration で設定変更できる。(デフォルトだとCtrl+B)
*   Find Action (Ctrl+Shift+A)でコマンド検索できる
*   ショートカット一覧(デフォルト)はPDFで配布もしてる [WebStorm Resources][12]
*   keymapでcomplete current statement(ctrl+shift+enter)が便利。最後の;が無かったら;を入れてくれて、あったら次の行へ。  
    今の行のステートメントを自動的に補完してくれる感じ
*   Editor > Code Folding でコメントがデフォルトでたたまれるのを防止できる  
    (Greasemonkeyとかデフォルトだとたたまれちゃうので)
*   File Templeteで${NAME}でファイル名が取れる(大文字区別する)  
    適当な変数${test}を書くとファイル作成ダイアログでそれを入力して指定できる。  
    例えばGreasemonkeyっぽいテンプレートを書くなら [gist: 648943 &#8211; WebStormのFile Templete- GitHub][16]みたいな感じ。
*   Editor > Editor Tabsでタブ位置を上下左右に変えられるので、縦置きタブバーも可能
*   JavaScript IntentionPowerPack。if-elseを||にするとか!から始まるifをflipして逆にするとか、リファクタリング関係のものが詰まってる。
*   変数に下線とかの装飾はEditor > Color & Fonts > JavaScriptあたりから変更できます。
*   文字コードの変更は画面下にある所をクリックでも変更できる
*   [JetBrains][14]のIDEは大体形が同じ(扱える言語が違う)なので、他の種類のIDEのノウハウが使えることもある。

### プラグイン

*   [JetBrains Plugin Repository][17]
*   [JetBrains PhpStorm/WebStorm Plugin Repository][17]

から探せる(他にもあると思う)  
手動インストール方法は[IntelliJ IDEA Plugin &#8211; TeamCity 3.x Documentation &#8211; Confluence][18]に書いてあるように、指定のpluginsフォルダにjarとかプラグインファイルをおいて、設定のpluginsから有効にすればいいみたい。  
けど、他のソフトを対象に書かれたプラグインは動作しない気がする。

*   [eSnippet Pro plugin][19]  
    スニペットプラグイン。Ctrl+Alt+Spaceで補完のようにスニペットを追加できる。  
    スニペットをオンラインに登録して、検索できる
*   [CSS-X-Fire][20]  
    FirebugのCSSパネルのようにCSSを編集できるプラグイン
*   [hg4idea-luciad][11]  
    Mercurial統合のプラグイン  
    他のバージョン管理はデフォルトで大体ある。
*   デフォルトで入ってるスペルチェッカーは日本語に反応してうるさいので無効にした。

### よく分かってないこと

やり方があったら教えて欲しいです。

*   <span style="text-decoration: line-through;">いつでも参照できる補完候補の追加方法</span>→実装された[WebStormのコード補完に新しく候補を追加する方法][21]
*   <span style="text-decoration: line-through;">WebStormを開いてる状態で、もう一回WebStormを開くと複数のウィンドウになるのをタブにまとめる方法</span>→WebStorm-EAP-98.458でタブで開くようになった
*   分割代入が整形機能で崩れる
*   配列の最後に,がある時に警告がでるのを消す方法
*   他の[JetBrains][14]IDEのプラグインの入れ方がよく分からない(対応してないだけ?)

### 感想

とにかく機能が多くて、まだまだ使いきれない感じでさらにもうすぐ2.0がリリースされるので成長も早いIDEだと思います。  
[体験版][22]が45日間と長いと思ったけど、1ヶ月使ってもまだ底が見えないので妥当な日数だと分かった。  
珍しくタイトルが誇大っぽいけど、(現時点では)最強のJavaScript IDEは「WebStorm」だと言い切れるぐらい圧倒的できの良さ。  
周りのJavaScript対応IDEと差がかなり大きいと思うので、後1-2年は追いつけるレベルのものが出てこない予感。  
日本でのユーザ数がとっても少ない感じがするので、使ってどんどんブログなどに情報を書いてくれるともっと発展できるソフトウェアだと思うよ。

**The best HTML, CSS and JavaScript Editor for Web development :: JetBrains WebStorm**
:   [http://www.jetbrains.com/webstorm/][23]

**HTML, CSS, JavaScript editing in an intelligent environment :: WebStorm Features**
:   [http://www.jetbrains.com/webstorm/features/][24]

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow: hidden;">
  <a href="http://www.jetbrains.com/webstorm/">WebStorm</a>
</div>

 [1]: https://efcl.info/2010/0920/res1952/
 [2]: http://www.jetbrains.com/webstorm/
 [3]: http://www.jetbrains.com/webstorm/buy/buy.jsp#opensource_
 [4]: https://efcl.info/2012/0909/res3111/ "改めて最強のJavaScript IDE 「WebStorm」についてまとめてみた(改訂版)"
 [5]: http://d.hatena.ne.jp/teramako/20090205/p1
 [6]: http://www.jetbrains.com/webstorm/features/
 [7]: https://efcl.info/wp-content/uploads/2010/10/ss-2010-10-27-7.png
 [8]: https://efcl.info/wp-content/uploads/2010/10/ss-2010-10-27-6.png
 [9]: https://efcl.info/wp-content/uploads/2010/10/ss-2010-10-27-5.png
 [10]: https://efcl.info/wp-content/uploads/2010/10/ss-2010-10-28-1.png
 [11]: http://plugins.intellij.net/plugin/?webide&id=4624
 [12]: http://www.jetbrains.com/webstorm/documentation/index.html
 [13]: http://plugins.intellij.net/plugin/?webide&id=164
 [14]: http://www.jetbrains.com/ab_index.html
 [15]: http://www.jetbrains.com/idea/documentation/tips/index.html#demos
 [16]: http://gist.github.com/648943
 [17]: http://plugins.intellij.net/?webide
 [18]: http://confluence.jetbrains.net/display/TCD3/IntelliJ+IDEA+Plugin
 [19]: http://plugins.intellij.net/plugin/?webide&id=4269
 [20]: http://plugins.intellij.net/plugin/?webide&id=5348
 [21]: https://efcl.info/2010/1203/res2152/
 [22]: http://www.jetbrains.com/webstorm/download/index.html
 [23]: http://www.jetbrains.com/webstorm/ "The best HTML, CSS and JavaScript Editor for Web development :: JetBrains WebStorm"
 [24]: http://www.jetbrains.com/webstorm/features/ "HTML, CSS, JavaScript editing in an intelligent environment :: WebStorm Features"
