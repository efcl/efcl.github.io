---
title: "W3C TAG デベロッパー・サミット アウトラインメモ"
author: azu
layout: post
date : 2016-11-02T20:50
category: イベント
tags:
    - W3C
    - Spec
    - Discussion

---


[W3C TAG デベロッパー・サミット](http://frontend.connpass.com/event/42323/ "W3C TAG デベロッパー・サミット")に参加してきたのでメモ。

## Web Payment API - eiji

- Payment APIはUXを改善するためのAPI
- 購入するためのAPIじゃない
- デモ
	- Polymer Shop

## WebRTC と SFU - sakkuru


- WebRTCてきななにか
- P2Pでリアルタイムにやり取り
- SkyWay
	- WebRTCを使うためのプラットフォーム
- つらいことが多い WebRTC
- WebRTCの通信が始まるまで
	- ブラウザ同士でコネクションを結ぶ
	- やりとりはSDPというテキストデータ
	- ブラウザによってSDPが違う
		- Chrome PlanB SDP
		- Firefox Unified Plan SDP
- SFU
	- P2Pでやる場合はフルメッシュでやる必要がある
		- 自分以外全てに通信しないといけない
		- 負荷が高い
	- SFU
		- 中央にサーバを置く
		- クライアントはSFUに向かって通信する
		- クライアントの負荷が減る
	- SkyWay
		- SFUサーバの無償提供
- 最近 SFU
	- まだChromeのみ
	- Firefoxも実装始まった

## HTTPS migration in local network @  W3C Trac 

> [WebRTCとSFU](http://www.slideshare.net/sakkuru/webrtcsfu "WebRTCとSFU")

- ローカルネットでHTTPSを使いたいという話
- HTTPとHTTPSのやり取りの問題
	- Secure Context
	- mixed contextの問題
- Video Stream
	- ローカルキャッシュサーバ
- この話の問題
	- ローカルの機器にどんなドメインを付けるのかなどの問題
- A) Public DNS + Public Certificate
	- 機器の提供側がPublicなDNSと証明書認証局を運営
	- ローカルIPに対するものをちゃんと返す
- B) mDNS + Private ".local" Certificate
	- Let's Encryptのローカル版みたいな
	- ブラウザ側に新しいAPIがいる

----

# Breakout Session: CSS Houdini

1時間ぐらいTOPICに対してDiscussion

- CSSのレイアウトの部分をSecureとPeformantな方法で持ってくるAPI
- JavaScriptからそういったものを扱う方法
- ●として扱うとか(Paint)
- レイアウトだけじゃなくて、テキストだったり、エフェクト(影)とかを及ぶ影響を与えることができるAPI群に総称
- CSSのリグレッションテスト
- これまでのCSSの表現にJavaScriptで介入することができる
- カスタムプロパティとかを持っと簡単に追加できるように
	- 仕様を追加するまであまりに大きなこと
	- Boxtree API
	- CSS自体の拡張とAPIとして拡張ポイント
	- CSSは影響範囲が大きすぎるので、新しい機能を提供するのが難しい
- Custom Elementなら
	- `-`を含めろとかがある。 
	- Custom Propertyは`--`で開始するというルールなので、既存のものとはぶつからない
	- 新しいものについてはまだ検討されてない
- マイルストーン
	- 足並み揃えるの難しいのでないよ
- HoudiniはCSSの補完的な機能
	- CSSに新しい機能を追加するときに待つ必要があった
	- これを開発者的にJavaScriptで追加できるようなAPIを提供する仕様


----

- Incubation WG
	- ウェブの機能に関する問題をどう解決するかという議論している
	- Fast Track的な早いパスでウェブ標準を作っていく
	- いいアイデアを集めたりする
- 2つの方向
	- 新しい機能を追加する
	- 既にある機能を拡張する
- Incubationの意味
	- 色々議論して議論を進めていくという意味
- [WICG](https://discourse.wicg.io/ "WICG")
	- 誰でも気軽にコミュニティ


-----

- Web Payment Request API
	- UIは大きくは変更できない
	- ロゴを入れるとかはできる
- セキュリティ
	- 今より悪くなることはない
	- 今はフォームで送るのでハックされる可能性がある
	- Web Payment Request APIはtokenでやり取り
- 月額課金
	- なんとかなる?
- Custom Field
	- 今のところはない
	- 検討される余地がある


----

- Security
	- TAG
	- HTTPSを広く使われるようにする
	- Static ContentのサーバでもHTTPS使う必要があるのか?
		- Privacyのprotectionが一つのニーズ
		- Mixed Contentの問題
			- サードパーティコンテンツの問題
	- Let's Encryptの証明書 EVに対して信頼性
		- セキュリティのTrustは数を組み合わせて実現する
		- EV/DV証明書はTrustを組み合わせてやってる
		- なので信頼性がほしいならEVとかの方がー
		
		
		
-----

## memo

ahomuさんとパフォーマンス計測について話してたメモ

- 小さな改善はやはりブレに吸収される
- のでコツコツ改善していくしかない
- 早いうち定常的に計測して視覚化してないと、どこでおそくなったか分からないので、早い段階から値を記録してた方が良い
- マシンでperfの値が違う問題は sitespeed.io とかspeedcurveとか外から見るやつを回し続ける
- speedcurve使ってるけど、完璧なソリューションというわけでもない
- けど、どこで問題になったかが分かりやすくなる
- mousemoveとかインタラクションに対するパフォーマンスは、機械的に計測しにくいので、手動で…
- :money_with_wings: で人を動かした方が安くて質が高い
