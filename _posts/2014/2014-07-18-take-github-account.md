---
title: GitHubで使われてないアカウントを解放してもらった
author: azu
layout: post
categories:
    - github
tags:
    - github
    - mail
    - Webサービス

---

## 非活性なGitHubアカウント

[Githubでpecoのアカウントを融通してもらった件 : D-7 &lt;altijd in beweging&gt;](http://lestrrat.ldblog.jp/archives/39456399.html "Githubでpecoのアカウントを融通してもらった件 : D-7 &lt;altijd in beweging&gt;")
という記事を読んで、GitHubにメールすればInactiveなアカウントを削除してもらうことができるということを知り、同じことをやったという話です。

[JSer.info](http://jser.info/ "JSer.info") というブログをTumblrでやっていて、
[efcl.info](https://efcl.info/)(このサイト)と同じようにJekyll(+Github Pages)の方が適してるじゃないかと思って、移行を検討していました。

* [Jekyllベースのブログに移行しました。 | Web Scratch](https://efcl.info/2014/07/06/new-blog/ "Jekyllベースのブログに移行しました。 | Web Scratch")
* [Jekyllベースのブログへの移行を検討 · Issue #21 · azu/jser.info](https://github.com/azu/jser.info/issues/21 "Jekyllベースのブログへの移行を検討 · Issue #21 · azu/jser.info")

GitHub Pagesに独自ドメインを当てる場合、GitHubのorganizationアカウントを取ってそこでやるのが楽だという事はわかっていたので、
[JSer.info](http://jser.info/ "JSer.info") むけに `jser` というGitHubアカウントを取ろうとしていましたが、既にアカウントは取られていた状態でした。

![元のjserアカウント](https://efcl.info/wp-content/uploads/2014/07/2014-07-18_10-06-19.jpg)

元々あった `jser` というアカウントは、リポジトリが1つだけあってコミットがひとつもない、ただ取得しただけというInactiveなアカウントだったので、
最初に[紹介した記事](http://lestrrat.ldblog.jp/archives/39456399.html "Githubでpecoのアカウントを融通してもらった件 : D-7 &lt;altijd in beweging&gt;")を思い出しました。

----

補足: Organizationアカウントじゃなくても独自ドメインで運用できる事については
@haya14busa さんが[詳しく解説](https://github.com/azu/jser.info/issues/21#issuecomment-49193720 "haya14busa")して下さいました。

----

## メールを送る

[Contact GitHub](https://github.com/contact "Contact GitHub") からフォームでも送れるのですが、
直接、supportあっとgithub.comの方にメールしました。
(メールのほうが返信が来やすいとかみたのと、実際フォームで送って返信こないケースを経験してたので試しに)

以下のような感じで送りました。
大分、[つらい英語になってるので添削](https://gist.github.com/azu/78e99a99a4eb207f7ff2 "mail.txt")した見本下さい。

```
Hello, My name is azu.
My GitHub account is https://github.com/azu/.

I want to get "jser" for organizations account.
I'd like to use the account for https://github.com/azu/jser.info and http://jser.info/.
(I will move http://jser.info/ to github-pages from tumblr in the near future)

Currently, "jser" is already token, but the account is inactive.
Please remove dusty "jser" account.

Thanks.
```

返信は以下のような感じで、[Name Squatting Policy · GitHub Help](https://help.github.com/articles/name-squatting-policy "Name Squatting Policy · GitHub Help")にしたがって
`jser`のアカウントを解放したよときました。

この時点ではアカウントを解放されただけなので、この後はまた早い者勝ちです。

```
Hi Azu,

You are in luck — we have classified the jser account as inactive and released the username for you to claim, as per our Name Squatting Policy:

https://help.github.com/articles/name-squatting-policy

Be quick, as the username is now publicly available. Glad to help!

Cheers
```

## GitHubの[Name Squatting Policy](https://help.github.com/articles/name-squatting-policy "Name Squatting Policy · GitHub Help")

上記の返信にもでてきましたが、GitHubには[Name Squatting Policy](https://help.github.com/articles/name-squatting-policy "Name Squatting Policy · GitHub Help")があり、
放置アカウントは連絡すれば解放してくれるクールなポリシーがあります。

- [Github Name Squatting Policy – Kumarcode](http://kumarcode.com/Github-Name-Squatting-Policy/ "Github Name Squatting Policy – Kumarcode")

使いたいアカウントが放置アカウントだった場合は、一度[問い合わせ](https://github.com/contact "Contact GitHub")してみるといいのかもしれません。

### Bitbucket

競合サービスのBitbucketはどうなんだろと思って調べてみると以下に書いてありました。

- [Can I claim an account with no activity? - Bitbucket - Atlassian Documentation](https://confluence.atlassian.com/pages/viewpage.action?pageId=317950343 "Can I claim an account with no activity? - Bitbucket - Atlassian Documentation")

基本的にアカウントを解放することはないそうです。

Bitbucketの場合は、無料でもプライベートリポジトリを無制限に作れて、一見Inactiveに見えてもそうじゃない場合が多いと思うので、
GitHubみたいにサクッとやるのは難しいので妥当な感じがします。
(問い合わせてきた人にはInactiveに見えるけど、プライベートで使われてて、Bitbucket側がそれはInactiveじゃないと伝えてしまうのは問題がありそう)

## おわりに

JSer.info の方は下記に詳細を書きましたが、今後Jekyllに移行していく予定です。

* [Jekyllベースのブログへの移行を検討 · Issue #21 · azu/jser.info](https://github.com/azu/jser.info/issues/21#issuecomment-49267328 "Jekyllベースのブログへの移行を検討 · Issue #21 · azu/jser.info")

まだ全然作業進めてないので、
Jekyllのテーマとか、[アイコン](https://github.com/azu/jser.info/issues/4 "アイコンが欲しい · Issue #4 · azu/jser.info")(GitHubのアカウント用)とか協力してくれると嬉しいです。

* [アイコンが欲しい · Issue #4 · azu/jser.info](https://github.com/azu/jser.info/issues/4 "アイコンが欲しい · Issue #4 · azu/jser.info")
