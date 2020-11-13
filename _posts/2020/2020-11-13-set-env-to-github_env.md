---
title: "GitHub Actionsの::set-envを$GITHUB_ENVにマイグレーションツールを書いた"
author: azu
layout: post
date : 2020-11-13T23:03
category: JavaScript
tags:
    - GitHubActions

---

セキュリティ的な問題のため、`::set-env`と`::add-path`構文が廃止されました。

```
echo "::set-env name=ENV_NAME::env_value"
echo "::add-path::/path/to/dir"
```

代わりに、`$GITHUB_ENV` と `$GITHUB_PATH` に追記する方法が追加されています。

```
echo "ENV_NAME=env_value" >> $GITHUB_ENV
echo "/path/to/dir" >> $GITHUB_PATH
```

- [GitHub Actions: Deprecating set-env and add-path commands - GitHub Changelog](https://github.blog/changelog/2020-10-01-github-actions-deprecating-set-env-and-add-path-commands/)
- [Workflow commands for GitHub Actions - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-commands-for-github-actions#environment-files)

手動で置換したくなかったので、`::set-env`から`$GITHUB_ENV`に置換するツールを書きました。

- [azu/set-env-to-github_env: A migration tools convert `::set-env` to $GITHUB_ENV on GitHub Actions.](https://github.com/azu/set-env-to-github_env)

`.github/*.{yml,yaml}`があるリポジトリのルートで、`npx set-env-to-github_env`を実行するだけでマイグレーションできます。

```
$ npx set-env-to-github_env
```

Before

```yaml
name: test
on: [push, pull_request]
jobs:
  test:
    name: "Test"
    runs-on: ubuntu-18.04
    steps:
      - name: set env for prod
        if: github.ref == 'refs/heads/main'
        run: |
          echo "::set-env name=ACCOUNT_ID::${ACCOUNT_ID}"
          echo "::set-env name=BUCKET_NAME::${BUCKET_NAME}"
        env:
          ACCOUNT_ID: 123456789012
          BUCKET_NAME: deploy-prod
```

After

```yaml
name: test
on: [push, pull_request]
jobs:
  test:
    name: "Test"
    runs-on: ubuntu-18.04
    steps:
      - name: set env for prod
        if: github.ref == 'refs/heads/main'
        run: |
          echo "ACCOUNT_ID=${ACCOUNT_ID}" >> $GITHUB_ENV
          echo "BUCKET_NAME=${BUCKET_NAME}" >> $GITHUB_ENV
        env:
          ACCOUNT_ID: 123456789012
          BUCKET_NAME: deploy-prod
```

:memo: `::add-path::` は使ったことがなかったので対応していません。

- [azu/set-env-to-github_env: A migration tools convert `::set-env` to $GITHUB_ENV on GitHub Actions.](https://github.com/azu/set-env-to-github_env)