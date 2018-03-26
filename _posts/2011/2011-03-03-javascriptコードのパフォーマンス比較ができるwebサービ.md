---
title: JavaScriptコードのパフォーマンス比較ができるWebサービス「jsPerf」の使い方
author: azu
layout: post
permalink: /2011/0303/res2330/
SBM_count:
  - '00039<>1355383933<>38<>0<>1<>0<>0'
dsq_thread_id:
  - 300880706
categories:
  - javascript
  - webサービス
tags:
  - javascript
  - test
  - ブラウザ
  - 比較
---
自分が書いたJavaScriptのコードスニペットに対してどのコードが早いのかベンチマークを比較することができるWebサービスである[jsPerf][1]の紹介と使い方。JavaScriptでは同じ機能を実現するための方法は様々であり、どのコードが優れているのかを調べる方法としてプロファイラなどを利用することがあります。しかし、JavaScriptはブラウザ毎によっても速度が変わることが多いため、ブラウザ依存のツールだと比較しにくくなるため、ブラウザ上でテストコードを実行し、それらのベンチマークを簡単に記録、比較できるサービスが[jsPerf][1]です。

#### jsPerfの比較方法

jsPerfの内部では<span style="font-family: Arial;"><a title="[http://benchmarkjs.com/]로 이동합니다." href="http://benchmarkjs.com/" target="_blank">Benchmark JS</a>というベンチマークライブラリが使用されています。(</span>jsPerfの運営者が作成している)  
jsPerfの計測方法は一定時間内にどれくらいコードスニペット部が実行できたのかで比較します。そのため数値が大きいほどパフォーマンスがよい(=一定時間で多く実行できる)となります。  
ブラウザ固有のテストやライブラリを読み込んでのテストも行うことができます。

#### 使用方法

