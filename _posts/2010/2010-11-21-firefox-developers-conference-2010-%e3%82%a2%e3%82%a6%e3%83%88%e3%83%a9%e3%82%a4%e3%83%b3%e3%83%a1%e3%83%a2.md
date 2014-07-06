---
title: Firefox Developers Conference 2010 アウトラインメモ
author: azu
layout: post
permalink: /2010/1121/res2092/
SBM_count:
  - '00010<>1355390620<>8<>0<>2<>0<>0'
dsq_thread_id:
  - 300802995
categories:
  - Firefox
  - イベント
tags:
  - Firefox
  - Jetpack
  - アドオン
  - ハードウェア
  - ブラウザ
  - 拡張機能
---
[去年][1]に引き続きFirefox Developers Conferenceに参加してきました。  
一応メモをとりながら聞いていたのでとても読みにくいですが公開。  
内容がまとめきれないのは仕様です。

公式に動画と各発表者の資料リンクをまとめたものが公開されました(2010/12/22)

**Firefox Developers Conference 2010**
:   [http://mozilla.jp/events/2010/fxdevcon/][2]

Twitterのハッシュタグ[#fxdevcon][3]を保存しておいたもの。

**Togetter &#8211; 「Firefox Developers Conference 2010」**
:   [http://togetter.com/li/71239][4]

@[teramako][5]さんによる発表者の資料や参加者の感想などをまとめたブクマ

**はてなブックマーク &#8211; 特別でないただのブックマーク &#8211; fxdevcon**
:   [http://b.hatena.ne.jp/teramako/fxdevcon/][6]

takanoさんによる動画(一部は著作権上の問題などがあるためない)

**YouTube &#8211; fxdevcon2010**
:   [http://www.youtube.com/results?search_query=fxdevcon2010&search=tag][7]

### キックオフ

瀧田さんによる挨拶から始まる

### 基調講演 Browsing Without Borders

<pre>Jay Sullivan (ジェイ・サリバン、Mozilla Corporation 製品担当バイスプレジデント)

Firefox1.0から6年が経った。
Mozillaはユーザーの立場に立って努力できる。(他は企業なのでできることとできないことがある)
6年か変化(4回)したFirefoxのロゴ
インターネットの環境も大きく変わってきたので、Mozillaのロードマップも考えていく必要性。

問題
mobile
    中立性をどう持つのか
クラウド
    コスト
    個人情報を何も考えずに入れちゃう人が多い
アプリ(apps)
ソーシャル
    法律とかが追いついてない
    Mozillaはユーザーに立場に立って何が起きてるのかを考える。
    共通基盤がないので、デベロッパーとしてはどうなのか。

mobile
    多種多様な端末が存在するので対応が大変。
    HTML5はその中はネイティブアプリの80%はできる。
クラウド
    同期がまず第一歩
    暗号化や安心などの点から選択が生まれる
アプリ
    mobileアプリはシンプル
    HTML5のアプリケーションを作るのに問題点としてビジネスサイドの問題がある。
    →app storeのような販売する場所が整ってない
ソーシャル
    ブラウザは立ち上げ台になるかも
    シンプルなAPIが欲しいとこ

ミッションに対する課題はインターネット環境の変化に伴って変化しているので
Mozillaもそれに対応していかないといけない。
その中心にブラウザはあるもの

最も高性能なものとしてでるのは「ゲーム」がある。

mobile
    モバイルブラウザ
    Android1.xにバックポートはしない
    ユーザーはモバイルとPCで同じUXを求めてるのかは疑問的
アプリ
    モバイルと密接な関係
    アプリは収益化のモデルが必要とされてる
    Open Web Appsを開始した理由
    まだ販売環境が整ってない感じなのでスタートアップしにくい。
    これのアプローチを探るためにOpen Web Appsの着手。
    現実世界の例をWebのapp storeに適応したらどうなるか?- 返品、競争 - apps store同士の競争
クラウド
    同期の重要性(Sync)
    データはクラウドに格納してどこでもアクセスできるユキビタスになると思ってる。
ソーシャル
    F1は手順を考える必要を省く手軽さを求めた

Love Hack!!

質問
幾度も繰り返された質問だけどiDeviceへのFirefoxの搭載について
    appleは許してくれない
    Firefox Syncとかの探り
アプリストア
    唯一のストアにはなるわけではない
FirefoxをOSに昇華してみては?
    市場出る必要があるので、投資が必要になる。
    Google Chrome OSとアンドロイドの場合は市場がAndroidを選んだ。
    市場をよく見る必要がある。
    FirefoxPhoneを考えたことはあった。そこからHTML5の課題を学ぶことができた。
</pre>

### John Resig feat. Shibuya.js

ライトニングトークいろいろ

<pre>ECMA4の話 - John Resig
    クラス、継承など今まで全く違ったJavaScriptと別物だった。
    →これは多すぎるんじゃないかという問題
    Firefox、Adobeは賛成 　VS　ダグラス様、Google、MSは反対
    ECMA4のほとんどを削ってEMCA5が誕生した。

LLTiger報告 - gyuque

JS Modulatoreの話
    まだdevice要素がないので、送信しかできない

iPhoneをアレコレする - ku
    iEがない
    だけどデバッガーがないので、デバッグしにくい
    もっとデバッグを便利にしたい
    →Peekというアプリの誕生
    ソースコードの表示、インスペクト、

http://github.com/ku/peek

pixiv-tan - yksk
    pixiv wonderlandの解決(自分もpixivの中、直したいです…)
    prototype.jsとjQueryが混在してる
    →jQueryにまとめる
    まずグローバル関数の解決
    テストが余り書かれてない
    URL ディスパッチャー + LAB.js

processing.js  -John Resig
    exCanvasを使ったIE対応
    マウスストロークを追うコードが3行で書ける
    1.0ではWebGLもサポートしてる

JavaScriptをテストするときに考える10のこと - t_wada
    カスタムイベントでまとめることで、ロジックは同じものが使える
    ブラウザなくてもテスト可能にする
    テストの自動化
    まだテストの決定的なものがないなり

Chrome As A Server -kato kazuyoshi
    ChromeでMozRepl
    V8Debuggerを使ってる。
    Emacs上からブレークポイントをうてる

Node.jsにまつわる7つの誤解 - meso
    サーバーサイドJS
    イベント駆動I/Oのブロック問題はNode.js側が解決する。
    Node.jsは個人管理を脱却した

jQuery Mobile - John Resig
    いろんなモバイルデバイスをサポートする
    jQueryをモバイルに分けることはしたくなかったのでJQuery Coreを改良
        TestSwarmというツールを使用
    jQuery Mobieのフレームワークを作成
        UI、デバイスの幅に対応して"機能する"ものを作る

NetFront4のJavaScriptエンジンについて -ACESS

http://ja.wikipedia.org/wiki/NetFront_Browser

    レジスタベース(NO JIT)
    Inline Cache
    組み込みデバイスのスタックサイズの制限
    エラーしても強制的に落ちないように
    C言語で書かれていて、コンパイラによる違いを回避するため柔軟性持たせる
    SpiderMonkey &#60; NetFront 4(No JIT) &#60; TraceMonkey(JIT)
    時間かかかるしょりがあるとウォッチドックに引っかかるかもしれない
    → VM Executorを介して実行させる

Java MIP on HTML5 and Flash - yukoba
     JavaのクラスファイルからJavaScriptとFlash
    画面共有は命令だけを送って高速化

ECMA5の実装 - Constellation
    ECMA5の判断基準
    iv / lv5 (C++)
    仕様書に忠実なものを書きたい
    Shellを書いた
    ステートメントの区切りを管理して複数行継続が行える
    Spidermonkeyは脱ぐとスゴイ(JITなしで比較するとすごく早い)
</pre>

### Firefox 4 & Mobile

<pre>加藤 誠 (Mozilla Japan テクニカルアドバイザ)

Firefox4とスピード
起動時間
    汚いプロパティでボトルネックの調査(Talosテスト)
    メインスレッドのI/Oを減らす
     * 可能な限り非同期処理
     * Omni JAR
    StartUp Cache
        利用するJavaScriptファイルをJARにまとめる
WebGL
    OpenGLサポート
    Direct 3D 9
GPUアクセラレーション
    GPUアクセラレーションの利点は速度ではなく、CPUが空くことと電力効率の高さ
DirectWriteのサポート
    文字のジャギがきれいになる
    DirectWriteはα値が入ってるので少し薄く見える
Composition
    ハードウェアアクセラレーション
    Canvas
    CSS Transition
Video
    色空間変換(YUV-&#62;RGB)をGPUで行う
    動画はRGBではないので
    ブラウザにシェーダーが入ってる
JavaScript
    TraceMonkey
    jaegerMonkey
        x86プロセッサではSSE2サポートが必須
        Chrome上に対してはオフ
    Krakenというベンチマークで比較
Firefox 4 UI
    タブの位置
    Firefoxメニュー
    リロードボタンはsafari風
    ステータスバーが無くなってる。
    →リンクはアドレスバーに移動した
    →代わりにアドオンバーになった
Firefox Syncはデフォルトに
Panorama
Addon Manger
    アドオン管理画面の変更
Networking
    HTTP Strict Transport Secrity
XSS
    Content Security Policy
バリデーション
    ダウンロードしたコンテンツから悪意を防ぐ

モバイルFennec
    デスクトップと同じレンダリングエンジンを使用
    UIはUXのために変更してる。
    モバイルは画面サイズが違うのでPCそのままは残念なものになる
    FennecはChromeとContentでプロセス分離してる。
    →PCのFirefoxでもやるよ。
</pre>

### Firefox Panorama

<pre>mitcho (アーリーワイン・マイケル芳貴)

タブの管理は面倒
人は空間というメタファを記憶することができる
    どこに何があるかを空間で把握してる
AzaがいくつかのUI実験を繰り返して作ってみた。
タブをグループ管理、Undo、Redo
→何かの作業に集中できる

Panoramaの開発
    TabCandyアドオンの開発(jQuery使ってた)
    jQueryをアドオン専用のiQというものにフォーク
    TabViewという名前になって、Panoramaという名前に正式決定。
    iframeのtabview.htmlが本体
    つまりPanoramaの中身はDOM的なもの

iQ
    邪魔なものは排除、Firefox/Gecko向けに特化したライブラリ
タブの整理の仕方
    溝を作ってタブグループの吸着をよくする
    場所が無くなったら縮小
    ウィンドウを小さくするとグループを縮小して空間の間隔を維持する

Jetpack SDKからrquire("panorama")
    TabItemsとiQオブジェクトにアクセスできる
</pre>

### Jetpack に乗っかれないロートルのための、再起動いらずなアドオンの作り方 ～ Bootstrapped Add-on 詳説 ～

<pre>再起動なしのアドオン作成の作り方
Jetpack prototype
    再起動の仕組みはGreasemonkeyと似てる
Jetpack SDK
    ライブラリ+ビルト環境+テスト環境
    再起動なしの反映
        Bootstrapped ExtensionsというFirefox4からの仕組み
        3.6と4.xで再起動なしの仕組みが違う
Bootstrapped Extensionsの話
自分でinstallからuninstallまで管理しないといけない。
関数の書き換え系は危険なのでDOM 0なイベントの書き方はアウト。

loadOverlayはunloadできないのでJetpackでは使えない。
要素の変更は順番で駄目だったりすることがある。
=&#62;元に戻せるならOK、可逆的な変更のみ
「完全には元に戻せない時の不整合が蓄積」=&#62;これまで問題では無かったところが問題になることがある。
結論的にはJetpack SDKを使いましょう。
</pre>

### トークセッション: HTML5 時代の技術で Web プラットフォームはどう変わるのか

<pre>*矢倉 眞隆 (株式会社 ミツエーリンクス、W3C HTML5 Japanese Interest Group 議長)
*村岡 正和 (HTML5-WEST.jp 共同設立者)
*浅井 智也 (Mozilla Japan テクニカルマーケティング)

"HTML5時代の技術" =&#62; HTML5の関連の技術という意味ではない。

*矢倉
TPAC 2010(W3Cの総会)についての話
    CSS WG - レイアウトの話
    HTML WG  - アクセシビリティ
    WebApps WG - 多種多様活発
        DOM 、Eventとかいろいろ
        Web DOM Coreを現実的な仕様へ
    DAP WG

WebApps WGとDAP WGが面白い

*村岡
    関西で活動
</pre>

### 大ライトニングトーク

途中で電池切れました  
メモできてないけど、[ES Hamony の Proxy について #fxdevcon で LT してきました &#8211; mooz deceives you ][8]よかった。

<pre>*swdyh - クロスブラウザ拡張ライブラリ
     * Chrome
     * Firefox(Jetpack SDK)
     * Safari
     * Opera　それぞれに拡張機能ができた
    それぞれブラウザでやり方が異なる。
    →それを吸収するライブラリを作成する
    Extension.js
    ブラウザ拡張の互換性を吸収するライブラリ

*齋藤幸士 - モダンブラウザによるWebサービス拡張
    ソーシャルメディア時代
    Webサービスをもっとリッチにする(Twitter)
    オレオレ短縮URL

*kawanet - 3D JavaScript
    3次元の世界
    CSS3で実装
    トグルが実装されてた

*Takesako - Firefox HTML Parserの歴史
    ブラウザ毎に認識が違う
    IMGタグの認識で振り分け

*Gomita - Tab Scope 1.0 ~ CSS transition で魅せるXUL拡張機能 ~
    Firefox4向けにTab Scope拡張
...
</pre>

メモ感想

去年と比べると全くの聞いたことないようなものってはかなり少なくなった。  
どこかで一度聞いた、誰か言ってた気がするみたいな浅いレベルの情報があった感じが多かった。  
仕様書はあまり読んでなかったので、知らないことがあった。  
NetFront4のJavaScriptエンジンの話は何か新鮮だったので、もっといろんな話が聞けたら良かったと思う。  
John Resigさんに書いてる本がNinjaなのに表紙がSamuraiな件なのを聞くの忘れました。  
ライトニングトークが多すぎる気がするので、もっと他の事に機会(時間)を与えた方がいい気がした。

**はてなブックマーク &#8211; 特別でないただのブックマーク &#8211; fxdevcon**
:   [http://b.hatena.ne.jp/teramako/fxdevcon/][6]

**Togetter &#8211; 「Firefox Developers Conference 2010」**
:   [http://togetter.com/li/71239][4]

**Firefox Developers Conference 2010**
:   [http://mozilla.jp/events/2010/fxdevcon/][2]

 [1]: http://efcl.info/2009/1108/res1424/
 [2]: http://mozilla.jp/events/2010/fxdevcon/ "Firefox Developers Conference 2010"
 [3]: http://search.twitter.com/search?q=%23fxdevcon
 [4]: http://togetter.com/li/71239 "Togetter - 「Firefox Developers Conference 2010」"
 [5]: http://twitter.com/teramako
 [6]: http://b.hatena.ne.jp/teramako/fxdevcon/ "はてなブックマーク - 特別でないただのブックマーク - fxdevcon"
 [7]: http://www.youtube.com/results?search_query=fxdevcon2010&search=tag "YouTube - fxdevcon2010"
 [8]: http://d.hatena.ne.jp/mooz/20101121/p1