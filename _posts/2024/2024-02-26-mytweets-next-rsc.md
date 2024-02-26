---
title: "Twitter/Blueskyの自己ポストの全文検索サービスをNext.js App Router(RSC)で書きなおした"
author: azu
layout: post
date: 2024-02-26T16:18
category: JavaScript
tags:
  - JavaScript
  - Next.js
---

[mytweets](https://github.com/azu/mytweets)という自分の Twitter/Bluesky の自己ポストの全部検索サービスを[Next.js App Router(RSC)](https://nextjs.org/docs/app)で書きなおしました。

mytweets は Twitter のアーカイブや Bluesky の API を使って自分のポストを S3 に保存しておき、
[S3 Select](https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html)を使って全文検索ができる自分専用の Twilog のようなサービスです。

- [自分の Tweets をインクリメンタル検索できるサービス作成キット と Tweets をまとめて削除するツールを書いた | Web Scratch](https://efcl.info/2021/06/18/mytweets-delete-tweets/)
- [過去の Tweets を全文検索できる mytweets を Bluesky に対応した。自分用 Twilog みたいなもの | Web Scratch](https://efcl.info/2023/07/03/mytweets-bluesky/)

最初は CloudFront + Lambda@Edge で作成していましたが、Next.js Pages Router で動かしていました。
Next.js App Router が Stable になったので、App Router + React Server Components(RSC)で書きなおしました。

この記事では、Next.js Pages Router から Next.js App Router(RSC)に書きなおした話を紹介します。

## mytweets の動作

mytweets は、次のような動作をします。

- クエリがない場合は、S3 Select から最新のポストを取得して表示
- クエリを入力したら、S3 Select の API を使って全文検索を行い、結果を表示

<video src="/wp-content/uploads/2024/02/mytweets_optimized.mp4" controls muted loop playsinline width="100%"></video>

この動画は、App Router + React Server Components(RSC)で動かしてるものを録画したものです。
表示的にファーストビューが出てからローディングが走って、結果を取得してポストを表示するという動作をしているので一般的な[SPA (Single-page application)](https://developer.mozilla.org/en-US/docs/Glossary/SPA)っぽく見えます。

実際のコードベース上では、クライアント側には Fetch API などは書いていません。
初期化のロード表示は、RSC + [`<Suspense>`](https://react.dev/reference/react/Suspense) + [use](https://react.dev/reference/react/use)で実現しています。（静的な部分は SSR されているので、TTFB(Time to First Byte)が短いです。)
検索時の更新のロード表示は、Next.js の`router.push`と[useTransition](https://react.dev/reference/react/useTransition)で実現しています。

## App Router への移行のメモ

どのように移行したかを簡単に振り返ってみます。
メモ書きのようなものなので、かなり乱雑に書かれています。
具体的な変更だけ見たい人は、次の Pull Request を見てください。

- [recactor(web): migrate to App Router by azu · Pull Request #5 · azu/mytweets](https://github.com/azu/mytweets/pull/5)
- [refactor(web): Suspense + Streaming by azu · Pull Request #6 · azu/mytweets](https://github.com/azu/mytweets/pull/6)


大きく 3 つのステップで移行しました。

1. App Router に移行
2. RSC を使うように変更
3. Suspense を使うように変更

### 1. App Router に移行

元々 mytweets は Next.js Pages Router で動いていました。

- Source: <https://github.com/azu/mytweets/tree/3235481d12f88de7e763439e705322499496d255/web>

サーバ側の処理は、[API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)で S3 Select を叩く API を用意してるぐらいで、他はほぼクライアントの処理でした。
次の`index.tsx`という一つのファイルに全部書いてあるような単純なページでした。

- <https://github.com/azu/mytweets/blob/3235481d12f88de7e763439e705322499496d255/web/pages/index.tsx>

そのため、この`index.tsx`に"use client"をつけたて Client Component として移行すれば App Router でも動きます。

`/pages/api`に定義する[API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)は、App Router でも動くのでサーバ側の処理はそのままに`index.tsx`を`pages/`から`app/`に移動して、`use client`をつけた Client Component に変更しました。

これで一旦 App Router で動くようになりました。
特に App Router の機能は使ってないですが、段階的に移行する際にはこのようなアプローチが利用できます。

参考:

- [プライベートクラウドのコンソール画面を Next.js の App Router でフルリプレイスした話 - Speaker Deck](https://speakerdeck.com/cyberagentdevelopers/puraibetokuraudonokonsoruhua-mian-wonext-dot-jsnoapp-routerdehururipureisusitahua)

## 2. RSC を使うように変更

このままでは、App Router の機能を使っていないので、RSC を使うように変更しました。
RSC をちゃんと使うために、コンポーネントが Client Component なのか RSC なのかが明確になっている必要があります。

これは、Client Component は RSC をインポートできないが、RSC は Client Component をインポートできるという不可逆性があるためです。
そのため、コンポーネントの境界を明確にする必要があります。

| 子＼親 | Client           | RSC                | Server Action      |
| ------ | ---------------- | ------------------ | ------------------ |
| Client | インポートできる | インポートできない | 呼べる(通信が発生) |
| RSC    | インポートできる | インポートできる   | 呼べる(関数コール) |

RSC は`useState`や`useEffect`などは使えません。
インタラクティブな部分は、Client Component で行い、RSC はデータを受け取って表示するという形になります。
RSC は、サーバ側で処理されるので、そこで moment や marked のようなライブラリを使っても、クライアント側にはライブラリは含まれません。
(あくまで、処理結果だけがクライアントに渡される)

この境界を見極めるのが結構難しいですが、最悪 Client Component のままでも動作的には問題ないです。
そのため、mytweets で RSC を使う部分は、次のような目的を設定して進めていきました。

- 基本コンセプトはクライアントサイドのサイズを削る目的

Client Component と RSC がツリーに混在することはありますが、基本的にはどちらかが上にいる形になります。

Client ComponentでRSCを包むような形は、[Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)を使うとかけます。

- [Rendering: Composition Patterns | Next.js](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

```tsx
"use client";
// children(RSCもOK) として ReactNode を受け取る
export const ClientComponent({ children }: ReactNode) {
  return <div>{children}</div>;
}
```

この書き方のユースケースとしては、枠をClient Componentで作って、その中にRSCを入れてロード中はopacityを下げるというような使い方ができます。

mytweetsでも入力して検索中のopacityを下げることでロード中を表現しています。

<video src="/wp-content/uploads/2024/02/mytweets_optimized.mp4" controls muted loop playsinline width="100%"></video>

- https://github.com/azu/mytweets/blob/efd1281ea3936a5794712d39d8be81bc04284a96/web/app/page.tsx#L80-L93 で使っている

```tsx
// Composition Patternを使う
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
<ClientComponent>
  <RSC />
</ClientComponent>
```

逆にRSCの中にClient Componentのは単純にインポートして使うだけです。

多くの場合は、この形になって大枠をRSCに書いていき、部分的にClient Componentを使うという形になります。
原理的には[Islands Architecture](https://www.patterns.dev/vanilla/islands-architecture/)と同じで、大枠は静的な表示(RSC)にして、インタラクティブな部分(Client Component)を小さくしていくという形になります。

```tsx
// RSCはClient Componentをインポートできる
<RSC>
  <ClientComponent />
</RSC>
```

Client ComponentとRSCのコンポーネントが横並びになる場合がかなり難しいです。

基本的にはRSCをツリーの上に持ってきて、Client Compoentはツリーの下に持ってくると書きやすいと思います。
これ言い換えると、インタラクションがあるボタンやフォームなどは、範囲を限定しておくという形になります。
(再描画の範囲も小さくなるように書くというのが意識としては近いと思います)

```tsx
// RSCが上にある形は、RSCからClient Componentをインポートできるので問題ない
<RSC>
  <ClientComponentX />
  <RSC_Y />
  <ClientComponentZ />
</RSC>
```

次のClient Componentが上にある混在の仕方はかなり難しいので、基本的に避けた方が良さそうです。

```tsx
// Composition Patternもやりにくいので基本的に避けたい
<ClientComponent>
  <RSC_Y />
  <ClientComponentX />
  <RSC_K />
</ClientComponent>
```

この辺を考えながえら、クライアントに不要なものをRSCに移行していくと、
最終的には、`useState`や`useEffect`が必要ない部分が全部RSCになりました。

擬似的なアプリの構造は、次のようになりました。

```jsx
export const App = ({ searchParams }) => {
    const searchResults = await fetchS3Select(searchParams.query);
    return <TransitionContextProvider> {/* Client */}
        <SearchBox />  {/* Client */}
        <SearchResultContentWrapper>  {/* Client */}
                <SearchResultContent searchResults={searchResults} />  {/* Server */}
        </SearchResultContentWrapper>
    </TransitionContextProvider>
};
```

これに合わせて、データのリロード方法もRSCベースに変更しています。
RSCはルーティングを移動すれば、もう一度RSCの処理がよばれるので、ルーティングを移動することでデータのリロードができます。

| 内容 | 変更前 | 変更後 |
| --- | --- | --- |
| ベースの仕組み | Pages Router + api/ | App Router |
| APIサーバ | api/ でRest APIを作り、クライントから呼び出す | RSCから関数としてサーバの処理を書いて呼ぶだけ |
| S3 Selectの取得 | api/ でS3 Selectを叩いて、Streamとして返して、クライアントからFetch with Streamで取得しながら表示 | pages.tsx で、S3 Selectから取得してpropsで各コンポーネントに配るだけ |
| 更新処理 | 入力欄が変更されたら、useEffectでFetchして取得 → Stateを更新して描画し直す | 入力欄が変更されたら、 router.push("/?q={検索]") へ移動するだけ(取得は pages.tsx に書かれてる仕組みがそのまま使われる) |
| 初期ロード中の表示 | Client側で取得する。取得中は、isLoadingのstate(useState)を更新して、取得が終わったらstateを更新する | pages.tsx で、S3 Selectから取得してし終わったらレンダリングするので、初期ロードはなし(ただし、S3から取得できるまでページが表示されない) |
| 更新中の表示 | (初期ロードと同じ) Client側で取得する。取得中は、isLoadingのstate(useState)を更新して、取得が終わったらstateを更新する | startTransition(() => router.push(...)) で更新中かの状態(state)を得て、更新中の表示を行う。このstateを Contextを通して、Client Component間で共有して、いろいろな場所のローディング表示を行う。 |
| URL | 特に変化しない | 入力に合わせて ?q=<クエリ> を更新していく |

実際のPull Requestは、次のURLから見れます。

- [recactor(web): migrate to App Router by azu · Pull Request #5 · azu/mytweets](https://github.com/azu/mytweets/pull/5)

この時点でパフォーマンスは良くなり、クライアントからも`useEffect`とFetchでデータ取得をしていた複雑な部分がなくなりました。
コンポーネントの境界を考えたり、RSCとClient Componentの組み合わせのためのコンポネーントは増えたりしますが、ロジック自体はかなりシンプルになりました。

- FCP: 0.6s → 0.3s
- LCP: 0.6s → 0.3s
- Speed Index: 1.8s → 0.5s

![perf App Router](/wp-content/uploads/2024/02/26-1708958667.png)

### 3. Suspense を使うように変更

ここまでで、App Router + RSC で動くようになりました。
一方で、S3 Selectの検索が終わるまで、ページが表示されないという問題があります。
S3 Selectはファイルの上から下まで全文検索するので、ヒットしない場合は時間がかかります。

その間、ページが表示されないのは体験として良くないので、検索中もページが表示されるようにするために、Suspenseを使うように変更しました。
Next.jsのドキュメントだとStreamingという言葉が使われていますが、ReactのSuspenseでロード中はプレースホルダーを表示する仕組みのことです。
(Fetch with Streamとは異なるものです)

- [Routing: Loading UI and Streaming | Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

RSCは、propsとしてPromiseを渡せるようになっています。

- ['use client' directive – React](https://react.dev/reference/react/use-client#serializable-types)

そのため、コンポーネントのPropsとしてPromiseを受け取り、そのコンポーネントをSuspenseでラップすることで、ローディング中の表示を行うことができます。
受け取ったPromiseをunwrapするには、[use](https://react.dev/reference/react/use)を利用します。

先ほどのコードでは、`await`していたので検索が終わるまでページが表示されない形になっていました。
次のように`await`を外してPromiseとして、そのPromiseを検索結果を表示するコンポーネントにpropsとして渡すだけです。

```diff
- const searchResults = await fetchS3Select(searchParams.query);
+ const searchResultsPromise = fetchS3Select(searchParams.query);
```

今までのコンポーネントの中で`use`を使ってPromiseをunwrap(resolveした値を取得)してもいいのですが、promiseを受け取るコンポーネントが気持ち悪いので、それ用のラッパーコンポーネントを定義しました。

```tsx
// useでunwrapして渡すだけのコンポーネント
export const SearchResultContentStream = (props: { retPromise: Promise<FetchS3SelectResult>; screenName: string }) => {
    const { retPromise, ...other } = props;
    const ret = use(retPromise);
    return <SearchResultContent ret={ret} {...other} />;
};
```

このSuspenseとuseを使ったラッパーコンポーネントを使った擬似的なアプリの構造は、次のようになりました。

```tsx
export const App = ({ searchParams }) => {
  const searchResults = fetchS3Select(query); // waitしないでpromiseのまま扱う
  <TransitionContextProvider> {/* Client */}
    <SearchBox />  {/* Client */}
    <SearchResultContentWrapper>  {/* Client */}
      <Suspense fallback={"Loading ..."}>
        <SearchResultContentStream retPromise={searchResults} />  {/* Server 中で use を使う*/}
      </Suspense>
    </SearchResultContentWrapper>
  </TransitionContextProvider>
}
```

これで、検索中もページが表示されるようになりました。
この変更により、検索が遅い場合でもページ自体は安定してすぐに表示されるようになりました。

実際のPull Requestは、次のURLから見れます。

- [refactor(web): Suspense + Streaming by azu · Pull Request #6 · azu/mytweets](https://github.com/azu/mytweets/pull/6)

## 感想

- [ ] 感想を書く

よく作られたサイトはCSRだけでもほぼRSCと同じことはできるけど、RSCは一種の規約なのでそれが強制される。
これは言い換えると、スケーラビリティが高いということで、どんどん開発が進むと同じことを維持するのがCSRだとかなり難しくなる。
具体的にはAPIが増えたときにどうするか、コンポーネントが増えた時にここは遅延ロードしないといけないとか、細かいことを色々考える必要がある。
これまではGraphQL + Fragmentなどを使って対応したり、Lazyを入れるなどで頑張ってきた。

RSCはこれをClientからRSCを読み込むという規則で、他の場所に逃すことを強制できる。
Server Functionはどちらかと言えばインタラクティブな機能向けで、ローディングに関してはRSCのフレームワークに乗ることで、スケーラビリティを保ちながら効率的に処理できると思います。

一方で、Server Actionは何も規約がないので無法地帯となる可能性がある。
これはNext.jsが柔軟性のためにフレームワークをしてない部分なので、この辺はもうちょっとフレームワークとしての仕組みが必要そう。

App Routerは全体的に需要を満たすために柔軟な機能を多めに入れている感じがする。
Page Routerの場合は、最初はそこまでなんでもできるというものじゃなかった気がするけど、App Routerは最初からなんでもできるの方向に作られている感じはする。
おそらくここが、複雑に感じる部分で、この辺が整理されるともっと使いやすくなると思う。

## 戦略メモ

### Client Component 間のデータのやり取り

- Contextと引数を持たないProviderのラッパーを作る
- RSCの中でClient Componentを呼べるが、RSCの中でuseStateなどは使えない
- `<Provider value={ setState } />` みたいな技は使えない
- 代わりにこれをラップしたProviderのClientコンポーネントを作って使うことで、任意の初期値を入れたContextをRSCの中でも埋め込める

具体的には次のような`TransitionContextProvider`というProviderのラッパーコンポーネントを用意してる。
このコンポーネントはRSCからもインポートして埋め込むことができる。

```tsx
"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export type TransitionContext = {
    isLoadingTimeline: boolean;
    setIsLoadingTimeline: (isLoading: boolean) => void;
};
const TransitionContext = createContext<TransitionContext>({
    isLoadingTimeline: false,
    setIsLoadingTimeline: () => {}
});
export const TransitionContextProvider = (props: { children: ReactNode }) => {
    const [isLoadingTimeline, setIsLoadingTimeline] = useState(false);
    return (
        <TransitionContext.Provider value={{ isLoadingTimeline, setIsLoadingTimeline }}>
            {props.children}
        </TransitionContext.Provider>
    );
};
export const useTransitionContext = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error("useTransitionContext must be used within a TransitionContextProvider");
    }
    return context;
};
```

- Serverでは引数にsetStateを渡すということができないので、初期値を持たないContext Providerを作るにはラッパーが必要となる
- RSCでは、Client Componentの境界のためにこういったラッパーコンポーネントを作るケースが結構ある

参考

- [React Server ComponentでもContextで状態を共有する | フューチャー技術ブログ](https://future-architect.github.io/articles/20231214a/)
- [React Context を export するのはアンチパターンではないかと考える | stin's Blog](https://blog.stin.ink/articles/do-not-export-react-context)

### ルーティングの移動中の判定

`router.push`で移動中の表示をしたいというケース。
たとえば、移動中はローディング表示をしたいとか、ボタンクリックでロード中はボタンをdisableにしたいというケース。

- `useTransition` を使うとできる
- router.push と `const [isPending, startTransition] = useTransition();` を組み合わせる
    
```tsx
    // 移動中はisLoadingがtrueになる
    const [isLoading, startTransition] = useTransition();
    const handlers = useMemo(
        () => ({
            search: (query: string) => {
              startTransition(() => router.push(`/?q=${query}`));
            }
        }),
        []
    );
```

- <https://github.com/azu/mytweets/blob/efd1281ea3936a5794712d39d8be81bc04284a96/web/app/client/SearchBox.tsx#L26-L41>
- [The new Router doesn't return a Promise · vercel/next.js · Discussion #49810](https://github.com/vercel/next.js/discussions/49810)
- [useTransition – React](https://ja.react.dev/reference/react/useTransition#building-a-suspense-enabled-router)

これは、Server Actionを呼ぶときにも利用できる。

- [Data Fetching: Server Actions and Mutations | Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#non-form-elements)

この辺が、はっきりとNext.jsのドキュメントには書かれてなくてかなりわかりにくいと思った。

### 問題

- inputの状態ルーティングと同期できない
- Vercelの公式サンプルもルーティングとinputの同期するために `<input key={key}/>`という感じでkeyを変えて破棄している
- これをやるとinputのフォーカスも無くなるので、体験が悪い

## 参考

- [Understanding React Server Components – Vercel](https://vercel.com/blog/understanding-react-server-components)
    - RSCが何をしてるか
- [控えめな App Router と持続可能な開発 - PWA Night vol.59 - Speaker Deck](https://speakerdeck.com/player/28c9e46adaaf46cba9001926612bacde?title=false&skipResize=true)
    - [Next.js App Router と控えめにお付き合いして普通の Web アプリを配信する | Offers Tech Blog](https://zenn.dev/overflow_offers/articles/20240112-using-nextjs-app-router-sparingly)
    - RSCを`getServerSideProps` の代用(page.tsxのみ)として使い、そのほかはclient componentとして使う方法
    - デフォルトがRSCなのを、opt-inでRSCを使うアプローチ
- [プライベートクラウドのコンソール画面をNext.jsのApp Routerでフルリプレイスした話 - Speaker Deck](https://speakerdeck.com/player/eb9e90fafbb64052a8c6a519894baea5?title=false&skipResize=true)
    - i18nの問題
- [【Next.jsの新機能】App Router を早速本番環境で使ってみた - aisaac技術ブログ](https://tech.aisaac.jp/entry/2023/09/26/130758)
    - 移行してのサイズがどれぐらいかわったか
- [File Conventions: page.js | Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional)
    - searchParamsはRSCのPropsで受け取れる
    - URLSearchParamsではないことに注意
- [Next.js v14 で Form validation を server 側で行う | 株式会社CAM](https://cam-inc.co.jp/p/techblog/859745503506595841)
    - redirectは例外を投げる
    - フォームバリデーション
    - [Server Actions のフォームバリデーションにおいて useFormState でエラーメッセージを表示する](https://azukiazusa.dev/blog/use-form-state-to-display-error-messages-in-server-actions-forms/)
    - [form x Server Actions x useFormStateの探求](https://zenn.dev/ikenohi/scraps/86618e830636e6)
- [React Server Components: A Comprehensive Breakdown - YouTube](https://www.youtube.com/watch?v=VIwWgV3Lc6s)
    - [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/)
    - RSCの仕組み
- https://github.com/calcom/cal.com/issues/9923
    - page → app routerへの移行 calcom
- [AddyOsmani.com - React Server Components, Next.js App Router and examples](https://addyosmani.com/blog/react-server-components-app-router/)
    - 色々なexample
- [App Router時代のデータ取得アーキテクチャ - Speaker Deck](https://speakerdeck.com/uhyo/app-routershi-dai-nodetaqu-de-akitekutiya)
    - SSRの便利レイヤーだよねという話
- https://speakerdeck.com/mugi_uno/next-dot-js-app-router-deno-mpa-hurontoendoshua-xin?slide=29
    - キャッシュを無効にする方法
- [React Server Component のテストと Container / Presentation Separation | by Yosuke Kurami | Medium](https://quramy.medium.com/react-server-component-%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88%E3%81%A8-container-presentation-separation-7da455d66576)
- https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
    - `experimental.typedRoutes` でrouter.pushも型安全になる
    - `--turbo` は `experimental.typedRoutes` に対応してない
    - ただし、パラメータの型安全はないため[useTypeUrlSearchParams](https://github.com/azu/mytweets/blob/efd1281ea3936a5794712d39d8be81bc04284a96/web/app/lib/useTypeUrlSearchParams.ts)を使ってる
- "failed to load response data: No data found for resource with given identifier"
    - このエラーは謎い
    - [How to Fix Chrome's Failed to Load Response Data Error](https://windowsreport.com/chrome-failed-to-load-response-data/)
    - proxymanでは見える、Chromium側で起きるエラーメッセージがでてる
    - https://twitter.com/azu_re/status/1761243872712380890
- [Next.jsでServer Componentsがちょっとだけテストできるようになってた](https://zenn.dev/cybozu_frontend/articles/next-rsc-testing)
    - RSCのテスト
    - 現実的にはUnit Testはロジックのテストだけしたいので、
        - RSC → ロジックだけを関数に切り出してテスト
            - これはNode.jsのテストとして普通に書く
        - Client Component → Custom Hooksをテスト
            - Hooksのテストとして書く
            - ackとか使わないといけないのが微妙
        - Componentのテスト
            - これが要求されるのはライブラリの品質を求めるコンポーネントなので、
            - それはStorybookとか持つようなコンポーネントな気がするので、
            - アプリケーションレイヤーのコンポーネントに向けて書くのは厳しい気がうる
        - E2E → ブラウザテスト
    - という感じなのではという気はする。
    - E2Eは重たいし安定させるのはとても難しい。
        - ここを真面目にやった方がいい
        - 変にモックで頑張ると崩壊した時の方が大変
        - Netflixのアプローチは全モックで全部コントロールという感じだけど、アップデートがたいへんになりそう
        - [kolodny/safetest](https://github.com/kolodny/safetest?tab=readme-ov-file)
            - [Introducing SafeTest: A Novel Approach to Front End Testing | by Netflix Technology Blog | Feb, 2024 | Netflix TechBlog](https://netflixtechblog.com/introducing-safetest-a-novel-approach-to-front-end-testing-37f9f88c152d)
- [Next.jsから学ぶWebレンダリング ~React誕生以前からApp Router with RSCまでの流れ~](https://zenn.dev/suzu_4/articles/2e6dbb25c12ee5)
- [When to use Suspense vs startTransition? · reactwg/react-18 · Discussion #94](https://github.com/reactwg/react-18/discussions/94)
    - 初期ロードと更新でロードの表示方法が異なるので、両方使う場面がある
    - けど意図的に簡略化するためにどちらかに寄せるというのを選べるといい気はする。
    - Suspenseに寄せる場合は、soft navigationをやめて常に `<a>` で移動させるとかなのかな
- [use – React](https://react.dev/reference/react/use#usage)
    - SuspeseやるときにPromise<T>をpropsに受け取らないで、Tを受け取るコンポーネントを維持する方法ってないのかな? コンポーネントをわざわざSuspenseようにラップしたりしないといけないのが微妙
    - 次みたいに書かないといけないけど、Promiseを受け取るコンポーネントってめっちゃ使いにくい気がする
    
    ```markdown
    const C = (props: {a:Promise<A>}) => {
      const a = use(props.a);
      ...
    }
    ```
    
    - これやるぐらいなら、コンポーネントそのものがSuspense向けというのを明示した方がいい気がする
    
    ```jsx
    const C_for_Suspense = (props: Promise<CProps>) => {
      const props = use(props);
      ...
    }
    ```
    
    - 最終的にはPromiseを受けるコンポーネントラッパーを書いている
        - 複数のpropsがあると `const { a, ...other } = props;` みたいなことをしないとpropsのバケツリレー漏れが起きるのでできれば避けたい
    
    ```jsx
    const C = (props: {a: A}) => {
      ...
    };
    const CStream = (props: {a: Promise<A>}) => {
      const a = use(props.a);
      return <C a={a} />
    }
    ```
    
- [Client ComponentsでSuspense+use使用時のエラー(Not implemented)の解決方法](https://zenn.dev/ojin/articles/8b383b0ac98eb9)
- ['use server' directive – React](https://react.dev/reference/react/use-server)
    - Client Componentから `"use server"` でマークされたサーバの関数をRPC的に呼ぶのは、Server Actionと言うらしい
    - Reactのドキュメントが `<form action={fn}>`だけじゃなくて、Client → Server function もServer Actionと呼んでる
- [Next.js 14 で導入された React Taint APIs を試してみた](https://zenn.dev/cybozu_frontend/articles/react-taint-apis)
    - Server Actionとかはこれを使ってマークした方がいい気はするが、大体忘れそうなのでもっと包含的なmiddlewaの仕組みが必要そうa