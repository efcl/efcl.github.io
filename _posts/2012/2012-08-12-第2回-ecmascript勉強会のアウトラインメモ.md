---
title: 第2回 ECMAScript勉強会のアウトラインメモ
author: azu
layout: post
permalink: /2012/0812/res3075/
dsq_thread_id:
  - 802431872
SBM_count:
  - '00010<>1355446897<>9<>0<>1<>0<>0'
categories:
  - javascript
  - イベント
tags:
  - ECMAScript
  - javascript
  - イベント
---
<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="第2回 ECMAScript勉強会" href="http://atnd.org/events/30676">第2回 ECMAScript勉強会</a>に参加してきたのでその時のメモ。
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  (あまり正確には取れてないので、各スライドを参照して下さい。)
</p>

<h1 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 24px; border-top-style: solid; border-top-color: #aaaaaa;">
  第2回 ECMAScript勉強会
</h1>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    主催 : rika-t
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 21px; border-top-style: solid; border-top-color: #e0e0e0;">
  自己紹介
</h2>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 21px; border-top-style: solid; border-top-color: #e0e0e0;">
  Specs Updates &#8211; rika-t
</h2>

<blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
  <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
    スライド : <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="ECMAScript study #2 ES.next Updates" href="http://www.slideshare.net/agigigigi/ecmascript-study-2-esnext-updates">ECMAScript study #2 ES.next Updates</a>
  </p>
</blockquote>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  前回からの差分
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Rev7 <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        Arrow function追加
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        ES.next Library Extension関係
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        Numberなどは結構無駄にはいってる <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
          <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
            機械語命令などにもあったりするので、ネイティブで実装した方がいい関数もあるという要望等
          </li>
          <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
            Audio関係に使う関数等
          </li>
        </ul>
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Rev8
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Rev9
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  Arrow function
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    無名関数の代替
  </li>
</ul>

<blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
  <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
    (x) => x * x
  </p>
</blockquote>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    var that = thisの不要化
  </li>
</ul>

<blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
  <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
    list.forEach((item) => this.hoge(item));
  </p>
</blockquote>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    thisが固定化&newができないようになる(引数にthisを渡す必要がある)
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  例:
</p>

<pre style="margin-top: 10px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; padding-top: 15px; padding-right: 20px; padding-bottom: 15px; padding-left: 20px; background-color: rgba(0, 0, 0, 0.0195313); border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #cccccc; border-top-width: 1px; border-top-style: solid; border-top-color: #cccccc; clear: both; color: black; font: normal normal normal 100%/1.25 Monaco, 'Andale Mono', monospace; position: relative; white-space: pre-wrap; word-wrap: break-word;"><code style="font-size: 12px; color: #444444; padding: 0px; margin: 0px; border: 1px none #dedede;">var that = this;
(that, x) =&gt; { that.x = x };// thisを渡す
</code></pre>

<blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
  <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
    (this, x) => { this.x = x } // これだとエラー
  </p>
</blockquote>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  thisは<a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="Contextual Keyword" href="http://constellation.github.com/slides/contents/20120407/presentation.html#slide12">Contextual Keyword</a>ではなく、<a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="Keyword" href="http://d.hatena.ne.jp/uupaa/20100325/1269459024">Keyword</a>なので、エラーになる。
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  Rev7 で概念を新規追加
</h3>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  Envirinment Record
</h4>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  プログラムのコンテキストを覚えていく概念。 言語を実装するのに必要な感じの内容
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Envirinment Recordとは
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Global Env Record <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        これもブロックスコープがあるため概念を追加された
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        ブロックスコープができたのでグローバルを持つものが必要に
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Declarative Env Record <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        各スコープとオブジェクトの状態を保持する内部的な領域
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        スコープと紐付く記憶領域
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Object Environment Record <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        binding
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Method Env Record <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        super を使えるようにするために追加された。
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        そのスコープの中でつかわれるthisの値が格納されている
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        今までの関数のスコープがMethod Env Recordにあたる
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        ES6ではletなどでブロックスコープが入ったため、関数スコープ内に複数のスコープがあるので定義される
      </li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  Code Realm
</h3>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  評価される前にRealmに関連付けられる。
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  Realmが保持する内容
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    [[this]]
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    [[Global Env]]
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    等
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  関数の [[Call]] では、関数実行のコンテキストを呼び出すときにすりかえためにつかわれる。 realmの中を変える事でthisのコンテキストがかわってるのを説明できる概念。
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  Realmは、その関数がどのコンテキストで実行されてるのかを表現するために使われたりする感じ
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  TC-39
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ECMAのTechnical Review
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    class
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    “module&#8221;が予約語に無いのはbreak the webにならないように慎重に設計されてるため
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  Rev8
</h3>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  Non-ECMAScript Functions
</h4>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ES以外の言語を絡めた処理
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    may…なので今後存在するのか疑問
  </li>
