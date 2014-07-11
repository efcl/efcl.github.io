---
title: JSオジサンで現在のJavaScript ASTについて発表してきた
author: azu
layout: post
permalink: /2014/0328/res3756/
dsq_thread_id:
  - 2524885631
categories:
  - javascript
  - イベント
tags:
  - ECMAScript
  - javascript
  - イベント
---
# JSオジサン

[JSオジサン #1 : ATND][1] に参加してきたのでメモ。

*   [JSオジサン #1 &#8211; Togetterまとめ][2]
*   [【イベントレポート】JSオジサン#1が無事に終わりました。たくさんのご来場、本当にありがとうございました！ &#8211; 金髪DEV][3]

* * *

<div class="kwout" style="text-align: center;">
  <a href="http://azu.github.io/slide/JSojisan/"><img src="http://kwout.com/cutout/m/q7/88/pmv.jpg" alt="http://azu.github.io/slide/JSojisan/" title="カジュアルJavaScript AST" width="600" height="417" style="border: none;" usemap="#map_mq788pmv" /></a></p> <p>
    <a href="http://azu.github.io/slide/JSojisan/">カジュアルJavaScript AST</a></div> <p>
      自分はJavaScript ASTについて発表してきた。
    </p>
    
    <ul>
      <li>
        JavaScript ASTの現在
      </li>
      <li>
        簡単なAST概要
      </li>
      <li>
        実際に使われてるツールを見て
      </li>
      <li>
        ASTを使ってツールを書いてみる話
      </li>
    </ul>
    
    <p>
      等について書かれています。
    </p>
    
    <h2>
      「LTおじさんの歴史『人はなぜLTをするのか』」 &#8211; @kyo_ago
    </h2>
    
    <blockquote>
      <p>
        <a href="http://0-9.sakura.ne.jp/pub/lt/JSOjisan/start.html" title="LTおじさんの歴史『人はなぜLTをするのか』 #jsオジサン">LTおじさんの歴史『人はなぜLTをするのか』 #jsオジサン</a>
      </p>
    </blockquote>
    
    <ul>
      <li>
        LTオジサンの歴史
      </li>
      <li>
        週に2回ぐらいLTをしてる
      </li>
      <li>
        2007年 <ul>
          <li>
            YAPC とかで LTを知る
          </li>
        </ul>
      </li>
      
      <li>
        2008年 <ul>
          <li>
            会社の技術ブログ
          </li>
          <li>
            作ったのに放置されてたので技術ブログに書いた
          </li>
        </ul>
      </li>
      
      <li>
        2008-9年 <ul>
          <li>
            jQuery関連記事でブクマがつくのが嬉しくて週一ぐらい書いてた
          </li>
          <li>
            まだ参加者ぐらい
          </li>
        </ul>
      </li>
      
      <li>
        2010-2011 <ul>
          <li>
            二ヶ月に1回ぐらい各種イベントでLTするようになった
          </li>
          <li>
            Web+DB Pressに記事を書く
          </li>
          <li>
            Twitter を初めて記事を書かなくなった
          </li>
        </ul>
      </li>
      
      <li>
        2012-2013 <ul>
          <li>
            各種イベントに読んでいただるようになる
          </li>
          <li>
            長い時間話すと失敗する
          </li>
          <li>
            LTで分割して話すように成る
          </li>
        </ul>
      </li>
      
      <li>
        なぜLTをするのか <ul>
          <li>
            長い時間を話すのが苦手
          </li>
          <li>
            技術力アピールしなくて済むから
          </li>
        </ul>
      </li>
    </ul>
    
    <hr />
    
    <h2>
      「初学者に JS を教える事について」 &#8211; hebikuzure
    </h2>
    
    <blockquote>
      <p>
        <a href="http://www.slideshare.net/hebikuzure/j-sojisan" title="初学者にJavaScriptを教えてみた">初学者にJavaScriptを教えてみた</a>
      </p>
    </blockquote>
    
    <ul>
      <li>
        仕事の依頼 <ul>
          <li>
            初学者にJavaScript/HTML/CSSを教える
          </li>
        </ul>
      </li>
      
      <li>
        期間は4ヶ月 <ul>
          <li>
            テキストは書き起こしてる
          </li>
        </ul>
      </li>
      
      <li>
        難しい点1 <ul>
          <li>
            データ型って何? という話になる
          </li>
        </ul>
      </li>
      
      <li>
        難しい点2 <ul>
          <li>
            プリミティブとオブジェクトの違いについて
          </li>
        </ul>
      </li>
      
      <li>
        難しい点3 <ul>
          <li>
            DOMアクセス
          </li>
          <li>
            アクセス方法がいろいろあるのでやりにくい
          </li>
        </ul>
      </li>
      
      <li>
        難しい点4 <ul>
          <li>
            コンテンツの動的生成
          </li>
        </ul>
      </li>
      
      <li>
        困り事 <ul>
          <li>
            IDEを使うべきか
          </li>
          <li>
            最初に手入力でコーディングスタイルを意識したほうがいい?
          </li>
          <li>
            ある程度複雑になるとIDEがあったほうがいい
          </li>
        </ul>
      </li>
      
      <li>
        こまりごと2 <ul>
          <li>
            どの段階からJavaScriptライブラリを使うか?
          </li>
        </ul>
      </li>
      
      <li>
        こまりごと3 <ul>
          <li>
            IE8だと互換性の問題が色々
          </li>
        </ul>
      </li>
    </ul>
    
    <hr />
    
    <h2>
      「CI on client side and server side」 &#8211; @yosuke_furukawa
    </h2>
    
    <blockquote>
      <p>
        <a href="https://speakerdeck.com/yosuke_furukawa/ci-on-client-and-server" title="ci_on_client_and_server // Speaker Deck">ci_on_client_and_server // Speaker Deck</a>
      </p>
    </blockquote>
    
    <ul>
      <li>
        ぶらうざりふぁい
      </li>
      <li>
        nodeで書いてブラウザで動くコードにする
      </li>
      <li>
        そこで自動テストをどうするか?
      </li>
      <li>
        CIサービスが色々
      </li>
    </ul>
    
    <h3>
      Travis CI
    </h3>
    
    <ul>
      <li>
        nodeのバージョンをまたいでテストしやすい
      </li>
    </ul>
    
    <h3>
      drone.io
    </h3>
    
    <ul>
      <li>
        dockerを使った仮想環境ができる
      </li>
      <li>
        バージョンをまたいだテストは試行錯誤が必要
      </li>
    </ul>
    
    <h3>
      testling-ci
    </h3>
    
    <ul>
      <li>
        browserify + tape だと簡単にクロスブラウザのテストができる
      </li>
    </ul>
    
    <h3>
      zuul + saucelabs
    </h3>
    
    <ul>
      <li>
        ブラウザをまたいだテストをsaucelabsで動かせる
      </li>
      <li>
        並列で動くので早い
      </li>
      <li>
        複数プロジェクトがだるい
      </li>
      <li>
        バッジがダサい
      </li>
    </ul>
    
    <hr />
    
    <h2>
      「SourceMap について」 &#8211; 今屋雄太
    </h2>
    
    <blockquote>
      <p>
        <a href="http://presentboldly.com/imaya/source-map" title="">Source Map について</a>
      </p>
    </blockquote>
    
    <ul>
      <li>
        JSON形式
      </li>
      <li>
        開発者ツールなどと連携する対応表 <ul>
          <li>
            altjs
          </li>
          <li>
            minigy する前のコード
          </li>
        </ul>
      </li>
      
      <li>
        最近はCSSでも対応 <ul>
          <li>
            Firefox 29+
          </li>
          <li>
            Chrome 27+
          </li>
        </ul>
      </li>
      
      <li>
        SourceMapがあるとうれしい <ul>
          <li>
            開発中のウェブアプリ
          </li>
          <li>
            コードリーディング
          </li>
        </ul>
      </li>
      
      <li>
        SourceMapの難所 <ul>
          <li>
            jQuery.minのがmapファイルが404になる
          </li>
          <li>
            mapファイルも一緒に設置しないと行けないのが忘れられる
          </li>
          <li>
            ソースコードが書き換わると不整合がある
          </li>
          <li>
            他のファイルを参照するときにミスが起きてるケースがある
          </li>
          <li>
            => sourcemapを埋め込む事で解決できる
          </li>
        </ul>
      </li>
      
      <li>
        SourcemapをDataURLにして埋め込むだけ
      </li>
      <li>
        SourceMapにソースコードを埋め込む <ul>
          <li>
            <code>sourcesContent</code> に 文字列として入れる
          </li>
          <li>
            <code>sources</code> と位置を合わせて、ファイルの中身を <code>sourcesContent</code>に文字列として入れる事ができる
          </li>
          <li>
            <code>sources</code> にDataURLを入れても動く
          </li>
        </ul>
      </li>
      
      <li>
        Sourcemapを配布する選択肢 <ul>
          <li>
            すべて1ファイルにして配布 <ul>
              <li>
                jsとmapの不整合がおきない
              </li>
              <li>
                必要ない人もダウンロードしてしまう
              </li>
            </ul>
          </li>
          
          <li>
            jsとmapを分けて配布 <ul>
              <li>
                分割ダウンロード
              </li>
              <li>
                jsとmapの不整合が起きる可能性がでる
              </li>
            </ul>
          </li>
        </ul>
      </li>
      
      <li>
        SourceMap 応用編 <ul>
          <li>
            SourceMapに求人情報埋め込む
          </li>
          <li>
            変換前のソースコードにコメント形式で書く <ul>
              <li>
                Chromeだと文字化けする
              </li>
            </ul>
          </li>
          
          <li>
            変換後のSourceMapにDataURLで打ち込む <ul>
              <li>
                <code>sources</code> にはなんでも入れることができる
              </li>
              <li>
                マッピングがずれるので末尾に入れる
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    
    <hr />
    
    <h2>
      「node-webkit ＆ chrome-remote-interfaceでブラウザオートメーション」 &#8211; ぁゃぴ
    </h2>
    
    <blockquote>
      <p>
        <a href="http://ayapi.github.io/posts/jsojisan1/" title="JSオジサン＃1 LT「node-webkitとchrome-remote-interfaceでブラウザオートメーション」 - ayapi.github.io">JSオジサン＃1 LT「node-webkitとchrome-remote-interfaceでブラウザオートメーション」 &#8211; ayapi.github.io</a>
      </p>
    </blockquote>
    
    <ul>
      <li>
        node-webkit
      </li>
      <li>
        自動化できる仕事をnode-webkitでやる
      </li>
      <li>
        バンドルして配布出来る
      </li>
      <li>
        ブラウザオートメーションにおけるnode-webkiの優位性 <ul>
          <li>
            分かりやすい見た目を作れる
          </li>
          <li>
            npmを使える
          </li>
          <li>
            Same-Origin Policyが適応されないので自由
          </li>
        </ul>
      </li>
      
      <li>
        他の技術 <ul>
          <li>
            seleniumはUI的な自動テスト
          </li>
          <li>
            HTTPヘッダをテストに使うとかがしにくい
          </li>
        </ul>
      </li>
      
      <li>
        同期的な遷移の状態判定 <ul>
          <li>
            node-webkitでHTTPヘッダを見て遷移が上手くいってるとかやりたい
          </li>
          <li>
            Chrome Remote Debugging Protocolを使って上手くやる
          </li>
          <li>
            node-webkitから<a href="https://github.com/cyrus-and/chrome-remote-interface" title="chrome-remote-interface">chrome-remote-interface</a> で使える
          </li>
          <li>
            より詳細なHTTPヘッダとかの情報を得られるので自動化に役立つ
          </li>
        </ul>
      </li>
    </ul>
    
    <hr />
    
    <h2>
      「カジュアルJavaScript AST」 &#8211; azu
    </h2>
    
    <p>
      <a href="http://azu.github.io/slide/JSojisan/" title="カジュアルJavaScript AST">カジュアルJavaScript AST</a>
    </p>
    
    <p>
      JavaScript ASTについて発表
    </p>
    
    <hr />
    
    <h2>
      「なぜ html の form は PUT / DELETE をサポートしないのか？」 &#8211; Jxck
    </h2>
    
    <ul>
      <li>
        HTML5 <ul>
          <li>
            form に <code>PUT</code> や<code>DELETE</code> がない
          </li>
          <li>
            そんなものはいらない
          </li>
        </ul>
      </li>
      
      <li>
        XForm <ul>
          <li>
            XMLでよりリッチなフォームへ
          </li>
          <li>
            XHTMLはXFormを組み込む予定だった
          </li>
        </ul>
      </li>
      
      <li>
        HTML4.01 <ul>
          <li>
            method に <code>PUT</code> や <code>DELETE</code> がない
          </li>
          <li>
            何故?
          </li>
          <li>
            謎が多い
          </li>
          <li>
            セキュリティ問題
          </li>
          <li>
            Formのaction属性は静的
          </li>
        </ul>
      </li>
      
      <li>
        まだ調査中
      </li>
    </ul>
    
    <p>
      つづきはウェブで
    </p>
    
    <blockquote>
      <p>
        <a href="http://jxck.hatenablog.com/entry/why-form-dosent-support-put-delete" title="なぜ html の form は PUT / DELETE をサポートしないのか？ - Block Rockin’ Codes">なぜ html の form は PUT / DELETE をサポートしないのか？ &#8211; Block Rockin’ Codes</a>
      </p>
    </blockquote>
    
    <hr />
    
    <h2>
      ぼくの考えるオジサン的JavaScript &#8211; saneyuki
    </h2>
    
    <blockquote>
      <p>
        <a href="http://www.slideshare.net/saneyuki/jsojisan" title="JSオジサン#1で飛び込みLTしてきた">JSオジサン#1で飛び込みLTしてきた</a>
      </p>
    </blockquote>
    
    <ul>
      <li>
        MozillaのJavaScript <ul>
          <li>
            180万行のJavaScript(テストケース)
          </li>
          <li>
            特権APIを持ってる
          </li>
          <li>
            大規模JavaScriptのユースケース
          </li>
        </ul>
      </li>
    </ul>
    
    <hr />
    
    <h2>
      「5分で挑戦！JSクイズ」 &#8211; @TAKESAKO
    </h2>
    
    <ul>
      <li>
        ESオジサン
      </li>
      <li>
        http://ecma262.info/
      </li>
    </ul>
    
    <hr />
    
    <h2>
      「最高のUX」 &#8211; はまちや2
    </h2>
    
    <ul>
      <li>
        おじさん寄りの話
      </li>
      <li>
        おっぱぶ に学ぶUI
      </li>
    </ul>
    
    <hr />
    
    <p>
      メモ: Markdown Life
    </p>
    
    <p>
      懇談会はHTTP2.0とかMITMとかおじさん In The Middleとか、ネットワークの話とかソフトウェアルーター書きたいとかそういう話だった。
    </p>

 [1]: http://atnd.org/events/48368 "【満員御礼！】JSオジサン #1 : ATND"
 [2]: http://togetter.com/li/648396 "JSオジサン #1 - Togetterまとめ"
 [3]: http://kinpatsu-dev.hatenablog.com/entry/2014/03/29/124640 "【イベントレポート】JSオジサン#1が無事に終わりました。たくさんのご来場、本当にありがとうございました！ - 金髪DEV"