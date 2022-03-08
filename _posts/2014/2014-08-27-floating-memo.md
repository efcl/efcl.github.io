---
title: "node-webkitで最前面に置けるMarkdownメモアプリを作った"
author: azu
layout: post
date : 2014-08-27T20:00
categories:
    - software
tags:
    - JavaScript
    - node-webkit
    - software
    - markdown

---

# [floating-memo.app](https://github.com/azu/floating-memo "floating-memo.app")

名前の通り最前面に表示されてる事を前提にした簡易なメモアプリです。

node-webkitで最前面なアプリが書けることに気づいたので簡単に作りました。

![img](https://efcl.info/wp-content/uploads/2014/08/25-1408964710.png)

今のところMacのみのサポートとしています(DayOneに依存してるので)、別の所に保存する実装等があれば他のプラットフォームでも動かせるようになると思います。

以下から、ダウンロードすることが出来ます。

- https://github.com/azu/floating-memo/releases/latest

## 仕組み

### node-webkit

[floating-memo.app](https://github.com/azu/floating-memo "floating-memo.app")はnode-webkitで書かれています。

node-webkitは[node-webkitとは何か](https://azu.github.io//slide/udonjs/node-webkit.html "node-webkitとは何か")でも書いていましたが、ブラウザのcontextとnode.jsのcontextの2つを持っています。

このアプリでは、表示やエディタ部分はブラウザのcontextで、DayOneに保存するところだけnode.jsのcontextで動いています。(ブラウザじゃできないところをnode.jsで処理するという形ですね)

このcontextの違いはごちゃ混ぜに出来てしまうのも特徴ですが、今回は明確にentry pointで切り分けました。

詳しくは[Manifest format · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Manifest-format "Manifest format · rogerwang/node-webkit Wiki")に書いてありますが、node-webkitアプリのpackage.jsonでは`main`の他に`node-main`というプロパティを指定することが出来ます。

- `main` はブラウザでcontextで動くHTMLを指定します
	- mainから node.js contextで実行するのも可能です(これがややこしい原因ですが)
- `node-main` は node.jsのcontextで動くjsを指定します

普通の考えなら、`main` <-> `node-main`のやり取りは通信やメッセージングを使いますが(むしろそうした方がいい気がする)、node-webkitの場合はこのcontextの境界が薄いので、普通にglobal.windowに関数を貼ったりすれば相互に呼び出し出来てしまいます!

今回は<del>面倒だった</del>小さいアプリなので、`node-main`から`global.window.dayone`という関数を生やして、それをブラウザcontextから呼び出す事でDayOneに保存できるようにしました。

node-webkitはホビー用途だとかなり気軽で楽しいのでオススメです。

Chrome stableに近いバージョンで動いて遊べるので、最近はMV*ライブラリなどを試したりする遊び場になってます。(Browserifyなくてもnpmが使えて楽というのもあります)

####最前面表示

node-webkitでアプリを最前面にするのは簡単で[Window.setAlwaysOnTop(Boolean top)](https://github.com/rogerwang/node-webkit/wiki/Window#windowsetalwaysontopboolean-top "Window.setAlwaysOnTop(Boolean top)")を使うだけです。

また、クリップボード,
フルスクリーンやWebNotification、` style="-webkit-app-region: drag"`というスタイルを使ってアプリのドラッグ移動の対応など、簡単なビューアアプリを作る場合に適した機能が既に入っています。
(コマンドライン関係ならnode.jsから直接プロセスを読んだりすれば大体できます)

ウィンドウの透過はまだないようです。

####Macのネイティブメニュー

node-webkit 0.10からMacのネイティブメニューは自動では作られなくなりました。
![menu](https://efcl.info/wp-content/uploads/2014/08/30-1409390312.png)

これで何が困るかというと、MacだとCmd+QやCmd+a等のショートカットはメニューに定義されているため、どのアプリも共通にあるショートカットが効かなくなってしまう点です。

そのため、以下のように[Menu.createMacBuiltin(appname)](https://github.com/rogerwang/node-webkit/wiki/Menu "Menu.createMacBuiltin(appname)")を使って明示的にデフォルトのメニューを追加する必要があります。

```javascript
var gui = require('nw.gui');
var win = gui.Window.get();
if (process.platform == 'darwin') {
    var mb = new gui.Menu({type: "menubar"});
    mb.createMacBuiltin(require("../package.json").name);
    win.menu = mb;
}
```


### CodeMirror

メインのエディタとなる部分には[CodeMirror](http://codemirror.net/ "CodeMirror")を使っています。
[CodeMirror](http://codemirror.net/ "CodeMirror")はIMEとの相性も悪くなく(より良くする場合は[CodeMirror Composition Mod](https://github.com/zhusee2/codemirror-composition-mod "CodeMirror Composition Mod")を当てる)、豊富なAPIやプラグイン(Addon)が用意されているので、結構手軽に使えます。

特にMarkdownエディタとしてはそこらのネイティブアプリより素で出来がいいと思います。

- [CodeMirror: GFM mode](http://codemirror.net/mode/gfm/ "CodeMirror: GFM mode") のサポート
- シンタックスハイライト
	- コードブロックで別言語の部分のシンタックスハイライトも可能
- CSSでの制御(シンタックスハイライト、文字サイズやレイアウトとかも)
- Addonでの拡張(GFMモードとかも拡張ベースです)

以下のようにベースと必要なAddonを読み込んでやるだけでGitHub flavored markdown対応のエディタが用意出来ます。(npmにも対応してるので、`require`する方法でも使えます)

```html
<script src="node_modules/codemirror/lib/codemirror.js"></script>
<script src="node_modules/codemirror/addon/mode/overlay.js"></script>
<script src="node_modules/codemirror/mode/javascript/javascript.js"></script>
<script src="node_modules/codemirror/mode/markdown/markdown.js"></script>
<script src="node_modules/codemirror/mode/gfm/gfm.js"></script>
```


```javascript
var editor = CodeMirror.fromTextArea(document.getElementById("floating-memo"), {
    mode: "gfm"
});
```

注意点としては以下のような感じでした。

- それぞれシンタックスハイライトした言語のmodeも読み込む
- gfm.jsはmarkdown.jsとoverlay.jsに依存する

他には[CodeMirrorでカーソル位置が常に中央になるアドオンを書いた | Web Scratch](https://efcl.info/2014/08/24/codemirror-typewriter-scrolling/ "CodeMirrorでカーソル位置が常に中央になるアドオンを書いた | Web Scratch")でも書いてますが、幾つかAddonを使っています。

普通に必要になるレベルのAPIは大体揃ってるので、いじるのもそこまで難しい(選択範囲とか考えると面倒ですが)という感じじゃないので触ってみると面白いと思います。

自分的には[FoldingText](http://www.foldingtext.com/ "FoldingText")がCodeMirrorを使ったアプリとしてよくできてると思います。
Mac用のMarkdownアプリなのですが、内部でCodeMirrorを使っていて、CodeMirrorと同じ手法で拡張を書けるようになっていて面白いと思います。

### Mercury

最近node-webkitアプリを書く時、何かしらのMV*やデータバインディングライブラリと言われるものを試しているのですが、[floating-memo.app](https://github.com/azu/floating-memo "floating-memo.app")では[Raynos/mercury](https://github.com/Raynos/mercury "Raynos/mercury")を使いました。

[mercury](https://github.com/Raynos/mercury "Raynos/mercury") は以下のような特徴を持ってます。

- 完全にモジューラーな実装
- Virtual DOM
- FRP
- 軽量

mercuryについては長くなったので別記事にしました

- [Virtual DOMを持つMV*ライブラリのmercuryについて](https://efcl.info/2014/08/28/mercury/)

## まとめ

node-webkitアプリは最前面表示や枠なしのウィンドウ表示もできるので、
プレビューツールみたいな小物アプリを書くのに便利です。

- [floating-memo.app](https://github.com/azu/floating-memo "floating-memo.app")
- [Virtual DOMを持つMV*ライブラリのmercuryについて](https://efcl.info/2014/08/28/mercury/)
