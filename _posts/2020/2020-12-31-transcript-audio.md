---
title: "ChromeのSpeechRecognitionで使って、音声ファイルの自動文字起こしをするアプリを書いた"
author: azu
layout: post
date : 2020-12-31T10:42
category: JavaScript
tags:
    - JavaScript

---

[SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) APIを使って、waveやmp3などの音声ファイルを再生しながら文字起こしを自動でするウェブアプリを書きました。音声ファイルをざっくりと文字に起こして、内容をざっくりと把握して聞きたい位置にジャンプする目的で作りました。

「Chromeの」としているのは、現時点(2020-12-31)では[SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)を実装しているのがChrome系のブラウザのみだからです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">SpeechRecognition APIを使って音声ファイルの文字起こしをするアプリを書いた。<a href="https://t.co/GSI1gOvLVE">https://t.co/GSI1gOvLVE</a><br><br>*Chrome + BlackHoleが必要<br><br>かなり無理矢理な方法でInputとOutputにBlackholeを設定して、loopbackした音声を認識させてる。 <a href="https://t.co/MnZswNQhdY">pic.twitter.com/MnZswNQhdY</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1340254432504627201?ref_src=twsrc%5Etfw">December 19, 2020</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## 必要なもの

- Chrome
    - MSEdgeなどChrome系のブラウザでも大丈夫です
- [BlackHole](https://github.com/ExistentialAudio/BlackHole) on macOS

自分はmacOSで確認しているので[BlackHole](https://github.com/ExistentialAudio/BlackHole)を使っています。
[BlackHole](https://github.com/ExistentialAudio/BlackHole)は音声ドライバで、InputとOutputをどちらも[BlackHole](https://github.com/ExistentialAudio/BlackHole)に設定することで、macOSから出力した音声をmacOSで入力した音声として扱えます。

## 使い方

1. まずは [BlackHole](https://github.com/ExistentialAudio/BlackHole) をインストールが必要です
2. <https://transcript-audio.netlify.app/> を開く
3. 最初にそのままプレイヤーの ▶ の再生ボタンを押すと、🎤マイクの許可ボタンがでるので許可します
    - [BlackHole](https://github.com/ExistentialAudio/BlackHole)を入力音声にするためにマイクを使います。
4. そして一度リロードします
    - ここは実装が適当なだけなので、改善できるかもしれない
5. リロード後は、文字起こししたい音声ファイルをD&Dしてください
6. あとは▶ の再生ボタンを押せば、再生しながら文字起こしした内容が表示されます。

文字起こしは、実際に再生した音声を[SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)で音声認識して文字に起こしています。
そのため、1時間の音声ファイルなら、すべて文字に起こすのに1時間かかります。

🔈 ボタンを押すと、その文字起こしをした再生位置に移動できます。

この辺の発言ってどの辺だったけというのをざっくりみて、🔈で移動して再生するみたいな用途に使えるかもしれません。

**注意**: 

- 文字起こしされない場合は、Input/Outputがどちらも[BlackHole](https://github.com/ExistentialAudio/BlackHole)となっているかをチェックしてください
- 音声が聞こえているなら、Outputが[BlackHole](https://github.com/ExistentialAudio/BlackHole)になていない
- また現在は[langを"ja"](https://github.com/azu/transcript-audio/blob/9ba1ec7a322b14cb39ecaccda901c26bd1d55e94/src/AudioPlayer/AudioPlayer.tsx#L229)に固定しているので、日本語以外が認識できてないと思います。PR待ってます

![img](https://efcl.info/wp-content/uploads/2020/12/31-1609379890.png)

## 仕組み

[SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) APIを触ったことがある人は、音声ファイルを認識させるという同じ発想を考えたことがあると思います。

ただし、[SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)にはinputを指定するAPIは用意されていません。
常に現在のマイクがInputとして固定されています。

一つのウェブページに複数のマイクは現実的にない気がしたので、`navigator.mediaDevices.getUserMedia`で特定のデバイスを音声の入力のデバイスに設定(ビデオ会議とかで音声デバイス切り替えするのはこのAPIを使う)してみたところ、[SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)の入力もこの指定したデバイスになりました。

```js
const setLoopbackAudioDevice = async (device: MediaDeviceInfo) => {
    const loopbackAudioDeviceId = device.deviceId;
    const constraints = {
        audio: {
            deviceId: loopbackAudioDeviceId
        }
    };
    await navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        console.log("Set Loopback Audio", stream);
    });
};
```

あとは音声を再生したAudio要素の出力先のデバイスは[HTMLMediaElement.setSinkId()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId)で指定すれば、入力と出力をどちらも[BlackHole](https://github.com/ExistentialAudio/BlackHole)などのループバックデバイスに固定できます。

この状態で音声を再生すれば、自分自身が再生した音声を自分自身で認識して文字起こしが可能になります。

この入力、出力デバイスはウェブページごとの設定であるため、他のタブやmacOS自体のデフォルトデバイスを設定しなくてよいというのがこのツールの主な機能です。

PuppeteerでもChromeを使えば[SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)は使えるので、同じような処理を書けばCLIとしてもできるのかもしれません。

- [azu/convert-audio-to-text: \[WIP\] Convert mp3 audio to text with Puppeteer/Chrome/SpeechRecognition.](https://github.com/azu/convert-audio-to-text)
    - 元々はこれで試していたもの
    - OSの音声デバイス変更しないといけないのどうやって回避するんだろと思って調べたら、[Transcript Audio](https://github.com/azu/transcript-audio)ができた

## おわりに

[SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)の仕組み的に、実際に再生している音声の文字起こしです。(文字起こしできるのは再生している部分だけなので、すべてをテキスト化する用途ではないです)
一括で大量の音声をテキスト化したい場合は、普通にサービスを使ったほうが良いです。
(どちらの場合もテキストを公開する場合は、元音声の持ち主の許可が必要なので注意)

- [Speech-to-Text: 自動音声認識  |  Google Cloud](https://cloud.google.com/speech-to-text)
- [Amazon Transcribe（音声をテキストに変換する機能を簡単に追加）| AWS](https://aws.amazon.com/jp/transcribe/)

(自分自身を含め)話している音声をスキップできない状態で聞くのは拘束的な感じがして苦手なので、
音声を再生しながらテキストにおこして、テキストを目で確認して🔈で実際に再生して音として確認したりそういう用途に使えるかもと思って作ってみました。(補助的な用途)

また、[SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)、[VoiceIn](https://chrome.google.com/webstore/detail/voice-in-voice-typing/pjnefijmagpdjfhhkpljicbbpicelgko?hl=ja)、[Speechnotes](https://speechnotes.co/)、iOSやmacOSなどの音声入力(認識)はベースとなる文章は生成できる程度にはちゃんと認識してくれます。(それ用のマイクとか喋り方などはあるだろうけど)

ただ、音声入力系は話しながら文字に起こされるため、文字起こしの細かい間違いが気になって喋りきることが大変な感じがしました。
一度しゃべりきった音声ファイルを再生しながら、文字起こししてしつつ修正していくのもよさそうなのかなと思いました。
この[SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)を使った音声ファイルの文字起こしは、そういった実験にも使えそうな気がします。

ソースコード:

- [azu/transcript-audio: Transcript your audio files like Podcast using SpeechRecognition and Virtual Audio Device.](https://github.com/azu/transcript-audio)
