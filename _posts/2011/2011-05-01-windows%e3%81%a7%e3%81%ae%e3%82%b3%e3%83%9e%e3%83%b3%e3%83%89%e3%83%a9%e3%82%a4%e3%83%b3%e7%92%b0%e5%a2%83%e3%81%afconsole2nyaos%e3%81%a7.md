---
title: Windowsでのコマンドライン環境はConsole2+nyaosで
author: azu
layout: post
permalink: /2011/0501/res2717/
SBM_count:
  - '00086<>1355447263<>83<>0<>3<>0<>0'
dsq_thread_id:
  - 300803160
categories:
  - software
  - インストール設定
tags:
  - console
  - Git
  - Windows
  - ソフトウェア
  - 設定
---
この記事は主にConsole2の紹介とnyoasのLua拡張についての話です。

Windowsのコマンドプロンプトはとても使いづらいので、コマンドプロンプト代替ツールとしてckwと拡張性が優れた[NYAOS][1](昔はnyacus)などのシェルを合わせて使ってる人もいると思います。   
自分も少し前までは[ckw-mod][2]+[NYAOS][1]を使っていました。

*   [【DOS窓】NYAOS CKW+α【便利化】-奈良北部のなにか][3]

現在はタイトル通り[Console2][4]+[NYAOS][1]にしています。   
ckwやConsole2はターミナルに該当するソフトウェアで、nyaosやgitbashなどはシェルに該当するソフトウェアです。

*   [NYAOS はターミナルではない！シェル！][5]

Console2でnyaosを使うのは簡単で、Settings>ConsoleのShell(またはタブ毎の設定)にnyoas.exeのパスを入れるだけで完了です。

[<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="http://efcl.info/wp-content/uploads/2011/05/image_thumb.png" border="0" alt="image" width="240" height="69" />][6]

### Console2の機能紹介

#### タブ

Console2の特徴しては**タブ**を持っていることがあげられると思います。   
[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="http://efcl.info/wp-content/uploads/2011/05/image_thumb1.png" border="0" alt="image" width="240" height="196" />][7]

また、タブ毎に設定を行う事ができ、色や背景画像の設定やシェル(nyaosなど)に使うソフトウェアの指定をタブ毎に決定することができます。

[<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="http://efcl.info/wp-content/uploads/2011/05/image_thumb2.png" border="0" alt="image" width="226" height="240" />][8]

#### 日本語表示

以前は日本語がダメだったようですが、現在ver2ではフォントを日本語のものにすれば、日本語の表示も問題なく行えます。(フォントによってはおかしくなるけど)

