---
title: WEB+DB PRESS用語統一ルール(WZEditor)のパーサを書いた
author: azu
layout: post
permalink: /2014/0616/res3931/
dsq_thread_id:
  - 2767657733
categories:
  - javascript
tags:
  - javascript
  - Node.js
  - Tool
---
[WEB+DB PRESS用語統一ルール][1] とは、gihyo社のWEB+DB PRESSで使っているらしい用語の揺れを修正するための辞書ファイルのことです。

gistで公開されています。(最新版とかGithubで管理したりしないのかな)

*   [WEB+DB PRESS用語統一ルール][1]

この辞書ファイルは[WZ EDITOR][2]の用語統一辞書となってます。

フォーマット見てたら正規表現に変換できるんじゃないかなーという感じがしてきたので、Nodeで[azu/wzeditor-word-rules-parser][3]というパースして正規表現に変換するものを書いてみました。

*   [azu/wzeditor-word-rules-parser][3]

仕様が公開されてないので、色々試しながら変換したので正確なのかは若干怪しいですが、とりあえず変換出来た気がします。([一部正規表現的に解釈できないのがあったのダメな行][4]があります)

*   [WZ Editor 用語統一ヘルプ][5] に調査結果を色々書いた

[JavaScript Promiseの本][6]を書いてて、これで、WZ Editor以外でも単語のLintができるんじゃないかなーと思って作りました。

<blockquote class="twitter-tweet" lang="en">
  <p>
    WEB+DB PRESS用語統一ルール使った大雑把な日本語Lintみたいのできた。 <a href="http://t.co/qrvjXZ2ZOp">pic.twitter.com/qrvjXZ2ZOp</a>
  </p>
  
  <p>
    &mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/statuses/474188405216014336">June 4, 2014</a>
  </p>
</blockquote>

 [1]: https://gist.github.com/inao/f55e8232e150aee918b9 "WEB+DB PRESS用語統一ルール"
 [2]: http://www.wzsoft.jp/wz8/index.html "WZ EDITOR"
 [3]: https://github.com/azu/wzeditor-word-rules-parser "azu/wzeditor-word-rules-parser"
 [4]: https://twitter.com/azu_re/status/474156985097547776
 [5]: https://gist.github.com/azu/ae4d643aff11e4562267 "WZ Editor 用語統一ヘルプ"
 [6]: https://github.com/azu/promises-book "JavaScript Promiseの本"