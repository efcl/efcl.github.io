---
title: "JekyllとAlfred Workflow"
author: azu
layout: post
categories:
    - Jekyll
tags:
    - Jekyll
    - Mac
    - Alfred

---

ブログをJekyllに移行してから軽くなったりしたのはいいのですが、
Wordpress + marsedit(ブログエディタ)等に作らべて不便な箇所は幾つかありました。

具体的には以下のような部分です。

- ブログエディタの定番がない
    - 好きなエディタを使えるがこれだというのが見つからない
    - 記事一覧とエディタが一緒になってて欲しい
    - 記事一覧の検索して編集とかしたい
- 画像のアップロードが面倒くさい
    - わざわざ画像フォルダにコピーして、`git add`しないといけない

これらを少しづつ改善して、今はAlfred Workflowを使って上記をカバーしています。

## 全体像

今のAlfred Workflowの全体像は以下のような感じです。

![全体像](http://efcl.info/wp-content/uploads/2014/08/2014-08-21_19-29-02.jpg)

- 全文検索
- git commit
- git push
- 画像アップロード

という感じの作ってあります。

`git`系のは正直あんまり使ってないですが、一応作った感じです。

以下から一応ダウンロードすることが出来ます

- [efcl/my-alfred-workflow](https://github.com/efcl/my-alfred-workflow "efcl/my-alfred-workflow")

## 記事の全文検索

Alfred workflowには任意のディレクトリやファイルの種類だけを検索できる[File Filter](http://support.alfredapp.com/workflows:config:inputs-file-filter "File Filter")という機能があります。

![file filter](http://efcl.info/wp-content/uploads/2014/08/21-1408616779.png)

この機能はデフォルトだとファイルの中身までは検索してくれませんが、
**Advanced** から `kMDItemTextContent` をキーに加えるとファイルの中身も検索対象に入れてくれます。

このメタデータはspotlightのインデックスと連動しているので、spotlightで拾えるものは何でも拾えます。

こうすることで全文検索してMarkdownエディタで開くという感じの事が簡単にできます。

![](http://efcl.info/wp-content/uploads/2014/08/21-1408617204.png)

## git commit

コミットGUIで差分を見ながらコミットしたい派なので、
SourceTreeでコミット画面を開くAppleScriptを書いてそれを叩くようになっています。

同梱されてるAppleScriptは以下のものと同じです。

- [コマンドラインからSourceTreeのコミット画面を開くAppleScript | Web Scratch](http://efcl.info/2014/0401/res3788/ "コマンドラインからSourceTreeのコミット画面を開くAppleScript | Web Scratch")

## git push

git pushはそのままなので省略

## 画像のアップロード

画像のアップロードはクリップボードにある画像 または 画像のパスから
特定の位置にコピーしてgit commitして、pushしたURLをクリップボードに取得するというシェルスクリプトを書いて使っています。

かなり雑な感じなので、もう少しまとな感じのツール欲しい。

クリップボードの画像バイナリをファイルとして吐き出すのに[jcsalterego/pngpaste](https://github.com/jcsalterego/pngpaste "jcsalterego/pngpaste")を使っています。

なので、先に[jcsalterego/pngpaste](https://github.com/jcsalterego/pngpaste "jcsalterego/pngpaste")をインストールしておく必要があります。

```
brew install pngpaste
```

``` sh
# baseDirからyyyy/mm/ファイル名 に配置される
baseDir="/Users/azu/Dropbox/workspace/blogs/efcl/wp-content/uploads/"
baseURL="http://efcl.info/wp-content/uploads/"

# start git
cd $baseDir
git stash save
git checkout master
# run
imagePath=`pbpaste`
uploadDir=$baseDir`date "+%Y/%m"/`
mkdir -p "$uploadDir"
if [ -n "$imagePath" ]; then
   uploadURL="$baseURL`date "+%Y/%m"`/`basename $imagePath`"
   cp "$imagePath" "$uploadDir"
else
   uploadURL="$baseURL`date "+%Y/%m/%d-%s"`.png"
   pngpaste "$uploadDir/`date "+%d-%s"`.png"
fi
echo -n $uploadURL | pbcopy

git add "$uploadDir"
git commit -m "Upload image"
git push
# end git
git checkout -
git stash pop
```

一応git stashしてからcommitする感じにしてるので、編集中のデータも多分残る感じなはずです。
(仮にアップロードに失敗しても後でpushすれば整合性取れる)


## おわりに

Alfred workflowで色々組み合わせれば、ツールを新たにつくらなくてもそれっぽいものができた感じです。
ユーザー固有の情報とかがそのまま混じってるのがイマイチですが、Jekyllでも大体更新しやすくなってきた気がします。

- [efcl/my-alfred-workflow](https://github.com/efcl/my-alfred-workflow "efcl/my-alfred-workflow")

まだブログエディタがいまいち決まってなくて[MacDown](http://macdown.uranusjr.com/ "MacDown")とかWebStormを使って書いています。

今のところだと[Markdown-Writer for Atom](https://atom.io/packages/markdown-writer " Markdown-Writer for Atom")あたりが一番良く出来てる感じがします。
カテゴリやタグを既存のデータから選んだり、記事投稿の補助機能が色々入っています。

Atomは日本語のsoft-wrapが壊滅的だったのが問題でしたが、[raccy/japanese-wrap](https://github.com/raccy/japanese-wrap "raccy/japanese-wrap")を使うと少しマシになります。
(プレビュー機能は優れてるので結構良さそうな感じがします)