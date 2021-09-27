---
title: "記憶に残らないものをメモするためにMemory Noteという仕組みを書いた"
author: azu
layout: post
date : 2021-09-26T21:47
category: JavaScript
tags:
    - Cloudflare
    - JavaScript
    - GitHub

---

[Memory Note](https://github.com/azu/memory-note)というプログラマブルなTodoアプリのミドルウェアを書きました。
ややこしいですが、大雑把に言えばReminder的なTodoリストを扱うREST APIをCloudflare Workersで動かす仕組みです。
[Headless Todo App](https://twitter.com/tokifujp/status/1442272253824028672)という単語がしっくりくるのかもしれません。


単体だと何ができるのかよくわからないものですが、Todoサービスを自分用に作れる仕組みです。
対象ユーザーは主に自分ですが、[Memory NoteのREADME](https://github.com/azu/memory-note)にセットアップ方法や関連するクライアントの実装も公開しています。

自分の場合は、iOSの[ショートカット](https://support.apple.com/ja-jp/guide/shortcuts/welcome/ios)から音声入力で、メモをGitHub ProjectのボードにCardとして記録しています。
この記録したメモを、iOSのWidgetsとしてホーム画面に出したり、[Alfred](https://www.alfredapp.com/)のHotKeyでワンタッチで表示したり、部屋に[電子ペーパーを使った物理的なダッシュボード](https://efcl.info/2021/02/02/digital-paper-dashbling/)があるので、そこに表示しています。
また、GitHub Actionsで買い物っぽいメモは買い物リストに自動的に整理して、"買い物メモリー"とSiriに言えば、その内容を音声で教えてくれるような形にしています。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">Memory Noteに<a href="https://t.co/ZEFEcaOBsS">https://t.co/ZEFEcaOBsS</a>(Siri)で、音声でメモを記録してる様子<a href="https://t.co/fkEdsWNPoK">https://t.co/fkEdsWNPoK</a> <a href="https://t.co/8pEGBbi6Q1">pic.twitter.com/8pEGBbi6Q1</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1442114839522930688?ref_src=twsrc%5Etfw">September 26, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

![GitHub Project Board](https://raw.githubusercontent.com/azu/memory-note/master/docs/img/github-project-board.png)

> GitHub Project Boardに記録されているメモ

![iOS Widget](https://raw.githubusercontent.com/azu/memory-note/master/docs/img/ios-widget.jpeg)

> [Web Widget](https://apps.apple.com/jp/app/web-widget-webpage-screenshot/id1561605396)をiOS Widgetsとして表示している様子
> Siriで読み上げにも対応している

![mac Alfred](https://raw.githubusercontent.com/azu/memory-note/master/docs/img/mac-alfred.png)

> Alfred workflow でメモを表示してる様子

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">後、部屋に電子ペーパーを使った物理的なダッシュボード作ってあるので、<br>ダッシュボードにも表示してる。<br><br>これでだいぶ記憶のInbox置き場がはっきりしてきた<a href="https://t.co/EQQ4ce1Umo">https://t.co/EQQ4ce1Umo</a> <a href="https://t.co/P6mo9GIyEJ">pic.twitter.com/P6mo9GIyEJ</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1436673669175005189?ref_src=twsrc%5Etfw">September 11, 2021</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## この記事の目的

この記事はなんでMemory Noteを作ったのかやなんでこんな仕組みになったのかを書いているメモ的な記事です。

実際に使いたい人は、リポジトリのREADMEやコード(数百行ぐらいです)を読んだ方が早いと思います。

- [azu/memory-note: Fast memory note on CDN edge. Cloudflare Workers KV/GitHub Projects as backend.](https://github.com/azu/memory-note)

## Memory Noteの概要

[Memory Note](https://github.com/azu/memory-note)は、[Cloudflare Workers](https://workers.cloudflare.com/)で動かしてTodoリストを扱うAPIサービスです。

Memory Note自体はフロントエンドを持っていなくて、iOSの[ショートカット](https://support.apple.com/ja-jp/guide/shortcuts/welcome/ios)やmacOSの[Alfred](https://www.alfredapp.com/)などを使ってメモを読み書きする想定です。（HTTPリクエストを送れればクライアントはなんでも良いです）

Memory Note経由で記録したメモはCloudflareの[Cloudflare Workers KV](https://www.cloudflare.com/ja-jp/products/workers-kv/)(CDN上のKVS)に保存もできますが、GitHubの[プロジェクトボード](https://docs.github.com/ja/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)をメモを記録するバックエンドとして使うこともできます。
また、バックエンド自体は[StorageAdapterのインターフェイス](https://github.com/azu/memory-note/blob/master/src/note/StorageAdapter.ts)に沿って実装することで、メモの記録先は自由に実装できます。

![Memory Noteのアーキテクチャ](https://raw.githubusercontent.com/azu/memory-note/master/docs/img/overview.png)

Memory Noteは実質ただのAPIなので、自由に使えます。

iOSのショートカットアプリとかAlfredとかは、ほとんどコード書かなくてもある程度APIを読み書きできるので、フロントエンドに関してはコードらしいコードは書いてません。
iOSの[ショートカット](https://support.apple.com/ja-jp/guide/shortcuts/welcome/ios)はHTTPリクエストも遅れるし、JSONの読み書きもできるし、音声の入出力もできて、通知もできるので、自分の用途だとこれで必要十分になりました。

使いたい人は[Memory NoteのREADME](https://github.com/azu/memory-note)を参照してください。

## Memory Noteの目的

後で何かしないといけないみたいことを忘れるのが嫌で、その忘れてしまうものを素早くメモする仕組みが欲しくなりました。（短期的なメモを簡単にしたい）

例えば、牛乳を買わないといけないことに気づいたけどその時メモらなかったので、そういう情報はすぐ忘れてしまい、買い忘れてしまうみたいな状態になってしまいます。
このような状態を避ける方法はないのかなと考えていました。

買い物リストだと、iOSの[買うものかご](https://kaumonokago.com/)というアプリをよく使っていて、音声入力するとそのまま買うものに追加してくれる(キー入力や決定がいらない)が体験良かったです。しかし、アプリを起動して入力開始ボタンをタップするまでの2ステップ(実際はアプリを探すがあるので3ステップ)が遠くて、これを1ステップにしてメモの記録開始ができるものないと、記憶から消える前にメモするのは難しいなと思いました。

そのため、1ステップでのメモができる仕組みを作ろうと思いました。

どういうのを作ろうか[メモを書きながら](https://gist.github.com/azu/bc855269882c520c70990fd293aa9893)作っていましたが、次のようなことが目的になっていました。

```
- いつでも入力
- いつでも見れる
- とにかく早い、ストレスフリー

via https://gist.github.com/azu/bc855269882c520c70990fd293aa9893
```

## Cloudflare WorkersでTodoリストを作る

色々ためしているうちに、アプリの切り替えなしにメモを書き始めるには、音声コマンドで入力を開始して音声入力が一番良さそうだと思いました。
iOSにはSiriと自由にプログラミングできる[ショートカット](https://support.apple.com/ja-jp/guide/shortcuts/welcome/ios)アプリがあるので、これを使えば実現できそうでした。
また、家では[HomePod mini](https://www.apple.com/jp/homepod-mini/)をおいていて、多少離れてて聞き取ってくれるので、一行メモする程度なら十分な精度がでます。

📝 Homepodで音声を受け取って、iOSのショートカットアプリで作ったショートカットを実行できます(iPhoneとHomePodを接続してる状態になって、音声の入出力だけHomepodになる)

📝 余談: macOSで[Talon](https://talonvoice.com/)を使って音声コマンドを扱ってる話
[体の動きや音声入力でアプリケーションをハンズフリー操作したりプログラミングしたり文章を書いたりしてみる | Web Scratch](https://efcl.info/2021/08/10/motion-voice-to-key/)

最初は、iOSとmacOSネイティブのReminderを音声で読み書きする仕組みをやってみて、iOS単体で完結するならこれで十分そうでした。（ショートカットアプリでReminderを読み書きできるので、音声入力と出力につなげるだけ）
ただし、自分の場合は、macOSのAlfredで扱いたかったり、常に視界に入る[物理的なダッシュボード](https://efcl.info/2021/02/02/digital-paper-dashbling/)にも最近のメモを表示したかったため、Web APIがないReminderだと厳しそうでした。

この目的を満たせるTodoサービスを探そうとしましたが、Todo自体に求めてるのはリストがあって読み書きできるAPIだけだったので、自分で作ることにしました。

Memory Noteは単純化すれば、一つの配列にpushとpopするAPIがあればいいだけだったので、とにかく早く動くものということで[Cloudflare Workers](https://workers.cloudflare.com/)で動くものを書き始めました。

![Memory NoteのStack](https://user-images.githubusercontent.com/19714/134810354-f9929ad7-addf-443b-9124-7c661f7032e3.png)

📝 参考: CloudflareのCDNのベンチマーク

- [Benchmarking Edge Network Performance: Akamai, Cloudflare, Amazon CloudFront, Fastly, and Google](https://blog.cloudflare.com/benchmarking-edge-network-performance/)

最初は、[Cloudflare Workers](https://workers.cloudflare.com/)とそのKVSである[Cloudflare Workers KV](https://www.cloudflare.com/ja-jp/products/workers-kv/)を使って作ってました。タグ付けや日付ごとに分割したり色々やっていましたが、シンプルなメモアプリが欲しいので、データ構造ももっとシンプルにしないと不自然だなと思いました。
色々削っていくと、必要なのはリストとアイテム、リストの取得とアイテムの追加と削除だけで十分そうなのかわかってきました。

具体的には、次の3つのAPIさえあれば、ReminderのようなシンプルなTodoリストには十分そうでした。
また、アイテムの編集は、アイテムを削除してから追加しなおす(created dateが変わる制限はある)で実現できます。

- リストからアイテムの一覧を取得
- リストにアイテムを追加
- リストからアイテムを削除

## バックエンドをGitHub Projectにする

先ほどの3つのAPIをTypeScriptのインターフェイスで書いてみると次のようになりました。

```ts
/**
 * Storage Adapter should implement these methods
 */
export type StorageAdapter = {
    /**
     * Return an array of Note
     * @param listId
     */
    getNotes(listId: string): Promise<Note[]>;
    /**
     * Add the note to the list
     * Return the added note
     * @param listId
     * @param note
     */
    appendNote(listId: string, note: AppendNote): Promise<Note>;
    /**
     * Remove the note from the list
     * Return the deleted note
     * @param listId
     * @param id
     */
    deleteNote(listId: string, id: Note["id"]): Promise<Note>;
};
```

ここまで、必要なAPIが少ないならメモの保存先を[Cloudflare Workers KV](https://www.cloudflare.com/ja-jp/products/workers-kv/)に限定しないで、
使う人が自由に保存先のバックエンドとの接続部分(アダプター)をかけるような作りにした方がきれいな状態になりそうだなーと思いました。
（複数のバックエンドでも同じAPIが使えるのではと思ったのと、複数のバックエンドがあったほうがAPIをキレイに保つ強制力がでる）

自分は普段Todoリスト(長期的なTodo)にはGitHub Issuesを使うようにしていたため、Memory Noteの保存先もGitHubにまとめてしまえるのではと思って、[GitHub Projectを保存先にするアダプター](https://github.com/azu/memory-note/blob/master/src/note/adapters/GitHubProject.ts)を実装しました。

- [GitHub Issuesを個人用のTodo管理アプリとして使っている | Web Scratch](https://efcl.info/2020/12/25/missue/)

これで、短期的なメモはMemory Note経由でGitHub ProjectsにCardとして記録され、そこから作業が必要なら[CardをIssueにして](https://docs.github.com/ja/issues/organizing-your-work-with-project-boards/tracking-work-with-project-boards/adding-notes-to-a-project-board)長期的なメモ書きを加えていくみたいな運用ができました。

思いついたことをすぐメモとして追加するので、GitHub Project BoardにCardがどんどん溜まっていきますが、Cardはまとめてアーカイブできるので邪魔になったらアーカイブする形にできそうです。（GitHub Project Boardのアーカイブはイベントとして残るので、Revertして復活もできるので気にせずアーカイブできる）

GitHub Project Boardにメモがたまるため、メモが追加されるたびに[GitHub Actions](https://github.co.jp/features/actions)(`on: project_card`に反応できる)を実行して、メモを自動的に分類したりIssueにしたりなどの自動化もできます。
メモに対してコードで自動化処理をかけるのが自由度が高くていい感じです。

他のサービスだとZapierを使ったり、ClickUpなどは[Automations](https://docs.clickup.com/en/articles/3904901-automations)などの機能を持ってるので、これを利用する感じな気はします。

## Memory Noteの参考したもの

[Memory Note](https://github.com/azu/memory-note)を作っていて、記憶障害のリハビリでメモリーノートブックという仕組みがあることを知りました。
[記憶障害者の日常生活におけるメモリーノート利用の実態 : 利用場面および利用内容の違いに着目して](https://tohoku.repo.nii.ac.jp/?action=repository_action_common_download&item_id=43328&item_no=1&attribute_id=18&file_no=1)を読んでいて、メモを読み書きするを習慣付けするには必然性や外部から継続して利用を促す話などがでてきます。（メモを書く本人がメモを読むことを忘れてしまう問題）

これは確かにメモを記録するだけではダメだなと思って、常時表示するために物理的なダッシュボードに出したり、ワンクリック/音声コマンドでメモを表示/読み上げるような作りにしたりしています。
また、家から出たときに自動的にメモを読み上げるとかもやってみると面白い感じがしました。(ショートカットアプリのAutomationなどで実現できる)

他にも記憶周りの話として、高次脳機能障害とか脳の記憶の仕組みの書籍とかを読んでたりしました。（特に参考にしたわけではないですが、普通に興味深かった）

- [Release 読んだ本: 高次脳機能障害、脳のはたらき、The Missing README · azu/book-review](https://github.com/azu/book-review/releases/tag/1)

## Memory Noteの使い方

自分用のメモの仕組みなので、自分以外の需要があるのかはよくわかりませんが、誰でも[Cloudflare Workers](https://workers.cloudflare.com/)にデプロイして使えるようにしています。

詳しい使い方はREADMEを参考にしてください。

- [azu/memory-note: Fast memory note on CDN edge. Cloudflare Workers KV/GitHub Projects as backend.](https://github.com/azu/memory-note)

GitHub Projectをバックエンドにする場合のざっくりした使い方を書くと、次のようになります。

1. [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/azu/memory-note)をクリックする
2. Cloudflareアカウントでmemory-noteがデプロイされる
3. Cloudflare WorkerのSettingsから*Environment Variables*を設定していく

Cloudflare WorkersのEnvironment Variablesには、次の環境変数を入れていきます。
（Environment Variablesを保存すると自動的にWorkersがデプロイし直されます）

- `MEMORY_NOTE_TOKEN`
    - `Variable name`: `MEMORY_NOTE_TOKEN`
    - `Value`: Memory NoteのAPIにアクセスするときに使うランダムな文字列です。パスワードジェネレーターなどで生成してください
- `BACKEND_SERVICE`:
    - `Variable name`: `BACKEND_SERVICE`
    - `Value`: `github`
- `GITHUB_OWNER`:
    - `Variable name`: `GITHUB_OWNER`
    - `Value`: GitHubのアカウント名
- `GITHUB_REPO`:
    - `Variable name`: `GITHUB_REPO`
    - `Value`: GitHubのリポジトリ名(GitHub Projectの置き場所)
- `GITHUB_PROJECT_ID`
    - `Variable name`: `GITHUB_PROJECT_ID`
    - `Value`: GitHub ProjectのID
- `GITHUB_TOKEN`
    - `Variable name`: `GITHUB_TOKEN`
    - `Value`: GitHub Personal Access Token

後、GitHub Projectの場合はそれぞれのColumnがTodoリストのリストとして扱われます。
*column link*をコピーして、`https://github.com/yourname/yourrepo/projects/1#column-1111111`の`1111111`部分が後で必要になる`:listId`となります。

![copy link](https://raw.githubusercontent.com/azu/memory-note/master/docs/img/copy-column-link.png)

一度設定すれば、後はデプロイしたWorkersをAPIとして叩くだけです。

- <https://github.com/azu/memory-note#api>

例えば、リストの一覧を取得するなら次のような感じで、APIを叩くとJSONが返ってきます。

```sh
curl https://example-memory-note.worker.dev/notes/1111111?token=<MEMORY_NOTE_TOKENで入れた値>
```

これだけだと実用性がないので、サンプルクライアントとして次のクライアントを公開しています。

- Alfred: <https://github.com/azu/memory-note#alfred>
  - TODOリストの表示、アイテムの追加、アイテムの削除
- iOSのショートカット: <https://github.com/azu/memory-note#ios-shortcutsapp>
  - 音声入力でメモを追加
  - リストの読み上げ

また、`https://{your worker url}/notes/:listId/widget?token={memory note token}` というURLにアクセスすれば、シンプルなTODOリストのHTML表示を返してくれます。

iOSでは、[Web Widget](https://apps.apple.com/jp/app/web-widget-webpage-screenshot/id1561605396)などを使えば、ホーム画面に任意のURLをWidgetsとして配置できるので、
ReminderのようにWidgets表示もできます。

![iOS Widget](https://raw.githubusercontent.com/azu/memory-note/master/docs/img/ios-widget.jpeg)

もし、[Backend Service](https://github.com/azu/memory-note#backend-service)を書いたり、Memory Noteのクライアントを作ったとかあればぜひPull Requestしてください。

## おわりに

[Memory Note](https://github.com/azu/memory-note)をなぜ作ったかを大雑把にまとめてみると、忘れる前にメモしたいので、アプリを開く必要がないとにかく早いメモが欲しいという理由でした。

[Cloudflare Workers](https://workers.cloudflare.com/)を使うことで、主な処理をCDN Edgeで動かして、できるだけ体感がいいAPIを作ったり、音声コマンド/入力を使うことで1ステップでメモが開始できるようにしています。
パフォーマンス的には、バックエンドが[Cloudflare Workers KV](https://www.cloudflare.com/ja-jp/products/workers-kv/)の場合はレスポンスが50msぐらいで、バックエンドが[GitHub Project](https://github.com/azu/memory-note/blob/master/src/note/adapters/GitHubProject.ts)の場合は500msぐらいで収まっています。

Todoアプリを実装したのは、[JavaScript Primer](https://jsprimer.net/)の[Todoアプリ](https://jsprimer.net/use-case/todoapp/)以来な感じがします。（JavaScript Primerはフロントエンドで、Memory Noteはバックエンドに近いのでちょっと違いますが）

Memory Noteを作ったことで短期的なメモも、タスク管理と同じGitHubリポジトリにまとまったので、GTDでいうところのInboxができた感じがして結構満足ではあります。
しかし、なんかもっと良い仕組みはありそうな気はしますが、こういう忘れると嫌な短期的なメモをみんなどうやって管理してるんだろ?というのが気になります。
