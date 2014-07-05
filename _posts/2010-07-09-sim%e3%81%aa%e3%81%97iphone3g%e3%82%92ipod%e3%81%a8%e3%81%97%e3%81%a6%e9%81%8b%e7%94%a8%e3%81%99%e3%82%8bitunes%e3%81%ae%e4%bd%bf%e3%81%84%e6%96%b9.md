---
title: SIMなしiPhone3GをiPodとして運用する(iTunesの使い方)
author: azu
layout: post
permalink: /2010/0709/res1829/
SBM_count:
  - '00014<>1355445720<>10<>0<>0<>4<>0'
dsq_thread_id:
  - 300802102
categories:
  - iPhone
tags:
  - cydia
  - DAP
  - iPhone
  - itunes
  - music
  - ソフトウェア
  - 脱獄
---
iPhone4に機種変更して切り替え済みのSIMとiPhone3Gが手元に残ったのでその活用方法を考える。  
SIMは特に返却することが無かったが、切り替えが済んでるのでどういう使い道があるのかよく分からない。  
SIMがないとOSを変えるときiPhoneをアクティベーションできないが、脱獄時にHactivationすることで一応アクティベーションはできる(ただし、動くSIMを入れても電話などが使えなくなるけど)

使えないSIM入れても電波を探索してバッテリーを消耗してる気がするので、今回は最初からSIMなしで運用してみることにする。  
一新してクリーンな環境にしたいので、**OS3.1.2JBで復元**し直して新しい環境を作る。  
SIMなしでiPhone3G(OS3.1.2)を起動すると&#8221;**SIMカードが挿入されていません**&#8220;(&#8220;NO SIM card installed&#8221;)というダイアログがrespring毎にでて大変うっとうしいので、まずはそれが出ないように**機内モードをON**にする。  
なぜか機内モードをONするとSIMが入ってないというアラートが出なくなるのと、機内モードでもwifiは動くので丁度良い。([SIMなし][1]表記の書き換えとかしようとしてたけど飛行機マークになるので必要なくなった)

### iPhoneの音楽プレーヤー

iPhoneに音楽を転送する方法を考えてみると以下の3つぐらいになる。

*   iTunesを使って転送(iPod.appへ登録)
*   iTunesを使わずに転送(iPod.appへ登録)
*   iPhoneにディレクトリを維持したままファイルを転送(iFunboxなどを使う)

