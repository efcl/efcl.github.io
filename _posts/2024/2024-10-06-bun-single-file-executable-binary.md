---
title: "BunでNode.jsのツールをSingle-file executable binaryにしてバイナリを配布する"
author: azu
layout: post
date : 2024-10-06T20:25
category: JavaScript
tags:
    - Bun
    - Node.js
    - JavaScript

---

[Secretlint](https://github.com/secretlint/secretlint) v8.3で、単体のバイナリファイルとして`secretlint`コマンドを配布するようにしました。

- [Release v8.3.3 · secretlint/secretlint](https://github.com/secretlint/secretlint/releases/tag/v8.3.3)

どういうことができるようになるかというか、Node.jsをインストールしなくても`secretlint`コマンドを使えるようになります。
次のようにCurlでダウンロードして実行するだけで、機密情報の検出ができるようになります。

```bash
#!/usr/bin/env bash
set -euo pipefail
SECRETLINT_VERSION="8.3.3" # secretlintのバージョン
ARCH=$(uname -m)
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
# Map architecture to the expected format
case "$ARCH" in
    x86_64)
        ARCH="x64"
        ;;
    aarch64)
        ARCH="arm64"
        ;;
    arm64)
        ARCH="arm64"
        ;;
    *)
        echo "Unsupported architecture: $ARCH"
        exit 1
        ;;
esac

# Download the binary
curl -sSL "https://github.com/secretlint/secretlint/releases/download/$(SECRETLINT_VERSION)/secretlint-$(SECRETLINT_VERSION)-$(OS)-$(ARCH)" -o secretlint
chmod +x ./secretlint
# Create .secretlintrc.json
./secretlint --init
# Run secretlint
./secretlint "**/*"
```

[Secretlint](https://github.com/secretlint/secretlint)は[Docker](https://github.com/secretlint/secretlint#using-docker)も対応していますが、コマンドラインツールの場合は単体のバイナリとして使えると何かと便利です。

npm経由と比べて、Node.jsを必要としないのとダウンロードが1つのファイルだけなのでシンプルです。
Docker経由に比べて、Dockerを必要としないのと実行までの時間が早いはずです。
デメリットとしては、単体のバイナリはルールも同梱しないと配布できないので、ルールの追加が難しい点です。
(一応 node_modules 以下にルールがあれば参照できますが、それは実質npmに依存してるので素直にnpm使ったほうが良いです)

この `secretlint` バイナリは、[Bun](https://bun.sh/)を使ってRunTimeも含んだSingle-file executable binaryとして配布しています。
この記事では、Bunを使ってNode.jsのツールのSingle-file executable binaryを配布する方法を紹介します。

## Bunとは

[Bun](https://bun.sh/)は、Node.js互換のランタイムです。
[Bun 1.0](https://bun.sh/blog/bun-v1.0)が出てから1年ほど経ちますが、Node.jsのコードは結構そのまま動きます。
Secretlintは、特別なBunの対応はすることなく、そのままBunでも実行できました。

## BunでSingle-file executable binaryを作る

Bunには、`bun build --compile`というコードから、Single-file executable binaryを作る機能があります。

- https://bun.sh/docs/bundler/executables

次のように、`bun build --compile`を実行すると、`secretlint`のSingle-file executable binaryが作成されます。
[Bun v1.1.5](https://bun.sh/blog/bun-v1.1.5)で、Cross Compileも対応したため、macOSでLinuxのバイナリも作成できます。

```bash
bun build --compile --target=bun-linux-x64 ./index.ts --outfile myapp
```

Secretlintでは、`secretlint`からCLIのインターフェースを公開しているので、次のようにCLIのインターフェースをラップするだけの`index.ts`を作成しました。

```ts
import { cli, run } from "secretlint/cli";
run(cli.input, cli.flags).then(
    ({ exitStatus, stderr, stdout }) => {
        if (stdout) {
            console.log(stdout);
        }
        if (stderr) {
            console.error(stderr);
        }
        process.exit(exitStatus);
    },
    (error) => {
        console.error(error);
        process.exit(1);
    }
);
```

あとは、これを`bun build --compile`でビルドするだけ、`secretlint`のSingle-file executable binaryが作成できます。

```bash
bun build --compile --target=bun-linux-x64 ./index.ts --outfile dist/secretlint
```

しかし、Secretlintはデフォルトではルールを同梱してないので、バイナリにルールを含める必要があります。
ルールは、基本的に`.secretlintrc.json`に定義したものを、動的にロード(Dynamic Import)することで読み込むことで利用できます。
ただ、`bun build --compile`は、外からパッケージ名を指定してロードするようなものをはそのままではバイナリに含めることができません。

そのため、SecretlintやESLint、textlintなどの動的なパッケージロードを含むツールをSingle-file executable binaryにするには工夫が必要です。

## 動的なパッケージロードを含むツールをSingle-file executable binaryにする

Secretlintには、[@secretlint/secretlint-rule-preset-recommend](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/secretlint-rule-preset-recommend)という推奨ルールセットがあります。
多くのケースでは、このプリセットルールがあればある程度使えるので、単体のバイナリに含めることにしました。

しかし、`bun build --compile`は、`import(name)`のようなDynamic Importの引数が変数の場合には対応していません。

具体的には、次のようなコードがあった場合、`loadDynamicModule("rambda")`のようなコードはビルド済みのバイナリでは実行に失敗します。

```ts
import "rambda"; // ← これはOK
export const loadDynamicModuleHard = async () => {
  const { head } = await import("rambda"); // ← これはOK
  console.log(head("XLL"));
}
export const loadDynamicModule = async (packageName: string) => {
  const { head } = await import(packageName); // ← これはNG
  console.log(head("XLL"));
}
loadDynamicModule("rambda");
```

📝 Deno Compileの場合は、パッケージ名でキャッシュされているので、事前にimportしておくだけで`loadDynamicModule(packageName)`のようなコードは動作します。

- https://zenn.dev/kn1cht/articles/deno-textlint

この問題を回避するには、事前にstatic import(import文)で必要なパッケージをimportしておき、Dynamic ImportをHookしてモックするような処理が必要です。
Secretlintでは、[`@secretlint/resolver`](https://github.com/secretlint/secretlint/tree/master/packages/%40secretlint/resolver)という内部的なresolver/import hooksを実装しました。

`@secretlint/resolver`は、`require.resolve(specifier)`と`import(specifier)`をラップした関数を提供しています。
それと合わせて、`registerResolveHook`と`registerImportHook`という関数を提供して、resolveやimportするときの処理に対してHookを登録できるようにしています。

```ts
import { createRequire } from "node:module";
import * as url from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
export type ResolverContext = {
    parentImportMeta: ImportMeta;
    parentModule: "config-loader" | "formatter";
};
type ResolverSkipResult = undefined;
/**
 * Resolve Hook
 */
export type ResolveHook = (
    specifier: string,
    context: ResolverContext
) =>
    | {
          url: string | undefined;
      }
    | ResolverSkipResult;
/**
 * dynamic import() hook
 */
export type ImportHook = (
    specifier: string,
    context: ResolverContext
) => Promise<
    | {
          exports: Record<string, unknown>;
      }
    | ResolverSkipResult
>;

const resolveHooks: ResolveHook[] = [];
const importHooks: ImportHook[] = [];
/**
 * Register Resolver Hook
 * Hook can return resolved URL
 * if hooks pass through, it should return `undefined` instead of object
 * @param hook
 */
export const registerResolveHook = (hook: ResolveHook) => {
    resolveHooks.push(hook);
};

/**
 * Try to resolve package name
 * if `packageName` is found, return resolved absolute path.
 * if `packageName` is not found, return `undefined`
 * @param packageName
 * @param context
 */
export const tryResolve = (packageName: string, context: ResolverContext): string | undefined => {
    try {
        for (const hook of resolveHooks) {
            const result = hook(packageName, context);
            // Skip if hook return undefined from hook
            if (!result) {
                continue;
            }
            if (result?.url) {
                return result.url;
            }
        }

        // TODO: import.meta.resolve is not supported in Node.js 18
        // We will change to import.meta.resolve(packageName)
        return require.resolve(packageName);
    } catch {
        return undefined;
    }
};

/**
 * Register Import Hook
 * @param hook
 */
export const registerImportHook = (hook: ImportHook) => {
    importHooks.push(hook);
};

// Windows's path require to convert file://
// https://github.com/secretlint/secretlint/issues/205
const convertToFileUrl = (filePath: string) => {
    if (filePath.startsWith("file://")) {
        return filePath;
    }
    return url.pathToFileURL(filePath).href;
};
/**
 * dynamic import() with hooks
 * @param specifier file path or package name
 * @param context
 */
export const dynamicImport = async (
    specifier: string,
    context: ResolverContext
): Promise<{
    exports: Record<string, unknown> | undefined;
}> => {
    for (const hook of importHooks) {
        const result = await hook(specifier, context);
        if (result) {
            return result;
        }
    }
    // if the `specifier` is not absolute path, it should be package name
    if (!path.isAbsolute(specifier)) {
        return {
            exports: await import(specifier),
        };
    }
    return {
        exports: await import(convertToFileUrl(specifier)),
    };
};
```

`bun build --compile`するコードに、`@secretlint/resolver`を使って、本来は動的にロードされる`@secretlint/secretlint-rule-preset-recommend`を静的にロードするようなHookを登録しています。
これによって、本来は`import(packageName)`というコードで動的にロードされるパッケージを、`import`文で静的にロードしておくことで、バイナリに動的なパッケージを含めています。

- コード: https://github.com/secretlint/secretlint/blob/8698cc263acc28a38e4bb2f3f4f27b5086669509/publish/binary-compiler/src/secretlint-resolver-hooks.ts

```ts
import * as preset from "@secretlint/secretlint-rule-preset-recommend";
import { registerImportHook, registerResolveHook } from "@secretlint/resolver";

const mocks = {
    "@secretlint/secretlint-rule-preset-recommend": preset,
};
const mockNames = Object.keys(mocks);
const mockNameRegex = new RegExp(`^(?:${mockNames.join("|")})$`);
// preserve mocks module name
// "@secretlint/secretlint-rule-preset-recommend" -> "@secretlint/secretlint-rule-preset-recommend"
// By default, secretlint will resolve it into absolute path, but we want to keep it as is.
registerResolveHook((moduleName) => {
    if (mockNames.includes(moduleName)) {
        return {
            url: moduleName
        };
    }
    return undefined; // pass through
});
// import mock module
// "@secretlint/secretlint-rule-preset-recommend" -> { exports: preset }
registerImportHook(async (moduleName) => {
    if (mockNameRegex.test(moduleName)) {
        return {
            exports: mocks[moduleName as keyof typeof mocks]
        };
    }
    return undefined; // pass through
});
```

あとは、これらのHookを含むコードを`bun build --compile`でビルドするだけで、Single-file executable binaryが作成できます。

- Binary Compiler: https://github.com/secretlint/secretlint/tree/master/publish/binary-compiler

## 他の実装方法

[Secretlint](https://github.com/secretlint/secretlint)では、Bunを使ってSingle-file executable binaryを作成しましたが、他にもいくつかの方法があります。
[Deno](https://deno.com/)にも[`deno compile`](https://docs.deno.com/runtime/reference/cli/compiler/)というコマンドがあり、Denoのコードをバイナリに変換できます。

### Denoでの実装

[`deno compile`](https://docs.deno.com/runtime/reference/cli/compiler/)の場合は、事前に動的にロードされるパッケージをimportしておくだけで、バイナリに含めることができます。

具体的には次のようなコードを書くだけです。

```ts
// preload for embedded binary
// TODO: use local file path instead of npm registry
// https://github.com/denoland/deno/issues/18474
import "npm:@secretlint/secretlint-rule-preset-recommend";
import { cli, run } from "npm:secretlint/cli";
run(cli.input, cli.flags).then(
    ({ exitStatus, stderr, stdout }) => {
        if (stdout) {
            console.log(stdout);
        }
        if (stderr) {
            console.error(stderr);
        }
        Deno.exit(exitStatus);
    },
    (error) => {
        console.error(error);
        Deno.exit(1);
    }
);
```

あとは、`deno compile`でビルドするだけで、Single-file executable binaryが作成できます。

```bash
deno compile --target "x86_64-unknown-linux-gnu" --output dist/secretlint src/entry.ts
```

- `deno compile`での実装: https://github.com/secretlint/secretlint/tree/d23e72dec453dbbdb9a7e0fd58ca56e91af30dcd/publish/binary-compiler

最初はDenoで実装していましたが、この方法にはデメリットがあります。
`npm:` というspecifierを指定してることからもわかるように、npm registryからパッケージをダウンロードしたものをバイナリにしています。

そのため、CIでバイナリをビルドしてそのままテストするには、ローカルのNode.js向けのコードを参照してバイナリにする方法が必要です。
`deno compile`で、ローカルのNode.js向けのパッケージを参照してそれをバイナリにする方法は、試してみましたがよくわかりませんでした。

Denoはnpmのworkspacesもサポートしているので、これを利用するとローカルのNode.js向けのパッケージをDenoで使うことはできます。

- https://docs.deno.com/runtime/fundamentals/workspaces/#migrating-from-npm-workspaces

しかし、`deno compile`したバイナリには、このローカルのNode.js向けのパッケージを含めることができませんでした。

- サンプル: https://github.com/azu/deno-node-workspace-example

また、Denoには必要なAPIがまだ実装されてなかったのもあり、今回はBunを使うことにしました。

- [Implement `PerformanceObserver.observe` from `node:perf_hooks` · Issue #25034 · denoland/deno](https://github.com/denoland/deno/issues/25034)

### Bun Plugin APIでの実装(失敗)

Secretlintの実装では、`@secretlint/resolver`というHookするパッケージを実装しています。
これは内部的なコードだから対応できましたが、外部のパッケージが同じような動的ロードをしている場合は、Hookすることが難しいです。

これを回避するためにBunのPlugin APIを使って、`require.resolve`や`import(name)`をHookする方法を試しましたが、うまくいきませんでした。

- [Plugins – Runtime | Bun Docs](https://bun.sh/docs/runtime/plugins)

`onResolve`で`require.resolve`のパスを書き換えできれば、`@secretlint/resolver`のようなHookを実装できるかと思いましたが、うまくいきませんでした。
Bun Plugin APIの`onResolve`は、拡張子がない識別子を`require.resolve`するときに呼ばれないことがあったり、挙動がイマイチよくわからない感じでした。

```ts
import { plugin, type PluginBuilder } from "bun";

await plugin({
  name: "bun-test",
  target: "bun",
  setup(build: PluginBuilder): void | Promise<void> {
    build.onResolve({ filter: /.*/ }, async (args) => {
      console.log("onResolve", args);
      return args
    });
    build.onLoad({ filter: /.*/ }, async (args) => {
      console.log("onload", args);
      return {
        contents: "console.log('Hello, world!')",
        loader: "ts",
      };
    });
    build.module("rambda", () => {
      console.log("module load");
      return {
        exports: {},
        loader: "object"
      }
    })
  }
});

// resolve existing module
console.group("resolve - existing")
import.meta.resolve("rambda");
console.groupEnd()

// import existing module
console.group("import - existing")
await import("rambda");
console.groupEnd()

// resolve unknown extension module
console.group("resolve - unknown extension")
import.meta.resolve("rambda.ext");
console.groupEnd()

// import unknown extension module
console.group("import - unknown extension")
try {
  await import("rambda.ext");
} catch {
}
console.groupEnd()

// resolve file path
console.group("resolve - file path")
import.meta.resolve("./file-path.js");
console.groupEnd()

// import file path
console.group("import - file path")
try {
  await import("./file-path.js");
} catch {
}
console.groupEnd()
```

実行結果は次のようになります。

```
> bun run entry.ts

resolve - existing
undefined
import - existing
module load
undefined
resolve - unknown extension
onResolve {
  path: "rambda.ext",
  importer: "~/bun-plugin-resolver-test/entry.ts",
}
undefined
import - unknown extension
onResolve {
  path: "rambda.ext",
  importer: "~_bun-plugin-resolver-test/entry.ts",
}
undefined
resolve - file path
undefined
import - file path
onResolve {
  path: "./file-path.js",
  importer: "~/bun-plugin-resolver-test/entry.ts",
}
```

Bun内部の[Loaders](https://bun.sh/docs/bundler/loaders)もこの仕組みで実装しているそうですが、挙動がイマイチよくわからない感じでした。すでに登録されているものがあると、呼ばれないとかそういうことがあったりするのかなと思いました。

## まとめ

Node.jsのツールをSingle-file executable binaryにする方法を紹介しました。
Secretlintでは、Bunを使ってSingle-file executable binaryを作成しています。

CIでSecretlintを実行する場合、起動までの時間が短いとCIのコストも抑えられます。
npmを使ってインストールする方式に比べて、`secretlint`のバイナリ1つで済むので、CIのセットアップ時間が短くなります。
いくつかのプロジェクトで試していた感じでは、CIのトータル時間は大体半分ぐらいになりました(setup時間の方が基本的に長いです)。

動的なパッケージロードするようなツールはちょっと工夫が必要でしたが、それ以外は特に問題なくバイナリにして動作させることができました。

- 実装: [@secretlint/binary-compiler](https://github.com/secretlint/secretlint/tree/master/publish/binary-compiler)

[bluenotiondb](https://github.com/azu/bluenotiondb)でも似た方式でバイナリにして使ってたりするので、Node.jsのツールをバイナリにする選択肢が増えて便利になったと思います。

- [Bluesky/GitHub/Calendar/RSSをNotionに同期するbluenotiondbを作った | Web Scratch](https://efcl.info/2023/09/09/bluenotiondb/)
