
Github Releasesのページは自動的にtagについてるメッセージを読み取って表示してくれます。

### NOTE

微妙にバグっぽい挙動があって、この`-m`でつけたメッセージはMarkdownも指定は出来るのですが、
なぜかh1タグ等が無視されている気がします。
ただし、RSSなどにはちゃんと`# title`などがレンダリングされて表示されます。

## リリースとリリースノートの自動化

汎用的なものはまだ無いですが、npm(node.js)向けには以下のようなツールを使うとgit tagとリリースノート(CHANGELOG)を自動的に生成出来ます。

* [azu/release-changelog](https://github.com/azu/release-changelog "azu/release-changelog")

``` sh
release-changelog <increment> [options]
```

![gif](http://gyazo.com/71c704db8a5811fb5faffc7858c89867.gif)

このツールは[webpro/release-it](https://github.com/webpro/release-it "webpro/release-it")と[ajoslin/conventional-changelog](https://github.com/ajoslin/conventional-changelog "ajoslin/conventional-changelog")をラップしたツールです。

[webpro/release-it](https://github.com/webpro/release-it "webpro/release-it") はpackage.json等のversion更新とgit tagとnpm publish等を一括で行ってくれます。

[ajoslin/conventional-changelog](https://github.com/ajoslin/conventional-changelog "ajoslin/conventional-changelog") はAngularJSの[ Git Commit Guidelines](https://github.com/ajoslin/conventional-changelog/blob/master/CONVENTIONS.md " Git Commit Guidelines")にしたがってコミットを書くと自動的に`CHANGELOG.md`ファイルを生成出来ます。

[azu/release-changelog](https://github.com/azu/release-changelog "azu/release-changelog")はこの2つをまとめたツールです

* CHANGELOG.mdを自動生成
* `git tag -m` にそのバージョンの変更内容を自動的に追加
* [release-it](https://github.com/webpro/release-it "release-it")でtag付け+release

`release-changelog`のオプションは[release-it](https://github.com/webpro/release-it "release-it")と全く同じです。

これでReleaseした内容は以下で見られます。

* [Releases · azu/release-changelog](https://github.com/azu/release-changelog/releases "Releases · azu/release-changelog")
* [Releases · azu/promises-book](https://github.com/azu/promises-book/releases "Releases · azu/promises-book")

先ほど書いたように自動的にレンダリング部分があったりするのは若干微妙ですが、RSSなどはちゃんとレンダリングされた状態で出てくるので何もしないよりはいい感じです。

npmのものしか対応してないので、もっといろんなものに柔軟に拡張して対応できるものが欲しい…

## おわりに

最近では多くのソフトウェアやライブラリがリリースしてもGitHubだけで完結しているものが増えました。
しかし、GitHubのReleaseをちゃんと使ってるものはそこまで多くはありません。(変更内容がコミットを見ないと分からない)

個人的にはもっとGitHubがリリースしやすい機能(リリースノートを書きやすい機能)を入れてくれるのがいいですが、現状でも`git tag -a "annotation title" -m "release message body"`を使うことで自動的にリリースメッセージを入れることができると思います。

GitHub Releaseは自動的にパーマネントリンクが作成されるという意味でも言及しやすくなるので有用です。何でも自動化するのは現実的じゃない面がでてきますが、もっと活用する方法がでてくるといいなーと思います。

結論: もっとリリースノート書いて下さい。