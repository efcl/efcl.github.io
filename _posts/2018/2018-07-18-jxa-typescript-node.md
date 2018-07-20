---
title: "JXAをTypeScriptでコード補完して書く環境やNode.jsから実行する環境を作った"
author: azu
layout: post
date : 2018-07-18T19:05
category: JavaScript
tags:
    - JXA
    - TypeScript
    - Node.js

---

JXA(JavaScript for Automation)を書いて実行するためにいろいろなパッケージを作りました。

この記事で紹介する内容は次のスライドで発表したものと大体同じです。

- スライド: [JXA for TypeScript/Node.js](http://azu.github.io/slide/2018/laco_sushi/jxa-for-typescript.html)
- リポジトリ: [JXA-userland/JXA: JavaScript for Automation(JXA) packages for TypeScript/Node.js.](https://github.com/JXA-userland/JXA)

JXAはAppleScriptのJavaScript版(WebKit)のようなもので、macOSにはビルトインされています。
`osascript -l javascrript file.js`でJXAを実行できます。


詳しくは次のページで解説されています。

- [Home · JXA-Cookbook/JXA-Cookbook Wiki](https://github.com/JXA-Cookbook/JXA-Cookbook/wiki "Home · JXA-Cookbook/JXA-Cookbook Wiki")
- [jxa@apple-dev.groups.io | Wiki](https://apple-dev.groups.io/g/jxa/wiki/JXA-Resources "jxa@apple-dev.groups.io | Wiki")

AppleScriptやJXAを使うとmacOSのAutomatorアプリでできるような、いろいろなアプリの自動化をスクリプトから行えます。

次のようなことができます。特に対応しているアプリから情報を引き出すのに便利です。

- Automatorでできること
- アプリへのキー入力、開く閉じるなどの操作
  - ラベルを見つけて操作など無理やりなんとかできる
- 対応アプリはアプリから情報を取得できる
  - omnifocusはTodoデータをデータベースから引っ張れるとか


AppleScriptは普通のプログラミング言語とは文法体系が異なるため、初見でコードを理解するのが難しかったです（主にキーワードが英文法的で難しい）

AppleScriptでChromeでGoogleを開くコード

```
set myLink to "https://google.com/"
tell application "Google Chrome"
	tell its window 1
		set theTabs to count of tabs
		set URL of tab 1 to myLink
	end tell
end tell
```

JXAだともう少し見慣れたコードで書けます。

```
const myLink = "https://google.com/"
const chrome = Application("Google Chrome");
const window = chrome.windows[0];
const theTab = window.tabs[0];
theTab.url = myLink;
```

しかし、JXAはまともにサポートしているエディタ環境がないためコード補完すらまともにできません。
そのため、JXAのビルトインオブジェクトなどの型定義を作ってTypeScriptをサポートしてるエディタならコード補完できるものを作成しました。

作成したものは次のリポジトリにまとめてあります。

- [JXA-userland/JXA: JavaScript for Automation(JXA) packages for TypeScript/Node.js.](https://github.com/JXA-userland/JXA)

次のリポジトリをcloneして[Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code - Code Editing. Redefined")で開くと、JXAのコード補完やシンタックスハイライトが行える状態でコード書けます。

```
git clone https://github.com/JXA-userland/editor-integrate-example
cd editor-integrate-example
npm install
vscode .
```

![ss](https://raw.githubusercontent.com/JXA-userland/JXA/master/packages/%40jxa/global-type/docs/example.gif)

これは[@jxa/global-type](https://github.com/JXA-userland/JXA/tree/master/packages/@jxa/global-type)というJXAのオブジェクトの型定義をインストールすることで、TypeScriptの型としてコード補完をサポートしています。

TypeScriptで書いた場合は型チェックも一部効き、コード補完ができます。
JavaScriptで書いた場合はコード補完ができるという感じです。

この型定義ファイルはAppleScriptのリファレンスである`.sdef`ファイルから[@jxa/sdef-to-dts](https://github.com/JXA-userland/JXA/tree/master/packages/@jxa/sdef-to-dts)を使って自動生成しています。

JXAのコードで少し書きやすくなって"スクリプトエディタ"(macのアプリ)を使ってJXAを実行するとよく落ちることがわかると思います。（触ってはいけないものに触ると落ちます)
そのため、JXAですべての事を行うのではなく、JXAが必要な部分だけをJXAで書くのが良いと思いました。
その他のコマンドライン引数の扱いやロジックやファイル操作などはNode.jsで行うことで、既存のnpmのエコシステムとの連携ができ便利だと考えました。

そのため、Node.jsのなかでJXAを実行してその結果を返す[@jxa/run](https://github.com/JXA-userland/JXA/tree/master/packages/@jxa/run)というモジュールを作りました。

次のように、`run`のコールバック関数の中がJXAとして評価され実行できるモジュールです。

```js
import { run } from "@jxa/run";
export const currentUserName = () => {
    // このコールバック関数内はJXAとしてosascriptで実行される
    return run(() => {
        const sys = Application("System Events");
        return sys.currentUser().name();
    });
};

// メインとかは普通にNode.js
export const example = async () => {
    const userName = await currentUserName();
    return `User: ${userName}`;
};
```

これをつかうことで、JXAでないとアクセスできない（しにくい）ものがNode.jsからアクセスできます。
（内部的に`osascript -l javascrript`を使うので動作は同じです）

これで、TypeScript（またはJavaScript）でJXAを書いて、JXAをNode.jsで実行するという環境ができました。
JXAはマイナー感があるので必要なAPIがよくわからないという問題に衝突しますが、覚えておくと便利なことがあるので、そういうときに使えるとよさそうです。

次のスライドでもいろいろ苦戦した話を書いています。

- [JXA for TypeScript/Node.js](http://azu.github.io/slide/2018/laco_sushi/jxa-for-typescript.html)
