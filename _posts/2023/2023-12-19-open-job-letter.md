---
title: "Open Job Letterを公開しました"
author: azu
layout: post
date : 2023-12-19T19:23
category: 雑記
tags:
    - 仕事

---

転職活動を始めたので、Open Job Letterを公開しました。

- [Open Job Letter v2][]

直近は何をしてたか、転職活動の目的、何ができそうかなどをまとめています。
ページの最下部にあるフォームから連絡できるので、興味がある方はよろしくお願いします。

## Open Job Letterとは

Open Job Letterは、いわゆる求職記事のことで、転職活動の目的や自分自身を紹介する記事です。
この名前は自分が適当に決めたものなので、一般的な名前ではありません。
要約をしてないフリーフォーマットのカバーレター/レジュメみたいなイメージです。

2018年に[Open Job Letter](https://github.com/azu/open-job-letter)を公開してたので、
今回は便宜上[Open Job Letter v2][]としています。

Openとついてるのは、Publicに公開しているためです。
Publicにしているのは、いくつか理由があります。

- オープンソース活動などもしているので、Publicの方が一貫性がある気がした
- 公開を前提に書くことで、公平性を持って書きやすい
- URLでアクセスできるので、使いやすくて便利

自分は所属とかは特に公開しないタイプなので、読むとわかりますが会社名とかは特に出さないで抽象化して書いています。
これはブログ書く時とかもそうですが、ある程度抽象化した方が読みやすいし、自分にとっては自然なのでそうしています。
面談とかでは、もっと具体的な話をするので、公開する文章としてはそういうスタイルをとっています。

## Open Job Letterの作り方

今回の[Open Job Letter v2][]は、[Notion](https://www.notion.so/)と[Tally](https://tally.so/dashboard)というフォームサービスを使って作成しています。
TallyはNotionのページに埋め込みやすいGoogle Form的なサービスです。ConditionなどのロジックやNotionに結果を送る機能があるので、Notionと相性が良いです。

次のページに、今回のOpen Job Letterのテンプレートを公開しています。

- <https://www.notion.so/efcl/Open-Job-Letter-Template-65257f3bdf674e43b88bcba434d35229?pvs=4>

Open Job Letterは、次の3つで構成されています。

1. Open Job Letter本体
2. Tallyで作成したフィードバックフォーム
3. Tallyの結果を入れるデータベース

### 使い方

1. [Notionテンプレート](https://www.notion.so/efcl/Open-Job-Letter-Template-65257f3bdf674e43b88bcba434d35229?pvs=4)を複製
2. Open Job Letterを書く
3. Tallyのテンプレートを複製
    - https://tally.so/templates/open-job-letter/m6ePAn のフォームをテンプレートとして利用できる
4. TallyのフォームをOpen Job LetterにEmbedする
5. Tally → NotionのIntegrationを設定する
    - 参考: [Sync form responses to Notion](https://tally.so/help/notion-integration)
    - Tallyの回答内容をデータベースのプロパティに紐づける

あとは、Open Job Letterのページだけを公開すれば完成です。

自分の場合は、SEO的なことは特に気にしてなかったので、`<user>.notion.site`で公開しています。
ちゃんとしたい場合は、静的サイトとして公開できるサービスを使うと良いと思います。

- [Super — Create Websites with Notion](https://super.so/)
- [Notionに書くだけでWebサイトが作れるWraptas](https://wraptas.com/)

`notion.site`はSSRをちゃんとやってくれないので、`<title>`やOGPなどの情報がちゃんと出ません。
また、アーカイブ系のサービスやはてなブックマークなどは`<meta>`を参照する機能があるので、`notion.site`だとこういうのは制御できません。

- [web.archive.org からサイトを除外する(令和最新版)](https://zenn.dev/okuoku/articles/c86a3278ed7648)
- [コメント一覧非表示機能について - はてなブックマークヘルプ](https://b.hatena.ne.jp/help/entry/nocomment)

### 書き方

[Open Job Letterのサンプルページ](https://efcl.notion.site/Open-Job-Letter-8eee13916cfd48d09e7c38eab5ec4604)に書くことを空欄で用意しているので、基本的にはそれを書いていくだけです。ただ、ちゃんとやるとかなり大変なので、目的に合わせて項目は調整してください。

"提供できる価値"という4つの項目からなるテーブルは、やりたい方向性を整理する場所としておいています。
これ自体は、自分用のメモでもあるので、別に公開する必要はないと思います。自分の場合は、素直に書くことを優先してそのまま公開しました。

- ターゲット: 想定している企業
- ターゲットの需要: 想定している企業が求めているニーズ(想像)
- 私が提供できる価値:  企業へ提供できそうな価値、強み
- 私が期待すること(見返り): 企業に期待する見返り

この項目の元ネタは[ストラテジック・キャリア](https://presidentstore.jp/category/BOOKS/002186.html)という本です。
PVP(Personal Value Proposition)をベースにして、自分が提供できそうな価値をターゲットごとに並べて書きます。
この本自体は、そこまで分かりやすくはないので、次のIndeedの記事の方がわかりやすいかもしれません。

- [Personal Value Proposition: Definition, Template and Example | Indeed.com](https://www.indeed.com/career-advice/finding-a-job/personal-value-proposition)

スキルマップは、Mermaidの[Quadrant Chart](https://mermaid.js.org/syntax/quadrantChart.html)を使って、Notionのテーブルから半自動で生成できるようにしています。

1. スキルマップテーブルにデータを入れていく
2. スキルマップMermaidテーブルの"Mermaid構文"にquadrantChart内容ができるのでコピー
3. `mermaid`ブロックに貼り付ける

そうすると、できない ↔ できる 、嫌い ↔ 好きの４象限のスキルマップが自動で生成されます。

![スキルマップ](https://efcl.info/wp-content/uploads/2023/12/19-1702984635.png)

これを自動生成しつつ、点ができるだけ重ならないようにするために、かなり無理したformulaを書いています。
Notionのformulaにはループがないので、10段階にするために10回書いています。
点が重なった場合は手動で調整してください。

```js
"%%{init: {\"quadrantChart\": {\"quadrantPadding\": 40, \"chartWidth\": 800, \"chartHeight\": 800 }, \"themeVariables\": {\"quadrant1Fill\": \"#E18841\", \"quadrant1TextFill\": \"#ffffff\", \"quadrant3Fill\": \"#4169e1\", \"quadrant3TextFill\": \"#ffffff\"} }}%%"+" \n" +
"quadrantChart" + "\n" +
"  title スキルマトリクス" + "\n" +
"  x-axis \"嫌い\" --> \"好き\"" + "\n" +
"  y-axis \"できない\" --> \"できる\"" + "\n" +
"  quadrant-1 \"Ⅰ：好きかつ得意\"" + "\n" +
"  quadrant-2 \"Ⅲ：好きではないが得意\"" + "\n" +
"  quadrant-3 \"Ⅳ：好きでも得意でもない\"" + "\n" +
"  quadrant-4 \"Ⅱ：好きだができない\"" + "\n" + 
join(map(filter(prop("スキルマップ"), current.prop("できる(10段階)") ==10), "\"" + current.prop("名前") +"\"" + ":[" + max((current.prop("好き(10段階)") - (index /1)) / 10, 0) + "," + max((current.prop("できる(10段階)") - (index /1)) / 10, 0) +"]"), "\n") + "\n" +
join(map(filter(prop("スキルマップ"), current.prop("できる(10段階)") == 9), "\"" + current.prop("名前") +"\"" + ":[" + min((current.prop("好き(10段階)") + (index /2)) / 10, 1) + "," + min((current.prop("できる(10段階)") + (index /2)) / 10, 1) +"]"), "\n") + "\n" +
join(map(filter(prop("スキルマップ"), current.prop("できる(10段階)") == 8), "\"" + current.prop("名前") +"\"" + ":[" + max((current.prop("好き(10段階)") - (index /3)) / 10, 0) + "," + max((current.prop("できる(10段階)") - (index /3)) / 10, 0) +"]"), "\n") + "\n" +
join(map(filter(prop("スキルマップ"), current.prop("できる(10段階)") == 7), "\"" + current.prop("名前") +"\"" + ":[" + min((current.prop("好き(10段階)") + (index /4)) / 10, 1) + "," + min((current.prop("できる(10段階)") + (index /4)) / 10, 1) +"]"), "\n") + "\n" +
join(map(filter(prop("スキルマップ"), current.prop("できる(10段階)") == 6), "\"" + current.prop("名前") +"\"" + ":[" + max((current.prop("好き(10段階)") - (index /5)) / 10, 0) + "," + max((current.prop("できる(10段階)") - (index /5)) / 10, 0) +"]"), "\n") + "\n" +
join(map(filter(prop("スキルマップ"), current.prop("できる(10段階)") == 5), "\"" + current.prop("名前") +"\"" + ":[" + min((current.prop("好き(10段階)") + (index /6)) / 10, 1) + "," + min((current.prop("できる(10段階)") + (index /6)) / 10, 1) +"]"), "\n") + "\n" +
join(map(filter(prop("スキルマップ"), current.prop("できる(10段階)") == 4), "\"" + current.prop("名前") +"\"" + ":[" + max((current.prop("好き(10段階)") - (index /7)) / 10, 0) + "," + max((current.prop("できる(10段階)") - (index /7)) / 10, 0) +"]"), "\n") + "\n" +
join(map(filter(prop("スキルマップ"), current.prop("できる(10段階)") == 3), "\"" + current.prop("名前") +"\"" + ":[" + min((current.prop("好き(10段階)") + (index /8)) / 10, 1) + "," + min((current.prop("できる(10段階)") + (index /8)) / 10, 1) +"]"), "\n") + "\n" +
join(map(filter(prop("スキルマップ"), current.prop("できる(10段階)") == 2), "\"" + current.prop("名前") +"\"" + ":[" + max((current.prop("好き(10段階)") - (index /9)) / 10, 0) + "," + max((current.prop("できる(10段階)") - (index /9)) / 10, 0) +"]"), "\n") + "\n" +
join(map(filter(prop("スキルマップ"), current.prop("できる(10段階)") == 1), "\"" + current.prop("名前") +"\"" + ":[" + min((current.prop("好き(10段階)") + (index /10)) / 10, 1) + "," + min((current.prop("できる(10段階)") + (index /10)) / 10, 1) +"]"), "\n")
```

### 運用の仕方

フォームで送信された内容は、Notionのデータベースに保存されるので、そこから確認できます。
[Tally](https://tally.so/dashboard)自体には返信する機能がないのがいまいちですが、Notionのデータベースにメールアドレスが入っているので、そこから連絡することができます。
(ここをもっといい感じにできるウェブサービスがあると良さそう)

また、Notionだとゲストとしてアクセス権限を絞ったりできるので、一部のページだけを特定の人に公開とかもできます。

- [Notion (ノーション)の料金プラン： フリー、プラス、ビジネス、エンタープライズ、AI](https://www.notion.so/ja-jp/pricing)

Notionとのシームレスさを考えて、Tallyを使いましたが、Google Docs + Google Formとかでも似たようなことはできると思います。
最初は、それ用のウェブサービスを作ろうとしましたが、Notionで書いているうちにNotionのままでいいかなと思って、こうなっています。

## まとめ

転職活動を始めたので、[Open Job Letter v2][]を公開しました。
興味がある方は、ぜひご連絡ください。

返事がメールになってるのでちょっと気軽な質問的なことはしにくいですが、なんかもっとこうした方が良いとかあれば教えてください。

Open Job Letterのテンプレートページも公開しています。

- <https://www.notion.so/efcl/Open-Job-Letter-Template-65257f3bdf674e43b88bcba434d35229?pvs=4>

特にNotionにこだわりがなければ、別のツール/ブログ/GitHubでもなんでも良いと思います。

公開しなくても良いので、自分用に書いてみると後で振り返る時などに便利だと思うので、書いてみると面白いかもしれません。
公開するときは、素直に書くというのが書く上では大事なポイントだと思いました。

## 参考

- [前回のOpen Job Letter](https://github.com/azu/open-job-letter)
  - 久々に見てみると、フォーマットとしてよくまとまっていたなと思った
  - 一から書いていたけど、途中から前回のフォーマットをベースにして書いていった
- [ストラテジック・キャリア | PRESIDENT STORE (プレジデントストア)](https://presidentstore.jp/category/BOOKS/002186.html)
  - PVPの書き方を参考にしています
  - 途中でターゲットを一つに絞らないで、それぞれで書けばいいと思えてきたのが結構ブレイクスルーだった気がする
- [リサーチのはじめかた　――「きみの問い」を見つけ、育て、伝える方法 | 筑摩書房](https://www.chikumashobo.co.jp/special/whereresearchbegins/)
  - 問いや解釈は点でしかないので、点を記録していき線を見つけようという話
  - この本はかなり難しいことをやっているのでリサーチする人えすごいと思った
  - 点を置いていって線を書くというのは、Open Job Letterを書くときに結構意識した
- [ＮＯ ＦＬＯＰ！　失敗できない人の失敗しない技術](https://www.amazon.co.jp/dp/B0814Q7LV7/)
  - "応募"のフォームがやや複雑にしてあるのは、この本の"身銭ポイント"を意識してる
- [Notion + Wraptas + Tally で作るカジュアル面談募集ページ｜宮本 純弥｜LayerX](https://note.com/mjunya/n/n03c477713472)
  - Tallyはここで知りました
- [【2023年版】Notion最新料金プランは？無料・有料版の違いを解説 - Notionラボ](https://notion-lab.jp/2023-10-21-price/)
  - Notionの料金プランの違いをまとめ
  - 昔から使ってる人は"パーソナル Pro プラン"がプラスプランに置き換わった謎のプランになってる
- [【Notion】同期ブロックとアクセス権について](https://info.nextmode.co.jp/blog/notion-synced-blocks)
  - 同期ブロックと権限を組み合わせると色々できる
  - 今回は特につかってない

[Open Job Letter v2]: https://efcl.notion.site/Open-Job-Letter-v2-ce8b95c88bb74eff9dc4d0f347fcaf9d