</ul>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  Realmの名前
</h4>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Realmの名前は将来的に変更されるかも
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  Rev9
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ユニコードサポート
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    サロゲートペアも必須
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Regular Expression Literalsの項目ついか
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Quasi Literals
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    名前変更 <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        native object -> ordinary object
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        host object -> exotic object
      </li>
    </ul>
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 21px; border-top-style: solid; border-top-color: #e0e0e0;">
  ES.next &#8211; class, arrow, quasi etc. &#8211; Constellation
</h2>

<blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
  <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
    スライド <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="ES.next - class, arrow, quasi etc." href="http://constellation.github.com/slides/contents/20120812/presentation.html#slide1">ES.next &#8211; class, arrow, quasi etc.</a>
  </p>
</blockquote>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  classの仕様について理解する(Rev9に基づく)
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  Class
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    今までのWebを破壊する訳ではなく、
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    シンタックスシュガー的な物を追加
  </li>
</ul>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  super
</h4>

<pre style="margin-top: 10px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; padding-top: 15px; padding-right: 20px; padding-bottom: 15px; padding-left: 20px; background-color: rgba(0, 0, 0, 0.0195313); border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #cccccc; border-top-width: 1px; border-top-style: solid; border-top-color: #cccccc; clear: both; color: black; font: normal normal normal 100%/1.25 Monaco, 'Andale Mono', monospace; position: relative; white-space: pre-wrap; word-wrap: break-word;"><code style="font-size: 12px; color: #444444; padding: 0px; margin: 0px; border: 1px none #dedede;">class Derived extends Base {
    constructor(){ }
    sayHello(){
        super();
    }
}
</code></pre>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Derived <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        ただの関数
      </li>
    </ul>
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  今までと異なる所
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Method(sayHello)に情報が追加される <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        [[Home]]
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        [[MedhodName]]
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        これを元にsuperとかを解決する
      </li>
    </ul>
  </li>
</ul>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  Method Enviroment
</h4>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  メソッドとスコープとかを管理する記憶領域
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  呼び出し側が[[Home]]と[[MethodName]]を検知して、この２つをもってる場合、環境自体が呼び出してる情報と何を呼び出してるのか(sayHelloとか)を持つようになる。
</p>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  Reference &#8211; internal type
</h4>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  object.property()
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  この時のbase,nameはそれぞれ
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    base == object
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    name == property
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  propertyを呼び出すときに、base(objectがはいってる)をthisに設定してthisを解決するようになる。
</p>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  superの解決
</h4>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  baseとnameを環境から持ってくる。 thisValueがその時のthisで、別に保持しておく。(original this)
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  superを呼ぶときは、baseにsuperのenvを設定して、nameのメソッドをよぶ。(thisValueはちゃんとその時のthisを別に持ってる)
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  ES5ではsuperは自分で定義する必要があったけど、ES6では実行環境側がsuperを持ってくれてる。
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  要はClass継承の仕組みがES6では入ってる。
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  Arrow Function
</h3>

<pre style="margin-top: 10px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; padding-top: 15px; padding-right: 20px; padding-bottom: 15px; padding-left: 20px; background-color: rgba(0, 0, 0, 0.0195313); border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #cccccc; border-top-width: 1px; border-top-style: solid; border-top-color: #cccccc; clear: both; color: black; font: normal normal normal 100%/1.25 Monaco, 'Andale Mono', monospace; position: relative; white-space: pre-wrap; word-wrap: break-word;"><code style="font-size: 12px; color: #444444; padding: 0px; margin: 0px; border: 1px none #dedede;">class Dog {
  bow(n) {
    console.log(n + ' bow!');
  }

  say() {
    // `this` is Dog instance
    // arrow can take expression as body
    [1, 2, 3, 4].forEach(e =&gt; this.bow(e));

    // this also works fine
    () =&gt; {
      this.bow(100);
    };
  }
}
</code></pre>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    var that = this;等を書かなくてもthisが固定できる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    即時実行でthisが変わらないようにつくられてる
  </li>
</ul>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  Declarative & Method Environment
</h4>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    thisが変わらない仕組み
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    仕様の説明
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  Declarative Environment
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    thisの値の紐付けがないEnv
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  Method Environment
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    通常の関数の呼び出しに使われる環境
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    thisValueをもってる
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  thisの解決
</p>

<pre style="margin-top: 10px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; padding-top: 15px; padding-right: 20px; padding-bottom: 15px; padding-left: 20px; background-color: rgba(0, 0, 0, 0.0195313); border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #cccccc; border-top-width: 1px; border-top-style: solid; border-top-color: #cccccc; clear: both; color: black; font: normal normal normal 100%/1.25 Monaco, 'Andale Mono', monospace; position: relative; white-space: pre-wrap; word-wrap: break-word;"><code style="font-size: 12px; color: #444444; padding: 0px; margin: 0px; border: 1px none #dedede;">function outer(){// #1 Method Environment
    {// #2 Declarative Environment
        this;//thisの値を#2 -&gt; #1 の順番にききに行く
    }
    () =&gt;{// #3 Declarative Environment
        this;// #3 -&gt; #1
    }
    function inner(){// #4
        this;// -&gt; #4
    }
}   
</code></pre>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  今まではthisが直接決まっていたけど、thisもプロトタイプチェーンみたいに辿っていく仕組みができた
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  template strings
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ${}でexpression
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    String.raw部分のメソッドは自分で定義できる
  </li>
