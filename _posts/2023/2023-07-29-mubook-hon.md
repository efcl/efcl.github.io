---
title: "mubook-hon: Dropboxに保存したepubやPDFを読むビューア、Notionにメモや読んでいる位置を記録できるMobile/PC対応のウェブアプリ"
author: azu
layout: post
date : 2023-07-29T16:19
category: 
tags:
    - epub
    - pdf
    - JavaScript

---

[mubook-hon](https://mubook-hon.vercel.app/)という読書用のウェブアプリを作りました。
特徴として、Dropboxに保存しているepubやPDFをそのままブラウザで読むことができ、メモやどこまで読んだかをNotionに記録できます。

- ウェブサイト: <https://mubook-hon.vercel.app/>
- ソースコード: [azu/mubook-hon: epub/PDF reader + Notion Sync + Memo](https://github.com/azu/mubook-hon)
- ドキュメント and サンプルデータベース: <https://efcl.notion.site/mubook-hon-addce6c324d44d749a73748f92e3a1a6>

## 特徴

- Dropboxに保存したepub/PDFをブラウザ読むことができる
- ChromeのショートカットアプリやiOSのホームに追加などでアプリぽく使えます
- Mobile/PC対応
- 読んだ書籍の情報は自動的にNotionに記録される
  - epubやPDFからメタデータを取得して、自動的にタイトル/著者/出版社の情報を入れたNotionのデータベースに追加されます
- Notionに読んでいる位置を記録して、別の端末から再開できる
- Notionにメモを追加できる
- Notionで読書履歴やメモを管理できるテンプレmートを用意している

## イメージ

> epub viewer by [Bibi](https://bibi.epub.link/)

![viewer: Pro Git book - CC BY-NC-SA 3.0](https://efcl.info/wp-content/uploads/2023/07/pdf.png)

> PDF viewer by [PDF.js](https://mozilla.github.io/pdf.js/)

![notion-database.png](https://efcl.info/wp-content/uploads/2023/07/notion-database.png)

> Notionのデータベースに本が自動で記録されます

![Notion Book Page](https://efcl.info/wp-content/uploads/2023/07/notion-book-page.png)

> Notionにメモを追加できる、メモは本に自動的に紐づきます

Notionに書籍ごとのページが自動的に作られ、その書籍のページに対してメモ(引用)が自動的にRelationとして追加されます。
書籍に紐づくメモをデータベースとして管理できるようになってるので、メモの自由度がかなり高いのが特徴です。

デフォルトのテンプレートでは、書籍ページを2カラムにして、右にメモの一覧を表示して、左にメモをまとめた感想を書けるようにしています。
次のように、メモから気になったものだけをピックアップして展開して、書籍全体の感想を書くという使い方ができます。

<video src="https://efcl.info/wp-content/uploads/2023/07/mubook-hon.mp4" controls muted loop playsinline></video>

この辺は、mubook-hon側で使うキー以外は自由に変更して大丈夫なので、Notionのデータベースを自分好みにカスタマイズできます。
mubook-honで予約してるキーはデータベースの説明に書いてあるので、それ以外は自由に変更できます。

- データベースの予約されたキー：
  - <https://efcl.notion.site/e24f39003e8149c6a2b07c008b99c58f?v=2cd15f2ecfca448e9a0abfae809223c0>
  - <https://efcl.notion.site/69fe2999e32f441fb29ef1a3545c194e?v=a8e69cef0a1f4f41adb302cdb55e83d4>

## 使い方

必要なもの

- Dropboxアカウント
- Notionアカウント
  - [テンプレート](https://efcl.notion.site/mubook-hon-addce6c324d44d749a73748f92e3a1a6)の複製

詳しい使い方はドキュメントに書いてあります。
ドキュメントの方が最新なので、この記事と違うところがあった場合はドキュメントを参照してください。

- <https://efcl.notion.site/mubook-hon-addce6c324d44d749a73748f92e3a1a6>

**Dropboxの設定**

1. https://mubook-hon.vercel.app/ にアクセス
2. “Authorize”ボタンを押し、Dropboxにログインして、mubook-honアプリのアクセスを許可する
3. `~/Dropbox/アプリ/mubook-hon` に 拡張子が `.epub` または `.pdf` のファイルを配置する
  - 今のmacだと `/Users/{user}/Library/CloudStorage/Dropbox/アプリ/mubook-hon` かもしれません
  - 英語の場合は `/Users/{user}/Library/CloudStorage/Dropbox/Apps/mubook-hon` かもしれません
4. https://mubook-hon.vercel.app/ に本が表示されて読めるようになる

**Notionの設定**

1. このテンプレートを複製する
2. https://www.notion.so/my-integrations から新しいインテグレーションを作成
    - 📝 作成したら表示されるAPI Tokenをコピーしておく(このAPI Tokenは公開してはいけません)
    - 名前: `mubook-hon` (好きな名前)
    - 機能:
        - ✅ コンテンツを読む取る: 書籍をどこまで読んだかの取得に利用
        - ✅ コンテンツを更新: データベースの書籍更新に利用
        - ✅ コンテンツを挿入: データベースの書籍更新に利用
    - 他はなし

**アプリ上の設定**

1. 好きなブラウザで https://mubook-hon.vercel.app/ にアクセス
2. [Settings ページ](https://mubook-hon.vercel.app/settings) にアクセス
3. 次の項目を設定してリロードして確認
    - Notion API Key: 作成したインテーグレーションのAPI Key
    - Book List Database Id: Book ListデータベースのID
        - ビューのリンクをコピーする
        - [`https://www.notion.so/{name}/123456asdfg?v=xxx`](https://www.notion.so/e24f39003e8149c6a2b07c008b99c58f?pvs=21) の[`123456asdfg`](https://www.notion.so/e24f39003e8149c6a2b07c008b99c58f?pvs=21) 部分
        - [[作成済みDBへの連携 2] データベースIDの取得と設定](https://booknotion.site/setting-databaseid)
    - Book Memo Database Id: Book MemoデータベースのID
4. 設定完了！ https://mubook-hon.vercel.app/ から本を読めます

⚠️ それぞれのテーブルには予約された名前があります。それらのカラム名を変更すると動かなくなります。詳細はテーブルをフルページで開くと説明が書いてあります。

**アプリの機能解説**

ビューアーの下には次のようなボタンがあります。

![Memo](https://efcl.info/wp-content/uploads/2023/07/29-1690616574.png)

- **📁+{数値}** ボタン: メモを一時的にストックする
- **Memo**ボタン: メモをNotionに追加する
    - 保存するテキストは次の優先順位で決定されます
    - メモができるテキストがない場合は、メモボタンは無効化されます
    1. ストックされたメモを結合したテキスト
    2. 選択範囲のテキスト
    3. 現在ページのテキスト

複数のページにまたがるメモは、📁でストックして、Memoでまとめてメモとして追加できます。
他にも隠された機能が色々ある気がするので、適当に探してみてください。

メモと言いながら、今できるのは引用だけで、実際にコメントはNotionの方で書く必要があります。
メモのコメントを書くUIがあんまり思いつかなくて、現状の実装にしていますが、結構これでも気軽でいいかなという気がします。

いい解決方法を思いついたら教えてください。

- [Memo UI · Issue #2 · azu/mubook-hon](https://github.com/azu/mubook-hon/issues/2)

## Privacy Notice

NotionのAPIを利用していますが、NotionのAPIは[CORS](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS)をサポートしていません。
そのためブラウザから直接APIを呼び出すことができないため、CORSを回避するためのプロキシを通して通信しています。

この性質上、プロキシにはNotionのAPIの通信が入ってきてしまいますが、[ログなどは取らないようにテスト](https://github.com/azu/mubook-hon/blob/main/pages/api/notion-proxy/%5B...path%5D.test.ts)を入れたりしています。

また、Proxyの実装は<https://github.com/azu/mubook-hon/blob/main/pages/api/notion-proxy/%5B...path%5D.ts>にあるので、自分でProxyを立てて、次のコードをブラウザのコンソールで実行すると、自分のProxyを利用できます。

```js
localStorage.setItem("USER_DEFINED_NOTION_BASE_URL", "https://your-proxy.test/")
```

## 実装

ソースコードはGitHubにあります。

- [azu/mubook-hon: epub/PDF reader + Notion Sync + Memo](https://github.com/azu/mubook-hon)

Next.jsを使っていますが、ほとんどクライアントの処理なのであんまりNext.jsの機能は使ってません。

epubリーダには[Bibi](https://bibi.epub.link/)を使っています。
Bibiは、指定位置に移動する機能や現在位置をクロスブラウザで取得する機能や選択してるテキストを取得する機能などがなかったります。
そのためプログラマブルにはあんまり扱いにくいのですが、この辺は頑張って実装しています。

- <https://github.com/azu/mubook-hon/blob/1cf7cd97c2a605acbe20ddeddd3fce5836848166/public/bibi/index.html#L651-L672>
- <https://github.com/azu/mubook-hon/blob/1cf7cd97c2a605acbe20ddeddd3fce5836848166/app/viewer/epub/BibiReader.tsx>

[Epub.js](https://github.com/futurepress/epub.js)の方がAPIは扱いやすいのですが、Bibiの方が表示や操作性が良いです。

PDFは[PDF.js](https://mozilla.github.io/pdf.js/)と[React PDF Viewer](https://react-pdf-viewer.dev/)を使って実装しています。
こちらは[React PDF Viewer](https://react-pdf-viewer.dev/)で結構あっさり適当に実装しています。
[React PDF Viewer](https://react-pdf-viewer.dev/)は有料のライブラリですが、pdf.jsの面倒なところを隠してくれるよくできたライブラリだと思います。

## モチベーション

昔から買った書籍はDropboxに保存していたのですが、これ読むビューアーがないなーと思って作りました。
PCで読んで続きをスマホで読むみたいなことが多いので、位置同期ができるビューアーが欲しかった。

最初はただのビューアーを考えていてDropboxに位置も記録しようと思ってたのですが、
Notionのデータベースを読書の記録に使うというアイデアを思いついたらしいです。

![memo](https://efcl.info/wp-content/uploads/2023/07/29-1690617578.png)

[Bibi](https://bibi.epub.link/)に位置同期に使えるAPIがなかったので、そこをDOM APIをめちゃくちゃいじって実装するのが大変でしたが、
読むだけで自動的に書籍のメタデータが入った読書記録が作れるのは便利だなと思っています。

また、今までスクショベースのメモをやっていました。

- [スクリーンショットドリブンのメモアプリ mumemo を作った | Web Scratch](https://efcl.info/2021/05/06/mumemo/)

この方法だとメモをとって満足して終わりという感じでした。

[mubook-hon](https://mubook-hon.vercel.app/)では、Notionの書籍に紐づくメモ一覧できるようになりました。
メモの一覧から気になるものをピックアップしたり、メモを好きな位置に貼り付ける(Mentionする)ことができて、メモの整理ができるようになりました。
これによって、書籍全体を通してのメモというか感想が書きやすくなった気がします。

通常のMarkdownだと、ブロックの並び替えは面倒ですが、Notionだとそこがやりやすいのが整理に向いていると思います。
`@`でメモをどこからでも引っ張ってこれたり、メモにリンクしてそれを引用ブロックにすると引用表示になったり便利です。

<video src="https://efcl.info/wp-content/uploads/2023/07/mubook-hon-quote.mp4" controls muted loop playsinline></video>

最近のbook-reviewなんかはこれを元にしていますが、Notionから直接公開できるような手法があってもいいのかもしれないですね。

- [azu/book-review: 本を読んだ感想を書くブログです。](https://github.com/azu/book-review)