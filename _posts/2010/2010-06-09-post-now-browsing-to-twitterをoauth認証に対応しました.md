---
title: Post Now browsing to TwitterをOAuth認証に対応しました
author: azu
layout: post
permalink: /2010/0609/res1715/
SBM_count:
  - '00012<>1355431118<>10<>0<>2<>0<>0'
dsq_thread_id:
  - 300802589
categories:
  - Greasemonkey
tags:
  - API
  - Greasemonkey
  - twitter
  - UI
  - 設定
---
Twitterへ今見ているサイトをコメントと共に投稿する「[Post Now browsing to Twitter][1]」が**OAuth認証に対応**しました。  
このGreasemonkeyをインストールする前に、**以前のバージョン(2010年6月より前)のものを入れている場合はそれをアンインストール**してから、改めて「[Post Now browsing to Twitter][1]」をインストールして下さい。(以前と設定の互換が無くなったため設定ごと破棄をお勧めします)  
ツール→Greasemonkey(もしくはステータスバーの猿アイコン)→ユーザースクリプトの管理→Post Now browsing to Twitterを選択→✓関連付けられた設定も削除にチェック→アンインストール

<!--more-->主な変更点を箇条書きすると以下のような感じです。

変更内容  
1. OAuth対応  
BASIC認証が2010年6月末に廃止されるためOAuth認証に対応しました。  
設定画面から認証できます。  
BlowsingNow!などの外部サーバを経由するものとは違い、PINコードを使ってGreasemonkeyスクリプト単体でOAuth認証を行います。  
2. 入力UIがサイトの影響を受けなくなった  
入力UI自体は以前と同じですが、サイト側CSSの影響を受けることがあったのを改善し、影響を受けないようにしました。  
3. 設定項目の変更  
以前と設定項目が変わったため設定の互換性がありません。  
そのため、**以前のものはアンインストールから**インストールして下さい。

1.  短縮URLの選択肢が増えた  
    新たにbit.ly(j.mp)、goo.glを追加しました。  
    bit.ly(j.mp)はAPIの設定も行えます。
2.  Ctrl+Enterでのポスト  
    デフォルトはEnterで送信ですが、設定のチェックの意味が逆になったという変更。(正直気にすることはない)  
    設定でCtrl+Enterでポストするように変更できます。
3.  Twitterアカウントの入力項目廃止  
    以前はベーシック認証を使っていたので、Twitterアカウントの入力項目がありましたが、OAuth認証に対応したため廃止しました。

OAuth認証は設定の一番下に表示されます。(いつでも認証を解除する事ができます。)  
4. 短縮URLのリトライ機能  
短縮URLサービスのサーバにアクセスできないときに(5秒でタイムアウト)、別の短縮URLサービスに切り替えて短縮します。

ぱっとした変化を見ると、OAuthに対応したのと、bit.ly、goo.glなどの短縮URLが使えるようになったぐらいかな。

### OAuth認証の手順

Greasemonkey 単体でOAuth認証を行うようにしたので手順が少し複雑です。  
以下の動画を参考にして下さい。



文字で書くと、

1.  ステータスバーのGreasemonkeyアイコンを右クリック  
    ユーザースクリプトコマンド→Post Now browsing to Twitter Settingから設定画面へ
2.  OAuth認証をまだしてないなら、&#8221;Sign in with Twitter&#8221;ボタンが表示されるのでクリック
3.  OAuth認証ページが開くので、そこへ行き許可(Allow)する。
4.  PINコードが表示されるのでCtrl+Cなどでコピーする。
5.  再び設定画面に戻り、インプットボックスへPINコードをCtrl+V(ペースト)して、Comfirmボタンを押す。
6.  Success!出たら、ページでショートカットキー(デフォルトはCtrl+Shift+Enter)を押し、入力UIを出す。
7.  適当にコメントとかを書いたらEnter(設定でCtrl+Enterに変えられます)でTwitterへポストする
8.  投稿できたらOK

5ぐらいまでがOAuth認証の手順で、6以降は投稿する手順。

以下感想  
OAuthに対応してるGreasemonkeyが皆無で結局自分で色々書かないといけなかった。  
OAuth.jsとかライブラリを使ってるので結構サイズが大きくなった。  
OAuthページとかのアイコンがやっつけ感酷いのでアイコン募集中。

機能説明ページ
**Post Now browsing to Twitter | Web scratch**
:   [https://efcl.info/post-now-browsing-to-twitter/][2]

スクリプト配布ページ
**Post Now browsing to Twitter for Greasemonkey**
:   [http://userscripts.org/scripts/show/46441][3]

 [1]: http://userscripts.org/scripts/show/46441
 [2]: ../post-now-browsing-to-twitter/ "Post Now browsing to Twitter | Web scratch"
 [3]: http://userscripts.org/scripts/show/46441 "Post Now browsing to Twitter for Greasemonkey"
