---
title: Firefoxでメモリ、保存、flashが重いのを解決？
author: azu
layout: post
permalink: /2008/0127/res35/
SBM_count:
  - '00005<>1355444038<>1<>2<>1<>1<>0'
dsq_thread_id:
  - 300801319
categories:
  - Firefox
tags:
  - Firefox
  - php
  - アドオン
  - ソフトウェア
---
[Firefoxの嫌なところ &#8211; 将来が不安][1]

*   使ってるとメモリを食いまくって (それが理由か知らないが) 処理が酷く重くなる (要・定期的に<a href="http://d.hatena.ne.jp/keyword/%ba%c6%b5%af%c6%b0" class="keyword">再起動</a>)
*   画像の保存に妙に時間が掛かる（<a href="http://d.hatena.ne.jp/keyword/IE" class="keyword">IE</a>ならサクサクなのに何故？）
*   <a href="http://d.hatena.ne.jp/keyword/Flash" class="keyword">Flash</a>の実行（イベント発生？）が重い気がする

というのを見て何となく解決策っぽいものを書いてみる。

*   ** 使ってるとメモリを食いまくって処理が酷く重くなる**

Firefoxはデフォルトでは放置しておくとどんどんメモリを食う仕組みになっているので仕様と言えば仕様です。  
[FirefoxやThunderbirdのメモリ消費量を劇的に減らす方法 &#8211; GIGAZINE][2]  
上のような操作をすることで、最小化するときにFirefoxのメモリを解放する設定ができます。  
最大化するときにもっさりすることはあるかも。（Windows でのみ有効。）  
また、Firefoxでは何十個のタブを同時に開くことは想定されていないので、20とかそれ以上開く人は素直にOperaを試してみてください。  
自分はそこまでメモリは気にしないというか、アドオンたっぷりなので大量消費。

*   ** 保存時にやたらと重い**

** ダウンロード履歴を記録しないようにする。**ダウンロード履歴はチェック時に大量のメモリを消費するので、使わない。履歴ファイ<var></var>を消去したら(ダウンロード→履歴の削除)、今後は記録されないように **<var>ツール → オプション → プライバシー → ダウンロードしたファイルを記録する</var>のチェックを外しておく**。  
またダウンロードの時にウイルス対策ソフトがチェックしている可能性もあるので、一概にはFirefoxが原因でないかも。

また、画像の保存だけに限定するならアドオンでいいものがありそうなので、探してみるといいかも。

*   **<a href="http://d.hatena.ne.jp/keyword/Flash" class="keyword">Flash</a>の実行（イベント発生？）が重い気がする**

これは何ともいえませんが、Flashなどのプラグインは結構バージョンによって動作が  
悪くなったりよかったりします。  
できるだけ最新のバージョンに保つのがいいかもしれませんが、環境によって左右される気がするので、自分に適切なのを  
見つけられると良い。  
[cl.pocari.org &#8211; Firefox の Flash Player をアップデートする方法][3]

Flash関係の問題はよく見かけるので解決が少しめんどくさそうです。  
[Mozilla Japan ナレッジベース &#8211; Flash Player の更新に関する注意喚起][4]

とりあえず思い当たる解決策を書いてみました。  
Firefoxというかソフト全般に当てはまる事ですが、プロファイルが壊れている場合は意味がないので、  
上の方法や検索してきた方法で全くだめな場合はバックアップを取ってから、

> [Firefox Hacks：Firefox拡張：FEBE――Firefox環境のバックアップとリストア &#8211; ITmedia エンタープライズ][5]

[ プロファイル][6]を新規作成してためしてみるといいかもしれません。  
自分の経験ではprefs.jsが壊れる事が多い気がするのでその辺のチェックをするといいかもしれないです。

 [1]: http://d.hatena.ne.jp/ryocotan/20080123/p2
 [2]: http://gigazine.net/index.php?/news/comments/20060415_firefoxthunderbird/
 [3]: http://cl.pocari.org/2006-09-13-1.html
 [4]: http://www.mozilla-japan.org/kb/solution/2092
 [5]: http://www.itmedia.co.jp/enterprise/articles/0708/14/news006.html
 [6]: http://www.mozilla-japan.org/support/firefox/profile