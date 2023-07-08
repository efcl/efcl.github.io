---
title: "Cloudflare Pagesの　{name}.pages.dev ドメインに自分だけアクセスできるようにアクセス制限をつける手順"
author: azu
layout: post
date : 2023-07-08T19:32
category: 雑記
tags:
    - Cloudflare

---

Cloudflare Pagesの `{name}.pages.dev` ドメインに自分だけアクセスできるようにアクセス制限をつける手順です。
アプリケーション側の変更は不要で、Cloudflare Accessの機能を使ってアクセス制御ができます。

カスタムドメイン(Cloudflare DNS)を設定している場合の方法は色々ありますが、デフォルトで用意されている `{name}.pages.dev` ドメインに対して設定する手順についてです。

この手順がかなりややこしいので、設定方法メモ書きです。

## プレビューブランチへのアクセス制御の有効化手順

1. Cloudflare Pagesでページを作る
2. Settings -> Access policyでEnable access policyをONにする

これで、`*.{name}.pages.dev` に対するアクセス制御が有効化されます。
`*.{name}.pages.dev`となっていることからも分かるように、これはプレビューブランチに対する制御だけしかできていません。

`https://{name}.pages.dev` にアクセスした際にもアクセス制御をかけたい場合は、Zero Trust画面で別途設定する必要があります。

## メインドメインへのアクセス制御の有効化手順

`{name}.pages.dev`に対してアクセス制御を有効化する手順です。

1. Settings -> Access policyのManage PoliciesポリシーからAccess/Applicationsのページへ移動する
    - `https://one.dash.cloudflare.com/{id}/access/apps` のようなURLです
    - ![Zero Trust List](https://efcl.info/wp-content/uploads/2023/07/08-1688812728.png)
    - 先ほど追加された`*.{name}.pages.dev`のポリシーがあるのを確認できます
2. `*.{name}.pages.dev`の右にある … から　Configureをクリックする
    - ⚠️ Add an applicationからは`{name}.pages.dev`に対するポリシーは追加できません
3. Overviewのタブを開く
4. Domain(Required)となっているところで `{name}.pages.dev` を選択する
    - Subdomainのところは何も入れなくて問題ありません
    - 他の設定をいじるときも毎回このDomainを選択する必要があります
    - ![Application](https://efcl.info/wp-content/uploads/2023/07/08-1688813031.png)
5. Saveをクリックする

こうすると、`*.{name}.pages.dev` ではなく `{name}.pages.dev` に対するアクセス制御が有効化されます。
上書き保存してしまったことで、`*.{name}.pages.dev` のポリシーは消えています。

もう一度Cloudflare PagesのSettings -> Access policyでEnable access policyをONにすると、
`*.{name}.pages.dev`と`{name}.pages.dev`の2つのポリシーが作成できます。

なんでこうなってるのかはよくわかりません。

Cloudflare Pagesにカスタムドメインを設定する場合は、さらにはまりどころがあるので、次の記事を参照してください。

- [Cloudflare Pages のドメイン *.pages.dev にアクセス制限をかける | DevelopersIO](https://dev.classmethod.jp/articles/cloudflare-pages-access/)

## アクセス制御のIdentity Providerを設定する

ここまで設定して、`{name}.pages.dev` にアクセスすると、Cloudflareが用意したログイン画面が表示されるようになります。
デフォルトではCloudflareのメンバーのメールアドレスに対する認証コードを飛ばすことで、アプリケーションにアクセスできるという制限になっているはずです。

Cloudflare Zero Trust で Identity Provider を設定することで、設定されたGoogleアカウントでログインした時のみページが見れるようになるといったアクセス制御を設定できます。

- [Cloudflare Zero Trust で Identity Provider](https://egashira.dev/blog/uses-google-oauth-for-cloudflare-pages)

記事を参考にIdentity Providerを作成したら、先ほど作成した、`*.{name}.pages.dev` と `{name}.pages.dev`のポリシーにどのIdentity Providerを使うかを設定します。

0. Access/Applicationsのページへ移動する
1. ポリシーの一覧から `{name}.pages.dev` の右側にある … からConfigureを開く
2. Authenticationのタブを開く
3. 作成したIdentity Providerあるので、チェックを入れる
  - 使うIdentity Providerを複数にしたり、どれか一つにしたりできます
  - ⚠️ この状態では保存できないので、次のステップへ
  - ![Authentication](https://efcl.info/wp-content/uploads/2023/07/08-1688813931.png)
4. Overviewのタブを開く
5. 再び Domain(Required)となっているところで `{name}.pages.dev` を選択する
6. Saveをクリックする

なぜか Domain(Required)を選択しないと、Authenticationのタブでチェックを入れても保存できないので、このような手順になっています。
`*.{name}.pages.dev` に関しても、同じ手順(subdomainに `*` を入れる)で設定できます。

## まとめ

Cloudflare Pagesの`{name}.pages.dev`に対して、Cloudflare Accessを使ってアクセス制御を設定する手順を書きました。
この方法がいいところは、アプリケーションのコードを変更する必要がないことです。
雑な自分用のアプリケーションなどをCloudflare Pages(Cloudflare Workers)で動かす場合は、この方法で十分だと思います。

`{name}.pages.dev` のCloudflareが用意してるURLに対して設定する方法がかなり難解なので、メモ書きとして残しておきました。