---
title: "Google DomainsからCloudflare registrarにドメインとメールを移管した"
author: azu
layout: post
date : 2023-09-30T13:59
category: 雑記
tags:
    - Domain
    - DNS

---

[Google Domains](https://domains.google/)がSquarespaceに買収されるので、持っているドメインとカスタムドメインのメールアドレスを[Cloudflare Registrar](https://www.Cloudflare.com/ja-jp/products/registrar/)に移管した。

- [Cloudflare Registrar · Cloudflare Registrar docs](https://developers.Cloudflare.com/registrar/)

基本的にはCloudflare Registrarに表示される手順でやっておけば、問題は起きなかったので、よくできてると思った。

次のような手順で順番に移管していたので、移管時のメモ。

## 手順

1. Google Domainsの移行準備
2. Cloudflareのname serverを使うように移行する
3. ドメインの移管
4. メールの転送設定

### Google Domainsの移行準備

移管する前に、Google Domainに登録しているドメインの設定を変更しておく。
それぞれONになってると移管時に問題が発生する。

- DNSSECを無効化する

![DNSSECを無効化する](/wp-content/uploads/2023/09/Untitled.png)

- ドメインロックを解除

![Google側ドメインロックを解除](/wp-content/uploads/2023/09/Untitled%201.png)

### Cloudflareのname serverを使うように移行する

Cloudflare registrarは、ドメインが参照するname serverを変更 → ドメインを移管という流れで、ドメインを移管する。ダウンタイムが起きないようなフローで移管する。

- <https://dash.cloudflare.com/> Cloudflareの管理画面にアクセス
- WebSites → Add Siteから移管したいドメインを取り込む
    - この時点でCloudflareのnameserverに既存のDNSがコピーされた状態になってくれる

![nameser](/wp-content/uploads/2023/09/Untitled%202.png)

- SSLを Full に変更(VercelやGitHub Pagesではこれをしないと “ページの自動転送設定が正しくありません” というエラーになった)

![SSLを Full](/wp-content/uploads/2023/09/Untitled%203.png)

- Google Domains側でドメインのネームサーバに先ほどの Cloudflareの nameserver を指定する
  - 指定するべき name server は、ドメインを取り込んだCloudflareの画面に出てくるので、それをコピーしてGoogle Domains側に入れる

![Cloudflareの nameserver を指定](/wp-content/uploads/2023/09/Untitled%204.png)

- Google側でこのcustom nameserverを”利用する”に変更
    - この時点でドメインはCloudflareのname serverを使って解決されるようになる(切り替わるまでGoogle Domainだと10 - 20 分ぐらいはかかった)
        - Cloudflare側で”check nameserver”を押すとチェックしてくれるけど数十分ぐらいかかるのは変わらないので気長に待つ
        - 切り替わるとCloudflareからメールで通知がくる
    - サイトにアクセスして正しく動いてるかを確認する
        - “ページの自動転送設定が正しくありません” が出た場合は、CloudflareのSSL設定で”Full”になっているかを確認する

:memo: 次のドメインの移管が完了すると、元のGoogle Domains側のname serverも停止される。

- [Google Domains から別の登録事業者に移管する - Google Domains ヘルプ](https://support.google.com/domains/answer/3251178)

### ドメインの移管

ここから実際にドメインをGoogle DomainからCloudflareに移管する。

- Cloudflareで追加したSiteから”Transfer to Cloudflare”を選ぶ
    - サイトの右側にある**Domain Registration**あたりから選択できる
- Google Domainで、登録情報の管理 → Google から移管: 認証コードの取得を実行
    
![認証コードの取得](/wp-content/uploads/2023/09/Untitled%205.png)
    
- 移管のためのコードが手に入るので、Cloudflareの画面に入力
    - ドメインの持ち主の名前とか住所を入れる
    - Cloudflare registrarはデフォルトでwhoisをREDACTED FOR PRIVACYでマスクしてくれるので、whois代行的な設定はない
    - [WHOIS redaction · Cloudflare Registrar docs](https://developers.cloudflare.com/registrar/account-options/whois-redaction/)
      - ICANNポリシーに従って都道府県レベル(COUNTRY、STATEのみ)はマスクされない
- しばらくすると、Googleから移管しますか?のメールが届くので承認
- 1年分の支払いがされて移管される
    - 10年分で切り捨てになってるので、10年以上の有効期限がある状態だと少し無駄が発生する

### メールの転送設定

カスタムドメインのメールアドレスがある場合は、[Cloudflare Email Routing](https://www.Cloudflare.com/ja-jp/developer-platform/email-routing/)を使うと無料で送受信ができる。

- サイトを選んで、”Email Routing”を開く

![Email Routing](/wp-content/uploads/2023/09/Untitled%206.png)

- Routingを追加

![Routingを追加](/wp-content/uploads/2023/09/Untitled%207.png)

- すでにMXレコードがあると衝突するので、Add records and enableでCloudflareの設定を追加する
    - これでCloudflare経由でカスタムドメインのメールが受信ができるようになる

![MXレコード](/wp-content/uploads/2023/09/Untitled%208.png)

- 送信の対応
    - Gmailでアプリパスワードを使ってSMTPを設定
        - アカウントにエイリアスとして追加したカスタムドメインのメールの設定を入れる
        - 詳しくは次のページ
        - [Cloudflareの「Email Routing」とGmailで独自ドメインメールを完全無料で運用する方法 | SERVERSUS](https://www.serversus.work/topics/qkf8sh2jusl8u6sjm5v5/)
    - アプリパスワードは [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) から取得できる
- 送受信のテスト
    - [ ] 受信ができる
    - [ ] 返信ができる

## おわりに

遭遇した問題は“ページの自動転送設定が正しくありません”が出るぐらいだった。
これは、CloudflareのSSLのモードを"Full"に変更することで解決した(デフォルトはFlexible)。

- [Cloudflare + Vercelでのリダイレクトループエラーの解消メモ - Qiita](https://qiita.com/n0bisuke/items/ebdace6abf4423197373)

他はCloudflareの画面に従って移行すれば特に問題はなかった。

ドメインを移管すると1年分のコストを先に支払う必要があって、すでに10年分買った直後だと無駄になるので注意(10年以上は切り捨てという注意書きが出てた) 。

> If I registered my domain for 10 years at another registrar, will I gain another year if I transfer it to Cloudflare?
> 
> No. A domain cannot have more than 10 years on the term. If you registered your domain for 10 years, you will get 10 years upon transferring it to Cloudflare.
> 
> -- https://developers.Cloudflare.com/registrar/faq/#if-i-registered-my-domain-for-10-years-at-another-registrar-will-i-gain-another-year-if-i-transfer-it-to-Cloudflare

`efcl.info`とか`jser.info`は`info`ドメインの値上げ時にまとめて10年分買っていたけど、ギリギリ1年消費してたので無駄はなかった気がする。
あまり細かいことは気にせずに移管できたのは、[🌐 Domain Supporter](https://github.com/sponsors/azu)のおかげなので、ありがとうございます。

## 参考

- [GoogleドメインからCloudflareに移管する。 - Qiita](https://qiita.com/napspans/items/3e4030ea54948295c53e)
- [ドメインをCloudflareに移管するためのステップバイステップガイド](https://blog.cloudflare.com/ja-jp/a-step-by-step-guide-to-transferring-domains-to-cloudflare-ja-jp/)
