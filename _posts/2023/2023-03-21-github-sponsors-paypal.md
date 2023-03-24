---
title: "GitHub SponsorsではPayPalを使った支払いはできなくなったので、クレジットカードに切り替える必要があります"
author: azu
layout: post
date : 2023-03-21T17:27
category: 雑記
tags:
    - オープンソース
    - GitHub

---

タイトル通りですが、GitHub SponsorsでスポンサーするときにPayPalが利用できなくなっています。
2023年2月23日にPayPalの支払いができなっているので、スポンサーを継続したい場合は支払い方法をクレジットカードに切り替える必要があります。

- [GitHub Sponsors will stop supporting PayPal | GitHub Changelog](https://github.blog/changelog/2023-01-23-github-sponsors-will-stop-supporting-paypal/)

2023年2月23日までクレジットカードに切り替えていなかった場合は、自動的にスポンサーをキャンセルした扱いになっています。

## 支払い方法の変更

次の手順で、GitHub(Sponsorsを含む)の支払い方法をクレジットカードに変更できます。

1. https://github.com/settings/billing/payment_information
2. Payment methodsから"Credit or debit card"を選択
3. クレジットカード情報を入力して保存

![Credit or debit card](https://efcl.info/wp-content/uploads/2023/03/21-1679387557.png)

このときにPayment Informationとして、クレジットカードに対応する名前や住所などを入れる必要があります。
この情報は、GitHub社以外は知ることはできないため、スポンサーされた人にも通知されません。

- [初めてでもわかる、GitHub Sponsorsでオープンソースを支援する方法](https://zenn.dev/azu/articles/c48ad63e20ad75)
- [支払い方法を追加または編集する - GitHub Docs](https://docs.github.com/ja/billing/managing-your-github-billing-settings/adding-or-editing-a-payment-method)

## キャンセルしたスポンサーを再開する方法(する側)

2023年2月23日までクレジットカードに切り替えていなかった場合は、自動的にスポンサーをキャンセルした扱いになっています。
キャンセルしたスポンサーは次のページで確認できます。

1. [Sponsorship Log](https://github.com/settings/sponsors-log)にアクセス
2. 2023年2月23日以降に"Cancel"の表示があるアカウントを選択
3. 再度スポンサーになる

意図せずにキャンセルしてしまった場合は、再度スポンサーになってみてください。

## キャンセルされたスポンサーの見つけ方(される側)

これはスポンサーされる側の方ですが、次のページでGitHubのスポンサーがキャンセルされたかどうかを確認できます。

- `https://github.com/sponsors/{user}/dashboard/activity`

大体2023年2月23日 ~ 3月前半にCancelの表示が出ていたら、この影響だと思います。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Seeing lots of GitHub Sponsors cancellations this week. Likely due to GH removing PayPal support. It&#39;s sad, but nothing I can do about it.<br><br>I&#39;m just grateful for all the support I&#39;ve received over the years, and for the folks that continue to support me! 🤓🙏❤️ <a href="https://t.co/kUpL6DeTBi">https://t.co/kUpL6DeTBi</a> <a href="https://t.co/EgWAFrrbal">pic.twitter.com/EgWAFrrbal</a></p>&mdash; Andreas Kling (@awesomekling) <a href="https://twitter.com/awesomekling/status/1633407432155181056?ref_src=twsrc%5Etfw">March 8, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

GitHubにはスポンサーしている人にメッセージを送る機能はありますが、キャンセル済みの人へ送る機能はないようです。

## まとめ

GitHub SponsorsではPayPalを使った支払いはできなくなったので、クレジットカードに切り替える必要があります。
ただし、GitHub自体への支払い(Pro機能など)はPayPalが継続して利用できるようです。

- [GitHub Sponsors will stop supporting PayPal | GitHub Changelog](https://github.blog/changelog/2023-01-23-github-sponsors-will-stop-supporting-paypal/)

意図せずにスポンサーをキャンセルしてしまった場合は、再度スポンサーになってみてください。喜ばれます。

影響を受けているケース

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Github sponsors pulled the plug on PayPal support. <br><br>Even for past recurring sponsorships.<br><br>So I now make $4k less per month. Womp.<br><br>Guess it matters which basket your put your eggs in...</p>&mdash; Caleb Porzio (@calebporzio) <a href="https://twitter.com/calebporzio/status/1638560981121921029?ref_src=twsrc%5Etfw">March 22, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Lost about 100 active sponsors recently (~35%)<br><br>While on the other hand, the maintenance work I have to do daily gets heavier than ever.<br><br>If you are relying on my work, I would be appreciated it if you could convince your company to sponsor 💖 <br><br>Thank you!<a href="https://t.co/kSZKA3iTBs">https://t.co/kSZKA3iTBs</a></p>&mdash; Anthony Fu (@antfu7) <a href="https://twitter.com/antfu7/status/1639056186665320448?ref_src=twsrc%5Etfw">March 24, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;ve lost about 10% of my income from the whole GitHub dropping paypal thing, and it&#39;s still trending down, so if you&#39;d like to sponsor me that would be awesome 💜<a href="https://t.co/TZJVnwWZon">https://t.co/TZJVnwWZon</a></p>&mdash; Louis Pilfold (@louispilfold) <a href="https://twitter.com/louispilfold/status/1636459390092865538?ref_src=twsrc%5Etfw">March 16, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
