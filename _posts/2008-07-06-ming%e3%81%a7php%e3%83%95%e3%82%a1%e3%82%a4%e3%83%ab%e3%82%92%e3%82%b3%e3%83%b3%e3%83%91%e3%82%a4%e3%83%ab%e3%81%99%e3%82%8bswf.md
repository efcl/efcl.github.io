---
title: 'mingでphpファイルをコンパイルする[swf]'
author: azu
layout: post
permalink: /2008/0706/res235/
SBM_count:
  - '00001<>1355333384<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 300801824
categories:
  - インストール設定
tags:
  - flash
  - ming
  - php
  - 設定
---
phpにはphp_ming.dllを使ってphpソースからswfなどのflashを作成することができます。  
今回は別に積極的な開発をするわけではなくて、配布されているソースをちょっこといじるためだけにいろいろ整えるのはめんどくさいので、mingを簡単に扱うメモ。

1.  [PHP: Downloads][1]から最新版zipをダウンロードする(自分の時は[PHP 5.2.6 zip package][2])
2.  [zlib1.dll][3]をダウンロードする。(どこに最新版があるのかよく分からない)
3.  [ming][4]をダウンロードする。

ダウンロードするのはこれだけで十分だと思うので、PHPのzipを解凍してわかりやすい場所に移す。(C:phpに置いたとする)  
<span style="color: #ff0000;">コメント欄で教えていただいた方法。コメント欄参照</span>

<div class="quote">
  <blockquote title="mingでphpファイルをコンパイルする[swf] | Web scratch">
    <p>
      実は必要なdllは初めからzipファイルの中に入っているようです。解凍したphpのフォルダの中にある（今回で言うとphp-5.2.6-Win32でしょうか）extというフォルダです。<br /> ですので、php.ini中のextension_dir項目をextension_dir = “./ext”としてやることで、上記作業がいらないっぽいですねｂ
    </p>
    
    <p>
      それと、mb_internal_encodingのエラーについてですが、それはphp.iniのextension=php_mbstring.dll（デフォルトでは;extension=php_ming.dll同様にコメントアウト）を有効にしてやることで動くみたいです。
    </p>
  </blockquote>
</div>

これに少し追加します。  
このままではmingのバージョンが古いみたいなので、最初に落とし置いたphp_ming.dllをextの中身に上書きしましょう。  
他の3つ（libming-0.dll、libpng12.dll、libungif4.dll）とzlib1.dllはphp.exeと同じフォルダに置かないといけないみたいです。  
これでflash8のバージョンまでコンパイルできるようになりました。  
<span style="text-decoration: line-through;"><br /> </span>

**もう一つの方法**

要は置き場所が違うだけなので、mingのみを扱う場合はこちらの方が楽な気がする。

php.exeと同じフォルダにphp_ming.dll,libming-0.dll、libpng12.dll、libungif4.dllの四つとzlib1.dllを入れる。

**次はphp.ini設定**  
そしてphp.exeと同じディレクトリにphp.ini-recommendedというのがあるのでphp.iniとリネームして、テキストエディターで  
;extension=php_ming.dll  
を  
extension=php_ming.dll  
とセミコロンを外す。こうすればmingが実行できるようになる。  
;extension=php_mbstring.dll のコメントアウトを外すことで  
mb\_internal\_encoding()が使えるようになります。

mingの実行方法はコマンドプロンプトを開いて、ソースファイル.phpがある場所まで移動してから  
C:pathsource> C:phpphp.exe flvplayer_wrapper.php  
という風に実行してエラーが出なかったらファイルが出力できる。

こっからはflvplayer_wrapperのはなし。  
flvplayer\_wrapperをコマンドプロンプトから出力する場合はflvplayer\_wrapper.phpの  
$movie->output();をコメントアウトして  
//$movie->output();  
とする。

<span style="text-decoration: line-through;"></span>

まとめると

1.  最新mingのdllなどを入れる。
2.  php.iniにリネームして設定
3.  使用するディレクトリを指定する。(デフォはphp.exeと同じフォルダ)
4.  ;extension=php_ming.dll  
    ;extension=php_mbstring.dll  
    のコメントアウトを外す
5.  php.exe flvplayer_wrapper.php みたいな感じでコマンドプロンプトでコンパイル。

環境:Vista premium  
参考[[nicolist.net] flvplayer_wrappe][5]

コメントに感謝。

 [1]: http://www.php.net/downloads.php#v5
 [2]: http://www.php.net/get/php-5.2.6-Win32.zip/from/a/mirror
 [3]: http://www.driverskit.com/dll/zlib1.dll/4098.html
 [4]: http://skeishi.hp.infoseek.co.jp/Flash/
 [5]: http://nicolist.net/nicocache_nl/flvplayer_wrapper.html