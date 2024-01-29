---
title: "textlint week: 2024-01-29 〜 2024-02-04"
author: azu
layout: post
date : 2024-01-29T22:24
category: textlint
tags:
    - textlint

---

今週は、textlintの開発に集中する textlint week です。
目標としては次のメージャーバージョンであるv14をリリースすることです。

- [v14 roadmap · Issue #1200 · textlint/textlint](https://github.com/textlint/textlint/issues/1200)

v14では、今後に向けて古いAPIに非推奨のメッセージを出すことや、使われなくなってるオプションなどを削除するといった変更を入れる予定です。これに合わせて不要な依存などを減らしていっています。そのため、ほとんどのユーザーには特に影響はないと思います。

textlint weekで時間があれば、次のようなことをやっていきたいです。

- Office Hoursをやる?
- editorのアップデート?
- [process.emitWarning(warning[, options])](https://nodejs.org/api/process.html#processemitwarningwarning-options)を使った非推奨アプローチについての記事を書く

v14のリリース後に新しい機能改善などもしていきたいので、フィードバックをお待ちしています。
[次のフォーム](https://tally.so/r/w2P92M)からフィードバックを送ることができるので、是非お願いします！

<iframe data-tally-src="https://tally.so/embed/w2P92M?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="1631" frameborder="0" marginheight="0" marginwidth="0" title="textlint Feedback"></iframe><script>var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}</script>

## textlint notes

📝 Maintainer Month: なぜtextlintを作ったか
- https://efcl.info/2022/06/29/why-create-textlint/

💖 textlintをサポートしてくれる方を募集しています
- https://github.com/sponsors/azu

🔑 textlintのcontributorは 1Password を無料で利用できます
- https://efcl.info/2022/09/23/1password-teams-open-source/