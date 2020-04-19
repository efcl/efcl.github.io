---
title: "ウィンドウ管理アプリの.phoenix.jsを使って、任意のアプリをSplit Viewのように左右に並べる"
author: azu
layout: post
date : 2020-04-19T21:09
category: JavaScript
tags:
    - macOS
    - JavaScript

---

TwitterとDiscordを1つの画面で見たかったので、[Phoenix][]を使って実現しました。

[Phoenix][]は、アプリやウィンドウの位置やサイズをJavaScriptで管理できるmacOS向けのアプリです。

- [kasper/phoenix: A lightweight macOS/OS X window and app manager scriptable with JavaScript](https://github.com/kasper/phoenix)

この[Phoenix][]を使うことでmacOSのSplit Viewのように複数のアプリを任意の割合で左右に並べる実装を書きました。

![Phoenixでの実装イメージ](https://efcl.info/wp-content/uploads/2020/04/19-1587298926.png)

macOSにはビルトインでSplit Viewという2つのアプリをSide by Sideで並べて表示できる機能があります。

- [Split View で Mac の App を 2 つ並べて表示する - Apple サポート](https://support.apple.com/ja-jp/HT204948)

しかし、Split Viewだと駄目な理由としては次のものがあります。

- Split Viewはフルスクリーンしか対応していない
- Split Viewに対応してないアプリがある(Discordなど)

フルスクリーンでしか動かないのが致命的だったので[Phoenix][]で、左右にウィンドウを指定の割合で並べることで同じ機能を実装しました。
また、[Phoenix][]はウィンドウがアクティブになったときのような[Event](https://github.com/kasper/phoenix/blob/master/docs/API.md#13-event)も扱えます。

そのため、左右に並べるアプリのどちらかがactiveになったら、対となるアプリも最前面に出して指定のサイズにすることで、2つが一体化したアプリのように扱えます。

## [Phoenix][]のインストール

[Phoenix][]はHomebrew caskでインストールできます

    brew cask install phoenix

またはバイナリをダウンロードしてインストールします。

- https://github.com/kasper/phoenix/releases/

## `.phonix.js`の設定

[Phoenix][]は `~/.phoenix.js` に書かれた設定ファイルを読み込みます。
[Hammerspoon](https://www.hammerspoon.org/)のウィンドウ管理に特化したものと考えればよさそうです。

Split Viewのような動きを実現するために次のような設定を実装しています。

- `appNames` には好きなアプリの組み合わせを書きます。
    - [mydiscord](https://github.com/azu/mydiscord)はDiscordからサイドバーを削ったラッパーアプリです
- `windowRatio` には好きなウィンドウの比率を書きます。

次のような設定ファイルを `~/.phoenix.js` に配置すれば、自動的に読み込まれます。
この設定ファイルには、[Phoenix][]の提供するAPIを使ってウィンドウ管理のコードを書けます。

```js
const appNames = {
    left: "Tweeten",
    right: "MyDiscord"
}
const windowRatio = {
    left: 0.75,
    right: 0.25
};
/**
 * SplitView
 */
const splitView = ({ leftAppName, rightAppName, mainAppName }) => {
    const leftApp = App.get(leftAppName);
    const leftAppWindow = leftApp.mainWindow();
    const rightApp = App.get(rightAppName);
    const rightAppWindow = rightApp.mainWindow();
    const frame = Screen.main().visibleFrame();
    const { width, height } = frame;
    // Resize
    leftAppWindow.setFrame({ x: 0, y: 0, width: width * windowRatio.left, height });
    rightAppWindow.setFrame({ x: width * windowRatio.left, y: 0, width: width * windowRatio.right, height });
    // raise up to front
    if (leftAppName === mainAppName) {
        rightAppWindow.raise();
        leftAppWindow.raise();
    } else {
        leftAppWindow.raise();
        rightAppWindow.raise();
    }
}
// on active
Event.on('appDidActivate', app => {
    const appName = app.name();
    if (appName === appNames.left || appName === appNames.right) {
        splitView({
            leftAppName: appNames.left,
            rightAppName: appNames.right,
            mainAppName: appName
        });
    }
});
```

この実装だと`Tweeten`のアプリにフォーカスしたら、自動的に`MyDiscord`のアプリも右側に表示されます。

![Phoenixでの実装イメージ](https://efcl.info/wp-content/uploads/2020/04/19-1587298926.png)

この実装ではSplit Viewと違ってウィンドウを扱うので、任意のアプリの組み合わせに対応できます。


[Phoenix]: https://github.com/kasper/phoenix