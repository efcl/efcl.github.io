---
title: "textlintとGitHubのCode Scanningを組み合わせてリンク切れをチェックする"
author: azu
layout: post
date : 2022-12-12T21:55
category: textlint
tags:
    - textlint

---

[textlint](https://textlint.github.io/)のルールにリンク先のURLがアクセスできなくなってないかをチェックする[textlint-rule-no-dead-link](https://github.com/textlint-rule/textlint-rule-no-dead-link)というルールがあります。

[textlint-rule-no-dead-link](https://github.com/textlint-rule/textlint-rule-no-dead-link)は実際にURLにリクエストを送ることでアクセスできるかをチェックするため、URLの数が多くなるとものすごく時間がかかります。
また、GitHubのように同一IPからのアクセスが連続すると`429 too many requests`などのエラーを返すサイトもあります。
[textlint-rule-no-dead-link](https://github.com/textlint-rule/textlint-rule-no-dead-link)は[Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After)ヘッダを見てリトライにも対応していますが、このリトライの間隔が長いサイトもあるため、リンク切れのチェックはコミット時にやるのには向いてない作業と言えます。

GitHubでは、GitHub Actionsを使って[schedule](https://docs.github.com/ja/actions/using-workflows/events-that-trigger-workflows#schedule)実行に対応しています。
一方で、[schedule](https://docs.github.com/ja/actions/using-workflows/events-that-trigger-workflows#schedule)で毎日特定の時間に実行しても、その結果を保存先をどうするかという問題がありました。

最近のGitHubでは[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)という機能があります。
[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)は[Dependabot](https://github.com/dependabot)などのセキュリティアラートとほぼ同じ仕組みとなっていて、アラートをServerityやコミットに紐付けて管理できます。
Dependabotと異なるのは、[SARIF](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning)形式でLintなどのチェック結果をアップロードすれば、任意のチェック結果を[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)に表示できるようになっています。

![Code Scanning](https://efcl.info/wp-content/uploads/2022/12/12-1670850335.png)

この仕組みを利用して、textlintのチェック結果を[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)に表示することもできます。

## リンク切れの結果を[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)にアップロード

具体的には、次のように[textlint](https://textlint.github.io/)で[textlint-rule-no-dead-link](https://github.com/textlint-rule/textlint-rule-no-dead-link)を利用するように設定します。

```json
{
  "rules": {
    "no-dead-link": true
  }
}
```

この設定をして、GitHub Actionsでtextlintのチェック結果をSARIF形式にして、[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)にアップロードするだけです。

```yaml
name: Link Check
on:
  workflow_dispatch:
  schedule:
    - cron: '45 15 * * *'

permissions:
  contents: read
  security-events: write

jobs:
  test:
    runs-on: ubuntu-latest
    name: Link Check
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx textlint -f @microsoft/eslint-formatter-sarif -o textlint.sarif || exit 0 # workaround https://github.com/textlint/textlint/issues/103
      - name: Upload SARIF file
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: textlint.sarif
          category: textlint
```

ESLintのformatterは大体textlintでも動くので、[@microsoft/eslint-formatter-sarif](https://github.com/microsoft/sarif-js-sdk/tree/main/packages/eslint-formatter-sarif)をそのまま利用しています。

こうするとリポジトリのSecurityタブで、リンク切れの結果を確認できるようになります。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://t.co/DTZFg4ZSw3">https://t.co/DTZFg4ZSw3</a><br>textlintの結果をCode Scanningに載せるworkflow <a href="https://t.co/ZLaPvmM7lq">pic.twitter.com/ZLaPvmM7lq</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1586646564021235712?ref_src=twsrc%5Etfw">October 30, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

### [code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)のメリット

[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)は、重複チェックをしてくれるため、同じ結果を何度アップロードしてもできる項目は一つです。
GitHub Issuesを作るような仕組みだとこのチェックは自前で書く必要があります。

また、Dependabotと同じく結果からIssueを作成できたり、誤検知なので無視することも可能です。
[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)の結果はコミットと紐づけることもできる(scheduleではなく、pushやpull_requestで回す)ので、どのコミットから起き始めた問題なのかも紐付けできます。

![Details](https://efcl.info/wp-content/uploads/2022/12/12-1670850761.png)

[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)は、リンク切れなどの不確実性があるチェックをCIで回すときに相性がいい仕組みです。
確実に落ちる落ちないがはっきりしているものは、PRを出すときにCIを回すのが良いですが、不安定なものはPR時に回すとノイズとなります。
そのため、時間がかかりすぎたり確実性が低い処理を毎日定時で回して、その結果を[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)に載せるだけでもカバーできる範囲が広がります。

- jsprimerの例: https://github.com/asciidwango/js-primer/blob/ca6a7d8adbaee6661b6c69f849023e50ea406524/.textlintrc.js#L102-L115

このように[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)は、セキュリティ以外の用途でも結構便利です。
[code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)はPublicリポジトリなら無料で利用できますが、Privateリポジトリだと[GitHub Advanced Security](https://docs.github.com/ja/get-started/learning-about-github/about-github-advanced-security)がないと利用できないのが残念なポイントです。
