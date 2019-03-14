# textlint-rule-no-mix-dearu-desumasu [![Build Status](https://travis-ci.org/azu/textlint-rule-no-mix-dearu-desumasu.svg?branch=master)](https://travis-ci.org/azu/textlint-rule-no-mix-dearu-desumasu) [![Gitter](https://badges.gitter.im/textlint-ja/textlint-ja.svg)](https://gitter.im/textlint-ja/textlint-ja?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

敬体(ですます調)と常体(である調)の混在をチェックする[textlint](http://textlint.github.io/ "textlint")ルール。

本文、見出し、箇条書きをそれぞれ独立してチェックし、その中で表記が混在していないかを見つけます。
(本文と見出しの間で表記が混在していても問題ないという意味です)

- 本文(Markdownなら通常の文章部分)
- 見出し(Markdownなら`#`)
- 箇条書き(Markdownなら`* item`や`- item`)

## Installation

    npm install textlint-rule-no-mix-dearu-desumasu

## Usage

Via `.textlintrc`(Recommended)


```json
{
    "rules": {
        "no-mix-dearu-desumasu": true
    }
}
```

Via CLI

```
textlint --rule no-mix-dearu-desumasu README.md
```

## Options

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
             "preferInBody": "ですます",// "である" or "ですます"
             "preferInList": "である",    // "である" or "ですます"
             // 文末以外でも、敬体(ですます調)と常体(である調)を厳しくチェックするかどうか
             "strict": false
         }
    }
}
```

例えば、以下の例だと

- 見出しは自動
- 本文はですます
- 箇条書きはである

かつ `strict`モードでチェックします。

```js
{
    "rules": {
        "no-mix-dearu-desumasu": {
             "preferInHeader": "", // "である" or "ですます"
             "preferInBody": "ですます",// "である" or "ですます"
             "preferInList": "である",    // "である" or "ですます"
             // 文末以外でも、敬体(ですます調)と常体(である調)を厳しくチェックするかどうか
             "strict": true
        }
    }
}
```

- `strict`
    - default: `false`
    - 文末以外でも、敬体(ですます調)と常体(である調)を厳しくチェックするかどうか
    
例えば、`strict:false`(デフォルト)では以下のような **"であったが"** という接続的な"である"は無視されます。
次の例では **"であったが"** は無視されているため、"です"のみが使われているという判定になります。

> OK: 昨日はいい天気であったが、今日は雨です。

`strict:false`では次のような文末が **"である"** や **"です"** といったものだけを検出します。
そのため、次の文章は **"です"** と **"である"** が混在しているのでエラーとなります。

> NG: 今日はいい天気である。明日も晴れです。

`strict:true`としていた場合では、以下の文章は **"ですが"** と **"である"** が混在している場合もエラーとなります。
(**ですが**は接続的、**である**は文末)

> NG: 今日はいい天気ですが、明日は悪天候である。

## Example

詳しくは[example/](example/)を動かして試してみてください。

```
$ textlint --rule no-mix-dearu-desumasu README.md -f pretty-error

no-mix-dearu-desumasu: 本文: "である"調 と "ですます"調 が混在
=> "である" がである調
Total:
である  : 3
ですます: 3

/Users/azu/.ghq/github.com/azu/textlint-rule-no-mix-dearu-desumasu/example/README.md:7:7
                    v
    6. 
    7. 結果として「である」調と「ですます」調の使われる数をだしたものである。
    8. 
                    ^

✖ 1 problem (1 error, 0 warnings)
```

## FAQ

### Q. 箇条書きの際に「である」調が混在することもあるのでは?

A. 本文、見出し、箇条書き をそれぞれ別々にカウントします。

箇条書き(`- リスト`)同士の間で混在している場合はエラーとなりますが、
**本文**と**箇条書き**での混在は問題ありません。

- 本文(Markdownなら通常の文章部分)
- 見出し(Markdownなら`#`)
- 箇条書き(Markdownなら`* item`や`- item`)

それぞれ、別々に扱っているため、これらの間での混在は問題ありません。

### Q. なぜデフォルトでは文末のみの検出なのですか?

A. 自然言語に絶対の表現がないためデフォルトを緩くするためです。

textlintでは多くのルールはfalse positiveにならないように、デフォルトを緩く設定しています。
厳しく(接続的な"である"なども)検出したい場合は、{ "strict": true } オプションが利用できます。

### Q. 2.0(以前)と同じ挙動にするにはどうすればよいですか?

A. オプションに`"strict": true`を追加してください。

2.0

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

3.0

```js
{
    "rules": {
        "no-mix-dearu-desumasu": {
             "preferInHeader": "", // "である" or "ですます"
             "preferInBody": "ですます",// "である" or "ですます"
             "preferInList": "である",    // "である" or "ですます"
             // 文末以外でも、敬体(ですます調)と常体(である調)を厳しくチェックするかどうか
             "strict": true
        }
    }
}
```

関連Issue

- [接続的な "である" を無視するオプション · Issue #5 · azu/analyze-desumasu-dearu](https://github.com/azu/analyze-desumasu-dearu/issues/5)
- [Proposal: デフォルトでは文末の"です/である"のみ検出するように · Issue #13 · azu/textlint-rule-no-mix-dearu-desumasu](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu/issues/13)

### Q. これは誤判定なのでは?

A. 以下のIssueに書き込んで下さい。

- [誤判定してるケースを書き込む場所 · Issue #15 · azu/textlint-rule-no-mix-dearu-desumasu](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu/issues/15 "誤判定してるケースを書き込む場所 · Issue #15 · azu/textlint-rule-no-mix-dearu-desumasu")

## Further Reading

- [JTF日本語標準スタイルガイド](https://www.jtf.jp/jp/style_guide/styleguide_top.html "JTF日本語標準スタイルガイド")
    - 1.1.1 - 1.1.3で同様のルールが扱われています。
    - [azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.](https://github.com/azu/textlint-rule-preset-JTF-style "azu/textlint-rule-preset-JTF-style: JTF日本語標準スタイルガイド for textlint.")も参照してください。

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

敬体(ですます調)、常体(である調)の判定は以下のライブラリを利用しています。

- [azu/analyze-desumasu-dearu: 文の敬体(ですます調)、常体(である調)を解析するJavaScriptライブラリ](https://github.com/azu/analyze-desumasu-dearu "azu/analyze-desumasu-dearu: 文の敬体(ですます調)、常体(である調)を解析するJavaScriptライブラリ")

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

## Acknowledge

Thanks for [RedPen](http://redpen.cc/ "RedPen").
