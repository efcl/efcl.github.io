---
title: Fish Shellでコマンドの実行結果を変数に代入する方法
author: azu
layout: post
permalink: /2013/0520/res3282/
dsq_thread_id:
  - 1300527536
categories:
  - Shell
tags:
  - fish
  - shell
---
[fish 2.0][1]がでたので、[fish][2]([friendly interactive shell][3])色々と試していますが文法等が違う所も多いです。

よく使いそうな、ある実行結果を変数に入れて使うような場合に必要な機能、一般には[Command Substitution][4]という名前みたいで、Bashやzshでの

    $(command)
    # や
    `command`
    

などの機能のことです。

fish shellでは

    help expand-command-substitution
    

と叩くと解説が見られます。

*   [fish user documentation][5] の `Command substitution`

fish shellでは単純に

    (command)
    

とすれば実行されるようです。

    set wd (pwd)
    echo $wd
    

なので、上記のようにやると `$wd` には `pwd` の実行結果が入るようになります。

挙動の動画



参考

*   [friendly interactive shell &#8211; Wikipedia, the free encyclopedia][6]
*   [help expand-command-substitution][7]

 [1]: http://ridiculousfish.com/blog/ "fish 2.0"
 [2]: http://fishshell.com/ "fish"
 [3]: http://en.wikipedia.org/wiki/Friendly_interactive_shell "friendly interactive shell"
 [4]: http://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html "Command Substitution"
 [5]: http://ridiculousfish.com/shell/user_doc/html/ "fish user documentation"
 [6]: http://en.wikipedia.org/wiki/Friendly_interactive_shell "friendly interactive shell - Wikipedia, the free encyclopedia"
 [7]: http://stackoverflow.com/questions/3281220/cannot-understand-command-substitute-in-fish-shell "help expand-command-substitution"