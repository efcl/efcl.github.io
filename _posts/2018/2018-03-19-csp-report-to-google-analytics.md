---
title: "CSPレポート(Mixed Contentの問題)をGoogle Analyticsに集約する"
author: azu
layout: post
date : 2018-03-19T19:37
category: 雑記
tags:
    - CSP
    - HTTPS
    - MixedContent
    - SSL

---


Content Security Policy(CSP) ではさまざまな条件でコンテンツに制約をかけることができます。
そのCSPの中でも実際に制約をかけずにテストして、その結果を特定のURLにPOSTする `Content-Security-Policy-Report-Only` という仕組みがあります。

CSPにはHTTPSじゃないと画像やJavaScriptを読み込めなくする制約も設定できるので、HTTPからHTTPSに移行する際などに役立ちます。
例えば、リソースはすべてHTTPSから読み込まないと行けないというCSPの設定は次のようにかけます。

```
Content-Security-Policy: default-src https:
```

実際にこのCSPをレスポンスHTTPヘッダに設定するとCSPに対応しているブラウザは、HTTPSではない画像やJavaScriptなどをブロックします。

実際にブロックされると使えなくなって困るので、サイトの管理者はそのようなリソースが埋め込まれていないかを `Content-Security-Policy-Report-Only` でチェックすることができます。(チェックするのは実際にアクセスしたブラウザ)

```
Content-Security-Policy-Report-Only: default-src https: report-to https://example.com/csp-report
```

のようなレスポンスHTTPヘッダを設定することで、ユーザーがページにアクセスした時に、`https://example.com/csp-report` へPOSTでその情報を投げてくれます。(ブラウザが必要な情報を勝手に送信します)

ここでは`report-to`と書いていますが、古いブラウザは`report-uri`だったりするので注意します。

