---
title: Windows OS再インストールの事前にするべき事まとめ
author: azu
layout: post
permalink: /2009/0211/res541/
SBM_count:
  - '00024<>1355442458<>20<>0<>1<>3<>0'
dsq_thread_id:
  - 300846776
categories:
  - まとめ
tags:
  - Firefox
  - vista
  - ソフトウェア
  - バックアップ
  - レジストリ
---
<p style="text-align: left;">
  自分用にVista OSの再インストール(クリーンインストール)をしてからSP1にアップグレードするまでのメモ書き<br /> 準備をしながら書き加えていく。<br /> 一番最初に
</p>

<h3 style="text-align: left;">
  <a href="http://www.runexy.co.jp/personal/acronis_trueimage_11/outline/">True Image</a>や<a href="http://www.forest.impress.co.jp/article/2008/10/01/paragondrivebackup.html">Paragon Drive Backup</a>などを使い、失敗に備えてバックアップを作成しておく。
</h3>

<p style="text-align: left;">
  <!--more-->
  
  <br class="spacer_" />
</p>

<ul style="text-align: left;">
  <li>
    <h2>
      ソフトウェアの設定とレジストリ
    </h2>
  </li>
</ul>

<ol style="text-align: left;">
</ol>

<dl style="text-align: left;">
  <dt>
    <strong>SaveSet</strong>
  </dt>
  
  <dd>
    <a href="http://www.vector.co.jp/soft/win95/util/se107331.html">http://www.vector.co.jp/soft/win95/util/se107331.html</a>
  </dd>
</dl>

<p style="text-align: left;">
  レジストリを使わないソフトは普段からProgramフォルダには入れないで、別のSoftwareというフォルダに入れていたので、<br /> それはコピーするだけで移行が出来るので簡単です。<br /> しかし、多くのソフトはインストーラーを使ったレジストリにシリアルや設定などを記録しています。<br /> そのようなソフトが数多くあると移行するのがかなり面倒になるので、それらのソフト毎のレジストリを保存(=ソフト毎の設定を保存)<br /> して移行後ソフトをインストールしてからレジストリに値を書き戻せばすんなりと移行ができます。<br /> <a href="http://www.vector.co.jp/soft/win95/util/se107331.html">SaveSet</a>というソフトを使えば、<a href="http://www.vector.co.jp/soft/win95/util/se107331.html"></a>レジストリを各ソフト毎に保存できます。<br /> <a href="https://efcl.info/wp-content/uploads/2009/02/screenshot023.png"><img class="alignnone size-medium wp-image-543" title="screenshot023" src="https://efcl.info/wp-content/uploads/2009/02/screenshot023-300x170.png" alt="screenshot023" width="300" height="170" /></a>
</p>

<p style="text-align: left;">
  自分で書式に従って書けば対応ソフトを増やすこともできます。
</p>

<p style="text-align: left;">
  <em>ソフトウェアをインストール→ソフトが起動してない状態で書き出した.regを実行</em>
</p>

<dl style="text-align: left;">
  <dt>
    <strong>登録エントリ (.reg) ファイルを使用してレジストリ サブキーおよび値を追加、変更、または削除する方法</strong>
  </dt>
  
  <dd>
    <a href="http://support.microsoft.com/kb/310516/ja">http://support.microsoft.com/kb/310516/ja</a>
  </dd>
</dl>

<dl style="text-align: left;">
  <dt>
    <strong>Windows 転送ツール</strong>
  </dt>
  
  <dd>
    <a href="http://www.microsoft.com/japan/windows/products/windowsvista/buyorupgrade/easytransfer.mspx">http://www.microsoft.com/japan/windows/products/windowsvista/buyorupgrade/easytransfer.mspx</a>
  </dd>
</dl>

<p style="text-align: left;">
  Windows標準のバックアップツール。<br /> コントロールパネルの設定やフォルダ毎に保存しておける。
</p>

<ul style="text-align: left;">
  <li>
    <h2>
      各ソフトウェア毎のやっておくべき事
    </h2>
  </li>
</ul>

<ul style="text-align: left;">
  <li>
    <strong>iTunes</strong>
  </li>
</ul>

<p style="text-align: left;">
  iTunes ライブラリーを保存しておくことと(復元は起動時にShift押しながらでフォルダを選択できる)認証を解除しておく。
</p>

