---
title: "ECMAScript 2015以降のJavaScriptの`this`を理解する"
author: azu
layout: post
date : 2018-01-04T19:02
category: JavaScript
tags:
    - JavaScript
    - ECMAScript
    - this

---

この記事はJavaScriptの入門書として書いている[js-primer](https://github.com/asciidwango/js-primer "js-primer")の`this`に関する部分をベースにしています。
またjs-primerでは書けなかった現在時点(2018年1月1日)でのブラウザの挙動についてを加えたものです。

次の場所に[js-primer](https://github.com/asciidwango/js-primer "js-primer")版（書籍版）の`this`についての解説があります。
この記事と違って実際にコードを実行しながら読めるので、学習ソースとしては[書籍版](https://asciidwango.github.io/js-primer/basic/function-this/)を推奨します。

- 書籍版: [関数とthis · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/function-this/ "関数とthis · JavaScriptの入門書 #jsprimer")

また、バグ報告やPRも直接リポジトリにして問題ありません。

- [asciidwango/js-primer: JavaScriptの入門書](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")

おかしい場所を選択した状態で右下にある"Bug Report"ボタンを押せば、簡単にtypoとかのバグを報告できます。(PRでも歓迎)

[![バグ報告のフロー](http://efcl.info/wp-content/uploads/2018/01/04-1515061693.png)](https://asciidwango.github.io/js-primer/basic/function-this/)

前置きはこの辺までで、ここから本編。

> この記事では注釈がないコードはstrict modeとして扱います

# ECMAScript 2015以降の`this`

この記事では`this`という特殊な動作をするキーワードについてを見ていきます。
`this`は基本的にはメソッドの中で利用します。しかし、`this`は読み取り専用のグローバル変数のようなものでどこにでも書くことができます。
また、`this`の参照先（値）は条件によってさまざまです。

`this`の参照先は主に次の条件によって変化します。

- 実行コンテキストにおける`this`
- コンストラクタにおける`this`
- 関数とメソッドにおける`this`
- Arrow Functionにおける`this`

もっとも複雑な条件が存在するのは「関数とメソッドにおける`this`」です。
そのためこの記事では関数と`this`の関係を主に扱います。
(コンストラクタにおける`this`はクラスと一緒に学んだ方がいいので省きます。)

この記事では、さまざまな条件下で変わる`this`の参照先と関数やArrow Functionとの関係を見ていきます。

## 目標: `this`の評価結果を理解する

`this`はさまざまな条件でその評価結果(参照先)は異なります。
基本的な関数やメソッドについては次のようなパターンが考えられます。

この記事では`???`となっている`this`の評価結果がなぜそうなるのかを理解できることを目標にします。
また、この記事では`this`の実用的な範囲外の知識(仕様やトップレベルの`this`など)についても書いているので、実用的に使うにはここまで理解する必要はありません。

![`this`の評価結果の穴埋め](http://efcl.info/wp-content/uploads/2018/01/04-1515062180.png)

- `＊`はどの場合でも結果に影響しないということを示すワイルドカード
- 関数は`fn()`と実行した場合の`this`の評価結果、メソッドは`obj.method()`と実行した場合の`this`の評価結果

表の結果がすべてわかっている人にはこの記事は不要だと思います。

- [Gist: 穴埋め用の`this`表](https://gist.github.com/azu/ca9d5a0f4b7c137bc5e2453f8783bf8c)

記事の最後に答え合わせ用の表を置いています。

## 実行コンテキストと`this` 

JavaScriptには実行コンテキストとして"Script"と"Module"があります。
トップレベルにある`this`は、実行コンテキストによって値が異なります。
実行コンテキストの違いは意識しにくい部分であり、トップレベルで`this`を使うことは混乱を生むことになります。
そのため、コードのトップレベルにおいては`this`を使うべきではありませんが、それぞれの実行コンテキストにおける動作を紹介します。

### スクリプトにおける`this` 

実行コンテキストが"Script"である場合、そのコード直下に書かれた`this`はグローバルオブジェクトを参照します。
グローバルオブジェクトとは、実行環境において異なるものが定義されています。
ブラウザなら`window`オブジェクト、Node.jsなら`global`オブジェクトとなります。

ブラウザでは、`script`要素の`type`属性を指定してない場合は実行コンテキストが"Script"として実行されます。
この`script`要素の直下に書いた`this`はグローバルオブジェクトである`window`オブジェクトとなります。

```html
<script>
// 実行コンテキストは"Script"
console.log(this); // => window
</script>
```

### モジュールにおける`this` 

実行コンテキストが"Module"である場合、そのコード直下に書かれた`this`は常に`undefined`となります。

ブラウザでは、`script`要素の`type="module"`属性がついた場合は実行コンテキストが"Module"として実行されます。
この`script`要素の直下に書いた`this`は`undefined`となります。

```html
<script type="module">
// 実行コンテキストは"Module"
console.log(this); // => undefined
</script>
```

このように、コード直下の`this`は実行コンテキストによって`undefined`となる場合があります。
単純にグローバルオブジェクトを参照したい場合は、`this`ではなく`window`などのグローバルオブジェクトを直接参照した方がよいです。

#### 📝 Note

なぜModuleコンテキストではトップレベルの`this`が`undefined`となるかは次の記事で解説しています。

- [ES6 moduleのtop levelにある`this`の値は何になるのか? | Web Scratch](http://efcl.info/2015/05/06/this-is-es6-module/ "ES6 moduleのtop levelにある`this`の値は何になるのか? | Web Scratch")

また現時点では環境へ依存せずにグローバルオブジェクトを取得するのはややこしい方法が必要です。
しかし、現在(2018-01-01) Stage 3のProposalである`global`が将来的には利用できます。

- [tc39/proposal-global: ECMAScript Proposal, specs, and reference implementation for `global`](https://github.com/tc39/proposal-global "tc39/proposal-global: ECMAScript Proposal, specs, and reference implementation for `global`")

## 関数とメソッドにおける`this`

**関数**を定義する方法として、`function`キーワードによる関数宣言と関数式、Arrow Functionなどがあります。
`this`が参照先を決めるルールはArrow Functionとそれ以外の方法で異なります。

まずは**Arrow Function以外**の関数やメソッドにおける`this`を見ていきます。

## Arrow Function以外の関数における`this` 

Arrow Function以外の関数（メソッドも含む)における`this`は実行時に決まる値となります。
言い方をかえると`this`は関数に渡される暗黙的な引数のようなもので、その渡される値は関数を実行する時に決まります。

次のコードは擬似的なものです。
関数の中に書かれた`this`は、関数の呼び出し元から暗黙的に渡される値を参照することになります。
このルールはArrow Function以外の関数やメソッドで共通した仕組みとなります。Arrow Functionで定義した関数やメソッドはこのルールとは別の仕組みとなります。

<!-- doctest:disable -->

```js
// 擬似的な`this`の値の仕組み
// 関数は引数として暗黙的に`this`の値を受け取るイメージ
function fn(暗黙的渡されるthisの値, 仮引数) {
    console.log(this); // => 暗黙的渡されるthisの値
}
// 暗黙的に`this`の値を引数として渡しているイメージ
fn(暗黙的に渡すthisの値, 引数);
```

<!-- textlint-disable no-js-function-paren -->

関数における`this`の基本的な参照先（暗黙的に関数に渡す`this`の値）は**ベースオブジェクト**となります。
ベースオブジェクトとは「メソッドを呼ぶ際に、そのメソッドのドット演算子またはブラケット演算子のひとつ左にあるオブジェクト」のことを言います。
ベースオブジェクトがない場合の`this`は`undefined`となります。

たとえば、`fn()`のように関数を呼び出したとき、この`fn`関数呼び出しのベースオブジェクトはないため、`this`は`undefiend`となります。
一方、`obj.method()`のようにメソッドを呼び出したとき、この`obj.method`メソッド呼び出しのベースオブジェクトは`obj`オブジェクトとなり、`this`は`obj`となります。

<!-- textlint-enable no-js-function-paren -->

<!-- doctest:disable -->
```js
// `fn`関数はメソッドではないのでベースオブジェクトはない
fn();
// `obj.method`メソッドのベースオブジェクトは`obj`
obj.method();
// `obj1.obj2.method`メソッドのベースオブジェクトは`obj2`
// ドット演算子、ブラケット演算子どちらも結果は同じ
obj1.obj2.method();
obj1["obj2"]["method"]();
```

`this`は関数の定義ではなく呼び出し方で参照する値が異なります。これは、後述する「`this`が問題となるパターン」で詳しく紹介します。
Arrow Function以外の関数では、関数の定義だけを見て`this`の値が何かということは決定できない点には注意が必要です。

### 関数宣言や関数式における`this` 

まずは、関数宣言や関数式の場合を見ていきます。

次の例では、関数宣言と関数式で定義した関数の中の`this`をコンソールに出力しています。
このとき、`fn1`と`fn2`はただの関数として呼び出されています。
つまり、ベースオブジェクトがないため`this`は`undefined`となります。


```js
"use strict";
function fn1() {
    return this;
}
const fn2 = function() {
    return this;
};
// 関数の中の`this`が参照する値は呼び出し方によって決まる
// `fn1`と`fn2`どちらもただの関数として呼び出している
// メソッドとして呼び出していないためベースオブジェクトはない
// ベースオブジェクトがない場合、`this`は`undefined`となる
fn1(); // => undefined
fn2(); // => undefined
```

これは、関数の中に関数を定義して呼びだす場合も同じです。


```js
"use strict";
function outer() {
    console.log(this); // => undefined
    function inner() {
        console.log(this); // => undefined
    }
    // `inner`関数呼び出しのベースオブジェクトはない
    inner();
}
// `outer`関数呼び出しのベースオブジェクトはない
outer();
```

この記事では注釈がないコードはstrict modeとして扱いますが、コード例に`"use strict";`でわざわざstrict modeを明示しています。
なぜなら、strict modeではない場合に`this`が`undefined`の場合は、`this`がグローバルオブジェクトへと暗黙的に変換されてしまう問題があるからです。
strict modeかどうかによって挙動が異なるのは混乱の元であるため、関数呼び出しする関数においては`this`を使うべきではありません。

- [Strict モード - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Strict_mode "Strict モード - JavaScript | MDN")

### メソッド呼び出しにおける`this` 

次に、メソッドの場合を見ていきます。
メソッドの場合は、そのメソッドは何かしらのオブジェクトに所属しています。
なぜなら、JavaScriptではオブジェクトのプロパティとして指定される関数のことをメソッドと呼ぶためです。

次の例では`method1`と`method2`はそれぞれメソッドとして呼び出されています。
このとき、それぞれのベースオブジェクトは`object`となり、`this`は`object`となります。


```js
const object = {
    // 関数式をプロパティの値にしたメソッド
    method1: function() {
        return this;
    },
    // 短縮記法で定義したメソッド
    method2() {
        return this;
    }
};
// メソッド呼び出しの場合、それぞれの`this`はベースオブジェクト(`object`)を参照する
// メソッド呼び出しの`.`の左にあるオブジェクトがベースオブジェクト
object.method1(); // => object
object.method2(); // => object
```

これを利用すれば、メソッドの中から同じオブジェクトに所属する別のプロパティを`this`で参照できます。

```js
const person = {
    fullName: "Brendan Eich",
    sayName: function() {
        // `person.fullName`と書いているのと同じ
        return this.fullName;
    }
};
// `person.fullName`を出力する
console.log(person.sayName()); // => "Brendan Eich"
```

このようにメソッドが所属するオブジェクトのプロパティを、`オブジェクト名.プロパティ名`の代わりに`this.プロパティ名`で参照できます。

オブジェクトは何重にもネストできますが、`this`はベースオブジェクトを参照するというルールは同じです。

次のコードを見てみると、ネストしたオブジェクトにおいてメソッド内の`this`がベースオブジェクトである`obj3`を参照していることが分かります。
このときのベースオブジェクトはドットで繋いだ一番左の`obj1`ではなく、メソッドから見てひとつ左の`obj3`となります。


```js
const obj1 = {
    obj2: {
        obj3: {
            method() {
                return this;
            }
        }
    }
};
// `obj1.obj2.obj3.method`メソッドの`this`は`obj3`を参照
console.log(obj1.obj2.obj3.method() === obj1.obj2.obj3); // => true
```

## `this`が問題となるパターン 

`this`はその関数（メソッドも含む）呼び出しのベースオブジェクトを参照することがわかりました。
`this`は所属するオブジェクトを直接書く代わりとして利用できますが、一方`this`には色々な問題があります。

この問題の原因は`this`がどの値を参照するかは関数の呼び出し時に決まるという性質に由来します。
この`this`の性質が問題となるパターンの代表的な2つの例とそれぞれの対策についてを見ていきます。

### 問題: `this`を含むメソッドを変数に代入した場合 

JavaScriptではメソッドとして定義したものが、後からただの関数として呼び出されることがあります。
なぜなら、メソッドは関数を値にもつプロパティのことで、プロパティは変数に代入し直すことができるためです。

そのため、メソッドとして定義した関数も、別の変数に代入してただの関数として呼び出されることがあります。
この場合には、メソッドとして定義した関数であっても、実行時にはただの関数であるためベースオブジェクトが変わっています。
これは`this`が定義した時点ではなく実行した時に決まるという性質そのものです。

具体的に、`this`が実行時に変わる例を見ていましょう。
次の例では、`person.sayName`メソッドを変数`say`に代入してから実行しています。
このときの`say`関数(`sayName`メソッドを参照)のベースオブジェクトはありません。
そのため、`this`は`undefined`となり、`undefined.fullName`は参照できずに例外をなげます。


```js
"use strict";
const person = {
    fullName: "Brendan Eich",
    sayName: function() {
        // `this`は呼び出し元によってことなる
        return this.fullName;
    }
};
// `sayName`メソッドは`person`オブジェクトに所属する
// `this`は`person`オブジェクトとなる
person.sayName(); // => "Brendan Eich"
// `person.sayName`を`say`変数に代入する
const say = person.sayName;
// 代入したメソッドを関数として呼ぶ
// この`say`関数はどのオブジェクトにも所属していない
// `this`はundefinedとなるため例外を投げる
say(); // => TypeError: Cannot read property 'fullName' of undefined
```

結果的には、次のようなコードが実行されているのと同じです。
次のコードでは、`undefined.fullName`を参照しようとして例外が発生しています。


```js
"use strict";
// const sayName = person.sayName; は次のようなイメージ
const say = function() {
    return this.fullName;
};
// `this`は`undefined`となるため例外をなげる
say(); // => TypeError: Cannot read property 'fullName' of undefined
```

このように、Arrow Function以外の関数において、`this`は定義した時ではなく実行した時に決定されます。
そのため、関数に`this`を含んでいる場合、その関数は意図した呼ばれ方がされないと間違った結果が発生するという問題があります。

この問題の対処法としては大きく分けて2つあります。

ひとつはメソッドとして定義されている関数はメソッドとして呼ぶということです。
メソッドをわざわざただの関数として呼ばなければそもそもこの問題は発生しません。

もうひとつは、`this`の値を指定して関数を呼べるメソッドで関数を実行する方法です。

### 対処法: call、apply、bindメソッド 

関数やメソッドの`this`を明示的に指定して関数を実行する方法もあります。
`Function`（関数オブジェクト）には`call`、`apply`、`bind`といった明示的に`this`を指定して関数を実行するメソッドが用意されています。

`call`メソッドは第一引数に`this`としたい値を指定し、残りの引数は呼びだす関数の引数となります。
暗黙的に渡される`this`の値を明示的に渡せるメソッドといえます。

<!-- doctest:disable -->
```js
関数.call(thisの値, ...関数の引数);
```

次の例では`this`に`person`オブジェクトを指定した状態で`say`関数を呼び出しています。
`call`メソッドの第二引数で指定した値が、`say`関数の仮引数`message`に入ります。


```js
function say(message) {
    return `${message} ${this.fullName}！`;
}
const person = {
    fullName: "Brendan Eich"
};
// `this`を`person`にして`say`関数を呼びだす
say.call(person, "こんにちは"); // => "こんにちは Brendan Eich！"
// `say`関数をそのまま呼び出すと`this`は`undefined`となるため例外が発生
say("こんにちは"); // => TypeError: Cannot read property 'fullName' of undefined
```

`apply`メソッドは第一引数に`this`とする値を指定し、第二引数に関数の引数を配列として渡します。

<!-- doctest:disable -->
```js
関数.apply(thisの値, [関数の引数1, 関数の引数2]);
```

次の例では`this`に`person`オブジェクトを指定した状態で`say`関数を呼び出しています。
`apply`メソッドの第二引数で指定した配列は、自動的に展開されて`say`関数の仮引数`message`に入ります。


```js
function say(message) {
    return `${message} ${this.fullName}！`;
}
const person = {
    fullName: "Brendan Eich"
};
// `this`を`person`にして`say`関数を呼びだす
// callとは異なり引数を配列として渡す
say.apply(person, ["こんにちは"]); // => "こんにちは Brendan Eich！"
// `say`関数をそのまま呼び出すと`this`は`undefined`となるため例外が発生
say("こんにちは"); // => TypeError: Cannot read property 'fullName' of undefined
```

`call`メソッドと`apply`メソッドの違いは、関数の引数への値の渡し方が異なるだけです。
また、どちらのメソッドも`this`の値が不要な場合は`null`を渡すのが一般的です。


```js
function add(x, y) {
    return x + y;
}
// `this`は不要な場合はnullを渡す
add.call(null, 1, 2); // => 3
add.apply(null, [1, 2]); // => 3
```

最後に`bind`メソッドについてです。
名前のとおり`this`の値を束縛（bind）した新しい関数を作成します。

<!-- doctest:disable -->
```js
関数.bind(thisの値, ...関数の引数); // => thisや引数がbindされた関数
```

次の例では`this`を`person`オブジェクトに束縛した`say`関数の関数を作っています。
`bind`メソッドの第二引数以降に値を渡すことで、束縛した関数の引数も束縛できます。


```js
function say(message) {
    return `${message} ${this.fullName}！`;
}
const person = {
    fullName: "Brendan Eich"
};
// `this`を`person`に束縛した`say`関数をラップした関数を作る
const sayPerson = say.bind(person, "こんにちは");
sayPerson(); // => "こんにちは Brendan Eich！"
```

この`bind`メソッドをただの関数で表現すると次のように書けます。
`bind`は`this`や引数を束縛した関数を作るメソッドということがわかります。


```js
function say(message) {
    return `${message} ${this.fullName}！`;
}
const person = {
    fullName: "Brendan Eich"
};
// `this`を`person`に束縛した`say`関数をラップした関数を作る
//  say.bind(person, "こんにちは"); は次のようなラップ関数を作る
const sayPerson = () => {
    return say.call(person, "こんにちは");
};
sayPerson(); // => "こんにちは Brendan Eich！"
```

このように`call`、`apply`、`bind`メソッドを使うことで`this`を明示的に指定した状態で関数を呼び出せます。
しかし、毎回関数を呼びだすたびにこれらのメソッドを使うのは、関数を呼びだすための関数が必要になってしまい手間がかかります。
そのため、基本的には「メソッドとして定義されている関数はメソッドとして呼ぶこと」でこの問題を回避するほうがよいでしょう。
その中で、どうしても`this`を固定したい場合には`call`、`apply`、`bind`メソッドを利用します。

### 問題: コールバック関数と`this`

コールバック関数の中で`this`を参照すると問題となる場合があります。
この問題は、メソッドの中で`Array#map`メソッドなどコールバック関数を扱う場合に発生しやすいです。

具体的に、コールバック関数における`this`が問題となっている例を見てみましょう。
次のコードでは`prefixArray`メソッドの中で`Array#map`メソッドを使っています。
このとき、`Array#map`メソッドのコールバック関数の中で、`Prefixer`オブジェクトを参照するつもりで`this`を参照しています。

しかし、このコールバック関数における`this`は`undefined`となり、`this.prefix`は`undefined.prefix`であるためTypeErrorとなります。


```js
const Prefixer = {
    prefix: "pre",
    /**
     * `strings`配列の各要素にprefixをつける
     */
    prefixArray(strings) {
        return strings.map(function(string) {
            // コールバック関数における`this`は`undefined`となる(strict mode)
            // そのため`this.prefix`は`undefined.prefix`となり例外が発生する
            return this.prefix + "-" + string;
        });
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
Prefixer.prefixArray(["a", "b", "c"]); // => TypeError: Cannot read property 'prefix' of undefined
```

なぜコールバック関数の中での`this`が`undefined`となるのかを見ていきます。
`Array#map`メソッドにはコールバック関数として、その場で定義した匿名関数を渡していることに注目してください。

<!-- textlint-disable eslint -->
<!-- doctest:disable -->
```js
// ...
    prefixArray(strings) {
        // 匿名関数をコールバック関数として渡している
        return strings.map(function(string) {
            return this.prefix + "-" + string;
        });
    }
// ...
```
<!-- textlint-enable eslint -->

<!-- textlint-disable no-js-function-paren -->

このとき、`Array#map`メソッドに渡しているコールバック関数は`callback()`のようにただの関数として呼び出されます。
つまり、コールバック関数として呼びだすとき、この関数にはベースオブジェクトはありません。
そのため`callback`関数の`this`は`undefined`となります。

先ほどの匿名関数をコールバック関数として渡しているのは、一度`callback`変数に入れてから渡しても結果は同じです。

<!-- textlint-enable no-js-function-paren -->


```js
const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        // コールバック関数は`callback()`のように呼び出される
        // そのためコールバック関数における`this`は`undefined`となる(strict mode)
        const callback = function(string) {
            return this.prefix + "-" + string;
        };
        return strings.map(callback);
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
Prefixer.prefixArray(["a", "b", "c"]); // => TypeError: Cannot read property 'prefix' of undefined
```

#### 対処法: `this`を一時変数へ代入する

コールバック関数内での`this`の参照先が変わる問題への対処法として、`this`を別の変数に代入し、その`this`の参照先を保持するという方法があります。

`this`は関数の呼び出し元で変化し、その参照先は呼び出し元におけるベースオブジェクトです。
`prefixArray`メソッドの呼び出しにおいては、`this`は`Prefixer`オブジェクトです。
しかし、コールバック関数はあらためて関数として呼び出されるため`this`が`undefined`となってしまうのが問題でした。

そのため、最初の`prefixArray`メソッド呼び出しにおける`this`の参照先を一時変数として保存することでこの問題を回避できます。
つぎのように、`prefixArray`メソッドの`this`を`that`変数に保持しています。
コールバック関数からは`this`の代わりに`that`変数を参照することで、コールバック関数からも`prefixArray`メソッド呼び出しと同じ`this`を参照できます。


```js
const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        // `that`は`prefixArray`メソッド呼び出しにおける`this`となる
        // つまり`that`は`Prefixer`オブジェクトを参照する
        const that = this;
        return strings.map(function(string) {
            // `this`ではなく`that`を参照する
            return that.prefix + "-" + string;
        });
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]
```

もちろん`Function#call`メソッドなどで明示的に`this`を渡して関数を呼びだすこともできます。
また、`Arry#map`メソッドなどは`this`となる値引数として渡せる仕組みを持っています。
そのため、つぎのように第二引数に`this`となる値を渡すことでも解決できます。


```js
const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        // `Array#map`メソッドは第二引数に`this`となる値を渡せる
        return strings.map(function(string) {
            // `this`が第二引数の値と同じになる
            // つまり`prefixArray`メソッドと同じ`this`となる
            return this.prefix + "-" + string;
        }, this);
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]
```

しかし、これら解決方法はコールバック関数において`this`が変わることを意識して書く必要があります。
そもそもの問題としてメソッド呼び出しとその中でのコールバック関数における`this`が変わってしまうのが問題でした。
ES2015では`this`を変えずにコールバック関数を定義する方法として、Arrow Functionが導入されました。

### 対処法: Arrow Functionでコールバック関数を扱う

通常の関数やメソッドは呼び出し時に暗黙的に`this`の値を受け取り、関数内の`this`はその値を参照します。
一方、Arrow Functionはこの暗黙的な`this`の値を受け取りません。
そのためArrow Function内の`this`は、スコープチェーンの仕組みと同様で外側の関数(この場合は`prefixArray`メソッド)に探索します。
これにより、Arrow Functionで定義したコールバック関数は呼び出し方には関係なく、常に外側の関数の`this`をそのまま利用します。

Arrow Functionを使うことで、先ほどのコードは次のように書くことができます。


```js
const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        return strings.map((string) => {
            // Arrow Function自体は`this`を持たない
            // `this`は外側の`prefixArray`関数がもつ`this`を参照する
            // そのため`this.prefix`は"pre"となる
            return this.prefix + "-" + string;
        });
    }
};
// この時、`prefixArray`のベースオブジェクトは`Prefixer`となる
// つまり、`prefixArray`メソッド内の`this`は`Prefixer`を参照する
const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]
```

このように、Arrow Functionでのコールバック関数における`this`は簡潔です。
そのため、コールバック関数内での`this`の対処法として`this`を代入する方法を紹介しましたが、
ES2015からはArrow Functionを使うのがもっとも簡潔です。

このArrow Functionと`this`の関係についてもっと詳しく見ていきます。

## Arrow Functionと`this` 

Arrow Functionで定義された関数やメソッドにおける`this`がどの値を参照するかは関数の定義時（静的）に決まります。
一方、Arrow Functionではない関数においては、`this`は呼び出し元に依存するため関数の実行時（動的）に決まります。

Arrow Functionとそれ以外の関数で大きく違うことは、Arrow Functionは`this`を暗黙的な引数として受け付けないということです。
そのため、Arrow Function内には`this`が定義されていません。このときの`this`は外側のスコープ（関数）の`this`を参照します。

これは変数におけるスコープチェーンの仕組みと同様で、そのスコープに`this`が定義されていない場合には外側のスコープを探索するのと同じです。
そのため、Arrow Function内の`this`の参照先は、常に外側のスコープ（関数）へと`this`の定義を探索しに行きます（詳細は[スコープチェーン][]を参照）。
また、`this`は読み取り専用のキーワードであるため、ユーザーが`this`という変数を定義できません。

```js
const this = "thisは読み取り専用"; // => SyntaxError: Unexpected token this
```

これにより、Arrow Functionにおける`this`は通常の変数と同じように、どの値を参照するかは静的に決まるという性質があります（詳細は[静的スコープ][]を参照）。
つまりArrow Functionにおける`this`の参照先は「Arrow Function自身の外側のスコープにあるもっとも近い関数の`this`の値」となります。

具体的な例を元にArrow Functionにおける`this`の動きを見ていきましょう。

まずは、関数式のArrow Functionを見ていきます。

次の例では、関数式で定義したArrow Functionの中の`this`をコンソールに出力しています。
このとき、`fn`の外側には関数はないため、「自身より外側のスコープにあるもっとも近い関数」の条件にあてはまるものはありません。
このときの`this`はトップレベルに書かれた`this`と同じ値になります。


```js
// Arrow Functionで定義した関数
const fn = () => {
    // この関数の外側には関数は存在しない
    // トップレベルの`this`と同じ値
    return this;
};
fn() === this; // => true
```

トップレベルに書かれた`this`の値は実行コンテキストによって異なることを紹介しました。
`this`の値は、実行コンテキストが"Script"ならばグローバルオブジェクトとなり、"Module"ならば`undefined`となります。

次の例のように、Arrow Functionを包むように通常の関数が定義されている場合はどうでしょうか。


```js
"use strict";
function outer() {
    // Arrow Functionで定義した関数を返す
    return () => {
        // この関数の外側には`outer`関数が存在する
        // `outer`関数に`this`を書いた場合と同じ
        return this;
    };
}
// `outer`関数の返り値はArrow Functionにて定義された関数
const innerArrowFunction = outer();
console.log(innerArrowFunction()); // => undefined;
```

Arrow Functionにおける`this`は「自身の外側のスコープにあるもっとも近い関数の`this`の値」となります。
つまり、このArrow Functionにおける`this`は`outer`関数で`this`を参照した場合と同じ値になります。


```js
"use strict";
function outer() {
    // `outer`関数直下の`this`
    const that = this;
    // Arrow Functionで定義した関数を返す
    return () => {
        // Arrow Function自身は`this`を持たない
        // `outer`関数に`this`を書いた場合と同じ
        return that;
    };
}
// `outer()`と呼び出した時の`this`は`undefined`(strict mode)
const innerArrowFunction = outer();
console.log(innerArrowFunction()); // => undefined;
```

### メソッドとコールバック関数とArrow Function

メソッド内におけるコールバック関数はArrow Functionをもっと活用できるパターンです。
`function`キーワードでコールバック関数を定義すると、`this`の値はコールバック関数の呼ばれ方を意識する必要があります。
なぜなら、`function`キーワードで定義した関数における`this`は呼び出し方によって変わるためです。

コールバック関数側から見ると、どのように呼ばれるかによって変わる`this`を使うことはエラーとなる場合もあるため使えません。
そのため、コールバック関数の外側のスコープで`this`を一時変数に代入し、それを使うという回避を取っていました。

```js
// `callback`関数を受け取り呼び出す関数
const callCallback = (callback) => {
    // `callback`を呼び出す実装
};

const object = {
    method() {
        callCallback(function() {
            // ここでの `this` は`callCallback`の実装に依存する
            // `callback()`のように単純に呼び出されるなら`this`は`undefined`になる
            // `Function#call`などを使い特定のオブジェクトを指定するかもしれない
            // この問題を回避するために`const that = this`のような一時変数を使う
        });
    }
};
```

一方、Arrow Functionでコールバック関数を定義した場合は、1つ外側の関数の`this`を参照します。
このときのArrow Functionで定義したコールバック関数における`this`は呼び出し方によって変化しません。
そのため、`this`を一時変数に代入するなどの回避方法は必要ありません。

```js
// `callback`関数を受け取り呼び出す関数
const callCallback = (callback) => {
    // `callback`を呼び出す実装
};

const object = {
    method() {
        callCallback(() => {
            // ここでの`this`は1つ外側の関数における`this`と同じ
        });
    }
};
```

このArrow Functionにおける`this`は呼び出し方の影響を受けません。
つまり、コールバック関数がどのように呼ばれるかという実装についてを考えることなく`this`を扱うことができます。


```js
const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        return strings.map((string) => {
            // `Prefixer.prefixArray()` と呼び出されたとき
            // `this`は常に`Prefixer`を参照する
            return this.prefix + "-" + string;
        });
    }
};
const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]
```

### Arrow Functionは`this`をbindできない

Arrow Functionで定義した関数には`call`、`apply`、`bind`を使った`this`の指定は単に無視されます。
これは、Arrow Functionは`this`をもつことができないためです。

次のようにArrow Functionで定義した関数に対して`call`で`this`をしても、`this`の参照先が代わっていないことが分かります。
同様に`apply`や`bind`メソッドを使った場合も`this`の参照先が変わりません。


```js
const fn = () => {
    return this;
};
// Scriptコンテキストの場合、スクリプト直下のArrow Functionの`this`はグローバルオブジェクト
console.log(fn()); // グローバルオブジェクト
// callで`this`を`{}`にしようとしても、`this`は変わらない
fn.call({}); // グローバルオブジェクト
```

最初に述べたよう`function`キーワードで定義した関数は呼び出し時に、ベースオブジェクトが暗黙的な引数のように`this`の値として渡されます。
一方、Arrow Functionの関数は呼び出し時に`this`を受け取らずに、定義時のArrow Functionにおける`this`の参照先が静的に決定されます。

<!-- textlint-disable -->

また、`this`が変わらないのはあくまでArrow Functionで定義した関数だけで、Arrow Functionの`this`が参照する「自身の外側のスコープにあるもっとも近い関数の`this`の値」は`call`メソッドで変更できます。

<!-- textlint-enable -->


```js
const object = {
    method() {
        const arrowFunction = () => {
            return this;
        };
        return arrowFunction();
    }
};
// 通常の`this`は`object.method`の`this`と同じ
console.log(object.method()); // => object
// `object.method`の`this`を変更すれば、Arrow Functionの`this`も変更される
console.log(object.method.call("THAT")); // => "THAT"
```

## `this`の評価結果のまとめ

`this`は状況によって異なる値を参照する性質を持ったキーワードであることについてを紹介しました。
その`this`の評価結果をまとめると次の表のようになります。

![`this`の評価結果のまとめ](http://efcl.info/wp-content/uploads/2018/01/04-1515062936.png)

- [Gist: `this` の穴埋めの解答](https://gist.github.com/azu/9833e2f66bc8f0c97258ab0c81258469 "`this` の穴埋めの解答")

<!-- textlint-disable -->

実際にブラウザで実行した結果は[What is `this` value in JavaScript?](https://azu.github.io/what-is-this/ "What is `this` value in JavaScript?")で確認できます。

<!-- textlint-enable -->

Chrome 63を使ってる人は"Module"コンテキストのトップレベルArrow Functionにおける`this`の挙動が表と一致しないことに気づいたかもしれません。
Chrome 63では次のコードを"Module"コンテキストで実行すると`this`が`undefined`ではなく、グローバルオブジェクトを参照します。

```html
<script type="module">
// "Module" context @ Chrome 63
const fn = () => this;
console.log(fn()); // => window
</script>
```

これはChrome(V8)のバグです。すでに報告して最新のCanary(65相当)では修正されています。

- [791334 - `this` in top level Arrow Function in Module Context should be `undefined` - chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=791334 "791334 - `this` in top level Arrow Function in Module Context should be `undefined` - chromium - Monorail")

Chrome 63とChrome 65では次のサイトの結果は異なることが分かります。

- [What is `this` value in JavaScript?](https://azu.github.io/what-is-this/ "What is `this` value in JavaScript?")

## まとめ

`this`はオブジェクト指向プログラミングのメソッドでの利用を目的としています。
メソッド以外においても`this`は評価できますが、実行コンテキストやstrict modeなどによって結果が異なり混乱の元となります。
そのため、メソッド以外では`this`を使うべきではありません（ここでは紹介してないコンストラクタは例外です）

この記事で紹介している半分以上（トップレベルにおける`this`、関数呼び出しの`this`など)のことは知らなくても、実用的にはあまり問題はありません。
実際にはメソッドやArrow Functionにおける`this`について理解していれば十分です。
特殊な書き方をしていると必要になる知識が半分なので、普通の書き方をして普通の使い方をしましょう。

- ['this' in TypeScript · Microsoft/TypeScript Wiki](https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript "&#39;this&#39; in TypeScript · Microsoft/TypeScript Wiki")
    - TypeScript向けですが、この記事で扱った内容が簡潔にまとまっています

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">+infinity<br>JS `this` is for OO methods, not standalone functions. Never use `this` as a parameter to non-method functions. <a href="https://t.co/tFHkqEepcM">https://t.co/tFHkqEepcM</a></p>&mdash; Allen Wirfs-Brock (@awbjs) <a href="https://twitter.com/awbjs/status/938272440085446657?ref_src=twsrc%5Etfw">December 6, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

> ECMAScript 2015の仕様策定者であるAllen Wirfs-Brock‏氏の意見

また、メソッドにおいても`this`は呼び出し方によって異なる値となり、それにより発生する問題と対処法についてを紹介しました。
コールバック関数における`this`はArrow Functionを使うことで分かりやすく解決できます。
この背景にはArrow Functionで定義した関数は`this`を持たないという性質があります。

もっと`this`について理解してみたい人は、書籍版も実行しながら見ると良さそうです。

- [関数とthis · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/function-this/ "関数とthis · JavaScriptの入門書 #jsprimer")

書籍の更新を追いたい方はリポジトリをStarやWatchしてください。

> [asciidwango/js-primer: JavaScriptの入門書](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")

<a class="github-button" href="https://github.com/asciidwango/js-primer" data-size="large" data-show-count="true" aria-label="Star asciidwango/js-primer on GitHub">Star</a>
<a class="github-button" href="https://github.com/asciidwango/js-primer/subscription" data-size="large" data-show-count="true" aria-label="Watch asciidwango/js-primer on GitHub">Watch</a>

<!-- Place this tag in your head or just before your close body tag. -->
<script async defer src="https://buttons.github.io/buttons.js"></script>

### 📝 Note: This-Binding Syntax proposal

通常の関数をmixin関数のように扱いやすくする`::`という構文のProposalがありましたが、しばらくステータスが更新されていません。
(Proposalの元々のAuthorがTC39メンバーではなくなったのも1つの理由)

- [ECMAScript This-Binding Syntax](https://github.com/tc39/proposal-bind-operator "ECMAScript This-Binding Syntax")

### 📝 `this`名前解決の仕様

`this` bindingの設定は、関数を呼ぶときの次の仕様で決定される。

- https://tc39.github.io/ecma262/#sec-evaluatecall
- https://tc39.github.io/ecma262/#sec-call
- https://tc39.github.io/ecma262/#sec-ecmascript-function-objects-call-thisargument-argumentslist
- https://tc39.github.io/ecma262/#sec-ordinarycallbindthis

大きく分けると、WriteとReadの２つのフェーズで`this`が決まる。
ここでWriteとReadとつけているけど、仕様にそういうフェーズがあるわけじゃなくて自分の解釈です。

Write: 関数呼び出しをする際に、その関数のFunction Environment Recordsの`[[ThisValue]]`に`this`の値を入れる

`[[ThisValue]]`には次のステップの結果が入る。
(ただしArrow Functionはlexicalなので`[[ThisValue]]`を持たない。[Arrow Functionの詳細](https://tc39.github.io/ecma262/#sec-ordinarycallbindthis))

[12.3.4.2Runtime Semantics: EvaluateCall(func, ref, arguments, tailPosition )](https://tc39.github.io/ecma262/#sec-evaluatecall "12.3.4.2Runtime Semantics: EvaluateCall(func, ref, arguments, tailPosition )")のステップを参照する

- プロパティならば
	- `this`は`GetThisValue()`の結果
		- `super.prop`なら
			- `super`となる
		- それ以外なら
			- [6.2.4.1GetBase ( V )](https://tc39.github.io/ecma262/#sec-getbase "6.2.4.1GetBase ( V )")の結果
            - ベースオブジェクトが`this`となる
- それ以外(ただの関数呼び出し)なら[WithBaseObject](https://tc39.github.io/ecma262/#sec-object-environment-records-withbaseobject)の結果
	- withの場合
		- with bingingの値
	- それ以外
		- undefined

Read: `this`という識別子から、その値が何を参照するかを決めるフェーズ

- <https://tc39.github.io/ecma262/#sec-getthisenvironment>
	- `this`の解決はスコープと同じく、一個つづ順に内側から外側へ探すのはスコープチェーンと同じ
	    - 見つかるまで再帰的に外側のEnvironment Recordsを探索する
	    - 見つからない場合は、"Script"や"Module"の実行コンテキストの`this`の値になる
	    - "Module"の[GetThisBinding ( )](https://tc39.github.io/ecma262/#sec-module-environment-records-getthisbinding "GetThisBinding ( )")は常に`undefined`
	    - "Script"の[GetThisBinding ( )](https://tc39.github.io/ecma262/#sec-global-environment-records-getthisbinding "GetThisBinding ( )")は`[[GlobalThisValue]]`
	- ただし、Arrow Functionは`[[ThisValue]]`を持たないので必ずスキップされる
	- もっと近い関数(Function Environment Records)の`[[ThisValue]]`の値が`this`の値となる

[JavaScriptとは]: https://asciidwango.github.io/js-primer/basic/introduction/
[関数と宣言]: https://asciidwango.github.io/js-primer/basic/function-declaration/
[関数とスコープ]: https://asciidwango.github.io/js-primer/basic/function-scope/
[スコープチェーン]: https://asciidwango.github.io/js-primer/basic/function-scope/#scope-chain
[静的スコープ]: https://asciidwango.github.io/js-primer/basic/function-scope/#static-scope
[動的スコープ]: https://asciidwango.github.io/js-primer/basic/function-scope/#dynamic-scope


