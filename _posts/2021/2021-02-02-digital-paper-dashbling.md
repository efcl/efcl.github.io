---
title: "電子ペーパを使ったダッシュボードを設置した"
author: azu
layout: post
date : 2021-02-02T23:26
category: 雑記
tags:
    - 電子ペーパ
    - JavaScript

---

[Likebook Mars 7.8](https://www.amazon.co.jp/dp/B07MBD7RLY/)(電子ペーパ) + [Dashbling](https://github.com/pascalw/dashbling) + [Fully Kiosk Browser](https://play.google.com/store/apps/details?id=de.ozerov.fully&hl=ja&gl=US)で、電子ペーパを使ったダッシュボードを作って動かすようにしたメモです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">電子ペーパーのダッシュボードを壁に設置した。<br>likebook mars + Fully kiosk Browser + dashbling.<br>結局材料みつけられなかったので、<br>余ってたエレコムのケーブル結束クリップで貼り付けた。<br>壁にマスキングテープ⇨梱包テープ⇨結束クリップで固定してるので簡単に剥がせる。 <a href="https://t.co/LpLARCP3at">pic.twitter.com/LpLARCP3at</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1356595131055398918?ref_src=twsrc%5Etfw">February 2, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

最近[Likebook Mars](https://www.amazon.co.jp/dp/B07MBD7RLY/)をあまり使ってなかったので物理的?なダッシュボードとして使うことにしてみました。

きっかけは[Dashbling](https://github.com/pascalw/dashbling)の作者がKindleを使ったダッシュボードを作ってるのみてよさそうと思って、[Dashbling](https://github.com/pascalw/dashbling)をいじってたら半日ぐらいでできました。

- [pascalw/kindle-dash: Power efficient dashboard for Kindle 4 NT devices](https://github.com/pascalw/kindle-dash)

## ダッシュボード

[Dashbling](https://github.com/pascalw/dashbling)というReactでダッシュボードアプリを書けるツールを使っています。

[Dashbling](https://github.com/pascalw/dashbling)はサーバ側のCronで一定間隔ごとにイベントデータを作って、そのファイルの更新をSever Sent Eventで送ってフロントのダッシュボードを更新するシンプルな仕組みです。
Hot Reloadなども対応しているので、実際に[Likebook Mars](https://www.amazon.co.jp/dp/B07MBD7RLY/)にLocal IPを表示させて、サーバを再起動するだけで画面が更新されたのでデバッグが楽でした。
デプロイも、デプロイするだけで画面が更新される(同じ仕組みでイベントデータが更新される)ので、電子ペーパを触らなくても開発できるのは良かったです。

最初に写真にあるような[Dashbling](https://github.com/pascalw/dashbling)のコードは、次にリポジトリにスナップショットとして置いてあります。

- [azu/my-dashbling-example](https://github.com/azu/my-dashbling-example)

今は次のような項目を表示しています。

- カレンダー
    - iCal URLを読み込んで使う
- 時計
    - ただのSetIntervalな表示する[Clock](https://github.com/azu/my-dashbling-example/blob/main/widgets/calendar/Calendar.js)
- 天気、室温、湿度
    - [Nature Remo](https://nature.global/)と[OpenWeather](https://openweathermap.org/)の組み合わせ
- JSer.info Status
    - [jser/dataset: JSer.infoのデータセットや処理ライブラリ](https://github.com/jser/dataset)を使って更新タイミングを知らせる
- TODO
    - [GitHub Issuesを個人用のTodo管理アプリとして使っている](https://efcl.info/2020/12/25/missue/)のでGitHubリポジトリのProject Boardのデータを出している
    - 時間とか曜日で、どのProjectを出すかとかを切り分けている
- メッセージ(右下)
    - 任意のメッセージをAPI叩くと表示できる

[Dashbling](https://github.com/pascalw/dashbling)の面白い機能として、
サーバのAPIを叩くと、そのデータをイベントデータに追加できます。

```
# "notification" イベントに JSON データを送る
curl -XPOST -H "Content-Type: application/json" \
			-H "Authorization: bearer YOUR_AUTH_TOKEN" \
			-d '{"message": "メッセージ"}'
			http://localhost:3000/events/notification
```

このイベントデータは[`connect("notification")(Notification)`](https://github.com/azu/my-dashbling-example/blob/a8832b1f616f14c53fa4dac42c34cdbbbf601532/Dashboard.js#L15)のような形でWidgetのPropsに渡されます。
あとは、このデータを[表示](https://github.com/azu/my-dashbling-example/blob/a8832b1f616f14c53fa4dac42c34cdbbbf601532/widgets/notification/Notification.js)するだけど、APIを叩くと表示されるWidgetが作れます。

サーバはHerokuとかにデプロイすればいいので、結構楽でした(一定間隔でPingするのでHerokuが無料プランで止まらない)

## ダッシュボードを表示する

[Likebook Mars](https://www.amazon.co.jp/dp/B07MBD7RLY/)の実体はただのAndroidなので、[Fully Kiosk Browser](https://play.google.com/store/apps/details?id=de.ozerov.fully&hl=ja&gl=US)を使ってダッシュボードのURLを指定して表示しています。
([Dashbling](https://github.com/pascalw/dashbling)はBasic Authとかも対応してるので、公開したくない場合は設定しておくのがよさそうです)

[Fully Kiosk Browser](https://play.google.com/store/apps/details?id=de.ozerov.fully&hl=ja&gl=US)は指定したURLをキオスク端末的に表示してくれるアプリです。
また、何時になったらスリープ、何時になったらスリープから復帰とかも設定できるので、基本放置できる感じです。

電子ペーパなので、基本的にバックライトなしで動かしています。
ネットワークを使うのでさすがにバッテリーは消費しますが、まあ消耗品なのでいいかなと思います。
(元ネタの[pascalw/kindle-dash](https://github.com/pascalw/kindle-dash)は画像を表示してるので効率よさそう)

## 壁にダッシュボードを貼る

ダッシュボードなので壁に貼り付けています。

壁紙があるので[マスキングテープ](https://www.amazon.co.jp/dp/B00U2CNKYO/)を貼って、その上に[梱包テープ](https://www.amazon.co.jp/dp/B00777WWLE/)を貼って、[ケーブル結束クリップ(](https://www.amazon.co.jp/dp/B00021847I/)をつけて固定しています。

![壁](https://efcl.info/wp-content/uploads/2021/02/IMG_8906.JPG)

この手法は[壁にホワイトボードを設置する方法](https://www.amazon.co.jp/gp/customer-reviews/R21A4XG5P81QG7/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B001MSQWM4)を参考にしています。

## おわり

[Dashbling](https://github.com/pascalw/dashbling)の開発体験が思っていたよりよくできていてよかったです。
こういうのは端末の行き来が面倒なので、自動的にリロードされる仕組みが良かったです。

[JSer.info 10周年: JavaScript情報の集め方、書き方、まとめ方 - JSer.info](https://jser.info/2021/01/16/jser-10th/)でも書いていましたが、週一更新するにはある程度今どれぐらいなのかの[ステータス](https://jser.info/status-of-post/)は意識します。しかしステータスを見る癖はないので、Botとかを使っていましたが、ダッシュボードに表示すると面倒臭さが減ってよかったです。
あと、カレンダーをみる癖がないので、次の予定がだせるのが良かったです。

[GitHub Issuesを個人用のTodo管理アプリとして使っている | Web Scratch](https://efcl.info/2020/12/25/missue/)で、タスク管理をGitHub Issuesに移動したのが結構マッチしていました。
毎日やることをGitHub Projectに入れて[sync-github-project-todo-md](https://github.com/azu/inkdrop-github-project-todo-md)で処理できるようにしてたので、ダッシュボードにもこのTODOが現実的な数で表示できるのがちょうどいい感じでした。
(OmniFocusを使ってたら多分TODOは出せなかった感じがします)

<video control src="https://user-images.githubusercontent.com/19714/103011870-ffd04580-457d-11eb-9560-d69b057a97e7.mp4"></video>

コード

- [azu/my-dashbling-example](https://github.com/azu/my-dashbling-example)
