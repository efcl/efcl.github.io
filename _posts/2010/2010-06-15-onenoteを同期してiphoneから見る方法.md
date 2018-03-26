---
title: OneNoteを同期してiPhoneから見る方法
author: azu
layout: post
permalink: /2010/0615/res1769/
SBM_count:
  - '00016<>1355446281<>14<>0<>1<>1<>0'
dsq_thread_id:
  - 300823053
categories:
  - OneNote
tags:
  - Evernote
  - Microsoft
  - OCR
  - スクラップ
  - ソフトウェア
---
OneNoteをiPhoneから見ることを目的とした記事です。  
[OneNote][1]はevernoteと比較されがちなソフトですが、evernoteはiPhoneなどとも連携がとれるので、その部分でevernoteを選んで使っている人も多いでしょう。  
Webサイトのスクラップや自由なレイアウトや画像の貼り付け、筆圧対応のペンタブ、画像のOCR(2010は日本語も対応)していて何よりevernoteより軽いのでとても良いソフトだと思います。[  
スタパビジョン－Microsoft 「Office OneNote 2007」][2] でも言ってましたがマイクロソフトの製品とは思えないぐらい優れたソフトウェアです。

OneNote自体の話はここまでにしておいて、OneNoteのファイルをiPhoneから見る方法が[MobileNoter][3]ぐらいしか存在してないので、iPhoneとOneNoteを連携させる方法を作ってみました。

追記:MSから公式で[Microsoft OneNote][4]のiPhoneアプリが出ています。  
おそらく海外アカウントがないとダウンロードできませんが、無料でWindows Liveに保存してあるOneNoteファイルを閲覧できます。  
Windows Liveに自動的に同期できるのは2010からだと思うので、下記は2007や[OneNote][4]アプリでは完全な形で閲覧できるわけではないので、見づらくても完璧な形で見たいという人向けの内容になります。  
(Onenoteアプリ自体は結構できがよいので、無理に下記の方法をとるべきではないかもしれないです)

<!--more-->用意するもの

*   **OneNote 2007 **(2010はOneNote2PDFが動くか知りません)
*   [OneNote2PDF][5] (OneNoteファイルをPDF化。修正したものは下に)
*   フォルダ監視ソフト (今回は[フォルダ監視][6]を使います)
*   オンラインストレージサービス(今回は[Dropbox][7]を使用)

最初に結論から述べると**OneNote→自動バックアップ→フォルダ監視→OneNote2PDF→Dropbox→iPhone**という手順でiPhoneからOneNoteファイルを参照できるようにします。  
[<img class="aligncenter size-medium wp-image-1771" title="OneNoteとiPhone連携" src="https://efcl.info/wp-content/uploads/2010/06/05991e5828429f6a6d8cb5e00d205dc4-300x83.png" alt="" width="365" height="100" />][8]

### OneNote2PDF

今回の要になるOneNote2PDFというソフトはOneNoteの.oneファイルをPDFへ変換できるソフトです。  
公開されているものは出力するPDFのファイル名がIDになっていたのでOneNoteのページ名と合わせるように改造したものを置いておきます。

*   [View onenote2pdf-0-3-zip][9] (mirror:[OneNote2PDF_0.3][10]) からダウンロード

**OneNote2PDFの使い方**

OneNote2PDFはコマンドラインで動くソフトウェアでOneNoteのノートブックを単位としてそのノートブックにあるページをPDFに変換できます。  
まずはOneNoteの構造を知っておくと変換の指定に役立つでしょう。  
OneNoteはノートブック > セクション > ページ という構造を取っていて、OneNote2PDFを使うには変換したいノートブック名を知る必要があります。  
[<img class="aligncenter size-medium wp-image-1774" title="sshot-2010-06-14-3" src="https://efcl.info/wp-content/uploads/2010/06/sshot-2010-06-14-3-300x43.png" alt="" width="300" height="43" />][11]先ほどダウンロードしたOneNote2PDFのディレクトリをコマンドプロンプトで開きます。  
OneNote2PDFがあるディレクトリで*help*と打てば、ソフトの使い方や引数などの表示が出てきます。  
また[Export OneNote to PDF][12]にも引数について書いてありますが、helpコマンドにしか載ってないものもありました。  
[<img class="alignnone size-medium wp-image-1775" title="sshot-2010-06-14-1" src="https://efcl.info/wp-content/uploads/2010/06/sshot-2010-06-14-1-300x156.png" alt="" width="300" height="156" />][13]

helpの一番下に変換の例が書いてあります。

OneNote2PDF -Notebook &#8220;private&#8221;  -CacheFolder C:TempOneNote -Output D:TempOneNote -ExportNotebook true

これは、&#8221;private&#8221;というノートブックをキャッシュフォルダにC:TempOneNoteを使い、出力先はD:TempOneNoteとしてPDFを出力するという意味になります。ExportNotebookをtrueにするとノートブック全体を出力する事になる。  
キャッシュフォルダは次回変換時に同じものなら変換しないなど頭の良い処理をしてくれるのでoutputと同じところを指していいと思います。  
このようにノートブックが変換のする対象となっているので、ノートブック名を知っておく必要があります。

OneNote2PDF -ListAllNotebook true

と入力すると、OneNoteでのノートブック名一覧が表示されるのでメモっておくと良いでしょう。  
ノートブックの一部セクションは変換対象から外したい時は-Excludeを指定します。

OneNote2PDF -Notebook &#8220;private&#8221; -Exclude &#8220;secret&#8221; -CacheFolder C:TempOneNote -Output D:TempOneNote -ExportNotebook true

