---
title: autojumpからpercolベースのディレクトリジャンプに移行する
author: azu
layout: post
permalink: /2013/1230/res3580/
dsq_thread_id:
  - 2079923855
categories:
  - Shell
tags:
  - Node.js
  - percol
  - zsh
---
## autojump?

コマンドラインでよく移動するディレクトリに行くのに、[autojump][1]や[rupa/z][2]等が有名ですが、[percol][3]でも同じような事ができるのでそちらに移行してみる話です

*   [percol で z / autojump のようにディレクトリ高速ジャンプ &#8211; Slip Ahead Logging][4]

## why

*   autojumpも補完が効くけど、数が増えると最初から一覧がでて絞り込むUIの方がやりやすい
*   なんとなく

## percol版

[percol で z / autojump のようにディレクトリ高速ジャンプ &#8211; Slip Ahead Logging][4]に書かれているもの殆どそのままですが、  
移動したディレクトリが表示されるように少しだけ手を入れてます。

![percol+autojump][5]



## .cd\_history\_file

[autojump][1]で使ってるcdの移動履歴はhomebrewで入れた場合は以下のような場所にあって、`スコアtパス`が並んでるようなファイルが保存されています。(パスは重複しない)

`~/.local/share/autojump/autojump.txt`

    22.360679775    /Users/azu/workspace/Objective-C/LTAPIRequest
    22.360679775    /Users/azu/Dropbox/Public/information/slide/tkbjs
    20.0    /Users/azu/Dropbox/workspace/Mac/project/GithubReader
    

これに対して、上記のpercolのzshスクリプトでは `.cd_history_file` というファイルに  
重複ありで移動したパスを追記していくスタイルになってるので、 `autojump.txt` を以下の形式に変換します。

    /Users/azu/workspace/Objective-C
    /Users/azu/workspace/Objective-C
    /Users/azu
    /Users/azu/workspace/Objective-C
    

Nodeで適当にスクリプトを書いたので、autojump.txtを食わせれば標準出力に変換したものを流してくれます。

    node index.js /path/to/autojump.txt > .cd_history_file
    

*   [azu/converter\_from\_autojump\_to\_percol][6]

[EventStream][7]を使って書くとこういうCLIでパイプを繋いで使うものがキレイに書けて便利な気がします。

 [1]: https://github.com/joelthelion/autojump "autojump"
 [2]: https://github.com/rupa/z "rupa/z"
 [3]: https://github.com/mooz/percol "percol"
 [4]: http://stillpedant.hatenablog.com/entry/percol-cd-history "percol で z / autojump のようにディレクトリ高速ジャンプ - Slip Ahead Logging"
 [5]: https://gyazo.com/5bb415e1d591670e45f102fea0987440.gif
 [6]: https://github.com/azu/converter_from_autojump_to_percol "azu/converter_from_autojump_to_percol"
 [7]: https://github.com/dominictarr/event-stream "EventStream"