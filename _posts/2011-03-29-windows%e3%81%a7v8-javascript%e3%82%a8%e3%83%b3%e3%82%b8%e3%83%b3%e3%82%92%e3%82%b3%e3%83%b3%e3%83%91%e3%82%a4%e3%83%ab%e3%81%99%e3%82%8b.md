---
title: WindowsでV8 JavaScriptエンジンをコンパイルする
author: azu
layout: post
permalink: /2011/0329/res2449/
SBM_count:
  - '00009<>1355442669<>9<>0<>0<>0<>0'
dsq_thread_id:
  - 301323179
categories:
  - javascript
tags:
  - Git
  - javascript
  - python
  - vista
  - Windows
  - ソフトウェア
---
Windows Vistaで[V8][1]を使いたかったのでビルドしたときのメモ

準備編

1.  [Python][2]をインストール([ActivePython][3]でもいいけど)
2.  [SCons][4]をインストール(PythonのMakeみたいなものらしい)
3.  [Visual C++ 2010 Express][5]をインストール(本当はSConsだけでもいいけど、必要な[Windows SDK][6]が内蔵されてるので楽)
4.  git か svnがあるとV8のダウンロードが楽

実践編  
(X / _ / X <は$みたいなプロンプトです)  
バージョンの確認コマンドも打ってますが、[How to Download and Build V8 &#8211; V8 JavaScript Engine &#8211; Google Code][7]でソフトウェアの必要なバージョンが載っています。

多くの例ではsvnで

<pre>svn checkout http://v8.googlecode.com/svn/trunk/ v8</pre>

としてv8をダウンロードしているみたいですが、githubに公式ミラーがあるので今回はそれを利用しました。

*   [v8/v8 &#8211; GitHub][8]

<pre>X / _ / X &#60; git clone git://github.com/v8/v8.git v8
Initialized empty Git repository in D:/Software/v8/.git/
remote: Counting objects: 53075, done.
remote: Compressing objects: 100% (7672/7672), done.
remote: Total 53075 (delta 46205), reused 51859 (delta 45179)
Receiving objects: 100% (53075/53075), 25.18 MiB | 749 KiB/s, done.
Resolving deltas: 100% (46205/46205), done.
Checking out files: 100% (1426/1426), done.
X / _ / X &#60; python -V
Python 2.6.4
X / _ / X &#60; scons --version
SCons by Steven Knight et al.:
 engine: v2.0.1.r5134, 2010/08/16 23:02:40, by bdeegan on cooldog
Copyright (c) 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010 The SCons Foundation</pre>

ここまでで準備は終わり、次はビルドとテスト  
sconsの引数はよく分からなかったので[Build][9]を見てscons d8としました。

<pre>X / _ / X &#60; cd v8
X / _ / X &#60; scons d8
#ビルド
X / _ / X &#60; toolstest.py
#テスト
&#91;13:26|% 100|+ 4599|-   3&#93;: Done
</pre>

特に環境パスの引数なしでも通ったのでシンプルにしていますが、手動でパスを通す場合は大変なので&#8221;C:Program FilesMicrosoft Visual Studio 10.0VCvcvarsall.bat&#8221;などのbatファイルを使うとよいかもしれないです。

*   [v8をビルドしてみました &#8211; とりあえずメモメモ。][10]
*   [Compiling v8 on Windows 7][11]
*   [BuildingOnWindows &#8211; v8 &#8211; Detailed instructions for building V8 on Windows. &#8211; V8 JavaScript Engine &#8211; Google Project Hosting][12]

最後にベンチマークを取ってみて終了

<pre>X / _ / X &#60; cd benchmarks
X / _ / X &#60; ../d8 run.js
Richards: 7311
DeltaBlue: 9098
Crypto: 8762
RayTrace: 6707
EarleyBoyer: 12664
RegExp: 1440
Splay: 2193
----
Score (version 6): 5521</pre>

これで、Windows上で使えるV8(d8)のバイナリ作成ができたので終わり  
毎回d8.exeまでのパスを入力するのは大変なので、バイナリの場所まで[Redmond Path][13]を使ってパスを通しています。

 [1]: http://code.google.com/p/v8/
 [2]: http://www.python.org/
 [3]: http://www.activestate.com/activepython
 [4]: http://www.scons.org/
 [5]: https://www.microsoft.com/express/Downloads/#2010-Visual-CPP
 [6]: http://msdn.microsoft.com/ja-jp/windows/bb980924.aspx
 [7]: http://code.google.com/intl/ja/apis/v8/build.html
 [8]: https://github.com/v8/v8
 [9]: http://code.google.com/intl/ja/apis/v8/build.html#build
 [10]: http://d.hatena.ne.jp/hiront_at_nagoya/20080913/1221303731
 [11]: http://evadeflow.com/2011/03/compiling-v8-on-windows-7/
 [12]: http://code.google.com/p/v8/wiki/BuildingOnWindows
 [13]: http://www.forest.impress.co.jp/lib/sys/wincust/registry/redmondpath.html