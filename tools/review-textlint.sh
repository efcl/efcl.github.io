#!/bin/bash
if [ -n "${TRAVIS_PULL_REQUEST}" ] && [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
  gem install --no-document checkstyle_filter-git saddler saddler-reporter-github

  diffBranchName="develop"
  # 変更行のみを対象にする
  git diff --name-only --diff-filter=ACMR ${diffBranchName} \
  | grep -a '_posts/.*.md$' \
  | xargs $(npm bin)/textlint -f checkstyle \
  | checkstyle_filter-git diff ${diffBranchName} \
  | saddler report \
      --require saddler/reporter/github \
      --reporter Saddler::Reporter::Github::PullRequestReviewComment
fi
exit 0