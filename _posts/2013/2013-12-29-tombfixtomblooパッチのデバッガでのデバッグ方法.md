---
title: Tombfix(Tombloo)パッチのデバッグ方法
author: azu
layout: post
permalink: /2013/1229/res3573/
dsq_thread_id:
  - 2079486497
categories:
  - Firefox
tags:
  - Debug
  - Firefox
  - アドオン
---
## デバッガの種類

現代的なFirefoxにはネイティブで開発者ツールがつくようになっていますが、content(一般的なウェブページの領域)とchrome(Firefox拡張等の領域)に分かれています。

<img src="https://efcl.info/wp-content/uploads/2013/12/2013-12-29-at-18.10.png" alt="2013 12 29 at 18 10" title="2013-12-29 at 18.10.png" border="0" width="600" height="430" />

[Tombfix][1] のパッチというのはchrome権限で動いているので、ブラウザデバッガの方を利用します。

デフォルトでは、ブラウザデバッガの表示はされてなかったと思うので、about:configで以下をtrueにして再起動しておきます。

    devtools.chrome.enabled
    devtools.debugger.remote-enabled
    

以下を参考にするといいと思います。

*   [開発ツール &#8211; Firefoxアドオンの開発手法][2]
*   [デバッガ &#8211; 開発ツール | MDN][3]

そしてブラウザデバッガを起動すると以下のような許可ダイアログが出るので、OKすればデバッガ画面が表示されます。

<img src="https://efcl.info/wp-content/uploads/2013/12/2013-12-29-at-18.05.png" alt="2013 12 29 at 18 05" title="2013-12-29 at 18.05.png" border="0" width="506" height="191" />

毎回許可ダイアログが出るのが嫌な場合は、 `devtools.debugger.prompt-connection` を `false` にするとでなくなるようです。

## デバッガ画面

デバッガ画面を開くと、Tombfixのscriptディレクトリにおいてあるものは自動で読み込まれているので、  
デバッガ画面で検索すれば見つかると思います。

<img src="https://efcl.info/wp-content/uploads/2013/12/2013-12-29-18-27-56.jpg" alt="2013 12 29 18 27 56" title=" 2013-12-29 18-27-56.jpg" border="0" width="600" height="179" />

後は普通にブレークポイントを貼ってステップ実行やウォッチで変数の中身を見られるようになります。

パッチのスクリプト内で普通にプリントデバッグしたい場合は、 `console.log` を使えば、&#8221;ブラウザコンソール&#8221;の方にちゃんとオブジェクト等も出力されるので普通にデバッグできると思います。

 [1]: https://github.com/tombfix "Tombfix"
 [2]: http://www.crystal-creation.com/web-appli/technical-information/browser/firefox/add-on/develop/introduction/tool/ "開発ツール - Firefoxアドオンの開発手法"
 [3]: https://developer.mozilla.org/ja/docs/Tools/Debugger "デバッガ - 開発ツール | MDN"
