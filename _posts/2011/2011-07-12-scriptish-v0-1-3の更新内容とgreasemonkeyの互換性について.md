---
title: Scriptish v0.1.3の更新内容とGreasemonkeyの互換性について
author: azu
layout: post
permalink: /2011/0712/res2923/
SBM_count:
  - '00012<>1355446907<>11<>0<>0<>1<>0'
dsq_thread_id:
  - 356042086
categories:
  - Firefox
  - Greasemonkey
tags:
  - Greasemonkey
  - Scriptish
---
[Scriptish][1]が0.1 -> 0.1.3へとアップデートされたのでそれの更新内容を調べてみる。

- [Version 0.1.1 issues][2]   
- [Version 0.1.2 issues][3]   
- [Version 0.1.3 issues][4]

に全部載っている事です。   
バグとかは面倒なので省いています。結構いろいろあるので気になる人は上のを見ておくといい。

*   <div>
      <a href="https://github.com/erikvold/scriptish/issues/347">#347: support GM&#8217;s openInTab&#8217;s new aLoadInBackground argument &#8211; Issues &#8211; erikvold/scriptish &#8211; GitHub</a> <br /><a href="https://github.com/erikvold/scriptish/wiki/GM_openInTab">GM_openInTab</a>に、バックグラウンドでタブを開くオプションが入った
    </div>

*   <div>
      <a href="https://github.com/erikvold/scriptish/issues/225">#225: Add ignoreRedirect argument to GM_xhr &#8211; Issues &#8211; erikvold/scriptish &#8211; GitHub</a> <br /><a href="https://github.com/erikvold/scriptish/wiki/GM_xmlhttpRequest">GM_xmlhttpRequest</a>にXHR先のリダイレクトを無視する<em>ignoreRedirect</em>のオプションが入った。
    </div>

*   <div>
      <a href="https://github.com/erikvold/scriptish/issues/374">#374: console.log etc. should be hooked to the corresponding web console &#8211; Issues &#8211; erikvold/scriptish &#8211; GitHub</a> <br />Firefox4から<a href="https://developer.mozilla.org/en/Using_the_Web_Console">Web Console</a>が入ったので、console APIがそれにも対応(Firebugとか使ってればあんまり関係ない)
    </div>

*   <div>
      <a href="https://github.com/erikvold/scriptish/issues/338">#338: Add a hidden preference to allow customizing support for URI scheme &#8211; Issues &#8211; erikvold/scriptish &#8211; GitHub</a> <br />geo: URI scheme handler, lp: URI scheme handler といった、他の拡張などで用意されたURIスキームでもスクリプト動かせるオプションが用意された。 <br />extensions.scriptish.enabledSchemes.* という設定をabout:configから作って真偽値を入れる事で可能になるようだ。 <br />extensions.scriptish.enabledSchemes.foo が true ならfoo: というスキームで動作する。 <br />- <a href="https://github.com/erikvold/scriptish/wiki/Manual%3A-Preferences">Manual: Preferences &#8211; GitHub</a> </p> <p>
        <a href="http://efcl.info/wp-content/uploads/2011/07/image.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://efcl.info/wp-content/uploads/2011/07/image_thumb.png" width="240" height="84" /></a>
      </p>
      
      <p>
        それぞれデフォルトで存在するプロトコルも同じ方式で書かれている。
      </p>
    </div>

*   <div>
      configファイルがscriptish-scripts.xml から scriptish-scripts.jsonに <br />ちょっと該当bugはどれか分からないけど、多分そうなっています。
    </div>

**オプション画面の変更**

