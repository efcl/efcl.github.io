---
title: "pdf.jsを使いブラウザで見られるPDFスライド表示ツールを作った"
author: azu
layout: post
date : 2014-10-07T20:18
category: スライド
tags:
    - JavaScript
    - pdf.js
    - pdf
    - スライド

---

## どういうもの

<iframe src="http://azu.github.io/slide-pdf.js/?slide=http://azu.github.io/slide/DOMQuery/sourcemap.pdf"
scrolling="no"
width="100%"
height="500"
style="border:0;">
</iframe>

http://azu.github.io/slide/DOMQuery/sourcemap.pdf というPDFファイルを読み込んで表示しています。

普通のHTMLスライドのようにウェブページとして公開することも出来ます。

例) http://azu.github.io/slide/DOMQuery/ 

## 作った経緯

[mozilla/pdf.js](https://github.com/mozilla/pdf.js/ "mozilla/pdf.js")を使えばPDFをブラウザ上で表示出来るので、これを使ったプレゼンテーションツールとかあると面白そうな気がしたのが始まりです。

こういうのが欲しい理由としては以下のような感じでした。

- [Deckset](http://decksetapp.com/ "Deckset for Mac: Turn your notes into beautiful presentations") みたいにPDFしか配布用のフォーマットがないものがある
	- Deckset自体は便利なので使いたい
- でもSlideShareやSpeaker Deckにロックインされたくない
    - そもそもSpeaker Deckは素のPDFを見たほうがましという状況がよくあるのが問題…
    -  今までGitHubにスライドおいてきた - [今まで発表したスライド一覧 azu/slide @ GitHub](http://azu.github.io/slide/ "今まで発表したスライド一覧 azu/slide @ GitHub")
- GitHub Pagesにスライドを置くという同じスタイルを取れる
   - 直接PDFだとはやっぱり避けられる所がある + ブラウザによって表示形態がスライドに適してない
- PDFを出力できるアプリは多いので、意外と汎用的に対応できる気がする
   - PowerPoint、KeyNote、DeckSet、Reveal.jsなど

なので、pdf.jsの[Learning](https://github.com/mozilla/pdf.js#learning "Learning")をみて作ったのが始まりです。

## slide-pdf.jsの構成

[slide-pdf.js](https://github.com/azu/slide-pdf.js "slide-pdf.js") がpdf.jsを使ってpdfスライドを読み込んでスライド的に表示する本体。

http://azu.github.io/slide-pdf.js/?slide=http://azu.github.io/slide/DOMQuery/power-assert-in-browser.pdf

という感じURLにpdfファイルを指定するとスライド表示してくれるようにした。same originでpdfファイルを読み込めるなら何でも行ける。

pdf.jsは自動でpdfファイルをちょっとづつ取得して表示するので意外大きなファイルでも大丈夫そうだった。

これを`<iframe>`を使って埋め込んだページ公開するのを意図した感じで作ってあります。(なので http://azu.github.io/slide-pdf.js/ 単体は画面ピッタリ)

```html
<iframe id="main-slide"
    src="http://azu.github.io/slide-pdf.js/?slide=http://azu.github.io/slide/DOMQuery/sourcemap.pdf"
    scrolling="no"
    allowtransparency="true"
    width="100%"
    height="100%"
    style="border:0;">
</iframe>
```

という感じですね。

埋め込み例: http://azu.github.io/slide/DOMQuery/ 

埋め込み例をスクロールしてみるとHTMLとしても読めるようになっています。(検索等がしやすくなる)

DecksetなどはMarkdownからスライドを作るので、MarkdownをHTMLにしたものを一緒に配置するようにしてあります。
(SlideShareでやってる、スライド内容のテキスト出力をインスパイアしてつけた。)

上記のページでは以下のような事をしています。

- iframeの埋め込み
- markdownからメタ情報を取得
- markdownをhtmlにしたものを埋め込み
- failbackとしてpdfを直接ダウンロード出来るように
	- noscriptでも読むことができる

さすがに毎回こういうのを手動でやるのは面倒なだけなので、PDFのURLやMarkdownファイルを指定したら自動的に生成してくれるジェネレーターも書きました。

- [azu/pdf-slide-html](https://github.com/azu/pdf-slide-html "azu/pdf-slide-html")

```sh
$ pdf-slide-html -h
Usage:pdf-slide-html [options]

  -h, --help           displays help
  --base-url String    slide base-url
  --pdf-url String     pdf file path
  --markdown String    markdown file path
  -o, --output String  output file path

```


`--base-url`には、iframeで埋め込むURLのベースを指定しますが ( `http://azu.github.io/slide-pdf.js/` )、same origin policyがあるため使う場合は自分でcloneして、pdfがsame origin的に読み込める位置に配置する必要があります。

```
pdf-slide-html --pdf-url http://azu.github.io/slide/DOMQuery/power-assert-in-browser.pdf --base-url http://azu.github.io/slide-pdf.js/ --markdown power-assert-in-browser.md -o index.html
```

という感じの長い指定をすれば、自動的に先ほどのindex.htmlを作ってくれます。

[Deckset](http://decksetapp.com/ "Deckset for Mac: Turn your notes into beautiful presentations")とか組み合わせると、
HTML自体もいい感じに読めるし検索性も高まるので便利な気がしますが自分用感はありますね。

一応、iOSなどでもpdf.jsは動くので読めると思います。

## pdf.jsについて

pdf.js ではpdfをレンダリングすることが出来ます。

Canvasによるレンダリングですが、pdfのテキストを取得して透明テキストをCanvasの上に配置することが可能です。

またPDF内のリンクをクリック出来るように、PDFからメタ情報を取得したボタンを配置することも出来ます(speakerdeckはこれができてないのが辛い)

ただし、用意されてるサンプルにはCanvasのレンダリングの例しかないので、選択出来るテキストの配置とリンクの配置は自分でコードを書いて載せる必要があります。

また、npmやbowerからインストールすることができる[mozilla/pdfjs-dist](https://github.com/mozilla/pdfjs-dist "mozilla/pdfjs-dist")というビルド済みのものが公開されています。
しかし、このdistにはテキストレイヤーの作成に必要なものが含まれてないので別途[mozilla/pdf.js](https://github.com/mozilla/pdf.js "mozilla/pdf.js")自体も取ってくる必要があります。

簡単に仕組みを書くと、pdf.jsではpageごとに情報を取得することができ、さらにそのpageからテキストコンテンツを取得することができます。

そのテキストを`pdf.js/web/text_layer_builder.js`にある`TextLayerBuilder`で組み立てると座標と文字列を組み合わせたものを作って配置してくれます。

```js
pdfDoc.getPage(pageNum).then(function (page) {
	page.getTextContent().then(function (textContent) {
            var textLayerBuilder = new TextLayerBuilder({
                textLayerDiv: domMapObject.textLayer,
                viewport: viewport,
                pageIndex: 0
            });
            textLayerBuilder.setTextContent(textContent);
        })
});
```

リンクをクリック出来るようにするのも同様に、`page.getAnnotations()`でリンクを含めたアノテーション情報を取得できるので、これ得た座標にクリックできる要素を配置する感じです。

```js
function setupAnnotations(page, viewport, annotationArea) {
    return page.getAnnotations().then(function (annotationsData) {
        viewport = viewport.clone({
            dontFlip: true
        });
        for (var i = 0; i < annotationsData.length; i++) {
            var data = annotationsData[i];
            if (!data || !data.hasHtml) {
                continue;
            }

            var element = PDFJS.AnnotationUtils.getHtmlElement(data);
            var rect = data.rect;
            var view = page.view;
            rect = PDFJS.Util.normalizeRect([
                rect[0],
                view[3] - rect[1] + view[1],
                rect[2],
                view[3] - rect[3] + view[1]
            ]);
            element.style.left = (rect[0]) + 'px';
            element.style.top = (rect[1]) + 'px';
            element.style.position = 'absolute';

            var transform = viewport.transform;
            var transformStr = 'matrix(' + transform.join(',') + ')';
            CustomStyle.setProp('transform', element, transformStr);
            var transformOriginStr = -rect[0] + 'px ' + -rect[1] + 'px';
            CustomStyle.setProp('transformOrigin', element, transformOriginStr);

            if (data.subtype === 'Link' && !data.url) {
                continue;
            }
            annotationArea.appendChild(element);
        }
    });
}
```

やや複雑なのでデフォルトで用意して欲しい感じもしますが、テンプレ的な感じで一度動かせれば結構色々出来そうな感じです。

pdf.jsについては公式のサンプルと以下がとても参考になります。(一部そのままでは動かなかった気がする)

- [PDF.js で遊んでみた (ページの描画，テキスト・注釈の表示など) - きちぽよ〜](http://kichipoyo.hatenablog.com/entry/2013/11/21/223527 "PDF.js で遊んでみた (ページの描画，テキスト・注釈の表示など) - きちぽよ〜")

----

pdf.js 思っている以上に普通に動いて、APIもPromiseベースだったり面白い感じだったのでPDFを使った何かを作りたい時はいじってみると楽しいと思います。

## まとめ

- [slide-pdf.js](https://github.com/azu/slide-pdf.js "slide-pdf.js")
	- pdf.jsを使ったiframeで埋め込みPDF表示ツール
- [azu/pdf-slide-html](https://github.com/azu/pdf-slide-html "azu/pdf-slide-html")
	- 上記の埋め込みツールを使ったページを吐き出すジェネレータ

今使おうと思うと、自分でslide-pdfをcloneして配置する必要があったりちょっと面倒だと思います。( [azu/pdf-slide-html](https://github.com/azu/pdf-slide-html "azu/pdf-slide-html")も雑なので使いにくい)

もっと使いやすくする pull requestなど待ってます！