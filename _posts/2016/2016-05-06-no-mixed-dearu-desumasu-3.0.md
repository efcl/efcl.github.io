---
title: "敬体(ですます調)と常体(である調)の表記を統一するtextlintルール"
author: azu
layout: post
date : 2016-05-06T15:21
category: textlint
tags:
    - JavaScript
    - textlint
    - 形態素解析

---


[textlint](http://textlint.github.io/ "textlint")向けのルールとして敬体(ですます調)と常体(である調)を一つの文書内でどちらを使うか統一する[textlint-rule-no-mix-dearu-desumasu](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu "textlint-rule-no-mix-dearu-desumasu")というルールを書きました。

初期からあったのですが、[kuromoji.js](https://github.com/takuyaa/kuromoji.js "kuromoji.js")で[形態素解析した結果](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu/releases/tag/2.0.0)をベースとしたり、明示的にどちらを[優先するかのオプション](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu/releases/tag/2.2.0)を追加したので改めて紹介します。

## インストール

    npm install textlint-rule-no-mix-dearu-desumasu

## 使い方

`.textlintrc`(Recommended)に設定するのを推奨しています。
後述するオプション設定もできるのでこちらの方が便利です。


```json
{
    "rules": {
        "no-mix-dearu-desumasu": true
    }
}
```

CLIの`--rule`オプションだとデフォルト設定のみになります。

```
textlint --rule no-mix-dearu-desumasu README.md
```

## オプション

このルールでは、本文、見出し、箇条書きをそれぞれ独立してチェックし、その項目内で表記が混在していないかを見つけます。
なので、本文と見出しの間で表記が混在するのは問題ありません。

- 本文(Markdownなら通常の文章部分)
- 見出し(Markdownなら`#`)
- 箇条書き(Markdownなら`* item`や`- item`)


それぞれの項目ごとに優先する表記をオプションで設定できます。

- 本文(Body)
- 見出し(Header)
- 箇条書き(List)

デフォルトは ""(空)で、多く使われている表記を自動的に優先します。
優先したい表記を "である" または "ですます" で指定します。

```js
{
    "rules": {
        "no-mix-dearu-desumasu": {
             "preferInHeader": "", // "である" or "ですます"
             "preferInBody": "",   // "である" or "ですます"
             "preferInList": ""    // "である" or "ですます"
        }
    }
}
```

例えば、以下の例だと

- 見出しは"自動"(多く使われてる表記に統一を促す
- 本文は"ですます"
- 箇条書きは"である"

というルールでチェックします。

```js
{
    "rules": {
        "no-mix-dearu-desumasu": {
             "preferInHeader": "", // "である" or "ですます"
             "preferInBody": "ですます",// "である" or "ですます"
             "preferInList": "である"    // "である" or "ですます"
        }
    }
}
```

これは、本文と箇条書きで表記が異なるのは一般的によくあることなので、それぞれの項目ごとに設定できるようになっています。

## リファクタリング例

このルールを使ってリファクタリングしてみた例です。

- [refactor(textlint): 敬体(ですます調)と常体(である調)の使い分けを厳密に by azu · Pull Request #94 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/pull/94 "refactor(textlint): 敬体(ですます調)と常体(である調)の使い分けを厳密に by azu · Pull Request #94 · azu/JavaScript-Plugin-Architecture") 

```diff
-先ほどのgulpタスクの例では、既にモジュール化された処理を`pipe`で繋げただけであるため、
+先ほどのgulpタスクの例では、既にモジュール化された処理を`pipe`で繋げただけで、
 それぞれの処理がどのように実装されているかはよく分かりませんでした。
```

```diff
-BufferはStringと相互変換が可能であるため、多くのgulpプラグインと呼ばれるものは、`gulpPrefixer`と`prefixBuffer`にあたる部分だけを実装しています。
+BufferはStringと相互変換が可能なので、多くのgulpプラグインと呼ばれるものは、`gulpPrefixer`と`prefixBuffer`にあたる部分だけを実装しています。
```

```diff
-gulpではプラグインが持つ機能は1つ(単機能)であること推奨しています。
+gulpではプラグインが持つ機能は1つ(単機能)とすることを推奨しています。
```

```diff
-`jQuery.fn`の実装を見てみると、実態は`jQuery.prototype`であるため実際にprototype拡張していることがわかります。
+`jQuery.fn`の実装を見てみると、実態は`jQuery.prototype`なので、prototype拡張していることがわかります。
```

```diff
-単純なprototype拡張であると言えるので、利点はJavaScriptのprototypeと同様です。
+単純なprototype拡張なので、利点はJavaScriptのprototypeと同様です。
```

```diff
-まだNode.jsで使われているCommonJSやES6 Modulesといったものがなかった時代に作られた仕組みであるため、
+まだNode.jsで使われているCommonJSやES6 Modulesなどがなかった時代に作られた仕組みなので、
```

他にいい代替表現など書き方の指摘を募集しています。

- [Docs: リファクタリング例を募集 · Issue #11 · azu/textlint-rule-no-mix-dearu-desumasu](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu/issues/11 "Docs: リファクタリング例を募集 · Issue #11 · azu/textlint-rule-no-mix-dearu-desumasu")

また、テキストから解析する部分を別途ライブラリとして切り出しているので、これはそもそも"である調"なのか?という問題などがありましたらIssueを立ててください。

イマイチ明確な基準がわかっていないため、false positiveにならないように限定しています。

- [azu/analyze-desumasu-dearu: 文の敬体(ですます調)、常体(である調)を解析するJavaScriptライブラリ](https://github.com/azu/analyze-desumasu-dearu "azu/analyze-desumasu-dearu: 文の敬体(ですます調)、常体(である調)を解析するJavaScriptライブラリ")

(本当は[textlint-rule-no-mix*ed*-dearu-desumasu](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu/issues/4 "textlint-rule-no-mix*ed*-dearu-desumasu")の方がESLint的なルール名として正しい…)