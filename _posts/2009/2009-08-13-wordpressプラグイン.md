---
title: WordPress 移転と使用プラグインのまとめ
author: azu
layout: post
permalink: /2009/0813/res1242/
SBM_count:
  - '00003<>1355334110<>3<>0<>0<>0<>0'
dsq_thread_id:
  - 303528634
categories:
  - wordpress
tags:
  - blog
  - Gmail
  - rss
  - SBM
  - wordpress
  - まとめ
  - バックアップ
---
&nbsp;

サーバ移転してプラグインやテーマも切り替えたのでメモ。

### サーバ移転の参考

[[WP]WordPressのサーバー&ドメイン移転メモ | emuxx blog][1]
:   基本的なやり方が書いてある。  
    301リダイレクトの方法

[WordPressのサーバー＆ドメイン移転 | WordPress | 『Weblogy』][2]

### WordPressで使ってるプラグイン

[WordPressの自動バックアップをGmailで取る | VIVABlog][3]
:   Gmailにgzipで圧縮したデータベースをバックアップする。

[WordPress › 404 Notifier « WordPress Plugins][4]
:   404が発生したページをRSSまたはメールで知らせてくれる。  
    移転したときなどの調査が楽になる。

[関連エントリーの自動作成プラグイン『YARPP』 | WordPress | 『Weblogy』][5]
:   記事の本文等を解析して、自動的に関連記事をグルーピングするプラグイン。日本語に対応してる。  
    閾値は3にして使用してる。  
    関連記事リストを作成するプラグインのまとめなども書いてあるので読んでおくべき。

[Yuriko.Net » WP-PageNavi を使わずにナビゲーション表示][6]
:   どちらにしてもテーマをいじらないといけないのでこっちの方が楽だった。

[Maintenance Mode Plugin — Software Guide][7]
:   管理者だけにページを表示するメンテナンスモードをつける。  
    [日本語化ファイル][8]

[guff : Post Updated][9]
:   投稿の更新日時を表示するプラグイン。  
    自分的には必須な気がする。デフォルトで用意されてそうな気もするけど。

[WordPress › PS Disable Auto Formatting « WordPress Plugins][10]
:   自動整形を停止するプラグイン。  
    記事やコメントなど適応する範囲を指定できる。  
    過去の記事への適応も考慮されている。  
    自動整形は記事中にソースコードを書いたりする時邪魔になったり、floatをclearするタグが消えたりしてたから入れてた。  
    多分これを入れるとScribeFireとかからの投稿でおかしくなるかも。

[自動整形機能のイライラを軽減するGoogle Syntax Highlighterプラグイン | とりさんのソフト屋さん][11]
:   ソースコードをpreタグに入れてビジュアルとHTMLモードを往復を可能にする。  
    これがあれば自動整形があってもソースが書ける。

[[WP:Plugin] 被ブックマーク数表示＋ランキング生成プラグイン | AOINA.COM][12]
:   国内のSBMに対応してる&記事の被ブックマーク数をカスタムフィールドに保存できる。  
    人気記事をランキングできるので重宝してる。wp-sbm\_popular\_entry

[記事下に注釈を表示するプラグイン「WP-Footnotes」 » FORGET][13]
:   特定のフォーマットで書くことではてなダイアリーみたいな注釈表記ができる。  
    ((の前に半角スペースが必要

[ページトラックバックプラグイン | ABCP-weblog][14]
:   ページにトラックバックを送信する機能をつける.  
    何でデフォルトでないのかが不思議。 ((WordPress2.8以上で動作))

[WordPress › Enhanced Recent Posts « WordPress Plugins][15]
:   新着記事ウィジェットの上位互換です。  
    更新された記事や含むカテゴリーなども設定できる。

[WordPress Plugins/JSeries » Feed Control 日本語版][16]
:   RSSに更新された記事を含められる。  
    ただしATOMは対応してない。対応してるプラグインあったら教えて欲しいです。

&nbsp;

 [1]: http://blog.emuxx.net/wordpress/memo/moving-wordpress.html "[WP]WordPressのサーバー&ドメイン移転メモ | emuxx blog"
 [2]: http://blog.dacelo.info/wordpress/entry-269.html "WordPressのサーバー＆ドメイン移転 | WordPress | 『Weblogy』"
 [3]: http://vivablog.net/wordpressplugin/kiji145/ "WordPressの自動バックアップをGmailで取る | VIVABlog"
 [4]: http://wordpress.org/extend/plugins/404-notifier/ "WordPress › 404 Notifier « WordPress Plugins"
 [5]: http://blog.dacelo.info/wordpress/entry-699.html "関連エントリーの自動作成プラグイン『YARPP』 | WordPress | 『Weblogy』"
 [6]: http://www.yuriko.net/arc/2008/07/26/navigation/ "Yuriko.Net » WP-PageNavi を使わずにナビゲーション表示"
 [7]: http://sw-guide.de/wordpress/plugins/maintenance-mode/ "Maintenance Mode Plugin — Software Guide"
 [8]: http://yonyon-blog.net/youmei/2009/05/01/maintenance-mode-43-%E3%82%92%E6%97%A5%E6%9C%AC%E8%AA%9E%E5%8C%96%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F/ "日本語化ファイル"
 [9]: http://guff.szub.net/2005/02/22/post-updated/ "guff : Post Updated"
 [10]: http://wordpress.org/extend/plugins/ps-disable-auto-formatting/ "WordPress › PS Disable Auto Formatting « WordPress Plugins"
 [11]: http://soft.fpso.jp/develop/wordpress/plugin/entry_1219.html "自動整形機能のイライラを軽減するGoogle Syntax Highlighterプラグイン | とりさんのソフト屋さん"
 [12]: http://aoina.com/archives/18 "[WP:Plugin] 被ブックマーク数表示＋ランキング生成プラグイン | AOINA.COM"
 [13]: http://s-peace.com/1141.html "記事下に注釈を表示するプラグイン「WP-Footnotes」 » FORGET"
 [14]: http://weblog.abcp-net.org/wordpress/page-trackback/ "ページトラックバックプラグイン | ABCP-weblog"
 [15]: http://wordpress.org/extend/plugins/enhanced-recent-posts/ "WordPress › Enhanced Recent Posts « WordPress Plugins"
 [16]: http://wppluginsj.sourceforge.jp/i18n-ja_jp/feed-control/ "WordPress Plugins/JSeries » Feed Control 日本語版"