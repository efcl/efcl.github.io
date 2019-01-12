---
title: "LICENSEファイルを生成するコマンドラインツールを書いた"
author: azu
layout: post
date : 2019-01-12T10:25
category: Rust
tags:
    - Rust
    - CLI

---



[license-generator](https://github.com/azu/license-generator)という`LICENSE`ファイルを作成するコマンドラインツールを作りました。

- [azu/license-generator: A Command line tool that generate `LICENSE` file.](https://github.com/azu/license-generator)

機能的にはいくつかのライセンスから選んで、該当の`LICENSE`ファイルを生成して現在ディレクトリに出力するだけです。

現在は次のライセンスをサポートしています

- [AGPL-3.0](http://www.gnu.org/licenses/agpl-3.0)
- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [CC0-1.0](http://creativecommons.org/publicdomain/zero/1.0/)
- [GPL-3.0](http://www.gnu.org/licenses/gpl-3.0)
- [LGPL-3.0](http://www.gnu.org/licenses/lgpl-3.0)
- [MIT](https://opensource.org/licenses/MIT)
- [MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/)
- [Unlicense](http://unlicense.org/)

## インストール

Rustで書いたCLIなので[Cargo](https://crates.io/)でインストールします

```sh
cargo install license-generator
```

## 使い方

```
$ license-generator --author <name> [LICENSE_TYPE]

[LICENSE_TYPE]:
- AGPL
- Apache
- CC0
- GPL
- LGPL
- MIT
- MPL
- Unlicense

Options:
  --author input author name
```

MITライセンスでライセンスを作成するなら、次のような感じでコマンドを叩くだけです。

```
license-generator MIT --author azu
```

## おわりに

[The Rust Programming Language](https://doc.rust-jp.rs/book/second-edition/)読みながらRust勉強してる感じだとそんなに難しくは感じないけど、実際にアプリを書くとハマる系の言語だと思ったので、とりあえず何か書くために[license-generator](https://github.com/azu/license-generator)を書いてみた。

元々Rubyで書かれてた[license-generator](https://github.com/blaix/license-generator/)を使ってたのだけど、ランタイム言語がいらないものに書き換えたくてライセンスジェネレータを選んだ。

でもバイナリの配布方法とインストール方法(`curl | sh`みたいのとか)を簡単にやる方法(設定自体がめんどい)で簡単な方法がわからなくて`cargo install`になってる。

[Cargo](https://doc.rust-lang.org/cargo/)はできがいいんだけど、パッケージにnamespaceがなかったり、結構いい名前が既に更新されてないパッケージになってたりその辺ちょっと気になった。

- [crates.io: Package Groups · Issue #975 · rust-lang/cargo](https://github.com/rust-lang/cargo/issues/975 "crates.io: Package Groups · Issue #975 · rust-lang/cargo")
- [Crates.io package policies - internals / policy - Rust Internals](https://internals.rust-lang.org/t/crates-io-package-policies/1041 "Crates.io package policies - internals / policy - Rust Internals")
- [Cargo crate name reservation spam : rust](https://www.reddit.com/r/rust/comments/9aaanw/cargo_crate_name_reservation_spam/ "Cargo crate name reservation spam : rust")

あと、`cargo publish`する際にバージョンを手動で変更するのが大変なので、`npm version {patch,minor,major}`相当のやつか[np](https://github.com/sindresorhus/np)や[release-it](https://github.com/webpro/release-it)みたいなインタラクティブリリースするやつが欲しくて探したけど見つからなかった。

- [cargo-version-cli - Cargo: packages for Rust](https://crates.io/crates/cargo-version-cli "cargo-version-cli - Cargo: packages for Rust")
- [cargo-bump - Cargo: packages for Rust](https://crates.io/crates/cargo-bump "cargo-bump - Cargo: packages for Rust")
- [sunng87/cargo-release: Cargo subcommand "release": everything about releasing a rust crate.](https://github.com/sunng87/cargo-release)

[cargo-release](https://github.com/sunng87/cargo-release)は近いのだけど、バージョンを上げてpublishするのではなくて、devをcurrentにしてpublishするワークフローになっていて、次の開発バージョンを最初から決めておかないとできないワークフローになっていて少し違うものだった。

1. pre-version
2. `npm version {patch, minor, major}` # バージョン更新 & git tag
3. post-version
4. publish

というフローがしたかったけど、そういうcargoサブコマンドとかないのかな? というのがパッケージを公開する作業やってて思った疑問だった。

ドキュメントは翻訳(最新ではないけど)とかあったり、Cargoがテンプレ生成から実行/テスト、公開までプログラミングで面倒な部分を全部やってくれるので導入は楽だった。

- [Home | Rustの日本語ドキュメント/Japanese Docs for Rust](https://doc.rust-jp.rs/)

あとRustのライブラリはマルチライセンスのパターンがやたら多い(Rustがそうだから?)ので、複数ライセンスの生成に対応とかするといいのかもしれない。

Pull Reuqest待っています。

```
license-generator MIT Apache --author azu
```

## 参考

- [An I/O Project: Building a Command Line Program - The Rust Programming Language](https://doc.rust-lang.org/book/ch12-00-an-io-project.html)
- [入出力プロジェクト: コマンドラインプログラムを構築する - The Rust Programming Language](https://doc.rust-jp.rs/book/second-edition/ch12-00-an-io-project.html)
- [Command Line Toolを作ってみる in Rust - Qiita](https://qiita.com/watawuwu/items/b20abfae62f76e4b4c0c)
