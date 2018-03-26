---
title: NSDateをもっと便利に使うためのライブラリ NSDate-Escortを書いた
author: azu
layout: post
permalink: /2013/0801/res3366/
dsq_thread_id:
  - 1554400013
categories:
  - iOS
tags:
  - github
  - iOS
  - library
---
<h1>はじめに</h1>
<p><a href="https://github.com/azu/NSDate-Escort" title="azu/NSDate-Escort">NSDate-Escort</a> というiOS(多分Macでも動く)向けのNSDateに関するユーティリティライブラリを書きました。</p>
<p><a href="http://cocoapods.org/" title="CocoaPods">CocoaPods</a> 経由でインストール出来ます。</p>
<pre><code>pod 'NSDate-Escort'
</code></pre>
<p>どういうライブラリなのかの紹介と、どういう風に開発したかについて書いていきます。</p>
<h2><a href="https://github.com/azu/NSDate-Escort" title="azu/NSDate-Escort">NSDate-Escort</a></h2>
<p><a href="https://travis-ci.org/azu/NSDate-Escort"><img src="https://travis-ci.org/azu/NSDate-Escort.png?branch=master" alt="Build Status" /></a><br />
<a href="https://coveralls.io/r/azu/NSDate-Escort?branch=master"><img src="https://coveralls.io/repos/azu/NSDate-Escort/badge.png?branch=master" alt="Coverage Status" /></a><br />
<img src="http://cocoapod-badges.herokuapp.com/v/NSDate-Escort/badge.svg" alt="Version" /><br />
<img src="http://cocoapod-badges.herokuapp.com/p/NSDate-Escort/badge.svg" alt="Platform" /></p>
<p>大部分の機能は NSDate に関わるもので、NSDateのカテゴリとして実装されています。</p>
<p><a href="https://github.com/erica/NSDate-Extensions" title="NSDate-Extensions">NSDate-Extensions</a> というNSDateユーティリティライブラリとして有名なものがありますが、<br />
<a href="https://github.com/azu/NSDate-Escort" title="azu/NSDate-Escort">NSDate-Escort</a> は <a href="https://github.com/erica/NSDate-Extensions" title="NSDate-Extensions">NSDate-Extensions</a> と互換性を持ったAPIを提供します。</p>
<p>そのため、<code>NSDate-Utilities.h</code> を読み込んでいる部分を <code>NSDate+Escort.h</code> に置換するだけで、問題なく動作すると思います。</p>
<p>ライセンスは <a href="http://choosealicense.com/licenses/mit/" title="MIT License">MIT License</a> です。</p>
<h3>使い方</h3>
<p>使い方は単純で <code>NSDate</code> クラスのカテゴリとして実装されているので、</p>
<div class="highlight">
<pre><span class="cp">#import &lt;NSDate+Escort.h&gt;</span>
    
