---
title: "excalidrawをinkdropでインライン編集できるプラグインを作った"
author: azu
layout: post
date : 2021-05-07T17:32
category: JavaScript
tags:
    - JavaScript
    - inkdrop

---

[Inkdrop](https://www.inkdrop.app/)上に手書き風の図を書く[Excalidraw](https://excalidraw.com/)を統合する[Excalidraw for Inkdrop](https://github.com/azu/inkdrop-excalidraw)というプラグインを書きました。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Excalidraw on Inkdrop<br><br>☑ inlineImageWidgets<a href="https://t.co/uFLvLR5SwK">https://t.co/uFLvLR5SwK</a> <a href="https://t.co/PtJdOWkjDV">pic.twitter.com/PtJdOWkjDV</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1390575524498472964?ref_src=twsrc%5Etfw">May 7, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Inkdropのノートに次の記法で `.excalidraw` ファイルへのリンク か `.exalidraw.png` を画像として埋め込みます。

```
[!Excalidraw](/path/to/file.excalidraw)
```

OR

```markdown
![Excalidraw](/path/to/file.excalidraw.png)
```

このノートをプレビューすると、プレビュー画面に[@excalidraw/excalidraw](https://www.npmjs.com/package/@excalidraw/excalidraw)を使ったexcalidrawのエディタが表示されるので、そのまま編集できます。

編集したexcalidrawの内容は元の`.excalidraw`ファイルに自動的に保存され、保存時にあわせて`.excalidraw.png`ファイルも作成します。

プラグインのオプションで、inline image widgets連携を有効にすると、書き換えるたびにエディタ側が参照する画像も更新して、エディタにレンダリング結果の画像を表示もできます。

```
☑ Enable integration for inline image widgets
```

## 使い方

ipmコマンドでインストールします。

```
ipm install excalidraw
```

プラグインの設定から次の設定をします。

- **saveDir**: `.excalidraw` ファイルが自動的に保存されるディレクトリを入れる
- **Enable integration for inline image widgets**: inline image previewを使う場合はチェックを入れる

ノート上でコンテキストメニューから**Create Excalidraw**を選択すると自動的に`saveDir`に`.excalidraw` が作成され、
そのファイルへのリンクがノートに追加されます。

- **Create Excalidraw**: create .excalidraw file to saveDir and put the link into current selection

あとは、プレビューを開いてexcalidrawで描くだけです。

![image](https://efcl.info/wp-content/uploads/2021/05/07-1620380829.png)

Markdownエディタと作図ツールを行き来しないで、同じアプリ内で書けるの便利です。

[Figma](https://www.figma.com)(FigJam)、[Whimsical](https://whimsical.com/)、[Miro](https://miro.com)とかも便利なのですが、
適当な図を描くのにそっちを使うのは面倒でした。
また、[plantuml](https://plantuml.com/)、[nomnoml](https://nomnoml.com/)、[Mermaid](https://mermaid-js.github.io/mermaid/)などのテキストで書けるツールはメンテナンス性はいいのですが、記法を覚えられないという問題がありました。

[Excalidraw](https://excalidraw.com/)は機能的にはそこまで多いわけではないですが、描いてて楽しいのと[@excalidraw/excalidraw](https://www.npmjs.com/package/@excalidraw/excalidraw)というライブラリで簡単にアプリケーションに組み込めるので、[Inkdrop](https://www.inkdrop.app/)に組み込んでみました。
Excalidrawで描いたら自動で`.excalidraw` と png ファイルを生成するというのがこだわりポイントです。(ノートアプリで保存を意識したくなかった)

VSCodeでも次のような拡張を使えば `.excalidraw` ファイルを編集できるので、他のエディタともうまく連携できるような気もします。

- [pomdtr/vscode-excalidraw-embed: Excalidraw embedded in VSCode !](https://github.com/pomdtr/vscode-excalidraw-embed)
- [brijeshb42/vscode-excalidraw: Excalidraw integration for vscode](https://github.com/brijeshb42/vscode-excalidraw)


## 雑記

[今年のオープンソース活動振り返り @ 2020](https://efcl.info/2020/12/31/open-source-in-2020/#inkdrop)でも書いていましたが、メインのフローなメモアプリを[Quiver](http://happenapps.com/#quiver)から[Inkdrop](https://www.inkdrop.app/)にしました

[Inkdropプラグイン開発者ライセンス](https://blog.craftz.dog/announcing-inkdrop-plugin-developer-license-ja-8a2821e012c5)を使っているので、ちょこちょこinkdrop pluginを作って使っています。

- [inkdrop-note-templates](https://github.com/azu/inkdrop-note-templates)
    - テンプレートとなるNoteを作ると、そのテンプレートからNoteを作成できる
    - 日報的な感じの今日やること、やったことを書くノートをショートカットで作成するために書いた
    - [Customizing Keybindings](https://docs.inkdrop.app/manual/customizing-keybindings)
- [inkdrop-move-notes](https://github.com/azu/inkdrop-move-notes)
    - ↑のテンプレートで`YYYY-MM-DD` みたいなノートが大量にできるので、別のフォルダに一括で移動するプラグイン
- [inkdrop-github-project-todo-md](https://github.com/azu/inkdrop-github-project-todo-md)
    - GitHub Projectの内容をInkdropに取り込んで、チェックを入れるとGitHub Issueをopenしたりcloseできるプラグイン
    - [GitHub Issuesを個人用のTodo管理アプリとして使っている | Web Scratch](https://efcl.info/2020/12/25/missue/) でも紹介した
    - ライブラリ化している
    - [azu/github-project-todo-md: A Tool that sync between GitHub Project Board <-> Todo Markdown text.](https://github.com/azu/github-project-todo-md)

Inkdropは、CodeMirror、React、Redux、Remark、Electron、CouchDBみたいな構成になっていて、
APIも大体そのままな感じなので、ハックして遊ぶには結構便利な感じです。
(たまにAPIがなかったらドキュメント探しても分からないことあるけど、特殊な構成じゃないからなんとかできるみたいな感じ)

- [Table of Contents | Inkdrop Documentation](https://docs.inkdrop.app/)

あと最近Inkdropのアプリ自体がローカルサーバになって、HTTPでInkdropをさわれるようになったので、これも便利な気がします。

- [Integrating with Alfred | Inkdrop Documentation](https://docs.inkdrop.app/manual/integrating-with-alfred)
- [Accessing the Local Database | Inkdrop Documentation](https://docs.inkdrop.app/manual/accessing-the-local-database#accessing-via-http-advanced)
