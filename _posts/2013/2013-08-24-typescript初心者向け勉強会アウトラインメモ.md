---
title: TypeScript初心者向け勉強会アウトラインメモ
author: azu
layout: post
permalink: /2013/0824/res3396/
dsq_thread_id:
  - 1637241191
categories:
  - イベント
tags:
  - TypeScript
  - イベント
---
[TypeScript初心者向け勉強会 : ATND][1] に参加してきたメモ

## TypeScriptを使ったほうがいい場面、使わないほうがいい場面

> [TypeScriptを使う場面、使わない場面][2] 

型、クラス、モジュール、インターフェイス がある

### 型

*   変数や引数などに型を指定できる
*   なんでも示すany

    var name: string = "hoge";
    
    // functionでも
    // 引数にstringを受けて -> numberを返す
    function parseNumber(str: string) : number{
    }
    
    

### クラス

*   class syntax

ES6のclass syntaxに型指定(ES6にはないので)を持ってくれば大体似たような感じになる

### モジュール

*   .NETの名前空間に相当するもの
*   モジュール内のクラスや関数を `export` の有無で外部に公開するかを指定できる

### インターフェイス

*   クラスやオブジェクトにどういう実装を持つかを指定する(抽象)

    interface IPerson{
        name: string;
        birthday: Date;
        hello: ()=>void;
    }
    

### 型、クラス、モジュール、インターフェイスがあるメリット

*   型があることでどんな値が入る事を想定できる
*   プログラムの設計がしやすい
*   => テストやデバッグがしやすくなる、再利用性がアップする

### TypeScriptを使わない場合

*   モックのような本番じゃなくてとりあえず作る感じのもの
*   コードの行数が200行までに収まるようなライブラリ

* * *

## いつTypeScriptを始めるのか &#8211; kyo_ago

> [いつTypeScriptを始めるのか][3] 

*   まだ結構変更がある
*   コマンドライン引数がなくなったり/増えたり
*   安定性が低いstableが出てくる(0.9.0)
*   更新頻度が結構高い
*   わりと重い

今じゃない

*   ES6 simとしては中途半端

「まだつかわないほうがいいのか?」

条件次第

#### 静的言語がベースの人

*   静的言語の概念がそのまま使える 
    *   静的言語の概念がないと辛い
    *   静的言語の概念が結構はいってるのでその辺の事前情報が必要
*   エディタのサポートが得られる 
    *   エディタのサポートがないとりっちなLintになってhしまう
*   既存言語の近い設計が自然にできる 
    *   JSっぽい設計は特殊

#### 複数人での開発

*   ドキュメント書くよりは楽
*   コード間の整合性がとれているのか確認しやすい
*   メリットわかりやすいので型を書くモチベーションになる

#### 大きなフレームワーク上での開発

*   型情報もドキュメントなので、リファレンスを参照する回数が減る
*   静的言語の概念の上に構築されていれば理解しやすくなる
*   JavaScriptのフレームワークは独自概念が多いので、静的言語の上に作られたものなら共通概念に揃いやすい

#### 長くメンテする可能性が高いコード

*   既存部分を変更しても全体の整合性が保たれる
*   IDEのリファクタリングサポートを得やすい

#### 今後の位置づけの予想

*   これまでJavaScriptを書いてきた人に刺さる感じはあまりない
*   多言語からの呼び水としては非常にありそう
*   独自の言語圏になりそうな気がする
*   型情報を外してES6 simとしてだけ使うオプションも出るじゃないかな。

* * *

## TypeScriptを使ってみたり &#8211; mayuki

> [TypeScriptを使ってみたり // Speaker Deck][4] 

### TypeScriptの好きなとこ

*   型があるので、IDEでの補完がしやすい
*   コンパイルすること
*   出力されるコードが読めるコードが出てくる
*   C# 使いがなじみやすい
*   ゆるやかな型、かたい型も使える
*   割りと日本語の記事も増えてる
*   煩わしいことから解放される

### TypeScriptの開発環境

コンパイラ

*   Visual Studio 2012プラグイン
*   Node.js

エディタ

*   Visual studio
*   IntelliJ IDEA / WebStorm

Playground

*   オンライン上でコンパイルして動かせる

### TypeScriptの楽な場面

*   IDEでの補完が協力に発動する
*   jQueryなどのライブラリも定義ファイルを利用できる

### TypeScriptで困る場面

*   jQueryを利用していて `$(this)` が動かないケース
*   特定の型にキャストしたい

    (<any>nantokaObject).hauhau = 1;
    (<htmlcanvaselement>node).getContext('2d');
    

### TypeScriptの事例

*   とある教材的なWindowsアプリケーション
*   TypeScript0.8とKnockout.jsを採用 
    *   比較的読めるコードが出てくるので勢いで採用

#### 利点

*   コンパイル時にエラーが気づけるとコード自体の記述量が減った
*   実装がみやすかった

#### 欠点

*   (この時は)ジェネリクスがなかったのでKnockoutが使いにくい

### 謎社のソーシャルゲーム

JavaScriptをTypeScriptに書き直した

*   基本皆C#erなのでVisual Studio使っている
*   JavaScriptよりC#になじみがあった
*   コードの見通しをあげるため

### 書き方の統一

*   module、class, => などあることによって書き方が統一される
*   そういう意味でも複数人で書くときに向いてる

#### よくなかったところ

*   TypeScriptとJavaScriptの知識が両方必要になる

* * *

## JSer向けジェネリクス入門 &#8211; kyo_ago

> [JSer向けジェネリクス入門][5] 

### ジェネリクスとは

型パラメータ

    class Hoge < この部分に書く> {
    }
    

*   型を外部から渡せるようにしたもの
*   動的言語には無縁
*   とりあえず無視してもOK
*   ちゃんと設計するなら必要

なぜ分かりにくい

*   「TypeScript ジェネリクス」で検索して静的言語圏では当然の知識
*   型の恩恵を受けた後じゃないとわかりにくい
*   TypeScriptのサポートも最近

どういう場合で使うのか

*   任意の型を受け取って返す場合
*   anyを使うと型情報が失われる
*   型変換は実行時エラーになってしまう
*   *   実行時エラーでいいなら型変換

    class Hoge <t> {
            var value: T;
            get (): T {
                return this.value;
            }
            set (value: T){
                this.value = value;
            }
    }
    

*   `T` はなんでもいい、ただの変数名 
*   Javaのジェネリクス解説を見る

* * *

## TypeScriptで作成したツールについての解説と質疑応答

> [o2project/html5pawapo][6] 

*   TypeScriptで書いたスライドライブラリの解説</t></htmlcanvaselement></any>

 [1]: http://atnd.org/events/42372 "TypeScript初心者向け勉強会 : ATND"
 [2]: http://kubosho.github.io/slides/tsbeginner/ "TypeScriptを使う場面、使わない場面"
 [3]: http://0-9.sakura.ne.jp/pub/tsbeginner/start.html "いつTypeScriptを始めるのか"
 [4]: https://speakerdeck.com/mayuki/typescriptwoshi-tutemitari "TypeScriptを使ってみたり // Speaker Deck"
 [5]: http://0-9.sakura.ne.jp/pub/tsbeginner/generics.html "JSer向けジェネリクス入門"
 [6]: https://github.com/o2project/html5pawapo "o2project/html5pawapo"