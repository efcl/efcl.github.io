---
title: "PC/macOSのマイクがミュート状態か入力中かを表示するアプリを書いた"
author: azu
layout: post
date : 2021-11-28T11:31
category: software
tags:
    - software
    - electron
    - macOS

---

[mic-mutebar](https://github.com/azu/mic-mutebar)というPCのマイクがミュート状態か入力中(話している状態)かを表示するシンプルなアプリを書きました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">マイクの状態を表示するシンプルなアプリを書いた。<br>ミュートした状態で話してしまう問題を回避する目的<br>--<br><br>azu/mic-mutebar: mic mute status bar<a href="https://t.co/GiYHoccZEY">https://t.co/GiYHoccZEY</a> <a href="https://t.co/jM2auYWWfG">pic.twitter.com/jM2auYWWfG</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1464587466674171905?ref_src=twsrc%5Etfw">November 27, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

シンプルな棒状のアプリで、透明ウィンドウになっているので任意の位置に移動してマイクの状態を表示できます。

## 作った理由

前のMacbook ProではTouchbarがあったのですが、MacBook Pro (14", 2021)に変えたらTouchbarがありませんでした。

Touchbarは[Mutify for Mac](https://mutify.app/)を使って、マイクをON/OFF + マイクの状態を表示するために使っていました。
代わりとなるアプリが見つけられなかったので[mic-mutebar](https://github.com/azu/mic-mutebar)というアプリを書きました。

## インストール方法

1. [最新のバイナリ](https://github.com/azu/mic-mutebar/releases/latest)をダウンロード
2. アプリを開く
3. マイクの利用を許可する

🚧 アプリは署名してないので、そのまま開くと警告で出て使えないと思います。(各種署名を無料で自動的にやる方法ないのかな?)

macOSなら、右クリックの"開く"から開く必要があります。

1. Select `mic-mutebar.app`
2. Open context menu and Click "Open"

試してないですが、ElectronアプリなのでWindows/Linux/macOSで動くような気がします。

## 使い方

特に操作はありません。

マイクの音量が0の場合は次のような表示になります。

![](https://raw.githubusercontent.com/azu/mic-mutebar/main/docs/img/muted.png)

マイクが入力可能で、入力中のボリュームは次のような表示になります。

![](https://raw.githubusercontent.com/azu/mic-mutebar/main/docs/img/inputing.png)

## 実装

最初はSwiftを使って実装してました。

- https://github.com/azu/MuteBar_swift

マイクのボリュームとか入力中かは[Audio Toolbox](https://developer.apple.com/documentation/audiotoolbox)とか結構使うのが面倒臭いAPIが必要そうでした。

マイクのボリュームと入力中かどうかは[MediaDevices.getUserMedia()](https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/getUserMedia)で十分な気がしたので、Electronで実装し直しました。(最初はON/OFFだけを表示するつもりだったけど、入力中も簡単にとれたのでそうしました)

- [azu/mic-mutebar: Tiny GUI app that show microphone status](https://github.com/azu/mic-mutebar)

表示は色々試して次のような形にしました。

- ミュート中: 目立たないようにMacbook Proのノッチの下に赤線を表示
- 入力中: マイクの設定でよく見るような ■ ■ ■ □ □ □ みたいな表示

自分はミュート状態がデフォルトなので、ミュート中は目立たないようにして、喋ってる時はちゃんと音が入力できてるかを表示するイメージにしています。

Electronと言ってもほぼHTMLだけでできてるようなものなので、カスタマイズはしやすいと思います。
特にオプションはないですが、必要そうなオプションあったら次のIssueとかでコメントください。

- [Customize style by option · Issue #1 · azu/mic-mutebar](https://github.com/azu/mic-mutebar/issues/1)

このアプリ自体にはマイクのMuteのON/OFF機能はありません。

自分の場合は、[Karabiner-Elements](https://karabiner-elements.pqrs.org/)とか[Alfred](https://www.alfredapp.com/)で、特定のキー(F5)に次のAppleScriptを割り当ててワンタップでマイクをON/OFFできるようにしています。

```
set micVolume to toggleMic()
display notification micVolume with title "Mic"
return micVolume

on toggleMic()
	set inputVolume to input volume of (get volume settings)
	if inputVolume = 0 then
		set inputVolume to 100
		set micVal to "🔈"
	else
		set inputVolume to 0
		set micVal to "🔇"
	end if
	set volume input volume inputVolume
	return micVal
end toggleMic
```

## ソースコード

- [azu/mic-mutebar: Tiny bar app that show microphone status](https://github.com/azu/mic-mutebar)