上記のコマンドは&#8221;private&#8221;ノートブックのsecretセクション以外をPDFに変換します。  
他にもオプションはありますが、iPhoneから見る必要があるものを変換するようにしたものを付属のrun.batに書いておきます。(本家の方も参考に)

<pre>set OneNote2PDF=.OneNote2PDF.exe
set option=-TOCLevel 10 -ExportNotebook true"
%OneNote2PDF% %option% -Notebook "private" -CacheFolder "D:MyDocumentsMy DropboxOneNote" -Output "D:MyDocumentsMy DropboxOneNote"
%OneNote2PDF% %option% -Notebook "job" -CacheFolder "D:MyDocumentsMy DropboxOneNote" -Output "D:MyDocumentsMy DropboxOneNote"</pre>

上記の内容は&#8221;private&#8221;と&#8221;job&#8221;のノートブックを変換したものをDropboxフォルダに入れるという意味になります。  
自分の環境に合わせたものを作ったら下準備は完了です。  
次はこの処理を自動化していきます。

### OneNoteファイルのPDF化を自動化

ここまでは手動でOneNoteファイルをPDF化していましたが、これをOneNoteが更新されたら自動でPDF化するようにしていきます。

1.  OneNoteの設定  
    ツール→オプションで、[保存]タブからバックアップの場所(パス)を知っておきます。  
    次に、[バックアップ]タブでバックアップの間隔を初期値の一日から任意の時間に変更します(ここでは10分とする)
2.  [フォルダ監視][6]の設定** (詳細設定で行う)  
    フォルダ監視の設定**から先ほど調べたバックアップの場所(パス)を追加し、<span style="text-decoration: underline;">サブフォルダも監視</span>にチェックをします  
    **対象ファイルの設定**に行き、監視対象を更新、リネームにしておきます。(落書きノート.*を対象外にするといいかも)  
    **プログラム起動設定**に行き、起動単位を<span style="text-decoration: underline;">全体</span>にしてプログラムに先ほど作成したrun.batを指定します。  
    最後に監視する間隔(メニュー上部にある)をOneNoteのバックアップ間隔に合わせて10分毎にしています。

これで、OneNote→自動バックアップ→フォルダ監視→OneNote2PDF→Dropbox→iPhoneという流れができOneNoteがバックアップを取ったらそれをPDFへ変換してDropboxに入れるという事ができます。  
Dropboxフォルダに入れればiPhoneからも参照できるので、GoodReaderなどのアプリを使ってOneNoteファイルを変換したものを閲覧できます。OneNote2PDFはOneNoteのAPIを使ってPDFに変換しているので、表示はそのまま再現でき、また透明テキストも埋め込んであります。  
Dropboxと連携機能を持つアプリは[Dropbox Partner Apps][14]に載っています。

以下は[GoodReader][15]で表示したスクリーンショットです。(左はそのまま、右はテキストだけを表示)  
[<img class="alignnone size-medium wp-image-1776" title="IMG_0312" src="https://efcl.info/wp-content/uploads/2010/06/IMG_0312-200x300.png" alt="" width="200" height="300" />][16][<img class="alignnone size-medium wp-image-1777" title="IMG_0313" src="https://efcl.info/wp-content/uploads/2010/06/IMG_0313-200x300.png" alt="" width="200" height="300" />][17]

このようにiPhoneからもOneNoteのファイルを間接的にですが見ることができました。  
iPhoneからOneNoteへのメモができない事や二重にファイルを持つという欠点はありますが、いつでもiPhoneからも参照できるという点はかなり便利になります。

これで、iPhoneからもOneNoteが見られるため自分はevernoteを使う理由はほとんど無くなりました。是非OneNoteを一度使ってみてはどうでしょうか。(ちょっと変換しすぎて[Dropbox][7]の容量が少し厳しくなってきた。)  
まだDropbox登録してない人は[増量キャンペーン][7]から登録してくれるとありがたい。

[改変したソースコードonenote2pdf-zip][18]

 [1]: http://office.microsoft.com/ja-jp/onenote/
 [2]: http://video.watch.impress.co.jp/docs/stapa/20090818_308771.html
 [3]: http://www.mobilenoter.com/
 [4]: http://itunes.apple.com/us/app/onenote/id410395246?mt=8# "Microsoft OneNote"
 [5]: http://onenote2pdf.codeplex.com/
 [6]: http://www10.plala.or.jp/tukaeru/soft/folders.html
 [7]: https://www.dropbox.com/referrals/NTEzMjQ3NTk
 [8]: https://efcl.info/wp-content/uploads/2010/06/05991e5828429f6a6d8cb5e00d205dc4.png
 [9]: http://drop.io/OneNote2PDF/asset/onenote2pdf-0-3-zip "onenote2pdf-0-3-zip"
 [10]: https://efcl.info/wp-content/uploads/2010/06/OneNote2PDF_0.3.zip
 [11]: https://efcl.info/wp-content/uploads/2010/06/sshot-2010-06-14-3.png
 [12]: http://onenote2pdf.codeplex.com/wikipage?title=OneNote2PDF%20Usage&referringTitle=Home
 [13]: https://efcl.info/wp-content/uploads/2010/06/sshot-2010-06-14-1.png
 [14]: https://www.dropbox.com/anywhere/apps
 [15]: http://www.goodiware.com/goodreader.html
 [16]: https://efcl.info/wp-content/uploads/2010/06/IMG_0312.png
 [17]: https://efcl.info/wp-content/uploads/2010/06/IMG_0313.png
 [18]: http://drop.io/tgnonmj/asset/onenote2pdf-zip "onenote2pdf-zip"
