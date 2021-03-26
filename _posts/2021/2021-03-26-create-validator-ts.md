---
title: "TypeScriptの型定義からバリデーションコードを生成するツールを書いた"
author: azu
layout: post
date : 2021-03-26T08:57
category: JavaScript
tags:
    - TypeScript
    - Validation

---

[create-validator-ts](https://github.com/azu/create-validator-ts)というTypeScriptの型定義からJSON Schemaを使ったバリデーションコードを生成するツールを書きました。

## モチベーション

expressなどでAPIを書くときに、Request/Responseが意図したものかどうかをバリデーションする必要があります。
特に`req.query`などはStringが入ると予想しますが、オブジェクトが入ってくることもあります。
これは、expressの内部で使っている[qs](https://github.com/ljharb/qs)というURLクエリのパーサが、オブジェクトや配列へ展開する機能を持っているためです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">expressを使ってるサイトは<br><br>?q=text<br>があるときに<br><br>req.query.q <br><br>には オブジェクトが入る可能性をちゃんと考慮しないといけない。<br><br>?q[a]=text<br><br>で<br><br>req.query.q ; // { a: &quot;text&quot; } <br><br>になる</p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1373659055953117187?ref_src=twsrc%5Etfw">March 21, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

また、Node.jsではMongoDBやORMマッパーを使うことが多いです。
このようなDB/KVS周りのライブラリはだいたいクエリにJavaScriptのオブジェクトを指定できます。
このとき、`req.query`などをなにもチェックせずに、クエリのオブジェクトに渡すと[NoSQL Injection](https://owasp.org/www-pdf-archive/GOD16-NOSQL.pdf)という脆弱性を発生させやすいです。

### NoSQL Injection: MongoDB

[Mongoose](https://github.com/Automattic/mongoose)を使ったNoSQL Injectionを例に説明してみます。
これはユーザーのリクエストに基づいてMongoに対してQueryを発行する時に、ユーザーが任意のMongo Queryを指定できてしまう問題です。

次のようにHTTPリクエストのbodyをそのままMongooseのqueryに渡すと発生する脆弱性です。
`req.body.password`は文字列を期待しているが、実際にはオブジェクトを渡すことができて、オブジェクトを指定できるとMongo queryの`$ne`などの演算子も指定できてしまう問題です。

```js
app.post('/user', function (req, res) {
    const query = {
        username: req.body.username,
        password: req.body.password
    }
    db.collection('users').findOne(query, function (err, user) {
        console.log(user);
    });
});
```

このようなコードが動いている場合、次のような`$ne`を使ったリクエストをbodyを指定すれば、queryはなにか一つにマッチします。
[`$ne`](https://docs.mongodb.com/manual/reference/operator/query/ne/)はマッチしないという意味の演算子なので、nullにマッチしない = なにか一つのモデルが取れるため、実在するユーザー名やパスワードを知らなくても、、任意の`user`モデルが取得できてしまいます。

```
{
    "username": {"$ne": null},
    "password": {"$ne": null}
}
```

このようなNoSQL Injection/Mongo Query Injectionはexpress + ORMマッパーの組み合わせて特に起きやすい問題です。
これは、`req.body`だけではなく、`req.query`でも同様に発生します。

次のような`req.query`を参照する`/check`というGET APIがある場合に、`req.query.user`や`req.query.password`にもオブジェクトを渡せます。

```js
import express from "express";

const app = express();
const port = 3000;

// → http://localhost:3000/check?username[$ne]=0&password[$ne]=0
app.get("/check", (req) => {
    console.log(req.query); // { 'username': { '$ne': '0' }, password: { '$ne': '0' } }
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
```

expressでは、`?username[$ne]=0&password[$ne]=0` のようなURLパラメータを渡すと、JSONオブジェクトとして`req.query`に渡されます。
これらの`req.*`として受け取ったオブジェクトをMongoDBに対してクエリとして渡すことでMongo Query Injectionが発生します。

- [Testing for NoSQL Injection](https://github.com/OWASP/wstg/blob/v4.2/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05.6-Testing_for_NoSQL_Injection.md)
- [PayloadsAllTheThings/NoSQL Injection at master · swisskyrepo/PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/NoSQL%20Injection)


## [全体的な対策] expressでリクエストを受け付けた段階での `$` と `.` の削除

Mongoのクエリでは`$`と`.`が特殊な意味を持ちます。
これらの文字列が含まれるリクエストを強制的に排除することで、[Mongoのクエリとして特殊な意味をもつOperator](https://docs.mongodb.com/manual/reference/operator/query/)をInjection攻撃に利用できなくなります。(Injection自体が防げるわけではない)
そのため、リクエストのオブジェクトから 次のパターンにマッチするものを強制的に削除することで、Mongo Query Injectionへの段階的な防御策となります。
(ただ実際のリクエストで使っている場合は壊れるのでできません)

- プロパティ名が `$` から始まるプロパティ
-  `.` をプロパティ名に含むプロパテ

[express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize)というmiddlewareでは、次の`req.*`に含まれる `$` と `.` を含むプロパティを削除できます。

- `req.params`
- `req.body`
- `req.headers`
- `req.query`

しかし、この対策ではあくまでMongoクエリとして特殊な意味を持つクエリを通さなくなるだけであるため、Query Injection自体への対策にはなりません。(あくまで軽減策の一種であるということ)
Query Injection自体は、APIリクエストのバリデーションを組み合わせて対応する必要があります。

## APIのバリデーションをする

この問題に対する正攻法はAPI(expressのrouting)で`req.*`が意図したリクエストなのかをバリデーションすることです。
NoSQL Injectionは、stringだと思っていた箇所にobjectが入ることで発生しやすいという話でした。
そのため、型のチェックだけでもある程度バリデーションは効果があります。(アクセス制御などは別途仕組みがあるとした場合)

バリデーションにはスキーマファイルを使うものとコードとして書くものがあります。

- JSON Schema + [Ajv](https://github.com/ajv-validator/ajv)
- [Yup](https://github.com/jquense/yup)、[myzod](https://github.com/davidmdm/myzod)、[Zod](https://github.com/colinhacks/zod)、[joi.dev](https://joi.dev/)

TypeScriptでコードベースを書いている場合に、JSON Schemaは手書きしたくないし、バリデーションライブラリは定番が難しいという問題がありました。
そのため、TypeScriptの型定義を書いて、その型定義からバリデーションコードを生成することで大雑把な型チェックをするバリデーションをすることにしました。

- [azu/create-validator-ts: Create JSON Schema validator from TypeScript.](https://github.com/azu/create-validator-ts)

TypeScriptの型には数値の範囲や正規表現などはないためバリデーションライブラリに比べると扱える範囲は狭いです。
しかし、stringだと思っていた箇所にobjectが入るという問題はTypeScriptの型情報だけでも十分バリデーションできます。

## [create-validator-ts](https://github.com/azu/create-validator-ts)

[create-validator-ts](https://github.com/azu/create-validator-ts)は、TypeScriptの型定義からJSON Schemaと[Ajv](https://github.com/ajv-validator/ajv)を使ったバリデーションコードを生成するツールです。
生成するバリデーションコード自体は自由にカスタマイズできるので、プロジェクトごとに生成するコードは変更できます。

### 使い方

[create-validator-ts](https://github.com/azu/create-validator-ts)は、単純さを意識作っているので動作もシンプルです。
次のようなファイル構造があるとします。

```
.
└── src/
    ├── hello/
    │   ├── api-types.ts
    │   └── index.ts
    └── status/
        ├── api-types.ts
        └── index.ts
```

このときに、`create-validator-ts`を`api-types.ts`というファイル名を対象にして実行します。(ファイル名は任意のglobで指定できます)

```
$ create-validator-ts "src/**/api-types.ts"
```

この結果、それぞれの`api-types.ts`に対応する`api-types.validator.ts`というファイルが生成されます。

```
.
└── src/
    ├── hello/
    │   ├── api-types.ts
    │   ├── api-types.validator.ts <- Generated
    │   └── index.ts
    └── status/
        ├── api-types.ts
        ├── api-types.validator.ts <- Generated
        └── index.ts
```

### バリデーションのコード

デフォルトのコードジェネレーターでは、`api-types.ts`に対して生成される`api-types.validator.ts`は次のようなコードです。

`api-types.ts`:

```ts
// Example api-types
// GET /api
export type GetAPIRequestQuery = {
    id: string;
};
export type GetAPIResponseBody = {
    ok: boolean;
};
```

`api-types.validator.ts` (generated):

```ts
// @ts-nocheck
// eslint-disable
// This file is generated by create-validator-ts
import Ajv from 'ajv';
import * as apiTypes from './api-types';

const SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "GetAPIRequestQuery": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                }
            },
            "required": [
                "id"
            ],
            "additionalProperties": false
        },
        "GetAPIResponseBody": {
            "type": "object",
            "properties": {
                "ok": {
                    "type": "boolean"
                }
            },
            "required": [
                "ok"
            ],
            "additionalProperties": false
        }
    }
};
const ajv = new Ajv({ removeAdditional: true }).addSchema(SCHEMA, "SCHEMA");
export function validateGetAPIRequestQuery(payload: unknown): apiTypes.GetAPIRequestQuery {
  if (!isGetAPIRequestQuery(payload)) {
  　const error = new Error('invalid payload: GetAPIRequestQuery');
    error.name = "ValidatorError";
    throw error;
  }
  return payload;
}

export function isGetAPIRequestQuery(payload: unknown): payload is apiTypes.GetAPIRequestQuery {
  /** Schema is defined in {@link SCHEMA.definitions.GetAPIRequestQuery } **/
  const ajvValidate = ajv.compile({ "$ref": "SCHEMA#/definitions/GetAPIRequestQuery" });
  return ajvValidate(payload);
}

export function validateGetAPIResponseBody(payload: unknown): apiTypes.GetAPIResponseBody {
  if (!isGetAPIResponseBody(payload)) {
  　const error = new Error('invalid payload: GetAPIResponseBody');
    error.name = "ValidatorError";
    throw error;
  }
  return payload;
}

export function isGetAPIResponseBody(payload: unknown): payload is apiTypes.GetAPIResponseBody {
  /** Schema is defined in {@link SCHEMA.definitions.GetAPIResponseBody } **/
  const ajvValidate = ajv.compile({ "$ref": "SCHEMA#/definitions/GetAPIResponseBody" });
  return ajvValidate(payload);
}
```

この生成するコードは、`--generatorScript`で任意のジェネレーターを定義できます。

```
$ create-validator-ts "src/**/api-types.ts" --generatorScript ./custom.js
```

express middlewareとかも書こうと思えば生成できると思うので、その辺興味ある人は次のIssueを見てみてください。

- [Code Generator Package · Issue #2 · azu/create-validator-ts](https://github.com/azu/create-validator-ts/issues/2)


📝 生成するコードはフォーマットが多少崩れてるので、`.prettierignore`で無視するかコード生成の時点でprettierしてまうのを推奨です。

```
*.validator.ts
```

📝 Tips: 型定義と実装は分離するのを推奨

[create-validator-ts](https://github.com/azu/create-validator-ts)は、TypeScriptの型定義からJSON Schemaを生成するために[ts-json-schema-generator](https://github.com/vega/ts-json-schema-generator)を使っています。
どうしても複雑なTypeScriptのコードからJSON Schemaを生成すると時間がかかったり、パースに失敗するケースがあります。(パースの失敗はかなりレアな感じなぐらいには安定している)

`api-types.ts` のように型定義だけをファイルとして分けているのは、このような問題を避けやすくするためですです。
TypeScriptの実装を含むコードからもJSON Schemaを生成はできますが、基本的には型だけをファイルとして分けることを推奨しています。

これは、型だけを分けておけば`import type` を使ってサーバのReqest/Responseの型定義をクライアントサイドからも利用できためです。

たとえば、[philan.net](https://philan.net/)ではNext.jsを使って書いていて、Next.jsのAPIには[create-validator-ts](https://github.com/azu/create-validator-ts)を利用しています。

```
.
├── api-types.ts
├── api-types.validator.ts
├── create.ts
├── get.ts
├── list.ts
└── update.ts
```

- [philan.net/web/pages/api/user at main · azu/philan.net](https://github.com/azu/philan.net/tree/main/web/pages/api/user)
    - サーバのAPI側のコード(user)

このときに、[`api-types.ts`](https://github.com/azu/philan.net/blob/main/web/pages/api/user/api-types.ts)という型定義にリクエストとレスポンスの型を書いています。
サーバ側のAPIでは、`api-types.ts`の型定義と生成した[api-types.validator.ts](https://github.com/azu/philan.net/blob/main/web/pages/api/user/api-types.validator.ts)のバリデーションコードを利用しています。

一方で、このAPIを叩くクライアントサイドからも`api-types.ts`の型定義を共有して利用しています。
[Type-Only Imports and Export](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html)を使えば、間違ってサーバのコードをクライアントにbundleすることなく、型だけを参照できるので便利です。

```ts
import type { GetUserResponseBody, UserResponseObject } from "../pages/api/user/api-types";
```

- <https://github.com/azu/philan.net/blob/62aba2320917f92f53f590bb353390c23607afee/web/components/useLoginUser.tsx#L2-L13>
    - フロントからAPIのレスポンスの型を`import type`で参照しているコード

## コード生成のチェック

[create-validator-ts](https://github.com/azu/create-validator-ts)では、TypeScriptからJSON Schemaを使ったバリデーションコードを生成していますが、コードジェネレーターには欠点があります。
コードジェネレーターはコードを生成しないといけないので、TypeScriptの型定義を変更したらコードを生成する必要があるという点です。

生成したコードをGitで管理している場合は、場合によっては生成し忘れて差分が出てしまうかもしれません。
そのようなケースを避けるために[create-validator-ts](https://github.com/azu/create-validator-ts)では、`--check`というフラグで差分があるかをチェックできます。
これをCIで回せば差分がでるという問題は起きなくなります。(差分がでたら再生成すれば良いだけです)

```
$ create-validator-ts "src/**/api-types.ts" --check
# $? → 0 or 1
```

あとはコミット時に生成し直すなども入れれば、差分はかなり出にくくなるかもしれません。

- [Add recipe for commit hooks · Issue #4 · azu/create-validator-ts](https://github.com/azu/create-validator-ts/issues/4)

また、`--watch`フラグで変更があるたびに自動生成もできます。

## おわりに

[create-validator-ts](https://github.com/azu/create-validator-ts)というTypeScriptの型からバリデーションを生成するツールを作りました。
TypeScript → JSON Schemaの発想自体は[何年も前](https://twitter.com/azu_re/status/1139869643055566853)から持っていましたが、生成したコードも管理しないといけないのがイケてない点なのも分かっていました。
コードを生成することで差分が生まれやすい問題は`--check`でのチェックなどを導入して軽減しています。

別のアプローチとしては、[tRPC](https://trpc.io/)では[Yup](https://github.com/jquense/yup)、[myzod](https://github.com/davidmdm/myzod)、[Zod](https://github.com/colinhacks/zod)などを使ってバリデーションを書くことで、コード生成をしないですむアプローチを選んでいます。

- [Further Reading | tRPC](https://trpc.io/docs/further-reading)

また、[ts-transformer-ajv](https://github.com/roziscoding/ts-transformer-ajv)は[create-validator-ts](https://github.com/azu/create-validator-ts)と似たアプローチですが、[ttypescript](https://www.npmjs.com/package/ttypescript)のtrasnsformプラグインとしてTypeScriptの変換時にバリデーションコードを生成しています。
(このtransformの仕組みが公式じゃないので、[create-validator-ts](https://github.com/azu/create-validator-ts)ではこのアプローチを取らなかった)

[create-validator-ts](https://github.com/azu/create-validator-ts)のアプローチもまだ完璧ではないですが、
`api-types.ts`のような型定義を持っておくこと自体は別のアプローチになった場合も移行しやすかなと思ってこのようなツールを作りました。