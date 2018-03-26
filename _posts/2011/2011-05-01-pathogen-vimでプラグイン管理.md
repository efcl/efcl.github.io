---
title: pathogen.vimでプラグイン管理
author: azu
layout: post
permalink: /2011/0501/res2423/
SBM_count:
  - '00006<>1355445506<>6<>0<>0<>0<>0'
dsq_thread_id:
  - 300820687
categories:
  - software
tags:
  - plugin
  - vim
---
書いてるうちに[Vim-users.jp &#8211; Hack#215: Vundle で plugin をモダンに管理する][1]のような、Vundleというもっと良さそうな感じのが出ましたが一応書いておく

gvimのフォルダにはgvimrc(GUI向けの設定)とvimrc(エディタ部分)という設定用のファイルが存在してる。   
個人用の設定はWindowsだと**_vimrc**というファイルを作成して書き込む。(他の場合は.vimrc)

[pathogen.vim][2]とgitでプラグイン管理。   
プラグインなどのファイルをため込む場所はgvimフォルダ/vimfilesに置くことにした(いわゆる$VIM/vimfilesという場所)   
Windowsと他で異なるらしいので[vimrc, runtime の優先順位を理解して Windows と Linux で Vim の設定を共有する][3]を読む。   
pathogen.<span class="keyword">vim</span>は<span class="keyword">vim</span><span class="keyword">プラグイン</span>の読み込みパスを変更する<span class="keyword">プラグインで、通常だとプラグインをフラットに置かないと行けないのが、</span><span class="keyword"> </span>vimfiles/bundle/<<span class="keyword">プラグイン</span>名>/以下の各<span class="keyword">ディレクトリもちゃんと読み込んでくれるという感じのプラグインです。(標準でそうじゃないのか…)</span>   
Vim標準のフォルダ構成は[Vim-users.jp &#8211; Hack #34: Vimのディレクトリ構成][4]が参考になります。

pathogen.vimの導入は下を参考にする

*   [pathogen.vim + プラグインのgit管理の導入 &#8211; SUGI @ to be a PLATINUM creator &#8230;][5]

&#8220;.vimrcにpathogenの設定を追加します。&#8221;のところまでやったらこんなファイルの配置になる

<pre>vimfiles
├.git[DIR]
├.gitmodules
├autoload[DIR]
│  └pathogen.vim(エイリアス)
└bundle[DIR]      
     └vim-pathogen[DIR]</pre>

git submoduleを使って読み込んでおけば$ git submodule update でまとめてアップデートできるので、gitと相性が良いらしいです。([pathogen.vim＋gitでvimのプラグイン管理 &#8211; ケーズメモ][6])   
pathogen.vimはエイリアスでautoloadフォルダに入れた方がアップデートが楽なので、うちの環境だとgit関係でlnコマンドが入ってたのでそれを使いました。(ないなら[Link Shell Extension][7]を使う)   
ここでpathogeが読み込まれてるかをvim上で:scriptnamesを使って確認します。

読み込まれていたら_vimrcに以下のようにpathogenの設定を追加します。

<pre>" pathogen
call pathogen#runtime_append_all_bundles()
call pathogen#helptags()</pre>

後は同様の方法で、他のプラグインをgit submoduleでインストールしたり、手動でフォルダにいれて管理したりできるそうです

*   [vimプラグインの管理をpathogen.vimにした &#8211; WebCrawler][8]
*   [vimプラグインでよりよいコーディングを | tech.kayac.com &#8211; KAYAC engineers&#8217; blog][9]

git submoduleでインストールしたプラグインを削除するとき、git submodule rmのようなコマンドはないので、以下のようにしてコマンドからアンインストール的な事ができますがやや複雑です。

*   [gitでサブモジュールを削除する &#8211; TIM Labs][10]
*   [「gitでサブモジュールを削除する」をgittoolsに追加してみた &#8211; Humanity][11]

Windowsでもシェルスクリプトみたいなものを書けばgit submodule rmのようなコマンドができる   
nyaosでやる例

*   [Windowsでのコマンドライン環境はConsole2+nyaosで | Web scratch][12]

&nbsp;

<div id="_mcePaste" class="mcePaste" style="position: absolute; width: 1px; height: 1px; overflow: hidden; top: 318px; left: -10000px;">
  <pre class="syntax-highlight">$ git submodule update</pre>
</div>

 [1]: http://vim-users.jp/2011/04/hack215/
 [2]: http://www.vim.org/scripts/script.php?script_id=2332
 [3]: http://d.hatena.ne.jp/teppeis/20080705/1215262928
 [4]: http://vim-users.jp/2009/06/hack34/
 [5]: http://d.hatena.ne.jp/sugilog/20110319/1300536714
 [6]: http://d.hatena.ne.jp/ksmemo/20110111/p1
 [7]: http://schinagl.priv.at/nt/hardlinkshellext/hardlinkshellext.html
 [8]: http://d.hatena.ne.jp/mkataigi/20101107/1289134775
 [9]: http://tech.kayac.com/archive/vim-plugin-coding.html
 [10]: http://labs.timedia.co.jp/2011/03/git-removing-a-submodule.html
 [11]: http://d.hatena.ne.jp/tyru/20110324/git_removing_submodule
 [12]: https://efcl.info/2011/0501/res2717/