- [CSP: `report-to` directive. - Chrome Platform Status](https://www.chromestatus.com/feature/5826576096690176 "CSP: `report-to` directive. - Chrome Platform Status")

このCSPについては次の記事が詳しいです。

- [コンテンツ セキュリティ ポリシー  |  Web  |  Google Developers](https://developers.google.com/web/fundamentals/security/csp/?hl=ja)
- [Content Security Policy (CSP) - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP)
- [CSP Report 収集と実レポートの考察 | blog.jxck.io](https://blog.jxck.io/entries/2017-02-13/csp-report-case-study.html)
- [Content Security Policy(CSP) 対応と report-uri.io でのレポート収集 | blog.jxck.io](https://blog.jxck.io/entries/2016-03-30/content-security-policy.html)

このCSPレポートの仕組みは便利ですがそのデータの集約先をどうするかという問題がついてきます。
CSPレポートは PV * CSP違反のリソース数 となるため適当にやると膨大なデータが飛んでくる可能性があります。
このCSPレポートを収集できるサービスとして[report-uri.com](https://report-uri.com/ "report-uri.com")や[sentry.io](https://sentry.io/)などがあります。

- [Adopting and Reducing Challenges of Content Security Policy (CSP) with Sentry](https://medium.com/sourceclear/content-security-policy-with-sentry-efb04f336f59 "Adopting and Reducing Challenges of Content Security Policy (CSP) with Sentry")

どちらもそれだけのために使うのも微妙だなーと思いCSPについて調べていたところ、CSPの制約違反は`report-to`だけではなくJavaScriptのイベントとして取得する方法を見つけました。
`securitypolicyviolation`イベントではCSPの制約違反をした時にエラーオブジェクトと共に呼び出されます。

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.blockedURI);    
  console.log(e.violatedDirective);    
  console.log(e.originalPolicy);
});
```

- [SecurityPolicyViolationEvent - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/SecurityPolicyViolationEvent "SecurityPolicyViolationEvent - Web APIs | MDN")

このイベントを使えば、`report-to`(`report-uri`)の指定以外の方法でも任意の場所にCSPレポートを送ることができそうです。

こういったPVに関連するデータの集積といったら[Google Analytics](https://www.google.com/analytics/)がよく使われていると思います。
このサイトでも[Google Analytics](https://www.google.com/analytics/)を使っていたので、CSPレポートをGoogle Analyticsに送る[analytics.js](https://developers.google.com/analytics/devguides/collection/analyticsjs/ "analytics.js")のプラグインを作りました。

## [csp-report-to-google-analytics](https://github.com/azu/csp-report-to-google-analytics) 

- ソースコード: [azu/csp-report-to-google-analytics: CSP report to Google Analytics.](https://github.com/azu/csp-report-to-google-analytics "azu/csp-report-to-google-analytics: CSP report to Google Analytics.")
- CDN: <https://unpkg.com/csp-report-to-google-analytics/dist/csp-report-to-google-analytics.min.js>
  - [unpkg](https://unpkg.com/ "unpkg")から直接読み込めます

この[analytics.js](https://developers.google.com/analytics/devguides/collection/analyticsjs/ "analytics.js")のプラグインはCSPレポートを[イベント](https://developers.google.com/analytics/devguides/collection/analyticsjs/events?hl=ja "イベント トラッキング")としてGoogle Analyticsに送信します。

導入方法は簡単で既に[analytics.js](https://developers.google.com/analytics/devguides/collection/analyticsjs/ "analytics.js")を導入している人は、
`<script async src='https://unpkg.com/csp-report-to-google-analytics/dist/csp-report-to-google-analytics.min.js'></script>`でプラグインを別途読み込み、`ga('require', 'csp-report');`でプラグイン[analytics.js](https://developers.google.com/analytics/devguides/collection/analyticsjs/ "analytics.js")に適応するだけです。

```html
<!-- Google Analytics -->
<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
// require csp-report-to-google-analytics plugin
ga('require', 'csp-report');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
<!-- Load csp-report-to-google-analytics plugin -->
<script async src='https://unpkg.com/csp-report-to-google-analytics/dist/csp-report-to-google-analytics.min.js'></script>
```

今のGoogle Analyticsはgtag.jsがデフォルトみたいですが、gtag.jsはプラグインの仕組みをサポートしていないため[analytics.js](https://developers.google.com/analytics/devguides/collection/analyticsjs/ "analytics.js")でしか動きません。

- [gtag.js API? · Issue #202 · googleanalytics/autotrack](https://github.com/googleanalytics/autotrack/issues/202 "gtag.js API? · Issue #202 · googleanalytics/autotrack")

あとは待っていればCSPレポートがGoogle Analyticsのイベント画面に表示されます。
([SecurityPolicyViolationEvent](https://developer.mozilla.org/en-US/docs/Web/API/SecurityPolicyViolationEvent "SecurityPolicyViolationEvent")に対応しているブラウザでアクセスする必要があります。)

## efcl.infoでのテスト

このサイトでもHTTPSに移行するためにこのプラグインを導入してみました。
CSPは次のようなディレクティブが書かれています。
(`http://www.google-analytics.com/*`を許可しているのは、Google Analyticsがビーコンに画像を使っていて再帰的に掛かりそうな問題があるため。これBeacon APIにすれば解消するのかも)

```
Content-Security-Policy-Report-Only: default-src https: http://www.google-analytics.com/* 'unsafe-eval' 'unsafe-inline';
```

- [Add CSP report by azu · Pull Request #158 · efcl/efcl.github.io](https://github.com/efcl/efcl.github.io/pull/158 "Add CSP report by azu · Pull Request #158 · efcl/efcl.github.io")

実際に取得できたCSPレポートはGoogle Analyticsの管理画面で見ることができます。
Google Analyticsの[イベント トラッキング](https://developers.google.com/analytics/devguides/collection/analyticsjs/events?hl=ja "イベント トラッキング")を使っているため自動的にページなどに紐付いたデータとなっています。

![image](https://monosnap.com/file/T6PG3DJYTrCCtkpaGf7iAIL2bknlPm.png)

![image](https://monosnap.com/file/nLN63lZGRFY5vyhJE5dZi7HHSFF33f.png)

このデータはHTTPSへの移行する時のMixed Content探しの指標データなどとして利用できると思います。

もっとしっかりと分析したい人はAWSのAPI Gatewayで作成したAPIを`report-to`(`report-uri`)に指定し、[Amazon Kinesis Data Firehose](https://aws.amazon.com/jp/kinesis/data-firehose/ "Amazon Kinesis Data Firehose")にデータを流し、S3やRedshiftなどでデータを分析するのがいいと思います。

- [Web サービスの完全 HTTPS 化 - クックパッド開発者ブログ](http://techlife.cookpad.com/entry/2017/04/19/190901 "Web サービスの完全 HTTPS 化 - クックパッド開発者ブログ")

Google Analyticsのイベントは送ることができるデータに制約があるので、[csp-report-to-google-analytics](https://github.com/azu/csp-report-to-google-analytics) では重要そうなデータしか送っていません。

## まとめ

[csp-report-to-google-analytics](https://github.com/azu/csp-report-to-google-analytics)を使ったCSPレポートを[Google Analytics](https://www.google.com/analytics/)に送る方法を紹介しました。

CSPのレスポンスHTTPヘッダを指定する必要がありますが、結構気軽にできるので面白いかもしれません。

残念ながら `<meta>`タグでは `Content-Security-Policy-Report-Only` が利用できません。
(通常のCSPは設定できますが実際にコンテンツが表示されなくなるので、目的に合わない)
そのため、この手法にはHTTPヘッダを設定できるサーバが必要です。
このサイトはGitHub Pagesから[Netlify](https://www.netlify.com/)に移すことで、この問題を回避しています。
