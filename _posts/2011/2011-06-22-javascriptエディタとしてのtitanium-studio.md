---
title: JavaScriptエディタとしてのTitanium Studio
author: azu
layout: post
permalink: /2011/0622/res2907/
dsq_thread_id:
  - 338496712
SBM_count:
  - '00009<>1355431445<>9<>0<>0<>0<>0'
categories:
  - software
  - インストール設定
tags:
  - IDE
  - javascript
  - Titanium
  - WebStorm
  - エディタ
---
*   [Titanium StudioとTitanium Mobile 1.7をリリースしました « Appcelerator Developer Center][1] 
*   [InfoQ: Appcelerator の Titanium Studio がデビュー][2] 

ちょっと触っただけの雑感です。本質としてとらえてはいけません。   
Titanium (Mobile|Desktop)については全く触れていないため、そういうものについては参考にはならないと思います。   
というか、Titanium (Mobile|Desktop)向けのものを書かないのに、Titamium Studioを選ぶ理由はない気がするので、タイトルのような事が目的ならばベースが同じ[Aptana Studio 3][3]を使った方が良いでしょう。

<!--more-->

  
### インストール

[<img style="border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb16.png" width="320" height="251" />][4]

インストール先がProgram Filesじゃない

[<img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb17.png" width="320" height="251" />][5]

起動すると、ログインアカウントを求めてくる

[<img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb18.png" width="320" height="224" />][6]

起動して最初に開く画面

[<img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb19.png" width="320" height="195" />][7]

Aptanaで昔無かった気がする折り返しがあった

[<img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb20.png" width="300" height="251" />][8]

プレビューできるのはAptanaと同じ。   
デフォルトIEだったけど、ApatanaのようにFirefoxもできるのかな。

*   [Aptana Studio 2.0.3－Firefoxプレビュータブ &#8211; ゆちの備忘録][9] 

[<img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb21.png" width="320" height="121" />][10]

適当なJavaScriptファイルでコードを書いてみるけど、補完候補が何か特殊な感じする。

[<img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb22.png" width="320" height="158" />][11]

2,3番目のFunctionはどちらもスニペットになっていて、2番目のFunctionは以下のような関数定義を展開する。

[<img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="2011-06-22-ss10" border="0" alt="2011-06-22-ss10" src="https://efcl.info/wp-content/uploads/2011/06/2011-06-22-ss10_thumb.png" width="320" height="65" />][12]

<div id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode"><span class="kwrd">function</span> function_name (argument) {<br /><br />}</pre>
  
  <p>
    </div> <p>
      3番目のNew Functionもスニペットで、以下のような無名関数を展開する。<a href="https://efcl.info/wp-content/uploads/2011/06/image23.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb23.png" width="320" height="67" /></a>
    </p>
    
    <div>
      <pre id="codeSnippet" class="csharpcode"><span class="kwrd">function</span> (args) {<br /><br />}</pre>
    </div>
    
    <div>
      何か、癖が強い感じのする補完になってる気がする。<br /> <br />出現する補完候補は以前のAptanaと違ってちゃんと構造を読んで出しているみたいだ。 </p> <p>
        毎度おなじみの<a href="http://d.hatena.ne.jp/teramako/20090205/p1">Komodo Edit が面白い &#8211; hogehoge @teramako</a>から</div> <div>
          <pre id="codeSnippet" class="csharpcode"><span class="kwrd">var</span> container = {<br />  init: <span class="kwrd">function</span>() {},<br />};<br />container.obj = (<span class="kwrd">function</span>(){<br />  <span class="kwrd">var</span> privateProp = <span class="kwrd">null</span>;<br />  <span class="kwrd">var</span> namager = {<br />    publicMethod: <span class="kwrd">function</span>(){ },<br />  };<br />  <span class="kwrd">return</span> namager;<br />})();</pre>
        </div>
        
        <div>
          という風に書いて、container.obj.の時は<code>publicMethodまでちゃんと補完ができるようになっている。&lt;br />
    &lt;br />コードを解析して構造(アウトライン)を出してるので、構造から見た補完候補が出てくるのが良い(WebStormとかと同じ感じ、どこまで解析できてるかは調べてない)</code>
        </div>
        
        <div>
          <code>&lt;font face="Arial">&lt;/font></code>
        </div>
        
        <div>
          <a href="https://efcl.info/wp-content/uploads/2011/06/image24.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb24.png" width="320" height="213" /></a> </p> <p>
            デフォルトだとdocument.queryselectorが出てこなかったり、何か欠けている感じがするけど、下記を見る感じWebStormやアマテラスのようにjsファイルで補完候補を定義できそうな気がする。(でも、References Viewとやらが見つからないのでやり方よく分からない…)</div> <ul>
              <li>
                <a href="http://akabeko.sakura.ne.jp/blog/2010/11/titanium-aptana-mobile/">Titanium と Aptana でモバイル開発 | アカベコマイリ</a>
              </li>
              <li>
                <a href="http://akabeko.sakura.ne.jp/blog/2011/04/titanium-studio-1-0-preview/">Titanium Studio 1.0 Preview 版を入れてみた | アカベコマイリ</a>
              </li>
            </ul>
            
            <p>
              <a href="https://efcl.info/wp-content/uploads/2011/06/image30.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb30.png" width="240" height="155" /></a>
            </p>
            
            <p>
              入力するごとにJSLint,，HTML Tidy，W3C などを使ってエラー検出ができる。<br /> <br />デフォルトだとJSLintは無効になってたけど。
            </p>
            
            <p>
              噂のバージョン管理システム(gitでの表示)
            </p>
            
            <p>
              <a href="https://efcl.info/wp-content/uploads/2011/06/image25.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb25.png" width="320" height="233" /></a>
            </p>
            
            <p>
              ブランチを簡単に作れたり切り替えできるのは結構よさげ。
            </p>
            
            <p>
              <a href="https://efcl.info/wp-content/uploads/2011/06/image26.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb26.png" width="320" height="196" /></a>
            </p>
            
            <p>
              コミット画面もステージへの移動とかさせながらコミットメッセージを書けるようになってる
            </p>
            
            <p>
              <a href="https://efcl.info/wp-content/uploads/2011/06/image27.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb27.png" width="320" height="195" /></a>
            </p>
            
            <p>
              履歴もIDE内で表示できてDiffを見たりできる。
            </p>
            
            <p>
              <a href="https://efcl.info/wp-content/uploads/2011/06/image28.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb28.png" width="295" height="251" /></a>
            </p>
            
            <p>
              メニューからできることは基本的な事だけっぽい感じ。<br /> <br />この辺もWebStormとかの方ができが良いかもしれないけど、ブランチの切り替えとコミットやpushができるので、書いていく環境としては悪くないかもしれない。(マージとかその辺のやり方がよく分からない)
            </p>
            
            <p>
              <a href="https://efcl.info/wp-content/uploads/2011/06/image29.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://efcl.info/wp-content/uploads/2011/06/image_thumb29.png" width="313" height="251" /></a>
            </p>
            
            <p>
              ただ、Terminal機能が内蔵されているので直接コンソールからgitコマンドを叩けるので結構良い感じかもしれない。
            </p>
            
            <p>
              使いこなすにはちょっと手間がかかりそうだけど、ちょっと触った感じだとそこまで悪くはない。 推測した用に補完候補をいじったりできるなら、結構良い感じにJavaScript IDEとして使えるようになるんじゃないかと思う。<br /> <br />Aptana 2では時間とともに腐っていってたけど(長いソースでダメとか、どんどん重くなるとか)、そういうのがないことを祈りましょう。
            </p>
            
            <p>
              まあ、普通にJavaScriptを書くのが目的なら<a href="http://www.aptana.com/">Aptana Studio 3</a>を使いましょう。ベースは同じなので、Titanium (Mobile|Desktop)向けのものを書かないのに、Titamium Studioを選ぶ理由はない気がする。
            </p>
            
            <ul>
              <li>
                <a href="http://bowz.info/2941">[ Titanium Studio ] インストール・設定してみた | Bowz::Notebook</a>
              </li>
              <li>
                <a href="http://d.hatena.ne.jp/donayama/20110405/titanium_studio_preview">Titanium Studio 1.0 Previewが出ました！ &#8211; JP::HSJ::Junknews::HatenaSide</a>
              </li>
            </ul>

 [1]: http://developer.appcelerator.com/blog/2011/06/titanium-studio%E3%81%A8titanium-mobile-1-7%E3%82%92%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F.html?lang=ja
 [2]: http://www.infoq.com/jp/news/2011/06/Appcelerator-Titanium-Studio
 [3]: http://www.aptana.com/
 [4]: https://efcl.info/wp-content/uploads/2011/06/image16.png
 [5]: https://efcl.info/wp-content/uploads/2011/06/image17.png
 [6]: https://efcl.info/wp-content/uploads/2011/06/image18.png
 [7]: https://efcl.info/wp-content/uploads/2011/06/image19.png
 [8]: https://efcl.info/wp-content/uploads/2011/06/image20.png
 [9]: http://d.hatena.ne.jp/yuchi78/20100515/1273944479
 [10]: https://efcl.info/wp-content/uploads/2011/06/image21.png
 [11]: https://efcl.info/wp-content/uploads/2011/06/image22.png
 [12]: https://efcl.info/wp-content/uploads/2011/06/2011-06-22-ss10.png
