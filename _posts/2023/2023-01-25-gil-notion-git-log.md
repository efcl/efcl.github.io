---
title: "GitコミットをNotionに記録してみてる"
author: azu
layout: post
date: 2023-01-25T19:03
category: 
tags:
    - 

---

Gitのコミットフックを使って、コミット内容をNotionに記録してみています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Gitコミットを自動的にNotionに記録するcommit hookを書いてみた。<a href="https://t.co/jb2U68PbMB">https://t.co/jb2U68PbMB</a><br>しばらく遊んでみる <a href="https://t.co/rnlKJgVMtk">pic.twitter.com/rnlKJgVMtk</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1607928461498396672?ref_src=twsrc%5Etfw">December 28, 2022</a></blockquote> 
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

実際に使ってるコミットフックは、次のリポジトリにあります。

- [azu/git-hooks: @azu's global git hooks](https://github.com/azu/git-hooks)

Git 2.9+から[`core.hooksPath`](https://git-scm.com/docs/githooks)というglobalなGit Hookを設定できます。
このglobal hookを使い、どのリポジトリでもpre-commitやpost-commitなどのコミットフックのスクリプトを実行できます。

## Notionにコミットログを送るGitフックの作り方

Notionに書き込み用のデータベースを作成し、次のカラムを作りました。

- Repo
- Hash
- Message

`.env`ファイルに次のようにNotionデータベースとAPIトークンを定義します。

```
GIL_NOTION_GIL_DATABASE_ID='xxx'
GIL_NOTION_GIL_API_TOKEN='xxx'
```

そして、`post-commit`に次のようなスクリプトを書きます。

```bash
# Require 1Password: "GIL_NOTION"
declare scriptDir
declare DOT_ENV
# GIL: Git CommitをNotionに記録する仕組み
declare GIT_COMMIT_LOG
declare GIT_COMMIT_MSG
declare GIT_COMMIT_HASH
declare GIT_REPO_HTTP_URL
declare GIL_NOTION_GIL_DATABASE_ID
declare GIL_NOTION_GIL_API_TOKEN
GIT_COMMIT_LOG=$(git log -n 1 HEAD --format="format:%h %s")
GIT_COMMIT_HASH=$(echo "${GIT_COMMIT_LOG}" | cut -d' ' -f1)
GIT_COMMIT_MSG=$(echo "${GIT_COMMIT_LOG}" | cut -d' ' -f2-)
# skip [Git Cancel] commit
if [[ "${GIT_COMMIT_MSG}" =~ ^\[Git\ Cancel\] ]]; then
  exit 0;
fi
currentDirName=$(basename $(pwd))
parentDirName=$(basename $(dirname $(pwd)))
GIT_REPO_HTTP_URL=$( (git config --get remote.origin.url || echo "https://github.com/${parentDirName}/${currentDirName}") | sed -e 's/.git$//'  -e 's/^ssh:\/\/git@/https:\/\//' -e 's/^git@github.com:/https:\/\/github.com\//' )

scriptDir=$(cd $(dirname ${BASH_SOURCE:-$0}) || exit; pwd)
DOT_ENV="${scriptDir}/../.env"
export $(grep -v '^#' "${DOT_ENV}" | xargs)


NOTION_PAYLOAD=$(cat <<EOF
{
  "parent": { "database_id": "${GIL_NOTION_GIL_DATABASE_ID}" },
  "properties": {
    "Message": {
      "title": [
        {
          "text": {
            "content": "${GIT_COMMIT_MSG}"
          }
        }
      ]
    },
    "Hash": {
      "rich_text": [{
        "text": {
          "content": "${GIT_COMMIT_HASH}"
        }
      }]
    },
    "Repo": {
      "url": "${GIT_REPO_HTTP_URL}"
    }
  }
}
EOF
)
curl -s -X POST https://api.notion.com/v1/pages \
  -H "Authorization: Bearer ${GIL_NOTION_GIL_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2022-02-22" \
  --data "${NOTION_PAYLOAD}" > /dev/null & exit 0;
```

## 作った理由

- [https://ctzn.network/dev-vlog](https://ctzn.network/dev-vlog)をみてて、コミットと動画の時間が紐づいてて面白かった。
- リポジトリ横断で、コミットと時間軸だけで一覧できると面白そうと思って作ってみた
- postcommitでコミットメッセージとリポジトリを取得して、それをNotionに記録するという感じ

コミットログだけしか送ってないですが、NotionのAPIが画像とか対応したらスクショとかも送ったりすると面白そうだなーとか考えています。
([Rewind](https://www.rewind.ai/)みたいな。[lolcommits: selfies for software developers](https://lolcommits.github.io/)というのもあった)

Convential Commitとかバージョンのコミットなんか規則性があるので、それをリポジトリ横断でみたりすると面白い感じはします。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">リリースのコミットだけみると面白い <a href="https://t.co/TE7lSkfcjY">pic.twitter.com/TE7lSkfcjY</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1612112486345633794?ref_src=twsrc%5Etfw">January 8, 2023</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

実際に使ってるコミットフックは[git-hooks/post-notion-gil.sh at master · azu/git-hooks · GitHub](https://github.com/azu/git-hooks/blob/master/hooks/post-notion-gil.sh)にあります。
もうちょっと色々やっていて、じぶんのNotionはDailyのページがあるので、それぞれのコミットが自動的にそこに紐づくのようになっています。
日次のページにコミットが紐づくので、その日に何をしたかがわかりやすくなったのは結構よかったです(以前はその日にやったタスクが並んでるけど、タスクにわざわざ切らないコミットは多いため)。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">GILでGitコミットとデイリーのNotionページに紐づくようになった。<br>これで、その日に何をコミットしてたかが自動で紐づく <a href="https://t.co/QAZf92n8IX">pic.twitter.com/QAZf92n8IX</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1615341003959074817?ref_src=twsrc%5Etfw">January 17, 2023</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

単純にリレーションするだけだと紐づくだけで見えにくいですが、"セクションとして表示"を使うとリレーションの表示方法が変更できます。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Notion セクションとして表示ってやるとrelationの情報がかなりわかりやすくできるんだなー<br>便利だ <a href="https://t.co/WsUxhdV3gO">pic.twitter.com/WsUxhdV3gO</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/1618125356422287364?ref_src=twsrc%5Etfw">January 25, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

特に利点はないですが、コミットメッセージちゃんと書こうとかちょっと思ったりはしました。