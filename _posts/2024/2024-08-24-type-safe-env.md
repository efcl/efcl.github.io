---
title: "Node.jsで型安全な環境変数を扱うスニペット"
author: azu
layout: post
date: 2024-08-24T13:58
category: JavaScript
tags:
  - JavaScript
  - Node.js
---

Node.js で型安全な環境変数を扱うスニペットを作りました。

`next dev`のようなアプリケーションの起動、Playwright でのテストなどコマンドごとに渡したい環境変数のセットが異なるケースがあります。
この場合に環境変数をまとめたものを定義して、それをコマンドごとに読み込むセットを変えたいことがあります。

次のようにベタ書きしてもいいのですが、渡したい環境変数が増えると管理が大変になります。

```bash
NEXT_PUBLIC_LOCALHOST_URL=http://localhost:3000 NEXT_PUBLIC_API_URL=http://localhost:3001 NEXT_PUBLIC_IS_TEST_MODE=false FOO="bar" next dev
```

そのため、`.env`のような環境変数をまとめたファイルを使いたくなります。
Node.js は`--env-file`フラグで`.env`ファイルを読み込むことができますが、`.env`ファイルは型安全ではありません。

- [`--env-file`](https://nodejs.org/api/cli.html#--env-fileconfig)
- [Node.js — How to read environment variables from Node.js](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)

環境変数名の Typoや必須の環境変数が設定されていないなどの問題が発生する可能性があります。
そのため環境変数をの定義自体も TypeScript で型安全に定義したいです。

これをやるための 50 行ほどのスニペットを書いたので、使い方を紹介します。

- 📝 主な用途はローカルやCIでの開発用で、実際にデプロイするサーバなどには利用しない想定です
- 📝 ライブラリとかにしてないのは、この仕組み自体が外部パッケージの依存もなく短いスニペットだからです
  - JSからTSを参照する都合上、ライブラリにはちょっとしにくい気がします

## サンプルリポジトリ

次の場所にサンプルリポジトリがあります。

- [azu/type-safe-env: Type Safe /Environment Variables snippet for Node.js](https://github.com/azu/type-safe-env)

## 使い方

大きく分けて、環境変数の型を定義する`defineEnv`関数と、環境変数をセットする`setEnv`関数があります。

### 環境変数の型を定義する

- [defineEnv.ts](https://github.com/azu/type-safe-env/blob/main/src/env/defineEnv.ts): 環境変数の型を定義する Utility

`defineEnv`関数を次のような受け取りたい環境変数の型定義をするUtilityです。

```ts
export type BaseEnvRecord = Record<
    string,
    {
        value: string | undefined;
        required: boolean;
        defaultValue?: string;
    }
>;
export type ReturnTypeOfCreateEnv<T extends BaseEnvRecord> = {
    // If the value is required, it should be a string, otherwise it should be a string or undefined
    [K in keyof T]: T[K]["required"] extends true ? string : string | undefined;
};
/**
 * Define environment variables and create them
 */
export const defineEnv = <T extends BaseEnvRecord>(envs: T): ReturnTypeOfCreateEnv<T> => {
    const result = new Map<string, string | undefined>();
    Object.entries(envs).forEach(([key, { value, required, defaultValue }]) => {
        if (required && !value && !defaultValue) {
            throw new Error(
                `Missing required environment variable: ${key}, value: ${value === undefined ? "undefined" : `"${value}"`}`
            );
        }
        result.set(key, value || defaultValue);
    });
    return Object.fromEntries(result) as ReturnTypeOfCreateEnv<T>;
};
```

- [env.ts](https://github.com/azu/type-safe-env/blob/main/src/env/env.ts): アプリケーション用の環境変数を定義する

`env.ts`では、`defineEnv`関数を使ってアプリケーションで受け取りたい環境変数の型を定義します。

```ts
import { defineEnv } from "./defineEnv";

export const env = defineEnv({
  /**
   * Localhost URL
   */
  LOCALHOST_URL: {
    value: process.env["LOCALHOST_URL"],
    required: true,
    defaultValue: "http://localhost:3000",
  },
  /**
   * Is test mode?
   */
  IS_TEST_MODE: {
    value: process.env["IS_TEST_MODE"],
    required: true,
    defaultValue: "false",
  },
  /**
   * Optional value
   */
  OPTIONAL_VALUE: {
    value: process.env["OPTIONAL_VALUE"],
    required: false,
  },
});
```

このときに、Node.js なら`process.env`を使って環境変数を取得します。
値ごとに`required`で必須かどうかの指定や、`defaultValue`でデフォルト値を指定できます。
具体的には、`required: true` で `defaultValue`が指定されていなくて、`process.env.*`の値がない場合はエラーになります。

この `defineEnv`関数で定義した`env`はアプリケーションが使う環境変数をまとめたものです。

次のようにアプリケーションからは`env`を import して使います。
`defineEnv`関数で定義した環境変数を型安全に使うことができます。

```ts
// use env
import { env } from "../env/env";
// type-safe
console.log("localhost url", env.LOCALHOST_URL);
console.log("Is Test Mode", env.IS_TEST_MODE);
console.log("OPTIONAL_VALUE", env.OPTIONAL_VALUE); // string or undefined
```

一方で、`process.env`に設定する環境変数自体も型安全に設定したいです。

### 環境変数をセットする

次の`setEnv`関数を使って、プロセスに対して環境変数をセットします。

- [setEnv.js](./src/env/setEnv.js): 環境変数をセットする Utility

例として、次のような`env.local.js`と`env.test.js`のような環境変数をまとめたファイルを作ります。

- [env.local.js](./env.local.js): ローカル開発用の環境変数をセットする

```js
import { setEnv } from "./src/env/setEnv";

// local環境用の環境変数をセット
setEnv({
  LOCALHOST_URL: "http://localhost:3500",
  IS_TEST_MODE: "false",
});
```

- [env.test.js](./env.test.js): テスト用の環境変数をセットする

```js
import { setEnv } from "./src/env/setEnv";

// test環境用の環境変数をセット
setEnv({
  LOCALHOST_URL: "http://localhost:3500",
  IS_TEST_MODE: "true",
});
```

あとは、この`env.*.js`を`NODE_OPTIONS`を使って読み込むことで、環境変数をセットできます。

例えば、`env.local.js`を使って開発サーバーを起動する場合は次のようにします。

```bash
NODE_OPTIONS='--import ./env.local.js' npm run dev
```

テストを実行する場合は、`env.test.js`を使って次のようにします。

```bash
NODE_OPTIONS='--import ./env.test.js' npm test
```

これで、`npm run dev`や`npm test`などのコマンドごとに異なる環境変数をセットできるようになります。

## 仕組み

`defineEnv.ts`の方はただのTypeScriptなのであまり問題ないと思います。

`setEnv.js`の方は、TypeScriptではなくJavaScriptで書いていますが、[checkJs](https://www.typescriptlang.org/tsconfig/#checkJs)を使って型チェックを行っています。

具体的には、次のような`tsconfig.json`を使って、`env.*.js`を型チェックしています。
`allowJs`を有効化していますが、通常はなんでも`.js`を`tsc`では扱いたくないので、`env.*.js`だけを`includes`に指定しています

```json5
{
  "compilerOptions": {
    // ....
    // Type Check for env.*.js
    "allowJs": true,
    "checkJs": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    // allow to check js files
    "./src/env/setEnv.js",
    "env.*.js"
  ],
  "exclude": [
    ".git",
    "node_modules"
  ]
}
```

`setEnv.js`の方は、JSDocを使って受け取れる環境変数の型を定義しているのでcheckJsが有効になっていると型チェックが行われます。

```js
import process from "node:process";

/**
 * set env util
 * @param {Partial<typeof import("./env").env>} env
 */
export const setEnv = (env) => {
    if (process.env["PRINT_ENV"] === "true") {
        console.table(env);
    }
    Object.entries(env).forEach(([key, value]) => {
        process.env[key] = value;
    });
};
```

### FAQ

#### `.env`の代わりに`env.*.js`を使う理由

`.env`ファイルは型安全ではないです。
`env.*.js`はTypeScriptの`checkJs`機能で型チェックされるため型安全です。

Node.js は`--env-file`フラグで`.env`ファイルを読み込むことができます。

- [`--env-file`](https://nodejs.org/api/cli.html#--env-fileconfig)
- [Node.js — How to read environment variables from Node.js](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)

しかし、`NODE_OPTIONS="--env-file=.env"`は許可されていません。

- [Node 20.6+ `--env-file` flag in `NODE_OPTIONS` is not allowed · Issue #1096 · cypress-io/github-action](https://github.com/cypress-io/github-action/issues/1096)

#### `env.*.ts`の代わりに`env.*.js`を使う理由

Node.js の`--experimental-strip-types`はまだ実験的な機能です。

ts-nodeやtsxなどを使えば`.ts`でも書けますが、あえてTypeScriptの変換を入れるほどでもないので`env.*.js`を使っています。

#### 直接`--import`フラグを使わずに`NODE_OPTIONS`を使う理由

`pnpm`のようなパッケージマネージャはパッケージのbinをシェルスクリプトとしてインストールします。

例えば、`node_modules/.bin/vite`はシェルスクリプトとしてインストールされます。

そのため、`node`コマンドを使って`vite`コマンドを実行できません。

```bash
node --import=./env.local.js node_modules/.bin/vite
# エラーになる
```

[NODE_OPTIONS=options](https://nodejs.org/docs/latest/api/cli.html#node_optionsoptions)を使うことで、Node.jsプロセスにオプションを渡すことができます。

```bash
NODE_OPTIONS='--import ./env.local.js' node_modules/.bin/vite
# これなら動く
```

## まとめ

Node.js で型安全な環境変数を扱うスニペットを作りました。

- `defineEnv`関数で環境変数の型を定義
- `setEnv`関数で環境変数をセット
- `NODE_OPTIONS`で`env.*.js`を読み込むことで、コマンドごとに異なる環境変数をセット

50行ほどのスニペットですが、環境変数を型安全に扱うことができるので結構便利でした。

## 参考

- [azu/type-safe-env: Type Safe /Environment Variables snippet for Node.js](https://github.com/azu/type-safe-env)
