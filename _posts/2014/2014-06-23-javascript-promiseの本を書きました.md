---
title: JavaScript Promiseの本を書きました
author: azu
layout: post
permalink: /2014/0623/res3943/
dsq_thread_id:
  - 2787581931
categories:
  - javascript
tags:
  - book
  - javascript
  - Promises
  - まとめ
---
<h1><a href="https://azu.github.io//promises-book/" title="JavaScript Promiseの本">JavaScript Promiseの本</a></h1>
<p><a href="https://azu.github.io//promises-book/" title="JavaScript Promiseの本">JavaScript Promiseの本</a>という無料で読める電子書籍を書きました。</p>
<p>タイトルそのままで、JavaScriptのPromiseについて書いた書籍です。</p>
<h2>書籍の目的</h2>
<p>この書籍を読むことで学べる事として、次の3つを目標にして書きました。</p>
<ul>
<li>Promiseについて学び、パターンやテストを扱えるようになる事</li>
<li>Promiseの向き不向きについて学び、何でもPromiseで解決するべきではないと知る事</li>
<li>ECMAScript6 Promiseの基本をよく学び、発展した形を自分で形成できるようになる事</li>
</ul>
<p>Promiseは、次のECMAScriptの言語仕様として策定が進められていて既に多くのブラウザに実装されています。</p>
<p>Promiseについて扱う書籍ですが、この機能は<a href="http://api.jquery.com/category/deferred-object/" title="jQuery.Deferred() method">jQuery.Deferred()</a>や<a href="https://docs.angularjs.org/api/ng/service/$q" title="AngularJS: API: $q">AngularJSの$q</a>や<a href="https://github.com/petkaantonov/bluebird" title="Bluebird">Bluebird</a>等の類似の機能が既にあるため扱ったことがあるかもしれません。</p>
<p>ECMAScript6 Promiseの機能自体は新しいものではなく、既にあるものを標準化しただけです。<br />
そのためライブラリ等を使えば今すぐ使えますし、既に使っています。</p>
<p>また、今後ブラウザに実装されるAPIとして<a href="http://www.w3.org/TR/2014/WD-service-workers-20140508/" title="Service Workers">Service Workers</a>や<a href="http://www.w3.org/TR/streams-api/" title="Streams API">Streams API</a>等、Promiseをベースしたものも出てきています。<br />
JavaScriptの非同期処理の一つのパラダイムであるため、この機会に学んでおくと他のAPIを学ぶときにも役立つかもしれません。</p>
<h2>書籍の閲覧方法</h2>
<p>この書籍は、スマートフォンも含めブラウザで見られる<a href="https://azu.github.io/promises-book/" title="JavaScript Promiseの本">HTML版</a> と <a href="https://azu.github.io//promises-book/javascript-promise-book.pdf" title="JavaScript Promiseの本 - javascript-promise-book.pdf">PDF版</a>を公開しています。</p>
<p><a href="https://azu.github.io//promises-book/" title="JavaScript Promiseの本">HTML版</a>には、表示されているサンプルコードをそのまま実行して試せる機能があるため、Promiseをサポートしてるブラウザで見るのをオススメします。<br />
ブラウザがPromiseをサポートしてなくてもPolyfillが使われるので大抵の環境で実行出来ます。</p>
<p><a href="https://azu.github.io/promises-book/"><img src="https://efcl.info/wp-content/uploads/2014/06/promise-editor.png" alt="JavaScript Promiseの本 2014 06 23 00 46 57 2014 06 23 00 47 03" title="promise-editor.png" border="0" width="600" height="335" /><br />
</a></p>
<p>FirefoxとChrome、Operaの安定版は既にPromiseをサポートしてるので、その環境で見るのがオススメです(CORSやWeb Notificationを使うサンプルが出てくるのでデスクトップブラウザだと全てを試せます)</p>
<p>この書籍のソースコードは全てGithubで公開されていて、ライセンスはCreative Commons Attribution-NonCommercialです。(コードはMIT)</p>
<ul>
<li><a href="https://github.com/azu/promises-book/" title="azu/promises-book">azu/promises-book</a></li>
<li>書籍は<a href="http://asciidoc.org/" title="AsciiDoc">AsciiDoc</a>形式で書かれています。</li>
</ul>
<p>そのため、何か問題や意見などがあったら<a href="https://github.com/azu/promises-book/issues?state=open" title="Issues · azu/promises-book">Issues · azu/promises-book</a>にIssueを立てたり、<a href="https://gitter.im/azu/promises-book" title="azu/promises-book - Gitter">azu/promises-book &#8211; Gitter</a>のチャットに書き込んだりしてくれると嬉しいです。</p>
<p>書籍のハッシュタグは<a href="https://twitter.com/search?q=%23Promise%E6%9C%AC" title="#Promise本">#Promise本</a>となっています。</p>
<p>こういう形態で書籍を公開したのは、常に書籍が更新出来るようにしたいからでもあります。<br />
そのため、今後の更新内容を受け取りたい場合は、<a href="https://github.com/azu/promises-book/releases.atom" title="Release notes from promises-book">Release notes from promises-book</a>をRSSリーダーで購読するといいかと思います。</p>
<ul>
<li><a href="https://github.com/azu/promises-book/releases" title="Releases · azu/promises-book">Releases · azu/promises-book</a></li>
<li>GithubのReleaseはある程度の塊で更新内容を受け取れます。</li>
</ul>
<p>もっと細かく知りたい人は<a href="https://github.com/azu/promises-book" title="azu/promises-book">azu/promises-book</a>をWatchするといいでしょう。</p>
<h2>書籍の作り方</h2>
<p>書籍はAsciidoc形式で書いて<a href="http://asciidoctor.org/" title="Asciidoctor">Asciidoctor</a>でビルドしています。</p>
<p>また、Promiseには興味ないけど、こういう電子書籍の作りに興味があるという人は、<a href="https://gumroad.com/l/javascript-promise" title="JavaScript Promiseの本 付録">JavaScript Promiseの本 付録</a>というおまけを公開しています。</p>
<ul>
<li><a href="https://gumroad.com/l/javascript-promise"><img src="http://img.shields.io/badge/Gumroad-%C2%A50-green.svg?style=flat" alt="Gumroad" /></a></li>
<li><a href="https://gumroad.com/l/javascript-promise" title="JavaScript Promiseの本 付録">JavaScript Promiseの本 付録</a></li>
</ul>
<p>おまけ.pdfには、この書籍を書き始めた理由や、どのように書いていったか、書籍自体の自動テストやワークフローについて書かれています。<br />
Github IssueやPull Requestの活用方法について自分なりに感じた事を長々書いてた気がします。</p>
<p>Gumroadから無料 または 好きな値段でダウンロードすることが出来ます。(寄付したい人は寄付の代わりに使って下さい)</p>
<p>ダウンロードする際に作者へのメッセージも書けるので、 メッセージを残すついでにダウンロードしていってね！</p>
<p>最後に書籍の目次を貼っておきます。</p>
<h2>書籍の目次</h2>
<pre>
1. Chapter.1 - Promiseとは何か

    1.1. What Is Promise
    1.2. Promise Overview
    1.3. Promiseの書き方

