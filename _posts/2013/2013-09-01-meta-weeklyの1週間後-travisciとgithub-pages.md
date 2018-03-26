---
title: Meta-Weeklyの1週間後, TravisCIとGithub Pages
author: azu
layout: post
permalink: /2013/0901/res3415/
dsq_thread_id:
  - 1685861540
categories:
  - javascript
tags:
  - github
  - javascript
---
先週、[定期更新されるJavaScript等の情報サイトをまとめたMeta-Weeklyというサイトを作りました | Web scratch][1]で、[Meta Weekly][2]というサイトを公開しました。

[Pull Requests][3] もあったりしたので、幾つかサイトが増えてたりします。

[Meta-Weekly/CONTRIBUTING.md at master · azu/Meta-Weekly][4] のガイドにしたがってPull Requestsしてもらってマージされれば、サイトの方に自動的に反映するようにしています。

その辺の仕組みは [定期更新されるJavaScript等の情報サイトをまとめたMeta-Weeklyというサイトを作りました][1] でちょろっと書いてましたが、サイトは[GitHub Pages][5]で公開されていて、

masterブランチにコミットがきたら、[Travis CI][6] で[data.json][7]でテストが走って、Travis CIから `gh-pages`ブランチに静的サイトを生成してpushしています。

Travis CIからリポジトリにpushするためには、.travis.ymlにGithubのトークンを埋め込む必要が有ります。

それを使って `https://$GH_TOKEN@github.com/$GH_REPO.git` という感じでトークンを指定したURLにすることで実現出来ます。

この方法は以下の記事などを見てやりましたが、該当記事通りにやるとGithubのトークンが、[Travis CIのコンソールに公開されてしまっている問題][8]があったのでその辺の報告とかしてました。

*   [Middleman で作った web サイトを Travis + GitHub pages でお手軽に運用する &#8211; tricknotesのぼうけんのしょ][9]
*   [using travis-ci to build using docpad, and publish to github pages][10] 

最終的に、該当の[deploy-gh-pages.sh][11]では、

    git push -fq $REPO_URL gh-pages 2> /dev/null
    

というように `--force --quiet` コンソールに余計な情報が出ないようにするという感じにしています。

手動でgit cloneする必要がある場合はそこにも `--quiet` が必要だったり、結構事故率が高そうな作りなので、もっと安全に倒した方法があるといい気がします。

*   [angular-jqm/build/update-gh-pages.sh at 4cb2d3b6eb95edfefe9995767bdcc5bb961a263f · angular-widgets/angular-jqm][12]

仕組み的には、[Drone][13]や[BuildHive][14]でも利用できると思うので色々使い道がある気がします。

* * *

*   [azu/Meta-Weekly][15]

 [1]: https://efcl.info/2013/0825/res3409/ "定期更新されるJavaScript等の情報サイトをまとめたMeta-Weeklyというサイトを作りました | Web scratch"
 [2]: http://azu.github.io/Meta-Weekly/ "Meta Weekly"
 [3]: https://github.com/azu/Meta-Weekly/pulls?direction=desc&page=1&sort=created&state=closed "Pull Requests · azu/Meta-Weekly"
 [4]: https://github.com/azu/Meta-Weekly/blob/master/CONTRIBUTING.md "Meta-Weekly/CONTRIBUTING.md at master · azu/Meta-Weekly"
 [5]: http://pages.github.com/ "GitHub Pages"
 [6]: https://travis-ci.org/azu/Meta-Weekly "Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community"
 [7]: https://github.com/azu/Meta-Weekly/blob/master/data.json "data.json"
 [8]: http://tricknotes.hateblo.jp/entry/2013/08/27/230154 "Token"
 [9]: http://tricknotes.hateblo.jp/entry/2013/06/17/020229 "Middleman で作った web サイトを Travis + GitHub pages でお手軽に運用する - tricknotesのぼうけんのしょ"
 [10]: https://gist.github.com/bewest/6100033 "using travis-ci to build using docpad, and publish to github pages"
 [11]: https://github.com/azu/Meta-Weekly/blob/ed60551bf690eb3817a1bc32cf8dbc2c0a15f5cc/script/deploy-gh-pages.sh#L29 "deploy-gh-pages.sh"
 [12]: https://github.com/angular-widgets/angular-jqm/blob/4cb2d3b6eb95edfefe9995767bdcc5bb961a263f/build/update-gh-pages.sh#L12 "angular-jqm/build/update-gh-pages.sh at 4cb2d3b6eb95edfefe9995767bdcc5bb961a263f · angular-widgets/angular-jqm"
 [13]: https://drone.io/ "Drone"
 [14]: https://buildhive.cloudbees.com/ "BuildHive"
 [15]: https://github.com/azu/Meta-Weekly/ "azu/Meta-Weekly"
