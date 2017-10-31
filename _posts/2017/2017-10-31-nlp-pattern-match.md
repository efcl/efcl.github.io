---
title: "自然言語にマッチする正規表現を書いて、形態素解析結果でテストして、置換するライブラリを書いた"
author: azu
layout: post
date : 2017-10-31T11:23
category: JavaScript
tags:
    - 自然言語
    - JavaScript
    - library

---

[textlint](https://github.com/textlint/textlint "textlint")のルールを色々書いていて自然言語のマッチの問題がいくつかありました。

[textlint-ja/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.](https://github.com/textlint-ja/textlint-rule-preset-JTF-style "textlint-ja/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.")は基本的に正規表現をベースに実装していました。
正規表現で自然言語に対してマッチするのは簡単でいいのですが、意図しない範囲にマッチすることもあるためfalse-positiveになりやすい問題がありました。

一方、ですます or である調の混在をチェックする[textlint-rule-no-mix-dearu-desumasu](https://github.com/textlint-ja/textlint-rule-no-mix-dearu-desumasu "textlint-rule-no-mix-dearu-desumasu")では、[kuromoji.js](https://github.com/takuyaa/kuromoji.js#api "kuromoji.js")などで形態素解析した結果を使っています。
形態素解析をすることで(正しい日本語なら)より正確にマッチできます。

しかし、形態素解析のトークンに対してマッチする処理やその情報を元に置換するのは結構面倒です。
kuromojiが出力するトークンにマッチするライブラリなどを書いて使っていますが、それでもそこそこ面倒です。

- [azu/morpheme-match: match function that match token(形態素解析) with sentence.](https://github.com/azu/morpheme-match)
- [azu/morpheme-match-all: A wrapper of morpheme-match API. Match all kuromoji's tokens.](https://github.com/azu/morpheme-match-all)

また、[textlint-ja/textlint-rule-ja-no-abusage: よくある日本語の誤用をチェックするtextlintルール](https://github.com/textlint-ja/textlint-rule-ja-no-abusage "textlint-ja/textlint-rule-ja-no-abusage: よくある日本語の誤用をチェックするtextlintルール")などはマッチする範囲もトークンで指定するため、コードとしてもあまり読みやすくありません(単語が分解された大きなJSONを持つ形)

この簡単にマッチできるが誤判定し易い正規表現と正確にマッチできるが面倒臭いトークンベースの中間なライブラリをつくりました。

## [nlp-pattern-match](https://github.com/azu/nlp-pattern-match "azu/nlp-pattern-match: Natural Language pattern matching library for JavaScript.")

[azu/nlp-pattern-match: Natural Language pattern matching library for JavaScript.](https://github.com/azu/nlp-pattern-match "azu/nlp-pattern-match: Natural Language pattern matching library for JavaScript.")というリポジトリはmonorepoなのでいろんなライブラリが入っていますが、大きく分けて二種類のライブラリがあります。

### パーサ

一つは正確にマッチするのに必要な自然言語を分解するパーサ(形態素解析レベル)です。

- [nlcst-parse-english](https://github.com/azu/nlp-pattern-match/tree/master/packages/nlcst-parse-english "nlcst-parse-english")
	- 英語のテキストを単語に分解してPart-of-speech(POS)情報を付加したNLCST
- [nlcst-parse-japanese](https://github.com/azu/nlp-pattern-match/tree/master/packages/nlcst-parse-japanese "nlcst-parse-japanese")
	- 日本語のテキストを形態素解析したNLCST

[NLCST](https://github.com/syntax-tree/nlcst)はNatural Language Concrete Syntax Treeのことで、自然言語のCST(スペースなどの位置情報も扱うASTみたいなもの)フォーマットです。
NLCSTは[retext](https://github.com/wooorm/retext)などが使っている形式で、ParagraphやSentence、WordなどのNodeから構成されます。

たとえば、`"ようこそ、日本へ。"`のようなテキストをNLCSTにすると次のような巨大なNodeになります。(長いの省略)

```js
import {JapaneseParser} from "nlcst-parse-japanese";
const japaneseParse = new JapaneseParser();
const text = "ようこそ、日本へ。";
japaneseParse.ready().then(() => {
    const CST = japaneseParse.parse(text);
    console.log(CST)
});
/*
{
  "type": "RootNode",
  "children": [
    {
      "type": "ParagraphNode",
      "children": [
        {
          "type": "SentenceNode",
          "children": [
            {
              "type": "WordNode",
              "children": [
                {
                  "type": "TextNode",
                  "value": "ようこそ",
                  "position": {
                    "start": {
                      "line": 1,
                      "column": 1,
                      "offset": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 5,
                      "offset": 4
                    }
                  },
                  "data": {
                    "word_id": 34120,
                    "word_type": "KNOWN",
                    "word_position": 1,
                    "surface_form": "ようこそ",
                    "pos": "感動詞",
                    "pos_detail_1": "*",
                    "pos_detail_2": "*",
                    "pos_detail_3": "*",
                    "conjugated_type": "*",
                    "conjugated_form": "*",
                    "basic_form": "ようこそ",
                    "reading": "ヨウコソ",
                    "pronunciation": "ヨーコソ"
                  }
                }
              ],
     ...
}
*/
```

これらのパーサは、あるセンテンスの長さが100文字以下といった単語だけではわからない情報などを扱うのに利用できます。また単語の品詞などの情報もあります。

### Matcher

[nlp-pattern-match](https://github.com/azu/nlp-pattern-match "azu/nlp-pattern-match: Natural Language pattern matching library for JavaScript.")に含んでいるもう一方はマッチングライブラリです。

[nlcst-pattern-match](https://github.com/azu/nlp-pattern-match/tree/master/packages/nlcst-pattern-match "nlcst-pattern-match")というmatcherは先ほどのパース結果のNodeを使った厳密なマッチをするライブラリです。

タグ関数を使って、厳密にマッチしたい部分だけをNodeとして表現できます。 
次の例では英語の`Bob <動詞> it.`にマッチする結果を取得できます。

```js
import { PatternMatcher } from "nlcst-pattern-match";
import { EnglishParser } from "nlcst-parse-english";
const englishParser = new EnglishParser();
const patternMatcher = new PatternMatcher({
    parser: englishParser
});
const pattern = patternMatcher.tag`Bob ${ {
    type: "*",
    data: {
        pos: /^VB/ // verb
    }
} } it.`;
const text = "Bob does it.";
const results = patternMatcher.match(text, pattern);
const [result] = results;
assert.deepEqual(result.position, {
    index: 0,
    end: {
        column: 13,
        line: 1,
        offset: 12
    },
    start: {
        column: 1,
        line: 1,
        offset: 0
    }
});
```

[nlcst-pattern-match](https://github.com/azu/nlp-pattern-match/tree/master/packages/nlcst-pattern-match "nlcst-pattern-match")はより厳密なマッチをDSL的に書けるようにする趣旨のライブラリでしたが、もっと必要に応じて簡単に書けるライブラリとして[match-test-replace](https://github.com/azu/nlp-pattern-match/tree/master/packages/match-test-replace "match-test-replace")があります。

[match-test-replace](https://github.com/azu/nlp-pattern-match/tree/master/packages/match-test-replace "match-test-replace")は名前の通り、とりまえず`match`して、実際にそれが対象なのかを`test`し、最後に`replace`するという三段階のライブラリです。
正規表現で処理を書く場合に何でも一発の正規表現でやると難しくなるので、段階に分けてしまえばもっと簡単に書けるのではというコンセプトのライブラリです。

最小のコードは、ほぼ`String#replace`と同じです。

> Match -> Replace

```js
import { replaceAll, matchTestReplace } from "match-test-replace";
const text = "Hello";
const res = matchTestReplace(text, {
    pattern: /hello/i,
    replace: () => "Hello"
});
assert.ok(res.ok, "should be ok: true");
// 返り値はコマンドオブジェクト
assert.strictEqual(res.results.length, 1, "1 replace");
/**
[ { index: 0, match: 'Hello', replace: 'Hello', message: undefined } ]
*/
```

少し複雑にして`/webkit/i`という文字列を`WebKit`に統一したいという例です。
単純に`/webkit/i`でマッチすると`node-webkit`も含まれてしまうため、`node-`から始まる`webkit`は除外するというルールを`test`に追加しています。


> Match -> Test -> Replace

```js
import { replaceAll, matchTestReplace } from "match-test-replace";
const text = "webkit is matched,but node-webkit is not match";
const res = matchTestReplace(text, {
    pattern: /(\S*?)webkit/g,
    test: ({ captures }) => {
        return captures[0] !== "node-";
    },
    replace: () => "WebKit"
});
assert.ok(res.ok === true, "should be ok: false");
// 返り値はコマンドオブジェクト
assert.strictEqual(res.results.length, 1, "no replace");
// 実際に置換を適応する
assert.strictEqual(replaceAll(text, res.results).output, "WebKit is matched,but node-webkit is not match");
```

先ほどの[nlcst-pattern-match](https://github.com/azu/nlp-pattern-match/tree/master/packages/nlcst-pattern-match "nlcst-pattern-match")を組み合わせると、適当にマッチした文字列の品詞をチェックしてから、それが意図した品詞なら置換するという処理が書けます。

```js
import * as assert from "assert";
import { replaceAll, matchTestReplace } from "match-test-replace";
import { PatternMatcher } from "nlcst-pattern-match";
import { EnglishParser } from "nlcst-parse-english";
const englishParser = new EnglishParser();
const matcher = new PatternMatcher({ parser: englishParser });
// https://developers.google.com/style/clause-order
// NG: Click Delete if you want to delete the entire document.
// OK: To delete the entire document, click Delete.
const text = 'Click Delete if you want to delete the entire document.';
const res = matchTestReplace(text, {
    pattern: /Click (\w+) if you want to (.+)./,
    replace: ({ captures }) => {
        console.log(captures);
        return `To ${captures[1]}, click ${captures[0]}.`
    },
    test: ({ all }) => {
        const pattern = matcher.tag`Click ${ {
            type: "WordNode",
            data: {
                // Verb
                pos: /^VB/
            }
        } }`;
        return matcher.test(all, pattern);
    }
});
assert.ok(res.ok === true, "should be ok: true");
const output = replaceAll(text, res.results).output;
assert.strictEqual(output, "To delete the entire document, click Delete.");
```

[match-test-replace](https://github.com/azu/nlp-pattern-match/tree/master/packages/match-test-replace "match-test-replace")は大雑把に正規表現でマッチして、testで本当に意図したものかをチェックしてから置換するという工程を書くためのものです。

このアプローチだと結構正規表現の気軽さを持ちつつ必要な部分で詳細な指定ができるため便利です。
一方、今わかってる問題として大雑把に一度マッチするため、後からマッチする範囲を狭めることができない(無駄な範囲をReplaceしてしまう)という問題があります。

いい案がある方はIssueとかPRを待ってます。

## ユースケース

今このライブラリなどを使ってGoogleの[Google Developer Documentation Style Guide](https://developers.google.com/style/ "About this guide  |  Google Developer Documentation Style Guide  |  Google Developers")という開発者向けのドキュメントスタイルガイドを[textlint](https://github.com/textlint/textlint "textlint")のルールとして実装しています。

- [textlint-rule/textlint-rule-preset-google: [WIP] Google Developer Documentation Style Guide for textlint.](https://github.com/textlint-rule/textlint-rule-preset-google"textlint-rule/textlint-rule-preset-google: [WIP] Google Developer Documentation Style Guide for textlint.")

[match-test-replace](https://github.com/azu/nlp-pattern-match/tree/master/packages/match-test-replace "match-test-replace")や[en-pos](https://github.com/finnlp/en-pos "en-pos")を中心に使って実装しています。
感触としては30分~1時間ぐらいで1つのルール(1つのページ)を実装できているので、まあまあ効率的に実装できているかなーと思います。

自分が英文法がよく分かってなかったり、係り受け解析ができない問題、そもそも主観的なルールなどもあるのですべてが実装できるわけではないですが、大雑把にマッチして意図して結果へ置換する処理を書けている感じがします。

興味がある人は[textlint-rule/textlint-rule-preset-google](https://github.com/textlint-rule/textlint-rule-preset-google#rules "textlint-rule/textlint-rule-preset-google: [WIP] Google Developer Documentation Style Guide for textlint.")にPull Request待っています。

## おわりに

textlintのルールなどを書くときに使える[nlcst-pattern-match](https://github.com/azu/nlp-pattern-match/tree/master/packages/nlcst-pattern-match "nlcst-pattern-match")というライブラリ群について紹介しました。

文字列処理は色々文脈に依存したり、そもそも自然言語は壊れた文字列がエラーにならないなどの問題があるため難しいです。完璧な方法はないため目的にあった方法を使う必要があります。
たとえば、今回作った[match-test-replace](https://github.com/azu/nlp-pattern-match/tree/master/packages/match-test-replace "match-test-replace")は平面的に文字列マッチするだけなので、文字列を構造として捉えるならば色々不足している感じがします。

これ以外にもセンテンス分解やピリオドの位置チェック、ですます・である調の分析などいろんなライブラリを書いています。

- [Collection of textlint rule · textlint/textlint Wiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule#global "Collection of textlint rule · textlint/textlint Wiki")

textlintをコマンド一発で作り始めることができる`create-textlint-rule`というコマンドもあるので、色々作って見ると面白いかもしれません。

- [textlintのルールを簡単に作り始めることができるツールを作りました | Web Scratch](http://efcl.info/2016/12/14/create-textlint-rule/ "textlintのルールを簡単に作り始めることができるツールを作りました | Web Scratch")