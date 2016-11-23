---
title: "class extends構文を使わずにArrayを継承する"
author: azu
layout: post
date : 2016-11-23T17:19
category: JavaScript
tags:
    - JavaScript
    - ECMAScript

---

ES2015から`class extends`を使うことでクラスを継承することができます。
これにより今まで継承するのが難しかったビルトインの`Array`や`Error`の継承ができるようになってます。

- [Chapter 28. Subclassing Built-ins](http://speakingjs.com/es5/ch28.html "Chapter 28. Subclassing Built-ins")
- [How ECMAScript 5 still does not allow to subclass array — Perfection Kills](http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/ "How ECMAScript 5 still does not allow to subclass array — Perfection Kills")

`class`を使うと次のように普通に`extends`できます。

```js
class SubArray extends Array {
  last(){
    return this[this.length - 1];
  }
}
var array = new SubArray(1,2,3);
array.push("x");
console.log(array.last()); // => "x"
console.log(array.length); // => 4
console.log(array instanceof Array); // => true
console.log(array.join()); // => "1,2,3,x"
array[10] = "no such item";
console.log(array.length); // => 11
```

内部的にはprototypeであることには変わらないので、`class`という新しい構文を使わなくても同じ表現をすることがES2015からは可能です。(新しい構文じゃなくて関数的な書き方でできるという話)

```js
function SubArray() {
  return Reflect.construct(Array, arguments, SubArray)
}
SubArray.prototype.last = function(){
  return this[this.length - 1];
}
Reflect.setPrototypeOf(SubArray.prototype, Array.prototype);
Reflect.setPrototypeOf(SubArray, Array);
var array = new SubArray(1,2,3);
array.push("x");
console.log(array.last()); // => "x"
console.log(array.length); // => 4
console.log(array instanceof Array); // => true
console.log(array.join()); // => "1,2,3,x"
array[10] = "no such item";
console.log(array.length); // => 11
```

`Reflect.construct`を使うことで`length`プロパティの特殊な動きもちゃんと継承できています。

- [Reflect.construct() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct)
- [extending an ES6 class using ES5 syntax?](https://esdiscuss.org/topic/extending-an-es6-class-using-es5-syntax)
- [exotic objectがhost objectの呼び名が変わったものという風潮 - ぶれすとつーる](http://nazomikan.hateblo.jp/entry/2015/05/17/000755 "exotic objectがhost objectの呼び名が変わったものという風潮 - ぶれすとつーる")