---
title: 'クリッカブルなボタンとWAI-ARIAのrole=&#8221;button&#8221;について'
author: azu
layout: post
permalink: /2011/0607/res2835/
SBM_count:
  - '00019<>1355444977<>17<>0<>2<>0<>0'
dsq_thread_id:
  - 323748433
categories:
  - その他
tags:
  - css
  - HTML
  - javascript
  - library
  - WAI-ARIA
---
前提知識として以下が必要です。

*   [リンクのようなボタンを作る: Days on the Moon][1]
*   [javascript scheme でボタンを作るのは ? | ヨモツネット][2]

clickイベントに使うためだけに<a href=&#8221;#&#8221;>text</a>とか(下の例の1,2番目)やるのが嫌いで、どうやるのがスマートorシンプルなんだろと思って書き出したもの。input、button 要素がでてこないのはスタイルシート考えるのが面倒で何となくです。button要素をCSSでリンクのようなデザインにできるならそれでもいいじゃないでしょうか。

*   [クリッカブルなボタンとRole][3]のデモ

1番目は今時ない気がするし、1,2番目は状態が遷移しないのにhref指定してると、ミドルクリックなどで別のページとして開けたりしちゃうのでそれを抑制するコードも必要になるのが何か嫌で、3番目当たりが個人的には好きだった。(4番目は何か気持ちわるい)

<div>
  <pre id="codeSnippet" class="csharpcode"><span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;&lt;</span><span class="html">a</span> <span class="attr">href</span><span class="kwrd">="javascript:void 0;"</span><span class="kwrd">&gt;</span>javscript:ボタン<span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;&lt;</span><span class="html">a</span> <span class="attr">href</span><span class="kwrd">="#"</span><span class="kwrd">&gt;</span>#なボタン<span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;&lt;</span><span class="html">a</span> <span class="attr">role</span><span class="kwrd">="button"</span><span class="kwrd">&gt;</span>hrefがないroleボタン<span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;&lt;</span><span class="html">span</span> <span class="attr">role</span><span class="kwrd">="button"</span><span class="kwrd">&gt;</span>リンクじゃないspanボタン<span class="kwrd">&lt;/</span><span class="html">span</span><span class="kwrd">&gt;&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
</div>

<div>
  動作的には問題ない気がするけど、ここで、A要素は元々nativeとして持っているroleがrole=&#8221;link&#8221;で、それをrole=&#8221;button&#8221;で上書きできるのかが気になった。
</div>

<div>
  そもそも、role=&#8221;link&#8221;とrole=&#8221;button&#8221;の違いは何かというとlinkの項を見るとわかるように、押したことによりブラウザのフォーカスやlocationが変わらないなら、それはrole=&#8221;button&#8221;を使うべきだと書いてある。
</div>

<blockquote title="The Roles Model | Accessible Rich Internet Applications (WAI-ARIA) 1.0" cite="http://www.w3.org/TR/2010/WD-wai-aria-20100916/roles#link">
  <p>
    Note: If pressing the link triggers an action but does not change browser focus or page location, authors are advised to consider using the button role instead of the link role. <br /><cite><a href="http://www.w3.org/TR/2010/WD-wai-aria-20100916/roles#link">The Roles Model | Accessible Rich Internet Applications (WAI-ARIA) 1.0</a></cite>
  </p>
</blockquote>

そして、A要素のroleはnativeでlinkですが[3.2.5 Content models — HTML Standard][4]を見ると、 `link`, `button`, `checkbox`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `tab`, `treeitem `のいずれかのroleであれば上書きすることができると書いてあります。(そう読み取れたんだけどあってるのかね)

<div>
  <a href="http://efcl.info/wp-content/uploads/2011/06/image10.png"><img style="background-image: none; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" src="http://efcl.info/wp-content/uploads/2011/06/image_thumb10.png" border="0" alt="image" width="320" height="99" /></a>
</div>

<div>
  なので、role=&#8221;button&#8221;なA要素は仕様に反していないはず。
</div>

<div>
  <pre id="codeSnippet" class="csharpcode"><span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">role</span><span class="kwrd">="button"</span><span class="kwrd">&gt;</span>hrefがないroleボタン<span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
</div>

<div>
  WAI-ARIAの方にもいろいろ書いてあるんだけど、英語力不足で読み取れない… <br />日本語版は一個古い感じなので、内容も結構違う感じする。
</div>

*   [4.2. Conflicts between native markup semantics and WAI-ARIA][5]
*   [3.2. ネイティブなマークアップセマンティクスとARIAとの衝突][6] 
    翻訳版をみるとnativeなroleがlinkであっても、roleでbuttonと指定すれば上書きできるべきであるみたいな内容。

何で、上書きできるかが気になったかというと[javascript scheme でボタンを作るのは ? | ヨモツネット][2]のコメント欄で、できないかのように読み取れる内容があったため。多分多分、strong native semanticsというのはa要素が本来持っているのはlinkというroleの事で、<a role=&#8221;button&#8221; />のようにそれぞれのa要素におけるroleは上書きできるけど、a要素本来のlink(strong native semantics)というroleは上書きできないよって話なのかなーとか思った。(仕様読んでないので自信ない)

ちなみに、jQuery UIの$.button()は<button role=&#8221;button&#8221;>という感じでbutton要素を使用している。

*   [jQuery UI &#8211; Button Demos & Documentation][7]
*   [jQuery UI に見る WAI-ARIA の実装：dialog 編 &#8211; アークウェブアクセシビリティWiki][8](結構前)

<div>
  他のUIライブラリも見てるみると、Extjs,Google Web Toolkit,Yahoo! User Interface Library (YUI)もbutton要素を使っていた。(role=&#8221;button&#8221;は省略してる感じのが多い) <br />UIライブラリはスタイルとかとセットなので、roleも意味がはっきりしたものとって後はスタイルやった方が良さそうだしね</p> <p>
    WAI-ARIA対応のライブラリはこの辺を見た
  </p>
</div>

*   [WAI-ARIA Implementation in JavaScript UI Libraries – updated | The Paciello Group Blog][9]

というわけで、ここに書かれている内容はあまり自信がありません。以上

*   [Accessible Rich Internet Applications (WAI-ARIA) 1.0][10]

 [1]: http://nanto.asablo.jp/blog/2010/12/15/5584008
 [2]: http://www.yomotsu.net/wp/?p=591
 [3]: http://pastehtml.com/view/aw8e93pdo.html
 [4]: http://www.whatwg.org/specs/web-apps/current-work/multipage/content-models.html#wai-aria
 [5]: http://www.w3.org/TR/wai-aria-implementation/#mapping_conflicts
 [6]: http://www.hitachi.co.jp/universaldesign/ria/ajax/wai-aria/WD-wai-aria-implementation-20090224/index.html#mapping_conflicts
 [7]: http://jqueryui.com/demos/button/
 [8]: http://www.ark-web.jp/accessibility/2297.html
 [9]: http://www.paciellogroup.com/blog/2009/07/wai-aria-implementation-in-javascript-ui-libraries/
 [10]: http://www.w3.org/TR/wai-aria/