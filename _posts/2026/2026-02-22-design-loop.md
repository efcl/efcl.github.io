---
title: "design-loop: Claude Code用のブラウザベースのビジュアル編集ツール"
author: azu
layout: post
render_with_liquid: false
date : 2026-02-22T12:00
category: JavaScript
tags:
    - Claude
    - AI
    - JavaScript
    - TypeScript

---

[design-loop](https://github.com/azu/design-loop)は、Claude Code用のブラウザベースのフロントエンドです。

- GitHub: <https://github.com/azu/design-loop>

![design-loopのスクリーンショット](/wp-content/uploads/2026/02/design-loop-screenshot.png)

左パネルに開発中のサイトのプレビュー、右パネルにClaude Codeのターミナルが表示されます。プレビュー上の要素をクリックすると、その要素のコンポーネント情報やスタイルがClaude Codeに渡されます。

## インストール

```bash
curl -fsSL https://raw.githubusercontent.com/azu/design-loop/main/install.sh | sh
```

## 使い方

開発サーバーがすでに起動している場合は、`--url`でURLを指定するだけで起動できます。

```bash
design-loop --url http://localhost:3000
```

`--command`オプションを使うと、開発サーバーの起動もdesign-loopに任せられます。開発サーバーが起動してからプロキシが自動的に接続します。

```bash
design-loop --url http://localhost:3000 --command "npm run dev"
```

起動すると、プレビューとClaude Codeのターミナルを統合したブラウザUIが開きます。プレビュー上の要素をクリックすると、コンポーネント名やファイルパス、スタイルなどのコンテキストがClaude Codeへの指示に含まれます。

<video src="https://github.com/user-attachments/assets/02cf182e-9d43-488f-ac57-787dbb228d9e" controls muted loop playsinline width="100%"></video>

## 作った背景

Claude CodeでWebサイトやアプリの見た目を調整するとき、次のような作業フローを繰り返します。

1. ブラウザでサイトを確認
2. 「このボタンのスタイルを変えたい」と感じる
3. DevToolsで要素を特定し、どのコンポーネントか調べる
4. エディタでファイルを開く
5. Claude Codeに「このコンポーネントを変更して」と指示する

この行き来が繰り返されるのは、「サイトを見ている」コンテキストと「コードを指示する」コンテキストが分断されているからです。

指示を出す際に「どのファイルのどのコンポーネントか」を毎回説明するのは、LLMに対して本来不要なコンテキストを埋める作業です。ページ上で要素をクリックすれば自明な情報を、言葉で説明しています。

design-loopは、ブラウザ上でサイトを見ながら要素を選択し、その情報をそのままClaude Codeへ渡す仕組みを作ることでこの問題を解決します。

design-loopはエンジニア以外の人でも使えることを意識して作っています。DevToolsの知識がなくても、ブラウザ上で要素をクリックするだけでClaude Codeに指示を出せます。

## 技術的な実装

類似の課題をElectronやTauriのようなデスクトップアプリとして解決する方法もあります。しかしdesign-loopはCLI + HTTPプロキシという構成を選びました。

デスクトップアプリは配布が面倒です。コード署名、インストーラー、アップデート機構が必要になります。CLIツールとしてHTTPプロキシを立てる形なら、`curl`でインストールできます。また、HTTPプロキシであれば既存の開発サーバーに対して透過的に動作させられるため、フレームワーク側に手を加える必要がありません。

### プロキシサーバーによるHTML注入

design-loopの中心はHTTPプロキシサーバーです。既存の開発サーバー（`http://localhost:3000`など）へのリクエストを中継し、HTMLレスポンスに対してスクリプトを動的に注入します。

```
ブラウザ → design-loopプロキシ → 開発サーバー
                ↓ HTMLにscriptを注入
ブラウザ ← design-loopプロキシ ← 開発サーバー
```

注入するスクリプトは2つです。

1. `WebSocket`をオーバーライドするスクリプト（HMR接続をプロキシ経由に書き換え）
2. 要素選択やデザインモードを実現する`design-loop-inject.js`

HTMLの注入は、Cloudflare WorkersのHTMLRewriterに似たストリーミング方式で行っています。HTMLレスポンス全体をバッファリングせず、ストリームを流しながら2か所に挿入します。

```
[先頭] WebSocketオーバーライドスクリプトを書き込む
  ↓ upstreamからのHTMLをそのままストリーミング
[末尾] <script src="/design-loop-inject.js"> を追記
```

バッファリングしない理由は、React 18やNext.js App RouterのSSRストリーミングに対応するためです。HTMLをすべて受け取ってから書き換えると、ストリーミングレスポンスが遅延してしまいます。

WebSocketスクリプトをストリームの**先頭に**注入するのは、次のページコンテンツが読み込まれる前にHMR接続のパッチを当てる必要があるからです。タイミングが遅れると、Next.js/webpackがすでにWebSocket接続を作成した後になってしまいます。

WebSocketのオーバーライドにより、ViteなどのHMR接続が壊れず、ホットリロードがそのまま動作します。また、`X-Frame-Options`やCSPヘッダーを削除することで、UIサーバーのiframe内に開発サーバーのページを埋め込めるようにしています。

### inject-script: DOM要素のコンテキスト収集

注入スクリプトの主な役割は、クリックされたDOM要素のコンテキストを収集してiframeの親フレームに`postMessage`で送ることです。

送信する情報は次の通りです。

```typescript
const info = {
  selector: getCSSSelector(target),       // CSS Selector
  component: getReactComponentInfo(target), // Reactコンポーネント情報
  styles: getComputedStylesSummary(target), // 計算済みスタイル
  rect: { top, left, width, height },     // 要素の位置・サイズ
  tagName: target.tagName.toLowerCase(),
  textContent: target.textContent.slice(0, 100),
  ariaSnapshot: buildAriaSnapshot(target), // ARIAツリー
};
```

#### CSS Selector生成

ID優先で、なければタグ名・クラス名・`:nth-child()`を組み合わせた階層的なセレクタを構築します。

#### React Fiberからのコンポーネント情報

DOMノードにはReactが`__reactFiber$xxx`という内部プロパティを付与しています。これを辿ることでコンポーネント名・props・`_debugSource`（ソースファイルのパスと行番号）を取得できます。

```typescript
// DOM要素からFiberを取得
const fiberKey = Object.keys(el).find(k => k.startsWith("__reactFiber$"));
let fiber = el[fiberKey];

// ネイティブ要素のFiberからコンポーネントFiberへ上に辿る
while (fiber && typeof fiber.type === "string") {
    fiber = fiber.return;
}
// fiber.type.displayName or fiber.type.name → コンポーネント名
// fiber._debugSource → { fileName, lineNumber, columnNumber }
```

この`__reactFiber$`を使ったアプローチは、ブラウザ上のReactアプリを解析する手法としてよく使われています。Claude Code DesktopのPreview機能も同様にReact Fiberからコンポーネント情報を取得しています。FigmaのClaude Code連携機能（[From Claude Code to Figma](https://www.figma.com/blog/introducing-claude-code-to-figma/)）でも、ページに`capture.js`を注入して同様の処理をしています。

#### ARIAスナップショット

選択要素の周辺（ランドマーク境界まで最大5階層）のARIAツリーを文字列化します。テキストのみでページの構造的なコンテキストをLLMへ渡すためのアプローチです。スクリーンショットのようにピクセルではなく、セマンティクスを伝えます。

### BunのトランスパイラでTypeScriptをブラウザに直接配信

`inject-script.ts`はTypeScriptで書かれていますが、サーバーサイドでのビルドステップは設けていません。代わりにBunの組み込みトランスパイラを使い、リクエスト時にその場でJavaScriptへ変換してブラウザに返しています。

```typescript
// src/proxy/inject.ts
import injectScriptSource from "../ui/inject-script.ts" with { type: "file" };

export async function getInjectScript(): Promise<string> {
  const source = await Bun.file(injectScriptSource).text();
  const transpiler = new Bun.Transpiler({ loader: "ts" });
  return transpiler.transformSync(source); // 型を除去してJSを返す
}
```

`with { type: "file" }`というBun固有のimport attributeでファイルパスを取得し、`Bun.Transpiler`で変換します。esbuildやrollupは不要で、Bunランタイムだけで完結します。

Bunはランタイムとバンドラーが統合されているため、このようなツール開発に向いています。TypeScriptをそのまま実行でき、必要なら`Bun.Transpiler`でブラウザ向けのJSを生成でき、PTYやHTTPサーバーも標準APIとして使えます。

同じ方向として、[Electrobun v1](https://blackboard.sh/blog/electrobun-v1/)もBunをベースにしたデスクトップアプリフレームワークです。ElectronのようにWebViewとバックエンドを統合しますが、Bunのエコシステムに乗ることで「外部ツールなしにTypeScriptとネイティブAPIを組み合わせられる」点が共通しています。

### PTYとGhostty Webでブラウザにターミナルを統合

Claude CodeのプロセスはBunのPTY APIを使って起動します。Node.jsでPTYを扱うには[node-pty](https://github.com/microsoft/node-pty)がありますが、ネイティブモジュールのためビルドが必要で、配布時に面倒が生じます。BunはPTYを`Bun.Terminal`としてランタイムに組み込んでいるため、追加のネイティブモジュールが不要です（ただし現時点ではWindows未対応）。`Bun.spawn`にterminalオプションを渡すだけでPTYにアタッチできます。

```typescript
const terminal = new Bun.Terminal({
  cols, rows,
  data(_term, data) {
    // PTYの出力をWebSocket接続しているすべてのブラウザに配信
    for (const ws of connections) ws.send(data);
  },
});

Bun.spawn([shell, "-l", "-c", "claude"], { terminal, cwd });
```

ブラウザ側のターミナルエミュレータには[ghostty-web](https://github.com/ghostty-org/ghostty)を使っています。GhosttyはGPUレンダリングを使った高性能なターミナルアプリで、そのWebAssembly版（ghostty-web）をxterm.jsの代わりに採用しています。

再接続時のため、128KBのリングバッファでPTYの出力を保持しています。ブラウザがリロードされてもターミナルの表示内容を再生できます。

## Claude Code DesktopのPreview機能との類似点と違い

2026年2月、Claude Code DesktopがPreview機能を追加しました。

- [Use Claude Code Desktop - Preview your app](https://code.claude.com/docs/en/desktop#preview-your-app)

Preview機能では、プレビュー画面で要素を選択するとスクリーンショット・React情報・DOMの情報がClaude Codeに渡されます。design-loopを公開した後にこのPreview機能が公開されましたが、DOM/React Fiberの情報を収集してClaude Codeに渡すというアーキテクチャはほぼ同じでした。同じ課題を解決しようとすると似たアーキテクチャになるのだと感じました。

設計思想の違いもあります。Claude Code DesktopのPreviewは「Claude Codeというプロンプト環境が主体で、プレビューはその補助ツール」として設計されており、プレビューのサイズ制限もあります。

design-loopは逆で「プレビューが主体で、Claude Codeのプロンプトは手段」という位置づけです。これはデザイナーが使うことを意識していたからです。

非エンジニアがAIツールを使っている様子を見ていると、複数のウィンドウやアプリを行き来すると混乱する人がとても多いです。SaaSの画面のように1つの画面で完結することに慣れていると、ファイラーやターミナルなど知らないものが同時に出てくると難しく感じます。プレビューとターミナルを1つの画面で見られること自体に価値があると、作っていて感じました。

Claude Code DesktopもCoworkやPreviewで同じ方向へ進んでいます。[Pencil](https://www.pencil.dev/)のようなデザインとコード生成を統合するツールも登場しており、こうした統合ツールは今後増えていくのではないかと考えています。

作ってみて、Bun.Terminalとghostty-webの組み合わせでClaude CodeのUIをブラウザに持ってくるのは意外と簡単にできることがわかりました。PTYの出力をWebSocketで流してターミナルエミュレータに表示するだけなので、Claude Code向けのカスタムUIを作りたい場合の参考になれば幸いです。

---

- GitHub: <https://github.com/azu/design-loop>