<ul style="text-align: left;">
</ul>

<dl style="text-align: left;">
  <dt>
    <strong>iTunes Store の認証と認証解除について</strong>
  </dt>
  
  <dd>
    <a href="http://docs.info.apple.com/article.html?artnum=93014-ja">http://docs.info.apple.com/article.html?artnum=93014-ja</a>
  </dd>
</dl>

<p style="text-align: left;">
  OSをクリーンインストールする前にそのPCで認証を解除しておかないと、PC台数によっては困る。<br /> 一応、年に１度、すべての認証を解除することができる。救済処置がある。<strong></strong>
</p>

<ul style="text-align: left;">
  <li>
    <strong>Firefoxのプロファイル</strong>
  </li>
</ul>

<dl style="text-align: left;">
  <dt>
    <strong>MozBackup</strong>
  </dt>
  
  <dd>
    <a href="http://mozbackup.jasnapaka.com/">http://mozbackup.jasnapaka.com/</a>
  </dd>
</dl>

<p style="text-align: left;">
  <a title="Mozilla Firefox: Homepage" href="http://www.mozilla.com/firefox/">Mozilla Firefox</a>, <a title="Mozilla Thunderbird: Homepage" href="http://www.mozilla.com/thunderbird/">Mozilla Thunderbird</a>, <a title="Mozilla Sunbird: Homepage" href="http://www.mozilla.org/projects/calendar/sunbird/">Mozilla Sunbird</a>, <a title="Flock: Homepage" href="http://www.flock.com/">Flock</a>, <a title="SeaMonkey: Homepage" href="http://www.mozilla.org/projects/seamonkey/">SeaMonkey</a>, <a title="Mozilla Suite: Homepage" href="http://www.mozilla.org/products/mozilla1.x/">Mozilla Suite</a>, <a title="Spicebird: Homepage" href="http://www.spicebird.com/">Spicebird</a>, <a title="Netscape Browser: Homepage" href="http://browser.netscape.com/">Netscape</a> <br /> のプロファイルをバックアップ、復元できるソフト。<br /> 支障がでる場合が多いので、クッキーはできるだけ破棄した方がよい。<br /> 初期の吐き出し場所はCドライブ直下？
</p>

<p style="text-align: left;">
  もしくは手動で<em>英字乱数.プロファイル名</em>を保存しておけばいい。
</p>

<ol style="text-align: left;">
  <li>
    evernoteなどのメモ帳ソフトのデータエクスポート
  </li>
  <li>
    ATOKやIMEのユーザ辞書
  </li>
  <li>
    設定をエクスポートできるソフト
  </li>
</ol>

<p style="text-align: left;">
  <br class="spacer_" />
</p>

<ul style="text-align: left;">
  <li>
    <h2>
      インストールしているソフトを記録
    </h2>
  </li>
</ul>

<p style="text-align: left;">
  人の記憶はあやふやなものなので、インストールしているソフトを忘れしまいます。<br /> なので後からたどれるようにファイルとしてはっきり残しておくのが良いと思います。
</p>

<dl style="text-align: left;">
  <dt>
    <strong>Safarp</strong>
  </dt>
  
  <dd>
    <a href="http://wistinga.online.fr/safarp/">http://wistinga.online.fr/safarp/</a>
  </dd>
</dl>

<p style="text-align: left;">
  元々軽量なアンインストーラーですが、HTML, RTF, CSVなどのファイルとしてインストール済みのソフト書き出すことができます。
</p>

<dl style="text-align: left;">
  <dt>
    <strong>Belarc Advisor</strong>
  </dt>
  
  <dd>
    <a href="http://www.belarc.com/free_download.html">http://www.belarc.com/free_download.html</a>
  </dd>
</dl>

<p style="text-align: left;">
  こちらもhtmlファイルとしてインストール済みのソフト一覧をはき出しますが、ドライバやシリアルなど一部に対して詳細な情報も含むので<br /> 2つで記録を残しておくのが良いと思います。
</p>

<dl style="text-align: left;">
  <dt>
    <strong>Magical Jelly Bean Keyfinder</strong>
  </dt>
  
  <dd>
    <a href="http://magicaljellybean.com/keyfinder/">http://magicaljellybean.com/keyfinder/</a>
  </dd>
</dl>

<p style="text-align: left;">
  OSのプロダクトキーや有名なソフトのキーを出してくれるので一応取っておく。
