---
title: "jser/jser.github.ioの記事をpull request時にLintする仕組み"
author: azu
layout: post
date : 2015-03-04T21:04
category: JavaScript
tags:
    - JavaScript
    - Markdown
    - TravisCI

---

このブログや[JSer.info](http://jser.info)はJekyllを使って動いているのですが、
どちらも記事を書くときはMarkdownを使って書かれています。

最近になって、Markdownで書いた技術用語の表記などをLintする仕組みを追加して、pull requestした際にLint結果がinvalidなら修正を促す(主に自分に対して)レビューコメントが書き込まれる[HoundCI](https://houndci.com/ "Hound")みたいな仕組みを追加しました。

追記(2016-06-18): 同じ趣旨の別記事を書きました。こちらの方が分かりやすいと思います。

- [Travis CIでtextlintの指摘をPull Requestのレビューコメントとして書き込む - Qiita](http://qiita.com/azu/items/c2305f3dded3fda968e0 "Travis CIでtextlintの指摘をPull Requestのレビューコメントとして書き込む - Qiita")

## 記事のLint

MarkdownなのでLintingには[textlint](https://github.com/azu/textlint "textlint")を使いました。

また、[JSer.info](http://jser.info/ "JSer.info")は記事の書式が[特殊](https://github.com/jser/jser.info/issues/27 "ブログ記事のセマンティックを考える · Issue #27 · jser/jser.info")なので、それ用のtextlintルールを書いて使っています。

といっても基本的には[azu/spellcheck-tech-word-textlint-rule](https://github.com/azu/spellcheck-tech-word-textlint-rule "azu/spellcheck-tech-word-textlint-rule")をベースにして無視するルールを追加した[spellcheck-post.js](https://github.com/jser/jser.github.io/blob/master/test/rules/spellcheck-post.js "spellcheck-post.js")を作って使っています。

```js
// LICENSE : MIT
"use strict";
var RuleHelper = require("textlint-rule-helper").RuleHelper;
var spellCheck = require("spellcheck-technical-word").spellCheckText;
var ContributingLink = '[Contributing Guide](https://github.com/jser/jser.github.io/blob/master/CONTRIBUTING.md)';
/**
 * @param {RuleContext} context
 */
module.exports = function (context) {
    var helper = new RuleHelper(context);
    var exports = {};
    var Syntax = context.Syntax;
    // HTMLの中身は無視する
    var isCurrentHTMLBlock = false;
    exports[context.Syntax.Html] = function (node) {
        isCurrentHTMLBlock = true;
    };
    // ---- <h1 class="site-genre">ヘッドライン</h1> きたらリセット
    exports[context.Syntax.HorizontalRule] = function (node) {
        isCurrentHTMLBlock = false;
    };
    // 次のParagraphがきたらHTMLブロックは終わった事にする
    exports[context.Syntax.Paragraph] = function (node) {
        isCurrentHTMLBlock = false;
    };
    exports[context.Syntax.Str] = function (node) {
        if (isCurrentHTMLBlock) {
            return;
        }
        // Headerは自動でサイトのタイトルを使うので無視する
        if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Header])) {
            return;
        }
        var text = context.getSource(node);
        var results = spellCheck(text);
        results.forEach(function (/*SpellCheckResult*/result) {
            // line, column
            context.report(node, new context.RuleError(result.actual + " => " + result.expected + "\n" + ContributingLink, {
                line: result.paddingLine,
                column: result.paddingColumn
            }));
        });
    };
    return exports;
};
```

- [azu/technical-word-rules](https://github.com/azu/technical-word-rules "azu/technical-word-rules") 辞書本体
- [azu/spellcheck-technical-word](https://github.com/azu/spellcheck-technical-word/ "azu/spellcheck-technical-word") 上記の辞書を使ってチェックする関数


```
"scripts": {
  "postinstall": "bower-installer",
  "lint:spell": "textlint --rulesdir test/rules -f pretty-error"
},
```

という感じでnpm run-scriptを定義してあるので、

```
$ npm run lint:spell -- path/to/file.md
```

とすることで記事をLintすることができるようになりました。


## Lint結果をコメント

これで記事のLint自体はでるようになりましたが、単純にTravis CIでテストしてパスするかだと何が間違ってるかをTravis CIに見に行く必要があります。

[jser/jser.info](https://github.com/jser/jser.info/ "jser/jser.info")の記事の元データの方はほぼ自分しか更新しないので、Travis CIで辞書Lintがパスするかどうかのテストしてますが、記事のMarkdownファイルがある[jser.github.io](https://github.com/jser/jser.github.io "jser.github.io")は自分以外もpull requestで更新がきたりするので、テストでパスするかどうかだとちょっと不親切です。

- [JSer.info 200 回目記念イベント](https://azu.github.io//slide/jser200/ "JSer.info 200 回目記念イベント") (記事の元データうんぬんはこちら参照)

というのも、使ってる辞書のLintはそこまで正確ではないので、Warning的な扱いがちょうどいいと思ってます(最悪無視してもいいし、辞書の方を直したほうがいい時も多い)

なので、[jser.github.io](https://github.com/jser/jser.github.io "jser.github.io")の方はLintした結果をレビューコメントとして書き込むようになってます。

![レビューコメントのイメージ](https://efcl.info/wp-content/uploads/2015/03/05-1425550592.png)

pull request時にしかこのLintは動かないので、最近記事を書くときはWIPでpull requestしながら記事を書いています。

[[WIP] 2015-03-09のJS by azu · Pull Request #52 · jser/jser.github.io](https://github.com/jser/jser.github.io/pull/52 "[WIP] 2015-03-09のJS by azu · Pull Request #52 · jser/jser.github.io") みたいな感じなので、途中でヘッドラインのオススメとかあればコメントくれれば反映されるかもしれません。

## TraviCI -> Lint -> レビューコメント

これは[packsaddle/ruby-saddler](https://github.com/packsaddle/ruby-saddler "packsaddle/ruby-saddler")を使ってやっています。

Saddlerはcheckstyle形式のLint結果を渡すと、Travis CIやCircle CIからレビューコメントとして書き込んでくれるコマンドラインツールです。

基本的には以下でやっている書かれていることをやっているだけです。

- [変更したファイルにrubocopやjscsを実行して pull requestに自動でコメントする – Saddler - checkstyle to anywhere](http://packsaddle.org/articles/saddler-overview/ "変更したファイルにrubocopやjscsを実行して pull requestに自動でコメントする – Saddler - checkstyle to anywhere")

TravisCIからPull Request時にコメントするためにGitHubのtokenを取得して、travis.ymlに追加します。

```
travis encrypt -r jser/jser.github.io GITHUB_ACCESS_TOKEN=b95xasdasx3bxsadsdadsaxx --add
```

[travis-spellcheck.sh](https://github.com/jser/jser.github.io/blob/master/test/travis-spellcheck.sh "travis-spellcheck.sh")という感じのスクリプトを作って、textlintは`$(npm bin)/textlint --rulesdir test/rules -f checkstyle` という感じでcheckstyle形式でも出力できるので、それをSaddlerに渡す感じです。

そのままだとファイル全体のLintの結果が含まれるので、実際にコミットの差分だけに絞りたい場合は[packsaddle/ruby-checkstyle_filter-git](https://github.com/packsaddle/ruby-checkstyle_filter-git "packsaddle/ruby-checkstyle_filter-git")をパイプするとできます。

----
## 使ったツール

- [azu/textlint](https://github.com/azu/textlint)
- [packsaddle/ruby-saddler](https://github.com/packsaddle/ruby-saddler)
- [packsaddle/ruby-checkstyle_filter-git](https://github.com/packsaddle/ruby-checkstyle_filter-git)
