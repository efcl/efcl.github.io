---
title: "Googleマップ ストリートビューでランニングできるウェブアプリを作った"
author: azu
layout: post
date : 2020-05-09T14:55
category: JavaScript
tags:
    - JavaScript
    - GoogleMap

---

ノートPCやタブレットとかについてるウェブカメラを使って、Googleマップ ストリートビューでランニングできる[Running on StreetView](https://running-on-streetview.netlify.app/)というウェブアプリを作りました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Google Maps Street Viewとウェブカメラを使って、ストリートビューを走るウェブアプリを書きました。<br>走るとストリートビューが進む感じ(雑な判定なので走らなくてもいい)<a href="https://t.co/bhYq289QmS">https://t.co/bhYq289QmS</a><br><br>使い方はこちら<a href="https://t.co/kypr9Oo9JU">https://t.co/kypr9Oo9JU</a><br><br>Google MapのAPIキーは自分で取得する必要があります。 <a href="https://t.co/tmD1XNwjSa">pic.twitter.com/tmD1XNwjSa</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1258705039033430016?ref_src=twsrc%5Etfw">May 8, 2020</a></blockquote> 
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

動画はデバッグ用のモデルに走ってもらっていますが、ウェブカメラで走るなどのアクションに応じてストリートビューを進行できるアプリです。

## 必要なもの

- ウェブカメラがついたデバイス
- ブラウザ(Google Chrome + Macbook Proでテストしています)
- [Google Maps JavaScript API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) (トライアルモード以外の場合)

## 使い方

![Screenshot](https://efcl.info/wp-content/uploads/2020/05/09-1589004025.png)

制限なく使うには自分で[Google Maps JavaScript API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)を取得する必要がありますが、
手軽に試せるトライアルモードが一応あります。

トライアルモードは次のようにすれば試せます。

1. <https://running-on-streetview.netlify.app/> を開く
2. "Start Trial" ボタンを押す
3. プロンプトで出るカメラのアクセスを許可する
4. 走る！

あとは好きな場所のGoogle MapのURLをロードもできるので、好きな場所を走って進んでください！

![Screenshot running-on-streetview](https://efcl.info/wp-content/uploads/2020/05/running-on-streetview.png)

トライアルモードは30パノラマ(30遷移)ぐらいまでできるようにしています。

自分で[Google Maps JavaScript API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)を取得すれば、
制限なく利用できるので走り続けたい方は自分のAPIキーを利用してください。
次のサイトを参考にすれば、Google Maps JavaScript APIに限定したAPIキーを発行できます。

- [Google Maps PlatformのAPIキーの取得・発行について - 株式会社ゼンリンデータコム](https://www.zenrin-datacom.net/business/gmapsapi/api_key/index.html)
- [【要確認】Google Maps Platform APIキーの取得方法と注意点 | ワードプレステーマTCD](https://design-plus1.com/tcd-w/2018/08/google-maps-platform-api.html)

発行したAPIキーには`HTTPリファラー（ウェブサイト）`の制限で `https://running-on-streetview.netlify.app/*` を入れておくと安全です。
APIキーには無料枠があるので、普通に使う分には無料枠で収まると思います。

発行したAPIキーは次のようにすれば利用できます。(一度入れれば、次からは記憶されます)

1. <https://running-on-streetview.netlify.app/> を開く
2. APIキーをテキストエリアにいれる
3. "Load" ボタンを押す
3. プロンプトで出るカメラのアクセスを許可する
4. 走る！

## 仕組み

基本的にはGoogleマップストリートビューのJavaScript SDKを使って、動きに合わせて進めているだけです。

- [Street View Service  |  Maps JavaScript API  |  Google Developers](https://developers.google.com/maps/documentation/javascript/streetview?hl=ja)

ウェブカメラの映像を取得して、一定回数分の描画から差分の中央値を取得して、その差分が一定値を超えたら動いているという判定にしています。
描画差分の判定は[pixelmatch](https://github.com/mapbox/pixelmatch)を使ってpixelの差分を見ています。

- https://github.com/azu/running-on-streetview/blob/master/src/RunningController/MotionCamera.ts

そのため、実際に走るだけじゃなくて手を振るとかでも反応します。
カメラで足を写せばスクワットとか、ジャンプに反応させるとかもできるので、進み方は自分で決められます。

カメラがついているデバイスなら使えると思うので、スマートフォンだと画面的に厳しいですが、iPadとかのタブレットならなんとか使える気はします。
タブレットなら腕立てとかに反応させて使うとかもできる気がします。

Macbook Pro以外ではあんまりテストしてないので、デザイン崩れや改善などはPull Requestをお願いします。

- [azu/running-on-streetview: Running on Google Street View.](https://github.com/azu/running-on-streetview)

デバッグにはMMDで作成した3Dモデルに走っているモーションをつけて動画にしたものを、Chromeの`--use-file-for-fake-video-capture=<filename>`が読み込んでいます。
デバッグの度に走るのは大変なので、デバッグ時は3Dモデルに走ってもらっています。

- https://github.com/azu/running-on-streetview/blob/dee04468586ffbacfdf1d11c4ee0d596988dfcaf/package.json#L40
- [Testing WebRTC applications](https://webrtc.org/getting-started/testing)

一日でざっくりと作成したので、バグとかあったらPull Requestを送ってください。
 
- [azu/running-on-streetview: Running on Google Street View.](https://github.com/azu/running-on-streetview)

あと、デフォルトでなぜか[青森の蔦トンネル](https://www.google.com/maps/@40.6110615,140.9482871,3a,73.7y,1.16h,90t/data=!3m6!1e1!3m4!1sjBsnn5UBd-c3qy7uOagvpQ!2e0!7i13312!8i6656)を走っているので、
もっとランニングに適したマップのURLを募集しています！

- [Collect default map · Issue #1 · azu/running-on-streetview](https://github.com/azu/running-on-streetview/issues/1)

## 参考

- [エアロバイクをGoogleマップに連携して日本縦断の旅に出ます | オモコロ](https://omocoro.jp/kiji/230063/)
- [GoogleStreetViewを足踏みで仮想散歩するPGM - Qiita](https://qiita.com/shizuoka_miyako_19911118/items/90553c64d2b6b7d888ec)
