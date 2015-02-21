---
title: "Frontrend Conference アウトラインメモ"
author: azu
layout: post
date : 2015-02-21T23:39
category: イベント
tags:
    - イベント
    - JavaScript
    - CSS

---


[Frontrend Conference - A conference for front-end developer（2015年2月21日開催）](http://frontrend.github.io/conference/ "Frontrend Conference - A conference for front-end developer（2015年2月21日開催）") に参加してきたのでメモ

殆どCSS側のセッションにいたのでCSSが中心。
終わったあとに[#ゴーヤsushi](https://twitter.com/search?f=realtime&q=%23%E3%82%B4%E3%83%BC%E3%83%A4sushi&src=typd "#ゴーヤsushi")と[#ルノアール_sushi](https://twitter.com/search?f=realtime&q=%23%E3%83%AB%E3%83%8E%E3%82%A2%E3%83%BC%E3%83%AB_sushi&src=typd "#ルノアール_sushi")をしたのでとても長かった。

----

## Pragmatic Front-end Developer: From Artisan to Expert - 斉藤 祐也

- 基調講演
- メンテンス性
	- WEBを構成するJS+CSS+HTMLはあんまりメンテしやすくない
	- けど専門的な知識がなくてもかけてしまう学びやすさがある
	- 言語的にシンプル
- コードスタイルガイドライン
	- 多くの人が開発しても、一人の人が書いたように見えるようにしたほうがいい
	- JavaScript
		- IDOMATIC.js
		- jQuery Code Style GuideLine
	- CSS
		- IDOMATIC.css
		- Sass GuideLine
	- HTML
		- [Code Guide by @mdo](http://codeguide.co/ "Code Guide by @mdo")
- ガイドラインは運用を継続できないと意味がない
- なのでツールを使うことが必要
	- http://editorconfig.org/
	- https://github.com/jscs-dev/node-jscs
	- csslint.net
	- csscombは整形ツール
- 自動化を目指すためにツールを使う
	- どうしてそのコードを書いたのかを議論する時間を使えるようにツールを使って単純化する
- サイト
	- GitHub
	- Mailchimp
	- styleguides.io アグリゲーション
- ドキュメンテーション
	- ドキュメンテーションは嘘をつくのが弱点
	- 変化が激しいので嘘ができてしまう
	- そこを解決するのがツール
	- コードコメントでMarkdownで書いて
	- そこからドキュメンテーションを生成する
- KSS
	- ここから色々なツールがでてきた
	- CSSのスタイルガイドをコメントから生成する
	- https://github.com/kss-node/kss-node
	- https://github.com/trulia/hologram
- ゴール
	- 人は実際に見えるものに対して議論がし易い
	- プロトタイピングにもスタイルガイドは役立つ
- プロトタイプ
	- プロトタイプはさっさと作る
- プロトタイプ制作のツール
	- HTML/CSS/JSで作る?
	- http://www.browsersync.io/ でのLiveReload
		- あるブラウザでの操作を別のブラウザでも反映できる
	- JSBIN
	- Chrome Dev Tools
- プログレッシブエンハンスメント
	- ウェブはプラットフォームじゃなくて連続性を持ってる
	- ウェブは常に変化し続けてるので、YES/NOだけが答えじゃないことが多い
	- ウェブそのものがプログレッシブエンハンスメント?
	- CUT THE MUSTAND
		- ブラウザごとじゃなくて、コンポーネントごとにブラウザを判定して体験レイヤーを分ける
		- コンポーネント(機能の塊)
		- `if(ある機能 && ある機能 && ある機能){}`
		- コンポーネントが使えるならって感じで分ける
		- feature detectとはちょっと違う
		- [Grade components, not browsers | Filament Group, Inc., Boston, MA](http://www.filamentgroup.com/lab/grade-the-components.html "Grade components, not browsers | Filament Group, Inc., Boston, MA")
- プロダクトの責任
	- プロダクトを継続できるように気を配る
	- ウェブは変化し続けるので、責任持ってる
- レスポンシブ
	- 何もしなくても新しい対応出来てる状態が作れるかもしれない
	- 新しいサイズの端末が出てきた時に、その端末向けに何かを実装するんじゃなくて、それでも動くように作っておく
	- ウェブは多くの環境から見られる
	- それらの環境を考えるのもひとつ
- パフォーマンス
	- Twitterのクライアントサイド -> サーバサイドサイドテンプレートに戻った話
	- クライアントサイドだと1000msの壁を超えられなかった
	- EmberのFast Boot
	- NodeをバックエンドのUIレイヤーとして使ってファーストビューをよくする話
	- React-Canvas
- プログラミングにおける割れ窓理論
	- 周辺から片付けていこう
- 知識を増やすための時間を定常的に設ける
	- 常に危機感を持って新しい知識を求める
- コミュニケーション
	- 自分が生み出した価値を伝える価値
	- 新しいプロダクトを作ったらそれを伝えることが必要
- チーム
	- それぞれ専門性持った人が集まるもの


-----

## 箱 - 矢倉 眞隆

- [CSSに死を！これはJSerの叫び！ #kbkz_tech](http://0-9.sakura.ne.jp/pub/kbkz_tech/start.html "CSSに死を！これはJSerの叫び！ #kbkz_tech")
- の話
- OOPみたいな概念をCSSに持ち込むにはどうすれば?
- CSS辛い話
	- CSSの新しいものを紹介しても使ってもらえない
	- 古い環境のサポートが必要だから
- `object-fit`
	- アスペクト比を保ったまま画像を収めて表示できる機能
	- ギャラリーを作るときとかに便利
	- Webkit先行実装 -> Blink実装 -> Firefox実装のいつもの流れ
- CSSのpolyfill
	- `object-fit`のpolyfillを書こうとする
	- JavaScriptでやったほうが楽そうに見える
	- けど、知らないものをまずをJSで解釈させる必要がある
	- まずJavaScriptでCSSパーサを作る必要がある
	- ブラウザはわからないプロパティを無視する(CSSOMから捨ててしまう)
	- パフォーマンスが悪くなる
- CSSが表示されるまでの流れ
	- CSSをパースしてCSSOMにする
	- レイアウトして描画
- CSSのpolyfill開発の辛さ
	- CSSOMには知らないものは現れない
	- アクセスは文字列を変更する
	- JavaScriptならオブジェクト+プロパティ
	- ブラックボックスな感じ
- Extensible Web
	- 開発者がウェブを拡張できるようにするための構想
	- polyfillをもっと簡単に作れるように基盤を作ろう
- JavaScriptの場合
	- ES5のArray系メソッドはES3レベルでもpolyfillを書くことができた
- CSSはExtensibleじゃない
	- CSSプリプロセッサが行った拡張
	- 記述や管理面の強化なので、機能面で拡張できたわけじゃない
- SassScript
	- 処理命令、データ構造、型などはある
	- 最初はRuby実装だったがC/C++などの実装がでてきたのはいいこと
	- [sass/libsass](https://github.com/sass/libsass "sass/libsass")
- Extensible CSSはプログラムっぽくなる
	- => おそらくならない
	- JSなどのレイヤーでやることになる
- [CSS Houdini Wiki [CSS-TAG Houdini Task Force Wiki]](https://wiki.css-houdini.org/ "CSS Houdini Wiki [CSS-TAG Houdini Task Force Wiki]")
	- Project Houdini
	- TAGとCSS WGの合同タスクフォース
	- JavaScriptでCSSのpolyfillを作りやすくするためのプロジェクト
	- [CSS Houdini / CSS Working Groupミーティングに参加しました - 株式会社ビブリオスタイル (Vivliostyle Inc.)](http://vivliostyle.co.jp/2015/02/sydney/ "CSS Houdini / CSS Working Groupミーティングに参加しました - 株式会社ビブリオスタイル (Vivliostyle Inc.)")
- Houdini
	- http://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%AA%E3%83%BC%E3%83%BB%E3%83%95%E3%83%BC%E3%83%87%E3%82%A3%E3%83%BC%E3%83%8B
	- 箱の中から脱出するマジシャン的の人
	- フーディンの元ネタ
- Houdiniの中身
- Exposition
	- 今までブラックボックスだったところを取れるようにする
	- JavaScriptから触れるようにする
	- Parser API
		- まずはセレクタや算出前の値とか、値の型とかpolyfillの開発に
	- Font Metrics
		- テキストのフォントのサイズとか、文字列の幅とかを取る
		- タイポグラフィなどに役立つ
		- CanvasだとできるAPIがある
	- Fragment Tree API
		- ボックスを構成するフラグメントをexposeする
		- 複数行にまたいだ最初に一行目(First Letter)とかの大きさをとれる
		- ブラウザのレンダリングツリーを取れるようにする
- Properties & Values
	- CSS Variablesの拡張
	- 初期化や変更などができるように
	- Web ComponentsのCSS版みたいのが実現できる?
- Custom Layout/Paint
	- レイアウトや描画に介入
- Scroll Extensions
	- Pull to refreshなど
	- 細かいスクロールの制御をする
- どこまで実現できるのか?
	- polyfillができるかもしれないが、まずこのHoudiniの
	- できるまでに時間がかかる
- UI開発は楽になるか
	- DOMとCSSOMがもう少しシームレスにならないとUI開発が楽にならない
- 拡張によってつらくなくなるか
	- ハイレイヤーなユースケースが多い
	- Houdiniはローレイヤーの話が中心
	- 必ずしもローレイヤーのも求めなくてもいい場合もある
	- ハイレイヤーな機能をもとめていいはず
	- まずは声をあげて伝えよう
- つらい -> つらいかも

-----

## Web Components/Polymer, Styling Shadow DOM - 谷 拓樹

- CSSのの解決していく手段
	- OOCSS
	- SMACSS
	- BEM
	- などで解決していこうとしてる
	- これらは紳士協定的なもの
	- => 根本的な解決はできてない
- これを根本的に解決しようとするのがWeb Components
- Templates
	- `<template>` はページ上ではレンダリングはされない
	- Custom Elementとかで使う
- Custom Element
	- 好きな要素をつくるための話
- Shadow DOM
	- CSSにとって大事
	- Chromeとかは`<video>`とかで使われてる
- HTML Imports
	- 作ったものをページ間とか共有するために使う
- `webcomponents.js`
	- polyfill である程度
	- 若干の制限がある
- Polymer
	- Googleが中心でやってるWebComponent周りのプロジェクト
	- `webcomponents.js` ベース + UI Componentなどが
- メルヘンなデモ
	- ひかりの世界(普通にHTMLの世界)
	- `<x-element>` という要素を作っていく
	- `<template>`の中身に置き換わる => やみの世界へ
	- やみの世界とひかり世界をつなげる
	- `<content />` = ひかりの世界 の内容
	- ひかりの世界とやみの世界ではCSSのスコープが分けられる
	- `:host` というのがひかりと闇の世界の境界
	- やみの世界にたいして、ひかりの世界からスタイルを当てる
		- `x-element::shadow{}` `::shadow`という擬似要素を使う
	- ひかりの世界から、やみの世界に対してスタイルを当てる
		- `::content{}`に対してスタイルをあてる


```
<x-element>
ひかりの世界
</x-element>
```


- Callout
	- 吹き出しのデモ
	- 外から吹き出しの背景の色を変更する
		- `::shadow` で外から色を指定する
		- ShadowDOMから`:host`を指定しておいて、`x-element`にクラスを指定してマッチさせる
	- もう一つの方法
	- `:host-context()`を使う
		- テーマ的な割り当てる
		- `x-element`をテーマ的なクラスでラップする
- Grid
	- `x-grid` グリッドレイアウトをするデモ
	- `col-4` というクラスが`x-grid`に指定されていた場合に4つで折り返すことができる
	- `:host`
	- 応用すれば `column="4"` みたいなのも属性セレクタでも実現できる
	- modifier
		- クラスセレクタ or 属性セレクタ
- ToolTip
	- `ui-tooltip` というCustom Element
	- コンポーネントをコンポーネントで作る
	- 内部的に`ui-callout`を使ってる
	- `Attributes`
	- `Nest`
- Deep Combinator
	- `<ui-tooltip> <ui-callout /> </ui-tooltip>`
	- コンポーネントを入れ子にするとShadowが深くなる
	- `ui-tooltip ui-callout .body{}`ではスタイルは変わらない
	- => `ui-tooltip::shadow ui-callout::shadow .body{}`ではスタイルは変わらない
	- [Shadow DOM 201: CSS とスタイリング - HTML5 Rocks](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-201/ "Shadow DOM 201: CSS とスタイリング - HTML5 Rocks")
	- /deep/ コンビネータでできるけど最近変わった
- `<time>` 
	- GitHubで使われてる要素
	- `<time is="time-ago">`という感じでCustom Elementが使われてる
- [lazyload-image](https://1000ch.github.io/lazyload-image/ "lazyload-image")
	- `<img is='lazyload-image'>`
	- JSオフなら普通のimgになる
- 道を知ってることとあることは違う
	- WebComponents
	- ユーザーが作ったものは`-`を要素名に含める必要がある
	- それが便利なら将来`-`なしで仕様としてはいるかもしれないね

-----

## CSS3 プロパティを使ってなにか作ります - @herablog 

- filter
	- CSS Filter Effects
	- [CSS Filters](http://html5-demos.appspot.com/static/css/filters/index.html "CSS Filters")
	- jpn-filter.css
	- 日本っぽいフィルター


## CSS Polyfill Preprocessor - @pocotan001

- Myth 
- [Myth - CSS the way it was imagined.](http://www.myth.io/ "Myth - CSS the way it was imagined.")
- CSSの仕様を実装したプリプロセッサ
- CSS Variableとかの実装
- 内部的にはreworkを使ってる
- [reworkcss/rework](https://github.com/reworkcss/rework "reworkcss/rework")
- CSSをCSSとか理解できる
	- 独自のシンタックスじゃない
- コンパイルの早さ
	- polyfillなので、実装されれば捨てられる
- CSSはツールよりも考え方が優先されてるような気がする
	- Sassとかだと`@extend`とかが使いにくいいとか
	- 最低限なので、ミニマムでいいのでは
	- [pocotan001 (Hayato Mizuno)](https://github.com/pocotan001 "pocotan001 (Hayato Mizuno)")


## position: fixed;を上手に飼う方法 - 石橋 啓太 

- 固定表示の実装でのはまりどころ
- `position: fixed`の理屈
	- `absolute`と同じ絶対配置
	- 基準点がviewport
- viewportとは
	- PCの場合はbodyと大体一致
	- スマホだとズームがあるので
	- visual viewport
	- layout viewport
	- の2種類ある
- fixedな要素をまるごとtransformで動かしたい
	- `position`が入れ子になってると大変
	- 適当なz-indexがあると辛い
	- formへのフォーカス、
	- 入力は特殊な動きが起きやすいので注意する
- 固定する要素はシンプルに保つ
- デバイス独自の挙動を考慮する


## 5分でわかるflexbox - @a_t 

- LINE
- [flexboxの旧仕様、改定仕様、現行仕様の一覧 « LINE Engineers&#39; Blog](http://developers.linecorp.com/blog/?p=2479 "flexboxの旧仕様、改定仕様、現行仕様の一覧 « LINE Engineers&#39; Blog")
- fluxboxは仕様変更があったので3つぐらい実装がある
- flexbox
	- 関連プロパティが名前変わったりしたので多い
	- 宣言、縦横の揃え
- Flexoxの宣言
	- `display:flex`
	- 縦の高さを揃えてくれる
- 縦横の揃え
	- `align-items` と`justify-content`で指定できる
- 幅の拡張
	- `flex:1`
	- 親要素の幅まで、子要素の幅を拡張できる
	- 幅 = コンテンツ幅 + 分配幅
	- 均等にしたい場合は、基準幅を変更する
- 擬似要素
	- 擬似要素に対してflexboxを適応する
	- 擬似要素も横並びに巻き込まれる
- テキストノード
	- テキストしか持たない要素にflexを指定した場合
	- `display:flex` テキストにも影響がでる


## Yet Another CSS Preprocessor - @morishitter_ 

- [morishitter/YACP](https://github.com/morishitter/YACP "morishitter/YACP")
- 既存のプリプロセッサは構文があってればよかった
- 良くない書き方は抑制できない
- 安全な`@extend`
	- プレースホルダとかのみextendできるように
	- なんでもやると辛くなる
- 詳細度の統一
	- クラスセレクタとそれに関連する擬似セレクタ以外を禁止
- ルールセットのカプセル化
- Single Class設計
	- マルチクラス設計の問題点
	- 共通するプロパティが上書きされる
	- ルールセット間で暗門な依存関係
		- `.button .button-big` みたいな
	- クラス名のセマンティック
		- `.button-next` みたいな意味を持たせる
- シングルクラス設計

-----

## Inline layout - 高津戸 壮

スライド: [Inline Layout](http://takazudo.github.io/presentation-inlineLayout/#/ "Inline Layout") と [Takazudo/presentation-inlineLayout](https://github.com/Takazudo/presentation-inlineLayout "Takazudo/presentation-inlineLayout")


- CSSの深堀り
	- font-size
	- line-height
	- vertical-align
	- inline-block
- インライン関連の仕組みを調べる
- `<div><img></div>`
	- 謎の隙間が下にできる
	- `vertical-align: top;` で治る
	- このスペースって何? 
- アイコン + 文字
	- うまく位置が揃わない
- 今日のメニュー
- 画像の下部の余白の謎
- font-sizeとline-heightの関係
	- 行の高さ(line-height)が16px,font-sizeが16px
	- line-height : 24px
	- 行に隙間ができる
	- leadingという隙間
	- half-leadingというのが2つある状態になる(上下)
	- half-leading が4pxずつある
	-  https://twitter.com/myakura/status/569030089645498368
	- 文字自体の高さがinline-box
	- inline-box + half-leading = extended inline box
	- => 1em といわれるもの
	- アルファベットの下の位置がbaseline
	- 日本語だとideographical baselineなどもう少し特殊なものがある
- 画像を入れた場合
	- vertical-alignによって決まってくる
	- `top`
		- 行の上端に画像の上端が揃う
	- `text-top`
		- フォントが持つ高さの上端に揃える
		- 上にhalf-leaingの高さ分空きがある
	- `baseline`
		- 初期値
		- ベースラインに対して画像の下端が揃う
		- そのため、画像の下端に隙間ができていた
	- `middle`
		- baselineから上に半分行ったところにあるline
		- 下端が揃う
	- `central`
		- baselineじゃんくて、行の高さの半分のline
		- 下端が揃う
	- display:blockにしたほうが楽
- テキスト+アイコン
	- `middle`ベースでやるのがいい?(centralがない)
	- 日本語の文字は密度が上にあるのでちょっと微調整が必要
-  テキスト複数行 + アイコン
	- ネガティブマージン
- チェックボックやラジオボタンの配置
	- ブラウザによって高さが違うため決め打ちをできない
	- `inline-block`
- リストのパレット
	- `li{ background: xxx } `
	- line-heightが高くなるとずれてしまう
	- backgroundは左上原点なので、ledding分ずれる
	- `li:before`の擬似要素を作って、そこにbackgroundでリスト画像をつける
	- text-indent で左に移動、maringで調整
	- list-style-imageでやれるところ
- カラムレイアウト
	- 行のレイアウトの仕組みを使ってカラムレイアウトをする
	- `display:inline-block` + コメントでホワイトスペースを作らせない
	- `flexbox`が使えれば…

-----

## JavaScriptテストの疑問、お答えします。- 吾郷 協

スライド: [JavaScriptテストの疑問、お答えします #frontrendJS](http://0-9.sakura.ne.jp/pub/frontrend/start.html "JavaScriptテストの疑問、お答えします #frontrendJS")

- テスト書いてますか?
- 手動テストも含めれば、何らかのテストはやってるはず
- テストって本当に必要ですか?
	- YES
	- 自動テストが必要かどうかはケースバイケース
- テストは自動テストだけではない
	- テスト自動化の功罪
	- 手動テストにも価値はある
- 使ったことない手法
	- 費用対効果を予測するのが困難
	- 最初は捨てる前提で簡単な部分から始める
	- 失敗だったら捨てればいい
	- 自動テストは個人でもできる、そこから予測の経験値を積む
	- 費用、効果は技術力、経験から異なる結果が得られる
	- 技術力が低い != テストできない
	- テストは書かないとテストの技術力は得られない。
	- テストを経験を積むと、見極めができるようになってくる
- UIテストのテストはやらない?
	- JavaScriptだと大体UIじゃないか?
	- 不安にフォーカスする
	- テストは不安に対処するための手法
- 手元にテストがないコードがあったどうする?
	- E2E、Integrationテストを書いてみるといいのでは
	- ユニットテストは高いレベルでかかれたコードのテストはできるが、逆に低いレベルのコードは難しい
	- E2Eテストはターゲットコードの品質の影響を受けにくい
- テストは楽になったの?
	- UIのテストは基本大変
	- Nodeみたいなコンテキストならユニットテストはまあまあ書ける
- テストの量はどう評価するのがいいか?
	- 不安が解消されるまで
	- 誰の不安を解消してようとしてるのかが基準

演説

- テストの目的
	- 何も目的がないのにテストを入れるのは少し変
	- 目的を持つ
- 自分の不安解消
- 他人の不安解消
- 手動テストの自動化
	- 1クリックの省略
	- 準備を自動化する
	- ちょっとづつやりましょう
- 勉強、処理、見栄
	- テストのためだけのプロダクトを作ってみると、「テストやってますか?」という質問に手を上げやすい
- リグレッションテスト
	- バグが出た時に、次にバグがでないようにテストを追加する
	- 既存のテストないコードだと入れるのが難しい
	- 場当たり的なテストになりがちなので、不要になるケースも
- ドキュメントの代わり
	- [JSDeferred - Asynchronous library in JavaScript. Standalone and Compact](http://cho45.stfuawsc.com/jsdeferred/ "JSDeferred - Asynchronous library in JavaScript. Standalone and Compact")
	- わかりやすい量が重要
- 知識の共有
	- チームに対する情報共有
	- 先にテストだけPR出す
	- 一人にテストを任せて集中してもらうと、テストがない状態からの導入としてやりやすい
- 設計
	- TDD的な感じ
- テストはやればやるほどいいわけではない
	- みんなのテストの目的意識を合わせる
- テストを書く文化の構築
	- 新規導入する場合は難しいのでなぜをちゃんと伝える
- どこからテストを始めるか
	- ユニットテストからは難易度が高い
	- assertから始めるのがいいのでは
	- assertの理由はテストにも持って行きやすい
- やっぱりどこからテストをやればいいの?
	- 不安はケースバイケース
	- = テストもどこからはケースバイケース
	- => 不安を自覚しよう
- テストかけたけど。。。
	- ゴミなら捨てよう
	- 基盤だけ残すとか

ツールに関して

- Mocha、Jasmineが主流
- Qunitは新規採用はないけど、使ってるならそれはそれでいい
- Sinon.jsの代わりはいまんとこない
- Promiseパターンが増えたので、fake timerがなくてもいい非同期テストがよくなった
- E2Eテスト Protractor、testium
- test runner : Karma、testem
	- [yahoo/preceptor](https://github.com/yahoo/preceptor "yahoo/preceptor")とかも最近でた
- isomorphic
	- Nodeで動くならそれの方が楽
	- DOMがないので楽
	- PhantomJSはPhantomJSという別のブラウザ対応が必要になってしまう
	- PhantomJSというレガシーブラウザ対応
- テストを別言語?
	- AltJSを使ってまでやるか微妙
- テストと数値
	- バグの発生曲線
- コードカバレッジ
	- メリットがあるならやる、目的がないならやらない


-----

## Styling Atom (Editor) - Simurai

- Atom Shell
- Atom ShellはChroniumとio.jsで動いてる
- lessで書いたスタイルが使われてる
- Twitter bootstrap + normalize.css
- AtomのスタイルはCSSをいじることで変更できる
- = Themes
	- ThemeはUIとSyntaxの2種類がある
- <atom-text-editor>` 中にあるstyleがSyntaxのスタイル
	- <atom-text-editor>`のShadow DOMのroot
	- Shadow DOMなのでUIとSyntaxのスタイルがそれぞれ影響受けない
	- ::shadow とかつかないとアクセスできない
- CSSのcolorは全部変数を使う
	- Themeで設定できるようにするため
- UserStyleというのが存在する
	- 既存のThemeに対して一部だけ修正を書ける
- [The CSS at... | CSS-Tricks](http://css-tricks.com/css/ "The CSS at... | CSS-Tricks") 
	- 良い記事


-----

> [Sushiイベントのガイドライン](https://github.com/meta-sushi/guideline "Sushiイベントのガイドライン")

## [#ゴーヤsushi](https://twitter.com/search?f=realtime&q=%23%E3%82%B4%E3%83%BC%E3%83%A4sushi&src=typd "#ゴーヤsushi")


<blockquote class="twitter-tweet" lang="en"><p>これが <a href="https://twitter.com/hashtag/%E3%82%B4%E3%83%BC%E3%83%A4sushi?src=hash">#ゴーヤsushi</a> <a href="http://t.co/GkT1HMmIQg">pic.twitter.com/GkT1HMmIQg</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/569075453492797440">February 21, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


ECMA 402(i18n API)は[ICU - International Components for Unicode](http://site.icu-project.org/ "ICU - International Components for Unicode")がないと実装できなかったのでは問題へのMSの対処

- [[MS-ECMA402]: Internet Explorer ECMA-402 ECMAScript Internationalization API Standards Support](https://msdn.microsoft.com/en-us/library/dn305667(v=vs.85).aspx "[MS-ECMA402]: Internet Explorer ECMA-402 ECMAScript Internationalization API Standards Support") これかな?

ブラウザは家電事業みたいという話(一度撤退すると再参入は難しそう)、TypeScriptは色々Syntaxとか増えてるけどAtScriptはほんとに上位互換なの?、[wooorm/mdast](https://github.com/wooorm/mdast "wooorm/mdast")の出力するASTは綺麗という話

- ReactのIEサポートはIE8から via [koba04](https://twitter.com/koba04/status/569100564534947841)
- [Strange Loop](https://thestrangeloop.com/ "Home - Strange Loop")というマイナー言語が集まるイベントについて
- [Strange Loop - YouTube](https://www.youtube.com/channel/UC_QIfHvN9auy2CoOdSfMWDw/videos "Strange Loop - YouTube")
- Immutable.jsって使ってますか? とReact Confの動画について
- [▶ React.js Conf 2015 - Immutable Data and React - YouTube](https://www.youtube.com/watch?v=I7IdS-PbEgI "▶ React.js Conf 2015 - Immutable Data and React - YouTube")
-  V8のTurbofunとasm.js(Spidermonkey) [ARE WE FAST YET?](http://arewefastyet.com/#machine=28&view=breakdown&suite=asmjs-apps "ARE WE FAST YET?")

## [#ルノアール_sushi](https://twitter.com/search?f=realtime&q=%23%E3%83%AB%E3%83%8E%E3%82%A2%E3%83%BC%E3%83%AB_sushi&src=typd "#ルノアール_sushi")

V8のStrong mode、ES6 moduleとCommonJS module(CommonJSのrequireはES6 moduleで実装できるが逆は難しい)、モジュールに自由度を持たせて全部サポートより制限を設けて実装進めたほうが動きが早かったのでは?という話、日本に呼びたいJavaScriptの人、エラーハンドリングの設計、Angular2についてなどの話をした。

- [Intro to Angular2](https://angular2-intro.firebaseapp.com/#/ "Intro to Angular2")


<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/%E3%83%AB%E3%83%8E%E3%82%A2%E3%83%BC%E3%83%AB_sushi?src=hash">#ルノアール_sushi</a> 会長のuse strongについてのLT</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/569123725863358464">February 21, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


- V8のフラグを見ていて"use strong"について気づいた
- SaneScript (strong mode)について
- 警告一覧をみてどういうものを制限していきたいかについてを見ていった
- [ES6時代のGoogle的Good Parts: V8のstrong modeを試す - ぼちぼち日記](http://d.hatena.ne.jp/jovi0608/20150219/1424322335 "ES6時代のGoogle的Good Parts: V8のstrong modeを試す - ぼちぼち日記")
- まずはSaneScriptで既存のJavaScriptに制限を設けてスピードアップ
- 更にそこへSoundScript(型システム)を追加して更にスピードアップするのでは?
- [まつもとゆきひろさん，Ruby 3に向けて組み込んでみたいアイデアを提案 ～ RubyKaigi 2014 2日目 基調講演：RubyKaigi 2014 レポート｜gihyo.jp … 技術評論社](http://gihyo.jp/news/report/01/rubykaigi2014/0002 "まつもとゆきひろさん，Ruby 3に向けて組み込んでみたいアイデアを提案 ～ RubyKaigi 2014 2日目 基調講演：RubyKaigi 2014 レポート｜gihyo.jp … 技術評論社")的に言うとV8は"パフォーマンス"としての型を入れたいのでは?
- (参考論文 がどこかに)
