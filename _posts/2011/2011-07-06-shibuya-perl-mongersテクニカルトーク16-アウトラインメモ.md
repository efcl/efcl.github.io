---
title: 'Shibuya Perl Mongersテクニカルトーク#16 アウトラインメモ'
author: azu
layout: post
permalink: /2011/0706/res2921/
dsq_thread_id:
  - 351090258
SBM_count:
  - '00006<>1355368367<>6<>0<>0<>0<>0'
categories:
  - イベント
tags:
  - Perl
  - イベント
  - 正規表現
---
[Shibuya Perl Mongersテクニカルトーク#16 : ATND][1]に参加したので、メモっていた内容です。(正確性は保証されません)

**夏の正規表現祭り**

*   18:45 – 開会宣言（会場からの諸注意） 

#### 18:50 – Dan the (Irr|R)egular Expressionist – [@dankogai][2] 

*   メールアドレスの検証 
    *   狭義のメールアドレスは正規表現でマッチできる事になっている 
*   IPv4アドレスの検証 
*   use Regexp::Commonにこういうよくある感じのが簡単に使えるようになっている。 
*   コストが高い正規表現 
    *   手動でやるのもコストが高い(人的に) 
    *   use Regexp::Assemnle というものがある 
        *   マッチした正規表現を返してくれる -> Perl5.10のやつはここまではできない 
    *   実はPerl5.10以降はTRIE Optimizationはしてくれる 
*   s//42/sexsexsex&#8230; 
    *   eだけは重ねると意味がある e 修飾子 
*   正規表現はPerlに通じる 
    *   JavaScriptの正規表現は弱い 

#### 19:10 – スペシャルゲスト「正規表現メモ」 – [木村浩一][3] 

*   マイナーな正規表現演算子 
    *   [[:<:]] と [[:>:]] 
        *   tclの正規表現 
    *   [= =] 
        *   [=e=] はeにアクセントキーがついたものにもマッチする 
        *   e, é, ë 
    *   [. .] 
        *   アルファベットで複数文字が1文字と見なせるための正規表現 
        *   [.hoge.] <- 一文字と見なしてくれる 
    *   JPerl 5.6 
        *   Javaで書かれてます! 
        *   5.6で正規表現に戻り読みというのが入った 
            *   固定長の問題 
    *   POSIXの正規表現の分類 
        *   basic 
        *   extended 
        *   Perl拡張 
    *   文字クラスとlocaleの悩ましい話 
        *   []の中で-範囲指定を使って書くときの問題 
        *   [a-Z] とか言語によって違うことが 

#### 19:40 – Hello, re::engine! – [@\_\_gfx\_\_][4]

*   Perl5でPerｌのコアと正規表現エンジンを独立させた 
    *   コードを修正しなくても正規表現エンジンを変えられる 
*   いろいろな正規表現エンジン 

#### 19:55 – 正規表現の限界 – [@sinya8282][5]

*   正規表現で何でも表したい 
*   正規表現の演算 
    *   基本 : 連接、選択、閉包 
    *   糖衣構文 : .^$[]{}()?+ 
*   マッチしない正規表現 : 否定表現 
*   正規表現の否定 = 正規表現からDFAを作る事 
    *   DFAの受理状態と被受理状態 
    *   DFAになれば否定は簡単 
*   任意の文字列を対象にした否定ツール 
*   正規表現で表現できないもの = 自由文法 
    *   括弧の対応、四則演算 
*   Perlなら再帰のRがある 
*   四則演算と深さを指定したもの 
*   四則演算と長さを指定したもの 
    *   それぞれできる 

#### Lightning Talks

*   20:30 – 僕の考えた世界最強の正規表現エンジン(速けりゃイイじゃん?) – [@sinya8282][5] 
    *   実装した正規表現エンジンの紹介 
    *   regen 
        *   [sinya8282/Regen &#8211; GitHub][6] 
        *   <http://code.google.com/p/regen/> 
    *   速度の追求 
        *   動的なコード生成 
        *   並列DFAマッチング 
        *   機械語レベルの最適化 
*   20:35 – Plaggerで覚えたPerlの正規表現 – [@yusukebe][7] 
    *   正規表現を覚えた道のり 
    *   Filter::EntryFullText を正規表現で 
        *   フェッチして正規表現でbodyを取る 
    *   エロYAML群 
    *   正規表現の最初はPlaggerで 
    *   既存プロダクトをいじって学ぶ 
*   20:40 – Regexp::Assembleで正規表現を作るとか – [@yappo][8] 
    *   住所のマッチを正規表現 
        *   郵便局のデータを元にした 
    *   Regexp::Trie 
    *   Regexp::Assemble <- こっちがオススメ 
*   20:45 – 再帰的正規表現 – [@TAKESAKO][9] 
    *   (?R) (?0) (?1) 
    *   JSONとXSS 
    *   JSON valueの定義 
        *   JSONのバリデート 
    *   正規表現でJSONを表現 
    *   (?R) 
        *   JSONのバリデーションに使える 
*   20:50 – 僕と契約して、自己言及コードになってよ！ – [@sugyan][10] 
    *   "Quine ruBy" 
    *   Perl版、JavaScript版を作成 
    *   Quine(クワイン) 
        *   自身のソースコードを出力 
*   20:55 – 色々なものを正規に表現してみよう(仮) – [@nipotan][11] 
    *   電話番号の正規表現 
        *   総務省発表データから作った Number::Phone::JPというものがある 
    *   郵便番号の正規表現 
        *   よくある感じのは無駄なマッチが多い 
        *   無駄なものを省いたNumber::ZipCode::JP 
        *   DBに若干勝つ速度 

**感想**

Perlはほとんど触った事なかったけど参加した。そういえば、数少ないPerl経験も正規表現書くだけだったなー   
↑正規↓表現は奥が深い…   
就職活動してから参加したのでスーツのままでした。。

 [1]: http://atnd.org/events/17082
 [2]: https://twitter.com/#%21/dankogai
 [3]: http://www.kt.rim.or.jp/%7Ekbk/zakkicho/
 [4]: https://twitter.com/#%21/__gfx__
 [5]: https://twitter.com/#%21/sinya8282
 [6]: https://github.com/sinya8282/Regen
 [7]: https://twitter.com/#%21/yusukebe
 [8]: https://twitter.com/#%21/yappo
 [9]: https://twitter.com/#%21/TAKESAKO
 [10]: https://twitter.com/#%21/sugyan
 [11]: https://twitter.com/#%21/nipotan