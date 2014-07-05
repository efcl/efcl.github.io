---
title: ニコニコ動画とflvplayer_wrapperの履歴
author: azu
layout: page
SBM_count:
  - '00001<>1355441526<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 300975935
---
以前、書いたものをちょっと修正しただけのものなので、意味がおかしい文が混じっている可能性があるので注意

\****

flvplayer_wrapper<a href="http://files.getdropbox.com/u/132475/flvplayer_wrapper_mod.zip" target="_blank"></p> <p>
  http://files.getdropbox.com/u/132475/flvplayer_wrapper_mod.zip</a>
</p>

<div id=":ea">
  (0)使用用途と方法<br /> 使用用途と方法が特殊なため簡単に説明。<br /> flvplayer_wrapperはニコニコ動画の旧プレイヤーをオーバーライドして、旧プレイヤーに新しい機能を追加 することを目的としたソフトウェアです。<br /> 旧プレイヤーは2009年7月に開発終了の宣言が出て( <a href="http://www.nicovideo.jp/?p=about_player" target="_blank">http://www.nicovideo.jp/?p=about_player</a> )、<br /> 新プレイヤーに切り替わったため、現在は上記のURLのように旧プレイヤーが使用できる一部動画のみで動作する。<br /> 使用方法はニコニコ動画のプレイヤーの代わりにflvplayer_wrapperをブラウザ上で呼び出さないといけないため、<br /> プロキシソフトであるProxomitron(オミトロン <a href="http://site.halfmoon.jp/movielist/29.html" target="_blank">http://site.halfmoon.jp/movielist/29.html</a> ) や NicoCache_nlといったWebページを書き換えるソフトが必要となります。<br /> 具体的な使用方法はwiki( <a href="http://wrapper.wiki.zoho.com/" target="_blank">http://wrapper.wiki.zoho.com/</a> )やreadme.txtにまとめてあるため割愛させていただきます。<br /> 既に設定をしてある状態で配布している Proxomitron、<br /> いわゆる設定済flvplayer_wrapper( <a href="http://site.halfmoon.jp/movielist/90.html" target="_blank">http://site.halfmoon.jp/movielist/90.html</a> )を使用しているユーザが数千人程度いると思われます。</p> <p>
    （1）作ろうと思ったきっかけ<br /> flvplayer_wrapper modとは、名前のように2ちゃんねるで開発されていたflvplayer_wrapperという原型となったソフトがあり、<br /> その公開されていたソースを元に現在の大部分を完成させたflvplayer_wrapper customがありました。<br /> 2ちゃんねるでflvplayer_wrapper customの制作者が開発を終了するとの知らせと、同時期にNicoCacheのスレに おいて<br /> 簡単なflvplayer_wrapper customの改変方法が書いてあったのが、flvplayer_wrapper modを開発しようとしたきっかけです。<br /> つまり、flvplayer_wrapper modはflvplayer_wrapper customの公開されていたソースコードが元となっています。<br /> flvplayer_wrapperは何人かの制作者によって勝手に受け継がれて作られているので、総称してflvplayer_wrapper と呼ばれている。<br /> flvplayer_wrapperはmingというphpのFLASHを生成するためのライブラリが使われており、中身はAS2がほとんどとなっています。<br /> 2008年7月11日に初めてflvplayer_wrapperをさわり始めた当初は、プログラミングもほとんどやったことがなかったので、<br /> 少しだけかじっていたjavascriptの知識を元に手探りで改変とニコニコ動画の仕様変更へと対応していました。<br /> そのため、2ちゃんねるの掲示板上での動作報告やアドバイスなどがなかったら、保持していくことはなかったと思います。
  </p>
  
  <p>
    （2）工夫点や苦労した点<br /> flvplayer_wrapperはニコニコ動画のプレイヤーにオーバーライドするという仕様上、ニコニコ動画のプレイヤーの<br /> 変更に影響を受けやすいため、頻繁に行われていた仕様変更に対応することに多くの時間を費やしました。<br /> ニコニコ動画のプレイヤーをデコンパイルした結果を比較しながら、どこがどのように変更したかを確認したから、<br /> flvplayer_wrapperにそれを落とす作業が多く、その中で新しく便利な追加機能を加えていきました。<br /> 特にニコニコ動画でユーザーニコ割が導入された際はかなり大きな変更があり、なおかつ当時はプログラミング知識もあまりなかったため、かなり苦戦してユーザーニコ割へ対応した覚えがある。<br /> また、flvplayer_wrapperは機能の多さと画面の広さを維持したいという思いがあったため、UIにいくつかのパターンを用意したり(<a href="http://is.gd/1YI7C" target="_blank"> http://is.gd/1YI7C</a> )、<br /> プレイヤーを最大化した上でのユーザーニコ割の表示に動画自体の邪魔にならないようにするなどの工夫をした。<br /> ここでも、2ちゃんねるのオミトロンスレでのUIイメージの提供などの協力があったためできたと思います。<br /> flvplayer_wrapperは自分単独で作成したものではありませんが、2008年7月11日から旧プレ イヤーの保持が終了されている現在までに渡って、自分が一番多くの時間を使って関わったソフトウェアである。</div> <div>
      ****
    </div>
    
    <div>
      以上
    </div>
    
    <div>
      現在ではoldplayerモードでないといけないことやswf動画では動作しない等いろいろ寿命的な問題が出ています。<br /> nicocache_nlを使用すれば、誤魔化しながらもswfでも動かしたり延命できるかもしれません。<br /> (nicocache_nlには新型用にコンパイルされたswfを旧型(wrapper等)でも動くように変換するソフトが付いているので、<br /> それを利用する。詳しくは<strong>NicoCache_nl</strong>のreadme.txtやwiki等を参照)
    </div>
    
    <div>
      <dl>
        <dt>
          <strong>FrontPage &#8211; NicoCache_nl</strong>
        </dt>
        
        <dd>
          <a title="FrontPage - NicoCache_nl" href="http://nicolist.net/nicocache_nl/wiki/">http://nicolist.net/nicocache_nl/wiki/</a>
        </dd>
      </dl>
    </div>
    
    <div id="_mcePaste" style="position: absolute; left: -10000px; top: 267px; width: 1px; height: 1px; overflow: hidden;">
      flvplayer_wrapper<br /> http://files.getdropbox.com/u/132475/flvplayer_wrapper_mod.zip</p> <p>
        (0)使用用途と方法<br /> 使用用途と方法が特殊なため先に説明させていただきます。<br /> flvplayer_wrapperはニコニコ動画の旧プレイヤーをオーバーライドして、旧プレイヤーに新しい機能を追加することを目的としたソフトウェアです。<br /> 旧プレイヤーは2009年7月に開発終了の宣言が出て( http://www.nicovideo.jp/?p=about_player )、<br /> 新プレイヤーに切り替わったため、現在は上記のURLのように旧プレイヤーが使用できる一部動画のみで動作する。<br /> 使用方法はニコニコ動画のプレイヤーの代わりにflvplayer_wrapperをブラウザ上で呼び出さないといけないため、<br /> プロキシソフトであるProxomitron(オミトロン http://site.halfmoon.jp/movielist/29.html ) や NicoCache_nlといったWebページを<br /> 書き換えるソフトが必要となります。<br /> 具体的な使用方法はwiki( http://wrapper.wiki.zoho.com/ )やreadme.txtにまとめてあるため割愛させていただきます。<br /> 既に設定をしてある状態で配布しているProxomitron、<br /> いわゆる設定済flvplayer_wrapper( http://site.halfmoon.jp/movielist/90.html )を使用しているユーザが数千人程度いると思われます。
      </p>
      
      <p>
        （1）作ろうと思ったきっかけ<br /> flvplayer_wrapper modとは、名前のように2ちゃんねるで開発されていたflvplayer_wrapperという原型となったソフトがあり、<br /> その公開されていたソースを元に現在の大部分を完成させたflvplayer_wrapper customがありました。<br /> 2ちゃんねるでflvplayer_wrapper customの制作者が開発を終了するとの知らせと、同時期にNicoCacheのスレにおいて<br /> 簡単なflvplayer_wrapper customの改変方法が書いてあったのが、flvplayer_wrapper modを開発しようとしたきっかけです。<br /> つまり、flvplayer_wrapper modはflvplayer_wrapper customの公開されていたソースコードが元となっています。<br /> flvplayer_wrapperは何人かの制作者によって勝手に受け継がれて作られているので、総称してflvplayer_wrapperと呼ばれている。<br /> flvplayer_wrapperはmingというphpのFLASHムービーを生成するためのライブラリが使われており、中身はAS2がほとんどとなっています。<br /> 2008年7月11日に初めてflvplayer_wrapperをさわり始めた当初は、プログラミングもほとんどやったことがなかったので、<br /> 少しだけかじっていたjavascriptの知識を元に手探りで改変とニコニコ動画の仕様変更へと対応していました。<br /> そのため、2ちゃんねるの掲示板上での動作報告やアドバイスなどがなかったら、このプロダクトを保持していくことはなかったと思います。
      </p>
      
      <p>
        （2）がんばった点や苦労した点<br /> flvplayer_wrapperはニコニコ動画のプレイヤーにオーバーライドするという仕様上、ニコニコ動画のプレイヤーの<br /> 変更に影響を受けやすいため、頻繁に行われていた仕様変更に対応することに多くの時間を費やしました。<br /> ニコニコ動画のプレイヤーをデコンパイルした結果を比較しながら、どこがどのように変更したかを確認したから、<br /> flvplayer_wrapperにそれを落とす作業が多く、その中で新しく便利な追加機能を加えていきました。<br /> 特にニコニコ動画でユーザーニコ割が導入された際はかなり大きな変更があり、なおかつ当時はプログラミング知識もあまりなかったため、かなり苦戦してユーザーニコ割へ対応した覚えがある。<br /> また、flvplayer_wrapperは機能の多さと画面の広さを維持したいという思いがあったため、UIにいくつかのパターンを用意したり(<br /> http://is.gd/1YI7C )、<br /> プレイヤーを最大化した上でのユーザーニコ割の表示に動画自体の邪魔にならないようにするなどの工夫をした。<br /> ここでも、2ちゃんねるのオミトロンスレでのUIイメージの提供などの協力があったためできたと思います。<br /> flvplayer_wrapperは自分単独で作成したプロダクトではありませんが、2008年7月11日から旧プレイヤーの保持が終了されている現在までに渡って、自分が一番多くの時間を使って関わったものである。</div>