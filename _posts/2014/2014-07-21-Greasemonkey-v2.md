---
title: Greasemonkey2.0対応 - LDRFullFeed、LDR NG、ldr_keyhack_jkc+n
author: azu
layout: post
categories:
    - greasemonkey
tags:
    - Greasemonkey
    - Browserify
    - セキュリティ
    - Firefox
    - GitHub

---

以下のGreasemonkeyスクリプトを修正した件についての話。

* [azu/LDR-NG](https://github.com/azu/LDR-NG "azu/LDR-NG")
* [LDRをj、kで前後の記事、nで新しいタブで開くGreasemonkey](https://gist.github.com/azu/491fa1c5050fc378c746 "LDRをj、kで前後の記事、nで新しいタブで開くGreasemonkey")
* [Constellation/ldrfullfeed](https://github.com/Constellation/ldrfullfeed "Constellation/ldrfullfeed")

## Greasemonkey2.0

Greasemonkey2.0ではFirefoxの変更に合わせて、セキュリティ周りの変更がありました。
それにより、色々なGreasemonkeyがそのままだと動かなくなっています。

* [Changes to unsafeWindow for the Add-on SDK | Mozilla Add-ons Blog](https://blog.mozilla.org/addons/2014/04/10/changes-to-unsafewindow-for-the-add-on-sdk/ "Changes to unsafeWindow for the Add-on SDK | Mozilla Add-ons Blog")
* [Greasespot: Greasemonkey 2.0 Release](http://www.greasespot.net/2014/06/greasemonkey-20-release.html "Greasespot: Greasemonkey 2.0 Release")
* [UserScriptのGreasemonkey 2.0対応 | monoの開発ブログ](http://blog.monoweb.info/blog/2014/07/13/greasemonkey-2-dot-0/ "UserScriptのGreasemonkey 2.0対応 | monoの開発ブログ")

動かない原因は大きく分けて2つあります。

* `@grant none` がデフォルトになった
* unsafeWindowの挙動が変わった(Firefox側の変更)

## `@grant none`

* [@grant - GreaseSpot Wiki](http://wiki.greasespot.net/@grant "@grant - GreaseSpot Wiki")
* [UserScriptのGreasemonkey 2.0対応 | monoの開発ブログ](http://blog.monoweb.info/blog/2014/07/13/greasemonkey-2-dot-0/ "UserScriptのGreasemonkey 2.0対応 | monoの開発ブログ")

に詳しい書いてあります。

簡単にいうと、今までそのまま使えていたGM_*関数は特権関数なので、Greasemonkeyで使う場合は、
事前にスクリプトのメタ情報で

```
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_xmlhttpRequest
```

のように列挙する必要があります。

つかってるAPIを列挙するのが面倒なので、
既存のスクリプトからこのメタ情報のコメントを取得するコマンドラインツールを作りました。

* [azu/greasemonkey_grant_cli](https://github.com/azu/greasemonkey_grant_cli "azu/greasemonkey_grant_cli")

``` sh
npm install -g greasemonkey_grant_cli
greasemonkey_grant file.user.js
```

という感じでファイルを指定して実行すると

```
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
```

のようなコメント形式で使ってるAPI一覧を得られます。

### `@grant none`の挙動

`@grant none` はpage contextで実行されるため`GM_*関数`は使えません。
ブックマークレットと同じようなものなので、`GM_関数`が必要ない場合はこれをつかったほうが楽です。

データの読み書き(localstorage)、GM_xmlhttpRequest(クロスドメインはそのままXHRと同じ)、GM_addStyleについてのshimライブラリが
[Greasemonkey &#34;@grant none&#34; compatibility shim.](https://gist.github.com/arantius/3123124 "Greasemonkey &#34;@grant none&#34; compatibility shim.") に用意されいます。

なので、サイト間をまたいだりしないGreasemonkeyはこれをつかって `@grant none` で動かせるケースが多いでしょう。
(APIを叩く場合は大抵クロスドメイン跨ぐので無理かも)

#### 実例

[livedoor Reader で NG word フィルター を実現する Greasemonkey - zaknakの日記](http://d.hatena.ne.jp/zaknak/20080909/1220936155 "livedoor Reader で NG word フィルター を実現する Greasemonkey - zaknakの日記") で公開されたいた
LDRのNGフィルタをするGreasemonkeyは`GM_*関数`が必要なかったので、 `@grant none`で動くように修正しました

* [azu/LDR-NG](https://github.com/azu/LDR-NG "azu/LDR-NG")

## unsafeWindowの挙動

もう一つの大きな変更が、`unsafeWindow`周りの挙動です

unsafeWindow(特権context) -> window(page context) という一方通行なら、今までと同じ書き方で問題ありません。
(Greasemonkeyからpage contextの関数を呼び出すとかは `unsafeWindow.hoge()`みたいにできる)

unsafeWindow(特権context) -> window(page context)にイベントハンドラを登録して、
window(page context)からそのイベントが発火してメソッドを呼ぶみたいなケースだと問題がおきます。

例えば、[LDRをj、kで前後の記事、nで新しいタブで開くGreasemonkey](https://gist.github.com/azu/491fa1c5050fc378c746 "LDRをj、kで前後の記事、nで新しいタブで開くGreasemonkey")では、
以下のようににunsafeWindow経由で、イベントをpage contextに設定していました。

つまり、Greasemonkey内で定義した関数をpage contextから呼ぶようになっていました。

``` js
var openAndGoNext = function () {
    var item = w.get_active_item(true);
    if (!item) {
        return;
    }
    // background open
    openNewBackgroundTab(htmlEntityDecode(item.link));
    w.Control.go_next();
};
unsafeWindow.Keybind.add("k", openAndGoNext);
```

これだと、page contextから`openAndGoNext`を呼ぼうとすると
`Error: Permission denied to access property 'call'` のようにパーミッションエラーという感じになって失敗します。

そのため、`openAndGoNext` をpage contextから呼べるように定義する必要があります。

このケースだと`exportFunction`というGreasemonkeyの関数をwindow(page context)に登録するものがあるのでこれを利用すれば、
以下のように修正できます。

``` js
function exportGMFunc(fn, name) {
    var fnName = name || fn.name;
    // page contextからfnNameを呼べるようにする特権作成関数
    exportFunction(fn, unsafeWindow, {defineAs: fnName });
    return unsafeWindow[fnName];
}
```

```js
unsafeWindow.Keybind.add("k", exportGMFunc(openAndGoNext));
```

他にも変数やオブジェクトを登録する関数などがあり、以下に書いてあります。

* [Changes to unsafeWindow for the Add-on SDK | Mozilla Add-ons Blog](https://blog.mozilla.org/addons/2014/04/10/changes-to-unsafewindow-for-the-add-on-sdk/ "Changes to unsafeWindow for the Add-on SDK | Mozilla Add-ons Blog")

この辺はProxy APIでラップしたwindowとかを作れば自動的にいけるんじゃないかと思って、[azu/Greasemonkey-unsafeWindow-Proxy](https://github.com/azu/Greasemonkey-unsafeWindow-Proxy "azu/Greasemonkey-unsafeWindow-Proxy")
というのを書いてたんですが、何かよくわからなくなって放置してます。


#### 実例

ldr_keyhack_jkc+nとLDRFullFeedはこの `exportFunction` を使って修正してあります。

* [LDRをj、kで前後の記事、nで新しいタブで開くGreasemonkey](https://gist.github.com/azu/491fa1c5050fc378c746 "LDRをj、kで前後の記事、nで新しいタブで開くGreasemonkey")
* [Constellation/ldrfullfeed](https://github.com/Constellation/ldrfullfeed "Constellation/ldrfullfeed")

## 最近のGreasemonkey

箇条書きで最近のGreasemonkey

* [scriptish/scriptish](https://github.com/scriptish/scriptish "scriptish/scriptish") まだFirefox30対応してない
* 作者のErik Voldさんは[JPM Beta](http://work.erikvold.com/jetpack/2014/07/08/jpm-beta.html "JPM Beta")に忙しい様子
* userscripts.org はほぼ完全に死んでる気がします
* 代わりに [Greasy Fork](https://greasyfork.org/ "Greasy Fork - safe and useful user scripts") が動いています。
* [Greasy Fork](https://greasyfork.org/ "Greasy Fork - safe and useful user scripts")は活発なのでこちらに移行するといいのでは
* GitHubにスクリプトを置いて自動的に同期する仕組みなどもある。
* [Greasy Fork](https://greasyfork.org/ "Greasy Fork - safe and useful user scripts")はスクリプトレビュー方式取ってるので動的にスクリプト更新するものはおけない

最後のやつは外部スクリプトを使う場所が制限されています(条件から外れた場合はインストールボタンが押せなくなる)

[Greasy Fork policy on external scripts](https://greasyfork.org/help/external-scripts "Greasy Fork policy on external scripts")に書いてある
CDNやGreasy Forkにおいてあるスクリプトは`@require`で読み込んで使うことが出来ます。

簡単にいえば、動的にGreasemonkeyスクリプトの中身が変えられたりしないようにそういう制限を設けているという感じです。

Greasemonkeyは下火ですが、まあまだ簡単に書く場合はAddon SDKより楽なので使う機会は多いです。

[JPM Beta](http://work.erikvold.com/jetpack/2014/07/08/jpm-beta.html "JPM Beta") が熟してきて、
Addon SDKでもnpmのエコシステムが回ったAddon作成ができるようになるといいですね。
(その場合でもGreasemonkeyは `@grant none` - 常時実行するブックマークレットみたいなプラットフォームとして残る気はする)

今の[JPM Beta](http://work.erikvold.com/jetpack/2014/07/08/jpm-beta.html "JPM Beta")は`cfx`コマンドの代替的な感じです。(PythonベースじゃなくNode.jsベースになった)

### Browserify

Greasemonkeyの`@require`でモジュール管理は正直現代的じゃないし難しい気がしてるので、
最近は[Browserify](http://browserify.org/ "Browserify")でビルドしてGreasemonkeyスクリプトを書いています。

* azu/check_changelog_from_release
    https://github.com/azu/check_changelog_from_release
* azu/github-releases-to-feedly
    https://github.com/azu/github-releases-to-feedly
* azu/show-diff-from-release
    https://github.com/azu/show-diff-from-release

ただし、この方法を使った場合はGreasy Forkのポリシーと反してる気がするので、
Greasy Forkでは公開できないかもしれません。

以下で議論してたけど、どうすればいいのかよくわからないのでGitHubに直接置いてます。

* [Strangely formatted, very long lines - Greasy Forum](https://greasyfork.org/forum/discussion/488/x "Strangely formatted, very long lines - Greasy Forum")

Browserifyでビルドする場合は、
git configでローカルのファイルパスを保存して[ビルドスクリプト](https://github.com/azu/check_changelog_from_release/blob/59ec92b1f1a82caf20ca3c488fb934359e62cdca/package.json#L11-L16 "check_changelog_from_release/package.json at 59ec92b1f1a82caf20ca3c488fb934359e62cdca · azu/check_changelog_from_release")を
まわせば結構いい感じで開発出来ます。

```sh
git config greasemonkey.file /path/to/自分の.user.js
npm run watch # 監視 + ビルド
```

* [check_changelog_from_release/package.json at 59ec92b1f1a82caf20ca3c488fb934359e62cdca · azu/check_changelog_from_release](https://github.com/azu/check_changelog_from_release/blob/59ec92b1f1a82caf20ca3c488fb934359e62cdca/package.json#L11-L16 "check_changelog_from_release/package.json at 59ec92b1f1a82caf20ca3c488fb934359e62cdca · azu/check_changelog_from_release")

ファイルサイズが大きくなりやすいですが、管理しやすいし各スクリプトで[共通モジュール](https://github.com/azu/show-diff-from-release/blob/4aecc1279e6d23600b99a139ea14437480153bac/package.json#L26 "show-diff-from-release/package.json at 4aecc1279e6d23600b99a139ea14437480153bac · azu/show-diff-from-release")が簡単にできたりするので、
自分用に書く場合は圧倒的に楽になると思います。

## まとめ

* Greasemonkey 2.0(Firefox30)で色々破壊的な変更が起きた
    * [UserScriptのGreasemonkey 2.0対応 | monoの開発ブログ](http://blog.monoweb.info/blog/2014/07/13/greasemonkey-2-dot-0/ "UserScriptのGreasemonkey 2.0対応 | monoの開発ブログ")
* userscripts.org は死んでいる
* [Greasy Fork](https://greasyfork.org/ "Greasy Fork")がかわりに機能してる
    * safeを意識してるのでポリシーは若干厳し目
    * どちらにしてもGitHubにもコードを置いたほうがいいですね
* Browserifyを使ってGreasemonkeyスクリプトを書く方法もある
* Addon SDKのエコシステムが強化のために[JPM Beta](http://work.erikvold.com/jetpack/2014/07/08/jpm-beta.html "JPM Beta")がでてきた