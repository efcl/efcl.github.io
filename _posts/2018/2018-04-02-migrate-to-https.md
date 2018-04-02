---
title: "efcl.info をhttpからhttpsへ移行するためにやったこと"
author: azu
layout: post
date : 2018-04-02T19:33
category: 雑記
tags:
    - HTTP
    - SSL
    - TSL
    - HTTPS

---

## サイトをHTTPSにする

2018年7月に公開されるChrome 68でHTTPなサイトは"Not Secure"と表示されるようになるので、このサイトもHTTPS化することにしました。

- [Google Online Security Blog: A secure web is here to stay](https://security.googleblog.com/2018/02/a-secure-web-is-here-to-stay.html "Google Online Security Blog: A secure web is here to stay")

個人的なサイトなので適当にやってもいいですが、一応ちゃんと追跡できる方法を使ってHTTPS化することにしました。

この記事では次のことを目標しました。

- https化後にhttpでアクセスしているリソースがないことをツールで確認できる
	- 要はMixed Contentがないことを知る方法をもつこと

## Content-Security-Policy-Report-Only

このサイトはJekyll + GitHub Pagesで動いている(動いていた)静的サイトです。

HTTPSにした際にmixed contentにかかるリソースがないかを確認するには、
`Content-Security-Policy-Report-Only`を使い挙動を変更せずにレポートだけするHTTPヘッダが有用です。
しかし、GitHub PagesはレスポンスのHTTPヘッダを指定できないため、`Content-Security-Policy-Report-Only`を使ったレポーティングが行なえません。
(CSPは`<meta>`要素でも指定できますが、`<meta>`要素は`Content-Security-Policy-Report-Only`をサポートしていません)

- <https://www.w3.org/TR/CSP/#meta-element>

## [Netlify][]

GitHub PagesではHTTPヘッダが指定できないので、Netlifyの方にサイトを移してから、その後HTTPS化することにしました。
GitHub PagesでHTTPS化するときはCloudFlareなどを使いますが、NetlifyではLet's Encryptを使って対応する仕組みがあります。

### [Netlify][]へサイトを移行

以下を参考にしました。

- [NetlifyとGithubで独自ドメインのサイトをHTTPS化したメモ - MagChoの雑記](http://magcho.hatenablog.jp/entry/2017/10/15/023440 "NetlifyとGithubで独自ドメインのサイトをHTTPS化したメモ - MagChoの雑記")

GitHubからNetlifyに移行するためにドメインレジストラで以下を設定してNetlifyに移行しました。

- Aレコード
- CNAME
- DNS

### GitHub Pages と Netlifyの違い

基本的にドメインの変更だけでそのままJekyllのサイトは移行できましたが、一箇所だけ挙動が異なる部分がありました。


GitHub Pageは`index.xml`をindexとして認識しますが、Netlifyは`index.xml`をindexとして認識しないという違いがありました。
これが原因で <http://efcl.info/feed/> にアクセスすると404となる問題がありました。
(<http://efcl.info/feed/index.xml>ならアクセスできた。

そのため、Rewrite Ruleを追加してこの問題を解決しています。

```
# Rewrite rule
# https://www.netlify.com/docs/redirects/
# Netlifyはindex.xmlをDirectoryIndexとして認識しない
/feed/                        /feed/index.xml    200
/feed/index.html              /feed/index.xml    200
/feed/atom/                   /feed/             301
/feed/atom/index.html /feed/ 301
```

## http:// でアクセスしているリソースを収集

https化した後にhttp://でアクセスしているリソースが残っているとMixed Contentの問題が発生し、画像が表示されなかったりURLバーに警告がでるので、Mixed Contentを検知できる仕組みをまず作ることにしました。

`Content-Security-Policy-Report-Only` HTTPヘッダを使いCSPレポートを収集するのですが、その集計先が問題となりました。
AWS Gatewayなどを使えばある程度簡単につくれることは分かっていましたが、データを貯める場所はコストや管理などが問題になりやすいためです。

CSPについて調べているとCSPレポートはJavaScriptからも[SecurityPolicyViolationEvent](https://developer.mozilla.org/en-US/docs/Web/API/SecurityPolicyViolationEvent "SecurityPolicyViolationEvent")として取得できることが分かりました。
このイベントで取得したCSPレポートをGoogle Analyticsに送信して、Google AnalyticsでMixed Contentsがないかをみられるようにしました。

詳しくは次の記事で解説しています。

- [CSPレポート(Mixed Contentの問題)をGoogle Analyticsに集約する | Web Scratch](https://efcl.info/2018/03/19/csp-report-to-google-analytics/ "CSPレポート(Mixed Contentの問題)をGoogle Analyticsに集約する | Web Scratch")

## https化

万が一Mixed Contentsが残っていても見つけられる仕組みができてから、HTTPS化をしましｔあ。

[Netlify][]はLet's Enctryptを使ったhttpsをサポートしているのでコントロールパネルから有効化するだけでhttpsでアクセスできるようになります。

- [SSL / HTTPS | Netlify](https://www.netlify.com/docs/ssl/ "SSL / HTTPS | Netlify")

この時点ではhttpsにリダイレクトはせずにどちらでもアクセスできる状態です。

## 参照するリソースをHTTPSに変更

次のPRでhttpでアクセスした画像やJSなどをhttpsでアクセスするように書き換えました。

- [http -> https by azu · Pull Request #159 · efcl/efcl.github.io](https://github.com/efcl/efcl.github.io/pull/159 "http -&gt; https by azu · Pull Request #159 · efcl/efcl.github.io")

## httpsをデフォルト化

書き換えたリソースが参照できているのを確認してから、Netlifyのコントロールパネルから"Force HTTPS"でHTTPSでのアクセスをデフォルト化しました。

これで、 http://efcl.info でアクセスしても https://efcl.info にリダイレクトされるようになりました。

## 数日後にMixed Contentのチェック

数日後にGoogle Analyticsに集計していたCSPレポートを見ると殆ど`http://`でアクセスするリソースはなくなっていることがわかりました。

一部変更のミスがあることが分かったので、それを書き換えて https への完了しました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ほぼほぼhttpsのCSPレポートなくなってた。<br>kwout以外は直せるかな <a href="https://t.co/33sar0LIru">pic.twitter.com/33sar0LIru</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/979959462940229632?ref_src=twsrc%5Etfw">March 31, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## まとめ

まとめるとこのサイトは次のようなステップでHTTPS化しました。

- HTTPヘッダを使うためにGitHub Pages から Netlify へ移行した
- CSPレポートをGoogle Analyticsに収集した
	- [CSPレポート(Mixed Contentの問題)をGoogle Analyticsに集約する | Web Scratch](https://efcl.info/2018/03/19/csp-report-to-google-analytics/ "CSPレポート(Mixed Contentの問題)をGoogle Analyticsに集約する | Web Scratch")
- HTTPS化した
- Google AnalyticsでHTTPでアクセスしてる部分を見つけた修正
- HTTPS化完了

もう少し丁寧にやるならば、デフォルト化をする前に[mcdetect](https://github.com/agis/mcdetect "mcdetect")のようなツールでMixed Contentが残ってないかをチェックしたりもできそうです。
また[CSPレポート(Mixed Contentの問題)をGoogle Analyticsに集約する | Web Scratch](https://efcl.info/2018/03/19/csp-report-to-google-analytics/ "CSPレポート(Mixed Contentの問題)をGoogle Analyticsに集約する | Web Scratch")でも書いていますが、もっとCSPレポートを詳細に分析するならAWS Gatewayなどを使って分析基盤にデータを貯めるのが良さそうな気がしています。

実際のウェブサービスだともっと色々なリソースがあると思いますが、CSPには色々な機能があるのでその辺を参照するのが良さそうです。

- [Web サービスの完全 HTTPS 化 - クックパッド開発者ブログ](http://techlife.cookpad.com/entry/2017/04/19/190901)
- [mixed contents 対応を促進する CSP ディレクティブ | blog.jxck.io](https://blog.jxck.io/entries/2017-01-10/mixed-contents.html)


[Netlify]: https://www.netlify.com/  "Netlify: All-in-one platform for automating modern web projects."