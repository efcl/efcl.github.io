---
title: ECMAScript勉強会 アウトラインメモ
author: azu
layout: post
permalink: /2012/0407/res3047/
SBM_count:
  - '00053<>1355445478<>49<>0<>3<>1<>0'
dsq_thread_id:
  - 640184313
categories:
  - javascript
  - イベント
tags:
  - ECMAScript
  - javascript
  - イベント
---
[ECMAScript勉強会][1] に参加してきたのでその時のメモです。  
久々に結構難しい内容が多かった気がする。

<h1 style="padding-top: 0.25em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: initial; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 23px; border-top-style: none; border-top-color: initial; margin: 0px;">
  ECMAScript勉強会
</h1>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  ECMAScript概要 &#8211; rika_t
</h2>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="ECMAScript Study #1 Overview" href="http://www.slideshare.net/agigigigi/ecmascript-study-1-overview">ECMAScript Study #1 Overview</a>
</p>

<hr style="padding: 0px; margin: 0px; border: 1px solid #dddddd;" />

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  途中参加
</p>

<hr style="padding: 0px; margin: 0px; border: 1px solid #dddddd;" />

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  newがあるのはなぜ
</h3>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  プリミティブな型もメソッドやプロパティを持てるようにしたいため、ラッパーでラップしてた。
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  globalオブジェクト
</h3>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  globalオブジェクトは必ずしもwindowではない
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  オブジェクトとクラス
</h3>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  内部的には[[Class]]というクラスという文字列がでてきてた。
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ES6から内部的にClassというものがなくなってきてる。
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    リテラル記法やコンストラクタを使って様々なオブジェクトを表現してる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <code style="padding-top: 0px; padding-right: 0.2em; padding-bottom: 0px; padding-left: 0.2em; font: normal normal normal 12px/normal Monaco, 'Courier New', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', monospace; font-size: 12px; background-color: #f8f8ff; color: #444444; margin: 0px; border: 1px solid #dedede;">NativeBrand</code>という名前になってる
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  prototype
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    仕様書にのってるprototypeの図はわかりにくい
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  変数宣言
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    “var&#8221;キーワードの後にIdentifierを与える
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    opt = option としてInitiliser = “str&#8221;みたいに初期化も同時にできる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    IdentifierName <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        IdentifierStart (変数名の最初に文字列) か初めて
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        IdentifierName IdentifierPart
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <strong style="padding: 0px; margin: 0px;">let</strong> から始まる内容はここで定義してる内容をかかれてる(他を見なくてもいい)
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  変数宣言の処理
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    return (normal,empty,empty) normalは正常終了
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  ES.next 追っかけ &#8211; teramako
</h2>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="ES.next 追っかけ - ECMAScript 勉強会" href="http://teramako.github.com/doc/es6_study-20120407/index.html">ES.next 追っかけ &#8211; ECMAScript 勉強会</a>
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  メーリングリストの購読
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    es-discussの購読
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ES.nextに追うため見るメーリングリスト
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    流量が多い
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  構文抽出
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    wiki.ecmascript.org に最新版のドラフトがアップロードされる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    更新内容は色分け表示されてる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ドラフト仕様から構文部分のみ抽出したものを作成
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  Mozillaの実装追いかけ
</h3>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  ＊SpiderMonkeyのHarmony実装をトラッキングするメタバグがある
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  構文解析
</h3>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  JavaScriptがどうやって構文解析していくか
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Reflect.parse()メソッド
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    結果をオブジェクトのツリーで返してくれる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    reflect.jsmを読み込んでReflect.parseが利用できる
  </li>
</ul>

<h4 style="padding: 0px; margin: 0px; border: 0px initial initial;">
  iv/js
