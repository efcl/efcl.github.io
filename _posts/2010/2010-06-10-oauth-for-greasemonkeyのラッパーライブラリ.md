---
title: OAuth for Greasemonkeyのラッパーライブラリ
author: azu
layout: post
permalink: /2010/0610/res1721/
SBM_count:
  - '00051<>1355447628<>45<>0<>5<>1<>0'
dsq_thread_id:
  - 300802599
categories:
  - Greasemonkey
tags:
  - API
  - Greasemonkey
  - javascript
  - twitter
---
**[Post Now browsing to TwitterをOAuth認証に対応しました | Web scratch][1]**でGreasemonkeyスクリプトの「[Post Now browsing to Twitter][2]」をOAuth認証に対応したものを作りました。  
OAuthのJavaScript実装はいくつかあるみたいですがGreasemonkeyで使う感じになってるものは無かったみたいなので、OAuth.jsを使ったtwitterでのOAuth認証を手助けするラッパーみたいなものを書きました。

xAuthを使えば楽な気もしますがブラウザベースのものはxAuthを使わずに[OAuthを使ってね][3]との事です

大部分は

*   [TwitterクライアントのOAuth対応(JavaScript編) | tomatomax.net][4]
*   [Twitter API を OAuth で認証するスクリプトを 0 から書いてみた &#8211; trial and error][5]
*   [H.Basic認証/OAuth認証 (陽昇れども地の底に光届かず)][6]

を参考に書きました。  
何となく分かるかも知れませんが、今回扱うアプリはApplication Typeがclientタイプのものです。

[<!--more-->

  
][7]今回書いたラッパーは以下のOAuthライブラリを簡単に扱うためのものになってます。  
OAuth.js  
SHA-1.js  
<http://code.google.com/p/oauth/source/browse/code/javascript/> あたりにある。  
ラッパーと併せて3つのjsからなりますが、3回も@requireするのは面倒だったので一つのファイルにまとめたソースコードを**[OAuth for Greasemonkey for Greasemonkey][7]**に置いてあります。  
OAuth.jsはApache license ver2、SHA-1.jsはBSDライセンスになっています。  
自分が書いたラッパー部分はMITライセンスとしておきます(基本的に自由に使える)  
しかし、いつ変更するか分からないので自分で別途保存して@requireする方が良いでしょう。  
追記: **githubに置いたのでこちらを利用した方がいいと思います**

*   #### [azu&#8217;s OAuth-for-Greasemonkey at master &#8211; GitHub][8]

以下はラッパー部分だけを抜き出したものです。(2010/08/07現在のソースから)  
**ここに書いてあるのは古いと思うので上のリンクから適当に見て下さい。**

<pre class="brush:javascript;">// TwitterOauth for Greasemonkey
function TwitterOauth(){
    this.initialize.apply(this, arguments);
}
TwitterOauth.prototype = {
    initialize: function(con) {
        var accessor = this.getAccessor();
        if(accessor){
            this.accessor = accessor;
        }else{
            this.accessor.consumerKey = con.consumerKey;
            this.accessor.consumerSecret = con.consumerSecret;
            this.accessor.token = "";
            this.accessor.tokenSecret = "";
        }
    },
    accessor : {
        consumerKey : "",
        consumerSecret: "",
        token: "",// response access_token
        tokenSecret: "", // response access_token_secret
    },
    // temp for request
    request : {
        token :"",// response oauth_token
        tokenSecret: ""// response oauth_token_secret
    },
    // トークンが取得済みかの真偽値を返す
    isAuthorize : function(){
        var accessor = this.accessor;
        if(accessor.consumerKey && accessor.consumerSecret && accessor.token && accessor.tokenSecret){
            return true;
        }else{
            return false;
        }
    },
    getAccessor : function(){
        var accessor = GM_getValue("OAuthAccessor", null);
        if(accessor){
            return JSON.parse(accessor);
        }else{
            return false;
        }
    },
    // 取得したトークンを保存
    saveAccessor : function(){
        GM_setValue("OAuthAccessor",JSON.stringify(this.accessor));
    },
    deleteAccessor : function(){
        var clientInfo = {
            consumerKey: this.accessor.consumerKey,
            consumerSecret: this.accessor.consumerSecret,
        }
        GM_deleteValue("OAuthAccessor");
        this.initialize(clientInfo);
    },
    // 認証ページのURLを取得
    getRequestToken : function(callback){
        var message = {
          method: "GET",
          action: "https://twitter.com/oauth/request_token",
          parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: this.accessor.consumerKey
          }
        };
        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, this.accessor);
        var target = OAuth.addToURL(message.action, message.parameters);
        var self = this;
        var options = {
          method: message.method,
          url: target,
          onload: function(d) {
            if(d.status == 200){
                var res = d.responseText;
                var parameter = self.getParameter(res);
                self.request.token = parameter&#91;"oauth_token"&#93;;
                self.request.tokenSecret = parameter&#91;"oauth_token_secret"&#93;;
                // requestURLを引数にcallback
                if(callback){
                    callback("https://twitter.com/oauth/authorize?oauth_token="+self.request.token);
                }
            }else{
                alert(d.statusText);
            }
          },
        };
        GM_xmlhttpRequest(options);

    },
    // pinを元にAccess Tokenを取得して保存、callbackにはaccessorオブジェクトを渡す
    getAccessToken : function(pin ,callback) {
        var message = {
          method: "GET",
          action: "https://twitter.com/oauth/access_token",
          parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: this.accessor.consumerKey,
            oauth_token: this.request.token, // Request Token
            oauth_verifier: pin
          }
        };
        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, this.request);
        var target = OAuth.addToURL(message.action, message.parameters);
        var self = this;
        var options = {
          method: message.method,
          url: target,
          onload: function(d) {
            if(d.status == 200){
                /* 返り値からAccess Token/Access Token Secretを取り出す */
                var res = d.responseText;
                var parameter = self.getParameter(res);
                self.accessor.token = parameter&#91;"oauth_token"&#93;;
                self.accessor.tokenSecret = parameter&#91;"oauth_token_secret"&#93;;
                // Accessorの保存
                self.saveAccessor();
                if(callback){
                    callback(self.accessor);
                }
            }else{
                alert(d.statusText);
            }
          },
        };

        GM_xmlhttpRequest(options); // 送信
    },
    // api+?+query にアクセスした結果をcallbackに渡す
    get : function(api, query, callback) {
        var btquery = (query)? "?"+this.buildQuery(query) : "";
        var message = {
          method: "GET",
          action: api + btquery,
          parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: this.accessor.consumerKey,// queryの構築
            oauth_token: this.accessor.token // Access Token
          }
        };
        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, this.accessor);
        var target = OAuth.addToURL(message.action, message.parameters);
        var options = {
          method: message.method,
          url: target,
          onload: function(d) {
            if(d.status == 200){
                if(callback){
                    callback(d.responseText);
                }
            }else{
                callback(d.statusText);
            }
          },
        };
        GM_xmlhttpRequest(options); // 送信
    },
    post : function(api, content, callback) {
        var message = {
          method: "POST",
          action: api,
          parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: this.accessor.consumerKey,
            oauth_token: this.accessor.token // Access Token
          }
        };
        // 送信するデータをパラメータに追加する
        for ( var key in content ) {
          message.parameters&#91;key&#93; = content&#91;key&#93;;
        }
        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, this.accessor);
        var target = OAuth.addToURL(message.action, message.parameters);
        var options = {
            method: message.method,
            url: target,
            onload: function(d) {
                if (d.status == 200) {
                    if (callback) {
                        callback(d.responseText);
                    }
                } else {
                    // typeof d == object
                    callback(d);
                }
            }
        };
        GM_xmlhttpRequest(options); // 送信
    },
    // GM_xmlhttpRequest風に使う
    xhr : function(opts){
        if(!(opts && opts.url && opts.method)){
            GM_log("URLまたはメソッドが指定されていません");
            return;
        }
        var message = {
          method: opts.method,
          action: opts.url,
          parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: this.accessor.consumerKey,
            oauth_token: this.accessor.token // Access Token
          }
        };
        // POST - opts.dataは文字列でもオブジェクトでも可能にする
        if(opts && opts.method.toLowerCase() == "post" && opts.data){
            if(typeof(opts.data) === "string"){// 文字列からパラメータオブジェクトを作る
                opts.data = this.getParameter(opts.data);
            }
            var content = opts.data;
            if(typeof(content) === "object"){
                for(var key in content) {
                    message.parameters&#91;key&#93; = content&#91;key&#93;;
                }
            }
        }
        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, this.accessor);
        opts.url = OAuth.addToURL(message.action, message.parameters);// URLを書き換え
        GM_xmlhttpRequest(opts);// 送信
    },
    // utility関数
    // http://kevin.vanzonneveld.net
    urlencode : function (str) {
        str = (str+'').toString();
        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/(/g, '%28').
                                                                        replace(/)/g, '%29').replace(/*/g, '%2A').replace(/%20/g, '+');
    },
    // オブジェクトからクエリを生成
    buildQuery : function(formdata, numeric_prefix, arg_separator) {
        // *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
        // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
        // *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
        // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
        var value, key, tmp = &#91;&#93;;
        var self = this;
        var _http_build_query_helper = function (key, val, arg_separator) {
            var k, tmp = &#91;&#93;;
            if (val === true) {
                val = "1";
            } else if (val === false) {
                val = "0";
            }
            if (val !== null && typeof(val) === "object") {
                for (k in val) {
                    if (val&#91;k&#93; !== null) {
                        tmp.push(_http_build_query_helper(key + "&#91;" + k + "&#93;", val&#91;k&#93;, arg_separator));
                    }
                }
                return tmp.join(arg_separator);
            } else if (typeof(val) !== "function") {
                return self.urlencode(key) + "=" + self.urlencode(val);
            } else {
                throw new Error('There was an error processing for http_build_query().');
            }
        };

        if (!arg_separator) {
            arg_separator = "&";
        }
        for (key in formdata) {
            value = formdata&#91;key&#93;;
            if (numeric_prefix && !isNaN(key)) {
                key = String(numeric_prefix) + key;
            }
            tmp.push(_http_build_query_helper(key, value, arg_separator));
        }

        return tmp.join(arg_separator);
    },
    // Query String から 連想配列を返す
    getParameter: function(str){
      var dec = decodeURIComponent;
      var par = {}, itm;
      if(typeof(str) == 'undefined') return par;
      if(str.indexOf('?', 0) &#62; -1) str = str.split('?')&#91;1&#93;;
      str = str.split('&');
      for(var i = 0; str.length &#62; i; i++){
        itm = str&#91;i&#93;.split("=");
        if(itm&#91;0&#93; != ''){
          par&#91;itm&#91;0&#93;&#93; = typeof(itm&#91;1&#93;) == 'undefined' ? true : dec(itm&#91;1&#93;);
        }
      }
      return par;
   }
};
</pre>

OAuth認証を手助けすることを目的に書いたので、アクセストークンを使って実際にAPIをたたく部分のTwitterOauth.getやTwitterOauth.postは適当です。  
ラッパーの動作自体はそこまで難しい事はやってないので、**OAuth認証の手順を理解する方が大切**です。  
[Twitter Applications | dev.twitter.com][9] から自分の作成するGreasemonkeyをnew appから登録しておきます。  
Application TypeはClientならPINコードを使うタイプ、Browserなら認証したときにリダイレクトするURLを決めてそのURLでアクセストークンを受け取れます。今回は**ClientタイプつまりPINコードを使う方法**です。<figure id="attachment_1745" style="width: 300px;" class="wp-caption alignnone">

[<img class="size-medium wp-image-1745" title="sshot-2010-06-10-4" src="http://efcl.info/wp-content/uploads/2010/06/sshot-2010-06-10-4-300x284.png" alt="" width="300" height="284" />][10]<figcaption class="wp-caption-text">登録でClientを選ぶ</figcaption></figure> 
ユーザーにPINコードをコピーさせてそれを入力させるという動作が、普通のWebサービスではあまり見ない流れだと思います。このラッパーでやっているOAuth認証の流れを簡単に図にするとこんな流れです。(Browserタイプよりユーザーの負担が大きい)

[<img class="aligncenter size-medium wp-image-1724" title="シーケンス図0" src="http://efcl.info/wp-content/uploads/2010/06/4853f6fc7d7316c872b273d972580a55-270x300.png" alt="" width="270" height="300" />][11]もっとコアの流れをみるなら[OAuthのやり取りを読み取ってみる &#8211; 風柳メモ][12] とか

実際にGreasemonkeyでやってる動画 [YouTube &#8211; Post Now browsing to Twitter for Greasemonkey][13]  
かなり大雑把な流れなので詳しくは他のサイトを参照して下さい。  
基本的にはトークンなどを元にしてOAuth.jsのOAuth.SignatureMethod.signでシグネチャを作成して、それを元に新たなトークンを受け取ってまたOAuth.SignatureMethod.signでシグネチャを作るみたいな繰り返しです。  
最終的にAPIを叩く際に必要なものがアクセストークンとなります。

1.  リクエストトークンとリクエストトークンシークレットをもらいに行く。(タイムスタンプとconsumerKeyで一意な情報を元にする)
2.  もらってきたリクエストトークンを使って認証ページのURLを作る。  
    (https://twitter.com/oauth/authorize?oauth_token= + リクエストトークンが認証ページのURL)
3.  ユーザーに認証の動作を行ってもらう。
4.  認証するとPINコードが表示されるので、ユーザーにPINコードをコピーしてアプリに入力してもらう。
5.  入力してもらったPINコードを元にアクセストークンとアクセストークンシークレットをもらいに行く。(アクセストークンがAPIにたたくときに必要となるものです。リクエストトークンは認証時に必要となるだけなので使い捨てです。)
6.  アクセストークンをもらったら保存して完了。

実際にラッパーを使った大筋の流れとして、まずラッパーを呼び出して各自のアプリ情報を渡して初期化します。

<pre class="brush:javascript;">// http://dev.twitter.com/apps に書いてある。
var clientInfo = {
    name: 'アプリ名',
    consumerKey: '各自アプリ',
    consumerSecret: '各自アプリ',
}
// TwitterOauthにクライアント情報を渡してnewする(必須)
var tw = new TwitterOauth(clientInfo);
</pre>

そして、tw.isAuthorize() で既にアクセストークンを持っているかを調べられる(持ってたら直ぐにAPIをたたける)ので、持っていなかったらリクエストトークンをもらいに行きます。

<pre class="brush:javascript;">if(tw.isAuthorize()){// まだ認証していない
    tw.getRequestToken(callback);
    // callbackに渡る引数は認証ページのURL
}
</pre>

getRequestTokenのcallback関数には認証ページのURLが渡るので、それを元にユーザーにそのページに行ってもらいアプリのOAuth認証してPINコードをコピーしてきてもらいます。  
PINコードを入力してもらう必要があるので、適当な入力エリアを作っておく必要もあります。

<pre class="brush:javascript;">// アクセストークンをもらいに行く。
// アクセストークンを取得できたら自動で保存処理を行っています。
// callbackにはaccessor(アクセストークンなどが入ったオブジェクト)を渡しますが、使い道は…
tw.getAccessToken(callback);
// 取得したアクセストークンを捨てたいときは
// tw.deleteAccessor() で破棄できます。
</pre>

アクセストークンを取得して保存できたらOAuth認証は完了です。  
アクセストークンを持っていればAPIをたたけるので、tw.get、tw.postを使ってAPIを叩きます。

<pre class="brush:javascript;">// get第二引数はクエリになるオブジェクトを渡す
   // 以下はapi?q=oauth&per_page=5 となる。
    var query = {
        q : "oauth",
        per_page : 5
    }
    // get : function(api, query, callback)
    tw.get("http://api.twitter.com/1/users/search.json" , query ,function(res){
        if(typeof res != "object"){// Twitterのエラー時はリスポンスのオブジェクトをそのまま返すため
            console.log(res); // firebug
        }
    })
</pre>

<pre class="brush:javascript;">// postはそのまま何も工夫がない。
    var content = {status: "update test", source: clientInfo.name};
    tw.post('http://twitter.com/statuses/update.json', content ,function(){
        console.log(res); // firebug
    });
</pre>

[Twitter API Wiki / Twitter API Documentation][14] を参考に使う。  
HTTP MethodがGETならそのクエリになるようにAPIのURLとクエリオブジェクトをtw.getに渡す。  
HTTP MethodがPOSTなら、APIのURLにcontentとなるオブジェクトを渡す。という感じでかなり適当な作りをしています。  
[twigadge][15] のようにもう少し機能別に作った方が使いやすくなると思います。

以上で説明のようなそうでないものは終わりですが、以下に簡単なサンプルGreasemonkeyを置いてあります。

*   [GreasemonkeyでOAuth認証を手助けするライブラリとそのサンプル][16]  
    (猿アイコンのユーザースクリプトから認証とget、postのテストができます。できれば自分のconsumerKeyとか使ってね。)

**追記**

新たにxhrというメソッドを追加しました。(上記ならtw.xhr({})みたいな使い方)  
xhrメソッドはGM_xmlhttpRequestと同じようにオプションのオブジェクトを引数にとって、APIと通信します。  
GM\_xmlhttpRequestをラップしているので、感覚的にはGM\_xmlhttpRequestと同じ感じで使えると思います。  
一つサンプル



// ↓↓↓↓Your Script↓↓↓↓ の所までがOAuth認証のパネルを作ったりするテンプレート的なものです。  
OAuth認証が済んでない（tw.isAuthorize()==false)なら途中でreturnされるので、既存コードの上部に*// ClientInfomation* から *// ↓↓↓↓Your Script↓↓↓↓*までをコピペして、API周りを修正すれば簡単にOAuth認証に対応できます。(できる限り自分の登録したアプリのclientInfoを使って下さい)  
当たり前ですが、その時@requireでOAuth.jsの3点セットを読み込んでおいて、インストールし直す必要があります(**@requireが動作するのはインストール時のみ**)  
APIを叩くときにOAuth認証で得たアクセストークンからシグネチャを作る必要があるので、GM_xmlhttpRequestでそのままAPIを叩いたままでは通りません。そこで今回追加したxhrメソッドの出番です。  
Getメソッドの場合だとGM_xmlhttpRequestをtw.xhrに変更するだけで既存のコードは通ると思います。  
POSTメソッドもGM_xmlhttpRequestをxhrメソッドに変えるだけで大体通ると思います。  
GM_xmlhttpRequestだとdata部分は文字列で書くので、そのまま&#8221;foo=fizz&bar=bazz&#8221;と書く方法と下のようにオブジェクト書く方法が使えます。(オブジェクトの方が効率がいい)

<pre>data : {
    foo:fizz,
    bar:bazz,
}</pre>

サンプルは猿アイコンを右クリックからでるユーザーコマンドで、xhrのそれぞれgetとpostをテストする関数が動作するだけです。

以下リンクまとめ

ライブラリの置き場所。こっちが多分一番新しい。

**azu&#8217;s OAuth-for-Greasemonkey at master &#8211; GitHub**
:   [http://github.com/azu/OAuth-for-Greasemonkey][17]

実際にラッパーを使ったGreasemonkey
**Post Now browsing to Twitter for Greasemonkey**
:   [http://userscripts.org/scripts/show/46441][18]

上のGreasemonkeyで使ってるラッパーライブラリとかをまとめたもの
**OAuth for Greasemonkey for Greasemonkey**
:   [http://userscripts.org/scripts/show/78102][19]

&nbsp;

<div id="_mcePaste" style="overflow: hidden; position: absolute; left: -10000px; top: 6332px; width: 1px; height: 1px;">
  HTTP MethodがGETならそのクエリになるようにAPIのURLとクエリオブジェクトをtw.getに渡す。
</div>

 [1]: http://efcl.info/2010/0609/res1715/
 [2]: http://userscripts.org/scripts/show/46441
 [3]: http://help.twitter.com/requests/982242
 [4]: http://blog.tomatomax.net/archives/2696
 [5]: http://techno-st.net/2009/11/26/twitter-api-oauth-0.html
 [6]: http://sites.google.com/site/elekmole/twitter4jtop/00-preparation/h-oauth-preparation
 [7]: http://userscripts.org/scripts/show/78102
 [8]: http://github.com/azu/OAuth-for-Greasemonkey
 [9]: http://dev.twitter.com/apps
 [10]: http://efcl.info/wp-content/uploads/2010/06/sshot-2010-06-10-4.png
 [11]: http://efcl.info/wp-content/uploads/2010/06/4853f6fc7d7316c872b273d972580a55.png
 [12]: http://d.hatena.ne.jp/furyu-tei/20090929/1254225568
 [13]: http://www.youtube.com/watch?v=8oXTuZk5xAk
 [14]: http://apiwiki.twitter.com/Twitter-API-Documentation
 [15]: http://code.google.com/p/twigadge/source/browse/trunk/js/twigadge.js
 [16]: http://gist.github.com/418274
 [17]: http://github.com/azu/OAuth-for-Greasemonkey "azu's OAuth-for-Greasemonkey at master - GitHub"
 [18]: http://userscripts.org/scripts/show/46441 "Post Now browsing to Twitter for Greasemonkey"
 [19]: http://userscripts.org/scripts/show/78102 "OAuth for Greasemonkey for Greasemonkey"