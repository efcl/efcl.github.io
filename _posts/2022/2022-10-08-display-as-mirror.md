---
title: "ディスプレイを鏡の代わりにして、鏡のスクショ画像をNotionに記録できるようにした"
author: azu
layout: post
date : 2022-10-08T22:25
category: 雑記
tags:
    - JavaScript
    - ディスプレイ

---

全身鏡が欲しいけど買うとデカくて捨てにくいので、使ってないディスプレイを縦置きにすれば全身鏡の代わりになるんじゃないかと思いました。
試しに23インチぐらいのディスプレイとiPadを繋いでフロントカメラで撮影した状態で、1.5m~2.0mぐらい離れれば全身が十分見える感じでした。

ディスプレイを鏡とする場合にスイッチを入れるのはリモートでやりたいので、iPadではリモートから起動が難しくて別のPCが必要でした。
ちょうど、普段あんまり使えてないmac miniがあったので、これをディスプレイと繋いで作ってみることにしました。

あと、せっかくディスプレイに表示するので、そのディスプレイ(鏡)に写した内容を半自動的に記録できるといいなと思いました。
こういうストック的なメモには[Notion](https://www.notion.so/ja-jp)に、撮影した画像を自動的にアップロードする仕組みも作りました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ボタン一つ押すだけで、ウェブカメラのキャプチャして、Notionに画像アップロードする仕組みできた。<br><br>ボタンはカメラについてたシャッター(Bluetooth)使ってるので、離れたところから起動、シャッター、スリープできる<br><br>mac mini+ウェブカメラ+リモコン+ディスプレイで、<br>鏡 兼 自動記録できる仕組み</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1578598818450264064?ref_src=twsrc%5Etfw">October 8, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## 必要なもの

- ウェブカメラ
  - [ロジクールStreamCam](https://www.logicool.co.jp/ja-jp/products/webcams/streamcam.960-001301.html): 無難
    - M1 Macにちゃんとアプリが対応してない(そこまでは困らないけど)
  - [Insta360 Link](https://www.insta360.com/jp/product/insta360-link): 全身モードがある
  - [OBSBOT Tiny 4K](https://www.obsbot.com/jp/obsbot-tiny-4k-webcam)： 全身モードがある
- PC
  - 今回はmac mini
  - ウェブカメラと繋げられるもの。カメラ内蔵ならそっちもいいけど、PCのカメラは遠距離苦手が多い
- Bluetoothキーボードとなるシャッターリモコン
  - スマホ用シャッターリモコンでググると出てくる
  - ON/OFF/シャッターボタンの3つぐらいボタンがあると嬉しい

## 仕組み

### ディスプレイを全身鏡にする仕組み

ディスプレイを鏡にする仕組みは結構単純です。
ウェブカメラで撮影している映像を、ディスプレイに表示するだけです。

縦置きのディスプレイに表示するので、カメラの向きとかも縦長になるように撮影する必要があります。
自分の場合は、[ロジクールStreamCam](https://www.logicool.co.jp/ja-jp/products/webcams/streamcam.960-001301.html)で縦長に撮影して[Quick Camera](https://github.com/simonguest/quick-camera)で映像を横に回転してディスプレイに表示しています。(本当はカメラ自体が縦に対応しているらしいけど…)

イメージとしては次のような感じです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Stable Diffusionで雑コラ作れた。<br>こんな感じの構成ではある。 <a href="https://t.co/Y3qCtoVIHW">pic.twitter.com/Y3qCtoVIHW</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1578735807505932288?ref_src=twsrc%5Etfw">October 8, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

ロジクールStreamCamは、ちゃんと2mぐらいの距離とかもフォーカス合わせてくれるので全身をみるにも十分でした。
ただ、明るさの変更とかでちょっと自動で調整が入るのですが、1秒ぐらいかかることがあるので実際の鏡よりは遅いです。

### ディスプレイ(鏡)に移った映像をNotionに記録する仕組み

こっちがディスプレイを鏡として使うメリットです。
[Quick Camera](https://github.com/simonguest/quick-camera)にはウェブカメラの映像が写っているので、これをスクショして記録できれば、鏡の内容をそのまま記録できます。その時の服装とか部屋の様子だったりとかポチッと記録できるので便利です。

これは、[Quick Camera](https://github.com/simonguest/quick-camera)のスクショを撮って、Notionにアップロードするスクリプトを書いて対応しています。

サンプルは次のリポジトリに置いてあります。

- [azu/quickcamera-to-notion-example: Upload webcamera image to Notion.](https://github.com/azu/quickcamera-to-notion-example)

このスクリプトは、Notionの特定のデータベースに `YYYY/MM/DD` のタイトルのページにQuick Cameraで映してる映像のスクショをアップロードします。
`YYYY/MM/DD`というタイトルのページは事前に作っておく前提となっています。(やろうと思えば、該当ページがないなら作るのもNotion APIでできると思います。)

一方でNotionのAPIには画像をアップロードするAPIは公開されていません。
そのため、次のような手法で画像をアップロードしています。

1. スクリーンショットを撮影し、クリップボードにコピーする
  - `screencapture -c` で撮影してる
2. 指定したページをNotion.appで開く
  - `open notion://<user>/<page>`
3. ページを開いたらクリップボードをペーストしてアップロードする
  - キー入力のエミュレートには[RobotJS](https://github.com/octalmage/robotjs)を利用

クリップボードを使うことで、APIを使わずにアプリ経由でアップロードできます。
Notionのアプリは `notion://<userid>/<pageid>` で特定のページを開けます。

あとは、このスクリプトを実行するたびに、Quick Cameraの映像を `2022/10/08` のようなページにアップロードできます。

📝 仕組み的に実行するたびにNotionにフォーカスが移動してしまうので、[Quick Camera](https://github.com/simonguest/quick-camera)のスクショを撮って、Notionにアップロードするスクリプトに常に最前面で表示するオプションを実装しています。

- [feat: add alwaysOnTop menu by azu · Pull Request #40 · simonguest/quick-camera](https://github.com/simonguest/quick-camera/pull/40)

### リモコンを使ってシャッターを切る

鏡なのでPCを起動しないと見れないのは不便です。
macはキー入力があればスリープから復帰できる(ただしパスワード入力をスキップする設定にする必要はあるけど、家専用なので)ので、Bluetoothのキーボードがあれば、リモートから起動できて便利です。

スマホ用シャッターリモコンはBluetoothで繋ぐものがあって、これのシャッターリモコンとmac miniをBluetoothで繋いでいます。
また、ボタンがいくつかあるので、シャッターを切るボタン(先程のスクリプトを実行するボタン)とPCをスリープするボタンなどの設定を[Karabiner-Elements](https://karabiner-elements.pqrs.org/)でしています。

[Karabiner-Elements](https://karabiner-elements.pqrs.org/)はデバイスごとのキー設定ができ、またキーに対してShell Scriptを設定できます。

たとえば、自分が持ってるスマホシャッターは3つボタンがあって、調べるとvolume down/upとenterキーになっていたので、それぞれに対応する処理を割り当てています。

```json
    "profiles": [
        {
            "complex_modifications": {
                "rules": [
                    {
                        "description": "[Shutter] Focus QuickCamera −",
                        "conditions": [
                            {
                                "type": "device_if",
                                "identifiers": [
                                    {
                                        "product_id": xx,
                                        "vendor_id": xxxx
                                    }
                                ]
                            }
                        ],
                        "manipulators": [
                            {
                                "from": {
                                    "consumer_key_code": "volume_decrement"
                                },
                                "to": [
                                    {
                                        "lazy": true,
                                        "repeat": true,
                                        "shell_command": "pmset sleepnow"
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                        "description": "[Shutter] Focus QuickCamera ＋",
                        "conditions": [
                            {
                                "type": "device_if",
                                "identifiers": [
                                    {
                                        "product_id": xxx,
                                        "vendor_id": xxxx
                                    }
                                ]
                            }
                        ],
                        "manipulators": [
                            {
                                "from": {
                                    "consumer_key_code": "volume_decrement"
                                },
                                "to": [
                                    {
                                        "lazy": true,
                                        "repeat": true,
                                        "shell_command": "open -a 'Quick Camera'"
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                        "description": "[Shutter] Screenshot to Notion X",
                        "conditions": [
                            {
                                "type": "device_if",
                                "identifiers": [
                                    {
                                        "product_id": xxx,
                                        "vendor_id": xxxx
                                    }
                                ]
                            }
                        ],
                        "manipulators": [
                            {
                                "from": {
                                    "key_code": "return_or_enter"
                                },
                                "to": [
                                    {
                                        "lazy": true,
                                        "repeat": true,
                                        "shell_command": "/path/to/notion-upload-image/run.sh"
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    }
            }
        }
    ]
    
```

これをすることで、スマホシャッターでPCを起動(何かのボタンを押す)、シャッターボタンでスクショをNotionにアップロードするスクリプトを実行、余ったボタンでPCをスリープできています。

## おわりに

結構適当に組み合わせて作りましたが、シャッターボタンを押すと`screencapture`は実行するとシャッター音のSEを出してくれるので、結構シャッター切ってる感があって面白いです。
わざわざ新しくディスプレイとPCを用意するほどのものではないですが、鏡に機能性を追加すると意外と面白いのかなーと思いました。

"鏡 ディスプレイ"で調べてみると、鏡にディスプレイを乗せたものはありました。

- [Mirroria®／ミラリア® ｜ 製品情報 ｜ AGC](https://www.agc.com/products/new_markets/detail/mirroria.html)
- [Fitness Mirror (フィットネスミラー) | ホームジム 自宅トレーニング](https://www.fitness-mirror.com/)
