---
title: "#uruu_sushi アウトラインメモ"
author: azu
layout: post
date : 2016-02-29T23:10
category: イベント
tags:
    - security
    - JavaScript
    - browser

---

うるう年なので[#uruu_sushi](https://twitter.com/hashtag/uruu_sushi?src=hash "#uruu_sushi")を食べてきた。

- [#uruu_sushi - Togetterまとめ](http://togetter.com/li/944473 "#uruu_sushi - Togetterまとめ")

脆弱性報告

- バグハンター
- [HackerOne: Vulnerability Coordination and Bug Bounty Platform](https://hackerone.com/ "HackerOne: Vulnerability Coordination and Bug Bounty Platform")
- Bug Bountyのプラットフォームなども最近できてきた
	- 報告者/企業のレーティングなどができる
	- 特定のレーティング向けの案件なども存在する
- 脆弱性報告はやり取りのコストがある
- そのため単純にBug bounty programが増えるだけだと嬉しくない
- 報告したことに対して即時レスポンスがあると報告者として安心できる
 
<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">「報告者としては新規報告先とのやりとりは結構負担になるので、報告先が増えてもそんなに嬉しくない」<br> <a href="https://twitter.com/hashtag/uruu_sushi?src=hash">#uruu_sushi</a></p>&mdash; サスケ (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/704269476515041280">February 29, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

報奨金制度

- バグハンター同士、企業間同士の脆弱性に関する情報共有する場所がない
- 報告を受け付ける側も脆弱性報告により新しい攻撃方法を知ることがある
	- 関連サービスに同様の問題があり、そちらを直すことができる
- [共通脆弱性評価システムCVSS](https://www.ipa.go.jp/security/vuln/CVSS.html "共通脆弱性評価システムCVSS")
- ドメインに依存しないので、指標として扱いやすい
- 逆にオープンリダイレクターの扱いが高いなど、現実に則してないケースもある


Case

- 安全にファイルダウンロードを実装するのは難しい
- ServiceWorkerは本当に安全?
- HTMLをHTTPSでホスティングするサービスで何か悪さができてしまわないか
- 普通にウェブサイトで普通のXSSというような問題は少なくなってきてる
- Railsのようなフレームワークに普通に乗っていればそういう問題はおこりにくい
- ブラウザというサンドボックスはある程度安全
	- そこから外れたものを作った場合に問題が起こりやすい
	- Electron, Firefox OS

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/uruu_sushi?src=hash">#uruu_sushi</a> これの話  &quot;Firefox OS is not helping the web — Anne’s Blog&quot;  <a href="https://t.co/XhdnAdaDTX">https://t.co/XhdnAdaDTX</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/704275123025477632">February 29, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">XSSとかSQLiとかはどんどん減ってきてる。今はアクセス権問題が割合として増えてきている <a href="https://twitter.com/hashtag/uruu_sushi?src=hash">#uruu_sushi</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/704290564158525440">February 29, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

	
## Node.js と ES6 modules

- [002: ES6 module interop by bmeck · Pull Request #3 · nodejs/node-eps](https://github.com/nodejs/node-eps/pull/3 "002: ES6 module interop by bmeck · Pull Request #3 · nodejs/node-eps")
- interoperabilityに関するIssue
- interoperability優先 vs 原則
- interoperabilityは大事だが、何のためにES6モジュールを使うのかを見失っている可能性
	- 静的に解析出来る
	- ブラウザ/Nodeどちらでも動く
	- 本来はこの2つが目的だったはず。interoperabilityのためにこれが犠牲になってしまうのでは。
- npmというエコシステムの互換性
- 互換性という魔法のコトバがある限り意見の一致が難しい
- Python 3になってはいけない
- 意見が割れてる、議論になってない

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">Python3ifyじゃなくて、Python3ishだった <a href="https://t.co/fwE7PBbIkQ">https://t.co/fwE7PBbIkQ</a> <a href="https://twitter.com/hashtag/uruu_sushi?src=hash">#uruu_sushi</a></p>&mdash; teppeis (@teppeis) <a href="https://twitter.com/teppeis/status/704327441595019265">February 29, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## どうやって脆弱性の探し方を学ぶのか

- 脆弱性の探し方はどうやって学ぶのか
- コード書くときにコード書くパターンがあるように、脆弱性を探す人も脆弱性を探すパターンがあるはず
- 検査的な文字列パターンを持ってる
- 特殊なツールは使ってない
- 逆に普通の開発者がどうやってセキュリティ的な問題を見つけたり、どういうツールを使ってるのかを知らない

セキュリティ診断

- バグハンターのような特殊な人達に調査を頼むのと、脆弱性診断サービスの違い
- セキュリティ業界とウェブ開発者の意識の違い
	- セキュリティ業界が最新のウェブに疎く見える問題
	- ウェブ側もセキュリティをよくわからない問題
- 間に繋ぐような人が重要という話

## おわり

セキュリティ寿司は久々な気がする。

- [テストとセキュリティの葉桜JSに参加してきた | Web Scratch](http://efcl.info/2014/0415/res3844/ "テストとセキュリティの葉桜JSに参加してきた | Web Scratch")
