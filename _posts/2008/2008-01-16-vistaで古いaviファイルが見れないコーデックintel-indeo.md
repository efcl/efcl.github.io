---
title: Vistaで古いaviファイルが見れない(コーデック:Intel Indeo)
author: azu
layout: post
permalink: /2008/0116/res17/
SBM_count:
  - '00000<>1355432264<>0<>0<>0<>0<>0'
dsq_thread_id:
  - 300801259
categories:
  - vista
tags:
  - vista
  - コーデック
---
Vistaで少し古めのaviファイルを再生したときに音声のみだけ再生されたので 、  
何かコーデックが不足してるんだろなと思い調べてみたら、Intel Indeoというコーデックが不足しているとのこと。

しかしVistaで標準で入ってるはずなので、デフォルトでは機能しないように設定されているみたい。  
なので、それをONにする必要があるみたいです。  
コマンドプロンプトで管理者権限でregsvr32 ir50_32.dllとすればいい。  
バッチファイルを書いてみた。（というかそのままですね）

[regsvr32ir50_32dll.bat  
][1]

これを保存して、右クリックで管理者権限で実行すれば多分 成功しましたというメッセージがでれば大丈夫かな。

多分2003年ぐらいまでPCゲーム(サウンドノベル)何かはこのコーデックを使ってるものがあると思う。  
minori作品のwindとかも使ってる気がした。

 [1]: https://efcl.info/wp-content/uploads/regsvr32ir50_32dll.bat "regsvr32ir50_32dll.bat"
