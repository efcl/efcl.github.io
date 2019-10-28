---
title: "Service Workerが更新されたことを通知する更新ダイアログを出すライブラリを書いた"
author: azu
layout: post
date : 2019-10-28T09:17
category: JavaScript
tags:
    - JavaScript
    - Browser
    - ServiceWorker

---

[service-worker-updatefound-refresh-dialog](https://github.com/azu/service-worker-updatefound-refresh-dialog)という読み込むだけで、よくみるService Workerの更新ダイアログを出すライブラリを書きました。

ロードすると、Service Workerが更新されたときにページをリロードするための更新ダイアログを出すだけのライブラリです。

[![service-worker-updatefound-refresh-dialog](https://efcl.info/wp-content/uploads/2019/10/28-1572222073.png)](https://github.com/azu/service-worker-updatefound-refresh-dialog)

## 使い方

ページとService Worker内の2箇所でそれぞれスクリプトをロードする必要があります。

- Page: `index.html`
- Service Worker: `sw.js`

[UNPKG](https://unpkg.com/)を経由して、スクリプトを配布していますが最新のバージョンはREADMEを参照してください。

- [azu/service-worker-updatefound-refresh-dialog: A library show refresh dialog/banner when the service worker found updated.](https://github.com/azu/service-worker-updatefound-refresh-dialog)


`index.html`では次のようにスクリプトを読み込み、`serviceWorkerUpdatefoundRefreshDialog.register(registration);`で処理を登録します。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example</title>
</head>
<body>
<script src="https://unpkg.com/service-worker-updatefound-refresh-dialog@1.1.0/dist/service-worker-updatefound-refresh-dialog.umd.js"></script>
<script>
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                serviceWorkerUpdatefoundRefreshDialog.register(registration);
            });
    });
</script>
</body>
</html>
```

`sw.js`(Service Workerスクリプト)からは`importScripts`を使って、Worker内で動くスクリプトを読み込みます。
(URLはどっちも同じです)

```js
// sw.js
importScripts("https://unpkg.com/service-worker-updatefound-refresh-dialog@1.1.0/dist/service-worker-updatefound-refresh-dialog.umd.js");
```

あとは、Service Workerが更新されたらときに、自動的にページ内に更新用のダイアログが表示されます。

## 設定

- `message`: 表示するメッセージ
- `onClick`: ダイアログをクリックしたときの処理
- `forceUpdate`: デバッグ用、強制的にUIをだす

カスタムメッセージの例

```js
window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            serviceWorkerUpdatefoundRefreshDialog.register(registration, {
                message: "Custom Message"
            });
        });
});
```

## スタイル

スタイルはCSSの[カスタムプロパティ](https://developer.mozilla.org/ja/docs/Web/CSS/--*)を使って外から指定できるようになっています。

```
:root {
  min-width: var(--sw-updatefound-refresh-dialog--min-width, 250px);
  color: var(--sw-updatefound-refresh-dialog--color, #fff);
  background-color: var(--sw-updatefound-refresh-dialog--background-color, #333);
  text-align: var(--sw-updatefound-refresh-dialog--text-align, center);
  border-radius: var(--sw-updatefound-refresh-dialog--border-radius, 2px);
  padding: var(--sw-updatefound-refresh-dialog--padding, 16px);
  position: var(--sw-updatefound-refresh-dialog--position, fixed);
  z-index: var(--sw-updatefound-refresh-dialog--z-index, 1);
  left: var(--sw-updatefound-refresh-dialog--left, initial);
  right: var(--sw-updatefound-refresh-dialog--right, 5%);
  top: var(--sw-updatefound-refresh-dialog--top, initial);
  bottom: var(--sw-updatefound-refresh-dialog--bottom, 30px);
}
```

次のように、スタイルタグで定義を追加すれば、それが優先して使われます。

```html
<style>
    :root {
        --sw-updatefound-refresh-dialog--left: 0;
    }
</style>
```

## 作った経緯

[VuePress](https://vuepress.vuejs.org/)とかでも見る典型的な更新ダイアログを実装してみたくて作って見ました。

実装は以下を参考にしています。

* [deanhume/pwa-update-available: Service Workers - New Update Available sample](https://github.com/deanhume/pwa-update-available)
* [How to display a "new version available" of your Progressive Web App](https://deanhume.com/displaying-a-new-version-available-progressive-web-app/)

これだけのライブラリでも結構Service Workerのライフサイクルを理解しないと上手く動かない感じでした。

* [Understanding service worker life cycle - Vipul Nema - Medium](https://medium.com/@vipulnema2610/understanding-service-worker-life-cycle-b6580aa4eb50)
* [Service Worker Lifecycle](http://slides.com/laco/2017-09-14_sw-lifecycle#/)
* [中級者向け Service Worker Tutorial | blog.jxck.io](https://blog.jxck.io/entries/2016-04-24/service-worker-tutorial.html)

Service Workerのテストは[Cypress](https://www.cypress.io/)を使ってE2Eテスト的に書いています。

- <https://github.com/azu/service-worker-updatefound-refresh-dialog/blob/master/cypress/integration/service-worker-updatefound-refresh-dialog_spec.js>

CypressはElectronとChromeを選択できますが、Electronだと上手く動かなくてChromeを使った気がします。
実際にページにアクセスしてunregister -> registerしたりする感じで動かしています。

Service Workerを扱うときは[Workbox](https://developers.google.com/web/tools/workbox)を使うことが多いですが、こういうライブラリを書いてみると学びがある気がします。

- [azu/service-worker-updatefound-refresh-dialog: A library show refresh dialog/banner when the service worker found updated.](https://github.com/azu/service-worker-updatefound-refresh-dialog)