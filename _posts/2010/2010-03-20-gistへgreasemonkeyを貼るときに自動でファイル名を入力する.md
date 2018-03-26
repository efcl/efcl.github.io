---
title: gistへGreasemonkeyを貼るときに自動でファイル名を入力するスクリプト
author: azu
layout: post
permalink: /2010/0320/res1614/
SBM_count:
  - '00009<>1355339742<>6<>0<>1<>2<>0'
dsq_thread_id:
  - 301742311
categories:
  - Greasemonkey
tags:
  - Git
  - Greasemonkey
---
[Gist][1]にGreasemonkeyスクリプトをペーストする時に、自動でファイル名を入力してくれるGreasemonkeyを書きました。  
入力されるファイル名は@nameの要素+.user.jsとなるので、コードをペーストするだけでRawからインストールできるようになります。

<pre id="source">// @name           gist fill in fileName automatically</pre>

という感じで書いてあったなら、gist fill in fileName automatically.user.jsというファイル名が勝手に入力されます。

Add another file…で追加したテキストエリアにも対応させてあります。

[<img class="aligncenter size-medium wp-image-1615" title="sshot-2010-03-20-1" src="https://efcl.info/wp-content/uploads/2010/03/sshot-2010-03-20-1-300x226.png" alt="" width="300" height="226" />][2]

*   [gist fill in fileName automatically][3]

gistのトップページ( http://gist.github.com/ ) <span style="text-decoration: line-through;">と編集ページ</span>で動作します。

**gist fill in fileName automatically for Greasemonkey**
:   [http://userscripts.org/scripts/show/71914][4]

<!--more-->

**技術的な動作  
**

<pre class="brush:javascript;">var fileExtension = ".user.js";
var addAutoEvent = function(fileID){
    var editArea = document.getElementsByName("file_contents&#91;gistfile"+fileID+"&#93;")&#91;0&#93;;
    var editFileName = document.getElementsByName("file_name&#91;gistfile"+fileID+"&#93;")&#91;0&#93;;
    editArea.addEventListener("paste", function(e){
        // この瞬間はまだtargetのvalueが空である。
        var obj = e.target;
        obj.addEventListener('input', function(evt){
            // クリップボードの内容がinputされた
            evt.currentTarget.removeEventListener(evt.type, arguments.callee, false);
            var pasteValue = obj.value;
            var m = pasteValue.match(/@names+(&#91;ws&#93;+)n/i);
                m = m && m&#91;1&#93;;
            if(m && !editFileName.value){
               m = m.replace(/s+$/ , "");
               // m = m.replace(" " , "_" , "g");// 第３引数 繰り返し
               editFileName.value = m + fileExtension;
               // console.log(m + fileExtension);
               editFileName.focus();
            }
        }, false);
    }, false);
};
// 追加されたテキストエリアにもイベントをつける
var addButton = document.getElementById("add-gist");
addButton.addEventListener("click",function(){
    document.getElementById("files").addEventListener("DOMNodeInserted",function(e) {
        // テキストエリアが追加された         
        e.currentTarget.removeEventListener(e.type, arguments.callee, false);
        var editAreaLength = document.getElementsByClassName("file").length;
        addAutoEvent(editAreaLength);
    } ,false);
}  ,false);
// 最初から表示されているテキストエリアにイベントをつける
addAutoEvent(1);</pre>

[Griever][5]さんが書いてくれた[ヒント][6]を元にしてます。

<pre>addEventListener("paste" , ...);
</pre>

でペーストに対してイベントリスナーを付け加えることができるのですが、この瞬間に

<pre>e.target.value
</pre>

としても内容は空(もしくは元からそこに書いてあったもの)となり、期待するテキストエリアの文字列は取得できません。  
なので、pasteのイベントリスナー内で

<pre>editArea.addEventListener("paste", function(e){
        // この瞬間はまだtargetのvalueが空である。
        var obj = e.target;
        obj.addEventListener('input', function(evt){...

</pre>

のように、inputイベントをつけると、実際に文字列がテキストエリアに入った瞬間にinputイベントが動くので、  
inputイベント内で

<pre>obj.value
</pre>

を見るととテキストエリア内の文字列が取得できます。  
(ペーストされた部分のみを扱いたい場合は[gist: 338606 &#8211; GitHub][7]を参考に)  
後は、inputのイベントはそのまま残っているとジャマなので自身を参照してremoveEventListenerしておいて、やりたかったことをやる。

追加されたテキストエリアにもイベントを加えるのもほとんど同じ形をしています。  
まず、addボタンに対してclickイベント付け加えます。  
gistでは元々addボタンに対してclickイベントがつけられていて、複数のclickイベントがあったときはつけられた順に実行されるので、元々あったclickイベント→Greasemonkeyでつけたclickイベントの順に実行される。  
しかし、元々あったclickイベントではxmlhttprequestを使って非同期にテキストエリアを追加しているので、  
テキストエリアを追加(gist側)→テキストエリアにイベントをつける(Greasemonkey) ということをやりたい場合にテキストエリアが追加されるまで待たないといけません。  
JavaScriptではそういうときにsetIntervalで回したり、watch(IEでは動かない)でプロパティを監視したりできると思いますが、  
今回は[DOMNodeInserted][8]を使ってDOMに要素が追加されたら発火するイベントをつけることにした。

<pre>var addButton = document.getElementById("add-gist");
addButton.addEventListener("click",function(){
    document.getElementById("files").addEventListener("DOMNodeInserted",function(e) { ...
</pre>

#files 要素内に新しいテキストエリアが追加されると、DOMNodeInsertedイベントが発火するので、非同期で追加されたテキストエリアに関しても、最初に作成したpasteイベントをつけることができる。  
この時に前と同様にDOMNodeInserted内で自分自身をremoveEventListenerしておく。  
DOMNodeInsertedとかドキュメントがあんまり見当たらない。

**DOMNodeInserted event JavaScript**
:   [http://help.dottoro.com/ljmcxjla.php][9]

**DOM Mutation Events は非同期にして使おう &#8211; JavaScriptで遊ぶよ &#8211; g:javascript**
:   [http://javascript.g.hatena.ne.jp/edvakf/20100204/1265312155][10]

偶然にもpaste→input、click→DOMNodeInsertedという感じで両方とも、イベントリスナー内でaddEventListenerという形になった。  
以上

 [1]: http://gist.github.com/
 [2]: https://efcl.info/wp-content/uploads/2010/03/sshot-2010-03-20-1.png
 [3]: http://userscripts.org/scripts/show/71914
 [4]: http://userscripts.org/scripts/show/71914 "gist fill in fileName automatically for Greasemonkey"
 [5]: http://twitter.com/Griever2
 [6]: http://twitter.com/Griever2/statuses/10767886150
 [7]: http://gist.github.com/338606
 [8]: https://developer.mozilla.org/ja/DOM_Events#DOMNodeInserted
 [9]: http://help.dottoro.com/ljmcxjla.php "DOMNodeInserted event JavaScript"
 [10]: http://javascript.g.hatena.ne.jp/edvakf/20100204/1265312155 "DOM Mutation Events は非同期にして使おう - JavaScriptで遊ぶよ - g:javascript"
