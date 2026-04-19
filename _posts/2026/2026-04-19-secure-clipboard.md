---
title: "SecureClipboard: クリップボードに入った機密情報を自動でマスクするmacOSアプリ"
author: azu
layout: post
date: 2026-04-19T11:00+09:00
category: macOS
tags:
    - macOS
    - Swift
    - secretlint
    - security
    - clipboard

---

クリップボードを監視して、機密情報やAPIトークンが入ったら自動的にマスクするmacOSアプリ [SecureClipboard](https://github.com/secretlint/secure-clipboard) を作りました。

- GitHub: [secretlint/secure-clipboard](https://github.com/secretlint/secure-clipboard)

![SecureClipboardのメニューバー](/wp-content/uploads/2026/20260419-110128.webp)

テキストだけでなく画像にも対応していて、スクリーンショットに写り込んだトークンなどもVision frameworkでOCRしてマスクします。
内部では[secretlint](https://github.com/secretlint/secretlint)を使って、AWS、GitHub、Slack、GCP、Azure、npm、Dockerなどのトークンを検出します。
スキャン処理はすべてローカルで完結するmacOSアプリケーションなので、クリップボードの内容が外部に送信されることはありません。

## なぜ作ったか

API Tokenをコピーして`.env`へ貼り付けたあと、そのトークンがクリップボード上に残り続けることがあります。
そのまま別のウィンドウで⌘+Vしてしまい、Slackのメッセージ欄やLinearのIssueタイトル、ブラウザの検索バーなどに意図せずペーストしてしまう事故が起きやすいです。
ペーストするまでクリップボードに何が入っているかは目に見えないので、気づきにくいというのも問題です。

SecureClipboardはコピーされた瞬間にマスクするため、誤ってペーストしても安全になります。
本物のトークンが必要なときはメニューから"Copy Original Text"を選ぶと取り出せますが、90秒後に自動でクリップボードから消えるようになっています。
これは[1Passwordのクリップボードクリア](https://support.1password.com/copy-passwords/)と同じ仕組みです。

画像の場合も同様で、スクリーンショットを撮ってどこかに貼り付けるときに、意図しない映り込みを自動で防止します。
たとえばClaude Codeのターミナル画面をスクリーンショットしたときに、たまたまコマンドの中にAPIキーが含まれていた、というケースを防げます。

## 主な機能

SecureClipboardの主な機能は次のとおりです。

- クリップボードを監視して、自動的にマスキング
- テキスト：[secretlint](https://github.com/secretlint/secretlint)でスキャンして、検出した機密情報を`***`に置換
- 画像：Vision frameworkでOCRして、検出した領域だけをcrystallize + blurでマスク
- 検出時はメニューバーアイコンが赤くなり、macOSの通知を表示
- "Copy Original Text"で生の値を取得（90秒後に自動消去）
- マスクしたクリップボードは[concealedとしてマーク](https://nspasteboard.org/)されるため、AlfredなどのクリップボードマネージャーやGrammarlyなどに記録されない
- `secure-pbpaste` / `secure-pbcopy` のCLIツール同梱
- secretlintのバイナリはGitHub Releasesから自動更新

## インストール

```bash
curl -fSL https://github.com/secretlint/secure-clipboard/releases/latest/download/SecureClipboard.app.zip -o /tmp/SecureClipboard.app.zip
unzip -o /tmp/SecureClipboard.app.zip -d /Applications
xattr -cr /Applications/SecureClipboard.app
open /Applications/SecureClipboard.app
```

コード署名はしていないので、`xattr -cr`でquarantine属性を解除してから起動します。

アンインストールは次のコマンドでできます。

```bash
rm -rf /Applications/SecureClipboard.app
rm -f /usr/local/bin/secure-pbpaste /usr/local/bin/secure-pbcopy
```

## テキストへのマスキング

クリップボード上のテキストにシークレットが含まれていれば、その部分を`***`で置き換えます。

たとえばSlackトークンを含む次のようなテキストをコピーすると、このようになります。

<!-- secretlint-disable -->
```
Slack Token is xoxb-1234567890123-1234567890123-AbCdEfGhIjKlMnOpQrStUvWx
```
<!-- secretlint-enable -->

実際にクリップボードに入るのは、トークン部分だけがマスクされた次のようなテキストになります。

```
Slack Token is *********************************************************
```

スクリーンショットの中にテキストとして含まれているシークレットも、Vision frameworkでOCRしてからスキャンするため、同じようにマスクされます。
たとえば下のスクリーンショットでは、cmuxの通知メニューに含まれていたユーザー情報がOCR経由で検出され、その矩形領域だけがblurされています。

![テキストマスクの例](/wp-content/uploads/2026/20260419-105552.webp)

## 画像へのマスキング

画像がクリップボードに入ると、Vision frameworkでOCRしてテキストを抽出し、検出されたシークレットの矩形領域だけにマスクをかけます。
スクリーンショットツールでクリップボードに保存するケースなどが主な対象です。

たとえば次のスクリーンショットには`xoxp-`から始まるSlackのUser Tokenが写り込んでいます。

![画像マスキング Before](/wp-content/uploads/2026/20260419-105159.webp)

スクリーンショットツールでこの画像をクリップボードに保存すると、トークンが写っていた矩形領域だけにcrystallize + blur効果が自動で適用されます。

![画像マスキング After](/wp-content/uploads/2026/20260419-105207.webp)

デフォルトでは、Vision frameworkで取得したテキストの矩形位置を使って、シークレットがあった部分だけをマスクするようになっています。
カスタムパターンで`"action": "discard"`を指定した場合は、画像全体を警告画像に置き換えるといった挙動も選べます。

## "Copy Original"とConcealedClipboard

マスクしたあとに本物の値が必要になることもあります。
そのときはメニューバーから"Copy Original Text"（画像なら"Copy Original Image"）を選ぶと、元の内容をクリップボードにコピーし直せます。

![SecureClipboardのメニュー](/wp-content/uploads/2026/20260419-110128.webp)

このとき、クリップボードには[`org.nspasteboard.ConcealedType`](https://nspasteboard.org/)というUTIが付与されます。
これはNSPasteboardの慣習で、「このクリップボードの内容は機密情報なので、履歴に残さないでほしい」という意思表示です。
[v1.4.0](https://github.com/secretlint/secure-clipboard/releases/tag/v1.4.0)からこのUTIに対応しており、AlfredやGrammarlyなどnspasteboard.orgの規約に従っているクリップボードマネージャーは、この値を履歴へ保存しないようになります。

さらに90秒後にクリップボードから自動で消えるため、生の値が手元に残り続けることもありません。

## CLIツール: secure-pbpaste / secure-pbcopy

[v1.2.1](https://github.com/secretlint/secure-clipboard/releases/tag/v1.2.1)から、macOS標準の`pbpaste`/`pbcopy`を置き換えるCLIツールが付属しています。

```bash
secure-pbpaste              # クリップボードのテキストをマスクして出力
echo "text" | secure-pbcopy # テキストをマスクしてからクリップボードにコピー
```

`secure-pbcopy`は、生のテキストを一度もクリップボードへ触れさせない設計になっています。
Unix Domain Socket経由で常駐アプリへテキストを送り、アプリ側でスキャン・マスクしてからクリップボードへ書き込みます。
通常の`pbcopy`だと、書き込んだ瞬間に他のクリップボードマネージャーが拾ってしまう可能性がありますが、`secure-pbcopy`ならその心配がありません。

メニューバーから"Install CLI Tools"を選ぶと、`/usr/local/bin/`にsymlinkが作成されます。

## 設定

設定ファイルは`~/.config/secure-clipboard/config.json`に置きます。
メニューから"Open config.json"でも開けます。

```json
{
    "rules": [
        { "id": "@secretlint/secretlint-rule-preset-recommend" }
    ],
    "patterns": [
        { "name": "mask-example", "pattern": "/INTERNAL_\\w+/i", "action": "mask" },
        { "name": "discard-example", "pattern": "/CONFIDENTIAL/i", "action": "discard" }
    ],
    "skipScanAppIdentifiers": ["com.1password.1password"]
}
```

### rules

secretlintのルールを指定します。
デフォルトの`@secretlint/secretlint-rule-preset-recommend`には、AWSやGitHub、Slack、GCPなどの[検出ルール](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-preset-recommend#rules)が含まれています。

preset内の一部のルールを無効化できますが、基本的にはデフォルトのままで問題ありません。
SecureClipboardはsecretlintをpre-buildされたバイナリとして同梱しているため、独自のルールを読み込ませるような仕組みは用意していません。

### patterns

カスタムの正規表現パターンを定義できます。`action`は次の2種類があります。

| | テキスト | 画像 |
|---|---|---|
| `"action": "mask"` | マッチした部分を`***`に置換 | マッチした矩形領域をcrystallize + blurでマスク |
| `"action": "discard"` | クリップボード全体を`[DISCARDED: <name>]`に置換 | 画像全体を赤い警告画像に置換 |

正規表現は`/regex/flags`の形式で、フラグは`i`（case-insensitive）、`m`（multiline）、`s`（dotAll）に対応しています。

たとえば次のように書くと、文字列に「secretlint」を含むテキスト・画像をすべてマスクできます。

```json
{
    "name": "demo",
    "pattern": "/secretlint/i",
    "action": "mask"
}
```

このパターンを有効にした状態でメニューバーをスクリーンショットに撮ると、メニュー内の`secretlint v11.7.1`というテキストもOCR経由で検出されて、その部分だけがマスクされます。

![カスタムパターンでメニュー内のテキストがマスクされた例](/wp-content/uploads/2026/20260419-103913.webp)

### skipScanAppIdentifiers

Bundle Identifierを指定して、特定のアプリからのコピーをスキャン対象外にできます。
1Passwordなどのパスワードマネージャーは、コピーされる時点で意図的に取り出された値なのでスキャンを除外しておくのがよさそうです。

設定変更は次のクリップボード操作のタイミングで自動的に反映されるので、再起動は不要です。

## アーキテクチャ

SecureClipboardはSwiftで書かれたネイティブのmacOSアプリです。
主要なコンポーネントは次のとおりです。

- `ClipboardMonitor` … `NSPasteboard`をポーリングしてクリップボードの変更を検出
- `SecretScanner` … secretlintのバイナリをsubprocessで呼び出してスキャン
- `ImageSecretDetector` … Vision frameworkでOCRしてテキスト + 矩形を取得
- `ClipboardRewriter` … テキスト・画像を上書きする
- `IPCServer` … Unix Domain SocketでCLIツールからのリクエストを受ける
- `SecretlintUpdater` … GitHub Releasesからsecretlintのバイナリを自動更新

secretlint本体はNode.js製のCLIですが、SecureClipboardは[secretlintの単一バイナリ版](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/binary)をsubprocessで呼び出しています。
そのため、ホストマシンにNode.jsがインストールされていなくても動作します。

## まとめ

SecureClipboardは、クリップボードに入った機密情報をsecretlintで検出して自動的にマスクするmacOSアプリです。
テキストだけでなく画像にも対応していて、スクリーンショットに写り込んだトークンなどもVision frameworkでOCRしてマスクできます。

そもそもシークレットは生で扱わないのが基本で、自分も[1Passwordを使って、ローカルにファイル(`~/.config`や`.env`)として置かれてる生のパスワードなどを削除した](https://efcl.info/2023/01/31/remove-secret-from-local/)りしています。
ただ、サービスから発行されたAPIキーを1Passwordに入れる場面など、どうしても一度クリップボードを経由する瞬間があります。
クリップボード自体はデフォルトでセキュアな設計とはいえないので、SecureClipboardはこの隙間を補う仕組みとして使えます。

---

- GitHub: [secretlint/secure-clipboard](https://github.com/secretlint/secure-clipboard)
