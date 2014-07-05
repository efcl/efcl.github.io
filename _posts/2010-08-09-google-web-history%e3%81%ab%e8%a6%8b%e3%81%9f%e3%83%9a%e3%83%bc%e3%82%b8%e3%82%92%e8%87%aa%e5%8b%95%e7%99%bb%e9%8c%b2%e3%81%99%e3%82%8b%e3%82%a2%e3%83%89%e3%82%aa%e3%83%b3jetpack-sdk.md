---
title: Google Web Historyに見たページを自動記録するアドオン(Jetpack SDK)
author: azu
layout: post
permalink: /2010/0809/res1872/
SBM_count:
  - '00009<>1355412003<>8<>0<>1<>0<>0'
dsq_thread_id:
  - 300802688
categories:
  - Jetpack
  - アドオン
tags:
  - google
  - Jetpack
  - Windows
  - アドオン
---
Googleには[Google &#8211; ウェブ履歴][1]というものがあり、検索してどのページを訪ねたかなどが記録されています。  
またその記録は検索ページで既読リンクの色にするなどの判定にも使われています。  
Google検索から訪ねたサイト以外のURLもウェブ履歴に登録するFirefox拡張機能を作成してみました。  
既に

*   [Googleウェブ履歴を残すGreasemonkeyスクリプト][2]
*   [Opera で Google Web History を使えるようにする UserJS &#8211; mallowlabsの備忘録][3]

などGreasemonkeyやTomblooパッチなど代わりになる手段は山ほどある気がしますが、**Jetpack SDK**を使いたかったのと、意外にもFirefoxアドオンとして同じ役割するものが見つからなかったので作ってみました。

他のスクリプトとの違いは大して無いと思いますが、できるだけ無駄な送信を控えるようにしています。

*   最近訪れたサイトは重複送信しない(100件ぐらいでクリアされます)
*   [https://はホストのみを送信][4]
*   ローカルやIPアドレスベースのURLの場合は送らない

ダウンロードはAMOからできるようにしてあります。  
Firefoxアドオンのxpiを簡単における場所が無かったので、AMOに登録しておいてあります。

*   [Google WebHistory Updater :: Add-ons for Firefox][5]

Jetpack SDKでコンパイル?前のソースコードはこちらに

*   [Google-webhistory-updater at master from azu&#8217;s JetpackSDK &#8211; GitHub][6]

### Jetpack SDKで何か作るには

Jetpack SDKで既に[3つ][7]ほどアドオンを作成していますが、0.5だとJetpack prototypeとできることはそこまで変わってないです。(prototypeのギャラリー無くなったみたいですね。8個ぐらい作った気がする)  
Jetpack SDKで作る上で参考にしたのは

*   [SCRAPBLOG : Jetpack][8] 基礎的なAPIの使い方
*   [Jetpack SDK &#8211; あすかぜ・ねっと][9] とても参考になる
*   [Jetpack SDK Docs][10]

最後のJetpack SDK Docsはcfx docsで開いて、jetpack-coreあたりに現在使えるAPIが載っているのでそれを見て使い方を調べるとAPIの使い方は分かる感じ。(Jetpack prototypeの頃よりはドキュメントにサンプルもあってマシになりました)  
一番ハマるところはcfxとかコマンドでエラーがでるとかその辺だった気がする。  
環境はWindows Vistaです。  
cfx testallすら通らない場合は-aとか-bオプションを指定してみるといい。 [Jetpack SDK 0.4でcfx testallを成功させる方法 (windows) &#8211; Cherenkovの暗中模索にっき][11]  
毎回オプションを付けるのが面倒になったら[local.json][12]を作りデフォルト値を決めてみましょう。  
自分はjetpack用のプロファイルを作りそれを指定してます

<pre>{
  "configs": {
    "default": &#91;
      "-a", "firefox",
      "-b", "C:\Program Files\Mozilla Firefox\firefox.exe",
      "-P", "%appdata%\Mozilla\Firefox\Profiles\h545wqkn.jetpack"
    &#93;,
    "ff37": &#91;
      "-a", "firefox",
      "-b", "C:\Program Files\Mozilla Firefox 3.7\firefox.exe",
      "-P", "C:\Users\admin\AppData\Roaming\Mozilla\Firefox\Profiles\testuser"
    &#93;
  }
}</pre>

package.jsonを作り、libフォルダを作りmain.jsを書いて → さあcfx runで起動しようとしたら、まずはpackage.json内にidが自動生成されます。そしてもう一度cfx runすると下のようなエラーが出てくることがあります。

<pre>Traceback (most recent call last):
  File "D:jetpackbincfx", line 6, in 
    cuddlefish.run()
  File "D:jetpackpython-libcuddlefish__init__.py", line 475, in run
    include_dep_tests=options.dep_tests
  File "D:jetpackpython-libcuddlefishpackaging.py", line 267, in generate_bu
ild_for_target
    add_dep_to_build(dep)
  File "D:jetpackpython-libcuddlefishpackaging.py", line 254, in add_dep_to_
build
    add_section_to_build(dep_cfg, "lib", is_code=True)
  File "D:jetpackpython-libcuddlefishpackaging.py", line 232, in add_section
_to_build
    validate_resource_hostname(name)
  File "D:jetpackpython-libcuddlefishpackaging.py", line 65, in validate_res
ource_hostname
    raise ValueError('invalid resource hostname: %s' % name)
ValueError: invalid resource hostname: jid0-英数字-フォルダ名-lib</pre>

これはpackage.jsonのnameに**大文字**やマルチバイト文字やスペースなどが含まれていると出てきます。(んなの分かるか)  
なので小文字英数とハイホンあたりでnameを決めておきましょう。

console.logはコマンドプロンプトの方にでてくるので、それを使って(他に何かあるのかなー)デバッグしながらmain.jsなどを完成させて、xpiをcfx xpiコマンドではき出せば完成です。  
まだ設定画面やパネルなどのGUIが簡単に使えなかったりしますが、用途が合えば簡単にアドオンを作成できるのでなかなか面白いです。

**Google WebHistory Updater :: Add-ons for Firefox**
:   [https://addons.mozilla.org/ja/firefox/addon/213956/][13]

 [1]: https://www.google.com/history/
 [2]: http://d.hatena.ne.jp/brazil/20080514/1210767708
 [3]: http://d.hatena.ne.jp/mallowlabs/20080104/1199461216
 [4]: http://outgoing.mozilla.org/v1/62ec45e9d2205ac4d757b771a01ed16cc048d97e/https%3A//
 [5]: https://addons.mozilla.org/ja/firefox/addon/213956/
 [6]: http://github.com/azu/JetpackSDK/tree/master/Google-webhistory-updater/
 [7]: https://addons.mozilla.org/ja/firefox/user/2222641/
 [8]: http://www.xuldev.org/blog/?cat=42
 [9]: http://www.asukaze.net/etc/jetpack/
 [10]: https://jetpack.mozillalabs.com/sdk/latest/docs/#guide/getting-started
 [11]: http://d.hatena.ne.jp/Cherenkov/20100603/p1
 [12]: http://www.xuldev.org/blog/?p=697
 [13]: https://addons.mozilla.org/ja/firefox/addon/213956/ "Google WebHistory Updater :: Add-ons for Firefox"