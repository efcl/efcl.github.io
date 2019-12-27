---
title: コマンドラインからSourceTreeのコミット画面を開くAppleScript
author: azu
layout: post
permalink: /2014/0401/res3788/
dsq_thread_id:
  - 2573134621
categories:
  - Mac
tags:
  - Git
  - Mac
  - ソフトウェア
---
普段はWebStorm等のIDEで直接コミットするのでいいですが、  
コマンドラインからちょっとした変更をコミットしたい時に `git commit` 使うのが億劫でした。

gitコマンドを直接使うと、一部ファイルだけコミットするのが面倒なのもあります。  
tigを使えば出来ますが、そこまでやるならGUIでやりたい

*   [tigでgitをもっと便利に！ addやcommitも &#8211; Qiita][1]

[SourceTree][2]はそういうことが大体できますが、SourceTreeを起動 -> コミット画面を開くというのが面倒でした。

それを解決するために、[azu/sourcetree-commit][3]というAppleScriptを書きました。  
(なのでMacのみです)

![gif][4]

使い方は簡単で、

    $ osascript sourcetree-commit.scpt "path/to/directory"
    

という感じで、開きたいリポジトリがあるディレクトリを指定するだけです。  
そうすれば、上記のGifみたいな勝手にコミット画面を開く所までやってくれます。

自分は以下みたいのにaliasを貼って使っています。

    osascript ~/bin/sourcetree-commit.scpt "`git rev-parse --show-toplevel`"

 [1]: http://qiita.com/suino/items/b0dae7e00bd7165f79ea "tigでgitをもっと便利に！ addやcommitも - Qiita"
 [2]: http://www.sourcetreeapp.com/ "SourceTree"
 [3]: https://github.com/azu/sourcetree-commit "azu/sourcetree-commit"
 [4]: https://gyazo.com/06b8a58e8afe0f600e199ed6dc6c6d81.gif