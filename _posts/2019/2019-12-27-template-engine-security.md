---
title: "[クライアントサイド〜サーバーサイド] テンプレートエンジンでのセキュリティ的な問題や考え方"
author: azu
layout: post
date : 2019-12-27T22:05
category: イベント
tags:
    - スライド
    - JavaScript
    - テンプレート

---

この記事は次のスライドの文字起こし的な内容です。

- スライド: [クライアントサイドからサーバサイドまで破壊するテンプレートエンジンを利用した攻撃と対策](https://azu.github.io/slide/2019/template-engine/template-engine-security.html)

スライドの画像 + 喋った内容のNote的なものをそれぞれのページごとに書き込んでいます。
リンクとかはスライド版ならクリックできるので、そっちを見るといいのかもしれません。

---

## [クライアントサイドからサーバサイドまで破壊するテンプレートエンジンを利用した攻撃と対策](https://azu.github.io/slide/2019/template-engine/template-engine-security.html)

---

<!-- Page 1 -->
![クライアントサイドからサーバサイドまで破壊するテンプレートエンジンを利用した攻撃と対策- 3つのテンプレート -](https://efcl.info/wp-content/uploads/2019/template-engine-security/1.png)

テンプレートエンジンに関するセキュリティ的な問題についてのお話です。
テンプレートだからエンドユーザー(サービスの利用者)に書かせても安全だと思っていても、選んだテンプレートエンジンの性質によっては安全ではない場合があります。
また、JavaScriptのテンプレートエンジンはクライアントサイド(Browser)とサーバサイド(Node.js)どちらもで動かせるものが多いです。
そのため、クライアントサイドとサーバーサイド両方に関する問題の事例などを紹介します。


----

<!-- Page 2 -->
![自己紹介•Name : azu•Twi+er : @azu\_re•Website: Web scratch, JSer.info](https://efcl.info/wp-content/uploads/2019/template-engine-security/2.png)

自己紹介です。


----

<!-- Page 3 -->
![アジェンダ•テンプレートとは•テンプレートの種類(レベル)•テンプレートをコンパイルする場所と問題•信頼できない入力ソース: テンプレート or データモデル•Programming Language Templateの危険性](https://efcl.info/wp-content/uploads/2019/template-engine-security/3.png)

このスライドで話すことです。

まずはテンプレート(エンジン)とはなにかという話をします。

その次に、テンプレートにはいくつかの種類があり、それぞれが安全に扱える場所と安全に扱わないと起きる問題について話します。

またテンプレートは一種のプログラミング言語であるということを見ていきます。


----

<!-- Page 4 -->
![今日覚えること•テンプレートエンジンには3つのレベルがある•テンプレートエンジンのレベルとテンプレートをコンパイルする場所によって必要なセキュリティ対策は異なる•テンプレートファイルはプログラムファイルである](https://efcl.info/wp-content/uploads/2019/template-engine-security/4.png)

今日覚えておきたいことは次の3つです

- テンプレートエンジンには3つのレベルがある
- テンプレートエンジンのレベルとテンプレートをコンパイルする場所によって必要なセキュリティ対策は異なる
- テンプレートファイルはプログラムファイルである



----

<!-- Page 5 -->
![DEMO: Server Side Template Injec7on](https://efcl.info/wp-content/uploads/2019/template-engine-security/5.png)

Note: エンドユーザーがテンプレートを書いて保存することで、そのテンプレートがサーバでコンパイルされた際に任意のコードを実行できる脆弱性であるサーバサイドテンプレートインジェクションのデモをしました。

ここでは、サーバサイドでテンプレートエンジンを使ってコンパイルした結果をHTMLとして出力サービスをデモサイトに使いました。

そのデモサイトで、実行しているNode.jsから `process.env` (環境変数) をHTMLに出力して抜き出したり、`process.exit(1)` を実行させてデモサイトのプロセスを落としたりしました。


----

<!-- Page 6 -->
![テンプレートエンジン•テンプレートとデータモデル(パラメータ)を組み合わせてViewを作る処理を行うものをテンプレートエンジンと呼ぶ•テンプレートの種類が多いが、今回はWeb template system(HTML)を中心に扱う](https://efcl.info/wp-content/uploads/2019/template-engine-security/6.png)

今回扱うテンプレートエンジンについてです。

ここでは、テンプレートとデータモデル(パラメータ)を組み合わせてViewを作る処理を行うものをテンプレートエンジンと呼びます。

これは主に[Web template system](https://en.wikipedia.org/wiki/Web_template_system)(HTMLを出力する)を扱うため、このような定義にしています。


----

<!-- Page 7 -->
![3種類のテンプレートエンジン•表示とビジネスロジックを分けるのがテンプレートの目的•テンプレートエンジンには3種類のレベル分けがあると考えられる•Enforcing Strict Model-View Separa7on inTemplate Engines by Terence Parr1•Web Content Management - O'Reilly Media1 StringTemplateやANTLRの作者。30年以上パースについての研究をしている](https://efcl.info/wp-content/uploads/2019/template-engine-security/7.png)

このスライドでは、テンプレートエンジンを3種類に分けました。

この3つのレベルは、テンプレートエンジンに書くテンプレートの構文の制約で分けています。


----

<!-- Page 8 -->
![3種類(レベル)のテンプレートエンジン•Simple Token Replacement•単純な置換: This is \{\{ name \}\}. => This is pen.•Limited Control Structures•if文やfor文など制御構文が付いたもの•Programming Language•プログラミング言語みたいなもの](https://efcl.info/wp-content/uploads/2019/template-engine-security/8.png)

テンプレートエンジンを次のような3つのレベルに分けています。

- Simple Token Replacement
    - 単純な置換: `This is {{ name }}.` => `This is pen.`
- Limited Control Structures
    - if文やfor文など制御構文が付いたもの
- Programming Language
    - プログラミング言語みたいなもの

具体的なテンプレートエンジンがどれに該当するかは後ほど紹介します。
まずは、それぞれのテンプレートエンジンの種類を紹介します。


----

<!-- Page 9 -->
![Simple Token Replacement](https://efcl.info/wp-content/uploads/2019/template-engine-security/9.png)

まずは、一番単純で制約も強い Simple Token Replacement からです。


----

<!-- Page 10 -->
![Simple Token Replacement•テンプレートとデータモデルが完全に分離されている状態•単純な文字列を置換をするだけのテンプレート•特定の用途にしか使えないように厳しく制限されている•任意のコードは実行できないように制限されている状態](https://efcl.info/wp-content/uploads/2019/template-engine-security/10.png)

 Simple Token Replacementはテンプレートにロジックらしいロジックは書くことができません。

`String#replace` で実装されているようなテンプレートエンジンと考えて問題ありません。

具体的な実装を見てみたい人は、実際に書いてみたものもあるので次のライブラリを参照してください。

- [azu/simple-token-replacement-template: A reference implementation for Simple token replacement template.](https://github.com/azu/simple-token-replacement-template)


----

<!-- Page 11 -->
![Limited Control Structures](https://efcl.info/wp-content/uploads/2019/template-engine-security/11.png)

次は、ある種制限された構文も使えるようになったLimited Control Structuresです。

Simple Token Replacementの上位互換と考えて問題ありません。


----

<!-- Page 12 -->
![Limited Control Structures•テンプレートにも表示に関する制御構文を持つ•if文やfor文などの制限されたコントールフロー(構造)をもつテンプレート•logic less templateとも呼ばれる(持っているのは表示に関するロジックのみであるため)•任意のコードは実行できないように制限されている状態•evalを全く使ってないもの or evalを使っていても実行できるものをホワイリスト制限](https://efcl.info/wp-content/uploads/2019/template-engine-security/12.png)

Limited Control Structuresでは、テンプレートに if や for文のような一種の制御構文が利用できます。

あくまで表示に関する制御構文であるため、logic less templateと呼ばれることがあります(具体的にはliquidなど)

これは、ビジネスロジックは実装できないという意味でlogic lessなんだと思います。

このテンプレートエンジンの特徴としては、エンドユーザー(サービスの利用者)に書かせても任意のコード実行はできないような作りを目指しているというところにあります。

そのため、文字列からコードを実行する`eval`を原理的に使わずに書いてたり、`eval`をさせないことを目的にしたテンプレートエンジンがLimited Control Structuresに該当します。


----

<!-- Page 13 -->
![Programming Language Template](https://efcl.info/wp-content/uploads/2019/template-engine-security/13.png)

最後にProgramming Language Templateです。


----

<!-- Page 14 -->
![Programming Language Template•テンプレートにはビジネスロジックが書ける•チューリング完全な言語•何でもできる•Evalを使っていてかつなにも制限していない](https://efcl.info/wp-content/uploads/2019/template-engine-security/14.png)

Programming Language Templateは実際にただのプログラミング言語と同等レベルな高機能なテンプレートエンジンです。

Limited Control Structuresから制約を外したテンプレートエンジンと考えれば問題ありません。

このテンプレートエンジンには制約があるようでないため、エンドユーザー(サービスの利用者)に書かせるには向いていません。

エンドユーザーに書かせると、そのサーバで任意のコードが実行できるためです(これをServer Side Template Injectionとよびます)

そのため、Programming Language Templateをエンドユーザーに書かせると、サーバでコードを実行できるプラットフォームを提供しているのと同じとなります。

Programming Language Templateがどういうときに使われるかというと、開発者がウェブサイトを開発する際のテンプレートエンジンとして利用されています。

これは開発者自体は任意のコードをサービスで動かせるので、テンプレートエンジンも自由度の高いものを使うことで効率的に開発できる機能を備えているものがProgramming Language Templateに多いためです。




----

<!-- Page 15 -->
![テンプレートが言語になることもあるI would argue that PHP is a templa4ng syntax that grew into a programming language.— Web template system•PHPは言語に進化したテンプレートエンジンとも考えられる](https://efcl.info/wp-content/uploads/2019/template-engine-security/15.png)

[Web template system](https://en.wikipedia.org/wiki/Web_template_system)からの引用ですが、PHPもProgramming Language Templateから進化したものと考えていいはずです。

ejs、pug、JSX、Vue Template、Angular TemplateなどはProgramming Language Templateです。


----

<!-- Page 16 -->
![](https://efcl.info/wp-content/uploads/2019/template-engine-security/16.png)

具体的にそれぞれのテンプレートの特徴とよくある構文を見てみます。

- Simple Token Replacement
  - 制約が厳しくシンプル
  - 構文はシンプルな置換のみ
- Limited Control Structures
  - ここは中間なのでテンプレートエンジンの頑張り次第
  - 構文はよくあるテンプレート構文が多い
- Programming Language Template
  - とても自由度が高いので、何でもできます(意図してない場合もある)
  - 構文は言語に近い場合もあります


----

<!-- Page 17 -->
![テンプレートと実装•Simple Token Replacement•単純な文字列置換•Limited Control Structures•テンプレートエンジンっぽいテンプレートエンジン•HandlebarsやLiquidなど制限を意識して作られたもの•Sandboxモードが有効状態のSmartyやTwigなど(SandboxなしならProgramming Language)•Programming Language•柔軟なテンプレートエンジン、言語、UIフレームワーク•HTMLやPHP、各種UIフレームワークなど](https://efcl.info/wp-content/uploads/2019/template-engine-security/17.png)

具体的にそれぞれのテンプレートと実装のライブラリについてです。


----

<!-- Page 18 -->
![](https://efcl.info/wp-content/uploads/2019/template-engine-security/18.png)

具体的なライブラリを分けると次のようになると思います。

- Simple Token Replace
  - [azu/simple-token-replacement-template](https://github.com/azu/simple-token-replacement-template)
- Limited control structures
  - Liquid, Handlebars, StringsTemplate
- Programming Language Template
  - Nunjucks, Lodash, template, Pug, React, Angular, Vue...



----

<!-- Page 19 -->
![テンプレートのレベル•↑ほど厳密•Simple Token Replace•replace関数など単純な置換に近いもの•Limited control structures•Liquid, Handlebars, StringsTemplate•Programming Language Template•Nunjucks, Lodash, template, Pug, React, Angular, Vue...•↓ほど柔軟](https://efcl.info/wp-content/uploads/2019/template-engine-security/19.png)

ここまで紹介したテンプレートのレベルは

Simple Token Replacementほど制約が強く厳密です。
一方でProgramming Language Templateほど自由度が高く柔軟です。


----

<!-- Page 20 -->
![テンプレートエンジンって言っても...•一言にテンプレートエンジンって言っても機能の幅が広い•テンプレートエンジンのレベルごとにできることとできないことがある•テンプレートエンジンのレベルごとにセキュリティの考え方も異なる•攻撃するときにもできること、できないことが変わってくるため](https://efcl.info/wp-content/uploads/2019/template-engine-security/20.png)

このようにテンプレートエンジンとくくりでも、レベルによってかなり機能や自由度の幅があります。


そのため、テンプレートエンジンのレベルごとにどのような攻撃が起こり得るかについて話していきます。


----

<!-- Page 21 -->
![](https://efcl.info/wp-content/uploads/2019/template-engine-security/21.png)

テンプレート + データ を テンプレートエンジン が処理して View(HTMLなど) を作るというのが大まかな流れです。


----

<!-- Page 22 -->
![テンプレートをコンパイルする場所と入力ソース](https://efcl.info/wp-content/uploads/2019/template-engine-security/22.png)

最初に話してたように、テンプレートをテンプレートエンジンがコンパイルする場所は何箇所かがあります。

----

<!-- Page 23 -->
![テンプレートをどこでコンパイルするかコンテキスト: ウェブテンプレートなので、どこかでテンプレートをHTMLにコンパイルして、ブラウザでレンダリングするのは同じ•ローカル•手元でテンプレートをHTMLにコンパイルして、その結果を使う•事前にコンパイルしてその結果を使うので、オフラインコンパイルやAOT(Ahead Of Time)コンパイルと呼ばれる•ブラウザ•テンプレートとデータモデルを受け取りブラウザでコンパイルしてレンダリングする•クライアントサイドレンダリング•サーバ•テンプレートとデータモデルを使ってサーバでコンパイルしたHTMLをレスポンスとして返す•サーバサイドレンダリング](https://efcl.info/wp-content/uploads/2019/template-engine-security/23.png)

特にJavaScriptのテンプレートエンジンでは、ローカルとサーバに加えて、ブラウザ上でもテンプレートをコンパイルできます。

そのため、ここで考えるテンプレートをコンパイルする場所は次の3箇所となります。

- ローカル
- ブラウザ
- サーバ


----

<!-- Page 24 -->
![](https://efcl.info/wp-content/uploads/2019/template-engine-security/24.png)

それぞれの入力ソースとコンパイル場所とViewが生成されるタイミングの図です。

たとえば、一番上の**ローカル**でコンパイルするケースというのは、テンプレートをコンパイル済みのHTMLを配信するタイプです。
Jekyllなどのブログエンジンなどは、事前にコンパイルして静的なHTMLを配信します。
これがローカルです。

真ん中の**ブラウザ**でのコンパイルは、ブラウザからテンプレートファイルをリクエストします。
そして取得してテンプレートをブラウザ上のJavaScriptでコンパイルします。
そのため、サーバはテンプレートそのものをレスポンスとして返すだけです。

最後の**サーバ**は、よくあるウェブサービスです。
エンドユーザーがリクエストすると、そのリクエストに基づいてサーバにあるテンプレートをサーバ上でコンパイルします。
その生成物であるHTMLだけをレスポンスとして返します。


----

<!-- Page 25 -->
![入力ソース x コンパイルする場所 x テンプレートのレベル = 安全性](https://efcl.info/wp-content/uploads/2019/template-engine-security/25.png)

ここでは少し話を整理していきます。

このスライドはテンプレートの安全性についての話でして。

その安全性は

```
入力ソース xコンパイルする場所 x テンプレートのレベル
```

で大まかに決まってきます。
安全性というより、気をつけるポイントの数というのが合ってるかもしれません、


----

<!-- Page 26 -->
![入力ソース•テンプレートエンジンは次の２つの入力から結果を出力する•View = テンプレート + データモデル•入力として テンプレートそのもの と データモデル(パラメータ) がある•ユーザー入力(つまり任意のもの)として受け取る入力ソースによって安全レベルは変わる](https://efcl.info/wp-content/uploads/2019/template-engine-security/26.png)

ここで振り返り。

入力ソースは、テンプレートエンジンに与えるユーザー入力です。

つまり入力ソースとなり得るのは次の2つです。

- テンプレート
- データ


入力ソース = ユーザー入力と言い換えていいかもしれません。


----

<!-- Page 27 -->
![入力ソース: データモデル](https://efcl.info/wp-content/uploads/2019/template-engine-security/27.png)




----

<!-- Page 28 -->
![入力ソース: データモデル•ユーザー入力(信用できない)としてデータモデルを受け取るケース•テンプレートは信用できるという前提•多くのテンプレートエンジンはデータモデルを安全に扱う方法を持っている•簡単に言えばHTMLタグにはならないようにエスケープする方法を持ってる•そのため、データモデルに悪意あるものがあっても、結果のViewは安全を担保できる](https://efcl.info/wp-content/uploads/2019/template-engine-security/28.png)

まずは入力ソースがデータだけの状況についてです。


入力ソース = ユーザー入力としてデータを受け取ります。
基本的にユーザー入力はどんな悪意ある文字列が入ってるかわからないので信用できない入力ソースとして扱います。

一方でこのときに、テンプレートそのものは開発者が書いたもので信用できるという状況です。


----

<!-- Page 29 -->
![ユーザー入力としてデータモデルを受け取って、テンプレートをコンパイルするケースローカルブラウザサーバSimple Token Replace✔✔✔Limited control structures✔✔✔Programming Language Template✔✔✔✔: エスケープすれば問題ない](https://efcl.info/wp-content/uploads/2019/template-engine-security/29.png)

このときにそれぞれのテンプレートエンジンごとに、安全に扱えるかどうかの表です。


ユーザー入力がデータで、テンプレート自体は信用できる状態なら、どのテンプレートエンジンも安全に扱えます。

これはテンプレートエンジンがデータをエスケープするなど安全に扱う方法を持っているのが一般的であるためです。

Simple Token Replacementが単純な置換だと問題はあるかもしれませんが…


----

<!-- Page 30 -->
![データモデルのエスケープTemplate:Hello \{\{ name \}\}!DataModel:\{    "name": "<script>alert(1)</script>"\}View(結果):Hello &lt;script&gt;alert(&#39;1&#39;)&lt;/script&gt;!](https://efcl.info/wp-content/uploads/2019/template-engine-security/30.png)

具体的な例です。

データ(モデル)に何が入ってても、出力時はエスケープできているので問題なさそうです。

この例だとHTML文字列をデータとして受け取っても、エンプレートエンジンがデータをHTMLエスケープしてから出力するので、XSSにはならないという例を見ています。


----

<!-- Page 31 -->
![テンプレートエンジンのエスケープ•多くのテンプレートエンジンはデータモデル(パラメータ)の展開はデフォルトで安全•\{\{ name \}\} で name にHTMLが入ってもエスケープして出力する•=> データモデルにHTMLが入ってても、HTMLではなくただの文字列として扱われる•細かく言うと、パラメータが入る場所によってエスケープ方法は異なる•そのため、Contextual Escaping(href属性はjavascript:もエスケープするなど)をサポートしているかによって安全性に多少のブレがある](https://efcl.info/wp-content/uploads/2019/template-engine-security/31.png)

テンプレートエンジンの基本的な機能として何かしらのエスケープ機能は備わっていると思います。

一番単純なHTMLエスケープから、属性値に指定できるエスケープなどテンプレートエンジンによって様々です。

データが入る場所(Context)によってエスケープ方法が変わることをContextual Escapingと呼びますが、ここまでできているのはまだメジャーではありません。

ただし、メジャーなJavaScriptフレームワークはこの辺もサポートしていく方向に見えます。

- テンプレートエンジンの基本的な機能として何かしらのエスケープ機能は備わっていると思います。

一番単純なHTMLエスケープから、属性値に指定できるエスケープなどテンプレートエンジンによって様々です。

データが入る場所(Context)によってエスケープ方法が変わることをContextual Escapingと呼びますが、ここまでできているのはまだメジャーではありません。

ただし、メジャーなフレームワークはサポートしていくような方向に見えます。

- Angularは1.xからやっている
- Ember
- Reactもhref属性のjavascript: プロトコル対応など <https://reactjs.org/blog/2019/08/08/react-v16.9.0.html>

その他のテンプレートエンジンでもサポートしている場合があります。

ここで言いたかったのは、データモデルに信用できないデータが渡されても問題となるテンプレートエンジンは殆どないという話です。

テンプレートの主な目的なこのような利用方法なので、これで問題が起きるケースは少ないはずです。


----

<!-- Page 32 -->
![入力ソース: テンプレート](https://efcl.info/wp-content/uploads/2019/template-engine-security/32.png)

一方で、"テンプレート"そのものが入力ソースとなるケースがあります。



----

<!-- Page 33 -->
![入力ソース: テンプレート•入力ソースがテンプレートそのもの場合•ユーザーにテンプレートの構文を書かせて、それを扱う場合•ブログのテーマなど•テンプレートそのものが安全にコンパイルできるかが安全性に影響する](https://efcl.info/wp-content/uploads/2019/template-engine-security/33.png)

"テンプレート"そのものが入力ソースとなるケースとしてよくあるのは、ユーザーにテーマを書かせる機能を提供している場合です。

たとえば、はてなブログやTumblrなどのブログはテーマ機能を提供しています。
Jekyllなどもユーザーにテンプレートそのものを書かせるテーマ機能を持っています。

このような状態では、信用できないテンプレートを安全にコンパイルできるかが安全性に関わってきます。

安全にコンパイルできないと任意のコード実行が可能になります。


----

<!-- Page 34 -->
![ユーザー入力がテンプレートローカルブラウザサーバSimple Token ReplaceSafeSafeSafeLimited control structuresSafeSafeSafeProgramming Language Template⚠Danger⚠Danger⚠Danger](https://efcl.info/wp-content/uploads/2019/template-engine-security/34.png)

同じようにテンプレートエンジンのレベルごと見ていきます。

Simple Token ReplacementとLimited Control Structuresは、信用できないテンプレートをコンパイルしても問題ない作りです。
なぜならLimited Control Structuresはユーザーにテンプレートを書かせる目的を持ったテンプレートエンジンであるから(そういう定義にした)です。
また、Simple Token Replacementはevalを使ってないテンプレートエンジンなので、問題にはならないと思います。


一方で、信用できないテンプレートをProgramming Language Templateとしてコンパイルのが一番危険な状態です。




----

<!-- Page 35 -->
![ユーザー入力として受け取ったテンプレートをコンパイル•テンプレートレベルがProgramming Language Templateは安全にコンパイルするのが難しい•高度なテンプレートはプログラミング言語そのもの•コンパイル時に任意のコードが実行できてしまう => ⚠Danger](https://efcl.info/wp-content/uploads/2019/template-engine-security/35.png)

ユーザーに書かせたテンプレートをProgramming Language Templateとしてコンパイルすると、任意のコード実行が可能になるケースがあります。

ユーザーにJSXを書いてもらってサーバサイドレンダリングする場合、ユーザーにJadeを書かせてコンパイルする場合などが具体的に問題となるケースです。

これは、ユーザーにプログラムを書かせてサーバで実行すると同じ意味となります。


----

<!-- Page 36 -->
![Programming Language Templateをコンパイルする危険例: ローカル•メールでマクロ付きのWordファイルを開いて、ローカルで任意のプログラムが実行されてしまうケース•マクロはプログラムそのもの•偽装メールが再び拡散、不正マクロを仕込んだ添付ファイルでマルウエア感染：マクロウイルスの再来？ - ＠IT•デフォルトではマクロは無効化されており、オプトインで有効化になっている•Office ドキュメントのマクロを有効または無効にする - Office サポート](https://efcl.info/wp-content/uploads/2019/template-engine-security/36.png)

ユーザー入力としてProgramming Language Templateをローカル実行する例としてWordのマクロがあります。

マクロは任意のコード(exe)も実行できます。
そのため、メールで知らない人から受け取ったWordファイルを開いてマクロを実行すると、任意のコード実行がローカルで可能です。

ただし、Wordのマクロはだいたい許可しない限り実行されません。


----

<!-- Page 37 -->
![Programming Language Templateをコンパイルする危険例: ブラウザ•意図的にサーバサイドでテンプレートを作成して、クライアントサイドでレンダリングするケースは多くない•最初からサーバサイドでコンパイルしてHTMLを返せばいいだけであるため•Vue.js や AngularJS(1.x) と 古典的なサーバサイドレンダリングの組み合わせでこの問題が発生しやすい•一部だけサーバサイドでレンダリングして、クライアントサイドでレンダリング済みのHTMLを元にSPAするケース•検索ワード: Client side Template Injec1on](https://efcl.info/wp-content/uploads/2019/template-engine-security/37.png)

ユーザー入力としてProgramming Language Templateをブラウザで実行する例として、VueやAngularJSなどのテンプレート機能を持つフレームワークがあります。

これらのフレームワークでテンプレートをブラウザで実行、つまりレンダリングするのは問題ありません。

ただし、古典的なサーバサイドでのHTML出力とSPA(Single Page Application)が混ざったサイトでは、意図せずにユーザー入力であるProgramming Language Templateをコンパイルしているケースがあります。


----

<!-- Page 38 -->
![Vue + Client Side Template Injec4on•h#ps://vue-client-side-template-injec5on-example.azu.now.sh/?name=xxx•クエリのnameをサーバサイドレンダリングして、クライアントサイドはVueでアプリを作るイメージ](https://efcl.info/wp-content/uploads/2019/template-engine-security/38.png)

次のサイトは、ユーザー入力としてProgramming Language Templateを受け取ってレンダリングしてしまってるデモサイトです。

Programming Language TemplateとしてVueを利用しています。

- <https://vue-client-side-template-injection-example.azu.now.sh/?name=xxx>



----

<!-- Page 39 -->
![const express = require('express');const escapeHTML = require('escape-html');const app = express();app.get('/', (req, res) => \{  res.set('Content-Type', 'text/html');  const name = req.query.name  res.status(200).send(\`  <div id="app">    <h1>Hello $\{escapeHTML(name)\}</h1>  </div>  </footer>  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>  <script>      new Vue(\{        el: '#app'      \});  </script>\`);\});module.exports = app;](https://efcl.info/wp-content/uploads/2019/template-engine-security/39.png)

HTMLを返すサーバ側の実装はこのようになっています。




----

<!-- Page 40 -->
![Vue + Client Side Template Injec4on•ユーザー入力(?name)HTMLエスケープはされているのでサーバサイドレンダリングとしては問題ない•h)ps://vue-client-side-template-injec;on-example.azu.now.sh/?name=%3Cscript%3Ealert(1)%3C/script%3E•サーバサイドがレンダリングした結果をVueがクライアントサイドレンダリングしている•h)ps://vue-client-side-template-injec;on-example.azu.now.sh/?name=%7B%7Bthis.constructor.constructor(%27alert(%22foo%22)%27)()%7D%7D•Vueをmountするときにテンプレート構文\{\{ expression \}\} が入ってると、それをテンプレートとして評価してしまう！](https://efcl.info/wp-content/uploads/2019/template-engine-security/40.png)

次のように`name`パラメータにHTMLを入れてもエスケープされているので、XSSは起きない要因見えて一見安全そうです。

- <https://vue-client-side-template-injection-example.azu.now.sh/?name=%3Cscript%3Ealert(1)%3C/script%3E>

しかし、次のように`name`パラメータにVueのテンプレート構文を渡すと、その中身がテンプレートとして評価されてしまいます！

- <https://vue-client-side-template-injection-example.azu.now.sh/?name=%7B%7Bthis.constructor.constructor(%27alert(%22foo%22)%27)()%7D%7D>


----

<!-- Page 41 -->
![h"ps://vue-client-side-template-injec4on-example.azu.now.sh/?name=%7B%7Bthis.constructor.constructor(%27alert(%22foo%22)%27)()%7D%7D](https://efcl.info/wp-content/uploads/2019/template-engine-security/41.png)

つまり、`{{ expression }}` のように書けば、JavaScriptとして評価されるコードがレンダリングできてしまい、XSSが発生します。

>  <https://vue-client-side-template-injection-example.azu.now.sh/?name=%7B%7Bthis.constructor.constructor(%27alert(%22foo%22)%27)()%7D%7D>


----

<!-- Page 42 -->
![Client Side Template Injec1onの原因•?name=\{\{ this.constructor.constructor('alert(1)')() \}\} のようにテンプレート構文を入れてる•サーバサイドでレンダリングすると \{\{, (, ), \}\} などはHTMLタグではないエスケープされない•次のようなVueのテンプレートが生成され、Vueによってテンプレートとして評価され、任意のJavaScriptが実行される  <div id="app">    <h1>Hello \{\{this.constructor.constructor(&#39;alert(&quot;foo&quot;)&#39;)()\}\}</h1>  </div>](https://efcl.info/wp-content/uploads/2019/template-engine-security/42.png)

Vue 2.xでは、mount時に指定された`el`の中に書いてある `{{ expression }}` をVueのテンプレート構文として評価します。

サーバサイドでは、ユーザー入力から `{{ expression }}`  にあたるHTMLを生成して返していました。

そのため、ユーザー入力から Programming Language Template をつくってることになり、クライアントサイドでの任意のコード実行(XSS)が可能になっています。


----

<!-- Page 43 -->
![Client Side Template Injec1onの対処•テンプレート と データモデル が混在してしまったのが原因•サーバサイドで意図せず ユーザー入力を元に テンプレートを作成してしまった•ユーザー入力は データモデル(パラメータ) として扱うように統一すればいい•サーバでは初期Stateをデータモデルとしてクライアントに伝える•要はJSONとしてHTML data属性に書き込み、クライアント側でテンプレートとデータモデルを使ってレンダリングする•fix(server): separate ini:al state for vue by azu · Pull Request #1 · azu/vue-client-side-template-injec:on-example](https://efcl.info/wp-content/uploads/2019/template-engine-security/43.png)

これの対処法についてですが、そもそもテンプレートとデータモデルが混在してしまってるのが原因です。

単純にいえば、ユーザー入力からテンプレートを生成するのが問題です。

ユーザー入力はあくまでデータモデルとしてテンプレートエンジンに渡して上げれば問題ないはずです。


----

<!-- Page 44 -->
![Fix: Vue + Client Side Template Injec7onconst express = require('express');const escapeHTML = require('escape-html');const app = express();app.get('/', (req, res) => \{  res.set('Content-Type', 'text/html');  const name = req.query.name  res.status(200).send(\`  <div id="app">    <h1>Hello \{\{name\}\}</h1>  </div>  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>  <script data-initial-state="$\{escapeHTML(JSON.stringify(\{ name \}))\}">  </script>  <script>      new Vue(\{        el: '#app',        data: JSON.parse(document.querySelector("\[data-initial-state\]").dataset.initialState)      \});  </script>  \`);\});module.exports = app;](https://efcl.info/wp-content/uploads/2019/template-engine-security/44.png)

次のように`data`としてユーザー入力を渡すようにして修正できました。

- [fix(server): separate initial state for vue by azu · Pull Request #1 · azu/vue-client-side-template-injection-example](https://github.com/azu/vue-client-side-template-injection-example/pull/1)


----

<!-- Page 45 -->
![DEMOG: Client Side Template Injec7on](https://efcl.info/wp-content/uploads/2019/template-engine-security/45.png)

この問題を実際のウェブサービスで行うデモです。(報告して修正済み)

少し検索するとこのような古典的なサーバサイドレンダリング(PHP、Ruby、Pythonなどを使った)とVueやAngularなどを使ったSPA(Single Page Application)の実装を組み合わせたサイトが見つかります。

このような組み合わせの場合、ユーザー入力からうっかりテンプレートを作るようになってしまってるサイトが多いです。

たとえば、検索結果画面で、検索する単語に `{{ 1+2 }}` などようにテンプレートっぽい文字列を入れて検索すると `3` と出力されるようなサイトがあります。

VueやAngularJS(1.x)はHTMLにテンプレートを埋め込む形で書くため、サーバーサイドで中途半端にHTMLを生成しているとこの問題が発生しやすように見えました。

ReactやAngular(2.x+)などは、テンプレートをビルドのフェーズでコンパイルしてしまうので、この問題が起きにくいのかもしれません。(自然とテンプレートとデータが分離される)


----

<!-- Page 46 -->
![Programming Language Templateをコンパイルする危険例: サーバ](https://efcl.info/wp-content/uploads/2019/template-engine-security/46.png)

最後にユーザー入力をProgramming Language Templateとして受け取ってサーバーサイドでコンパイルするケースです。


----

<!-- Page 47 -->
![Programming Language Templateをコンパイルする危険例: サーバ•一番ヤバい•信頼できないテンプレートをコンパイルするだけで、サーバで任意のコード実行(Remote Code Execu/on)ができてしまう•検索ワード: Server side Template Injec3on•Server-Side Template Injec/on | Blog - PortSwigger•Server-Side Template Injec/on - DARK MATTER](https://efcl.info/wp-content/uploads/2019/template-engine-security/47.png)

何も対策しないと、ユーザーから受け取ったコードをサーバで実行するので危険です。

サーバーサイドで任意のコード実行(RCE)ができてしまいます。

テンプレートを経由してRCEすることをServer Side Template Injectionと呼ぶらしいです。

- [Server-Side Template Injection | Blog - PortSwigger](https://portswigger.net/blog/server-side-template-injection)
- [Server-Side Template Injection - DARK MATTER](https://io.cyberdefense.jp/entry/2017/06/12/Server-Side_Template_Injection)



----

<!-- Page 48 -->
![lodash.template + Server Side Template Injec7on•h#ps://server-side-lodash-template-injec6on.azu.now.sh/?name=xxx•クエリのnameをサーバサイドレンダリングしてHTMLを返すシンプルなアプリ•テンプレートエンジンにlodash.templateを使ってる](https://efcl.info/wp-content/uploads/2019/template-engine-security/48.png)

`lodash.template` は Programming Language Templateです。

次のサイトは`lodash.template`を使ってレンダリングして結果を返します。


- <https://server-side-lodash-template-injection.azu.now.sh/?name=xxx>

このURLは修正後のものになっています(Server Side Template Injectionできちゃうので…)



----

<!-- Page 49 -->
![const express = require('express');const \_ = require('lodash');const escapeHTML = require('escape-html');const app = express();app.get('/', (req, res) => \{  res.set('Content-Type', 'text/html');  const name = req.query.name  // Create a template from user input  const compiled = \_.template("Hello " + escapeHTML(name) + ".");  res.status(200).send(compiled());\});module.exports = app;](https://efcl.info/wp-content/uploads/2019/template-engine-security/49.png)

実装はこのような単純なものです。

が


----

<!-- Page 50 -->
![lodash.template + Server Side Template Injec7on•色々使い方がおかしい•ユーザー入力からテンプレートを作成してしまってる•lodash.templateは任意のJavaScriptコードを実行できる•Remote Code Execu9onが可能](https://efcl.info/wp-content/uploads/2019/template-engine-security/50.png)

しかし、`lodash.template` を使っているのに、`escapeHTML(name)` して結果をテンプレートにしています。

つまり、ユーザー入力からテンプレートを生成しています。

`lodash.template`は実質ただのJavaScriptなので、サーバーサイドで任意のコード実行ができます。


----

<!-- Page 51 -->
![h"ps://server-side-lodash-template-injec5on.azu.now.sh/?name=$\{JSON.stringify(process.env)\}注意: 今は修正されたものをデプロイしてあります](https://efcl.info/wp-content/uploads/2019/template-engine-security/51.png)

> <https://server-side-lodash-template-injection.azu.now.sh/?name=${JSON.stringify(process.env)}>

このようにNode.jsを動かしてる`process.env`の内容を出力することができてしまいます。


----

<!-- Page 52 -->
![lodash.template + Server Side Template Injec7on•\_.template("Hello $\{JSON.stringify(process.env)\}.");•process.env を返してくれる•Fix: ユーザー入力からテンプレートを作成しない•fix: fix server side template injec5on by azu · Pull Request #1 · azu/server-side-lodash-template-injec5on•テンプレートとデータモデルは分ける•ユーザー入力はデータモデル(パラメータ)に移動する](https://efcl.info/wp-content/uploads/2019/template-engine-security/52.png)

修正方法は単純です。

ユーザー入力からテンプレートを生成しないようにすることです。

何度も行ってますが、テンプレートとデータはきちんと分けて扱うようにします。


----

<!-- Page 53 -->
![FIX: lodash.template + Server Side Template Injec:onconst express = require('express');const \_ = require('lodash');const app = express();app.get('/', (req, res) => \{  res.set('Content-Type', 'text/html');  const name = req.query.name  const compiled = \_.template("Hello <%- name %>.");  res.status(200).send(compiled(\{ name \}));\});module.exports = app;](https://efcl.info/wp-content/uploads/2019/template-engine-security/53.png)

`lodash.template` も `<%- name %>` のように変数のプレースホルダと、データとして `name` を渡す方法があります。

それを使うようにするだけです。


----

<!-- Page 54 -->
![Server Side Template Injec2on•ユーザー入力からテンプレートを作ってしまうと問題が起きる•SQL Injec+onとよく似ている•基本的な対策はユーザー入力をテンプレートにわたすときにプレースホルダーを使う！•事例: 有名なサイトでも結構やらかしている. $10,000 > ぐらいの報奨金がでる•Yahoo! RCE via Spring Engine SSTI – ∞ Growing Web Security Blog•Artsploit: \[demo.paypal.com\] Node.js code injec+on (RCE)•#125980 uber.com may RCE by Flask Jinja2 Template Injec+on•#423541 H1514 Server Side Template Injec+on in Return Magic email templates?](https://efcl.info/wp-content/uploads/2019/template-engine-security/54.png)

テンプレートエンジンをちゃんと使うだけで問題ありません。

この問題は単純ですが、結構有名なサイトでもこの問題が起きてたりします。


----

<!-- Page 55 -->
![Template Injec-on•多くのProgramming Language Templateの攻撃方法が確立されている•Tplmapなどの検査ツールもある(テンプレート構文っぽい文字列をクエリに入れまくる)•参考: DiogoMRSilva/websitesVulnerableToSSTI: Simple websites vulnerable to Server Side Template InjecCons(SSTI)](https://efcl.info/wp-content/uploads/2019/template-engine-security/55.png)

ユーザー入力からテンプレートを作っていないかをチェックする検査ツールなどもあります。

- [Tplmap](https://github.com/epinna/tplmap)



----

<!-- Page 56 -->
![EJS<%% global.process.mainModule.require('fs').readFileSync('/etc/passwd').toString() %%>Nunjucks\{% global.process.mainModule.require('fs').readFileSync('/etc/passwd').toString() \}Slim#\{ File.open('/etc/passwd').read \}erb<%= File.open('/etc/passwd').read %>Vue(SSR)\{\{ global.process.mainModule.require('fs').readFileSync('/etc/passwd').toString() \}\}](https://efcl.info/wp-content/uploads/2019/template-engine-security/56.png)

実際にそれぞれのテンプレートエンジンでユーザー入力からテンプレートを生成してないかをチェックするクエリの例です。


----

<!-- Page 57 -->
![User Defined Template と Server Side Template Injec6on•ユーザーがテンプレートを書ける機能を提供している場合•ブログのテーマ機能•管理画面でテンプレート構文自体を入力させているようなケース•ユーザーに定義させるテンプレートをUser Defined Templateと呼ぶ•検索キーワード: User Defined Template](https://efcl.info/wp-content/uploads/2019/template-engine-security/57.png)

このユーザー入力をProgramming Language Template(テンプレート)として受け取るケースはテンプレートエンジンを正しく使えば問題ありません。

しかし、サービスによってユーザーがProgramming Language Templateが書ける機能を提供していることがあります。

たとえば、ブログのテーマ機能にerbでテンプレートを書けるようなサービスがあったらとても危険です。

著名なテンプレートエンジンでもユーザーに書かせる前提になっていないものは多いので、その辺は事前にチェックしましょう。

User Defined Templateと検索すると良いです。


----

<!-- Page 58 -->
![User Defined Template と Server Side Template Injec6on•User Defined Template が Programming Language Template ならアウト•ユーザーがサーバで任意のコード実行ができる•サーバ自体を乗っ取ることが可能•テンプレートのレベルをちゃんと選択することが重要](https://efcl.info/wp-content/uploads/2019/template-engine-security/58.png)

このUser Defined TemplateがProgramming Language Template(lodash.templateやerbなど)だと対策しないと基本的に危険です。

後から対策するのはすごい難しいので、テンプレートエンジンを選ぶ段階で、3つのテンプレートのレベルを把握しておくのが重要です。


----

<!-- Page 59 -->
![DEMO: User Defined Template と Server Side Template Injec:on](https://efcl.info/wp-content/uploads/2019/template-engine-security/59.png)

ユーザーがProgramming Language Templateを書けるサービスでのServer Side Template Injectionのデモです(報告して修正済み)


----

<!-- Page 60 -->
![User Defined Template として書けるテンプレートの事例•Shopify: Liquid•liquidjs: JS実装•Drupal: Twig•Twig in Drupal 8 | Drupal 8 guide on Drupal.org•どちらもLimited control structuresなテンプレート](https://efcl.info/wp-content/uploads/2019/template-engine-security/60.png)

User Defined Templateとして扱って良いテンプレートエンジンは、Limited Control Structuresを扱うテンプレートエンジンです。

具体的にはShopifyやJekyllが使うliquidjs、Twigなどはユーザーが書かせてもいい作りのテンプレートエンジンとして作られています。


----

<!-- Page 61 -->
![User Defined Template として書けるテンプレートで安全を保証する手法•セキュリティレビュー•ホワイトリストでの機能制限•隔離環境での実行](https://efcl.info/wp-content/uploads/2019/template-engine-security/61.png)

Programming Language TemplateのままUser Defined Templateとしたい場合についてです。

どれも基本的にコストが高いですが、次の3つの方法で一応の安全性を保てるかもしれせん。

- セキュリティレビュー
- ホワイトリストでの機能制限
- 隔離環境での実行


----

<!-- Page 62 -->
![セキュリティレビュー方式•Wordpress: テーマは独自のProgramming Language Template•テーマにPHPのコードも普通に書ける•Theme Security | Theme Developer Handbook | WordPress Developer Resources•ホスティング版では、利用できるテーマが審査済みのサードパーティに限定される•The WordPress.com Business Plan Now Supports Plugins and Third-Party Themes — The WordPress.com Blog•レビューによって安全を保証してる•OSS版Wordpressにおいてはテーマのインストール = 任意のPHPプログラム実行](https://efcl.info/wp-content/uploads/2019/template-engine-security/62.png)

セキュリティレビュー方式

Wordpress は com の方はこの方式を取っています。
なぜならWordpressのテーマはPHPを書けるためです。


----

<!-- Page 63 -->
![ホワイトリスト/バリデーション方式•利用できる機能をホワイトリストで制限する•ブラックリストは抜け道が出やすいのでセキュリティでは避ける•Twig、Smarty、JinjaのSandboxはこの方式•Sandboxと言うけど、実際にはホワイトリストでの機能制限 + アクセスエラー(実行させないようにしてる)•Programming Language TemplateからLimited control structuresにレベルダウン⬇](https://efcl.info/wp-content/uploads/2019/template-engine-security/63.png)

ホワイトリストでの機能制限

Programming Language Templateのテンプレート構文を制限する拡張機能を作る方式です。

実質的にLimited Control Structuresに落とそうという方針です。

とても大変なので、最初からLimited Control Structuresを使うのが無難です。


----

<!-- Page 64 -->
![ホワイトリスト/バリデーション方式の問題•Valida'onによる制限はレベルを下げる道具•全てを網羅してないとレベルを下げることができないため、結構難しい•抜け穴一つでもあれば、レベルは下がらない = Programming Language Templateのまま•バリデーションで後から制限より、最初からLimited control structuresを選ぶべき•最初に適切なレベルを選択して、不必要にレベルを上げないようにする•レベルを下げるのは、レベルを上げることよりも難しい•生活水準と同じ](https://efcl.info/wp-content/uploads/2019/template-engine-security/64.png)

バリデーションの問題点として、そのテンプレートエンジンを作ってない人がバリデーションだけを作っても、抜け道をすべて潰すのが難しいという問題があります。




----

<!-- Page 65 -->
![隔離環境での実行Containers are not a sandbox— gVisor•VM、Serverlessなど隔離した環境を用意しそこでテンプレートをコンパイルする•悪意あるテンプレートをコンパイルしてもできることを制限する•オーバーヘッドがある](https://efcl.info/wp-content/uploads/2019/template-engine-security/65.png)

隔離環境での実行

パフォーマンスやリアルタイム性が問題にならないならこれを選ぶのもありかもしれません。


----

<!-- Page 66 -->
![入力ソース: テンプレートのまとめローカルブラウザサーバSimple Token ReplaceSafeSafeSafeLimited control structuresSafeSafeSafeProgramming Language Template⚠Danger⚠Danger⚠Danger](https://efcl.info/wp-content/uploads/2019/template-engine-security/66.png)

まとめです。


----

<!-- Page 67 -->
![](https://efcl.info/wp-content/uploads/2019/template-engine-security/67.png)




----

<!-- Page 68 -->
![Limited control structuresとProgramming Language Template•Limited control structuresは機能として提供しやすい•Programming Language Templateは機能として提供しにくい](https://efcl.info/wp-content/uploads/2019/template-engine-security/68.png)




----

<!-- Page 69 -->
![Limited control structuresとProgramming Language Templateの見分け方•それがプログラムに見えるならプログラム•テンプレート内で言語のネイティブコードが呼べるならProgramming Language Template•\{\{ new Date().getTime() \}\}•Evalを使ってるならProgramming Language Templateになる可能性がある](https://efcl.info/wp-content/uploads/2019/template-engine-security/69.png)

Limited Control StructuresとProgramming Language Templateを見分ける方法についてです。

多分ありません。

そのテンプレートがプログラムに見えたらProgramming Language Templateです。

ネイティブの関数とか呼べるならProgramming Language Templateです。



----

<!-- Page 70 -->
![Limited control structuresとProgramming Language Templateの見分け方•細かいところまで見ないと区別はつきにくい-　実装に依存してしまう•検索キーワード•\{\{テンプレート名\}\} Untrusted template•\{\{テンプレート名\}\} User Defeined template](https://efcl.info/wp-content/uploads/2019/template-engine-security/70.png)

見分け方はないので、公式サイトや次のようなキーワードで検索してみてください。


- `{{テンプレート名}} Untrusted template`
- `{{テンプレート名}} User Defeined template`


----

<!-- Page 71 -->
![考え方: テンプレートと実行•自分のマシンでテンプレートをコンパイルして、その結果を提供するのはOK•デプロイ時にコンパイルしてから提供するのはOK•他人が書いたテンプレートを、自分のマシン/ブラウザ/サーバでコンパイルするのはNG•Programming Language Templateの場合は任意のコードが実行できる•ユーザー入力としてテンプレートを受け取ってコンパイルする時はプログラムを実行するのと同じ気持ち](https://efcl.info/wp-content/uploads/2019/template-engine-security/71.png)

色々難しく感じるかもしれませんが、言ってることは単純です。

自分でテンプレートをコンパイルしたものを配布するのはOKです。
他人から受け取ったテンプレートを自分でコンパイルすると問題があるかもしれません。

そのテンプレートがプログラムだったらと置き換えるとわかりやすいかもしれません。


----

<!-- Page 72 -->
![考え方: ユーザー入力とテンプレート•ユーザー入力は全てUntrustedなデータ•ユーザー入力からテンプレートは作成しない•ユーザー入力はデータモデル(パラメータ)として渡す•テンプレート機能をユーザーに提供する場合•Programming Language Templateを避ける•ユーザーにプログラムを書かせない](https://efcl.info/wp-content/uploads/2019/template-engine-security/72.png)

考え方のまとめです。


----

<!-- Page 73 -->
![考え方: テンプレートと複雑性•厳密にデータとロジックを分離するのはセキュリティと同じ•無制限なテンプレートはテンプレートがデータモデルに影響を与えることができる•複雑な問題に対処するなら複雑な機能を持ったテンプレートが必要になる•逆に複雑ではない問題に対して複雑なテンプレートはオーバースペック](https://efcl.info/wp-content/uploads/2019/template-engine-security/73.png)




----

<!-- Page 74 -->
![まとめ•テンプレートは3つのレベルがあると考えられる•テンプレートのレベルとコンパイルする場所によって影響度は異なる•ローカルコンパイルとサーバコンパイルを同じものとして扱わない•レベルを下げるのは難しいため、必要なレベルのものを最初に選択する•Untrustedなテンプレートをコンパイルするときには制限がある状態で行う•Sandbox、ホワイリスト、マニュアルレビュー•テンプレートファイルはプログラムファイル](https://efcl.info/wp-content/uploads/2019/template-engine-security/74.png)

スライドのまとめです。

- テンプレートは3つのレベルがあると考えられる
- テンプレートのレベルとコンパイルする場所によって影響度は異なる
- ローカルコンパイルとサーバコンパイルを同じものとして扱わない
- レベルを下げるのは難しいため、必要なレベルのものを最初に選択する
- Untrustedなテンプレートをコンパイルするときには制限がある状態で行う
    - Sandbox、ホワイリスト、マニュアルレビュー
- テンプレートファイルはプログラムファイル


----

<!-- Page 75 -->
![Simple Token Replacement](https://efcl.info/wp-content/uploads/2019/template-engine-security/75.png)




----

<!-- Page 76 -->
![Limited Control Structures](https://efcl.info/wp-content/uploads/2019/template-engine-security/76.png)




----

<!-- Page 77 -->
![Programming Language](https://efcl.info/wp-content/uploads/2019/template-engine-security/77.png)




----

<!-- Page 78 -->
![より良いテンプレートライフを！](https://efcl.info/wp-content/uploads/2019/template-engine-security/78.png)




----

<!-- Page 79 -->
![参考文献•Enforcing Strict Model-View Separa6on inTemplate Engines•Web Content Management - O'Reilly Media•Client-side Template Injec6on - YouTube•JSMVCOMFG - To sternly look at JavaScript MVC and Templa6ng Frameworks•PayloadsAllTheThings/Server Side Template Injec6on at master · swisskyrepo/PayloadsAllTheThings•Web template system - Wikipedia](https://efcl.info/wp-content/uploads/2019/template-engine-security/79.png)

参考文献です。
