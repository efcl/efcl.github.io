---
title: NSAttributedString/TextKit, iOS6/7で非推奨になったメソッド、最近作成したライブラリについて発表してきた
author: azu
layout: post
permalink: /2013/1102/res3462/
dsq_thread_id:
  - 1926974720
categories:
  - iOS
  - イベント
tags:
  - iOS
  - Objective-C
  - イベント
---
[Objective-C勉強会@東京 １１月][1] に参加してきました。  
テーマは &#8220;今だからこそ学ぶiOS6&#8243; で、自分は NSAttributedStringとTextkit、またiOS6でdeprecatedとなったメソッドなどについて発表してきました。

* * *

- <a href="https://azu.github.io//slide/OCStudy/2013_November/nsattributedstring.html#slide1">NSAttributedString と TextKit</a>

[NSAttributedString と TextKit][2] ではiOS6から入ったNSAttributedStringでどのような事ができるのかと、iOS7からその辺の仕組みが一新されてTextKitになったので、TextKitはどのような構造になってるのかを紹介しています。

実際に中身まで調べる時間がなかったので、[Getting to Know TextKit – #5 – iOS 7][3]をかなり参考にして書いています。

- <a href="https://azu.github.io//slide/OCStudy/2013_November/deprecated_ios6_7.html#slide1">deprecated! deprecated!</a>

[deprecated! deprecated!][4] では、iOS6や7でどのようなメソッドが非推奨になってるかを書いています。

基本的には `NS_DEPRECATED_IOS(5_0,6_0);` のようなマクロで定義されるのですが、  
`UIButtonTypeRoundedRect` のようにコメントで書いてあるだけというものもあるので調べて見ると色々出てきます。

- <a href="https://azu.github.io//slide/OCStudy/2013_November/mylibrary.html#slide1">最近作ったiOSのライブラリ紹介</a>

最後の[最近作ったiOSのライブラリ紹介][5]はiOS6はあんまり関係なく、最近作って公開したiOSのライブラリについてまとめています。

リスト的にまとめると

*   [NSDate-Escort][6] 
    *   日付操作ライブラリ
*   [AZDateBuilder][7] 
    *   指定日のNSDate作成
*   [SimpleUserDefaults][8] 
    *   プロパティがそのままNSUserDefaultsの読み書きにできる
*   [BenchmarkTestCase][9] 
    *   XCTestを拡張してテストと同じようにベンチマークを取れるようにする
*   [OperationPromise][10] 
    *   NSOperation同士の依存関係を簡単に示すためのライブラリ
*   [UITextSubClass][11] 
    *   UITextField / UITextView のサブクラスライブラリ郡
*   [XUIRoundedRectButton][12] 
    *   iOS7でもiOS6の `UIButtonTypeRoundedRect` 風のボタンを使える
*   [AAMFeedback][13] 
    *   お問い合わせライブラリのfork版
*   [ManagedMappingObject][14] 
    *   `NSManagedObject` < -> `NSDictionary` の相互変換
*   [CounterAgent][15] 
    *   起動回数を数えて、指定回数だったらメソッドを呼ぶ
*   [azu/NavTintTester7 · GitHub][16] 
    *   iOS7のナビゲーションバーの色変更等を確認するためのアプリ

* * *

以下はメモです

akuraru

## NSHashTable

*   weak版 NSSet
*   オブジェクト開放された場合、NULLで埋められる
*   strong として知られる
*   ブロックを抜けるとちゃんと中身はなくなるけど、countが維持されてたり変

## NSMapTable

*   weak版 NSDcitionary
*   カウントはなぜか抜けた後も維される

## NSPointerArray

*   NSArrayのPointer版
*   Cのポインターを扱うためのクラス

## NSPointerFunctions

*   Cの関数をオブジェクト化するもの
*   関数ポインターをメンバー変数として持てる
*   よくわからなかった機能

*   これらはARCとGCの場合は非推奨

* * *

 [1]: http://ocstudy.doorkeeper.jp/events/6543 "Objective-C勉強会@東京 １１月"
 [2]: https://azu.github.io//slide/OCStudy/2013_November/nsattributedstring.html#slide1 "NSAttributedString と TextKit"
 [3]: http://www.objc.io/issue-5/getting-to-know-textkit.html "Getting to Know TextKit – #5 – iOS 7"
 [4]: https://azu.github.io//slide/OCStudy/2013_November/deprecated_ios6_7.html#slide1 "deprecated! deprecated!"
 [5]: https://azu.github.io//slide/OCStudy/2013_November/mylibrary.html#slide1 "最近作ったiOSのライブラリ紹介"
 [6]: https://github.com/azu/NSDate-Escort "azu/NSDate-Escort · GitHub"
 [7]: https://github.com/azu/AZDateBuilder "azu/AZDateBuilder · GitHub"
 [8]: https://github.com/azu/SimpleUserDefaults "azu/SimpleUserDefaults · GitHub"
 [9]: https://github.com/azu/BenchmarkTestCase "azu/BenchmarkTestCase · GitHub"
 [10]: https://github.com/azu/OperationPromise "azu/OperationPromise"
 [11]: https://github.com/azu/UITextSubClass "azu/UITextSubClass · GitHub"
 [12]: https://github.com/azu/XUIRoundedRectButton "azu/XUIRoundedRectButton · GitHub"
 [13]: https://github.com/azu/AAMFeedback "azu/AAMFeedback · GitHub"
 [14]: https://github.com/azu/ManagedMappingObject "azu/ManagedMappingObject · GitHub"
 [15]: https://github.com/azu/CounterAgent "azu/CounterAgent · GitHub"
 [16]: https://github.com/azu/NavTintTester7 "azu/NavTintTester7 · GitHub"