<span style="font-family: Arial;"><a title="[http://jsperf.com]로 이동합니다." href="http://jsperf.com/" target="_blank">http://jsperf.com</a>にアクセスします。<br />過去に他のユーザーが比較した結果は</span>[Browse test cases · jsPerf][2]から見ることができます。  
Googleのsite:検索を使って事前に行おうとしている比較があるかを検索するといいかもしれません。  
([join vs concat site:jsperf.com &#8211; Google 検索][3]みたいな感じで)

**ユーザー情報の入力(Your details)**<figure id="attachment_2332" style="width: 300px;" class="wp-caption alignnone">

[<img class="size-medium wp-image-2332" title="ss-2011-03-03-1" src="https://efcl.info/wp-content/uploads/2011/03/ss-2011-03-03-1-300x106.png" alt="" width="300" height="106" />][4]<figcaption class="wp-caption-text">ユーザー情報の入力部</figcaption></figure> 
これは任意ですが、名前やメールアドレス(Gravatarを利用したアイコン表示のため)やサイトURLを入力することができます。  
ユーザー名が入力してあった場合はhttp://jsperf.com/browse/<USERNAME>.atom というURLからRSSを見たり、過去に比較したものも一覧できるのでユーザー名は入れた方がいいです。  
Publishedのチェックを外すことで非公開でテスト行うことができます

**テストケースの情報(Test Case Details)**<figure id="attachment_2333" style="width: 300px;" class="wp-caption alignnone">

[<img class="size-medium wp-image-2333" title="ss-2011-03-03-3" src="https://efcl.info/wp-content/uploads/2011/03/ss-2011-03-03-3-300x201.png" alt="" width="300" height="201" />][5]<figcaption class="wp-caption-text">テストケースの情報</figcaption></figure> 
&nbsp;

この部分はテストケースのタイトルや説明などを入力する場所です。  
後で見た人が何のテストなのかわかるように書いておくといいです。slugはタイトルから自動で入力されますが任意で決めることもできます。

**事前準備のコード(Preparation code)**<figure id="attachment_2334" style="width: 300px;" class="wp-caption alignnone">

[<img class="size-medium wp-image-2334" title="ss-2011-03-03-4" src="https://efcl.info/wp-content/uploads/2011/03/ss-2011-03-03-4-300x210.png" alt="" width="300" height="210" />][6]<figcaption class="wp-caption-text">事前準備</figcaption></figure> 
*Preparation code HTML*には必要なライブラリを読み込むScriptタグやDOM操作が関係するテストならDOMを書いておけます。  
*Preparation code JavaScript*にはテストで使うJavaScriptコードで事前に書いておけるもの(共通して使うなど)を書いておけます。

**テストケースの入力(Code snippets to compare)**

テストケースはタイトルをコード部分を入力できます。デフォルトは2つ入力する場所がありますが、Add Snippet Codeから増やすこともできます。テストケースのコードを入力する際に気をつけるべきことは、テストコードにテストと関係ないループ文などを含めないことです。  
jsPerf側でテストケースのブロック毎に繰り返し実行するため、テストコード内のループ文がテストの本質と関係ない場合は含めない方がいいです。

これで入力は終わりで後は実行して結果を見るだけです

**実行して結果を見る**

テストページにあるRun Testボタンからテストを実行することができます。  
Tipsとしてテストページの最後に#runと付ければボタンを押さずに自動的にテストが実行されます。

<div>
  <ul>
    <li>
      <a title="通常のテストページ" href="http://jsperf.com/stringmerge-plusoperator-vs-arrayjoin" target="_blank">http://jsperf.com/stringmerge-plusoperator-vs-arrayjoin</a>
    </li>
    <li>
      <a title="#runで自動実行されるテストページ" href="http://jsperf.com/stringmerge-plusoperator-vs-arrayjoin#run" target="_blank">http://jsperf.com/stringmerge-plusoperator-vs-arrayjoin#run</a>
    </li>
  </ul>
  
  <p>
    実行結果の見方
  </p>
  
  <p style="text-align: left;">
    <a href="https://efcl.info/wp-content/uploads/2011/03/ss-2011-03-03-5.png"><img class="size-full wp-image-2335" title="ss-2011-03-03-5" src="https://efcl.info/wp-content/uploads/2011/03/ss-2011-03-03-5.png" alt="" width="599" height="207" /></a>
  </p>
</div>

<div>
  <ul>
    <li>
      UserAgent<br />実行したブラウザのUA
    </li>
    <li>
      中央のエリア<br />テストの名前とそれぞれの実行結果のスコアが載っています。<br />数字が大きいほどパフォーマンスが良いことに注意してください。<br />また実行環境が違うものも記録されるため、縦方向に比較をしないで横方向に比較をするといいと思います。
    </li>
    <li>
      #Tests<br />テストの実行回数
    </li>
  </ul>
  
  <p>
    ここに表示される実行結果は自分以外の人が実行したものも記録されていきます。<br />また他人のテストケースをフォークして新たなテストケースを作成することも可能です。
  </p>
  
  <p>
    以上で簡単な説明は終わりです。<br />より詳細な疑問点は<a title="Frequently asked questions · jsPerf" href="http://jsperf.com/faq">Frequently asked questions · jsPerf</a>を見るなどすると良いです。
  </p>
  
  <p>
    この記事は以下をかなり参考にして作成しました。(テストもその記事内から借用しています)
  </p>
  
  <dl>
    <dt>
      <strong>Nundefined :: About jsperf.com</strong>
    </dt>
    
    <dd>
      <a title="Nundefined :: About jsperf.com" href="http://nundefined.tistory.com/25">http://nundefined.tistory.com/25</a>
    </dd>
  </dl>
</div>

<div>
  <span style="font-family: Arial;"><strong><span style="color: #2b8400;"><br /></span></strong></span>
</div>

 [1]: http://jsperf.com/ "jsPerf"
 [2]: http://jsperf.com/browse "Browse test cases · jsPerf"
 [3]: http://www.google.co.jp/search?num=20&safe=off&client=firefox-a&hs=ZXU&rls=org.mozilla%3Aja%3Aunofficial&tbs=qdr%3Ay15&q=join+vs+concat+site%3Ajsperf.com&lr=&hl=ja&aq=f&aqi=&aql=&oq= "join vs concat site:jsperf.com - Google 検索"
 [4]: https://efcl.info/wp-content/uploads/2011/03/ss-2011-03-03-1.png
 [5]: https://efcl.info/wp-content/uploads/2011/03/ss-2011-03-03-3.png
 [6]: https://efcl.info/wp-content/uploads/2011/03/ss-2011-03-03-4.png
