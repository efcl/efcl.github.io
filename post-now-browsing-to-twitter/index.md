---
title: Post Now browsing to Twitterの解説
author: azu
layout: page
SBM_count:
  - '00013<>1355441518<>10<>0<>1<>2<>0'
dsq_thread_id:
  - 300802656
---
[  
Post Now browsing to Twitter][1]の機能解説ページ。  
今見ているサイトのURLとタイトルにコメントを付けてTwitterにポストするGreasemonkeyスクリプトです。

### 使用方法

OAuthを使ってTwitterへポストするためまずはOAuth認証をする必要があります。  
OAuth認証の手順は以下の動画を参考にして下さい。



文字で書くと、

1.  ステータスバーのGreasemonkeyアイコンを右クリック  
    ユーザースクリプトコマンド→Post Now browsing to Twitter Settingから設定画面へ
2.  OAuth認証をまだしてないなら、&#8221;Sign in with Twitter&#8221;ボタンが表示されるのでクリック
3.  OAuth認証ページが開くので、そこへ行き許可(Allow)する。
4.  PINコードが表示されるのでCtrl+Cなどでコピーする。
5.  再び設定画面に戻り、インプットボックスへPINコードをCtrl+V(ペースト)して、Comfirmボタンを押す。
6.  Success!と出たら認証完了

**投稿の仕方**

1.  投稿したいページで設定したショートカットキーを押す(デフォルトは**Ctrl+Shift+Enter**)
2.  適当にコメントとかを書いたらEnter(設定でCtrl+Enterに変えられます)でTwitterへポストする
3.  投稿できたらOK

この時、設定のUse selectionQuoteに✓チェックが入っていると、選択範囲を引用して投稿することもできます。  
また入力画面でESCキーを押すとキャンセルできます。

### 設定項目

設定画面を開くには**ステータスバーのGreasemonkeyアイコンを右クリック   
ユーザースクリプトコマンド→Post Now browsing to Twitter Setting**をクリックします。

それぞれの設定項目の解説

*   **Prefix**:コメント未入力でポストした時に付ける接頭辞とする文字列
*   **Use selectionQuote**:選択範囲があるときにそれを「」で囲って引用するか?
*   **Short URL**:使用する短縮URLサービス
*   **ShortcutKey**: ポストするために使うショートカット 枠内でキーを押すと自動で入力されます。 デフォルトはCS+Enter  
    テキストボックスで使いたいショートカットキーの組み合わせを押すだけで設定できます。
*   **Post with Ctrl+Enter**:Enterの代わりにCtrl+Enterでポストできるようにします。

使用できる短縮URLサービス

*   <http://bit.ly/> (j.mp) APIにも対応しています。
*   <http://is.gd/>
*   <http://goo.gl/>
*   <http://tinyurl.com/>

*   **bit.ly **: 短縮URLでbit.lyまたはj.mpを選んだときに使用するAPIKEYを変えられます。  
    デフォルトは作者のものになっています。

**OAuth Authorization** : OAuth認証についての設定です。(上記の設定とは別領域に保存されています)  
まだOAuth認証をしていない場合は以下のような表示になるのでOAuth認証をして下さい。  
[<img class="size-medium wp-image-1731 alignnone" title="sshot-2010-06-10-2" src="http://wordpress.local/wp-content/uploads/2010/06/sshot-2010-06-10-2-300x223.png" alt="未認証" width="300" height="223" />][2]

認証が既に済んでいる場合はlogoutボタンが表示されているので、OAuth認証をやり直したい場合の時などそこからOAuth関係の情報を削除できます。(Twitter側のconnection設定が解除されるわけではないので、完全に消す場合は[Twitter / Connections][3]から削除して下さい)

[<img class="alignnone size-medium wp-image-1732" title="sshot-2010-06-10-3" src="http://wordpress.local/wp-content/uploads/2010/06/sshot-2010-06-10-3-300x186.png" alt="" width="300" height="186" />][4]

以上で設定項目は終わりです。  
またサイト固有の行動としてLDRとFastladderの記事上でショートカットキーを押すと、フォーカスがある記事を投稿できます。

### その他機能

*   引用機能  
    設定のUse selectionQuoteに✓チェックが入っているとき、ショートカットキーを押す前に引用したい部分を選択しておくと、選択範囲(複数の選択範囲も対応)の内容を「」で囲んでタイトルの前に付加します。
*   activityFiled(引用とタイトルが表示される部分)の編集  
    activityFiledをクリックまたはコメント入力欄でTabキーを押すことで編集状態になります。  
    引用したい部分を後から少し削りたい時などに使う。  
    [][5][<img class="alignnone size-medium wp-image-1798" title="sshot-2010-06-20-2" src="http://wordpress.local/wp-content/uploads/2010/06/sshot-2010-06-20-21-300x69.png" alt="" width="300" height="69" />][6]

インストールはこちらから**  
**

**Post Now browsing to Twitter for Greasemonkey**
:   [http://userscripts.org/scripts/show/46441][7]

&nbsp;

 [1]: http://userscripts.org/scripts/show/46441
 [2]: http://wordpress.local/wp-content/uploads/2010/06/sshot-2010-06-10-2.png
 [3]: https://twitter.com/settings/connections
 [4]: http://wordpress.local/wp-content/uploads/2010/06/sshot-2010-06-10-3.png
 [5]: http://wordpress.local/wp-content/uploads/2010/06/sshot-2010-06-20-2.png
 [6]: http://wordpress.local/wp-content/uploads/2010/06/sshot-2010-06-20-21.png
 [7]: http://userscripts.org/scripts/show/46441 "Post Now browsing to Twitter for Greasemonkey"