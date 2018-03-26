---
title: 'TomblooからTwitterにポストするときに、頭に&#8221;見てる:&#8221;と付けるパッチ'
author: azu
layout: post
permalink: /2009/0429/res648/
SBM_count:
  - '00047<>1355444609<>39<>0<>4<>4<>0'
aktt_notify_twitter:
  - no
dsq_thread_id:
  - 300809528
categories:
  - Tombloo
tags:
  - javascript
  - Tombloo
  - twitter
---
TomblooからTwitterにポストするときに、何もコメントを書いていない時に**  
見てる: &#8220;引用文&#8221; Web scratch https://efcl.info/ **  
みたいな感じに頭に文字列を挿入するscriptパッチです。  
コメントありの場合は  
**コメント &#8220;引用文&#8221; Web scratch https://efcl.info/ **  
という形になります。(引用文はQuote時のみ)

追記: 0.4.6からに合わせた形式に合わせました。

*   [Twitter_pre.js][1]

上のリンク上で右クリック、[Tombloo]-[Tomblooパッチのインストール]で簡単インストール  
コメントが何もないときだけ、先頭に見てる:という文字列を加えるようにしました。

<pre>addBefore(Twitter, 'post', function(ps){
	var pre_str = "見てる:";
	ps.item = ps.item || "";
	ps.description = ps.description ? ps.description : pre_str.convertToUnicode();
});
</pre>

直接、付け加える日本語を書けるようになりました。 Tombloo内に定義されてたconvertToUnicode()というのを使えば自動的にUTF-8にエンコードしてくれるみたいです。(引数で他の文字コードも指定可)

[Firefox拡張のTomblooからTwitterにポストするときに、タイトルにカギ括弧を付け見やすくするパッチ &#8211; 技術文化遺産復興日記][2]

の方が見やすいかもね。

*   <span style="text-decoration: line-through;"><a href="http://gist.github.com/raw/103731/112c6111098afd69482c1e5c2b12a396d56bb516/Twitter_pre.js">Twitter_pre.js</a></span>

<span style="text-decoration: line-through;">上記を、{ProfD}/<span class="highlight"><span class="ColorResultsClass">tombloo</span></span>/<span class="keyword">script</span>に保存し、<span class="keyword">ブラウザ</span>を<span class="keyword">再起動</span>すると<span class="keyword"><span class="highlight"><span class="ColorResultsClass">パッチ</span></span></span>があたります。<br /> (場所の詳細は<a href="http://support.mozilla.com/ja/kb/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB">プロファイル</a>を参照するといいかも)</span>

<pre class="brush:javascript;">&#60;span style="text-decoration: line-through;"&#62;addBefore(Twitter, 'post', function(ps){
	ps.item = ps.item || "";
	ps.item = joinText(&#91;"頭に付ける文字列",ps.item&#93;,' ', true);
});
&#60;/span&#62;</pre>

<span style="text-decoration: line-through;">UTF-8で保存すれば、日本語で大丈夫だと思ったのに自分の環境では文字化けしたので、<br /> <a href="http://piro.sakura.ne.jp/latest/entries/mozilla/xul/2005-09-28_unicode-escape.files/unicode.xul">http://piro.sakura.ne.jp/latest/entries/mozilla/xul/2005-09-28_unicode-escape.files/unicode.xul</a><br /> を使ってエスケープした物を入れるとよいかも。</span>

 [1]: http://gist.github.com/raw/159168/019bb4dc7032d2eb53309ee65a81878ade41ba86/Twitter_pre.js
 [2]: http://d.hatena.ne.jp/toby/20100220/quoted_title_of_tombloo_patch_for_posting_twitter
