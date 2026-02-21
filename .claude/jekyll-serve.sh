#!/bin/sh
for rbenv_bin in "$HOME/.rbenv/bin/rbenv" /opt/homebrew/bin/rbenv /usr/local/bin/rbenv; do
  if [ -x "$rbenv_bin" ]; then
    eval "$($rbenv_bin init -)"
    break
  fi
done
exec bundle exec jekyll serve --livereload --limit_posts 5
