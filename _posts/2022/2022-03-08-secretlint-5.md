---
title: "Secretlint 5をリリースした。SARIF形式の対応、Configのバリデーション強化、Slackのxapp-トークンの検出に対応"
author: azu
layout: post
date : 2022-03-08T22:49
category: secretlint
tags:
    - secretlint
    - security

---

APIトークンや秘密鍵を検出するツールである[Secretlint](https://github.com/secretlint/secretlint) 5をリリースしました。

- [Release v5.0.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v5.0.0)

Secretlint 5は、機能追加的な変更はありません。
主に、`.secretlintrc.json`のバリデーションが強化が目的です。
また、Node.js 12 LTSが2022-04でメンテナンスが終了するので一足早くサポートを切っています。

バリデーションを改善したことで、今ままで許容されていたけど意味がない設定になっていたケースなども実行前に検出できるようになっています。
その結果、いままで動いていた(素通りしていた)設定がエラーとなるケースもあるためメジャーアップデートとしています。

- [feat(config-loader): improve validation to config by azu · Pull Request #224 · secretlint/secretlint](https://github.com/secretlint/secretlint/pull/224)

具体的には、今までは次のようにプリセットの中に無効な`id`を指定しても単に無視されるだけでした。
5.0.0からは、これは設定エラーとして検出されるので、間違った設定がしにくくなっています。

```json
{
  "rules": [
    {
      "id": "@secretlint/secretlint-rule-preset-recommend",
      "rules": [
        {
          "id": "invalid-id"
        }
      ]
    }
  ]
}
```

これは設計的な話ですが、内部的には`@secretlint/config-loader`と`@secretlint/config-validator`という二つのモジュールで設定ファイルを読んでいました。
今回の変更でバリデーションが`@secretlint/config-loader`に統合されたので、`@secretlint/config-validator`はなくなりました。
気持ち的にはバリデーションを別モジュールに分けるのは正しいのですが、分ける意味があまりないという問題がありました。
`.secretlintrc`は設定ファイルではありますが、設定ファイルに書かれたルールモジュールを読み込まないと、設定が構築できません。

これは、設定ファイルをJSON Schemaでバリデーションしてるだけだと検出できないという意味でもあります。
そのため、正しくバリデーションするには、Configをロードする必要があるため、loaderとvalidatorを分ける必要性がなかったということに気づいてこの変更をしています。

そのため、5.xでは次のような2段階のバリデーションになりました。

- Configの設定ファイルの文字列そのもの(内部的にはConfigDescritor)をJSON Schemaでバリデーション
- 設定ファイルを元にルールを読み込むConfigオブジェクトを構築
- Configオブジェクトと設定ファイルの記述を元にもう一段バリデーション(preset内のidチェックなどルール側のデータを使う)

このワークフローは結構悩んだので、他のツールはどうやってるかとか、どうやると綺麗に書けるかが気になります。

## SARIF形式の対応

5.0.0の変更ではないですが、、SecretlintでSARIF形式の出力に対応しました。

- [Release v4.2.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v4.2.0)

[SARIF](https://sarifweb.azurewebsites.net/)形式は静的解析ツール向けのフォーマットで、GitHubのCode Scanningなどが対応しています。今後、Lintやスキャナーなどで対応が増えてくるフォーマットだと思います。

- [SARIF support for code scanning - GitHub Docs](https://docs.github.com/ja/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning)

secretlintではformatterをプラグインとして書けるので、次のように`@secretlint/secretlint-formatter-sarif`をインストールとして使うだけで、SARIF形式の結果を出力できます。

```
npm install @secretlint/secretlint-formatter-sarif --dev
secretlint --format @secretlint/secretlint-formatter-sarif "**/*"
```

SARIFの対応には[nvuillam/node-sarif-builder](https://github.com/nvuillam/node-sarif-builder)を使いました。

## Slackのxapp-形式のトークンに対応

Secretlint 5.1.0でSlackの`xapp-`から始まるトークンの検出に対応しました。
Socket Modeなどを扱うときはこのトークンが必要になるそうです。

- [Release v5.1.0 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v5.1.0)

## Secretlintをリリースしてから2年たった

Secretlint 1.0をリリースしてから大体2年経ちました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Secretlint 1.0.0リリースしました。<br>SSH秘密鍵/GCP/AWS/Slack/npmのトークンとかをスキャンしてコミットを防止したりするプラガブルなLintツールです。<br>CIでチェックしたりGit Hookでコミット前に検知とかができます。<a href="https://t.co/7XvhGWrYOB">https://t.co/7XvhGWrYOB</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1240518771804000256?ref_src=twsrc%5Etfw">March 19, 2020</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Secretlintを作った理由は[git-secrets](https://github.com/awslabs/git-secrets)とかがチーム開発するプロジェクトとかでは使いにくすぎて、他にいいものがなかったので作りました。

- [SecretlintでAPIトークンや秘密鍵などのコミットを防止する | Web Scratch](https://efcl.info/2020/03/24/secretlint/)

また、Gitのグローバルhookを使って常にコミット時にsecretlintを通すようにしています。

- [secretlint/git-hooks: Global git hooks integration example](https://github.com/secretlint/git-hooks)
- [azu/git-hooks: @azu's global git hooks](https://github.com/azu/git-hooks)

年に数回はうっかりコミットしそうになって、それが防げいているので作っておいてよかったなーという感じがします。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">レスポンスをコメントで埋め込んでたけど、その中にtokenが入ってて、ちゃんとsecretlintに怒られてコミットが失敗してた。</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1489614698098003968?ref_src=twsrc%5Etfw">February 4, 2022</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

現在は、GitHub Code Scanningなどpush後に検知できるものはだいぶ充実してきた気はします(Privateだと大体有料になりますが)。

- [Code scanningについて - GitHub Docs](https://docs.github.com/ja/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)

それでもpush前に検知できるツールや外部サービスに依存しないツールはやっぱり欲しいので、そういう立ち位置なのかもしれないです。

Secretlintをなんで作ったかの詳細は1.0リリース時の[Why Secretlint?](https://github.com/secretlint/secretlint/releases/tag/v1.0.0)に書いていました。

- Reduce false-positive of linting
- Integration to developing workflow
- Empower Users to Contribute

最初に作るときにRustで書くかNodeで書くかを迷っていた気がします。
当時はEmpower Users to Contributeで書いてるように、Nodeの方が圧倒的にコミットしやすいと思ったのでNodeで書きました。
また、Rustでプラグインを書ける仕組みが当時はあんまり想像できなかったからですね。

現在もRustでプラグインをちゃんとやろうとしているのは[SWC](https://swc.rs/)とかぐらいしか知らない(他にもあったら教えてください)ですが、2年前に比べるとだいぶRustが使われるようになったと思います。
Secretlintは、色んなファイルをスキャンしますが、現実的にはPRの差分単位で見るとかなので、めちゃくちゃ大量のファイルを見る使い方はあんまりしてません。

- [docs: add GitHub Actions for diff files · Issue #166 · secretlint/secretlint](https://github.com/secretlint/secretlint/issues/166)

大量のファイルを見るにはやっぱりRustとかで書いた方が早くなるので、この辺に興味がある人がいたらRustでやってみるとかもありなのかもしれないなーと思いました。
(単純にRustでのプラグインシステムに興味がある)

Secretlintはブラウザでも動くように設計しているので、この辺も考慮したRustでプラガブルな仕組みとかどうやるんだろと考えています。

- [secretlint/webextension: Detect secrets in your request/response using secretlint.](https://github.com/secretlint/webextension)
- [見ているサイト上に露出している機密情報(APIトークン、IPアドレスなど)を見つけるブラウザ拡張を作りました | Web Scratch](https://efcl.info/2021/08/19/secretlint-webextension/)
