---
title: "Firefox Developers Conference 2015 アウトラインメモ"
author: azu
layout: post
date : 2015-11-15T20:34
category: イベント
tags:
    - Firefox
    - イベント

---

[Firefox Developers Conference 2015](http://www.mozilla.jp/events/devcon/2015/tokyo/ "Firefox Developers Conference 2015 in Tokyo Hack, Inspect &amp; Ignite | Mozilla Japan")に参加してきたのでメモ。

Tokyoでは久々のFirefox Developers Conferenceだった。

- [Mozilla Vision 2012 Conference Day アウトラインメモ | Web Scratch](http://efcl.info/2012/0121/res2997/)
- [Firefox Developers Conference 2010 アウトラインメモ | Web Scratch](http://efcl.info/2010/1121/res2092/)
- [Firefox Developers Conference 2009 アウトラインメモ | Web Scratch](http://efcl.info/2009/1108/res1424/)


-----

##  Inspection & tweak: Firefox を使ったフロント開発 清水智公

- Firefoxの開発者ツールは見るだけじゃなくていじれるようにしてる
- ネットワーク
	- 通信の内容を見れる
	- HARでダンプを保存できる
	- HARで他のツールで読み込ませることができる
- DOM
	- "要素を調査" 要素からそのままInspectできる
	- Style Editorで編集、保存ができる
- Canvas
	- Canvas Editor フレーム毎の描画や関数の呼び出しを記録して確認できる
- Storage
- Flame Chart
	- タイムラインで色々見られる

-----

## Porting C/C++ code to Web 加藤 誠

- 既存のC/C++ライブラリを使ってやる
	- デスクトップならFFIだったり
	- JavaScriptにわざわざ移植するのは大変
- Fx0のIME
	- 今までのやつC <-WebSocket -> JSとしてる
	- 新しい奴はJSで動く
- 過去のC/C++ -> Web
	- NPAPI
	- ActiveX
	- NaCL/PNaCL
	- Extension/Addon
- NPAPI
	- Netscape PLugin API
		- 1990年台にデザインされたもの
		- サンドボックスをもたない
		- FirefoxとSafariでサポート
			- 過去にもはIEやChromeもサポートしてた
	- ActiveX
		- WindowsとCOMに依存
		- IE4 for Macは実はサポートしてた
		- サンドボックスは持たない
		- デジタル署名が必要
		- IEのみサポート
	- NaCL/PNacl
		- ネイティブコードを各プラットフォームへコンパイル
	- Addons/Extensions
		- アドオンがC/C++で書かれたものとプロセス通信でやり取り
		- 標準入力 <-> 標準出力
	- 今のプラグイン
		- ChromeはNPAPIのサポートを終了している
		- Firefox Win64はNPAPI Flashのみしかサポート
		- Mozillaとして将来的にFlash以外のサポートを止めるかも
		- SilverlightやJavaなどはサポート切りたい
	- DRM
		- FlashやSilverlightを使う理由はDRMがある
		- EMEという仕様がある
		- NetflixはEMEをサポート
			- Chrome, IE/Edge, Firefoxがサポート
	- NaCl/PNacl/PPAPI
		- サンドボックス
		- NaCLはCPU依存、PNaCLは非依存
		- Chrome(Blink)のみ
			- FlashはPPAPIベース
	- プラグイン
		- プラグインの仕組みをMozillaとしては無くしたい
		- Always bet on JS
	- emscripten
		- C/C++ -> JavaScript
		- コンパイラツールとライブラリ
		- どのエンジンでも動くJavaScriptを吐く
		- clang/LLVMベース
			- 専用のバックエンドを持ってる
			- C -> LLVM Byte ->(mscripten) JavaScript
	- emsdk
		- emscriptenのインストーラ
		- emscripteのバイナリをダウンロードできる
	- emscripten tools
		- emconfigure
			- configureのラッパー
			- emscriptenの設定を自動的に設定される
		- `$HOME/.emscripten`
		- パスをいれるだけ
	- JavaScriptから呼べる関数
		- どの関数をexportするかを書く必要がある
		- 初期化のデータを分けることもできる
	- `ccall` と `cfunc`
		- `cfunc`で関数を作れる
	- `types`
		- void
		- number (大抵ここ、pointer)
		- string
	- Builtin functions
		- `Module._malloc`
		- `module._free`
		- `Module._UTFxxString`
		- みたいな関数がある
	- File access
		- Emscriptenは標準ライブラリをサポートするので`fopen()`などもある
		- ただし、コンパイル時に`--preload-file`などで指定する必要がある
	- emscriptenとゲーム
		- ゲームのためのライブラリが多い
		- 元々ゲームエンジンを早く動かしたかった
		- いまはpthreadも動く
	- Inline JavaScript
		- JavaScriptを埋め込める
	- デバッグ
		- `emcss -g3 <source>`
		- SourceMapを吐ける
	- パフォーマンス
		- SHA1 Hashの実装
		- JavaScript(on Node.js) 2.0秒
		- C実装(x86_64) 0.6秒
		- C実装(on Node.js) 3.2秒
		- ぐらい
	- emscripten code
		- JITされやすいコードを利用
		- `var x = x|0` = int型になる
		- TypedArrayを使ったりする
	- asm.js
		- 新しい言語ではなくてJavaScriptのサブセット
		- Type annotation
		- Typed Array
		- AOT compile
			- 最適化済みのコードを使う
		- Unreal
		- Unity
		- Firefox OS
	- asm.js
		- SHA1 Hashの実装(C -> asm.js)
		- asm.js 1.1秒
		- Cの2倍コード
		- しかし、ファイルがめっちゃでかい
	- asm.js
		- OpenWnn 5MB JS
		- asm.jsはテキスト形式なので構文解析も遅い
		- Unreal Engine 20-30秒
	- Web Assembly
		- バイナリフォーマット
		- テキストフォーマットもある
		- 型システム
		- SIMD(128bitのみ)
		- メモリモデル wasm32/wasm64
	- MVP(Minimum Viable Product)
		- はじめのバージョンがでるまでに作らないと行けないもの
		- Module
		- AST
		- バイナリフォーマット
			- 一回決めたら固定される
			- なので最初には入れない
		- テキストフォーマット
		- 各エンジンでの実装(ウェブブラザ、Nonウェブブラザ)
		- Polyfill
	- Post MVP
		- 一度stable -> 次
		- Thread
		- SIMD(f32x4 ARMのやつ)
		- いくつかのC++例外
	- asm.js -> wasm
		- asm.js -> WebAssemblyへのトランスレーター
		- inaryan
		- emscriptenは既にプロダクションレベル
		- asm.js はある程度信用できる
		- なのでasm.js -> wasmしてやるといい感じにいけそう
		- LLVM WebAssemblyバックエンドが実装される予定
	- wasmｒの例
		- S式になる
	- VM
		- Chakra
		- JavaScript Core
			- 既にwasm吐ける
		- SpiderMonkey
		- V8
	- デモ
		- `asm2wasm`でasm.js -> wasmへ変換できる
	- まとめ
		- EmscriptenでC/C++ -> JavaScriptへ変換できる
		- Emscripteは色々できる
		- WebAssemblyという新しい仕様を策定中
		- 全てのブラウザで実装予定


-----

## ES6 in Practice 佐藤 鉄平

> スライド: [ES6 in Practice](http://www.slideshare.net/teppeis/es6-in-practice "ES6 in Practice")

- ES6, ES7
- ES6 Modules
	- ES6 ≠ Babel
	- TypeScript
	- Rollup
	- HTTP/2
- ES6
	- JavaScriptの仕様
	- Ecma Internationが標準化
	- ISOでも標準化
	- TC39が策定
		- 全てのブラウザベンダーとウェブ開発者の企業が参加
	- 構文と組み込みオブジェクトが増えた
	- 組み込みメソッドの追加
	- ES2015が正式名称
- ES.next
	- TC39 Process: Annual
	- 機能単位で策定される様になった
	- バージョン単位での策定ではない
	- Stageの5段階レベル
	- Stage 4を毎年20xxとして出す
- Stage 0
	- アイデア
	- GitHub PRで提案ができる
	- チャンピオンがつけばStageを進められる
- Stage 4
	- 仕様公開の準備完了
	- 2つ環境で実装済みでないといけない
- ES2016
	- ES6のバグ修正が中心
	- 2016年6月に公開予定
		- `Arrayn#includes` のみがStage 4になってる
		- exponential operatorやasync/awaitなどはStage 3
- ES7言うな問題
	- ES7には殆ど新機能入らない
	- ES7 Decoratorみたいな表現はおかしくなる可能性がある
	- バージョン番号より機能単位で語られていくだろうという話
- ES6 Modules
	- 1ファイル1モジュール
	- staticで宣言的なシンタックス
	- strictモード
	- 循環参照に対応(仕様として書かれてる)
- Syntax
	- Default export/import
	- Named export/import
		- 名前付きでexport
	- mixして書ける
- Default exportがオススメ
	- ES6 ModulesはDefault Exportが最も使いやすいようになってる
	- Named Exportは、バインディングを知らないとimportできない
	- シンプルなのは1module = 1export
- Static and Declarative
	- 静的で宣言的
	- 実行しなくても解析にSyntaxErrorが分かる
	- 実行する前に存在しないファイルなどがないとか分かる
	- Browserifyとか解析ツールなどが書きやすい
		- CommonJSな場合は呼ばないかもしれないものも含めないと上手く行かないケースがある
	- 最適化しやすい
- 実行前エラー
	- export defaultの重複
	- 存在しないファイルをimport
	- 存在しないバインディングをimport
- default exportのプロパティとnamed exportは異なる

```js
// export.js
export default {
	foo: "Default Propety";
}
export var foo = "named";
// import.js
import {foo} from "./export.js";
console.log(foo); // "Named"// Named
```

- Named exportしたものがNamed importでバインディングを取れる
- Script or Module
	- Moduleの場合
		- 強制的にstrictモード
		- トップレベルthisはundefined
		- トップレベル変数がグローバルにならない
- ScriptとModuleってどうやって指定するの? とか未定義な部分
- ES6 Modules
	- ES6でのModulesは半分ぐらいしか決まってない
	- シンタックスとセマンティックのみ
	- Loader、Dynamic APIは未定義
- WHATWG
	- WHATWG/Loader
	- ブラウザのローダーを中心に議論中
	- `<script type="module" />` という提案
	- ScriptとModuleの区別
	- 識別子
- JSC shellでES6 Modules体験
	- JSCでLoaderの初期実装
	- Macはバイナリがある
	- jscshell -m で試せる
- Roadmap of Loader
	- Milestone 0 - 3
	- ブラウザを中心にした議論
- Node.jsでは
	- npmはNode.js待ち
	- Node.jsはV8待ち
	- V8はwhatwg/loader待ち
	- 論点: CommonJSとの相互運用
	- ES6 Module importでCommmonJSを読む
	- CommonJS `require()`でES6 Moduleを読む
- CommonJS
	- CommonJSはただの関数なので、動的に動く
	- パースしてもexportされてるか分からない
- Babelでは(v5)
	- CommonJS変換
	- 識別子はNode.jsと同じ
	- CommonJSとの相互運用性を重視
	- ES6 moduleという印を付ける
	- `.default`と`module.export`にexportしてる
	- importはinteropRequireをかましてrequireする
	- CommonJSでもES6 Moduleでもimportできるようにしてる
	- 問題点
		- staticなsyntax errorが失われてる
- Babel 6での変更
	- `module.export = xxx` がなくなった
	- CommonJSから読むには`require("i.js").default`とする必要があった
- Babel Risk
	- ES6 modulesは仕様未決定の部分が多い
	- Babelの独自解釈成分も強い
	- Babelの解釈変更やNode.js/ブラウザとは異なる可能性がある
- TypeScriptでは
	- TypeScript ModuleをES6 moduleとしてimportできない
	- TypeScript Module <-> ES6 Moduleの相互運用はできない
	- 休憩式のモジュールは旧形式でロード
	- ES6モジュールはES6形式でロード
	- 文法が2種類あるが、独自解釈が入りやすい相互変換は避けている
- Transpiler
	- 生産性の高い機能を実行環境に実装される前から使いたい
	- 標準化されているから将来性がある
	- というのが本来
- ES6 Modulesを今使う
	- 標準化まだ途中、相互運用性はツール依存、将来動作しない可能性も
	- 一回立ち止まって考える
	- 静的であることがまだツールを活かせていない
- Rollup
	- Browserifyみたいなツール
	- staticな文法を最大限活用してる
	- 最適化で未使用なバインディングを削除してる
	- 未使用な変数を削除してる
		- CommonJSだとプロパティに代入されたものを削除するというのと同じになる
		- そのためアグレッシブな削除じゃないとできなかった
- `jsnext:main`
	- `main` とは `jsnext:main` 
	- npmはbrowserifyで変換したものだけをpublishするのが普通
	- npmにもES6 modulesで書かれたものを含めて`jsnext:main`で指定できるようにするという話
	- 両方の強みを持つよう
- まとめ
	- 「ES6 Modulesはいまから使える」は言いすぎた
	- Babelの独自解釈がある部分もあるのでその辺の危険性は理解して使いましょう

----

## Web 技術の今日とこれから：View Source Conference レポート 矢倉 眞隆

- 合計3日間のポートランドで行われたカンファレンス
- Ignite View Source(前夜祭)
	- 一人20枚、15秒で強制めくりのLT
	- ウェブ開発とはちょっと違う所の人が多かった
- [Schedule - View Source](https://viewsourceconf.org/schedule/)
- [Mozilla ViewSource Conferenceが本日開幕、前夜祭はLTイベント「IGNITE」で大盛り上がり (1/2)：CodeZine（コードジン）](http://codezine.jp/article/detail/9069)
- カンファレンス初日
	- いろんなパターンを挙手させていって、大体の人が挙手する状況を作って、それらは決して遠いものではないとわからせるテクニック
	- カンファレンスについての議論もあった
	- 後半になるとテクニカルな話が多くなってきた
		- デザインは夢見がちなものとなりやすいけど、ちゃんとそれをコードと落とせるようにコミュニケーションを取らないといけないねという話
		- [SVG For Web Designers (and Developers)](http://www.slideshare.net/SaraSoueidan/svg-for-web-designers-and-developers "SVG For Web Designers (and Developers)")
		- [Designing Flexible Pie Charts With CSS and SVG — Smashing Magazine](http://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/ "Designing Flexible Pie Charts With CSS and SVG — Smashing Magazine")
	- アフターパーティーが豪華
- カンファレンス2日目
	- WebAudioの話
	- WebAnimation
	- [State of the animation 2015 - View Source](https://viewsourceconf.org/session/state-of-the-animation-2015/ "State of the animation 2015 - View Source")
	- WebVRの話
		- VRをウェブに持ち込むのはなぜ?
		- ウェブというのはアクセスしただけですぐに見られるのが強み
		- なので広く使われることで新しい表現が生まれるのではという話
		- WebComponent + WebVR
		- タグで簡単にVRできるもの
		- VRにおける青い下線 = リンクという標準的な表現はまだない
		- なので、VRにもそういう表現がやってくると面白いのではという
	- メインセッション -> ディスカッション -> メインセッションという話
	- Fire side chat = 会場にいる人からの質問に応えるコーナー
	- wasmの話を[lukewagner (Luke Wagner)](https://github.com/lukewagner "lukewagner (Luke Wagner)")さんがしていた
		- wasmはJavaScriptを殺すものではない
		- 最初のターゲットは数十万行あるようなC/C++のコード
		- MathStudioとかを例に
		- ゲームをターゲットにしてるのは触媒として
	- JavaScript Today
		- Allenさんが質問者を壇上にあげて答えてた
		- [ECMAScript 2015はなぜ策定まで時間がかかったか？ 仕様策定のリーダー、アレン・ワーフスブラック氏に聞く：CodeZine（コードジン）](http://codezine.jp/article/detail/9071 "ECMAScript 2015はなぜ策定まで時間がかかったか？ 仕様策定のリーダー、アレン・ワーフスブラック氏に聞く：CodeZine（コードジン）")
		- TC39という標準化団体しかできないことに注力する
		- ES.nextでは1年ごと、機能ごと
	- Googleの人
		- Progress App
- スピーカーとディスカッション
	- 発表するだけじゃなくてディスカッションの時間を色々作ってる
	- ディスカッションとしてのカンファレンスが多い
	- カンファレンスとディスカッションのバランスの話