[<img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://efcl.info/wp-content/uploads/2011/07/image_thumb1.png" width="240" height="126" />][5]

Scriptish自体のオプション画面も大きく変更されています。

[<img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://efcl.info/wp-content/uploads/2011/07/image_thumb2.png" width="213" height="240" />][6][<img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://efcl.info/wp-content/uploads/2011/07/image_thumb3.png" width="213" height="240" />][7]

一枚目は主要プロトコルでの動作の設定以外は以前とそこまで変わらないので、問題ないと思います。   
二枚目はグローバルのExclude(スクリプトに書かれてるexcludeとは違ってグローバルで動かないURL)の設定がタブに分かれて書きやすくなっています。

[<img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://efcl.info/wp-content/uploads/2011/07/image_thumb4.png" width="213" height="240" />][8]

三枚目が結構重要な変更が入っていて、特にGreasemonkeyスクリプトを書く人はここの設定に注意する必要があります。

☑ユーザスクリプトをキャッシュする

という設定にチェックが入っていると、スクリプトを書き換えてページをリロードしても、すぐには反映しない(キャッシュが使われる)ため、スクリプトを書く人はチェックを外した方がいいと思います。

*   [#289: Provide user pref for caching script & dep contents &#8211; Issues &#8211; erikvold/scriptish &#8211; GitHub][9]

後は、UIを常に英語にしたり、今までabout:configから直接決めないといけなかったものもGUIから設定できるようになっているみたいです。(全てではないですが)

*   [Manual: Preferences &#8211; GitHub][10] 

これ以外にも、パフォーマンスとか内部のバグなど結構改善されてると思います。

### Greasemonkeyとの互換性の話

新しいAPIはGreasemonkeyが実装してくれないと互換性はない(fail safeを書くか、分岐するなどで対処)ですが、元々あった[GM_openInTab][11]などは拡張して実装されてるので基本的にGreasemonkeyと互換性があると思います。

ただ、GM_registerMenuCommandはGreasemonkeyでは第一引数にeventオブジェクトが渡されるようになって、

<div id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode"><span class="kwrd">function</span> sayHello(evt) { console.log(evt) }<br />GM_registerMenuCommand(<span class="str">"Hello, world (simple)"</span>, sayHello);</pre>
</div>

のようなコードがScriptishではundefinedで、Greasemonkeyで動かすとなぜかイベントオブジェクトが入るようになり互換性がちょっとないです。(これはGreasemonkeyが勝手に壊した感じです)

<p id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode"><span class="kwrd">function</span> sayHello(evt) { console.log(evt) }<br />GM_registerMenuCommand(<span class="str">"Hello, world (simple)"</span>, <span class="kwrd">function</span>(){<br />    sayHello();<br />});</pre>
  
  <p>
    そのため、Scriptish、Greasemonkeyどちらでも安全に動くようにするには、明示的に無名関数などを使った方が良いでしょう。
  </p>
  
  <p>
    後、<a href="http://subtech.g.hatena.ne.jp/mala/20101021/1287670869">外部コンテンツを読み込む系のGreasemonkeyやブラウザ拡張を作る際の注意事項</a>などの対策(Full Feedのものが行ってるタイプ)として、GM_xhrで取得したコンテンツを自前でフィルターするのをベタに書くと速度的な問題が発生したりするので、そういう時はScriptishにある<a href="https://github.com/erikvold/scriptish/wiki/GM_safeHTMLParser">GM_safeHTMLParser</a> APIを使用するのが良いでしょう。
  </p>
  
  <p>
    自前で書いても工夫すれば実用的な速度にはなるが、用意されているものを使うのが楽という意味で。
  </p>
  
  <ul>
    <li>
      <a href="http://d.hatena.ne.jp/Constellation/20101026/1288020124">http://d.hatena.ne.jp/Constellation/20101026/1288020124</a>
    </li>
  </ul>
  
  <p>
    また、まだ入っていませんが、Scriptish 2.0で<a href="https://github.com/erikvold/scriptish/wiki/GM_xpath">GM_xpath &#8211; GitHub</a>というXPathのAPIが入るようなので楽しみ。
  </p>
  
  <ul>
    <li>
      <a href="https://github.com/erikvold/scriptish/issues/45">#45: Support @xpath &#8211; Issues &#8211; erikvold/scriptish &#8211; GitHub</a>
    </li>
  </ul>
  
  <p>
    Greasemonkeyにとどまる意義はあまり見つける事ができませんが、Scriptitshに移行する意義は見つける事ができるような感じの状態です。<br /> <br />Scriptish作者の<a href="http://erikvold.com/index.cfm">Erik Vold</a>さんはGreasemonkeyに対してさよならと言ってるので、これから少しずつ差が出てくるような気がします。
  </p>
  
  <ul>
    <li>
      <a href="http://groups.google.com/group/greasemonkey-dev/browse_thread/thread/3932e546be2cf626?hl=en&pli=1">Farewell &#8211; greasemonkey-dev | Google Groups</a>
    </li>
  </ul>
  
  <p>
    これからGreasemonkeyスクリプト実行環境がどうなるのかはまだ何ともいえませんが、とりあえず私はScriptishを中心に使っていきます。
  </p>

 [1]: https://addons.mozilla.org/ja/firefox/addon/scriptish/
 [2]: https://github.com/erikvold/scriptish/issues?milestone=5&state=closed
 [3]: https://github.com/erikvold/scriptish/issues?milestone=7&state=closed
 [4]: https://github.com/erikvold/scriptish/issues?milestone=10&state=closed
 [5]: http://efcl.info/wp-content/uploads/2011/07/image1.png
 [6]: http://efcl.info/wp-content/uploads/2011/07/image2.png
 [7]: http://efcl.info/wp-content/uploads/2011/07/image3.png
 [8]: http://efcl.info/wp-content/uploads/2011/07/image4.png
 [9]: https://github.com/erikvold/scriptish/issues/289
 [10]: https://github.com/erikvold/scriptish/wiki/Manual%3A-Preferences
 [11]: https://github.com/erikvold/scriptish/wiki/GM_openInTab