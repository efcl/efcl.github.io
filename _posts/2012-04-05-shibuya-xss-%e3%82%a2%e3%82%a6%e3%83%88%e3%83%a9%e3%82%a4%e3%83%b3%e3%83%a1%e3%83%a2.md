---
title: Shibuya.XSS アウトラインメモ
author: azu
layout: post
permalink: /2012/0405/res3027/
dsq_thread_id:
  - 637170496
SBM_count:
  - '00102<>1355446793<>98<>0<>4<>0<>0'
categories:
  - イベント
tags:
  - javascript
  - XSS
  - イベント
  - セキュリティ
---
[Shibuya.XSS テクニカルトーク#1 : ATND][1] に参加してきたので、その時のメモ。

<h1 style="padding-top: 0.25em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: initial; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 23px; border-top-style: none; border-top-color: initial; margin: 0px;">
  Shibuya.XSS
</h1>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="Shibuya.XSSまとめ - Togetter" href="http://togetter.com/li/283573">Shibuya.XSSまとめ &#8211; Togetter</a>
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  DOM Based XSSの傾向と対策 &#8211; mala
</h2>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="Shibuya.XSSで発表してきました - 金利0無利息キャッシング – キャッシングできます - subtech" href="http://subtech.g.hatena.ne.jp/mala/20120405/1333620763">Shibuya.XSSで発表してきました &#8211; 金利0無利息キャッシング – キャッシングできます &#8211; subtech</a>
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  機械的なスキャンで見つけづらいXSS
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    location.hash経由で発火が多い、
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    サーバ側にアクセスログが残りづらい
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ビーコンでlocation.hashを記録する事も可能だけど、実行順序で潰される事がある
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  location.hashでの問題
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    XHR2
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  どんな時に見つけにくい
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    パラメーターをパースして利用してる場合
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ソースを読まないと見つけにくい。
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    難読化されてるとしんどい
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    レガシーコード
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  どうするのがいいのだろうか
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    バリデーション?
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  バリデーションが必要な状況
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    openにファイル名渡す -> パイプでコマンド実行可能
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ファイル開く関数とコマンド実行を分けて使うべき
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    役割に応じて「それだけを行うように」する
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  バリデーションが必要なライブラリ
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    直接使うときは安全に倒す
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  そもそも安全にすることを考える
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    外部リソース読み込めないようには無理
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  コーディング規約での対処
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    jQueryの場合
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    セレクタの使い方を徹底する
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    findを使って$関数の直接使用を避ける
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    $関数は汎用的すぎ
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  コーディング
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    XHRのリクエストは必ず絶対パス+動的パス
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    絶対パスが/のみだと突破できる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    /api/的な感じに
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  問題点
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    HTML5等で今まで安全だったかもしれないものが崩壊して、可能な攻撃が増える
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  DOM XSS撲滅装置
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    location.hashにタグが会った場合は消す等
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    その文字列を使わないことが保証されてるなら割りと効果的
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    広告やブログパーツ等、自分で治せないもの等の緊急的
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    潜在的なXSS
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  パスワードを盗めるか?
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ブラウザのパスワード自動入力機能でパスワードを盗める場合がある
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    セッション乗っ取り + パスワード盗み
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  パスワードの盗み方
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    自動でフィルインされた値を読み取る
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    自動的に盗むことが可能
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    自動フィルイン + クリックジャッキング -> 半自動
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    フォームの宛先を攻撃サイトに誘導
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  事例
</h3>

<blockquote style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0.6em; border-left-width: 5px; border-left-style: solid; border-left-color: #dddddd; color: #555555;">
  <p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
    ?to=javascript:eval(location.hash)#攻撃コード
  </p>
</blockquote>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ログイン後のリダイレクトのURL先でjavascript:を実行可能
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  対策
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    そのパスワードを入力するドメインをサブドメインで独立させる <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        ログイン機能だけを持ったサブドメインを作成する
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        他のjsを入れない、厳しめのルール
      </li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  フェールセーフ設計
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    サンドボックス
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    パスワードを入力するページは外部jsを完全排除するとか
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    パスワード入力ページはそれ専用のサブドメインへ
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  ブラウザ側のリスク軽減
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    XSSフィルタ
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    パスワードの自動フィルイン対策
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    元々危険だったものが更に危険になる => 理解されないことが多い
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  攻撃パターン
</h3>

<ol style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    iframeで埋め込む -> サードパーティクッキー有効なら発動
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    短縮URL + replaceStateでURL偽装
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ポップアップWIndowとサードパーティ
  </li>
</ol>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  ユーザー側の対策
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    NoScript
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    複雑なルールを設定しないと安全に利用できない
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    攻撃者が嫌う設定を使う <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        サードパーティクッキーオフ、ポップアップのブロク、リダイレクトの防止
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    初見のURLは全部シークレットモードで開くとか
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  まとめ
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    DOM Based XSSはたくさんある
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    XSSがあっても安全にすることを考える
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  焼肉、刺身
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    XSS発見者には肉か刺身をおごる慣例(*人徳が必要)
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  x-autocompletetypeの実験 by はまちちゃんさん
</h2>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    x-autocompletetypeのデモ
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    http://hamachiya.com/junk/x-autocompletetype.php
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  サニタイズ言うぞキャンペーン &#8211; TAKESAKO
</h2>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  mixiの新着検索ページでXSSで1件
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    いぬぼくxSS
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  7年前と少し違う状況
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    jQuery
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    XHR2
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  サニタイズ的なものが必要になる場合がある。
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  kintone
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ライブラリ除いて10万行ぐらい
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  社内勉強会
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    jQueryは甘え
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  Closure Templateのエスケープ機能について
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    サニタイズコンテント
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    JavaScriptでHTMLのパーサー的に書かれてる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    問題を起こしそうな文字列などが定義されてる
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  Closure Template &#8211; Contextual Autoscape
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    JavaScriptエスケープとHTMLエスケープ等の区別をおこなってくれる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    CSS、属性値等で異なるエスケープを行う
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    無毒化とかを文脈依存で対処される
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    http://d.hatena.ne.jp/teppeis/20120318/1332092081
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  オフレコ &#8211; 春山
</h2>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ベンチャーから始めると、フローの把握ができてない所が存在する
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    そのフローの把握が重要
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  JS Array Hijacking with MBCS &#8211; hasegawa
</h2>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  <a style="color: #4183c4; text-decoration: none; padding: 0px; margin: 0px;" title="Shibuya.XSS テクニカルトーク#1 開催しました。 - 葉っぱ日記" href="http://d.hatena.ne.jp/hasegawayosuke/20120405/p1">Shibuya.XSS テクニカルトーク#1 開催しました。 &#8211; 葉っぱ日記</a>
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Array形式のJSONをジャックする
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Firefox 修正済み
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    UTF-8をShift-JISで解釈すると壊れた解釈をしてしまう問題
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  Mozillaはポテンシャル的な脅威にも対処してくれる
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Content-Typeとcharset をちゃんとつける
  </li>
</ul>

<h1 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 23px; border-top-style: solid; border-top-color: #aaaaaa;">
  LT
</h1>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  mixi scrap Challenge
</h2>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    学生向けのセキュリティイベント
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    用意したmixiクローンサイトに攻撃してもらって脆弱性を見つけてもらう
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  イベント用に使ったサイト
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    イベント用のmixiサイトをクローンしてXSSを探してもらう
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    日記ページにあるXSSを探して、スタッフアカウントに対して攻撃URLを送ってもらう <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        得点方式
      </li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  問題
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ネギ男に、イラクとnicknameがalertされるURLを踏ませて下さい
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ネギ男に….
  </li>
</ul>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  みたいな問題形式
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  実際のサービスのクローンを舞台にして
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    盛り上がった
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    より実践的な体験をしてもらえた <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        XSSをみつけるだけではなくSNSの使用を考慮して実践的な内容になった
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        問題をつくやすかった
      </li>
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        git-grep “XSS” revertで過去に対応してXSS問題から引き出す
      </li>
    </ul>
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  AjaxアプリケーションのXSS対応入門 &#8211; 徳丸
</h2>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    入門書にもAjax的な問題
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    X-Content-Type-Options: nosniff
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  JSONハイジャック
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    JSONを罠サイトからスクリプト要素を呼び出す
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    通常はただのデータなので、読み取りはできないはず…
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    JSONハイジャックで読み取りができてしまう => 既にブラウザは対策済み
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    Androidだとまだ発生する(4.0.3だと問題ない)
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  対策
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ヘッダチェックが無難
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    あんまりいい方法がない
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    外部APIは基本的に信用しない
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  CSS HTML Attribute Reader &#8211; kyo_ago
</h2>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  The Sexy Assassinで紹介されてるCSS HTML Attribute Readerがどこまで危険か検証してみた http://bit.ly/HU74ad
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    CSS Attributeでパスワードの取得 -moz-anyと合わせ技
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    外部からCSS書けるということ自体が問題
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    :visited の履歴取得も最近のブラウザは対策されてる
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  ロングIPアドレス
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ドット無しでドメインを書くことができる
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ドットを無効化しても、数字だけでドメインを書く事ができるので問題が起こる場合があるかも
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  セキュリティ小ネタ &#8211; send
</h2>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  http://d.hatena.ne.jp/send/20120405/p1
</p>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  rootkit
</h3>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    rootやadminが使えなくなってた
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    対策 <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        別の所からpsやkill等のバイナリを持ってきてきて殺してた
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    chattrされてた <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 2em; padding: 0px;">
      <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        細かい改ざんをやっていた
      </li>
    </ul>
  </li>
  
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    対策として改ざん検知などの導入で数ヶ月使った
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  よく狙われる脆弱性
</h3>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  JSだとimg onerror
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    src属性指定後すぐ発火してしまう
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    ドキュメントに追加しなくても発火してしまってる(高速)
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    onerrorは除去しにくいので対策しにくい
  </li>
</ul>

<h2 style="margin-top: 1.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding-top: 0.5em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 4px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 20px; border-top-style: solid; border-top-color: #e0e0e0;">
  余談
</h2>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    最初にサブドメイン以下にtest. やadmin.とかを見る
  </li>
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    crossdomein.xml
  </li>
</ul>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  パスワード入力はやっぱり別ドメインに分けるべき
</h3>

<h3 style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px initial initial;">
  DOS
</h3>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 1.5em; padding: 0px;">
  くよくよくよくよ
</p>

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
  <li style="margin-top: 0.5em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    セキュリティを使うと守ると考えるは違う
  </li>
</ul>

<h1 style="padding-top: 0.25em; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: initial; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 23px; border-top-style: none; border-top-color: initial; margin: 0px;">
</h1>

メモ : Mou + Github.css

<ul style="margin-top: 1em; margin-right: 0px; margin-bottom: 1em; margin-left: 2em; padding: 0px;">
</ul>

 [1]: http://atnd.org/events/25689