2. Chapter.2 - Promiseの書き方

    2.1. Promise.resolve
    2.2. Promise.reject
    2.3. コラム: Promiseは常に非同期?
    2.4. Promise#then
    2.5. Promise#catch
    2.6. コラム: thenは常に新しいpromiseオブジェクトを返す
    2.7. Promiseと配列
    2.8. Promise.all
    2.9. Promise.race
    2.10. then or catch?

3. Chapter.3 - Promiseのテスト

    3.1. 基本的なテスト
    3.2. MochaのPromiseサポート
    3.3. 意図したテストを書くには

4. Chapter.4 - Advanced

    4.1. Promiseのライブラリ
    4.2. Promise.resolveとThenable
    4.3. throwしないで、rejectしよう
    4.4. DeferredとPromise
    4.5. Promise.raceとdelayによるXHRのキャンセル
    4.6. Promise.prototype.done とは何か?
    4.7. Promiseとメソッドチェーン
    4.8. Promiseによる逐次処理

5. Promises API Reference

    5.1. Promise#then
    5.2. Promise#catch
    5.3. Promise.resolve
    5.4. Promise.reject
    5.5. Promise.all
    5.6. Promise.race

6. 用語集
</pre>
<h2>書籍へのリンク</h2>
<ul>
<li><a href="https://azu.github.io//promises-book/" title="JavaScript Promiseの本">JavaScript Promiseの本</a></li>
<li><a href="https://github.com/azu/promises-book/" title="azu/promises-book">azu/promises-book</a></li>
</ul>
<p>おまけに書いてたような書籍を作るにあたってやったことはまた別の記事で書くと思います。</p>
