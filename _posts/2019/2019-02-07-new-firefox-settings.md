---
title: "Firefoxの拡張機能の移行(Firefox 57 Quantum以降)と作ったアプリ"
author: azu
layout: post
date : 2019-02-07T09:52
category: Firefox
tags:
    - Firefox
    - JavaScript
    - Electron

---

この記事は、Firefox 57以降へ移行する際のアドオン(拡張機能)周りについて書いていたメモ書きです。
Firefox 57では、拡張機能の仕組みとしてXULが廃止(拡張機能としては使えなくなり)され、[WebExtensions](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions)ベースのものへと刷新されました。

- [Firefox 57 (Quantum) for developers - Mozilla | MDN](https://developer.mozilla.org/ja/docs/Mozilla/Firefox/Releases/57)

Firefox 56以下で動いていたアドオンの大部分は互換性がないため、Firefox 57+では新しい拡張機能への移行する必要がありました。

この記事では、拡張からアプリへ移行したり、同じような機能をもった拡張機能へ移行したりといった設定について書いています。

## 現在環境(2018年1月ぐらい)

- (一時的に)Firefox 56の時のプロファイルをFirefox ESRで動作中
- Firefox ESRがデフォルトブラウザの状態
- Firefox ESRとFirefoxは同時に起動できない(Developer Editionみたいに分かれてない)

## Firefox 57+への移行する

### 新しいプロファイルの作成

Firefox 57+向けに新しいプロファイルを作成し、その環境へ新規で環境を作っていく。
(既存の引き継ぐと壊れたりするので新しいプロファイルを作成する)

Firefox 57+を新しいプロファイルで起動する。
(`-no-remote`を付けてESRと同時に起動して確認しながら進める)

`-P` で起動するとプロファイル画面がでるので、新しいプロファイルを作成して起動する。

```
$ /Applications/Firefox.app/Contents/MacOS/firefox-bin -P -no-remote
```

- [プロファイルマネージャーを使用して、Firefox のプロファイルを作成または削除する | Firefox ヘルプ](https://support.mozilla.org/ja/kb/profile-manager-create-and-remove-firefox-profiles "プロファイルマネージャーを使用して、Firefox のプロファイルを作成または削除する | Firefox ヘルプ")
- [複数バージョンの併用 | 技術的なよくある質問 | 法人向け情報 | Mozilla Japan コミュニティポータル](https://www.mozilla.jp/business/faq/tech/multiple-versions/ "複数バージョンの併用 | 技術的なよくある質問 | 法人向け情報 | Mozilla Japan コミュニティポータル")

### アカウントでログイン

- Firefox アカウントでログインして"拡張機能"以外を同期する
- デフォルトで"拡張機能"の同期は外れていた

## 拡張の対応


- [Another Restart](https://bitbucket.org/grbradt/another-restart "Another Restart")
  - => なし
  - => アドオンのために再起動することが多かったけど、WebExtensionsでは再起動が不要なのでまあ許容
  - Firefoxをショートカットから再起動する拡張機能は全滅してる
  - `~/プロファイル/chrome/userChrome.js` で直接再起動スクリプトを置くのは一応動きます。
  - [Firefox 57 以降で以前のように再起動をする　のこと - スマフォ版 ウィンドウズをカスタマイズしたりゲームコントローラーを改造したまとめ](https://uwagakisimasuka.blog.fc2.com/blog-entry-6930.html?sp)
- [Make Link](https://addons.mozilla.org/ja/firefox/addon/make-link/ "Make Link")
  - => [Format Link](https://addons.mozilla.org/ja/firefox/addon/format-link3/ "Format Link")
  - => [URL をクリップボードにコピー – Firefox 向けアドオン](https://addons.mozilla.org/ja/firefox/addon/url2clipboard/?src=userprofile "URL をクリップボードにコピー – Firefox 向けアドオン")
  - リンクコピーのコンテキストメニュー
  - ショートカットからもしたい
- [FireGestures](https://addons.mozilla.org/ja/firefox/addon/firegestures/ "FireGestures")
  - => [Foxy Gestures](https://addons.mozilla.org/ja/firefox/addon/foxy-gestures/ "Foxy Gestures")
  - マウスジェスチャー
- [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/ "Greasemonkey")
  - => [Violentmonkey](https://addons.mozilla.org/ja/firefox/addon/violentmonkey/)
  - 後述
- [Hatena Bookmark](https://addons.mozilla.org/ja/firefox/addon/hatena-bookmark/ "Hatena Bookmark")
  - => [Hatena Bookmark](https://addons.mozilla.org/ja/firefox/addon/hatena-bookmark/ "Hatena Bookmark")
  - コメントビューアが欲しいので作る
  - ショートカットが変更できない
  - => [reppets/hatebu-counter: Userscript to display Hatena bookmark count and comments.](https://github.com/reppets/hatebu-counter)をfork
  - => [azu/hatebu-counter: Userscript to display Hatena bookmark count and comments.](https://github.com/azu/hatebu-counter) Cmd+Shift+Cでコメントを開けるようにした
  - 拡張機能でやるほうが良さそう
  - [syon/gaiyas: 外野たち ― はてなブックマークのコメントを表示](https://github.com/syon/gaiyas)をfork
  - => [azu/gaiyas: 外野たち ― はてなブックマークのコメントを表示](https://github.com/azu/gaiyas)
- 外部プロセスの起動
  - 今のURLやタイトルを引数に外部プロセスを起動する
  - Native messagingみたいな仕組みが必要
  - [Firefoxで外部アプリケーションを起動するだけのアドオンをGo言語で作る方法と注意点 - ククログ(2017-09-01)](http://www.clear-code.com/blog/2017/9/1.html)
  - <https://developer.mozilla.org/ja/Add-ons/WebExtensions/Native_messaging>
  - <https://addons.mozilla.org/ja/firefox/addon/external-application/>
  - テキストエリアからエディタの起動をしたい(JSer.infoの更新フロー)
  - => [withExEditor](https://github.com/asamuzaK/withExEditor)でtextareaからエディタを立ち上げできる
- Keysnail
  - => ない
  - [brookhong/Surfingkeys: Map your keys for web surfing, expand your browser with javascript and keyboard.](https://github.com/brookhong/Surfingkeys "brookhong/Surfingkeys: Map your keys for web surfing, expand your browser with javascript and keyboard.")でキーボード周りをContentの権限で処理できる
  - グローバルなキーボードショートカットはないので、Firefox自体のショートカット変更は[Karabiner](https://pqrs.org/osx/karabiner/)を使う

## [Karabiner](https://pqrs.org/osx/karabiner/)

[Karabiner](https://pqrs.org/osx/karabiner/)で次のような感じのルールを`rules`に追加してる。(Firefox向け部分のみ抜粋)

- Cmd + Shift + J: 次のタブ
- Cmd + Shift +K: 前のタブ
- Cmd + n: タブを閉じる(ホントはタブを閉じて次のタブへのショートカット)
- Cmd + Shift + c: これはgaiyasのショートカットがシステムとかぶって潰れたので無理やりみたいな感じのやつだった気がする

```json
{
    "description": "Firefox shortcuts",
    "manipulators": [
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^org\\.mozilla\\.firefox$",
                        "^com\\.google\\.Chrome$",
                        "^com\\.apple\\.Safari$"
                    ],
                    "type": "frontmost_application_if"
                }
            ],
            "from": {
                "key_code": "j",
                "modifiers": {
                    "mandatory": [
                        "left_command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "backslash",
                    "modifiers": [
                        "left_command",
                        "shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^org\\.mozilla\\.firefox$",
                        "^com\\.google\\.Chrome$",
                        "^com\\.apple\\.Safari$"
                    ],
                    "type": "frontmost_application_if"
                }
            ],
            "from": {
                "key_code": "k",
                "modifiers": {
                    "mandatory": [
                        "left_command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "close_bracket",
                    "modifiers": [
                        "left_command",
                        "shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^org\\.mozilla\\.firefox$"
                    ],
                    "type": "frontmost_application_if"
                }
            ],
            "from": {
                "key_code": "n",
                "modifiers": {
                    "mandatory": [
                        "left_command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "w",
                    "modifiers": [
                        "left_command"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^org\\.mozilla\\.firefox$"
                    ],
                    "type": "frontmost_application_if"
                }
            ],
            "from": {
                "key_code": "c",
                "modifiers": {
                    "mandatory": [
                        "left_shift",
                        "left_command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "c",
                    "modifiers": [
                        "left_shift",
                        "left_option"
                    ]
                }
            ],
            "type": "basic"
        }
    ]
}
```


- [OctoLinker](https://addons.mozilla.org/ja/firefox/addon/octolinker/ "OctoLinker")
  - => そのまま
  - GitHubのリンク拡張
- [Stylish](https://addons.mozilla.org/ja/firefox/addon/stylish/ "Stylish")
  - => [Stylus](https://addons.mozilla.org/ja/firefox/addon/styl-us/ "Stylus (Beta)")
  - Stylishからの移行方法が用意されている
  - [FAQs page for Stylus :: add0n.com](https://add0n.com/stylus.html#faq5 "FAQs page for Stylus :: add0n.com")
  - [Stylus is a Stylish fork without analytics - gHacks Tech News](https://www.ghacks.net/2017/05/16/stylus-is-a-stylish-fork-without-analytics/)
  - Stylishはバックドアが怖い
- [uc](https://github.com/satyr/uc "uc")
  - => ない
- [ツリー型タブ (Tree Style Tab) ](https://addons.mozilla.org/ja/firefox/addon/tree-style-tab/)
  - => そのまま
- [Session Manager](https://addons.mozilla.org/ja/firefox/addon/session-manager/ "Session Manager")
  - =>[Tab Session Manager](https://addons.mozilla.org/ja/firefox/addon/tab-session-manager/ "Tab Session Manager")
  - ツリー型タブ対応
- [マルチプルタブハンドラ (Multiple Tab Handler)](https://addons.mozilla.org/ja/firefox/addon/multiple-tab-handler/ "マルチプルタブハンドラ (Multiple Tab Handler)")
  - => ツリー型タブと一緒にうごく


### [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/ "Greasemonkey")

[Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/ "Greasemonkey") 4ではAPIの互換性がないため、大半のスクリプトがそのままでは動かない。

- [Greasespot: Greasemonkey 4 For Users](https://www.greasespot.net/2017/09/greasemonkey-4-for-users.html)
- [[ JRF のひとこと ] Firefox 57 Quantum と Greasemonkey 4.0 の後...](http://jrf.cocolog-nifty.com/statuses/2017/11/firef.html "[ JRF のひとこと ] Firefox 57 Quantum と Greasemonkey 4.0 の後...")

互換実装としては2つあり、Tampermonkeyはライセンスが不明なのでViolentmonkeyを選択

- [Tampermonkey – Firefox 向けアドオン](https://addons.mozilla.org/ja/firefox/addon/tampermonkey/)
- [Violentmonkey – Firefox 向けアドオン](https://addons.mozilla.org/ja/firefox/addon/violentmonkey/)

#### Greasemonkey to Violentmonkey

TampermonkeyとViolentmonkeyどちらもzipインポートをサポートしてる。
これを利用して既存の`user.js`をコピーして、まとめたzipを作成してimportする。

- [How to Transfer All Greasemonkey userscripts to Tampermonkey on Firefox 57+ - Stack Overflow](https://stackoverflow.com/questions/47317983/how-to-transfer-all-greasemonkey-userscripts-to-tampermonkey-on-firefox-57 "How to Transfer All Greasemonkey userscripts to Tampermonkey on Firefox 57+ - Stack Overflow")

## UserChrome.js

無理やりFirefox 57+でも動かせる(結局使ってない)

- [nuchi/firefox-quantum-userchromejs: Firefox Quantum-compatible custom javascript in browser context — no extension, userChromeJS replacement](https://github.com/nuchi/firefox-quantum-userchromejs)
- [userChrome.js用スクリプト - wiki@nothing](http://wiki.nothing.sh/page/userChrome.js%CD%D1%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8#wd355e7f)

の2つを合わせると、インストールフォルダをいじらずにプロファイルフォルダだけの追加でUserChrome.jsを動かせる。

### UserChrome Loaderのセットアップ

```
profileDir="~/Library/Application Support/Firefox/Profiles/プロファイル名"
chromeDir="${profileDir}/chrome"
mkdir "${chromeDir}"

# userChrome.xmlを読み込むuserChrome.css
curl https://raw.githubusercontent.com/nuchi/firefox-quantum-userchromejs/master/userChrome.css > "${chromeDir}/userChrome.css"
# userChrome.jsを読み込むuserChrome.xml -moz-bind
curl https://raw.githubusercontent.com/nuchi/firefox-quantum-userchromejs/master/userChrome.xml > "${chromeDir}/userChrome.xml"
# http://wiki.nothing.sh/page/userChrome.js%CD%D1%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8#wd355e7f
# Loader
curl https://raw.githubusercontent.com/Endor8/userChrome.js/master/userChrome/Dateien/userChromeJS.js > "${chromeDir}/userChrome.js"
## どこにある*.us.jsを読み込むかを追加
echo 'userChrome.import("*", "UChrm");' >> "${chromeDir}/userChrome.js"
```

### UserChromeスクリプト

UserChromeのスクリプトも同じく `${chromeDir}/` に配置していくと`userChrome.js`が `*` にマッチするファイルを読み込んでくれる。

```
profileDir="~/Library/Application Support/Firefox/Profiles/プロファイル名"
chromeDir="${profileDir}/chrome"
mkdir "${chromeDir}"

# 再起動ボタンの追加
curl https://raw.githubusercontent.com/alice0775/userChrome.js/master/addRestartButton.uc.js > "${chromeDir}/addRestartButton.uc.js"
# http://d.hatena.ne.jp/Griever/20091119/1258643086
curl https://gist.githubusercontent.com/Griever/238742/raw/8f54f0b916e9e43112a78f41ee52eabfa5ae63f6/KeyChanger.uc.js > "$chromeDir/KeyChanger.uc.js"
```

**参考**

- [Firefox Quantum (Firefox 57)への移行 について、いろいろ: K.H.WEBLOG](http://kato-h.cocolog-nifty.com/khweblog/2017/11/firefox-quantum.html)
- [Run userchrome.js scripts in Firefox 57 or newer - gHacks Tech News](https://www.ghacks.net/2017/11/24/run-userchrome-js-scripts-in-firefox-57-or-newer/)
- [nuchi/firefox-quantum-userchromejs: Firefox Quantum-compatible custom javascript in browser context — no extension, userChromeJS replacement](https://github.com/nuchi/firefox-quantum-userchromejs)
- [userChrome.js用スクリプト - wiki@nothing](http://wiki.nothing.sh/page/userChrome.js%CD%D1%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8#wd355e7f)


## [keysnail](https://github.com/mooz/keysnail "keysnail")

同等のことができるAPIは存在しない(Chromeができないのと同じ理由)

### JKスクロール `Scrollet`

JとKでページスクロールする

- [brookhong/Surfingkeys: Map your keys for web surfing, expand your browser with javascript and keyboard.](https://github.com/brookhong/Surfingkeys "brookhong/Surfingkeys: Map your keys for web surfing, expand your browser with javascript and keyboard.")
- [mikecrittenden/shortkeys: A browser extension for custom keyboard shortcuts](https://github.com/mikecrittenden/shortkeys)

ショートカット基盤が欲しい。Chrome権限レベルのAPIがない

[Surfingkeys](https://github.com/brookhong/Surfingkeys)を使い、次のような設定をして JKスクロールをしている。(全部の設定が混ざってる)

```
settings.smoothScroll = false;
settings.scrollStepSize = 100;
settings.blacklistPattern = /^(https?:\/\/irodr\.netlify\.com|https?:\/\/localhost:13245)/
// copy(Array.from(new Array(40)).map((e,i) => String.charCodeAt("a") + i).map(code => String.fromCharCode(code)).map(key => `unmap("${key}");`).join("\n"))
unmap("a");
unmap("b");
unmap("c");
unmap("d");
unmap("e");
unmap("f");
unmap("g");
unmap("h");
unmap("i");
// unmap("j");
// unmap("k");
unmap("l");
unmap("m");
unmap("n");
unmap("o");
unmap("p");
unmap("q");
unmap("r");
unmap("s");
unmap("t");
unmap("u");
unmap("v");
unmap("w");
unmap("x");
unmap("y");
unmap("z");
unmap("{");
unmap("|");
unmap("}");
unmap("~");
unmap("/");
mapkey('<Meta-e>', 'Open postem', function() {
    location.href = `postem://?url=${encodeURIComponent(window.top.location.href)}&title=${encodeURIComponent(window.top.document.title)}`
});
mapkey('<Meta-Shift-Enter>', 'Open post-tweet', function() {
	const selectedText = window.getSelection().toString();
    location.href = `post-tweet://?url=${encodeURIComponent(window.top.location.href)}&title=${encodeURIComponent(window.top.document.title)}&quote=${encodeURIComponent(selectedText)}`
});
// cmd+n = cmd+w
map('<Meta-n>', '<Meta-w>');
// Space Scroll
map('<Space>', 'j');
map('<Shift-Space>', 'k');
// set theme
settings.theme = `
.sk_theme {
    background: #000;
    color: #fff;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d9dce0;
}
.sk_theme .url {
    color: #2173c5;
}
.sk_theme .annotation {
    color: #38f;
}
.sk_theme .omnibar_highlight {
    color: #fbd60a;
}
.sk_theme ul>li:nth-child(odd) {
    background: #1e211d;
}
.sk_theme ul>li.focused {
    background: #4ec10d;
}`;
// click `Save` button to make above settings to take effect.1
```

### はてなブックマーク検索 `Hatebnail`

Keysnailでは[Hatebnail](https://github.com/mooz/keysnail/wiki/plugin)というローカルに持ったはてなブックマークのDBを検索するものを使っていた。
しかし、Keysnailが動かなくなったため、はてなブックマークのインクリメンタル検索をするFirefoxの拡張がなくなった。

[Alfred上で自分のはてなブックマークを検索できるWorkflow | Web Scratch](http://efcl.info/2017/10/20/alfred-hatenabookmark/ "Alfred上で自分のはてなブックマークを検索できるWorkflow | Web Scratch")も書いたけど、速さが足りな買った(プロセスの仕組み的にメモリに乗せられない)

拡張機能だと[Online Bookmark Incremental Search for Firefox](https://addons.mozilla.org/ja/firefox/addon/online-bookmark-inc-search/ "Online Bookmark Incremental Search for Firefox")も良さそう。

- [Online Bookmark Incremental Search for Firefox を公開しました。 - Enjoy*Study](http://blog.enjoyxstudy.com/entry/2017/12/24/000000)
- [Online Bookmark Incremental Search for Firefox](https://addons.mozilla.org/ja/firefox/addon/online-bookmark-inc-search/ "Online Bookmark Incremental Search for Firefox")

最終的に[はてなブックマーク検索PWA](https://hatebupwa.netlify.com/)を書いて使っている。
Electronアプリでラップしてアプリとして利用。モバイルでも動作するので満足。

- [モバイル/オフラインでも動作するはてなブックマーク検索のPWAを作った | Web Scratch](https://efcl.info/2018/04/16/hatebupwa/)

### 外部プロセス起動

ブラウザの拡張に依存するのはキケンであるため、URLとタイトルを渡してアプリを起動するのに使う。
[Tombfix](https://github.com/tombfix/core)はFirefox 57+では動かないので、自分でクロスポストクライアントとして[postem](https://github.com/azu/postem "postem")というElectronアプリを書いて利用していている。

現時点(2019-02-07)ではブラウザとアプリを中継するAPIがFirefoxにはない。

- [ ] 汎用的な仕組みを持った拡張機能はまだない

**URL scheme**

macなどシステム側のprotocolにアプリを登録すれば、ブラウザから任意のアプリに情報を渡せるようになる。
以下のアプリはこの仕組みを使って、ブラウザからアプリを起動して使えるようにした。

- [Postem](https://github.com/azu/postem)
- [post-tweet](https://github.com/azu/post-tweet)

[postem](https://github.com/azu/postem "postem")は自分で書いているのでアプリ側でcustom protocolsに対応することで対応できる
`postem://post?title=<title>&url=<url>` のようなURLに対応する。
FirefoxからカスタムプロトコルのURLを開くだけで起動できる。

- [postem](https://github.com/azu/postem "postem")
- [electron/protocol.md at master · electron/electron](https://github.com/electron/electron/blob/master/docs/api/protocol.md "electron/protocol.md at master · electron/electron")

これと同様にTwitterに投稿する[post-tweet](https://github.com/azu/post-tweet)というクライアントアプリを書いて使っている。

- [URLスキームで起動できる投稿専用のTwitterクライアントを書いた | Web Scratch](https://efcl.info/2018/11/29/post-twee/)

どちらも今見ているサイトに関する投稿を行うクライアントアプリ。

## まとめ

使っているFirefoxの拡張はだいぶへった。
代わりとなる拡張機能がないものもは自分で作った。

[ChromeのManifest v3](https://docs.google.com/document/d/1nPu6Wy4LWR66EFLeYInl3NzzhHzc-qnk4w4PX-0XMw8/edit#)などまだ拡張機能自体は色々Breaking Changeがありそうなので、アプリに移行できるものはアプリに移行した。(そのために書いたアプリが増えた)
現在のブラウザの拡張の仕組みはどのブラウザでも大きな差がないので、ブラウザが変わった場合でも大まかな動きは変わらなくなっている気はする。

## 参考

- [firefox-webext-list - Google スプレッドシート](https://docs.google.com/spreadsheets/d/1TFcEXMcKrwoIAECIVyBU0GPoSmRqZ7A0VBvqeKYVSww/edit#gid=0 "firefox-webext-list - Google スプレッドシート")
- [user.jsによるFirefoxの設定](https://00.bulog.jp/archives/394)
- [Firefox 57をできるだけ今までの自分の環境に近づけたメモ - カイ士伝](https://bloggingfrom.tv/wp/2017/11/19/15321)
- [FirefoxのアドオンをWeb Extensionsへ移行してみる - 日々是おやっとさぁ](http://nitteru.hatenablog.com/entry/2017/10/21/225038)
- [Firefox57で使えなくなった代替アドオンを探してまとめました](https://00.bulog.jp/archives/164)
- [Mozilla Firefox 57に向けて代替拡張質問スレ (1002)](https://2ch.vet/re_anago_software_1506731259_203_100)
- [Firefox 57 (Firefox Quantum)で使えなくなったアドオンの代替を探す旅へ - FOXISM](http://www.foxism.jp/entry/2017/11/16/210922)
- [FirefoxアドオンのWebExtensions限定化に備える | 羽村の風](https://gatevalley.com/hamuranokaze/202/ "FirefoxアドオンのWebExtensions限定化に備える | 羽村の風")
