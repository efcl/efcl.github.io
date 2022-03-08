---
title: Objective-C勉強会＠東京 ６月 でNSDateについて発表してきた
author: azu
layout: post
permalink: /2013/0607/res3295/
dsq_thread_id:
  - 1375020350
categories:
  - iOS
tags:
  - iOS
  - イベント
---
# Objective-C勉強会＠東京 ６月

[Objective-C勉強会＠東京 ６月 &#8211; PARTAKE][1] に参加してきた & 発表してきたメモです。

* * *

# 「Storyboardの使い方」- @akuraru　

## Segue

*   Segueの使い方
*   prepareForSegueで遷移先のインスタンスを取得して値を渡せる

## StoryBoardを使ったアプリの解説

*   Todo ライクなシンプルなアプリ
*   追加、編集、キャンセル(戻る)、保存の機能を持つ

### 値の追加

*   追加 遷移-> 戻るときに前のViewControllerオブジェクトをdelegateに入れておいて、値を設定する
*   IBOutlet、IBACtionを使って簡単にStoryBoardとコードを結び付けられる

### iOS6から増えたView

*   CollectionViewとContainerViewが追加された
*   ExitというUnWindなOutletsが増えた
*   UnWindはBackという逆方向対するSegueを定義できる

## StoryBoardとは

*   静的なViewと遷移を記述dケイル
*   ある程度可変性を持ってる
*   複数のStoryBoardを使うこともできる
*   動的な部分はObjective-Cで付ける

## iOS6で増えたもの

*   auto layout
*   unwind segue
*   collection view
*   container view

## StoryBoardのライフサイクル

*   init -> loadVie -> viewDidLoad -> viewWillAppear -> viewDidAppear
*   viewWillDisappear -> viewDidDisappear &#8211; > viewDidDIsappear

### 戻る時のライフサイクル

*   戻るときはviewWill*を呼ばれる

* * *

「NSDate A Live」 &#8211; @azu_re

*   スライド : [NSDate A Live][2]
*   テストコード: [azu/NSDateALive · GitHub][3]

NSDateやNSDateFormatter、NSDateComponentsなどといった日付関係の話について発表して来ました。

NSDateを操作する方法は色々ありますが、和暦、24時間表示等ハマリ所も色々あります。  
実際にテストコードを色々書いたので、[azu/NSDateALive · GitHub][3]を見てみるといいかもしれません。

最後のほうにも書いてますが、[azu/NSDate-escort · GitHub][4]というライブラリを書き始めています。

できるだけシンプルな実装で、NSDate関連で大抵のことはできるようなライブラリにしたい感じです。

 [1]: http://partake.in/events/54f3c547-5ffa-4fd4-8de6-d95788cb3915 "Objective-C勉強会＠東京 ６月 - PARTAKE"
 [2]: https://azu.github.io//slide/OCStudy/2013_June/nsdate_a_live.html#/ "NSDate A Live"
 [3]: https://github.com/azu/NSDateALive "azu/NSDateALive · GitHub"
 [4]: https://github.com/azu/NSDate-escort "azu/NSDate-escort · GitHub"
