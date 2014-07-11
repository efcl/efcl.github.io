---
title: Post Now browsing to Twitterで設定画面が開かないバグ修正
author: azu
layout: post
permalink: /2010/1207/res2169/
SBM_count:
  - '00001<>1355412364<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 301684891
categories:
  - Greasemonkey
tags:
  - Greasemonkey
  - UI
  - 設定
---
[Post Now browsing to Twitter][1]で設定画面がうまく開かない現象が起きていたみたいで、以前は[GM_config][2]というGUI用のライブラリを使っていたのですが、今回[usconfig][3]に移行しました。  
なので、今まで設定画面が開かないなどの現象が起きていた人はインストールしなおしてください。  
(おかしいときは ツール→Greasemonkey(もしくはステータスバーの猿アイコン)→ユーザースクリプトの管理→Post Now browsing to Twitterを選択→✓関連付けられた設定も削除にチェック→アンインストール → インストール)

*   [Post Now browsing to Twitter for Greasemonkey][1]

こっからはGM_configからUSConfigへ移行方法について。

*   [Greasemonkeyスクリプトに設定画面を追加するライブラリ USConfig &#8211; Alone Like a Rhinoceros Horn][4]
*   [Usconfig のページ一覧 &#8211; GitHub][5]

GM_configは前から少し不安定な感じがあったので、同種のライブラリであるUSConfigに変えました。  
GM_configとUSConfigの違いを簡単に挙げてみると(移行するに当たっての変更点)

まずはGUIの書き方が別物なので、そこはすべて書き直す必要があります。

GM_configの場合

<pre class="brush:javascript;">GM_config.init('Configuration for Post Now browsing to Twitter', {
    'defaultTag': {
        'label': 'Prefix:',
        'type': 'text',
        'default':'Now browsing: '
    },
    'isSelection': {
        'label': 'Use selectionQuote',
        'type': 'checkbox',
        'default':true
    },
    'ShortURL': {
        'label': 'Short URL',
        'type': 'select',
        'options': {
            'bit.ly': 'bit.ly',
            'j.mp': 'j.mp',
            'goo.gl': 'goo.gl',
            'is.gd': 'is.gd',
            'tinyurl.com': 'tinyurl.com'
        },
        'default':'bit.ly'
    },
    'ShortCutKey': {
        'label': 'ShortcutKey:',
        'type': 'text',
        'default':'CS-Enter'
    },
    'PostWithCtrl': {
        'label': 'Post with Ctrl+Enter:',
        'type': 'checkbox',
        'default': false
    },
    'bitlyUserName': {
        'section': &#91;'bit.ly'&#93;,
        'label': 'bit.ly Username:',
        'type': 'text',
    'default':
        'remiko'
    },
    'bitlyAPIKey': {
        'label': 'bit.ly APIKey :',
        'type': 'text',
        'default': 'R_fa2240c646c07b2091x'
    }
}, configStyle , {
    open: function () {
        // ショートカットの入力補助
        var iframe = document.getElementById("GM_config");
        var iframeDoc = iframe.contentDocument;
        iframeDoc.getElementById("field_ShortCutKey").addEventListener('keydown', function (evt) {
            evt.preventDefault();
            this.value = shortcut.get(evt);
        }, false);
        // OAuth Setting
        if (TWOauth.isAuthorize()) {
            TWOauth.injectToConfig();
        } else {
            XHRloading.createText(iframeDoc);
            TWOauth.getRequestToken(TWOauth.injectToConfig);
        }
    },
    save: function () {

    } // reload the page when configuration was changed
});</pre>

USConfigの場合

<pre class="brush:javascript;">Config.define('usc_basic', function() {
	with (this.builder) {
		var shortURL_opt = &#91;
			'bit.ly',
			'j.mp',
			'goo.gl',
			'is.gd',
			'tinyurl.com'
		&#93;
		dialog(
			"Post Now browsing to Twitter Settings",
			{ width: 600, height: 700 },

				section(
						"User options",
						"Behavior/keyboard Preference",
						grid(
								text("Prefix:", 'defaultTag', "Now browsing: ", { size: 20 }), 'n',
								checkbox("Use selection quote", 'isSelection', true), 'n',
								checkbox("Post with Ctrl+Enter", 'PostWithCtrl', false), 'n',
								text("ShortcutKey:", 'ShortCutKey', "CS-Enter", { size: 16 })
								)
						),
				section(
						"Short URL options",
						"select used Short URL service",

						grid(
								select("Short URL Services", 'ShortURL', shortURL_opt, "bit.ly"), 'n',
								text("bit.ly Username:", 'bitlyUserName', "remiko"), 'n',
								text("bit.ly APIKey :", 'bitlyAPIKey', 'R_fa2240c646c07b2091c6bc6d109089ef', { size: 30 })
								)
						),
				section(
						"OAuth Authorization",
						"Sign in with Twitter"
						)
				);
	}
}, {
	saveKey: 'GM_config',
	aftersave: function() {

	},
	afteropen : function() {
		// ショートカットの入力補助
		var iframeDoc = this.frame.contentDocument;
		iframeDoc.getElementById("control_ShortCutKey").addEventListener('keydown', function (evt) {
			evt.preventDefault();
			this.value = shortcut.get(evt);
		}, false);
		// OAuth Setting
		if (TWOauth.isAuthorize()) {
			TWOauth.injectToConfig();
		} else {
			XHRloading.createText(iframeDoc);
			TWOauth.getRequestToken(TWOauth.injectToConfig);
		}
	}
});</pre>

二つを見比べると、GM_configはオブジェクトを定義する感じだけど、USConfigはその都度関数を呼び出す感じになってる。レイアウトの自由度はUSConfigの方が上ですが、ちょっとインデント管理が大変で書きにくい。  
またUSConfigではselectに連想配列っぽいオブジェクトを使えないので、配列に直す必要があります。  
後、[Text() ][6]のデフォルトサイズが少し小さいので第4引数で属性にsizeを追加してます。  
最後の空sectionはafteropen時に書き換えるようにしてるので、本質とはあんまり関係ないです。  
USConfigの方が[Config.define()][7]でのコールバック(afteropenなど)が豊富なので、細かい制御がしやすいと思います。  
そのコードバックで設定画面のiframeをとるにはthis.frameとすればよいみたいです。

*   [Twitter / h1mesuke: @azu_re はじめまして。afteropen と &#8230;][8]

次に設定情報の取り出し方  
GM\_configがそのつど、keyを指定してvalueを取り出す感じだったのが(GreasemonkeyのGM\_getvalueに近い)

<pre>GM_config.get(key);// value</pre>

USConfigでは設定全部をまとめたオブジェクトを最初にロードする感じになっています

<pre>var settings = Config.load();
settings.key;// value
</pre>

また、設定を保存するキーの初期値はGM\_configと違うのでそのまま移行させるためにはsaveKeyを&#8217;GM\_config&#8217;にします。

<pre>Config.define('dialog_name', function() { with (this.builder) {
  dialog(...);
}}, {
  saveKey: 'GM_config',
  aftersave: function() {...},
});
</pre>

後はGM_config.\*()がConfig.\*()など細かい違いあるので、それを手直しすれば移行できました。  
(GM_config.close()がConfig.remove()だったのが少しはまった)

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow: hidden;">
  USConfig
</div>

 [1]: http://userscripts.org/scripts/show/46441
 [2]: http://userscripts.org/scripts/show/49700
 [3]: https://github.com/h1mesuke/usconfig
 [4]: http://d.hatena.ne.jp/h1mesuke/20100713/p1
 [5]: https://github.com/h1mesuke/usconfig/wiki/_pages
 [6]: https://github.com/h1mesuke/usconfig/wiki/text%28%29
 [7]: https://github.com/h1mesuke/usconfig/wiki/Config.define%28%29
 [8]: http://twitter.com/h1mesuke/statuses/11755139056541696