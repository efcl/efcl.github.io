---
title: Githubでnpmのpackage.jsonに書いてある依存モジュールを表示するGreasemonkey
author: azu
layout: post
permalink: /2012/1209/res3166/
dsq_thread_id:
  - 965742889
categories:
  - Greasemonkey
tags:
  - Firefox
  - Greasemonkey
---
最近のJavaScript関連のものは、配布やテスト等諸々のために[npm&#8217;s package.json][1]がレポジトリに一緒に置いてあることが増えてきていると思います。

その中でJavaScriptで書かれたツールでは[Esprima][2]や[socket.io][3]等のモジュールが[package.json][1]のdependenciesに含まれていると、  
どのような特性を持っているかなどが分かりやすくなるのでそれをGithubのレポジトリページに表示するGreasemonkeyスクリプトを書きました。

* [azu/github-display-package-dependencies](https://github.com/azu/github-display-package-dependencies "azu/github-display-package-dependencies")


[yahoo/istanbul · GitHub][5]

[][5]<img title="Githubでnpmのpackage.jsonに書いてある依存モジュールを表示するGreasemonkey 2012-12-09 23-07-31.png" src="http://efcl.info/wp-content/uploads/2012/12/2e4d286ae701be5bae4155bd8fd1ed4d.png" border="0" alt="Githubでnpmのpackage jsonに書いてある依存モジュールを表示するGreasemonkey 2012 12 09 23 07 31" width="600" height="174" />

上記のように、[package.json][1]のdependenciesを取り出してきて一覧表示しています。  
リンク先は[npm][6]のモジュールごとへのリンクとなっています。

仕組み的には[Trees API][7] -> package.jsonを見つける ->  [Repo Contents API][8] -> package.jsonからdependenciesを取り出す  
というような感じです。

意外と便利な感じがするので、.gitmoduleとか他のパッケージ管理とかも同じように対応できたらおもしろいような気がします。

*   [azu/github-display-package-dependencies · GitHub][9]

 [1]: https://npmjs.org/doc/json.html
 [2]: http://esprima.org/
 [3]: https://npmjs.org/package/socket.io "socket.io"
 [4]: http://userscripts.org/scripts/show/153740
 [5]: https://github.com/yahoo/istanbul
 [6]: https://npmjs.org/
 [7]: http://developer.github.com/v3/git/trees/
 [8]: http://developer.github.com/v3/repos/contents/
 [9]: https://github.com/azu/github-display-package-dependencies
