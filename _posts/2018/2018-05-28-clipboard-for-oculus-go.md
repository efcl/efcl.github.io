---
title: "Oculus GoのブラウザにPCからテキストデータを渡してフォームに入力できるブックマークレットとアプリ"
author: azu
layout: post
date : 2018-05-28T10:06
category: 雑記
tags:
    - OculusGo
    - JavaScript
    - Electron
    - Node.js
    - Browser

---

タイトルがややこしいですが簡単に言うと、Oculus GoのブラウザにPCからテキストデータを渡してフォームに入力できるツールを書いたよという話です。
擬似的にOculus GoのブラウザでPCのクリップボード貼り付けを行えるよという感じです。

- [azu/no-clipboard-app: Share your clipboard text to your device like Oculus Go.](https://github.com/azu/no-clipboard-app)

Oculus Goには日本語IMEやクリップボード機能がありません。
これはOculus Go上のブラウザでも同様です。

- [Oculus GoのブラウザについてのWeb開発者目線からのまとめ - Qiita](https://qiita.com/wakufactory/items/98658e8d089386a7b073)

Chromeがデフォルトです。Samsung Internet VRもapkをadb経由で入れると動きますがこちらもクリップボード機能はありません。

そのため、日本語を入力する手段がなかったり長いテキストをOculus Go上で入力するのは大変です。
この問題が不便だったので、[no-clipboard-app](https://github.com/azu/no-clipboard-app)というアプリを作りました。

Oculus Go(クライアント)からみた動作は次のような形で任意のテキストをフォームにペーストできます。

1. フォームにフォーカスする(IMEを表示する)
2. ブックマークレット(paste clipboard)を実行する
	- ブックマークレットは後述サーバから取得できます

	
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I&#39;ve created clipboard app for <a href="https://twitter.com/hashtag/OculusGo?src=hash&amp;ref_src=twsrc%5Etfw">#OculusGo</a> <br>Share your pc&#39;s clipboard to Oculus Go&#39;s browser.<br><br>&quot;azu/no-clipboard-app: Share your clipboard text to your device like Oculus Go.&quot;<a href="https://t.co/jyzdjpEimo">https://t.co/jyzdjpEimo</a><a href="https://twitter.com/hashtag/OculusGoDev?src=hash&amp;ref_src=twsrc%5Etfw">#OculusGoDev</a> <a href="https://t.co/ZpbJ009OM9">pic.twitter.com/ZpbJ009OM9</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1000392189292105728?ref_src=twsrc%5Etfw">May 26, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Oculus Go(クライアント)と対となるElectronアプリ(サーバ)が必要です。
クライアントはサーバのクリップボードデータをブックマークレット経由でペーストするためです。

Electronアプリ(サーバ)は次のようなサーバを内容したアプリケーションです。
Oculus Go(クライアント)はこのサーバのクリップボードに対して[Localtunnel](https://localtunnel.github.io/www/)を経由してアクセスできます。そのため、Oculus Go(クライアント)からブックマークレットを実行するときはElectronアプリ(サーバ)を起動しておく必要があります。

逆に使わないときはElectronアプリ(サーバ)を終了してください。
[Localtunnel](https://localtunnel.github.io/www/)を使っているため、原理的にはインターネットからアクセス可能になっています。
自動的に生成されるランダムなURLとシンプルなtokenがアクセスには必要ですが、中間者攻撃された場合はだめなので。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">アプリ側はこんな感じ。<br>中でサーバ動いてるだけなので、できるのはクリップボードの更新ぐらい。<br>仕組み的に絶対に安全というわけじゃないので、使ってないときはアプリを閉じたほうがいい <a href="https://t.co/d4ghhSlcdh">pic.twitter.com/d4ghhSlcdh</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1000372265559572480?ref_src=twsrc%5Etfw">May 26, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## インストール方法

自分用に作成したのでmac用のバイナリしか用意してません。

- [latest releases](https://github.com/azu/no-clipboard-app/releases/latest)から最新版をダウンロードできます

Electronアプリなので手元にgit cloneして、Node.jsでビルドすればどの環境でも動くと思います。

ビルドには[Node.js](https://nodejs.org/ja/)と[Yarn](https://yarnpkg.com/ja/docs/install)の最新の安定版が必要です。

### Run app on local

    yarn
    yarn start

### Build app on local

    yarn
    yarn make

## 使い方

Oculus Go(クライアント)とElectronアプリ(サーバ)が連携して動く仕組みなので、ややこしいですがアプリを起動した画面にも使い方は表示されています。

1. PC: Electronアプリ(サーバ)を起動する
    - macはコンテキストメニューの"開く"じゃないと署名なしアプリは起動できません
2. Oculus Go: Oculus Goのブラウザを開き、アプリに表示されている`https://random-id-hogehoge.localtunnel.me/bookmarklet`のURLへアクセスする
    - 表示された画面の案内に従ってページをブックマーク(copy-clipboard)
    - ブックマークしたURLが`javasript:`から始まるように先頭を削る = ブックマークレット化
3. Oculus Go: `<input>` or `<textarea>` 要素にフォーカスする
    - `copy-clipboard`は[activeElement](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement)に依存しています
4. Oculus Go: `copy-clipboard`のブックマークレットを実行する
    - 実行するとElectronアプリ(サーバ)側のクリップボードデータを取得してフォーム要素に入力されます
    - `input.value = "text"`してるだけなので、リッチエディター系は動かないかも

### ブックマークレットの種類

今実装してあるブックマークレットは次においてあります。
ブックマークレットを生成時にkeyやrandomなlocaltunnelのurlを埋め込むので、生成済みのブックマークレット自体は共有しないでください。

- [no-clipboard-app/src/server/bookmarklet at master · azu/no-clipboard-app](https://github.com/azu/no-clipboard-app/tree/master/src/server/bookmarklet)

原理的にはFetch APIでClipboard データを読み書きできるサーバがあるというだけなので、
なにかいいアイデアのブックマークレットがあったらPull Requestしてください。

### セキュリティ

原理的には任意のサイトでブックマークレットを実行しているので、そのブックマークレットの実行自体をhookすればリクエストやレスポンスを奪い取れます。
そのため、センシティブなデータはやり取りしないほうがいいです。

よりセキュアにするにはEnd to Endな何かが必要になるため、その辺を解決できる人はPull Request募集しています。

WebRTCなどを使いP2Pなローカルネットワークで解決できると良かったのですが、そのようなAPIは[Secure Contexts](https://developer.mozilla.org/ja/docs/Web/Security/Secure_Contexts)じゃないと動かないので動かないサイトがでてきて不便そうなのでRest APIに落ち着きました。

## リポジトリ

- [azu/no-clipboard-app: Share your clipboard text to your device like Oculus Go.](https://github.com/azu/no-clipboard-app)
