---
title: "英語の文章をルビ翻訳(ふりがな和訳)するGreasemonkeyを書いた"
author: azu
layout: post
date : 2014-11-30T20:15
category: JavaScript
tags:
    - 翻訳
    - Greasemonkey
    - Firefox
    - JavaScript

---

## ルビ翻訳

タイトルで分かる方は分かるかもしれませんが、いわゆるルビ翻訳をするものを書きました。

![img](http://efcl.info/wp-content/uploads/2014/11/30-1417346468.png)

[ずるっこ！](http://zurukko.jp/ "ずるっこ！") などがイメージとしてかなり近いサービスで、
これをローカルに辞書を持ってどこでも翻訳をかけられるGreasemonkeyを書きました。

類似するジャンルのものだと以下のようなのがありますが、使いどころが違ったり動いてなかったりするので作りました。

- [英語翻訳 - ふりがな翻訳 ＆ スラッシュリーディング powered by Rubiyaku.com](http://rubiyaku.com/)
- [ルビ翻訳 (firefoxアドオン)](http://www.kenmaz.net/translator/)
- [Ruby Reader (@ruby_reader) | Twitter](https://twitter.com/ruby_reader)

## [en-ja-ruby-translator](https://github.com/azu/en-ja-ruby-translator "azu/en-ja-ruby-translator")

インストール方法ですが、辞書に[GENE95 辞書](http://www.namazu.org/~tsuchiya/sdic/data/gene.html "GENE95 辞書")を使っているのでそのままで使える状態では配布してないです。

ライセンスがイマイチ分からないのですが、再配布するには許可が必要そうで(同梱だと再配布になるので)、作者(Kurumi さん)への連絡手段がないので含めてない感じです。(詳しい人の見解が聞きたい)

```
git clone https://github.com/azu/en-ja-ruby-translator.git
cd en-ja-ruby-translator
make install
```

で `dist/en-ja-ruby-translator.user.js`に辞書入りのGreasemonkeyができるのでこれでインストールできます。

やってることとしては[GENE95 辞書](http://www.namazu.org/~tsuchiya/sdic/data/gene.html "GENE95 辞書")から辞書をダウンロードして、辞書ファイルを`data/gene95/gene.txt`にUTF-8にエンコードして置いて、`node tools/dict-to-json.js`すれば辞書のJSON版が作れるので、これをビルドして使ってます。


## 使い方

選択したい場所を Alt + クリック(選択範囲)を作れば、その周辺を翻訳してくれます。

![gif](http://gyazo.com/530524cc50b541b85ae517904bd1b2e7.gif)

元の文章とルビが一緒だと見にくいので、安直にちょっと文字サイズを大きくしてます。

## 仕組み

文章を単語で区切って、辞書とマッチするかを何百も繰り返して、`<ruby>`タグにDOMを書き換えるだけです。

Firefoxは`<ruby>`対応してないですが、以下のCSSをベースにそれっぽく表示してます。

- [htmlruby-firefox/htmlruby.css at master · sakai135/htmlruby-firefox](https://github.com/sakai135/htmlruby-firefox/blob/master/data/styles/htmlruby.css "htmlruby-firefox/htmlruby.css at master · sakai135/htmlruby-firefox")

数年前に[英辞郎のSQLite辞書を作って同じような事](https://github.com/azu/JetpackSDK/tree/master/eijiro-ruby-reader "JetpackSDK/eijiro-ruby-reader at master · azu/JetpackSDK")をやった時は遅すぎてダメだったので、辞書をメモリにまるごと載せてしまったほうがいいかなと思って雑にGreasemonkeyで実装した感じです。

結構適当に実装したけど、思ったより普通に動いてて面白い。

拡張機能として実装しても結局`<ruby>`の書き換えでContent Contextで動かす必要があるので、コンセプトを実証する感じでGreasemonkeyを選んだだけです。

![chromeとcontext](http://efcl.info/wp-content/uploads/2014/11/2014-11-30_20-37-45.png)

モジュール化して書いてるので[index.js](https://github.com/azu/en-ja-ruby-translator/blob/master/index.js "index.js")以外はGreasemonkeyに依存してない感じです。(なので他への移植とかはまあ出来る気がする)

## TODO

- イラない訳をクリックとかで消したい
- 熟語対応したい(今は熟語は辞書自体から消してるので1MBぐらいになってる)

今はスペースとかで文章を区切って、そこで単語のマッチをして和訳を出してるので熟語対応するには仕組み自体変える必要がありそうでやってない(いいアイデア欲しい)


- [azu/en-ja-ruby-translator](https://github.com/azu/en-ja-ruby-translator "azu/en-ja-ruby-translator")