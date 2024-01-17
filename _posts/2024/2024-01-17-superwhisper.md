---
title: "superwhisperでの音声入力を試す"
author: azu
layout: post
date : 2024-01-17T14:55
category: 雑記
tags:
    - macOS

---

[superwhisper](https://superwhisper.com/)という、[whisper.cpp](https://github.com/ggerganov/whisper.cpp)を使った音声入力ができるmacOSアプリケーションを最近使っています。
基本的には[ggerganov/whisper.cpp](https://huggingface.co/ggerganov/whisper.cpp/tree/main)のモデルを使って、音声認識しながら文字入力ができるアプリケーションです。

## 特徴

- Whisperの認識精度が高い
- かなり早く喋っても認識してくれる
- 日本語も認識してくれるモデルがある
- 日本語で喋って英語に翻訳してくれる機能もある
- オフライン対応
- 有料: サブスク と 買い切り の2種類のプランがある
    - 無料で15分のトライアル、その後は選べるモデルが制限される

公式サイトのデモをみると、かなり早く喋っても認識してくれるのがわかります。
大抵の人にとっては、多分文字入力するよりしゃべったほうが早いぐらいの入力速度が出ると思います。

- [superwhisper](https://superwhisper.com/)

長文はそこまで得意じゃないけど、1行とか2行ぐらいの文章はかなり早く入力できるんじゃないかなって気がします。
句読点とかは勝手に入れてくれるので、適当にしゃべっても、ある程度文章っぽい文章になると思います。

認識の精度はMacBook Airの本体のマイクを使っても普通に認識してくれます。
それでいて、間違いもそこまで多くないのでかなり実用的です。(単語とかはたまに怪しいが文字列置換機能を辞書的に使える)

大体1-2行のテキストだとMacBook Air M2で2~3秒ぐらいの認識速度です。
文章の量が多くなるほど、認識時間が長くなるのでこの辺はまだ長文に向いてないのかなという印象です。
(Realtimeモードがあるので、この辺はインクリメンタルな結果を合成すればかなり早くなりそうな気はします)

## 使い方

基本的には、[superwhisper](https://superwhisper.com/)のサイトからダウンロードして、起動するだけです。
使い方は単純で、使いたいモデルを選択して、起動すると音声認識が始まるので喋るだけです。

![SuperWhisper](https://efcl.info/wp-content/uploads/2024/01/17-1705472157.png)

認識した結果はクリップボードにコピーするか、そのままペーストするか、実験的な機能としては文字入力を再現する機能もあります。

設定は、認識するモデルや喋る言語、認識した結果を英語に翻訳するかなどが選べます。
またリアルタイムでその認識した結果を出してくれるか、とかいう設定があります。

![設定](https://efcl.info/wp-content/uploads/2024/01/17-1705471631.png)

モデルはWisperのモデルを使っているので、基本的に認識精度とその認識した結果を変換する時間とのトレードオフでモデルを選ぶ感じです。

- [ggerganov/whisper.cpp](https://huggingface.co/ggerganov/whisper.cpp/tree/main)

大体の人はProのモデルを選ぶのがいいと思います。

![モデル](https://efcl.info/wp-content/uploads/2024/01/17-1705471724.png)

設定自体は複数作れます。
自分の場合は、日本語で喋って日本語で出力するやつ と 日本語で喋って英語で出力するやつを作成しています。

![複数の設定をもてる](https://efcl.info/wp-content/uploads/2024/01/17-1705471523.png)

## ユースケース

### 音声入力と操作が同時にできる

Macの音声入力とは違って、音声の認識と操作が同時に行えます。

- [Macでメッセージや書類を音声入力する - Apple サポート (日本)](https://support.apple.com/ja-jp/guide/mac-help/mh40584/mac)

この特性を利用すると、喋りながらその結果を貼り付ける場所を探すという操作ができます。
大抵の音声認識だと、まずテキストフィールドを探してフォーカスを当ててから喋るというステップになります。
また、しゃべってる最中に他の操作ができなくなります。

Superwhisperは、これを無視できるのがかなり面白いところです。
たとえば、喋りながら、Twitterを開いて、その結果を貼り付けるという操作ができます。

### 気軽なメモとして使う

superwhisperの結果は、自動的にHistoryに追加されます。

![History](https://efcl.info/wp-content/uploads/2024/01/17-1705472414.png)

また、superwhisperの結果は`~/Documents/superwhisper/recordings/`にtxtとjsonとwavファイルが保存されます。

![finder](https://efcl.info/wp-content/uploads/2024/01/17-1705472376.png)

これを使うと、簡単なメモとして使うことができます。

ファイルの変更を監視すれば良い感じに使えそうな気がします。

### 作業ログとして使う

自分の場合は作業ログをNotionに書くようにしてるのですが、このログをsuperwhisperとショートカット.appで追加できるようにしています。

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">ショートキーでどこからでもメモを取って作業ログに追加できるようになった。<br>ショートカット.app の複数行入力を使えるのが結構便利だ。 <a href="https://t.co/G9fDRXBCE0">pic.twitter.com/G9fDRXBCE0</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1747254863371948237?ref_src=twsrc%5Etfw">January 16, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

[Macの「ショートカット」](https://support.apple.com/ja-jp/guide/shortcuts-mac/apdf22b0444c/mac)では複数行の入力ができるテキストフィールドが作れるので、フィールドを出してそこにSuperwhisperで入力して、あとはその内容を独自のスクリプトを使ってNotionに追加しています。

- [Notionの無理しないデイリーノート・作業ログ｜eetann](https://note.com/hideharu092/n/n472538ad6009)

### 日本語で喋って英語を書く

superwhisperには日本語とかで入力して、その結果を英語に翻訳する機能があります。

> SuperWhisper has a function to translate the result into English by typing in Japanese.

この機能を使うと、細かい単語の修正は必要ですが、英文はある程度書けます。
GitHubとかで適当なコメントを返すのに、この機能を使うとかなり楽になりました。

その出力された内容をGoogle翻訳とかで日本語にして、ある程度正しいかを判断すればいいので、そんな考えなくても書けるようになったのがいいところです。
わざわざDeepLとかGrammerlyとかのサイトに行かなくても良くなります。

これによって、かなりコンテキストスイッチが減る感じで、気軽にコメントできるようになるのが良いところなのかなと思います。
(そこまで厳密な英語が必要ではないので)

### コマンドラインなどからSuperwhisperを起動する

`superwhisper://record` というURLスキームでSuperwhisperの音声認識を開始できます。

- [extensions/extensions/superwhisper/src at 78533fc83f1d05d886dafa8c57aa56329d5b73e2 · raycast/extensions](https://github.com/raycast/extensions/tree/78533fc83f1d05d886dafa8c57aa56329d5b73e2/extensions/superwhisper/src)

これを使うと、`open`コマンドなどからSuperwhisperの音声認識を開始できます。

```
open superwhisper://record
```

また、[Alfred](https://www.alfredapp.com/)、[Raycast](https://www.raycast.com/)からこのURLスキーマは利用できます。
他にも入力中にモード(設定)を切り替えられるのですが、これに対応するURLスキーマもあります。

自分の場合は、[Karabiner-Elements](https://karabiner-elements.pqrs.org/)でFnキーを押すとSuperwhisperを起動するようにしています。
先ほどの作業ログも余ってるFキーとかで起動できるようにしています。

## まとめ

[superwhisper](https://superwhisper.com/)は音声認識の精度がよく、かなり使いやすいです。
個人的には入力と操作を切り離せるのが かなり面白いところだなと思っています。
音声認識はそこまで厳密な精度がいるものじゃなくて、どっちかというと入力速度とか気軽さの方が大事だと思ってます。
その辺をフリーハンドにできるのがいいところかなと思っています。

iOSのSiriは速度も精度(スペルチェックと組み合わせる)もかなり良かったりします。
音声認識を試したことがない人は、一度遊んでみると面白いと思います。

音声操作は[Talon](https://talonvoice.com/)とか別のアプローチがあるので、その辺はまた別の方法になっていくのかなと思っています。

- [体の動きや音声入力でアプリケーションをハンズフリー操作したりプログラミングしたり文章を書いたりしてみる | Web Scratch](https://efcl.info/2021/08/10/motion-voice-to-key/)

💡 Tips:

Superwhisperには15分の無料期間がありますが、それを使い切ると25%オフのクーポンが出てきます。