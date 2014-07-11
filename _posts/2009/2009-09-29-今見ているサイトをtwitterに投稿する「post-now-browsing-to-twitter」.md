---
title: 今見ているサイトをTwitterに投稿する「Post Now browsing to Twitter」
author: azu
layout: post
permalink: /2009/0929/res1369/
SBM_count:
  - '00020<>1355409723<>19<>0<>0<>1<>0'
dsq_thread_id:
  - 300802255
categories:
  - Greasemonkey
tags:
  - Firefox
  - Greasemonkey
---
[Post Now browsing to Twitter][1]は今見ているサイトをTwitterに投稿するGreasemonkeyです。  
[「easy I&#8217;m reading now」][2]などすでに同じようなGreasemonkeyがありますが、Post Now browsing to Twitterは  
スクリプトをエディタでいじらなくても設定ができるのと、便利なオプションがあるのが特徴です。

*   [Post Now browsing to Twitter][1]

インストールして、**ステータスバーのGreasemonkeyアイコンを右クリック →  
ユーザースクリプトコマンド→Post Now browsing to Twitter Settingから設定ができます。  
設定は以下を参考にしてください**

**[<img class="alignnone size-medium wp-image-1371" title="2009-09-27 20-03-09" src="http://efcl.info/wp-content/uploads/2009/09/2009-09-27-20-03-09-300x190.png" alt="2009-09-27 20-03-09" width="295" height="148" />][3]  
**

*   **Pre text**:  接頭辞に付ける文字列  
    接頭辞はTwitterにポストする際にコメントを付けなかったときに使われる文字列のことです。
*   **Use selection**: 文字列を選択しているときにそれを「」で囲って引用するか?  
    引用した文字列はコメントと合わせてポストすることができます。  
    FirefoxではCtrlを押しながら選択することで、複数の選択範囲を持つことができます。  
    その場合も各選択範囲を「」で囲いポストできます。
*   **Short URL**: 使用する短縮URLサービス  
    <http://is.gd/> or <http://tinyurl.com/> or <http://tweetburner.com/> のどれかを使って短縮してから  
    ポストできるためより多くの文字列をTwitterにポストできます。
*   **ShortcutKey**: ポストするために使うショートカット
枠内で使いたいショートカットキーを押すと自動で入力されます。  
デフォルトはCS+Return(Ctrl+Shift+Enter) 

*   **Twitter**: 空白のままでも使用できますが、アカウント名とパスワードを入力しておくと、   
    初回のログインプロンプトがスルーできます。   
    **ただし、セキュリティ的な保証はないので、自己責任でお願いします。**

**設定はリロードしてから反映されます。**

### **細かい仕様  
**

*   設定で決めたショートカットを押すと、プロンプトが現れるので、コメントを入力したい場合はコメントを入れて、  
    入れなかった場合は設定で決めた接頭辞が入ったものがTwitterにポストされます。
*   コメント+引用+タイトル+URLの合計が140文字以上になったとき、  
    140文字に収まるようにタイトルの一部を…と省略します。  
    (残すものの優先順はURL > コメント > 引用 > タイトル となっています。)

**Post Now browsing to Twitter for Greasemonkey**
:   [http://userscripts.org/scripts/show/46441][4]

**azu (azu_re) on Twitter**
:   [https://twitter.com/azu_re][5]

 [1]: http://userscripts.org/scripts/show/46441
 [2]: http://twitter.g.hatena.ne.jp/Uchimata/20071008/1191837376
 [3]: http://efcl.info/wp-content/uploads/2009/09/2009-09-27-20-03-09.png
 [4]: http://userscripts.org/scripts/show/46441 "Post Now browsing to Twitter for Greasemonkey"
 [5]: https://twitter.com/azu_re "azu (azu_re) on Twitter"