---
title: "secretlintが見つけた機密情報をマスクできるようになりました"
author: azu
layout: post
date : 2021-07-12T22:50
category: JavaScript
tags:
    - secretlint
    - security
    - Node.js

---

[secretlint](https://github.com/secretlint/secretlint)は、ソースコードなどから機密情報を見つけて報告するLintツールです。

Gitのpre-commitにhookしてAWSやGitHubなどのトークンのコミットを防止したり、CIで不必要にハードコードされたアクセストークンが入らないようにチェックできます。

- [SecretlintでAPIトークンや秘密鍵などのコミットを防止する | Web Scratch](https://efcl.info/2020/03/24/secretlint/)
- [secretlint を使って機密情報を git commit できない環境を作る | DevelopersIO](https://dev.classmethod.jp/articles/dont-allow-commiting-secrets-by-secretlint/)

secretlint 3.3.0では`--maskSecrets`というオプションをサポートして、見つけた機密情報を報告するときにマスクした値を表示できるようになりました。

- [Release v3.3.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v3.3.0)

たとえば、次の例は、`secretlint`で AWS Secret Access key を見つけて報告しています。
`--maskSecrets`オプションを使った場合は、実際に見つけたアクセスキーを`***`でマスクした値を出力するようになります。

```bash
$ secretlint --maskSecrets .credential

/Users/user/.credential
  1:0  error  [AWSSecretAccessKey] found AWS Secret Access Key: ****************************************  @secretlint/secretlint-rule-preset-recommend > @secretlint/secretlint-rule-aws

✖ 1 problem (1 error, 0 warnings)
```

このマスク機能は、CIなどで実行したときに標準出力に機密情報が表示に反応するGitLabなどとSecretlintを連携するときに便利です。

- https://docs.gitlab.com/ee/user/application_security/secret_detection/

また、CIなどのログは一定期間残ったり簡単に消せないことが多いので、機密情報は見つけたいがログには入れたくないときなどに利用できます。
(トークンやパスワードの場合はログに関係なくrevokeするのが正しいですが)

詳しいユースケースは元のIssueを見てください。

- [Option or formatter to not echo the actual secret to stdout · Issue #176 · secretlint/secretlint](https://github.com/secretlint/secretlint/issues/176)

色々実装方法は悩みましたが、最終的にはGitHub ActionsやTravis CIのように、ルールがレポートしたデータを単純に文字列置換するという方法を取りました。
[secretlintのルールはエラーメッセージを作るときに、テンプレートとなる関数にデータオブジェクト](https://github.com/secretlint/secretlint/blob/master/docs/secretlint-rule.md)として機密情報などのトークンを渡します。
この渡されたデータと一致する文字列を自動的に `***` に置き換えるようにしました。

単純な文字列置換なので、機密情報とは関係ないけど同じ文字列だった場合も`***`にマスクされるのはGitHub Actionsなどと同様です。
単純すぎてfalse-positiveもありますが、マスクしたい場合はこれぐらいシンプルな方が良い気がしました。

- [feat(core): add `maskSecrets` option by azu · Pull Request #177 · secretlint/secretlint](https://github.com/secretlint/secretlint/pull/177)
