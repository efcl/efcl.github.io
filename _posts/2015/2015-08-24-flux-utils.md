---
title: "Flux Utilsを使いながらはてなブックマーク検索を作る"
author: azu
layout: post
date : 2015-08-24T09:23
category: JavaScript
tags:
    - Flux
    - JavaScript
    - はてなブックマーク

---

[facebook/flux](https://github.com/facebook/flux "facebook/flux") [2.1.0](https://github.com/facebook/flux/blob/master/CHANGELOG.md#210 "2.1.0")から[Flux Utils](http://facebook.github.io/flux/docs/flux-utils.html#content "Flux Utils")というStoreなどの実装が含まれるようになりました。

Flux Utilsを使って、自分のはてなブックマークを検索するウェブアプリを書いてみてFlux Utilsについて思ったことを書いていきます。

- [azu/hatebu-mydata-search](https://github.com/azu/hatebu-mydata-search "azu/hatebu-mydata-search")

![はてなブックマーク](http://efcl.info/wp-content/uploads/2015/08/24-1440376718.png)

## Flux Utils

[Flux Utils](http://facebook.github.io/flux/docs/flux-utils.html "Flux Utils")にどういうものが含まれているかが書かれています。

簡単にまとめると以下の4つが2.1.0には含まれています。

- Store
	- ベースとなるクラス
- ReduceStore
	- Storeを継承
	- `state`を保持していて、actionsに対して`reduce`することで`state`更新する
- MapStore
	- ReduceStoreを継承
	- [Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js")に依存している
- Container
	- mixinsの代わり
	- React ComponentラップするComponentを作るコンテナ
	- Storeを登録しておいて、Storeの変更を元にComponentに通知する

Storeはおそらく直接使わない、`MapStore`は[Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js")に依存しているので、使うとしたら`ReduceStore`と`Container`がメインとなると思います。

[azu/hatebu-mydata-search](https://github.com/azu/hatebu-mydata-search "azu/hatebu-mydata-search")でも`ReduceStore`と`Container`の2つを利用しました。

Flux Utilsは[Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js")が一部使っているのからも分かりますが(使わなくても問題ない)、Immutableなオブジェクトを`state`として使うのが前提となった作りになっています。

[Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js")はFlowやTypeScriptなどの型付きや[Immutableな実装でのパフォーマンス](https://www.youtube.com/watch?v=I7IdS-PbEgI)におけるメリットはありますが、普通に扱うのが難しいので今回はImmutableなオブジェクトとして[christianalfoni/immutable-store](https://github.com/christianalfoni/immutable-store "christianalfoni/immutable-store")を利用しました。

#### 余談:ファイルサイズ

Flux Utilsを含む前後の[facebook/flux](https://github.com/facebook/flux "facebook/flux")のファイルサイズは以下のような感じです。

Before:

![before](https://monosnap.com/file/LJ9RcmuK37jo9Uq9XvAKsnbwTn1Oay.png)

After:

![after](https://monosnap.com/file/aihEzm0aYcT9xKFegKM4zZefrAEQne.png)

![gif](https://i.gyazo.com/f1bff7884bb1d30416345cce9e58de71.gif)

[facebook/flux](https://github.com/facebook/flux "facebook/flux")の`dist`にはデフォルトでFlux Utilsが含まれていないため、Flux Utilsを明示的にimportしない限りファイルサイズは増えたりはしないと思います。

また、immutable.jsに直接依存してるのはMapStoreだけなので、他のReduceStoreなどはimportしても含まれないため、そこまでファイルサイズは大きくない形でも使えます。

```js
import {MapStore} from 'flux/utils';
```


-----