</p>

<dl style="text-align: left;">
  <dt>
    <strong>窓の杜 &#8211; 【NEWS】OS再インストール時に各種ドライバーを一括インストールできる「DriverMax」</strong>
  </dt>
  
  <dd>
    <a href="http://www.forest.impress.co.jp/article/2006/09/15/drivermax.html">http://www.forest.impress.co.jp/article/2006/09/15/drivermax.html</a>
  </dd>
</dl>

<p style="text-align: left;">
  DriverMaxを使い各ドライバを一括で保存しておく。<br /> これとは別に、無線LANのドライバや<a href="http://downloadcenter.intel.com/Detail_Desc.aspx?agr=N&DwnldId=12150&lang=jpn">INF Update Utility</a>などのチップセットをダウンロードしておくといい。
</p>

<ul style="text-align: left;">
  <li>
    <h2>
      再インストール後に入れるソフトをダウンロード
    </h2>
  </li>
</ul>

<p style="text-align: left;">
  再インストール後に入れる順番で書いてみる
</p>

<dl style="text-align: left;">
  <dt>
    <strong>Windows Vista Service Pack</strong>
  </dt>
  
  <dd>
    <a href="http://www.microsoft.com/downloads/details.aspx?familyid=B0C7136D-5EBB-413B-89C9-CB3D06D12674&displaylang=ja">http://www.microsoft.com/downloads/details.aspx?familyid=B0C7136D-5EBB-413B-89C9-CB3D06D12674&displaylang=ja</a>
  </dd>
</dl>

<p style="text-align: left;">
  Serviceパックをまず最初に入れる。これまでのWindows Updateを全て含んでいる。
</p>

<dl style="text-align: left;">
  <dt>
    <strong>INF Update Utility</strong>
  </dt>
  
  <dd>
    <a href="http://downloadcenter.intel.com/Detail_Desc.aspx?agr=N&DwnldId=12150&lang=jpn">http://downloadcenter.intel.com/Detail_Desc.aspx?agr=N&DwnldId=12150&lang=jpn</a>
  </dd>
</dl>

<p style="text-align: left;">
  Intelのチップセット
</p>

<ol style="text-align: left;">
  <li>
    <strong>各デバイスのドライバ</strong><strong>(無線LANや周辺機器のドライバ)</strong>
  </li>
  <li>
    セキュリティソフト
  </li>
  <li>
    <a href="http://www.microsoft.com/downloads/details.aspx?displaylang=ja&FamilyID=a5c84275-3b97-4ab7-a40d-3802b2af5fc2">Microsoft Visual C++ 2008 SP1再頒布可能パッケージ(日本語版)</a>や<a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=AB99342F-5D1A-413D-8319-81DA479AB0D7&displaylang=ja">.NET Framework 3.5 Service Pack 1</a>などのライブラリー
  </li>
  <li>
    ブラウザ(Firefoxなど)
  </li>
  <li>
    インストールしたいソフトウェア
  </li>
</ol>

<p style="text-align: left;">
   
</p>

*   <h2 style="text-align: left;">
      実際に行う
    </h2>

以下のような順序で再インストールを行った。

1.  まずはバックアップ
2.  OSのクリーンインストール
3.  SP1パッチを当てる
4.  ここでもう一度バックアップ
5.  無線LANのドライバをインストール
6.  セキュリティソフト
7.  Windows Updata(２回ぐらい再起動した)
8.  各ソフトのインストール
9.  レジストリやWindows転送ツールで設定の復元
10. 一部は手動で再設定

<br class="spacer_" />

<br class="spacer_" />

<p style="text-align: left;">
  <strong><br /> </strong>
</p>

<ul style="text-align: left;">
  <li>
    <h2>
      参考サイト
    </h2>
  </li>
</ul>

<dl style="text-align: left;">
  <dt>
    <strong>OSのインストール手順</strong>
  </dt>
  
  <dd>
    <a href="http://www.daw-pc.info/windows/inst.htm">http://www.daw-pc.info/windows/inst.htm</a>
  </dd>
</dl>

<p style="text-align: left;">
  <br class="spacer_" />
</p>

<dl style="text-align: left;">
  <dt>
    <strong>再セットアップに備えた環境作り &#8211; 覚えらんない人のためのオンラインソフト備忘録</strong>
  </dt>
  
  <dd>
    <a href="http://d.hatena.ne.jp/ka8823ge/20051220">http://d.hatena.ne.jp/ka8823ge/20051220</a>
  </dd>
