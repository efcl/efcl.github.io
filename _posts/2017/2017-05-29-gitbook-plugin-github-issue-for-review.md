---
title: "書いた文章をレビューしてGitHubにIssueを切るためのGitBookプラグイン"
author: azu
layout: post
date : 2017-05-29T19:50
category: JavaScript
tags:
    - GitBook
    - GitHub

---


[gitbook-plugin-github-issue-feedback](https://github.com/azu/gitbook-plugin-github-issue-feedback "gitbook-plugin-github-issue-feedback")という[GitBook](https://github.com/GitbookIO/gitbook "GitBook")のプラグインを書きました。

次のGIFを見るとどんなものか分かるかもしれません。


[![gif](https://media.giphy.com/media/3o7btYpgJvLlhkJMfC/giphy.gif)](http://www.giphy.com/gifs/3o7btYpgJvLlhkJMfC)

[gitbook-plugin-github-issue-feedback](https://github.com/azu/gitbook-plugin-github-issue-feedback "gitbook-plugin-github-issue-feedback")はGitBookの右下に`Bug Report`という雑なボタンを追加します。

このボタンを押すと次のようなことをして該当リポジトリのIssue作成ページを開きます。

1. 選択してる範囲の文字列を取得
2. 現在表示してるページの元ソースであるMarkdownを取得
3. 選択してる文字列がMarkdownの何行目にあるかを[position-map-text-to-markdown](https://github.com/azu/position-map-text-to-markdown "position-map-text-to-markdown")で探索
4. 取得した情報を使ってIssueのbodyを埋めた状態でIssueページを開く

次のような感じの情報が入った状態のIssueを作れます。

```
URL : https://github.com/asciidwango/js-primer/blob/master/source/basic/string/README.md

> `/`を使いエスケープする必要があります。
> [:memo:](https://github.com/asciidwango/js-primer/edit/master/source/basic/string/README.md#L36 "Edit") <https://github.com/asciidwango/js-primer/blob/master/source/basic/string/README.md#L36>

```

- [文字列: / （バックスラッシュ） · Issue #243 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/243 "文字列: / （バックスラッシュ） · Issue #243 · asciidwango/js-primer")

後は内容を少し書いてIssueを作るだけです。

Issueには編集ページへのリンクも入るので、作ったIssueからすぐに修正しやすいです。(`#L行数`で指定した行数にカーソルがある状態で編集ページを開ける)

## インストール

GitBookの`book.json`に設定を追加します。

`repo`には GitHubのリポジトリを`/`で入れます。
`https://github.com/asciidwango/js-primer`がリポジトリなら、`repo`には`asciidwango/js-primer`を入れます。

```json
{
    "gitbook": ">=3.0.0",
    "title": "Example",
    "plugins": [
        "github-issue-feedback"
    ],
    "pluginsConfig": {
        "github-issue-feedback": {
            "repo": "azu/gitbook-plugin-github-issue-feedback"
        }
    }
}
```

## おわりに

今、JavaScriptの入門書を書いていて半分ぐらいはできてきたので、ちょっとづつ過去の部分をレビューしながら修正もしています。

- [asciidwango/js-primer: JavaScriptの入門書](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")
- [Introduction · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/ "Introduction · JavaScriptの入門書 #jsprimer") (ウェブ版)

GitHubのPRレビューだとMarkdownのままなので、GitBook上で見たときなどに違和感がある部分が見つかることが多いです。
こういう問題を見つけたらすぐにIssueを切れるようにするのために[gitbook-plugin-github-issue-feedback](https://github.com/azu/gitbook-plugin-github-issue-feedback "gitbook-plugin-github-issue-feedback")を作りました。

[JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本")のときも同じような仕組みを入れてました。
こういう仕組みがあるとスマートフォンからIssueが簡単に切れるので、Issueだけ先に切っておいて後から直すということがしやすいです。

- [Promise本で取り組んだ電子書籍の開発ツール、CI、継続的リリースについて | Web Scratch](http://efcl.info/2015/01/06/ebook-env/ "Promise本で取り組んだ電子書籍の開発ツール、CI、継続的リリースについて | Web Scratch")


[![gif](https://media.giphy.com/media/3o7btYpgJvLlhkJMfC/giphy.gif)](http://www.giphy.com/gifs/3o7btYpgJvLlhkJMfC)

[Introduction · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/ "Introduction · JavaScriptの入門書 #jsprimer")のサイト上に組み込んであるので、是非バグ/typoを探して報告してみてください。（ついでに直してくれるとさらに嬉しいです。一文字のPRも歓迎です）