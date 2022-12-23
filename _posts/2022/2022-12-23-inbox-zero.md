---
title: "メールの受信トレイを空にするInbox Zeroを始めた"
author: azu
layout: post
date : 2022-12-23T22:59
category: 雑記
tags:
    - Gmail
    - Mail

---

Gmailをメーラーとして使ってますが、メールを開くのがいまだに苦手です。
これをどうにかしようと、メールをもっと気軽に消せる方法はないかなーと思ってInbox Zeroを思い出したのでやり始めました。

次の記事や動画を参考にしています。

- [Inbox Zero and the Inbox Zero Method — everything you need to know](https://blog.superhuman.com/inbox-zero-method/)
- [【15分で完了】1度設定したら戻れない、受信トレイ0生活 | おかんの給湯室](https://www.okan-media.jp/useful-gmail)
- [My Complete Inbox Zero Workflow (in 2022)! - YouTube](https://www.youtube.com/watch?v=al1QXFQjq1s)

基本的には、この動画を参考にして設定しました。

<iframe width="560" height="315" src="https://www.youtube.com/embed/al1QXFQjq1s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

##　Inbox Zeroの設定方法

細かい設定は参考にした動画や記事の方に任せます。

設定でやること

- 詳細タブ
  - [ ] 自動表示 を有効化(アーカイブしたときに次のメールを自動で開く)
  - [ ] カスタム キーボード ショートカット を有効化
    - "キーボード ショートカット"というタブが増えて、ショートカットをカスタマイズできる
- 全般タブ
  - [ ] 送信＆アーカイブ を 表示する(送信したらアーカイブできる)
  - [ ] 自動表示: 前と次は好みで
  - [ ] キーボード ショートカット: ON
- ラベルタブ(ラベルはお好みで)
  - [ ] Action Required ラベルを追加
  - [ ] Read Later ラベルを追加
  - [ ] Waiting ラベルを追加
- 受信トレイタブ
  - [ ] マルチ受信トレイ を選択
  - [ ] セクション1,2,3に、次のラベル検索を追加
    - `l:Action Required`
    - `l:Waiting`
    - `l:Read Later`

これで設定は完了して、ホームに戻ると左右にトレイが並んだ感じの画面になります。

![inbox](https://efcl.info/wp-content/uploads/2022/12/23-1671804567.png)

## Inbox Zeroの運用

Inbox Zeroはよくわかっていませんが、基本的にGTDと同じようなものだと思います。
なので、メールをとりあえず開いて、次のようなフローでメールをラベリング or アーカイブするだけです。

- メールを開く
- 2分以内にできる? → すぐ処理(返信とか)してアーカイブ
- 自分以外の対応を待つ必要がある? → `Waiting`ラベルをつけてアーカイブ
- 自分で対処しないといけない? → `Action Required`ラベルをつけてアーカイブ
- 後でしっかり見る必要がある? → `Read Later`ラベルをつけてアーカイブ
- その他 → アーカイブ

基本全部アーカイブするので、受信トレイは空になるのでInbox Zeroというのだと思います。
既存のメールは頑張って全部を選択してアーカイブを繰り返してアーカイブしました。

この辺はGTDのよく見る図とかと流れは同じだと思います。

- [GTD®とは - ストレスフリーの仕事術「GTD®」](https://gtd-japan.jp/about)

全部アーカイブしたら、ラベルをつけたものだけが右のカラムに表示されるので、その後ラベルに基づいて処理するだけです。
このときにラベルを手動で外してるけど、なんかショートカットで綺麗に外せない(`y`とかそれっぽいけどラベルが消えない)

基本的な設定と運用はこれだけなのですが、いくつか工夫しないとメールが無駄に増えてしまいました。
その工夫をメモっておきます。

## Inbox Zeroの工夫

### メールマガジン

メールマガジンはRSSリーダで読むように移行しました。
また、[Inoreader](https://www.inoreader.com/)だとメールを受け取ってRSSにする機能もあります。

- RSSフィードとして購読
- メールをRSSフィードとして受け取る

実際に移行してみると、メールで受け取る必要があるメールマガジンは実はなかったというのが発見でした。

### GitHub

GitHub NotificationsはWatchで崩壊してるので、関係するGitHubリポジトリの通知はメールで受け取っています。
GitHubはOrgnizationごとに通知先のメールアドレスを変更できるので、それでうまくフィルターしています。

- [GitHubのメール通知とGmailのフィルター設定 | Web Scratch](https://efcl.info/2019/07/22/github-gmail-filter/)

そのメールに対する対処は次のようなイメージでやっています。

- Issueのトリアージ
    - すぐできるので、GitHubにラベルをつける
- Issueへのコメント
    - テンションによるので、すぐやる or `Action Required` ラベルをつける
- PRのレビュー
    - テンションによるので、すぐやる or `Action Required` ラベルをつける

### dependabot

GitHubリポジトリのセキュリティアップデートのみはdependabotでやってます。
それ以外のメンテナンス的なアップデートはrenovatebotでautomergeしてます。

- [azu/renovate-config: Shareable config for Renovate (renovatebot.com)](https://github.com/azu/renovate-config)

dependabotはautomergeをしてくれないので、メールに対して `@dependabot merge` という返信をしています。
PRやIssueの[メールに返信するとGitHubのコメント](https://github.blog/2011-03-10-reply-to-comments-from-email/)として扱えるので、`@dependabot merge`を受け取ってCIが通ってるならマージされます。
PRのマージボタンを押してマージしないのは、悪意ある攻撃者dependabotと偽装して`package-lock.json`とかに細工したPRを送られると気付けないからです。

- [Why npm lockfiles can be a security blindspot for injecting malicious modules | Snyk](https://snyk.io/blog/why-npm-lockfiles-can-be-a-security-blindspot-for-injecting-malicious-modules/)

`@dependabot merge`コメントなら、PRの送り主がdependabotじゃないならマージされません。

一方で、dependabotの通知は基本的に見たくない(リポジトリが1000以上あるので無限にPRの通知がきます)ので、dependabotからのPRに対して自動で `@dependabot merge` を返信するGASを動かしています。

ちょっと雑なコードなので、誰かがいい感じにしてくれると思います。

```ts
// MIT LICENSE ©️ azu
// Interval hours
const FETCH_INTERVAL_HOURS = 12;
const YOUR_MAIL_ADDRESS = "{yourmaiel}@gmail.com"
const MERGE_REPLY_LABEL = "dependabot-merge"; // 除外するラベル
function fetchPublishedMails() {
    const now = Math.floor(new Date().getTime() / 1000);
    const timeTerm = now - (60 * 60 * FETCH_INTERVAL_HOURS);
    // -label does not apply thread
    // https://webapps.stackexchange.com/questions/62881/exclude-label-from-a-gmail-search
    // -cc:comment@noreply.github.com
    // ignore comment = thread
    const strTerms = `after:${timeTerm} from:dependabot[bot] <notifications@github.com> deliveredto:${YOUR_MAIL_ADDRESS} -l:${MERGE_REPLY_LABEL} -cc:comment@noreply.github.com`;
    console.log("Search: ", strTerms);
    return GmailApp.search(strTerms);

}

/**
 * Creates time triggers.
 */
function createTimeTrigger() {
    ScriptApp.newTrigger('main')
        .timeBased()
        .everyHours(FETCH_INTERVAL_HOURS)
        .create();
}

function main() {
    const threadList = fetchPublishedMails()
    if (threadList.length === 0) {
        console.log("No new mail");
        return;
    }
    console.log("New mail threads: " + threadList.length);
    if (threadList.length > 100) {
        throw new Error("Too many replyTo");
    }
    threadList.forEach((mainThreads, index) => {
        const message = mainThreads.getMessages()?.[0];
        if (!message) {
            return;
        }
        const replyTo = message.getReplyTo();
        console.log("replyTo", replyTo);
        // need to embed replayTo into body for recognizing by GitHub
        // 2022年12月18日(日) 18:22 dependabot[bot] ***@***.***>:
        message.reply(`@dependabot merge

${new Date().toLocaleString()} ${replyTo}
`);
        mainThreads.addLabel(GmailApp.getUserLabelByName(MERGE_REPLY_LABEL));
        Utilities.sleep(1000);
    });

}
```

なんかもっといい方法が欲しいです(GitHub Actionsはリポジトリごとなので設定が厳しいです)。

### Action Requiredラベルの自動化

気軽にアーカイブしていくので、Action Requiredなメールをすっ飛ばすこともありそうです。
なので次のようなフィルターを書いてました。

> 条件: subject:(Action required)
> 処理: ラベル「Action Required」を付ける

## まとめ

結構シンプルな設定できるInbox Zeroができていそうです。

`e`でアーカイブが気軽にできるようになって、メールがRSSリーダ(RSSリーダは[Irodr](https://github.com/azu/irodr)を使ってます)にちょっと近くなりました。
以前よりはメールを開くまでに気合を入れる時間が減った気はします。

不満なところはGmailとかのクライアントの問題でいくつかあります。

- `e`で間違ってアーカイブしたときにそのメールを見直しにくい
- `y`で `Action Required` とかつけたラベルが消えてくれない(処理が終わったら外したい)
- `Action Required` とかのラベルをショートカット一発でつけたい
- マルチカラムだとラベルをつけても、右カラムにリロードするまで反映されない

自分は受け取るメールの総量がそんな多くないのでなんとかなってますが、この辺もっと軽い感じにできるといいなーと思いました。
(そういうクライアントとかあるのかなー)