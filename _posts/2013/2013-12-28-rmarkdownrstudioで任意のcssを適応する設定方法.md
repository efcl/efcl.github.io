---
title: RMarkdown/RStudioで任意のCSSを適応する設定方法
author: azu
layout: post
permalink: /2013/1228/res3565/
dsq_thread_id:
  - 2077631923
categories:
  - R言語
tags:
  - Markdown
  - R言語
---
R言語のIDEである[RStudio][1]ではR言語に特化した[R Markdown][2]というMarkdownの拡張が使えますが、  
このプレビューで表示されるHTMLはデフォルトだとちょっと味気ない感じです。

## RStudioのプレビューCSSを変更する

RStudioからのRmd(RMarkdown)のプレビューのカスタム方法は以下に書いてあります。

*   [Customizing Markdown Rendering][3]

これを参考に以下のようにオプションを設定すれば、プレビュー時に使われてるmarkdownパッケージのオプションに渡せるようです。

    options(rstudio.markdownToHTML = function(inputFile, outputFile) {      
        require(markdown)
        markdownToHTML(inputFile, outputFile, stylesheet='~/.R/my.css')   
      }
    )
    

コンソールに上記の設定をすれば、次回のプレビューから反映されますが永続化されないので、  
`.Rprofile` に追加すれば毎回実行されるようになります。

<img src="https://efcl.info/wp-content/uploads/2013/12/RStudio-Preview-HTML-2013-12-28-16-43-21.jpg" alt="RStudio Preview HTML 2013 12 28 16 43 21" title="RStudio: Preview HTML 2013-12-28 16-43-21.jpg" border="0" width="600" height="383" />

## markdownパッケージの場合

markdown自体にはstylesheetを設定するオプションもあるので、RStudioからではなく普通にスクリプトから利用する場合は、以下のように設定することが出来ます。

    options(markdown.HTML.stylesheet="~/.R/my.css")
    

*   [markdown.pdf][4]

自分は以下のような感じの `.Rprofile` を使ってます。

 [1]: http://www.rstudio.com/ "RStudio"
 [2]: http://www.rstudio.com/ide/docs/authoring/using_markdown "R Markdown"
 [3]: http://www.rstudio.com/ide/docs/authoring/markdown_custom_rendering "Customizing Markdown Rendering"
 [4]: http://cran.r-project.org/web/packages/markdown/markdown.pdf "markdown.pdf"