iTunes以外の転送ソフトウェアは[iPod管理ソフト &#8211; Wikipedia][2]が詳しい。  
前者2つはiPod.appに登録されるので、iPod.appや関連するアプリで再生できるが、ファイルをそのまま転送した場合はiPod.appでは再生できないので他のプレイヤーアプリが必要となる。

### iTunesを使って運用

iTunes自体は重くて使いにくいが、やはり標準と言うことで補助ソフトがたくさんあるためライブラリの構築はiTunesで行うのが最適そうです。自分のやっている手順を適当に書いてみる

1.  音楽ファイルの入手(CDからリップしたり、ダウンロードしたり)  
    個人が配布してるようなものを多く聞いてるから自動的にmp3タグが付いてないこともしばしば(ファイルはmp3で管理する)
2.  MP3タグの編集  
    タグの編集には[STEP β][3]を使用する。[本体＋標準プラグイン][4]とβ版のexeやプラグインをダウンロードすれば導入できる。  
    ベータ版はアルバムアーティストとコンピレーションに対応しているので、一つのアルバムに複数のアーティストが混じっている場合にそれが統一できるためiTunesのようにフォルダ管理ができないもので結構重宝する。  
    オプションの表示項目からアルバムアーティストとコンピレーションにチェックを入れて使えるようにしておく。  
    [<img class="alignnone size-medium wp-image-1836" title="ss-2010-07-09-1" src="http://efcl.info/wp-content/uploads/2010/07/ss-2010-07-09-1-300x274.png" alt="" width="300" height="274" />][5]  
    iTunes(iPod)ではアルバムアーティストを統一すると、アーティスト毎にアルバムが重複して表示されなくなるのでiPod上でまともに曲を扱うには必要、またコンピレーションに&#8221;はい&#8221;をいれた場合compilationという場所で管理される。  
    STEPで編集したものはアルバム毎のフォルダに分けてフォルダ管理している
3.  iTunesライブラリに登録  
    曲をフォルダ管理している人はiTunesでの管理(データベース型)にちょっと拒否感が出たりしますがフォルダ管理のままiTunesでも曲をコピーせず管理することができます。  
    [iTunes Library Updater][6]というソフトウェアを使います。iTLUは特定のフォルダにある曲をiTunesのライブラリに登録してくれるソフトウェアです。  
    例えばMUSICSというフォルダ以下にフォルダ管理した曲を置いておいて、iTLUでMUSICSを指定すればその中身を全部登録してくれます。  
    iTLUで設定を保存するにはsave profileを押して.itluというファイルを作ると次回は.itluをクリックして起動すると設定が維持された状態で起動できます。
4.  アートワークの登録  
    フォルダ管理していた場合はfolder.jpgなどフォルダ内にジャケットなどを置いて管理している人もいると思います。  
    それらをiTunesのアートワークに登録するには[iArtworx][7]というソフトウェアが便利です。  
    曲があるフォルダに.jpgのファイルを見つけると自動的にアートワークに設定してくれれます。(pngができないのが残念)  
    アートワークがローカルになくて新たにインターネット上から探すには[Broadway][8]が便利です。(以前はVoralent Invidiという名前だった)iTunesで再生している曲にあってそうな画像を検索してアートワークとして設定できます。またローカルにある画像も直接指定できたりします。  
    これら2つのアートワークソフトはmp3に直接画像を埋め込む事ができるので他の音楽管理ソフトに移行してアートワークが表示されるので便利です。
5.  楽曲の整理  
    フォルダ管理している場合は適当な表記でもあまり問題ありませんがデータベース型だと表記の揺れで重複が出たり細かい点で困ったりする事があります。そのような表記揺れを解決するソフトとして[beaTunes][9](シェアウェア)が便利です。  
    beaTunes2はアーティスト名の表記揺れやデットリンクやアルバムアーティストとコンピレーションの適切がどうかなど細かい事を自動的に処理できます。日本語のアーティスト名などの表記揺れなども解決できます。

後はiPhoneと同期すればiPod.appに反映します。

### iPhoneで再生

iPhoneで同期した音楽を再生するのにはiPod.appや他のアプリなどが使えます。  
しかしどのアプリもiPhoneアプリで**アルバム**の最後の曲が終わったら自動で隣の**アルバム**へみたいな事ができなくて若干困ってる。(最後の曲が終わると停止してしまう)  
プレイリストを作って聞けという方針なのか謎ですが、プレイリストの作りやすいアプリだと[Amp Music Player][10]あたりがお勧めです。  
是非上の事が解決できる方法が合ったら教えて下さい。

### PC上での再生

PC上での再生は元々フォルダ管理したものがそのまま使えるので、以前と同じ環境で聞くこともできます。  
せっかくiTunesでライブラリを構築したのでそれを利用して聞きたいと思います。そこで使えるのが[MusicBee &#8211; Music Manager and Player][11]という音楽プレイヤーです。iTunesからライブラリをインポートしたり、iPhoneとも同期できたりするので、人によってはiTunes自体が不必要になるかも知れません(アートワーク周りはiTunesが補助ソフトが多くていい)  
[MusicBee ][11]自体も軽量で使いやすいプレイヤーなので、そのまま使えるのは魅力的だと思います。

### iTunesを使わない運用

脱獄向けです。  
簡単に書くとフォルダごとそのままiPhoneに転送して、どうにかしてiPhoneでそのフォルダに入ってる曲を聴くというものです。  
iPhoneでエクスプローラのように探索して曲を聴くにiFileを使うことができます(確か有料版の機能)そのままフォルダ内の曲が再生できるのでお手軽です。  
もう一つはpwnplayer liteを使う方法。pwnplayer liteは既にレポジトリなどからなくなってるので直接debファイルを拾ってインストールする必要があるみたいです。[PwnPlayer Lite][12] にありましたが保証はしないので自己責任で導入して下さい。導入すると  
*/var/mobile/Media/Music/*にある音楽ファイルを直接再生できます。  
最後の方法は面倒でローカルにサーバを立ててooTunesのようなサーバからダウンロードできるタイプのアプリを使って再生する方法です。

[iPod touch/2.0以降/lighttpd &#8211; ひとりウィキ][13] を参考にlighttpdを導入して(sbsettingの方もあると便利)ローカルでサーバを動かします。自分が使ったファイルは[2010-07-09\_lighttpd\_setに置いておきます。][14]

苦労する割にはいまいちな感じがあります。

iPhoneで再生が普通のDAPレベルになってくれればもっと良くなると思います。Rockboxが使えたり、Androidのインストールがもっと良くなることを祈りましょう。

**//////**//D6F.com// iArtworx  
**
:   [http://www.d6f.com/][15]

**Broadway &#8211; Voralent Computer Service**
:   [http://www.voralent.com/products/broadway/][16]

**beaTunes ~ build better playlists**
:   [http://www.beatunes.com/][17]

**STEP Wiki &#8211; β版のダウンロード &#8211; 最新β版のダウンロードができます。**
:   [http://haseta2003.hp.infoseek.co.jp/cgi-bin/index.cgi?%a6%c2%c8%c7%a4%ce%a5%c0%a5%a6%a5%f3%a5%ed%a1%bc%a5%c9][18]

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow: hidden;">
  <h3 class="r">
    <a class="l" onmousedown="return rwt(this,'','','','1','AFQjCNH7C9DrKx6wyetcXqNbAk3lAJSXgw','MJq5RKweu_SQs0wadBvc-g','0CBgQFjAA')" href="http://www.hackint0sh.org/f207/93231.htm" target="_blank"><em>Hactivation</em></a>
  </h3>
</div>

 [1]: http://twitter.com/azu_re/status/17583551461
 [2]: http://ja.wikipedia.org/wiki/IPod%E7%AE%A1%E7%90%86%E3%82%BD%E3%83%95%E3%83%88
 [3]: http://haseta2003.hp.infoseek.co.jp/cgi-bin/index.cgi?%a6%c2%c8%c7%a4%ce%a5%c0%a5%a6%a5%f3%a5%ed%a1%bc%a5%c9
 [4]: http://haseta2003.hp.infoseek.co.jp/cgi-bin/index.cgi?%a5%c0%a5%a6%a5%f3%a5%ed%a1%bc%a5%c9
 [5]: http://efcl.info/wp-content/uploads/2010/07/ss-2010-07-09-1.png
 [6]: http://itlu.ownz.ch/wordpress
 [7]: http://www.d6f.com/
 [8]: http://www.voralent.com/products/broadway/
 [9]: http://www.beatunes.com/
 [10]: http://appshopper.com/music/amp-music-player
 [11]: http://www.getmusicbee.com/
 [12]: http://ipod-touch-max.ru/cydia/index.php?cat=package&id=5933
 [13]: http://kitta.jf.land.to/index.cgi?page=iPod+touch%2F2.0%B0%CA%B9%DF%2Flighttpd
 [14]: http://efcl.info/wp-content/uploads/2010/07/2010-07-09_lighttpd_set.zip
 [15]: http://www.d6f.com/ "//////**//D6F.com//"
 [16]: http://www.voralent.com/products/broadway/ "Broadway - Voralent Computer Service"
 [17]: http://www.beatunes.com/ "beaTunes ~ build better playlists"
 [18]: http://haseta2003.hp.infoseek.co.jp/cgi-bin/index.cgi?%a6%c2%c8%c7%a4%ce%a5%c0%a5%a6%a5%f3%a5%ed%a1%bc%a5%c9 "STEP Wiki - β版のダウンロード - 最新β版のダウンロードができます。"