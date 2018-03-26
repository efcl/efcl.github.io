---
title: "WEB+DB PRESS用語統一ルール等を使った技術用語のLintをするCodeMirrorアドオンを書いた"
author: azu
layout: post
date : 2014-10-20T19:13
category: JavaScript
tags:
    - 日本語
    - JavaScript
    - Node.js
    - CodeMirror

---

# WZ EDITORの用語統一辞書

以前、WZ EDITORの用語統一辞書のパーサを書いていましたが、
これを少し改善して[WEB+DB PRESS表記ルール](https://gist.github.com/inao/f55e8232e150aee918b9 "WEB+DB PRESS表記ルール")が解釈できるようになったので、
これを使ってCodeMirrorにLint機能をつけてみたという話です。

- [WEB+DB PRESS用語統一ルール(WZEditor)のパーサを書いた | Web Scratch](https://efcl.info/2014/0616/res3931/ "WEB+DB PRESS用語統一ルール(WZEditor)のパーサを書いた | Web Scratch")
- [azu/wzeditor-word-rules-parser](https://github.com/azu/wzeditor-word-rules-parser "azu/wzeditor-word-rules-parser")


## CodeMirrorでスペルチェック

[azu/wzeditor-word-rules-parser](https://github.com/azu/wzeditor-word-rules-parser "azu/wzeditor-word-rules-parser")のパーサを使って[WEB+DB PRESS表記ルール](https://gist.github.com/inao/f55e8232e150aee918b9 "WEB+DB PRESS表記ルール")等の
WZ EDITORの用語統一辞書をスペルチェックとして使えるCodeMirrorアドオンを書きました。

- [azu/codemirror-spellckecker](https://github.com/azu/codemirror-spellckecker/ "azu/codemirror-spellckecker")

以下から試すことが出来ます。(DEMOにはWZ EDITORの用語統一辞書の記号周りを取り除いたものが入ってます)

[![gif](https://i.gyazo.com/fe26a3fa4e194bafb72be12ca551d947.gif)](http://azu.github.io/codemirror-spellckecker/)

- [azu.github.io/codemirror-spellckecker/](http://azu.github.io/codemirror-spellckecker/ "CodeMirror + Spell Check + Quick Fix")

マッチした部分は赤下線がでて、行番号の所に表示される警告マークをクリックするとおそらく期待する単語に置換をしてくれます。

あくまで正規表現ベースの辞書みたいなものなので限界があります。(誤爆はありえるので、全部自動化ではなくセミマニュアルなチェックをする作り)

ちゃんとやろうとするなら、[RedPen](http://atl.recruit-tech.co.jp/blog/1860/ "RedPen")みたいに形態素解析をしたりしてトークンからちゃんと頑張らないといけない気がしますが、単語レベルだと正規表現でもそこそこなんとかなる感じがします。(前後の単語ぐらいしかできなくて、文脈はよめないので限界ありますが)

### 導入方法

[azu/wzeditor-word-rules-parser](https://github.com/azu/wzeditor-word-rules-parser "azu/wzeditor-word-rules-parser")でWZ EDITORの用語統一辞書をパースすると、以下の様なマッチする`pattern`と置換結果が入った`expected`があるオブジェクトが生成されるので、それを`registerSpellDictionary`で登録します。

`WZ EDITORの用語統一辞書` がどういう形式なのかは[WEB+DB PRESS用語統一ルール](https://gist.github.com/inao/f55e8232e150aee918b9 "WEB+DB PRESS用語統一ルール")や[wzeditor-rule.md](https://github.com/azu/wzeditor-word-rules-parser/blob/master/doc/wzeditor-rule.md "wzeditor-rule.md")などを見れば大体分かると思います。
(タブ区切りで置換対象と置換後の単語を書いて、正規表現などで前後の条件を書く感じの1行1個の辞書です)

そしてCodeMirrorのエディタには`gutters`と`lintTypo`を設定すれば、行番号の所にLintの結果が表示されるようになります。

``` js
var dictionaryItems = [
    {
        pattern: 'Web Socket',
        expected: 'WebSocket'
    },
    {
        pattern: '\\bBigTable\\b|Big Table|Big table',
        expected: 'Bigtable'
    },
    {
        pattern: '\\bCakePHP\\b',
        flag: 'i',
        expected: 'CakePHP'
        // means - cakePHP -> CakePHP
    }
];
// register dictionary
registerSpellDictionary("markdown", dictionaryItems);
var editor = CodeMirror.fromTextArea(document.getElementById("js-main-editor"), {
    lineNumbers: true,
    mode: "gfm",
    gutters: ["CodeMirror-lint-markers"],
    lintTypo: true
});
```


まだ、本当にプレーンなテキストじゃないと使いにくい気がします。
Markdownで書いても記法やリンクなどがLintに引っかかってくるので。

## 目的

元々は[JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本")で確認に使おうと思ってWZ EDITORの辞書のパーサを書きましたが大して使ってなかったです。

最近、[JSer.info](http://jser.info/ "JSer.info")をGitHubに移してから`fix typos`の[Pull Requests](https://github.com/jser/jser.github.io/pulls?q=is%3Apr+is%3Aclosed "Pull Requests · jser/jser.github.io")を何度ももらっていて、書いてる時はあんまりtypoとか気にしてないのもあって同じ単語の表記のズレとかの修正とかをもらっていました。

それの用語の表記を統一するために、以下のような WEB+DB PRESS用語統一ルールに色々追加していってる辞書を作って使っています。
 
- [azu/technical-word-rules](https://github.com/azu/technical-word-rules "azu/technical-word-rules")

また、[JSer.info 200回記念イベント](http://connpass.com/event/9067/)で色々話す予定ですが、[jser/jser.info-editor](https://github.com/jser/jser.info-editor "jser/jser.info-editor")というJSer.infoに投稿するデータを編集するエディタアプリを[node-webkit](https://github.com/rogerwang/node-webkit "node-webkit")で作っていて、このエディタに今回作ったLint機能を統合してあります。

![screenshot](https://efcl.info/wp-content/uploads/2014/10/20-1413800739.png)

紹介する記事は[jser/jser.info](https://github.com/jser/jser.info "jser/jser.info")にJSONデータとして保存されているので、それを編集チェックするための簡易なエディタアプリです。(CodeMirrorやRactive.jsを使ってます)

全体的に大雑把な作りですが、それとなく動いている感じです。
もっと賢くて実用的な使い方が出来るものが出てくるといいと思います。

-  [azu/wzeditor-word-rules-parser](https://github.com/azu/wzeditor-word-rules-parser "azu/wzeditor-word-rules-parser")
- [azu/codemirror-spellckecker](https://github.com/azu/codemirror-spellckecker/ "azu/codemirror-spellckecker")
- [azu/technical-word-rules](https://github.com/azu/technical-word-rules "azu/technical-word-rules")
- [jser/jser.info-editor](https://github.com/jser/jser.info-editor "jser/jser.info-editor")

現在はニンゲンが介在しないとちょっとチェックの精度が良くない感じで完全に補助するツールになってます。

(こういうの既にプロダクトとして、プログラマブルに使えるものって存在してるのかな?)

[RedPen](http://redpen.cc/ "RedPen")でもかかれていましたが、明らかなフォーマットの異常などはCIで走らせて自動的に書き換えとかまでできるともっと面白くなるような気がします。

> 　現在プリミティブな機能しか提供していないのには理由があります。本ツールははじめにフォーカスしたいのは自然言語処理などの学問分野で研究されている高度な解析ではなく、プログラミング言語の静的解析ツールが行ってくれるような 明らかな誤りやフォーマット異常 の検出だからです。 
-- http://atl.recruit-tech.co.jp/blog/1860/