<span class="n">NSDate</span> <span class="o">*</span><span class="n">today</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSDate</span> <span class="n">date</span><span class="p">];</span>
<span class="n">NSDate</span> <span class="o">*</span><span class="n">nextWeekDate</span> <span class="o">=</span> <span class="p">[</span><span class="n">today</span> <span class="n">dateByAddingDays</span><span class="o">:</span><span class="mi">7</span><span class="p">];</span><span class="c1">// 7日後</span>
</pre>
</div>
<p>という感じで使います。</p>
<p>さすがに全部のAPIを紹介するのは大変なので、詳しくは<br />
<a href="https://github.com/azu/NSDate-Escort/blob/master/NSDate-Escort/NSDate%2BEscort.h" title="NSDate+Escort.h">NSDate+Escort.h</a> をみるといい気がします。</p>
<p>機能は種類別に分かれていて(と言っても全部NSDate)、種類別で簡単に紹介します。</p>
<p>(selfはカテゴリのsubjectとなるクラス or インスタンスのことを言ってます)</p>
<h4>Relative dates from the current date</h4>
<p>これだけはNSDateクラスメソッドですが、現在時間からの相対的なNSDateを返します。</p>
<p>Cocoaネイティブには秒を扱う <code>+ (id)dateWithTimeIntervalSinceNow:(NSTimeInterval)secs;</code> だけはあるので、分や時間などでも同じようにするためのメソッドです。</p>
<pre><code>#pragma mark - Relative dates from the current date
+ (NSDate *)dateTomorrow;
+ (NSDate *)dateWithDaysFromNow:(NSInteger) dDays;
</code></pre>
<h4>Comparing dates</h4>
<p>selfと渡したNSDateを比較してBOOLを返します</p>
<p>compare:を使って <code>NSComparisonResult</code> の値を見るというややこしい事をしないで書けるようになります。</p>
<pre><code>#pragma mark - Comparing dates
- (BOOL)isEqualToDateIgnoringTime:(NSDate *) otherDate;
- (BOOL)isToday;
- (BOOL)isEarlierThanDate:(NSDate *) aDate;
- (BOOL)isEarlierThanOrEqualDate:(NSDate *) aDate;
</code></pre>
<h4>Adjusting dates</h4>
<p>多分、一番使われると思いますが、self に n日足した値を返したり、selfを00:00:00に、つまり1日の始まりの時間に調節したNSDateを返す等の機能があります。</p>
<pre><code>#pragma mark - Adjusting dates
- (NSDate *)dateByAddingDays:(NSInteger) dDays;
- (NSDate *)dateAtStartOfDay;
</code></pre>
<p>この辺を組み合わせると、翌月の月初の00:00:00のNSDateを返すというのも簡単に書くことができます。</p>
<pre><code>[[[aDate dateByAddingMonths:1] dateAtStartOfMonth] dateAtStartOfDay];
</code></pre>
<h4>Retrieving intervals</h4>
<p>self と 渡した NSDateとの相対的な値を返します。</p>
<pre><code>#pragma mark - Retrieving intervals
- (NSInteger)minutesAfterDate:(NSDate *) aDate;
</code></pre>
<h4>Decomposing dates</h4>
<p>self の 時間、分、曜日といった値を返します。<br />
NSDateComponents を使えば同様の事ができますが、NSDateから直接できるようにしている感じです。</p>
<pre><code>#pragma mark - Decomposing dates
@property(readonly) NSInteger hour;
@property(readonly) NSInteger month;
</code></pre>
<h2>目的</h2>
<p><a href="https://github.com/erica/NSDate-Extensions" title="NSDate-Extensions">NSDate-Extensions</a> はObjective-Cに馴染みやすいAPIを持っていて便利ですが、使っていると以下のような問題点がありました。</p>
<ul>
<li>テストが書かれていない</li>
<li>無駄な処理が行われている</li>
<li>足りない機能がある</li>
</ul>
<p>最初は<a href="https://github.com/azu/NSDate-Extensions">Fork</a>してPull Requestでやろうとしましたが、<a href="https://github.com/erica/NSDate-Extensions" title="NSDate-Extensions">NSDate-Extensions</a> はそこまで積極的にメンテして修正を取り込んでる感じではなかったのと、</p>
<p>この手の機能は結構良く使うので自分で作りなおしてしまったほうがいいかなと思ったので、<a href="https://github.com/azu/NSDate-Escort" title="azu/NSDate-Escort">NSDate-Escort</a>を作りました。(後、テストを書く練習がしたい症状がでてた)</p>
<h3>テストを書く</h3>
<p>やっぱり、テストが書かれていないライブラリは不安なので、使い慣れてる<a href="https://github.com/allending/Kiwi" title="allending/Kiwi">Kiwi</a>を使ってテストを書きました。</p>
<p><a href="https://github.com/allending/Kiwi" title="allending/Kiwi">Kiwi</a> で全てのメソッドに対するテストを書いて(後述するカバレッジが念頭にあったため)、QuickCheckが行える箇所については<a href="https://github.com/yaakaito/NLTQuickCheck" title="NLTQuickCheck">NLTQuickCheck</a>を使い、QuickCheckをしています。</p>
<p>この時に、NSDate-Extensionsの実装的な問題点も幾つか見つけたので、<a href="https://github.com/azu/NSDate-Escort" title="azu/NSDate-Escort">NSDate-Escort</a> ではより安全な方向に倒して実装してあります。</p>
<p>例えば、日にちを加算する <code>- (NSDate *) dateByAddingDays: (NSInteger) dDays</code> というメソッドですが、</p>
<p>NSDate-Extensions では NSTimeInterval、つまり秒を加算することで日にちを加算しています。</p>
<pre><code>- (NSDate *) dateByAddingDays: (NSInteger) dDays
{
    NSTimeInterval aTimeInterval = [self timeIntervalSinceReferenceDate] + D_DAY * dDays;
    NSDate *newDate = [NSDate dateWithTimeIntervalSinceReferenceDate:aTimeInterval];
    return newDate;     
}
</code></pre>
<p>NSDate-Escort では以下のように、加算用のNSDateComponentsを作り、それを <code>dateByAddingComponents:components</code> することで日にちを加算しています。</p>
<pre><code>- (NSDate *)dateByAddingDays:(NSInteger) dDays {
    NSDateComponents *components = [[NSDateComponents alloc] init];
    components.day = dDays;
    NSCalendar *calendar = [NSDate AZ_currentCalendar];// カレンダーはキャッシュを利用する
    return [calendar dateByAddingComponents:components toDate:self options:0];
}
</code></pre>
<p>NSDate-Extensions の実装だと、QuickCheckなどで大きな値を設定した時に<br />
<code>typedef double NSTimeInterval;</code> の範囲を超えることがあります。<br />
(実用的には5000日以上とかなので、あんまり問題にはならないです)</p>
<p>また、Travis CIで動かしていた時に、足していた日にちと1日ずれる現象が発生し、<br />
自分の環境では再現出来なかったのですが、より安全な実装である <code>dateByAddingComponents:components</code> を使った方法を取りました。</p>
<ul>
<li><a href="https://gist.github.com/azu/5841513#comment-849932" title="dateByAddingComponents:toDate:options: vs dateByAddingTimeInterval:">dateByAddingComponents:toDate:options: vs dateByAddingTimeInterval:</a></li>
</ul>
<p>Travis CIでテストを動かておくと、普段気づかないことにも気づくチャンスができるので、ライブラリを公開する場合はTravis CIでも動くようにしておくといいと思います。</p>
<p><a href="https://travis-ci.org/azu/NSDate-Escort"><img src="https://travis-ci.org/azu/NSDate-Escort.png?branch=master" alt="Build Status" /></a></p>
<ul>
<li><a href="https://efcl.info/2013/0613/res3301/" title="iOSアプリのテストをTravis CIで走らせて、コードカバレッジをCoverallsで取る方法 | Web scratch">iOSアプリのテストをTravis CIで走らせて、コードカバレッジをCoverallsで取る方法 | Web scratch</a></li>
</ul>
<h3>コードカバレッジ</h3>
<p><a href="https://github.com/azu/NSDate-Escort" title="azu/NSDate-Escort">NSDate-Escort</a> の目的の一つにコードカバレッジが100%であることがありました。</p>
<p>これは、書き始めたときはまだ <a href="https://coveralls.io/" title="Coveralls">Coveralls</a> でObjective-Cのプロジェクトがひとつも存在してなかっため、Coverallsを使いたいという目的もありました。</p>
<p>NSDate-Escort は NSDate-Extensions 互換のAPIを持つことを目標にしていたので、<br />
最初にインターフェイスだけを書いてコードカバレッジが0%の状態から徐々に上げていく感じで実装して行きました。</p>
<p>コードカバレッジという指標があるとモチベーションを保ち易いように思います。<br />
現在は 100%を達成しているため、 <a href="https://coveralls.io/r/azu/NSDate-Escort?branch=master"><img src="https://coveralls.io/repos/azu/NSDate-Escort/badge.png?branch=master" alt="Coverage Status" /></a> 今後はこれを落とさないようにしていく感じになります。</p>
<ul>
<li><a href="https://efcl.info/2013/0613/res3301/" title="iOSアプリのテストをTravis CIで走らせて、コードカバレッジをCoverallsで取る方法 | Web scratch">iOSアプリのテストをTravis CIで走らせて、コードカバレッジをCoverallsで取る方法 | Web scratch</a> </li>
<li><a href="http://www.tokoro.me/2013/07/09/objc-travis-coveralls/" title="iOSのライブラリだってTravis CIとかCoverallsとか使うべき - TOKOROM BLOG">iOSのライブラリだってTravis CIとかCoverallsとか使うべき &#8211; TOKOROM BLOG</a></li>
<li><a href="https://github.com/azu/Coveralls-iOS" title="azu/Coveralls-iOS">azu/Coveralls-iOS</a></li>
</ul>
<h3>追加したメソッド</h3>
<p><a href="https://github.com/azu/NSDate-Escort#additional-methods" title="Additional methods?">Additional methods?</a> に <a href="https://github.com/erica/NSDate-Extensions" title="NSDate-Extensions">NSDate-Extensions</a> にはなくて、追加したメソッドがまとめてあります。</p>
<p>月単位で、日付を操作する(年単位も追加した)</p>
<pre><code>- (NSDate *)dateByAddingMonths:(NSInteger) dMonths;
</code></pre>
<p><code>dateAtStartOfDay</code> の逆を行う(月や年も同様に)</p>
<pre><code>- (NSDate *)dateAtEndOfDay;
</code></pre>
<p>NSDate 同士の <code>&gt;=</code> で比較する</p>
<pre><code>- (BOOL)isEarlierThanOrEqualDate:(NSDate *) aDate;
</code></pre>
<p>等が追加してあります。</p>
<hr />
<h2>まとめ</h2>
<p><a href="https://github.com/azu/NSDate-Escort" title="azu/NSDate-Escort">NSDate-Escort</a> を簡単にまとめると</p>
<ul>
<li><a href="https://github.com/erica/NSDate-Extensions" title="NSDate-Extensions">NSDate-Extensions</a>と互換性のあるAPIを持ってる</li>
<li>中身はスクラッチで実装しなおした</li>
<li>いくつか<a href="https://github.com/azu/NSDate-Escort#additional-methods">追加したメソッド</a>を持ってる</li>
<li>全てのメソッドを通るテストが書かれてる</li>
</ul>
<p>みたいな感じです。</p>
<p><a href="https://github.com/azu/NSDate-Escort#contributing">コントリビューション</a>も歓迎しています。</p>
<p>NSDateについては、<a href="https://efcl.info/2013/0607/res3295/" title="Objective-C勉強会＠東京 ６月 でNSDateについて発表してきた | Web scratch">Objective-C勉強会＠東京 ６月 でNSDateについて発表してきた | Web scratch</a>での発表も見ておくといいかもしれません。(この辺の内容がライブラリにも含まれてます)</p>
