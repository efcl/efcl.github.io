---
title: "SecretlintでAPIトークンや秘密鍵などのコミットを防止する"
author: azu
layout: post
date : 2020-03-24T09:00
category: 
tags:
    - Secretlint
    - Node.js
    - Security

---

[Secretlint][]はAPIトークンや秘密鍵のようなリポジトリにコミットしてはいけないデータを含んだファイルがないかをチェックするツールです。

![Secretlintの出力例: AWSのSecret Access Keyが見つかったケース](https://efcl.info/wp-content/uploads/2020/03/23-1584973190.png)

[Secretlint][]が見つけられるCredentials(秘匿情報)はプラグインで拡張できるようになっていて、[npm](https://github.com/secretlint/secretlint/tree/master/packages/@secretlint/secretlint-rule-npm)、[AWS](https://github.com/secretlint/secretlint/tree/master/packages/@secretlint/secretlint-rule-aws)、[GCP](https://github.com/secretlint/secretlint/tree/master/packages/@secretlint/secretlint-rule-gcp)、[Slack](https://github.com/secretlint/secretlint/tree/master/packages/@secretlint/secretlint-rule-slack)、[SSH秘密鍵](https://github.com/secretlint/secretlint/tree/master/packages/@secretlint/secretlint-rule-privatekey)、[ベーシック認証](https://github.com/secretlint/secretlint/tree/master/packages/@secretlint/secretlint-rule-basicauth)などの検知に対応しています。

Gitのpre-commit hookやCIサービス上でSecretlintを使ってファイルの中身をチェックすることで、
リポジトリ時うっかりCredentialsをコミットしてしまうことを防止する目的のLintツールです。

Credentials(秘匿情報)のチェックに特化した[ESLint](https://eslint.org/)や[textlint](https://textlint.github.io/)のようなLintツールです。

## まずチェックしてみよう

[Secretlint][]はDockerかNode.jsが入っている環境なら次のコマンドで、現在ディレクトリ以下を簡易チェックできます。

**Docker:**

```
docker run -v `pwd`:`pwd` -w `pwd` --rm -it secretlint/secretlint secretlint "**/*"
```

**Node.js:**

```
npx @secretlint/quick-start "**/*"
```

`"**/*"` は現在のディレクトリ以下をすべてを対象にする[globパターン](https://github.com/micromatch/micromatch#matching-features)です。
実行した結果特にエラーが表示されていなければ、そのプロジェクトにはSecretlintが検知できるCredentialsは入っていないはずです。

もしなんらかのエラーが表示された場合は、先ほど紹介した検知できるCredentialsの何かが平文で書かれたものがあるはずです。

次の画像はAWSのSecret Access Keyが見つかったケースの表示です。

![Secretlintの出力例: AWSのSecret Access Keyが見つかったケース](https://efcl.info/wp-content/uploads/2020/03/23-1584973190.png)

一度きりのチェックだと継続的なセキュリティは担保できないので、CIやGitコミットフックなどでプロジェクトに導入する方法を紹介しています。
また、個人環境のグローバルなGitコミットフックに常にSecretlintのチェックを入れることもできます。

## [Secretlint][]をプロジェクトに導入する

[Secretlint][]を作った理由の一つでもありますが、Secretlintはプロジェクトに組み込みやすさを意識して作成しています。

### Docker

先ほども紹介したようにDockerで使う場合は[`secretlint/secretlint`](https://hub.docker.com/r/secretlint/secretlint/tags)のイメージを利用できます。

```
docker run -v `pwd`:`pwd` -w `pwd` --rm -it secretlint/secretlint secretlint "**/*"
```

それぞれのタグ付きでpublishしているので、バージョンを固定したい場合は `secretlint/secretlint:v1.0.0` のようにバージョン指定して利用してください。

- [secretlint/secretlint](https://hub.docker.com/r/secretlint/secretlint/tags)

Docker版は、動的なLinkの仕組みが思いつかなかったため、ルールを追加する場合は新しいImageを作成する形になる気がします。

- [secretlint/publish/docker at master · secretlint/secretlint](https://github.com/secretlint/secretlint/tree/master/publish/docker)

ルールのオプション変更などの設定自体は次に紹介する方法で設定できます。

### Node.js

SecretlintはNode.jsで書かれているため、Node.jsのCLI/ライブラリとしても利用可能です。
[Secretlint][]はビルトインルールを一つも持っていませんが、[@secretlint/secretlint-rule-preset-recommend](@secretlint/secretlint-rule-preset-recommend)という推奨ルールセットを提供しています。

Docker版と先ほどの`@secretlint/quick-start`はこの推奨ルールセットを組み込んだ形になっています。

より柔軟にNode.jsのプロジェクトに導入する場合は、次のステップでSecretlintをインストールしてください。

[npm](https://www.npmjs.com/)を使ってsecretlintとpresetルールをインストールする。

```
npm install secretlint @secretlint/secretlint-rule-preset-recommend --save-dev
```

インストール後に、次のコマンドで`.secretlintrc.json`という設定ファイルを作成できます。

```
npx secretlint --init
```

これで導入できたので、あとは`secretlint`コマンドを実行するだけです。

```
npx secretlint "**/*"
```

`secretlint`コマンドを細かい利用方法は`secretlint --help`を参照してください。
結果の出力形式を変更したり、`--secretlintrcignore .gitignore`で`.gitignore`に書かれたファイルを対象外にするといった設定もできます。
またsecretlintには国際化の仕組みが入っているので`secretlint --locale ja`で一部日本語の結果を得られたりします。

## 設定方法

Node.jsで導入した場合は`secretlint --init`コマンドによって次のような`.secretlintrc.json`という設定ファイルが作成されています。

`.secretlintrc.json`:

```json
{
  "rules": [
    {
      "id": "@secretlint/secretlint-rule-preset-recommend"
    }
  ]
}
```

このファイルはSecretlintで使いたいルール/プリセットを追加していきます。
(Docker版を使ってる場合も、カレントディレクトリに`.secretlintrc.json`があれば参照されます)

`id`は導入するnpmのパッケージ名で、この`id`を追加するとSecretlintはそのルールパッケージを使ってチェックします。
ルールはnpmでインストールするので、`node_modules`以下にそのルールがインストールされている必要があります。
(Docker版や`@secretlint/quick-start`は`@secretlint/secretlint-rule-preset-recommend`を同梱している)

```json
{
  "rules": [
    {
      "id": "@secretlint/secretlint-rule-preset-recommend"
    },
    {
      "id": "@secretlint/secretlint-rule-example"
    }
  ]
}
```

`id`以外にも共通の設定プロパティがいくつかあります。

- `options`: ルールのオプションです。ルールごとにオプションの設定をできる。ルールのドキュメントを参照
- `disabled`: ルールを無効化したいときは`true`を指定します。
- `allowMessageIds`: 各ルールのエラーメッセージには`messageId`という識別子が用意されています。
    - 特定のルールの特定のエラーメッセージだけを無視したい場合は`allowMessageIds`で指定すると無視できます

**options** の例

[`@secretlint/secretlint-rule-preset-recommend`](https://github.com/secretlint/secretlint/tree/master/packages/@secretlint/secretlint-rule-preset-recommend)の中の[`@secretlint/secretlint-rule-aws`](https://www.npmjs.com/package/@secretlint/secretlint-rule-aws)ルールには`allows`というオプションがあります。これはマッチしたものをエラーにしないオプションです。

次のように指定すれば、`wJalrXUtnFEMI/K7MDENG/bPxRfiCYSECRETSKEY`というトークンがファイル内に書かれていてもエラーにはなりません。

```json
{
  "rules": [
    {
        "id": "@secretlint/secretlint-rule-preset-recommend",
        "rules": [
            {
                "id": "@secretlint/secretlint-rule-aws",
                "options": {
                    "allows": ["wJalrXUtnFEMI/K7MDENG/bPxRfiCYSECRETSKEY"]
                }
            }
        ]
    }
  ]
}
```

**allowMessageIds**の例

[`@secretlint/secretlint-rule-aws`](https://www.npmjs.com/package/@secretlint/secretlint-rule-aws)ルールはAWSのSecretAccessKeyを検知してエラーを報告してくれます。

![AWSSecretAccessKey](https://efcl.info/wp-content/uploads/2020/03/24-1584980111.png)

このエラーだけを常に(どのファイルでも)無視したい場合は、`AWSSecretAccessKey`を`allowMessageIds`に指定することで実現できます。

```json
{
    "rules": [
        {
            "id": "@secretlint/secretlint-rule-preset-recommend",
            "rules": [
                {
                     "id": "@secretlint/secretlint-rule-aws",
                     "allowMessageIds": ["AWSSecretAccessKey"]
                }
            ]
        }
    ]
}
```

理想的にはルールにfalse-positiveのような誤検知をなくせるのが良いのですが、
それが誤検知かはプロジェクトによるので、細かい制御をできる仕組みがSecretlintには含まれています。

## Lint対象から外す

`.secretlintignore`というファイルを作成すると、そのファイルに書かれたパターンのファイルはLintの対象外とします。
`.secretlintignore`の書式は[.gitignore](https://github.com/github/gitignore)と同じです。

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock
```

次のように指定すれば`.gitignore`を`.secretlintignore`として使うこともできます。

```
secretlint --secretlintignore .gitignore "**/*"
```

## コミット前にSecretlintでチェックする

Gitでコミットする前にSecretlintでコミットするファイルをチェックできます。

Gitで一度コミットすると`git filter-branch`で歴史を改竄しない限り、そのCredentialsはコミット履歴に残ります。
また、GitHubに一度でもpushしたりPull Requestを作ったりすると、そのデータは問い合わせしない限り完全には消せません。

- [Removing sensitive data from a repository - GitHub Help](https://help.github.com/en/github/authenticating-to-github/removing-sensitive-data-from-a-repository)

そのため、コミット前に検知して、Credentialsをコミットしようとしたらコミット失敗させるのが単純で効果的です。

### プロジェクトにpre-commit hookを導入する

Node.jsのプロジェクトなら[Husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged)でpre-commit hookを実現するのが簡単です。

[Husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged)をインストールします。

```
npm install husky lint-staged --save-dev
```

`package.json`を編集して、`pre-commit`時に`lint-staged`ですべてのファイルを`secretlint`でチェックするようにします。

```json5
{
  // ...
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*": [
      "secretlint"
    ]
  }
}
```

これで、コミットする前に`secretlint`でチェックする仕組みがプロジェクトに導入できます。
チーム開発している際には、プロジェクトにこのようなチェックを導入するのが良いと思います。

他にも[pre-commit](https://pre-commit.com/#install)を使った方法やBash Scriptを使った方法などもあります。
それぞれ次のページで紹介しています。

- <https://github.com/secretlint/secretlint#pre-commit-hook-per-project>

### 個人環境にpre-commit hookを導入する

プロジェクトではなく、個人の環境ではSecretlintのチェックを必ずコミット前に通したいというケースです。

[Git 2.9+](https://github.blog/2016-06-13-git-2-9-has-been-released/)から[`core.hooksPath`](https://git-scm.com/docs/githooks)という設定が追加され、いわゆるGlobalなGit hooksが実現できるようになりました。

Secretlintを`core.hooksPath`に設定する例は次のリポジトリにあります。

- [secretlint/git-hooks](https://github.com/secretlint/git-hooks)
    - Requirement: Docker

これはDocker版の例ですが、次のようにセットアップするだけで、コミット前には常にSecretlintでのチェックが入ります。
かつ、そのリポジトリに別のcommit hookが設定されている場合はそっちも実行されます。

```bash
# clone this repository
git clone https://github.com/secretlint/git-hooks git-hooks
cd git-hooks
# integrate secretlint to git hook globally
git config --global core.hooksPath $(pwd)/hooks
```

グローバルなpre-commit hookを導入することで、リポジトリにAWSのキーを間違ってコミットするのを防止するなどの効果があります。

自分が利用している`core.hooksPath`の設定は次のリポジトリにあります。

- [@azu/git-hooks](https://github.com/azu/git-hooks).

特定のファイルパス(プロジェクト)では無効化したりとか細かいオプションが入っています。

## CI

今どきのCIはだいたいDockerをサポートしているので、SecretlintのDocker Imageを使えば簡単に導入できます。

GitHub ActionsでNode.jsを使う場合は次のような形で導入できます。

`.github/workflows/secretlint.yml`を作成し、次のように設定する。

```yaml
name: Secretlint
on: [push, pull_request]
env:
  CI: true
jobs:
  test:
    name: "Secretlint"
    runs-on: ubuntu-18.04
    strategy:
      matrix:
        node_version: [12]
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: setup Node ${{ matrix.node_version }}
        uses: actions/setup-node@v1
        with:
          node_version: ${{ matrix.node_version }}
      - name: Install
        run: npm install
      - name: Lint with Secretlint
        run: npx secretlint "**/*"
```

これだけで、CIでのチェックとチェック結果をコメントが導入できます。

[![image](https://efcl.info/wp-content/uploads/2020/03/24-1584981940.png)](https://github.com/azu/secretlint-github-actions-example/pull/1/files)

## ルールを作る

[Secretlint][]は自作のルールを簡単に追加できます。
コアのルールセットも同じ方法で実装されています。

基本的にはTypeScriptやJavaScriptでかけるようになっています。
次の`@secretlint/secretlint-rule-example`は`secret`という文字列を見つけるルールの実装例です。


```js
import { SecretLintRuleCreator, SecretLintSourceCode } from "@secretlint/types";

// MessageIds
export const messages = {
    EXAMPLE_MESSAGE: {
        en: "found secret: {{ID}}",
        ja: "secret: {{ID}} がみつかりました"
    }
};

export const creator: SecretLintRuleCreator = {
    messages,
    meta: {
        // rule.meta.id should be same with package.json name
        id: "@secretlint/secretlint-rule-example",
        recommended: false,
        // type
        type: "scanner",
        // support content types: "text" or "binary" or "all"
        supportedContentTypes: ["text"],
        // Documentation Base URL for the package
        docs: {
            url:
                "https://github.com/secretlint/secretlint/blob/master/packages/%40secretlint/secretlint-rule-example/README.md"
        }
    },
    // Rule Logic
    create(context) {
        // Create Traslate instance
        const t = context.createTranslator(messages);
        return {
            // source has `content`, `filePath` etc...
            file(source: SecretLintSourceCode) {
                const pattern = /secret/gi;
                let match;
                while ((match = pattern.exec(source.content)) !== null) {
                    const index = match.index || 0;
                    const matchString = match[0] || "";
                    const range = [index, index + matchString.length];
                    // Report found "secret"
                    context.report({
                        // Replace "found secret: {{ID}}" with `ID` data
                        message: t("EXAMPLE_MESSAGE", {
                            ID: matchString
                        }),
                        range
                    });
                }
            }
        };
    }
};
// export it as default
export default creator;
```

詳しい作り方は次のドキュメントを参照してください。

- https://github.com/secretlint/secretlint/blob/master/docs/secretlint-rule.md

## なぜSecretlintを作ったのか

[Secretlint][]を作った理由は、プロジェクトに導入しやすいCredentialチェックツールがなかったためです。

[git-secrets](https://github.com/awslabs/git-secrets)を導入しようとしたのですが、git-secretsは設定を`.git/config`で管理するため、設定を管理しにくいという問題がありました。
インストールする際にpre-commit hooksが設定でき、どのようなチェックをするかを設定ファイル(Gitで)管理したいというのがあります。
`git-secrets`だと、設定を変更するたびに`.git/config`を変更するコマンドを叩く必要があります。
(`git-secrets`はグローバルにインストールして使う想定なのかなと思います)

仕組み的にもイメージと近い[detect-secrets](https://github.com/Yelp/detect-secrets)というツールもあったのですが、
Opt-inではなくOpt-outで設定させる点やentropyという概念でチェックがあって、検知するかどうかをコントールするのが難しいという問題がありました。

他にも色々なスキャンツールはあるのですが、多くのツールはできるだけ多くのことをチェックする実装になっていることが多く、
過剰な検知(false-positive)が発生しやすい形になっていて、継続的にチェックするのには向いてない感じがしました。
(たとえば、`password`という文字列だけでアラートを出すなど、継続的に出すとただのノイズになってしまう)

これは[textlint](https://textlint.github.io/)を作っていてもそうだったのですが、Lintで99%検知できて1%は誤検知だと使うのは難しい感じです。
誤検知があるとその時点で使うことを諦めてしまうので、できるだけfalse-positiveをなくす仕組みが必要でした。
また、実際に誤検知があった際に簡単に抑制できる仕組みも必要です。

そのためSecretlintでは次のような単位でエラーを抑制できる手段も提供しています。

- `.secretlintignore`: ファイル単位
- `disabled`オプション: ルール単位
- `allowMessageIds`オプション: ルール内のメッセージ単位

また、内部的にはtextlintの[Filter Rule](https://textlint.github.io/docs/filter-rule.html)と同じ仕組みも実装しているため、
ルールによるエラーの抑制も実装できるようになる予定です。
(たとえば、[コメントによるコードレベルの抑制](https://github.com/secretlint/secretlint/issues/96)なども実装したいです。)

その他にも、Secretlintではルールのエラーを意味ある形で説明したいという気持ちがあったため、ドキュメント周りにも仕組みを色々入れています。
(これはtextlintでまだできてない部分)

たとえば、[iTerm など Hyperlinksに対応したターミナル](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda)なら、エラー表示に出てくるMessageIdをCmd + Clickすると、直接ドキュメントを開けるようになっています。

![Terminal Link](https://efcl.info/wp-content/uploads/2020/03/24-1585022896.png)

まだ、ウェブサイトもないので、ドキュメント周りはちゃんと理解しやすい説明をする形にしていきたいと思います。

- [Website · Issue #75 · secretlint/secretlint](https://github.com/secretlint/secretlint/issues/75)

## さいごに

ひとまず安定して動くようになったので[Secretlint][] 1.0をリリースしました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Secretlint 1.0.0リリースしました。<br>SSH秘密鍵/GCP/AWS/Slack/npmのトークンとかをスキャンしてコミットを防止したりするプラガブルなLintツールです。<br>CIでチェックしたりGit Hookでコミット前に検知とかができます。<a href="https://t.co/7XvhGWrYOB">https://t.co/7XvhGWrYOB</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1240518771804000256?ref_src=twsrc%5Etfw">March 19, 2020</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

履歴を全部チェックする[History Scanner](https://github.com/secretlint/secretlint/issues/34)などまだ実装したい機能は色々あります。

SecretlintへのContributionsはいつでも歓迎しています。
興味ある人は次のラベルを見てみるといいかもしれません。

- [label:good first issue](https://github.com/secretlint/secretlint/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [help wanted](https://github.com/secretlint/secretlint/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

[Icon/logo](https://github.com/secretlint/secretlint/issues/13)も適当に作ったやつなので、これもどうにかしたいです。

[Secretlint]: https://github.com/secretlint/secretlint
