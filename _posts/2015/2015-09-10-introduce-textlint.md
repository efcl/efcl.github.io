---
title: "textlintで日本語の文章をチェックする"
author: azu
layout: post
date : 2015-09-10T10:00
category: JavaScript
tags:
    - textlint
    - AST
    - Lint
    - tools

---

## textlint

[textlint](https://github.com/textlint/textlint "textlint")はMarkdownなどテキスト向けのLintツールで、テキスト版ESLintみたいな感じのツールです。

- [JavaScriptでルールを書けるテキスト/Markdownの校正ツール textlint を作った | Web Scratch](https://efcl.info/2014/12/30/textlint/ "JavaScriptでルールを書けるテキスト/Markdownの校正ツール textlint を作った | Web Scratch")

最近[azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "azu/JavaScript-Plugin-Architecture")という小さな書籍を書いていて、色々簡単に使えるような仕組みを追加しています。

この記事では簡単な[textlint](https://github.com/textlint/textlint "textlint")の導入方法について紹介します。

[![textlint logo](https://textlint.github.io/media/logo/spaced/textlint-logo.png)](http://textlint.github.io/)

公式サイトには一部ルールを含むオンラインデモが公開されています。

- [textlint · The pluggable linting tool for text and markdown](https://textlint.github.io/#demo)

[ドットインストール](https://dotinstall.com/)にてNode.jsのインストール、textlintの利用方法、エディタとの連携などのチュートリアルが公開されています。Node.jsをあまり使ったことがない人は参考にしてみるとよいです。

- [textlint入門 (全11回) - プログラミングならドットインストール](https://dotinstall.com/lessons/basic_textlint)

ブラウザだけで手軽に動作を見たい場合は、Chrome拡張版を試すといいかもしれません。
こちらを使うとNode.jsなどの環境を揃えなくても試せます。

- [文書校正ツール textlint の Chrome 拡張を作った - もなでぃっく](http://io-monad.hatenablog.com/entry/2016/03/14/225800)
- [Chrome ウェブストア - アプリ](https://chrome.google.com/webstore/detail/textlint-proofreader/hdongmdneapmhfblomidbafplpanpdmm?hl=ja&gl=JP)

[textlint-app](https://github.com/textlint/textlint-app "textlint-app")というクロスプラットフォームで動く単独のアプリ版です。
`.textlintrc`を利用し設定するため、設定ファイルについてを理解する必要がありますが、Node.js環境が内蔵されています。
そのため別途Node.jsのインストールをしなくてもアプリ単体でtextlintを含んだ簡易なエディタとして利用できます。

- [textlint-app](https://github.com/textlint/textlint-app "textlint-app")

### インストール

textlintはデフォルトでは一つもルールがありません。
これはpluggable linting toolのためでもありますが、現実的に全ての言語(日本語やロシア語といった言語)で上手く機能するようなルールは少ないと思ってるからでもあります。(逆にtextlintは日本語に特化したツールでもありません)

ルールはJavaScriptで書くことができ、それらのルールはNode.jsのパッケージ管理ツールであるnpmで公開、利用することができます。
(textlintのルールは`textlint-rule-*`という名前で公開をオススメします)

なので、自分が作った幾つかのルールを入れて試してみたいと思います。

npmでグローバルにtextlintと3種類の日本語関係のルールを入れてみます。

```sh
npm i -g textlint
npm i -g textlint-rule-max-ten textlint-rule-spellcheck-tech-word textlint-rule-no-mix-dearu-desumasu
```

Node.jsの`package.json`があるプロジェクトなら`--save-dev`とかでインストールして使うと良いと思います。(できればこちらをオススメします)

インストールすると`$ textlint`というコマンドが使えるようになります。

入れた3つのルールはそれぞれ以下のようなことをチェックしてくれます。

- [textlint-rule-max-ten](https://github.com/azu/textlint-rule-max-ten)
	- 一文に利用できる`、`の数をチェックするルール
- [textlint-rule-spellcheck-tech-word](https://github.com/azu/textlint-rule-spellcheck-tech-word)
	- WEB+DB PRESS用語統一ルールをベースにした[azu/technical-word-rules](https://github.com/azu/technical-word-rules "azu/technical-word-rules")の辞書で単語チェック
- [textlint-rule-no-mix-dearu-desumasu](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu)
	- 「ですます」調と「である」調の混在をチェックするルール


### 文章をルールでLintする

先ほど入れたルールを使ってみましょう。

`--rule <ルール名>`でルールを指定でき、ルール名とはインストール時のパッケージの名前となっています。

`textlint-rule-*`で始まるパッケージ名は省略できるようにしてあるので、具体的には次のようになっています

- `textlint-rule-no-mix-dearu-desumasu` -> `no-mix-dearu-desumasu`
- `textlint-rule-max-ten` -> `max-ten`
- `textlint-rule-spellcheck-tech-word` -> `spellcheck-tech-word`

`README.md`というファイルをこれらのルールでチェックしたい場合は以下のように書くことができます。

```sh
$ textlint --rule no-mix-dearu-desumasu --rule max-ten --rule spellcheck-tech-word README.md
```

![result](https://monosnap.com/file/GWDaE7DNxI7miV2alir12IqsQLcHIz.png)

引数が多いですね… 

textlint [v3.3.0](https://github.com/azu/textlint/releases/tag/v3.3.0 "v3.3.0")で`.textlintrc`という設定ファイルをサポートしていて、上記のコマンドは以下のような設定ファイルにすることができます。

設定ファイルはJSON、YAML、JSモジュール(`module.exports = {}`)で書くことができます。(ファイル名は `.textlintrc` で同じ)

> `.textlintrc`

```json
{
  "rules": {
    "max-ten": {
      "max": 3
    },
    "spellcheck-tech-word": true,
    "no-mix-dearu-desumasu": true
  }
}
```

`rules`にはルールの有効(true)/無効(true) または ルールの設定を書くことができます。

詳しくは[README.md#textlintrc](https://github.com/azu/textlint#textlintrc)を見てみて下さい

textlintを実行すると自動で`.textlintrc`ファイルを探索して読み込まれるので、`--rule`引数を指定しなくてもよくなります。

```sh
$ textlint --rule no-mix-dearu-desumasu --rule max-ten --rule spellcheck-tech-word README.md
# ==
$ textlint README.md
```

実例: [refactor: use `.textlintrc` for textlint by azu · Pull Request #43 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/pull/43 "refactor: use `.textlintrc` for textlint by azu · Pull Request #43 · azu/JavaScript-Plugin-Architecture")

textlintのルールは以下のWikiにまとめてありますが、ルールを作った場合は自由に追加してみてください。

- [Collection of textlint rule · azu/textlint Wiki](https://github.com/azu/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · azu/textlint Wiki")

追記: 

どのルールを使えばいいか分からない！という場合はルールプリセットから始めるとよいでしょう。

- [ルールプリセットを使ってお手軽にtextlint入門 | Web Scratch](https://efcl.info/2015/12/30/textlint-preset/ "ルールプリセットを使ってお手軽にtextlint入門 | Web Scratch")
- [JTF日本語標準スタイルガイドのルールセットで文章をチェックできるtextlintプリセット | Web Scratch](https://efcl.info/2015/10/19/textlint-plugin-JTF-style/)

表記揺れの辞書をプロジェクトに入れたい場合はprhが便利です。

- [textlint + prhで表記ゆれを検出する | Web Scratch](https://efcl.info/2015/09/14/textlint-rule-prh/)
- [Introduction | 技術文書をソフトウェア開発する話](https://azu.gitbooks.io/nodefest-technical-writing/content/ "Introduction | 技術文書をソフトウェア開発する話")

textlintの設定をESLint configのようにnpmで共有することもできます。

- [textlintの設定をnpmにあげて使い回す | Web Scratch](https://efcl.info/2016/04/08/textlint-sharable-config/)

ルールによっては `--fix` で自動修正に対応しています。
導入した時にエラーが多い場合はこの辺の修正を適応するところから始めるといいかもしれません。

- [textlint 6.0リリース。--fixでの自動修正に対応 | Web Scratch](https://efcl.info/2016/03/15/textlint--fix/ "textlint 6.0リリース。--fixでの自動修正に対応 | Web Scratch")

日本語でルールなどについて話せるGitterのチャットルームが以下にあります。

- [![Gitter](https://badges.gitter.im/textlint-ja/textlint-ja.svg)](https://gitter.im/textlint-ja/textlint-ja?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)


## ルールを作る

textlintのルールの作り方は以下のドキュメントに書かれています。

- [textlint/create-rules.md at master · azu/textlint](https://github.com/azu/textlint/blob/master/docs/rule.md "textlint/create-rules.md at master · azu/textlint")

Lintの仕組みは[ESLint](http://eslint.org/ "ESLint")と同じく、Markdown(コード)をパースしてASTにしたものをtraverseしながらそれぞれのルールに渡してチェックする仕組みをtextlintは提供しています。

詳しくはESLintのプラグインアーキテクチャを解説を書いたので読んでみるといいと思います。

- [ESLint | JavaScript Plugin Architecture](http://azu.gitbooks.io/javascript-plugin-architecture/content/ja/ESLint/index.html "ESLint | JavaScript Plugin Architecture")

以下の記事でも簡単に紹介しています。

- [JavaScriptでルールを書けるテキスト/Markdownの校正ツール textlint を作った | Web Scratch](https://efcl.info/2014/12/30/textlint/)
- [textlint 1.4 パーサの安定化、ルールの自由度の改善をして現実的に使えるLintツールへ | Web Scratch](https://efcl.info/2015/01/07/textlint1.4/)

例えば、"しかし"という同じ接頭辞が連続して出てくるのをチェックしたいとします。

	しかし、〜。
	だが、〜。
	しかし、〜。

これをチェックするtextlintのルールは以下のように書けます。

- それぞれのパラグラフの接頭辞を取り出す
- 変数に接頭辞を保存しておく
- 2センテンス以内に同じ接頭辞が使われないかを調べる
- 一致していたら`context.report`でエラー報告をする

```javascript
import ObjectAssign from "object-assign"
const defaultOptions = {
    interval: 2
};
const punctuation = /[。\?]/;
const pointing = /[、,]/;
function splitBySentence(text) {
    return text.split(punctuation);
}
// conjunction
function getFirstPhrase(sentence) {
    var phrases = sentence.split(pointing);
    if (phrases.length > 0) {
        return phrases[0].trim();
    }
}
export default function (context, options = {}) {
    options = ObjectAssign({}, defaultOptions, options);
    let {Syntax,getSource, report,RuleError} = context;
    var previousPhases = [];
    var useDuplicatedPhase = false;
    return {
    	// パラグラフ == <p> と考えればいいはず
        [Syntax.Paragraph](node){
            // パラグラフは1文だけとは限らないので。で分割
            var text = getSource(node);
            var sentences = splitBySentence(text);
            sentences.forEach(sentence => {
                // 先頭の接続詞、 をとりだす。
                var phrase = getFirstPhrase(sentence);
                if (phrase.length === 0) {
                    return;
                }
                // 少し前の文で出てきてないかをチェック
                if (previousPhases.indexOf(phrase) !== -1) {
                    useDuplicatedPhase = true;
                }

                // 使われてたらエラー報告
                if (useDuplicatedPhase) {
                    report(node, new RuleError(`don't repeat "${phrase}" in ${options.interval} phrases`));
                    useDuplicatedPhase = false;
                }
                // add first item
                previousPhases.unshift(phrase);
                previousPhases = previousPhases.slice(0, options.interval);
            });
        }
    }
}
```

このルールは[azu/textlint-rule-no-start-duplicated-conjunction](https://github.com/azu/textlint-rule-no-start-duplicated-conjunction "azu/textlint-rule-no-start-duplicated-conjunction")に置いてあります。

### おわりに

textlintはデフォルトでルールを持ってない代わりに、自分でルールを書きやすいようにしています。

最近だと[RedPen](http://redpen.cc/ "RedPen")もJavaScriptでバリデーションを書けるようになったりしています。(MarkdownだけじゃなくてAsciidocやLaTeXも対応してる)

- [Writing RedPen extension with JavaScript | RedPen BLOG](http://blog.redpen.cc/2015/09/08/writing-extension-with-javascript/ "Writing RedPen extension with JavaScript | RedPen BLOG")

なので、自然言語に詳しい人がもっと[難しい日本語文法などの間違い](http://tsuchinoko.dmmlabs.com/?p=2303)をチェックできるものを書いていったり、思いつきで自分で書いた文章をチェックするものを作ってみると面白くなるんじゃないかなと思います。

複雑なことを考えなければ、正規表現とStringメソッドぐらいで、ある程度のルールを書けたりします。(よく使うパターンは[azu/textlint-rule-helper](https://github.com/azu/textlint-rule-helper "azu/textlint-rule-helper")に追加していきたい)

自然言語をチェックする場合に万人が満足するルールを作るのは難しそうなので、自分用のルールを書いてみて、必要に応じてオプションを増やすのがいいのではないかなーと思います。

最近だとJavaScriptでも日本語をちゃんと扱える形態素解析器である[kuromoji.js](https://github.com/takuyaa/kuromoji.js)、[rakutenma](https://github.com/rakuten-nlp/rakutenma)などがあります。

追記(2016-05-22): textlintの[日本語文法を扱うルール](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule)の多くはkuromoji.jsのラップである[kuromojin](https://github.com/azu/kuromojin "kuromojin")を使っています。(読み込む辞書のキャッシュため)

また、日本語がそのまま扱えるわけじゃないですが[NaturalNode/natural](https://github.com/NaturalNode/natural)や[wooorm/retext](https://github.com/wooorm/retext)など結構手軽に文章などを扱って遊べます。

特に[wooorm](https://github.com/wooorm "wooorm")先生は[ALEX](http://alexjs.com/ "ALEX")というチェックツールを出したり、Markdownパーサである[mdast](https://github.com/wooorm/mdast "mdast")を作ったり、テキスト処理向けの抽象フォーマットである[VFile](https://github.com/wooorm/vfile "VFile")を作ったり精力的にモジュールなどを書いています。

この辺の抽象フォーマットなどの足並みが揃ってくると、文章を扱うツールのエコシステムが回ってきて色々なツールが出てくるようになってくると思います。

例えば、textlintではMarkdownは[azu/markdown-to-ast](https://github.com/azu/markdown-to-ast "azu/markdown-to-ast")でパースして独自に定義したAST(抽象構文木)にした状態で扱います。
しかし、独自のASTだとファイルフォーマット毎に独自のパーサが必要になり、そのASTを扱うツールもそれぞれ必要になってしまうため結構面倒くさいです。

その辺が解決していければ、プログラミング言語を扱うツールのように、文章を扱うツールがもっと作りやすくなったりするんじゃないかなと思います。

文章の正しさは時間で変化する感じがして、その時に正しいと思ったことをすぐにチェックできるようにしたいと思って[textlint](https://github.com/textlint/textlint "textlint")を作ったので、一度遊んでみるといいのかもしれません。
