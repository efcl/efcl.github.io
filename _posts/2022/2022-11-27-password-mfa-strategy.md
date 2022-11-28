---
title: "パスワード管理/MFA管理の戦略"
author: azu
layout: post
date : 2022-11-27T20:43
category: security
tags:
    - password
    - security
    - mfa
    - yubikey
    - 1Password

---

自分のパスワードやMFA(多要素認証)の管理方法についてまとめた記事です。

パスワード管理と[TOTP](https://ja.wikipedia.org/wiki/Time-based_One-time_Password)(Time-based One-time Password)の管理として[1Password](https://1password.com/jp/)を使い、MFA(多要素認証)の2要素目として[YubiKey](https://www.yubico.com/yubikey/)を2枚使っています。

パスワード管理とMFA管理を安全で使いやすくするのはかなり複雑で難しいため、完璧にやるのが難しいです。
そのため、その難しさから二要素認証を設定するべきアカウントも手間などから設定を省いてしまったり、管理方法に一貫性がないことがありました。

この記事では、パスワード管理/MFA管理の戦略を決めることで、どのサイトのどのアカウントのパスワード管理をあまり頭を使わなくてもできるようにするのが目的です。利便性と安全性のバランスを意識はしていますが、この記事のやり方が正解ではないので、各自の目的に合わせて読み替えると良いと思います。

## パスワード管理方法のNotionテンプレート

この記事で書いている管理方法をまとめたNotionテンプレートを公開しています。

- [[テンプレート] MFAの管理方法](https://efcl.notion.site/MFA-d7f9bfab757149d5a9da2da1b10a52c8)

右上の[複製](https://efcl.notion.site/MFA-d7f9bfab757149d5a9da2da1b10a52c8?duplicate=true)ボタンから、Notionにコピーして利用できます。

テンプレートでは、アカウントが重要アカウントかサイトがセキュリティキーに対応していかなどにチェックを入れると、自動的に管理方法を出してくれます。

[![Template](https://efcl.info/wp-content/uploads/2022/11/27-1669555287.png)](https://efcl.notion.site/MFA-d7f9bfab757149d5a9da2da1b10a52c8)

テンプレートを見れば大体やりたいことはわかると思いますが、どのような流れになっているかを解説していきます。

## 必要なもの

このパスワード管理/MFA管理をするには、次の2つのものが必要です。

- [1Password](https://1password.com/jp/)、[LastPass](https://www.lastpass.com/)、[Bitwarden](https://bitwarden.com/ja-JP/)のような[TOTP](https://ja.wikipedia.org/wiki/Time-based_One-time_Password)に対応したパスワードマネジャー
- [Yubikey](https://www.yubico.com/yubikey/?lang=ja) などのセキュリティキー を **2枚**
    - セキュリティーキーを2枚使うのは、紛失対策で片方はバックアップ用途です
    - iOSやAndroidなどのモバイル端末で使う場合は、NFCに対応したものを1枚用意

自分の場合は、[1Password](https://1password.com/jp/)、[YubiKey 5C Nano](https://www.yubico.com/jp/product/yubikey-5c-nano/)、[YubiKey 5C NFC](https://www.yubico.com/jp/product/yubikey-5c-nfc/)を利用しています。
[YubiKey 5C Nano](https://www.yubico.com/jp/product/yubikey-5c-nano/)がMacbook Proに挿しっぱなしのメインとなるセキュリティキーで、[YubiKey 5C NFC](https://www.yubico.com/jp/product/yubikey-5c-nfc/)はバックアップ用のスペアキーです。
自分の場合は、モバイルでセキュリティキーが定常的に必要となるアカウントがほとんどなかったので、Nanoをメインにしています。

[YubiKey 5C NFC](https://www.yubico.com/jp/product/yubikey-5c-nfc/)は、Cloudflare経由で1本$10程度で販売してくれていたキャンペーンを利用して購入しました。

- [Cloudflare Zero TrustとYubicoでシームレスなフィッシング対策を実現する（ハードウェア）キー](https://blog.cloudflare.com/ja-jp/making-phishing-defense-seamless-cloudflare-yubico-ja-jp/)

また、[1Password](https://1password.com/jp/)はオープンソース開発などが無料で利用できる[1Password for Open Source Projects](https://github.com/1Password/1password-teams-open-source)を申請して利用しています。

- [1Password for Open Source Projectsの申請をした | Web Scratch](https://efcl.info/2022/09/23/1password-teams-open-source/)

## アカウントごとの管理方法を分ける

アカウントごとにどの方法でMFAを管理するかを分けています。

YubikeyのようなセキュリティキーでMFAを管理すると、[WebAuthN API](https://developer.mozilla.org/ja/docs/Web/API/Web_Authentication_API)はキーが登録済みのOriginでしか動かないので、[MFA Fatigue攻撃](https://www.bleepingcomputer.com/news/security/mfa-fatigue-hackers-new-favorite-tactic-in-high-profile-breaches/)や[2FAリレー攻撃](https://pixmsecurity.com/blog/phish/coinbase-attacks-bypass-2fa/)(フィッシング)などを防げて安全です。

- [Creating the Unphishable Security Key - Yubico](https://www.yubico.com/blog/creating-unphishable-security-key/)

実際にSMS、TOTP、アプリの2段階認証を行っていても、フィッシングサイトで入力したOne-time tokenをそのまま正規のサイトにリレーしながら不正ログインする2FAリレー攻撃などが行われています。

- [GTA新作リークに使われた“多要素認証疲れ”攻撃とは　1時間以上通知攻め、従業員の根負け狙う：この頃、セキュリティ界隈で - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/2209/28/news050.html)
- [MFA 疲れを狙う攻撃：フィッシングで根負けさせ Microsoft／Cisco／Uber などを陥落 – IoT OT Security News](https://iototsecnews.jp/2022/09/20/mfa-fatigue-hackers-new-favorite-tactic-in-high-profile-breaches/)
- [Scatter Swineの検出：執拗なフィッシングキャンペーンへの洞察 | Okta](https://www.okta.com/jp/blog/2022/08/scatterswine/)
- [Microsoft Authenticator の MFA 疲労攻撃対策 | Japan Azure Identity Support Blog](https://jpazureid.github.io/blog/azure-active-directory/defend-your-users-from-mfa-fatigue-attacks/)
  - MFA Fatigue対策として、番号一致の検証するAuthenticator Appもあるが、これは一部のみ

一方で、同じ攻撃がCloudflare社に対しても行われていましたが、Cloudflare社員はセキュリティキーを利用していたため、突破されなかったことも報告されています。

- [高度なフィッシング詐欺のからくりと、それを当社がどう阻止したか](https://blog.cloudflare.com/ja-jp/2022-07-sms-phishing-attacks-ja-jp/)
- [Phishing-resistant MFA | Zero Trust | Cloudflare | Cloudflare](https://www.cloudflare.com/products/zero-trust/phishing-resistant-mfa/)

全てのサイトのアカウントにセキュリティキーを使えばかなり安全ですが、実際にはそういう運用は難しいです。
サイト自体がセキュリティキーに対応してなかったり、セキュリティキーのみをMFAにできないサイトがあったり、利便性からセキュリティキーを使うのが難しいサイトもあります。(また、個人だとSSOでログインしてないサイトも多いので、セキュリティキーでカバーできるサイトはより少なくなる)

また、全てのアカウントがセキュリティキーで守るほど重要なアカウントではないという点もあります。
仮にパスワードが漏れて不正アクセスされてそこまで影響が大きくないなら、TOTPやSMSのMFAで必要十分ともいえます。

MFAとしてTOTPやSMSに対応しているサイトは多いですが、セキュリティキーはまだそこまでではありません。
まだ、セキュリティキーはツールやサイトの対応が少なかったり、モバイルでの体験が良くないなどの利便性で劣る部分があったりします。

そのため、まずはMFAが設定できるサイトはMFAを設定するのが最初にやることです。
しかし、MFAとしてSMS/TOTP/セキュリティキーなどの選択肢があり、どの方法で管理すればいいのか迷ってしまって結局設定しないという問題がこの記事の出発点です。

自分の場合は次のようなフローチャートで管理方法を決めています。

## MFAの保存先のフローチャート

次のフローチャートは、MFAが設定できる場合に1Password または Yubikey のどちらで扱うかを決めています。

![MFA Flowchart](https://efcl.info/wp-content/uploads/2022/11/27-1669553786.png)

まず、**重要なアカウント** or **重要ではないアカウント**で分岐します。
重要の定義は人それぞれですが、たとえば色々な個人情報が入っていたり、お金の入出力が制限なくできたり、乗っ取ることで影響範囲が広い行動(npmパッケージにマルウェアを仕込むなど)ができる場合は、**重要なアカウント**だと思います。
一方で、**重要ではないアカウント**は管理コストよりも利便性や簡単さを優先した方がいいので、1PasswordにTOTPを保存することでMFAを管理します。

次の分岐は、**重要なアカウント**で、そのサイトが**セキュリティキーをサポート**してるかどうかで分岐します。
そもそも、サイトがセキュリティキーをサポートしてないなら、Yubikeyをセキュリティキーとして使うことはできません。
その場合は、今後サイトがサポートしてくれるまでは、1PasswordにTOTPを保存することでMFAを管理します。
次のページには、サイトがセキュリティキーに対応してるかがまとめられています。

- [Works with YubiKey catalog | Yubico](https://www.yubico.com/jp/works-with-yubikey/catalog/?sort=popular)

最後の分岐は、サイトが**セキュリティキーをサポート**していても、**セキュリティキーのみで運用できるか**の分岐です。
これは、サイト側の実装でMFAとしてセキュリティキーのみできないパターン(1PasswordやGitHub)、セキュリティキーが1つしか登録できないパターン(PayPal)、利便性の都合からセキュリティキーのみにするのが難しいパターンなどがあります。

セキュリティキーのみをMFAとして登録できると、TOTPやSMSを使った2FAリレー攻撃がそもそもできなくなるので一番安全です。
一方で、セキュリティキーで認証しないと行けなくなるので、モバイルで困るケースはないかや運用的にできるかどうかが判断基準になります。

セキュリティキーのみで大丈夫となったら、そのサイトには用意しておいたメインとバックアップのセキュリティキーを2つ登録します。
セキュリティキーを2つ登録することで、片方を紛失しても、ログインして無くした方を消したり、さらにスペアを追加できます。

自分の場合は、一部の例外を除いてこのフローで管理方法を決めています。
その例外となるのは、[1Password](https://1password.com/jp/)自体のMFAです。

1Password自体のMFAはセキュリティキーのみにはできないため、Authenticator App(TOTPのこと)が必須になっています。

- [Can I turn off authenticator app and only use security key for 1password login? : 1Password](https://www.reddit.com/r/1Password/comments/r3x6hu/can_i_turn_off_authenticator_app_and_only_use/)

1Passwordは、他のサイトのパスワードやTOTPも管理しているため、明らかに漏れた場合の影響が大きいです。
そのため、1Password自体はTOTPはなしにして、セキュリティキーのみで扱いたいサイトです。

実はYubikey自体も[Yubico Authenticator](https://www.yubico.com/products/yubico-authenticator/)と組み合わせるとTOTPを扱えます。
Yubikey自体に、TOTPのコードを保存し、このコードはハード的には取り出せないので安全です(これはコード自体のバックアップは取れないということ)。
そのため、1Password自体のMFAは、1つはYubikeyのセキュリティキーを登録し、もう一つのYubikeyにTOTPを保存しています。

実際にフローチャートにすると次のようになります。

![MFA Actual Flow](https://efcl.info/wp-content/uploads/2022/11/27-1669554658.png)

1Passwordで、MFAが必要となるは新規ログインぐらいで、頻度は多くないので特別対応をしています。
(YubikeyにTOTPを保存できるのが1枚につき32コと多くなかったり、コードのバックアップはハード的にできないので、あまり数を増やしたくない方法です)

このフローチャートで大まかに次のどちらでMFAを管理するかを決めています。

- 1PasswordのTOTP
- Yubikey 2枚

### 📝補足: 1PasswordとTOTP

1PasswordにTOTPも保存するのは、2要素認証ではなく、2段階認証と言えます。

- [TOTP for 1Password users | 1Password](https://blog.1password.com/totp-for-1password-users/)

そのため、この管理方法は次のように言い換えられます。

- 重要ではないアカウント: 1Passwordを使って2段階認証
- 重要なアカウント: Yubikeyを使って2要素認証

TOTPに1Password以外を使って、パスワードとTOTPのコードを別の場所に保存する方法もあります。
この場合、TOTPを扱うAuthenticator Appsが、サイトのOriginとTOTPを紐付けて管理できないと、2FAリレー攻撃などのフィッシングに対応できません。
(1Passwordの場合は、パスワードと同じサイトのURLに紐づいているはずです)

サイトのOriginとOne-Time Passwordの紐付けの問題は、SMSでOne-Time Passwordを受け取り自動入力する[`<input autocomplete="one-time-code" />`](https://developer.mozilla.org/ja/docs/Web/HTML/Attributes/autocomplete)でも発生します。

- [SMS OTPの自動入力によるリスクとその対策 - Akaki I/O](https://akaki.io/2021/sms_otp_autofill)
- [Risk to Japanese-speaking World posed by SMS OTP Autofill in iOS - Akaki I/O](https://akaki.io/2022/risk_to_japanese-speaking_world_posed_by_sms_otp_autofill_in_ios)

このSMSのOne-Time PasswordとOriginを紐付ける[Web OTP API](https://developer.chrome.com/blog/cross-device-webotp/)もありますが、対応してないサイトは多いです。

また、[Authy](https://authy.com/)を使う場合は、Authy自体の2要素認証としてYubikeyを使えない問題もあります。
他の方法として、Yubikey自体にTOTPを保存して、YubikeyをTOTPとして扱うフローも考えましたが、管理が複雑になって最初の問題が解決できないので避けました。

2FAリレー攻撃などは実際には難しい(パスワード自体はOriginに紐づくパスワードマネージャーで入れるため)ので、TOTPを分けるフローにしなかったのは、どちらかというと管理の複雑性を減らすのが主な目的です。

## MFAのバックアップコード

多くのサイトはMFAを登録するとバックアップコードを発行しています。
このバックアップコードの呼び方はリカバリコードなど色々ありますが、基本的にはMFAとして登録してるものが使えない時に使える予備のコードです。
発行しないという選択肢もありますが、発行した場合は先ほどのフローチャートと同じように決めています。

![Backup Code Flow](https://efcl.info/wp-content/uploads/2022/11/27-1669555714.png)

フローチャートにしましたが、シンプルに書けば次のようになります。

- 1PasswordにTOTPを保存してる場合は、1Passwordにバックアップコードを保存
- Yubikeyのみで管理してる場合、バックアップコードを印刷、オフラインのHDDやSDカードに保存

基本的にMFAの管理方法に合わせて、バックアップコードを保存するという感じにしています。

TOTPとバックアップコードを同じ1Passwordに保存する意味ですが、仮に1Passwordのアカウントが侵害された場合にTOTPが見れれば、バックアップコードが漏れることで影響がより大きくなることはほとんどありません（アカウントが乗っ取られるという結果は同じ）。
また、サイト側の問題でTOTPではアクセスできなくても、バックアップコードでアクセスできるような救済処置がされるケースがあります。
これはサイト側の実装を知らないとどうにもならないので、利用者が意識して管理方法を分けることをとても難しくさせます。

- [Do you store your 2FA recovery codes in 1Password or Physically or not at all? — 1Password Support Community](https://1password.community/discussion/77240/do-you-store-your-2fa-recovery-codes-in-1password-or-physically-or-not-at-all)

そのため、1PasswordにTOTPを保存してる場合は、1Passwordにバックアップコードを保存という単純化をしています。

Yubikeyで管理している場合は、バックアップコードをオンラインに載せてしまうとYubikeyの意味がなくなってしまうので、オフラインで管理するという形にしています。同じ場所（家）に保存してると火災などでセキュリティキーと一緒になくなる可能性があるので、マルチリージョン的に別の場所になってた方が安全ですが、安価で手軽な方法が思いつきませんでした。

## MFAの管理テーブル

ここまで、管理方法を色々書いてきましたが、実際のサイトで見た方がわかりやすいと思います。

次のNotionテンプレートのテーブルに、アカウントを追加してそのアカウントに対する次の項目にチェックを入れれば、
ここまで書いたフローチャートの結果を自動的に出してくれます。

- **重要アカウント**: 個人にとって重要なものかどうか
    - お金に関わるアカウントか、個人情報が含まれているか、他者への影響があるかなどで判断
- **セキュリティキー対応**: [セキュリティキーに対応したサイト](https://www.yubico.com/jp/works-with-yubikey/catalog/?sort=popular)かどうか
- **キーを必須にできる?**: セキュリティキーのみをMFAとして利用できるサイトかどう
    - SMSやアプリなどをMFAとして利用するのを無効化できるか
    - セキュリティキーのみをMFA(WebAuthN)として利用すると、キーを登録済みのoriginでしか動かないので[MFA Fatigue](https://www.bleepingcomputer.com/news/security/mfa-fatigue-hackers-new-favorite-tactic-in-high-profile-breaches/)攻撃や[2FAリレー](https://pixmsecurity.com/blog/phish/coinbase-attacks-bypass-2fa/)攻撃(フィッシング)などを防げる

[![Template](https://efcl.info/wp-content/uploads/2022/11/27-1669555287.png)](https://efcl.notion.site/MFA-d7f9bfab757149d5a9da2da1b10a52c8)

- [[テンプレート] MFAの管理方法](https://efcl.notion.site/MFA-d7f9bfab757149d5a9da2da1b10a52c8)

いくつか実際にサイトを見てみます。
この"重要アカウント"や"キーを必須にできるか"は個人の指標なので、各自で判断してみてください。

1Passwordは先ほども出した例外なので、MFAは"Yubikey1を登録 + Yubikey2にTOTPを保存"して、バックアップコードはオフラインに保存します。
GitHubは自分の中では特殊で、漏れた場合の影響範囲が広いので、1Passwordと同じく例外として扱っています。

Googleアカウントは、セキュリティキーのみで運用できるサイトなので、MFAは"Yubikey2枚で管理"して、バックアップコードはオフラインに保存します。
さらにセキュアな[高度な保護機能プログラム](https://landing.google.com/intl/ja/advancedprotection/)というものもあります。

npmは、セキュリティキーのみで運用できるサイトですが、[`--auth-type=web`](https://github.blog/2022-07-26-introducing-even-more-security-enhancements-to-npm/)の体験があまり良くなかったり、[lernaがセキュリティキーに対応してなかったり](https://github.com/lerna/lerna/issues/3273)など利便性の部分でちょっと問題がありました。
そのため、まだキーを必須にするのが難しかったので、MFAとバックアップコードは"1Passwordに保存"して管理しています。

1Passwordなら、[`op`](https://1password.com/jp/downloads/command-line/)コマンドで、TOTPのトークンをコマンドラインから取得できます。
そのため、`npm publish`する際にMFAが必須になる"✅ Require two-factor authentication for write actions"を有効化していても、`npm publish --otp $(op item get --otp npm)`のように書けば、MFAありなしの体験はほぼ変わりません。

Amazon.co.jpは、セキュリティキーに対応していません。
そのため、"1Passwordで管理 or その他対応"となり、TOTPとSMSのMFA管理になっています。

## 結果

このパスワード/MFA管理方法で整理を実際にやってみて、迷いなくMFAを設定できるようになった気がします。
今まで、管理方法が色々ありすぎて迷って放置してる部分があったので、やり方がある程度決まってると気持ち的に楽な気がします。
(単純にMFA設定できてなかったやつ = 重要ではないアカウントに、1PasswordでTOTPを気楽に設定できるようになったのが大きいかも)

今までTOTPに[Authy](https://authy.com/)を使ってる部分がありましたが、今までの全て移行して[Authy](https://authy.com/)を使わないで済むようになりました（TOTPを再発行して1Passwordにしたり、Yubikeyに移行したので消したりした）。

また、一部のバックアップコードが[Dropbox](https://www.dropbox.com)に眠っていたので、バックアップコードを再発行してそれぞれの管理場所に移しました。

長く書いてるので複雑な感じに見える気もしますが、結果的には1Password or Yubikeyの2択なのでシンプルになった感じです。
そして、本当に"重要なアカウント"はおそらく全アカウントの1-2%以下とかだと思うので、大部分は1Passwordに保存という形になって、重要なものだけを意識して管理というイメージで動けます。

1Passwordはソフトウェア的な良さがあり、Yubikeyはハード的な良さがあるので、それぞれをいい感じに組み合わせ行けるのが良いと思いました。


- [[テンプレート] MFAの管理方法](https://efcl.notion.site/MFA-d7f9bfab757149d5a9da2da1b10a52c8)
  - テンプレートのライセンス: [CC 0](https://creativecommons.org/publicdomain/zero/1.0/deed.ja) ©️ azu