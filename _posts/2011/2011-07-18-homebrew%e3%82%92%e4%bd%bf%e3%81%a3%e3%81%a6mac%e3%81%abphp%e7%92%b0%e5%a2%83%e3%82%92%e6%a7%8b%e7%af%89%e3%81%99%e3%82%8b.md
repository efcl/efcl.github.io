---
title: Homebrewを使ってMacにPHP環境を構築する
author: azu
layout: post
permalink: /2011/0718/res2942/
dsq_thread_id:
  - 361150321
SBM_count:
  - '00021<>1355423431<>21<>0<>0<>0<>0'
categories:
  - インストール設定
tags:
  - Mac
  - php
---
Homebrewのインストール方法はいろいろなところで見られるので手短に

*   [Installation &#8211; GitHub][1]
*   [Macのパッケージ管理をMacPortsからhomebrewへ &#8211; よんちゅBlog][2]&#160;

<div>
  <pre class="csharpcode">$ ruby -e <span class="str">"$(curl -fsS http://gist.github.com/raw/323731/install_homebrew.rb)"</span><br />$ brew install git<br />$ brew update</pre>
</div>

これでbrewコマンドが使えるようになったので、下のFormula(パッケージの情報みたいなもの)を使ってPHPやMySQLなどをインストールする。

*   [(Re)installing PHP 5.3 on Mac OS X — justin hileman dot info][3]
*   [bobthecow&#8217;s gist: 85ad6dfb594d9215b42b — Gist][4]

最近のMacだとデフォルトPHPとか入ってるけど、何かアップデートとか面倒そうなのでbrewを使ってインストールし直してる。

<div id="codeSnippetWrapper">
  <pre id="codeSnippet" class="csharpcode">$ brew install https://github.com/adamv/homebrew-alt/raw/master/duplicates/php.rb --with-mysql --with-intl</pre>
  
  <p>
    </div> <p>
      という感じでインストールした。<br /> <br />インストール後にwhichコマンドで、どのphpバイナリを示しているかを確認すると、デフォルト?のphpが参照されてままだった。(Homebrewは/usr/local/bin/以下にインストールしていく)
    </p>
    
    <div>
      <pre id="codeSnippet" class="csharpcode">$which php<br />/usr/bin/php</pre>
    </div>
    
    <div>
      なので、Homebrewでインストールしたものを示すように.bashrcでPATHを書き換える必要がある。(この辺<code>brew linkとかでどうにかなったりしそうだけど…)</code>
    </div>
    
    <pre><code>/usr/local/bin/php</code></pre>
    
    <div>
      デフォルトのMacだと.bashrcがないので自分でホームに作成する必要があるけど、そのままではTerminalで読み込まれなくて、~/.bash_profileを作って~/.bashrcを読み込むようにする。
    </div>
    
    <ul>
      <li>
        <a href="http://memo358.blog18.fc2.com/blog-entry-30.html">とあるプログラマーの覚書 OSXでのbashrcの設定</a>
      </li>
    </ul>
    
    <p>
      ~/.bash_profile を作り、下記の内容を書き加える。
    </p>
    
    <div>
      <pre id="codeSnippet" class="csharpcode"><span class="kwrd">if</span> [ -f ~/.bashrc ] ; then<br />. ~/.bashrc<br />fi</pre></p>
    </div>
    
    <div>
      同じ要領で、~/.bashrcを作って下記の内容を書き加える。
    </div>
    
    <div>
      <div id="codeSnippetWrapper">
        <pre id="codeSnippet" class="csharpcode">export PATH=<span class="str">"$(brew --prefix)/bin:$PATH"</span></pre>
        
        <p>
          これで、Terminalを再起動すると、~/.bashrcが読み込まれるようになるので、
        </p>
      </div>
      
      <div id="codeSnippetWrapper">
        <pre id="codeSnippet" class="csharpcode">$ which php<br />/usr/local/bin/php<br /></pre></p>
      </div>
      
      <p>
        というようにHomebrewでインストールしたphpが使えるようになる。
      </p>
    </div>
    
    <div>
      ブラウザからphpのファイルにアクセスするにはApacheの設定も必要になるけど、下記を参考に設定した。
    </div>
    
    <ul>
      <li>
        <a href="http://weble.org/2010/06/20/mac-virtualhost">Mac でバーチャルホストを XAMPP や MAMP に頼らず設定する方法 | ウェブル</a>
      </li>
      <li>
        <a href="http://d.hatena.ne.jp/hida_shun/20110405/1302016168">Mac OS X 10.6 で VirtualHost &#8211; hida_shunの日記</a>
      </li>
      <li>
        <a href="http://d.hatena.ne.jp/bojovs/20081130/1228042934">MacでApache, MySQL, PHP環境を作ったよ &#8211; bojovs blog</a>
      </li>
    </ul>
    
    <p>
      MacのApacheは「システム環境設定」→「共有」→「Web共有」をON/OFFすれば、コマンドから再起動とかしなくてもいい。後、デフォルトだとPHPモジュールが読み込まれてないので、<a href="http://d.hatena.ne.jp/bojovs/20081130/1228042934">MacでApache, MySQL, PHP環境を作ったよ &#8211; bojovs blog</a>のように httpd.conf のコメントアウトを外してPHPモジュールを読み込むようにする。
    </p>
    
    <p>
      httpd-vhosts.conf を使って、バーチャルホストを設定する際は設定を変更して保存したら
    </p>
    
    <div id="codeSnippetWrapper">
      <pre id="codeSnippet" class="csharpcode">apachectl -t</pre>
    </div>
    
    <p>
      のコマンドで文法ミスがないかをチェックしてから再起動などして試した方が安心。<br /> <br />またコピペして設定する時は、クオーテーションがおかしくないかなども確認した方がいい。
    </p>
    
    <p>
      参考
    </p>
    
    <ul>
      <li>
        <a href="http://d.hatena.ne.jp/okonomi/20110501/1304256929">HomebrewでPHP5.3.6をインストールする &#8211; okonomiの日記</a>
      </li>
    </ul>

 [1]: https://github.com/mxcl/homebrew/wiki/installation
 [2]: http://d.hatena.ne.jp/yonchu/20110226/1298723822
 [3]: http://justinhileman.info/article/reinstalling-php-53-on-mac-os-x/
 [4]: https://gist.github.com/85ad6dfb594d9215b42b