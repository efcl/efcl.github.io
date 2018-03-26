---
title: "GitHub Ribbon GeneratorをVue.jsで書いた"
author: azu
layout: post
date : 2015-12-25T19:39
category: JavaScript
tags:
    - JavaScript
    - Vue.js
    - Flux
    - GitHub

---

[Vue.js Advent Calendar 2015 - Qiita](http://qiita.com/advent-calendar/2015/vue "Vue.js Advent Calendar 2015 - Qiita") 25日目

## GitHub Ribbon Generator

[GitHub Ribbon Generator](http://azu.github.io/github-ribbon-generator/ "GitHub Ribbon Generator")というツールを作りました。

[![github ribbon](https://efcl.info/wp-content/uploads/2015/12/25-1451045310.png)](http://azu.github.io/github-ribbon-generator/)

[GitHub Ribbons](https://github.com/blog/273-github-ribbons "GitHub Ribbons")というのは、右上にあるFork Meボタンのことです。

- [GitHub Ribbons](https://github.com/blog/273-github-ribbons "GitHub Ribbons") 公式の解説

## 使い方

- GitHub Repository
- Position(右か左)
- Color

を入力してあげれば、そのままコピペ出来るGitHub RibbonのHTMLが出来上がるので後はコピペするだけです。

## 仕組み

このツール自体はコピペしてURLを書き換えとか毎回やるの面倒だなと思って作った程度ですが、
もう一つの目的としては[Vue.js 1.0.0](http://vuejs.org/2015/10/26/1.0.0-release/ "Vue.js 1.0.0")を使ってみたかったというのがあります。

- [azu/github-ribbon-generator](https://github.com/azu/github-ribbon-generator "azu/github-ribbon-generator")

[大規模アプリケーションの構築 - vue.js](http://jp.vuejs.org/guide/application.html "大規模アプリケーションの構築 - vue.js")にかかれていること大体実装した感じになっています。
Vue.jsというと2 wayのgetter/setterを使ったデータバインディング的な感じですが、アプリが大きくなると辛くなるというのはわかっていました。(フォームとかは簡単で便利ですが)

なので、目的としては以下の2つになっています。

- React + Fluxみたいなデータの流れは実装ができるのか
- `.vue`というフォーマット?での書き心地を確かめたい

大したことはやってないので[azu/github-ribbon-generator](https://github.com/azu/github-ribbon-generator "azu/github-ribbon-generator")を直接見たほうが速いです。

### state

このツールではstateは3つしか出てきません。

- GitHub Repository
- Position
- Color

これを[UserStore](https://github.com/azu/github-ribbon-generator/blob/master/src/store/UserStore.js "UserStore")という適当なものへ出し入れ出来るようにしています。

```js
// ChangeEmitterは
import ChangeEmitter from "./ChangeEmitter";
class UserStore extends ChangeEmitter {
    constructor() {
        super();
        this.state = {
            repositoryURL: "",
            position: defaultOptions.position,
            color: defaultOptions.color
        };
    }

    setState(state) {
        Object.assign(this.state, {}, state);
        this.emitChange();
    }

    getState() {
        return Object.assign({}, this.state);
    }
}
const emitter = new UserStore();
export default emitter;
```

### .vue

`.vue` はVue.jsが公式に提供してるBrowseryとWebpackから扱えるフォーマットで、HTML/CSS/JSを一つにまとめたファイルです。

- [Vue Component Spec | Introduction](http://vuejs.github.io/vue-loader/start/spec.html)
- [vuejs/vue-loader](https://github.com/vuejs/vue-loader)
- [vuejs/vueify](https://github.com/vuejs/vueify)

このツールのRoot Componentとなってる[app.vue](https://github.com/azu/github-ribbon-generator/blob/master/src/component/app.vue "app.vue")を見てみると分かりやすいと思います。


```html
<style>
    .App {
        padding-left: 2em;
        padding-right: 2em;
        margin-left: auto;
        margin-right: auto;
        padding-top: 1em;
        max-width: 768px;
    }

    .App h1, .App h2 {
        text-align: center;
        font-weight: 100;
        margin: 0;
    }

    .App .header {
        margin-bottom: 1rem;
    }
</style>
<template>
    <div class="App">
        <h1>GitHub Ribbon Generator</h1>
        <div class="header">
            <h2>
                <iframe src="https://ghbtns.com/github-btn.html?user=azu&repo=github-ribbon-generator&type=star&count=true&size=large"
                        frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
            </h2>
            <h2>Create Copy-Pastable GitHub Ribbon HTML snippet</h2>
        </div>
        <user-input :repository-url="state.repositoryURL"
                    :color="state.color"
                    :position="state.position"></user-input>
        <copy-paste-box :repository-url="state.repositoryURL"
                        :color="state.color"
                        :position="state.position"></copy-paste-box>
        <git-hub-ribbon :repository-url="state.repositoryURL"
                        :color="state.color"
                        :position="state.position"></git-hub-ribbon>
    </div>
</template>
<script>
    import UserInput from "./user-input.vue";
    import GitHubRibbon from "./github-ribbon.vue";
    import CopyPasteBox from "./copypaste-box.vue";
    import Store from "../store/UserStore";
    export default {
        name: "App",
        // App's state
        data () {
            return {
                state: Store.getState()
            };
        },
        components: {
            UserInput,
            GitHubRibbon,
            CopyPasteBox
        },
        methods: {
            // update State
            updateState () {
                const state = Store.getState();
                this.state = Object.assign({}, state);
            }
        },
        created () {
            Store.onChange(this.updateState);
        },
        destroyed(){
            Store.removeChange(this.updateState);
        }
    }
</script>
```

- `<style>` に書いたものがそのまま`<style>`要素として追加されています。
  - `<style scoped>` とすればカプセル化もできます。
- `<template>` がそのコンポーネントなので、分かりやすく`<div class="App">`で囲んでいます。
- `<script>` はVueの[コンポーネント](http://jp.vuejs.org/guide/components.html "コンポーネント")のコードです。

![.vue style](https://efcl.info/wp-content/uploads/2015/12/2015-12-25_20-00-13.jpg)

Reactだと`<style>`がない事以外は大体同じですが、`<style>`が同じ所に書けるのでコンポーネントのスタイルを簡単に適応するのがやりやすいです。

Reactの場合も、コンポーネント毎にCSSファイルを作ってスタイルの設定をしていたので、同じ事がそのままできるのは分かりやすいです。

> これはSUIT CSSという命名ルールと殆ど同じで、MyComponentというコンポーネントには.MyComponentというクラス名をつけるという命名ルールです。

- [はてなブックマーク検索を作りながらFlux Utilsについて学ぶ | Web Scratch](https://efcl.info/2015/08/24/flux-utils/ "はてなブックマーク検索を作りながらFlux Utilsについて学ぶ | Web Scratch")

逆に分かりにくい所としては、`.Vue`でも`components`に子コンポーネントの`.vue`を読み込んだインスタンスを渡す事で、`<template>`の中でそのコンポーネントをタグとして書くことが出来ます。
(JSXでも大体同じ)

```js
        components: {
            UserInput,
            GitHubRibbon,
            CopyPasteBox
        },
```

しかし、`.vue`では`components`に渡した名前そのままではなく、ケバブケースにした名前で`<template>`に書く必要があります。

例えば、`UserInput`ならば`user-input`というようになります。(keyで指定すればそのkeyで書くことが出来ます)

```html
<user-input :repository-url="state.repositoryURL"
            :color="state.color"
            :position="state.position"></user-input>
```

> HTML の属性は大文字と小文字を区別しません。キャメルケースされた prop 名を属性として使用するとき、それらをケバブケース(kebab-case: ハイフンで句切られた)として使用する必要があります:

- [キャメルケース 対 ケバブケース](http://jp.vuejs.org/guide/components.html#%E3%82%AD%E3%83%A3%E3%83%A1%E3%83%AB%E3%82%B1%E3%83%BC%E3%82%B9_%E5%AF%BE_%E3%82%B1%E3%83%90%E3%83%96%E3%82%B1%E3%83%BC%E3%82%B9 "キャメルケース 対 ケバブケース")

このケバブケースで書かないといけないのが、警告もでなくてとても分かりにくい感じでした。
(Reactの`className`とか、Riotの[riot.tag](http://riotjs.com/ja/api/#tag "riot.tag")関数の制限とかも似た話ですが)

### コンポーネントとデータ

ReactのPropsと同じですが、Vue.jsも`props`というの子コンポーネントで宣言してあげると、親コンポーネントから値を受け取れます。

親(App.vue)からは

```html
<user-input :repository-url="state.repositoryURL"
            :color="state.color"
            :position="state.position"></user-input>
```

と3つの値を渡したいで、子となる[user-input.vue](https://github.com/azu/github-ribbon-generator/blob/master/src/component/user-input.vue "user-input.vue")では

```
props: {
    repositoryURL: String,
    position: String,
    color: String
},
```

と宣言しています。

受け取れるデータのタイプも書くことができ、[React.PropTypes](https://facebook.github.io/react/docs/reusable-components.html "React.PropTypes")よりはシンプルなので分かりやすいです。

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Why is React&#39;s PropTypes naming inconsistent with JS? number, object, string, array — all good — but then &quot;func&quot; and &quot;bool&quot;. Um...</p>&mdash; kangax (@kangax) <a href="https://twitter.com/kangax/status/647110546194624512">September 24, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

```html
<style>
    .UserInput .UserInput-field {
        margin: 1rem 0;
    }
</style>
<template>
    <div class="UserInput">
        <form class="pure-form pure-form-aligned">
            <fieldset>
                <div class="UserInput-field pure-control-group">
                    <label>GitHub Repository:</label>
                    <input class="pure-input-2-3" type="text" v-model="repositoryURL"
                           placeholder="https://github.com/jquery/jquery">
                </div>
                <div class="UserInput-field pure-control-group">
                    <label for="position">Position:</label>
                    <select id="position" v-model="position">
                        <option v-for="position in positionList" :value="position.value">
                            {{ position.text }}
                        </option>
                    </select>
                </div>
                <div class="UserInput-field pure-control-group">
                    <label for="color">Color:</label>
                    <select id="color" v-model="color">
                        <option v-for="color in colorList" :value="color.value">
                            {{ color.text }}
                        </option>
                    </select>
                </div>
            </fieldset>
        </form>
    </div>
</template>
<script>
    import Store from "../store/UserStore";
    import {colorList, positionList} from "../util/ribbon";
    export default {
        name: 'UserInput',
        props: {
            repositoryURL: String,
            position: String,
            color: String
        },
        data() {
            // http://jp.vuejs.org/guide/forms.html#Select
            // Create [{ text, value }]
            return {
                colorList: colorList.map(function (color) {
                    return {text: color, value: color}
                }),
                positionList: positionList.map(function (position) {
                    return {text: position, value: position}
                })
            }
        },
        watch: {
            repositoryURL(newVal, oldVal) {
                Store.setRepositoryURL(newVal);
            },
            color(newVal, oldVal) {
                Store.setColor(newVal);
            },
            position(newVal, oldVal) {
                Store.setPosition(newVal);
            }
        }
    };
</script>
```

`<template>`ではその受け取った値を元に表示するHTMLを書くという感じです。

Vue.jsでは`watch`プロパティに書いたキー名で、Vueインスタンス[キー名] を監視する機能があるので、
これで値が変わったらStoreの値を書き換える`Store.set*`を呼んでいます。
([vm.$watch](http://jp.vuejs.org/api/#vm-\$watch\(_expOrFn\,_callback\,_\[options\]_\) "vm.$watch")の宣言的なバージョンですね)

Storeに直接setter的なメソッドが生えてますが、この辺をAction的なものを経由するようにしたりすれば、大体Fluxと似たようなデータフローになると思います。

![data-flow](https://efcl.info/wp-content/uploads/2015/12/25-1451042957.png)

- [大規模アプリケーションの構築 - vue.js](http://jp.vuejs.org/guide/application.html "大規模アプリケーションの構築 - vue.js")

今回はFluxフレームワーク的なライブラリを使わずにEventEmitterのみで書いてます。

公式でもFluxライクなフレームワークは作ってるらしいので、その辺を見てみると面白いかもしれません。

- [Vue.js用のFluxライクなライブラリVuexを試してみる - Qiita](http://qiita.com/tomato360/items/b2f11a392bf8fb125610)
- [vuejs/vuex](https://github.com/vuejs/vuex)
- [Vue.jsにreduxを載せた話 | MMMブログ](http://blog.mmmcorp.co.jp/blog/2015/12/03/vue-with-redux/ "Vue.jsにreduxを載せた話 | MMMブログ")

## まとめ

- React + Fluxみたいなデータの流れは実装ができるのか
  - => まあ普通にできそう
- `.vue`というフォーマット?での書き心地を確かめたい
  - => HTML/CSS/JSがまとまった感じ
  - JSXに比べるとCSSも一緒なのは分かりやすい
  - テンプレートがちょこちょこ難しい

データフローの話は公式でも[vuejs/vuex](https://github.com/vuejs/vuex)みたいので模索していそうです。

Vue.jsで適当に書くとデータバインディングに頼って、どこで何が更新されているのか分からなくなるみたいな事が起きやすい印象です。
そのため、複雑になったものからデータフローをどう整理するかを色々考えてみると面白そうです。
(Reactでもいい気はしていますが)

`.vue`はCSSのカプセル化もあり結構いい感じですが、ただの独自フォーマットであるのでやり過ぎると後戻りできなくなる場合があるので気をつける必要がありそうです。

- Browserify、Webpackのプラグインとして実装されているので全てをコントロールできなくて破壊的な変更が起きる可能性
- [vue-loader](http://vuejs.github.io/vue-loader/ "vue-loader")は特に何でも出来る感じなので、何でもやると危なそう

また、テンプレートの構文がちょこちょこ複雑(評価結果が見た目から直感的に分からない)な所があったりします。

- [リテラル 対 動的](http://jp.vuejs.org/guide/components.html#%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB_%E5%AF%BE_%E5%8B%95%E7%9A%84 "リテラル 対 動的")
- [データバインディング構文 - vue.js](http://jp.vuejs.org/guide/syntax.html "データバインディング構文 - vue.js")

この辺は独自のテンプレート言語を持つ宿命という感じがするので慣れなのかもしれません。

ただ、今回のツールだと大体何で書いても大した違いはない気がします。
以下の比較も読んでみると面白いかもしれません。

- [他のフレームワークとの比較 - vue.js](http://jp.vuejs.org/guide/comparison.html "他のフレームワークとの比較 - vue.js")

以上、JavaScriptの素振りの話でした。

- [JavaScriptのトレンドを素振りして確認する方法 - Qiita](http://qiita.com/azu/items/bacd146ed2e26980b9b0 "JavaScriptのトレンドを素振りして確認する方法 - Qiita")
