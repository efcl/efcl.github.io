---
title: お手軽にCocoaPodsでライブラリを公開する(podspecをPull Requestする手順)
author: azu
layout: post
permalink: /2013/1003/res3440/
dsq_thread_id:
  - 1821039199
categories:
  - iOS
tags:
  - CocoaPods
  - iOS
---
## CocoaPodsでのライブラリ公開

Objective-Cなライブラリは[CocoaPods][1]にてインストールする事が殆どですが、  
[CocoaPods][1] でライブラリを公開するにはライブラリの定義ファイルである[podspec][2]を、  
[CocoaPods/Specs][3]にPullRequestして取り込んで貰う必要があります。

[Contributing to the master repo · CocoaPods/CocoaPods Wiki][4] の手順に乗っ取って普通に手動でやっても問題無いですが、更新の度にやるのは結構面倒です。

そこで、CocoaPodsのサブコマンドの `pod push` をつかってやる手順についての記事です。

## pod push

必要なもの

*   CocoaPods
*   [github/hub][5]

`pod help push` で見るとわかりますが、`pod push` は単純に指定したspecファイルをlintにかけて、gitリポジトリ(REPO)にpushしてくれるコマンドです。

    $ pod push REPO [NAME.podspec]
    
      Validates NAME.podspec or `*.podspec' in the current working dir, creates
      a directory and version folder for the pod in the local copy of
      REPO (~/.cocoapods/repos/[REPO]), copies the podspec file into the version
      directory, and finally it pushes REPO to its remote.
    

デフォルトだと、`~/.cocoapods/repos/[REPO]` には master しか無いと思うので、自分用の [REPO] ディレクトリを追加していきます。

既に、Github上に[azu/Specs][6]のようなforkしたリポジトリがあるなら以下のような感じに下準備します。  
(**azu** は各自適当に)

<div class="highlight">
  <pre><span class="c"># ~/.cocoapods/repos/ で行う</span>
<span class="c"># forkした CocoaPods/Specs を 適当な名前(今回はazu)のディレクトリにcloneしてくる。</span>
<span class="c"># cloneしたら、remoteにCocoaPods/Specsも追加しておく(pull-request用)</span>
<span class="nb">cd</span> ~/.cocoapods/repos/
git clone git@github.com:azu/Specs.git azu <span class="o">&&</span> <span class="nb">cd </span>azu <span class="o">&&</span> hub remote add CocoaPods/Specs
</pre>
</div>

<!--git clone git@github.com:azu/Specs.git azu &#038;&#038; cd azu &#038;&#038; hub remote add CocoaPods/Specs-->

そして、追加したい podspecがあるディレクトリに行って、以下のような感じで、[azu/Specs][6] への  
podspecをコミット -> push -> [CocoaPods/Specs][3] へpullrequestします。

( `--git-dir=`で指定してるのは、各自追加した自分の[REPO]です)

<div class="highlight">
  <pre><span class="c"># 追加したいpodspecをまず自分のリポジトリにpushする</span>
pod push azu 追加したい.podspec
<span class="c"># 自分のリポジトリをpullrequestする</span>
hub --git-dir<span class="o">=</span>/Users/azu/.cocoapods/repos/azu/.git pull-request -b CocoaPods:master -h master
</pre>
</div>

後は、PullRequestの文章を入力すれば、[CocoaPods/Specs][3]へPullRequestされて、取り込まれればCococaPodsでの公開は完了です。

podspecを指定して自動的にルールに従った配置に追加してpushするコマンドとして、[cocoapods-publisher][7]というのもありますが、 `pod push` の方がLintも書けてくれて公式のコマンドなので、こちらを利用したほうがいいでしょう。

## おまけ

CocoaPods経由でインストールするには必ずしもCocoaPodsにPull Requestして取り込んで貰う必要はなくて、野良リポジトリでも問題無く出来ます。

やり方は色々ありますが、シンプルでやりやすいのは、[azu/AZDateBuilder][8] のように Gitリポジトリのルートに `podspec` ファイルを配置して、以下のように `:git` シンボルを指定するだけでインストールできます。  
(毎回ダウンロードが走りますが)

<pre>pod 'AZDateBuilder', :git => 'https://github.com/azu/AZDateBuilder.git'
</pre>

*   [Objective-C &#8211; CocoaPodsでPodの利用＆作成のメモ &#8211; Qiita [キータ]][9]

 [1]: http://cocoapods.org/ "CocoaPods"
 [2]: http://docs.cocoapods.org/specification.html "specification"
 [3]: https://github.com/CocoaPods/Specs "CocoaPods/Specs"
 [4]: https://github.com/CocoaPods/CocoaPods/wiki/Contributing-to-the-master-repo "Contributing to the master repo · CocoaPods/CocoaPods Wiki"
 [5]: https://github.com/github/hub "github/hub"
 [6]: https://github.com/azu/Specs "azu/Specs"
 [7]: https://github.com/devboy/cocoapods-publisher "cocoapods-publisher"
 [8]: https://github.com/azu/AZDateBuilder "azu/AZDateBuilder"
 [9]: http://qiita.com/makoto_kw/items/edf758a67bd4c2ba5b7a "Objective-C - CocoaPodsでPodの利用＆作成のメモ - Qiita [キータ]"