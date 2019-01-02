---
title: "セキュリティキーYubiKey 4C Nanoの設定と使い道"
author: azu
layout: post
date : 2019-01-02T10:12
category: 雑記
tags:
    - yubikey

---

結構前に[YubiKey 4C Nano](https://www.yubico.com/product/yubikey-4-series/#yubikey-4c-nano)を買って使ってるので、その設定や使い道についてのメモ。

## Macbook Pro/AirとYubiKeyの運用

Macbook系はUSB Cなので、[YubiKey 4C Nano](https://www.yubico.com/product/yubikey-4-series/#yubikey-4c-nano)を買った。

AirもProも2ポート以上あるので、基本的にずっと挿しっぱなし。
1ポートはUSB Cハブ、1ポートは[YubiKey 4C Nano](https://www.yubico.com/product/yubikey-4-series/#yubikey-4c-nano)を刺している状態。


この運用からも分かるように、YubiKeyのみでログインとかできるような状態では使ってない。
あくまで二要素認証のSMSの代わりという感じの使い方に収まるようにしている。
YubiKeyをなくした場合にも登録済みサービスからRevokeするだけで済む範囲でしか使ってない。

## Yubikeyにニックネームをつける

Yubikeyを登録できるサービスには、Security Keysにニックネームをつけられるものがある。
複数のSecurity Keyを登録できるため、それぞれに固有の名前をつける。

このニックネームは万が一Yubikeyをなくした時にrevokeするために使うので、わかりやすい名前にしておく。Revokeしたいときは、他のサービスからもRevokeすると思うので、共通の名前を使うのが良さそうです。

Yubikeyのケースにニックネームを書いておいて保存した。

## Firefox

Firefox(64)ではまだU2Fがデフォルトではオフなので`about:config`から有効化する。

> security.webauth.u2f: true

に変更するとGoogleのサービス以外はちゃんと認識した。

GoogleはGoogle Chromeでしか動かないように作られているので、Firefoxではセキュリティキーを認識しない。

![Google](https://efcl.info/wp-content/uploads/2019/01/02-1546392149.png)

Firefox本体はまだ2要素認証としてセキュリティキーに対応してない。

- Firefoxアカウント: [Firefox アカウントを取得](https://www.mozilla.org/ja/firefox/accounts/)
- Firefoxのマスターパスワードなど

## サービスの設定

Universal 2nd Factor (U2F)やOne Time Passwords (OTP)での2要素に対応しているサービスは次のサイトにまとめられている

- [USB Dongle Authentication](https://www.dongleauth.info/)

U2Fに対応しているサイトは2要素認証部分がYubikeyにタッチするだけで良くなるので設定した方がいい。
(アプリでワンタイムパスワード入れて、どういうみたいなのがワンタップでよくなる)

OTPだけに対応しているサイトは、上手くやるには工夫が必要なので後述。

どちらのサイトもYubikeyなどの物理トークンを設定したからといって、リカバリーコードなどをなくさないようにする。
自分はそれぞれのサービスで次の2つを行った。

- [Authy](https://authy.com/blog/authy-vs-google-authenticator/)でQRコードを読み込み保存
- バックアップ用のリカバリーコードを別途保存


Yubikey自体をなくした場合は、各サイトからyubiKeyをrevokeすれば、なくしたYubikeyを使って2要素認証はできなくなる。
Yubikey自体をなくした場合でもAuthyなどを使ってログインが可能。

### GitHub

Settings > [Security](https://github.com/settings/security)から設定できる。

- [Using Your YubiKey with GitHub : Yubico Support](https://support.yubico.com/support/solutions/articles/15000006469-using-your-yubikey-with-github)
- [Configuring two-factor authentication - User Documentation](https://help.github.com/articles/configuring-two-factor-authentication/)

### Google

<https://myaccount.google.com/signinoptions/two-step-verification>から設定できる。

- [Using Your YubiKey with Google : Yubico Support](https://support.yubico.com/support/solutions/articles/15000006418-using-your-yubikey-with-google)
- [2 段階認証プロセスにセキュリティ キーを使用する - Android - Google アカウント ヘルプ](https://support.google.com/accounts/answer/6103523)

Note: UAでU2F判定してるためFirefox 61では利用できない実装だった

### Dropbox

<https://www.dropbox.com/account/security>から設定できる。

- [Dropbox security key for Individuals | Yubico](https://www.yubico.com/why-yubico/for-individuals/dropbox-for-individuals/)

### Twitter

[Twitter / Settings](https://twitter.com/settings/account)で2要素認証を設定。
その後 <https://twitter.com/settings/account/login_verification> で設定できる。

- [ログイン認証を使用する方法](https://help.twitter.com/ja/managing-your-account/two-factor-authentication#security-key)


Twitterはクライアントアプリでログインした時に、セキュリティキーの認証を求めてくる + そのアプリがElectronで対応してないとかの場合はログインできなくて詰んでしまう問題がある。

一時的にセキュリティキーをオフにするとかの回避方法しかなかった。

### npm

<https://www.npmjs.com/settings/~/profile>から設定できる。

- [16 - How to use two-factor authentication | npm Documentation](https://docs.npmjs.com/getting-started/using-two-factor-authentication)

npmはauth-onlyとauth-and-publishのモードがある(またパッケージごとに2要素認証を設定できる)

![npm](https://efcl.info/wp-content/uploads/2019/01/02-1546392345.png)

これらの違いは次の表で確認できる(publishまで2要素認証を求めるかという違い)

- [When Will npm Require the Second Factor?](https://docs.npmjs.com/getting-started/using-two-factor-authentication#when-will-npm-require-the-second-factor)

現状の`auth-and-publish`はmonorepoだとpublishが難しい問題がある。

- [Support 2FA `--otp=123456` · Issue #1091 · lerna/lerna](https://github.com/lerna/lerna/issues/1091 "Support 2FA `--otp=123456` · Issue #1091 · lerna/lerna")
- [2FA security - skipping OTP on npm publish when relogin - 🐞 bugs - npm forum](https://npm.community/t/2fa-security-skipping-otp-on-npm-publish-when-relogin/3074 "2FA security - skipping OTP on npm publish when relogin - 🐞 bugs - npm forum")

## その他

AWSとかお金がかかる系は逐次やっておく。

銀行系は2要素認証は対応してるけど、独自アプリだったり、セキュリティキーは対応してないところが多い。

## 感想

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">Yubikeyを使うことによって便利に感じることはほとんどないけど(GitHubはちょこちょこ二要素認証するので便利かな)、使うことで不便になる(Twitterは逆にセキュリティキー使うと認証できなくなるクライアントがある…)こともあんまりない。<br>二要素認証を積極的にオンにできるお守りみたいな感じ。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1077957676212965376?ref_src=twsrc%5Etfw">December 26, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


Yubikeyを使うことによって便利なケースは自分の使う範囲だとそこまでない感じ。
USBポート空いてたので刺しておこうぐらい。

GitHubはセキュリティキーがあると便利なサイトで、ログインだけじゃなくてコラボレーターの追加なども認証を求めてくるので、頻度的には1日1回ぐらいはYubikeyに触っている感じがする。

![GitHub: add collaborator](https://efcl.info/wp-content/uploads/2019/01/02-1546392669.png)

MacBook Airから指紋認証ができるので、指紋認証でセキュリティキーにできるソフトウェア実装があれば使わなくなる場合もありそう。
一方でYubikeyは取り外しができるので、Macbook Pro -> Airへと移動した時に、キーを付けるだけで良かったという話もある。

Yubikeyは便利な使い方をするなら、OTPのAPIを叩いて結構遊べるけど、なくした時に何も起きないことを優先しているので、あんまり便利な使い方をしてない。(外さない/外れないので、なくすときはmacbookごとなくしそう)

* [pallotron/yubiswitch: OSX status bar application to enable/disable Yubikey Nano](https://github.com/pallotron/yubiswitch "pallotron/yubiswitch: OSX status bar application to enable/disable Yubikey Nano")
* [二要素認証に使われてるYubico OTP の仕組み - 試運転ブログ](http://otameshi61.hatenablog.com/entry/2016/12/30/211358 "二要素認証に使われてるYubico OTP の仕組み - 試運転ブログ")
* [How to use Yubikeys with Node.js - YouTube](https://www.youtube.com/watch?v=5J3QK0G8H4Y)

Yubikey買ってからの運用方法まとめ

- 登録したウェブサービスをメモる
	- Revokeできるようにするため
- なくした場合に困らない運用にする
