---
title: "体の動きや音声入力でアプリケーションをハンズフリー操作したりプログラミングしたり文章を書いたりしてみる"
author: azu
layout: post
date : 2021-08-10T23:31
category: 雑記
tags:
    - software

---

この記事は、体の動きとか音声入力でアプリケーションを操作したり、プログラミングをするにはどうすればいいかということをいろいろ実験してみた記事です。
この記事には、実用性があるものと現実的に使うにはトレーニングが必要なものが混在しています。そのため、そこまで期待してはいけません。

この記事は、[Talon](https://talonvoice.com/)と[macOSの音声入力](https://support.apple.com/ja-jp/guide/mac-help/mh40584/mac)で書いたものを手作業で修正しています。

## きっかけ

t_wadaさんが老眼について書いていたのが、この記事を書いたきっかけの一つです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">プログラマ35歳定年説はとっくに過去のもので、35歳を過ぎても能力も報酬も伸び続けるし、生涯現役プログラマのロールモデルとなる方も増えてきた。ただ諸先輩方から聞いた話をまとめると、ベテランプログラマの前に立ち塞がるのは「老眼」で、こればかりは本当に恐ろしい。何か対策はあるだろうか……</p>&mdash; Takuto Wada (@t_wada) <a href="https://twitter.com/t_wada/status/1217979511892934657?ref_src=twsrc%5Etfw">January 17, 2020</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

人間が長時間プログラミングしたりPCを触ったりするには単一障害点となる体の部位(頭、目、指、手首、肩、腰など)が結構多くて その単一障害点をどうやって乗り越えるかっていうのに昔から興味がありました。
この中で手を使わない方法でキーを入力する方法って何があるかなぁって思って、それを少し実装したり音声の場合は[Talon](https://talonvoice.com/)というソフトを使ってできるのかを調査したって感じの記事です。

また、[何を作るとより良くなるかなと考えていて](https://twitter.com/azu_re/status/1413798002708271104)、今[コントロールできてないものをコントロールできるようにする](https://twitter.com/azu_re/status/1413798739370672129)と何かしらの飛躍があるのかなと思いました。
今、主に手でコードを書いたりしていますが、音声入力とか体の動きを入力できたらできることが増えないかなと考えたのもきっかけの一つです。

## 体の動き to キー入力

以前Googleストリートビューを体のモーションで動かすって言うアプリを書いていたので、これを応用してどのアプリケーションでも同じように体の動きに対してキー入力ができるアプリを書いてみることしました。

- [Googleマップ ストリートビューでランニングできるウェブアプリを作った | Web Scratch](https://efcl.info/2020/05/09/running-on-streetview/)

### [motion-key](https://github.com/azu/motion-key)

[motion-key](https://github.com/azu/motion-key)は、ウェブカメラで撮影した映像に対応したキー入力を定義できるElectronアプリケーションです。

- [azu/motion-key: A keyboard config app for your motion.](https://github.com/azu/motion-key)

キー入力部分がmacOS([JXA](https://github.com/JXA-userland/JXA))に依存してるので、macOSでしか動かないですが、キー入力のイベントを飛ばすところがどうにかできれば他のOSでも動きそうな気がします。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">カメラで検出した動きをキー入力に変換するアプリを書いた。<br><br>カメラの前で動いたりすれば、マウスとか使わないでページをめくったりキー入力できる。<br>👍でKindleのページをめくったりとかアプリごとに設定をかける。<br><br>azu/motion-key: A key config app for your motion.<a href="https://t.co/HTkoGZbUin">https://t.co/HTkoGZbUin</a> <a href="https://t.co/yvvGittyA5">pic.twitter.com/yvvGittyA5</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1414160104367165443?ref_src=twsrc%5Etfw">July 11, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

技術的にはウェブカメラの映像を[MediaDevices.getUserMedia()](https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/getUserMedia)で取得して、動画のピクセルの差分を見てしきい値を超えたらキーをフォーカスしてるアプリに送信します。

設定ファイルをJavaScriptでかけるようにしていて、どのぐらいのpixelの変化で反応するかやどのキーを送るかなどを設定できます。

ちゃんとした設定方法はREADMEを読んでください。

```js
module.exports = ({ type, activeWindow, payload }) => {
    if (type === "PixelChangeAction") {
        // ignore diffs less than 5% of capture
        if (payload.diffPercent < 5) {
            return;
        }
        return {
            key: "ArrowDown"
        };
    } else if (type === "GestureAction") {
        return {
            key: "ArrowUp"
        };
    }
}
```

また、フォーカスしているアプリケーションの情報も[active-win](https://github.com/sindresorhus/active-win)を使って取得してるので、
アプリケーションごとにどのキーを送るかも設定できます。
動きの変化だけではなく、tensorflow.js使ってカメラの前で👍や✌️のポーズを取ると、それに対するキーも設定できます。

例えば、次の設定はKindle向けの設定で、大きく動いたら(画面の10%が変化したら)、`Space`キーを送ってページめくりをするという感じの設定になっています。
✌️のポーズをとると`Shift + Space`をおして、前のページにもどるという感じなっています。

```js
const kindle = ({ type, payload }) => {
    if (type === "PixelChangeAction") {
        // large motion to next page
        if (payload.diffPercent < 10) {
            return;
        }
        return {
            key: "Space"
        }
    } else if (type === "GestureAction") {
        // 👍 next page
        if (payload.type === "👍") {
            return { key: "Space" }
        }
        // ✌️ prev page
        if (payload.type === "✌️") {
            return { key: "Space", modifier: { "shift": true } }
        }
    }
};

module.exports = ({ type, activeWindow, payload }) => {
    const bundleId = activeWindow?.owner?.bundleId;
    if (bundleId === "com.amazon.Kindle") {
        return kindle({ type, payload })
    }
}
```

この仕組みは、ずっとキー入力をし続けるような操作に対しても結構有効に動いて、間違ったときにジェスチャーでバックしたりみたいな感じの使い方ができます。
具体的にはこのアプリ使って筋トレしつつ本を読んだりみたいな使い方は一応できるかなという感じでした。

体動かしててずっと同じ風景だと飽きるという人は、動きに反応して画面が動くものを用意すれば、それだけで意外と脳が騙されて楽しい感じになります。
これは以前[running-on-streetview](https://github.com/azu/running-on-streetview)書いた理由でもあります。

- [azu/motion-key: A keyboard config app for your motion.](https://github.com/azu/motion-key)

使ってみるとわかりますが、体は細かい制御が難しいので、細かい操作が必要なアプリケーションの操作には向いていないと思います.

📝 作っていてKinnectでこういうのやってた人とかいそうだなーとか思った。もっと軽量化するならOSのカメラデバイスとして動くようなものにしたほうが負荷は低そうです。
tensorflow.jsのジェスチャー認識は[andypotato/fingerpose](https://github.com/andypotato/fingerpose)をベースにしています。
ジェスチャーとかは320x240とか結構小さい解像度でも十分認識するので、この辺はちゃんとやれば低負荷なアプリケーションとか作れそうな気がしました。

## 音声 to キー入力

音声入力をしたらキー入力をするというのも同じように作ろうと思いましたが、音声認識系はアクセシビリティの文脈ですでにありそうな気がしたので、すでにあるものを調べました。

Stack OverflowのDeveloper Surveyでも毎年大体1~2%ぐらいの人が視聴覚に何かしら違いを持っていると答えています。

- [Stack Overflow Developer Survey 2021](https://insights.stackoverflow.com/survey/2021#section-demographics-disability-status)

スクリーンリーダに関しては、プログラミングでも[JAWS](https://www.freedomscientific.com/products/software/jaws/)や[NVDA](https://www.nvaccess.org/download/)を使っている人が多そうな感じでした。

逆に、音声入力でプログラミングをするアプリケーションを調べてみると、次の2つが最近は見つかりました。

- [Talon](https://talonvoice.com/)
    - Pythonで音声認識に対して処理をかける
    - 独自の音声認識エンジン、Noiseをコマンドとして利用できる
    - [Dragon Professional](https://www.nuance.com/dragon.html)もサポートしてる
- [Serenade | Code with voice](https://serenade.ai/)
    - エディタに組み込む形になっていて、構文を認識したりプログラミングに特化してる

両方触ってみて[Talon](https://talonvoice.com/)がかなりよくできていたので簡単に紹介します。

## [Talon](https://talonvoice.com/)

[Talon](https://talonvoice.com/)は、クロスプラットフォームで動くアプリケーションです。
作者のPatreonになるとearly accessや新しい音声認識モデルのテストもできるそうですが、無料でも利用できます。

- [lunixbochsはsoftwareのクリエイター | Patreon](https://www.patreon.com/lunixbochs)

Talonはサイトの説明にあるように、ハンズフリーで殆どのことができるようなアプリケーションになっています。

> - Voice Control
> talk to your computer
> - Noise Control
> click with a back-beat
> - Eye Tracking
> mouse where you look
> - Python Scripts
> customize everything

Voice Controlは、そのまま音声をコマンドとして扱ったり(コマンドはPythonで実装できる)、認識した音声をそのままテキストにするDictationなどのことです。

Noise Controlは、ｼｭとかﾊﾟｯみたいなノイズ的な音をコマンドとして扱えます。具体的にはノイズでクリックしたり、Eye Trackingと組み合わせて見てる場所を拡大したりできます。
音声認識自体は現在英語とノイズ音だけですが、意外とアルファベット読みの日本語でも反応したりします。


Eye Trackingは、[Tobii Eye Tracker](https://gaming.tobii.com/product/eye-tracker-5/)というハードが必要ですが、見ている箇所をトラッキングして見てる場所をクリックしたりとか拡大できます。

Python Scriptsが一番特徴的なもので、Talonは認識したVoiceやNoiseに対して、何をするかを`.talon`というファイルとPythonを使って処理できます。
そのため、認識した音声に対する処理は、Pythonで頑張れば何でもできる感じです。

## Talonの使い方

[Talon](https://talonvoice.com/)の基本的な使い方の紹介です。
まだベータ感はあるので、詳細は次のドキュメントを参照してください。

- [Talon 0.1.0.0 documentation](https://talonvoice.com/docs/)
- [Unofficial Talon Docs | Talon Wiki](https://talon.wiki/unofficial_talon_docs/)

現在は音声認識モデルが同梱されていないので、Talonをインストールしてから[wav2letter](https://talonvoice.com/docs/#wav2letter-setup)という音声認識モデルをインストールする必要があります。

1. [Talon](https://talonvoice.com/)からTalonをダウンロード
2. <https://talonvoice.com/dl/talon-w2l-small3-dslm-en_US.zip>から[wav2letter](https://talonvoice.com/docs/#wav2letter-setup)をダウンロード
3. Talonを起動して、`Scripting -> Open ~/.talon`を開く
4. ダウンロードした[wav2letter](https://talonvoice.com/docs/#wav2letter-setup)の中身を次のような配置になるようにコピーする

```
~/.talon/w2l/en_US/*
~/.talon/user/engines.py
```

設定するとSpeech Recognitionにwav2letterが音声認識モデルの設定が完了です。

![talon audio](https://efcl.info/wp-content/uploads/2021/08/11-1628691473.png)

これで、音声認識はできるようになりましたが、対応する処理がデフォルトでは何もありません。
対応するコマンドや処理を[.talon](https://talonvoice.com/docs/#talon-files)ファイルを使って定義していきます。

## Talonの設定

[.talon](https://talonvoice.com/docs/#talon-files)ファイルはシンプルで、認識したい音声に対してコマンドを書いていくだけです。

```
認識する音声: コマンド
```

コマンドには、キー入力をする`key(キー名)`、文字列を入力する`insert(文字列)`などが用意されています。
次の設定なら`go to google`と入れば、Ctrl+tを押して、`google.com`と入力して`enter`を押すという形になります。

```
go to google:
    key(ctrl-t) # note: use cmd-t on Mac
    insert("google.com")
    key(enter)
```

talonファイルにはContext的な、どの状態のときに認識するかの設定もできます。
これを使うと、アプリケーションごとの設定を分けたり、なにもしたくないときは何も認識しないという状態にできます。

たとえば、次の設定は自分のKindle向けの設定ですが、`next`といえば、次のページをめくり、`back`で前のページ戻ります。
`close windo`や`close book`いえば本を閉じて、`capture`は[mumemo](https://efcl.info/2021/05/06/mumemo/)と連携して自動でスクショを撮ってメモ書きを保存します。(mumemoで[No-UI notes](https://github.com/azu/mumemo#no-ui-notes)をすれば、撮影して自動で保存できる)

```
app.name: /Kindle/
-
next: key(enter)
back: key(shift-enter)
escape: key(escape)
close window|book: key(cmd-w)
capture: key(cmd-alt-shift-m)
```

`.talon`ファイルはPythonで実装したAPIを叩くだけの定義ファイルなので、実際に細かいことをやりたい場合はPythonで実装したスクリプトの方が重要です。

自分で全部書くのは大変なので、[knausj85/knausj_talon](https://github.com/knausj85/knausj_talon)というユーザーのtalonの設定が実質半分公式です。
参考になる設定や基本的なモードやWakeupキーワードなどの実装が入っています。

- [knausj85/knausj_talon: Config for talon for Mac, Windows and Linux. Very much in progress.](https://github.com/knausj85/knausj_talon)

次のように`~/.talon/user`以下にTalonファイルやPythonファイルを置くと自動的にTalonがScriptとしてロードしてくれます。
まず、このリポジトリをcloneして、いらないものを削っていくのが良いと思います。

```
cd ~/.talon/user
git clone https://github.com/knausj85/knausj_talon knausj_talon
```

このリポジトリには`help active`とかのヘルプ音声コマンドも入っているます
そのためTalonのSpeech RecognitionがEnableなのを確認して`help active`っていればなにかヘルプを出してくれます。
ヘルプを閉じるには`help close`といえば閉じてくれます。

このリポジトリで特に参考になるはmodesというディレクトリにあるモードの実装です。

- [knausj_talon/modes at master · knausj85/knausj_talon](https://github.com/knausj85/knausj_talon/tree/master/modes)

このmodeには音声コマンドをする`command mode`と発音した内容をそのままテキストにする`dictation mode`が実装されています。
Vimなどのようにモード切り替えするイメージで、ショートカットのようなコマンドと入力モードを切り替えできます。

### Talonで日本語入力

dictation modeはネイティブな英語が必要で、自分にはちょっと難しかったので、[macOSの音声入力](https://support.apple.com/ja-jp/guide/mac-help/mh40584/mac)を使う`input mode`というのを実装しています。

実装といってもとてもシンプルで、[`Module`](https://talonvoice.com/docs/#talon.Module)が一種のKVS的な状態を保持するAPIとなっています。
`input mode`と発音したら、`input`という状態のフラグを立てて、そのフラグが立っているときのみ反応する`.talon`ファイルを用意しているだけです。

`input_mode.py`: (inputの状態とinput mode時はﾊﾟｯというnoiseでEnterを押す処理)

```python
from talon import Context, Module, app, actions, speech_system, noise, settings

mod = Module()
mod.mode("input", "input mode")
mod.setting(
    "input", type=int, default=0, desc="Enable input mode to noise events"
)
def on_pop(active: bool):
  if settings.get("user.input"):
    actions.key("enter")

def on_hiss(active: bool):
  if settings.get("user.input"):
    print("hiss")

noise.register("hiss", on_hiss)
noise.register("pop", on_pop)
```

`modes.talon` (knausj_talonベースに`input mode`の認識を追加)

```
not mode: sleep
-
# ^dictation mode$:
#     mode.disable("sleep")
#     mode.disable("command")
#     mode.enable("dictation")
#     user.code_clear_language_mode()
#     mode.disable("user.gdb")
#     mode.disable("user.input")
^command mode$:
    mode.disable("sleep")
    mode.disable("dictation")
    mode.enable("command")
    mode.disable("user.input")
^input mode$:
    mode.disable("sleep")
    mode.disable("dictation")
    mode.enable("command") # input modeでもcommand modeは併用してる
    mode.enable("user.input") # ここでinput modeのフラグを立てている
```

最後に`input mode`といってinputフラグが立っているときのみ処理されるtalonファイルを用意して、
そこにコマンドを定義しています。

`input-mode.talon`:

```
# input mode
mode: user.input # inputフラグが有効のときだけ動くという意味
-
settings():
    user.input = 1 # settings.get("user.input")に対応するところだけもっと良い書き方ありそう
^input$:
    key(cmd-alt-shift-v) # "input" というとmacの音声入力のショートカットキーを押す(ショートカットはmacのサービスで変更できる)
^maru$:
    key(enter) # まる っていうと 。 が入って確定する
^tsugi no gyo$:
    key(enter) # 次の行っていうと改行する
```

この設定で、`input mode` → `input` → `入力したい内容~~` → `まる` or `次の行` という感じでこの記事のベースは書いています。
(もちろん手で直してる部分もあるけど、喋ってる内容自体の認識精度はだいぶ良いです)

📝 TalonのデバッグはScriptingのView Logを見る感じ。ファイルを変更すると自動でリロードされるので、変更→音声テストを繰り返すとデバッグできる。

## Talonの感想

実際にTalonを使ってKindleで本を読むみたいなことをやっていて、これは普通に使いやすいです。
音声コマンドで`Next`って言うと次のページに行って、バックって言うと前のページに行ったりすることができてて、
Talonの場合は音声コマンドがスタックできるので`NextNextNext`って言えばでは3回Nextのキー押せるみたいなことができるので手でめくるのあんまり変わらない感じがします。

音声入力なんで普通に体動かしながらページめくったりできて、手を使わなくても音声でページがめくれるっていうのは結構快適な気がしました。
自分の場合は[シェイプエイト](https://www.gymterior.jp/shape-eight.html)というトランポリンみたいなクッションを最近買ったのでこれで跳ねながらTalonでKindleをよんでいることが増えてます。

イマイチなところはWake Upキーワードとして`Talon Wake`とか`Talon Sleep`を使ったり、`input mode`とかでモード切り替えしたりしているのですが、結構雑音でこれが反応してしまうことあります。
使ってないときはTalonをオフにしたり、[Mutify for Mac](https://mutify.app/)で音声入力自体をOFFにしてしのいでいます。
(SleepからもWakeupキーワードで起動はできたりもしますが、雑音がWakeupキーワードになったりすることがあるので工夫が必要なきがする)

音声コマンドとしてｼｭとかﾊﾟｯとかのNoiseが使えるのは結構将来性を感じました。
現在、このNoiseは2種類しかないですが、今音声認識の学習モデルを作っているみたいで、そのデータを送れるページもあります。

- [Talon Noise Collection](https://noise.talonvoice.com/)

プログラミング(キーボード)でも[記号が足りなくなる問題](https://docs.google.com/presentation/d/179v41LMaEXDxaD-piSgYVi6btFJoNoeYVncXe0172GM/edit#slide=id.g3e4f3b9278_9_16)はありますが、Noiseは結構種類が多いのでトレーニングするとショートカットが色々増やせるようになるんじゃないかなって思いました。
あと、音声コマンドはショートカットと違ってキーの組み合わせを覚えなくてもいいので、記憶しやすいという特徴もあります。

また、Talonはローカルで音声認識をしているため、反応が数百msぐらいで反応が返ってくる事が多いのでレスポンスが良いです。
Hey SiriとかOK Googleみたいなのは、反応が返ってくるまで数秒とかかかっていて、そこがストレスになる気がしています。

イメージ的には、TalonはUDPみたいな感じで、一方通行で音声を入れていくとそれをそのままコマンドにするって感じです。
スマートスピーカーとかは、TCPみたいな感じで、うまく聞き取れなかった場合は確認してから実行する感じがします。
Talonは、Wakeupキーワードなしで常時音声入力ができるので、誤検知がうまく減らせればかなり有用だなーって気がしました。

実際にTalonを使ってプログラミングをしてる人もいて、動画などを見てみると参考になります。

- [Coding with voice dictation using Talon Voice](https://www.joshwcomeau.com/blog/hands-free-coding/)
- [Talon voice programming: Realistic Voice Coding #1 - YouTube](https://www.youtube.com/watch?v=fBhBqlQj00Q)

実際にプログラミングまでやるには数ヶ月ぐらいのトレーニングが必要ですが、
音声コマンドを補助的に使うアプリケーションとして結構実用性を感じました。

こういった音声入力系のアプリケーションが充実していくと、そのようなアプリケーションがないと困る人以外にもそのアプリケーションのメリットを享受しやすくなっていると思います。
たとえば、今だとGoogle/Alexa/Siriなどの音声認識を使っている人はたくさんいるので、それを使える範囲がもっと広くなるイメージです。
この特定の問題に困っている人だけではなくより幅広い人への良い効果もたらす変化は、カーブカット効果と言われてるやつがかなり近いものだと思います。

- [社会の全員がラクになる―「カーブカット効果」のこと｜渡邉文隆 | ファンドレイザー｜note](https://note.com/fwatanabe/n/n1da8ab2849cd)

## まとめ

人がアプリケーションを操作したりプログラミングするには、目とか手などのいろんなパーツを動かすことが必要になります。
今は、いろんなアプリケーションで少し負担を減らせたり、代わりになるものが出てきている感じがしました。
実際に使いこなすにはある程度のトレーニングは必要ですが、逆にトレーニングすれば使えるレベルのものがで来ている感じです。
(音声認識モデル自体もトレーニングしたデータを使う)

Talonの設定をやっていくと、VimとかEmacsの設定などに近い感じの個人最適化の設定になっていく感じがします。
結構シンプルに音声コマンドを処理するエンジンとしてよくできているので、興味がある人は[Talon](https://talonvoice.com/)をいじってみると楽しいと思います。

今回は音でコードを見ることについてはあんまり調べられていませんが、音で文章をデバッグするのは結構実用的だったので、
この辺に詳しい人が記事を書いてくれることを期待しています。

- [VSCodeで音声読み上げでの文章デバッグする拡張 - vscode-read-aloud-text | Web Scratch](https://efcl.info/2019/01/05/vscode-read-aloud-text/)

参考

- [azu/motion-key: A keyboard config app for your motion.](https://github.com/azu/motion-key)
- [On Voice Coding | Hacker News](https://news.ycombinator.com/item?id=22404264)
- [Talon](https://talonvoice.com/)
