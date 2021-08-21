---
title: "追加の依存パッケージなしでプロジェクトごとのGitコミットフックを設定する方法"
author: azu
layout: post
date : 2021-08-21T08:45
category: JavaScript
tags:
    - JavaScript
    - Git

---

Git 2.9以降は[`core.hooksPath`](https://git-scm.com/docs/githooks)というオプションでグローバルまたはローカルの[Gitフック](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF)のディレクトリを指定できるようになっています。
`core.hooksPath`オプションを利用すると[husky](https://github.com/typicode/husky)、[pre-commit](https://pre-commit.com/)、[simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)、[Lefthook](https://github.com/evilmartians/lefthook)のような追加の依存がなくても、Gitの機能だけでGitフックのコードをバージョン管理して、プロジェクトのセットアップ時に自動でGitフックを設定できます。

## Node.jsプロジェクトの例

ここでは具体例として、Node.jsのプロジェクトでは[Prettier](https://prettier.io/)や[ESLint](https://eslint.org/)などをpre-commitフックで実行するパターンをよく扱うため、Node.jsプロジェクトを例にします。
`core.hooksPath`は、Gitの機能なので特にNode.js(どちらかというnpmといったパッケージマネージャ)に依存した話ではありません。

### Node.jsプロジェクトでの設定方法

`.githooks`ディレクトリ(名前は何でも大丈夫です)を作成して、このディレクトリに`pre-commit`といった[Gitフック](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF)で実行されるファイルを作成します。

具体的には次のような手順でGitフックファイルを作成していきます。

- 1. `.githooks`ディレクトリを作成する
- 2. `.githooks/pre-commit`を作成して次のように、コミットフックの処理を書く

`.githooks/pre-commmit`:

```
#!/bin/sh
echo "it is hooks!"
```

このままでは、この`.githooks`ディレクトリがGitフックのディレクトリとして扱われません。
そのため、次のように`npm install`などのプロジェクトのインストール時のlife cycle hookで`core.hooksPath`オプションを設定します。

- 3. `package.json`の[`scripts.prepare`](https://docs.npmjs.com/cli/v7/using-npm/scripts#prepare-and-prepublish)ライフサイクルスクリプトで`core.hooksPath`を設定する

```json
  "scripts": {
    "prepare": "git config --local core.hooksPath .githooks"
  },
```

これで設定は完了です。

あとは、このプロジェクトで`npm install`でインストールされると、`prepare`スクリプトが実行されて、`.githooks`ディレクトリがGitフックとして扱われます。このサンプルでは、コミットするたびに"it is hooks!"という表示が出るだけになります。

---

📝 Yarn v2以降は`prepare`をデフォルトではサポートしていないため、プラグインでlifecycleスクリプトを実行できるようにする必要があるそうです。

- [[Feature] reconsider prepare lifecycle script? · Issue #2967 · yarnpkg/berry](https://github.com/yarnpkg/berry/issues/2967)
  - [sachinraja/yarn-plugin-postinstall-dev: Run a postinstallDev script after installation](https://github.com/sachinraja/yarn-plugin-postinstall-dev)
- [Huskyのドキュメント](https://typicode.github.io/husky/#/?id=yarn-2)も参照

---

もっと具体的なサンプルプロジェクトは、次のリポジトリに作成してあります。

- [azu/githook-lint-staged-example: Git 2.9+(`core.hooksPath`) + Lint Staged without extra dependencies.](https://github.com/azu/githook-lint-staged-example)

このサンプルプロジェクトでは、[husky](https://github.com/typicode/husky)などとよく組み合わせて利用される[lint-staged](https://github.com/okonet/lint-staged)を使って、実際にコミットに含まれる差分のファイルだけを[Prettier](https://prettier.io/)で整形しています。
[husky](https://github.com/typicode/husky)の代わりに、Gitの`core.hooksPath`を直接使うイメージになっています。

具体的な[.githooks/pre-commit](https://github.com/azu/githook-lint-staged-example/blob/master/.githooks/pre-commit)の内容は、インストールされている`lint-staged`コマンドを`pre-commit`フックで叩いているだけです。

`.githooks/pre-commit`:

```
#!/bin/sh
npx --no-install lint-staged
```

次のような手順でGitフックが設定されていることを確認できます。

```
git clone git@github.com:azu/githook-lint-staged-example.git
cd githook-lint-staged-example
npm install # Gitフックが設定される
# Gitフックが動いてるかを確認
echo "const v =[1, 2,3 ]" > sample.js
git add .
git commit -m up
✔ Preparing...
✔ Running tasks...
✔ Applying modifications...
✔ Cleaning up...
[master 9074895] up
 1 file changed, 1 insertion(+)
 create mode 100644 sample.js
```

## メリット

### 依存が少ない

プロジェクトにGitフックを設定するために追加の依存が不要になる点です。

[husky](https://github.com/typicode/husky)も内部的には`core.hooksPath`を使っているので、huskyは`core.hooksPath`をラップしているツールになっています。

## デメリット

### グローバルフックとローカルフックが両立しにくい

[pre-commit](https://pre-commit.com/)、[simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)は独自のGitフックディレクトリを作るのではなく、`.git/hooks`のディレクトリにフックファイルを書き込む仕組みになっています。(husukyもv4まではこの挙動でしたが、[v5](https://blog.typicode.com/husky-5/)で`core.hooksPath`を使う方法に変わりました)

`.git/hooks`を直接変更するメリットは、グローバルのGitフックとローカル(プロジェクト)のGitフックを両立しやすい点です。

Gitでは、`git config --global core.hooksPath ~/.githooks`のようにすれば、Gitフックが設定されてない場合に実行されるグローバルなGitフックを設定できます。

- [globalなgit-hooksを設定して、すべてのリポジトリで共有のhooksを使う - Qiita](https://qiita.com/ik-fib/items/55edad2e5f5f06b3ddd1)

これを利用すると、プロジェクト関係なくグローバルフックを使って[secretlint](https://github.com/secretlint/secretlint)でコミット内容をチェックして、ローカルのGitフックも実行するのが簡単にできます。

しかし、Git(2.29.2で確認)では、`core.hooksPath`のローカルのフックが設定されていると、グローバルのフックは実行されないという挙動になります。
そのため、グローバルのフックとローカルのフックを同時に実行にするには、ちょっとしたハックが必要になります。

自分の[グローバルフックのリポジトリ](https://github.com/azu/git-hooks#zsh-integration)の[Zsh Integration](https://github.com/azu/git-hooks#zsh-integration)に書いていますが、Zshでコマンド実行前にプロジェクトの`core.hooksPath`をグローバルの方を参照し直すように書き換えるという無理やりな手順がひつようになります。

```sh
# Source: https://github.com/azu/git-hooks
# Override <project>/.githook → <global>/git-hooks/hooks/
function preexec_git_global_hooks() {
  inside_git_repo="$(git rev-parse --is-inside-work-tree 2>/dev/null)"
  if [ "$inside_git_repo" ]; then
      githooksDir=$(git rev-parse --show-toplevel)"/.githooks"
      if [ -d "${githooksDir}" ]; then
        git config --local core.hooksPath "/path/to/global-git-hooks/hooks"
      fi;
  fi
}
autoload -Uz add-zsh-hook
add-zsh-hook preexec preexec_git_global_hooks
```

この方法は`.githooks`というディレクトリ名に依存しているのと余計な処理という感じがあるので、もっとクリーンな方法あるといいなと思います。

このデメリット?は、`core.hooksPath`によるものなのでhuskyも同様です。

## その他

この`core.hooksPath`を使ったプロジェクトのGitフック管理は、基本的にはHuskyと同じやり方なので、ハマりどころなどはHuskyのドキュメントが参考になります。

- [Husky - Git hooks](https://typicode.github.io/husky/#/?id=troubleshoot)

Huskyとの違いとしては、`husky add`のようなコマンドがなかったり、`HUSKY_*`の環境変数がないなどの違いがあります。
（基本的に`lint-staged`を`pre-commit`で実行するぐらいにしかGitフックを使ってないので、あんまり違いを感じるケースがありませんでした）

また、`npm install`はするが`.git`ディレクトリがない環境というのもたまに存在します。
具体的には[Cloudflare Pages](https://pages.cloudflare.com/)や[Heroku](https://heroku.com/)などは、gitリポジトリをcloneはしますが`.git`ディレクトリがない状態なので`git config`コマンドが叩けません。

この場合に、`npm install`時の`prepare` life cycleで`git config`が実行されると次のようにGitリポジトリではないというエラーが出ます。

```
fatal: Not a git repository
```

このようなケースは、`git config`の設定ができないのを、単純に無視することで回避しています。

```diff
  "scripts": {
-    "prepare": "git config --local core.hooksPath .githook"
+    "prepare": "git config --local core.hooksPath .githook || echo 'Can not set git hooks'"
  },
```

## おわりに

Git 2.9以降は[`core.hooksPath`](https://git-scm.com/docs/githooks)オプションでグローバルまたはローカルの[Gitフック](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF)のディレクトリを指定できるので、Huskyなど使わなくてGitフックを管理しやすくなっています。
また、言語ではなくGitの機能なので、別の言語でも同じアプローチが使えて良い気はしています。

最近の自分のプロジェクトでは、この記事で書いたような方法でGit `core.hooksPath` + [lint-staged](https://github.com/okonet/lint-staged)で、Gitフックの処理を動かしています。

サンプルプロジェクト

- [azu/githook-lint-staged-example: Git 2.9+(`core.hooksPath`) + Lint Staged without extra dependencies.](https://github.com/azu/githook-lint-staged-example)