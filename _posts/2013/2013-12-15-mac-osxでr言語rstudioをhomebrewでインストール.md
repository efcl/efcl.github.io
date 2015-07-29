---
title: Mac OSXでR言語(+RStudio)をhomebrewでインストール
author: azu
layout: post
permalink: /2013/1215/res3542/
dsq_thread_id:
  - 2051489064
categories:
  - R言語
  - インストール設定
tags:
  - homebrew
  - Mac
  - R言語
---
## 必要なもの

*   [Homebrew][1]
*   [brew-cask][2]

brew-caskはHomebrew本体にはない `.app` のアプリもインストール管理出来るような拡張です。

*   [みんなhomebrew-caskって知ってるか？ &#8211; Qiita [キータ]][3]

後はコマンドラインだけでインストールできます。

## インストール

以下のコマンドで、R言語とRのIDEである[RStudio][4]をインストールできます。  
(brew-caskは ~/Application/ にアプリをインストールされます)

<div class="highlight">
  <pre>brew tap homebrew/science
brew cask install xquartz
brew install r
brew cask install rstudio
</pre>
</div>

昔はrがそのままhomebrewに合ったようですが、[Homebrew-science][5]に移動してるようなので、  
最初にそれを利用できるようにして、R言語は[XQuartz][6]に依存してるので別途インストールしています。

他の環境やMacports等を利用した方法は以下を参照するといいです。

*   [R のインストール &#8211; RjpWiki][7]

<img src="http://efcl.info/wp-content/uploads/2013/12/RStudio-2013-12-15-16-30-36.jpg" alt="RStudio 2013 12 15 16 30 36" title="RStudio 2013-12-15 16-30-36.jpg" border="0" width="600" height="462" />

### Alfred

追記: `brew cask alfred` でちゃんとリンクを貼れるようになってます。

AlfredでRStudioが出てこないのはシンボリックリンクだからなようです。  
以下のように方法でAlfredにも出せると思います。

*   [Symbolic link to App not recognized &#8211; Closed &#8211; Alfred App Community Forum][8]

 [1]: http://brew.sh/ "Homebrew"
 [2]: https://github.com/phinze/homebrew-cask "brew-cask"
 [3]: http://qiita.com/ryurock/items/1432578d364985f6cb06 "みんなhomebrew-caskって知ってるか？ - Qiita [キータ]"
 [4]: http://www.rstudio.com/ "RStudio"
 [5]: https://github.com/Homebrew/homebrew-science " Homebrew-science"
 [6]: http://xquartz.macosforge.org/landing/ "XQuartz"
 [7]: http://www.okada.jp.org/RWiki/?R%20%A4%CE%A5%A4%A5%F3%A5%B9%A5%C8%A1%BC%A5%EB "R のインストール - RjpWiki"
 [8]: http://www.alfredforum.com/topic/2399-symbolic-link-to-app-not-recognized/ "Symbolic link to App not recognized - Closed - Alfred App Community Forum"
