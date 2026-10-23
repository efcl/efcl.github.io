---
title: "Quick Input Translator: 入力欄で書いた文章をインライン翻訳するmacOSアプリ"
author: azu
layout: post
date: 2026-10-23T10:00+09:00
category: macOS
tags:
    - macOS
    - Swift
    - translation

---

入力欄に日本語で文章を書いてから、末尾に`...`を入力すると、その場で英語に翻訳して置き換えるmacOSアプリ [Quick Input Translator](https://github.com/azu/quick-input-translator) を作りました。

- GitHub: [azu/quick-input-translator](https://github.com/azu/quick-input-translator)

<video src="/wp-content/uploads/2026/10/quick-input-translator.mp4" controls muted loop playsinline width="100%"></video>

翻訳にはmacOSの[Translation framework](https://developer.apple.com/documentation/translation)を使っていて、翻訳はMac上（オンデバイス）で行われます。
外部の翻訳APIを呼び出さないので、APIキーは不要で、言語モデルを一度ダウンロードしておけばオフラインでも素早く翻訳できます。

## インストール

動作環境

- Apple SiliconのMac + macOS 26以降

次のコマンドでインストールできます。notarizationはしてないので自己判断でお願いします。

```sh
curl -fL https://github.com/azu/quick-input-translator/releases/latest/download/quick-input-translator-macos-arm64.zip -o "$TMPDIR/quick-input-translator.zip" &&
ditto -x -k "$TMPDIR/quick-input-translator.zip" /Applications &&
xattr -dr com.apple.quarantine "/Applications/Quick Input Translator.app" &&
open "/Applications/Quick Input Translator.app"
```

アプリは自己署名で、Appleの公証（notarization）はしていないため、`xattr`でquarantine属性を解除してから起動しています。
v1.1.1以降は[Sparkle](https://sparkle-project.org/)による自動アップデートに対応しているので、2回目以降はアプリ内で更新できます。

### 初回の設定と言語モデルのダウンロード

アプリを起動すると設定画面が開きます。
翻訳には言語モデルが必要なので、最初に設定画面からダウンロードしておきます。

1. **From**と**To**に翻訳元と翻訳先の言語を設定する（たとえば Japanese → English）
2. **Prepare Languages**ボタンを押す
3. macOSの言語モデルのダウンロードダイアログが表示されるので、ダウンロードを完了させる
4. 設定画面に"Ready for translation"と表示されれば準備完了
5. 設定画面の**Try it**欄で翻訳を試す（この欄はアクセシビリティの許可がなくても動作する）
6. 他のアプリで使うために、**Allow Access**ボタンを押して、システム設定 → プライバシーとセキュリティ → アクセシビリティでQuick Input Translatorを許可する

冒頭の動画は、この**Try it**欄で行翻訳と全翻訳を試しているものです。

## なぜ作ったか

英語で文章を書くときは、日本語で書いてから翻訳ツールに貼り付けて、訳文をコピーして入力欄に戻す、という操作をよくやっていました。
この方法だと、翻訳のたびにアプリを行き来するので、書いている流れが途切れてしまいます。

Quick Input Translatorでは、文章を書いている入力欄から離れずに翻訳できます。
テキストを選択したり、翻訳用のショートカットキーを押したりする必要もなく、文章の末尾にトリガーとなる文字を打つだけで翻訳されます。

## 行翻訳と全翻訳

Quick Input Translatorには、現在の行だけを翻訳する「行翻訳」と、入力欄全体を翻訳する「全翻訳」の2種類があります。

| 翻訳する範囲 | デフォルトのトリガー | 入力する場所 | 置き換わる範囲 |
| --- | --- | --- | --- |
| 現在の行 | `...` | その行の末尾 | その行だけ（前後の行は変わらない） |
| 入力欄全体 | `:::` | 入力欄の一番最後 | 複数行を含む下書き全体 |

### 行翻訳

行翻訳は、行の末尾に`...`を入力すると、その行だけを翻訳して置き換えます。

```text
こんにちは。今日は良い天気です。...
```

最後の`.`を入力した時点で翻訳が始まり、その行が英語に置き換わってトリガーの`...`は取り除かれます。
前後の行はそのまま残るので、1行ずつ書いては翻訳する、という使い方ができます。
なお、見た目上折り返されている行でも、改行を入れるまでは1行として扱われます。

### 全翻訳

全翻訳は、複数行の下書きを書いてから、入力欄の一番最後に`:::`を入力すると、入力欄全体をまとめて翻訳して置き換えます。

```text
こんにちは。
明日の打ち合わせは10時からです。:::
```

途中の行に`:::`を書いても全翻訳は始まらず、入力欄の末尾で入力したときだけ動作します。
元の改行や空行は保たれます。
ただし、翻訳は行ごとに行われるため、改行をまたいだ文脈は訳文に反映されにくくなります。

### 日本語入力のままでもトリガーできる

トリガーは設定画面で`...`、`;;;`、`:::`、`@@@`から選べて、行翻訳と全翻訳にそれぞれ別のものを割り当てられます。

日本語入力中でも、対応する全角文字で同じようにトリガーできます。
たとえば`...`は`。。。`、`:::`は`：：：`でも動作するので、日本語入力をオフに切り替えなくても翻訳できます。
同じ文字が3つ連続したときだけ翻訳が始まり、4つ以上の場合や、トリガーを貼り付けた場合、行の途中で入力した場合は翻訳されません。

翻訳中はトリガーの近くにスピナーが表示され、置き換えが成功するとチェックマークが表示されます。
置き換え直後であれば、入力先アプリの⌘+Zで元に戻せます（Undoの挙動は入力先アプリのエディタに依存します）。

訳文は下書きとして扱われ、Quick Input Translatorが送信や投稿をすることはありません。
翻訳結果を確認してから、自分で送信や保存をする想定です。

## Translation frameworkでローカル翻訳

Quick Input Translatorは翻訳エンジンとして、Appleの[Translation framework](https://developer.apple.com/documentation/translation)を使っています。
Translation frameworkは、Macにダウンロードした言語モデルを使って翻訳するため、次のような利点があります。

- 翻訳APIのキーや外部サービスの契約が不要
- 入力中の文章を外部の翻訳サービスへ送らずに翻訳できる
- 言語モデルを準備しておけば、ネットワークがなくても翻訳できる
- ネットワーク越しのリクエストを待たないので、素早く翻訳できる

言語モデルは、インストール時に設定画面の**Prepare Languages**からダウンロードしておきます。
他のアプリで文章を入力している最中に、モデルのダウンロードが始まることはありません。

## どこの入力欄で使えるか

Quick Input Translatorは、入力欄に`...`などのトリガーが入力されたことを検知して翻訳します。
そのため、ブラウザの入力欄やMacアプリの入力欄など、普段文章を書いている入力欄でそのまま使えます。
ただし、パスワード欄や読み取り専用の領域では動作しません。

なお、他のアプリで置き換えるときは、訳文を一時的にクリップボードに入れてペーストしています。
ペーストを確認できたら、元のクリップボードの内容に戻します。

## まとめ

Quick Input Translatorは、入力欄で書いた文章の末尾に`...`や`:::`を打つだけで、その場で翻訳して置き換えるmacOSアプリです。
現在の行だけを翻訳する行翻訳と、入力欄全体を翻訳する全翻訳を使い分けられます。

翻訳にはmacOSのTranslation frameworkを使っているので、APIキーなしでローカルで素早く翻訳でき、オフラインでも動作します。
翻訳ツールと入力欄を行き来せずに済むので、日本語で考えながら英語の文章を書くときに便利です。

---

ソースコードはGitHubで公開しています。

- GitHub: [azu/quick-input-translator](https://github.com/azu/quick-input-translator)
