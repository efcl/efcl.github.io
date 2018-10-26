---
title: Objective-C勉強会@東京9月でUILocalNotificationのパターンとテストについて発表した
author: azu
layout: post
permalink: /2013/0906/res3420/
dsq_thread_id:
  - 1723211631
categories:
  - iOS
  - イベント
tags:
  - iOS
  - test
  - スライド
---
[Objective-C勉強会@東京 ９月 &#8211; Objective-C勉強会＠東京 | Doorkeeper][1] に参加してきたメモとスライドです。

* * *

## UILocalNotificationのパターンとテスト &#8211; azu

- <a href="http://azu.github.io/slide/OCStudy/2013_September/UILocalNotification.html#slide1">UILocalNotificationのパターンとテスト</a>

自分が発表したUILocalNotificationのパターンについてのスライドです。

以前書いた[UILocalNotificationを使った通知の設定について — ios-practice 0.1 documentation][2]をベースにしています。

上記の文章には入れてなかった

*   繰り返し
*   音と表示時間の関係

などについて含めているので、UILocalNotificationでやることについては大体入ってる気がします。

スライド中でも繰り返し書かれている &#8220;通知全てをキャンセルしてから登録し直す&#8221; というパターンについては、以下のような考えが根底にある気がします。

UILocalNotification による通知はそのまま登録する永続オブジェクトのように動くが、動き的にはセッションごと(今回はアプリがバッググラウンドに行くまでがひとつのサイクル)に通知捨てるような動作の方が分かりやすくなる。

CoreDataみたいな普通の永続オブジェクトの場合だと、削除して追加し直すような動作は無駄な処理に感じるけど、UILocalNotificationの通知の場合は

<pre>単純化できるメリット > 毎回登録し直す処理コスト
</pre>

という感じがしてるので、キャンセルしてから登録し直すパターンを採用してる事が多い気がする。

また、[バックグランド移行時に登録][3]するパターンを採用することで、&#8221;毎回登録し直す処理コスト&#8221;が UIに与える影響が小さくなるという点もあるので、こういうパターンが使いやすいと思っています。

* * *

## TableViewAgent &#8211; @akuraru

*   TableViewをつかうと100行ぐらいは突破
*   ViewControllerは小さくしたいので書いた
*   [TableViewAgentを作りました。 &#8211; いつもあさって!!][4]
*   [akuraru/TableViewAgent · GitHub][5]

### MVC

*   モデルの状態をViewが表示しているだけ
*   View -> Model を参照
*   View -> Model にするとViewで計算をして表示しなくちゃ

TableViewAgenet

    Controller -> Service - > Model
                 -> ViewObject -> View
                 -> VIew
    

*   ViewはViewObejctだけを見て表示を変える
*   一つのViewObjectに対してUITableViewCellを割り当てる</p> 
*   Todoなら、ViewObjectに時間や名前を入れる

*   ViewObject < -> UITableViewCell

ViewObjects は ViewObjectの配列とする

## TableViewAgent

*   TableViewDelegate の代行クラス
*   最小のモノだけDelegateで提供

* * *

## TableViewでやりたいこと

*   配列の内容を表示する
*   要素に合ったCellの選択
*   Cellを選択したの時の挙動
*   Cellの削除

### 提供してるメソッド

*   viewObjectsの設定
*   編集モードへの移行

## 利点

*   TableViewの何番目かを考えないようにする
*   NSIndexPathの代わりにViewObjectを返す

### 利用フロー

*   ViewAgentを作成
*   viewObjectを作ってagent.viewObjectsに設定する
*   Agentのdelegateをメソッドを実装する
*   drawで描画し直す

* * *

## instacetype と typeof(self)

- <a href="http://azu.github.io/slide/OCStudy/2013_September/instancetype_self.html#slide1">instacetype と typeof(self)</a>

もう一個発表した、instancetype型とtypeofなどについてです。

5分ぐらいで書いたのでかなり大雑把ですが、instancetype型は便利なので使えるところは積極的に採用するべき的な話です。

 [1]: http://ocstudy.doorkeeper.jp/events/5336 "Objective-C勉強会@東京 ９月 - Objective-C勉強会＠東京 | Doorkeeper"
 [2]: http://ios-practice.readthedocs.org/en/latest/docs/notification/ "UILocalNotificationを使った通知の設定について — ios-practice 0.1 documentation"
 [3]: http://azu.github.io/slide/OCStudy/2013_September/UILocalNotification.html#slide17 "バックグランド移行時に登録"
 [4]: http://d.hatena.ne.jp/akuraru/20130708/p1 "TableViewAgentを作りました。 - いつもあさって!!"
 [5]: https://github.com/akuraru/TableViewAgent "akuraru/TableViewAgent · GitHub"
