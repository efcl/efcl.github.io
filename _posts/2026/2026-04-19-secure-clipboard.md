---
title: "SecureClipboard: クリップボードに入った機密情報を自動でマスクするmacOSアプリ"
author: azu
layout: post
date: 2026-04-19T12:00
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

![SecureClipboardのメニューバー](/wp-content/uploads/2026/04/secure-clipboard-menu.png)

テキストだけでなく画像にも対応していて、スクリーンショットに写り込んだトークンなどもVision frameworkでOCRしてマスクします。
内部では[secretlint](https://github.com/secretlint/secretlint)を使って、AWS、GitHub、Slack、GCP、Azure、npm、Dockerなどのトークンを検出します。

## なぜ作ったか

API Tokenをコピーして`.env`に貼り付けたあと、そのトークンがクリップボードに残ったままになることがあります。
そのまま別のウィンドウで⌘+Vしてしまい、Slackのメッセージ欄やLinearのIssueタイトル、ブラウザの検索バーなどに意図せずペーストしてしまう事故が起きやすいです。
ペーストするまでクリップボードに何が入っているかは目に見えないので、気づきにくいというのも問題です。

SecureClipboardはコピーされた瞬間にマスクするため、誤ってペーストしても安全になります。
本物のトークンが必要なときはメニューから"Copy Original Text"を選ぶと取り出せますが、90秒後に自動でクリップボードから消えるようになっています。
これは[1Passwordのクリップボードクリア](https://support.1password.com/copy-passwords/)と同じ仕組みです。

画像の場合も同様で、スクリーンショットを撮ってどこかに貼り付けるときに、意図しない映り込みを自動で防止します。
たとえばClaude Codeのターミナル画面をスクリーンショットしたときに、たまたまコマンドの中にAPIキーが含まれていた、というケースを防げます。

## 主な機能

SecureClipboardの主な機能は次のとおりです。

- 500ms間隔でクリップボードの変更を監視
- テキスト：secretlintでスキャンして、検出した機密情報を`***`に置換
- 画像：Vision frameworkでOCRして、検出した領域だけをcrystallize + blurでマスク
- 検出時はメニューバーアイコンが赤くなり、macOSの通知を表示
- "Copy Original Text"で生の値を取得（90秒後に自動消去）
- マスクしたクリップボードは[concealedとしてマーク](https://nspasteboard.org/)されるため、AlfredなどのクリップボードマネージャーやGrammarlyなどに記録されない
- `secure-pbpaste` / `secure-pbcopy` のCLIツール同梱
- secretlintのバイナリはGitHub Releasesから自動更新

## テキストへのマスキング

クリップボードに入ったテキストにシークレットが含まれていれば、その部分を`***`に置き換えます。

たとえばSlackトークンを含む次のようなテキストをコピーすると、

<!-- secretlint-disable -->
```
Slack Token is xoxb-EXAMPLE-EXAMPLE-EXAMPLE
```
<!-- secretlint-enable -->

実際にクリップボードに入るのは、トークン部分だけがマスクされた次のようなテキストになります。

```
Slack Token is ****************************
```

スクリーンショットの中にテキストとして含まれているシークレットも、Vision frameworkでOCRしてからスキャンするため、同じようにマスクされます。
たとえば下のスクリーンショットでは、cmuxの通知メニューに含まれていたユーザー情報がOCR経由で検出され、その矩形領域だけがblurされています。

![テキストマスクの例](/wp-content/uploads/2026/04/secure-clipboard-text-mask.png)

## 画像へのマスキング

画像をクリップボードにコピーした場合は、Vision frameworkでOCRしてテキストを抽出し、検出されたシークレットの矩形領域だけにマスクをかけます。

たとえば次のスクリーンショットには`ghp_`から始まるGitHub Personal Access Tokenが写り込んでいます。

![画像マスキング Before](/wp-content/uploads/2026/04/secure-clipboard-image-before.png)

これをコピーすると、トークンが写っていた矩形領域だけにcrystallize + blur効果が適用されます。

![画像マスキング After](/wp-content/uploads/2026/04/secure-clipboard-image-after.png)

画像全体にぼかしをかけてしまうと使い物にならないため、Vision frameworkで取得したテキストの矩形位置を使って、シークレットがあった部分だけをマスクするようになっています。
これは [v1.1.0](https://github.com/secretlint/secure-clipboard/releases/tag/v1.1.0) で改善した部分で、それ以前は粗めに領域を取っていましたが、今は実際にシークレットがマッチした領域だけが自然にマスクされます。

## "Copy Original Text"とConcealedClipboard

マスクしたあとに本物の値が必要になることもあります。
そのときはメニューバーから"Copy Original Text"を選ぶと、元のテキストをクリップボードにコピーし直せます。

![SecureClipboardのメニュー](/wp-content/uploads/2026/04/secure-clipboard-menu.png)

このとき、クリップボードには[`org.nspasteboard.ConcealedType`](https://nspasteboard.org/)というUTIが付与されます。
これはNSPasteboardの慣習で、「このクリップボードの内容は機密情報なので、履歴に残さないでほしい」という意思表示です。
[v1.4.0](https://github.com/secretlint/secure-clipboard/releases/tag/v1.4.0)からこのUTIに対応していて、AlfredやGrammarlyなどnspasteboard.orgの規約に従っているクリップボードマネージャーは、この値を履歴に保存しないようになります。

さらに90秒後にクリップボードから自動で消えるため、生の値が手元に残り続けることもありません。

## CLIツール: secure-pbpaste / secure-pbcopy

[v1.2.1](https://github.com/secretlint/secure-clipboard/releases/tag/v1.2.1)から、macOS標準の`pbpaste`/`pbcopy`を置き換えるCLIツールが付属しています。

```bash
secure-pbpaste              # クリップボードのテキストをマスクして出力
echo "text" | secure-pbcopy # テキストをマスクしてからクリップボードにコピー
```

`secure-pbcopy`の特徴として、生のテキストを一度もクリップボードに触れさせない設計になっています。
Unix Domain Socket経由で常駐アプリにテキストを送り、アプリ側でスキャン・マスクしてからクリップボードに書き込みます。
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
デフォルトの`@secretlint/secretlint-rule-preset-recommend`にはAWS、GitHub、Slack、GCP、Azure、npm、Dockerなどの[検出ルール](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-preset-recommend#rules)が含まれています。

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

### skipScanAppIdentifiers

Bundle Identifierを指定して、特定のアプリからのコピーをスキャン対象外にできます。
1Passwordなどのパスワードマネージャーは、コピーされる時点で意図的に取り出された値なのでスキャンを除外しておくのがよさそうです。

設定変更は次のクリップボード操作のタイミングで自動的に反映されるので、再起動は不要です。

## アーキテクチャ

SecureClipboardの主要なコンポーネントは次のとおりです。

- `ClipboardMonitor` … `NSPasteboard`をポーリングしてクリップボードの変更を検出
- `SecretScanner` … secretlintのバイナリをsubprocessで呼び出してスキャン
- `ImageSecretDetector` … Vision frameworkでOCRしてテキスト + 矩形を取得
- `ClipboardRewriter` … テキスト・画像を上書きする
- `IPCServer` … Unix Domain SocketでCLIツールからのリクエストを受ける
- `SecretlintUpdater` … GitHub Releasesからsecretlintのバイナリを自動更新

secretlint本体はNode.js製のCLIですが、SecureClipboardは[secretlintの単一バイナリ版](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/binary)をsubprocessで呼び出しています。
そのため、ホストマシンにNode.jsがインストールされていなくても動作します。

## インストール

```bash
curl -fSL https://github.com/secretlint/secure-clipboard/releases/latest/download/SecureClipboard.app.zip -o /tmp/SecureClipboard.app.zip
unzip -o /tmp/SecureClipboard.app.zip -d /Applications
xattr -cr /Applications/SecureClipboard.app
open /Applications/SecureClipboard.app
```

コード署名はしていないので、`xattr -cr`でquarantine属性を解除してから起動します。

アンインストールは次のとおりです。

```bash
rm -rf /Applications/SecureClipboard.app
rm -f /usr/local/bin/secure-pbpaste /usr/local/bin/secure-pbcopy
```

## まとめ

SecureClipboardは、クリップボードに入った機密情報をsecretlintで検出して自動的にマスクするmacOSアプリです。
テキストだけでなく画像にも対応していて、スクリーンショットに写り込んだトークンなどもVision frameworkでOCRしてマスクできます。

クリップボードを介した意図しないシークレットの流出を防ぎたい場合に使ってみてください。

---

- GitHub: [secretlint/secure-clipboard](https://github.com/secretlint/secure-clipboard)