</ul>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  raw & cooked
</h4>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    cooked <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        uみたいなエスケープシーケンスも解釈する
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        nなども改行として解釈する
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    raw <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        nもそのままの表記で渡ってくる
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    QuasiLiteralのメソッドは両方共受け取れる
  </li>
</ul>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  QuasiLiteral CallSite
</h4>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    expression* で結果が分割されてる
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  template strings
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    変数とかexpressionとかをわたせる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    rawとcookedなモードがある
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    String.raw という便利なメソッド
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  ES.next engine
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ES.nextの実行エンジン
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    静的、動的な部分 を調査しながら実装中
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    C++
  </li>
</ul>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  質問
</h4>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  QuasiLiteral
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    外部からQuasiLiteral部分を受け取って評価するようなもの作れるの?
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    evalとか必要なのでそういうのは向いてないのかも
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Hoganとかテンプレートを関数に直すような仕組みを作るといいのかも
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  Class
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    staticなclass変数は作れない
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Function Declarationは他に副作用を与えない
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    constructorは今までとは書き方が違うので静的に解析できる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    [[MethodName]]を参照できるようになると、今までの名前付き関数式で関数を作ってた時のような デバッガーに優しいものが楽にできるようになる。
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  名前付き関数式との対比(クラス内に書くので下は少し違うけど)
</p>

<pre style="margin-top: 10px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; padding-top: 15px; padding-right: 20px; padding-bottom: 15px; padding-left: 20px; background-color: rgba(0, 0, 0, 0.0195313); border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #cccccc; border-top-width: 1px; border-top-style: solid; border-top-color: #cccccc; clear: both; color: black; font: normal normal normal 100%/1.25 Monaco, 'Andale Mono', monospace; position: relative; white-space: pre-wrap; word-wrap: break-word;"><code style="font-size: 12px; color: #444444; padding: 0px; margin: 0px; border: 1px none #dedede;">var fn = function fn(){
}
// これから下みたいな事もかける
({
    fn(){
    }
});
</code></pre>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 21px; border-top-style: solid; border-top-color: #e0e0e0;">
  第39技術委員会の真実とは！？　LabelledStatementの謎を追え！ &#8211; kyo_ago
</h2>

<blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
  <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
    スライド : <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="第39技術委員会の真実とは！？　LabelledStatementの謎を追え！" href="http://0-9.sakura.ne.jp/pub/ecmascript/start.html">第39技術委員会の真実とは！？　LabelledStatementの謎を追え！</a>
  </p>
</blockquote>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    label
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  直接scriptにいかのようなコードがうめこまれてる
</p>

<pre style="margin-top: 10px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; padding-top: 15px; padding-right: 20px; padding-bottom: 15px; padding-left: 20px; background-color: rgba(0, 0, 0, 0.0195313); border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #cccccc; border-top-width: 1px; border-top-style: solid; border-top-color: #cccccc; clear: both; color: black; font: normal normal normal 100%/1.25 Monaco, 'Andale Mono', monospace; position: relative; white-space: pre-wrap; word-wrap: break-word;"><code style="font-size: 12px; color: #444444; padding: 0px; margin: 0px; border: 1px none #dedede;">javasript://
http://
</code></pre>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  エラーなく処理できる…
</p>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 21px; border-top-style: solid; border-top-color: #e0e0e0;">
  Struct.js &#8211; hagino3000
</h2>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    型チェックを行うライトなもの
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    proxyを使ってチェック処理を挟む
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  delete対象のtypoなど、動かしてもエラーがでなくてわからない場合がある。
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    構造体的に型情報を定義する
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Proxyを挟んでチェックする
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    mobile safariで動かなかった…
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 21px; border-top-style: solid; border-top-color: #e0e0e0;">
  iv /lv5 &#8211; Constellation
</h2>

<blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
  <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
    スライド : <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="lv5.current (ちらっと)" href="http://constellation.github.com/slides/contents/20120812-2/presentation.html#slide1">lv5.current (ちらっと)</a>
  </p>
</blockquote>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    仕様のテストが全てPass
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    より高速化を
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  breaker
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    JIT Compiler
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Type Analysis
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    インラインキャッシュ
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    MonoIC for Global Variable <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        property tableの実装だったもの
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        名前に対してproperty Descriptorが紐付いてる
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        大抵がdata propertyが同じなのに、毎回property descriptorの分だけ領域を取るのがもったいない
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        attribution情報をmapで管理
      </li>
    </ul>
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 21px; border-top-style: solid; border-top-color: #e0e0e0;">
  おわり
</h2>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  メモ : Mou
</p>