*   [Console2 ! &#8211; k_maruの思うところ][9](今はやらなくていい設定、Console2のフォントだけ設定すればOK)
*   [Console2とnayosの組み合わせが使いやすい &#8211; アウルキャンプ・ラボダイアリー][10] (設定方法)

#### ウィンドウの透過

ckwでよく紹介されてる機能としてウィンドウの透過機能があると思います。   
Console2でもウィンドウの透過機能があります。

[<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="http://efcl.info/wp-content/uploads/2011/05/image_thumb3.png" border="0" alt="image" width="240" height="150" />][11]

この透過機能はアクティブ、インアクティブの時それぞれの透明度を設定できるので、フォーカス外れているときだけ透過するなどもできます。

[<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="http://efcl.info/wp-content/uploads/2011/05/image_thumb4.png" border="0" alt="image" width="240" height="182" />][12]

#### マウスやホットキーの設定

Console2はホットキーだけではなくて、マウスの動作、左クリックや修飾キーとマウスの組み合わせなどの挙動も設定できるので、結構細かい動作を決められると思います。   
WIndowsのデフォルトであるようなCtrl+Cでコピー、Ctrl+Vでペーストなどの設定もできるので便利です

[<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="http://efcl.info/wp-content/uploads/2011/05/image_thumb5.png" border="0" alt="image" width="235" height="240" />][13][<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="image" src="http://efcl.info/wp-content/uploads/2011/05/image_thumb6.png" border="0" alt="image" width="235" height="240" />][14]

これで簡単なConsole2の機能紹介は終わりです。設定はかなり豊富なので自分好みにできると思います。   
まあタブがあるだけでもかなり魅力的なターミナルです。

### nyoasの設定

[nyaos][1]はUNIXライクな日本語拡張コマンドラインシェルで、とても軽くて、作者さんは日本人(@[zetamatta][15])の方なので日本語の扱いも問題ありません。

*   [NYAOS を使おう！][16] (ちょっと内容古いけど)

キーバインドやコマンドのエイリアスなどを設定して、入力履歴を残せるを保持できるようにするだけでも十分使い勝手がよくなります。

*   [弾丸state: Windowsコマンドラインシェル「Nyaos」をもっと便利にする方法][17]

それに加えて、nyaos 3.xの特徴として[Lua][18]言語でのカスタマイズ機能あります(シェルスクリプトが書ける)

Lua拡張は\_nyaのconfigファイルにもLua\_eを使って書くこともできますが、拡張と設定は別ファイルに分けた方がいいと思います。(エスケープの問題とか面倒だし)

自分の場合は[\_nya\_git.lua][19]という感じで拡張毎のluaファイルを作成して、_nyaコンフィグファイルからsourceコマンドで読み込んで使っています。(拡張のテストするときもsourceで再度読み込めば適応されるのでデバッグしやすい)

<div>
  <pre id="codeSnippet" class="csharpcode">source D:Softwarenyaos_nya_git.lua</pre>
</div>

<div>
  <a href="https://gist.github.com/908117">_nya_git.lua</a>の内容は名前のようにgit関係のコマンドやgitコマンドの補完を作ったものを入れています。 <br />gitのサブモジュールの削除が一発でできるようにgit submodule rmというコマンドを勝手に足したり、<a href="http://d.hatena.ne.jp/wantora/20100612/1276302763">NYAOS 3000でいろんなコマンドのサブコマンドを補完する &#8211; メモ@wantora</a>にgitコマンドを追加したものなどが入っています。
</div>

[<img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" src="http://efcl.info/wp-content/uploads/2011/05/image_thumb7.png" border="0" alt="image" width="240" height="149" />][20]

Lua自体はコンパクトな言語で、若干JavaScriptに似てる感じもあるので調べながらやればなんとか書けるものだと思います

*   [Lua &#8211; assari][21]
*   [良いもの。悪いもの。: Lua基礎文法最速マスター][22](最初これ見るといいかも)
*   [WindowsでLuaの環境構築 &#8211; prog*sig][23]

nyaosのLua拡張の書き方は以下を参考にしました。

*   **Readme.txt(**nyaos_ja.txt)
*   [MHI 3.1][24]
*   [[nyaos] &#8211; メモ@wantora][25]

これで[Console2][4]+[NYAOS][1]の紹介は終わりです。

Windowsのコマンドライン環境自体はこんな感じで比較的いい感じにできると思いますが、実行できるコマンドの方が貧弱なのでそっちでVMでLinuxを使うみたいな事もあるかもしれません…(まさに自分…[WindowsからVM上のLinuxをSSH経由で利用する開発環境の構築 | Web scratch][26])

 [1]: http://www.nyaos.org/index.cgi?p=FrontPage.ja
 [2]: http://deflis.github.com/ckw-mod/
 [3]: http://narazaka.blog109.fc2.com/blog-entry-100.html
 [4]: http://sourceforge.net/projects/console/
 [5]: http://nyaos.org/d/index.cgi?p=%282010.11.04%29#p1
 [6]: http://efcl.info/wp-content/uploads/2011/05/image.png
 [7]: http://efcl.info/wp-content/uploads/2011/05/image1.png
 [8]: http://efcl.info/wp-content/uploads/2011/05/image2.png
 [9]: http://d.hatena.ne.jp/k_maru/20080412/1207985095
 [10]: http://d.hatena.ne.jp/owlcamp/20110305/1299319367
 [11]: http://efcl.info/wp-content/uploads/2011/05/image3.png
 [12]: http://efcl.info/wp-content/uploads/2011/05/image4.png
 [13]: http://efcl.info/wp-content/uploads/2011/05/image5.png
 [14]: http://efcl.info/wp-content/uploads/2011/05/image6.png
 [15]: http://twitter.com/zetamatta
 [16]: http://childs.squares.net/program/nyaos/index.html
 [17]: http://dangan-state.blogspot.com/2011/02/windowsnyaos_28.html
 [18]: http://www.lua.org/
 [19]: https://gist.github.com/908117
 [20]: http://efcl.info/wp-content/uploads/2011/05/image7.png
 [21]: http://www.mokehehe.com/assari/index.php?Lua
 [22]: http://handasse.blogspot.com/2010/02/lua.html
 [23]: http://efcl.info/adiary/096
 [24]: http://nyaos.org/d/
 [25]: http://d.hatena.ne.jp/wantora/searchdiary?word=%2A%5Bnyaos%5D
 [26]: http://efcl.info/2011/0420/res2588/