---
title: GreasemonkeyからXMLRPCプロトコルでブログに投稿する
author: azu
layout: post
permalink: /2009/1103/res1416/
SBM_count:
  - '00029<>1355436063<>24<>0<>3<>2<>0'
aktt_notify_twitter:
  - no
dsq_thread_id:
  - 301801142
categories:
  - Greasemonkey
tags:
  - blog
  - Greasemonkey
  - javascript
  - wordpress
---
[XML-RPC][1]を使ってWordpressやMovable Typeなどのブログに投稿するGreasemonkeyの書き方みたいなものです。  
XMLRPCに対応したブログにどういうものがあるかは下のサイトによくまとまってます。(ちょっと古いですが)

**BlogWrite &#8211; Atom API, XML-RPC**
:   [http://www.witha.jp/BlogWrite/bloglist.html][2]

WordPressでしかテストしてませんがXMLRPCに対応してるブログなら動作すると思います。  
今回は投稿機構みたいなものを書いただけなので、このスクリプトだけではあんまり意味はないと思います。

<pre class="brush:javascript;">// ==UserScript==
// @name           XMLRPC poster
// @namespace      http://efcl.info/
// @include        http://*
// ==/UserScript==

/* 投稿先のメタ情報 */
var metaBlog = {
	"endPoint" : "ブログのエンドポイントURL",
	"blogid"   : "ブログのログインID",
	"username" : "投稿者名", //空だとblogidを使用
	"password" : "パスワード"
}

var XMLRPC = (function() { this.initialize.apply(this, arguments); });
XMLRPC.prototype = {
	/*
	 * @arg 
		{
				"endPoint": "endPoint",
				"blogid"   : "blogid",
				"username" : "username",//空だとblogidを使用
				"password" : "password"
		}
	*/
	initialize : function(arg) { //引数は{}オブジェクト
		this.endPoint = arg.endPoint;
		this.blogid   = arg.blogid;
		this.username = (arg.username) ? arg.username : arg.blogid;
		this.password = arg.password;
	},
	/* *
	 * @title 記事タイトル
	 * @desc 記事内容
	 * @tags タグ(カンマ区切り)
	 * @callback 更新成功時のコールバック関数
	 */
	post : function (title, desc, tags, callback){
		var postURI = this.endPoint;
		this.tags = (tags.length == 0) ? "" : tags.join(",");
		var XMLbody = '&#60;?xml version="1.0"?&#62;n';
		XMLbody += this.template(title, desc , this.tags);
		console.info(XMLbody);
		GM_xmlhttpRequest({
			method : "POST",
			headers : {
				'Content-type' : 'text/xml'
			},
			url : postURI,
			data : this.template(title, desc , tags),
			onload : callback,
		})
	},
  template : function (title, desc , tags){
    var repuest =  &#60;methodCall&#62;
                      &#60;methodName&#62;metaWeblog.newPost&#60;/methodName&#62;
                      &#60;params&#62;
                        &#60;param&#62;
                          &#60;value&#62;
                            &#60;string&#62;{this.blogid}&#60;/string&#62;
                          &#60;/value&#62;
                        &#60;/param&#62;
                        &#60;param&#62;
                          &#60;value&#62;
                            &#60;string&#62;{this.username}&#60;/string&#62;
                          &#60;/value&#62;
                        &#60;/param&#62;
                        &#60;param&#62;
                          &#60;value&#62;
                            &#60;string&#62;{this.password}&#60;/string&#62;
                          &#60;/value&#62;
                        &#60;/param&#62;
                        &#60;param&#62;
                          &#60;value&#62;
                            &#60;struct&#62;
                              &#60;member&#62;
                                &#60;name&#62;title&#60;/name&#62;
                                &#60;value&#62;
                                  &#60;string&#62;{title}&#60;/string&#62;
                                &#60;/value&#62;
                              &#60;/member&#62;
                              &#60;member&#62;
                                &#60;name&#62;description&#60;/name&#62;
                                &#60;value&#62;
                                  &#60;string&#62;{desc}&#60;/string&#62;
                                &#60;/value&#62;
                              &#60;/member&#62;
                              &#60;member&#62;
                                &#60;name&#62;mt_keywords&#60;/name&#62;
                                &#60;value&#62;
                                  &#60;string&#62;{tags}&#60;/string&#62;
                                &#60;/value&#62;
                              &#60;/member&#62;
                              &#60;member&#62;
                                &#60;name&#62;mt_allow_comments&#60;/name&#62;
                                &#60;value&#62;
                                  &#60;boolean&#62;1&#60;/boolean&#62;
                                &#60;/value&#62;
                              &#60;/member&#62;
                            &#60;/struct&#62;
                          &#60;/value&#62;
                        &#60;/param&#62;
                        &#60;param&#62;
                          &#60;value&#62;
                            &#60;boolean&#62;1&#60;/boolean&#62;
                          &#60;/value&#62;
                        &#60;/param&#62;
                      &#60;/params&#62;
                    &#60;/methodCall&#62;;
		return repuest.toString();
	}
}
/* init メタ情報を使って投稿先決める*/
var t = new XMLRPC(metaBlog);
t.post(
	"title",
	"description",
	&#91;"tag1","tag2"&#93;,
	function(res){//callback
		console.log(res);
	}
);
</pre>

ブログのエンドポイントURLは各ブログによってまちまちですが、Wordpressだと**http://*<span style="text-decoration: underline;">WordPressトップ</span>*/xmlrpc.php  
**になります。

E4Xを使ってポストするXMLを作成していますが、先頭に<?xml version=&#8221;1.0&#8243;?>を入れるとなぜかエラーになったので、後で結合するようにしました。  
後、**XMLRPCを使ってWordpressにタグを指定**できるのかを検索した時、下のようにできないというのが出てきましたが、**mt_keywordsにタグを指定**できます。  
なので下の情報は古いか間違っています。

[WordPressでXML-RPCを使った投稿で、記事にタグの指定はできるのでしょうか。できるようでしたらやり方を書いたページを教えてください。.. &#8211; 人力検索はてな][3]

WordPressでは,で区切る事でタグを複数指定できます。  
カテゴリーは面倒だったので放置してます(誰か…)

記載したソースは自由に使用してください。  
[gist: 224968 &#8211; GitHub][4]

参考

**肉少なめ | Item &#8211; Greasemonkeyでブログを更新**
:   [http://niku.suku.name/item/591][5]

**MovableType で使える XML-RPC API**
:   [http://www.na.rim.or.jp/~tsupo/program/blogTool/mt_xmlRpc.html#w01][6]

**XML-RPC経由の投稿 でタグを登録したい « Selflow WordPress**
:   [http://www.selflow.com/?p=6][7]

**追記** 完全に自分用になってますがこれを使ったものを作ってみた。

**NicoMylist poster with XML-RPC for Greasemonkey**
:   [http://userscripts.org/scripts/show/64569][8]

ニコニコのマイリストからWordpressへポストするGreasemonkey。   
上記では実現できてなかったカテゴリーの指定もできるようになりました。

WordPressのcategoriesは複数なので、XML-RPCからポストする場合もArrayで要素を作らないといけなかったようです。  
XML部分だけを取り出したもの→[gist: 398599 &#8211; GitHub][9]

**MetaWeblogAPI metaWeblog.newPost メソッド**
:   [http://msdn.microsoft.com/ja-jp/library/aa905673.aspx][10]

**juust ~ php oddities » metaWeblog.newPost posting to WordPress from Word**
:   [http://www.juust.org/index.php/metaweblog-newpost-posting-to-wordpress-from-word/2009/10/][11]

 [1]: http://ja.wikipedia.org/wiki/XML-RPC
 [2]: http://www.witha.jp/BlogWrite/bloglist.html "BlogWrite - Atom API, XML-RPC　に対応した　ブログエディタ　Blog エディター Blog(ブログ)投稿クライアント　by Witha System Ltd."
 [3]: http://q.hatena.ne.jp/1239170669
 [4]: http://gist.github.com/224968
 [5]: http://niku.suku.name/item/591 "肉少なめ | Item - Greasemonkeyでブログを更新"
 [6]: http://www.na.rim.or.jp/%7Etsupo/program/blogTool/mt_xmlRpc.html#w01 "MovableType で使える XML-RPC API"
 [7]: http://www.selflow.com/?p=6 "XML-RPC経由の投稿 でタグを登録したい « Selflow WordPress"
 [8]: http://userscripts.org/scripts/show/64569 "NicoMylist poster with XML-RPC for Greasemonkey"
 [9]: http://gist.github.com/398599
 [10]: http://msdn.microsoft.com/ja-jp/library/aa905673.aspx "MetaWeblogAPI metaWeblog.newPost メソッド"
 [11]: http://www.juust.org/index.php/metaweblog-newpost-posting-to-wordpress-from-word/2009/10/ "juust ~ php oddities » metaWeblog.newPost posting to WordPress from Word"