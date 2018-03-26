---
title: "The Refactoring Tales - JavaScriptのリファクタリング本を読んだ"
author: azu
layout: post
date : 2015-01-11T18:17
category: JavaScript
tags:
    - JavaScript
    - リファクタリング
    - 電子書籍
    - Books

---



# [The Refactoring Tales](http://javascriptplayground.com/the-refactoring-tales/refactoring-tales.html "The Refactoring Tales -")

- GitHub: [jackfranklin/the-refactoring-tales](https://github.com/jackfranklin/the-refactoring-tales "jackfranklin/the-refactoring-tales")
- 読んだ日付: 2015年1月11日 

まだ4章の途中までしか書かれてないですが、ウェブ版は無料で読めてPDF版等は買えるようになるようです(6-7章ぐらい予定)

- [The Refactoring Tales - JavaScript Playground](http://javascriptplayground.com/the-refactoring-tales/ "The Refactoring Tales")

また[GitHubにソースが公開](https://github.com/jackfranklin/the-refactoring-tales "jackfranklin/the-refactoring-tales")されています(ウェブページはまだ反映されてない感じのtypoの修正等がありました)

----

## 感想

1,2章はフロントのJavaScriptで、jQuery世界を例にjQueryでべったり書いてしまったものをどうやって分けていくかの話。

1章はとても読みやすくて完成度もあるので読んでみるといい気がします、2章のカヌーセルの話はもっと深くやっても良かったような気がします。

縦に並ぶ`$`を見かけるとつらい感じになりますが、まずは手が出しやすい場所からやって見ると見えてくるかもしれないという感じがしました。

3章では不必要に複雑化して、過剰な非同期の使い方、早期リターンでスッキリさせるなどよくある感じの話でした。

4章ではより一般的な話。単一責任の原則とかPub/SubとかJavaScriptに限らない話な気がします。

5章は多分MV*のFat Controllerの話が予定されてる気がします。

-----

## [Introduction](http://javascriptplayground.com/the-refactoring-tales/refactoring-tales.html#introduction)

- リファクタリングとは何か
- テストはリファクタリングした時に壊してないかの自信を持つために必要
	- また休憩後にスグ作業に戻るのに大事

## [Tale 1: Terrible Tabs](http://javascriptplayground.com/the-refactoring-tales/refactoring-tales.html#tale-1-terrible-tabs "Tale 1: Terrible Tabs")

jQuery世界のタブUIをリファクタリングする話

`tabularize`というタブUIを作る関数をリファクタリングする

```javascript
var tabularize = function() {
  var active = location.hash;
  if(active) {
    $(".tabs").children("div").hide();
    $(active).show();
    $(".active").removeClass("active");
    $(".tab-link").each(function() {
      if($(this).attr("href") === active) {
        $(this).parent().addClass("active");
      }
    });
  }
  $(".tabs").find(".tab-link").click(function() {
    $(".tabs").children("div").hide();
    $($(this).attr("href")).show();
    $(".active").removeClass("active");
    $(this).parent().addClass("active");
    return false;
  });
};
```

やってることとしては

- URL.hashからどの位置にいるのかを判定
- タブをクリックした時に中身の書き換えを行う

### Reuse of Selectors

Step 1 としてjQueryセレクタが重複してるのをまとめる。

```
    $(".tabs")
    $(".tabs").children("div")
    $(".tab-link")
// これらに名前を付けてセレクタ重複を取り除く
```

- ちょっとした変更だけど重複が減って、次に変更するときにそれぞれをここに変更する必要がなくなる。
- 複雑なセレクタを分解して名前を付けることで理解するのに役立つ

### More Duplication

次に`"active"`という文字列が何回も出てることがわかるので、
`var activeClass = "active"`という感じで取り出す。

ここで、この`activeClass`の使われどころを見ていく

```javascript
$("." + activeClass).removeClass(activeClass);
$(this).parent().addClass(activeClass);
```

- 現在のアクティブ要素をアクティブではなくす
- 新しいアクティブとなって要素の親にアクティブにさせる

こういう手続き的な処理はまとめて抽象化した方が理解しやすい。


```javascript
var activateLink = function(elem) {
  $("." + activeClass).removeClass(activeClass);
  $(elem).addClass(activeClass);
};
```

という`activateLink`関数に取り出す。

### Higher level duplication

```javascript
var tabsWrapper = $(".tabs");
var tabs = tabsWrapper.children("div");
var tabLinks = tabsWrapper.find(".tab-link");
var activeClass = "active";
var activateLink = function(elem) {
  $("." + activeClass).removeClass(activeClass);
  $(elem).addClass(activeClass);
};

var active = location.hash;
if(active) {
  tabs.hide();
  $(active).show();
  tabLinks.each(function() {
    if($(this).attr("href") === active) {
      activateLink($(this).parent());
    }
  });
}
tabLinks.click(function() {
  tabs.hide();
  $($(this).attr("href")).show();
  activateLink($(this).parent());
  return false;
});
```

ここまでリファクタリングした`tabularize`を見てみると、大き分けて2つのブロックがあることが分かる。

```javascript
if(active) {
  // do tab things
};

tabLinks.click(function() {
  // do tab things
};
```

この2つのブロックを見ると共通してやってることがあるのが見える

- `tabs.hide()`
- `特定のタブ.show()`
- `activateLink`を呼ぶ

タブ全部をhideしてから-> showという流れを一つのくくりにして`activateTab`にまとめる。

```javascript
var activateTab = function(tabSelector) {
  tabs.hide();
  $(tabSelector).show();
};
```

メソッドは5行以上にするべきじゃないという話があったよという話。

### Merging the branches

ここまでリファクタリングすると、先ほどの2種類のブロックはそれぞれ`activateLink`と`activateTab`という関数を呼び出すという事をやってるのは同じになってる。

```javascript
  activateTab(active);
  tabLinks.each(function() {
    if($(this).attr("href") === active) {
      activateLink($(this).parent());
    }
  });
```

というのは`each`してるけど、結局はある一つのactiveなものを対象に`activateLink`を呼んでいると読み替え出来る。

なので、あるひとつのものを取り出してから(fileter)、`activateLink`を呼ぶというふうに書き換え出来る。

```javascript
  activateTab(active);
  var link = tabLinks.filter(function() { 
    return $(this).attr("href") === active;
  }).parent();
  activateLink(link);
```

こうするとますます`activateTab`と`activateLink`をセットに出来そうな感じになる。それを`transition`という別の関数にまとめて、最終的に以下のような感じになった。

```javascript
var tabsWrapper = $(".tabs");
var tabs = tabsWrapper.children("div");
var tabLinks = tabsWrapper.find(".tab-link");
var activeClass = "active";

var activateLink = function(elem) {
  $("." + activeClass).removeClass(activeClass);
  $(elem).addClass(activeClass);
};

var activateTab = function(tabSelector) {
  tabs.hide();
  $(tabSelector).show();
};

var transition = function(selector) {
  activateTab(selector);
  activateLink(selector);
};

var active = location.hash;
if(active) {
  transition(active);
}
tabLinks.click(function() {
  transition($(this).attr("href"));
  return false;
});
```

## [Tale 2: Cringey Carousels](http://javascriptplayground.com/the-refactoring-tales/refactoring-tales.html#tale-2-cringey-carousels "Tale 2: Cringey Carousels")

第二章はjQueryで書かれたCarouselデザインのリファクタリング

![image](https://monosnap.com/image/YtmnAR4sEZDvL4nVDDKpjeHXAUVnWY.png)

(こういうデザインのやつの話)

```javascript
$(function() {
  if(location.hash && location.hash.indexOf("image") > -1) {
    var number = parseInt(location.hash.charAt(location.hash.length -1));
    $("ul").animate({
      "margin-left": number * -300
    }, function() {
      currentImage = number;
      $(".controls span").text("Current: " + (currentImage + 1));
    });
  }
  var timeout = setTimeout(function() {
    $(".left").trigger("click");
  }, 10000);
  
  var currentImage = 0;
  // <- ボタン
  $(".left").click(function() {
    clearTimeout(timeout);
    if(currentImage == $("li").length - 1) {
      $("ul").animate({
        "margin-left": 0
      }, function() {
        currentImage = 0;
        $(".controls span").text("Current: " + (currentImage + 1));
      });
    } else {
      $("ul").animate({
        "margin-left": "-=300px"
      }, function() {
        currentImage+=1;
        $(".controls span").text("Current: " + (currentImage + 1));
      });
    }
    timeout = setTimeout(function() {
      $(".left").trigger("click");
    }, 10000);
    return false;
  });
  // -> ボタン
  $(".right").click(function() {
    clearTimeout(timeout);
    if(currentImage == 0) {
      $("ul").animate({
        "margin-left": ($("li").length - 1) * -300
      }, function() {
        currentImage = $("li").length - 1;
        $(".controls span").text("Current: " + (currentImage + 1));
      });
    } else {
      $("ul").animate({
        "margin-left": "+=300px"
      }, function() {
        currentImage-=1;
        $(".controls span").text("Current: " + (currentImage + 1));
      });
    }
    timeout = setTimeout(function() {
      $(".left").trigger("click");
    }, 10000);
    return false;
  });
});
```

ざっと見て色々な問題が見つかると思う。

- **重複** -  left right
- **良くないセレクタ** `$("ul")`とかの汎用的すぎるやつ
- **マジックバリュー**  `10000`とか`300`とか
- 全体が`$(function() { })` に包まれていて息苦しい

色々あるけど、簡単なところからやっていこう

### return false; the anti-pattern

> [jQuery Events: Stop (Mis)Using Return False | Fuel Your Coding](http://fuelyourcoding.com/jquery-events-stop-misusing-return-false/ "jQuery Events: Stop (Mis)Using Return False | Fuel Your Coding")


jQuery世界における`return false`は`preventDefault()`と`stopPropagation()`を一緒に呼ぶのと同じ意味。余計なことをやってしまうかもしれないので普通に個別で`preventDefault`を使うべき

```javascript
$(".right").click(function() {
  // things happen here
  return false;
});
// => 普通にpreventDefaultを使おう
$(".right").click(function(event) {
  // things happen here
  event.preventDefault();
});
```

### on() and off()

今は`click`じゃなくて`on`使え

### Repeated Numbers

`300`とか`10000`とかマジックナンバーは変数にいれて名前をつけよう

```javascript
var CAROUSEL_TRANSITION_TIME = 10000;
```

### Caching selectors

jQueryセレクタはまとめよ

### functions

関数を呼ぶコストを恐れる人もいるけど、極端な例を除けば関数にまとめた方が分かりやすくなることが多いという話。

ここまでの

```javascript
$(function() {
  var CAROUSEL_TRANSITION_TIME = 10000;
  var ul = $("ul");
  var controlText = $(".controls span");
  var leftLink = $(".left");
  var rightLink = $(".right");
  
  var updateControlText = function() {
    controlText.text("Current: " + (currentImage + 1));
  };
  
  if(location.hash && location.hash.indexOf("image") > -1) {
    var number = parseInt(location.hash.charAt(location.hash.length -1));
    ul.animate({
      "margin-left": number * -300
    }, function() {
      currentImage = number;
      updateControlText();
    });
  }
  var timeout = setTimeout(function() {
    leftLink.trigger("click");
  }, CAROUSEL_TRANSITION_TIME);
  
  var currentImage = 0;
  leftLink.on("click", function(event) {
    event.preventDefault();
    clearTimeout(timeout);
    if(currentImage == $("li").length - 1) {
      ul.animate({
        "margin-left": 0
      }, function() {
        currentImage = 0;
        updateControlText();
      });
    } else {
      ul.animate({
        "margin-left": "-=300px"
      }, function() {
        currentImage+=1;
        updateControlText();
      });
    }
    timeout = setTimeout(function() {
      leftLink.trigger("click");
    }, CAROUSEL_TRANSITION_TIME);
  });
  
  rightLink.on("click", function(event) {
    event.preventDefault();
    clearTimeout(timeout);
    if(currentImage == 0) {
      ul.animate({
        "margin-left": ($("li").length - 1) * -300
      }, function() {
        currentImage = $("li").length - 1;
        updateControlText();
      });
    } else {
      ul.animate({
        "margin-left": "+=300px"
      }, function() {
        currentImage-=1;
        updateControlText();
      });
    }
    timeout = setTimeout(function() {
      leftLink.trigger("click");
    }, CAROUSEL_TRANSITION_TIME);
  });
});
```


何か消化不良なので今後追記されるのかな?

## [Tale 3: Async Abominations](http://javascriptplayground.com/the-refactoring-tales/refactoring-tales.html#tale-3-async-abominations "Tale 3: Async Abominations")

Nodeのアプリの話

飛んできたリクエストが正しいかどうかのバリデーションを行う

```javascript
var matchTokenToUser = function(token, userId, errors, done) {
  // implementation irrelevant
}

var ensureTokenExists = function(token, errors, done) {
  // implementation irrelevant
};

var validateParamsExist = function(params, req, res, cb) {
  if(!req.query) {
    res.json({ errors: ['no parameters supplied'] });
    return cb(false);
  } else {
    var errors = [];
    async.each(params, function(p, callback) {
      if(!req.query[p]) {
        errors.push('parameter ' + p + ' is required');
        callback();
      } else {
        if(p === 'token' && req.query.token) {
          if(params.indexOf('userId') > -1 && req.query.userId) {
            matchTokenToUser(req.query.token, req.query.userId, errors, callback);
          } else {
            ensureTokenExists(req.query.token, errors, callback);
          }
        } else {
          callback();
        }
      }
    }, function(err) {
      if(errors.length > 0) {
        res.json({ errors: errors });
        return cb(false);
      } else {
        return cb(true);
      }
    });
  };
}
```

というものが以下のようになる過程を見ていく。

```javascript
var matchTokenToUser = function(token, userId, errors, done) {
  // method for making sure a token matches a user
}

var ensureTokenExists = function(token, errors, done) {
  // method for ensuring a token exists
};

var noParamsPassed = function(req, res) {
  if(req.query) {
    return false;
  } else {
    res.json({ errors: ['no parameters supplied'] });
    return true;
  }
};

var checkTokenAndIds = function(req, errors, cb) {
  var token = req.query.token;
  var userId = req.query.userId;
  if(token) {
    if(userId) {
      matchTokenToUser(token, userId, errors, cb);
    } else {
      ensureTokenExists(token, errors, cb);
    }
  } else {
    cb();
  }
};

var validateParamsExist = function(params, req, res, cb) {
  if(noParamsPassed(req, res)) return cb(false);
  
  var errors = [];
  params.forEach(function(p) {
    if(!req.query[p]) errors.push('parameter ' + p + ' is required');
  });
  
  checkTokenAndIds(req, errors, function() {
    if(errors.length > 0) {
      res.json({ errors: errors });
      return cb(false);
    } else {
      return cb(true);
    }
  });
};
```

`validateParamsExist`の中身を見てみると

1. パラメータの全くないなら、スグcallbackを呼び出して失敗させる
2. それぞれのパラメターのチェック、`error`は配列に貯める
3. tokenとidをチェックする
4. エラーがあったら`res.json`で返し、`callback(false)`を呼ぶ
5. そうじゃないなら=バリデーションして大丈夫だったらなら`callbacl(true)`を呼ぶ

という流れになるようにリファクタリングされている。
一番最初の`validateParamsExist`はそれが一つの関数に全部入った状態になってるので、これを直していく章。


まず、最初の`if(!req.query)`ならreturnしている部分は早期リターンできるし、全体をif-elseにする必要性はない.


```javascript
var validateParamsExist = function(params, req, res, cb) {
  if(!req.query) {
    res.json({ errors: ['no parameters supplied'] });
    return cb(false);
  } else {
    // ....
  };
}
```

これを`noParamsPassed`という感じで取り出す。

```javascript
var noParamsPassed = function(req, res) {
  if(req.query) {
    return false;
  } else {
    res.json({ errors: ['no parameters supplied'] });
    return true;
  }
};


var validateParamsExist = function(params, req, res, cb) {
  if(noParamsPassed(req, res)) return cb(false);
  // ...
}

```

_guard clauses_ と呼ぶらしい。

次にasyncの中で複雑な条件分岐が発生してるので、ここを取り出す。

```javascript
      if(!req.query[p]) {
        errors.push('parameter ' + p + ' is required');
        callback();
      } else {
        if(p === 'token' && req.query.token) {
          if(params.indexOf('userId') > -1 && req.query.userId) {
            matchTokenToUser(req.query.token, req.query.userId, errors, callback);
          } else {
            ensureTokenExists(req.query.token, errors, callback);
          }
        } else {
          callback();
        }
```

これは単純に関数として取り出せるので、取り出して後で細かく直す。

```javascript
var checkTokenAndIds = function(p, req, errors, callback) {
  if(p === 'token' && req.query.token) {
    if(params.indexOf('userId') > -1 && req.query.userId) {
      matchTokenToUser(req.query.token, req.query.userId, errors, callback);
    } else {
      ensureTokenExists(req.query.token, errors, callback);
    }
  } else {
    callback();
  }
};
// 大分小さくなってきた
var validateParamsExist = function(params, req, res, cb) {
  if(noParamsPassed(req, res)) return cb(false);
  var errors = [];
  async.each(params, function(p, callback) {
    if(!req.query[p]) {
      errors.push('parameter ' + p + ' is required');
      callback();
    } else {
      checkTokenAndIds(p, req, errors, callback);
    }
  }, function(err) {
    if(errors.length > 0) {
      res.json({ errors: errors });
      return cb(false);
    } else {
      return cb(true);
    }
  });
}
```

次に見ていくと、[caolan/async](https://github.com/caolan/async "caolan/async")を使ってる所が気になる。

- そもそもこのコードは`async.each`を使う必要がない
- `checkTokenAndIds`の方だけが非同期
- `if(!req.query[p])`は同期的にチェックしてるだけ

=> `if(!req.query[p])`のチェックを先にやって、`checkTokenAndIds`に渡すコールバックに`function(err) { }`の内容を書けばいい

```javascript
var validateParamsExist = function(params, req, res, cb) {
  if(noParamsPassed(req, res)) return cb(false);
  var errors = [];
  params.forEach(function(p) {
    if(!req.query[p]) errors.push('parameter ' + p + ' is required');
  });
  // asyncが消えた
  checkTokenAndIds(req, errors, function() {
    if(errors.length > 0) {
      res.json({ errors: errors });
      return cb(false);
    } else {
      return cb(true);
    }
  });
}
```


## [Tale 4: Parsing Problems](http://javascriptplayground.com/the-refactoring-tales/refactoring-tales.html#tale-4-parsing-problems "Tale 4: Parsing Problems")

CSVをパースしてEmailを送るプログラムの話

該当のプログラムのインターフェースを見てみる。(実際の中身はどうでもいい)

```javascript
var EmailSender = {
  init: function(csv) {
    this.csv = csv;
    return this;
  },
  parseEmailsFromCsv: function() {
    // implementation not important
    this.emails = [...]
  },
  sendEmail: function() {
    // sends email, implementation not important
    this.emails.forEach(...);
  }
};
```

### Single Responsibility Principle

単一責任の原則の話。

このプログラムはパースとメールの送信の2つをやってるのでSRPに反してる。

なのでまずはCSVパーサとメールを送るものを分けよう。

```javascript
var Parser = {
  init: function(csv) {
    this.csv = csv;
    return this;
  },
  parseEmails: function() {
    ... // not important
    return emails;
  }
};
```

メールもメールを送るだけ

```javascript
var EmailSender = {
  init: function(emails) {
    this.emails = emails;
    return this;
  },
  sendEmail: function() {
    // sends email, implementation not important
    this.emails.forEach(...);
  }
};
```

こうすることで、`EmailSender`は`Parser`の存在を知らなくても良くなる。

```javascript
var emails = Parser.init(csv).parseEmails();
EmailSender.init(emails).sendEmail();
```

### Publish and Subscribe

 Pub/Subとタブのパターンについて

微妙に未完


## Tale 5: The Fat Controller

まだ書かれてない


-----

続きは[ウェブで](http://javascriptplayground.com/the-refactoring-tales/ "The Refactoring Tales")

- [The Refactoring Tales - JavaScript Playground](http://javascriptplayground.com/the-refactoring-tales/ "The Refactoring Tales")
- [The Refactoring Tales](http://javascriptplayground.com/the-refactoring-tales/refactoring-tales.html#tale-4-parsing-problems "The Refactoring Tales -")


-----

レガシーコード改善ガイドか新装版 リファクタリングを[読みたい](https://github.com/azu/azu/issues/29 "読みたい本 · Issue #29 · azu/azu")ですが、どっちから読むのか迷ってて色々探してて見つけた。

[The JavaScript Playground](http://javascriptplayground.com/ "The JavaScript Playground")はいいブログなので読むといい気がします。(いつのまにかURL変わってた)

他に見つけたやつ

- [tcorral/Refactoring_Patterns](https://github.com/tcorral/Refactoring_Patterns)
- [KarlPurk/javascript-refactoring](https://github.com/KarlPurk/javascript-refactoring)

やっぱりリファクタリングも自分でやってなれるしかない気がする。
そういうリファクタリングするオープンソースプロジェクトみたいのやりたいけど、何をリファクタリングするかってのが難しい。。(何かちょうどいい感じのとかあるのかな?)
