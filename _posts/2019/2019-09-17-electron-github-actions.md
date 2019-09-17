---
title: "GitHub ActionsでElectronアプリのクロスプラットフォームバイナリを配布する"
author: azu
layout: post
date : 2019-09-17T20:27
category: 
tags:
    - Electron
    - GitHub
    - CI

---

[mu-epub-reader](https://github.com/azu/mu-epub-reader)というElectron製のEpubビューアを作っていて、いつもどおりバイナリの配布に困っていましたが、[GitHub Actions](https://github.com/features/actions)を使うことで簡単にできたのでメモ書きです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">英語の本を色々読もうと思ったのでepubビューア作った。<br>Oreilly MediaのSafari見てたらGoogle翻訳にまかせてしまうのが良さそうと思って、epub.jsを使ったElectronアプリにしてみた。<br>ざっくり眺めるのに便利な気がする。<a href="https://t.co/ZA0Urh2JTj">https://t.co/ZA0Urh2JTj</a> <a href="https://t.co/qMtISN5Y64">pic.twitter.com/qMtISN5Y64</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1172715232059256833?ref_src=twsrc%5Etfw">September 14, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## GitHub Actionsの設定

[.github/workflows/electron.yml](https://github.com/azu/mu-epub-reader/blob/master/.github/workflows/electron.yml)を見るのが早いですが次のような設定をしています。

<script src="https://gist.github.com/azu/673426500458f63f019c8f5e013f282a.js"></script>

`yarn run dist`は[package.json](https://github.com/azu/mu-epub-reader/blob/2185a7a810e70e8870a7f39cc1d72e54887dfb82/package.json#L34-L41)に設定した次のような[electron-builder](https://github.com/electron-userland/electron-builder)を使ったバイナリの生成するコマンドを呼び出しているだけです。

```
  "scripts": {
    "start": "electron .",
    "electron": "electron index.js",
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
  },
```

この設定だけでWindow/Linux/macOSのバイナリでgit tagで[リリースごと](https://github.com/azu/mu-epub-reader/releases)に自動的にアップロードされます。
またGitHub Actionsには成果物をアップロードできる[artifacts](https://help.github.com/en/articles/persisting-workflow-data-using-artifacts)機能があるため、コミットごとにバイナリを生成してアップロードできます。(Canary Releaseみたいのも簡単にできる。)

[![artifactの例](https://efcl.info/wp-content/uploads/2019/09/17-1568720122.png)](https://github.com/azu/mu-epub-reader/commit/2185a7a810e70e8870a7f39cc1d72e54887dfb82/checks)

artifactへのアップロードは[actions/upload-artifact](https://github.com/actions/upload-artifact)で行っています。
GitHub Releaseへのアップロードは[softprops/action-gh-release](https://github.com/softprops/action-gh-release)で行っています。
どちらも、指定ディレクトリのファイルをアップロードするだけなので単純です。

GitHub Actionsにはリポジトリに紐づくトークンが自動的に発行されて[secrets.GITHUB_TOKEN](https://help.github.com/en/articles/virtual-environments-for-github-actions#github_token-secret)という変数で取得できます。
これを使うことでGitHub ActionsからGitHub APIを使ってGitHub Releasesにバイナリをアップロードしています。


## おわりに

今回設定したクロスプラットフォームビルドがだいたい5分以内にアップロードまで終わるので、今まで他のCIでやってたより大分楽になりました。
GitHub Tokenの生成と設定が不要な点も大きいです。

[electron-builder](https://github.com/electron-userland/electron-builder)自体が、GitHub Actionsをサポートしたらもう少し楽になると思います。

- [Support GITHUB_TOKEN provided by GitHub Actions · Issue #4176 · electron-userland/electron-builder](https://github.com/electron-userland/electron-builder/issues/4176)
