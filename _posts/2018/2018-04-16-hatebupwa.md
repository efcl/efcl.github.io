---
title: "モバイル/オフラインでも動作するはてなブックマーク検索のPWAを作った"
author: azu
layout: post
date : 2018-04-16T08:46
category: JavaScript
tags:
    - JavaScript
    - ServiceWorker
    - PWA
    - はてブ

---

[はてなブックマーク検索PWA](https://hatebupwa.netlify.com/)というはてなブックマークでブクマしたデータをオフラインでも検索できるPWAを作りました。

- サイト: <https://hatebupwa.netlify.com/>
- ソース: <https://github.com/azu/hatebupwa>

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="ja" dir="ltr">はてなブックマークの自分のブクマを検索できるPWAを作りました。<br>Service Workerに対応してるブラウザ(IOS Safari 11.3+を含む)ではオフラインでも検索できます。<a href="https://t.co/RCVkRYAFz0">https://t.co/RCVkRYAFz0</a><br><br>モバイルはホームスクリーンアプリで、macOSはアプリ版もあります。<a href="https://t.co/5MDuyC9baN">https://t.co/5MDuyC9baN</a> <a href="https://t.co/KAc3KV690b">pic.twitter.com/KAc3KV690b</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/985671997857251328?ref_src=twsrc%5Etfw">April 16, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 使い方

使い方は特に難しい話でもないですが、次のように任意のはてなブックマークのアカウント名をいれてデータを取得したら、後は絞り込み検索ができます。

1. <https://hatebupwa.netlify.com/> にアクセス
2. 好きなはてなブックマークのアカウント名を入れて "取得"ボタンを押す
3. ブックマークデータが表示されたら、フィルター検索で絞り込み

はてなブックマークの公開データを使っているので、任意のアカウントのデータを見れますが、非公開ブックマークは取得できません。

データの更新は再度画面を表示した時に自動的に行います。
能動的に更新したい場合は"取得"を再度押すか、リロードしてください。

### PWA

このはてなブックマーク検索アプリはオフラインでも動作するようになっています。
他のネイティブアプリのように使いたい場合は、ホームスクリーンにアプリとして追加するかmacはアプリ版も用意しています。

- iOS: "Add to HomesScreen" on <https://hatebupwa.netlify.com/>
- Android: "Add to HomeScreen" on <https://hatebupwa.netlify.com/>
- macOS: Download from <https://github.com/azu/hatebupwa/releases/latest>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="ja" dir="ltr">iOSでのホームスクリーンアプリでもオフラインで動作してる様子。 <a href="https://t.co/Upu2PGpREc">pic.twitter.com/Upu2PGpREc</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/985672400187539456?ref_src=twsrc%5Etfw">April 16, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


このBaselineとしてのPWAはLighthouseや次のチェックリストが確認できます。

- [Lighthouse](https://github.com/GoogleChrome/lighthouse)
- [Progressive Web App Checklist  |  Web  |  Google Developers](https://developers.google.com/web/progressive-web-apps/checklist)

![Audit](https://efcl.info/wp-content/uploads/2018/04/16-1523838962.png)

> "Failures: Manifest start_url is not cached by a Service Worker."

がPassできなくて100にはなってませんが実用的には問題なさそうです。
(AndroidのInstall Bannerがでなくなる気がしますが)

* [Audit claims start_url of /?utm_ is not cached when navigateFallback exists · Issue #2688 · GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse/issues/2688 "Audit claims start_url of /?utm_ is not cached when navigateFallback exists · Issue #2688 · GoogleChrome/lighthouse")
* [Update throttling/cache/js state on the SW target · Issue #709 · GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse/issues/709 "Update throttling/cache/js state on the SW target · Issue #709 · GoogleChrome/lighthouse")

### 作った理由

元々[keysnail](https://github.com/mooz/keysnail)の[Hatebnail](https://github.com/mooz/keysnail/wiki/Plugin)を使ってはてブを検索していましたが、Firefox 57+へのアップデートで拡張が使えなくなったので代わりとなるものを探しましたがなかったので作りました。
Hatebnailは旧はてなブックマーク拡張の内部的に持つデータベースを検索するため、オフラインでも検索また高速なインクリメンタル検索ができていました。

はてなブックマーク拡張がデータの差分更新だけをやっていたので、基本的に最新のデータが手元でいつでも検索出来るような感じで使い勝手が良かったです。

[はてなブックマーク検索PWA](https://hatebupwa.netlify.com/)もできるだけ同じレベルで使えるように、データの更新を意識しないような作りや高速な絞り込み検索にメインにしています。

## 技術的詳細

ここからこのアプリの技術的なメモ書きです。

## Toolkit

TypeScript + Reactで書くことにしたので、[create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)を使いました。
[create-react-app](https://github.com/facebook/create-react-app)のTypeScript版です。

今回はService WorkerやWeb Workerで少し範囲を超えた事をしないとダメでしたが、普通に使う分には面倒な設定が減るので快適です。

## React 16.3 Context

このアプリを作り始めるときに最初に必要になりそうな機能やアーキテクチャをざっくりと決めていました。ついでなのでReact 16.3.0で新しくなった[Context](https://reactjs.org/docs/context.html) APIを試すことにしました。

- [React v16.3.0: New lifecycles and context API - React Blog](https://reactjs.org/blog/2018/03/29/react-v-16-3.html)

このアプリは[Almin](https://almin.js.org/)というライブラリを使ってステートを管理しています。

- [almin/almin: Client-side DDD/CQRS for JavaScript.](https://github.com/almin/almin)

AlminでもReact向けのbindingを公開していますが、複雑な事をするReactの[Higher-Order Components](https://reactjs.org/docs/higher-order-components.html)(HOC)は型がとにかく複雑になりやすく、メンテナンスがしにくい問題がありました。
そのため、[Render Props](https://reactjs.org/docs/render-props.html)と呼ばれるパターンでbindingの新しい実装を考えていましたが、Reactの新しいContext APIは一種のRender Propsパターンです。

- [Render props for Almin + React · Issue #318 · almin/almin](https://github.com/almin/almin/issues/318)

そのため、このアプリでAlmin + [React Context](https://reactjs.org/docs/context.html) APIを試してみることにしました。

[AlminContext.tsx](https://github.com/azu/hatebupwa/blob/master/src/AlminContext.tsx)にその実装を作っていて、[Context.ts](https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/Context.ts#L32-L33)でReact Contextのbindingを初期化しています。

```js
// ややこしいことにAlminにもContextがある！
import { Context, StoreGroup } from "almin";
import { UserFormContainerStore } from "./container/UserFormContainer/UserFormContainerStore";
import { SearchContainerStore } from "./container/SearchContainer/SearchContainerStore";
import { AlminLogger } from "almin-logger";
import { createContext } from "./AlminContext";
import { hatebuRepository } from "./infra/repository/HatebuRepository";
import { AppStore } from "./container/AppStore";

export const AppStoreGroup = new StoreGroup({
    userFormContainer: new UserFormContainerStore({
        hatebuRepository
    }),
    searchContainer: new SearchContainerStore({
        hatebuRepository
    }),
    app: new AppStore()
});

export const context = new Context({
    store: AppStoreGroup,
    options: {
        strict: false,
        performanceProfile: true
    }
});
// Almin + React Contextのbindingを初期化してシングルトンっぽくexportしてるだけ
const { Provider, Consumer, Subscribe } = createContext(context);
export { Provider, Consumer, Subscribe };
```


後は、[App.tsx](https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/container/App.tsx#L84-L93)で各種コンポーネントを状態のオブジェクトを渡してるだけです。

```
    render() {
        return (
            <>
                // ... 省略 ... 
                <div className="App">
                    <h1 className={"App-title"}>
                        <Link href={"/"}>はてなブックマーク検索</Link>
                    </h1>
                    <!-- AlminがStateを更新検知して勝手にstateでrenderし直す -->
                    <Consumer>
                        {state => {
                            return (
                                <>
                                    <UserFormContainer app={state.app} userFormContainer={state.userFormContainer} />
                                    <SearchContainer searchContainer={state.searchContainer} />
                                </>
                            );
                        }}
                    </Consumer>
                </div>
            </>
        );
}
```

React Context APIをコンポーネント間で値を共有する方法の一種を提供しています。
React Context APIは`createContext`で新しいコンテキストのインスタンスを作り、それをexportするファイル作り、そのファイルをいろんなところからimportして使う形になると思います。

```js
// some-context.js
const {Provider, Consumer} = React.createContext(defaultValue);
export {Provider, Consumer}


// app.js
import {Provider, Consumer} from "./some-context.js"
// foo.js
import {Provider, Consumer} from "./some-context.js"
```

一種のシングルトン的な感じになると思うので、いたるところのコンポーネントから読み込んで使うのは危険な参照になりそうです。現実的には、上の層のコンポーネント(App.jsやContainer componentなど)でContextから値を取り出し、下のプリミティブなコンポーネントには今まで通りpropsで値を渡す形に落ち着きそうな気はします。

`createContext`で作った`Provider`と`Consumer`はReactコンポーネントという性質上、`render()`の中でしか使えません。そのためContext経由の値を他のライフサイクルイベントで使うには一度propsで渡す必要があり、すべてがContextだけになることは現実的にはではないでしょう。

今回は[App.tsx](https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/container/App.tsx#L84-L93)でだけAlmin + React Contextを使って、そこから下にはpropsでアプリの状態を渡しています。


## ルータ

このアプリのユースケースを[almin-usecase-map-generator](https://github.com/almin/almin-usecase-map-generator)で生成すると次のような感じです。

[ユースケース図](https://efcl.info/wp-content/uploads/2018/04/use-case.png)

最初に[InitializeSystemUseCase](https://github.com/azu/hatebupwa/blob/master/src/use-case/InitializeSystemUseCase.ts)を呼び、その後はURLによってどのユースケースを行うかを決めています。

Reactのルータと言えば[React Router](https://github.com/ReactTraining/react-router)や[UI-Router for React](https://ui-router.github.io/react/)などがありますが、URLによってコンポーネントをマウントしたいのではなく、ユースケースを呼ぶのがメインでした。
ルータがページ全体を囲むのではなく、ルータでページの一部を操作したいだけでした。
(どちらのライブラリでもできるはずですが、機能が多すぎ or 型定義が上手く合わないなどの問題があって疲れた)

色々試しているうちに面倒になって[react-routing-resolver](https://github.com/azu/react-routing-resolver)というルーターライブラリを書き直しました。
[tj/react-enroute](https://github.com/tj/react-enroute)をコンポーネントに限定しなくした形というのが近いライブラリです。

[react-routing-resolver](https://github.com/azu/react-routing-resolver)を使いページに応じた初期化処理や特定のページだけに埋め込むコンポーネントなどを埋め込んでいます。

例えば、`/user/:name`のパスに一致するページでは、`this.onMatchUser`を処理しつつ、[PageVisibility](https://github.com/azu/hatebupwa/blob/master/src/component/PageVisibility/PageVisibility.tsx)というページの表示状態を監視するコンポーネントを埋め込んでいます。
[PageVisibility](https://github.com/azu/hatebupwa/blob/master/src/component/PageVisibility/PageVisibility.tsx)によってページが非表示から表示に切り替わったときには、はてなブックマークからデータを取得し直すリロード処理などを行っています。

```js
    render() {
        return (
            <>
                {this.state.isInitialized ? (
                    <Router history={browserHistory}>
                        <Route
                            pattern={"/user/:name"}
                            onMatch={this.onMatchUser}
                            render={(args: { name: string }) => {
                                return (
                                    <PageVisibility
                                        onVisible={() => {
                                            this.onVisibleUserPage(args);
                                        }}
                                    />
                                );
                            }}
                        />
                        <Route pattern={"/home/"} onMatch={this.onMatchHome} />
                        <Route pattern={"*"} onMatch={this.onMatchOther} />
                    </Router>
                ) : null}

                <div className="App">
                    <h1 className={"App-title"}>
                        <Link href={"/"}>はてなブックマーク検索</Link>
                    </h1>
                    <Consumer>
                        {state => {
                            return (
                                <>
                                    <UserFormContainer app={state.app} userFormContainer={state.userFormContainer} />
                                    <SearchContainer searchContainer={state.searchContainer} />
                                </>
                            );
                        }}
                    </Consumer>
                </div>
            </>
        );
}
```

- <https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/container/App.tsx#L61-L77>

## Web Worker

<https://hatebupwa.netlify.com/>でブックマークをフィルタ検索してみると分かりますが、ある程度のPCならある程度の量をリアルタイムにフィルターできていることがわかると思います。(Macbook Proで10万件ぐらいまでなら100ms以内に反映できる程度)

メモリ上にデータを持っているので検索自体が速いのは当然ですが、単純にUIスレッドでフィルターをするとものすごくカクつきます。
それを避けるために実際の検索キーワードでのフィルタリング処理は[Web Worker](https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API/Using_web_workers)の中で行っています。

これによりかなり重たいフィルタリング処理がUIスレッドに影響が少なくなり、入力中の重さがかなり軽減できています。（影響が完全になくなるわけではなく、Web WorkerへpostMessageするときにデータ量が多いとそこで詰まることがある気がします）

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">WebWorkerを使うことでUIブロックなくせた。 <a href="https://t.co/4CY95S8yA3">pic.twitter.com/4CY95S8yA3</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/983162005463883781?ref_src=twsrc%5Etfw">April 9, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

残念なことに[create-react-app](https://github.com/facebook/create-react-app)はWeb Workerをインライン化する方法がないため、Web Worker用のワーカーファイルを外部ファイルとしておいて、必要になったらアプリから読み込むようにしています。

- [Add WebWorker Support · Issue #3660 · facebook/create-react-app](about:blank)

webpackなどを使っている人は[worker-loader](https://github.com/webpack-contrib/worker-loader)などを使うことで、普通のJavaScriptモジュールと同じ感覚でWeb Workerのファイルを読み込める(インライン化できる)ので、結構気軽にWeb Workerを使えると思います。

このアプリではワーカー用のファイルとそれをビルドする[webpack.worker.config.js](https://github.com/azu/hatebupwa/blob/master/webpack.worker.config.js)をわざわざ用意してビルドするという手法を取っていますが、フィルタリングのロジック自体はワーカーとアプリで共有しています。

そのため、Workerファイル([filter.ts](https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/workers/filter.ts))に書いてあるのは10行程度のコードです。

```ts
import { HatebuSearchListItem } from "../src/container/SearchContainer/SearchContainerStore";
import { matchBookmarkItem } from "../src/domain/Hatebu/BookmarkSearch";

const registerWebworker = require("webworker-promise/lib/register");
let currentItems: HatebuSearchListItem[] = [];
registerWebworker()
    .on("init", (items: HatebuSearchListItem[]) => {
        currentItems = items;
    })
    .operation("filter", (filterWords: string[]) => {
        return currentItems.filter(item => {
            return matchBookmarkItem(item, filterWords);
        });
});
```

実際のデータをTransferable ObjectsとしてWorkerに渡せると、コストがもっと減って良さそうですが、Transferable ObjectsにできるのはArrayBufferなどに限定されています。
(普通の文字列とか配列をTransferable Objectsにして転送コストを減らす方法あるのかな)

- [Transferable Objects: Lightning Fast!  |  Web  |  Google Developers](https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast)

入力中のフィルタリングや補完候補を出すといった典型的な重さを感じる処理をWeb Workerに移すのは体感の改善にかなり役立つ印象です。

- [WebWorkerをproductionで使ってる話 - 橋本商会](https://scrapbox.io/shokai/WebWorker%E3%82%92production%E3%81%A7%E4%BD%BF%E3%81%A3%E3%81%A6%E3%82%8B%E8%A9%B1)

最初はWeb Workerに対応した検索エンジンの[bvaughn/js-worker-search: JavaScript client-side search API with web-worker support](https://github.com/bvaughn/js-worker-search)を使う予定でしたが、[webworker-promise](https://github.com/kwolfy/webworker-promise)を使って単純な`Array#filter`で十分でした。

[webworker-promise](https://github.com/kwolfy/webworker-promise)はWeb Workerとの間でEvent Emitter + Promiseのような感じで処理をやり取りできたので結構直感的にフィルタリング処理を書けました。
また、[データを渡すイベント](https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/component/HatebuSearchList/HatebuSearchList.tsx#L97)と[フィルタリングを行うイベント](https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/component/HatebuSearchList/HatebuSearchList.tsx#L156)を分けることで、データの転送量を減らすようにしています。

あとはIME特有のCompositionEventに対応したり、できるだけ違和感がなく速いフィルタリング体験ができることを目標にして設定しました。

## オフライン


オフライン対応するには主に2種類の対応が必要です。

- アプリのデータをストレージに持つこと
- Service Workerでリソースをキャッシュすること

前者はlocalStorageやIndexedDBなどのストレージ系のAPIを使いアプリの状態をシリアライズして保存します。容量を考えるとIndexedDBを使うのが無難です。

- [モダンブラウザのストレージ容量と調査方法まとめ - HTML5 Rocks](https://www.html5rocks.com/ja/tutorials/offline/quota-research/)

後者はService Workerを使い`index.html`や`js`、`css`、画像やフォントなどをキャッシュし、ネットワークアクセスができない状態でもページを表示するのに必要です。

- [Service Worker の紹介  |  Web  |  Google Developers](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja)

Service Workerをただのキャッシュとして使うならば下手に手書きせずに[Workbox](https://developers.google.com/web/tools/workbox/)などのフレームワークを使うのが無難です。
Service Workerは[AppCacheほど](http://0-9.sakura.ne.jp/pub/AVTokyo/start.html)ではありませんが、結構強いキャッシュです。
そのため運用や実装を間違えると面倒臭い問題があり、またデバッグも開発者ツールがないとまともにできません。

- [Strategies for Service Worker Caching for Progressive Web Apps](https://blog.hasura.io/strategies-for-service-worker-caching-d66f3c828433)

[create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)も[sw-precache](https://github.com/GoogleChromeLabs/sw-precache)を使ったService Workerにデフォルトで対応しています。(ただし2.0でオプトインに変わる)

- [Why was service worker merged into create react app? · Issue #2398 · facebook/create-react-app](https://github.com/facebook/create-react-app/issues/2398)

また[sw-precache](https://github.com/GoogleChromeLabs/sw-precache)のチームは現在[Workbox](https://developers.google.com/web/tools/workbox/)にリソースを割いているため、素直に[Workbox](https://developers.google.com/web/tools/workbox/)を使うことにしました。

### IndexedDB

key-valueなものがあれば十分なので[localForage](https://github.com/localForage/localForage)を使いました。
メモリDBへの切り替えを動的にできるラッパーとして[StorageManger.ts](https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/infra/repository/StorageManger.ts)を作ってそれを使って、[infra/repository](https://github.com/azu/hatebupwa/tree/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/infra/repository)でデータの永続化をしています。

(localForage以外のも探したのですが、IndexedDBに対応していて、安定していて、メモリDBなどのデバッグやテストの補助があって、key-valueでシンプルなAPIというものがなかなか見つからなかった…)

アプリとしての状態はdomainとして管理してあり、domainをシリアライズ/デシリアライズして永続化するのがinfraのrepositoryの役割です。
このアプリでは、[Hatebu](https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/domain/Hatebu/Hatebu.ts)や[Bookmark](https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/domain/Hatebu/Bookmark.ts)といった[domain](https://github.com/azu/hatebupwa/tree/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/domain)がシリアライズできるJSONにシリアライズできるインターフェースを定義してあるので、repositoryではそれを使ってJSON化したデータをIndexedDBへ保存しています。

逆にアプリの起動時には[InitializeSystemUseCase](https://github.com/azu/hatebupwa/blob/master/src/use-case/InitializeSystemUseCase.ts)でrepositoyがIndexedDBからデータを取得して、それぞれの[domain](https://github.com/azu/hatebupwa/tree/0e7c430c04717306ee5952b5eebc67af8a5ee631/src/domain)を復元しています。

domain – つまりクラスのシリアライズ/デシリアライズは相変わらず難しく、Scalaなど機能が充実しているものはPlainなクラスでキレイに書けていいなと思いました。

- [scala-on-ddd // Speaker Deck](https://speakerdeck.com/crossroad0201/scala-on-ddd)

Entityはuniqu idを持っていて、EntityをJSONにシリアライズ/JSONからデシリアライズできるインターフェースがあり、RepositoryはEntityをコレクション的に保存できて… みたいなよくあるパターンは毎回同じ事を書くのが面倒なので、[ddd-base](https://github.com/almin/ddd-base)というライブラリを書いて使っています。

[ddd-base](https://github.com/almin/ddd-base)も機能的に優れていたり洗練されているわけでもないので、ちょっとづつよくしていきたいなと思っています。
これを使うことでEntityとかRepositoryとかはある程度迷うことなく書けるようになるかなーと思います。
（シリアライズ周りは未だに書いてて若干の苦痛があるので、もう少し楽できるようになりたい。Decoratorを使わずに手軽にConverterを定義したい…）

### Service Worker

アプリの状態はIndexedDBに永続化しても、ブラウザがページを表示するのに必要なのはHTMLです。
そのため、HTML自体をオフラインでアクセスできるようにキャッシュしておかないと行けません。
これを行うにはApplication CacheかService Workerが必要ですが、Application Cacheは廃止されService Workerへ移行しています。(Service Worker自体がBetter AppCacheとして始まったプロジェクト)

- [Application Cache 対応が廃止されます | Firefox サイト互換性情報](https://www.fxsitecompat.com/ja/docs/2016/application-cache-support-will-be-removed/)
- [イベント駆動型サービス実行基盤としての Service Worker - Qiita](https://qiita.com/nhiroki/items/65efc9e41ec1d928afcd)

先ほども書いたように今回は[Workbox](https://developers.google.com/web/tools/workbox/)を使いました。
[Workbox](https://developers.google.com/web/tools/workbox/)のキャッシュ方法は大きく分けて、[Precache](https://developers.google.com/web/tools/workbox/guides/precache-files/)と[Runtime Caching](https://developers.google.com/web/tools/workbox/guides/generate-service-worker/cli#adding_runtime_caching)があります。

今回必要なのはデプロイしたHTMLやJS、CSSなどを静的にキャッシュするように指定できるPrecacheです。`workbox-cli`を使うことで、インタラクティブにどのファイルをPrecacheするかを決めた設定ファイル(`workbox-config.js`)を作成できます。

```
npm install workbox-cli --global
workbox wizard
```

詳しくは次のページで解説されています。

- [Generate a Complete Service Worker with Workbox CLI  |  Workbox  |  Google Developers](https://developers.google.com/web/tools/workbox/guides/generate-service-worker/cli)

後は、この設定ファイル(`workbox-config.js`)を元に`workbox generateSW`でService Workerファイルを作成して読み込むだけです。

Service Workerでキャッシュするのは、[create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)でビルドしたjsなどなのでビルド後に`workbox generateSW`を実行するようなnpm run-scriptsを書いています。

- [package.json](https://github.com/azu/hatebupwa/blob/0e7c430c04717306ee5952b5eebc67af8a5ee631/package.json#L8-L19)

```
  "scripts": {
    // WebWorkerのビルド -> js,css,htmlのビルド -> ビルドしたファイルをswでキャッシュする設定を作成
    "build": "npm-run-all build:worker build:react sw:generate",
    "build:react": "react-scripts-ts build",
    "build:worker": "webpack --mode production --config webpack.worker.config.js",
    "sw:generate": "workbox generateSW workbox-config.js"
  },
```

## UI

UIフレームワークにはMicrosoftの[Office UI Fabric](https://developer.microsoft.com/en-us/fabric)を使っています。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ReactのUIフレームワーク 何だかんだOffice UI Fabricがよくできてよく使ってる。 &quot;Home - Office UI Fabric&quot; <a href="https://t.co/8BZEHEIPdb">https://t.co/8BZEHEIPdb</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/984016207660638209?ref_src=twsrc%5Etfw">April 11, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


検索結果を表示する[List](https://developer.microsoft.com/en-us/fabric#/components/list)、やたら充実している[Button](https://developer.microsoft.com/en-us/fabric#/components/button)や[Icons](https://developer.microsoft.com/en-us/fabric#/styles/icons)などこういったアプリを作るには便利な機能が多いのでよく使っています。

またTypeScriptで書かれていてここ1-2年使っていますが安定して開発されていて、互換性もそこまで壊れないのでUIフレームワークとして結構気に入っています。

数人のチームとかになるとさすがにちゃんと基礎コンポーネントを作りますが、一人で作るならその辺を全部スキップできて、[FocusZone](https://developer.microsoft.com/en-us/fabric#/components/focuszone)のような見えないUIもちゃんと作っている[Office UI Fabric](https://developer.microsoft.com/en-us/fabric)はなかなか便利です。


## まとめ

このアプリを作るにあたって最初に必要なものをバッと書き出してから作り始めました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">やってみるか <a href="https://t.co/lgHqkERLJ1">pic.twitter.com/lgHqkERLJ1</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/982529749917417472?ref_src=twsrc%5Etfw">April 7, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

最終的に最初のイメージとそこまでずれることなくアプリを作れてよかったです。

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="ja" dir="ltr">できた<a href="https://t.co/RXNLx4u3ok">https://t.co/RXNLx4u3ok</a><a href="https://t.co/eNogPZc9FP">https://t.co/eNogPZc9FP</a> <a href="https://t.co/SOIJbBsg0W">pic.twitter.com/SOIJbBsg0W</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/984252258916360192?ref_src=twsrc%5Etfw">April 12, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

これでざっくりとした[はてなブックマーク検索PWA](https://hatebupwa.netlify.com/)の紹介は終わりです。間違ってFirefoxをアップデートして必要になって突貫で作ったので、まだ微妙なところもあるかもしれません。

[Issues](https://github.com/azu/hatebupwa/issues)や[Pull Requests](https://github.com/azu/hatebupwa/pulls)を待っています！


- ``サイト: [はてなブックマーク検索PWA](https://hatebupwa.netlify.com/)
- リポジトリ: [azu/hatebupwa: Hatena Bookmark search app.](https://github.com/azu/hatebupwa)
