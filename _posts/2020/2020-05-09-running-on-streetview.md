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
手軽に試せるトライアルモードがあります。

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

発行したAPIキーは次のようにすれば利用できます。(一度入れれば、次からキーは記憶されます)

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

[リポジトリ](https://github.com/azu/running-on-streetview)を見てみるとわかりますが、このアプリはJavaScriptフレームワークを使わずに書いています。

そのためJavaScriptは15kbほどで済んでいます。(MapのSDKは別、一部Utilなライブラリを使ってる)

![ファイルサイズ](https://efcl.info/wp-content/uploads/2020/05/10-1589073686.png)

Lighthouseのスコアもこれだけ小さいアプリだとあんまり意識しなくてもちゃんとでるようでした。
(アクセシビリティ周りは見てからちょっと直した)

![Lighthouse](https://efcl.info/wp-content/uploads/2020/05/10-1589073727.png)

あんまりUIない気がしたのでReactなどを使わずに書きはじめたのですが、操作ボタンやフォームとかちょっとしたUIが必要なことに書き始めてから気づきました。
そのため、このアプリでは次のようなシグネチャでコンポーネントを書くようにしています。

```js
export type コンポーネントProps = {
    
}
export const コンポーネント = (containerElemenet: HTMLElement, props: コンポーネントProps) => {
    // 初期化処理
    return {
        update(props: Partial<コンポーネントProps>){
            // 更新処理
        },
        unload(){
            // 終了処理
        }
    }
}
```

たとえば、動作の状態をトグルステータスボタンは次のような感じです。

- [running-on-streetview/StatusButton.ts at master · azu/running-on-streetview](https://github.com/azu/running-on-streetview/blob/master/src/RunningController/StatusButton/StatusButton.ts)

```js
import "./StatusButton.css";

export type LoadMapProps = {
    onClick: () => void;
};

export function htmlToElement<T extends HTMLElement>(html: string): T {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.firstElementChild as T;
}

export type StatusButtonProps = { onClick(): void; text: string };
export const StatusButton = (controlContainer: HTMLElement, props: StatusButtonProps) => {
    const button = htmlToElement(`<button type="button" class="StatusButton pure-button"/>`);
    const onClick = (event: Event) => {
        event.preventDefault();
        props.onClick();
    };
    button.textContent = `Status: ${props.text}`;
    button.addEventListener("click", onClick);
    controlContainer.appendChild(button);
    return {
        update(props: Partial<StatusButtonProps>) {
            // TODO: イベントの再定義はいる?
            if (props.text) {
                button.textContent = `Status: ${props.text}`;
            }
        },
        unload() {
            button.removeEventListener("submit", onClick);
            controlContainer.removeChild(controlContainer);
        },
    };
};
```

使うときは次のようなイメージです。

```js
const { update: updateStatusButton, unload: unloadStatusButton } = StatusButton(controlContainer, {
    text: state.playingStatus,
    onClick() {
        action.togglePlayingStatus();
    },
});
// なんか更新
updateStatusButton({
    text: "新しいテキスト"
});
```

更新処理がないパターンは次のようにいくつか省略しています。
たとえば、タブの表示状態を管理するコンポーネント(ここではUIじゃないけど)は次のような感じです。

- [running-on-streetview/VisibleController.ts at master · azu/running-on-streetview](https://github.com/azu/running-on-streetview/blob/master/src/RunningController/VisibleController/VisibleController.ts)

```js
export type VisibleControllerProps = {
    onVisibleChange(status: VisibilityState): void;
};
export const VisibleController = (props: VisibleControllerProps) => {
    const onVisibleChange = () => {
        // ignore on fullscreen
        if (document.fullscreenElement) {
            return;
        }
        props.onVisibleChange(document.hidden ? "hidden" : "visible");
    };
    document.addEventListener("visibilitychange", onVisibleChange);
    return () => {
        document.removeEventListener("visibilitychange", onVisibleChange);
    };
};
```

それぞれのコンポーネントに初期化と終了処理を書いておいて、unloadはまとめてできるようなイメージで書いています。
実際にはunloadがまだ必要になっていないのですが、ないと後で面倒そうなので最初から書いています。

```js
    return () => {
        return Promise.all([
            streetViewPanorama.unbindAll(),
            unloadStreetView(),
            unloadLoadMap(),
            unloadStatusButton(),
            unloadVisibleController(),
            unloadShareButton(),
        ]);
    };
```

- https://github.com/azu/running-on-streetview/blob/4e0af6b985b9fc19955f31e87919e5dda8f55af5/src/index.ts#L297-L306

更新処理を行う方法が、コンポーネントの初期化処理後に取得できる都合上コントールフローを管理する`index.ts`は若干ごちゃついてる気がします。
(多分イベントとか使ってうまくまとめてフローを一箇所で管理できるようにすると、フレームワークでよく見る流れになる気がする)

- [running-on-streetview/index.ts at 4e0af6b985b9fc19955f31e87919e5dda8f55af5 · azu/running-on-streetview](https://github.com/azu/running-on-streetview/blob/4e0af6b985b9fc19955f31e87919e5dda8f55af5/src/index.ts)

1000行程度のアプリ(1画面)なら、こんな感じでもまあまあ書けるものなんだなーという感想でした。

```
$ cloc src
      15 text files.
      15 unique files.
       0 files ignored.

github.com/AlDanial/cloc v 1.84  T=0.07 s (216.7 files/s, 14056.4 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                      12             32             54            872
CSS                              3              1              0             14
-------------------------------------------------------------------------------
SUM:                            15             33             54            886
-------------------------------------------------------------------------------
```

## おわりに

一日でざっくりと作成したので、バグとかあったらPull Requestを送ってください。
 
- [azu/running-on-streetview: Running on Google Street View.](https://github.com/azu/running-on-streetview)

あと、デフォルトでなぜか[青森の蔦トンネル](https://www.google.com/maps/@40.6110615,140.9482871,3a,73.7y,1.16h,90t/data=!3m6!1e1!3m4!1sjBsnn5UBd-c3qy7uOagvpQ!2e0!7i13312!8i6656)を走っているので、
もっとランニングに適したマップのURLを募集しています！

- [Collect default map · Issue #1 · azu/running-on-streetview](https://github.com/azu/running-on-streetview/issues/1)

オススメの場所を[#RunningOnStreetView](https://twitter.com/search?q=%23RunningOnStreetView&src=typed_query)のハッシュタグに投稿してください。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ブラジル走ってる🏃<a href="https://t.co/7G9t1OzNLc">https://t.co/7G9t1OzNLc</a> <a href="https://twitter.com/hashtag/RunningOnStreetView?src=hash&amp;ref_src=twsrc%5Etfw">#RunningOnStreetView</a> <a href="https://t.co/SVvxrbiRe8">pic.twitter.com/SVvxrbiRe8</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1259060030860451840?ref_src=twsrc%5Etfw">May 9, 2020</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## 参考

- [エアロバイクをGoogleマップに連携して日本縦断の旅に出ます | オモコロ](https://omocoro.jp/kiji/230063/)
- [GoogleStreetViewを足踏みで仮想散歩するPGM - Qiita](https://qiita.com/shizuoka_miyako_19911118/items/90553c64d2b6b7d888ec)