</h4>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ES.nextの実装をパースできるツール
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    http://constellation.github.com/iv/js/es.next.html
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    esprimaを使ったものも最近でてきた
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    http://esprima.org/demo/parse.html
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  quasiリテラル
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ヒアドキュメント的に使えそう
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  ES.next the corner case &#8211; Constellation
</h2>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="ES.next the corner cases" href="http://constellation.github.com/slides/contents/20120407/presentation.html#slide1">ES.next the corner cases</a>
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    esprima <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        コミッターやってる
      </li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  ConstDeclarationの話
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    initializer必須
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Blockスコープ
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    BNFだけでは判断できないで、semaniticsも見ないと行けないようになった *
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  block scope
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    staticに解析可能
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ブロックスコープになったことで、ランタイムでないと判定できなかったのが、静的に解析が可能
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
      そのため速度がかなりよくなった
    </p>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
      再代入はsyntax errorにする
    </p>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
      これもパース時に判断できるので、速度がよくなる
    </p>
    
    <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
      const V = 20; V = 30;// syntax error
    </p>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
      early errorに分類(run timeより前)
    </p>
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  egal operator
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    is
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    isnt
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    より値の同一性に重きをおいたequal
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    is/isnt はContextual Keyword
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Statementの先頭以外にくるキーワードはcontextual Keywordになる事が殆ど <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        ofとか
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    文脈依存のキーワードのような扱い方をされるということ
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  <| operator トライアングル演算子
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    常にArrayを継承できる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <code style="padding-top: 0px; padding-right: 0.2em; padding-bottom: 0px; padding-left: 0.2em; font: normal normal normal 12px/normal Monaco, 'Courier New', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', monospace; font-size: 12px; background-color: #f8f8ff; color: #444444; margin: 0px; border: 1px solid #dedede;">&lt;|</code>の右はリテラルしか置けない
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    なぜリテラルのみ <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        JITとかに破壊的になってしまう
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        inline cacheが破壊されて、キャシュが機能しない
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    右側にfunctionリテラルときは挙動が変わる <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        継承っぽくなる
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        Base.prototypeを[[Prototype]]にもつObjectが生成されて、インスタンスのprototypeに設定される
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="ECMAScript と OOP パラダイム、それに ES.next の議論中 OOP 周りのシンタックス - oogattaの勉強日記" href="http://d.hatena.ne.jp/oogatta/20111204/1322982897">ECMAScript と OOP パラダイム、それに ES.next の議論中 OOP 周りのシンタックス &#8211; oogattaの勉強日記</a>
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  ES.next Library Extension
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    String/Number/Function などに機能を増やす <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        repeat
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        startsWith
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        などの便利な関数
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    GlobalなものをNumberにいける <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        isFinite
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        parseInt などをNumberにも追加する
      </li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  duplicateな変数purge機構
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    関数スコープのレキシカルスコープ内で変数宣言が被った時にsyntax errorになる
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  new Date(NaN)
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ES.nextのnew Date(NaN).toString() Invalid Dateをかえすようになった
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  propertyの登場順
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    for-in , Object.keysなどの登場順が規定される
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  LHS
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    left hand side
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    今まで()でくくって中が式なら何でも入ってた
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    それがleft hand side expressionという部類のみになった
  </li>
</ul>

<blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
  <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
    (1,2,3) = 20;
  </p>
</blockquote>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  というのがSyntaxErrorになる(ES5はReferrenceErrorなった) またパース時に判断できる
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  ES.nextのバグ
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    draftにはバグある
  </li>
</ul>

<blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
  <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
    ({responseText }) = res;
  </p>
</blockquote>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  そもそもオブジェクトリテラルの解釈
</p>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  名前
</h2>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ES.next <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        バージョン番号がアレなので.nextという名前になってる
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="strawman" href="http://wiki.ecmascript.org/doku.php?id=strawman:strawman&amp;s=strawman">strawman</a>(ストローマン) <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        とりあえずな感じのバージョン
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Harmony <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        いずれかのバージョンにはいるかも的なもの
      </li>
    </ul>
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="A brief history of ECMAScript versions (including Harmony and ES.next)" href="http://www.2ality.com/2011/06/ecmascript.html">A brief history of ECMAScript versions (including Harmony and ES.next)</a>
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  CoffeeScript
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    is/isnt みたいにセマンティックが同じなのに、挙動が違うことで論争が起きるのが怖い
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    => とかでも論争がおきてる
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  ECMAScript読書会
</h2>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    6章からが本番
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Annexに定義などが入ってる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Annex C はStrict mode
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    D, Eが変更点修正点
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  4.概要
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
      <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
        この仕様では外部データの入力や計算結果の出力に関する規定はありません
      </p>
    </blockquote>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    仕様外だが他にもオブジェクトがあるかもしれない事は考慮する(DOM)
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  4.2.2 Strict mode
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    “ECMAScriptは、言語において使えるいくつかの機能の使い方を制限したいと考えているユーザがいる可能性があることを認識しています。”
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    標準のものに追加してエラー条件が定義される
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    実装中の注意 <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        パース時にでるエラーと実行時エラー
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        パース時に出すエラーはパース時にstrict modeかどうかをみないといけない
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        関数の先頭にstringリテラルが連続してる　== ディレクティブ プロローグ という <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
          <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
            この範囲にuse strictが入っていればstrict modeになる
          </li>
        </ul>
      </li>
      
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        ディレクティブ プロローグの最後に&#8221;use strict&#8221;;を書かれた場合などは、最初のほうのパースにもstrictを適応してエラーにする
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        関数の引数はどっち(中、外)のstrict modeなのか? <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
          <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
            中のstrict modeが適応されるので、関数内がstrict modeなら、関数名にevalとかしてる時もエラーにするようにする(disccuss)
          </li>
          <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
            body,param,functionName 全部strict modeに適応範囲とする
          </li>
        </ul>
      </li>
      
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="Does 'use strict' in a FunctionBody apply strict mode FutureReservedWord restrictions to function name or arguments?" href="https://mail.mozilla.org/pipermail/es5-discuss/2011-January/003904.html">Does ‘use strict’ in a FunctionBody apply strict mode FutureReservedWord restrictions to function name or arguments?</a>
      </li>
    </ul>
  </li>
</ul>

<h1 style="padding-top: 0.25em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: initial; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 23px; border-top-style: none; border-top-color: initial; margin: 0px;">
</h1>

メモ: Mou + github.css

 [1]: http://atnd.org/events/25793