</dl>

<p style="text-align: left;">
  自分がやろうとしてることに近い方法
</p>

<dl style="text-align: left;">
  <dt>
    <strong>転ばぬ先のバックアップ</strong>
  </dt>
  
  <dd>
    <a href="http://www.geocities.jp/dai832/bp/bp-index.htm">http://www.geocities.jp/dai832/bp/bp-index.htm</a>
  </dd>
</dl>

<p style="text-align: left;">
  段階別心構え
</p>

<dl style="text-align: left;">
  <dt>
    <strong>OS再インストール関連情報まとめ &#8211; 萌え理論Blog</strong>
  </dt>
  
  <dd>
    <a href="http://d.hatena.ne.jp/sirouto2/20070223/1172236093">http://d.hatena.ne.jp/sirouto2/20070223/1172236093</a>
  </dd>
</dl>

<p style="text-align: left;">
  リンク集-ソフトウェアの参考
</p>

<dl style="text-align: left;">
  <dt>
    <strong>再インストの前にこれをバックアップしろ！！ &#8211; windows</strong>
  </dt>
  
  <dd>
    <a href="http://www.wikihouse.com/windows/index.php?%BA%C6%A5%A4%A5%F3%A5%B9%A5%C8%A4%CE%C1%B0%A4%CB%A4%B3%A4%EC%A4%F2%A5%D0%A5%C3%A5%AF%A5%A2%A5%C3%A5%D7%A4%B7%A4%ED%A1%AA%A1%AA">http://www.wikihouse.com/windows/index.php?%BA%C6%A5%A4%A5%F3%A5%B9%A5%C8%A4%CE%C1%B0%A4%CB%A4%B3%A4%EC%A4%F2%A5%D0%A5%C3%A5%AF%A5%A2%A5%C3%A5%D7%A4%B7%A4%ED%A1%AA%A1%AA</a>
  </dd>
</dl>

<table style="text-align: left; height: 448px; width: 500px;" border="1" align="left">
  <caption>おまけ-実行時の実況-</caption> <tr>
    <th>
      <span style="font-size: x-small;"> 用意してたソフトをインストール。レジストリから設定を復活。一部は手動で復活。 　(2009/02/11 0:32:57) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> もう一度アップデートしたらちゃんと適応できた。 　(2009/02/10 21:21:12) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> できなかったのはIntelのチップセットあたりの更新が含まれてたからっぽい。 　(2009/02/10 21:09:09) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> Windows Updateに失敗した。 　(2009/02/10 20:50:38) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> revo を使って初期に入ってるソフトをアンインストール。Jwordが初期に入ってたので軽くショック。 　(2009/02/10 19:59:00) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> 復活したLAN設定でWEPキーを入力してつなげる。Windows Updateが大量にやってくる 　(2009/02/10 19:50:57) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> Windows転送ツールを使いWindowsの設定を戻した。大部分は戻るみたい。 　(2009/02/10 19:41:50) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> ウイルス対策ソフト(F-Secure)を入れた 　(2009/02/10 19:41:23) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> バックアップをとったので各ソフトのインストールを始める。 　(2009/02/10 19:27:56) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> よくよく考えたらTrue imageCDからバックアップできたね。 　(2009/02/10 18:39:32) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> Acronis True Image Homeをバックアップをとるためにインストール。 　(2009/02/10 18:35:31) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> ネットワークアダプタのドライバーを入れた。 　(2009/02/10 18:17:23) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> SP1になった。成功。 　(2009/02/10 18:12:44) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> 一回目の再起動が始まった 　(2009/02/10 17:48:16) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> Vista起動。SP1のパッチをインストールする。久々にVistaのデフォルトみてこんなにアニメーションしてたことに驚いた。 　(2009/02/10 17:37:01) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> Vistaが立ち上がり、ユーザー名やパスワードの設定をする。 　(2009/02/10 17:31:05) </span>
    </th>
  </tr>
  
  <tr>
    <th>
      <span style="font-size: x-small;"> OS Vista メーカ標準のツールでクリーンインストール開始。(Ghostというやつかな) 　(2009/02/10 17:24:30) </span>
    </th>
  </tr>
</table>
