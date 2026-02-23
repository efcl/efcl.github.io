---
title: "Twitter/Blueskyの自己ポストの全文検索サービスをNext.js App Router(RSC)で書きなおした方法/設計/感想"
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

最初は CloudFront + Lambda@Edge + Next.js Pages Router で動かしていました。
その後、Next.js App Router が Stable になったので、App Router + React Server Components(RSC)で書きなおしました。

この記事では、Next.js Pages Router から Next.js App Router(RSC)に書きなおした話を紹介します。
ただし、この記事は発散的な内容になっているのと、あまり正確性が保証されてないので、個人的なメモ書きとして読んでください。

あまりにも長くなったので、あんまり読みやすくは書けませんでした。

📝 [キャッシュとメモ化](https://nextjs.org/docs/app/building-your-application/caching)については特に[触れていません](https://twitter.com/azu_re/status/1762404180990492867)。

## mytweets の動作

[mytweets ](https://github.com/azu/mytweets) は、次のような動作をします。

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

そのため、この`index.tsx`に"use client"をつけて Client Component として移行すれば App Router でも動きます。

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

Client Component で RSC を包むような形は、[Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)を使うとかけます。

- [Rendering: Composition Patterns | Next.js](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

```tsx
"use client";
// children(RSCもOK) として ReactNode を受け取る
export const ClientComponent({ children }: ReactNode) {
  return <div>{children}</div>;
}
```

この書き方のユースケースとしては、枠を Client Component で作って、その中に RSC を入れてロード中は opacity を下げるというような使い方ができます。

mytweets でも入力して検索中の opacity を下げることでロード中を表現しています。

<video src="/wp-content/uploads/2024/02/mytweets_optimized.mp4" controls muted loop playsinline width="100%"></video>

- https://github.com/azu/mytweets/blob/efd1281ea3936a5794712d39d8be81bc04284a96/web/app/page.tsx#L80-L93 で使っている

```tsx
// Composition Patternを使う
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
<ClientComponent>
  <RSC />
</ClientComponent>
```

逆に RSC の中に Client Component を入れるには単純にインポートして使うだけです。

多くの場合は、この形になって大枠を RSC に書いていき、部分的に Client Component を使うという形になります。
原理的には[Islands Architecture](https://www.patterns.dev/vanilla/islands-architecture/)と同じで、大枠は静的な表示(RSC)にして、インタラクティブな部分(Client Component)を小さくしていくという形になります。

```tsx
// RSCはClient Componentをインポートできる
<RSC>
  <ClientComponent />
</RSC>
```

Client Component と RSC のコンポーネントが横並びになる場合がかなり難しいです。

基本的には RSC をツリーの上に持ってきて、Client Compoent はツリーの下に持ってくると書きやすいと思います。
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

次の Client Component が上にある混在の仕方はかなり難しいので、基本的に避けた方が良さそうです。

```tsx
// Composition Patternもやりにくいので基本的に避けたい
<ClientComponent>
  <RSC_Y />
  <ClientComponentX />
  <RSC_K />
</ClientComponent>
```

この辺を考えながえら、クライアントに不要なものを RSC に移行していくと、
最終的には、`useState`や`useEffect`が必要ない部分が全部 RSC になりました。

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

これに合わせて、データのリロード方法も RSC ベースに変更しています。
RSC はルーティングを移動すれば、もう一度 RSC の処理がよばれるので、ルーティングを移動することでデータのリロードができます。

| 内容               | 変更前                                                                                                                      | 変更後                                                                                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ベースの仕組み     | Pages Router + api/                                                                                                         | App Router                                                                                                                                                                                         |
| API サーバ         | api/ で Rest API を作り、クライントから呼び出す                                                                             | RSC から関数としてサーバの処理を書いて呼ぶだけ                                                                                                                                                     |
| S3 Select の取得   | api/ で S3 Select を叩いて、Stream として返して、クライアントから Fetch with Stream で取得しながら表示                      | pages.tsx で、S3 Select から取得して props で各コンポーネントに配るだけ                                                                                                                            |
| 更新処理           | 入力欄が変更されたら、useEffect で Fetch して取得 → State を更新して描画し直す                                              | 入力欄が変更されたら、 `router.push("/?q={検索]")` へ移動するだけ(取得は pages.tsx に書かれてる仕組みがそのまま使われる)                                                                             |
| 初期ロード中の表示 | Client 側で取得する。取得中は、isLoading の state(useState)を更新して、取得が終わったら state を更新する                    | pages.tsx で、S3 Select から取得してし終わったらレンダリングするので、初期ロードはなし(ただし、S3 から取得できるまでページが表示されない)                                                          |
| 更新中の表示       | (初期ロードと同じ) Client 側で取得する。取得中は、isLoading の state(useState)を更新して、取得が終わったら state を更新する | `startTransition(() => router.push(...))` で更新中かの状態(state)を得て、更新中の表示を行う。この state を Context を通して、Client Component 間で共有して、いろいろな場所のローディング表示を行う。 |
| URL                | 特に変化しない                                                                                                              | 入力に合わせて `?q=<クエリ>` を更新していく                                                                                                                                                          |

実際の Pull Request は、次の URL から見れます。

- [recactor(web): migrate to App Router by azu · Pull Request #5 · azu/mytweets](https://github.com/azu/mytweets/pull/5)

この時点でパフォーマンスは良くなり、クライアントからも`useEffect`と Fetch でデータ取得をしていた複雑な部分がなくなりました。
コンポーネントの境界を考えたり、RSC と Client Component の組み合わせのためのコンポネーントは増えたりしますが、ロジック自体はかなりシンプルになりました。

- FCP: 0.6s → 0.3s
- LCP: 0.6s → 0.3s
- Speed Index: 1.8s → 0.5s

![perf App Router](/wp-content/uploads/2024/02/26-1708958667.png)

### 3. Suspense を使うように変更

ここまでで、App Router + RSC で動くようになりました。
一方で、S3 Select の検索が終わるまで、ページが表示されないという問題があります。
S3 Select はファイルの上から下まで全文検索するので、ヒットしない場合は時間がかかります。

その間、ページが表示されないのは体験として良くないので、検索中もページが表示されるようにするために、Suspense を使うように変更しました。
Next.js のドキュメントだと Streaming という言葉が使われていますが、React の Suspense でロード中はプレースホルダーを表示する仕組みのことです。
(Fetch with Stream とは異なるものです)

- [Routing: Loading UI and Streaming | Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

RSC は、props として Promise を渡せるようになっています。

- ['use client' directive – React](https://react.dev/reference/react/use-client#serializable-types)

そのため、コンポーネントの Props として Promise を受け取り、そのコンポーネントを Suspense でラップすることで、ローディング中の表示を行うことができます。
受け取った Promise を unwrap するには、[use](https://react.dev/reference/react/use)を利用します。

先ほどのコードでは、`await`していたので検索が終わるまでページが表示されない形になっていました。
次のように`await`を外して Promise として、その Promise を検索結果を表示するコンポーネントに props として渡すだけです。

```diff
- const searchResults = await fetchS3Select(searchParams.query);
+ const searchResultsPromise = fetchS3Select(searchParams.query);
```

今までのコンポーネントの中で`use`を使って Promise を unwrap(resolve した値を取得)してもいいのですが、promise を受け取るコンポーネントが気持ち悪いので、それ用のラッパーコンポーネントを定義しました。

```tsx
// useでunwrapして渡すだけのコンポーネント
export const SearchResultContentStream = (props: {
  retPromise: Promise<FetchS3SelectResult>;
  screenName: string;
}) => {
  const { retPromise, ...other } = props;
  const ret = use(retPromise);
  return <SearchResultContent ret={ret} {...other} />;
};
```

もしくは、サーバ側のみで動くコンポーネントなら、`async`/`await`が利用できるので次のように書いても良いかもしれません。

- 📝 `use`はClient Component/RSCどちらでも動くが、Async/AwaitはRSCのみで動く
- [RFC: First class support for promises and async/await by acdlite · Pull Request #229 · reactjs/rfcs](https://github.com/reactjs/rfcs/pull/229)

```tsx
export const SearchResultContentStream = async (props: {
  retPromise: Promise<FetchS3SelectResult>;
  screenName: string;
}) => {
  const ret = await props.retPromise;
  return <SearchResultContent ret={ret} {...other} />;
};
```

この Suspense と use を使ったラッパーコンポーネントを使った擬似的なアプリの構造は、次のようになりました。

```tsx
export const App = ({ searchParams }) => {
  const searchResults = fetchS3Select(query); // waitしないでpromiseのまま扱う
  {/* Client */}
  return <TransitionContextProvider>
    {/* Client */}
    <SearchBox />
    <SearchResultContentWrapper>
      {/* Client */}
      <Suspense fallback={"Loading ..."}>
        {/* Server 中で use を使う*/}
        <SearchResultContentStream retPromise={searchResults} />
      </Suspense>
    </SearchResultContentWrapper>
  </TransitionContextProvider>;
};
```

これで、検索中もページが表示されるようになりました。
この変更により、検索が遅い場合でもページ自体は安定してすぐに表示されるようになりました。

📝 最良パターンは2より若干悪くなる(CLSもあるため)。最悪パターンは2よりかなり改善される

| 内容 | 変更前 | 変更後 |
| --- | --- | --- |
| ベースの仕組み | Pages Router + api/ | App Router |
| APIサーバ | api/ でRest APIを作り、クライントから呼び出す | RSCから関数としてサーバの処理を書いて呼ぶだけ |
| S3 Selectの取得 | api/ でS3 Selectを叩いて、Streamとして返して、クライアントからFetch with Streamで取得しながら表示 | pages.tsx で、S3 Selectから取得してpropsで各コンポーネントに配るだけ |
| 更新処理 | 入力欄が変更されたら、useEffectでFetchして取得 → Stateを更新して描画し直す | 入力欄が変更されたら、 router.push("/?q={検索]") へ移動するだけ(取得は pages.tsx に書かれてる仕組みがそのまま使われる) |
| 初期ロード中の表示 | Client側で取得する。取得中は、isLoadingのstate(useState)を更新して、取得が終わったらstateを更新する | **更新点**: [`<Suspense>`](https://nextjs.org/docs/app/building-your-application/rendering/server-components#streaming-with-suspense) を使う。`<Suspense>` と use を使うことで、部分的にローディング表示を組み込む。S3からの取得が完了する前からページは表示される。 |
| 更新中の表示 | (初期ロードと同じ) Client側で取得する。取得中は、isLoadingのstate(useState)を更新して、取得が終わったらstateを更新する | `startTransition(() => router.push(...))` で更新中かの状態(state)を得て、更新中の表示を行う。このstateを Contextを通して、Client Component間で共有して、いろいろな場所のローディング表示を行う。 |
| URL | 特に変化しない | 入力に合わせて `?q=<クエリ>` を更新していく |

実際の Pull Request は、次の URL から見れます。

- [refactor(web): Suspense + Streaming by azu · Pull Request #6 · azu/mytweets](https://github.com/azu/mytweets/pull/6)

## 感想

よく作られたサイトは クライアントサイドレンダリング だけでもほぼ RSC と同じことはできるけど、RSC はコンポーネントを分割する一種の規約なのでそれが強制される。
これは言い換えると、サイトが複雑化してきたときでもパフォーマンスが急激には悪くなりにくいという形になってる。
一般的に、クライアントサイドレンダリングだけだと開発が進んで複雑化してきたときに、同じパフォーマンスを維持するのはかなり難しくなる。

具体的には API が増えたときにどうするか、コンポーネントが増えた時にここは遅延ロードしないといけないとか、細かいことを色々考える必要がある。
これまでは GraphQL で必要なものだけを取得したり、初期表示に必要ないコンポーネントを遅延ロードするなどの対応をしてきている。

RSC だと

- 必要なものだけ読み込む: RSC は必要なものだけを持ったコンポーネントをシリアライズしてクライアントに渡す仕組みになってる
  - Note: RSC は GraphQL を使わなくても GraphQL のようなことができる Alternative という考え方
  - [Data Fetching with React Server Components - YouTube](https://www.youtube.com/watch?v=TQQPAU21ZUw&t=2449s)
- 遅延ロード: Suspense を使って[Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)でコンポーネントをロードする

パフォーマンスの悪化を避ける方法として、いらない処理を別のところに逃すというのは良くあることで、
RSC だと、この逃す場所として RSC と Server Action が増えたという感じがする。
必要になるまで読み込まないという考え方をなんでも取り込んでるのは[Qwik](https://qwik.dev/)で、RSC の場合は[シリアライズできる範囲](https://react.dev/reference/react/use-client#serializable-types)としてコンポーネントと Promise ぐらいになっている。

一方で、Server Action は何も規約がないので、Web API を作る意識なくやってしまうと無法地帯となる可能性がある。
これは Next.js が柔軟性のためにフレームワークをしてない部分なので、この辺はもうちょっとフレームワークとしての仕組みが必要そう。

- [How to Think About Security in Next.js | Next.js](https://nextjs.org/blog/security-nextjs-server-components-actions)
- [Server Actions にユーザ操作されたくないデータは渡さない](https://zenn.dev/moozaru/articles/c3bfd1a7e3c004)

Next.js の App Router を見たときに、Client と Server で話を分けたくなるけど、実際には React Client Components/React Server Components/React Server Actions の 3 つに分かれる。

- [React Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components): React クライアントのコンポーネント
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components): React サーバのコンポーネント
- [React Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations): React サーバの API
  - [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)もレイヤー的には同じ

[Why do Client Components get SSR'd to HTML? · reactwg/server-components · Discussion #4](https://github.com/reactwg/server-components/discussions/4)を見ると、クライアントとサーバというのは物理的なクライアントサーバの話ではないのがわかる。
React の元々あった Tree のことを Client Tree と呼んで、React Server Component と一緒にできたのを Server Tree と呼んでる。 (HTML を生成するものを"Client"と呼んで、"Client"にシリアライズしたデータを処理して渡すやつを"Server"と呼んでるだけ)
そのため、"React の Client Component"ではなく"React Client の Component"という感じの意味合いになってる。

また、Client Component は RSC をインポートできないというルールを思い出すと、それぞれが扱うデータの範囲が異なるという感じがする。

| 名前                    | ユーザー入力 | サーバーデータ     |
| ----------------------- | ------------ | ------------------ |
| React Client Components | 受け取る     | indirect read-only |
| React Server Components | 受け取らない | direct read-only   |
| React Server Actions    | 受け取る     | direct read/write  |

📝 React Server Componets は searchParams でユーザー入力は受け取れるので全部ではない。またサーバーデータも読み書きできてしまうが、GET で Write は基本避けるので原則的な話。

RSC から Server Actions を呼ぶこともできるけど、その Server Actions を Cient Component から使い回すというやり方をすると事故る可能性がある。
これは、RSC がユーザー入力を基本的には受け取らない(searchParams はあるけど)けど、Client Component は受け取るという違いがある。
Server Actions から見るとどちらも同じ引数として渡ってくるので、この引数が安全なのかは基本的にわからない。

Server Actions は、クライアントとのインタラクティブ性がある API だったり、ユーザーに紐づかないデータ処理をサーバに逃すのに適している。
たとえば、郵便番号の検索して住所を返す処理とかフォームのバリデーションのような処理。

一方で、データを実際に Write するような処理は気をつけないといけないので、その辺は[Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)の方が API として扱うには安全な感じがする。
もしくは、Server Actions で一旦受けてから、別のサーバの関数にバリデーションしてから渡すような形にするとか。
この辺が、結構あいまいになりやすい気がするので、ここはもうちょっと整理されるといいと思いました。

App Router は全体的に、需要を満たすための柔軟な機能を多めに入れている感じはします。
Page Router の場合は、最初はそこまでなんでもできるというものじゃなかった気はしますが、App Router は最初から Pages Router の superset として作られている感じはします。おそらくここが、複雑に感じる部分で、この辺が整理されるともっと使いやすくなると思う。

何が opt-in で何が opt-out なのかがわかりにくいのも、難しく感じる部分なのかもしれません。

| opt-in                               | opt-out    |
| ------------------------------------ | ---------- |
| App Router                           | キャッシュ |
| React Client Component(”use client”) |            |
| React Server Action(”use server”)    |            |

これは適当なテーブルなのでどこかにドキュメントが欲しい。

### 感想のサマリ

- Next.js App Routerをちゃんと使うとパフォーマンスが落ちにくいサイトを作れるフレームワークになっている
- 一方で、ただ乗れば作れるという感じではなく、ちゃんと設計する必要はある
- 現状だと、フレームワークがフレームワークしてない部分もあるので、この辺は考えて扱う必要がある

----

こっからはメモ書き成分が多いです。
作りながら書いてたメモをコピペしてます。

## 技術的なメモ書き

実際に動かさないとやり方がわからなかった部分をメモ書きとして残しておきます。

### Client Component 間のデータのやり取り

[Islands Architecture](https://www.patterns.dev/vanilla/islands-architecture/)と同じ話ですが、Client ComponentとRSCの境界を切っていくと、Client Component同士が離れた位置にあるけど、状態は同期したいというケースが出てきます。
入力中の表示を別の場所に出すとか、ロード中は色々なところにあるボタンをdisabledにしたとか、大枠をまたいで状態を共有したいというケースです。

この場合は、Client Component間で状態を共有する方法が必要です。

やったこと

- Context と引数を持たない Provider のラッパーを作る
- Source: <https://github.com/azu/mytweets/blob/efd1281ea3936a5794712d39d8be81bc04284a96/web/app/client/TransitionContext.tsx>
- RSC の中で Client Component を呼べるが、RSC の中で useState などは使えない
- `<Provider value={ setState } />` みたいな技は使えない
- 代わりにこれをラップした Provider の Client コンポーネントを作って使うことで、任意の初期値を入れた Context を RSC の中でも埋め込める

具体的には次のような`TransitionContextProvider`という Provider のラッパーコンポーネントを用意してる。
このコンポーネントは RSC からもインポートして埋め込むことができる。

{% raw %}
```tsx
"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export type TransitionContext = {
  isLoadingTimeline: boolean;
  setIsLoadingTimeline: (isLoading: boolean) => void;
};
const TransitionContext = createContext<TransitionContext>({
  isLoadingTimeline: false,
  setIsLoadingTimeline: () => {},
});
export const TransitionContextProvider = (props: { children: ReactNode }) => {
  const [isLoadingTimeline, setIsLoadingTimeline] = useState(false);
  return (
    <TransitionContext.Provider
      value={{ isLoadingTimeline, setIsLoadingTimeline }}
    >
      {props.children}
    </TransitionContext.Provider>
  );
};
export const useTransitionContext = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error(
      "useTransitionContext must be used within a TransitionContextProvider"
    );
  }
  return context;
};
```
{% endraw %}

- Server では引数に setState を渡すということができないので、初期値を持たない Context Provider を作るにはラッパーが必要となる
- RSC では、Client Component の境界のためにこういったラッパーコンポーネントを作るケースが結構ある
- ここではContextを作っているけど、state管理のライブラリを使う場合も大体似た話になります

参考

- [React Server Component でも Context で状態を共有する | フューチャー技術ブログ](https://future-architect.github.io/articles/20231214a/)
- [React Context を export するのはアンチパターンではないかと考える | stin's Blog](https://blog.stin.ink/articles/do-not-export-react-context)

### ルーティングの移動中の判定

`router.push`で移動中の表示をしたいというケース。
たとえば、移動中はローディング表示をしたいとか、ボタンクリックでロード中はボタンを disable にしたいというケース。

- `useTransition` を使うとできる
- router.push と `const [isPending, startTransition] = useTransition();` を組み合わせる

```tsx
// 移動中はisLoadingがtrueになる
const [isLoading, startTransition] = useTransition();
const handlers = useMemo(
  () => ({
    search: (query: string) => {
      startTransition(() => router.push(`/?q=${query}`));
    },
  }),
  []
);
```

- <https://github.com/azu/mytweets/blob/efd1281ea3936a5794712d39d8be81bc04284a96/web/app/client/SearchBox.tsx#L26-L41>
- [The new Router doesn't return a Promise · vercel/next.js · Discussion #49810](https://github.com/vercel/next.js/discussions/49810)
- [useTransition – React](https://ja.react.dev/reference/react/useTransition#building-a-suspense-enabled-router)

これは、Server Action を呼ぶときにも利用できる。

- [Data Fetching: Server Actions and Mutations | Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#non-form-elements)

この辺が、はっきりと Next.js のドキュメントには書かれてなくてかなりわかりにくいと思った。

## 問題

### フォーカス管理とルーティング

- input の状態とルーティングと同期できていない
  - 戻るで戻ったときにinputの値が残ったままになる
- Vercel の公式サンプルもルーティングと input の同期するために `<input key={key}/>`という感じで key を変えて破棄している
  - [Search | Acme Store](https://demo.vercel.store/search)
  - 検索するとinputのフォーカスを失っているのがわかる
- `key` で破棄すると input のフォーカスも無くなるので、体験が悪い

### Failed to load response data: No data found for resource with given identifier

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Next.js RSCのpayloadが&quot;Failed to load response data: No data found for resource with given identifier&quot;のエラーで見えないの、<br><br>Chrome DevToolsでChrome DevToolsにdebuggerを入れてみると、<a href="https://t.co/U9fdVQBLNs">https://t.co/U9fdVQBLNs</a><a href="https://t.co/UZB1AsycaT">https://t.co/UZB1AsycaT</a><br>ここでエラーとなってる。 <a href="https://t.co/Jmh2J2Fwkk">pic.twitter.com/Jmh2J2Fwkk</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1761243872712380890?ref_src=twsrc%5Etfw">February 24, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

- RSC PayloadがChrome DevToolsで読み込めない
- 実際には読み込めているが表示されない問題
- おそらくはChromeのバグを踏んでいるのだと思うけど、Next.js側とかで何かワークアラウンドで回避してほしい
  - [Error: No data found for resource with given identifier · Issue #260 · cyrus-and/chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface/issues/260)
  - [Network.getResponseBody fails sporadically [41367044] - Chromium](https://issues.chromium.org/issues/41367044)
  - [Fail to load response data: No resource with given identifier found [40267158] - Chromium](https://issues.chromium.org/issues/40267158)
  - [DevTools: XHR (and other resources) content not available after navigation. [40254754] - Chromium](https://issues.chromium.org/issues/40254754)
- [RSC Devtools](https://chromewebstore.google.com/detail/rsc-devtools/jcejahepddjnppkhomnidalpnnnemomn)を使って見るというのもなんか微妙な話

## 参考

- [Understanding React Server Components – Vercel](https://vercel.com/blog/understanding-react-server-components)
  - RSC が何をしてるか
- [控えめな App Router と持続可能な開発 - PWA Night vol.59 - Speaker Deck](https://speakerdeck.com/player/28c9e46adaaf46cba9001926612bacde?title=false&skipResize=true)
  - [Next.js App Router と控えめにお付き合いして普通の Web アプリを配信する | Offers Tech Blog](https://zenn.dev/overflow_offers/articles/20240112-using-nextjs-app-router-sparingly)
  - RSC を`getServerSideProps` の代用(page.tsx のみ)として使い、そのほかは client component として使う方法
  - デフォルトが RSC なのを、opt-in で RSC を使うアプローチ
- [プライベートクラウドのコンソール画面を Next.js の App Router でフルリプレイスした話 - Speaker Deck](https://speakerdeck.com/player/eb9e90fafbb64052a8c6a519894baea5?title=false&skipResize=true)
  - i18n の問題
- [【Next.js の新機能】App Router を早速本番環境で使ってみた - aisaac 技術ブログ](https://tech.aisaac.jp/entry/2023/09/26/130758)
  - 移行してのサイズがどれぐらいかわったか
- [File Conventions: page.js | Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional)
  - searchParams は RSC の Props で受け取れる
  - URLSearchParams ではないことに注意
- [Next.js v14 で Form validation を server 側で行う | 株式会社 CAM](https://cam-inc.co.jp/p/techblog/859745503506595841)
  - redirect は例外を投げる
  - フォームバリデーション
  - [Server Actions のフォームバリデーションにおいて useFormState でエラーメッセージを表示する](https://azukiazusa.dev/blog/use-form-state-to-display-error-messages-in-server-actions-forms/)
  - [form x Server Actions x useFormState の探求](https://zenn.dev/ikenohi/scraps/86618e830636e6)
- [React Server Components: A Comprehensive Breakdown - YouTube](https://www.youtube.com/watch?v=VIwWgV3Lc6s)
  - [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/)
  - RSC の仕組み
- https://github.com/calcom/cal.com/issues/9923
  - page → app router への移行 calcom
- [AddyOsmani.com - React Server Components, Next.js App Router and examples](https://addyosmani.com/blog/react-server-components-app-router/)
  - 色々な example
- [App Router 時代のデータ取得アーキテクチャ - Speaker Deck](https://speakerdeck.com/uhyo/app-routershi-dai-nodetaqu-de-akitekutiya)
  - SSR の便利レイヤーだよねという話
- https://speakerdeck.com/mugi_uno/next-dot-js-app-router-deno-mpa-hurontoendoshua-xin?slide=29
  - キャッシュを無効にする方法
- [React Server Component のテストと Container / Presentation Separation | by Yosuke Kurami | Medium](https://quramy.medium.com/react-server-component-%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88%E3%81%A8-container-presentation-separation-7da455d66576)
- https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
  - `experimental.typedRoutes` で router.push も型安全になる
  - `--turbo` は `experimental.typedRoutes` に対応してない
  - ただし、パラメータの型安全はないため[useTypeUrlSearchParams](https://github.com/azu/mytweets/blob/efd1281ea3936a5794712d39d8be81bc04284a96/web/app/lib/useTypeUrlSearchParams.ts)を使ってる
- "failed to load response data: No data found for resource with given identifier"
  - このエラーは謎い
  - [How to Fix Chrome's Failed to Load Response Data Error](https://windowsreport.com/chrome-failed-to-load-response-data/)
  - proxyman では見える、Chromium 側で起きるエラーメッセージがでてる
  - https://twitter.com/azu_re/status/1761243872712380890
- [Next.js で Server Components がちょっとだけテストできるようになってた](https://zenn.dev/cybozu_frontend/articles/next-rsc-testing)
- [React Server Component のテストと Container / Presentation Separation | by Yosuke Kurami | Medium](https://quramy.medium.com/react-server-component-%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88%E3%81%A8-container-presentation-separation-7da455d66576)
  - RSC のテスト
  - Unit Test はロジックのテストだけしたいので、
    - RSC → ロジックだけを関数に切り出してテスト
      - これは Node.js のテストとして普通に書く
    - Client Component → Custom Hooks をテスト
      - Hooks のテストとして書く
      - ack とか使わないといけないのが微妙
    - Component のテスト
      - これが要求されるのはライブラリの品質を求めるコンポーネントなので、
      - それは Storybook とか持つようなコンポーネントな気がするので、
      - アプリケーションレイヤーのコンポーネントに向けて書くのは厳しい気がする
    - E2E → ブラウザテスト
  - という感じなのではという気はする。
  - E2E は重たいし安定させるのはとても難しい。
    - ここを真面目にやった方がいい
    - 変にモックで頑張ると崩壊した時の方が大変
    - Netflix のアプローチは全モックで全部コントロールという感じだけど、アップデートがたいへんになりそう
    - [kolodny/safetest](https://github.com/kolodny/safetest?tab=readme-ov-file)
      - [Introducing SafeTest: A Novel Approach to Front End Testing | by Netflix Technology Blog | Feb, 2024 | Netflix TechBlog](https://netflixtechblog.com/introducing-safetest-a-novel-approach-to-front-end-testing-37f9f88c152d)
- [Next.js から学ぶ Web レンダリング ~React 誕生以前から App Router with RSC までの流れ~](https://zenn.dev/suzu_4/articles/2e6dbb25c12ee5)
- [When to use Suspense vs startTransition? · reactwg/react-18 · Discussion #94](https://github.com/reactwg/react-18/discussions/94)
  - 初期ロードと更新でロードの表示方法が異なるので、両方使う場面がある
  - けど意図的に簡略化するためにどちらかに寄せるというのを選べるといい気はする。
  - Suspense に寄せる場合は、soft navigation をやめて常に `<a>` で移動させるとかなのかな
- [use – React](https://react.dev/reference/react/use#usage)
  - Suspese やるときに Promise<T>を props に受け取らないで、T を受け取るコンポーネントを維持する方法ってないのかな? コンポーネントをわざわざ Suspense ようにラップしたりしないといけないのが微妙
  - 次みたいに書かないといけないけど、Promise を受け取るコンポーネントってめっちゃ使いにくい気がする
  ```markdown
  const C = (props: {a:Promise<A>}) => {
  const a = use(props.a);
  ...
  }
  ```
  - これやるぐらいなら、コンポーネントそのものが Suspense 向けというのを明示した方がいい気がする
  ```jsx
  const C_for_Suspense = (props: Promise<CProps>) => {
    const props = use(props);
    ...
  }
  ```
  - 最終的には Promise を受けるコンポーネントラッパーを書いている
    - 複数の props があると `const { a, ...other } = props;` みたいなことをしないと props のバケツリレー漏れが起きるのでできれば避けたい
  ```jsx
  const C = (props: {a: A}) => {
    ...
  };
  const CStream = (props: {a: Promise<A>}) => {
    const a = use(props.a);
    return <C a={a} />
  }
  ```
  - Edit: Ref <https://twitter.com/koichik/status/1762403998609678773>
- [Client Components で Suspense+use 使用時のエラー(Not implemented)の解決方法](https://zenn.dev/ojin/articles/8b383b0ac98eb9)
- ['use server' directive – React](https://react.dev/reference/react/use-server)
  - Client Component から `"use server"` でマークされたサーバの関数を RPC 的に呼ぶのは、Server Action と言うらしい
  - React のドキュメントが `<form action={fn}>`だけじゃなくて、Client → Server function も Server Action と呼んでる
- [Next.js 14 で導入された React Taint APIs を試してみた](https://zenn.dev/cybozu_frontend/articles/react-taint-apis)
  - Server Action とかはこれを使ってマークした方がいい気はするが、大体忘れそうなのでもっと包含的な middlewa の仕組みが必要そう a
- [Server Actionsにユーザ操作されたくないデータは渡さない](https://zenn.dev/moozaru/articles/c3bfd1a7e3c004)
    - クライアントとサーバが同じ言語だと結構起きやすい感じはある
    - セッションやDBから引くべきものをクライアントからそのまま渡してしまうと起きる問題
    - Server → ClientはTaint APIが対策として利用できるが
    - Client → Serverは設計的な対応が必要になる
- [How to Think About Security in Next.js | Next.js](https://nextjs.org/blog/security-nextjs-server-components-actions)
    - Server Actionsは通常のAPIと同じように考える必要がある
