---
title: "Reactで条件によって出したり消したりするコンポーネントを書いた"
author: azu
layout: post
date : 2016-05-31T20:38
category: JavaScript
tags:
    - React
    - JavaScript

---

`<TogglePattern />` というコンポーネントを書きました。

- [azu/react-toggle-pattern: React Component that provide toggle pattern](https://github.com/azu/react-toggle-pattern "azu/react-toggle-pattern: React Component that provide toggle pattern")

名前の通りトグルするボタンとかを実装するのを想定して作りましたが、
もっと汎用的にパターンマッチ的な感じの制御ができるようになってます(A/Bテスト的なやつにも使えそう)

使い方は、`children`に表示が切り替わる要素を置く形で書くようになっています。
(こういう親になるコンポーネントってなんというのだろう?)

次の例では`isEditing`の値が

- `true`ならば`LeaveEditingButton`が表示
- `false`ならば`EnterEditingButton`が表示

という形になっています。

```js
import {TogglePattern} from "react-toggle-pattern";
class ToggleButton extends React.Component {
    render(){
        return (
            <TogglePattern isEditing={this.props.isEditing}>
                <LeaveEditingButton isEditing={true} />
                <EnterEditingButton isEditing={false} />
            </TogglePattern>
        );
    }
}
```

プログラム的に書くと以下の事をやっているのと同じです。
ViewからできるだけIf文を消すために、`TogglePattern`のような宣言的に書けるようにしています。


```js
const toggleButton = this.props.isEditing 
                     ? <LeaveEditingButton />
                     : <EnterEditingButton />
```

条件が1つだけならORかANDなのか気にしなくていいですが、`<TogglePattern />`は複数条件にも対応しています。
`<TogglePattern />`は`<ToggleOrPattern />`のエイリアスです。

**OR**

OR条件で表示を制御したい場合は`<ToggleOrPattern />`が利用できます。

```js
<ToggleOrPattern a={true}>
    <LeaveEditingButton a={true} b={false} />
    <EnterEditingButton a={true} />
</ToggleOrPattern>
```

両方共条件を満たしているので、両方とも表示します。

```js
<div class="TogglePattern ToggleOrPattern">
    <LeaveEditingButton a={true} b={false} />
    <EnterEditingButton a={true} />
</div>
```

**AND**

AND条件で表示を制御したい場合は`<ToggleAndPattern />`が利用できます。

```js
<ToggleAndPattern a={true} b={false}>
    <LeaveEditingButton a={true} b={false} />
    <EnterEditingButton a={true} />
</ToggleAndPattern>
```

これはAND条件でマッチするのは `LeaveEditingButton` だけなので、次のような結果になります。

```js
<LeaveEditingButton a={true} b={false} />
```

条件の値には真偽値以外も使えます。
次の例では`pattern`に指定した文字列と一致するものが表示されます。

```js
<TogglePattern pattern="one">
    <ComponentX pattern="one"/>
    <ComponentY pattern="two"/>
</TogglePattern>
```

なので、結果は`<ComponentY />`となります。

## 実装

実装は大した事はやってないですが、テストを[enzyme](https://github.com/airbnb/enzyme "enzyme")で書いています。
普通にReact Componentのテストを書けるので面白い感じがします。

- [react-toggle-pattern/react-toggle-pattern-test.js at master · azu/react-toggle-pattern](https://github.com/azu/react-toggle-pattern/blob/master/test/react-toggle-pattern-test.js "react-toggle-pattern/react-toggle-pattern-test.js at master · azu/react-toggle-pattern")