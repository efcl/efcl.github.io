---
title: "gas-webpagetestでWebPagetestのパフォーマンス計測を自動化、可視化する"
author: azu
layout: post
date : 2018-10-22T10:59
category: JavaScript
tags:
    - JavaScript
    - browser
    - performance

---

[gas-webpagetest](https://github.com/uknmr/gas-webpagetest)という[Google Apps Script](https://developers.google.com/apps-script/)で動作するパフォーマンス計測ツールがあります。

このツールでは、[WebPagetest][]という指定URLなどにウェブブラウザでアクセスし、パフォーマンスに関するメトリクスを取得するツールの計測や結果の記録を自動化できます。

記録は[Google SpreadSheet](https://www.google.com/intl/ja_jp/sheets/about/)に逐次書き込まれ、その記録を[Google DataStudio](https://datastudio.google.com/)で可視化したりダッシュボードを作成できます。

ここまででてきたツールは無料で十分に使えます。
[gas-webpagetest][]を使うことでとりあえず計測を自動化してみるようなところを殆どコストなしに実現できます。

[gas-webpagetest][]を使った取得した記録データをGoogle DataStuidoで可視化したサンプルは次のURLで確認できます。

- DataStudio + gas-webpagetest: <https://datastudio.google.com/u/0/reporting/16CAqnC3ErfJ_B0UypUq4zQzYdReuW24i/page/1hVS>

[![datastudio-example](https://raw.githubusercontent.com/uknmr/gas-webpagetest/master/docs/img/datastudio-example.png)](https://datastudio.google.com/u/0/reporting/16CAqnC3ErfJ_B0UypUq4zQzYdReuW24i/page/1hVS)

なぜ計測的に計測するかについては、次のスライドで紹介しています。
他のパフォーマンス計測サービスなども紹介しています。

- [Webpagetestから始める継続的パフォーマンス改善](http://azu.github.io/slide/2018/roppongijs/webpagetest-performance.html)

## gas-webpagetest


[gas-webpagetest][]は1サイト = 1リポジトリ = 1SpreadSheetのデザインになっています。
(1:nの対応もやればできなくないと思いますが、[IssueやPR](https://github.com/uknmr/gas-webpagetest)を出すといい気がします)

そのため計測するサイトごとにSpreadSheetを作成して、そこへ紐づく形で[Google Apps Script](https://developers.google.com/apps-script/)(gas-webpagetest)をデプロイします。

[Google DataStudio](https://datastudio.google.com/)側で複数のデータソースの合成などもできるので表示側でデータをくみあわせるといったことも可能です。

## 使い方

[gas-webpagetest][]はNode.jsと[Yarn](https://yarnpkg.com/)が必要なので先にインストールしておいてください。


### 1. git clone this repository

次のリポジトリを好きな名前でcloneします。

```
git clone https://github.com/uknmr/gas-webpagetest.git
cd gas-webpagetest
```

### 2. Install dependencies by yarn

リポジトリの依存を[Yarn](https://yarnpkg.com/)でインストールします。
[gas-webpagetest][]では[clasp](https://github.com/google/clasp)という[Google Apps Script](https://developers.google.com/apps-script/)を開発するためのフレームワークを使っています。

```
yarn install
```


### 3. clasp login

[clasp](https://github.com/google/clasp)を使ったことがない人は、[Google Apps Script](https://developers.google.com/apps-script/)をCLIからデプロイするために認証が必要です。

次のコマンドを叩くと、ブラウザで[Google Apps Script](https://developers.google.com/apps-script/)の認証画面が開くので認証してください。

```
yarn clasp login
# Login and Authorize clasp
```



### 4. Create empty spreadsheet that is recorded result of WebPagetest


ここから、記録するGoogle SpreadSheetの準備をしていきます。

1. [ここから新しいSpreadSheet](https://docs.google.com/spreadsheets/u/0/)を作成する
2. SpreadsheetのIDをコピーしておく
- たとえばSpreadSheetが `https://docs.google.com/spreadsheets/d/asn__asxScJZi-2asd4242sd23HO441Ok/edit#gid=0` というURLの場合は
  - `asn__asxScJZi-2asd4242sdHOeB6t5XFdOk` が **spreadsheet id** です。
  
### 5. Create new Google Apps Script and connect it your spreadsheet.

次のコマンドをターミナルで叩くと新しい[Google Apps Script](https://developers.google.com/apps-script/)を作成して、そのApps Scriptを先ほど作成したSpreadSheetに紐づけます。

先ほどコピーした**spreadsheet id**を使うので、次のように引数に渡してください。
`<script title>`はなんでも大丈夫なので、分かりやすいタイトルにしておくといいです。

```
yarn run create-gas "<script title>" "<spreadsheet id>"
# Example
# yarn run create-gas "gas-webpagetest" "asn__asxScJZi-2asd4242sdHOeB6t5XFdOk"
```

`yarn run create-gas` command's arguments:

- 第1引数: Google Apps Script title
- 第2引数 **spreadsheet id**

このコマンドで次のエラーが出る人は、表示されているURLにアクセスして、パーミッションを許可して"ON"にしてください。
初めて[Google Apps Script](https://developers.google.com/apps-script/)を書く人はオフになっていると思います。

> Error: Permission denied. Enable the Apps Script API:
> https://script.google.com/home/usersettings

## 6. Configure `.env` file

ここからは、どのサイトを計測するかやどのような頻度や設定で計測するかを`.env`ファイルに書いています。cloneしたリポジトリには`.env`というファイルが入っているので、このファイルを編集します。

`.env`ファイルの次の3つは最低限変更が必要です。
また、[WebPagetest][]のAPIキーが必要になるので[WebPagetest - Get API Key](https://www.webpagetest.org/getkey.php)から登録して取得してきてください。(一日150回まで叩けます)

- `WEBPAGETEST_API_KEY`: WebPagetest API key
    - [WebPagetest - Get API Key](https://www.webpagetest.org/getkey.php)からメールアドレスを登録するAPIキーが手に入る
- `RUN_TEST_URL`: 計測したいURL
- `SHEET_NAME`: SpreadSheetで記録先となるシートの名前
    - シートの名前は下部に表示されているタブみたいな部分の名前です。
    - ![Sheet Name is Here](https://raw.githubusercontent.com/uknmr/gas-webpagetest/master/docs/img/spread-sheet-name.png)

Note: URLがログイン必須の場合は、[WebPagetest script](https://github.com/uknmr/gas-webpagetest/blob/master/README.md#additional-webpagetest-script)を書いてログインするスクリプトを指定する必要があります。

`.env`のサンプルは次のような感じです。
モバイルで計測したい場合は`WEBPAGETEST_OPTIONS_MOBILE`オプションを`1`に端末を指定します。
PCで計測したい場合は`WEBPAGETEST_OPTIONS_MOBILE`オプションを`0`して、`WEBPAGETEST_OPTIONS_LOCATION=ec2-ap-northeast-1:Chrome`でブラウザや場所を指定します。

```.env
# WebPagetest API Key
## See https://www.webpagetest.org/getkey.php
WEBPAGETEST_API_KEY=A.asdasdasdsdasdasdasdasjdlasjd
# Test Target URL
RUN_TEST_URL=https://www.youtube.com/watch?v=6UeRMMI_IzI
# Run Test interval
## Set run test interval by using Google Apps Script Time-Based Trigger
## Execute runTest function every RUN_TEST_INTERVAL
## Example:
## `2h`, `1h`, or `30m`
## Limitation:
## - Can not combine hour with minutes
##   - `1h30m` => Error
## - Allow to set one of `1m`, `5m`, `15m`, `30m` as minutes
RUN_TEST_INTERVAL=30m
# Sheet name to record
SHEET_NAME=stats
# If it is 0, suppress Network Error report from Google Apps Scripts
REPORT_NETWORK_ERROR=0

# WebPagetest Options
# https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis
## Number of test runs (1-10 on the public instance)
## gas-webpagetest use median results
WEBPAGETEST_OPTIONS_RUNS=3
## Location to test from
WEBPAGETEST_OPTIONS_LOCATION=ec2-ap-northeast-1:Chrome
## Set to 1 to skip the Repeat View test
WEBPAGETEST_OPTIONS_FVONLY=1
## Set to 1 to capture video (video is required for calculating Speed Index)
WEBPAGETEST_OPTIONS_VIDEO=1
## Set to 1 to disable optimization checks (for faster testing)
WEBPAGETEST_OPTIONS_NO_OPTIMIZATION=1
## Set to 1 to have Chrome emulate a mobile browser
WEBPAGETEST_OPTIONS_MOBILE=0
## Device name from mobile_devices.ini to use for mobile emulation
## only when mobile=1 is specified to enable emulation and only for Chrome
WEBPAGETEST_OPTIONS_MOBILE_DEVICE=Pixel
##  Set to 1 to have a lighthouse test also performed (Chrome-only, wptagent agents only)
WEBPAGETEST_OPTIONS_LIGHTHOUSE=1
## WebPagetest Scripting Option
## Set file path to scripting file
## https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting
# WEBPAGETEST_OPTIONS_SCRIPT_PATH=./script.txt
....
```

### 7. Deploy the `gas-webpagetest` script to your Google Apps Script: `yarn run deploy`

最後のこのスクリプトを[Google Apps Script](https://developers.google.com/apps-script/)としてデプロイします。

次のコマンドでデプロイできます。設定を変更したい場合は再度デプロイしてください。

```
yarn run deploy
```

## Setup schedule for `gas-webpagetest` script

`gas-webpagetest`がデプロイされれると、紐付いているSpread Sheetには次のようにメニューが出現します。

![spread sheet menu](https://raw.githubusercontent.com/uknmr/gas-webpagetest/master/docs/img/gas-webpagetest-menu.png)

- Run Test
  - WebPagetest APIを使ってテストを手動実行します
- Get Test results
  - テストした結果を取得してSpread Sheetに書き込みます。 
- Update column titles
  - 必要なカラムのタイトル(1行目)を更新します。初回に実行しておくと良いです。
- Set run test time triggers
  - `.env`で設定した頻度で定期的にRun Testを実行するCronをセットします。
  - デフォルトでは30分に1度計測します

はじめて使うときは次のような手順を踏めばあとは自動的に計測記録が溜まっていきます。

0. Spread Sheetにアクセスする
1. "Update column titles"を実行する
2. "Set run test time triggers"を実行する

後は数日とか1週間程度放置しておくと記録が増えているはずです。
手動で試したい場合は`Run Test`を実行してみてください。(計測は時間がかかるので定期的に`Get Test results`も必要です)

![spread-sheet-example.png](https://raw.githubusercontent.com/uknmr/gas-webpagetest/master/docs/img/spread-sheet-example.png)

## 可視化

[Google DataStudio](https://datastudio.google.com)とSpread Sheetを連携させると記録したデータを可視化できます。

1. [Data Studio Connect to Data](https://datastudio.google.com/data)にアクセスして、先ほどのSpread Sheetをデータソースとして追加する
2. [Template Project](https://datastudio.google.com/open/16CAqnC3ErfJ_B0UypUq4zQzYdReuW24i)を開く
3. テンプレートプロジェクトの右上の"このレポートをコピーして作成"があるので、これをコピーして自分のSpreadSheetをデータソースとして選択する

これだけで次のようなダッシュボードが見れるようになります。

[![datastudio-example](https://raw.githubusercontent.com/uknmr/gas-webpagetest/master/docs/img/datastudio-example.png)](https://datastudio.google.com/u/0/reporting/16CAqnC3ErfJ_B0UypUq4zQzYdReuW24i/page/1hVS)

## おわりに

[gas-webpagetest][]はもともと[@uknmr](https://github.com/uknmr)さんが作成して公開しているツールです。

- [DataStudioとGASでWebPagetestの計測結果をグラフ化する | mediba Creator × Engineer Blog](https://ceblog.mediba.jp/post/154874126622/datastudio%E3%81%A8gas%E3%81%A7webpagetest%E3%81%AE%E8%A8%88%E6%B8%AC%E7%B5%90%E6%9E%9C%E3%82%92%E3%82%B0%E3%83%A9%E3%83%95%E5%8C%96%E3%81%99%E3%82%8B)

似たような仕組みのものを作ろうとしていたところ、[gas-webpagetest][]があったので機能追加していいか聞いて、[大量のPRを送って](https://github.com/uknmr/gas-webpagetest/pulls?utf8=%E2%9C%93&q=sort%3Aupdated-desc+author%3Aazu)ひとまず自分が欲しかったものができた感じです。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr"><a href="https://twitter.com/uknmr?ref_src=twsrc%5Etfw">@uknmr</a> こんにちは。<br>claspでWebPageTestの計測/記録スクリプトを書こうとしていて、<a href="https://t.co/O6lUavovFz">https://t.co/O6lUavovFz</a> を見つけて、やりたいことはほぼ同じでした。<br>そのため足りない部分についてのPRとかを送ろうかなと思ったのですが、一部破壊的な変更もしないといけないためどうするのがいいでしょうか?</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1023220515823968256?ref_src=twsrc%5Etfw">July 28, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



[WebPagetest][]で十分なパフォーマンスデータが取れるかはまた別の問題です。
パフォーマンスはいろいろな要因がぶつかりあった副作用によって変化するので、ちゃんととるならもっといろいろなデータが必要です。また現在の`gas-webpagetest`では中央値を使っているので、「ユーザのn%が改善するから入れよう」といったパーセンタイル的な指標のデータにはなっていません。

- [Prioritizing the Long-Tail of Performance - TimKadlec.com](https://timkadlec.com/remembers/2018-06-07-prioritizing-the-long-tail-of-performance/)

それでもファイルサイズなどUAにあんまり依存しないデータを集めるにはコスト面も含め手軽だと思うので、興味ある人は試してみてください。

- [uknmr/gas-webpagetest](https://github.com/uknmr/gas-webpagetest)

[WebPagetest]: https://www.webpagetest.org/
[gas-webpagetest]: https://github.com/uknmr/gas-webpagetest
