---
title: Node.jsで書いてQuickStartを使ってブラウザで実行する話
author: azu
layout: post
permalink: /2014/0629/res3956/
dsq_thread_id:
  - 2804079887
categories:
  - javascript
tags:
  - AST
  - browser
  - browserify
  - javascript
  - Node.js
---
# [QuickStart][1]

[QuickStart][1]というのは、名前がややこしいですが[Spotify][2]社が出してるツールのことです。

このツールはCommonJSで書いたJavaScriptのモジュールの依存関係を解決してビルドしたり、ローダとして使えるものです。

前者のビルドする機能は簡単にいえば[Browserify][3]です。

QuickStartもBrowserifyと同じく、nodeのcoreモジュール等をブラウザで使える様になってます。(CoreモジュールはBrowserifyが使ってるものと同じshimが使われてる)

もう一つの**ローダ**として使えるのがこのQuickStartの面白い所なんじゃないかなと思います。

この記事では、適当に試して見たQuickStartの使い方について見ていきます。

サンプルプロジェクトは以下に置いてあります。

*   [azu/quickstart-example][4]

## ビルド

ビルドする場合はBroserifyと同じようにentry point(始まりとなるjsファイル)を指定してビルドするだけです。

[Entry Point][5] にかかれているように、デフォルトで`package.json`の`main`が自動的にentry pointとなります(オプションで指定も出来る)

そのため、以下のように書けばビルド出来ます。

    quickstart > bundle.js
    # ==
    quickstart --main index.js > bundle.js
    

[azu/quickstart-example][4] のサンプルプロジェクトだと、  
browserifyとquickstartそれぞれのビルドが以下のように出来るようにしてあります。

    npm run build-q # build with quickstart
    npm run build-b # build with browserify
    

### ビルドオプション

[command line interface][6]で幾つかビルドオプションが設定できます。(オプションファイルを用意して指定もできる)

*   `--compress` で minify
*   `--source-map` でsourcemapの生成(browserifyの`-d`)
*   `--ast` で JavaScript ASTを出力
*   `--transforms` ASTベースの変換プラグインを指定する(browserifyの`-t`)

QuickStartのtransformsで指定して使うプラグインは **SpiderMonkey AST based Plugin system** という事で、ASTを変換するようなモジュールを指定して使います。

また、`--ast` というオプションをつけてビルドすると、依存してるモジュールを含めたコードのJavaScript ASTを生成してくれます。

この辺何か面白いことが出来そうだなーと思いました。

JavaScript ASTについては以下を見ておいて下さい。

*   [カジュアルJavaScript AST][7]
*   [JavaScript AST Walker][8]

## ローダ

これが、[QuickStart][1]のメイン機能だと思っているのですが、  
QuickStartは自身をローダとして使うことが出来ます。

どういう事かというと、以下のURLにChromeでアクセスしてChrome Dev Toolsを開いて見ると`require`で読み込むモジュールを読み込んでいる様子が分かると思います。(このローダはローカルで使うことを想定してるはずなので、プロダクトはビルドしてものを使うと思います)

<https://azu.github.io//quickstart-example/>

ワザといらないものも大量に読み込んでるのでかなり遅いですが…

![gif][9]

ローダとして使う場合は`--self`オプションを指定します。

    quickstart --self > bundle.js
    

とやると、ローダとしてのスクリプトが出力されます。

そして実際にアクセスした時に、`package.json`の`main`等を解析して動的に`require`で使ってるモジュールを解決していきます。(AMDみたいに動的ロードじゃなくて最初のフェーズで全部やるはず)

### ローダとSource Map

ローダとして使った場合、Source Mapの生成も動的に行います。(自動的に有効になるようです)

そのため、ローダとして使った場合も元々のモジュールに対してブレークポイントを打ってデバッグしたり出来ます。

これは [Source Mapを扱う関連ライブラリのまとめ | Web scratch][10] でも書いてましたが、動的にSource Mapを生成してsourceMappingURLにBase64エンコードしたものをいれるようです。

*   [Dynamic Source Maps][11]という感じで
*   Firefox/Chrome等で動く

サンプルプロジェクトでは、QuickStartとBroserifyで大体似たような事すると以下のようになるはず(ローダとして使えば、監視してビルドするの代わりになる)

    npm run quickstart
    npm run watch # == broserify -d
    

ローダとして使った時、コードを変更した場合でもビルドをしなくてもリロードするだけで良くなります。(これが名前の由来なのかな?)

*   ローダとして使う ≒ [RequireJS][12]を使った動的ロード
*   Browserifyのようにビルドして使う ≒ [r.js][13]でのビルド

というイメージが近い感じがします。

## まとめ

CommonJSで書いたものをビルドしてブラウザで実行出来るようにビルドするツールは[michaelficarra/commonjs-everywhere][14]や[Browserify][3]等があります。

[QuickStart][1] はビルド機能とローダとして使える機能があります。

AMDのように初めてアクセスした時にロードする遅延ロードはCommonJSの仕様的に難しそうですが、ローダとして使うことでビルドする必要なく開発を続けられるようになっています。

transforms系の機能に依存しなければ、BrowserifyとQuickStartどちらでもビルド出来るものを作るのはそこまで難しくない気がします。

名前がわかりにくいので改名して欲しいです。

ちょっと触った感想は以上です。

*   [azu/quickstart-example][4]

 [1]: http://spotify.github.io/quickstart/ "QuickStart"
 [2]: https://www.spotify.com/int/why-not-available/ "Spotify"
 [3]: http://browserify.org/ "Browserify"
 [4]: https://github.com/azu/quickstart-example "azu/quickstart-example"
 [5]: https://github.com/spotify/quickstart#entry-point "Entry Point"
 [6]: https://github.com/spotify/quickstart#command-line-interface "command line interface"
 [7]: https://azu.github.io//slide/JSojisan/ "カジュアルJavaScript AST"
 [8]: https://azu.github.io//slide/tkbjs/js-ast-walker.html "JavaScript AST Walker"
 [9]: http://i.gyazo.com/ba484c31e8389bf0d90ce778c1fe8c79.gif
 [10]: https://efcl.info/2014/0622/res3933/ "Source Mapを扱う関連ライブラリのまとめ | Web scratch"
 [11]: http://kybernetikos.github.io/jsSandbox/srcmaps/dynamic.html "Dynamic Source Maps"
 [12]: http://requirejs.org/ "RequireJS"
 [13]: https://github.com/jrburke/r.js/ "r.js"
 [14]: https://github.com/michaelficarra/commonjs-everywhere "michaelficarra/commonjs-everywhere"
